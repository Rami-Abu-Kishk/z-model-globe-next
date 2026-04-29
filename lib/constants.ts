// THIS IS FOR ZOOM RATIO IT WILL BE BETWEEN 1 TO 100 SO HIGHER THE NUMBER THE MORE ZOOM IN IT WILL BE
export const ZOOM_RATIO = 10;

/**
 * Applies the global zoom ratio to a base altitude.
 * Formula: altitude * (1 - ZOOM_RATIO / 100)
 * Includes a safety floor of 0.01 to prevent camera clipping issues.
 */
export const applyZoom = (altitude: number): number => {
  const zoomFactor = 1 - (ZOOM_RATIO / 100);
  return Math.max(0.01, altitude * zoomFactor);
};
