import { create } from 'zustand';
import type { GlobeTarget } from '@/lib/types';

export type ModuleId = 
  | 'economy' 
  | 'investment' 
  | 'political' 
  | 'media'
  | 'research'
  | 'companies' 
  | 'masterObserver' 
  | 'abudhabi'
  | 'calendar';

export type InvestmentDetailView = 'NONE' | 'UAE' | 'OPPORTUNITY';

export type ViewState = 'ORBITAL' | 'EARTH_FOCUS' | 'CARD_FOCUS';

interface ZModelStore {
  // ── Cinematic View State ──────────────────────────────────────────
  viewState: ViewState;
  setViewState: (state: ViewState) => void;

  // ── Which card is specifically focused in CARD_FOCUS mode ────────
  focusedCardId: ModuleId | null;
  setFocusedCardId: (id: ModuleId | null) => void;

  // ── Active Module (drives globe layer; independent of card focus) ─
  // Updated by ModuleNav tabs. Globe re-renders the appropriate layer.
  activeModule: ModuleId | null;
  setActiveModule: (id: ModuleId | null) => void;

  // ── Manual camera position override [x, y, z] (R3F legacy) ──────
  cameraPos: [number, number, number];
  setCameraPos: (pos: [number, number, number]) => void;

  // ── Legacy/Back-compat focusedModule (syncs with focusedCardId) ──
  focusedModule: ModuleId | null;
  setFocusedModule: (id: ModuleId | null) => void;

  // ── ISO 3166-1 alpha-2 country code (globe highlight) ────────────
  selectedCountry: string | null;
  setSelectedCountry: (code: string | null) => void;

  // ── Multiple countries highlighted (conflict zone / economic bloc) ─
  selectedCountries: string[];
  setSelectedCountries: (codes: string[]) => void;

  // ── Hovered country for globe tooltip ────────────────────────────
  hoveredCountry: string | null;
  setHoveredCountry: (id: string | null) => void;

  // ── Target world coords for decoupled camera fly-to ──────────────
  activeTarget: GlobeTarget | null;
  setActiveTarget: (target: GlobeTarget | null) => void;

  // ── Country name string for the Search Detail Drawer ─────────────
  // (distinct from selectedCountry which is an ISO code)
  activeCountry: string | null;
  setActiveCountry: (name: string | null) => void;

  // ── Search bar query string ───────────────────────────────────────
  // PERFORMANCE: consumers of this that pass data to <Globe /> MUST
  // wrap derived arrays in useMemo to avoid re-rendering the WebGL canvas.
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // ── Media Analytics Focus ─────────────────────────────────────────
  mediaCategoryFilter: 'all' | 'Breaking' | 'Trending' | 'Regional';
  setMediaCategoryFilter: (filter: 'all' | 'Breaking' | 'Trending' | 'Regional') => void;

  mediaActiveNewsId: string | null;
  setMediaActiveNewsId: (id: string | null) => void;

  mediaSelectedArticle: any | null; // Using any to avoid circular import with mock types
  setMediaSelectedArticle: (article: any | null) => void;

  // ── Whether the Earth is in "analysis mode" ───────────────────────
  isAnalysisMode: boolean;
  setAnalysisMode: (active: boolean) => void;

  // ── Orbital ring Y-axis rotation target (radians) ────────────────
  ringRotationTarget: number;
  rotateRing: (direction: 1 | -1) => void;

  // ── Globe Rotation ───────────────────────────────────────────────
  autoRotate: boolean;
  setAutoRotate: (active: boolean) => void;

  // ── Investment Detail Focus ──────────────────────────────────────
  investmentActiveDetail: InvestmentDetailView;
  setInvestmentActiveDetail: (view: InvestmentDetailView) => void;
  investmentSelectedOpportunity: any | null; // Using any to avoid circular import with mock types
  setInvestmentSelectedOpportunity: (op: any | null) => void;

  activeEconomyTrend: any | null;
  setActiveEconomyTrend: (trend: any | null) => void;

  politicalSelectedCase: any | null;
  setPoliticalSelectedCase: (item: any | null) => void;

  // ── Master reset ─────────────────────────────────────────────────
  resetView: () => void;
}

