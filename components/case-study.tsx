'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { QuestionExhibits } from '@/components/question-exhibits';

const isHeading = (text: string) =>
  /^(?:General Overview|Overview|Business Issues|Existing Environment(?:\.\s+.+)?|Requirements(?:\.\s+.+)?|Data and Sources|Balance Sheet Data|Product Catalog Data|Planned Changes|Technical Requirements|Security Requirements|Report Requirements)(?:\s*-\s*)?$/i.test(
    text.trim(),
  );

/** One shared, readable case-study view for practice and answer review. */
export function CaseStudy({ text }: { text: string }) {
  const { tx } = useLanguage();
  const [expanded, setExpanded] = useState(true);
  const normalized = text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) =>
      isHeading(line) || line.trim().endsWith('Case Study')
        ? `\n${line.trim()}\n`
        : line,
    )
    .join('\n');
  const paragraphs = normalized
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  return (
    <section
      className="case-study mt-6 rounded-xl border border-primary/25 bg-card"
      aria-label={tx('Case study', 'الكيس ستادي')}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-accent/40 px-5 py-4">
        <h2 className="font-bold">
          {tx('Case study and requirements', 'الكيس ستادي والمتطلبات')}
        </h2>
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          className="rounded border px-3 py-2 text-sm hover:bg-accent"
        >
          {expanded
            ? tx('Collapse context', 'إخفاء السياق')
            : tx('Read full context', 'اقرأ السياق كاملًا')}
        </button>
      </div>
      {expanded && (
        <div
          dir="ltr"
          lang="en"
          className="case-study-body space-y-4 p-5 text-left text-base leading-8 sm:p-7"
        >
          {paragraphs.map((part, index) => {
            const heading =
              part.length < 115 &&
              (isHeading(part) || part.endsWith('Case Study'));
            return heading ? (
              <h3
                key={index}
                className="border-b pb-2 pt-2 font-bold text-primary"
              >
                {part}
              </h3>
            ) : (
              <p key={index} className="whitespace-pre-line break-words">
                {part}
              </p>
            );
          })}
          {['Northwind Traders', 'Litware, Inc.', 'Contoso, Ltd.'].some(
            (name) => text.includes(name),
          ) && (
            <details className="rounded-lg border p-3">
              <summary className="cursor-pointer font-semibold">
                {tx(
                  'Original case tables and schemas — open to inspect',
                  'جداول ومخططات الكيس ستادي الأصلية — اضغط للعرض',
                )}
              </summary>
              <QuestionExhibits
                question={{
                  id: text.includes('Northwind Traders')
                    ? 'case-northwind'
                    : text.includes('Litware, Inc.')
                      ? 'case-litware'
                      : 'case-contoso',
                }}
              />
            </details>
          )}
        </div>
      )}
    </section>
  );
}
