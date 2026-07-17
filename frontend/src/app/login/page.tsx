"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, Loader2, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleOAuthLogin = (provider: "google" | "apple" | "email") => {
    setIsLoading(provider);
    setTimeout(() => setIsLoading(null), 2000);
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-brand-bg transition-colors duration-700">
      {/* COLUMNA IZQUIERDA: ATMÓSFERA EDITORIAL */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-card/40 z-0" />
        <Image
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
          alt="Atmósfera Editorial"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          priority
        />

        <Link
          href="/"
          className="relative z-10 flex items-center gap-2 text-text-main/60 hover:text-text-main transition-colors text-[10px] uppercase tracking-[0.2em] font-mono"
        >
          <ArrowLeft size={12} /> Volver a Portada
        </Link>

        <div className="relative z-10 space-y-4">
          <h2 className="text-5xl font-editorial text-text-main leading-tight">
            Acceso <br />
            <span className="italic text-brand-gold font-light">
              Estratégico
            </span>
          </h2>
          <p className="text-[11px] text-text-muted tracking-[0.2em] uppercase font-mono max-w-sm">
            Diseñamos el futuro de la operación corporativa. Bienvenida a tu
            espacio de gestión.
          </p>
        </div>
      </div>

      {/* COLUMNA DERECHA: PANEL DE ACCESO */}
      <div className="flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-sm space-y-10 animate-in fade-in slide-in-from-right-8 duration-700 standard-bezier">
          <div className="space-y-2">
            <h1 className="text-2xl font-editorial text-text-main">
              Bienvenida de nuevo
            </h1>
            <p className="text-[11px] text-text-muted tracking-wide font-light">
              Introduce tus credenciales para continuar.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleOAuthLogin("google")}
              className="w-full py-3.5 px-4 bg-brand-card border border-custom/60 hover:border-brand-gold/40 text-text-main text-[10px] uppercase tracking-[0.2em] font-medium rounded-md transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              {isLoading === "google" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                "Ingreso con Google"
              )}
            </button>
            <button
              onClick={() => handleOAuthLogin("apple")}
              className="w-full py-3.5 px-4 bg-brand-card border border-custom/60 hover:border-brand-gold/40 text-text-main text-[10px] uppercase tracking-[0.2em] font-medium rounded-md transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              {isLoading === "apple" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                "Ingreso con Apple"
              )}
            </button>
          </div>

          <div className="relative flex items-center">
            <div className="grow border-t border-custom/60"></div>
            <span className="shrink mx-4 text-brand-gold-muted uppercase font-mono text-[8px] tracking-[0.2em]">
              O acceso por correo
            </span>
            <div className="grow border-t border-custom/60"></div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="correo@empresa.com"
              className="w-full bg-brand-bg border border-custom/60 rounded-md px-4 py-4 text-sm  placeholder-text-muted/40 focus:outline-none focus:border-brand-gold/60 transition-all"
            />
            <button className="w-full py-4 bg-brand-gold text-brand-bg text-[10px] uppercase tracking-widest font-bold rounded-md hover:bg-text-main transition-all shadow-lg cursor-pointer">
              Solicitar enlace de acceso
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 text-[9px] text-brand-gold-muted font-mono uppercase tracking-widest">
            <Shield size={11} className="text-brand-gold" /> Conexión encriptada
            SSL
          </div>
        </div>
      </div>
    </main>
  );
}
