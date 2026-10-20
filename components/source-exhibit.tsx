'use client';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';
import type { Question } from '@/lib/questions';
export function SourceExhibit({ question }: { question: Question }) {
  const { tx } = useLanguage();
  if (!question.image) return null;
  const image = (
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${question.image}`}
      alt={`Original source exhibit for ${question.id}`}
      width={1000}
      height={1200}
      unoptimized
      className="h-auto w-full rounded border bg-white object-contain"
    />
  );
  return question.context ? (
    <details className="my-5 rounded-lg border bg-card">
      <summary className="cursor-pointer p-4 font-semibold">
        {tx(
          'Original source page (optional reference)',
          'صفحة المصدر الأصلية — مرجع اختياري',
        )}
      </summary>
      {image}
    </details>
  ) : (
    image
  );
}
