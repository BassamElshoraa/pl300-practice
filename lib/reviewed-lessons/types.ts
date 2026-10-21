export type ReviewedLesson = {
  /** A checked answer explanation, not a coverage label synthesized at runtime. */
  translation: string;
  story: string;
  reasoning: string[];
  answer: string;
  example: string;
  optionsAr: string[];
  takeaway: string;
  references: string[];
  correctIndices?: number[];
  verdict?: 'confirmed' | 'conditional' | 'incomplete';
};

export const reviewSources = {
  storage:
    'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-storage-mode',
  dataverse:
    'https://learn.microsoft.com/en-us/power-query/connectors/dataverse',
  semanticModels:
    'https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-report-lifecycle-datasets',
  merge: 'https://learn.microsoft.com/en-us/power-query/merge-queries-overview',
  append: 'https://learn.microsoft.com/en-us/power-query/append-queries',
  sharepoint:
    'https://learn.microsoft.com/en-us/power-query/connectors/sharepoint-folder',
  directQuery:
    'https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-directquery-about',
  queryLoad:
    'https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-include-in-report-refresh',
  headerDetail:
    'https://www.sqlbi.com/articles/header-detail-vs-star-schema-models-in-tabular-and-power-bi/',
  split:
    'https://learn.microsoft.com/en-us/power-query/split-columns-delimiter',
  dates:
    'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-auto-date-time',
  profiling:
    'https://learn.microsoft.com/en-us/power-query/data-profiling-tools',
  folder: 'https://learn.microsoft.com/en-us/power-query/connectors/folder',
  refresh:
    'https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-scheduled-refresh',
  gateway:
    'https://learn.microsoft.com/en-us/power-bi/connect-data/service-gateway-sql-tutorial',
  odbc: 'https://learn.microsoft.com/en-us/power-query/connectors/odbc',
  unpivot: 'https://learn.microsoft.com/en-us/power-query/unpivot-column',
  azureSQL:
    'https://learn.microsoft.com/en-us/power-query/connectors/azure-sql-database',
  parameters:
    'https://learn.microsoft.com/en-us/power-query/power-query-query-parameters',
  errors: 'https://learn.microsoft.com/en-us/power-query/dealing-with-errors',
  privacy: 'https://learn.microsoft.com/en-us/power-query/privacy-levels',
  devops:
    'https://learn.microsoft.com/en-us/azure/devops/report/powerbi/overview?view=azure-devops',
  headers:
    'https://learn.microsoft.com/en-us/power-query/table-promote-demote-headers',
} as const;
