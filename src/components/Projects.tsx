import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  FaLaptopCode,
  FaQrcode,
  FaGamepad,
  FaMicrochip,
  FaGithub,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import type { ProjectCategory, ProjectItem } from '~types/portfolio';
import { fetchGitHubRepos, mapGitHubReposToProjects } from '@/services/githubApi';

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'roboap-utfpr',
    title: 'Landing Page — RoboAp UTFPR',
    subtitle: 'Portal Institucional & Equipe de Robótica',
    desc: 'Site institucional desenvolvido para a equipe de Robótica da UTFPR, apresentando projetos, competições e iniciativas tecnológicas para a comunidade acadêmica.',
    categories: ['todos', 'destaques', 'web'],
    icon: <FaLaptopCode />,
    techs: ['React', 'TypeScript', 'Tailwind CSS', 'Design Responsivo'],
    imageUrl: '/roboaputfpr.png',
    githubUrl: 'https://github.com/caioeduardoml',
    liveUrl: 'https://roboaputfpr.netlify.app',
    highlightBadge: 'Destaque Web',
  },
  {
    id: 'gerador-qrcode',
    title: 'Gerador de QR-Code Personalizado',
    subtitle: 'Ferramenta Web para Marcas e Empresas',
    desc: 'Aplicação web interativa que permite gerar e exportar QR-Codes customizados para empresas, eventos e materiais digitais com pré-visualização instantânea.',
    categories: ['todos', 'destaques', 'web'],
    icon: <FaQrcode />,
    techs: ['React', 'TypeScript', 'REST API', 'UX/UI'],
    imageUrl: '/qrcode.png',
    githubUrl: 'https://github.com/caioeduardoml/Gerador-QR-Code',
    liveUrl: 'https://geradorqr-code.netlify.app',
    highlightBadge: 'Aplicação Ao Vivo',
  },
  {
    id: 'projeto-pokedex',
    title: 'Projeto Pokédex & Engine 2D',
    subtitle: 'Jogo e Simulação Gráfica em C',
    desc: 'Jogo desenvolvido em linguagem C utilizando a biblioteca gráfica Raylib, implementando mecânicas inspiradas em Pokémon, gerenciamento de estados e renderização em tempo real.',
    categories: ['todos', 'destaques', 'sistemas'],
    icon: <FaGamepad />,
    techs: ['C', 'Raylib', 'Game Loop', 'Estruturas de Dados'],
    githubUrl: 'https://github.com/caioeduardoml/ProjetoPokedexUTFPR',
    highlightBadge: 'Gráficos & C',
  },
  {
    id: 'simulador-so',
    title: 'Simulador de Processos de S.O.',
    subtitle: 'Escalonamento de CPU & Diagrama de Tempo',
    desc: 'Simulador visual de escalonamento de processos de Sistemas Operacionais com suporte a algoritmos Round Robin, SJF Preemptivo e SJF por Prioridade com diagrama de Gantt.',
    categories: ['todos', 'sistemas'],
    icon: <FaMicrochip />,
    techs: ['C', 'C++', 'QtCreator', 'Sistemas Operacionais'],
    githubUrl: 'https://github.com/Gu1-Fr4nc0/-Simulador_de_Sistemas_Operacionais',
    highlightBadge: 'Engenharia de S.O.',
  },
];

const FILTER_TABS: { id: ProjectCategory; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'destaques', label: 'Destaques' },
  { id: 'web', label: 'Web & UI' },
  { id: 'sistemas', label: 'Sistemas & C/C++' },
];

