import type { Question } from './questions.ts';

export type TextAnswerRow = { label: string; options: string[] };
export type QuestionPresentation = {
  /** Reconstructed from source exhibits, never from answer-letter guesses. */
  tables?: { caption: string; columns: string[]; rows: string[][] }[];
  answerRows?: TextAnswerRow[];
  statements?: string[];
  hideSourceImage?: boolean;
  warning?: string;
  code?: string;
};

export const questionPresentation: Record<string, QuestionPresentation> = {
  'f1-212-211': { hideSourceImage: true },
  'f1-219-218': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Original view requirements (same report page)',
        columns: [
          'View / button',
          'Visual',
          'Shared slicer field',
          'Visible Chain choices',
        ],
        rows: [
          ['Sales By Postal Code', 'Map', 'Chain', 'Fashions Direct; Lindseys'],
          [
            'Sales By Month',
            'Column chart',
            'Chain',
            'Fashions Direct; Lindseys',
          ],
        ],
      },
    ],
  },
  'f1-005-4': { hideSourceImage: true },
  'f1-013-12': { hideSourceImage: true },
  'f1-021-20': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Original Azure SQL environments',
        columns: ['Name', 'Stage', 'Server URL'],
        rows: [
          ['db-powerbi-dev', 'Development', 'dev.database.windows.net'],
          ['db-powerbi-uat', 'Test', 'uat.database.windows.net'],
          ['db-powerbi-prod', 'Production', 'prod.database.windows.net'],
        ],
      },
    ],
  },
  'f1-031-30': { hideSourceImage: true },
  'f1-033-32': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Source privacy requirements',
        columns: ['Source', 'Description'],
        rows: [
          [
            'Employee review data',
            'Contains sensitive information. Must NOT be folded into any other data sources.',
          ],
          [
            'Sales opportunities',
            'Contains less sensitive information. Must only be available internally.',
          ],
        ],
      },
    ],
  },
  'f1-035-34': {
    hideSourceImage: true,
    tables: [
      {
        caption:
          'Original preview rows (rows 1 and 2 empty; row 3 contains column names)',
        columns: ['Source row', 'Column 1', 'Column 2', 'Column 3', 'Column 4'],
        rows: [
          ['1', '', '', '', ''],
          ['2', '', '', '', ''],
          ['3', 'metric_order', 'metric', 'actual', 'goal'],
          ['4', '1', 'Project Percent Complete', '55', '60'],
          ['5', '2', 'On-Time Task Completion', '97', '100'],
          ['6', '3', 'Promised Requirements Met', '92', '100'],
          ['7', '5', 'Costs', '1,570,250', '1,580,000'],
          ['8', '4', 'Term Utilization Rate', '110', '95'],
          ['9', '6', 'Customer Satisfaction Index', '78', '90'],
          ['10', '7', 'Team Satisfaction Index', '91', '90'],
          ['11', '8', 'Post-Deployment Support Hours', '100', '85'],
        ],
      },
    ],
  },
  'f1-181-180': {
    hideSourceImage: true,
    tables: [
      {
        caption:
          'Original semantic model (all tables use the same data source)',
        columns: ['Table', 'Storage mode', 'Related tables'],
        rows: [
          ['Date', 'DirectQuery', 'Sales; Survey Response'],
          ['Sales', 'DirectQuery', 'Date; Customer'],
          ['Survey Response', 'Import', 'Date; Customer'],
          ['Customer', 'DirectQuery', 'Sales; Survey Response'],
          ['Geography', 'DirectQuery', 'Customer'],
        ],
      },
    ],
  },
  'f1-182-181': {
    hideSourceImage: true,
    code: 'PrevYearTotalSalesAmount =\n[1](SUM(Sales[Sales Amount]), [2](Sales[Sales Date]))',
  },
  'f1-183-182': {
    hideSourceImage: true,
    code: "Actives = [1](COUNTROWS(Employees), [2]('Employees'[TermDate]))",
    tables: [
      {
        caption: 'Original Employees table (empty cells mean BLANK)',
        columns: ['EmployeeID', 'HireDate', 'TermDate'],
        rows: [
          ['1', 'January 2, 2020', 'December 30, 2022'],
          ['2', 'January 2, 2022', ''],
          ['3', 'January 29, 2024', ''],
          ['4', 'October 30, 2023', 'May 10, 2024'],
        ],
      },
    ],
  },
  'f1-184-183': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Original model columns',
        columns: ['Table', 'Columns / measures shown'],
        rows: [
          [
            'Dim Address',
            'Address ID; Address Line 1; Address Line 2; City; Country; Postal Code; State Province',
          ],
          [
            'Semester Enrollment',
            'Area of Study ID; Billing Address ID; Mailing Address ID; Semester Start Date; Student ID; Enrollment By Billing Address; Enrollment By Mailing Address',
          ],
          ['Dim Student', 'Student Name; StudentID'],
        ],
      },
      {
        caption:
          'Original relationships (one of the address relationships is inactive)',
        columns: ['One side (1)', 'Many side (*)', 'Relationship role'],
        rows: [
          ['Dim Address', 'Semester Enrollment', 'Billing Address ID'],
          ['Dim Address', 'Semester Enrollment', 'Mailing Address ID'],
          ['Dim Student', 'Semester Enrollment', 'Student ID'],
        ],
      },
    ],
  },
  'f1-185-184': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Original spreadsheet',
        columns: [
          'Department',
          'Stage',
          'School1',
          'School2',
          'School3',
          'School4',
        ],
        rows: [
          ['Mathematics', '1', '75', '65', '90', '70'],
          ['Mathematics', '2', '80', '70', '80', '75'],
          ['Geography', '1', '95', '65', '80', '75'],
          ['Geography', '2', '80', '70', '80', '75'],
        ],
      },
      {
        caption: 'Target format as illustrated in the source (School1 rows)',
        columns: ['Department', 'School', 'Avg Score'],
        rows: [
          ['Mathematics', 'School1', '77.5'],
          ['Geography', 'School1', '87.5'],
        ],
      },
    ],
  },
  'f1-189-188': {
    hideSourceImage: true,
    tables: [
      {
        caption:
          'Original key influencers result: Analyze = Attrition, direction = Increase',
        columns: ['OverTime', 'Average of Attrition'],
        rows: [
          ['Yes', '0.30'],
          ['No', '0.10'],
        ],
      },
      {
        caption: 'Original field wells',
        columns: ['Well', 'Fields'],
        rows: [
          [
            'Explain by',
            'Age; BusinessTravel; DailyRate; Department; DistanceFromHome; Education; JobSatisfaction; OverTime',
          ],
          ['Expand by', '(empty)'],
          ['Selected influencer', 'OverTime is Yes; average increases by 0.2'],
        ],
      },
    ],
  },
  'f1-191-190': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Original result: What influences Total Sales to Increase?',
        columns: [
          'Selected influencer',
          'Increase in average Total Sales versus other occupations',
        ],
        rows: [['Occupation is Professional', '£3.41K']],
      },
    ],
  },
  'f1-192-191': {
    hideSourceImage: true,
    tables: [
      {
        caption:
          'Source Key influencers: average Quantity Per Order increases by (units, not percent)',
        columns: ['Factor', 'Increase'],
        rows: [
          ['Customer City is Cunewalde', '22.39'],
          ['Customer City is Graz', '22.21'],
          ['Customer City is Boise', '20.37'],
          ['Customer Country is Austria', '18.8'],
        ],
      },
      {
        caption: 'Selected city comparison in source graphic',
        columns: ['Item', 'Observation'],
        rows: [
          ['Selected city', 'Cunewalde'],
          ['Average excluding the selected city', '23.70'],
          ['Cork', 'Bar is above the average reference line'],
          ['Product Category', 'Not shown among the displayed influencers'],
        ],
      },
    ],
  },
  'f1-197-196': {
    hideSourceImage: true,
    tables: [
      {
        caption:
          'Source table: existing calculations and displayed cell backgrounds',
        columns: [
          'MonthName',
          'Total Sales',
          'Sales Last Year',
          '% Growth to Last Year',
          'Total Sales background',
        ],
        rows: [
          ['January', '£559,263.79', '£144,365.51', '74.19%', 'teal'],
          ['February', '£583,915.29', '£215,923.28', '63.02%', 'yellow'],
          ['March', '£684,091.92', '£211,347.46', '69.11%', 'teal'],
          ['April', '£957,686.49', '£350,270.97', '63.43%', 'teal'],
          ['May', '£841,473.26', '£310,708.65', '63.08%', 'teal'],
          ['June', '£876,911.71', '£298,356.83', '65.98%', 'teal'],
          ['July', '£922,410.09', '£348,435.28', '62.23%', 'yellow'],
          ['August', '£1,002,219.24', '£388,213.68', '61.26%', 'yellow'],
          ['September', '£1,152,976.22', '£407,595.76', '64.65%', 'teal'],
          ['October', '£1,262,647.67', '£465,583.06', '63.13%', 'teal'],
          ['November', '£555,548.44', '£555,548.44', '0.00%', 'red'],
          ['December', '£553,615.45', '£553,615.45', '0.00%', 'red'],
          [
            'Total',
            '£9,952,759.56',
            '£4,249,964.36',
            '57.30%',
            'dark total row',
          ],
        ],
      },
    ],
  },
  'f1-001-0': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Original model: tables and columns',
        columns: ['Table', 'Columns shown in the exhibit'],
        rows: [
          ['Sales', 'CustomerKey; DueDateKey'],
          ['Date', 'Date; DateKey'],
          ['Customer', 'CustomerKey'],
          ['SalesAggregate', 'CustomerKey; DueDateKey'],
        ],
      },
      {
        caption: 'Original model: one-to-many, single-direction relationships',
        columns: ['One side (1)', 'Many side (*)', 'Filter direction'],
        rows: [
          ['Date', 'Sales', 'Date → Sales'],
          ['Date', 'SalesAggregate', 'Date → SalesAggregate'],
          ['Customer', 'Sales', 'Customer → Sales'],
          ['Customer', 'SalesAggregate', 'Customer → SalesAggregate'],
        ],
      },
    ],
  },
  'f1-162-161': {
    tables: [
      {
        caption: 'Recovered original model columns (source PDF pages192–193)',
        columns: ['Table', 'Column names'],
        rows: [
          ['Date', 'Date; MonthName; MonthStartDate; MonthYear; Year'],
          ['Account', 'AccountID; AccountNumber; AccountName; AccountCategory'],
          [
            'Transactions',
            'TransactionID; TransactionDate; AccountID; TransAmt',
          ],
        ],
      },
    ],
  },
  'f1-163-162': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Source columns',
        columns: ['Table', 'Columns'],
        rows: [
          ['Products (dimension)', 'ProductID; ProductName'],
          ['OrderHistory (fact)', 'OrderID; ProductID; OrderDate'],
          ['Date (dimension)', 'Year; Date; Week; Month'],
        ],
      },
      {
        caption: 'Source integrity note',
        columns: ['Note'],
        rows: [
          [
            'The second source menu omits a valid cardinality. The choice list has been repaired; the printed source key must not be used.',
          ],
        ],
      },
    ],
  },
  'f1-164-163': {
    tables: [
      {
        caption: 'Adapted matching question',
        columns: ['Source limitation'],
        rows: [
          [
            'The original saved source does not provide the DAX formula. Match each named function role below; these are reconstructed roles, not recovered blank positions.',
          ],
        ],
      },
    ],
  },
  'f1-166-165': {
    hideSourceImage: true,
    code: 'daterange = [1]([2](Sales, [Date]), [3](Forecast, [Date]))',
  },
  'f1-167-166': {
    tables: [
      {
        caption: 'FactSales: recovered original data',
        columns: ['Date', 'Sales amount'],
        rows: [
          ['May 9, 2024', '10'],
          ['May 9, 2023', '15'],
          ['May 1, 2023', '20'],
          ['May 29, 2023', '25'],
        ],
      },
    ],
  },
  'f1-168-167': {
    tables: [
      {
        caption: 'Expenses: recovered original source columns',
        columns: ['Column name', 'Description', 'Sample value'],
        rows: [
          ['TransactionID', 'Transaction ID of each expense', '12142'],
          [
            'TransactionDate',
            'Date and time each expense occurred',
            '2024-09-05T11:09:51',
          ],
          [
            'PostDate',
            'Date and time posted to the ledger',
            '2024-09-08T06:11:05',
          ],
          ['AccountID', 'Unique ID of each expense account', '213412'],
          ['DepartmentID', 'Department responsible for the expense', '13'],
        ],
      },
    ],
  },
  'f1-171-170': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Table1',
        columns: ['Code', 'Make', 'Model'],
        rows: [
          ['SM', '500', 'Fiat'],
          ['LU', '8', 'BMW'],
          ['SP', '718', 'Porsche'],
        ],
      },
      {
        caption: 'Table2',
        columns: ['Code', 'Name'],
        rows: [
          ['SP', 'Sports Car'],
          ['LU', 'Luxury Car'],
        ],
      },
      {
        caption: 'Edit relationship: displayed settings',
        columns: ['Setting', 'Value'],
        rows: [
          ['From table/column', 'Table1[Code]'],
          ['To table/column', 'Table2[Code]'],
          ['Cardinality', 'One to many (1:*)'],
          ['Cross-filter direction', 'Single'],
          ['Make this relationship active', 'Selected'],
        ],
      },
    ],
  },
  'f1-172-171': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Source columns and date relationships',
        columns: ['Table', 'Column', 'Relationship to DateTime[Date]'],
        rows: [
          ['Sales', 'SalesAmount', '—'],
          ['Sales', 'ShippingDate', 'Inactive'],
          ['Sales', 'SaleDate', 'Active'],
          ['DateTime', 'Date', 'Dimension date'],
        ],
      },
    ],
    code: 'Sales by ShippingDate = [1](SUM(Sales[SalesAmount]), [2](Sales[ShippingDate], DateTime[Date]))',
  },
  'f1-173-172': {
    tables: [
      {
        caption: 'Original data',
        columns: ['StudentID', 'Student', 'Classes'],
        rows: [
          ['1', 'John Yang', 'Biology, Chemistry, English, Calculus'],
          ['2', 'Ruben Torres', 'English, Art History, Geography'],
          ['3', 'Chloe Young', 'Spanish, Marketing, Economics'],
          ['4', 'Destiny Wilson', 'Statistics, Physics'],
        ],
      },
      {
        caption: 'Required output (transcribed from the original exhibit)',
        columns: ['StudentID', 'Student', 'Classes'],
        rows: [
          ['1', 'John Yang', 'Biology'],
          ['1', 'John Yang', 'Chemistry'],
          ['1', 'John Yang', 'English'],
          ['1', 'John Yang', 'Calculus'],
          ['2', 'Ruben Torres', 'English'],
          ['2', 'Ruben Torres', 'Art History'],
          ['2', 'Ruben Torres', 'Geography'],
          ['3', 'Chloe Young', 'Spanish'],
          ['3', 'Chloe Young', 'Marketing'],
          ['3', 'Chloe Young', 'Economics'],
          ['4', 'Destiny Wilson', 'Statistics'],
          ['4', 'Destiny Wilson', 'Physics'],
        ],
      },
    ],
  },
  'f1-175-174': {
    tables: [
      {
        caption: 'DimProduct',
        columns: ['Product ID', 'Product name'],
        rows: [
          ['1', 'Product A'],
          ['2', 'Product B'],
          ['3', 'Product C'],
        ],
      },
      {
        caption: 'FactSales',
        columns: ['Sale date', 'Amount', 'Product ID'],
        rows: [
          ['January 1, 2024', '5.00', '1'],
          ['January 2, 2024', '10.00', '2'],
          ['February 10, 2024', '5.00', '1'],
          ['March 3, 2024', '15.00', '3'],
        ],
      },
    ],
  },
  'f1-176-175': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Relationships',
        columns: [
          'From table',
          'From column',
          'To table',
          'To column',
          'Status',
        ],
        rows: [
          [
            'Dim Location',
            'Location ID',
            'Fact Deliveries',
            'Origin Location ID',
            'Active',
          ],
          [
            'Dim Location',
            'Location ID',
            'Fact Deliveries',
            'Destination Location ID',
            'Inactive',
          ],
        ],
      },
    ],
    code: "Deliveries = COUNTROWS('Fact Deliveries')\n\nDeliveries by Destination = [1]([Deliveries], [2]('Location'[Location ID], 'Fact Deliveries'[Destination Location ID]))",
  },
  'f1-177-176': { hideSourceImage: true },
  'f1-179-178': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Source preview: 250,000 rows stated to follow this format',
        columns: ['Value', 'Datetime', 'Information'],
        rows: [
          [
            '78000.00',
            '2024-08-15 00:00:00.000',
            'The sheep jumps over the fence',
          ],
          ['85000.00', '2023-05-17 00:00:00.000', 'The cows fall into a pond'],
          ['17000.00', '2020-01-31 00:00:00.000', 'The birds eats seeds'],
        ],
      },
    ],
  },
  'f1-144-143': {
    hideSourceImage: true,
    code: "Sales Qualification =\nIF(\n  'Opportunity'[Qualification] < 0.5,\n  \"Low\",\n  [1]('Opportunity'[Qualification] > 0.7, [2], [3])\n)",
  },
  'f1-146-145': {
    hideSourceImage: true,
    code: "Item Quantity Rank =\nIF(\n  [1]('Item'[Item]),\n  RANKX(ALL('Item'[Item]), [Quantity], , , [2])\n)",
  },
  'f1-147-146': {
    hideSourceImage: true,
    code: 'let\n  Source = SharePoint.Tables("https://contoso.sharepoint.com", [Implementation="2.0", ViewMode="All"]),\n  #"3b73bb0e-9677-425e-8296-0f2a756be816" = Source{[Id="3b73bb0e-9677-425e-8296-0f2a756be816"]}[Items],\n  #"Expanded Location" = [1](#"3b73bb0e-9677-425e-8296-0f2a756be816", "Location", {"DisplayName"}, {"Location.DisplayName"}),\n  #"Removed" = [2](#"Expanded Location", {"CountryOrRegion"})\nin\n  #"Removed"',
  },
  'f1-153-152': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'ModelA — all source columns have Text data type',
        columns: ['Column', 'Example'],
        rows: [
          ['OrderID', '12345'],
          ['OrderTitle', 'Order #12345'],
          ['OrderDate', 'May 20, 2023'],
          ['CustomerID', 'C54321'],
          ['OrderDescription', 'Order placed May 20, 2023 containing 5 items'],
          ['Shipping Address', '123 Anywhere Lane'],
        ],
      },
    ],
  },
  'f1-159-158': {
    hideSourceImage: true,
    code: 'Sales = [1]([Sales], [2](\'Unit\'[Color] = "blue"))',
  },
  'f1-125-124': { hideSourceImage: true, code: 'Numbers = [1][2]' },
  'f1-128-127': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Source table columns',
        columns: ['Table', 'Column', 'Description', 'Data type'],
        rows: [
          ['Date', 'Date', 'Calendar date', 'Date'],
          ['Date', 'Month', 'Calendar month', 'Text'],
          ['Date', 'Year', 'Calendar year', 'Integer'],
          ['Sales', 'Sale', 'Sales value', 'Decimal number'],
          ['Sales', 'Date', 'Calendar date', 'Date'],
        ],
      },
    ],
    code: 'SalesSummary = [1](Sales, [2], "Sales", SUM(Sales[Sale]))',
  },
  'f1-130-129': {
    hideSourceImage: true,
    code: "Last Inventory Count = [1](SUM('Inventory'[QuantityAvailable]), [2]('Date'[Date]))",
  },
  'f1-132-131': {
    hideSourceImage: true,
    code: 'Headcount = CALCULATE([1], [2])',
  },
  'f1-133-132': { hideSourceImage: true },
  'f1-138-137': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Selected visual: clustered column chart',
        columns: ['Field well', 'Current fields'],
        rows: [
          ['X-axis', 'Year'],
          ['Y-axis', 'Sum of Sales Amount; Sum of Product Cost'],
          ['Legend', '(empty)'],
          ['Small multiples', '(empty)'],
          ['Tooltips', '(empty)'],
        ],
      },
      {
        caption: 'SalesDetails: visible fields in the source',
        columns: ['Column', 'Source indication'],
        rows: [
          ['CustomerKey', 'Column'],
          ['DueDateKey', 'Column'],
          ['Extended Amount', 'Column'],
          ['Order Quantity', 'Numeric column (Σ)'],
          ['OrderDateKey', 'Column'],
          ['Product Cost', 'Numeric column (Σ), selected'],
          ['Product Standard Cost', 'Column'],
          ['ProductKey', 'Column'],
          ['ResellerKey', 'Column'],
          ['Sales Amount', 'Numeric column (Σ), selected'],
          ['SalesDate', 'Column'],
          ['SalesOrderLineKey', 'Column'],
          ['SalesTerritoryKey', 'Column'],
          ['ShipDateKey', 'Column'],
          ['Unit Price', 'Column'],
          ['Unit Price Discount Pct', 'Column'],
        ],
      },
    ],
  },
  'f1-103-102': {
    code: 'ERROR [08001] timeout expired',
  },
  'f1-111-110': {
    hideSourceImage: true,
    code: 'Active Store Name = [1]([Status] = "A", [Store Name], "Inactive - " [2] [Store Name])',
  },
  'f1-117-116': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Model tables',
        columns: ['Table', 'Columns'],
        rows: [
          ['Product', 'ProductCategory; ProductID; ProductName'],
          [
            'Sales',
            'InvoiceNumber; ProductID; SaleDate; SalesAmount; SalesQuantity',
          ],
          ['Date', 'Date; Month; Quarter; Year'],
        ],
      },
      {
        caption: 'Active model relationships (single direction)',
        columns: ['One side', 'Many side', 'Filter direction'],
        rows: [
          ['Product[ProductID]', 'Sales[ProductID]', 'Product → Sales'],
          ['Date[Date]', 'Sales[SaleDate]', 'Date → Sales'],
        ],
      },
    ],
    code: 'Product Categories Sold = CALCULATE([1], [2])',
  },
  'f1-081-80': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Model tables and columns',
        columns: ['Table', 'Columns'],
        rows: [
          ['Sales', 'SalesID; ProductID; DateKey; SalesAmount'],
          ['Products', 'ProductID; ProductName; ProductCategoryID'],
          ['ProductCategory', 'ProductCategoryID; CategoryName'],
        ],
      },
    ],
  },
  'f1-083-82': {
    hideSourceImage: true,
    code: "Sales PYTD =\nVAR startyear = STARTOFYEAR(PREVIOUSYEAR('Calendar'[Date]))\nVAR enddate = LASTDATE('Sales'[Date]) - 365\nRETURN\n  [1](\n    [2](Sales[sales]),\n    [3]('Calendar'[Date], startyear, enddate)\n  )",
  },
  'f1-090-89': {
    hideSourceImage: true,
    code: "Sales QoQ% =\nIF(\n  ISFILTERED('financials'[Date]),\n  ERROR(\"Uh oh.\"),\n  VAR PREV_QUARTER =\n    [1](SUM('financials'[Sales]), [2]('financials'[Date].[Date], -1, QUARTER))\n  RETURN\n    [3](SUM('financials'[Sales]) - PREV_QUARTER, PREV_QUARTER)\n)",
  },
  'f1-091-90': {
    hideSourceImage: true,
    code: "Top 8 Products = [1](8, 'Product', 'Product'[Total Sales], [2])",
  },
  'f1-095-94': {
    hideSourceImage: true,
    code: 'Date =\nVAR var1 = [1]([2]())\nRETURN\n  [3](DATE(var1 - 9, 1, 1), DATE(var1, 12, 31))',
  },
  'f1-097-96': {
    hideSourceImage: true,
    code: 'Measure = [1]([Total Sales], [2])',
  },
  'f1-101-100': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Quick measure: Rolling average — existing settings',
        columns: ['Setting', 'Value'],
        rows: [
          ['Calculation', 'Rolling average'],
          ['Periods before', '1'],
          ['Periods after', '0'],
          [
            'Available Sales fields',
            'Date; Gross Margin; Month; MonthNumberOfYear; Quarter; Sales_SRC; Time Intelligence; Total Cost; Total Order Qty; Total Sales; Total Sales rolling average; Unit Price; Year',
          ],
        ],
      },
    ],
  },
  'f1-108-107': {
    hideSourceImage: true,
    code: "Percent of Product Sales =\nVAR ProductSales = SUM('Sales'[Sales])\nVAR AllSales = [1](SUM('Sales'[Sales]), [2]('Products'[Product]))\nRETURN DIVIDE(ProductSales, AllSales)",
  },
  'f1-074-73': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Sales: source columns',
        columns: ['Column', 'Data type'],
        rows: [
          ['sales_id', 'Integer'],
          ['sales_date', 'Datetime'],
          ['Customer_id', 'Integer'],
          ['sales_amount', 'Floating'],
          ['employee_id', 'Integer'],
          ['sales_ship_date', 'Datetime'],
          ['store_id', 'Varchar(100)'],
        ],
      },
      {
        caption: 'Employee: source columns',
        columns: ['Column', 'Data type'],
        rows: [
          ['employee_id', 'Integer'],
          ['first_name', 'Varchar(100)'],
          ['last_name', 'Varchar(100)'],
          ['employee_photo', 'Binary'],
        ],
      },
    ],
  },
  'f1-075-74': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'View1: source columns',
        columns: ['Column', 'Data type'],
        rows: [
          ['Attendance Date', 'Date'],
          ['Student ID', 'Bigint'],
          ['Period Number', 'Tinyint'],
          ['Class ID', 'Int'],
        ],
      },
      {
        caption: 'View2: source columns',
        columns: ['Column', 'Data type'],
        rows: [
          ['Class ID', 'Bigint'],
          ['Class Name', 'Varchar(200)'],
          ['Class Subject', 'Varchar(100)'],
          ['Teacher ID', 'Int'],
          ['Teacher First Name', 'Varchar(100)'],
          ['Teacher Last Name', 'Varchar(100)'],
          ['Period Number', 'Tinyint'],
          ['School Year', 'Varchar(50)'],
          ['Period Start Time', 'Time'],
          ['Period End Time', 'Time'],
        ],
      },
    ],
  },
  'f1-079-78': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Source tables',
        columns: ['Table', 'Description'],
        rows: [
          [
            'Balances',
            'Daily closing-balance records for each active account, for every day it is live including its last day.',
          ],
          [
            'Date',
            'One row per day for calendar years 2000–2025, with financial year, quarter, month and day hierarchy.',
          ],
        ],
      },
    ],
    code: "Accounts :=\nCALCULATE(\n  DISTINCTCOUNT(Balances[AccountID]),\n  LASTDATE('Date'[Date])\n)",
  },
  'f1-061-60': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Business Unit: source table columns',
        columns: ['Column'],
        rows: [['Cost Center'], ['Headcount'], ['ID'], ['Name']],
      },
    ],
  },
  'f1-064-63': {
    hideSourceImage: true,
    code: 'Sales Previous Year =\n  [Answer 1](\n    [Total Sales],\n    [Answer 2]( [Answer 3] )\n  )',
  },
  'f1-042-41': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Tables in the star schema (source exhibit)',
        columns: ['Table', 'One row represents', 'Columns / identifier'],
        rows: [
          [
            'Date',
            'Each day from the last five years',
            'Date (unique identifier), year, quarter, month, week of year, day of week',
          ],
          [
            'Patient',
            'One patient',
            'Patient key (unique identifier), patient source ID, first name, last name, date of birth, gender, address, city, state, country',
          ],
          [
            'Test',
            'One test definition',
            'Test key (unique identifier), test source ID, type, name',
          ],
          [
            'Test Result',
            'One administered test',
            'Date administered, test key, patient key, result value, comments',
          ],
        ],
      },
    ],
  },
  'f1-045-44': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Sales: 10 million records (source exhibit)',
        columns: ['Column', 'Data type', 'Description'],
        rows: [
          ['PurchaseID', 'Text', 'Unique ID for each order'],
          ['CustomerID', 'Text', 'Unique ID for each customer'],
          [
            'PurchaseDateTime',
            'Date/Time/Timezone',
            'Date and time each order occurred',
          ],
          ['Region', 'Text', 'Region where each order occurred'],
          ['TotalAmount', 'Decimal number', 'Total cost of each order'],
        ],
      },
    ],
  },
  'f1-059-58': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Database tables',
        columns: ['Table', 'Column', 'Key'],
        rows: [
          ['Customer', 'CustomerID', 'Primary key'],
          ['Customer', 'Name', ''],
          ['Customer', 'State', ''],
          ['Customer', 'Email', ''],
          ['Transaction', 'TransactionID', 'Primary key'],
          ['Transaction', 'CustomerID', 'Foreign key to Customer.CustomerID'],
          ['Transaction', 'Date', ''],
          ['Transaction', 'Amount', ''],
        ],
      },
    ],
  },
  'f2-152-425': {
    hideSourceImage: true,
    warning:
      'The original source omits the required output/layout. The existing table and available settings are shown below, but they do not establish which transformation is required. This item cannot be answered reliably or auto-graded until the missing requirement is supplied.',
    tables: [
      {
        caption: 'Existing table visual (source exhibit)',
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
    ],
  },
  'f2-202-444': {
    warning:
      'The saved dropdown crops belong to a different question. They have been disabled. The source profile shows 12 distinct and 11 unique values, but a readable original answer area is still required to transcribe every distractor exactly.',
  },
  'f2-336-483': {
    warning:
      'The source exhibit omits the answer area and statements. The previously reused menu images have been disabled. Supply the complete original question before answering this item.',
  },
};

export function getQuestionPresentation(question: Pick<Question, 'id'>) {
  return questionPresentation[question.id];
}
