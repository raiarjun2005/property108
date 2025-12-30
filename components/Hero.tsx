'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

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

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center bg-stone-50 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero.png" 
          alt="Luxury Interior" 
          className="w-full h-full object-cover opacity-90 animate-on-scroll"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/40 to-stone-900/60" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="text-stone-200 text-xs md:text-sm tracking-[0.3em] uppercase mb-6 mt-10 animate-on-scroll slide-up">
          Rentals • Resale • Government Housing Assistance
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-10 leading-tight animate-on-scroll slide-up" style={{ animationDelay: '0.1s' }}>
          Precision in Property. <br />
          <span className="inline-block mt-2">Integrity in Dealings.</span>
        </h1>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-12 animate-on-scroll slide-up" style={{ animationDelay: '0.2s' }}>
          <a 
            href="#listings" 
            className="group px-8 py-4 bg-white text-stone-900 text-sm font-semibold tracking-widest hover:bg-stone-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-sm"
          >
            VIEW LISTINGS
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 border-2 border-white text-white text-sm font-semibold tracking-widest hover:bg-white hover:text-stone-900 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-sm"
          >
            SPEAK TO A CONSULTANT
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}