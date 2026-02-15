"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { slideUpVariants } from "@/lib/animations";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * ScrollSection Component
 * 
 * Wrapper component that triggers animations when scrolled into view.
 * Uses Framer Motion's useInView hook for scroll detection.
 */
export function ScrollSection({ 
  children, 
  className = "",
  delay = 0
}: ScrollSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.3
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={slideUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.4, 0.0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerSection Component
 * 
 * Section that reveals children with stagger effect on scroll.
 */
interface StaggerSectionProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerSection({
  children,
  className = "",
  staggerDelay = 0.15,
}: StaggerSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    amount: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeInOnScroll Component
 * 
 * Simple fade in when element scrolls into view
 */
export function FadeInOnScroll({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px" 
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
