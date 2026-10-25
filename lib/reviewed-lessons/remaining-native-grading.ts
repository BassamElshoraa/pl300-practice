/**
 * Independently checked residual native menus. These arrays use 10000 plus the
 * actual row-local choice index. Alternatives are COMPLETE accepted answers,
 * including the canonical answer, not independent per-row sets to cross-join.
 *
 * Scope: menu selections under the explicitly stated historical/scalar-context
 * qualifications below. This file does not silently repair the source formula,
 * declare deprecated capabilities current, or regrade any historical attempt.
 */
export const nativeKeys: Record<string, number[]> = {
  // Customer Name repeats; Text.End(_,12) returns ten local digits plus hyphens.
  'f1-051-50': [10002, 10001],
  // Historical featured-table workflow: Name; ID; Yes.
  'f1-061-60': [10003, 10002, 10001],
  // A single Qualification value is available: IF; HIGH; MEDIUM.
  'f1-144-143': [10001, 10000, 10002],
  // Single on the current relationship; remove the competing active path FIRST.
  'f1-148-147': [10002, 10002],
  // Quality for error%; Profile for detailed Empty count (also see alternatives).
  'f1-278-277': [10002, 10001],
  // Finance = Analyze in Excel; Corp = grant Build (Read is also valid).
  'f1-317-316': [10001, 10000],
  'f1-326-325': [10001, 10000],
  // Viewer + specifically scoped Build; App + scoped Build is also supported.
  'f1-366-365': [10002, 10000],
};

export const nativeAlternatives: Record<string, number[][]> = {
  'f1-144-143': [
    [10001, 10000, 10002], // IF; HIGH; MEDIUM.
    [10002, 10000, 10002], // IF.EAGER; HIGH; MEDIUM. Same classification values.
  ],
  'f1-278-277': [
    [10002, 10001], // Quality error percentage; Profile Empty count.
    [10002, 10002], // Quality error percentage; Quality hover Empty count.
  ],
  'f1-317-316': [
    [10001, 10000], // Analyze in Excel; grant Build.
    [10001, 10001], // Analyze in Excel; grant Read via supported Reshare.
  ],
  'f1-326-325': [
    [10001, 10000],
    [10001, 10001],
  ],
  'f1-366-365': [
    [10002, 10000], // Viewer; Build on P&L only.
    [10000, 10000], // App consumption; Build on P&L only, separately scoped.
  ],
};

export const unresolved: Record<string, string> = {
  'f1-054-53':
    'Web is the intended connector, but username/password does not establish Basic authentication. The API authentication contract is absent. Do not force [10003,10001] or invent an OAuth/API-key contract.',
  'f1-078-77':
    '51 rows/reduce is intended only if unique means distinct. If 51 values occur once among75 non-null rows, the remaining24 repeated instances imply another1–12 distinct values, so the displayed row-count choices do not establish a correct full answer. Resolve the terminology first.',
  'f1-083-82':
    'CALCULATE/SUM/DATESBETWEEN [10000,10003,10001] uniquely fits the template signatures, but LASTDATE(Sales[Date])-365 does not reliably produce the same prior-calendar-year date. A complete-goal grading key requires a corrected boundary or an explicit template-blanks-only grading premise.',
  'f1-146-145':
    'HASONEVALUE/DENSE [10001,10001] is the intended template completion, but HASONEVALUE is not an unfiltered/total detector in every context and the source only declares Quantity as a column while using [Quantity] as a measure. Define the aggregate and intended filter/row context before grading the complete requested behavior.',
  'f1-166-165':
    'CALENDAR/MINX/MAXX [10000,10002,10000] is intended, but taking only MIN(Sales[Date]) and MAX(Forecast[Date]) need not cover both tables. The relative date ranges and nonempty bounds are unspecified. Fix the template or state the boundary assumptions rather than accepting a formula that may omit required dates.',
  'f1-171-170':
    'The Single relationship proves that filtering Table2 does not filter Table1. The second statement about displaying an unmatched BLANK is visual-field/order and Show-items-with-no-data dependent; NaN/Error are not legitimate alternatives, but their absence does not prove the row is materialized. Keep intended [10002,10000] pending a defined visual configuration.',
  'f1-179-178':
    'The three-row preview and identical formatting do not prove fractional parts and times for all250,000 rows. No safe Whole number/Date key without full-value verification or a revised explicit all-integral/all-midnight premise. Do not infer missing values from format.',
  'f1-287-286':
    'Overlap every series/Plan labels [10001,10001] are the intended appearance settings. Switching ordinary Plan labels on cannot itself calculate the displayed percent change. The required percentage/custom-label configuration is unstated; no alternative label toggle fixes that missing calculation.',
  'f1-333-332':
    'Two sources require a network bridge; Pro8/day is insufficient and PPU48/day meets12/day. The source also offers an unspecified Embedded capacity/license mode, without enough capacity/consumption licensing detail to establish one exclusive complete license answer. Keep intended [10001,10001] documented, not a guessed Embedded alternative.',
  'f2-252-460':
    'Same UnitsInStock ambiguity as bank78: 51 unique could mean distinct or occurrence-once. The screenshot states Summarize by=None but does not resolve that word. Do not guess a distinct count from the source-row count.',
  'f2-287-471':
    'The schema is cropped. No/No/Yes [10001,10001,10000] assumes a stored final SalesAmount and a preserved order-count grain. CustomerID is required, but the complete diagram is needed to establish safe removal of UnitPrice/Discount and the grouping outcome.',
};

