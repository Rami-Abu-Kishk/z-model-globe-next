"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  TrendingUp, 
  Shield, 
  Newspaper, 
  Globe, 
  ArrowRight, 
  Wallet,
  ExternalLink,
  ChevronRight,
  Activity
} from 'lucide-react';
import { useZModelStore } from '@/lib/store';
import { searchableCountries, type TrendBrief } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export function DetailDrawer() {
  const { 
    activeCountry, 
    setActiveCountry, 
    setActiveTarget, 
    setSelectedCountry,
    setSelectedCountries,
    setViewState,
    activeModule,
    setActiveModule,
    setFocusedCardId
  } = useZModelStore();
  
  const countryData = searchableCountries.find(c => c.name === activeCountry);

  const handleClose = () => {
    setActiveCountry(null);
    setSelectedCountry(null);
    setActiveTarget(null);
    setViewState('ORBITAL');
  };

  const navigateToSection = (moduleId: string) => {
    if (!countryData) return;
    
    // 2. Set the focused card ID to open the panel
    setFocusedCardId(moduleId as any);
    // 3. Set the selected country for filtering
    setSelectedCountry(countryData.iso);
    // 4. Clear group highlights
    setSelectedCountries([]);
    // 3. Close the drawer
    setActiveCountry(null);
    // 4. Set view state to CARD_FOCUS to show the expanded panel
    setViewState('CARD_FOCUS');
  };

  const TrendSection = ({ 
    title, 
    icon: Icon, 
    trend, 
    moduleId,
    colorClass 
  }: { 
    title: string; 
    icon: any; 
    trend?: TrendBrief; 
    moduleId: string;
    colorClass: string;
  }) => (
    <div className={cn(
      "group p-5 rounded-3xl border bg-white/40 backdrop-blur-xl transition-all hover:bg-white/60",
      colorClass
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={cn("p-2 rounded-xl bg-white/80 shadow-sm transition-transform group-hover:scale-110", colorClass.split(' ')[1])}>
            <Icon className="w-4 h-4" />
          </div>
          <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-800">{title}</h4>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 rounded-full p-0 hover:bg-slate-900/5"
          onClick={() => navigateToSection(moduleId)}
        >
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
        </Button>
      </div>

      {trend ? (
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h5 className="text-[15px] font-black text-slate-900 leading-tight">
              {trend.title}
            </h5>
            <span className="text-[13px] font-black text-slate-900 ml-2">{trend.value}</span>
          </div>
          <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
            {trend.description}
          </p>
          <button 
            onClick={() => navigateToSection(moduleId)}
            className="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase tracking-tighter mt-2 group-hover:gap-3 transition-all"
          >
            Enter {title} Hub <ArrowRight className="w-3 h-3 text-sky-500" />
          </button>
        </div>
      ) : (
        <p className="text-[11px] text-slate-400 font-bold italic">
          Strategic intelligence current validating.
        </p>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {activeCountry && countryData && !activeModule && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 220, mass: 0.8 }}
          className="absolute top-0 right-0 w-full md:w-[480px] h-full bg-white/80 backdrop-blur-3xl border-l border-white/60 shadow-[-20px_0_50px_rgba(0,0,0,0.05)] overflow-hidden z-40 pointer-events-auto flex flex-col"
        >
          {/* Header Section */}
          <div className="p-8 pb-6 border-b border-slate-200/50 bg-white/40">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-5">
                <div className="w-16 h-10 overflow-hidden rounded-xl shadow-lg border border-white/80 shrink-0 bg-slate-50 flex items-center justify-center p-0.5">
                  <img
                    src={`https://flagcdn.com/w160/${countryData.iso.toLowerCase()==="il"?"ps":countryData.iso.toLowerCase()}.png`} 
                    alt={countryData.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">
                    {countryData.name==="Israel"?"Occupied Palestinian Territories":countryData.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                       <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       <p className="text-[9px] text-emerald-600 font-black tracking-widest uppercase">Live Intelligence Hub</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 -mr-2 rounded-full hover:bg-slate-900/5 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Intelligence Feed */}
          <ScrollArea className="flex-1">
            <div className="p-8 space-y-6">
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <Globe className="w-4 h-4" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest">Sovereign Summary</h4>
                </div>
                <p className="text-[12px] text-slate-600 leading-relaxed font-bold">
                  {countryData.summary || `Primary analysis indicates significant regional influence. Strategic data for ${countryData.name} is currently undergoing a deep-sector validation.`}
                </p>
              </section>

              <div className="grid grid-cols-1 gap-4">
                <TrendSection 
                  title="Economy" 
                  icon={TrendingUp} 
                  trend={countryData.economyTrend}
                  moduleId="economy"
                  colorClass="border-emerald-100/60 text-emerald-600"
                />
                
                <TrendSection 
                  title="Investment" 
                  icon={Wallet} 
                  trend={countryData.investmentTrend}
                  moduleId="investment"
                  colorClass="border-amber-100/60 text-amber-600"
                />

                <TrendSection 
                  title="Politics" 
                  icon={Shield} 
                  trend={countryData.politicalTrend}
                  moduleId="political"
                  colorClass="border-rose-100/60 text-rose-600"
                />

                <TrendSection 
                  title="Media" 
                  icon={Newspaper} 
                  trend={countryData.mediaTrend}
                  moduleId="media"
                  colorClass="border-sky-100/60 text-sky-600"
                />
              </div>

              {/* Data Validation Note */}
              <div className="p-5 bg-slate-900/5 rounded-2xl border border-slate-900/10">
                 <div className="flex items-center gap-3 mb-2">
                    <Activity className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Global Stability Audit</span>
                 </div>
                 <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                   Real-time signals are processed via the Z-Model Core. Any variance in sovereign reporting is flagged for immediate executive review.
                 </p>
              </div>
            </div>
          </ScrollArea>

          {/* Footer Navigation */}
          <div className="p-6 border-t border-slate-200/50 bg-white/40 backdrop-blur-md shrink-0">
            <Button 
               variant="outline" 
               className="w-full rounded-2xl h-12 bg-white border-slate-200 hover:bg-slate-900 hover:text-white transition-all text-[11px] font-black uppercase tracking-widest flex items-center gap-2"
               onClick={() => navigateToSection('economy')}
            >
              <ExternalLink className="w-4 h-4" /> View Full Sovereignty Report
            </Button>
            <p className="text-[9px] text-slate-400 font-bold tracking-widest text-center uppercase mt-6 flex items-center justify-center gap-2">
              <Shield className="w-3 h-3" />
              Secure Strategic Layer · Restricted Access
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}