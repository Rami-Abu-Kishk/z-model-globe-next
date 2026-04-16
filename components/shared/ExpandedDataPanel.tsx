"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useZModelStore } from '@/lib/store';
import { X, Layers, Search, ChevronDown } from 'lucide-react';
import { searchableCountries } from '@/lib/mockData';

import { EconomyModule } from '@/components/modules/EconomyModule';
import { InvestmentModule } from '@/components/modules/InvestmentModule';
import { PoliticalModule } from '@/components/modules/PoliticalModule';
import { MediaModule } from '@/components/modules/MediaModule';
import { GroupsCompaniesModule } from '@/components/modules/GroupsCompaniesModule';
import { MasterObserverModule } from '@/components/modules/MasterObserverModule';
import { DroModule } from '@/components/modules/DroModule';
import { CalendarModule } from '@/components/modules/CalendarModule';
import { ResearchModule } from '@/components/modules/ResearchModule';
import { AbuDhabiGovModule } from '@/components/modules/AbuDhabiGovModule';

const MODULE_COMPONENTS: Record<string, React.ComponentType<{ isExpanded?: boolean }>> = {
  economy: EconomyModule,
  investment: InvestmentModule,
  political: PoliticalModule,
  media: MediaModule,
  groups: GroupsCompaniesModule,
  masterObserver: MasterObserverModule,
  dro: DroModule,
  calendar: CalendarModule,
  research: ResearchModule,
  abuDhabiGov: AbuDhabiGovModule,
};

const MODULE_LABELS: Record<string, string> = {
  economy: 'Economy',
  investment: 'Investments',
  political: 'Political',
  media: 'Media',
  groups: 'Groups',
  masterObserver: 'Observer',
  dro: 'Records',
  calendar: 'Calendar',
  research: 'Research',
  abuDhabiGov: 'AD Gov',
};

export function ExpandedDataPanel() {
  const viewState = useZModelStore(s => s.viewState);
  const focusedCardId = useZModelStore(s => s.focusedCardId);
  const resetView = useZModelStore(s => s.resetView);
  const selectedCountry = useZModelStore(s => s.selectedCountry);
  const setSelectedCountry = useZModelStore(s => s.setSelectedCountry);
  const setSelectedCountries = useZModelStore(s => s.setSelectedCountries);
  const setActiveCountry = useZModelStore(s => s.setActiveCountry);
  const setActiveTarget = useZModelStore(s => s.setActiveTarget);
  const setViewState = useZModelStore(s => s.setViewState);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const isVisible = viewState === 'CARD_FOCUS' && focusedCardId !== null;

  const currentCountry = searchableCountries.find(c => c.iso === selectedCountry);

  const filteredResults = localQuery.trim() === '' 
    ? [] 
    : searchableCountries.filter(c => 
        c.name.toLowerCase().includes(localQuery.toLowerCase()) || 
        c.iso.toLowerCase().includes(localQuery.toLowerCase())
      );

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Click outside to close search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setLocalQuery('');
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (country: typeof searchableCountries[0]) => {
    setSelectedCountry(country.iso);
    setSelectedCountries([]); // Clear any multi-country group highlights 
    setActiveCountry(country.name);
    setActiveTarget({ lat: country.lat, lng: country.lng, zoomLevel: 1.5 });
    setLocalQuery('');
    setIsSearchOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && focusedCardId && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ 
            type: 'spring', 
            damping: 32, 
            stiffness: 200,
            mass: 0.9
          }}
          className="absolute top-0 right-0 w-[55%] max-w-4xl h-full bg-white/70 backdrop-blur-3xl border-l border-white/60 shadow-[-30px_0_60px_rgba(0,0,0,0.08)] overflow-hidden z-40 pointer-events-auto flex flex-col"
        >
          {/* Sticky Header */}
          <div className="px-8 py-6 border-b border-slate-200/60 bg-white/40 backdrop-blur-md shrink-0 z-20">
            <div className="flex items-center justify-between gap-4">
              
              {/* Left: Module ID */}
              <div className="flex items-center gap-3 min-w-[140px]">
                <div className="p-2 bg-slate-900 rounded-lg text-white shadow-lg">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase leading-none">
                    {MODULE_LABELS[focusedCardId]}
                  </h2>
                </div>
              </div>

              {/* Middle: Country Badge */}
              <AnimatePresence mode="wait">
                {currentCountry && (
                  <motion.div 
                    key={currentCountry.iso}
                    initial={{ opacity: 0, scale: 0.9, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -5 }}
                    className="flex items-center gap-2.5 px-4 py-2 bg-white/60 border border-white/80 shadow-sm rounded-full"
                  >
                    <div className="w-8 h-5 overflow-hidden rounded-sm border border-slate-200/60 flex-shrink-0 bg-slate-50 flex items-center justify-center p-0.5">
                      <img 
                        src={`https://flagcdn.com/w40/${currentCountry.iso.toLowerCase()==="il"?"ps":currentCountry.iso.toLowerCase()}.png`} 
                        alt={currentCountry.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-black text-slate-900 uppercase tracking-tight">
                      {currentCountry.name === "Israel" ? "Occupied Palestine" : currentCountry.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Right: Search & Close */}
              <div className="flex items-center gap-3">
                <div ref={searchContainerRef} className="relative">
                  <motion.div
                    animate={{ 
                      width: isSearchOpen ? 240 : 40,
                      backgroundColor: isSearchOpen ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.05)'
                    }}
                    className="h-10 rounded-full flex items-center overflow-hidden border border-slate-200/50"
                  >
                    <button 
                      onClick={() => setIsSearchOpen(!isSearchOpen)}
                      className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-slate-900 shrink-0"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                    <input 
                      ref={searchInputRef}
                      type="text"
                      value={localQuery}
                      onChange={(e) => setLocalQuery(e.target.value)}
                      placeholder="Switch country..."
                      className="bg-transparent border-none outline-none w-full text-xs font-bold text-slate-900 placeholder:text-slate-400"
                    />
                  </motion.div>

                  <AnimatePresence>
                    {isSearchOpen && filteredResults.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-[240px] bg-white/95 backdrop-blur-3xl border border-slate-200 shadow-2xl rounded-2xl overflow-hidden max-h-[300px] overflow-y-auto z-[100]"
                      >
                        {filteredResults.map(country => (
                          <button
                            key={country.iso}
                            onClick={() => handleCountrySelect(country)}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 border-b border-slate-100 last:border-none transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-4 overflow-hidden rounded-sm border border-slate-200/60 bg-slate-50 flex items-center justify-center p-0.5">
                                <img 
                                  src={`https://flagcdn.com/w20/${country.iso.toLowerCase()==="il"?"ps":country.iso.toLowerCase()}.png`} 
                                  alt={country.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900">
                                {country.name === "Israel" ? "Palestine" : country.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase">{country.iso}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="w-px h-6 bg-slate-200/60 mx-1" />

                <button
                  onClick={resetView}
                  className="group w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/5 hover:bg-slate-900 hover:text-white text-slate-600 transition-all duration-300 shadow-sm"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

            </div>
          </div>
          
          {/* Scrollable Module Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex-1 w-full text-slate-800 overflow-y-auto p-10 custom-scrollbar relative"
          >
            {React.createElement(MODULE_COMPONENTS[focusedCardId], { isExpanded: true })}
          </motion.div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}