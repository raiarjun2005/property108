export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Begin Your Journey</h2>
          <p className="text-stone-400 mb-8">
            Reach out for a private consultation regarding your property requirements.
          </p>
          
          <div className="space-y-4">
            <p className="text-sm tracking-wider text-stone-500 uppercase">Direct Line</p>
            <p className="text-xl">+91 8826154299</p>
            
            <p className="text-sm tracking-wider text-stone-500 uppercase mt-8">Email</p>
            <p className="text-xl"></p>

            <a 
              href="https://wa.me/919643560200" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-green-900/30 border border-green-800 text-green-100 rounded hover:bg-green-900/50 transition-colors"
            >
              <span>Chat via WhatsApp</span>
            </a>
          </div>
        </div>

        <form className="space-y-8">
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Name</label>
            <input type="text" className="w-full bg-transparent border-b border-stone-700 pb-2 text-white focus:outline-none focus:border-stone-400 transition-colors" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Phone</label>
            <input type="tel" className="w-full bg-transparent border-b border-stone-700 pb-2 text-white focus:outline-none focus:border-stone-400 transition-colors" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Requirement</label>
            <textarea rows={3} className="w-full bg-transparent border-b border-stone-700 pb-2 text-white focus:outline-none focus:border-stone-400 transition-colors"></textarea>
          </div>
          <button type="button" className="px-10 py-4 bg-white text-stone-900 text-sm tracking-widest hover:bg-stone-200 transition-colors">
            SEND MESSAGE
          </button>
        </form>

      </div>
    </section>
  );
}