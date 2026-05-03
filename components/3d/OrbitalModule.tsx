import React, { useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useZModelStore, ModuleId } from '@/lib/store';

interface OrbitalModuleProps {
  id: string;
  position: [number, number, number];
  width: number;
  label: string;
  icon: any;
  isActive?: boolean;
}

export function OrbitalModule({ id, position, width, label, icon: Icon, isActive }: OrbitalModuleProps) {
  const billboardRef = useRef<THREE.Group>(null);
  const htmlRef = useRef<HTMLDivElement>(null);
  const worldPos = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (!billboardRef.current) return;

    // Face the camera
    billboardRef.current.lookAt(state.camera.position);
    
    // ── Z-INDEX & FADE LOGIC ──
    if (htmlRef.current) {
      billboardRef.current.getWorldPosition(worldPos.current);
      const trueZ = worldPos.current.z;

      let calculatedOpacity = 1;

      // Logic to fade out when behind the earth (z < 1)
      if (isActive) {
        calculatedOpacity = 1;
      } else if (trueZ < 1) {
        calculatedOpacity = Math.max(0, 1 - Math.abs(trueZ - 1) * 0.8);
      }

      htmlRef.current.style.opacity = calculatedOpacity.toString();
      htmlRef.current.style.pointerEvents = calculatedOpacity > 0.3 ? 'all' : 'none';
    }
  });

  return (
    <group position={position} ref={billboardRef}>
      <Html
        transform
        center
        distanceFactor={1.5}
        zIndexRange={[100, 0]}
        style={{
          width: 'max-content',
          height: 'auto',
          willChange: 'transform, opacity',
        }}
      >
        <div
          ref={htmlRef}
          className={`
            relative flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-500
            bg-white/30 backdrop-blur-2xl border border-white/60 shadow-xl
            cursor-pointer group select-none
            ${isActive 
              ? 'bg-white/80 border-white ring-2 ring-sky-400/20' 
              : 'hover:bg-white/50 hover:scale-105 hover:shadow-2xl'
            }
          `}
          style={{ pointerEvents: 'all' }}
        >
          <div className={`
            p-1.5 rounded-full transition-colors duration-300
            ${isActive ? 'bg-sky-500/10' : 'bg-slate-200/50 group-hover:bg-sky-500/10'}
          `}>
            <Icon className={`w-5 h-5 ${isActive ? 'text-sky-600' : 'text-slate-500 group-hover:text-sky-600'}`} />
          </div>
          
          <span className={`
            text-[14px] md:text-[16px] font-black uppercase tracking-widest transition-colors duration-300
            ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-800'}
          `}>
            {label}
          </span>

          {isActive && (
            <motion.div
              layoutId="3d-pill-active"
              className="absolute inset-0 bg-sky-500/5 rounded-full -z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            />
          )}

          {/* Glow effect for hover */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(56,189,248,0.2)] -z-10" />
        </div>
      </Html>
    </group>
  );
}