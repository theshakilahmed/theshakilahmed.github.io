"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll Component
 * 
 * Provides buttery smooth scrolling experience using Lenis,
 * similar to Apple's product pages. Integrates with GSAP ScrollTrigger.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, // Disable smooth scroll on touch devices
      touchMultiplier: 2,
      infinite: false,
    });

    // Request animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate with GSAP ScrollTrigger if available
    if (typeof window !== "undefined") {
      // Dynamically import and integrate with GSAP
      import("gsap").then((gsapModule) => {
        import("gsap/ScrollTrigger").then((ScrollTriggerModule) => {
          const gsap = gsapModule.default;
          const ScrollTrigger = ScrollTriggerModule.default;
          
          gsap.registerPlugin(ScrollTrigger);
          
          // Update ScrollTrigger on Lenis scroll
          lenis.on("scroll", ScrollTrigger.update);
          
          // Tell GSAP to use Lenis's scroll values
          gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
          });
          
          gsap.ticker.lagSmoothing(0);
        });
      });
    }

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
