import React, { useEffect, useRef, useMemo, useState } from 'react';
import * as echarts from 'echarts';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { TrendingUp, TrendingDown, LayoutGrid, BarChart3, Globe, Briefcase, Zap, Brain, Clock, Sparkles, Bot, MessageSquare, Sparkle } from 'lucide-react';
import { economyDataStore, TrendData, KpiReport } from '@/lib/mock-data/economy.mock';
import { AiBadge } from '@/components/shared/AiBadge';
import { useZModelStore } from '@/lib/store';
import { useAIChat } from '../context/AIChatContext';
import dynamic from 'next/dynamic';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const EconomyExpandedChart3D = dynamic(() => import('./EconomyExpandedChart3D'), { ssr: false });

// ── Sparkline Component ─────────────────────────────────────────────
function TrendSparkline({ data, color }: { data: number[], color: string }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    chart.setOption({
      grid: { left: 0, right: 0, top: 5, bottom: 5 },
      xAxis: { type: 'category', show: false },
      yAxis: { type: 'value', show: false, min: 'dataMin', max: 'dataMax' },
      series: [{
        data: data,
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color, width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: `${color}44` },
            { offset: 1, color: `${color}00` }
          ])
        }
      }]
    });

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data, color]);

  return <div ref={chartRef} className="w-full h-12" />;
}

// ── Item Components ──────────────────────────────────────────────────
function TrendCard({ trend, type }: { trend: TrendData, type: 'positive' | 'negative' }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { triggerChatFromCard } = useAIChat();
  const isPositive = type === 'positive';
  const color = isPositive ? '#10b981' : '#f43f5e';

  const handleAiTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerChatFromCard({
      module: 'Economy',
      section: isPositive ? 'Positive Trends' : 'Negative Trends',
      title: trend.label,
      value: `${isPositive ? '+' : ''}${trend.value}%`
    });
  };

  return (
    <>
      <div
        className="p-5 bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-sm hover:shadow-lg transition-all group flex flex-col h-full min-h-[160px] cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        <AiBadge 
          className="-bottom-4 cursor-pointer left-1/2 -translate-x-1/2" 
          onClick={handleAiTrigger}
        />
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Indicator Tracking</span>
            <span className={`text-[15px] font-black leading-none ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isPositive ? '+' : ''}{trend.value}%
            </span>
          </div>
          <h5 className="text-[13px] font-black text-slate-900 uppercase tracking-tight leading-snug line-clamp-2 min-h-[2.5rem]">
            {trend.label}
          </h5>
        </div>
        <div className="mt-auto pt-2">
          <TrendSparkline data={trend.dataPoints} color={color} />
        </div>
      </div>

      {isExpanded && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-slate-900/10 backdrop-blur-xl"
            onClick={() => setIsExpanded(false)}
          />

          <motion.div
            className="relative w-full max-w-lg bg-white/95 backdrop-blur-3xl border border-white/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] rounded-[2rem] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isPositive ? 'Growth Opportunity' : 'Contraction Risk'}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter">{trend.label}</h3>
                </div>
                <div className={`text-xl font-black ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isPositive ? '+' : ''}{trend.value}%
                </div>
              </div>

              <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 mb-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">AI Trend Synthesis</h4>
                <p className="text-sm font-medium text-slate-700 leading-relaxed italic">
                  "{trend.description || 'No detailed synthesis available for this indicator.'}"
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Historical Performance (Last 5 Quarters)</span>
                  <span className={isPositive ? 'text-emerald-500' : 'text-rose-500'}>
                    STABLE TRAJECTORY
                  </span>
                </div>
                <div className="h-24 w-full">
                  <TrendSparkline data={trend.dataPoints} color={color} />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close Analysis
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

// ── GDP Projection Chart ─────────────────────────────────────────────
function GDPProjectionChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    chart.setOption({
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#0f172a', fontWeight: 'bold' }
      },
      grid: { left: '10%', right: '5%', top: '15%', bottom: '15%' },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2024', '2025', '2026', '2027', '2028 (Est)'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#94a3b8', fontSize: 10, fontWeight: 'bold' }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#94a3b8', fontSize: 10, fontWeight: 'bold', formatter: '{value}%' },
        splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } }
      },
      series: [{
        name: 'Z-Model AI Projection',
        data: [2.9, 3.2, 4.8, 6.5, 8.8],
        type: 'line',
        smooth: true,
        symbolSize: 8,
        itemStyle: { color: '#6366f1' },
        lineStyle: { width: 4, color: '#6366f1', shadowBlur: 15, shadowColor: 'rgba(99, 102, 241, 0.3)' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(99, 102, 241, 0.25)' },
            { offset: 1, color: 'rgba(99, 102, 241, 0)' }
          ])
        },
        emphasis: {
          itemStyle: {
            scale: true,
            borderWidth: 2,
            borderColor: '#fff'
          }
        }
      }]
    });

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} className="w-full h-[180px]" />;
}

