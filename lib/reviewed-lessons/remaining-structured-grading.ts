/**
 * Reviewed structured answers for the bounded remaining Yes/No and drag audit.
 * Yes/No uses0=Yes,1=No. Drag values use the ACTUAL answerOffset declared in
 * dragDropData:0 for original retained options and20000 for repaired controls.
 * Existing learner attempts must not be historically regraded on import.
 */
export const structuredKeys: Record<string, number[]> = {
  // Existing Error values are replaceable before or after Decimal conversion.
  'f1-023-22': [0, 4, 2],
  'f1-066-65': [0, 2, 5],
  'f1-068-67': [0, 1, 1],
  'f1-079-78': [1, 1, 0],
  'f1-089-88': [1, 1, 0],
  'f1-119-118': [0, 1, 0],
  'f1-266-265': [0, 1, 1],
  'f1-355-354': [1, 0, 1],
  'f1-364-363': [1, 1, 0],
  'f2-100-407': [4, 1, 3],
  'f2-157-426': [0, 2, 5],
  'f2-214-448': [5, 4, 1],
  'f2-281-468': [20003, 20001, 20004],
  'f2-303-475': [0, 1, 0],
  'f2-331-482': [20003, 20004],
  'f2-368-495': [20004, 20001, 20000],
  'f2-396-504': [1, 2, 0],
};

/** Each list explicitly contains every supported accepted sequence for its ID. */
export const structuredAlternatives: Record<string, number[][]> = {
  'f1-023-22': [
    [0, 4, 2],
    [0, 2, 4],
  ],
  // Let A enrich Region_Manager with Manager; B enrich Sales_Region with
  // Sales_Manager; C enrich Sales_Region with the completed Region_Manager.
  // A must precede C so the required Manager fields can be expanded. B is
  // independent of A and can be before/between/after the A→C dependency.
  // Do not accept generic6! permutations or change As New target query names.
  'f1-066-65': [
    [0, 2, 5],
    [2, 0, 5],
    [0, 5, 2],
  ],
  'f2-157-426': [
    [0, 2, 5],
    [2, 0, 5],
    [0, 5, 2],
  ],
  // After Folder is connected, metadata expansion and binary removal commute.
  // Combining Content or removing Attributes does not satisfy the task.
  'f2-281-468': [
    [20003, 20001, 20004],
    [20003, 20004, 20001],
  ],
};

export const unresolved: Record<string, string> = {
  'f1-293-292':
    'The classification table is recovered, but the source does not specify the label policy. A sensitivity label alone does not establish an export prohibition. No unique complete Yes/No key is invented.',
  'f2-038-390':
    'Counterpart of293: the label policy is unspecified, not the classification names. Do not equate a sensitivity label with an export ban or reuse Answer:A as a three-statement key.',
  'f2-130-417':
    'Bank407: first two statements are Yes/No, but the third claims first200rows detection improves import time although each source file has only10–50rows. Sample helper versus combined-query scope is not specified. No safe complete three-answer key; retain the explained ambiguity.',
  'f2-232-454':
    'Bank442: Unpivot Other Columns→Rename→Group by Department/School produces8groups (2departments×4schools), but the source target shows only2School1groups. No offered step filters School1. If the target is only illustrative, intended indexes are[20002,20003,20004], but do not silently score that as the exact depicted result without clarifying the requirement.',
};

export const structuredGradingEvidence = {
  errorHandling:
    'https://learn.microsoft.com/en-us/power-query/dealing-with-errors',
  merge: 'https://learn.microsoft.com/en-us/power-query/merge-queries-overview',
  innerJoin:
    'https://learn.microsoft.com/en-us/power-query/merge-queries-inner',
  profile: 'https://learn.microsoft.com/en-us/powerquery-m/table-profile',
  json: 'https://learn.microsoft.com/en-us/power-query/connectors/json',
  personalViews:
    'https://learn.microsoft.com/en-us/power-bi/explore-reports/end-user-bookmarks',
  pinPage:
    'https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboard-pin-live-tile-from-report',
  sqlAuthentication:
    'https://learn.microsoft.com/en-us/power-query/connectors/sql-server',
  modelReduction:
    'https://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction',
};
