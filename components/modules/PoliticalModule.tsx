import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Info,
  AlertTriangle,
  Globe,
  MapPin,
  Zap,
  Activity,
  FileText,
  Download,
  Users,
  Eye,
  ChevronLeft,
  Maximize2,
  Minimize2,
  ExternalLink,
  Newspaper,
  Sparkles
} from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { SharedArticleView } from '@/components/shared/SharedArticleView';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  politicalDataStore,
  type PoliticalCase,
  type RegionalCrisis,
  type PoliticalKpi
} from '@/lib/mock-data/political.mock';
import { useZModelStore } from '@/lib/store';
import { useAIChat } from '../context/AIChatContext';
import { AiBadge } from '../shared/AiBadge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KpiInsightOverlay, KpiInsightData } from '@/components/shared/KpiInsightOverlay';
import dynamic from 'next/dynamic';

const PoliticalChart3D = dynamic(() => import('./PoliticalChart3D'), { ssr: false });

export function PoliticalModule({ isExpanded }: { isExpanded?: boolean }) {
  const {
    setActiveTarget,
    setSelectedCountry,
    setSelectedCountries,
    selectedCountry,
    setActiveEconomyTrend,
    politicalSelectedCase,
    setPoliticalSelectedCase,
    setPoliticalActiveRingLabels
  } = useZModelStore();

  const [selectedKpi, setSelectedKpi] = useState<PoliticalKpi | null>(null);
  const { triggerChatFromCard } = useAIChat();

  const handleAiTrigger = (e: React.MouseEvent, pc: PoliticalCase) => {
    e.stopPropagation();
    triggerChatFromCard({
      module: 'Politics',
      section: 'Strategic Files',
      title: pc.name,
      value: pc.severity
    });
  };

  const data = useMemo(() =>
    politicalDataStore[selectedCountry || 'GLOBAL'] || politicalDataStore['GLOBAL'],
    [selectedCountry]
  );

  // Maps a crisis/case region name to the matching politicalCrisisRings label(s)
  const getRingLabelsForRegion = (inputText: string): string[] => {
    const text = inputText.toLowerCase();
    const matches: string[] = [];

    // Direct Name Matches (Prioritize these)
    if (text.includes('russia') || text.includes('ukraine')) matches.push('Russia–Ukraine Conflict');
    if (text.includes('trump') || text.includes('domestic policy')) matches.push('Trump Domestic Policy Protests');
    if (text.includes('iran') && text.includes('israel')) matches.push('Iran–Israel–US War');
    if (text.includes('lebanon')) matches.push('Israel–Lebanon Conflict');

    // Region / Cluster Matches
    if (text.includes('levant') || text.includes('corridor')) matches.push('Levant Corridor');
    if (text.includes('bab-el-mandeb') || text.includes('red sea') || text.includes('maritime security')) matches.push('Bab-el-Mandeb');
    if (text.includes('sudan') || text.includes('heartland')) matches.push('Sudan Heartland');
    if (text.includes('hormuz') || text.includes('straits') || text.includes('gulf')) matches.push('Hormuz Straits');

    // Cross-region triggers
    if (text.includes('aviation') || text.includes('airspace')) {
      matches.push('Levant Corridor', 'Hormuz Straits');
    }

    return matches;
  };

  const handleCrisisClick = (crisis: RegionalCrisis) => {
    const [lat, lng] = crisis.coordinates;
    setActiveTarget({ lat, lng, zoomLevel: 1.5 });

    // Show only the rings relevant to this crisis
    setPoliticalActiveRingLabels(getRingLabelsForRegion(crisis.region));

    if (crisis.region.includes('Levant')) {
      setSelectedCountries(['IL', 'PS', 'JO', 'LB', 'SY']);
    } else if (crisis.region.includes('Bab-el-Mandeb') || crisis.region.includes('Red Sea')) {
      setSelectedCountries(['YE', 'SA', 'EG', 'DJ', 'ER']);
    } else if (crisis.region.includes('Sudan')) {
      setSelectedCountries(['SD', 'SS', 'ET', 'TD']);
    } else if (crisis.region.includes('Hormuz')) {
      setSelectedCountries(['AE', 'OM', 'IR', 'SA']);
    }

    if (isExpanded) {
      setPoliticalSelectedCase(crisis);
    }
  };

  const handleCaseClick = (pc: PoliticalCase) => {
    const [lng, lat] = pc.coordinates;
    setActiveTarget({ lat, lng, zoomLevel: 1.2 });

    // Show only the rings relevant to this case
    setPoliticalActiveRingLabels(getRingLabelsForRegion(pc.region + ' ' + pc.name));

    if (pc.isoCodes) {
      setSelectedCountries(pc.isoCodes);
    }

    if (isExpanded) {
      setPoliticalSelectedCase(pc);
    }
  };

  const handleKpiClick = (kpi: PoliticalKpi) => {
    if (kpi.insightData) {
      setSelectedKpi(kpi);
    }
  };

  const handleBack = () => {
    setPoliticalSelectedCase(null);
    setSelectedCountries([]);
    setActiveEconomyTrend(null);
    setPoliticalActiveRingLabels(null); // Restore all rings

    // If a country was previously selected (e.g. UAE), refocus on it
    if (selectedCountry) {
      setSelectedCountry(selectedCountry);
    }
  };

  if (isExpanded) {
    return (
      <div className="flex flex-col gap-12 pb-12 relative min-h-[700px]">
        <AnimatePresence mode="wait">
          {!politicalSelectedCase ? (
            <motion.div
              key="main-dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col gap-12"
            >
              <section className="space-y-6">
                <SectionHeader
                  title="Top Cases & files"
                  icon={FileText}
                  subtitle={selectedCountry ? `${selectedCountry} Strategic Files` : 'Global Ongoing Geopolitical Cases'}
                />

                <div className="flex flex-col bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden">
                  <div className="p-2">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-slate-100">
                          <TableHead className="text-[10px] font-black text-slate-400 uppercase">Case Name</TableHead>
                          <TableHead className="text-[10px] font-black text-slate-400 uppercase">Region</TableHead>
                          <TableHead className="text-[10px] font-black text-slate-400 uppercase text-center">Status</TableHead>
                          <TableHead className="text-[10px] font-black text-slate-400 uppercase text-right">Briefing</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.cases.map((pc) => (
                          <TableRow
                            key={pc.id}
                            className="group cursor-pointer border-slate-50 hover:bg-sky-50/50 transition-colors"
                            onClick={() => handleCaseClick(pc)}
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className={`w-1.5 h-1.5 rounded-full ${pc.severity === 'Critical' ? 'bg-rose-500 animate-pulse' : (pc.severity === 'Warning' ? 'bg-amber-500' : 'bg-emerald-500')}`} />
                                <span className="text-[12px] font-black text-slate-900">{pc.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-[11px] font-bold text-slate-500">{pc.region}</TableCell>
                            <TableCell className="text-center">
                              <Badge className={`text-[9px] font-black px-2 py-0.5 shadow-none ${pc.severity === 'Critical' ? 'bg-rose-500 text-white' :
                                pc.severity === 'Warning' ? 'bg-amber-100 text-amber-700' :
                                  'bg-emerald-100 text-emerald-700'
                                }`}>
                                {pc.severity}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-3 relative">
                                <AiBadge
                                  onClick={(e) => handleAiTrigger(e, pc)}
                                  className="relative !w-7 !h-7 !static shadow-none border-slate-200 hover:bg-sky-50"
                                  tooltipText="Geopolitical Briefing"
                                />
                                <Download className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-500 transition-colors" />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <Activity className="w-12 h-12 text-sky-500" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tighter mb-4 relative z-10"> Case Severity & Impact Analysis</p>
                  <div className="w-full h-[450px] bg-slate-50/50 rounded-2xl border border-slate-100 p-2 relative z-10 overflow-hidden">
                    <PoliticalChart3D cases={data.cases} />
                  </div>
                </div>
              </section>

              {selectedCountry === 'AE' && (
                <section className="space-y-6">
                  <SectionHeader
                    title="Recent crises"
                    icon={AlertTriangle}
                    subtitle="Live monitoring of regional stability & conflict zones"
                  />
                  <div className="flex flex-col bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden">
                    <ScrollArea className="h-[400px]">
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.crises.map((crisis) => (
                          <div
                            key={crisis.id}
                            className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-rose-200 transition-all cursor-pointer group shadow-sm hover:shadow-md"
                            onClick={() => handleCrisisClick(crisis)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[12px] font-black text-slate-900 uppercase">{crisis.region}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic mb-3">{crisis.details}</p>
                            <div className="mt-auto flex items-center justify-between">
                              <Badge className="bg-slate-100 text-slate-600 text-[9px] font-black px-2 py-0.5 border-none shadow-none uppercase">
                                {crisis.status}
                              </Badge>
                              <Maximize2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-rose-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </section>
              )}

              {/* <section className="space-y-6">
                <SectionHeader 
                  title="Intelligence Briefs" 
                  icon={Newspaper} 
                  subtitle="Latest strategic intelligence & diplomatic intercepts"
                />
                <div className="flex flex-col bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden">
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.news.map((news) => (
                      <div 
                        key={news.id} 
                        className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-sky-200 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <Badge className="bg-slate-100 text-slate-600 text-[9px] font-black px-2 py-0.5 border-none shadow-none uppercase">
                              {news.category} • {news.time}
                            </Badge>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{news.source}</span>
                          </div>
                          <h4 className="text-[14px] font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-tight mb-2">
                            {news.headline}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">{news.summary}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section> */}

              <section className="space-y-6">
                <SectionHeader
                  title={`${selectedCountry && selectedCountry.length > 1 ? "UAE" : "Global"} Kpis`}
                  icon={Activity}
                  subtitle="Executive stability indices & predictive matrix"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.kpis.map((kpi, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl flex flex-col justify-between group hover:border-sky-400/50 transition-all relative cursor-pointer"
                      onClick={() => handleKpiClick(kpi)}
                    >
                      <AiBadge
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerChatFromCard({
                            module: 'Political',
                            section: 'Stability KPIs',
                            title: kpi.label,
                            value: kpi.value
                          });
                        }}
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 cursor-pointer z-20"
                        tooltipText="AI Deep Dive"
                      />
                      <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{kpi.label}</p>
                          <div className={`p-1.5 rounded-lg ${kpi.trend === 'up' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                            <Zap className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">{kpi.value}</h3>

                        {/* {kpi.representative && (
                          <div className="pt-4 border-t border-slate-200/50 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                              <Users className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-slate-900 leading-none">{kpi.representative.name}</span>
                              <span className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">{kpi.representative.org}</span>
                            </div>
                          </div>
                        )} */}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <SharedArticleView
              article={{
                title: 'name' in politicalSelectedCase ? politicalSelectedCase.name : `${politicalSelectedCase.region} Conflict Alert`,
                subtitle: `${'region' in politicalSelectedCase ? politicalSelectedCase.region : 'Global'} • ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
                category: 'severity' in politicalSelectedCase ? politicalSelectedCase.severity : 'Conflict',
                badgeText: 'severity' in politicalSelectedCase ? `Priority: ${politicalSelectedCase.severity}` : `Impact: ${politicalSelectedCase.uaeImpact}%`,
                badgeClassName: 'severity' in politicalSelectedCase ? (politicalSelectedCase.severity === 'Critical' ? "bg-rose-500" : "bg-sky-500") : "bg-amber-500",
                imageUrl: politicalSelectedCase.imageUrl,
                summary: politicalSelectedCase.summary || ('description' in politicalSelectedCase ? politicalSelectedCase.description : politicalSelectedCase.details),
                source: {
                  name: 'Geopolitical Intelligence Report',
                  description: 'Global Monitoring Division',
                }
              }}
              onBack={handleBack}
              extraContent={
                <div className="space-y-6">
                  {politicalSelectedCase.severityScore !== undefined && (
                    <div className="space-y-3">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conflict Metrics Analysis</h5>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex flex-col items-center">
                          <span className="text-[9px] font-black text-rose-500 uppercase">Severity</span>
                          <span className="text-xl font-black text-rose-700">{politicalSelectedCase.severityScore}%</span>
                        </div>
                        <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex flex-col items-center">
                          <span className="text-[9px] font-black text-amber-500 uppercase">Sensitivity</span>
                          <span className="text-xl font-black text-amber-700">{politicalSelectedCase.sensitivityScore}%</span>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
                          <span className="text-[9px] font-black text-slate-500 uppercase">Complexity</span>
                          <span className="text-xl font-black text-slate-700">{politicalSelectedCase.complexityScore}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {'involvedParties' in politicalSelectedCase && (
                    <div className="space-y-4">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Involved Parties & Stakeholders</h5>
                      <div className="flex flex-wrap gap-2">
                        {politicalSelectedCase.involvedParties.map((party: string, i: number) => (
                          <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-600 font-bold px-3 py-1 border-none uppercase text-[9px]">
                            {party}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              }
            />
          )}
        </AnimatePresence>

        {/* Reusable KPI Deep-Dive Overlay */}
        <KpiInsightOverlay
          isOpen={!!selectedKpi}
          onClose={() => setSelectedKpi(null)}
          kpi={selectedKpi ? {
            title: selectedKpi.label,
            value: selectedKpi.value,
            org: selectedKpi.insightData?.org || selectedKpi.representative?.org || 'Z-Model Digital Core',
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
            "Initializing Political Audit Core...",
            "Synthesizing Geopolitical Vectors...",
            "Analyzing Regional Stability Matrix...",
            "Calibrating Diplomatic Projections...",
            "Finalizing AI Synthesis..."
          ]}
        />
      </div>
    );
  }

  // --- COMPACT VIEW ---
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white/5">
      <SectionHeader
        title={selectedCountry ? `${selectedCountry} Political Hub` : "Geopolitical Stability"}
        icon={ShieldAlert}
        subtitle="Global Crisis Monitoring & Security Audits"
      />

      <div className="flex-1 p-4 overflow-hidden">
        <div className="grid grid-cols-2 gap-3 mb-6">
          {data.kpis.slice(0, 2).map((kpi, i) => (
            <div
              key={i}
              className="p-4 bg-white/20 border border-white/40 rounded-2xl cursor-pointer hover:bg-white/30 transition-all"
              onClick={() => handleKpiClick(kpi)}
            >
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">{kpi.label}</p>
              <p className="text-xl font-black text-slate-900 tracking-tighter">{kpi.value}</p>
            </div>
          ))}
        </div>

        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">INTELLIGENCE BRIEFS</h4>
        <div className="space-y-3 mb-6">
          {data.news.slice(0, 2).map((news) => (
            <div
              key={news.id}
              className="p-3 bg-white/40 border border-white/60 rounded-2xl cursor-pointer hover:bg-white/60 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] font-black text-sky-600 uppercase tracking-widest">{news.category}</span>
                <span className="text-[8px] font-bold text-slate-400">{news.time}</span>
              </div>
              <p className="text-[10px] font-black text-slate-900 leading-tight">{news.headline}</p>
            </div>
          ))}
        </div>

        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">STRATEGIC FILES</h4>
        <div className="space-y-3">
          {data.cases.slice(0, 3).map((pc) => (
            <div
              key={pc.id}
              className="p-3 bg-white/40 border border-white/60 rounded-2xl cursor-pointer hover:bg-white/60 transition-all flex items-center justify-between"
              onClick={() => handleCaseClick(pc)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${pc.severity === 'Critical' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                <span className="text-[11px] font-black text-slate-900 uppercase">{pc.name}</span>
              </div>
              <Activity className="w-3.5 h-3.5 text-slate-400" />
            </div>
          ))}
          {data.cases.length === 0 && (
            <p className="text-[9px] text-slate-400 italic text-center py-4 font-bold uppercase tracking-widest">Scanning network...</p>
          )}
        </div>
      </div>

      {/* Reusable KPI Deep-Dive Overlay */}
      <KpiInsightOverlay
        isOpen={!!selectedKpi}
        onClose={() => setSelectedKpi(null)}
        kpi={selectedKpi ? {
          title: selectedKpi.label,
          value: selectedKpi.value,
          org: selectedKpi.insightData?.org || selectedKpi.representative?.org || 'Z-Model Digital Core',
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
          "Initializing Political Audit Core...",
          "Synthesizing Geopolitical Vectors...",
          "Analyzing Regional Stability Matrix...",
          "Calibrating Diplomatic Projections...",
          "Finalizing AI Synthesis..."
        ]}
      />
    </div>
  );
}


