"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, Loader2, ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react";
import { AuthService } from "@/services/authService";
import { notify } from "@/lib/notifications";

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      notify.error("Por favor ingresa tu correo electrónico.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await AuthService.requestPasswordReset(email);
      setIsSubmitted(true);
      notify.success(
        "Solicitud enviada",
        response.message || "Revisa tu bandeja de entrada para restablecer tu contraseña."
      );
    } catch (err: any) {
      notify.error(err.message || "Error al procesar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-brand-bg transition-colors duration-700">
      {/* COLUMNA IZQUIERDA: ATMÓSFERA EDITORIAL */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-card/40 z-0" />
        <Image
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
          alt="Atmósfera Editorial ALiZ"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          priority
        />

        <Link
          href="/login"
          className="relative z-10 flex items-center gap-2 text-text-main/60 hover:text-text-main transition-colors text-[10px] uppercase tracking-[0.2em] font-mono"
        >
          <ArrowLeft size={12} /> Volver a Iniciar Sesión
        </Link>

        <div className="relative z-10 space-y-4">
          <h2 className="text-5xl font-editorial text-text-main leading-tight">
            Restablecer <br />
            <span className="italic text-brand-gold font-light">
              Acceso
            </span>
          </h2>
          <p className="text-[11px] text-text-muted tracking-[0.2em] uppercase font-mono max-w-sm">
            Recupera el control de tu cuenta corporativa de forma rápida y segura.
          </p>
        </div>
      </div>

      {/* COLUMNA DERECHA: PANEL DE RECUPERACIÓN */}
      <div className="flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 standard-bezier">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4">
              <KeyRound size={18} />
            </div>
            <h1 className="text-2xl font-editorial text-text-main">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="text-[11px] text-text-muted tracking-wide font-light leading-relaxed">
              Ingresa el correo electrónico asociado a tu cuenta ALiZ y te enviaremos las instrucciones para restablecerla.
            </p>
          </div>

          {!isSubmitted ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="correo@empresa.com *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-bg border border-custom/60 rounded-md px-4 py-3.5 text-sm text-text-main placeholder-text-muted/40 focus:outline-none focus:border-brand-gold/60 transition-all"
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-brand-gold text-brand-bg text-[10px] uppercase tracking-widest font-bold rounded-md hover:bg-text-main transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  "Enviar enlace de recuperación"
                )}
              </button>
            </form>
          ) : (
            <div className="p-6 bg-brand-card border border-brand-gold/30 rounded-md text-center space-y-3">
              <CheckCircle2 size={32} className="text-brand-gold mx-auto" />
              <h3 className="text-sm font-editorial text-text-main">Correo enviado</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Si existe una cuenta asociada a <strong className="text-brand-gold">{email}</strong>, recibirás un correo con el enlace para restablecer tu contraseña.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-[10px] uppercase font-mono tracking-widest text-brand-gold hover:underline pt-2 inline-block cursor-pointer"
              >
                Intentar con otro correo
              </button>
            </div>
          )}

          <div className="text-center pt-2">
            <Link
              href="/login"
              className="text-[10px] uppercase tracking-widest text-text-muted hover:text-brand-gold transition-colors font-mono"
            >
              ¿Recordaste tu contraseña? Inicia sesión aquí
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-[9px] text-brand-gold-muted font-mono uppercase tracking-widest">
            <Shield size={11} className="text-brand-gold" /> Conexión encriptada SSL
          </div>
        </div>
      </div>
    </main>
  );
}
