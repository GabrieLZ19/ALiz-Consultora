import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-6 py-3 font-sans text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 text-center";

  const variants = {
    primary: "bg-accent-gold text-primary-dark hover:bg-white",
    secondary:
      "bg-secondary-dark text-white hover:bg-white/10 border border-white/10",
    outline:
      "border border-accent-gold/40 text-accent-gold hover:bg-accent-gold hover:text-primary-dark",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
