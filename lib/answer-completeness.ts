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
    'f1-144-143': explanationOnly(
      'Use the conventional nested IF, then HIGH and MEDIUM. Values exactly 0.5 and 0.7 are MEDIUM with the shown strict comparisons. IF.EAGER can produce the same labels but forces eager branch evaluation, for which no need is stated; the item is not unique by output alone. The template also refers directly to Opportunity[Qualification] although it calls the result a measure: define the single-opportunity scalar context or use a calculated column rather than assuming an unaggregated column works in every measure context.',
    ),
    'f1-146-145': explanationOnly(
      'HASONEVALUE; DENSE. Dense ranks 100,100,90 as 1,1,2 instead of the Skip result 1,1,3. HASONEVALUE checks one distinct item in context, not the literal presence of a direct filter or whether a visual is at a row level; a total can also have one item. The shown [Quantity] needs to be a valid scalar measure or aggregation, even though the prompt only describes a Quantity column. Use an appropriate aggregate measure when applying the formula.',
    ),
    'f1-148-147': explanationOnly(
      'Single; delete the many-to-one relationship is the offered first step to remove the competing active path. Making that relationship inactive is another normal approach, but is not an option. Deletion alone does not finish the configuration: activate the intended relationship and configure/test cross-filtering and security-filter propagation. A bidirectional ordinary relationship setting must not be confused with the separate security filtering behavior.',
    ),
    'f1-152-151': explanationOnly(
      'Source2 only is the intended source classification: private Azure SQL connectivity needs an accessible private-network gateway path, unlike cloud OneDrive and a supported public website connection in the stated scenario. An on-premises gateway can run on a VM with network access to Azure SQL. A VNet data gateway is also a supported alternative under suitable conditions; do not claim the installed on-premises gateway is the only possible architecture. A locally synchronized OneDrive file path is different from the cloud connector.',
    ),
    'f1-155-154': explanationOnly(
      'No for an additional model aggregation created after importing detail: the detail still crossed the gateway. If the question instead means source-side aggregation or a folded Power Query grouping loaded instead of detail, that can reduce transferred data. The source does not specify where summarization occurs, so keep this distinction explicit rather than teaching that aggregation can never reduce gateway traffic.',
    ),
    'f1-157-156': explanationOnly(
      'Yes: incremental refresh can reduce transferred data by refreshing recent partitions rather than the entire historical import. It does not necessarily retrieve only individually changed rows: partitions within the refresh window may be fully reloaded, and detecting changes is an additional setting. RangeStart/RangeEnd restrictions must reach the source through folding or an equivalent supported filter for the intended network saving. The initial refresh can load the historical range, and changes outside the refresh window need a suitable policy.',
    ),
    'f1-160-159': explanationOnly(
      'Remove unnecessary columns after checking reporting, calculation, relationship and security dependencies. Renaming does not remove stored values. Unpivot is not automatically a size reduction or increase; its result depends on shape, cardinality and compression. DirectQuery avoids a full local import but can add source/network latency, so it does not guarantee unchanged report response times.',
    ),
    'f1-142-141': {
      status: 'corrected',
      correct: [2],
      originalAnswer:
        'A: Table.Buffer in Query1 shares a cache between referencing queries.',
      reviewedAnswer: 'C: Reconfigure Query1 as a dataflow entity.',
      reasonAr:
        'Table.Buffer لا تشارك نتيجتها بين تنفيذات الاستعلامات المرجعية المستقلة. Dataflow تحفظ نتيجة التحضير لإعادة استخدامها؛ هذا ما توصي به Microsoft لنفس السيناريو.',
      explanation:
        'Corrected answer: C, reconfigure Query1 as a dataflow entity. Microsoft documents this same Query1/Query2/Query3/Query4 scenario: Table.Buffer only buffers within one query execution and does not eliminate additional retrieval by independently evaluated referencing queries. Buffering can add memory work and prevent downstream folding. A dataflow persists source preparation for reuse. Choose an option supported by the existing license; Gen2 and legacy dataflows have different licensing requirements. Do not claim every dataflow is free or every buffer improves performance.',
      evidence: [
        {
          label: 'Microsoft: referencing queries and dataflows',
          url: 'https://learn.microsoft.com/en-us/power-bi/guidance/power-query-referenced-queries',
        },
        {
          label: 'Table.Buffer scope and cautions',
          url: 'https://learn.microsoft.com/en-us/powerquery-m/table-buffer',
        },
      ],
    },
    'f1-103-102': {
      status: 'independently-reviewed',
      promptAppend:
        'Recovered original error message: ERROR [08001] timeout expired.',
      explanation:
        'The recovered source PDF page 127 shows ERROR [08001] timeout expired, not an out-of-memory error. The intended answers are A and B. Reducing rows/columns can reduce query and transfer time; splitting long queries and merging is conditional on an effective execution plan and a safe unique join key. Neither is guaranteed to fix a connection timeout before query execution. Diagnose connectivity versus query execution, timeout settings and folding before implementing a fix. Disabling folding or blindly combining all slow queries is not a general remedy.',
    },
    'f1-132-131': {
      status: 'corrected',
      reviewedAnswer: "COUNTROWS('Headcount'); LASTDATE('Headcount'[DateKey]).",
      originalAnswer: "COUNTROWS('Headcount'); LASTDATE('Date'[Date]).",
      reasonAr:
        'اللقطة في أول الشهر والتقويم يمتد2030. آخر تاريخ بيانات فيHeadcount هوالمطلوب، لا آخر يوم فيالتقويم الذي قد يكون بلا لقطة.',
      explanation:
        "Use CALCULATE(COUNTROWS('Headcount'), LASTDATE('Headcount'[DateKey])). The question specifies monthly snapshots keyed to the first day of each month. LASTDATE('Date'[Date]) can pick month-end or a future calendar date with no snapshot, producing blank instead of the last available headcount. LASTDATE on the fact's date-valued DateKey selects the latest snapshot date visible in the current period. COUNTROWS then counts one row per employee in that snapshot. This returns the latest snapshot within the selected period, not a carry-forward from an earlier period with no snapshot.",
      suppressSourceAnswerImage: true,
      evidence: [
        {
          label: 'LASTDATE: last date in the current column context',
          url: 'https://learn.microsoft.com/en-us/dax/lastdate-function-dax',
        },
      ],
    },
    'f1-128-127': explanationOnly(
      'SUMMARIZE; Date[Year]. The source fields use Sales[Sale], so the completed expression is SUMMARIZE(Sales, Date[Year], "Sales", SUM(Sales[Sale])). Do not replace Sale with an invented SalesAmount column. This is a refresh-time calculated summary table, not a dynamic measure that recomputes its stored rows on every slicer change.',
    ),
    'f1-134-133': explanationOnly(
      'Use CALCULATE([Total Sales], DATEADD(Date[Date], -1, QUARTER)). Negative one shifts the current period one quarter backward. The offered PARALLELPERIOD uses positive 1, which shifts forward, not backward; with date-column input it also expands to full quarters. DATESQTD and TOTALQTD calculate quarter-to-date, not the previous quarter.',
    ),
    'f1-137-136': explanationOnly(
      'Place the measures in Values. A matrix can show measure labels on rows through the Show on rows formatting setting; a field parameter is not required merely to obtain that layout. Rows and Columns hold grouping fields, while Values evaluates measures in each intersection context.',
    ),
    'f1-080-79': explanationOnly(
      'Use suitable one-to-many dimension relationships and group Impressions by Ad_id, Site_name and daily Impression_date with Count Rows before loading. Sum the stored count for impression totals; COUNTROWS of the summary counts groups instead of original events. Relationships are not storage-free, and a calculated table does not automatically remove the original fact.',
    ),
    'f1-083-82': explanationOnly(
      'The blanks are CALCULATE, SUM and DATESBETWEEN. DATESBETWEEN takes three arguments: dates, start date and end date. The source endpoint LASTDATE(Sales[Date])-365 is not a universally correct prior-year calendar endpoint: leap years and missing sales on selected dates can change the intended range. The blank selections fit the shown template; validate its boundaries before treating it as a general PYTD formula.',
    ),
    'f1-089-88': explanationOnly(
      'No; No; Yes under the displayed grain and materialized SalesTotal assumption. Grouping by CustomerID, OrderID and OrderDate does not guarantee fewer rows when OrderID already identifies each shown record. Grouping does not inherently increase detail or always prevent sales totals. Keep CustomerID for the relationship and repeat-customer analysis. Remove UnitPrice and Discount only if stored SalesTotal suffices and does not depend on those columns remaining in the model.',
    ),
    'f1-090-89': explanationOnly(
      'CALCULATE; DATEADD; DIVIDE. DATEADD with -1 QUARTER shifts a quarter, not one month. Relative growth is (current minus previous)/previous. DIVIDE handles a zero or blank denominator safely; partial-period selections follow the selected date context rather than guaranteeing full-quarter totals.',
    ),
    'f1-091-90': explanationOnly(
      'TOPN; DESC. TOPN selects the highest eight by Total Sales, but ties at the eighth position can return more than eight rows. Add a unique secondary sort key if exactly eight are required. TOPN does not guarantee the final display order of returned rows.',
    ),
    'f1-096-95': explanationOnly(
      'No for the proposed solution restricted to the active relationship: that alone does not cover all three date roles. The original reason is wrong: USERELATIONSHIP can use an existing active or inactive relationship. To analyze other date roles, target the corresponding existing relationships in suitable calculations, or use separate role-playing dimensions with active relationships. USERELATIONSHIP does not create a missing relationship.',
    ),
    'f1-098-97': explanationOnly(
      'FILTER; AND; CALCULATE. Select Transaction Size rows where Min <= the row sales amount AND Max >= it, then evaluate the distinct category within that filter. The source field list calls the amount Sales Amount but its printed code refers to Sales[Sales]; fix that inconsistent column name before running it. The inclusive integer ranges must not overlap, and the amount must match one category; decimals between the shown integer bounds can be uncovered.',
    ),
    'f1-099-98': explanationOnly(
      'Remove LineItems[Description], which is not required by the displayed visuals. Do not remove historical records because two visuals have no last-month restriction. Grouping can reduce row count, contrary to the old explanation, but the offered grouping by Invoice ID and Invoice Date does not preserve Supplier ID, required for supplier and country analysis. Do not claim grouping never affects size.',
    ),
    'f1-100-99': explanationOnly(
      'Keep Traffic rows whose URL Visited contains blog, and remove Posts[Full Text] and Posts[Summary]. Preserve Referring URL for the external-referral visual. Removing Posts published in the last seven days discards recent posts, not old history, and breaks the requested analysis. Removing referring URLs that do not start with / would remove the external referrals the report explicitly needs.',
    ),
    'f1-105-104': explanationOnly(
      'Yes. Remove the redundant high-cardinality text GUID while retaining the equally unique numeric IoT ID and the timestamp needed for hourly and daily analysis. The source claim that Power BI Whole Number is always a four-byte unsigned long is incorrect: its logical type is a 64-bit integer and storage is compressed. Verify relationships and dependencies before deleting an identifier in a real model.',
    ),
    'f1-109-108': explanationOnly(
      'The intended source selections are A and C: create/mark an explicit Date table and relate it to Sales. Do not infer that marking one date table removes every hidden auto date/time table for other eligible columns. Order Date becomes the many side of a relationship, while unconnected Ship Date and Delivered Date can remain eligible when Auto date/time stays on. For guaranteed removal of all automatic tables, disable Auto date/time after building and wiring a replacement and migrating dependent visuals. The choose-two source is not a complete migration checklist.',
    ),
    'f1-116-115': explanationOnly(
      'Split Logged using at, then verify the date part is trimmed and typed as Date. Splitting alone can leave text and does not by itself guarantee a built-in date hierarchy; Auto date/time and table eligibility also apply. The other offered actions do not explicitly normalize the stated nonstandard text format while preserving its full date.',
    ),
    'f1-070-69': {
      status: 'corrected',
      correct: [0],
      originalAnswer: 'No: Source must first transfer every row.',
      reviewedAnswer:
        'Yes for a foldable SQL row filter applied before final Import load.',
      reason:
        'SQL Server supports folding suitable Power Query filters to the source. No requires non-folding or already-retrieved data, which the original does not specify.',
      reasonAr:
        'Yes لفلتر SQL قابل للـfolding قبل التحميل. No إذا كانت التصفية محلية بعد جلب الكل؛ المصدر لم ينص على هذا الشرط.',
      explanation:
        'Reviewed answer: Yes under the normal interpretation of a foldable SQL Server row filter added before final Import load. Query folding can push that filter to SQL. No is appropriate if all rows have already been retrieved or the filter cannot fold; the source does not specify those conditions. The original claim that Source must first transfer every row is not generally true. Verify the emitted query. This is a conditional interpretation, not a guarantee for every M filter.',
      evidence: [
        {
          label: 'Query folding',
          url: 'https://learn.microsoft.com/en-us/power-query/query-folding-basics',
        },
      ],
    },
    'f1-078-77': {
      status: 'corrected',
      reviewedAnswer: '51 rows; reduce, if unique means distinct values.',
      originalAnswer: '75 rows; reduce.',
      reasonAr:
        'جدول بعمود واحد يعرض القيم المختلفة، لا كل سجلات المصدر.51 صحيح لو unique بمعنى distinct؛ لو إحصاء الظهور الواحد فالعدد غير محدد.',
      explanation:
        'A non-aggregated table visual with one column groups identical values. If 51 unique means 51 distinct values, it shows 51 rows, not the 75 source records. Sum without any other grouping gives one total row and reduces the row count. If unique means once-occurring values in Power Query profiling, the full distinct count is unknown. Is nullable does not force one visual row per source row.',
      suppressSourceAnswerImage: true,
      evidence: [
        {
          label: 'Aggregates and grouping',
          url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/service-aggregates',
        },
      ],
    },
    'f1-061-60': {
      status: 'outdated',
      reviewedAnswer:
        'Historical answer: Row label Name; Key column ID; Is featured table Yes.',
      reason:
        'Microsoft documents that this functionality was removed from Power BI Desktop in the June 2026 release.',
      reasonAr:
        'الإجابة تخص الواجهة القديمة. Microsoft أزالت الوظيفة من Power BI Desktop في يونيو 2026، فلا نقدمها كخطوة متاحة حاليًا.',
      explanation:
        'Historical settings: Name is the human-readable Row label; ID is the unique Key column; Is featured table is Yes. This question describes an old feature: Microsoft states it was removed from Power BI Desktop in June 2026. Do not treat the screenshot as a current Desktop setup instruction.',
      evidence: [
        {
          label: 'Featured tables: removal notice and historical settings',
          url: 'https://learn.microsoft.com/en-us/power-bi/collaborate-share/office-integration/service-create-excel-featured-tables',
        },
      ],
    },
    'f1-041-40': explanationOnly(
      'Choose Transform > Date > Year > Year to replace the existing Date column with its year. Add Column would preserve Date and add a separate Year column, which is a different operation from the requested transformation. If Date is text, first interpret it as a date using the correct locale.',
    ),
    'f1-044-43': explanationOnly(
      'Change the data type in both cases. The date column is shown as Any and needs a date-compatible type before extracting Day. The menuAmount column is incorrectly typed as Date; edit the step that imposed that type and use the appropriate numeric type. An Error created upstream is not necessarily repaired by appending another type-conversion step after it. Renaming and conditional formatting do not repair the conversion.',
    ),
    'f1-045-44': explanationOnly(
      'CustomerID: Remove the column, because the stated report only needs weekly sales by region and no use of that ID is specified. Do not remove duplicate customers from a transaction fact: that would discard real sales. PurchaseDateTime: Split into date and time is the best available option because it retains the required date and separates a high-cardinality timestamp. For the smallest practical model, do not load the unused time component. Splitting alone does not guarantee the minimum size for every dataset. Removing the entire timestamp would prevent weekly analysis.',
    ),
    'f1-046-45': explanationOnly(
      'Create a PBIDS data source file to simplify connecting to the same Azure SQL source. PBIDS does not contain authentication information or grant database access: the other user authenticates with their own credentials and selects tables in Navigator. PBIT shares a report/model template; PBIX shares the saved report/model and potentially imported data. Neither is the specialized connection-only file requested.',
    ),
    'f1-048-47': explanationOnly(
      'DirectQuery is the appropriate connectivity mode for querying recent Azure SQL data without waiting for an Import refresh. It does not by itself guarantee that an already-open report screen updates within two minutes. Configure and test the query/display refresh cycle, supported automatic page refresh interval, capacity limits, caching and source query latency to meet that operational requirement.',
    ),
    'f1-051-50': explanationOnly(
      'Customer Name has repeated values according to its distinct/unique profile, unlike the displayed Customer ID and Customer Key columns. Extract the last 12 characters is the intended phone transformation for the shown formats: 500-555-0169 contains ten digits plus two hyphens. It removes the optional country prefix and leading separator space. It does not produce a string of exactly ten characters; if that is required, remove the hyphens as an additional step. This fixed-width method must not be generalized to phone formats with different national-number lengths.',
    ),
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
      '51 rows; reduce, if unique means distinct.',
      'A single-column table groups identical values: 51 distinct values yield 51 rows. Sum without grouping yields one total row. If unique means once-occurring values, the initial row count is not determined. Do not summarize does not force display of all 75 source records.',
      '51 صفًا لو unique تعني distinct، ثم يقل العرض لإجمالي واحد مع Sum. لو المقصود القيم ذات الظهور الواحد فالعدد الأول غير محدد؛ لا نساويه75 تلقائيًا.',
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
      'Profit contribution by product category, shown as an amount and percentage: Pie chart. Compare profit margins across regions: Stacked bar chart.',
      'A pie chart shows each product category as a share of total profit; its labels can display both the amount and percentage of total. Of the available choices, a stacked bar chart compares profit margins across regions. The second requirement is a comparison between regions, not a time-series requirement.',
      'Pie chart توضح مساهمة كل فئة منتجات في إجمالي الربح بالقيمة والنسبة، وStacked bar chart تقارن هوامش الربح بين مناطق البيع؛ المطلوب الثاني ليس تغير الربح بمرور الزمن.',
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
