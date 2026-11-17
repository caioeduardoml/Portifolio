import React from 'react';

interface OrnamentProps {
  className?: string;
}

export const FourPointStar: React.FC<OrnamentProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z"
      fill="currentColor"
    />
  </svg>
);

export const HandcraftedSparkle: React.FC<OrnamentProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M12 3C12.35 7.45 14.55 11.65 19 12C14.55 12.35 12.35 16.55 12 21C11.65 16.55 9.45 12.35 5 12C9.45 11.65 11.65 7.45 12 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HandcraftedDivider: React.FC<OrnamentProps> = ({ className = '' }) => (
  <div
    aria-hidden="true"
    className={`flex items-center justify-center gap-3 w-36 mx-auto mt-4 ${className}`}
  >
    <span className="h-[1px] flex-1 bg-[#D8D5D1] dark:bg-[#333333]" />
    <span className="w-1.5 h-1.5 rotate-45 border border-[#171717] dark:border-[#FDFCFB]" />
    <FourPointStar className="w-3.5 h-3.5 text-[#111111] dark:text-[#FDFCFB]" />
    <span className="w-1.5 h-1.5 rotate-45 border border-[#171717] dark:border-[#FDFCFB]" />
    <span className="h-[1px] flex-1 bg-[#D8D5D1] dark:bg-[#333333]" />
  </div>
);

export const HandcraftedCorner: React.FC<OrnamentProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M3 14V5.5C3 4.12 4.12 3 5.5 3H14"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="3" cy="16.5" r="1" fill="currentColor" />
  </svg>
);
