import { useEffect } from 'react';
import { useZModelStore } from '@/lib/store';

interface GlobeCameraControllerProps {
  globeRef: React.MutableRefObject<any>;
  polygonsData?: any[];
}

export function GlobeCameraController({ globeRef, polygonsData }: GlobeCameraControllerProps) {
  const activeTarget = useZModelStore((s) => s.activeTarget);
  const selectedCountries = useZModelStore((s) => s.selectedCountries);
  const setViewState = useZModelStore((s) => s.setViewState);

  // 1. Handle explicit activeTarget (from module clicks)
  useEffect(() => {
    // Safety check for method existence
    if (!globeRef.current || !activeTarget || typeof globeRef.current.pointOfView !== 'function') return;

    globeRef.current.pointOfView(
      { 
        lat: activeTarget.lat, 
        lng: activeTarget.lng, 
        altitude: activeTarget.zoomLevel 
      }, 
      1000 
    );
  }, [activeTarget, globeRef]);

  // 2. Handle group selection auto-focus (if no explicit activeTarget)
  // This calculates the average center of all selected countries and flies there.
  useEffect(() => {
    if (!globeRef.current || activeTarget || selectedCountries.length <= 1) return;
    if (typeof globeRef.current.pointOfView !== 'function') return;

    // Use passed polygonsData if available, otherwise fallback to ref (with safety)
    const polygons = polygonsData || (typeof globeRef.current.getPolygonsData === 'function' ? globeRef.current.getPolygonsData() : []);
    
    if (!polygons || polygons.length === 0) return;

    const matches = polygons.filter((d: any) => {
        const p = d.properties || {};
        const id = String(d.id || p.ISO_A3 || "");
        const iso = String(p.ISO_A2 || p.iso_a2 || p['ISO3166-1-Alpha-2'] || "").toUpperCase();
        return selectedCountries.includes(iso) || selectedCountries.includes(id);
    });

    if (matches.length > 0) {
        let sumLat = 0, sumLng = 0;
        let validCount = 0;

        matches.forEach((m: any) => {
            if (m.geometry && m.geometry.coordinates && m.geometry.coordinates[0]) {
                const coords = m.geometry.type === 'Polygon' ? m.geometry.coordinates[0][0] : m.geometry.coordinates[0][0][0];
                if (Array.isArray(coords) && coords.length >= 2) {
                    sumLng += coords[0];
                    sumLat += coords[1];
                    validCount++;
                }
            }
        });
        
        if (validCount > 0) {
            const avgLat = sumLat / validCount;
            const avgLng = sumLng / validCount;

            globeRef.current.pointOfView({
                lat: avgLat,
                lng: avgLng,
                altitude: 1.8
            }, 1000);
        }
    }
  }, [selectedCountries, activeTarget, globeRef, polygonsData]);

  return null;
}
