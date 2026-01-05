# RUहORA — Luxury Wellness Skincare Website

**Skin to Soul — Where Skincare Meets Stillness**

A premium, ritual-driven, editorial website built with Next.js 14 and GSAP ScrollTrigger. No ecommerce. Only stillness, beauty, and motion that whispers.

---

## 🎯 Philosophy

This website embodies:
- **Slow luxury** — unhurried, grounded, never salesy
- **Emotion-driven UX** — entering a quiet private ritual room
- **Scroll as agency** — user controls the pace
- **Accessibility first** — respects reduced motion preferences
- **Performance conscious** — mobile-safe, optimized animations

---

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (minimal utility usage)
- **GSAP + ScrollTrigger**
- **Google Fonts** (Cormorant + Inter)

---

## 📁 Project Structure

```
ruhora-website/
├── app/
│   ├── layout.tsx          # SEO metadata, fonts, global layout
│   ├── page.tsx            # Main page composition
│   └── globals.css         # Brand colors, base styles, reduced motion
│
├── components/
│   ├── AnimationProvider.tsx   # Client-side animation orchestration
│   └── sections/
│       ├── Hero.tsx            # Hero with parallax & fade-in
│       ├── BrandEssence.tsx    # Brand philosophy blocks
│       ├── ProductShowcase.tsx # Editorial product display
│       ├── Ritual.tsx          # Step-by-step ritual guide
│       └── Journal.tsx         # Long-form content
│
├── animations/
│   └── hero.ts             # Isolated Hero animation logic
│
├── hooks/
│   └── useReducedMotion.ts    # Accessibility hook
│
└── lib/
    └── gsap-config.ts      # GSAP plugin registration & presets
```

---

## 🎥 Animation Architecture

### Global Rules
- **Duration:** 0.8–1.5s (slow, deliberate)
- **Easing:** `power1.out`, `power2.out`, `sine.inOut`
- **Distance:** ≤12px (micro-movements)
- **Opacity-first** — transforms as accent
- **No bounce, elastic, or playful easings**

### Hero Section Implementation

**What's Animated:**
1. **Background Parallax** (desktop only)
   - Moves 0.3x slower than scroll
   - Max displacement: 40px
   - Scrub: 0.5 (smooth lag)

2. **Headline Sequence**
   - Fades in 0.3s after page load
   - Staggered: headline → subheadline → CTA
   - Opacity + subtle Y movement (12px)

3. **CTA Breathing Pulse**
   - Continuous opacity: 1 → 0.85 → 1
   - Duration: 3s (sine.inOut)
   - Loops infinitely

4. **Shimmer Overlay**
   - 12s loop (barely perceptible)
   - Opacity: 0 → 0.3 → 0

**Reduced Motion Fallback:**
- All elements shown immediately at full opacity
- No transforms, no loops

### File Isolation
Each animation file:
- Exports a single init function
- Uses `gsap.context()` for scoped animations
- Returns cleanup function
- No cross-file dependencies

---

## ♿ Accessibility

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled or minimized */
}
```

### Implementation
- `useReducedMotion()` hook detects user preference
- Animations conditionally disabled
- Content remains accessible without motion
- Focus styles maintained
- Keyboard navigation unaffected

---

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
### Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

---

## 📐 Design Tokens

### Brand Colors
```css
--color-sand: #f5f1eb      /* Background */
--color-stone: #e8e3da     /* Secondary */
--color-earth: #9b8b7e     /* Accent */
--color-night: #1a1614     /* Text */
--color-ritual: #4a3f38    /* Emphasis */
```

### Typography
- **Serif (Headlines):** Cormorant (300, 400, 500, 600)
- **Sans (Body):** Inter (300, 400, 500)

### Spacing Scale
```css
--space-breath: clamp(2rem, 5vw, 4rem)   /* Section padding */
--space-ritual: clamp(4rem, 10vw, 8rem)  /* Major spacing */
```

---

## 🎬 Next Steps (Not Yet Implemented)

### Additional Sections
- [ ] Product Showcase animations (scroll-linked float)
- [ ] Ingredient Storytelling (progressive reveal)
- [ ] Ritual section animations (step-by-step)
- [ ] Journal fade-ins

### Future Enhancements
- [ ] Add actual ritual background images
- [ ] Implement remaining product sections
- [ ] Add ingredient cards with imagery
- [ ] Build out journal/blog functionality
- [ ] Add founder notes section

---

## 📝 Code Standards

### Animation Principles
1. **Whisper, don't shout** — motion should be felt, not seen
2. **Scroll is agency** — user controls pacing
3. **Cleanup always** — prevent memory leaks
4. **Mobile-first performance** — disable heavy animations on mobile
5. **Respect preferences** — honor reduced motion

### File Conventions
- Animation logic isolated in `/animations`
- Each animation file returns cleanup function
- Client components clearly marked with `'use client'`
- Semantic HTML throughout
- Comments explain "why", not "what"

---

## 🐛 Common Pitfalls Avoided

✅ GSAP plugins registered client-side only  
✅ Animations killed on unmount  
✅ Reduced motion respected  
✅ No layout shift from animations  
✅ Mobile parallax disabled  
✅ ScrollTrigger uses `once: true` for fade-ins  
✅ Cleanup functions prevent memory leaks  

---

**Current Status:** Hero animation implemented and production-ready. Other sections structured but not yet animated.

**View:** [http://localhost:3000](http://localhost:3000)

