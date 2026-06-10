"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image - Using Alma Paz as best render */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/projects/alma-paz/Img_01_Alma Paz.png"
          alt="GD Estudio - Arquitectura Comercial y Diseño de Locales Comerciales"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7.5xl font-bold text-white mb-6 leading-tight font-heading text-balance">
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
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
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
