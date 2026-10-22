import type { Question } from './questions';
import { answerCompletenessCorrections } from './answer-completeness.ts';
import { getReviewedLesson } from './reviewed-lessons.ts';

export type AnswerAuditStatus =
  | 'independently-reviewed'
  | 'corrected'
  | 'flawed-source'
  | 'incomplete-source'
  | 'outdated'
  | 'source-key';

export type AnswerAudit = {
  status: AnswerAuditStatus;
  reviewedAnswer?: string;
  originalAnswer?: string;
  reason?: string;
  reasonAr?: string;
  evidence?: Array<{ label: string; url: string }>;
  suppressSourceAnswerImage?: boolean;
  excluded?: boolean;
};

export type QuestionCorrection = AnswerAudit & {
  correct?: number[];
  choices?: string[];
  type?: Question['type'];
  promptAppend?: string;
  explanation?: string;
};

const explicitlyReviewedIds = new Set([
  'f1-011-10',
  'f1-020-19',
  'f1-021-20',
  'f1-023-22',
  'f1-028-27',
  'f1-037-36',
  'f1-047-46',
  'f1-052-51',
  'f1-053-52',
  'f1-058-57',
  'f1-062-61',
  'f1-066-65',
  'f1-075-74',
  'f1-122-121',
  'f1-142-141',
  'f1-163-162',
  'f1-174-173',
  'f1-178-177',
  'f1-181-180',
  'f1-222-221',
  'f1-340-339',
  'f1-355-354',
  'f1-359-358',
  'f1-362-361',
  'f1-364-363',
]);

