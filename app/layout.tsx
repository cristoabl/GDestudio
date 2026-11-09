import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Única familia tipográfica de la marca: Jost (300 cuerpo, 400 subtítulos, 500 titulares).
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "GD Estudio | Arquitectura Comercial en Córdoba",
  description:
    "Estudio de arquitectura comercial y diseño de locales comerciales en Córdoba. Especialistas en diseño de locales, retail, stands y remodelaciones comerciales en Argentina.",
  metadataBase: new URL("https://gdestudio.com.ar"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GD Estudio | Arquitectura Comercial en Córdoba",
    description:
      "Transformamos espacios en experiencias comerciales exitosas. Arquitectura comercial, diseño de locales, retail y visualización 3D en Córdoba.",
    url: "https://gdestudio.com.ar",
    siteName: "GD Estudio",
    images: [
      {
        url: "/og-image-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "GD Estudio — Arquitectura Comercial & Diseño de Locales Comerciales",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GD Estudio | Arquitectura Comercial en Córdoba",
    description:
      "Transformamos espacios en experiencias comerciales exitosas. Arquitectura comercial, diseño de locales, retail y visualización 3D en Córdoba.",
    images: ["/og-image-1200x630.jpg"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

const architecturalOfficeSchema = {
  "@context": "https://schema.org",
  "@type": "ArchitecturalOffice",
  "name": "GD Estudio",
  "image": "https://gdestudio.com.ar/og-image.jpg",
  "@id": "https://gdestudio.com.ar/#organization",
  "url": "https://gdestudio.com.ar",
  "telephone": "+5493512139252",
  "email": "contacto@gdestudio.com.ar",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Córdoba",
    "addressRegion": "Córdoba",
    "postalCode": "5000",
    "addressCountry": "AR"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "hasMap": "https://maps.google.com/?cid=10798425173062470862",
  "sameAs": [
    "https://www.instagram.com/gdestudio.arq",
    "https://maps.google.com/?cid=10798425173062470862"
  ],
  "knowsAbout": [
    "Arquitectura Comercial",
    "Diseño de Locales Comerciales",
    "Retail Design",
    "Diseño Comercial",
    "Remodelación de locales comerciales",
    "Habilitación de locales comerciales en Córdoba",
    "Legajos técnicos de arquitectura"
  ],
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Córdoba, Argentina"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${jost.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(architecturalOfficeSchema) }}
        />
      </head>
      <body
        className="antialiased bg-marfil text-texto min-h-screen flex flex-col"
      >
        {children}
        <Script
          id="cloudflare-web-analytics"
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"b04f7ba73e25471e8e591ae764ddc7ec"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