export const useZModelStore = create<ZModelStore>((set) => ({
  // ── View State ───────────────────────────────────────────────────
  viewState: 'ORBITAL',
  setViewState: (state) => set({ viewState: state }),

  // ── Card Focus ───────────────────────────────────────────────────
  focusedCardId: null,
  setFocusedCardId: (id) => set({ focusedCardId: id, focusedModule: id }),

  // ── Active Module ─────────────────────────────────────────────────
  activeModule: null,
  setActiveModule: (id) => set({ 
    activeModule: id,
    selectedCountry: null,
    selectedCountries: [],
    activeEconomyTrend: null,
    mediaActiveNewsId: null,
    mediaCategoryFilter: 'all',
    activeTarget: null,
    activeCountry: null,
    searchQuery: ''
  }),

  // ── R3F Camera (legacy) ───────────────────────────────────────────
  cameraPos: [0, 7, 11],
  setCameraPos: (pos) => set({ cameraPos: pos }),

  // ── Focused Module (legacy alias) ─────────────────────────────────
  focusedModule: null,
  setFocusedModule: (id) => set({ focusedModule: id, focusedCardId: id }),

  // ── Country Selection ─────────────────────────────────────────────
  selectedCountry: null,
  setSelectedCountry: (code) => set({ selectedCountry: code }),

  selectedCountries: [],
  setSelectedCountries: (codes) => set({ selectedCountries: codes }),

  hoveredCountry: null,
  setHoveredCountry: (id) => set({ hoveredCountry: id }),

  // ── Globe Camera Target ───────────────────────────────────────────
  activeTarget: null,
  setActiveTarget: (target) => set({ activeTarget: target }),

  // ── Search State ──────────────────────────────────────────────────
  activeCountry: null,
  setActiveCountry: (name) => set({ activeCountry: name }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // ── Media Analytics Focus ─────────────────────────────────────────
  mediaCategoryFilter: 'all',
  setMediaCategoryFilter: (filter) => set({ mediaCategoryFilter: filter }),

  mediaActiveNewsId: null,
  setMediaActiveNewsId: (id) => set({ mediaActiveNewsId: id }),

  mediaSelectedArticle: null,
  setMediaSelectedArticle: (article) => set({ mediaSelectedArticle: article }),

  // ── Analysis Mode ─────────────────────────────────────────────────
  isAnalysisMode: false,
  setAnalysisMode: (active) => set({ isAnalysisMode: active }),

  // ── Ring Rotation ─────────────────────────────────────────────────
  ringRotationTarget: 0,
  rotateRing: (direction) =>
    set((state) => ({
      ringRotationTarget: state.ringRotationTarget + direction * (Math.PI / 4),
    })),

  // ── Globe Rotation ───────────────────────────────────────────────
  autoRotate: true,
  setAutoRotate: (active) => set({ autoRotate: active }),

  // ── Investment Detail Focus ──────────────────────────────────────
  investmentActiveDetail: 'NONE',
  setInvestmentActiveDetail: (view) => set({ investmentActiveDetail: view }),
  investmentSelectedOpportunity: null,
  setInvestmentSelectedOpportunity: (op) => set({ investmentSelectedOpportunity: op }),

  activeEconomyTrend: null,
  setActiveEconomyTrend: (trend) => set({ activeEconomyTrend: trend }),

  politicalSelectedCase: null,
  setPoliticalSelectedCase: (item) => set({ politicalSelectedCase: item }),

  // ── Master Reset ──────────────────────────────────────────────────
  resetView: () =>
    set({
      viewState: 'ORBITAL',
      focusedCardId: null,
      focusedModule: null,
      activeModule: null,
      cameraPos: [0, 7, 11],
      selectedCountry: null,
      selectedCountries: [],
      activeTarget: null,
      activeCountry: null,
      searchQuery: '',
      mediaCategoryFilter: 'all',
      mediaActiveNewsId: null,
      mediaSelectedArticle: null,
      investmentSelectedOpportunity: null,
      activeEconomyTrend: null,
      politicalSelectedCase: null,
      autoRotate: true,
    }),
}));
