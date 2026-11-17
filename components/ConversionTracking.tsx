"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID, trackEvent } from "@/lib/analytics";

// Loads Google Analytics and reports contact-link clicks from any page.
// A single delegated listener covers every WhatsApp and email link, including server-rendered ones.
export default function ConversionTracking() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const href = (event.target as Element).closest("a")?.getAttribute("href") ?? "";
      if (href.includes("wa.me/")) {
        trackEvent("whatsapp_click", { link_text: new URL(href).searchParams.get("text") ?? "" });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click");
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
