'use client';

import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import SearchFilters from '@/components/SearchFilters'; // Import New Component
import Listings from '@/components/Listings';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      
      {/* 1. Navbar (Fixed at top) */}
      <Navbar />

      {/* 2. Rectangular Filter Box (Replaces Hero) */}
      <Suspense fallback={<div className="h-40 bg-white"></div>}>
        <SearchFilters />
      </Suspense>
      
      {/* 3. Listings Section */}
      <Suspense fallback={<div className="text-center py-20">Loading results...</div>}>
        <Listings />
      </Suspense>
    </main>
  );
}