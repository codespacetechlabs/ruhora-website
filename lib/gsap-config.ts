'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isRegistered = false;

/**
 * Safely register GSAP plugins on client-side only
 * Must be called before using ScrollTrigger
 * Only registers once to avoid duplicate registration
 */
export function registerGSAPPlugins() {
  if (typeof window !== 'undefined' && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
}

/**
 * Global GSAP configuration
 * Easing presets aligned with brand philosophy
 */
export const GSAP_EASE = {
  soft: 'power1.out',
  gentle: 'power2.out',
  breath: 'sine.inOut',
} as const;

/**
 * Duration presets - slow and deliberate
 */
export const GSAP_DURATION = {
  quick: 0.8,
  normal: 1.2,
  slow: 1.5,
} as const;

/**
 * Default ScrollTrigger configuration for brand consistency
 */
export const SCROLL_DEFAULTS = {
  start: 'top 75%',
  toggleActions: 'play none none none',
  once: true, // Most animations should only play once
} as const;
