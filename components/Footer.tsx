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
    <footer className="bg-noche border-t border-crudo/10 pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex flex-col gap-2 mb-6" aria-label="GD Estudio — Inicio">
              <span className="text-3xl leading-none font-medium tracking-wide text-crudo">GD</span>
              <span className="text-[10px] font-normal tracking-[0.55em] text-arena">ESTUDIO</span>
              <span className="text-[8px] font-light tracking-[0.35em] text-arena-suave">ARQUITECTURA &amp; DISEÑO</span>
            </Link>
            <p className="text-arena-suave font-light max-w-sm text-balance leading-relaxed">
              Diseño arquitectónico especializado en espacios comerciales, retail y experiencias de marca que conectan y convierten.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-normal uppercase tracking-[0.3em] text-arena mb-5">Navegación</h3>
            <ul className="space-y-3 flex flex-col">
              <li><Link href="/#portfolio" className="text-arena-suave hover:text-crudo transition-colors text-sm font-light">Portfolio</Link></li>
              <li><Link href="/#services" className="text-arena-suave hover:text-crudo transition-colors text-sm font-light">Servicios</Link></li>
              <li><Link href="/#about" className="text-arena-suave hover:text-crudo transition-colors text-sm font-light">Sobre Mí</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-normal uppercase tracking-[0.3em] text-arena mb-5">Contacto</h3>
            <ul className="space-y-3 flex flex-col">
              <li>
                <a href="mailto:contacto@gdestudio.com.ar" className="flex items-center gap-2.5 text-arena-suave hover:text-crudo transition-colors text-sm font-light">
                  <EnvelopeIcon className="w-4 h-4 shrink-0" />
                  contacto@gdestudio.com.ar
                </a>
              </li>
              <li>
                <a href="https://wa.me/5493512139252" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-arena-suave hover:text-crudo transition-colors text-sm font-light">
                  <PhoneIcon className="w-4 h-4 shrink-0" />
                  +54 9 351 213-9252
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/gdestudio.arq" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-arena-suave hover:text-crudo transition-colors text-sm font-light">
                  <InstagramIcon className="w-4 h-4 shrink-0" />
                  @gdestudio.arq
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-arena-suave text-sm font-light mt-2">
                <MapPinIcon className="w-4 h-4 shrink-0" />
                Córdoba, Argentina
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-crudo/10 text-xs font-light text-arena-suave">
          <p>© {currentYear} GD Estudio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
