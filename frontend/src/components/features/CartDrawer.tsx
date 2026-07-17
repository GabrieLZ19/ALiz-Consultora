"use client";

import React from "react";
import { useCart } from "@/lib/cartContext";
import { X, Trash2, ArrowRight, Shield } from "lucide-react";

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-all duration-500 ${
        isCartOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* FONDO TRANSLÚCIDO CON TRANSICIÓN LÍQUIDA */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-500 standard-bezier ${
          isCartOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* CONTENEDOR EDITORIAL CON ANIMACIÓN DE ENTRADA Y SALIDA POR HARDWARE */}
      <div
        className={`relative w-full max-w-md bg-brand-card border-l border-custom/60 h-screen shadow-2xl flex flex-col justify-between z-10 p-6 transition-transform duration-500 standard-bezier will-change-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cabecera */}
        <div className="flex justify-between items-center border-b border-custom/60 pb-4">
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-brand-gold-muted font-mono font-medium block">
              Bolsa Editorial
            </span>
            <h2 className="text-xl font-editorial text-text-main">
              Tu Selección ({cartCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 border border-custom/60 rounded-full text-text-muted hover:text-text-main hover:border-brand-gold/40 transition-all duration-300 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Lista de Infoproductos Seleccionados */}
        <div className="grow overflow-y-auto py-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-center space-y-2 text-text-muted animate-fade-in">
              <p className="font-editorial italic text-sm">
                El índice está vacío.
              </p>
              <p className="text-[10px] uppercase tracking-wider font-light">
                Añade herramientas estratégicas para comenzar.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="border border-custom/60 p-4 bg-brand-bg rounded-lg flex justify-between items-start gap-4 transition-all duration-300 hover:border-brand-gold/20 shadow-sm"
              >
                <div className="space-y-1">
                  <span className="text-[8px] uppercase tracking-widest text-brand-gold font-mono font-medium block">
                    {item.platform}
                  </span>
                  <h4 className="text-sm font-editorial text-text-main font-medium">
                    {item.title}
                  </h4>
                  <span className="text-sm font-mono text-brand-gold font-medium block pt-1">
                    {item.price}
                  </span>
                </div>
                <button
                  onClick={() => removeFromCart(item.slug)}
                  className="text-text-muted hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Resumen de la Orden Financiera */}
        <div className="border-t border-custom/60 pt-6 space-y-4 bg-brand-card">
          <div className="flex justify-between items-baseline font-mono">
            <span className="text-[10px] uppercase tracking-widest text-text-muted">
              Subtotal Estimado
            </span>
            <span className="text-2xl text-text-main font-semibold tracking-tight">
              ${cartTotal.toFixed(2)} USD
            </span>
          </div>

          <button
            disabled={cartItems.length === 0}
            className="w-full py-4 bg-brand-gold text-brand-bg text-[10px] uppercase tracking-widest font-bold rounded-md hover:bg-text-main hover:text-brand-bg transition-all duration-500 shadow-xl disabled:opacity-40  flex items-center justify-center gap-2 group/btn cursor-pointer"
          >
            Procesar Orden de Compra
            <ArrowRight
              size={12}
              className="transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-300"
            />
          </button>

          <p className="text-[9px] text-brand-gold-muted flex items-center gap-1.5 justify-center uppercase tracking-widest font-mono font-medium pt-1">
            <Shield size={12} className="text-brand-gold animate-pulse" />{" "}
            Servidor de Pago Blindado SSL
          </p>
        </div>
      </div>
    </div>
  );
};
