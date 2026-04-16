"use client";

import React from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileStack, Table as TableIcon, FileText, Paperclip } from 'lucide-react';
import { droAgenda, droFiles } from '@/lib/mock-data/dro.mock';

import { FolderOpen, Search, Upload, MoreVertical, Shield, Users, Clock as ClockIcon, FileCheck } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function DroModule({ isExpanded }: { isExpanded?: boolean }) {
  if (isExpanded) {
    return (
      <div className="flex flex-col h-full gap-6 pb-8">
        {/* Top Header / Actions Area */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <Input 
               placeholder="Search confidential files, reports, or meeting entries..." 
               className="pl-12 h-14 bg-white/40 backdrop-blur-xl border-white/60 rounded-2xl shadow-lg font-medium text-slate-900 border-none transition-all focus:ring-2 focus:ring-slate-900"
             />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white/40 border-white/60 rounded-2xl font-black text-[10px] uppercase gap-2 h-14 px-6 shadow-md transition-all hover:bg-white/60">
               <Upload className="w-4 h-4" /> Upload Document
            </Button>
            <Button className="bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase h-14 px-8 shadow-xl transition-all hover:bg-slate-800">
               New Board Entry
            </Button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
          {/* File Explorer (L-Pane) */}
          <div className="lg:col-span-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/40 bg-slate-50/20 flex items-center justify-between">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <FolderOpen className="w-3 h-3" /> Secure Repository
               </h4>
               <Badge variant="outline" className="text-[8px] border-slate-200">256-BIT ENCRYPTION ACTIVE</Badge>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-white/40">
                  <TableHead className="text-[10px] font-black uppercase text-slate-400 pl-8 h-12">File Name</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-400 h-12">Format</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-400 h-12">Dept / Owner</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-400 h-12">Updated</TableHead>
                  <TableHead className="text-right text-[10px] font-black uppercase text-slate-400 pr-8 h-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {droFiles.map((file) => (
                  <TableRow key={file.id} className="hover:bg-white/40 border-white/20 transition-colors group cursor-pointer">
                    <TableCell className="pl-8 py-5">
                       <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg bg-slate-100 group-hover:bg-amber-100 transition-colors",
                            file.format === 'PDF' && "text-rose-600",
                            file.format === 'EXCEL' && "text-emerald-600",
                            file.format === 'DOCX' && "text-blue-600",
                            file.format === 'IMAGE' && "text-purple-600"
                          )}>
                             <FileText className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{file.name}</span>
                             <span className="text-[10px] font-bold text-slate-400">{file.size}</span>
                          </div>
                       </div>
                    </TableCell>
                    <TableCell className="py-5">
                       <Badge variant="secondary" className="text-[9px] font-black px-1.5 py-0 bg-white border border-slate-100 shadow-sm">{file.format}</Badge>
                    </TableCell>
                    <TableCell className="py-5 text-[11px] font-bold text-slate-600 uppercase">{file.owner}</TableCell>
                    <TableCell className="py-5 text-[11px] font-bold text-slate-600 uppercase italic">{file.updated}</TableCell>
                    <TableCell className="text-right pr-8 py-5">
                       <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/60">
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Agenda & Details (R-Pane) */}
          <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
             <div className="bg-slate-950 text-white rounded-2xl shadow-2xl p-6 border border-white/10 flex flex-col overflow-hidden h-full">
                <div className="flex items-center justify-between mb-8">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <ClockIcon className="w-3 h-3" /> Agenda Checklist
                   </h4>
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                
                <ScrollArea className="flex-1 -mx-2 px-2">
                   <div className="space-y-6">
                      {droAgenda.map((item) => (
                        <div key={item.id} className="relative pl-6 pb-6 border-l border-white/10 last:pb-0">
                           <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                           <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">{item.time}</p>
                           <h5 className="text-sm font-black uppercase mb-2 leading-tight">{item.title}</h5>
                           <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                 <Shield className="w-3 h-3" />
                                 <span className={cn(
                                   "font-bold uppercase",
                                   item.status === 'Confidential' ? "text-rose-400" : "text-emerald-400"
                                 )}>{item.status}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                 <Users className="w-3 h-3" />
                                 <span className="font-medium truncate">{item.attendees.join(', ')}</span>
                              </div>
                              <div className="mt-3">
                                 <Button variant="outline" className="h-8 text-[9px] font-black uppercase border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all gap-2 w-full justify-center">
                                    <FileCheck className="w-3 h-3" /> Review Document
                                 </Button>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </ScrollArea>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <SectionHeader 
        title="DRO - Files & Tracking" 
        icon={FileStack} 
        subtitle="Department Resources & Operation Logs"
      />
      
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="mb-4">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <TableIcon className="w-3 h-3" /> Core Agenda
          </h4>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="h-7 text-[9px] uppercase">Time</TableHead>
                <TableHead className="h-7 text-[9px] uppercase">Title</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {droAgenda.slice(0, 3).map((item, i) => (
                <TableRow key={i} className="hover:bg-white/20 border-white/20">
                  <TableCell className="py-2 text-[10px] font-black text-slate-900">{item.time}</TableCell>
                  <TableCell className="py-2 text-[10px] font-bold text-slate-700">{item.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Paperclip className="w-3 h-3" /> Main Files Tracking
          </h4>
          <div className="space-y-2 overflow-y-auto pr-2">
            {droFiles.slice(0, 4).map((file, i) => {
              const extension = file.format;
              return (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50/50 border border-slate-100 hover:border-slate-300 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileText className="w-4 h-4 text-slate-400 group-hover:text-amber-600 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-bold text-slate-800 truncate">{file.name}</p>
                      <p className="text-[8px] text-slate-400 font-medium">{file.size} • Updated {file.updated}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[8px] h-4 px-1 bg-white border border-slate-200 text-slate-600">
                    {extension}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

