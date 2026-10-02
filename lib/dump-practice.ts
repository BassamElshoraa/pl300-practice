export type DumpPracticeCollection = {
  id: string;
  modelId: number;
  monthLabel: string;
  monthLabelAr: string;
  title: string;
  titleAr: string;
  sessionLabel: string;
  sourceKeys: readonly string[];
  sourceFiles: readonly string[];
};

/**
 * Monthly practice collections are intentionally metadata-only. The page
 * resolves their question IDs from the canonical question bank so a source
 * question can never drift into a second, separately maintained copy.
 */
export const DUMP_PRACTICE_COLLECTIONS: readonly DumpPracticeCollection[] = [
  {
    id: '2026-08',
    modelId: 950,
    monthLabel: 'August 2026',
    monthLabelAr: 'أغسطس 2026',
    title: 'August 2026 Dump Practice',
    titleAr: 'ممارسة دامبات أغسطس 2026',
    sessionLabel: 'August 2026 · Dump Practice',
    sourceKeys: ['Final', 'Final 2'],
    sourceFiles: ['PL-300 Complete Collection', 'PL-300 August Update'],
  },
] as const;
