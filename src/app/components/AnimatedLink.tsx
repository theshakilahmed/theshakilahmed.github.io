"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { springs } from "@/lib/animations";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

/**
 * AnimatedLink Component
 * 
 * Link with sophisticated hover animations including underline draw,
 * text shift, and optional icon slide.
 */
export function AnimatedLink({
  href,
  children,
  className = "",
  showIcon = false,
}: AnimatedLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`relative inline-flex items-center gap-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        animate={{
          y: isHovered ? -2 : 0,
        }}
        transition={springs.gentle}
        className="relative"
      >
        {children}
        
        {/* Animated underline */}
        <motion.span
          className="absolute left-0 right-0 bottom-0 h-[1px] bg-current origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </motion.span>

      {/* Optional icon */}
      {showIcon && (
        <motion.span
          initial={{ x: -4, opacity: 0 }}
          animate={{
            x: isHovered ? 0 : -4,
            opacity: isHovered ? 1 : 0,
          }}
          transition={springs.gentle}
        >
          →
        </motion.span>
      )}
    </Link>
  );
}
