"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { LIGHT_BLUR } from "@/lib/blur";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  // Animación stagger basada en el índice
  const variants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: index * 0.1 }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="group relative overflow-hidden bg-crudo border border-linea aspect-[4/5] sm:aspect-[3/4] flex"
    >
      <Link href={`/proyecto/${project.slug}`} className="w-full h-full block relative">
        <Image
          src={project.coverImage}
          alt={`Proyecto ${project.name}`}
          fill
          placeholder="blur"
          blurDataURL={LIGHT_BLUR}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />

        {/* Velo Noche siempre visible, se intensifica en hover (manual: velo 40–60%) */}
        <div className="absolute inset-0 bg-gradient-to-t from-noche/90 via-noche/35 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
          <div className="transform transition-transform duration-300">
            <div className="flex justify-between items-end mb-3">
              <h3 className="text-2xl md:text-3xl font-medium text-crudo">
                {project.name}
              </h3>
              <div className="w-10 h-10 bg-crudo text-noche flex items-center justify-center transform md:scale-90 group-hover:scale-110 origin-center transition-all duration-300">
                <ArrowUpRightIcon className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs md:text-sm font-normal uppercase tracking-[0.2em] text-arena mb-1.5">
              {project.category}
            </p>
            <p className="text-xs md:text-sm font-light text-arena-suave flex items-center gap-2">
              <span className="w-1 h-1 bg-arena-suave rounded-full"></span>
              {project.location}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
