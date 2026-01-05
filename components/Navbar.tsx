'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'about', label: 'About' },
  { id: 'products', label: 'Products' },
  { id: 'journal', label: 'Journal' },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState('home');

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Set up ScrollTrigger for each section to detect active state
    const triggers: ScrollTrigger[] = [];

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (!section) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(item.id),
        onEnterBack: () => setActiveSection(item.id),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Instant scroll for reduced motion
      section.scrollIntoView({ behavior: 'auto' });
    } else {
      // Smooth GSAP scroll
      gsap.to(window, {
        duration: 0.5,
        scrollTo: {
          y: section,
          offsetY: 0,
        },
        ease: 'power2.out',
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      aria-label="Main navigation"
    >
      <ul className="flex flex-col gap-8">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          
          return (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className="flex items-center gap-3 group transition-opacity duration-300"
                style={{
                  fontFamily: 'var(--font-sans)',
                  opacity: isActive ? 1 : 0.4,
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Text label */}
                <span
                  className="text-sm tracking-wide transition-colors duration-300"
                  style={{
                    color: isActive ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                  }}
                >
                  {item.label}
                </span>
                
                {/* Indicator dot/line */}
                <span
                  className="transition-all duration-300"
                  style={{
                    width: isActive ? '20px' : '8px',
                    height: '1px',
                    backgroundColor: isActive ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                    opacity: isActive ? 1 : 0.3,
                  }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