/** Mandatory qualifications to retain beside any scored menu answer. */
export const gradingQualifications: Record<string, string> = {
  'f1-051-50':
    'Original wording says10digits, not10characters. The observed suffix500-555-0169 has ten digits and two hyphens. Taking the last12characters excludes the calling prefix for the two observed lengths12/19. It does not output digits-only text or generalize to arbitrary phone formats.',
  'f1-061-60':
    'Grade the historical interface explicitly. Microsoft removed this featured-table functionality from Power BI Desktop inJune2026. Name is the human-readable label and ID the intended unique identifier; Yes enables the former workflow.',
  'f1-144-143':
    'Both IF and IF.EAGER return the same branch values in this constant-label classification. The score tests the dropdown completion under a single-value Qualification context, not whether an unaggregated column reference works as a measure for arbitrary totals. Preserve the scalar-context warning or repair the formula before presenting it as a general-purpose measure.',
  'f1-148-147':
    'The original asks what to do FIRST, not for one action that fully configures RLS. Remove/deactivate the competing active relationship, then activate the intended relationship and configure/test security propagation. The offered first-step menu contains Delete but not Deactivate. Never claim deletion alone enables security.',
  'f1-278-277':
    'Official profiling documentation shows numerical counts and percentages on the Column quality hover. Profile remains the direct detailed Empty-count view, but Quality cannot be rejected as incapable of showing counts. Do not also accept arbitrary combinations involving Distribution or an undisplayed calculated percentage.',
  'f1-317-316':
    'The source grants Corp Read+Reshare+Build and Finance Read+Build. Corp can grant Read through Reshare and Build through the supported sharing workflow. Neither group has source Write; no delete-table alternative is accepted.',
  'f1-326-325':
    'Same actual permissions and row menus as317. Granting Read is a genuine supported capability, not an incorrect distractor merely because the source key selects Build.',
  'f1-366-365':
    'Both variants are consumption paths without Write, with Build restricted to the P&L model only. App distribution must not globally grant Build to the balance-sheet model or Reshare to analysts. Member is never accepted; it permits authoring and bypasses the intended RLS restrictions.',
};

export const gradingEvidence = {
  phone: 'https://learn.microsoft.com/en-us/powerquery-m/text-end',
  featured:
    'https://learn.microsoft.com/en-us/power-bi/collaborate-share/office-integration/service-create-excel-featured-tables',
  eager: 'https://learn.microsoft.com/en-us/dax/if-eager-function-dax',
  relationships:
    'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships',
  rls: 'https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive',
  quality: 'https://learn.microsoft.com/en-us/power-query/data-profiling-tools',
  permissions:
    'https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-permissions',
  sharing:
    'https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-share',
  app: 'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-create-distribute-apps',
  refresh:
    'https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-scheduled-refresh',
} as const;
