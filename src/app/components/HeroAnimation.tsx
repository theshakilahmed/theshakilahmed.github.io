"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { characterVariants, containerVariants, durations, springs } from "@/lib/animations";

interface HeroAnimationProps {
  children: string;
  className?: string;
  enableMagnetic?: boolean;
}

/**
 * HeroAnimation Component
 * 
 * Implements Apple-style character-by-character text reveal with magnetic hover effect.
 * Each character animates independently with blur, scale, and position.
 */
export function HeroAnimation({ 
  children, 
  className = "",
  enableMagnetic = true 
}: HeroAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [characters, setCharacters] = useState<string[]>([]);
  
  // Magnetic hover effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = springs.magnetic;
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Split text into characters, preserving spaces and line breaks
    const chars = children.split("");
    setCharacters(chars);
  }, [children]);

  useEffect(() => {
    if (!enableMagnetic || !ref.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Magnetic effect radius
      const magneticRadius = 200;

      if (distance < magneticRadius) {
        // Calculate magnetic pull (stronger when closer)
        const force = (1 - distance / magneticRadius) * 0.3;
        mouseX.set(distanceX * force);
        mouseY.set(distanceY * force);
      } else {
        // Reset when mouse is far
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    ref.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ref.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enableMagnetic, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        x: enableMagnetic ? x : 0,
        y: enableMagnetic ? y : 0,
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={characterVariants}
          transition={{
            duration: durations.desktop.normal,
            delay: index * 0.03, // Stagger each character
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: char === " " ? "inline" : "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

/**
 * ParallaxText Component
 * 
 * Creates parallax scrolling effect on text elements
 */
interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxText({ 
  children, 
  speed = 0.5, 
  className = "" 
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = rect.top / window.innerHeight;
      setOffsetY(scrollProgress * 100 * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offsetY}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  );
}
