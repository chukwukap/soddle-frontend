import React, { ReactNode } from "react";

interface TweetQuestionBoxWrapperProps {
  children: ReactNode;
  className?: string;
}

const TweetQuestionBoxWrapper: React.FC<TweetQuestionBoxWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`relative w-full h-full min-h-[200px] ${className}`}>
      <div className="absolute inset-0 flex flex-col">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 437 219"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 219V19.4535L18.5889 0H437V199.087L417.917 219H0Z"
            fill="#111411"
            stroke="#2A342A"
            strokeWidth="1"
          />
        </svg>
        <div className="relative flex-grow p-4 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default TweetQuestionBoxWrapper;
