import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  FaReact,
  FaPython,
  FaTerminal,
  FaMobileAlt,
  FaMicrochip,
  FaCube,
  FaExpandArrowsAlt,
  FaCompressArrowsAlt,
  FaSyncAlt,
} from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';
import type { CubeFaceSkill, SkillGroup } from '~types/portfolio';

const CUBE_SKILLS: CubeFaceSkill[] = [
  {
    id: 'react',
    label: 'ReactJS',
    category: 'Frontend & Web 3D',
    summary:
      'Construção de SPAs modulares com React 19, Hooks customizados, Suspense, animações fluidas e integração WebGL/Three.js.',
    details: ['Componentização limpa', 'React 19 & Hooks', 'Three.js / Motion', 'Tailwind CSS v4'],
    colorClass: 'from-blue-600/90 to-cyan-600/90',
    borderGlow: 'border-cyan-300/50',
    icon: <FaReact />,
  },
  {
    id: 'python',
    label: 'Python',
    category: 'Backend & Automação',
    summary:
      'Desenvolvimento de scripts de automação, processamento de dados, integração de serviços e algoritmos computacionais.',
    details: ['Automação de tarefas', 'APIs & Scripts', 'Processamento de dados', 'Integração Linux'],
    colorClass: 'from-emerald-600/90 to-teal-700/90',
    borderGlow: 'border-emerald-300/50',
    icon: <FaPython />,
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    category: 'Tipagem Estrita & Arquitetura',
    summary:
      'Código seguro e escalável com tipagem estática rigorosa, interfaces bem definidas e prevenção de erros em tempo de compilação.',
    details: ['Strict Mode', 'Generics & Interfaces', 'Arquitetura escalável', 'Manutenibilidade'],
    colorClass: 'from-sky-600/90 to-indigo-700/90',
    borderGlow: 'border-sky-300/50',
    icon: <SiTypescript />,
  },
  {
    id: 'dotnet',
    label: '.NET',
    category: 'Plataforma & Aplicações',
    summary:
      'Desenvolvimento de aplicações robustas e estruturadas utilizando o ecossistema .NET e orientação a objetos.',
    details: ['POO Avançada', 'C# / .NET', 'Arquitetura em camadas', 'APIs & Serviços'],
    colorClass: 'from-purple-600/90 to-violet-800/90',
    borderGlow: 'border-purple-300/50',
    icon: <FaTerminal />,
  },
  {
    id: 'flutter',
    label: 'Flutter',
    category: 'Mobile Multiplataforma',
    summary:
      'Aplicações nativas compiladas para Android e iOS com interfaces responsivas, animações a 60fps e gerenciamento de estado.',
    details: ['UI Responsiva', 'Dart', 'Integração REST', 'Multiplataforma'],
    colorClass: 'from-indigo-500/90 to-blue-700/90',
    borderGlow: 'border-indigo-300/50',
    icon: <FaMobileAlt />,
  },
  {
    id: 'cpp',
    label: 'C / C++',
    category: 'Sistemas & Performance',
    summary:
      'Programação de baixo nível, gerenciamento de memória, simuladores de Sistemas Operacionais (Qt) e jogos 2D/3D com Raylib.',
    details: ['Sistemas Operacionais', 'Ponteiros & Memória', 'Raylib & QtCreator', 'Estruturas de Dados'],
    colorClass: 'from-amber-500/90 to-orange-600/90',
    borderGlow: 'border-amber-300/50',
    icon: <FaMicrochip />,
  },
];

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend & Web Interativa',
    subtitle: 'Interfaces modernas e responsivas',
    items: [
      { name: 'ReactJS', level: 'Avançado', tag: 'UI / SPA' },
      { name: 'TypeScript', level: 'Avançado', tag: 'Tipagem' },
      { name: 'Tailwind CSS', level: 'Avançado', tag: 'Design System' },
      { name: 'Three.js & Motion', level: 'Intermediário', tag: '3D / Animação' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile & Cross-Platform',
    subtitle: 'Experiências nativas fluidas',
    items: [
      { name: 'Flutter', level: 'Avançado', tag: 'Mobile SDK' },
      { name: 'Dart', level: 'Avançado', tag: 'Linguagem' },
      { name: 'Consumo de APIs REST', level: 'Avançado', tag: 'Integração' },
      { name: 'Layouts Adaptativos', level: 'Avançado', tag: 'Responsividade' },
    ],
  },
  {
    id: 'systems',
    title: 'Sistemas & Baixo Nível',
    subtitle: 'Engenharia de Computação',
    items: [
      { name: 'C / C++', level: 'Avançado', tag: 'Performance' },
      { name: 'Sistemas Operacionais', level: 'Intermediário', tag: 'Escalonamento' },
      { name: 'QtCreator', level: 'Intermediário', tag: 'GUI C++' },
      { name: 'Raylib', level: 'Intermediário', tag: 'Gráficos / Jogos' },
    ],
  },
  {
    id: 'backend-linux',
    title: 'Backend, Ferramentas & Linux',
    subtitle: 'Produtividade e infraestrutura',
    items: [
      { name: 'Linux (Desktop/CLI)', level: 'Avançado', tag: 'Sistema Base' },
      { name: 'Python', level: 'Intermediário', tag: 'Scripts / Backend' },
      { name: '.NET', level: 'Intermediário', tag: 'Framework' },
      { name: 'Git & GitHub', level: 'Avançado', tag: 'Versionamento' },
    ],
  },
];

