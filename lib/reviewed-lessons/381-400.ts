import type { ReviewedLesson } from './types.ts';
export const lessons381: Record<string, ReviewedLesson> = {
  "f2-030-388": {
    "translation": "تقرير ثلاث صفحات، وعايز الفلتر يؤثر على كل الرسومات إلا KPI واحد. اختار خطوتين.",
    "story": "عايز مدير المبيعات يختار فرعًا، فيشوف تفاصيل الفرع في الصفحات كلها، لكن مؤشر الهدف العام يفضل زي ما هو. محتاج فلتر ينتقل بين الصفحات واستثناء محلي للمؤشر.",
    "reasoning": [
      "ضع slicer متزامنًا على الصفحات المطلوبة.",
      "حدد الـ slicer في صفحة KPI، ثم Edit interactions واجعل تأثيره على KPI هو None.",
      "الاستثناء يضبط على الرسم المستقبل بعد تحديد مصدر الاختيار، لا بتحديد KPI أولًا."
    ],
    "answer": "A و D: Sync slicers، وتعديل تفاعل الـ slicer الموجود مع KPI.",
    "example": "اختيار القاهرة يغير جداول الصفحات الثلاث، بينما KPI يظل يعرض مبيعات الشركة كلها.",
    "optionsAr": [
      "صحيح؛ المزامنة تنقل الاختيار بين الصفحات.",
      "يعدل تأثير KPI على غيره، وليس تأثير السلايسر عليه.",
      "فلتر الصفحة لا يغطي الصفحات الأخرى ولا يسمح باستثناء KPI بهذه الطريقة.",
      "صحيح؛ اختر None فوق KPI بعد تحديد السلايسر.",
      "فلتر التقرير سيؤثر على KPI أيضًا؛ Edit interactions لا يعطل report filters."
    ],
    "takeaway": "فلتر مشترك مع استثناء رسم = Sync slicers + Edit interactions.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers"
    ]
  },
  "f2-034-389": {
    "translation": "عندك موظفون في عشر ولايات، والشركة جمعتها في East و West و North. الموديل ليس به Region؛ كيف تعرض المناطق بسرعة؟",
    "story": "الأسماء موجودة، لكن التجميع الإداري جديد. بدل بناء مصدر جديد، جمع أسماء الولايات تحت اسم المنطقة داخل الموديل.",
    "reasoning": [
      "حدد State واعمل New group.",
      "استخدم List لأن الولايات فئات نصية، وسمّ كل مجموعة بمنطقتها.",
      "ضع الحقل المجمع في الرسم بدل State."
    ],
    "answer": "B: Group على State من نوع List.",
    "example": "New York و New Jersey يدخلان مجموعة East، فيظهر مجموع موظفيهما كمنطقة واحدة.",
    "optionsAr": [
      "تجميع الموظفين عدديًا لا ينشئ تعيين ولاية لمنطقة.",
      "صحيح؛ List يجمع فئات محددة بأسماء تختارها.",
      "Bin يقسم قيمًا رقمية أو تواريخ إلى فترات، لا خرائط إدارية نصية.",
      "تلخيص كل ولاية يبقي الولايات منفصلة دون Region."
    ],
    "takeaway": "فئات بأسماء تختارها = List grouping؛ فترات رقمية = Bins.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-grouping-and-binning"
    ]
  },
  "f2-038-390": {
    "translation": "Sales يحتوي رواتب ويحسب مكافآت، Operations قراءات حساسات، و Finance معاملات وقرارات ميزانية. قيّم الحاجة لتصنيف الحساسية والاعتماد.",
    "story": "فيه ختم يقول البيانات حساسة، وختم تاني يقول الأرقام اتراجعت. دول وظيفتان مختلفتان؛ الرواتب حساسة، وأرقام الميزانية والمكافآت محتاجة ثقة قبل القرار.",
    "reasoning": [
      "Sales تحتوي رواتب شخصية، فيناسبها sensitivity label حسب سياسة المؤسسة.",
      "Operations لا يظهر أنها تستخدم لقرارات مالية أوتحتاج تصنيفًا حساسًا من الوصف.",
      "Finance تحتاج مراجعة واعتمادًا للقرارات المالية، لكن حساسية كل بياناتها لم تُحدد في سياسة التصنيف المعروضة.",
      "منع تصدير PII يحتاج سياسة إنفاذ فعلية؛ label وحدها لا توقف كل مسارات التصدير."
    ],
    "answer": "لا يوجد حل فريد مكتمل من المعطيات. المصدر يقصد Yes/No/Yes، لكن Finance لا يُذكر لها تصنيف إلزامي، والتصنيف وحده لا يمنع تصدير PII؛ لذلك لا نعتمد المفتاح كحل أمني كامل.",
    "example": "ملف ميزانية عليه Confidential قد يظل قابلًا للتصدير للمصرح له؛ Certification تؤكد المراجعة ولا تمنع تنزيله.",
    "optionsAr": [
      "Yes من ناحية الحاجة لتصنيف بيانات الرواتب؛ لا يعني أن مجرد التصنيف ينفذ منع التصدير المطلوب.",
      "No وفق الوصف؛ ليس هناك ما يفرض اعتمادًا ماليًا وحساسية على قراءات الحساسات.",
      "المصدر يقصد Yes، لكن الاعتماد مطلوب بينما حساسية Finance ليست مثبتة؛ العبارة تجمع شرطين لا يمكن حسمهما معًا من المعطيات."
    ],
    "takeaway": "Sensitivity للحساسية، Certification للثقة، ومنع التصدير سياسة مستقلة.",
    "references": [
      "https://learn.microsoft.com/en-us/fabric/enterprise/powerbi/service-security-sensitivity-label-overview",
      "https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-endorsement-overview"
    ],
    "verdict": "incomplete"
  },
  "f2-042-392": {
    "translation": "تقرير لحرارة ثلاجة IoT، وعايز إشعارًا إذا تجاوزت الحرارة أربع درجات. تعمل إيه؟",
    "story": "مش عايز بريدًا كل صباح حتى لو الثلاجة سليمة؛ عايز إنذارًا عند تخطي حد محدد. إنذار Power BI التقليدي يشتغل على dashboard tile مناسب.",
    "reasoning": [
      "اعرض الحرارة الحالية في Card.",
      "ثبّت الكارد على dashboard، ثم أنشئ alert أكبر من 4.",
      "التنبيه يتقييم عند تحديث بيانات البلاطة؛ لا يفحص الحساس باستمرار من تلقاء نفسه."
    ],
    "answer": "C: Pin a card visual ثم alert على البلاطة.",
    "example": "الحرارة المحدثة أصبحت 5 بدل 3، فيتحقق شرط >4 ويرسل تنبيهًا وفق إعداداته.",
    "optionsAr": [
      "البلاطة لصفحة كاملة ليست نوع tile مدعومًا لهذا التنبيه.",
      "KPI داخل التقرير ليس dashboard tile؛ يلزم تثبيته أولًا.",
      "صحيح؛ Card tile يدعم data alerts.",
      "Subscription إرسال دوري وليس شرط حرارة >4."
    ],
    "takeaway": "حد رقمي يتخطى قيمة = alert على Card/KPI/Gauge tile.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/create-reports/service-set-data-alerts"
    ]
  },
  "f2-044-393": {
    "translation": "HR يريد رسمًا يظهر عدد الموظفين تاريخيًا ويتنبأ بالستة أشهر التالية. تختار أي visual؟",
    "story": "عندك أعداد شهرية وعايز تمد خط الزمن لتقدير المستقبل. المطلوب forecasting، مش تفسير أسباب ارتفاع العدد.",
    "reasoning": [
      "استخدم Line chart بتواريخ وأعداد تاريخية.",
      "أضف Forecast من Analytics وحدد ستة أشهر.",
      "تأكد من شروط محور الزمن والسلسلة المدعومة؛ التوقع تقدير وليس ضمانًا."
    ],
    "answer": "C: Line chart.",
    "example": "الأعداد 100،104،108 عبر شهور؛ forecast يعرض امتدادًا تقديريًا مع نطاق ثقة.",
    "optionsAr": [
      "Key influencers يفسر عوامل النتيجة، لا يمد السلسلة ستة أشهر.",
      "Ribbon يقارن تغير الترتيب بين فئات.",
      "صحيح؛ يدعم forecast للسلاسل الزمنية المناسبة.",
      "Scatter يربط متغيرين رقميين، وليس رسم التوقع المطلوب."
    ],
    "takeaway": "تاريخ ومستقبل زمني = Line chart + Forecast.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane"
    ]
  },
  "f2-048-394": {
    "translation": "من لقطة Power BI القديمة، حدد اختصار تصنيف البيانات واسم الموديل الذي تستخدمه الداشبورد.",
    "story": "الصورة فيها أربعة أسماء لأربع حاجات مختلفة. Insurance Data هو المخزن، Customers هو اسم الداشبورد، Sale شارة تصنيف، و Insurance ظاهر فوق اقتراحات Q&A كمصدر البيانات.",
    "reasoning": [
      "اقرأ مكان الاسم في الواجهة، لا تختار الاسم الأقرب للمجال.",
      "شارة Sale بجوار العنوان هي shorthand للتصنيف القديم.",
      "عنوان INSURANCE فوق اقتراحات Q&A يحدد dataset.",
      "هذا نظام data classification قديم؛ التصنيف الحالي يعتمد sensitivity labels."
    ],
    "answer": "الأول Sale، والثاني Insurance.",
    "example": "زي فولدر اسمه Insurance Data جواه داشبورد Customers مبني على موديل Insurance؛ أسماء العناصر مش لازم تتطابق.",
    "optionsAr": [
      "Customers اسم الداشبورد، وليس شارة التصنيف.",
      "Insurance اسم dataset، وليس الشارة.",
      "Insurance Data اسم workspace.",
      "صحيح للأول؛ Sale هو النص الظاهر في الشارة.",
      "Customers اسم العرض، لا الموديل.",
      "صحيح للثاني؛ Q&A يوضح INSURANCE كمصدر.",
      "اسم workspace لا يحدد dataset المستخدم.",
      "Sale تصنيف قديم وليس dataset."
    ],
    "takeaway": "اقرأ موقع الاسم: workspace غير dashboard غير dataset غير label.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/consumer/end-user-q-and-a",
      "https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-dashboards"
    ],
    "verdict": "conditional"
  },
  "f2-050-395": {
    "translation": "Sales مرتبط بـ Employee، ولا يوجد طلب تقارير على employee_id أو employee_photo. كيف تحسن الموديل لكل منهما؟",
    "story": "مفتاح الموظف زي رقم البطاقة: المستخدم مش محتاج يشوفه، لكن العلاقة محتاجاه. صورة الموظف بالعكس لا تدخل علاقة ولا تقرير، فوجودها حمل بلا فائدة.",
    "reasoning": [
      "احتفظ بمفتاح employee_id حتى تبقى العلاقة صحيحة.",
      "اخفه من قائمة حقول التأليف.",
      "احذف employee_photo من الاستيراد لتوفير مساحة؛ الإخفاء وحده لا يوفر التخزين."
    ],
    "answer": "Employee_id: Hide. Employee_photo: Delete.",
    "example": "ربط 200 عملية بموظفها يحتاج الرقم، أما صورة كل موظف فلا تضيف شيئًا لتحليل المبيعات المطلوب.",
    "optionsAr": [
      "تغيير نوع المفتاح ليس طلبًا هنا؛ هو Integer مناسب أصلًا.",
      "حذف المفتاح يكسر العلاقة.",
      "صحيح؛ الإخفاء يقلل الزحام دون حذف وظيفة الربط.",
      "الفرز لا يحل استخدام المفتاح أو تعقيد الحقول.",
      "تغيير نوع الصورة لا يلغي البيانات غير المطلوبة.",
      "صحيح؛ الحذف يحقق تقليل الحجم.",
      "الصورة المخفية ما زالت مخزنة ويمكن الوصول إليها بالصلاحيات المناسبة.",
      "الفرز لا يوفر مساحة الصور."
    ],
    "takeaway": "مفتاح لازم للربط؟ اخفيه. عمود لا حاجة له؟ احذفه.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction"
    ]
  },
  "f2-054-396": {
    "translation": "عايز جدولًا محسوبًا من Date يحتوي تركيبات فريدة من السنة والربع والشهر التقويمي. أي دالة؟",
    "story": "Date فيه صف لكل يوم، لكن المطلوب صف لكل شهر داخل سنته وربعه. يعني نجمع حسب الأعمدة دي ونرجع المجموعات، مش نضيف عمودًا على الأيام كلها.",
    "reasoning": [
      "حدد grain المطلوب: Year + Quarter + Month.",
      "SUMMARIZE يرجع صفًا لكل تركيبة group-by موجودة.",
      "اسم Calendar Month في الطلب يقابله عمود الشهر الموجود فعليًا في النموذج."
    ],
    "answer": "C: SUMMARIZE.",
    "example": "31 يومًا في يناير 2026 يصبحوا صفًا واحدًا: 2026 / Q1 / January.",
    "optionsAr": [
      "DATATABLE يكتب بيانات ثابتة يدويًا، لا يستخرج مجموعات المصدر تلقائيًا.",
      "ADDCOLUMNS يضيف أعمدة إلى صفوف جدول موجود ولا يزيل تكرار المجموعات وحده.",
      "صحيح؛ يجمع حسب الأعمدة المحددة.",
      "CALCULATE يرجع قيمة scalar بعد تعديل الفلاتر، وليس جدول المجموعات المطلوب."
    ],
    "takeaway": "صف لكل تركيبة أعمدة = SUMMARIZE مع أعمدة التجميع.",
    "references": [
      "https://learn.microsoft.com/en-us/dax/summarize-function-dax"
    ]
  },
  "f2-059-397": {
    "translation": "عايز RLS يحدد الصفوف حسب المنطقة. رتب أربع خطوات من الاستيراد إلى صلاحيات المستخدمين.",
    "story": "الأول تبني البيانات والقواعد عندك، وبعد ما ترفع الموديل تعيّن مين يدخل كل دور. نشر التقرير لا يختار أعضاء الأدوار تلقائيًا.",
    "reasoning": [
      "Import في Desktop.",
      "إنشاء Role definition مع مرشح المنطقة.",
      "Publish إلى الخدمة.",
      "إضافة المستخدمين أو مجموعاتهم للدور من Security في الخدمة."
    ],
    "answer": "Import data → Create role definition → Publish → Assign users to role.",
    "example": "دور East يفلتر Region=\"East\"؛ بعد النشر تضيف فريق الشرق للدور وتختبر View as.",
    "optionsAr": [
      "خطوة ثالثة؛ يجب أن يكون الموديل والأدوار جاهزين أولًا.",
      "خطوة أولى؛ لا دور صفوف بدون بيانات.",
      "فلتر التقرير ليس بديلًا أمنيًا عن RLS.",
      "خطوة ثانية؛ القاعدة تتحدد قبل تعيين الأعضاء في الخدمة.",
      "خطوة رابعة؛ العضوية تتم بعد النشر."
    ],
    "takeaway": "تعريف الدور في Desktop، وتعيين أعضائه بعد النشر في Service.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-rls"
    ]
  },
  "f2-061-398": {
    "translation": "مصدر به Country و City، وعايز Country dimension يحتوي دولًا فريدة فقط. اختار عمليتين.",
    "story": "مصر موجودة مرة مع القاهرة ومرة مع الإسكندرية. الصفان مختلفان كمدن، لكن بُعد الدولة المطلوب محتاج مصر مرة واحدة.",
    "reasoning": [
      "احذف City لأنه يحدد مستوى أدق من grain الدولة.",
      "Remove duplicates على Country.",
      "لا تحذف البلد ولا تعتمد على إزالة تكرار الصف الكامل مع بقاء المدن."
    ],
    "answer": "A و D: إزالة تكرار Country وحذف City.",
    "example": "Egypt/Cairo و Egypt/Alexandria و France/Paris تصبح Egypt و France فقط.",
    "optionsAr": [
      "صحيح؛ يجعل مفتاح الدولة فريدًا.",
      "تفرد المدن لا يضمن تفرد الدول.",
      "مع بقاء City، الصفوف المختلفة لمدن الدولة لا تعتبر مكررة.",
      "صحيح؛ الناتج المطلوب دولة فقط.",
      "يحذف العمود الذي ستبني عليه البعد."
    ],
    "takeaway": "قبل إزالة التكرار حدد: الصف الواحد في البعد يمثل إيه؟",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema",
      "https://learn.microsoft.com/en-us/power-query/working-with-duplicates"
    ]
  },
  "f2-071-400": {
    "translation": "أربع صفحات بها Country slicer. عايز اختيار صفحة 1 ينتقل إلى 2 و 3 لكن 4 تفضل مستقلة.",
    "story": "ثلاث صفحات رحلة تحليل واحدة، والرابعة لها اختيار منفصل. الحل هو تحديد بالضبط مين مشترك في نفس مجموعة السلايسر.",
    "reasoning": [
      "افتح Sync slicers للسلايسر.",
      "فعّل Sync للصفحات 1 و 2 و 3 فقط.",
      "اترك صفحة 4 خارج المزامنة؛ Visibility أمر مختلف عن Sync."
    ],
    "answer": "C: Sync Country slicer على الصفحات 1 و 2 و 3.",
    "example": "اختيار Egypt في 1 يظهر في 2 و 3؛ صفحة 4 ممكن تفضل France.",
    "optionsAr": [
      "Report filter سيؤثر على 4 أيضًا.",
      "Page filters مستقلة ولا تنتقل اختياراتها تلقائيًا بين الصفحات.",
      "صحيح؛ يحدد نطاق مشاركة الاختيار.",
      "نقل السلايسر لا يزامن الصفحات وحده."
    ],
    "takeaway": "المزامنة اختيار صفحات، مش شرط كل التقرير.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers"
    ]
  },
  "f2-076-401": {
    "translation": "أرقام Phone أغلبها nnn-nnn-nnnn، وبعضها به كود بلد ومسافات. أكمل M لتوحيدها.",
    "story": "خد آخر 12 حرفًا؛ دول الرقم المحلي نفسه في العينة. بعدين بدّل المسافة بشرطة حتى الرقم المختلف يدخل نفس الشكل.",
    "reasoning": [
      "Text.End([Phone],12) يحذف البادئة الاختيارية من اليسار.",
      "Text.Replace(...,\" \",\"-\") يوحد الفاصل.",
      "الحل مبني على صيغة العينة؛ ليس تنظيفًا عالميًا لكل أرقام البلدان."
    ],
    "answer": "الأول Replace، والثاني End.",
    "example": "1 (11) 500 555-0122 → 500 555-0122 → 500-555-0122.",
    "optionsAr": [
      "Insert يضيف نصًا في موضع، لا يستبدل المسافات.",
      "Remove يحذف حروفًا، ولا يضع الشرطات المطلوبة.",
      "صحيح؛ Replace يبدل المسافة بشرطة.",
      "ReplaceRange يحتاج موضعًا وطولًا وليس الوسائط الموجودة.",
      "At يرجع حرفًا واحدًا من موضع محدد.",
      "صحيح؛ End يأخذ آخر 12 حرفًا.",
      "Middle يحتاج موضع البداية ولا يطابق الصيغة الحالية.",
      "Range يأخذ جزءًا بموقع، وليس آخرعدد حروف بهذه الوسائط."
    ],
    "takeaway": "End لاختيار نهاية النص؛ Replace لتبديل فاصل.",
    "references": [
      "https://learn.microsoft.com/en-us/powerquery-m/text-end",
      "https://learn.microsoft.com/en-us/powerquery-m/text-replace"
    ]
  },
  "f2-081-402": {
    "translation": "Sales له Due و Order و Delivery dates. هل USERELATIONSHIP على علاقات Date غير النشطة يكفي لتحليل الأدوار الثلاثة باستقلال في نفس الوقت؟",
    "story": "سلايسر تاريخ واحد لا يقدر يعني يناير للطلب وفبراير للتسليم في نفس اللحظة. تبديل العلاقة داخل measure يغيّر طريق الحساب، لكنه لا ينشئ اختيار تاريخ مستقلًا جديدًا.",
    "reasoning": [
      "USERELATIONSHIP يفعّل مسارًا داخل حساب معين.",
      "للتصفية والتجميع المستقل المتزامن تحتاج جداول Date بأدوار منفصلة وعلاقات نشطة.",
      "تميّز بين مقارنة measures بنفس الفترة وبين اختيار فترتين مستقلتين."
    ],
    "answer": "No.",
    "example": "طلبات يناير التي وصلت في فبراير تحتاج Order Date=January و Delivery Date=February كفلترين مستقلين.",
    "optionsAr": [
      "لا؛ يخلط تبديل مسار measure مع دعم أدوار تاريخ مستقلة متزامنة.",
      "صحيح؛ أنشئ role-playing date tables لتلبية الشرط."
    ],
    "takeaway": "تاريخان باختيارين مستقلين = جدول لكل دور.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive"
    ]
  },
  "f2-083-403": {
    "translation": "Products و Categories من CSV. عايز جدول Product واحد يضيف اسم ووصف الفئة، ولا يظهر Categories كجدول مستقل.",
    "story": "كل منتج معاه CategoryID، واسم الفئة موجود في قائمة تانية. هتوصل القائمتين بالرقم وتوسع بيانات الفئة، مع إبقاء استعلامها مساعدًا في الخلفية.",
    "reasoning": [
      "Merge على CategoryID ثم Expand للاسم والوصف.",
      "Disable load لاستعلام Categories؛ استعلام Product ما زال يعتمد عليه.",
      "حذف الاستعلام يكسر الاعتماد، وإلغاء refresh ليس هو منع تحميل جدول."
    ],
    "answer": "Merge؛ Disable the query load.",
    "example": "منتج CategoryID=2 يأخذ CategoryName=Beverages من صف الفئة 2.",
    "optionsAr": [
      "Append يضيف صفوف المنتجات والفئات تحت بعض بدل إضافة خصائص الفئة.",
      "صحيح؛ Merge يطابق المفتاح ويضيف الأعمدة.",
      "Transpose يبدل صفوف وأعمدة بلا ربط مفاتيح.",
      "حذف Categories يزيل الاستعلام الذي يستخدمه الدمج.",
      "صحيح؛ يمنع الجدول المستقل دون إلغاء الاعتماد.",
      "إلغاء refresh ليس الحل لجدول لا تريد تحميله."
    ],
    "takeaway": "استعلام مساعد لازم للتحويل لكن مش للموديل = Disable load.",
    "references": [
      "https://learn.microsoft.com/en-us/power-query/merge-queries-overview",
      "https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-include-in-report-refresh"
    ]
  },
  "f2-088-404": {
    "translation": "أكثر من مليون صف فيها DateTime، والمطلوب تقليل حجم الموديل. أي تغيير مناسب دون افتراض فقد الدقة؟",
    "story": "اللحظة الكاملة ممكن تكون مختلفة في كل عملية، فيكبر قاموس القيم. فصل اليوم عن الساعة يسمح بتكرار كل جزء وضغطه أفضل، بدل تخزين مليون تركيبة مختلفة.",
    "reasoning": [
      "افصل Date و Time إلى عمودين واحذف DateTime الأصلي إذا لم يعد مطلوبًا.",
      "الحل المعتاد يقلل cardinality لكل عمود، لكنه يحتاج قياسًا فعليًا.",
      "تقريب الساعة يفقد تفاصيل دقائق وثوانٍ لم يسمح السؤال بإلغائها."
    ],
    "answer": "D: فصل التاريخ والوقت.",
    "example": "ألف عملية في يوم واحد لها ألف لحظة؛ عمود Date يحتوي قيمة واحدة، و Time يعاد استخدام قيمه عبر الأيام.",
    "optionsAr": [
      "قد يقلل الحجم لكنه يغيّر الدقة؛ ليس بديلًا يحافظ على كل التفاصيل.",
      "Text ليس تحسينًا مضمونًا وقد يزيد حجم القاموس.",
      "Trim تنظيف نصوص وليس علاج cardinality لتاريخ/وقت.",
      "صحيح في النمط المقصود؛ افصل الجزأين ولا تحتفظ بالأصل زائدًا."
    ],
    "takeaway": "قلل عدد القيم المختلفة دون إلغاء معلومة مطلوبة.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction"
    ],
    "verdict": "conditional"
  },
  "f2-090-405": {
    "translation": "عايز خطًا مرجعيًا لوسيط رواتب الموظفين. هل Average line يحقق الهدف؟",
    "story": "موظف راتبه مليون يرفع المتوسط جدًا، بينما الوسيط هو الراتب الذي يقع في المنتصف بعد الترتيب. الاتنين مش نفس المقياس.",
    "reasoning": [
      "المطلوب Median، أي percentile50.",
      "Average line يحسب المتوسط الحسابي وليس الوسيط.",
      "استخدم Median line إن توفرت أو Percentile line=50 في الرسم المدعوم."
    ],
    "answer": "No.",
    "example": "رواتب 10 و 20 و 90: المتوسط 40، لكن الوسيط 20؛ خط 40 لا يجاوب سؤال فوق الوسيط.",
    "optionsAr": [
      "لا؛ المتوسط والوسيط قد يتساويان صدفة فقط.",
      "صحيح؛ Average لا يحقق تعريف Median."
    ],
    "takeaway": "Median =50th percentile، مش Average.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane"
    ]
  },
  "f2-100-407": {
    "translation": "JSON فيه array من documents. عايز attributes أعمدة، والتواريخ تصلح لهرمية تاريخ. رتب ثلاث خطوات.",
    "story": "الملف زي كيس فيه كروت؛ الكيس List، وكل كارت Record له خانات. لازم تحول الكروت لصفوف وتفتح الخانات لأعمدة قبل تحديد أنواعها.",
    "reasoning": [
      "Convert list to table.",
      "Expand records إلى أعمدة attributes.",
      "Set data types، خصوصًا Date للتاريخ؛ الهرمية تعتمد أيضًا على إعداد Auto date/time وشروطه."
    ],
    "answer": "Convert list to table → Expand records → Set data types.",
    "example": "[{name:\"Ali\",date:\"2026-01-01\"}] يصبح صفًا بعمودي name و date ثم date بنوع Date.",
    "optionsAr": [
      "الأعمدة قبل فتح Record ليست attributes المستهدفة؛ الاختيار الأدق Expand records.",
      "صحيح كخطوة ثانية؛ يفرد حقول كل document.",
      "إضافة أعمدة تحويل جديدة ليست لازمة ما دام تغيير النوع متاحًا.",
      "صحيح ثالثًا؛ النص الشبيه بالتاريخ ليس Date حتى يتحول.",
      "صحيح أولًا؛ يجعل عناصر القائمة صفوفًا."
    ],
    "takeaway": "List → Table → Expand Record → Types.",
    "references": [
      "https://learn.microsoft.com/en-us/power-query/connectors/json",
      "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-auto-date-time"
    ]
  },
  "f2-102-408": {
    "translation": "منحت المستخدمين Build ليحللوا semantic model من Excel. السؤال يطلب خطوة تالية، لكن الخيارات كلها إعدادات تقرير أو اعتماد.",
    "story": "Build هي مفتاح باب التحليل. إعداد تصدير رسومات التقرير باب مختلف؛ قفله لا يفتح Analyze in Excel ولا يشكل شرطًا له.",
    "reasoning": [
      "راجع Build وتفعيل Analyze in Excel على مستوى المؤسسة والتراخيص.",
      "لا يلزم تغيير Export data إلى None لتحقيق اتصال Excel المباشر.",
      "الاختيارات لا تتضمن خطوة تالية لازمة حسب نص السؤال؛ لا نعلم الطالب أن C شرط تقني."
    ],
    "answer": "السؤال معيب: C موجودة في المفتاح لكنها ليست مطلوبة. Build مع المتطلبات التنظيمية هي الأساس.",
    "example": "مستخدم Build يقدر يبدأ Analyze in Excel سواء كان تصدير visual مسموحًا أو محظورًا، ما لم تمنعه سياسة أخرى.",
    "optionsAr": [
      "التفاعلات بين الرسومات لا تضبط اتصال Excel بالموديل.",
      "تصدير البيانات من visual ليس نفس live connection إلى semantic model.",
      "يمكن حظر تصدير التقرير بهذا الاختيار، لكنه لا يتيح Analyze in Excel ولا يلزم لتحقيقه.",
      "Certification علامة ثقة وليست صلاحية اتصال."
    ],
    "takeaway": "لا تخلط Analyze in Excel مع Export data من رسم.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-analyze-in-excel",
      "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-export-data"
    ],
    "verdict": "conditional"
  },
  "f2-105-409": {
    "translation": "عايز علاقة Order و Store على Store_ID، وبيانات المفتاح في المصدر مختلفة النوع. ماذا تعدل قبل العلاقة؟",
    "story": "رقم الفرع قد يصل نصًا في جدول ورقمًا في آخر. نفس الشكل على الشاشة لا يكفي؛ نوع المفتاحين يجب أن يكون متوافقًا.",
    "reasoning": [
      "اقرأ نوع Store_ID في الجدولين من المعروض.",
      "استخدم Table.TransformColumnTypes على Store كما يطلب مخطط المصدر.",
      "الاختيار يغير نوع عمود، لا يطبق دالة تحويل صفوف بالكامل."
    ],
    "answer": "C: Table.TransformColumnTypes في Store query.",
    "example": "\"12\" كنص و 12 كعدد يحتاجان نوعًا موحدًا قبل ربط متجر 12 بعملياته؛ راجع الأصفار البادئة قبل التحويل.",
    "optionsAr": [
      "TransformRows لا يعبر عن تغيير نوع العمود المطلوب.",
      "نفس المشكلة؛ تحويل الصفوف ليس الخيار المقصود.",
      "صحيح؛ تعديل نوع Store_ID في Store ليتطابق مع Order.",
      "يغير الجدول الآخر بدل التعديل المحدد في المصدر، وقد يكون أثقل على أكثر من مليون صف."
    ],
    "takeaway": "العلاقة تحتاج مفاتيح متوافقة النوع، مش متشابهة المنظر فقط.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships",
      "https://learn.microsoft.com/en-us/powerquery-m/table-transformcolumntypes"
    ]
  },
  "f2-106-410": {
    "translation": "صفحة بها عرض Sales By Postal Code وعرض Sales By Month، والسلايسر Chain مشترك. كم Bookmark وما الخاصية اللازمة لتبديل العرض؟",
    "story": "عايز زرين: واحد يفتح الخريطة، والتاني يفتح تحليل الشهور. كل زر يحفظ حالة ظهور الرسومات؛ اختيار Chain الحالي لازم يفضل مع المستخدم.",
    "reasoning": [
      "احفظ حالتين مختلفتين للعرض، واحدة لكل view.",
      "فعّل Display لحفظ الإظهار والإخفاء.",
      "عطل Data إذا لا تريد إعادة اختيار السلايسر لقيم قديمة.",
      "المصدر لا يعرض الخريطة الموعودة؛ لا نستنتج أي تنسيق جغرافي غير ظاهر."
    ],
    "answer": "2 bookmarks؛ Display.",
    "example": "المستخدم اختار Chain A ثم ضغط Months؛ تظل Chain A ويختفي map ويظهر monthly chart.",
    "optionsAr": [
      "حالة واحدة لا تمثل وجهتي التبديل المطلوبتين.",
      "صحيح؛ حالة Postal Code وحالة Month.",
      "ثالثة ليست مطلوبة للتبديل بين عرضين.",
      "أربع حالات جهد زائد دون مطلب.",
      "Data يحفظ الفلاتر والاختيارات وقد يعيد ضبط Chain.",
      "صحيح؛ Display يحفظ ظهور الرسومات.",
      "Current page يحفظ الصفحة وليس إظهار رسم وإخفاء آخر على الصفحة نفسها."
    ],
    "takeaway": "تبديل الرسومات مع الحفاظ على الفلاتر = Display bookmarks دون Data.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks"
    ],
    "verdict": "conditional"
  }
};
