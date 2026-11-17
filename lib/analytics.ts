// Google Analytics 4 measurement ID ("G-XXXXXXXXXX"). Public value, not a secret.
// While empty, no Google script is loaded and trackEvent is a no-op.
export const GA_MEASUREMENT_ID = "G-MPTCYTNMJE";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, string>) {
  window.gtag?.("event", name, params);
}
