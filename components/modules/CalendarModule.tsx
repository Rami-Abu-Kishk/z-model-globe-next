"use client";

import React from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar as CalendarIcon, MapPin, Users, Clock, Navigation, Flag, Search, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';
import { calendarEvents } from '@/lib/mock-data/calendar.mock';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CalendarModule({ isExpanded }: { isExpanded?: boolean }) {
  if (isExpanded) {
    return (
      <div className="flex flex-col h-full gap-6 pb-8">
        <Tabs defaultValue="Monthly" className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full bg-white/40 border-white/60">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">April 2026</h3>
              <Button variant="outline" size="icon" className="rounded-full bg-white/40 border-white/60">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <TabsList className="bg-white/40 backdrop-blur-xl border border-white/60 p-1 rounded-2xl h-12 shadow-md">
              <TabsTrigger value="Daily" className="px-6 text-[10px] font-black uppercase rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white">Day</TabsTrigger>
              <TabsTrigger value="Weekly" className="px-6 text-[10px] font-black uppercase rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white">Week</TabsTrigger>
              <TabsTrigger value="Monthly" className="px-6 text-[10px] font-black uppercase rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white">Month</TabsTrigger>
              <TabsTrigger value="Yearly" className="px-6 text-[10px] font-black uppercase rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white">Year</TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button variant="outline" className="bg-white/40 border-white/60 rounded-xl font-black text-[10px] uppercase gap-2 h-10">
                <Search className="w-3 h-3" /> Search Events
              </Button>
              <Button className="bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase h-10 px-4">
                + New Event
              </Button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
            {/* Main Timeline View */}
            <div className="lg:col-span-3 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl flex flex-col overflow-hidden">
              <div className="p-4 border-b border-white/40 bg-slate-50/20 flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <CalendarIcon className="w-3 h-3" /> Event Timeline
                </h4>
                <Badge variant="outline" className="text-[8px] border-slate-200">GREGORIAN CALENDAR / HIJRI OVERLAY</Badge>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-8">
                  {['Monthly', 'Weekly', 'Daily', 'Yearly'].map(view => (
                    <TabsContent key={view} value={view} className="m-0 border-none outline-none">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {calendarEvents.filter(e => e.view === view || view === 'Monthly').map((event) => (
                          <div key={event.id} className="relative group bg-white/60 border border-white/80 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer hover:border-amber-200">
                            <div className={cn(
                              "absolute left-0 top-0 bottom-0 w-2 rounded-l-2xl",
                              event.type === 'Meeting' ? "bg-amber-400" : event.type === 'Review' ? "bg-blue-400" : event.type === 'Travel' ? "bg-purple-400" : "bg-emerald-400"
                            )} />

                            <div className="flex justify-between items-start mb-4">
                              <Badge className="bg-slate-900 text-white text-[9px] uppercase tracking-widest">{event.type}</Badge>
                              <span className="text-[10px] font-black text-slate-400 uppercase">{event.date}</span>
                            </div>

                            <h4 className="text-xl font-black text-slate-900 leading-tight mb-4 group-hover:text-amber-800 transition-colors uppercase">
                              {event.title}
                            </h4>

                            <div className="grid grid-cols-2 gap-4 mt-auto">
                              <div className="flex flex-col gap-1">
                                <p className="text-[9px] text-slate-400 font-bold uppercase">Location</p>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                  <MapPin className="w-3.5 h-3.5" /> {event.location}
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-[9px] text-slate-400 font-bold uppercase">Time</p>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                  <Clock className="w-3.5 h-3.5" /> {event.time}
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                              <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                  <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                                    {String.fromCharCode(64 + i)}
                                  </div>
                                ))}
                                <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-600">
                                  +4
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 text-[9px] font-black uppercase gap-2 hover:bg-emerald-50">
                                <UserPlus className="w-3 h-3" /> Invite Participants
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Sidebar Actions / Stats */}
            <div className="flex flex-col gap-6">
              <div className="bg-slate-950 p-6 rounded-2xl shadow-2xl border border-white/10 text-white">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Flag className="w-3 h-3 text-emerald-400" /> Executive Priority
                </h4>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                    <p className="text-xs font-black text-emerald-400 uppercase mb-1">Upcoming Milestone</p>
                    <h5 className="text-sm font-bold uppercase leading-tight mb-2">Q2 Strategic Roadshow</h5>
                    <p className="text-[10px] text-slate-400 font-medium">In 14 Days • 28 Confirmed Stakeholders</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                    <p className="text-xs font-black text-amber-400 uppercase mb-1">Needs Approval</p>
                    <h5 className="text-sm font-bold uppercase leading-tight mb-2">Maritime Summit Invitation</h5>
                    <p className="text-[10px] text-slate-400 font-medium">Expires in 4 Hours</p>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs uppercase h-12 shadow-lg">
                  Sync Regional Calendars
                </Button>
              </div>

              <div className="flex-1 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl p-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Involved Groups</h4>
                <div className="flex flex-wrap gap-2">
                  {['IHC Board', 'G42 AI Team', 'Royal Group Strategy', 'ADIA Legal', 'Audit Comm', 'Tech Council'].map((group, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-900/5 border border-slate-900/10 text-slate-700 rounded-lg text-[10px] font-black uppercase">
                      {group}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full overflow-hidden", isExpanded && "col-span-2")}>
      <SectionHeader
        title="Calendar Operations"
        icon={CalendarIcon}
        subtitle="Daily/Weekly Executive Schedule"
      />

      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <Tabs defaultValue="Daily" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="bg-slate-100/30 p-1 rounded-lg h-auto mb-4 border border-white/40">
            <TabsTrigger value="Daily" className="text-[9px] py-1 px-2 font-bold uppercase">D</TabsTrigger>
            <TabsTrigger value="Weekly" className="text-[9px] py-1 px-2 font-bold uppercase">W</TabsTrigger>
            <TabsTrigger value="Monthly" className="text-[9px] py-1 px-2 font-bold uppercase">M</TabsTrigger>
            <TabsTrigger value="Yearly" className="text-[9px] py-1 px-2 font-bold uppercase">Y</TabsTrigger>
          </TabsList>

          {['Daily', 'Weekly', 'Monthly', 'Yearly'].map(view => (
            <TabsContent key={view} value={view} className="flex-1 overflow-hidden mt-0">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-3">
                  {calendarEvents.filter(e => e.view === view).map((event) => (
                    <div key={event.id} className="relative pl-3 group cursor-pointer">
                      {/* Event Type Indicator Line */}
                      <div className={cn(
                        "absolute left-0 top-0 bottom-0 w-1 rounded-full",
                        event.type === 'Meeting' ? "bg-amber-400" : event.type === 'Review' ? "bg-blue-400" : event.type === 'Travel' ? "bg-purple-400" : "bg-emerald-400"
                      )} />

                      <div className="p-2.5 rounded-r-xl group-hover:bg-white/40 transition-all">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{event.date}</span>
                          <span className="text-[8px] font-bold text-slate-900 bg-slate-100 px-1 rounded uppercase">{event.type}</span>
                        </div>
                        <h4 className="text-[11px] font-bold text-slate-800 leading-tight mb-2 group-hover:text-slate-900">{event.title}</h4>

                        <div className="flex items-center gap-3 text-[9px] text-slate-400 font-medium">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" /> {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-2.5 h-2.5" /> {event.groups.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {calendarEvents.filter(e => e.view === view).length === 0 && (
                    <div className="flex items-center justify-center h-20 italic text-slate-400 text-[10px]">
                      No activities found for this view.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

