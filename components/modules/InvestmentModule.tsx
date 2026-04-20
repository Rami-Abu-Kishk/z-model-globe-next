
"use client";

import { useState, useMemo } from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { TrendBadge } from '@/components/shared/TrendBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Globe, Building2, User, Zap, Briefcase, Award, ChevronLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import { investmentDataStore, KpiReport, Opportunity } from '@/lib/mock-data/investment.mock';
import { useZModelStore } from '@/lib/store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { searchableCountries } from '@/lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { SharedArticleView } from '@/components/shared/SharedArticleView';
import { useAIChat } from '../context/AIChatContext';
import { AiBadge } from '../shared/AiBadge';

const InvestmentCandlestickChart = dynamic(() => import('./InvestmentCandlestickChart'), { ssr: false });
const InvestmentChart3D = dynamic(() => import('./InvestmentChart3D'), { ssr: false });

// ── Shared Sub-Components ───────────────────────────────────────────

function InvestmentKpiCard({ kpi }: { kpi: KpiReport }) {
  const { triggerChatFromCard } = useAIChat();
  
  const handleAiTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerChatFromCard({
      module: 'Investment',
      section: 'Sovereign KPIs',
      title: kpi.title,
      value: kpi.value
    });
  };

  return (
    <div className="p-6 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative flex flex-col h-full">
      <AiBadge 
        onClick={handleAiTrigger}
        className="top-4 right-4 !w-8 !h-8 opacity-0 group-hover:opacity-100 transition-opacity"
        tooltipText="Investment Thesis"
      />
      <div className="absolute -top-4 -right-4 p-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
        <Briefcase className="w-24 h-24 text-slate-900" />
      </div>

      <div className="flex justify-between items-start mb-6 relative z-10">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.org}</span>
      </div>

      <div className="flex-1 relative z-10">
        <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">{kpi.value}</h3>
        <p className="text-[12px] font-bold text-slate-600 leading-snug mb-6 uppercase tracking-tight">{kpi.title}</p>
      </div>

      <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
            <User className="w-3 h-3 text-slate-400" />
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{kpi.rep}</p>
        </div>
        <Building2 className="w-3 h-3 text-slate-300" />
      </div>
    </div>
  );
}

function OpportunityCard({ op, onClick }: { op: Opportunity, onClick?: () => void }) {
  const { triggerChatFromCard } = useAIChat();

  const handleAiTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerChatFromCard({
      module: 'Investment',
      section: 'Strategic Opportunities',
      title: op.title,
      value: op.region
    });
  };

  return (
    <div
      className={`flex flex-col bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 overflow-hidden shadow-sm hover:shadow-lg transition-all h-full group ${onClick ? 'cursor-pointer hover:border-emerald-300' : ''}`}
      onClick={onClick}
    >
      <div className="h-32 w-full relative bg-slate-100">
        <img 
          src={op.imageUrl || "/assets/images/branding/fallback.png"} 
          alt={op.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/assets/images/branding/fallback.png";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        
        <AiBadge 
          onClick={handleAiTrigger} 
          className="top-3 right-3 !w-8 !h-8 opacity-0 group-hover:opacity-100 transition-opacity"
          tooltipText="Generate Thesis"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-2">
            <h5 className="text-[13px] font-black text-slate-900 uppercase tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">
              {op.title}
            </h5>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 flex items-center gap-1">
              <Globe className="w-2 h-2" /> {op.region}
            </p>
          </div>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed font-medium line-clamp-3">
          {op.description}
        </p>
      </div>
    </div>
  );
}

// ── Main Module ─────────────────────────────────────────────────────

