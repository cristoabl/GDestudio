"use client";

import { motion, Variants } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Relevamiento y Análisis",
    description:
      "Conocemos tu marca, tus objetivos comerciales y el espacio disponible. Analizamos el público, la competencia y las necesidades operativas del negocio.",
  },
  {
    number: "02",
    title: "Anteproyecto 3D",
    description:
      "Desarrollamos el concepto en renders fotorrealistas para definir el look & feel. Ves tu local terminado antes de invertir un peso en obra.",
  },
  {
    number: "03",
    title: "Legajo Técnico",
    description:
      "Elaboramos la documentación ejecutiva completa: planos de detalle, electricidad, iluminación, carpintería y sanitarios, listos para presupuestar sin desvíos.",
  },
  {
    number: "04",
    title: "Obra y Entrega",
    description:
      "Acompañamos la ejecución y la habilitación municipal hasta la apertura. Un servicio llave en mano, de la primera idea al local funcionando.",
  },
];

export default function Process() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="process" className="py-24 bg-black border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-medium text-gray-400 tracking-widest uppercase mb-3">Proceso</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-6">
              Cómo trabajamos
            </h3>
            <p className="text-gray-400 text-lg text-balance font-light">
              Un método probado que elimina la incertidumbre: sabés qué esperar en cada etapa del proyecto.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="bg-[#0a0a0a] p-8 lg:p-10 hover:bg-white/5 transition-colors duration-300"
            >
              <span className="block text-5xl font-heading font-bold text-white/15 mb-6">
                {step.number}
              </span>
              <h4 className="text-xl font-heading font-bold text-white mb-4">{step.title}</h4>
              <p className="text-gray-400 leading-relaxed font-light text-sm">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
