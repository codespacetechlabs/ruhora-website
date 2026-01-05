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
    <section className="py-24 px-6 bg-stone-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-light tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Morning Body Ritual
          </h2>
          <p 
            className="text-sm tracking-wide opacity-70"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            A practice of presence
          </p>
        </div>

        {/* Steps will reveal progressively */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className="ritual-step opacity-0 flex gap-8">
              <div 
                className="flex-shrink-0 w-12 h-12 rounded-full border border-current flex items-center justify-center text-sm opacity-70"
                style={{ fontFamily: 'var(--font-secondary)' }}
              >
                {step.number}
              </div>
              <div className="flex-1 pt-2">
                <h3 
                  className="text-2xl mb-3"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  {step.title}
                </h3>
                <p 
                  className="leading-relaxed opacity-80"
                  style={{ fontFamily: 'var(--font-secondary)' }}
                >
                  {step.instruction}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Affirmation - appears last */}
        <div className="mt-16 text-center ritual-affirmation opacity-0">
          <p 
            className="text-lg italic font-light"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            &ldquo;I honor my body as a sacred vessel&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
