'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getAllProperties, subscribeToProperties } from '@/lib/firebaseService';
import { Property } from '@/types/property';

export default function Listings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el, index) => {
      observer.observe(el);
      (el as HTMLElement).style.transitionDelay = `${(index % 5) * 0.05}s`;
    });

    return () => observer.disconnect();
  }, [properties]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let unsubscribe: (() => void) | null = null;

    timeoutId = setTimeout(() => {
      if (loading) {
        setError('Unable to connect to database.');
        setLoading(false);
      }
    }, 10000);

    try {
      unsubscribe = subscribeToProperties((data) => {
        clearTimeout(timeoutId);
        setProperties(data);
        setLoading(false);
        setError(null);
      });

      getAllProperties().then((data) => {
        clearTimeout(timeoutId);
        if (data.length > 0) setProperties(data);
        setLoading(false);
      });
    } catch (err) {
      clearTimeout(timeoutId);
      setError('Firebase connection error.');
      setLoading(false);
    }

    return () => {
      clearTimeout(timeoutId);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading properties...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-600">{error}</div>;
  }

  return (
    <section
      ref={sectionRef}
      id="listings"
      className="py-12 md:py-20 bg-gradient-to-b from-white via-stone-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {properties.map((prop) => (
            <Link
              href={`/property/${prop.id}`}
              key={prop.id}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-200 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-40 bg-stone-100 overflow-hidden">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
                <div className="absolute top-2 left-2 bg-white px-2 py-0.5 text-[9px] font-bold uppercase">
                  {prop.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-3 space-y-1.5">
                <div className="text-lg font-bold text-stone-900">
                  {prop.price}
                </div>

                <h3 className="text-sm font-semibold line-clamp-2">
                  {prop.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-1">
                  {prop.location}
                </p>

                <div className="pt-1 border-t border-stone-100 space-y-0.5">
                  <p className="text-xs text-stone-500">
                    {prop.specs}
                  </p>

                  {/* 🔥 THIS WAS MISSING */}
                  <p className="text-xs text-stone-600">
                    Furnishing: {prop.furnishing}
                  </p>
                </div>

                <span className="text-xs font-semibold text-blue-600">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
