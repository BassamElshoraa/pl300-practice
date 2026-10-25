import type { ReviewedLesson } from './types.ts';
export const lessons481: Record<string, ReviewedLesson> = {
  "f2-370-496": {
    "translation": "في الخدمة، عندك workspace فيها dashboards. تريد أن يتمكن مستخدم من تعديلها ونشر المحتوى. أي إعداد تغير؟",
    "story": "مشاركة لوحة مع شخص تجعله مستهلكًا، لا عضوًا في فريق التأليف. لو محتاج يشتغل على الأصل، ادخله إلى workspace بدور مناسب للمهمة.",
    "reasoning": [
      "عدّل عضوية workspace وأضف المستخدم بصلاحية تأليف مناسبة.",
      "Contributor يستطيع تعديل المحتوى؛ نشر أو تحديث app قد يحتاج Member أو تفويضًا مناسبًا، حسب المقصود بالنشر.",
      "صلاحية قراءة dashboard أو app لا تمنح تحرير الأصل."
    ],
    "answer": "A: Modify the members of the app workspace، مع اختيار الدور المناسب لمدى النشر المطلوب.",
    "example": "إضافة Mona كـ Member تتيح لها تعديل اللوحات والمشاركة في إدارة نشر app، بدل إرسال رابط مشاهدة لا يمنحها التأليف.",
    "optionsAr": [
      "صحيح؛ عضوية workspace هي الطريق لمنح صلاحيات التأليف والنشر المناسبة.",
      "إعداد RLS يتحكم في الصفوف المرئية، لا حق تعديل dashboard.",
      "مشاركة dashboard تمنح الاستهلاك ولا تحول المستخدم إلى مؤلف في workspace.",
      "Access للـ app يحدد المستهلكين، وليس من يستطيع تحرير المحتوى الأصلي."
    ],
    "takeaway": "تأليف المحتوى يحتاج دور workspace؛ المشاركة وحدها تمنح الاستهلاك.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces"
    ],
    "verdict": "conditional"
  },
  "f2-375-497": {
    "translation": "تقارير HR عليها RLS حسب المنطقة. تريد أن يرى كل مدير منطقته ويتفاعل معها، دون تغيير تصميم التقرير. كيف تنشر الوصول؟",
    "story": "المدير مستخدم للتقرير، مش واحد من فريق بنائه. أعطه التطبيق الجاهز، واربطه بدور الأمان الخاص بمنطقته بدل إدخاله Member في workspace.",
    "reasoning": [
      "انشر app بها التقارير المطلوبة وامنح مديري HR حق الوصول.",
      "عيّنهم إلى أدوار RLS المناسبة أو مجموعة مدعومة تخضع للدور الديناميكي.",
      "لا تمنحهم أدوار تحرير workspace التي لا يُفرض RLS عليها كالمستهلكين."
    ],
    "answer": "C: Publish the reports in an app and grant access، مع عضوية RLS الصحيحة.",
    "example": "مدير East يفتح app ويغير السلايسرات داخل بيانات East فقط، لكنه لا يستطيع نقل الرسومات أو تعديل التقرير الأصلي.",
    "optionsAr": [
      "نسخ الموديل يكرر الصيانة، و Member يمنح تحريرًا ويتجاوز قيد RLS للمستهلك.",
      "تغيير workspace وحده لا يحدد صلاحية الاستهلاك أو عضوية RLS المطلوبة.",
      "صحيح؛ app توزع المحتوى للقراءة والتفاعل مع استمرار قيود RLS على المستهلك.",
      "Member في workspace الحالية يمنح صلاحيات أوسع من المطلوب ولا يحقق منع التحرير."
    ],
    "takeaway": "قارئ يحتاج RLS ولا يحرر الأصل = App access مع دور أمان مضبوط.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-rls",
      "https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-create-distribute-apps"
    ]
  },
  "f2-378-498": {
    "translation": "financials بها Date و Sales. أكمل measure تحسب التغير النسبي في المبيعات عن الربع السابق.",
    "story": "اسأل سؤالين: الربع السابق باع بكام؟ والفرق بين الحالي والسابق يساوي كام من السابق؟ الأولى تغيير سياق تاريخ، والثانية قسمة آمنة.",
    "reasoning": [
      "CALCULATE يعيد حساب SUM(Sales) في فترة مختلفة.",
      "DATEADD ينقل تواريخ التقويم إلى الخلف بمقدار ربع سنة.",
      "DIVIDE يقسم الفرق على مبيعات الربع السابق، ويعيد BLANK افتراضيًا عند مقام صفر.",
      "صيغة المصدر تستخدم هرمية Date التلقائية و ISFILTERED؛ في نموذج جديد يفضل تقويم صريح مناسب بدل نسخ المرجع الهرمي إلى أي عمود."
    ],
    "answer": "CALCULATE؛ DATEADD؛ DIVIDE.",
    "example": "السابق 100 والحالي 120: النتيجة (120−100)/100 = 20%. ليست 120% ولا فرقًا نقديًا قدره 20.",
    "optionsAr": [
      "صحيح للأول؛ CALCULATE تعيد تقييم المبيعات في سياق الربع السابق.",
      "CALCULATETABLE تعيد جدولًا بينما المتغير المطلوب رقم مبيعات.",
      "DATEADD تنتج تواريخ، وليست دالة التجميع الخارجية لهذا الفراغ.",
      "DIVIDE لها وظيفة المقام لاحقًا، لا تعديل سياق SUM بالتواريخ.",
      "FILTER تحتاج جدولًا وشرطًا، لا التعبير الرقمي المعروض.",
      "FIND للبحث داخل النصوص، ولا يحسب مبيعات ربع سابق.",
      "CALCULATE لا تنتج إزاحة تواريخ بهذه الوسائط.",
      "CALCULATETABLE لا تستقبل عدد الإزاحة و QUARTER بهذا الشكل.",
      "صحيح للثاني؛ DATEADD ينقل نافذة التاريخ ربعًا إلى الخلف.",
      "DIVIDE عملية حسابية وليست إزاحة تقويم.",
      "FILTER لا يقبل وسائط عمود وعدد و QUARTER بهذا المعنى.",
      "FIND لا يتعامل مع إزاحة فترات التاريخ.",
      "CALCULATE ليست دالة قسمة الفرق على المقام.",
      "CALCULATETABLE تعيد جدولًا لا نسبة تغير.",
      "DATEADD تنتج فترة مقارنة وليست النسبة نفسها.",
      "صحيح للثالث؛ DIVIDE تعالج المقام الصفري دون خطأ قسمة.",
      "FILTER ترجع جدول صفوف، لا نسبة عددية.",
      "FIND ترجع موضع نص، وليس تغير المبيعات."
    ],
    "takeaway": "تغير نسبي = (الحالي − السابق) ÷ السابق؛ DIVIDE تحمي حالة الصفر.",
    "references": [
      "https://learn.microsoft.com/en-us/dax/dateadd-function-dax",
      "https://learn.microsoft.com/en-us/dax/divide-function-dax"
    ],
    "verdict": "conditional"
  },
  "f2-381-499": {
    "translation": "رسم يعرض مدنًا مع Sales Profit، وتريد أعلى عشر مدن فقط. ما الإجراء؟",
    "story": "المطلوب تقليل المدن المعروضة، مش تغيير مقياس الربح. فلتر Top N الجاهز يرتب المدن بمقياس تختاره ثم يحتفظ بالأعلى.",
    "reasoning": [
      "في فلاتر الـ visual حدد حقل City.",
      "اختر Top N وحدد Top 10، وضع Sales Profit في By value.",
      "طبق الفلتر؛ راجع سلوك التعادل إذا كان لابد من عشر مدن بالضبط."
    ],
    "answer": "A: Add a Top N filter to the visual.",
    "example": "مدينة ربحها 500 تتقدم مدينة ربحها 200 حتى لو كانت أقل مبيعات؛ معيار الترتيب هنا الربح لا المبيعات.",
    "optionsAr": [
      "صحيح؛ يحقق أعلى المدن حسب Sales Profit دون تغيير الموديل.",
      "RANKX ممكن ضمن تصميم أوسع، لكن تعديل measure الربح ليس الخطوة المباشرة للفلتر.",
      "TOPN تعيد جدولًا، فلا تستخدمها وحدها كقيمة calculated column.",
      "استبدال مقياس الربح بعمود لا يحدد وحده أفضل عشر مدن.",
      "عمود تصنيف ثابت عند refresh لا يتكيف مع الفلاتر مثل Top N الديناميكي، ويضيف تعقيدًا."
    ],
    "takeaway": "أفضل N فئات في رسم = Top N على الفئة و By value على المقياس الصحيح.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-report-add-filter"
    ]
  },
  "f2-385-500": {
    "translation": "Bar chart يعرض Salary لكل Employee. المطلوب خط وسيط الرواتب. هل Percentile line بقيمة 50% يحقق ذلك؟",
    "story": "رتب الرواتب وخد النقطة التي تفصل النصف الأقل عن النصف الأعلى. دي الـ 50th percentile، أي Median، مش المتوسط الحسابي.",
    "reasoning": [
      "اضبط percentile على 50 في Analytics للرسم المدعوم.",
      "التوزيع المقصود هنا قيم Salary على مستوى الموظفين المعروضين.",
      "لو المقياس مجمع على مستوى مختلف، راجع grain لأن وسيط الفروع ليس وسيط الموظفين."
    ],
    "answer": "Yes: 50th percentile = Median.",
    "example": "رواتب 10 و 20 و 90: خط الـ 50th percentile عند 20، بينما المتوسط 40.",
    "optionsAr": [
      "صحيح؛ النسبة المئوية 50 تحدد الوسيط لتوزيع قيم الموظفين في الرسم.",
      "No غير صحيح؛ هو يخلط الوسيط بالمتوسط أو بنوع آخر من خطوط المرجع."
    ],
    "takeaway": "الوسيط هو الـ 50th percentile، عند نفس مستوى التفاصيل المطلوب.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane"
    ]
  },
  "f2-389-501": {
    "translation": "API يرجع أكثر من مئة عمود. تريد حذف كل عمود ينتهي اسمه بـ sourceid دون كتابة أسماء الأعمدة واحدًا واحدًا. أكمل M.",
    "story": "بدل قائمة حذف تتكسر كلما زاد عمود جديد، خذ أسماء الأعمدة الحالية، اختار منها اللي آخر اسمها sourceid، ثم احذف القائمة الناتجة.",
    "reasoning": [
      "Table.ColumnNames(rawData) تعيد قائمة أسماء الأعمدة.",
      "List.Select تختار الأسماء التي تحقق Text.EndsWith(_, \"sourceid\").",
      "Table.RemoveColumns يحذف هذه القائمة من rawData؛ لا تستخدم Contains لأنه قد يلتقط الكلمة في وسط الاسم."
    ],
    "answer": "Table.RemoveColumns؛ List.Select؛ Text.EndsWith.",
    "example": "client_notified_sourceid يحذف، و client_sourceid_status يبقى لأنه لا ينتهي بالمقطع المطلوب.",
    "optionsAr": [
      "الجمع بين الأعمدة لا يزيل قائمة أعمدة مطابقة للنمط.",
      "Table.FindText يبحث في محتوى الجدول، لا يحذف الأعمدة حسب أسمائها.",
      "Table.FromList يحول قائمة إلى جدول، لا ينفذ الحذف المطلوب.",
      "صحيح؛ RemoveColumns يستقبل الجدول وقائمة أسماء الحذف.",
      "List.Contains تعيد True أو False لقيمة، لا قائمة أسماء مصفاة.",
      "صحيح؛ List.Select ترجع العناصر التي تحقق شرط اللاحقة.",
      "Table.FindText لا يصفّي قائمة الأسماء بهذه الوسائط.",
      "Table.FromList ليس دالة اختيار عناصر بشرط.",
      "Contains يطابق وجود المقطع في أي مكان، أوسع من شرط suffix.",
      "صحيح؛ EndsWith يطابق نهاية اسم العمود فقط.",
      "Text.From تحويل نوع إلى نص، وليس اختبار اللاحقة.",
      "StartsWith يختبر بداية الاسم بدل نهايته."
    ],
    "takeaway": "حذف أعمدة بنمط اسم = RemoveColumns مع List.Select على ColumnNames.",
    "references": [
      "https://learn.microsoft.com/en-us/powerquery-m/table-removecolumns",
      "https://learn.microsoft.com/en-us/powerquery-m/list-select",
      "https://learn.microsoft.com/en-us/powerquery-m/text-endswith"
    ]
  },
  "f2-391-502": {
    "translation": "الخطوة تستبدل \"1318\" بـ\"1319\" باستخدام Replacer.ReplaceText داخل AddressLine1. ماذا يحدث للقيمة 21318 Lasalle Street؟",
    "story": "ReplaceText يدور على جزء داخل النص، مش يشترط أن الخانة كلها تساوي الرقم. لذلك يترك الـ 2 في البداية ويغير الجزء بعدها.",
    "reasoning": [
      "القيمة 21318 تحتوي المقطع 1318 بعد أول حرف.",
      "استبدال هذا المقطع ينتج 21319 مع بقاء اسم الشارع.",
      "Replacer.ReplaceValue كان سيعامل المطابقة للقيمة كلها بطريقة مختلفة."
    ],
    "answer": "D: 21319 Lasalle Street.",
    "example": "\"A1318B\" تصبح \"A1319B\" بنفس مبدأ استبدال المقطع، لا استبدال الخانة بالكامل.",
    "optionsAr": [
      "لا ينتج الرقم القديم منفردًا؛ بقية النص لا تحذفها الدالة.",
      "لا تختزل الخانة إلى 1319؛ الرقم البديل يحل محل المقطع فقط.",
      "القيمة تتغير لأن المقطع موجود فعلًا و ReplaceText يطابقه.",
      "صحيح؛ تبديل المقطع يحافظ على الـ 2 وبقية عنوان الشارع."
    ],
    "takeaway": "ReplaceText يبدل جزء النص؛ ReplaceValue يقارن قيمة الخانة.",
    "references": [
      "https://learn.microsoft.com/en-us/powerquery-m/table-replacevalue"
    ]
  },
  "f2-392-503": {
    "translation": "App1 تظهر لك في AppSource المؤسسة ولا تظهر لمستخدم آخر. workspace خصوصيتها Private. كيف تمنحه الوصول للتطبيق؟",
    "story": "التطبيق له جمهور غير فريق تأليف workspace. المطلوب تضيفه إلى جمهور التطبيق وتنشر التحديث، مش تدخله محررًا لمجرد أنه يريد القراءة.",
    "reasoning": [
      "من Update app عدّل Access أو Audience بحسب الواجهة الحالية.",
      "أضف المستخدم أو مجموعته المناسبة ثم Update app.",
      "تحقق أيضًا من الترخيص والوصول إلى الموديل عند الحاجة؛ اسم Private لا يعني أن كل المؤسسة ترى التطبيق."
    ],
    "answer": "C: Update app → Access settings → Update app.",
    "example": "بعد إضافة مجموعة Sales audience ونشر التحديث، يجد أعضاء المجموعة App1 ضمن التطبيقات المتاحة لهم.",
    "optionsAr": [
      "Content تحدد العناصر المنشورة، لا أعضاء الجمهور الذين يستطيعون الوصول.",
      "إضافة workspace member تمنح تأليفًا زائدًا وليست أقل وصول للتطبيق.",
      "صحيح؛ تعدل جمهور التطبيق وتنشر تغيير الوصول.",
      "مشاركة dashboard منفردة لا تضيف المستخدم إلى جمهور App1 نفسه."
    ],
    "takeaway": "من يشاهد app يتحدد في Audience/Access؛ من يؤلف يتحدد في workspace.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-create-distribute-apps"
    ]
  },
  "f2-396-504": {
    "translation": "Customer فيه Email Address مكرر. أكمل calculated column يحسب عدد الصفوف التي تحمل نفس الإيميل.",
    "story": "خزن إيميل الصف الحالي أولًا، ثم اخرج من قيد هذا الصف وعد كل العملاء الذين يحملون الإيميل نفسه. لو بقيت محبوسًا في الصف الحالي فالعدد دائمًا واحد.",
    "reasoning": [
      "VAR Email = [Email Address] تحفظ قيمة الصف الحالي.",
      "CALCULATE مع COUNTROWS(Customer) ينفذ العد تحت سياق معدل.",
      "ALL(Customer) في الرسم الأصلي يزيل قيد الصف على الجدول كله، ثم يعيد شرط Customer[Email Address]=Email.",
      "الناتج عدد التكرارات شامل الصف الحالي؛ >1 تعني مكرر، والفراغات تحتاج قرار أعمال إذا أردت استثناءها."
    ],
    "answer": "CALCULATE؛ COUNTROWS؛ ALL، كما في صيغة الجدول الكامل بالمصدر.",
    "example": "ثلاثة صفوف بإيميل a@example.com ترجع 3 لكل منها؛ إيميل منفرد يرجع 1. لا تختزل ALL إلى عمود الإيميل إذا بقيت فلاتر أعمدة الصف الأخرى.",
    "optionsAr": [
      "صحيح للفراغ الخاص بإزالة قيد صف Customer قبل عد الإيميل عبر الجدول.",
      "صحيح خارجيًا؛ يعدل filter context بعد context transition.",
      "صحيح داخل الحساب؛ يعد الصفوف المطابقة للإيميل.",
      "EVALUATE أمر استعلام DAX، وليس دالة داخل calculated column.",
      "SUM يحتاج عمودًا رقميًا ولا يعد صفوف الإيميل بهذه الصيغة.",
      "SUMX يحتاج جدولًا وتعبيرًا، بينما المصدر يعرض COUNTROWS المباشرة."
    ],
    "takeaway": "في calculated column، CALCULATE ينقل سياق الصف؛ ALL(Customer) يزيله قبل عد الأشباه.",
    "references": [
      "https://learn.microsoft.com/en-us/dax/calculate-function-dax",
      "https://learn.microsoft.com/en-us/dax/all-function-dax",
      "https://learn.microsoft.com/en-us/dax/countrows-function-dax"
    ]
  },
  "f2-398-505": {
    "translation": "Workspace1 فيها DS1 و RPT1. مستخدم يريد بناء تقرير من DS1 ونشره في workspace أخرى. ما أقل وصول تمنحه للمصدر؟",
    "story": "هو لا يحتاج مفاتيح غرفة الشغل كلها؛ يحتاج إذن استخدام الموديل كمواد لبناء تقريره. ده Build على DS1 تحديدًا.",
    "reasoning": [
      "امنحه Build على DS1 بدل دور تحرير workspace المصدر.",
      "يحتاج بشكل مستقل صلاحية النشر في workspace الوجهة والترخيص المناسب.",
      "Read أومشاركة التقرير وحدهما لا يكفيان لإنشاء تقرير جديد من الموديل."
    ],
    "answer": "D: Grant Build permission for DS1.",
    "example": "مؤلف جديد يعيد استخدام Total Sales من DS1 في تقريره دون القدرة على تعديل RPT1 أو حذف DS1.",
    "optionsAr": [
      "مشاركة RPT1 تمنح قراءة التقرير ولا تضمن Build المطلوب للموديل.",
      "Viewer على workspace أوسع من مورد واحد، ولا يمنح Build تلقائيًا.",
      "Member يعطي تحريرًا وإدارة أوسع من الحاجة على workspace المصدر.",
      "صحيح؛ يقتصر الإذن على بناء محتوى من DS1."
    ],
    "takeaway": "تقرير جديد من موديل مشترك = Build على الموديل، مع إذن نشر مستقل للوجهة.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions",
      "https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces"
    ]
  },
  "f2-403-506": {
    "translation": "المدير يرى مبيعات وموارد بشرية لبلده، بينما CFO يرى مبيعات كل الدول ولا يرى أي صف HR. أكمل فلتر HR وفلتر Country للدورين المناسبين.",
    "story": "مش معنى وجود CFO أمام USA في جدول الدول أنه يجب حصره في أمريكا. متطلباته مختلفة: المبيعات كلها، والموارد البشرية مقفولة. مدير البلد يستخدم إيميله لاختيار صف الدولة.",
    "reasoning": [
      "ضع FALSE() على Human Resources داخل دور CFO.",
      "اترك Country بلا قيد لهذا الدور حتى لا يقتصر Sales على دولة واحدة.",
      "داخل Manager role ضع [Email]=USERPRINCIPALNAME() على Country؛ العلاقات تنقل الفلتر للجدولين.",
      "لا تعين CFO إلى دور Manager أيضًا دون مراجعة اتحاد صلاحيات RLS؛ الأدوار المتعددة قد توسع الوصول."
    ],
    "answer": "Human Resources في CFO: FALSE(). Country في Manager: [Email]=USERPRINCIPALNAME().",
    "example": "مدير فرنسا يرى بيانات France فقط؛ CFO يرى كل Sales ولا يرى أي HR تحت دوره وحده.",
    "optionsAr": [
      "Country=USA ثابت يحصر المبيعات في دولة ويخالف حق CFO في رؤية كل الدول.",
      "صحيح لدور Manager؛ يربط هوية الدخول بدولة المدير ديناميكيًا.",
      "Manager=CFO يختار صفًا واحدًا في Country ولا ينفذ متطلبات الدورين.",
      "صحيح على HR داخل دور CFO؛ يمنع جميع صفوف هذا الجدول.",
      "TRUE يسمح بكل الصفوف، فلا يحقق حجب HR أو تخصيص دولة المدير."
    ],
    "takeaway": "فلتر منع HR يخص CFO؛ فلتر Email يخص Manager. لا تجمعهما في دور واحد.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-rls",
      "https://learn.microsoft.com/en-us/power-bi/guidance/rls-guidance"
    ]
  },
  "f2-407-507": {
    "translation": "Orders و Order Line Items و Products من Azure SQL. تحتاج قيمة الطلبات عبر الزمن والتحليل بخصائص المنتجات، مع سرعة التفاعل. ماذا تفعل أولًا؟",
    "story": "رأس الطلب فيه التاريخ والعميل، والتفاصيل فيها المنتج والكمية. لتبني fact واضحًا للمبيعات، ضع خصائص رأس الطلب اللازمة مع صفوف تفاصيله، واحتفظ بـ Product كبعد.",
    "reasoning": [
      "Merge Orders مع Order Line Items على مفتاح الطلب الصحيح.",
      "الناتج grain سطر طلب؛ لا تجمع قيمة رأس الطلب المكررة على كل سطر دون معالجة.",
      "أبقِ Products بعدًا مرتبطًا لتصفية الفاكت بخصائص المنتجات.",
      "استخرج قيمة السطر من الكمية والسعر المناسبين، أو استخدم منطقًا يحافظ على إجمالي الطلب دون مضاعفة."
    ],
    "answer": "A: Merge Orders and Order Line Items، مع الحفاظ على grain ومنع تكرار إجمالي الرأس.",
    "example": "طلب إجماليه 100 وله سطران؛ نسخ 100 على كل سطر ثم SUM ينتج 200 بالخطأ. احسب قيمتي السطرين 40 و 60، أوتجنب جمع قيمة الرأس المكررة.",
    "optionsAr": [
      "صحيح؛ يسطح header/detail ويقرب خصائص الطلب من أحداث المبيعات المطلوبة.",
      "عد الطلبات لكل منتج لا يحل بناء الفاكت وقيمة الطلب عبر الزمن أولًا.",
      "قائمة فئات كنص داخل Orders تصعب التصفية وتزيد التعقيد ولا تحافظ على grain السطر.",
      "دمج Products في الفاكت يكرر خصائص البعد؛ ليس أول خطوة المقصودة لتبسيط header/detail."
    ],
    "takeaway": "Header مع Detail يحتاج grain واضحًا؛ تكرار قيمة الرأس قد يضاعف الإجمالي.",
    "references": [
      "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema"
    ],
    "verdict": "conditional"
  },
  "f2-410-508": {
    "translation": "SharePoint Online فيه مكتبات كثيرة، وواحدة فيها ملفات Excel تصنيع متطابقة الهيكل. كيف تحمل ملفات التصنيع فقط في جدول واحد؟",
    "story": "موصل SharePoint Folder ممكن يعرض ملفات من الموقع كله. لازم تختار المكتبة المطلوبة قبل ما تفتح كل الملفات وتدمجها؛ وإلا تدخل ملفات لا تخص التصنيع.",
    "reasoning": [
      "Get data من SharePoint Folder باستخدام site URL، وليس رابط ملف واحد.",
      "اختر Transform Data وفلتر Folder Path للمكتبة المطلوبة، مع نوع الملف عند الحاجة.",
      "بعد حصر الملفات الصحيحة استخدم Combine وراجع Sample file والورقة المطلوبة."
    ],
    "answer": "A: SharePoint Folder → site URL → Transform Data → filter Folder Path → Combine.",
    "example": "الموقع فيه HR و Manufacturing؛ فلتر مسار Manufacturing أولًا حتى لا تضم ملفات الموظفين إلى الإنتاج.",
    "optionsAr": [
      "صحيح؛ يختار المصدر ونطاق الملفات قبل الدمج.",
      "SharePoint List يعيد عناصر قائمة، وليس محتويات ملفات Excel في المكتبة بهذه العملية.",
      "Combine & Load من موصل List لا يدمج workbooks المكتبة المطلوبين.",
      "الدمج فورًا دون فلترة قد يجلب ملفات من مكتبات أخرى أو هياكل مختلفة."
    ],
    "takeaway": "SharePoint Folder للموقع، ثم فلتر المسار، ثم ادمج الملفات.",
    "references": [
      "https://learn.microsoft.com/en-us/power-query/connectors/sharepoint-folder"
    ]
  }
};
