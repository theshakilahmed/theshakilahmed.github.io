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
    const particleCount = 200; // Increased from 45

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
      pulsePhase: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 1.2 + 0.3; // Slightly larger
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.3 + 0.08; // Slightly more visible
        this.label = Math.random() > 0.97 ? Math.random().toString(16).substring(2, 4).toUpperCase() : "";
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(width: number, height: number, mouseX: number, mouseY: number) {
        // Subtle drift
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // Wrap around
        if (this.baseX > width) this.baseX = 0;
        else if (this.baseX < 0) this.baseX = width;
        if (this.baseY > height) this.baseY = 0;
        else if (this.baseY < 0) this.baseY = height;

        // Mouse attraction (stronger effect)
        const dx = mouseX - this.baseX;
        const dy = mouseY - this.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.5;
          this.x = this.baseX + dx * force;
          this.y = this.baseY + dy * force;
        } else {
          // Gentle parallax when mouse is far
          const parallaxDx = mouseX - width / 2;
          const parallaxDy = mouseY - height / 2;
          this.x = this.baseX + (parallaxDx * 0.01);
          this.y = this.baseY + (parallaxDy * 0.01);
        }

        // Pulse phase
        this.pulsePhase += 0.02;
      }

      draw(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Pulse effect
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
        const currentSize = this.size * pulse;
        
        // Glow when mouse is near
        const glowStrength = distance < 150 ? (1 - distance / 150) * 0.4 : 0;
        const currentOpacity = this.opacity + glowStrength;

        // Outer glow
        if (glowStrength > 0) {
          const gradient = context.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, currentSize * 4
          );
          gradient.addColorStop(0, `rgba(0, 102, 255, ${glowStrength * 0.3})`);
          gradient.addColorStop(1, 'rgba(0, 102, 255, 0)');
          
          context.fillStyle = gradient;
          context.beginPath();
          context.arc(this.x, this.y, currentSize * 4, 0, Math.PI * 2);
          context.fill();
        }

        // Main particle with gradient
        const particleGradient = context.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, currentSize
        );
        particleGradient.addColorStop(0, `rgba(0, 102, 255, ${currentOpacity})`);
        particleGradient.addColorStop(1, `rgba(0, 102, 255, ${currentOpacity * 0.3})`);
        
        context.fillStyle = particleGradient;
        context.beginPath();
        context.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        context.fill();

        // Label
        if (this.label) {
          context.font = "6px 'JetBrains Mono'";
          context.fillStyle = `rgba(0, 102, 255, ${currentOpacity * 0.4})`;
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

      // Draw connections with dynamic opacity
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            // Distance to mouse affects connection brightness
            const mouseDist1 = Math.sqrt(
              Math.pow(mouse.current.x - particles[i].x, 2) +
              Math.pow(mouse.current.y - particles[i].y, 2)
            );
            const mouseDist2 = Math.sqrt(
              Math.pow(mouse.current.x - particles[j].x, 2) +
              Math.pow(mouse.current.y - particles[j].y, 2)
            );
            
            const avgMouseDist = (mouseDist1 + mouseDist2) / 2;
            const mouseProximity = avgMouseDist < 200 ? (1 - avgMouseDist / 200) * 0.3 : 0;
            
            const baseOpacity = 0.08 * (1 - distance / 120);
            const finalOpacity = baseOpacity + mouseProximity;
            
            ctx.strokeStyle = `rgba(0, 102, 255, ${finalOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(particle => {
        particle.update(rect.width, rect.height, mouse.current.x, mouse.current.y);
        particle.draw(ctx, mouse.current.x, mouse.current.y);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      };
    };

    window.addEventListener('resize', init);
    canvas.addEventListener('mousemove', handleMouseMove);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full opacity-70"
      />
    </div>
  );
};
