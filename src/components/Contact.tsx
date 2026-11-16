import React from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import type { SocialNetworkItem } from '~types/portfolio';

const SOCIAL_NETWORKS: SocialNetworkItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@caioeduardoml',
    description: 'Repositórios, código-fonte e contribuições open-source.',
    href: 'https://github.com/caioeduardoml',
    accentHex: '#39FF14',
    hoverBgClass: 'hover:bg-[#24292e] hover:border-[#39FF14]/60',
    icon: <FaGithub />,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Caio Eduardo',
    description: 'Trajetória profissional e conexões.',
    href: 'https://www.linkedin.com/in/caio-eduardo-a67b681a7/',
    accentHex: '#0a66c2',
    hoverBgClass: 'hover:bg-[#0077b5] hover:border-[#38bdf8]',
    icon: <FaLinkedinIn />,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: '+55 (63) 9928-6775',
    description: 'Contato rápido direto para projetos e parcerias.',
    href: 'https://wa.me/556399286775',
    accentHex: '#25d366',
    hoverBgClass: 'hover:bg-[#1da851] hover:border-[#4ade80]',
    icon: <FaWhatsapp />,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@caioeduardoml',
    description: 'Dia a dia, tecnologia e bastidores de projetos.',
    href: 'https://instagram.com/caioeduardoml',
    accentHex: '#e1306c',
    hoverBgClass: 'hover:bg-[#d62976] hover:border-[#f472b6]',
    icon: <FaInstagram />,
  },
];

export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 min-h-[75dvh] flex flex-col justify-center bg-[var(--bg-primary)] transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Cabecalho */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-xs font-mono-code uppercase tracking-widest text-[#39FF14] light:text-emerald-700 font-semibold mb-2">
            04 // Conexão &amp; Redes
          </span>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold text-white light:text-slate-900 font-display tracking-tight"
          >
            Contato
          </h2>
          <div className="w-14 h-1 bg-[#39FF14] light:bg-emerald-600 mx-auto mt-3 rounded-full" />
          <p className="text-slate-300 light:text-slate-600 text-sm sm:text-base mt-4">
            Aberto a novos desafios, projetos de desenvolvimento web/mobile e oportunidades como
            Engenheiro da Computação.
          </p>
        </div>

        {/* Showcase Isometrico 3D Responsivo para Todas as Telas */}
        <div
          aria-label="Botões 3D isométricos de redes sociais"
          className="flex flex-wrap justify-center items-center gap-x-10 sm:gap-x-14 gap-y-14 sm:gap-y-16 py-10 sm:py-14 px-4"
        >
          {SOCIAL_NETWORKS.map((net) => (
            <div key={net.id} className="relative group">
              <a
                href={net.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3.5 w-[180px] sm:w-[195px] h-[60px] sm:h-[64px] px-5 rounded-xs bg-[#182030] light:bg-slate-800 text-white border border-white/15
                  transform -rotate-24 skew-x-20 shadow-[-16px_16px_18px_rgba(0,0,0,0.45)] light:shadow-[-14px_14px_20px_rgba(15,23,42,0.22)]
                  group-hover:-translate-y-2.5 group-hover:translate-x-2.5 group-hover:shadow-[-28px_28px_32px_rgba(0,0,0,0.55)]
                  before:content-[''] before:absolute before:top-1.5 before:-left-2.5 before:h-full before:w-2.5 before:bg-[#0f1520] light:before:bg-slate-950 before:transform before:skew-y-[-45deg] group-hover:before:brightness-90
                  after:content-[''] after:absolute after:-bottom-2.5 after:-left-1.5 after:h-2.5 after:w-full after:bg-[#0f1520] light:after:bg-slate-950 after:transform after:skew-x-[-45deg] group-hover:after:brightness-90
                  transition-all duration-300 cursor-pointer ${net.hoverBgClass}`}
              >
                <span className="text-2xl text-slate-200 group-hover:text-white transition-colors">
                  {net.icon}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-wide text-white leading-tight">
                    {net.name}
                  </span>
                  <span className="text-[11px] font-mono-code text-slate-300 group-hover:text-white/90 truncate max-w-[105px] sm:max-w-[115px]">
                    {net.handle}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
