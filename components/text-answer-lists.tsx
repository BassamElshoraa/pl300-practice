'use client';
import { textAnswerData, TEXT_ANSWER_OFFSET } from '@/lib/text-answer-data';
import { useLanguage } from '@/lib/i18n';

export function TextAnswerLists({
  id,
  value,
  onChange,
}: {
  id: string;
  value: number[];
  onChange?: (answer: number[]) => void;
}) {
  const { tx } = useLanguage();
  const rows = textAnswerData[id];
  if (!rows) return null;
  return (
    <div dir="ltr" lang="en" className="rounded-lg border bg-card p-4">
      <h2 className="mb-4 font-bold">{tx('Answer Area', 'منطقة الإجابة')}</h2>
      {rows.map((row, index) => (
        <label
          key={row.label}
          className="mb-5 grid gap-3 text-sm leading-7 last:mb-0"
        >
          <span>{row.label}</span>
          <select
            disabled={!onChange}
            value={
              row.options[value[index] - TEXT_ANSWER_OFFSET] !== undefined
                ? value[index]
                : ''
            }
            onChange={(event) => {
              const next = rows.map((_, i) => value[i] ?? -1);
              next[index] = Number(event.target.value);
              onChange?.(next);
            }}
            className="min-h-12 w-full rounded border bg-background p-3 text-base"
          >
            <option value="">{tx('Select an answer', 'اختار إجابة')}</option>
            {row.options.map((option, i) => (
              <option key={option} value={TEXT_ANSWER_OFFSET + i}>
                {option}
              </option>
            ))}
          </select>
        </label>
      ))}
      {value.some((v) => v >= 0 && v < TEXT_ANSWER_OFFSET) && (
        <output className="mt-3 block text-sm text-muted-foreground">
          {tx(
            'This answer area was repaired. Please reselect your answers using the text options.',
            'تم إصلاح الاختيارات. اختار إجاباتك تاني من القوائم النصية.',
          )}
        </output>
      )}
    </div>
  );
}
