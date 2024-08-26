import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div className={`relative w-full h-[50px] ${className}`}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 437 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <g filter="url(#filter0_b_32_115)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.9375 0L0 14.0588V68H422.062L437 53.9412V0H14.9375Z"
              fill="white"
              fillOpacity="0"
            />
            <path
              d="M0 14.0588L-0.685365 13.3306L-1 13.6268V14.0588H0ZM14.9375 0V-1H14.5409L14.2521 -0.7282L14.9375 0ZM0 68H-1V69H0V68ZM422.062 68V69H422.459L422.748 68.7282L422.062 68ZM437 53.9412L437.685 54.6694L438 54.3732V53.9412H437ZM437 0H438V-1H437V0ZM0.685365 14.787L15.6229 0.7282L14.2521 -0.7282L-0.685365 13.3306L0.685365 14.787ZM1 68V14.0588H-1V68H1ZM422.062 67H0V69H422.062V67ZM436.315 53.213L421.377 67.2718L422.748 68.7282L437.685 54.6694L436.315 53.213ZM436 0V53.9412H438V0H436ZM14.9375 1H437V-1H14.9375V1Z"
              fill="#2FFF2B"
              fillOpacity=""
            />
          </g>
          <defs>
            <filter
              id="filter0_b_32_115"
              x="-30"
              y="-30"
              width="497"
              height="128"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="15" />
              <feComposite
                in2="SourceAlpha"
                operator="in"
                result="effect1_backgroundBlur_32_115"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_backgroundBlur_32_115"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <input
          ref={ref}
          className="absolute inset-0 w-full h-full bg-transparent text-gray-400 text-sm px-4 outline-none"
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
