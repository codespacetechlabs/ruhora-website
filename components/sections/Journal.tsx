export function Journal() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 
          className="text-4xl md:text-5xl font-light tracking-tight"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          The Journal
        </h2>
      </div>

      {/* Minimal animation - only opacity fades */}
      <div className="space-y-12">
        <article className="journal-article opacity-0 border-b border-current/10 pb-12">
          <p 
            className="text-xs tracking-widest uppercase mb-4 opacity-60"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Reflection
          </p>
          <h3 
            className="text-2xl mb-4"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            The Art of Slowness
          </h3>
          <p 
            className="leading-loose opacity-80"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            In a world that moves too fast, we invite you to pause. To breathe. To feel the texture of time against your skin.
          </p>
        </article>

        <article className="journal-article opacity-0 border-b border-current/10 pb-12">
          <p 
            className="text-xs tracking-widest uppercase mb-4 opacity-60"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Wisdom
          </p>
          <h3 
            className="text-2xl mb-4"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Ancient Roots, Modern Ritual
          </h3>
          <p 
            className="leading-loose opacity-80"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Every ingredient tells a story. Every ritual honors a tradition thousands of years in the making.
          </p>
        </article>
      </div>
    </section>
  );
}
