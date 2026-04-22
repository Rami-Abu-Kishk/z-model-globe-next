"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Sparkle, Clock, Activity, Zap, Users, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { KpiProjectionChart } from './KpiProjectionChart';

export interface KpiInsightData {
  title: string;
  value: string;
  org: string;
  rep?: string;
  unit?: string;
  historicalData: number[];
  forecastData: number[];
  labels: {
    historical: string[];
    forecast: string[];
  };
  analysis: {
    historical: string;
    forecast: string;
  };
  stats: {
    historical: { confidence: string; delta: string };
    forecast: { confidence: string; delta: string };
  };
  outlookAndDrivers?: string[];
  interpretation?: string;
}

interface KpiInsightOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  kpi: KpiInsightData | null;
  loadingPhrases?: string[];
}

const DEFAULT_LOADING_PHRASES = [
  "Initializing Z-Model Distributed Core...",
  "Synthesizing Strategic Vectors...",
  "Processing Horizon KPIs...",
  "Calibrating Simulation Models...",
  "Finalizing AI Synthesis..."
];

export function KpiInsightOverlay({ 
  isOpen, 
  onClose, 
  kpi, 
  loadingPhrases = DEFAULT_LOADING_PHRASES 
}: KpiInsightOverlayProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState('');
  const [viewMode, setViewMode] = useState<'historical' | 'forecast'>('historical');
  const [hasForecastLoaded, setHasForecastLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setViewMode('historical');
      setHasForecastLoaded(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isLoading) {
      let phraseIndex = 0;
      setLoadingPhrase(loadingPhrases[0]);
  
      const phraseInterval = setInterval(() => {
        phraseIndex++;
        if (phraseIndex < loadingPhrases.length) {
          setLoadingPhrase(loadingPhrases[phraseIndex]);
        }
      }, 600);
  
      const timer = setTimeout(() => {
        setIsLoading(false);
        clearInterval(phraseInterval);
      }, 3500);
  
      return () => {
        clearTimeout(timer);
        clearInterval(phraseInterval);
      };
    }
  }, [isLoading, loadingPhrases]);

  if (!kpi) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/10 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-2xl bg-white/95 backdrop-blur-3xl border border-white/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] rounded-[2.5rem] overflow-hidden max-h-[90vh] overflow-y-auto"
            initial={{ rotateY: -15, opacity: 0, scale: 0.9, y: 20 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1, y: 0 }}
            exit={{ rotateY: 15, opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
          >
            {isLoading ? (
              <div className="p-20 flex flex-col items-center justify-center gap-8 min-h-[500px]">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative z-10 w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center border border-indigo-100"
                  >
                    <Sparkle className="w-12 h-12 text-indigo-500" />
                  </motion.div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-indigo-500/10 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-blue-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                </div>

                <div className="space-y-4 text-center z-10">
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 rounded-full bg-indigo-500"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">AI Synthesis Core</span>
                  </div>

                  <motion.p
                    key={loadingPhrase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-lg font-black tracking-tight h-8 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"
                  >
                    {loadingPhrase}
                  </motion.p>

                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Z-Model Distributed Analytical Intelligence
                  </p>
                </div>

                <div className="w-64 h-1 bg-slate-100 rounded-full overflow-hidden mt-4">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                  />
                </div>
              </div>
            ) : (
              <div className="p-10 flex flex-col gap-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Institutional Deep-Dive</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
                      {viewMode === 'historical' 
                        ? kpi.value 
                        : (() => {
                            // Priority: Use the actual last point of the forecast data array
                            if (kpi.forecastData && kpi.forecastData.length > 0) {
                              const lastVal = kpi.forecastData[kpi.forecastData.length - 1];
                              return `~${kpi.value.startsWith('$') ? '$' : ''}${lastVal}${kpi.unit || ''}`;
                            }
                            
                            // Fallback: Safe numeric multiplier
                            const numericPart = kpi.value.match(/[\d.]+/);
                            if (!numericPart) return kpi.value;
                            const val = parseFloat(numericPart[0]);
                            const projected = (val * 1.2).toFixed(1);
                            return `~${kpi.value.startsWith('$') ? '$' : ''}${projected}${kpi.unit || ''}`;
                          })()
                      } 
                      {/* <span className="text-indigo-500 ml-2">↑</span> */}
                    </h2>
                    <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest">
                      {kpi.title} - {kpi.org} Matrix ({viewMode === 'historical' ? 'Audited' : 'Projected'})
                    </p>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-sm cursor-pointer"
                  >
                    <X className="w-4 h-4 text-indigo-600" />
                  </button>
                </div>

                <div className="p-8 bg-indigo-50/20 backdrop-blur-sm border border-indigo-100/50 rounded-3xl relative overflow-hidden group/reasoning">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/20" />
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkle className="w-4 h-4 text-indigo-600" />
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
                      {viewMode === 'historical' ? 'Executive Audit Summary' : 'AI Predictive Synthesis'}
                    </span>
                  </div>
                  <p className="text-[14px] font-bold text-slate-700 leading-relaxed tracking-tight">
                    {viewMode === 'historical' ? kpi.analysis.historical : kpi.analysis.forecast}
                  </p>
                </div>

                <div className="bg-indigo-50/30 border border-indigo-100/50 p-6 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[10px] font-black text-indigo-700 uppercase tracking-[0.2em]">
                      {viewMode === 'historical' ? 'Historical Performance Benchmarks' : 'Hockeystick Acceleration Vector'}
                    </h4>
                    <Badge className="bg-indigo-100/50 text-indigo-600 border-none text-[8px] font-black uppercase">
                      {viewMode === 'historical' ? 'Verified' : 'AI Projection'}
                    </Badge>
                  </div>
                  <KpiProjectionChart 
                    mode={viewMode} 
                    data={viewMode === 'historical' ? kpi.historicalData : kpi.forecastData}
                    labels={viewMode === 'historical' ? kpi.labels.historical : kpi.labels.forecast}
                    unit={kpi.unit}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                      {viewMode === 'historical' ? 'Audit Confidence' : 'Prediction Reliability'}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-slate-900">
                        {viewMode === 'historical' ? kpi.stats.historical.confidence : kpi.stats.forecast.confidence}
                      </span>
                      <Badge className="bg-indigo-50 text-indigo-600 border-none text-[8px] font-black uppercase">Institutional</Badge>
                    </div>
                  </div>
                  <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                      {viewMode === 'historical' ? 'Historical Delta' : 'Projected Delta'}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-indigo-600">
                        {viewMode === 'historical' ? kpi.stats.historical.delta : kpi.stats.forecast.delta}
                      </span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">vs Baseline</span>
                    </div>
                  </div>
                </div>

                {/* Outlook & Drivers Section */}
                {viewMode === 'forecast' && kpi.outlookAndDrivers && kpi.outlookAndDrivers.length > 0 && (
                  <div className="p-8 bg-slate-50/50 border border-slate-100 rounded-3xl space-y-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">Outlook & Structural Drivers</span>
                    </div>
                    <ul className="grid grid-cols-1 gap-2">
                      {kpi.outlookAndDrivers.map((driver, idx) => (
                        <li key={idx} className="flex gap-3 text-[13px] font-bold text-slate-600 leading-tight">
                          <span className="text-amber-500 mt-0.5">•</span>
                          {driver}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Interpretation Section (Forecast Only) */}
                {viewMode === 'forecast' && kpi.interpretation && (
                  <div className="p-8 bg-blue-50/30 border border-blue-100 rounded-3xl space-y-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="text-[10px] font-black text-blue-800 uppercase tracking-[0.2em]">Strategic Interpretation</span>
                    </div>
                    <p className="text-[14px] font-bold text-slate-700 leading-relaxed tracking-tight italic">
                      " {kpi.interpretation} "
                    </p>
                  </div>
                )}

                <div className="pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
                  <button 
                    onClick={() => {
                      if (viewMode === 'historical' && !hasForecastLoaded) {
                        setIsLoading(true);
                        setHasForecastLoaded(true);
                      }
                      setViewMode(viewMode === 'historical' ? 'forecast' : 'historical');
                    }}
                    className={`px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-lg flex items-center gap-2 cursor-pointer ${
                      viewMode === 'forecast' 
                        ? 'bg-slate-900 text-white hover:bg-slate-800' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {viewMode === 'historical' ? <Sparkles className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {viewMode === 'historical' ? 'Forecast Vector' : 'Historical Audit'}
                  </button>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.1em]">
                    Institutional deep-dive powered by Z-Model Distributed Core
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
