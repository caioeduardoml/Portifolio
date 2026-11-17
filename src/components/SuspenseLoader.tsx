import React from 'react';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { FourPointStar } from '~components/HandcraftedOrnaments';

interface SuspenseLoaderProps {
  children: ReactNode;
  minHeightClass?: string;
  label?: string;
}

const SectionSkeleton: React.FC<{ minHeightClass: string; label: string }> = ({
  minHeightClass,
  label,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`w-full ${minHeightClass} flex flex-col items-center justify-center px-6 py-20 bg-[var(--bg-primary)]`}
    >
      <div className="relative w-12 h-12 mb-4 rounded-xl border-[1.5px] border-[#171717] dark:border-[#FDFCFB] flex items-center justify-center bg-[#FFFFFF] dark:bg-[#1A1A1A]">
        <FourPointStar className="w-5 h-5 text-[#111111] dark:text-[#FDFCFB] animate-pulse" />
      </div>
      <span className="text-xs font-mono-code tracking-widest uppercase text-[#555555] dark:text-[#D8D5D1]">
        {label}
      </span>
    </div>
  );
};

export const SuspenseLoader: React.FC<SuspenseLoaderProps> = ({
  children,
  minHeightClass = 'min-h-[420px]',
  label = 'Carregando módulo 3D...',
}) => {
  return (
    <Suspense fallback={<SectionSkeleton minHeightClass={minHeightClass} label={label} />}>
      {children}
    </Suspense>
  );
};

export default SuspenseLoader;
