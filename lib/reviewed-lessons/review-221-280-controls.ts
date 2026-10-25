import type {
  TextAnswerRow,
  QuestionPresentation,
} from '../question-presentation.ts';
import type { QuestionCorrection } from '../answer-audit.ts';

// Menus checked against each question's original exhibit; row order is retained.
// Native text selectors encode the row-local index as 10000 + index. No old
// screenshot coordinate is reinterpreted as a selection in these menus.
export const textRows: Record<string, TextAnswerRow[]> = {
  'f1-221-220': [
    {
      label: 'Update the layout in the:',
      options: [
        'Dashboard mobile layout',
        'Dashboard web layout',
        'Report mobile layout',
      ],
    },
    {
      label: 'Resize and move:',
      options: [
        'The SubTotal map tile',
        'The Total Sales and Total Quantity tiles',
        'The Total Sales by Parent Category tile',
      ],
    },
  ],
  'f1-233-232': [
    {
      label: 'Visualization:',
      options: [
        'A column chart of Quantity Ordered and Unit Price by year',
        'A line chart of Quantity Ordered and Unit Price by item',
        'A scatter plot of Quantity Ordered and Unit Price by item',
      ],
    },
    {
      label: 'Feature:',
      options: [
        'Automatically find clusters',
        'Explain the decrease',
        'Find where the distribution is different',
      ],
    },
  ],
  'f1-257-256': [
    { label: 'Visual type:', options: ['Bar chart', 'Card', 'Matrix'] },
    {
      label: 'Set:',
      options: [
        'Edit Interactions to Filter',
        'Edit Interactions to None',
        'Apply drill down filters to Selected visual',
      ],
    },
  ],
  'f1-268-267': [
    {
      label: 'Report1:',
      options: [
        'Microsoft SQL Server Reporting Services (SSRS) (.rdlc)',
        'Power BI (.pbix)',
        'Power BI paginated (.rdl)',
      ],
    },
    {
      label: 'Report2:',
      options: [
        'Microsoft SQL Server Reporting Services (SSRS) (.rdlc)',
        'Power BI (.pbix)',
        'Power BI paginated (.rdl)',
      ],
    },
  ],
  'f1-271-270': [
    { label: 'Type:', options: ['Matrix', 'Multi-row card', 'Table'] },
    {
      label: 'Format:',
      options: [
        'Set Rows subtotals to Off.',
        'Set Stepped layout to Off.',
        'Set Switch values to rows to On.',
      ],
    },
  ],
  'f1-278-277': [
    {
      label: 'To view the percentage of values that contain errors:',
      options: ['Column distribution', 'Column profile', 'Column quality'],
    },
    {
      label: 'To view the count of empty values:',
      options: ['Column distribution', 'Column profile', 'Column quality'],
    },
  ],
};