const getResponsiveCubeSize = (width: number): number => {
  if (width < 380) return 86;
  if (width < 640) return 104;
  if (width < 1024) return 134;
  return 156;
};

export const Skills: React.FC = () => {
  const [isUnfolded, setIsUnfolded] = useState<boolean>(false);
  const [selectedSkillId, setSelectedSkillId] = useState<string>('react');
  const [cubeSize, setCubeSize] = useState<number>(() =>
    typeof window !== 'undefined' ? getResponsiveCubeSize(window.innerWidth) : 140
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const cubeRef = useRef<HTMLDivElement | null>(null);
  const isVisibleRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const isUnfoldedRef = useRef<boolean>(false);
  const rotationRef = useRef<{ x: number; y: number }>({ x: -18, y: 38 });
  const prevPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const movedDistanceRef = useRef<number>(0);

  useEffect(() => {
    isUnfoldedRef.current = isUnfolded;
    if (cubeRef.current) {
      cubeRef.current.style.transition = 'transform 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
      if (isUnfolded) {
        cubeRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
      } else {
        cubeRef.current.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
      }
      const timer = setTimeout(() => {
        if (cubeRef.current && !isUnfoldedRef.current) {
          cubeRef.current.style.transition = 'none';
        }
      }, 680);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isUnfolded]);

  useEffect(() => {
    const handleResize = (): void => {
      setCubeSize(getResponsiveCubeSize(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          isVisibleRef.current = entry.isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Loop 60fps manipulando diretamente o DOM via ref (sem re-renderizar o React)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const animateCube = (): void => {
      rafId = requestAnimationFrame(animateCube);
      if (
        !isVisibleRef.current ||
        document.hidden ||
        isDraggingRef.current ||
        isUnfoldedRef.current ||
        prefersReducedMotion
      ) {
        return;
      }

      rotationRef.current.x += 0.04;
      rotationRef.current.y += 0.14;

      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
      }
    };

    rafId = requestAnimationFrame(animateCube);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handlePointerDown = useCallback((clientX: number, clientY: number): void => {
    isDraggingRef.current = true;
    movedDistanceRef.current = 0;
    prevPointerRef.current = { x: clientX, y: clientY };
    if (cubeRef.current) {
      cubeRef.current.style.transition = 'none';
    }
  }, []);

  const handlePointerMove = useCallback((clientX: number, clientY: number): void => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - prevPointerRef.current.x;
    const deltaY = clientY - prevPointerRef.current.y;
    movedDistanceRef.current += Math.abs(deltaX) + Math.abs(deltaY);
    prevPointerRef.current = { x: clientX, y: clientY };

    if (!isUnfoldedRef.current && cubeRef.current) {
      rotationRef.current.y += deltaX * 0.38;
      rotationRef.current.x = Math.max(-75, Math.min(75, rotationRef.current.x - deltaY * 0.38));
      cubeRef.current.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
    }
  }, []);

  const handlePointerUp = useCallback((): void => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (movedDistanceRef.current < 10) {
      setIsUnfolded((prev) => !prev);
    }
  }, []);

  const handleResetRotation = useCallback((): void => {
    setIsUnfolded(false);
    rotationRef.current = { x: -18, y: 38 };
    if (cubeRef.current) {
      cubeRef.current.style.transition = 'transform 0.5s ease-out';
      cubeRef.current.style.transform = 'rotateX(-18deg) rotateY(38deg)';
    }
  }, []);

  const halfSize = Math.round(cubeSize / 2);
  const stepOffset = cubeSize + 8;

  const faceTransforms = useMemo<string[]>(() => {
    if (isUnfolded) {
      return [
        'rotateY(0deg) translate3d(0px, 0px, 0px)',
        `rotateY(0deg) translate3d(0px, ${stepOffset * 2}px, 0px)`,
        `rotateY(0deg) translate3d(${stepOffset}px, 0px, 0px)`,
        `rotateY(0deg) translate3d(${-stepOffset}px, 0px, 0px)`,
        `rotateX(0deg) translate3d(0px, ${-stepOffset}px, 0px)`,
        `rotateX(0deg) translate3d(0px, ${stepOffset}px, 0px)`,
      ];
    }
    return [
      `rotateY(0deg) translateZ(${halfSize}px)`,
      `rotateY(180deg) translateZ(${halfSize}px)`,
      `rotateY(90deg) translateZ(${halfSize}px)`,
      `rotateY(-90deg) translateZ(${halfSize}px)`,
      `rotateX(90deg) translateZ(${halfSize}px)`,
      `rotateX(-90deg) translateZ(${halfSize}px)`,
    ];
  }, [isUnfolded, halfSize, stepOffset]);

  const selectedSkill = useMemo<CubeFaceSkill>(
    () => CUBE_SKILLS.find((s) => s.id === selectedSkillId) ?? CUBE_SKILLS[0]!,
    [selectedSkillId]
  );

  // Altura e deslocamento geometrico exatos para centralizar a cruz planificada em qualquer tela
  const stageHeight = isUnfolded ? stepOffset * 3 + cubeSize + 36 : Math.max(240, cubeSize + 96);
  const centerShiftWhenUnfolded = isUnfolded ? -Math.round(stepOffset / 2) : 0;

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-labelledby="skills-heading"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-[var(--bg-primary)] transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Cabecalho */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-xs font-mono-code uppercase tracking-widest text-[#39FF14] light:text-emerald-700 font-semibold mb-2">
            02 // Stack &amp; Experiência 3D
          </span>
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl font-bold text-white light:text-slate-900 font-display tracking-tight"
          >
            Minhas Habilidades
          </h2>
          <div className="w-14 h-1 bg-[#39FF14] light:bg-emerald-600 mx-auto mt-3 rounded-full" />
          <p className="text-slate-300 light:text-slate-600 text-sm sm:text-base mt-4">
            Interaja com o cubo 3D abaixo (arraste para girar ou clique para planificar) ou selecione
            uma tecnologia para inspecionar.
          </p>
        </div>

        {/* Showcase 3D + Inspetor de Tecnologia */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Palco do Cubo 3D */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center rounded-2xl bg-[#0e141f]/90 light:bg-white border border-white/8 light:border-slate-200 p-4 sm:p-6 shadow-xl relative overflow-hidden">
            {/* Barra de Controles Acessiveis do Cubo */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/8 light:border-slate-100 z-20">
              <div className="flex items-center gap-2 text-xs font-mono-code text-slate-300 light:text-slate-600">
                <FaCube className="text-[#39FF14] light:text-emerald-600" />
                <span>{isUnfolded ? 'Modo: Planificado (2D/3D)' : 'Modo: Cubo 3D Interativo'}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsUnfolded((prev) => !prev)}
                  className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#39FF14]/15 light:bg-emerald-600/12 text-[#39FF14] light:text-emerald-700 border border-[#39FF14]/35 light:border-emerald-600/35 hover:bg-[#39FF14]/25 transition-colors cursor-pointer"
                >
                  {isUnfolded ? <FaCompressArrowsAlt /> : <FaExpandArrowsAlt />}
                  <span>{isUnfolded ? 'Montar Cubo' : 'Abrir Cubo'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetRotation}
                  aria-label="Resetar rotação do cubo"
                  title="Resetar rotação"
                  className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] rounded-xl text-xs bg-white/5 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-white/10 light:border-slate-200 hover:text-white light:hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <FaSyncAlt />
                </button>
              </div>
            </div>

            {/* Container Responsivo do Cubo */}
            <div
              style={{ height: `${stageHeight}px` }}
              className="w-full flex items-center justify-center perspective-[1200px] transition-all duration-500 my-2 select-none"
            >
              <div
                role="application"
                aria-label="Cubo 3D interativo de habilidades. Arraste para girar ou clique para abrir."
                onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
                onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  if (touch) handlePointerDown(touch.clientX, touch.clientY);
                }}
                onTouchMove={(e) => {
                  const touch = e.touches[0];
                  if (touch) handlePointerMove(touch.clientX, touch.clientY);
                }}
                onTouchEnd={handlePointerUp}
                style={{
                  width: `${cubeSize}px`,
                  height: `${cubeSize}px`,
                  transform: `translateY(${centerShiftWhenUnfolded}px)`,
                }}
                className="relative cursor-grab active:cursor-grabbing touch-none transition-all duration-500"
              >
                <div
                  ref={cubeRef}
                  className="w-full h-full relative preserve-3d"
                  style={{
                    transform: 'rotateX(-18deg) rotateY(38deg)',
                  }}
                >
                  {CUBE_SKILLS.map((face, index) => {
                    const isSelected = selectedSkillId === face.id;
                    return (
                      <div
                        key={face.id}
                        onClick={(e) => {
                          if (isUnfolded) {
                            e.stopPropagation();
                            setSelectedSkillId(face.id);
                          }
                        }}
                        style={{
                          width: `${cubeSize}px`,
                          height: `${cubeSize}px`,
                          transform: faceTransforms[index],
                        }}
                        className={`face3d absolute rounded-xl border-2 bg-gradient-to-br ${face.colorClass} ${
                          isSelected ? 'border-[#39FF14] ring-2 ring-[#39FF14]/50' : face.borderGlow
                        } flex flex-col items-center justify-center text-white shadow-[inset_0_0_24px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all duration-500 ${
                          isUnfolded ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'
                        }`}
                      >
                        <div className="text-2xl sm:text-3xl md:text-4xl mb-1.5 drop-shadow">
                          {face.icon}
                        </div>
                        <span className="font-display font-bold text-xs sm:text-sm tracking-wide">
                          {face.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="text-center text-slate-400 light:text-slate-600 text-xs sm:text-sm mt-1">
              {isUnfolded ? (
                <>
                  Cubo planificado! Toque em uma face para inspecionar ou em{' '}
                  <button
                    type="button"
                    onClick={() => setIsUnfolded(false)}
                    className="text-[#39FF14] light:text-emerald-700 font-bold underline cursor-pointer"
                  >
                    Montar Cubo
                  </button>
                  .
                </>
              ) : (
                <>
                  Arraste para girar em 3D ou dê um{' '}
                  <button
                    type="button"
                    onClick={() => setIsUnfolded(true)}
                    className="text-[#39FF14] light:text-emerald-700 font-bold underline cursor-pointer"
                  >
                    Clique Rápido
                  </button>{' '}
                  para abri-lo.
                </>
              )}
            </p>
          </div>

          {/* Painel Inspetor da Habilidade Selecionada */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Seletor Rapido de Faces */}
            <div
              role="tablist"
              aria-label="Selecionar tecnologia do cubo"
              className="grid grid-cols-2 sm:grid-cols-3 gap-2"
            >
              {CUBE_SKILLS.map((skill) => {
                const active = selectedSkillId === skill.id;
                return (
                  <button
                    key={skill.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedSkillId(skill.id)}
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-[#39FF14]/15 light:bg-emerald-600/15 border-[#39FF14] light:border-emerald-600 text-[#39FF14] light:text-emerald-800 shadow-sm'
                        : 'bg-[#111722]/80 light:bg-white border-white/8 light:border-slate-200 text-slate-300 light:text-slate-700 hover:border-white/25 light:hover:border-slate-300'
                    }`}
                  >
                    <span className="text-base">{skill.icon}</span>
                    <span className="truncate">{skill.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Card Detalhado da Tecnologia */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#111722]/90 light:bg-white border border-white/10 light:border-slate-200 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono-code font-medium bg-[#39FF14]/12 light:bg-emerald-600/12 text-[#39FF14] light:text-emerald-700 border border-[#39FF14]/30 light:border-emerald-600/30">
                    {selectedSkill.category}
                  </span>
                  <div className="text-2xl text-[#39FF14] light:text-emerald-600">
                    {selectedSkill.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white light:text-slate-900 font-display mb-2">
                  {selectedSkill.label}
                </h3>
                <p className="text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  {selectedSkill.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono-code uppercase tracking-wider text-slate-400 light:text-slate-500 mb-3">
                  Competências Aplicadas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSkill.details.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/4 light:bg-slate-50 border border-white/6 light:border-slate-200 text-xs sm:text-sm text-slate-200 light:text-slate-700 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] light:bg-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Matriz Completa de Habilidades por Dominio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.id}
              className="p-6 rounded-2xl bg-[#111722]/85 light:bg-white border border-white/8 light:border-slate-200 hover:border-[#39FF14]/35 light:hover:border-emerald-600/40 transition-all duration-300 flex flex-col justify-between shadow-md"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white light:text-slate-900 font-display mb-1">
                  {group.title}
                </h3>
                <p className="text-xs text-slate-400 light:text-slate-500 mb-5">{group.subtitle}</p>
              </div>

              <ul className="space-y-2.5 list-none m-0 p-0">
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/4 light:bg-slate-50 border border-white/6 light:border-slate-200/80"
                  >
                    <span className="text-sm font-medium text-slate-200 light:text-slate-800">
                      {skill.name}
                    </span>
                    <span className="text-[11px] font-mono-code px-2 py-0.5 rounded-md bg-[#39FF14]/10 light:bg-emerald-600/10 text-[#39FF14] light:text-emerald-700 font-medium">
                      {skill.tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
