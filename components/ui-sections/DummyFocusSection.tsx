import React from 'react';
import { useZModelStore } from '@/lib/store';
import { applyZoom } from '@/lib/constants';
import type { BaseDataPoint, UISection } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

// Dummy data using strict typing
const dummyData: UISection<BaseDataPoint> = {
  id: 'market-intel',
  title: 'Market Intelligence',
  items: [
    {
      id: 'red-sea-01',
      title: 'Red Sea Maritime Conflict',
      description: 'Strategic instability impacting global shipping lanes.',
      target: { lat: 15.3229, lng: 38.9251, zoomLevel: applyZoom(0.8) },
      countries: ['EG', 'SA', 'YE', 'SD', 'ER', 'DJ'] // Egypt, Saudi, Yemen, Sudan, Eritrea, Djibouti
    },
    {
      id: 'uae-01',
      title: 'UAE Emerging Tech Sector',
      description: 'Capital investments surge by 40%.',
      target: { lat: 23.4241, lng: 53.8478, zoomLevel: applyZoom(0.8) },
      countries: ['AE']
    },
    {
      id: 'uk-01',
      title: 'UK Financial Policy Changes',
      description: 'New regulations impact trading bounds.',
      target: { lat: 55.3781, lng: -3.4360, zoomLevel: applyZoom(0.8) },
      countries: ['GB']
    }
  ]
};

export function DummyFocusSection() {
  const setActiveTarget = useZModelStore((s) => s.setActiveTarget);
  const setSelectedCountries = useZModelStore((s) => s.setSelectedCountries);
  const activeTarget = useZModelStore((s) => s.activeTarget);
  const selectedCountries = useZModelStore((s) => s.selectedCountries);

  return (
    <Card className="w-full max-w-sm bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-2xl pointer-events-auto">
      <CardHeader>
        <CardTitle className="text-slate-800 text-lg font-bold">{dummyData.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 pr-4">
          <div className="space-y-4">
            {dummyData.items.map((item) => {
              // Check if any country of this item is selected
              const isActive = activeTarget?.lat === item.target.lat && activeTarget?.lng === item.target.lng;
              
              const handleClick = () => {
                setActiveTarget(item.target);
                if (item.countries) {
                  setSelectedCountries(item.countries);
                }
              };

              return (
                <div 
                  key={item.id}
                  onClick={handleClick}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-slate-800/10 border-slate-800 shadow-sm' 
                      : 'bg-white/50 border-white/40 hover:bg-white/70'
                  }`}
                >
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">{item.title}</h4>
                  <p className="text-slate-600 text-xs">{item.description}</p>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
