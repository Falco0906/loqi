/** Two sparse constellations keep every connection outside the reading area. */
export const concepts = [
  { label: "Companies", side: "left", x: .65, y: .20 },
  { label: "Funding", side: "left", x: .18, y: .35 },
  { label: "Hiring", side: "left", x: .73, y: .49 },
  { label: "Timing", side: "left", x: .25, y: .70 },
  { label: "Signals", side: "left", x: .62, y: .83 },
  { label: "People", side: "right", x: .28, y: .16 },
  { label: "Role", side: "right", x: .80, y: .32 },
  { label: "Intent", side: "right", x: .22, y: .48 },
  { label: "Research", side: "right", x: .73, y: .65 },
  { label: "Context", side: "right", x: .40, y: .81 },
] as const;

export const connections: readonly (readonly [number, number])[] = [
  [0, 1], [0, 2], [1, 4], [2, 4], [3, 4],
  [5, 6], [5, 7], [6, 8], [7, 9], [8, 9],
];
export const compactConcepts = [0, 4, 5, 9];
export const compactConnections: readonly (readonly [number, number])[] = [[0, 4], [5, 9]];
