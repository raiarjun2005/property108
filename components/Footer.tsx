export default function Footer() {
  return (
    <footer className="py-10 md:py-12 bg-stone-950 text-stone-600 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-serif text-stone-400 tracking-wider text-lg font-semibold">
            PROPERTY<span className="text-stone-600">108</span>.IN
          </div>
          <div className="text-stone-500 text-sm">
            © {new Date().getFullYear()} Property108. All rights reserved.
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-stone-800 text-center text-stone-500 text-xs">
          <p>Licensed Real Estate Broker | Trusted Property Consultants</p>
        </div>
      </div>
    </footer>
  );
}