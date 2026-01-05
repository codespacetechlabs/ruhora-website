'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const ctaMobileRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const breathingTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      /* ----------------------------------
         1. INTRO FADE (HEADLINE → SUBHEAD → CTA)
      ---------------------------------- */

      if (!prefersReducedMotion) {
        // Intro sequence: headline, subheadline, then CTA
        const tl = gsap.timeline();
        
        tl.from(headlineRef.current, {
          opacity: 0,
          y: 8,
          duration: 1.2,
          ease: 'power2.out',
        })
        .from(subheadlineRef.current, {
          opacity: 0,
          y: 8,
          duration: 1.2,
          ease: 'power2.out',
        }, '-=0.9')
        .to([ctaRef.current, ctaMobileRef.current].filter(Boolean), {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.6');
      } else {
        gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current, ctaMobileRef.current].filter(Boolean), {
          opacity: 1,
          y: 0,
        });
      }

      /* ----------------------------------
         2. CTA BREATHING PULSE (OPACITY ONLY)
         Stops on hover/focus for better UX
      ---------------------------------- */

      if (!prefersReducedMotion && ctaRef.current) {
        breathingTweenRef.current = gsap.to(ctaRef.current, {
          opacity: 0.92,
          duration: 2.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.8, // Start after CTA fully faded in
        });
      }

      /* ----------------------------------
         3. SUBTLE SHIMMER LOOP
      ---------------------------------- */

      if (!prefersReducedMotion && shimmerRef.current) {
        gsap.to(shimmerRef.current, {
          opacity: 0.12,
          duration: 6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      /* ----------------------------------
         4. SCROLL INDICATOR GENTLE DRIFT
      ---------------------------------- */

      if (!prefersReducedMotion && scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          y: 8,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      /* ----------------------------------
         5. DESKTOP-ONLY BACKGROUND PARALLAX
      ---------------------------------- */

      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': () => {
          if (!prefersReducedMotion && backgroundRef.current) {
            gsap.to(backgroundRef.current, {
              y: 20, // LOCKED VALUE
              ease: 'none',
              scrollTrigger: {
                id: 'hero-parallax',
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            });
          }
        },
      });
    }, sectionRef);

    return () => {
      breathingTweenRef.current?.kill();
      ctx.revert();
    };
  }, []);

  // Handle CTA click - smooth scroll to next section
  const handleCtaClick = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Find next section (BrandEssence or ProductShowcase)
    const nextSection = sectionRef.current?.nextElementSibling as HTMLElement;
    if (nextSection) {
      if (prefersReducedMotion) {
        // Instant scroll for reduced motion
        nextSection.scrollIntoView();
      } else {
        // Smooth scroll for normal motion
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Handle hover/focus to pause breathing animation
  const handleCtaInteraction = (isInteracting: boolean) => {
    if (breathingTweenRef.current) {
      if (isInteracting) {
        breathingTweenRef.current.pause();
        gsap.to(ctaRef.current, { opacity: 1, duration: 0.3 });
      } else {
        gsap.to(ctaRef.current, { opacity: 0.92, duration: 0.3, onComplete: () => {
          breathingTweenRef.current?.resume();
        }});
      }
    }
  };
  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Logo - Top Center */}
      <div className="absolute top-6 md:top-12 left-1/2 -translate-x-1/2 z-30">
        <Image
          src="/logo.png"
          alt="RUहORA"
          width={80}
          height={80}
          priority
          className="md:w-[120px] md:h-[120px] object-contain"
        />
      </div>

      {/* Background - Responsive positioning */}
      <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
        <div
          ref={backgroundRef}
          className="hero-background relative w-full h-full"
          style={{
            pointerEvents: 'none',
          }}
        >
          <Image
            src="/homepage_background.png"
            alt="Ritual hands with water reflection"
            fill
            priority
            className="object-cover"
            style={{ 
              objectPosition: 'center right',
            }}
            sizes="100vw"
          />
          {/* Gradient overlay for text readability */}
          {/* <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(251, 246, 239, 0.85) 0%, rgba(251, 246, 239, 0.6) 30%, rgba(251, 246, 239, 0.3) 50%, transparent 70%)',
            }}
          /> */}
        </div>

        {/* Subtle shimmer overlay - will be animated */}
        <div
          ref={shimmerRef}
          className="shimmer-overlay absolute inset-0 opacity-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 xl:px-[150px]">
        <div className="min-h-screen items-center">
          {/* Text Content - Left Side (columns 1-6) */}
          <div className="col-span-6 pt-[25vh] md:pt-[30vh]">
            {/* Main headline - will fade in after load */}
            <h1
              ref={headlineRef}
              className="hero-headline font-light tracking-tight mb-6 md:mb-8"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3.5rem, 14vw, 9.375rem)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--ink-primary)',
                letterSpacing: '-0.02em',
                opacity: 0,
                transform: 'translateY(12px)',
                textShadow: '0 1px 2px rgba(251, 246, 239, 0.5)',
              }}
            >
              FROM SKIN<br />TO SOUL
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadlineRef}
              className="hero-subheadline tracking-wide text-2xl md:text-2xl lg:text-3xl"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: '300',
                color: 'var(--ink-secondary)',
                lineHeight: 'var(--leading-snug)',
                opacity: 0,
                transform: 'translateY(12px)',
                textShadow: '0 1px 2px rgba(251, 246, 239, 0.5)',
              }}
            >
              Where Skincare Meets Stillness
            </p>

            {/* CTA - Shows inline on desktop */}
            <div className="hidden lg:block mt-8">
              <button
                ref={ctaRef}
                className="btn-primary hero-cta"
                onClick={handleCtaClick}
                onMouseEnter={() => handleCtaInteraction(true)}
                onMouseLeave={() => handleCtaInteraction(false)}
                onFocus={() => handleCtaInteraction(true)}
                onBlur={() => handleCtaInteraction(false)}
                style={{
                  opacity: 0,
                  pointerEvents: 'auto',
                }}
                aria-label="Begin your ritual"
              >
                Begin Your Ritual
              </button>
            </div>

            {/* CTA - Shows centered on mobile */}
            <div className="lg:hidden mt-8 flex justify-center">
              <button
                ref={ctaMobileRef}
                className="btn-primary hero-cta"
                onClick={handleCtaClick}
                style={{
                  opacity: 0,
                  pointerEvents: 'auto',
                }}
                aria-label="Begin your ritual"
              >
                Begin Your Ritual
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-20"
        style={{ pointerEvents: 'none' }}
      >
        <span
          className="caption text-xs"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Scroll
        </span>
        <div className="w-px h-8 md:h-12 bg-current opacity-30" />
      </div>
    </section>
  );
}
