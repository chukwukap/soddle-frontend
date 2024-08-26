import React, { ReactNode } from 'react';

interface BeveledRectangleProps {
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
  borderColor?: string;
  isInteractive?: boolean;
}

const BeveledRectangle: React.FC<BeveledRectangleProps> = ({
  children,
  className = '',
  backgroundColor = '#111411',
  borderColor = '#03B500',
  isInteractive = false,
}) => {
  const borderRGB = hexToRGB(borderColor);

  const interactiveClasses = isInteractive
    ? 'transition-all duration-300 ease-in-out hover:drop-shadow-[0_0_10px_rgba(47,255,43,1)] hover:shadow-[0_0_20px_rgba(47,255,43,0.5)]'
    : '';

  return (
    <div
      className={`relative ${interactiveClasses} ${className}`}
      style={
        {
          '--border-color': borderRGB,
          '--background-color': backgroundColor,
        } as React.CSSProperties
      }
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 436 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <mask id="beveled-rectangle-mask" fill="white">
          <path d="M436 0H0V70H417.913L436 51.0909V0Z" />
        </mask>
        <path
          d="M436 0H0V70H417.913L436 51.0909V0Z"
          fill="var(--background-color)"
        />
        <path
          d="M0 0V-1H-1V0H0ZM436 0H437V-1H436V0ZM0 70H-1V71H0V70ZM417.913 70L417.205 70.7071L417.502 71H417.913V70ZM436 51.0909L436.708 51.798L437 51.4976V51.0909H436ZM0 1H436V-1H0V1ZM1 70V0H-1V70H1ZM417.913 71H0V69H417.913V71ZM436.708 51.798L418.621 70.7071L417.205 69.2929L435.292 50.3838L436.708 51.798ZM437 0V51.0909H435V0H437Z"
          fill="var(--border-color)"
          fillOpacity="0.5"
          mask="url(#beveled-rectangle-mask)"
        />
      </svg>
      <div className="relative z-10 p-4">{children}</div>
    </div>
  );
};

function hexToRGB(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

export default BeveledRectangle;
