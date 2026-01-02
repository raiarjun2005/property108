'use client';

import { Suspense } from 'react'; // 1. Import Suspense
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WhyUs from '@/components/WhyUs';
import Listings from '@/components/Listings';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 5. Recent Listings */}
      <div id="listings">
        <div className="text-center mt-10 mb-4">
          <h2 className="text-3xl font-serif font-bold text-stone-900">Featured Listings</h2>
          <p className="text-stone-500">Explore our latest properties</p>
        </div>

        {/* 🔥 FIX: Wrap Listings in Suspense to fix the build error */}
        <Suspense fallback={<div className="text-center py-10">Loading listings...</div>}>
          <Listings />
        </Suspense>
      </div>


      {/* 3. About Section */}
      <About />

      {/* 4. Why Choose Us Section */}
      <WhyUs />


      {/* 6. Footer */}
      <footer className="bg-stone-900 text-white py-8 text-center mt-12">
        <p>&copy; {new Date().getFullYear()} Property108. All rights reserved.</p>
      </footer>
    </main>
  );
}