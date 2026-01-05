import { Hero } from '@/components/sections/Hero';
import { BrandEssence } from '@/components/sections/BrandEssence';
import { AboutBrand } from '@/components/sections/AboutBrand';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { Ritual } from '@/components/sections/Ritual';
import { Journal } from '@/components/sections/Journal';
import { AnimationProvider } from '@/components/AnimationProvider';
import { Navbar } from '@/components/Navbar';

export default function Home() {
  return (
    <AnimationProvider>
      <Navbar />
      <main className="space-y-24 lg:space-y-32">
        <div id="home">
          <Hero />
        </div>
        <div id="philosophy">
          <BrandEssence />
        </div>
        <div id="about">
          <AboutBrand />
        </div>
        <div id="products">
          <ProductShowcase />
        </div>
        <div id="ritual">
          <Ritual />
        </div>
        <Journal />
        
        {/* Soft footer */}
        <footer className="py-16 px-6 text-center border-t border-current/10">
          <p 
            className="text-xs tracking-widest uppercase opacity-60 mb-8"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            RUहORA
          </p>
          <p 
            className="text-sm opacity-50"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Skin to Soul — Where Skincare Meets Stillness
          </p>
        </footer>
      </main>
    </AnimationProvider>
  );
}
