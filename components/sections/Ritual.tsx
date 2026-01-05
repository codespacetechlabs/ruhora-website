export function Ritual() {
  const steps = [
    {
      number: '01',
      title: 'Cleanse',
      instruction: 'Begin with warm water and gentle circular motions',
    },
    {
      number: '02',
      title: 'Tone',
      instruction: 'Mist softly, allowing essence to settle on skin',
    },
    {
      number: '03',
      title: 'Nourish',
      instruction: 'Press serum into skin with intention and breath',
    },
  ];

  return (
    <section className="section-wrapper section-gradient-fade bg-soft-fade px-4 sm:px-6" style={{
      paddingTop: 'clamp(3rem, 8vw, 6rem)',
      paddingBottom: 'clamp(3rem, 8vw, 6rem)',
    }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            className="heading-l text-center mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Morning Body Ritual
          </h2>
          <p 
            className="caption"
            style={{ fontFamily: 'var(--font-sans)', opacity: 0.7 }}
          >
            A practice of presence
          </p>
        </div>

        {/* Steps will reveal progressively */}
        <div className="space-y-12 sm:space-y-16">
          {steps.map((step, index) => (
            <div key={index} className="ritual-step opacity-0 flex gap-8">
              <div 
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-sm"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--ink-secondary)',
                  color: 'var(--ink-muted)',
                }}
              >
                {step.number}
              </div>
              <div className="flex-1 pt-2">
                <h3 
                  className="heading-m mb-3"
                  style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-heading-m)' }}
                >
                  {step.title}
                </h3>
                <p 
                  className="body-l"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {step.instruction}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Affirmation - appears last */}
        <div className="mt-12 sm:mt-16 text-center ritual-affirmation opacity-0">
          <p 
            className="body-l italic font-light text-sm sm:text-base lg:text-lg"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink-secondary)' }}
          >
            &ldquo;I honor my body as a sacred vessel&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
