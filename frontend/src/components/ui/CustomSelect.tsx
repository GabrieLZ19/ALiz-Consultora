"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  label,
  error,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative w-full space-y-1.5 ${className}`}
      ref={containerRef}
    >
      {label && (
        <label className="text-[10px] uppercase font-mono tracking-widest text-text-muted block">
          {label}
        </label>
      )}

      {/* BOTÓN TRIGGER */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-brand-card border border-custom/60 rounded px-4 py-3 text-xs text-left flex items-center justify-between transition-colors focus:border-brand-gold outline-none cursor-pointer ${
          selectedOption ? "text-text-main" : "text-text-muted/60"
        }`}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`text-brand-gold transition-transform duration-300 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* MENÚ DESPLEGABLE PERSONALIZADO */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-brand-card border border-custom/60 rounded shadow-2xl z-50 max-h-56 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
          <div className="p-1 space-y-0.5">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-xs rounded transition-colors flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-brand-gold/15 text-brand-gold font-medium"
                      : "text-text-muted hover:bg-brand-gold/10 hover:text-text-main"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <Check
                      size={12}
                      className="text-brand-gold shrink-0 ml-2"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && (
        <span className="text-[10px] text-red-400 font-mono block">
          {error}
        </span>
      )}
    </div>
  );
};
