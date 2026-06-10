"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 bg-black overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none grayscale hover:grayscale-0 transition-all duration-700"
          >
            <Image
              src="/projects/bacar/03-Taller Bacar Interior.png"
              alt="Gabriela Dodelson - Especialista en Arquitectura Comercial y Diseño de Locales"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Decorative frame overlay */}
            <div className="absolute inset-0 border border-white/20 m-6 pointer-events-none"></div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-sm font-medium text-gray-400 tracking-widest uppercase mb-3">Estudio de Arquitectura Comercial</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-8">
              Gabriela Dodelson
            </h3>
            
            <div className="space-y-6 text-gray-400 font-light text-lg leading-relaxed mb-10 text-balance">
              <p>
                Graduada de la FAUD-UNC (2015), he consolidado mi trayectoria especializándome en el diseño y la arquitectura comercial en Córdoba.
              </p>
              <p>
                Desde 2018, transformo visiones de marca en legajos técnicos rigurosos y realidades tangibles. Mi enfoque combina la precisión técnica con el entendimiento profundo de los objetivos comerciales, el branding y el comportamiento del consumidor de cada cliente.
              </p>
              <p>
                Mi fuerte es la comunicación visual del proyecto: domino herramientas de vanguardia como Lumion, SketchUp + V-Ray y Revit. Esto me permite ofrecer una experiencia inmersiva y extremadamente precisa desde la primera idea conceptual hasta el último plano de obra.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <span className="block text-4xl font-heading font-bold text-white mb-2">+10</span>
                <span className="text-sm text-gray-500 uppercase tracking-widest">Años Experiencia</span>
              </div>
              <div>
                <span className="block text-4xl font-heading font-bold text-white mb-2">+50</span>
                <span className="text-sm text-gray-500 uppercase tracking-widest">Proyectos Retail</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
