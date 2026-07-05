"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

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
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Video ambiental solo en pantallas medianas o más: en mobile ahorra datos.
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setShowVideo(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduceMotion]);

  // Reproducir solo con la sección en pantalla.
  useEffect(() => {
    if (!showVideo) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, [showVideo]);

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
    <section id="process" ref={sectionRef} className="relative py-24 md:py-32 bg-noche overflow-hidden">
      {/* Video ambiental: manos dibujando planos (Pexels, licencia libre), bajo velo Noche */}
      {showVideo && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <video
            ref={videoRef}
            src="/videos/proceso-bg.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noche via-noche/80 to-noche"></div>
        </div>
      )}

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-baseline justify-center gap-4 mb-4">
              <span className="text-sm tracking-[0.25em] text-arena-suave">03</span>
              <h2 className="eyebrow-dark">Proceso</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-medium text-crudo mb-6">
              Cómo trabajamos
            </h3>
            <p className="text-arena-suave text-lg text-balance font-light leading-relaxed">
              Un método probado que elimina la incertidumbre: sabés qué esperar en cada etapa del proyecto.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-crudo/15 border border-crudo/15"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="bg-noche/85 p-8 lg:p-10 hover:bg-noche/70 transition-colors duration-300"
            >
              <span className="block text-5xl font-light text-arena/30 mb-6">
                {step.number}
              </span>
              <h4 className="text-xl font-medium text-crudo mb-4">{step.title}</h4>
              <p className="text-arena-suave leading-relaxed font-light text-sm">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
