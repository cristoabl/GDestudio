"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import HeroCanvas from "./HeroCanvas";
import CountUp from "./CountUp";

// Mejores renders, uno por proyecto. `src` son versiones livianas (1600px)
// generadas en /public/hero exclusivamente para el canvas WebGL.
// Bacar abre el carrusel: es el render más oscuro y da mejor contraste al titular.
const heroImages = [
  { src: "/hero/bacar.webp", alt: "Taller Bacar — diseño industrial contemporáneo" },
  { src: "/hero/peusso.webp", alt: "Peusso — showroom de iluminación y tecnología" },
  { src: "/hero/alma-paz.webp", alt: "Alma Paz — local comercial en Urca, Córdoba" },
  { src: "/hero/la-dolfina.webp", alt: "La Dolfina — retail de alta gama en Córdoba Shopping" },
  { src: "/hero/crocco.webp", alt: "Crocco — espacio comercial en Valle Escondido" },
  { src: "/hero/zhoue.webp", alt: "Zhoue — local de indumentaria en Nuevocentro Shopping" },
  { src: "/hero/arka.webp", alt: "Arka — remodelación de local en Nuevocentro Shopping" },
  { src: "/hero/rustico.webp", alt: "Rústico — espacio gastronómico en Urca" },
];

const SLIDE_DURATION = 5000; // ms por imagen

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section id="hero" className="relative min-h-screen md:h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Carrusel de fondo: WebGL con distorsión líquida, imagen estática como base/fallback */}
      <div className="absolute inset-0 z-0 bg-noche">
        <Image
          src={heroImages[0].src}
          alt={heroImages[0].alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {!reduceMotion && <HeroCanvas images={heroImages} index={index} />}
        {/* Velo Noche para contraste (manual: texto sobre foto solo con velo al 40–60%) */}
        <div className="absolute inset-0 bg-noche/60 z-10"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col items-center text-center mt-28 mb-16 md:my-0 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <span className="block text-xs md:text-sm font-light uppercase tracking-[0.5em] text-arena mb-8">
            Arquitectura &amp; Diseño
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-medium text-crudo mb-8 leading-[1.1] text-balance">
            Arquitectura comercial y diseño de locales{" "}
            <span className="text-arena">que venden</span>
          </h1>

          <p className="text-base md:text-xl text-crudo/80 font-light mb-12 max-w-2xl mx-auto text-balance leading-relaxed">
            Especialistas en diseño comercial, retail y remodelación de locales en Córdoba, Argentina.
            Transformamos espacios físicos en experiencias memorables de marca.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#portfolio"
              className="px-10 py-4 bg-crudo text-noche font-normal text-sm uppercase tracking-[0.25em] hover:bg-arena transition-colors w-full sm:w-auto"
            >
              Ver proyectos
            </Link>
            <Link
              href="#contact"
              className="px-10 py-4 bg-transparent border border-crudo/40 text-crudo font-normal text-sm uppercase tracking-[0.25em] hover:border-crudo hover:bg-crudo/10 transition-all w-full sm:w-auto"
            >
              Contactar
            </Link>
          </div>

          {/* Indicadores de credibilidad */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-12 flex flex-col items-center gap-6"
          >
            <div className="flex items-center justify-center divide-x divide-crudo/20">
              <div className="px-6 text-center">
                <CountUp value={10} prefix="+" className="block text-2xl md:text-3xl font-medium text-crudo" />
                <span className="text-[10px] md:text-xs text-arena-suave uppercase tracking-[0.2em]">Años de experiencia</span>
              </div>
              <div className="px-6 text-center">
                <CountUp value={50} prefix="+" className="block text-2xl md:text-3xl font-medium text-crudo" />
                <span className="text-[10px] md:text-xs text-arena-suave uppercase tracking-[0.2em]">Proyectos comerciales</span>
              </div>
              <div className="px-6 text-center">
                <CountUp value={100} suffix="%" className="block text-2xl md:text-3xl font-medium text-crudo" />
                <span className="text-[10px] md:text-xs text-arena-suave uppercase tracking-[0.2em]">Llave en mano</span>
              </div>
            </div>
            <p className="text-[11px] md:text-sm text-arena-suave font-light tracking-wide px-4 text-balance leading-relaxed">
              Marcas que confiaron:{" "}
              <span className="text-arena">Rústico · La Dolfina · Arka · Zhoue · Peusso · Crocco</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicadores del carrusel */}
      {!reduceMotion && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 hidden sm:flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ver render ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-8 bg-crudo" : "w-1.5 bg-crudo/40 hover:bg-crudo/70"
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
      >
        <Link href="#portfolio" aria-label="Scroll down">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 border border-crudo/40 rounded-full flex justify-center p-1"
          >
            <div className="w-1 h-2 bg-crudo rounded-full"></div>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
