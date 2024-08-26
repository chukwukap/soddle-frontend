import React from "react";

interface TrapezoidProps {
  className?: string;
  children?: React.ReactNode;
}

const Trapezoid: React.FC<TrapezoidProps> = ({ className = "", children }) => {
  return (
    <div
      className={`relative ${className}`}
      // style={{ aspectRatio: "504 / 254" }}
    >
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 504 254"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path
          stroke="#2A342A"
          strokeWidth="1"
          fill="#111411"
          d="M-1696.1-865.14h-426.73v-176.73l73.27-73.27h426.73v176.73Z"
          transform="translate(2124.83 1117.14)"
        />
      </svg> */}
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 898.49 254"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          className="fill-black stroke-[#2A342A] stroke-[1px]"
          d="M-1301.61-865.14h-821.22v-176.73l73.27-73.27h821.22v176.73Z"
          transform="translate(2124.83 1117.14)"
        />
      </svg> */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full absolute inset-0"
        fill="#111411"
        stroke="#2A342A"
        strokeWidth="4"
        preserveAspectRatio="none"
        viewBox="0 0 898.49 254"
      >
        <path
          d="M-1279.59-865.14h-843.24v-198.75l51.24-51.25h843.25v198.75Z"
          transform="translate(2124.83 1117.14)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center py-2 px-4">
        <div className="w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Trapezoid;
