import React, { useState } from "react";

interface LegendItemProps {
  label: string;
  color: string;
  icon?: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ label, color, icon }) => (
  <div className="flex flex-col items-center">
    <span className="text-white text-sm mb-2">{label}</span>
    <div className={`w-20 h-20 ${color} flex items-center justify-center`}>
      {icon && <span className="text-red-900 text-2xl">{icon}</span>}
    </div>
  </div>
);

interface LegendProps {
  onClose: () => void;
}

const Legend: React.FC<LegendProps> = ({ onClose }) => {
  const items: LegendItemProps[] = [
    { label: "Correct", color: "bg-green-500" },
    { label: "Partially correct", color: "bg-yellow-500" },
    { label: "Wrong", color: "bg-red-500" },
    { label: "Higher", color: "bg-red-500", icon: "▲" },
    { label: "Lower", color: "bg-red-500", icon: "▼" },
  ];

  return (
    <div className="">
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 text-white hover:text-gray-300 border border-[#2FFF2B] rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="flex justify-between">
        {items.map((item, index) => (
          <LegendItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Legend;
