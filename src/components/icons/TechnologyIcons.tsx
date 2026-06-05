import type { ComponentType, SVGProps } from 'react';

import {
  Bootstrap,
  ClaudeAI,
  Codex,
  CSS,
  CursorLogo,
  Docker,
  Expressjs,
  Figma,
  Flutter,
  Git,
  GitHub,
  HTML5,
  Illustrator,
  Kotlin,
  Kubernetes,
  Laravel,
  MongoDB,
  MySQL,
  n8n,
  Nextjs,
  Nodejs,
  OpenAI,
  Php,
  Photoshop,
  PostgreSQL,
  Prisma,
  ReactLogo,
  Sanity,
  Sass,
  Supabase,
  TypeScript,
  WordPress,
} from './technologies';

export type TechnologyIconName =
  | 'Bootstrap'
  | 'Claude AI'
  | 'Codex'
  | 'CSS'
  | 'Cursor'
  | 'Docker'
  | 'Express.js'
  | 'Figma'
  | 'Flutter'
  | 'Git'
  | 'GitHub'
  | 'HTML5'
  | 'Illustrator'
  | 'Kotlin'
  | 'Kubernetes'
  | 'Laravel'
  | 'MongoDB'
  | 'MySQL'
  | 'n8n'
  | 'Next.js'
  | 'Node.js'
  | 'OpenAI'
  | 'PHP'
  | 'Photoshop'
  | 'PostgreSQL'
  | 'Prisma'
  | 'React'
  | 'React Native'
  | 'Sanity'
  | 'Sass'
  | 'Supabase'
  | 'TypeScript'
  | 'WordPress';

const ICONS: Record<TechnologyIconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  Bootstrap,
  'Claude AI': ClaudeAI,
  Codex,
  CSS,
  Cursor: CursorLogo,
  Docker,
  'Express.js': Expressjs,
  Figma,
  Flutter,
  Git,
  GitHub,
  HTML5,
  Illustrator,
  Kotlin,
  Kubernetes,
  Laravel,
  MongoDB,
  MySQL,
  n8n,
  'Next.js': Nextjs,
  'Node.js': Nodejs,
  OpenAI,
  PHP: Php,
  Photoshop,
  PostgreSQL,
  Prisma,
  React: ReactLogo,
  'React Native': ReactLogo,
  Sanity,
  Sass,
  Supabase,
  TypeScript,
  WordPress,
};

export function TechnologyIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name as TechnologyIconName];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}

export function hasTechnologyIcon(name: string): name is TechnologyIconName {
  return name in ICONS;
}
