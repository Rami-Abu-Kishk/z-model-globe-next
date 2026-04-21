"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Orbit, Pause, Play } from 'lucide-react';
import { useZModelStore } from '@/lib/store';

export function GlobeControls() {
  const autoRotate = useZModelStore((s) => s.autoRotate);
  const setAutoRotate = useZModelStore((s) => s.setAutoRotate);
  const viewState = useZModelStore((s) => s.viewState);

  // Don't show controls when in CARD_FOCUS to keep UI clean
  //if (viewState === 'CARD_FOCUS') return null;
  //  const activeCountry = useZModelStore((s) => s.activeCountry);

  // Don't show controls when in CARD_FOCUS or when a country is selected to keep UI clean
  // if (viewState === 'CARD_FOCUS' || !!activeCountry) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="pointer-events-auto"
    >
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`
            group relative flex items-center justify-center
            w-14 h-14 rounded-2xl
            bg-white/40 backdrop-blur-2xl 
            border border-white/60
            shadow-[0_8px_32px_rgba(0,0,0,0.1)]
            transition-all duration-300
            hover:bg-white/60 hover:scale-105 active:scale-95 cursor-pointer
          `}
          title={autoRotate ? "Disable Auto-Rotation" : "Enable Auto-Rotation"}
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: autoRotate ? 360 : 0 }}
              transition={autoRotate ? { duration: 15, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
              className={`${autoRotate ? 'text-sky-600' : 'text-slate-400'}`}
            >
              <Orbit className="w-7 h-7" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              {autoRotate ? (
                <Pause className="w-2.5 h-2.5 text-sky-600 fill-sky-600" />
              ) : (
                <Play className="w-2.5 h-2.5 text-slate-500 fill-slate-500 ml-0.5" />
              )}
            </div>
          </div>

          {/* Tooltip */}
          <div className="absolute left-20 px-3 py-1 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 -translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl border border-white/10 flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${autoRotate ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
            {autoRotate ? "Auto-Rotate: ON" : "Auto-Rotate: OFF"}
          </div>
        </button>
      </div>
    </motion.div>
  );
}