interface ProjectCardProps {
  project: ProjectItem;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project }) => {
  const cardRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    if (window.innerWidth < 1024) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(
      x * 5
    ).toFixed(2)}deg) translateY(-4px)`;
  }, []);

  const handleMouseLeave = useCallback((): void => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group rounded-2xl overflow-hidden bg-[#111722]/90 light:bg-white border border-white/8 light:border-slate-200 hover:border-[#39FF14]/45 light:hover:border-emerald-600/50 flex flex-col h-full shadow-lg hover:shadow-2xl transition-all duration-300 ease-out"
    >
      {/* Thumbnail ou Representacao Grafica */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#0a0f18] light:bg-slate-100 border-b border-white/6 light:border-slate-200/80">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={`Pré-visualização do projeto ${project.title}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#101929] via-[#0c1320] to-[#11221c] light:from-slate-100 light:via-emerald-50/60 light:to-slate-200 flex flex-col items-center justify-center p-6 relative">
            <div className="w-16 h-16 rounded-2xl bg-[#39FF14]/12 light:bg-emerald-600/12 border border-[#39FF14]/30 light:border-emerald-600/30 flex items-center justify-center text-4xl text-[#39FF14] light:text-emerald-700 group-hover:scale-110 transition-transform duration-300">
              {project.icon}
            </div>
            <span className="mt-3 text-xs font-mono-code text-slate-400 light:text-slate-600">
              {project.subtitle}
            </span>
          </div>
        )}

        {project.highlightBadge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-mono-code font-semibold bg-[#07090e]/85 light:bg-white/95 text-[#39FF14] light:text-emerald-700 border border-[#39FF14]/35 light:border-emerald-600/35 backdrop-blur-md shadow-sm">
            {project.highlightBadge}
          </span>
        )}
      </div>

      {/* Corpo do Card */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <span className="block text-xs font-mono-code text-slate-400 light:text-slate-500 mb-1">
            {project.subtitle}
          </span>
          <h3 className="text-xl font-bold text-white light:text-slate-900 font-display mb-2.5 group-hover:text-[#39FF14] light:group-hover:text-emerald-700 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-300 light:text-slate-600 leading-relaxed mb-5">
            {project.desc}
          </p>

          {/* Lista de Tecnologias */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono-code font-medium px-2.5 py-1 rounded-md bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-200 text-slate-200 light:text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Botoes de Acao com Alvo de Toque >= 44px */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/8 light:border-slate-100 mt-auto">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 bg-white/6 light:bg-slate-100 hover:bg-white/12 light:hover:bg-slate-200 text-white light:text-slate-900 border border-white/12 light:border-slate-300 transition-colors duration-200 cursor-pointer"
            >
              <FaGithub className="text-base" />
              <span>Código Fonte</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 bg-[#39FF14] light:bg-emerald-600 text-slate-950 light:text-white hover:brightness-110 transition-all duration-200 cursor-pointer shadow-sm"
            >
              <FaExternalLinkAlt className="text-xs" />
              <span>Visitar Demo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
});

ProjectCard.displayName = 'ProjectCard';

export const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('todos');
  const [githubProjects, setGithubProjects] = useState<ProjectItem[]>([]);
  const [isSyncingGithub, setIsSyncingGithub] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadGithubRepos = async (): Promise<void> => {
      try {
        const repos = await fetchGitHubRepos(controller.signal);
        const existingUrls = new Set(
          PROJECTS_DATA.map((p) => p.githubUrl?.replace(/\/+$/, '').toLowerCase()).filter(
            (url): url is string => Boolean(url)
          )
        );
        const mapped = mapGitHubReposToProjects(repos, existingUrls);
        if (!controller.signal.aborted) {
          setGithubProjects(mapped);
        }
      } catch {
        // Mantem os projetos locais em caso de indisponibilidade ou limite da API
      } finally {
        if (!controller.signal.aborted) {
          setIsSyncingGithub(false);
        }
      }
    };

    void loadGithubRepos();
    return () => controller.abort();
  }, []);

  const allProjects = useMemo<ProjectItem[]>(
    () => [...PROJECTS_DATA, ...githubProjects],
    [githubProjects]
  );

  const filteredProjects = useMemo<ProjectItem[]>(
    () => allProjects.filter((project) => project.categories.includes(activeTab)),
    [allProjects, activeTab]
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-[var(--bg-secondary)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Cabecalho */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block text-xs font-mono-code uppercase tracking-widest text-[#39FF14] light:text-emerald-700 font-semibold mb-2">
            03 // Portfólio Selecionado
          </span>
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl font-bold text-white light:text-slate-900 font-display tracking-tight"
          >
            Projetos em Destaque
          </h2>
          <div className="w-14 h-1 bg-[#39FF14] light:bg-emerald-600 mx-auto mt-3 rounded-full" />
          <p className="text-slate-300 light:text-slate-600 text-sm sm:text-base mt-4">
            Aplicações web em produção, ferramentas interativas e projetos de engenharia de sistemas.
          </p>
        </div>

        {/* Abas de Filtro Responsivas */}
        <div
          role="tablist"
          aria-label="Filtrar projetos por categoria"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = allProjects.filter((p) => p.categories.includes(tab.id)).length;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[44px] px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#39FF14] light:bg-emerald-600 text-slate-950 light:text-white border-[#39FF14] light:border-emerald-600 shadow-md shadow-[#39FF14]/15 light:shadow-emerald-600/20'
                    : 'bg-[#111722]/80 light:bg-white text-slate-300 light:text-slate-700 border-white/10 light:border-slate-200 hover:border-white/30 light:hover:border-slate-300'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[11px] font-mono-code ${
                    isActive
                      ? 'bg-black/20 text-slate-950 light:text-white'
                      : 'bg-white/8 light:bg-slate-100 text-slate-400 light:text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Status de Sincronizacao com o GitHub */}
        <div className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono-code bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-200 text-slate-400 light:text-slate-600">
            <FaGithub className="text-[#39FF14] light:text-emerald-700" />
            {isSyncingGithub
              ? 'Sincronizando repositórios públicos do GitHub...'
              : `${githubProjects.length} repositórios sincronizados em tempo real via GitHub`}
          </span>
        </div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