const corrections: Record<string, QuestionCorrection> = {
  ...answerCompletenessCorrections,
  'f1-052-51': {
    status: 'corrected',
    correct: [2],
    reviewedAnswer:
      'Summarize Invoice by Product, Sales person, Calendar, and Customer before loading it.',
    originalAnswer:
      'Store historical Invoice data in DirectQuery and hot data in Import partitions.',
    reason:
      'Pre-aggregating the 12-million-row fact table reduces its row count and memory footprint while preserving the grain needed by the listed dimensions. It also keeps the model in Import mode for the fastest user queries. The source answer describes a reversed and unnecessarily complex hybrid pattern.',
    reasonAr:
      'نلخص جدول Invoice قبل تحميله حسب Product وSales person وCalendar وCustomer. كده نقلل عدد صفوف جدول الـfact واستهلاك الذاكرة، ونحتفظ بموديل Import سريع للمستخدم. إجابة المصدر اقترحت Hybrid مع وضع Historical في DirectQuery وHot في Import، وده ترتيب معكوس عن النمط المعتاد وحل أعقد من المطلوب.',
    explanation:
      'Independent correction:\n\nSummarize the Invoice fact table by Product, Sales person, Calendar, and Customer before loading it. The report needs analysis at this summarized grain, so the 12 million detailed rows are unnecessary. Fewer imported rows resolve the refresh memory failure and normally provide the lowest query latency. Merging the salesperson dimension into the fact increases duplication, while switching the fact to DirectQuery trades the memory problem for slower user queries. The proposed hot-Import/historical-DirectQuery option is both more complex and the reverse of the usual Hybrid-table pattern.',
    suppressSourceAnswerImage: true,
    evidence: [
      {
        label: 'Power BI import model data reduction techniques',
        url: 'https://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction',
      },
    ],
  },
  'f1-028-27': {
    status: 'corrected',
    reviewedAnswer:
      'Report file: Live connection. Semantic model file: Import.',
    originalAnswer: 'Report file: Import. Dataset file: DirectQuery.',
    reason:
      'Excel files are imported into the semantic model; this scenario does not support DirectQuery to Excel. The separate report should use a live connection to the published semantic model.',
    reasonAr:
      'ملف الموديل هو اللي يستورد ملفي Excel ويجمع الجدولين، لذلك وضعه Import. أما ملف التقرير المنفصل فلا يحمل نسخة أخرى من الداتا؛ يتصل Live بالموديل المنشور. إجابة المصدر عكست دور الملفين واستخدمت DirectQuery مع Excel بشكل غير صحيح.',
    explanation:
      'Independent correction:\n\nReport file: Live connection.\n\nSemantic model file: Import.\n\nThe semantic model imports and combines the Excel workbooks. After it is published, the separate thin-report PBIX connects live to that semantic model. DirectQuery is not an Excel storage mode in this scenario.',
    suppressSourceAnswerImage: true,
    evidence: [
      {
        label: 'Power Query Excel connector',
        url: 'https://learn.microsoft.com/en-us/power-query/connectors/excel',
      },
      {
        label: 'Live connection vs DirectQuery',
        url: 'https://learn.microsoft.com/en-us/power-bi/connect-data/service-live-connect-dq-datasets',
      },
    ],
  },
  'f1-047-46': {
    status: 'corrected',
    reviewedAnswer: 'Identify: Column quality. Resolve: Replace Errors.',
    originalAnswer: 'Column quality and Remove Empty.',
    reason:
      'Column quality identifies Error cells. Remove Empty handles blank/null values, not errors. Replace Errors directly handles the problem described.',
    reasonAr:
      'Column quality يوضح نسبة Valid وError وEmpty، وده مناسب لاكتشاف المشكلة. لكن Remove Empty يعالج القيم الفارغة، بينما السؤال بيتكلم عن Error values؛ لذلك الإجراء الصحيح هو Replace Errors.',
    explanation:
      'Independent correction:\n\nTo identify the issue: Column quality.\n\nTo resolve it: Replace Errors.\n\nColumn quality profiles valid, error, and empty values. Replace Errors changes the actual error cells, while Remove Empty only removes blank or null rows.',
    suppressSourceAnswerImage: true,
    evidence: [
      {
        label: 'Power Query: Dealing with errors',
        url: 'https://learn.microsoft.com/en-us/power-query/dealing-with-errors',
      },
    ],
  },
  'f1-058-57': {
    status: 'corrected',
    correct: [0, 4],
    reviewedAnswer:
      'Remove rows where Status is Canceled, and remove Canceled Date.',
    originalAnswer:
      'Remove rows where Status is Canceled, and split Sales_Date into date and time.',
    reason:
      'Filtering unused rows and removing an unused column both reduce model size. Splitting Sales_Date keeps the time values in a second column unless that column is removed in another step.',
    reasonAr:
      'التحليل يستخدم صفوف Finished فقط، فحذف Canceled يقلل عدد الصفوف. وبعد حذف الصفوف الملغاة يصبح Canceled Date غير مستخدم ويمكن حذفه. أما Split لعمود Sales_Date فيُبقي جزء الوقت في عمود جديد، فلا يحقق تقليلًا كاملًا وحده.',
    explanation:
      'Independent correction: A and E. Filter out Canceled rows and remove the unused Canceled Date column. Power BI import models are reduced by horizontal filtering (fewer rows) and vertical filtering (fewer unused columns). Splitting Sales_Date would retain both date and time unless a separate removal step followed.',
    evidence: [
      {
        label: 'Data reduction techniques for Import models',
        url: 'https://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction',
      },
    ],
  },
  'f1-062-61': {
    status: 'flawed-source',
    type: 'single',
    correct: [0],
    reviewedAnswer:
      'Create one dynamic role that filters Country[Manager_Email] with USERNAME (or UPN in the service).',
    originalAnswer:
      'A dynamic USERNAME role plus Apply security filter in both directions.',
    reason:
      'The existing active one-to-many relationships already propagate the Country filter to the transaction tables. The source asks for two actions, but no listed second action is technically required.',
    reasonAr:
      'الرول الديناميكي الواحد يحقق تقليل عدد الـRoles ويربط المدير بدولته. العلاقات النشطة الظاهرة تنقل فلتر Country إلى جداول العمليات بالفعل، لذلك تفعيل Security filter in both directions ليس خطوة لازمة. السؤال الأصلي يطلب اختيارين لكن لا يعرض خطوة ثانية ضرورية.',
    promptAppend:
      '\n\nINDEPENDENT REVIEW NOTE: The source asks for two selections, but only one listed action is technically required. Select the required action.',
    explanation:
      'Independent review: The technically required action is to create one dynamic role that filters Country[Manager_Email] with USERNAME/USERPRINCIPALNAME. The existing active one-to-many relationships propagate that filter. Applying the security filter in both directions is not required here, so the original source item is flawed.',
    evidence: [
      {
        label: 'Row-level security in Power BI',
        url: 'https://learn.microsoft.com/en-us/power-bi/desktop-rls',
      },
      {
        label: 'RLS guidance',
        url: 'https://learn.microsoft.com/en-us/power-bi/guidance/rls-guidance',
      },
    ],
  },
  'f1-163-162': {
    status: 'corrected',
    reviewedAnswer:
      'Products → OrderHistory: one-to-many. Date → OrderHistory: one-to-many.',
    originalAnswer:
      'Products → OrderHistory: one-to-many. OrderHistory → Date: one-to-one.',
    reason:
      'Product and Date are dimensions with unique keys. Many OrderHistory fact rows can share the same product and the same date.',
    reasonAr:
      'Products وDate جداول أبعاد والمفتاح فيها فريد، لكن نفس المنتج ونفس التاريخ ممكن يتكرروا في عدد كبير من صفوف OrderHistory. لذلك جدول الـFact يكون ناحية الـmany في العلاقتين.',
    explanation:
      'Independent correction:\n\nProducts (1) → OrderHistory (*).\n\nDate (1) → OrderHistory (*).\n\nA dimension key is unique, while many fact rows can reference the same product or date. A date appearing once in each fact row does not make the relationship one-to-one.',
    suppressSourceAnswerImage: true,
    evidence: [
      {
        label: 'Dimensional model relationship tutorial',
        url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-dimensional-model-report',
      },
    ],
  },
  'f1-174-173': {
    status: 'corrected',
    correct: [1],
    reviewedAnswer: 'Use DirectQuery connectivity mode.',
    originalAnswer: 'Build a composite model.',
    reason:
      'The scenario has one high-volume Eventhouse and requires near-real-time reporting with minimal development. DirectQuery meets those requirements directly; a composite model adds complexity only when mixed sources or storage modes are needed.',
    reasonAr:
      'المصدر واحد وهو Eventhouse، والداتا كبيرة وسريعة والمطلوب Near Real Time بأقل مجهود تطوير. DirectQuery يقرأ من المصدر وقت الاستعلام. لا يوجد مصدر أو وضع تخزين ثانٍ يبرر بناء Composite model.',
    explanation:
      'Independent correction: B. Use DirectQuery connectivity mode. Fabric Eventhouse/KQL data is designed for high-volume near-real-time analysis, and DirectQuery avoids importing the raw event stream. A composite model is unnecessary when the scenario does not require mixed sources or storage modes.',
    evidence: [
      {
        label: 'Real-Time Intelligence sample with DirectQuery',
        url: 'https://learn.microsoft.com/en-us/power-bi/connect-data/real-time-intelligence-sample',
      },
    ],
  },
  'f1-178-177': {
    status: 'corrected',
    reviewedAnswer:
      'DimDate is a role-playing dimension. Its default filter reaches FactOrderDetails through the active OrderDate relationship.',
    originalAnswer:
      'Role-playing dimension; DimDate does not filter FactOrderDetails.',
    reason:
      'The exhibit shows OrderDate as the active relationship. Active relationships propagate filters automatically; the other date relationships remain inactive unless activated by DAX.',
    reasonAr:
      'DimDate فعلًا Role-playing dimension لأنها مرتبطة بأكثر من تاريخ. لكن علاقة OrderDate هي النشطة في الرسم، ولذلك فلتر DimDate ينتقل تلقائيًا إلى FactOrderDetails من خلالها. العلاقات الأخرى لا تعمل إلا عند تفعيلها في Measure.',
    explanation:
      'Independent correction: DimDate is a role-playing dimension. The active OrderDate relationship is the default filter path from DimDate to FactOrderDetails. ShippedDate and RequiredDate remain inactive unless a measure activates them with USERELATIONSHIP.',
    suppressSourceAnswerImage: true,
    evidence: [
      {
        label: 'Active and inactive relationship guidance',
        url: 'https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive',
      },
    ],
  },
  'f1-222-221': {
    status: 'corrected',
    correct: [3],
    reviewedAnswer: 'Key influencers.',
    originalAnswer: 'Decomposition tree.',
    reason:
      'Key influencers automatically identifies drivers and Top segments. A decomposition tree supports guided drill-down, but the user still leads the exploration.',
    reasonAr:
      'السؤال يطلب تحديد العوامل والشرائح تلقائيًا وبأقل مجهود. Key influencers يرتب المؤثرات ويولد Top segments تلقائيًا. Decomposition tree أداة استكشاف قوية، لكن المستخدم هو اللي يقود التفريع.',
    explanation:
      'Independent correction: D. Key influencers. This AI visual ranks the factors that drive the selected metric and automatically discovers Top segments. A decomposition tree is better for interactive, user-led drill-down rather than automatic segment discovery.',
    evidence: [
      {
        label: 'Key influencers visual',
        url: 'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers',
      },
    ],
  },
  'f1-340-339': {
    status: 'corrected',
    reviewedAnswer:
      'Publish an app for management and accounting, configure separate audiences, and grant Build only on the Expenses semantic model when required.',
    originalAnswer:
      'Publish an app for management; give accounting the Viewer workspace role.',
    reason:
      'A Viewer workspace role exposes the workspace more broadly than required. App audiences can limit visible content, while Build permission can be granted only on the required semantic model.',
    reasonAr:
      'Viewer على الـworkspace يفتح نطاق محتوى أكبر من المطلوب. الأفضل نشر App بــAudience منفصلة لكل إدارة، ثم منح Accounting صلاحية Build على Expenses semantic model فقط لو مطلوب منها بناء تقارير.',
    explanation:
      'Independent correction:\n\nManagement: Publish an app.\n\nAccounting: Publish the app with a dedicated audience, expose only the required report, and grant Build only on the Expenses semantic model when needed. This follows least privilege more closely than assigning the Viewer workspace role.',
    suppressSourceAnswerImage: true,
    evidence: [
      {
        label: 'Content distribution and sharing guidance',
        url: 'https://learn.microsoft.com/en-us/power-bi/guidance/powerbi-implementation-planning-content-distribution-sharing',
      },
      {
        label: 'Semantic model permissions',
        url: 'https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-permissions',
      },
    ],
  },
  'f1-053-52': {
    status: 'corrected',
    correct: [1, 4],
    reviewedAnswer: 'Remove duplicate values and apply Capitalize Each Word.',
    originalAnswer: 'Remove duplicate values and replace the empty fields.',
    reason:
      'Power Query duplicate detection is case-sensitive. The exhibit contains country names that differ only by letter case, so the text must be normalized before duplicates are removed. Replacing blanks does not merge those values.',
    reasonAr:
      'Power Query يعتبر Afghanistan وafghanistan قيمتين مختلفتين عند إزالة التكرار. لذلك نوحّد شكل الكتابة أولًا باستخدام Capitalize Each Word، ثم نحذف القيم المكررة. معالجة الفراغات لا تحل اختلاف حالة الحروف.',
    explanation:
      'Independent correction: B and E. First normalize the country names with Capitalize Each Word, then remove duplicates. Power Query duplicate comparison is case-sensitive, so removing duplicates before normalizing case can leave visually duplicated countries. Replacing empty fields does not solve the case mismatch shown in the exhibit.',
    evidence: [
      {
        label: 'Power Query: Work with duplicates',
        url: 'https://learn.microsoft.com/en-us/power-query/working-with-duplicates',
      },
    ],
  },
  'f1-144-143': {
    status: 'flawed-source',
    reviewedAnswer: 'IF, HIGH, MEDIUM (IF.EAGER would return the same labels).',
    originalAnswer: 'IF.EAGER, HIGH, MEDIUM.',
    reason:
      'Nothing in the scenario requires eager evaluation. IF and IF.EAGER can return the same classification; IF is the conventional choice, but neither function is universally faster. The item is ambiguous by output alone and its measure context needs clarification.',
    reasonAr:
      'لا يوجد شرط يفضل تقييم الفرعين معًا. IF وIF.EAGER قد يعطيان نفس التصنيف؛ IF اختيار تقليدي هنا، لكن لا نضمن أنه أسرع دائمًا. يلزم كذلك توضيح سياق العمود عند استخدامه فيmeasure.',
    explanation: answerCompletenessCorrections['f1-144-143'].explanation,
    suppressSourceAnswerImage: true,
    evidence: [
      {
        label: 'DAX IF function',
        url: 'https://learn.microsoft.com/en-us/dax/if-function-dax',
      },
      {
        label: 'DAX IF.EAGER function',
        url: 'https://learn.microsoft.com/en-us/dax/if-eager-function-dax',
      },
    ],
  },
  'f1-159-158': {
    status: 'corrected',
    reviewedAnswer: 'CALCULATE and KEEPFILTERS.',
    originalAnswer: 'CALCULATETABLE and KEEPFILTERS.',
    reason:
      'The expression evaluates the scalar [Sales] measure. CALCULATE accepts a scalar expression, while CALCULATETABLE requires a table expression.',
    reasonAr:
      'المطلوب حساب Measure اسمها [Sales]، ودي قيمة Scalar وليست جدولًا. لذلك نستخدم CALCULATE. أما CALCULATETABLE فلا يقبل في أول باراميتر إلا تعبيرًا يرجع جدولًا. KEEPFILTERS صحيح لأنه يضيف شرط اللون الأزرق مع الحفاظ على الفلتر الحالي.',
    explanation:
      'Independent correction: CALCULATE and KEEPFILTERS. CALCULATE evaluates the scalar [Sales] measure in a modified filter context. KEEPFILTERS intersects the blue-unit condition with the existing filter context. CALCULATETABLE is invalid here because its first argument must return a table.',
    suppressSourceAnswerImage: true,
    evidence: [
      {
        label: 'DAX CALCULATE function',
        url: 'https://learn.microsoft.com/en-us/dax/calculate-function-dax',
      },
      {
        label: 'DAX CALCULATETABLE function',
        url: 'https://learn.microsoft.com/en-us/dax/calculatetable-function-dax',
      },
    ],
  },
  'f1-278-277': {
    status: 'corrected',
    reviewedAnswer:
      'Percentage of errors: Column quality. Count of empty values: Column profile.',
    originalAnswer: 'Column quality for both requirements.',
    reason:
      'Column quality shows percentages for valid, error, and empty values. Column profile provides detailed statistics, including the count of empty values.',
    reasonAr:
      'Column quality يعرض النسب المئوية لـValid وError وEmpty، لذلك نستخدمه لنسبة الأخطاء. أما العدد الفعلي للقيم الفارغة فيظهر ضمن إحصاءات Column profile التفصيلية.',
    explanation:
      'Independent correction:\n\nPercentage of error values: Column quality.\n\nCount of empty values: Column profile.\n\nColumn quality is the quick percentage bar. Column profile supplies detailed column statistics and value counts.',
    suppressSourceAnswerImage: true,
    evidence: [
      {
        label: 'Power Query data profiling tools',
        url: 'https://learn.microsoft.com/en-us/power-query/data-profiling-tools',
      },
    ],
  },
  'f1-289-288': {
    status: 'corrected',
    correct: [3],
    reviewedAnswer: 'RUNNINGSUM([Sales]).',
    originalAnswer: "CALCULATE([Sales], 'Date'[Year] <= MAX('Date'[Year])).",
    reason:
      'The question explicitly asks for a visual calculation. RUNNINGSUM is the visual-calculation function designed for a cumulative total over the visual axis.',
    reasonAr:
      'السؤال يقول صراحة Visual Calculation، وفي هذا النوع الدالة المباشرة للـCumulative Total هي RUNNINGSUM([Sales]). صيغة CALCULATE تخص Measure تقليدية داخل الموديل وليست الإجابة المطلوبة هنا.',
    explanation:
      'Independent correction: D. RUNNINGSUM([Sales]). A visual calculation runs on the visual matrix, and RUNNINGSUM adds the current Sales value to the preceding values on the axis. The CALCULATE option is a traditional model-measure pattern and does not answer the requested visual-calculation task.',
    evidence: [
      {
        label: 'Visual calculations overview',
        url: 'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-visual-calculations-overview',
      },
    ],
  },
  'f1-327-326': {
    status: 'corrected',
    correct: [2],
    reviewedAnswer: 'Configure a Microsoft Power Automate flow.',
    originalAnswer: 'Configure a scheduled refresh.',
    reason:
      'Classic semantic-model scheduled refresh supports daily or weekly schedules, not an exact first-day-of-month recurrence. Power Automate can trigger the refresh on that monthly schedule.',
    reasonAr:
      'الـScheduled refresh التقليدي للـsemantic model يوفّر تكرارًا يوميًا أو أسبوعيًا، وليس أول يوم من كل شهر مباشرة. Power Automate يقدر يعمل Trigger شهري ثم يشغّل Refresh للموديل.',
    explanation:
      'Independent correction: C. Use a Microsoft Power Automate flow with a monthly recurrence on day 1, followed by the Power BI refresh action. Incremental refresh controls partitions, the gateway provides connectivity, and the classic scheduled-refresh settings do not directly express a first-day-of-month schedule.',
    evidence: [
      {
        label: 'Power BI data refresh',
        url: 'https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-data',
      },
    ],
  },
  'f2-001-369': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The question refers to case-study reporting requirements that are absent from both the simulator prompt and the supplied PDF page.',
    reasonAr:
      'السؤال يعتمد على متطلبات Case Study غير موجودة في نص الموقع ولا في صفحة الـPDF المرفقة، لذلك لا يمكن للطالب استنتاج الإجابة بثقة.',
  },
  'f2-004-372': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The required case-study model, roles, and answer actions are missing from the supplied source.',
    reasonAr:
      'بيانات الـCase Study وخيارات الترتيب اللازمة للحل غير موجودة في المصدر، فتم استبعاده بدل عرضه كسؤال تخمين.',
  },
  'f2-007-375': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The item asks which visuals meet reporting goals, but those goals are not included in the supplied source.',
    reasonAr:
      'السؤال يطلب اختيار Visuals تحقق Reporting Goals غير مذكورة، لذلك لا توجد إجابة قابلة للتحقق من النص المتاح.',
  },
  'f2-008-376': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The case-study report requirements needed to choose the filter are missing.',
    reasonAr:
      'متطلبات تقرير Top Customers الأصلية غير معروضة للطالب، فالإجابة تصبح مبنية على شرح المصدر لا على السؤال نفسه.',
  },
  'f2-009-377': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The Customer Details worksheet, Orders data, and report requirements are absent.',
    reasonAr:
      'تفاصيل الجداول ومتطلبات التقرير التي تحدد العلاقات غير موجودة، لذلك السؤال غير مكتمل.',
  },
  'f2-010-378': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The warehouse notification requirements are absent from the supplied source.',
    reasonAr:
      'متطلبات الإشعار الخاصة بالمخزن غير موجودة، فلا يمكن تحديد الحل المطلوب من نص السؤال.',
  },
  'f2-010-379': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The late-order definition and full case-study context are not included in the supplied source.',
    reasonAr:
      'تعريف Late Order وسياق الـCase Study غير موجودين في السؤال المعروض، لذلك لا يمكن بناء الـMeasure بشكل مؤكد.',
  },
  'f2-012-380': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The source omits the data-volume and connectivity requirements needed to choose a model mode.',
    reasonAr:
      'اختيار Import أو DirectQuery أو Composite يعتمد على حجم البيانات ومتطلبات الاتصال، وهذه التفاصيل غير موجودة.',
  },
  'f2-041-391': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The supplied question image omits both the Dashboard and Mobile exhibits, and the answer image contains only a vendor placeholder.',
    reasonAr:
      'صورة المصدر لا تحتوي Dashboard exhibit ولا Mobile exhibit، وصورة الإجابة مجرد علامة Mastered وليست حلًا؛ لذلك يستحيل تحديد خطوات التصميم.',
  },
  'f2-066-399': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The source stops after listing Date-table columns and never includes the task, answer area, or answer.',
    reasonAr:
      'المصدر يتوقف بعد عرض أعمدة جدول Date ولا يعرض المطلوب أو منطقة الإجابة أو الحل الفعلي.',
  },
  'f2-095-406': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The RLS scenario, model exhibit, answer choices, and real answer are missing; the PDF shows only a vendor placeholder.',
    reasonAr:
      'سيناريو RLS ورسم الموديل والاختيارات والإجابة الفعلية غير موجودة؛ الملف يعرض فقط علامة Mastered.',
  },
  'f2-193-439': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The prompt ends before the calculated-column requirements, and the source includes no answer area or real solution.',
    reasonAr:
      'السؤال مقطوع قبل عرض شروط الـCalculated Column، ولا توجد منطقة إجابة أو صيغة DAX صحيحة في المصدر.',
  },
  'f2-199-442': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The workspace-permission answer area and source answer are missing, so the exact role/permission combination cannot be matched to the original item.',
    reasonAr:
      'منطقة إجابة صلاحيات الـworkspaces والإجابة الأصلية غير موجودتين، لذلك لا يمكن مطابقة الأدوار المطلوبة مع خانات السؤال الأصلي.',
  },
  'f2-236-455': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The late-order definition, model context, answer choices, and actual answer image are absent from the supplied source.',
    reasonAr:
      'تعريف Late Order وسياق الموديل واختيارات DAX وصورة الحل الفعلية غير موجودة في المصدر.',
  },
  'f2-006-374': {
    status: 'corrected',
    correct: [1],
    reviewedAnswer:
      "CALCULATE(SUM(BalanceSheet[BalanceAmount]), LASTDATE('Date'[Date])).",
    originalAnswer:
      "CALCULATE(SUM(BalanceSheet[BalanceAmount]), DATESQTD('Date'[Date])).",
    reason:
      'A balance-sheet ending balance is semi-additive: it should use the balance at the last date in the period, not sum balances across all quarter-to-date dates.',
    reasonAr:
      'الرصيد الختامي Snapshot وليس حركة تتجمع عبر الأيام. DATESQTD ستجمع أرصدة أيام الربع كلها وتضخم النتيجة، بينما LASTDATE تحسب الرصيد عند آخر تاريخ في الفترة.',
    explanation:
      "Independent correction: B. CALCULATE(SUM(BalanceSheet[BalanceAmount]), LASTDATE('Date'[Date])). Ending balance is a semi-additive calculation: aggregate accounts for the last date in the selected quarter. DATESQTD is appropriate for additive flows, not snapshot balances.",
    evidence: [
      {
        label: 'DAX LASTDATE function',
        url: 'https://learn.microsoft.com/en-us/dax/lastdate-function-dax',
      },
    ],
  },
  'f2-018-382': {
    status: 'corrected',
    correct: [0],
    reviewedAnswer: 'Yes.',
    originalAnswer: 'No.',
    reason:
      'Sharing the selected reports and dashboard with a Microsoft Entra group grants that group read access to exactly those items.',
    reasonAr:
      'إنشاء Microsoft Entra group تضم المستخدمين ثم مشاركة العناصر المحددة معها يحقق Read access للداشبورد والتقارير المطلوبة فقط، وبالتالي الحل يحقق الهدف.',
    explanation:
      'Independent correction: Yes. Directly sharing the selected reports and dashboard with a Microsoft Entra security group grants the group access to those items without exposing the other workspace content.',
    evidence: [
      {
        label: 'Share Power BI reports and dashboards',
        url: 'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-share-dashboards',
      },
    ],
  },
  'f2-019-383': {
    status: 'corrected',
    correct: [2],
    reviewedAnswer: 'Enable high-density sampling on the scatter plot.',
    originalAnswer: 'Add a trend line to the scatter plot.',
    reason:
      'High-density sampling is designed to preserve meaningful distribution and outliers in very large scatter datasets without filtering the underlying model or other visuals.',
    reasonAr:
      'High-density sampling يعالج عدد النقاط الكبير داخل الـScatter فقط، ويحافظ على شكل التوزيع والـoutliers من غير ما يفلتر الجدول أو يغيّر دقة باقي الـvisuals. Trend line يضيف اتجاهًا لكنه لا يعالج تمثيل ملايين النقاط.',
    explanation:
      'Independent correction: C. Enable high-density sampling. It improves the scatter plot representation for dense data and keeps the other visuals and underlying model unchanged. A trend line summarizes direction but does not solve point sampling and overlap.',
    evidence: [
      {
        label: 'High-density sampling in scatter charts',
        url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-high-density-scatter-charts',
      },
    ],
  },
  'f2-042-392': {
    status: 'corrected',
    correct: [2],
    reviewedAnswer:
      'Pin a card visual to a dashboard and set an alert on the tile.',
    originalAnswer:
      'Pin a report page to a dashboard and set an alert on the page.',
    reason:
      'Power BI alerts are configured on dashboard gauge, KPI, or card tiles, not on a pinned live report page or directly on a report visual.',
    reasonAr:
      'الـData alert يتعمل على Dashboard tile من نوع Card أو KPI أو Gauge. لا يمكن وضع Alert على صفحة تقرير كاملة أو مباشرة على Visual داخل التقرير.',
    explanation:
      'Independent correction: C. Pin a card visual to a dashboard, then configure an alert on that dashboard tile. Power BI data alerts support gauge, KPI, and card tiles.',
    evidence: [
      {
        label: 'Set data alerts on Power BI dashboards',
        url: 'https://learn.microsoft.com/en-us/power-bi/consumer/end-user-alerts',
      },
    ],
  },
  'f2-071-400': {
    status: 'corrected',
    correct: [2],
    reviewedAnswer: 'Sync the Country slicer on pages 1, 2, and 3 only.',
    originalAnswer: 'Use page-level filters on pages 1, 2, and 3.',
    reason:
      'Synced slicers retain one selection across chosen pages while leaving unsynced page 4 unaffected. Separate page filters do not propagate a selection made on page 1.',
    reasonAr:
      'Sync slicers ينقل نفس اختيار Country بين الصفحات 1 و2 و3 فقط، ويمكن ترك صفحة 4 بدون Sync. الـPage-level filters منفصلة ولا تنقل اختيار المستخدم من صفحة لأخرى.',
    explanation:
      'Independent correction: C. Sync the Country slicer across pages 1, 2, and 3 and do not sync it to page 4. This preserves the selection on the selected pages only.',
    evidence: [
      {
        label: 'Sync and use slicers on other pages',
        url: 'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers#sync-and-use-slicers-on-other-pages',
      },
    ],
  },
  'f2-102-408': {
    status: 'corrected',
    correct: [2],
    reviewedAnswer: 'Set the report Export data setting to None.',
    originalAnswer:
      'Enable summarized, current-layout, and underlying-data export.',
    reason:
      'Build permission is sufficient for Analyze in Excel. Export settings govern exporting data from report visuals and are not required for a direct semantic-model connection; setting None avoids unnecessary export capability.',
    reasonAr:
      'صلاحية Build هي المطلوبة للاتصال بالموديل من Excel. إعداد Export data يخص تصدير بيانات الـvisuals من التقرير وليس الاتصال المباشر بالموديل، لذلك يمكن ضبطه على None لتحقيق أقل صلاحيات.',
    explanation:
      'Independent correction: C. Build permission enables Analyze in Excel against the semantic model. Report visual export is a separate capability, so set Export data to None when it is not required.',
    evidence: [
      {
        label: 'Analyze in Excel',
        url: 'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-analyze-in-excel',
      },
    ],
  },
  'f2-123-415': {
    status: 'outdated',
    correct: [2],
    reviewedAnswer:
      'Historically: data classifications. Current Power BI: Microsoft Purview sensitivity labels.',
    originalAnswer: 'Active Directory groups.',
    reason:
      'The legacy option data classifications matches the old feature, but current Power BI uses sensitivity labels. None of the choices names the current feature.',
    reasonAr:
      'في نسخة السؤال القديمة كانت الإجابة Data classifications، لكن Power BI الحالي يستخدم Microsoft Purview sensitivity labels لتوضيح المحتوى الذي يحتوي بيانات حساسة. لذلك السؤال قديم وخياراته لا تتضمن المصطلح الحالي.',
    explanation:
      'Legacy-source answer: C, data classifications. Current-product note: Power BI now uses Microsoft Purview sensitivity labels on dashboards, reports, semantic models, and dataflows. Because the modern feature is absent from the choices, treat this as a legacy concept check rather than a current UI instruction.',
    evidence: [
      {
        label: 'Apply sensitivity labels in Power BI',
        url: 'https://learn.microsoft.com/en-us/power-bi/enterprise/service-security-apply-data-sensitivity-labels',
      },
    ],
  },
  'f2-147-424': {
    status: 'corrected',
    correct: [2, 3],
    reviewedAnswer:
      'The referenced file was moved, or you do not have permission to access it.',
    originalAnswer:
      'An incorrect privacy level was used, or you do not have permission.',
    reason:
      'A file-not-found error is consistent with a changed path or inaccessible file. Privacy-level conflicts produce privacy/firewall errors, not a missing-file message.',
    reasonAr:
      'رسالة could not find file ترتبط غالبًا بتغيير مكان الملف أو عدم القدرة على الوصول إليه بسبب الصلاحيات. Privacy level الخاطئ ينتج رسالة مختلفة مرتبطة بالـFormula Firewall أو الخصوصية.',
    explanation:
      'Independent correction: C and D. The path can be stale because the file moved, or access can fail because the user lacks permission. A privacy-level mismatch does not normally surface as a file-not-found error.',
  },
  'f2-167-429': {
    status: 'corrected',
    correct: [0, 2],
    reviewedAnswer:
      'Remove canceled rows and remove the unused Canceled Date column.',
    originalAnswer:
      'Remove canceled rows and split Sales Date into date and time columns.',
    reason:
      'Reducing unused rows and columns directly reduces import size. Splitting a datetime creates two columns unless the unused part is removed separately.',
    reasonAr:
      'حذف صفوف Canceled يقلل عدد الصفوف، وحذف Canceled Date يقلل الأعمدة غير المستخدمة. تقسيم التاريخ والوقت وحده ينشئ عمودين ولا يضمن تقليل الحجم.',
    explanation:
      'Independent correction: A and C. Filter out canceled rows, then remove the now-unused Canceled Date column. These are horizontal and vertical data-reduction steps.',
    evidence: [
      {
        label: 'Data reduction techniques for Import models',
        url: 'https://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction',
      },
    ],
  },
  'f2-168-430': {
    status: 'corrected',
    correct: [1],
    reviewedAnswer:
      'Create the date with Column from Examples and set the new column data type to Date.',
    originalAnswer:
      'Create a column by example that starts with the date, without setting its type.',
    reason:
      'The built-in date hierarchy requires a Date or Date/Time typed field. Extracting date-looking text without assigning the Date type is insufficient.',
    reasonAr:
      'استخراج 2018-12-31 كنص لا يكفي. لكي يظهر Built-in date hierarchy يجب ضبط Data type للعمود الجديد إلى Date.',
    explanation:
      'Independent correction: B. Use Column from Examples to extract the date portion, then set the resulting column data type to Date so Power BI can provide date behavior and hierarchy.',
  },
  'f2-173-432': {
    status: 'corrected',
    correct: [3],
    reviewedAnswer: 'Use default visuals or certified custom visuals.',
    originalAnswer: 'Use default visuals or any marketplace custom visual.',
    reason:
      'Certified visuals undergo Microsoft certification requirements that include restrictions on external services. An arbitrary marketplace visual does not provide that assurance.',
    reasonAr:
      'الـCertified custom visuals تمر باختبارات وشروط أمان، ومنها القيود على الوصول لخدمات خارجية. مجرد وجود Visual في AppSource لا يعني أنه Certified ولا يضمن عدم إرسال البيانات خارج الـtenant.',
    explanation:
      'Independent correction: D. Default visuals plus certified custom visuals provide the broadest selection while respecting the stated data-boundary requirement. Any marketplace visual is too broad.',
    evidence: [
      {
        label: 'Certified Power BI visuals',
        url: 'https://learn.microsoft.com/en-us/power-bi/developer/visuals/power-bi-custom-visuals-certified',
      },
    ],
  },
  'f2-184-436': {
    status: 'corrected',
    correct: [1],
    reviewedAnswer: 'No.',
    originalAnswer: 'Yes.',
    reason:
      'Changing a DateTime column to Date discards the time component, so events can no longer be analyzed by hour.',
    reasonAr:
      'تحويل IOT DateTime إلى Date يحذف الساعة والدقائق. هذا قد يساعد تحليل اليوم لكنه يمنع التحليل بالساعة، وبالتالي لا يحقق كل المطلوب.',
    explanation:
      'Independent correction: No. Converting DateTime to Date removes the hour. A valid optimization must preserve or separately derive both the date and hour needed for analysis.',
  },
  'f2-204-445': {
    status: 'corrected',
    correct: [3],
    reviewedAnswer: 'Add subscriber as a synonym for the Customer table.',
    originalAnswer: 'Set Summarize By to None for CustomerID.',
    reason:
      'Q&A maps user vocabulary to model entities through synonyms. The requested alternate noun is subscriber for Customer.',
    reasonAr:
      'المستخدم يقول subscriber بدل customer، والحل المخصص لذلك في Q&A هو إضافة Synonym للاسم داخل الموديل. Summarize By يحدد طريقة تجميع عمود رقمي ولا يعلّم Q&A مرادفًا جديدًا.',
    explanation:
      'Independent correction: D. Add subscriber as a synonym for Customer. This lets Q&A interpret subscriber count as the existing customer entity and measure without adding data to the model.',
    evidence: [
      {
        label: 'Power BI Q&A field synonyms',
        url: 'https://learn.microsoft.com/en-us/power-bi/natural-language/q-and-a-tooling-intro#field-synonyms',
      },
    ],
  },
  'f2-227-452': {
    status: 'corrected',
    correct: [3],
    reviewedAnswer:
      'Connect to the existing Power BI semantic model (dataset).',
    originalAnswer: 'Connect to the SharePoint folder.',
    reason:
      'The published semantic model already contains the imported data and measures. A thin report reuses it and avoids rebuilding the model.',
    reasonAr:
      'التقرير المنشور أنشأ Semantic model فيها الداتا والـMeasures جاهزة. الاتصال بها مباشرة ينشئ Thin report ويقلل مجهود التطوير، بينما SharePoint folder سيعيد بناء كل شيء من الصفر.',
    explanation:
      'Independent correction: D. Use the existing Power BI semantic model (called a dataset in the source wording). It already contains the model and measures, so a new thin report can reuse them.',
    evidence: [
      {
        label: 'Connect to semantic models from Power BI Desktop',
        url: 'https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-report-lifecycle-datasets',
      },
    ],
  },
  'f2-242-457': {
    status: 'corrected',
    correct: [2, 3, 4],
    reviewedAnswer:
      'Add visuals on the tooltip page, enable Allow use as tooltip for that page, and configure filters on the tooltip page.',
    originalAnswer:
      'Enable Allow use as tooltip on both the target page and tooltip page, and add visuals.',
    reason:
      'Allow use as tooltip is a property of the tooltip page, not the target page. The tooltip page must contain and filter the details to display.',
    reasonAr:
      'خيار Allow use as tooltip يتفعّل على صفحة الـTooltip نفسها وليس على Target page. بعد ذلك نضيف الـvisuals ونضبط حقول/فلاتر صفحة الـTooltip.',
    explanation:
      'Independent correction: C, D, and E. Build the tooltip page visuals, turn on Allow use as tooltip for that page, and configure the tooltip page filters/fields. The target page does not have an Allow use as tooltip setting for this task.',
    evidence: [
      {
        label: 'Create report tooltip pages',
        url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-tooltips',
      },
    ],
  },
  'f2-244-458': {
    status: 'corrected',
    correct: [1],
    reviewedAnswer: 'Create a JSON theme file and import it.',
    originalAnswer: 'Customize the current theme in one report.',
    reason:
      'A reusable theme that includes detailed corporate formatting is distributed as a JSON report-theme file.',
    reasonAr:
      'التعديل على Current theme يخص التقرير الحالي. لإعادة استخدام نفس الخطوط والألوان وتنسيق الـbar chart في تقارير متعددة، ننشئ Theme بصيغة JSON ونستورده في كل تقرير.',
    explanation:
      'Independent correction: B. Define the corporate theme in a JSON file and import it into each report. PBIVIZ is a custom-visual package, not a report-theme format.',
    evidence: [
      {
        label: 'Use report themes in Power BI Desktop',
        url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes',
      },
    ],
  },
  'f2-260-462': {
    status: 'corrected',
    correct: [0],
    reviewedAnswer: 'Yes.',
    originalAnswer: 'No.',
    reason:
      'A published app can distribute the selected reports and dashboard to the entire organization with read access.',
    reasonAr:
      'نشر App واختيار Entire organization يوزع محتوى الـApp المحدد على المؤسسة بصلاحية استهلاك وقراءة، وهو يحقق السيناريو.',
    explanation:
      'Independent correction: Yes. Publishing a Power BI app to the entire organization is a supported way to distribute the included reports and dashboards as read-only content.',
    evidence: [
      {
        label: 'Publish an app in Power BI',
        url: 'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-create-distribute-apps',
      },
    ],
  },
  'f2-296-473': {
    status: 'corrected',
    correct: [3],
    reviewedAnswer: 'Enable report readers to personalize visuals.',
    originalAnswer: 'Create a separate report page with a column chart.',
    reason:
      'Personalize visuals lets a reader change the visual type without duplicating pages or maintaining parallel visuals.',
    reasonAr:
      'Personalize visuals تسمح للمستخدم نفسه يغيّر Line chart إلى Column chart، بأقل تطوير وصيانة. إنشاء صفحة إضافية يكرر التصميم ويزيد الصيانة.',
    explanation:
      'Independent correction: D. Enable personalization so readers can switch the visual type themselves. This meets the choice requirement with the least development and maintenance.',
    evidence: [
      {
        label: 'Let users personalize visuals',
        url: 'https://learn.microsoft.com/en-us/power-bi/consumer/end-user-personalize-visuals',
      },
    ],
  },
  'f2-307-476': {
    status: 'corrected',
    correct: [0],
    reviewedAnswer:
      'Create an RLS role with both the United States and Clothing predicates.',
    originalAnswer: 'Apply report filters.',
    reason:
      'Report filters shape a view but do not enforce data security. RLS is required to restrict the rows the sales team can access.',
    reasonAr:
      'Report filters يمكن للمستخدم تغييرها ولا تعتبر حماية للبيانات. المطلوب Create role في Power BI Desktop بفلترَي Country وProduct Category معًا لتطبيق RLS فعلي.',
    explanation:
      'Independent correction: A. Create a row-level security role that enforces CountryRegionName = United States and ProductCategory = Clothing. Query or report filters are not a security boundary.',
    evidence: [
      {
        label: 'Row-level security with Power BI',
        url: 'https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-rls',
      },
    ],
  },
  'f2-310-477': {
    status: 'corrected',
    correct: [3],
    reviewedAnswer: 'Enable personalization for the report.',
    originalAnswer: 'Edit interactions between the visuals.',
    reason:
      'Report-level personalization enables readers to change measures, visual types, and legends across all eligible visuals. Visual interactions only control cross-filtering and highlighting.',
    reasonAr:
      'Personalize visuals على مستوى التقرير تتيح تغيير الـmeasure ونوع الـvisual والـlegend لكل الـvisuals المسموح بها. Edit interactions تتحكم فقط في الفلترة والـhighlight بين الرسومات.',
    explanation:
      'Independent correction: D. Enable visual personalization for the report. It provides the requested reader controls with one report-level setting.',
    evidence: [
      {
        label: 'Enable visual personalization for a report',
        url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-personalize-visuals?tabs=powerbi-desktop',
      },
    ],
  },
  'f2-345-486': {
    status: 'incomplete-source',
    excluded: true,
    reason:
      'The prompt contains no report, source, size, refresh, or connectivity requirements, and the supplied PDF page also omits the case-study context.',
    reasonAr:
      'السؤال يسأل عن أقل عدد من الـsemantic models من غير عرض التقارير أو المصادر أو متطلبات الـrefresh والاتصال. حتى صفحة الـPDF نفسها ناقصة السياق، لذلك لا توجد إجابة يمكن التحقق منها.',
  },
  'f2-370-496': {
    status: 'corrected',
    correct: [0],
    reviewedAnswer: 'Add the user to the workspace with an editing role.',
    originalAnswer: 'Share the dashboard and modify its access settings.',
    reason:
      'Editing and publishing content require a workspace role such as Contributor, Member, or Admin. Sharing a dashboard only grants consumption access.',
    reasonAr:
      'تعديل ونشر Dashboards يحتاج دور داخل الـworkspace بصلاحية Edit/Publish. مشاركة الـdashboard نفسها تعطي وصولًا للمشاهدة والتفاعل، لكنها لا تجعل المستخدم محررًا أو ناشرًا.',
    explanation:
      'Independent correction: A. Modify workspace membership and assign an appropriate editing role. Dashboard sharing and app access do not grant authoring or publishing rights.',
    evidence: [
      {
        label: 'Roles in workspaces',
        url: 'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces',
      },
    ],
  },
  'f2-407-507': {
    status: 'corrected',
    correct: [0],
    reviewedAnswer: 'Merge Orders with Order Line Items in Power Query.',
    originalAnswer: 'Merge Order Line Items with Products.',
    reason:
      'Flattening the order header into the line-level fact reduces runtime traversal for order totals while keeping Products as a proper dimension for product attributes.',
    reasonAr:
      'Orders هو Header وOrder Line Items هو Detail/Fact. دمجهما في Power Query يضع بيانات الطلب المطلوبة على مستوى السطر ويقلل حسابات التفاعل. Products الأفضل يظل Dimension منفصلًا لتحليل خصائص المنتجات.',
    explanation:
      'Independent correction: A. Merge Orders into Order Line Items to produce the line-level sales fact with order attributes and values. Keep Products as a dimension for product-attribute slicing.',
    evidence: [
      {
        label: 'Power BI star schema guidance',
        url: 'https://learn.microsoft.com/en-us/power-bi/guidance/star-schema',
      },
    ],
  },
  'f2-410-508': {
    status: 'corrected',
    choices: [
      'Get data from a SharePoint folder, enter the site URL, select Transform Data, filter Folder Path to the manufacturing library, and then combine the files.',
      'Get data from a SharePoint list and enter the site URL; then combine and transform the list.',
      'Get data from a SharePoint list, enter the site URL, and then select Combine & Load.',
      'Get data from a SharePoint folder, enter the site URL, and immediately select Combine & Load without filtering.',
    ],
    correct: [0],
    reviewedAnswer:
      'Use SharePoint Folder, transform first, filter Folder Path to the manufacturing library, then combine the files.',
    originalAnswer:
      'Use SharePoint Folder and immediately choose Combine & Load for the whole site.',
    reason:
      'The SharePoint Folder connector returns files across the site. Filtering Folder Path before combining is required to load only the manufacturing library. The source split the correct option across two malformed choices.',
    reasonAr:
      'SharePoint Folder يرجع ملفات الموقع كلها. لذلك نختار Transform Data أولًا، نفلتر Folder Path على مكتبة manufacturing فقط، ثم نعمل Combine. المصدر كان مقسّم الاختيار الصحيح على سطرين بشكل خاطئ.',
    explanation:
      'Independent correction: use SharePoint Folder with the site URL, choose Transform Data, filter Folder Path to the manufacturing document library, and only then combine the identically structured Excel files. Immediate Combine & Load can include files from other libraries.',
    evidence: [
      {
        label: 'SharePoint folder connector',
        url: 'https://learn.microsoft.com/en-us/power-query/connectors/sharepoint-folder',
      },
    ],
  },
};

