/** Transcribed from each question's own original answer area, not reused menu crops. */
export type TextAnswerRow = { label: string; options: string[] };
const row = (label: string, options: string[]): TextAnswerRow => ({
  label,
  options,
});
const numbers = ['4', '65', '69', '73'];
const permissionRows = [
  row('Users in the finance group can ___ the semantic model.', [
    'assign sensitivity labels to',
    'use Analyze in Excel with',
    'delete',
  ]),
  row('Users in the corp group can ___ the semantic model.', [
    'grant the Build permission for',
    'grant the Read permission for',
    'remove a table from',
  ]),
];
const stockRows = [
  row('When UnitsInStock is added to a table visual, the table contains:', [
    '0 rows',
    '1 row',
    '51 rows',
    '75 rows',
  ]),
  row(
    'Changing Summarize by to Sum will ___ the number of rows in the table visual.',
    ['maintain', 'reduce', 'increase'],
  ),
];
const interactionRows = [
  row(
    'Selecting a quarter on the line chart will ___ the clustered column chart.',
    ['cross-filter', 'cross-highlight', 'not affect'],
  ),
  row(
    'Selecting a Tailspin Toys data point on the line chart will ___ the map.',
    ['cross-filter', 'cross-highlight', 'not affect'],
  ),
];
export const textAnswerData: Record<string, TextAnswerRow[]> = {
  'f1-061-60': [
    row('Row label:', ['Cost Center', 'Headcount', 'ID', 'Name']),
    row('Key column:', ['Cost Center', 'Headcount', 'ID', 'Name']),
    row('Is featured table (historical question):', ['No', 'Yes']),
  ],
  'f1-064-63': [
    row('Sales Previous Year: outer function:', [
      'CALCULATE',
      'EVALUATE',
      'SUM',
      'SUMX',
    ]),
    row('Date filter function:', [
      'DATESMTD',
      'PARALLELPERIOD',
      'SAMEPERIODLASTYEAR',
      'TOTALMTD',
    ]),
    row('Argument to the date filter:', [
      '[Date]',
      "'Date'[Date]",
      "'Date'[Month]",
    ]),
  ],
  'f1-042-41': [
    row('Fact table:', ['Date', 'Patient', 'Test', 'Test Result']),
    row('Surrogate key in Patient:', [
      'Date of birth',
      'Last name',
      'Patient key',
      'Patient source ID',
    ]),
  ],
  'f1-045-44': [
    row('CustomerID:', [
      'Change the data type to Binary.',
      'Remove any duplicate values.',
      'Remove the column.',
    ]),
    row('PurchaseDateTime:', [
      'Change the data type to Duration.',
      'Remove the column.',
      'Split the column into separate date and time columns.',
    ]),
  ],
  'f1-047-46': [
    row('To gain insight, select:', [
      'Column distribution',
      'Column quality',
      'Formula Bar',
      'Monospaced',
    ]),
    row('To resolve the errors, select:', [
      'Keep Errors',
      'Remove Duplicates',
      'Remove Empty',
      'Replace Errors',
    ]),
  ],
  'f1-054-53': [
    row('Data source:', ['Dataflows', 'JSON', 'OData', 'Web']),
    row('Authentication:', [
      'Anonymous',
      'Basic',
      'Organizational account',
      'Web API',
    ]),
  ],
  'f1-012-11': [
    row('Different values in State, including nulls:', numbers),
    row('Non-null values occurring only once in State:', numbers),
  ],
  'f1-020-19': [
    row('Default timeout for the database connection:', [
      'unlimited',
      'one minute',
      '10 minutes',
    ]),
    row('The Navigator will display:', [
      'all the tables',
      'only tables that contain data',
      'only tables that contain hierarchies',
    ]),
  ],
  'f1-024-23': [
    row('The error is caused by:', [
      'error values in the source data',
      'mismatched data types',
      'NULL values',
    ]),
    row('The desired custom-column outcome:', ['1A', 'A&1', 'A1']),
  ],
  'f1-044-43': [
    row('Before transforming the date column to show only the day:', [
      'change the data type',
      'use the Parse command on the column',
      'use the Replace Values command on the column',
    ]),
    row('To fix the error in data.Entries.menuAmount:', [
      'change the data type',
      'rename the column',
      'use Conditional Formatting',
    ]),
  ],
  'f1-051-50': [
    row('Some values in this column are repeated:', [
      'Customer ID',
      'Customer Key',
      'Customer Name',
    ]),
    row('To standardize Phone to 10 digits and exclude country codes:', [
      'extract the text after the ")" delimiter',
      'extract the last 12 characters',
      'split the column at the right-most occurrence of ")"',
    ]),
  ],
  'f1-063-62': [
    row('Relationship setting to change to improve query performance:', [
      'Cardinality',
      'Cross filter direction',
      'Assume Referential Integrity',
    ]),
    row('The data model is organized into a:', [
      'star schema',
      'snowflake schema',
      'denormalized table',
    ]),
  ],
  'f1-148-147': [
    row('Cross filter direction for the many-to-one relationship:', [
      'Both',
      'None',
      'Single',
    ]),
    row(
      'Before enabling bidirectional filtering and RLS for the many-to-many relationship:',
      [
        'change Cross filter direction',
        'define the relationship as active',
        'delete the many-to-one relationship',
      ],
    ),
  ],
  'f1-165-164': [
    row('Feature used on the Data table:', [
      'auto date/time',
      'bidirectional relationship',
      'quick measures',
    ]),
    row('Mark as date table will remove:', [
      'the Data table',
      'the MonthEndDate date hierarchy from the Data table',
      'the MonthStartDate column',
    ]),
  ],
  'f1-189-188': [
    row('To identify additional factors that increase attrition:', [
      'turning on Cross-report',
      'adding more fields to Explain by',
      'adding more fields to Expand by',
      'moving fields from Explain by to Expand by',
    ]),
    row(
      'Employee attrition is ___ times greater when employees work overtime.',
      ['0.11', '.2', '1', '3'],
    ),
  ],
  'f1-209-208': [
    row('Only once in the column:', [
      'are 20 values that occur',
      'are 365 values that occur',
      'are 277,329 values that occur',
      'is one value that occurs',
    ]),
    row('Pear, Flowering occurs more often than:', [
      'Ash, Green',
      'Crabapple, Flowering',
      'Elm, American',
      'Spruce, Blue',
    ]),
  ],
  'f1-225-224': [
    row('The visual type is:', [
      'a line',
      'a line and clustered column',
      'an area',
    ]),
    row('Indicators showing out-of-range values are created using:', [
      'a custom visual',
      'a trendline',
      'anomaly detection',
      'line chart markers',
    ]),
  ],
  'f1-227-226': [
    row('The dashed Year Average Employee Count line was created using:', [
      'a trend line',
      'a secondary axis',
      'an average reference line',
      'two measures in the Values bucket',
    ]),
    row('To enable drill-down to weeks or days, add Weeks and Days to:', [
      'Axis',
      'Values',
      'Legend',
      'Secondary values',
    ]),
  ],
  'f1-274-273': [
    row('Values occurring only once in Resource Location:', [
      '0',
      '13',
      '2,863',
    ]),
    row('The value occurring most frequently:', [
      'EU North',
      'Middle East And Africa',
      'US East',
      'ZA North',
    ]),
  ],
  'f1-317-316': permissionRows,
  'f1-326-325': permissionRows,
  'f2-197-441': [
    row('Adding only Sales[StoreID] to a table visual displays:', [
      'distinct count of the StoreID values',
      'list of all the StoreID values',
      'list of the distinct StoreID values',
      'sum of the StoreID values',
    ]),
    row('A page filter Sales[StoreID] = 1 will filter:', [
      'all the tables related to the Sales table',
      'only the Sales table',
      'only the Store table',
      'the Sales table and the Customer table',
    ]),
  ],
  'f2-349-488': [
    row('The gauge goal is set by using:', [
      'a calculated measure',
      'a DAX formula',
      'the Format settings',
    ]),
    row('To always show TotalPrice for Canada, add Territory to:', [
      'the Tooltips field',
      'the Values field',
      'the Visual level filters field',
    ]),
  ],
  'f1-078-77': stockRows,
  'f1-138-137': [
    row('To replace all implicit DAX measures in the visual, create:', [
      'one explicit measure',
      'two explicit measures',
      'three explicit measures',
    ]),
    row(
      'To change how Product Cost is aggregated in additional visuals, change:',
      ['data category', 'data type', 'DAX expression', 'Summarization setting'],
    ),
  ],
  'f1-143-142': [
    row('The tables represent this dimension design:', [
      'degenerate',
      'junk',
      'role-playing',
      'snowflake',
    ]),
    row('The only table supporting a hierarchy model for DimOrgVertical:', [
      'DimOrganizations',
      'DimOrgSubVertical',
      'FactSales',
    ]),
  ],
  'f1-171-170': [
    row('Filtering Table2[Code] means Table1 will:', [
      'be filtered',
      'be merged',
      'not be filtered',
    ]),
    row('In a table visual using both tables, Table2[Code] displays:', [
      'a BLANK',
      'a NaN',
      'an ERROR',
    ]),
  ],
  'f1-178-177': [
    row('DimDate is this type of dimension:', [
      'degenerate',
      'role-playing',
      'snowflake',
    ]),
    row('Filtering DimDate to a specific date will:', [
      'filter FactOrderDetails on OrderDate',
      'filter FactOrderDetails on RequiredDate',
      'filter FactOrderDetails on ShippedDate',
      'not filter FactOrderDetails',
    ]),
  ],
  'f1-202-201': interactionRows,
  'f1-283-282': [
    row('The visual with the slowest load time:', [
      'Adoption Button',
      'Exec Sum Selected',
      'August 2024 Active User %',
      'August 2024 Active and Enabled Users',
    ]),
    row('The visual waiting longest for other visuals to load:', [
      'Adoption Button',
      'Exec Sum Selected',
      'August 2024 Active User %',
      'August 2024 Active and Enabled Users',
    ]),
  ],
  'f2-048-394': [
    row('The tenant data classification has this shorthand:', [
      'Customers',
      'Insurance',
      'Insurance Data',
      'Sale',
    ]),
    row('The dashboard uses this dataset:', [
      'Customers',
      'Insurance',
      'Insurance Data',
      'Sale',
    ]),
  ],
  'f2-191-438': permissionRows,
  'f2-252-460': stockRows,
  'f2-337-484': interactionRows,
  'f2-353-489': [
    row('The CONTOSO dataset is consumed directly by:', [
      'CONTOSO BIKES report',
      'CONTOSO dashboard',
      'Realtime dashboard',
    ]),
    row('The Realtime dashboard depends on:', [
      'one dataset',
      'two datasets',
      'three datasets',
      'four datasets',
    ]),
  ],
  'f1-256-255': [
    row('The value occurring most frequently in the column:', [
      '25',
      '41',
      '45',
      '1431',
    ]),
    row('The smallest non-NULL value:', ['0', '17', '24', '33']),
  ],
};

