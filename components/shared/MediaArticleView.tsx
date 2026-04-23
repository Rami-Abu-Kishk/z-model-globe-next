"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Minimize2,
  ExternalLink,
  Link2,
  BarChart3,
  BookOpen,
  Clock,
  GitCompare,
  Layers,
  Lightbulb,
  TrendingUp,
  RefreshCw,
  Star,
  Sparkles,
  Brain,
  Sparkle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useAIChat } from '@/components/context/AIChatContext';
import type { BaseArticle } from './SharedArticleView';
import { MarkdownContent } from './MarkdownContent';

interface MediaArticleViewProps {
  article: BaseArticle;
  onBack: () => void;
  className?: string;
}

const AI_ANALYSIS_BUTTONS = [
  {
    id: 'details',
    label: 'Details',
    description: 'Original Article',
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
    label: 'Summary',
    description: 'Article Overview',
    icon: BookOpen,
    color: 'violet',
    activeGradient: 'from-violet-500 to-violet-600',
    activeBg: 'bg-violet-50',
    activeBorder: 'border-violet-300',
    activeText: 'text-violet-700',
    activeIcon: 'text-violet-500',
  },
  {
    id: 'statistics',
    label: 'Statistics',
    description: 'Key Data Points',
    icon: BarChart3,
    color: 'amber',
    activeGradient: 'from-amber-500 to-amber-600',
    activeBg: 'bg-amber-50',
    activeBorder: 'border-amber-300',
    activeText: 'text-amber-700',
    activeIcon: 'text-amber-500',
  },
  {
    id: 'background',
    label: 'Background',
    description: 'Historical Context',
    icon: Clock,
    color: 'emerald',
    activeGradient: 'from-emerald-500 to-emerald-600',
    activeBg: 'bg-emerald-50',
    activeBorder: 'border-emerald-300',
    activeText: 'text-emerald-700',
    activeIcon: 'text-emerald-500',
  },
  {
    id: 'traceback',
    label: 'Traceback',
    description: 'Historical Timeline',
    icon: GitCompare,
    color: 'rose',
    activeGradient: 'from-rose-500 to-rose-600',
    activeBg: 'bg-rose-50',
    activeBorder: 'border-rose-300',
    activeText: 'text-rose-700',
    activeIcon: 'text-rose-500',
  },
  {
    id: 'comparison',
    label: 'Comparison',
    description: 'Cross-Agency View',
    icon: Layers,
    color: 'indigo',
    activeGradient: 'from-indigo-500 to-indigo-600',
    activeBg: 'bg-indigo-50',
    activeBorder: 'border-indigo-300',
    activeText: 'text-indigo-700',
    activeIcon: 'text-indigo-500',
  },
  {
    id: 'analysis',
    label: 'Analysis',
    description: 'Intelligence Insights',
    icon: Lightbulb,
    color: 'orange',
    activeGradient: 'from-orange-500 to-orange-600',
    activeBg: 'bg-orange-50',
    activeBorder: 'border-orange-300',
    activeText: 'text-orange-700',
    activeIcon: 'text-orange-500',
  },
  {
    id: 'prediction',
    label: 'Prediction',
    description: 'Forecast & Outlook',
    icon: TrendingUp,
    color: 'cyan',
    activeGradient: 'from-cyan-500 to-cyan-600',
    activeBg: 'bg-cyan-50',
    activeBorder: 'border-cyan-300',
    activeText: 'text-cyan-700',
    activeIcon: 'text-cyan-500',
  },
  {
    id: 'cross-referencing',
    label: 'Cross Referencing',
    description: 'Pattern Analysis',
    icon: RefreshCw,
    color: 'teal',
    activeGradient: 'from-teal-500 to-teal-600',
    activeBg: 'bg-teal-50',
    activeBorder: 'border-teal-300',
    activeText: 'text-teal-700',
    activeIcon: 'text-teal-500',
  },
  {
    id: 'recommendation',
    label: 'Recommendation',
    description: 'Strategic Guidance',
    icon: Star,
    color: 'yellow',
    activeGradient: 'from-yellow-500 to-yellow-600',
    activeBg: 'bg-yellow-50',
    activeBorder: 'border-yellow-300',
    activeText: 'text-yellow-700',
    activeIcon: 'text-yellow-500',
  },
];

const AI_LOADING_PHRASES: Record<string, string[]> = {
  summary: [
    "Parsing article structure...",
    "Extracting core narrative...",
    "Synthesizing overview...",
    "Finalizing Summary..."
  ],
  statistics: [
    "Aggregating quantitative vectors...",
    "Calculating data density...",
    "Formatting metric matrices...",
    "Finalizing Statistics..."
  ],
  background: [
    "Querying historical data-lake...",
    "Establishing context anchors...",
    "Retrieving epoch metadata...",
    "Finalizing Background..."
  ],
  traceback: [
    "Mapping causal chains...",
    "Tracking narrative evolution...",
    "Correlating timeline nodes...",
    "Finalizing Traceback..."
  ],
  comparison: [
    "Analyzing cross-agency patterns...",
    "Identifying narrative variance...",
    "Normalizing perspective vectors...",
    "Finalizing Comparison..."
  ],
  analysis: [
    "Initiating neural deep-dive...",
    "Extracting strategic insights...",
    "Evaluating intelligence weight...",
    "Finalizing Analysis..."
  ],
  prediction: [
    "Extrapolating current trajectories...",
    "Generating probabilistic models...",
    "Forecasting impact horizons...",
    "Finalizing Prediction..."
  ],
  'cross-referencing': [
    "Syncing global news clusters...",
    "Finding entity relationships...",
    "Validating source consistency...",
    "Finalizing Cross-Referencing..."
  ],
  recommendation: [
    "Calculating strategic options...",
    "Refining guidance vectors...",
    "Finalizing Executive Recommendations..."
  ]
};

