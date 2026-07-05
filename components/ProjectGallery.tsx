"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LIGHT_BLUR } from "@/lib/blur";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface ProjectGalleryProps {
  images: string[];
  projectName: string;
}

export default function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, prev, next]);

  return (
    <>
      <div className="space-y-8 md:space-y-12">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            aria-label={`Ampliar imagen ${idx + 1} de ${projectName}`}
            className="relative w-full aspect-[4/3] md:aspect-auto md:min-h-[60vh] bg-crudo border border-linea block cursor-zoom-in group"
          >
            <Image
              src={img}
              alt={`${projectName} - Imagen ${idx + 1}`}
              fill
              placeholder="blur"
              blurDataURL={LIGHT_BLUR}
              className="object-cover group-hover:opacity-90 transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-noche/95 backdrop-blur-sm flex items-center justify-center"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Galería de ${projectName}`}
          >
            <button
              onClick={close}
              aria-label="Cerrar galería"
              className="absolute top-6 right-6 z-10 p-2 text-crudo/70 hover:text-crudo transition-colors"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Imagen anterior"
              className="absolute left-4 md:left-8 z-10 p-3 text-crudo/70 hover:text-crudo hover:bg-crudo/10 transition-colors"
            >
              <ChevronLeftIcon className="w-8 h-8" />
            </button>

            <div
              className="relative w-[90vw] h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]}
                alt={`${projectName} - Imagen ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Imagen siguiente"
              className="absolute right-4 md:right-8 z-10 p-3 text-crudo/70 hover:text-crudo hover:bg-crudo/10 transition-colors"
            >
              <ChevronRightIcon className="w-8 h-8" />
            </button>

            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-crudo/60 tracking-[0.2em]">
              {lightboxIndex + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
