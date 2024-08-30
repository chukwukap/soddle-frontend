import React, { InputHTMLAttributes, forwardRef } from "react";

interface TrapezoidInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const TrapezoidInput = forwardRef<HTMLInputElement, TrapezoidInputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        className={`relative ${className}`}
        style={{ aspectRatio: "504 / 64" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 898.49 254"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <path
            d="M-1279.59-865.14h-843.24v-198.75l51.24-51.25h843.25v198.75Z"
            transform="translate(2124.83 1117.14)"
            fill="#111411"
            stroke="#2FFF2B"
            strokeWidth="2"
          />
        </svg>
        <input
          ref={ref}
          type="text"
          className="absolute inset-0 w-full h-full bg-transparent text-gray-300 placeholder-gray-500 px-6 focus:outline-none"
          placeholder="Enter a personality..."
          {...props}
        />
      </div>
    );
  }
);

TrapezoidInput.displayName = "TrapezoidInput";

export default TrapezoidInput;
