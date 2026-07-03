"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import HeroCanvas from "./HeroCanvas";

// Mejores renders, uno por proyecto. `src` son versiones livianas (1600px)
// generadas en /public/hero exclusivamente para el canvas WebGL.
const heroImages = [
  { src: "/hero/alma-paz.webp", alt: "Alma Paz — local comercial en Urca, Córdoba" },
  { src: "/hero/bacar.webp", alt: "Taller Bacar — diseño industrial contemporáneo" },
  { src: "/hero/la-dolfina.webp", alt: "La Dolfina — retail de alta gama en Córdoba Shopping" },
  { src: "/hero/peusso.webp", alt: "Peusso — showroom de iluminación y tecnología" },
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
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          src={heroImages[0].src}
          alt={heroImages[0].alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {!reduceMotion && <HeroCanvas images={heroImages} index={index} />}
        {/* Overlay oscuro para contraste */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col items-center text-center mt-28 mb-16 md:my-0 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-bold text-white mb-6 leading-tight font-heading text-balance">
            Arquitectura Comercial & <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Diseño de Locales</span> Comerciales
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto font-light text-balance">
            Especialistas en diseño comercial, retail y remodelación de locales comerciales en Córdoba, Argentina. Transformamos espacios físicos en experiencias memorables de marca.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#portfolio"
              className="px-8 py-4 bg-white text-black font-medium text-lg hover:bg-gray-200 transition-colors w-full sm:w-auto"
            >
              Ver Proyectos
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 bg-transparent border border-white/30 text-white font-medium text-lg hover:bg-white/10 hover:border-white transition-all w-full sm:w-auto"
            >
              Contactar
            </Link>
          </div>

          {/* Indicadores de credibilidad */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-10 flex flex-col items-center gap-5"
          >
            <div className="flex items-center justify-center divide-x divide-white/20">
              <div className="px-6 text-center">
                <span className="block text-2xl md:text-3xl font-heading font-bold text-white">+10</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Años de experiencia</span>
              </div>
              <div className="px-6 text-center">
                <span className="block text-2xl md:text-3xl font-heading font-bold text-white">+50</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Proyectos comerciales</span>
              </div>
              <div className="px-6 text-center">
                <span className="block text-2xl md:text-3xl font-heading font-bold text-white">100%</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Llave en mano</span>
              </div>
            </div>
            <p className="text-[11px] md:text-sm text-gray-400 font-light tracking-wide px-4 text-balance leading-relaxed">
              Marcas que confiaron:{" "}
              <span className="text-gray-200">Rústico · La Dolfina · Arka · Zhoue · Peusso · Crocco</span>
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
                i === index ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
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
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
          >
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
