import Link from "next/link";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-heading font-bold tracking-tighter text-white inline-block mb-4">
              GD<span className="text-gray-400 font-light"> Estudio</span>
            </Link>
            <p className="text-gray-400 max-w-sm text-balance">
              Diseño arquitectónico especializado en espacios comerciales, retail y experiencias de marca que conectan y convierten.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Navegación</h3>
            <ul className="space-y-3 flex flex-col">
              <li><Link href="/#portfolio" className="text-gray-400 hover:text-white transition-colors text-sm">Portfolio</Link></li>
              <li><Link href="/#services" className="text-gray-400 hover:text-white transition-colors text-sm">Servicios</Link></li>
              <li><Link href="/#about" className="text-gray-400 hover:text-white transition-colors text-sm">Sobre Mí</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Contacto</h3>
            <ul className="space-y-3 flex flex-col">
              <li>
                <a href="mailto:contacto@gdestudio.com.ar" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors text-sm">
                  <EnvelopeIcon className="w-4 h-4 shrink-0" />
                  contacto@gdestudio.com.ar
                </a>
              </li>
              <li>
                <a href="https://wa.me/5493512139252" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors text-sm">
                  <PhoneIcon className="w-4 h-4 shrink-0" />
                  +54 9 351 213-9252
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/gdestudio.arq" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors text-sm">
                  <InstagramIcon className="w-4 h-4 shrink-0" />
                  @gdestudio.arq
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-sm mt-2">
                <MapPinIcon className="w-4 h-4 shrink-0" />
                Córdoba, Argentina
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-500">
          <p>© {currentYear} Gabriela Dodelson Arquitectura. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
