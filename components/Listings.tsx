'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllProperties, subscribeToProperties } from '@/lib/firebaseService';
import { Property } from '@/types/property';

export default function Listings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let unsubscribe: (() => void) | null = null;

    // Set a timeout to prevent infinite loading
    timeoutId = setTimeout(() => {
      if (loading) {
        setError('Unable to connect to database. Please check Firebase configuration.');
        setLoading(false);
      }
    }, 10000); // 10 second timeout

    try {
      // Subscribe to real-time updates
      unsubscribe = subscribeToProperties((data) => {
        clearTimeout(timeoutId);
        setProperties(data);
        setLoading(false);
        setError(null);
      });

      // Fallback: Try to fetch once if subscription fails
      getAllProperties()
        .then((data) => {
          clearTimeout(timeoutId);
          if (data.length > 0) {
            setProperties(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          clearTimeout(timeoutId);
          console.error('Error loading properties:', err);
          const errorMessage = err?.message || err?.code || 'Unknown error';
          if (errorMessage.includes('permission') || errorMessage.includes('PERMISSION_DENIED')) {
            setError('Database permission denied. Please check Firebase security rules.');
          } else if (errorMessage.includes('network') || errorMessage.includes('NETWORK_ERROR')) {
            setError('Network error. Please check your internet connection and Firebase configuration.');
          } else {
            setError('Failed to load properties. Please ensure Firebase Realtime Database is enabled.');
          }
          setLoading(false);
        });
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('Error setting up Firebase connection:', err);
      setError('Firebase connection error. Please check your configuration.');
      setLoading(false);
    }

    // Cleanup subscription on unmount
    return () => {
      clearTimeout(timeoutId);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return (
      <section id="listings" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Curated Portfolio</h2>
            <div className="w-16 h-0.5 bg-stone-300"></div>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="text-stone-500">Loading properties...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="listings" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Curated Portfolio</h2>
            <div className="w-16 h-0.5 bg-stone-300"></div>
          </div>
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="text-red-600 font-medium text-center max-w-2xl">{error}</div>
            <div className="text-stone-600 text-sm text-center max-w-2xl space-y-2">
              <p><strong>Quick Fix:</strong></p>
              <ol className="list-decimal list-inside space-y-1 text-left">
                <li>Go to <a href="https://console.firebase.google.com/project/prop108/database" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Firebase Console</a></li>
                <li>Click "Create Database"</li>
                <li>Choose "Test Mode"</li>
                <li>Select location and enable</li>
                <li>Run: <code className="bg-stone-100 px-2 py-1 rounded">npm run seed:firebase</code></li>
                <li>Refresh this page</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="listings" className="py-12 md:py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-2">Curated Portfolio</h2>
          <div className="w-16 h-0.5 bg-stone-300"></div>
        </div>

        {properties.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-stone-500">No properties available at the moment.</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {properties.map((prop) => (
              <Link 
                href={`/property/${prop.id}`} 
                key={prop.id} 
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 border border-stone-200 hover:border-stone-400 hover:-translate-y-0.5"
              >
                {/* Image Container */}
                <div className="relative h-40 md:h-44 lg:h-40 xl:h-36 overflow-hidden bg-stone-100">
                  <img 
                    src={prop.image} 
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Type Badge */}
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] md:text-[10px] font-bold uppercase tracking-wide text-stone-800 shadow-sm border border-stone-200/50">
                    {prop.type}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-3 md:p-3.5 space-y-2">
                  {/* Price - Most Prominent */}
                  <div className="text-base md:text-lg font-bold text-stone-900 leading-tight">
                    {prop.price}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xs md:text-sm font-semibold text-stone-900 leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-stone-700 transition-colors">
                    {prop.title}
                  </h3>
                  
                  {/* Location */}
                  <div className="flex items-start gap-1.5">
                    <svg className="w-3 h-3 text-stone-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-[10px] md:text-xs text-stone-600 leading-tight line-clamp-1">
                      {prop.location}
                    </p>
                  </div>
                  
                  {/* Specs */}
                  <div className="pt-1.5 border-t border-stone-100">
                    <p className="text-[10px] md:text-xs text-stone-500 font-medium">
                      {prop.specs}
                    </p>
                  </div>
                  
                  {/* View Details Link */}
                  <div className="pt-1">
                    <span className="text-[10px] md:text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                      View Details
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}