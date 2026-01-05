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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      /* ----------------------------------
         1. INTRO FADE (HEADLINE + SUBHEAD)
      ---------------------------------- */

      if (!prefersReducedMotion) {
        gsap.from([headlineRef.current, subheadlineRef.current], {
          opacity: 0,
          y: 8,
          duration: 1.2,
          ease: 'power2.out',
          stagger: 0.12,
        });
      } else {
        gsap.set([headlineRef.current, subheadlineRef.current], {
          opacity: 1,
          y: 0,
        });
      }

      /* ----------------------------------
         2. CTA BREATHING PULSE (OPACITY ONLY)
      ---------------------------------- */

      if (!prefersReducedMotion && ctaRef.current) {
        gsap.to(ctaRef.current, {
          opacity: 0.85,
          duration: 2.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.2,
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
         4. DESKTOP-ONLY BACKGROUND PARALLAX
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

    return () => ctx.revert();
  }, []);
  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Logo - Top Center */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30">
        <Image
          src="/logo.png"
          alt="RUहORA"
          width={120}
          height={120}
          priority
          className="object-contain"
        />
      </div>

      {/* Background - 75% width from right side */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div
          ref={backgroundRef}
          className="hero-background relative"
          style={{
            width: '100%',
            // width: '75%',
            height: '100%',
          }}
        >
          <Image
            // src="/a-restorative-hand-ritual-445004.jpg"
            // src="/hero-background.png"
            src="/homepage_background.png"
            // src="/9e341bf54481d49293ad312987168706.jpg"
            alt="Ritual hands with water reflection"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center' }}
          />
          {/* Gradient overlay for text readability */}
          {/* <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, rgba(245, 241, 235, 0.95) 0%, rgba(245, 241, 235, 0.3) 40%, transparent 100%)',
            }}
          /> */}
        </div>

        {/* Subtle shimmer overlay - will be animated */}
        <div
          ref={shimmerRef}
          className="shimmer-overlay absolute inset-0 pointer-events-none opacity-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full" style={{ margin: '0 auto', padding: '0 150px' }}>
        <div className="min-h-screen items-center">
          {/* Text Content - Left Side (columns 1-6) */}
          <div className="col-span-6" style={{ paddingTop: '30vh' }}>
            {/* Main headline - will fade in after load */}
            <h1
              ref={headlineRef}
              className="hero-headline font-light tracking-tight mb-8"
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '150px',
                lineHeight: '0.9',
                opacity: 0,
                transform: 'translateY(12px)',
              }}
            >
              {/* Skin<br />To Soul */}
              FROM SKIN<br />TO SOUL
              {/* JOURNEY <br/>FROM SKIN<br />TO SOUL */}
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadlineRef}
              className="hero-subheadline tracking-wide mb-12"
              style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: '36px',
                fontWeight: '200',
                color: 'var(--color-ritual)',
                opacity: 0,
                transform: 'translateY(12px)',
              }}
            >
              Where Skincare Meets Stillness
            </p>

            {/* CTA - will have breathing pulse */}
            <button
              ref={ctaRef}
              className="hero-cta px-8 py-4 border border-current transition-colors duration-300 hover:bg-stone-900 hover:text-sand-50"
              style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-ritual)',
                opacity: 0,
              }}
              aria-label="Begin your ritual"
            >
              Begin Your Ritual
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-20">
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-secondary)' }}
        >
          Scroll
        </span>
        <div className="w-px h-12 bg-current opacity-30" />
      </div>
    </section>
  );
}