export function MediaArticleView({
  article,
  onBack,
  className
}: MediaArticleViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeButton, setActiveButton] = useState<string>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState('');
  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set(['details']));
  const { sendMessage, setIsOpen, setIsMinimized } = useAIChat();

  const handleAiBadgeClick = () => {
    setIsOpen(true);
    setIsMinimized(false);
    sendMessage("Analyze: MENA Cloud Infrastructure Expansion", "user");
  };

  const handleButtonClick = (id: string) => {
    if (id === activeButton) return;
    
    if (id !== 'details' && !loadedSections.has(id)) {
      setIsLoading(true);
      setActiveButton(id);
      
      const phrases = AI_LOADING_PHRASES[id] || ["Initializing Z-Model Core...", "Synthesizing Data...", "Finalizing..."];
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

  // Scroll to top whenever the article content changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveButton('details');
    setLoadedSections(new Set(['details']));
  }, [article]);

  const active = AI_ANALYSIS_BUTTONS.find(b => b.id === activeButton);

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
          src={article.imageUrl || "/assets/images/branding/fallback.png"}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/assets/images/branding/fallback.png";
          }}
        />
        {/* gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

        {/* Back button — top left */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/40 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-3 h-3" />
          Back
        </button>

        {/* Minimize — top right */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/40 transition-all cursor-pointer"
        >
          <Minimize2 className="w-3.5 h-3.5 text-white" />
        </button>

        {/* Bottom overlay: badge + title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
          <div className="flex-1 min-w-0 pr-4">
            <Badge
              className={cn(
                "mb-2 text-[9px] font-black uppercase border-none h-5 px-3 shadow-lg",
                article.badgeClassName || "bg-sky-500"
              )}
            >
              {article.badgeText || article.category}
            </Badge>
            <h2 className="text-xl lg:text-2xl font-black text-white leading-tight tracking-tight drop-shadow-2xl line-clamp-2">
              {article.title}
            </h2>
          </div>

          {/* Source chip */}
          {article.source && (
            <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25">
              <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-[10px] overflow-hidden shrink-0">
                {article.source.icon ? article.source.icon : (
                  <span>{article.source.initial || article.source.name?.[0] || 'Z'}</span>
                )}
              </div>
              <div>
                <p className="text-[9px] font-black text-white uppercase leading-none">{article.source.name}</p>
                <p className="text-[8px] font-bold text-white/60 uppercase leading-none mt-0.5">{article.subtitle}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── BODY: two columns ─── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* LEFT: Scrollable article content */}
        <div className="flex-1 min-w-0 flex flex-col min-h-0 border-r border-slate-100/80">
          <ScrollArea className="flex-1" ref={scrollContainerRef as any}>
            <div className="p-8">
              {/* Subtitle / Meta */}
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5">
                {article.subtitle}
              </p>

              {/* Summary */}
              <p className="text-lg lg:text-xl font-black text-slate-900 leading-snug mb-6 tracking-tight">
                {article.summary}
              </p>

              {/* Divider */}
              <div className="w-12 h-0.5 bg-slate-900 mb-6 rounded-full" />

              {/* Body content */}
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
                            "w-10 h-10",
                            active?.activeText || "text-indigo-500"
                          )} />
                        </motion.div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-slate-200/50 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 border border-slate-100/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
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
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Neural Synthesis Core</span>
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
                          Distributed Intelligence • Cluster {Math.floor(Math.random() * 90) + 10}
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
                        typeof article.content === 'string' ? (
                          <p>{article.content}</p>
                        ) : (
                          article.content || (
                            <p>
                              Strategic intelligence reports indicate that this development will have significant
                              implications for regional sovereignty and digital infrastructure. Our analysis suggests
                              a 15% increase in operational efficiency across relevant sectors within the next
                              fiscal quarter.
                            </p>
                          )
                        )
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
                                Source: Z-Model Neural Engine
                              </p>
                            </div>
                          </div>

                          <div className="mt-6">
                            {article.aiInsights?.[activeButton] ? (
                              typeof article.aiInsights[activeButton] === 'string' ? (
                                <MarkdownContent content={article.aiInsights[activeButton] as string} />
                              ) : (
                                article.aiInsights[activeButton]
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
          {/* AI Label header */}
          <div className="px-4 pt-5 pb-4 border-b border-slate-100">
            <div 
              onClick={handleAiBadgeClick}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-indigo-200/40 cursor-pointer hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Brain className="w-3.5 h-3.5 text-white shrink-0" />
              <div className="min-w-0">
                <p className="text-[9px] font-black text-white uppercase tracking-widest leading-none">Chat with AI</p>
                <p className="text-[8px] font-bold text-white/60 leading-none mt-0.5 truncate">Z-Model Neural Engine</p>
              </div>
              <Sparkles className="w-3 h-3 text-white/70 shrink-0 ml-auto" />
            </div>
          </div>

          {/* Buttons list */}
          <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1.5">
            {AI_ANALYSIS_BUTTONS.map((btn) => {
              const Icon = btn.icon;
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

          {/* Footer note */}
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
