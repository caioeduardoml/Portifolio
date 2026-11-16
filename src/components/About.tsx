import React from 'react';
import { FaCode, FaMobileAlt, FaMicrochip, FaTerminal } from 'react-icons/fa';

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
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-[var(--bg-secondary)] transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Cabecalho da Secao */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="inline-block text-xs font-mono-code uppercase tracking-widest text-[#39FF14] light:text-emerald-700 font-semibold mb-2">
            01 // Trajetória &amp; Filosofia
          </span>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold text-white light:text-slate-900 font-display tracking-tight"
          >
            Sobre Mim
          </h2>
          <div className="w-14 h-1 bg-[#39FF14] light:bg-emerald-600 mx-auto mt-3 rounded-full" />
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Coluna Esquerda: Bio + Terminal */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111722]/90 light:bg-white border border-white/8 light:border-slate-200 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900 mb-4 font-display">
                Da arquitetura de baixo nível às interfaces interativas
              </h3>
              <p className="text-slate-300 light:text-slate-600 text-base leading-relaxed mb-4">
                Atuo na área de{' '}
                <strong className="text-white light:text-slate-900 font-semibold">
                  Engenharia da Computação
                </strong>
                , fascinado pela interseção entre design limpo, código otimizado e experiências
                visuais criativas.
              </p>
              <p className="text-slate-300 light:text-slate-600 text-base leading-relaxed">
                Transito com naturalidade entre a agilidade de frameworks modernos voltados à
                experiência do usuário — como{' '}
                <span className="text-[#39FF14] light:text-emerald-700 font-medium">
                  ReactJS, TypeScript e Flutter
                </span>{' '}
                — e a robustez de linguagens de sistemas e backend como{' '}
                <span className="text-[#39FF14] light:text-emerald-700 font-medium">
                  C/C++, Python e .NET
                </span>
                , utilizando o ecossistema Linux como base diária de desenvolvimento.
              </p>
            </div>

            {/* Card Terminal Linux */}
            <div className="rounded-2xl overflow-hidden bg-[#090d14] border border-white/10 light:border-slate-300 shadow-lg font-mono-code text-xs sm:text-sm">
              <div className="flex items-center justify-between gap-2 px-4 py-3 bg-[#111826] border-b border-white/8">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-slate-400 text-xs truncate">caio@linux-workstation: ~/portfolio</span>
              </div>
              <div className="p-5 sm:p-6 space-y-2.5 text-slate-300 leading-relaxed">
                <div>
                  <span className="text-[#39FF14]">$</span>{' '}
                  <span className="text-white">cat perfil_engenharia.json</span>
                </div>
                <pre className="text-xs sm:text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap">
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
                className="group p-6 rounded-2xl bg-[#111722]/85 light:bg-white border border-white/8 light:border-slate-200 hover:border-[#39FF14]/45 light:hover:border-emerald-600/50 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#39FF14]/12 light:bg-emerald-600/12 border border-[#39FF14]/30 light:border-emerald-600/30 flex items-center justify-center text-xl text-[#39FF14] light:text-emerald-700 mb-4 group-hover:scale-105 transition-transform duration-200">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white light:text-slate-900 mb-2 font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-300 light:text-slate-600 leading-relaxed mb-5">
                    {pillar.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/6 light:border-slate-100">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono-code font-medium bg-white/5 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-white/8 light:border-slate-200"
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
