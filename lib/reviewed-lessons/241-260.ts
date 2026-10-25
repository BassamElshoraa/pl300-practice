import type { ReviewedLesson } from './types.ts';
const conditional =
  'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-table-formatting';
const slicer =
  'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers';
const page =
  'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-view';
const profile =
  'https://learn.microsoft.com/en-us/power-query/data-profiling-tools';
export const lessons241: Record<string, ReviewedLesson> = {
  'f1-241-240': {
    translation:
      'Table visual فيه مقياس Revenue من صفر إلى 5. مطلوب لون خلفية مختلف لكل نطاق: صفر أبيض، أكبر من صفر إلى 2 أصفر، أكبر من 2 إلى 3 أخضر فاتح، أكبر من 3 إلى 4 أخضر، وأكبر من 4 أخضر غامق. رتب ثلاث خطوات.',
    story:
      'الرقم موجود أصلًا، وإنت عايز تلوّن أرضية خليته حسب حدوده. مش مطلوب تحسب لونًا في عمود جديد؛ قواعد مباشرة تكفي.',
    reasoning: [
      'افتح Background color لعمود Revenue.',
      'اختر Format style = Rules.',
      'أضف قاعدة لكل نطاق، مع مراعاة الحدود شاملة أو غير شاملة، ونوع الحد Number لا Percent.',
    ],
    answer:
      'Open Background color → Rules → Add and configure a rule for each range.',
    example:
      'Revenue=2 يدخل في الأصفر؛ 2.01 يدخل في الأخضر الفاتح؛ 4 يدخل في الأخضر؛ 4.01 يدخل في الغامق. ضبط الحدود يمنع وجود قيمة بلا لون أو في نطاقين.',
    optionsAr: [
      'Rules صحيح؛ يحدد لونًا وفق حدود رقمية.',
      'إضافة القواعد تأتي بعد فتح التنسيق واختيار Rules.',
      'Field value يحتاج حقلًا يرجع لونًا مثل #FFFFFF، وليس الرقم Revenue نفسه.',
      'Background color هو نوع التنسيق المطلوب، ويبدأ به التسلسل.',
      'Font color يلوّن الكتابة، بينما السؤال يطلب الخلفية.',
    ],
    takeaway:
      'نطاقات أرقام إلى ألوان مباشرة = Rules. حقل يرجع كود اللون = Field value.',
    references: [conditional],
    verdict: 'confirmed',
  },
  'f1-242-241': {
    translation:
      'تقرير أربع صفحات، كل صفحة فيها Country slicer. اختيار الدولة على الصفحة الأولى لازم يستمر في الثانية والثالثة، ولا يؤثر على الرابعة. تعمل إيه؟',
    story:
      'مش هنحذف سلايسرات الصفحات؛ هنحدد مين بيشارك مين في الاختيار. الصفحة الرابعة خارج المجموعة.',
    reasoning: [
      'فعّل Sync لنفس Country slicer على الصفحات 1 و 2 و 3.',
      'لا تضف الصفحة 4 إلى هذه المزامنة.',
      'إعدادات الظهور مستقلة عن المزامنة؛ مجرد نقل السلايسر أو إخفائه لا يضبط نطاق التأثير.',
    ],
    answer: 'D. Sync the Country slicer on page1, page2, and page3.',
    correctIndices: [3],
    example:
      'اختيار France في الأولى يجعل الثانية والثالثة تعرضان France. الرابعة لا تستقبل الاختيار من المجموعة ويمكن أن تعرض دولة مختلفة.',
    optionsAr: [
      'Page-level filters مستقلة ولا تتبادل اختيارات المستخدم تلقائيًا.',
      'Report-level filter يشمل الرابعة أيضًا، خلاف الشرط.',
      'نقل السلايسرات لا ينشئ مزامنة عبر الصفحات.',
      'Sync للصفحات الثلاث وحدها يطابق المطلوب.',
    ],
    takeaway:
      'اختيار واحد لصفحات محددة = Sync وحدد الصفحات بالاسم، لا Report filter.',
    references: [slicer],
    verdict: 'confirmed',
  },
  'f1-243-242': {
    translation:
      'عندك موديل وتقرير فارغ. مطلوب Word Cloud مثل الصورة بأقل تطوير. رتب إجراءات الحصول على الرسم وتغذيته وتنسيقه.',
    story:
      'مش هنبرمج رسمًا من الصفر أو ننزل ملفات ونستوردها يدويًا طالما الرسم متاح من AppSource داخل Desktop. الأول نجيب المكون، ثم نديله الكلمات والأوزان.',
    reasoning: [
      'Get Word Cloud from AppSource من داخل Desktop هو المسار الأقصر.',
      'املأ Category و Value و Excludes بحسب دور كل حقل والرسم المختار.',
      'نسق الألوان والعنوان لتقترب من الشكل المطلوب. قد تمنع سياسة المؤسسة بعض Custom visuals، وهذا شرط بيئة لا خطوة إضافية مفروضة في السؤال.',
    ],
    answer:
      'Get Word Cloud from AppSource in Desktop → Populate Category, Value, Excludes → Format colors and title.',
    example:
      'Category يحتوي نوع الشكوى، و Value عدد مرات ورودها؛ كلمة تكررت 50 مرة تكبر عن كلمة تكررت 5. Excludes يمكنه استبعاد كلمات غير مفيدة حسب دعم المكون.',
    optionsAr: [
      'تنزيل PBIVIZ بالمتصفح ثم استيراده ممكن، لكنه أكثر خطوات من الحصول المباشر داخل Desktop.',
      'الألوان والعنوان آخر خطوة بعد وجود الرسم وبياناته.',
      'الحصول عليه داخل Desktop هو البداية الأقل جهدًا.',
      'Drillthrough لا يغذي سحابة الكلمات؛ غرضه انتقال سياقي لصفحة أخرى.',
      'حقول Category و Value و Excludes هي التغذية المقصودة في نسخة الرسم المعروضة.',
    ],
    takeaway: 'Custom visual جاهز؟ AppSource أولًا، ثم ربط الحقول، ثم التنسيق.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/developer/visuals/power-bi-custom-visuals',
    ],
    verdict: 'confirmed',
  },
  'f1-244-243': {
    translation:
      'تقرير فيه 5Bookmarks. عايز عنصرًا ينتقل بين ثلاث منها فقط. الصورة تعطي أول خطوة جاهزة: إضافة Bookmark navigator. أكمل الخطوتين المتبقيتين.',
    story:
      'الملاح يعرف Bookmarks كلها، وإنت عايزله قائمة أصغر. اعمل للثلاثة مجموعة، وقل للملاح يعرض هذه المجموعة فقط.',
    reasoning: [
      'الخطوة الأولى في المصدر ثابتة: Add a Bookmark navigator button؛ ليست خانة مطلوب سحبها.',
      'جمّع الـBookmarks الثلاث المطلوبة في Group.',
      'غيّر خاصية Bookmarks في الملاح لتشير إلى المجموعة. زر Bookmark منفرد يذهب لحالة واحدة فقط.',
    ],
    answer:
      'الخطوة 2: Group the three bookmarks. الخطوة 3: Change the Bookmark property for the button إلى المجموعة.',
    example:
      'عندك A و B و C و D و E، وتريد A و C و E. Group اسمها Analysis تضم الثلاثة، والملاح يعرض Analysis بدل All bookmarks.',
    optionsAr: [
      'Add a Bookmark button منفرد لا ينشئ قائمة تتنقل بين ثلاث حالات؛ الـNavigator مضاف بالفعل في الخطوة المعطاة.',
      'تغيير خاصية Bookmarks إلى المجموعة المطلوبة يأتي بعد إنشائها.',
      'تجميع الاثنين المستبعدين لا يحدد المجموعة المطلوبة مباشرة.',
      'تجميع الثلاثة المقصودين صحيح، ثم ربط الملاح بمجموعتهم.',
    ],
    takeaway:
      'Bookmark navigator لجزء من الحالات = Group للمطلوب ثم اختيار هذه المجموعة.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/button-navigators',
    ],
    verdict: 'confirmed',
  },
  'f1-245-244': {
    translation:
      'عايز فواتير مبيعات للعملاء تتصدر PDF وتظهر فيها كل الأعمدة والصفوف بوضوح. تنشئ إيه؟',
    story:
      'الفاتورة مش لوحة استكشاف نعمل لها Screenshot. المطلوب مستند يعرف يقسم الصفوف على صفحات، ويكرر الرؤوس ويحافظ على مقاس الطباعة.',
    reasoning: [
      'Paginated report مصمم للمخرجات ذات الصفحات والطباعة.',
      'Tablix منطقة بيانات للجدول أو المصفوفة تناسب أسطر الفاتورة.',
      'يلزم ضبط عرض الصفحة والهوامش والأعمدة؛ اختيار النوع الصحيح لا يمنع القص إذا كان التصميم أعرض من الورق.',
    ],
    answer: 'A. a paginated report that contains a tablix.',
    correctIndices: [0],
    example:
      'فاتورة فيها 80 سطرًا يمكن أن تمتد لثلاث صفحات مع رؤوس واضحة، بدل تصدير الجزء الظاهر فقط من جدول عليه Scroll.',
    optionsAr: [
      'Paginated مع Tablix يحقق مستندًا كامل الصفوف قابلًا للطباعة.',
      'Dashboard ليست قالب فواتير متعدد الصفحات.',
      'Interactive table يعتمد على مساحة الشاشة والتمرير؛ ليس الأفضل لضمان كل الصفوف في PDF.',
      'Interactive matrix يتيح تحليلًا وتجميعًا، لا تخطيط فواتير طباعي مماثل.',
    ],
    takeaway:
      'كل الصفوف في مستند مطبوع مضبوط = Paginated report، وليس Screenshot لتقرير تفاعلي.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/paginated-reports/paginated-reports-report-builder-power-bi',
    ],
    verdict: 'confirmed',
  },
  'f1-246-245': {
    translation:
      'تقرير ثلاث صفحات وفي كل صفحة Country slicer. المطلوب اختيار الدولة من الأولى يفلتر باقي الصفحات، والثانية والثالثة تعرضان النتائج المفلترة فقط. اربط الإجراء بكل مطلب.',
    story:
      'الصفحة الأولى هي لوحة التحكم، والباقي صفحات عرض. نحتاج مشاركة الاختيار ثم إخفاء أداة التحكم من صفحات النتائج، مش إلغاء الفلتر منها.',
    reasoning: [
      'زامن Country slicer بين الصفحات الثلاث لنقل اختيار الأولى.',
      'أخفِ السلايسر في الثانية والثالثة مع بقاء Sync مفعّلًا.',
      'إخفاؤه حل العرض المقصود، لكنه ليس إجراء أمان: لا يمنع تغيير الفلاتر من وسائل أخرى إذا كانت متاحة. حرفيًا Sync وحده يكفي لفلترة النتائج؛ الإخفاء لتصميم واجهة العرض فقط.',
    ],
    answer:
      'الأول: Sync across all pages. الثاني في قصد السؤال: Hide slicer on pages2 and3 مع بقاء المزامنة.',
    example:
      'اختر Egypt في الأولى؛ تفتح الثانية فتشاهد رسوم Egypt دون قائمة Country ظاهرة. عدم ظهور السلايسر لا يعني أن اختياره اختفى.',
    optionsAr: [
      'نسخ Country كفلاتر صفحات لا ينقل اختيار المستخدم تلقائيًا.',
      'Sync لجميع الصفحات صحيح لنقل الاختيار من الأولى.',
      'Sync للثانية والثالثة فقط يترك مصدر الاختيار الأول خارج المجموعة.',
      'إخفاء السلايسر من صفحتي النتائج يحقق طريقة العرض المقصودة، وليس حظرًا أمنيًا لتغيير الدولة.',
    ],
    takeaway:
      'Sync ينقل الفلتر، و Hide ينظف واجهة النتائج. لا تخلط الإخفاء مع منع الوصول.',
    references: [slicer],
    verdict: 'conditional',
  },
  'f1-247-246': {
    translation:
      'صفحة فيها Shape1 و Card اسمها Sales Summary وأعمدة Sales by Region. عايز الكارت يرسم فوق الشكل. تعدل إيه؟',
    story:
      'حطيت مستطيل خلف الكارت لكنه غطاه. المشكلة ترتيب طبقات فوق وتحت، مش ترتيب التنقل بزر Tab.',
    reasoning: [
      'افتح Selection pane ورتّب Layer order.',
      'ارفع Sales Summary فوق Shape1 أو أرسل الشكل للخلف.',
      'Maintain layer order يحافظ على الترتيب عند التفاعل؛ لا يبدل الترتيب الخاطئ مبدئيًا.',
    ],
    answer: 'B. Layer order in the Selection pane.',
    correctIndices: [1],
    example:
      'الكارت والعنصر الخلفي لهما نفس المكان؛ تغيير X أو Y ليس لازمًا. رفع الكارت في الطبقات يظهره فوق المستطيل.',
    optionsAr: [
      'Tab order لترتيب انتقال لوحة المفاتيح، لا تراكب الرسم.',
      'Layer order هو التحكم المباشر في الأمام والخلف.',
      'Maintain layer order يحافظ على الترتيب الموجود، لا ينشئ المطلوب بدل ترتيب خاطئ.',
      'Vertical alignment موضع رأسي لا ترتيب عمق الطبقات.',
    ],
    takeaway: 'مين يغطي مين؟ Layer order. مين يأتي بعد مين مع Tab؟ Tab order.',
    references: [page],
    verdict: 'confirmed',
  },
  'f1-248-247': {
    translation:
      'ثبتّ Line chart اسمها Sales by month من Report1 على Dashboard1. غيّرتها في التقرير إلى Bar chart. عايز اللوحة تعرض النوع الجديد. تعمل إيه؟',
    story:
      'البلاطة المثبتة لرسم منفرد لا تعتبر نسخة حية من تصميم صفحة التقرير كلها. البيانات قد تتحدث، لكن تحويل نوع الرسم يحتاج تثبيت النسخة الجديدة.',
    reasoning: [
      'ثبّت Bar chart الجديدة على Dashboard1.',
      'أزل البلاطة القديمة إذا لم تعد مطلوبة لتجنب التكرار.',
      'Pin live page سلوك مختلف؛ السؤال يقول Pin visual منفرد.',
    ],
    answer: 'B. Pin the Sales by month bar chart to Dashboard1.',
    correctIndices: [1],
    example:
      'المبيعات الجديدة قد تظهر في البلاطة القديمة لكنها ستظل Line. تثبيت الرسم بعد تحوله ينشئ بلاطة Bar.',
    optionsAr: [
      'Refresh للموديل يغير البيانات لا نوع البلاطة المثبتة.',
      'إعادة تثبيت Bar chart تحقق النوع الجديد.',
      'Refresh visuals لا يعيد إنشاء البلاطة بنوع تصميم مختلف.',
      'Tile details لا توفر تحويل Line إلى Bar من تصميم المصدر.',
    ],
    takeaway:
      'تغيير نوع Visual مثبت منفردًا؟ Pin من جديد؛ لا تفترض أن Refresh ينقل كل تغيير تصميم.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboard-pin-tile-from-report',
    ],
    verdict: 'confirmed',
  },
  'f1-249-248': {
    translation:
      'بتصمم تقرير ثلاث صفحات وعايز صفحة Tooltip مخصصة وتجهيزها للاستخدام. اختار ثلاث إجراءات من المعروض.',
    story:
      'النافذة الصغيرة اللي تظهر فوق نقطة في رسم هي صفحة مصغرة لها رسوماتها وسياقها. اللي نعلّمه Tooltip هو صفحة النافذة، مش الصفحة الأساسية.',
    reasoning: [
      'فعّل Allow use as tooltip على صفحة الـTooltip.',
      'أضف الرسومات التي تريدها داخلها.',
      'اضبط حقول أو فلاتر سياقها المناسبة؛ لا يلزم فلتر ثابت لكل Tooltip. بعد تجهيزها اربطها بالرسم الهدف تلقائيًا أو يدويًا، وهي خطوة ليست ضمن الخيارات هنا.',
    ],
    answer:
      'A و D و E: تفعيل صفحة Tooltip، تجهيز سياقها/فلاترها، وإضافة رسوماتها.',
    correctIndices: [0, 3, 4],
    example:
      'تمر على Product A فتظهر صفحة صغيرة تشرح مبيعاته وربحه. نفس الصفحة يمكن أن تخدم Product B بسياق مختلف بدل صفحة ثابتة لكل منتج.',
    optionsAr: [
      'صحيح؛ صفحة Tooltip نفسها يجب السماح باستخدامها بهذا الدور.',
      'الصفحة الأساسية لا تحتاج أن تتحول هي إلى Tooltip.',
      'فلاتر الرسم الهدف قد تفيد التقرير لكنها ليست تجهيز صفحة Tooltip المطلوبة ضمن هذه الخيارات.',
      'اختيار مقصود لتجهيز سياق صفحة Tooltip، وليس قاعدة أن كل Tooltip يتطلب فلترًا ثابتًا.',
      'رسومات صفحة Tooltip هي المحتوى الذي سيظهر للمستخدم.',
    ],
    takeaway:
      'جهّز صفحة النافذة نفسها: اسمح بدور Tooltip وضع محتواها واضبط سياقها، ثم اربطها بالهدف.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-tooltips',
    ],
    verdict: 'conditional',
  },
  'f1-250-249': {
    translation:
      'عايز AI insights يضيف معلومات من تعليقات العملاء: الموضوعات الأكثر ذكرًا، هل يحبون المنتج، ولغة التعليق. اربط كل ناتج بالخدمة المناسبة.',
    story:
      'جملة زي «التوصيل ممتاز لكن التغليف ضعيف» فيها موضوعات ومشاعر ولغة. دول ثلاث أسئلة مختلفة؛ ما ينفعش نستخرج الكلمات ونعتبر أننا عرفنا الرأي.',
    reasoning: [
      'Key Phrase Extraction يستخرج الموضوعات والعبارات المهمة؛ يلزم تجميع النتائج لمعرفة الأكثر تكرارًا.',
      'Sentiment Analysis يقيّم النبرة الإيجابية أو السلبية أو المحايدة حسب الخدمة.',
      'Language Detection يحدد لغة النص. هذه تسميات خدمات السؤال، لا وعد أن تحليل المشاعر يفهم كل سخرية أو سياق.',
    ],
    answer:
      'الموضوعات: Key Phrase Extraction. الرأي: Sentiment Analysis. اللغة: Language Detection.',
    example:
      '«الخدمة ممتازة» قد تعطي عبارة «الخدمة»، ونبرة إيجابية، ولغة عربية. عدّ العبارات عبر التعليقات هو الذي يبين أي موضوع الأكثر ذكرًا.',
    optionsAr: [
      'Image Tagging للصور وليس تعليقات نصية.',
      'Key Phrase Extraction مناسب للموضوعات؛ لا يحسب ترتيب التكرار عبر الجدول وحده.',
      'Language Detection يجيب عن لغة التعليق.',
      'Sentiment Analysis يجيب عن الرأي أو النبرة، لا استخراج الموضوع بذاته.',
    ],
    takeaway:
      'بيتكلم عن إيه؟ Key phrases. مبسوط ولا زعلان؟ Sentiment. كاتب بأي لغة؟ Language detection.',
    references: [
      'https://learn.microsoft.com/en-us/azure/ai-services/language-service/key-phrase-extraction/overview',
      'https://learn.microsoft.com/en-us/azure/ai-services/language-service/sentiment-opinion-mining/overview',
      'https://learn.microsoft.com/en-us/azure/ai-services/language-service/language-detection/overview',
    ],
    verdict: 'confirmed',
  },
  'f1-251-250': {
    translation:
      'التننت يسمح بتصدير البيانات، لكن مطلوب منع مستهلكي ReportA من تصدير أي بيانات من رسوماته. اختار إجراءين، كل واحد حل كامل مستقل.',
    story:
      'السماح العام في المؤسسة لا يجبر كل تقرير يفتح التصدير. كاتب التقرير يقدر يقفل وظيفة Export data لهذا التقرير تحديدًا.',
    reasoning: [
      'من Desktop افتح إعدادات التقرير واختر عدم السماح بتصدير بيانات الرسومات.',
      'يمكن ضبط نفس السياسة من Report settings على الخدمة؛ كل مسار بديل كامل.',
      'عدم منح Build لا يكفي لمنع كل تصدير؛ Summarized data قد يظل متاحًا. المنع هنا لوظيفة Export data، وليس ضمان منع التصوير أو النسخ بأي وسيلة.',
    ],
    answer: 'A و D: Report settings في Desktop أو Report settings في الخدمة.',
    correctIndices: [0, 3],
    example:
      'تترك التصدير مفتوحًا لتقرير عام وتقفله لـReportA من إعداداته. لا تحتاج أن تغيّر Data Load أو تمسح صلاحية قراءة الموديل.',
    optionsAr: [
      'Report settings في Desktop تتضمن منع تصدير بيانات المستهلكين.',
      'Data Load يخص التحميل للموديل، وليس أمر Export في واجهة المستهلك.',
      'صلاحيات الموديل ليست البديل المحدد لمنع جميع مسارات Export data للرسومات.',
      'Report settings في الخدمة توفر المسار الآخر المستقل.',
    ],
    takeaway:
      'منع Export data لتقرير واحد = إعداد التقرير، لا Data Load ولا نزع Build فقط.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-export-data',
    ],
    verdict: 'confirmed',
  },
  'f1-252-251': {
    translation:
      'التقرير سيُعرض على شاشة رأسية. عايز تستغل أكبر مساحة منها. تعمل إيه؟',
    story:
      'لو الصفحة أفقية على شاشة طويلة، هتفضل مساحات فاضية. محتاج مقاس الصفحة نفسها يناسب نسبة طول الشاشة لعرضها، مش تكبير صورة الخلفية.',
    reasoning: [
      'غيّر Canvas settings إلى مقاس مخصص Width و Height.',
      'اجعل الارتفاع أكبر من العرض بما يناسب الشاشة الفعلية.',
      'أعد ترتيب الرسومات للمقاس الجديد؛ تغير أبعاد الصفحة لا يعيد تصميم كل Visual تلقائيًا.',
    ],
    answer: 'B. Set a custom width and height from Canvas settings.',
    correctIndices: [1],
    example:
      'شاشة 1080×1920 قد يناسبها Canvas بنفس النسبة، بدل 16:9 أفقي. ليست هذه الأرقام مفروضة؛ النسبة هي الفكرة.',
    optionsAr: [
      'Image fit يضبط صورة الخلفية لا أبعاد صفحة التقرير.',
      'المقاس المخصص هو التحكم المطلوب في نسبة الصفحة.',
      'Personalize visuals يتيح استكشاف الرسوم، لا تغيير نسبة الشاشة.',
      'Pages pane للملاحة ويستهلك مساحة، ولا يعيد مقاس اللوحة.',
    ],
    takeaway:
      'شاشة رأسية تحتاج Canvas بنسبة رأسية؛ Background image ليست مقاس الصفحة.',
    references: [page],
    verdict: 'confirmed',
  },
  'f1-253-252': {
    translation:
      'عايز تقارن Profit بين عشر فئات منتجات في ربع سنة محدد. أنهي Visual أنسب؟',
    story:
      'عندك عشر قيم جنب أسماء فئات، مش خط زمن ومش مراحل بيع. أعمدة أفقية تسهّل قراءة الأسماء ومقارنة أطوال الأرباح.',
    reasoning: [
      'Clustered bar chart يناسب مقارنة قيم عبر فئات منفصلة.',
      'الربع محدد كفلتر، وليس سلسلة أرباع مطلوب إظهار اتجاهها.',
      'يمكن الفرز حسب الربح لتوضيح الترتيب مع الحفاظ على الصفر ومقياس مفهوم.',
    ],
    answer: 'C. a clustered bar chart.',
    correctIndices: [2],
    example:
      'فئة A ربحها 20 ألف و B 10 آلاف: طول العمودين يوضح المقارنة مباشرة. لو المطلوب تطور الأربع أرباع، ساعتها نفكر في Line.',
    optionsAr: [
      'Area مناسب لاتجاه عبر محور مرتب، لا مقارنة عشر فئات في نقطة زمنية واحدة.',
      'Funnel لمراحل متتابعة مثل زيارات ثم طلبات؛ الفئات ليست مراحل.',
      'Clustered bar يناسب مقارنة الأرباح والأسماء العشرة.',
      'Line يربط الفئات في تسلسل يوحي بعلاقة غير مطلوبة.',
    ],
    takeaway:
      'مقارنة قيمة بين فئات كثيرة بأسماء = Bar chart، لا Funnel ولا خط يوهم بتتابع.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a',
    ],
    verdict: 'confirmed',
  },
  'f1-254-253': {
    translation:
      'Finance semantic model في Workspace. فريق المالية ليس عضوًا في أي دور Workspace. عايزهم يحللوه من Excel. تمنحهم إيه؟',
    story:
      'مش لازم تدخل الفريق كمحررين في المخزن كله علشان يعمل PivotTable. اديهم الإذن المطلوب على الموديل نفسه.',
    reasoning: [
      'Build permission تتيح إنشاء تحليلات ومحتوى من الموديل، ومنها Analyze in Excel مع الأذونات اللازمة للوصول.',
      'الأذونات على الموديل لا تستلزم عضوية Workspace.',
      'RLS يحدد الصفوف المتاحة ولا يمنح Build. إعدادات التننت والترخيص تظل شروط استخدام مستقلة.',
    ],
    answer: 'A. Grant Build permission to the Finance dataset.',
    correctIndices: [0],
    example:
      'محلل المالية يعمل PivotTable من Finance دون القدرة على تعديل جداول الموديل. لو عليه RLS يرى نطاقه المسموح رغم Build.',
    optionsAr: [
      'Build هو الإذن المطلوب للتحليل من Excel، مع الوصول والترخيص المناسبين.',
      'إرسال Workbook لا يمنح إذن الوصول للموديل الذي يتصل به.',
      'RLS يقيد البيانات ولا يمنح صلاحية التحليل المطلوبة.',
      'Write صلاحية أوسع من اللازم لتعديل الموديل؛ لا يحتاجها المستهلك في Excel.',
    ],
    takeaway:
      'Analyze in Excel يحتاج Build، لا عضوية تحرير في Workspace ولا RLS بدل الإذن.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions',
    ],
    verdict: 'confirmed',
  },
  'f1-255-254': {
    translation:
      'Visual فيه مقياس. مطلوب كل القيم بمنزلتين عشريتين، والسالب أحمر وبين قوسين. اختار إجراءين يكملوا بعض.',
    story:
      'شكل الرقم ولونه مش نفس الإعداد. Custom format يظبط 12.30 و(12.30)، و Font conditional formatting يجعل السالب أحمر.',
    reasoning: [
      'استخدم Custom format بأجزاء للموجب والسالب والصفر مثل 0.00;(0.00);0.00.',
      'اضبط Font color بقواعد تجعل السالب أحمر.',
      'لا تستخدم FORMAT لمجرد تغيير الشكل إن كنت تريد إبقاء المقياس رقميًا؛ تنسيق المقياس لا يغيّر نوع ناتجه.',
    ],
    answer: 'B و C: Custom format للمقياس، و Conditional formatting للخط.',
    correctIndices: [1, 2],
    example:
      'القيمة -12.3 تظل رقمًا صالحًا للحساب، لكن تظهر (12.30) بالأحمر. الموجب 12.3 يظهر 12.30 باللون العادي.',
    optionsAr: [
      'Background color يلوّن الخلفية لا الخط الأحمر المطلوب.',
      'Custom format يحدد المنزلتين والأقواس للسالب.',
      'Font color شرطه Revenue<0 يحقق لون السالب.',
      'منزلتان على Visual وحدهما لا تحققان الأقواس ولا اللون؛ ليست بديلًا كاملًا عن Custom format ضمن الإجراءين.',
    ],
    takeaway:
      'شكل السالب بين قوسين = Custom format؛ لون كتابته = Font conditional formatting.',
    references: [
      conditional,
      'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-custom-format-strings',
    ],
    verdict: 'confirmed',
  },
  'f1-256-255': {
    translation:
      'صورة Column profile لعمود Max Temp تعرض Count=41 و Distinct=25 و Unique=17 و Min=24 و Max=1431، وأعلى عمود توزيع عند 45. مطلوب الأكثر تكرارًا وأصغر قيمة غير NULL.',
    story:
      'فيه أرقام إحصاءات وفيه قيم فعلية. العدد 41 مش درجة حرارة شائعة؛ هو عدد السجلات. والأعلى في الرسم يعني الأكثر تكرارًا، مش أكبر قيمة.',
    reasoning: [
      'القيمة 45 أسفل أطول عمود تكرار، فهي Mode المعروضة.',
      'Min=24 يجيب عن أصغر قيمة غير فارغة.',
      'نتيجة Profiling تخص نطاق العينة المستخدم، إلا إذا كان مضبوطًا على كامل البيانات.',
    ],
    answer: '45؛ ثم 24.',
    example:
      'قيمة 1431 هي Maximum حتى لو ظهرت مرة واحدة. 45 قد تظهر مرات أكثر من أي قيمة، وهذا لا يجعلها الأكبر أو الأصغر.',
    optionsAr: [
      '25 هو Distinct، لا القيمة الأكثر تكرارًا.',
      '41 هو Count للسجلات، لا Mode.',
      '45 صحيحة لأن عمود تكرارها الأعلى.',
      '1431 هو أعلى قيمة Max، وليس القيمة الأكثر تكرارًا Mode.',
      'صفر لا يمثل Minimum هنا، و Zero count=0.',
      '17 هو Unique count، لا أصغر قيمة.',
      '24 هي القيمة الدنيا Min الظاهرة في إحصاءات العمود.',
      '33 قيمة في التوزيع لكنها ليست Minimum.',
    ],
    takeaway:
      'الأكثر تكرارًا من ارتفاع عمود التوزيع؛ الأصغر من Min، لا Count أو Unique.',
    references: [profile],
    verdict: 'confirmed',
  },
  'f1-257-256': {
    translation:
      'صفحة فيها Card و Matrix و Bar chart. عايز الدريل داون داخل Matrix لا يؤثر على الاثنين، لكن تحديد خلية فيها يغيرهما. تختار أنهي Visual وأنهي إعداد؟',
    story:
      'فتح تفاصيل سنة إلى شهورها حاجة، والضغط على خلية مصر لاختيارها حاجة ثانية. المطلوب عزل حفر الهرمية، مش قطع كل تفاعل.',
    reasoning: [
      'حدد Matrix لأنها مصدر عملية Drill down.',
      'اضبط Apply drill down filters to Selected visual.',
      'احتفظ بتفاعلات التحديد للرسوم الأخرى. اختيار None سيمنع تأثير الضغط أيضًا فيخالف الشرط الثاني.',
    ],
    answer: 'Matrix؛ Apply drill down filters to Selected visual.',
    example:
      'تفتح 2024 داخل الماتريكس فتظل الكروت عامة. تضغط خلية France فتتغير الكروت بحسب تفاعل الاختيار المعتاد.',
    optionsAr: [
      'Bar chart مستقبِل هنا، ليس الرسم الذي يحدث فيه Drill down.',
      'Card أيضًا مستقبِل ولا يحمل الهرمية المطلوب ضبطها.',
      'Matrix صحيح لأنها مصدر الحفر.',
      'Filter في Edit interactions يضبط التحديد، ولا يعزل حفر الهرمية بذاته.',
      'None يمنع تأثير اختيار الخلية، خلاف المطلوب.',
      'Selected visual يحصر فلاتر Drill down في Matrix مع بقاء تفاعل التحديد.',
    ],
    takeaway: 'Drill down غير Selection. اعزل فلاتر الحفر، لا تقفل التفاعل كله.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions',
    ],
    verdict: 'confirmed',
  },
  'f1-258-257': {
    translation:
      'Population فيها PopulationAmount و DateKey لأول يوم في السنة، ومرتبطة بجدول Date. Total Population يجمع السكان، و 2023 Population = CALCULATE([Total Population], Date[Year]=2023). جدول العرض فيه Date[Year] والمقياس الثاني. الناتج إيه؟',
    story:
      'كل صف يحاول يقول «احسب سنة الصف»، لكن CALCULATE يرد: لأ، السنة 2023. لأنه يبدل فلتر نفس عمود Year، النتيجة تتكرر.',
    reasoning: [
      'صف الجدول ينشئ فلترًا على Date[Year].',
      'شرط CALCULATE على نفس العمود يستبدل فلتر السنة الحالي، دون KEEPFILTERS.',
      'كل سنة ظاهرة تحصل على سكان 2023، بافتراض وجود هذه البيانات وعدم وجود فلاتر أخرى تتعارض معها.',
    ],
    answer:
      'D. one row per year that contains the same value repeated for each year.',
    correctIndices: [3],
    example:
      'لو السكان 2022=100 و 2023=110 و 2024=120، فالصفوف الثلاثة تعرض 110 في المقياس المثبت على 2023.',
    optionsAr: [
      'Blank خارج 2023 يحتاج تقاطعًا مثل KEEPFILTERS؛ هذا ليس التعبير المعطى.',
      'العمود المعروض Year لا Date، فلا يصبح صفًا لكل تاريخ.',
      'فلتر المقياس لا يحذف تلقائيًا صفوف السنوات الأخرى عندما يعطيها نتيجة غير فارغة.',
      'صحيح؛ فلتر السنة يستبدل بسنة 2023 في كل صف.',
    ],
    takeaway:
      'CALCULATE بفلتر على نفس عمود الصف يستبدله افتراضيًا؛ KEEPFILTERS يغير هذا السلوك.',
    references: [
      'https://learn.microsoft.com/en-us/dax/calculate-function-dax',
    ],
    verdict: 'confirmed',
  },
  'f1-259-258': {
    translation:
      'موديل فيه أداء مبيعات ربع سنوي. المديرون عايزين مخرجات مناسبة للطباعة وقابلة للتصدير إلى Excel و Word و PowerPoint و PDF. تنشئ إيه؟',
    story:
      'المطلوب مستند تسليمه وطبعته واضحة، مش لوحة يضغط عليها المدير لاستكشاف الفروع. اختار أداة لها محركات إخراج مستندات.',
    reasoning: [
      'Paginated reports مصممة لمستندات بصفحات وخيارات تصدير متعددة.',
      'التصميم يمكن أن يمتد ليشمل كل الصفوف بدل الاعتماد على مساحة الشاشة.',
      'تنسيق كل صيغة قد يختلف؛ اضبط الصفحة والفواصل واختبر الصيغ المطلوبة.',
    ],
    answer: 'C. a paginated report.',
    correctIndices: [2],
    example:
      'نفس تقرير الربع يخرج PDF للطباعة و Excel للتحليل و Word للمراجعة. توفر الصيغ لا يعني أن تخطيط كل صيغة متطابق بكسلًا ببكسل.',
    optionsAr: [
      'Template app توزع حزمة تحليلات، لا تحقق بذاتها تصميم مستند الطباعة والصيغ المطلوبة.',
      'Dashboard موجزة وتفاعلية وليست مستندًا متعدد الصفحات بهذه المخرجات.',
      'Paginated report هو النوع المناسب.',
      'Interactive report للاستكشاف ولا يقدم نفس مجموعة مخرجات المستندات المطلوبة هنا.',
    ],
    takeaway: 'طلب طباعة ومستندات Word و Excel و PDF = Paginated report.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/paginated-reports/report-builder/export-reports-report-builder',
    ],
    verdict: 'confirmed',
  },
  'f1-260-259': {
    translation:
      'جدول المصدر يحدد إحداثيات الرسومات: Table عند X=300,Y=200، و Clustered column عند 700,200، و Slicer عند 20,100. لتغيير موقع كل رسم تعدل إيه؟',
    story:
      'الرسمة مكانها بيتحدد بيمين وشمال وفوق وتحت. ده Position، مش ترتيب مين فوق مين ولا المسافة داخل إطار الرسمة.',
    reasoning: [
      'عدّل X و Y من Position للرسم.',
      'X يحدد الإزاحة الأفقية و Y الإزاحة الرأسية على الصفحة.',
      'Layer order للعمق و Padding للمسافات الداخلية و Tab order لتنقل لوحة المفاتيح.',
    ],
    answer: 'C. the position.',
    correctIndices: [2],
    example:
      'تغيير Slicer من 20,100 إلى 300,100 يحركه أفقيًا مع بقاء ارتفاعه الرأسي. لا يغير مقاسه أو فلاتره.',
    optionsAr: [
      'Layer order يغير الأمام والخلف لا إحداثيات الصفحة.',
      'Padding مسافة داخل الإطار، وليس نقل الكائن كله.',
      'Position هو الخاصية المطابقة لـX و Y.',
      'Tab order يحدد تسلسل التركيز مع لوحة المفاتيح.',
    ],
    takeaway: 'X و Y = Position؛ Z أو الأمام والخلف = Layer order.',
    references: [page],
    verdict: 'confirmed',
  },
};
