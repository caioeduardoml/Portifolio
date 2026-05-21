import { useState, useEffect, useRef } from 'react';
import { FaReact, FaPython, FaTerminal, FaMobileAlt, FaMicrochip } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';

export default function Skills() {
  const [isUnfolded, setIsUnfolded] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [rotation, setRotation] = useState({ x: -15, y: 45 });
  const isDragging = useRef<boolean>(false);
  const previousPosition = useRef({ x: 0, y: 0 });
  const totalMovedDistance = useRef<number>(0);
  const autoRotateId = useRef<number>(0);

  const faces = [
    { class: 'front bg-blue-600', icon: <FaReact />, label: 'ReactJS', transform: isUnfolded ? 'rotateY(0deg) translate3d(0px, 0px, 0px)' : 'rotateY(0deg) translateZ(90px)' },
    { class: 'back bg-green-600', icon: <FaPython />, label: 'Python', transform: isUnfolded ? 'rotateY(0deg) translate3d(0px, 370px, 0px)' : 'rotateY(180deg) translateZ(90px)' },
    { class: 'right bg-orange-500', icon: <SiTypescript />, label: 'TypeScript', transform: isUnfolded ? 'rotateY(0deg) translate3d(185px, 0px, 0px)' : 'rotateY(90deg) translateZ(90px)' },
    { class: 'left bg-purple-600', icon: <FaTerminal />, label: '.NET', transform: isUnfolded ? 'rotateY(0deg) translate3d(-185px, 0px, 0px)' : 'rotateY(-90deg) translateZ(90px)' },
    { class: 'top bg-red-500', icon: <FaMobileAlt />, label: 'Flutter', transform: isUnfolded ? 'rotateX(0deg) translate3d(0px, -185px, 0px)' : 'rotateX(90deg) translateZ(90px)' },
    { class: 'bottom bg-yellow-400 text-black', icon: <FaMicrochip />, label: 'C / C++', transform: isUnfolded ? 'rotateX(0deg) translate3d(0px, 185px, 0px)' : 'rotateX(-90deg) translateZ(90px)' },
  ];

  useEffect(() => {
    const autoRotate = () => {
      if (!isDragging.current && !isUnfolded) {
        setRotation((prev) => ({ x: prev.x + 0.05, y: prev.y + 0.12 }));
      }
      autoRotateId.current = requestAnimationFrame(autoRotate);
    };
    autoRotateId.current = requestAnimationFrame(autoRotate);
    return () => cancelAnimationFrame(autoRotateId.current);
  }, [isUnfolded]);

  const startDrag = (clientX: number, clientY: number) => {
    isDragging.current = true;
    totalMovedDistance.current = 0;
    previousPosition.current = { x: clientX, y: clientY };
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    const deltaX = clientX - previousPosition.current.x;
    const deltaY = clientY - previousPosition.current.y;
    totalMovedDistance.current += Math.abs(deltaX) + Math.abs(deltaY);

    if (!isUnfolded) {
      setRotation((prev) => ({
        y: prev.y + deltaX * 0.3,
        x: prev.x - deltaY * 0.3,
      }));
    }
    previousPosition.current = { x: clientX, y: clientY };
  };

  const endDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (totalMovedDistance.current < 13) {
      setIsTransitioning(true);
      setIsUnfolded(!isUnfolded);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  return (
    <section id="skills" className="py-20 px-[5%] min-h-screen flex flex-col justify-center bg-[#0a0a0a] data-[theme=light]:bg-[#f4f4f6] perspective-[2000px] overflow-hidden transition-colors duration-300">
      <h2 className="text-3xl font-semibold text-center mb-10 relative after:content-[''] after:block after:w-12 after:h-[3px] after:bg-[#39FF14] after:mx-auto after:mt-2.5 after:rounded-full">
        Minhas Habilidades
      </h2>

      <div 
        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
        onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={(e) => e.touches.length > 0 && startDrag(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => e.touches.length > 0 && moveDrag(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={endDrag}
        className={`w-[180px] h-[180px] mx-auto cursor-grab active:cursor-grabbing touch-none transition-all duration-700 ${
          isUnfolded ? 'mt-[180px] mb-[380px] md:mt-[220px] md:mb-[420px]' : 'my-[60px]'
        }`}
      >
        <div 
          className="w-full h-full relative preserve-3d"
          style={{ 
            transform: isUnfolded ? 'rotateX(0deg) rotateY(0deg)' : `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isTransitioning ? 'transform 0.7s cubic-bezier(0.175,0.885,0.32,1.1)' : 'none'
          }}
        >
          {faces.map((face, index) => (
            <div
              key={index}
              className={`face3d absolute w-[180px] h-[180px] border-2 border-white/30 flex flex-col items-center justify-center text-sm font-bold text-white shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xs select-none pointer-events-none transition-all duration-600 cubic-bezier(0.165,0.84,0.44,1) group-hover:border-[#39FF14] ${face.class}`}
              style={{ transform: face.transform }}
            >
              <div className="text-4xl mb-3">{face.icon}</div>
              <span className="font-sans">{face.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-4 font-sans">
        {isUnfolded ? (
          <>Cubo aberto! <span className="text-[#39FF14] font-bold">Clique novamente</span> para montá-lo.</>
        ) : (
          <>Arraste para girar ou <span className="text-[#39FF14] font-bold">Dê um Clique Rápido</span> para abri-lo.</>
        )}
      </p>
    </section>
  );
}