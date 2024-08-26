import React, { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  backgroundColor?: string;
  borderColor?: string;
}

const Button2 = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      children,
      backgroundColor = "#181716",
      borderColor = "#2FFF2B",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`
        relative w-full min-w-[100px] max-w-[300px] h-10
        group transition-transform duration-200 ease-in-out
        hover:scale-105 focus:outline-none ${className}
      `}
        {...props}
      >
        <svg
          className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out group-hover:filter group-hover:drop-shadow-[0_0_7px_rgba(47,255,43,0.5)]"
          viewBox="0 0 134 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <mask id="path-1-inside-1_53_56" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.64 0L0 10.7647V39H120.04L134 28.7353V0H14.64Z"
            />
          </mask>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.64 0L0 10.7647V39H120.04L134 28.7353V0H14.64Z"
            fill={backgroundColor}
          />
          <path
            d="M0 10.7647L-0.59239 9.95905L-1 10.2588V10.7647H0ZM14.64 0V-1H14.3119L14.0476 -0.805651L14.64 0ZM0 39H-1V40H0V39ZM120.04 39V40H120.368L120.632 39.8057L120.04 39ZM134 28.7353L134.592 29.5409L135 29.2412V28.7353H134ZM134 0H135V-1H134V0ZM0.59239 11.5704L15.2324 0.805651L14.0476 -0.805651L-0.59239 9.95905L0.59239 11.5704ZM1 39V10.7647H-1V39H1ZM120.04 38H0V40H120.04V38ZM133.408 27.9296L119.448 38.1943L120.632 39.8057L134.592 29.5409L133.408 27.9296ZM133 0V28.7353H135V0H133ZM14.64 1H134V-1H14.64V1Z"
            fill={borderColor}
            fillOpacity="0.5"
            mask="url(#path-1-inside-1_53_56)"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-white text-opacity-80 text-sm font-medium px-2 truncate">
          {children}
        </span>
      </button>
    );
  }
);

Button2.displayName = "Button2";

export const Button3 = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      children,
      backgroundColor = "#181716",
      borderColor = "#2FFF2B",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`
        relative w-full min-w-[100px] max-w-[300px] h-10
        group transition-transform duration-200 ease-in-out
        hover:scale-105 focus:outline-none ${className}
      `}
        {...props}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 134 39"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M0 0L0 10.7647V39H120.04L134 28.7353V0H14.64Z"
            fill={backgroundColor}
            stroke={borderColor}
            strokeOpacity="0.5"
            strokeWidth="1"
          >
            <animate
              attributeName="filter"
              values="none;url(#glow);none"
              dur="0.5s"
              begin="mouseover"
              fill="freeze"
            />
            <animate
              attributeName="filter"
              values="url(#glow);none"
              dur="0.5s"
              begin="mouseout"
              fill="freeze"
            />
          </path>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-white text-opacity-80 text-sm font-medium px-2 truncate">
          {children}
        </span>
      </button>
    );
  }
);

Button3.displayName = "Button3";

export default Button2;
