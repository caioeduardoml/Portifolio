import React, { useState, useEffect, useCallback, lazy } from 'react';
import Navbar from '~components/Navbar';
import Hero from '~components/Hero';
import Footer from '~components/Footer';
import SuspenseLoader from '~components/SuspenseLoader';
import type { ThemeMode } from '~types/portfolio';

const About = lazy(() => import('~components/About'));
const Skills = lazy(() => import('~components/Skills'));
const Projects = lazy(() => import('~components/Projects'));
const Contact = lazy(() => import('~components/Contact'));

const readSafeTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem('theme');
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  } catch {
    return 'dark';
  }
};

const writeSafeTheme = (theme: ThemeMode): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('theme', theme);
  } catch {
    // Fallback silencioso caso o navegador bloqueie o acesso ao localStorage
  }
};

export const App: React.FC = () => {
  const [isLight, setIsLight] = useState<boolean>(() => readSafeTheme() === 'light');

  useEffect(() => {
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light');
      writeSafeTheme('light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      writeSafeTheme('dark');
    }
  }, [isLight]);

  const handleToggleTheme = useCallback((): void => {
    setIsLight((prev) => !prev);
  }, []);

  return (
    <div className="min-h-dvh bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans transition-colors duration-300 overflow-x-clip">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-[#39FF14] focus:text-slate-950 focus:font-semibold"
      >
        Pular para o conteúdo principal
      </a>

      <Navbar isLight={isLight} onToggleTheme={handleToggleTheme} />

      <main>
        <Hero isLight={isLight} />

        <SuspenseLoader minHeightClass="min-h-[420px]" label="Carregando seção Sobre...">
          <About />
        </SuspenseLoader>

        <SuspenseLoader minHeightClass="min-h-[520px]" label="Carregando Cubo 3D e Habilidades...">
          <Skills />
        </SuspenseLoader>

        <SuspenseLoader minHeightClass="min-h-[520px]" label="Carregando Projetos...">
          <Projects />
        </SuspenseLoader>

        <SuspenseLoader minHeightClass="min-h-[420px]" label="Carregando Contato...">
          <Contact />
        </SuspenseLoader>
      </main>

      <Footer />
    </div>
  );
};

export default App;
