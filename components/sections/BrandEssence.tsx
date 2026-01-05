'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function BrandEssence() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const coreLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const essenceWordsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([eyebrowRef.current, ...coreLineRefs.current, supportingRef.current, essenceWordsRef.current], {
          opacity: 1,
          y: 0,
        });
        // Disable ScrollTriggers when reduced motion is enabled
        return;
      }

      // Section fade-in
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'essence-reveal',
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Eyebrow fade
      tl.from(eyebrowRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Line-by-line reveal for core statement
      tl.from(
        coreLineRefs.current.filter(Boolean),
        {
          opacity: 0,
          y: 8,
          duration: 1,
          stagger: 0.12,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // Supporting paragraph
      tl.from(
        supportingRef.current,
        {
          opacity: 0,
          y: 6,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // Essence words
      tl.from(
        essenceWordsRef.current,
        {
          opacity: 0,
          y: 6,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="essence"
      data-section="essence"
      className="py-18 px-6 lg:px-24"
    >
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center" style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Left: Text Content */}
        <div className="space-y-12">
          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="text-xs tracking-[0.2em] uppercase opacity-60"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            The Essence
          </p>

          {/* Core Statement - Line by Line */}
          <div className="space-y-4">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              <span ref={(el) => (coreLineRefs.current[0] = el)} className="block">
                Skincare is not a routine.
              </span>
              <span ref={(el) => (coreLineRefs.current[1] = el)} className="block">
                It is a ritual of stillness.
              </span>
            </h2>
          </div>

          {/* Supporting Paragraph */}
          <p
            ref={supportingRef}
            className="text-lg md:text-xl leading-relaxed opacity-80"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            <strong>RUHORA</strong> was created to honor the connection between skin, mind, and presence.
            In a world that moves fast, we choose to pause.
          </p>

          {/* Essence Words */}
          <div
            ref={essenceWordsRef}
            className="flex flex-wrap gap-6 text-sm tracking-wide opacity-60"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            <span>Stillness</span>
            <span className="opacity-20">•</span>
            <span>Ritual</span>
            <span className="opacity-20">•</span>
            <span>Intention</span>
            <span className="opacity-20">•</span>
            <span>Presence</span>
          </div>
        </div>

        {/* Right: Subtle Visual */}
        <div className="relative aspect-[3/4] lg:aspect-[4/5] opacity-40 order-first lg:order-last">
          <Image
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
            alt="Essence visual"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Subtle overlay for balance */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(245, 241, 235, 0.2) 0%, rgba(245, 241, 235, 0.4) 100%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
