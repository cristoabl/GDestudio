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
  title: "GD Estudio | Arquitectura Comercial & Diseño de Espacios",
  description:
    "Portfolio de GD Estudio — arquitectura comercial, diseño de locales y espacios de marca, retail, visualización 3D y proyectos de interiores en Argentina.",
  metadataBase: new URL("https://gdestudio.com.ar"),
  openGraph: {
    title: "GD Estudio | Arquitectura Comercial & Diseño de Espacios",
    description:
      "Transformamos espacios en experiencias. Arquitectura comercial, diseño de locales, retail y visualización 3D. Conocé nuestro portfolio.",
    url: "https://gdestudio.com.ar",
    siteName: "GD Estudio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 1024,
        alt: "GD Estudio — Arquitectura Comercial & Diseño de Espacios",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GD Estudio | Arquitectura Comercial & Diseño de Espacios",
    description:
      "Transformamos espacios en experiencias. Arquitectura comercial, diseño de locales, retail y visualización 3D.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-black text-white min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
