import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

interface ProductCardProps {
  title: string;
  price: string;
  description: string;
  type?: string;
  onBuy?: () => void;
}

export const ProductCard = ({
  title,
  price,
  description,
  type = "E-book",
  onBuy,
}: ProductCardProps) => {
  return (
    <div className="bg-secondary-dark border border-white/5 rounded-sm p-6 flex flex-col justify-between hover:border-accent-gold/30 transition-all duration-300 group shadow-lg">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 bg-primary-dark border border-white/10 rounded-sm flex items-center justify-center group-hover:border-accent-gold/20 transition-colors">
            <BookOpen size={18} className="text-accent-gold" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-accent-gold/80 bg-accent-gold/10 px-2 py-1 rounded-xs font-medium">
            {type}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-serif text-white group-hover:text-accent-gold transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-mono">
            Inversión
          </span>
          <span className="text-xl font-mono text-white font-bold">
            {price}
          </span>
        </div>
        <Button variant="primary" className="p-3 rounded-sm" onClick={onBuy}>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};
