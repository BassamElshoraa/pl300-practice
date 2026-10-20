import type { QuestionCorrection } from './answer-audit.ts';

const placeholderReview = (
  reviewedAnswer: string,
  explanation: string,
  reasonAr: string,
  evidence: QuestionCorrection['evidence'] = [],
): QuestionCorrection => ({
  status: 'corrected',
  reviewedAnswer,
  originalAnswer:
    'The source answer image contains only a generic answer label and does not identify the required selections.',
  reason:
    'The source key is incomplete. The selections below were reconstructed from the full prompt and independently reviewed.',
  reasonAr,
  explanation,
  suppressSourceAnswerImage: true,
  evidence,
});

const explanationOnly = (explanation: string): QuestionCorrection => ({
  status: 'independently-reviewed',
  explanation,
});

/**
 * Repairs questions whose source answer image is only a tiny placeholder such
 * as "Answer: A", and supplies explanations that were missing from the source.
 */
export const answerCompletenessCorrections: Record<string, QuestionCorrection> =
  {
    'f2-202-444': {
      status: 'incomplete-source',
      reviewedAnswer:
        'Answer selection unavailable: the saved dropdown crops belong to a different question.',
      explanation:
        'The profile shows 12 distinct and 11 unique values. However, the complete readable answer options have not been recovered. Do not use the unrelated menu crops as an answer key.',
      reasonAr:
        'قصاصات الاختيارات تخص سؤالًا آخر، ولذلك أوقفناها بدل عرض اختيارات مضللة. نحتاج نسخة واضحة من الاختيارات الأصلية.',
      suppressSourceAnswerImage: true,
    },
    'f2-336-483': {
      status: 'incomplete-source',
      reviewedAnswer:
        'Cannot determine: the source omits the answer area and statements.',
      explanation:
        'The source provides a line chart but not the statements or answer area. Previously reused menu crops have been disabled; no answer is inferred.',
      reasonAr:
        'الرسم موجود لكن عبارات السؤال ومنطقة الإجابة ناقصان. لا نعتمد الاختيارات القديمة لأنها لا تخص السؤال.',
      suppressSourceAnswerImage: true,
    },
    'f1-021-20': {
      status: 'independently-reviewed',
      reviewedAnswer: 'Create one Text parameter for the lifecycle stage.',
      reason:
        'One stage parameter can map Development, Test, and Production to both the database name and server URL, so only one value must be maintained.',
      reasonAr:
        'نستخدم Parameter واحد نصي يمثل الـStage، ومنه نحدد اسم الـDatabase والـServer معًا. ده أقل في الإدارة من تغيير بارامترين مستقلين كل مرة.',
      explanation:
        'Reviewed answer: One parameter; Text. Create one text parameter such as Environment with Development, Test, and Production values. Reference that parameter in Power Query to select the matching server URL and database name. This changes the connection source; it does not filter rows.',
      evidence: [
        {
          label: 'Power Query parameters',
          url: 'https://learn.microsoft.com/en-us/power-query/power-query-query-parameters',
        },
      ],
    },
    'f1-023-22': {
      status: 'independently-reviewed',
      reviewedAnswer:
        'Select discount; Replace Errors with 0.05; Change the data type to Decimal Number.',
      reason:
        'The exhibit already shows actual Error cells, so Replace Errors can act on them immediately. The final type must be Decimal Number.',
      reasonAr:
        'الخلايا ظاهرة بالفعل كـError في الصورة، لذلك نستبدلها أولًا بـ0.05 ثم نثبت نوع العمود Decimal Number. تغيير النوع قبل الاستبدال غير مطلوب هنا.',
      explanation:
        'Reviewed sequence: (1) select the discount column, (2) use Replace Errors and enter 0.05, and (3) set the column type to Decimal Number. This preserves every row, replaces the errors already visible in the preview, and stores the replacement as a decimal value.',
      evidence: [
        {
          label: 'Power Query error handling',
          url: 'https://learn.microsoft.com/en-us/power-query/dealing-with-errors',
        },
      ],
    },
    'f1-122-121': {
      status: 'independently-reviewed',
      reviewedAnswer:
        'Human Resources: FALSE(). Country: [Email] = USERPRINCIPALNAME().',
      reason:
        'The CFO role must deny every Human Resources row without restricting Sales, while the Manager role must match the signed-in user to Country[Email].',
      reasonAr:
        'دور CFO يمنع كل صفوف Human Resources باستخدام FALSE() من غير ما يفلتر Sales. ودور Manager يطابق بريد المستخدم الحالي مع Country[Email] عشان يشوف دولته فقط.',
      explanation:
        'Reviewed answer: Human Resources = FALSE(); Country = [Email] = USERPRINCIPALNAME(). FALSE() prevents the CFO from seeing any Human Resources rows while leaving Sales unrestricted. The Country expression identifies the signed-in manager, and the active relationships propagate that country filter to Sales and Human Resources.',
    },
    'f2-020-384': {
      status: 'corrected',
      reviewedAnswer: 'Background color; Rules.',
      originalAnswer: 'Background color; Field value.',
      reason:
        'The color is driven by numeric growth thresholds. Field value requires a separate field or measure that returns color values, which the scenario does not provide.',
      reasonAr:
        'اللون مبني على حدود رقمية في % Growth، لذلك نختار Background color ثم Rules. اختيار Field value يحتاج عمود أو Measure يرجع لونًا، وده غير موجود في السؤال.',
      explanation:
        'Reviewed answer: Background color, then Rules. Apply conditional formatting to the Total Sales cell background and define rules based on % Growth to Last Year. Field value is for a field or measure that already returns color names or color codes.',
      suppressSourceAnswerImage: true,
      evidence: [
        {
          label: 'Conditional formatting in Power BI',
          url: 'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-conditional-formatting',
        },
      ],
    },
    'f2-026-386': placeholderReview(
      'Create ProductName from the text between the third and fourth > delimiters; create the hierarchy ProductCategory > ProductSubcategory > Manufacturer > ProductName > ProductSpecification; replace ProductDescription in the report with the hierarchy.',
      'The fourth segment of ProductDescription is the product name. Extract it first, then build the hierarchy from broad category to detailed specification, and finally replace the long description field in report visuals with that hierarchy.',
      'نستخرج اسم المنتج من الجزء بين العلامتين الثالثة والرابعة، ثم نبني Hierarchy من العام للتفصيلي، وبعدها نستبدل ProductDescription بالـHierarchy في الـvisuals.',
    ),
    'f2-038-390': placeholderReview(
      'Yes; No; Yes.',
      'Apply the appropriate sensitivity labels and protection settings to the semantic models. A label can travel with supported exports and protection can restrict export, while endorsement is used to mark trusted data for decision-making. The three statements evaluate to Yes, No, and Yes in the order shown.',
      'الإجابات بالترتيب: Yes ثم No ثم Yes. نستخدم Sensitivity labels والحماية للبيانات الحساسة، وEndorsement لاعتماد البيانات المستخدمة في القرارات.',
      [
        {
          label: 'Sensitivity labels in Power BI',
          url: 'https://learn.microsoft.com/en-us/fabric/enterprise/powerbi/service-security-sensitivity-label-overview',
        },
      ],
    ),
    'f2-048-394': placeholderReview(
      'Data-classification shorthand: Sale. Dataset used by the dashboard: Insurance.',
      'The breadcrumb shows Insurance Data as the workspace and Customers as the dashboard. The visible Sale badge is the data-classification shorthand. The Q&A suggestions are grouped under INSURANCE, which identifies the dataset used by the dashboard.',
      'Insurance Data اسم الـWorkspace، وCustomers اسم الـDashboard. كلمة Sale هي اختصار الـData classification، والـDataset المستخدمة هي Insurance.',
    ),
    'f2-050-395': placeholderReview(
      'employee_id: Hide. employee_photo: Delete.',
      'employee_id remains necessary for the relationship, so hide it from report authors instead of removing it. employee_photo has no reporting or relationship use, so removing it reduces model size.',
      'employee_id مطلوب للعلاقة فنخفيه فقط. employee_photo غير مستخدم في التقرير أو العلاقات، فحذفه يقلل حجم الموديل.',
    ),
    'f2-059-397': placeholderReview(
      'Import the data; create the RLS roles in Power BI Desktop; publish the report; assign users to the roles in the Power BI service.',
      'Role definitions are authored in Desktop, but user membership is assigned only after publishing in the service. This order creates and then activates row-level security correctly.',
      'نستورد البيانات، ننشئ الـRoles في Desktop، ننشر، ثم نضيف المستخدمين للـRoles من Power BI Service؛ لأن Desktop لا يربط المستخدمين بالأدوار.',
    ),
    'f2-076-401': placeholderReview(
      'Replace; End. Formula: Text.Replace(Text.End([Phone], 12), " ", "-").',
      'Text.End keeps the final 12 characters, which removes the optional leading country code. Text.Replace then changes spaces to hyphens so every result has the nnn-nnn-nnnn format.',
      'Text.End يحتفظ بآخر 12 حرفًا لإزالة كود الدولة إن وجد، ثم Text.Replace يحول المسافات إلى شرطات.',
      [
        {
          label: 'Text.End',
          url: 'https://learn.microsoft.com/en-us/powerquery-m/text-end',
        },
        {
          label: 'Text.Replace',
          url: 'https://learn.microsoft.com/en-us/powerquery-m/text-replace',
        },
      ],
    ),
    'f2-083-403': placeholderReview(
      'Merge the Products and Categories queries; disable load for the intermediate Categories query.',
      'Merge adds the category columns to Products by matching CategoryID. The helper query must remain available to the merge, but disabling its load prevents an unnecessary standalone model table.',
      'نستخدم Merge لإضافة بيانات Categories إلى Products، ونوقف Enable load للـquery الوسيط حتى لا يتحمل كجدول مستقل داخل الموديل.',
    ),
    'f2-100-407': placeholderReview(
      'Convert the list to a table; expand the records; set the data types.',
      'A JSON array arrives as a list. Convert it to a table, expand each record into columns, and only then assign types so date attributes can support date hierarchies.',
      'الـJSON array يصل كـList؛ نحوله Table، ثم نوسع الـRecords إلى أعمدة، ثم نحدد أنواع البيانات وخصوصًا التاريخ.',
    ),
    'f2-106-410': placeholderReview(
      'Minimum bookmarks: 2. Bookmark property: Display.',
      'One bookmark shows the postal-code map and the other shows the monthly visual. Capture Display so the bookmarks change visual visibility without resetting the Chain slicer selection.',
      'نحتاج Bookmark لكل View، يعني 2. ونحفظ Display فقط حتى نبدّل ظهور الرسومات من غير ما نرجّع اختيار الـChain slicer.',
    ),
    'f2-130-417': placeholderReview(
      'Yes; No; Yes.',
      'Combine Files builds the transformation function from the selected sample file. Because the first file uses the older 2018 layout, the generated expansion contains the 2018 columns but does not automatically add the extra columns that exist only in 2019 files. Limiting type detection to the first 200 rows reduces profiling work and can improve import time.',
      'الإجابات: Yes ثم No ثم Yes. Power Query يبني دالة الدمج من ملف العينة الأول، وهو هنا ملف 2018 ذو الأعمدة الأقدم. لذلك أعمدة 2018 تظهر في الناتج، لكن الأعمدة الإضافية الموجودة فقط في ملفات 2019 لا تُضاف تلقائيًا. وفحص أول 200 صف فقط يقلل وقت اكتشاف أنواع البيانات.',
      [
        {
          label: 'Power Query combine files overview',
          url: 'https://learn.microsoft.com/en-us/power-query/combine-files-overview',
        },
        {
          label: 'Power Query text and CSV connector',
          url: 'https://learn.microsoft.com/en-us/power-query/connectors/text-csv',
        },
      ],
    ),
    'f2-136-419': placeholderReview(
      'Numbers = GENERATESERIES(-100, 100, 1)',
      'GENERATESERIES returns one row for each value from -100 through 100 inclusive, incrementing by 1, which is exactly the required calculated table.',
      'GENERATESERIES تنشئ صفًا لكل رقم من -100 إلى 100 شاملًا وبخطوة 1.',
    ),
    'f2-152-425': {
      status: 'incomplete-source',
      reviewedAnswer:
        'Cannot determine: the required output/layout is missing from the source.',
      originalAnswer: 'Matrix; Set Stepped layout to Off.',
      reason:
        'Only the existing table and a list of available settings are supplied. The original question does not state the required output. A prior correction assumed values-on-rows without source evidence; that assumption is withdrawn.',
      reasonAr:
        'المصدر بيعرض الجدول الحالي والاختيارات فقط، لكن مش كاتب شكل الناتج المطلوب. الشرح القديم افترض تحويل المقاييس لصفوف من غير دليل، لذلك لا نعتمد إجابة لحد استكمال المطلوب.',
      explanation:
        'Incomplete source: no unique answer can be determined. If a later source supplies a requirement to place measures on rows, use Matrix with values on rows; if it requests a different layout, a different setting may be required. Do not treat that conditional example as the answer to this incomplete item.',
      suppressSourceAnswerImage: true,
      evidence: [
        {
          label: 'Matrix visual formatting',
          url: 'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-matrix-visual-format-settings',
        },
      ],
    },
    'f2-157-426': placeholderReview(
      'Merge Region_Manager with Manager by using an inner join; merge Sales_Region with Sales_Manager by using an inner join; merge Sales_Region with Region_Manager by using an inner join.',
      'The three inner joins flatten the lookup information into the sales-region query and keep only matching records, simplifying the model presented to report authors.',
      'نعمل الـinner joins الثلاثة المحددة لضم بيانات المدير والمنطقة داخل Query موحّد مع الاحتفاظ بالصفوف المتطابقة فقط.',
    ),
    'f2-174-433': placeholderReview(
      'CALCULATE; SUM; TOPN; Transactions[TransactionDate].',
      'CALCULATE evaluates SUM(Transactions[Amount]) under the table filter returned by TOPN. TOPN keeps the latest 50 transaction rows by ordering Transactions[TransactionDate] descending.',
      'CALCULATE يحسب SUM للـAmount بعد أن يفلتر TOPN الجدول على أحدث 50 عملية حسب TransactionDate تنازليًا.',
    ),
    'f2-177-434': placeholderReview(
      'Human Resources: FALSE(). Country: [Email] = USERPRINCIPALNAME().',
      'The CFO role blocks Human Resources with FALSE() while leaving country sales unrestricted. The Manager role filters Country to the signed-in user; the model relationships propagate that filter to Sales and Human Resources.',
      'دور CFO يستخدم FALSE() على Human Resources ويظل يرى مبيعات كل الدول. دور Manager يفلتر Country بالبريد الحالي، والعلاقات تنقل الفلتر للجداول المرتبطة.',
    ),
    'f2-191-438': placeholderReview(
      'Finance users can use Analyze in Excel with the dataset. Corp users can be granted Build permission for the dataset.',
      'Analyze in Excel requires Build permission. A user who can reshare the dataset can grant Build permission to another group without transferring ownership or deleting the dataset.',
      'صلاحية Build تسمح لـFinance باستخدام Analyze in Excel. والمستخدم الذي لديه Reshare يقدر يمنح Corp صلاحية Build من غير نقل ملكية أو حذف.',
    ),
    'f2-197-441': placeholderReview(
      'A sum of the StoreID values; only the Sales table.',
      'StoreID is a whole-number field and uses numeric aggregation when added alone to a table visual, so Power BI displays its sum. A filter placed on the many-side Sales table does not flow backward through the single-direction relationships, so it filters only Sales.',
      'StoreID رقم ويُجمع افتراضيًا عند وضعه وحده في Table visual، فيظهر Sum. وفلتر Sales لا يرجع للخلف إلى جداول الأبعاد مع العلاقات أحادية الاتجاه، فيؤثر على Sales فقط.',
    ),
    'f2-201-443': placeholderReview(
      'Use First Row as Headers; unpivot all columns other than Measure; rename Attribute to Year; change Year to the Date data type.',
      'Promote the header row, normalize the year columns into rows with Unpivot Other Columns, rename the generated attribute, and assign a date type so the model can use the year values correctly.',
      'نرفع أول صف كعناوين، نعمل Unpivot لكل الأعمدة ماعدا Measure، نعيد تسمية Attribute إلى Year، ثم نحوله Date.',
    ),
    'f2-209-447': placeholderReview(
      'TOPN; SUMMARIZE; DESC.',
      'SUMMARIZE creates one row per customer with a Sales total. TOPN then returns 100 rows ordered by that Sales value in descending order, giving the highest-spending customers.',
      'SUMMARIZE يجمع المبيعات لكل Customer، ثم TOPN يأخذ أعلى 100 بعد الترتيب DESC على Sales.',
    ),
    'f2-214-448': placeholderReview(
      'Create a blank query; enter = Table.Profile(#"SalesDetail") and close/apply; create a visual from the resulting profile table.',
      'Table.Profile returns per-column statistics such as count, null count, minimum, maximum, average, and standard deviation. A blank query is used to call it, then the returned table can drive report visuals.',
      'ننشيء Blank Query، نستخدم Table.Profile على SalesDetail، ثم Close & Apply ونبني Visual من جدول الإحصاءات الناتج.',
      [
        {
          label: 'Table.Profile',
          url: 'https://learn.microsoft.com/en-us/powerquery-m/table-profile',
        },
      ],
    ),
    'f2-228-453': placeholderReview(
      'Access a published app: Power BI Pro. Modify a report in an app workspace: Power BI Pro. Share dashboards from My Workspace: Power BI Pro.',
      'The scenario does not state that the app is hosted in Premium/Fabric F64+ capacity, so viewing shared app content requires Pro. Editing workspace content and sharing content also require a paid Pro or PPU license.',
      'السؤال لم يذكر Premium أو Fabric F64+، لذلك مشاهدة App مشتركة تحتاج Pro. تعديل تقارير Workspace ومشاركة Dashboard يحتاجان Pro أيضًا.',
      [
        {
          label: 'Power BI licenses for business users',
          url: 'https://learn.microsoft.com/en-us/power-bi/consumer/end-user-license',
        },
      ],
    ),
    'f2-232-454': placeholderReview(
      'Select Department and Stage and unpivot the other columns; rename Attribute to School and Value to Score; group by Department and School and average Score.',
      'Unpivoting converts School1 through School4 into School/Score rows. Grouping by Department and School and averaging Score combines the two Stage rows into the requested result.',
      'نثبت Department وStage ونعمل Unpivot لباقي الأعمدة، نسمي Attribute إلى School وValue إلى Score، ثم Group By على Department وSchool مع Average للـScore.',
    ),
    'f2-252-460': placeholderReview(
      '75 rows; reduce.',
      'With UnitsInStock set to Do not summarize, the table can display the 75 non-null source values. Changing summarization to Sum aggregates those values, so the number of displayed rows is reduced.',
      'بدون Summarization تظهر 75 قيمة غير فارغة. عند تغييرها إلى Sum تتجمع القيم، فيقل عدد الصفوف المعروضة.',
    ),
    'f2-256-461': placeholderReview(
      'Use a line chart; populate the axis with a date field.',
      'Power BI anomaly detection requires a line chart with time-series data on a continuous date/time axis.',
      'Anomaly detection تعمل على Line chart، ولازم محور الزمن يحتوي حقل Date/Time مناسب.',
      [
        {
          label: 'Anomaly detection in Power BI',
          url: 'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-anomaly-detection',
        },
      ],
    ),
    'f2-266-464': placeholderReview(
      'Row label: Name. Key column: ID. Is featured table: Yes.',
      'Name is the human-readable row label, ID uniquely identifies each row for Excel, and the table must be marked as featured so users can discover it as an organizational data type.',
      'Name هو الاسم الظاهر للمستخدم، وID هو المفتاح الفريد، ولازم Is featured table تكون Yes حتى يظهر الجدول كـOrganizational data type في Excel.',
    ),
    'f2-281-468': placeholderReview(
      'Get Data > Folder; remove the Content column; expand the Attributes column.',
      'The Folder connector returns file metadata and binary Content. Removing Content prevents file contents from being stored, while expanding Attributes exposes the required metadata fields.',
      'نستخدم Folder connector، نحذف Content حتى لا نخزن محتوى الملفات، ثم نوسّع Attributes لإظهار الـmetadata.',
    ),
    'f2-287-471': placeholderReview(
      'No; No; Yes.',
      'Summarizing orders by their identifying columns would not preserve the required measures, and CustomerID is needed for new/repeat customer analysis. UnitPrice and Discount are not needed for the listed analyses when the required sales value is already available, so removing them reduces size.',
      'بالترتيب No ثم No ثم Yes. لا نحذف CustomerID لأنه مطلوب لتحليل العملاء الجدد والمتكررين، ويمكن حذف UnitPrice وDiscount إذا لم يدخلا في التحليلات المطلوبة.',
    ),
    'f2-303-475': placeholderReview(
      'Yes; No; Yes.',
      'LastUpdated is not required by any listed analysis and can be removed. ProductID is required for sales and quantity by product. ShipDate is not used because every requirement is based on OrderDate.',
      'LastUpdated غير مستخدم في التحليلات فيُحذف. ProductID ضروري للتحليل حسب المنتج فلا يُحذف. ShipDate غير مطلوب لأن كل التحليلات مبنية على OrderDate.',
    ),
    'f2-318-479': placeholderReview(
      'CALCULATE; ALLSELECTED.',
      'CALCULATE changes filter context for the percentage measure. ALLSELECTED removes the current product row filter while retaining external report and slicer filters, producing percent of the selected total.',
      'CALCULATE يغير Filter Context، وALLSELECTED يزيل فلتر صف المنتج الحالي مع الاحتفاظ بفلاتر الصفحة والـslicers لحساب نسبة الإجمالي المحدد.',
    ),
    'f2-323-480': placeholderReview(
      'Sync the Country slicer across all pages; hide the slicer on the second and third pages.',
      'Syncing applies the same selected country to every page. Hiding the synchronized slicer on pages two and three preserves the filter without repeating the control.',
      'نفعّل Sync للـCountry slicer على كل الصفحات، ثم نخفيه في الثانية والثالثة؛ الفلتر يظل مطبقًا من غير تكرار الـslicer.',
    ),
    'f2-331-482': placeholderReview(
      'Percentage contribution by region: Pie chart. Profit over time: Stacked bar chart.',
      'A pie chart emphasizes part-to-whole contribution by region. A stacked bar chart can show quarterly values over time while also retaining category composition.',
      'Pie chart توضح نسبة مساهمة كل Region من الإجمالي، وStacked bar chart تعرض الربح عبر الأرباع مع المقارنة بين المكونات.',
    ),
    'f2-337-484': {
      status: 'corrected',
      reviewedAnswer:
        'Cross-highlight the clustered column chart; cross-filter the map.',
      originalAnswer:
        'Cross-filter the clustered column chart; cross-highlight the map.',
      reason:
        'Column and bar charts support cross-highlighting. Maps, line charts, and scatter charts can only be cross-filtered as target visuals.',
      reasonAr:
        'الـclustered column chart يقبل Cross-highlight، أما الـMap فلا يقبل Cross-highlight كـtarget ويُستخدم معه Cross-filter.',
      explanation:
        'Reviewed answer: selecting a quarter on the line chart cross-highlights the clustered column chart. Selecting a point on the line chart cross-filters the map. Power BI retains and dims unrelated columns during cross-highlighting, but line charts, scatter charts, and maps are cross-filter targets only.',
      suppressSourceAnswerImage: true,
      evidence: [
        {
          label: 'Change visual interactions',
          url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions',
        },
      ],
    },
    'f2-349-488': placeholderReview(
      'The goal is set in the Format settings; add Territory to the Visual level filters field and select Canada.',
      'The Target value field well in the exhibit is empty, so the gauge goal was entered in the visual formatting settings. A visual-level filter keeps this gauge on Canada regardless of other report content.',
      'خانة Target value في الرسم فارغة، إذن الـGoal مضبوط من Format settings. ولتثبيت Canada نضع Territory في Visual level filters.',
    ),
    'f2-353-489': placeholderReview(
      'Report: CONTOSO BIKES. Number of datasets: three.',
      'Following the lineage arrows identifies CONTOSO BIKES as the report in the requested path. The lineage view shows three separate datasets feeding the downstream content.',
      'بتتبع أسهم الـLineage نصل إلى تقرير CONTOSO BIKES، والرسم يعرض ثلاثة Datasets مستقلة.',
    ),
    'f2-368-495': placeholderReview(
      'Open powerbi.com; open the Sales report; pin the live page to the dashboard.',
      'Pinning the entire report page creates a live page tile. Unlike pinning the visuals one by one, later report changes remain synchronized with the dashboard tile.',
      'نفتح Power BI Service ثم تقرير Sales ونختار Pin live page. ده يضيف الصفحة كلها ويحافظ على مزامنة تغييرات التقرير.',
    ),
    'f2-378-498': placeholderReview(
      'CALCULATE; DATEADD; DIVIDE.',
      'CALCULATE evaluates sales under the prior-quarter date context produced by DATEADD. DIVIDE safely calculates the relative change and handles a zero denominator.',
      'CALCULATE يحسب المبيعات في سياق الربع السابق الذي ينشئه DATEADD، ثم DIVIDE تحسب النسبة بأمان.',
    ),
    'f2-389-501': placeholderReview(
      'Table.RemoveColumns; List.Select; Text.EndsWith.',
      'Table.RemoveColumns removes a dynamically generated list of unwanted columns. List.Select filters Table.ColumnNames(rawData), and Text.EndsWith keeps the names whose suffix is sourceid.',
      'Table.RemoveColumns يحذف قائمة الأعمدة، وList.Select يبني هذه القائمة من أسماء الأعمدة التي يطابقها Text.EndsWith مع sourceid.',
    ),
    'f2-396-504': placeholderReview(
      'CALCULATE; COUNTROWS; ALL.',
      'CALCULATE evaluates COUNTROWS(Customer) after ALL removes the current row filter from the Email Address column. The explicit equality filter then reapplies the current email and counts its duplicates.',
      'CALCULATE تشغّل COUNTROWS بعد أن تزيل ALL فلتر الصف الحالي، ثم يعاد فلتر البريد الحالي لحساب مرات تكراره.',
    ),
    'f2-403-506': {
      ...placeholderReview(
        'Human Resources: FALSE(). Country: [Email] = USERPRINCIPALNAME().',
        'The CFO role uses FALSE() on Human Resources to deny every row while leaving country sales available. The Manager role filters Country to the signed-in manager, and the relationships propagate that country filter.',
        'دور CFO يمنع كل صفوف Human Resources باستخدام FALSE(). دور Manager يفلتر Country ببريد المستخدم الحالي، والعلاقات تنقل الفلتر لباقي الجداول.',
      ),
      promptAppend:
        '\n\nYou create two row-level security (RLS) roles named Manager and CFO. Each manager must see only Sales and Human Resources data for their own country. The CFO must see Sales for all countries but must not see any Human Resources rows. Complete the two RLS filters for Human Resources and Country.',
    },

    'f2-003-371': explanationOnly(
      'FORMAT(\'Date\'[date], "MMM YYYY") returns a text label such as Oct 2026 from each date. The format string supplies the abbreviated month and four-digit year required by the report.',
    ),
    'f2-005-373': explanationOnly(
      'Create reusable dataflows for the standardized Business Unit, Department, and Product Category entities. Multiple imported semantic models can then consume the same governed definitions instead of repeating transformation logic.',
    ),
    'f2-021-385': explanationOnly(
      'A Smart narrative visual automatically generates a natural-language summary of trends and important values, and recalculates that narrative when selections in other visuals change the filter context.',
    ),
    'f2-027-387': explanationOnly(
      'Create row-level security roles that filter each department and assign the corresponding users to those roles in the Power BI service. RLS enforces the restriction at the semantic-model level rather than relying on editable report filters.',
    ),
    'f2-044-393': explanationOnly(
      'Use a line chart with the historical date on the axis, then add Forecast from the Analytics pane for the next six months. A line chart is the supported time-series visual for forecasting.',
    ),
    'f2-054-396': explanationOnly(
      'SUMMARIZE groups the Date table by Calendar Year, Calendar Quarter, and Calendar Month and returns one row per unique combination, which is the required calculated table grain.',
    ),
    'f2-081-402': explanationOnly(
      'No. USERELATIONSHIP activates one inactive relationship inside a measure, but one shared Date table still cannot filter Due Date, Order Date, and Delivery Date simultaneously for independent analysis. Use separate role-playing date tables when all three date roles must be available at the same time.',
    ),
    'f2-105-409': explanationOnly(
      'Use Table.TransformColumnTypes in the Store query so Store[Store_ID] has the same data type as Order[Store_ID] before the relationship is created. Relationship keys must have compatible data types; transforming rows does not solve that requirement.',
    ),
    'f2-111-411': explanationOnly(
      'Select Replace Errors and enter 0.05. This replaces only the error cells and preserves every row, meeting the requirement with one transformation step.',
    ),
    'f2-118-413': explanationOnly(
      'Enable Q&A for the live-connected semantic model in the Power BI service. The service setting controls whether users can ask natural-language questions against that dataset.',
    ),
    'f2-143-422': explanationOnly(
      'CALCULATE([Total Sales], DATEADD(Date[Date], -1, QUARTER)) shifts the current date filter context back by one quarter and reevaluates Total Sales. DATESQTD returns quarter-to-date dates, while the positive PARALLELPERIOD option moves forward.',
    ),
    'f2-144-423': explanationOnly(
      'Use Q&A to ask for inventory by location, then pin the generated visual to the dashboard. This creates the new dashboard tile without modifying the existing report.',
    ),
    'f2-161-427': explanationOnly(
      'Split Machine-User by its delimiter in Power Query to create separate Machine and User columns before loading. This is a source-shaping task, so it should not be implemented as measures.',
    ),
    'f2-164-428': explanationOnly(
      'Remove Subject and Body during import. They contain the readable email content and consume substantial model space, while From and To are sufficient for network analysis.',
    ),
    'f2-180-435': explanationOnly(
      'Create a data alert on the KPI dashboard tile at the 3% threshold. Alerts notify the user when a supported dashboard tile crosses a configured value.',
    ),
    'f2-187-437': explanationOnly(
      'No. Importing the full 100-million-row table and filtering afterward can still retrieve and process the entire source. Apply the sample limit as a source-side filter or parameter early enough for query folding.',
    ),
    'f2-205-446': explanationOnly(
      'Use ODBC. Cassandra can expose an ODBC driver even when Power BI has no dedicated native connector; ODBC supplies the generic standards-based connection path.',
    ),
    'f2-247-459': explanationOnly(
      'Set the report Export data option to prevent end users from exporting any data. This is scoped to report1, so other reports that use the same shared semantic model are not changed.',
    ),
    'f2-271-465': explanationOnly(
      'Use Data source settings in Power BI Desktop to edit the Azure SQL connection used by the PBIX. It updates the connection centrally instead of editing every query separately.',
    ),
    'f2-277-467': explanationOnly(
      'After publishing, open the semantic model security settings in powerbi.com and add the HR users or group to the HR role. Role definitions are created in Desktop; membership is assigned in the service.',
    ),
    'f2-284-469': explanationOnly(
      'Use the Key influencers visual. It analyzes candidate explanatory fields and ranks those that most strongly increase or decrease the numeric Spend outcome.',
    ),
    'f2-300-474': explanationOnly(
      'Yes. Keeping one unique integer identifier and removing the unused GUID reduces cardinality and model size while preserving a row key. The date/time column can then support hour and day-of-year analysis.',
    ),
    'f2-355-490': explanationOnly(
      'Modify Position to change the X and Y coordinates of each visual on the report canvas. Layer order controls overlap, padding controls internal spacing, and tab order controls keyboard navigation.',
    ),
    'f2-366-494': {
      status: 'corrected',
      choices: [
        'PATH(Employees[EmployeeID], Employees[ParentEmployeeID])',
        'PATHLENGTH(PATH(Employees[EmployeeID], Employees[ParentEmployeeID]))',
        'PATHITEM(PATH(Employees[EmployeeID], Employees[ParentEmployeeID]), 1)',
        'PATHCONTAINS(PATH(Employees[EmployeeID], Employees[ParentEmployeeID]), Employees[EmployeeID])',
      ],
      correct: [1],
      reviewedAnswer:
        'PATHLENGTH(PATH(Employees[EmployeeID], Employees[ParentEmployeeID]))',
      originalAnswer: 'Option B (the source omitted the actual DAX options).',
      reason:
        'PATH constructs the employee-to-CEO chain and PATHLENGTH returns the number of items in that chain. The source choices were unusable placeholders.',
      reasonAr:
        'PATH يبني مسار الموظف حتى الـCEO، وPATHLENGTH يحسب عدد المستويات في المسار. استبدلنا Option A/B/C/D بالصيغ الفعلية لأن المصدر كان ناقصًا.',
      explanation:
        'Reviewed answer: PATHLENGTH(PATH(Employees[EmployeeID], Employees[ParentEmployeeID])). PATH returns the hierarchy path for each employee; PATHLENGTH counts the employee and every ancestor through the CEO.',
      evidence: [
        {
          label: 'PATH functions in DAX',
          url: 'https://learn.microsoft.com/en-us/dax/parent-and-child-functions-dax',
        },
      ],
    },
  };
