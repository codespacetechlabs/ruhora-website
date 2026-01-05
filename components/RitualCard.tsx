'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RitualStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface RitualCardProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  eyebrow: string;
  ritualImage: string;
  steps: RitualStep[];
  whatsappMessage: string;
}

export function RitualCard({
  isOpen,
  onClose,
  productName,
  eyebrow,
  ritualImage,
  steps,
  whatsappMessage,
}: RitualCardProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  // Focus trap and ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !cardRef.current) return;

      const focusableElements = cardRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleFocusTrap);
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleFocusTrap);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // GSAP Animations
  useEffect(() => {
    if (!isOpen || !backdropRef.current || !cardRef.current) return;

    const backdrop = backdropRef.current;
    const card = cardRef.current;

    if (reducedMotion) {
    //   gsap.set(backdrop, { opacity: 0.85 });
      gsap.set(backdrop, { opacity: 1 });
      gsap.set(card, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Backdrop fade in
      tl.fromTo(
        backdrop,
        { opacity: 0 },
        // { opacity: 0.85, duration: 0.4, ease: 'power2.out' }
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      // Card slide up (no opacity change - card stays fully opaque)
      tl.fromTo(
        card,
        { y: 20 },
        { y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );

      // Stagger steps
      tl.fromTo(
        '.ritual-step-item',
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power1.out',
        },
        '-=0.3'
      );
    });

    return () => ctx.revert();
  }, [isOpen, reducedMotion]);

  const handleClose = () => {
    if (reducedMotion) {
      onClose();
      return;
    }

    const backdrop = backdropRef.current;
    const card = cardRef.current;

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(card, {
      y: 20,
      duration: 0.4,
      ease: 'power2.in',
    });

    tl.to(
      backdrop,
      {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      },
      '-=0.2'
    );
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
      style={{
        backgroundColor: 'rgba(26, 22, 20, 0.85)',
        opacity: 1,
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ritual-card-title"
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.15)',
          opacity: 1,
        }}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
          style={{
            backgroundColor: 'rgba(58, 47, 42, 0.1)',
            color: 'var(--ink-primary)',
          }}
          aria-label="Close ritual card"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Card Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column: Image */}
          <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[600px]">
            <div
              className="absolute inset-0"
              style={{
                overflow: 'hidden',
              }}
            >
              <Image
                src={ritualImage}
                alt={`${productName} ritual`}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
            <style jsx>{`
              .absolute.inset-0 {
                border-radius: var(--radius-xl) var(--radius-xl) 0 0;
              }
              @media (min-width: 1024px) {
                .absolute.inset-0 {
                  border-radius: var(--radius-xl) 0 0 var(--radius-xl);
                }
              }
            `}</style>
          </div>

          {/* Right Column: Content */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            {/* Header */}
            <header className="mb-4 sm:mb-6">
              <p
                className="text-xs tracking-widest uppercase mb-3"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--ink-muted)',
                  letterSpacing: '0.15em',
                }}
              >
                {eyebrow}
              </p>
              <h2
                id="ritual-card-title"
                className="text-2xl sm:text-3xl lg:text-4xl"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--ink-primary)',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                {productName}
              </h2>
            </header>

            {/* Ritual Steps */}
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 flex-1">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="ritual-step-item flex gap-4"
                  style={{ opacity: 0 }}
                >
                  <div
                    className="flex-shrink-0 mt-1"
                    style={{
                      opacity: 0.8,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-sm font-medium mb-1"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        color: 'var(--ink-primary)',
                        fontWeight: 500,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        color: 'var(--ink-secondary)',
                        lineHeight: 1.6,
                        fontStyle: step.title.includes('Affirmation') ? 'italic' : 'normal',
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="text-center">
              <a
                href={`https://api.whatsapp.com/send/?phone=9724277883&text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Continue This Ritual →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
