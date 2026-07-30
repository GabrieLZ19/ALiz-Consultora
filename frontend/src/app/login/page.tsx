"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Shield, Loader2, ArrowLeft, Eye, EyeOff, Camera, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { notify } from "@/lib/notifications";

// Helper para comprimir foto de registro en cliente
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.8);
        resolve(compressedBase64);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

export default function LoginPage() {
  const router = useRouter();
  const { login, register, loginWithOAuth } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isCompressingAvatar, setIsCompressingAvatar] = useState<boolean>(false);

  // Form State
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const handleGoogleLogin = async () => {
    try {
      setOauthLoading("google");
      await loginWithOAuth("google");
    } catch (err: any) {
      notify.error(err.message || "Error al iniciar sesión con Google");
      setOauthLoading(null);
    }
  };

  const handleAvatarFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify.error("Selecciona un archivo de imagen válido.");
      return;
    }

    try {
      setIsCompressingAvatar(true);
      notify.info("Procesando imagen", "Comprimiendo foto...");
      const compressed = await compressImage(file);
      setAvatarUrl(compressed);
      notify.success("Foto seleccionada", "Tu foto de perfil está lista.");
    } catch (err: any) {
      notify.error(err);
    } finally {
      setIsCompressingAvatar(false);
    }
  };

  const validateInputs = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      notify.error("Por favor ingresa un correo electrónico válido.");
      return false;
    }

    if (!password || password.length < 6) {
      notify.error("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    if (isRegisterMode && !fullName.trim()) {
      notify.error("Por favor ingresa tu nombre completo.");
      return false;
    }

    if (isRegisterMode && phone && phone.length < 7) {
      notify.error("El número de teléfono debe tener al menos 7 dígitos.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setIsSubmitting(true);

    try {
      if (isRegisterMode) {
        await register({
          email,
          password,
          full_name: fullName,
          company_name: companyName || undefined,
          phone: phone || undefined,
          avatar_url: avatarUrl || undefined,
        });
        notify.success("Cuenta creada exitosamente. ¡Bienvenido a ALiZ!");
      } else {
        await login({ email, password });
        notify.success("Inicio de sesión exitoso.");
      }
      router.push("/");
    } catch (err: any) {
      notify.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-brand-bg transition-colors duration-700 font-sans">
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
          href="/"
          className="relative z-10 flex items-center gap-2 text-text-main/60 hover:text-text-main transition-colors text-[10px] uppercase tracking-[0.2em] font-sans font-semibold"
        >
          <ArrowLeft size={12} /> Volver a Portada
        </Link>

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 border border-brand-gold/30 rounded-full text-brand-gold text-[10px] font-sans font-bold uppercase tracking-widest">
            <Shield size={12} /> ALiZ Consultora
          </div>
          <h2 className="text-4xl font-editorial font-light text-text-main leading-tight">
            Gestión Inteligente y <br />
            <span className="italic text-brand-gold font-normal">
              Estrategia Empresarial
            </span>
          </h2>
          <p className="text-xs text-text-muted max-w-md leading-relaxed">
            Plataforma ejecutiva para el control de recursos humanos,
            diagnósticos organizacionales y soluciones de consultoría remota.
          </p>
        </div>

        <div className="relative z-10 text-[10px] text-text-muted font-sans uppercase tracking-widest">
          © {new Date().getFullYear()} ALiZ Consultora. Todos los derechos reservados.
        </div>
      </div>

      {/* COLUMNA DERECHA: FORMULARIO DE ACCESO Y REGISTRO */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-8">
          {/* VOLVER A INICIO EN MÓVIL */}
          <div className="flex items-center justify-start lg:hidden">
            <Link
              href="/"
              className="text-xs text-text-muted hover:text-text-main flex items-center gap-1.5 font-sans"
            >
              <ArrowLeft size={14} /> Volver a Portada
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-editorial font-light text-text-main">
              {isRegisterMode ? "Crear Cuenta ALiZ" : "Acceso Ejecutivos ALiZ"}
            </h1>
            <p className="text-xs text-text-muted">
              {isRegisterMode
                ? "Regístrate para acceder al catálogo y panel de consultoría."
                : "Ingresa tus credenciales corporativas para continuar."}
            </p>
          </div>

          {/* PROVEEDOR GOOGLE OAUTH */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={!!oauthLoading || isSubmitting}
              className="w-full py-2.5 px-4 bg-brand-card border border-custom/60 hover:border-brand-gold/50 rounded-lg text-text-main text-xs font-sans uppercase tracking-widest font-semibold flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer hover:bg-brand-gold/5"
            >
              {oauthLoading === "google" ? (
                <Loader2 size={16} className="animate-spin text-brand-gold" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.3 14.7c-.2-.7-.4-1.4-.4-2.2s.2-1.5.4-2.2L1.6 7.4C.6 9.4 0 11.6 0 14s.6 4.6 1.6 6.6l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z"
                  />
                </svg>
              )}
              Continuar con Google
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-custom/60 w-full" />
            <span className="bg-brand-bg px-3 text-[10px] text-text-muted font-sans uppercase tracking-widest shrink-0">
              O con tu correo corporativo
            </span>
            <div className="border-t border-custom/60 w-full" />
          </div>

          {/* FORMULARIO LOCAL */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EN MODO REGISTRO: OPICIÓN DE FOTO DE PERFIL OPCIONAL */}
            {isRegisterMode && (
              <div className="flex flex-col items-center justify-center py-2 space-y-2">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-16 h-16 rounded-full border-2 border-dashed border-brand-gold/50 hover:border-brand-gold flex items-center justify-center cursor-pointer overflow-hidden group bg-brand-card transition-all"
                >
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt="Vista previa foto"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-brand-gold/70 group-hover:text-brand-gold">
                      {isCompressingAvatar ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          <Camera size={16} />
                          <span className="text-[7px] uppercase tracking-wider font-bold mt-0.5">
                            Foto
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-text-muted font-sans">
                  Foto de Perfil (Opcional)
                </span>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarFileSelect}
                  className="hidden"
                />
              </div>
            )}

            {isRegisterMode && (
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Nombre Completo *"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-brand-card border border-custom/60 rounded-lg px-4 py-3 text-xs text-text-main focus:border-brand-gold focus:outline-none transition-colors"
                />
              </div>
            )}

            {isRegisterMode && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Empresa (Opcional)"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-brand-card border border-custom/60 rounded-lg px-4 py-3 text-xs text-text-main focus:border-brand-gold focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Teléfono (Solo números)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-brand-card border border-custom/60 rounded-lg px-4 py-3 text-xs text-text-main focus:border-brand-gold focus:outline-none transition-colors"
                />
              </div>
            )}

            <div className="space-y-1">
              <input
                type="email"
                placeholder="Correo Electrónico Corporativo *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-card border border-custom/60 rounded-lg px-4 py-3 text-xs text-text-main focus:border-brand-gold focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-card border border-custom/60 rounded-lg px-4 py-3 text-xs text-text-main focus:border-brand-gold focus:outline-none transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-text-muted hover:text-brand-gold transition-colors cursor-pointer"
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {!isRegisterMode && (
              <div className="text-right">
                <Link
                  href="/recuperar-contrasena"
                  className="text-[11px] text-brand-gold/80 hover:text-brand-gold font-sans underline transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-brand-gold text-brand-bg text-xs font-sans font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-brand-gold/90 transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : isRegisterMode ? (
                "Crear Cuenta"
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          {/* TOGGLE MODO LOGIN / REGISTRO */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setEmail("");
                setPassword("");
              }}
              className="text-xs text-text-muted hover:text-text-main font-sans transition-colors cursor-pointer"
            >
              {isRegisterMode
                ? "¿Ya tienes una cuenta ALiZ? Inicia Sesión"
                : "¿No tienes una cuenta? Regístrate aquí"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
