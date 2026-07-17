"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import {
  Shield,
  ArrowLeft,
  ShoppingCart,
  CheckCircle,
  Star,
  Sparkles,
  Download,
} from "lucide-react";
import { useCart } from "@/lib/cartContext";

export default function DetalleProductoPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  // Estados interactivos para simular el comportamiento de e-commerce real
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Buscamos el producto exacto usando el slug de la URL
  const product = MOCK_PRODUCTS.find((p) => p.slug === id);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-6 bg-brand-bg px-6">
        <h2 className="text-2xl font-editorial text-text-main tracking-wide">
          Publicación no encontrada
        </h2>
        <p className="text-xs text-text-muted max-w-xs font-light">
          El recurso estratégico solicitado no forma parte del índice de la
          edición actual.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-5 py-2.5 border border-brand-gold text-brand-gold font-mono text-[9px] uppercase tracking-widest rounded-full hover:bg-brand-gold hover:text-brand-bg transition-all duration-300 cursor-pointer"
        >
          Volver a la portada
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      addToCart(product); // Añade el producto real al carrito global
      setTimeout(() => setIsAdded(false), 2000);
    }, 800); // Modifica el timeout de simulación a algo real y veloz como 800ms para la llamada:
  };
  return (
    <main className="min-h-screen bg-brand-bg text-text-main py-16 px-6 transition-colors duration-500 font-sans relative overflow-hidden">
      {/* Luz ambiental sutil en el fondo de la página */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-brand-gold/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out relative z-10">
        {/* NAVEGACIÓN EN RETORNO */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-gold hover:text-text-main transition-colors duration-300 font-mono font-medium group cursor-pointer"
        >
          <ArrowLeft
            size={13}
            className="transform translate-x-0 group-hover:-translate-x-0.5 transition-transform"
          />
          Regresar al Índice
        </button>

        {/* ENTORNO PRINCIPAL DEL INFOPRODUCTO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-brand-card border border-custom/60 p-6 md:p-10 rounded-lg shadow-2xl transition-all duration-500 hover:border-custom/80">
          {/* COLUMNA IZQUIERDA: PORTADA REAL DE ALTA GAMA */}
          <div className="lg:col-span-5 relative aspect-3/4 rounded-md overflow-hidden bg-brand-bg border border-custom/60 group shadow-lg">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover opacity-85 group-hover:scale-102 transition-transform duration-700 ease-out filter contrast-[1.02]"
              sizes="(max-w-7xl) 33vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-card/60 via-transparent to-transparent opacity-60" />

            {/* Sello superior elegante */}
            <div className="absolute top-4 left-4 bg-brand-bg/80 border border-custom/60 backdrop-blur-md text-[8px] font-mono uppercase tracking-[0.15em] text-brand-gold px-2.5 py-1 rounded-sm font-medium">
              ALiz Casa Editorial
            </div>
          </div>

          {/* COLUMNA DERECHA: ESPECIFICACIONES Y ACCIONES DE VENTA */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[9px] uppercase tracking-[0.2em] text-brand-gold bg-brand-gold/5 border border-brand-gold/10 px-3 py-1 rounded-full font-mono font-semibold">
                  {product.platform}
                </span>
                <div className="flex items-center gap-1 text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} fill="currentColor" />
                  ))}
                  <span className="text-[10px] text-text-muted font-mono ml-1.5">
                    (4.9)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-editorial text-text-main tracking-wide leading-tight">
                {product.title}
              </h1>

              <div className="w-12 h-px bg-brand-gold/30 my-4" />

              <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                {product.description} Esta publicación ejecutiva incluye las
                plantillas interactivas desbloqueadas, guías de despliegue
                operacional paso a paso y soporte automatizado de
                actualizaciones del lado del servidor durante los próximos 12
                meses.
              </p>

              {/* Atributos corporativos del infoproducto */}
              <div className="grid grid-cols-2 gap-4 pt-4 text-[11px] text-text-muted font-light">
                <div className="flex items-center gap-2">
                  <Download size={13} className="text-brand-gold" />
                  <span>Descarga Inmediata</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={13} className="text-brand-gold" />
                  <span>Acceso de por vida</span>
                </div>
              </div>
            </div>

            {/* MÓDULO DE ADQUISICIÓN Y CARRITO */}
            <div className="space-y-4 pt-6 border-t border-custom/40">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] text-brand-gold-muted uppercase tracking-widest font-mono font-medium">
                  Inversión Única
                </span>
                <span className="text-3xl font-mono text-text-main font-semibold tracking-tight">
                  {product.price}
                </span>
                <span className="text-[10px] text-text-muted/40 font-mono line-through ml-2">
                  {product.rawPrice}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {/* BOTÓN DE AGREGAR AL CARRITO INTERACTIVO */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`grow sm:grow-0 sm:w-1/2 py-4 px-6 text-[10px] uppercase tracking-widest font-bold font-sans rounded-md border flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
                    isAdded
                      ? "bg-emerald-900/20 border-emerald-500/40 text-emerald-400"
                      : "bg-brand-card border-brand-gold/40 text-brand-gold hover:bg-brand-gold/5 hover:border-brand-gold"
                  }`}
                >
                  {isAdding ? (
                    <span className="w-3.5 h-3.5 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
                  ) : isAdded ? (
                    <>
                      <CheckCircle size={14} /> ¡Añadido!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={14} /> Añadir al Carrito
                    </>
                  )}
                </button>

                {/* BOTÓN DE COMPRA DIRECTA */}
                <button className="grow sm:w-1/2 py-4 px-6 bg-brand-gold text-brand-bg text-[10px] uppercase tracking-widest font-bold font-sans rounded-md hover:bg-text-main hover:text-brand-bg transition-all duration-300 transform translate-y-0 hover:-translate-y-0.5 shadow-xl  cursor-pointer text-center">
                  Adquirir Ahora
                </button>
              </div>

              {/* Garantías de Seguridad */}
              <p className="text-[10px] text-brand-gold-muted flex items-center gap-1.5 justify-center uppercase tracking-widest font-mono font-medium pt-2">
                <Shield size={12} className="text-brand-gold animate-pulse" />{" "}
                Transacción Blindada Encriptada SSL
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
