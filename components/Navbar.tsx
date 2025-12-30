'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-out ${
      scrolled 
        ? 'bg-white/98 backdrop-blur-md border-b border-stone-200/50 shadow-lg' 
        : 'bg-white/80 backdrop-blur-sm border-b border-stone-200/30'
    }`}>
      
      {/* MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 md:h-16 flex items-center justify-between">
          
          {/* LOGO */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-7 h-7 md:w-8 md:h-8 bg-stone-900 text-white flex items-center justify-center font-serif font-bold text-lg md:text-xl rounded-sm transition-transform group-hover:scale-105">
              P
            </div>
            <span className="text-base md:text-lg font-serif font-bold tracking-tight text-stone-900">
              PROPERTY<span className="text-stone-500 font-light">108</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {['Listings', 'Why Us', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-[10px] xl:text-[11px] font-semibold tracking-[1.5px] text-stone-600 hover:text-stone-900 uppercase transition-all duration-200 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

        
          <div className="hidden lg:block">
            <button className="bg-stone-900 text-white px-5 xl:px-6 py-2 xl:py-2.5 rounded-sm text-[10px] xl:text-[11px] font-semibold tracking-[1.5px] hover:bg-stone-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 uppercase shadow-sm">
              Inquire Now
            </button>
          </div>


          <button
            className="lg:hidden text-stone-900 p-2 -mr-2 transition-colors hover:text-stone-600"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

     
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/98 backdrop-blur-md border-t border-stone-200/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
            {['Listings', 'Why Us', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block py-3 px-2 text-stone-700 font-medium text-sm tracking-wide hover:text-stone-900 hover:bg-stone-50 rounded-sm transition-all duration-200 uppercase text-[11px] tracking-[1px]"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="pt-2 border-t border-stone-100 mt-2">
              <button className="w-full bg-stone-900 text-white px-6 py-3 rounded-sm text-[11px] font-semibold tracking-[1.5px] hover:bg-stone-800 transition-all duration-300 uppercase">
                Inquire Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
