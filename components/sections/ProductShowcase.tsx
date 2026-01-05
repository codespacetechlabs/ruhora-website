'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Product 01 refs
  const product01ImageRef = useRef<HTMLDivElement>(null);
  const product01CopyRef = useRef<HTMLDivElement>(null);
  
  // Product 02 refs
  const product02ImageRef = useRef<HTMLDivElement>(null);
  const product02CopyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        // Set everything to visible if reduced motion
        gsap.set([
          product01ImageRef.current,
          product01CopyRef.current,
          product02ImageRef.current,
          product02CopyRef.current,
        ], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      /* PRODUCT 01 ANIMATIONS */
      
      // Image arrive and settle
      gsap.from(product01ImageRef.current, {
        y: 8,
        duration: 1.6,
        ease: 'sine.out',
        scrollTrigger: {
          id: 'product-hydrashine',
          trigger: product01ImageRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // Copy fade-in as single unit
      gsap.from(product01CopyRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: product01ImageRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      /* PRODUCT 02 ANIMATIONS */
      
      // Image arrive and settle
      gsap.from(product02ImageRef.current, {
        y: 8,
        duration: 1.6,
        ease: 'sine.out',
        scrollTrigger: {
          id: 'product-ancient-elixir',
          trigger: product02ImageRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // Copy fade-in as single unit
      gsap.from(product02CopyRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: product02ImageRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="products" 
      data-section="products"
      className="py-16 md:py-24 lg:py-32"
      style={{
        maxWidth: '1140px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 'clamp(1.5rem, 5vw, 150px)',
        paddingRight: 'clamp(1.5rem, 5vw, 150px)',
      }}
    >
      {/* PRODUCT 01 — HYDRASHINE SKIN OIL GEL */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 md:mb-32 lg:mb-40">
        {/* Image */}
        <div 
          ref={product01ImageRef}
          className="relative w-full"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-stone-100">
            <Image
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
              alt="HydraShine Skin Oil Gel"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Editorial Copy */}
        <div ref={product01CopyRef} className="space-y-6">
          <p 
            className="text-xs tracking-[0.2em] uppercase opacity-60"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            BODY RITUAL
          </p>

          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            HydraShine
            <br />
            Skin Oil Gel
          </h2>

          <p 
            className="text-base md:text-lg leading-relaxed opacity-80"
            style={{ 
              fontFamily: 'var(--font-secondary)',
              maxWidth: '42ch',
            }}
          >
            A refined gel-based body oil that melts into the skin, enveloping it in hydration and a soft, natural glow. Designed for daily rituals that restore comfort and calm.
          </p>

          <p 
            className="text-sm opacity-60"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Hydration · Comfort · Glow
          </p>

          <a 
            href="#"
            className="inline-block mt-4 text-sm transition-opacity hover:opacity-60"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Explore This Ritual →
          </a>
        </div>
      </div>

      {/* PRODUCT 02 — ANCIENT ELIXIR KUMKUMADI THAILAM */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Editorial Copy (appears first on desktop, reversed order) */}
        <div ref={product02CopyRef} className="space-y-6 order-2 lg:order-1">
          <p 
            className="text-xs tracking-[0.2em] uppercase opacity-60"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            FACE RITUAL
          </p>

          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Ancient Elixir
            <br />
            Kumkumadi Thailam
          </h2>

          <p 
            className="text-base md:text-lg leading-relaxed opacity-80"
            style={{ 
              fontFamily: 'var(--font-secondary)',
              maxWidth: '42ch',
            }}
          >
            An ancient facial oil ritual rooted in Ayurvedic wisdom. A blend of time-honored ingredients that support radiance, balance, and deep nourishment.
          </p>

          <p 
            className="text-sm opacity-60"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Radiance · Balance · Renewal
          </p>

          <a 
            href="#"
            className="inline-block mt-4 text-sm transition-opacity hover:opacity-60"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Enter the Night Ritual →
          </a>
        </div>

        {/* Image */}
        <div 
          ref={product02ImageRef}
          className="relative w-full order-1 lg:order-2"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-stone-100">
            <Image
              src="https://images.unsplash.com/photo-1598449426314-8b02525e8733"
              alt="Ancient Elixir Kumkumadi Thailam"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
