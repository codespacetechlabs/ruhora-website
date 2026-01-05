import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASE, GSAP_DURATION, SCROLL_DEFAULTS } from '@/lib/gsap-config';

/**
 * Journal Section Animations
 * 
 * Implements:
 * 1. Section header fade-in on scroll
 * 2. Staggered card reveal
 * 3. Gentle hover state enhancement
 * 
 * Philosophy: Editorial calm, breathing space, intentional reading experience
 */

interface JournalAnimationOptions {
  reducedMotion: boolean;
}

export function initJournalAnimation({ reducedMotion }: JournalAnimationOptions) {
  // If user prefers reduced motion, show everything immediately
  if (reducedMotion) {
    gsap.set(['.journal-header', '.journal-cards'], {
      opacity: 1,
      y: 0,
    });
    return () => {}; // No cleanup needed
  }

  const ctx = gsap.context(() => {
    // 1. SECTION HEADER FADE-IN
    // Appears when section enters viewport
    gsap.to('.journal-header', {
      opacity: 1,
      y: 0,
      duration: GSAP_DURATION.normal,
      ease: GSAP_EASE.gentle,
      scrollTrigger: {
        trigger: '.journal-section',
        start: SCROLL_DEFAULTS.start,
        toggleActions: SCROLL_DEFAULTS.toggleActions,
        once: SCROLL_DEFAULTS.once,
      },
    });

    // 2. CARDS STAGGERED REVEAL
    // Each card fades in with subtle upward movement
    gsap.to('.journal-cards', {
      opacity: 1,
      y: 0,
      duration: GSAP_DURATION.slow,
      ease: GSAP_EASE.gentle,
      scrollTrigger: {
        trigger: '.journal-cards',
        start: 'top 80%',
        toggleActions: SCROLL_DEFAULTS.toggleActions,
        once: SCROLL_DEFAULTS.once,
      },
    });

    // 3. INDIVIDUAL CARD STAGGER
    // Slight delay between each card appearing
    gsap.to('.journal-card', {
      opacity: 1,
      y: 0,
      duration: GSAP_DURATION.normal,
      ease: GSAP_EASE.gentle,
      stagger: 0.15, // 150ms delay between each card
      scrollTrigger: {
        trigger: '.journal-cards',
        start: 'top 75%',
        toggleActions: SCROLL_DEFAULTS.toggleActions,
        once: SCROLL_DEFAULTS.once,
      },
    });

    // 4. HOVER STATE ENHANCEMENT (GSAP-driven for consistency)
    // Slight lift and shadow increase on hover
    const cards = gsap.utils.toArray<HTMLElement>('.journal-card');
    
    cards.forEach((card) => {
      // Store original shadow
      const originalShadow = getComputedStyle(card).boxShadow;
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          boxShadow: '0px 24px 50px rgba(58, 47, 42, 0.15)',
          duration: 0.3,
          ease: GSAP_EASE.soft,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          boxShadow: originalShadow,
          duration: 0.3,
          ease: GSAP_EASE.soft,
        });
      });
    });
  });

  // Return cleanup function
  return () => {
    ctx.revert();
  };
}
