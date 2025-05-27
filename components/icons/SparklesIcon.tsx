
import React from 'react';

interface SparklesIconProps {
  className?: string;
}

const SparklesIcon: React.FC<SparklesIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      fillRule="evenodd"
      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-3.678 1.897-6.96 4.804-8.808a.75.75 0 01.819.162z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M11.03 2.59a1.5 1.5 0 011.94 0l.75.75a1.5 1.5 0 010 1.94l-.75.75a1.5 1.5 0 01-1.94 0l-.75-.75a1.5 1.5 0 010-1.94l.75-.75zM14.47 10.53a1.5 1.5 0 011.94 0l.75.75a1.5 1.5 0 010 1.94l-.75.75a1.5 1.5 0 01-1.94 0l-.75-.75a1.5 1.5 0 010-1.94l.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);

export default SparklesIcon;
