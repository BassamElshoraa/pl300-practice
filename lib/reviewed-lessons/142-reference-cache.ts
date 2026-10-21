import type { ReviewedLesson } from './types.ts';
export const referenceCacheLessons: Record<string, ReviewedLesson> = {
  'f1-142-141': {
    translation:
      'Query1 تحمل العملاء، وQuery2 وQuery3 وQuery4 تشير إليها. التحديث بطيء. تريد تحسين زمنه مع تقليل التكلفة. ما الأنسب من الخيارات؟',
    story:
      'ثلاثة موظفين بياخدوا وصفة تجهيز العملاء من نفس الورقة. ده مش معناه إنهم بياخدوا طبقًا جاهزًا من الثلاجة؛ كل واحد ممكن ينفذ الوصفة ويطلب الداتا تاني. الـDataflow تجهز نتيجة محفوظة يقرؤوها.',
    reasoning: [
      'Reference تعيد استخدام خطوات الاستعلام، لكنها لا تضمن نتيجة واحدة مشتركة بين الفروع.',
      'Table.Buffer تخزن داخل تنفيذ الاستعلام الجاري فقط. Buffer أثناء تنفيذ Query2 ليست cache مشتركة تستخدمها Query3 وQuery4؛ وقد يزيد التخزين المتكرر ووقف folding البطء.',
      'Dataflow entity توفر نتيجة persisted للتحضير يقرأها النموذج بدل إعادة العمل على المصدر الأصلي لكل فرع. Microsoft توصي بها لنفس السيناريو.',
      'اختر مسار dataflow ضمن الترخيص المتاح؛ Gen2 تتطلب Fabric، ويوجد المسار التقليدي لمستخدمي Pro/PPU المناسبين. لا نفترض كل Dataflow مجانية، ولا نحتاج ترقية السعة لمجرد تجاوز إعادة التنفيذ.',
    ],
    answer:
      'Reconfigure Query1 as a dataflow entity، الاختيار الثالث C. تم تصحيح Table.Buffer القديمة.',
    correctIndices: [2],
    example:
      'لو استخراج العملاء يستغرق دقيقتين، كل فرع قد يعيد كلفة المصدر. Dataflow تتحدث وتخزن جدول العملاء؛ الفروع تقرأ هذه النتيجة. نسق تحديث النموذج بعدها حتى لا يقرأ نسخة قديمة.',
    optionsAr: [
      'Table.Buffer لا تنشئ cache مشتركة بين الاستعلامات المرجعية المستقلة. قد تساعد داخل تنفيذ واحد، لكنها ليست علاج هذه المشكلة.',
      'Duplicate تنسخ المنطق ولا تنشئ نتيجة محفوظة مشتركة، وتزيد مواضع صيانة الخطوات.',
      'صحيح: Dataflow توفر ناتج تحضير محفوظًا قابلًا لإعادة الاستخدام. تحقق من الترخيص وجدولة تحديث المصدر والنموذج.',
      'زيادة Capacity قد تكلف أكثر ولا تعالج سبب تكرار استخراج Query1، فلا تحقق الحل الأقل كلفة للمشكلة.',
    ],
    takeaway:
      'Reference تشارك المنطق، وTable.Buffer تخزن داخل التنفيذ، وDataflow تحفظ نتيجة لإعادة استخدامها. مش نفس معنى cache.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/guidance/power-query-referenced-queries',
      'https://learn.microsoft.com/en-us/powerquery-m/table-buffer',
    ],
    verdict: 'confirmed',
  },
};