export function getAnswerAudit(question: Pick<Question, 'id'>): AnswerAudit {
  const correction = corrections[question.id];
  if (correction) return correction;
  if (explicitlyReviewedIds.has(question.id) || getReviewedLesson(question))
    return { status: 'independently-reviewed' };
  return { status: 'source-key' };
}

export function applyAnswerAudit(question: Question): Question {
  const correction = corrections[question.id];
  if (!correction) return question;
  return {
    ...question,
    ...(correction.choices ? { choices: correction.choices } : {}),
    ...(correction.correct ? { correct: correction.correct } : {}),
    ...(correction.type ? { type: correction.type } : {}),
    ...(correction.promptAppend
      ? { prompt: `${question.prompt}${correction.promptAppend}` }
      : {}),
    ...(correction.explanation ? { explanation: correction.explanation } : {}),
    ...(correction.suppressSourceAnswerImage ? { answerImage: undefined } : {}),
    ...(correction.excluded ? { excluded: true } : {}),
  };
}

export const answerAuditSummary = {
  sourceInventory: 509,
  corrected: Object.values(corrections).filter(
    (item) => item.status === 'corrected',
  ).length,
  flawedSource: Object.values(corrections).filter(
    (item) => item.status === 'flawed-source',
  ).length,
  outdated: Object.values(corrections).filter(
    (item) => item.status === 'outdated',
  ).length,
  excludedIncomplete: Object.values(corrections).filter(
    (item) => item.status === 'incomplete-source' && item.excluded,
  ).length,
};
