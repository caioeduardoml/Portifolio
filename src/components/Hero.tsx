import React, { useState, useCallback, lazy } from 'react';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import DecryptedText from '~components/DecryptedText';
import SuspenseLoader from '~components/SuspenseLoader';
import { FourPointStar, HandcraftedSparkle } from '~components/HandcraftedOrnaments';
import type { HeroVisualMode } from '~types/portfolio';

const HeroScene3D = lazy(() => import('~components/HeroScene3D'));

interface HeroProps {
  isLight: boolean;
}

const HERO_TAGS: string[] = [
  'Engenheiro da Computação',
  'React & TypeScript',
  'Flutter Mobile',
  'C / C++ & Sistemas',
  'Python',
  '.NET',
  'Linux',
];

const VISUAL_MODES: { id: HeroVisualMode; label: string }[] = [
  { id: 'hybrid', label: 'Híbrido 3D' },
  { id: '3d', label: 'Núcleo 3D' },
  { id: 'synapse', label: 'Sinapses' },
];

export const Hero: React.FC<HeroProps> = ({ isLight }) => {
  const [visualMode, setVisualMode] = useState<HeroVisualMode>('hybrid');

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string): void => {
      e.preventDefault();
      if (!/^#[a-zA-Z][a-zA-Z0-9_-]*$/.test(targetId)) return;
      const target = document.getElementById(targetId.slice(1));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-dvh w-full flex flex-col justify-between items-center pt-28 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-10 overflow-hidden bg-[var(--bg-primary)] border-b border-[#D8D5D1] dark:border-[#333333] transition-colors duration-300"
    >
      {/* Cena 3D Interativa em Background */}
      <SuspenseLoader minHeightClass="min-h-0" label="Inicializando motor 3D...">
        <HeroScene3D visualMode={visualMode} isLight={isLight} />
      </SuspenseLoader>

      {/* Espacador superior para equilibrar o centro vertical */}
      <div aria-hidden="true" className="hidden sm:block h-2" />

      {/* Conteudo Principal */}
      <div className="relative z-20 w-full max-w-4xl mx-auto text-center flex flex-col items-center my-auto">
        {/* Badge de Especialidade */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FFFFFF] dark:bg-[#1A1A1A] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] mb-6">
          <FourPointStar className="w-3.5 h-3.5 text-[#111111] dark:text-[#FDFCFB]" />
          <span className="text-xs sm:text-sm font-mono-code font-medium text-[#111111] dark:text-[#FDFCFB] tracking-wide uppercase">
            Engenheiro da Computação
          </span>
          <HandcraftedSparkle className="w-3.5 h-3.5 text-[#555555] dark:text-[#D8D5D1]" />
        </div>

        {/* Titulo com Efeito de Decriptacao */}
        <h1
          id="hero-heading"
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.12] mb-5 text-[#111111] dark:text-[#FDFCFB] font-display"
        >
          <DecryptedText
            text="Olá, eu sou Caio Eduardo"
            speed={90}
            maxIterations={22}
            characters="ABCD0123456789<>/#"
            className="text-[#111111] dark:text-[#FDFCFB]"
            parentClassName="inline-block"
            encryptedClassName="text-[#555555] dark:text-[#A5A19C]"
            animateOn="view"
          />
        </h1>

        {/* Subtitulo */}
        <p className="text-base sm:text-lg md:text-xl text-[#555555] dark:text-[#D8D5D1] max-w-2xl mx-auto leading-relaxed mb-7 px-1">
          Construindo experiências digitais modernas, eficientes e interativas através de aplicações{' '}
          <span className="text-[#111111] dark:text-[#FDFCFB] font-semibold underline decoration-[#D8D5D1] dark:decoration-[#555555] underline-offset-4">
            web
          </span>
          ,{' '}
          <span className="text-[#111111] dark:text-[#FDFCFB] font-semibold underline decoration-[#D8D5D1] dark:decoration-[#555555] underline-offset-4">
            mobile
          </span>{' '}
          e{' '}
          <span className="text-[#111111] dark:text-[#FDFCFB] font-semibold underline decoration-[#171717] dark:decoration-[#FDFCFB] underline-offset-4">
            sistemas de alta performance
          </span>
          .
        </p>

        {/* Tags de Tecnologias */}
        <div
          aria-label="Principais tecnologias"
          className="flex flex-wrap justify-center gap-2 max-w-2xl mb-8"
        >
          {HERO_TAGS.map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-mono-code font-medium bg-[#FFFFFF] dark:bg-[#1A1A1A] border border-[#171717] dark:border-[#FDFCFB] text-[#111111] dark:text-[#FDFCFB]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Principal */}
        <div className="flex items-center justify-center w-full sm:w-auto px-2 sm:px-0">
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, '#projects')}
            className="w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-full font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2.5 bg-[#111111] dark:bg-[#FDFCFB] text-[#FDFCFB] dark:text-[#111111] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] hover:bg-[#FFFFFF] hover:text-[#111111] dark:hover:bg-[#111111] dark:hover:text-[#FDFCFB] transition-colors duration-200 cursor-pointer"
          >
            <span>Explorar Projetos</span>
            <FaArrowRight className="text-sm" />
          </a>
        </div>
      </div>

      {/* Barra Inferior: Seletor de Modo 3D e Indicador de Scroll */}
      <div className="relative z-20 w-full max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Seletor de Cena 3D */}
        <div
          role="group"
          aria-label="Modo de renderização da cena interativa"
          className="inline-flex items-center gap-1 p-1 rounded-full bg-[#FFFFFF] dark:bg-[#1A1A1A] border-[1.5px] border-[#171717] dark:border-[#FDFCFB]"
        >
          {VISUAL_MODES.map((mode) => {
            const active = visualMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setVisualMode(mode.id)}
                aria-pressed={active}
                className={`min-h-[36px] px-3.5 py-1 rounded-full text-xs font-mono-code font-medium transition-colors duration-200 cursor-pointer ${
                  active
                    ? 'bg-[#111111] dark:bg-[#FDFCFB] text-[#FDFCFB] dark:text-[#111111] font-semibold'
                    : 'text-[#555555] dark:text-[#D8D5D1] hover:text-[#111111] dark:hover:text-[#FDFCFB]'
                }`}
              >
                {mode.label}
              </button>
            );
          })}
        </div>

        {/* Botao Rolar para Sobre */}
        <a
          href="#about"
          onClick={(e) => scrollToSection(e, '#about')}
          aria-label="Rolar para a seção Sobre Mim"
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-1.5 rounded-full text-xs font-mono-code uppercase tracking-wider text-[#555555] dark:text-[#D8D5D1] hover:text-[#111111] dark:hover:text-[#FDFCFB] border border-transparent hover:border-[#171717] dark:hover:border-[#FDFCFB] transition-colors duration-200 cursor-pointer"
        >
          <span>Role para explorar</span>
          <FaChevronDown className="animate-bounce text-[#111111] dark:text-[#FDFCFB]" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
