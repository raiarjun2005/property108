'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// 🔥 IMPORT AUTH COMPONENTS
import Login from '@/components/Login';
import Signup from '@/components/Signup';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b shadow'
            : 'bg-white/80 backdrop-blur-sm border-b'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-14 md:h-16 flex items-center justify-between">

            {/* LOGO */}
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-stone-900 text-white flex items-center justify-center font-bold">
                P
              </div>
              <span className="font-bold tracking-tight">
                PROPERTY<span className="text-stone-500 font-light">108</span>
              </span>
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden lg:flex gap-8">
              {['Listings', 'Why Us', 'About', 'Contact'].map(item => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-xs uppercase font-semibold text-stone-600 hover:text-stone-900"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* DESKTOP AUTH */}
            <div className="hidden lg:flex gap-4">
              <button
                onClick={() => setShowLogin(true)}
                className="text-xs uppercase font-semibold"
              >
                Log In
              </button>
              <button
                onClick={() => setShowSignup(true)}
                className="bg-stone-900 text-white px-5 py-2 text-xs uppercase font-semibold"
              >
                Sign Up
              </button>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="p-4 space-y-3">
              {['Listings', 'Why Us', 'About', 'Contact'].map(item => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsOpen(false)}
                  className="block text-xs uppercase font-semibold"
                >
                  {item}
                </Link>
              ))}

              <div className="grid grid-cols-2 gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setIsOpen(false);
                  }}
                  className="border py-2 text-xs uppercase font-semibold"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setShowSignup(true);
                    setIsOpen(false);
                  }}
                  className="bg-stone-900 text-white py-2 text-xs uppercase font-semibold"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 🔥 AUTH MODALS */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </>
  );
}
