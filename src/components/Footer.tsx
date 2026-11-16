import React, { useCallback } from 'react';
import { FaArrowUp, FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const scrollToTop = useCallback((): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className="bg-[#05070b] light:bg-slate-900 text-slate-400 border-t border-white/8 px-4 sm:px-6 lg:px-10 py-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
          <span className="font-display font-bold text-white text-base tracking-tight">
            CAIO EDUARDO<span className="text-[#39FF14]">.DEV</span>
          </span>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Portfólio Caio Eduardo. Desenvolvido com React,
            TypeScript, Tailwind CSS e Three.js.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/caioeduardoml"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#39FF14] border border-white/10 transition-colors cursor-pointer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/caio-eduardo-a67b681a7/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#39FF14] border border-white/10 transition-colors cursor-pointer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://instagram.com/caioeduardoml"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#39FF14] border border-white/10 transition-colors cursor-pointer"
          >
            <FaInstagram />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Voltar ao topo da página"
            title="Voltar ao topo"
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-[#39FF14]/15 hover:bg-[#39FF14]/25 text-[#39FF14] border border-[#39FF14]/35 transition-colors cursor-pointer ml-1"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
