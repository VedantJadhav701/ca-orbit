import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: "primary" | "secondary" | "white";
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  variant = "white",
  className = ""
}) => {
  const variants = {
    primary: "bg-primary text-black",
    secondary: "bg-secondary text-white",
    white: "bg-white text-black",
  };

  return (
    <div className={`neo-card ${variants[variant]} ${className}`}>
      <h3 className="text-2xl font-heading underline mb-2">{title}</h3>
      <div className="text-6xl font-heading mb-2">{value}</div>
      {subtitle && <p className="text-xl font-body opacity-80">{subtitle}</p>}
    </div>
  );
};
