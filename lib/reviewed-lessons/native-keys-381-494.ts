/** Reviewed against each source menu; values are 10000 + row-local option index. */
export const reviewedNativeKeys: Record<string, number[]> = {
  'f2-048-394': [10003, 10001], // Sale classification; Insurance model.
  'f2-050-395': [10002, 10001], // Hide key; delete unused photo.
  'f2-076-401': [10002, 10001], // Text.Replace(Text.End(...)).
  'f2-083-403': [10001, 10001], // Merge; disable helper-query load.
  'f2-106-410': [10001, 10001], // Two bookmarks; Display.
  'f2-136-419': [10002, 10001], // GENERATESERIES(-100,100,1).
  'f2-174-433': [10000, 10002, 10004, 10003], // CALCULATE/SUM/TOPN/TransactionDate.
  'f2-197-441': [10003, 10001], // Sum; only Sales under shown single-direction arrows.
  'f2-209-447': [10004, 10003, 10001], // TOPN/SUMMARIZE/DESC.
  'f2-228-453': [10001, 10001, 10001], // No eligible Premium/F64+ capacity stated.
  'f2-256-461': [10000, 10002], // Line; date axis.
  'f2-266-464': [10003, 10002, 10001], // Historical feature: Name/ID/Yes.
  'f2-337-484': [10001, 10000], // Cross-highlight columns; cross-filter map.
  'f2-349-488': [10002, 10002], // Format target; visual-level Territory filter.
  'f2-353-489': [10000, 10002], // CONTOSO BIKES report; three models.
  'f2-378-498': [10000, 10002, 10003], // CALCULATE/DATEADD/DIVIDE.
  'f2-389-501': [10003, 10001, 10001], // RemoveColumns/List.Select/EndsWith.
};
export const conditionalNativeKeyIds = [
  'f2-048-394',
  'f2-106-410',
  'f2-174-433',
  'f2-209-447',
  'f2-228-453',
  'f2-266-464',
  'f2-337-484',
  'f2-349-488',
  'f2-378-498',
] as const;
export const nativeKeyQualifications: Record<string, string> = {
  'f2-048-394':
    'Legacy classification interface, not current sensitivity-label instructions.',
  'f2-106-410':
    'The two-view requirement identifies two Display bookmarks; the promised map screenshot itself is absent.',
  'f2-174-433':
    'TOPN can return more than 50 rows when the boundary date ties. A unique secondary key is required for exactly 50.',
  'f2-209-447':
    'TOPN can return more than 100 customers when spending ties at the boundary.',
  'f2-228-453':
    'App consumption is Free only when an eligible Premium/Fabric F64+ capacity is explicitly available; it is not stated here.',
  'f2-266-464':
    'Historical featured-table question; the Excel organization data type functionality has been removed.',
  'f2-337-484':
    'Answers depend on the displayed/default visual interactions; authors may override them.',
  'f2-349-488':
    'A visual filter constrains this gauge but cannot override RLS or contradictory higher-level filter intersections.',
  'f2-378-498':
    'Source formula references the automatic date hierarchy. Production models should use a suitable explicit calendar and valid time-intelligence context.',
};
// Intentionally omitted: f2-191-438 missing permissions exhibit;
// f2-287-471 cropped model/conditional amount availability;
// f2-252-460 unique-vs-distinct wording does not uniquely establish 51 rows.
