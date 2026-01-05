import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASE, GSAP_DURATION } from '@/lib/gsap-config';

/**
 * Footer Section Animations
 * 
 * Implements:
 * 1. Gentle fade-in on scroll
 * 2. Staggered reveal of footer elements
 * 3. Subtle social icon hover effects
 * 
 * Philosophy: The last breath of stillness
 * Footer animations should feel like a quiet closing note
 */

interface FooterAnimationOptions {
  reducedMotion: boolean;
}

export function initFooterAnimation({ reducedMotion }: FooterAnimationOptions) {
  // If user prefers reduced motion, show everything immediately
  if (reducedMotion) {
    gsap.set([
      '.footer-tagline',
      '.footer-divider',
      '.footer-note-label',
      '.footer-note-text',
      '.footer-social',
      '.footer-copyright'
    ], {
      opacity: 1,
      y: 0,
    });
    return () => {}; // No cleanup needed
  }

  const ctx = gsap.context(() => {
    // FOOTER STAGGERED REVEAL
    // Elements fade in sequentially as user scrolls into view
    const footerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 75%',
        end: 'top 25%',
        once: true, // Animation happens only once
      },
    });

    footerTimeline
      // 1. Tagline fades in first
      .to('.footer-tagline', {
        opacity: 0.85,
        y: 0,
        duration: GSAP_DURATION.normal,
        ease: GSAP_EASE.gentle,
      })
      // 2. Divider line appears
      .to(
        '.footer-divider',
        {
          opacity: 1,
          duration: GSAP_DURATION.quick,
          ease: GSAP_EASE.soft,
        },
        '-=0.6' // Overlap slightly with previous animation
      )
      // 3. Founder's note label
      .to(
        '.footer-note-label',
        {
          opacity: 1,
          y: 0,
          duration: GSAP_DURATION.quick,
          ease: GSAP_EASE.gentle,
        },
        '-=0.4'
      )
      // 4. Founder's note text (main message)
      .to(
        '.footer-note-text',
        {
          opacity: 1,
          y: 0,
          duration: GSAP_DURATION.normal,
          ease: GSAP_EASE.gentle,
        },
        '-=0.5'
      )
      // 5. Social icons appear
      .to(
        '.footer-social',
        {
          opacity: 1,
          y: 0,
          duration: GSAP_DURATION.quick,
          ease: GSAP_EASE.soft,
        },
        '-=0.6'
      )
      // 6. Copyright text fades in last
      .to(
        '.footer-copyright',
        {
          opacity: 0.7,
          y: 0,
          duration: GSAP_DURATION.quick,
          ease: GSAP_EASE.soft,
        },
        '-=0.4'
      );

    // SOCIAL ICON HOVER ANIMATIONS
    // Subtle scale on hover (handled by CSS but enhanced here)
    const socialLinks = gsap.utils.toArray('.footer-social-link');
    
    socialLinks.forEach((link) => {
      const element = link as HTMLElement;
      
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.05,
          duration: 0.3,
          ease: GSAP_EASE.soft,
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
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
