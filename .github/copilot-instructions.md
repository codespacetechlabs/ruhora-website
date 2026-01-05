# RUहORA Website — AI Coding Instructions

## Project Philosophy
This is a **luxury wellness skincare website** with a "whisper, don't shout" design philosophy. All motion should feel like breathing—slow, deliberate, barely noticeable but alive. This is **not an e-commerce site**; it's an editorial, ritual-driven experience.

## Tech Stack & Dependencies
- **Next.js 14** (App Router) with React 19
- **TypeScript** (strict mode enabled)
- **GSAP 3.14** + ScrollTrigger for all animations
- **Tailwind CSS 4.0** (minimal utility usage—prefer custom CSS)
- **Fonts:** Cormorant (serif) via CSS var, Inter (sans) via Next.js font loader

## Critical Architecture Patterns

### Animation System (Most Important)
All animations follow a **centralized isolation pattern**:

1. **Animation files** (`animations/*.ts`) export a single `init*Animation()` function that:
   - Accepts `{ reducedMotion: boolean }` as parameter
   - Uses `gsap.context()` for scoped animations and cleanup
   - Returns a cleanup function: `return () => { ctx.revert(); }`
   - Has NO cross-file dependencies

2. **AnimationProvider** (`components/AnimationProvider.tsx`):
   - Client-only component wrapping animated content
   - Calls `registerGSAPPlugins()` once on mount
   - Initializes all section animations after `document.readyState === 'complete'`
   - Manages cleanup on unmount
   - Example: `const cleanupHero = initHeroAnimation({ reducedMotion });`

3. **Accessibility-First**:
   - ALWAYS check `reducedMotion` before animating
   - If true, set elements to final state with `gsap.set()` and return empty cleanup
   - Hook: `useReducedMotion()` from `hooks/useReducedMotion.ts`

### GSAP Configuration (`lib/gsap-config.ts`)
**Never use arbitrary values**—import constants:
```typescript
import { GSAP_EASE, GSAP_DURATION, SCROLL_DEFAULTS } from '@/lib/gsap-config';

// Use these preset values:
GSAP_EASE.soft       // 'power1.out'
GSAP_EASE.gentle     // 'power2.out'
GSAP_EASE.breath     // 'sine.inOut'

GSAP_DURATION.quick  // 0.8s
GSAP_DURATION.normal // 1.2s
GSAP_DURATION.slow   // 1.5s
```

### Brand Animation Rules
- **Duration:** 0.8–1.5s (slow luxury)
- **Movement:** ≤12px vertical or horizontal displacement
- **Easing:** NEVER use `bounce`, `elastic`, or playful easings
- **Opacity-first:** Use opacity changes as primary effect, transforms as accent
- **Once:** Most animations use `once: true` in ScrollTrigger—no repeat scroll triggers

### Section Component Structure
Each section in `components/sections/` follows this pattern:
```tsx
'use client';  // Always client component for refs/animations

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SectionName() {
  const sectionRef = useRef<HTMLElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(elementRef.current, { opacity: 1, y: 0 });
        return;
      }

      // Animation logic...
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return <section ref={sectionRef}>...</section>;
}
```

**Note:** Current implementation has animation logic in BOTH section components AND isolated animation files. The pattern being migrated TO is isolated files (`animations/*.ts`). Prefer that approach for new sections.

## Developer Workflows

### Development Server
```bash
npm run dev  # Runs on http://localhost:3000
npm run build && npm start  # Production build
```

### Testing Reduced Motion
**Chrome DevTools:**
1. Open DevTools (`Cmd+Shift+I`)
2. Command Palette (`Cmd+Shift+P`)
3. Type "Emulate CSS prefers-reduced-motion"
4. Select "reduce" → Refresh page

**Expected:** All animations disabled, content appears at final state immediately.

### Adding New Section Animations
1. Create `animations/section-name.ts` with isolated init function
2. Add cleanup call in `AnimationProvider.tsx`
3. Set initial hidden state in section component: `style={{ opacity: 0, transform: 'translateY(8px)' }}`
4. Reference `ANIMATION_GUIDE.md` for full pattern with code examples

## File Structure Logic

```
animations/         # Isolated animation logic (future pattern)
  hero.ts           # Complete example of isolation pattern

app/
  layout.tsx        # SEO metadata, fonts, global layout
  page.tsx          # Page composition (assembles sections)
  globals.css       # Brand CSS vars, reduced motion CSS rules

components/
  AnimationProvider.tsx  # Animation orchestrator
  sections/              # Page sections (Hero, BrandEssence, etc.)

lib/
  gsap-config.ts    # GSAP presets & plugin registration

hooks/
  useReducedMotion.ts  # Accessibility hook

docs/               # Internal documentation (HERO_TIMELINE.md)
```

## CSS & Styling Conventions

### Brand CSS Variables (`app/globals.css`)
```css
--color-sand: #f5f1eb    /* Background */
--color-stone: #e8e3da
--color-earth: #9b8b7e
--color-night: #1a1614   /* Text */
--color-ritual: #4a3f38

--space-breath: clamp(2rem, 5vw, 4rem)   /* Vertical rhythm */
--space-ritual: clamp(4rem, 10vw, 8rem)  /* Section padding */
```

### Tailwind Usage
- Prefer minimal utilities—this is NOT a utility-first project
- Custom classes in component files for complex layouts
- Use Tailwind primarily for responsive breakpoints and spacing

### Typography
- Headlines: Custom serif loaded via CSS var (Cormorant fallback)
- Body/UI: Inter via Next.js font loader (applied as CSS variable)

## Integration Points

### Next.js Image Optimization
```typescript
// next.config.ts allows remote images from:
remotePatterns: [
  { hostname: 'slowageing.co.uk' },
  { hostname: 'images.unsplash.com' }
]
```

### ScrollTrigger Desktop-Only Pattern
```typescript
ScrollTrigger.matchMedia({
  '(min-width: 1024px)': () => {
    // Desktop-only animations (e.g., parallax)
  },
});
```

## Common Pitfalls

1. **DO NOT** register GSAP plugins in section components—use `registerGSAPPlugins()` from `lib/gsap-config.ts`
2. **DO NOT** create animations that ignore `reducedMotion` prop
3. **DO NOT** use arbitrary animation values—import from `gsap-config.ts`
4. **DO NOT** create animations without cleanup functions
5. **DO NOT** mix animation logic between section components and `animations/*.ts` files—prefer isolation pattern

## Current Implementation Status
✅ Hero section — fully animated (parallax, fade-ins, breathing pulse)  
✅ AnimationProvider — orchestration layer  
✅ useReducedMotion — accessibility hook  
🚧 Other sections — structured but animations not fully migrated to isolated files

When adding animations to BrandEssence, ProductShowcase, Ritual, or Journal, follow the isolated animation file pattern demonstrated in `animations/hero.ts`.

---

**Reference Files:**
- Animation patterns: `ANIMATION_GUIDE.md`
- Implementation status: `PROJECT_SUMMARY.md`
- Quick commands: `QUICKSTART.md`
- Visual timeline: `docs/HERO_TIMELINE.md`
