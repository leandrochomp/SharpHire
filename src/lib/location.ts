export const AU_STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'] as const;
export type AuState = (typeof AU_STATES)[number];

export const REMOTE = 'Remote';

/** `"City, STATE"` with a valid AU state, or exactly `"Remote"`. */
export const LOCATION_PATTERN = new RegExp(`^(?:[^,]+, (?:${AU_STATES.join('|')})|${REMOTE})$`);

/** Filter key for a location: its state code, or `"Remote"`. */
export function locationKey(location: string): AuState | typeof REMOTE {
  if (location === REMOTE) return REMOTE;
  return location.slice(location.lastIndexOf(', ') + 2) as AuState;
}

/** Filter options present in the data, states in canonical order, Remote last. */
export function locationOptions(locations: string[]): string[] {
  const keys = new Set<string>(locations.map(locationKey));
  return [...AU_STATES, REMOTE].filter((k) => keys.has(k));
}
