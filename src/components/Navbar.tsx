import React, { useState, useEffect, useCallback } from 'react';
import { FaMoon, FaSun, FaGithub, FaBars, FaTimes } from 'react-icons/fa';
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
        className={`mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border transition-all duration-300 ${
          isScrolled
            ? 'bg-[#07090e]/88 light:bg-white/90 backdrop-blur-xl border-white/10 light:border-slate-200/90 shadow-lg shadow-black/30 light:shadow-slate-900/5'
            : 'bg-[#07090e]/65 light:bg-white/75 backdrop-blur-md border-white/5 light:border-slate-200/60'
        }`}
      >
        {/* Logotipo */}
        <a
          href="#home"
          onClick={(e) => handleScroll(e, '#home')}
          className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight text-white light:text-slate-900 cursor-pointer min-h-[44px] px-1"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#39FF14]/15 light:bg-emerald-600/15 border border-[#39FF14]/40 light:border-emerald-600/40 text-[#39FF14] light:text-emerald-700 font-mono-code text-sm">
            &lt;/&gt;
          </span>
          <span className="font-display">
            CAIO<span className="text-[#39FF14] light:text-emerald-600">.DEV</span>
          </span>
        </a>

        {/* Links Desktop */}
        <ul className="hidden md:flex items-center gap-1 lg:gap-2 list-none m-0 p-0">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-flex items-center justify-center min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#39FF14] light:text-emerald-700 bg-[#39FF14]/10 light:bg-emerald-600/10 font-semibold'
                      : 'text-slate-300 light:text-slate-600 hover:text-white light:hover:text-slate-900 hover:bg-white/5 light:hover:bg-slate-100'
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
            className="hidden sm:inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl border border-white/10 light:border-slate-200 bg-white/5 light:bg-slate-100 text-slate-200 light:text-slate-700 hover:text-[#39FF14] light:hover:text-emerald-700 hover:border-[#39FF14]/40 light:hover:border-emerald-600/40 transition-colors duration-200 cursor-pointer"
          >
            <FaGithub className="text-lg" />
          </a>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isLight ? 'Ativar tema escuro' : 'Ativar tema claro'}
            title={isLight ? 'Ativar tema escuro' : 'Ativar tema claro'}
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl border border-white/10 light:border-slate-200 bg-white/5 light:bg-slate-100 text-slate-200 light:text-slate-700 hover:text-[#39FF14] light:hover:text-emerald-700 hover:border-[#39FF14]/40 light:hover:border-emerald-600/40 transition-colors duration-200 cursor-pointer"
          >
            {isLight ? <FaMoon className="text-base" /> : <FaSun className="text-base text-amber-300" />}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="hidden lg:inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#39FF14] light:bg-emerald-600 text-slate-950 light:text-white hover:brightness-110 transition-all duration-200 cursor-pointer shadow-md shadow-[#39FF14]/15 light:shadow-emerald-600/20"
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
            className="inline-flex md:hidden items-center justify-center min-w-[44px] min-h-[44px] rounded-xl border border-white/10 light:border-slate-200 bg-white/5 light:bg-slate-100 text-white light:text-slate-900 hover:text-[#39FF14] light:hover:text-emerald-700 transition-colors duration-200 cursor-pointer z-50"
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
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      <div
        id="mobile-navigation-drawer"
        className={`fixed top-0 right-0 h-dvh w-[min(82vw,320px)] bg-[#0b0f17]/98 light:bg-white/98 backdrop-blur-xl border-l border-white/10 light:border-slate-200 z-40 md:hidden flex flex-col justify-between p-6 pt-24 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-2 list-none m-0 p-0">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`flex items-center justify-between w-full min-h-[48px] px-4 rounded-xl text-base font-medium transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#39FF14]/15 light:bg-emerald-600/12 text-[#39FF14] light:text-emerald-700 font-semibold border border-[#39FF14]/30 light:border-emerald-600/30'
                      : 'text-slate-300 light:text-slate-700 hover:bg-white/5 light:hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#39FF14] light:bg-emerald-600" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="pt-6 border-t border-white/10 light:border-slate-200 flex flex-col gap-3">
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="flex items-center justify-center w-full min-h-[48px] rounded-xl font-semibold text-sm bg-[#39FF14] light:bg-emerald-600 text-slate-950 light:text-white cursor-pointer"
          >
            Entrar em Contato
          </a>
          <a
            href="https://github.com/caioeduardoml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full min-h-[48px] rounded-xl font-medium text-sm border border-white/10 light:border-slate-200 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-slate-900 cursor-pointer"
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
