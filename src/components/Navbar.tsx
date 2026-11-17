import React, { useState, useEffect, useCallback } from 'react';
import { FaMoon, FaSun, FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { FourPointStar } from '~components/HandcraftedOrnaments';
import type { NavItem } from '~types/portfolio';

interface NavbarProps {
  isLight: boolean;
  onToggleTheme: () => void;
}

const NAV_LINKS: NavItem[] = [
  { href: '#home', label: 'Início', sectionId: 'home' },
  { href: '#about', label: 'Sobre', sectionId: 'about' },
  { href: '#skills', label: 'Habilidades', sectionId: 'skills' },
  { href: '#projects', label: 'Projetos', sectionId: 'projects' },
  { href: '#contact', label: 'Contato', sectionId: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ isLight, onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScrollState = (): void => {
      setIsScrolled(window.scrollY > 24);

      const scrollPosition = window.scrollY + 180;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const item = NAV_LINKS[i];
        if (!item) continue;
        const sectionEl = document.getElementById(item.sectionId);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(item.sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollState, { passive: true });
    handleScrollState();
    return () => window.removeEventListener('scroll', handleScrollState);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault();
    if (/^#[a-zA-Z][a-zA-Z0-9_-]*$/.test(href)) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-10 pt-3 sm:pt-4 transition-all duration-300">
      <nav
        aria-label="Navegação principal"
        className={`mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border-[1.5px] transition-colors duration-200 ${
          isScrolled
            ? 'bg-[#FFFFFF] dark:bg-[#171717] border-[#171717] dark:border-[#FDFCFB]'
            : 'bg-[#FDFCFB] dark:bg-[#111111] border-[#171717] dark:border-[#FDFCFB]'
        }`}
      >
        {/* Logotipo */}
        <a
          href="#home"
          onClick={(e) => handleScroll(e, '#home')}
          className="flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-[#111111] dark:text-[#FDFCFB] cursor-pointer min-h-[44px] px-1"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#111111] dark:bg-[#FDFCFB] text-[#FDFCFB] dark:text-[#111111] border border-[#171717] dark:border-[#FDFCFB] font-mono-code text-xs">
            <FourPointStar className="w-4 h-4" />
          </span>
          <span className="font-display">
            CAIO<span className="text-[#555555] dark:text-[#A5A19C]">.DEV</span>
          </span>
        </a>

        {/* Links Desktop */}
        <ul className="hidden md:flex items-center gap-1 lg:gap-1.5 list-none m-0 p-0">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-flex items-center justify-center min-h-[40px] px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] dark:bg-[#FDFCFB] text-[#FDFCFB] dark:text-[#111111] border-[#171717] dark:border-[#FDFCFB] font-semibold'
                      : 'bg-transparent text-[#555555] dark:text-[#D8D5D1] border-transparent hover:text-[#111111] dark:hover:text-[#FDFCFB] hover:border-[#171717] dark:hover:border-[#FDFCFB]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Acoes Direita */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/caioeduardoml"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil no GitHub de Caio Eduardo"
            className="hidden sm:inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border-[1.5px] border-[#171717] dark:border-[#FDFCFB] bg-[#FFFFFF] dark:bg-[#1A1A1A] text-[#111111] dark:text-[#FDFCFB] hover:bg-[#111111] hover:text-[#FDFCFB] dark:hover:bg-[#FDFCFB] dark:hover:text-[#111111] transition-colors duration-200 cursor-pointer"
          >
            <FaGithub className="text-lg" />
          </a>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isLight ? 'Ativar tema escuro monocromático' : 'Ativar tema claro monocromático'}
            title={isLight ? 'Ativar modo escuro monocromático' : 'Ativar modo claro monocromático'}
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border-[1.5px] border-[#171717] dark:border-[#FDFCFB] bg-[#FFFFFF] dark:bg-[#1A1A1A] text-[#111111] dark:text-[#FDFCFB] hover:bg-[#111111] hover:text-[#FDFCFB] dark:hover:bg-[#FDFCFB] dark:hover:text-[#111111] transition-colors duration-200 cursor-pointer"
          >
            {isLight ? <FaMoon className="text-base" /> : <FaSun className="text-base" />}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="hidden lg:inline-flex items-center justify-center min-h-[44px] px-5 py-2 rounded-full text-xs font-mono-code font-semibold uppercase tracking-wider bg-[#111111] dark:bg-[#FDFCFB] text-[#FDFCFB] dark:text-[#111111] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] hover:bg-[#FFFFFF] hover:text-[#111111] dark:hover:bg-[#111111] dark:hover:text-[#FDFCFB] transition-colors duration-200 cursor-pointer"
          >
            Fale Comigo
          </a>

          {/* Botao Menu Mobile */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-drawer"
            className="inline-flex md:hidden items-center justify-center min-w-[44px] min-h-[44px] rounded-full border-[1.5px] border-[#171717] dark:border-[#FDFCFB] bg-[#FFFFFF] dark:bg-[#1A1A1A] text-[#111111] dark:text-[#FDFCFB] hover:bg-[#111111] hover:text-[#FDFCFB] dark:hover:bg-[#FDFCFB] dark:hover:text-[#111111] transition-colors duration-200 cursor-pointer z-50"
          >
            {isOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </nav>

      {/* Backdrop e Gaveta Mobile */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-[#111111]/40 z-40 md:hidden"
        />
      )}

      <div
        id="mobile-navigation-drawer"
        className={`fixed top-0 right-0 h-dvh w-[min(82vw,320px)] bg-[#FDFCFB] dark:bg-[#111111] border-l-[1.5px] border-[#171717] dark:border-[#FDFCFB] z-40 md:hidden flex flex-col justify-between p-6 pt-24 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`flex items-center justify-between w-full min-h-[48px] px-5 rounded-full text-base font-medium border-[1.5px] transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] dark:bg-[#FDFCFB] text-[#FDFCFB] dark:text-[#111111] border-[#171717] dark:border-[#FDFCFB] font-semibold'
                      : 'bg-[#FFFFFF] dark:bg-[#1A1A1A] text-[#111111] dark:text-[#FDFCFB] border-[#D8D5D1] dark:border-[#333333] hover:border-[#171717] dark:hover:border-[#FDFCFB]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <FourPointStar className="w-3.5 h-3.5" />}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="pt-6 border-t border-[#D8D5D1] dark:border-[#333333] flex flex-col gap-3">
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="flex items-center justify-center w-full min-h-[48px] rounded-full font-semibold text-sm bg-[#111111] dark:bg-[#FDFCFB] text-[#FDFCFB] dark:text-[#111111] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] hover:bg-[#FFFFFF] hover:text-[#111111] dark:hover:bg-[#111111] dark:hover:text-[#FDFCFB] transition-colors cursor-pointer"
          >
            Entrar em Contato
          </a>
          <a
            href="https://github.com/caioeduardoml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full min-h-[48px] rounded-full font-medium text-sm border-[1.5px] border-[#171717] dark:border-[#FDFCFB] bg-[#FFFFFF] dark:bg-[#1A1A1A] text-[#111111] dark:text-[#FDFCFB] hover:bg-[#111111] hover:text-[#FDFCFB] dark:hover:bg-[#FDFCFB] dark:hover:text-[#111111] transition-colors cursor-pointer"
          >
            <FaGithub className="text-base" />
            <span>GitHub (@caioeduardoml)</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