// Values use a distinct namespace so pre-existing screenshot click coordinates
// cannot silently be interpreted as textual option indexes.
export const TEXT_ANSWER_OFFSET = 10_000;
export function textAnswerLabel(id: string, value: number[] = []) {
  return textAnswerData[id]?.map(
    (row, i) =>
      `${row.label} ${row.options[value[i] - TEXT_ANSWER_OFFSET] ?? '(not selected)'}`,
  );
}

const salesStatements = [
  'Removing the LastUpdated column from the Sales table reduces the model size while still supporting the required analysis.',
  'Removing the ProductID column from the Sales table reduces the model size while still supporting the required analysis.',
  'Removing the ShipDate column from the Sales table reduces the model size while still supporting the required analysis.',
];
const sensitivityStatements = [
  'The Sales dataset requires a sensitivity label.',
  'The Operations dataset requires a sensitivity label and must be certified.',
  'The Finance dataset requires a sensitivity label and must be certified.',
];
export const statementData: Record<string, string[]> = {
  'f1-068-67': [
    'The SalesRowID and AuditID columns can be removed from the model without impeding the analysis goals.',
    'Both the OrderDateKey and OrderDate columns are necessary to perform the basket analysis.',
    'The TaxAmt column must retain the current number of decimal places to perform the basket analysis.',
  ],
  'f1-079-78': [
    'A table visual that displays the date hierarchy at the year level and the [Accounts] measure will show the total number of accounts that were live throughout the year.',
    'A table visual that displays the date hierarchy at the month level and the [Accounts] measure will show the total number of accounts that were live throughout the month.',
    'A table visual that displays the date hierarchy at the day level and the [Accounts] measure will show the total number of accounts that were live that day.',
  ],
  'f1-089-88': [
    'Summarizing Orders by the CustomerID, OrderID, and OrderDate columns will reduce the model size while still supporting the current analysis.',
    'Removing the CustomerID column from Orders will reduce the model size while still supporting the current analysis.',
    'Removing the UnitPrice and Discount columns from Orders will reduce the model size while still supporting the current analysis.',
  ],
  'f1-119-118': salesStatements,
  'f2-303-475': salesStatements,
  'f1-266-265': [
    'A user can change a bar chart to a pie chart in the Sales report.',
    'A user can reshare their modified visuals with users outside of the sales department.',
    'A user can create a new quick measure and add it to a visual.',
  ],
  'f1-293-292': sensitivityStatements,
  'f2-038-390': sensitivityStatements,
  'f1-355-354': [
    'A relationship must be created between the CustomerID column in the Customer Details worksheet and the CustomerID column in the Orders table.',
    'The Data Type of the columns in the relationship between the Customer Details worksheet and the Orders table must be set to Text.',
    'The Region field used to filter the Top Customers report must come from the Orders table.',
  ],
  'f1-364-363': [
    'You need an on-premises data gateway to refresh the dataset.',
    'You need to configure a scheduled refresh of the dataset.',
    'You can use Basic authentication on the dataset to connect to the data.',
  ],
  'f2-130-417': [
    'The resulting query will contain all the columns from the 2018 transactions.',
    'The resulting query will contain all the columns from the 2019 transactions.',
    'Setting Data Type Detection to Based on first 200 rows will improve import times.',
  ],
};
