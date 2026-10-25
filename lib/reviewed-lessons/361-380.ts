import type { ReviewedLesson } from './types.ts';
const rls =
  'https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-rls';
const apps =
  'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-create-distribute-apps';
const build =
  'https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions';
export const lessons361: Record<string, ReviewedLesson> = {
  'f1-361-360': {
    translation:
      'Northwind عايزة أعلى 20 عميل حسب مبلغ المبيعات بعد اختيار الفترة وفئة المنتج والمنطقة. اختار نوع الفلتر ومستواه.',
    story:
      'مش قائمة ثابتة بأغنى 20 عميل طول العمر. بنسأل داخل الفترة والمنطقة المختارة: مين أعلى 20 دلوقتي؟ والفلتر يخص رسم العملاء نفسه.',
    reasoning: [
      'استخدم Top N على حقل العميل، وحدد Top20 و By value بمقياس مبلغ المبيعات لا عدد الطلبات.',
      'المستوى Visual. فلاتر الشهر والمنطقة والفئة تحدد السياق الذي يحسب فيه الترتيب.',
      'لو المطلوب 20 بالضبط عند تعادل القيم، حدد سياسة التعادل؛ لا تفترض أن كل صيغ Top N و Rank تعالج التعادل بنفس الطريقة.',
    ],
    answer: 'Top N؛ Visual.',
    example:
      'أحمد أعلى عميل في مارس قد يخرج من القائمة عند اختيار أبريل؛ الترتيب يتغير مع السياق.',
    optionsAr: [
      'صحيح؛ Top N يختار العملاء الأعلى حسب مبلغ المبيعات.',
      'Basic يختار أسماء ثابتة، ولا يعيد ترتيب أعلى N بمقياس.',
      'Advanced يحدد شروطًا على القيم، وليس إعداد ترتيب أعلى N المطلوب.',
      'Page ليس مستوى Top N لحقل الرسم المحدد.',
      'صحيح؛ الفلتر على العميل في مستوى Visual مع By value.',
      'Report يوسع النطاق لكل التقرير، ولا يمثل موضع الفلتر المقصود هنا.',
    ],
    takeaway:
      'Top N على العميل داخل Visual، و By value على مبلغ المبيعات الصحيح.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-report-add-filter',
    ],
    verdict: 'confirmed',
  },
  'f1-362-361': {
    translation:
      'Northwind تريد نسبة الطلبات المتأخرة حسب البلد ومنطقة الشحن لفترة شحن مختارة. أنهي رسم أنسب؟',
    story:
      'عايز تقارن مصر 6% وفرنسا 12% وألمانيا 4%. كل بلد له مقام طلباته؛ دي معدلات مستقلة مش أجزاء من تورتة واحدة.',
    reasoning: [
      'Bar chart يقارن معدلًا واحدًا بين فئات البلدان أو مناطق الشحن بوضوح.',
      'اضبط النسبة على محور واحد، والفترة على ShippedDate حسب متطلب التقرير. لا تستخدم إجمالي طلبات العالم مقامًا لكل بلد.',
    ],
    answer: 'C: Bar chart.',
    correctIndices: [2],
    example:
      'بلد له 2 متأخرة من 10:20%. بلد آخر 10 من 100:10%. الأول أسوأ نسبة رغم أن عدد متأخراته أقل.',
    optionsAr: [
      'Pie يوحي بحصص تجمع 100%، بينما معدلات البلدان ذات مقامات مختلفة.',
      'Scatterplot أنسب لعلاقة متغيرين عدديين، لا المقارنة المباشرة لمعدل واحد حسب بلد.',
      'صحيح؛ طول العمود يمثل نسبة التأخير لكل بلد أو منطقة.',
    ],
    takeaway: 'قارن المعدلات المستقلة بأعمدة، لا Pie لحصص غير متكاملة.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a',
    ],
    verdict: 'confirmed',
  },
  'f1-363-362': {
    translation:
      'Litware تريد KPI يقارن أداء المبيعات بالهدف عبر الزمن. اختار المؤشر ومحور الاتجاه والهدف.',
    story:
      'حققنا كام؟ اتحركنا إزاي بالشهور؟ كنا مستهدفين كام؟ كل سؤال له مكانه، فلا نحط التاريخ مكان المبلغ أو الهدف مكان الإنجاز.',
    reasoning: [
      'Indicator: Sales[sales_amount] بتجميع صحيح يستبعد السالب والمفقود حسب الحالة.',
      'Trend axis: Date[month] بصيغة yyyymm مرتبة زمنيًا.',
      'Target goals: Targets[sales_target] بتجميع يطابق فترة ومنطقة المبيعات. KPI يعرض عادة قيمة آخر نقطة زمنية، لا إجمالي كل الشهور تلقائيًا.',
    ],
    answer: 'Sales[sales_amount]؛ Date[month]؛ Targets[sales_target].',
    example:
      'آخر شهر: الفعلي 90 ألف والهدف 100 ألف. الفرق 10 آلاف، والمحور الزمني يعرض حركة الإنجاز عبر الأشهر.',
    optionsAr: [
      'month ليس مبلغ إنجاز؛ مكانه محور الاتجاه.',
      'صحيح للمؤشر؛ مبلغ المبيعات الفعلي بالتجميع المناسب.',
      'sales_id معرف عملية لا مبلغ أداء.',
      'sales_target الهدف وليس الإنجاز الفعلي.',
      'total_returns مرتجعات لا مبيعات فعلية.',
      'صحيح للمحور؛ month يحدد شهرًا وسنة مرتبين.',
      'sales_amount قيمة قياس لا فترة زمنية.',
      'sales_id معرف معاملات لا تسلسل أشهر.',
      'sales_target ليس حقل زمن للمحور.',
      'total_returns ليست محور شهر.',
      'month لا يمثل هدفًا ماليًا.',
      'sales_amount هو الفعلي؛ مقارنته بنفسه لا تحقق الهدف.',
      'sales_id معرف لا قيمة هدف.',
      'صحيح؛ sales_target مستوى المبيعات المطلوب تحقيقه.',
      'total_returns ليست هدف المبيعات في الحالة.',
    ],
    takeaway: 'KPI: الفعلي، ثم زمن مرتب، ثم هدف بنفس سياق ووحدة الفعلي.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-kpi',
    ],
    verdict: 'confirmed',
  },
  'f1-364-363': {
    translation:
      'Litware تنشر DirectQuery على Azure SQL إلى الخدمة. هل تحتاج Gateway داخليًا؟ هل تحتاج Scheduled refresh لصفوف المصدر؟ هل يمكن اعتماد SQL Basic؟',
    story:
      'الصفوف تفضل في Azure SQL والخدمة تستعلم منها. اختيار الاعتماد قد اسمه Database في Desktop و Basic في مسار الخدمة؛ اختلاف الاسم مش منع تقني.',
    reasoning: [
      'لا Gateway داخلي عندما يكون Azure SQL متاحًا مباشرة للخدمة. Private endpoint أو شبكة خاصة يغير هذا الافتراض.',
      'Pure DirectQuery لا يستورد صفوفًا في تحديث مجدول. تحديث المرئيات والكاش والـMetadata أمور منفصلة. DirectQuery ليس نفس Live connection.',
      'SQL username/password مدعوم باسم Database/Basic حسب المضيف. لذلك No الثالثة في المصدر ليست صحيحة لمجرد أن Desktop يسميه Database.',
    ],
    answer:
      'No؛ No؛ Yes في مسار SQL authentication المدعوم بالخدمة، بدل No/No/No في المصدر.',
    example:
      'قاعدة Azure SQL قابلة للوصول مع SQL login صالح: الخدمة تستعلم بالاعتماد المخزن. إغلاق القاعدة خلف Private Link يحتاج إعادة تقييم طريق الاتصال.',
    optionsAr: [
      'No مع وصول سحابي مباشر؛ لا نعمم الحكم على مصدر خاص مغلق بالشبكة.',
      'No لتحديث صفوف Pure DirectQuery؛ ليس معناه أن الشاشة المفتوحة ستعيد الاستعلام تلقائيًا.',
      'Yes لاعتماد SQL باسم المستخدم وكلمة المرور في مسار الخدمة المدعوم؛ راجع اسم ونوع المصادقة بحسب المضيف.',
    ],
    takeaway:
      'Cloud reachable و Pure DQ لا يحتاجان Import refresh، ولا تخلط اسم Database مع منع Basic.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-use-directquery',
      'https://learn.microsoft.com/en-us/power-bi/connect-data/service-azure-sql-database-with-direct-connect',
      'https://learn.microsoft.com/en-us/power-query/connectors/sql-server',
      'https://learn.microsoft.com/en-us/power-query/connectors/azure-sql-database',
    ],
    verdict: 'conditional',
  },
  'f1-365-364': {
    translation:
      'صياغة Litware تقول متطلبات قسم المبيعات، لكن الخيارات تتعلق بمجموع المبيعات بعد استبعاد السالب والمفقود. أنهي اختيار مقصود؟',
    story:
      'لازم نقرا الخيارات والحالة مع بعض. لو المطلوب عدد العمليات حرفيًا، ولا صيغة هنا تعدها. لكن SUMX في A يقصد إجمالي المبالغ النظيفة.',
    reasoning: [
      'لإجمالي الموجب استخدم SUMX(FILTER(Sales,Sales[sales_amount]>0),Sales[sales_amount]).',
      'أصلح القوس الزائد وكلمة measure column: هي Measure لا Calculated column.',
      'متطلب قسم المبيعات لعدد المعاملات يحتاج COUNTROWS(Sales)، وهو غير معروض. لذلك الإجابة مش قطعية لكل تفسير للصياغة.',
    ],
    answer:
      'A مقصودة لمجموع المبيعات الموجبة بعد إصلاح الصيغة، لا لعدد المعاملات.',
    correctIndices: [0],
    example:
      '100 و-20 و BLANK تعطي 100 للمبلغ النظيف. عدد العمليات سؤال مختلف وقد يكون 3 حسب تعريف البيانات.',
    optionsAr: [
      'صحيح لمجموع الموجب فقط؛ أصلح الصيغة واجعله Measure.',
      'ABS يحول السالب إلى موجب ويضيفه بدل استبعاده.',
      'استبدال BLANK بصفر يترك السالب مساهمًا في المجموع.',
      'SUM العادي يدخل القيم السالبة فلا يحقق شرط الجودة.',
    ],
    takeaway:
      'عد العمليات غير مجموع المبالغ. السؤال ملتبس، والمفتاح A يحتاج هذا القيد.',
    references: [
      'https://learn.microsoft.com/en-us/dax/sumx-function-dax',
      'https://learn.microsoft.com/en-us/dax/countrows-function-dax',
    ],
    verdict: 'conditional',
  },
  'f1-366-365': {
    translation:
      'Contoso: المحللون يقرؤون حزمة المجلس، يبنون من P&L فقط، ولا يعدلون الحزمة أو يعيدون مشاركتها. اختار وصول القراءة وحق الموديل.',
    story:
      'ممكن تكون قارئًا للحزمة ومؤلفًا لتقريرك الخاص. Build يسمح باستخدام P&L، لكنه مش إذن وضع تقريرك في ورشة المجلس.',
    reasoning: [
      'Build على P&L فقط يسمح بالبناء، وتستمر RLS على المستهلك غير المحرر. لا تمنح Build على BalanceSheet.',
      'المفتاح التقليدي Viewer للـWorkspace مع Build صحيح لو المطلوب استعراض كل محتوى المساحة المعتمد.',
      'App access مع Build مخصص مسار صالح وأقل نطاقًا لحزمة مختارة. الصياغة لا تفرض Workspace membership؛ فلا يصح رفض App مطلقًا.',
    ],
    answer:
      'Build على P&L. Viewer هو مفتاح المصدر؛ App access مع Build بديل مدعوم للحزمة المختارة.',
    example:
      'محلل UnitA يقرأ الأرصدة ويبني تقرير P&L لوحدته في My Workspace، دون إضافة تقريره إلى حزمة المجلس.',
    optionsAr: [
      'App access صالح للحزمة المختارة، ويمكن جمعه مع Build محدد؛ ليس مستحيلًا تقنيًا.',
      'Member يمنح تحريرًا ويتجاوز RLS؛ أوسع من استهلاك مقيد.',
      'Viewer صحيح لو مشاهدة مساحة العمل كلها مقصودة، ولا يمنح Build تلقائيًا.',
      'صحيح؛Build على P&L فقط، دون Write أو Build على BalanceSheet.',
      'Delete لحذف الموديل وليس حق البناء المطلوب.',
      'Reshare يسمح بتمرير الوصول، وهو ممنوع ولا يعادل Build.',
    ],
    takeaway:
      'قراءة حزمة و Build محدد لا تعني Contributor على مساحة المجلس؛ راجع نطاق App و Viewer.',
    references: [apps, build, rls],
    verdict: 'conditional',
  },
  'f1-367-366': {
    translation:
      'Contoso تريد للمجلس حزمة تقارير واحدة بتنقل وروابط، وتوزيعًا بجروب Entra بأقل صيانة. اختار الطريقة والجروب.',
    story:
      'المجلس مش فريق بيصلح التقارير. بيستلم كتابًا منظمًا، وجروب واحد يحدد مين له حق فتحه.',
    reasoning: [
      'App يجمع التقارير والتنقل والمحتوى المختار في حزمة.',
      'Mail-enabled security group هو الخيار المدعوم من المعروض للتحكم بالوصول مركزيًا.',
      'Dynamic distribution list تحدد مستلمي البريد، وليست البديل المقصود لجروب الأمن في جمهور App. راعِ تراخيص الاستهلاك.',
    ],
    answer:
      'Using an app؛ Mail-enabled security group in Azure Active Directory.',
    example:
      'جروب Board-Access له App بتقارير الربع وروابط الملحقات؛ تغيير عضو يتم في الجروب بدل مشاركة كل تقرير من جديد.',
    optionsAr: [
      'المشاركة الفردية ممكنة للوصول، لكنها لا تقدم نفس حزمة التنقل وتزيد الإدارة.',
      'Workspace membership تفتح بيئة التعاون بدل الحزمة المختارة.',
      'صحيح؛App يجمع المحتوى والتنقل والجمهور.',
      'Dynamic distribution list ليست Security group المقصودة لصلاحيات الجمهور هنا.',
      'صحيح؛Mail-enabled security group تدير العضوية والوصول مركزيًا.',
      'إيميلات فردية تخالف شرط الجروب وتزيد الصيانة مع تغيّر المجلس.',
    ],
    takeaway:
      'حزمة مجلس منظمة = App، والعضوية بجروب أمن لا مشاركة فردية متكررة.',
    references: [
      apps,
      'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-share-dashboards',
    ],
    verdict: 'confirmed',
  },
  'f1-368-367': {
    translation:
      'Contoso تستورد من Azure SQL ذي Public endpoint و Business Central السحابي. عايزة البيانات جاهزة 5 صباحًا بأقل عمل. تختار إيه؟',
    story:
      'المصادر متاحة للخدمة سحابيًا. نحتاج ساعة تحديث تلقائية، مش موظف ينزل PBIX كل صباح أو يضغط Refresh visuals.',
    reasoning: [
      'Scheduled refresh دون On-premises gateway يناسب المصادر السحابية القابلة للوصول في الحالة.',
      'ابدأ بعد جاهزية المصدر بوقت يكفي للاكتمال قبل 5، مع الاعتمادات والمراقبة وهامش التأخر.',
      'شرح المصدر عن Dynamics365 on-premises لا ينطبق هنا؛ لا تحول Business Central السحابي إلى مصدر داخلي بلا دليل.',
    ],
    answer: 'C: Scheduled refresh without on-premises gateway.',
    correctIndices: [2],
    example:
      'تحديث 3:30 صباحًا بعد تحميل المصدر مع مراقبة الفشل وهامش قبل 5، لا تشغيل الساعة 5 وادعاء اكتماله فورًا.',
    optionsAr: [
      'Refresh visuals يعيد قراءة نسخة الموديل الحالية ولا يستورد جديد المصدر إلى Import.',
      'Download و Desktop refresh يدويان ومتكرران، عكس تقليل الجهد.',
      'صحيح؛ تحديث تلقائي مع اتصال سحابي مباشر.',
      'Gateway زائدة دون مصدر داخلي أو شرط شبكة خاصة في الحالة.',
    ],
    takeaway:
      'Import يحتاج تحديث الموديل، و Cloud public لا يحتاج Gateway لمجرد أن اسمه SQL.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-scheduled-refresh',
      'https://learn.microsoft.com/en-us/power-query/connectors/dynamics365businesscentral',
    ],
    verdict: 'confirmed',
  },
  'f1-369-368': {
    translation:
      'Contoso تسمح للمحللين بقراءة BalanceSheet لكن Build على P&L فقط مع RLS للوحدة. أقل عدد Datasets من الخيارات؟',
    story:
      'Build في الموديل العادي مش زرًا لكل جدول. لو كل البيانات في موديل واحد وأعطيت Build عليه، لم تمنع البناء على BalanceSheet كما طلبت الحالة.',
    reasoning: [
      'افصل BalanceSheet و P&L في اثنين Import models، وامنح Build على P&L فقط.',
      'App واحد يمكن أن يعرض تقارير من الموديلين؛ لا يشترط موديلًا واحدًا لكل App.',
      'Import يناسب التحديث اليومي والتفاعل السريع. لا تستبعد DirectQuery بحجة أنه يمنع كل DAX أو مقارنة السنوات؛ السبب ملاءمة التصميم والمصادر.',
    ],
    answer: 'B: Two imported datasets.',
    correctIndices: [1],
    example:
      'ModelA للأرصدة للقراءة فقط، و ModelB للأرباح والخسائر مع Build و RLS. App المجلس يعرض تقارير الاثنين.',
    optionsAr: [
      'موديل واحد لا يفصل Build على P&L عن Build على BalanceSheet بالحقوق المعطاة.',
      'صحيح؛ يفصل حدود إعادة الاستخدام ويناسب التحديث اليومي.',
      'اثنان DirectQuery ليسا الخيار الأنسب للمصادر والمتطلبات هنا، وليس لأن كل DAX ممنوع عليهما.',
      'موديل DirectQuery واحد يترك Build موحدة على الجداول ولا يحل المشكلة.',
    ],
    takeaway:
      'Build على جزء من البيانات فقط قد يحتاج حد موديل منفصل في هذا التصميم.',
    references: [
      build,
      'https://learn.microsoft.com/en-us/power-bi/connect-data/service-dataset-modes-understand',
    ],
    verdict: 'confirmed',
  },
  'f2-002-370': {
    translation:
      'Litware بها Weekly_Returns بمفتاح أسبوع yyyyww، و Date بمفتاح يوم yyyymmdd. كيف تربطهما لتحليل أسبوعي؟',
    story:
      'الأسبوع 202005 مش اليوم 20200501. لازم تختار تاريخًا مرجعيًا صحيحًا للأسبوع، مثل بدايته، ليطابق يومًا في التقويم.',
    reasoning: [
      'A المقصودة: أنشئ date_id مشتقًا من الأسبوع بتنسيق yyyymmdd ثم اربطه بمفتاح Date الفريد.',
      'ليس مجرد تغيير Format للرقم؛ حوّل سنة/أسبوع حسب تعريف الأسبوع في المصدر، خاصة عند حدود السنة.',
      'الربط بيوم تمثيلي يحتاج تعريفًا لتحليل شهور تتقاطع فيها الأسابيع. بعد Week فريد قد يكون تصميمًا أوضح لكنه غير معروض.',
    ],
    answer: 'A، بشرط اشتقاق تاريخ مرجعي صحيح للأسبوع لا مجرد تغيير شكل الرقم.',
    correctIndices: [0],
    example:
      'Week202005 يرتبط بيوم بدايته وفق تقويم الشركة؛ لا نفترض أنه 5 يناير أو أولمايو من شكل الرقم فقط.',
    optionsAr: [
      'المقصود الصحيح؛ مفتاح يوم مشتق بدلالة أسبوع واضحة يتيح العلاقة.',
      'RELATED لا يدمج حقائق أسبوعية في Sales دون علاقة و Grain؛ قد يكرر مبلغ المرتجعات مع كل بيع.',
      'جدول Date فريد أصلًا، و many-to-many لا تحول week_id إلى date_id أو تصلح اختلاف Grain.',
    ],
    takeaway:
      'Daily key غير Weekly key. اتفق على معنى الأسبوع وتاريخه المرجعي قبل العلاقة.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/guidance/star-schema',
      'https://learn.microsoft.com/en-us/power-bi/guidance/relationships-many-to-many',
    ],
    verdict: 'conditional',
  },
  'f2-003-371': {
    translation:
      'نسخة أخرى من سؤال Litware: أنشئ تسمية شهر مثل Feb2020. أنهي تعبير يستخدم العمود الصحيح؟',
    story:
      'اسم شهر يقراه الناس من تاريخ حقيقي، ومفتاح ترتيب يضع فبراير بعد يناير. تنسيق رقم yyyymmdd لا يفسره تلقائيًا كتاريخ.',
    reasoning: [
      'FORMAT(Date[date],"MMM YYYY") يستخدم عمود Date الحقيقي ويخرج نصًا.',
      'اضبط Sort by column على مفتاح مثل 202002، واستخدم Locale إنجليزيًا لو Feb مطلوبة حرفيًا.',
    ],
    answer: 'A: FORMAT(\'Date\'[date], "MMM YYYY").',
    correctIndices: [0],
    example:
      '2020-02-15 تظهر Feb2020، وترتيب 202002 يضعها قبل Mar2020 بدل ترتيب أبجدي.',
    optionsAr: [
      'صحيح؛ شهر مختصر وسنة 4 أرقام من تاريخ حقيقي.',
      'M YY يعطي شهرًا رقميًا وسنة قصيرة، لا الشكل المطلوب.',
      'date_id رقم مفتاح لا Date، والربط بلا مسافة لا يطابق النموذج.',
      'تنسيق date_id لا يحوله من رقم yyyymmdd إلى Date صحيح بمجرد Format.',
    ],
    takeaway: 'نسّق Date الحقيقي، ورتب اسم الشهر بمفتاح سنة/شهر.',
    references: ['https://learn.microsoft.com/en-us/dax/format-function-dax'],
    verdict: 'confirmed',
  },
  'f2-005-373': {
    translation:
      'Contoso تريد تعريف Business unit و Department و Product category موحدًا وقابلًا لإعادة الاستخدام في Import models متعددة. توصي بإيه؟',
    story:
      'بدل كل فريق يقول المنتج تابع وحدة مختلفة، جهّز قاموس أبعاد معتمدًا مرة وخلي الموديلات تسحب منه نفس التعريف.',
    reasoning: [
      'Dataflows تجهز كيانات الأبعاد المشتركة لعدة موديلات مستوردة.',
      'الموديل المشترك يوحد طبقة دلالية أوسع، لكن الحالة تحتاج بيانات أبعاد موحدة عبر نماذج مختلفة، ومنها نماذج ذات حدود Build مختلفة.',
      'حدد مالك تعريف الأعمال وجدول تحديث Dataflow قبل الموديلات؛ الأداة لا تصلح تعريفًا خاطئًا تلقائيًا.',
    ],
    answer: 'B: Dataflows for standardized data reused by imported datasets.',
    correctIndices: [1],
    example:
      'Product42 يتبع UnitB في قاموس واحد، فتستهلكه موديلات المبيعات و P&L بنفس التصنيف.',
    optionsAr: [
      'موديل منفصل لكل كيان ليس طبقة إعداد أبعاد للدمج المطلوبة، وقد يفرض Composite معقدًا.',
      'صحيح؛ يوحد التحويلات والتعريفات ويتيح إعادة استخدامها في Import models.',
      'فرض موديل واحد لكل التقارير لا يلزم من المتطلبات وقد يصطدم بفصل Build للأرصدة و P&L.',
      'Excel exports تخلق نسخًا وصيانة واختلافات تعريف وتوقيت، عكس هدف التوحيد.',
    ],
    takeaway:
      'أبعاد محضرة مشتركة بين موديلات = Dataflow، وليس إعادة كتابة نفس التحويلات.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/transform-model/dataflows/dataflows-introduction-self-service',
    ],
    verdict: 'confirmed',
  },
  'f2-006-374': {
    translation:
      'Contoso تخزن أرصدة شهرية. أي DAX يعطي رصيد نهاية الربع بدل مجموع أرصدة شهوره؟',
    story:
      'مخزون يناير 50 وفبراير 60 ومارس 40 معناه آخر الربع 40، مش 150. لكن حسابين مختلفين فيمارس نجمعهما.',
    reasoning: [
      'CALCULATE مع LASTDATE يقصر SUM على آخر تاريخ في سياق الفترة.',
      'الحالة تضمن صفًا لكل حساب لكل شهر والربط بنهاية الشهر؛ لو Snapshots ناقصة قد نحتاج آخر تاريخ به بيانات.',
      'DATESQTD مناسب لتجميع Flow مثل الإيراد، لا جمع Snapshots الأرصدة.',
    ],
    answer:
      'B: CALCULATE(SUM(BalanceSheet[BalanceAmount]),LASTDATE(Date[Date])).',
    correctIndices: [1],
    example:
      'Cash90 و Inventory50 في 31 مارس =140. MAX يعطي 90 فقط، وجمع الشهور يكرر الأصول.',
    optionsAr: [
      'DATESQTD مع SUM يكرر أرصدة الشهور بدل لقطة النهاية.',
      'صحيح؛ يجمع الحسابات عند آخر تاريخ.',
      'FIRSTNONBLANK يذهب للبداية لا النهاية، والصيغة كذلك ناقصة فاصلًا.',
      'MAX يهمل بقية الحسابات؛ نحتاج SUM عند التاريخ الأخير.',
    ],
    takeaway: 'الأرصدة تجمع عبر الحسابات، ولا تجمع عبر الزمن كالحركات.',
    references: [
      'https://learn.microsoft.com/en-us/dax/calculate-function-dax',
      'https://learn.microsoft.com/en-us/dax/lastdate-function-dax',
    ],
    verdict: 'confirmed',
  },
  'f2-014-381': {
    translation:
      'Parameter اسمه DataSourceExcel يحفظ مسار Excel. عايز الاستعلامات تستخدمه بدل المسارات الثابتة. هل إنشاء Query جديدة تشير له يكفي؟',
    story:
      'كتبت العنوان الجديد في ورقة جانبية، لكن السواقين لسه معاهم العنوان القديم. الورقة لا تعدل طلباتهم تلقائيًا.',
    reasoning: [
      'لازم Source في كل استعلام معني يستخدم Parameter فعلًا، مثل File.Contents(DataSourceExcel).',
      'Query مرجعية قد تساعد إذا غيرت كل المستهلكين لاستخدامها، لكن الحل المذكور لم يفعل ذلك.',
    ],
    answer: 'No.',
    correctIndices: [1],
    example:
      'QueryA مازالت File.Contents("D:/old.xlsx"). إنشاء QueryB=DataSourceExcel لا يغير A.',
    optionsAr: [
      'خطأ؛ Query جديدة لا تستبدل الثوابت في تعريفات الاستعلامات القائمة.',
      'صحيح؛ الحل ناقص ربط Source بالـParameter أو بالمصدر المشترك فعليًا.',
    ],
    takeaway: 'Parameter لا يغير الاتصال إلا إذا استخدمته خطوة المصدر المنفذة.',
    references: [
      'https://learn.microsoft.com/en-us/power-query/power-query-query-parameters',
    ],
    verdict: 'confirmed',
  },
  'f2-018-382': {
    translation:
      'جروب Entra يضم المؤسسة. تشارك معه 3 تقارير و Dashboard واحدة من مساحة بها عناصر أكثر. هل يحقق الوصول المحدد؟',
    story:
      'بندي الجروب مفاتيح الأربع أبواب المطلوبة، مش مفتاح مساحة العمل كلها. المشاركة هنا انتقائية.',
    reasoning: [
      'نعم؛ مشاركة العناصر المطلوبة مع Security group تحقق نطاق المشاهدة المحدد.',
      'راعِ التراخيص وحقوق Build و Reshare غير المطلوبة، وافحص وصول الجروبات الأخرى حتى لا يوسع النطاق.',
    ],
    answer: 'Yes.',
    correctIndices: [0],
    example:
      'AllStaff يفتح R1 و R2 و R3 و D1، ولا يفتح R4 لمجرد عضويته في الجروب.',
    optionsAr: [
      'صحيح؛ المشاركة الانتقائية حل صالح حتى لو App أريح لحزم أكبر.',
      'خطأ؛ السؤال لا يلزم App أو Workspace Viewer، والمشاركة للجروب مدعومة.',
    ],
    takeaway: 'صلاحية عنصر لا تساوي دورًا على كل Workspace.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-share-dashboards',
    ],
    verdict: 'confirmed',
  },
  'f2-019-383': {
    translation:
      '10 ملايينصف، و Card للعدد و Bar للإجمالي و Scatter للمبلغ والربح. حسّن وضوح Scatter دون تغيير دقة بقية الرسومات.',
    story:
      'النقط متكدسة فمش باين نمطها. لا نقص الداتا من Power Query فيتغير العدد والإجمالي؛ نحسن تمثيل النقط في الرسم فقط.',
    reasoning: [
      'High-density sampling يختار عرضًا تمثيليًا للنقط ضمن حدود Scatter، دون حذف صفوف الموديل.',
      'لا يعد بعرض 10 ملايين نقطة منفردة. بقية الرسومات تظل تحسب من الموديل الكامل.',
      'Trendline تلخص الاتجاه لكنها لا تعالج آلية عينة النقط وكثافتها بنفس الطريقة.',
    ],
    answer: 'C: Enable high-density sampling.',
    correctIndices: [2],
    example:
      'Card يبقى 10 ملايين والـBar بنفس المبالغ؛ Scatter يقدم التوزيع أوضح بدل حذف 90% من المصدر.',
    optionsAr: [
      'فلتر Query يحذف من الموديل فيغير Card و Bar ويخالف الشرط.',
      'Trendline تساعد فهم العلاقة، لكنها ليست حل تمثيل كثافة النقط المقصود.',
      'صحيح؛ تحسين خاص بالرسم لا يحذف صفوف الموديل.',
      'Count في Size يغير حجم الفقاعات ومعناها، لا يعالج عينة العرض الكثيفة المطلوبة.',
    ],
    takeaway:
      'حل كثافة النقط داخل Scatter، لا بحذف الداتا التي تحسب منها كل الرسومات.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-high-density-scatter-charts',
    ],
    verdict: 'confirmed',
  },
  'f2-020-384': {
    translation:
      'خلفيات Total Sales تتلون حسب%Growth to Last Year. مطلوب الحسابات الحالية فقط. اختار نوع التنسيق وطريقته.',
    story:
      'المقياس الحالي بيرجع نسبة، مش Red أو كود لون. نكتب Rules تربط النسبة بلون خلفية الخلية، دون Measure لون جديدة.',
    reasoning: [
      'الصورة تلون خلفية الخلايا؛ النوع Background color.',
      'Rules تربط نطاقات المقياس الرقمي بالألوان. Field value تحتاج حقلًا يرجع اسم لون أو كوده.',
      'Color scale تعطي تدرجًا، لا القواعد الفئوية المستهدفة؛ لا نستنتج حدود الألوان الرقمية الدقيقة من الصورة وحدها.',
    ],
    answer: 'Background color؛ Rules.',
    example:
      'قاعدة نمو 0% حمراء و 60% فأكثر خضراء توضح الفكرة. الأرقام مثال وليست استنتاجًا لحدود الصورة الأصلية.',
    optionsAr: [
      'صحيح؛ التلوين خلف رقم Total Sales.',
      'Data bars أشرطة داخلية لا الخلفيات المعروضة.',
      'Font color يلون الأرقام لا خلفيتها.',
      'Icons رموز، وليست الخلفيات الظاهرة.',
      'Web URL ينشئ رابطًا ولا يحل ألوان النمو.',
      'Color scale تدرج لوني لا الحدود الفئوية المطلوبة بالمفتاح المراجع.',
      'Field value يحتاج لونًا مرجعًا من حقل؛ النسبة وحدها ليست اسم لون.',
      'صحيح؛ Rules تفسر النسبة الحالية كحدود ألوان بلا حساب إضافي.',
    ],
    takeaway: 'مقياس نسبة فقط: Rules. مقياس يرجع لونًا: Field value.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-table-formatting',
    ],
    verdict: 'confirmed',
  },
  'f2-021-385': {
    translation:
      'مطلوب Visual يعرض الاتجاهات ومعلومات مفيدة تلقائيًا، ويتحدث مع الاختيارات في الرسومات الأخرى. تختار إيه؟',
    story:
      'بدل كتابة «المبيعات زادت» يدويًا ثم نسيانها، خلي ملخصًا نصيًا يقرأ الفلاتر ويحدث حقائقه المحسوبة.',
    reasoning: [
      'Smart narrative يلخص معلومات واتجاهات بلغة طبيعية، ويتفاعل مع سياق الفلاتر المدعوم.',
      'راجع صحة المقاييس والملخص. هذا ليس إثباتًا لسبب إحصائي ولا سؤال Q&A يكتبه المستخدم.',
    ],
    answer: 'D: Smart narrative.',
    correctIndices: [3],
    example: 'اختيار East يجعل الملخص يصف مبيعات East بدل إجمالي المؤسسة.',
    optionsAr: [
      'Key influencers لتحليل عوامل تغير نتيجة، لا الملخص النصي العام المطلوب.',
      'Decomposition tree تفكك مقياسًا عبر حقول لا تكتب السرد التلقائي نفسه.',
      'Q&A تستقبل سؤال المستخدم؛ هنا المطلوب ملخص آلي دون سؤال كل مرة.',
      'صحيح؛ Smart narrative تبني سردًا عدديًا يتغير بسياق التقرير.',
    ],
    takeaway: 'ملخص نصي آلي مع الفلاتر = Smart narrative، لا Q&A أو شجرة تفكيك.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-smart-narrative',
    ],
    verdict: 'confirmed',
  },
  'f2-026-386': {
    translation:
      'وصف المنتج 5 أجزاء تفصلها>. الاسم الجزء الرابع. جهز Hierarchy للاستكشاف بأقل حجم، ورتب 3 خطوات.',
    story:
      'الوصف Bikes > Adventure Works > Mountain Bikes > Super Carbon Bike > 26in wheels. نريد الاسم وحده وسلّمًا يبدأ بالفئة وينتهي بالمواصفات، ثم نستعمله بدل الوصف.',
    reasoning: [
      'استخرج النص بين ثالث ورابع> في ProductName بمرحلة Power Query. كل ما بعد ثالث> يشمل المواصفات أيضًا.',
      'Hierarchy: ProductCategory ثم ProductSubcategory ثم Manufacturer ثم ProductName ثم ProductSpecifications.',
      'استبدل ProductDescription بالـHierarchy في الرسومات؛ خيار Replace سقط من قائمة الموقع وكان موجودًا بالصورة الأصلية.',
      'لحجم أقل، احذف الوصف المركب الزائد من الموديل إذا لم يعد له استخدام آخر. الإخفاء وحده لا يوفر ذاكرة.',
    ],
    answer:
      'Extract between third/fourth > → hierarchy broad-to-detail → Replace ProductDescription. الفهارس بعد إلحاق الخيار السابع:[3,5,6].',
    example:
      'الجزء الرابع Super Carbon Bike. أخذ كل ما بعد ثالث> يعطي الاسم والمواصفات معًا، فيفشل فصل الحقلين.',
    optionsAr: [
      'ترتيب يبدأ Manufacturer ثم Specs وينتهي Category يعكس التدرج من العام للتفاصيل.',
      'بين أول ورابع> يشمل عدة أجزاء، لا اسم المنتج وحده.',
      'إضافة Hierarchy كحقل إضافي لا تستبدل الوصف كما طلب الإجراء الأخير.',
      'صحيح أولًا؛ الاسم الرابع محصور بين الفاصلين الثالث والرابع.',
      'كل ما بعد الثالث يشمل Name و Specs، وليس الاسم فقط.',
      'صحيح ثانيًا؛ يبدأ Category وينتهي Specifications بترتيب التفاصيل المطلوب.',
      'صحيح ثالثًا؛ استبدال ProductDescription بالـHierarchy. أُعيد هذا الخيار من الصورة الأصلية.',
    ],
    takeaway:
      'استخرج الجزء الرابع فقط، ثم Hierarchy صحيحة، ثم استبدل الحقل بدل إضافته مرتين.',
    references: [
      'https://learn.microsoft.com/en-us/powerquery-m/text-betweendelimiters',
      'https://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction',
      'https://learn.microsoft.com/en-us/power-bi/consumer/end-user-drill',
    ],
    verdict: 'confirmed',
  },
  'f2-027-387': {
    translation:
      'الموديل به 4 أقسام. المطلوب كل شخص يرى بيانات قسمه فقط كقيد أمني، لا فلترًا يقدر يلغيه. تعمل إيه؟',
    story:
      'السلايسر ستارة المستخدم يقدر يفتحها. RLS قفل في الموديل يحدد الصفوف المسموحة حتى لو بدل الرسم.',
    reasoning: [
      'أنشئ RLS role لكل قسم بفلتره، وعيّن أعضائه في الخدمة.',
      'تحقق من انتقال فلتر Departments إلى ConfidentialData واختبر هوية Viewer فعلية.',
      'عضوية أكثر من دور تجمع المسموح، وأدوار Admin/Member/Contributor على الموديل تتجاوز RLS.',
    ],
    answer: 'A: RLS role for each department, then role membership.',
    correctIndices: [0],
    example:
      'Finance user في Finance role يبقى مقيدًا بقسمه حتى عبر Analyze in Excel المصرح. سلايسر Finance وحده لا يضمن ذلك.',
    optionsAr: [
      'صحيح؛ أدوار RLS تربط المستخدمين بقواعد أمن صفوف على الموديل.',
      'Parameter يضبط التحميل أو الاستعلام، ولا يعيّن وحده أمنًا لكل مستهلك.',
      'CURRENTGROUP تخص GROUPBY؛Measure لا تطبق حدود RLS على كل الوصول.',
      'Slicer اختياري يمكن تغييره وإزالته، فلا تعتمد عليه للأمن.',
    ],
    takeaway:
      'إخفاء أمني = RLS؛ تسهيل تصفح = Slicer. الاختلاف في الإنفاذ لا شكل الشاشة.',
    references: [rls],
    verdict: 'confirmed',
  },
};
