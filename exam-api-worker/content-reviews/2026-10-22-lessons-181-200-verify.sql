SELECT COUNT(*) AS matching_reviewed_rows FROM question_bank WHERE (id='f1-181-180' AND prompt='HOTSPOT

-

You have a Power BI semantic model that contains the following tables.

All the tables use the same data source.

You need to reduce the number of limited relationships in the model by changing the storage mode of certain

tables. The solution must NOT affect the latency of the data.

Which storage mode should you select for the Customer and Geography tables? To answer, select the appropriate

options in the answer area.

NOTE: Each correct selection is worth one point.' AND explanation='ترجمة السؤال بالعربي
عندك Sales بنظام DirectQuery وSurvey Response بنظام Import. Customer مرتبط بالاتنين، وGeography مرتبط بـCustomer، وكلهم من نفس المصدر. عايزين نقلل العلاقات المحدودة من غير تحويل المبيعات إلى نسخة قديمة مخزنة.

القصة والمعنى
تخيّل المبيعات شاشة كاشير مباشرة، والاستبيانات كشكول محفوظ. العميل بيخدم الاتنين، والمنطقة بتوصل لهم عن طريق العميل. لو العميل قدر يتعامل كذاكرة أو استعلام مباشر، لكن المنطقة فضلت محبوسة في مسار واحد، لسه عندك وصلة بين مجموعتين مختلفتين.

مثال نفهم بيه
استعلام عن Survey Response والمنطقة يستطيع استخدام نسخ متوافقة في الذاكرة. واستعلام عن Sales والمنطقة والعميل يمكنه استخدام مسار المصدر المشترك. لو اسم منطقة اتغير في المصدر، الكاش يحتاج تحديث كي تعكسه الاستعلامات التي تستخدم الكاش.

طريقة التفكير خطوة بخطوة
1. المشكلة مش عدد العلاقات نفسه؛ المشكلة إن بعض الوصلات بين مجموعتي التخزين Limited بدل Regular.
2. Customer = Dual يخدم مسار Sales المباشر ومسار Survey Response المستورد.
3. Geography موجود على ناحية الواحد قبل Customer في سلسلة الأبعاد. نفس مثال Microsoft يمد إعداد Dual إليه أيضًا.
4. إجابة Geography = DirectQuery الموجودة في الشرح القديم لا تطابق مثال Microsoft الخاص بهذه الجداول.
5. Sales يظل DirectQuery. مع ذلك، Dual عنده cache للأبعاد يحتاج refresh؛ لا تساوي بين الحفاظ على مسار المبيعات المباشر وضمان حداثة كل قيمة بُعد في كل استعلام.
6. Date ليس ضمن الجدولين المطلوب تغييرهما. تقليل العلاقات المحدودة هنا لا يعني أننا عالجنا كل علاقة في النموذج أو غيّرنا إعداد Date ضمنيًا.

الإجابة الصحيحة وليه
Customer: Dual. Geography: Dual. تصحيح للشرح القديم الذي أبقى Geography على DirectQuery.

ليه كل اختيار صح أو غلط
A. Customer storage mode: DirectQuery
Customer — DirectQuery يبقي علاقته بجدول الاستبيانات المستورد عبر مجموعتي تخزين؛ لا يحل الوصلة التي نراجعها.

B. Customer storage mode: Dual
Customer — Dual هو الاختيار المطلوب لأنه بُعد مشترك بين Fact مستورد وFact مباشر من المصدر نفسه.

C. Customer storage mode: Import
Customer — Import وحده يثبت العميل في الكاش، ويترك مسار المبيعات المباشر يحتاج عبور مجموعة تخزين مختلفة.

D. Geography storage mode: DirectQuery
Geography — DirectQuery يبدو منطقيًا لو بصينا له منفردًا، لكنه لا يكمل انتشار Dual عبر سلسلة الأبعاد في مثال Microsoft.

E. Geography storage mode: Dual
Geography — Dual هو الاختيار المطلوب هنا؛ يسمح للمنطقة بالمشاركة مع Customer في المسار المناسب بدل إبقاء وصلة محدودة.

F. Geography storage mode: Import
Geography — Import وحده لا يحتفظ بإمكانية استخدام المنطقة داخل مسار DirectQuery المشترك مثل Dual.

الخلاصة اللي تتحفظ
في نفس مثال المصدر: Customer وGeography كلاهما Dual. راجع مسار العلاقات كله، لا الجدول الملاصق للـFact فقط.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-storage-mode' AND answer_image IS NULL AND correct_json='[]') OR (id='f1-182-181' AND prompt='HOTSPOT

-

You have a semantic model that contains a table named Sales. The table contains the following columns:

•Order ID

•Product ID

•Sales Date

•Sales Amount

You need to create a DAX measure that will return the total sales amount for the same dates from the previous

year.

How should you complete the measure? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.' AND explanation='ترجمة السؤال بالعربي
جدول Sales فيه Sales Amount وSales Date. المطلوب إجمالي مبيعات نفس التواريخ لكن السنة الماضية، باختيار دالتين داخل الصيغة المعروضة.

القصة والمعنى
أنت فاتح مبيعات أول عشرة أيام من مايو. المقارنة المطلوبة مش السنة اللي فاتت كلها؛ عايز أول عشرة أيام من مايو اللي فاتت. نغيّر شباك التواريخ اللي بنبص منه، وبعدها نجمع المبيعات.

مثال نفهم بيه
لو فلتر التقرير من 1 إلى 10 مايو 2025، الفكرة هي جمع الفترة المقابلة في مايو 2024، لا كل 2024. في النموذج السليم تمرر Calendar[Date] بدل الاعتماد على عمود معاملات مكرر.

طريقة التفكير خطوة بخطوة
1. SUM يجمع Sales Amount في سياق الفلترة الحالي.
2. CALCULATE يعيد تقييم المجموع بعد تطبيق فلتر زمني مختلف.
3. SAMEPERIODLASTYEAR يرجع مجموعة التواريخ المقابلة من العام السابق بدل سنة كاملة.
4. الصيغة المعطاة تستخدم Sales[Sales Date]. في تطبيق فعلي استخدم Date dimension مناسبة وعلاقة صحيحة؛ تكرار أو انقطاع تواريخ جدول المبيعات قد يجعل نمط time intelligence الكلاسيكي غير صالح.

الإجابة الصحيحة وليه
CALCULATE ثم SAMEPERIODLASTYEAR. الصيغة: CALCULATE(SUM(Sales[Sales Amount]), SAMEPERIODLASTYEAR(Sales[Sales Date])). اختيار الدالتين صحيح داخل قالب السؤال؛ صلاحية النموذج الزمني شرط منفصل.

ليه كل اختيار صح أو غلط
A. Outer function [1] CALCULATE
CALCULATE يرجع قيمة المجموع بعد تغيير فلتر التاريخ؛ ده نوع الناتج الذي تحتاجه measure.

B. Outer function [1] CALCULATETABLE
CALCULATETABLE يرجع جدولًا، بينما التعبير الداخلي هنا مجموع عددي مطلوب كقيمة واحدة.

C. Outer function [1] SUMX
SUMX يحتاج جدولًا وتعبيرًا للتكرار. وضعه محل الدالة الخارجية في هذا القالب لا يغيّر الفترة بالطريقة المطلوبة.

D. Previous-year date function [2] SAMEPERIODLASTYEAR
SAMEPERIODLASTYEAR يطابق طلب نفس مجموعة التواريخ منذ عام، مع قواعده الخاصة لنهايات الشهور والسنة الكبيسة.

E. Previous-year date function [2] PARALLELPERIOD
PARALLELPERIOD يحتاج معاملات إضافية مثل -1 وYEAR غير موجودة في الفراغ، وقد يوسّع الفترة إلى فترات كاملة.

F. Previous-year date function [2] PREVIOUSYEAR
PREVIOUSYEAR يعيد تواريخ العام السابق كله؛ لو السياق عشرة أيام فمش ده نفس نطاق الأيام المطلوب.

الخلاصة اللي تتحفظ
تغيير الحساب لفترة أخرى: CALCULATE. نفس الفترة منذ عام: SAMEPERIODLASTYEAR، مع Calendar سليمة.

مراجع المراجعة
https://learn.microsoft.com/en-us/dax/sameperiodlastyear-function-dax
https://learn.microsoft.com/en-us/dax/parallelperiod-function-dax
https://learn.microsoft.com/en-us/dax/previousyear-function-dax' AND answer_image IS '/dump-assets/f1-182-181-answer.webp' AND correct_json='[]') OR (id='f1-183-182' AND prompt='HOTSPOT

-

You have a Power BI semantic model that contains the following table named Employees.

An employee is considered active if the TermDate column for that employee contains no value.

You need to create a DAX measure that will count the number of active employees.

How should you complete the DAX expression? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.' AND explanation='ترجمة السؤال بالعربي
الموظف Active في تعريف السؤال لو TermDate فاضي. أكمل measure تعد الموظفين الذين ينطبق عليهم الشرط، باستخدام جدول Employees المعروض.

القصة والمعنى
عندك دفتر الموظفين، وبتدوّر على خانة تاريخ الخروج. الفاضية معناها الموظف لسه معانا حسب التعريف المكتوب. مش هنعد تواريخ الخروج؛ هنفلتر الصفوف اللي مافيهاش تاريخ خروج ونعد الموظفين الباقيين.

مثال نفهم بيه
الموظف 1 خرج في ديسمبر 2022، والموظف 4 خرج في مايو 2024. خانة الخروج عند 2 و3 فارغة، إذن العد 2. لو حددت قسمًا في التقرير فالـmeasure تحسب داخل الفلاتر الأخرى الباقية.

طريقة التفكير خطوة بخطوة
1. COUNTROWS(Employees) هو العد المطلوب بعد الفلترة، وليس COUNT على تواريخ الانتهاء.
2. ISBLANK(Employees[TermDate]) يرجع شرطًا منطقيًا لكل قيمة في العمود.
3. CALCULATE يطبّق الشرط على عملية العد.
4. في الصفوف الأربعة، EmployeeID 2 و3 فقط لهما TermDate فارغ؛ الناتج 2 من غير فلاتر إضافية. لا نضيف شرط HireDate من عندنا.

الإجابة الصحيحة وليه
CALCULATE ثم ISBLANK: Actives = CALCULATE(COUNTROWS(Employees), ISBLANK(Employees[TermDate])).

ليه كل اختيار صح أو غلط
A. Actives: outer function [1] ALLSELECTED
ALLSELECTED تتعامل مع سياق الاختيارات وتعيد جدولًا أو تزيل فلاتر محددة؛ ليست بديلًا لـCALCULATE في هذا القالب العددي.

B. Actives: outer function [1] CALCULATE
CALCULATE صحيح؛ يعيد حساب عدد الصفوف داخل فلتر TermDate الفارغ.

C. Actives: outer function [1] CALCULATETABLE
CALCULATETABLE ترجع جدولًا لا العدد المفرد الذي نريده من measure الموظفين.

D. Actives: outer function [1] FILTER
FILTER يحتاج جدولًا وتعبير فلترة؛ وضع COUNTROWS كأول معامل في الفراغ هنا لا يطابق توقيعه.

E. TermDate test [2] BLANK
BLANK تنشئ قيمة فارغة ولا تختبر عمود TermDate؛ كذلك لا تقبل هذا العمود كمعامل اختبار.

F. TermDate test [2] COUNT
COUNT يعد القيم غير الفارغة المناسبة؛ المطلوب شرط منطقي يحدد من لا يملك تاريخ انتهاء.

G. TermDate test [2] ISBLANK
ISBLANK صحيح لأنه يختبر قيمة TermDate ويعيد TRUE عندما تكون فارغة.

H. TermDate test [2] ISEMPTY
ISEMPTY تختبر هل جدول بلا صفوف، لا هل قيمة تاريخ داخل صف فارغة.

الخلاصة اللي تتحفظ
ISBLANK لاختبار قيمة. ISEMPTY لاختبار جدول. COUNTROWS يعد الصفوف بعد تطبيق شرطنا.

مراجع المراجعة
https://learn.microsoft.com/en-us/dax/isblank-function-dax
https://learn.microsoft.com/en-us/dax/calculate-function-dax' AND answer_image IS '/dump-assets/f1-183-182-answer.webp' AND correct_json='[]') OR (id='f1-184-183' AND prompt='You have a Power BI semantic model that has the tables and relationships shown in the following exhibit.

Which type of dimension is represented by Dim Address?' AND explanation='ترجمة السؤال بالعربي
رسم فيه Dim Address مرتبط مرتين بجدول Semester Enrollment: مرة بعنوان الفاتورة ومرة بعنوان المراسلات. ما نوع البُعد الذي يوضحه هذا الاستخدام؟

القصة والمعنى
الطالب ممكن فاتورته تروح لعنوان، وخطابات الجامعة تروح لعنوان تاني. عندنا قاموس عناوين واحد، لكن بنسأله سؤالين مختلفين: عنوان الدفع فين؟ وعنوان المراسلات فين؟ الجدول نفسه بيمثل دورين.

مثال نفهم بيه
طالب Billing Address ID عنده 10 وMailing Address ID عنده 25. كلا الرقمين يرجع لنفس جدول العناوين. لم ننشئ نسخة قديمة وجديدة لنفس عنوان الطالب؛ اخترنا نوع عنوان مختلف.

طريقة التفكير خطوة بخطوة
1. الدليل هو وجود Billing Address ID وMailing Address ID وعلاقتين بنفس Dim Address.
2. ده Role-playing dimension: نفس البُعد يستخدم لمعنيين في الـFact. واحدة من العلاقتين غير نشطة في الرسم؛ ده لا يلغي وصف الدورين.
3. SCD Type 2 موضوعه الاحتفاظ بنسخ تاريخية للكيان. الرسم لا يبين نسخًا أو تواريخ صلاحية، واسم Address وحده ليس دليلًا.
4. الإجابة القديمة A كانت تفسيرًا عامًا عن تغيّر العناوين، لا قراءة للعلاقات المعروضة؛ الإجابة الصحيحة C.

الإجابة الصحيحة وليه
C: role-playing dimension. تم تصحيح المفتاح من SCD Type 2 إلى Role-playing بناءً على الرسم.

ليه كل اختيار صح أو غلط
A. Type 2 slowly changing dimension (SCD)
SCD Type 2 يحتاج تتبع نسخ تاريخية للكيان، مثل EffectiveFrom وEffectiveTo ومفتاح نسخة. لا تستنتجه لمجرد أن عنوانًا قد يتغير.

B. junk dimension
Junk dimension يجمع أعلامًا أو صفات قليلة القيم مثل IsGift وPriority؛ لا يصف دورَي الفاتورة والمراسلات.

C. role-playing dimension
Role-playing هو المطابق: جدول عناوين واحد يؤدي دور Billing ودور Mailing عبر علاقتين.

D. degenerate dimension
Degenerate dimension غالبًا معرف مثل InvoiceNumber محفوظ داخل الـFact بلا جدول وصف منفصل. هنا Dim Address جدول منفصل بصفات عديدة.

الخلاصة اللي تتحفظ
اقرأ العلاقات: نفس البُعد بأكثر من دور = Role-playing. نسخ تاريخية لنفس الكيان = SCD Type 2.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/guidance/star-schema' AND answer_image IS NULL AND correct_json='[2]') OR (id='f1-185-184' AND prompt='DRAG DROP -

You have a Microsoft Excel spreadsheet that contains the data shown in the following table.

You plan to build a data model for a Power BI report.

You need to prepare the data so that it is available to the model in the format shown in the following table.

Which three actions should you perform in sequence in Power Query Editor? To answer, move the appropriate

actions from the list of actions to the answer area and arrange them in the correct order.

Select and Place:' AND explanation='ترجمة السؤال بالعربي
درجات أربع مدارس موزعة على أعمدة، ولكل قسم مرحلتان. المطلوب تحويلها إلى Department وSchool وAvg Score ثم ترتيب ثلاث عمليات تجهيز.

القصة والمعنى
حاليًا School1 وSchool2 أسماء أعمدة؛ ده يخليك تحسب لكل مدرسة بطريقة منفصلة. عايزين اسم المدرسة يبقى قيمة داخل عمود School، والدرجة داخل Score، وبعدها ناخد متوسط المرحلتين لكل قسم ومدرسة.

مثال نفهم بيه
الأربعة صفوف الأصلية تنتج 16 صفًا بعد Unpivot، ثم 8 مجموعات (قسمان × أربع مدارس). مجموعة Mathematics/School1 متوسطها 77.5، وGeography/School1 متوسطها 87.5، مثل الصفين المعروضين.

طريقة التفكير خطوة بخطوة
1. نثبت Department وStage ونعمل Unpivot Other Columns للمدارس، فيتحول كل صف إلى أربعة صفوف.
2. نغيّر Attribute إلى School وValue إلى Score كي تصبح الأسماء معبرة.
3. نجمع حسب Department وSchool ونحسب Average للـScore. لا نضع Stage في مفاتيح التجميع لأننا نريد دمج المرحلتين.
4. الترتيب من الاختيارات هو 1 ثم 4 ثم 3. متوسط Mathematics/School1 = (75+80)/2 = 77.5.
5. تنبيه مصدر: الشكل الهدف يعرض School1 فقط. الخطوات الثلاث تعطي كل المدارس؛ إذا كان المقصود صفين فقط حرفيًا، يلزم فلتر School1 إضافي غير موجود ضمن الاختيارات. نتعامل مع الهدف كعينة للشكل، لا ندعي أن الخطوات تحذف بقية المدارس.

الإجابة الصحيحة وليه
Unpivot other columns مع تثبيت Department وStage → Rename Attribute/Value إلى School/Score → Group by Department وSchool مع Average Score. الهدف المعروض يُفهم كعينة؛ إخراج School1 وحدها يحتاج فلتر إضافي.

ليه كل اختيار صح أو غلط
A. Select the [Department] and [Stage] columns and unpivot the other columns.
تحديد Department وStage ثم Unpivot للباقي صحيح؛ نحافظ على هوية القسم والمرحلة وننقل أسماء المدارس إلى صفوف.

B. Select and unpivot the [Department] and [Stage] columns.
Unpivot لـDepartment وStage أنفسهما يقلب المعرّفات بدل أعمدة درجات المدارس، فتضيع البنية المطلوبة.

C. Group by [Department] and [School] and create a new column named [Avg Score] that uses the AVERAGE function on the [Score] column.
Group by Department وSchool مع Average Score هو التجميع النهائي المطلوب بعد إنشاء العمودين، لا قبل ذلك.

D. Rename the [Attribute] column as [School] and the [Value] column as [Score].
Rename Attribute وValue صحيح بعد Unpivot؛ قبلها العمودان غير موجودين بهذه الأسماء.

E. Group by [Department], [School1], [School2], [School3], [School4] and create a new column named [Avg Score] that uses the AVERAGE function on the [Stage] column.
التجميع حسب School1..School4 مع متوسط Stage يحسب متوسط رقم المرحلة، لا متوسط درجات المدارس.

الخلاصة اللي تتحفظ
افهم معنى الصف قبل التجميع. Unpivot يجهز School وScore؛ Group By هو اللي يجمع درجات المراحل.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-query/unpivot-column
https://learn.microsoft.com/en-us/power-query/group-by' AND answer_image IS '/dump-assets/f1-185-184-answer.webp' AND correct_json='[0,3,2]') OR (id='f1-186-185' AND prompt='You have a report that contains a bar chart and a column chart. The bar chart shows customer count by customer

segment. The column chart shows sales by month.

You need to ensure that when a segment is selected in the bar chart, you see which portion of the total sales for

the month belongs to the customer segment.

How should the visual interactions be set on the column chart when the bar chart is selected?' AND explanation='ترجمة السؤال بالعربي
عندك Bar chart لعدد العملاء حسب Segment وColumn chart لمبيعات الشهور. عند اختيار Segment عايز تشوف نصيبه من إجمالي كل شهر مع بقاء الإجمالي ظاهرًا.

القصة والمعنى
عمود يناير طوله 100 ألف. لما تختار الشركات الكبيرة عايز تعرف نصيبها 30 ألف، لكن ما زلت محتاج تشوف الـ100 ألف ككل. نلوّن نصيب الشركات ونترك الباقي باهتًا بدل ما نقصه من الرسم.

مثال نفهم بيه
يناير إجماله 100 ومبيعات Segment المختار 30: ترى جزء 30 مميزًا وباقي 70 باهتًا. مع Filter سترى 30 وحدها ولن تبقى مقارنة الجزء بالكل بنفس الشكل.

طريقة التفكير خطوة بخطوة
1. عبارة portion of total تعني إن الكل يظل مرئيًا مع إبراز الجزء المتعلق بالاختيار.
2. Highlight يحتفظ بباقي البيانات باهتة، بينما Filter يزيلها من العرض.
3. نحدد Bar chart المصدر، ثم Edit interactions، ونختار Highlight على Column chart الهدف.

الإجابة الصحيحة وليه
Highlight، الاختيار الأول.

ليه كل اختيار صح أو غلط
A. highlight
Highlight يبرز الجزء الخاص بالـSegment مع إبقاء بقية مبيعات الشهر مرئية؛ ده المطلوب.

B. filter
Filter يعرض مبيعات الـSegment وحده ويستبعد الباقي، فيغيّر السؤال من نصيب داخل الإجمالي إلى بيانات الفئة فقط.

C. no impact
No impact يترك الرسم دون أي استجابة، فلن تعرف نصيب الفئة المختارة أصلًا.

الخلاصة اللي تتحفظ
عايز الجزء والكل ظاهرين سوا؟ Highlight. عايز المختار وحده؟ Filter.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-reports-filters-and-highlighting' AND answer_image IS NULL AND correct_json='[0]') OR (id='f1-187-186' AND prompt='A user creates a Power BI report named ReportA that uses a custom theme.

You create a dashboard named DashboardA.

You need to ensure that DashboardA uses the custom theme. The solution must minimize development effort.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.' AND explanation='ترجمة السؤال بالعربي
ReportA له ثيم مخصص، وDashboardA لازم يستخدم نفس الثيم بأقل شغل. اختار خطوتين من الاختيارات.

القصة والمعنى
الألوان والخطوط اتظبطت مرة بالفعل. بدل ما تعيد إدخال الألوان يدويًا في الداشبورد، خُد إعدادات الثيم في ملف واستخدمه هناك. ملف JSON هو الناقل هنا؛ نشر التقرير وحده مش بينقل ثيمه تلقائيًا لكل Dashboard.

مثال نفهم بيه
بدل نسخ لون الشركة #234567 يدويًا عدة مرات، تصدّر JSON وتختاره عند رفع ثيم الداشبورد. راجع البلاطات بعد التطبيق لأن بعض إعدادات التقرير لا تظهر على كل أنواعها بنفس الطريقة.

طريقة التفكير خطوة بخطوة
1. نحفظ الثيم الحالي من ReportA كملف JSON.
2. نرفع JSON theme إلى DashboardA. توثيق Microsoft يسمح بإعادة استخدام ملف ثيم التقرير للداشبورد.
3. نفرّق بين ثيم الداشبورد وبين إعداد إبقاء ثيم التقرير وقت Pin tile؛ بعض أنواع البلاطات لها استثناءات في التنسيق.

الإجابة الصحيحة وليه
B وE: Save the current theme من ReportA، ثم Upload a JSON theme في DashboardA.

ليه كل اختيار صح أو غلط
A. Publish ReportA to Power BI.
نشر ReportA قد يكون مطلوبًا لاستخدامه في الخدمة، لكنه لا يطبّق ثيمه تلقائيًا على DashboardA؛ ليس إحدى خطوتَي نقل الثيم.

B. From ReportA save the current theme.
Save the current theme صحيح؛ يحفظ إعدادات الألوان في ملف يمكن إعادة استخدامه.

C. Publish ReportA to the Microsoft Power BI Community theme gallery.
النشر في Theme gallery يشارك الثيم مع المجتمع ولا يلزم لإعادة استخدام ملف عندك بالفعل.

D. From DashboardA, create a custom theme.
إنشاء ثيم جديد يدويًا ممكن من حيث المبدأ، لكنه يعيد العمل بدل استخدام الثيم الموجود بأقل مجهود.

E. From DashboardA, upload a JSON theme.
Upload a JSON theme صحيح؛ يطبّق ملف الثيم المحفوظ على الداشبورد.

الخلاصة اللي تتحفظ
إعادة استخدام الثيم: احفظ JSON ثم ارفعه. لا تخلط نقل الثيم بمجرد نشر التقرير.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboard-themes' AND answer_image IS NULL AND correct_json='[1,4]') OR (id='f1-188-187' AND prompt='You need to create a visualization that compares revenue and cost over time.

Which type of visualization should you use?' AND explanation='ترجمة السؤال بالعربي
عايز رسم يقارن الإيرادات والتكلفة عبر الزمن. اختار النوع الأنسب من الأربعة.

القصة والمعنى
عايز تعرف في أنهي شهر التكلفة بتقرب من الإيراد، وهل المسافة بينهم بتزيد ولا بتقل. خط للإيراد وخط للتكلفة على نفس محور التواريخ يخلوا المقارنة واضحة.

مثال نفهم بيه
في يناير الإيراد 100 والتكلفة 70، وفي فبراير الإيراد 110 والتكلفة 95. الخطان يوضحان إن الإيراد زاد لكن هامش الفرق قل من 30 إلى 15، من غير جمع الإيراد والتكلفة فوق بعض.

طريقة التفكير خطوة بخطوة
1. الزمن هو المحور الأساسي والمطلوب تتبع تغير سلسلتين.
2. Line chart يعرض خطًا مستقلًا لكل مقياس، فتقارن الاتجاه والقيم عند التاريخ نفسه.
3. المطلوب ليس أجزاء من إجمالي ولا خطوات تؤدي من رصيد بداية لنهاية.

الإجابة الصحيحة وليه
Line chart، الاختيار الثالث.

ليه كل اختيار صح أو غلط
A. waterfall chart
Waterfall مناسب لشرح زيادات ونقصانات توصل من بداية إلى نهاية، لا مقارنة خطَّي Revenue وCost شهريًا.

B. stacked area chart
Stacked area يكدّس القيم فوق بعضها؛ الإيراد والتكلفة ليسا جزأين نريد جمعهما في إجمالي واحد، والمقارنة المباشرة تصبح أصعب.

C. line chart
Line chart يضع السلسلتين على محور زمني مشترك ويبين الاتجاه والفارق بينهما بوضوح.

D. donut chart
Donut يوضح حصصًا من إجمالي عند سياق محدد؛ لا يعرض تغير الإيراد والتكلفة عبر الزمن بوضوح.

الخلاصة اللي تتحفظ
مقارنة اتجاه مقياسين عبر الزمن تبدأ عادة بخطين، لا دائرة حصص ولا تكديس.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-line-chart' AND answer_image IS NULL AND correct_json='[2]') OR (id='f1-189-188' AND prompt='HOTSPOT -

You have a report in Power BI Desktop.

You add a key influencers visual as shown in the exhibit. (Click the Exhibit tab.)

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.

Hot Area:' AND explanation='ترجمة السؤال بالعربي
نتيجة Key influencers تحلل Attrition. مع OverTime = Yes المتوسط 0.30، ومع No هو 0.10. اختار طريقة البحث عن عوامل إضافية، وعدد مرات ارتفاع القيمة عند العمل الإضافي.

القصة والمعنى
عندك نتيجتان: 30 من كل 100 في المجموعة الأولى مقابل 10 من كل 100 في الثانية. فرقهم 20 نقطة مئوية، لكن السؤال عن كام مرة، إذن نقسم. ولو عايزين نختبر أسبابًا إضافية، نضيف مرشحين لمكان العوامل المفسّرة.

مثال نفهم بيه
لو من يعملون إضافيًا فيهم 30 حالة من 100 وغيرهم فيهم 10 من 100، النسبة ثلاثة أمثال. القول إن الزيادة 0.2 مرة يخلط طرح النسب بقسمتها.

طريقة التفكير خطوة بخطوة
1. Explain by هو مكان الأعمدة المرشحة لتفسير تغير المقياس. إضافة عوامل مناسبة قد تكشف علاقات إضافية؛ ليس مضمونًا أن كل عمود سيظهر مؤثرًا.
2. Expand by يغيّر مستوى التحليل في بعض حالات المقاييس المجمعة، وليس قائمة المرشحين التي نضيف إليها عوامل جديدة.
3. النسبة = 0.30 ÷ 0.10 = 3. الفرق المطلق = 0.20، ولا نخلط بينهما.
4. النتيجة ارتباط إحصائي في الداتا المعروضة، لا تجربة تثبت أن العمل الإضافي سبب الاستقالة.

الإجابة الصحيحة وليه
Adding more fields to Explain by؛ ثم 3.

ليه كل اختيار صح أو غلط
A. To identify additional factors that increase attrition: turning on Cross-report
Cross-report متعلق بسياق drillthrough بين تقارير، وليس توسيع قائمة العوامل المرشحة في هذا الرسم.

B. To identify additional factors that increase attrition: adding more fields to Explain by
إضافة حقول إلى Explain by صحيح؛ مثلًا نختبر نوع العقد بجانب OverTime بدل افتراض أنه السبب.

C. To identify additional factors that increase attrition: adding more fields to Expand by
إضافة حقول إلى Expand by قد تغير الحبيبة في تحليل مقياس، لكنها ليست إجابة طلب إضافة عوامل تفسيرية جديدة هنا.

D. To identify additional factors that increase attrition: moving fields from Explain by to Expand by
نقل الحقول من Explain by إلى Expand by يزيلها من مجموعة المرشحين للتفسير؛ لا يضيف عوامل جديدة.

E. Employee attrition is ___ times greater when employees work overtime. 0.11
0.11 ليست نسبة 0.30 إلى 0.10 ولا الفرق بينهما؛ لا يوجد حساب مطلوب يعطيها.

F. Employee attrition is ___ times greater when employees work overtime. .2
.2 هو الفرق المطلق 0.30−0.10، وليس عدد مرات ارتفاع المتوسط.

G. Employee attrition is ___ times greater when employees work overtime. 1
1 يعني أن المجموعتين متساويتان، بينما المتوسط 0.30 مقابل 0.10.

H. Employee attrition is ___ times greater when employees work overtime. 3
3 صحيح: قسمة 0.30 على 0.10 تعطي ثلاثة أمثال؛ ده غير قولنا زيادة 200% أو فرق 20 نقطة مئوية.

الخلاصة اللي تتحفظ
كام مرة؟ اقسم. فرق قد إيه؟ اطرح. وExplain by هو مكان المرشحين للتفسير.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers' AND answer_image IS '/dump-assets/f1-189-188-answer.webp' AND correct_json='[]') OR (id='f1-190-189' AND prompt='You build a report to help the sales team understand its performance and the drivers of sales.

The team needs to have a single visualization to identify which factors affect success.

Which type of visualization should you use?' AND explanation='ترجمة السؤال بالعربي
فريق المبيعات عايز Visual واحد يحدد العوامل المرتبطة بالنجاح ويساعده يفهم أسباب اختلاف الأداء.

القصة والمعنى
المدير مش بيسأل إجمالي المبيعات كام؛ بيسأل إيه اللي بيفرّق الحالات الناجحة عن غيرها: البلد؟ الفئة؟ نوع العميل؟ نحتاج أداة تقارن مرشحين وتعرض أيها يرتبط بالمقياس، بدل ما نخمن السبب من خط مبيعات.

مثال نفهم بيه
نحلل Success = Yes ونضيف Region وProduct Category وCustomer Segment. قد تظهر فئة عملاء مرتبطة بنسبة نجاح أعلى. نراجع حجم العينة والعوامل الأخرى قبل قرار تجاري.

طريقة التفكير خطوة بخطوة
1. اختبار العوامل المؤثرة وترتيبها هو الغرض من Key influencers.
2. نحدد المقياس في Analyze ونضيف العوامل المرشحة إلى Explain by.
3. الأداة تساعد على اكتشاف ارتباطات تستحق التحقيق، ولا تثبت سببية وحدها.

الإجابة الصحيحة وليه
Key influencers، الاختيار الأول.

ليه كل اختيار صح أو غلط
A. Key influencers
Key influencers مخصص لبحث العوامل المرتبطة بارتفاع أو انخفاض المقياس وترتيبها، فيطابق كلمة drivers.

B. Line and clustered column chart
Line and clustered column chart يقارن مقاييس واتجاهات عرضيًا، لكنه لا يجري تلقائيًا تحليل المرشحين ويصنف تأثيرهم.

C. Q&A
Q&A يتيح طرح أسئلة باللغة الطبيعية لبناء أو استكشاف عرض، لكنه ليس البديل المخصص لترتيب العوامل المطلوبة هنا.

D. Funnel chart
Funnel chart يعرض مراحل تحويل مثل Lead إلى Sale، لكنه لا يحدد وحده أي الصفات تفسّر النجاح.

الخلاصة اللي تتحفظ
السؤال عن العوامل drivers، لا مجرد اتجاه أو مراحل؟ اختبر Key influencers مع الانتباه لحدود الاستنتاج.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers' AND answer_image IS NULL AND correct_json='[0]') OR (id='f1-191-190' AND prompt='HOTSPOT -

You have a table that contains the following three columns:

City -

✑ Total Sales

✑ Occupation

You need to create a key influencers visualization as shown in the exhibit. (Click the Exhibit tab.)

How should you configure the visualization? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:' AND explanation='ترجمة السؤال بالعربي
الأعمدة المتاحة City وTotal Sales وOccupation. النتيجة المعروضة تسأل ما الذي يرفع Total Sales، وتعرض أن Occupation = Professional يرتبط بمتوسط أعلى. ضع الحقل المناسب في Analyze وExplain by.

القصة والمعنى
بنحاول نفهم المبيعات، والمهنة أحد التفسيرات المحتملة. يعني المبيعات هي الحاجة اللي بنسأل عنها، والمهنة هي الحاجة اللي بنقارن مجموعاتها. لو بدّلتهم بقيت بتسأل عن المهنة، وده سؤال مختلف.

مثال نفهم بيه
نتخيل متوسط مبيعات مجموعة المقارنة 7,000، ومتوسط Professional هو 10,410. الفرق 3,410 يوضح فكرة الرقم المعروض؛ القيمتان مثال للتوضيح وليستا قيمتين من الرسم.

طريقة التفكير خطوة بخطوة
1. عنوان النتيجة نفسه What influences Total Sales to Increase يحدد المقياس في Analyze.
2. العامل المعروض Occupation is Professional يحدد الحقل الذي قدم المرشحين في Explain by.
3. City يصلح عاملًا إضافيًا في تحليل آخر، لكن النتيجة المطلوبة هنا مبنية على Occupation.
4. رقم £3.41K زيادة في متوسط المقياس مقابل المهن الأخرى، وليس إجمالي مبيعات كل أصحاب المهنة ولا دليل سببية.

الإجابة الصحيحة وليه
Analyze: Total Sales. Explain by: Occupation.

ليه كل اختيار صح أو غلط
A. Analyze: City
City في Analyze يحوّل السؤال إلى تفسير قيمة جغرافية بدل تفسير حجم المبيعات، فلا يعيد النتيجة المطلوبة.

B. Analyze: Occupation
Occupation في Analyze يجعلك تحلل المهنة نفسها، بينما المهنة في الرسم عامل مفسّر للمبيعات.

C. Analyze: Total Sales
Total Sales في Analyze صحيح لأنه المقياس المطلوب تفسير ارتفاع متوسطه.

D. Explain by: City
City في Explain by قد يكون مرشحًا آخر صحيحًا في تحليل مختلف، لكنه لا ينتج وحده العامل المعروض Occupation is Professional.

E. Explain by: Occupation
Occupation في Explain by صحيح؛ منه تأتي فئات Professional وغيرها التي تُقارن في النتيجة.

F. Explain by: Total Sales
Total Sales في Explain by يضع النتيجة نفسها كمرشح لتفسيرها؛ ليس الإعداد الذي يطابق المعروض.

الخلاصة اللي تتحفظ
Analyze = عايز تفهم إيه؟ Explain by = إيه الحقول اللي تختبر ارتباطها به؟

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers' AND answer_image IS '/dump-assets/f1-191-190-answer.webp' AND correct_json='[]') OR (id='f1-192-191' AND prompt='You are using the key influencers visual to identify which factors affect the quantity of items sold in an order.

You add the following fields to the Explain By field:

✑ Customer Country

✑ Product Category

✑ Supplier Country

✑ Sales Employee

✑ Supplier Name

✑ Product Name

✑ Customer City

The key influencers visual returns the results shown in the following exhibit.

What can you identify from the visual?' AND explanation='ترجمة السؤال بالعربي
الرسم يوضح عوامل مرتبطة بارتفاع متوسط عدد الوحدات في الطلب، منها Austria = 18.8 وBoise = 20.37. المطلوب استنتاج واحد تؤيده النتيجة المعروضة.

القصة والمعنى
الفقاعة اللي جنب Austria مش مكتوب عليها %؛ هي زيادة في متوسط عدد الوحدات. معنى 18.8 إن مجموعة النمسا أعلى بهذا القدر من مجموعة المقارنة، مش إن متوسطها كله 18.8 ولا إن الفرق نسبة مئوية.

مثال نفهم بيه
لو متوسط الطلبات خارج النمسا 25، فزيادة 18.8 تعني متوسط النمسا 43.8 في هذا المثال. لا نستنتج 18.8%، ولا نستخدم هذا المثال لتغيير قيم المصدر.

طريقة التفكير خطوة بخطوة
1. المقياس Quantity Per Order عددي، والعنوان يقول average increases by؛ الأرقام فروق في الوحدات.
2. المقارنة في Key influencers تكون مع الحالات الأخرى غير القيمة المختارة، لا بالضرورة المتوسط العام الشامل للقيمة نفسها.
3. Boise = 20.37 وحدات، وبالتالي البديل الذي يحولها إلى percent خطأ.
4. Product Category ضمن المرشحين المدخلين لكن لا يظهر في النتائج المعروضة. إدخاله ليس دليلًا على تأثيره.
5. شريط Cork فوق خط متوسط بقية المدن في الشكل، لا تحته.

الإجابة الصحيحة وليه
A هو البديل المقصود والمدعوم في اتجاهه ووحدته: Austria مرتبطة بزيادة 18.8 وحدة. صياغة average في الاختيار غير دقيقة تمامًا؛ المرجع هو بقية الحالات، وليس المتوسط العام بالضرورة.

ليه كل اختيار صح أو غلط
A. Customers in Austria order 18.8 more units than the average order quantity.
Austria و18.8 وحدة هو الاستنتاج المدعوم من البدائل، مع تصحيح معنى المتوسط المرجعي إلى بقية الحالات لا افتراض متوسط شامل.

B. Customers in Boise order 20.37 percent more than the average order quantity.
Boise يظهر بزيادة 20.37 وحدة لا 20.37%؛ نوع المقياس يغيّر تفسير الرقم.

C. Product Category positively influences the quantity per order.
Product Category أُدخل كحقل مرشح، لكنه غير ظاهر كعامل في النتيجة. لا نحول قائمة الإدخال إلى استنتاج مثبت.

D. Customers in Cork order lower quantities than average.
Cork ليس أقل من خط المتوسط في الرسم المعروض؛ هذا البديل يعكس الاتجاه الظاهر.

الخلاصة اللي تتحفظ
اقرأ وحدة المقياس والمجموعة المرجعية. وجود حقل في Explain by لا يثبت ظهوره كعامل مؤثر.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers' AND answer_image IS NULL AND correct_json='[0]') OR (id='f1-193-192' AND prompt='You have a report that contains four pages. Each page contains slicers for the same four fields.

Users report that when they select values in a slicer on one page, the selections are not persisted on other pages.

You need to recommend a solution to ensure that users can select a value once to filter the results on all the

pages.

What are two possible recommendations to achieve this goal? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.' AND explanation='ترجمة السؤال بالعربي
تقرير أربع صفحات، وفي كل صفحة Slicers لنفس الحقول، لكن الاختيار لا ينتقل لبقية الصفحات. اختار حلين بديلين، كل واحد منهما يحقق فلترة الصفحات كلها.

القصة والمعنى
المستخدم اختار فرع القاهرة في صفحة المبيعات، ففتح صفحة المنتجات ولقى الفلاتر رجعت لكل الفروع. عايز الاختيار يبقى على مستوى التقرير، أو نفس السلايسر يبقى متزامنًا بين الصفحات.

مثال نفهم بيه
اختيار Cairo في سلايسر متزامن ينعكس على صفحات المبيعات والمنتجات والعملاء والمخزون. وفي الحل البديل تختار Cairo من Filters on all pages بدل تكرار سلايسر مستقل في كل صفحة.

طريقة التفكير خطوة بخطوة
1. Sync slicers يزامن حالة الاختيار عبر الصفحات التي فعّلت لها المزامنة. يمكن إخفاء السلايسر في صفحة مع بقاء تأثير المزامنة حسب الإعداد.
2. Report-level filter يطبق نطاق الفلترة نفسه على جميع صفحات التقرير؛ يحقق الهدف من لوحة الفلاتر بدل السلايسرات.
3. السؤال يقول each correct answer presents a complete solution؛ لا يلزم تطبيق الحلين معًا.

الإجابة الصحيحة وليه
B وC: Replace the slicers with report-level filters، أو Sync the slicers across the pages.

ليه كل اختيار صح أو غلط
A. Create a bookmark for each slicer value.
Bookmark لكل قيمة يحفظ حالات معدة مسبقًا، وليس مزامنة تلقائية مرنة لأي اختيار جديد. ومع أربعة حقول تزيد التركيبات والعمل الإداري.

B. Replace the slicers with report-level filters.
Report-level filters حل كامل لأن نطاقها جميع صفحات التقرير، لا الصفحة الحالية فقط.

C. Sync the slicers across the pages.
Sync slicers حل كامل يحافظ على واجهة السلايسرات مع مزامنة الاختيار عبر الصفحات المحددة.

D. Replace the slicers with page-level filters.
Page-level filters تقف عند صفحة واحدة؛ تعيد المشكلة نفسها بدل توفير حالة موحدة للتقرير.

E. Replace the slicers with visual-level filters.
Visual-level filters تخص رسمًا واحدًا؛ نطاقها أضيق بكثير من المطلوب لأربع صفحات.

الخلاصة اللي تتحفظ
كل الصفحات: report filter أو slicers متزامنة. صفحة واحدة: page filter. رسم واحد: visual filter.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-report-add-filter
https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers' AND answer_image IS NULL AND correct_json='[1,2]') OR (id='f1-194-193' AND prompt='You have a report that includes a card visualization.

You need to apply the following conditional formatting to the card while minimizing design effort:

✑ For values that are greater than or equal to 100, the font of the data label must be dark red.

✑ For values that are less than 100, the font of the data label must be dark gray.

Which type of format should you use?' AND explanation='ترجمة السؤال بالعربي
Card تعرض قيمة. عايزين لون رقمها أحمر غامق عند 100 أو أكثر، ورمادي غامق تحت 100، بأقل مجهود تصميم.

القصة والمعنى
دي بوابة بشرط واحد: وصلت 100؟ اللون أحمر. لسه أقل؟ رمادي. مش محتاجين نقيس تدريج الألوان، ولا نكتب measure جديدة ترجع كود لون طالما واجهة القواعد تحقق الشرط.

مثال نفهم بيه
99.99 رمادي، و100 أحمر، و150 أحمر. لو كتبت greater than 100 بدل greater than or equal to 100 سيقع الحد نفسه في الفئة الخطأ.

طريقة التفكير خطوة بخطوة
1. المطلوب مجموعتان منفصلتان بحد رقمي واضح، لا تدرج مستمر.
2. Rules تسمح بحدود رقمية تطبق اللون مباشرة. استخدم Number عندما المقصود حد فعلي 100، لا Percent أو Percentile.
3. تأكد أن 100 تدخل في الفئة الحمراء: >=100 لا >100. أسماء إعدادات الـCard تغيرت عبر الإصدارات، لكن منطق القاعدة نفسه.

الإجابة الصحيحة وليه
Rules، الاختيار الثاني.

ليه كل اختيار صح أو غلط
A. Color scale
Color scale تدرج اللون بحسب موقع القيمة بين حدود، بينما المطلوب لونان ثابتان عند حد 100.

B. Rules
Rules هو الأنسب لشرطين واضحين، ويجنبك كتابة حساب ألوان إضافي.

C. Field value
Field value ينفع إذا عندك حقل يعيد اسم لون أو HEX، لكنه يضيف حسابًا غير لازم هنا ولا يقلل مجهود التصميم.

الخلاصة اللي تتحفظ
حدود صريحة مع ألوان منفصلة؟ Rules. راجع دائمًا هل الحد مشمول، وهل الوحدة Number أم Percent.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-table-formatting
https://learn.microsoft.com/en-us/power-bi/create-reports/conditional-format-visuals' AND answer_image IS NULL AND correct_json='[1]') OR (id='f1-195-194' AND prompt='DRAG DROP -

You have a Power BI dashboard named DashboardA that contains a tile named TileA. TileA contains a treemap

visual from a report named ReportA.

You need to provide the users of DashboardA with additional tiles that relate to the contents of TileA.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.

Select and Place:' AND explanation='ترجمة السؤال بالعربي
DashboardA فيه Treemap tile اسمها TileA من ReportA. عايزين نضيف بلاطات مفيدة مرتبطة ببيانات TileA، بترتيب ثلاث خطوات.

القصة والمعنى
بدل ما تبدأ تقريرًا جديدًا، خلي الخدمة تستكشف بيانات البلاطة الموجودة وتقترح أشكالًا مرتبطة بها. شوف المقترحات الأول، وبعدها ثبت اللي ينفع للفريق على الداشبورد.

مثال نفهم بيه
بلاطة إجمالي المبيعات قد ينتج عنها insight يوضح فرقًا غير معتاد بين فئات. تقارن الرسم بالسياق ثم تثبته إذا كان مفيدًا؛ لا تثبت كل مقترح تلقائيًا.

طريقة التفكير خطوة بخطوة
1. ابدأ من خيارات TileA داخل DashboardA واختر View insights.
2. التحليل يفتح في Focus mode؛ راجع الرسومات التي وُلدت على بيانات البلاطة.
3. Pin للرسومات المناسبة يضيفها إلى DashboardA. مش معنى ظهور insight إنه مضمون مفيد أو دليل سببي.

الإجابة الصحيحة وليه
View insights من TileA → Review generated visuals في Focus mode → Pin relevant visuals إلى DashboardA. ترتيب الاختيارات 3 ثم 2 ثم 1.

ليه كل اختيار صح أو غلط
A. From Focus mode, pin the relevant visuals to DashboardA.
Pin relevant visuals خطوة صحيحة لكنها الأخيرة؛ لازم الرسومات تتولد وتتراجع قبل تثبيتها.

B. From Focus mode, review the generated visuals.
Review generated visuals خطوة المنتصف بعد تشغيل View insights، وليست نقطة البداية.

C. From DashboardA, select the TileA options, and then select View insights.
View insights من خيارات TileA هي البداية المطابقة لطلب تحليل بيانات البلاطة الحالية.

D. From ReportA, select the treemap visual options, and then select Spotlight.
Spotlight يبرز الرسم بصريًا داخل التقرير، ولا يولد بلاطات تحليلية جديدة مرتبطة بالداشبورد.

E. From ReportA, select Get Insights.
Get Insights من ReportA ليس المسار المعروض هنا؛ المطلوب بدء تحليل البلاطة عبر View insights ثم تثبيت نتائجه.

الخلاصة اللي تتحفظ
للرسومات المقترحة من بلاطة: شغّل Insights، راجع الناتج، ثم Pin. Spotlight مجرد إبراز.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/explore-reports/end-user-insights' AND answer_image IS '/dump-assets/f1-195-194-answer.webp' AND correct_json='[2,1,0]') OR (id='f1-196-195' AND prompt='You are creating a dashboard by using the Power BI service.

You have an existing report page that contains three charts.

You need to add the charts to the dashboard while maintaining the interactivity between the charts.

What should you do?' AND explanation='ترجمة السؤال بالعربي
صفحة تقرير فيها ثلاثة Charts. عايزين إضافتهم لداشبورد مع بقاء التفاعل بينهم في خدمة Power BI.

القصة والمعنى
لو صورت كل رسم وثبتّه لوحده، الثلاثة موجودين لكن الصفحة الأصلية اللي كانت بتربط الاختيارات بينهم مش هي نفسها موجودة. تثبيت الصفحة Live يحافظ على الصفحة كوحدة واحدة بدل ثلاث لقطات منفصلة.

مثال نفهم بيه
في الداشبورد على الويب، اختيار عمود فرع القاهرة داخل الصفحة المثبتة يغيّر الرسوم الأخرى وفق interactions التقرير. تثبيت كل Chart منفردًا لا يضمن هذا السلوك بينها.

طريقة التفكير خطوة بخطوة
1. الشرط هو بقاء interactivity بين الرسومات، لا مجرد إظهارها.
2. Pin report page as live tile ينقل صفحة قابلة للتفاعل داخل Dashboard في خدمة الويب.
3. تعديل Edit interactions يحدد سلوك الرسومات داخل التقرير، لكنه لا يجعل البلاطات العادية صفحة حية.
4. تنبيه مهم: وثيقة Microsoft تذكر أن report tiles ليست تفاعلية داخل تطبيقات الموبايل؛ لا نعمّم تجربة خدمة الويب على الهاتف.

الإجابة الصحيحة وليه
Pin the report page as a live tile، الاختيار الرابع.

ليه كل اختيار صح أو غلط
A. Edit interactions in the report and set all interactions to Filter.
ضبط interactions إلى Filter يغير التقرير الأصلي فقط، ولا يحقق طريقة التثبيت المطلوبة على الداشبورد.

B. Pin each chart as a tile.
Pin each chart ينشئ بلاطات منفصلة، لا صفحة واحدة تحتفظ بتفاعل الرسومات الداخلي.

C. Edit the dashboard theme and pin each chart as a tile.
ثيم الداشبورد يخص المظهر. تغيير الألوان مع تثبيت كل رسم لا يعالج شرط التفاعل.

D. Pin the report page as a live tile.
Pin live page هو الحل المطابق في خدمة الويب؛ ينقل الرسومات معًا داخل صفحة حية.

الخلاصة اللي تتحفظ
إظهار الرسومات وحده غير الحفاظ على تفاعلها. للصفحة الحية استخدم Pin live page، وراجع قيود الموبايل.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboard-pin-live-tile-from-report' AND answer_image IS NULL AND correct_json='[3]') OR (id='f1-197-196' AND prompt='HOTSPOT -

You need to create a visual as shown in the following exhibit.

The indicator color for Total Sales will be based on % Growth to Last Year.

The solution must use the existing calculations only.

How should you configure the visual? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:' AND explanation='ترجمة السؤال بالعربي
جدول فيه Total Sales وSales Last Year و% Growth. خلفية Total Sales تتلون حسب % Growth، باستخدام الحسابات الموجودة فقط. اختار نوع التنسيق وطريقة تحديده.

القصة والمعنى
لون خلية المبيعات مش لازم ييجي من رقم المبيعات نفسه. ممكن شهر يبيع أقل من غيره لكن نموه أفضل، فنلون المبيعات حسب نسبة النمو. النسبة رقم موجود بالفعل؛ نحوله إلى فئات ألوان بقواعد.

مثال نفهم بيه
November وDecember في المصدر نموهما 0% وخلفية المبيعات حمراء. بعض الشهور خلفيتها صفراء وأخرى تركواز. ده يوضح فئات لونية، ولا يفرض من الصورة وحدها رقم الحد الفاصل بين كل فئتين.

طريقة التفكير خطوة بخطوة
1. المصدر يبين خلفية خلايا Total Sales ملونة، لا لون الخط ولا أيقونات. نختار Background color.
2. في Based on field نستخدم % Growth to Last Year رغم أن الخلايا التي ننسقها تخص Total Sales.
3. Rules تقارن النسبة بحدود وتختار ألوانًا منفصلة. لا تحتاج measure إضافية ترجع HEX.
4. Field value يحتاج قيمة تمثل اللون نفسه؛ النسبة 0.63 ليست كود لون.
5. السؤال لا يحدد الحدود الرقمية التفصيلية للقواعد، فلا نخترعها. ونسب النمو في المصدر معروضة كما هي، لا نستبدل صيغتها بحساب آخر.

الإجابة الصحيحة وليه
Conditional formatting: Background color. Format by: Rules. اختَر % Growth to Last Year كحقل الأساس.

ليه كل اختيار صح أو غلط
A. Conditional formatting: Background color
Background color صحيح لأن المساحة وراء الرقم هي التي تتلون في المطلوب.

B. Conditional formatting: Data bars
Data bars تضيف شريطًا يمثل مقدارًا داخل الخلية؛ لا تطابق خلفية الخلية المصمتة.

C. Conditional formatting: Font color
Font color يلون الرقم نفسه، لا الخلفية الظاهرة في المصدر.

D. Conditional formatting: Icons
Icons تضيف رموزًا كالسهم أو الدائرة؛ لا تحقق شكل تعبئة الخلفية المطلوب.

E. Conditional formatting: Web URL
Web URL يحدد روابط قابلة للفتح، وليس اختيار ألوان خلايا المبيعات.

F. Format by: Color scale
Color scale يعطي تدرجًا؛ المعروض ألوان فئات. لا نختاره بدل القواعد المطلوبة لإعادة الفئات.

G. Format by: Field value
Field value مناسب إذا حقل موجود يرجع لونًا صالحًا مثل #FF0000. الموجود هنا نسبة رقمية، والشرط يمنع إنشاء حساب ألوان جديد.

H. Format by: Rules
Rules صحيح لأنه يستخدم المقياس العددي الموجود لتعيين لون كل فئة، من غير حساب جديد.

الخلاصة اللي تتحفظ
الخلية التي نلوّنها شيء، والحقل الذي نقرر اللون منه شيء آخر. نسبة موجودة + فئات ألوان = Rules.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-table-formatting' AND answer_image IS '/dump-assets/f1-197-196-answer.webp' AND correct_json='[]') OR (id='f1-198-197' AND prompt='DRAG DROP -

You are using existing reports to build a dashboard that will be viewed frequently in portrait mode on mobile

phones.

You need to build the dashboard.

Which four actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.

Select and Place:' AND explanation='ترجمة السؤال بالعربي
عايز تبني Dashboard من تقارير موجودة، والمستخدمون سيشاهدونه غالبًا بالهاتف في وضع Portrait. رتّب أربع خطوات الإعداد.

القصة والمعنى
الأول نحط البلاطات على الداشبورد، وبعدها نمسك نسخة عرضه للهاتف ونرتبها تحت بعض بحجم مقروء. تجهيز Phone layout للتقرير نفسه مش هو ترتيب بلاطات الداشبورد؛ دول سطحان مختلفان.

مثال نفهم بيه
نثبت المبيعات وهامش الربح والمناطق، ثم نجعل بطاقتي الأرقام أولًا ورسم المناطق أسفلهما. لو أخفينا بلاطة من Phone layout تظل متاحة في تخطيط الويب.

طريقة التفكير خطوة بخطوة
1. Pin items من التقارير ينشئ محتوى الداشبورد الذي سنرتبه.
2. افتح الداشبورد ثم Edit mobile view أو Mobile layout بحسب واجهة الإصدار.
3. أعد ترتيب البلاطات أو تغيير حجمها أو إخفاء ما لا يلائم شاشة Portrait.
4. إزالة بلاطة من تخطيط الهاتف لا تعني حذف بياناتها أو حذفها من تخطيط الويب. المنظر الأفقي يعود لتخطيط الداشبورد الأساسي.

الإجابة الصحيحة وليه
Pin items → Open dashboard → Edit dashboard mobile view → Rearrange/resize/remove items from mobile layout. ترتيب الاختيارات 1 ثم 2 ثم 4 ثم 5.

ليه كل اختيار صح أو غلط
A. Pin items from the reports to the dashboard.
Pin items البداية المطلوبة لتوفير البلاطات داخل الداشبورد قبل ترتيب نسخة الهاتف.

B. Open the dashboard.
Open dashboard خطوة تالية كي تدخل إعدادات الداشبورد الذي بنيته، لا إعدادات تقرير منفصل.

C. Create a phone layout for the existing reports.
Create a phone layout للتقارير يعالج صفحات التقارير، بينما السؤال عن بلاطات Dashboard؛ هذا البديل يخلط مستويين.

D. Edit the Dashboard mobile view.
Edit dashboard mobile view صحيح بعد فتح الداشبورد، وهو وضع تعديل ترتيب البلاطات للهاتف.

E. Rearrange, resize, or remove items from the mobile layout.
Rearrange/resize/remove من تخطيط الموبايل هي الخطوة الأخيرة لتناسب شاشة Portrait؛ لا نحذف مصدر البيانات.

الخلاصة اللي تتحفظ
Phone layout للتقرير مختلف عن Mobile layout للداشبورد. رتّب العنصر الذي سأل عنه السؤال فعلًا.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/create-reports/service-create-dashboard-mobile-phone-view' AND answer_image IS '/dump-assets/f1-198-197-answer.webp' AND correct_json='[0,1,3,4]') OR (id='f1-199-198' AND prompt='You plan to create the chart shown in the following exhibit.

How should you create the dashed horizontal line denoting the 40th percentile of daily sales for the period shown?' AND explanation='ترجمة السؤال بالعربي
الرسم فيه مبيعات يومية وخط أفقي متقطع يحدد المئين الأربعين للفترة المعروضة. كيف تنشئ الخط؟

القصة والمعنى
رتب أيام البيع من الأقل للأعلى. المئين الأربعون علامة داخل التوزيع، مش 40% من مجموع الفلوس. عايزين علامة تتغير مع الأيام المعروضة، مش خطًا ثابتًا نسخناه من لقطة قديمة.

مثال نفهم بيه
لو مبيعات خمسة أيام 10 و20 و30 و40 و50، فالمئين 40 ليس 40% من إجمالي 150. هو موضع داخل ترتيب الأيام، وقد يكون قيمة بين يومين حسب طريقة حساب المئين.

طريقة التفكير خطوة بخطوة
1. Percentile line في Analytics pane يحسب المئين اعتمادًا على مقياس الرسم والتوزيع المعروض.
2. نختار Total Sales والمئين 40؛ بعض الواجهات تعرض 40 لا 0.40 في هذا الحقل، فلا تخلطه بمعامل DAX.
3. PERCENTILEX على صفوف Sales قد يحسب توزيع معاملات البيع لا إجماليات الأيام. نحتاج حبيبة يومية صحيحة لو قررنا بناء DAX بديلًا.
4. 24,000 قيمة ثابتة لا تعيد الحساب إذا تغيرت الفترة أو الفلاتر. توفر Percentile line نفسه له قيود حسب الاتصال ونوع الرسم.

الإجابة الصحيحة وليه
C: Add a new percentile line using Total Sales and the 40th percentile.

ليه كل اختيار صح أو غلط
A. Add a measure to the visual that uses the following DAX expression. Measure1 = PERCENTILEX.INC (Sales,sales[Total Sales],0.40)
PERCENTILEX.INC على Sales يتكرر على صفوف المعاملات كما هي. من غير تجميعها إلى اليوم قد يحسب توزيعًا مختلفًا عن المبيعات اليومية، وإضافته للرسم ليست أبسط خط Analytics المطلوب.

B. Add a measure to the visual that uses the following DAX expression. Measure1 = PERCENTILEX.EXC (Sales,sales[Total Sales],0.40)
PERCENTILEX.EXC له اختلاف حسابي عن INC، لكنه ما زال يستخدم جدول التكرار المعطى. تغيير INC إلى EXC لا يصلح حبيبة صفوف Sales وحده.

C. Add a new percentile line that uses Total Sales as the measure and 40% as the percentile.
Percentile line هو الإعداد المباشر المطلوب للمئين على المقياس في الرسم، بدل بناء measure لا تراعي حبيبة الأيام.

D. Create a horizontal line that has a fixed value of 24,000.
خط ثابت 24,000 قد يشبه لقطة معينة فقط؛ لن يتبع المئين بعد تغيير الفترة أو السياق.

الخلاصة اللي تتحفظ
المئين متعلق بتوزيع القيم لا نسبة من مجموعها. راجع هل القيم صفوف مبيعات أم إجماليات أيام.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane' AND answer_image IS NULL AND correct_json='[2]') OR (id='f1-200-199' AND prompt='You are building a Power BI report.

Users will view the report by using their mobile device.

You need to configure the report to display data based on each user''s location.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.' AND explanation='ترجمة السؤال بالعربي
المستخدمون يفتحون التقرير بتطبيق Power BI على الهاتف، والمطلوب إتاحة فلترة حسب موقع المستخدم الجغرافي. اختار خطوتين من البدائل.

القصة والمعنى
مدير المبيعات وصل مدينة معينة وعايز يشوف البيانات المرتبطة بمكانه. اسم City وحده في ملف Excel مش كفاية؛ لازم Power BI يعرف أن العمود يمثل مدينة، وأن الرسوم المطلوبة مرتبطة فعلًا بهذه الجغرافيا.

مثال نفهم بيه
City قد يظل Data Type = Text، لكن Data Category = City. بعد النشر لتطبيق الهاتف، يمكن فلترة التقرير للموقع حيث توجد بيانات. صلاحيات المستخدم الأمنية تظل مستقلة ولا تتغير لأنه انتقل لمدينة أخرى.

طريقة التفكير خطوة بخطوة
1. نحدد Data Category الصحيحة للأعمدة: City أو Country/Region أو State/Province مثلًا. ده توصيف دلالي، مش تحويل Data Type إلى رقم أو تاريخ.
2. نستخدم حقول الجغرافيا في الرسومات المطلوبة كي يتوفر سياق جغرافي للعرض والفلترة. المقصود في الاختيارات B وD.
3. صياغة geography data type في المصدر فضفاضة؛ في هذا السياق نتكلم عن Data Category، وليس نوع تخزين Geography مستقل في موديل Power BI.
4. كلمة all visuals أوسع من التوثيق: ليس مطلوبًا وضع City كعمود ظاهر داخل كل Card؛ المهم دعم الفلترة والعلاقات للرسوم المطلوبة.
5. راجع قيود الميزة: الوثيقة تشترط أسماء جغرافية بالإنجليزية وعمودًا واحدًا لكل فئة جغرافية، والموقع لا يُعامل كبديل لـRLS.

الإجابة الصحيحة وليه
B وD هما الاختياران المقصودان: تعيين geographic Data Category ثم استخدام حقول الجغرافيا في الرسومات. نوضح تحفظ الصياغة ولا نطلب إضافة مدينة ظاهرًا داخل كل رسم دون داعٍ.

ليه كل اختيار صح أو غلط
A. From Power Query Editor, detect the data types of the relevant columns.
Detect data types يفرق بين Text وNumber وDate، لكنه لا يقرر وحده أن نصًا ما اسم مدينة مطلوب لميزة الموقع.

B. In Data Category, set the geographic data category for the relevant columns.
تعيين geographic Data Category صحيح؛ يوضح المعنى الجغرافي لكل عمود مناسب.

C. Create a hierarchy for columns of the geography data type.
Hierarchy قد تنظم Country ثم City، لكنها لا تقوم مقام Data Category ولا تضبط ميزة الموقع وحدها.

D. Use the columns of the geography data type in all visuals.
استخدام حقول الجغرافيا في الرسومات هو الإجراء المقصود مع B. اقرأ all visuals بحذر: الوثيقة لا توجب إظهار نفس الحقل داخل كل رسم أو تغيير نوع تخزينه.

E. For the relevant columns, set synonyms to match common geographical terms.
Synonyms تفيد في فهم المصطلحات عند السؤال باللغة الطبيعية، ولا تفعّل فلترة الموقع للهاتف بدل تصنيف الأعمدة.

الخلاصة اللي تتحفظ
Data Type غير Data Category. فلترة GPS وسيلة عرض، وليست وسيلة تأمين البيانات للمستخدم.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-mobile-geofiltering' AND answer_image IS NULL AND correct_json='[1,3]');
