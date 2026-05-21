import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  const networks = [
    { name: 'GitHub', icon: <FaGithub />, href: 'https://github.com/caioeduardoml', color: 'hover:bg-[#333]' },
    { name: 'Instagram', icon: <FaInstagram />, href: 'https://instagram.com/caioeduardoml', color: 'hover:bg-[#e1306c]' },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/caio-eduardo-a67b681a7/', color: 'hover:bg-[#0077b5]' },
    { name: 'WhatsApp', icon: <FaWhatsapp />, href: 'https://wa.me/556399286775', color: 'hover:bg-[#25d366]' },
  ];

  return (
    <section id="contact" className="py-20 px-[5%] min-h-screen flex flex-col justify-center items-center bg-[#0a0a0a] data-[theme=light]:bg-[#f4f4f6] transition-colors duration-300">
      <h2 className="text-3xl font-semibold text-center mb-10 relative after:content-[''] after:block after:w-12 after:h-[3px] after:bg-[#39FF14] after:mx-auto after:mt-2.5 after:rounded-full">
        Contato
      </h2>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-12 mt-8 p-5 w-full">
        {networks.map((net) => (
          <div key={net.name} className="relative group">
            <a
              href={net.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-[170px] h-[60px] bg-[#222] text-left pl-[18px] relative rounded-xs
                transform -rotate-30 skew-x-[25deg] shadow-[-15px_15px_10px_rgba(0,0,0,0.5)] 
                group-hover:-translate-y-2 group-hover:translate-x-3 group-hover:shadow-[-30px_30px_35px_rgba(0,0,0,0.6)]
                before:content-[''] before:absolute before:top-1.5 before:-left-2.5 before:h-full before:w-2.5 before:bg-[#181818] before:transform before:skew-y-[-45deg] group-hover:before:bg-inherit
                after:content-[''] after:absolute after:-bottom-2.5 after:-left-1.5 after:h-2.5 after:w-full after:bg-[#181818] after:transform after:skew-x-[-45deg] group-hover:after:bg-inherit
                transition-all duration-500 font-sans ${net.color}`}
            >
              <span className="text-2xl text-gray-400 line-height-[60px] inline-block pt-4 transition-colors group-hover:text-white">
                {net.icon}
              </span>
              <span className="absolute top-[18px] ml-3 text-gray-400 font-semibold tracking-wide text-sm transition-colors group-hover:text-white">
                {net.name}
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}