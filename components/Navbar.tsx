import Link from 'next/link';

// IMPORTANT: Must use 'export default' here
export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-serif tracking-tight text-stone-900">
          PROPERTY<span className="text-stone-500">108</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-stone-600">
          <Link href="#listings" className="hover:text-stone-900 transition-colors">LISTINGS</Link>
          <Link href="#why-us" className="hover:text-stone-900 transition-colors">WHY US</Link>
          <Link href="#about" className="hover:text-stone-900 transition-colors">ABOUT</Link>
          <Link href="#contact" className="hover:text-stone-900 transition-colors">CONTACT</Link>
        </div>
      </div>
    </nav>
  );
}