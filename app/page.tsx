// IMPORTANT: No curly braces for default exports
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Listings from '@/components/Listings';
import WhyUs from '@/components/WhyUs';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Listings />
      <WhyUs />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}