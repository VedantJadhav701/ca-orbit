import React from "react";

interface BrutalistInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const BrutalistInput: React.FC<BrutalistInputProps> = ({ 
  label, 
  className = "", 
  ...props 
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && <label className="font-heading text-2xl text-black">{label}</label>}
      <input 
        className={`bg-white border-brutalist shadow-brutalist px-4 py-3 text-xl font-body focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[4px_4px_0px_#000] transition-all ${className}`}
        {...props}
      />
    </div>
  );
};
