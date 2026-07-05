import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";

// Define params type explicitly (async params en Next.js 16)
type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return { title: "Proyecto no encontrado" };
  }

  return {
    title: `${project.name} | GD Estudio`,
    description: project.description,
    alternates: {
      canonical: `/proyecto/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} | GD Estudio`,
      description: project.description,
      url: `/proyecto/${project.slug}`,
      type: "article",
      images: [
        {
          url: project.coverImage,
          alt: `Proyecto ${project.name} — GD Estudio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | GD Estudio`,
      description: project.description,
      images: [project.coverImage],
    },
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Find next and prev projects for navigation
  const currentIndex = projects.findIndex(p => p.slug === resolvedParams.slug);
  const nextProject = projects[currentIndex + 1] || projects[0];
  const prevProject = projects[currentIndex - 1] || projects[projects.length - 1];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://gdestudio.com.ar",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://gdestudio.com.ar/#portfolio",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.name,
        "item": `https://gdestudio.com.ar/proyecto/${project.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-marfil">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />

      {/* Hero Project */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-end pb-12 overflow-hidden bg-noche">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.coverImage}
            alt={project.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Velo Noche para legibilidad del texto sobre foto */}
          <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/40 to-noche/55 z-10"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <Link href="/#portfolio" className="inline-flex items-center gap-2 text-arena hover:text-crudo transition-colors mb-8 group text-xs uppercase tracking-[0.2em]">
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al portfolio
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 border border-arena/40 text-[10px] uppercase tracking-[0.3em] text-arena mb-5">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-medium text-crudo mb-5">
              {project.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-arena-suave font-light">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-arena-suave rounded-full"></span>
                {project.location}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-arena-suave rounded-full"></span>
                {project.year}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 md:py-24 bg-marfil">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

            {/* Context/Description - Col 4 */}
            <div className="md:col-span-4 md:col-start-1">
              <div className="sticky top-32">
                <h2 className="eyebrow mb-5 block">El Proyecto</h2>
                <p className="text-xl text-texto font-light leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* Ficha técnica */}
                <dl className="border-t border-linea divide-y divide-linea mb-8">
                  <div className="flex justify-between gap-4 py-4">
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-bronce self-center">Ubicación</dt>
                    <dd className="text-sm text-tierra text-right font-light">{project.location}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-4">
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-bronce self-center">Año</dt>
                    <dd className="text-sm text-tierra text-right font-light">{project.year}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-4">
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-bronce self-center">Categoría</dt>
                    <dd className="text-sm text-tierra text-right font-light">{project.category}</dd>
                  </div>
                  {project.area && (
                    <div className="flex justify-between gap-4 py-4">
                      <dt className="text-[10px] uppercase tracking-[0.25em] text-bronce self-center">Superficie</dt>
                      <dd className="text-sm text-tierra text-right font-light">{project.area}</dd>
                    </div>
                  )}
                  {project.services && (
                    <div className="flex justify-between gap-4 py-4">
                      <dt className="text-[10px] uppercase tracking-[0.25em] text-bronce self-center">Servicios</dt>
                      <dd className="text-sm text-tierra text-right font-light">{project.services.join(" · ")}</dd>
                    </div>
                  )}
                </dl>

                <div className="flex gap-4 border-t border-linea pt-8">
                  <Link
                    href="/#contact"
                    className="flex-1 text-center py-4 bg-noche text-crudo font-normal hover:bg-tierra transition-colors uppercase tracking-[0.25em] text-xs"
                  >
                    Cotizar un proyecto similar
                  </Link>
                </div>
              </div>
            </div>

            {/* Image Gallery - Col 8 */}
            <div className="md:col-span-8">
              <ProjectGallery images={project.images} projectName={project.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      <section className="border-t border-linea bg-crudo">
        <div className="grid grid-cols-2 divide-x divide-linea">
          <Link href={`/proyecto/${prevProject.slug}`} className="group p-8 md:p-16 flex flex-col items-start hover:bg-marfil transition-colors">
            <span className="text-[10px] uppercase tracking-[0.3em] text-bronce mb-3">Anterior</span>
            <span className="text-xl md:text-3xl font-medium text-tierra group-hover:-translate-x-2 transition-transform">
              {prevProject.name}
            </span>
          </Link>
          <Link href={`/proyecto/${nextProject.slug}`} className="group p-8 md:p-16 flex flex-col items-end text-right hover:bg-marfil transition-colors">
            <span className="text-[10px] uppercase tracking-[0.3em] text-bronce mb-3">Siguiente</span>
            <span className="text-xl md:text-3xl font-medium text-tierra group-hover:translate-x-2 transition-transform">
              {nextProject.name}
            </span>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
