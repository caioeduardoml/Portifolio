import React from 'react';
import { FaCode, FaMobileAlt, FaMicrochip, FaTerminal } from 'react-icons/fa';
import { FourPointStar, HandcraftedDivider, HandcraftedCorner } from '~components/HandcraftedOrnaments';

interface PillarItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
}

const PILLARS: PillarItem[] = [
  {
    id: 'web-3d',
    title: 'Engenharia Frontend & Web 3D',
    description:
      'Desenvolvimento de interfaces reativas, acessíveis e imersivas com foco em performance, tipagem estrita e gráficos interativos.',
    tags: ['React 19', 'TypeScript', 'Tailwind v4', 'Three.js'],
    icon: <FaCode />,
  },
  {
    id: 'mobile',
    title: 'Desenvolvimento Mobile',
    description:
      'Criação de aplicativos multiplataforma fluidos e responsivos em Flutter, priorizando usabilidade e arquitetura escalável.',
    tags: ['Flutter', 'Dart', 'UI/UX Mobile', 'REST APIs'],
    icon: <FaMobileAlt />,
  },
  {
    id: 'low-level',
    title: 'Sistemas & Baixo Nível',
    description:
      'Implementação de algoritmos, simuladores de escalonamento de processos e motores gráficos utilizando gerenciamento eficiente de memória.',
    tags: ['C', 'C++', 'Raylib', 'QtCreator'],
    icon: <FaMicrochip />,
  },
  {
    id: 'linux-backend',
    title: 'Linux, Backend & Automação',
    description:
      'Produtividade nativa no ecossistema Linux aliada ao desenvolvimento de serviços, scripts e ferramentas com Python e .NET.',
    tags: ['Linux', 'Python', '.NET', 'Git'],
    icon: <FaTerminal />,
  },
];

export const About: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-[var(--bg-secondary)] border-b border-[#D8D5D1] dark:border-[#333333] transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Cabecalho da Secao */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold text-[#111111] dark:text-[#FDFCFB] font-display tracking-tight"
          >
            Sobre Mim
          </h2>
          <HandcraftedDivider />
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Coluna Esquerda: Bio + Terminal */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#1A1A1A] border-[1.5px] border-[#171717] dark:border-[#FDFCFB]">
              <HandcraftedCorner className="w-4 h-4 text-[#171717] dark:text-[#FDFCFB] absolute top-3.5 left-3.5 opacity-60" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#FDFCFB] mb-4 font-display pt-1">
                Da arquitetura de baixo nível às interfaces interativas
              </h3>
              <p className="text-[#555555] dark:text-[#D8D5D1] text-base leading-relaxed mb-4">
                Atuo na área de{' '}
                <strong className="text-[#111111] dark:text-[#FDFCFB] font-semibold">
                  Engenharia da Computação
                </strong>
                , fascinado pela interseção entre design limpo, código otimizado e experiências
                visuais criativas.
              </p>
              <p className="text-[#555555] dark:text-[#D8D5D1] text-base leading-relaxed">
                Transito com naturalidade entre a agilidade de frameworks modernos voltados à
                experiência do usuário — como{' '}
                <span className="text-[#111111] dark:text-[#FDFCFB] font-medium underline decoration-[#D8D5D1] dark:decoration-[#555555] underline-offset-4">
                  ReactJS, TypeScript e Flutter
                </span>{' '}
                — e a robustez de linguagens de sistemas e backend como{' '}
                <span className="text-[#111111] dark:text-[#FDFCFB] font-medium underline decoration-[#D8D5D1] dark:decoration-[#555555] underline-offset-4">
                  C/C++, Python e .NET
                </span>
                , utilizando o ecossistema Linux como base diária de desenvolvimento.
              </p>
            </div>

            {/* Card Terminal Linux */}
            <div className="rounded-2xl overflow-hidden bg-[#FFFFFF] dark:bg-[#1A1A1A] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] font-mono-code text-xs sm:text-sm">
              <div className="flex items-center justify-between gap-2 px-4 py-3 bg-[#F5F3F0] dark:bg-[#222222] border-b-[1.5px] border-[#171717] dark:border-[#FDFCFB]">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#111111] dark:bg-[#FDFCFB]" />
                  <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#171717] dark:border-[#FDFCFB]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A5A19C]" />
                </div>
                <span className="text-[#555555] dark:text-[#D8D5D1] text-xs truncate">
                  caio@linux-workstation: ~/portfolio
                </span>
              </div>
              <div className="p-5 sm:p-6 space-y-2.5 text-[#555555] dark:text-[#D8D5D1] leading-relaxed">
                <div>
                  <span className="text-[#111111] dark:text-[#FDFCFB] font-semibold">$</span>{' '}
                  <span className="text-[#111111] dark:text-[#FDFCFB] font-medium">
                    cat perfil_engenharia.json
                  </span>
                </div>
                <pre className="text-xs sm:text-sm text-[#111111] dark:text-[#FDFCFB] overflow-x-auto whitespace-pre-wrap">
{`{
  "nome": "Caio Eduardo",
  "formacao": "Engenheiro da Computação",
  "foco": ["Web", "Mobile", "Sistemas Performáticos"],
  "ambiente": "Linux",
  "status": "Construindo soluções reais"
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Coluna Direita: 4 Pilares de Atuacao */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {PILLARS.map((pillar) => (
              <article
                key={pillar.id}
                className="group p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1A1A1A] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] transition-transform duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-[#F5F3F0] dark:bg-[#222222] border-[1.5px] border-[#171717] dark:border-[#FDFCFB] flex items-center justify-center text-lg text-[#111111] dark:text-[#FDFCFB] group-hover:bg-[#111111] group-hover:text-[#FDFCFB] dark:group-hover:bg-[#FDFCFB] dark:group-hover:text-[#111111] transition-colors duration-200">
                      {pillar.icon}
                    </div>
                    <FourPointStar className="w-3.5 h-3.5 text-[#D8D5D1] dark:text-[#555555] group-hover:text-[#111111] dark:group-hover:text-[#FDFCFB] transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] dark:text-[#FDFCFB] mb-2 font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#555555] dark:text-[#D8D5D1] leading-relaxed mb-5">
                    {pillar.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-[#D8D5D1] dark:border-[#333333]">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono-code font-medium bg-[#FDFCFB] dark:bg-[#111111] text-[#111111] dark:text-[#FDFCFB] border border-[#171717] dark:border-[#FDFCFB]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
