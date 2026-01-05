import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASE, GSAP_DURATION } from '@/lib/gsap-config';

/**
 * Hero Section Animations
 * 
 * Implements:
 * 1. Subtle background parallax (desktop only)
 * 2. Headline fade-in sequence
 * 3. CTA breathing pulse
 * 4. Shimmer overlay loop
 * 
 * Philosophy: Whisper, don't shout
 * Motion should feel like breathing - barely noticeable but alive
 */

interface HeroAnimationOptions {
  reducedMotion: boolean;
}

export function initHeroAnimation({ reducedMotion }: HeroAnimationOptions) {
  // If user prefers reduced motion, show everything immediately
  if (reducedMotion) {
    gsap.set(['.hero-headline', '.hero-subheadline', '.hero-cta'], {
      opacity: 1,
    });
    return () => {}; // No cleanup needed
  }

  const ctx = gsap.context(() => {
    // 1. HEADLINE FADE-IN SEQUENCE (on page load)
    // Triggers once after a brief moment to let the page settle
    const headlineTimeline = gsap.timeline({
      delay: 0.3,
    });

    headlineTimeline
      .to('.hero-headline', {
        opacity: 1,
        y: 0,
        duration: GSAP_DURATION.normal,
        ease: GSAP_EASE.gentle,
      })
      .to(
        '.hero-subheadline',
        {
          opacity: 1,
          y: 0,
          duration: GSAP_DURATION.normal,
          ease: GSAP_EASE.gentle,
        },
        '-=0.8' // Start 0.8s before previous animation ends
      )
      .to(
        '.hero-cta',
        {
          opacity: 1,
          duration: GSAP_DURATION.quick,
          ease: GSAP_EASE.soft,
        },
        '-=0.6'
      );

    // 2. CTA BREATHING PULSE
    // Continuous subtle opacity pulse - like a gentle breath
    gsap.to('.hero-cta', {
      opacity: 0.85,
      duration: 3,
      ease: GSAP_EASE.breath,
      yoyo: true,
      repeat: -1,
      delay: 1.5, // Start after initial fade-in
    });

    // 3. SHIMMER OVERLAY LOOP
    // Very subtle - barely perceptible light reflection
    gsap.to('.shimmer-overlay', {
      opacity: 0.3,
      duration: 12,
      ease: GSAP_EASE.breath,
      yoyo: true,
      repeat: -1,
    });

    // 4. BACKGROUND PARALLAX (desktop only, scroll-driven)
    // Desktop only to avoid performance issues on mobile
    ScrollTrigger.matchMedia({
      // Desktop
      '(min-width: 768px)': () => {
        gsap.to('.hero-background', {
          y: -40, // Moves 40px up as user scrolls down
          ease: 'none', // Direct coupling to scroll
          scrollTrigger: {
            trigger: '.hero-background',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5, // Slight lag for dreaminess
          },
        });
      },
      // Mobile - no parallax
      '(max-width: 767px)': () => {
        // Parallax disabled on mobile for performance
      },
    });
  });

  // Return cleanup function
  // Critical: prevents memory leaks and duplicate animations
  return () => {
    ctx.revert(); // Kills all animations created in this context
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}
