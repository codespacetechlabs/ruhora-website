'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { RitualCard } from '@/components/RitualCard';

/**
 * BeginYourRitual Section
 * 
 * Editorial product showcase featuring exactly 2 products
 * with alternating layout and museum-like presentation.
 * 
 * Design Philosophy:
 * - Story-first commerce
 * - Calm, intentional, spacious
 * - Not a grid or catalog
 */

// Ritual Content
const RITUAL_CONTENT = {
  'product-1': {
    ritualImage: '/products/product-1/product_1.jpg',
    steps: [
      {
        title: 'Step 1: Revive & Energize',
        description: 'Begin with a warm or cool shower to awaken your senses.',
        icon: (
          <Image
            src="/icons/rituals/energize-icon.png"
            alt="Revive & Energize"
            width={28}
            height={28}
            style={{ opacity: 0.85 }}
          />
        ),
      },
      {
        title: 'Step 2: Hydrate & Nourish',
        description: 'Apply Hydrashine Skin Oil Gel generously on damp skin.',
        icon: (
          <Image
            src="/icons/rituals/applying-serum-icon.png"
            alt="Hydrate & Nourish"
            width={28}
            height={28}
            style={{ opacity: 0.85 }}
          />
        ),
      },
      {
        title: 'Step 3: Massage & Glow',
        description: 'Massage in upward strokes, leaving skin soft, supple, and radiant.',
        icon: (
          <Image
            src="/icons/rituals/skin-care-icon.png"
            alt="Massage & Glow"
            width={28}
            height={28}
            style={{ opacity: 0.85 }}
          />
        ),
      },
      {
        title: 'Step 4: Mindful Affirmation',
        description: '"I step into the day with radiant skin, vitality, and a calm, confident mind."',
        icon: (
          <Image
            src="/icons/rituals/meditating-icon.png"
            alt="Mindful Affirmation"
            width={28}
            height={28}
            style={{ opacity: 0.85 }}
          />
        ),
      },
    ],
  },
  'product-2': {
    ritualImage: '/products/product-2/product_2.png',
    steps: [
      {
        title: 'Step 1: Cleanse & Center',
        description: "Gently cleanse your face to remove the day's impurities.",
        icon: (
          <Image
            src="/icons/rituals/cleansing-face-icon.png"
            alt="Cleanse & Center"
            width={28}
            height={28}
            style={{ opacity: 0.85 }}
          />
        ),
      },
      {
        title: 'Step 2: Massage & Nourish',
        description: "Warm 2–3 drops between your palms and massage onto face and neck using slow, circular motions.",
        icon: (
          <Image
            src="/icons/rituals/skin-care-icon.png"
            alt="Massage & Nourish"
            width={28}
            height={28}
            style={{ opacity: 0.85 }}
          />
        ),
      },
      {
        title: 'Step 3: Hydrate & Lock',
        description: 'Allow the oil to absorb naturally, sealing in moisture and radiance.',
        icon: (
          <Image
            src="/icons/rituals/moisturizing-icon.png"
            alt="Hydrate & Lock"
            width={28}
            height={28}
            style={{ opacity: 0.85 }}
          />
        ),
      },
      {
        title: 'Step 4: Mindful Affirmation',
        description: '"I release the day with gratitude. My skin glows, my mind is calm, and I welcome restorative rest."',
        icon: (
          <Image
            src="/icons/rituals/meditating-icon.png"
            alt="Mindful Affirmation"
            width={28}
            height={28}
            style={{ opacity: 0.85 }}
          />
        ),
      },
    ],
  },
};

