"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Type, X } from 'lucide-react';
import { useZModelStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface InterfaceZoomControlsProps {
  onClose?: () => void;
  className?: string;
}

export function InterfaceZoomControls({ onClose, className }: InterfaceZoomControlsProps) {
  const interfaceScale = useZModelStore((s) => s.interfaceScale);
  const setInterfaceScale = useZModelStore((s) => s.setInterfaceScale);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={cn("flex flex-row items-center gap-3 pointer-events-auto z-[100]", className)}
    >
      <div className="flex flex-row items-center p-1.5 bg-white/60 backdrop-blur-3xl border border-white/80 rounded-full shadow-[0_16px_48px_rgba(0,0,0,0.15)] relative">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg border border-white/20"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        )}

        <button
          onClick={() => setInterfaceScale(Math.max(0.6, interfaceScale - 0.2))}
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-white/40 active:scale-90 transition-all"
          title="Decrease Label Size"
        >
          <ZoomOut className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-slate-200/50 mx-2" />
        
        <div className="flex flex-col items-center px-1 min-w-[40px]">
           <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">
             {Math.round(interfaceScale * 100)}%
           </span>
           <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">Scale</span>
        </div>

        <div className="h-6 w-px bg-slate-200/50 mx-2" />

        <button
          onClick={() => setInterfaceScale(Math.min(2.0, interfaceScale + 0.2))}
          className="w-10 h-10 rounded-full flex items-center justify-center text-sky-600 hover:bg-white/40 active:scale-90 transition-all"
          title="Increase Label Size"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
