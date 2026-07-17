"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Globe, ShoppingBag, User } from "lucide-react";
import { useTheme } from "@/lib/themeContext";
import { useCart } from "@/lib/cartContext";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { cartCount, setIsCartOpen } = useCart();
  const [openDropdown, setOpenDropdown] = useState<
    "consultoria" | "productos" | null
  >(null);

  return (
    <header className="w-full bg-brand-bg border-b border-custom/60 font-sans relative z-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* LOGOTIPO INSTITUCIONAL */}
        <Link href="/" className="flex items-center">
          <div className="relative w-32 h-10 flex items-center justify-center transition-transform duration-300 hover:scale-105">
            <Image
              src="/logo.png"
              alt="ALiz"
              width={130}
              height={40}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav className="hidden lg:flex items-center space-x-10 text-[10px] tracking-[0.25em] uppercase font-sans font-medium relative">
          <Link
            href="/"
            className="text-text-muted hover:text-text-main transition-colors duration-300"
          >
            Inicio
          </Link>

          {/* DROPDOWN CONSULTORÍA */}
          <div
            className="relative group"
            onMouseEnter={() => setOpenDropdown("consultoria")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="font-sans font-medium text-text-muted group-hover:text-text-main transition-colors duration-300 flex items-center gap-1.5 py-2 cursor-pointer uppercase tracking-[0.25em]">
              Consultoría
              <ChevronDown
                size={10}
                className={`transition-transform duration-300 ease-out ${openDropdown === "consultoria" ? "rotate-180" : ""}`}
              />
            </button>
            {openDropdown === "consultoria" && (
              <div className="absolute top-full left-0 w-64 bg-brand-card border border-custom/60 p-4 space-y-3 shadow-2xl rounded-md animate-in fade-in slide-in-from-top-2 duration-300">
                <Link
                  href="/diagnostico"
                  className="flex items-start gap-3 p-2.5 hover:bg-brand-gold/5 rounded-sm transition-colors duration-300 group/link"
                >
                  <Globe
                    size={13}
                    className="text-brand-gold mt-0.5 transform group-hover/link:rotate-12 transition-transform duration-500"
                  />
                  <div>
                    <span className="text-[10px] text-text-main block font-semibold tracking-widest uppercase">
                      Diagnóstico 360°
                    </span>
                    <span className="text-[9px] text-text-muted block normal-case font-light mt-1 tracking-wider">
                      Auditoría en 5 frentes.
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/productos"
            className="text-text-muted hover:text-text-main transition-colors duration-300"
          >
            Infoproductos
          </Link>

          {/* BOTÓN DE ACCESO AL PORTAL */}
          <Link
            href="/login"
            className="text-text-muted hover:text-brand-gold transition-colors duration-300 flex items-center gap-1.5"
          >
            <User size={12} /> Acceso
          </Link>
        </nav>

        {/* ÁREA DE UTILIDADES */}
        <div className="flex items-center gap-6">
          {/* SELECTOR DE ESTILOS */}
          <div className="flex items-center bg-brand-card border border-custom/60 rounded-full p-1.5 gap-2 shadow-sm transition-colors duration-500">
            <button
              onClick={() => setTheme("editorial")}
              className={`w-3 h-3 rounded-full bg-[#1C140E] cursor-pointer transition-all duration-300 ${theme === "editorial" ? "ring-2 ring-brand-gold scale-110" : "opacity-40 hover:opacity-80"}`}
              title="Oro Negro"
            />
            <button
              onClick={() => setTheme("midnight")}
              className={`w-3 h-3 rounded-full bg-[#967332] cursor-pointer transition-all duration-300 ${theme === "midnight" ? "ring-2 ring-black scale-110" : "opacity-40 hover:opacity-80"}`}
              title="Crema Arena"
            />
            <button
              onClick={() => setTheme("emerald")}
              className={`w-3 h-3 rounded-full bg-[#0E1524] cursor-pointer transition-all duration-300 ${theme === "emerald" ? "ring-2 ring-white scale-110" : "opacity-40 hover:opacity-80"}`}
              title="Zafiro Suite"
            />
            <button
              onClick={() => setTheme("nude")}
              className={`w-3 h-3 rounded-full bg-[#705D38] cursor-pointer transition-all duration-300 ${theme === "nude" ? "ring-2 ring-black scale-110" : "opacity-40 hover:opacity-80"}`}
              title="Atelier Nude"
            />
            <button
              onClick={() => setTheme("oxford")}
              className={`w-3 h-3 rounded-full bg-[#D4AF37] cursor-pointer transition-all duration-300 ${theme === "oxford" ? "ring-2 ring-white scale-110" : "opacity-40 hover:opacity-80"}`}
              title="Oxford Gold"
            />
          </div>

          {/* BOLSA EDITORIAL (CARRITO) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 bg-brand-card border border-custom/60 rounded-full text-text-muted hover:text-text-main transition-all duration-300 cursor-pointer shadow-sm group hover:border-brand-gold/40"
          >
            <ShoppingBag
              size={13}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold text-brand-bg text-[8px] font-mono font-bold flex items-center justify-center rounded-full animate-in zoom-in duration-300 shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* CTA DIAGNÓSTICO LIGADO AL WIZARD */}
          <Link href="/diagnostico">
            <button className="hidden sm:flex px-5 py-2.5 border border-brand-gold/60 text-brand-gold text-[9px] tracking-[0.2em] uppercase rounded-full hover:bg-brand-gold hover:text-brand-bg font-bold transition-all duration-300 cursor-pointer shadow-sm active:scale-95 font-sans">
              Agendar Diagnóstico
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
