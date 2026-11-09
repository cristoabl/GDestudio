import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { faqPageSchema } from "@/data/faqs";

type Params = Promise<{ slug: string }>;

const BASE_URL = "https://gdestudio.com.ar";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Servicio no encontrado" };
  }

  const title = `${service.title} | GD Estudio`;
  return {
    title,
    description: service.description,
    alternates: { canonical: `/servicios/${service.slug}` },
    openGraph: {
      title,
      description: service.description,
      url: `/servicios/${service.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: service.description,
    },
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = service.projectSlugs
    .map((projectSlug) => projects.find((p) => p.slug === projectSlug))
    .filter((p) => p !== undefined);
  const otherServices = services.filter((s) => s.slug !== service.slug);
  const url = `${BASE_URL}/servicios/${service.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.name,
    description: service.description,
    url,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Córdoba, Argentina" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Servicios", item: `${BASE_URL}/#services` },
      { "@type": "ListItem", position: 3, name: service.title, item: url },
    ],
  };

  return (
    <main className="min-h-screen bg-marfil">
      {[serviceSchema, breadcrumbSchema, faqPageSchema(service.faqs)].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navbar />

      {/* Hero */}
      <section className="bg-noche pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="container mx-auto px-6 md:px-12">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-arena hover:text-crudo transition-colors mb-8 group text-xs uppercase tracking-[0.2em]"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Todos los servicios
          </Link>
          <div className="max-w-3xl">
            <span className="eyebrow-dark mb-5 block">{service.name}</span>
            <h1 className="text-4xl md:text-6xl font-medium text-crudo mb-8 text-balance">
              {service.title}
            </h1>
            {service.intro.map((paragraph) => (
              <p key={paragraph} className="text-lg md:text-xl text-arena-suave font-light leading-relaxed mb-5 text-balance">
                {paragraph}
              </p>
            ))}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/#contact"
                className="px-10 py-4 bg-crudo text-noche font-normal text-xs uppercase tracking-[0.25em] hover:bg-arena transition-colors text-center"
              >
                Contanos tu proyecto
              </Link>
              <a
                href="https://wa.me/5493512139252"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 border border-crudo/40 text-crudo font-normal text-xs uppercase tracking-[0.25em] hover:border-crudo hover:bg-crudo/10 transition-all text-center"
              >
                Escribinos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What it includes / who it is for */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="eyebrow mb-6 block">Qué incluye</h2>
            <ul className="border-t border-linea divide-y divide-linea">
              {service.includes.map((item) => (
                <li key={item} className="py-4 text-texto font-light text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-6 block">Para quién es</h2>
            <ul className="border-t border-linea divide-y divide-linea">
              {service.idealFor.map((item) => (
                <li key={item} className="py-4 text-texto font-light text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related projects */}
      <section className="py-20 md:py-28 bg-crudo border-y border-linea">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="eyebrow mb-4 block">Proyectos relacionados</h2>
          <p className="text-3xl md:text-4xl font-medium text-tierra mb-12">
            Trabajos de GD Estudio en Córdoba
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {relatedProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ: native details/summary so answers are in the HTML for search engines */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <h2 className="eyebrow mb-4 block">Preguntas frecuentes</h2>
          <p className="text-3xl md:text-4xl font-medium text-tierra mb-10">
            {service.title}
          </p>
          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group border border-linea bg-crudo hover:border-arena transition-colors">
                <summary className="px-6 py-5 flex justify-between items-center gap-4 cursor-pointer list-none text-tierra text-lg md:text-xl font-normal">
                  {faq.question}
                  <ChevronDownIcon className="w-5 h-5 text-bronce shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-6 pt-4 border-t border-linea text-texto-suave leading-relaxed font-light">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="border-t border-linea bg-crudo">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-linea">
          {otherServices.map((other) => (
            <Link
              key={other.slug}
              href={`/servicios/${other.slug}`}
              className="group p-8 md:p-16 flex flex-col hover:bg-marfil transition-colors"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronce mb-3">Otro servicio</span>
              <span className="text-xl md:text-3xl font-medium text-tierra group-hover:translate-x-2 transition-transform">
                {other.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
