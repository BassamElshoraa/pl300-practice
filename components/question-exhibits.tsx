'use client';
import type { Question } from '@/lib/questions';
import { getQuestionPresentation } from '@/lib/question-presentation';
import { useLanguage } from '@/lib/i18n';
import { nativeExhibitData } from '@/lib/native-exhibit-data';
import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function hasNativeExhibits(question: Pick<Question, 'id'>) {
  return (
    Boolean(nativeExhibitData[question.id]?.length) &&
    !getQuestionPresentation(question)?.hideSourceImage
  );
}

export function QuestionExhibits({
  question,
}: {
  question: Pick<Question, 'id'>;
}) {
  const { tx } = useLanguage();
  const [zoom, setZoom] = useState<string | null>(null);
  const spec = getQuestionPresentation(question);
  const figures = hasNativeExhibits(question)
    ? nativeExhibitData[question.id]
    : [];
  if (!spec && !figures.length) return null;
  return (
    <div className="my-6 space-y-4" dir="ltr" lang="en">
      {spec?.warning && (
        <div
          role="note"
          className="rounded-lg border border-amber-500/60 bg-amber-500/10 p-4 leading-7"
        >
          <strong>
            {tx(
              'Incomplete source — do not infer an answer',
              'المصدر ناقص — لا نفترض إجابة',
            )}
          </strong>
          <p className="mt-2">{spec.warning}</p>
        </div>
      )}
      {spec?.tables?.map((table) => (
        <div
          key={table.caption}
          className="overflow-x-auto rounded-lg border bg-card"
        >
          <table className="w-full border-collapse text-left text-sm sm:text-base">
            <caption className="border-b bg-muted/40 p-3 text-left font-semibold">
              {table.caption}
            </caption>
            <thead className="bg-muted">
              <tr>
                {table.columns.map((c) => (
                  <th key={c} scope="col" className="border-b px-4 py-3">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr key={i} className="even:bg-muted/25">
                  {row.map((cell, j) => (
                    <td key={j} className="border-b px-4 py-3 last:border-b-0">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {figures.map((figure, i) => (
        <figure
          key={figure.src}
          className="overflow-hidden rounded-lg border bg-card"
        >
          <figcaption className="flex items-center justify-between gap-3 border-b bg-muted/40 px-4 py-3 text-sm">
            <span>
              {figure.caption ??
                tx(`Source exhibit ${i + 1}`, `الشكل الأصلي ${i + 1}`)}
            </span>
            <button
              type="button"
              className="rounded border px-3 py-1"
              onClick={() => setZoom(figure.src)}
            >
              {tx('Zoom / original size', 'تكبير / الحجم الأصلي')}
            </button>
          </figcaption>
          <Image
            unoptimized
            src={`${assetBase}${figure.src}`}
            alt={`Source exhibit ${i + 1} for ${question.id}`}
            width={figure.width}
            height={figure.height}
            loading="lazy"
            className="mx-auto h-auto max-h-[720px] max-w-full bg-white object-contain"
          />
        </figure>
      ))}
      <Dialog
        open={Boolean(zoom)}
        onOpenChange={(open) => {
          if (!open) setZoom(null);
        }}
      >
        <DialogContent className="max-h-[95vh] overflow-auto sm:max-w-[95vw]">
          <DialogHeader>
            <DialogTitle>
              {tx('Original source exhibit', 'الشكل الأصلي من المصدر')}
            </DialogTitle>
          </DialogHeader>
          {zoom && (
            <Image
              unoptimized
              src={`${assetBase}${zoom}`}
              width={figures.find((f) => f.src === zoom)?.width ?? 1200}
              height={figures.find((f) => f.src === zoom)?.height ?? 800}
              alt={tx('Full-size source exhibit', 'الشكل بالحجم الأصلي')}
              className="mx-auto h-auto min-w-[800px] max-w-none bg-white"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
