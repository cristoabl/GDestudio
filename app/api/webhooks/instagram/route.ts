import { receiveEvent, verifySubscription } from '@/lib/instagram-webhook.mjs';

export const runtime = 'nodejs';

export function GET(request: Request): Response {
  return verifySubscription(request, {
    verifyToken: process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN,
  });
}

export function POST(request: Request): Promise<Response> {
  return receiveEvent(request, { appSecret: process.env.META_APP_SECRET });
}
