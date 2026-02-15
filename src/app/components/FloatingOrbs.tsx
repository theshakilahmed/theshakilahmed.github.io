"use client";

import { motion } from "framer-motion";

/**
 * FloatingOrbs Component
 * 
 * Creates Apple-style floating gradient orbs in the background
 * with glassmorphism and smooth orbital motion.
 */
export function FloatingOrbs() {
  const orbs = [
    {
      id: 1,
      size: 600,
      gradient: "radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 70%)",
      duration: 20,
      delay: 0,
      initialX: "10%",
      initialY: "20%",
    },
    {
      id: 2,
      size: 500,
      gradient: "radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 70%)",
      duration: 25,
      delay: 5,
      initialX: "80%",
      initialY: "60%",
    },
    {
      id: 3,
      size: 450,
      gradient: "radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%)",
      duration: 30,
      delay: 10,
      initialX: "50%",
      initialY: "80%",
    },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full will-change-transform"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.gradient,
            filter: "blur(60px)",
            left: orb.initialX,
            top: orb.initialY,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 100, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Slight vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/30" />
    </div>
  );
}
