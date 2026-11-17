import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  FaLaptopCode,
  FaGamepad,
  FaMicrochip,
  FaGithub,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { FourPointStar, HandcraftedDivider } from '~components/HandcraftedOrnaments';
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
  const [imageFailed, setImageFailed] = useState<boolean>(false);

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
      className="group rounded-2xl overflow-hidden bg-[#FFFFFF] dark:bg-[#1A1A1A] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] flex flex-col h-full transition-transform duration-300 ease-out"
    >
      {/* Thumbnail ou Representacao Grafica */}
      <div className="relative aspect-[2/1] w-full overflow-hidden bg-[#F5F3F0] dark:bg-[#222222] border-b-[1.5px] border-[#171717] dark:border-[#FDFCFB]">
        {project.imageUrl && !imageFailed ? (
          <img
            src={project.imageUrl}
            alt={`Pré-visualização do projeto ${project.title}`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#F5F3F0] dark:bg-[#222222] flex flex-col items-center justify-center p-6 relative">
            <FourPointStar className="w-3.5 h-3.5 text-[#A5A19C] absolute top-4 right-4" />
            <FourPointStar className="w-3 h-3 text-[#A5A19C] absolute bottom-4 left-4" />
            <div className="w-16 h-16 rounded-full bg-[#FFFFFF] dark:bg-[#111111] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] flex items-center justify-center text-3xl text-[#111111] dark:text-[#FDFCFB] group-hover:bg-[#111111] group-hover:text-[#FDFCFB] dark:group-hover:bg-[#FDFCFB] dark:group-hover:text-[#111111] transition-colors duration-200">
              {project.icon}
            </div>
            <span className="mt-3 text-xs font-mono-code text-[#555555] dark:text-[#D8D5D1]">
              {project.subtitle}
            </span>
          </div>
        )}

        {project.highlightBadge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-mono-code font-semibold bg-[#FFFFFF] dark:bg-[#111111] text-[#111111] dark:text-[#FDFCFB] border border-[#171717] dark:border-[#FDFCFB]">
            {project.highlightBadge}
          </span>
        )}
      </div>

      {/* Corpo do Card */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <span className="block text-xs font-mono-code text-[#555555] dark:text-[#A5A19C] mb-1">
            {project.subtitle}
          </span>
          <h3 className="text-xl font-bold text-[#111111] dark:text-[#FDFCFB] font-display mb-2.5">
            {project.title}
          </h3>
          <p className="text-sm text-[#555555] dark:text-[#D8D5D1] leading-relaxed mb-5">
            {project.desc}
          </p>

          {/* Lista de Tecnologias */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono-code font-medium px-3 py-1 rounded-full bg-[#FDFCFB] dark:bg-[#111111] border border-[#171717] dark:border-[#FDFCFB] text-[#111111] dark:text-[#FDFCFB]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Botoes de Acao com Alvo de Toque >= 44px */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#D8D5D1] dark:border-[#333333] mt-auto">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 bg-[#FFFFFF] dark:bg-[#1A1A1A] text-[#111111] dark:text-[#FDFCFB] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] hover:bg-[#111111] hover:text-[#FDFCFB] dark:hover:bg-[#FDFCFB] dark:hover:text-[#111111] transition-colors duration-200 cursor-pointer"
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
              className="flex-1 min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 bg-[#111111] dark:bg-[#FDFCFB] text-[#FDFCFB] dark:text-[#111111] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] hover:bg-[#FFFFFF] hover:text-[#111111] dark:hover:bg-[#111111] dark:hover:text-[#FDFCFB] transition-colors duration-200 cursor-pointer"
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
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-[var(--bg-secondary)] border-b border-[#D8D5D1] dark:border-[#333333] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Cabecalho */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-[#555555] dark:text-[#D8D5D1] font-medium mb-2">
            <FourPointStar className="w-3 h-3 text-[#111111] dark:text-[#FDFCFB]" />
            <span>03 // Portfólio Selecionado</span>
            <FourPointStar className="w-3 h-3 text-[#111111] dark:text-[#FDFCFB]" />
          </span>
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl font-bold text-[#111111] dark:text-[#FDFCFB] font-display tracking-tight"
          >
            Projetos em Destaque
          </h2>
          <HandcraftedDivider />
          <p className="text-[#555555] dark:text-[#D8D5D1] text-sm sm:text-base mt-4">
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
                className={`min-h-[44px] px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-2 border-[1.5px] transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#111111] dark:bg-[#FDFCFB] text-[#FDFCFB] dark:text-[#111111] border-[#171717] dark:border-[#FDFCFB]'
                    : 'bg-[#FFFFFF] dark:bg-[#1A1A1A] text-[#111111] dark:text-[#FDFCFB] border-[#171717] dark:border-[#FDFCFB] hover:bg-[#111111] hover:text-[#FDFCFB] dark:hover:bg-[#FDFCFB] dark:hover:text-[#111111]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-mono-code border ${
                    isActive
                      ? 'bg-[#FDFCFB] dark:bg-[#111111] text-[#111111] dark:text-[#FDFCFB] border-transparent'
                      : 'bg-[#F5F3F0] dark:bg-[#222222] text-[#555555] dark:text-[#D8D5D1] border-[#D8D5D1] dark:border-[#333333]'
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-code bg-[#FFFFFF] dark:bg-[#1A1A1A] border border-[#171717] dark:border-[#FDFCFB] text-[#555555] dark:text-[#D8D5D1]">
            <FaGithub className="text-[#111111] dark:text-[#FDFCFB]" />
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
