'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPropertyById } from '@/lib/firebaseService';
import { Property } from '@/types/property';
import Link from 'next/link';
import { 
  MapPin, Bed, Bath, Square, Phone, Calendar, 
  CheckCircle, Share2, Heart, ArrowLeft, ShieldCheck 
} from 'lucide-react';

export default function PropertyDetails() {
  const params = useParams();
  const router = useRouter();
  const [showPhone, setShowPhone] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (params.id && typeof params.id === 'string') {
        try {
          const data = await getPropertyById(params.id);
          setProperty(data);
        } catch (error) {
          console.error('Error fetching property:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProperty();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-stone-50">
        <div className="text-stone-500">Loading property details...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-stone-50">
        <h1 className="text-2xl font-bold text-stone-900">Property Not Found</h1>
        <button onClick={() => router.back()} className="text-stone-600 mt-4 underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen pb-24 md:pb-10">
      
      {/* HEADER / BACK BUTTON */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center text-stone-600 hover:text-stone-900 transition font-medium">
                <ArrowLeft size={20} className="mr-2"/> Back
            </Link>
            <div className="flex gap-4">
                <button className="p-2 hover:bg-stone-100 rounded-full"><Share2 size={20} className="text-stone-600"/></button>
                <button className="p-2 hover:bg-stone-100 rounded-full"><Heart size={20} className="text-stone-600"/></button>
            </div>
        </div>
      </div>

      {/* --- MAIN CONTAINER --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        
        {/* SECTION 1: IMAGES & HERO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Main Image */}
            <div className="h-[300px] md:h-[450px] rounded-xl overflow-hidden shadow-sm relative">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-stone-900 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                  {property.type}
                </div>
            </div>
            {/* Map/Side Info */}
            <div className="hidden md:flex flex-col gap-4">
                 <div className="h-full bg-stone-200 rounded-xl flex items-center justify-center text-stone-400">
                    <span>More Images coming soon...</span>
                 </div>
            </div>
        </div>

        {/* SECTION 2: GRID LAYOUT (Left Content + Right Sticky Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN (Details) */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Title & Price Block */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                    <h1 className="text-2xl md:text-3xl font-serif text-stone-900 font-bold mb-2">{property.title}</h1>
                    <div className="flex items-center text-stone-500 mb-4">
                        <MapPin size={18} className="mr-1" />
                        <span>{property.location}</span>
                    </div>
                    
                    {/* Key Specs Row */}
                    <div className="flex gap-6 border-t border-stone-100 pt-4 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-stone-100 p-2 rounded-full"><Bed size={18} /></div>
                            <span className="font-semibold text-stone-700">{property.specs}</span> 
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="bg-stone-100 p-2 rounded-full"><Square size={18} /></div>
                             <span className="font-semibold text-stone-700">{property.furnishing || "Not Specified"}</span>
                        </div>
                    </div>
                </div>

                {/* About Property */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                    <h3 className="text-lg font-bold text-stone-900 mb-3">Description</h3>
                    <p className="text-stone-600 leading-relaxed text-sm md:text-base">
                        {property.description || "No description available."}
                    </p>
                </div>

                {/* Amenities */}
                {property.amenities && property.amenities.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                    <h3 className="text-lg font-bold text-stone-900 mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
                        {property.amenities.map((item, i) => (
                            <div key={i} className="flex items-center text-stone-600 text-sm">
                                <CheckCircle size={16} className="text-green-600 mr-2 flex-shrink-0" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                )}

            </div>

            {/* RIGHT COLUMN (Sticky Contact Card) */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                    
                    {/* Price & Contact Box */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200">
                        <div className="mb-6">
                            <span className="text-stone-400 text-xs uppercase font-bold">Price</span>
                            <div className="text-3xl font-bold text-stone-900">{property.price}</div>
                            {property.deposit && (
                              <span className="text-xs text-green-600 font-semibold">Deposit: {property.deposit}</span>
                            )}
                        </div>

                        {/* Owner Info */}
                        {property.ownerName && (
                        <div className="flex items-center gap-3 mb-6 p-3 bg-stone-50 rounded-lg border border-stone-100">
                            <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-white font-bold">
                                {property.ownerName[0]}
                            </div>
                            <div>
                                <div className="font-bold text-stone-900 text-sm">{property.ownerName}</div>
                                <div className="text-xs text-stone-500">{property.ownerType} • Posted {property.postedOn}</div>
                            </div>
                        </div>
                        )}

                        {/* Buttons */}
                        <button 
                            onClick={() => setShowPhone(!showPhone)}
                            className="w-full bg-stone-900 text-white py-3 rounded-lg font-bold hover:bg-stone-800 transition flex items-center justify-center gap-2 mb-3 shadow-md"
                        >
                            <Phone size={18} />
                            {showPhone ? property.phone || "+91 98765 43210" : "View Phone Number"}
                        </button>
                        
                        <button className="w-full border border-stone-300 text-stone-700 py-3 rounded-lg font-bold hover:bg-stone-50 transition flex items-center justify-center gap-2">
                            <Calendar size={18} />
                            Request Visit
                        </button>
                    </div>

                    {/* Safety Tip */}
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                         <ShieldCheck className="text-blue-600 flex-shrink-0" size={20} />
                         <div>
                            <h4 className="font-bold text-blue-800 text-xs uppercase mb-1">Safety Tip</h4>
                            <p className="text-blue-700 text-xs leading-tight">
                                Avoid paying any money in advance without verifying the property details personally.
                            </p>
                         </div>
                    </div>

                </div>
            </div>
        </div>
      </div>

      {/* --- MOBILE FIXED BOTTOM BAR --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-3 md:hidden flex gap-3 items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex-1 pl-2">
            <div className="text-lg font-bold text-stone-900">{property.price}</div>
            <div className="text-[10px] text-stone-500">Contact for best deal</div>
        </div>
        <button className="bg-stone-900 text-white px-8 py-3 rounded-lg font-bold text-sm shadow-lg active:scale-95 transition">
            Contact
        </button>
      </div>

    </div>
  );
}
