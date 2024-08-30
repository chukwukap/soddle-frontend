import React, { ButtonHTMLAttributes } from "react";

interface ChoppedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const ChoppedButton: React.FC<ChoppedButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        bg-white 
        rounded-full 
        px-4 
        py-2 
        transition-all 
        duration-300 
        ease-in-out 
        hover:drop-shadow-[0_0_10px_rgba(47,255,43,1)] 
        hover:shadow-[0_0_20px_rgba(47,255,43,0.5)]
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
