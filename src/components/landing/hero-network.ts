/** Uneven, branching groups occupy the margins without enclosing the headline. */
export const concepts = [
  { label: "Companies", side: "left", x: .92, y: .16 },
  { label: "Funding", side: "left", x: .12, y: .09 },
  { label: "Hiring", side: "left", x: .05, y: .47 },
  { label: "Timing", side: "left", x: .86, y: .78 },
  { label: "Signals", side: "left", x: .72, y: .38 },
  { label: "People", side: "right", x: .12, y: .29 },
  { label: "Role", side: "right", x: .87, y: .12 },
  { label: "Intent", side: "left", x: .18, y: .70 },
  { label: "Research", side: "right", x: .85, y: .60 },
  { label: "Context", side: "right", x: .15, y: .73 },
] as const;

export const connections: readonly (readonly [number, number])[] = [
  [0, 1], [0, 4], [2, 4], [4, 7], [3, 7],
  [5, 6], [5, 8], [8, 9],
];
export const compactConcepts = [0, 4, 5, 9];
export const compactConnections: readonly (readonly [number, number])[] = [[0, 4], [5, 9]];
