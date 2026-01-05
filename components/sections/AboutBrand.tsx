'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASE, GSAP_DURATION } from '@/lib/gsap-config';

gsap.registerPlugin(ScrollTrigger);

export function AboutBrand() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const visionRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const reasonRef = useRef<HTMLParagraphElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            eyebrowRef.current,
            headingRef.current,
            visionRef.current,
            dividerRef.current,
            reasonRef.current,
            manifestoRef.current,
          ],
          {
            opacity: 1,
            y: 0,
          }
        );
        return;
      }

      // Gentle sequential reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // 1. Eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: GSAP_DURATION.quick,
          ease: GSAP_EASE.gentle,
        }
      );

      // 2. Heading
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: GSAP_DURATION.normal,
          ease: GSAP_EASE.gentle,
        },
        '-=0.65'
      );

      // 3. Core vision paragraph
      tl.fromTo(
        visionRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: GSAP_DURATION.normal,
          ease: GSAP_EASE.gentle,
        },
        '-=0.95'
      );

      // 4. Divider
      tl.fromTo(
        dividerRef.current,
        { opacity: 0, scaleX: 0 },
        {
          opacity: 0.2,
          scaleX: 1,
          duration: GSAP_DURATION.normal,
          ease: GSAP_EASE.gentle,
        },
        '-=0.95'
      );

      // 5. Reason-for-being statement
      tl.fromTo(
        reasonRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: GSAP_DURATION.normal,
          ease: GSAP_EASE.gentle,
        },
        '-=0.95'
      );

      // 6. Manifesto line
      tl.fromTo(
        manifestoRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 0.85,
          y: 0,
          duration: GSAP_DURATION.normal,
          ease: GSAP_EASE.gentle,
        },
        '-=0.95'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-section="about"
      className="section-gradient-fade bg-soft-fade"
      style={{
        paddingTop: 'clamp(3rem, 8vw, var(--space-7))',
        paddingBottom: 'clamp(3rem, 8vw, var(--space-8))',
      }}
    >
      {/* Single-column editorial container */}
      <div
        style={{
          maxWidth: '780px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 'clamp(1.5rem, 4vw, var(--space-4))',
          paddingRight: 'clamp(1.5rem, 4vw, var(--space-4))',
        }}
      >
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-caption)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--ink-muted)',
            marginBottom: 'var(--space-4)',
          }}
        >
          ABOUT THE BRAND
        </p>

        {/* Section Heading */}
        <h2
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-heading-l)',
            lineHeight: 'var(--leading-tight)',
            color: 'var(--ink-primary)',
            marginBottom: 'var(--space-6)',
          }}
        >
          A Vision of Stillness
        </h2>

        {/* Core Vision Paragraph */}
        <p
          ref={visionRef}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body-l)',
            lineHeight: 1.75,
            color: 'var(--ink-secondary)',
            maxWidth: '65ch',
            marginBottom: 'var(--space-6)',
          }}
        >
          RUHORA was born from a belief that skincare is more than a routine — it
          is a pause for the mind and body. Each product is crafted to become part
          of a calming ritual, guiding the start and end of your day with intention
          and presence.
        </p>

        {/* Subtle Divider */}
        <div
          ref={dividerRef}
          style={{
            width: '40%',
            height: '1px',
            backgroundColor: 'var(--ink-muted)',
            opacity: 0.2,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 'var(--space-6)',
            marginBottom: 'var(--space-6)',
          }}
        />

        {/* Reason-for-Being Statement */}
        <p
          ref={reasonRef}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'calc(var(--text-body-l) * 1.15)',
            lineHeight: 1.65,
            color: 'var(--ink-primary)',
            fontStyle: 'italic',
            fontWeight: 300,
            marginTop: 'var(--space-6)',
            marginBottom: 'var(--space-7)',
          }}
        >
          In a world that moves too fast, RUHORA exists to create moments of
          stillness — where skincare becomes a quiet ritual for the mind, body, and
          senses.
        </p>

        {/* Manifesto Line (Closing Still Point) */}
        <p
          ref={manifestoRef}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-heading-m)',
            lineHeight: 'var(--leading-snug)',
            color: 'var(--ink-secondary)',
            textAlign: 'center',
            marginTop: 'var(--space-7)',
          }}
        >
          Every moment with your skin is a moment of stillness, presence, and care.
        </p>
      </div>
    </section>
  );
}
