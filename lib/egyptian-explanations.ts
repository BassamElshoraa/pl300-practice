import type { Question } from '@/lib/questions';

type TopicGuide = {
  matches: string[];
  explanation: string;
};

const topicGuides: TopicGuide[] = [
  {
    matches: ['directquery', 'direct query', 'storage mode', 'composite model', 'dual mode'],
    explanation: 'الفكرة هنا في مكان الداتا وقت ما التقرير يشتغل: Import بيحفظ نسخة جوه Power BI فبيبقى أسرع، DirectQuery بيسأل المصدر وقتها فالداتا تبقى أحدث، وDual بيخلي جدول الأبعاد يشتغل بالطريقتين حسب السؤال. اختار على أساس سرعة التقرير ومواعيد تحديث الداتا.',
  },
  {
    matches: ['incremental refresh', 'rangeStart', 'rangeEnd', 'archive data'],
    explanation: 'بدل ما Power BI يعيد تحميل الجدول الضخم كله، الـ incremental refresh بيحدّث الجزء الجديد أو اللي اتغيّر بس. عشان كده بنحدد فترة زمنية بباراميترَي RangeStart وRangeEnd ونخلي الفلترة تتطبّق في المصدر قدر الإمكان.',
  },
  {
    matches: ['query folding', 'native query', 'view native query'],
    explanation: 'Query folding معناه إن Power Query يبعث خطوات التنضيف للمصدر نفسه — زي SQL Server — بدل ما يسحب كل الداتا ويشتغل عليها محليًا. ده غالبًا أسرع وأخف، فرتّب خطواتك بحيث الـ folding يفضل شغال لأطول وقت.',
  },
  {
    matches: ['gateway', 'on-premises', 'personal mode', 'data source credentials'],
    explanation: 'الـ gateway هو الكوبري بين Power BI Service والداتا اللي جوه الشركة أو على جهاز داخلي. لازم المصدر والـ credentials والـ mapping يبقوا مضبوطين عشان الـ refresh يشتغل من غير ما الكمبيوتر الشخصي يكون هو الحل المؤقت.',
  },
  {
    matches: ['row-level security', 'row level security', 'rls', 'username()', 'userprincipalname'],
    explanation: 'RLS بيخلي كل مستخدم يشوف الصفوف المسموح له بيها بس. بنعمل Role وفلتر DAX، ولو الأمان Dynamic بنقارن المستخدم الحالي بجدول صلاحيات. المهم تختبر كل Role بـ View as قبل النشر.',
  },
  {
    matches: ['object-level security', 'ols', 'sensitivity label', 'information protection'],
    explanation: 'دي نقطة أمان وحوكمة: RLS بيخفي صفوف، إنما OLS يقدر يخفي جدول أو عمود كامل. والـ sensitivity label بتصنّف المحتوى وتساعد إن قواعد حماية المؤسسة تفضل ماشية معاه.',
  },
  {
    matches: ['workspace role', 'viewer', 'contributor', 'member', 'admin', 'build permission'],
    explanation: 'صلاحيات الـ workspace درجات: Viewer يتفرّج، Contributor ينشئ ويعدّل محتوى، Member عنده إدارة ومشاركة أكتر، وAdmin أعلى صلاحية. ادّي أقل صلاحية تكفي المطلوب؛ ولو حد هيبني تقرير من semantic model فهو محتاج Build permission.',
  },
  {
    matches: ['cardinality', 'one-to-many', 'many-to-one', 'many-to-many', 'cross-filter', 'relationship'],
    explanation: 'العلاقة بتقول الفلتر هيمشي بين الجداول إزاي. غالبًا جدول الأبعاد ناحية الـ one وجدول العمليات ناحية الـ many. اتجاه فلترة واحد بيكون أوضح وأأمن، ونستخدم الاتجاهين أو many-to-many بس لما السيناريو فعلًا محتاجهم.',
  },
  {
    matches: ['star schema', 'fact table', 'dimension table', 'snowflake'],
    explanation: 'في الـ star schema بنحط الأرقام والحركات في Fact table، والوصف زي العميل والمنتج والتاريخ في Dimension tables حواليه. الشكل ده بيبسّط العلاقات وبيخلي المقاييس والفلاتر أسرع وأسهل في الفهم.',
  },
  {
    matches: ['inactive relationship', 'userelationship', 'active relationship'],
    explanation: 'Power BI يسمح بعلاقة Active واحدة بين نفس الجدولين في نفس المسار. لو عندك أكتر من تاريخ — طلب وشحن مثلًا — سيب العلاقة الأساسية Active وفعّل التانية جوه المقياس بـ USERELATIONSHIP وقت ما تحتاجها.',
  },
  {
    matches: ['calculated column', 'measure', 'implicit measure', 'quick measure'],
    explanation: 'Calculated column بيتحسب لكل صف وبيتخزن في الموديل، إنما Measure بيتحسب وقت عرض التقرير حسب الفلاتر الحالية. لو المطلوب تجميع ديناميكي أو KPI فغالبًا Measure؛ ولو قيمة ثابتة لكل صف أو هتستخدمها في محور/تصنيف فممكن Column.',
  },
  {
    matches: ['calculate(', 'filter context', 'row context', 'allselected', 'removefilters', 'keepfilters'],
    explanation: 'CALCULATE أهم فكرتها إنها تغيّر الـ filter context قبل ما تحسب التعبير. يعني بتقول: احسب نفس المقياس، بس تحت شروط فلترة مختلفة. ALL أو REMOVEFILTERS يشيلوا فلاتر، وKEEPFILTERS يضيف الشرط من غير ما يدهس الموجود.',
  },
  {
    matches: ['sameperiodlastyear', 'dateadd', 'time intelligence', 'calendarauto', 'date table', 'year-to-date', 'ytd'],
    explanation: 'دوال الوقت محتاجة Date table سليمة: تاريخ متصل من غير فجوات، صف واحد لكل يوم، ومتعلّمة كـ Date table. بعدها تقدر تقارن بالسنة اللي فاتت أو تعمل YTD لأن Power BI فاهم تسلسل الأيام والشهور صح.',
  },
  {
    matches: ['merge queries', 'merge query', 'join kind', 'left outer', 'inner join'],
    explanation: 'Merge شبه JOIN في SQL: بيوصل أعمدة من جدول بجدول باستخدام مفتاح مشترك. نوع الـ join هو اللي يحدد أنهي صفوف تفضل؛ Left Outer مثلًا يحتفظ بكل صفوف الجدول الأول ويجيب المطابق من التاني.',
  },
  {
    matches: ['append queries', 'append query'],
    explanation: 'Append بيحط صفوف الجداول تحت بعض، فبنستخدمه لما الجداول عندها نفس المعنى ونفس الأعمدة — زي مبيعات كل شهر في ملف. Merge مختلف: هو بيزوّد أعمدة جنب بعض بناءً على مفتاح.',
  },
  {
    matches: ['unpivot', 'pivot column', 'transpose'],
    explanation: 'Unpivot بيحوّل أعمدة متكررة — زي Jan وFeb وMar — لصفوف فيها اسم البند وقيمته. الشكل الطويل ده أنسب للتحليل في Power BI وأسهل في الرسم والفلترة من إن كل شهر يبقى عمود مستقل.',
  },
  {
    matches: ['data type', 'whole number', 'decimal number', 'date/time', 'locale'],
    explanation: 'نوع البيانات مش مجرد شكل؛ هو اللي يحدد Power BI يقدر يجمع ويقارن ويربط العمود إزاي. اختار النوع الحقيقي للقيمة، ولو تاريخ أو رقم مكتوب بطريقة بلد مختلفة استخدم Locale مناسب عشان التحويل مايقلبش اليوم بالشهر أو يفهم الفاصلة غلط.',
  },
  {
    matches: ['column quality', 'column distribution', 'column profile', 'profiling'],
    explanation: 'أدوات Data profiling بتكشف جودة العمود: Column quality بتوضح Valid/Error/Empty، وDistribution بتوضح القيم وتكرارها، وProfile يدي تفاصيل وإحصائيات أوسع. خليك واخد بالك هل الفحص على أول 1000 صف ولا الداتا كلها.',
  },
  {
    matches: ['replace errors', 'remove errors', 'null', 'missing values'],
    explanation: 'الـ null معناها قيمة مش موجودة، والـ error معناها خطوة التحويل فشلت. قبل ما تستبدل أو تمسح، افهم السبب الأول؛ ساعات تغيير نوع البيانات أو تنظيف النص هو العلاج الحقيقي بدل إخفاء المشكلة.',
  },
  {
    matches: ['slicer', 'visual-level filter', 'page-level filter', 'report-level filter', 'filter pane'],
    explanation: 'الفرق الأساسي هو نطاق الفلتر: Visual على رسم واحد، Page على الصفحة، Report على التقرير كله، وSlicer عنصر ظاهر للمستخدم يغيّر الاختيار بنفسه. اختار أضيق نطاق يحقق المطلوب عشان ماتأثرش على حاجات تانية بالغلط.',
  },
  {
    matches: ['bookmark', 'selection pane', 'button', 'page navigation'],
    explanation: 'الـ bookmark بيحفظ حالة الصفحة — فلاتر وظهور العناصر ومكانها حسب الإعدادات — والزرار يقدر ينقلك للحالة دي. مع Selection pane تقدر تعمل واجهة تفاعلية زي إظهار وإخفاء قائمة أو التبديل بين شكلين.',
  },
  {
    matches: ['drillthrough', 'tooltip page', 'report page tooltip', 'drill down'],
    explanation: 'Drill down ينزّلك مستوى جوه نفس الرسم، Drillthrough ينقلك لصفحة تفاصيل ومعاه قيمة العنصر اللي اخترته، وTooltip page بتظهر معلومات صغيرة وقت الوقوف على العنصر. السؤال بيحدد نوع الحركة المطلوبة.',
  },
  {
    matches: ['conditional formatting', 'data bars', 'color scale', 'icons'],
    explanation: 'Conditional formatting بيحوّل الرقم لإشارة بصرية — لون أو أيقونة أو bar — حسب Rules أو Color scale أو Field value. المهم تختار العمود اللي هيتقاس عليه وتظبط الاتجاه والحدود عشان اللون يوصل المعنى الصح.',
  },
  {
    matches: ['decomposition tree', 'key influencers', 'scatter chart', 'waterfall', 'funnel chart', 'treemap', 'gauge'],
    explanation: 'كل Visual بيجاوب نوع سؤال مختلف: الاتجاه عبر الزمن Line، المقارنة Column/Bar، العلاقة بين رقمين Scatter، أسباب التغير Waterfall، تحليل الأسباب Decomposition tree، والعوامل المؤثرة Key influencers. اختار الرسم على أساس السؤال اللي عايز تجاوبه مش لمجرد الشكل.',
  },
  {
    matches: ['q&a', 'q and a', 'synonym', 'linguistic schema'],
    explanation: 'Q&A بيسمح للمستخدم يسأل الداتا بلغة طبيعية. عشان يفهم كلام الناس صح، سمّي الحقول بأسماء واضحة وأضف Synonyms للكلمات البديلة، وراجع الأسئلة اللي Q&A مش عارف يفسرها.',
  },
  {
    matches: ['dashboard', 'pin a', 'tile', 'power bi app'],
    explanation: 'التقرير ممكن يبقى فيه صفحات وتفاعل، أما الـ dashboard فهو صفحة واحدة في Power BI Service ومتكوّن من Tiles متثبتة من تقارير مختلفة. والـ App هي طريقة مرتبة لنشر مجموعة محتوى جاهزة للمستخدمين.',
  },
  {
    matches: ['scheduled refresh', 'refresh schedule', 'refresh history'],
    explanation: 'الـ scheduled refresh بيحدّث النسخة المنشورة في مواعيد محددة. نجاحه محتاج credentials شغالة، وgateway لو المصدر داخلي، ومصدر يدعم التحديث. Refresh history أول مكان تبص فيه لو التحديث وقف.',
  },
  {
    matches: ['performance analyzer', 'dax studio', 'optimize', 'performance'],
    explanation: 'Performance Analyzer بيقول كل Visual أخد وقت قد إيه ووقت DAX قد إيه، فابدأ بالأبطأ. بعد كده راجع عدد الرسومات، العلاقات، حجم الأعمدة، وصيغة DAX بدل التخمين.',
  },
  {
    matches: ['aggregation table', 'aggregations'],
    explanation: 'جدول الـ aggregation بيخزن نتائج مجمعة مسبقًا عشان الأسئلة الشائعة تتجاوب بسرعة بدل قراءة جدول التفاصيل الضخم كل مرة. لازم الـ mappings ومستوى التجميع يوافقوا طريقة استخدام التقرير.',
  },
  {
    matches: ['deployment pipeline', 'development', 'test', 'production'],
    explanation: 'Deployment pipeline بتنظم نقل المحتوى من Development لـ Test وبعدها Production. الفكرة إنك تجرّب التغيير وتراجع الاختلافات قبل ما يوصل للمستخدم النهائي، وتستخدم Rules لو الاتصال أو الباراميتر بيتغير بين المراحل.',
  },
  {
    matches: ['parameter', 'what-if'],
    explanation: 'الـ parameter قيمة متغيرة بدل ما تثبّتها جوه الخطوات. Query parameter مفيد لتغيير مصدر أو شرط تحميل، وWhat-if parameter بيخلي المستخدم يجرّب رقم ويشوف تأثيره على المقاييس من غير ما يغيّر الداتا الأصلية.',
  },
  {
    matches: ['get data', 'connector', 'excel workbook', 'sharepoint folder', 'odata feed', 'web api', 'json response', 'cassandra'],
    explanation: 'اختيار الـ connector الصح مهم لأنه بيفهم شكل المصدر وبيوفر تسجيل الدخول والتحديث المناسبين. اختار الموصل الأقرب للمصدر نفسه، وبعدها اختار الـ object المطلوب من Navigator بدل ما تلف على حل عام يضيّع المزايا أو يصعّب الـ refresh.',
  },
  {
    matches: ['folder that contains', 'combine files', 'folder connector', 'file metadata', 'content column'],
    explanation: 'لما الملفات كلها بنفس التركيب، Folder connector يجيب قائمة الملفات الأول. لو عايز المحتوى تعمل Combine على عمود Content؛ ولو عايز metadata بس، تشيل Content وتحتفظ بأعمدة زي Name وExtension وDate modified.',
  },
  {
    matches: ['privacy level', 'private', 'organizational', 'public data source'],
    explanation: 'Privacy levels بتمنع Power Query إنه يسرّب داتا من مصدر حساس لمصدر أقل ثقة أثناء دمج المصادر. Private أعلى عزل، Organizational داخل المؤسسة، وPublic للداتا المفتوحة؛ التصنيف بيتحدد حسب حساسية المصدر مش مكانه بس.',
  },
  {
    matches: ['use first row as headers', 'promote headers', 'split column', 'extract text', 'parse json', 'record', 'list into a table', 'table.expand'],
    explanation: 'في Power Query كل خطوة بتغيّر شكل الجدول: Promote Headers يرفع صف العناوين، Split/Extract يفصل النص، وJSON غالبًا تفكّه من List أو Record لحد ما توصّل الأعمدة. نفّذ الخطوات بالترتيب اللي يخلي كل خطوة تستلم الشكل اللي مستنياه.',
  },
  {
    matches: ['hierarchy', 'group data', 'create a group', 'bins', 'bin size'],
    explanation: 'Group بيجمع قيم منفصلة تحت اسم واحد، Bin بيقسّم الأرقام أو التواريخ لفئات منتظمة، وHierarchy بيرتب مستويات تتنقّل بينها زي Region ثم State. اختار الأداة حسب هل المطلوب تجميع، تقسيم نطاقات، ولا Drill بين مستويات.',
  },
  {
    matches: ['anomaly detection', 'outlier', 'trend line', 'constant line', 'reference line', 'analytics pane'],
    explanation: 'Analytics pane بتضيف طبقة تحليل فوق الرسم: Trend line يوضح الاتجاه العام، Constant line يحط حد ثابت، وAnomaly detection يعلّم النقاط غير الطبيعية في سلسلة زمنية. لازم نوع الرسم والمحور يدعموا الميزة الأول.',
  },
  {
    matches: ['theme', 'page size', 'vertical display', 'mobile layout', 'wallpaper', 'canvas settings'],
    explanation: 'Theme يوحّد ألوان وخطوط التقرير كله، أما Canvas/Page settings فتتحكم في مقاس واتجاه الصفحة وخلفيتها. للشاشات الرأسية أو الموبايل ظبّط الـ layout والمقاس على طريقة العرض بدل ما تصغّر صفحة عريضة وخلاص.',
  },
  {
    matches: ['accessibility', 'screen reader', 'alt text', 'tab order', 'color blindness', 'high contrast'],
    explanation: 'التقرير المتاح للجميع محتاج Alt text يشرح كل Visual، وTab order منطقي للكيبورد وقارئ الشاشة، وتباين ألوان كويس من غير الاعتماد على اللون وحده. العنوان الواضح والـ markers بيساعدوا كمان في الرسوم الخطية.',
  },
  {
    matches: ['export data', 'data exfiltration', 'download this file', 'tenant setting'],
    explanation: 'منع التصدير له أكتر من مستوى: إعداد داخل التقرير، إعداد في Power BI tenant، وصلاحيات المستخدم. اختار المستوى اللي يحقق المطلوب من غير ما تقفل الميزة على المؤسسة كلها لو المنع مطلوب لتقرير واحد بس.',
  },
  {
    matches: ['personalize visuals', 'field parameter', 'change the visual type'],
    explanation: 'Personalize visuals بيدي كل مستخدم مساحة يغيّر نوع الرسم أو الحقول في العرض بتاعه من غير ما يعدّل التقرير الأصلي للناس. Field parameters مناسبة لما المصمم نفسه عايز يوفر اختيارات محددة للتبديل بين مقاييس أو أبعاد.',
  },
  {
    matches: ['ai insights', 'key phrase', 'sentiment', 'language detection', 'cognitive services'],
    explanation: 'AI Insights بتطبّق خدمات جاهزة على النص: Sentiment يحدد الانطباع، Key phrases تستخرج أهم كلمات، وLanguage detection تعرف اللغة. اختار الوظيفة المطابقة للناتج المطلوب وخلي بالك إن التشغيل ممكن يحتاج Premium capacity وصلاحيات مناسبة.',
  },
  {
    matches: ['topn(', 'generateseries', 'closingbalancemonth', 'closingbalancequarter', 'closingbalanceyear', 'rankx', 'selectedvalue'],
    explanation: 'اقرأ اسم دالة DAX كأنه وصف للعملية: TOPN ترجع أعلى عدد صفوف، GENERATESERIES تنشئ سلسلة أرقام، Closing Balance تجيب قيمة آخر تاريخ في الفترة، وSELECTEDVALUE ترجع اختيارًا واحدًا فقط. بعد كده راجع ترتيب معاملات الدالة والفلتر المستخدم.',
  },
  {
    matches: ['lineage view', 'impact analysis', 'upstream', 'downstream'],
    explanation: 'Lineage view بتوريك رحلة الداتا من المصدر للـ semantic model وبعده التقارير والـ dashboards. Impact analysis مهم قبل التعديل لأنه يوضح المحتوى اللي بيعتمد على العنصر وممكن يتأثر لو غيّرته.',
  },
  {
    matches: ['could not find file', 'password is expired', 'update the credentials', "column 'cost'", 'moved to a different folder', 'data source settings'],
    explanation: 'رسالة التحديث هنا بتقول إن تعريف المصدر القديم مبقاش مطابق للواقع: مسار اتغيّر، باسورد انتهى، أو عمود اتمسح/اتسمّى من جديد. صلّح الأصل من Data source settings أو عدّل خطوة Power Query اللي بتشير للاسم القديم، وبعدها جرّب Refresh.',
  },
  {
    matches: ['restrict access to individual rows', 'can view only data', 'using roles', 'sales team can view only'],
    explanation: 'ده سيناريو Row-Level Security حتى لو السؤال ماكتبش الاختصار RLS. اعمل Role بفلتر يجمع كل الشروط المطلوبة، انشر الموديل، ضيف المستخدمين أو الجروب للـ Role، واختبر إن الصفوف الظاهرة هي المطلوبة بس.',
  },
  {
    matches: ['security group', 'distribution group', 'microsoft 365 group', 'add the users to a group'],
    explanation: 'المطلوب تختار نوع Group ينفع يتضاف لصلاحيات Power BI. فرّق بين جروب معمول للأمان وإدارة الوصول وبين قائمة بريد هدفها الرسائل فقط؛ المشاركة لازم تعتمد على نوع مدعوم كهوية أمنية.',
  },
  {
    matches: ['edit interactions', 'when a segment is selected', 'cross-highlight', 'cross-filtering'],
    explanation: 'Edit interactions بتحدد كل Visual هيعمل إيه لما تختار نقطة من Visual تاني: Filter أو Highlight أو مفيش تأثير. ظبّط الأيقونة فوق الرسم المستهدف، وكرر ده لكل علاقة تفاعلية مطلوبة في الصفحة.',
  },
  {
    matches: ['dax expression', 'dax query', 'calculated table', 'calculated field'],
    explanation: 'في سؤال DAX ابدأ بتحديد الناتج: جدول ولا قيمة واحدة ولا ترتيب. بعد كده اختار الدالة اللي ترجع النوع ده، وراجع الـ filter context وترتيب المعاملات. أسماء الجداول والأعمدة لازم تفضل مطابقة للموديل حرفيًا.',
  },
  {
    matches: ['power query editor', 'shape the query', 'power query m', 'table.replacevalue'],
    explanation: 'Power Query بيسجل التنضيف كسلسلة Applied Steps، وكل خطوة بتستلم ناتج اللي قبلها. اقرأ المطلوب من الآخر، واختار التحويل المناسب للعمود أو الصف، وراجع معاينة الخطوة عشان ماتكسرش أسماء أو أنواع بيانات خطوة بعدها.',
  },
  {
    matches: ['visualization', 'visual shown', 'add to the visual', 'line chart', 'bar chart', 'column chart'],
    explanation: 'اقرأ المحاور والهدف قبل اسم الرسم: إيه الفئة، إيه القيمة، وهل المطلوب مقارنة ولا اتجاه ولا نسبة من الإجمالي. بعد اختيار الـ Visual حط كل حقل في الـ well الصح واضبط Format أو Analytics لو المطلوب تغيير في الشكل أو معلومة إضافية.',
  },
];

