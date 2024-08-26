import React from "react";

const Spinner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );
};

export default Spinner;
