import { createHmac, timingSafeEqual } from 'node:crypto';

/** @typedef {{ verifyToken?: string, appSecret?: string }} WebhookConfig */

/** @param {string} text @param {number} status @returns {Response} */
function reply(text, status) {
  return new Response(text, {
    status,
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  });
}

/** @param {Request} request @param {WebhookConfig} config @returns {Response} */
export function verifySubscription(request, config) {
  if (!config.verifyToken) return reply('Verification unavailable', 503);
  const query = new URL(request.url).searchParams;
  const keys = ['hub.mode', 'hub.verify_token', 'hub.challenge'];
  if (keys.some((key) => query.getAll(key).length !== 1 || !query.get(key))) {
    return reply('Invalid verification parameters', 400);
  }
  if (query.get('hub.mode') !== 'subscribe' || query.get('hub.verify_token') !== config.verifyToken) {
    return reply('Forbidden', 403);
  }
  return reply(query.get('hub.challenge') ?? '', 200);
}

/**
 * Authenticate only. No parsing, logging, persistence, forwarding or acknowledgement.
 * @param {Request} request
 * @param {WebhookConfig} config
 * @returns {Promise<Response>}
 */
export async function receiveEvent(request, config) {
  if (!config.appSecret) return reply('Signature verification unavailable', 503);
  const signature = request.headers.get('x-hub-signature-256');
  if (!signature || !/^sha256=[a-fA-F0-9]{64}$/.test(signature)) {
    return reply('Forbidden', 403);
  }

  const hmac = createHmac('sha256', config.appSecret);
  let size = 0;
  /** @type {ReadableStreamDefaultReader<Uint8Array> | undefined} */
  let reader;
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timer;
  const timeout = Symbol('body deadline');
  try {
    reader = request.body?.getReader();
    if (reader) {
      // One deadline for the entire stream, not a fresh timeout per chunk.
      const deadline = new Promise((_, reject) => {
        timer = setTimeout(() => reject(timeout), 5000);
      });
      while (true) {
        const { done, value } = await Promise.race([reader.read(), deadline]);
        if (done) break;
        size += value.byteLength;
        if (size > 1024 * 1024) return reply('Body too large', 413);
        hmac.update(value);
      }
    }
  } catch (error) {
    return error === timeout ? reply('Body deadline exceeded', 408) : reply('Invalid body', 400);
  } finally {
    clearTimeout(timer);
    // A hostile source may never settle cancellation; do not await it.
    if (reader) void reader.cancel().catch(() => {});
  }

  const expected = hmac.digest();
  const supplied = Buffer.from(signature.slice(7), 'hex');
  if (!timingSafeEqual(expected, supplied)) return reply('Forbidden', 403);
  const response = reply('Event intake disabled', 503);
  response.headers.set('retry-after', '60');
  return response;
}
