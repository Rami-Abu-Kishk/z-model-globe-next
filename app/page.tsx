"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { HologramEarth } from '@/components/3d/HologramEarth';
import { CameraController } from '@/components/3d/CameraController';
import { useZModelStore } from '@/lib/store';

import { ReturnHUD } from '@/components/shared/ReturnHUD';
import { ExpandedDataPanel } from '@/components/shared/ExpandedDataPanel';
import { SearchBar } from '@/components/shared/SearchBar';
import { DetailDrawer } from '@/components/shared/DetailDrawer';
import { ModuleNav } from '@/components/shared/ModuleNav';
import { GlobeControls } from '@/components/shared/GlobeControls';
import { DummyFocusSection } from '@/components/ui-sections/DummyFocusSection';

function CanvasLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#cbd5e1" wireframe />
    </mesh>
  );
}

// Removed ArrowControls function


import { AIChatBot } from '@/components/chat/AIChatBot';

export default function Home() {
  return (
    <main className="fixed inset-0 w-screen h-screen bg-[#faf9f6] overflow-hidden">
      
      {/* ── LAYER 1 (z-0): React-Globe.gl wrapper ── */}
      <div className="absolute inset-0 z-0">
        <HologramEarth />
      </div>

      {/* ── LAYER 2 (z-10): R3F Canvas ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas
          // CRITICAL: Force the actual WebGL canvas element to ignore mouse clicks
          style={{ pointerEvents: 'none' }} 
          camera={{ position: [0, 7, 11], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={<CanvasLoader />}>
            <ambientLight intensity={2.0} />
            <pointLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
            <pointLight position={[-10, -5, -10]} intensity={1} color="#c7ddf9" />
            <spotLight position={[0, 15, 8]} angle={0.3} penumbra={1} intensity={3} castShadow={false} />
            
            {/* Removed OrbitalRing */}

            <CameraController />
          </Suspense>
        </Canvas>
      </div>

      {/* ── LAYER 3: Interactive Overlays ── */}
      <ModuleNav />

      <SearchBar />
      <ReturnHUD />

      {/* ── LAYER 4: Non-Interactive Info Overlays (z-30) ── */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <DetailDrawer />
        <ExpandedDataPanel />

        <div 
          className="absolute top-8 left-8 pointer-events-auto select-none cursor-pointer"
          onClick={() => useZModelStore.getState().resetView()}
        >
          <h1 className="text-3xl tracking-tight bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 font-black uppercase leading-none">
            Z-MODEL
          </h1>
          <p className="text-[10px] text-slate-500 tracking-[0.2em] font-semibold mt-1 uppercase">
            Executive Strategic Dashboard
          </p>
        </div>

        <div className="absolute top-8 right-8 pointer-events-none select-none flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
            V3.0 · Spatial Interface · Live
          </span>
        </div>
      </div>

      {/* ── AI ChatBot ── */}
      <div className="fixed inset-0 z-[10000] pointer-events-none">
        <div className="absolute inset-0 pointer-events-none">
           <AIChatBot />
        </div>
      </div>
    </main>
  );
}