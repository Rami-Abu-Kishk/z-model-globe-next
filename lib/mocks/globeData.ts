/**
 * High-fidelity mock data for the Z-Model 3D Strategic Globe.
 * Contains coordinates, trends, and metadata for dynamic layering.
 */

export const AD_COORDS = { lat: 24.4539, lng: 54.3773 };

// --- 1. Political: Arcs & Crises ---
export const politicalArcs = [
  { startLat: 24.4539, startLng: 54.3773, endLat: 38.8951, endLng: -77.0364, name: 'UAE-USA Strategic Corridor', color: '#60a5fa', countries: ['AE', 'US'] },
  { startLat: 24.4539, startLng: 54.3773, endLat: 39.9042, endLng: 116.4074, name: 'UAE-China Energy Pipeline', color: '#fbbf24', countries: ['AE', 'CN'] },
  { startLat: 24.4539, startLng: 54.3773, endLat: 51.5074, endLng: -0.1278, name: 'UAE-UK Tech Bridge', color: '#60a5fa', countries: ['AE', 'GB'] },
  { startLat: 48.8566, startLng: 2.3522, endLat: 24.4539, endLng: 54.3773, name: 'France-UAE Defense Alliance', color: '#f87171', countries: ['FR', 'AE'] },
];

export const crisisRings = [
  { lat: 34.5553, lng: 69.1774, name: 'Kabul Transition Zone', color: '#ef4444', maxR: 5, propagationSpeed: 2, countries: ['AF'] },
  { lat: 15.3229, lng: 38.9251, name: 'Red Sea Maritime Corridor', color: '#ef4444', maxR: 8, propagationSpeed: 1.5, countries: ['EG', 'SA', 'YE', 'SD', 'ER', 'DJ'] }, // Focus Egypt/Saudi/Yemen/etc
];

// --- 2. Investment: Opportunities ---
export const investmentRings = [
  { lat: 24.4539, lng: 54.3773, name: 'Global HQ - Abu Dhabi', color: '#10b981', maxR: 12, propagationSpeed: 1, countries: ['AE'] },
  { lat: 1.3521, lng: 103.8198, name: 'Southeast Asia Hub', color: '#10b981', maxR: 8, propagationSpeed: 1.2, countries: ['SG'] },
  { lat: 40.7128, lng: -74.0060, name: 'North America Growth', color: '#10b981', maxR: 6, propagationSpeed: 0.8, countries: ['US'] },
];

// --- 3. Economy: Regional Choropleth Map ---
// Maps ISO_A2 codes to growth trends
export const economicTrends: Record<string, { growth: number, status: 'positive' | 'negative' }> = {
  'AE': { growth: 4.2, status: 'positive' },
  'US': { growth: 2.1, status: 'positive' },
  'CN': { growth: 4.8, status: 'positive' },
  'GB': { growth: -0.2, status: 'negative' },
  'DE': { growth: -0.5, status: 'negative' },
  'FR': { growth: 0.4, status: 'positive' },
  'IN': { growth: 6.7, status: 'positive' },
  'SA': { growth: 3.1, status: 'positive' },
  'RU': { growth: -1.5, status: 'negative' },
  'BR': { growth: 1.2, status: 'positive' },
  'JP': { growth: 0.8, status: 'positive' },
  'AU': { growth: 1.9, status: 'positive' },
};

// --- 4. Groups: 3D Asset Bars (Abu Dhabi Cluster) ---
export const groupBars = [
  { lat: 24.4539 + 0.05, lng: 54.3773 + 0.05, label: 'IHC', value: 0.9, color: '#fbbf24' },
  { lat: 24.4539 - 0.05, lng: 54.3773 + 0.03, label: 'ADIA', value: 0.8, color: '#3b82f6' },
  { lat: 24.4539 + 0.02, lng: 54.3773 - 0.06, label: 'G42', value: 0.7, color: '#10b981' },
  { lat: 24.4539 - 0.04, lng: 54.3773 - 0.04, label: 'Royal Group', value: 0.6, color: '#f87171' },
];

// --- 5. Media: Floating Labels ---
export const mediaLabels = [
  { lat: 24.4539, lng: 54.3773, text: 'BREAKING: COP28 Initiatives Finalized', size: 0.5, color: '#ffffff' },
  { lat: 40.7128, lng: -74.0060, text: 'Wall Street: Emerging Market Surplus', size: 0.4, color: '#ffffff' },
  { lat: 51.5074, lng: -0.1278, text: 'London Tech Summit: Z-Model Highlighted', size: 0.4, color: '#ffffff' },
];
