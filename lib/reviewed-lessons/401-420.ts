import type { ReviewedLesson } from './types.ts';
export const lessons401: Record<string, ReviewedLesson> = {
  "f2-111-411": {
    "translation": "عمود discount فيه أخطاء، وعايز تستبدل كل خطأ بـ 0.05 مع إبقاء كل الصفوف وبأقل شغل.",
    "story": "فيه فاتورة خصمها مش معروف بسبب Error. المطلوب افتراض خصم 5% لهذه الخانة، مش حذف الفاتورة كلها ولا عرض الفواتير التالفة وحدها.",
    "reasoning": [
      "حدد discount ثم Replace Errors وأدخل 0.05.",
      "العملية تعالج error values الموجودة فعلًا؛ النص العادي N/A ليس Error حتى يفشل تحويله.",
      "لو تحويل النوع ينشئ أخطاء جديدة، نفذ التحويل قبل استبدال تلك الأخطاء."
    ],
    "answer": "C: Replace Errors.",
    "example": "الخصومات 0.1 و Error و 0 تصبح 0.1 و 0.05 و 0؛ عدد الفواتير لا يتغير.",
    "optionsAr": [
      "Keep Errors يبقي الصفوف التالفة فقط ويحذف بقية البيانات.",
      "مجموعة Query Errors للتشخيص ليست الاستبدال المباشر المطلوب.",
      "صحيح؛ يحافظ على الصفوف ويعدل خلية الخطأ.",
      "Remove Errors يحذف صفوفًا، عكس الشرط."
    ],
    "takeaway": "استبدال خطأ يحافظ على الصف؛ إزالة خطأ تحذف الصف.",
    "references": [
      "https://learn.microsoft.com/en-us/power-query/dealing-with-errors"
    ]
  },
  "f2-113-412": {
    "translation": "فيديوهات تدريب منشورة على Microsoft Stream، وعايز تعرضها داخل dashboard. أي نوع tile؟",
    "story": "Video tile مش مشغلًا عامًا لأي رابط فيديو. فيديو Stream يحتاج كود embed مناسبًا، فنضعه في Web content بدل افتراض أن رابط Stream يعمل داخل نوع Video.",
    "reasoning": [
      "احصل على embed code المدعوم للفيديو.",
      "أضفه إلى Web content tile، مع مراعاة تسجيل الدخول وسياسة التضمين.",
      "الواجهة في السؤال قديمة؛ Stream الحالي مبني على SharePoint وتختلف تفاصيل التضمين."
    ],
    "answer": "D: Web content في سياق السؤال.",
    "example": "لنك مشاهدة Stream ليس ملف MP4 عام؛ iframe التضمين يحتفظ بصلاحيات المشاهدة المطلوبة.",
    "optionsAr": [
      "نوع Video التقليدي لا يدعم كل مزودي الفيديو ومنهم هذا السيناريو.",
      "Streaming data لاستقبال بيانات رقمية حية، لا فيديو تدريب.",
      "Text box يعرض نصًا وروابط، لا مشغل التضمين المطلوب.",
      "صحيح؛ يدعم محتوى الويب المضمّن وفق قيود الأمان."
    ],
    "takeaway": "Stream فيديو ≠ streaming dataset؛ انتبه لنوع التضمين.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboard-add-widget"
    ],
    "verdict": "conditional"
  },
  "f2-118-413": {
    "translation": "تقرير live connection مع Azure Analysis Services. كيف تتيح Q&A في الخدمة؟",
    "story": "الأرقام جاية من موديل Analysis Services جاهز. إضافة رسم سؤال وجواب للتقرير ليست نفس تفعيل قدرة السؤال على semantic model في الخدمة.",
    "reasoning": [
      "فعّل Turn on Q&A for this dataset في إعدادات الخدمة المدعومة.",
      "Azure Analysis Services سحابي؛ enterprise gateway ليس سبب تفعيل Q&A هنا.",
      "الميزة قديمة وقيد الإزالة: الوثائق الحالية تحدد فبراير 2027، فلا نقدمها كأساس لتصميم جديد."
    ],
    "answer": "D في صياغة المصدر: Turn on Q&A for this dataset.",
    "example": "تفعيل إعداد الموديل يسمح بطلب sales by year؛ وضع synonym يساعد الفهم لكنه لا يشغل الميزة المعطلة.",
    "optionsAr": [
      "Gateway ليس مطلوبًا لمجرد أن المصدر Azure Analysis Services ولا يشغل Q&A.",
      "Synonyms تحسن اللغة، ولا تستبدل مفتاح التفعيل.",
      "إضافة visual ليست شرط تمكين Q&A للموديل في الخدمة.",
      "صحيح وفق الواجهة القديمة ومتطلبات الميزة المدعومة."
    ],
    "takeaway": "تفعيل الميزة شيء، وتحسين قاموسها أو إضافة visual شيء آخر.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/natural-language/q-and-a-intro",
      "https://learn.microsoft.com/en-us/power-bi/connect-data/service-q-and-a-direct-query"
    ],
    "verdict": "conditional"
  },
  "f2-122-414": {
    "translation": "عايز مستهلكو dashboard يتركوا feedback يشوفه باقي المستهلكين. تستخدم إيه؟",
    "story": "عايز نقاشًا جنب اللوحة: مدير يسأل ليه مبيعات مايو قلت، وحد تاني يرد على نفس الرسالة. ده Comments، مش بريد دوري ولا تقييم خاص للبرنامج.",
    "reasoning": [
      "استخدم Comments على dashboard أو tile.",
      "التعليقات مرئية لمن لديهم الوصول المناسب للمحتوى.",
      "يمكن استخدام mention لتنبيه شخص، لكن الإذن بالمحتوى لا يلغى."
    ],
    "answer": "C: Comments.",
    "example": "تعليق على KPI: هل الرقم بعد المرتجعات؟ يقدر الفريق يشوف السؤال والرد في مكانهما.",
    "optionsAr": [
      "Feedback للمنتج ليس مساحة نقاش المستهلكين المطلوبة.",
      "Subscribe يرسل نسخة دورية ولا ينشئ محادثة مرئية.",
      "صحيح؛ تعليق ونقاش مرتبط بالمحتوى.",
      "Favorite علامة شخصية للمستخدم."
    ],
    "takeaway": "نقاش جماعي على لوحة = Comments.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/consumer/end-user-comment"
    ]
  },
  "f2-123-415": {
    "translation": "عايز المستخدم وهو يتصفح dashboards يعرف أيها يحتوي PII، دون تغيير تصميم اللوحة أو مجهود كبير.",
    "story": "بدل ما تحط نص تحذير على كل رسم، تلصق علامة تصنيف على العنصر نفسه. السؤال يستخدم اسم الميزة القديمة Data classifications.",
    "reasoning": [
      "الهدف اكتشاف الحساسية في قائمة المحتوى.",
      "التصنيف علامة وصف للمحتوى، وليس عضوية فريق أو تعليقًا.",
      "الحل الحالي Sensitivity labels؛ الاختيارات لا تعرض الاسم الحالي."
    ],
    "answer": "C: Data classifications هو الجواب التاريخي؛ حاليًا Sensitivity labels.",
    "example": "لوحة رواتب عليها Confidential، فتظهر الحساسية للمستهلك قبل فتح الرسومات.",
    "optionsAr": [
      "مجموعات الدليل تحدد أعضاء وصلاحيات، لا شارة نوع البيانات.",
      "Tile جديد يغير التصميم ويتطلب تعديلات داخل كل لوحة.",
      "صحيح بحسب الاسم القديم للميزة؛ لا نفهمه كمنع وصول تلقائي.",
      "Comments ليست علامة تصنيف موحدة في تصفح المحتوى."
    ],
    "takeaway": "علّم المحتوى الحساس بتصنيف، ولا تخلط العلامة بالصلاحية.",
    "references": [
      "https://learn.microsoft.com/en-us/fabric/enterprise/powerbi/service-security-sensitivity-label-overview"
    ],
    "verdict": "conditional"
  },
  "f2-128-416": {
    "translation": "Azure SQL يتحدث باستمرار، وتحتاج رؤية المعاملة خلال خمس دقائق لكشف الاحتيال. أي connection mode؟",
    "story": "لو نسخت البيانات مرة كل ساعات، عملية احتيال جديدة لن تظهر بسرعة. محتاج التقرير يسأل SQL عن البيانات الأحدث بدل انتظار refresh للنسخة المستوردة.",
    "reasoning": [
      "DirectQuery يرسل استعلامًا للمصدر عند طلب البيانات.",
      "Import يحتاج تحديث نسخة الموديل ولا يضمن خمس دقائق وحده.",
      "لضمان زمن العرض أيضًا اضبط automatic page refresh أو آلية تحديث مناسبة، مع قيود السعة والكاش."
    ],
    "answer": "B: DirectQuery، مع إعداد تحديث العرض بما يحقق مهلة الخمس دقائق.",
    "example": "المعاملة وصلت 10:01؛ استعلام DirectQuery عند 10:02 يقدر يقرأها، لكن شاشة متروكة دون تحديث قد تظل قديمة.",
    "optionsAr": [
      "SQL statement يمكنه اختيار بيانات، لكنه لا يحدد نمط حداثتها وحده.",
      "صحيح؛ يتجنب انتظار تحديث Import للبيانات.",
      "Timeout حد انتظار الاستعلام، لا تكرار جلب البيانات.",
      "Import وحده لا يحقق حداثة خمس دقائق دون آلية إضافية مناسبة."
    ],
    "takeaway": "DirectQuery يتيح الحداثة؛ تحديث الشاشة والكاش يحددان ما يراه المستخدم فعلًا.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-directquery-about",
      "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-automatic-page-refresh"
    ],
    "verdict": "conditional"
  },
  "f2-130-417": {
    "translation": "24 ملفًا:2018 بأعمدة قديمة و 2019 بأعمدة إضافية. Combine Files يستخدم First file، و Type detection على كامل البيانات. قيّم ثلاث عبارات.",
    "story": "أداة الدمج بتتعلم وصفة الأعمدة من ملف العينة، مش بتخترع union كامل لكل الأعمدة في كل الملفات. لو العينة قديمة، الوصفة غالبًا تفضل على الهيكل القديم.",
    "reasoning": [
      "العينة First file بحسب الترتيب المعروض من 2018، فستظهر أعمدة 2018.",
      "الأعمدة الجديدة في 2019 لا تضاف تلقائيًا إلى التوسيع المبني على العينة القديمة.",
      "المصدر يقول 10–50 صفًا لكل ملف؛ فكل ملف أصلًا أقل من 200. تغيير كشف النوع إلى أول 200 لا يضمن تحسين الزمن هنا."
    ],
    "answer": "الأولى Yes والثانية No. الثالثة: المفتاح يقصد Yes كتقليل فحص، لكنها غير مضمونة لأن كل ملف أقل من 200 صف.",
    "example": "عينة فيها ID و Amount فقط لن تجعل عمود Channel الجديد جزءًا من الناتج تلقائيًا؛ اختر عينة 2019 وراجع التعامل مع الأعمدة الناقصة.",
    "optionsAr": [
      "Yes؛ هي الأعمدة التي تعلمت منها دالة التحويل.",
      "No؛ لا تفترض جمع كل أسماء الأعمدة تلقائيًا.",
      "مشروط؛ في ملفات من 10–50 صفًا، أول 200 وكل الملف يغطيان نفس الصفوف، فلا توجد سرعة مضمونة."
    ],
    "takeaway": "اختيار Sample file يحدد schema؛ تقليل فحص النوع لا يسرع شيئًا إذا العينة أصلًا أصغر من الحد.",
    "references": [
      "https://learn.microsoft.com/en-us/power-query/combine-files-overview",
      "https://learn.microsoft.com/en-us/power-query/data-types"
    ],
    "verdict": "conditional"
  },
  "f2-135-418": {
    "translation": "Query به 10000 صف، وعايز تعرف هل عمود كل قيمه فريدة. أي خيارين Data Preview يصلح كل منهما؟",
    "story": "لو كل رقم فاتورة ظهر مرة واحدة يبقى العمود مفتاح محتمل. محتاج تكرار القيم وإحصاءها، مش نسبة الخانات الفارغة فقط.",
    "reasoning": [
      "Column profile يعرض إحصاءات العمود وتوزيع القيم.",
      "Column distribution يعرض distinct و unique counts.",
      "غيّر profiling إلى entire dataset لأن الافتراضي أول 1000 صف فقط."
    ],
    "answer": "A و B: Column profile و Column distribution، مع فحص كل 10000 صف.",
    "example": "أول 1000 رقم فريدين لكن الصف 9999 مكرر؛ preview المحدود لن يكشفه.",
    "optionsAr": [
      "صحيح؛ يعرض إحصاءات وتكرارات العمود.",
      "صحيح؛ يمكن مقارنة unique/distinct/row count.",
      "Whitespace يظهر فراغات النص ولا يثبت التفرد.",
      "Quality يقيس valid/error/empty، لا التكرار مباشرة.",
      "Monospace تنسيق خط المعاينة."
    ],
    "takeaway": "Unique تعني ظهر مرة؛ Distinct تعني عدد القيم المختلفة، وافحص كل الصفوف.",
    "references": [
      "https://learn.microsoft.com/en-us/power-query/data-profiling-tools"
    ]
  },
  "f2-136-419": {
    "translation": "عايز جدول Numbers يحوي كل الأعداد الصحيحة من-100 إلى 100. أكمل الدالة والوسائط.",
    "story": "مش محتاج تكتب 201 صف يدويًا. اطلب بداية ونهاية وخطوة؛ المحرك يولد السلسلة.",
    "reasoning": [
      "GENERATESERIES تعيد جدولًا من القيم.",
      "الوسائط start=-100 و end=100 و increment=1.",
      "الطرفان داخل النتيجة، فعدد الصفوف 100-(-100)+1=201."
    ],
    "answer": "GENERATESERIES(-100,100,1).",
    "example": "أول الصفوف-100،-99،-98؛ وآخرها 98،99،100.",
    "optionsAr": [
      "GENERATE يدمج تقييم جدول لكل صف، ولا يأخذ الثلاثة أرقام بهذه الدلالة.",
      "GENERATEALL ليس مولد نطاق أعداد بهذه الصيغة.",
      "صحيح؛ مخصص لسلسلة بقيمة بداية ونهاية وخطوة.",
      "النهاية 1 والخطوة 200 لا تنتج الأعداد المطلوبة.",
      "صحيح؛ النطاق كامل والخطوة 1.",
      "الزيادة 100 مع نهاية-100 لا تمثل النطاق المتصاعد المطلوب."
    ],
    "takeaway": "نطاق أعداد شامل الطرفين = GENERATESERIES(start,end,step).",
    "references": [
      "https://learn.microsoft.com/en-us/dax/generateseries-function-dax"
    ]
  },
  "f2-137-420": {
    "translation": "عايز عمودًا جديدًا يعرض NA إذا Subcategory تساوي null، وإلا يحتفظ بالاسم. أي أمر Power Query؟",
    "story": "المطلوب خانة تتفرع حسب شرط بسيط. الواجهة فيها زر يكتب if/then/else بدل ما تدخل محرر الكود بنفسك.",
    "reasoning": [
      "Add Column ثم Conditional Column.",
      "شرط Subcategory equals null، الناتج NA، وإلا قيمة Subcategory.",
      "Custom Column قادر تقنيًا على كتابة نفس M، لكن Conditional هو الأمر المباشر المقصود في صياغة السؤال."
    ],
    "answer": "D: Conditional Column، مع التنبيه أن Custom Column يمكنه تنفيذ نفس المنطق يدويًا.",
    "example": "null تصبح NA، و Bikes تفضل Bikes؛ لا تحذف الصفوف الناقصة.",
    "optionsAr": [
      "Column from Examples يستنتج تحويلًا من أمثلة، وليس المدخل المباشر لضبط شرط null.",
      "ممكن تقنيًا لو كتبت M؛ ليس أفضل تمييز إذا اعتبر السؤال كل طرق التنفيذ.",
      "Invoke Custom Function يتطلب دالة موجودة، وهو زائد هنا.",
      "صحيح كحل واجهة مباشر للشرط."
    ],
    "takeaway": "شرط if بسيط من الواجهة = Conditional Column؛ لا تدّعي أن Custom مستحيل.",
    "references": [
      "https://learn.microsoft.com/en-us/power-query/add-conditional-column"
    ],
    "verdict": "conditional"
  },
  "f2-141-421": {
    "translation": "Bar يعرض عدد العملاء حسب segment و Column يعرض مبيعات الأشهر. عايز اختيار segment يوضح حصته داخل إجمالي الشهر.",
    "story": "عايز تشوف المبيعات كلها وفيها الجزء الخاص بالشريحة متلون. لو فلترت، الباقي سيختفي وتفقد المقارنة مع الإجمالي.",
    "reasoning": [
      "حدد bar كمصدر الاختيار.",
      "فوق column اختر Highlight.",
      "الجزء المحدد يظهر قويًا وباقي الإجمالي باهتًا؛ Filter يعيد رسم الجزء وحده."
    ],
    "answer": "B: Highlight.",
    "example": "إجمالي الشهر 100 وشريحة VIP باعِت 30؛ يظهر 30 بارزًا داخل سياق 100.",
    "optionsAr": [
      "None لا يوضح أي ارتباط بالشريحة.",
      "صحيح؛ يبقي الإجمالي ويبرز النصيب المختار.",
      "Filter يعرض 30 وحدها، فلا ترى نسبتها بصريًا من 100."
    ],
    "takeaway": "جزء من الكل مع إبقاء الكل = Highlight.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions"
    ]
  },
  "f2-143-422": {
    "translation": "عندك Total Sales، وعايز Previous Quarter يحسب المبيعات قبل الفترة المختارة بربع سنة. أي DAX؟",
    "story": "المقياس نفسه يفضل جمع مبيعات، لكن بنرجع نافذة الزمن خطوة للخلف. مش عايز تجميع من بداية الربع الحالي.",
    "reasoning": [
      "CALCULATE يعيد تقييم Total Sales تحت سياق تواريخ معدل.",
      "DATEADD(Date[Date],-1,QUARTER) يرجع الفترة ربعًا للخلف.",
      "يلزم جدول تاريخ مناسب وعلاقة صحيحة؛ لا تعتمد على أسماء أعمدة تشبه التاريخ فقط."
    ],
    "answer": "A: CALCULATE([Total Sales],DATEADD(Date[Date],-1,QUARTER)).",
    "example": "لو المحدد Q2، تقارن بمبيعات Q1؛ ولو المحدد جزء من فترة، انتبه لدلالة نافذة DATEADD.",
    "optionsAr": [
      "صحيح؛ الإزاحة السالبة ترجع للخلف.",
      "DATESQTD يعرض من بداية الربع الحالي إلى التاريخ المحدد.",
      "TOTALQTD حساب تراكمي داخل الربع الحالي.",
      "+1 ينقل للأمام، عكس previous؛ PARALLELPERIOD أيضًا يعيد فترات كاملة."
    ],
    "takeaway": "Previous = إزاحة سالبة؛ QTD = تراكم داخل الفترة.",
    "references": [
      "https://learn.microsoft.com/en-us/dax/dateadd-function-dax"
    ]
  },
  "f2-144-423": {
    "translation": "Dashboard يحتاج tile مخزون حسب الموقع، لكن الرسم مش موجود في التقرير، وعايز أقل تأثير عليه. خطوتان؟",
    "story": "مش مضطر تضيف صفحة جديدة للتقرير. اسأل Q&A عن المخزون حسب الموقع وثبّت الناتج في اللوحة.",
    "reasoning": [
      "اطلب inventory by location باستخدام Q&A.",
      "Pin visual الناتج على dashboard.",
      "هذا يشرح الميزة التاريخية؛ Q&A مقرر إزالتها فبراير 2027 حسب الوثائق الحالية."
    ],
    "answer": "C و E: Ask using Q&A ثم Pin visual.",
    "example": "سؤال total inventory by location ينتج رسمًا مناسبًا يمكن تثبيته دون تغيير صفحات التقرير.",
    "optionsAr": [
      "Quick insights لا يضمن التحليل المحدد المطلوب ولا يبدأ من dashboard بهذه الدلالة.",
      "إخفاء صفحة لا ينشئ تحليلًا جديدًا.",
      "صحيح؛ يبني visual من الموديل مباشرة.",
      "يمكنه إنتاج الرسم لكنه يغير التقرير خلاف حل أقل التأثير المتاح.",
      "صحيح؛ ينقل الناتج كبلاطة إلى اللوحة."
    ],
    "takeaway": "إنشاء tile مستقل تاريخيًا: Q&A ثم Pin، لا تعديل التقرير.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/natural-language/q-and-a-intro",
      "https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboard-pin-tile-from-report"
    ],
    "verdict": "conditional"
  },
  "f2-147-424": {
    "translation": "Power Query يعرض DataSource.Error: could not find file. أي سببين محتملين؟",
    "story": "قبل ما تصلح التحويلات، اسأل: الملف لسه في العنوان؟ والحساب الذي يقرأه يقدر يشوفه؟ بعض الأنظمة تخفي وجود الملف عن غير المصرح له.",
    "reasoning": [
      "راجع المسار إذا الملف اتنقل أو اتغير اسمه.",
      "راجع صلاحيات الحساب الفعلي، خاصة حساب gateway أو الخدمة.",
      "عدم الصلاحية قد يظهر Access denied بدل Not found حسب المصدر؛ لا تجعل نص الرسالة دليلًا قاطعًا على الصلاحيات."
    ],
    "answer": "C و D كأسباب محتملة؛ C هو التفسير المباشر، و D يعتمد على طريقة المصدر في إظهار الخطأ.",
    "example": "ملف انتقل من Reports إلى Archive؛ أو الخدمة تستخدم حسابًا لا يرى المجلد أصلًا.",
    "optionsAr": [
      "القفل عادة يعطي sharing violation أو access error، وليس اختفاء المسار.",
      "Privacy mismatch له رسائل Formula.Firewall عادة.",
      "صحيح؛ المسار القديم لم يعد يشير إلى ملف.",
      "محتمل حسب المصدر؛ افحص الحساب ولا تفترض أنه السبب الوحيد."
    ],
    "takeaway": "Not found: تحقق من المسار أولًا، ثم هوية الحساب وصلاحياته.",
    "references": [
      "https://learn.microsoft.com/en-us/power-query/dealing-with-errors"
    ],
    "verdict": "conditional"
  },
  "f2-152-425": {
    "translation": "المصدر يقول إن عندك table visual ويعرض صورة، لكنه لا يوضح المطلوب تغييره ولا منطقة الإجابة كاملة.",
    "story": "زي ما حد يوريك صورة عربية ويسألك تختار قطعة غيار من غير ما يقول العطل. معرفة شكل الجدول وحدها لا تحدد هل عايز Matrix أو card أوتنسيق مختلف.",
    "reasoning": [
      "لا يوجد هدف مكتمل يمكن مقارنة الخيارات به.",
      "لا نستنتج Matrix أو values on rows من صورة قديمة بلا متطلبات.",
      "يجب استرجاع نص السؤال ومنطقة الإجابة من نسخة كاملة قبل تحديد مفتاح وتصحيح آلي."
    ],
    "answer": "لا توجد إجابة قابلة للتحقق؛ المصدر ناقص ويجب عدم احتسابه كسؤال محلول.",
    "example": "لو المطلوب عرض measures على صفوف قد نستخدم Matrix؛ لو المطلوب cards فالحل مختلف. المثال ليس جوابًا لهذا السؤال.",
    "optionsAr": [
      "لا يمكن مقارنة بدائل غير ظاهرة أوتأكيد Matrix دون استعادة الهدف ومنطقة الإجابة؛ لا تُستخدم اختيارات مستعارة من سؤال آخر."
    ],
    "takeaway": "نقص الهدف لا نعالجه بتخمين إجابة.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-tables",
      "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-matrix-visual"
    ],
    "verdict": "incomplete"
  },
  "f2-157-426": {
    "translation": "أربع جداول Sales_Region و Region_Manager و Manager و Sales_Manager. عايز تفردها في جدول واحد وتحتفظ فقط بالمديرين المرتبطين بمنطقة مبيعات.",
    "story": "عندك موظفون ومديرون زيادة عن اللي لهم مناطق فعلية. الدمج لازم يمشي مع العلاقات ويحتفظ بالتطابقات فقط، بدل ما يسحب مديرًا بلا منطقة.",
    "reasoning": [
      "Merge Region_Manager مع Manager باستخدام Inner.",
      "Merge Sales_Region مع Region_Manager باستخدام Inner.",
      "Merge Sales_Region مع Sales_Manager باستخدام Inner.",
      "الترتيب قد يختلف مع نفس الاعتمادات وتوسيع الأعمدة؛ المصدر يسمح بأكثر من ترتيب صحيح."
    ],
    "answer": "خطوات Inner joins الثلاث: Region_Manager↔Manager، ثم Sales_Region↔Region_Manager، ثم Sales_Region↔Sales_Manager.",
    "example": "مدير 99 موجود في Manager لكن بلا Region_Manager لن يظهر؛ مدير 12 المطابق يدخل ببياناته.",
    "optionsAr": [
      "صحيح؛ يضيف خصائص المدير المرتبط.",
      "Left من Sales_Manager يحتفظ بمديرين لا مناطق لهم، مخالف الشرط.",
      "صحيح؛ يثري جدول المناطق بالمديرين المطابقين.",
      "إنشاء new query قد يكون تصميمًا صالحًا إذا أكملت الاعتمادات؛ لا تعتبره خطأ تقنيًا مطلقًا لكن المفتاح المقصود يستخدم الدمج في نفس query.",
      "Right قد يبقي صفوف Region_Manager غير مطابقة لمنطقة؛ لا يلزم مع Inner متاح.",
      "صحيح؛ يربط منطقة المبيعات بجدول الربط."
    ],
    "takeaway": "Inner يحتفظ بالتطابق؛ صمم الدمج بحيث لا تضاعف الصفوف عن grain المطلوب.",
    "references": [
      "https://learn.microsoft.com/en-us/power-query/merge-queries-inner"
    ],
    "verdict": "conditional"
  },
  "f2-161-427": {
    "translation": "Machine-User يجمع قيمتين، والمطلوب clustered bar حسب Machine و User. كيف تحضر البيانات؟",
    "story": "عمود فيه M01-U03 معناه جهاز ومستخدم، لكن الرسم محتاج كل معلومة في حقل مستقل. افصل النص عند الفاصل.",
    "reasoning": [
      "Split column by delimiter في Power Query.",
      "سمّ الناتج Machine و User وراجع نوع البيانات.",
      "العمودان فئات للعرض، وليسوا measures تجميعية."
    ],
    "answer": "A: Split Machine-User by delimiter.",
    "example": "M01-U03 → Machine=M01 و User=U03؛ تقدر تستخدم واحدًا محورًا والثاني legend.",
    "optionsAr": [
      "صحيح؛ يحافظ على كل جزء في عمود.",
      "SUBSTITUTE يبدل نصًا؛ فصل الطرفين به يتطلب افتراضات وحيلًا غير لازمة.",
      "آخرثلاثة أحرف قد تستخرج User فقط ولا تنتج Machine.",
      "Measures لا تنشئ عمودي فئات للـ axis والـ legend."
    ],
    "takeaway": "قيمتان في نص بفاصل معروف = Split column.",
    "references": [
      "https://learn.microsoft.com/en-us/power-query/split-columns-delimiter"
    ]
  },
  "f2-164-428": {
    "translation": "عشرة ملايين بريد بها Subject و Body و From و To. المطلوب تحليل شبكة المراسلات ومنع قراءة المحتوى وتقليل الحجم.",
    "story": "عايز تعرف مين بيكلم مين، مش هو قال إيه. احذف نص الرسالة والعنوان قبل التحميل؛ إخفاؤهما من القائمة لا يمسح البيانات.",
    "reasoning": [
      "احتفظ بحقلي From و To والحقول اللازمة لتحليل الشبكة.",
      "احذف Subject و Body أثناء الاستيراد، فلا يدخل المحتوى إلى الموديل.",
      "RLS يحدد الصفوف المرئية، ولا يلغي أعمدة المحتوى أو يوفر مساحتها."
    ],
    "answer": "B: Remove Subject and Body during import.",
    "example": "صف Ali إلى Mona يفيد تحليل الشبكة حتى بعد حذف نص البريد؛ تحتفظ بالعلاقة بدون المحتوى الحساس.",
    "optionsAr": [
      "تقييد المرسل بدور RLS يبقي البريد نفسه مخزنًا، وقد يتيح قراءة نص الرسائل المسموح بها رغم عدم الحاجة إليه.",
      "صحيح؛ يقلل الحجم ويلغي محتوى البريد من الموديل.",
      "إخفاء الأعمدة ليس حماية ولا حذفًا للمساحة المخزنة."
    ],
    "takeaway": "ما لا تحتاجه لا تحمّله؛ Hide ليس حدًا أمنيًا.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction"
    ]
  },
  "f2-167-429": {
    "translation": "Sales يستخدم فقط عمليات Finished ولا يحتاج Canceled Date. اختار إجراءين لتقليل وقت التحميل دون تغيير التحليل.",
    "story": "المستخدم مش بيحسب طلبات ملغاة، فتخزينها مع تاريخ إلغائها بيستهلك وقتًا ومساحة بلا فائدة لهذا التقرير.",
    "reasoning": [
      "استبعد Canceled قبل التحميل إذا كانت الحالتان المعروضتان Finished و Canceled فقط.",
      "احذف Canceled Date بعد استبعاد العمليات الملغاة.",
      "لو هناك حالات أخرى مثل Pending، فالفلتر الأدق هو Status يساوي Finished؛ هذا قيد على صياغة الخيار."
    ],
    "answer": "A و C: حذف صفوف Canceled وحذف Canceled Date، بشرط أن الحالات الأخرى لا تخالف التحليل المطلوب.",
    "example": "من مليون عملية فيه 200 ألف ملغاة؛ استبعادها يقلل الصفوف، وحذف تاريخ الإلغاء يقلل الأعمدة.",
    "optionsAr": [
      "صحيح بحسب الحالات المعروضة؛ الأدق الاحتفاظ بعمليات Finished فقط.",
      "تحويل وقت التسليم إلى Integer قد يغير المعنى ويفقد المعلومة.",
      "صحيح؛ العمود لم يعد مطلوبًا في التحليل بعد استبعاد الملغاة.",
      "تقسيم DateTime مع الاحتفاظ بالوقت يضيف حقلًا غير مطلوب؛ تحويله إلى Date أوضح إن سمح به السؤال.",
      "يحذف التاريخ الأساسي المستخدم في تحليل المبيعات، فيخالف الحفاظ على التحليل."
    ],
    "takeaway": "تقليل أفقي للصفوف وتقليل رأسي للأعمدة، بشرط الحفاظ على المطلوب.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction"
    ],
    "verdict": "conditional"
  },
  "f2-168-430": {
    "translation": "Logged نص مثل 2018-12-31 at 08:59. عايز تحليل باليوم وهرمية تاريخ مدمجة. ماذا تفعل؟",
    "story": "التاريخ موجود داخل جملة نصية، وليس Date حقيقيًا. استخرج الجزء قبل at ثم عرّفه Date حتى يقدر الموديل يتعامل معه كزمن.",
    "reasoning": [
      "استخدم Column from Examples لاستخراج 2018-12-31 من النص.",
      "اضبط نوع العمود الجديد إلى Date صراحة.",
      "Auto date/time يحتاج أن يكون مفعّلًا وينطبق على العمود؛ النص أو رقم السنة ليس هرمية تاريخ."
    ],
    "answer": "B: Column from Examples ثم Date.",
    "example": "\"2018-12-31 at 08:59\" يصبح 2018-12-31 بنوع Date؛ تقدر بعد ذلك تجمع الشكاوى حسب اليوم أو الشهر.",
    "optionsAr": [
      "استخراج النص وحده دون ضمان نوع Date لا يكفي لتلبية شرط الهرمية.",
      "صحيح؛ يحقق استخراج الجزء المطلوب ثم ضبط نوعه.",
      "Parse على النص الكامل يعتمد على صيغة التفسير، ولا يوجد ضمان لقبول كلمة at بهذه الصورة.",
      "رقم 2018 يعطي سنة فقط، وليس التاريخ الكامل وهرميته المدمجة."
    ],
    "takeaway": "شكل التاريخ لا يكفي؛ نوع Date هو المطلوب.",
    "references": [
      "https://learn.microsoft.com/en-us/power-query/column-from-example",
      "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-auto-date-time"
    ]
  }
};
