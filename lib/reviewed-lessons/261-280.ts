import type { ReviewedLesson } from './types.ts';
const accessibility =
  'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-accessibility-creating-reports';
const conditional =
  'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-table-formatting';
const profile =
  'https://learn.microsoft.com/en-us/power-query/data-profiling-tools';
const personalize =
  'https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-personalize-visuals';
export const lessons261: Record<string, ReviewedLesson> = {
  'f1-261-260': {
    translation:
      'تقرير فيه Line chart لمبيعات مناطق متعددة. مطلوب عنصر يختار منه المستخدم منطقة واحدة فتقتصر المبيعات عليها. اختار حلين، كل واحد يحقق الهدف مستقلًا.',
    story:
      'السلايسر واضح، لكن جدول أسماء المناطق ممكن يقوم بنفس وظيفة الاختيار: تضغط سطر Cairo فيفلتر الخط، بشرط التفاعل مضبوط على Filter.',
    reasoning: [
      'Slicer على Region يطبق فلتر اختيار مباشر.',
      'Table يحتوي Region يمكن أن يرسل Cross-filter إلى Line chart عند اختيار الصف.',
      'Card و KPI يعرضان قيمة مجمعة، و Drillthrough ينقل لصفحة تفاصيل بدل إضافة أداة الاختيار المقصودة على الصفحة.',
    ],
    answer: 'A و C: a slicer visual؛ a table visual.',
    correctIndices: [0, 2],
    example:
      'الخط يعرض Cairo و Alex. اختيار Cairo من السلايسر أو من جدول المناطق يترك بيانات Cairo. إذا جعلت تفاعل الجدول None فلن يحقق الهدف.',
    optionsAr: [
      'Slicer مناسب مباشرة لتصفية Region.',
      'Drillthrough filter يخدم انتقالًا سياقيًا لصفحة هدف، لا عنصر اختيار المنطقة المطلوب هنا.',
      'Table يمكن أن يفلتر الخط بتحديد صف المنطقة والتفاعل المناسب.',
      'Card ليس قائمة مناطق يختار منها المستخدم.',
      'KPI يعرض مؤشرًا مقابل هدف، لا قائمة تصفية مناطق.',
    ],
    takeaway:
      'السلايسر ليس الوحيد الذي يفلتر: اختيار صف في Table قد يرسل Cross-filter أيضًا.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions',
    ],
    verdict: 'confirmed',
  },
  'f1-262-261': {
    translation:
      'تقرير أرباح ربع سنوي مطلوب فيه إظهار مساهمة كل فئة منتجات في الإجمالي بالدولار والنسبة، ومقارنة هوامش الربح بين مناطق البيع. اربط كل مطلب برسم.',
    story:
      'سؤال «كل فئة واخدة كام من الكعكة؟» يناسب Pie. أما «أي منطقة هامشها أعلى؟» فيحتاج أطوال أعمدة نقارنها مباشرة.',
    reasoning: [
      'Pie يبرز الجزء من إجمالي الأرباح؛ يمكن إظهار القيمة والنسبة في Labels.',
      'Stacked bar هو خيار الأعمدة المتاح لمقارنة المناطق؛ وجود سلسلة واحدة لا يتطلب تكديس عدة هوامش.',
      'لا تجمع نسب هوامش مستقلة عشوائيًا؛ كل هامش يُحسب على مبيعات منطقته. Pie أيضًا يفترض إجماليًا ذا معنى وقيمًا مناسبة، لا أرباحًا سالبة متنافرة.',
    ],
    answer:
      'المساهمة في الإجمالي: Pie chart. مقارنة المناطق: Stacked bar chart.',
    example:
      'أرباح فئتين 60 و 40 تعطي 60% و 40%. هامش منطقة A=20% و B=10% يقارن بطولي عمودين، ولا نجمعهما ونقول إجمالي الهامش 30%.',
    optionsAr: [
      'Area يبرز تطورًا عبر محور مرتب، لا المقارنة المطلوبة في ربع محدد.',
      'Funnel لمراحل متتابعة، والفئات والمناطق ليست مراحل.',
      'Multi-row card يسرد أرقامًا لكنه لا يبرز الحصص والمقارنة بصريًا بنفس القوة.',
      'Pie صحيح للمساهمة من إجمالي، مع إظهار القيمة والنسبة.',
      'Stacked bar هو الأنسب بين الخيارات لمقارنة قيم المناطق، دون جمع نسب لا يصح جمعها.',
    ],
    takeaway:
      'حصة من الإجمالي = Pie؛ مقارنة مناطق = Bar. نسب الهوامش لا تُجمع لمجرد أنها نسب.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-pie-donut-charts',
    ],
    verdict: 'conditional',
  },
  'f1-263-262': {
    translation:
      'CSV أعمدته Month و 2021 و 2022، وصفوفه January:1000,2500؛ February:4000,5000؛ March:2800,3400. المطلوب Month ثم Year ثم Order amount. تبدأ بأنهي تحويل؟',
    story:
      'السنة مستخبية في اسم العمود. عايزين ننزلها كقيمة داخل الصف، ويصبح لكل شهر صف لسنة 2021 وصف لسنة 2022.',
    reasoning: [
      'احتفظ بـMonth كمفتاح واختر Unpivot للأعمدة السنوية أو Unpivot other columns.',
      'ينتج Attribute للسنة و Value للمبلغ؛ أعد تسميتهما Year و Order amount.',
      'اضبط الأنواع بعد التحويل. يبدأ السؤال بالتحويل وليس تسمية الناتج.',
    ],
    answer: 'B. unpivot.',
    correctIndices: [1],
    example:
      'January |2021|1000 ثم January|2022|2500. الصفوف الثلاثة تتحول إلى ستة صفوف دون فقد أي مبلغ.',
    optionsAr: [
      'Remove يحذف أعمدة أو صفوف ولا ينقل السنة لقيم.',
      'Unpivot يحول عناوين السنوات إلى صفوف؛ صحيح.',
      'Transpose يقلب الصفوف والأعمدة كلها ولا ينتج الشكل الطويل المطلوب مباشرة.',
      'Pivot العكس: يحول قيم الفئات إلى أعمدة بدل إنزال السنوات لصفوف.',
    ],
    takeaway: 'السنة اسم عمود وعايزها قيمة في عمود Year؟ Unpivot.',
    references: [
      'https://learn.microsoft.com/en-us/power-query/unpivot-column',
    ],
    verdict: 'confirmed',
  },
  'f1-264-263': {
    translation:
      'تقرير صفحة واحدة يستخدمه أشخاص بلوحة مفاتيح وآخرون بقارئ شاشة. عايز استهلاك عناصر الصفحة بترتيب منطقي. تضبط إيه؟',
    story:
      'ممكن الرسم يكون فوق على الشاشة لكن زر Tab يوديك له بعد آخر عنصر. مكانه المرئي شيء ومسار التركيز شيء آخر.',
    reasoning: [
      'اضبط Tab order للصفحة من Selection pane.',
      'رتب المحتوى بحسب القراءة والعمل، وأخرج العناصر الزخرفية غير المفيدة من المسار.',
      'Alt text مهم لمعنى العنصر، لكنه لا يستبدل ترتيب التنقل المطلوب في هذا السؤال.',
    ],
    answer: 'D. the tab order.',
    correctIndices: [3],
    example:
      'تبدأ بعنوان الصفحة ثم السلايسر ثم ملخص المؤشرات ثم التفاصيل، بدل أن ينتقل المستخدم عشوائيًا بين شكل خلفية وزر ورسم.',
    optionsAr: [
      'Layer order يحدد تراكب العناصر لا تسلسل التركيز.',
      'X position يحرك الرسم أفقيًا ولا يضمن تسلسل Tab.',
      'Bookmark order يغير قائمة الحالات المحفوظة لا كل عناصر الصفحة.',
      'Tab order هو تسلسل مرور لوحة المفاتيح وقارئ الشاشة بين العناصر.',
    ],
    takeaway: 'ترتيب استهلاك الصفحة بالكيبورد = Tab order، لا Layer order.',
    references: [accessibility],
    verdict: 'confirmed',
  },
  'f1-265-264': {
    translation:
      'الصورة تعرض KPI أخضر، وجدولًا بتدرج ألوان، و Waterfall أخضر للزيادة وأحمر للنقص. مطلوب تغيير ألوان الأنواع الثلاثة لمراعاة ضعف تمييز الألوان من Customize theme. اختار إعدادين.',
    story:
      'مش كل لون في الرسمة راجع لنفس علبة الألوان. الأخضر والأحمر في KPI و Waterfall لهم معنى نجاح وفشل؛ تدرج الجدول له حد أدنى وأعلى.',
    reasoning: [
      'Sentiment colors تضبط Good و Neutral و Bad المستخدمة لحالات KPI و Waterfall.',
      'Divergent colors تضبط ألوان التدرج Min و Center و Max المستخدمة بالتنسيق الشرطي.',
      'الصحيح C و D لا B و C. وثيقة Create custom report themes تربط good/neutral/bad صراحة بالـWaterfall و KPI. بعد تغيير اللون، يستحسن إضافة إشارات غير لونية أيضًا.',
    ],
    answer: 'C و D: Divergent colors و Sentiment colors.',
    correctIndices: [2, 3],
    example:
      'غيّر ألوان الزيادة والنقص إلى لونين مناسبين من Sentiment؛ وغيّر طرفي تدرج Budget Amount من Divergent. تغيير Data colors فقط لا يعالج ألوان الحالات ذات المعنى.',
    optionsAr: [
      'First-level elements تخص عناصر هيكلية ونصوصًا مثل عناوين ومحاور، لا هاتين مجموعتي ألوان البيانات.',
      'Theme colors العامة للسلاسل لا تستبدل مجموعة Sentiment الخاصة بحالات KPI و Waterfall.',
      'Divergent colors صحيحة لتدرج الجدول.',
      'Sentiment colors صحيحة للألوان الدلالية للـKPI و Waterfall.',
    ],
    takeaway:
      'KPI و Waterfall: Sentiment. تدرج شرطي في جدول: Divergent. لا تعتمد على حرف مفتاح يناقض النوع المعروض.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/report-themes-create-custom#theme-colors',
      'https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-reports-visual-defaults',
    ],
    verdict: 'confirmed',
  },
  'f1-266-265': {
    translation:
      'مستخدمو المبيعات Viewer في Workspace، والتقرير يسمح بـPersonalize visuals. الصور تسمح بتصدير الملخص وتغيير أنواع الفلاتر. احكم: تغيير Bar إلى Pie؟ إعادة مشاركة التعديل خارج القسم؟ إنشاء Quick measure جديدة وإضافتها؟',
    story:
      'Personalize يديلك حرية تجرب العرض لنفسك، مش مفتاحًا لتعديل الموديل أو دعوة ناس جديدة. فرّق بين استكشافك وصلاحيات النشر والمشاركة.',
    reasoning: [
      'يمكن تغيير نوع الرسم لأن Personalize مفعّل.',
      'Viewer وحده لا يمنح Reshare؛ لا توجد في السؤال منحة مستقلة تسمح بإعادة المشاركة.',
      'التخصيص يستخدم مقاييس وحقولًا موجودة ويغير تجميعات داعمة؛ لا ينشئ Quick measure جديدة في الموديل.',
    ],
    answer: 'Yes؛ No؛ No.',
    example:
      'تحول Bar إلى Pie وتحتفظ بعرضك الشخصي؛ زميلك لا يرى تعديلًا عامًا. لو مُنحت Read و Reshare منفصلين، تصبح مشاركة العرض الشخصي ممكنة، لكن هذا غير معطى.',
    optionsAr: [
      'الأولى Yes: تخصيص نوع الرسم مسموح للقارئ عند تفعيل الميزة.',
      'الثانية No ضمن الأذونات المعطاة؛ مشاركة العرض الشخصي تحتاج Read و Reshare، وليست ممنوحة بمجرد Viewer.',
      'الثالثة No: إضافة قياس Quick measure جديد عمل تأليف، وليس وظيفة Personalize.',
    ],
    takeaway:
      'Personalize يغيّر عرضك؛ لا يمنح تلقائيًا Reshare ولا كتابة مقاييس جديدة.',
    references: [
      personalize,
      'https://learn.microsoft.com/en-us/power-bi/consumer/end-user-personalize-visuals',
      'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces',
    ],
    verdict: 'confirmed',
  },
  'f1-267-266': {
    translation:
      'عايز Visual يقارن أداء مبيعات خمس مناطق في الشهر الحالي. الخيارات Line و Stacked bar و 100% stacked bar و Waterfall. تختار إيه؟',
    story:
      'كل منطقة رقم مستقل في نفس الشهر. لا تبحث عن ميل زمني ولا حصة نسبية تلغي فرق الحجم؛ قارن أطوال الأعمدة.',
    reasoning: [
      'Stacked bar هو رسم الأعمدة المتاح بين الخيارات.',
      'مع قياس واحد وسلسلة واحدة يعرض عمودًا لكل منطقة دون حاجة إلى تكديس فعلي.',
      '100% stacked قد يجعل كل عمود بنفس الطول إذا كان فيه سلسلة واحدة؛ يضيع فرق مبيعات المناطق.',
    ],
    answer: 'B. a stacked bar chart.',
    correctIndices: [1],
    example:
      'Cairo=100 و Alex=50؛ الأعمدة العادية توضح ضعف المبيعات. تحويل كل منطقة إلى 100% يخفي هذا الفرق إذا لم توجد سلاسل فرعية.',
    optionsAr: [
      'Line يوحي بتتابع عبر محور مرتب؛ المناطق هنا فئات منفصلة.',
      'Stacked bar يقارن القيم المطلقة بين المناطق وهو الأنسب المتاح.',
      '100% stacked يركز على تركيب النسب داخل كل منطقة لا حجم المبيعات.',
      'Waterfall لتغيرات تشرح الانتقال من قيمة بداية إلى نهاية، لا ترتيب خمس مناطق مستقلة.',
    ],
    takeaway:
      'اختار أفضل المتاح: مقارنة خمس مناطق بقيمة مطلقة = Bar، حتى لو اسمه Stacked ومعه سلسلة واحدة.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a',
    ],
    verdict: 'confirmed',
  },
  'f1-268-267': {
    translation:
      'مطلوب Report1 مناسب للطباعة ويوصل بإيميل مجدول، و Report2 مناسب للتفاعل الديناميكي. اختار صيغة كل تقرير.',
    story:
      'واحد مستند تتسلمه وتطبعه، والتاني شاشة تغير سلايسراتها وتحفر في تفاصيلها. الامتداد يعكس نوع الأداة، مش مجرد اسم ملف مختلف.',
    reasoning: [
      'Report1 يناسبه Power BI paginated بصيغة RDL.',
      'Report2 يناسبه Power BI بصيغة PBIX.',
      'الخيار يسمي SSRS مع RDLC؛ RDLC تقرير Local processing وليس صيغة Power BI paginated المطلوبة. الاشتراك وحده ليس ما يفرق؛ شرط الطباعة حاسم.',
    ],
    answer: 'Report1: Power BI paginated (.rdl). Report2: Power BI (.pbix).',
    example:
      'كشف 80 صفحة بتقسيم مضبوط يخرج RDL؛ لوحة مبيعات فيها اختيار منتج وتفاعل رسومات تخرج PBIX. كلا النوعين قد يدعم الاشتراك، فلا تحفظ أن الإيميل خاص بنوع واحد فقط.',
    optionsAr: [
      'SSRS (.rdlc) ليس ملف Power BI paginated المدعوم المقصود في Workspace.',
      'PBIX يدعم التقارير التفاعلية لكنه ليس الاختيار الأمثل لمطلب الطباعة بالصفحات.',
      'RDL صحيح للتقرير الأول الطباعي.',
      'RDLC ليس اختيار التقرير الثاني التفاعلي على Power BI.',
      'PBIX صحيح للتقرير الثاني.',
      'RDL يقدم تفاعلات محددة لكنه ليس بديل التقرير الديناميكي المطلوب هنا.',
    ],
    takeaway:
      'مستند مضبوط الصفحات = RDL؛ تحليل تفاعلي = PBIX. الاشتراك ليس حكرًا على RDL.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/paginated-reports/paginated-reports-report-builder-power-bi',
    ],
    verdict: 'confirmed',
  },
  'f1-269-268': {
    translation:
      'جدول Current Month Returns فيه دوائر حمراء وصفراء وخضراء تميز المتاجر أعلى أو قرب أو تحت حصة المرتجعات. عايز العرض مفهومًا لمن لديهم ضعف تمييز الألوان. تعمل إيه؟',
    story:
      'لو الثلاث إشارات دوائر، الشخص اللي مش بيفرق ألوانها يفقد الحالة. خلي الشكل نفسه يقول المعنى، مش اللون وحده.',
    reasoning: [
      'اختر شكلًا مختلفًا لكل حالة: مثلث تحذير ومربع ودائرة مثلًا مع معنى واضح.',
      'تستطيع إبقاء اللون كإشارة إضافية لا وحيدة.',
      'Alt text لا يعوض التمييز المرئي لكل صف، وإخفاء الإشارة في Tooltip يصعب الوصول للمعلومة.',
    ],
    answer: 'C. Change the icons to use a different shape for each color.',
    correctIndices: [2],
    example:
      'الحالات الثلاث تصبح علامة تعجب ودائرة وعلامة صح، فيُعرف الفرق حتى عند عرض الصفحة بتدرج رمادي. الأشكال أمثلة وليست رموزًا مفروضة بالسؤال.',
    optionsAr: [
      'نقل الأيقونات إلى Tooltip يخفي المعلومة بدل جعلها مفهومة.',
      'Alt text مفيد لقارئ الشاشة لكنه لا يحل مشكلة تمييز حالات الصفوف بصريًا.',
      'اختلاف الشكل لكل حالة يعالج الاعتماد على اللون.',
      'استبدال الدوائر بخلفيات حمراء وصفراء وخضراء يبقي الاعتماد على اللون وحده.',
    ],
    takeaway: 'حالة مهمة؟ عبّر عنها بشكل أو نص مع اللون، لا بلون وحده.',
    references: [accessibility],
    verdict: 'confirmed',
  },
  'f1-270-269': {
    translation:
      'تقرير فيه رسم واحد. عايز كل مستخدم يقدر يبدل نوع الرسم لنفسه دون التأثير على بقية المستخدمين. تعمل إيه؟',
    story:
      'واحد بيحب Pie والتاني Bar. مش هنخليهم يعدلوا المصدر كل شوية؛ نسمح بالتخصيص الشخصي.',
    reasoning: [
      'فعّل Personalize visuals من Report settings.',
      'التغيير الشخصي لا يعيد نشر تصميم التقرير لجميع القراء.',
      'يمكن حفظ حالة شخصية؛ مشاركة نسخة شخصية لها أذونات مستقلة. Perspective يحدد مجموعة حقول ولا يمنح الميزة وحده.',
    ],
    answer: 'B. From Report settings, select Personalize visuals.',
    correctIndices: [1],
    example:
      'مستخدم يحول الرسم لخط ويحفظه في Personal bookmark. المستخدم الآخر يفتح تصميم الكاتب الأصلي ما لم يختر عرضًا شخصيًا مختلفًا.',
    optionsAr: [
      'Focus mode يكبّر الرسم ولا يمكّن تبديل نوعه.',
      'Personalize visuals صحيح لاستكشاف شخصي.',
      'Modern visual header يغيّر الواجهة ولا يمنح وظيفة التخصيص بذاته.',
      'Perspective يحدد الحقول المعروضة، لا آلية تغيير النوع الشخصي وحدها.',
    ],
    takeaway:
      'تعديل لنفس المستخدم دون بقية الناس = Personalize visuals، لا Edit للتقرير.',
    references: [personalize],
    verdict: 'confirmed',
  },
  'f1-271-270': {
    translation:
      'الأصل جدول بستة تواريخ وأعمدة Total Sales و Total Cost. الهدف صف باسم Total Cost وصف باسم Total Sales، والقيم تمتد أفقيًا مع الإجمالي 281.28 و 375.04. اختار نوع الرسم والتنسيق.',
    story:
      'دي مش مجموعة كروت؛ كل مقياس أصبح عنوان صف، وتحت كل تاريخ قيمة تخصه، وفي الآخر إجمالي. نحتاج Matrix تعرض المقاييس كصفوف.',
    reasoning: [
      'غيّر النوع إلى Matrix وضع OrderDate في Columns والمقياسين في Values.',
      'فعّل Switch values to rows؛ قد يسمى Show values on rows في واجهة أحدث.',
      'Stepped layout ينظم تدرج عناوين الصفوف ولا ينقل المقاييس من أعمدة إلى صفوف.',
    ],
    answer: 'Matrix؛ Set Switch values to rows to On.',
    example:
      'بدل صف 1 أكتوبر وتحته 10.75Sales و 8.06Cost، يصبح صف Cost يمر على التواريخ الستة، وصف Sales مثله. إجمالي Cost=281.28 و Sales=375.04 كما بالصورة.',
    optionsAr: [
      'Matrix صحيح لدعم محوري الصفوف والأعمدة وعرض القيم كصفوف.',
      'Multi-row card لا يبني شبكة تواريخ ومقاييس بإجمالي كهذه.',
      'Table يبقي الأعمدة كحقول ولا يوفر Switch values to rows المقصود.',
      'Rows subtotals Off يخفي إجماليات فرعية ولا ينقل المقاييس.',
      'Stepped layout Off يفرد مستويات عناوين الصفوف، وليس اتجاه Measures.',
      'Switch values to rows On هو الإعداد الذي يحول أسماء المقاييس إلى صفوف.',
    ],
    takeaway:
      'المقاييس نفسها أسماء صفوف مع قيم أفقية؟ Matrix + Switch values to rows، وليس Multi-row card.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-matrix-visual',
    ],
    verdict: 'confirmed',
  },
  'f1-272-271': {
    translation:
      'Card تعرض الإيراد من بداية السنة. مطلوب أن يقرأ قارئ الشاشة القيمة عند بدء التفاعل مع الكارت، وأن تظل القيمة محدثة بعد تحديث الموديل. تعمل إيه؟',
    story:
      'لو كتبت «الإيراد 100 ألف» في وصف ثابت، الرقم هيبقى قديم بكرة. خلي الوصف نفسه مربوطًا بمقياس يحول القيمة الحالية لجملة مقروءة.',
    reasoning: [
      'أنشئ مقياسًا نصيًا يصف قيمة الإيراد من بداية السنة في السياق الحالي.',
      'اربط المقياس بخاصية Alt text عبر التنسيق الشرطي fx.',
      'القيمة تتغير مع البيانات والفلاتر؛ الوصف الثابت لا يحقق هذا. أبقِ مقياس الإيراد الأصلي رقميًا، واستخدم وصفًا منفصلًا.',
    ],
    answer:
      'D. Populate alt text using conditional formatting with a DAX measure.',
    correctIndices: [3],
    example:
      'الوصف يقول «إيراد السنة حتى الآن: 125,000 دولار»، ثم يصبح 130,000 بعد التحديث. لا تحتاج أن تعدل النص يدويًا كل يوم.',
    optionsAr: [
      'تحويل الكارت إلى Text box لا يضمن وصفًا ديناميكيًا لقارئ الشاشة.',
      'عنوان ثابت لا يحقق تحديث القيمة؛ الخيار لا يذكر ربطًا ديناميكيًا.',
      'Alt text ثابت سيصبح قديمًا مع تغير الإيراد.',
      'Alt text مربوط بمقياس يحقق القراءة والتحديث.',
    ],
    takeaway:
      'قيمة متغيرة لقارئ الشاشة = Alt text ديناميكي، لا رقم مكتوب مرة واحدة.',
    references: [accessibility],
    verdict: 'confirmed',
  },
  'f1-273-272': {
    translation:
      'عمود ColumnA في Table يحتوي أعدادًا صحيحة من 1 إلى 20. مطلوب مقارنة القيم دون قراءة الرقم، شكل مختلف لكل قيمة، وإخفاء الرقم بأقل تطوير. أنهي تنسيق تختار؟',
    story:
      'بدل عشرين لونًا أو عشرين أيقونة، خلي طول الشريط يقول الحجم. واحد شريط قصير، وعشرون أطول واحد. ونخفي الرقم نفسه.',
    reasoning: [
      'Data bars تمثل مقدار القيمة بطول شريط داخل الخلية.',
      'فعّل Show bar only لإخفاء القيمة النصية.',
      'اضبط حدود المقارنة بحيث تحصل القيم المختلفة على أطوال مختلفة. لا تحتاج عشرين قاعدة منفصلة.',
    ],
    answer: 'C. data bars.',
    correctIndices: [2],
    example:
      'عند ضبط الحدود من صفر إلى 20، قيمة 5 تقارب ربع الطول، و 10 نصفه، و 20 كامل الطول. إخفاء الرقم لا يحذف قيمته من الموديل.',
    optionsAr: [
      'Font color يعتمد على قراءة الرقم أو تمييز ألوان كثيرة، ولا يحقق المقارنة المطلوبة بسهولة.',
      'Icons تحتاج خرائط متعددة لعشرين قيمة ولا تعطي طولًا كميًا مباشرًا.',
      'Data bars مع Show bar only تحقق المقارنة وإخفاء الرقم بأقل إعداد.',
      'Background color لا يمثل المقدار كطول واضح، ومقارنة عشرين درجة لون أصعب.',
    ],
    takeaway: 'مقارنة حجم رقم وإخفاؤه = Data bars مع Show bar only.',
    references: [conditional],
    verdict: 'confirmed',
  },
  'f1-274-273': {
    translation:
      'Resource Location يعرض Count=2,863 و Distinct=13 و Unique=0. في التوزيع US East أطول عمود، و Min=EU North و Max=ZA North. مطلوب عدد القيم التي ظهرت مرة واحدة والقيمة الأكثر تكرارًا.',
    story:
      'Distinct يعني كام اسم مختلف، مش كام اسم ظهر مرة. ممكن عندك 13 منطقة وكل منطقة مكررة، فلا يوجد اسم واحد له ظهور وحيد.',
    reasoning: [
      'السؤال الأول يطابق Unique=0.',
      'الأكثر تكرارًا يأتي من أطول عمود في التوزيع: US East.',
      'Min و Max للنص يخصان ترتيب القيم، لا تكرارها. النتائج تخص نطاق البيانات الذي تم تحليله.',
    ],
    answer: '0؛ US East.',
    example:
      'لو Egypt مرتين و France مرتين، يكون Distinct=2 و Unique=0 رغم وجود أربعة صفوف. هنا نفس الفكرة مع 13 اسمًا مختلفًا و 2,863 صفًا.',
    optionsAr: [
      'صفر صحيح لأنه Unique المعروض.',
      '13 هو Distinct، وليس عدد القيم ذات الظهور الوحيد.',
      '2,863 إجمالي Count وليس Unique.',
      'EU North هو Min النصي وليس أطول عمود.',
      'Middle East And Africa ليست الأكثر تكرارًا في الرسم.',
      'US East صحيحة لأن عمود تكرارها هو الأطول.',
      'ZA North هو Max النصي، لا الأكثر شيوعًا.',
    ],
    takeaway:
      'Distinct = قيم مختلفة؛ Unique = قيم ظهرت مرة واحدة. اقرأ التكرار من الرسم، لا من Min و Max.',
    references: [profile],
    verdict: 'confirmed',
  },
  'f1-275-274': {
    translation:
      'جدول Product و Sales يستخدم خلفية حمراء أو خضراء لحالة المبيعات. مطلوب تحسينه للمستخدمين الذين لديهم ضعف تمييز الألوان. تعمل إيه؟',
    story:
      'الرقم واضح، لكن معنى الأحمر والأخضر قد لا يكون واضحًا. أضف رمزًا للحالة حتى لا تعتمد المعلومة على اللون وحده.',
    reasoning: [
      'أضف Icons مختلفة الشكل حسب حالة المبيعات.',
      'يمكن الاحتفاظ بالأرقام والألوان كقنوات إضافية، وليست الوحيدة.',
      'تغيير الأحمر إلى برتقالي قد لا يحل كل أنواع ضعف تمييز الألوان، ولا يضيف معنى غير لوني.',
    ],
    answer: 'D. Add icons to represent the sales status of each product.',
    correctIndices: [3],
    example:
      'المنتج الأقل من الهدف يظهر مثلث تحذير، وفوق الهدف علامة صح. المستخدم يميز الشكل حتى لو الألوان متقاربة؛ هذه أمثلة وليست رموزًا مفروضة.',
    optionsAr: [
      'تبييض الخط قد يحسن التباين، لكنه لا يشرح الحالة دون لون.',
      'استبدال لون بلون يبقي الحالة معتمدة على اللون فقط.',
      'إضافة مقاييس لا تعالج طريقة عرض حالة المبيعات الموجودة.',
      'Icons تعطي إشارة شكلية إضافية للحالة.',
    ],
    takeaway: 'لا تجعل الأحمر والأخضر وحدهما يحملان معنى الحالة؛ أضف شكلًا أو نصًا.',
    references: [accessibility],
    verdict: 'confirmed',
  },
  'f1-276-275': {
    translation:
      'Power BI app تحتوي Report1. أضفت صفحة إلى التقرير، وعايز مستخدمي التطبيق يشوفوها بأقل جهد إداري. تعمل إيه؟',
    story:
      'الـWorkspace مكان التأليف، والـApp نسخة التوزيع. تعديل التقرير في المخزن لا يغني عن تحديث نسخة الجمهور عندما يتغير محتواها.',
    reasoning: [
      'تأكد أن التقرير المعدل منشور في Workspace.',
      'نفذ Update app لتوزيع تحديث المحتوى على الجمهور.',
      'لا حاجة لإلغاء نشر التطبيق وإنشاء تطبيق جديد أو تغيير معلومات التواصل.',
    ],
    answer: 'B. Update the app.',
    correctIndices: [1],
    example:
      'Report1 كان ثلاث صفحات وأصبح أربعًا. تحديث التطبيق ينقل التعديل لجمهوره، بشرط أن الصفحة الجديدة ليست مخفية عنهم بإعداد آخر.',
    optionsAr: [
      'Audience تحدد من يرى المحتوى؛ المطلوب هنا تحديث المحتوى لا تغيير الجمهور.',
      'Update app هو المسار القياسي لتوزيع التعديل.',
      'Contact information بيانات للتواصل ولا تنشر صفحة جديدة.',
      'Unpublish ثم إنشاء تطبيق جديد جهد أكبر وقد يعطل الوصول دون حاجة.',
    ],
    takeaway:
      'عدلت محتوى داخل App؟ حدّث التطبيق بدل إعادة بناء التوزيع من الصفر.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-create-distribute-apps',
    ],
    verdict: 'confirmed',
  },
  'f1-277-276': {
    translation:
      'Table1 فيها WebsiteName و URL. مطلوب جدول يعرض اسم الموقع، والضغط على الاسم يفتح عنوانه. تستخدم إيه؟',
    story:
      'الاسم هو النص المقروء، والرابط حقل آخر خلفه. لا تعرض الرابط الطويل مكان الاسم ولا تضع أيقونة بدله؛ اربط الاسم بعنوانه.',
    reasoning: [
      'طبّق Web URL conditional formatting على WebsiteName.',
      'اجعل الحقل المستخدم للرابط هو URL في الصف نفسه.',
      'Data category للرابط وحده تجعل الرابط المعروض قابلًا للنقر، لكنها لا تربط اسمًا مختلفًا بعنوانه.',
    ],
    answer: 'B. Conditional Formatting.',
    correctIndices: [1],
    example:
      'الخلية تعرض Microsoft وعنوانها مأخوذ من URL لنفس الصف. اختلاف النص الظاهر عن عنوان الموقع هو سبب الحاجة إلى تنسيق الرابط على حقل آخر.',
    optionsAr: [
      'Data categories للرابط وحده لا تكفي لربط WebsiteName بقيمة URL مستقلة.',
      'Web URL conditional formatting يحقق الضغط على الاسم لفتح رابطه.',
      'Inline hierarchy labels تخص عرض التدرج، لا الربط بعناوين مواقع.',
      'URL icons تعرض رمزًا للنقر، والمطلوب النقر على الاسم نفسه.',
    ],
    takeaway:
      'اسم ظاهر ورابط في عمود آخر = Web URL conditional formatting على الاسم.',
    references: [conditional],
    verdict: 'confirmed',
  },
  'f1-278-277': {
    translation:
      'في Power Query عايز تعرف لعمود Country نسبة القيم التي تحتوي أخطاء، وعدد القيم الفارغة. تفعّل إيه لكل معلومة؟',
    story:
      'واحد بيسألك «كام في المية؟»، والثاني محتاج عددًا محددًا. Quality يعطي ملخص النسب، و Profile يعرض إحصاءات تفصيلية للعمود المحدد.',
    reasoning: [
      'Column quality هو الاختيار المباشر لنسبة Errors في شريط الجودة.',
      'Column profile يعرض Empty count ضمن إحصاءات العمود.',
      'Quality قد يظهر أعدادًا عند المرور عليه في بعض الإصدارات؛ السؤال يميز شريط النسب عن الإحصاءات التفصيلية. راجع هل التحليل لأول ألف صف أم كامل البيانات.',
    ],
    answer: 'نسبة الأخطاء: Column quality. عدد القيم الفارغة: Column profile.',
    example:
      'لو 500 صف فيها 10 أخطاء و 25 قيمة فارغة، Quality يعرض 2% Errors، و Profile يبين Empty=25. لا تعمم عينة على كامل الملف دون فحص نطاق التحليل.',
    optionsAr: [
      'Distribution يركز على التكرارات لا عرض نسبة الأخطاء المباشر.',
      'Profile يتضمن إحصاءات، لكن الاختيار المباشر لشريط Errors% هو Quality.',
      'Quality صحيح لنسبة الأخطاء.',
      'Distribution ليس عرض Empty count التفصيلي المقصود.',
      'Profile صحيح لعرض Empty ضمن إحصاءات العمود.',
      'Quality يركز على نسب الجودة؛ للإحصاء التفصيلي المطلوب اختَر Profile.',
    ],
    takeaway:
      'نسب صلاحية وخطأ وفراغ = Quality؛ إحصاءات العمود التفصيلية = Profile.',
    references: [profile],
    verdict: 'conditional',
  },
  'f1-279-278': {
    translation:
      'الموديل يحتوي Sales و Quarter ومقياس جمع المبيعات. الصورة تعرض مساحات Products A إلى D عبر Q1 إلى Q3 بمحور من 0% إلى 100%. مطلوب نفس الشكل دون مقاييس DAX إضافية.',
    story:
      'كل ربع ممتلئ حتى 100% مهما كان إجمالي مبيعاته. الرسم نفسه يحوّل حصص المنتجات إلى نسب من مجموع الربع.',
    reasoning: [
      'المساحات متراكمة ومطبّعة إلى 100%؛ الاختيار 100% stacked area.',
      'استخدم Quarter للمحور، والمبيعات للقيمة، وفئة المنتج للـLegend كما بالصورة.',
      'النص يذكر حقلين، لكن الصورة تتطلب أيضًا حقلًا لفئة المنتج. نوع الرسم واضح، والتنفيذ الكامل يفترض وجود هذا الحقل غير المسمى في النص.',
    ],
    answer: 'C. 100% stacked area chart.',
    correctIndices: [2],
    example:
      'ربع إجماليه 100 ومبيعات A فيه 25 يعطيها 25%. ربع آخر إجماليه 200 ومبيعات A فيه 50 يعطيها 25% أيضًا، دون مقياس نسبة يدوي.',
    optionsAr: [
      'Ribbon يبرز تغير ترتيب الفئات بشرائط؛ ليس الشكل المعروض.',
      'Line لا يعرض طبقات مملوءة مجموعها 100%.',
      '100% stacked area يطابق تطبيع كل شريحة زمنية إلى 100%.',
      'Area العادي لا يفرض أن كل ربع ينتهي إلى 100%.',
    ],
    takeaway:
      'كل ربع مجموعه 100% ومساحات متراكمة = 100% stacked area. انتبه لحقل Legend الناقص من الوصف.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-area-charts',
    ],
    verdict: 'conditional',
  },
  'f1-280-279': {
    translation:
      'مطلوب Visual1 لتوزيع بيانات هرمية، و Visual2 للبحث ثم تصفية القيم. اربط كل واحد بنوعه.',
    story:
      'تصنيف كبير جواه أقسام أصغر وعايزين نشوف حجم كل جزء؛ Treemap يقسم المساحة. أما أداة تكتب فيها اسمًا ثم تختاره لتفلتر الصفحة فهي Slicer.',
    reasoning: [
      'Treemap يعرض مستويات هرمية بمستطيلات مساحتها حسب قيمة مناسبة.',
      'Slicer بقائمة أو Dropdown قابل للبحث يسمح باختيار قيم لتصفية الرسومات.',
      'Table قد يرسل Cross-filter عند تحديد صف، لكن Slicer هو المكون المخصص للبحث والاختيار هنا.',
    ],
    answer: 'Visual1: Treemap. Visual2: Slicer.',
    example:
      'مستطيل الإلكترونيات بداخله هواتف وحواسيب. وفوق الصفحة Slicer تبحث فيه عن هاتف ثم تختاره فتتفلتر النتائج.',
    optionsAr: [
      'Gauge يقارن قيمة بهدف أو نطاق ولا يوزع بيانات هرمية على مستطيلات.',
      'Slicer صحيح للبحث واختيار قيم تصفي الصفحة.',
      'Smart narrative ملخص نصي، لا عرض هرمي ولا قائمة اختيار.',
      'Table يسرد صفوفًا؛ ليس أفضل خيار للعرض الهرمي المساحي أو أداة البحث المخصصة.',
      'Treemap صحيح لتوزيع الهرمية بالمساحات.',
    ],
    takeaway: 'توزيع حجم الهرمية = Treemap؛ بحث واختيار للتصفية = Slicer.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-treemaps',
      'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers',
    ],
    verdict: 'confirmed',
  },
};
