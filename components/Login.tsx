'use client';

import Link from 'next/link';
import { Mail, Lock, ArrowRight, X, Star } from 'lucide-react'; // Note: Check if you have a Google Icon, otherwise use text or SVG

export default function Login({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md transition-all duration-300">
      
      {/* MAIN CARD CONTAINER */}
      <div className="relative w-full max-w-5xl h-[600px] flex bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* CLOSE BUTTON (Floating) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-white/80 backdrop-blur rounded-full text-stone-500 hover:text-stone-900 hover:rotate-90 hover:bg-white transition-all duration-300 shadow-sm border border-stone-100"
        >
          <X size={20} />
        </button>

        {/* --- LEFT SIDE: FORM --- */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-12 relative">
          
          <div className="w-full max-w-sm mx-auto space-y-7">
            
            {/* Header */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-stone-500 text-sm font-medium">
                Please enter your details to access your dashboard.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 ml-1">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-800 transition-colors duration-200 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 focus:bg-white transition-all duration-200 text-stone-800 placeholder:text-stone-400 font-medium"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-stone-500 hover:text-stone-900 hover:underline transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-800 transition-colors duration-200 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 focus:bg-white transition-all duration-200 text-stone-800 placeholder:text-stone-400 font-medium"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-stone-900/20 hover:bg-black hover:shadow-stone-900/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                Sign In <ArrowRight size={18} />
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center gap-4 py-2">
              <span className="flex-grow h-px bg-stone-200"></span>
              <span className="text-xs text-stone-400 font-medium uppercase tracking-wider">Or</span>
              <span className="flex-grow h-px bg-stone-200"></span>
            </div>

            {/* Google Button */}
            <button className="w-full flex items-center justify-center gap-3 bg-white border border-stone-200 py-3.5 rounded-xl text-stone-700 font-semibold hover:bg-stone-50 hover:border-stone-300 transition-all duration-200">
              {/* Replace with actual Google SVG if available */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Footer */}
            <p className="text-center text-stone-500 text-sm">
              New here?{' '}
              <span className="text-stone-900 font-bold hover:underline cursor-pointer transition-all">
                Create an account
              </span>
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: VISUAL & TESTIMONIAL --- */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-stone-900 items-end">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
            alt="Premium Architecture"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
          
          {/* Content Overlay */}
          <div className="relative z-10 p-12 text-white space-y-6">
            <div className="flex gap-1 text-yellow-400">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>
            
            <blockquote className="text-xl md:text-2xl font-serif font-medium leading-relaxed">
              "Property108 helped me find my dream home in Delhi with absolute ease. The design and experience are unmatched."
            </blockquote>

            <div className="flex items-center gap-4 pt-2">
              <div className="h-10 w-10 rounded-full bg-stone-700 border-2 border-white/20 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100" alt="User" />
              </div>
              <div>
                <p className="font-bold text-sm">Rahul Sharma</p>
                <p className="text-stone-400 text-xs uppercase tracking-wider">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}