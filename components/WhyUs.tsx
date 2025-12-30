'use client';

import { useEffect, useRef } from 'react';

export default function WhyUs() {
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
      (el as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
    });

    return () => observer.disconnect();
  }, []);

  const points = [
    { title: "Verified Listings", desc: "Every property is physically inspected and legally vetted before listing.", icon: "✓" },
    { title: "Transparent Process", desc: "Clear paperwork, no hidden charges, and honest market guidance.", icon: "📋" },
    { title: "Client-First Approach", desc: "We prioritize your requirements over quick sales.", icon: "👥" },
    { title: "Documentation Support", desc: "End-to-end assistance with government paperwork and compliance.", icon: "📄" },
  ];

  return (
    <section ref={sectionRef} id="why-us" className="py-20 md:py-28 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll slide-left">
            <span className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 mb-6 mt-4">The Property108 Standard</h2>
            <p className="text-stone-600 leading-relaxed text-lg mb-8">
              In a crowded market, we stand apart by offering clarity. Our approach merges traditional real estate values with modern efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {points.map((point, index) => (
              <div 
                key={index} 
                className="group bg-white p-6 rounded-lg border border-stone-200 hover:border-stone-400 hover:shadow-lg transition-all duration-300 animate-on-scroll slide-up"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center text-2xl group-hover:bg-stone-900 group-hover:text-white transition-all duration-300">
                    {point.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-stone-900 mb-2 group-hover:text-stone-700 transition-colors">{point.title}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}