export function InvestmentModule({ isExpanded }: { isExpanded?: boolean }) {
  const setActiveTarget = useZModelStore((s) => s.setActiveTarget);
  const setSelectedCountries = useZModelStore((s) => s.setSelectedCountries);
  const setSelectedCountry = useZModelStore((s) => s.setSelectedCountry);
  const selectedCountry = useZModelStore((s) => s.selectedCountry);
  const setViewState = useZModelStore((s) => s.setViewState);
  const viewState = useZModelStore((s) => s.viewState);
  
  const investmentActiveDetail = useZModelStore((s) => s.investmentActiveDetail);
  const setInvestmentActiveDetail = useZModelStore((s) => s.setInvestmentActiveDetail);
  const investmentSelectedOpportunity = useZModelStore((s) => s.investmentSelectedOpportunity);
  const setInvestmentSelectedOpportunity = useZModelStore((s) => s.setInvestmentSelectedOpportunity);

  const currentDataKey = useMemo(() =>
    selectedCountry && investmentDataStore[selectedCountry] ? selectedCountry : 'GLOBAL',
    [selectedCountry]
  );

  const data = investmentDataStore[currentDataKey];

  const handleTargetClick = () => {
    if (data.bestTarget.iso) {
      setSelectedCountry(null);
      setActiveTarget({ lat: 23.4, lng: 53.8, zoomLevel: 1.5 }); // UAE Coords
      setSelectedCountries([data.bestTarget.iso]);
      
      if (isExpanded) {
        setInvestmentSelectedOpportunity(null);
        setInvestmentActiveDetail('UAE');
      }
    }
  };

  const handleOpportunityClick = (op: Opportunity) => {
    if (op.isoCodes && op.isoCodes.length > 0) {
      setSelectedCountry(null);
      setSelectedCountries(op.isoCodes);

      // Set activeTarget to stop global auto-rotation and focus the view
      const firstIso = op.isoCodes[0];
      const country = searchableCountries.find(c => c.iso === firstIso);
      if (country) {
        setActiveTarget({
          lat: country.lat,
          lng: country.lng,
          zoomLevel: 1.8
        });
      }

      if (isExpanded) {
        setInvestmentActiveDetail('OPPORTUNITY');
        setInvestmentSelectedOpportunity(op);
      }
    }
  };

  const handleRowClick = (entityName: string) => {
    // 1. Precise or contains match
    let country = searchableCountries.find(c =>
      c.name.toLowerCase().includes(entityName.toLowerCase()) ||
      entityName.toLowerCase().includes(c.name.toLowerCase()) ||
      c.iso.toLowerCase() === entityName.toLowerCase() ||
      (c.iso === 'AE' && entityName.toUpperCase() === 'UAE') ||
      (c.iso === 'US' && entityName.toUpperCase() === 'USA') ||
      (c.iso === 'GB' && entityName.toUpperCase() === 'UK')
    );

    // 2. Special handling for regional entities (like Abu Dhabi/Dubai in UAE)
    if (!country && (selectedCountry === 'AE' || entityName.includes('Abu Dhabi') || entityName.includes('Dubai') || entityName.includes('Sharjah') || entityName.includes('Khaimah'))) {
      country = searchableCountries.find(c => c.iso === 'AE');
    }

    if (country) {
      setSelectedCountry(null); // Keep standard high-level view
      setSelectedCountries([country.iso]);
      setActiveTarget({
        lat: country.lat,
        lng: country.lng,
        zoomLevel: 1.8
      });
    }
  };

  if (isExpanded) {
    return (
      <div className="flex flex-col gap-6 md:gap-10 pb-12 w-full max-w-full overflow-x-hidden relative min-h-[800px]">
        <AnimatePresence mode="wait">
          {investmentActiveDetail === 'NONE' ? (
            <motion.div
              key="main-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6 md:gap-10 w-full"
            >
              {/* FIRST SECTION: Top 3 Strategic Opportunities */}
              <div className="space-y-6">
                <SectionHeader
                  title="Top 3 Global Strategic Opportunities"
                  icon={Zap}
                  subtitle="Real-time volatility tracking and expected yield forecasts"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.topOpportunities.map((op, i) => (
                    <OpportunityCard
                      key={i}
                      op={op}
                      onClick={() => handleOpportunityClick(op)}
                    />
                  ))}
                </div>
              </div>

              {/* SECOND SECTION: Hero Target & Multi-Series Chart */}
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                <div
                  className="xl:col-span-2 glass-card p-6 md:p-8 cursor-pointer hover:shadow-emerald-200/40 transition-all group flex flex-col justify-between relative overflow-hidden"
                  onClick={handleTargetClick}
                >
                  {/* Subtle background image */}
                  <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <img 
                      src={data.bestTarget.imageUrl || "/assets/images/branding/fallback.png"} 
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/assets/images/branding/fallback.png";
                      }}
                    />
                  </div>

                  {/* Subtle holographic background texture/glow */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-200/40 transition-colors z-0" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex flex-col gap-1 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                          <span className="text-[9px] font-black text-emerald-700 uppercase tracking-[0.3em]">
                            {data.bestTarget.label}
                          </span>
                        </div>
                        <h3 className="text-3xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter mt-1">
                          {data.bestTarget.name}
                        </h3>
                      </div>

                      <div className="bg-slate-900/5 p-3 rounded-2xl border border-slate-900/10 group-hover:border-emerald-300 group-hover:bg-emerald-50 transition-all shrink-0">
                        <Award className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-0.5 bg-emerald-500/20 rounded-full h-12 self-stretch group-hover:bg-emerald-500 transition-colors" />
                      <p className="text-[13px] md:text-sm text-slate-600 font-medium leading-relaxed max-w-[280px]">
                        {data.bestTarget.details}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-end justify-between border-t border-slate-200/50 pt-6 relative z-10">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl lg:text-6xl font-black text-slate-900 leading-none tracking-tighter">
                          {data.bestTarget.score}
                        </span>
                        <span className="text-sm font-bold text-emerald-600">ALPHA</span>
                      </div>
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">
                        Investment Rating
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-right shrink-0">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                        Sync: {data.bestTarget.timestamp}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="xl:col-span-3 p-6 md:p-8 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-xl flex flex-col min-h-[400px]">
                  <SectionHeader
                    title="Sovereign Alpha Benchmarking"
                    icon={TrendingUp}
                    subtitle="Relative performance of leading sovereign investment targets"
                  />
                  <div className="flex-1 mt-6 min-h-0">
                    <InvestmentChart3D />
                  </div>
                </div>
              </div>

              {/* BOTTOM SECTION: Institutional KPIs & Audit Table */}
              <div className="space-y-8">
                <SectionHeader
                  title="Sovereign Investment KPIs & Reports"
                  icon={Award}
                  subtitle="Consolidated briefings from UNCTAD, Global SWF, and IMF delegates"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.kpisAndReports.map((kpi, idx) => <InvestmentKpiCard key={idx} kpi={kpi} />)}
                </div>

                <div className="p-4 md:p-8 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-xl overflow-x-auto">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Entity Performance & Risk Index
                  </h4>
                  <div className="min-w-[600px]">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-200 hover:bg-transparent">
                          <TableHead className="text-[11px] font-black uppercase text-slate-800 tracking-widest">Entity</TableHead>
                          <TableHead className="text-[11px] font-black uppercase text-slate-800 text-center tracking-widest">Credit Rating</TableHead>
                          <TableHead className="text-[11px] font-black uppercase text-slate-800 text-center tracking-widest">Capital Inflow</TableHead>
                          <TableHead className="text-[11px] font-black uppercase text-slate-800 text-center tracking-widest">Risk Profile</TableHead>
                          <TableHead className="text-[11px] font-black uppercase text-slate-800 text-right tracking-widest">Yield Spread</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.tableData.map((row) => (
                          <TableRow
                            key={row.id}
                            className="border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer group/row"
                            onClick={() => handleRowClick(row.entity)}
                          >
                            <TableCell className="font-extrabold text-slate-900 text-sm whitespace-nowrap">{row.entity}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline" className="bg-slate-50 border-slate-200 font-black text-[10px]">
                                {row.rating}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center font-black text-emerald-600">{row.inflow}</TableCell>
                            <TableCell className="text-center">
                              <Badge className={`text-[9px] font-black uppercase px-2 shadow-sm ${row.risk === 'Low' ? 'bg-emerald-100 text-emerald-700' :
                                row.risk === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                  row.risk === 'Extreme' ? 'bg-slate-900 text-white animate-pulse' :
                                    'bg-rose-100 text-rose-700'
                                }`}>
                                {row.risk} Risk
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-black text-slate-900">{row.yield}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : investmentActiveDetail === 'UAE' ? (
            <div className="w-full">
              <SharedArticleView
                onBack={() => setInvestmentActiveDetail('NONE')}
                article={{
                  title: "United Arab Emirates: The Global Alpha Hub",
                  subtitle: "Sovereign Strategic Briefing • 2026",
                  category: "Investment Strategy",
                  badgeText: "TOP STRATEGIC TARGET",
                  badgeClassName: "bg-emerald-600",
                  imageUrl: "/assets/images/mock/uae_investment_hero.png",
                  summary: "The UAE's evolution into a premier global investment destination is driven by strategic foresight, world-class infrastructure, and a robust regulatory framework tailored for the next era of global capital.",
                  content: (
                    <div className="space-y-8 mt-12">
                      {[
                        { title: "Tax-Free Environment", detail: "Zero corporate tax in strategic sectors and a network of 40+ specialized free zones offering 100% foreign ownership and full capital repatriation." },
                        { title: "Golden Visa & Residency", detail: "Long-term 10-year residency programs attracting top-tier talent, entrepreneurs, and high-net-worth investors, ensuring stability for family and capital." },
                        { title: "Strategic Architecture", detail: "Unparalleled logistics via DP World's global port network and Emirates/Etihad's aviation dominance, seamlessly linking East, West, and Africa." },
                        { title: "Sovereign AI Leadership", detail: "First nation with a dedicated Minister for AI, home to G42's massive ecosystem and the cutting-edge Falcon Large Language Models." },
                        { title: "Institutional Safety", detail: "A stable political environment with world-class legal frameworks (DIFC/ADGM) offering English Common Law protections for investors." }
                      ].map((point, i) => (
                        <div key={i} className="flex gap-6 group">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                          <div>
                            <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-1">{point.title}</h4>
                            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">{point.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                }}
              />
            </div>
          ) : (
            <div className="w-full">
              <SharedArticleView
                onBack={() => {
                  setInvestmentActiveDetail('NONE');
                  setInvestmentSelectedOpportunity(null);
                }}
                article={{
                  title: investmentSelectedOpportunity!.title,
                  subtitle: `Strategic Opportunity • ${investmentSelectedOpportunity!.region}`,
                  category: "Strategic Investment",
                  badgeText: "STRETEGIC ALPHA TARGET",
                  badgeClassName: "bg-indigo-600",
                  imageUrl: investmentSelectedOpportunity!.imageUrl,
                  summary: investmentSelectedOpportunity!.description,
                  content: (
                    <div className="space-y-10 mt-12">
                      <div className="flex gap-6 group">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
                        <div>
                          <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-2">Alpha Strategic Positioning</h4>
                          <p className="text-[16px] text-slate-600 font-medium leading-loose">
                            This opportunity represents a cornerstore of the current sovereign investment landscape in {investmentSelectedOpportunity!.region}. 
                            Our real-time intelligence suggests that the underlying assets are entering a period of significant appreciation 
                            driven by favorable regulatory shifts and institutional capital rotation.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-6 group">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
                        <div>
                          <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-2">Institutional Sentiment & Liquidity</h4>
                          <p className="text-[16px] text-slate-600 font-medium leading-loose">
                            Major global SWFs and institutional allocators have identified this sector as a primary growth vector. 
                            The expected liquidity profile remains robust, offering a high-conviction entry point for tactical asset allocation 
                            targeting long-term sovereign wealth preservation and growth.
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                }}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // STANDARD ORBITAL VIEW (Mini)
  return (
    <div className="flex flex-col h-full bg-slate-50/50 overflow-hidden">
      <SectionHeader
        title={currentDataKey === 'GLOBAL' ? "Global Investment Alpha" : `${currentDataKey} Investment Alpha`}
        icon={TrendingUp}
        subtitle="Prime Opportunities & Ratings"
      />

      <ScrollArea className="flex-1">
        <div className="px-5 space-y-8 py-6">
          {/* FIRST: Top 3 Opportunities */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Winning Assets</h4>
            <div className="space-y-3">
              {data.topOpportunities.map((op, i) => (
                <div
                  key={i}
                  className="flex flex-col p-4 bg-white/70 rounded-2xl border border-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-emerald-200 group"
                  onClick={() => handleOpportunityClick(op)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">{op.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-slate-400 font-bold uppercase">{op.region}</span>
                    <TrendBadge trend={op.status === 'up' ? 'up' : 'down'} value={op.status === 'up' ? 'Bullish' : 'Neutral'} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECOND: Best Country Indicator */}
          <div
            className="p-5 bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all group"
            onClick={handleTargetClick}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">{data.bestTarget.label}</span>
                <h3 className="text-2xl font-black text-slate-900 leading-none group-hover:text-emerald-700 transition-colors">{data.bestTarget.name}</h3>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-3xl font-black text-emerald-600 leading-none">{data.bestTarget.score}</span>
                <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] font-black mt-2">LIVE SCORE</Badge>
              </div>
            </div>
          </div>

          {/* THIRD: Institutional Pulse */}
          <div className="space-y-4 pt-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Institutional Pulse</h4>
            <div className="space-y-3">
              {data.kpisAndReports.slice(0, 3).map((kpi, idx) => (
                <div key={idx} className="flex flex-col p-4 bg-white/60 rounded-2xl border border-white shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-lg font-black text-slate-900">{kpi.value}</span>
                    <Badge variant="outline" className="text-[8px] border-slate-200 text-slate-500 uppercase">{kpi.org}</Badge>
                  </div>
                  <span className="text-[10px] text-slate-600 font-bold uppercase leading-tight">{kpi.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}