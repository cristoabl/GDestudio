"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LIGHT_BLUR } from "@/lib/blur";
import CountUp from "./CountUp";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-marfil overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none"
          >
            <Image
              src="/about/gabriela-dodelson.webp"
              alt="Gabriela Dodelson — arquitecta especialista en arquitectura comercial y diseño de locales"
              fill
              placeholder="blur"
              blurDataURL={LIGHT_BLUR}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Marco editorial interior */}
            <div className="absolute inset-0 border border-crudo/60 m-6 pointer-events-none"></div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-sm tracking-[0.25em] text-bronce">04</span>
              <h2 className="eyebrow">El Estudio</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-medium text-tierra mb-8">
              Gabriela Dodelson
            </h3>

            <div className="space-y-6 text-texto font-light text-lg leading-relaxed mb-10 text-balance">
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

            <div className="grid grid-cols-2 gap-8 border-t border-linea pt-8">
              <div>
                <CountUp value={10} prefix="+" className="block text-4xl font-medium text-tierra mb-2" />
                <span className="text-xs text-bronce uppercase tracking-[0.25em]">Años Experiencia</span>
              </div>
              <div>
                <CountUp value={50} prefix="+" className="block text-4xl font-medium text-tierra mb-2" />
                <span className="text-xs text-bronce uppercase tracking-[0.25em]">Proyectos Retail</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
