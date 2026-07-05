"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function PortfolioGrid() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-marfil">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 md:flex justify-between items-end gap-8 border-b border-linea pb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-sm tracking-[0.25em] text-bronce">01</span>
              <h2 className="eyebrow">Portfolio</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-medium text-tierra">
              Proyectos destacados
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-texto-suave font-light max-w-md mt-6 md:mt-0 leading-relaxed"
          >
            Una selección de trabajos representativos en diseño de espacios comerciales y retail.
          </motion.p>
        </div>

        {/* Uniform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="col-span-1"
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
