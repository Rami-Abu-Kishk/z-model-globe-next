"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useZModelStore } from '@/lib/store';
import { searchableCountries } from '@/lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export function SearchBar() {
  const { searchQuery, setSearchQuery, setActiveTarget, setSelectedCountry, setSelectedCountries, setActiveCountry, setViewState, viewState } = useZModelStore();
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCountries = searchQuery.trim() === '' 
    ? [] 
    : searchableCountries.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.iso.toLowerCase().includes(searchQuery.toLowerCase()));

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (country: typeof searchableCountries[0]) => {
    setSearchQuery('');
    setIsFocused(false);
    
    // Set globe behavior
    setActiveTarget({ lat: country.lat, lng: country.lng, zoomLevel: 1.5 });
    setSelectedCountry(country.iso);
    setSelectedCountries([]); // Clear group highlights
    
    // Set UI behavior
    setActiveCountry(country.name);
    setViewState('EARTH_FOCUS');
  };

  if (viewState === 'CARD_FOCUS') return null;

  return (
    <motion.div 
      ref={containerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute top-8 left-1/2 -translate-x-1/2 z-[100] w-[400px] transition-all duration-300 pointer-events-auto ${isFocused ? 'scale-105' : 'scale-100'}`}
    >
      <div className="relative flex items-center bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl rounded-full overflow-hidden px-4 py-2 group hover:bg-white/60 transition-all cursor-text">
        <Search className="w-5 h-5 text-slate-500 group-hover:text-slate-800 transition-colors" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => {
            console.log("🔍 Search Typing:", e.target.value);
            setSearchQuery(e.target.value);
          }}
          onFocus={() => {
            console.log("🔍 Search Bar Focused");
            setIsFocused(true);
          }}
          placeholder="Search global intelligence..." 
          className="w-full bg-transparent border-none outline-none text-slate-800 font-black ml-3 placeholder:text-slate-400 placeholder:font-bold pointer-events-auto"
        />
      </div>

      <AnimatePresence>
        {isFocused && filteredCountries.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 w-full mt-4 bg-white/80 backdrop-blur-3xl border border-white/60 shadow-2xl rounded-2xl overflow-hidden max-h-[300px] overflow-y-auto pointer-events-auto"
          >
            {filteredCountries.map(country => (
              <div 
                key={country.iso}
                onClick={() => handleSelect(country)}
                className="px-6 py-3 border-b border-white/40 hover:bg-white/60 cursor-pointer flex items-center justify-between transition-colors"
              >
                  <div className="w-9 h-6 overflow-hidden rounded-sm border border-slate-200/60 shadow-sm flex-shrink-0 bg-slate-50 flex items-center justify-center">
                    <img 
                      src={`https://flagcdn.com/w40/${country.iso.toLowerCase()==="il"?"ps":country.iso.toLowerCase()}.png`} 
                      alt={country.name}
                      className="w-full h-full object-contain p-0.5"
                    />
                  </div>
                  <span className="font-bold text-slate-800">{country.name}</span>
                <span className="text-xs font-black text-slate-400">{country.iso}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
