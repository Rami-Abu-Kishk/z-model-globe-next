"use client";

import React from 'react';
import { Sparkle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AiBadgeProps {
  className?: string;
  onClick: (e: React.MouseEvent) => void;
  tooltipText?: string;
}

export const AiBadge = ({ 
  className = "", 
  onClick, 
  tooltipText = "AI Synthesis" 
}: AiBadgeProps) => {
  const handleBadgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(e);
  };

  return (
    <div 
      onClick={handleBadgeClick}
      className={`absolute w-10 h-10 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center z-[20] hover:scale-110 transition-transform duration-300 cursor-pointer ${className}`}
    >
      <TooltipProvider delay={100}>
        <Tooltip>
          <TooltipTrigger>
            <div className="w-full h-full flex items-center justify-center">
              <Sparkle 
                className="w-5 h-5 text-indigo-600" 
                style={{ 
                  filter: "drop-shadow(0 0 5px rgba(79, 70, 229, 0.4))",
                  fill: "currentColor",
                  fillOpacity: 0.1 
                }}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            className="bg-slate-900 text-white border-none text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-2xl"
          >
            {tooltipText}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
