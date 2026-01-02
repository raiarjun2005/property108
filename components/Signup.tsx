'use client';

import Link from 'next/link';
import { Mail, Lock, User, Check, X, ArrowRight, ShieldCheck, Star, Building2 } from 'lucide-react';

export default function Signup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md transition-all duration-300">
      
      {/* MAIN CARD CONTAINER */}
      <div className="relative w-full max-w-5xl h-[650px] flex bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-white/80 backdrop-blur rounded-full text-stone-500 hover:text-stone-900 hover:rotate-90 hover:bg-white transition-all duration-300 shadow-sm border border-stone-100"
        >
          <X size={20} />
        </button>

        {/* --- LEFT SIDE: IMAGE & BENEFITS --- */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-stone-900 flex-col justify-between p-12 overflow-hidden">
          
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop"
            alt="Modern Home"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/60 to-stone-900/90" />

          {/* Top Brand/Logo Area (Optional) */}
          <div className="relative z-10">
             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-white tracking-wider uppercase">Premium Access</span>
             </div>
          </div>

          {/* Bottom Content: Value Proposition */}
          <div className="relative z-10 space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-white leading-tight mb-3">
                Join the Elite Circle of Homeowners.
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
                Create an account to unlock features reserved for our premium members.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {[
                { icon: ShieldCheck, text: "Verified DDA Listings Only" },
                { icon: Building2, text: "Direct Owner Contact (No Brokerage)" },
                { icon: Star, text: "Priority Support & Legal Aid" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center text-white border border-white/10 group-hover:bg-white group-hover:text-stone-900 transition-colors duration-300">
                    <item.icon size={18} />
                  </div>
                  <span className="text-white font-medium text-sm tracking-wide">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-8 relative overflow-y-auto">
          
          <div className="w-full max-w-sm mx-auto space-y-6">

            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                Create Account
              </h1>
              <p className="text-stone-500 text-sm font-medium">
                Start your journey with Property108 today.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4">

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-800 transition-colors w-5 h-5" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 focus:bg-white transition-all text-stone-800 placeholder:text-stone-400 font-medium text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-800 transition-colors w-5 h-5" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 focus:bg-white transition-all text-stone-800 placeholder:text-stone-400 font-medium text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-800 transition-colors w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Create a strong password"
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 focus:bg-white transition-all text-stone-800 placeholder:text-stone-400 font-medium text-sm"
                  />
                </div>
              </div>

              {/* Custom Checkbox Terms */}
              <div className="flex items-start gap-3 pt-2 group cursor-pointer">
                <div className="relative flex items-center mt-0.5">
                  <input
                    type="checkbox"
                    id="terms"
                    className="peer appearance-none h-5 w-5 border-2 border-stone-300 rounded-md checked:bg-stone-900 checked:border-stone-900 transition-all cursor-pointer"
                  />
                  <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                </div>
                <label htmlFor="terms" className="text-xs text-stone-500 leading-relaxed cursor-pointer select-none">
                  By creating an account, I agree to the{' '}
                  <span className="text-stone-900 font-bold hover:underline">Terms of Service</span>
                  {' '}and{' '}
                  <span className="text-stone-900 font-bold hover:underline">Privacy Policy</span>.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-stone-900/20 hover:bg-black hover:shadow-stone-900/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 mt-2"
              >
                Get Started <ArrowRight size={18} />
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-stone-500 text-sm">
              Already have an account?{' '}
              <span className="text-stone-900 font-bold hover:underline cursor-pointer transition-all">
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}