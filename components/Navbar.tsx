"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { name: "Inicio", href: "/#hero" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Servicios", href: "/#services" },
  { name: "Sobre Mí", href: "/#about" },
  { name: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sobre el hero (foto con velo Noche) y sobre el menú móvil la marca va en Crudo;
  // al hacer scroll aparece el velo claro y pasa a Tierra.
  const onDark = !isScrolled || mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      } ${isScrolled && !mobileMenuOpen ? "glass" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link
          href="/"
          aria-label="GD Estudio — Inicio"
          className={`z-50 relative flex items-baseline gap-2.5 transition-colors duration-300 ${
            onDark ? "text-crudo" : "text-tierra"
          }`}
        >
          <span className="text-[26px] leading-none font-medium tracking-wide">GD</span>
          <span
            className={`text-[11px] font-normal tracking-[0.5em] transition-colors duration-300 ${
              onDark ? "text-arena" : "text-bronce"
            }`}
          >
            ESTUDIO
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs font-normal uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300 ${
                onDark
                  ? "text-crudo/80 hover:text-crudo"
                  : "text-texto-suave hover:text-tierra"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#contact"
            className={`ml-4 px-6 py-2.5 text-xs font-normal uppercase tracking-[0.2em] transition-colors duration-300 ${
              onDark
                ? "bg-crudo text-noche hover:bg-arena"
                : "bg-noche text-crudo hover:bg-tierra"
            }`}
          >
            Hablemos
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden z-50 relative p-2 transition-colors duration-300 ${
            mobileMenuOpen ? "text-crudo" : onDark ? "text-crudo" : "text-tierra"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-noche/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-normal uppercase tracking-[0.3em] text-arena hover:text-crudo transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-6 px-10 py-3.5 text-sm font-normal uppercase tracking-[0.25em] bg-crudo text-noche hover:bg-arena transition-colors"
            >
              Hablemos de tu proyecto
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
