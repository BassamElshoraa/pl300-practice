/** Read against each original option image. Index order is kept for saved
 * answers and managed grading keys; OCR candidates are never imported directly. */
export type DragTextSpec = {
  options: string[];
  slotLabels?: string[];
  discardLegacyAnswers?: boolean;
};
export const dragTextData: Record<string, DragTextSpec> = {
  'f1-006-5': {
    options: [
      'Full outer',
      'Inner',
      'Left anti',
      'Left outer',
      'Right anti',
      'Right outer',
    ],
    slotLabels: [
      'Merge Product with ProductSubCategory',
      'Merge the result with ProductCategory',
    ],
  },
  'f1-009-8': {
    options: [
      'From Power Query Editor, remove errors from the table.',
      'From Power Query Editor, select Table1, and then select Remove duplicates.',
      'From Power Query Editor, merge Table1 and Table2.',
      'From Power BI Desktop, import the data from Excel, and select Table1 and Table2.',
      'From Power Query Editor, append Table2 to Table1.',
    ],
  },
  'f1-015-14': {
    options: [
      'From Power BI Desktop, select Get Data, and then select Folder.',
      'From Power Query Editor, expand the Attributes column.',
      'From Power Query Editor, remove the Content column.',
      'From Power Query Editor, remove the Attributes column.',
      'From Power BI Desktop, select Get Data, and then select Text/CSV.',
      'From Power Query Editor, combine the Content column.',
    ],
  },
  'f1-017-16': {
    options: [
      'Add the dataset owner to the data source.',
      'Configure an on-premises data gateway.',
      'Configure a virtual network data gateway.',
      'Add a data source.',
      'Configure a scheduled refresh.',
    ],
  },
  'f1-019-18': {
    options: [
      'Select the Month and MonthNumber columns.',
      'Select Unpivot other columns.',
      'Rename the Attribute column as Year and the Value column as Sales.',
      'Select the 2019, 2020, and 2021 columns.',
      'Select Transpose.',
    ],
  },
  'f1-023-22': {
    options: [
      'Select the discount column.',
      'Select the price column.',
      'For the discount column, change Data Type to Decimal Number.',
      'For the discount column, change Data Type to Whole Number.',
      'Select Replace Errors to replace each error value with 0.05.',
    ],
  },
  'f1-028-27': {
    options: ['DirectQuery', 'Import', 'LiveConnect', 'Push'],
    slotLabels: ['Report file', 'Dataset / semantic model file'],
  },
  'f1-065-64': {
    options: [
      'Publish the report.',
      'Assign users to the role.',
      'Add a filter to the report.',
      'Create a role definition.',
      'Import the data to Power BI Desktop.',
    ],
  },
  'f1-066-65': {
    options: [
      'Merge [Region_Manager] and [Manager] by using an inner join.',
      'Merge [Sales_Manager] and [Sales_Region] by using a left join.',
      'Merge [Sales_Region] and [Sales_Manager] by using an inner join.',
      'Merge [Sales_Region] and [Sales_Manager] by using an inner join as a new query named [Sales_Region_and_Manager].',
      'Merge [Sales_Region] and [Region_Manager] by using a right join as a new query named [Sales_Region_and_Region_Manager].',
      'Merge [Sales_Region] and [Region_Manager] by using an inner join.',
    ],
  },
  'f1-073-72': {
    options: [
      'Use headers as the first row.',
      'Rename the Attribute column as Year.',
      'Use the first row as headers.',
      'Transpose the table.',
      'Unpivot all the columns other than Measure.',
      'Change the data type of the Year column to Date.',
      'Rename the Measure column as Year.',
    ],
  },
  'f1-088-87': {
    options: [
      'Select Department and Product and Unpivot Columns.',
      'Select Use First Row as Headers.',
      'Select Department, Product and Unpivot Other Columns.',
      'Rename the Attribute column to Year and the Value column to Revenue.',
      'Select Use Header as First Row.',
      'Rename the Attribute column to Revenue and the Value column to Year.',
    ],
  },
  'f1-091-90': {
    options: ['ASC', 'DESC', 'RELATEDTABLE', 'CALCULATETABLE', 'MAXX', 'TOPN'],
  },
  'f1-095-94': {
    options: ['CALENDAR', 'CALENDARAUTO', 'DATE', 'EOMONTH', 'TODAY', 'YEAR'],
  },
  'f1-098-97': { options: ['ALL', 'AND', 'CALCULATE', 'FILTER', 'OR', 'SUM'] },
  'f1-108-107': {
    options: ['ALL', 'ALLSELECTED', 'CALCULATE', 'FILTER', 'SELECTEDVALUE'],
  },
  'f1-122-121': {
    options: [
      '[Country] = "USA"',
      '[Email] = USERPRINCIPALNAME()',
      '[Manager] = "CFO"',
      'FALSE()',
      'TRUE()',
    ],
    slotLabels: [
      'Human Resources table filter for the CFO role',
      'Country table filter for the Manager role',
    ],
  },
  'f1-141-140': {
    options: ['Inner', 'Left anti', 'Left outer', 'Right anti', 'Right outer'],
  },
  'f1-176-175': {
    options: [
      'ALLSELECTED',
      'CALCULATE',
      'USERELATIONSHIP',
      'CALCULATETABLE',
      'CROSSFILTER',
      'KEEPFILTERS',
    ],
  },
  'f1-185-184': {
    options: [
      'Select the [Department] and [Stage] columns and unpivot the other columns.',
      'Select and unpivot the [Department] and [Stage] columns.',
      'Group by [Department] and [School] and create a new column named [Avg Score] that uses the AVERAGE function on the [Score] column.',
      'Rename the [Attribute] column as [School] and the [Value] column as [Score].',
      'Group by [Department], [School1], [School2], [School3], [School4] and create a new column named [Avg Score] that uses the AVERAGE function on the [Stage] column.',
    ],
  },
  'f1-195-194': {
    options: [
      'From Focus mode, pin the relevant visuals to DashboardA.',
      'From Focus mode, review the generated visuals.',
      'From DashboardA, select the TileA options, and then select View insights.',
      'From ReportA, select the treemap visual options, and then select Spotlight.',
      'From ReportA, select Get Insights.',
    ],
  },
  'f1-198-197': {
    options: [
      'Pin items from the reports to the dashboard.',
      'Open the dashboard.',
      'Create a phone layout for the existing reports.',
      'Edit the Dashboard mobile view.',
      'Rearrange, resize, or remove items from the mobile layout.',
    ],
  },
  'f1-205-204': {
    options: [
      'From powerbi.com, pin a range from Excel1 to DashboardA.',
      'From Excel, format the data in Excel1 as a table.',
      'From powerbi.com, import Excel1 as a dataset.',
      'From powerbi.com, add a tile for the Excel1 dataset to DashboardA.',
      'From Excel, create a named range by using the data in Excel1.',
    ],
  },
  'f1-241-240': {
    options: [
      'Set Format style to Rules.',
      'Add and configure a new rule for each value range.',
      'Set Format style to Field value.',
      'Open the Background color dialog for the Revenue column.',
      'Open the Font color dialog for the Revenue column.',
    ],
  },
  'f1-243-242': {
    options: [
      'From a web browser, download the PBIVIZ file for the Word Cloud visual from Microsoft AppSource.',
      'Format the data colors and title.',
      'From Power BI Desktop, get the Word Cloud visual from Microsoft AppSource.',
      'Populate the drillthrough fields.',
      'Populate the Category, Value, and Excludes fields.',
    ],
  },
  'f1-244-243': {
    options: [
      'Add a Bookmark button.',
      'Change the Bookmark property for the button.',
      'Group the other two bookmarks.',
      'Group the three bookmarks.',
    ],
  },
  'f1-246-245': {
    options: [
      'Add the Country field to the filters on all the pages.',
      'Configure the Country slicer to sync across all the pages.',
      'Configure the Country slicer to sync only on the second and third pages.',
      'Hide the Country slicer on the second and third pages.',
    ],
  },
  'f1-250-249': {
    options: [
      'Image Tagging',
      'Key Phrase Extraction',
      'Language Detection',
      'Sentiment Analysis',
    ],
  },
  'f1-262-261': {
    options: [
      'Area chart',
      'Funnel chart',
      'Multi-row card',
      'Pie chart',
      'Stacked bar chart',
    ],
  },
  'f1-280-279': {
    options: ['Gauge', 'Slicer', 'Smart narrative', 'Table', 'Treemap'],
  },
  'f1-284-283': {
    options: [
      'From the Transform tab, select Extract, and then select Length.',
      'From the View tab, select Column distribution.',
      'From the View tab, select Column profile.',
      'Group the value distribution by text length.',
      'Select the Location Name column.',
    ],
  },
  'f1-290-289': {
    options: [
      'Column distribution',
      'Column quality',
      'Monospaced',
      'Column profile',
      'Formula Bar',
    ],
  },
  'f1-300-299': {
    options: [
      'Open Power BI Desktop.',
      'Pin the page.',
      'Pin each visual.',
      'Open powerbi.com.',
      'Open the Sales report.',
      'Create a new report.',
    ],
  },
  'f1-306-305': { options: ['Admin', 'Contributor', 'Member', 'Viewer'] },
  'f1-319-318': {
    options: ['ALL', 'CALCULATE', 'COUNTROWS', 'EVALUATE', 'SUM', 'SUMX'],
  },
  'f1-320-319': {
    options: [
      'Configure a scheduled refresh.',
      'Configure a virtual network data gateway.',
      'Add the dataset owner to the data source.',
      'Add a data source.',
      'Configure an on-premises data gateway.',
    ],
  },
  'f1-334-333': {
    options: [
      'Publish the semantic model.',
      'Assign the users the Member role for the Power BI workspace.',
      'From the Power BI service, assign the new RLS role to the users.',
      'From Microsoft Power BI Desktop, create a new RLS role by using a DAX filter.',
    ],
  },
  'f1-347-346': {
    options: [
      'From powerbi.com, assign the analysts the Contributor role to the workspace.',
      'From Power BI Desktop, add a Table Filter DAX Expression to the roles.',
      'From powerbi.com, add role members to the roles.',
      'From Power BI Desktop, create four roles.',
      'From Power BI Desktop, publish the dataset to powerbi.com.',
    ],
  },
  'f2-004-372': {
    options: [
      'From powerbi.com, assign the analysts the Contributor role to the workspace.',
      'From powerbi.com, add role members to the roles.',
      'From Power BI Desktop, add a Table Filter DAX Expression to the roles.',
      'From Power BI Desktop, create four roles.',
      'From Power BI Desktop, publish the dataset to powerbi.com.',
    ],
  },
  'f2-026-386': {
    options: [
      'Create a product hierarchy of Manufacturer, ProductSpecifications, ProductName, ProductSubcategory, and ProductCategory.',
      'Transform the ProductDescription column to contain only the text between the first and fourth > symbol.',
      'Add the product hierarchy as an extra field in visuals where ProductDescription is used.',
      'Add a column named ProductName that contains only the text between the third and fourth > symbol in the ProductDescription column.',
      'Add a column named ProductName that contains all the text after the third > symbol in the ProductDescription column.',
      'Create a product hierarchy of ProductCategory, ProductSubcategory, Manufacturer, ProductName, and ProductSpecifications.',
    ],
  },
  'f2-059-397': {
    options: [
      'Publish the report.',
      'Import the data to Power BI Desktop.',
      'Add a filter to the report.',
      'Create a role definition.',
      'Assign users to the role.',
    ],
  },
  'f2-100-407': {
    options: [
      'Expand the columns.',
      'Expand the records.',
      'Add columns that use data type conversions.',
      'Set the data types.',
      'Convert the list to a table.',
    ],
  },
  'f2-157-426': {
    options: [
      'Merge [Region_Manager] and [Manager] by using an inner join.',
      'Merge [Sales_Manager] and [Sales_Region] by using a left join.',
      'Merge [Sales_Region] and [Sales_Manager] by using an inner join.',
      'Merge [Sales_Region] and [Sales_Manager] by using an inner join as a new query named [Sales_Region_and_Manager].',
      'Merge [Sales_Region] and [Region_Manager] by using a right join as a new query named [Sales_Region_and_Region_Manager].',
      'Merge [Sales_Region] and [Region_Manager] by using an inner join.',
    ],
  },
  'f2-177-434': {
    options: [
      '[Country] = "USA"',
      '[Email] = USERPRINCIPALNAME()',
      '[Manager] = "CFO"',
      'FALSE()',
      'TRUE()',
    ],
    slotLabels: [
      'Human Resources table filter for the CFO role',
      'Country table filter for the Manager role',
    ],
  },
  'f2-201-443': {
    options: [
      'Rename the Attribute column as Year.',
      'Rename the Measure column as Year.',
      'Use the first row as headers.',
      'Use headers as the first row.',
      'Unpivot all the columns other than Measure.',
      'Transpose the table.',
      'Change the data type of the Year column to Date.',
    ],
  },
  'f2-214-448': {
    options: [
      'Specify the following query, then close and apply: = Table.Distinct(#"SalesDetail")',
      'Create a visual for the query table.',
      'Create a parameter that uses a query for the suggested values.',
      'Create a query that uses Common Data Service as a data source.',
      'Specify the following query, then close and apply: = Table.Profile(#"SalesDetail")',
      'Create a blank query as a data source.',
    ],
  },
  'f2-232-454': {
    discardLegacyAnswers: true,
    options: [
      'Group by [Department], [School1], [School2], [School3], [School4] and create a new column named [Avg Score] that uses the AVERAGE function on the [Stage] column.',
      'Select and unpivot the [Department] and [Stage] columns.',
      'Select the [Department] and [Stage] columns and unpivot the other columns.',
      'Rename the [Attribute] column as [School] and the [Value] column as [Score].',
      'Group by [Department] and [School] and create a new column named [Avg Score] that uses the AVERAGE function on the [Score] column.',
    ],
  },
  'f2-281-468': {
    discardLegacyAnswers: true,
    options: [
      'From Power Query Editor, remove the Attributes column.',
      'From Power Query Editor, remove the Content column.',
      'From Power BI Desktop, select Get Data, and then select Text/CSV.',
      'From Power BI Desktop, select Get Data, and then select Folder.',
      'From Power Query Editor, expand the Attributes column.',
      'From Power Query Editor, combine the Content column.',
    ],
  },
  'f2-318-479': {
    options: ['ALL', 'ALLSELECTED', 'CALCULATE', 'FILTER', 'SELECTEDVALUE'],
  },
  'f2-323-480': {
    options: [
      'Add the Country field to the filters on all the pages.',
      'Configure the Country slicer to sync across all the pages.',
      'Configure the Country slicer to sync only on the second and third pages.',
      'Hide the Country slicer on the second and third pages.',
    ],
  },
  'f2-331-482': {
    discardLegacyAnswers: true,
    options: [
      'Area chart',
      'Funnel chart',
      'Multi-row card',
      'Pie chart',
      'Stacked bar chart',
    ],
    slotLabels: [
      'Emphasizes the percentage of total profits contributed by each product category',
      'Compares profit margins across sales regions',
    ],
  },
  'f2-368-495': {
    discardLegacyAnswers: true,
    options: [
      'Pin the page.',
      'Open the Sales report.',
      'Open Power BI Desktop.',
      'Pin each visual.',
      'Open powerbi.com.',
      'Create a new report.',
    ],
  },
  'f2-396-504': {
    options: ['ALL', 'CALCULATE', 'COUNTROWS', 'EVALUATE', 'SUM', 'SUMX'],
  },
  'f2-403-506': {
    options: [
      '[Country] = "USA"',
      '[Email] = USERPRINCIPALNAME()',
      '[Manager] = "CFO"',
      'FALSE()',
      'TRUE()',
    ],
    slotLabels: [
      'Human Resources table filter for the CFO role',
      'Country table filter for the Manager role',
    ],
  },
};
