import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de privacidad | GD Estudio",
  description: "Cómo GD Estudio trata los datos personales de quienes nos contactan o interactúan con nuestras redes.",
  alternates: {
    canonical: "/privacidad",
  },
};

const sections = [
  {
    id: "responsable",
    title: "Quiénes somos",
    body: [
      "GD Estudio es un estudio de arquitectura comercial con base en Córdoba, Argentina. Somos responsables de los datos personales que se recaban a través de gdestudio.com.ar y de nuestra cuenta de Instagram @gdestudio.arq.",
      "Contacto: contacto@gdestudio.com.ar · +54 9 351 213-9252.",
    ],
  },
  {
    id: "datos",
    title: "Qué datos recopilamos",
    body: [
      "Formulario de contacto: nombre, email, teléfono y el mensaje que nos envíes. El formulario se procesa a través de Web3Forms, que nos reenvía la consulta por email.",
      "WhatsApp y email: los datos que compartas al escribirnos.",
      "Instagram: usamos la API oficial de Instagram (Meta) para publicar contenido en nuestra propia cuenta y para leer y responder los comentarios que reciben nuestras publicaciones. Accedemos solo al nombre de usuario y al texto de esos comentarios.",
      "Navegación: usamos Cloudflare Web Analytics, que mide visitas de forma agregada, sin cookies y sin identificar a las personas.",
    ],
  },
  {
    id: "uso",
    title: "Para qué los usamos",
    body: [
      "Para responder tus consultas, preparar presupuestos y dar seguimiento a los proyectos, y para gestionar la comunicación de nuestra cuenta de Instagram. No vendemos ni cedemos tus datos a terceros, ni los usamos para publicidad de otras empresas.",
    ],
  },
  {
    id: "conservacion",
    title: "Cuánto tiempo los guardamos",
    body: [
      "Conservamos los datos mientras sean necesarios para atender tu consulta o el proyecto, y luego los eliminamos salvo que una obligación legal nos pida guardarlos.",
    ],
  },
  {
    id: "derechos",
    title: "Tus derechos",
    body: [
      "Según la Ley 25.326 de Protección de Datos Personales, podés pedir acceso, rectificación, actualización o supresión de tus datos escribiendo a contacto@gdestudio.com.ar. Respondemos dentro de los plazos que fija la ley.",
      "La Agencia de Acceso a la Información Pública, órgano de control de la Ley 25.326, atiende denuncias y reclamos relacionados con el incumplimiento de las normas de protección de datos personales.",
    ],
  },
  {
    id: "eliminacion",
    title: "Cómo pedir que eliminemos tus datos",
    body: [
      "Escribinos a contacto@gdestudio.com.ar con el asunto \"Eliminar mis datos\" e indicá tu nombre y, si corresponde, tu usuario de Instagram. Eliminamos la información que tengamos sobre vos dentro de los 30 días y te confirmamos por email.",
    ],
  },
  {
    id: "cambios",
    title: "Cambios en esta política",
    body: [
      "Si actualizamos esta política, publicaremos la nueva versión en esta página con su fecha.",
    ],
  },
];

export default function Privacidad() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-marfil px-6 pt-40 pb-24">
        <div className="max-w-3xl mx-auto">
          <span className="eyebrow mb-6 block">Legal</span>
          <h1 className="text-5xl md:text-6xl font-medium text-tierra mb-6">Política de privacidad</h1>
          <p className="text-texto-suave font-light mb-16">Última actualización: 7 de octubre de 2026</p>

          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <h2 className="text-2xl font-medium text-tierra mb-4">{section.title}</h2>
                <div className="space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-texto-suave font-light leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <Link
            href="/"
            className="inline-block mt-16 px-10 py-4 bg-noche text-crudo font-normal text-xs uppercase tracking-[0.25em] hover:bg-tierra transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
