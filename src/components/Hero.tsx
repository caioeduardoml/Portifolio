import { useEffect, useRef } from 'react';
import DecryptedText from './DecryptedText';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: false as number | false, y: false as number | false };
    let last_target = { x: w / 2, y: h / 2 };
    let target = { x: w / 2, y: h / 2, errx: 0, erry: 0 };
    let t = 0;
    let q = 10;

    const isMobileOrTablet = () => window.innerWidth <= 1024;
    const dist = (p1x: number, p1y: number, p2x: number, p2y: number) =>
      Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));

    class Segment {
      first: boolean; pos: { x: number; y: number }; l: number; ang: number; nextPos: { x: number; y: number };
      constructor(parent: any, l: number, a: number, first: boolean) {
        this.first = first;
        this.pos = first ? { x: parent.x, y: parent.y } : { x: parent.nextPos.x, y: parent.nextPos.y };
        this.l = l;
        this.ang = a;
        this.nextPos = { x: this.pos.x + this.l * Math.cos(this.ang), y: this.pos.y + this.l * Math.sin(this.ang) };
      }
      update(t: { x: number; y: number }) {
        this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
        this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
        this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
      }
      fallback(t: { x: number; y: number }) {
        this.pos.x = t.x; this.pos.y = t.y;
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
      }
      show() { ctx!.lineTo(this.nextPos.x, this.nextPos.y); }
    }

    class Tentacle {
      x: number; y: number; l: number; n: number; rand: number; segments: Segment[]; dt: number = 0; angle: number = 0; t: any = {};
      constructor(x: number, y: number, l: number, n: number) {
        this.x = x; this.y = y; this.l = l; this.n = n; this.rand = Math.random();
        this.segments = [new Segment(this, this.l / this.n, 0, true)];
        for (let i = 1; i < this.n; i++) this.segments.push(new Segment(this.segments[i - 1], this.l / this.n, 0, false));
      }
      move(last_target: { x: number; y: number }, target: { x: number; y: number }) {
        this.angle = Math.atan2(target.y - this.y, target.x - this.x);
        this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
        this.t = { x: target.x - 0.8 * this.dt * Math.cos(this.angle), y: target.y - 0.8 * this.dt * Math.sin(this.angle) };
        if (this.t.x) this.segments[this.n - 1].update(this.t); else this.segments[this.n - 1].update(target);
        for (let i = this.n - 2; i >= 0; i--) this.segments[i].update(this.segments[i + 1].pos);
        if (dist(this.x, this.y, target.x, target.y) <= this.l + dist(last_target.x, last_target.y, target.x, target.y)) {
          this.segments[0].fallback({ x: this.x, y: this.y });
          for (let i = 1; i < this.n; i++) this.segments[i].fallback(this.segments[i - 1].nextPos);
        }
      }
      show(target: { x: number; y: number }) {
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
          ctx!.globalCompositeOperation = 'lighter'; ctx!.beginPath(); ctx!.moveTo(this.x, this.y);
          for (let i = 0; i < this.n; i++) this.segments[i].show();
          ctx!.strokeStyle = 'hsl(120, 100%, ' + (this.rand * 30 + 45) + '%)'; ctx!.lineWidth = this.rand * 2 + 1;
          ctx!.lineCap = 'round'; ctx!.lineJoin = 'round'; ctx!.shadowBlur = 8; ctx!.shadowColor = '#39FF14';
          ctx!.stroke(); ctx!.shadowBlur = 0; ctx!.globalCompositeOperation = 'source-over';
        }
      }
      show2(target: { x: number; y: number }) {
        ctx!.beginPath();
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
          ctx!.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI); ctx!.fillStyle = 'white';
        } else {
          ctx!.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI); ctx!.fillStyle = 'rgba(255, 255, 255, 0.4)';
        }
        ctx!.fill();
      }
    }

    let maxl = 300, minl = 50, numSegments = 30, numt = window.innerWidth < 768 ? 35 : 65, tent: Tentacle[] = [];
    for (let i = 0; i < numt; i++) tent.push(new Tentacle(Math.random() * w, Math.random() * h, Math.random() * (maxl - minl) + minl, numSegments));

    function draw() {
      if (mouse.x !== false && mouse.y !== false) {
        target.errx = (mouse.x as number) - target.x; target.erry = (mouse.y as number) - target.y;
      } else {
        target.errx = w / 2 + ((h / 2 - q) * Math.sqrt(2) * Math.cos(t)) / (Math.pow(Math.sin(t), 2) + 1) - target.x;
        target.erry = h / 2 + ((h / 2 - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) / (Math.pow(Math.sin(t), 2) + 1) - target.y;
      }
      target.x += target.errx / 10; target.y += target.erry / 10; t += 0.01;
      ctx!.beginPath(); ctx!.arc(target.x, target.y, dist(last_target.x, last_target.y, target.x, target.y) + 2, 0, 2 * Math.PI);
      ctx!.fillStyle = 'hsl(120, 100%, 35%)'; ctx!.fill();
      for (let i = 0; i < numt; i++) { tent[i].move(last_target, target); tent[i].show2(target); }
      for (let i = 0; i < numt; i++) tent[i].show(target);
      last_target.x = target.x; last_target.y = target.y;
    }

    let animationId: number;
    const monsterLoop = () => { ctx.clearRect(0, 0, w, h); draw(); animationId = requestAnimationFrame(monsterLoop); };
    monsterLoop();

    const handleMouseMove = (e: MouseEvent) => { 
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; 
      mouse.y = e.clientY - rect.top; 
    };
    const handleMouseLeave = () => { mouse.x = false; mouse.y = false; };
    const handleResize = () => {
      w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight;
      tent = [];
      for (let i = 0; i < numt; i++) tent.push(new Tentacle(Math.random() * w, Math.random() * h, Math.random() * (maxl - minl) + minl, numSegments));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const tags = ['Desenvolvedor web/mobile', 'Reactjs', 'TypeScript', 'Flutter', 'C/C++', 'Python', '.NET', 'Linux'];

  return (
    <section id="home" className="p-0 h-screen overflow-hidden flex items-center justify-center bg-[#0a0a0a] relative">
      <canvas ref={canvasRef} id="monsterCanvas" className="absolute top-0 left-0 w-full h-full z-10 opacity-100 dark:opacity-100 transition-opacity duration-300 pointer-events-none lg:pointer-events-auto" />
      <div className="relative z-20 text-center pointer-events-none max-w-[800px] px-5">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight text-[#ffffff] data-[theme=light]:text-[#1a1a1a]">
          <DecryptedText
            text="Olá, Eu sou Caio Eduardo"
            speed={150}
            maxIterations={30}
            characters="ABCD1234!?"
            className="revealed"
            parentClassName="all-letters"
            encryptedClassName="encrypted"
            animateOn="view"
            />
        </h1>
        <p className="text-base md:text-lg text-gray-300 data-[theme=light]:text-gray-700 leading-relaxed mb-8">
          Construindo experiências digitais modernas, eficientes e interativas através de aplicações web, mobile e sistemas performáticos.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <div key={tag} className="bg-white/8 border border-white/10 px-[14px] py-1.5 rounded-full text-xs font-medium text-[#39FF14] dark:text-[#39FF14] data-[theme=light]:text-black">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}