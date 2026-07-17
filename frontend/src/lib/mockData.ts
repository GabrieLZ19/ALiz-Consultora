export interface Product {
  id: string;
  slug: string;
  platform: string;
  title: string;
  description: string;
  price: string;
  rawPrice: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "01",
    slug: "escalabilidad-estructural",
    platform: "Libro Editorial de Colección",
    title: "E-book: Escalabilidad Estructural",
    description:
      "La guía definitiva paso a paso para delegar operaciones corporativas críticas de forma eficiente, ordenada y sin fricciones.",
    price: "$49 USD",
    rawPrice: "$950",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "02",
    slug: "plantilla-financiera",
    platform: "Google Sheets · Excel Pro",
    title: "Plantilla Financiera Avanzada",
    description:
      "Modelo financiero programado con proyecciones dinámicas a 360 meses, flujos de caja operativos y análisis de punto de equilibrio.",
    price: "$79 USD",
    rawPrice: "$1,450",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "03",
    slug: "masterclass-ventas",
    platform: "8 Módulos de Alta Dirección",
    title: "Masterclass de Ventas B2B",
    description:
      "Sistemas tácticos de prospección y cierre de contratos de alto valor sin sacrificar margen comercial frente a competidores.",
    price: "$129 USD",
    rawPrice: "$2,350",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "01",
    quote:
      "El diagnóstico de ALiz reordenó por completo nuestra estructura. En seis meses duplicamos el margen de rentabilidad sacándome de la operación diaria.",
    author: "Mauricio Delgado",
    role: "Director General",
    company: "Delgado & Co.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    id: "02",
    quote:
      "Implementar sus manuales de procesos editoriales nos dio un norte comercial predecible. El equipo directivo ahora opera de forma autónoma.",
    author: "María López",
    role: "Fundadora",
    company: "Kroma Studio",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
  },
];
