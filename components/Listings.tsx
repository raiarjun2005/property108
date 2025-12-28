import { properties } from '@/data/properties';
import Link from 'next/link'; // 1. Link import kiya

export default function Listings() {
  return (
    <section id="listings" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Curated Portfolio</h2>
          <div className="w-16 h-0.5 bg-stone-300"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
          {properties.map((prop) => (
            // 2. Yahan 'div' ko 'Link' se replace kiya aur href add kiya
            <Link 
              href={`/property/${prop.id}`} 
              key={prop.id} 
              className="group cursor-pointer block" // 'block' add kiya taaki layout na toote
            >
              <div className="relative h-48 md:h-80 overflow-hidden mb-3 md:mb-6 bg-stone-100">
                <img 
                  src={prop.image} 
                  alt={prop.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 backdrop-blur px-2 py-1 md:px-3 text-[10px] md:text-xs uppercase tracking-wider">
                  {prop.type}
                </div>
              </div>
              
              <div className="space-y-1 md:space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm md:text-xl font-medium text-stone-900 leading-tight">{prop.title}</h3>
                </div>
                <p className="text-stone-500 text-xs md:text-sm truncate">{prop.location}</p>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-2 border-t border-stone-100 mt-2 md:mt-4">
                  <span className="text-stone-800 font-semibold text-sm md:text-base">{prop.price}</span>
                  <span className="text-stone-400 text-[10px] md:text-xs uppercase tracking-wide hidden md:block">{prop.specs}</span>
                </div>
                <button className="hidden md:block mt-4 text-xs font-bold uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}