import type { ReactNode } from 'react';

export type ThemeMode = 'dark' | 'light';

export type HeroVisualMode = 'hybrid' | '3d' | 'synapse';

export interface NavItem {
  href: string;
  label: string;
  sectionId: string;
}

export type ProjectCategory = 'todos' | 'destaques' | 'web' | 'sistemas';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  categories: ProjectCategory[];
  icon: ReactNode;
  techs: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  highlightBadge?: string;
}

export interface CubeFaceSkill {
  id: string;
  label: string;
  category: string;
  summary: string;
  details: string[];
  colorClass: string;
  borderGlow: string;
  icon: ReactNode;
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  items: {
    name: string;
    level: string;
    tag: string;
  }[];
}

export interface SocialNetworkItem {
  id: string;
  name: string;
  handle: string;
  description: string;
  href: string;
  accentHex: string;
  hoverBgClass: string;
  icon: ReactNode;
}
