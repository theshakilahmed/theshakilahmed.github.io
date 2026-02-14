"use client";

import React, { useEffect, useRef } from 'react';

export const SystemVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 45;

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      label: string;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 0.8 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.2 + 0.05;
        this.label = Math.random() > 0.98 ? Math.random().toString(16).substring(2, 4).toUpperCase() : "";
      }

      update(width: number, height: number) {
        // Subtle drift
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // Wrap around
        if (this.baseX > width) this.baseX = 0;
        else if (this.baseX < 0) this.baseX = width;
        if (this.baseY > height) this.baseY = 0;
        else if (this.baseY < 0) this.baseY = height;

        // Mouse Parallax (Reduced for subtle effect)
        const dx = mouse.current.x - width / 2;
        const dy = mouse.current.y - height / 2;
        this.x = this.baseX + (dx * 0.008);
        this.y = this.baseY + (dy * 0.008);
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = `rgba(0, 102, 255, ${this.opacity})`;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();

        if (this.label) {
          context.font = "6px 'JetBrains Mono'";
          context.fillStyle = `rgba(0, 102, 255, ${this.opacity * 0.3})`;
          context.fillText(this.label, this.x + 3, this.y + 1);
        }
      }
    }

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(rect.width, rect.height));
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw connections (Reduced distance and opacity)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(0, 102, 255, ${0.05 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(particle => {
        particle.update(rect.width, rect.height);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full opacity-60"
      />
    </div>
  );
};
