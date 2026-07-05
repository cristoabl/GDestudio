"use client";

import { motion, Variants } from "framer-motion";
import {
  BuildingStorefrontIcon,
  WrenchScrewdriverIcon,
  CubeTransparentIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";

const services = [
  {
    title: "Diseño Comercial y Retail",
    description: "Creación de experiencias de marca en espacios físicos. Locales, stands y showrooms que potencian las ventas y fidelizan clientes.",
    icon: BuildingStorefrontIcon,
  },
  {
    title: "Remodelaciones y Refacciones",
    description: "Transformación integral de espacios existentes. Optimizamos distribuciones y renovamos la imagen respetando la identidad.",
    icon: WrenchScrewdriverIcon,
  },
  {
    title: "Visualización 3D (Renders)",
    description: "Imágenes fotorrealistas de alta calidad para previsualizar proyectos, vender ideas o presentaciones comerciales.",
    icon: CubeTransparentIcon,
  },
  {
    title: "Desarrollo de Legajos Técnicos",
    description: "Documentación exhaustiva para licitaciones y construcción. Planos de detalle, instalaciones, iluminación corporativa.",
    icon: DocumentTextIcon,
  },
];

export default function Services() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-marfil border-t border-linea">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-baseline justify-center gap-4 mb-4">
              <span className="text-sm tracking-[0.25em] text-bronce">02</span>
              <h2 className="eyebrow">Especialidad</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-medium text-tierra mb-6">
              Arquitectura &amp; diseño comercial
            </h3>
            <p className="text-texto-suave text-lg text-balance font-light leading-relaxed">
              Soluciones integrales de diseño y remodelación de locales comerciales enfocadas en resultados reales de negocio.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 lg:p-12 bg-crudo border border-linea hover:border-arena transition-colors duration-300 group"
            >
              <div className="w-14 h-14 border border-bronce/40 flex items-center justify-center mb-8 group-hover:bg-noche group-hover:border-noche transition-colors duration-300">
                <service.icon className="w-7 h-7 text-bronce group-hover:text-crudo transition-colors duration-300" />
              </div>
              <h4 className="text-2xl font-medium text-tierra mb-4">
                {service.title}
              </h4>
              <p className="text-texto-suave leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
