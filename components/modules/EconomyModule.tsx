import React, { useEffect, useRef, useMemo, useState } from 'react';
import * as echarts from 'echarts';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { 
  TrendingUp, 
  TrendingDown, 
  LayoutGrid, 
  BarChart3, 
  Globe,
  Zap, 
  Clock, 
  Building2,
  User,
} from 'lucide-react';
import { economyDataStore, TrendData, KpiReport, InvestmentReport } from '@/lib/mock-data/economy.mock';
import { AiBadge } from '@/components/shared/AiBadge';
import { useZModelStore } from '@/lib/store';
import { useAIChat } from '../context/AIChatContext';
import dynamic from 'next/dynamic';
import { ScrollArea } from '@/components/ui/scroll-area';
import { KpiInsightOverlay, KpiInsightData } from '@/components/shared/KpiInsightOverlay';

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

const LOADING_PHRASES = [
  "Initializing Z-Model Distributed Core...",
  "Synthesizing Global Macroeconomic Vectors...",
  "Processing 2028 Horizon KPIs...",
  "Calibrating Hockeystick Acceleration Models...",
  "Finalizing AI Synthesis..."
];


// ── Shared UI Definitions ───────────────────────────────────────────
const GlobalGradients = () => (
  <svg width="0" height="0" className="absolute invisible" aria-hidden="true">
    <defs>
      {/* Gradients moved to shared component if needed */}
    </defs>
  </svg>
);

function KpiReportCard({ kpi, onOpen }: { kpi: KpiReport, onOpen: (kpi: KpiReport) => void }) {
  const { triggerChatFromCard } = useAIChat();

  const handleAiTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerChatFromCard({
      module: 'Economy',
      section: 'Sovereign KPIs',
      title: kpi.title,
      value: kpi.value
    });
  };

  return (
    <div
      className="relative h-[280px] w-full cursor-pointer group perspective-1000"
      onClick={() => onOpen(kpi)}
    >
      <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-[1.02]">
        <div className="absolute inset-0 p-6 backdrop-blur-2xl border border-white/60 bg-white/40 rounded-2xl shadow-xl hover:shadow-2xl flex flex-col h-full transition-all duration-300 group-hover:bg-white/60">
          <AiBadge 
            className="-bottom-4 cursor-pointer left-1/2 -translate-x-1/2" 
            onClick={handleAiTrigger}
          />

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
      </div>
    </div>
  );
}

function InvestmentReportCard({ report }: { report: InvestmentReport }) {
  return (
    <div
      className="p-6 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-lg hover:shadow-2xl transition-all group relative flex flex-col h-full cursor-pointer hover:border-emerald-300"
      onClick={() => window.open(report.fileUrl, '_blank')}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-500 text-[9px] font-black uppercase tracking-widest">{report.org}</span>
        <span className="text-[9px] font-black text-slate-400 uppercase">{report.date}</span>
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:text-emerald-700 transition-colors">{report.title}</h4>
        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mb-4 font-medium italic">"{report.description}"</p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
            <User className="w-2.5 h-2.5 text-slate-400" />
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{report.author}</p>
        </div>
        <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Open PDF <TrendingUp className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}

export function EconomyModule({ isExpanded }: { isExpanded?: boolean }) {
  const [selectedKpi, setSelectedKpi] = useState<KpiReport | null>(null);
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
            title="Sovereign KPIs"
            icon={LayoutGrid}
            subtitle="Real-time audits from IMF, World Bank, and WTO delegates"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {data.kpisAndReports.map((k, i) => (
              <KpiReportCard 
                key={i} 
                kpi={k} 
                onOpen={(k) => k.insightData && setSelectedKpi(k)} 
              />
            ))}
          </div>
        </div>

        {/* STRATEGIC REPORTS SECTION */}
        {data.reports && data.reports.length > 0 && (
          <div className="space-y-6">
            <SectionHeader
              title="Strategic Intelligence Reports"
              icon={Building2}
              subtitle="Proprietary and institutional deep-dive research documents available for review"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.reports.map((report, idx) => (
                <InvestmentReportCard key={idx} report={report} />
              ))}
            </div>
          </div>
        )}

        {/* Reusable KPI Deep-Dive Overlay */}
        <KpiInsightOverlay 
          isOpen={!!selectedKpi}
          onClose={() => setSelectedKpi(null)}
          kpi={selectedKpi ? {
            title: selectedKpi.title,
            value: selectedKpi.value,
            org: selectedKpi.insightData?.org || selectedKpi.org,
            unit: selectedKpi.insightData?.unit,
            historicalData: selectedKpi.insightData?.historicalData || [],
            forecastData: selectedKpi.insightData?.forecastData || [],
            labels: selectedKpi.insightData?.labels || { historical: [], forecast: [] },
            analysis: selectedKpi.insightData?.analysis || { historical: '', forecast: '' },
            stats: selectedKpi.insightData?.stats || { 
              historical: { confidence: '', delta: '' }, 
              forecast: { confidence: '', delta: '' } 
            }
          } as KpiInsightData : null}
          loadingPhrases={[
            "Initializing Z-Model Economy Core...",
            "Synthesizing Global Macroeconomic Vectors...",
            "Processing 2028 Horizon KPIs...",
            "Calibrating Hockeystick Acceleration Models...",
            "Finalizing AI Synthesis..."
          ]}
        />
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
                <KpiReportCard 
                  key={i} 
                  kpi={k} 
                  onOpen={(k) => k.insightData && setSelectedKpi(k)} 
                />
              ))}
            </div>
          </div>

          {/* Mini Reports Section */}
          {data.reports && data.reports.length > 0 && (
            <div className="space-y-4 pt-2">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Strategic Reports</h4>
              <div className="space-y-3">
                {data.reports.slice(0, 2).map((report, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col p-4 bg-white/60 rounded-2xl border border-white shadow-sm hover:border-emerald-200 transition-all cursor-pointer group"
                    onClick={() => window.open(report.fileUrl, '_blank')}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight group-hover:text-emerald-700 transition-colors">{report.title}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase">{report.org}</span>
                      <span className="text-[9px] text-emerald-600 font-black uppercase tracking-tighter">View PDF</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Reusable KPI Deep-Dive Overlay */}
      <KpiInsightOverlay 
        isOpen={!!selectedKpi}
        onClose={() => setSelectedKpi(null)}
        kpi={selectedKpi ? {
          title: selectedKpi.title,
          value: selectedKpi.value,
          org: selectedKpi.insightData?.org || selectedKpi.org,
          unit: selectedKpi.insightData?.unit,
          historicalData: selectedKpi.insightData?.historicalData || [],
          forecastData: selectedKpi.insightData?.forecastData || [],
          labels: selectedKpi.insightData?.labels || { historical: [], forecast: [] },
          analysis: selectedKpi.insightData?.analysis || { historical: '', forecast: '' },
          stats: selectedKpi.insightData?.stats || { 
            historical: { confidence: '', delta: '' }, 
            forecast: { confidence: '', delta: '' } 
          }
        } as KpiInsightData : null}
        loadingPhrases={[
          "Initializing Z-Model Economy Core...",
          "Synthesizing Global Macroeconomic Vectors...",
          "Processing 2028 Horizon KPIs...",
          "Calibrating Hockeystick Acceleration Models...",
          "Finalizing AI Synthesis..."
        ]}
      />
    </div>
  );
}




