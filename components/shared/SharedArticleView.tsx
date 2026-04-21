"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Minimize2,
  ExternalLink,
  FileText,
  Newspaper,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface BaseArticle {
  title: string;
  subtitle: string;
  category: string;
  badgeText?: string;
  badgeClassName?: string;
  imageUrl?: string;
  summary: string;
  content?: string | React.ReactNode;
  source?: {
    name: string;
    description: string;
    initial?: string;
    icon?: React.ReactNode;
  };
  links?: Array<{ label: string; url: string }>;
}

interface SharedArticleViewProps {
  article: BaseArticle;
  onBack: () => void;
  actions?: React.ReactNode;
  extraContent?: React.ReactNode;
  className?: string;
}

export function SharedArticleView({
  article,
  onBack,
  actions,
  extraContent,
  className
}: SharedArticleViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever the article content changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [article]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className={cn(
        "bg-white/40 backdrop-blur-3xl border border-white/80 rounded-[40px] shadow-3xl overflow-hidden flex flex-col lg:flex-row min-h-[600px] border-b-8 border-b-slate-900",
        className
      )}
    >
      {/* Hero Section */}
      <div className="w-full lg:w-1/2 h-[300px] lg:h-auto relative bg-slate-100">
        <img
          src={article.imageUrl || "/assets/images/branding/fallback.png"}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/assets/images/branding/fallback.png";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 p-10">
          <Badge className={cn(
            "mb-4 text-[10px] font-black uppercase border-none h-6 px-4 shadow-xl",
            article.badgeClassName || "bg-sky-500"
          )}>
            {article.badgeText || article.category}
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tighter drop-shadow-2xl">
            {article.title}
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div
        ref={scrollContainerRef}
        className="flex-1 p-8 lg:p-12 flex flex-col justify-between overflow-y-auto scroll-smooth"
      >
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-black overflow-hidden">
                {article.source?.icon ? article.source.icon : (
                  <span className="text-lg">{article.source?.initial || article.source?.name?.[0] || 'Z'}</span>
                )}
              </div>
              <div>
                <p className="text-[12px] font-black text-slate-900 uppercase">
                  {article.source?.name || 'Intelligence Report'}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  {article.subtitle}
                </p>
              </div>
            </div>
            <Button
              onClick={onBack}
              variant="ghost"
              className="rounded-full w-12 h-12 hover:bg-slate-100 group transition-all"
            >
              <Minimize2 className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="prose prose-slate max-w-none">
            <p className="text-xl lg:text-2xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
              {article.summary}
            </p>
            <div className="text-slate-600 leading-loose text-lg font-medium">
              {typeof article.content === 'string' ? (
                <p>{article.content}</p>
              ) : (
                article.content || (
                  <p>
                    Strategic intelligence reports indicate that this development will have significant implications for regional sovereignty and digital infrastructure. Our analysis suggests a 15% increase in operational efficiency across relevant sectors within the next fiscal quarter.
                  </p>
                )
              )}
            </div>
          </div>

          {/* Extra Content (e.g. Tags, Involved Parties) */}
          {extraContent && (
            <div className="mt-8">
              {extraContent}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-12 space-y-6">
          {article.links && article.links.length > 0 && (
            <div className="space-y-4">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resources & External Intelligence</h5>
              <div className="flex flex-wrap gap-4">
                {article.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-2xl hover:border-slate-900 hover:shadow-lg transition-all group"
                  >
                    <FileText className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
                    <span className="text-[11px] font-black text-slate-900 uppercase">{link.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-6">
            <Button onClick={onBack} className="rounded-2xl h-14 px-8 bg-slate-900 text-white hover:bg-slate-800 transition-all text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Minimize Analysis
            </Button>
            {actions || (
              <Button variant="outline" className="rounded-2xl h-14 px-8 border-slate-200 hover:border-slate-900 transition-all text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                <Download className="w-4 h-4" /> Export Report Audit
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
