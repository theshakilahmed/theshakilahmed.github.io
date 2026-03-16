"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { appleEasing } from "@/lib/animations";

interface HeroAnimationProps {
  children: React.ReactNode;
  className?: string;
  enableMagnetic?: boolean; // Kept for backwards compatibility
}

/**
 * HeroAnimation Component
 * 
 * Implements a clean, Apple-style soft fade and slide up animation.
 * Removed complex character splitting and magnetic effects for better performance
 * and a cleaner aesthetic.
 */
export function HeroAnimation({ 
  children, 
  className = "",
}: HeroAnimationProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 1.2,
        ease: appleEasing,
      }}
    >
      {children}
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
