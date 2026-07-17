"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import Link from "next/link";
import Image from "next/image";

export const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // Detectamos dinámicamente el ancho de pantalla para ajustar el límite del carrusel
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize(); // Ejecución inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Si es escritorio (muestra 2 tarjetas), el límite real de pasos es la longitud menos 1.
  // En móviles (muestra 1 tarjeta), puede avanzar libremente por cada producto.
  const maxSlides = isDesktop ? MOCK_PRODUCTS.length - 1 : MOCK_PRODUCTS.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxSlides - 1 : prev - 1));
  };

  return (
    <div className="w-full space-y-8">
      <div className="relative overflow-hidden p-1">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] gap-6"
          style={{
            transform: `translateX(-${currentIndex * (isDesktop ? 50 : 100)}%)`,
            willChange: "transform",
          }}
        >
          {MOCK_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="w-full lg:w-[calc(50%-12px)] shrink-0 bg-brand-card border border-custom/60 p-6 rounded-lg grid grid-cols-1 md:grid-cols-12 gap-6 hover:border-brand-gold/40 shadow-xl relative group transition-all duration-500 hover:-translate-y-1"
            >
              {/* Imagen de Portada con Zoom Suave Integrado */}
              <div className="md:col-span-5 relative aspect-3/4 rounded-md overflow-hidden bg-brand-bg border border-custom/40 shadow-md">
                <Image
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-cover opacity-85  group-hover:opacity-100 transition-all duration-700 ease-in-out filter contrast-[1.02]"
                  width={300}
                  height={400}
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-card/90 via-transparent to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-20" />
              </div>

              {/* Datos Técnicos */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                    <span className="text-[9px] text-text-muted font-mono ml-2">
                      (4.9)
                    </span>
                  </div>
                  <h3 className="text-lg font-editorial text-text-main tracking-wide leading-snug group-hover:text-brand-gold transition-colors duration-300">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-text-muted font-light leading-relaxed line-clamp-3">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-custom/40 flex items-center justify-between">
                  <span className="text-lg font-mono text-text-main font-semibold tracking-tight">
                    {prod.price}
                  </span>
                  <Link href={`/productos/${prod.slug}`}>
                    <button className="px-5 py-2.5 bg-brand-gold text-brand-bg text-[9px] uppercase tracking-widest font-bold rounded-md hover:bg-text-main hover:shadow-lg transition-all duration-500 transform active:scale-98 cursor-pointer">
                      Adquirir
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles Dinámicos Respirados */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={prevSlide}
          className="p-3 border border-custom/60 rounded-full text-text-muted hover:text-text-main hover:border-brand-gold/60 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
        >
          <ArrowLeft size={13} />
        </button>

        {/* Indicadores Dinámicos Simplificados */}
        <div className="flex gap-2">
          {[...Array(maxSlides)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${currentIndex === idx ? "w-5 bg-brand-gold" : "w-1.5 bg-brand-gold-muted/20 hover:bg-brand-gold-muted/50"}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 border border-custom/60 rounded-full text-text-muted hover:text-text-main hover:border-brand-gold/60 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
        >
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
