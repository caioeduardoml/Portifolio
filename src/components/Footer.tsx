import React, { useCallback } from 'react';
import { FaArrowUp, FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FourPointStar } from '~components/HandcraftedOrnaments';

export const Footer: React.FC = () => {
  const scrollToTop = useCallback((): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className="relative z-10 bg-[#F5F3F0] dark:bg-[#171717] text-[#555555] dark:text-[#D8D5D1] border-t-[1.5px] border-[#171717] dark:border-[#FDFCFB] px-4 sm:px-6 lg:px-10 py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 font-display font-bold text-[#111111] dark:text-[#FDFCFB] text-base tracking-tight">
            <FourPointStar className="w-3.5 h-3.5" />
            <span>
              CAIO EDUARDO<span className="text-[#555555] dark:text-[#A5A19C]">.DEV</span>
            </span>
          </span>
          <p className="text-xs text-[#555555] dark:text-[#D8D5D1]">
            &copy; {new Date().getFullYear()} Portfólio Caio Eduardo. Desenvolvido com React,
            TypeScript, Tailwind CSS e Three.js.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/caioeduardoml"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-[#FFFFFF] dark:bg-[#1A1A1A] text-[#111111] dark:text-[#FDFCFB] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] hover:bg-[#111111] hover:text-[#FDFCFB] dark:hover:bg-[#FDFCFB] dark:hover:text-[#111111] transition-colors cursor-pointer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/caio-eduardo-a67b681a7/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-[#FFFFFF] dark:bg-[#1A1A1A] text-[#111111] dark:text-[#FDFCFB] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] hover:bg-[#111111] hover:text-[#FDFCFB] dark:hover:bg-[#FDFCFB] dark:hover:text-[#111111] transition-colors cursor-pointer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://instagram.com/caioeduardoml"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-[#FFFFFF] dark:bg-[#1A1A1A] text-[#111111] dark:text-[#FDFCFB] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] hover:bg-[#111111] hover:text-[#FDFCFB] dark:hover:bg-[#FDFCFB] dark:hover:text-[#111111] transition-colors cursor-pointer"
          >
            <FaInstagram />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Voltar ao topo da página"
            title="Voltar ao topo"
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-[#111111] dark:bg-[#FDFCFB] text-[#FDFCFB] dark:text-[#111111] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] hover:bg-[#FFFFFF] hover:text-[#111111] dark:hover:bg-[#111111] dark:hover:text-[#FDFCFB] transition-colors cursor-pointer ml-1"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
