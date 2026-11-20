import React from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { HandcraftedDivider } from '~components/HandcraftedOrnaments';
import type { SocialNetworkItem } from '~types/portfolio';

const SOCIAL_NETWORKS: SocialNetworkItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@caioeduardoml',
    description: 'Repositórios, código-fonte e contribuições open-source.',
    href: 'https://github.com/caioeduardoml',
    accentHex: '#111111',
    hoverBgClass: 'hover:bg-[#111111] hover:text-[#FDFCFB] dark:hover:bg-[#FDFCFB] dark:hover:text-[#111111]',
    icon: <FaGithub />,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Caio Eduardo',
    description: 'Trajetória profissional e conexões.',
    href: 'https://www.linkedin.com/in/caio-eduardo-a67b681a7/',
    accentHex: '#111111',
    hoverBgClass: 'hover:bg-[#111111] hover:text-[#FDFCFB] dark:hover:bg-[#FDFCFB] dark:hover:text-[#111111]',
    icon: <FaLinkedinIn />,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: '+55 (63) 99286-5775',
    description: 'Contato rápido direto para projetos e parcerias.',
    href: 'https://wa.me/5563992865775',
    accentHex: '#111111',
    hoverBgClass: 'hover:bg-[#111111] hover:text-[#FDFCFB] dark:hover:bg-[#FDFCFB] dark:hover:text-[#111111]',
    icon: <FaWhatsapp />,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@caioeduardoml',
    description: 'Dia a dia, tecnologia e bastidores de projetos.',
    href: 'https://instagram.com/caioeduardoml',
    accentHex: '#111111',
    hoverBgClass: 'hover:bg-[#111111] hover:text-[#FDFCFB] dark:hover:bg-[#FDFCFB] dark:hover:text-[#111111]',
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
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Cabecalho */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold text-[#111111] dark:text-[#FDFCFB] font-display tracking-tight"
          >
            Contato
          </h2>
          <HandcraftedDivider />
          <p className="text-[#555555] dark:text-[#D8D5D1] text-sm sm:text-base mt-4">
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
                className={`flex items-center gap-3.5 w-[180px] sm:w-[195px] h-[60px] sm:h-[64px] px-5 rounded-xs bg-[#FFFFFF] dark:bg-[#1A1A1A] text-[#111111] dark:text-[#FDFCFB] border-[1.5px] border-[#171717] dark:border-[#FDFCFB]
                  transform -rotate-24 skew-x-20
                  group-hover:-translate-y-2.5 group-hover:translate-x-2.5
                  before:content-[''] before:absolute before:top-1.5 before:-left-2.5 before:h-full before:w-2.5 before:bg-[#171717] dark:before:bg-[#D8D5D1] before:transform before:skew-y-[-45deg]
                  after:content-[''] after:absolute after:-bottom-2.5 after:-left-1.5 after:h-2.5 after:w-full after:bg-[#D8D5D1] dark:after:bg-[#555555] after:border-b after:border-[#171717] after:transform after:skew-x-[-45deg]
                  transition-all duration-300 cursor-pointer ${net.hoverBgClass}`}
              >
                <span className="text-2xl transition-colors">
                  {net.icon}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-wide font-display leading-tight">
                    {net.name}
                  </span>
                  <span className="text-[11px] font-mono-code text-[#555555] dark:text-[#D8D5D1] group-hover:text-inherit truncate max-w-[105px] sm:max-w-[115px]">
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
