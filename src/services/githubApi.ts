import { createElement } from 'react';
import type { ReactNode } from 'react';
import { FaGithub, FaLaptopCode, FaMicrochip, FaMobileAlt, FaTerminal } from 'react-icons/fa';
import type { ProjectCategory, ProjectItem } from '~types/portfolio';

export interface GitHubRepoDTO {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  updated_at: string;
  default_branch?: string;
}

export type GitHubSyncStatus = 'live' | 'cache' | 'rate-limited' | 'error';

export interface GitHubFetchResult {
  repos: GitHubRepoDTO[];
  status: GitHubSyncStatus;
}

const GITHUB_USERNAME = 'caioeduardoml';
const REQUIRED_TOPIC = 'portfolio';
const CONTROL_TOPICS = new Set(['portfolio', 'destaque', 'featured']);
const CACHE_KEY = 'github_repos_cache_v4';
const CACHE_TTL_MS = 15 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 6000;

// Fallback usado apenas se a API atingir o limite de requisicoes e nao houver cache local
const FALLBACK_REPOS: GitHubRepoDTO[] = [
  {
    id: 1,
    name: 'Gerador-QR-Code',
    description:
      'Gerador de QR Code moderno, rápido e seguro, construído com React, TypeScript, Vite e Tailwind CSS. Permite criar, personalizar e exportar QR Codes em alta definição com validação de contraste em tempo real.',
    html_url: 'https://github.com/caioeduardoml/Gerador-QR-Code',
    homepage: 'https://geradorqr-code.netlify.app',
    language: 'TypeScript',
    topics: ['portfolio', 'destaque'],
    fork: false,
    archived: false,
    stargazers_count: 0,
    updated_at: '2026-11-17T00:00:00Z',
    default_branch: 'main',
  },
];

const sanitizeHttpsUrl = (rawUrl: string | null | undefined): string | undefined => {
  if (!rawUrl || typeof rawUrl !== 'string') return undefined;
  const trimmed = rawUrl.trim();
  if (!trimmed) return undefined;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' ? parsed.toString() : undefined;
  } catch {
    return undefined;
  }
};

const formatRepoTitle = (name: string): string =>
  name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();

const inferCategories = (repo: GitHubRepoDTO): ProjectCategory[] => {
  const lang = (repo.language ?? '').toLowerCase();
  const topics = (repo.topics ?? []).map((t) => t.toLowerCase());
  const categories: ProjectCategory[] = ['todos'];

  const isWeb =
    ['typescript', 'javascript', 'html', 'css', 'dart'].includes(lang) ||
    topics.some((t) => ['react', 'web', 'frontend', 'tailwind', 'flutter', 'nextjs'].includes(t));

  const isSystems =
    ['c', 'c++', 'python', 'c#', 'shell', 'rust'].includes(lang) ||
    topics.some((t) => ['c', 'cpp', 'systems', 'linux', 'raylib', 'qt'].includes(t));

  if (isWeb) categories.push('web');
  if (isSystems) categories.push('sistemas');
  if (
    repo.stargazers_count > 0 ||
    topics.includes('destaque') ||
    topics.includes('featured')
  ) {
    categories.push('destaques');
  }

  return categories;
};

const pickRepoIcon = (language: string | null): ReactNode => {
  const lang = (language ?? '').toLowerCase();
  if (['c', 'c++', 'rust'].includes(lang)) return createElement(FaMicrochip);
  if (['dart'].includes(lang)) return createElement(FaMobileAlt);
  if (['python', 'c#', 'shell'].includes(lang)) return createElement(FaTerminal);
  if (['typescript', 'javascript', 'html', 'css'].includes(lang)) return createElement(FaLaptopCode);
  return createElement(FaGithub);
};

interface StoredRepoCache {
  timestamp: number;
  data: GitHubRepoDTO[];
}

const readRepoCache = (allowStale = false): GitHubRepoDTO[] | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredRepoCache>;
    if (typeof parsed.timestamp !== 'number' || !Array.isArray(parsed.data)) {
      return null;
    }
    if (allowStale || Date.now() - parsed.timestamp < CACHE_TTL_MS) {
      return parsed.data;
    }
    return null;
  } catch {
    return null;
  }
};

const writeRepoCache = (data: GitHubRepoDTO[]): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch {
    // Ignora falhas de armazenamento caso localStorage esteja indisponivel
  }
};

export const mapGitHubReposToProjects = (
  repos: GitHubRepoDTO[],
  existingGithubUrls: Set<string>
): ProjectItem[] => {
  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .filter((repo) =>
      (repo.topics ?? []).some((topic) => topic.toLowerCase() === REQUIRED_TOPIC)
    )
    .filter((repo) => {
      const normalized = repo.html_url.replace(/\/+$/, '').toLowerCase();
      return !existingGithubUrls.has(normalized);
    })
    .map((repo) => {
      const githubUrl = sanitizeHttpsUrl(repo.html_url);
      const liveUrl = sanitizeHttpsUrl(repo.homepage);
      const defaultBranch = repo.default_branch?.trim() || 'main';
      const imageUrl = sanitizeHttpsUrl(
        `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${encodeURIComponent(
          repo.name
        )}/${encodeURIComponent(defaultBranch)}/preview.png`
      );
      const displayTopics = (repo.topics ?? [])
        .filter((topic) => !CONTROL_TOPICS.has(topic.toLowerCase()))
        .slice(0, 3);
      const techs = [
        ...(repo.language ? [repo.language] : []),
        ...displayTopics,
      ];

      return {
        id: `gh-${repo.id}`,
        title: formatRepoTitle(repo.name),
        subtitle: repo.language ? `Repositório GitHub • ${repo.language}` : 'Repositório GitHub',
        desc:
          repo.description?.trim() ||
          'Projeto público hospedado no GitHub. Acesse o repositório para ver o código-fonte e a documentação.',
        categories: inferCategories(repo),
        icon: pickRepoIcon(repo.language),
        techs: techs.length > 0 ? techs : ['GitHub'],
        imageUrl,
        githubUrl,
        liveUrl,
        highlightBadge:
          repo.stargazers_count > 0 ? `GitHub • ${repo.stargazers_count}★` : 'GitHub',
      };
    });
};

export const fetchGitHubRepos = async (signal?: AbortSignal): Promise<GitHubFetchResult> => {
  const freshCache = readRepoCache(false);
  if (freshCache) {
    return { repos: freshCache, status: 'cache' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const onExternalAbort = (): void => controller.abort();
  signal?.addEventListener('abort', onExternalAbort, { once: true });

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        signal: controller.signal,
      }
    );

    if (response.status === 403 || response.status === 429) {
      const staleCache = readRepoCache(true);
      return {
        repos: staleCache ?? FALLBACK_REPOS,
        status: 'rate-limited',
      };
    }

    if (!response.ok) {
      throw new Error(`GitHub API retornou status ${response.status}`);
    }

    const data = (await response.json()) as unknown;
    if (!Array.isArray(data)) {
      return { repos: [], status: 'live' };
    }

    const validRepos = data.filter(
      (item): item is GitHubRepoDTO =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as GitHubRepoDTO).id === 'number' &&
        typeof (item as GitHubRepoDTO).name === 'string' &&
        typeof (item as GitHubRepoDTO).html_url === 'string'
    );

    writeRepoCache(validRepos);
    return { repos: validRepos, status: 'live' };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError' && signal?.aborted) {
      throw error;
    }
    const staleCache = readRepoCache(true);
    return {
      repos: staleCache ?? FALLBACK_REPOS,
      status: staleCache ? 'cache' : 'error',
    };
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener('abort', onExternalAbort);
  }
};
