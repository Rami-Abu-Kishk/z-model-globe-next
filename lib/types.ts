export interface GlobeTarget {
  lat: number;
  lng: number;
  zoomLevel: number; // Altitude for react-globe.gl's pointOfView
}

export interface BaseDataPoint {
  id: string;
  title: string;
  description?: string;
  target: GlobeTarget;
  countries?: string[]; // Array of country IDs (ISO_A2 or similar) to highlight
}

export interface UISection<T extends BaseDataPoint> {
  id: string;
  title: string;
  items: T[];
  defaultTarget?: GlobeTarget;
}

export interface GlobePoint {
  lat: number;
  lng: number;
  size: number;
  color: string;
  label: string;
  isBestTarget?: boolean; // Optional property for special styling
}
