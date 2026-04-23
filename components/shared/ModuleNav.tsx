"use client";

import React from "react";
import { useZModelStore, ModuleId } from "@/lib/store";
import {
  BarChart3,
  TrendingUp,
  ShieldAlert,
  Newspaper,
  FileText,
  Building2,
  Landmark,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { GlobeControls } from "./GlobeControls";

// z model landing page link
const LANDING_PAGE_URL = process.env.NEXT_PUBLIC_LANDING_PAGE_URL || "http://localhost:5173";

const NAV_ITEMS: { id: ModuleId; label: string; icon: any }[] = [
  { id: "economy", label: "Economy", icon: BarChart3 },
  { id: "investment", label: "Investment", icon: TrendingUp },
  { id: "political", label: "Political", icon: ShieldAlert },
  { id: "media", label: "Media", icon: Newspaper },
  { id: "research", label: "Research", icon: FileText },
  { id: "companies", label: "Groups", icon: Building2 },
  { id: "abudhabi", label: "Abu Dhabi Gov", icon: Landmark },
  { id: "calendar", label: "Calendar", icon: Calendar },
];

export function ModuleNav() {
  const activeModule = useZModelStore((s) => s.activeModule);
  const setActiveModule = useZModelStore((s) => s.setActiveModule);
  const setFocusedCardId = useZModelStore((s) => s.setFocusedCardId);
  const setViewState = useZModelStore((s) => s.setViewState);

  return (
    <motion.div
      initial={{ x: -100, opacity: 0, filter: "blur(10px)" }}
      animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ type: "spring", damping: 30, stiffness: 100, delay: 1.4 }}
      className="absolute left-8 top-1/2 -translate-y-1/2 z-50 pointer-events-auto"
    >
      <div className="flex flex-col gap-3">
        <button
          className={`
            group relative flex items-center justify-center
            w-14 h-14 rounded-2xl
            bg-white/40 backdrop-blur-2xl 
            border border-white/60
            shadow-[0_8px_32px_rgba(0,0,0,0.1)]
            transition-all duration-300
            hover:bg-white/60 hover:scale-105 active:scale-95 cursor-pointer
            m-3
          `}
        >
          <div className="relative">
            <motion.div>
              <h1 className="hover:bg-white/60 hover:scale-105 active:scale-95 cursor-pointer">
                Ar
              </h1>
            </motion.div>
          </div>

          {/* Tooltip */}
          <div className="absolute left-20 px-3 py-1 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 -translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl border border-white/10 flex items-center gap-2">
            Switch Language Ar/En
          </div>
        </button>
      </div>

      <div className="flex flex-col items-center gap-2 p-1.5 bg-white/20 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
        {NAV_ITEMS.map((item, index) => {
          const isActive = activeModule === item.id;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.6 + index * 0.08, ease: "easeOut" }}
              onClick={() => {
                const redirectItems: ModuleId[] = [
                  "research",
                  "companies",
                  "abudhabi",
                  "calendar",
                ];

                if (redirectItems.includes(item.id)) {
                  window.open(`${LANDING_PAGE_URL}/${item.id}`, "_blank");
                  return;
                }

                const newId = isActive ? null : item.id;
                setActiveModule(newId);
                setFocusedCardId(newId);
                setViewState(newId ? "CARD_FOCUS" : "ORBITAL");
              }}
              className={`
                cursor-pointer group relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300
                ${isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-700 hover:bg-white/20"}
              `}
            >
              <Icon
                className={`w-5 h-5 mb-1 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-sky-600" : "text-slate-400"}`}
              />
              <span className="text-[9px] font-black uppercase tracking-tighter text-center px-1">
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="active-pill-vertical"
                  className="absolute inset-0 bg-white/60 -z-10 rounded-2xl shadow-sm border border-white/80"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Tooltip hint on hover */}
              <div className="absolute left-20 px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap">
                {item.label}
              </div>
            </motion.button>
          );
        })}
      </div>
      <div className="w-full flex justify-center mt-5">
        <GlobeControls />
      </div>
    </motion.div>
  );
}
