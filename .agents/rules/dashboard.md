---
trigger: always_on
---

# Z-Model Executive Dashboard - Core Directives

## 1. Project Identity & Tone
- **Objective:** Build a premium, 3D-interactive data dashboard ("The Z Model") for CEOs, owners, and elite investors.
- **Tone:** Ultra-professional, authoritative, and clean.
- **Strict Anti-Pattern:** Absolutely NO dark mode, NO neon colors, NO "cyberpunk/hacker" or "gamer" aesthetics. 

## 2. Tech Stack & Enforcement
- **Framework:** Next.js (App Router) with strict TypeScript.
- **Styling:** Tailwind CSS.
- **UI Architecture:** Shadcn UI (Cards, Tables, ScrollArea, Tabs).
- **3D & Data Visualization (Required Libraries):**
  - `echarts` & `echarts-gl`: For 3D bar/line charts and financial KPIs.
  - `deck.gl`: For large-scale geographic data overlays (Political/Investment maps).
  - `cesium` or `react-globe.gl`: For the interactive 3D globe centerpiece.

## 3. UI/UX & Art Direction Rules
- **Theme:** Strict Light Mode. 
- **Background:** Soft alabaster or off-white. The 3D globe must sit at `z-0` beneath the UI.
- **Materials (Glassmorphism):** All floating UI modules must use premium frosted glass. 
  - *Tailwind Standard:* `bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-2xl`.
- **Typography:** Highly legible sans-serif (Inter, SF Pro). Text must be deep slate or charcoal (`text-slate-800`).
- **Accents:** Muted corporate tones. Emerald for positive trends, muted crimson for negative, deep navy/gold for active states.

## 4. The Z-Model Data Architecture (8 Modules)
When tasked to build or update a section, strictly adhere to these specific data mappings:
1. **Economy:** ECharts 3D graphs (positive/negative trends) + Int'l Economic KPIs.
## 2. Tech Stack & Spatial Architecture
- **Core Engine:** React Three Fiber (`@react-three/fiber`) and Drei (`@react-three/drei`).
- **State Management:** Zustand (Crucial for sharing state between the DOM clicks and the WebGL canvas camera).
- **Map Data:** GeoJSON mapped to custom 3D BufferGeometries. Do NOT use `deck.gl` or `react-globe.gl` anymore.
- **UI Architecture:** All Shadcn UI modules must be rendered inside the R3F Canvas using Drei's `<Html>` component so they exist in 3D spatial coordinates.

## 3. The Orbital Interaction Model
- **Centerpiece:** A glowing, high-end holographic 3D Earth at the origin `[0, 0, 0]`.
- **The Orbits:** The 8 Z-Model modules orbit the Earth. 
- **Interaction:** Clicking a module expands it. Selecting data inside the module updates the Zustand store. The R3F Canvas listens to this store to trigger camera fly-to animations, highlight country meshes, and extrude 3D data (like charts or conflict arcs) directly from the globe's surface.
4. **Media:** Shadcn ScrollArea ticker for Breaking/Trending News + Local/Regional tabs.
5. **Groups & Companies:** Shadcn grid cards for IHC, Royal Group, G42, Adia (Financials, Auditing, Projects).
6. **Master B. Observer:** Task list for Follow-ups, Directions, and Main Projects.
7. **DRO:** Agenda and Main Files tracking.
8. **Calendar:** Shadcn-based event management (Daily/Weekly/Monthly/Yearly).

## 5. Agent Workflow & Execution Rules
- **Plan First:** Always formulate an architectural plan before writing or modifying code. Wait for user approval.
- **Z-Index Management:** Never let the 3D background (`z-0`) block click events on the Shadcn glass cards (`z-10`). Ensure `pointer-events-none` is used correctly on background wrappers.
- **Component Isolation:** Build each Z-Model section as a completely isolated, modular React component before integrating it into the main grid.
- **Mock Data Standard:** When building UI components, immediately generate hyper-realistic mock JSON data for the charts and tables to ensure the layout handles real-world text density.