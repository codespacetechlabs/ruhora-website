'use client';

import { useState } from 'react';
import { JournalCard } from '@/components/JournalCard';

const journalEntries = [
  {
    id: 1,
    title: 'The Philosophy of Wellness',
    preview: 'Exploring true wellness as a balance of mind, body, and spirit.',
    fullText:
      'True wellness is more than skin-deep - it is a balance of mind, body, and spirit. At the heart of our brand lies the belief that self-care rituals can be transformative, turning everyday skincare into moments of mindfulness and calm. Each product is designed not just to nourish the skin, but to create a pause in your day, a gentle reminder to honor yourself.',
    image: '/images/journal/the-philosophy-of-wellness.png',
    alt: 'Serene wellness philosophy imagery',
  },
  {
    id: 2,
    title: 'Skincare as a Ritual',
    preview: 'Mindful skincare transforms daily routines into moments of calm.',
    fullText:
      'Luxury skincare is a ritual of intention. The textures, aromas, and touch of each product engage the senses, reducing stress and elevating mood. Applying oil, cream, or serum mindfully encourages presence and calm, helping the mind relax while the body absorbs nourishing botanicals.',
    image: '/images/journal/skincare-as-a-ritual.png',
    alt: 'Mindful skincare ritual moment',
  },
  {
    id: 3,
    title: 'Holistic Benefits',
    preview: 'Restoring skin health while supporting mental well-being.',
    fullText:
      'The impact of mindful skincare extends beyond visible radiance. Consistent care restores the skin health while supporting mental well-being - reducing tension, improving confidence, and creating a sense of harmony. Our philosophy merges ancient wisdom and modern luxury to nurture both body and mind.',
    image: '/images/journal/holistic-benefits.png',
    alt: 'Holistic wellness and meditation',
  },
];

export function Journal() {
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  const handleCardToggle = (cardId: number) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
  };

  return (
    <section
      id="journal"
      className="journal-section section-gradient-fade bg-soft-fade"
      style={{
        padding: 'clamp(3rem, 8vw, var(--space-ritual)) clamp(1.5rem, 4vw, var(--space-4))',
      }}
    >
      <div
        className="max-w-7xl mx-auto"
        style={{
          maxWidth: '1400px',
        }}
      >
        {/* Section Header */}
        <div
          className="text-center mb-16 journal-header"
          style={{
            marginBottom: 'clamp(2.5rem, 6vw, var(--space-7))',
            opacity: 0,
            transform: 'translateY(8px)',
          }}
        >
          <p
            className="caption mb-3"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-caption)',
              color: 'var(--ink-muted)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            JOURNAL
          </p>
          <h2
            className="heading-l mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-heading-l)',
              color: 'var(--ink-primary)',
              lineHeight: 'var(--leading-tight)',
            }}
          >
            The Brand Voice
          </h2>
          <p
            className="body-l"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-body-l)',
              color: 'var(--ink-secondary)',
              lineHeight: 'var(--leading-relaxed)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Essays on wellness as a balance of mind, body, and spirit.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          className="journal-cards"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: 'clamp(1.5rem, 4vw, var(--space-5))',
            alignItems: 'start',
            opacity: 0,
            transform: 'translateY(12px)',
          }}
        >
          {journalEntries.map((entry) => (
            <JournalCard
              key={entry.id}
              title={entry.title}
              preview={entry.preview}
              fullText={entry.fullText}
              image={entry.image}
              alt={entry.alt}
              isExpanded={expandedCardId === entry.id}
              onToggle={() => handleCardToggle(entry.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
