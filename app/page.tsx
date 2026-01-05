import { Hero } from '@/components/sections/Hero';
import { BrandEssence } from '@/components/sections/BrandEssence';
import { AboutBrand } from '@/components/sections/AboutBrand';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { BeginYourRitual } from '@/components/sections/BeginYourRitual';
import { Ritual } from '@/components/sections/Ritual';
import { Journal } from '@/components/sections/Journal';
import { Footer } from '@/components/sections/Footer';
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
        {/* <div id="products">
          <ProductShowcase />
        </div> */}
        <div id="products">
          <BeginYourRitual />
        </div>
        {/* <div id="ritual">
          <Ritual />
        </div> */}
        <div id="journal">
          <Journal />
        </div>
      </main>
        
      {/* Footer - Outside main to have its own spacing */}
      <Footer />
    </AnimationProvider>
  );
}
