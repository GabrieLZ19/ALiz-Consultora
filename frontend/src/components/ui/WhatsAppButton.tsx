"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

export const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Entrada elegante tras la carga inicial del sitio
    const timer = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleChat = () => {
    window.open("https://wa.me/+523521117649", "_blank");
  };

  return (
    <button
      onClick={handleChat}
      className={`fixed bottom-6 right-6 z-50 h-12 px-4 bg-brand-gold text-brand-bg rounded-full shadow-2xl flex items-center justify-center group transition-all duration-500 standard-bezier hover:scale-[1.03] active:scale-97 hover:shadow-brand-gold/10 border border-brand-gold/10 cursor-pointer will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center justify-center relative overflow-hidden">
        {/* TEXTO CON REVELADO POR MÁSCARA (CLIP-PATH DE ALTA GAMA) */}
        <span
          className="w-0 opacity-0 group-hover:w-20 group-hover:opacity-100 transition-all duration-600 standard-bezier whitespace-nowrap font-sans text-[9px] uppercase tracking-[0.25em] font-bold leading-none select-none pointer-events-none block"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            willChange: "width, opacity",
          }}
        >
          Consultar
        </span>

        {/* ICONO CON RETRASO DE DESPLAZAMIENTO SUTIL */}
        <MessageSquare
          size={14}
          className="transform rotate-0 group-hover:rotate-6 group-hover:ml-1 transition-all duration-600 standard-bezier shrink-0 relative z-10"
        />
      </div>
    </button>
  );
};
