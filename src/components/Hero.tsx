import React, { useState, useCallback, lazy } from 'react';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import DecryptedText from '~components/DecryptedText';
import SuspenseLoader from '~components/SuspenseLoader';
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
      className="relative min-h-dvh w-full flex flex-col justify-between items-center pt-28 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-10 overflow-hidden bg-[var(--bg-primary)] transition-colors duration-300"
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
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/6 light:bg-white/90 border border-white/12 light:border-slate-300/90 backdrop-blur-md mb-6 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] light:bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#39FF14] light:bg-emerald-600" />
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-200 light:text-slate-700 tracking-wide">
            Engenheiro da Computação
          </span>
        </div>

        {/* Titulo com Efeito de Decriptacao */}
        <h1
          id="hero-heading"
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.12] mb-5 text-white light:text-slate-900 font-display"
        >
          <DecryptedText
            text="Olá, eu sou Caio Eduardo"
            speed={90}
            maxIterations={22}
            characters="ABCD0123456789<>/#"
            className="text-white light:text-slate-900"
            parentClassName="inline-block"
            encryptedClassName="text-[#39FF14] light:text-emerald-600"
            animateOn="view"
          />
        </h1>

        {/* Subtitulo */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 light:text-slate-600 max-w-2xl mx-auto leading-relaxed mb-7 px-1">
          Construindo experiências digitais modernas, eficientes e interativas através de aplicações{' '}
          <span className="text-white light:text-slate-900 font-semibold">web</span>,{' '}
          <span className="text-white light:text-slate-900 font-semibold">mobile</span> e{' '}
          <span className="text-[#39FF14] light:text-emerald-700 font-semibold">
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
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-mono-code font-medium bg-[#0e141f]/80 light:bg-white/90 border border-[#39FF14]/25 light:border-emerald-600/30 text-[#39FF14] light:text-emerald-800 backdrop-blur-md shadow-xs"
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
            className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-xl font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2.5 bg-[#39FF14] light:bg-emerald-600 text-slate-950 light:text-white hover:brightness-110 transition-all duration-200 cursor-pointer shadow-lg shadow-[#39FF14]/20 light:shadow-emerald-600/25"
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
          className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#0b1018]/80 light:bg-white/90 border border-white/10 light:border-slate-300 backdrop-blur-md"
        >
          {VISUAL_MODES.map((mode) => {
            const active = visualMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setVisualMode(mode.id)}
                aria-pressed={active}
                className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-mono-code font-medium transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-[#39FF14] light:bg-emerald-600 text-slate-950 light:text-white font-semibold shadow-xs'
                    : 'text-slate-300 light:text-slate-600 hover:text-white light:hover:text-slate-900'
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
          className="inline-flex items-center gap-2 min-h-[44px] px-3 py-1.5 rounded-xl text-xs font-mono-code uppercase tracking-wider text-slate-400 light:text-slate-600 hover:text-[#39FF14] light:hover:text-emerald-700 transition-colors duration-200 cursor-pointer"
        >
          <span>Role para explorar</span>
          <FaChevronDown className="animate-bounce text-[#39FF14] light:text-emerald-600" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
