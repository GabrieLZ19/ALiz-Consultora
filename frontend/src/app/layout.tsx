import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ThemeProvider } from "@/lib/themeContext";
import { CartProvider } from "@/lib/cartContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartDrawer } from "@/components/features/CartDrawer";
import { AppToaster } from "@/components/layout/AppToaster";

export const metadata = {
  title: "ALiz | Estrategia Boutique Corporativa",
  description:
    "Reordenamos la arquitectura operativa y financiera de tu empresa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-brand-bg antialiased flex flex-col justify-between relative transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <AppToaster />
            <CartProvider>
              <Navbar />
              <div className="grow">{children}</div>
              <Footer />
              <CartDrawer />
              <WhatsAppButton />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
