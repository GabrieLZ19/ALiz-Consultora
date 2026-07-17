"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer
      id="contacto"
      className="bg-brand-card/30 border-t border-custom/60 pt-16 pb-12 px-6 relative z-10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-custom/40">
        {/* COLUMNA 1: LOGOTIPO AMPLIADO E IDENTIDAD */}
        <div className="space-y-4">
          <div className="relative w-32 h-10 flex items-center justify-start transition-transform duration-300 hover:scale-102">
            <Image
              src="/logo.png"
              alt="ALiz Soluciones de Negocios"
              width={130}
              height={38}
              className="object-contain"
              priority
            />
          </div>
          <p className="text-xs text-text-muted font-light leading-relaxed max-w-sm">
            Firma consultora y casa editorial dedicada a estructurar las
            decisiones comerciales y financieras que impulsan el crecimiento
            sostenible de organizaciones de alto valor.
          </p>
        </div>

        {/* COLUMNA 2: UBICACIÓN Y CANALES DE SOPORTE */}
        <div className="space-y-4">
          <h4 className="text-text-main text-[10px] uppercase tracking-[0.2em] font-semibold">
            Ubicación y Soporte
          </h4>
          <ul className="space-y-2.5 text-xs text-text-muted font-light">
            <li className="flex items-center gap-2.5 hover:text-text-main transition-colors duration-300">
              <Mail size={13} className="text-brand-gold shrink-0" />{" "}
              soporte@alizconsultora.com
            </li>
            <li className="flex items-center gap-2.5 hover:text-text-main transition-colors duration-300">
              <Phone size={13} className="text-brand-gold shrink-0" /> +52 (55)
              8765-4321
            </li>
            <li className="flex items-center gap-2.5 hover:text-text-main transition-colors duration-300">
              <MapPin size={13} className="text-brand-gold shrink-0" /> CDMX,
              México
            </li>
          </ul>
        </div>
      </div>

      {/* DERECHOS RESERVADOS */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-brand-gold-muted font-mono uppercase tracking-widest gap-4">
        <p>
          © 2026 ALiz Soluciones de Negocios. Todos los derechos reservados.
        </p>
        <div className="flex space-x-6 normal-case font-sans text-xs text-text-muted/60">
          <a href="#" className="hover:text-brand-gold transition-colors">
            Términos
          </a>
          <a href="#" className="hover:text-brand-gold transition-colors">
            Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
};
