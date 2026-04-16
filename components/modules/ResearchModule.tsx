"use client";

import React from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FileText, Download, User, Calendar as CalendarIcon, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const RESEARCH_PAPERS = [
  {
    id: 1,
    title: "Post-Oil Economic Diversification Strategies: The UAE Model",
    author: "Dr. Sultan Al-Qasimi",
    date: "March 2026",
    tags: ["Economy", "Sustainability"],
    abstract: "This paper analyzes the success factors of the UAE's non-oil GDP growth and provides a roadmap for emerging markets."
  },
  {
    id: 2,
    title: "AI Sovereignty and Data Governance in the MENA Region",
    author: "G42 Research Group",
    date: "February 2026",
    tags: ["Technology", "Security"],
    abstract: "An investigation into the requirements for building localized AI infrastructure to ensure digital sovereignty."
  },
  {
    id: 3,
    title: "Global Supply Chain Resilience and Maritime Security",
    author: "Strategic Studies Center",
    date: "January 2026",
    tags: ["Logistics", "Political"],
    abstract: "Assessing the impact of regional tensions on global trade routes and identifying mitigation strategies for hub economies."
  },
  {
    id: 4,
    title: "The Future of Sovereign Wealth Funds in a Multipolar World",
    author: "ADIA Insights Team",
    date: "December 2025",
    tags: ["Finance", "Investment"],
    abstract: "How SWFs are adaptive to shifting geopolitical landscapes and the rise of alternative currency regimes."
  }
];

export function ResearchModule({ isExpanded }: { isExpanded?: boolean }) {
  return (
    <div className="flex flex-col h-full">
      <SectionHeader
        title="Specialized Research"
        icon={FileText}
        subtitle="Analytical papers and strategic reports"
      />

      <div className={`mt-6 space-y-4 ${isExpanded ? 'grid grid-cols-2 gap-6 space-y-0' : ''}`}>
        {RESEARCH_PAPERS.slice(0, isExpanded ? undefined : 3).map((paper, i) => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col p-5 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-2">
                {paper.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-sky-50 text-[9px] font-black text-sky-700 rounded-full border border-sky-100 uppercase">
                    <Tag className="w-2 h-2" /> {tag}
                  </span>
                ))}
              </div>
              <button className="text-slate-400 hover:text-sky-600 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight group-hover:text-sky-700 transition-colors leading-tight mb-2">
              {paper.title}
            </h3>

            {isExpanded && (
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
                {paper.abstract}
              </p>
            )}

            <div className="flex items-center gap-4 mt-auto">
              <div className="flex items-center gap-1.5 overflow-hidden">
                <User className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="text-[10px] text-slate-500 font-bold truncate">{paper.author}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <CalendarIcon className="w-3 h-3 text-slate-400" />
                <span className="text-[10px] text-slate-500 font-bold">{paper.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {!isExpanded && (
        <div className="mt-auto pt-4 flex justify-center">
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest animate-pulse">
            Scroll for more specialized intelligence
          </p>
        </div>
      )}
    </div>
  );
}
