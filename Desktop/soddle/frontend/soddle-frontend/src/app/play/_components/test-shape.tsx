import React from "react";

const TrapezoidShape = ({
  className = "",
  fill = "#000000",
  stroke = "#2A342A",
  strokeWidth = 1,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 400 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0h360l40 100-40 100H0l40-100L0 0z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default TrapezoidShape;
