"use client";

import React, { useState, useMemo } from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { SharedArticleView } from '@/components/shared/SharedArticleView';
import { useZModelStore } from '@/lib/store';
import { useAIChat } from '../context/AIChatContext';
import { AiBadge } from '../shared/AiBadge';

import { 
  Newspaper, 
  FileText, 
  ChevronLeft, 
  Download, 
  ChevronRight,
  Globe, 
  TrendingUp, 
  Zap, 
  Activity, 
  Search,
  ArrowUpRight,
  TrendingDown,
  Maximize2,
  Minimize2,
  ExternalLink
} from 'lucide-react';
import { 
  mediaDataStore,
  type NewsItem 
} from '@/lib/mock-data/media.mock';
import { motion, AnimatePresence } from 'framer-motion';

export function MediaModule({ isExpanded }: { isExpanded?: boolean }) {
  const { 
    setActiveTarget, 
    setSelectedCountries, 
    setSelectedCountry,
    selectedCountry,
    mediaCategoryFilter,
    setMediaCategoryFilter,
    mediaActiveNewsId,
    setMediaActiveNewsId,
    mediaSelectedArticle,
    setMediaSelectedArticle
  } = useZModelStore();
  const { triggerChatFromCard } = useAIChat();
  
  const handleAiTrigger = (e: React.MouseEvent, news: NewsItem) => {
    e.stopPropagation();
    triggerChatFromCard({
      module: 'Media',
      section: 'Breaking News',
      title: news.headline,
      value: news.source
    });
  };

  const data = useMemo(() => 
    mediaDataStore[selectedCountry || 'GLOBAL'] || mediaDataStore['GLOBAL'],
    [selectedCountry]
  );

  const handleNewsClick = (news: NewsItem) => {
    if (news.target) {
      setActiveTarget(news.target);
    }
    if (news.countries) {
      setSelectedCountries(news.countries);
      setSelectedCountry(null);
    }
    // Set active ID for globe filtering
    setMediaActiveNewsId(news.id);
    // Set category for filtering if not already set
    setMediaCategoryFilter(news.category as any);
    
    // Only set selected article if we are in expanded view
    if (isExpanded) {
      setMediaSelectedArticle(news);
    }
  };

  const handleBack = () => {
    setMediaSelectedArticle(null);
    setMediaActiveNewsId(null);
  };

  if (isExpanded) {
    return (
      <div className="flex flex-col gap-8 pb-4 relative min-h-[700px]">
        {/* TOP: 3-Column Performance Grid - Hidden when an article is focused */}
        <AnimatePresence>
          {!mediaSelectedArticle && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {data.metrics.map((metric, idx) => (
                <div key={idx} className="p-5 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl flex flex-col justify-between group hover:border-emerald-400/50 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{metric.label}</p>
                    <div className={`flex items-center gap-1 text-[10px] font-black ${metric.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {metric.change}
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{metric.value}</h3>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN: Intelligence Dashboard Grid */}
        <div className="relative flex-1">
          <AnimatePresence mode="wait">
            {!mediaSelectedArticle ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
              >
                {/* Bucket 1: Breaking News (Pulse) */}
                <div 
                  className={cn(
                    "flex flex-col bg-white/40 backdrop-blur-xl border rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden min-h-[630px] cursor-pointer",
                    mediaCategoryFilter === 'Breaking' ? "border-rose-400 ring-2 ring-rose-400/20 scale-[1.01]" : "border-white/60"
                  )}
                  onClick={() => setMediaCategoryFilter('Breaking')}
                >
                  <div className="p-6 h-[110px] border-b border-rose-100 bg-rose-50/50 flex items-center justify-between">
                    <div className="flex flex-col justify-center h-full">
                      <h4 className="text-[12px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-2 m-0">
                        <Zap className="w-4 h-4 shrink-0" /> Breaking News Feed
                      </h4>
                      <p className="text-[10px] text-rose-400 font-bold mt-1 tracking-tighter italic m-0 pl-6 uppercase">LATEST {selectedCountry || 'GLOBAL'} INTELLIGENCE</p>
                    </div>
                    <Badge className="bg-rose-500 text-white animate-pulse text-[9px] h-6 px-3">LIVE</Badge>
                  </div>
                  
                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-4">
                      {data.breaking.map((news) => (
                        <div 
                          key={news.id} 
                          onClick={() => handleNewsClick(news)}
                          className="p-5 rounded-2xl bg-white/60 border border-slate-100 hover:border-rose-200 hover:bg-white transition-all cursor-pointer group relative"
                        >
                          <div className="flex items-center justify-between mb-3">
                             <div className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                               <span className="text-[10px] font-black text-slate-400 uppercase">{news.source} • {news.time}</span>
                             </div>
                             <div className="flex items-center gap-2">
                               <AiBadge 
                                 onClick={(e) => handleAiTrigger(e, news)}
                                 className="!relative !w-6 !h-6 !static border-rose-100 bg-rose-50/30 shadow-none hover:bg-rose-50 hover:scale-110"
                                 tooltipText="Sentiment Audit"
                               />
                               <Maximize2 className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:text-rose-500" />
                             </div>
                          </div>
                          <h4 className="text-[15px] font-black text-slate-900 group-hover:text-rose-600 transition-colors leading-tight mb-3">
                            {news.headline}
                          </h4>
                          <p className="text-[12px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                            {news.summary}
                          </p>
                        </div>
                      ))}
                      {data.breaking.length === 0 && (
                        <div className="py-20 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest leading-relaxed px-12">
                           No urgent breaking reports detected. Continuous surveillance active across all regional vectors.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>

                {/* Bucket 2: Most Trending (Impact Analytics) */}
                <div 
                  className={cn(
                    "flex flex-col bg-white/40 backdrop-blur-xl border rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden min-h-[630px] cursor-pointer",
                    mediaCategoryFilter === 'Trending' ? "border-sky-400 ring-2 ring-sky-400/20 scale-[1.01]" : "border-white/60"
                  )}
                  onClick={() => setMediaCategoryFilter('Trending')}
                >
                  <div className="p-6 h-[110px] border-b border-sky-100 bg-sky-50/50 flex items-center justify-between">
                    <div className="flex flex-col justify-center h-full">
                      <h4 className="text-[12px] font-black text-sky-600 uppercase tracking-widest flex items-center gap-2 m-0">
                        <TrendingUp className="w-4 h-4 shrink-0" /> Most Trending
                      </h4>
                      <p className="text-[10px] text-sky-400 font-bold mt-1 tracking-tighter m-0 pl-6 uppercase">{selectedCountry || 'GLOBAL'} MEDIA PULSE</p>
                    </div>
                    <Activity className="w-4 h-4 text-sky-400" />
                  </div>
                  
                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-4">
                      {data.trending.map((news) => (
                        <div 
                          key={news.id} 
                          onClick={() => handleNewsClick(news)}
                          className="p-5 rounded-2xl bg-white/60 border border-slate-100 hover:border-sky-300 hover:bg-white transition-all cursor-pointer group relative overflow-hidden"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <Badge className="bg-sky-50 text-sky-600 text-[9px] font-black uppercase border-none shadow-none">Trending #{news.id.replace('T', '')}</Badge>
                            <span className="text-[10px] font-black text-slate-400 uppercase">{news.time}</span>
                          </div>
                          <h4 className="text-[15px] font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-tight mb-3">
                            {news.headline}
                          </h4>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                               <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-sky-500 w-3/4" />
                               </div>
                               <span className="text-[9px] font-bold text-slate-400 uppercase">Impact</span>
                            </div>
                            <Maximize2 className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:text-sky-500" />
                          </div>
                        </div>
                      ))}
                      {data.trending.length === 0 && (
                        <div className="py-20 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest leading-relaxed px-12">
                           Intelligence stream stable. No trending spikes recorded for the current sector.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>

                {/* Bucket 3: Local & Regional (Sovereign Focus) */}
                <div 
                  className={cn(
                    "flex flex-col bg-white/40 backdrop-blur-xl border rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden min-h-[630px] cursor-pointer",
                    mediaCategoryFilter === 'Regional' ? "border-emerald-400 ring-2 ring-emerald-400/20 scale-[1.01]" : "border-white/60"
                  )}
                  onClick={() => setMediaCategoryFilter('Regional')}
                >
                  <div className="p-6 h-[110px] border-b border-emerald-100 bg-emerald-50/50 flex items-center justify-between">
                    <div className="flex flex-col justify-center h-full">
                      <h4 className="text-[12px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 m-0">
                        <Globe className="w-4 h-4 shrink-0" /> Local & Regional
                      </h4>
                      <p className="text-[10px] text-emerald-400 font-bold mt-1 tracking-tighter m-0 pl-6 uppercase">SOVEREIGN UPDATES</p>
                    </div>
                    <Badge className="bg-emerald-500 text-white text-[9px] h-6 px-3 uppercase">{selectedCountry || 'REGIONAL'}</Badge>
                  </div>
                  
                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-4">
                      {data.regional.map((news) => (
                        <div 
                          key={news.id} 
                          onClick={() => handleNewsClick(news)}
                          className="p-5 rounded-2xl bg-white/60 border border-slate-100 hover:border-emerald-300 hover:bg-white transition-all cursor-pointer group flex items-center justify-between"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span className="text-[10px] font-black text-slate-400 uppercase">{news.source} • {news.time}</span>
                            </div>
                            <h4 className="text-[15px] font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                              {news.headline}
                            </h4>
                          </div>
                          <Maximize2 className="ml-4 w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:text-emerald-500 shrink-0" />
                        </div>
                      ))}
                      {data.regional.length === 0 && (
                        <div className="py-20 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest leading-relaxed px-12">
                           Regional intercepts are clear. No relevant updates from local bureaus.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </motion.div>
            ) : (
              <SharedArticleView
                article={{
                  title: mediaSelectedArticle.headline,
                  subtitle: `${mediaSelectedArticle.time} • ${mediaSelectedArticle.category}`,
                  category: mediaSelectedArticle.category,
                  badgeText: mediaSelectedArticle.category === 'Breaking' ? 'Breaking Intelligence' : 'Sector Trending',
                  badgeClassName: mediaSelectedArticle.category === 'Breaking' ? "bg-rose-500" : "bg-sky-500",
                  imageUrl: mediaSelectedArticle.imageUrl,
                  summary: mediaSelectedArticle.summary || "",
                  source: {
                    name: mediaSelectedArticle.source,
                    description: 'Primary Source',
                    initial: mediaSelectedArticle.source[0]
                  },
                  links: mediaSelectedArticle.links
                }}
                onBack={handleBack}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <SectionHeader
        title={selectedCountry ? `${selectedCountry} Intelligence` : "Media & Trend Analysis"}
        icon={Newspaper}
        subtitle="Live Ticker & Strategic Briefings"
      />

      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <Tabs defaultValue="breaking" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid grid-cols-3 bg-slate-100/50 p-1 rounded-lg h-auto mb-4">
            <TabsTrigger value="breaking" className="text-[10px] py-1 font-bold uppercase">Breaking</TabsTrigger>
            <TabsTrigger value="trending" className="text-[10px] py-1 font-bold uppercase">Trending</TabsTrigger>
            <TabsTrigger value="regional" className="text-[10px] py-1 font-bold uppercase">Regional</TabsTrigger>
          </TabsList>

          <TabsContent value="breaking" className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {data.breaking.map((news) => (
                  <div key={news.id} onClick={() => handleNewsClick(news)} className="group cursor-pointer p-3 bg-white/40 border border-white/60 rounded-xl hover:bg-white transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{news.source} • {news.time}</span>
                    </div>
                    <h4 className="text-[11px] font-bold text-slate-800 group-hover:text-rose-600 transition-colors leading-relaxed">
                      {news.headline}
                    </h4>
                  </div>
                ))}
                {data.breaking.length === 0 && (
                   <p className="text-[9px] text-slate-400 italic text-center py-10 font-bold uppercase tracking-widest">Scanning channels...</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="trending" className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {data.trending.map((news) => (
                  <div key={news.id} onClick={() => handleNewsClick(news)} className="group cursor-pointer p-3 bg-white/40 border border-white/60 rounded-xl hover:bg-white transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 rounded-full bg-sky-500" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{news.source} • {news.time}</span>
                    </div>
                    <h4 className="text-[11px] font-bold text-slate-800 group-hover:text-sky-600 transition-colors leading-relaxed">
                      {news.headline}
                    </h4>
                  </div>
                ))}
                {data.trending.length === 0 && (
                   <p className="text-[9px] text-slate-400 italic text-center py-10 font-bold uppercase tracking-widest">No trending signals.</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="regional" className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {data.regional.map((news) => (
                  <div key={news.id} onClick={() => handleNewsClick(news)} className="group cursor-pointer p-3 bg-white/40 border border-white/60 rounded-xl hover:bg-white transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 rounded-full bg-emerald-500" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{news.source} • {news.time}</span>
                    </div>
                    <h4 className="text-[11px] font-bold text-slate-800 group-hover:text-emerald-600 transition-colors leading-relaxed">
                      {news.headline}
                    </h4>
                  </div>
                ))}
                {data.regional.length === 0 && (
                   <p className="text-[9px] text-slate-400 italic text-center py-10 font-bold uppercase tracking-widest">Regional feed clear.</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
