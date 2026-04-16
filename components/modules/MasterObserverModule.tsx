"use client";

import React from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Target, CheckCircle2, Clock, PlayCircle } from 'lucide-react';
import { masterObserverTasks } from '@/lib/mock-data/masterObserver.mock';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Calendar as CalendarIcon, Filter } from 'lucide-react';

export function MasterObserverModule({ isExpanded }: { isExpanded?: boolean }) {
  if (isExpanded) {
    return (
      <div className="flex flex-col h-full gap-6 pb-8">
        <Tabs defaultValue="all" className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-8">
             <TabsList className="bg-white/40 backdrop-blur-xl border border-white/60 p-1 rounded-2xl h-12 shadow-md">
                <TabsTrigger value="all" className="px-6 text-[10px] font-black uppercase rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white">All directives</TabsTrigger>
                <TabsTrigger value="In Progress" className="px-6 text-[10px] font-black uppercase rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white">In Progress</TabsTrigger>
                <TabsTrigger value="Pending" className="px-6 text-[10px] font-black uppercase rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white">Pending</TabsTrigger>
                <TabsTrigger value="Completed" className="px-6 text-[10px] font-black uppercase rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white">Completed</TabsTrigger>
             </TabsList>
             
             <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-white/40 border-white/60 rounded-xl font-black text-[10px] uppercase gap-2 h-10">
                   <Filter className="w-3 h-3" /> Filter By Dept
                </Button>
                <Button size="sm" className="bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase h-10 px-4">
                   + Create New Directive
                </Button>
             </div>
          </div>

          <div className="flex-1 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl overflow-hidden flex flex-col">
            <ScrollArea className="flex-1">
              <TabsContent value="all" className="m-0 border-none outline-none">
                <TaskTable tasks={masterObserverTasks} />
              </TabsContent>
              {['In Progress', 'Pending', 'Completed'].map(status => (
                <TabsContent key={status} value={status} className="m-0 border-none outline-none">
                  <TaskTable tasks={masterObserverTasks.filter(t => t.status === status)} />
                </TabsContent>
              ))}
            </ScrollArea>
          </div>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <SectionHeader 
        title="Master B. Observer" 
        icon={Target} 
        subtitle="Executive Directives & Project Tracking"
      />
      
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <Tabs defaultValue="projects" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="bg-slate-100/50 p-1 rounded-lg h-auto mb-4 self-start">
            <TabsTrigger value="followups" className="text-[9px] py-1 px-3 font-bold uppercase">Follow-ups</TabsTrigger>
            <TabsTrigger value="directions" className="text-[9px] py-1 px-3 font-bold uppercase">Directions</TabsTrigger>
            <TabsTrigger value="projects" className="text-[9px] py-1 px-3 font-bold uppercase">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-3">
                {masterObserverTasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="p-3 bg-white/30 border border-white/50 rounded-xl hover:border-slate-300 transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                       <h5 className="text-[11px] font-bold text-slate-800 leading-tight group-hover:text-slate-900">{task.title}</h5>
                       <Badge className={cn(
                        "text-[8px] h-4 px-1 leading-none uppercase",
                        task.priority === 'High' ? "bg-rose-100 text-rose-700" : task.priority === 'Medium' ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"
                       )}>
                        {task.priority}
                       </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100/50">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px] font-bold">{task.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {task.status === 'Completed' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        ) : task.status === 'In Progress' ? (
                          <PlayCircle className="w-3 h-3 text-amber-500 animate-pulse" />
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                        )}
                        <span className="text-[9px] font-black text-slate-600 uppercase">{task.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="followups" className="flex-1 flex items-center justify-center italic text-slate-400 text-xs">
            No active follow-ups.
          </TabsContent>
          <TabsContent value="directions" className="flex-1 flex items-center justify-center italic text-slate-400 text-xs">
            Reviewing new directives...
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function TaskTable({ tasks }: { tasks: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-white/40">
          <TableHead className="w-[80px] text-[10px] font-black uppercase text-slate-400 pl-8 h-12">Priority</TableHead>
          <TableHead className="text-[10px] font-black uppercase text-slate-400 h-12">Directive Description</TableHead>
          <TableHead className="text-[10px] font-black uppercase text-slate-400 h-12">Entity / Dept</TableHead>
          <TableHead className="text-[10px] font-black uppercase text-slate-400 h-12">Deadline</TableHead>
          <TableHead className="text-right text-[10px] font-black uppercase text-slate-400 pr-8 h-12">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} className="hover:bg-white/40 border-white/20 transition-colors group">
            <TableCell className="pl-8 py-6">
              <div className={cn(
                "w-2 h-2 rounded-full mx-auto",
                task.priority === 'High' ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" : 
                task.priority === 'Medium' ? "bg-amber-500" : "bg-slate-300"
              )} />
            </TableCell>
            <TableCell className="py-6 min-w-[300px]">
              <div className="flex flex-col">
                <span className="text-sm font-black text-slate-900 uppercase tracking-tight group-hover:text-amber-800 transition-colors">{task.title}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{task.type}</span>
              </div>
            </TableCell>
            <TableCell className="py-6">
              <div className="flex items-center gap-2 text-slate-600">
                <User className="w-3 h-3" />
                <span className="text-[11px] font-bold uppercase">{task.assignee}</span>
              </div>
            </TableCell>
            <TableCell className="py-6">
               <div className="flex items-center gap-2 text-slate-600">
                <CalendarIcon className="w-3 h-3" />
                <span className="text-[11px] font-bold">{task.deadline}</span>
              </div>
            </TableCell>
            <TableCell className="text-right pr-8 py-6">
              <div className="flex flex-col items-end gap-1">
                <Badge className={cn(
                  "font-black text-[10px] uppercase shadow-sm",
                  task.status === 'Completed' ? "bg-emerald-600" : 
                  task.status === 'In Progress' ? "bg-amber-600" : "bg-slate-400"
                )}>
                  {task.status}
                </Badge>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

