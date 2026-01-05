'use client';

import { useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { registerGSAPPlugins } from '@/lib/gsap-config';
import { initHeroAnimation } from '@/animations/hero';

/**
 * AnimationProvider
 * 
 * Client-side component that initializes all scroll animations
 * Handles:
 * - GSAP plugin registration
 * - Reduced motion detection
 * - Animation cleanup on unmount
 * 
 * Must wrap sections that need animation
 */

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Register GSAP plugins (only happens once)
    registerGSAPPlugins();

    // Wait for page to be fully loaded before initializing animations
    // This prevents animations from firing on partially rendered content
    const initAnimations = () => {
      const cleanupHero = initHeroAnimation({ reducedMotion });

      // Return cleanup function that runs when component unmounts
      return () => {
        cleanupHero();
      };
    };

    // Ensure DOM is ready
    if (document.readyState === 'complete') {
      return initAnimations();
    } else {
      window.addEventListener('load', initAnimations);
      return () => {
        window.removeEventListener('load', initAnimations);
      };
    }
  }, [reducedMotion]);

  return <>{children}</>;
}
