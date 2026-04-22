"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Minimize2,
  ExternalLink,
  BookOpen,
  TrendingUp,
  Brain,
  Sparkles,
  Sparkle,
  Target,
  ShieldCheck,
  Zap,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useAIChat } from '@/components/context/AIChatContext';
import { MarkdownContent } from './MarkdownContent';

interface InvestmentCountryViewProps {
  data: {
    title: string;
    subtitle: string;
    category: string;
    badgeText: string;
    badgeClassName: string;
    imageUrl?: string;
    summary: string;
    content: React.ReactNode;
    aiInsights?: Record<string, string | React.ReactNode>;
  };
  onBack: () => void;
  className?: string;
}

const INVESTMENT_AI_BUTTONS = [
  {
    id: 'details',
    label: 'Details',
    description: 'Original Briefing',
    icon: ExternalLink,
    color: 'sky',
    activeGradient: 'from-sky-500 to-sky-600',
    activeBg: 'bg-sky-50',
    activeBorder: 'border-sky-300',
    activeText: 'text-sky-700',
    activeIcon: 'text-sky-500',
  },
  {
    id: 'summary',
    label: 'Executive Summary',
    description: 'Z-Model Overiew',
    icon: BookOpen,
    color: 'violet',
    activeGradient: 'from-violet-500 to-violet-600',
    activeBg: 'bg-violet-50',
    activeBorder: 'border-violet-300',
    activeText: 'text-violet-700',
    activeIcon: 'text-violet-500',
  },
  {
    id: 'opportunities',
    label: 'Top 3 Opportunities',
    description: 'Strategic Alpha',
    icon: Target,
    color: 'emerald',
    activeGradient: 'from-emerald-500 to-emerald-600',
    activeBg: 'bg-emerald-50',
    activeBorder: 'border-emerald-300',
    activeText: 'text-emerald-700',
    activeIcon: 'text-emerald-500',
  },
  {
    id: 'tactical',
    label: 'Tactical Recommendations',
    description: 'Strategic Guidance',
    icon: ShieldCheck,
    color: 'amber',
    activeGradient: 'from-amber-500 to-amber-600',
    activeBg: 'bg-amber-50',
    activeBorder: 'border-amber-300',
    activeText: 'text-amber-700',
    activeIcon: 'text-amber-500',
  },
];

const INVESTMENT_LOADING_PHRASES: Record<string, string[]> = {
  summary: [
    "Auditing sovereign fiscal vectors...",
    "Correlating D33 growth anchors...",
    "Synthesizing Executive Summary...",
    "Finalizing Investment Brief..."
  ],
  opportunities: [
    "Scanning regional alpha targets...",
    "Calculating risk-adjusted ROI clusters...",
    "Filtering gigascale pipelines...",
    "Finalizing Top Opportunities..."
  ],
  tactical: [
    "Simulating capital rotation models...",
    "Aligning with institutional sentiment...",
    "Refining strategic guidance...",
    "Finalizing Recommendations..."
  ]
};

