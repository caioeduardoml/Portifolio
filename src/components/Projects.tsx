import { useState } from 'react';
import { FaLaptopCode, FaMobileAlt, FaChartLine, FaTerminal, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  title: string;
  desc: string;
  category: 'destaques' | 'todos';
  icon: React.ReactNode;
  techs?: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'destaques' | 'todos'>('destaques');

  const projectsData: Project[] = [
    { title: "Landing Page - RoboAp UTFPR ", desc: "Site institucional para a equipe de Robótica da UTFPR, com o objetivo de apresentar a equipe e seus projetos para a comunidade.", category: "destaques", icon: <FaLaptopCode />, techs: ['React', 'TypeScript', 'Tailwind'], imageUrl:"/roboaputfpr.png", githubUrl: "https://github.com/caioeduardoml", liveUrl: "https://roboaputfpr.netlify.app" },
    { title: "Gerador de QR-Code", desc: "Sistema que gera um QR-Code personalizado para empresas e marcas.", category: "destaques", icon: <FaMobileAlt />, techs: ['React', 'TypeScript', 'API'], imageUrl:"/qrcode.png", githubUrl: "https://github.com/caioeduardoml/Gerador-QR-Code", liveUrl: "https://geradorqr-code.netlify.app" },
    { title: "Projeto Pokedex", desc: "Jogo em C utilizando raylib, com intuito de simular o jogo Pokemon.", category: "destaques", icon: <FaChartLine />, techs: ['C', 'Raylib'], githubUrl: "https://github.com/caioeduardoml/ProjetoPokedexUTFPR" },
    { title: "Simulador Processos Sistema Operacional", desc: "Simula os processos do Sistema Operacional, com diagrama de tempo em round robin, SJF Premptivo e SJF Prioridade.", category: "todos", icon: <FaTerminal />, techs: ['C', 'C++', 'QtCreator'], githubUrl: "https://github.com/Gu1-Fr4nc0/-Simulador_de_Sistemas_Operacionais" },
  ];

  const filteredProjects = projectsData.filter(p => activeTab === 'todos' ? true : p.category === activeTab);

  return (
    <section id="projects" className="py-20 px-[5%] min-h-screen flex flex-col justify-center bg-[#0e0e0e] data-[theme=light]:bg-white transition-colors duration-300">
      <h2 className="text-3xl font-semibold text-center mb-10 relative after:content-[''] after:block after:w-12 after:h-[3px] after:bg-[#39FF14] after:mx-auto after:mt-2.5 after:rounded-full">
        Projetos
      </h2>

      <div className="flex justify-center gap-3 mb-10">
        <button onClick={() => setActiveTab('destaques')} className={`px-5 py-2 text-sm rounded-full border cursor-pointer transition-all ${activeTab === 'destaques' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/10 hover:border-white'}`}>Destaques</button>
        <button onClick={() => setActiveTab('todos')} className={`px-5 py-2 text-sm rounded-full border cursor-pointer transition-all ${activeTab === 'todos' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/10 hover:border-white'}`}>Todos</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto w-full">
        {filteredProjects.map((p, idx) => (
          <div key={idx} className="bg-[#161616] data-[theme=light]:bg-[#e9e9ee] rounded-xl overflow-hidden border border-white/5 data-[theme=light]:border-black/5 flex flex-col h-full min-h-[350px] hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/5 group transition-all duration-300">
            {p.imageUrl ? (
              <div className="h-[150px] w-full overflow-hidden bg-black/20">
                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            ) : (
              <div className="h-[150px] bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] data-[theme=light]:from-gray-300 data-[theme=light]:to-gray-400 flex items-center justify-center text-5xl text-white/15 group-hover:text-[#39FF14]/40 transition-colors duration-300">
                {p.icon}
              </div>
            )}
            <div className="p-[18px] flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white data-[theme=light]:text-[#1a1a1a]">{p.title}</h3>
                <p className="text-sm text-gray-400 data-[theme=light]:text-gray-600 leading-relaxed mb-3">{p.desc}</p>
                {p.techs && p.techs.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.techs.map((tech, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300 data-[theme=light]:bg-black/5 data-[theme=light]:border-black/10 data-[theme=light]:text-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-auto">
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white data-[theme=light]:text-[#1a1a1a] hover:text-[#39FF14] data-[theme=light]:hover:text-[#39FF14] text-xs font-medium flex items-center gap-1.5 transition-colors"><FaGithub /> GitHub</a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white data-[theme=light]:text-[#1a1a1a] hover:text-[#39FF14] data-[theme=light]:hover:text-[#39FF14] text-xs font-medium flex items-center gap-1.5 transition-colors"><FaExternalLinkAlt /> Visitar</a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}