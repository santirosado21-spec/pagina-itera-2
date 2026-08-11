'use client';

import React, { useEffect, useRef } from 'react';

const FRAME_INTERVAL = 1000 / 30;

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.maxLife = 80 + Math.random() * 60;
    this.life = this.maxLife;
    this.size = 1 + Math.random() * 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 1;
    this.vx *= 0.98;
    this.vy *= 0.98;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.life <= 0) return;
    ctx.globalAlpha = this.life / this.maxLife;
    ctx.fillStyle = 'rgba(37, 99, 235, 0.85)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export interface AetherRibbonMeshProps {
  className?: string;
}

export default function AetherRibbonMesh({ className = '' }: AetherRibbonMeshProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const particles: Particle[] = [];
    const clickRipple = { x: 0, y: 0, radius: 400, maxRadius: 400, speed: 14 };
    let animationFrameId = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let lastTime = performance.now();
    let time = 0;
    let isVisible = true;
    let lastFrameTime = 0;

    const resize = () => {
      const bounds = root.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const localPoint = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };

    const handlePointerMove = (event: PointerEvent) => {
      const point = localPoint(event);
      mouse.targetX = point.x - width / 2;
      mouse.targetY = point.y - height / 2;
    };

    const handlePointerLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (reducedMotion) return;
      const point = localPoint(event);
      clickRipple.x = point.x;
      clickRipple.y = point.y;
      clickRipple.radius = 0;
      for (let index = 0; index < 30; index += 1) particles.push(new Particle(point.x, point.y));
    };

    const noise = (x: number, t: number, offset: number) =>
      (Math.sin(x * 0.0012 + t * 0.25 + offset) + Math.cos(x * 0.0028 - t * 0.4 + offset * 2)) / 2;

    const draw = (now: number) => {
      if (!reducedMotion && now - lastFrameTime < FRAME_INTERVAL) {
        if (isVisible && !document.hidden) animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = now;
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      time += dt * 0.85;

      const lerpFactor = reducedMotion ? 1 : 1 - Math.exp(-9 * dt);
      mouse.x += (mouse.targetX - mouse.x) * lerpFactor;
      mouse.y += (mouse.targetY - mouse.y) * lerpFactor;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.update();
        particle.draw(ctx);
        if (particle.life <= 0) particles.splice(index, 1);
      }

      if (clickRipple.radius < clickRipple.maxRadius) clickRipple.radius += clickRipple.speed;

      const layers = [
        { ribbonCount: 10, step: 8, offsetMod: 0, freqScale: 0.0035, ampScale: 55, speedScale: 1.1, primary: true },
        { ribbonCount: 6, step: 12, offsetMod: 1.2, freqScale: 0.0075, ampScale: 30, speedScale: 0.7, primary: false },
      ];

      layers.forEach((layer) => {
        ctx.globalCompositeOperation = layer.primary ? 'source-over' : 'multiply';
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, `rgba(37, 99, 235, ${layer.primary ? 0.15 : 0.03})`);
        gradient.addColorStop(0.5, `rgba(29, 78, 216, ${layer.primary ? 0.75 : 0.3})`);
        gradient.addColorStop(1, `rgba(109, 40, 217, ${layer.primary ? 0.15 : 0.03})`);
        ctx.strokeStyle = gradient;

        for (let ribbon = 0; ribbon < layer.ribbonCount; ribbon += 1) {
          const ribbonProgress = ribbon / layer.ribbonCount;
          const yOffset = height * 0.22 + ribbon * (height * 0.032) + layer.offsetMod * 35;
          const baseAlpha = (1 - ribbonProgress * 0.75) * 0.8;
          const rippleDistort = clickRipple.radius < clickRipple.maxRadius
            ? Math.sin((time * 2 + ribbonProgress * Math.PI) * 2) * ((clickRipple.maxRadius / Math.max(clickRipple.radius, 1)) * 2.5)
            : 0;

          ctx.beginPath();
          for (let x = 0; x <= width + layer.step; x += layer.step) {
            const edgeEnvelope = Math.sin((x / width) * Math.PI);
            const nFreq = 1 + noise(x, time, ribbonProgress) * 0.18;
            const nAmp = 1 + noise(x * 2, -time, ribbonProgress * 0.5) * 0.15;
            const wave1 = Math.sin(x * (layer.freqScale * nFreq) + time * layer.speedScale + ribbon * 0.18) * (layer.ampScale * edgeEnvelope * nAmp);
            const wave2 = Math.cos(x * 0.008 - time * 0.7 + ribbon * 0.1) * (20 * edgeEnvelope);
            const wave3 = Math.sin(x * 0.018 + time * 1.4) * (8 * edgeEnvelope);
            const cursorX = width / 2 + mouse.x;
            const distanceToMouse = Math.abs(x - cursorX);
            const mouseRadius = layer.primary ? 380 : 220;
            const mouseFactor = Math.exp(-Math.pow(distanceToMouse / mouseRadius, 2));
            const mouseDisplacement = Math.sin(x * 0.015 + time * 2.6) * (mouseFactor * (layer.primary ? 50 : 25) * edgeEnvelope);
            const rippleFactor = Math.exp(-Math.pow(Math.abs(distanceToMouse - clickRipple.radius) / (25 + Math.abs(rippleDistort)), 2));
            const y = yOffset + wave1 + wave2 + wave3 + mouseDisplacement + rippleFactor * rippleDistort * (1.8 - ribbonProgress) + mouse.y * (ribbonProgress * 0.1);

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);

            if (layer.primary && x % 48 === 0) {
              ctx.fillStyle = 'rgba(29, 78, 216, 0.25)';
              ctx.fillRect(x - 1, y - 1, 2, 2);
            }
          }

          ctx.globalAlpha = baseAlpha;
          ctx.lineWidth = (layer.primary ? 1.4 : 0.8) + (1 - ribbonProgress) * 0.5;
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      if (!reducedMotion && isVisible && !document.hidden) animationFrameId = requestAnimationFrame(draw);
    };

    const restart = () => {
      cancelAnimationFrame(animationFrameId);
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw(performance.now());
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const nextVisible = entry.isIntersecting;
      if (nextVisible && !isVisible && !reducedMotion) restart();
      isVisible = nextVisible;
      if (!isVisible) cancelAnimationFrame(animationFrameId);
    }, { rootMargin: '120px' });
    const handleVisibilityChange = () => {
      if (!document.hidden && isVisible && !reducedMotion) restart();
      else cancelAnimationFrame(animationFrameId);
    };

    resize();
    resizeObserver.observe(root);
    visibilityObserver.observe(root);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div ref={rootRef} className={`relative h-full w-full overflow-hidden bg-white ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full cursor-default" />
    </div>
  );
}
