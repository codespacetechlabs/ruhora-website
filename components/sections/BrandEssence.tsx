'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_EASE, GSAP_DURATION } from '@/lib/gsap-config';

gsap.registerPlugin(ScrollTrigger);

/**
 * The Essence Section
 * 
 * Represents the belief system of the brand — not products.
 * Creates a calm pause after the Hero, transitioning from
 * visual invitation → philosophical grounding.
 * 
 * Motion Philosophy:
 * - Slow, gentle reveals (0.9-1.1s durations)
 * - Subtle upward movement (12px max)
 * - Opacity-first transitions
 * - No parallax, no bounce
 * - Fully disabled for reduced motion preferences
 */
export function BrandEssence() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const coreLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        // Skip all animations - content is already visible
        return;
      }

      // Set initial hidden state for all animated elements
      const allElements = [
        eyebrowRef.current,
        ...coreLineRefs.current.filter(Boolean),
        supportingRef.current,
        valuesRef.current,
        imageRef.current,
      ];

      gsap.set(allElements, {
        opacity: 0,
        y: 12,
      });

      gsap.set(imageRef.current, {
        scale: 1.02,
      });

      // Create calm reveal timeline triggered by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'essence-reveal',
          trigger: sectionRef.current,
          start: 'top 75%', // When section enters lower viewport
          once: true, // Only play once
        },
      });

      // 1. Eyebrow: first element to appear
      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: GSAP_DURATION.quick, // 0.8s
        ease: GSAP_EASE.gentle, // power2.out
      });

      // 2. Core statement lines: staggered reveal
      tl.to(
        coreLineRefs.current.filter(Boolean),
        {
          opacity: 1,
          y: 0,
          duration: 1.0, // Slightly longer for emphasis
          stagger: 0.15, // Gentle delay between lines
          ease: GSAP_EASE.gentle,
        },
        '-=0.4' // Overlap with eyebrow
      );

      // 3. Supporting paragraph
      tl.to(
        supportingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: GSAP_EASE.gentle,
        },
        '-=0.5' // Start before lines finish
      );

      // 4. Values line
      tl.to(
        valuesRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: GSAP_EASE.gentle,
        },
        '-=0.4'
      );

      // 5. Image: fade + subtle scale
      // Appears after text begins, creating depth
      tl.to(
        imageRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1, // Return to normal scale
          duration: 1.1,
          ease: GSAP_EASE.gentle,
        },
        '-=0.7' // Start during values reveal
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="essence"
      data-section="essence"
      className="section-gradient-fade bg-canvas-fade"
      style={{
        paddingTop: 'clamp(3rem, 8vw, var(--space-7))',
        paddingBottom: 'clamp(3rem, 8vw, var(--space-7))',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, var(--space-5))',
        }}
      >
        <div
          className="essence-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(2rem, 5vw, var(--space-6))',
          }}
        >
          {/* Text Part 1: Eyebrow + Main Statement */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(1.5rem, 4vw, var(--space-5))',
              order: 1,
            }}
            className="lg:col-start-1 lg:row-start-1"
          >
            {/* Eyebrow */}
            <p
              ref={eyebrowRef}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-caption)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
              }}
            >
              THE ESSENCE
            </p>

            {/* Main Statement */}
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-heading-l)',
                lineHeight: 'var(--leading-snug)',
                color: 'var(--ink-primary)',
                fontWeight: 400,
              }}
            >
              <span
                ref={(el) => {
                  coreLineRefs.current[0] = el;
                }}
                style={{
                  display: 'block',
                }}
              >
                Skincare is not a routine.
              </span>
              <span
                ref={(el) => {
                  coreLineRefs.current[1] = el;
                }}
                style={{
                  display: 'block',
                }}
              >
                It is a ritual of stillness.
              </span>
            </h2>
          </div>

          {/* Ritual Image */}
          <div
            ref={imageRef}
            style={{
              position: 'relative',
              aspectRatio: '16 / 9',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-soft)',
              order: 2,
            }}
            className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center"
          >
            <Image
              src="/the_essence.png"
              alt="A moment of ritual — oil and stillness"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority={false}
            />
          </div>

          {/* Text Part 2: Supporting Copy + Values */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(1.5rem, 4vw, var(--space-5))',
              order: 3,
            }}
            className="lg:col-start-1 lg:row-start-2"
          >
            {/* Supporting Copy */}
            <div
              ref={supportingRef}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-body-l)',
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--ink-secondary)',
                maxWidth: '48ch',
              }}
            >
              <p style={{ marginBottom: '1em' }}>
                <strong style={{ color: 'var(--ink-primary)', fontWeight: 500 }}>
                  RUHORA
                </strong>{' '}
                was created to honor the connection between skin, mind, and presence. In a
                world that moves fast, we choose to pause.
              </p>
              <p>
                Our formulations invite you to slow down — turning everyday care into a
                moment of intention, awareness, and calm.
              </p>
            </div>

            {/* Values Line */}
            <div
              ref={valuesRef}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-body-m)',
                color: 'var(--ink-muted)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                alignItems: 'center',
              }}
              className="justify-center lg:justify-start"
            >
              <span>Stillness</span>
              <span style={{ opacity: 0.3 }}>•</span>
              <span>Ritual</span>
              <span style={{ opacity: 0.3 }}>•</span>
              <span>Intention</span>
              <span style={{ opacity: 0.3 }}>•</span>
              <span>Presence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive spacing adjustments */}
      <style jsx>{`
        @media (min-width: 1024px) {
          section {
            padding-top: var(--space-8);
            padding-bottom: var(--space-8);
          }
          .essence-grid {
            grid-template-columns: 55fr 45fr !important;
            grid-template-rows: auto auto;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
