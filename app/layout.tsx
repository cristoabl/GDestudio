import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GD Estudio | Arquitectura Comercial y Diseño de Locales Comerciales en Córdoba",
  description:
    "Estudio de arquitectura comercial y diseño de locales comerciales en Córdoba. Especialistas en diseño de locales, retail, stands y remodelaciones comerciales en Argentina.",
  metadataBase: new URL("https://gdestudio.com.ar"),
  openGraph: {
    title: "GD Estudio | Arquitectura Comercial y Diseño de Locales Comerciales en Córdoba",
    description:
      "Transformamos espacios en experiencias comerciales exitosas. Arquitectura comercial, diseño de locales, retail y visualización 3D en Córdoba.",
    url: "https://gdestudio.com.ar",
    siteName: "GD Estudio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 1024,
        alt: "GD Estudio — Arquitectura Comercial & Diseño de Locales Comerciales",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GD Estudio | Arquitectura Comercial y Diseño de Locales Comerciales en Córdoba",
    description:
      "Transformamos espacios en experiencias comerciales exitosas. Arquitectura comercial, diseño de locales, retail y visualización 3D en Córdoba.",
    images: ["/og-image.jpg"],
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
    "streetAddress": "Urca",
    "addressLocality": "Córdoba",
    "addressRegion": "Córdoba",
    "postalCode": "5000",
    "addressCountry": "AR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -31.3789,
    "longitude": -64.2415
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
  "sameAs": [
    "https://www.instagram.com/gdarq.estudio"
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

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es la arquitectura comercial y por qué es clave para un negocio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La arquitectura comercial fusiona el diseño de espacios físicos con el marketing, branding y psicología de consumo. Un local comercial bien diseñado no solo atrae clientes visualmente, sino que optimiza los flujos de recorrido y la distribución del mobiliario, impulsando la decisión de compra e incrementando las ventas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué abarca el servicio de diseño de locales comerciales en Córdoba?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ofrecemos un servicio llave en mano que abarca desde la conceptualización de marca, zonificación de áreas, diseño interior y mobiliario a medida, hasta visualización en 3D (renders fotorrealistas), desarrollo de legajo técnico de obra, iluminación estratégica y el asesoramiento en la habilitación municipal del local comercial en Córdoba."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es el diseño comercial y en qué se diferencia de la arquitectura tradicional?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A diferencia de la arquitectura residencial, el diseño comercial se enfoca en el retorno de la inversión y la interacción de la marca con el cliente. Cada elemento (iluminación, materialidad, fachadas, recorridos) está pensado para comunicar la identidad del negocio y maximizar la rentabilidad del metro cuadrado."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo es el proceso de desarrollo de un proyecto comercial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Comenzamos con un relevamiento de necesidades y análisis de marca. Luego desarrollamos el anteproyecto conceptual en 3D para definir el look & feel. Tras la aprobación, elaboramos el legajo técnico ejecutivo con todos los planos detallados (electricidad, iluminación, carpintería, sanitarios) listos para presupuestar y construir sin desvíos."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(architecturalOfficeSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-black text-white min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
