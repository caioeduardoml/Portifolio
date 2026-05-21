import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLight, setIsLight] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light';
  });

  useEffect(() => {
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  const links = [
    { href: '#home', label: 'Início' },
    { href: '#about', label: 'Sobre' },
    { href: '#skills', label: 'Habilidades' },
    { href: '#projects', label: 'Projetos' },
    { href: '#contact', label: 'Contato' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-[5%] py-4 bg-[#0a0a0a]/85 data-[theme=light]:bg-[#f4f4f6]/85 backdrop-blur-md z-[1000] border-b border-white/5 data-[theme=light]:border-black/10 transition-colors duration-300">
      <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="text-xl font-bold tracking-wide text-white data-[theme=light]:text-[#1a1a1a]">
        DEV<span className="text-[#39FF14]">.</span>
      </a>

      <div className="flex items-center gap-4">
        {/* Botão de Alternar Tema */}
        <button
          onClick={() => setIsLight(!isLight)}
          className="bg-transparent border-none text-white data-[theme=light]:text-[#1a1a1a] text-lg cursor-pointer p-2 hover:text-[#39FF14] transition-colors"
          aria-label="Alternar tema"
        >
          {isLight ? <FaSun /> : <FaMoon />}
        </button>

        {/* Botão Hamburguer */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-[5px] cursor-pointer bg-none border-none z-[1001] md:hidden"
          aria-label="Menu"
        >
          <span className={`block w-6 h-[3px] bg-white data-[theme=light]:bg-[#1a1a1a] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
          <span className={`block w-6 h-[3px] bg-white data-[theme=light]:bg-[#1a1a1a] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-[3px] bg-white data-[theme=light]:bg-[#1a1a1a] transition-all duration-300 ${isOpen ? '-rotate-45 translate-y-[-8px]' : ''}`}></span>
        </button>

        {/* Menu de Links */}
        <ul className={`flex list-none gap-5 fixed md:static top-0 ${isOpen ? 'right-0' : '-right-full'} w-[70%] md:w-auto h-screen md:h-auto bg-[#0a0a0a]/98 data-[theme=light]:bg-[#f4f4f6]/98 md:bg-transparent! md:data-[theme=light]:bg-transparent! flex-col md:flex-row justify-center md:justify-end items-center gap-9 md:gap-5 transition-all duration-400 border-l border-white/5 md:border-none z-[1000] md:z-auto`}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-gray-400 data-[theme=light]:text-gray-600 hover:text-white md:data-[theme=light]:hover:text-[#1a1a1a] text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}