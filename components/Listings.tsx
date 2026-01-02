'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getAllProperties, subscribeToProperties } from '@/lib/firebaseService';
import { Property } from '@/types/property';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Listings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // -- PAGINATION STATES --
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  const sectionRef = useRef<HTMLElement>(null);
  const searchParams = useSearchParams();

  // Animation Observer
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
  }, [filteredProperties, currentPage]);

  // Fetch Data
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

  // -- FILTERING LOGIC --
  useEffect(() => {
    if (properties.length === 0) return;

    const tab = searchParams.get('tab');
    const state = searchParams.get('state');
    const city = searchParams.get('city');
    const type = searchParams.get('type');

    const filtered = properties.filter(prop => {
      let matches = true;

      // 1. Tab Filter
      if (tab && tab !== 'Buy' && tab !== 'Rent') {
         matches = matches && (prop.type === tab);
      }

      // 2. State Filter
      if (state) {
        const propState = prop.state || '';
        const propLoc = prop.location || '';
        matches = matches && (propState === state || propLoc.includes(state));
      }

      // 3. City Filter
      if (city) {
        const propCity = prop.city || '';
        const propLoc = prop.location || '';
        matches = matches && (propCity === city || propLoc.includes(city));
      }

      // 4. Property Category Filter
      if (type && type !== 'Any') {
         matches = matches && (prop.category === type);
      }

      return matches;
    });

    setFilteredProperties(filtered);
    setCurrentPage(1); 
  }, [properties, searchParams]);

  // -- PAGINATION CALCULATION --
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Loading properties...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-600">{error}</div>;
  }

  return (
    <section
      ref={sectionRef}
      id="listings"
      className="py-8 md:py-12 bg-gradient-to-b from-white via-stone-50 to-white min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-2 md:px-6"> {/* Reduced px for mobile */}
        
        {/* Results Count */}
        <div className="mb-4 md:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
            <h2 className="text-lg md:text-2xl font-bold text-gray-800">
                {filteredProperties.length} Properties Found
            </h2>
            
            {(searchParams.get('city') || searchParams.get('state')) && (
              <div className="text-xs md:text-sm text-stone-500 bg-stone-100 px-3 py-1 rounded-full self-start">
                Filtering by: {searchParams.get('city') ? `${searchParams.get('city')}, ` : ''}{searchParams.get('state')}
              </div>
            )}
        </div>

        {/* GRID: CHANGED TO grid-cols-2 FOR MOBILE */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
            {currentItems.map((prop) => (
              <Link
                href={`/property/${prop.id}`}
                key={prop.id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-200 hover:-translate-y-1 flex flex-col"
              >
                {/* Image - Reduced Height for Mobile */}
                <div className="relative h-32 md:h-48 bg-stone-100 overflow-hidden">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute top-2 left-2 bg-white px-1.5 py-0.5 md:px-2 text-[8px] md:text-[10px] font-bold uppercase rounded-sm shadow-sm">
                    {prop.type}
                  </div>
                </div>

                {/* Content - Compact Padding for Mobile */}
                <div className="p-2 md:p-4 space-y-1 md:space-y-2 flex-1 flex flex-col">
                  {/* Price - Smaller Font on Mobile */}
                  <div className="text-sm md:text-xl font-bold text-[#6633cc]">
                    {prop.price}
                  </div>

                  {/* Title - Truncate Logic */}
                  <h3 className="text-xs md:text-sm font-semibold line-clamp-2 text-gray-800 leading-tight">
                    {prop.title}
                  </h3>

                  {/* Location */}
                  <p className="text-[10px] md:text-xs text-stone-500 line-clamp-1 flex items-center gap-1">
                    📍 {prop.location}
                  </p>

                  <div className="mt-auto pt-2 border-t border-stone-100 space-y-0.5 md:space-y-1">
                    <p className="text-[10px] md:text-xs text-stone-600 truncate">
                      <span className="font-semibold">Specs:</span> {prop.specs}
                    </p>
                    <p className="text-[10px] md:text-xs text-stone-600 truncate">
                      <span className="font-semibold">Furnish:</span> {prop.furnishing}
                    </p>
                  </div>

                  <span className="block mt-1 md:mt-2 text-[10px] md:text-xs font-bold text-[#6633cc] group-hover:underline">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
             <p className="text-gray-500 font-medium text-lg">No properties found.</p>
             <button 
               onClick={() => window.location.href = '/search'} 
               className="mt-4 text-[#6633cc] font-bold hover:underline"
             >
               Clear Filters
             </button>
          </div>
        )}

        {/* PAGINATION UI */}
        {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 md:mt-12 gap-1 md:gap-2">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1.5 md:p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={16} />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`w-8 h-8 md:w-10 md:h-10 text-xs md:text-base rounded-md font-semibold transition-colors ${
                            currentPage === i + 1
                                ? 'bg-[#6633cc] text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 md:p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        )}

      </div>
    </section>
  );
}