"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { notify } from "@/lib/notifications";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const hash = window.location.hash;
        const searchParams = new URLSearchParams(window.location.search);
        
        let token = searchParams.get("access_token");

        if (!token && hash) {
          const hashParams = new URLSearchParams(hash.substring(1));
          token = hashParams.get("access_token");
        }

        if (!token) {
          setErrorMsg("No se encontró el token de autenticación.");
          setTimeout(() => router.push("/login"), 2000);
          return;
        }

        // Delegar la sincronización a la capa de servicio
        const response = await AuthService.syncOAuthSession(token);

        if (response.status === "success") {
          await refreshUser();
          notify.success("¡Bienvenido a ALiz!", "Sesión iniciada exitosamente.");
          router.push("/");
        } else {
          setErrorMsg("No se pudo sincronizar la sesión.");
          setTimeout(() => router.push("/login"), 2000);
        }
      } catch (err: any) {
        setErrorMsg(err.message || "Error al completar la autenticación.");
        setTimeout(() => router.push("/login"), 2000);
      }
    };

    handleCallback();
  }, [router, refreshUser]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-bg p-6">
      <div className="text-center space-y-4 max-w-md bg-brand-card p-8 rounded-lg border border-custom/60">
        {!errorMsg ? (
          <>
            <Loader2 className="mx-auto h-8 w-8 text-brand-gold animate-spin" />
            <h2 className="text-xl font-editorial text-text-main">
              Completando inicio de sesión...
            </h2>
            <p className="text-xs text-text-muted font-mono tracking-wider uppercase">
              Verificando credenciales con la infraestructura ALiz
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-red-400 font-sans">{errorMsg}</p>
            <p className="text-xs text-text-muted font-mono uppercase">
              Redirigiendo a inicio de sesión...
            </p>
          </>
        )}
      </div>
    </main>
  );
}
