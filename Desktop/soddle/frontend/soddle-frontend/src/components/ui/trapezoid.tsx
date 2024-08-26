import React, { ReactNode } from 'react';

interface TrapezoidProps {
  children: ReactNode;
  className?: string;
}

const Trapezoid: React.FC<TrapezoidProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 381 587"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <mask id="challenge-wrapper-mask" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 587V16.6919L19 0H381V569L362 587H0Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 587V16.6919L19 0H381V569L362 587H0Z"
          fill="#111411"
        />
        <path
          d="M0 16.6919L-0.660002 15.9407L-1 16.2394V16.6919H0ZM0 587H-1V588H0V587ZM19 0V-1H18.6231L18.34 -0.751263L19 0ZM381 0H382V-1H381V0ZM381 569L381.688 569.726L382 569.43V569H381ZM362 587V588H362.398L362.688 587.726L362 587ZM-1 16.6919V587H1V16.6919H-1ZM18.34 -0.751263L-0.660002 15.9407L0.660002 17.4432L19.66 0.751263L18.34 -0.751263ZM381 -1H19V1H381V-1ZM382 569V0H380V569H382ZM362.688 587.726L381.688 569.726L380.312 568.274L361.312 586.274L362.688 587.726ZM0 588H362V586H0V588Z"
          fill="#2A342A"
          mask="url(#challenge-wrapper-mask)"
        />
      </svg>
      <div className="relative z-10 p-4">{children}</div>
    </div>
  );
};

export default Trapezoid;
