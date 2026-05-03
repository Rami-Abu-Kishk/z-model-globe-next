"use client";

import React, { useState, useMemo } from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { SharedArticleView } from '@/components/shared/SharedArticleView';
import { MediaArticleView } from '@/components/shared/MediaArticleView';
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
  ExternalLink,
  Bot,
  Sparkles
} from 'lucide-react';
import { MediaChatView } from '@/components/chat/MediaAssistantChatbot';
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
    setMediaSelectedArticle,
    setActiveEconomyTrend,
    setAutoRotate
  } = useZModelStore();
  const { triggerChatFromCard } = useAIChat();
  const [videoSource, setVideoSource] = useState<'SKY' | 'CNN'>('SKY');
  
  const videoSources = {
    SKY: 'YDvsBbKfLPA',
    CNN: 'U--OjmpjF5o'
  };
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
    setSelectedCountries([]);
    setActiveEconomyTrend(null);
    setActiveTarget(null);
    setAutoRotate(true);
    setSelectedCountry(null);
  };

  if (isExpanded) {
    return (
      <div className="flex flex-col h-full bg-white/50 backdrop-blur-xl overflow-y-auto custom-scrollbar">
        <div className="flex flex-col gap-8 p-10 pb-20 relative">
          {/* VIDEO: Signal Intelligence Terminal */}
          {!mediaSelectedArticle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-2xl p-4 sm:p-6"
            >
              {/* Header / HUD Overlay */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute inset-0" />
                    <div className="w-2 h-2 rounded-full bg-rose-600 relative" />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.2em] leading-none mb-1">
                      Signal Intelligence Feed
                    </h4>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                      Source: {videoSource === 'SKY' ? 'Sky News Global' : 'Sky News Ar'} • Live
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/5 p-1 rounded-xl border border-slate-200">
                  <button 
                    onClick={() => setVideoSource('SKY')}
                    className={cn(
                      "px-3 py-1 text-[11px] font-black rounded-lg transition-all cursor-pointer",
                      videoSource === 'SKY' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    SKY NEWS
                  </button>
                  <button 
                    onClick={() => setVideoSource('CNN')}
                    className={cn(
                      "px-3 py-1 text-[11px] font-black rounded-lg transition-all cursor-pointer",
                      videoSource === 'CNN' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    Sky News Ar
                  </button>
                </div>
              </div>

              {/* Video Container */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-white/20 shadow-inner">
                <iframe 
                  key={videoSource}
                  name="intelligence-feed"
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoSources[videoSource]}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0`} 
                  title={`${videoSource} Signal Feed`} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                />
                
                {/* Corner Accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t font-black border-l border-white/20 pointer-events-none" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/20 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/20 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/20 pointer-events-none" />
              </div>
            </motion.div>
          )}

          {/* MAIN: Intelligence Dashboard Grid */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {!mediaSelectedArticle ? (
                <div className="flex flex-col gap-10">
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
                        "flex flex-col bg-white/40 backdrop-blur-xl border rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden h-[520px]",
                        mediaCategoryFilter === 'Breaking' ? "border-rose-400 ring-2 ring-rose-400/20 scale-[1.01]" : "border-white/60"
                      )}
                    >
                      <div 
                        className="p-6 h-[110px] border-b border-rose-100 bg-rose-50/50 flex items-center justify-between cursor-pointer"
                        onClick={() => setMediaCategoryFilter('Breaking')}
                      >
                        <div className="flex flex-col justify-center h-full">
                          <h4 className="text-[14px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-2 m-0">
                            <Zap className="w-4 h-4 shrink-0" /> Breaking News Feed
                          </h4>
                          <p className="text-[12px] text-rose-400 font-bold mt-1 tracking-tighter italic m-0 pl-6 uppercase">LATEST {selectedCountry || 'GLOBAL'} INTELLIGENCE</p>
                        </div>
                        <Badge className="bg-rose-500 text-white animate-pulse text-[11px] h-6 px-3">LIVE</Badge>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {data.breaking.map((news, i) => (
                          <div 
                            key={news.id} 
                            onClick={() => handleNewsClick(news)}
                            className="p-5 rounded-2xl bg-white/60 border border-slate-100 hover:border-rose-200 hover:bg-white transition-all cursor-pointer group relative"
                          >
                            <div className="flex items-center justify-between mb-3">
                               <div className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                 <span className="text-[12px] font-black text-slate-400 uppercase">{news.source} • {news.time}</span>
                               </div>
                               <div className="flex items-center gap-2">
                                 <Maximize2 className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:text-rose-500" />
                               </div>
                            </div>
                            <h4 className="text-[17px] font-black text-slate-900 group-hover:text-rose-600 transition-colors leading-tight mb-3">
                              {news.headline}
                            </h4>
                            <p className="text-[14px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                              {news.summary}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bucket 2: Most Trending (Impact Analytics) */}
                    <div 
                      className={cn(
                        "flex flex-col bg-white/40 backdrop-blur-xl border rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden h-[520px]",
                        mediaCategoryFilter === 'Trending' ? "border-sky-400 ring-2 ring-sky-400/20 scale-[1.01]" : "border-white/60"
                      )}
                    >
                      <div 
                        className="p-6 h-[110px] border-b border-sky-100 bg-sky-50/50 flex items-center justify-between cursor-pointer"
                        onClick={() => setMediaCategoryFilter('Trending')}
                      >
                        <div className="flex flex-col justify-center h-full">
                          <h4 className="text-[14px] font-black text-sky-600 uppercase tracking-widest flex items-center gap-2 m-0">
                            <TrendingUp className="w-4 h-4 shrink-0" /> Most Trending
                          </h4>
                          <p className="text-[12px] text-sky-400 font-bold mt-1 tracking-tighter m-0 pl-6 uppercase">{selectedCountry || 'GLOBAL'} MEDIA PULSE</p>
                        </div>
                        <Activity className="w-4 h-4 text-sky-400" />
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {data.trending.map((news) => (
                          <div 
                            key={news.id} 
                            onClick={() => handleNewsClick(news)}
                            className="p-5 rounded-2xl bg-white/60 border border-slate-100 hover:border-sky-300 hover:bg-white transition-all cursor-pointer group relative overflow-hidden"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <Badge className="bg-sky-50 text-sky-600 text-[11px] font-black uppercase border-none shadow-none">Trending #{news.id.replace('T', '')}</Badge>
                              <span className="text-[12px] font-black text-slate-400 uppercase">{news.time}</span>
                            </div>
                            <h4 className="text-[17px] font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-tight mb-3">
                              {news.headline}
                            </h4>
                             <div className="flex items-center justify-between">
                               <div className="flex items-center gap-1.5">
                                  <div className="w-24 h-1.5 bg-slate-100/50 rounded-full overflow-hidden relative">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${news.impact || 75}%` }}
                                      className="h-full bg-sky-500 rounded-full relative"
                                    />
                                  </div>
                               </div>
                              <Maximize2 className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:text-sky-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bucket 3: Local & Regional (Sovereign Focus) */}
                    <div 
                      className={cn(
                        "flex flex-col bg-white/40 backdrop-blur-xl border rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden h-[520px]",
                        mediaCategoryFilter === 'Regional' ? "border-emerald-400 ring-2 ring-emerald-400/20 scale-[1.01]" : "border-white/60"
                      )}
                    >
                      <div 
                        className="p-6 h-[110px] border-b border-emerald-100 bg-emerald-50/50 flex items-center justify-between cursor-pointer"
                        onClick={() => setMediaCategoryFilter('Regional')}
                      >
                        <div className="flex flex-col justify-center h-full">
                          <h4 className="text-[14px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 m-0">
                            <Globe className="w-4 h-4 shrink-0" /> Local & Regional
                          </h4>
                          <p className="text-[12px] text-emerald-400 font-bold mt-1 tracking-tighter m-0 pl-6 uppercase">SOVEREIGN UPDATES</p>
                        </div>
                        <Badge className="bg-emerald-500 text-white text-[11px] h-6 px-3 uppercase">{selectedCountry || 'REGIONAL'}</Badge>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {data.regional.map((news) => (
                          <div 
                            key={news.id} 
                            onClick={() => handleNewsClick(news)}
                            className="p-5 rounded-2xl bg-white/60 border border-slate-100 hover:border-emerald-300 hover:bg-white transition-all cursor-pointer group flex items-center justify-between"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[12px] font-black text-slate-400 uppercase">{news.source} • {news.time}</span>
                              </div>
                              <h4 className="text-[17px] font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                                {news.headline}
                              </h4>
                            </div>
                            <Maximize2 className="ml-4 w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:text-emerald-500 shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* CHAT: Integrated Media Assistant Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-2xl overflow-hidden h-[600px]"
                  >
                    <div className="flex items-center gap-3 p-6 border-b border-white/40 bg-white/60">
                      <div className="p-2 bg-slate-900 rounded-xl">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-black text-slate-900 uppercase tracking-widest leading-none">
                          Media Assistant and Advisor
                        </h4>
                        <p className="text-[12px] font-bold text-emerald-600 uppercase tracking-tighter mt-1">
                          Operational Intelligence Matrix
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <MediaChatView className="h-full bg-transparent" />
                    </div>
                  </motion.div>
                </div>
              ) : (
                <MediaArticleView
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
                    links: mediaSelectedArticle.links,
                    aiInsights: mediaSelectedArticle.aiInsights
                  }}
                  onBack={handleBack}
                />
              )}
            </AnimatePresence>
          </div>
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
            <TabsTrigger value="breaking" className="text-[12px] py-1 font-bold uppercase">Breaking</TabsTrigger>
            <TabsTrigger value="trending" className="text-[12px] py-1 font-bold uppercase">Trending</TabsTrigger>
            <TabsTrigger value="regional" className="text-[12px] py-1 font-bold uppercase">Regional</TabsTrigger>
          </TabsList>

          <TabsContent value="breaking" className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {data.breaking.map((news) => (
                  <div key={news.id} onClick={() => handleNewsClick(news)} className="group cursor-pointer p-3 bg-white/40 border border-white/60 rounded-xl hover:bg-white transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">{news.source} • {news.time}</span>
                    </div>
                    <h4 className="text-[13px] font-bold text-slate-800 group-hover:text-rose-600 transition-colors leading-relaxed">
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
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">{news.source} • {news.time}</span>
                    </div>
                    <h4 className="text-[13px] font-bold text-slate-800 group-hover:text-sky-600 transition-colors leading-relaxed">
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
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">{news.source} • {news.time}</span>
                    </div>
                    <h4 className="text-[13px] font-bold text-slate-800 group-hover:text-emerald-600 transition-colors leading-relaxed">
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
