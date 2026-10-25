import type { ReviewedLesson } from './types.ts';
const mobile =
  'https://learn.microsoft.com/en-us/power-bi/create-reports/service-create-dashboard-mobile-phone-view';
const scatter =
  'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-scatter';
const interact =
  'https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions';
const theme =
  'https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboard-themes';
const anomaly =
  'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-anomaly-detection';
const influence =
  'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers';
const slicer =
  'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers';
export const lessons221: Record<string, ReviewedLesson> = {
  'f1-221-220': {
    translation:
      'Dashboard فيها كارت Total Sales بقيمة 282,711 دولار، وكارت Total Quantity بقيمة 915 ورسم مبيعات حسب الفئة وخريطة. مطلوب نسخة الموبايل يظهر فيها الكارتان جنب بعض، وباقي البلاطات تحتهما. تعدل أنهي تخطيط وتحرك أنهي بلاطات؟',
    story:
      'نفس لوحة المتابعة هتتفتح على شاشة ضيقة. مش هنصمم تقريرًا جديدًا؛ هنرتب البلاطات الموجودة. الاختلاف الظاهر إن الكارتين اللي كانوا فوق بعض بقوا جنب بعض.',
    reasoning: [
      'الكائن Dashboard؛ مكان التعديل Dashboard mobile layout وليس Report mobile layout.',
      'نسخة الموبايل ترتب بلاطات Dashboard تلقائيًا؛ قارنها بالهدف بدل افتراض البدء من لوحة فارغة.',
      'صغّر وحرك Total Sales و Total Quantity ليظهرا في الصف الأول معًا.',
    ],
    answer:
      'Dashboard mobile layout؛ The Total Sales and Total Quantity tiles.',
    example:
      'بدل كارت المبيعات بعرض الشاشة ثم كارت الكمية في صف تالٍ، خلي عرض كل واحد يسمح باثنين في نفس الصف. الأرقام لم تتغير؛ المساحة هي التي تغيرت.',
    optionsAr: [
      'Dashboard mobile layout صحيح لتخصيص ترتيب بلاطات الهاتف.',
      'Dashboard web layout يغيّر عرض المتصفح العادي وليس الهاتف.',
      'Report mobile layout يخص صفحات التقارير؛ Dashboard كائن مختلف.',
      'الخريطة أسفل الرسومات في الهدف؛ نقلها لا يجعل الكارتين متجاورين.',
      'الكارتان هما الجزء الذي انتقل من ترتيب رأسي إلى أفقي.',
      'تحريك رسم الفئات وحده يترك الكارتين فوق بعض.',
    ],
    takeaway:
      'Dashboard على الموبايل: عدّل تخطيط Dashboard للموبايل، وحدد البلاطات التي تغير موضعها فعلًا.',
    references: [mobile],
    verdict: 'confirmed',
  },
  'f1-222-221': {
    translation:
      'عايز تكتشف شرائح العملاء تلقائيًا بناءً على Bounce Rate، باستخدام المصدر والمنطقة والخصائص الديموغرافية، بأقل مجهود تحليل. تختار أنهي Visual؟',
    story:
      'مش عايز تفتح دولة ثم عمر ثم قناة إعلان لحد ما تلاقي مجموعة معدل خروجها عالي. عايز البرنامج يقترح المجموعات المرتبطة بالمشكلة.',
    reasoning: [
      'ضع المقياس المراد تحليله في Analyze والخصائص المرشحة في Explain by.',
      'Key influencers فيه Top segments لاكتشاف مجموعات تجمع خصائص متعددة.',
      'Decomposition tree أنسب لاستكشاف الفروع تفاعليًا. الاكتشاف الآلي للشرائح هو الفارق هنا، ولا يثبت سببية.',
    ],
    answer: 'D. key influencers.',
    correctIndices: [3],
    example:
      'مجموعة مصدرها إعلان موبايل ومنطقة معينة قد يظهر معدل خروجها 70% مقابل 30% لغيرها. ده اقتراح شريحة للتحقيق، مش حكم بأن المنطقة سببت الخروج.',
    optionsAr: [
      'Decomposition tree يفكك المقياس حسب الفروع، وليس أفضل اختيار لاكتشاف Top segments تلقائيًا.',
      'Funnel يعرض مراحل متتابعة؛ الأبعاد هنا ليست مراحل.',
      'Q&A واجهة أسئلة بلغة طبيعية، لا تحليل مخصص لترتيب الشرائح تلقائيًا.',
      'Key influencers صحيح لتحليل العوامل و Top segments.',
    ],
    takeaway:
      'اكتشاف عوامل وشرائح تلقائيًا = Key influencers؛ استكشاف فروع المقياس = Decomposition tree.',
    references: [influence],
    verdict: 'confirmed',
  },
  'f1-223-222': {
    translation:
      'جدول مبيعات فيه حوالي ألف صف. عايز تميز القيم الشاذة Outliers بصريًا. أنهي رسم أنسب بين الخيارات؟',
    story:
      'عمليات كتير قريبة من بعضها وعملية واحدة بعيدة جدًا. لو كل عملية نقطة، هتشوف البعيدة بسرعة بدل البحث وسط شرائح دائرة.',
    reasoning: [
      'Scatter يعرض الملاحظات على محورين رقميين فيظهر التجمع والنقاط البعيدة.',
      'حدد مستوى النقطة بتفصيل مناسب؛ التجميع قد يخفي الملاحظة الشاذة.',
      'البعد يستحق الفحص، لكنه ليس دليلًا أن القيمة خطأ يستوجب الحذف.',
    ],
    answer: 'B. scatter plot.',
    correctIndices: [1],
    example:
      'طلبات بقيمة 100–300 وربح 10–40 تتجمع؛ طلب قيمته 10,000 وربحه 1,200 يظهر بعيدًا. قد يكون صفقة صحيحة كبيرة.',
    optionsAr: [
      'Area يبرز تطور قيمة على محور مرتب؛ ليس أوضح تمثيل للملاحظات الشاذة هنا.',
      'Scatter يظهر التجمع والنقاط المنعزلة؛ الأنسب للمطلوب.',
      'Pie يقارن أجزاء من إجمالي ويزدحم مع ألف ملاحظة.',
      'Donut أيضًا جزء من كل، لا توزيع النقاط وبعدها عن النمط.',
    ],
    takeaway:
      'Scatter يساعدك تشوف الـoutlier، ثم تحقق منها؛ لا تحذفها لمجرد أنها بعيدة.',
    references: [scatter],
    verdict: 'confirmed',
  },
  'f1-224-223': {
    translation:
      'تقرير ثلاث صفحات، وفي واحدة منها KPI. عايز نفس الاختيار يفلتر كل رسومات التقرير ما عدا KPI. اختار إجراءين يكملوا بعض.',
    story:
      'اختيار القاهرة يغيّر تفاصيل الصفحات كلها، لكن المؤشر العام يفضل كما هو. نحتاج ننقل اختيار السلايسر ونستثني المؤشر من استقبال هذا الاختيار.',
    reasoning: [
      'أضف نفس السلايسر للصفحات واضبط Sync slicers.',
      'في صفحة KPI حدد السلايسر، ثم Edit interactions واضبط None فوق KPI.',
      'None يمنع تأثير السلايسر المعني؛ لا يلغي الفلاتر الأخرى أو يفرض إجماليًا مطلقًا على المقياس.',
    ],
    answer: 'B و C: Sync slicers ثم تعديل تفاعل السلايسر في صفحة KPI.',
    correctIndices: [1, 2],
    example:
      'Country متزامن على الصفحات الثلاث. Egypt يفلتر الرسومات، لكن None فوق KPI يمنع تأثير هذا السلايسر عليه. لو فيه Report filter آخر، يظل ساريًا.',
    optionsAr: [
      'تحديد KPI يضبط ما يصدر منه، وليس ما يستقبله من السلايسر.',
      'مطلوب لنقل اختيار السلايسر بين الصفحات.',
      'صحيح؛ حدد السلايسر ثم امنع تفاعله مع KPI وحده.',
      'Page filter لا يغطي الصفحات الثلاث ولا يستثني KPI تلقائيًا.',
      'Report filter يشمل KPI أيضًا؛ يخالف الاستثناء.',
    ],
    takeaway:
      'فلترة صفحات مع استثناء رسم = Sync slicers ثم None من السلايسر نحو الرسم.',
    references: [interact, slicer],
    verdict: 'confirmed',
  },
  'f1-225-224': {
    translation:
      'الرسم يعرض Revenue عبر Date، ويعلم القيم البعيدة عن المتوقع بعلامات مثلثية. أكمل نوع الرسم والميزة التي أنشأت علامات الخروج عن النطاق.',
    story:
      'الخط يرسم المبيعات يومًا بيوم. ميزة أخرى تقارن كل يوم بالنمط المتوقع وتعلم الأيام غير المعتادة؛ المثلث مش مجرد شكل لكل نقطة على الخط.',
    reasoning: [
      'المعروض خط زمني بدون أعمدة أو تعبئة مساحة.',
      'Anomaly detection تحدد الخروج عن النطاق المتوقع.',
      'Marker عادي يميز النقاط، لكنه لا يقرر أيها شاذة. الشذوذ لا يعني بالضرورة خطأ بيانات.',
    ],
    answer: 'a line؛ anomaly detection.',
    example:
      'يوم قيمته 30 ألف قد يكون شاذًا وسط أيام قيمتها 5 آلاف. الحكم يعتمد على النمط والنطاق المتوقع، وليس مجرد كون الرقم هو الأكبر.',
    optionsAr: [
      'Line صحيح؛ خط Revenue مقابل Date.',
      'Line and clustered column يحتاج أعمدة غير موجودة بالصورة.',
      'Area يتضمن مساحة مملوءة؛ لا تظهر هنا.',
      'Custom visual غير لازم؛ الميزة مدمجة في Line chart.',
      'Trendline يلخص اتجاهًا ولا يعلم نقاط الشذوذ.',
      'Anomaly detection صحيح لتحديد القيم غير المعتادة.',
      'Markers علامات نقاط عادية، لا تحليل للشذوذ.',
    ],
    takeaway:
      'خط زمني مع نقاط غير معتادة حددها البرنامج = Line chart مع Anomaly detection.',
    references: [anomaly],
    verdict: 'confirmed',
  },
  'f1-226-225': {
    translation:
      'جدول Transactions فيه Spend رقمي. عايز رسمًا يحدد أي الحقول ترتبط بأكبر تأثير على الإنفاق. تختار إيه؟',
    story:
      'مش المطلوب إجمالي الفلوس؛ المطلوب مين خصائصه بتظهر مع إنفاق أعلى. نحط Spend في Analyze والخصائص المحتملة في Explain by.',
    reasoning: [
      'Key influencers يقارن العوامل المرتبطة بالمقياس.',
      'المقياس الرقمي يسمح بتحليل ما يرتبط بارتفاعه أو انخفاضه.',
      'النتيجة تتأثر بالعينة والحقول والفلاتر، ولا تثبت أن تغيير عامل وحده سيغيّر الإنفاق.',
    ],
    answer: 'D. key influencers.',
    correctIndices: [3],
    example:
      'قد تجد عملاء Loyalty ينفقون بمتوسط 200 مقابل 120 لغيرهم. ده يوجه التحقيق، لا يثبت أن منح البطاقة سيزيد إنفاق كل عميل 80.',
    optionsAr: [
      'Q&A يجيب عن أسئلة، وليس التحليل المباشر لأهمية الحقول المطلوب.',
      'Smart narrative يكتب ملخصًا بدل ترتيب العوامل.',
      'Decomposition tree يفكك المقياس عبر الفروع؛ أقل ملاءمة من تحليل العوامل الآلي هنا.',
      'Key influencers هو المخصص لمقارنة العوامل المرتبطة بالمقياس.',
    ],
    takeaway:
      'أي حقول ترتبط بأعلى Spend؟ Key influencers، لا مجرد ملخص للمبيعات.',
    references: [influence],
    verdict: 'confirmed',
  },
  'f1-227-226': {
    translation:
      'خط عدد موظفي السنة السابقة بالشهور، وخط متقطع أفقي باسم Year Average Employee Count: 9,315. أكمل طريقة إنشاء المرجع، ومكان إضافة Weeks و Days للدريل داون.',
    story:
      'الخط المتقطع مسطرة نقارن بها الشهر: أعلى من متوسط السنة ولا أقل؟ والأسبوع واليوم مستويات تفصيل للوقت، مش مقاييس جديدة نجمعها.',
    reasoning: [
      'المرجع المسمى Average يناسبه Average reference line.',
      'مستويات Weeks و Days تضاف إلى Axis في تدرج زمني صحيح.',
      'الأسبوع ليس مستوى جاهزًا في Auto date hierarchy الافتراضي؛ أضف حقلًا مناسبًا ورتبه عند الحاجة.',
    ],
    answer: 'an average reference line؛ Axis.',
    example:
      'يناير 9,300 أقل من 9,315، وأكتوبر 9,421 أعلى. النزول للأسبوع يغيّر تفصيل المحور؛ وضع Week في Values يجمع أرقامًا بدل إنشاء المستوى.',
    optionsAr: [
      'Trend line يمثل ميل الاتجاه لا مرجع المتوسط.',
      'Secondary axis يضيف تدريجًا ولا ينشئ متوسطًا.',
      'Average reference line هو التفسير المباشر للمرجع.',
      'مقياسان قد يرسمان خطين، لكن الميزة المباشرة هنا مرجع المتوسط.',
      'Axis صحيح لوضع مستويات الوقت.',
      'Values للقياس الرقمي وليس مستويات الوقت.',
      'Legend يقسم السلاسل ولا يبني تدرج الدريل داون.',
      'Secondary values قياس إضافي وليس مكان Weeks و Days للغرض المطلوب.',
    ],
    takeaway:
      'متوسط أفقي = Average line؛ شهر ثم أسبوع ثم يوم = Axis hierarchy.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane',
    ],
    verdict: 'confirmed',
  },
  'f1-228-227': {
    translation:
      'Dashboard فيها بلاطات مثبتة من تقرير واحد. الصورتان تعرضان نفس المحتوى والترتيب، لكن اللون تحول من فاتح إلى غامق. تغيّر إيه؟',
    story:
      'الموضوع لبس لوحة المتابعة، مش إعادة حساب الداتا. Dashboard له Theme مستقل عن التقرير اللي جت منه البلاطات.',
    reasoning: [
      'عدّل Dashboard theme لتغيير النمط العام للوحة.',
      'الهدف ليس تعديل عناوين البلاطات ولا إنشاء تقرير مختلف.',
      'Report theme يخص التقرير؛ لا تخلط بين تنسيق الكائنين.',
    ],
    answer: 'B. Change the dashboard theme.',
    correctIndices: [1],
    example:
      'الكارت 33M يظل 33M؛ خلفيته أصبحت سوداء ونصه فاتح. Refresh لا يفسر التغيير الشكلي.',
    optionsAr: [
      'Report theme يغيّر التقرير المصدر وليس الإعداد المباشر للوحة.',
      'Dashboard theme صحيح للتغيير العام الظاهر.',
      'Tile details للعناوين والروابط لا Theme شامل.',
      'CSS ليس مسار تخصيص قياسيًا للـDashboard.',
    ],
    takeaway:
      'ألوان لوحة المتابعة = Dashboard theme، حتى لو بلاطاتها كلها من تقرير واحد.',
    references: [theme],
    verdict: 'confirmed',
  },
  'f1-229-228': {
    translation:
      'Anomaly detection مفعّل على Gross sales حسب التاريخ، لكنه لا يجد شذوذًا. عايز تزود احتمال التقاط الانحرافات. تغيّر إيه؟',
    story:
      'كاشف الشذوذ متسامح جدًا. عايز تخليه أشد حساسية، مش تخلي المنطقة المظللة أوضح للعين فقط.',
    reasoning: [
      'ارفع Sensitivity ليصبح الكاشف أكثر استجابة للانحرافات.',
      'Expected range transparency إعداد شكلي وليس قرار الخوارزمية.',
      'الحساسية الأعلى قد تزيد إنذارات لا تستحق إجراء؛ راجع ملاءمتها للعمل.',
    ],
    answer: 'C. Increase the Sensitivity setting.',
    correctIndices: [2],
    example:
      'قفزة صغيرة قد لا تُعلّم عند حساسية أقل، ثم تُعلّم عند حساسية أعلى بحسب النمط. مفيش نسبة ثابتة تصلح لكل السلاسل.',
    optionsAr: [
      'Transparency تغير شفافية النطاق المعروض فقط.',
      'Legend ليس إعداد حساسية وقد يتعارض مع دعم Anomaly detection.',
      'Sensitivity هو المتحكم المقصود بمدى استجابة الكاشف.',
      'Secondary values لا تزيد الحساسية وقد تمنع الميزة على الرسم.',
    ],
    takeaway:
      'عايز الكشف يلتقط انحرافات أكثر؟ زوّد Sensitivity، لا شفافية النطاق.',
    references: [anomaly],
    verdict: 'confirmed',
  },
  'f1-230-229': {
    translation:
      'Dashboard جودة موردين فيها 10 Cards وخريطتان و 5 Bar charts. تخطيط الهاتف مطلوب يعرض Single-value visuals فقط ويقلل التمرير. تعمل إيه؟',
    story:
      'على الموبايل عايزين الأرقام المختصرة بس. الخريطة والأعمدة خارج شرط العرض ده؛ إخفاؤهم من تخطيط الهاتف مش حذف من المصدر.',
    reasoning: [
      'احتفظ بالكروت لأنها تعرض قيمة مفردة.',
      'أزل الخرائط والأعمدة من Mobile layout.',
      'صغّر الكروت مع بقاء القراءة مريحة لتقليل المساحة والتمرير.',
    ],
    answer:
      'A. Decrease the size of the card visuals. Remove the map and bar chart visuals.',
    correctIndices: [0],
    example:
      'بدل 17 بلاطة كبيرة، يظهر 10 كروت فقط؛ كروت أصغر يمكن ترتيب بعضها جنب بعض. محتوى نسخة الويب ليس المطلوب حذفه.',
    optionsAr: [
      'يجمع الشرطين: الكروت فقط وتقليل أحجامها.',
      'يبقي خرائط وأعمدة، فيخالف Single-value only.',
      'يحذف بالضبط النوع المطلوب ويكبّر الأنواع غير المطلوبة.',
      'نقل الأعمدة لأعلى لا يحولها إلى Single-value.',
    ],
    takeaway: 'استبعد الأنواع غير المطلوبة أولًا، ثم قلل الأحجام بشكل مقروء.',
    references: [mobile],
    verdict: 'confirmed',
  },
  'f1-231-230': {
    translation:
      'Data1 فيها 10 ملايين صف، وتغذي Card لعدد السجلات وأعمدة للإجمالي و Scatter للمبلغ والربح حسب المنطقة. عايز توضح أنماط Scatter دون تغيير دقة باقي الرسومات.',
    story:
      'متقصش الداتا من Power Query علشان تريح رسمة واحدة؛ الكارت والإجمالي هيتأثروا. غيّر طريقة تمثيل النقاط داخل Scatter نفسه.',
    reasoning: [
      'High-density sampling يغير تمثيل النقاط الكثيفة في هذا الرسم.',
      'لا يحذف سجلات الموديل ولا يغيّر حساب الرسومات الأخرى.',
      'لا يعني عرض كل نقطة من العشرة ملايين أو ضمان كشف كل حالة نادرة.',
    ],
    answer: 'C. Enable high-density sampling on the scatter plot.',
    correctIndices: [2],
    example:
      'الكارت يظل 10,000,000 والإجمالي يظل كما هو، بينما Scatter يستخدم تمثيلًا أنسب للكثافة. فلترة الجدول لألف صف كانت ستغيّر الاثنين.',
    optionsAr: [
      'Size يضيف بعدًا لحجم النقطة؛ لا يحل تمثيل كثافة النقاط ذاته.',
      'Trend line يلخص اتجاهًا ولا يغيّر خوارزمية تمثيل الكثافة.',
      'High-density sampling هو الإعداد المحلي الأنسب هنا.',
      'فلتر Power Query يحذف بيانات يحتاجها باقي التقرير.',
    ],
    takeaway: 'مشكلة رسم كثيف؟ عدّل تمثيل الرسم، لا تحذف بيانات يحتاجها غيره.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-high-density-scatter-charts',
    ],
    verdict: 'confirmed',
  },
  'f1-232-231': {
    translation:
      'Workspace Inventory فيها موديل وتقرير ولوحة. عايز بلاطة مخزون حسب الموقع، غير موجودة في التقرير، بأقل أثر على التقرير. اختار إجراءين.',
    story:
      'لو حقول الموقع والمخزون موجودة في الموديل، اسأل عنها من Dashboard وثبّت الإجابة. لا تحتاج صفحة تقرير مؤقتة.',
    reasoning: [
      'استخدم Q&A لإنشاء الرسم المطلوب في بيئة السؤال الداعمة للميزة.',
      'راجع نتيجة السؤال ثم Pin إلى Dashboard.',
      'هذا المسار لا ينشئ حقولًا غير موجودة في الموديل؛ يلزم أن يدعم المصدر السؤال.',
    ],
    answer: 'A و C: Ask a question using Q&A؛ ثم Pin the visual.',
    correctIndices: [0, 2],
    example:
      'Inventory by Location ينتج رسمًا يمكن تثبيته. التقرير الأصلي لا يحتاج Visual أو صفحة إضافية.',
    optionsAr: [
      'Q&A ينشئ الرسم من الموديل دون تعديل التقرير.',
      'Hide page لا ينشئ الرسم، وإضافة صفحة ثم إخفاؤها جهد إضافي.',
      'Pin يحول ناتج السؤال إلى بلاطة اللوحة المطلوبة.',
      'Quick insights لا يضمن النتيجة المحددة Inventory by location.',
      'إضافة الرسم للتقرير ممكنة لكنها تعدله خلاف هدف أقل أثر.',
    ],
    takeaway:
      'Visual جديد على Dashboard دون تعديل التقرير: Q&A ثم Pin في البيئة الداعمة.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-tutorial-q-and-a',
    ],
    verdict: 'confirmed',
  },
  'f1-233-232': {
    translation:
      'Pens فيها Item و Unit Price و Quantity Ordered. عايز توضح علاقة السعر بالكمية وتبرز العناصر ذات الأسعار والكميات المتشابهة. تختار رسمًا وميزة.',
    story:
      'كل Item نقطة؛ سعره على محور وكمّيته على الآخر. القريبون في الخاصيتين يظهروا جنب بعض، و Clustering يميز المجموعات.',
    reasoning: [
      'ضع Unit Price و Quantity Ordered على محوري Scatter مع Item لتفصيل النقاط.',
      'Automatically find clusters يجمع النقاط المتشابهة في الإحداثيات.',
      'لو Item يجمع طلبات متعددة فالنقطة تمثل العنصر بالتجميع المختار، لا كل OrderID مستقل؛ لا نخترع مستوى طلب غير موجود.',
    ],
    answer:
      'A scatter plot of Quantity Ordered and Unit Price by item؛ Automatically find clusters.',
    example:
      'قلمان سعرهما 10 و 11 والكمية 100 و 105 قريبان؛ قلم سعره 80 وكمّيته 5 بعيد. التشابه هنا في السعر والكمية معًا.',
    optionsAr: [
      'Column by year يضيف محورًا زمنيًا غير مطلوب ولا يعرض علاقة الرقمين كنقاط.',
      'Line by item يوحي بتتابع بين العناصر لا يحتاجه التحليل.',
      'Scatter by item مناسب لعلاقة متغيرين رقميين.',
      'Automatically find clusters صحيح لتجميع النقاط المتقاربة.',
      'Explain the decrease يفسر انخفاضًا، لا ينشئ المجموعات المطلوبة.',
      'Find where distribution is different يقارن توزيعات ولا ينشئ Clusters الرسم.',
    ],
    takeaway:
      'علاقة رقمين = Scatter؛ مجموعات التشابه = Find clusters. راجع مستوى كل نقطة.',
    references: [scatter],
    verdict: 'conditional',
  },
  'f1-234-233': {
    translation:
      'Page1 و Page2 و Page3 فيها نفس السلايسرات. عايز اختيارات Page1 تنعكس على Page1 و Page3 فقط. تعمل إيه؟',
    story:
      'Page2 عايزينها مستقلة. إخفاء السلايسر منها مش كفاية؛ السلايسر المخفي ممكن يظل مشاركًا في المزامنة.',
    reasoning: [
      'فعّل Sync على Page1 و Page3 فقط.',
      'اترك Page2 خارج مجموعة المزامنة.',
      'Visible يتحكم في الظهور و Sync في تبادل الاختيار. كلمة filters هنا يقصد بها اختيارات السلايسرات، لا كل نوع فلتر آخر.',
    ],
    answer: 'C. Sync the slicers on Page1 and Page3.',
    correctIndices: [2],
    example:
      'اختيار Egypt في الأولى ينعكس في الثالثة، والثانية تحتفظ باختيارها. Report filter مستقل يمكن أن يشمل الجميع رغم ذلك.',
    optionsAr: [
      'Edit interactions يضبط تأثير رسومات الصفحة نفسها لا مزامنة الصفحات.',
      'إخفاء السلايسر لا يخرج الصفحة تلقائيًا من Sync.',
      'مزامنة الصفحتين المطلوبتين فقط تحقق الاختيار المشترك.',
    ],
    takeaway: 'Sync يشارك الاختيار؛ Visible يحدد الظهور فقط.',
    references: [slicer],
    verdict: 'conditional',
  },
  'f1-235-234': {
    translation:
      'تقرير خمس صفحات، الأربع الأولى ظاهرة والخامسة مخفية. مطلوب من Page1 ملاحة لكل الصفحات الظاهرة، بأقل صيانة عند إضافة صفحات. تبدأ بإيه؟',
    story:
      'مش كل صفحة جديدة هنرجع نعمل لها زر ورابط. Page navigator يبني قائمة من صفحات التقرير نفسها.',
    reasoning: [
      'أضف Page navigator إلى الصفحة الأولى؛ هذا المقصود بخيار Page navigation.',
      'اضبط عدم عرض Hidden pages.',
      'الأسماء والترتيب والإضافات تتزامن مع الصفحات بدل إنشاء Bookmark لكل صفحة.',
    ],
    answer: 'B. Add a page navigation button to page1؛ المقصود Page navigator.',
    correctIndices: [1],
    example:
      'إضافة Page6 ظاهرة تضيفها للملاح. Page5 المخفية تظل خارج القائمة مع تعطيل Show hidden pages.',
    optionsAr: [
      'Blank button يحتاج ربطًا يدويًا وتكرارًا لكل وجهة.',
      'Page navigator الصحيح لملاحة تتبع الصفحات.',
      'Bookmarks لكل صفحة تزيد الكائنات والصيانة.',
      'Bookmark navigator يتابع Bookmarks لا كل الصفحات تلقائيًا.',
    ],
    takeaway:
      'ملاحة تتحدث مع الصفحات = Page navigator؛ مع الحالات المحفوظة = Bookmark navigator.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/button-navigators',
    ],
    verdict: 'confirmed',
  },
  'f1-236-235': {
    translation:
      'تقرير حرارة ثلاجة من IoT منشور على الخدمة. عايز إشعارًا لما الحرارة تزيد عن أربع درجات مئوية. تعمل إيه؟',
    story:
      'إيميل دوري فيه التقرير مش إنذار حرارة. نحتاج تنبيهًا شرطيًا على رقم يتحدث، فنثبت Card ثم نحدد Above 4.',
    reasoning: [
      'ثبّت Card للحرارة على Dashboard.',
      'أنشئ Alert على البلاطة بحد أكبر من 4.',
      'الإنذار القياسي للأرقام في البلاطات المدعومة وبعد تجدد البيانات؛ ليس لصفحة Live كاملة ولا بديلًا لنظام أمان الثلاجة.',
    ],
    answer: 'C. Pin a card visual to a dashboard and set an alert on the tile.',
    correctIndices: [2],
    example:
      '3.5 لا تتجاوز الشرط؛ 4.2 تتجاوزه عند تقييم التنبيه. Subscription ترسل عرضًا في وقت محدد بصرف النظر عن هذه العتبة.',
    optionsAr: [
      'التنبيه المقصود على Dashboard tile وليس KPI داخل التقرير مباشرة.',
      'Subscription إرسال مجدول لا شرط Above 4.',
      'Card مثبتة ثم Alert هو المسار الصحيح.',
      'Live page ليست بلاطة Single-value تقبل التنبيه القياسي.',
    ],
    takeaway:
      'تجاوز عتبة رقمية = Alert على بلاطة مدعومة، مش Subscription للتقرير.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/service-set-data-alerts',
    ],
    verdict: 'confirmed',
  },
  'f1-237-236': {
    translation:
      'Dashboard بأعمدة مناطق ومنتجات مطلوب تغييرها للشكل المعروض: خلفية رمادية وأعمدة بترولية مع بقاء المحتوى. تعمل إيه؟',
    story:
      'المطلوب مش Dark الأسود الجاهز؛ ألوان محددة لخلفية اللوحة والبلاطات والرسومات. يبقى Custom theme للـDashboard.',
    reasoning: [
      'التغيير شكل عام للوحة لا حسابات بيانات.',
      'Custom dashboard theme يحدد ألوان اللوحة وبلاطاتها.',
      'Snapshot ثابت قد يشبهها بصريًا لكنه ليس لوحة مرتبطة ببيانات.',
    ],
    answer: 'A. Create and apply a custom dashboard theme.',
    correctIndices: [0],
    example:
      'نفس ترتيب ShipRegion وأطوال الأعمدة، لكن الأزرق أصبح بتروليًا والخلفية رمادية؛ لا تحتاج DAX جديدًا.',
    optionsAr: [
      'Custom dashboard theme يحقق الألوان المحددة.',
      'ألوان التقرير لا تضبط الخلفية العامة للوحة مباشرة.',
      'Dark الجاهز لا يطابق الشكل الرمادي المخصص.',
      'Snapshot صورة ثابتة تفقد وظيفة البلاطات.',
    ],
    takeaway: 'ألوان Dashboard غير الثيم الجاهز؟ Custom dashboard theme.',
    references: [theme],
    verdict: 'confirmed',
  },
  'f1-238-237': {
    translation:
      'عايز Theme لهوية الشركة يعاد استخدامه في تقارير متعددة، يشمل أحجام الخطوط والألوان وتنسيق Bar chart. تعمل إيه؟',
    story:
      'بدل ما تعيد الضبط في كل ملف، خليه ملف هوية قابلًا للاستيراد. الملف يصف التنسيق، مش مكون Visual جديد.',
    reasoning: [
      'Report theme المخصص يستخدم JSON.',
      'تقدر تخصص ثيمًا وتصدره JSON وتعيد استيراده؛ الاختيار الذي يصف الحزمة القابلة لإعادة الاستخدام هو JSON.',
      'PBIVIZ حزمة Custom visual. التنسيق اليدوي للرسم قد يتغلب على إعدادات الثيم.',
    ],
    answer:
      'D. Create a theme as a JSON file and import it into Power BI Desktop.',
    correctIndices: [3],
    example:
      'ملف هوية الشركة يحدد اللون والخط وإعدادات الأعمدة؛ تستورده في Sales و Finance بدل تكرار الضبط.',
    optionsAr: [
      'تخصيص الحالي ممكن كخطوة، لكنه وحده لا يصف حفظ الثيم وإعادة استخدامه.',
      'Built-in لا يضمن مواصفات الشركة المخصصة.',
      'PBIVIZ لحزمة Visual وليس Report theme.',
      'JSON هو ملف الثيم القابل للاستيراد.',
    ],
    takeaway: 'Theme = JSON؛ Custom visual = PBIVIZ.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/report-themes-create-custom',
    ],
    verdict: 'confirmed',
  },
  'f1-239-238': {
    translation:
      'صفحة فيها خطان ورسم أعمدة. عايز المستهلك يبدل المقاييس ونوع الرسم ويضيف Legend في الثلاثة بأقل تطوير. تعمل إيه؟',
    story:
      'متعملش Bookmark لكل احتمال؛ عدد التركيبات هيكبر. افتح Personalize visuals والقارئ يجرب نسخته دون تعديل تصميم الكاتب.',
    reasoning: [
      'التخصيص الشخصي يدعم تبديل النوع والحقول والـLegend في الرسومات الداعمة.',
      'تمكين الميزة على مستوى التقرير يغطي المطلوب بأقل إعداد.',
      'هذا استكشاف للقارئ، لا صلاحية تعديل الموديل أو كتابة أي DAX جديد.',
    ],
    answer: 'C. Enable personalization for the report.',
    correctIndices: [2],
    example:
      'طالب يعرض Revenue كأعمدة وزميله Profit كخط؛ كل واحد له عرض شخصي والتقرير الأصلي لا يتغير.',
    optionsAr: [
      'Bookmark لكل تركيبة حل ثقيل ولا يغطي الاستكشاف المفتوح بسهولة.',
      'Edit interactions يضبط التأثير بين الرسومات لا أنواعها وحقولها.',
      'تمكين التقرير يحقق الوظيفة لكل الرسومات المطلوبة.',
      'ضبط كل رسم منفصل مفيد للاستثناءات، لكنه ليس الأقل جهدًا هنا.',
    ],
    takeaway:
      'تبديل شخصي لنوع الرسم وحقوله = Personalize visuals، مش آلاف Bookmarks.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-personalize-visuals',
    ],
    verdict: 'confirmed',
  },
  'f1-240-239': {
    translation:
      'Bar chart يعرض Salary بالدولار لكل Employee. مطلوب خط مرجعي يوضح الموظفين فوق الراتب الوسيط. الحل إنشاء Median line على Salary. هل يحقق الهدف؟',
    story:
      'رتّب المرتبات وخد القيمة التي تقسم المجموعة نصفين. ده الوسيط، مش المتوسط الذي قد يسحبه راتب مدير ضخم لفوق.',
    reasoning: [
      'المطلوب Median والحل Median reference line على نفس Salary.',
      'الأعمدة التي تتجاوز المرجع أعلى من الوسيط في السياق المعروض.',
      'الخط أداة مقارنة بصرية؛ لا يغيّر المرتبات ولا يطبق صلاحيات.',
    ],
    answer: 'A. Yes.',
    correctIndices: [0],
    example:
      'مرتبات 10 و 12 و 14 و 16 و 100: الوسيط 14 والمتوسط 30.4. خط الوسيط يميز 16 و 100 بدل المقارنة بمتوسط مختلف.',
    optionsAr: [
      'Yes صحيح لأن الخط والمقياس يطابقان Median salary المطلوب.',
      'No غير صحيح؛ لا يوجد في السؤال مانع لإنشاء Median line على Salary الرقمي.',
    ],
    takeaway: 'Median يعني الوسيط، لا Average ولا منتصف أصغر وأكبر راتب.',
    references: [
      'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane',
    ],
    verdict: 'confirmed',
  },
};
