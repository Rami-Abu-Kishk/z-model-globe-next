"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Type, Globe, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useZModelStore } from '@/lib/store';
import { applyZoom } from '@/lib/constants';
import { searchableCountries } from '@/lib/mockData';
import { GlobeControls } from './GlobeControls';
import { InterfaceZoomControls } from './InterfaceZoomControls';
import { cn } from '@/lib/utils';

export function TopUtilityBar() {
  const { 
    searchQuery, 
    setSearchQuery, 
    setActiveTarget, 
    setSelectedCountry, 
    setSelectedCountries, 
    setActiveCountry, 
    setViewState, 
    viewState,
    activeCountry,
    activeModule
  } = useZModelStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isPanelOpen = viewState === 'CARD_FOCUS' || (activeCountry && !activeModule);

  const filteredCountries = searchQuery.trim() === '' 
    ? [] 
    : searchableCountries.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.iso.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Close search/zoom on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        if (!searchQuery) setIsSearchOpen(false);
        setIsZoomOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchQuery]);

  const handleSelect = (country: typeof searchableCountries[0]) => {
    setSearchQuery('');
    setIsFocused(false);
    setIsSearchOpen(false);
    
    setActiveTarget({ lat: country.lat, lng: country.lng, zoomLevel: applyZoom(0.8) });
    setSelectedCountry(country.iso);
    setSelectedCountries([]);
    setActiveCountry(country.name);
    setViewState('EARTH_FOCUS');
  };

  return (
    <div 
      className={cn(
        "fixed top-8 z-[100] transition-all duration-700 ease-in-out flex items-center justify-center pointer-events-none",
        isPanelOpen 
          ? "left-[22.5%] -translate-x-1/2 w-[45%]" 
          : "left-1/2 -translate-x-1/2 w-full"
      )}
    >
      <motion.div 
        ref={containerRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 p-2 bg-white/20 backdrop-blur-2xl border border-white/40 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.1)] pointer-events-auto"
      >
        {/* ── SEARCH CONTROLLER ── */}
        <AnimatePresence mode="wait">
          {!isPanelOpen && (
            <motion.div 
              key="search-container"
              initial={{ width: 56, opacity: 0 }}
              animate={{ width: isSearchOpen ? 300 : 56, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="relative flex items-center h-14 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full overflow-hidden transition-all duration-300"
            >
              {isSearchOpen ? (
                <div className="flex items-center w-full px-4">
                  <Search className="w-5 h-5 text-slate-500 shrink-0" />
                  <input 
                    autoFocus
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    placeholder="Search global intelligence..." 
                    className="w-full bg-transparent border-none outline-none text-slate-800 font-bold ml-3 placeholder:text-slate-400 text-sm"
                  />
                  <button 
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-1 hover:bg-slate-100 rounded-full transition-colors shrink-0"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center justify-center w-14 h-14 hover:bg-white/40 transition-colors"
                >
                  <Search className="w-5 h-5 text-slate-600" />
                </button>
              )}

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {isFocused && filteredCountries.length > 0 && isSearchOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full mt-4 bg-white/80 backdrop-blur-3xl border border-white/60 shadow-2xl rounded-3xl overflow-hidden max-h-[300px] overflow-y-auto"
                  >
                    {filteredCountries.map(country => (
                      <div 
                        key={country.iso}
                        onClick={() => handleSelect(country)}
                        className="px-6 py-3 border-b border-white/40 hover:bg-white/60 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-5 overflow-hidden rounded-sm border border-slate-200/60 bg-slate-50 flex items-center justify-center">
                            <img 
                              src={`https://flagcdn.com/w40/${country.iso.toLowerCase()==="il"?"ps":country.iso.toLowerCase()}.png`} 
                              alt={country.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="font-bold text-slate-800 text-sm">{country.name}</span>
                        </div>
                        <span className="text-[10px] font-black text-slate-400">{country.iso}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SYSTEM CONTROLS ── */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-white/40 backdrop-blur-2xl border border-white/60 transition-all duration-300 hover:bg-white/60 hover:scale-105 active:scale-95"
          >
            <Languages className="w-5 h-5 text-slate-600" />
            <div className="absolute top-16 px-3 py-1 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 -translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-xl border border-white/10">
              Switch Language Ar/En
            </div>
          </button>

          {/* Globe Rotation */}
          <GlobeControls variant="minimal" />

          {/* Interface Zoom Toggle */}
          <div className="relative">
            <button
              onClick={() => setIsZoomOpen(!isZoomOpen)}
              className={cn(
                "group relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 active:scale-95",
                isZoomOpen 
                  ? "bg-sky-500 text-white shadow-lg" 
                  : "bg-white/40 backdrop-blur-2xl border border-white/60 text-slate-600 hover:bg-white/60 hover:scale-105"
              )}
            >
              <Type className="w-5 h-5" />
              <div className="absolute top-16 px-3 py-1 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 -translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-xl border border-white/10">
                Interface Zoom
              </div>
            </button>

            {/* Zoom Flyout - Positioned below in the horizontal bar */}
            <AnimatePresence>
              {isZoomOpen && (
                <InterfaceZoomControls 
                  onClose={() => setIsZoomOpen(false)} 
                  className="absolute top-20 left-1/2 -translate-x-1/2"
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
