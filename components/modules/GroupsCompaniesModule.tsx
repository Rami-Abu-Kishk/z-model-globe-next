"use client";

import React from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dynamic from 'next/dynamic';
import { groupCompanies } from '@/lib/mock-data/groups.mock';
import { CheckCircle2, Factory, TrendingUp as TrendIcon, ExternalLink, Briefcase, CreditCard, Building2, Terminal, Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, any> = {
  "IHC": Building2,
  "Royal Group": CreditCard,
  "G42": Terminal,
  "ADIA": Briefcase
};

const GroupsFinancialsChart = dynamic(() => import('./GroupsFinancialsChart'), { ssr: false });
const GroupsChart3D = dynamic(() => import('./GroupsChart3D'), { ssr: false });

export function GroupsCompaniesModule({ isExpanded }: { isExpanded?: boolean }) {
  if (isExpanded) {
    return (
      <div className="flex flex-col h-full gap-6 pb-8 overflow-y-auto">
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-8 shadow-xl">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Activity className="w-3 h-3" /> Multi-Group Financial Benchmark (3D)
          </h4>
          <div className="h-[400px]">
            <GroupsChart3D />
          </div>
        </div>

        <Tabs defaultValue="G1" className="flex-1 flex gap-8 min-h-0">
          {/* Vertical Sidebar Tabs */}
          <TabsList className="flex flex-col h-fit w-64 bg-white/40 backdrop-blur-xl border border-white/60 p-2 rounded-2xl shadow-xl space-y-2">
            {groupCompanies.map((company) => {
              const Icon = iconMap[company.name] || Building2;
              return (
                <TabsTrigger
                  key={company.id}
                  value={company.id}
                  className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all text-left"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-black uppercase truncate">{company.name}</span>
                    <span className="text-[9px] font-bold opacity-60 uppercase">{company.ticker || 'Private'}</span>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Expanded Content Panels */}
          {groupCompanies.map((company) => (
            <TabsContent key={company.id} value={company.id} className="flex-1 mt-0 outline-none">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                {/* Left side: Overview & Chart */}
                <div className="flex flex-col gap-6">
                  <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-8 shadow-xl">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-3xl font-black text-slate-900 mb-2">{company.name}</h3>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{company.description}</p>
                      </div>
                      <Badge className="bg-emerald-600 text-white font-black px-3 py-1">
                        {company.financials}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Audit Status</p>
                        <div className="flex items-center gap-2 text-emerald-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-sm font-black uppercase">{company.auditStatus}</span>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Projects</p>
                        <span className="text-xl font-black text-slate-900">{company.projectsCount}</span>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Highlight</p>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase italic">{company.highlight}</span>
                      </div>
                    </div>

                    <div className="h-[250px] relative">
                      <div className="absolute top-0 left-0 flex items-center gap-2 mb-4 bg-white/60 px-2 py-1 rounded border border-white/80 z-10">
                        <TrendIcon className="w-3 h-3 text-emerald-600" />
                        <span className="text-[9px] font-black text-slate-600 uppercase">Quarterly Asset Growth (B AED)</span>
                      </div>
                      <GroupsFinancialsChart
                        data={company.financialHistory}
                        color={company.name === 'G42' ? '#3b82f6' : '#10b981'}
                      />
                    </div>
                  </div>
                </div>

                {/* Right side: Key Projects & Holdings */}
                <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl flex flex-col overflow-hidden">
                  <div className="p-6 border-b border-white/40 bg-slate-50/20 flex items-center justify-between">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Factory className="w-3 h-3" /> Strategic Projects & Holdings
                    </h4>
                    <Badge variant="outline" className="text-[8px] border-slate-200">INTERNAL AUDIT PORTAL</Badge>
                  </div>
                  <ScrollArea className="flex-1">
                    <div className="p-6 space-y-4">
                      {company.mainProjects.map((project) => (
                        <div key={project.id} className="p-5 bg-white/60 rounded-xl border border-white/80 hover:border-emerald-200 hover:shadow-lg transition-all cursor-pointer group">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-slate-900 text-white text-[9px] px-2">{project.category}</Badge>
                            <span className="text-[11px] font-black text-slate-900">{project.value}</span>
                          </div>
                          <h5 className="text-base font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:text-emerald-700 transition-colors">
                            {project.name}
                          </h5>
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-bold uppercase ${project.status === 'Ongoing' ? 'text-amber-600' :
                                project.status === 'Strategic' ? 'text-indigo-600' : 'text-emerald-600'
                              }`}>
                              STATUS: {project.status}
                            </span>
                            <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-slate-600 transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <SectionHeader
        title="Groups & Key Companies"
        icon={Building2}
        subtitle="Consolidated Financial & Project Audit"
      />

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 pb-4">
          {groupCompanies.map((company) => {
            const Icon = iconMap[company.name] || Building2;
            return (
              <Card key={company.name} className="border-white/20 bg-white/30 shadow-sm backdrop-blur-sm group hover:border-emerald-200 transition-all duration-300">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-emerald-50 transition-colors">
                      <Icon className="w-4 h-4 text-slate-600 group-hover:text-emerald-600" />
                    </div>
                    {company.ticker && (
                      <Badge variant="outline" className="text-[8px] font-bold py-0 h-4 border-slate-200">
                        {company.ticker}
                      </Badge>
                    )}
                  </div>

                  <h4 className="text-[11px] font-black text-slate-900 uppercase mb-0.5">{company.name}</h4>
                  <p className="text-[10px] text-emerald-700 font-bold mb-2">{company.financials}</p>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="text-slate-400 font-medium">Audit Status</span>
                      <span className="text-slate-700 font-bold uppercase">{company.auditStatus}</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="text-slate-400 font-medium">Active Projects</span>
                      <span className="text-slate-900 font-black">{company.projectsCount}</span>
                    </div>
                    <div className="mt-1 pt-1.5 border-t border-slate-100/50">
                      <p className="text-[8px] text-slate-400 font-bold uppercase italic tracking-tighter">{company.highlight}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}


