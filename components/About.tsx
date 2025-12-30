'use client';

import { useEffect, useRef } from 'react';

export default function About() {
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
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-stone-50 rounded-full blur-3xl opacity-50 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-50 rounded-full blur-3xl opacity-50 -ml-48 -mb-48"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <span className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase animate-on-scroll slide-up">Our Story</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-stone-900 mt-6 mb-8 animate-on-scroll slide-up" style={{ transitionDelay: '0.1s' }}>
          Navigating Real Estate with Integrity
        </h2>
        <p className="text-lg md:text-xl text-stone-600 leading-relaxed font-light max-w-3xl mx-auto animate-on-scroll slide-up" style={{ transitionDelay: '0.2s' }}>
          Property108 was founded to simplify the complex landscape of Indian real estate. 
          Whether navigating high-value resale markets or seeking guidance on government housing schemes, 
          we provide the professional support needed to make informed decisions. 
          No jargon, no false promises—just expert assistance.
        </p>
      </div>
    </section>
  );
}