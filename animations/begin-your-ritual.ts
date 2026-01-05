import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASE, GSAP_DURATION, SCROLL_DEFAULTS } from '@/lib/gsap-config';

/**
 * Begin Your Ritual Section Animations
 * 
 * Implements:
 * 1. Section title + subtitle scroll reveal
 * 2. Product blocks: staggered image + text fade-up
 * 3. Subtle hover interactions on images (desktop only)
 * 4. Optional subtle parallax on images (desktop only)
 * 5. Closing CTA reveal
 * 
 * Philosophy: Editorial, museum-like
 * Motion should reinforce the calm, intentional feeling
 */

interface RitualAnimationOptions {
  reducedMotion: boolean;
}

export function initBeginYourRitualAnimation({ reducedMotion }: RitualAnimationOptions) {
  // If user prefers reduced motion, show everything immediately
  if (reducedMotion) {
    gsap.set([
      '.ritual-section-title',
      '.ritual-section-subtitle',
      '.ritual-product-image-wrapper',
      '.ritual-product-eyebrow',
      '.ritual-product-name',
      '.ritual-product-description',
      '.ritual-product-ingredients',
      '.ritual-ingredient',
      '.ritual-product-traits',
      '.ritual-product-cta',
      '.ritual-closing-text',
      '.ritual-final-cta',
    ], {
      opacity: 1,
      y: 0,
    });
    return () => {}; // No cleanup needed
  }

  const ctx = gsap.context(() => {
    // 1. SECTION HEADER REVEAL
    // Title and subtitle fade up when section enters viewport
    gsap.to('.ritual-section-title', {
      opacity: 1,
      y: 0,
      duration: GSAP_DURATION.normal,
      ease: GSAP_EASE.gentle,
      scrollTrigger: {
        trigger: '.ritual-section',
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    gsap.to('.ritual-section-subtitle', {
      opacity: 1,
      y: 0,
      duration: GSAP_DURATION.normal,
      ease: GSAP_EASE.gentle,
      delay: 0.2,
      scrollTrigger: {
        trigger: '.ritual-section',
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    // 2. PRODUCT BLOCKS REVEAL
    // Each product block animates independently when it enters viewport
    const productBlocks = gsap.utils.toArray('.ritual-product-block');

    productBlocks.forEach((block: any) => {
      const productId = block.getAttribute('data-product-id');
      
      // Image reveal
      gsap.to(block.querySelector('.ritual-product-image-wrapper'), {
        opacity: 1,
        y: 0,
        duration: GSAP_DURATION.slow,
        ease: GSAP_EASE.gentle,
        scrollTrigger: {
          trigger: block,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Text elements stagger (eyebrow → name → description → ingredients → traits → CTA)
      const textElements = [
        block.querySelector('.ritual-product-eyebrow'),
        block.querySelector('.ritual-product-name'),
        block.querySelector('.ritual-product-description'),
        block.querySelector('.ritual-product-ingredients'),
        block.querySelector('.ritual-product-traits'),
        block.querySelector('.ritual-product-cta')?.parentElement, // Target wrapper div
      ].filter(Boolean);

      gsap.to(textElements, {
        opacity: 1,
        y: 0,
        duration: GSAP_DURATION.normal,
        ease: GSAP_EASE.gentle,
        stagger: 0.12,
        scrollTrigger: {
          trigger: block,
          start: 'top 70%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Individual ingredient stagger (after parent container appears)
      const ingredientElements = Array.from(
        block.querySelectorAll('.ritual-ingredient')
      );
      
      if (ingredientElements.length > 0) {
        gsap.to(ingredientElements, {
          opacity: 1,
          y: 0,
          duration: GSAP_DURATION.quick,
          ease: GSAP_EASE.soft,
          stagger: 0.08,
          scrollTrigger: {
            trigger: block.querySelector('.ritual-product-ingredients'),
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      }

      // 3. HOVER INTERACTION (Desktop only)
      // Subtle scale and shadow deepening on image hover
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': () => {
          const imageContainer = block.querySelector('.ritual-product-image');
          
          if (imageContainer) {
            imageContainer.addEventListener('mouseenter', () => {
              gsap.to(imageContainer, {
                scale: 1.015,
                boxShadow: 'var(--shadow-product)',
                duration: GSAP_DURATION.quick,
                ease: GSAP_EASE.soft,
              });
            });

            imageContainer.addEventListener('mouseleave', () => {
              gsap.to(imageContainer, {
                scale: 1,
                boxShadow: 'var(--shadow-soft)',
                duration: GSAP_DURATION.quick,
                ease: GSAP_EASE.soft,
              });
            });
          }
        },
      });

      // 4. OPTIONAL SUBTLE PARALLAX (Desktop only)
      // Very subtle vertical shift as user scrolls
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': () => {
          const imageWrapper = block.querySelector('.ritual-product-image-wrapper');
          
          if (imageWrapper) {
            gsap.to(imageWrapper, {
              y: -12,
              ease: 'none',
              scrollTrigger: {
                trigger: block,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1, // Smooth scrubbing
              },
            });
          }
        },
      });
    });

    // 5. CLOSING CTA REVEAL
    // Final call-to-action appears when footer enters viewport
    gsap.to('.ritual-closing-text', {
      opacity: 1,
      y: 0,
      duration: GSAP_DURATION.normal,
      ease: GSAP_EASE.gentle,
      scrollTrigger: {
        trigger: '.ritual-closing-text',
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    gsap.to('.ritual-final-cta', {
      opacity: 1,
      y: 0,
      duration: GSAP_DURATION.normal,
      ease: GSAP_EASE.gentle,
      delay: 0.15,
      scrollTrigger: {
        trigger: '.ritual-closing-text',
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
    });
  });

  // Return cleanup function to revert all GSAP animations
  return () => {
    ctx.revert();
  };
}
