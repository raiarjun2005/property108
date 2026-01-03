'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, MapPin, ChevronDown, Home, Wallet, Building2 } from 'lucide-react';
import { ref, get } from 'firebase/database';
import { database } from '@/lib/firebase';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchFilters() {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // -- STATES (Initialize with URL params if available) --
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'Buy');
  const [locations, setLocations] = useState<Record<string, string[]>>({});
  
  // Selection States
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || 'Flat');
  const [budget, setBudget] = useState(searchParams.get('budget') || 'Budget');

  // Dropdown Toggles
  const [showStateDrop, setShowStateDrop] = useState(false);
  const [showCityDrop, setShowCityDrop] = useState(false);
  const [showTypeDrop, setShowTypeDrop] = useState(false);
  const [showBudgetDrop, setShowBudgetDrop] = useState(false);

  // --- DATA ARRAYS ---
  const buyBudgets = ['< 20 Lac', '20 Lac - 50 Lac', '50 Lac - 1 Cr', '1 Cr - 3 Cr', '> 3 Cr'];
  const rentBudgets = ['< ₹5,000', '₹5k - ₹10k', '₹10k - ₹20k', '₹20k - ₹50k', '> ₹50k'];
  const currentBudgets = (activeTab === 'Rent' || activeTab === 'PG') ? rentBudgets : buyBudgets;

  // --- HANDLER: PERFORM SEARCH ---
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (activeTab) params.set('tab', activeTab);
    if (selectedState) params.set('state', selectedState);
    if (selectedCity) params.set('city', selectedCity);
    if (propertyType) params.set('type', propertyType);
    if (budget && budget !== 'Budget') params.set('budget', budget);

    router.push(`/search?${params.toString()}`);
  };

  // 1. Fetch Cities
  useEffect(() => {
    get(ref(database, 'locations')).then((snapshot) => {
      if (snapshot.exists()) setLocations(snapshot.val());
    });
  }, []);

  // 2. Click Outside Listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowStateDrop(false); setShowCityDrop(false); setShowTypeDrop(false); setShowBudgetDrop(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white border-b border-stone-200 shadow-sm pt-20 pb-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div ref={searchContainerRef} className="bg-white rounded-xl shadow-lg border border-stone-100 relative">
          
          {/* TABS */}
          <div className="flex border-b border-gray-200 bg-gray-50 rounded-t-xl overflow-hidden">
            {['Buy', 'Rent', 'Commercial', 'Plots', 'PG'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeTab === tab 
                    ? 'bg-white text-[#6633cc] border-b-2 border-[#6633cc]' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* INPUT ROW */}
          <div className="p-3 md:p-4 flex flex-col md:flex-row gap-2 md:gap-3 items-center">
            
            {/* STATE */}
            <div className="relative w-full md:w-1/4">
               <div 
                 className="flex items-center border border-gray-300 rounded-lg px-3 py-2 md:py-3 cursor-pointer hover:border-[#6633cc] bg-white transition-colors"
                 onClick={() => { setShowStateDrop(!showStateDrop); setShowCityDrop(false); setShowTypeDrop(false); setShowBudgetDrop(false); }}
               >
                 <MapPin size={18} className="text-[#6633cc] mr-2 flex-shrink-0" />
                 <span className={`flex-1 font-medium truncate ${selectedState ? 'text-gray-900' : 'text-gray-500'}`}>{selectedState || "State"}</span>
                 <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
               </div>
               {showStateDrop && (
                 <div className="absolute top-full mt-1 left-0 w-full bg-white shadow-xl rounded-lg max-h-60 overflow-y-auto z-50 border border-gray-100">
                    {Object.keys(locations).sort().map(state => (
                      <div key={state} className="px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm text-gray-700 border-b border-gray-50 last:border-0"
                        onClick={() => { setSelectedState(state); setSelectedCity(''); setShowStateDrop(false); setShowCityDrop(true); }}>
                        {state}
                      </div>
                    ))}
                 </div>
               )}
            </div>

            {/* CITY */}
            <div className="relative w-full md:w-1/4">
               <div 
                 className={`flex items-center border rounded-lg px-3 py-2 md:py-3 cursor-pointer transition-colors ${!selectedState ? 'bg-gray-100 border-gray-200' : 'bg-white border-gray-300 hover:border-[#6633cc]'}`}
                 onClick={() => selectedState && setShowCityDrop(!showCityDrop)}
               >
                 <Building2 size={18} className="text-[#6633cc] mr-2 flex-shrink-0" />
                 <span className={`flex-1 font-medium truncate ${selectedCity ? 'text-gray-900' : 'text-gray-500'}`}>{selectedCity || "City"}</span>
                 <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
               </div>
               {showCityDrop && selectedState && (
                 <div className="absolute top-full mt-1 left-0 w-full bg-white shadow-xl rounded-lg max-h-60 overflow-y-auto z-50 border border-gray-100">
                    {locations[selectedState]?.map(city => (
                      <div key={city} className="px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm text-gray-700 border-b border-gray-50 last:border-0"
                        onClick={() => { setSelectedCity(city); setShowCityDrop(false); }}>
                        {city}
                      </div>
                    ))}
                 </div>
               )}
            </div>

            {/* TYPE */}
            <div className="relative w-full md:w-1/5">
               <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 md:py-3 cursor-pointer hover:border-[#6633cc] bg-white transition-colors"
                 onClick={() => { setShowTypeDrop(!showTypeDrop); setShowStateDrop(false); setShowCityDrop(false); setShowBudgetDrop(false); }}>
                 <Home size={18} className="text-[#6633cc] mr-2 flex-shrink-0" />
                 <span className="flex-1 text-gray-900 font-medium truncate">{propertyType}</span>
                 <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
               </div>
               {showTypeDrop && (
                 <div className="absolute top-full mt-1 left-0 w-full bg-white shadow-xl rounded-lg z-50 border border-gray-100">
                    {['Flat', 'House/Villa', 'Plot', 'Office', 'Shop'].map(type => (
                      <div key={type} className="px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm text-gray-700 border-b border-gray-50 last:border-0"
                        onClick={() => { setPropertyType(type); setShowTypeDrop(false); }}>{type}</div>
                    ))}
                 </div>
               )}
            </div>

            {/* BUDGET */}
            <div className="relative w-full md:w-1/5">
               <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 md:py-3 cursor-pointer hover:border-[#6633cc] bg-white transition-colors"
                 onClick={() => { setShowBudgetDrop(!showBudgetDrop); setShowStateDrop(false); setShowCityDrop(false); setShowTypeDrop(false); }}>
                 <Wallet size={18} className="text-[#6633cc] mr-2 flex-shrink-0" />
                 <span className="flex-1 text-gray-900 font-medium truncate">{budget}</span>
                 <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
               </div>
               {showBudgetDrop && (
                 <div className="absolute top-full mt-1 left-0 w-full bg-white shadow-xl rounded-lg z-50 border border-gray-100">
                    {currentBudgets.map(b => (
                      <div key={b} className="px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm text-gray-700 border-b border-gray-50 last:border-0"
                        onClick={() => { setBudget(b); setShowBudgetDrop(false); }}>{b}</div>
                    ))}
                 </div>
               )}
            </div>

            {/* BUTTON */}
            <button onClick={handleSearch} className="w-full md:w-auto bg-[#6633cc] hover:bg-[#5329a3] text-white px-6 py-2 md:py-3 rounded-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95">
               <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}