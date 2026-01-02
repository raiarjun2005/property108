import Hero from '@/components/Hero'; // Adjust path if needed
import Listings from '@/components/Listings'; // Adjust path if needed
import { Suspense } from 'react';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* The Hero component acts as the Filter bar on top. 
         Since we are reusing it, it will look identical to the homepage.
      */}
      <Hero />
      
      {/* Wrap Listings in Suspense because it uses useSearchParams 
         which is required for client-side rendering in Next.js 
      */}
      <Suspense fallback={<div className="text-center py-20">Loading search...</div>}>
        <Listings />
      </Suspense>
    </main>
  );
}