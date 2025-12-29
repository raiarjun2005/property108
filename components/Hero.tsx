export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-stone-50 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero.png" 
          alt="Luxury Interior" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-stone-900/40" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl fade-in-up">
        <p className="text-stone-200 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 mt-10">
          Rentals • Resale • Government Housing Assistance
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-8 leading-tight">
          Precision in Property. <br />
          Integrity in Dealings.
        </h1>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
          <a 
            href="#listings" 
            className="px-8 py-4 bg-white text-stone-900 text-sm tracking-widest hover:bg-stone-100 transition-all duration-300"
          >
            VIEW LISTINGS
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 border border-white text-white text-sm tracking-widest hover:bg-white hover:text-stone-900 transition-all duration-300"
          >
            SPEAK TO A CONSULTANT
          </a>
        </div>
      </div>
    </section>
  );
}