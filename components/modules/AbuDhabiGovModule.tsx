"use client";

import React from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Landmark, Users, ClipboardList, Activity, ArrowUpRight } from 'lucide-react';
import { abuDhabiGovData } from '@/lib/mockData';
import { motion } from 'framer-motion';

export function AbuDhabiGovModule({ isExpanded }: { isExpanded?: boolean }) {
  return (
    <div className="flex flex-col h-full">
      <SectionHeader
        title="Abu Dhabi Government"
        icon={Landmark}
        subtitle="Strategic Committees & Key Performance Indicators"
      />

      {/* KPI Section */}
      <div className={`mt-6 grid gap-4 ${isExpanded ? 'grid-cols-3' : 'grid-cols-1'}`}>
        {abuDhabiGovData.kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-sm flex flex-col justify-between"
          >
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
              <h3 className="text-2xl font-black text-slate-900">{kpi.value}</h3>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <Activity className="w-3 h-3 text-emerald-500" />
              <span className="text-[10px] font-black text-emerald-600 uppercase">{kpi.trend} increase</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Committees / Boards Section */}
      <div className={`mt-8 ${isExpanded ? 'grid grid-cols-2 gap-8' : 'space-y-4'}`}>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-sky-600" />
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Active Committees</h4>
          </div>
          <div className="space-y-2">
            {abuDhabiGovData.committees.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-white group cursor-pointer hover:bg-white/80 transition-all">
                <div>
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-tight">{item.name}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{item.meetings} Meetings YTD</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
                    {item.status}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover:text-slate-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {isExpanded && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="w-4 h-4 text-sky-600" />
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Strategic Files & Directives</h4>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Sustainable Industry Framework', code: 'AD-2026-F1' },
                { title: 'Cybersecurity Sovereign Cloud', code: 'AD-2026-T4' },
                { title: 'Hydrogen Energy Masterplan', code: 'AD-2026-E9' },
                { title: 'National Education Initiative', code: 'AD-2026-S2' },
              ].map((file) => (
                <div key={file.code} className="p-4 bg-slate-900/5 backdrop-blur-md rounded-xl border border-slate-200/50 flex items-center justify-between group cursor-pointer hover:bg-slate-900/10 transition-all">
                  <span className="text-xs font-bold text-slate-700 uppercase">{file.title}</span>
                  <span className="text-[9px] font-mono font-black text-slate-400">{file.code}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {!isExpanded && (
        <div className="mt-auto pt-6 border-t border-white/50">
          <p className="text-[9px] text-slate-400 font-medium italic text-center">
            Camera auto-locked to Abu Dhabi region for localized government intelligence
          </p>
        </div>
      )}
    </div>
  );
}
