'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { GSAP_EASE } from '@/lib/gsap-config';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Image from 'next/image';

interface JournalCardProps {
  title: string;
  preview: string;
  fullText: string;
  image: string;
  alt: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export function JournalCard({
  title,
  preview,
  fullText,
  image,
  alt,
  isExpanded,
  onToggle,
}: JournalCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const fullTextRef = useRef<HTMLParagraphElement>(null);
  const prevExpandedRef = useRef(isExpanded);
  const reducedMotion = useReducedMotion();

  // Handle expansion/collapse animation when isExpanded changes
  useEffect(() => {
    if (!fullTextRef.current || !contentRef.current) return;

    const fullTextElement = fullTextRef.current;
    const contentElement = contentRef.current;
    const prevExpanded = prevExpandedRef.current;

    // Only animate if the expanded state actually changed
    if (prevExpanded === isExpanded) {
      return;
    }

    // Update ref for next render
    prevExpandedRef.current = isExpanded;

    if (reducedMotion) {
      // Instant toggle for reduced motion
      if (isExpanded) {
        fullTextElement.style.display = 'block';
        fullTextElement.style.opacity = '1';
        fullTextElement.style.height = 'auto';
      } else {
        fullTextElement.style.display = 'none';
        fullTextElement.style.opacity = '0';
      }
      return;
    }

    if (isExpanded) {
      // EXPAND: smooth reveal
      fullTextElement.style.display = 'block';
      
      const fullHeight = fullTextElement.scrollHeight;

      gsap.fromTo(
        fullTextElement,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: fullHeight,
          opacity: 1,
          duration: 0.5,
          ease: GSAP_EASE.gentle,
          onComplete: () => {
            fullTextElement.style.height = 'auto';
          },
        }
      );

      // Subtle card lift
      gsap.to(contentElement, {
        y: -4,
        duration: 0.4,
        ease: GSAP_EASE.gentle,
      });
    } else {
      // COLLAPSE: smooth hide
      gsap.to(fullTextElement, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: GSAP_EASE.gentle,
        onComplete: () => {
          fullTextElement.style.display = 'none';
        },
      });

      // Return to original position
      gsap.to(contentElement, {
        y: 0,
        duration: 0.4,
        ease: GSAP_EASE.gentle,
      });
    }
  }, [isExpanded, reducedMotion]);

  const handleToggle = () => {
    // Trigger parent state update first
    onToggle();
  };

  return (
    <article
      ref={contentRef}
      className="journal-card group"
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-soft)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: '280px',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div style={{ padding: 'var(--space-5)' }}>
        <h3
          className="heading-m mb-4"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-heading-m)',
            color: 'var(--ink-primary)',
            lineHeight: 'var(--leading-tight)',
          }}
        >
          {title}
        </h3>

        <p
          className="body-l mb-4"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body-l)',
            color: 'var(--ink-secondary)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          {preview}
        </p>

        {/* Full text (expandable) */}
        <div
          ref={fullTextRef}
          style={{
            display: 'none',
            overflow: 'hidden',
            opacity: 0,
            marginBottom: 'var(--space-4)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-body-m)',
              color: 'var(--ink-secondary)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            {fullText}
          </p>
        </div>

        {/* Read more button */}
        <button
          onClick={handleToggle}
          aria-expanded={isExpanded}
          className="read-more-btn"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body-m)',
            color: 'var(--brand-evergreen)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 0,
            transition: 'color 0.3s ease',
          }}
        >
          {isExpanded ? 'Show less' : 'Read more'} 
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
