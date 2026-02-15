"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { springs } from "@/lib/animations";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  magneticRadius?: number;
  magneticStrength?: number;
}

/**
 * MagneticButton Component
 * 
 * Button with magnetic hover effect that distorts toward the cursor.
 * Includes ripple effect on click.
 */
export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  magneticRadius = 80,
  magneticStrength = 0.4,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < magneticRadius) {
        const force = (1 - distance / magneticRadius) * magneticStrength;
        setPosition({
          x: distanceX * force,
          y: distanceY * force,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [magneticRadius, magneticStrength]);

  const handleClick = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 600);
    }
    
    onClick?.();
  };

  const Component = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      className="relative inline-block"
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={springs.magnetic}
    >
      <Component
        href={href}
        onClick={handleClick}
        className={`relative overflow-hidden ${className}`}
      >
        {children}
        
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-current pointer-events-none"
            initial={{
              opacity: 0.3,
              scale: 0,
              x: ripple.x,
              y: ripple.y,
            }}
            animate={{
              opacity: 0,
              scale: 2,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            style={{
              width: "100px",
              height: "100px",
              marginLeft: "-50px",
              marginTop: "-50px",
            }}
          />
        ))}
      </Component>
    </motion.div>
  );
}
