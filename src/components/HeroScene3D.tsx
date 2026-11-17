import React, { useEffect, useRef, useState } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Group,
  IcosahedronGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  OctahedronGeometry,
  MeshStandardMaterial,
  Mesh,
  TorusGeometry,
  MeshBasicMaterial,
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  Points,
  AmbientLight,
  PointLight,
} from 'three';
import type { HeroVisualMode } from '~types/portfolio';

interface HeroScene3DProps {
  visualMode: HeroVisualMode;
  isLight: boolean;
}

interface Point2D {
  x: number;
  y: number;
}

const checkWebGLAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

export const HeroScene3D: React.FC<HeroScene3DProps> = ({ visualMode, isLight }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const webglCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const synapseCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webGLSupported] = useState<boolean>(() => checkWebGLAvailable());
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          isVisibleRef.current = entry.isIntersecting;
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Cena 3D WebGL Monocromatica com Three.js
  useEffect(() => {
    if (!webGLSupported || visualMode === 'synapse') return;
    const canvas = webglCanvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, isMobile ? 8.2 : 6.4);

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2));

    const rootGroup = new Group();
    scene.add(rootGroup);

    // Paleta estritamente monocromatica (tinta preta sobre papel ou papel branco sobre tinta)
    const primaryColor = isLight ? 0x171717 : 0xfdfcfb;
    const secondaryColor = isLight ? 0x555555 : 0xd8d5d1;
    const particleColor = isLight ? 0x171717 : 0xa5a19c;

    // Nucleo Icosaedrico Externo em Wireframe
    const outerGeo = new IcosahedronGeometry(isMobile ? 1.65 : 2.05, 1);
    const outerEdges = new EdgesGeometry(outerGeo);
    const outerLineMat = new LineBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isLight ? 0.22 : 0.28,
    });
    const outerWireframe = new LineSegments(outerEdges, outerLineMat);
    rootGroup.add(outerWireframe);

    // Nucleo Octaedrico Interno
    const innerGeo = new OctahedronGeometry(isMobile ? 0.95 : 1.15, 0);
    const innerMat = new MeshStandardMaterial({
      color: secondaryColor,
      emissive: primaryColor,
      emissiveIntensity: 0.05,
      metalness: 0.3,
      roughness: 0.7,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.26 : 0.32,
    });
    const innerMesh = new Mesh(innerGeo, innerMat);
    rootGroup.add(innerMesh);

    // Aneis Orbitais 3D Geometricos
    const ring1Geo = new TorusGeometry(isMobile ? 2.25 : 2.75, 0.012, 12, 90);
    const ring1Mat = new MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isLight ? 0.18 : 0.22,
    });
    const ring1Mesh = new Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.set(Math.PI / 2.6, 0.3, 0);
    rootGroup.add(ring1Mesh);

    const ring2Geo = new TorusGeometry(isMobile ? 2.6 : 3.2, 0.009, 12, 90);
    const ring2Mat = new MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: isLight ? 0.15 : 0.18,
    });
    const ring2Mesh = new Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.set(-Math.PI / 3.2, -0.5, 0.4);
    rootGroup.add(ring2Mesh);

    // Campo de Particulas 3D Discretas
    const particleCount = isMobile ? 120 : 240;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 18;
      positions[i3 + 1] = (Math.random() - 0.5) * 12;
      positions[i3 + 2] = (Math.random() - 0.5) * 10 - 1.5;
    }
    const particlesGeo = new BufferGeometry();
    particlesGeo.setAttribute('position', new Float32BufferAttribute(positions, 3));
    const particlesMat = new PointsMaterial({
      color: particleColor,
      size: isMobile ? 0.042 : 0.036,
      transparent: true,
      opacity: isLight ? 0.32 : 0.38,
      sizeAttenuation: true,
    });
    const particles = new Points(particlesGeo, particlesMat);
    scene.add(particles);

    const ambientLight = new AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 1.0, 25);
    pointLight.position.set(4, 4, 5);
    scene.add(pointLight);

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollOffset = 0;

    const handlePointerMove = (e: MouseEvent): void => {
      pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleTouchMove = (e: TouchEvent): void => {
      const touch = e.touches[0];
      if (!touch) return;
      pointer.targetX = (touch.clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = -(touch.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = (): void => {
      scrollOffset = window.scrollY / Math.max(1, window.innerHeight);
    };

    const handleResize = (): void => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mobileNow = width < 768;
      camera.aspect = width / Math.max(1, height);
      camera.position.set(0, 0, mobileNow ? 8.2 : 6.4);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(mobileNow ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    let frameId = 0;
    let clockTime = 0;

    const animate = (): void => {
      frameId = requestAnimationFrame(animate);
      if (!isVisibleRef.current || document.hidden) return;

      const speedFactor = prefersReducedMotion ? 0.15 : 1;
      clockTime += 0.006 * speedFactor;

      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      outerWireframe.rotation.set(
        clockTime * 0.55 + pointer.y * 0.35 + scrollOffset * 0.8,
        clockTime * 0.75 + pointer.x * 0.45 + scrollOffset * 1.2,
        clockTime * 0.2
      );

      innerMesh.rotation.set(
        -clockTime * 0.9 - pointer.y * 0.25,
        -clockTime * 1.1 + pointer.x * 0.3,
        clockTime * 0.4
      );

      ring1Mesh.rotation.set(
        Math.PI / 2.6 + Math.sin(clockTime) * 0.22 + pointer.y * 0.2,
        0.3 + clockTime * 0.4,
        clockTime * 0.3
      );

      ring2Mesh.rotation.set(
        -Math.PI / 3.2 + Math.cos(clockTime * 0.8) * 0.2,
        -0.5 - clockTime * 0.35,
        0.4 - clockTime * 0.25
      );

      rootGroup.position.set(
        pointer.x * (isMobile ? 0.3 : 0.65),
        pointer.y * (isMobile ? 0.25 : 0.45) - scrollOffset * 1.1,
        0
      );

      particles.rotation.set(
        pointer.y * 0.08 + scrollOffset * 0.2,
        clockTime * 0.12 + pointer.x * 0.08,
        0
      );

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      outerGeo.dispose();
      outerEdges.dispose();
      outerLineMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, [webGLSupported, visualMode, isLight]);

  // Camada Interativa de Sinapses em Tinta Monocromatica
  useEffect(() => {
    if (visualMode === '3d') return;
    const canvas = synapseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const mouse: { x: number | null; y: number | null } = { x: null, y: null };
    const lastTarget: Point2D = { x: w / 2, y: h / 2 };
    const target = { x: w / 2, y: h / 2, errx: 0, erry: 0 };
    let t = 0;
    const q = 10;

    const dist = (p1x: number, p1y: number, p2x: number, p2y: number): number =>
      Math.hypot(p2x - p1x, p2y - p1y);

    class Segment {
      first: boolean;
      pos: Point2D;
      l: number;
      ang: number;
      nextPos: Point2D;

      constructor(parentPos: Point2D, l: number, a: number, first: boolean) {
        this.first = first;
        this.pos = { x: parentPos.x, y: parentPos.y };
        this.l = l;
        this.ang = a;
        this.nextPos = {
          x: this.pos.x + this.l * Math.cos(this.ang),
          y: this.pos.y + this.l * Math.sin(this.ang),
        };
      }

      update(targetPoint: Point2D): void {
        this.ang = Math.atan2(targetPoint.y - this.pos.y, targetPoint.x - this.pos.x);
        this.pos.x = targetPoint.x + this.l * Math.cos(this.ang - Math.PI);
        this.pos.y = targetPoint.y + this.l * Math.sin(this.ang - Math.PI);
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
      }

      fallback(originPoint: Point2D): void {
        this.pos.x = originPoint.x;
        this.pos.y = originPoint.y;
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
      }

      show(context: CanvasRenderingContext2D): void {
        context.lineTo(this.nextPos.x, this.nextPos.y);
      }
    }

    class Tentacle {
      x: number;
      y: number;
      l: number;
      n: number;
      rand: number;
      segments: Segment[];
      dt: number;
      angle: number;
      tPoint: Point2D;

      constructor(x: number, y: number, l: number, n: number) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.n = n;
        this.rand = Math.random();
        this.dt = 0;
        this.angle = 0;
        this.tPoint = { x, y };
        const firstSeg = new Segment({ x: this.x, y: this.y }, this.l / this.n, 0, true);
        this.segments = [firstSeg];
        for (let i = 1; i < this.n; i++) {
          const prev = this.segments[i - 1]!;
          this.segments.push(new Segment(prev.nextPos, this.l / this.n, 0, false));
        }
      }

      move(prevTarget: Point2D, currTarget: Point2D): void {
        this.angle = Math.atan2(currTarget.y - this.y, currTarget.x - this.x);
        this.dt = dist(prevTarget.x, prevTarget.y, currTarget.x, currTarget.y) + 5;
        this.tPoint = {
          x: currTarget.x - 0.8 * this.dt * Math.cos(this.angle),
          y: currTarget.y - 0.8 * this.dt * Math.sin(this.angle),
        };
        const lastSeg = this.segments[this.n - 1];
        if (lastSeg) {
          lastSeg.update(this.tPoint.x ? this.tPoint : currTarget);
        }
        for (let i = this.n - 2; i >= 0; i--) {
          const current = this.segments[i];
          const next = this.segments[i + 1];
          if (current && next) {
            current.update(next.pos);
          }
        }
        if (
          dist(this.x, this.y, currTarget.x, currTarget.y) <=
          this.l + dist(prevTarget.x, prevTarget.y, currTarget.x, currTarget.y)
        ) {
          const first = this.segments[0];
          if (first) {
            first.fallback({ x: this.x, y: this.y });
          }
          for (let i = 1; i < this.n; i++) {
            const seg = this.segments[i];
            const prev = this.segments[i - 1];
            if (seg && prev) {
              seg.fallback(prev.nextPos);
            }
          }
        }
      }

      show(context: CanvasRenderingContext2D, currTarget: Point2D): void {
        if (dist(this.x, this.y, currTarget.x, currTarget.y) <= this.l) {
          context.globalCompositeOperation = 'source-over';
          context.beginPath();
          context.moveTo(this.x, this.y);
          for (let i = 0; i < this.n; i++) {
            this.segments[i]?.show(context);
          }
          const alpha = (0.14 + this.rand * 0.24).toFixed(2);
          context.strokeStyle = isLight
            ? `rgba(17, 17, 17, ${alpha})`
            : `rgba(253, 252, 251, ${alpha})`;
          context.lineWidth = this.rand * 1.2 + 0.6;
          context.lineCap = 'round';
          context.lineJoin = 'round';
          context.stroke();
        }
      }

      showNodes(context: CanvasRenderingContext2D, currTarget: Point2D): void {
        context.beginPath();
        if (dist(this.x, this.y, currTarget.x, currTarget.y) <= this.l) {
          context.arc(this.x, this.y, 1.8 * this.rand + 1, 0, 2 * Math.PI);
          context.fillStyle = isLight ? 'rgba(17, 17, 17, 0.65)' : 'rgba(253, 252, 251, 0.72)';
        } else {
          context.arc(this.x, this.y, this.rand * 1.5, 0, 2 * Math.PI);
          context.fillStyle = isLight ? 'rgba(85, 85, 85, 0.24)' : 'rgba(165, 161, 156, 0.25)';
        }
        context.fill();
      }
    }

    const maxl = 240;
    const minl = 50;
    const numSegments = 22;
    let tentacles: Tentacle[] = [];

    const buildTentacles = (width: number, height: number): void => {
      const count = width < 640 ? 20 : width < 1024 ? 34 : 46;
      tentacles = [];
      for (let i = 0; i < count; i++) {
        tentacles.push(
          new Tentacle(
            Math.random() * width,
            Math.random() * height,
            Math.random() * (maxl - minl) + minl,
            numSegments
          )
        );
      }
    };

    buildTentacles(w, h);

    const draw = (): void => {
      if (mouse.x !== null && mouse.y !== null) {
        target.errx = mouse.x - target.x;
        target.erry = mouse.y - target.y;
      } else {
        const orbitScale = Math.min(w, h) * 0.34 - q;
        target.errx =
          w / 2 +
          (orbitScale * Math.SQRT2 * Math.cos(t)) / (Math.pow(Math.sin(t), 2) + 1) -
          target.x;
        target.erry =
          h / 2 +
          (orbitScale * Math.SQRT2 * Math.cos(t) * Math.sin(t)) /
            (Math.pow(Math.sin(t), 2) + 1) -
          target.y;
      }

      target.x += target.errx / 10;
      target.y += target.erry / 10;
      t += prefersReducedMotion ? 0.002 : 0.01;

      ctx.beginPath();
      ctx.arc(
        target.x,
        target.y,
        Math.min(8, dist(lastTarget.x, lastTarget.y, target.x, target.y) + 2),
        0,
        2 * Math.PI
      );
      ctx.fillStyle = isLight ? 'rgba(17, 17, 17, 0.45)' : 'rgba(253, 252, 251, 0.5)';
      ctx.fill();

      for (let i = 0; i < tentacles.length; i++) {
        const item = tentacles[i];
        if (item) {
          item.move(lastTarget, target);
          item.showNodes(ctx, target);
        }
      }
      for (let i = 0; i < tentacles.length; i++) {
        tentacles[i]?.show(ctx, target);
      }
      lastTarget.x = target.x;
      lastTarget.y = target.y;
    };

    let animationId = 0;
    const loop = (): void => {
      animationId = requestAnimationFrame(loop);
      if (!isVisibleRef.current || document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      draw();
    };
    loop();

    const handleMouseMove = (e: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent): void => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;
    };

    const handlePointerLeave = (): void => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = (): void => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      buildTentacles(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchend', handlePointerLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchend', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [visualMode, isLight]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Camada WebGL 3D (Three.js) */}
      {webGLSupported && visualMode !== 'synapse' && (
        <canvas
          ref={webglCanvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full z-10 opacity-85 transition-opacity duration-500"
        />
      )}

      {/* Camada Interativa de Sinapses */}
      {visualMode !== '3d' && (
        <canvas
          ref={synapseCanvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full z-10 opacity-80 transition-opacity duration-500"
        />
      )}
    </div>
  );
};

export default HeroScene3D;
