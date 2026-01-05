'use client';

import { useRef } from 'react';

/**
 * Footer Section
 * 
 * Minimalist, emotionally grounded footer that feels like the last breath
 * of stillness before leaving the site.
 * 
 * Structure:
 * 1. Brand Block (logo + tagline)
 * 2. Divider
 * 3. Founder's Note
 * 4. Social Links
 * 5. Copyright
 */

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <footer
      ref={sectionRef}
      className="section-gradient-fade bg-canvas-fade relative overflow-hidden"
      style={{
        paddingTop: 'clamp(48px, 12vw, 120px)',
        paddingBottom: 'clamp(48px, 12vw, 120px)',
      }}
    >
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
        
        {/* Brand Block */}
        <div className="footer-brand mb-12 sm:mb-16">
          {/* Logo */}
          <div className="footer-logo mb-4 sm:mb-6 flex justify-center">
            <img 
              src="/logo.png" 
              alt="RUHORA" 
              width="120" 
              height="auto"
              style={{ opacity: 0.9 }}
            />
          </div>

          {/* Tagline */}
          <p 
            className="footer-tagline text-base opacity-0"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--ink-secondary)',
              letterSpacing: '0.025em',
            }}
          >
            From Skin to Soul — Where Skincare Meets Stillness
          </p>
        </div>

        {/* Divider */}
        <div className="footer-divider flex justify-center mb-12 sm:mb-16 opacity-0">
          <div 
            className="h-[1px] w-full max-w-[640px]"
            style={{
              backgroundColor: 'var(--ink-muted)',
              opacity: 0.25,
            }}
          />
        </div>

        {/* Founder's Note */}
        <div className="footer-note mb-8 sm:mb-12 max-w-[720px] mx-auto">
          {/* Label */}
          <p 
            className="footer-note-label text-xs uppercase tracking-[0.2em] mb-4 sm:mb-6 opacity-0"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--ink-muted)',
            }}
          >
            Founder's Note
          </p>

          {/* Founder's Message */}
          <div 
            className="footer-note-text text-base opacity-0"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--ink-primary)',
              lineHeight: 1.7,
            }}
          >
            <p className="mb-4">
              At our brand, we believe skincare is more than a routine—it is a ritual that nurtures both skin and soul. 
              Every product is crafted with intention, blending time-honored wisdom and modern luxury to create moments 
              of calm, radiance, and self-care.
            </p>
            <p>
              Our mission is simple: to help you pause, indulge, and reconnect with yourself—turning everyday rituals 
              into experiences of true well-being.
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="footer-social flex justify-center items-center gap-6 mb-12 opacity-0">
          {/* WhatsApp */}
          <a
            href="https://wa.me/9724277883"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect on WhatsApp"
            className="footer-social-link transition-all duration-300 hover:scale-105"
          >
            <img 
              src="/images/social-media/whatsapp.svg" 
              alt="WhatsApp" 
              width="24" 
              height="24"
              style={{ filter: 'opacity(0.7)' }}
            />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/ruhora.in"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
            className="footer-social-link transition-all duration-300 hover:scale-105"
          >
            <img 
              src="/images/social-media/instagram.svg" 
              alt="Instagram" 
              width="24" 
              height="24"
              style={{ filter: 'opacity(0.7)' }}
            />
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/profile.php?id=61584106618581"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Facebook"
            className="footer-social-link transition-all duration-300 hover:scale-105"
          >
            <img 
              src="/images/social-media/facebook.svg" 
              alt="Facebook" 
              width="24" 
              height="24"
              style={{ filter: 'opacity(0.7)' }}
            />
          </a>
        </div>

        {/* Copyright */}
        <p 
          className="footer-copyright text-sm opacity-0"
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--ink-muted)',
          }}
        >
          © 2026 RUHORA. All rights reserved.
        </p>
      </div>

      {/* Hover effect styles */}
      <style jsx>{`
        .footer-social-link:hover img {
          filter: opacity(1);
        }
      `}</style>
    </footer>
  );
}
