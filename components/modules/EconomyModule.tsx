import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { TrendingUp, TrendingDown, LayoutGrid, BarChart3, Globe, Briefcase, Zap } from 'lucide-react';
import { economyDataStore, TrendData, KpiReport } from '@/lib/mock-data/economy.mock';
import { useZModelStore } from '@/lib/store';
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
  const isPositive = type === 'positive';
  const color = isPositive ? '#10b981' : '#f43f5e'; 
  
  return (
    <div className="p-5 bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-sm hover:shadow-lg transition-all group flex flex-col h-full min-h-[160px]">
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
  );
}

function KpiReportCard({ kpi }: { kpi: KpiReport }) {
  return (
    <div className="p-6 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative flex flex-col h-full">
      {/* Subtle watermark icon */}
      <div className="absolute -top-4 -right-4 p-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
        <Zap className="w-24 h-24 text-slate-900" />
      </div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <Badge variant="outline" className={`${kpi.impact === 'High' ? 'border-rose-200 text-rose-600 bg-rose-50/50' : 'border-sky-200 text-sky-600 bg-sky-50/50'} text-[9px] font-black uppercase tracking-widest`}>
          {kpi.impact} Impact
        </Badge>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.org}</span>
      </div>

      <div className="flex-1 relative z-10">
        <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">{kpi.value}</h3>
        <p className="text-[12px] font-bold text-slate-600 leading-snug mb-6 uppercase tracking-tight">{kpi.title}</p>
      </div>

      <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
            <Globe className="w-3 h-3 text-slate-400" />
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{kpi.rep}</p>
        </div>
        <Briefcase className="w-3 h-3 text-slate-300" />
      </div>
    </div>
  );
}

export function EconomyModule({ isExpanded }: { isExpanded?: boolean }) {
  const selectedCountry = useZModelStore((s) => s.selectedCountry);
  const activeCountry = useZModelStore((s) => s.activeCountry);
  
  const data = useMemo(() => economyDataStore[selectedCountry || 'GLOBAL'] || economyDataStore['GLOBAL'], [selectedCountry]);

  const displayTitle = activeCountry ? `${activeCountry} Economy` : "Global Economy";

  if (isExpanded) {
    return (
      <div className="flex flex-col gap-12 pb-12">
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
                <h4 className="text-[12px] font-black text-emerald-600 uppercase tracking-[0.2em] leading-none">Growth Acceleration Vectors</h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Sectors currently exceeding historical CAGR benchmarks</p>
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
                <h4 className="text-[12px] font-black text-rose-600 uppercase tracking-[0.2em] leading-none">Market Contraction Constraints</h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">High-pressure indicators requiring strategic mediation</p>
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
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] px-1">Institutional Pulse</span>
            <div className="space-y-3">
              {data.kpisAndReports.slice(0, 2).map((k, i) => (
                <div key={i} className="flex flex-col p-4 bg-white/60 rounded-2xl border border-white shadow-sm">
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-lg font-black text-slate-900">{k.value}</span>
                      <Badge variant="outline" className="text-[8px] border-slate-200 text-slate-500 uppercase">{k.org}</Badge>
                   </div>
                   <span className="text-[10px] text-slate-600 font-bold uppercase leading-tight">{k.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}




