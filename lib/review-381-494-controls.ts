import type { TextAnswerRow } from './text-answer-data.ts';
import type { QuestionPresentation } from './question-presentation.ts';
import type { QuestionCorrection } from './answer-audit.ts';
const row = (label: string, options: string[]): TextAnswerRow => ({
  label,
  options,
});
const functions = ['CALCULATE', 'CONCATENATEX', 'SUM', 'SUMX', 'TOPN'];
const ranking = ['ASC', 'DESC', 'FILTER', 'SUMMARIZE', 'TOPN'];
const quarter = [
  'CALCULATE',
  'CALCULATETABLE',
  'DATEADD',
  'DIVIDE',
  'FILTER',
  'FIND',
];
export const textRows: Record<string, TextAnswerRow[]> = {
  'f2-050-395': [
    row('Employee_id:', ['Change Type', 'Delete', 'Hide', 'Sort']),
    row('Employee_photo:', ['Change Type', 'Delete', 'Hide', 'Sort']),
  ],
  'f2-076-401': [
    row('Outer Text function:', [
      'Insert',
      'Remove',
      'Replace',
      'ReplaceRange',
    ]),
    row('Inner Text function:', ['At', 'End', 'Middle', 'Range']),
  ],
  'f2-083-403': [
    row('Combine the queries by performing a:', [
      'Append',
      'Merge',
      'Transpose',
    ]),
    row('On the Categories query:', [
      'Delete the query.',
      'Disable the query load.',
      'Exclude the query from report refresh.',
    ]),
  ],
  'f2-106-410': [
    row('Minimum number of bookmarks:', ['1', '2', '3', '4']),
    row('Property:', ['Data', 'Display', 'Current page']),
  ],
  'f2-136-419': [
    row('DAX function:', ['GENERATE', 'GENERATEALL', 'GENERATESERIES']),
    row('Arguments:', ['(-100, 1, 200)', '(-100, 100, 1)', '(-1, -100, 100)']),
  ],
  'f2-174-433': [
    row('Outer function:', functions),
    row('Aggregate Transactions[Amount] using:', functions),
    row('Select 50 transaction rows using:', functions),
    row('Order Transactions by:', [
      '[TransactionID]',
      '[Amount]',
      '[ItemsOrdered]',
      '[TransactionDate]',
    ]),
  ],
  'f2-209-447': [
    row('Outer function:', ranking),
    row('Build customer totals using:', ranking),
    row('Order Sales by:', ranking),
  ],
  'f2-228-453': [
    row('Access a published Power BI app:', [
      'Power BI (free)',
      'Power BI PRO',
    ]),
    row('Modify reports in an app workspace:', [
      'Power BI (free)',
      'Power BI PRO',
    ]),
    row('Share dashboards created in My Workspace:', [
      'Power BI (free)',
      'Power BI PRO',
    ]),
  ],
  'f2-256-461': [
    row('Chart type:', ['Line', 'Pie', 'Treemap']),
    row('Chart configuration:', [
      'Select the Show value as option',
      'Enable Cross-report drill-through',
      'Populate the axis with a date field',
    ]),
  ],
  'f2-266-464': [
    row('Row label:', ['Cost Center', 'Headcount', 'ID', 'Name']),
    row('Key column:', ['Cost Center', 'Headcount', 'ID', 'Name']),
    row('Is featured table:', ['No', 'Yes']),
  ],
  'f2-287-471': [
    row(
      'Summarizing Orders by CustomerID, OrderID, and OrderDate reduces model size while still supporting the current analysis.',
      ['Yes', 'No'],
    ),
    row(
      'Removing CustomerID from Orders reduces model size while still supporting the current analysis.',
      ['Yes', 'No'],
    ),
    row(
      'Removing UnitPrice and Discount from Orders reduces model size while still supporting the current analysis.',
      ['Yes', 'No'],
    ),
  ],
  'f2-378-498': [
    row('Calculate PREV_QUARTER using:', quarter),
    row('Shift the date context using:', quarter),
    row('Calculate relative change using:', quarter),
  ],
  'f2-389-501': [
    row('Transform rawData using:', [
      'Table.CombineColumn',
      'Table.FindText',
      'Table.FromList',
      'Table.RemoveColumns',
    ]),
    row('Select column names using:', [
      'List.Contains',
      'List.Select',
      'Table.FindText',
      'Table.FromList',
    ]),
    row('Match the suffix using:', [
      'Text.Contains',
      'Text.EndsWith',
      'Text.From',
      'Text.StartsWith',
    ]),
  ],
};
export const presentations: Record<string, QuestionPresentation> = {
  'f2-038-390': {
    warning:
      'No unique complete answer: the source does not define Finance sensitivity-label policy, and a sensitivity label alone does not prevent all PII exports. The lesson distinguishes the intended Yes/No/Yes source key from an enforceable solution.',
  },
  'f2-191-438': {
    warning:
      'The source screenshot contains the answer menus but not the permissions exhibit. Finance and Corp permissions cannot be verified; do not infer Build/Reshare solely from the source answer text.',
  },
  'f2-050-395': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Source tables',
        columns: ['Table', 'Column', 'Data type'],
        rows: [
          ['Sales', 'Sales_id', 'Integer'],
          ['Sales', 'Sales_date', 'Datetime'],
          ['Sales', 'Customer_id', 'Integer'],
          ['Sales', 'sales_amount', 'Floating'],
          ['Sales', 'employee_id', 'Integer'],
          ['Sales', 'sales_ship_date', 'Datetime'],
          ['Sales', 'store_id', 'Varchar(100)'],
          ['Employee', 'employee_id', 'Integer'],
          ['Employee', 'first_name', 'Varchar(100)'],
          ['Employee', 'last_name', 'Varchar(100)'],
          ['Employee', 'employee_photo', 'Binary'],
        ],
      },
    ],
  },
  'f2-076-401': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Original Phone values',
        columns: ['Phone'],
        rows: [
          '436-555-0160',
          '385-555-0140',
          '452-555-0179',
          '290-555-0196',
          '1 (11) 500 555-0122',
          '128-555-0148',
          '819-555-0186',
          '996-555-0192',
          '138-555-0156',
          '556-555-0192',
        ].map((x) => [x]),
      },
    ],
    code: '= Table.AddColumn(#"Previous Step", "Custom", each Text.[1](Text.[2]([Phone], 12), " ", "-"))',
  },
  'f2-083-403': { hideSourceImage: true },
  'f2-106-410': {
    hideSourceImage: true,
    note: 'The supplied exhibit names the two views but does not include the promised map screenshot. Two Display bookmarks answer the stated view-switching task; no unseen map details are inferred.',
  },
  'f2-136-419': {
    hideSourceImage: true,
    code: 'Numbers = [function] [arguments]',
  },
  'f2-174-433': {
    hideSourceImage: true,
    code: 'Revenue Last 50 Transactions =\n[1](\n  [2](Transactions[Amount]),\n  [3](50, Transactions, Transactions[4], DESC)\n)',
    tables: [
      {
        caption: 'Original model columns',
        columns: ['Table', 'Columns'],
        rows: [
          [
            'Transactions',
            'TransactionDate; ItemsOrdered; Amount; TransactionID',
          ],
          ['Affiliate', 'AffiliateID; Name'],
        ],
      },
    ],
  },
  'f2-209-447': {
    hideSourceImage: true,
    code: 'Top 100 Customers = [1](\n  100,\n  [2](FactTransaction, FactTransaction[Customer ID], "Sales", SUM(FactTransaction[Sale])),\n  [Sales], [3]\n)',
  },
  'f2-228-453': { hideSourceImage: true },
  'f2-256-461': { hideSourceImage: true },
  'f2-266-464': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Business Unit table',
        columns: ['Columns'],
        rows: [['Cost Center'], ['Headcount'], ['ID'], ['Name']],
      },
    ],
    note: 'Legacy feature: Microsoft has removed the Excel organization data type functionality. This explains the historical source question, not a recommended new deployment.',
  },
  'f2-287-471': {
    note: 'The source model diagram is cropped. No/No/Yes relies on an existing stored sales amount and an Orders grain that preserves order counting; confirm the complete schema before treating the third statement as unconditional.',
  },
  'f2-378-498': {
    hideSourceImage: true,
    code: "Sales QoQ% =\nIF(ISFILTERED('financials'[Date]), ERROR(\"Uh oh.\"),\n  VAR PREV_QUARTER = [1](\n    SUM('financials'[Sales]),\n    [2]('financials'[Date].[Date], -1, QUARTER)\n  )\n  RETURN [3](SUM('financials'[Sales]) - PREV_QUARTER, PREV_QUARTER)\n)",
  },
  'f2-389-501': {
    hideSourceImage: true,
    code: 'let\n  Source = ...,\n  rawData = Source{[tableId="clientData"]}[Data],\n  removeSources = [1](rawData, [2](Table.ColumnNames(rawData), each [3](_, "sourceid")))\nin\n  removeSources',
  },
};
export const corrections: Record<string, QuestionCorrection> = {
  'f2-038-390': {
    status: 'incomplete-source',
    reviewedAnswer:
      'Source-intended Yes/No/Yes is not a uniquely established complete governance solution.',
    reason:
      'Finance endorsement is required by its financial use, but no explicit Finance sensitivity policy is given. Labels do not automatically block all exports.',
    reasonAr:
      'اعتماد بيانات Finance مطلوب، لكن تصنيف حساسيتها غير محدد، وLabel وحدها لا تمنع كل التصدير. لا نصحح المفتاح كحل أمني مكتمل.',
    explanation:
      'The source intends Yes, No, Yes. Sales salary information warrants sensitivity classification. Financial decision data needs certification, but Finance sensitivity requirements are not specified, and a sensitivity label alone is not an export-blocking policy. No unique complete answer is established.',
    suppressSourceAnswerImage: true,
  },
  'f2-191-438': {
    status: 'incomplete-source',
    reviewedAnswer:
      'The permissions exhibit is missing; the intended Analyze in Excel / grant Build pair cannot be verified.',
    reason:
      'Only the answer-area menus are present. Build and Reshare prerequisites are not visible, and Reshare may also permit Read grants.',
    reasonAr:
      'جدول الصلاحيات نفسه غير موجود؛ لا نستنتج أذونات المجموعات من أسمائها ولا نثبت منح Build دون الدليل.',
    explanation:
      'Analyze in Excel requires Build permission, but the supplied image does not show the permissions assigned to Finance or Corp. The source-intended pair is therefore conditional, not an independently verifiable answer. Restore the original permissions exhibit before grading.',
    suppressSourceAnswerImage: true,
  },
  'f2-342-485': {
    status: 'flawed-source',
    reviewedAnswer:
      'Role-playing date tables with active relationships are required for simultaneous independent purchase/ship-date filtering. B and C support that design; neither guarantees the minimum source query count. The source D does not meet the together requirement.',
    reason:
      'A single Date table with one inactive relationship does not support independently filtering both roles at the same time. Reference queries are independently evaluated and do not guarantee cached reuse.',
    reasonAr:
      'شرط تحليل تاريخ الشراء والشحن مع بعض محتاج جدول تاريخ لكل دور. مفتاح الدامب D لا يحقق الشرط، ولا يصح اعتبار Reference ضمانًا لعدم تكرار استعلام المصدر.',
    explanation:
      'There is no unique answer satisfying all stated requirements. Separate role-playing date tables support simultaneous independent filtering. Both duplicate and reference queries can create them, but references do not guarantee one source retrieval. A single active/inactive Date design cannot independently filter both roles at once.',
    suppressSourceAnswerImage: true,
  },
  'f2-102-408': {
    status: 'flawed-source',
    reviewedAnswer:
      'Build permission plus tenant/licensing prerequisites enables Analyze in Excel. None of the four listed next steps is technically required by the stated requirement.',
    reason:
      'Setting report Export data to None is a separate restriction, not an Analyze in Excel prerequisite.',
    reasonAr:
      'Build هي صلاحية التحليل من Excel. إيقاف تصدير التقرير ليس شرطًا لفتح التحليل، والسؤال لا يطلب أصلًا منع التصدير.',
    explanation:
      'Build permission enables model reuse for Analyze in Excel subject to tenant settings and licensing. Report-level Export data settings govern a separate export path. None of the offered next steps is necessary solely to meet the stated direct Excel connection requirement.',
    suppressSourceAnswerImage: true,
  },
  'f2-187-437': {
    status: 'flawed-source',
    reviewedAnswer:
      'Conditional: Yes if the filter folds to SQL before loading; No if all 100 million rows are imported before filtering.',
    reason:
      'A Power Query filter on SQL Server can fold. The question does not state that the filter breaks folding or that a completed full import must precede it.',
    reasonAr:
      'فلتر Power Query ممكن يتحول إلى WHERE على SQL Server؛ لذلك No ليست قاعدة مطلقة. الحكم يتوقف على Query Folding ومتى يتم التحميل.',
    explanation:
      'The wording does not uniquely determine Yes or No. A filter added in Power Query before load may fold into a SQL WHERE clause and retrieve only the sample. Filtering after a completed full import, or after folding is broken, does not avoid retrieving the full table. Verify query folding and load timing rather than treating No as universal.',
    suppressSourceAnswerImage: true,
  },
};
