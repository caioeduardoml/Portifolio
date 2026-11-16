import React from 'react';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

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
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-xl border-2 border-[#39FF14]/30 light:border-emerald-600/30 animate-ping" />
        <div className="relative w-12 h-12 rounded-xl border-2 border-[#39FF14] light:border-emerald-600 flex items-center justify-center bg-white/5">
          <div className="w-3 h-3 rounded-xs bg-[#39FF14] light:bg-emerald-600 animate-pulse" />
        </div>
      </div>
      <span className="text-xs font-mono-code tracking-widest uppercase text-slate-400 light:text-slate-600">
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
