import type {
  TextAnswerRow,
  QuestionPresentation,
} from '../question-presentation.ts';
import type { QuestionCorrection } from '../answer-audit.ts';
// Transcribed against original question exhibits. Values remain in native dropdown namespace10000+index.
const dax = ['ALL', 'ALLEXCEPT', 'CALCULATE', 'DIVIDE', 'FILTER'];
const kpi = [
  'Date[month]',
  'Sales[sales_amount]',
  'Sales[sales_id]',
  'Targets[sales_target]',
  'Weekly_Returns[total_returns]',
];
const distribution = [
  'Assign the Viewer role for the workspace to each management department user.',
  'Embed the report into Microsoft SharePoint Online.',
  'Publish an app.',
  'Use Publish to web.',
];
export const textRows: Record<string, TextAnswerRow[]> = {
  'f1-322-321': [
    {
      label: 'To access the HR dataset:',
      options: [
        'Assign User1 the Contributor role for WorkspaceA.',
        'Grant User1 the Build permission for the HR dataset.',
        'Grant User1 read permissions for the HR dataset.',
        'Grant User1 share permissions for the HR dataset.',
      ],
    },
    {
      label: 'To publish reports to WorkspaceB:',
      options: [
        'Assign User1 the Admin role for Workspaces.',
        'Assign User1 the Contributor role for WorkspaceA.',
        'Assign User1 the Contributor role for WorkspaceB.',
        'Assign User1 the Member role for WorkspaceB.',
      ],
    },
  ],
  'f1-333-332': [
    { label: 'Data sources that require a gateway:', options: ['1', '2', '3'] },
    {
      label: 'License mode:',
      options: ['Embedded', 'Premium Per User (PPU)', 'Pro'],
    },
  ],
  'f1-340-339': [
    { label: 'Management:', options: distribution },
    { label: 'Accounting:', options: distribution },
  ],
  'f1-344-343': [
    {
      label:
        'Populate a ___ using a card visualization showing the late-order percentage:',
      options: ['report', 'bookmark', 'dashboard'],
    },
    {
      label: 'Then configure a:',
      options: ['data alert', 'phone view', 'subscription'],
    },
  ],
  'f1-346-345': [
    { label: 'AllCategoryRev calculation:', options: dax },
    { label: 'Remove the ProductCategory filter:', options: dax },
    { label: 'Return the proportion:', options: dax },
  ],
  'f1-356-355': [
    {
      label: 'VAR LateOrders =',
      options: ['SUM', 'COUNTX', 'CALCULATE', 'CALCULATETABLE'],
    },
    {
      label: 'Restrict Orders rows with:',
      options: ['FILTER', 'ALLEXCEPT', 'CALCULATE', 'DATEBETWEEN'],
    },
    {
      label: 'Late-order condition:',
      options: [
        'Orders[OrderDate] > Orders[RequiredDate]',
        'Orders[ShippedDate] >= Orders[OrderDate]',
        'Orders[ShippedDate] < Orders[RequiredDate]',
        'Orders[ShippedDate] > Orders[RequiredDate]',
      ],
    },
  ],
  'f1-359-358': [
    {
      label: 'Create a ___ relationship from Sales Employees:',
      options: ['one-to-one', 'one-to-many', 'many-to-one', 'many-to-many'],
    },
    {
      label: 'Related table:',
      options: [
        'Orders table',
        'Suppliers table',
        'Order Details table',
        'Customer Details worksheet',
      ],
    },
  ],
  'f1-361-360': [
    { label: 'Filter type:', options: ['Top N', 'Basic', 'Advanced'] },
    { label: 'Level:', options: ['Page', 'Visual', 'Report'] },
  ],
  'f1-363-362': [
    { label: 'Indicator:', options: kpi },
    { label: 'Trend axis:', options: kpi },
    { label: 'Target goals:', options: kpi },
  ],
  'f1-366-365': [
    {
      label: 'Permissions required in powerbi.com:',
      options: [
        'Access permissions to an app',
        'The Member role to the workspace',
        'The Viewer role to the workspace',
      ],
    },
    {
      label: 'Permissions for the profit and loss dataset:',
      options: ['Build', 'Delete', 'Reshare'],
    },
  ],
  'f1-367-366': [
    {
      label: 'Grant access by:',
      options: [
        'Sharing individual reports',
        'Using a workspace membership',
        'Using an app',
      ],
    },
    {
      label: 'Grant access to:',
      options: [
        'A dynamic distribution list',
        'A mail-enabled security group in Azure Active Directory',
        'Individual user emails',
      ],
    },
  ],
  'f2-020-384': [
    {
      label: 'Conditional formatting:',
      options: [
        'Background color',
        'Data bars',
        'Font color',
        'Icons',
        'Web URL',
      ],
    },
    { label: 'Format by:', options: ['Color scale', 'Field value', 'Rules'] },
  ],
};
export const presentations: Record<string, QuestionPresentation> = {
  'f1-306-305': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Required capabilities from original exhibit',
        columns: ['User', 'Task'],
        rows: [
          ['User1', 'Create and publish apps.'],
          ['User2', 'Publish reports to the workspace and delete dashboards.'],
        ],
      },
    ],
  },
  'f1-319-318': {
    hideSourceImage: true,
    code: 'Count Email =\nVAR Email = Customer[Email Address]\nRETURN\n    [Blank 1](\n        [Blank 2](Customer),\n        [Blank 3](Customer),\n        Customer[Email Address] = Email\n    )',
  },
  'f1-322-321': { hideSourceImage: true },
  'f1-333-332': { hideSourceImage: true },
  'f1-340-339': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Workspace contents from original exhibit',
        columns: ['Name', 'Type'],
        rows: [
          ['Headcount', 'Report'],
          ['Headcount', 'Semantic model'],
          ['Company Expenses', 'Report'],
          ['Expenses', 'Semantic model'],
          ['Department Expenses', 'Report'],
        ],
      },
    ],
  },
  'f1-344-343': { hideSourceImage: true },
  'f1-346-345': {
    hideSourceImage: true,
    code: 'Category Revenue Contribution =\nVAR AllCategoryRev =\n    [Blank 1](SUM([Revenue]),\n        [Blank 2](ProductList[ProductCategory]))\nRETURN\n    [Blank 3](SUM([Revenue]), AllCategoryRev)\n// Original uses abbreviated SUM([Revenue]). Use the real table/column reference,\n// or use [Revenue] without SUM if Revenue is already a measure.',
  },
  'f1-356-355': {
    hideSourceImage: true,
    code: 'Late Orders Percent =\nVAR OrderCount = COUNTROWS(Orders)\nVAR LateOrders =\n    [Blank 1](\n        COUNTROWS(Orders),\n        [Blank 2](Orders, [Blank 3])\n    )\nRETURN DIVIDE(LateOrders, OrderCount)',
  },
  'f1-359-358': { hideSourceImage: true },
  'f1-361-360': { hideSourceImage: true },
  'f1-363-362': { hideSourceImage: true },
  'f1-366-365': { hideSourceImage: true },
  'f1-367-366': { hideSourceImage: true },
  'f2-020-384': { hideSourceImage: true },
};
export const corrections: Record<string, QuestionCorrection> = {
  'f1-335-334': {
    status: 'corrected',
    correct: [0, 1],
    originalAnswer: 'A,D: Security group and Microsoft365 group.',
    reviewedAnswer:
      'A,B: Security group and distribution group (supported direct-sharing scenario).',
    reason:
      'Direct report sharing supports security groups and mail-enabled distribution groups; Microsoft365 Unified groups are explicitly not supported for direct sharing. Workspace/app group support must not be confused with direct sharing.',
    reasonAr:
      'المشاركة المباشرة ليست عضوية Workspace. Security وDistribution مدعومان في سيناريو المشاركة المحدد، وMicrosoft365 Unified group غير مدعومة لهذا المسار.',
    explanation:
      'Corrected answer: A and B. Use a security group or supported mail-enabled distribution group for direct report sharing. Microsoft365 Unified groups are not supported for direct sharing, even though they can be used in other Power BI access workflows. For external recipients, review the security-group/B2B restrictions. See https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-share-dashboards',
    evidence: [
      {
        label: 'Microsoft Learn: direct sharing group limitations',
        url: 'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-share-dashboards',
      },
    ],
    suppressSourceAnswerImage: true,
  },
  'f1-343-342': {
    status: 'flawed-source',
    reviewedAnswer:
      'No offered option satisfies all case security requirements. Member is only the intended authoring-rights answer; it bypasses semantic-model RLS.',
    reason:
      'The case simultaneously requires workspace editing/app management and per-region RLS for the same sales users. Admin, Member and Contributor roles bypass RLS on workspace semantic models. Member also cannot remove users/change all existing roles.',
    reasonAr:
      'الحالة تجمع حقوق تحرير للموديل مع إلزام نفس المستخدمين بـRLS. Member وAdmin يتجاوزان هذا القيد؛ لذلك D ليست إجابة تحقق شروط الأمن كاملة.',
    explanation:
      'Flawed case requirements. D (Member) is the intended answer for authoring and publishing apps, but Member users are not restricted by semantic-model RLS. None of the options meets both the editing requirements and the stated region-based RLS constraint for the same identity. Admin is broader and also bypasses RLS; sharing/app consumption does not grant the requested authoring capabilities. Separate authoring and restricted consumption identities/roles or revise the requirements. See https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-rls',
    suppressSourceAnswerImage: true,
  },
  'f1-349-348': {
    status: 'corrected',
    reviewedAnswer:
      'D, with sales_skip_date_id corrected to the actual sales_ship_date_id column.',
    choices: [
      'a one-to-many relationship from Date[date_id] to Sales[sales_date_id] and another one-to-many relationship from Date[date_id] to Weekly_Returns[week_id]',
      'a one-to-many relationship from Sales[sales_date_id] to Date[date_id] and a one-to-many relationship from Sales[sales_ship_date_id] to Date[date_id]',
      'an additional date table named ShipDate, a many-to-many relationship from Sales[sales_date_id] to Date[date_id], and a many-to-many relationship from Sales[sales_ship_date_id] to ShipDate[date_id]',
      'an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id]',
    ],
    reason:
      'Original D has a transcription typo: sales_skip_date_id. The schema and requirement use the shipping date key.',
    explanation:
      'D. Create separate role-playing Date and ShipDate dimensions with active one-to-many relationships to Sales[sales_date_id] and Sales[sales_ship_date_id], respectively. This supports independent sales-month and shipping-month filters. The original sales_skip_date_id is a typo, not a real source column.',
    suppressSourceAnswerImage: true,
  },
  'f1-353-352': {
    status: 'corrected',
    choices: [
      'a calculated column that uses the following formula: ABS(Sales[sales_amount])',
      'a measure that uses the following formula: SUMX(FILTER(Sales, Sales[sales_amount] > 0), Sales[sales_amount])',
      'a measure that uses the following formula: SUM(Sales[sales_amount])',
      'a calculated column that uses the following formula: IF(ISBLANK(Sales[sales_amount]), 0, Sales[sales_amount])',
    ],
    reviewedAnswer:
      'B. Corrected syntactic form: SUMX(FILTER(Sales,Sales[sales_amount]>0),Sales[sales_amount]).',
    reason:
      'Repair an extra closing parenthesis; preserve choice indexes and intended positive-value filtering.',
    explanation:
      'B. SUMX(FILTER(Sales, Sales[sales_amount] > 0), Sales[sales_amount]) sums positive sales in the current filter context and excludes negative/missing values. Removing zero also leaves the same total. ABS incorrectly turns negatives into positive sales; plain SUM includes negatives; replacing blanks with zero does not remove negatives. The source expression had an extra parenthesis.',
    suppressSourceAnswerImage: true,
  },
  'f1-354-353': {
    status: 'corrected',
    choices: [
      'FORMAT(\'Date\'[date], "MMM YYYY")',
      'FORMAT(\'Date\'[date_id], "MMM") & " " & FORMAT(\'Date\'[year], "#")',
      'FORMAT(\'Date\'[date_id], "MMM YYYY")',
      'FORMAT(\'Date\'[date], "M YY")',
    ],
    reviewedAnswer: 'A. FORMAT(Date[date],"MMM YYYY").',
    reason:
      'Restore format-string quotes lost in extraction; do not treat the numeric yyyymmdd key as a native Date.',
    explanation:
      'A. Format the actual Date[date] column with "MMM YYYY" to produce a label such as Feb 2020 in an English locale. Specify a locale if exact language is required, and sort the text label by an appropriate year-month key. Date[date_id] is a numeric key, not a date value simply because its digits resemble yyyymmdd.',
    suppressSourceAnswerImage: true,
  },
  'f1-364-363': {
    status: 'corrected',
    reviewedAnswer:
      'No; No; Yes (SQL authentication / Basic in the supported service connection).',
    originalAnswer: 'No; No; No.',
    reason:
      'Desktop calls SQL username/password Database in some dialogs; service/online SQL connection workflows support Basic. That naming difference is not a reason to reject SQL Basic authentication after publication. Gateway answer assumes Azure SQL is directly reachable, not private-only.',
    reasonAr:
      'اسم Database في Desktop لا ينفي دعم SQL Basic في الخدمة. الإجابة العملية: لا بوابة داخلية مع مصدر سحابي متاح؛ لا Import refresh لموديلPureDQ؛ نعم للاعتماد SQL/Basic المدعوم.',
    explanation:
      'Reviewed statements: No; No; Yes. A directly reachable Azure SQL source does not require an on-premises gateway; a private-only network would change this. Pure DirectQuery does not rely on scheduled import refresh of source rows, although visuals/caches/metadata have separate refresh considerations. SQL username/password authentication is supported as Database/Basic depending on the host. The old No for Basic incorrectly inferred a service restriction from Desktop dialog naming. See https://learn.microsoft.com/en-us/power-query/connectors/sql-server and https://learn.microsoft.com/en-us/power-query/connectors/azure-sql-database',
    evidence: [
      {
        label: 'Microsoft Learn: SQL connector Database/Basic authentication',
        url: 'https://learn.microsoft.com/en-us/power-query/connectors/sql-server',
      },
      {
        label: 'Microsoft Learn: AzureSQL host-specific authentication',
        url: 'https://learn.microsoft.com/en-us/power-query/connectors/azure-sql-database',
      },
    ],
    suppressSourceAnswerImage: true,
  },
  'f1-365-364': {
    status: 'flawed-source',
    choices: [
      'a measure that uses the following formula: SUMX(FILTER(Sales, Sales[sales_amount] > 0), Sales[sales_amount])',
      'a calculated column that uses the following formula: ABS(Sales[sales_amount])',
      'a calculated column that uses the following formula: IF(ISBLANK(Sales[sales_amount]), 0, Sales[sales_amount])',
      'a measure that uses the following formula: SUM(Sales[sales_amount])',
    ],
    reviewedAnswer:
      'A for the positive-sales total requirement, after syntax correction. No listed option counts sales transactions if that department requirement is read literally.',
    reason:
      'Source says measure column and has malformed parentheses. Its department wording can instead refer to the separate transaction-count requirement, for which COUNTROWS(Sales) is not offered.',
    explanation:
      'Conditional intended answer: A for summing positive sales, using the repaired measure SUMX(FILTER(Sales, Sales[sales_amount]>0), Sales[sales_amount]). ABS includes negatives as positives, replacing blanks does not exclude negatives, and SUM includes negatives. However, if "reporting requirements of the sales department" is read literally as the case requirement to count transactions, no listed option satisfies it; COUNTROWS(Sales) would be needed. Do not present the malformed source as executable code.',
    suppressSourceAnswerImage: true,
  },
  'f1-366-365': {
    status: 'flawed-source',
    reviewedAnswer:
      'Build on P&L. Viewer is the source workspace-access answer; app audience access plus separately scoped Build is also valid when no workspace membership is required.',
    reason:
      'App access and Viewer are both consumption paths under which RLS can apply. The case does not unambiguously require workspace membership. Do not mark app access intrinsically impossible.',
    explanation:
      'The essential model permission is Build on the profit-and-loss semantic model only, without Write/Reshare and without Build on the balance-sheet model. Viewer is the intended source answer when workspace browsing is desired. App access can also provide read-only selected report access and can be combined with appropriately scoped Build; the case does not explicitly require workspace membership. Member is unsuitable because it grants editing and bypasses RLS. Delete/Reshare are not Build.',
    suppressSourceAnswerImage: true,
  },
};
