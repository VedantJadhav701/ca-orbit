import React from "react";

interface ProgressBarProps {
  label: string;
  value: number; // 0 to 100
  color?: "primary" | "secondary";
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  label, 
  value, 
  color = "primary" 
}) => {
  const barColor = color === "primary" ? "bg-primary" : "bg-secondary";
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between font-heading text-xl">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-8 bg-gray-900 border-4 border-gray-700 shadow-[4px_4px_0px_rgba(255,255,255,0.1)] overflow-hidden">
        <div 
          className={`h-full ${barColor} border-r-4 border-black transition-all duration-500`} 
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};
