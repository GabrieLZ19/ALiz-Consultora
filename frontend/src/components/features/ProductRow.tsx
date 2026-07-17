import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/mockData";

export const ProductRow = ({
  id,
  slug,
  title,
  description,
  platform,
  price,
  rawPrice,
}: Product) => {
  return (
    <Link
      href={`/productos/${slug}`}
      className="border-t border-white/5 py-6 flex-col md:flex-row justify-between items-start gap-4 hover:bg-white/2 transition-all duration-300 group px-4 block translate-y-0 hover:-translate-y-0.5"
    >
      <div className="flex gap-6 items-start max-w-2xl">
        <span className="font-mono text-[10px] text-brand-gold tracking-widest pt-1 group-hover:scale-110 transition-transform">
          {id}
        </span>
        <div className="space-y-1">
          <span className="text-[9px] uppercase tracking-[0.15em] text-brand-gold-muted font-mono">
            {platform}
          </span>
          <h3 className="text-xl font-editorial text-white group-hover:text-brand-gold transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full md:w-auto md:gap-12 pt-4 md:pt-0 border-t border-dashed border-white/5 md:border-none">
        <div className="text-right">
          <span className="text-xl font-mono text-white block font-medium tracking-tight">
            {price}
          </span>
          <span className="text-[10px] text-gray-500 font-mono line-through block opacity-60">
            {rawPrice}
          </span>
        </div>
        <div className="p-3 border border-white/10 text-gray-400 rounded-full group-hover:border-brand-gold group-hover:text-brand-gold group-hover:bg-brand-gold/5 transition-all duration-300">
          <ArrowRight
            size={14}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
};