function answerText(question: Question) {
  if (question.type === 'manual') {
    const boxes = [...question.explanation.matchAll(/Box\s*\d+\s*:\s*([^\n–—-]+)/gi)]
      .map((match) => match[1].trim())
      .filter(Boolean);
    return boxes.length > 0
      ? `اختيارات الخانات بالترتيب: ${boxes.join('، ')}.`
      : 'الإجابة هنا بصرية؛ بص على صورة Source answer اللي فوق وامشِ على الخانات واحدة واحدة.';
  }

  if (question.type === 'matching') {
    const rows = question.rows ?? [];
    const pairs = rows.map((row, index) => `${row} ← ${question.choices[question.correct[index]]}`).filter((pair) => !pair.endsWith('undefined'));
    return `التوصيل الصح: ${pairs.join('، ')}.`;
  }

  if (question.type === 'sequence') {
    const steps = question.correct.map((index, position) => `${position + 1}) ${question.choices[index]}`);
    return `الترتيب الصح: ${steps.join(' ← ')}.`;
  }

  const choices = question.correct.map((index) => question.choices[index]).filter(Boolean);
  return choices.length > 0 ? `الإجابة الصح: ${choices.join(' + ')}.` : 'راجع الإجابة الصحيحة الموضحة فوق.';
}

function topicExplanation(question: Question) {
  const source = `${question.prompt}\n${question.context ?? ''}\n${question.explanation}`.toLowerCase();
  return topicGuides.find((guide) => guide.matches.some((term) => source.includes(term)))?.explanation
    ?? 'خدها من آخرها: حدّد السؤال طالب إيه بالظبط، اربطه بالميزة اللي بتعمل الوظيفة دي في Power BI، وبعدها استبعد الاختيارات اللي بتغيّر حاجة تانية أو بتدي صلاحية أكبر من المطلوب. المصطلح الإنجليزي مهم تحفظه زي ما هو لأنه هو اللي هتشوفه في الامتحان.';
}

export function buildEgyptianExplanation(question: Question) {
  const visualNote = question.type === 'manual'
    ? 'في أسئلة الـ Answer Area، كل خانة قرار لوحدها؛ ماتتعاملش مع الصورة كأنها اختيار واحد.'
    : 'مش المطلوب تحفظ الجملة؛ افهم ليه الاختيار ده بيحل الشرط المذكور في السؤال.';

  return `${answerText(question)}\n\n${topicExplanation(question)}\n\n${visualNote}`;
}