export function InvestmentCountryView({
  data,
  onBack,
  className
}: InvestmentCountryViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeButton, setActiveButton] = useState<string>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState('');
  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set(['details']));
  const { sendMessage, setIsOpen, setIsMinimized } = useAIChat();

  const handleAiBadgeClick = () => {
    setIsOpen(true);
    setIsMinimized(false);
    
    const userQuery = `Analyze Investment Potential: ${data.title}`;
    sendMessage(userQuery, "user");
  };

  const handleButtonClick = (id: string) => {
    if (id === activeButton) return;
    
    if (id !== 'details' && !loadedSections.has(id)) {
      setIsLoading(true);
      setActiveButton(id);
      
      const phrases = INVESTMENT_LOADING_PHRASES[id] || ["Initializing Z-Model Core...", "Synthesizing Data...", "Finalizing..."];
      let phraseIndex = 0;
      setLoadingPhrase(phrases[0]);

      const phraseInterval = setInterval(() => {
        phraseIndex++;
        if (phraseIndex < phrases.length) {
          setLoadingPhrase(phrases[phraseIndex]);
        }
      }, 700);

      setTimeout(() => {
        setIsLoading(false);
        setLoadedSections(prev => new Set([...prev, id]));
        clearInterval(phraseInterval);
      }, 2800);
    } else {
      setActiveButton(id);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveButton('details');
    setLoadedSections(new Set(['details']));
  }, [data]);

  const active = INVESTMENT_AI_BUTTONS.find(b => b.id === activeButton);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 16 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "bg-white/50 backdrop-blur-3xl border border-white/80 rounded-[36px] shadow-2xl overflow-hidden flex flex-col border-b-4 border-b-slate-900",
        className
      )}
    >
      {/* ─── TOP BANNER IMAGE ─── */}
      <div className="relative w-full h-[220px] bg-slate-100 shrink-0 overflow-hidden">
        <img
          src={data.imageUrl || "/assets/images/branding/fallback.png"}
          alt={data.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/assets/images/branding/fallback.png";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/40 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-3 h-3" />
          Back
        </button>

        <button
          onClick={onBack}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/40 transition-all cursor-pointer"
        >
          <Minimize2 className="w-3.5 h-3.5 text-white" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
          <div className="flex-1 min-w-0 pr-4">
            <Badge
              className={cn(
                "mb-2 text-[9px] font-black uppercase border-none h-5 px-3 shadow-lg",
                data.badgeClassName
              )}
            >
              {data.badgeText}
            </Badge>
            <h2 className="text-xl lg:text-2xl font-black text-white leading-tight tracking-tight drop-shadow-2xl line-clamp-2">
              {data.title}
            </h2>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25">
             <TrendingUp className="w-4 h-4 text-emerald-400" />
             <div className="text-right">
                <p className="text-[9px] font-black text-white uppercase leading-none">Investment Grade</p>
                <p className="text-[8px] font-bold text-white/60 uppercase leading-none mt-0.5">Top Choice</p>
             </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* LEFT: Content */}
        <div className="flex-1 min-w-0 flex flex-col min-h-0 border-r border-slate-100/80">
          <ScrollArea className="flex-1" ref={scrollContainerRef as any}>
            <div className="p-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5 text-justify">
                {data.subtitle}
              </p>

              <p className="text-lg lg:text-xl font-black text-slate-900 leading-snug mb-6 tracking-tight text-justify">
                {data.summary}
              </p>

              <div className="w-12 h-0.5 bg-slate-900 mb-6 rounded-full" />

              <div className="prose prose-slate max-w-none text-slate-600 leading-loose text-[15px] font-medium">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center justify-center py-20 gap-8 min-h-[300px]"
                    >
                      <div className="relative">
                        <div className={cn(
                          "absolute inset-0 blur-3xl rounded-full animate-pulse opacity-20",
                          active?.activeGradient ? `bg-${active.color}-500` : "bg-indigo-500"
                        )} />
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
                          className="relative z-10 w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center border border-slate-100"
                        >
                          <Sparkle className={cn(
                            "w-10 h-10 ",
                            active?.activeText || "text-indigo-500"
                          )} />
                        </motion.div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-slate-200/50 rounded-full animate-[spin_10s_linear_infinite]" />
                      </div>

                      <div className="space-y-3 text-center z-10">
                        <div className="flex items-center justify-center gap-2">
                           <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className={cn("w-1 h-1 rounded-full", active?.activeIcon || "bg-indigo-500")}
                              />
                            ))}
                          </div>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Investment Neural Engine</span>
                        </div>

                        <motion.p
                          key={loadingPhrase}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-lg font-black tracking-tight h-7 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent"
                        >
                          {loadingPhrase}
                        </motion.p>
                        
                        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                          Sovereign Intelligence • Node {Math.floor(Math.random() * 90) + 10}
                        </p>
                      </div>

                      <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className={cn(
                            "h-full bg-gradient-to-r",
                            active?.activeGradient || "from-indigo-500 to-blue-500"
                          )}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2.8, ease: "easeInOut" }}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeButton}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {activeButton === 'details' ? (
                        data.content
                      ) : (
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-100 mb-6">
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                              active?.activeGradient && `bg-gradient-to-br ${active.activeGradient}`
                            )}>
                              {active && <active.icon className="w-4 h-4 text-white" />}
                            </div>
                            <div>
                              <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">
                                {active?.label} Analysis
                              </h3>
                              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mt-1">
                                Source: Z-Model Investment Neural Core
                              </p>
                            </div>
                          </div>

                          <div className="mt-6">
                            {data.aiInsights?.[activeButton] ? (
                              typeof data.aiInsights[activeButton] === 'string' ? (
                                <MarkdownContent content={data.aiInsights[activeButton] as string} />
                              ) : (
                                data.aiInsights[activeButton]
                              )
                            ) : (
                              <div className="py-12 text-center">
                                <p className="text-slate-400 italic">No specific AI data found for this category. The neural engine is still processing the latest data vectors.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* RIGHT: AI Analysis Panel */}
        <div className="w-[200px] shrink-0 flex flex-col bg-slate-50/60 border-l border-slate-100">
          <div className="px-4 pt-5 pb-4 border-b border-slate-100">
            <div 
              onClick={handleAiBadgeClick}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-200/40 cursor-pointer hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Brain className="w-3.5 h-3.5 text-white shrink-0" />
              <div className="min-w-0">
                <p className="text-[9px] font-black text-white uppercase tracking-widest leading-none">Chat with the AI</p>
                <p className="text-[8px] font-bold text-white/60 leading-none mt-0.5 truncate">Active Synthesis</p>
              </div>
              <Sparkles className="w-3 h-3 text-white/70 shrink-0 ml-auto" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1.5">
            {INVESTMENT_AI_BUTTONS.map((btn) => {
              const isActive = activeButton === btn.id;
              return (
                <motion.button
                  key={btn.id}
                  onClick={() => handleButtonClick(btn.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer",
                    isActive
                      ? `${btn.activeBg} ${btn.activeBorder} shadow-sm`
                      : "bg-white/70 border-slate-100 hover:border-slate-200 hover:bg-white"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all",
                    isActive
                      ? `bg-gradient-to-br ${btn.activeGradient} shadow-sm`
                      : "bg-slate-100"
                  )}>
                    <Sparkles className={cn(
                      "w-3 h-3 transition-colors",
                      isActive ? "text-white" : "text-slate-400"
                    )} />
                  </div>
                  <div className="min-w-0">
                    <p className={cn(
                      "text-[10px] font-black uppercase tracking-wide leading-none truncate",
                      isActive ? btn.activeText : "text-slate-700"
                    )}>
                      {btn.label}
                    </p>
                    <p className={cn(
                      "text-[8px] font-bold leading-none mt-0.5 truncate",
                      isActive ? `${btn.activeText} opacity-70` : "text-slate-400"
                    )}>
                      {btn.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="px-4 py-3 border-t border-slate-100">
            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest text-center leading-relaxed">
              Powered by<br />Z-Model Intelligence
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
