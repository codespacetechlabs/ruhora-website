'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AboutBrand() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const visionLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const gapStatementRef = useRef<HTMLParagraphElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);
  const standsAgainstRef = useRef<HTMLDivElement>(null);

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
            ...visionLineRefs.current,
            gapStatementRef.current,
            manifestoRef.current,
            standsAgainstRef.current,
          ],
          {
            opacity: 1,
            y: 0,
          }
        );
        return;
      }

      // Gentle fade-in on entry
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // Eyebrow
      tl.from(eyebrowRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Heading
      tl.from(
        headingRef.current,
        {
          opacity: 0,
          y: 12,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // Line-by-line reveal for Founder's Vision
      tl.from(
        visionLineRefs.current.filter(Boolean),
        {
          opacity: 0,
          y: 12,
          duration: 1,
          stagger: 0.15,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // Gap statement
      tl.from(
        gapStatementRef.current,
        {
          opacity: 0,
          y: 8,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.2'
      );

      // Manifesto
      tl.from(
        manifestoRef.current,
        {
          opacity: 0,
          y: 8,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.2'
      );

      // Stands against list
      tl.from(
        standsAgainstRef.current,
        {
          opacity: 0,
          y: 8,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-section="about"
      className="relative pt-24 lg:pt-24 pb-32 px-6"
    >
      {/* Subtle Background Texture */}
      {/* <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <Image
          src="https://images.unsplash.com/photo-1495567720989-cebdbdd97913"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div> */}

      {/* Narrow Editorial Column */}
      <div
        className="mx-auto space-y-16"
        style={{
          maxWidth: '1440px',
        }}
      >
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="text-xs tracking-[0.2em] uppercase opacity-60 text-center"
          style={{ fontFamily: 'var(--font-secondary)' }}
        >
          About the Brand
        </p>

        {/* Soft Heading */}
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-center"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          A Vision of Stillness
        </h2>

        {/* Founder's Vision - Line by Line */}
        <div className="space-y-6 text-lg md:text-xl leading-relaxed opacity-90" style={{ fontFamily: 'var(--font-secondary)' }}>
          <p ref={(el) => (visionLineRefs.current[0] = el)}>
            RUHORA was born from a belief that skincare is more than a routine — it is an act of self-care, a pause for the mind and body. Every product is crafted to be part of a calming ritual, guiding the start and end of your day with intention and presence.
          </p>
          <p ref={(el) => (visionLineRefs.current[1] = el)}>
            In a life that moves fast, RUHORA invites stillness, supporting physical and mental well-being through mindful, luxurious care. Our vision is to make each moment with your skin a gentle, grounding experience — simple, elegant, and deeply renewing.
          </p>
        </div>

        {/* Emotional Gap Statement */}
        <p
          ref={gapStatementRef}
          className="text-xl md:text-2xl leading-relaxed opacity-70 py-8 border-y border-current/10"
          style={{ fontFamily: 'var(--font-secondary)' }}
        >
          In a world that moves too fast, RUHORA exists to create moments of stillness —
          where skincare becomes a quiet ritual for the mind, body, and senses.
        </p>

        {/* Manifesto Line */}
        <p
          ref={manifestoRef}
          className="text-2xl md:text-3xl font-light leading-tight text-center py-8"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          Every moment with your skin is a moment of stillness, presence, and care.
        </p>

        {/* RUHORA Stands Against */}
        {/* <div
          ref={standsAgainstRef}
          className="space-y-8 pt-24 opacity-70"
        >
          <h3
            className="text-xl font-light tracking-wide opacity-70 text-center"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            RUHORA stands against
          </h3>
          <div className="space-y-6 text-base md:text-lg leading-relaxed opacity-80" style={{ fontFamily: 'var(--font-secondary)' }}>
            <p>
              <strong className="font-medium">Rush</strong> — the pace that steals presence and mindfulness
            </p>
            <p>
              <strong className="font-medium">Harshness</strong> — in touch, in care, in intention
            </p>
            <p>
              <strong className="font-medium">Noise</strong> — distractions that pull you from stillness
            </p>
            <p>
              <strong className="font-medium">Excess</strong> — clutter and unnecessary overstimulation
            </p>
            <p>
              <strong className="font-medium">Superficiality</strong> — skincare without soul, rituals without meaning
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
