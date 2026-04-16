---
description: Step-by-step instructions for wrapping Shadcn UI components in React Three Fiber's Drei <Html> tags to create 3D spatial modules that orbit the Hologram Earth, including Zustand state wiring.
---

# Workflow: Create an Orbital UI Module

When instructed to create or update an orbital Z-Model module, you must transition from 2D DOM thinking to 3D spatial architecture. Follow these steps strictly:

## 1. Build the Base UI (Shadcn + Tailwind)
Construct the standard React component using Shadcn. 
* Strictly enforce the premium light-mode glassmorphism aesthetic (`bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl`).
* Ensure text is highly legible (`text-slate-800`).

## 2. Wrap in Drei `<Html>`
The standard DOM element cannot exist in the Canvas alone. You must wrap the root component in `@react-three/drei`'s `<Html>` tag.
* Apply `transform` so the UI scales and moves with the 3D camera.
* Apply `occlude` so the UI hides behind the Earth when rotated away.
* Apply `center` to ensure proper pivot points.

## 3. Calculate Spatial Positioning
Assign the component a fixed coordinate `[x, y, z]` on the orbital ring surrounding the Earth. Use spherical coordinates to ensure the 8 modules are evenly spaced in a 360-degree ring.

## 4. Wire the Zustand State Machine
The HTML DOM must control the 3D Canvas. Add `onClick` handlers to relevant data rows (e.g., clicking a specific country's news or a specific investment) that dispatch to the global store:
* `setSelectedCountry(countryCode)` 
* `setCameraTarget([x, y, z])`
This ensures that when a user interacts with the orbiting UI, the 3D Earth reacts accordingly (highlighting regions, flying the camera, or drawing arcs).