const PRODUCTS = [
  {
    id: 'product-1',
    name: 'HydraShine Skin Oil Gel',
    eyebrow: 'BODY RITUAL',
    description: 'A refined gel-based body oil that melts into the skin, enveloping it in hydration and a soft, natural glow. Designed for daily rituals that restore comfort and calm.',
    traits: 'Hydration · Comfort · Glow',
    ingredients: [
      {
        name: 'Cocoa Butter',
        description: 'Deep nourishment that seals in softness',
        icon: '/ingredients/cocoa-butter-icon.png',
      },
      {
        name: 'Cold-Pressed Oils',
        description: 'Lightweight hydration that melts into skin',
        icon: '/ingredients/cold-pressed-oil-icon.png',
      },
      {
        name: 'Botanical Emollients',
        description: 'Support comfort and elasticity',
        icon: '/ingredients/botanical-emollients-icon.png',
      },
    ],
    imagePath: '/products/product-1/product_1.jpg',
    imageAlt: 'HydraShine Skin Oil Gel',
    cta: 'Begin the Morning Ritual',
    imagePosition: 'left' as const,
    whatsappMessage: "Hello ✨\nI'd like to order HYDRASHINE SKIN OIL GEL WITH COCOA BUTTER as a part of my daily self-care and nourishment ritual for skin and body.\n\nPlease guide me with the details to proceed.\nThank you 🌿",
  },
  {
    id: 'product-2',
    name: 'Ancient Elixir Kumkumadi Thailam',
    eyebrow: 'FACE RITUAL',
    description: 'An ancient facial oil ritual rooted in Ayurvedic wisdom. A blend of time-honored ingredients that support radiance, balance, and deep nourishment.',
    traits: 'Radiance · Balance · Renewal',
    ingredients: [
      {
        name: 'Goat Milk',
        description: 'Gently nourishes, softens, and comforts skin',
        icon: '/ingredients/goat-milk-icon.png',
      },
      {
        name: 'Sandalwood',
        description: 'Calming, cooling, and grounding for the skin',
        icon: '/ingredients/sandalwood-icon.png',
      },
      {
        name: 'Kesar (Saffron)',
        description: 'Traditionally revered for radiant, luminous skin',
        icon: '/ingredients/saffron-icon.png',
      },
    ],
    imagePath: '/products/product-2/product_2.png',
    imageAlt: 'Ancient Elixir Kumkumadi Thailam',
    cta: 'Enter the Night Ritual',
    imagePosition: 'right' as const,
    whatsappMessage: "Hello ✨\nI'd love to begin my wellness ritual with ANCIENT ELIXIR KUMKUMADI THAILAM as a part of my journey towards balanced skin and inner well-being.\n\nPlease share the details to help me proceed with this order.\nThank you 🌿",
  },
];