export const presentations: Record<string, QuestionPresentation> = {
  'f1-221-220': {
    hideSourceImage: true,
    tables: [
      {
        caption:
          'Layout comparison transcribed from the original Dashboard and Mobile exhibits',
        columns: ['Tile', 'Dashboard exhibit', 'Required mobile exhibit'],
        rows: [
          [
            'Total Sales: $282,711',
            'Upper left, above Total Quantity',
            'Top row, left',
          ],
          [
            'Total Quantity: 915',
            'Left, below Total Sales',
            'Top row, right, next to Total Sales',
          ],
          [
            'Total Sales by Parent Category',
            'Upper right; Bikes, Components, Clothing, Accessories',
            'Below the two cards',
          ],
          [
            'SubTotal by StateProvince',
            'Map below cards and bar chart',
            'Below Total Sales by Parent Category',
          ],
        ],
      },
    ],
  },
  'f1-233-232': {
    hideSourceImage: true,
    note: 'The original options specify one point per Item. If an Item aggregates multiple orders, the scatter point is item-level, not automatically one point per individual order.',
  },
  'f1-241-240': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Original Revenue background-color rules',
        columns: ['Value range', 'Background color'],
        rows: [
          ['Revenue = 0', '#FFFFFF'],
          ['Revenue > 0 and Revenue <= 2', '#FFC000'],
          ['Revenue > 2 and Revenue <= 3', '#E2EFDA'],
          ['Revenue > 3 and Revenue <= 4', '#A9D062'],
          ['Revenue > 4', '#00B050'],
        ],
      },
    ],
  },
  'f1-246-245': {
    note: 'Sync transfers the selection; hiding a slicer only changes page presentation and is not a security restriction. The source intends Sync all pages, then Hide on pages 2 and 3; sync alone also makes their results filtered.',
  },
  'f1-249-248': {
    note: 'The source option says configure filters on the tooltip page. This means preparing the intended tooltip context; it does not mean every tooltip requires a permanent fixed filter. Test and remove temporary preview filters before publication.',
  },
  'f1-257-256': { hideSourceImage: true },
  'f1-260-259': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Original visual coordinates',
        columns: ['Type', 'Horizontal coordinate', 'Vertical coordinate'],
        rows: [
          ['Table', '300', '200'],
          ['Clustered column chart', '700', '200'],
          ['Slicer', '20', '100'],
        ],
      },
    ],
  },
  'f1-263-262': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Original CSV preview',
        columns: ['Month', '2021', '2022'],
        rows: [
          ['January', '1000', '2500'],
          ['February', '4000', '5000'],
          ['March', '2800', '3400'],
        ],
      },
    ],
  },
  'f1-268-267': {
    hideSourceImage: true,
    note: 'The SSRS choice is transcribed exactly as the source shows it (.rdlc). RDLC is not the RDL format used for Power BI paginated reports.',
  },
  'f1-271-270': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Original table visual',
        columns: ['OrderDate', 'Total Sales', 'Total Cost'],
        rows: [
          ['01-Oct-22', '10.75', '8.06'],
          ['03-Oct-22', '98.50', '73.88'],
          ['07-Oct-22', '43.00', '32.25'],
          ['11-Oct-22', '25.99', '19.49'],
          ['12-Oct-22', '156.00', '117.00'],
          ['15-Oct-22', '40.80', '30.60'],
        ],
      },
      {
        caption:
          'Required output: measures displayed as rows (date headers omitted in the original target image)',
        columns: [
          'Measure',
          '01-Oct-22',
          '03-Oct-22',
          '07-Oct-22',
          '11-Oct-22',
          '12-Oct-22',
          '15-Oct-22',
          'Total',
        ],
        rows: [
          [
            'Total Cost',
            '8.06',
            '73.88',
            '32.25',
            '19.49',
            '117.00',
            '30.60',
            '281.28',
          ],
          [
            'Total Sales',
            '10.75',
            '98.50',
            '43.00',
            '25.99',
            '156.00',
            '40.80',
            '375.04',
          ],
        ],
      },
    ],
  },
  'f1-278-277': { hideSourceImage: true },
  'f1-279-278': {
    note: 'The target chart includes a Product Category legend, although the prompt names only Sales and Quarter. The visual type is identifiable, but reproducing every series requires a category field in the model.',
  },
};