const LOADING_PHRASES = [
  "Initializing Z-Model Distributed Core...",
  "Synthesizing Global Macroeconomic Vectors...",
  "Processing 2028 Horizon KPIs...",
  "Calibrating Hockeystick Acceleration Models...",
  "Finalizing AI Synthesis..."
];

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ── Shared UI Definitions ───────────────────────────────────────────
const GlobalGradients = () => (
  <svg width="0" height="0" className="absolute invisible" aria-hidden="true">
    <defs>
      {/* Gradients moved to shared component if needed */}
    </defs>
  </svg>
);

function KpiReportCard({ kpi }: { kpi: KpiReport }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState('');
  const { triggerChatFromCard } = useAIChat();
  const isGdp = kpi.title.toLowerCase().includes('gdp');

  const handleAiTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerChatFromCard({
      module: 'Economy',
      section: 'Sovereign KPIs',
      title: kpi.title,
      value: kpi.value
    });
  };

  useEffect(() => {
    if (isFlipped) {
      setIsLoading(true);
      let phraseIndex = 0;
      setLoadingPhrase(LOADING_PHRASES[0]);

      const phraseInterval = setInterval(() => {
        phraseIndex++;
        if (phraseIndex < LOADING_PHRASES.length) {
          setLoadingPhrase(LOADING_PHRASES[phraseIndex]);
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
    } else {
      setIsLoading(false);
    }
  }, [isFlipped]);

   const FrontFace = (
    <div className="absolute inset-0 p-6 backdrop-blur-2xl border border-white/60 bg-white/40 rounded-2xl shadow-xl hover:shadow-2xl flex flex-col h-full transition-all duration-300 group-hover:bg-white/60">
      <AiBadge 
        className="-bottom-4 cursor-pointer left-1/2 -translate-x-1/2" 
        onClick={handleAiTrigger}
      />

      {/* Subtle background icon */}
      <div className="absolute -top-4 -right-4 p-2 transition-opacity pointer-events-none opacity-[0.03] group-hover:opacity-[0.08]">
        <Zap className="w-24 h-24 text-slate-900" />
      </div>

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center gap-1.5 opacity-60">
          <Clock className="w-3 h-3 text-slate-400" />
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Last Update: 2h ago</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{kpi.org}</span>
      </div>

      <div className="flex-1 relative z-10">
        <h3 className="text-3xl font-black mb-2 tracking-tighter text-slate-900">{kpi.value}</h3>
        <p className="text-[12px] font-bold leading-snug uppercase tracking-tight transition-colors text-slate-600 group-hover:text-slate-900">
          {kpi.title.replace(/\s*Forecast\s*/gi, '')}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
            <Globe className="w-3 h-3 text-slate-400" />
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{kpi.rep}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className="relative h-[280px] w-full cursor-pointer group perspective-1000"
        onClick={() => setIsFlipped(true)}
      >
        <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-[1.02]">
          {FrontFace}
        </div>
      </div>

      {isFlipped && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-slate-900/10 backdrop-blur-xl"
            onClick={() => setIsFlipped(false)}
          />

          <motion.div
            className="relative w-full max-w-2xl bg-white/95 backdrop-blur-3xl border border-white/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] rounded-[2.5rem] overflow-hidden max-h-[90vh] overflow-y-auto"
            initial={{ rotateY: -15, opacity: 0, scale: 0.9, y: 20 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1, y: 0 }}
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

                  {/* Orbital decorative elements */}
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
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Institutional Core Analysis</span>
                  </div>

                  <motion.p
                    key={loadingPhrase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{ background: 'linear-gradient(to right, #6366f1, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    className="text-lg font-black tracking-tight h-8"
                  >
                    {loadingPhrase}
                  </motion.p>

                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Z-Model Distributed Audit Core
                  </p>
                </div>

                <div className="w-64 h-1 bg-slate-100 rounded-full overflow-hidden mt-4">
                  <motion.div
                    className="h-full bg-gradient-to-right from-indigo-500 to-blue-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                    style={{ background: 'linear-gradient(to right, #6366f1, #3b82f6)' }}
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
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{kpi.value} <span className="text-indigo-500">↑</span></h2>
                    <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest">{kpi.title} - {kpi.org} Matrix</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                    className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-sm cursor-pointer"
                  >
                    <Sparkle className="w-4 h-4 text-indigo-600" />
                  </button>
                </div>

                <div className="p-8 bg-indigo-50/20 backdrop-blur-sm border border-indigo-100/50 rounded-3xl relative overflow-hidden group/reasoning">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/20" />
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkle className="w-4 h-4 text-indigo-600" />
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Executive Audit Summary</span>
                  </div>
                  <p className="text-[14px] font-bold text-slate-700 leading-relaxed tracking-tight">
                    {isGdp ? (
                      `The projected 8.8% growth is driven by three convergent vectors: wide-scale industrial GenAI integration, a massive capital pivot towards decentralized energy grids, and reduced cross-border friction via Z-Model protocols.`
                    ) : (
                      `Z-Model audit systems verify institutional claims from ${kpi.org} regarding ${kpi.title.toLowerCase()}. Distributed ledger verification confirms a 94.2% stability factor across regional compliance layers, indicating structural resilience.`
                    )}
                  </p>
                </div>

                {isGdp ? (
                  <div className="bg-indigo-50/30 border border-indigo-100/50 p-6 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h4 className="text-[10px] font-black text-indigo-700 uppercase tracking-[0.2em] mb-4">Hockeystick Acceleration Vector</h4>
                    <GDPProjectionChart />
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Audit Node {i}</span>
                        <div className="text-sm font-black text-slate-900 tracking-tight leading-none">VERIFIED</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Data Confidence</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-slate-900">98.1%</span>
                      <Badge className="bg-indigo-50 text-indigo-600 border-none text-[8px] font-black uppercase">Institutional</Badge>
                    </div>
                  </div>
                  <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Delta Variance</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-indigo-600">+1.4%</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">vs Prior</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 border border-white flex items-center justify-center"><Globe className="w-3 h-3 text-slate-400" /></div>
                    <div className="w-6 h-6 rounded-full bg-indigo-50 border border-white flex items-center justify-center"><Sparkle className="w-3 h-3 text-indigo-400" /></div>
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.1em]">
                    Institutional deep-dive powered by Z-Model Distributed Core
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}

export function EconomyModule({ isExpanded }: { isExpanded?: boolean }) {
  const selectedCountry = useZModelStore((s) => s.selectedCountry);
  const activeCountry = useZModelStore((s) => s.activeCountry);
  const setSelectedCountry = useZModelStore((s) => s.setSelectedCountry);
  const setActiveCountry = useZModelStore((s) => s.setActiveCountry);

  // ── Chatbot Event Listeners ─────────────────────────────────────────
  useEffect(() => {
    const handleFilterDashboard = (event: any) => {
      const data = event.detail;
      console.log("[EconomyModule] Caught FILTER_DASHBOARD:", data);
      
      // Example: If chatbot filters to a specific country
      if (data.country === 'UAE') {
        setSelectedCountry('AE');
        setActiveCountry('United Arab Emirates');
      }
    };

    const handleHighlightGrid = (event: any) => {
      console.log("[EconomyModule] Caught HIGHLIGHT_GRID:", event.detail);
      // Implementation logic for highlighting specific grid items
    };

    window.addEventListener('FILTER_DASHBOARD', handleFilterDashboard);
    window.addEventListener('HIGHLIGHT_GRID', handleHighlightGrid);

    return () => {
      window.removeEventListener('FILTER_DASHBOARD', handleFilterDashboard);
      window.removeEventListener('HIGHLIGHT_GRID', handleHighlightGrid);
    };
  }, [setSelectedCountry, setActiveCountry]);

  const data = useMemo(() => economyDataStore[selectedCountry || 'GLOBAL'] || economyDataStore['GLOBAL'], [selectedCountry]);

  const displayTitle = activeCountry ? `${activeCountry} Economy` : "Global Economy";

  if (isExpanded) {
    return (
      <div className="flex flex-col gap-10 p-10 bg-slate-50/50">
        <GlobalGradients />
        {/* Top Feature: 3D Visualization */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl overflow-hidden p-8">
          <SectionHeader
            title={`${displayTitle} - Performance Matrix`}
            icon={BarChart3}
            subtitle="Holographic Surface: Cross-Domain Economic Growth Correlations"
          />
          <div className="flex-1 mt-6">
            <EconomyExpandedChart3D />
          </div>
        </div>

        <div className="flex flex-col gap-12">
          {/* Positive Trends */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-2 border-l-4 border-emerald-500">

              <div className="p-1.5 bg-emerald-100 rounded-md">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-[12px] font-black text-emerald-600 uppercase tracking-[0.2em] leading-none">Positive Trends</h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Sectors currently exceeding historical CAGR benchmarks</p>
                  <span className="text-[8px] text-slate-300 font-black uppercase tracking-widest ml-2">• Last update: 2 hours ago</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.positiveTrends.map((t, i) => <TrendCard key={i} trend={t} type="positive" />)}
            </div>
          </div>

          {/* Negative Trends */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-2 border-l-4 border-rose-500">
              <div className="p-1.5 bg-rose-100 rounded-md">
                <TrendingDown className="w-4 h-4 text-rose-600" />
              </div>
              <div>
                <h4 className="text-[12px] font-black text-rose-600 uppercase tracking-[0.2em] leading-none">Negative Trends</h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">High-pressure indicators requiring strategic mediation</p>
                  <span className="text-[8px] text-slate-300 font-black uppercase tracking-widest ml-2">• Last update: 2 hours ago</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.negativeTrends.map((t, i) => <TrendCard key={i} trend={t} type="negative" />)}
            </div>
          </div>
        </div>

        {/* Global Organization KPIs */}
        <div className="space-y-8 mt-4">
          <SectionHeader
            title="Sovereign KPIs & Institutional Reports"
            icon={LayoutGrid}
            subtitle="Real-time audits from IMF, World Bank, and WTO delegates"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {data.kpisAndReports.map((k, i) => <KpiReportCard key={i} kpi={k} />)}
          </div>
        </div>
      </div>
    );
  }

  // ORBITAL VIEW (Mini)
  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      <GlobalGradients />
      <SectionHeader
        title={displayTitle}
        icon={TrendingUp}
        subtitle="Critical Economic Vectors & Indicators"
      />

      <ScrollArea className="flex-1">
        <div className="p-5 space-y-8">
          {/* Positive Trend Feature */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.1em]">Positive Trends</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="grid grid-cols-1 gap-3">
              {data.positiveTrends.slice(0, 2).map((t, i) => <TrendCard key={i} trend={t} type="positive" />)}
            </div>
          </div>

          {/* Negative Trend Feature */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.1em]">Negative Trends</span>
              <TrendingDown className="w-4 h-4 text-rose-500" />
            </div>
            <div className="grid grid-cols-1 gap-3">
              {data.negativeTrends.slice(0, 2).map((t, i) => <TrendCard key={i} trend={t} type="negative" />)}
            </div>
          </div>

          {/* KPI Summary Strip */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Institutional Pulse</span>
              <span className="text-[8px] text-slate-300 font-bold uppercase tracking-tighter">Updated 2h ago</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {data.kpisAndReports.slice(0, 4).map((k, i) => (
                <KpiReportCard key={i} kpi={k} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}




