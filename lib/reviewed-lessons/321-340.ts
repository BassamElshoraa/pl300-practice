import type { ReviewedLesson } from './types.ts';
const build =
  'https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions';
const roles =
  'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces';
const apps =
  'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-create-distribute-apps';
const share =
  'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-share-dashboards';
const gateway =
  'https://learn.microsoft.com/en-us/power-bi/connect-data/service-gateway-sql-tutorial';
const refresh =
  'https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-scheduled-refresh';
export const lessons321: Record<string, ReviewedLesson> = {
  'f1-321-320': {
    translation:
      'المستخدمون عندهم Build. عايز استخدام Excel يكون باتصال مباشر بالموديل، لا تصدير نسخة مستقلة من رسومات التقرير. تعمل إيه؟',
    story:
      'في فرق بين Excel متوصل بالصنبور الأصلي وبين جردل أرقام أخده ومشي. Build فتح Analyze in Excel؛ ناقص نقفل Export من التقرير.',
    reasoning: [
      'غيّر Export data للتقرير إلى None مع إبقاء Build للاتصال المباشر.',
      'ده يضبط مسار تصدير التقرير؛ لا يضمن منع كل نسخ أو استخراج ممكن من شخص مخوّل بقراءة البيانات عبر اتصال Excel.',
    ],
    answer: 'C: Export data=None.',
    correctIndices: [2],
    example:
      'المحلل يعمل Pivot متصل بالموديل، لكن زر Export للـVisual لا يعطيه ملف لقطة منفصلًا.',
    optionsAr: [
      'Certification علامة ثقة في الجودة، وليست ضبط طريقة استخراج البيانات إلى Excel.',
      'Visual interactions تحدد التصفية بين الرسومات، لا Export أو Analyze in Excel.',
      'صحيح؛ يقفل تصدير الرسم ويترك Build للاتصال المباشر.',
      'يسمح بمسار استخراج إضافي، فيخالف كلمة only في المطلوب.',
    ],
    takeaway:
      'Build يفتح الاتصال؛ إعداد Export يقفل نسخة الرسم المصدرة. لا تخلط المسارين.',
    references: [
      build,
      'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-export-data',
    ],
    verdict: 'confirmed',
  },
  'f1-322-321': {
    translation:
      'HR في WorkspaceA. User1 يبني منه تقارير وينشرها في WorkspaceB، دون تعديل HR أو إضافة مستخدمين لمساحات العمل.',
    story:
      'المصدر مكتبة للقراءة والبناء، والوجهة ورشة نشره. اديله مفتاح Build للمكتبة، و Contributor لورشته، من غير Member للمصدر أو الوجهة.',
    reasoning: [
      'Build على HR بالذات يحقق إعادة استخدامه دون Write على الموديل.',
      'Contributor على WorkspaceB يسمح بالنشر ولا يعطي صلاحية إضافة المستخدمين مثل Member أو Admin.',
      'لا يلزم Contributor على WorkspaceA لمجرد إنشاء تقرير جديد على موديل مشترك بامتلاك Build؛ لا تنقل نص شرح نسخ التقارير على أنه شرط عام هنا.',
    ],
    answer: 'HR: Grant Build. WorkspaceB: Contributor.',
    example:
      'تقرير Recruitment الجديد يتخزن في B ويستعلم من HR في A؛ User1 لا يغير جداول HR ولا أعضاء B.',
    optionsAr: [
      'Contributor على A يمنح تحرير المصدر ومحتوى إضافيًا؛ أوسع من اللازم.',
      'صحيح؛ Build على HR يعطي استخدامه لإنشاء تقرير.',
      'Read وحده لا يعطي إنشاء تقارير جديدة على الموديل.',
      'Reshare أو share ليس حق البناء المطلوب، ويزيد إمكانات غير مطلوبة.',
      'Admin يزيد صلاحيات إدارة الأعضاء والمحتوى؛ يخالف المنع.',
      'Contributor على A هو المكان الخطأ للنشر المطلوب في B، ويعطي تحرير المصدر.',
      'صحيح؛ Contributor على B ينشر المحتوى دون حق إضافة أعضاء.',
      'Member على B يستطيع إضافة أعضاء أو أصحاب صلاحيات أدنى؛ أوسع من المطلوب.',
    ],
    takeaway: 'حقوق المصدر Build؛ حقوق وجهة النشر Contributor.',
    references: [build, roles],
    verdict: 'confirmed',
  },
  'f1-323-322': {
    translation:
      'عندك Build على BI Finance لكن لا تملك دورًا في مساحة BI Data. اختار طريقتين مستقلتين لإنشاء تقرير على الموديل.',
    story:
      'مش لازم تدخل ورشة المالية كعضو عشان تستخدم الموديل اللي منحوه لك. تقدر تبدأ التقرير من الخدمة أو من Desktop وتختار الموديل المنشور.',
    reasoning: [
      'إنشاء تقرير من Published semantic model في Service يستهلك Build الممنوح.',
      'Desktop يتصل بـPower BI semantic model المشترك؛ الحفظ أو النشر يحتاج مكانًا تملك حق الإنشاء فيه.',
    ],
    answer: 'C و D.',
    correctIndices: [2, 3],
    example:
      'من Service ابدأ تقريرًا على BI Finance واحفظه في My Workspace، أو اعمل thin report في Desktop بنفس الموديل.',
    optionsAr: [
      'Dataflow أداة إعداد بيانات، وليس طريقة DirectQuery لإنشاء تقرير على Published dataset بهذه الصياغة.',
      'Dataverse مصدر مختلف؛ لا يقود إلى BI Finance.',
      'صحيح؛ اختيار الموديل المنشور مع Build يكفي لبدء تقرير في الخدمة.',
      'صحيح؛ الاتصال بالموديل المشترك من Desktop يعيد استخدام مقاييسه وعلاقاته.',
    ],
    takeaway: 'Build على الموديل لا يشترط عضوية Workspace المصدر.',
    references: [build],
    verdict: 'confirmed',
  },
  'f1-324-323': {
    translation:
      'Gateway شغال، المصدر معرف، وصلاحياتك صحيحة؛ لكن لا يظهر للـScheduled refresh. ما السبب الأرجح؟',
    story:
      'البوابة بتقول عندي SQL01، والموديل بيقول عايز 10.0.0.12. حتى لو هما نفس الجهاز فعليًا، تعريف الاتصال قد لا يتطابق.',
    reasoning: [
      'طابق قيم Server و Database بين PBIX وتعريف مصدر البوابة.',
      'الاسم الظاهر للاتصال مجرد Display name؛ المهم تفاصيل الخادم والقاعدة، فلا تفهم خيار السؤال كاشتراط تطابق اسم العرض.',
    ],
    answer: 'B: عدم تطابق اسم الخادم/تفاصيل المصدر.',
    correctIndices: [1],
    example:
      'PBIX يستخدم SQL01\\Finance والبوابة تستخدم SQL01 فقط؛ صحح الاتصال للتعريف نفسه ثم أعد الربط.',
    optionsAr: [
      'SQL Server مدعوم بالبوابة؛ ليس هذا تفسير السيناريو.',
      'صحيح بالمعنى التقني: تفاصيل الخادم والقاعدة في تعريف البوابة لا تطابق الموديل.',
      'الاعتماد الخاطئ يسبب فشل الاتصال أو التحديث غالبًا، لا يفسر أفضل من عدم المطابقة غياب الربط.',
      'SSO إعداد هوية مدعوم بشروط؛ وجوده ليس سببًا عامًا لاختفاء البوابة.',
    ],
    takeaway:
      'Gateway online لا يكفي؛ لازم تطابق Server و Database وصلاحية الاستخدام.',
    references: [gateway],
    verdict: 'confirmed',
  },
  'f1-325-324': {
    translation:
      'تقرير يعتمد على SSAS Tabular داخل الشبكة. عايز أحدث بياناته في Power BI Service.',
    story:
      'الموديل التحليلي جاهز في الشركة. التقرير السحابي محتاج طريق يدخل عليه، مش نسخة ثانية نعملها كل صباح.',
    reasoning: [
      'On-premises gateway يتيح Live connection للموديل الداخلي مع إعداد الهوية والخرائط اللازمة.',
      'Scheduled refresh موجود أيضًا للمصادر الداخلية في سيناريوهات Import؛ الخطأ في المصدر قوله إنه مخصص للسحابة فقط. هنا Live هو سياق أحدث بيانات الموديل.',
    ],
    answer: 'C: On-premises data gateway.',
    correctIndices: [2],
    example:
      'تقرير Service يستعلم عن رصيد الحساب من SSAS عبر البوابة؛ لو SSAS لم يُعالج بعد فلن تصنع البوابة تحديثًا من عدم.',
    optionsAr: [
      'لا يحل الوصول الشبكي، ولا يحدّث نسخة Live مستوردة لأنها ليست موجودة بهذا الشكل.',
      'OData لا يوفر مسار SSAS Tabular المطلوب هنا.',
      'صحيح؛ الجسر للموديل الداخلي مع Live والهوية الصحيحة.',
      'Subscription يرسل التقرير ولا يوصل السحابة بمصدر SSAS.',
    ],
    takeaway:
      'Gateway طريق الاتصال؛ حداثة البيانات الأصلية مسؤولية معالجة SSAS أيضًا.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/connect-data/service-gateway-enterprise-manage-ssas',
    ],
    verdict: 'confirmed',
  },
  'f1-326-325': {
    translation:
      'شاشة صلاحيات Semantic model: أكمل قدرة Finance وقدرة Corp بناءً على Build و Reshare المعروضين.',
    story:
      'Finance تستخدم الموديل للتحليل. Corp ليست مالكة لكل الجداول؛ عندها حق إعادة المشاركة والبناء، فتقدر تمرر Build في مشاركة مدعومة.',
    reasoning: [
      'Build يسمح لـFinance باستخدام Analyze in Excel، وليس حذف الموديل.',
      'Corp تجمع Reshare و Build؛ الخيار المقصود تمرير Build للمستلمين. قدرة منح القراءة موجودة ضمن المشاركة أيضًا، لذلك لا نزعم أن الخيار الآخر مستحيل مطلقًا.',
    ],
    answer: 'Use Analyze in Excel with؛ Grant the Build permission for.',
    example:
      'Finance تنشئ Pivot متصلًا. Corp تشارك تقريرًا وتسمح للمستلم بإنشاء تقرير آخر على الموديل.',
    optionsAr: [
      'Sensitivity labels تحتاج متطلبات وصلاحيات تصنيف؛ Build وحده لا يثبتها.',
      'صحيح؛ اتصال Excel التحليلي من حقوق Build.',
      'Delete يحتاج صلاحية تعديل/إدارة غير مبينة للمجموعة.',
      'الإجابة المستهدفة؛ Build مع Reshare يتيح تمرير Build في المشاركة.',
      'قد يحدث منح القراءة ضمن المشاركة؛ الصياغة ليست فصلًا حصريًا بين قدرات Corp، فالمفتاح يقيس Build تحديدًا.',
      'Remove a table تعديل بنيوي، لا تمنحه Build أو Reshare.',
    ],
    takeaway:
      'لا تساوي بين Build و Write، ولا تجعل اختيارات الصلاحيات متنافية بلا دليل.',
    references: [build],
    verdict: 'conditional',
  },
  'f1-327-326': {
    translation:
      'Model1 لازم يحدث أول يوم في كل شهر لإدخال مبيعات الشهر السابق. تختار إيه للجدولة؟',
    story:
      'عايز رزنامة تقول يوم 1، مش كل يوم، ومش قاعدة تقول احتفظ بآخر 3 سنين. دي مشكلة تشغيل في موعد شهري.',
    reasoning: [
      'Power Automate: Recurrence شهري يوم 1 ثم Refresh a semantic model/dataset.',
      'حدد المنطقة الزمنية والساعة، وراعِ أن قبول طلب التحديث ليس اكتماله؛ راقب فشل أو تأخر العملية.',
      'Incremental refresh سياسة تقسيم وتحميل، لا مجدول يوم 1 بحد ذاته.',
    ],
    answer: 'C: Microsoft Power Automate flow.',
    correctIndices: [2],
    example:
      'كل أول شهر الساعة 6 صباحًا بتوقيت القاهرة يبدأ Flow طلب تحديث الموديل بعد وصول ملفات الشهر السابق.',
    optionsAr: [
      'الجدولة التقليدية للتحديث اليومي/الأسبوعي لا تعبر مباشرة عن يوم 1 شهريًا في السيناريو.',
      'Incremental يحدد أي partitions تُعالج، ولا يضبط التشغيل الشهري المطلوب.',
      'صحيح؛ Recurrence شهري ثم إجراء Refresh.',
      'Gateway يوفر الاتصال عند الحاجة، لا تقويم التشغيل.',
    ],
    takeaway:
      'موعد شهري محدد يحتاج Orchestration مثل Power Automate، مش سياسة partitions.',
    references: [
      refresh,
      'https://learn.microsoft.com/en-us/power-automate/run-scheduled-tasks',
    ],
    verdict: 'confirmed',
  },
  'f1-328-327': {
    translation:
      'Litware عايزة مبيعات حسب المنطقة. قبل ربط Sales بالمنطقة، تصلح إيه في مفاتيح العلاقة؟',
    story:
      'رقم المنطقة في جدول مكتوب كنص «12»، وفي الجدول الآخر عدد 12. نفس الشكل للعين، لكن نوعان مختلفان للعلاقة.',
    reasoning: [
      'وحّد نوع Sales[region_id] مع مفتاح المنطقة الصحيح: Whole Number وفق مخطط الحالة.',
      'sales_id معرف فاتورة وليس مفتاح المنطقة، ومقياس المبيعات لا يصلح نوع عمود العلاقة.',
      'تحقق من قابلية تحويل جميع القيم وعدم فقد رموز مهمة قبل تغيير النوع.',
    ],
    answer: 'A: Sales[region_id] إلى Whole Number.',
    correctIndices: [0],
    example:
      'القيم النصية "1" و"2" تتحول إلى 1 و 2 لتطابق جدول Sales_Region؛ قيمة غير رقمية تحتاج علاجًا لا تحويلًا أعمى.',
    optionsAr: [
      'صحيح؛ يطابق نوع مفتاح المنطقة العددي في المخطط.',
      'Decimal لا يطابق التصميم الصحيح لمفتاح منطقة صحيح، وليس هناك كسور مطلوبة.',
      'SUM measure يحسب مبالغ، ولا يصلح أعمدة الربط.',
      'sales_id مفتاح معاملة؛ تغيير نوعه لا يصلح ربط المنطقة.',
    ],
    takeaway: 'العلاقة تربط مفاتيح متوافقة المعنى والنوع، لا مجرد شكل متشابه.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships',
    ],
    verdict: 'confirmed',
  },
  'f1-329-328': {
    translation:
      'Litware تستخدم Azure SQL ومعاها شرط حداثة لا يزيد عن 5 دقائق. اختار وضع الاتصال وبيانات اعتماده.',
    story:
      'تحديث Import مرة كل صباح يخلّي مبيعات الظهر غير موجودة. DirectQuery يسأل القاعدة عند الاستعلام؛ وحساب قاعدة بيانات مشترك يقلل إعداد حساب منفصل لكل قارئ عندما لا يُطلب SSO.',
    reasoning: [
      'DirectQuery أنسب من Import التقليدي لتقليل تأخر البيانات وفق الاختيارات.',
      'Database credential هو الاتصال المقصود؛ Entra لتسجيل دخول المستخدم للخدمة لا يعني تلقائيًا إعداد SSO لقاعدة البيانات.',
      'DirectQuery وحده ليس ضمان SLA خمس دقائق؛ يلزم ضبط تحديث المرئيات والكاش والأداء، و RLS لحماية كل منطقة عند الاعتماد المشترك.',
    ],
    answer: 'C: DirectQuery using a database credential.',
    correctIndices: [2],
    example:
      'فاتورة 10:03 تظهر عند إعادة استعلام الرسم بعد وصولها للقاعدة، لا تنتظر تحديث Import الليلة. الشاشة الثابتة تحتاج أيضًا تحديثًا مناسبًا.',
    optionsAr: [
      'Import مع Microsoft account لا يوفر حداثة 5 دقائق بمجرد اختيار نوع الحساب.',
      'Database credential صحيح للهوية لكن Import التقليدي لا يحقق القيد الزمني من نفسه.',
      'المقصود الصحيح بين البدائل؛ DirectQuery واعتماد مصدر مضبوط، مع استكمال إعداد الحداثة والأمن.',
      'SSO بهويات المستخدمين حل ممكن عند إعداده وصلاحيات القاعدة؛ ليس مفروضًا أو مهيأً بمجرد أن الشركة تستخدم Entra.',
    ],
    takeaway:
      'Storage mode يحدد مسار البيانات، والهوية تحدد من ينفذ الاستعلام؛ اضبط الاثنين.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/connect-data/service-azure-sql-database-with-direct-connect',
      'https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-directquery-about',
    ],
    verdict: 'conditional',
  },
  'f1-330-329': {
    translation:
      'بتتصل بمصدر استخدمته قبل كده ورسالة الخطأ بتقول الباسورد انتهى. تغيّر بيانات الاعتماد فين؟',
    story:
      'العنوان موجود، لكن المفتاح المخزن قديم. مسح الكاش مش هيجدد كلمة سر حساب قاعدة البيانات.',
    reasoning: [
      'افتح Data source settings، اختار المصدر، ثم Edit Permissions لتحديث Credentials.',
      'لازم كلمة السر تكون صحيحة ومجددة عند المصدر؛ Power BI يخزنها ولا يغير سياسة انتهاء الحساب نيابةً عن المصدر.',
    ],
    answer: 'A: Data Source settings → Edit Permissions.',
    correctIndices: [0],
    example:
      'IT جددت باسورد SQLLogin؛ حدّث القيمة المحفوظة ثم جرّب الاتصال، دون إرسال الباسورد داخل ملفات الشرح.',
    optionsAr: [
      'صحيح؛ هنا إدارة الاعتماد المحفوظ للمصدر.',
      'Clear Cache يمسح بيانات مخزنة مؤقتًا، لا يصلح الباسورد المنتهي.',
      'Refresh Preview يعيد الطلب بنفس الاعتماد الفاسد غالبًا.',
      'Manage Roles لتعريف فلاتر RLS داخل الموديل، لا تسجيل الدخول للمصدر.',
    ],
    takeaway: 'خطأ Password expired → راجع Credentials، لا RLS ولا Cache.',
    references: [
      'https://learn.microsoft.com/en-us/power-query/connector-authentication',
    ],
    verdict: 'confirmed',
  },
  'f1-331-330': {
    translation:
      'تحديث Excel يفشل برسالة عمود Cost غير موجود. ما السبب المحتمل؟',
    story:
      'الاستعلام بيقول اجمع عمود Cost، وصاحب Excel سمّاه UnitCost. الملف اتفتح، لكن اسم العمود اللي الخطوة بتدور عليه اختفى.',
    reasoning: [
      'إعادة تسمية أو إزالة Cost تجعل خطوة M التي تشير له تفشل.',
      'افحص أول Applied step يظهر عندها الخطأ وقارن الأعمدة؛ لا تعالج نوع البيانات قبل وجود العمود نفسه.',
    ],
    answer: 'A: Cost was renamed in the source.',
    correctIndices: [0],
    example:
      'Table.TransformColumnTypes يشير إلى Cost بينما Headers أصبحت UnitCost؛ عدل المرجع أو أصلح عقد المصدر.',
    optionsAr: [
      'صحيح؛ يفسر لماذا لا تجد الخطوة العمود بالاسم القديم.',
      'Privacy قد تمنع دمج مصادر، لكنها لا تفسر رسالة عمود واحد غير موجود بهذه الصورة.',
      'فشل التحويل يعطي خطأ قيمة/نوع، لا غياب اسم العمود.',
      'نقل الملف يعطي مشكلة Path/Source عادةً قبل الوصول لأعمدته؛ ليس السبب الأقرب للرسالة.',
    ],
    takeaway:
      'Column not found راجع اسم العمود والخطوة السابقة، قبل تغيير نوعه.',
    references: [
      'https://learn.microsoft.com/en-us/power-query/dealing-with-errors',
    ],
    verdict: 'confirmed',
  },
  'f1-332-331': {
    translation:
      'Group1 ترى RPT1 و RPT2 و DB1 فقط؛ لا RPT3، ولا بناء جديد على SM1، ولا إعادة مشاركة. مطلوب أقل إدارة.',
    story:
      'كل التقارير في ورشة واحدة، لكن المجموعة داخلة كجمهور. نسلم لهم باكدج مختار، ونقفل Build وإعادة المشاركة، بدل Viewer يفتح كل الورشة.',
    reasoning: [
      'انشر App لجمهور Group1 بالمحتوى المحدد فقط.',
      'لا تمنح Build أو Reshare، ولا دور Workspace للمجموعة يوسع الوصول. راجع تقارير Dashboard المرتبطة حتى لا توجد مسارات وصول غير مقصودة.',
      'عدم مشاركة App من داخل تجربة القارئ لا يعني أن منع إعادة مشاركة البيانات مطلق؛ صلاحيات المصدر والجروبات الأخرى تظل مهمة.',
    ],
    answer: 'A: Publish an app with the required audience and permissions.',
    correctIndices: [0],
    example:
      'إضافة RPT4 للـWorkspace لاحقًا لا تجعلها متاحة للجمهور إلا إذا أضفتها وأتحتها في App.',
    optionsAr: [
      'صحيح؛ يختار المحتوى والجمهور ويجمع الإدارة في حزمة واحدة.',
      'Viewer يفتح RPT3 أيضًا، فيفشل شرط إخفائه.',
      'ملفات PBIX في OneDrive تكشف نموذجًا قابلًا للاستخدام خارج تجربة المشاهدة المطلوبة.',
      'المشاركة الفردية قد تضبط النطاق، لكنها أكثر إدارة من App في هذه المجموعة من العناصر.',
    ],
    takeaway:
      'جمهور يستهلك عناصر مختارة دون Build = App مضبوط، لا Workspace Viewer.',
    references: [apps, build],
    verdict: 'confirmed',
  },
  'f1-333-332': {
    translation:
      'موديل يجمع Azure SQL خلف Private endpoint، و Excel في SharePoint Online، و SQL Server داخلي. يحتاج 12 تحديثًا يوميًا. كم مصدر يحتاج Gateway، وأنهي License mode؟',
    story:
      'مش كل حاجة اسمها Azure تبقى مفتوحة للسحابة. قاعدة Azure مقفولة داخل شبكة خاصة، وقاعدة الشركة داخلية، بينما SharePoint Online متاح كخدمة سحابية.',
    reasoning: [
      'مصدران يحتاجان مسار Gateway مناسبًا: Azure SQL الخاص و SQL Server الداخلي؛ Excel السحابي لا يحتاج Gateway عادةً. العدد عدد المصادر لا عدد أجهزة البوابة.',
      'Pro يدعم 8 تحديثات مجدولة يوميًا؛ PPU يدعم 48، فيغطي 12.',
      'PPU هو المقصود للاستهلاك داخل Service من البدائل. Embedded/capacity قد يدعم تكرارًا أعلى في سياقه، فلا نقول إنه عاجز تقنيًا في كل السيناريوهات؛ لم يُطلب تضمين خارجي هنا.',
    ],
    answer: 'Data sources: 2. License mode: Premium Per User (PPU).',
    example:
      'نستخدم Gateway يستطيع الوصول إلى القاعدتين، أو ترتيبات اتصال مناسبة لكل شبكة؛ لا نثبته فقط من أجل ملف SharePoint.',
    optionsAr: [
      '1 غير كافٍ؛ يتجاهل أحد المصدرين المقفلين على شبكات خاصة.',
      'صحيح؛ القاعدتان تحتاجان جسرًا مناسبًا، وليس ملف SharePoint.',
      '3 زائد؛ SharePoint Online لا يحتاج بوابة لمجرد كونه ملف Excel.',
      'Embedded وضع لاستضافة/تضمين مختلف، وليس الاختيار المستهدف لخدمة التقارير هنا؛ لا نستنتج عجزه المطلق عن 12 تحديثًا.',
      'صحيح؛ PPU يتجاوز حد Pro اليومي ويدعم استهلاك Service المطلوب.',
      'Pro حدّه 8 تحديثات مجدولة في اليوم، أقل من 12.',
    ],
    takeaway:
      'Cloud private endpoint قد يحتاج Gateway. عدد التحديثات يحدد الترخيص أيضًا.',
    references: [
      refresh,
      'https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-use-directquery',
      'https://learn.microsoft.com/en-us/data-integration/vnet/overview',
    ],
    verdict: 'conditional',
  },
  'f1-334-333': {
    translation:
      'عايز تطبيق RLS على مستخدمين Viewer. رتب ثلاث خطوات من القائمة.',
    story:
      'ارسم قاعدة الدخول، انقلها للخدمة، ثم اربط الناس بها. لو جعلتهم Member بدل Viewer تكون فتحت لهم طريقًا يتجاوز الفلتر.',
    reasoning: [
      'في Desktop أنشئ الدور وفلتر DAX.',
      'انشر Semantic model ليصل تعريف الدور إلى الخدمة.',
      'عيّن المستخدمين/الجروبات للدور في Service ثم اختبر View as/Test as role. يمكن تحرير نماذج مدعومة بالخدمة أيضًا، لكن قائمة السؤال تقصد المسار المعروض.',
    ],
    answer: 'Create RLS role/DAX → Publish model → Assign users to role.',
    example:
      'دور East يفلتر Region=East؛ بعد النشر نضيف EastGroup ونختبر مستخدم Viewer منه.',
    optionsAr: [
      'صحيح ثانيًا؛ يجب نشر تعريف الدور قبل تعيين أعضائه في الخدمة.',
      'خطأ؛ Member صاحب صلاحية تحرير، ولا تفرض عليه RLS مثل Viewer.',
      'صحيح ثالثًا؛ العضوية تربط الهوية بالقاعدة المنشورة.',
      'صحيح أولًا؛ عرّف الفلتر الذي سيحكم الصفوف.',
    ],
    takeaway: 'عرّف → انشر → عيّن الأعضاء، ولا تمنح صلاحية تتجاوز الأمن.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-rls',
    ],
    verdict: 'confirmed',
  },
  'f1-335-334': {
    translation:
      'عايز مشاركة Report1 مباشرةً مع مجموعة مستخدمين. أنهي نوعين من الجروبات يمكن استخدامهما؟',
    story:
      'نوع الجروب ينفع في مكان وما ينفعش في مكان تاني. Microsoft365 Group ممكن يدخل Workspace أو App، لكن ده لا يجعله مدعومًا في Direct sharing للتقرير.',
    reasoning: [
      'وثائق المشاركة المباشرة تسمح بـSecurity groups و Email-enabled distribution groups، مع متطلبات Exchange/الهوية المذكورة.',
      'تستبعد Microsoft365 Unified groups من Direct sharing واشتراكات الإيميل؛ لا تنقل جدول Workspace groups إلى هذه الميزة.',
      'عند وجود أشخاص خارجيين، استخدم Security group وراجع شروط B2B؛ توزيع البريد وحده ليس تصريح وصول لكل عنوان خارجي.',
    ],
    answer: 'A و B: security group + distribution group. تصحيح للمفتاح A,D.',
    correctIndices: [0, 1],
    example:
      'Finance-Security أو Finance-Distribution الداخلي المدعوم يصلحان للمشاركة؛ Teams team ليس نوع صلاحية بديلًا في نافذة Share.',
    optionsAr: [
      'صحيح؛ Security group مدعوم لتوزيع الوصول المباشر على مجموعة.',
      'صحيح في السيناريو المدعوم؛ يمكن استخدام عنوان Distribution group مع Exchange Online للمشاركة مع أعضائها.',
      'Teams team ليس اختيارًا مباشرًا لهذا النوع من المشاركة؛ كونه مبنيًا على Microsoft365 Group لا يغير القيد.',
      'غير صحيح للمشاركة المباشرة هنا؛ وثائق Microsoft تستبعد Unified Microsoft365 groups، رغم دعمها في مسارات أخرى.',
    ],
    takeaway:
      'حدّد الميزة: Direct sharing ≠ App audience ≠ Workspace role ≠ RLS membership.',
    references: [share],
    verdict: 'confirmed',
  },
  'f1-336-335': {
    translation:
      'مصدر فيه سجلات ضرائب حساسة ضمن مصادر متعددة. اختار Privacy level الذي يعزل تبادل بياناته مع المصادر الأخرى.',
    story:
      'وأنت بتدمج مصدرين، Power Query ممكن يرسل قيمًا من واحد للتاني لتحسين الاستعلام. بيانات الضرائب مش عايزينها تتسرب ضمن هذا التبادل.',
    reasoning: [
      'Private هو مستوى العزل المناسب لمنع تمرير بيانات المصدر إلى مصادر أخرى في تقييمات الدمج.',
      'Privacy level ليس نظام صلاحيات صفوف ولا ضمان إخفاء البيانات عن مؤلف الاستعلام؛ لا يغني عن IAM/RLS. لا تتجاهل Privacy/Fast Combine لأن ذلك يزيل الحماية المقصودة.',
    ],
    answer: 'C: Private.',
    correctIndices: [2],
    example:
      'جدول TaxIDs لا يرسل قائمة أرقام ضريبية إلى خدمة عامة أثناء Query folding لمجرد أن الاستعلام يدمجهما.',
    optionsAr: [
      'None ليس تصنيف عزل صالحًا لتحقيق الحماية المقصودة.',
      'Organizational يسمح بسياق ثقة مؤسسي، أوسع من عزل الضرائب المطلوب.',
      'صحيح؛ يضع المصدر في نطاق الخصوصية الأكثر تقييدًا.',
      'Public يعامل البيانات على أنها متاحة للمشاركة، عكس حساسية الضرائب.',
    ],
    takeaway:
      'Private لحماية تدفق البيانات بين المصادر، وليس بدل صلاحيات الوصول.',
    references: [
      'https://learn.microsoft.com/en-us/power-query/privacy-levels',
    ],
    verdict: 'confirmed',
  },
  'f1-337-336': {
    translation:
      'عايز المستخدم يتأكد أن Model1 اجتاز معايير الشركة. تختار إيه؟',
    story:
      'مش محتاج صورة جميلة للموديل أو كلمة «سري». محتاج ختم مراجعة الجودة الذي تمنحه الجهة المخولة في المؤسسة.',
    reasoning: [
      'Certify يعلن الاعتماد المؤسسي بعد إجراء المراجعة الفعلية.',
      'Sensitivity تحدد مدى حساسية البيانات، و Promotion توصية إبراز؛ لا يساوي أي منهما اعتماد الجودة.',
    ],
    answer: 'C: Certify Model1.',
    correctIndices: [2],
    example:
      'موديل معتمد قد يحمل بيانات عامة، وموديل شديد السرية قد يكون غير معتمد جودةً. البعدان مختلفان.',
    optionsAr: [
      'صورة الموديل توثيق بصري، لا شهادة مراجعة.',
      'Promotion لا يتطلب نفس اعتماد المعايير المؤسسية.',
      'صحيح؛ Certification آلية الاعتماد المقصودة.',
      'Sensitivity label تصنيف حماية، وليس دليل اجتياز اختبارات الجودة.',
    ],
    takeaway:
      'الثقة المؤسسية في الجودة = Certified؛ الحساسية = Sensitivity label.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-endorse-content',
    ],
    verdict: 'confirmed',
  },
  'f1-338-337': {
    translation: 'Power Query لا يجد الملف D:\\Data.txt. تصلح السبب إزاي؟',
    story:
      'الاستعلام معاه عنوان شقة قديم. تغيير شكل الملف أو تركيب Gateway مش هيخلق ملفًا في العنوان المفقود.',
    reasoning: [
      'صحح المسار في Source أو Data source settings إلى مكان الملف المتاح بالفعل، أو أعده للمكان المعتمد حسب تصميم الحل.',
      'تأكد أيضًا من الوصول والصلاحيات؛ لا تنشئ ملفًا فارغًا باسم مشابه لإخفاء الخطأ.',
    ],
    answer: 'B: Change the file path of Data.txt.',
    correctIndices: [1],
    example:
      'الملف انتقل إلى D:\\Inputs\\Data.txt؛ حدث المرجع بدل تعديل الامتداد إلى csv.',
    optionsAr: [
      'OLE DB libraries لا تصلح عنوان ملف نصي غير موجود.',
      'صحيح؛ يعالج مرجع المصدر المفقود عندما تغير مكانه.',
      'تغيير TXT إلى CSV لا يجعل المسار القديم صالحًا.',
      'Gateway للاتصال من الخدمة بالمصادر الداخلية، لا لعلاج عنوان مفقود في Desktop نفسه.',
    ],
    takeaway: 'Could not find file: تحقّق من وجود الملف ومساره وصلاحية الوصول.',
    references: [
      'https://learn.microsoft.com/en-us/power-query/dealing-with-errors',
    ],
    verdict: 'confirmed',
  },
  'f1-339-338': {
    translation:
      'App فيه Report1 لكل المؤسسة و Report2 لجروب Group1 فقط. تضبط إيه؟',
    story:
      'App واحد ممكن يكون له واجهتا جمهور. كل الناس تشوف التقرير العام، والجروب المحدد يشوف التقرير الخاص كمان.',
    reasoning: [
      'أنشئ Audience لـGroup1 وحدد Report2 ضمن محتواه، واجعل الجمهور العام يرى Report1 دون Report2.',
      'راجع خيار Access hidden content؛ إخفاء العنصر من القائمة ليس حماية إذا أبقيت السماح بالوصول للمحتوى المخفي أو منحت وصولًا منفصلًا له.',
    ],
    answer: 'B: Create an audience and assign Group1.',
    correctIndices: [1],
    example:
      'موظف عادي يفتح App فيرى Report1. عضو Group1 يرى Report1 و Report2 من جمهوره المخول.',
    optionsAr: [
      'Viewer للـWorkspace يفتح محتوى المساحة، ويتجاوز انتقاء App.',
      'صحيح؛ Audiences تضبط من يرى أي محتوى داخل نفس App.',
      'إتاحة hidden content قد تسمح بوصول غير مقصود؛ لا تحقق قصر Report2 على Group1.',
      'مشاركة Report1 وحده لا تضبط عزل Report2 داخل App.',
    ],
    takeaway:
      'محتوى مختلف لجماهير مختلفة داخل App = Audiences، مع مراجعة hidden access.',
    references: [apps],
    verdict: 'confirmed',
  },
  'f1-340-339': {
    translation:
      'الإدارة ترى Headcount و Department Expenses فقط بلا Build. المحاسبة ترى Company Expenses فقط وتبني على Expenses. أقل صلاحيات وأقل إدارة؟',
    story:
      'الـWorkspace مخزن فيه 5 عناصر، مش 5 تقارير مستقلة بموديل خاص لكل واحد. نسلم كل قسم حزمة تقاريره، وندي المحاسبة وحدها حق البناء على Expenses.',
    reasoning: [
      'Management: Publish an app لجمهور الإدارة بتقريريه فقط ودون Build أو Reshare.',
      'Accounting: Publish an app لجمهور المحاسبة مع Company Expenses فقط؛ امنح Build على Expenses وحده من إعداد الجمهور/الموديل المناسب.',
      'Workspace Viewer يكشف التقارير الأخرى والحالية والمستقبلية؛ لا يحترم العزل. تقرير Company Expenses و Department Expenses يمكن أن يشتركا في Expenses؛ اسم التقرير لا يفرض موديلًا منفصلًا.',
    ],
    answer:
      'Publish an app للقسمين، مع Audience مختلف و Build على Expenses للمحاسبة فقط.',
    example:
      'نشر تقرير جديد في المخزن لا يكشفه للإدارة تلقائيًا؛ أما مستخدم المحاسبة فيبني تقريره الخاص على Expenses دون قراءة Headcount.',
    optionsAr: [
      'Viewer يكشف كل محتوى Workspace، فيخالف منع التقارير الحالية والمستقبلية غير المطلوبة.',
      'SharePoint embedding لا يمنح وصولًا بذاته ولا يحل توزيع أقل الصلاحيات دون إعدادات مشاركة إضافية.',
      'صحيح للإدارة؛ App بمحتوى مختار ومن غير Build.',
      'Publish to web يجعل المحتوى عامًا؛ غير مقبول للبيانات الداخلية.',
      'Viewer للمساحة يفتح تقارير غير Company Expenses، فلا يصلح للمحاسبة.',
      'التضمين في SharePoint طريقة عرض، لا بديل عن ضبط صلاحيات المحتوى و Build للموديل.',
      'صحيح للمحاسبة؛ App محدد مع Build على Expenses فقط يحقق البناء والعزل.',
      'Publish to web ليس مشاركة داخلية آمنة ولا يمنح Build مناسبًا على الموديل.',
    ],
    takeaway:
      'App للجمهور؛ Build مستقل للموديل المطلوب. Workspace ليس بوابة مشاهدة انتقائية.',
    references: [apps, roles, build],
    verdict: 'confirmed',
  },
};
