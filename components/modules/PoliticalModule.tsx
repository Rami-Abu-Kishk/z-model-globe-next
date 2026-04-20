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
  Newspaper
} from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { SharedArticleView } from '@/components/shared/SharedArticleView';
import { cn } from '@/lib/utils';
import { 
  politicalDataStore,
  type PoliticalCase, 
  type RegionalCrisis 
} from '@/lib/mock-data/political.mock';
import { useZModelStore } from '@/lib/store';
import { useAIChat } from '../context/AIChatContext';
import { AiBadge } from '../shared/AiBadge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import dynamic from 'next/dynamic';
import { searchableCountries } from '@/lib/mockData';

const PoliticalChart3D = dynamic(() => import('./PoliticalChart3D'), { ssr: false });

export function PoliticalModule({ isExpanded }: { isExpanded?: boolean }) {
  const setActiveTarget = useZModelStore((s) => s.setActiveTarget);
  const setSelectedCountry = useZModelStore((s) => s.setSelectedCountry);
  const selectedCountry = useZModelStore((s) => s.selectedCountry);
  const setSelectedCountries = useZModelStore((s) => s.setSelectedCountries);
  
  const [selectedItem, setSelectedItem] = React.useState<PoliticalCase | RegionalCrisis | null>(null);
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

  const handleCrisisClick = (crisis: RegionalCrisis) => {
    setSelectedCountry(null); 
    const [lat, lng] = crisis.coordinates;
    setActiveTarget({ lat, lng, zoomLevel: 1.5 });
    
    // Contextual highlighting based on region
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
      setSelectedItem(crisis);
    }
  };

  const handleCaseClick = (pc: PoliticalCase) => {
    const [lng, lat] = pc.coordinates;
    setActiveTarget({ lat, lng, zoomLevel: 1.2 });
    if (pc.isoCodes) {
      setSelectedCountries(pc.isoCodes);
      setSelectedCountry(null);
    }
    
    if (isExpanded) {
      setSelectedItem(pc);
    }
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  if (isExpanded) {
    return (
      <div className="flex flex-col gap-8 pb-4 relative min-h-[700px]">
        {/* TOP: 4-Column KPI Grid - Hidden when an item is focused */}
        <AnimatePresence>
          {!selectedItem && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {data.kpis.map((kpi, idx) => (
                <div key={idx} className="p-5 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl flex flex-col justify-between group hover:border-sky-400/50 transition-all relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{kpi.label}</p>
                      <div className={`p-1.5 rounded-lg ${kpi.trend === 'up' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">{kpi.value}</h3>
                    
                    {kpi.representative && (
                      <div className="pt-4 border-t border-slate-200/50 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                          <Users className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-900 leading-none">{kpi.representative.name}</span>
                          <span className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">{kpi.representative.org}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN: Intelligence Dashboard Grid */}
        <div className="relative flex-1">
          <AnimatePresence mode="wait">
            {!selectedItem ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
              >
                {/* Left (Visualizer & Table - 2/3 width) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {/* Matrix Viz */}
                  <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                      <Activity className="w-12 h-12 text-sky-500" />
                    </div>
                    <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1 relative z-10">Stability Matrix</h4>
                    <p className="text-2xl font-black text-slate-900 tracking-tighter mb-4 relative z-10">Real-time GL-3D</p>
                    <div className="w-full h-[450px] bg-slate-50/50 rounded-2xl border border-slate-100 p-2 relative z-10 overflow-hidden">
                      <PoliticalChart3D />
                    </div>
                  </div>

                  {/* Strategic Cases Table */}
                  <div className="flex flex-col bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden min-h-[300px]">
                    <div className="p-6 border-b border-white/40 bg-slate-50/50 flex items-center justify-between">
                      <div>
                        <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                          <Globe className="w-4 h-4 text-sky-500" /> {selectedCountry ? `${selectedCountry} Strategic Files` : 'Global Ongoing Cases'}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">GEOPOLITICAL IMPACT ASSESSMENT</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] font-black bg-white/50 border-slate-300">ACTIVE STABILITY AUDIT</Badge>
                    </div>

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
                                <Badge className={`text-[9px] font-black px-2 py-0.5 shadow-none ${
                                  pc.severity === 'Critical' ? 'bg-rose-500 text-white' : 
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
                </div>

                {/* Right (Crisis Monitor - 1/3 width) */}
                <div className="flex flex-col bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden min-h-[810px]">
                  <div className="p-5 border-b border-rose-100 bg-rose-50/50 flex items-center justify-between">
                    <h4 className="text-[12px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Regional Crisis Monitor
                    </h4>
                  </div>
                  
                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-4">
                      {data.crises.map((crisis) => (
                        <div 
                          key={crisis.id} 
                          className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-rose-200 transition-all cursor-pointer group"
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
              </motion.div>
            ) : (
              <SharedArticleView
                article={{
                  title: 'name' in selectedItem ? selectedItem.name : `${selectedItem.region} Conflict Alert`,
                  subtitle: `${'region' in selectedItem ? selectedItem.region : 'Global'} • ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
                  category: 'severity' in selectedItem ? selectedItem.severity : 'Conflict',
                  badgeText: 'severity' in selectedItem ? `Priority: ${selectedItem.severity}` : `Impact: ${selectedItem.uaeImpact}%`,
                  badgeClassName: 'severity' in selectedItem ? (selectedItem.severity === 'Critical' ? "bg-rose-500" : "bg-sky-500") : "bg-amber-500",
                  imageUrl: selectedItem.imageUrl,
                  summary: selectedItem.summary || ('description' in selectedItem ? selectedItem.description : selectedItem.details),
                  source: {
                    name: 'Geopolitical Intelligence Report',
                    description: 'Global Monitoring Division',
                  }
                }}
                onBack={handleBack}
                extraContent={'involvedParties' in selectedItem && (
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Involved Parties & Stakeholders</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.involvedParties.map((party, i) => (
                        <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-600 font-bold px-3 py-1 border-none uppercase text-[9px]">
                          {party}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              />
            )}
          </AnimatePresence>
        </div>
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
            <div key={i} className="p-4 bg-white/20 border border-white/40 rounded-2xl">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">{kpi.label}</p>
              <p className="text-xl font-black text-slate-900 tracking-tighter">{kpi.value}</p>
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
    </div>
  );
}


