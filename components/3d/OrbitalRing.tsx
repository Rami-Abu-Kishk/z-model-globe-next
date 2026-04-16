"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitalModule } from './OrbitalModule';
import { ModuleId, useZModelStore } from '@/lib/store';

import { 
  BarChart3, 
  TrendingUp, 
  ShieldAlert, 
  Newspaper, 
  FileText, 
  Building2, 
  Landmark, 
  Calendar 
} from 'lucide-react';

const ORBITAL_CONFIG: Array<{ id: ModuleId; label: string; icon: any }> = [
  { id: 'economy',     label: 'Economy',     icon: BarChart3 },
  { id: 'investment',  label: 'Investment',  icon: TrendingUp },
  { id: 'political',   label: 'Political',   icon: ShieldAlert },
  { id: 'media',       label: 'Media',       icon: Newspaper },
  { id: 'research',    label: 'Research',    icon: FileText },
  { id: 'groups',      label: 'Groups',      icon: Building2 },
  { id: 'abuDhabiGov', label: 'AD Gov',      icon: Landmark },
  { id: 'calendar',    label: 'Calendar',    icon: Calendar },
];


const ORBIT_RADIUS = 3.6;
const N = ORBITAL_CONFIG.length;

// Store the base angle for each module (fixed offset in the ring)
const BASE_THETAS = ORBITAL_CONFIG.map((_, i) => (i / N) * 2 * Math.PI);

// Refs for each module's <group> node so we can mutate positions imperatively
type ModuleRef = { ref: React.RefObject<THREE.Group | null> };

export function OrbitalRing() {
  const moduleRefs = useRef<ModuleRef[]>(
    ORBITAL_CONFIG.map(() => ({ ref: React.createRef<THREE.Group | null>() }))
  );

  const ringRotationTarget = useZModelStore((s) => s.ringRotationTarget);
  const viewState = useZModelStore((s) => s.viewState);
  const activeModule = useZModelStore((s) => s.activeModule);
  const focusedCardId = useZModelStore((s) => s.focusedCardId);
  const setFocusedCardId = useZModelStore((s) => s.setFocusedCardId);
  const setActiveModule = useZModelStore((s) => s.setActiveModule);
  const setViewState = useZModelStore((s) => s.setViewState);

  const currentRotation = useRef(0);
  // Scale trackers for each module
  const scaleRefs = useRef<number[]>(ORBITAL_CONFIG.map(() => 1));

  useFrame(() => {
    currentRotation.current = THREE.MathUtils.lerp(
      currentRotation.current,
      ringRotationTarget,
      0.06
    );

    const rot = currentRotation.current;

    moduleRefs.current.forEach(({ ref }, i) => {
      if (!ref.current) return;
      const baseTheta = BASE_THETAS[i];

      // Update position
      ref.current.position.x = ORBIT_RADIUS * Math.cos(baseTheta + rot);
      ref.current.position.z = ORBIT_RADIUS * Math.sin(baseTheta + rot);

      // Determine target scale
      const targetScale = viewState === 'ORBITAL' ? 1 : 0;

      // Smoothly lerp scale
      scaleRefs.current[i] = THREE.MathUtils.lerp(scaleRefs.current[i], targetScale, 0.1);
      ref.current.scale.setScalar(scaleRefs.current[i]);
    });
  });

  const handleModuleClick = (id: ModuleId) => {
    setActiveModule(id);
    setFocusedCardId(id);
    setViewState('CARD_FOCUS');
  };

  return (
    <group>
      {ORBITAL_CONFIG.map((config, i) => {
        const baseTheta = BASE_THETAS[i];
        const initX = ORBIT_RADIUS * Math.cos(baseTheta);
        const initZ = ORBIT_RADIUS * Math.sin(baseTheta);

        const isActive = (focusedCardId === config.id || activeModule === config.id);

        return (
          <group
            key={config.id}
            ref={moduleRefs.current[i].ref as React.RefObject<THREE.Group>}
            position={[initX, 0, initZ]}
            onClick={(e) => {
              e.stopPropagation();
              handleModuleClick(config.id);
            }}
          >
            <OrbitalModule
              id={config.id}
              position={[0, 0, 0]}
              width={180} // Pillars are fixed width now internally, but we can pass a value if needed
              label={config.label}
              icon={config.icon}
              isActive={isActive}
            />
          </group>
        );
      })}
    </group>
  );
}

