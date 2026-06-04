import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";

// Define params type explicitly for Next.js 15
type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return { title: "Proyecto no encontrado" };
  }

  return {
    title: `${project.name} | Gabriela Dodelson`,
    description: project.description,
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

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Project */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.coverImage}
            alt={project.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <Link href="/#portfolio" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8 group text-sm">
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al Portfolio
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs uppercase tracking-widest text-white mb-4">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight mb-4">
              {project.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-300 font-light">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span> 
                {project.location}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span> 
                {project.year}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Context/Description - Col 4 */}
            <div className="md:col-span-4 md:col-start-1">
              <div className="sticky top-32">
                <h2 className="text-sm font-medium text-gray-500 tracking-widest uppercase mb-4">El Proyecto</h2>
                <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
                  {project.description}
                </p>
                
                <div className="flex gap-4 border-t border-white/10 pt-8">
                  <Link 
                    href="/#contact" 
                    className="flex-1 text-center py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors uppercase tracking-widest text-xs"
                  >
                    Cotizar un proyecto similar
                  </Link>
                </div>
              </div>
            </div>

            {/* Image Gallery - Col 8 */}
            <div className="md:col-span-8 space-y-8 md:space-y-12">
              {project.images.map((img, idx) => (
                <div key={idx} className="relative w-full aspect-[4/3] md:aspect-auto md:min-h-[60vh] bg-white/5">
                  <Image
                    src={img}
                    alt={`${project.name} - Imagen ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      <section className="border-t border-white/10 bg-[#0a0a0a]">
        <div className="grid grid-cols-2 divide-x divide-white/10">
          <Link href={`/proyecto/${prevProject.slug}`} className="group p-8 md:p-16 flex flex-col items-start hover:bg-white/5 transition-colors">
            <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">Anterior</span>
            <span className="text-xl md:text-3xl font-heading font-bold text-white group-hover:-translate-x-2 transition-transform">
              {prevProject.name}
            </span>
          </Link>
          <Link href={`/proyecto/${nextProject.slug}`} className="group p-8 md:p-16 flex flex-col items-end text-right hover:bg-white/5 transition-colors">
            <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">Siguiente</span>
            <span className="text-xl md:text-3xl font-heading font-bold text-white group-hover:translate-x-2 transition-transform">
              {nextProject.name}
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
