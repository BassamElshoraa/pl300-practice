import type { ReviewedLesson } from './types.ts';

/** Student-facing clarifications accompany the newly accepted complete variants. */
export function clarifyAcceptedAnswer(
  id: string,
  lesson: ReviewedLesson,
): ReviewedLesson {
  const notes: Record<string, string> = {
    'f1-023-22':
      'التصحيح يقبل الترتيبين: تحديد discount ثم استبدال الأخطاء ثم Decimal، أو تحديده ثم Decimal ثم استبدال الأخطاء. هنا الأخطاء موجودة بالفعل؛ النص العادي N/A قبل التحويل حالة مختلفة.',
    'f1-066-65':
      'الترتيب مش حفظ: لازم إثراء Region_Manager بجدول Manager يسبق دمجه داخل Sales_Region. دمج Sales_Manager مستقل، فيصح قبلهما أو بينهما أو بعدهما. التصحيح يقبل الترتيبات الثلاثة دي فقط، مش أي ترتيب عشوائي.',
    'f2-157-426':
      'التصحيح يقبل الترتيبات الثلاثة التي تحترم الاعتماد: إثراء Region_Manager من Manager قبل استخدامه في Sales_Region، مع حرية وضع دمج Sales_Manager قبل الخطوتين أو بينهما أو بعدهما.',
    'f1-144-143':
      'مقبول IF ثم HIGH ثم MEDIUM، ومقبول IF.EAGER ثم HIGH ثم MEDIUM؛ القيم الناتجة نفسها هنا. ده تصحيح لخانات القالب مع وجود قيمة Qualification واحدة، مش إقرار إن مرجع عمود عارٍ يعمل كـmeasure في أي سياق تجميع.',
    'f1-278-277':
      'لنسبة الأخطاء اختَر Column quality. لعدد الفارغ اختَر Column profile، أو Column quality مع المرور على مؤشر الجودة؛ التوثيق يعرض العدد والنسبة في نافذة المرور، ولذلك الاختياران مقبولان للخانة الثانية.',
    'f1-317-316':
      'Finance تستخدم Analyze in Excel. Corp عندها Read وReshare وBuild؛ تقدر تمنح Read أو Build عبر مسار المشاركة المدعوم. الاتنين مقبولين في الخانة الثانية، لكن لا يحق لها حذف جدول أو تعديل بنية الموديل.',
    'f1-326-325':
      'Finance تستخدم Analyze in Excel. Corp تجمع Read وReshare وBuild، وبالتالي منح Read أو منح Build إجابتان مدعومتان، مش Build وحدها. مفيش Write يسمح بحذف جدول.',
    'f1-366-365':
      'مقبول Viewer مع Build على P&L فقط، ومقبول App access مع نفس Build المحدد. امنع Build على BalanceSheet ولا تمنح Reshare. Member مش بديل لأنه يسمح بالتحرير ويتجاوز قيود RLS المقصودة.',
    'f2-281-468':
      'بعد الاتصال بـFolder، حذف Content وتوسيع Attributes ينفع بأي ترتيب؛ التصحيح يقبل الترتيبين كاملين. لا نحذف Attributes ولا نعمل Combine للمحتوى لأنه عكس المطلوب.',
  };
  const note = notes[id];
  if (!note) return lesson;
  const optionsAr = [...lesson.optionsAr];
  if (id === 'f1-278-277')
    optionsAr[5] =
      'مقبول أيضًا: Column quality يعرض عدد Empty ونسبته عند المرور على المؤشر؛ Profile يظل عرض الإحصاءات التفصيلي المباشر.';
  if (id === 'f1-317-316' || id === 'f1-326-325')
    optionsAr[4] =
      'صحيح أيضًا: Reshare يتيح منح Read في المشاركة. لا يصح رفضه لمجرد أن مفتاح المصدر اختار Build.';
  return {
    ...lesson,
    answer: note,
    optionsAr,
    reasoning: [...lesson.reasoning, note],
  };
}
