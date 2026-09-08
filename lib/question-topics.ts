import type { Domain, Question } from './questions';

export const TOPICS_BY_DOMAIN = {
  'Prepare the data': [
    'Data sources and connectivity',
    'Power Query transformations',
    'Data profiling and quality',
    'Parameters and refresh preparation',
  ],
  'Model the data': [
    'Relationships and model design',
    'DAX measures and calculations',
    'Model performance and storage',
    'Model properties and calculations',
  ],
  'Visualize and analyze the data': [
    'Visuals and formatting',
    'Filters, slicers and interactions',
    'Analytics and insights',
    'Reports, dashboards and mobile',
  ],
  'Manage and secure Power BI': [
    'Security and permissions',
    'Refresh and gateways',
    'Workspaces, apps and deployment',
    'Governance and administration',
  ],
} as const satisfies Record<Domain, readonly string[]>;

export type QuestionTopic = (typeof TOPICS_BY_DOMAIN)[Domain][number];

export const ALL_TOPICS = Object.values(
  TOPICS_BY_DOMAIN,
).flat() as QuestionTopic[];

export function getQuestionTopic(question: Question): QuestionTopic {
  const text =
    `${question.prompt}\n${question.choices.join('\n')}\n${question.explanation}`.toLowerCase();

  if (question.domain === 'Prepare the data') {
    if (
      matches(
        text,
        /profil|column quality|column distribution|null|empty|error|distinct|unique|anomal|statistics|data quality/,
      )
    )
      return 'Data profiling and quality';
    if (
      matches(
        text,
        /power query|query editor|merge|append|pivot|unpivot|transpose|split column|group by|replace values|fill down|fill up|m formula|query folding|applied step|data type/,
      )
    )
      return 'Power Query transformations';
    if (
      matches(
        text,
        /connector|connect|data source|dataverse|sharepoint|excel|sql server|database|odata|web api|azure|snowflake|csv|json|xml|folder/,
      )
    )
      return 'Data sources and connectivity';
    return 'Parameters and refresh preparation';
  }

  if (question.domain === 'Model the data') {
    if (
      matches(
        text,
        /relationship|cardinality|star schema|snowflake|dimension table|fact table|many-to-many|one-to-many|cross-filter|filter direction|referential integrity/,
      )
    )
      return 'Relationships and model design';
    if (
      matches(
        text,
        /\bdax\b|measure|calculate\s*\(|sumx\s*\(|averagex\s*\(|filter\s*\(|all\s*\(|distinctcount|dateadd|sameperiod|totalytd|time intelligence|calendar\s*\(|related\s*\(/,
      )
    )
      return 'DAX measures and calculations';
    if (
      matches(
        text,
        /storage mode|directquery|dual mode|import mode|aggregation|composite model|performance|optimi[sz]|vertipaq|query reduction/,
      )
    )
      return 'Model performance and storage';
    return 'Model properties and calculations';
  }

  if (question.domain === 'Visualize and analyze the data') {
    if (
      matches(
        text,
        /filter pane|visual-level filter|page-level filter|report-level filter|slicer|edit interaction|cross-highlight|drillthrough|bookmark|sync slicer/,
      )
    )
      return 'Filters, slicers and interactions';
    if (
      matches(
        text,
        /forecast|anomal|trend line|reference line|decomposition tree|key influencer|q&a|quick insight|analytics pane|explain the increase|detect/,
      )
    )
      return 'Analytics and insights';
    if (
      matches(
        text,
        /dashboard|mobile layout|phone layout|report page|page navigation|theme|publish|pin (?:a |the )?visual|power bi app|paginated report/,
      )
    )
      return 'Reports, dashboards and mobile';
    return 'Visuals and formatting';
  }

  if (
    matches(
      text,
      /row-level security|\brls\b|object-level security|\bols\b|sensitivity label|permission|viewer|member|contributor|admin role|share report|security group|access/,
    )
  )
    return 'Security and permissions';
  if (
    matches(
      text,
      /gateway|scheduled refresh|refresh schedule|data source credential|incremental refresh|refresh failure|refresh history/,
    )
  )
    return 'Refresh and gateways';
  if (
    matches(
      text,
      /workspace|deployment pipeline|deploy|power bi app|audience|publish|lifecycle|stage|promote|endorsement/,
    )
  )
    return 'Workspaces, apps and deployment';
  return 'Governance and administration';
}

export function buildQuestionSet(
  pool: Question[],
  count: number,
  seed = Date.now(),
) {
  return seededShuffle(pool, seed).slice(
    0,
    Math.max(1, Math.min(count, pool.length)),
  );
}

function matches(text: string, pattern: RegExp) {
  return pattern.test(text);
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let state = seed >>> 0;
  for (let index = result.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const target = Math.floor((state / 4294967296) * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}
