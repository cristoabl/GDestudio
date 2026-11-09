import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { verifySubscription, receiveEvent } from '../lib/instagram-webhook.mjs';

const config = { verifyToken: 'synthetic-token', appSecret: 'synthetic-secret' };
const url = 'https://example.invalid/api/webhooks/instagram';
const params = { 'hub.mode': 'subscribe', 'hub.verify_token': config.verifyToken, 'hub.challenge': '001 + café\n' };
const get = (values = params) => new Request(`${url}?${new URLSearchParams(values)}`);
const sign = (body) => `sha256=${createHmac('sha256', config.appSecret).update(body).digest('hex')}`;
function post(body, signature = sign(body), extra = {}) {
  return new Request(url, { method: 'POST', body, duplex: 'half', headers: { 'x-hub-signature-256': signature, ...extra } });
}

test('GET returns exact decoded challenge, plain text and no-store', async () => {
  const response = verifySubscription(get(), config);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), params['hub.challenge']);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('content-type'), 'text/plain; charset=utf-8');
});

test('GET requires config and single nonempty parameters', () => {
  assert.equal(verifySubscription(get(), {}).status, 503);
  assert.equal(verifySubscription(get(), { verifyToken: '' }).status, 503);
  for (const key of Object.keys(params)) {
    const missing = { ...params };
    delete missing[key];
    assert.equal(verifySubscription(get(missing), config).status, 400);
    assert.equal(verifySubscription(get({ ...params, [key]: '' }), config).status, 400);
    const duplicate = new Request(`${get().url}&${key}=duplicate`);
    assert.equal(verifySubscription(duplicate, config).status, 400);
  }
  for (const key of ['hub.mode', 'hub.verify_token']) {
    assert.equal(verifySubscription(get({ ...params, [key]: 'wrong' }), config).status, 403);
  }
});

test('POST authenticates raw bytes but never acknowledges intake', async () => {
  for (const body of [Buffer.from('{ "synthetic": true }\n'), Buffer.from([0, 255, 128]), Buffer.alloc(0), Buffer.alloc(1024 * 1024)]) {
    const response = await receiveEvent(post(body), config);
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('retry-after'), '60');
    assert.equal(response.headers.get('cache-control'), 'no-store');
  }
});

test('POST rejects missing, malformed, duplicate and tampered signatures', async () => {
  const body = Buffer.from('synthetic');
  for (const signature of ['', 'sha256=abc', `SHA256=${'a'.repeat(64)}`, `sha256=${'g'.repeat(64)}`, `sha256=${'0'.repeat(64)}`, `${sign(body)}, ${sign(body)}`, sign(Buffer.from('different'))]) {
    assert.equal((await receiveEvent(post(body, signature), config)).status, 403);
  }
  const missing = new Request(url, { method: 'POST', body });
  assert.equal((await receiveEvent(missing, config)).status, 403);
  assert.equal((await receiveEvent(post(body), {})).status, 503);
  assert.equal((await receiveEvent(post(body), { appSecret: '' })).status, 503);
});

test('POST bounds streamed bytes regardless of content-length', async () => {
  for (const headers of [{}, { 'content-length': '1' }]) {
    const body = Buffer.alloc(1024 * 1024 + 1);
    assert.equal((await receiveEvent(post(body, sign(body), headers), config)).status, 413);
  }
  const stream = new ReadableStream({ start(controller) {
    controller.enqueue(new Uint8Array(700000));
    controller.enqueue(new Uint8Array(700000));
    controller.close();
  } });
  assert.equal((await receiveEvent(post(stream, sign('')), config)).status, 413);
});

test('POST handles body read errors without reflecting details', async () => {
  const stream = new ReadableStream({ start(controller) { controller.error(new Error('private detail')); } });
  const response = await receiveEvent(post(stream, sign('')), config);
  assert.equal(response.status, 400);
  assert.equal((await response.text()).includes('private detail'), false);
});

test('POST total deadline is five seconds and cancellation cannot delay response', async () => {
  let cancelled = false;
  const stream = new ReadableStream({ cancel() { cancelled = true; return new Promise(() => {}); } });
  const started = performance.now();
  const response = await receiveEvent(post(stream, sign('')), config);
  const elapsed = performance.now() - started;
  assert.equal(response.status, 408);
  assert.ok(elapsed >= 4900 && elapsed < 7000, `deadline elapsed: ${elapsed}`);
  assert.equal(cancelled, true);
});
