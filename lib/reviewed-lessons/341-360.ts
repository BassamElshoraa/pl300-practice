import type { ReviewedLesson } from './types.ts';
const roles =
  'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces';
const rls =
  'https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-rls';
const rel =
  'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships';
const calc = 'https://learn.microsoft.com/en-us/dax/calculate-function-dax';
export const lessons341: Record<string, ReviewedLesson> = {
  'f1-341-340': {
    translation:
      'ملف PBIX حساس. لو اتبعت بالإيميل أو اتنزّل بعد النشر، لازم يفتحه مستخدم داخلي مخوّل فقط. تختار إيه؟',
    story:
      'صلاحية Workspace تحمي الموجود في الخدمة، لكن نسخة الإيميل خارجها. محتاج حماية تسافر مع الملف نفسه.',
    reasoning: [
      'طبّق Sensitivity label في Desktop قبل نشر الملف، بسياسة تشفير تقصر الفتح على الهويات الداخلية المخولة.',
      'اسم العلامة وحده دون سياسة حماية مناسبة لا يكفي. التصنيف ينتقل للموديل والتقرير والتنزيل في المسارات المدعومة.',
    ],
    answer:
      'A: Apply a sensitivity label in Desktop بسياسة حماية داخلية مناسبة.',
    correctIndices: [0],
    example:
      'ملف Internal المشفر يطلب هوية داخلية مخولة حتى لو شخص أعاد توجيه الإيميل خارج المؤسسة.',
    optionsAr: [
      'صحيح؛ يحمي نسخة PBIX قبل خروجها ثم تنتقل العلامة في المسارات المدعومة.',
      'Certification اعتماد جودة، لا تشفير أو منع فتح خارجي.',
      'Live connection يغير مكان الاستعلام، ولا يفرض وحده سياسة فتح الملف.',
      'التطبيق بعد النشر لا يحمي النسخة الأصلية المرسلة قبل ذلك بالإيميل.',
    ],
    takeaway:
      'حماية الملف تبدأ قبل النشر، وبسياسة حماية فعلية لا مجرد اسم تصنيف.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/enterprise/service-security-sensitivity-label-overview',
    ],
    verdict: 'confirmed',
  },
  'f1-342-341': {
    translation:
      'Northwind تجمع Azure SQL بحجم 2GB و Excel بحجم 5MB من SharePoint. مطلوب موديل واحد سريع وبيانات يومية جاهزة 7 صباحًا. أنهي mode؟',
    story:
      'الشركة مش طالبة كل فاتورة تظهر فورًا. طالبة نسخة صباحية سريعة لثلاثة تقارير؛ نستورد ونعمل Refresh منظم.',
    reasoning: [
      'Import يناسب التحديث اليومي ودمج Excel مع SQL، ويخدم المرئيات من الذاكرة.',
      'حجم المصدر 2GB لا يساوي حجم الموديل المضغوط، ولا يثبت أنه داخل حد أي ترخيص؛ لازم قياس السعة.',
      'اجعل وصول ملف العملاء قبل التحديث، واختار Pacific Time مع هامش اكتمال قبل 7 صباحًا؛ لا تبدأ الساعة 7 وتعد أنه جاهز 7.',
    ],
    answer: 'A: Import.',
    correctIndices: [0],
    example:
      'ملف العملاء يصل 5 صباحًا، ثم تحديث SQL و Excel ينتهي قبل 7؛ تصفح التقارير بعدها من النسخة المستوردة.',
    optionsAr: [
      'صحيح؛ يناسب الحداثة اليومية وسرعة التفاعل مع تصميم وسعة مناسبين.',
      'Excel ليس مصدر DirectQuery عاديًا، واستعلام القاعدة عند كل تفاعل غير مطلوب هنا.',
      'Composite ممكن تقنيًا لكنه يضيف تعقيدًا دون ضرورة من المتطلبات.',
      'Live connection يحتاج موديلًا تحليليًا قائمًا؛ هنا نبني من SQL و Excel.',
    ],
    takeaway:
      'تحديث يومي ومصادر مختلطة وسرعة تفاعل: Import، مع قياس الحجم الفعلي.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/connect-data/service-dataset-modes-understand',
    ],
    verdict: 'confirmed',
  },
  'f1-343-342': {
    translation:
      'Northwind تطلب من نفس قسم المبيعات تحرير المحتوى وإدارة App، وفي الوقت نفسه قصر كل موظف على منطقته بـRLS. هل يوجد اختيار يحقق الكل؟',
    story:
      'Member يعطي مفاتيح الورشة، وصاحب صلاحية تعديل الموديل لا يعامل كقارئ مقيد بـRLS. هنا متطلبات الحالة متعارضة.',
    reasoning: [
      'D هو المقصود لحقوق التأليف ونشر App، لكنه لا يحقق شروط الحالة كاملة.',
      'Admin و Member و Contributor يتجاوزون RLS على موديلات مساحة العمل. كذلك Member لا يزيل المستخدمين أو يغير جميع الأدوار الحالية مثل Admin.',
      'لا توجد إجابة واحدة من المعروض تجمع التحرير مع إلزام نفس الهوية بـRLS. افصل جمهور الاستهلاك المقيد عن أدوار التأليف الموثوقة أو أعد صياغة المتطلبات.',
    ],
    answer:
      'لا يوجد اختيار يحقق كل المتطلبات. D مقصودة للتأليف فقط، لا للأمن الكامل.',
    example:
      'Sales Member يصل إلى الموديل رغم فلتر EmailAddress؛ Sales Viewer مع دور RLS يرى منطقته لكنه لا يدير App.',
    optionsAr: [
      'مشاركة التقارير تعطي استهلاكًا، لا حقوق التحرير وإدارة App.',
      'Admin يمنح الإدارة لكنه أوسع ويتجاوز RLS.',
      'App يناسب الاستهلاك المقيد، ولا يمنح إدارة المساحة والتأليف.',
      'Member يحقق مهام تأليف كثيرة لكنه يتجاوز RLS، فلا يعد حلًا كاملًا للحالة.',
    ],
    takeaway:
      'RLS لا يقيد محرر الموديل. السؤال المتعارض يحتاج تنبيهًا، لا حفظ D كحل أمني.',
    references: [rls, roles],
    verdict: 'incomplete',
  },
  'f1-344-343': {
    translation:
      'Northwind تريد إخطار المخزن إذا نسبة الطلبات المتأخرة هذا الشهر تجاوزت 5%. اختار مكان العرض ونوع الإخطار.',
    story:
      'عايز جرس على رقم واحد: نسبة التأخير. نعرضها Card على Dashboard ونربطها بحد، مش إيميل يومي مهما كانت النتيجة.',
    reasoning: [
      'Dashboard بها Card من النوع المدعوم تعرض النسبة في سياق الشهر الحالي.',
      'Data alert يتجاوز 5% هو المقصود. التنبيه التقليدي شخصي؛ رتب وصول الإخطار للقسم، مثل تدفق Power Automate مناسب.',
      'الفحص يعتمد على تحديث البيانات؛ Import يومي لا يعني رقابة لحظية لكل شحنة.',
    ],
    answer: 'Dashboard ثم Data alert.',
    example:
      '10 طلبات متأخرة من 100 تعطي 10% وتتجاوز الحد؛4 من 100 تعطي 4% ولا تتجاوزه.',
    optionsAr: [
      'Report يبني Card لكن التنبيه التقليدي المطلوب يعمل على Dashboard tile.',
      'Bookmark يحفظ حالة عرض ولا ينشئ التنبيه.',
      'صحيح؛ Dashboard تستضيف Tile المناسبة.',
      'صحيح؛ Data alert يختبر تجاوز النسبة.',
      'Phone view تنسيق موبايل لا إخطار شرطي.',
      'Subscription دوري ولا يحقق شرط تجاوز 5% وحده.',
    ],
    takeaway:
      'Card على Dashboard ثم Alert للعتبة؛ رتب جمهور الإخطار وتحديث البيانات.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/service-set-data-alerts',
    ],
    verdict: 'confirmed',
  },
  'f1-345-344': {
    translation:
      'Contoso عندها صف لكل منتج في Product list، وإيراد على مستوى التاريخ والمنتج. أنهي cardinality من القائمة للإيرادات؟',
    story:
      'الدراجة لها تعريف واحد، لكن بتتباع في أيام كثيرة. تعريف في بُعد المنتجات ونتائج كثيرة في حقائق الإيرادات.',
    reasoning: [
      'ProductID فريد في القائمة ومكرر عبر تواريخ Revenue، إذن العلاقة من القائمة إلى النتائج 1:*.',
      'تحقق من التفرد واجعل اتجاه الفلتر المعتاد من البعد إلى الحقائق، دون many-to-many بلا داعٍ.',
    ],
    answer: 'D: One to many.',
    correctIndices: [3],
    example: 'Bike01 صف في الكتالوج، وله نتائج إيراد في يناير وفبراير ومارس.',
    optionsAr: [
      'One-to-one يمنع التكرار الصحيح للمنتج عبر تواريخ الإيراد.',
      'Many-to-many غير ضرورية مع قائمة منتجات ذات مفتاح فريد.',
      'Many-to-one تصح من الإيراد إلى المنتج، لا اتجاه السؤال العكسي.',
      'صحيح؛ منتج واحد يقابله صفوف نتائج كثيرة.',
    ],
    takeaway: 'اعرف معنى الصف: منتج مرة وإيراد عبر التواريخ يعني 1:*.',
    references: [rel],
    verdict: 'confirmed',
  },
  'f1-346-345': {
    translation:
      'Contoso تريد نسبة مساهمة كل Product category في الإيراد. أكمل حساب إجمالي الفئات ثم قسمة الإيراد الحالي عليه.',
    story:
      'أنت واقف على Bikes: البسط مبيعات Bikes. المقام يشيل فلتر Category فقط ليقارنها ببقية الفئات في نفس الفترة، لا كل تاريخ الشركة.',
    reasoning: [
      'CALCULATE يعدل سياق SUM(Revenue).',
      'ALL(ProductList[ProductCategory]) يزيل فلتر الفئة ويترك مثلًا التاريخ وفلاتر أخرى لم تُزل.',
      'DIVIDE يقسم الإيراد الحالي على AllCategoryRev بأمان عند الصفر.',
      'SUM([Revenue]) اختصار في المصدر؛ استخدم مرجع عمود حقيقي، أو [Revenue] دون SUM لو كان Measure بالفعل.',
    ],
    answer: 'CALCULATE → ALL → DIVIDE.',
    example:
      'Bikes40 و Accessories60 في Q1: مساهمة Bikes40%. عند اختيار Q2 نحسب مقام Q2 من جديد.',
    optionsAr: [
      'ALL لا يحل محل حساب Scalar الإيراد في الفراغ الأول.',
      'ALLEXCEPT يحتاج جدولًا وأعمدة؛ لا يطابق هذا القالب.',
      'صحيح أولًا؛ يقيّم SUM بسياق معدل.',
      'DIVIDE يحتاج بسطًا ومقامًا لا فلترًا لتحضير الإجمالي.',
      'FILTER يرجع جدولًا لا إجمالي الإيراد هنا.',
      'صحيح ثانيًا؛ يزيل فلتر عمود الفئة.',
      'ALLEXCEPT لا يقبل عمود الفئة وحده بصيغة ALL.',
      'CALCULATE على عمود الفئة وحده لا يؤدي وظيفة إزالة فلتره.',
      'DIVIDE لا يرجع الفئات أو يزيل فلترها.',
      'FILTER يحتاج جدولًا وشرطًا لا وسيط عمود واحد.',
      'ALL لا يقسم البسط على المقام.',
      'ALLEXCEPT يعدل الفلاتر مع إبقاء أعمدة معينة؛ ليس دالة قسمة بسط على مقام.',
      'CALCULATE لا يقسم وسيطيه؛ الثاني يفسر كفلتر.',
      'صحيح ثالثًا؛ DIVIDE يحسب النسبة.',
      'FILTER ينتج جدولًا لا نسبة الإيراد.',
    ],
    takeaway: 'نسبة من إجمالي الفئات: أزل فلتر الفئة من المقام فقط، ثم اقسم.',
    references: [
      calc,
      'https://learn.microsoft.com/en-us/dax/all-function-dax',
      'https://learn.microsoft.com/en-us/dax/divide-function-dax',
    ],
    verdict: 'confirmed',
  },
  'f1-347-346': {
    translation:
      'Contoso بها 4Business units. رتب إعداد RLS ليقرأ محلل كل وحدة P&L لوحدته فقط.',
    story:
      'أربع بوابات: نسميها، نكتب قاعدة كل بوابة، ننشرها، ثم نوزع الناس عليها. لا نعطي المحلل مفتاح تعديل البوابة نفسها.',
    reasoning: [
      'أنشئ 4 أدوار ثم أضف DAX filter للوحدة الصحيحة في كل دور.',
      'انشر الموديل ثم أضف أعضاء الأدوار في الخدمة.',
      'يبقى المحللون مستهلكين مقيدين مع Build المسموح، لا Contributor على موديل P&L؛ راجع عدم جمعهم في وحدات غير مخولة.',
    ],
    answer: 'Create four roles → DAX filters → Publish → Add role members.',
    example:
      'جروب UnitA مع دور UnitA. Build يسمح لهم بتقرير خاص مع استمرار فلتر الوحدة.',
    optionsAr: [
      'Contributor يحرر الموديل ويتجاوز RLS؛ ليس الحل.',
      'صحيح ثانيًا؛ الفلتر يحدد صفوف الوحدة.',
      'صحيح أخيرًا؛ العضوية بعد وجود الدور المنشور.',
      'صحيح أولًا؛ إنشاء الأدوار قبل كتابة فلاترها.',
      'صحيح ثالثًا؛ ينقل الأدوار إلى الخدمة لتعيين العضوية.',
    ],
    takeaway:
      'Role ثم Filter ثم Publish ثم Members؛ لا تحتاج Write لتستفيد من Build.',
    references: [rls],
    verdict: 'confirmed',
  },
  'f1-348-347': {
    translation:
      'Contoso تخزن رصيد كل حساب نهاية كل شهر. أنهي DAX يعطي Ending balance للربع؟',
    story:
      'رصيد يناير 100 وفبراير 120 ومارس 90 لا يعني 310 آخر الربع. معاك 90. نجمع الحسابات في نهاية الفترة، لا نفس الحساب عبر الشهور.',
    reasoning: [
      'LASTDATE يحدد آخر تاريخ في السياق؛ CALCULATE يقصر SUM على ذلك التاريخ.',
      'SUM يجمع الحسابات المختلفة؛ MAX يأخذ أعلى حساب ويهمل البقية.',
      'الحالة تضمن صفًا لكل حساب لكل شهر وربطًا بنهاية الشهر؛ لو البيانات غير مكتملة قد تحتاج آخر تاريخ به بيانات لا آخر يوم تقويم فقط.',
    ],
    answer:
      "A: CALCULATE(SUM(BalanceSheet[BalanceAmount]),LASTDATE('Date'[Date])).",
    correctIndices: [0],
    example:
      '31 مارس Cash90 و Inventory50: الإجمالي 140، لا جمع Snapshots يناير وفبراير معهما.',
    optionsAr: [
      'صحيح؛ يجمع حسابات آخر تاريخ.',
      'DATESQTD مع SUM يكرر الأرصدة عبر الربع.',
      'FIRSTNONBLANK يبحث عن البداية لا النهاية، والصيغة منسوخة بفاصل ناقص.',
      'LASTDATE مناسب لكن MAX يهمل أرصدة بقية الحسابات.',
    ],
    takeaway: 'الرصيد يجمع عبر الحسابات، لا عبر الزمن.',
    references: [
      calc,
      'https://learn.microsoft.com/en-us/dax/lastdate-function-dax',
    ],
    verdict: 'confirmed',
  },
  'f1-349-348': {
    translation:
      'Litware تريد نفس الرسم يتفلتر بشهر البيع وشهر الشحن بشكل مستقل. كيف تصمم التواريخ؟',
    story:
      'عايز طلبات اتباعت في يناير واتشحنت في فبراير في نفس اللحظة. كل دور تاريخ محتاج سلايسر ومسار فلترة مستقلين.',
    reasoning: [
      'بعد Date للبيع ونسخة ShipDate للشحن، بمفتاح يوم فريد في كل واحد.',
      'علاقة Active1:* من Date إلى sales_date_id وأخرى من ShipDate إلى sales_ship_date_id.',
      'المصدر كتب sales_skip_date_id في D؛ خطأ مطبعي، والعمود الحقيقي sales_ship_date_id.',
    ],
    answer: 'D، مع تصحيح skip إلى ship.',
    correctIndices: [3],
    example:
      'OrderDate=Jan و ShipDate=Feb يظهران تقاطع الطلبات المباعة في يناير والمشحونة في فبراير.',
    optionsAr: [
      'ربط مفتاح يوم بمفتاح أسبوع مختلف Grain لا يبني دور الشحن المستقل.',
      'يعكس جهة 1:* ويترك بعد تاريخ واحدًا دون استقلال الدورين.',
      'Many-to-many غير لازمة لمفاتيح تواريخ فريدة.',
      'صحيح؛ بعدان مستقلان 1:*، مع تصحيح typo العمود.',
    ],
    takeaway: 'فلتران مستقلان لدورين في نفس الرسم: بعدا تواريخ بعلاقتين Active.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive',
    ],
    verdict: 'conditional',
  },
  'f1-350-349': {
    translation:
      'Litware تريد كل Sales manager يرى منطقة مبيعاته فقط. أنهي فلتر يطابق هوية المستخدم؟',
    story:
      'جدول المديرين فيه username وربطه بالمنطقة. نبدأ من حساب الشخص الذي فتح التقرير، لا اسمه الظاهر الذي قد يتكرر.',
    reasoning: [
      'Sales Manager[username]=USERNAME() يحدد صف هوية المدير.',
      'يجب أن تطابق قيم username الهوية المرجعة فعلًا وأن تنتقل الفلترة عبر العلاقات إلى Sales. شكل USERNAME قد يختلف بين Desktop و Service؛ اختبره.',
      'لا تمنح المستخدم Write أو دور تحرير على نفس الموديل إذا أردت إلزامه بـRLS.',
    ],
    answer: 'A: username = USERNAME().',
    correctIndices: [0],
    example:
      'ahmed@litware.com يحدد صف مدير Region3 ثم مبيعات Region3. الاسم الظاهر Ahmed لا يكفي.',
    optionsAr: [
      'صحيح؛ يقارن هوية العمود بهوية المستخدم الحالي.',
      'username مقابل sales_manager_id يخلط حساب الدخول بمعرف داخلي ولا يستخدم المستخدم الحالي.',
      'sales_manager_id ليس UPN، وجدول Region Manager ليس صف هوية المندوب المطلوب.',
      'name اسم ظاهر لا يضمن مطابقة USERNAME، بخلاف عمود username المصمم لذلك.',
    ],
    takeaway:
      'هوية المستخدم تختار صفه، والعلاقات تنقل فلتر المنطقة إلى الحقائق.',
    references: [rls],
    verdict: 'confirmed',
  },
  'f1-351-350': {
    translation:
      'دمجت جداول المديرين والمناطق في Region. المطلوب عرض Returns حسب Region manager ثم Sales managers التابعين له. تضيف إيه؟',
    story:
      'تفتح اسم مديرة الإقليم فتشوف فريقها تحته وأرقام المرتجعات لكل واحد. ده سلم عرض، مش قاعدة أمن جديدة.',
    reasoning: [
      'أنشئ Hierarchy: manager name ثم sales manager name في Region.',
      'ضع مقياس Returns الصحيح مع علاقاته؛ Hierarchy تنظم الحقول ولا تنشئ العلاقة أو المبلغ من نفسها.',
    ],
    answer: 'D: hierarchy of manager name then sales manager name.',
    correctIndices: [3],
    example:
      'Mona تفتحها فتظهر Ahmed و Sara، وكل اسم أمامه إجمالي المرتجعات في السياق الحالي.',
    optionsAr: [
      'استرجاع مدير من Fact مرتجعات في عمود جديد ليس ترتيب مستويات العرض المطلوب.',
      'RLS يحدد المسموح، لا يصنع سلم مدير ثم مرؤوس.',
      'علاقة ثنائية لا تنشئ Hierarchy وقد تسبب مسارات فلترة ملتبسة.',
      'صحيح؛ ينظم مستويي المدير والتابعين للـDrill.',
    ],
    takeaway: 'من مدير لمرؤوس في العرض = Hierarchy؛ الأمن والعلاقات أمران مكملان.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/consumer/end-user-drill',
    ],
    verdict: 'confirmed',
  },
  'f1-352-351': {
    translation:
      'Litware تطلب عدد معاملات المبيعات. كل صف Sales يمثل عملية ذات sales_id فريد. تنشئ إيه؟',
    story:
      'أرقام الفواتير 5 و 9 و 30 تعني 3 عمليات، مش 44 عملية. المعرف اسم للعملية لا كمية نجمعها.',
    reasoning: [
      'Measure COUNTROWS(Sales) يعد الصفوف في السياق الحالي.',
      'يعتمد الحل على Grain المعطى. لو الصف بند فاتورة لا عملية كاملة لاحتجنا عد معرف العملية المميز.',
    ],
    answer: 'A: measure COUNTROWS(Sales).',
    correctIndices: [0],
    example:
      'Region1 بها 200 صف عمليات فريدة؛ المقياس يعطي 200 ثم يتغير مع فلتر الشهر.',
    optionsAr: [
      'صحيح؛ Measure ديناميكي يعد العمليات وفق الفلاتر.',
      'COUNTA داخل Calculated column لا يقدم عدًا ديناميكيًا للعمليات، وقد يكرر إجماليًا لكل صف.',
      'SUM للمعرفات في عمود ليس عدد العمليات.',
      'SUM للمعرفات في Measure يظل يجمع الأرقام لا يعد المعاملات.',
    ],
    takeaway: 'اعرف Grain أولًا؛ عملية واحدة لكل صف تعني COUNTROWS.',
    references: [
      'https://learn.microsoft.com/en-us/dax/countrows-function-dax',
    ],
    verdict: 'confirmed',
  },
  'f1-353-352': {
    translation:
      'Litware لا تريد أن تدخل sales_amount السالبة أو المفقودة في إجمالي المبيعات. أنهي صيغة تحقق ذلك؟',
    story:
      '100 وسالب 20 و BLANK: المطلوب 100، مش 80 ولا 120. السالب يُستبعد، لا نقلبه لموجب.',
    reasoning: [
      'استخدم SUMX(FILTER(Sales,Sales[sales_amount]>0),Sales[sales_amount]).',
      'أصلح القوس الزائد في المصدر. الصفر لا يغير الإجمالي، فاستبعاده لا يضر مجموع المبالغ.',
      'Measure يحترم فلاتر التقرير؛ لا يعني استبعاد السالب من هذا المقياس حذف سجلاته من الموديل.',
    ],
    answer: 'B بعد إصلاح أقواس SUMX.',
    correctIndices: [1],
    example:
      '100 و-20 و BLANK و 50: النتيجة 150؛ ABS يعطي 170 و SUM العادي 130.',
    optionsAr: [
      'ABS يحول-20 إلى+20 فيضيف ما طُلب استبعاده.',
      'صحيح؛ فلترة الموجب ثم جمعه، بعد إصلاح الصيغة.',
      'SUM يتجاهل BLANK لكنه يضم السالب.',
      'استبدال BLANK بصفر يترك السالب داخل الإجمالي.',
    ],
    takeaway: 'استبعاد السالب لا يساوي تحويله لموجب؛ فلتر ثم اجمع.',
    references: ['https://learn.microsoft.com/en-us/dax/sumx-function-dax'],
    verdict: 'conditional',
  },
  'f1-354-353': {
    translation: 'Litware تريد تسمية شهر مثل Feb 2020. أي عمود وصيغة نستخدم؟',
    story:
      'date_id مثل 20200229 رقم مفتاح، مش تاريخ جاهز للتنسيق. خُد Date الحقيقي وأظهر الشهر المختصر والسنة الكاملة.',
    reasoning: [
      'FORMAT(Date[date],"MMM YYYY") ينتج نصًا بالشكل المطلوب في لغة إنجليزية.',
      'علامتا الاقتباس حول format string ضروريتان؛ المصدر أسقطهما أثناء الاستخراج.',
      'اضبط Sort by column مثل Month=202002 لمنع الترتيب الأبجدي. استخدم locale إنجليزيًا إذا كانت Feb مطلوبة حرفيًا.',
    ],
    answer: 'A: FORMAT(\'Date\'[date], "MMM YYYY").',
    correctIndices: [0],
    example:
      'تاريخ 2020-02-29 يظهر Feb 2020، ومفتاح 202002 يجعله قبل Mar 2020.',
    optionsAr: [
      'صحيح؛ تاريخ حقيقي، شهر مختصر، وسنة 4 أرقام.',
      'تنسيق date_id العددي لا يفسره كتاريخ yyyymmdd تلقائيًا؛ ليس بديلًا مناسبًا لعمود Date.',
      'نفس المشكلة: رقم المفتاح ليس تاريخًا لمجرد ترتيب أرقامه.',
      'M YY يعطي شهرًا رقميًا وسنة قصيرة، لا Feb 2020.',
    ],
    takeaway: 'اسم الشهر للعرض، ومفتاح سنة/شهر للترتيب.',
    references: ['https://learn.microsoft.com/en-us/dax/format-function-dax'],
    verdict: 'conditional',
  },
  'f1-355-354': {
    translation:
      'Northwind: هل نربط CustomerID بالاسم نفسه بين Excel و Orders؟ هل نوع مفاتيح الربط Text؟ وهل Region لتقرير Top Customers من Orders؟',
    story:
      'Excel عنده CustomerID عددي 1، لكن Orders عنده VINET. المقابل الحقيقي لـVINET هو CustomerCRMID في Excel. عنوان الفاتورة أيضًا مش لازم عنوان الشحن.',
    reasoning: [
      'اربط Customer Details[CustomerCRMID] بـOrders[CustomerID]؛ لا تربط 1 بـVINET.',
      'المفتاحان الفعليان نصيان. تحويل 1 إلى Text لا يجعله VINET.',
      'Orders يحمل ShipRegion، بينما تقرير العملاء يصنف بمنطقة العميل/المبيعات في الحالة، لا موقع شحن كل طلب.',
    ],
    answer: 'No؛ Yes؛ No.',
    example:
      'عميل رقمه الداخلي 1 و CRMID=VINET، فاتورته فرنسا وشحنته ألمانيا؛ لا نبدل هوية العميل أو منطقته بعنوان الشحنة.',
    optionsAr: [
      'No؛ CustomerID في Excel ليس نفس معنى وقيم CustomerID في Orders.',
      'Yes؛ CustomerCRMID و Orders.CustomerID نصيان وهما طرفا العلاقة الصحيحة.',
      'No؛ Orders يعطي منطقة الشحن، لا منطقة العميل المطلوبة لتحليل مبيعات العملاء.',
    ],
    takeaway:
      'اربط معنى المفتاح وقيمه لا اسمه؛ Billing region ليست Shipping region.',
    references: [rel],
    verdict: 'confirmed',
  },
  'f1-356-355': {
    translation:
      'Northwind تعرف التأخير بأنه ShippedDate بعد RequiredDate. أكمل نسبة الطلبات المتأخرة إلى إجمالي Orders.',
    story:
      'عد كل طلبات الفترة، ثم عد منها اللي اتشحنت بعد موعدها. اقسم الثاني على الأول؛ لا تعد بنود الطلب وكأنها طلبات منفصلة.',
    reasoning: [
      'OrderCount=COUNTROWS(Orders) هو المقام الحالي.',
      'CALCULATE يعيد العد بعد FILTER للطلبات التي تحقق ShippedDate>RequiredDate.',
      'DIVIDE يحسب النسبة بأمان. الشحن في الموعد بالضبط ليس تأخيرًا؛ التواريخ المفقودة تحتاج سياسة واضحة إن ظهرت.',
    ],
    answer: 'CALCULATE؛ FILTER؛ Orders[ShippedDate] > Orders[RequiredDate].',
    example:
      '3 طلبات متأخرة من 20 تعطي 15%. الطلب الذي شُحن في RequiredDate بالضبط لا يدخل في الثلاثة.',
    optionsAr: [
      'SUM لا يملأ موضع تعديل سياق العد في القالب.',
      'COUNTX يحتاج جدولًا وتعبيرًا ولا يطابق القالب المعروض.',
      'صحيح؛ يحسب العد بسياق الطلبات المفلترة.',
      'CALCULATETABLE يرجع جدولًا، بينما المطلوب عدد Scalar.',
      'صحيح؛ FILTER يرجع صفوف Orders المتأخرة.',
      'ALLEXCEPT يعدل فلاتر ولا يختبر كل صف بهذا القالب.',
      'CALCULATE ليس بديل FILTER الذي يأخذ Orders ثم شرط صف ويعيد جدولًا هنا.',
      'DATEBETWEEN اسم غير صحيح؛ وحتى DATESBETWEEN تحتاج عمود تاريخ وحدين لا هذا القالب.',
      'OrderDate مقابل RequiredDate لا يقيس وقت الشحن الفعلي.',
      'الشحن بعد أو وقت تاريخ الطلب طبيعي؛ لا يعني تجاوز الموعد المطلوب.',
      'أقل من RequiredDate يعني شحنًا مبكرًا، عكس التأخير.',
      'صحيح؛ هذا تعريف الحالة حرفيًا للتأخير.',
    ],
    takeaway:
      'Late = Shipped بعد Required؛ وعد الطلبات من Orders لا Order Details.',
    references: [
      calc,
      'https://learn.microsoft.com/en-us/dax/filter-function-dax',
    ],
    verdict: 'confirmed',
  },
  'f1-357-356': {
    translation:
      'Northwind تريد تقليل حجم الموديل دون إفساد التقارير وتاريخها. أي إجراء نختار؟',
    story:
      'خفف الشنطة بإخراج عمود غير مستخدم، لا برمي منتج قديم له مبيعات ضمن السنوات المطلوبة.',
    reasoning: [
      'احذف QuantityPerUnit لأنه ليس مطلوبًا في تقارير الحالة.',
      'لا تحذف discontinued products؛ قد يكون لها تاريخ بيع مطلوب في السنة الحالية والثلاث السابقة.',
      'Grouping على CategoryID الفريد لا يقلل الصفوف المفيدة؛ ليست كل عمليات Grouping عديمة تأثير الحجم عمومًا.',
    ],
    answer: 'B: Remove QuantityPerUnit.',
    correctIndices: [1],
    example:
      'منتج توقف في 2025 وله مبيعات 2024. نحتفظ به لحساب Top Products ونحذف وصف عبوة غير مستخدم.',
    optionsAr: [
      'CategoryID فريد أصلًا؛ تجميعه لا يزيل تكرارًا مفيدًا هنا.',
      'صحيح؛ إزالة صفة غير مستخدمة توفر ذاكرة دون تغيير التحليل.',
      'يحذف تاريخ منتجات مطلوبة ويغير نتائج المبيعات.',
      'تحويل OrderID إلى Text ليس خفض الحجم المناسب وقد يزيد تكلفة التخزين.',
    ],
    takeaway: 'قلل الأعمدة غير المستخدمة قبل حذف كيانات لها تاريخ مطلوب.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction',
    ],
    verdict: 'confirmed',
  },
  'f1-358-357': {
    translation:
      'Northwind تحلل المبيعات بـOrderDate والشحن بـShippedDate، دون اشتراط فلترين مستقلين في الرسم نفسه. أنهي تصميم أصغر؟',
    story:
      'مرة نسأل الطلب اتباع إمتى، ومرة اتشحن إمتى. نستخدم تقويمًا واحدًا ونختار مسار الشحن في مقياسه بدل نسخ تقاويم خفية كثيرة.',
    reasoning: [
      'Date table بعلاقة Active إلى OrderDate و Inactive إلى ShippedDate.',
      'مقاييس الشحن تستخدم USERELATIONSHIP؛ وجود Inactive relationship وحدها لا يغير تاريخ المقياس تلقائيًا.',
      'لو احتجنا سلايسرين مستقلين لدوري التاريخ في الوقت نفسه نختار بعدين كما في Litware349. Power Query تستخدم M لا DAX.',
    ],
    answer: 'A، مع USERELATIONSHIP في مقاييس الشحن.',
    correctIndices: [0],
    example:
      'مارس الافتراضي يحدد مبيعاتمارس. مقياس الشحن يُفعّل علاقة ShippedDate فيعد ما شُحن فيمارس ولو بيع فيفبراير.',
    optionsAr: [
      'صحيح بين المعروض؛ تقويم موحد ودوران مع تفعيل دور الشحن داخل المقياس.',
      'أعمدة شهر وربع OrderDate لا تغطي تاريخالشحن.',
      'Auto date/time قد يزيد جداول خفية وحجمًا بدل أقل نموذج مضبوط.',
      'لا تُكتب DAX بهذه الطريقة من PowerQuery؛ كما أنه يكررأعمدة بدل التقويم الموحد.',
    ],
    takeaway:
      'Active/Inactive يناسب اختيار دور داخل المقياس؛ ليس فلترين مستقلين تلقائيًا.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive',
      'https://learn.microsoft.com/en-us/dax/userelationship-function-dax',
    ],
    verdict: 'confirmed',
  },
  'f1-359-358': {
    translation:
      'Northwind بها عدة موظفين وعدة عملاء لكل Region. اربط Sales Employees بأي جدول وبأي cardinality لتنتقل RLS حسب المنطقة؟',
    story:
      'أحمد ومنى في WA، ومئة عميل في WA. Region متكرر في الجانبين؛ هوية أحمد تختار منطقته ثم كل عملائها، لا طلباته المباشرة فقط.',
    reasoning: [
      'المقصود Many-to-many من Sales Employees[Region] إلى Customer Details[Region].',
      'لازم مسار فلترة أمنية صحيح من الموظف إلى العميل ثم Orders وبنودها؛ cardinality وحدها لا تطبق RLS.',
      'بعد Region فريد قد يكون تصميمًا أوضح عمليًا؛ وراجع تكرار رمز Region بين بلدين. هذا البديل ليس ضمن المعروض هنا.',
      'تعارض Member مع RLS في 343 لا تصلحه هذه العلاقة؛ محرر الموديل يتجاوز RLS.',
    ],
    answer: 'Many-to-many مع Customer Details worksheet.',
    example:
      'Email أحمد → WA → عملاء WA → طلباتهم. لو WA رمز متكرر في بلدين نحتاج مفتاح منطقة واضحًا يشمل البلد.',
    optionsAr: [
      'One-to-one يفترض تفرد Region في الجانبين، وهو غير موجود.',
      'One-to-many يفترض تفرد Region عند الموظفين، والحالة تنص على عدة موظفين للمنطقة.',
      'Many-to-one يفترض تفرد Region عند العملاء، وهناك عملاء كثيرون بالمنطقة.',
      'صحيح؛ Region متكرر في الجانبين.',
      'Orders قد يربط موظفًا مباشرًا أو عنوان شحن، لا كل عملاء Billing Region المطلوبة.',
      'Suppliers خاص بالموردين لا منطقة العملاء المخولة للموظف.',
      'Order Details بنود طلبات لا جدول تصنيف منطقة العميل.',
      'صحيح؛ Customer Details يحمل منطقة العميل التي تنقل النطاق إلى Orders.',
    ],
    takeaway:
      'تكرار Region في الجانبين يعني Many-to-many؛ تحقق من اتجاه الأمن ومفتاح المنطقة.',
    references: [
      rls,
      'https://learn.microsoft.com/en-us/power-bi/guidance/relationships-many-to-many',
    ],
    verdict: 'conditional',
  },
  'f1-360-359': {
    translation:
      'Contoso تريد تجهيز Drill-down من Business unit إلى Product بسرعة للمحللين. تنشئ إيه؟',
    story:
      'الوحدة فوق، تحتها الفئة، وتحت الفئة المنتجات. جهّز السلم مرة بدل ما كل رسم يعيد ترتيبه.',
    reasoning: [
      'أنشئ Hierarchy بالمستويات بالترتيب المناسب داخل جدول البعد الذي يحملها.',
      'Hierarchy تنظم حقول الانتقال؛ لا تنشئ بيانات مفقودة ولا تجمع حقول جداول متفرقة بلا موديل ملائم.',
    ],
    answer: 'C: A hierarchy.',
    correctIndices: [2],
    example:
      'Unit A → Accessories → Sport100 Helmet. Drill ينتقل من الوحدة للفئة للمنتج.',
    optionsAr: [
      'Group يجمع قيمًا؛ لا يجهز سلمًا متعدد المستويات بالمقصود.',
      'Calculated table قد تضيف بيانات ولا تمثل إعداد Drill المطلوب بذاته.',
      'صحيح؛ Hierarchy تجمع المستويات بترتيب جاهز في الرسم.',
      'Calculated column تنشئ صفة واحدة، لا سلم Business unit ثم فئة ثم منتج.',
    ],
    takeaway: 'سلم مستويات جاهز للتنقل = Hierarchy، مش Group.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/consumer/end-user-drill',
    ],
    verdict: 'confirmed',
  },
};
