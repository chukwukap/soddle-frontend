import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface UtilityButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const UtilityButton: React.FC<UtilityButtonProps> = ({
  children,
  className = '',
  onClick,
  ...props
}) => {
  const clipPath = 'polygon(12% 0, 100% 0, 100% 77%, 86% 100%, 0 100%, 0 25%)';

  return (
    <div className={`button-shadow-wrapper ${className}`}>
      <button
        className={`
          relative
          inline-block
          px-6 py-3
          bg-[#2D2D2D]
          text-white text-opacity-80 
          font-sans text-sm sm:text-base md:text-lg
          focus:outline-none
          transition-all duration-300 ease-in-out
          hover:brightness-110 active:brightness-90
          w-full
        `}
        style={{ clipPath }}
        {...props}
      >
        {/* Background layer */}
        <div
          className="absolute inset-0 bg-[#002D00] bg-opacity-50 -z-10"
          style={{ clipPath }}
        />

        {/* Content */}
        <span className="relative z-10">{children}</span>
      </button>
    </div>
  );
};

export default UtilityButton;
