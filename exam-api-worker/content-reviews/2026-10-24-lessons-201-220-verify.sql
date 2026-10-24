SELECT COUNT(*) AS matching_reviewed_rows FROM question_bank WHERE (id='f1-201-200' AND prompt='You have a report that contains a donut chart and a clustered column chart. Interactions between the visuals use

the default settings.

You need to modify the report so that when you select a column in the column chart, the donut chart redraws by

using the data from the selected column.

What should you do?' AND explanation='ترجمة السؤال بالعربي
عندك Donut chart ورسم أعمدة مجمّعة، والتفاعلات بالإعداد الافتراضي. المطلوب لما تختار عمود، الدونات يُعاد رسمها ببيانات العمود المختار فقط. تختار أنهي رسم وتغيّر أنهي تفاعل؟

القصة والمعنى
تخيّل الأعمدة فروع الشركة، والدونات توزيع المنتجات. ضغطت فرع القاهرة وعايز الدونات كلها تمثل مبيعات القاهرة، بدل ما تشوف مبيعات الشركة كلها وجزء القاهرة متلوّن جواها. يبقى عايز Filter، والسؤال المتبقي: بنبدأ منين؟ من الرسم اللي المستخدم هيضغط عليه.

مثال نفهم بيه
الشركة باعت 100 قطعة: القاهرة 30 والإسكندرية 70. بعد Filter القاهرة، الدونات توزّع الـ30 على المنتجات. في Highlight يفضل سياق الـ100 ويظهر نصيب القاهرة مميزًا؛ الشكلان لا يقولان نفس الحكاية.

طريقة التفكير خطوة بخطوة
1. حدد المصدر أولًا: الاختيار يحدث في Column chart، لذلك تختاره قبل Edit interactions.
2. أيقونات التفاعل تظهر فوق الرسومات الأخرى؛ على Donut chart تختار Filter لأنها الوجهة المطلوبة.
3. Filter يعيد حساب عرض الوجهة في نطاق الاختيار، بينما Highlight يوضح الجزء المختار مع إبقاء سياق الإجمالي.
4. التفاعل اتجاهي؛ إعداد Donut إلى Column لا يضبط تلقائيًا الاتجاه العكسي. None يلغي التأثير بدل تحقيقه.

الإجابة الصحيحة وليه
B. Select the column chart and set the donut chart interaction to Filter.

ليه كل اختيار صح أو غلط
A. Select the donut chart and set the column chart interaction to Filter.
اختيار الدونات وضبط الأعمدة على Filter يضبط الاتجاه العكسي: الضغط على الدونات يؤثر في الأعمدة. المستخدم في السؤال يضغط عمودًا.

B. Select the column chart and set the donut chart interaction to Filter.
صحيح؛ تختار الأعمدة كمصدر للتفاعل، ثم تضبط الدونات المستقبلة على Filter لتعرض نطاق العمود المختار.

C. Select the donut chart and set the column chart interaction to None.
يضبط الاتجاه العكسي وفوق ذلك None يمنع التأثير؛ لا يحقق إعادة رسم الدونات بالاختيار.

D. Select the column chart and set the donut chart interaction to None.
المصدر هنا صحيح لكن None يلغي استجابة الدونات للعمود، بينما المطلوب استجابتها بالفلترة.

الخلاصة اللي تتحفظ
اختار الرسم اللي هتضغط عليه، وعدّل الأيقونة فوق الرسم اللي عايزه يتأثر.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions' AND answer_image IS NULL AND correct_json='[1]') OR (id='f1-202-201' AND prompt='HOTSPOT -

You have a report page that contains the visuals shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.

Hot Area:' AND explanation='ترجمة السؤال بالعربي
الصورة تعرض صفحة فيها Line chart وخريطة وأعمدة، مع أيقونات Edit interactions. أكمل: اختيار ربع سنة على الخط يعمل إيه في الأعمدة؟ واختيار نقطة من خط Tailspin Toys يعمل إيه في الخريطة؟

القصة والمعنى
دي مش مسابقة نحفظ فيها إن كل الرسومات بتفلتر بعض. صاحب التقرير يقدر يمنع التأثير على رسم ويسمح به على رسم تاني. الدليل عندك فوق كل رسم مستقبِل: الأيقونة الغامقة هي الإعداد المتفعّل.

مثال نفهم بيه
اخترت Tailspin Toys في ربع معين: الخريطة تتقيّد بالنطاق الذي أرسلته النقطة، لكن الأعمدة تحتفظ بعرضها السابق لأن التفاعل الوارد لها مضبوط على None. ده مثال على نتيجة الإعدادات، مش عطل في التقرير.

طريقة التفكير خطوة بخطوة
1. فوق الأعمدة أيقونة None، شكل الدائرة المشطوبة، هي المتفعّلة. إذن اختيار ربع سنة من الخط لا يغيّر الأعمدة.
2. فوق الخريطة أيقونة Filter هي المتفعّلة؛ نقطة Tailspin Toys ترسل نطاق الاختيار إلى الخريطة.
3. لا نستبدل إعدادات الصورة بافتراض الإعداد الافتراضي؛ السؤال يقول بناءً على المعروض.
4. الخريطة الأصلية في السؤال تستقبل Cross-filter، وليست وجهة Cross-highlight. عدم تأثير الخط في الأعمدة لا يعني أنه لا يؤثر في أي رسم.

الإجابة الصحيحة وليه
الأولى: not affect. الثانية: cross-filter.

ليه كل اختيار صح أو غلط
A. Selecting a quarter on the line chart will ___ the clustered column chart. cross-filter
Cross-filter للأعمدة كان يبقى صحيحًا لو أيقونة القمع عليها مفعّلة، لكن الصورة مفعّل فيها None.

B. Selecting a quarter on the line chart will ___ the clustered column chart. cross-highlight
Cross-highlight للأعمدة اختيار ممكن لهذا النوع في إعداد آخر، لكن أيقونته ليست الإعداد النشط في الصورة.

C. Selecting a quarter on the line chart will ___ the clustered column chart. not affect
not affect صحيح للأعمدة؛ أيقونة None النشطة تمنع تأثير تحديد الخط عليها.

D. Selecting a Tailspin Toys data point on the line chart will ___ the map. cross-filter
cross-filter صحيح للخريطة؛ القمع النشط يعني عرض البيانات ضمن نطاق النقطة المختارة.

E. Selecting a Tailspin Toys data point on the line chart will ___ the map. cross-highlight
cross-highlight ليس الإعداد الظاهر، والخريطة الأصلية هنا لا تدعم استقبال هذا النمط من التفاعل.

F. Selecting a Tailspin Toys data point on the line chart will ___ the map. not affect
not affect للخريطة يخالف القمع النشط فوقها؛ لا تنقل None الخاص بالأعمدة إلى الخريطة.

الخلاصة اللي تتحفظ
في أسئلة التفاعل اقرأ الأيقونة النشطة فوق كل وجهة، مش نوع الرسم بس.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions' AND answer_image IS '/dump-assets/f1-202-201-answer.webp' AND correct_json='[]') OR (id='f1-203-202' AND prompt='You are creating a Power BI report by using Power BI Desktop.

You need to include a visual that shows trends and other useful information automatically. The visual must update

based on selections in other visuals.

Which type of visual should you use?' AND explanation='ترجمة السؤال بالعربي
بتعمل تقرير في Desktop وعايز Visual يلخص الاتجاهات والمعلومات المفيدة تلقائيًا، ويتغير ملخصه لما المستخدم يحدد بيانات في الرسومات الأخرى. تختار أنهي نوع؟

القصة والمعنى
المدير مش عايز يقعد يفسّر كل خط بنفسه. عايز تحت الرسم كلام يقول إن المبيعات زادت وإن أعلى فرع هو كذا، ولما يختار منتج يتغير الكلام ليحكي عن المنتج ده. ده دور Smart narrative.

مثال نفهم بيه
الصفحة على كل الفروع تقول المبيعات زادت من 100 إلى 120، أي 20%. بعد فلترة القاهرة إلى 40 ثم 44، الملخص المناسب يصبح زيادة 10%. الأرقام للتوضيح، والمغزى إن النص تابع للفلتر وليس فقرة ثابتة.

طريقة التفكير خطوة بخطوة
1. المطلوب ملخص نصي تلقائي للاتجاهات، لا إجابة على سؤال يكتبه المستخدم ولا تفكيك مقياس إلى فروع.
2. Smart narrative يستخدم ملخصات وقيمًا ديناميكية تتحدث مع Cross-filtering من الرسومات الأخرى.
3. الوثائق الحالية تسميه Narrative visual وتعرض Custom وCopilot؛ اختيار السؤال Smart narrative لا يشترط شراء Copilot لمجرد فهم الميزة المقصودة.
4. الملخص مرتبط بالبيانات والسياق المتاح؛ ليس وعدًا بتفسير سببي أو تلخيص أي نوع Visual دون قيود.

الإجابة الصحيحة وليه
B. smart narrative.

ليه كل اختيار صح أو غلط
A. Q&A
Q&A ينطلق من سؤال بلغة طبيعية يكتبه المستخدم ليُنتج إجابة أو رسمًا؛ ليس الملخص النصي التلقائي المطلوب هنا.

B. smart narrative
Smart narrative هو المطلوب؛ يلخص الرسومات واتجاهاتها بنص وقيم قابلة للتحديث مع الفلترة.

C. key influencers
Key influencers يبحث عن عوامل مرتبطة بنتيجة مثل زيادة المبيعات؛ لا يقدّم نفس وظيفة تلخيص الصفحة نصيًا.

D. decomposition tree
Decomposition tree يتيح تفكيك المقياس عبر أبعاد متعددة. مناسب للاستكشاف، لا بديل مباشر للملخص السردي المطلوب.

الخلاصة اللي تتحفظ
عايز التقرير يحكي ملخص أرقامه المتغير؟ Smart narrative، مش Q&A.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-smart-narrative' AND answer_image IS NULL AND correct_json='[1]') OR (id='f1-204-203' AND prompt='In Power BI Desktop, you have a dataset that contains a table.

You create a table visual on a Power BI report page as shown in the following exhibit.

You need to configure the visual to display the referenced image instead of the URL in the Plant Image column.

What should you do?' AND explanation='ترجمة السؤال بالعربي
عمود Plant Image في Table visual بيعرض روابط الصور مكتوبة. عايز مكان الرابط تظهر صورة النبات نفسها. تغيّر إيه؟

القصة والمعنى
الرابط مكتوب صح، لكن البرنامج بيتعامل معاه كنص. محتاج تقول له: النص ده عنوان صورة، ارسم محتواه جوه الخلية. مش محتاج تحوّل كل رابط لملف ثنائي أو تضيف صورة ثابتة لكل صف.

مثال نفهم بيه
صف Rose فيه رابط rose.png وصف Mint فيه mint.png. Image URL يخلي كل صف يعرض صورته المرتبطة به. Web URL يترك وسيلة للوصول للرابط بدل عرض محتواه كصورة.

طريقة التفكير خطوة بخطوة
1. اختار عمود Plant Image واضبط Data category على Image URL، ثم استخدمه في الجدول.
2. Data category تصف معنى القيمة وطريقة استخدامها؛ Data type يصف نوع التخزين. الرابط يظل قيمة نصية.
3. Web URL وURL icons يجعلان الوصول للرابط مناسبًا للنقر، ولا يطلبان عرض الصورة داخل الخلية.
4. لازم الرابط يشير لصورة يمكن تحميلها في بيئة العرض؛ التصنيف لا يصلح رابطًا مكسورًا أو يلغي صلاحيات المصدر. توجد استثناءات مدعومة مثل روابط OneLake، فلا نعمم شرط الإتاحة العامة على كل المصادر الحديثة.

الإجابة الصحيحة وليه
D. Set the Data category of the Plant Image field to Image URL.

ليه كل اختيار صح أو غلط
A. From the Formatting tab, select Values, and then set URL icons to On for the table.
URL icons تعرض رمز رابط للنقر بدل نصه، وليست صور النباتات المطلوبة داخل الصفوف.

B. Set the Data category of the Plant Image field to Web URL.
Web URL يصنّف القيمة كرابط ويب؛ المطلوب تصنيف أكثر تحديدًا هو Image URL لعرض الصورة.

C. Set the Data type of the Plant Image field to Binary.
Binary ليس تصنيف رابط الصورة. تحويل نص عنوان ويب إلى هذا النوع لا يأمر Table visual بتحميل الصورة وعرضها.

D. Set the Data category of the Plant Image field to Image URL.
Image URL صحيح؛ يحدد أن قيم هذا العمود روابط صور ينبغي عرضها في الـvisual الداعم.

الخلاصة اللي تتحفظ
رابط يُعرض كصورة = Image URL في Data category، وليس Binary أو URL icons.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-images-tables' AND answer_image IS NULL AND correct_json='[3]') OR (id='f1-205-204' AND prompt='DRAG DROP -

You have a Microsoft Excel spreadsheet named Excel1 that contains survey results.

You have a Power BI dashboard named DashboardA that has Q&A enabled.

You need to ensure that users who can access DashboardA can ask questions based on the contents of Excel1 and

pin visuals based on their queries to

DashboardA. The solution must minimize development time.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.

Select and Place:' AND explanation='ترجمة السؤال بالعربي
عندك نتائج استبيان في Excel1 وDashboardA فيه Q&A. عايز من لديهم الوصول يسألوا عن بيانات الملف ويثبتوا الرسومات الناتجة على نفس الداشبورد، بأقل وقت تطوير. رتّب ثلاث خطوات من البدائل.

القصة والمعنى
Q&A محتاج موديل يفهم أعمدته، مش مجرد شكل خلايا ظاهر على الداشبورد. في سياق السؤال القديم: نظّم البيانات كجدول، استوردها كموديل، وبعدها ثبّت Tile منه على DashboardA عشان يبقى مرتبطًا بمصدر الاستبيان.

مثال نفهم بيه
لو الاستبيان فيه Department وRating، نريد سؤالًا مثل average Rating by Department ينتج رسمًا من الموديل. مجرد تثبيت الخلايا لا يمنح محرك Q&A جدولًا جديدًا يفهمه. المثال يشرح الفرق ولا يغيّر أسماء أعمدة السؤال غير المعروضة.

طريقة التفكير خطوة بخطوة
1. ابدأ داخل Excel بتنسيق نطاق البيانات كـTable له أعمدة واضحة؛ هذه خطوة من قائمة السؤال وليست إنشاء Named range فقط.
2. استورد Excel1 كـdataset، وهو الاسم القديم لـsemantic model. رفع workbook لعرضه ليس هو نفس استيراد بياناته إلى موديل.
3. أضف Tile قائمًا على الموديل إلى DashboardA؛ بذلك يمكن لـQ&A في هذا السياق استخدام الموديل المرتبط بالداشبورد.
4. تثبيت نطاق Excel يعرض محتوى النطاق ولا يغني عن وجود موديل قابل للاستعلام. صلاحيات Q&A والتثبيت المطلوبة تظل شروطًا فعلية، وليست مشاهدة الداشبورد ترقية تلقائية لصلاحيات التأليف.
5. تنبيه زمني: طريقة الاستيراد القديمة من Create في الخدمة أُحيلت للتقاعد خلال 2026. ترتيب السؤال يُحفظ كسياق تاريخي؛ في تطبيق جديد استخدم موصل Excel الحالي أو Desktop ثم انشر الموديل. توثيق Microsoft الحالي يعلن انتهاء Q&A في فبراير 2027، ولا نعرضه كتوصية مستقبلية جديدة.

الإجابة الصحيحة وليه
بالسياق القديم للسؤال: Format the data as a table → Import Excel1 as a dataset → Add a tile for that dataset to DashboardA. ترتيب الاختيارات: 2 ثم 3 ثم 4.

ليه كل اختيار صح أو غلط
A. From powerbi.com, pin a range from Excel1 to DashboardA.
Pin a range يثبّت نطاقًا معروضًا من workbook. لا يقوم مقام استيراد بيانات الاستبيان كموديل يمكن لـQ&A الاستعلام عنه.

B. From Excel, format the data in Excel1 as a table.
Format as a table هي الخطوة الأولى المطلوبة في الحل القديم: تحدد نطاق بيانات منظمًا وأسماء أعمدته.

C. From powerbi.com, import Excel1 as a dataset.
Import as a dataset هي الخطوة الثانية؛ نحصل على الموديل الذي سيجيب عن الأسئلة، مع مراعاة أن واجهة الاستيراد القديمة لم تعد خطة تنفيذ حديثة.

D. From powerbi.com, add a tile for the Excel1 dataset to DashboardA.
Add a tile for the dataset هي الخطوة الثالثة لربط DashboardA بالموديل الذي استوردته، وليست مجرد إضافة نص ثابت.

E. From Excel, create a named range by using the data in Excel1.
Named range يسمّي نطاق خلايا، لكنه ليس الاختيار المطلوب بدل Excel Table في هذا التسلسل ولا ينشئ الموديل وحده.

F. From powerbi.com, upload Excel1.
Upload Excel1 ليس مرادفًا تلقائيًا لـImport as a dataset؛ عرض workbook لا يحقق بنفسه إنشاء الموديل المستعلم عنه في الحل المقصود.

الخلاصة اللي تتحفظ
فرّق بين عرض ملف Excel وبين استيراد بياناته كموديل. وهذا السؤال يصف مسارًا قديمًا، لا خطوات الواجهة الحالية.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/connect-data/service-excel-workbook-files
https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-visualization-introduction-to-q-and-a' AND answer_image IS '/dump-assets/f1-205-204-answer.webp' AND correct_json='[1,2,3]') OR (id='f1-206-205' AND prompt='Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as

the axis. Salary is present in the data as a numerical amount representing US dollars.

You need to create a reference line to show which employees are above the median salary.

Solution: You create a constant line and set the value to .5.

Does this meet the goal?' AND explanation='ترجمة السؤال بالعربي
رسم شريطي فيه Salary بالدولار لكل Employee. عايز خطًا مرجعيًا يوضح الموظفين اللي رواتبهم أعلى من الوسيط. الحل المقترح Constant line بقيمة 0.5. هل يحقق المطلوب؟

القصة والمعنى
0.5 هنا على محور الرواتب معناها نص دولار، مش نص الموظفين. الوسيط قيمة راتب تستخرجها من توزيع الرواتب؛ مش رقم ثابت اسمه نص.

مثال نفهم بيه
رواتب 1000 و2000 و9000 دولار: الوسيط 2000. خط عند 0.5 دولار يجعل الثلاثة فوق الخط، بينما فوق الوسيط يوجد صاحب 9000 فقط. علامة النسبة غير موجودة أصلًا في قيمة المحور.

طريقة التفكير خطوة بخطوة
1. Constant line عند 0.5 يضع عتبة رقمية في وحدة المحور، أي الدولار هنا.
2. الوسيط هو قيمة المنتصف بعد الترتيب، أو المئين الخمسون. يتغير بتغير بيانات الموظفين وسياق الفلاتر.
3. يمكن استخدام Median line مباشرة أو Percentile line عند 50 وفق المتاح للرسم. المقترح لا يفعل أيًا منهما.
4. لو صادف أن الوسيط يساوي 0.5 في بيانات خاصة، يظل الرقم الثابت غير حل عام يتتبع الوسيط كما يطلب السؤال.

الإجابة الصحيحة وليه
No. الإجابة B؛ Constant line = 0.5 ليست حساب الوسيط.

ليه كل اختيار صح أو غلط
A. Yes
Yes خطأ؛ يخلط بين قيمة نصف دولار وبين ترتيب المنتصف في توزيع الموظفين.

B. No
No صحيح؛ المطلوب عتبة وسيط ديناميكية، لا خط ثابت عند 0.5 من وحدة الراتب.

الخلاصة اللي تتحفظ
0.5 دولار غير 50th percentile. اقرأ وحدة الرقم قبل ما تختار.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane
https://learn.microsoft.com/en-us/dax/median-function-dax' AND answer_image IS NULL AND correct_json='[1]') OR (id='f1-207-206' AND prompt='Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as

the axis. Salary is present in the data as a numerical amount representing US dollars.

You need to create a reference line to show which employees are above the median salary.

Solution: You create an average line by using the Salary measure.

Does this meet the goal?' AND explanation='ترجمة السؤال بالعربي
نفس رسم Salary لكل Employee ونفس الهدف: معرفة من يزيد راتبه على الوسيط. الحل المقترح Average line على Salary. هل يكفي؟

القصة والمعنى
واحد راتبه عالي جدًا يقدر يرفع المتوسط، لكن مش لازم يغيّر الموظف اللي في النص. السؤال قال Median تحديدًا؛ ما ينفعش نستبدله بـAverage لمجرد إن الاتنين أرقام بتوصف الرواتب.

مثال نفهم بيه
رواتب 1000 و2000 و3000 و4000 و40000: المتوسط 10000 والوسيط 3000. صاحب 4000 فوق الوسيط لكنه تحت المتوسط؛ إذن الخط الخاطئ يغيّر الإجابة عن الموظفين.

طريقة التفكير خطوة بخطوة
1. المتوسط الحسابي يجمع القيم ويقسمها على عددها. الوسيط يعتمد على ترتيب القيم وموقع المنتصف.
2. Average line يحسب المتوسط، لا الوسيط المطلوب. تساويهما في بيانات معينة ليس ضمانًا لتساويهما في التقرير.
3. Median line أو Percentile line عند 50 يقيسان العتبة المطلوبة على القيم الممثلة في الرسم.

الإجابة الصحيحة وليه
No. الإجابة B؛ Average لا يعوّض Median.

ليه كل اختيار صح أو غلط
A. Yes
Yes خطأ؛ المتوسط والوسيط قد يتساويان أحيانًا، لكن لا يجوز افتراض هذا على بيانات الرواتب.

B. No
No صحيح؛ نوع الخط يحسب إحصائية مختلفة عن الوسيط المذكور صراحةً في المطلوب.

الخلاصة اللي تتحفظ
Average = مجموع ÷ عدد. Median = المنتصف بعد الترتيب. مش نفس الطلب.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane
https://learn.microsoft.com/en-us/dax/median-function-dax' AND answer_image IS NULL AND correct_json='[1]') OR (id='f1-208-207' AND prompt='Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as

the axis. Salary is present in the data as a numerical amount representing US dollars.

You need to create a reference line to show which employees are above the median salary.

Solution: You create a percentile line by using the Salary measure and set the percentile to 50%.

Does this meet the goal?' AND explanation='ترجمة السؤال بالعربي
عندك Salary كقيمة وEmployee كمحور في Clustered bar chart. المطلوب خط يحدد من رواتبهم فوق الوسيط. الحل Percentile line على Salary عند 50%. هل يحقق الهدف؟

القصة والمعنى
هنا اختار الترتيب الصح: عايز نقطة المنتصف في الرواتب، فقال المئين الخمسون. يعني نطلع راتبًا من التوزيع، مش نضرب كل راتب في نص ولا نحط خطًا عند 0.5 دولار.

مثال نفهم بيه
رواتب 1000 و2000 و3000 و4000 و40000: الخط عند 3000، وصاحبا 4000 و40000 أعلى منه. لو الرواتب 1000 و2000 و2000 و2000 و9000، واحد فقط فوق الوسيط رغم أنه المئين الخمسون.

طريقة التفكير خطوة بخطوة
1. الوسيط يوافق المئين الخمسين؛ لذلك نوع الخط والإعداد يطابقان المطلوب.
2. اختر Salary كمقياس وحدد Percentile عند 50 في الإعداد المعبّر عن المئينات. الناتج خط على محور الرواتب في وحدة الدولار.
3. المقارنة تكون مع قيم Salary الممثلة لكل موظف في سياق الرسم والفلاتر، لا افتراض أنها وسيط كل سطور سجل الرواتب الخام إذا اختلف مستوى التفاصيل.
4. الموظف المساوي للخط عند الوسيط ليس أعلى منه. ولا يعني المئين الخمسون أن نصف الموظفين بالضبط أعلى منه إذا تكررت الرواتب.

الإجابة الصحيحة وليه
Yes. الإجابة A؛ Percentile line عند 50 يحدد الوسيط.

ليه كل اختيار صح أو غلط
A. Yes
Yes صحيح؛ المئين الخمسون يعطي الوسيط على توزيع قيم المقياس المعروضة.

B. No
No خطأ هنا؛ الحل لا يستخدم متوسطًا أو ثابت 0.5، بل الإحصائية المطلوبة بالضبط.

الخلاصة اللي تتحفظ
Median = 50th percentile. الخط يرجع قيمة راتب، مش نسبة من الراتب.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane
https://learn.microsoft.com/en-us/dax/median-function-dax' AND answer_image IS NULL AND correct_json='[0]') OR (id='f1-209-208' AND prompt='HOTSPOT -

You are profiling data by using Power Query Editor.

You have a table that contains a column named column1. Column statistics and Value distribution for column1 are

shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.

Hot Area:' AND explanation='ترجمة السؤال بالعربي
صورة Column profile لعمود column1 تعرض Count = 277,329 وDistinct = 365 وUnique = 20. أكمل عدد القيم التي تظهر مرة واحدة، ثم اختر نوع شجرة يظهر Pear, Flowering أكثر منه حسب الرسم.

القصة والمعنى
عدّ البطاقات غير عدّ الأسماء المختلفة غير عدّ الأسماء اللي ملهاش تكرار. عندك 277,329 خانة، لكن الأسماء المختلفة 365. من الأسماء دي، 20 اسمًا ظهر كل واحد مرة واحدة بس. الجزء التاني تقراه من أطوال الأعمدة، مش من ترتيب الحروف.

مثال نفهم بيه
قائمة A,A,B,C,C,D فيها Count=6 وDistinct=4 وUnique=2 لأن B وD ظهرا مرة واحدة. ده مثال صغير يوضح معنى مؤشرات الصورة، وليس بديلًا عن أرقامها.

طريقة التفكير خطوة بخطوة
1. Unique في Power Query هو عدد القيم التي لها ظهور واحد فقط ضمن البيانات التي جرى تحليلها؛ الرقم هنا 20.
2. Distinct = 365 يحصي كل قيمة مختلفة مرة، سواء ظهرت مرة أو آلاف المرات. Count = 277,329 ليس عدد القيم غير المكررة.
3. شريط Pear, Flowering أطول من Elm, American ويعلوه في الترتيب التنازلي، بينما Ash, Green وCrabapple, Flowering وSpruce, Blue أعلى منه.
4. لا نختلق تكرارًا رقميًا لكل نوع؛ الرسم يثبت المقارنة المطلوبة فقط. إعداد Profiling قد يقتصر على عينة، لذلك عمّم على العمود كله فقط إذا كان التحليل مضبوطًا على كامل البيانات؛ الأرقام هنا تخص النطاق المعروض.

الإجابة الصحيحة وليه
الأولى: are 20 values that occur. الثانية: Elm, American.

ليه كل اختيار صح أو غلط
A. Only once in the column: are 20 values that occur
20 صحيح لأنه Unique المعروض: عشرون قيمة لكل منها ظهور واحد في نطاق التحليل.

B. Only once in the column: are 365 values that occur
365 هو Distinct؛ يخلط القيم المختلفة بكل القيم التي تظهر مرة واحدة فقط.

C. Only once in the column: are 277,329 values that occur
277,329 هو Count؛ يعد البيانات المحللة ولا يجيب كم قيمة لها تكرار واحد.

D. Only once in the column: is one value that occurs
قيمة واحدة غير صحيح؛ المعروض Unique=20 وليس 1. كلمة once تصف تكرار كل قيمة، لا عدد القيم.

E. Pear, Flowering occurs more often than: Ash, Green
Ash, Green شريطه أطول من Pear, Flowering؛ إذن Pear لا يظهر أكثر منه.

F. Pear, Flowering occurs more often than: Crabapple, Flowering
Crabapple, Flowering أعلى من Pear, Flowering في الرسم التنازلي، فيخالف المقارنة المطلوبة.

G. Pear, Flowering occurs more often than: Elm, American
Elm, American صحيح؛ شريطه أقصر وأسفل Pear, Flowering في التوزيع المعروض.

H. Pear, Flowering occurs more often than: Spruce, Blue
Spruce, Blue يعلو Pear, Flowering وشريطه أطول؛ لا تختاره لمجرد قرب الاسمين في القائمة.

الخلاصة اللي تتحفظ
Distinct = كام قيمة مختلفة؟ Unique = كام قيمة ظهرت مرة واحدة بس؟

مراجع المراجعة
https://learn.microsoft.com/en-us/power-query/data-profiling-tools' AND answer_image IS '/dump-assets/f1-209-208-answer.webp' AND correct_json='[]') OR (id='f1-210-209' AND prompt='You have a Power BI report hosted on powerbi.com that displays expenses by department for department

managers.

The report contains a line chart that shows expenses by month.

You need to enable users to choose between viewing the report as a line chart or a column chart. The solution must

minimize development and maintenance effort.

What should you do?' AND explanation='ترجمة السؤال بالعربي
تقرير مصروفات الأقسام على powerbi.com فيه Line chart حسب الشهر. عايز مدير القسم يقدر يبدّل عرضه إلى Column chart، بأقل تطوير وصيانة. تعمل إيه؟

القصة والمعنى
مش كل مدير بيحب نفس الرسم. بدل ما تعمل نسختين وتفضل تصلح الاتنين كل مرة، افتح Personalize visuals وخلي القارئ يغيّر نوع عرضه بنفسه. اختياره الشخصي مش تعديلًا إجباريًا لشكل التقرير عند بقية الناس.

مثال نفهم بيه
مدير القاهرة بدّل الخط لأعمدة وحفظ Personal bookmark، ومديرة الإسكندرية فضّلت الخط. نفس التقرير والمقياس، من غير صفحتين يكرر المؤلف تعديلهما مع كل تغيير في المبيعات أو المصروفات.

طريقة التفكير خطوة بخطوة
1. Personalize visuals يتيح لقارئ التقرير تغيير نوع الرسم في Reading view دون منحه صلاحية تحرير التقرير الأصلي.
2. تفعيله من إعدادات التقرير في الخدمة ثم Save يوفّر الإمكانية بدل بناء رسم إضافي وأزرار وتبديل Bookmarks.
3. يمكن حفظ التخصيص في Personal bookmark والرجوع للوضع الافتراضي؛ لا نفترض أن كل تخصيص يغيّر نسخة المؤلف.
4. حل Bookmarks ممكن تقنيًا لو عايز تجربة تبديل يسيطر عليها المؤلف، لكنه يحتاج مكونات وصيانة أكثر من المطلوب هنا.

الإجابة الصحيحة وليه
A. Enable report readers to personalize visuals.

ليه كل اختيار صح أو غلط
A. Enable report readers to personalize visuals.
صحيح؛ Personalize visuals يتيح تغيير نوع الرسم للقارئ بأقل إعداد مناسب بين البدائل.

B. Create a separate report page for users to view the column chart.
صفحة منفصلة تعرض الأعمدة لكن تكرر العرض وتزيد ما يحتاج التحديث والصيانة؛ ليست الأقل جهدًا.

C. Add a column chart, a bookmark, and a button for users to choose a visual.
رسم إضافي وBookmark وزر يحققون التبديل فعلًا، لكنهم عمل تطوير وصيانة زيادة، ولذلك يخسرون شرط السؤال وليسوا مستحيلين تقنيًا.

D. Create a mobile report that contains a column chart.
Mobile report/layout يعالج تجربة شاشة المحمول، وليس طريقة عامة لتمكين المدير من اختيار نوع الرسم في تقرير الخدمة.

الخلاصة اللي تتحفظ
تغيير شخصي بسيط لنوع الرسم بأقل مجهود = Personalize visuals.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-personalize-visuals' AND answer_image IS NULL AND correct_json='[0]') OR (id='f1-211-210' AND prompt='You have two Power BI reports named ReportA and ReportB that each uses a distinct color palette.

You are creating a Power BI dashboard that will include two visuals from each report.

You need to use a consistent dark theme for the dashboard. The solution must preserve the original colors of the

reports.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.' AND explanation='ترجمة السؤال بالعربي
عندك ReportA وReportB ولكل واحد ألوانه. هتثبت رسمين من كل تقرير على Dashboard واحدة. عايز الداشبورد Dark متناسقة، مع الاحتفاظ بألوان التقريرين الأصليين. اختار إجراءين يكملوا بعض.

القصة والمعنى
فكّر في الداشبورد كواجهة عرض مستقلة. ممكن توحّد شكل الرسومات المثبتة عليها من غير ما ترجع تلوّن صفحات التقريرين. لازم تختار ثيم للوجهة، وتقول للـTiles تستخدم ثيم الوجهة بدل المصدر.

مثال نفهم بيه
ReportA أزرق وReportB برتقالي. نثبت رسوماتهما بثيم الداشبورد Dark؛ عند فتح ReportA نفسه يظل أزرق. ما غيرناش ألوان التقرير علشان نغيّر شكل نسخته المثبتة.

طريقة التفكير خطوة بخطوة
1. اختار Dark dashboard theme للداشبورد نفسها؛ ثيم المتصفح ليس ثيم بيانات الرسومات.
2. وقت تثبيت الرسومات اختار Use destination theme حتى تتبع Tiles ألوان الداشبورد.
3. التغيير في Tiles لا يعيد كتابة ثيم ReportA أو ReportB. عبارة preserve original colors تخص التقريرين الأصليين، لا اشتراط أن تحتفظ الـTiles بألوان المصدر.
4. قد توجد استثناءات لتطبيق الثيم مثل أنواع Tiles أو ألوان يحددها تنسيق خاص؛ لا نعمم ضمان تطابق كل عنصر خارج نطاق الرسومات المدعومة.

الإجابة الصحيحة وليه
C وD: Use destination theme عند التثبيت + Dark dashboard theme.

ليه كل اختيار صح أو غلط
A. Upload a snapshot.
Upload a snapshot يضيف صورة ثابتة أو نسخة عرض، ولا يضبط الثيم المشترك للـTiles المطلوبة.

B. For the browser, set the color preference to dark mode.
Dark mode للمتصفح يخص واجهته وتفضيلات العرض؛ لا يختار ثيم الداشبورد ولا إعداد التثبيت.

C. When pinning visuals to the dashboard, select Use destination theme.
صحيح؛ Use destination theme يجعل الـTile تتبع ثيم الداشبورد بدل حمل ألوان التقرير المصدر.

D. Select the dark dashboard theme.
صحيح؛ Dark dashboard theme يحدد الثيم الداكن المطلوب للوجهة، ويكمله اختيار C.

E. Turn on tile flow.
Tile flow يخص ترتيب أو تدفق العرض حيث يتاح، وليس توحيد ألوان الرسومات أو الحفاظ على ثيمات تقارير المصدر.

الخلاصة اللي تتحفظ
ثيم الداشبورد مستقل عن التقرير. ثيم الوجهة + اختيار اتباعه عند Pin.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboard-themes' AND answer_image IS NULL AND correct_json='[2,3]') OR (id='f1-212-211' AND prompt='HOTSPOT -

You have a dataset that contains revenue data from the past year.

You need to use anomaly detection in Power BI to show anomalies in the dataset.

What should you configure? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:' AND explanation='ترجمة السؤال بالعربي
عندك بيانات إيرادات آخر سنة وعايز Anomaly detection يكشف القيم غير المعتادة. اختار نوع الرسم والإعداد اللازم من القائمتين.

القصة والمعنى
يوم مبيعاته 90 ألف مش لازم يكون شاذًا لو ده الطبيعي في آخر الأسبوع. الكشف محتاج يشوف السلسلة مع الزمن ويقارن النقطة بالنطاق المتوقع. عشان كده نبدأ بخط عليه تاريخ، مش تورتة بتجمع السنة كلها.

مثال نفهم بيه
إيراد الأيام 10 و11 و12 و11 ثم 50 ألف قد يدفعك لفحص اليوم الأخير حسب السياق والحساسية. Pie سيحوّل الأيام إلى أجزاء من إجمالي، بينما الخط الزمني يتيح للميزة فحص نمطها. الأرقام مثال وليست كشفًا محسوبًا بخوارزمية Power BI هنا.

طريقة التفكير خطوة بخطوة
1. النوع المدعوم هنا Line chart به Time series على Axis؛ من الخيارات اختار Line.
2. ضع Date field في المحور لتوفير الترتيب الزمني؛ Show value as وCross-report drill-through لا يعوّضان ذلك.
3. بعدها تضيف Anomalies من Analytics. الاختياران هما الإعدادان المطلوبان في السؤال وليسا قائمة بكل شروط الدعم.
4. راجع قيود الميزة: أربع نقاط على الأقل، وعدم استخدام Legend أو مقاييس متعددة أو قيم ثانوية في نفس الخط؛ Show value as له قيود على تفسيرات الشذوذ.
5. Anomaly تعني انحرافًا عن المتوقع إحصائيًا، وليست حكمًا مؤكدًا بوجود خطأ إدخال أو غش أو سبب معين.

الإجابة الصحيحة وليه
Chart type: Line. Chart configuration: Populate the axis with a date field.

ليه كل اختيار صح أو غلط
A. Chart type: Line
Line صحيح؛ يكشف Anomaly detection نمط السلسلة الزمنية على الرسم الخطي المدعوم.

B. Chart type: Pie
Pie يوضح حصة كل فئة من الإجمالي؛ ليس النوع المدعوم لميزة الكشف المطلوبة.

C. Chart type: Treemap
Treemap يوضح أحجام فئات داخل مساحات، ولا يوفر ميزة Anomaly detection المطلوبة بدل Line.

D. Chart configuration: Select the Show value as option
Show value as يغير طريقة التعبير عن القيم، لا يجهز المحور الزمني؛ وله أيضًا قيود على Anomaly explanations.

E. Chart configuration: Enable Cross-report drill-through
Cross-report drill-through ينقلك لتفاصيل في تقرير آخر، ولا يبني سلسلة زمنية لكشف الشذوذ.

F. Chart configuration: Populate the axis with a date field
Populate the axis with a date field صحيح؛ يزوّد الرسم بالترتيب الزمني الذي تتطلبه الميزة.

الخلاصة اللي تتحفظ
Anomaly detection هنا = Line + Date على Axis، ثم راجع باقي شروط الدعم.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-anomaly-detection' AND answer_image IS '/dump-assets/f1-212-211-answer.webp' AND correct_json='[]') OR (id='f1-213-212' AND prompt='You have a line chart that shows the number of employees in a department over time.

You need to see the total salary costs of the employees when you hover over a data point.

What should you do?' AND explanation='ترجمة السؤال بالعربي
رسم خطي يعرض عدد موظفي القسم عبر الزمن. عايز إجمالي تكلفة الرواتب يظهر عندما تقف بالمؤشر على نقطة. تحط Salary فين؟

القصة والمعنى
الرسم هيحتفظ بقصته: عدد الموظفين. إنما لما أقف على شهر مارس يظهر لي بجانب العدد إجمالي الرواتب لنفس النقطة. مكان المعلومة اللي بتظهر مع الوقوف هو Tooltip.

مثال نفهم بيه
نقطة مارس تعرض Employee count=12. لو إجمالي رواتبهم 120 ألف، يظهر 120 ألف في Tooltip. لو جدول الرواتب فيه تكرار لكل موظف أو أكثر من دفعة، لازم المقياس يعكس تعريف التكلفة الصحيح بدل جمع عشوائي مضاعف.

طريقة التفكير خطوة بخطوة
1. أضف Salary إلى Tooltips للرسم، مع ضبط التجميع المناسب للإجمالي أو استخدام Measure يجمع الرواتب حسب تعريف البيانات.
2. التاريخ والقسم والفلاتر في النقطة يحددون سياق الحساب إذا كانت العلاقات والمقياس مضبوطة.
3. Visual filters تغيّر البيانات المشمولة في الرسم ولا تضيف معلومة ظاهرة عند Hover.
4. Drillthrough ينقل إلى تفاصيل عبر إجراء تنقل، وليس إضافة راتب إلى نفس الـTooltip بمجرد الوقوف.

الإجابة الصحيحة وليه
C. Add salary to the tooltips.

ليه كل اختيار صح أو غلط
A. Add salary to the drillthrough fields.
Drillthrough fields تحدد سياق صفحة تفاصيل تنتقل لها؛ لا تحقق معلومة الرواتب المطلوبة عند Hover وحده.

B. Add salary to the visual filters.
Visual filters تقيّد الصفوف المعروضة، ولا تعرض قيمة جديدة في بطاقة الوقوف.

C. Add salary to the tooltips.
Tooltips صحيح؛ أضف Salary بالتجميع المطلوب لتظهر تكلفة النقطة مع الحفاظ على خط عدد الموظفين.

الخلاصة اللي تتحفظ
معلومة زيادة تظهر عند الوقوف على النقطة = Tooltip، مع تجميع وسياق صحيحين.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-visual-tooltips' AND answer_image IS NULL AND correct_json='[2]') OR (id='f1-214-213' AND prompt='You have the visual shown in the Original exhibit. (Click the Original tab.)

You need to configure the visual as shown in the Modified exhibit. (Click the Modified tab.)

What should you add to the visual?' AND explanation='ترجمة السؤال بالعربي
الصورة الأصلية تعرض Sales خلال 2018، والمعدلة تضيف امتدادًا بعد آخر البيانات باتجاه يناير 2019 مع نطاق رمادي حوله. تضيف أنهي ميزة للحصول على الشكل المعدل؟

القصة والمعنى
الجزء الرمادي بيبدأ بعد ما سجل المبيعات خلص. يعني البرنامج مش بيعرض مبيعات اتحققت فعلًا؛ بيتوقع الفترة الجاية ومعاه نطاق عدم يقين. ده Forecast.

مثال نفهم بيه
عندك مبيعات حتى ديسمبر. إضافة Forecast لشهر قادم تنتج تقديرًا لشهر يناير ونطاقًا حوله. ما تكتبش التقدير ضمن المبيعات الفعلية؛ بيظل توقعًا يتغير عندما تتغير البيانات أو إعداداته.

طريقة التفكير خطوة بخطوة
1. قارن نهاية المحور الزمني في الصورتين: الثانية تمتد للمستقبل بعد البيانات التاريخية.
2. Forecast في Analytics يضيف التوقع ونطاق الثقة إلى الرسم الزمني المدعوم.
3. Average line خط مرجعي من قيم موجودة. Trendline تلخص الاتجاه وليست نفس التوقع المستقبلي بنطاقه المعروض.
4. النطاق الرمادي لا يضمن احتواء كل قيمة مستقبلية، والامتداد ليس معاملات بيع جديدة تمت إضافتها للمصدر.

الإجابة الصحيحة وليه
D. a forecast.

ليه كل اختيار صح أو غلط
A. a measure
Measure قد يحسب منطقًا مخصصًا، لكن إضافته وحدها لا تنشئ تلقائيًا امتداد Forecast ونطاقه كما في الصورة.

B. an Average line
Average line يضع مرجعًا لمتوسط البيانات؛ لا ينشئ التوقع الزمني بعد نهاية السلسلة.

C. a trendline
Trendline يصف اتجاه البيانات، لكنه ليس ميزة Forecast التي تفسر الامتداد ونطاق عدم اليقين المعروضين.

D. a forecast
Forecast صحيح؛ هذا هو الشكل الذي يضيف التقدير المستقبلي والنطاق المصاحب.

الخلاصة اللي تتحفظ
امتداد بعد آخر تاريخ ومعاه نطاق ثقة = Forecast، مش Average line.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane' AND answer_image IS NULL AND correct_json='[3]') OR (id='f1-215-214' AND prompt='You need to create a visual that enables the adhoc exploration of data as shown in the following exhibit.

Which type of visual should you use?' AND explanation='ترجمة السؤال بالعربي
الصورة تعرض Sales ثم فروع Product Category ثم Supplier ثم Customer Country، مع أزرار توسعة. عايز نفس الاستكشاف المرن للبيانات؛ تختار أنهي Visual؟

القصة والمعنى
بدأنا بإجمالي المبيعات. فتحنا Beverages، ثم موردًا بعينه، ثم شوفنا بلدان العملاء داخل الفرع ده. تقدر تختار تمشي على أي بُعد بعده بدل ما تتقيد بمسار واحد ثابت. ده Decomposition tree.

مثال نفهم بيه
إجمالي Sales=100، منها Beverages=30، ومنها Supplier A=18، ومنها USA=7. الـ7 تخص مسار Beverages ثم A ثم USA، فلا تفسرها على أنها كل مبيعات أمريكا خارج هذا المسار. الأرقام مثال للقراءة.

طريقة التفكير خطوة بخطوة
1. Analyze يحمل المقياس Sales، وExplain by يحمل الأبعاد التي يجوز استخدامها لتفكيكه.
2. كل توسعة تفكك قيمة العقدة المحددة، لذلك مبالغ البلدان الظاهرة في الفرع ليست مبيعات كل البلدان على مستوى الشركة كلها.
3. ترتيب الأبعاد يختاره المستخدم أثناء الاستكشاف، ويمكن استخدام AI split حيث يتاح لاختيار فرع مرتفع أو منخفض.
4. تفكيك الرقم يساعدك تحقق فرضيات؛ لا يثبت وحده أن المورد أو البلد سبب سببي لتغير المبيعات.

الإجابة الصحيحة وليه
B. decomposition tree.

ليه كل اختيار صح أو غلط
A. smart narrative
Smart narrative يكتب ملخصًا للاتجاهات؛ ليس شجرة تفريع للمقياس عبر أبعاد كما في الصورة.

B. decomposition tree
Decomposition tree صحيح؛ يفكك قيمة المقياس إلى فئات ومسارات استكشاف يختارها المستخدم.

C. Q&A
Q&A يحول سؤالًا لغويًا لإجابة مرئية، ولا يطابق واجهة فروع وعُقد التوسعة المعروضة.

D. key influencers
Key influencers يقارن عوامل مرتبطة بنتيجة، لكنه لا يعرض نفس شجرة تفكيك إجمالي Sales على هذا المسار.

الخلاصة اللي تتحفظ
إجمالي يتفرع لأبعاد تختار ترتيبها = Decomposition tree.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-decomposition-tree' AND answer_image IS NULL AND correct_json='[1]') OR (id='f1-216-215' AND prompt='Your company has employees in 10 states.

The company recently decided to associate each state to one of the following three regions: East, West, and North.

You have a data model that contains employee information by state. The model does NOT include region

information.

You have a report that shows the employees by state.

You need to view the employees by region as quickly as possible.

What should you do?' AND explanation='ترجمة السؤال بالعربي
الشركة عندها موظفون في 10 ولايات، وقررت تقسيم الولايات إلى East وWest وNorth. الموديل فيه State فقط. عايز تعرض الموظفين بالمناطق الجديدة بأسرع طريقة من الخيارات.

القصة والمعنى
عندك أسماء ولايات وقرار إداري بيقول مين يتبع الشرق ومين الغرب. مفيش معادلة رياضية تقسم أسماء الولايات إلى فترات متساوية؛ أنت هتختار أعضاء كل مجموعة وتديها اسم المنطقة.

مثال نفهم بيه
حسب قرار الشركة، State A وB يتبعان East وC يتبع West. نجمع A وB تحت اسم East. لا نستنتج خريطة حقيقية لكل ولاية أمريكية؛ المطلوب اتباع تقسيم الشركة المذكور.

طريقة التفكير خطوة بخطوة
1. اعمل New group على State، واختار Group type = List لتجميع القيم الفئوية يدويًا حسب خريطة الشركة.
2. سمّ المجموعات East وWest وNorth، وانقل الولايات الصحيحة لكل مجموعة ثم استخدم حقل المجموعة في الرسم.
3. Aggregation تلخص أرقامًا عند مستوى معين، ولا تخترع صفة Region أو تعيين State إلى Region.
4. Bin مناسب لفترات قيم عددية أو زمنية، وليس عضوية مناطق تجارية بأسماء ولايات. لو التعيينات تتغير باستمرار أو تُشارك في موديلات عديدة فجدول mapping قد يكون أفضل تشغيليًا، لكنه ليس الخيار الأسرع المعروض هنا.

الإجابة الصحيحة وليه
C. New group on State, Group type = List.

ليه كل اختيار صح أو غلط
A. Create a new aggregation that summarizes by state.
Aggregation by state يرجع إجماليات لكل ولاية، لكن لسه معندكش مناطق تجمع الولايات تحتها.

B. Create a new aggregation that summarizes by employee.
Aggregation by employee يغير مستوى التلخيص للموظف، ولا يحدد East وWest وNorth.

C. Create a new group on the state column and set the Group type to List.
List صحيح؛ يسمح بإسناد قيم State إلى مجموعات مسماة وفق قرار الشركة بسرعة.

D. Create a new group on the state column and set the Group type to Bin.
Bin يقسم قيمًا إلى نطاقات، ولا يعبر عن قائمة عضوية فئوية تحددها الشركة للولايات.

الخلاصة اللي تتحفظ
تجميع أسماء تختار أعضاءها = List. تقسيم قيم لفترات = Bin.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-grouping-and-binning' AND answer_image IS NULL AND correct_json='[2]') OR (id='f1-217-216' AND prompt='You have a collection of reports for the HR department of your company.

You need to create a visualization for the HR department that shows historical employee counts and predicts

trends during the next six months.

Which type of visualization should you use?' AND explanation='ترجمة السؤال بالعربي
قسم HR يريد Visual يظهر عدد الموظفين التاريخي ويتوقع الاتجاه خلال الستة أشهر القادمة. تختار Ribbon أم Scatter أم Line أم Key influencers؟

القصة والمعنى
عايز تشوف رحلة عدد الموظفين شهر بشهر، وبعد آخر شهر تمدها بتوقع. يبقى الزمن على المحور، وعدد الموظفين على القيمة، ونوع الرسم اللي يدعم Forecast هنا هو Line chart.

مثال نفهم بيه
آخر 18 شهر فيها عدد الموظفين بنهاية كل شهر. نحط الشهر على X والعدد على Y، ثم Forecast ستة أشهر. الناتج تقدير للتخطيط، مش وعد إن الشركة هتوظف عددًا معينًا.

طريقة التفكير خطوة بخطوة
1. Line chart يربط القيم بترتيب زمني واضح ويدعم ميزة Forecast من Analytics.
2. اختيار نوع الرسم وحده لا ينشئ توقعًا؛ أضف Forecast وحدد المدة ستة أشهر، وجهز المحور والسلسلة بما يناسب شروط الميزة.
3. الأشهر المفقودة أو قلة التاريخ أو عدم انتظام البيانات تستدعي مراجعة السلسلة قبل تفسير التوقع.
4. Key influencers يدرس العوامل المرتبطة بالقيمة، لا يعطي من تلقاء نفسه توقع عدد الموظفين لستة أشهر.

الإجابة الصحيحة وليه
C. line chart، ثم إعداد Forecast لستة أشهر.

ليه كل اختيار صح أو غلط
A. ribbon chart
Ribbon يعرض تغير ترتيب الفئات عبر الزمن، وليس الاختيار المناسب للتوقع المدمج المطلوب.

B. scatter chart
Scatter مناسب لعلاقة قيمتين عدديتين، لا نوع الرسم المدعوم هنا لتوقع السلسلة ستة أشهر.

C. line chart
Line صحيح؛ يعرض التاريخ ويتيح إضافة Forecast عند استيفاء شروطه، وليس بمجرد اختياره وحده.

D. key influencers
Key influencers يفسر ارتباط عوامل بمقياس، لا يستبدل Forecast لسلسلة عدد الموظفين.

الخلاصة اللي تتحفظ
تاريخ + توقع زمني في هذا السؤال = Line chart مع Forecast.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane' AND answer_image IS NULL AND correct_json='[2]') OR (id='f1-218-217' AND prompt='You have a Microsoft Power BI dashboard. The report used to create the dashboard uses an imported dataset from

a Microsoft SQL Server data source.

The dashboard is shown in the exhibit. (Click the Exhibit tab.)

What occurred at 12:03:06 PM?' AND explanation='ترجمة السؤال بالعربي
داشبورد مبني على تقرير يستخدم بيانات SQL Server مستوردة. فوق Tile مكتوب REFRESHED 12:03:06 PM. أنهي حدث يدل عليه التوقيت؟

القصة والمعنى
تاريخ تحديث واجهة العرض غير تاريخ آخر معاملة في قاعدة البيانات. قد يكون SQL اتغير من دقيقتين والموديل لسه عند نسخته القديمة. العبارة فوق الـTile بتتكلم عن نتيجة العرض المخزنة، مش سجل معاملات SQL.

مثال نفهم بيه
استوردت البيانات الساعة 11:00، واتضافت معاملة في SQL الساعة 12:00. إعادة عرض Tile الساعة 12:03 قد تظل مبنية على نسخة 11:00 إذا لم يحدث Data refresh. عبارة Refreshed وحدها ليست دليلًا أن المعاملة الجديدة دخلت الموديل.

طريقة التفكير خطوة بخطوة
1. الوقت المعروض هو تحديث Tile/cache المعروض، ولذلك B هو الاستنتاج المدعوم.
2. في Import، العرض يستعلم من البيانات المستوردة؛ لازم Data refresh لجلب التغييرات من SQL. تحديث العرض وحده ليس إعادة استيراد للمصدر.
3. بالنسبة لموديلات Import، تُحدّث Tiles تلقائيًا مع التحديث المجدول أو عند الطلب؛ لا ننقل تعميم كل ساعة من سياقات اتصال أخرى إلى هذا السؤال.
4. التوقيت لا يحدد من ضغط F5 أو أضاف Comment، ولا يثبت وقت إضافة Transaction. قد نعرف النتيجة الظاهرة ولا نعرف الحدث الذي بدأ عملية التحديث.

الإجابة الصحيحة وليه
B. The dashboard tile cache refreshed.

ليه كل اختيار صح أو غلط
A. A new transaction was added to the data source.
إضافة معاملة للمصدر لا يمكن استنتاجها من توقيت تحديث Tile، خصوصًا والموديل Import.

B. The dashboard tile cache refreshed.
صحيح؛ التوقيت يتعلق بتحديث نتيجة الـTile/cache المعروضة، لا وقت إدخال آخر صف في SQL.

C. A user added a comment to a tile.
تعليق المستخدم حدث مستقل؛ الصورة لا تعرض سجل تعليق يربطه بهذا الوقت.

D. A user pressed F5.
F5 يعيد تحميل صفحة المتصفح، لكن التوقيت لا يثبت أن مستخدمًا ضغطه ولا أنه أعاد استيراد SQL.

الخلاصة اللي تتحفظ
Tile refresh غير Data refresh وغير Transaction time. متخلطش الثلاثة.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-data' AND answer_image IS NULL AND correct_json='[1]') OR (id='f1-219-218' AND prompt='HOTSPOT -

You need to create a Power BI report. The first page of the report must contain the following two views:

✑ Sales By Postal Code

✑ Sales by Month

Both views must display a slicer to select a value for a field named Chain.

The Sales By Postal Code view must display a map visual as shown in the following exhibit.

The Sales By Month view must display a column chart visual as shown in the following exhibit.

Users must be able to switch between the views by using buttons on the report page. The selected Chain field

must be maintained when switching between views.

What is the minimum number of bookmarks required, and which property should you apply to each bookmark? To

answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:' AND explanation='ترجمة السؤال بالعربي
في أول صفحة تقرير عرضان: خريطة Sales By Postal Code وأعمدة Sales By Month. كلاهما يستخدم Chain slicer، والتبديل بأزرار. لازم اختيار Chain يفضل كما هو. ما أقل عدد Bookmarks وأي خاصية تستخدم؟

القصة والمعنى
المستخدم اختار Fashions Direct وعايز يقلب من الخريطة للأعمدة من غير ما يرجع السلايسر لقيمته وقت تصميم التقرير. المطلوب تبديل ظهور الرسومات فقط. صورتان للحالة، من غير التقاط اختيار البيانات.

مثال نفهم بيه
احفظ Map view لما الخريطة ظاهرة، وMonth view لما الأعمدة ظاهرة. اختار Lindseys ثم اضغط الزرين؛ Chain يظل Lindseys لأن Data غير مفعّل في العلامتين. لو فعلته قد يرجع Fashions Direct المحفوظ وقت التصميم.

طريقة التفكير خطوة بخطوة
1. اعمل حالتين محفوظتين: واحدة تظهر الخريطة وتخفي الأعمدة، والثانية تعمل العكس. الحد الأدنى Bookmarkان لهذا التبديل المحدد.
2. استخدم Selection pane لضبط الظهور، ثم احفظ Display لكل حالة واربط كل زر بالـBookmark المناسب.
3. عطّل Data في الـBookmarks حتى لا يعاد تطبيق اختيار Chain الذي كان محفوظًا وقت إنشاء العلامة.
4. Current page ليست الخاصية التي تحفظ ظهور وإخفاء الرسومات؛ العرضان على الصفحة الأولى نفسها.
5. الأبسط Slicer واحد مشترك يظل ظاهرًا مع الحالتين. لو نسخت السلايسر لازم تدير المزامنة؛ وجود نسختين لا يضمن نقل الاختيار بينهما تلقائيًا.

الإجابة الصحيحة وليه
Minimum number: 2. Property: Display. عطّل Data للحفاظ على اختيار Chain.

ليه كل اختيار صح أو غلط
A. Minimum number of bookmarks: 1
Bookmark واحد يحفظ حالة ظهور واحدة، ولا يكفي وحده للرجوع بين حالتين محددتين بزرين في هذا التصميم.

B. Minimum number of bookmarks: 2
2 صحيح؛ علامة لحالة الخريطة وعلامة لحالة الأعمدة، وليس علامة لكل شهر أو قيمة Chain.

C. Minimum number of bookmarks: 3
3 أكثر من الحد الأدنى؛ عدد قيم البيانات لا يضيف حالة مطلوبة هنا.

D. Minimum number of bookmarks: 4
4 ليس الحد الأدنى؛ لا تحتاج تضرب حالتي العرض في اختيارات Chain لأن اختيار السلايسر يظل مستقلًا.

E. Property: Data
Data تحفظ الفلاتر والسلايسرات وتعيد تطبيقها، فتخاطر بإلغاء Chain الذي اختاره المستخدم. عطّلها في الحالتين.

F. Property: Display
Display صحيح؛ يحفظ ظهور الرسومات وحالات العرض اللازمة للتبديل من غير فرض اختيار السلايسر.

G. Property: Current page
Current page تختص بالصفحة التي تنتقل إليها العلامة؛ لا تحل تبديل ظهور خريطة وأعمدة داخل نفس الصفحة.

الخلاصة اللي تتحفظ
تبديل Visuals مع الحفاظ على Slicer = حالتان، Display On وData Off.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks' AND answer_image IS '/dump-assets/f1-219-218-answer.webp' AND correct_json='[]') OR (id='f1-220-219' AND prompt='You have the visual shown in the exhibit. (Click the Exhibit tab.)

You need to show the relationship between Total Cost and Total Sales over time.

What should you do?' AND explanation='ترجمة السؤال بالعربي
الصورة Scatter/Bubble chart محوره الأفقي Total Sales والرأسي Total Cost. المطلوب عرض العلاقة بينهما عبر الزمن. أي إضافة أنسب من الخيارات؟

القصة والمعنى
كل فقاعة لها مكان يوضح المبيعات والتكلفة. عايز تشوف الفقاعات وهي بتتحرك سنة بعد سنة، مش لقطة لسنة واحدة تختارها كل مرة. نضيف الزمن في Play axis عشان نستعرض تطور نفس العلاقة.

مثال نفهم بيه
فقاعة بلد عند Sales=3 وCost=2 في 2022 ثم Sales=4 وCost=2.5 في 2023. Play axis يعرض انتقالها بين اللقطتين؛ المتوسط لا يعرض الحركة. الأرقام مثال توضيحي بالملايين، وليست استخراجًا لقيم سنوات من الصورة.

طريقة التفكير خطوة بخطوة
1. المحوران الحاليان يعرضان العلاقة العددية المطلوبة بالفعل؛ البُعد الناقص للاستعراض هو الزمن.
2. ضع حقلًا زمنيًا مناسبًا مثل Year في Play axis للرسم المدعوم، فيعرض الحالات الزمنية بالتتابع.
3. Year slicer يفلتر سنة ويمكن المقارنة يدويًا، لكنه ليس نفس تشغيل تطور الفقاعات عبر الزمن الذي يستهدفه الحل الأقرب هنا.
4. Average line يضيف عتبة إحصائية، وYear-over-year measure يحسب معدل تغير؛ لا يضيف أي منهما آلية استعراض الزمن على الفقاعات.
5. عنوان الصورة يذكر Unit Price بينما المحور الرأسي نفسه Total Cost. نستند للمحور والمطلوب الصريحين؛ لا نغيّر السؤال إلى علاقة سعر الوحدة بالمبيعات بسبب عنوان غير متسق.

الإجابة الصحيحة وليه
A. Add a play axis، ثم ضع فيه الحقل الزمني المناسب.

ليه كل اختيار صح أو غلط
A. Add a play axis.
صحيح؛ Play axis يضيف بعدًا زمنيًا للاستعراض المتتابع مع بقاء X للمبيعات وY للتكلفة.

B. From the Analytics pane, add an Average line.
Average line لا يعرض الزمن؛ يضيف مرجعًا للمتوسط ولا يحرك النقاط بين السنوات.

C. Add a slicer for the year.
Year slicer يعرض نطاق سنة مختارة يدويًا، وهو أداة مفيدة لكن لا يعادل Play axis لتشغيل تطور العلاقة كما في الحل المقصود.

D. Create a DAX measure that calculates year-over-year growth.
YoY growth يقيس تغيرًا بين فترتين؛ لا يجهّز بمفرده استعراض مواقع الفقاعات على المحورين عبر الزمن.

الخلاصة اللي تتحفظ
Scatter فيه مقياسان وعايز تشغّل تطورهما بالزمن؟ Play axis.

مراجع المراجعة
https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-scatter
https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-high-density-scatter-charts' AND answer_image IS NULL AND correct_json='[0]');
