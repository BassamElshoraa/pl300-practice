// Row-local choice indices, independently matched against the actual menus.
// Encoding is TEXT_ANSWER_OFFSET (10000) + zero-based row choice index.
// The conditional set below is an eligibility/review signal, not an instruction
// to silently score an underspecified question as a complete technical solution.
export const reviewedNativeKeys: Record<string, number[]> = {
  // Dashboard mobile layout; Total Sales and Total Quantity tiles.
  'f1-221-220': [10000, 10001],
  // Line chart; anomaly detection.
  'f1-225-224': [10000, 10002],
  // Average reference line; Axis.
  'f1-227-226': [10002, 10000],
  // Scatter by Item; Automatically find clusters. Item is not necessarily Order.
  'f1-233-232': [10002, 10000],
  // Most frequent value 45; minimum non-NULL value 24.
  'f1-256-255': [10002, 10002],
  // Matrix; Apply drill down filters to Selected visual.
  'f1-257-256': [10002, 10002],
  // Report1 = Power BI paginated (.rdl); Report2 = Power BI (.pbix).
  'f1-268-267': [10002, 10001],
  // Matrix; Switch values to rows On.
  'f1-271-270': [10000, 10002],
  // Unique = 0; most frequent Resource Location = US East.
  'f1-274-273': [10000, 10002],
  // Errors percentage = Column quality; empty count = Column profile.
  'f1-278-277': [10002, 10001],
  // Region; Fill down.
  'f1-281-280': [10001, 10000],
  // Both lists: August 2024 Active User %. Other is not pure waiting time.
  'f1-283-282': [10002, 10002],
  // Overlap every series; Plan data labels. Requires preconfigured percent labels.
  'f1-287-286': [10001, 10001],
};

export const conditionalNativeKeyIds = [
  'f1-233-232',
  'f1-278-277',
  'f1-283-282',
  'f1-287-286',
] as const;

export const nativeKeyQualifications: Record<string, string> = {
  'f1-233-232':
    'The menu uniquely identifies Scatter by Item plus clusters. Individual order-level analysis needs an order identifier if Item aggregates multiple orders.',
  'f1-278-277':
    'Column profile is the intended detailed empty-count display. Some Column quality hover experiences also expose counts; do not claim counts are universally unavailable there.',
  'f1-283-282':
    'This is the intended answer from the displayed maximum total and Other duration. Other includes multiple kinds of processing; it does not prove a visual dependency or pure waiting duration.',
  'f1-287-286':
    'These are only the intended formatting menu choices. Enabling default Plan labels cannot calculate the displayed percent change without a preconfigured percentage/custom-label expression. Keep that requirement explicit in scoring eligibility.',
};

// Q284 has a fixed source step2. Only steps1,3,4 are interactive, in the repaired
// drag namespace20000: select Location Name; Column profile; group by text length.
export const reviewedDragKeys: Record<string, number[]> = {
  'f1-284-283': [20004, 20002, 20003],
};
