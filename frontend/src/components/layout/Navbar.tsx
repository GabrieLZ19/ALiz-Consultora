"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sun,
  Moon,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  FileText,
  Table,
  Phone,
  Shield,
} from "lucide-react";
import { useTheme } from "@/lib/themeContext";
import { useCart } from "@/lib/cartContext";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { cartCount, setIsCartOpen } = useCart();
  const [activeDropdown, setActiveDropdown] = useState<
    "soluciones" | "consultoria" | null
  >(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "editorial" ? "midnight" : "editorial");
  };

  return (
    <>
      <header className="w-full bg-brand-bg/95 backdrop-blur-md border-b border-custom/60 sticky top-0 z-50 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* LOGOTIPO */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative w-28 h-8 lg:w-32 lg:h-9 flex items-center justify-center transition-transform hover:scale-105">
              <Image
                src="/logo.png"
                alt="ALiZ Soluciones"
                width={120}
                height={36}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* NAVEGACIÓN DESKTOP ESCALABLE */}
          <nav className="hidden xl:flex items-center space-x-6 text-[10px] tracking-[0.2em] uppercase font-sans font-medium relative">
            <Link
              href="/"
              className="text-text-muted hover:text-text-main transition-colors py-2"
            >
              Inicio
            </Link>

            {/* DROPDOWN: SOLUCIONES (CATÁLOGO INFOPRODUCTOS) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("soluciones")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/productos"
                className="text-text-muted group-hover:text-text-main transition-colors flex items-center gap-1 py-2 uppercase tracking-[0.2em]"
              >
                Soluciones
                <ChevronDown
                  size={11}
                  className={`transition-transform duration-300 ${activeDropdown === "soluciones" ? "rotate-180" : ""}`}
                />
              </Link>

              {activeDropdown === "soluciones" && (
                <div className="absolute top-full left-0 w-64 bg-brand-card border border-custom/60 p-3 space-y-2 shadow-2xl rounded-md animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/productos?categoria=ebooks"
                    className="flex items-center gap-3 p-2 hover:bg-brand-gold/10 rounded transition-colors group/item"
                  >
                    <BookOpen size={14} className="text-brand-gold" />
                    <div>
                      <span className="text-[10px] text-text-main font-semibold block">
                        E-Books Prácticos
                      </span>
                      <span className="text-[9px] text-text-muted normal-case block">
                        Guías en PDF paso a paso
                      </span>
                    </div>
                  </Link>
                  <Link
                    href="/productos?categoria=politicas"
                    className="flex items-center gap-3 p-2 hover:bg-brand-gold/10 rounded transition-colors group/item"
                  >
                    <FileText size={14} className="text-brand-gold" />
                    <div>
                      <span className="text-[10px] text-text-main font-semibold block">
                        Políticas Editables
                      </span>
                      <span className="text-[9px] text-text-muted normal-case block">
                        Plantillas en Word listas
                      </span>
                    </div>
                  </Link>
                  <Link
                    href="/productos?categoria=formatos"
                    className="flex items-center gap-3 p-2 hover:bg-brand-gold/10 rounded transition-colors group/item"
                  >
                    <Table size={14} className="text-brand-gold" />
                    <div>
                      <span className="text-[10px] text-text-main font-semibold block">
                        Formatos & Excel
                      </span>
                      <span className="text-[9px] text-text-muted normal-case block">
                        Checklists y calculadoras
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* DROPDOWN: CONSULTORÍA */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("consultoria")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/consultoria"
                className="text-text-muted group-hover:text-text-main transition-colors flex items-center gap-1 py-2 uppercase tracking-[0.2em]"
              >
                Consultoría
                <ChevronDown
                  size={11}
                  className={`transition-transform duration-300 ${activeDropdown === "consultoria" ? "rotate-180" : ""}`}
                />
              </Link>

              {activeDropdown === "consultoria" && (
                <div className="absolute top-full left-0 w-64 bg-brand-card border border-custom/60 p-3 space-y-2 shadow-2xl rounded-md animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/consultoria"
                    className="flex items-center gap-3 p-2 hover:bg-brand-gold/10 rounded transition-colors"
                  >
                    <Shield size={14} className="text-brand-gold" />
                    <div>
                      <span className="text-[10px] text-text-main font-semibold block">
                        RH Externo Integral
                      </span>
                      <span className="text-[9px] text-text-muted normal-case block">
                        Gestión remota de personal
                      </span>
                    </div>
                  </Link>
                  <Link
                    href="/consultoria"
                    className="flex items-center gap-3 p-2 hover:bg-brand-gold/10 rounded transition-colors"
                  >
                    <Phone size={14} className="text-brand-gold" />
                    <div>
                      <span className="text-[10px] text-text-main font-semibold block">
                        Administración Remota
                      </span>
                      <span className="text-[9px] text-text-muted normal-case block">
                        Control contable y fiscal
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/quienes-somos"
              className="text-text-muted hover:text-text-main transition-colors py-2"
            >
              Quiénes Somos
            </Link>

            <Link
              href="/contacto"
              className="text-text-muted hover:text-text-main transition-colors py-2"
            >
              Contacto
            </Link>
          </nav>

          {/* UTILIDADES Y CTA */}
          <div className="flex items-center gap-3 lg:gap-4">
            <Link href="/diagnostico" className="hidden sm:inline-block">
              <button className="px-3.5 py-1.5 border border-brand-gold/60 text-brand-gold text-[9px] tracking-[0.15em] uppercase rounded-full hover:bg-brand-gold hover:text-brand-bg font-bold transition-all duration-300 cursor-pointer">
                Diagnóstico Gratuito
              </button>
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 bg-brand-card border border-custom/60 rounded-full text-text-muted hover:text-brand-gold transition-all duration-300 cursor-pointer"
              title={theme === "editorial" ? "Modo Claro" : "Modo Oscuro"}
            >
              {theme === "editorial" ? <Sun size={13} /> : <Moon size={13} />}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-brand-card border border-custom/60 rounded-full text-text-muted hover:text-text-main transition-all duration-300 cursor-pointer"
            >
              <ShoppingBag size={13} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold text-brand-bg text-[8px] font-mono font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <Link href="/login">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-card border border-brand-gold/40 text-brand-gold text-[9px] tracking-[0.15em] uppercase rounded-full hover:bg-brand-gold hover:text-brand-bg font-semibold transition-all duration-300">
                <User size={11} />
                <span className="hidden md:inline">Acceso</span>
              </button>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden p-1.5 text-text-muted hover:text-text-main"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* MENÚ MÓVIL RESPONSIVO */}
      <div
        className={`fixed inset-0 z-100 transition-all duration-300 xl:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-brand-bg border-l border-custom/60 p-6 flex flex-col justify-between transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-custom/60 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold">
                Menú ALiZ
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-text-muted"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest text-text-muted hover:text-text-main"
              >
                Inicio
              </Link>
              <Link
                href="/productos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest text-text-muted hover:text-text-main"
              >
                Soluciones (Catálogo)
              </Link>
              <Link
                href="/consultoria"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest text-text-muted hover:text-text-main"
              >
                Servicios Consultoría
              </Link>
              <Link
                href="/diagnostico"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest text-brand-gold font-bold"
              >
                Diagnóstico Gratuito
              </Link>
              <Link
                href="/quienes-somos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest text-text-muted hover:text-text-main"
              >
                Quiénes Somos
              </Link>

              <Link
                href="/contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest text-text-muted hover:text-text-main"
              >
                Contacto
              </Link>
            </div>
          </div>
          <div className="border-t border-custom/40 pt-4">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold font-bold"
            >
              <User size={14} /> Acceso Clientes
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
