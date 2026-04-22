"use client";

import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useZModelStore } from '@/lib/store';
import { GlobeCameraController } from './GlobeCameraController';
import { economyGlobeData, investmentGlobePoints, politicalCrisisRings, mediaNewsItems, groupsArcs, searchableCountries, politicalArcs } from '@/lib/mockData';
import {
  breakingNews as mediaBreaking,
  trendingNews as mediaTrending,
  localRegionalNews as mediaRegional
} from '@/lib/mock-data/media.mock';


const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

// Suppress THREE.Clock deprecation warning often triggered by dependencies like react-globe.gl
if (typeof console !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Clock: This module has been deprecated')) {
      return;
    }
    originalWarn(...args);
  };
}

// Using a more metadata-rich GeoJSON source (Natural Earth 110m)
// const GEOJSON_URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson';
const GEOJSON_URL = '/worldmap110.geojson';

const globeMaterial = new THREE.MeshStandardMaterial({
  color: '#f0f9ff', // Very light Sky Blue 50
  roughness: 0.1,
  metalness: 0.1
});
const ORBITAL_ALTITUDE = 3.5;
const FOCUS_ALTITUDE = 2.8;

export const HologramEarth = forwardRef((props, ref) => {
  const globeRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  const [countriesGeoJson, setCountriesGeoJson] = useState<any[]>([]);
  const isFirstMount = useRef(true);


  const selectedCountry = useZModelStore(s => s.selectedCountry);
  const setSelectedCountry = useZModelStore(s => s.setSelectedCountry);
  const selectedCountries = useZModelStore(s => s.selectedCountries);
  const setSelectedCountries = useZModelStore(s => s.setSelectedCountries);
  const hoveredCountry = useZModelStore(s => s.hoveredCountry);
  const setHoveredCountry = useZModelStore(s => s.setHoveredCountry);
  const viewState = useZModelStore(s => s.viewState);
  const setViewState = useZModelStore(s => s.setViewState);
  const activeTarget = useZModelStore(s => s.activeTarget);
  const setActiveTarget = useZModelStore(s => s.setActiveTarget);
  const activeModule = useZModelStore(s => s.activeModule);
  const searchQuery = useZModelStore(s => s.searchQuery);
  const setSearchQuery = useZModelStore(s => s.setSearchQuery);
  const setActiveCountry = useZModelStore(s => s.setActiveCountry);
  const mediaCategoryFilter = useZModelStore(s => s.mediaCategoryFilter);
  const mediaActiveNewsId = useZModelStore(s => s.mediaActiveNewsId);
  const autoRotate = useZModelStore(s => s.autoRotate);
  const isEarthFocus = viewState === 'EARTH_FOCUS';
  const isCardFocus = viewState === 'CARD_FOCUS';
  const [isFocused, setIsFocused] = useState(false);
  const [hoveredArc, setHoveredArc] = useState<any>(null);

  const handleSelect = (country: typeof searchableCountries[0]) => {
    setSearchQuery('');
    setIsFocused(false);

    // Set globe behavior
    setActiveTarget({ lat: country.lat, lng: country.lng, zoomLevel: 1.5 });
    setSelectedCountry(country.iso);
    setSelectedCountries([]); // Clear any multi-country group highlights

    // Set UI behavior
    setActiveCountry(country.name);
    if (!activeModule) {
      setViewState('EARTH_FOCUS');
    }
  };



  useEffect(() => {
    setMounted(true);
    fetch(GEOJSON_URL)
      .then(res => res.json())
      .then(data => setCountriesGeoJson(data.features))
      .catch(err => console.error("Failed to load map data:", err));
  }, []);

  useEffect(() => {
    if (selectedCountries.length > 0) {
      console.log("📍 [HologramEarth] Selected Countries:", selectedCountries);
    }

  }, [selectedCountries]);

  // Helper to sync Three.js controls
  // const syncControls = () => {
  //   const controls = globeRef.current?.controls();
  //   if (!controls) return false;
  //   Object.assign(controls, {
  //     autoRotate: !isEarthFocus && !activeTarget,
  //     autoRotateSpeed: 0.5,
  //     enableZoom: isEarthFocus || !!activeTarget,
  //     enablePan: isEarthFocus || !!activeTarget,
  //     enableRotate: isEarthFocus || !!activeTarget
  //   });
  //   return true;
  // };

  const syncControls = () => {
    const controls = globeRef.current?.controls();
    if (!controls) return false;
    Object.assign(controls, {
      autoRotate: autoRotate && !isEarthFocus && !activeTarget && selectedCountries.length === 0,
      autoRotateSpeed: 0.5,
      enableZoom: true,
      enablePan: true,
      enableRotate: true
    });
    return true;
  };

  useEffect(() => {
    if (!mounted || !globeRef.current) return;

    const targetAlt = isEarthFocus ? FOCUS_ALTITUDE : ORBITAL_ALTITUDE;

    // Camera Position (only if no activeTarget)
    if (!activeTarget) {
      const duration = (isFirstMount.current && !isEarthFocus) ? 0 : 1000;

      // Robust Initialization: We force the altitude multiple times during startup
      // to ensure OrbitControls doesn't reset it to a default value.
      if (isFirstMount.current) {
        let count = 0;
        const initInterval = setInterval(() => {
          if (globeRef.current) {
            const currentPov = globeRef.current.pointOfView();
            globeRef.current.pointOfView({ ...currentPov, altitude: targetAlt }, 0);
          }
          count++;
          if (count > 10) clearInterval(initInterval);
        }, 100);
      } else {
        if (globeRef.current) {
          const currentPov = globeRef.current.pointOfView();
          globeRef.current.pointOfView({ ...currentPov, altitude: targetAlt }, duration);
        }
      }
    }
    isFirstMount.current = false;

    // Controls Sync with retry
    if (!syncControls()) {
      const interval = setInterval(() => syncControls() && clearInterval(interval), 100);
      return () => clearInterval(interval);
    }
  }, [viewState, mounted, ORBITAL_ALTITUDE, FOCUS_ALTITUDE, activeTarget, selectedCountries, autoRotate]);

  useImperativeHandle(ref, () => ({
    flyTo: (lat: number, lng: number, altitude = FOCUS_ALTITUDE) =>
      globeRef.current?.pointOfView({ lat, lng, altitude }, 1000)
  }));

  // Memoize layer data to prevent WebGL stutters during typing in search
  const hasAnySelection = !!(selectedCountry || selectedCountries.length > 0);

  const pointsData = useMemo(() => {
    const isInvestment = activeModule === 'investment';
    return (isInvestment && !hasAnySelection) ? investmentGlobePoints : [];
  }, [activeModule, hasAnySelection]);

  const ringsData = useMemo(() => (activeModule === 'political' && !hasAnySelection) ? politicalCrisisRings : [], [activeModule, hasAnySelection]);

  const labelsData = useMemo(() => [], []);

  const arcsData = useMemo(() => {
    if (hasAnySelection) return []; // Hide clutter when focusing on a country

    if (activeModule === 'companies') return groupsArcs;
    if (activeModule === 'political') return politicalArcs;

    if (activeModule === 'media') {
      // Generate "Intelligence Flow" arcs from news sources to Abu Dhabi
      const AD_LAT = 24.4539;
      const AD_LNG = 54.3773;

      let newsItems = [...mediaBreaking, ...mediaTrending, ...mediaRegional];

      // Layer 1: Filter by specific active news ID (highest priority)
      if (mediaActiveNewsId) {
        newsItems = newsItems.filter(n => n.id === mediaActiveNewsId);
      }
      // Layer 2: Filter by category section (Breaking/Trending/Regional)
      else if (mediaCategoryFilter !== 'all') {
        newsItems = newsItems.filter(n => n.category === mediaCategoryFilter);
      }

      return newsItems
        .filter(n => n.target)
        .map(news => ({
          id: news.id,
          startLat: news.target!.lat,
          startLng: news.target!.lng,
          endLat: AD_LAT,
          endLng: AD_LNG,
          // Gradient from News Location to AD
          color: news.sentiment === 'positive' ? ['#10b981', '#3b82f6'] : ['#f43f5e', '#3b82f6'],
          name: news.headline,
          sentiment: news.sentiment
        }));
    }

    return [];
  }, [activeModule, mediaCategoryFilter, mediaActiveNewsId, hasAnySelection]);

  const selectionLabelData = useMemo(() => {
    if (!selectedCountry) return [];
    const country = searchableCountries.find(c => c.iso === selectedCountry);
    if (!country) return [];

    return [{
      lat: country.lat,
      lng: country.lng,
      label: country.name,
      iso: country.iso,
      type: 'selection'
    }];
  }, [selectedCountry]);

  // Combine intelligence points and the active selection label
  const combinedHtmlData = useMemo(() => [...pointsData, ...selectionLabelData], [pointsData, selectionLabelData]);

  // Handle Abu Dhabi Gov camera lock
  useEffect(() => {
    if (activeModule === 'abudhabi') {
      setActiveTarget({ lat: 24.4539, lng: 54.3773, zoomLevel: 0.8 });

      // 2. Trigger the visual selection highlight
      setSelectedCountry('AE'); // Assuming 'AE' is the key your GeoJSON uses
      setActiveCountry('United Arab Emirates');

      // 3. Optional: If you want the UI to behave like a country click
      //setViewState('EARTH_FOCUS');
    }
  }, [activeModule, setActiveTarget]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={false}
      animate={{ x: isCardFocus ? '-25%' : '0%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-0 h-full w-full flex items-center justify-center overflow-hidden"
    >
      <Globe
        ref={globeRef}
        onGlobeReady={() => {
          syncControls();
          if (globeRef.current && !isEarthFocus && !activeTarget) {
            const currentPov = globeRef.current.pointOfView();
            globeRef.current.pointOfView({ ...currentPov, altitude: ORBITAL_ALTITUDE }, 0);
          }
        }}
        backgroundColor="rgba(0,0,0,0)"
        rendererConfig={{ antialias: true, alpha: true }}
        showAtmosphere={!hasAnySelection}
        atmosphereColor="#3b82f6"
        atmosphereAltitude={0.15}
        globeMaterial={globeMaterial}
        polygonsData={countriesGeoJson}
        pointsData={pointsData}
        ringsData={ringsData}
        labelsData={labelsData}
        arcsData={arcsData}

        pointAltitude={(d: any) => (d.size || 1) * 0.1}
        pointColor="color"
        pointRadius={0.5}

        htmlElementsData={combinedHtmlData}
        htmlAltitude={(d: any) => d.type === 'selection' ? 0.15 : (d.size || 1) * 0.1 + 0.02}
        htmlElement={(d: any) => {
          const el = document.createElement('div');

          if (d.type === 'selection') {
            // Minimalist "Selected" Label with Flag
            const flagCode = (d.iso || '').toLowerCase();
            el.innerHTML = `
              <div style="
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 1);
                border-radius: 40px;
                padding: 6px 14px 6px 10px;
                color: #0f172a;
                font-family: sans-serif;
                font-size: 11px;
                font-weight: 900;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                white-space: nowrap;
                transform: translate(-50%, -50%);
                box-shadow: 0 12px 35px rgba(0,0,0,0.12);
                pointer-events: none;
                display: flex;
                align-items: center;
                gap: 8px;
              ">
                <img src="https://flagcdn.com/w40/${flagCode}.png" style="width: 18px; height: 12px; border-radius: 2px; object-fit: cover; box-shadow: 0 1px 3px rgba(0,0,0,0.1);" />
                ${d.label}
              </div>
            `;
          } else {
            // Sleek, glassmorphic data label
            el.innerHTML = `
              <div style="
                background: rgba(15, 23, 42, 0.85);
                backdrop-filter: blur(8px);
                border: 1px solid ${d.color || '#10b981'};
                border-radius: 6px;
                padding: 4px 8px;
                color: white;
                font-family: sans-serif;
                font-size: 10px;
                font-weight: bold;
                white-space: nowrap;
                transform: translate(-50%, -100%);
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 6px;
                pointer-events: none;
              ">
                <span style="display:block; width:6px; height:6px; border-radius:50%; background:${d.color || '#10b981'};"></span>
                ${d.label || 'Data Point'}
                <span style="color: ${d.color || '#10b981'}; margin-left: 4px;">${d.size * 10}%</span>
              </div>
            `;
          }
          return el;
        }}

        ringColor="color"
        ringMaxRadius="maxR"
        ringPropagationSpeed={2}
        ringRepeatPeriod={800}

        labelLat="lat"
        labelLng="lng"
        labelText="text"
        labelColor="color"
        labelSize="size"
        labelDotRadius={0.4}
        labelAltitude={0.01}
        labelResolution={2}

        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor={(d: any) => {
          const isHovered = hoveredArc && hoveredArc.id === d.id;
          const opacity = hoveredArc ? (isHovered ? 1.0 : 0.15) : 0.6;

          const colors: string[] = Array.isArray(d.color) ? d.color : [d.color, d.color];
          // Modify alpha for each color in the gradient
          return colors.map((c: string) => {
            // Convert hex to rgba with our calculated opacity
            return c === '#10b981' ? `rgba(16, 185, 129, ${opacity})` :
              c === '#3b82f6' ? `rgba(59, 130, 246, ${opacity})` :
                c === '#f43f5e' ? `rgba(244, 63, 94, ${opacity})` :
                  `rgba(255, 255, 255, ${opacity})`;
          });
        }}
        arcDashLength={0.4}
        arcDashGap={1}
        arcDashInitialGap={() => Math.random() * 5}
        arcDashAnimateTime={1200} // Fast, signal-like speed
        arcAltitude={activeModule === 'media' ? 0.35 : 0.25}
        arcStroke={activeModule === 'media' ? 0.6 : 0.4}
        arcLabel={(d: any) => `
          <div style="
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            padding: 8px 12px;
            border-radius: 8px;
            color: white;
            font-size: 11px;
            font-weight: 800;
            white-space: nowrap;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          ">
            ${d.sentiment === 'positive' ? '🟢' : '🔴'} ${d.name}
          </div>
        `}
        onArcHover={(d: any) => {
          setHoveredArc(d);
          document.body.style.cursor = d ? 'pointer' : 'auto';
        }}

        polygonAltitude={(d: any) => {
          const p = d.properties || {};
          const getValid = (...vals: (string | null | undefined)[]) => vals.find(v => v && v !== "-99" && v !== "" && v !== "undefined");

          const id = getValid(d.id, p.ISO_A3_EH, p.ADM0_ISO, p.ISO_A3, p.iso_a3, p.BRK_A3) || "";
          const name = String(p.NAME || p.name || p.ADMIN || "").toUpperCase();
          const iso = getValid(p.ISO_A2_EH, p.ISO_A2, p.iso_a2, p.POSTAL, p['ISO3166-1-Alpha-2']) || "";
          const isSelected = (selectedCountry && (
            (id && id.toUpperCase() === selectedCountry.toUpperCase()) ||
            (name && name === selectedCountry.toUpperCase()) ||
            (iso && iso.toUpperCase() === selectedCountry.toUpperCase())
          )) || selectedCountries.some(c => {
            if (!c) return false;
            const term = c.toUpperCase();
            return (id && id.toUpperCase() === term) || (name && name === term) || (iso && iso.toUpperCase() === term);
          });

          if (isSelected) return 0.12;

          if (hoveredCountry) {
            const hTerm = hoveredCountry.toUpperCase();
            if ((id && id === hTerm) || (name && name === hTerm) || (iso && iso === hTerm)) {
              return 0.05;
            }
          }

          if (hasAnySelection) return 0;
          return 0.01;
        }}
        polygonsTransitionDuration={300}
        polygonCapColor={(d: any) => {
          const p = d.properties || {};
          const getValid = (...vals: (string | null | undefined)[]) => vals.find(v => v && v !== "-99" && v !== "" && v !== "undefined");

          const id = getValid(d.id, p.ISO_A3_EH, p.ADM0_ISO, p.ISO_A3, p.iso_a3, p.BRK_A3) || "";
          const name = String(p.NAME || p.name || p.ADMIN || "").toUpperCase();
          const iso = getValid(p.ISO_A2_EH, p.ISO_A2, p.iso_a2, p.POSTAL, p['ISO3166-1-Alpha-2']) || "";

          const isSelected = (selectedCountry && (
            (id && id.toUpperCase() === selectedCountry.toUpperCase()) ||
            (name && name === selectedCountry.toUpperCase()) ||
            (iso && iso.toUpperCase() === selectedCountry.toUpperCase())
          )) || selectedCountries.some(c => {
            if (!c) return false;
            const term = c.toUpperCase();
            return (id && id.toUpperCase() === term) || (name && name === term) || (iso && iso.toUpperCase() === term);
          });

          if (isSelected) return 'rgba(34, 211, 238, 0.85)'; // Electric Cyan

          if (hoveredCountry) {
            const hTerm = hoveredCountry.toUpperCase();
            if ((id && id === hTerm) || (name && name === hTerm) || (iso && iso === hTerm)) {
              return 'rgba(51, 65, 85, 0.5)'; // Slate 700 hover
            }
          }

          // if (activeModule === 'economy' && economyGlobeData[iso]) {
          //   const info = economyGlobeData[iso];
          //   if (info.status === 'positive') return 'rgba(16, 185, 129, 0.4)'; // Emerald 500 at 40%
          //   return 'rgba(239, 68, 68, 0.4)'; // Rose 500 at 40%
          // }

          if (hasAnySelection) return 'rgba(51, 65, 85, 0.04)'; // Extremely pale ghost when something else is selected
          return 'rgba(51, 65, 85, 0.25)'; // Softer Slate/Navy countries
        }}
        polygonSideColor={() => hasAnySelection ? 'rgba(34, 211, 238, 0)' : 'rgba(34, 211, 238, 0.2)'}
        polygonStrokeColor={() => hasAnySelection ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.6)'}
        polygonLabel={(d: any) => {
          const p = d.properties;
          const iso = (p.ISO_A2 || p.iso_a2 || p['ISO3166-1-Alpha-2'] || '').toUpperCase();

          let name = p.NAME || p.name || p.ADMIN || 'Unknown';
          let flagCode = iso.toLowerCase();
          let displayIso = iso;

          // Sovereign Override
          if (iso === 'IL') {
            name = 'Occupied Palestinian Territories';
            flagCode = 'ps';
            displayIso = 'PS';
          }

          // --- ECONOMY INTELLIGENCE OVERLAY ---
          const ecoData = economyGlobeData[iso];
          const countryMeta = searchableCountries.find(c => c.iso === iso);
          const activeTrend = useZModelStore.getState().activeEconomyTrend;
          let intelligenceHtml = '';

          // Trend-specific impact (Priority 1)
          if (activeModule === 'economy' && activeTrend && activeTrend.relatedCountries?.includes(iso)) {
            const trendValue = activeTrend.countryValues?.[iso] || activeTrend.value;
            const isPos = trendValue >= 0;
            intelligenceHtml = `
              <div class="mt-3 pt-3 border-t border-slate-200/50 flex items-center justify-between gap-6">
                <div class="flex flex-col">
                  <span class="text-[8px] text-slate-600 uppercase font-black tracking-[0.15em] mb-0.5">${activeTrend.label}</span>
                  <div class="flex items-center gap-1.5">
                    <span class="text-sm font-black ${isPos ? 'text-emerald-600' : 'text-rose-600'}">
                      ${isPos ? '↑' : '↓'} ${trendValue > 0 ? '+' : ''}${trendValue}%
                    </span>
                  </div>
                </div>
                <div class="flex flex-col items-end">
                   <span class="text-[8px] text-slate-400 uppercase font-black tracking-[0.15em] mb-0.5">Focus</span>
                   <div class="px-2 py-0.5 rounded-lg text-[8px] font-black uppercase ${isPos ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}">
                    ${isPos ? 'Advancing' : 'Under Pressure'}
                  </div>
                </div>
              </div>
            `;
          }
          // Standard GDP data (Priority 2)
          else if (activeModule === 'economy' && ecoData) {
            const isPos = ecoData.status === 'positive';
            intelligenceHtml = `
              <div class="mt-3 pt-3 border-t border-slate-200/50 flex items-center justify-between gap-6">
                <div class="flex flex-col">
                  <span class="text-[8px] text-slate-600 uppercase font-black tracking-[0.15em] mb-0.5">Real GDP Growth</span>
                  <div class="flex items-center gap-1.5">
                    <span class="text-sm font-black ${isPos ? 'text-emerald-600' : 'text-rose-600'}">
                      ${isPos ? '↑' : '↓'} ${ecoData.growth > 0 ? '+' : ''}${ecoData.growth}%
                    </span>
                  </div>
                </div>
                <div class="flex flex-col items-end">
                   <span class="text-[8px] text-slate-400 uppercase font-black tracking-[0.15em] mb-0.5">Status</span>
                   <div class="px-2 py-0.5 rounded-lg text-[8px] font-black uppercase ${isPos ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}">
                    ${countryMeta?.economyStatus || (isPos ? 'Expansion' : 'Contraction')}
                  </div>
                </div>
              </div>
            `;
          }

          return `
          <div class="px-4 py-3.5 bg-white/90 backdrop-blur-2xl border border-white/80 rounded-2xl text-slate-800 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col min-w-[200px]">
            <div class="flex items-center gap-3">
              <div class="w-9 h-6 overflow-hidden rounded-lg border border-slate-100 bg-white flex-shrink-0 flex items-center justify-center shadow-sm">
                <img src="https://flagcdn.com/w40/${flagCode}.png" class="w-full h-full object-cover" />
              </div>
              <div class="flex flex-col">
                <span class="font-black text-[14px] leading-tight tracking-tight uppercase text-slate-900">${name}</span>
                <span class="text-[9px] text-slate-400 font-mono tracking-widest uppercase font-bold">${displayIso}</span>
              </div>
            </div>
            ${intelligenceHtml}
          </div>`;
        }}
        onPolygonHover={(d: any) => {
          const p = d?.properties || {};
          const getValid = (...vals: (string | null | undefined)[]) => vals.find(v => v && v !== "-99" && v !== "" && v !== "undefined");
          const identifier = d ? (getValid(p.ISO_A2_EH, p.ISO_A2, p['ISO3166-1-Alpha-2'], p.NAME, p.ADMIN, d.id)) : null;
          setHoveredCountry(identifier || null);
          document.body.style.cursor = d ? 'pointer' : 'auto';
        }}
        onPolygonClick={(d: any, _e: any, { lat, lng }: any) => {
          const p = d.properties || {};
          const getValid = (...vals: (string | null | undefined)[]) => vals.find(v => v && v !== "-99" && v !== "" && v !== "undefined");

          // 1. Get a reliable ISO code
          const iso = getValid(p.ISO_A2_EH, p.ISO_A2, p.iso_a2, p.POSTAL, p.ADM0_ISO, p['ISO3166-1-Alpha-2']) || "";

          // 2. Find the rich data object from your mockData list
          const countryData = searchableCountries.find(c => c.iso.toUpperCase() === iso.toUpperCase());

          if (countryData) {
            handleSelect(countryData);
          } else {
            // Fallback logic if the country isn't in your searchable list
            setSelectedCountry(iso);
            setActiveTarget({ lat, lng, zoomLevel: FOCUS_ALTITUDE });
            if (!activeModule) {
              setViewState('EARTH_FOCUS');
            }
          }
        }}
      />
      <GlobeCameraController globeRef={globeRef} polygonsData={countriesGeoJson} />
    </motion.div>
  );
});

HologramEarth.displayName = 'HologramEarth';