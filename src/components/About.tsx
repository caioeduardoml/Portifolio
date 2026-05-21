export default function About() {
  return (
    <section id="about" className="py-20 px-[5%] min-h-screen flex flex-col justify-center bg-[#0e0e0e] data-[theme=light]:bg-white transition-colors duration-300">
      <h2 className="text-3xl font-semibold text-center mb-10 relative after:content-[''] after:block after:w-12 after:h-[3px] after:bg-[#39FF14] after:mx-auto after:mt-2.5 after:rounded-full">
        Sobre Mim
      </h2>
      <div className="max-w-[750px] mx-auto text-base md:text-lg text-gray-400 data-[theme=light]:text-gray-700 leading-relaxed text-center">
        <p>
          Sou um estudante de Engenharia de Computação fascinado pela fusão entre design limpo, código otimizado e elementos interativos criativos. Domino desde a agilidade de frameworks modernos voltados para a experiência do usuário, como ReactJS e Flutter, até a robustez e performance de linguagens de baixo nível e backend como C/C++ e Python, sempre mantendo o ecossistema Linux como meu ambiente de produtividade e desenvolvimento.
        </p>
      </div>
    </section>
  );
}