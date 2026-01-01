'use client';

import { useEffect, useRef } from 'react';

export default function Contact() {
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

  return (
    <section ref={sectionRef} id="contact" className="py-20 md:py-28 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 text-white relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/50 via-transparent to-stone-900/50"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
        
        <div className="animate-on-scroll slide-left">
          <span className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 mt-4">Begin Your Journey</h2>
          <p className="text-stone-400 mb-10 text-lg leading-relaxed">
            Reach out for a private consultation regarding your property requirements.
          </p>
          
          <div className="space-y-6">
            <div className="group">
              <p className="text-sm tracking-wider text-stone-500 uppercase mb-2">Direct Line</p>
              <a href="tel:+918826154299" className="text-2xl font-semibold hover:text-stone-200 transition-colors inline-block">
                +91 8826154299
              </a>
            </div>            
            <div className="group">
              <p className="text-sm tracking-wider text-stone-500 uppercase mt-8 mb-2">Email</p>
              <a href="mailto:info@property108.in" className="text-xl text-stone-300 hover:text-white transition-colors">
                info@property108.in
              </a>
            </div>
            <a 
              href="https://wa.me/919643560200" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-8 px-6 py-4 bg-green-600/20 border-2 border-green-500/50 text-green-100 rounded-lg hover:bg-green-600/30 hover:border-green-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-semibold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Chat via WhatsApp</span>
            </a>
          </div>
        </div>

        <form className="space-y-6 animate-on-scroll slide-right">
          <div className="group">
            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-3">Name</label>
            <input 
              type="text" 
              className="w-full bg-stone-800/50 border-b-2 border-stone-700 pb-3 text-white focus:outline-none focus:border-white transition-all duration-300 rounded-t px-2" 
              placeholder="Your name"
            />
          </div>
          <div className="group">
            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-3">Phone</label>
            <input 
              type="tel" 
              className="w-full bg-stone-800/50 border-b-2 border-stone-700 pb-3 text-white focus:outline-none focus:border-white transition-all duration-300 rounded-t px-2" 
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          <div className="group">
            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-3">Requirement</label>
            <textarea 
              rows={4} 
              className="w-full bg-stone-800/50 border-b-2 border-stone-700 pb-3 text-white focus:outline-none focus:border-white transition-all duration-300 rounded-t px-2 resize-none" 
              placeholder="Tell us about your property requirements..."
            ></textarea>
          </div>
          <button 
            type="button" 
            className="w-full px-10 py-4 bg-white text-stone-900 text-sm font-semibold tracking-widest hover:bg-stone-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-lg"
          >
            SEND MESSAGE
          </button>
        </form>

      </div>
    </section>
  );
}