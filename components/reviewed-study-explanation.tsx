'use client';
import type { Question } from '@/lib/questions';
import { getReviewedLesson, reviewedChoiceTexts } from '@/lib/reviewed-lessons';
import { Badge } from '@/components/ui/badge';
import { ReviewedSchemaDiagram } from '@/components/reviewed-schema-diagram';
export function ReviewedStudyExplanation({ question }: { question: Question }) {
  const lesson = getReviewedLesson(question);
  if (!lesson) return null;
  const choices = reviewedChoiceTexts(question);
  const sections = [
    ['السؤال عايز إيه؟', lesson.translation],
    ['بصّ، الحكاية كده', lesson.story],
    ['مثال نمشيه سوا', lesson.example],
    [
      'نفكّر فيها إزاي؟',
      lesson.reasoning.map((line, i) => `${i + 1}. ${line}`).join('\n'),
    ],
    ['الإجابة وليه', lesson.answer],
    ['الحاجة اللي تاخد بالك منها', lesson.takeaway],
  ];
  return (
    <article
      dir="rtl"
      lang="ar-EG"
      className="space-y-4 text-right"
      data-reviewed-lesson={question.id}
    >
      <div className="flex flex-wrap gap-2">
        <Badge>
          {lesson.verdict === 'incomplete'
            ? 'المصدر ناقص؛ لا توجد إجابة محسومة'
            : 'شرح خاص بالسؤال، تمت مراجعته'}
        </Badge>
        <Badge variant="outline">
          {lesson.verdict === 'incomplete'
            ? 'شرح سبب عدم كفاية المعطيات'
            : lesson.verdict === 'conditional'
              ? 'فيه شرط لازم تقراه'
              : 'سبب الاختيار + مثال + تحليل البدائل'}
        </Badge>
      </div>
      <ReviewedSchemaDiagram id={question.id} />
      {sections.map(([title, body]) => (
        <section key={title} className="rounded-lg border bg-card p-4">
          <h3 className="mb-2 font-bold text-primary">{title}</h3>
          <p className="whitespace-pre-line break-words text-sm leading-8 [unicode-bidi:plaintext]">
            {body}
          </p>
        </section>
      ))}
      <section className="rounded-lg border bg-card p-4">
        <h3 className="mb-3 font-bold text-primary">
          ليه تختار ده وتستبعد الباقي؟
        </h3>
        <div className="space-y-4">
          {lesson.optionsAr.map((why, i) => (
            <div key={i} className="border-b pb-3 last:border-0">
              {choices[i] && (
                <p dir="ltr" lang="en" className="mb-2 text-left font-semibold">
                  {String.fromCharCode(65 + i)}. {choices[i]}
                </p>
              )}
              <p className="whitespace-pre-line text-sm leading-8 [unicode-bidi:plaintext]">
                {why}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-lg border bg-card p-4">
        <h3 className="mb-2 font-bold">مراجع المنطق المستخدم</h3>
        <p className="mb-3 text-xs text-muted-foreground">
          المراجع توثّق سلوك الميزة؛ اختيار إجابة السؤال استنتاج من شروطه، مش
          إجابة رسمية منشورة من مايكروسوفت للسؤال.
        </p>
        <div dir="ltr" className="space-y-2 text-left text-xs">
          {lesson.references.map((url) => (
            <a
              key={url}
              className="block break-all text-primary underline"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              {url}
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
