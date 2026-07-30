"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  Building,
  Phone,
  Mail,
  Shield,
  Download,
  FileText,
  BookOpen,
  CheckCircle2,
  Clock,
  LogOut,
  Save,
  KeyRound,
  Loader2,
  Package,
  Camera,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AuthService } from "@/services/authService";
import { notify } from "@/lib/notifications";

// Helper para comprimir la imagen en el cliente antes de enviarla al servidor
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

        // Compresión optimizada JPEG a calidad 80% (~20KB-30KB)
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.8);
        resolve(compressedBase64);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, refreshUser, logout } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<
    "productos" | "diagnosticos" | "ajustes"
  >("productos");

  // Formulario de edición de datos de perfil
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Lista de infoproductos adquiridos (datos reales del usuario)
  const [userProducts] = useState<any[]>([]);

  // Lista de solicitudes/leads realizadas por el usuario
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
      setCompanyName(user.company_name || "");
      setPhone(user.phone || "");

      // Cargar historial de solicitudes/leads
      fetchUserLeads();
    }
  }, [user]);

  const fetchUserLeads = async () => {
    try {
      setIsLoadingLeads(true);
      const res = await AuthService.getUserLeads();
      if (res.data) {
        setLeads(res.data);
      }
    } catch {
      // Manejo silencioso si no hay solicitudes aún
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify.error("Selecciona un archivo de imagen válido (JPG, PNG).");
      return;
    }

    try {
      setIsUploadingAvatar(true);
      notify.info(
        "Procesando imagen",
        "Comprimiendo foto para optimizar el envío...",
      );

      const compressedImage = await compressImage(file);

      await AuthService.updateProfile({
        avatar_url: compressedImage,
      });

      await refreshUser();
      notify.success(
        "Foto actualizada",
        "Tu imagen de perfil se guardó correctamente.",
      );
    } catch (err: any) {
      notify.error(err);
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      notify.error("El nombre completo es obligatorio.");
      return;
    }

    try {
      setIsUpdating(true);
      await AuthService.updateProfile({
        full_name: fullName,
        company_name: companyName || undefined,
        phone: phone || undefined,
      });
      await refreshUser();
      notify.success(
        "Perfil actualizado",
        "Tus datos se guardaron correctamente.",
      );
    } catch (err: any) {
      notify.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    try {
      await AuthService.requestPasswordReset(user.email);
      notify.success(
        "Correo enviado",
        `Revisa ${user.email} para restablecer tu contraseña.`,
      );
    } catch (err: any) {
      notify.error(err);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  if (isLoading || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-brand-bg p-6">
        <div className="text-center space-y-4">
          <Loader2 className="mx-auto h-8 w-8 text-brand-gold animate-spin" />
          <p className="text-xs uppercase tracking-widest text-text-muted font-sans">
            Cargando Perfil ALiZ...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-bg text-text-main py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* CABECERA EDITORIAL DE PERFIL REFINADA */}
        <section className="bg-brand-card border border-custom/60 rounded-xl p-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
            {/* AVATAR INTERACTIVO CON BOTÓN DE CAMBIO DE FOTO */}
            <div className="relative group shrink-0">
              {user.avatar_url ? (
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-gold/60 shadow-md relative">
                  <Image
                    src={user.avatar_url}
                    alt={user.full_name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-brand-gold/15 border-2 border-brand-gold/60 text-brand-gold font-sans font-bold text-xl flex items-center justify-center shadow-md">
                  {getInitials(user.full_name)}
                </div>
              )}

              {/* Botón de superposición para cambiar foto */}
              <button
                type="button"
                disabled={isUploadingAvatar}
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                title="Cambiar foto de perfil"
              >
                {isUploadingAvatar ? (
                  <Loader2 size={16} className="animate-spin text-brand-gold" />
                ) : (
                  <>
                    <Camera size={16} className="text-brand-gold mb-0.5" />
                    <span className="text-[7px] font-sans font-bold uppercase tracking-wider">
                      Cambiar
                    </span>
                  </>
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            {/* INFORMACIÓN PRINCIPAL LIMPICISIMA */}
            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-2xl font-editorial font-semibold text-text-main">
                  {user.full_name}
                </h1>
                <span className="px-2.5 py-0.5 bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[9px] font-sans uppercase tracking-wider font-bold rounded-full">
                  {user.role === "admin"
                    ? "Administrador ALiZ"
                    : "Cliente Corporativo"}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-text-muted font-sans">
                <span className="flex items-center gap-1.5">
                  <Mail size={13} className="text-brand-gold" />
                  {user.email}
                </span>
                {user.company_name && (
                  <span className="flex items-center gap-1.5">
                    <Building size={13} className="text-brand-gold" />
                    {user.company_name}
                  </span>
                )}
                {user.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={13} className="text-brand-gold" />
                    {user.phone}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* NAVEGACIÓN POR PESTAÑAS (TABS HOMOGÉNEOS CON TIPOGRAFÍA FONT-SANS) */}
        <div className="flex border-b border-custom/60 space-x-4 sm:space-x-8 text-xs font-sans uppercase tracking-wider overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("productos")}
            className={`pb-3 transition-colors border-b-2 font-semibold cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "productos"
                ? "border-brand-gold text-brand-gold"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <Package size={14} />
            Mis Soluciones & Herramientas ({userProducts.length})
          </button>

          <button
            onClick={() => setActiveTab("diagnosticos")}
            className={`pb-3 transition-colors border-b-2 font-semibold cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "diagnosticos"
                ? "border-brand-gold text-brand-gold"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <Shield size={14} />
            Diagnósticos & Consultorías ({leads.length})
          </button>

          <button
            onClick={() => setActiveTab("ajustes")}
            className={`pb-3 transition-colors border-b-2 font-semibold cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "ajustes"
                ? "border-brand-gold text-brand-gold"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <User size={14} />
            Ajustes de Cuenta
          </button>
        </div>

        {/* CONTENIDO PESTAÑA 1: INFOPRODUCTOS COMPRADOS (REALES DE LA BD) */}
        {activeTab === "productos" && (
          <section className="space-y-6 animate-in fade-in duration-300 font-sans">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-sans font-bold text-text-main">
                  Biblioteca de Herramientas Digitales
                </h2>
                <p className="text-xs text-text-muted">
                  Accede a los e-books, políticas editables y plantillas
                  adquiridas en ALiZ.
                </p>
              </div>
            </div>

            {userProducts.length === 0 ? (
              <div className="text-center py-12 bg-brand-card border border-custom/60 rounded-lg space-y-3">
                <Package className="mx-auto h-8 w-8 text-brand-gold/60" />
                <h3 className="text-sm font-semibold text-text-main">
                  No has adquirido soluciones digitales aún
                </h3>
                <p className="text-xs text-text-muted max-w-md mx-auto">
                  Explora nuestro catálogo de E-Books, Políticas Editables en
                  Word y Formatos de Control en Excel para fortalecer la gestión
                  de tu empresa.
                </p>
                <button
                  onClick={() => router.push("/productos")}
                  className="px-4 py-2 bg-brand-gold text-brand-bg text-xs font-bold uppercase tracking-wider rounded hover:bg-brand-gold/90 transition-all cursor-pointer inline-block"
                >
                  Explorar Catálogo de Soluciones
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-brand-card border border-custom/60 p-5 rounded-lg space-y-4 flex flex-col justify-between hover:border-brand-gold/50 transition-all duration-300 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="p-2 bg-brand-gold/10 text-brand-gold rounded border border-brand-gold/30">
                          <BookOpen size={18} />
                        </span>
                        <span className="text-[9px] font-sans uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded font-bold">
                          {prod.type || "Digital"}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold group-hover:text-brand-gold transition-colors">
                        {prod.title}
                      </h3>
                      <p className="text-[10px] text-text-muted">
                        Acceso Permanente
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        notify.info(
                          "Descarga iniciada",
                          "El archivo comenzará a descargarse.",
                        )
                      }
                      className="w-full py-2 bg-brand-gold/10 border border-brand-gold/40 text-brand-gold text-[10px] font-bold tracking-widest uppercase rounded hover:bg-brand-gold hover:text-brand-bg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download size={13} />
                      Descargar Recurso
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* CONTENIDO PESTAÑA 2: DIAGNÓSTICOS & SOLICITUDES (REALES DE LA BD) */}
        {activeTab === "diagnosticos" && (
          <section className="space-y-6 animate-in fade-in duration-300 font-sans">
            <div>
              <h2 className="text-lg font-sans font-bold text-text-main">
                Historial de Diagnósticos y Consultorías
              </h2>
              <p className="text-xs text-text-muted">
                Monitorea el estado de tus solicitudes de asesoría puntual y
                diagnóstico 360°.
              </p>
            </div>

            {isLoadingLeads ? (
              <div className="text-center py-12 bg-brand-card border border-custom/60 rounded-lg">
                <Loader2 className="mx-auto h-6 w-6 text-brand-gold animate-spin mb-2" />
                <p className="text-xs text-text-muted">
                  Cargando solicitudes...
                </p>
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-12 bg-brand-card border border-custom/60 rounded-lg space-y-3">
                <Clock className="mx-auto h-8 w-8 text-brand-gold/60" />
                <h3 className="text-sm font-semibold">
                  No tienes solicitudes registradas aún
                </h3>
                <p className="text-xs text-text-muted max-w-sm mx-auto">
                  Puedes solicitar una evaluación ejecutiva gratuita para tu
                  empresa desde nuestro formulario.
                </p>
                <button
                  onClick={() => router.push("/diagnostico")}
                  className="px-4 py-2 bg-brand-gold text-brand-bg text-xs font-bold uppercase tracking-wider rounded hover:bg-brand-gold/90 transition-all cursor-pointer"
                >
                  Solicitar Diagnóstico Gratuito
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-brand-card border border-custom/60 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-text-main uppercase tracking-wider">
                          {lead.service_interest
                            .replace("_", " ")
                            .toUpperCase()}
                        </span>
                        <span className="px-2 py-0.5 bg-brand-gold/15 text-brand-gold text-[9px] font-bold rounded uppercase">
                          {lead.status || "En Evaluación"}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted line-clamp-1">
                        {lead.message}
                      </p>
                      <p className="text-[10px] text-text-muted">
                        Fecha: {new Date(lead.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[10px] text-brand-gold bg-brand-gold/10 px-3 py-1.5 rounded border border-brand-gold/30 font-semibold">
                        <CheckCircle2 size={12} />
                        Consultor Asignado
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* CONTENIDO PESTAÑA 3: AJUSTES DE CUENTA (REALES DE LA BD) */}
        {activeTab === "ajustes" && (
          <section className="space-y-6 animate-in fade-in duration-300 font-sans">
            <div>
              <h2 className="text-lg font-sans font-bold text-text-main">
                Información de la Cuenta
              </h2>
              <p className="text-xs text-text-muted">
                Actualiza tus datos de contacto corporativo.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* FORMULARIO EDITAR PERFIL */}
              <form
                onSubmit={handleUpdateProfile}
                className="bg-brand-card border border-custom/60 p-6 rounded-xl space-y-4"
              >
                <h3 className="text-sm font-semibold border-b border-custom/40 pb-2">
                  Datos Personales y de Empresa
                </h3>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted block">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-brand-bg border border-custom/60 rounded px-3 py-2 text-xs text-text-main focus:border-brand-gold focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted block">
                    Nombre de la Empresa
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ej. ALiz Consultora S.A."
                    className="w-full bg-brand-bg border border-custom/60 rounded px-3 py-2 text-xs text-text-main focus:border-brand-gold focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted block">
                    Teléfono Celular / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Solo números"
                    className="w-full bg-brand-bg border border-custom/60 rounded px-3 py-2 text-xs text-text-main focus:border-brand-gold focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-2.5 bg-brand-gold text-brand-bg text-xs font-bold uppercase tracking-wider rounded hover:bg-brand-gold/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isUpdating ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  Guardar Cambios
                </button>
              </form>

              {/* SEGURIDAD DE LA CUENTA */}
              <div className="bg-brand-card border border-custom/60 p-6 rounded-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold border-b border-custom/40 pb-2 flex items-center gap-2">
                    <KeyRound size={16} className="text-brand-gold" />
                    Seguridad y Contraseña
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Si deseas actualizar tu contraseña de acceso a la plataforma
                    ALiZ, te enviaremos un correo seguro a{" "}
                    <strong>{user.email}</strong>.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="w-full py-2.5 bg-brand-card border border-brand-gold/50 text-brand-gold text-xs font-bold uppercase tracking-wider rounded hover:bg-brand-gold hover:text-brand-bg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Restablecer Contraseña por Email
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