export const corrections: Record<string, QuestionCorrection> = {
  'f1-221-220': {
    status: 'independently-reviewed',
    reviewedAnswer:
      'Dashboard mobile layout; The Total Sales and Total Quantity tiles.',
    explanation:
      'Update the Dashboard mobile layout, not the web layout or a report page layout. Resize and position Total Sales and Total Quantity next to each other on the top row; the bar chart remains below and the map remains further down, as in the original target. Native dropdown rows were checked against the original answer area.',
  },
  'f1-233-232': {
    status: 'independently-reviewed',
    reviewedAnswer:
      'Scatter plot of Quantity Ordered and Unit Price by item; Automatically find clusters.',
    explanation:
      'Use a scatter plot to compare the two numeric fields, with Item providing the detail level. Automatically find clusters highlights similar points. A point per Item is not necessarily a point per order when an Item spans multiple orders; individual order-level clustering would need an order identifier not supplied in the listed fields.',
  },
  'f1-257-256': {
    status: 'independently-reviewed',
    reviewedAnswer: 'Matrix; Apply drill down filters to Selected visual.',
    explanation:
      'Select the Matrix and limit Apply drill down filters to Selected visual. Keep normal selection interactions active so clicking a cell still filters or highlights the receiving visuals as configured. Edit interactions = None would incorrectly disable the required selection response.',
    evidence: [
      {
        label: 'Microsoft Learn: visual interactions and drill-down filters',
        url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions',
      },
    ],
  },
  'f1-265-264': {
    status: 'corrected',
    correct: [2, 3],
    originalAnswer: 'B,C: Theme colors and Divergent colors.',
    reviewedAnswer: 'C,D: Divergent colors and Sentiment colors.',
    reason:
      'The actual exhibit shows a gradient table plus KPI and Waterfall status colors. Microsoft documents good/neutral/bad as the KPI and Waterfall status colors, and maximum/center/minimum as gradient conditional-format colors.',
    reasonAr:
      'الصورة فيها تدرج جدول يحتاج Divergent، وKPI وWaterfall يحتاجان Sentiment لحالات الزيادة والنقص. ألوان السلاسل العامة لا تستبدل ألوان هذه الحالات.',
    explanation:
      'Corrected answer: C and D. Configure Divergent colors for the table gradient and Sentiment colors for the KPI and Waterfall positive/negative status colors. In the official custom theme specification, good/neutral/bad are explicitly used for KPI and waterfall status colors; maximum/center/minimum/null set conditional-format gradient colors. Theme dataColors do not replace the dedicated semantic status palette. Prefer non-color cues as well for accessible interpretation.',
    suppressSourceAnswerImage: true,
    evidence: [
      {
        label: 'Microsoft Learn: theme status and gradient color properties',
        url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/report-themes-create-custom#theme-colors',
      },
      {
        label: 'Microsoft Learn: current theme color groups',
        url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-reports-visual-defaults',
      },
    ],
  },
  'f1-268-267': {
    status: 'independently-reviewed',
    reviewedAnswer:
      'Report1: Power BI paginated (.rdl). Report2: Power BI (.pbix).',
    explanation:
      'RDL paginated reports are designed for page-based print output and scheduled distribution. PBIX reports provide the dynamic interactive experience. Both report categories can support subscriptions; the printing requirement, not email alone, identifies the paginated report. The original SSRS option says .rdlc, which must not be confused with the Power BI RDL format.',
  },
  'f1-271-270': {
    status: 'independently-reviewed',
    reviewedAnswer: 'Matrix; Set Switch values to rows to On.',
    reason:
      'The required output is a grid with measures as row labels, multiple date values across columns, and totals. Matrix supports that structure and switching values to rows; a multi-row card does not.',
    reasonAr:
      'الناتج فيه صف لكل مقياس وقيم عبر التواريخ وإجمالي. هذا Matrix مع نقل القيم إلى صفوف، لا Multi-row card ولا مجرد إلغاء Stepped layout.',
    explanation:
      'Use a Matrix with OrderDate on Columns and Total Cost/Total Sales in Values. Set Switch values to rows to On (called Show values on rows in some versions). This changes measure names into row labels while retaining per-date values and totals. The original target shows Cost total 281.28 and Sales total 375.04. Multi-row cards cannot reproduce this matrix structure, and disabling stepped layout only changes hierarchy indentation.',
    suppressSourceAnswerImage: true,
    evidence: [
      {
        label: 'Microsoft Learn: Matrix visual',
        url: 'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-matrix-visual',
      },
    ],
  },
};
