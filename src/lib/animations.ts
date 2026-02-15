/**
 * Animation Configuration & Utilities
 * 
 * Central configuration for all animations following Google Material Design
 * and Apple-style animation principles.
 */

import { Variants, Transition } from "framer-motion";

// ============================================================================
// EASING CURVES
// ============================================================================

/**
 * Material Design standard easing curve
 * Asymmetric curve where acceleration is shorter than deceleration
 */
export const materialEasing = [0.4, 0.0, 0.2, 1];

/**
 * Apple-style smooth easing with slight overshoot
 */
export const appleEasing = [0.16, 1, 0.3, 1];

/**
 * Sharp easing for exit animations
 */
export const sharpEasing = [0.4, 0.0, 0.6, 1];

/**
 * Gentle easing for subtle movements
 */
export const gentleEasing = [0.25, 0.1, 0.25, 1];

// ============================================================================
// DURATION CONSTANTS (in seconds)
// ============================================================================

export const durations = {
  // Mobile-optimized (200-300ms)
  mobile: {
    fast: 0.2,
    normal: 0.25,
    slow: 0.3,
  },
  // Tablet (300-400ms)
  tablet: {
    fast: 0.3,
    normal: 0.35,
    slow: 0.4,
  },
  // Desktop (400-500ms)
  desktop: {
    fast: 0.4,
    normal: 0.45,
    slow: 0.5,
  },
  // Special cases
  hero: 1.2, // Hero text reveals
  transition: 1.0, // Page transitions
};

// ============================================================================
// SPRING CONFIGURATIONS
// ============================================================================

export const springs = {
  // Gentle spring for subtle interactions
  gentle: {
    type: "spring" as const,
    damping: 20,
    stiffness: 300,
  },
  // Medium spring for standard interactions
  medium: {
    type: "spring" as const,
    damping: 15,
    stiffness: 300,
  },
  // Bouncy spring for playful interactions
  bouncy: {
    type: "spring" as const,
    damping: 10,
    stiffness: 100,
  },
  // Stiff spring for magnetic effects
  magnetic: {
    type: "spring" as const,
    damping: 12,
    stiffness: 150,
  },
};

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

/**
 * Fade animations
 */
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.desktop.normal,
      ease: materialEasing,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: durations.desktop.fast,
      ease: sharpEasing,
    },
  },
};

/**
 * Slide up with fade (for content reveals)
 */
export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: durations.desktop.slow,
      ease: materialEasing,
    },
  },
};

/**
 * Scale with fade (for modal/card appearances)
 */
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.desktop.normal,
      ease: appleEasing,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: durations.desktop.fast,
      ease: sharpEasing,
    },
  },
};

/**
 * Character reveal for hero text
 */
export const characterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 1.05,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
};

/**
 * Container variants for stagger children
 */
export const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// ============================================================================
// STAGGER CONFIGURATIONS
// ============================================================================

export const staggerConfig = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  cards: 0.15, // For experience cards
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get responsive duration based on viewport width
 */
export const getResponsiveDuration = (speed: 'fast' | 'normal' | 'slow' = 'normal'): number => {
  if (typeof window === 'undefined') return durations.desktop[speed];
  
  const width = window.innerWidth;
  if (width < 768) return durations.mobile[speed];
  if (width < 1024) return durations.tablet[speed];
  return durations.desktop[speed];
};

/**
 * Create stagger transition
 */
export const createStagger = (
  staggerDelay: number = staggerConfig.normal,
  delayChildren: number = 0
): Transition => ({
  staggerChildren: staggerDelay,
  delayChildren,
});

/**
 * Create transition with responsive duration
 */
export const createTransition = (
  speed: 'fast' | 'normal' | 'slow' = 'normal',
  easing: number[] = materialEasing
): Transition => ({
  duration: getResponsiveDuration(speed),
  ease: easing,
});

/**
 * Hover variants for interactive elements
 */
export const createHoverVariants = (
  scale: number = 1.02,
  y: number = -2
): Variants => ({
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale,
    y,
    transition: springs.gentle,
  },
});

/**
 * Card elevation variants (Material Design)
 */
export const cardElevationVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  hover: {
    scale: 1.01,
    y: -4,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
    transition: springs.medium,
  },
};

// ============================================================================
// SCROLL ANIMATION HELPERS
// ============================================================================

/**
 * Standard scroll reveal configuration for GSAP ScrollTrigger
 */
export const scrollRevealConfig = {
  start: "top 70%", // Start animation when element is 70% in viewport
  end: "bottom 20%",
  toggleActions: "play none none reverse",
  scrub: false,
};

/**
 * Scrub scroll configuration (Apple-style)
 */
export const scrollScrubConfig = {
  start: "top bottom",
  end: "bottom top",
  scrub: 1, // Smooth scrubbing
};

/**
 * Pin scroll configuration
 */
export const scrollPinConfig = {
  start: "top top",
  end: "+=100%",
  pin: true,
  scrub: 1,
};
