import Link from "next/link";
import { ArrowLeft, Home, Package, Mail, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-bg text-text-main flex items-center justify-center p-6 relative overflow-hidden font-sans transition-colors duration-500">
      {/* GLOW DE FONDO EDITORIAL ALIZ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-8 relative z-10">
        {/* NÚMERO Y BADGE */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 border border-brand-gold/30 rounded-full text-brand-gold text-[10px] font-sans font-bold uppercase tracking-widest">
            <ShieldAlert size={12} /> ALiZ Consultora • Error 404
          </div>

          <h1 className="text-7xl sm:text-9xl font-editorial font-light text-brand-gold tracking-tight select-none">
            404
          </h1>
        </div>

        {/* TÍTULO Y DESCRIPCIÓN */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-text-main">
            Recurso No Encontrado
          </h2>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-md mx-auto">
            La página o documento que intentas consultar no existe o ha sido
            reubicada dentro del portal de servicios de ALiZ Consultora.
          </p>
        </div>

        {/* ACCIONES Y BOTONES DE NAVEGACIÓN */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-brand-gold text-brand-bg text-xs font-sans font-bold uppercase tracking-widest rounded-lg hover:bg-brand-gold/90 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <Home size={14} /> Volver a Portada
          </Link>

          <Link
            href="/productos"
            className="w-full sm:w-auto px-6 py-3 bg-brand-card border border-custom/60 text-text-main text-xs font-sans font-semibold uppercase tracking-widest rounded-lg hover:border-brand-gold/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Package size={14} className="text-brand-gold" /> Catálogo
          </Link>

          <Link
            href="/contacto"
            className="w-full sm:w-auto px-6 py-3 bg-brand-card border border-custom/60 text-text-muted hover:text-text-main text-xs font-sans font-semibold uppercase tracking-widest rounded-lg hover:border-brand-gold/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Mail size={14} className="text-brand-gold" /> Contacto
          </Link>
        </div>

        <div className="pt-8 border-t border-custom/40 text-[10px] text-text-muted uppercase tracking-widest font-sans">
          Si consideras que esto es un error, contáctanos a{" "}
          <a
            href="mailto:contacto@alizconsultora.com"
            className="text-brand-gold hover:underline font-semibold"
          >
            contacto@alizconsultora.com
          </a>
        </div>
      </div>
    </main>
  );
}
