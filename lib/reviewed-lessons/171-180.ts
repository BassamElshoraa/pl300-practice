import type { ReviewedLesson } from './types.ts';
const dax = (name: string) =>
  `https://learn.microsoft.com/en-us/dax/${name}-function-dax`;
const relationships =
  'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand';
export const lessons171: Record<string, ReviewedLesson> = {
  'f1-171-170': {
    translation:
      'العلاقة نشطة Single من Table1 كطرف 1 إلى Table2 كطرف many. الأول فيه SM و LU و SP، والثاني SP و LU. حدد أثر فلتر Table2 وما يظهر للقيمة غير المطابقة.',
    story:
      'امش وراء الإعداد المكتوب، مش التخمين عن أي جدول المفروض يكون البُعد. السهم من Table1 إلى Table2، و SM ليس لها وصف مقابل في الثاني.',
    reasoning: [
      'Single في العلاقة المعروضة تنقل فلتر Table1 إلى Table2، لا العكس. فلتر Code في Table2 لا يقصر Table1 تلقائيًا.',
      'للصف SM لا يوجد Code مقابل في Table2. عند إظهار هذا الصف تكون الخانة المقابلة BLANK، لا NaN أو Error.',
      'ظهور الصف بلا بيانات يعتمد على حقول visual وترتيبها وإعداد Show items with no data. لا نزعم أن كل ترتيب للحقول يظهر نفس الصف دائمًا.',
      'فريدة العينة في الطرفين لا تغير Cardinality المضبوطة 1:* في النافذة؛ السؤال عن الإعداد المعروض.',
    ],
    answer: 'not be filtered؛ a BLANK للقيمة المفقودة عند عرض صف SM.',
    example:
      'اختيار SP من Table2 لا يقصر Table1 على SP. وإذا أظهرت SM من Table1 مع Code من Table2، فالقيمة المقابلة مفقودة، وليس هذا خطأ حسابيًا.',
    optionsAr: [
      'be filtered لا توافق Single من Table1 إلى Table2 فقط.',
      'be merged ليست أثر فلتر؛ الفلترة لا تنفذ Power Query Merge.',
      'not be filtered صحيحة لغياب مسار عكسي في هذا الإعداد.',
      'a BLANK هي المقصودة للقيمة غير المطابقة عند إظهار صفها.',
      'a NaN نتيجة عددية غير معرفة، لا وصف فقد تطابق نصي هنا.',
      'an ERROR ليست نتيجة تلقائية لغياب SM من Table2.',
    ],
    takeaway:
      'اقرأ 1 و* والسهم كما هي. فقد التطابق قد يعطي BLANK، ولا يعني NaN أوتعطل التقرير.',
    references: [
      relationships,
      'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-show-items-no-data',
    ],
    verdict: 'conditional',
  },
  'f1-172-171': {
    translation:
      'Sales لها SaleDate بعلاقة Active مع DateTime[Date]، و ShippingDate بعلاقة Inactive. أكمل مقياس إجمالي المبيعات وفق تاريخ الشحن.',
    story:
      'الطريق الشغال يقول امتى اتباعت، وأنت عايز امتى اتشحنت. لنفس الحساب فقط، استخدم طريق الشحن بدل البيع.',
    reasoning: [
      'CALCULATE تقيم مجموع SalesAmount في سياق معدل.',
      'USERELATIONSHIP تحدد علاقة ShippingDate الموجودة لا SaleDate.',
      'الدالة لا تنشئ علاقة ولا تغير المسار الافتراضي لكل المقاييس إلى الأبد. الحسابات الأخرى قد تظل بتاريخ البيع.',
      'إذا يوجد RLS، اختبر قيود الأمان ومساراتها؛ اختيار علاقة للحساب ليس إعادة تصميم تلقائية للأمان.',
    ],
    answer: 'CALCULATE؛ USERELATIONSHIP.',
    example:
      'بيع 28 يناير وشحن 2 فبراير يدخل يناير في الحساب العادي، وفبراير في مقياس Sales by ShippingDate عند اختيار شهر الشحن.',
    optionsAr: [
      'CALCULATE صحيحة لغلاف المقياس القيمي المعدل.',
      'COMBIN تحسب عدد توليفات، لا مبيعات حسب علاقة تاريخ.',
      'MATCHBY تعرف هوية صف لحسابات نافذة، لا تفعّل علاقة الشحن.',
      'RANK للترتيب، لا مجموع المبيعات بتوقيت الشحن.',
      'CROSSFILTER تضبط اتجاه علاقة، وليست اختيار علاقة Inactive البديلة بهذا القالب.',
      'FILTER تحتاج جدولًا وشرطًا، لا عمودين لتعريف علاقة.',
      'PATH تبني مسار parent-child، لا أدوار التاريخ.',
      'USERELATIONSHIP صحيحة لربط ShippingDate بـ DateTime[Date] أثناء الحساب.',
    ],
    takeaway:
      'CALCULATE تعيد الحساب، و USERELATIONSHIP تختار علاقته الموجودة أثناء هذا الحساب فقط.',
    references: [dax('calculate'), dax('userelationship')],
    verdict: 'confirmed',
  },
  'f1-173-172': {
    translation:
      'Classes تحتوي مواد الطالب داخل خلية مفصولة بفواصل. تريد صفًا لكل طالب ومادة مع تكرار هويته واسمه. أي تحويل؟',
    story:
      'جون عنده أربع مواد في سطر واحد. عايز أربع بطاقات تسجيل باسمه، كل بطاقة مادة واحدة، مش أربعة أعمدة مواد ولا خلية قائمة.',
    reasoning: [
      'Split Column by delimiter الفاصلة، ثم Advanced options واختيار Rows لا Columns.',
      'تتكرر بقية أعمدة الطالب مع كل جزء، ثم Trim للمسافات بعد الفواصل إذا لزم.',
      'Unpivot تعالج أعمدة منفصلة كحقول، ولا تقسم محتوى الخلية عند الفاصلة بنفسها.',
    ],
    answer: 'Split Classes into rows by delimiter، الاختيار الأول.',
    correctIndices: [0],
    example:
      'John Yang: Biology, Chemistry, English, Calculus تتحول إلى أربعة صفوف بنفس StudentID=1، ومادة واحدة في كل صف. المثال الكامل ينتج 12 صفًا.',
    optionsAr: [
      'صحيح: الفاصل يقسم الخلية، واختيار Rows ينشئ صفوف التسجيل المطلوبة.',
      'Unpivot لا تفصل قائمة نصية داخل خلية واحدة؛ هي تحويل شكل أعمدة إلى صفوف.',
      'Extract text between delimiters تستخرج مقطعًا، ولا تنتج كل مواد الطالب في صفوف مستقلة.',
      'Convert to list وحدها لا تحفظ جدول الطالب/المادة النهائي؛ قد تستخدم قائمة في حل M متعدد الخطوات، لكنها ليست الإجراء الكامل هنا.',
    ],
    takeaway:
      'قيم متعددة داخل خلية: Split by delimiter إلى Rows. قيم موزعة على أعمدة: فكر في Unpivot.',
    references: [
      'https://learn.microsoft.com/en-us/power-query/split-columns-delimiter',
    ],
    verdict: 'confirmed',
  },
  'f1-174-173': {
    translation:
      'Eventhouse فيها بيانات IoT ضخمة وسريعة وتقبل استعلامًا شبه لحظي. تريد تقرير Desktop للتاريخ والبيانات الحية بأقل جهد. أي وضع اتصال؟',
    story:
      'وجود القديم والجديد في نفس المستودع لا يفرض نموذجًا نصفه Import ونصفه DirectQuery. المستودع نفسه يجاوب عن الاثنين.',
    reasoning: [
      'DirectQuery مع موصل KQL/ADX المدعوم تستعلم المصدر بدل استيراد التدفّق الخام كله.',
      'Composite تنفع لخلط مصادر أوأنماط عندما تحتاج ذلك، لكن السؤال لا يفرضه؛ تضيف تصميمًا بلا ضرورة هنا.',
      'Import تحتاج تحديثًا لإدخال الجديد، فلا تحقق الحل المباشر الأقل جهدًا لشبه اللحظي.',
      'DirectQuery تعني حداثة عند إعادة الاستعلام، لا تحديث الشاشة المفتوحة تلقائيًا. اضبط واختبر دورة عرض الصفحة والكاش.',
    ],
    answer: 'DirectQuery، الاختيار الثاني.',
    correctIndices: [1],
    example:
      'رسم يسأل Eventhouse عن آخر ساعة وآخر عن الشهر الماضي، وكلاهما من المصدر نفسه. لا يلزم نسخ التاريخ لمجرد أنه تاريخ.',
    optionsAr: [
      'Composite قد تكون تحسينًا مدروسًا، لكنها ليست لازمة لمجرد جمع التاريخ والحديث في نفس المصدر.',
      'DirectQuery صحيحة للاستعلام القريب من اللحظي دون تصميم مختلط غير مطلوب.',
      'Import لقطة تحتاج refresh لإدخال البيانات الجديدة، فلا تحقق المطلوب بالطريق المباشر هنا.',
    ],
    takeaway:
      'Historical + live لا تعني Composite تلقائيًا. مصدر واحد قادر على NRT قد تكفيه DirectQuery.',
    references: [
      'https://learn.microsoft.com/en-us/power-query/connectors/azure-data-explorer',
      'https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-directquery-about',
    ],
    verdict: 'confirmed',
  },
  'f1-175-174': {
    translation:
      'DimProduct فيها ProductID فريدة 1 و 2 و 3. FactSales فيها عمليات ويظهر المنتج 1 مرتين. حدد cardinality من FactSales إلى DimProduct.',
    story:
      'منتج A في الكتالوج مرة، لكنه اتباع يومين. مش هنرسم علاقة واحد لواحد عشان كل سطر بيع له منتج واحد؛ المهم تكرار المنتج عبر السطور.',
    reasoning: [
      'ProductID فريدة في DimProduct ومتكررة في FactSales، فتكون Fact جهة many والبُعد جهة one.',
      'من Fact إلى Dim تسمى many-to-one، ومن Dim إلى Fact نفس العلاقة one-to-many.',
      'لا نختار many-to-many لمجرد أن Fact كثيرة الصفوف؛ فريدة البُعد تتيح علاقة منتظمة أبسط. الأداء لا يبرر cardinality تخالف البيانات.',
    ],
    answer: 'many-to-one، الاختيار الرابع.',
    correctIndices: [3],
    example:
      'ProductID=1 له بيع 5 في 1 يناير وبيع 5 في 10 فبراير، بينما DimProduct بها صف Product A واحد. الطرف المتكرر Fact، والفريد Dim.',
    optionsAr: [
      'one-to-many تصف الاتجاه المعاكس من Dim إلى Fact، لا ترتيب الجدولين في السؤال.',
      'one-to-one لا تصح لأن ProductID=1 تتكرر في FactSales.',
      'many-to-many غير لازمة مع فريدة ProductID في DimProduct.',
      'many-to-one صحيحة من FactSales المتكررة إلى DimProduct الفريدة.',
    ],
    takeaway:
      'Cardinality تتبع فريدة عمود الربط، مش اسم الجدول وحده ولا عدد صفوفه الإجمالي.',
    references: [relationships],
    verdict: 'confirmed',
  },
  'f1-176-175': {
    translation:
      'Dim Location مرتبطة بـ Fact Deliveries نشطًا عبر Origin وغير نشط عبر Destination. Deliveries تعد الصفوف. أكمل عدد التوصيلات حسب الوجهة.',
    story:
      'اختيار القاهرة يحسب الخارج منها افتراضيًا. عايز نفس الاختيار يحسب الواصل إليها، فتحتاج طريق الوجهة للحساب الجديد.',
    reasoning: [
      'CALCULATE تقيم[Deliveries] تحت علاقة محددة للحساب.',
      'USERELATIONSHIP تشير إلى Location ID و Destination Location ID، لا Origin.',
      'لا يتغير المقياس الأساسي عالميًا ولا تنشأ علاقة جديدة. لو أردت فلتر أصل ووجهة مستقلين في وقت واحد، قد تحتاج بُعدين بدورين مختلفين.',
      'المصدر يسمي البُعد Dim Location لكن القالب يكتب Location. وحّد اسم الجدول الفعلي قبل تشغيل الصيغة، ولا تنسخ التعارض كما هو.',
    ],
    answer: 'CALCULATE؛ USERELATIONSHIP.',
    example:
      'Cairo→Alex تدخل Cairo كأصل و Alex كوجهة. مقياسا الخارج والداخل يمكنهما استخدام نفس البُعد عبر علاقتين مختلفتين في الحساب.',
    optionsAr: [
      'ALLSELECTED تفيد إجماليات الاختيار، لا اختيار علاقة الوجهة Inactive.',
      'CALCULATE صحيحة لغلاف الحساب القيمي.',
      'USERELATIONSHIP صحيحة لعمودي علاقة الوجهة الموجودة.',
      'CALCULATETABLE ترجع جدولًا، لا عدد التوصيلات القيمي.',
      'CROSSFILTER تضبط اتجاه علاقة، لا تفعّل مسار الوجهة البديل بهذا القالب.',
      'KEEPFILTERS تقاطع شروط الفلاتر، لا تختار Origin أم Destination كعلاقة.',
    ],
    takeaway:
      'نفس المكان له دور أصل ووجهة. اختر عمود العلاقة الموافق للدور، مش اسم البُعد فقط.',
    references: [dax('userelationship'), dax('calculate')],
    verdict: 'confirmed',
  },
  'f1-177-176': {
    translation:
      'Sales_Spreadsheet مصدر مشترك. Customer تحتاج ID و Name، و Sales تحتاج ID و Date و Amount. تريد مكانًا واحدًا لتعديل المنطق. كيف تنشئ Sales وماذا تفعل بالمصدر الوسيط؟',
    story:
      'نظف الملف في مطبخ واحد، وخذ منه طبق العملاء وطبق البيع. مش لازم تحمل الخليط الخام كجدول ثالث بلا سبب.',
    reasoning: [
      'Reference تربط Sales بمنطق التحضير المشترك، بدل نسخة مستقلة من الخطوات.',
      'Disable load تمنع نسخة staging إضافية في النموذج، لكن الاستعلام يظل يُقيّم لتغذية الفروع.',
      'Delete تكسر المراجع. Exclude from report refresh ليست بديلًا عن تعطيل التحميل ولا تضمن عدم تقييم المصدر عند احتياج الفروع.',
      'Reference توحد صيانة المنطق، ولا تضمن قراءة واحدة أو cache مشتركة. تأكد كذلك من فريدة CustomerID في بُعد العملاء.',
    ],
    answer: 'Reference Sales_Spreadsheet؛ Disable the load to the model.',
    example:
      'تصحيح اسم عمود في المصدر المركزي يصل للفرعين. بعد منع التحميل تظل staging في Power Query، وتظهر Customer و Sales فقط كجداول نهائية.',
    optionsAr: [
      'إنشاء مصدر Excel جديد يكرر التحضير والصيانة، ولا يحقق نقطة التعديل الواحدة.',
      'Duplicate تنسخ الخطوات وتستقل بها، فلا تنتقل تعديلات الأصل اللاحقة تلقائيًا.',
      'Reference صحيحة لاعتماد Sales على الأصل المشترك.',
      'Delete للمصدر تكسر الاستعلامات المرجعية المعتمدة عليه.',
      'Disable load صحيحة لمنع نسخة staging إضافية من النموذج.',
      'Exclude from report refresh تعدل سياسة تحديث الاستعلام، لا قرار تحميله، ولا تحل التكرار التخزيني هنا.',
    ],
    takeaway:
      'Reference للصيانة، و Disable load للـ staging. ولا تساوي أي منهما منع قراءة المصدر تمامًا.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/guidance/power-query-referenced-queries',
      'https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-include-in-report-refresh',
    ],
    verdict: 'confirmed',
  },
  'f1-178-177': {
    translation:
      'DimDate مرتبطة بـ FactOrderDetails عبر OrderDate نشطًا، و ShippedDate و RequiredDate غير نشطين. ما نوع البُعد؟ وأي تاريخ يُفلتر افتراضيًا؟',
    story:
      'التقويم واحد لكنه يؤدي دور يوم الطلب أوالشحن أوالاستحقاق. الخط المتصل يقول أي دور شغال افتراضيًا؛ الخطوط المتقطعة مش كلها شغالة معاه.',
    reasoning: [
      'تعدد أدوار مفهوم التاريخ في نفس Fact هو Role-playing dimension.',
      'فلتر DimDate يمر عبر OrderDate النشطة افتراضيًا، ولا ينتقل تلقائيًا عبر العلاقتين غير النشطتين.',
      'لحساب دور آخر استخدم USERELATIONSHIP على علاقته الموجودة، أولفلاتر متزامنة مستقلة أنشئ أبعاد أدوار منفصلة.',
      'Role-playing ليست مرادفًا لأي Dimension؛ هي وصف لأكثر من دور لنفس المفهوم.',
    ],
    answer: 'role-playing؛ filter FactOrderDetails on OrderDate.',
    example:
      'طلب 10 يناير شُحن 15 يناير. اختيار 10 يناير يعده في الحساب الافتراضي بتاريخ الطلب؛ اختيار 15 لا يضيفه لمجرد أن الشحن وقع فيه.',
    optionsAr: [
      'degenerate هوية بُعد في Fact بلا جدول بُعد مستقل؛ ليست التقويم الموجود.',
      'role-playing صحيحة لأدوار الطلب والشحن والاستحقاق.',
      'snowflake تقسيم صفات بُعد عبر سلسلة جداول، لا تعدد أدوار تواريخ Fact.',
      'OrderDate صحيحة لأنها العلاقة النشطة الافتراضية.',
      'RequiredDate غير نشطة، فلا تمرر الفلتر تلقائيًا.',
      'ShippedDate غير نشطة أيضًا؛ تحتاج حسابًا يحدد مسارها.',
      'not filter خطأ لوجود علاقة OrderDate النشطة.',
    ],
    takeaway:
      'Role-playing أدوار متعددة، و Active هو المسار الافتراضي. Inactive ليست فلترة تلقائية.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive',
    ],
    verdict: 'confirmed',
  },
  'f1-179-178': {
    translation:
      'Value تعرض 78000.00 و 85000.00 و 17000.00. Datetime وقتها 00:00:00.000. الجدول 250 ألف صف بنفس النمط. اختر نوعين لتقليل الحجم.',
    story:
      'النقطة في 78000.00 علامة عشرية مش وقت، لكن كسرها صفر. أما 00:00:00 فيخص عمود Datetime. عمودان ومعنيان مختلفان.',
    reasoning: [
      'Whole Number مناسبة إذا كل القيم بلا كسور فعلية كما يقصد نمط العينة؛ 78000.00 تساوي 78000.',
      'Date تكفي إذا كل الأوقات منتصف الليل ولا يلزم الوقت كما في السؤال.',
      'تنسيق منزلتين وحده لا يثبت أن الكسور صفر؛12.50 لها نفس التنسيق. افحص كل الصفوف، لا عينة أول 1000 فقط.',
      'لا نضمن فرق حجم ثابتًا بالبايت لكل عمود؛ الاختيار يحفظ المطلوب ويتجنب دقة غير لازمة.',
    ],
    answer:
      'Value: Whole number. Datetime: Date، بشرط عدم وجود كسور أوأوقات مطلوبة خارج العينة.',
    example:
      '78000.00→78000 لا تفقد مبلغًا. 78000.50 فيها كسر فلا تصلح نفس الحجة. وتاريخ 2024-08-15 بوقت صفر يمكن تمثيله كيوم فقط.',
    optionsAr: [
      'Decimal number تحفظ الكسور؛ ليست مطلوبة إذا كلها صفر، لكن اخترها إن توجد كسور ذات معنى.',
      'Fixed decimal number دقة ثابتة مفيدة عند الحاجة، لا لازمة لكل قيمة صحيحة هنا.',
      'Percentage ليست أداة ضغط خاصة لهذه القيم؛ تغير معنى العرض ولا تحل النوع المناسب.',
      'Whole number صحيحة إذا كل أجزاء الكسر صفر فعلًا.',
      'Date صحيحة لعمود Datetime إذا الوقت غير مطلوب.',
      'Date/time/timezone تحمل تفصيل وقت ومنطقة غير مطلوبين في العينة.',
      'Datetime تبقي دقة وقت غير لازمة تحت فرض السؤال.',
      'Time وحدها تحذف اليوم والشهر والسنة وتفقد المعلومة المطلوبة.',
    ],
    takeaway:
      '.00 كسر صفري، و 00:00:00 وقت متكرر. لا تخلط العمودين، واختبر البيانات قبل تقليل الدقة.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction',
      'https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-data-types',
    ],
    verdict: 'conditional',
  },
  'f1-180-179': {
    translation:
      'Table1 أنشئت بـ Import وتريد DirectQuery في مسار Desktop المحلي المعتاد. ماذا تفعل من الخيارات؟',
    story:
      'مش مجرد زر عرض. الجدول اتبنى كنسخة محلية، فتحتاج إعادة إضافته باتصال مدعوم، مع حفظ العلاقات والحسابات التي قد يكسرها الحذف.',
    reasoning: [
      'الجدول Import الأصلي لا يتحول عادة إلى DirectQuery مباشرة من Storage mode في هذا المسار.',
      'إعادة الإضافة تحتاج مصدرًا وموصلًا يدعمان DirectQuery وخطوات M متوافقة. خذ نسخة واحفظ التبعيات أولًا.',
      'Duplicate تنسخ الاستعلام ولا تجعل المصدر يدعم وضع اتصال جديد.',
      'التوثيق الحالي يذكر استثناءات web modeling و live editing ذات version control للتراجع عن تغيير سابق. لا نعمم القاعدة لنفي كل استرجاع في كل بيئة.',
    ],
    answer:
      'Delete and add again in DirectQuery، الاختيار الأول في السيناريو التقليدي، مع نسخة ومراجعة التبعيات.',
    correctIndices: [0],
    example:
      'مصدر SQL المدعوم يمكن إعادة ربطه. ملف Excel لا يصبح DirectQuery بتغيير الاسم. احفظ نسخة قبل حذف جدول ترتبط به measure ورسومات.',
    optionsAr: [
      'صحيح من الخيارات لهذا الجدول المحلي المعتاد، بعد حفظ نسخة ومراجعة الاعتمادات.',
      'Duplicate وحدها لا تغير نوع التخزين إلى DirectQuery.',
      'Storage mode لا توفر التحويل الاعتيادي المباشر لجدول Import الأصلي بهذا السيناريو.',
      'إضافة aggregation لا تحول الجدول الأصلي إلى DirectQuery؛ هي تصميم آخر.',
    ],
    takeaway:
      'اتجاه التحويل وبيئة التحرير مهمان. لا تحذف جدولًا حقيقيًا دون نسخة ومراجعة الاعتمادات.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-storage-mode',
    ],
    verdict: 'conditional',
  },
};
