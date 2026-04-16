"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useZModelStore } from '@/lib/store';

export function ReturnHUD() {
  const viewState = useZModelStore((s) => s.viewState);
  const resetView = useZModelStore((s) => s.resetView);

  const handleReturn = () => {
    resetView();
  };

  return (
    <AnimatePresence>
      {viewState === 'EARTH_FOCUS' && (
        <motion.div
          initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-12 right-12 z-[100] pointer-events-auto"
        >
          <button
            onClick={handleReturn}
            className="
              flex items-center gap-2 
              px-5 py-2.5 rounded-2xl
              bg-white/40 backdrop-blur-2xl 
              border border-white/60
              shadow-[0_8px_32px_rgba(0,0,0,0.1)]
              text-slate-800 text-sm font-bold tracking-tight
              hover:bg-white/60 hover:scale-105
              active:scale-95
              transition-all duration-200
              group
            "
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            RETURN TO ORBIT
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
