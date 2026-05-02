import React from "react";

interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "white";
  className?: string;
}

export const BrutalistButton: React.FC<BrutalistButtonProps> = ({ 
  children, 
  variant = "primary", 
  className = "", 
  ...props 
}) => {
  const baseStyles = "font-heading text-2xl border-brutalist shadow-brutalist transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_#000] hover:-translate-x-[2px] hover:-translate-y-[2px]";
  
  const variants = {
    primary: "bg-primary text-black",
    secondary: "bg-secondary text-white hover:bg-red-600",
    white: "bg-white text-black",
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
