import { useUIStore } from "@/stores/uiStore";
import React from "react";

enum LegendBoxType {
  Correct = "Correct",
  PartiallyCorrect = "PartiallyCorrect",
  Wrong = "Wrong",
  Higher = "Higher",
  Lower = "Lower",
}

interface LegendItemProps {
  type: LegendBoxType;
  color: string;
  icon?: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ type, color, icon }) => (
  <div className="flex flex-col items-center">
    <span className="text-white text-sm mb-2">{type}</span>
    <div
      className={`w-20 h-20  flex items-center justify-center`}
      style={{ backgroundColor: color }}
    >
      {icon && <img src={icon} alt={type} />}
    </div>
  </div>
);

interface LegendProps {}

const Legend: React.FC<LegendProps> = () => {
  const { isLegendOpen, setIsLegendOpen } = useUIStore();

  const items: LegendItemProps[] = [
    { type: LegendBoxType.Correct, color: "#0DBF2E" },
    { type: LegendBoxType.PartiallyCorrect, color: "#FFA500" },
    { type: LegendBoxType.Wrong, color: "#D21210" },
    { type: LegendBoxType.Higher, color: "#D21210", icon: "/legend-up.png" },
    { type: LegendBoxType.Lower, color: "#D21210", icon: "/legend-down.png" },
  ];

  return (
    <div className="relative border border-[#2FFF2B] bg-[#111411]  p-8">
      <button
        onClick={() => setIsLegendOpen(!isLegendOpen)}
        className="absolute -top-2 -right-2 text-white hover:text-gray-300 border border-[#2FFF2B] bg-[#111411] rounded-full"
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