export function BeginYourRitual() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeRitual, setActiveRitual] = useState<string | null>(null);

  const handleOpenRitual = (productId: string) => {
    setActiveRitual(productId);
  };

  const handleCloseRitual = () => {
    setActiveRitual(null);
  };

  const activeProduct = PRODUCTS.find((p) => p.id === activeRitual);
  const activeRitualContent = activeRitual ? RITUAL_CONTENT[activeRitual as keyof typeof RITUAL_CONTENT] : null;

  return (
    <section
      ref={sectionRef}
      className="ritual-section section-gradient-fade bg-canvas-fade relative px-4 sm:px-6 lg:px-12"
      style={{
        paddingTop: 'clamp(3rem, 8vw, var(--space-ritual))',
        paddingBottom: 'clamp(3rem, 8vw, var(--space-ritual))',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <header className="text-center mb-12 sm:mb-20 lg:mb-32">
          <h2
            className="ritual-section-title text-3xl sm:text-4xl lg:text-5xl mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--ink-primary)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              opacity: 0,
              transform: 'translateY(12px)',
            }}
          >
            Begin Your Ritual
          </h2>
          <p
            className="ritual-section-subtitle text-base lg:text-lg max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--ink-secondary)',
              lineHeight: 1.6,
              opacity: 0,
              transform: 'translateY(12px)',
            }}
          >
            Two foundational rituals, each a quiet invitation to deeper care
          </p>
        </header>

        {/* Product Blocks */}
        <div className="space-y-16 sm:space-y-24 lg:space-y-32 xl:space-y-40">
          {PRODUCTS.map((product, index) => (
            <article
              key={product.id}
              className={`ritual-product-block grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                product.imagePosition === 'left' ? '' : 'lg:direction-rtl'
              }`}
              data-product-id={product.id}
            >
              {/* Image Block */}
              <div
                className={`ritual-product-image-wrapper ${
                  product.imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'
                }`}
                style={{
                  opacity: 0,
                  transform: 'translateY(20px)',
                }}
              >
                <div
                  className="ritual-product-image relative overflow-hidden"
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-soft)',
                    aspectRatio: '3/4',
                    maxWidth: '480px',
                    margin: product.imagePosition === 'left' ? '0 auto 0 0' : '0 0 0 auto',
                    width: '100%',
                  }}
                >
                  <Image
                    src={product.imagePath}
                    alt={product.imageAlt}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    sizes="(max-width: 1024px) 100vw, 480px"
                    priority={index === 0}
                  />
                </div>
              </div>

              {/* Text Block */}
              <div
                className={`ritual-product-content flex flex-col justify-center ${
                  product.imagePosition === 'left' ? 'lg:order-2 lg:pl-4 xl:pl-8' : 'lg:order-1 lg:pr-4 xl:pr-8'
                }`}
              >
                {/* Eyebrow */}
                <p
                  className="ritual-product-eyebrow text-xs tracking-widest uppercase mb-4"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--ink-muted)',
                    letterSpacing: '0.15em',
                    opacity: 0,
                    transform: 'translateY(8px)',
                  }}
                >
                  {product.eyebrow}
                </p>

                {/* Product Name */}
                <h3
                  className="ritual-product-name text-3xl lg:text-4xl mb-5"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--ink-primary)',
                    fontWeight: 400,
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                    opacity: 0,
                    transform: 'translateY(8px)',
                  }}
                >
                  {product.name}
                </h3>

                {/* Description */}
                <p
                  className="ritual-product-description text-base lg:text-lg mb-6"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.7,
                    maxWidth: '480px',
                    opacity: 0,
                    transform: 'translateY(8px)',
                  }}
                >
                  {product.description}
                </p>

                {/* Key Ingredients */}
                <div
                  className="ritual-product-ingredients mb-8"
                  style={{
                    opacity: 0,
                    transform: 'translateY(8px)',
                  }}
                >
                  <h4
                    className="text-xs tracking-widest uppercase mb-5"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--ink-muted)',
                      letterSpacing: '0.12em',
                    }}
                  >
                    Key Ingredients
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
                    {product.ingredients.map((ingredient, idx) => (
                      <div
                        key={idx}
                        className="ritual-ingredient flex-1 flex gap-4"
                        style={{
                          opacity: 0,
                          transform: 'translateY(8px)',
                        }}
                      >
                        <div className="flex-shrink-0">
                          <Image
                            src={ingredient.icon}
                            alt={ingredient.name}
                            width={48}
                            height={48}
                            style={{
                              opacity: 0.75,
                              filter: 'grayscale(20%)',
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h5
                            className="text-sm font-medium mb-1"
                            style={{
                              fontFamily: 'var(--font-sans)',
                              color: 'var(--ink-primary)',
                              fontWeight: 500,
                            }}
                          >
                            {ingredient.name}
                          </h5>
                          <p
                            className="text-xs"
                            style={{
                              fontFamily: 'var(--font-sans)',
                              color: 'var(--ink-muted)',
                              lineHeight: 1.5,
                              fontStyle: 'italic',
                            }}
                          >
                            {ingredient.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Traits */}
                <p
                  className="ritual-product-traits text-sm mb-8"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--ink-muted)',
                    opacity: 0,
                    transform: 'translateY(8px)',
                  }}
                >
                  {product.traits}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4" style={{ opacity: 0, transform: 'translateY(8px)' }}>
                  <button
                    onClick={() => handleOpenRitual(product.id)}
                    className="btn-secondary inline-flex ritual-product-cta"
                    style={{ fontFamily: 'var(--font-sans)' }}
                    aria-label={`${product.cta} - ${product.name}`}
                  >
                    {product.cta} →
                  </button>
                  <a
                    // href={`https://wa.me/9724277883?text=${encodeURIComponent(product.whatsappMessage)}`}
                    href={`https://api.whatsapp.com/send/?phone=9724277883&text=${encodeURIComponent(product.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Know More on Whatsapp →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Section-Level CTA */}
        <footer className="text-center mt-16 sm:mt-24 lg:mt-32 xl:mt-40">
          <p
            className="ritual-closing-text text-base sm:text-lg lg:text-xl mb-6 sm:mb-8"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--ink-secondary)',
              fontStyle: 'italic',
              opacity: 0,
              transform: 'translateY(8px)',
            }}
          >
            Every ritual begins with intention.
          </p>
          <div style={{ opacity: 0, transform: 'translateY(8px)' }}>
            <button
              className="ritual-final-cta group relative inline-flex items-center px-10 py-5 text-base transition-opacity duration-300"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--bg-canvas)',
                backgroundColor: 'var(--brand-evergreen)',
                border: 'none',
                borderRadius: 'var(--radius-xs)',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
              aria-label="Explore the Collection"
            >
              Explore the Collection
            </button>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .ritual-product-cta:hover {
          opacity: 0.85;
        }
        
        .ritual-final-cta:hover {
          opacity: 0.92;
        }

        @media (prefers-reduced-motion: reduce) {
          .ritual-section-title,
          .ritual-section-subtitle,
          .ritual-product-image-wrapper,
          .ritual-product-eyebrow,
          .ritual-product-name,
          .ritual-product-description,
          .ritual-product-ingredients,
          .ritual-ingredient,
          .ritual-product-traits,
          .ritual-product-cta,
          .ritual-closing-text,
          .ritual-final-cta {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Ritual Card Overlay */}
      {activeProduct && activeRitualContent && (
        <RitualCard
          isOpen={activeRitual !== null}
          onClose={handleCloseRitual}
          productName={activeProduct.name}
          eyebrow={activeProduct.eyebrow}
          ritualImage={activeRitualContent.ritualImage}
          steps={activeRitualContent.steps}
          whatsappMessage={activeProduct.whatsappMessage}
        />
      )}
    </section>
  );
}
