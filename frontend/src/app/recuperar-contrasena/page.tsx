"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Shield,
  Loader2,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { AuthService } from "@/services/authService";
import { notify } from "@/lib/notifications";

function RecoverPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [accessToken, setAccessToken] = useState<string>("");
  const isResetMode = Boolean(accessToken);

  // Detectar el token tanto en Query Params (?) como en el Hash de Supabase (#)
  useEffect(() => {
    // 1. Intentar buscar en Query Params
    const tokenFromParams =
      searchParams.get("token") ||
      searchParams.get("code") ||
      searchParams.get("access_token");

    // 2. Intentar buscar en el Hash (#access_token=...)
    let tokenFromHash = "";
    if (typeof window !== "undefined" && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      tokenFromHash =
        hashParams.get("access_token") || hashParams.get("token") || "";
    }

    const finalToken = tokenFromParams || tokenFromHash;
    if (finalToken) {
      setAccessToken(finalToken);
    }
  }, [searchParams]);

  // Estados Formulario 1: Solicitar Email
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Estados Formulario 2: Restablecer Contraseña
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isResetSuccess, setIsResetSuccess] = useState<boolean>(false);

  // Solicitud de envío de correo
  const handleRequestSubmit = async (e: React.FormEvent) => {
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
        response.message ||
          "Revisa tu bandeja de entrada para restablecer tu contraseña.",
      );
    } catch (err: any) {
      notify.error(err.message || "Error al procesar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cambio real de contraseña
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      notify.error("Por favor completa ambos campos.");
      return;
    }

    if (password.length < 6) {
      notify.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      notify.error("Las contraseñas no coinciden.");
      return;
    }

    setIsSubmitting(true);

    try {
      await AuthService.resetPassword(password, accessToken);
      setIsResetSuccess(true);
      notify.success(
        "¡Éxito!",
        "Tu contraseña ha sido actualizada correctamente.",
      );

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      notify.error(
        err.message ||
          "No se pudo actualizar la contraseña. El enlace puede haber expirado.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 standard-bezier">
      {/* MODO 2: RECOPILAR NUEVA CONTRASEÑA */}
      {isResetMode ? (
        <>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4">
              <Lock size={18} />
            </div>
            <h1 className="text-2xl font-editorial text-text-main">
              Nueva Contraseña
            </h1>
            <p className="text-[11px] text-text-muted tracking-wide font-light leading-relaxed">
              Ingresa y confirma tu nueva contraseña para actualizar el acceso a
              tu cuenta ALiZ.
            </p>
          </div>

          {!isResetSuccess ? (
            <form className="space-y-4" onSubmit={handleResetSubmit}>
              <div>
                <input
                  type="password"
                  placeholder="Nueva Contraseña (mín. 6 caracteres) *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-brand-bg border border-custom/60 rounded-md px-4 py-3.5 text-sm text-text-main placeholder-text-muted/40 focus:outline-none focus:border-brand-gold/60 transition-all"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirmar Nueva Contraseña *"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-brand-bg border border-custom/60 rounded-md px-4 py-3.5 text-sm text-text-main placeholder-text-muted/40 focus:outline-none focus:border-brand-gold/60 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-brand-gold text-brand-bg text-[10px] uppercase tracking-widest font-bold rounded-md hover:bg-text-main transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  "Actualizar Contraseña"
                )}
              </button>
            </form>
          ) : (
            <div className="p-6 bg-brand-card border border-brand-gold/30 rounded-md text-center space-y-3">
              <CheckCircle2 size={32} className="text-brand-gold mx-auto" />
              <h3 className="text-sm font-editorial text-text-main">
                ¡Contraseña Actualizada!
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Tu contraseña ha sido cambiada correctamente. Serás redirigido
                al inicio de sesión en unos segundos...
              </p>
            </div>
          )}
        </>
      ) : (
        /* MODO 1: SOLICITAR ENLACE POR EMAIL */
        <>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4">
              <KeyRound size={18} />
            </div>
            <h1 className="text-2xl font-editorial text-text-main">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="text-[11px] text-text-muted tracking-wide font-light leading-relaxed">
              Ingresa el correo electrónico asociado a tu cuenta ALiZ y te
              enviaremos las instrucciones para restablecerla.
            </p>
          </div>

          {!isSubmitted ? (
            <form className="space-y-4" onSubmit={handleRequestSubmit}>
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
              <h3 className="text-sm font-editorial text-text-main">
                Correo enviado
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Si existe una cuenta asociada a{" "}
                <strong className="text-brand-gold">{email}</strong>, recibirás
                un correo con el enlace para restablecer tu contraseña.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-[10px] uppercase font-mono tracking-widest text-brand-gold hover:underline pt-2 inline-block cursor-pointer"
              >
                Intentar con otro correo
              </button>
            </div>
          )}
        </>
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
  );
}

export default function RecoverPasswordPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-brand-bg transition-colors duration-700">
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
            <span className="italic text-brand-gold font-light">Acceso</span>
          </h2>
          <p className="text-[11px] text-text-muted tracking-[0.2em] uppercase font-mono max-w-sm">
            Recupera el control de tu cuenta corporativa de forma rápida y
            segura.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12 relative">
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-8 text-brand-gold">
              <Loader2 size={24} className="animate-spin" />
            </div>
          }
        >
          <RecoverPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
