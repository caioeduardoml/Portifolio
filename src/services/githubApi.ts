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
}

const GITHUB_USERNAME = 'caioeduardoml';
const REQUIRED_TOPIC = 'portfolio';
const CONTROL_TOPICS = new Set(['portfolio', 'destaque', 'featured']);
const CACHE_KEY = 'github_repos_cache_v2';
const CACHE_TTL_MS = 5 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 6000;

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

const readRepoCache = (): GitHubRepoDTO[] | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { timestamp?: number; data?: GitHubRepoDTO[] };
    if (
      typeof parsed.timestamp === 'number' &&
      Array.isArray(parsed.data) &&
      Date.now() - parsed.timestamp < CACHE_TTL_MS
    ) {
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
    window.sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch {
    // Ignora falhas de armazenamento caso sessionStorage esteja indisponivel
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
        githubUrl,
        liveUrl,
        highlightBadge:
          repo.stargazers_count > 0 ? `GitHub • ${repo.stargazers_count}★` : 'GitHub',
      };
    });
};

export const fetchGitHubRepos = async (signal?: AbortSignal): Promise<GitHubRepoDTO[]> => {
  const cached = readRepoCache();
  if (cached) return cached;

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

    if (!response.ok) {
      throw new Error(`GitHub API retornou status ${response.status}`);
    }

    const data = (await response.json()) as unknown;
    if (!Array.isArray(data)) {
      return [];
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
    return validRepos;
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener('abort', onExternalAbort);
  }
};
