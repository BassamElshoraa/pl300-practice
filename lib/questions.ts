export type Domain =
  | 'Prepare the data'
  | 'Model the data'
  | 'Visualize and analyze the data'
  | 'Manage and secure Power BI';

export type QuestionType = 'single' | 'multi' | 'sequence' | 'matching' | 'manual';

export type Question = {
  id: string;
  domain: Domain;
  type: QuestionType;
  prompt: string;
  choices: string[];
  correct: number[];
  explanation: string;
  source: string;
  sourceNumber: number;
  legacy?: boolean;
  image?: string;
  answerImage?: string;
  context?: string;
  rows?: string[];
};

export const questions: Question[] = [
  {
    "id": "f1-001-0",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou plan to create the Power BI model shown in the exhibit. (Click the Exhibit tab.)\n\nThe data has the following refresh requirements:\n\n✑ Customer must be refreshed daily.\n\n✑ Date must be refreshed once every three years.\n\n✑ Sales must be refreshed in near real time.\n\n✑ SalesAggregate must be refreshed once per week.\n\nYou need to select the storage modes for the tables. The solution must meet the following requirements:\n\n✑ Minimize the load times of visuals.\n\n✑ Ensure that the data is loaded to the model based on the refresh requirements.\n\nWhich storage mode should you select for each table? To answer, select the appropriate options in the answer\n\narea.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Dual -\n\nCustomer should use the dual storage mode.\n\nDual: Tables with this setting can act as either cached or not cached, depending on the context of the query\nthat's submitted to the Power BI dataset. In some cases, you fulfill queries from cached data. In other cases,\nyou fulfill queries by executing an on-demand query to the data source.\n\nNote: You set the Storage mode property to one of these three values: Import, DirectQuery, and Dual.\n\nBox 2: Dual -\n\nYou can set the dimension tables (Customer, Geography, and Date) to Dual to reduce the number of limited\nrelationships in the dataset, and improve performance.\n\nBox 3: DirectQuery -\n\nSales should use the DirectQuery storage mode.\n\nDirectQuery: Tables with this setting aren't cached. Queries that you submit to the Power BI dataset\"for\nexample, DAX queries\"and that return data from\n\nDirectQuery tables can be fulfilled only by executing on-demand queries to the data source. Queries that you\nsubmit to the data source use the query language for that data source, for example, SQL.\n\nBox 4: Import -\n\nImport: Imported tables with this setting are cached. Queries submitted to the Power BI dataset that return\ndata from Import tables can be fulfilled only from cached data.\n\nNote:-\n\nDual (Composite) Mode:\n\nThe dual storage mode is between Import and DirectQuery. it is a hybrid approach, Like importing data, the\ndual storage mode caches the data in the table. However, it leaves it up to Power BI to determine the best way\nto query the table depending on the query context.\n\n1) Sales Must be Refreshed in Near real time so \"Direct Query\"\n\n2) Sales Aggregate is once per week so \"Import\" (performance also required)\n\n3) Both Date and Customer has relationship with both Sales and SalesAggregate tables so \"Dual\"\n\nbecause to support performance for DirectQuery(Sales) and Import(SalesAggregate)\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/transform-model/desktop-storage-mode",
    "source": "Final",
    "sourceNumber": 1,
    "legacy": true,
    "image": "/dump-assets/f1-001-0-question.webp",
    "answerImage": "/dump-assets/f1-001-0-answer.webp"
  },
  {
    "id": "f1-002-1",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a project management app that is fully hosted in Microsoft Teams. The app was developed by using\n\nMicrosoft Power Apps.\n\nYou need to create a Power BI report that connects to the project management app.\n\nWhich connector should you select?",
    "choices": [
      "Microsoft Teams Personal Analytics",
      "SQL Server database",
      "Dataverse",
      "Dataflows"
    ],
    "correct": [
      2
    ],
    "explanation": "Data sources in Power BI Desktop.\n\nThe Power Platform category provides the following data connections:\n\nPower BI datasets -\n\nPower BI dataflows -\n\nCommon Data Service (Legacy)\n\nDataverse -\n\nDataflows -\n\nOther data sources include Microsoft Teams Personal Analytics (Beta).\n\nYou can use the Microsoft Power BI template to import data into Power BI from Project for the web and\nProject Online. When you're using the template, you're connected to your Microsoft Dataverse instance,\nwhere your Microsoft Project web app data is stored.\n\nhttps://support.microsoft.com/en-us/office/use-power-bi-desktop-to-connect-with-your-project-data-\ndf4ccca1-68e9-418c-9d0f-022ac05249a2\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/desktop-data-sources",
    "source": "Final",
    "sourceNumber": 2,
    "legacy": true
  },
  {
    "id": "f1-003-2",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "For the sales department at your company, you publish a Power BI report that imports data from a Microsoft Excel\n\nfile located in a Microsoft SharePoint folder.\n\nThe data model contains several measures.\n\nYou need to create a Power BI report from the existing data. The solution must minimize development effort.\n\nWhich type of data source should you use?",
    "choices": [
      "Power BI dataset",
      "a SharePoint folder",
      "Power BI dataflows",
      "an Excel workbook"
    ],
    "correct": [
      0
    ],
    "explanation": "Power BI dataset\n\nbecause the case states there is already a report published and the datamodel contains measures. therefore\nand to be able to use the measures in the datamodel you should connect to the existing dataset (which was\ncreated when you plublished the report) instead of starting from scratch with the files in the SharePoint\nfolder.",
    "source": "Final",
    "sourceNumber": 3,
    "legacy": true
  },
  {
    "id": "f1-004-3",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You import two Microsoft Excel tables named Customer and Address into Power Query. Customer contains the\n\nfollowing columns:\n\n✑ Customer ID\n\n✑ Customer Name\n\n✑ Phone\n\n✑ Email Address\n\n✑ Address ID\n\nAddress contains the following columns:\n\n✑ Address ID\n\n✑ Address Line 1\n\n✑ Address Line 2\n\n✑ City\n\n✑ State/Region\n\n✑ Country\n\n✑ Postal Code\n\nEach Customer ID represents a unique customer in the Customer table. Each Address ID represents a unique\n\naddress in the Address table.\n\nYou need to create a query that has one row per customer. Each row must contain City, State/Region, and Country\n\nfor each customer.\n\nWhat should you do?",
    "choices": [
      "Merge the Customer and Address tables.",
      "Group the Customer and Address tables by the Address ID column.",
      "Transpose the Customer and Address tables.",
      "Append the Customer and Address tables."
    ],
    "correct": [
      0
    ],
    "explanation": "Remember Merge is JOIN, APPEND is UNION\n\nA merge queries operation joins two existing tables together based on matching values from one or multiple\ncolumns. You can choose to use different types of joins, depending on the output you want.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-query/merge-queries-overview",
    "source": "Final",
    "sourceNumber": 4,
    "legacy": false
  },
  {
    "id": "f1-005-4",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have two Azure SQL databases that contain the same tables and columns.\n\nFor each database, you create a query that retrieves data from a table named Customer.\n\nYou need to combine the Customer tables into a single table. The solution must minimize the size of the data model\n\nand support scheduled refresh in powerbi.com.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Append Queries as New -\n\nWhen you have additional rows of data that you'd like to add to an existing query, you append the query.\n\nThere are two append options:\n\n* Append queries as new displays the Append dialog box to create a new query by appending multiple tables.\n\n* Append queries displays the Append dialog box to add additional tables to the current query.\n\nIncorrect: When you have one or more columns that you'd like to add to another query, you merge the queries.\n\nBox 2: Disable loading the query to the data model\n\nBy default, all queries from Query Editor will be loaded into the memory of Power BI Model. You can disable\nthe load for some queries, especially queries that used as intermediate transformation to produce the final\nquery for the model.\n\nDisabling Load doesn't mean the query won't be refreshed, it only means the query won't be loaded into the\nmemory. When you click on Refresh model in Power\n\nBI, or when a scheduled refresh happens even queries marked as Disable Load will be refreshed, but their\ndata will be used as intermediate source for other queries instead of loading directly into the model. This is a\nvery basic performance tuning tip, but very important when your Power BI model grows bigger and bigger.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-query/append-queries\n\nhttps://radacad.com/performance-tip-for-power-bi-enable-load-sucks-memory-up",
    "source": "Final",
    "sourceNumber": 5,
    "legacy": false,
    "image": "/dump-assets/f1-005-4-question.webp",
    "answerImage": "/dump-assets/f1-005-4-answer.webp"
  },
  {
    "id": "f1-006-5",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nIn Power Query Editor, you have three queries named ProductCategory, ProductSubCategory, and Product.\n\nEvery Product has a ProductSubCategory.\n\nNot every ProductsubCategory has a parent ProductCategory.\n\nYou need to merge the three queries into a single query. The solution must ensure the best performance in Power\n\nQuery.\n\nHow should you merge the tables? To answer, drag the appropriate merge types to the correct queries. Each\n\nmerge type may be used once, more than once, or not at all. You may need to drag the split bar between panes or\n\nscroll to view content.\n\nNOTE: Each correct selection is worth one point.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Inner -\n\nEvery Product has a ProductSubCategory.\n\nA standard join is needed.\n\nOne of the join kinds available in the Merge dialog box in Power Query is an inner join, which brings in only\nmatching rows from both the left and right tables.\n\nBox 2: Left outer -\n\nNot every ProductsubCategory has a parent ProductCategory.\n\nOne of the join kinds available in the Merge dialog box in Power Query is a left outer join, which keeps all the\nrows from the left table and brings in any matching rows from the right table.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-query/merge-queries-inner https://docs.microsoft.com/en-us/power-\nquery/merge-queries-left-outer",
    "source": "Final",
    "sourceNumber": 6,
    "legacy": false,
    "image": "/dump-assets/f1-006-5-question.webp",
    "answerImage": "/dump-assets/f1-006-5-answer.webp"
  },
  {
    "id": "f1-007-6",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You are building a Power BI report that uses data from an Azure SQL database named erp1.\n\nYou import the following tables.\n\nYou need to perform the following analyses:\n\n✑ Orders sold over time that include a measure of the total order value\n\nOrders by attributes of products sold\n\nThe solution must minimize update times when interacting with visuals in the report.\n\nWhat should you do first?",
    "choices": [
      "From Power Query, merge the Order Line Items query and the Products query.",
      "Create a calculated column that adds a list of product categories to the Orders table by using a DAX function.",
      "Calculate the count of orders per product by using a DAX function.",
      "From Power Query, merge the Orders query and the Order Line Items query."
    ],
    "correct": [
      3
    ],
    "explanation": "D. It's the Header/Detail Schema, and the most optimal way is to flatten the header into the detail table.\n\nSource:\n\nhttps://www.sqlbi.com/articles/header-detail-vs-star-schema-models-in-tabular-and-power-bi/\n\nGPT: Merging the Orders query and the Order Line Items query in Power Query will allow you to create a\n\nsingle query that combines the necessary data from the different tables. This will make it easier and more\nefficient to perform the required analyses, as you will have all the information you need in one place.\n\n--- PBI will do the best aggregation base on Star Schema model, we now have 1 Fact table (Order Line Items)\nand 2 Dim tables (Products, Orders). Orders has common field with Products (ProductID), and pretty sure time\nseries field (OrderDate); Orders Line Items has Price and Quanity.\n\n--- We need summarize some values like \"price\" and \"quantity\" over-time by attributes product. But we only\nhave common field in Dim table (Orders) so we need to merge Dim (Orders) and Fact (Order Line Items) to new\nsingle Fact table to design the right Star Schema model.\n\n=> So that D is correct",
    "source": "Final",
    "sourceNumber": 7,
    "legacy": false,
    "image": "/exhibit-assets/f1-007-6.webp"
  },
  {
    "id": "f1-008-7",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a Microsoft SharePoint Online site that contains several document libraries.\n\nOne of the document libraries contains manufacturing reports saved as Microsoft Excel files. All the\n\nmanufacturing reports have the same data structure.\n\nYou need to use Power BI Desktop to load only the manufacturing reports to a table for analysis.\n\nWhat should you do?",
    "choices": [
      "Get data from a SharePoint folder and enter the site URL Select Transform, then filter by the folder path to the manufacturing reports library.",
      "Get data from a SharePoint list and enter the site URL. Select Combine & Transform, then filter by the folder path to the manufacturing reports library.",
      "Get data from a SharePoint folder, enter the site URL, and then select Combine & Load.",
      "Get data from a SharePoint list, enter the site URL, and then select Combine & Load."
    ],
    "correct": [
      0
    ],
    "explanation": "We have to import Excel files from SharePoint, so we need the connector SharePoint folder which is used to\nget access to the files stored in the library. SharePoint list is a collection of content that has rows and\ncolumns (like a table) and is used for task lists, calendars, etc.\n\nSince we have to filter only on manufacturing reports, we have to select Transform and then filter by the\ncorresponding folder path.",
    "source": "Final",
    "sourceNumber": 8,
    "legacy": false
  },
  {
    "id": "f1-009-8",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou have a Microsoft Excel workbook that contains two sheets named Sheet1 and Sheet2.\n\nSheet1 contains the following table named Table1.\n\nSheet2 contains the following table named Table2.\n\nYou need to use Power Query Editor to combine the products from Table1 and Table2 into the following table that\n\nhas one column containing no duplicate values.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "From Power BI Desktop, import data from Excel, and select Table 1 and Table 2.\n\nFrom Power Query Editor, append Table 2 to Table 1.\n\nFrom Power Query Editor Select Table 1,and then Select Remove duplicates.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/desktop-shape-and-combine-data",
    "source": "Final",
    "sourceNumber": 9,
    "legacy": false,
    "image": "/dump-assets/f1-009-8-question.webp",
    "answerImage": "/dump-assets/f1-009-8-answer.webp"
  },
  {
    "id": "f1-010-9",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the\n\ndate and time each complaint occurred. The data in Logged is in the following format: 2018-12-31 at 08:59.\n\nYou need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.\n\nWhat should you do?",
    "choices": [
      "Apply a transformation to extract the last 11 characters of the Logged column and set the data type of the new column to Date.",
      "Change the data type of the Logged column to Date.",
      "Split the Logged column by using at as the delimiter.",
      "Apply a transformation to extract the first 11 characters of the Logged column."
    ],
    "correct": [
      2
    ],
    "explanation": "You should split the Logged column by using \"at\" as the delimiter. This will allow you to separate the date and\ntime into separate columns, which will enable you to analyze the complaints by date and use a built-in date\nhierarchy. Alternatively, you could also use a transformation to extract the date and time from the Logged\ncolumn and set the data type of the new columns to Date and Time, respectively. Option A is incorrect\nbecause it only extracts the last 11 characters of the Logged column, which would not include the date. Option\nB is incorrect because the data in the Logged column is in a non-standard date format and cannot be directly\nconverted to the Date data type. Option D is incorrect because it only extracts the first 11 characters of the\n\nLogged column, which would not include the time.",
    "source": "Final",
    "sourceNumber": 10,
    "legacy": false
  },
  {
    "id": "f1-011-10",
    "domain": "Prepare the data",
    "type": "multi",
    "prompt": "You have a Microsoft Excel file in a Microsoft OneDrive folder.\n\nThe file must be imported to a Power BI dataset.\n\nYou need to ensure that the dataset can be refreshed in powerbi.com.\n\nWhich two connectors can you use to connect to the file? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Excel Workbook",
      "Text/CSV",
      "Folder",
      "SharePoint folder",
      "Web"
    ],
    "correct": [
      3,
      4
    ],
    "explanation": "We can import an excel file from multiple connectors (excel workbook, folder, web, share point) but if we must\nrefresh the data from the service with no gateways then We must use web and share point connectors.",
    "source": "Final",
    "sourceNumber": 11,
    "legacy": true
  },
  {
    "id": "f1-012-11",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou are profiling data by using Power Query Editor.\n\nYou have a table named Reports that contains a column named State. The distribution and quality data metrics for\n\nthe data in State is shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: 69 -\n69 distinct/different values.\nNote: Column Distribution allows you to get a sense for the overall distribution of values within a column in\nyour data previews, including the count of distinct values (total number of different values found in a given\ncolumn) and unique values (total number of values that only appear once in a given column).\n\nBox 2: 4 -\n\nReference:\nhttps://systemmanagement.ro/2018/10/16/power-bi-data-profiling-distinct-vs-unique/",
    "source": "Final",
    "sourceNumber": 12,
    "legacy": false,
    "image": "/dump-assets/f1-012-11-question.webp",
    "answerImage": "/dump-assets/f1-012-11-answer.webp"
  },
  {
    "id": "f1-013-12",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have two CSV files named Products and Categories.\n\nThe Products file contains the following columns:\n\n✑ ProductID\n\n✑ ProductName\n\n✑ SupplierID\n\n✑ CategoryID\n\nThe Categories file contains the following columns:\n\n✑ CategoryID\n\n✑ CategoryName\n\n✑ CategoryDescription\n\nFrom Power BI Desktop, you import the files into Power Query Editor.\n\nYou need to create a Power BI dataset that will contain a single table named Product. The Product will table\n\nincludes the following columns:\n\n✑ ProductID\n\n✑ ProductName\n\n✑ SupplierID\n\n✑ CategoryID\n\n✑ CategoryName\n\n✑ CategoryDescription\n\nHow should you combine the queries, and what should you do on the Categories query? To answer, select the\n\nappropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Merge -\n\nThere are two primary ways of combining queries: merging and appending.\n\n* When you have one or more columns that you'd like to add to another query, you merge the queries.\n\n* When you have additional rows of data that you'd like to add to an existing query, you append the query.\n\nBox 2: Disable the query load -\n\nManaging loading of queries -\n\nIn many situations, it makes sense to break down your data transformations in multiple queries. One popular\nexample is merging where you merge two queries into one to essentially do a join. In this type of situations,\nsome queries are not relevant to load into Desktop as they are intermediate steps, while they are still required\nfor your data transformations to work correctly. For these queries, you can make sure they are not loaded in\nDesktop by un-checking 'Enable load' in the context menu of the query in Desktop or in the Properties screen:\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/desktop-shape-and-combine-data\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/refresh-include-in-report-refresh",
    "source": "Final",
    "sourceNumber": 13,
    "legacy": true,
    "image": "/dump-assets/f1-013-12-question.webp",
    "answerImage": "/dump-assets/f1-013-12-answer.webp"
  },
  {
    "id": "f1-014-13",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have an Azure SQL database that contains sales transactions. The database is updated frequently.\n\nYou need to generate reports from the data to detect fraudulent transactions. The data must be visible within five\n\nminutes of an update.\n\nHow should you configure the data connection?",
    "choices": [
      "Add a SQL statement.",
      "Set the Command timeout in minutes setting.",
      "Set Data Connectivity mode to Import.",
      "Set Data Connectivity mode to DirectQuery."
    ],
    "correct": [
      3
    ],
    "explanation": "DirectQuery: No data is imported or copied into Power BI Desktop. For relational sources, the selected tables\nand columns appear in the Fields list. For multi- dimensional sources like SAP Business Warehouse, the\ndimensions and measures of the selected cube appear in the Fields list. As you create or interact with a\nvisualization, Power BI Desktop queries the underlying data source, so you're always viewing current data.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/desktop-use-directquery",
    "source": "Final",
    "sourceNumber": 14,
    "legacy": false
  },
  {
    "id": "f1-015-14",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou have a folder that contains 100 CSV files.\n\nYou need to make the file metadata available as a single dataset by using Power BI. The solution must NOT store\n\nthe data of the CSV files.\n\nWhich three actions should you perform in sequence. To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "1. Get data and select folder.\n\n2. Remove the content column\n\n3. Expand the attributes column.\n\nGet Data from the folder:\n\nThis is the first step where you connect to the folder that contains your CSV files. Power BI will recognize all\nthe CSV files in the folder and generate a dataset with both file metadata and content.\n\nRemove Content Column:\n\nAfter you load the data from the folder, Power BI typically presents two columns: Content (which contains the\nactual data of the CSV files) and Attributes (which contains the metadata). In this step, you would remove the\nContent column to ensure you're only working with the metadata (e.g., file names, paths, creation dates).\n\nExpand Attributes:\n\nThe Attributes column contains a record with metadata for each file. To make the metadata more accessible\nand usable in your report, you'll need to expand this column. Expanding will break the record down into\nindividual metadata fields (e.g., file name, file path, etc.), so that you can work with these attributes as\nseparate columns in Power Query.",
    "source": "Final",
    "sourceNumber": 15,
    "legacy": false,
    "image": "/dump-assets/f1-015-14-question.webp",
    "answerImage": "/dump-assets/f1-015-14-answer.webp"
  },
  {
    "id": "f1-016-15",
    "domain": "Model the data",
    "type": "single",
    "prompt": "A business intelligence (BI) developer creates a dataflow in Power BI that uses DirectQuery to access tables from\n\nan on-premises Microsoft SQL server. The\n\nEnhanced Dataflows Compute Engine is turned on for the dataflow.\n\nYou need to use the dataflow in a report. The solution must meet the following requirements:\n\n✑ Minimize online processing operations.\n\n✑ Minimize calculation times and render times for visuals.\n\n✑ Include data from the current year, up to and including the previous day.\n\nWhat should you do?",
    "choices": [
      "Create a dataflows connection that has DirectQuery mode selected.",
      "Create a dataflows connection that has DirectQuery mode selected and configure a gateway connection for the dataset.",
      "Create a dataflows connection that has Import mode selected and schedule a daily refresh.",
      "Create a dataflows connection that has Import mode selected and create a Microsoft Power Automate solution to refresh the data hourly."
    ],
    "correct": [
      2
    ],
    "explanation": "A daily update is adequate.\n\nWhen you set up a refresh schedule, Power BI connects directly to the data sources using connection\ninformation and credentials in the dataset to query for updated data, then loads the updated data into the\ndataset. Any visualizations in reports and dashboards based on that dataset in the Power BI service are also\nupdated.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/refresh-desktop-file-local-drive",
    "source": "Final",
    "sourceNumber": 16,
    "legacy": false
  },
  {
    "id": "f1-017-16",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou publish a dataset that contains data from an on-premises Microsoft SQL Server database.\n\nThe dataset must be refreshed daily.\n\nYou need to ensure that the Power BI service can connect to the database and refresh the dataset.\n\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.",
    "choices": [],
    "correct": [],
    "explanation": "Configure an on premises data gateway.\n\nAdd a data source.\n\nAdd the dataset owner to the data source.\n\nConfigure a scheduled refresh.\n\nSet up an on-premises data gateway: Download and install an on-premises data gateway on a machine that\nhas access to the SQL Server database. Make sure that the gateway is registered to the same workspace as\nthe dataset.\n\nConfigure a data source: In the Power BI service, go to the dataset settings, and select the data source. Then,\nenter the necessary details, including the server name, database name, and credentials.\n\nSchedule refresh: In the dataset settings, go to the \"Scheduled refresh\" tab, and set up a refresh schedule.\nEnsure that the gateway is selected as the \"Data source credentials\" option.\n\nPublish the dataset: Finally, publish the dataset to the Power BI service. The dataset will be refreshed\naccording to the schedule you set up, and the on-premises data gateway will allow the service to connect to\nthe SQL Server database.",
    "source": "Final",
    "sourceNumber": 17,
    "legacy": false,
    "image": "/dump-assets/f1-017-16-question.webp",
    "answerImage": "/dump-assets/f1-017-16-answer.webp"
  },
  {
    "id": "f1-018-17",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You attempt to connect Power BI Desktop to a Cassandra database.\n\nFrom the Get Data connector list, you discover that there is no specific connector for the Cassandra database.\n\nYou need to select an alternate data connector that will connect to the database.\n\nWhich type of connector should you choose?",
    "choices": [
      "Microsoft SQL Server database",
      "ODBC",
      "OLE DB",
      "OData"
    ],
    "correct": [
      1
    ],
    "explanation": "B is Correct because, B´cause it allows you to connect to data sources that aren't identified in the Get Data\nlists.\n\nThe ODBC connector lets you import data from any third-party ODBC driver simply by specifying a Data\nSource Name (DSN) or a connection string. As an option, you can also specify a SQL statement to execute\nagainst the ODBC driver.\n\nList details a few examples of data sources to which Power BI Desktop can connect by using the generic\nODBC interface:\n\nhttps://learn.microsoft.com/en-us/power-bi/connect-data/desktop-connect-using-generic-interfaces",
    "source": "Final",
    "sourceNumber": 18,
    "legacy": false
  },
  {
    "id": "f1-019-18",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou receive annual sales data that must be included in Power BI reports.\n\nFrom Power Query Editor, you connect to the Microsoft Excel source shown in the following exhibit.\n\nYou need to create a report that meets the following requirements:\n\n• Visualizes the Sales value over a period of years and months\n\n• Adds a slicer for the month\n\n• Adds a slicer for the year\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.",
    "choices": [],
    "correct": [],
    "explanation": "Select the Month and Month Number Columns.\n\nSelect Unpivot Other Columns\n\nRename the Attribute Column as Year and the value Column as Sales.\n\nAction 1: Select the Month and MonthNumber Columns. These columns will be used for the slicers to filter the\ndata by month.\n\nAction 2: Select unpivot other columns. This action will transform the 2019, 2020, and 2021 columns into rows,\ncreating a column called \"Attribute\" that contains the years and a column called \"Value\" that contains the\nsales data. This step makes the data more suitable for visualization and filtering by year.\n\nAction 3: Rename the Attribute column as Year and the value column as sales. Renaming the columns\nprovides a more descriptive and meaningful structure for your data.\n\nAfter performing these actions, your data will be in a format that allows you to create visuals and add slicers\nfor the month and year in Power BI.",
    "source": "Final",
    "sourceNumber": 19,
    "legacy": false,
    "image": "/dump-assets/f1-019-18-question.webp",
    "answerImage": "/dump-assets/f1-019-18-answer.webp"
  },
  {
    "id": "f1-020-19",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou are using Power BI Desktop to connect to an Azure SQL database.\n\nThe connection is configured as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct solution is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "10 minutes.\n\nOnly tables that Contain data.\n\nCommand timeout in minutes: If your connection lasts longer than 10 minutes (the default timeout), you can\nenter another value in minutes to keep the connection open longer. This option is only available in Power\nQuery Desktop.\n\nNavigate using full hierarchy: If checked, the navigator displays the complete hierarchy of tables in the\ndatabase you're connecting to. If cleared, the navigator displays only the tables whose columns and rows\ncontain data.\n\nInclude relationship columns: If checked, includes columns that might have relationships to other tables. If\nthis box is cleared, you won’t see those columns.\n\nhttps://learn.microsoft.com/en-us/power-query/connectors/azure-sql-database",
    "source": "Final",
    "sourceNumber": 20,
    "legacy": false,
    "image": "/dump-assets/f1-020-19-question.webp",
    "answerImage": "/dump-assets/f1-020-19-answer.webp"
  },
  {
    "id": "f1-021-20",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have the Azure SQL databases shown in the following table.\n\nYou plan to build a single PBIX file to meet the following requirements:\n\n• Data must be consumed from the database that corresponds to each stage of the development lifecycle.\n\n• Power BI deployment pipelines must NOT be used.\n\n• The solution must minimize administrative effort.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "To meet the requirements specified, we can use a single parameter in the PBIX file that controls which\ndatabase is used for data consumption based on the stage of the development lifecycle.\n\nWe can use a Text parameter type in Power BI to achieve this. The parameter can be used to switch between\nthe different database connections when a user interacts with the report. The text parameter could include\nvalues such as \"Development\", \"Staging\", and \"Production\", which correspond to the different databases\nshown in the table.\n\nThe parameter can then be used in the queries to dynamically filter the data based on the selected stage of\nthe development lifecycle. By using a single parameter, we can minimize administrative effort and ensure that\nthe report works with each stage of the development lifecycle.",
    "source": "Final",
    "sourceNumber": 21,
    "legacy": false,
    "image": "/dump-assets/f1-021-20-question.webp",
    "answerImage": "/dump-assets/f1-021-20-answer.webp"
  },
  {
    "id": "f1-022-21",
    "domain": "Model the data",
    "type": "multi",
    "prompt": "You are creating a query to be used as a Country dimension in a star schema.\n\nA snapshot of the source data is shown in the following table.\n\nYou need to create the dimension. The dimension must contain a list of unique countries.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Delete the Country column.",
      "Remove duplicates from the table.",
      "Remove duplicates from the City column.",
      "Delete the City column.",
      "Remove duplicates from the Country column."
    ],
    "correct": [
      3,
      4
    ],
    "explanation": "We all need the dimension to contain the list of unique countries. so we delete the city column because we\ndon't need it and remove the duplicates from the country column. The correct answer is DE\n\nThe table has to contain unique values for \"Country\" column, so\n\n- delete the city column --> in fact this column is not requested\n\n- Remove duplicates from the Country column",
    "source": "Final",
    "sourceNumber": 22,
    "legacy": false,
    "image": "/exhibit-assets/f1-022-21.webp"
  },
  {
    "id": "f1-023-22",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou use Power Query Editor to preview the data shown in the following exhibit.\n\nYou need to clean and transform the query so that all the rows of data are maintained, and error values in the\n\ndiscount column are replaced with a discount of 0.05. The solution must minimize administrative effort.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.",
    "choices": [],
    "correct": [],
    "explanation": "Select the discount Column\n\nSelect Replace Errors to replace each error value with 0.05\n\nFor the discount column ,Change Data Type to Decimal Number.",
    "source": "Final",
    "sourceNumber": 23,
    "legacy": false,
    "image": "/dump-assets/f1-023-22-question.webp",
    "answerImage": "/dump-assets/f1-023-22-answer.webp"
  },
  {
    "id": "f1-024-23",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou attempt to use Power Query Editor to create a custom column and receive the error message shown in the\n\nfollowing exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "mismatched data types\n\nA1\n\nMismatched data types and A1 are the correct answers.\n\nThe custom column expression is trying to concatenate (use the \"&\" operator) a text value and a number\nvalue, which are mismatched data types.\n\nIn this case, the left side of the operator is a text value (e.g.,\"A\"), and the right side is a number value (e.g.,1).\n\nTo achieve the desired outcome of the custom column as \"A1\", you should ensure that both sides of the \"&\"\noperator have the same data type, which is text in this case.",
    "source": "Final",
    "sourceNumber": 24,
    "legacy": false,
    "image": "/dump-assets/f1-024-23-question.webp",
    "answerImage": "/dump-assets/f1-024-23-answer.webp"
  },
  {
    "id": "f1-025-24",
    "domain": "Prepare the data",
    "type": "multi",
    "prompt": "From Power Query Editor, you attempt to execute a query and receive the following error message.\n\nDatasource.Error: Could not find file.\n\nWhat are two possible causes of the error? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "You do not have permissions to the file.",
      "An incorrect privacy level was used for the data source.",
      "The file is locked.",
      "The referenced file was moved to a new location."
    ],
    "correct": [
      0,
      3
    ],
    "explanation": "A and D. A if PBI cant find the file in the given path and D due this.\n\nhttps://community.fabric.microsoft.com/t5/Power-Query/SOLVED-Datasource-error-could-not-find-file/td-\np/252703",
    "source": "Final",
    "sourceNumber": 25,
    "legacy": false
  },
  {
    "id": "f1-026-25",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have data in a Microsoft Excel worksheet as shown in the following table.\n\nYou need to use Power Query to clean and transform the dataset. The solution must meet the following\n\nrequirements:\n\n•If the discount column returns an error, a discount of 0.05 must be used.\n\n•All the rows of data must be maintained.\n\n•Administrative effort must be minimized.\n\nWhat should you do in Power Query Editor?",
    "choices": [
      "Select Replace Errors.",
      "Edit the query in the Query Errors group.",
      "Select Remove Errors.",
      "Select Keep Errors."
    ],
    "correct": [
      0
    ],
    "explanation": "A. Select Replace Errors - is correct. C&D will remove some rows Option B, \"Edit the query in the Query Errors\n\ngroup\", would technically also allow to achieve the required result. However, this would not be the optimal\nsolution given the constraints provided in the scenario, which specifies that administrative effort must be\nminimized.",
    "source": "Final",
    "sourceNumber": 26,
    "legacy": false,
    "image": "/exhibit-assets/f1-026-25.webp"
  },
  {
    "id": "f1-027-26",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the\n\ndate and time each complaint occurred. The data in Logged is in the following format: 2018-12-31 at 08:59.\n\nYou need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.\n\nWhat should you do?",
    "choices": [
      "Apply the Parse function from the Data transformations options to the Logged column.",
      "Change the data type of the Logged column to Date.",
      "Split the Logged column by using at as the delimiter.",
      "Create a column by example that starts with 2018-12-31."
    ],
    "correct": [
      2
    ],
    "explanation": "Split the Logged column by using at as the delimiter.\n\nYou should split the Logged column by using \"at\" as the delimiter. This will allow you to separate the date and\ntime into separate columns, which will enable you to analyze the complaints by date and use a built-in date\nhierarchy. Alternatively, you could also use a transformation to extract the date and time from the Logged\ncolumn and set the data type of the new columns to Date and Time, respectively. Option A is incorrect\nbecause it only extracts the last 11 characters of the Logged column, which would not include the date. Option\nB is incorrect because the data in the Logged column is in a non-standard date format and cannot be directly\nconverted to the Date data type. Option D is incorrect because it only extracts the first 11 characters of the\nLogged column, which would not include the time.",
    "source": "Final",
    "sourceNumber": 27,
    "legacy": false
  },
  {
    "id": "f1-028-27",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou have two Microsoft Excel workbooks in a Microsoft OneDrive folder.\n\nEach workbook contains a table named Sales. The tables have the same data structure in both workbooks.\n\nYou plan to use Power BI to combine both Sales tables into a single table and create visuals based on the data in\n\nthe table. The solution must ensure that you can publish a separate report and dataset.\n\nWhich storage mode should you use for the report file and the dataset file? To answer, drag the appropriate modes\n\nto the correct files. Each mode may be used once, more than once, or not at all. You may need to drag the split bar\n\nbetween panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Report file: Import.\n\nIn Power BI, when you import data, it means that the data is loaded into the Power BI Desktop file. In this case,\nyou would import the data from both Excel workbooks into your Power BI Desktop report file. This allows you\nto create visuals and reports based on the imported data. Importing the data ensures that you can work with\nthe data even when you're not connected to OneDrive.\n\nDataset: Direct Query.\n\nTo keep the data in OneDrive and maintain a live connection to the source, you should use Direct Query for the\ndataset. Direct Query allows Power BI to retrieve and query data from the original data source (in this case,\nthe Excel workbooks in OneDrive) in real-time without importing it into the dataset. This ensures that your\ndataset is always up-to-date and reflects changes made to the source data.",
    "source": "Final",
    "sourceNumber": 28,
    "legacy": false,
    "image": "/dump-assets/f1-028-27-question.webp",
    "answerImage": "/dump-assets/f1-028-27-answer.webp"
  },
  {
    "id": "f1-029-28",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You use Power Query to import two tables named Order Header and Order Details from an Azure SQL database.\n\nThe Order Header table relates to the Order Details table by using a column named Order ID in each table.\n\nYou need to combine the tables into a single query that contains the unique columns of each table.\n\nWhat should you select in Power Query Editor?",
    "choices": [
      "Merge queries",
      "Combine files",
      "Append queries"
    ],
    "correct": [
      0
    ],
    "explanation": "A. Merge queries.\n\nThe \"Merge queries\" option in Power Query Editor allows you to combine two or more tables by matching rows\nbased on a common column (in this case, the Order ID column). This operation is similar to performing a SQL\nJOIN, where you can include columns from both tables in the resulting combined query",
    "source": "Final",
    "sourceNumber": 29,
    "legacy": false
  },
  {
    "id": "f1-030-29",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the\n\ndate and time each complaint occurred. The data in Logged is in the following format: 2018-12-31 at 08:59.\n\nYou need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.\n\nWhat should you do?",
    "choices": [
      "Apply a transformation to extract the last 11 characters of the Logged column and set the data type of the new column to Date.",
      "Change the data type of the Logged column to Date.",
      "Split the Logged column by using at as the delimiter.",
      "Apply the Parse function from the Date transformations options to the Logged column."
    ],
    "correct": [
      2
    ],
    "explanation": "Split the Logged column by using at as the delimiter.\n\nBy splitting the \"Logged\" column using \"at\" as the delimiter, you separate the date and time into two distinct\ncolumns.\n\nThe first column would contain the date (2018-12-31).\n\nThe second column would contain the time (08:59).\n\nOnce you have the date part isolated, you can change its data type to Date in Power BI.\n\nThis transformation allows you to use the date part for analysis (e.g., creating date hierarchies), as Power BI\nrecognizes it as a valid date data type.\n\nWhy Option C Works Well:\n\nSplitting ensures that you isolate the date portion in a cleaner format that Power BI can understand and\nhandle properly for analysis.\n\nBy setting the date column to a Date data type, you enable the built-in date hierarchy for analyzing\ncomplaints by day, month, quarter, etc.\n\nThe time portion can be discarded or kept for further analysis (e.g., if you wanted to analyze complaints by\ntime of day).\n\nWhy Option D (Parse Function) Isn't Ideal in This Case:\n\nThe Parse function is often useful for converting recognized date/time formats into proper date types.\n\nHowever, since the \"Logged\" column has non-standard text (\"at\") in the middle of the date-time format, the\nParse function might not work as smoothly or effectively compared to splitting the column by the \"at\"\ndelimiter, which directly handles the non-standard format.",
    "source": "Final",
    "sourceNumber": 30,
    "legacy": false
  },
  {
    "id": "f1-031-30",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a folder that contains 50 JSON files.\n\nYou need to use Power BI Desktop to make the metadata of the files available as a single dataset. The solution\n\nmust NOT store the data of the JSON files.\n\nWhich type of data source should you use, and which transformation should you perform? To answer, select the\n\nappropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Data source type: Folder\n\nTransformation: Delete the Content column.\n\nThis approach will allow you to access the metadata for all the JSON files in the folder without importing the\nactual data from the JSON files into the dataset.",
    "source": "Final",
    "sourceNumber": 31,
    "legacy": false,
    "image": "/dump-assets/f1-031-30-question.webp",
    "answerImage": "/dump-assets/f1-031-30-answer.webp"
  },
  {
    "id": "f1-032-31",
    "domain": "Prepare the data",
    "type": "multi",
    "prompt": "You have a PBIX file that imports data from a Microsoft Excel data source stored in a file share on a local network.\n\nYou are notified that the Excel data source was moved to a new location.\n\nYou need to update the PBIX file to use the new location.\n\nWhat are three ways to achieve the goal? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "From the Datasets settings of the Power BI service, configure the data source credentials.",
      "From the Data source settings in Power BI Desktop, configure the file path.",
      "From Current File in Power BI Desktop, configure the Data Load settings.",
      "From Power Query Editor, use the formula bar to configure the file path for the applied step.",
      "From Advanced Editor in Power Query Editor, configure the file path in the M code."
    ],
    "correct": [
      1,
      3,
      4
    ],
    "explanation": "B.From the Data source settings in Power BI Desktop, configure the file path.\n\nD.From Power Query Editor, use the formula bar to configure the file path for the applied step.\n\nE.From Advanced Editor in Power Query Editor, configure the file path in the M code.\n\nWhy the Other Options Are Incorrect:\n\nA. From the Datasets settings of the Power BI service, configure the data source credentials.\n\nThis option is related to managing authentication and credentials to access the data source (e.g., user\npermissions or authentication methods), but it does not handle the file path or location change.\n\nIt’s useful for cloud-based sources, but for local network data sources, the file path needs to be updated\nwithin Power BI Desktop or the Power Query Editor.\n\nC. From Current File in Power BI Desktop, configure the Data Load settings.\n\nThe Current File option in Power BI Desktop allows you to change data load settings, but it does not address\nthe file path for an Excel data source. This setting is more related to options like whether to import or load\ndata from the current file into the model, rather than specifying the path of the Excel file.\n\nSummary:\n\nTo update the file path for the Excel data source after it has been moved:\n\nB, D, and E are the appropriate solutions, as they allow you to configure the new file path within the data\nsource settings, Power Query Editor, or M code.",
    "source": "Final",
    "sourceNumber": 32,
    "legacy": false
  },
  {
    "id": "f1-033-32",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI semantic model that contains the data sources shown in the following table.\n\nYou need to configure the privacy level s of the data sources.\n\nWhat should you configure for each data source? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct answer is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Private.\n\nOrganizational.",
    "source": "Final",
    "sourceNumber": 33,
    "legacy": false,
    "image": "/dump-assets/f1-033-32-question.webp",
    "answerImage": "/dump-assets/f1-033-32-answer.webp"
  },
  {
    "id": "f1-034-33",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You plan to use Power BI Desktop to create a bug tracking dashboard that will pull data from Analytics in Azure\n\nDevOps.\n\nFrom Power BI Desktop, you need to configure a data connector to authenticate to Azure DevOps. The solution\n\nmust meet the following requirements:\n\n•Use Analytics views.\n\n•Filter data from the cloud.\n\nWhich connector should you use?",
    "choices": [
      "OData queries",
      "Azure DevOps (Boards only)",
      "Azure DevOps Server (Boards only)",
      "OData Feed"
    ],
    "correct": [
      1
    ],
    "explanation": "Connector Choice: Azure DevOps (Boards only):\n\nThis connector is designed to connect Power BI Desktop to Azure DevOps Analytics views, which is explicitly\nmentioned in the requirements.\n\nIt allows filtering data directly from the cloud using Analytics views, meeting both key requirements.\n\nKey Requirements Addressed:\n\nUse Analytics views: The Azure DevOps (Boards only) connector directly supports Analytics views in Azure\nDevOps, enabling structured access to work items and tracking data.\n\nFilter data from the cloud: The connector allows filtering and querying data without the need to download or\nprocess large datasets locally.\n\nWhy Other Options Are Incorrect:\n\nA. OData queries:\n\nWhile OData queries can pull data from Azure DevOps, they do not natively support Analytics views, which is a\nspecific requirement in this scenario.\n\nC. Azure DevOps Server (Boards only):\n\nThis connector is intended for on-premises Azure DevOps Server (formerly known as TFS), not for Azure\nDevOps Services in the cloud.\n\nSince the requirement mentions pulling data from the cloud, this is not suitable.\n\nD. OData Feed:\n\nThe OData Feed connector is generic and does not directly integrate with Azure DevOps Analytics views.\n\nIt requires more manual effort to configure queries and lacks built-in optimization for Analytics views.\n\nSummary:\n\nThe Azure DevOps (Boards only) connector is the most appropriate option because it directly supports\nAnalytics views and provides the ability to filter data from the cloud efficiently.",
    "source": "Final",
    "sourceNumber": 34,
    "legacy": false
  },
  {
    "id": "f1-035-34",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou use Power Query Editor to preview the data shown in the following exhibit.\n\nYou confirm that the data will always start on row 3, and row 3 will always contain the column names.\n\nHow should you shape the query? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Remove top rows.\n\nUse First row as headers.\n\nRemove Top Rows: Use the \"Remove Top Rows\" function to eliminate the first two rows, bringing row 3 to the\ntop.\n\nUse First Row as Headers: Apply the \"Use First Row as Headers\" transformation to promote the current top\nrow (originally row 3) to header status.\n\nConclusion:\n\nBy following these steps, you ensure that Power Query correctly interprets the dataset's structure, with\nappropriate headers and data rows, facilitating accurate data analysis in Power BI.",
    "source": "Final",
    "sourceNumber": 35,
    "legacy": false,
    "image": "/dump-assets/f1-035-34-question.webp",
    "answerImage": "/dump-assets/f1-035-34-answer.webp"
  },
  {
    "id": "f1-036-35",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have a data source that contains a column. The column contains case sensitive data.\n\nYou have a Power BI semantic model in DirectQuery mode.\n\nYou connect to the model and discover that it contains undefined values and errors.\n\nYou need to resolve the issue.\n\nSolution: You implicitly convert the values into the required type.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "Correct answer is B:No.\n\nThe issue stems from the case-sensitive data in the column. Undefined values and errors are likely caused by\nmismatched case sensitivity between the data source and Power BI semantic model when working in\nDirectQuery mode.\n\nWhy the Suggested Solution Doesn't Meet the Goal:\n\nImplicit Type Conversion:\n\nThis solution focuses on type conversion but does not address the core issue: case sensitivity.\n\nErrors are not caused by a data type mismatch; they are due to case sensitivity mismatches in the source\ndata, which is unrelated to type conversion.\n\nImplicit type conversion will not resolve errors resulting from case sensitivity.\n\nWhat Should Be Done:\n\nTo resolve the issue, you need to ensure that the case sensitivity is handled properly. The correct approach\nwould involve:\n\nConfiguring the DirectQuery connection to ensure case-insensitive comparisons.\n\nUsing Power Query transformations to standardize the case of the column data (e.g., converting all text to\nlowercase or uppercase).\n\nVerifying the settings in the source system to ensure consistency in case sensitivity.\n\nSummary:\n\nThe proposed solution (implicitly converting values into the required type) does not address the core issue of\ncase sensitivity in the data source.\n\nTherefore, the correct answer is B. No.",
    "source": "Final",
    "sourceNumber": 36,
    "legacy": false
  },
  {
    "id": "f1-037-36",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have a data source that contains a column. The column contains case sensitive data.\n\nYou have a Power BI semantic model in DirectQuery mode.\n\nYou connect to the model and discover that it contains undefined values and errors.\n\nYou need to resolve the issue.\n\nSolution: You change the semantic model mode.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "No is a right answer.\n\nWhy Changing the Semantic Model Mode Doesn't Resolve the Issue:\n\nSwitching the semantic model from DirectQuery to Import or other modes won't inherently resolve case-\nsensitivity problems because:\n\nThe underlying data remains case-sensitive.\n\nUndefined values and errors caused by case mismatches will still persist unless case sensitivity is addressed\nexplicitly.\n\nThe problem is related to data handling rather than the model mode.\n\nWhat Should Be Done:\n\nTo resolve the issue, you should:\n\nNormalize the case of the column values in Power Query (e.g., convert all text to lowercase or uppercase).\n\nEnsure that the case sensitivity settings in the data source align with those in Power BI.\n\nConfigure DirectQuery settings to handle case sensitivity where applicable.\n\nSummary:\n\nChanging the semantic model mode does not solve the issue of case sensitivity in the data. The correct\napproach would involve addressing case sensitivity explicitly in the data source or during the transformation\nprocess.\n\nTherefore, the correct answer is B. No.",
    "source": "Final",
    "sourceNumber": 37,
    "legacy": false
  },
  {
    "id": "f1-038-37",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have a data source that contains a column. The column contains case sensitive data.\n\nYou have a Power BI semantic model in DirectQuery mode.\n\nYou connect to the model and discover that it contains undefined values and errors.\n\nYou need to resolve the issue.\n\nSolution: You normalize casing in the source query or Power Query Editor.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "Correct answer is A:Yes.\n\nThe issue arises because the data source contains case-sensitive data, and the Power BI semantic model in\nDirectQuery mode encounters errors due to mismatches in case sensitivity. Normalizing the casing in the\nsource query or Power Query Editor resolves this issue by ensuring consistency in how data is interpreted.\n\nWhy Normalizing Casing Resolves the Issue:\n\nCase Normalization:\n\nTransforming all text values in the column to either lowercase or uppercase eliminates case sensitivity issues.\n\nPower BI can then correctly match and interpret the data, preventing undefined values and errors.\n\nDirectQuery Mode Compatibility:\n\nBy normalizing the casing in the source query or Power Query Editor, the data sent to the semantic model is\nconsistent, and DirectQuery can function correctly.\n\nHow Normalizing Casing Works:\n\nIn Power Query Editor:\n\nUse transformations like \"Transform > Format > Lowercase\" or \"Uppercase\" on the column containing case-\nsensitive data.\n\nIn the source query (if applicable):\n\nUse SQL functions like LOWER() or UPPER() in the query to ensure consistent case handling at the data\nsource level.\n\nWhy This Meets the Goal:\n\nThe solution directly addresses the root cause: case sensitivity.\n\nIt ensures consistent data comparison, preventing undefined values and errors in the semantic model.\n\nSummary:\n\nNormalizing casing in the source query or Power Query Editor effectively resolves case sensitivity issues in\nthe data, ensuring that Power BI can interpret and process the data correctly. Therefore, the correct answer is\nA. Yes.",
    "source": "Final",
    "sourceNumber": 38,
    "legacy": false
  },
  {
    "id": "f1-039-38",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have a data source that contains a column. The column contains case sensitive data.\n\nYou have a Power BI semantic model in DirectQuery mode.\n\nYou connect to the model and discover that it contains undefined values and errors.\n\nYou need to resolve the issue.\n\nSolution: You add an index key and normalize casing in the data source.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "Correct answer is A:Yes.\n\nThis solution effectively resolves the issue by addressing both the case sensitivity problem and ensuring the\nintegrity of the data model with an index key. Therefore, the correct answer is A. Yes.",
    "source": "Final",
    "sourceNumber": 39,
    "legacy": false
  },
  {
    "id": "f1-040-39",
    "domain": "Prepare the data",
    "type": "multi",
    "prompt": "You have a Microsoft Excel file in a Microsoft OneDrive folder.\n\nThe file must be imported to a Power BI semantic model.\n\nYou need to ensure that the semantic model can be refreshed in PowerBi.com.\n\nWhich two connectors can you use to connect to the file? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Web",
      "Excel Workbook",
      "Folder",
      "Text/CSV",
      "SharePoint folder"
    ],
    "correct": [
      0,
      4
    ],
    "explanation": "A. Web.\n\nE. SharePoint folder.\n\nTo connect to an Excel file stored in OneDrive and ensure it can be refreshed in PowerBI.com, the Web and\nSharePoint folder connectors are the best options. Therefore, the correct answers are A and E.",
    "source": "Final",
    "sourceNumber": 40,
    "legacy": false
  },
  {
    "id": "f1-041-40",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You use Power Query Editor to preview a column named Date as shown in the following exhibit.\n\nYou need to change the Date column to contain only the year. The solution must minimize administrative effort.\n\nWhat should you do?",
    "choices": [
      "Split the column by delimiter.",
      "Split the column by number of characters.",
      "Extract the text after the delimiter.",
      "Transform the column to contain only the year."
    ],
    "correct": [
      3
    ],
    "explanation": "Transform the column to contain only the year.\n\nMinimal Administrative Effort:\n\nBy adding a new column, you preserve the original Date column while introducing a new column that contains\njust the year. This way, no data is lost, and the transformation is straightforward.\n\nUsing Power Query:\n\nIn Power Query, you can Add Column > Date > Year, which is an easy and direct way to extract the year from\nthe date. This is typically a minimal-effort approach because it doesn't require complex formulas or additional\nsteps.\n\nPreserving Original Data:\n\nAdding a new column ensures that you retain the original date data, which could be useful for other\ntransformations or analysis.\n\nConclusion:\n\nOption D is correct because it provides a simple way to add a column that contains the year, offering a non-\ninvasive solution while keeping the original data intact. This aligns with the requirement for minimal\nadministrative effort.",
    "source": "Final",
    "sourceNumber": 41,
    "legacy": false,
    "image": "/exhibit-assets/f1-041-40.webp"
  },
  {
    "id": "f1-042-41",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou are designing the data model for a Power BI semantic model.\n\nYou have the following tables in the star schema.\n\nWhich table is the fact table of the star schema, and which column in the Patient table is the surrogate key of the\n\nstar schema? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Test Result.\n\nPatient key.\n\nThe correct answers, based on the configuration, are:\n\nFact Table: Test Result\n\nContains the core transactional or measurable data (e.g., test scores, results, dates).\n\nSurrogate Key: PatientKey\n\nLinks each test record in the fact table to the corresponding patient in the Patient dimension table.",
    "source": "Final",
    "sourceNumber": 42,
    "legacy": false,
    "image": "/dump-assets/f1-042-41-question.webp",
    "answerImage": "/dump-assets/f1-042-41-answer.webp"
  },
  {
    "id": "f1-043-42",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You use Power BI Desktop to import two tables named Customer and Contacts.\n\nThe Customer table contains the following columns:\n\n•Customer_Name\n\n•Customer ID\n\n•Website\n\nThe Contacts table contains the following columns:\n\n•Contact ID\n\n•Contact Email\n\n•Contact Name\n\n•Customer Name\n\nA web-based contact form is used to fill the Contacts table. The data is not sanitized.\n\nYou need to create a merge for the Customer and Contacts tables.\n\nWhat should you do?",
    "choices": [
      "Disable fuzzy matching.",
      "Enable fuzzy matching.",
      "Set Join Kind to Left Outer."
    ],
    "correct": [
      1
    ],
    "explanation": "enabling fuzzy matching (Option B), Power BI can perform a join that allows for slight variations and\ndiscrepancies in the \"Customer Name\" field between the two tables, effectively handling imperfect data.\nFuzzy matching helps ensure that even non-exact matches are found and merged correctly, improving the\naccuracy of your merged dataset.\n\nDisabling fuzzy matching would only allow exact matches, which may result in incomplete or inaccurate\nmerges due to the unsanitized data. Setting the Join Kind to Left Outer doesn't address the issue of data\ninconsistencies and would still require exact matches unless fuzzy matching is enabled.",
    "source": "Final",
    "sourceNumber": 43,
    "legacy": false
  },
  {
    "id": "f1-044-43",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou are using Microsoft Power BI Desktop to profile data in Power Query Editor.\n\nTable data is displayed as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "1. Before you can transform the date column to show only the day, you must:\n\nChange the data type.\n\nTo extract only the day from a date column, you typically need to ensure that the column is in a date or\ndatetime data type. If the column is not already in a date format, you will need to change its data type to a\ndate or datetime format before performing any date-specific transformations.\n\n2. To fix the error displayed for the data entries, menu Amount column, you must:\n\nChange the data type.\n\nIf the menu Amount column contains errors, it might be due to an incorrect data type. For example, if the\ncolumn is supposed to contain numeric values but is set as text, you would need to change the data type to\nnumeric (e.g., integer or decimal) to resolve the errors.",
    "source": "Final",
    "sourceNumber": 44,
    "legacy": false,
    "image": "/dump-assets/f1-044-43-question.webp",
    "answerImage": "/dump-assets/f1-044-43-answer.webp"
  },
  {
    "id": "f1-045-44",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI semantic model named Model1 that contains a table named Sales.\n\nSales contains 10 million records and the following data.\n\nThe related report displays the weekly sales per region.\n\nYou need to minimize the size of Model1.\n\nHow should you modify the CustomerID column and the PurchaseDateTime column? To answer, select the\n\nappropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Customer ID : Remove the column.\n\nThe CustomerID field is typically a unique identifier for customers in a dataset.\n\nRemoving this column suggests that the CustomerID is not necessary for the analysis being performed.\n\nThis might be applicable in cases where the dataset is being anonymized, or if the column does not contribute\nto the required insights.\n\nPurchaseDateTime :Split the column into separate date and time columns.\n\nThe PurchaseDateTime field likely contains a timestamp, which includes both date and time information.\n\nSplitting it into separate date and time columns makes it easier to analyze trends based on dates (e.g., daily\nsales) or time (e.g., peak purchasing hours).\n\nThis transformation is commonly performed in data preprocessing to facilitate time-based analysis.",
    "source": "Final",
    "sourceNumber": 45,
    "legacy": false,
    "image": "/dump-assets/f1-045-44-question.webp",
    "answerImage": "/dump-assets/f1-045-44-answer.webp"
  },
  {
    "id": "f1-046-45",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a Microsoft Power BI Desktop report named Report1 that uses an Azure SQL database as a data source.\n\nA user named User1 plans to create a report by using the same data source as Report1.\n\nYou need to simplify the connection to the data source for User1.\n\nWhich type of file should you create?",
    "choices": [
      "PBIDS",
      "XLSX",
      "PBIT",
      "PBIX"
    ],
    "correct": [
      0
    ],
    "explanation": "A. PBIDS.\n\nA .pbids (Power BI data source) file is specifically designed to simplify connections to a data source. If the\nuser double-clicks the .pbids file, Power BI Desktop opens and automatically connects them to the specified\ndata source—making it easy for someone else (User1) to reuse the same Azure SQL connection as in Report1.",
    "source": "Final",
    "sourceNumber": 46,
    "legacy": false
  },
  {
    "id": "f1-047-46",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI semantic model.\n\nYou discover that the semantic model contains values that display as errors.\n\nYou need to use data profiling features in Power Query to preview the data and identify the issues.\n\nWhat should you select to gain insight into the number of errors in the model, and what should you select to\n\nresolve the errors? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct answer is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "1. To gain insight, Select: Column quality.\n\nColumn quality provides useful information about valid, error, and empty values in a column.\n\nThis helps assess the data's reliability and cleanliness before analysis.\n\nIt is particularly useful when dealing with datasets that may have missing or incorrect values.\n\n2. To resolve the errors, Select: Remove Empty.\n\nRemove Empty helps eliminate blank or missing values from the dataset.\n\nEmpty values can cause issues in data analysis, affecting calculations and visualizations.\n\nRemoving empty values ensures cleaner and more accurate data.",
    "source": "Final",
    "sourceNumber": 47,
    "legacy": false,
    "image": "/dump-assets/f1-047-46-question.webp",
    "answerImage": "/dump-assets/f1-047-46-answer.webp"
  },
  {
    "id": "f1-048-47",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You plan to create a Power BI semantic model named Model1 that will contain data from an Azure SQL database\n\nnamed DB1.\n\nModel1 must show updated data within two minutes of the data being updated in DB1.\n\nYou need to select a connectivity mode for the connection to DB1.\n\nWhat should you choose?",
    "choices": [
      "DirectQuery",
      "live connection",
      "import"
    ],
    "correct": [
      0
    ],
    "explanation": "A. Direct Query.\n\nDirect Query Mode – Queries are sent to the data source in real-time without importing data.\n\nDirectQuery mode ensures that Power BI always retrieves the latest data directly from DB1 every time a user\ninteracts with a report.",
    "source": "Final",
    "sourceNumber": 48,
    "legacy": false
  },
  {
    "id": "f1-049-48",
    "domain": "Prepare the data",
    "type": "multi",
    "prompt": "You need to create a semantic model in Power BI Desktop. The solution must meet the following requirements:\n\n•The model must contain a table named Orders that has one row per order. Each row will contain the total amount\n\nper order.\n\n•The orders must be filtered to the selected CustomerID value.\n\n•Users must select the CustomerID value from a list.\n\n•The list of customers must come from an OData source.\n\nWhich three objects should you create in Power Query Editor? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "an Orders query that has a filter on CustomerID",
      "a Customers query that has a filter on CustomerID",
      "an Orders query that has a single column containing a list of customers",
      "a Customers query that has a single column containing a list of customer IDs",
      "a parameter for CustomerID that uses a query to populate the suggested values",
      "a parameter for CustomerID that uses manually entered values to populate the suggested values"
    ],
    "correct": [
      0,
      3,
      4
    ],
    "explanation": "A. An Orders query that has a filter on CustomerID: This query will fetch the orders and apply a filter based on\nthe selected CustomerID to ensure the orders are filtered to the selected CustomerID value.\n\nD. A Customers query that has a single column containing a list of customer IDs: This query will fetch the list\nof customers from the OData source and provide a list of customer IDs that users can select from.\n\nE. A parameter for CustomerID that uses a query to populate the suggested values: This parameter will be\nused to dynamically filter the Orders query based on the selected CustomerID value. It will use the Customers\nquery to populate the suggested values for the CustomerID parameter.",
    "source": "Final",
    "sourceNumber": 49,
    "legacy": false,
    "image": "/exhibit-assets/f1-049-48.webp"
  },
  {
    "id": "f1-050-49",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You use Power BI Desktop to create a report named RPT1 that loads data from a Microsoft Excel file named File1.\n\nFile1 is located in a network share.\n\nFile1 is moved to a different folder.\n\nWhen you open RPT1 in Power BI Desktop, you discover that the report displays outdated data.\n\nYou need to ensure that the data in File1 refreshes properly.\n\nWhat should you do?",
    "choices": [
      "Change the data source.",
      "Clear the permissions of File1.",
      "Export a PBIDS file.",
      "Modify the permissions for File1."
    ],
    "correct": [
      0
    ],
    "explanation": "A. Change the data source.\n\nSince File1 has been moved to a different folder, the path to the file has changed. Power BI Desktop relies on\nstatic file paths to locate data sources like Excel, CSV, or text files. When the original file is no longer in the\nexpected location, Power BI cannot find it during refresh, and it may use cached/outdated data.",
    "source": "Final",
    "sourceNumber": 50,
    "legacy": false
  },
  {
    "id": "f1-051-50",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a query that contains customer data in Power Query Editor as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Customer Name.\n\nExtract the last 12 characters.\n\nCustomer Name because it has a greater number of distinct vs unique values in the column. This implies that\nthere are repeating values in it. -Second statement requires 10 digits in the phone number. If choose \"extract\nthe text after the \")\" delimiter\", it will leave a leading whitespace for certain rows since there is a space after\nthe \")\" in certain rows and this counts as a digit which would make it 11 digits which does NOT meet the\nrequirement.BUT, if we use the other option \"Extract the last 12 characters\", then it will NOT include the\nleading whitespace and correctly satisfy the 10 digit requirement as well as not including whitespace which\ncan throw off calculations, sort orders, etc.",
    "source": "Final",
    "sourceNumber": 51,
    "legacy": false,
    "image": "/dump-assets/f1-051-50-question.webp",
    "answerImage": "/dump-assets/f1-051-50-answer.webp"
  },
  {
    "id": "f1-052-51",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI report named Report that contains the following tables.\n\nFor the last three days, refresh in Power BI has failed, and you receive the following error message: “You have\n\nreached the maximum allowable memory allocation for your tier. Consider upgrading to a tier with more available\n\nmemory.”\n\nYou need to resolve the error and ensure that query response times are minimized for end users.\n\nWhat should you do?",
    "choices": [
      "Merge the Sales person and invoice tables based on the SalesPersonId column.",
      "Change the invoice table to a DirectQuery table and read the data live from the source, retaining only the dimension tables as import tables.",
      "Reduce the size of the invoice table by summarizing sales by Product, Sales person, Calendar, and Customer.",
      "Change the invoice table to a composite table that contains historical data as a DirectQuery table and hot data as an import table, and then partition the table."
    ],
    "correct": [
      3
    ],
    "explanation": "D. Change the invoice table to a composite table that contains historical data as a DirectQuery table and hot\ndata as an import table, and then partition the table.\n\nCombines Import (fast performance) with DirectQuery (real-time, but slower).\n\nHot data (recent, frequently queried) is kept in Import mode for performance.\n\nHistorical data (older, less frequently queried) is kept in DirectQuery to reduce memory usage.",
    "source": "Final",
    "sourceNumber": 52,
    "legacy": false,
    "image": "/exhibit-assets/f1-052-51.webp"
  },
  {
    "id": "f1-053-52",
    "domain": "Prepare the data",
    "type": "multi",
    "prompt": "You have a table named DIMCountries that contains a column named Country as shown in the following table.\n\nYou plan to use DIMCountries as a dimension in a report.\n\nYou need to ensure that the Country column in DIMCountries lists each country only once.\n\nWhich two actions should you perform on the Country column? Each correct answer presents part of the solution.\n\nNOTE: Each correct answer is worth one point.",
    "choices": [
      "Change Data category to Country.",
      "Remove duplicate values.",
      "Apply a clean transform.",
      "Replace the empty fields.",
      "Apply a Capitalize Each Word transform."
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "B. Remove duplicate valuesThis will ensure each country appears only once by removing duplicate rows in the\nCountry column.\n\nD. Replace the empty fieldsThis ensures that there are no blank or null values in the Country column, which\n\nmight otherwise appear as missing or extra entries.",
    "source": "Final",
    "sourceNumber": 53,
    "legacy": false,
    "image": "/exhibit-assets/f1-053-52.webp"
  },
  {
    "id": "f1-054-53",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou plan to use Power Query Editor to get data from an API.\n\nThe API returns a JSON response.\n\nYou have a username and password for the API.\n\nWhich data source and authentication method should you use to connect to the API? To answer, select the\n\nappropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Data source: Web\n\nPower Query uses the Web connector to fetch data from APIs (which typically return JSON or XML).\n\nAuthentication: Basic.\n\nSince you have a username and password, the most common authentication for APIs that require these is\nBasic Authentication (username and password sent encoded in the HTTP header).If the API uses some other\nauth method (like OAuth), that would differ, but given username/password, Basic Auth is the standard.",
    "source": "Final",
    "sourceNumber": 54,
    "legacy": false,
    "image": "/dump-assets/f1-054-53-question.webp",
    "answerImage": "/dump-assets/f1-054-53-answer.webp"
  },
  {
    "id": "f1-055-54",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You are creating a report in Power BI Desktop.\n\nYou load a data extract that includes a free text field named coll.\n\nYou need to analyze the frequency distribution of the string lengths in col1. The solution must not affect the size of\n\nthe model.\n\nWhat should you do?",
    "choices": [
      "In the report, add a DAX calculated column that calculates the length of col1",
      "In the report, add a DAX function that calculates the average length of col1",
      "From Power Query Editor, add a column that calculates the length of col1",
      "From Power Query Editor, change the distribution for the Column profile to group by length for col1"
    ],
    "correct": [
      3
    ],
    "explanation": "A will affect the size of the model as would C.\n\nB doesn't give you enough information about the distribution (just the average)\n\nD is the right answer.\n\n1. Power Query Editor -> View -> Enable Column Profile\n\n2. Select three dots (top left corner) in the profile pane appear at the bottom of the Query Editor window.\n\n3. Group By -> Text length\n\nUsing Column Profiling in Power Query Editor allows you to analyze the frequency distribution of string\nlengths in col1 without adding new columns or increasing the size of the model. This meets the requirements\nefficiently, as the analysis is performed in-memory and not persisted in the model.",
    "source": "Final",
    "sourceNumber": 55,
    "legacy": false
  },
  {
    "id": "f1-056-55",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a collection of reports for the HR department of your company. The datasets use row-level security\n\n(RLS). The company has multiple sales regions.\n\nEach sales region has an HR manager.\n\nYou need to ensure that the HR managers can interact with the data from their region only. The HR managers must\n\nbe prevented from changing the layout of the reports.\n\nHow should you provision access to the reports for the HR managers?",
    "choices": [
      "Publish the reports in an app and grant the HR managers access permission.",
      "Create a new workspace, copy the datasets and reports, and add the HR managers as members of the workspace.",
      "Publish the reports to a different workspace other than the one hosting the datasets.",
      "Add the HR managers as members of the existing workspace that hosts the reports and the datasets."
    ],
    "correct": [
      0
    ],
    "explanation": "correct ans looks as A since an app would prevent to change the layout\n\nIn the Power BI service, members of a workspace have access to datasets in the workspace. RLS doesn't\nrestrict this data access. and RLS is used to restrict access to data not to layout of the report. Members are\nallowed to change the report layout.\n\nReference:\n\nhttps://kunaltripathy.com/2021/10/06/bring-your-power-bi-to-power-apps-portal-part-ii/",
    "source": "Final",
    "sourceNumber": 56,
    "legacy": false
  },
  {
    "id": "f1-057-56",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You need to provide a user with the ability to add members to a workspace. The solution must use the principle of\n\nleast privilege.\n\nWhich role should you assign to the user?",
    "choices": [
      "Viewer",
      "Admin",
      "Contributor",
      "Member"
    ],
    "correct": [
      3
    ],
    "explanation": "Member role allows adding members or other with lower permissions to the workspace.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces",
    "source": "Final",
    "sourceNumber": 57,
    "legacy": false
  },
  {
    "id": "f1-058-57",
    "domain": "Prepare the data",
    "type": "multi",
    "prompt": "You have a Power BI query named Sales that imports the columns shown in the following table.\n\nUsers only use the date part of the Sales_Date field. Only rows with a Status of Finished are used in analysis.\n\nYou need to reduce the load times of the query without affecting the analysis.\n\nWhich two actions achieve this goal? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Remove the rows in which Sales[Status] has a value of Canceled.",
      "Remove Sales[Sales_Date].",
      "Change the data type of Sale[Delivery_Time] to Integer.",
      "Split Sales[Sale_Date] into separate date and time columns.",
      "Remove Sales[Canceled Date]."
    ],
    "correct": [
      0,
      3
    ],
    "explanation": "A: Removing uninteresting rows will increase query performance.\n\nD: Splitting the Sales_Date column will make comparisons on the Sales date faster.\n\nThe Power BI Desktop data model only supports date/time, but they can be formatted as dates or times\nindependently. Date/Time – Represents both a date and time value. Underneath the covers, the Date/Time\n\nvalue is stored as a Decimal Number Type. Since there's a T in the dates column before split, it's saved as a\nsource text value. Splitting converts it to a numeric value. This reduces the size.",
    "source": "Final",
    "sourceNumber": 58,
    "legacy": false,
    "image": "/exhibit-assets/f1-058-57.webp"
  },
  {
    "id": "f1-059-58",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You build a report to analyze customer transactions from a database that contains the tables shown in the\n\nfollowing table.\n\nYou import the tables.\n\nWhich relationship should you use to link the tables?",
    "choices": [
      "one-to-many from Transaction to Customer",
      "one-to-one between Customer and Transaction",
      "many-to-many between Customer and Transaction",
      "one-to-many from Customer to Transaction"
    ],
    "correct": [
      3
    ],
    "explanation": "One on the primary Key side (customer table), many on the foreign key side (Transaction table) of the relation.",
    "source": "Final",
    "sourceNumber": 59,
    "legacy": false,
    "image": "/exhibit-assets/f1-059-58.webp"
  },
  {
    "id": "f1-060-59",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a custom connector that returns ID, From, To, Subject, Body, and Has Attachments for every email sent\n\nduring the past year. More than 10 million records are returned.\n\nYou build a report analyzing the internal networks of employees based on whom they send emails to.\n\nYou need to prevent report recipients from reading the analyzed emails. The solution must minimize the model size.\n\nWhat should you do?",
    "choices": [
      "From Model view, set the Subject and Body columns to Hidden.",
      "Remove the Subject and Body columns during the import.",
      "Implement row-level security (RLS) so that the report recipients can only see results based on the emails they sent."
    ],
    "correct": [
      1
    ],
    "explanation": "\"prevent report recipients from reading the analyzed emails\"\n\nThe Subject and the Body are not needed in the report. Dropping them resolves the security problem and\nminimizes the model.",
    "source": "Final",
    "sourceNumber": 60,
    "legacy": false
  },
  {
    "id": "f1-061-60",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou create a Power BI dataset that contains the table shown in the following exhibit.\n\nYou need to make the table available as an organizational data type in Microsoft Excel.\n\nHow should you configure the properties of the table? To answer, select the appropriate options in the answer\n\narea.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1:Row label: Name\n\nSee: https://www.myonlinetraininghub.com/power-bi-organizational-data-types-in-\n\nexcel#:~:text=Power%20BI%20Organizational%20Data%20Types%20in%20Excel%20allow%20you\n\n%20to,company%2C%20to%20name%20a%20few.\n\nBox 2: ID -\n\nThe Key column field value provides the unique ID for the row. This value enables Excel to link a cell to a\nspecific row in the table.\n\nBox 3: Yes -\n\nIn the Data Types Gallery in Excel, your users can find data from featured tables in your Power BI datasets.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/collaborate-share/service-create-excel-featured-tables",
    "source": "Final",
    "sourceNumber": 61,
    "legacy": true,
    "image": "/dump-assets/f1-061-60-question.webp",
    "answerImage": "/dump-assets/f1-061-60-answer.webp"
  },
  {
    "id": "f1-062-61",
    "domain": "Model the data",
    "type": "multi",
    "prompt": "You have the Power BI model shown in the following exhibit.\n\nA manager can represent only a single country.\n\nYou need to use row-level security (RLS) to meet the following requirements:\n\n✑ The managers must only see the data of their respective country.\n\n✑ The number of RLS roles must be minimized.\n\nWhich two actions should you perform? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Create a single role that filters Country[Manager_Email] by using the USERNAME DAX function.",
      "Create a single role that filters Country[Manager_Email] by using the USEROBJECTID DAX function.",
      "For the relationship between Purchase Detail and Purchase, select Apply security filter in both directions.",
      "Create one role for each country.",
      "For the relationship between Purchase and Purchase Detail, change the Cross filter direction to Single."
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "A: You can take advantage of the DAX functions username() or userprincipalname() within your dataset. You\ncan use them within expressions in Power BI\n\nDesktop. When you publish your model, it will be used within the Power BI service.\n\nNote: To define security roles, follow these steps.\n\nImport data into your Power BI Desktop report, or configure a DirectQuery connection.\n\n1. From the Modeling tab, select Manage Roles.\n\n2. From the Manage roles window, select Create.\n\n3. Under Roles, provide a name for the role.\n\n4. Under Tables, select the table to which you want to apply a DAX rule.\n\n5. In the Table filter DAX expression box, enter the DAX expressions. This expression returns a value of true or\nfalse. For example: [Entity ID] = Value.\n\n6. After you've created the DAX expression, select the checkmark above the expression box to validate the\nexpression.\n\nNote: You can use username() within this expression.\n\n7. Select Save.\n\nC: By default, row-level security filtering uses single-directional filters, whether the relationships are set to\nsingle direction or bi-directional. You can manually enable bi-directional cross-filtering with row-level security\nby selecting the relationship and checking the Apply security filter in both directions checkbox. Select this\noption when you've also implemented dynamic row-level security at the server level, where row-level security\nis based on username or login ID.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/enterprise/service-admin-rls",
    "source": "Final",
    "sourceNumber": 62,
    "legacy": false,
    "image": "/exhibit-assets/f1-062-61.webp"
  },
  {
    "id": "f1-063-62",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have a Power BI imported dataset that contains the data model shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: cross filter direction -\n\nAs the answer correctly states \"Assume Referential Integrity\" only works for direct query connections.\n\nBox 2: Star schema -\n\nStar schema is a mature modeling approach widely adopted by relational data warehouses. It requires\nmodelers to classify their model tables as either dimension or fact.\n\nGenerally, dimension tables contain a relatively small number of rows. Fact tables, on the other hand, can\ncontain a very large number of rows and continue to grow over time.\n\nExample:\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/desktop-assume-referential-integrity\nhttps://docs.microsoft.com/en-us/power-bi/guidance/star-schema",
    "source": "Final",
    "sourceNumber": 63,
    "legacy": false,
    "image": "/dump-assets/f1-063-62-question.webp",
    "answerImage": "/dump-assets/f1-063-62-answer.webp"
  },
  {
    "id": "f1-064-63",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have a Power BI model that contains a table named Sales and a related date table. Sales contains a measure\n\nnamed Total Sales.\n\nYou need to create a measure that calculates the total sales from the equivalent month of the previous year.\n\nHow should you complete the calculation? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "CALCULATE\n\nSAMEPERIODLASTYEAR\n\n'DATE'[DATE]\n\nBox 1: CALCULATE -\n\nBox 2: SAMEPERIODLASTYEAR\n\naccepts a data column, Month will usually be either text (Jan) or Integer (1). so: CALCULATE([Total Sales],\nSAMEPERIODLASTYEAR('Date'[Date]))\n\nBox 3: 'DATE' [DATE]\n\nReference:\n\nhttps://docs.microsoft.com/en-us/dax/parallelperiod-function-dax https://docs.microsoft.com/en-\nus/dax/sameperiodlastyear-function-dax",
    "source": "Final",
    "sourceNumber": 64,
    "legacy": false,
    "image": "/dump-assets/f1-064-63-question.webp",
    "answerImage": "/dump-assets/f1-064-63-answer.webp"
  },
  {
    "id": "f1-065-64",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou plan to create a report that will display sales data from the last year for multiple regions.\n\nYou need to restrict access to individual rows of the data on a per region-basis by using roles.\n\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "With respect, you can not assign users to a role until AFTER the report has been published to the Power BI\nService. Those posting that you create the role and then assign users to the role BEFORE publishing are\nincorrect. Roles are created in Power BI Desktop. Desktop does not have any way to assign users to the roles.\nThey are empty when created. Role assignment happens in the service.\n\nPublish the report to the Power BI service. Go to your Workspace, using the Dataset, select the More Options\nmenu(...) and click Security. This is where the Roles are populated.\n\n1) Import your data into Power BI Desktop\n\n2) Create the role definition (on the Modeling tab)\n\n3) Publish the report to the Power BI service\n\n4) Assign users to the role",
    "source": "Final",
    "sourceNumber": 65,
    "legacy": false,
    "image": "/dump-assets/f1-065-64-question.webp",
    "answerImage": "/dump-assets/f1-065-64-answer.webp"
  },
  {
    "id": "f1-066-65",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou create a data model in Power BI.\n\nReport developers and users provide feedback that the data model is too complex.\n\nThe model contains the following tables.\n\nThe model has the following relationships:\n\n✑ There is a one-to-one relationship between Sales_Region and Region_Manager.\n\n✑ There are more records in Manager than in Region_Manager, but every record in Region_Manager has a\n\ncorresponding record in Manager.\n\n✑ There are more records in Sales_Manager than in Sales_Region, but every record in Sales_Region has a\n\ncorresponding record in Sales_Manager.\n\nYou need to denormalize the model into a single table. Only managers who are associated to a sales region must\n\nbe included in the reports.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.\n\nNOTE: More than one order of answer choices is correct. You will receive credit for any of the correct orders you\n\nselect.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "1.Merge [Region_Manager] and [Manager] by using an inner join.\n\n3.Merge [Sales_Region] and [Sales_Manager] by using an inner join.\n\n6.Merge [Sales_Region] and [Region_Manager] by using an inner join.",
    "source": "Final",
    "sourceNumber": 66,
    "legacy": false,
    "image": "/dump-assets/f1-066-65-question.webp",
    "answerImage": "/dump-assets/f1-066-65-answer.webp"
  },
  {
    "id": "f1-067-66",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Microsoft Power BI report. The size of PBIX file is 550 MB. The report is accessed by using an App\n\nworkspace in shared capacity of powerbi.com.\n\nThe report uses an imported dataset that contains one fact table. The fact table contains 12 million rows. The\n\ndataset is scheduled to refresh twice a day at 08:00 and 17:00.\n\nThe report is a single page that contains 15 AppSource visuals and 10 default visuals.\n\nUsers say that the report is slow to load the visuals when they access and interact with the report.\n\nYou need to recommend a solution to improve the performance of the report.\n\nWhat should you recommend?",
    "choices": [
      "Change any DAX measures to use iterator functions.",
      "Enable visual interactions.",
      "Replace the default visuals with AppSource visuals.",
      "Split the visuals onto multiple pages."
    ],
    "correct": [
      3
    ],
    "explanation": "One page with many visuals may also make your report loading slow. Please appropriately reduce the number\nof visualizations on one page.\n\nReference:\nhttps://community.powerbi.com/t5/Desktop/Visuals-are-loading-extremely-slow/td-p/1565668",
    "source": "Final",
    "sourceNumber": 67,
    "legacy": false
  },
  {
    "id": "f1-068-67",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou are creating a Microsoft Power BI imported data model to perform basket analysis. The goal of the analysis is\n\nto identify which products are usually bought together in the same transaction across and within sales territories.\n\nYou import a fact table named Sales as shown in the exhibit. (Click the Exhibit tab.)\n\nThe related dimension tables are imported into the model.\n\nSales contains the data shown in the following table.\n\nYou are evaluating how to optimize the model.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Yes -\nThose two columns not need in the analysis.\n\nBox 2: No -\nCan remove the surrogate key OrderDateKey from the analysis.\n\nBox 3: No -\nTax charged not relevant for the analysis.",
    "source": "Final",
    "sourceNumber": 68,
    "legacy": false,
    "image": "/dump-assets/f1-068-67-question.webp",
    "answerImage": "/dump-assets/f1-068-67-answer.webp"
  },
  {
    "id": "f1-069-68",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a Microsoft Power BI data model that contains three tables named Orders, Date, and City. There is a one-\n\nto-many relationship between Date and\n\nOrders and between City and Orders.\n\nThe model contains two row-level security (RLS) roles named Role1 and Role2. Role1 contains the following filter.\n\nCity[State Province] = \"Kentucky\"\n\nRole2 contains the following filter.\n\nDate[Calendar Year] = 2020 -\n\nIf a user is a member of both Role1 and Role2, what data will they see in a report that uses the model?",
    "choices": [
      "The user will see data for which the State Province value is Kentucky or where the Calendar Year is 2020.",
      "The user will receive an error and will not be able to see the data in the report.",
      "The user will only see data for which the State Province value is Kentucky.",
      "The user will only see data for which the State Province value is Kentucky and the Calendar Year is 2020."
    ],
    "correct": [
      0
    ],
    "explanation": "A, from the Microsoft documentation (https://docs.microsoft.com/en-us/power-bi/guidance/rls-guidance):\n\n\"When a report user is assigned to multiple roles, RLS filters become additive. It means report users can see\ntable rows that represent the union of those filters.\"\n\nThis means that you would see all data where either Role1 OR Role2 applies, so the answer is A not D.\n\nExample from MS Learn linked below:\n\nhttps://learn.microsoft.com/en-us/power-bi/guidance/rls-guidance\n\n\"Consider a model with two roles: The first role, named Workers, restricts access to all Payroll table rows by\nusing the following rule expression:\n\nDAX:\n\nFALSE()\n\nA rule will return no table rows when its expression evaluates to false.\n\nYet, a second role, named Managers, allows access to all Payroll table rows by using the following rule\nexpression:\n\nDAX:\n\nTRUE()\n\nTake care: Should a report user map to both roles, they'll see all Payroll table rows.\"\n\nIt seems to be indeed A in that scenario. User will see the data from the first as well as the second filter, it is\nFILTER A OR FILTER B (not FILTER A AND FILTER B)",
    "source": "Final",
    "sourceNumber": 69,
    "legacy": false
  },
  {
    "id": "f1-070-69",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou are modeling data by using Microsoft Power BI. Part of the data model is a large Microsoft SQL Server table\n\nnamed Order that has more than 100 million records.\n\nDuring the development process, you need to import a sample of the data from the Order table.\n\nSolution: From Power Query Editor, you import the table and then add a filter step to the query.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "This would load the entire table in the first step.\nInstead: You add a WHERE clause to the SQL statement.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-query/native-database-query",
    "source": "Final",
    "sourceNumber": 70,
    "legacy": false
  },
  {
    "id": "f1-071-70",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou are modeling data by using Microsoft Power BI. Part of the data model is a large Microsoft SQL Server table\n\nnamed Order that has more than 100 million records.\n\nDuring the development process, you need to import a sample of the data from the Order table.\n\nSolution: You write a DAX expression that uses the FILTER function.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "Instead: You add a WHERE clause to the SQL statement.\n\nNote: DAX is not a language designed to fetch the data like SQL rather than used for data analysis purposes.\nIt is always a better and recommended approach to transform the data as close to the data source itself. For\nexample, your data source is a relational database; then, it's better to go with T-SQL.\n\nSQL is a structured query language, whereas DAX is a formula language used for data analysis purposes.\nWhen our data is stored in some structured database systems like SQL server management studio, MySQL, or\nothers, we have to use SQL to fetch the stored data.\n\nReference:\n\nhttps://www.learndax.com/dax-vs-sql-when-to-use-dax-over-sql/",
    "source": "Final",
    "sourceNumber": 71,
    "legacy": false
  },
  {
    "id": "f1-072-71",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou are modeling data by using Microsoft Power BI. Part of the data model is a large Microsoft SQL Server table\n\nnamed Order that has more than 100 million records.\n\nDuring the development process, you need to import a sample of the data from the Order table.\n\nSolution: You add a WHERE clause to the SQL statement.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "Power Query enables you to specify your native database query in a text box under Advanced options when\nconnecting to a database. In the example below, you'll import data from a SQL Server database using a native\ndatabase query entered in the SQL statement text box.\n1. Connect to a SQL Server database using Power Query. Select the SQL Server database option in the\nconnector selection.\n2. In the SQL Server database popup window:\n3. Specify the Server and Database where you want to import data from using native database query.\n4. Under Advanced options, select the SQL statement field and paste or enter your native database query,\nthen select OK.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-query/native-database-query",
    "source": "Final",
    "sourceNumber": 72,
    "legacy": false
  },
  {
    "id": "f1-073-72",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou are preparing a financial report in Power BI.\n\nYou connect to the data stored in a Microsoft Excel spreadsheet by using Power Query Editor as shown in the\n\nfollowing exhibit.\n\nYou need to prepare the data to support the following:\n\n✑ Visualizations that include all measures in the data over time\n\n✑ Year-over-year calculations for all the measures\n\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "1. Use first row as header\n\n2. Unpivot all columns other than \"Measure\"\n\n3. Rename \"Attribute\" to \"Year\"\n\n4. Change data type of \"Year\" column to Date\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-query/unpivot-column",
    "source": "Final",
    "sourceNumber": 73,
    "legacy": false,
    "image": "/dump-assets/f1-073-72-question.webp",
    "answerImage": "/dump-assets/f1-073-72-answer.webp"
  },
  {
    "id": "f1-074-73",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou are creating an analytics report that will consume data from the tables shown in the following table.\n\nThere is a relationship between the tables.\n\nThere are no reporting requirements on employee_id and employee_photo.\n\nYou need to optimize the data model.\n\nWhat should you configure for employee_id and employee_photo? To answer, select the appropriate options in the\n\nanswer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Hide -\n\nNeed in the relation, so cannot delete it.\n\nHide: We should hide the \"employee_id\" column if there are no reporting requirements on it. This means it\nwon't be visible in the report, but it will still be available for any potential relationships or calculations with the\nmodel.\n\nBox 2: Delete -\n\nDelete: Since there are no reporting requirements on the \"employee_photo\" column, we should delete it from\nthe data model to reduce unnecessary storage and improve performance. This means that the\n\"employee_photo\" data is not needed for any calculations or relationships within the model.\n\nReference:\n\nhttps://community.powerbi.com/t5/Desktop/How-to-Hide-a-Column-in-power-Bi/m-p/414470",
    "source": "Final",
    "sourceNumber": 74,
    "legacy": false,
    "image": "/dump-assets/f1-074-73-question.webp",
    "answerImage": "/dump-assets/f1-074-73-answer.webp"
  },
  {
    "id": "f1-075-74",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou plan to create Power BI dataset to analyze attendance at a school. Data will come from two separate views\n\nnamed View1 and View2 in an Azure SQL database.\n\nView1 contains the columns shown in the following table.\n\nView2 contains the columns shown in the following table.\n\nThe views can be related based on the Class ID column.\n\nClass ID is the unique identifier for the specified class, period, teacher, and school year. For example, the same\n\nclass can be taught by the same teacher during two different periods, but the class will have a different class ID.\n\nYou need to design a star schema data model by using the data in both views. The solution must facilitate the\n\nfollowing analysis:\n\n✑ The count of classes that occur by period\n\n✑ The count of students in attendance by period by day\n\n✑ The average number of students attending a class each month\n\nIn which table should you include the Teacher First Name and Period Number fields? To answer, select the\n\nappropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Teacher Dimension-\n\nBox 2: Class Dimension-\n\nteacher's dim and class dim because teacher name and period number are static information that are directly\nrelated to the keys (teacher ID and class ID) so they belong in the relevant dimension tables. Since the \"Class\nID is unique for the class, period, teacher and school year\" this information should be included in the class\ndimension table and not repeated for each student's attendance to keep your model as small as possible and\nto avoid mistakes.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/guidance/star-schema",
    "source": "Final",
    "sourceNumber": 75,
    "legacy": true,
    "image": "/dump-assets/f1-075-74-question.webp",
    "answerImage": "/dump-assets/f1-075-74-answer.webp"
  },
  {
    "id": "f1-076-75",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have the Power BI model shown in the following exhibit.\n\nThere are four departments in the Departments table.\n\nYou need to ensure that users can see the data of their respective department only.\n\nWhat should you do?",
    "choices": [
      "Create a slicer that filters Departments based on DepartmentID.",
      "Create a row-level security (RLS) role for each department, and then define the membership of the role.",
      "Create a DepartmentID parameter to filter the Departments table.",
      "To the ConfidentialData table, add a calculated measure that uses the CURRENTGROUP DAX function."
    ],
    "correct": [
      1
    ],
    "explanation": "Row-level security (RLS) with Power BI can be used to restrict data access for given users. Filters restrict data\naccess at the row level, and you can define filters within roles.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/enterprise/service-admin-rls",
    "source": "Final",
    "sourceNumber": 76,
    "legacy": false,
    "image": "/exhibit-assets/f1-076-75.webp"
  },
  {
    "id": "f1-077-76",
    "domain": "Model the data",
    "type": "single",
    "prompt": "In Power BI Desktop, you are building a sales report that contains two tables. Both tables have row-level security\n\n(RLS) configured.\n\nYou need to create a relationship between the tables. The solution must ensure that bidirectional cross-filtering\n\nhonors the RLS settings.\n\nWhat should you do?",
    "choices": [
      "Create an inactive relationship between the tables and select Apply security filter in both directions.",
      "Create an active relationship between the tables and select Apply security filter in both directions.",
      "Create an inactive relationship between the tables and select Assume referential integrity.",
      "Create an active relationship between the tables and select Assume referential integrity."
    ],
    "correct": [
      1
    ],
    "explanation": "By default, row-level security filtering uses single-directional filters, whether the relationships are set to\nsingle direction or bi-directional. You can manually enable bi-directional cross-filtering with row-level security\nby selecting the relationship and checking the Apply security filter in both directions checkbox. Select this\noption when you've also implemented dynamic row-level security at the server level, where row-level security\nis based on username or login ID.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/enterprise/service-admin-rls",
    "source": "Final",
    "sourceNumber": 77,
    "legacy": false
  },
  {
    "id": "f1-078-77",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have a column named UnitsInStock as shown in the following exhibit.\n\nUnitsInStock has 75 non-null values, of which 51 are unique.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: 75 rows -\n\nIs nullable allows NULL values in the column.\n\nBox 2: reduce -\n\nWe're not dealing with a matric here, we're dealing with a simple table. In simple tables values that occur\nmore than once won't be shown in the rows multiple times. Since you're they tell you you have 51 unique\nvalues (and the other ones aren't null values) you can be sure it's more than 51. Since you'll already have 51\nrows of unique values.\n\nSo the first is answer is 75.\n\nFurthermore, when you add another table, change the sign to summarize, you will add up all the values of the\n51 unique values and all the rest. Which means you will get one single row, displaying the sum of all these\nvalues.\n\nTherefore, the second answer is reduce.\n\nReference:\n\nhttps://blog.crossjoin.co.uk/2019/01/20/is-nullable-column-property-power-bi/",
    "source": "Final",
    "sourceNumber": 78,
    "legacy": false,
    "image": "/dump-assets/f1-078-77-question.webp",
    "answerImage": "/dump-assets/f1-078-77-answer.webp"
  },
  {
    "id": "f1-079-78",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have a Power BI report.\n\nYou have the following tables.\n\nYou have the following DAX measure.\n\nAccounts :=\n\nCALCULATE (\n\nDISTINCTCOUNT (Balances[AccountID]),\n\nLASTDATE ('Date'[Date])\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: No -\nIt will show the total number of accounts that were live at the last day of the year only.\nNote:\nDISTINCTCOUNT counts the number of distinct values in a column.\nLASTDATE returns the last date in the current context for the specified column of dates.\n\nBox 2: No -\nIt will show the total number of accounts that were live at the last day of the month only.\n\nBox 3: Yes -\n\nReference:\nhttps://docs.microsoft.com/en-us/dax/distinctcount-function-dax https://docs.microsoft.com/en-\nus/dax/lastdate-function-dax",
    "source": "Final",
    "sourceNumber": 79,
    "legacy": false,
    "image": "/dump-assets/f1-079-78-question.webp",
    "answerImage": "/dump-assets/f1-079-78-answer.webp"
  },
  {
    "id": "f1-080-79",
    "domain": "Model the data",
    "type": "multi",
    "prompt": "You have the tables shown in the following table.\n\nThe Impressions table contains approximately 30 million records per month.\n\nYou need to create an ad analytics system to meet the following requirements:\n\n✑ Present ad impression counts for the day, campaign, and site_name. The analytics for the last year are required.\n\nMinimize the data model size.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Create one-to-many relationships between the tables.",
      "Group the Impressions query in Power Query by Ad_id, Site_name, and Impression_date. Aggregate by using the CountRows function.",
      "Create a calculated table that contains Ad_id, Site_name, and Impression_date.",
      "Create a calculated measure that aggregates by using the COUNTROWS function."
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "Incorrect:\n\nNot C: A calculated table would increase the data model size.\n\nNot D: Need Impression_date etc.\n\nGrouping in power query reduces the number of rows in the impression table that is gonna be loaded in the\nmodel. Creating relationships doesn't increase the size of the model. Therefore, the answer AB is correct!\n\nCreating one-to-many relationships = optimizing the model. => A is correct.\n\nGroup the Impressions query in Power Query = pre-summarizing the data which results in a smaller and more\nefficient data model => B is correct.",
    "source": "Final",
    "sourceNumber": 80,
    "legacy": false,
    "image": "/exhibit-assets/f1-080-79.webp"
  },
  {
    "id": "f1-081-80",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou are creating a Microsoft Power BI data model that has the tables shown in the following table.\n\nThe Products table is related to the ProductCategory table through the ProductCategoryID column. Each product\n\nhas one product category.\n\nYou need to ensure that you can analyze sales by product category.\n\nHow should you configure the relationship from ProductCategory to Products? To answer, select the appropriate\n\noptions in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "One-to-many because several products have the same product category. Single because the performance is\n\nmuch better and the assignment states only that you need to be able to analyze sales by product category.\n\nBox 1: One-to-many -\n\nThe one-to-many and many-to-one cardinality options are essentially the same, and they're also the most\ncommon cardinality types.\n\nIncorrect: A many-to-many relationship means both columns can contain duplicate values. This cardinality\ntype is infrequently used. It's typically useful when designing complex model requirements. You can use it to\nrelate many-to-many facts or to relate higher grain facts. For example, when sales target facts are stored at\nproduct category level and the product dimension table is stored at product level.\n\nBox 2: Single -\n\nIncorrect:\n\nBear in mind that bi-directional relationships can impact negatively on performance. Further, attempting to\nconfigure a bi-directional relationship could result in ambiguous filter propagation paths. In this case, Power\nBI Desktop may fail to commit the relationship change and will alert you with an error message.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand",
    "source": "Final",
    "sourceNumber": 81,
    "legacy": false,
    "image": "/dump-assets/f1-081-80-question.webp",
    "answerImage": "/dump-assets/f1-081-80-answer.webp"
  },
  {
    "id": "f1-082-81",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You import a Power BI dataset that contains the following tables:\n\n✑ Date\n\n✑ Product\n\n✑ Product Inventory\n\nThe Product Inventory table contains 25 million rows. A sample of the data is shown in the following table.\n\nThe Product Inventory table relates to the Date table by using the DateKey column. The Product Inventory table\n\nrelates to the Product table by using the\n\nProductKey column.\n\nYou need to reduce the size of the data model without losing information.\n\nWhat should you do?",
    "choices": [
      "Change Summarization for DateKey to Don't Summarize.",
      "Remove the relationship between Date and Product Inventory",
      "Change the data type of UnitCost to Integer.",
      "Remove MovementDate."
    ],
    "correct": [
      3
    ],
    "explanation": "The DateKey and MovementDate columns have the same information. Movementdate can be removed.\n\nD, because the best way to reduce the data model size is to remove the unnecessary column.\n\nIncorrect:\n\nNot C: Integer data type would lose data.",
    "source": "Final",
    "sourceNumber": 82,
    "legacy": true,
    "image": "/exhibit-assets/f1-082-81.webp"
  },
  {
    "id": "f1-083-82",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou are enhancing a Power BI model that has DAX calculations.\n\nYou need to create a measure that returns the year-to-date total sales from the same date of the previous\n\ncalendar year.\n\nWhich DAX functions should you use? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: CALCULATE -\n\nExample:\n\nTotal sales on the last selected date =\n\nCALCULATE (\n\nSUM ( Sales[Sales Amount] ),\n\n'Sales'[OrderDateKey] = MAX ( 'Sales'[OrderDateKey] )\n\n)\n\nBox 2: SUM -\n\nBox 3: DatesBetween\n\nThis is due to the expected parameters. DatesBetween expects two parameters as per the exhibit,\nSamePeriodLastYear expects one parameter (but two are used in the exhibit)\n\nReference:\n\nhttps://docs.microsoft.com/en-us/dax/calculate-function-dax\n\nhttps://dax.guide/sameperiodlastyear/",
    "source": "Final",
    "sourceNumber": 83,
    "legacy": false,
    "image": "/dump-assets/f1-083-82-question.webp",
    "answerImage": "/dump-assets/f1-083-82-answer.webp"
  },
  {
    "id": "f1-084-83",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou are modeling data by using Microsoft Power BI. Part of the data model is a large Microsoft SQL Server table\n\nnamed Order that has more than 100 million records.\n\nDuring the development process, you need to import a sample of the data from the Order table.\n\nSolution: You add a report-level filter that filters based on the order date.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "You want the raw data, not a report with the data.\n\nInstead add a WHERE clause to the SQL statement.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-query/native-database-query",
    "source": "Final",
    "sourceNumber": 84,
    "legacy": false
  },
  {
    "id": "f1-085-84",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have a Power BI report that imports a date table and a sales table from an Azure SQL database data source.\n\nThe sales table has the following date foreign keys:\n\n✑ Due Date\n\n✑ Order Date\n\n✑ Delivery Date\n\nYou need to support the analysis of sales over time based on all the date foreign keys.\n\nSolution: For each date foreign key, you add inactive relationships between the sales table and the date table.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "Instead: Solution: From the Fields pane, you rename the date table as Due Date. You use a DAX expression to\ncreate Order Date and Delivery Date as calculated tables.\n\nYou can reference an inactive relationship whit DAX function USERELATIONSHIP(), but using DAX is not\nmentioned here.\n\nSo follow this refactory methodology:\n\nCreate a copy of the role-playing table, providing it with a name that reflects its role. If it's an Import table, we\nrecommend defining a calculated table. If it's a DirectQuery table, you can duplicate the Power Query query.\n\nSource: https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive",
    "source": "Final",
    "sourceNumber": 85,
    "legacy": false
  },
  {
    "id": "f1-086-85",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have a Power BI report that imports a date table and a sales table from an Azure SQL database data source.\n\nThe sales table has the following date foreign keys:\n\n✑ Due Date\n\n✑ Order Date\n\n✑ Delivery Date\n\nYou need to support the analysis of sales over time based on all the date foreign keys.\n\nSolution: From Power Query Editor, you rename the date query as Due Date. You reference the Due Date query\n\ntwice to make the queries for Order Date and\n\nDelivery Date.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "1. It's not going to be great solution from the performance side...but that's not part of the requirements\n\n2. Answer is YES.That's not the best solution regarding the performance but it's not the subject.",
    "source": "Final",
    "sourceNumber": 86,
    "legacy": false
  },
  {
    "id": "f1-087-86",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have a Power BI report that imports a date table and a sales table from an Azure SQL database data source.\n\nThe sales table has the following date foreign keys:\n\n✑ Due Date\n\n✑ Order Date\n\n✑ Delivery Date\n\nYou need to support the analysis of sales over time based on all the date foreign keys.\n\nSolution: From the Fields pane, you rename the date table as Due Date. You use a DAX expression to create Order\n\nDate and Delivery Date as calculated tables.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "Refactoring methodology -\nHere's a methodology to refactor a model from a single role-playing dimension-type table, to a design with\none table per role.\n1. Remove any inactive relationships.\n2. Consider renaming the role-playing dimension-type table to better describe its role. In the example (not\n\npresent here), the Airport table is related to the\nArrivalAirport column of the Flight table, so it's renamed as Arrival Airport.\n3. Create a copy of the role-playing table, providing it with a name that reflects its role. If it's an Import table,\nwe recommend defining a calculated table. If it's a\nDirectQuery table, you can duplicate the Power Query query.\nIn the example, the Departure Airport table was created by using the following calculated table definition.\nDeparture Airport = 'Arrival Airport'\nCreate an active relationship to relate the new table.\n4. Consider renaming the columns in the tables so they accurately reflect their role. In the example, all\ncolumns are prefixed with the word Departure or Arrival.\nThese names ensure report visuals, by default, will have self-describing and non-ambiguous labels. It also\nimproves the Q&A experience, allowing users to easily write their questions.\n5. Consider adding descriptions to role-playing tables. (In the Fields pane, a description appears in a tooltip\nwhen a report author hovers their cursor over the table.) This way, you can communicate any additional filter\npropagation details to your report authors.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive",
    "source": "Final",
    "sourceNumber": 87,
    "legacy": false
  },
  {
    "id": "f1-088-87",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou receive revenue data that must be included in Microsoft Power BI reports.\n\nYou preview the data from a Microsoft Excel source in Power Query as shown in the following exhibit.\n\nYou plan to create several visuals from the data, including a visual that shows revenue split by year and product.\n\nYou need to transform the data to ensure that you can build the visuals. The solution must ensure that the columns\n\nare named appropriately for the data that they contain.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "Correct Sequence = 2>3>4\n\nSelect Use First Row as Headers\nSelect Department and Product and Unpivot Other Column\nRename the Attribute column to YEAR and the Value column to REVENUE",
    "source": "Final",
    "sourceNumber": 88,
    "legacy": false,
    "image": "/dump-assets/f1-088-87-question.webp",
    "answerImage": "/dump-assets/f1-088-87-answer.webp"
  },
  {
    "id": "f1-089-88",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have a Power BI report named Orders that supports the following analysis:\n\n✑ Total sales over time\n\n✑ The count of orders over time\n\n✑ New and repeat customer counts\n\nThe data model size is nearing the limit for a dataset in shared capacity.\n\nThe model view for the dataset is shown in the following exhibit.\n\nThe data view for the Orders table is shown in the following exhibit.\n\nThe Orders table relates to the Customers table by using the CustomerID column.\n\nThe Orders table relates to the Date table by using the OrderDate column.\n\nFor each of the following statements, select Yes if the statement is true, Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: No -\n\nWould not support total sales over time.\n\nBox 2: No -\n\nWould not support new and repeat customer counts\n\nBox 3: Yes\n\nNo: Summarizing orders with these columns may actually increase the model size as creates a more detailed\nrepresentation of the data. It will not reduce the model size.\n\nNo: Since there's a relationship between the Orders table and the Customers table using the CustomerID\ncolumn, removing it might affect the ability to analyze data by customer, so it may not support the current\nanalysis.\n\nYes: Removing unnecessary columns like UnitPrice and Discount that are not used in the analysis will likely\nreduce the model size without affecting the ability to analyze total sales over time, order counts, and\ncustomer counts.",
    "source": "Final",
    "sourceNumber": 89,
    "legacy": false,
    "image": "/dump-assets/f1-089-88-question.webp",
    "answerImage": "/dump-assets/f1-089-88-answer.webp"
  },
  {
    "id": "f1-090-89",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou are building a financial report by using Power BI.\n\nYou have a table named financials that contains a column named Date and a column named Sales.\n\nYou need to create a measure that calculates the relative change in sales as compared to the previous quarter.\n\nHow should you complete the measure? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: CALCULATE -\n\nCalculate the sum.\n\nBox 2: DATEADD -\n\nDATEADD -1 QUARTER will give the previous month.\n\nBox 3: DIVIDE -\n\nUse DIVIDE to get the relative change.",
    "source": "Final",
    "sourceNumber": 90,
    "legacy": false,
    "image": "/dump-assets/f1-090-89-question.webp",
    "answerImage": "/dump-assets/f1-090-89-answer.webp"
  },
  {
    "id": "f1-091-90",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou are creating a Power BI model and report.\n\nYou have a single table in a data model named Product. Product contains the following fields:\n\n✑ ID\n\n✑ Name\n\n✑ Color\n\n✑ Category\n\n✑ Total Sales\n\nYou need to create a calculated table that shows only the top eight products based on the highest value in Total\n\nSales.\n\nHow should you complete the DAX expression? To answer, drag the appropriate values to the correct targets.\n\nEach value may be used once, more than once, or not at all. You may need to drag the split bar between panes or\n\nscroll to view content.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: TOPN -\nTOPN returns the top N rows of the specified table.\nSyntax: TOPN(<n_value>, <table>, <orderBy_expression>, [<order>[, <orderBy_expression>, [<order>]]�])\n\nBox 2: DESC -\nDescending order to get the highest values first.\n\nReference:\nhttps://docs.microsoft.com/en-us/dax/topn-function-dax",
    "source": "Final",
    "sourceNumber": 91,
    "legacy": false,
    "image": "/dump-assets/f1-091-90-question.webp",
    "answerImage": "/dump-assets/f1-091-90-answer.webp"
  },
  {
    "id": "f1-092-91",
    "domain": "Prepare the data",
    "type": "multi",
    "prompt": "You are creating a sales report in Power BI for the NorthWest region sales territory of your company. Data will\n\ncome from a view in a Microsoft SQL Server database. A sample of the data is shown in the following table:\n\nThe report will facilitate the following analysis:\n\n✑ The count of orders and the sum of total sales by Order Date\n\n✑ The count of customers who placed an order\n\n✑ The average quantity per order\n\nYou need to reduce data refresh times and report query times.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Set the data type for SalesOrderNumber to Decimal Number.",
      "Remove the CustomerKey and ProductKey columns.",
      "Remove the TaxAmt and Freight columns.",
      "Filter the data to only the NorthWest region sales territory."
    ],
    "correct": [
      2,
      3
    ],
    "explanation": "C: Remove columns that are not used in the report.\n\nD: Reduce the number of rows.\n\nIncorrect:\n\nNot A: Not possible.\n\nNot B: Need CustomerKey to count of customers who placed an order\n\nThis question presents a scenario where you're tasked with creating a sales report in Power BI for the\nNorthWest region. The data originates from a Microsoft SQL Server database view, and the report aims to\nanalyze:\n\nThe count of orders and the sum of total sales by Order Date\n\nThe count of customers who placed an order\n\nThe average quantity per order\n\nTo enhance data refresh and query times, the suggested actions are:\n\nC. Remove the TaxAmt and Freight columns.\n\nD. Filter the data to only the NorthWest region sales territory.\n\nJustification:\n\nRemoving Unnecessary Columns: By eliminating columns like TaxAmt and Freight that aren't required for the\nspecified analyses, you reduce the dataset's size. This streamlining leads to faster data refreshes and more\nefficient queries.\n\nFiltering Data to Relevant Regions: Applying a filter to include only the NorthWest region ensures that only\npertinent data is loaded into Power BI. This targeted approach minimizes the volume of data processed,\nfurther improving performance.\n\nImplementing these steps aligns with best practices for optimizing Power BI performance, as it reduces the\namount of data handled, leading to quicker refresh and query times.",
    "source": "Final",
    "sourceNumber": 92,
    "legacy": false,
    "image": "/exhibit-assets/f1-092-91.webp"
  },
  {
    "id": "f1-093-92",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You are creating a Power BI model that contains a table named Store. Store contains the following fields.\n\nYou plan to create a map visual that will show store locations and provide the ability to drill down from Country to\n\nState/Province to City.\n\nWhat should you do to ensure that the locations are mapped properly?",
    "choices": [
      "Change the data type of City, State/Province, and Country.",
      "Set Summarization for City, State/Province, and Country to Don't summarize.",
      "Set the data category of City, State/Province, and Country.",
      "Create a calculated column that concatenates the values in City, State/Province, and Country."
    ],
    "correct": [
      2
    ],
    "explanation": "A hierarchy is a set of fields categorized in a hierarchical way that one level is the parent of another level.\nValues of the parent level can be drilled down to the lower level.\n\nCreate Hierarchy -\nRight-click on the field you want to set as level 1 of the hierarchy in the fields list, and then select Create\nHierarchy.\n\nAfter that, you will see a new hierarchy created named your field name Category plus the word Hierarchy. This\nwould have a hierarchy icon beside it and also an option to expand to the fields of the hierarchy. If you expand,\nyou will see a copy of the Category field in there too.\n\nEtc.\n\nReference:\nhttps://radacad.com/what-a-power-bi-hierarchy-is-and-how-to-use-it",
    "source": "Final",
    "sourceNumber": 93,
    "legacy": false
  },
  {
    "id": "f1-094-93",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You are building a data model for a Power BI report.\n\nYou have data formatted as shown in the following table.\n\nYou need to create a clustered bar chart as shown in the following exhibit.\n\nWhat should you do?",
    "choices": [
      "From Power Query Editor, split the Machine-User column by using a delimiter.",
      "From Power Query Editor, create a column that contains the last three digits of the Machine-User column.",
      "In a DAX function, create two calculated columns named Machine and User by using the SUBSTITUTE function.",
      "In a DAX function, create two measures named Machine and User by using the SUBSTITUTE function."
    ],
    "correct": [
      0
    ],
    "explanation": "Split a column of text (Power Query)\nYou can split a column with a text data type into two or more columns by using a common delimiter character.\nFor example, a Name column that contains values written as <LastName>, <FirstName> can be split into two\ncolumns using the comma (,) character.\nNote: Power Query is an Extract Transform Load (ETL) tool. It allows us to\nDownload and fetch data from different sources. We call this data ingestion\nCombine, clean, and model this data. We call this data wrangling\n\nReference:\nhttps://support.microsoft.com/en-us/office/split-a-column-of-text-power-query-5282d425-6dd0-46ca-95bf-\n8e0da9539662",
    "source": "Final",
    "sourceNumber": 94,
    "legacy": false,
    "image": "/exhibit-assets/f1-094-93.webp"
  },
  {
    "id": "f1-095-94",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou need create a date table in Power BI that must contain 10 full calendar years, including the current year.\n\nHow should you complete the DAX expression? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: YEAR -\n\nGet the current year.\n\nBox 2: TODAY -\n\nTODAY returns the current date.\n\nBox 3: CALENDAR -\n\nCALENDAR returns a table with a single column named Date containing a contiguous set of dates. The range\nof dates is from the specified start date to the specified end date, inclusive of those two dates.\n\nThe following formula returns a table with dates between January 1st, 2005 and December 31st, 2015.\n\nCALENDAR (\n\nDATE ( 2005, 1, 1 ),\n\nDATE ( 2015, 12, 31 )\n\nReference:\n\nhttps://dax.guide/calendar/",
    "source": "Final",
    "sourceNumber": 95,
    "legacy": false,
    "image": "/dump-assets/f1-095-94-question.webp",
    "answerImage": "/dump-assets/f1-095-94-answer.webp"
  },
  {
    "id": "f1-096-95",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have a Power BI report that imports a date table and a sales table from an Azure SQL database data source.\n\nThe sales table has the following date foreign keys:\n\n✑ Due Date\n\n✑ Order Date\n\n✑ Delivery Date\n\nYou need to support the analysis of sales over time based on all the date foreign keys.\n\nSolution: You create measures that use the USERELATIONSHIP DAX function to filter sales on the active\n\nrelationship between the sales table and the date table.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "You can't use USERELATIONSHIP() to filter on an active relationship, but need additional innactive\nrelationships\n\nInstead: Solution: From the Fields pane, you rename the date table as Due Date. You use a DAX expression to\ncreate Order Date and Delivery Date as calculated tables.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive",
    "source": "Final",
    "sourceNumber": 96,
    "legacy": false
  },
  {
    "id": "f1-097-96",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have a Power BI report that contains a measure named Total Sales.\n\nYou need to create a new measure that will return the sum of Total Sales for a year up to a selected date.\n\nHow should you complete the DAX expression? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: TOTALYTD -\n\nTOTALYTD evaluates the specified expression over the interval which begins on the first day of the year and\nends with the last date in the specified date column after applying specified filters.\n\nSyntax: TOTALYTD (\n\n<Expression>,\n\n<Dates>\n\n[, <Filter>]\n\n[, <YearEndDate>]\n\nExpression - The expression to be evaluated.\n\nDates - The name of a column containing dates or a one column table containing dates.\n\nExample:\n\nTOTALYTD ( -- 2007-01-01 : 2007-05-12\n\n[Sales Amount],\n\n'Date'[Date]\n\nBox 2: 'Date'[Date]\n\nReference:\n\nhttps://dax.guide/totalytd/",
    "source": "Final",
    "sourceNumber": 97,
    "legacy": false,
    "image": "/dump-assets/f1-097-96-question.webp",
    "answerImage": "/dump-assets/f1-097-96-answer.webp"
  },
  {
    "id": "f1-098-97",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou are modifying a Power BI model by using Power BI Desktop.\n\nYou have a table named Sales that contains the following fields.\n\nYou have a table named Transaction Size that contains the following data.\n\nYou need to create a calculated column to classify each transaction as small, medium, or large based on the value\n\nin Sales Amount.\n\nHow should you complete the code? To answer, drag the appropriate values to the correct targets. Each value may\n\nbe used once, more than once, or not at all.\n\nYou may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: FILTER\n\nBox 2: AND\n\nBox 3: CALCULATE\n\nFILTER needs to followed by table reference ,\n\nAND is needed to check the limits , and\n\nCALCULATE because needs to be followed by expression such as distinct in this case\n\nReference:\n\nhttps://docs.microsoft.com/en-us/dax/calculate-function-dax\n\nhttps://docs.microsoft.com/en-us/dax/filter-function-dax",
    "source": "Final",
    "sourceNumber": 98,
    "legacy": false,
    "image": "/dump-assets/f1-098-97-question.webp",
    "answerImage": "/dump-assets/f1-098-97-answer.webp"
  },
  {
    "id": "f1-099-98",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report for the procurement department. The report contains data from the following tables.\n\nThere is a one-to-many relationship from Suppliers to LineItems that uses the ID and Supplier ID columns.\n\nThe report contains the visuals shown in the following table.\n\nYou need to minimize the size of the dataset without affecting the visuals.\n\nWhat should you do?",
    "choices": [
      "Merge Suppliers and LineItems.",
      "Remove the LineItems[Description] column.",
      "Remove the rows from LineItems where LineItems[Invoice Date] is before the beginning of last month.",
      "Group LineItems by LineItems[Invoice ID] and LineItems[Invoice Date] with a sum of LineItems[Price]."
    ],
    "correct": [
      1
    ],
    "explanation": "Remove a column that is not used in the visuals reduces the size of the dataset.\n\nIncorrect:\n\nNot A: Merging the tables would increase the dataset.\n\nNot C: Two of the visuals need historical data.\n\nNot D: Grouping would not affect size.",
    "source": "Final",
    "sourceNumber": 99,
    "legacy": false,
    "image": "/exhibit-assets/f1-099-98.webp"
  },
  {
    "id": "f1-100-99",
    "domain": "Model the data",
    "type": "multi",
    "prompt": "You have a Power BI report for the marketing department. The report reports on web traffic to a blog and contains\n\ndata from the following tables.\n\nThere is a one-to-many relationship from Posts to Traffic that uses the URL and URL Visited columns.\n\nThe report contains the visuals shown in the following table.\n\nThe dataset takes a long time to refresh.\n\nYou need to modify Posts and Traffic queries to reduce load times.\n\nWhich two actions will reduce the load times? Each correct answer presents part of the solution.\n\nNOTE:\n\nEach correct selection is worth one point.",
    "choices": [
      "Remove the rows in Posts in which Posts[Publish Date] is in the last seven days.",
      "Remove the rows in Traffic in which Traffic[URL Visited] does not contain blog.",
      "Remove Traffic[IP Address], Traffic[Browser Agent], and Traffic[Referring URL].",
      "Remove Posts[Full Text] and Posts[Summary].",
      "Remove the rows in Traffic in which Traffic[Referring URL] does not start with /."
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "B: Only blog posts rows are useful for the visuals.\nD: These two columns are not used in the visuals and can be removed.\nIncorrect:\nNot A: Three visuals need historical data.\nNot C: Traffic[Referring URL] is used in one of the visuals and therefore cannot be removed.\nNot E: These rows are used in 3 visuals.",
    "source": "Final",
    "sourceNumber": 100,
    "legacy": false,
    "image": "/exhibit-assets/f1-100-99.webp"
  },
  {
    "id": "f1-101-100",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou are creating a quick measure as shown in the following exhibit.\n\nYou need to create a monthly rolling average measure for Sales over time.\n\nHow should you configure the quick measure calculation? To answer, select the appropriate options in the answer\n\narea.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "1. Total Sales;\n\n2. Date;\n\n3. Months",
    "source": "Final",
    "sourceNumber": 101,
    "legacy": false,
    "image": "/dump-assets/f1-101-100-question.webp",
    "answerImage": "/dump-assets/f1-101-100-answer.webp"
  },
  {
    "id": "f1-102-101",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have the Power BI data model shown in the following exhibit.\n\nThe Sales table contains records of sales by day from the last five years up until today’s date.\n\nYou plan to create a measure to return the total sales of March 2021 when March 2022 is selected.\n\nWhich DAX expression should you use?",
    "choices": [
      "Calculate (Sum(Sales[Sales]), PREVIOUSYEAR( dimDate[Date])",
      "TOTALYTD (SUM(Sales[Sales]), dimDate[Date] )",
      "Calculate (SUM(Sales[Sales]), SAMEPERIODLASTYEAR(dimDate[Date] ))",
      "SUM(Sales[Sales])"
    ],
    "correct": [
      2
    ],
    "explanation": "Calculate (SUM(Sales[Sales]), SAMEPERIODLASTYEAR(dimDate[Date] ))",
    "source": "Final",
    "sourceNumber": 102,
    "legacy": false,
    "image": "/exhibit-assets/f1-102-101.webp"
  },
  {
    "id": "f1-103-102",
    "domain": "Prepare the data",
    "type": "multi",
    "prompt": "You use Power BI Desktop to load data from a Microsoft SQL Server database.\n\nWhile waiting for the data to load, you receive the following error.\n\nYou need to resolve the error.\n\nWhat are two ways to achieve the goal? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Reduce the number of rows and columns returned by each query.",
      "Split log running queries into subsets of columns and use Power Query to merge the queries.",
      "Use Power Query to combine log running queries into one query.",
      "Disable query folding on long running queries."
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "A. Reduce the number of rows and columns returned by each query.\n\nB. Split log running queries into subsets of columns and use Power Query to merge the queries.\n\nA. Reduce the number of rows and columns returned by each query.\n\nLimiting the amount of data returned by the queries decreases the load on the Power BI engine and reduces\nthe likelihood of memory or performance-related issues.\n\nFiltering the data at the source can optimize query execution and minimize processing time.\n\nB. Split long-running queries into subsets of columns and use Power Query to merge the queries.\n\nDividing large or complex queries into smaller, manageable pieces reduces the strain on the system.\n\nPower Query can be used to combine these subsets later, allowing the system to process the data in chunks\nrather than a single large operation.\n\nWhy the Other Options Are Incorrect:\n\nC. Use Power Query to combine long-running queries into one query.\n\nCombining queries into a single query increases complexity and processing load, which can exacerbate\nperformance issues.\n\nD. Disable query folding on long-running queries.\n\nQuery folding allows Power BI to push transformations back to the database server, which is more efficient.\nDisabling query folding can result in increased data transfer and slower performance.\n\nExplanation:\n\nThe goal is to address the root cause of the error—likely caused by large datasets or complex queries—and\nensure efficient data processing in Power BI. By reducing data size (A) and breaking queries into smaller\nsubsets (B), the error can be resolved effectively.",
    "source": "Final",
    "sourceNumber": 103,
    "legacy": false
  },
  {
    "id": "f1-104-103",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nFrom Power Query Editor, you profile the data shown in the following exhibit.\n\nThe IoT GUID and IoT ID columns are unique to each row in the query.\n\nYou need to analyze IoT events by the hour and day of the year. The solution must improve dataset performance.\n\nSolution: You split the IoT DateTime column into a column named Date and a column named Time.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "The correct answer is A. Splitting datetime column will improve the performance even if it generates one\nmore column, having less unique values in separated date and time columns will achieve better compression.",
    "source": "Final",
    "sourceNumber": 104,
    "legacy": false,
    "image": "/exhibit-assets/f1-104-103.webp"
  },
  {
    "id": "f1-105-104",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nFrom Power Query Editor, you profile the data shown in the following exhibit.\n\nThe IoT GUID and IoT ID columns are unique to each row in the query.\n\nYou need to analyze IoT events by the hour and day of the year. The solution must improve dataset performance.\n\nSolution: You remove the IoT GUID column and retain the IoT ID column.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "yes is a correct.\n\nit says : The IoT GUID and IoT ID columns are unique to each row in the query.\n\nBOTH UNIQUES to EACH row...\n\nSo basically each one can be used as primary key for the table.\n\nremoving the guid column does improve performance.\n\nBetter to remove the guid because it 's a 16-byte binary data type compared to a unsigned long which is a 4-\nbyte binary data type\n\nThere are two requirements to the question - improve the performance and enable the required analysis.\nRemoving the GUID column will do exactly that - it will improve the performance because it is one less column\nof data to load but it still enables the required analysis given the IOT ID column is equally unique.",
    "source": "Final",
    "sourceNumber": 105,
    "legacy": false,
    "image": "/exhibit-assets/f1-105-104.webp"
  },
  {
    "id": "f1-106-105",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nFrom Power Query Editor, you profile the data shown in the following exhibit.\n\nThe IoT GUID and IoT ID columns are unique to each row in the query.\n\nYou need to analyze IoT events by the hour and day of the year. The solution must improve dataset performance.\n\nSolution: You change the IoT DateTime column to the Date data type.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "B is correct because changing the IoT DateTime column to the Date data type alone will not meet the goal of\nanalyzing IoT events by the hour and day of the year in power query.",
    "source": "Final",
    "sourceNumber": 106,
    "legacy": false,
    "image": "/exhibit-assets/f1-106-105.webp"
  },
  {
    "id": "f1-107-106",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Microsoft Power BI report. The size of PBIX file is 550 MB. The report is accessed by using an App\n\nworkspace in shared capacity of powerbi.com.\n\nThe report uses an imported dataset that contains one fact table. The fact table contains 12 million rows. The\n\ndataset is scheduled to refresh twice a day at 08:00 and 17:00.\n\nThe report is a single page that contains 15 AppSource visuals and 10 default visuals.\n\nUsers say that the report is slow to load the visuals when they access and interact with the report.\n\nYou need to recommend a solution to improve the performance of the report.\n\nWhat should you recommend?",
    "choices": [
      "Change any DAX measures to use iterator functions.",
      "Remove unused columns from tables in the data model.",
      "Replace the default visuals with AppSource visuals.",
      "Increase the number of times that the dataset is refreshed."
    ],
    "correct": [
      1
    ],
    "explanation": "B. Remove unused columns from tables in the data model.\n\nUnused columns increase the size of the data model, which can slow down report rendering and query\nperformance. By eliminating unnecessary columns, you reduce memory consumption and improve overall\nefficiency.\n\nAdditionally, optimizing DAX measures and reducing the number of visuals on a page can further enhance\nperformance. Would you like more details on Power BI optimization techniques?",
    "source": "Final",
    "sourceNumber": 107,
    "legacy": false
  },
  {
    "id": "f1-108-107",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou have a Power BI data model that contains two tables named Products and Sales.\n\nA one-to-many relationship exists between the tables.\n\nYou have a report that contains a report-level filter for Products.\n\nYou need to create a measure that will return the percent of total sales for each product. The measure must\n\nrespect the report-level filter when calculating the total.\n\nHow should you complete the DAX measure? To answer, drag the appropriate DAX functions to the correct\n\ntargets. Each function may be used once, more than once, or not at all. You may need to drag the split bar between\n\npanes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "1.Calculate\n\n2. ALLSELECTED.\n\nALLSELECTED Removes only the filter on the expression visual but respect all external filters.\n\nALLSELECTED: Returns all the rows in a table, or all the values in a column, ignoring any filters that may have\nbeen applied inside the query, but keeping filters that come from the outside.\n\nhttps://mitchellpearson.com/2020/09/14/understanding-row-context-in-dax-and-power-\nbi/#:~:text=ALLSELECTED%20DAX%20functions,coming%20from%20the%20inner%20query",
    "source": "Final",
    "sourceNumber": 108,
    "legacy": false,
    "image": "/dump-assets/f1-108-107-question.webp",
    "answerImage": "/dump-assets/f1-108-107-answer.webp"
  },
  {
    "id": "f1-109-108",
    "domain": "Model the data",
    "type": "multi",
    "prompt": "You have a Power BI data model that analyzes product sales over time. The data model contains the following\n\ntables.\n\nA one-to-many relationship exists between the tables.\n\nThe auto date/time option for the data model is enabled.\n\nYou need to reduce the size of the data model while maintaining the ability to analyze product sales by month and\n\nquarter.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct answer is worth one point.",
    "choices": [
      "Create a relationship between the Date table and the Sales table.",
      "Disable the auto date/time option.",
      "Create a Date table and select Mark as Date Table.",
      "Disable the load on the Date table.",
      "Remove the relationship between the Product table and the Sales table."
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "AC is the correct answer. B is not needed as: It's important to note that when you specify your own date table,\nPower BI Desktop does not auto-create the hierarchies that it would otherwise build into your model on your\nbehalf. If you later deselect your date table (and no longer have a manually set date table), Power BI Desktop\nrecreates the automatically created built-in date tables for you, for the date columns in the table.\nhttps://learn.microsoft.com/en-us/power-bi/transform-model/desktop-date-tables",
    "source": "Final",
    "sourceNumber": 109,
    "legacy": false,
    "image": "/exhibit-assets/f1-109-108.webp"
  },
  {
    "id": "f1-110-109",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Microsoft Power BI report. The size of PBIX file is 550 MB. The report is accessed by using an App\n\nworkspace in shared capacity of powerbi.com.\n\nThe report uses an imported dataset that contains one fact table. The fact table contains 12 million rows. The\n\ndataset is scheduled to refresh twice a day at 08:00 and 17:00.\n\nThe report is a single page that contains 15 AppSource visuals and 10 default visuals.\n\nUsers say that the report is slow to load the visuals when they access and interact with the report.\n\nYou need to recommend a solution to improve the performance of the report.\n\nWhat should you recommend?",
    "choices": [
      "Implement row-level security (RLS).",
      "Remove unused columns from tables in the data model.",
      "Replace the default visuals with AppSource visuals.",
      "Enable visual interactions."
    ],
    "correct": [
      1
    ],
    "explanation": "Remove unused columns from tables in the data model.\n\nWhen a Power BI report is slow to load and interact with, optimizing the dataset and data model can\nsignificantly improve performance. Here's why B. Remove unused columns from tables in the data model is\nthe correct choice:\n\nReasoning\n\nData Model Size:\n\nThe PBIX file is large (550 MB) due to the dataset's imported fact table with 12 million rows and potentially\nmany unnecessary columns.\n\nEach column in the data model consumes memory and processing power during report rendering, even if it is\nnot used in any visuals or calculations.\n\nPerformance Optimization:\n\nRemoving unused columns reduces the data model size, which improves memory usage and query\nperformance.\n\nA smaller data model leads to faster data refreshes, quicker load times, and improved responsiveness when\nusers interact with visuals.\n\nFocus on Visual Load Time:\n\nThe issue isn't related to security, visual types, or interactivity but rather the underlying data model size and\nefficiency.\n\nWhy Not the Other Options?\n\nA. Implement row-level security (RLS):\n\nRLS controls user access to specific data rows, but it doesn't improve report loading or visual performance\ndirectly.\n\nIt could even add complexity and slightly increase query execution time.\n\nC. Replace the default visuals with AppSource visuals:\n\nAppSource visuals often have more features but can introduce additional rendering overhead, making reports\nslower. Replacing default visuals with AppSource visuals would likely worsen performance.\n\nD. Enable visual interactions:\n\nEnabling visual interactions controls how visuals on a report page respond to each other. However, it doesn't\ndirectly address performance issues caused by a large data model or dataset.",
    "source": "Final",
    "sourceNumber": 110,
    "legacy": false
  },
  {
    "id": "f1-111-110",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI data model that contains a table named Stores. The table has the following columns:\n\n• Store Name\n\n• Open Date\n\n• Status\n\n• State\n\n• City\n\nYou need to create a calculated column named Active Store Name that meets the following requirements:\n\n• When the value of the Status column is “A”, the value in the Store Name column must be returned.\n\n• When the value of the Status column is NOT “A”, the value in the Store Name column that is prefixed with\n\n\"Inactive - \" must be returned.\n\nHow should you complete the DAX expression? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "IF\n\n&\n\nTo create the calculated column Active Store Name in Power BI, which returns the store name prefixed with\n\"Inactive - \" when the status is not \"A\", and the store name as-is when the status is \"A\", you can use the\nfollowing DAX expression:\n\nActive Store Name = IF( Stores[Status] = \"A\", Stores[Store Name], \"Inactive - \" & Stores[Store Name])\n\nExplanation:\n\nThe IF function checks if the Status column equals \"A\".\n\nIf true, it returns the value from the Store Name column.\n\nIf false, it concatenates \"Inactive - \" with the Store Name using the & operator.\n\nThis approach ensures that the Active Store Name column meets the specified requirements.",
    "source": "Final",
    "sourceNumber": 111,
    "legacy": false,
    "image": "/dump-assets/f1-111-110-question.webp",
    "answerImage": "/dump-assets/f1-111-110-answer.webp"
  },
  {
    "id": "f1-112-111",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the\n\ndate and time each complaint occurred. The data in Logged is in the following format: 2018-12-31 at 08:59.\n\nYou need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.\n\nWhat should you do?",
    "choices": [
      "Apply a transformation to extract the first 11 characters of the logged column.",
      "Add a conditional column that outputs 2018 if the Logged column starts with 2018 and set the data type of the new column to Whole Number.",
      "Create a column by example that starts with 2018-12-31 and set the data type of the new column to Date.",
      "Apply a transformation to extract the last 11 characters of the Logged column and set the data type of the new column to Date."
    ],
    "correct": [
      2
    ],
    "explanation": "Answer is C and not B because the conditional column would be year and not the logged date, also the data\ntype should be date not whole number as specified in B.\n\nC. Create a column by example that starts with 2018-12-31 and set the data type of the new column to\nDate.\n\nExplanation:\n\nUnderstanding the Problem:\n\nThe Logged column contains date and time data in the format 2018-12-31 at 08:59.\n\nThe goal is to use a built-in date hierarchy for analyzing the data, which requires the data type to be\nconverted to Date.\n\nWhy Option C Works:\n\nColumn by Example is a feature in Power Query that allows you to create a new column by typing a sample\nvalue, enabling Power Query to infer the transformation logic.\n\nIn this case, typing 2018-12-31 as an example allows Power Query to extract the date portion (YYYY-MM-DD)\nfrom the Logged column.\n\nOnce the date portion is extracted, you can change the data type of the new column to Date. This ensures it\n\ncan be used with the built-in date hierarchy for further analysis.\n\nWhy Other Options Are Incorrect:\n\nA. Apply a transformation to extract the first 11 characters of the Logged column:\n\nExtracting the first 11 characters (e.g., 2018-12-31) will give you the date portion.\n\nHowever, this option doesn't specify changing the data type to Date, which is necessary to enable the date\nhierarchy. If the data type isn't converted, the result will remain as text.\n\nB. Add a conditional column that outputs 2018 if the Logged column starts with 2018 and set the data type\nof the new column to Whole Number:\n\nCreating a column that outputs just the year (2018) and setting it to a number format isn't sufficient for\nenabling a built-in date hierarchy, as the hierarchy requires a complete date (YYYY-MM-DD).\n\nD. Apply a transformation to extract the last 11 characters of the Logged column and set the data type of\nthe new column to Date:\n\nExtracting the last 11 characters (e.g., at 08:59) will include invalid text (at) and time (08:59), making it\nimpossible to convert the column directly to a valid Date type.",
    "source": "Final",
    "sourceNumber": 112,
    "legacy": false
  },
  {
    "id": "f1-113-112",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nFrom Power Query Editor, you profile the data shown in the following exhibit.\n\nThe IoT GUID and IoT ID columns are unique to each row in the query.\n\nYou need to analyze IoT events by the hour and day of the year. The solution must improve dataset performance.\n\nSolution: You create a custom column that concatenates the IoT GUID column and the IoT ID column and then\n\ndelete the IoT GUID and IoT ID columns.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "Answer is NO.\n\nIoT GUID & IOT ID both are unique key columns. so we can delete any one among them. From performance\npoint of view its good to delete text ID column i.e IOT GUID and keep IOT ID. concatenation is not required\n\nBoth are unique columns, but by concatenating them you will end up with a Unique Key with data type Text.\nThis raises performance issues since Unique keys should be preferably integers for performance reasons.\nAlso, since IoT GUID is not required might as well remove it.",
    "source": "Final",
    "sourceNumber": 113,
    "legacy": false,
    "image": "/exhibit-assets/f1-113-112.webp"
  },
  {
    "id": "f1-114-113",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI model that contains a table named Employee. The table contains the following data.\n\nEach employee has one manager as shown in the ParentEmployeeID column.\n\nAll reporting paths lead to the CEO at the top of the organizational hierarchy.\n\nYou need to create a calculated column that returns the count of levels from each employee to the CEO.\n\nWhich DAX expression should you use?",
    "choices": [
      "PATHLENGTH(PATH(Employee[EmployeeID],Employee[ParentEmployeeID]))",
      "PATHITEM(PATH(Employee[EmployeeID],Employee[ParentEmployeeID]),1,INTEGER)",
      "PATHCONTAINS(PATH(Employee[EmployeeID],Employee[ParentEmployeeID]),1)",
      "PATH(Employee[EmployeeID],Employee[ParentEmployeeID])"
    ],
    "correct": [
      0
    ],
    "explanation": "The Answer is A because the question instructs that we count the different levels of each employee. The\nPathLength gives the result. For more information see the link https://learn.microsoft.com/en-\n\nus/dax/pathlength-function-dax\n\nAlthough for CEO it returns 1 - so I personally would substract 1 from this PATHLENGTH when creating the\nreport, as I think numbers of levels from CEO to CEO is 0, formanagaers directly under CEO it is 1 etc\n\nAnswer D is wrong because it only returns the items related to the current row value and does not give the\ncount.",
    "source": "Final",
    "sourceNumber": 114,
    "legacy": false
  },
  {
    "id": "f1-115-114",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Microsoft Power BI report. The size of PBIX file is 550 MB. The report is accessed by using an App\n\nworkspace in shared capacity of powerbi.com.\n\nThe report uses an imported dataset that contains one fact table. The fact table contains 12 million rows. The\n\ndataset is scheduled to refresh twice a day at 08:00 and 17:00.\n\nThe report is a single page that contains 15 AppSource visuals and 10 default visuals.\n\nUsers say that the report is slow to load the visuals when they access and interact with the report.\n\nYou need to recommend a solution to improve the performance of the report.\n\nWhat should you recommend?",
    "choices": [
      "Replace the default visuals with AppSource visuals.",
      "Remove unused columns from tables in the data model.",
      "Change the imported dataset to DirectQuery",
      "Increase the number of times that the dataset is refreshed."
    ],
    "correct": [
      1
    ],
    "explanation": "B is correct Removing unwanted columns from the data model is a good trick to improve the performance.\n\nUnderstanding the Problem:\n\nThe Power BI report file is large (550 MB), and the dataset contains 12 million rows, which indicates potential\ninefficiencies in the data model.\n\nThe report is slow to load visuals, which could be caused by the size and complexity of the data model or the\nnumber of visuals used.\n\nWhy Option B Works:\n\nRemoving unused columns from the tables in the data model reduces the dataset's size and memory\nconsumption.\n\nA smaller dataset is easier to load and query, which improves report performance significantly.\n\nUnused columns unnecessarily increase the memory footprint, processing time, and load time for visuals.\n\nWhy Other Options Are Incorrect:\n\nA. Replace the default visuals with AppSource visuals:\n\nAppSource visuals often have lower performance compared to default visuals because they can include\nadditional overhead for rendering.\n\nReplacing default visuals with AppSource visuals would likely decrease performance, not improve it.\n\nC. Change the imported dataset to DirectQuery:\n\nSwitching to DirectQuery can improve performance in specific cases where only a small amount of data is\nqueried at a time.\n\nHowever, DirectQuery is dependent on the performance of the source system and can be slower for complex\nqueries or large datasets.\n\nSince this report involves a large dataset (12 million rows) and frequent interactions, DirectQuery could\nintroduce additional latency.\n\nD. Increase the number of times that the dataset is refreshed:\n\nDataset refresh frequency affects how up-to-date the data is but does not impact the performance of the\nvisuals loading in the report.\n\nSince the issue is about visuals being slow to load, increasing refresh frequency would not solve the problem.\n\nKey Recommendations for Performance Improvement:\n\nOptimize the data model: Remove unused columns, reduce column cardinality, and use efficient data types.\n\nSimplify visuals: Limit the number of visuals on a single page and avoid overusing AppSource visuals.\n\nAggregate data: Use summary tables or aggregate data in the fact table to reduce the data size and\ncomplexity.\n\nEnable query reduction options: Use options like disabling cross-highlighting to minimize the number of\nqueries sent to the model.\n\nBy addressing the size and complexity of the data model through Option B, you can improve performance\neffectively without changing the dataset refresh strategy or visualization setup unnecessarily.",
    "source": "Final",
    "sourceNumber": 115,
    "legacy": false
  },
  {
    "id": "f1-116-115",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the\n\ndate and time each complaint occurred. The data in Logged is in the following format: 2018-12-31 at 08:59.\n\nYou need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.\n\nWhat should you do?",
    "choices": [
      "Change the data type of the Logged column to Date.",
      "Split the Logged column by using at as the delimiter.",
      "Add a conditional column that outputs 2018 if the Logged column starts with 2018 and set the data type of the new column to Whole Number.",
      "Apply the Parse function from the Date transformations options to the Logged column."
    ],
    "correct": [
      1
    ],
    "explanation": "Understanding the Problem:\n\nThe Logged column contains data in the format:\n\n2018-12-31 at 08:59.\n\nTo use Power BI's built-in date hierarchy, the Logged column must be in a recognized DateTime format (e.g.,\n2018-12-31 08:59).\n\nThe presence of the word \"at\" prevents Power BI from directly converting this text to a DateTime format.\n\nWhy Option B Works:\n\nSplitting the Logged column using at as the delimiter separates the date (2018-12-31) and time (08:59) into two\ncolumns.\n\nOnce the column is split:\n\nThe first part (date) can be set to the Date data type.\n\nThe second part (time) can be set to the Time data type if needed, or ignored if time is not relevant for\nanalysis.\n\nThis approach ensures the date portion is clean and ready to be analyzed using Power BI's built-in date\nhierarchy.\n\nWhy Other Options Are Incorrect:\n\nA. Change the data type of the Logged column to Date:\n\nThis would fail because the text \"at\" in the column makes the data incompatible with the Date data type.\nPower BI will throw an error unless the text is removed or transformed first.\n\nC. Add a conditional column that outputs 2018 if the Logged column starts with 2018 and set the data type\nto Whole Number:\n\nExtracting only the year (e.g., 2018) does not help in analyzing the data by the full date or using the built-in\nhierarchy for year, quarter, month, and day.\n\nD. Apply the Parse function from the Date transformations options to the Logged column:\n\nThe Parse function is helpful when the text is in a recognizable datetime format. However, the presence of \"at\"\nin the Logged column makes it unrecognizable as a date. Power BI will fail to parse the column without first\nremoving or splitting out the \"at\" portion.\n\nKey Steps for Option B in Power BI:\n\nOpen Power BI Desktop and go to Transform Data.\nSelect the Logged column.\nUse the Split Column option:\n\nChoose By Delimiter.\nSet the delimiter as at.\nThe column will split into two:\nThe first column will contain the date (2018-12-31).\nThe second column will contain the time (08:59).\nSet the first column's data type to Date.\n(Optional) If the time column is needed, set its data type to Time or keep it as is.\nThe first column will now support Power BI's built-in date hierarchy.",
    "source": "Final",
    "sourceNumber": 116,
    "legacy": false
  },
  {
    "id": "f1-117-116",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have the Power BI data model shown in the following exhibit.\n\nYou need to create a measure to count the number of product categories that had products sold during a selected\n\nperiod.\n\nHow should you complete the DAX expression? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Distinctcount('Product'[product category],\n\n'sales'\n\nWe have to count the distinct number of categories in the product table and then use the filter 'sales' so it will\nreturn only those product categories with products sold.",
    "source": "Final",
    "sourceNumber": 117,
    "legacy": false,
    "image": "/dump-assets/f1-117-116-question.webp",
    "answerImage": "/dump-assets/f1-117-116-answer.webp"
  },
  {
    "id": "f1-118-117",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Microsoft Power BI report. The size of PBIX file is 550 MB. The report is accessed by using an App\n\nworkspace in shared capacity of powerbi.com.\n\nThe report uses an imported dataset that contains one fact table. The fact table contains 12 million rows. The\n\ndataset is scheduled to refresh twice a day at 08:00 and 17:00.\n\nThe report is a single page that contains 15 AppSource visuals and 10 default visuals.\n\nUsers say that the report is slow to load the visuals when they access and interact with the report.\n\nYou need to recommend a solution to improve the performance of the report.\n\nWhat should you recommend?",
    "choices": [
      "Enable visual interactions.",
      "Change any DAX measures to use iterator functions.",
      "Implement row-level security (RLS).",
      "Remove unused columns from tables in the data model."
    ],
    "correct": [
      3
    ],
    "explanation": "Remove unused columns from tables in the data model.\n\nThe question highlights that the Power BI report is slow to load, and the main challenges include:\n\nA large dataset: The fact table contains 12 million rows, contributing significantly to the size of the model\n(550 MB).\n\nHigh visual complexity: The report uses 15 AppSource visuals and 10 default visuals on a single page,\nfurther taxing system resources during rendering.\n\nWhy Option D is Correct:\n\nReducing Model Size:\n\nRemoving unused columns reduces the overall size of the data model, which directly improves performance\nby reducing the amount of data Power BI needs to process.\n\nSmaller model sizes result in faster data retrieval, rendering, and interactions within the report.\n\nPower BI's VertiPaq engine performs better with optimized models.\n\nFocus on Optimization:\n\nUnused columns increase storage and memory requirements but do not add value to the report.\n\nBy removing unnecessary columns, you improve the efficiency of compression and indexing, leading to faster\nloading and improved performance.\n\nWhy Other Options Are Incorrect:\n\nA. Enable visual interactions:\n\nEnabling or disabling visual interactions has minimal impact on overall report performance. While controlling\ninteractions may improve user experience for complex visuals, it does not address the root cause of slow\nloading (large dataset size and visual complexity).\n\nB. Change any DAX measures to use iterator functions:\n\nUsing iterator functions (e.g., SUMX, AVERAGEX) instead of aggregate functions (e.g., SUM, AVERAGE)\ntypically increases computational overhead. This would likely worsen performance rather than improve it.\n\nC. Implement row-level security (RLS):\n\nRLS limits data access based on user roles but does not directly improve performance. It could even increase\nprocessing time if filters are applied to a large dataset.",
    "source": "Final",
    "sourceNumber": 118,
    "legacy": false
  },
  {
    "id": "f1-119-118",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have the Power BI data model shown in the following exhibit.\n\nThe Sales table has the following columns.\n\nThe data model must support the following analysis:\n\n• Total sales by product by month in which the order was placed\n\n• Quantities sold by product by day on which the order was placed\n\n• Number of sales transactions by quarter in which the order was placed\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "1.Removing the LastUpdated column from the Sales table reduces the model size while still supporting the\nrequired analysis.\n\nAnalysis:\nThe LastUpdated column is typically used for tracking record modifications and is not essential for sales\n\nmetrics analysis.\nThe required analysis focuses on sales metrics by product and order dates, so the absence of LastUpdated\ndoes not hinder the analysis.\nConclusion: Yes, removing this column reduces the model size and does not impact the required analysis.\n\n2. Removing the ProductID column from the Sales table reduces the model size while still supporting the\nrequired analysis.\n\nAnalysis:\nThe ProductID column is a key column that links the Sales table to the Product table, allowing analyses by\nproduct.\nWithout ProductID, it would be impossible to perform analyses such as total sales, quantity sold, or number of\ntransactions by product, which is part of the requirement.\nConclusion: No, removing this column would break critical relationships and prevent the required analysis.\n\n3. Removing the ShipDate column from the Sales table reduces the model size while still supporting the\nrequired analysis.\n\nAnalysis:\nThe analysis requirements specify that metrics are based on order dates, not shipping dates.\nSince ShipDate is not required for the specified analyses, it can be removed without affecting the ability to\nperform the required analysis.\nConclusion: Yes, removing this column reduces the model size and does not impact the required analysis.",
    "source": "Final",
    "sourceNumber": 119,
    "legacy": false,
    "image": "/dump-assets/f1-119-118-question.webp",
    "answerImage": "/dump-assets/f1-119-118-answer.webp"
  },
  {
    "id": "f1-120-119",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the\n\ndate and time each complaint occurred. The data in Logged is in the following format: 2018-12-31 at 08:59.\n\nYou need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.\n\nWhat should you do?",
    "choices": [
      "Create a column by example that starts with 2018-12-31 and set the data type of the new column to Date",
      "Create a column by example that starts with 2018-12-31",
      "Apply a transformation to extract the last 11 characters of the Logged column",
      "Add a conditional column that outputs 2018 if the Logged column starts with 2018 and set the data type of the new column to Whole Number"
    ],
    "correct": [
      0
    ],
    "explanation": "Create a column by example that starts with 2018-12-31 and set the data type of the new column to Date\n\nTo analyze complaints by date and use a built-in date hierarchy, you need a column in the proper Date format.\nThe steps in option A fulfill this requirement effectively:\n\nCreate a column by example:\n\nPower BI's \"Add Column by Example\" feature allows you to create a new column based on patterns in the\nexisting data.\n\nIn this case, you provide an example of the desired output (2018-12-31), and Power BI automatically extracts\nand formats the date part from the Logged column (2018-12-31 at 08:59).\n\nSet the data type to Date:\n\nThe newly created column will contain only the date portion (2018-12-31).\n\nSetting the data type to Date enables Power BI to recognize the column as a date, allowing the use of built-in\ndate hierarchies (e.g., Year, Quarter, Month, Day).\n\nWhy not the other options?\n\nB. Create a column by example that starts with 2018-12-31:\n\nThis option omits the step of setting the data type to Date, which is required for using built-in date hierarchies.\n\nC. Apply a transformation to extract the last 11 characters of the Logged column:\n\nExtracting the last 11 characters (at 08:59) does not yield the date portion. This would result in incorrect or\nincomplete data.\n\nD. Add a conditional column that outputs 2018 if the Logged column starts with 2018 and set the data type\nto Whole Number:\n\nCreating a column with the year (2018) alone does not allow for detailed analysis by full date, nor does it\nsupport built-in date hierarchies.",
    "source": "Final",
    "sourceNumber": 120,
    "legacy": false
  },
  {
    "id": "f1-121-120",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a Power BI data model that contains a table named Employees. The table has the following columns:\n\n•Employee Name\n\n•Email Address\n\n•Start Date\n\n•Job Title\n\nYou are implementing dynamic row-level security (RLS).\n\nYou need to create a table filter to meet the following requirements:\n\n•Users must see only their own employee data.\n\n•The DAX expression must work in both Power BI Desktop and the Power BI service.\n\nWhich expression should you use?",
    "choices": [
      "[Email Address] - USERNAME()",
      "[Employee Name] - USERPRINCIPALNAME()",
      "[Employee Name] = USERNAME()",
      "[Email Address] = USERPRINCIPALNAME()"
    ],
    "correct": [
      3
    ],
    "explanation": "To implement dynamic row-level security (RLS) on the Employees table, a table filter must be created. The\ntable filter should be based on the user's email address or user principal name (UPN), as these are unique\nidentifiers for each user.The DAX expression [Email Address] = USERPRINCIPALNAME() will filter the\nEmployees table to only show rows where the Email Address column matches the UPN of the current user.\nThis expression works in both Power BI Desktop and the Power BI service, and will ensure that each user only\nsees their own employee data.",
    "source": "Final",
    "sourceNumber": 121,
    "legacy": false
  },
  {
    "id": "f1-122-121",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou have the Power BI data model shown in the following exhibit.\n\nThe Country table contains the following data.\n\nYou create two row-level security (RLS) roles named Manager and CFO.\n\nYou plan to publish the dataset to the Power BI service.\n\nYou need to create DAX expressions for the RLS filters. The solution must meet the following requirements:\n\n•Each manager must see only the data in the Sales and Human Resources tables for their own country.\n\n•The CFO must be prevented from seeing the data in the Human Resources table.\n\n•The CFO must see the sales data of all countries.\n\nHow should you complete the DAX expressions to meet the requirements? To answer, drag the appropriate\n\nexpressions to the correct targets. Each expression may be used once, more than once, or not at all. You may need\n\nto drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Human Resources > False ()\n\nCountry > [Email] = USERPRINCIPALNAME ()\n\nExplanation:\n\nI would create 2 RLS:\n\n1st with Human Resources > False ()\n\nAdd CFO user\n\n• The CFO must be prevented from seeing the data in the Human Resources table.\n\n• The CFO must see the sales data of all countries.\n\n2nd with Country > [Email] = USERPRINCIPALNAME ()\n\nAdd manger users:\n\n•Each manager must see only the data in the Sales and Human Resources tables for their own country.",
    "source": "Final",
    "sourceNumber": 122,
    "legacy": false,
    "image": "/dump-assets/f1-122-121-question.webp",
    "answerImage": "/dump-assets/f1-122-121-answer.webp"
  },
  {
    "id": "f1-123-122",
    "domain": "Prepare the data",
    "type": "multi",
    "prompt": "You have a Power BI data model that imports data from a Microsoft Excel spreadsheet.\n\nYou use Power Query to load a query that contains both renamed and custom columns.\n\nLater, you attempt to reload the query and receive the following error message.\n\nExpression.Error: The column 'Category' of the table wasn't found.\n\nWhat are two possible causes of the error? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "The column was removed from the source file.",
      "The column was renamed in the source file.",
      "The file is no longer in the specified location.",
      "The data type of the column was changed."
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "When Power Query attempts to reload the data, it follows the steps defined in the query. If it cannot locate a\ncolumn referenced in the query, it generates the error:\n\n\"Expression.Error: The column 'Category' of the table wasn't found.\"\n\nA. The column was removed from the source file\n\nIf the Category column is deleted from the Excel source file, Power Query cannot find it, resulting in the error.\nRemoving a column breaks the query steps that depend on that column.\n\nCorrect\n\nB. The column was renamed in the source file\n\nIf the column Category is renamed in the source file, Power Query will still search for the original name\nspecified in the query steps.\nSince it cannot find the renamed column, the error occurs.\n\nCorrect\n\nC. The file is no longer in the specified location\n\nIf the source file is moved or deleted, you would encounter a \"File not found\" error instead of a missing\ncolumn error.\n\nIncorrect\n\nD. The data type of the column was changed\n\nChanging the data type of the Category column does not affect Power Query’s ability to locate the column.\nIt might result in a data type mismatch error, but it will not lead to the column not being found.\n\nIncorrect",
    "source": "Final",
    "sourceNumber": 123,
    "legacy": false
  },
  {
    "id": "f1-124-123",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI model that contains a table named Sales. The Sales table contains the following columns:\n\n•Order Line ID\n\n•Product ID\n\n•Unit Price\n\n•Order ID\n\n•Quantity\n\nOrders are uniquely identified by using the order ID and can have multiple order lines. Each order line within an\n\norder contains a different product ID.\n\nYou need to write a DAX measure that counts the number of orders.\n\nWhich formula should you use?",
    "choices": [
      "Count('Sales'[Order ID])",
      "CountA('Sales' [Order ID])",
      "CountRows('Sales')",
      "DistinctCount('Sales' [Order ID])"
    ],
    "correct": [
      3
    ],
    "explanation": "Orders are uniquely identified by using the order ID and can have multiple order lines\" - I think the important\nstatement is \"and can have multiple order lines\" which means that the order ID can appear more than once in\nthe table if the order contains more than one products.",
    "source": "Final",
    "sourceNumber": 124,
    "legacy": false
  },
  {
    "id": "f1-125-124",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou are creating a Power BI model in Power BI Desktop.\n\nYou need to create a calculated table named Numbers that will contain all the integers from -100 to 100.\n\nHow should you complete the DAX calculation? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "To create a calculated table named Numbers in Power BI Desktop that contains all the integers from -100 to\n100, you can use the following DAX calculation: Numbers = GENERATESERIES(-100, 100, 1)\n\nThe GENERATESERIES function generates a table of values that starts at the first argument (-100), ends at\nthe second argument (100), and increments by the third argument (1) in this case. The resulting table will\ncontain all the integers from -100 to 100 inclusive. The calculated table is named \"Numbers\" and is created by\nassigning the output of the GENERATESERIES function to it using the \"=\" operator. No confusion, and no need\nto discuss further",
    "source": "Final",
    "sourceNumber": 125,
    "legacy": false,
    "image": "/dump-assets/f1-125-124-question.webp",
    "answerImage": "/dump-assets/f1-125-124-answer.webp"
  },
  {
    "id": "f1-126-125",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a Power BI data model that contains a table named Employees. The table has the following columns:\n\n•Employee Name\n\n•Email Address\n\n•Start Date\n\n•Job Title\n\nYou are implementing dynamic row-level security (RLS).\n\nYou need to create a table filter to meet the following requirements:\n\n•Users must see only their own employee data.\n\n•The DAX expression must work in both Power BI Desktop and the Power BI service.\n\nWhich expression should you use?",
    "choices": [
      "[Employee Name] = USERPRINCIPALNAME()",
      "[Email Address] = USERNAME()",
      "[Employee Name] = USERNAME()",
      "[Email Address] = USERPRINCIPALNAME()"
    ],
    "correct": [
      3
    ],
    "explanation": "The correct answer is D. [Email Address] = USERPRINCIPALNAME(). The expression checks the email address\nof the currently logged-in user against the email address in the Employees table, which should be used as the\nidentifier for each employee. This will ensure that each user can only see their own employee data. The other\noptions may not work in all cases, as the username and user principal name may not always match the email\naddress used as the identifier.",
    "source": "Final",
    "sourceNumber": 126,
    "legacy": false
  },
  {
    "id": "f1-127-126",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI model that contains a table named Date. The Date table contains the following columns:\n\n•Date\n\n•Fiscal Year\n\n•Fiscal Quarter\n\n•Month Name\n\n•Calendar Year\n\n•Week Number\n\n•Month Number\n\n•Calendar Quarter\n\nYou need to create a calculated table based on the Date table. The calculated table must contain only unique\n\ncombinations of values for Calendar Year, Calendar Quarter, and Calendar Month.\n\nWhich DAX function should you include in the table definition?",
    "choices": [
      "ADDCOLUMNS",
      "CALCULATE",
      "SUMMARIZE",
      "DATATABLE"
    ],
    "correct": [
      2
    ],
    "explanation": "SUMMARIZE SUMMARIZE:\" Creates a summary of the input table grouped by the specified columns.\n\"ADDCOLUMNS:\" Returns a table with new columns specified by the DAX expressions.\" Based on this, using\nSUMMARIZE will give us the unique combination we want and don't need to use DAX expressions to create\nthe calculated table.",
    "source": "Final",
    "sourceNumber": 127,
    "legacy": false
  },
  {
    "id": "f1-128-127",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI model that contains the following data.\n\nThe Date table relates to the Sales table by using the Date columns.\n\nYou need to create a calculated table that will contain the following:\n\n•A row for each year\n\n•A column that contains the total sales per year\n\nHow should you complete the DAX calculation? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "The question pertains to creating a calculated table in Power BI that includes a row for each year and a\ncolumn displaying the total sales for that year. To achieve this, the Data Analysis Expressions (DAX) function\nSUMMARIZE is appropriate. This function returns a summary table for the requested groups, applying\nspecified aggregations.\n\nThe correct DAX expression to create the desired calculated table is:\n\nSalesSummary = SUMMARIZE( Sales, Date[Year], \"Total Sales\", SUM(Sales[SalesAmount]))\n\nExplanation:\n\nSUMMARIZE Function: This function groups the Sales table by the Date[Year] column.\nGrouping by Date[Year]: This ensures that the resulting table has one row per year.\nDefining \"Total Sales\": For each year, the expression calculates the sum of Sales[SalesAmount], resulting in a\ncolumn named \"Total Sales\" that contains the total sales for each year.\n\nThis approach aligns with the requirements: a row for each year and a column with the total sales per year.",
    "source": "Final",
    "sourceNumber": 128,
    "legacy": false,
    "image": "/dump-assets/f1-128-127-question.webp",
    "answerImage": "/dump-assets/f1-128-127-answer.webp"
  },
  {
    "id": "f1-129-128",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You use Power Query Editor to import and preview sales data from the years 2020 and 2021 in a Microsoft Excel\n\nfile as shown in the following exhibit.\n\nYou need to shape the query to display the following three columns:\n\n•Month\n\n•Sales\n\n•Year\n\nWhat should you select in Power Query Editor?",
    "choices": [
      "Merge columns",
      "Transpose",
      "Unpivot columns",
      "Pivot column"
    ],
    "correct": [
      2
    ],
    "explanation": "C is correct assuming we are selecting the \"2020\" and \"2021\" columns",
    "source": "Final",
    "sourceNumber": 129,
    "legacy": false,
    "image": "/exhibit-assets/f1-129-128.webp"
  },
  {
    "id": "f1-130-129",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou are creating a Power BI model to analyze inventory.\n\nYou load data into three tables named Date, Product, and Inventory. The Inventory table relates to the Date and\n\nProduct tables by using one-to-many relationships.\n\nInventory data is recorded daily with no exceptions. The correct inventory quantity for a given product in a month is\n\nthe last recorded value for that month.\n\nYou need to write a DAX measure that will show the correct inventory value when a user analyzes inventory by\n\nyear, month, or date.\n\nHow should you complete the measure? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Calculate\n\nLast Date\n\nThe problem requires calculating the last inventory count for a product in a given month, year, or date using\nDAX. Let's analyze the measure in the given image:\n\nMeasure: Last Inventory Count\n\nCALCULATE is the correct function for modifying the filter context.\nThe SUM function aggregates the QuantityAvailable column in the Inventory table.\nLastDate('Date'[Date]) ensures that the measure evaluates the inventory count for the last date in the\ncontext of the filter (month, year,\nor date).\n\nExplanation:\n\nCALCULATE Function:\nPurpose: Used to modify the filter context of a calculation.\nIn this case, it adjusts the calculation to consider only the last date in the filtered time period.\nLastDate('Date'[Date]):\nPurpose: Returns the last date within the filter context.\nIn this case, it ensures the calculation retrieves the inventory count for the last date of the time period in the\ncurrent filter.\nSUM(Inventory[QuantityAvailable]):\nPurpose: Sums the inventory quantity for the date identified by LastDate.\n\nComplete DAX Measure:\n\nLast Inventory Count = CALCULATE( SUM(Inventory[QuantityAvailable]), LastDate('Date'[Date]))\n\nWhy this is correct:\n\nRequirement: The measure should return the last recorded inventory value for a product in a given time\nperiod (year, month, or date).\nLogic: CALCULATE modifies the filter context to focus on the last date, and SUM aggregates the inventory\nquantity for that specific date.",
    "source": "Final",
    "sourceNumber": 130,
    "legacy": false,
    "image": "/dump-assets/f1-130-129-question.webp",
    "answerImage": "/dump-assets/f1-130-129-answer.webp"
  },
  {
    "id": "f1-131-130",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have a Power BI report that imports a date table and a sales table from an Azure SQL database data source.\n\nThe sales table has the following date foreign keys:\n\n•Due Date\n\n•Order Date\n\n•Delivery Date\n\nYou need to support the analysis of sales over time based on all three dates at the same time.\n\nSolution: From the Fields pane, you rename the date table as Due Date. You use a DAX expression to create Order\n\nDate and Delivery Date as calculated tables. You create active relationships between the sales table and each date\n\ntable.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "yes is a correct answer.\n\nThe solution works because creating separate calculated tables for Order Date and Delivery Date, along with\nactive relationships for all three date tables (Due Date, Order Date, Delivery Date), ensures simultaneous\nanalysis of sales over time without requiring complex DAX functions.",
    "source": "Final",
    "sourceNumber": 131,
    "legacy": false
  },
  {
    "id": "f1-132-131",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou are creating a Power BI report that will show the number of current employees over time. The report will use\n\nImport storage mode for all tables.\n\nThe employment data will be imported from Azure SQL Database in a monthly snapshot. The data will be stored in\n\na table named Headcount and will contain the following:\n\n•One row per employee for each month the employee is employed\n\n•In each row, a date key that shows the first day of the month of each snapshot\n\nYou have a related date table that contains dates for the years 2020 to 2030.\n\nYou need to create a semi-additive DAX measure that will return the count of employees for the last available date\n\nin a year, quarter, or month.\n\nHow should you complete the measure? To answer, select the appropriate options in the answer area.",
    "choices": [],
    "correct": [],
    "explanation": "Count Rows ('Headcount')\n\nThis part counts how many rows are in the 'Headcount' table. Each row likely represents an individual\nemployee, so this effectively gives us the total number of employees (i.e., the headcount).\n\nLast Date ('Date'[Date])\n\nThis is a filter argument passed into the CALCULATE function. It returns the latest date in the current filter\ncontext from the 'Date'[Date] column.\n\nWhen used inside CALCULATE, it restricts the calculation to only that one date — the last one. That way, we\nget the headcount as of the most recent date in the dataset.",
    "source": "Final",
    "sourceNumber": 132,
    "legacy": false,
    "image": "/dump-assets/f1-132-131-question.webp",
    "answerImage": "/dump-assets/f1-132-131-answer.webp"
  },
  {
    "id": "f1-133-132",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a query named All Sales that imports sales data into a Power BI model.\n\nYou plan to create a star schema by separating columns into separate queries and performing further\n\ntransformations. The solution must meet the following requirements:\n\n•Use All Sales as the source for three other queries named Sales Fact, Product Dimension, and Customer\n\nDimension.\n\n•Minimize maintenance effort.\n\nWhat should you do to create the Sales Fact query, and for which query should you clear Enable load? To answer,\n\nselect the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Reference the All Sales query.\n\nAll Sales.\n\nReference is the most common way to replicate origninal query.\n\nClear \"enable load\" to \"All Sales\" cause the data of this query is now loaded to other table. It is not necessary\nto load it to Report view anymore.\n\nWe are referencing All Sales for all three tables, and then we are clearing Enable load for All Sales to reduce\nthe data model and increase performance. Referencing will reduce maintenance because the three tables will\nbe derived from the original data and we can keep the transformations to the source data without having to\nmodify three queries.",
    "source": "Final",
    "sourceNumber": 133,
    "legacy": false,
    "image": "/dump-assets/f1-133-132-question.webp",
    "answerImage": "/dump-assets/f1-133-132-answer.webp"
  },
  {
    "id": "f1-134-133",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI model that contains the following data.\n\nThe Date table relates to the Sales table by using the Date columns.\n\nThe model contains the following DAX measure.\n\nTotal Sales = SUM(Sales[Sale])\n\nYou need to create another measure named Previous Quarter to display the sales one quarter before the selected\n\nperiod.\n\nWhich DAX calculation should you use?",
    "choices": [
      "CALCULATE ( [Total Sales], DATEADD (Date[Date], -1, QUARTER ) )",
      "CALCULATE ( [Total Sales], DATESQTD (Date[Date] ) )",
      "TOTALQTD ( [Total Sales], Date[Date] )",
      "CALCULATE ( [Total Sales], PARALLELPERIOD (Date[Date], 1, QUARTER ) )"
    ],
    "correct": [
      0
    ],
    "explanation": "DATEADD is correct. PARALLELPERIOD also calculate one quarter before, but the out come is the total sales\nof three months of previous quarter not only one day or one month of previous quarter.",
    "source": "Final",
    "sourceNumber": 134,
    "legacy": false,
    "image": "/exhibit-assets/f1-134-133.webp"
  },
  {
    "id": "f1-135-134",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Microsoft Power BI report. The size of PBIX file is 550 MB. The report is accessed by using an App\n\nworkspace in shared capacity of powerbi.com.\n\nThe report uses an imported dataset that contains one fact table. The fact table contains 12 million rows. The\n\ndataset is scheduled to refresh twice a day at 08:00 and 17:00.\n\nThe report is a single page that contains 15 AppSource visuals and 10 default visuals.\n\nUsers say that the report is slow to load the visuals when they access and interact with the report.\n\nYou need to recommend a solution to improve the performance of the report.\n\nWhat should you recommend?",
    "choices": [
      "Change any DAX measures to use iterator functions.",
      "Implement row-level security (RLS).",
      "Replace the default visuals with AppSource visuals.",
      "Split the visuals onto multiple pages."
    ],
    "correct": [
      3
    ],
    "explanation": "Correct answer is D:Split the visuals onto multiple pages.\n\nIssue with Performance:\n\nThe report contains 15 AppSource visuals and 10 default visuals on a single page. This increases the\nrendering and loading time because Power BI needs to load all visuals simultaneously when the page is\nopened.\n\nAppSource visuals, in particular, can be slower because they often require more resources compared to\ndefault visuals.\n\nWhy splitting visuals onto multiple pages improves performance:\n\nBy splitting the visuals across multiple pages, Power BI will only load and render the visuals for the currently\nviewed page. This reduces the memory and processing demand when interacting with the report.\n\nWhy other options are not correct:\n\nA. Change any DAX measures to use iterator functions: Iterator functions (SUMX, AVERAGEX, etc.) are\ntypically slower than column-based aggregations like SUM or AVERAGE. This could further degrade\nperformance.\n\nB. Implement row-level security (RLS): RLS is designed to restrict data access based on user roles, but it\ndoes not improve the performance of loading visuals.\n\nC. Replace the default visuals with AppSource visuals: AppSource visuals are often more resource-intensive\nthan default visuals, so this would likely worsen performance.",
    "source": "Final",
    "sourceNumber": 135,
    "legacy": false
  },
  {
    "id": "f1-136-135",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You are reviewing a Power BI data model.\n\nYou have a calculated table that has the following definition.\n\nProductList = INTERSECT ( ProductsGroupA, ProductsGroupB )\n\nYou need to identify the results of the DAX expression.\n\nWhich rows will be returned in ProductList?",
    "choices": [
      "all the rows in ProductsGroupB that have a matching row in ProductsGroupA",
      "all the rows in both tables",
      "all the rows in ProductsGroupA that have a matching row in ProductsGroupB",
      "all the rows in ProductsGroupA that have no matching row in ProductsGroupB."
    ],
    "correct": [
      2
    ],
    "explanation": "all the rows in ProductsGroupA that have a matching row in ProductsGroupB.\n\nThe DAX function INTERSECT returns the common rows between two tables based on their matching values.\n\nHow INTERSECT Works:\n\nIt compares two tables (in this case, ProductsGroupA and ProductsGroupB).\n\nOnly rows that exist in both tables are returned in the result.\n\nKey Characteristics:\n\nIt performs an inner join-like operation between the two tables.\n\nThe result includes rows that are identical in both tables (based on column values).\n\nWhy the Answer is C:\n\nThe calculated table ProductList will include all rows from ProductsGroupA where there is a matching row in\nProductsGroupB.\n\nWhy Other Options Are Incorrect:\n\nA. All the rows in ProductsGroupB that have a matching row in ProductsGroupA:\n\nThis is close, but it implies the result is based only on ProductsGroupB. The result actually includes rows that\nmatch in both tables, regardless of the source table.\n\nB. All the rows in both tables:\n\nThis describes a UNION, not an INTERSECT. INTERSECT only includes rows that exist in both tables.\n\nD. All the rows in ProductsGroupA that have no matching row in ProductsGroupB:\n\nThis describes an EXCEPT operation, not an INTERSECT.",
    "source": "Final",
    "sourceNumber": 136,
    "legacy": false
  },
  {
    "id": "f1-137-136",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI data model that contains two tables named Sales and Date. The Sales table contains three\n\nmeasures named Order Quantity, Product Cost, and Sales Amount.\n\nYou need to create the visual shown in the following exhibit.\n\nIn which section of the Fields well should you place the measures?",
    "choices": [
      "Columns",
      "Rows",
      "Values",
      "Drill through"
    ],
    "correct": [
      2
    ],
    "explanation": "The correct answer is C - Values.\n\nFirstly, this type of visualization is a MATRIX.\n\nIf you do a simple test in PowerBI Desktop, you can see that in the \"Rows\" section, we can't add measures!\n\nMost likely, the names of the measures in the rows of the matrix appear because the measures were put in\n\n\"fields parameteres\" that generated a Calculated Table, and the actual values of the measures appear by\nadding the measures (not from the Calculated Table) in the \"Values\" section.",
    "source": "Final",
    "sourceNumber": 137,
    "legacy": false,
    "image": "/exhibit-assets/f1-137-136.webp"
  },
  {
    "id": "f1-138-137",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have Power BI report that contains the fields shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "To replace all the implicit DAX measures used in the visual:\n\nCorrect Answer: Two explicit measures\nImplicit measures (e.g., sum, average) are created automatically when fields are added to visuals. To replace\nthese, explicit measures must be created manually using DAX. If the visual uses two implicit measures, two\nexplicit measures are required to replace them.\n\nTo change how the Product Cost field is aggregated in additional visuals:\n\nCorrect Answer: Summarization setting\nThe summarization setting controls how numeric fields are aggregated (e.g., sum, average, count). Adjusting\nthis setting changes the default aggregation for the field across all visuals.",
    "source": "Final",
    "sourceNumber": 138,
    "legacy": false,
    "image": "/dump-assets/f1-138-137-question.webp",
    "answerImage": "/dump-assets/f1-138-137-answer.webp"
  },
  {
    "id": "f1-139-138",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI model that contains a table named Employees. The table contains the following columns:\n\n•Employee ID\n\n•First Name\n\n•Last Name\n\n•Department\n\n•Salary\n\nEach employee is uniquely identified by using Employee ID.\n\nYou need to create a DAX measure that will calculate the average salary of all the employees in the sales\n\ndepartment.\n\nWhich DAX expression should you use?",
    "choices": [
      "DISTINCTCOUNT(‘Employees’[Salary])",
      "CALCULATE(DISTINCTCOUNT(‘Employees’[Salary]), ‘Employees’[Department] = “Sales”)",
      "CALCULATE(AVERAGE(‘Employees’[Salary]), ‘Employees’[Department] = “Sales”)",
      "AVERAGE(‘Employees’[Salary])"
    ],
    "correct": [
      2
    ],
    "explanation": "CALCULATE(AVERAGE(‘Employees’[Salary]), ‘Employees’[Department] = “Sales”).\n\nA. DISTINCTCOUNT('Employees'[Salary])\n\nThis counts distinct salary values, not the average, so it doesn't meet the requirement.\n\nB. CALCULATE(DISTINCTCOUNT('Employees'[Salary]), 'Employees'[Department] = \"Sales\")\n\nThis counts distinct salary values within the Sales department, but the requirement is to calculate the\naverage, not the count. Therefore, it's incorrect.\n\nC. CALCULATE(AVERAGE('Employees'[Salary]), 'Employees'[Department] = \"Sales\")\n\nCorrect answer.\n\nThis uses CALCULATE to filter the Employees table to only include those in the Sales department, and\nAVERAGE computes the average salary of the filtered employees.\n\nD. AVERAGE('Employees'[Salary])\n\nThis calculates the average salary for all employees, not just those in the Sales department, so it doesn't meet\nthe requirement.\n\nWhy C is the Correct Answer:\n\nCALCULATE is needed to modify the filter context of the calculation, limiting it to employees in the Sales\ndepartment ('Employees'[Department] = \"Sales\").\n\nAVERAGE calculates the average salary for the filtered dataset.\n\nIn summary, C is the correct solution because it filters the data for the Sales department and calculates the\naverage salary, which is exactly what the question asks for.",
    "source": "Final",
    "sourceNumber": 139,
    "legacy": false
  },
  {
    "id": "f1-140-139",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You use Power Query Editor to preview a query that contains sales order data in the following columns:\n\n•Tax Amount\n\n•Sales Order ID\n\n•Freight Amount\n\n•Subtotal Amount\n\n•Total Item Quantity\n\nThe Sales Order ID column uniquely identifies each sales order. The Subtotal Amount and Total Item Quantity\n\ncolumns are always populated, but the Tax Amount and Freight Amount columns are sometimes null when an\n\norder has no associated amount.\n\nYou need to query the data to identify the following metrics by month:\n\n•The average item quantity per order\n\n•The average freight amount per order\n\n•The maximum item quantity per order\n\nHow should you modify the query?",
    "choices": [
      "In the Total Item Quantity column, replace the null values with 0.",
      "In the Tax Amount column, remove rows that contain null values.",
      "In the Freight Amount column, remove rows that contain null values.",
      "In the Freight Amount column, replace the null values with 0."
    ],
    "correct": [
      3
    ],
    "explanation": "In the Freight Amount column, replace the null values with 0.\n\nTo calculate the required metrics, we need to handle null values appropriately, especially for the Freight\nAmount column, as it can affect the average and other calculations.\n\nRequired Metrics:\n\nAverage item quantity per order:\n\nThis requires all rows to be included, even if Tax Amount or Freight Amount is null. The Total Item Quantity\ncolumn is always populated, so no changes are needed here for this metric.\n\nAverage freight amount per order:\n\nTo calculate the average correctly, you need to ensure that any missing Freight Amount is considered as 0\ninstead of being excluded.\n\nReplacing null values in Freight Amount with 0 allows this metric to reflect the intended values and ensures\naccurate averaging, as nulls would otherwise be ignored in the calculation.\n\nMaximum item quantity per order:\n\nThe Total Item Quantity column is always populated, so we don't need to worry about null values in this column.\nThis metric is not affected by the handling of null values in Freight Amount or Tax Amount.\n\nWhy Other Options Are Incorrect:\n\nA. In the Total Item Quantity column, replace the null values with 0:\n\nThe Total Item Quantity column is always populated, so this step is unnecessary and wouldn't address any\nissue.\n\nB. In the Tax Amount column, remove rows that contain null values:\n\nThe Tax Amount column is not required for the requested metrics (average item quantity per order, average\nfreight amount per order, and maximum item quantity per order). Removing rows with null Tax Amount values\nis unnecessary for these calculations.\n\nC. In the Freight Amount column, remove rows that contain null values:\n\nRemoving rows with null Freight Amount values would exclude orders with no freight amount, which is\nincorrect. Instead, replacing null values with 0 ensures all orders are considered in the calculation of the\naverage freight amount.",
    "source": "Final",
    "sourceNumber": 140,
    "legacy": false
  },
  {
    "id": "f1-141-140",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou use Power Query Editor to import three tables named Customers, Address, and Country.\n\nIn the source system, not every customer has a related address, but every address has a related country.\n\nYou need to merge all the tables into a single query. The solution must optimize query refresh performance.\n\nWhich type of join should you use for each merge operation? To answer, drag the appropriate join types to the\n\ncorrect operations. Each join type may be used once, more than once, or not at all. You may need to drag the split\n\nbar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "1. Join Customers with Address: Left Outer.\n\nA Left Outer Join includes all records from the \"Customers\" table and matches records from the \"Address\"\ntable. If no match is found, the result still includes the customer but with NULL values for the unmatched\naddress fields.\n\nThis is suitable when you want to ensure that all customers are included in the result, even if they don't have\nan associated address.\n\n2. Join Address with Country: Inner.\n\nAn Inner Join includes only the records where there is a match between the \"Address\" and \"Country\" tables.\n\nThis is suitable when you want to show only those addresses that have a valid and matching country.",
    "source": "Final",
    "sourceNumber": 141,
    "legacy": false,
    "image": "/dump-assets/f1-141-140-question.webp",
    "answerImage": "/dump-assets/f1-141-140-answer.webp"
  },
  {
    "id": "f1-142-141",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a Power BI semantic model that contains four queries named Query 1, Query2. Query3, and Query4.\n\nQuery1 loads customer data into the model and is referenced by the other three queries.\n\nYou discover that data refresh for the model is slow.\n\nYou need to improve the data refresh time. The solution must minimize costs.\n\nWhat should you do?",
    "choices": [
      "Run the Table.buffer function in Query1.",
      "Duplicate Query1 to all the other queries.",
      "Reconfigure Query1 as a dataflow entity.",
      "From the Power BI Admin portal, increase the Capacity settings."
    ],
    "correct": [
      0
    ],
    "explanation": "Run the Table.buffer function in Query1.\n\nA. Table.Buffer in Query1\n\nThe Table.Buffer function caches the data from Query1 into memory, preventing repeated loads when\nreferenced by other queries. This improves refresh times and does not increase costs.\n\nCorrect choice.\n\nB. Duplicate Query1 to all other queries\n\nDuplicating Query1 increases data load and slows down refresh times by processing the same data multiple\ntimes.\n\nIncorrect.\n\nC. Reconfigure Query1 as a dataflow entity\n\nConverting Query1 to a dataflow adds complexity and could increase costs. This is not the best option for\nimproving refresh time while minimizing costs.\n\nIncorrect.\n\nD. Increase Capacity settings in Power BI Admin portal\n\nWhile scaling capacity improves performance, it increases costs, which goes against the goal of cost\nminimization.\n\nIncorrect.\n\nFinal Answer: A\n\nUsing the Table.Buffer function in Query1 optimizes refresh performance without incurring additional costs.",
    "source": "Final",
    "sourceNumber": 142,
    "legacy": false
  },
  {
    "id": "f1-143-142",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have an organization dimension named DimOrganizations.\n\nYou have four related tables as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "It is a snowflakeschema and DimOrgSubVertical is the only table that supports a hierarchy model for\nDimOrgVertical\n\nA degenerate dimension refers to a dimension key in a fact table that does not have its own dimension table.\n\nJunk Dimension is a dimension table in a data warehouse that combines several low cardinality flags and\nindicators to improve the efficiency of queries.\n\nA role-playing dimension refers to a single dimension table that is utilized multiple times within a fact table,\neach time representing a different logical role or perspective.\n\nThe one in the exhibit is a SNOWFLAKE SCHEMA (not dimension) as the fact table is related to dim tables\nwhich can be linked to other dim tables.\n\nDimOrgSubVertical is the only table supporting hierarchy model for DimOrgVertical (DimOrganization could\nsupport hierarchy for DimSubVrtical)",
    "source": "Final",
    "sourceNumber": 143,
    "legacy": false,
    "image": "/dump-assets/f1-143-142-question.webp",
    "answerImage": "/dump-assets/f1-143-142-answer.webp"
  },
  {
    "id": "f1-144-143",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI semantic model that contains a table named Opportunity.\n\nThe Opportunity table contains a column named Qualification. The Qualification column contains values between 0\n\nand 1.\n\nYou need to build a new measure to score the opportunities on a scale of low. medium, and high.\n\nHow should you complete the DAX formula? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "The IF.EAGER,HIGH, MEDIUM are the correct answer:\n\nIn Power BI's DAX language, the primary difference between the \"IF\" and \"IF.EAGER\" functions lies in their\nevaluation strategy: \"IF\" only evaluates the expression corresponding to the true or false condition based on\nthe logical test, while \"IF.EAGER\" always evaluates both expressions regardless of the condition, which can\nsometimes lead to performance improvements in specific scenarios where both branches need to be\ncalculated regardless of the outcome.\n\nSee this link:https://learn.microsoft.com/en-us/dax/if-eager-function-dax",
    "source": "Final",
    "sourceNumber": 144,
    "legacy": false,
    "image": "/dump-assets/f1-144-143-question.webp",
    "answerImage": "/dump-assets/f1-144-143-answer.webp"
  },
  {
    "id": "f1-145-144",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a Power BI semantic model that connects to a streaming data source. The data source is updated\n\nfrequently.\n\nYou need to create a Power BI report that meets the following requirements:\n\n•Supports real-time analytics\n\n•Minimizes performance impact on the data source\n\n•Displays the most recent data without performing a data refresh\n\nWhich connectivity mode should you use for the dataset?",
    "choices": [
      "DirectQuery mode",
      "import mode",
      "LiveConnect mode",
      "push mode"
    ],
    "correct": [
      0
    ],
    "explanation": "Live connection and DirectQuery comparisonhttps://learn.microsoft.com/en-us/power-bi/connect-\ndata/service-live-connect-dq-datasetsLive connection is a method that lets you build a report in Power BI\nDesktop without having to build a semantic model for it. The semantic model can dynamically request data\nfrom a data source it's connected to using a method called DirectQuery.When using DirectQuery, your report\nuses Data Analysis Expression (DAX) queries to get data. After the semantic model receives the report's DAX\nquery, it generates another set of queries that are run on your data source, to get the required data. From this\nI am concluding use DirectQuery.",
    "source": "Final",
    "sourceNumber": 145,
    "legacy": false
  },
  {
    "id": "f1-146-145",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI semantic model that contains a table named Item. The Item table contains a column named\n\nQuantity.\n\nYou need to create a DAX query that meets the following requirements:\n\n•The rank of items must be calculated according to the values in Quantity.\n\n•Ranking must NOT be skipped if two or more items have the same value in Quantity.\n\n•If an item is unfiltered, the total of Quantity must display a blank value.\n\nHow should you complete the DAX formula? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "HASONEVALUE.\n\nDENSE.\n\nHASONEVALUE ('Item'[Item]) check if 'item' is filtered to a single value. if not, it returns blank by default.\n\nRank method : DENSE ensure that ranks are not skipped when there are ties.",
    "source": "Final",
    "sourceNumber": 146,
    "legacy": false,
    "image": "/dump-assets/f1-146-145-question.webp",
    "answerImage": "/dump-assets/f1-146-145-answer.webp"
  },
  {
    "id": "f1-147-146",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou use Power Query Editor to pull data from a Microsoft SharePoint Online list.\n\nYou plan to use Advanced Editor to build a Power Query M formula language query.\n\nYou need to create a query that loads the data, expands a column named location, and hides a column named\n\nCountryOrRegion from the dataset.\n\nHow should you complete the query? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct answer is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Table.ExpandRecordColumn.\n\nExpands the \"Location\" column, which contains record values, into a new column called\n\"Location.DisplayName\".\n\nThis transformation flattens complex nested records so you can access their fields directly in table form.\n\nTable.RemoveColumns.\n\nRemoves the \"CountryOrRegion\" column from the dataset.\n\nThis is common when cleaning up data by eliminating unnecessary or redundant fields.",
    "source": "Final",
    "sourceNumber": 147,
    "legacy": false,
    "image": "/dump-assets/f1-147-146-question.webp",
    "answerImage": "/dump-assets/f1-147-146-answer.webp"
  },
  {
    "id": "f1-148-147",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI semantic model that contains two tables as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "1: Single\n\n2. Delete the many to one. Per MS Learn, you should first make the other relationship inactive. Since making it\ninactive is not an option, we must delete:\n\n\"To ensure there’s a default relationship, Power BI Desktop allows only a single active relationship between\ntwo tables at a given time. Therefore, you must first set the current relationship as inactive and then set the\nrelationship you want to be active.\"\n\nhttps://learn.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships",
    "source": "Final",
    "sourceNumber": 148,
    "legacy": false,
    "image": "/dump-assets/f1-148-147-question.webp",
    "answerImage": "/dump-assets/f1-148-147-answer.webp"
  },
  {
    "id": "f1-149-148",
    "domain": "Model the data",
    "type": "multi",
    "prompt": "You create a Power BI report named Summary1.\n\nYou discover that Summary1 is slow.\n\nYou run Performance analyzer to identify performance metrics for Summary1.\n\nWhich two metrics display the execution duration in Performance analyzer? Each correct answer present part of\n\nthe solution.\n\nNOTE: Each correct answer is worth one point.",
    "choices": [
      "Top Operations",
      "DAX query",
      "Server requests",
      "Dependencies",
      "Visual display"
    ],
    "correct": [
      1,
      4
    ],
    "explanation": "B.DAX query.\n\nE.Visual display.\n\nDax and Visual Display from https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-\nperformance-analyzer . Excerpt from the link: Each visual's log information includes the time spent (duration)\nto complete the following categories of tasks:\n\nDAX query - If a DAX query was required, this is the time between the visual sending the query and Analysis\nServices returning the results.\n\nVisual display - This is the time required for the visual to draw on the screen, including the time required to\nretrieve any web images or geocoding.\n\nOther - This is the time required by the visual for preparing queries, waiting for other visuals to complete, or\nperforming other background processing.\n\nEvaluated parameters (preview) - This is the time spent evaluating the field parameters within a visual. Learn\nmore about field parameters (preview).",
    "source": "Final",
    "sourceNumber": 149,
    "legacy": false
  },
  {
    "id": "f1-150-149",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a Microsoft 365 subscription that contains the resources shown in the following table.\n\nYou create a new dashboard that uses row-level security (RLS) filters. You define a new role named Consultants.\n\nTo which resource can you assign the Consultants role?",
    "choices": [
      "Group2",
      "Team1",
      "Sales reports",
      "Group1"
    ],
    "correct": [
      0
    ],
    "explanation": "Correct answer is A:Group2.\n\nA. Group 2. Per Microsoft Learn, here's why:\n\n\"You can use the following groups to set up row-level security:\n\nDistribution Group\n\nMail-enabled Group\n\nMicrosoft Entra Security Group\n\nNote that Microsoft 365 groups aren't supported and can't be added to any roles.\"\n\nhttps://learn.microsoft.com/en-us/fabric/security/service-admin-row-level-security\n\nBecause of this, it should be Group 2.",
    "source": "Final",
    "sourceNumber": 150,
    "legacy": false,
    "image": "/exhibit-assets/f1-150-149.webp"
  },
  {
    "id": "f1-151-150",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI model that contains two tables named Sales and Date. The Sales table relates to the Date\n\ntable by using a many-to-one relationship. The Sales table contains the following columns:\n\n•Date\n\n•Product\n\n•SalesAmount\n\nYou need to create a DAX measure for a rolling 31-day sales total that will return the total sales amount for a\n\nselected date and the previous 30 days.\n\nWhich DAX expression should you use?",
    "choices": [
      "CALCULATE(SUM(Sales[SalesAmount]), DATEADD(Date[Date], -30, DAY))",
      "CALCULATE(SUM(Sales[SalesAmount]), DATESBETWEEN(Date[Date], Max('Date'[Date])-30, Max('Date'[Date])))",
      "CALCULATE(SUM(Sales[SalesAmount]), DATESMTD(Date[Date]))",
      "CALCULATE(SUM(Sales[SalesAmount]), DISTINCTCOUNT(Date[Date]) = 31)"
    ],
    "correct": [
      1
    ],
    "explanation": "CALCULATE(SUM(Sales[SalesAmount]), DATESBETWEEN(Date[Date], Max('Date'[Date])-30,\nMax('Date'[Date])))\n\nDATESBETWEEN creates a continuous range of dates from the selected date back 30 days. So option B is\nmore suitable for calculating a rolling 31-day total because it correctly defines the date range needed for the\ncalculation.\n\nThe DATESBETWEEN function defines a range of dates:\n\nFrom MAX(Date[Date]) - 30 (30 days before the selected date)\n\nTo MAX(Date[Date]) (the selected date).\n\nThis correctly captures all dates in the 31-day rolling window.\n\nwhy not Dateadd:\n\nThe DATEADD function shifts the entire date context backward by 30 days.\n\nThis means the calculation will consider only the values on dates exactly 30 days ago and not the entire\nrolling range of 31 days.",
    "source": "Final",
    "sourceNumber": 151,
    "legacy": false
  },
  {
    "id": "f1-152-151",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You publish a semantic model to the Power BI service. The semantic model contains data from the following data\n\nsources:\n\n•Source1: A Microsoft Excel file stored in Microsoft OneDrive for Business\n\n•Source2: An Azure SQL database on a virtual network\n\n•Source3: A public website\n\nWhich data sources require an on-premises data gateway?",
    "choices": [
      "Source1 only",
      "Source2 only",
      "Source3 only",
      "Source1 and Source2 only",
      "Source2 and Source3 only",
      "Source1, Source2, and Source3"
    ],
    "correct": [
      1
    ],
    "explanation": "Correct answer is B:Source2 only.\n\nYou need a gateway to connect to data sources that are located in a private network, such as an Azure Virtual\nNetwork (Azure VNet). A virtual network, or VNet, is a logically isolated segment of a network that insulates\ntraffic from the public internet. A VNet provides enhanced network security.\n\nhttps://learn.microsoft.com/en-us/power-bi/guidance/powerbi-implementation-planning-data-gateways\n\nExcel file you can access via SharePoint connector and a public site is well... a public site...\n\nAn Azure SQL database inside a virtual network is not publicly accessible by default. It's protected by the\nVNet's network security rules. Therefore, you must use a data gateway to allow Power BI to connect to it. The\ngateway acts as a bridge between the Power BI service and the VNet.\n\nRemember, an on-premises data gateway is required when Power BI needs to access data sources that are\nnot directly accessible over the internet.",
    "source": "Final",
    "sourceNumber": 152,
    "legacy": false
  },
  {
    "id": "f1-153-152",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI semantic model named ModelA that contains the following columns:\n\nAll of the columns use the Text data type.\n\nBased on the model, you create a report named ReportA that contains the following columns:\n\n•OrderID\n\n•OrderDate\n\n•CustomerID\n\n•ShippingAddress\n\nReportA is the only report connected to ModelA.\n\nYou discover that ReportA has performance issues caused by the size of ModelA.\n\nWhat should you do to optimize and reduce the size of ModelA? To answer, select the appropriate options in the\n\nanswer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "1) Changing data type from text to whole number. Explanation: Queries using numerical data types can\nexecute faster than those using text data.\n\n2) Delete the OrderTitle and OrderDescription columns. Explanation: Directly reduces the model size without\naffecting analysis.\n\nhttps://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction",
    "source": "Final",
    "sourceNumber": 153,
    "legacy": false,
    "image": "/dump-assets/f1-153-152-question.webp",
    "answerImage": "/dump-assets/f1-153-152-answer.webp"
  },
  {
    "id": "f1-154-153",
    "domain": "Prepare the data",
    "type": "multi",
    "prompt": "You have a Power BI semantic model that contains two queries.\n\nYou discover that a report based on the model has performance issues.\n\nYou plan to use Power Query to reduce the data loaded to the model.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct answer is worth one point.",
    "choices": [
      "Apply group by and summarize techniques.",
      "Combine the queries by using Append.",
      "Remove unnecessary columns and rows.",
      "Combine the queries by using Merge.",
      "Create a new query group."
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "A. Apply Group By and Summarize Techniques: Aggregating data reduces its size and complexity, improving\nmodel performance.\n\nC. Remove Unnecessary Columns and Rows: Eliminating unused data minimizes the memory and processing\npower needed.\n\nWhy Other Answers Are Incorrect:\n\nB. Combine Queries by Using Append: This merges data, potentially increasing the dataset size.\n\nD. Combine Queries by Using Merge: While useful for combining tables, it doesn’t necessarily reduce data\nsize.\n\nE. Create a New Query Group: This organizes queries but does not directly impact performance or data\nreduction.\n\nReference:\n\nhttps://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction",
    "source": "Final",
    "sourceNumber": 154,
    "legacy": false
  },
  {
    "id": "f1-155-154",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have an on-premises data gateway.\n\nYou need to reduce the amount of data sent through the gateway by semantic models that run in Import storage\n\nmode.\n\nSolution: You create aggregations to summarize results.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "Create aggregations to summarize results.This seems to be saying group and summarize after the data has\ncome through the gateway as an import.This will not reduce the traffic as it has already come through the\ngateway.Answer : B.No.",
    "source": "Final",
    "sourceNumber": 155,
    "legacy": false
  },
  {
    "id": "f1-156-155",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have an on-premises data gateway.\n\nYou need to reduce the amount of data sent through the gateway by semantic models that run in import storage\n\nmode.\n\nSolution: You increase Automatic page refresh intervals.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "1) Nothing to do with On-Prem data gateway2) It can be used with DirectQuery storage mode only.\n\nhttps://learn.microsoft.com/en-us/power-bi/create-reports/desktop-automatic-page-refresh",
    "source": "Final",
    "sourceNumber": 156,
    "legacy": false
  },
  {
    "id": "f1-157-156",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have an on-premises data gateway.\n\nYou need to reduce the amount of data sent through the gateway by semantic models that run in import storage\n\nmode.\n\nSolution: You configure incremental refresh.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "Correct answer is A:Yes.\n\nConfiguring incremental refresh helps reduce the amount of data sent through the on-premises data gateway.\nIt refreshes only the data that has changed, rather than refreshing the entire dataset, which minimizes the\ndata load on the gateway. This solution is effective for models using import storage mode, where the entire\ndataset does not need to be refreshed every time.",
    "source": "Final",
    "sourceNumber": 157,
    "legacy": false
  },
  {
    "id": "f1-158-157",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have an on-premises data gateway.\n\nYou need to reduce the amount of data sent through the gateway by semantic models that run in Import storage\n\nmode.\n\nSolution: You decrease the dashboard cache update frequency.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "The dashboard cache update frequency determines how often Power BI refreshes the dashboard visuals from\nthe dataset. Adjusting this frequency does not directly reduce the amount of data sent through the on-\npremises data gateway for semantic models in Import storage mode.",
    "source": "Final",
    "sourceNumber": 158,
    "legacy": false
  },
  {
    "id": "f1-159-158",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI semantic model named Model1.\n\nYou need to create a measure that will display the sales result for all blue units. The solution must maintain the\n\nexisting filter context.\n\nHow should you complete the DAX expression? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "CALCULATETABLE.\n\nKEEPFILTERS.\n\nCALCULATE evaluates a single expression (like [Sales]) within a modified filter context. In this scenario case,\nyou want to filter the 'Unit'[Color] to \"blue\" while maintaining the existing filter context.\n\nCALCULATETABLE would return a table, which would then need to be aggregated further (e.g., using SUMX),\nmaking it less direct and has a layer of complexity.\n\nSecond one , use KEEPFILTERS is the most appropriate for ensuring that the filter for blue is added to the\nexisting context without overriding it.",
    "source": "Final",
    "sourceNumber": 159,
    "legacy": false,
    "image": "/dump-assets/f1-159-158-question.webp",
    "answerImage": "/dump-assets/f1-159-158-answer.webp"
  },
  {
    "id": "f1-160-159",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI semantic model named Model1 that runs in Import storage mode.\n\nYou need to reduce the size of Model1. The solution must NOT increase report query response times.\n\nWhat should you do?",
    "choices": [
      "Remove unnecessary columns.",
      "Unpivot unnecessary columns.",
      "Rename unnecessary columns.",
      "Change Model1 to DirectQuery storage mode."
    ],
    "correct": [
      0
    ],
    "explanation": "Removing unnecessary columns will directly reduce the model's size by eliminating data that isn't needed.\nThis change won't affect query performance since the excluded data is not part of the model. The others B.\nUnpivot unnecessary columns: Increases model size by adding rows.C. Rename unnecessary columns: Doesn't\nreduce size, only changes labels.D. Change to DirectQuery: May reduce size but can slow down query\nperformance.",
    "source": "Final",
    "sourceNumber": 160,
    "legacy": false
  },
  {
    "id": "f1-161-160",
    "domain": "Model the data",
    "type": "multi",
    "prompt": "You have a Power BI semantic model named Model1 that runs in Import storage mode.\n\nYou need to reduce the size of Model1.\n\nWhich two actions should you perform? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Summarize the detail data.",
      "Upgrade to Power BI premium.",
      "Implement row-level security (RLS).",
      "Optimize the column data types.",
      "Change the active relationships between tables to inactive relationships."
    ],
    "correct": [
      0,
      3
    ],
    "explanation": "A. Summarize the detail data:Since Import mode loads the entire dataset into memory, reducing the amount of\ndetail data (for example, aggregating granular data like daily sales into monthly or yearly totals) can\nsignificantly reduce the size of the model in memory. This approach helps minimize memory usage and\nimproves query performance.D. Optimize the column data types:In Import mode, data is compressed and\noptimized by the VertiPaq storage engine. Using more efficient column data types reduces memory\nconsumption and ensures better compression when the data is loaded into memory. For instance, using\ninteger or decimal data types instead of string can help achieve better compression and optimize\nperformance.\n\nhttps://learn.microsoft.com/en-us/power-bi/connect-data/service-dataset-modes-understand.",
    "source": "Final",
    "sourceNumber": 161,
    "legacy": false
  },
  {
    "id": "f1-162-161",
    "domain": "Model the data",
    "type": "multi",
    "prompt": "You have a Power BI semantic model that contains the following data.\n\nYou need to create a solution that meets the following requirements:\n\n•Presents transaction amount totals for each month for the current and prior year\n\n•Follows the star schema modeling approach\n\n•Minimizes the data model size\n\nWhich three actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Create one-to-many relationships between the tables.",
      "In the Transactions query, delete the TransactionID column.",
      "In the Date query, group by MonthNumber.",
      "In the Transactions query, group by AccountID and MonthStartDate for TransactionDate. Aggregate by summing the TransAmt column.",
      "In the Transactions query, add a column that contains the MonthStartDate value for TransactionDate.",
      "Create many-to-many relationships between the tables."
    ],
    "correct": [
      0,
      3,
      4
    ],
    "explanation": "A. Create one-to-many relationships between the tables.\n\nThe star schema modeling approach involves creating one-to-many relationships between fact tables and\ndimension tables. This ensures an efficient and scalable data model, which is essential for optimizing query\nperformance and maintaining data integrity.\n\nD. In the Transactions query, group by AccountID and MonthStartDate for TransactionDate. Aggregate by\nsumming the TransAmt column.\n\nGrouping by AccountID and MonthStartDate and then aggregating by summing the TransAmt column reduces\nthe number of rows in the fact table. This significantly minimizes the data model size while still providing the\nnecessary transaction amount totals for each month.\n\nE. In the Transactions query, add a column that contains the MonthStartDate value for TransactionDate.\n\nAdding a column that contains the MonthStartDate value for TransactionDate allows for efficient grouping\nand aggregation of transactions by month. This is crucial for presenting transaction amount totals for each\n\nmonth for the current and prior year, meeting the requirement for time-based analysis.",
    "source": "Final",
    "sourceNumber": 162,
    "legacy": false
  },
  {
    "id": "f1-163-162",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI semantic model that contains three tables named Products, OrderHistory, and Date.\n\nThe Products table is a dimension table that contains the following columns:\n\n•ProductID\n\n•ProductName\n\nThe OrderHistory table is a fact table that contains the following columns:\n\n•OrderID\n\n•ProductID\n\n•OrderDate\n\nThe Date table is a dimension table that contains the following columns:\n\n•Year\n\n•Date\n\n•Week\n\n•Month\n\nYou need to define a relationship from Products to OrderHistory and from OrderHistory to Date.\n\nWhich cardinality should you configure? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct answer is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "1. Product and Order History: One-to-Many.\n\nA Product table typically contains unique product IDs, meaning each product appears only once.\n\nThe OrderHistory table stores multiple transactions, where a single product can be sold multiple times,\ncreating multiple entries in OrderHistory for the same product.\n\nThis creates a One-to-Many (1:M) relationship:\n\nOne product can be in many orders.\n\nMany orders can belong to one product.\n\n2.OrderHistory and Date : One-to-One.\n\nThe OrderHistory table records order transactions, including a date for each order.\n\nA Date table generally contains one entry per unique date.\n\nIf each order in OrderHistory corresponds to a unique date entry (i.e., one row per date), a One-to-One\nrelationship is formed.",
    "source": "Final",
    "sourceNumber": 163,
    "legacy": false,
    "image": "/dump-assets/f1-163-162-question.webp",
    "answerImage": "/dump-assets/f1-163-162-answer.webp"
  },
  {
    "id": "f1-164-163",
    "domain": "Model the data",
    "type": "matching",
    "prompt": "You have a Power BI semantic model.\n\nYou need to create a column that will contain year-over-year (YOY) revenue. The column must contain a ratio\n\nof change factor compared to the previous year's monthly revenue.\n\nHow should you complete the DAX formula? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "NEXTYEAR",
      "PARALLELPERIOD",
      "PREVIOUSYEAR",
      "SAMEPERIODLASTYEAR",
      "CALCULATE",
      "DIVIDE",
      "FACT",
      "SUM"
    ],
    "correct": [
      3,
      5
    ],
    "rows": [
      "Prior-year date-set function inside CALCULATE",
      "Function that returns the year-over-year ratio"
    ],
    "explanation": "Correct answer:\n\nDIVIDE\n\ncalculates the % change safely, avoiding division-by-zero errors.\n\nSAMEPERIODLASTYEAR.\n\nThis function returns a set of dates that exactly match the current selection from one year earlier.\n\nExplanation:\n\nHOTSPOT\n\n-\n\nYou have a Power BI semantic model.\n\nYou need to create a column that will contain year-over-year (YOY) revenue. The column must contain a ratio\nof change factor compared to the previous year's monthly revenue.\n\nHow should you complete the DAX formula? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nCorrect answer:",
    "source": "Final",
    "sourceNumber": 164,
    "legacy": false,
    "answerImage": "/dump-assets/f1-164-163-answer.webp"
  },
  {
    "id": "f1-165-164",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou use Microsoft Power BI Desktop to review the data shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Quick measures: These are pre-built calculations that can be quickly added to your data model. They do not\ndirectly impact the configuration of date tables or relationships.\n\nThe Month Start Date column: Marking a table as the date table does not remove specific columns like\nMonthStartDate. It only affects the automatic date hierarchies and time intelligence functions.",
    "source": "Final",
    "sourceNumber": 165,
    "legacy": false,
    "image": "/dump-assets/f1-165-164-question.webp",
    "answerImage": "/dump-assets/f1-165-164-answer.webp"
  },
  {
    "id": "f1-166-165",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI semantic model that contains two tables named Sales and Forecast. Both tables contain a\n\ndate column.\n\nYou need to create a calculated table that will cover the range of dates in both tables.\n\nHow should you complete the DAX expression? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "CALENDAR\n\nThe CALENDAR function generates a table of dates from a start date to an end date.\n\nMINX\n\nMINX is an iterator function that evaluates an expression over a table and returns the minimum value.\n\nMAXX\n\nMAXX is also an iterator function that returns the maximum value of an expression across a table.",
    "source": "Final",
    "sourceNumber": 166,
    "legacy": false,
    "image": "/dump-assets/f1-166-165-question.webp",
    "answerImage": "/dump-assets/f1-166-165-answer.webp"
  },
  {
    "id": "f1-167-166",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI semantic model named Model1 that contains two tables named DimDate and FactSales. There\n\nis an active relationship between DimDate and FactSales. DimDate is marked as the date table. FactSales contains\n\nthe following data.\n\nModel1 contains the following measure.\n\nPrevious Year Sales = CALCULATE([Sales Amount], PREVIOUSYEAR('Date'[Date]))\n\nYou have a report that uses Model1. The report has a single report page that has a page level filter set to May 9,\n\n2024. The result of the Previous Year Sales measure is displayed in a card visual.\n\nWhich value will appear in the card visual?",
    "choices": [
      "10",
      "15",
      "35",
      "60"
    ],
    "correct": [
      3
    ],
    "explanation": "Understanding the Components:\n\nModel Structure\n\nTables:\n\nDimDate: a calendar table (marked as the official date table).\n\nFactSales: contains sales data.\n\nThere is an active relationship between DimDate[Date] and FactSales[Date].\n\nMeasure Definition\n\nDAX\n\nCopy\n\nEdit\n\nPrevious Year Sales = CALCULATE([Sales Amount], PREVIOUSYEAR('Date'[Date]))\n\n[Sales Amount] is assumed to sum the sales from FactSales.\n\nPREVIOUSYEAR('Date'[Date]) generates a new filter context for the entire previous calendar year based on\nthe current filter context.\n\nReport Filter\n\nPage-level filter is set to:\n\njavascript\n\nCopy\n\nEdit\n\n'Date'[Date] = May 9, 2024\n\nSo, the visual initially sees a filter context of May 9, 2024.\n\nHow DAX Works Here\n\nWhat does PREVIOUSYEAR('Date'[Date]) return?\n\nPREVIOUSYEAR takes the current filter context (May 9, 2024), and replaces it with the full calendar year\nbefore that.\n\nTherefore:\n\nyaml\n\nCopy\n\nEdit\n\nPREVIOUSYEAR(May 9, 2024) → Jan 1, 2023 – Dec 31, 2023\n\nThis overrides the page filter and instead filters FactSales to all rows that fall in 2023.\n\nSample FactSales Data (Implied from the Question)\n\nLet's assume this is the FactSales data behind the options:\n\nDate Sales Amount\n\n2023-05-09 10\n\n2023-06-01 15\n\n2023-12-31 35\n\n2024-05-09 60\n\nThe Previous Year Sales measure, when filtered by May 9, 2024, will calculate the sum of all Sales Amount for\n2023, based on the PREVIOUSYEAR logic.\n\nSo:\n\nSum of 2023 entries:\n\n10 (May 9, 2023)\n\n15 (June 1, 2023)\n\n35 (Dec 31, 2023)\n\nTotal = 10 + 15 + 35 = 60",
    "source": "Final",
    "sourceNumber": 167,
    "legacy": false
  },
  {
    "id": "f1-168-167",
    "domain": "Prepare the data",
    "type": "multi",
    "prompt": "You have a Power BI query named Expenses that imports the following data.\n\nUsers only use the date portion of the TransactionDate value when performing data analysis.\n\nYou need to minimize the model size without affecting the analysis.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Change the data type of the TransactionDate column to Date.",
      "Change the data type of the PostDate column to Date.",
      "Remove the PostDate column.",
      "Remove the TransactionID column."
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "A. Change the data type of the TransactionDate column to Date.\n\nReason: Since users only use the date portion of the TransactionDate value, changing the data type to Date\n(from DateTime) will reduce the storage space required for this column, thus minimizing the model size.\n\nC. Remove the PostDate column.\n\nReason: If the PostDate column is not used in any analysis, removing it will help minimize the data model size\nwithout impacting the analysis. Removing unused or redundant columns is an effective way to reduce the\noverall size of the data model.",
    "source": "Final",
    "sourceNumber": 168,
    "legacy": false
  },
  {
    "id": "f1-169-168",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI semantic model that contains two tables named DimCustomer and FactOrderDetails.\n\nThe primary key of DimCustomer is CustomerID.\n\nFactOrderDetails contains a column named CustomerID that can be used to relate to DimCustomer. Multiple rows\n\nin FactOrderDetails possibly have the same CustomerID value.\n\nYou need to create a relationship from FactOrderDetails to DimCustomer. The solution must optimize query\n\nperformance.\n\nWhat should you create?",
    "choices": [
      "an active, single-direction, many-to-one relationship",
      "an inactive, single-direction, one-to-many relationship",
      "an active, single-direction, one-to-many relationship",
      "an active, bi-directional, many-to-one relationship"
    ],
    "correct": [
      0
    ],
    "explanation": "A. an active, single-direction, many-to-one relationship:\n\nactive: Good.\n\nsingle-direction: Good for performance.\n\nmany-to-one: The cardinality is correct if viewed from FactOrderDetails to DimCustomer. However, standard\nPower BI nomenclature often describes it as \"one-to-many\" from DimCustomer to FactOrderDetails. This is\ntechnically correct in terms of which column is the \"many\" side of the foreign key and which is the \"one\" side\nof the primary key.",
    "source": "Final",
    "sourceNumber": 169,
    "legacy": false
  },
  {
    "id": "f1-170-169",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI model that contains a table named Expenses. The table contains the following columns:\n\n•Date\n\n•Amount\n\n•Category\n\n•Expense ID\n\n•Employee ID\n\nExpenses are recorded by employees, and each expense has a unique expense ID.\n\nYou need to create a DAX measure that will calculate the total amount of expenses.\n\nWhich DAX expression should you use?",
    "choices": [
      "Sum(‘Expenses’[Amount])",
      "Max(‘Expenses’[Amount])",
      "Sum(‘Expenses’[Expense ID])",
      "Count(‘Expenses’[Amount])"
    ],
    "correct": [
      0
    ],
    "explanation": "A. Sum(‘Expenses’[Amount]).\n\nThis adds up all the values in the [Amount] column, which is exactly what you want when calculating total\nexpenses.",
    "source": "Final",
    "sourceNumber": 170,
    "legacy": false
  },
  {
    "id": "f1-171-170",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI report with the Edit relationship page open as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Step 1: “If you filter the Code column in Table2, Table1 will [answer choice].”\n\nnot be filtered.\n\nIn Power BI (and similar semantic models), whether Table1 is affected by filtering Table2 depends on the\nrelationship direction between the two tables.\n\nIf no relationship exists between Table1 and Table2, then filtering one does not affect the other.\n\nIf a relationship exists but is single-directional (Table1 → Table2), then filtering Table2 does not propagate\nbackward to Table1.\n\nOnly if there is a bi-directional relationship would filters flow both ways.\n\nSo, unless specifically stated that the relationship is bi-directional, the default assumption is single-\ndirectional, meaning Table1 will not be filtered when you filter Table2.\n\nStep 2: “If you add the fields from both Table1 and Table2 to a table visual, the Code column from Table2 will\ndisplay [answer choice].”\n\na BLANK\n\nWhen you build a table visual that includes columns from unrelated tables (or tables without matching keys in\nthe current filter context):\n\nPower BI tries to match rows based on the model relationships.\n\nIf there’s no relationship, or the current filter context produces no match, the result is BLANK for fields from\nthe unrelated table.",
    "source": "Final",
    "sourceNumber": 171,
    "legacy": false,
    "image": "/dump-assets/f1-171-170-question.webp",
    "answerImage": "/dump-assets/f1-171-170-answer.webp"
  },
  {
    "id": "f1-172-171",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a semantic model named Model1 that contains the following tables.\n\nThere is an active relationship between SaleDate and Date.\n\nThere is an inactive relationship between ShippingDate and Date.\n\nYou need to create a new measure that will display the total amount of sales and support slicing by ShippingDate.\n\nHow should you complete the DAX expression? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "CALCULATE.\n\nCALCULATE is used to modify the filter context of a measure.\n\nIn this case, you're changing the default date relationship used in filtering sales.\n\nUSERELATIONSHIP.\n\nIt's common in models to have multiple date columns (like OrderDate, ShipDate), but only one active\nrelationship is allowed at a time. Others must be activated via USERELATIONSHIP.",
    "source": "Final",
    "sourceNumber": 172,
    "legacy": false,
    "image": "/dump-assets/f1-172-171-question.webp",
    "answerImage": "/dump-assets/f1-172-171-answer.webp"
  },
  {
    "id": "f1-173-172",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a query in Power Query Editor that contains the following data.\n\nYou need to transform the data to appear as shown in the following table.\n\nWhat should you do?",
    "choices": [
      "Split the Classes column into rows by using a delimiter.",
      "Unpivot the Classes column.",
      "Extract the text between delimiters in the Classes column.",
      "Convert the Classes column into a list."
    ],
    "correct": [
      0
    ],
    "explanation": "A. Split the Classes column into rows by using a delimiter.\n\nTransform tab > Split Column > By Delimiter > Advanced Options > Split into Rows\n\nWhy the other options are incorrect:\n\nB. Unpivot the Classes column\n\nUnpivot is used when you have multiple columns that you want to turn into attribute-value rows — not for\nsplitting within a single column.\n\nC. Extract the text between delimiters\n\nExtracting grabs one portion (e.g., first item), but it doesn’t handle multiple values per row.\n\nD. Convert to a list\n\nConverting to a list might be useful in code, but not helpful for data shaping in the UI unless used inside a\ncustom function.",
    "source": "Final",
    "sourceNumber": 173,
    "legacy": false,
    "image": "/exhibit-assets/f1-173-172.webp"
  },
  {
    "id": "f1-174-173",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Microsoft Fabric eventhouse named Eventhouse1 that contains high-velocity and high-volume data\n\nfrom IoT devices.\n\nEventhouse1 can be queried to deliver data to reports in near-real-time (NRT).\n\nYou plan to use Power BI Desktop to create a report that will contain both historical and live data.\n\nYou need to connect to Eventhouse1. The solution must minimize development effort.\n\nWhat should you do?",
    "choices": [
      "Build a composite model.",
      "Use DirectQuery connectivity mode.",
      "Use Import connectivity mode."
    ],
    "correct": [
      0
    ],
    "explanation": "A. Build a composite model: A composite model is a valid solution if you needed to combine data from\nEventhouse1 with data from another source that might be better suited for Import mode, or if you only needed\nto DirectQuery a subset of the Eventhouse data while importing aggregated historical data. However, for a\nsingle high-volume, NRT source that needs both historical and live data, DirectQuery is the most\nstraightforward and minimal-effort approach first.",
    "source": "Final",
    "sourceNumber": 174,
    "legacy": false
  },
  {
    "id": "f1-175-174",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI semantic model that contains the following tables.\n\nYou need to define a relationship from FactSales to DimProduct. The solution must ensure the fastest DAX query\n\nperformance.\n\nWhich cardinality should you use?",
    "choices": [
      "one-to-many",
      "one-to-one",
      "many-to-many",
      "many-to-one"
    ],
    "correct": [
      3
    ],
    "explanation": "D. many-to-one\n\nIn a typical star schema used in Power BI and other BI systems:\n\nFact tables (e.g., FactSales) contain many transactions or events.\n\nDimension tables (e.g., DimProduct) contain unique, descriptive data about a business entity (like products,\ncustomers, etc.).",
    "source": "Final",
    "sourceNumber": 175,
    "legacy": false,
    "image": "/exhibit-assets/f1-175-174.webp"
  },
  {
    "id": "f1-176-175",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou have a Power BI semantic model that contains two tables named Dim Location and Fact Deliveries. The\n\nrelationships between the tables are configured as shown in the following table.\n\nThe model contains one measure that has the following formula.\n\nDeliveries = COUNTROWS(‘Fact Deliveries’)\n\nYou need to create a new measure that counts the number of deliveries based on the destination location.\n\nHow should you complete the DAX expression? To answer, drag the appropriate functions to the correct targets.\n\nEach function may be used once, more than once, or not at all. You may need to drag the split bar between panes\n\nor scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "CALCULATE.\n\nUsed to modify the filter context.\n\nIt changes how the base measure [Deliveries] is evaluated.\n\nUSERELATIONSHIP.\n\nActivates an inactive relationship for this calculation only.\n\nSpecifically, it's saying:\n\n\"When calculating [Deliveries], use the relationship between Location[Location ID] and Fact\nDeliveries[Destination Location ID].\"",
    "source": "Final",
    "sourceNumber": 176,
    "legacy": false,
    "image": "/dump-assets/f1-176-175-question.webp",
    "answerImage": "/dump-assets/f1-176-175-answer.webp"
  },
  {
    "id": "f1-177-176",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou import a Microsoft Excel spreadsheet into Power Query Editor and name the query Sales_Spreadsheet.\n\nSales_Spreadsheet contains the following columns:\n\n•Customer ID\n\n•Customer Name\n\n•Date\n\n•Total Sales Amount\n\nYou plan to use the Sales Spreadsheet query to load two tables named Customer and Sales into the associated\n\nsemantic model. The tables relate to each other on the Customer ID column of each query. The solution must meet\n\nthe following requirements:\n\n•The Customer query must contain the Customer ID and Customer Name columns.\n\n•The Sales query must contain the Customer ID, Date, and Total Sales Amount columns.\n\n•Power Query logic must be consolidated to avoid the duplication of logic across the queries and ensure that only\n\none location is used to update the logic.\n\nYou need to identify how to create the Sales query, and what to do to the Sales_Spreadsheet query before loading\n\nthe model?\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Sales: Reference the Sales_Spreadsheet query.\n\nThis means the Sales query is dependent on or built from the results of the Sales_Spreadsheet query.\n\nIt’s like creating a view over Sales_Spreadsheet.\n\nReferencing is better than duplicating because:\n\nIt avoids creating a copy of the entire query logic.\n\nIt is more efficient, maintains a single source of truth, and makes updates easier.\n\nSales_Spreadsheet: Disable the load to the model.\n\nThis prevents the intermediate query (Sales_Spreadsheet) from being loaded into the data model (i.e., it won’t\nappear in the Fields pane).\n\nIt still executes as a dependency but doesn't consume memory in the final model.\n\nBest practice when the query is used only as a staging or transformation step.",
    "source": "Final",
    "sourceNumber": 177,
    "legacy": false,
    "image": "/dump-assets/f1-177-176-question.webp",
    "answerImage": "/dump-assets/f1-177-176-answer.webp"
  },
  {
    "id": "f1-178-177",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a semantic model that has the relationships shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "role-playing.\n\nA role-playing dimension is one physical table that is used multiple times in a data model to play different\nroles.\n\nnot filter FactOrderDetails.\n\nIn a role-playing scenario, if you filter the base DimDate table (not a specific alias like DimDate_Order,\nDimDate_Shipped), there is no direct relationship from the base table to FactOrderDetails.\n\nSo, applying a filter on DimDate directly will not affect the fact table.",
    "source": "Final",
    "sourceNumber": 178,
    "legacy": false,
    "image": "/dump-assets/f1-178-177-question.webp",
    "answerImage": "/dump-assets/f1-178-177-answer.webp"
  },
  {
    "id": "f1-179-178",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou use Power Query Editor to ingest data into Power BI Desktop.\n\nThe total dataset contains 250,000 rows. All the rows match the format of the data as shown in the following\n\nexhibit.\n\nYou need to optimize the data model size of the table.\n\nWhich type of data should you use for the Value column and the Datetime column? To answer, select the\n\nappropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Value: Whole number.\n\nYou selected the \"Whole number\" data type.\n\nThis means the column will store integer values only (e.g., 10, -5, 0).\n\nNo decimal places or fractions are allowed.\n\nSuitable for:\n\nIDs\n\nCounts (e.g., number of items, quantity sold)\n\nAny numeric value that will never include fractions.\n\nDatetime: Date.\n\nYou selected the \"Date\" data type.\n\nThis means the column will store values in date format only (e.g., 2025-07-04) without time.\n\nSuitable for:\n\nCalendar-based operations (year, month, quarter)\n\nDate hierarchies in visuals\n\nFiltering by dates, not timestamps.",
    "source": "Final",
    "sourceNumber": 179,
    "legacy": false,
    "image": "/dump-assets/f1-179-178-question.webp",
    "answerImage": "/dump-assets/f1-179-178-answer.webp"
  },
  {
    "id": "f1-180-179",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI semantic model that contains a table named Table1. Table1 runs in Import storage mode.\n\nYou need to update the model to change the storage mode of Table1 to DirectQuery.\n\nWhat should you do?",
    "choices": [
      "Delete Table1, and then add the table to the model again in DirectQuery storage mode.",
      "From Power Query Editor, duplicate the query for Table1.",
      "From Model view, change the storage mode of Table1 to DirectQuery.",
      "Add an aggregation table to the model."
    ],
    "correct": [
      0
    ],
    "explanation": "A: Delete Table1, and then add the table to the model again in DirectQuery storage mode — but only under\ncertain conditions.\n\nIn Power BI, you cannot change the storage mode of a table from Import to DirectQuery directly in some\nscenarios. Specifically.\n\nIf a table was originally created using Import mode, you cannot simply switch its mode to DirectQuery from\nthe Model view or Power Query Editor.",
    "source": "Final",
    "sourceNumber": 180,
    "legacy": false
  },
  {
    "id": "f1-181-180",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI semantic model that contains the following tables.\n\nAll the tables use the same data source.\n\nYou need to reduce the number of limited relationships in the model by changing the storage mode of certain\n\ntables. The solution must NOT affect the latency of the data.\n\nWhich storage mode should you select for the Customer and Geography tables? To answer, select the appropriate\n\noptions in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Customer: Dual.\n\nThis setting allows the Customer table to be used flexibly:\n\nIn a report using only Import-mode tables → acts as Import\n\nIn a report with DirectQuery tables → acts as DirectQuery\n\nBest used for dimension tables that relate to both Import and DirectQuery fact tables.\n\nImproves performance by allowing cached queries when possible, and real-time when needed.\n\nGeography: DirectQuery.\n\nAlways queries the source live.\n\nGood for real-time reporting or when data is too large to import.\n\nCan slow performance, especially with complex filters or large datasets.\n\nTypically used for fact tables or frequently updated tables.",
    "source": "Final",
    "sourceNumber": 181,
    "legacy": false,
    "image": "/dump-assets/f1-181-180-question.webp",
    "answerImage": "/dump-assets/f1-181-180-answer.webp"
  },
  {
    "id": "f1-182-181",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a semantic model that contains a table named Sales. The table contains the following columns:\n\n•Order ID\n\n•Product ID\n\n•Sales Date\n\n•Sales Amount\n\nYou need to create a DAX measure that will return the total sales amount for the same dates from the previous\n\nyear.\n\nHow should you complete the measure? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "CALCULATE.\n\nCALCULATE modifies the filter context of a measure.\n\nIt is required whenever you want to evaluate a measure in a different time period or filter scenario.\n\nwe are calculating the SUM of sales but applying a time shift.\n\nSAMEPERIODLASTYEAR.\n\nThis function returns a table of dates for the same period in the previous year.\n\nIt works best when:\n\nA proper date table is present and marked as a date table in the model.\n\nThe current filter context is on dates, months, quarters, etc.\n\nIt ensures accurate alignment even in cases like leap years or different month lengths.",
    "source": "Final",
    "sourceNumber": 182,
    "legacy": false,
    "image": "/dump-assets/f1-182-181-question.webp",
    "answerImage": "/dump-assets/f1-182-181-answer.webp"
  },
  {
    "id": "f1-183-182",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI semantic model that contains the following table named Employees.\n\nAn employee is considered active if the TermDate column for that employee contains no value.\n\nYou need to create a DAX measure that will count the number of active employees.\n\nHow should you complete the DAX expression? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "CALCULATE.\n\nChanges the context in which the calculation is evaluated.\n\nIn this case, it's counting employees under a specific condition.\n\nIS BLANK.",
    "source": "Final",
    "sourceNumber": 183,
    "legacy": false,
    "image": "/dump-assets/f1-183-182-question.webp",
    "answerImage": "/dump-assets/f1-183-182-answer.webp"
  },
  {
    "id": "f1-184-183",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI semantic model that has the tables and relationships shown in the following exhibit.\n\nWhich type of dimension is represented by Dim Address?",
    "choices": [
      "Type 2 slowly changing dimension (SCD)",
      "junk dimension",
      "role-playing dimension",
      "degenerate dimension"
    ],
    "correct": [
      0
    ],
    "explanation": "A. Type 2 slowly changing dimension (SCD)\n\nA Dim Address table typically represents address-related information (e.g., street, city, state, zip, etc.)\nassociated with entities like customers, suppliers, or employees.\n\nIn real-world scenarios, addresses can change over time, and when you want to track historical changes (e.g.,\nwhere a customer lived previously), you use a Type 2 Slowly Changing Dimension (SCD).",
    "source": "Final",
    "sourceNumber": 184,
    "legacy": false,
    "image": "/exhibit-assets/f1-184-183.webp"
  },
  {
    "id": "f1-185-184",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou have a Microsoft Excel spreadsheet that contains the data shown in the following table.\n\nYou plan to build a data model for a Power BI report.\n\nYou need to prepare the data so that it is available to the model in the format shown in the following table.\n\nWhich three actions should you perform in sequence in Power Query Editor? To answer, move the appropriate\n\nactions from the list of actions to the answer area and arrange them in the correct order.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "Step 1: Select the [Department] and [Stage] columns and unpivot the other columns.\nWe unpivot the School1, School2, School3, and the School4 columns.\nYou might want to unpivot data, sometimes called flattening the data, to put it in a matrix format so that all\nsimilar values are in one column.\nExample:\n\nWhen you unpivot, you unpack the attribute-value pairs that represent an intersection point of the new\ncolumns and re-orient them into flattened columns:\n* Values (in blue on the left) are unpivoted into a new column (in blue on the right).\n* Attributes (in green on the left) are unpivoted into a new column (in green on the right) and duplicates are\ncorrespondingly mapped to the new Values column.\nStep 2: Rename the [Attribute] column as [School] and the [Value] column as [Score[,\nStep 3: Group by [Department] and [School] and..\n\nReference:\nhttps://support.microsoft.com/en-us/office/unpivot-columns-power-query-0f7bad4b-9ea1-49c1-9d95-\nf588221c7098",
    "source": "Final",
    "sourceNumber": 185,
    "legacy": false,
    "image": "/dump-assets/f1-185-184-question.webp",
    "answerImage": "/dump-assets/f1-185-184-answer.webp"
  },
  {
    "id": "f1-186-185",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a report that contains a bar chart and a column chart. The bar chart shows customer count by customer\n\nsegment. The column chart shows sales by month.\n\nYou need to ensure that when a segment is selected in the bar chart, you see which portion of the total sales for\n\nthe month belongs to the customer segment.\n\nHow should the visual interactions be set on the column chart when the bar chart is selected?",
    "choices": [
      "highlight",
      "filter",
      "no impact"
    ],
    "correct": [
      0
    ],
    "explanation": "In most visuals, highlighting doesn't remove the unrelated data. Instead it highlights the related data. The rest\nof the data remains visible but dimmed.\n\nNote: By default, visualizations on a report page can be used to cross-filter and cross-highlight the other\nvisualizations on the page. For example, selecting a state on a map visualization highlights the column chart\nand filters the line chart to display only data that applies to that one state.\n\nIncorrect:\n\nNot B: Filters remove all but the data you want to focus on.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-reports-filters-and-highlighting",
    "source": "Final",
    "sourceNumber": 186,
    "legacy": false
  },
  {
    "id": "f1-187-186",
    "domain": "Visualize and analyze the data",
    "type": "multi",
    "prompt": "A user creates a Power BI report named ReportA that uses a custom theme.\n\nYou create a dashboard named DashboardA.\n\nYou need to ensure that DashboardA uses the custom theme. The solution must minimize development effort.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Publish ReportA to Power BI.",
      "From ReportA save the current theme.",
      "Publish ReportA to the Microsoft Power BI Community theme gallery.",
      "From DashboardA, create a custom theme.",
      "From DashboardA, upload a JSON theme."
    ],
    "correct": [
      1,
      4
    ],
    "explanation": "B. From ReportA save the current theme.\n\nE. From DashboardA, upload a JSON theme.\n\nB. From ReportA, save the current theme\n\nReason: Saving the custom theme in ReportA allows you to export and reuse it in other reports or dashboards.\n\nE. From DashboardA, upload a JSON theme\n\nReason: Uploading the saved JSON theme from ReportA to DashboardA applies the custom theme to the\ndashboard.\n\nWhy Other Options Are Incorrect:\n\nA. Publish ReportA to Power BI\n\nPublishing alone does not ensure the custom theme is reused in the dashboard.\n\nC. Publish ReportA to the Microsoft Power BI Community theme gallery\n\nThis is unnecessary for applying the theme to a dashboard.\n\nD. From DashboardA, create a custom theme\n\nThis would require extra effort to create a new theme instead of reusing the one from ReportA.\n\nhttps://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboard-themes\n\nscroll down to part that says JSON themes",
    "source": "Final",
    "sourceNumber": 187,
    "legacy": false
  },
  {
    "id": "f1-188-187",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You need to create a visualization that compares revenue and cost over time.\n\nWhich type of visualization should you use?",
    "choices": [
      "waterfall chart",
      "stacked area chart",
      "line chart",
      "donut chart"
    ],
    "correct": [
      2
    ],
    "explanation": "Line charts can have many different lines, for example both revenue and cost over time.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-line-chart",
    "source": "Final",
    "sourceNumber": 188,
    "legacy": false
  },
  {
    "id": "f1-189-188",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have a report in Power BI Desktop.\n\nYou add a key influencers visual as shown in the exhibit. (Click the Exhibit tab.)\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: adding more fields to Explain By\n\nBox 2: 3\n\n0.30 instead of 0.10. A factor of 3 greater.\n\nmoving fields from explain to expand should not add any new factors in analysis\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers",
    "source": "Final",
    "sourceNumber": 189,
    "legacy": false,
    "image": "/dump-assets/f1-189-188-question.webp",
    "answerImage": "/dump-assets/f1-189-188-answer.webp"
  },
  {
    "id": "f1-190-189",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You build a report to help the sales team understand its performance and the drivers of sales.\n\nThe team needs to have a single visualization to identify which factors affect success.\n\nWhich type of visualization should you use?",
    "choices": [
      "Key influencers",
      "Line and clustered column chart",
      "Q&A",
      "Funnel chart"
    ],
    "correct": [
      0
    ],
    "explanation": "The key influencers visual helps you understand the factors that drive a metric you're interested in. It analyzes\nyour data, ranks the factors that matter, and displays them as key influencers. For example, suppose you want\nto figure out what influences employee turnover, which is also known as churn. One factor might be\nemployment contract length, and another factor might be commute time.\nWhen to use key influencers.\nThe key influencers visual is a great choice if you want to:\nSee which factors affect the metric being analyzed.\nContrast the relative importance of these factors. For example, do short-term contracts affect churn more\nthan long-term contracts?\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers",
    "source": "Final",
    "sourceNumber": 190,
    "legacy": false
  },
  {
    "id": "f1-191-190",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have a table that contains the following three columns:\n\nCity -\n\n✑ Total Sales\n\n✑ Occupation\n\nYou need to create a key influencers visualization as shown in the exhibit. (Click the Exhibit tab.)\n\nHow should you configure the visualization? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Total Sales -\n\nThe key influencers visual helps you understand the factors that drive a metric you're interested in, here Total\nSales. It analyses your data, ranks the factors that matter, and displays them as key influencers.\n\nBox 2: Occupation -\n\nMeasures and summarized columns are automatically analysed at the level of the Explain by fields used.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers",
    "source": "Final",
    "sourceNumber": 191,
    "legacy": false,
    "image": "/dump-assets/f1-191-190-question.webp",
    "answerImage": "/dump-assets/f1-191-190-answer.webp"
  },
  {
    "id": "f1-192-191",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You are using the key influencers visual to identify which factors affect the quantity of items sold in an order.\n\nYou add the following fields to the Explain By field:\n\n✑ Customer Country\n\n✑ Product Category\n\n✑ Supplier Country\n\n✑ Sales Employee\n\n✑ Supplier Name\n\n✑ Product Name\n\n✑ Customer City\n\nThe key influencers visual returns the results shown in the following exhibit.\n\nWhat can you identify from the visual?",
    "choices": [
      "Customers in Austria order 18.8 more units than the average order quantity.",
      "Customers in Boise order 20.37 percent more than the average order quantity.",
      "Product Category positively influences the quantity per order.",
      "Customers in Cork order lower quantities than average."
    ],
    "correct": [
      0
    ],
    "explanation": "Average quantity of units is displayed.\nIncorrect:\nNot B: Average quantity of units is displayed, not percentage.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers",
    "source": "Final",
    "sourceNumber": 192,
    "legacy": false,
    "image": "/exhibit-assets/f1-192-191.webp"
  },
  {
    "id": "f1-193-192",
    "domain": "Visualize and analyze the data",
    "type": "multi",
    "prompt": "You have a report that contains four pages. Each page contains slicers for the same four fields.\n\nUsers report that when they select values in a slicer on one page, the selections are not persisted on other pages.\n\nYou need to recommend a solution to ensure that users can select a value once to filter the results on all the\n\npages.\n\nWhat are two possible recommendations to achieve this goal? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Create a bookmark for each slicer value.",
      "Replace the slicers with report-level filters.",
      "Sync the slicers across the pages.",
      "Replace the slicers with page-level filters.",
      "Replace the slicers with visual-level filters."
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "C: You can sync a slicer and use it on any or all pages in a report.\n\nB: You can set filters at three different levels for the report: visual-level, page-level, and report-level.\n\nNote: Suppose you want your report readers to be able to look at overall sales metrics, but also highlight\nperformance for individual district managers and different time frames. You could create separate reports or\ncomparative charts. You could add filters in the Filters pane. Or you could use slicers. Slicers are another way\nof filtering. They narrow the portion of the dataset that is shown in the other report visualizations.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-report-add-filter\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers",
    "source": "Final",
    "sourceNumber": 193,
    "legacy": false
  },
  {
    "id": "f1-194-193",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a report that includes a card visualization.\n\nYou need to apply the following conditional formatting to the card while minimizing design effort:\n\n✑ For values that are greater than or equal to 100, the font of the data label must be dark red.\n\n✑ For values that are less than 100, the font of the data label must be dark gray.\n\nWhich type of format should you use?",
    "choices": [
      "Color scale",
      "Rules",
      "Field value"
    ],
    "correct": [
      1
    ],
    "explanation": "Finding the conditional formatting in the card visual is a bit tricky. There is no separate option for that. You\nneed to go to the Format tab of the visual, and then expand the Data Label. The right beside the Data Label's\ncolour you need to hover your mouse, and you will find a three dots icon appearing, which if you click on it, you\nwill see Conditional Formatting.\n\nNow in the Conditional Formatting tab, you can apply it in different methods. for example, you can choose\nRules, and then\n\nThe Rules mode will give you the ability to put custom roles as below;\n\nReference:\nhttps://radacad.com/enhance-the-card-visual-in-power-bi-with-conditional-formatting",
    "source": "Final",
    "sourceNumber": 194,
    "legacy": false
  },
  {
    "id": "f1-195-194",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou have a Power BI dashboard named DashboardA that contains a tile named TileA. TileA contains a treemap\n\nvisual from a report named ReportA.\n\nYou need to provide the users of DashboardA with additional tiles that relate to the contents of TileA.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "3>2>1\n\n1. From DashboardA, select the TilaA options, and then select View Insights\n\n2. From Focus mode, review the generated visuals\n\n3.From Focus mode, pin the relevant visuals to DashboardA\n\nSource: https://learn.microsoft.com/en-us/power-bi/consumer/end-user-insights",
    "source": "Final",
    "sourceNumber": 195,
    "legacy": false,
    "image": "/dump-assets/f1-195-194-question.webp",
    "answerImage": "/dump-assets/f1-195-194-answer.webp"
  },
  {
    "id": "f1-196-195",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You are creating a dashboard by using the Power BI service.\n\nYou have an existing report page that contains three charts.\n\nYou need to add the charts to the dashboard while maintaining the interactivity between the charts.\n\nWhat should you do?",
    "choices": [
      "Edit interactions in the report and set all interactions to Filter.",
      "Pin each chart as a tile.",
      "Edit the dashboard theme and pin each chart as a tile.",
      "Pin the report page as a live tile."
    ],
    "correct": [
      3
    ],
    "explanation": "One way to add a new dashboard tile is by pinning an entire report page. This is an easy way to pin more than\none visualization at a time. Also, when you pin an entire page, the tiles are live; you can interact with them\nright there on the dashboard. And changes you make to any of the visualizations back in the report editor, like\nadding a filter or changing the fields used in the chart, are reflected in the dashboard tile as well.\nPinning live tiles from reports to dashboards is only available in Power BI service (app.powerbi.com).\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/service-dashboard-pin-live-tile-from-report",
    "source": "Final",
    "sourceNumber": 196,
    "legacy": false
  },
  {
    "id": "f1-197-196",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou need to create a visual as shown in the following exhibit.\n\nThe indicator color for Total Sales will be based on % Growth to Last Year.\n\nThe solution must use the existing calculations only.\n\nHow should you configure the visual? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Background color -\nTo apply conditional formatting, select a Table or Matrix visualization in Power BI Desktop. In the\nVisualizations pane, right-click or select the down-arrow next to the field in the Values well that you want to\nformat. Select Conditional formatting, and then select the type of formatting to apply.\n\nBox 2: Rules -\nTo format cell background or font color by rules, in the Format by field of the Background color or Font color\ndialog box, select Rules.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-table-formatting",
    "source": "Final",
    "sourceNumber": 197,
    "legacy": false,
    "image": "/dump-assets/f1-197-196-question.webp",
    "answerImage": "/dump-assets/f1-197-196-answer.webp"
  },
  {
    "id": "f1-198-197",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou are using existing reports to build a dashboard that will be viewed frequently in portrait mode on mobile\n\nphones.\n\nYou need to build the dashboard.\n\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "Pin -> open -> edit -> rearrange\n\nStep 1: Pin items from the reports to the dashboard\n\nStep 2: Open the dashboard.\n\nOpen the dashboard to see the pinned live tile,\n\nFrom the nav pane, select the dashboard with the new live tile. There, you can do things like rename, resize,\nlink, and move the pinned report page.\n\nStep 3: Edit the dashboard mobile view\n\nOpen a report in Editing view.\n\nStep 4: Rearrange, resize, or remove items from the mobile layout\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/service-dashboard-pin-live-tile-from-report",
    "source": "Final",
    "sourceNumber": 198,
    "legacy": false,
    "image": "/dump-assets/f1-198-197-question.webp",
    "answerImage": "/dump-assets/f1-198-197-answer.webp"
  },
  {
    "id": "f1-199-198",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You plan to create the chart shown in the following exhibit.\n\nHow should you create the dashed horizontal line denoting the 40th percentile of daily sales for the period shown?",
    "choices": [
      "Add a measure to the visual that uses the following DAX expression. Measure1 = PERCENTILEX.INC (Sales,sales[Total Sales],0.40)",
      "Add a measure to the visual that uses the following DAX expression. Measure1 = PERCENTILEX.EXC (Sales,sales[Total Sales],0.40)",
      "Add a new percentile line that uses Total Sales as the measure and 40% as the percentile.",
      "Create a horizontal line that has a fixed value of 24,000."
    ],
    "correct": [
      2
    ],
    "explanation": "The analytics feature enables you to show percentiles across groups specified along a specific axis.\n1. Click on the analytics tab\n2. Select Percentile\n\n3. You can choose a specific percentile along with other formatting options.\n4. Drag a date or non-numeric dimension into the Axis of a column chart\n\nReference:\nhttps://www.dash-intel.com/powerbi/statistical_functions_percentile.php",
    "source": "Final",
    "sourceNumber": 199,
    "legacy": false,
    "image": "/exhibit-assets/f1-199-198.webp"
  },
  {
    "id": "f1-200-199",
    "domain": "Prepare the data",
    "type": "multi",
    "prompt": "You are building a Power BI report.\n\nUsers will view the report by using their mobile device.\n\nYou need to configure the report to display data based on each user's location.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "From Power Query Editor, detect the data types of the relevant columns.",
      "In Data Category, set the geographic data category for the relevant columns.",
      "Create a hierarchy for columns of the geography data type.",
      "Use the columns of the geography data type in all visuals.",
      "For the relevant columns, set synonyms to match common geographical terms."
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "B: Identify geographic data in your report\n\n1. In Power BI Desktop, switch to Data View Data View icon.\n\n2. Select a column with geographic data \" for example, a City column.\n\n3. On the Modeling tab, select Data Category, then the correct category \" in this example, City.\n\n4. Continue setting geographic data categories for any other fields in the model.\n\nD: Create visuals with your geographic data\n\nSwitch to Report view Report View icon, and create visuals that use the geographic fields in your data.\n\nIn this example, the model also contains a calculated column that brings city and state together in one\ncolumn.\n\nPublish the report to the Power BI service.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/transform-model/desktop-mobile-geofiltering",
    "source": "Final",
    "sourceNumber": 200,
    "legacy": false
  },
  {
    "id": "f1-201-200",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a report that contains a donut chart and a clustered column chart. Interactions between the visuals use\n\nthe default settings.\n\nYou need to modify the report so that when you select a column in the column chart, the donut chart redraws by\n\nusing the data from the selected column.\n\nWhat should you do?",
    "choices": [
      "Select the donut chart and set the column chart interaction to Filter.",
      "Select the column chart and set the donut chart interaction to Filter.",
      "Select the donut chart and set the column chart interaction to None.",
      "Select the column chart and set the donut chart interaction to None."
    ],
    "correct": [
      1
    ],
    "explanation": "Filters remove all but the data you want to focus on.\nNote: Enable the visual interaction controls.\n1. Select a visualization to make it active.\n2. Display the Visual Interactions options.\n3. In Power BI Desktop, select Format > Edit interactions.\n\n4. To display the visualization interaction controls, select Edit interactions. Power BI adds filter and highlight\nicons to all of the other visualizations on the report page.\nWe can see that the tree map is cross-filtering the line chart and the map, and is cross-highlighting the\ncolumn chart. You can now change how the selected visualization interacts with the other visualizations on the\nreport page.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions",
    "source": "Final",
    "sourceNumber": 201,
    "legacy": false
  },
  {
    "id": "f1-202-201",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have a report page that contains the visuals shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: not affect\n\nBox 2: cross-filter -\n\nThe map has the cross-filter icon active.\n\n\"You can only cross-filter line charts, scatter charts, and maps. You can't cross-highlight them\" So Cross-filter\nfor the map\n\nhttps://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions?tabs=powerbi-\ndesktop\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions",
    "source": "Final",
    "sourceNumber": 202,
    "legacy": false,
    "image": "/dump-assets/f1-202-201-question.webp",
    "answerImage": "/dump-assets/f1-202-201-answer.webp"
  },
  {
    "id": "f1-203-202",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You are creating a Power BI report by using Power BI Desktop.\n\nYou need to include a visual that shows trends and other useful information automatically. The visual must update\n\nbased on selections in other visuals.\n\nWhich type of visual should you use?",
    "choices": [
      "Q&A",
      "smart narrative",
      "key influencers",
      "decomposition tree"
    ],
    "correct": [
      1
    ],
    "explanation": "The smart narrative visualization helps you quickly summarize visuals and reports. It provides relevant\ninnovative insights that you can customize.\nUse smart narrative summaries in your reports to address key takeaways, to point out trends, and to edit the\nlanguage and format for a specific audience. In\nPowerPoint, instead of pasting a screenshot of your report's key takeaways, you can add narratives that are\nupdated with every refresh. Your audience can use the summaries to understand the data, get to key points\nfaster, and explain the data to others.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-smart-narrative",
    "source": "Final",
    "sourceNumber": 203,
    "legacy": false
  },
  {
    "id": "f1-204-203",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "In Power BI Desktop, you have a dataset that contains a table.\n\nYou create a table visual on a Power BI report page as shown in the following exhibit.\n\nYou need to configure the visual to display the referenced image instead of the URL in the Plant Image column.\n\nWhat should you do?",
    "choices": [
      "From the Formatting tab, select Values, and then set URL icons to On for the table.",
      "Set the Data category of the Plant Image field to Web URL.",
      "Set the Data type of the Plant Image field to Binary.",
      "Set the Data category of the Plant Image field to Image URL."
    ],
    "correct": [
      3
    ],
    "explanation": "Add images to your report -\n1. Create a column with the URLs of the images. See Considerations later in this article for requirements.\n2. Select that column. On the Column tools ribbon, for Data category, select Image URL.\n3. Add the column to a table, matrix, slicer, or multi-row card.\nStep 3: From powerbi.com, add a tile for Excel1 dataset to DashboardA.\nIn the Power BI service (app.powerbi.com), a dashboard contains tiles pinned from one or more datasets, so\nyou can ask questions about any of the data contained in any of those datasets.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-images-tables\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-tutorial-q-and-a",
    "source": "Final",
    "sourceNumber": 204,
    "legacy": false,
    "image": "/exhibit-assets/f1-204-203.webp"
  },
  {
    "id": "f1-205-204",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou have a Microsoft Excel spreadsheet named Excel1 that contains survey results.\n\nYou have a Power BI dashboard named DashboardA that has Q&A enabled.\n\nYou need to ensure that users who can access DashboardA can ask questions based on the contents of Excel1 and\n\npin visuals based on their queries to\n\nDashboardA. The solution must minimize development time.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "Step 1: [\"The solution must minimize development time\", so:] format the data as a table\n\nStep 2: From powerbi.com, import Excel1 as a dataset.\n\nStep 3: From powerbi.com, add a tile for the Excel1 dataset to DashboarA.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/service-from-excel-to-stunning-report",
    "source": "Final",
    "sourceNumber": 205,
    "legacy": false,
    "image": "/dump-assets/f1-205-204-question.webp",
    "answerImage": "/dump-assets/f1-205-204-answer.webp"
  },
  {
    "id": "f1-206-205",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as\n\nthe axis. Salary is present in the data as a numerical amount representing US dollars.\n\nYou need to create a reference line to show which employees are above the median salary.\n\nSolution: You create a constant line and set the value to .5.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "Instead: You create a percentile line by using the Salary measure and set the percentile to 50%.\nThe median is the middle value or the 50th percentile of a data set.\n\nReference:\nhttps://dash-intel.com/powerbi/statistical_functions_median.php",
    "source": "Final",
    "sourceNumber": 206,
    "legacy": false
  },
  {
    "id": "f1-207-206",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as\n\nthe axis. Salary is present in the data as a numerical amount representing US dollars.\n\nYou need to create a reference line to show which employees are above the median salary.\n\nSolution: You create an average line by using the Salary measure.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "Average is not Median.\nInstead: You create a percentile line by using the Salary measure and set the percentile to 50%.\nThe median is the middle value or the 50th percentile of a data set.\n\nReference:\nhttps://dash-intel.com/powerbi/statistical_functions_median.php",
    "source": "Final",
    "sourceNumber": 207,
    "legacy": false
  },
  {
    "id": "f1-208-207",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as\n\nthe axis. Salary is present in the data as a numerical amount representing US dollars.\n\nYou need to create a reference line to show which employees are above the median salary.\n\nSolution: You create a percentile line by using the Salary measure and set the percentile to 50%.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "The median is the middle value or the 50th percentile of a data set.\n\nReference:\n\nhttps://dash-intel.com/powerbi/statistical_functions_median.php",
    "source": "Final",
    "sourceNumber": 208,
    "legacy": false
  },
  {
    "id": "f1-209-208",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou are profiling data by using Power Query Editor.\n\nYou have a table that contains a column named column1. Column statistics and Value distribution for column1 are\n\nshown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: are 20 values that occur -\n\nThere are 20 unique values.\n\nBox 2: Elm, American -\n\nElm, American is below Peer, flowering species in the graphic.\n\n“Distinct” means number of different values regardless how many times it appears in the dataset. A 'name'\nappears in the list multiple times is counted as 1 distinct count.\n\nWhereas, the “Unique” value is total number of values that only appear once.\n\nDistinct mean : count all the values as 1, even if there was more than one.\n\nUnique mean : count only the value that are not repeated in the particular column",
    "source": "Final",
    "sourceNumber": 209,
    "legacy": false,
    "image": "/dump-assets/f1-209-208-question.webp",
    "answerImage": "/dump-assets/f1-209-208-answer.webp"
  },
  {
    "id": "f1-210-209",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report hosted on powerbi.com that displays expenses by department for department\n\nmanagers.\n\nThe report contains a line chart that shows expenses by month.\n\nYou need to enable users to choose between viewing the report as a line chart or a column chart. The solution must\n\nminimize development and maintenance effort.\n\nWhat should you do?",
    "choices": [
      "Enable report readers to personalize visuals.",
      "Create a separate report page for users to view the column chart.",
      "Add a column chart, a bookmark, and a button for users to choose a visual.",
      "Create a mobile report that contains a column chart."
    ],
    "correct": [
      0
    ],
    "explanation": "Also C is correct but I guess the key is 'The solution must minimize development' so A should be the correct\none\n\nSteps:\n\nLet users personalize visuals in a report\n\nEnable personalization in a report\n\nYou can enable the feature either in Power BI Desktop or the Power BI service. You can also enable it in\nembedded reports.\n\nTo enable the feature in the Power BI (powerbi.com) service, go to Settings for your report.\n\nTurn on Personalize visuals > Save.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-personalize-visuals?tabs=powerbi-\nservice#enable-personalization-in-a-report",
    "source": "Final",
    "sourceNumber": 210,
    "legacy": false
  },
  {
    "id": "f1-211-210",
    "domain": "Visualize and analyze the data",
    "type": "multi",
    "prompt": "You have two Power BI reports named ReportA and ReportB that each uses a distinct color palette.\n\nYou are creating a Power BI dashboard that will include two visuals from each report.\n\nYou need to use a consistent dark theme for the dashboard. The solution must preserve the original colors of the\n\nreports.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Upload a snapshot.",
      "For the browser, set the color preference to dark mode.",
      "When pinning visuals to the dashboard, select Use destination theme.",
      "Select the dark dashboard theme.",
      "Turn on tile flow."
    ],
    "correct": [
      2,
      3
    ],
    "explanation": "D: With dashboard themes you can apply a color theme to your entire dashboard, such as corporate colors,\nseasonal coloring, or any other color theme you might want to apply. When you apply a dashboard theme, all\nvisuals on your dashboard use the colors from your selected theme.\nIn the dashboard pane that appears, select one of the pre-built themes. In the example below, we've selected\nDark.\n\nC: Reports and dashboards with different themes\nIf your report uses a different theme from the dashboard theme, in most cases you can control whether the\nvisual retains the current report theme or uses the dashboard theme.\n* Try re-pinning the tile and selecting Use dashboard theme.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/service-dashboard-themes",
    "source": "Final",
    "sourceNumber": 211,
    "legacy": false
  },
  {
    "id": "f1-212-211",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have a dataset that contains revenue data from the past year.\n\nYou need to use anomaly detection in Power BI to show anomalies in the dataset.\n\nWhat should you configure? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Line -\n\nAnomaly detection is only supported for line chart visuals containing time series data in the Axis field.\n\nBox 2: Populate the axis with a date field\n\nIncorrect:\n\n* Anomaly Explanations doesn't work with 'Show Value As' options.\n\n* Drilling down to go to the next level in the hierarchy isn't supported.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-anomaly-detection",
    "source": "Final",
    "sourceNumber": 212,
    "legacy": false,
    "image": "/dump-assets/f1-212-211-question.webp",
    "answerImage": "/dump-assets/f1-212-211-answer.webp"
  },
  {
    "id": "f1-213-212",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a line chart that shows the number of employees in a department over time.\n\nYou need to see the total salary costs of the employees when you hover over a data point.\n\nWhat should you do?",
    "choices": [
      "Add salary to the drillthrough fields.",
      "Add salary to the visual filters.",
      "Add salary to the tooltips."
    ],
    "correct": [
      2
    ],
    "explanation": "Customize tooltips with aggregation or quick measures\nYou can customize a tooltip by selecting an aggregation function.\nSelect the arrow beside the field in the Tooltips bucket. Then, select from the available options.\n\nNote: Tooltips are an elegant way of providing more contextual information and detail to data points on a\nvisual. You can customize tooltips in Power BI Desktop and in the Power BI service.\nWhen a visualization is created, the default tooltip displays the data point's value and category.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/desktop-custom-tooltips",
    "source": "Final",
    "sourceNumber": 213,
    "legacy": false
  },
  {
    "id": "f1-214-213",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have the visual shown in the Original exhibit. (Click the Original tab.)\n\nYou need to configure the visual as shown in the Modified exhibit. (Click the Modified tab.)\n\nWhat should you add to the visual?",
    "choices": [
      "a measure",
      "an Average line",
      "a trendline",
      "a forecast"
    ],
    "correct": [
      3
    ],
    "explanation": "For example, here's how the current forecast looks like:\n\nReference:\nhttps://spreadsheeto.com/power-bi-forecasting/#intro",
    "source": "Final",
    "sourceNumber": 214,
    "legacy": false,
    "image": "/exhibit-assets/f1-214-213.webp"
  },
  {
    "id": "f1-215-214",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You need to create a visual that enables the adhoc exploration of data as shown in the following exhibit.\n\nWhich type of visual should you use?",
    "choices": [
      "smart narrative",
      "decomposition tree",
      "Q&A",
      "key influencers"
    ],
    "correct": [
      1
    ],
    "explanation": "The decomposition tree visual in Power BI lets you visualize data across multiple dimensions. It automatically\naggregates data and enables drilling down into your dimensions in any order. It is also an artificial intelligence\n(AI) visualization, so you can ask it to find the next dimension to drill down into based on certain criteria.\nThis makes it a valuable tool for ad hoc exploration and conducting root cause analysis.\nExample:\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-decomposition-tree",
    "source": "Final",
    "sourceNumber": 215,
    "legacy": false,
    "image": "/exhibit-assets/f1-215-214.webp"
  },
  {
    "id": "f1-216-215",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "Your company has employees in 10 states.\n\nThe company recently decided to associate each state to one of the following three regions: East, West, and North.\n\nYou have a data model that contains employee information by state. The model does NOT include region\n\ninformation.\n\nYou have a report that shows the employees by state.\n\nYou need to view the employees by region as quickly as possible.\n\nWhat should you do?",
    "choices": [
      "Create a new aggregation that summarizes by state.",
      "Create a new aggregation that summarizes by employee.",
      "Create a new group on the state column and set the Group type to List.",
      "Create a new group on the state column and set the Group type to Bin."
    ],
    "correct": [
      2
    ],
    "explanation": "In Power BI Desktop, you can group data points to help you more clearly view, analyze, and explore data and\ntrends in your visuals.\nExample:\n\nIncorrect:\nNot D: You can also define the bin size to put values into equally sized groups that better enable you to\nvisualize data in ways that are meaningful. This action is often called binning.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/desktop-grouping-and-binning",
    "source": "Final",
    "sourceNumber": 216,
    "legacy": false
  },
  {
    "id": "f1-217-216",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a collection of reports for the HR department of your company.\n\nYou need to create a visualization for the HR department that shows historical employee counts and predicts\n\ntrends during the next six months.\n\nWhich type of visualization should you use?",
    "choices": [
      "ribbon chart",
      "scatter chart",
      "line chart",
      "key influencers"
    ],
    "correct": [
      2
    ],
    "explanation": "The best data for forecasting is time series data or uniformly increasing whole numbers. The line chart has to\nhave only one line.\n\nReference:\nhttps://powerbi.microsoft.com/fr-ca/blog/introducing-new-forecasting-capabilities-in-power-view-for-office-\n365/",
    "source": "Final",
    "sourceNumber": 217,
    "legacy": false
  },
  {
    "id": "f1-218-217",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Microsoft Power BI dashboard. The report used to create the dashboard uses an imported dataset from\n\na Microsoft SQL Server data source.\n\nThe dashboard is shown in the exhibit. (Click the Exhibit tab.)\n\nWhat occurred at 12:03:06 PM?",
    "choices": [
      "A new transaction was added to the data source.",
      "The dashboard tile cache refreshed.",
      "A user added a comment to a tile.",
      "A user pressed F5."
    ],
    "correct": [
      1
    ],
    "explanation": "A tile is a report visual pinned to a dashboard, and dashboard tile refreshes happen about every hour so that\nthe tiles show recent results. You can change the schedule in the dataset settings, as in the screenshot below,\nor force a dashboard update manually by using the Refresh now option.\n\nIf you press F5 or hit the refresh button, the dashboard charts gets updated.\n\nNote: Power BI enables you to go from data to insight to action quickly, yet you must make sure the data in\nyour Power BI reports and dashboards is recent.\n\nKnowing how to refresh the data is often critical in delivering accurate results.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/refresh-data",
    "source": "Final",
    "sourceNumber": 218,
    "legacy": false,
    "image": "/exhibit-assets/f1-218-217.webp"
  },
  {
    "id": "f1-219-218",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou need to create a Power BI report. The first page of the report must contain the following two views:\n\n✑ Sales By Postal Code\n\n✑ Sales by Month\n\nBoth views must display a slicer to select a value for a field named Chain.\n\nThe Sales By Postal Code view must display a map visual as shown in the following exhibit.\n\nThe Sales By Month view must display a column chart visual as shown in the following exhibit.\n\nUsers must be able to switch between the views by using buttons on the report page. The selected Chain field\n\nmust be maintained when switching between views.\n\nWhat is the minimum number of bookmarks required, and which property should you apply to each bookmark? To\n\nanswer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: 2 -\nOne for each visual.\nNote: When you edit a report in Power BI Desktop and the Power BI service, you can add report bookmarks to\ncapture the current state of a report page.\nBookmarks save the current filters and slicers, cross-highlighted visuals, sort order, and so on. When others\nview your report, they can get back to that exact state by selecting your saved bookmark.\n\nBox 2: Display -\nUsers must be able to switch between the views by using buttons on the report page. The selected Chain field\nmust be maintained when switching between views.\nYou can select whether each bookmark will apply Data properties, such as filters and slicers; Display\nproperties, such as spotlight and its visibility; and Current page changes, which present the page that was\nvisible when the bookmark was added. These capabilities are useful when you use bookmarks to switch\nbetween report views or selections of visuals, in which case you'd likely want to turn off data properties, so\nthat filters aren't reset when users switch views by selecting a bookmark.\nNote: When you create a bookmark, the following elements are saved with the bookmark:\n\nThe current page -\n\nFilters -\nSlicers, including slicer type (for example, dropdown or list) and slicer state\nVisual selection state (such as cross-highlight filters)\n\nSort order -\n\nDrill location -\n\nVisibility of an object (by using the Selection pane)\nThe focus or Spotlight mode of any visible object\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks",
    "source": "Final",
    "sourceNumber": 219,
    "legacy": false,
    "image": "/dump-assets/f1-219-218-question.webp",
    "answerImage": "/dump-assets/f1-219-218-answer.webp"
  },
  {
    "id": "f1-220-219",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have the visual shown in the exhibit. (Click the Exhibit tab.)\n\nYou need to show the relationship between Total Cost and Total Sales over time.\n\nWhat should you do?",
    "choices": [
      "Add a play axis.",
      "From the Analytics pane, add an Average line.",
      "Add a slicer for the year.",
      "Create a DAX measure that calculates year-over-year growth."
    ],
    "correct": [
      0
    ],
    "explanation": "When to use a slicer -\n\nSlicers are a great choice when you want to:\n\nDisplay commonly used or important filters on the report canvas for easier access.\n\nMake it easier to see the current filtered state without having to open a drop-down list.\n\nFilter by columns that are unneeded and hidden in the data tables.\n\nCreate more focused reports by putting slicers next to important visuals.\n\nNote: Suppose you want your report readers to be able to look at overall sales metrics, but also highlight\nperformance for individual district managers and different time frames. You could create separate reports or\ncomparative charts. You could add filters in the Filters pane. Or you could use slicers. Slicers are another way\nof filtering. They narrow the portion of the dataset that is shown in the other report visualizations.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers",
    "source": "Final",
    "sourceNumber": 220,
    "legacy": false,
    "image": "/exhibit-assets/f1-220-219.webp"
  },
  {
    "id": "f1-221-220",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have the Power BI dashboard shown in the Dashboard exhibit. (Click the Dashboard tab.)\n\nYou need to ensure that when users view the dashboard on a mobile device, the dashboard appears as shown in the\n\nMobile exhibit. (Click the Mobile tab.)\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Update Dashboard Mobile Layout\n\nBox 2: Resize and move total sales and total quantity\n\nDashboard mobile feature already fits the tiles in the view, and when recreating same scenario you only need\nto work on the 2 cards\n\nIf you use Report Mobile View feature from Power BI desktop, you will have an empty canvas and will need to\nwork on all tiles\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-create-mobile-optimized-report-about",
    "source": "Final",
    "sourceNumber": 221,
    "legacy": false,
    "image": "/dump-assets/f1-221-220-question.webp",
    "answerImage": "/dump-assets/f1-221-220-answer.webp"
  },
  {
    "id": "f1-222-221",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You are building a Power BI report to analyze customer segments.\n\nYou need to identify customer segments dynamically based on the Bounce Rate across dimensions such as source,\n\ngeography, and demographics. The solution must minimize analysis effort.\n\nWhich type of visualization should you use?",
    "choices": [
      "decomposition tree",
      "funnel chart",
      "Q&A",
      "key influencers"
    ],
    "correct": [
      0
    ],
    "explanation": "The decomposition tree visual in Power BI lets you visualize data across multiple dimensions. It automatically\naggregates data and enables drilling down into your dimensions in any order. It is also an artificial intelligence\n(AI) visualization, so you can ask it to find the next dimension to drill down into based on certain criteria.\n\nThis makes it a valuable tool for ad hoc exploration and conducting root cause analysis.\n\nThe decomposition tree visual in Power BI lets you visualize data across multiple dimensions. It automatically\naggregates data and enables drilling down into your dimensions in any order.\n\nThe key influencers visual helps you understand the factors that drive a metric you're interested in. It analyzes\nyour data, ranks the factors that matter, and displays them as key influencers.\n\n*Key influencers does not visualize data across dimensions*\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-decomposition-tree",
    "source": "Final",
    "sourceNumber": 222,
    "legacy": false
  },
  {
    "id": "f1-223-222",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a table that contains sales data and approximately 1,000 rows.\n\nYou need to identify outliers in the table.\n\nWhich type of visualization should you use?",
    "choices": [
      "area chart",
      "scatter plot",
      "pie chart",
      "donut chart"
    ],
    "correct": [
      1
    ],
    "explanation": "Outlier Detection in Power BI using Funnel Plot, which is a scatter plot.\nOutliers are those data points that lie outside the overall pattern of distribution & the easiest way to detect\noutliers is though graphs. Box plots, Scatter plots can help detect them easily.\n\nReference:\nhttps://towardsdatascience.com/this-article-is-about-identifying-outliers-through-funnel-plots-using-the-\nmicrosoft-power-bi-d7ad16ac9ccc",
    "source": "Final",
    "sourceNumber": 223,
    "legacy": false
  },
  {
    "id": "f1-224-223",
    "domain": "Visualize and analyze the data",
    "type": "multi",
    "prompt": "You have a report that contains three pages. One of the pages contains a KPI visualization.\n\nYou need to filter all the visualizations in the report except for the KPI visualization.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Edit the interactions of the KPI visualization.",
      "Add the same slicer to each page and configure Sync slicers.",
      "Edit the interactions of the slicer that is on the same page as the KPI visualization.",
      "Configure a page-level filter.",
      "Configure a report-level filter."
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "Slicers are another way of filtering. They narrow the portion of the dataset that is shown in the other report\nvisualizations.\nControl which page visuals are affected by slicers\nExample: Use visual interactions to keep slicer selections from filtering this chart.\n1. Go to the Overview page of the report, and then select the DM slicer you previously created.\n2. On the Power BI Desktop menu, select the Format menu under Visual Tools, and then select Edit\ninteractions.\n3. Filter controls, each with a Filter and a None option, appear above all the visuals on the page. Initially, the\nFilter option is preselected on all the controls.\n4. Select the None option in the filter control above the Total Sales Variance by FiscalMonth and District\nManager chart to stop the DM slicer from filtering it.\nIncorrect:\nNot D: A page-level filter is used to filter an entire page.\nNot E: A report-level filter is used to filter an entire report.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-report-add-filter",
    "source": "Final",
    "sourceNumber": 224,
    "legacy": false
  },
  {
    "id": "f1-225-224",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have a Power BI visual that uses indicators to show values that are out of range as shown in the following\n\nexhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: a line -\nIncorrect:\n* not line and clustered column\nThe Line and Clustered Column Chart is a combo charts that combines the Line chart and Column chart\ntogether in one visual. By combining these two visuals together, you can make a very quick comparison\n\nbetween two sets of measures.\n\nBox 2: anomaly detection -\nAnomaly detection helps you enhance your line charts by automatically detecting anomalies in your time\nseries data. It also provides explanations for the anomalies to help with root cause analysis. With just a couple\nof clicks, you can easily find insights without slicing and dicing the data.\nExample:\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-anomaly-detection",
    "source": "Final",
    "sourceNumber": 225,
    "legacy": false,
    "image": "/dump-assets/f1-225-224-question.webp",
    "answerImage": "/dump-assets/f1-225-224-answer.webp"
  },
  {
    "id": "f1-226-225",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You are creating a Power BI report to analyze consumer purchasing patterns from a table named Transactions. The\n\nTransactions table contains a numeric field named Spend.\n\nYou need to include a visual that identifies which fields have the greatest impact on Spend.\n\nWhich type of visual should you use?",
    "choices": [
      "Q&A",
      "smart narrative",
      "decomposition tree",
      "key influencers"
    ],
    "correct": [
      3
    ],
    "explanation": "The key influencers visual helps you understand the factors that drive a metric you're interested in. It analyzes\nyour data, ranks the factors that matter, and displays them as key influencers. For example, suppose you want\nto figure out what influences employee turnover, which is also known as churn. One factor might be\nemployment contract length, and another factor might be commute time.\n\nWhen to use key influencers -\nThe key influencers visual is a great choice if you want to:\nSee which factors affect the metric being analyzed.\nContrast the relative importance of these factors. For example, do short-term contracts affect churn more\nthan long-term contracts?\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers",
    "source": "Final",
    "sourceNumber": 226,
    "legacy": false
  },
  {
    "id": "f1-227-226",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou are creating a line chart in a Power BI report as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: an average reference line\n\nWith the Analytics pane in Power BI Desktop, you can add dynamic reference lines to visuals, and provide\nfocus for important trends or insights.\n\nhttps://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane\n\nBox 2: Axis\n\nThe question is about drill-down and not drill-through.\n\nhttps://radacad.com/drill-down-and-up-in-power-bi-explained\n\n\"For example, in the visual below I have Sales Amount as the Value of the column chart, and the Date field\n(Order Date) as the X-Axis.\n\nDate hierarchy in a Power BI visual\n\nThis will lead to seeing drill down/up buttons on the top of the visual (or at the bottom of it if the visual is\ntouched at the very top of the report)\"\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane",
    "source": "Final",
    "sourceNumber": 227,
    "legacy": false,
    "image": "/dump-assets/f1-227-226-question.webp",
    "answerImage": "/dump-assets/f1-227-226-answer.webp"
  },
  {
    "id": "f1-228-227",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a dashboard that contains tiles pinned from a single report as shown in the Original Dashboard exhibit.\n\n(Click the Original Dashboard tab.)\n\nYou need to modify the dashboard to appear as shown in the Modified Dashboard exhibit. (Click the Modified\n\nDashboard tab.)\n\nWhat should you do?",
    "choices": [
      "Change the report theme.",
      "Change the dashboard theme.",
      "Edit the details of each tile.",
      "Create a custom CSS file."
    ],
    "correct": [
      1
    ],
    "explanation": "With dashboard themes you can apply a color theme to your entire dashboard, such as corporate colors,\nseasonal coloring, or any other color theme you might want to apply. When you apply a dashboard theme, all\nvisuals on your dashboard use the colors from your selected theme.\nIncorrect:\n\nNot A: With Power BI Desktop report themes, you can apply design changes to your entire report, such as\nusing corporate colors, changing icon sets, or applying new default visual formatting.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/service-dashboard-themes",
    "source": "Final",
    "sourceNumber": 228,
    "legacy": false,
    "image": "/exhibit-assets/f1-228-227.webp"
  },
  {
    "id": "f1-229-228",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report. The report contains a visual that shows gross sales by date. The visual has anomaly\n\ndetection enabled.\n\nNo anomalies are detected.\n\nYou need to increase the likelihood that anomaly detection will identify anomalies in the report.\n\nWhat should you do?",
    "choices": [
      "Increase the Expected range transparency setting.",
      "Add a data field to the Legend field well.",
      "Increase the Sensitivity setting.",
      "Add a data field to the Secondary values field well."
    ],
    "correct": [
      2
    ],
    "explanation": "C. Increase the sensitivity\n\nIf you increase the sensitivity, the algorithm is more sensitive to changes in your data. In that case, even a\nslight deviation is marked as an anomaly. If you decrease the sensitivity, the algorithm is more selective on\nwhat it considers an anomaly.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-anomaly-detection",
    "source": "Final",
    "sourceNumber": 229,
    "legacy": false
  },
  {
    "id": "f1-230-229",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You maintain a Power BI workspace that contains a supplier quality dashboard. The dashboard contains 10 card\n\nvisuals, two map visuals and five bar chart visuals.\n\nThe dashboard mobile layout is shown in the exhibit. (Click the Exhibit tab.)\n\nYou need to modify the dashboard mobile layout to meet the following requirements:\n\n✑ Only show single-value visuals.\n\n✑ Minimize scrolling.\n\nWhat should you do?",
    "choices": [
      "Decrease the size of the card visuals. Remove the map and bar chart visuals.",
      "Decrease the size of the map and bar chart visuals. Move all the card visuals to the top of the layout.",
      "Remove the card visuals. Increase the size of the map and bar chart visuals.",
      "Move the bar chart visuals to the top of the layout. Remove the map visuals. Decrease the size of the card visuals."
    ],
    "correct": [
      0
    ],
    "explanation": "As the requirements, show only value, so A, remove map and charts.\n\nDecreasing the size of card visuals will minimize the scrolling. Removing maps and chart visuals is a\nrequirement as they are non single-vlaue visuals",
    "source": "Final",
    "sourceNumber": 230,
    "legacy": false,
    "image": "/exhibit-assets/f1-230-229.webp"
  },
  {
    "id": "f1-231-230",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report.\n\nYou have a table named Data1 that contains 10 million rows.\n\nData1 is used in the following visuals:\n\n✑ A card that shows the number of records\n\n✑ A bar chart that shows total transaction amount by territory\n\n✑ A scatter plot that shows transaction amount and profit amount on the axes and points colored by territory\n\nYou need to modify the scatter plot to make it easier for users to identify meaningful patterns. The solution must\n\nnot affect the accuracy of the other visuals.\n\nWhat should you do?",
    "choices": [
      "Add a count field of the transaction amount to the size bucket of the scatter plot.",
      "Add a trend line to the scatter plot.",
      "Enable high-density sampling on the scatter plot.",
      "Apply a row filter to the Data1 query in Power Query Editor."
    ],
    "correct": [
      2
    ],
    "explanation": "This question requires \"modification\" of the scatter plot and what high-density sampling essentially does is to\nemploy methods that capture and represent the underlying data more effectively and eliminates overlapping\npoints.\n\nRemember that the table named Data1 contains 10 million rows. How do you represent all that data in a\nscatter plot in a meaningful pattern for easy understanding and analysis? by use of high density sampling.\n\n\"By definition, high-density data is sampled to create visualizations reasonably quickly that are responsive to\ninteractivity. Too many data points on a visual can bog it down, and can detract from the visibility of trends\".\n\nThis link explains it more: https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-high-density-\nscatter-charts#how-high-density-scatter-charts-work",
    "source": "Final",
    "sourceNumber": 231,
    "legacy": false
  },
  {
    "id": "f1-232-231",
    "domain": "Visualize and analyze the data",
    "type": "multi",
    "prompt": "You have a Power BI workspace named Inventory that contains a dataset, a report, and a dashboard.\n\nYou need to add an additional tile to the dashboard. The tile must show inventory by location. This information is\n\nNOT visualized in the report. The solution must minimize the impact on the report.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Ask a question by using Q&A.",
      "Hide the report page.",
      "Pin the visual to the dashboard.",
      "Use quick insights on the dashboard.",
      "Add the visual to the report."
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "In the Power BI service (app.powerbi.com), a dashboard contains tiles pinned from one or more datasets, so\nyou can ask questions about any of the data contained in any of those datasets. T\n\nThe answer to your question is displayed as an interactive visualization and updates as you modify the\nquestion.\n\nOpen a dashboard and place your cursor in the question box. Even before you start typing, Q&A displays a\nnew screen with suggestions to help you form your question. You see phrases and complete questions\ncontaining the names of the tables in the underlying datasets and may even see complete questions listed if\nthe dataset owner has created featured questions,\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-tutorial-q-and-a",
    "source": "Final",
    "sourceNumber": 232,
    "legacy": false
  },
  {
    "id": "f1-233-232",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have a dataset named Pens that contains the following columns:\n\n✑ Item\n\n✑ Unit Price\n\n✑ Quantity Ordered\n\nYou need to create a visualization that shows the relationship between Unit Price and Quantity Ordered. The\n\nsolution must highlight orders that have a similar unit price and ordered quantity.\n\nWhich type of visualization and which feature should you use? To answer, select the appropriate options in the\n\nanswer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: A scatter plot of Quantity Ordered and Unit Price by item\nA scatter chart shows the relationship between two numerical values.\nNote: Scatter charts are a great choice:\nTo show relationships between two numerical values.\nTo plot two groups of numbers as one series of x and y coordinates.\nTo use instead of a line chart when you want to change the scale of the horizontal axis.\nTo turn the horizontal axis into a logarithmic scale.\n\nTo display worksheet data that includes pairs or grouped sets of values.\nTo show patterns in large sets of data, for example by showing linear or non-linear trends, clusters, and\noutliers.\nTo compare large numbers of data points without regard to time. The more data that you include in a Scatter\nchart, the better the comparisons that you can make.\nBox 2: Automatically find clusters\nScatter charts are a great choice:\n* To show patterns in large sets of data, for example by showing linear or non-linear trends, clusters, and\noutliers.\n\nReference:\nhttps://github.com/Microsoft/powerbi-visuals-corrplot/",
    "source": "Final",
    "sourceNumber": 233,
    "legacy": false,
    "image": "/dump-assets/f1-233-232-question.webp",
    "answerImage": "/dump-assets/f1-233-232-answer.webp"
  },
  {
    "id": "f1-234-233",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report that contains three pages named Page1, Page2, and Page3. All the pages have the\n\nsame slicers.\n\nYou need to ensure that all the filters applied to Page1 apply to Page1 and Page3 only.\n\nWhat should you do?",
    "choices": [
      "On each page, modify the interactions of the slicer.",
      "Enable visibility of the slicers on Page1 and Page3. Disable visibility of the slicer on Page2.",
      "Sync the slicers on Page1 and Page3."
    ],
    "correct": [
      2
    ],
    "explanation": "C. Sync the slicers on Page1 and Page3.\n\nEditing interactions is not securing any selection in any page will be replicated for the same slicer in other\npages.\n\nMaking visible or hiding slicers is also not impacting the selection in other pages (and it would be difficult\nselecting anything in a hidden slicer).\n\nSlicers 1&3 must be synced with equivalent slicers in all pages across the report\n\nSyncing slicers across pages ensures that the filters applied on Page1 are automatically applied to Page3.\nThis allows the slicer selections to affect multiple pages simultaneously. By syncing slicers, you ensure that\nthe same filters are maintained across the desired pages while allowing for flexibility on other pages.\n\nWhy Other Options Are Incorrect:\n\nA. Modify slicer interactions: This would require more manual setup, and you can't fully control which pages\nthe slicer applies to without syncing.\n\nB. Enable visibility on specific pages: This approach only affects visibility, not the slicer's functionality across\npages.",
    "source": "Final",
    "sourceNumber": 234,
    "legacy": false
  },
  {
    "id": "f1-235-234",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report that contains five pages.\n\nPages 1 to 4 are visible and page 5 is hidden.\n\nYou need to create a solution that will enable users to quickly navigate from the first page to all the other visible\n\npages. The solution must minimize development and maintenance effort as pages are added to the report.\n\nWhat should you do first?",
    "choices": [
      "Add a blank button to page 1.",
      "Add a page navigation button to page 1.",
      "Create a bookmark for each page.",
      "Add a bookmark navigation button to page 1."
    ],
    "correct": [
      1
    ],
    "explanation": "B is correct. Add a page navigation button to page 1 because the solution must minimize development and\nmaintenance effort as pages are added to the report. If we add more pages the report they will be\nautomatically added to the page navigator. Only thing is you have to change 'show hidden pages' option to off.\nBut with the bookmark navigator, lot of efforts required to create individual bookmark to each page and also\nthe newly added pages manually. another problem is it also adds all other bookmarks to the navigator which\nwe dont need. so we should create a page navigator button in page 1(and set 'show hidden pages' to off)",
    "source": "Final",
    "sourceNumber": 235,
    "legacy": false
  },
  {
    "id": "f1-236-235",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You build a Power BI report that displays IoT temperature data streaming from a refrigerator.\n\nYou publish the report to the Power BI service.\n\nYou need to be notified when the temperature rises above four degrees Celsius.\n\nWhat should you do?",
    "choices": [
      "Set an alert on a KPI visual in the report.",
      "Pin a card visual to a dashboard and create a subscription.",
      "Pin a card visual to a dashboard and set an alert on the tile.",
      "Pin a report page to a dashboard and set an alert on the page."
    ],
    "correct": [
      2
    ],
    "explanation": "You first have to pin a one-value visual to the dashboard (Card/KPI/Gauge) and then you can set an alert on it's\nvalue. You can't set alerts on a report or whole report pages pinned to the dashboard.",
    "source": "Final",
    "sourceNumber": 236,
    "legacy": false
  },
  {
    "id": "f1-237-236",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have the dashboard shown in the following exhibit.\n\nYou need to modify the dashboard to display as shown in the following exhibit.\n\nWhat should you do?",
    "choices": [
      "Create and apply a custom dashboard theme.",
      "Change the colors of the visuals in the report.",
      "Apply the Dark dashboard theme.",
      "Upload a snapshot image of the dashboard."
    ],
    "correct": [
      0
    ],
    "explanation": "The visual colors can't be changed on the dashboard from a report after the visual has already been pinned.\nApplying a dashboard custom theme will do it.",
    "source": "Final",
    "sourceNumber": 237,
    "legacy": false,
    "image": "/exhibit-assets/f1-237-236.webp"
  },
  {
    "id": "f1-238-237",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You need to create a Power BI theme that will be used in multiple reports. The theme will include corporate\n\nbranding for font size, color, and bar chart formatting.\n\nWhat should you do?",
    "choices": [
      "From Power BI Desktop, customize the current theme.",
      "From Power BI Desktop, use a built-in report theme.",
      "Create a theme as a PBIVIZ file and import the theme into Power BI Desktop.",
      "Create a theme as a JSON file and import the theme into Power BI Desktop."
    ],
    "correct": [
      3
    ],
    "explanation": "D. Create a theme as a JSON file and import the theme into Power BI Desktop.\n\nTo create a Power BI theme that can be used across multiple reports and workspaces, the best approach\nwould be to create a theme as a JSON file and then import it into Power BI Desktop. This will allow you to\ndefine the corporate branding for font size, color, and bar chart formatting in a single file, which can then be\neasily imported into all the reports that require it.\n\nTo create a theme as a JSON file, you can use the built-in Theme Generator tool in Power BI or create the file\nmanually. Once you have the JSON file, you can import it into Power BI Desktop by going to the \"Switch\nTheme\" menu and selecting \"Import Theme.\" From there, you can select the JSON file and apply the theme to\nthe current report.\n\nA seems to be correct but D is more complete solution, as you have to be able to use it in multiple reports. D\ndoes not say how you create the JSON file, though. You can create it by customizing current theme in one of\nthe reports and then exporting it as JSON.",
    "source": "Final",
    "sourceNumber": 238,
    "legacy": false
  },
  {
    "id": "f1-239-238",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report that contains one page. The page contains two line charts and one bar chart.\n\nYou need to ensure that users can perform the following tasks for all three visuals:\n\n• Switch the measures used in the visuals.\n\n• Change the visualization type.\n\n• Add a legend.\n\nThe solution must minimize development effort.\n\nWhat should you do?",
    "choices": [
      "Create a bookmark for each acceptable combination of visualization type, measure, and legend in the bar chart.",
      "Edit the interactions between the three visuals.",
      "Enable personalization for the report.",
      "Enable personalization for each visual."
    ],
    "correct": [
      2
    ],
    "explanation": "Personalization can be enabled for each visual or the entire report. Here we have a single page report with 3\nvisuals and all three visuals need personalization, the answer is 'enable personalization for the entire report'\nto minimize development efforts.\n\nEnabling personalization allows users to modify the visuals in the report, including switching measures,\nchanging visualization types, and adding legends. This feature minimizes development effort by letting users\n\ncustomize the visuals according to their preferences without requiring additional setup or bookmarks.\n\nWhy Other Options Are Incorrect:\n\nA. Create a bookmark for each combination: This requires creating multiple bookmarks for all possible\ncombinations, increasing complexity.\n\nB. Edit interactions between visuals: This helps with visual interactivity but doesn't directly allow users to\nchange measures or types.\n\nD. Enable personalization for each visual: This is not necessary as enabling personalization for the report\ncovers all visuals.",
    "source": "Final",
    "sourceNumber": 239,
    "legacy": false
  },
  {
    "id": "f1-240-239",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as\n\nthe axis. Salary is present in the data as a numerical amount representing US dollars.\n\nYou need to create a reference line to show which employees are above the median salary.\n\nSolution: You create a median line by using the Salary measure.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "Answer is Yes\n\nWe can definitely create a median line for the measure of salary (Tested)\n\nAlso the other solution in this series is create a percentile line at 50% for the salary measure because\npercentile value at 50 % is exactly equal to the median value.",
    "source": "Final",
    "sourceNumber": 240,
    "legacy": false
  },
  {
    "id": "f1-241-240",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou have a Power BI report that contains a table visual with a measure named Revenue. The Revenue measure\n\nreturns values within a range of 0 to 5.\n\nYou need to format the visual so that the Revenue column displays a specific background color based on the value\n\nrange shown in the following table.\n\nWhich three actions should you perform in sequence in Power BI Desktop? To answer, move the appropriate\n\nactions from the list of actions to the answer area and arrange them in the correct order.",
    "choices": [],
    "correct": [],
    "explanation": "To apply conditional formatting to the Revenue column in Power BI, follow these steps:\n\nOpen the Background color dialog: Click on the Revenue column and open the formatting options.\nSet Format style to Rules: This allows you to create rules for different value ranges.\nAdd and configure new rules: Define the color for each value range (e.g., setting one color for low revenue,\nanother for high revenue).",
    "source": "Final",
    "sourceNumber": 241,
    "legacy": false,
    "image": "/dump-assets/f1-241-240-question.webp",
    "answerImage": "/dump-assets/f1-241-240-answer.webp"
  },
  {
    "id": "f1-242-241",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report that contains four pages.\n\nAll the pages contain a slicer for a field named Country.\n\nYou need to ensure that when a user selects a country on page 1, the selection is retained on page 2 and page 3.\n\nThe solution must prevent page 4 from being affected by selections on the other pages.\n\nWhat should you do?",
    "choices": [
      "Remove the Country slicer from page 1, page 2, and page 3. Add the Country field to the page-level filters.",
      "Remove the Country slicer from page 1, page 2, and page 3. Add the Country field to the report-level filters.",
      "Move the Country slicer from page 2 and page 3 to page 1.",
      "Sync the Country slicer on page 1, page 2, and page 3."
    ],
    "correct": [
      3
    ],
    "explanation": "Sync the Country slicer on page 1, page 2, and page 3.\n\nSyncing the Country slicer across pages ensures that the selection made on Page 1 will be retained on Page 2\nand Page 3. The Country slicer on Page 4 will not be affected, as it is not synchronized with the other pages.\n\nWhy Other Options Are Incorrect:\n\nA and B: Using filters at the page or report level doesn’t give the flexibility of controlling slicer behavior\nacross individual pages.\n\nC: Moving the slicer to Page 1 only doesn't address the requirement to apply slicer selections across pages.",
    "source": "Final",
    "sourceNumber": 242,
    "legacy": false
  },
  {
    "id": "f1-243-242",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou use Power BI Desktop to create a Power BI data model and a blank report.\n\nYou need to add the Word Cloud visual shown in the following exhibit to the report.\n\nThe solution must minimize development effort.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct\n\norder.",
    "choices": [],
    "correct": [],
    "explanation": "1. From Power BI Desktop, get the Word Cloud visual from Microsoft AppSource\n\n2. Populate the Category, Value, and Excludes fields\n\n3. Format the data colors and title\n\n(Colors in the Exhibit are different from the default colours)\n\nFrom Power BI Desktop, get the Word Cloud visual from Microsoft AppSource:\n\nClick on the ellipsis (three dots) in the Visualizations pane, select Get more visuals, and search for Word\nCloud in the AppSource.\n\nPopulate the Category, Value, and Excludes fields:\n\nCategory: The field representing the words you want to visualize.\n\nValue: The field representing the size of the words (e.g., frequency).\n\nExcludes: Any words you wish to exclude from the visual.\n\nFormat the data colors and title:\n\nYou can customize the colors for the words and adjust the title to suit your needs.\n\nWhy This Works:\n\nThis method gives you full control over how the Word Cloud is populated and formatted within Power BI.",
    "source": "Final",
    "sourceNumber": 243,
    "legacy": false,
    "image": "/dump-assets/f1-243-242-question.webp",
    "answerImage": "/dump-assets/f1-243-242-answer.webp"
  },
  {
    "id": "f1-244-243",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou have a Power BI report that contains five bookmarks.\n\nYou need to add an object to the report from which users can navigate between three specific bookmarks.\n\nHow should you complete the task? To answer, drag the appropriate actions to the correct steps. Each action may\n\nbe used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view\n\ncontent.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Second step: Group the three bookmarks\n\nThird step: Change the Bookmark property for the button.",
    "source": "Final",
    "sourceNumber": 244,
    "legacy": false,
    "image": "/dump-assets/f1-244-243-question.webp",
    "answerImage": "/dump-assets/f1-244-243-answer.webp"
  },
  {
    "id": "f1-245-244",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You plan to use Power BI to create sales invoices for customers. The solution must meet the following\n\nrequirements:\n\n•Sales invoices must be exported in a PDF format.\n\n•The PDF exports must show all columns and rows clearly.\n\nWhat should you create?",
    "choices": [
      "a paginated report that contains a tablix",
      "a dashboard that contains a table",
      "an interactive report that contains a table",
      "an interactive report that contains a matrix"
    ],
    "correct": [
      0
    ],
    "explanation": "a paginated report that contains a tablix\n\nA paginated report is the best option for creating invoices in Power BI because it allows for precise control\nover the layout, ensuring that all columns and rows are visible in the exported PDF format. The tablix is a\nflexible data region that can handle rows and columns, which is ideal for displaying invoice details in a clear,\nstructured manner.\n\nWhy Other Options Are Incorrect:\n\nB, C, D: Interactive reports (dashboards or reports with tables or matrices) are not suitable for static exports in\nPDF format, as they focus on dynamic and interactive viewing rather than structured page layout.",
    "source": "Final",
    "sourceNumber": 245,
    "legacy": false
  },
  {
    "id": "f1-246-245",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou have a Power BI report that contains three pages. The pages are used to analyze sales across various\n\ncountries.\n\nYou add a slicer named Country to each page of the report.\n\nYou need to configure the report to meet the following requirements:\n\n•When a user selects a country on the first page, the report must filter the other pages.\n\n•The second and third pages must display only the filtered results.\n\nWhich task should you perform for each requirement? To answer, drag the appropriate task to the correct\n\nrequirement. Each task may be used once, more than once, or not at all. You may need to drag the split bar\n\nbetween panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "- Configure the Country slicer to sync across all the pages\n\n- Hide the Country slicer on the second and third pages\n\nWhen first page is filtered by country, the other two need to reflect the filter. Configure the country slicer to\nsync across all the pages will satisfy both questions. Hiding the country slicer from last two pages, is more\nabout user experience and report design than functionality required to meet the given requirements. In the\ninstructions it says that the same task may be used multiple times.",
    "source": "Final",
    "sourceNumber": 246,
    "legacy": false,
    "image": "/dump-assets/f1-246-245-question.webp",
    "answerImage": "/dump-assets/f1-246-245-answer.webp"
  },
  {
    "id": "f1-247-246",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report that contains a page. The page contains the following:\n\n•A shape named Shape1\n\n•A card named Sales Summary\n\n•A clustered bar chart named Sales by Region\n\nYou need to ensure that Sales Summary renders on top of Shape1.\n\nWhat should you modify?",
    "choices": [
      "Tab order in the Selection pane",
      "Layer order in the Selection pane",
      "Maintain layer order in the General visual settings",
      "Vertical alignment in the Canvas settings"
    ],
    "correct": [
      1
    ],
    "explanation": "B. Layer order in the Selection paneTo ensure that Sales Summary renders on top of Shape1, you need to\nadjust their layer order in the Selection pane. Power BI renders visuals based on the layer order in the\nSelection pane, with the topmost visual being rendered last and therefore appearing on top of other visuals.To\nadjust the layer order, you can select the visuals in the Selection pane and drag them up or down to change\ntheir position in the layer order. In this case, you would want to select Sales Summary and drag it above\nShape1 in the layer order to ensure it is rendered on top.",
    "source": "Final",
    "sourceNumber": 247,
    "legacy": false
  },
  {
    "id": "f1-248-247",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report named Report1 and a dashboard named Dashboard1. Report1 contains a line chart\n\nnamed Sales by month.\n\nYou pin the Sales by month visual to Dashboard1.\n\nIn Report1, you change the Sales by month visual to a bar chart.\n\nYou need to ensure that the bar chart displays on Dashboard1.\n\nWhat should you do?",
    "choices": [
      "Refresh the dataset used by Report1 and Dashboard1.",
      "Pin the Sales by month bar chart to Dashboard1.",
      "Select Refresh visuals for Dashboard1.",
      "Edit the details for the dashboard tile of Dashboard1."
    ],
    "correct": [
      1
    ],
    "explanation": "B. Pin the Sales by month bar chart to Dashboard1.When you pin a visual to a dashboard, you are essentially\ntaking a snapshot of that visual at that point in time and adding it to the dashboard as a tile. Any changes\nmade to the original visual in the report will not automatically reflect in the dashboard tile. To display the bar\nchart on Dashboard1, you need to pin the new Sales by month bar chart to Dashboard1.\n\nhttps://learn.microsoft.com/en-us/power-bi/visuals/power-bi-report-change-visualization-type",
    "source": "Final",
    "sourceNumber": 248,
    "legacy": false
  },
  {
    "id": "f1-249-248",
    "domain": "Visualize and analyze the data",
    "type": "multi",
    "prompt": "In Power BI Desktop, you are creating a report that will contain three pages.\n\nYou need to create a custom tooltip page and prepare the page for use.\n\nWhich three actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "For the tooltip page, set Allow use as tooltip to On.",
      "For the target page, set Allow use as tooltip to On.",
      "Configure filters on the target visual.",
      "For the tooltip page, configure filters.",
      "Add and configure visuals on the tooltip page."
    ],
    "correct": [
      0,
      3,
      4
    ],
    "explanation": "A. For the tooltip page, set Allow use as tooltip to On\n\nThis step makes the page eligible to be used as a tooltip.\n\nD. For the tooltip page, configure filters\n\nYou can configure filters on the tooltip page to control the data displayed based on the hovered visual.\n\nE. Add and configure visuals on the tooltip page\n\nThe tooltip page should contain the visuals that will be shown when hovering over elements in the report.\n\nWhy Other Options Are Incorrect:\n\nB. For the target page, set Allow use as tooltip to On: The target page doesn’t need this setting; it's the tooltip\npage that needs to have this enabled.\n\nC. Configure filters on the target visual: This step is not needed for tooltip configuration. The tooltip itself\nhandles filtering.",
    "source": "Final",
    "sourceNumber": 249,
    "legacy": false
  },
  {
    "id": "f1-250-249",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou need to use AI insights to add a column of enhanced data based on the customer feedback. The solution must\n\nidentify the following:\n\n• What the customers most often provide feedback about\n\n• Whether the customers like your company’s product\n\n• The language of the feedback\n\nWhich AI insights service should you use for each output? To answer, drag the appropriate services to the correct\n\noutputs. Each service may be used once, more than once, or not at all. You may need to drag the split bar between\n\npanes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Key Phrase Extraction\n\nSentiment Analysis\n\nLanguage Detection\n\n- Key Phrase Extraction: a text analysis technique that extracts important words and phrases from the input\ntext\n\n- Sentiment analysis: is the process of analyzing digital text to determine if the emotional tone of the message\nis positive, negative, or neutral\n\n- Language Detection: usually used to identify the language of business texts like emails and chats",
    "source": "Final",
    "sourceNumber": 250,
    "legacy": false,
    "image": "/dump-assets/f1-250-249-question.webp",
    "answerImage": "/dump-assets/f1-250-249-answer.webp"
  },
  {
    "id": "f1-251-250",
    "domain": "Manage and secure Power BI",
    "type": "multi",
    "prompt": "You have a Power BI report named ReportA.\n\nYou have a Power BI tenant that allows users to export data.\n\nYou need to ensure that consumers of ReportA cannot export any data from visuals.\n\nWhich two actions should you perform? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "From Power BI Desktop, modify the Report settings.",
      "From Power BI Desktop, modify the Data Load settings.",
      "From the Power BI service, modify the dataset permissions.",
      "From the Power BI service, modify the Report settings."
    ],
    "correct": [
      0,
      3
    ],
    "explanation": "A. From Power BI Desktop, modify the Report settings\n\nIn Power BI Desktop, you can modify report settings to disable the option to export data.\n\nD. From the Power BI service, modify the Report settings\n\nIn the Power BI service, you can also configure report settings to prevent users from exporting data from\nvisuals.\n\nWhy Other Options Are Incorrect:\n\nB. Modify the Data Load settings: These settings are related to how data is loaded and do not impact export\npermissions.\n\nC. Modify the dataset permissions: This affects data access but does not specifically prevent data export from\nreports.",
    "source": "Final",
    "sourceNumber": 251,
    "legacy": false
  },
  {
    "id": "f1-252-251",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report that will be rendered on a vertical display.\n\nYou need to maximize the portion of the screen area used by the report.\n\nWhat should you do?",
    "choices": [
      "From the Canvas background setting of Power BI Desktop, configure the Image fit setting.",
      "From the Canvas settings of Power BI Desktop, set a custom width and height.",
      "From Power BI Desktop, select Personalize visuals.",
      "From the Power BI service, enable the Pages pane."
    ],
    "correct": [
      1
    ],
    "explanation": "From the Canvas settings of Power BI Desktop, set a custom width and height.\n\nTo maximize the screen area used by the report on a vertical display, you should set a custom width and\nheight for the canvas in Power BI Desktop. By adjusting the dimensions to match the aspect ratio of the\ndisplay, you ensure the report fills the screen optimally.\n\nWhy Other Options Are Incorrect:\n\nA. Image fit setting: This applies to images, not the entire report.\n\nC. Personalize visuals: This allows end-users to modify visuals, not layout or display size.\n\nD. Enable the Pages pane: This only impacts navigation, not the canvas layout.",
    "source": "Final",
    "sourceNumber": 252,
    "legacy": false
  },
  {
    "id": "f1-253-252",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You need to create a visual that compares profit across 10 product categories fora selected quarter.\n\nWhat is the best visual to use to achieve the goal?",
    "choices": [
      "an area chart",
      "a funnel chart",
      "a clustered bar chart",
      "a line chart"
    ],
    "correct": [
      2
    ],
    "explanation": "C. A clustered bar chart.\n\nA clustered bar chart is the best visual to use to compare profit across 10 product categories for a selected\nquarter. It allows you to easily compare the profit of each category side-by-side, making it easy to identify the\nhighest and lowest performers. In addition, a clustered bar chart is effective at displaying discrete data, such\nas categories, which makes it the ideal choice for this scenario.",
    "source": "Final",
    "sourceNumber": 253,
    "legacy": false
  },
  {
    "id": "f1-254-253",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a Power BI dataset named Finance that is hosted in a Power BI workspace.\n\nThe finance team at your company is NOT currently a member of any Power BI workspace roles.\n\nYou need to enable the finance team to use Microsoft Excel to analyze the Finance dataset.\n\nWhat should you do?",
    "choices": [
      "Grant the finance team build permissions to the Finance dataset.",
      "Provide an Excel workbook that is connected to the Finance dataset.",
      "Create a row-level security (RLS) role and add the finance team to the role as members.",
      "Grant the finance team write permissions to the Finance dataset."
    ],
    "correct": [
      0
    ],
    "explanation": "you have to have at least build permissions on the dataset\n\nGranting build permissions to the finance team on the Finance dataset allows them to access the dataset in\nExcel and analyze it. With these permissions, they can connect Excel to the dataset and use it for analysis.\n\nWhy Other Options Are Incorrect:\n\nB: Providing an Excel workbook does not allow direct analysis of the dataset.\n\nC: Row-level security (RLS) controls data access but doesn't enable Excel analysis.\n\nD: Write permissions are unnecessary for Excel analysis and could lead to unwanted changes.\n\nhttps://learn.microsoft.com/en-us/power-bi/collaborate-share/service-connect-power-bi-datasets-excel",
    "source": "Final",
    "sourceNumber": 254,
    "legacy": true
  },
  {
    "id": "f1-255-254",
    "domain": "Visualize and analyze the data",
    "type": "multi",
    "prompt": "You have a Power BI report that contains a visual. The visual contains a measure.\n\nYou need to ensure that the report meets the following requirements:\n\n•All values must be set to two decimal places.\n\n•All negative values must be displayed in red font and parentheses.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "For the visual, apply conditional formatting to the background color.",
      "Configure the measure to use a custom format.",
      "For the visual, apply conditional formatting to the font color.",
      "For the visual, set Value decimal places to 2."
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "B to format measure with parenthesis and decimals and c for configuring font color\n\nBecause.. question each answer should be part of solutions...D. For the visual, set Value decimal places to 2, is\npartially correct but it only addresses the first requirement of setting all values to two decimal places.To\naddress the second requirement of displaying negative values in red font and parentheses, we need to apply\nconditional formatting to the font color as stated in option C.Therefore, we need to perform both actions:\nconfiguring the measure to use a custom format and applying conditional formatting to the font color.No\nconfusion, and no need to discuss further",
    "source": "Final",
    "sourceNumber": 255,
    "legacy": false
  },
  {
    "id": "f1-256-255",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou are using Power Query Editor to preview the data in a column named Max Temp. The column statistics and\n\nvalue distribution are shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "45\n\n24\n\nThe first question is asking which value was repeated the most in the column, as in, frequency.\n\nWhen the frequency of the value increases, the bar shown in \"value distribution\" also increases. So the\nbiggest bar is of the value that is repeated the most, which is 45.\n\nFor the second question, the smallest NON-null value, is a fancy way of saying the minimum value that is\nactually a value not an error, null or an empty field. Which is shown on the left hand side as 24.\n\nThis view is Column Profiling it profiles just one column and brings a lot of statistics about it as you can see.\n\nYou can read more here. https://learn.microsoft.com/en-us/power-query/data-profiling-tools",
    "source": "Final",
    "sourceNumber": 256,
    "legacy": false,
    "image": "/dump-assets/f1-256-255-question.webp",
    "answerImage": "/dump-assets/f1-256-255-answer.webp"
  },
  {
    "id": "f1-257-256",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI report that contains a page. The page contains the following visuals:\n\n•A card\n\n•A matrix\n\n•A bar chart\n\nYou need to configure the page to ensure that the card and the bar chart are unaffected when a user drills down in\n\nthe matrix. The card and the bar chart must change when a user selects a cell in the matrix.\n\nWhat should you configure? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Matrix\n\nApply drill down filters to Selected Visual\n\nhttps://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions?tabs=powerbi-\ndesktop#change-the-interactions-of-drillable-visualizationsBy default, a matrix will have \"Entire Page\" in the\n\"Apply drill down filters to\" option inside the Format tab, which is what we don't want to happen, so changing\nto \"Selected Visual\" should give us the behavior we want",
    "source": "Final",
    "sourceNumber": 257,
    "legacy": false,
    "image": "/dump-assets/f1-257-256-question.webp",
    "answerImage": "/dump-assets/f1-257-256-answer.webp"
  },
  {
    "id": "f1-258-257",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI model that contains two tables named Population and Date.\n\nThe Population table contains two columns named PopulationAmount and DateKey.\n\nDateKey contains date values that represent the first day of a year and are used to create a many-to-one\n\nrelationship with the Date table.\n\nThe Power BI model contains two measures that have the following definitions.\n\nTotal Population = Sum(‘Population’[PopulationAmount])\n\n2023 Population = CALCULATE([Total Population], ‘Date'[Year] = 2023)\n\nYou create a table visual that displays Date[Year] and [2023 Population].\n\nWhat will the table visual show?",
    "choices": [
      "one row per year that contains blank values for every year except 2023",
      "one row per date that contains the population value for the corresponding year repeated in each row",
      "a single row for the year 2023 that contains the related population value",
      "one row per year that contains the same value repeated for each year"
    ],
    "correct": [
      3
    ],
    "explanation": "Correct answer is: D. one row per year that contains the same value repeated for each year.\n\nTotal Population calculates the sum of PopulationAmount across the entire Population table.\n\n2023 Population is calculated by filtering the Date table to only include data for the year 2023.\n\nIn the table visual, the 2023 Population measure will return the 2023 population value for every row. It doesn't\ndepend on the actual year but instead repeats the population of 2023 for all the years listed in the Date[Year]\ncolumn.\n\nWhy Other Options Are Incorrect:\n\nA: Blank values won't appear as the measure still returns a value for 2023.\n\nB: The value isn't tied to individual dates, only to the year 2023.\n\nC: The table doesn't show a single row for only 2023. It shows all years, but with the same population value for\n2023 across each.",
    "source": "Final",
    "sourceNumber": 258,
    "legacy": false
  },
  {
    "id": "f1-259-258",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a Power BI dataset that contains quarterly sales performance data.\n\nYou need to enable managers to review the data in a format that meets the following requirements:\n\n•Is optimized for printing.\n\n•Renders data in Microsoft Excel, Word, PowerPoint, and PDF formats.\n\nWhat should you create?",
    "choices": [
      "a template app",
      "a dashboard",
      "a paginated report",
      "an interactive report"
    ],
    "correct": [
      2
    ],
    "explanation": "Correct answer is C:a paginated report.\n\nA paginated report is designed specifically for printing, with precise control over layout and formatting. It can\nbe exported to various formats such as Excel, Word, PowerPoint, and PDF, meeting the requirements of\nrendering data in different formats and being optimized for print.\n\nWhy Other Options Are Incorrect:\n\nA. Template app: Used for pre-packaged content and apps, not for print-friendly reports.\n\nB. Dashboard: Primarily for interactive viewing, not optimized for printing.\n\nD. Interactive report: Designed for on-screen interaction, not print optimization.",
    "source": "Final",
    "sourceNumber": 259,
    "legacy": true
  },
  {
    "id": "f1-260-259",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report that contains the visuals shown in the following table.\n\nYou need to modify the location of each visual.\n\nWhat should you modify for each visual?",
    "choices": [
      "the layer order",
      "the padding",
      "the position",
      "the tab order"
    ],
    "correct": [
      2
    ],
    "explanation": "Correct answer is C:the position.\n\nThe position refers to the horizontal and vertical coordinates of each visual in Power BI. In this case, to modify\nthe location of each visual, you need to adjust its position by changing the horizontal and vertical coordinates\nprovided (such as 300, 700 for the Clustered column chart).\n\nWhy Other Options Are Incorrect:\n\nA. Layer order: Affects the visibility of visuals overlapping one another, not the location.\n\nB. Padding: Controls the space inside the visual, not its position.\n\nD. Tab order: Refers to the sequence for navigating between visuals, not their position.",
    "source": "Final",
    "sourceNumber": 260,
    "legacy": false,
    "image": "/exhibit-assets/f1-260-259.webp"
  },
  {
    "id": "f1-261-260",
    "domain": "Visualize and analyze the data",
    "type": "multi",
    "prompt": "You have a Power BI report. The report contains a line chart that displays sales data for several regions.\n\nYou need to add an element to the report that will enable users to filter the sales data to include only a selected\n\nregion.\n\nWhich two elements achieve the goal? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "a slicer visual",
      "a drillthrough filter",
      "a table visual",
      "a card visual",
      "a Key Performance Indicator (KPI) visual"
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "A. a slicer visual.\n\nC. a table visual\n\nA. Slicer visual: Slicers allow users to filter data interactively and can be used to filter the sales data by region\nin this case.\n\nC. Table visual: While not a primary filter, a table visual can be used to display region data that can be clicked\non for filtering, especially when combined with other visuals.\n\nWhy Other Options Are Incorrect:\n\nB. Drillthrough filter: This is for filtering to a detailed page, not for filtering within the same page.\n\nD. Card visual: A card visual displays a single metric, not used for filtering.\n\nE. KPI visual: Similar to card visuals, KPIs are for showing performance indicators, not filtering.",
    "source": "Final",
    "sourceNumber": 261,
    "legacy": false
  },
  {
    "id": "f1-262-261",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou plan to use Power BI to create a quarterly profit report that meets the following requirements:\n\n•Emphasizes the percentage of total profits contributed by each product category in dollars and as a percentage\n\n•Compares profit margins across sales regions\n\nWhich type of visual should you use for each requirement? To answer, drag the appropriate visuals to the correct\n\nrequirements. Each visual may be used once, more than once, or not at all. You may need to drag the split bar\n\nbetween panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Pie Chart.\n\nStacked Bar Chart.",
    "source": "Final",
    "sourceNumber": 262,
    "legacy": false,
    "image": "/dump-assets/f1-262-261-question.webp",
    "answerImage": "/dump-assets/f1-262-261-answer.webp"
  },
  {
    "id": "f1-263-262",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have the CSV file shown in the following table.\n\nYou use Power Query Editor to preview the data in the file.\n\nYou need to transform the data to meet the following requirements:\n\n•The first column must contain the month.\n\n•The second column must contain the year.\n\n•The third column must contain the order amount for the month and year.\n\nWhich transformation should you use first?",
    "choices": [
      "remove",
      "unpivot",
      "transpose",
      "pivot"
    ],
    "correct": [
      1
    ],
    "explanation": "Correct answer is B:unpivot.\n\nThe unpivot transformation is used to convert columns into rows, which is exactly what you need to transform\nthe data. It will turn the order amounts (in columns) into rows under the corresponding month and year,\nmaking the data more manageable and meeting the requirement of having separate columns for month, year,\n\nand order amount.\n\nWhy Other Options Are Incorrect:\n\nA. Remove: This would delete unnecessary columns, but it doesn’t reshape the data.\n\nC. Transpose: This swaps rows and columns, which is not the required transformation.\n\nD. Pivot: This aggregates data but doesn't turn columns into rows.",
    "source": "Final",
    "sourceNumber": 263,
    "legacy": false,
    "image": "/exhibit-assets/f1-263-262.webp"
  },
  {
    "id": "f1-264-263",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You are creating a Power BI single-page report.\n\nSome users will navigate the report by using a keyboard, and some users will navigate the report by using a screen\n\nreader.\n\nYou need to ensure that the users can consume content on a report page in a logical order.\n\nWhat should you configure on the report page?",
    "choices": [
      "the layer order",
      "the X position",
      "the bookmark order",
      "the tab order"
    ],
    "correct": [
      3
    ],
    "explanation": "the tab order.\n\nThe tab order controls the navigation flow for keyboard users and ensures that all content is accessible in a\nlogical sequence. This is important for both keyboard and screen reader users to navigate the report in an\naccessible and predictable manner.\n\nWhy Other Options Are Incorrect:\n\nA. Layer order: Controls which visuals are in front or behind other visuals, not the navigation order.\n\nB. X position: Determines horizontal placement but doesn't affect navigation.\n\nC. Bookmark order: Relevant for navigating between different views or sections, not for logical navigation.",
    "source": "Final",
    "sourceNumber": 264,
    "legacy": false
  },
  {
    "id": "f1-265-264",
    "domain": "Visualize and analyze the data",
    "type": "multi",
    "prompt": "You are configuring a Power BI report for accessibility as shown in the following table.\n\nYou need to change the default colors of all three visuals to make the report more accessible to users who have\n\ncolor vision deficiency.\n\nWhich two settings should you configure in the Customize theme window? Each correct answer presents part of\n\nthe solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "First-level elements colors",
      "Theme colors",
      "Divergent colors",
      "Sentiment colors"
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "B- theme colors cause you can customize it yourself\n\nC- Divergent specifically address color blind users\n\nD is not correct because it uses colors like RED, GREEN, which hurts visual impaired users",
    "source": "Final",
    "sourceNumber": 265,
    "legacy": false,
    "image": "/exhibit-assets/f1-265-264.webp"
  },
  {
    "id": "f1-266-265",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI workspace that contains a semantic model and a report named Sales report.\n\nAll users in the sales department are assigned the Viewer role for the workspace.\n\nThe Sales report is configured as shown in the Sales report exhibit. (Click the Sales report tab.)\n\nFrom Power BI Desktop, you configure the Report settings as shown in the Report settings exhibit. (Click the\n\nReport settings tab.)\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Yes, No, No.\n\nFor the second one, the viewer role does not have access to share/reshare: https://learn.microsoft.com/en-\nus/power-bi/collaborate-share/service-roles-new-workspaces\n\nFor third, there is no mention of being able to add a new measure:\n\nhttps://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-personalize-visuals?tabs=powerbi-\ndesktop",
    "source": "Final",
    "sourceNumber": 266,
    "legacy": false,
    "image": "/dump-assets/f1-266-265-question.webp",
    "answerImage": "/dump-assets/f1-266-265-answer.webp"
  },
  {
    "id": "f1-267-266",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You need to use Power BI to create a visual that will allow users to compare the sales performance of five sales\n\nregions for the current month.\n\nWhich visual should you use?",
    "choices": [
      "a line chart",
      "a stacked bar chart",
      "a 100% stacked bar chart",
      "a waterfall chart"
    ],
    "correct": [
      1
    ],
    "explanation": "Correct answer is B:a stacked bar chart.\n\nA stacked bar chart allows you to compare sales performance across different sales regions, with each\nregion's performance represented as a segment of the bar. This visual is useful for showing both individual\nand total sales across multiple categories (regions), which aligns well with the requirement to compare five\nsales regions for the current month.\n\nWhy Other Options Are Incorrect:\n\nA. Line chart: Best suited for showing trends over time, not for comparing regions.\n\nC. 100% stacked bar chart: Useful for showing proportional data, not for comparing absolute values.\n\nD. Waterfall chart: Primarily used for visualizing incremental changes, not direct comparisons.",
    "source": "Final",
    "sourceNumber": 267,
    "legacy": false
  },
  {
    "id": "f1-268-267",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI workspace.\n\nYou need to create two reports that meet the following requirements:\n\n•Report1: Optimized for printing and can be delivered to users via a scheduled email subscription\n\n•Report2: Optimized for dynamic user interactivity\n\nWhich format should you use for each report? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Box1:Power bi Paginated\n\nBox2:Power bi\n\nReport1: Power BI Paginated (.rdl):\n\nPaginated reports are designed for printing and exporting. They are highly structured, with content fixed to a\npage, and are ideal for generating large reports that can be emailed or printed in a consistent format. They are\noptimized for scenarios where the report layout and distribution (via email or other methods) are key\nconsiderations.\n\nReport2: Power BI (.pbix):\n\nPower BI desktop files (.pbix) allow for dynamic interactivity. Users can filter, drill down, and interact with the\ndata on the report. These are ideal for reports where users need to explore data interactively rather than just\nviewing static, printed information.",
    "source": "Final",
    "sourceNumber": 268,
    "legacy": false,
    "image": "/dump-assets/f1-268-267-question.webp",
    "answerImage": "/dump-assets/f1-268-267-answer.webp"
  },
  {
    "id": "f1-269-268",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report that contains the table shown in the following exhibit.\n\nThe table contains conditional formatting that shows which stores are above, near, or below the monthly quota for\n\nreturns.\n\nYou need to ensure that the table is accessible to consumers of reports who have color vision deficiency.\n\nWhat should you do?",
    "choices": [
      "Move the conditional formatting icons to a tooltip report.",
      "Add alt text that lists the values in the table.",
      "Change the icons to use a different shape for each color.",
      "Remove the icons and use red, yellow, and green background colors instead."
    ],
    "correct": [
      2
    ],
    "explanation": "Change the icons to use a different shape for each color.\n\nIt's a \"color vision deficiency\" so using different shapes would secure understanding of the report for that\ngroup of users",
    "source": "Final",
    "sourceNumber": 269,
    "legacy": false,
    "image": "/exhibit-assets/f1-269-268.webp"
  },
  {
    "id": "f1-270-269",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report that contains one visual.\n\nYou need to provide users with the ability to change the visual type without affecting the view for other users.\n\nWhat should you do?",
    "choices": [
      "From the Bookmarks pane, select Focus mode, and then select Add.",
      "From Report settings, select Personalize visuals.",
      "From Visual options in Report settings, select Use the modern visual header with updated styling options.",
      "From Tabular Editor, create a new perspective."
    ],
    "correct": [
      1
    ],
    "explanation": "From Report settings, select Personalize visuals.\n\nB. Personalize visuals enables users to modify visuals without affecting other users' views. This option\nsupports personalized visual customization at the individual user level.\n\nWhy other options are incorrect:\n\nA. Focus mode allows users to focus on one visual but doesn't provide an option to change the visual type.\n\nC. Visual options in Report settings only changes how the visual header appears, not the visual type itself.\n\nD. Tabular Editor is used for advanced model editing, not for enabling user visual customizations.",
    "source": "Final",
    "sourceNumber": 270,
    "legacy": false
  },
  {
    "id": "f1-271-270",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI report that contains the table visual shown in the following exhibit.\n\nYou need to modify the visual to display as shown in the following exhibit.\n\nHow should you configure the visual? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Why Other Options Are Incorrect\n\nType: Table or Multi-row card\n\nA Table visual displays data in a flat format, with no pivoting or hierarchical structures, making it impossible\nto organize dates as columns and measures (e.g., Total Cost and Total Sales) as rows.\n\nA Multi-row card is for displaying summarized data values, not structured row-column relationships.\n\nFormat: Set Rows subtotals to Off\n\nSubtotals are unrelated to achieving the desired layout; this setting only affects the visibility of subtotals,\nwhich is not relevant here.\n\nFormat: Set Stepped layout to Off\n\nThe Stepped layout adjusts hierarchical indentation for rows in a Matrix visual. It does not control the pivoting\nof values to rows, so it is irrelevant for this requirement.",
    "source": "Final",
    "sourceNumber": 271,
    "legacy": false,
    "image": "/dump-assets/f1-271-270-question.webp",
    "answerImage": "/dump-assets/f1-271-270-answer.webp"
  },
  {
    "id": "f1-272-271",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI report that contains a card. The card displays the value for year-to-date revenue.\n\nYou need to ensure that screen reader users can read the value when initially interacting with the card. The value\n\nmust stay updated as the dataset is refreshed.\n\nWhat should you do?",
    "choices": [
      "Convert the card into a text box.",
      "Add the value to the chart title text.",
      "Populate the alt text with a static value.",
      "Populate the alt text by using conditional formatting with a DAX measure."
    ],
    "correct": [
      3
    ],
    "explanation": "Populate the alt text by using conditional formatting with a DAX measure.\n\nRequirement:\n\nThe value displayed in the card must be readable by screen readers.\n\nThe value should stay updated dynamically when the dataset is refreshed.\n\nWhy Option D is Correct:\n\nUsing conditional formatting with a DAX measure for the alt text ensures the alt text dynamically updates\nwhenever the dataset is refreshed.\n\nScreen readers will read the updated alt text, making the value accessible and always accurate.\n\nWhy Other Options Are Incorrect:\n\nA. Convert the card into a text box:\n\nA text box does not support dynamic updates based on data refresh. You would need to manually update the\ntext box whenever the dataset changes.\n\nB. Add the value to the chart title text:\n\nWhile chart titles can be read by screen readers, this option does not apply to cards. It also lacks flexibility in\ndynamically presenting values in the alt text for accessibility.\n\nC. Populate the alt text with a static value:\n\nA static alt text value would not update when the dataset refreshes, failing the requirement for dynamic\nupdates.",
    "source": "Final",
    "sourceNumber": 272,
    "legacy": false
  },
  {
    "id": "f1-273-272",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report that contains a table visual. The visual contains a column.\n\nThe column contains whole numbers ranging from of 1 to 20.\n\nYou need to use conditional formatting to meet the following requirements:\n\n•Visually compare the values without having to read the text containing the number.\n\n•Show a different format for each distinct value.\n\n•Hide the numeric value of ColumnA.\n\n•Minimize development effort.\n\nWhich formatting should you use?",
    "choices": [
      "font color",
      "icons",
      "data bars",
      "background color"
    ],
    "correct": [
      2
    ],
    "explanation": "Correct answer is C:data bars.\n\nC. Data bars are ideal for visually comparing values without displaying the actual numbers. They provide a\nvisual representation of the data, with varying lengths indicating the size of each value. This minimizes the\nneed to read text while fulfilling the requirement to show a different format for each distinct value.\n\nWhy other options are incorrect:\n\nA. Font color only changes the color of the text, but doesn't provide a distinct visual representation of the\nvalues.\n\nB. Icons can show distinct symbols, but data bars are better for comparing values.\n\nD. Background color would apply a color background, but it doesn't offer the same comparison clarity as data\nbars.",
    "source": "Final",
    "sourceNumber": 273,
    "legacy": false
  },
  {
    "id": "f1-274-273",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou use Power Query Editor to preview the data in a column named Resource Location.\n\nThe column statistics and value distributions of Resource Location appear as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Unique is 0.\n\nMost frequently occurred is US East\n\nFirst solution must be '0' as there are no UNIQUE values.\n\n13 is the number of DISTINCT values in the dataset.\n\nUS East is the one occuring many more times than the reast (on top in the bar chart)",
    "source": "Final",
    "sourceNumber": 274,
    "legacy": false,
    "image": "/dump-assets/f1-274-273-question.webp",
    "answerImage": "/dump-assets/f1-274-273-answer.webp"
  },
  {
    "id": "f1-275-274",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report that contains the visual shown in the following exhibit.\n\nYou need to make the visual more accessible to users who have color vision deficiency.\n\nWhat should you do?",
    "choices": [
      "Change the font color of values in the Sales column to white.",
      "Change the red background color to orange.",
      "Add additional measures to the table values.",
      "Add icons to represent the sales status of each product."
    ],
    "correct": [
      3
    ],
    "explanation": "Add icons to represent the sales status of each product.\n\nD. Add icons helps to make the visual more accessible to users with color vision deficiencies by providing an\nadditional layer of information. Icons can represent the sales status of each product, making it easier for users\nto understand the data without relying solely on color.\n\nWhy other options are incorrect:\n\nA. Changing font color improves readability but does not address color blindness.\n\nB. Changing the background color might still be difficult for colorblind users to interpret.\n\nC. Adding additional measures does not directly help users with color vision deficiencies.",
    "source": "Final",
    "sourceNumber": 275,
    "legacy": false,
    "image": "/exhibit-assets/f1-275-274.webp"
  },
  {
    "id": "f1-276-275",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a Power BI app that contains a report named Report1.\n\nYou add a new page to Report1.\n\nYou need to ensure that users can view the new page. The solution must minimize administrative effort.\n\nWhat should you do?",
    "choices": [
      "Update the audience in the app.",
      "Update the app.",
      "Update the contact information in the app.",
      "Unpublish and create a new app."
    ],
    "correct": [
      1
    ],
    "explanation": "Update the app.\n\nRequirement:\n\nYou added a new page to an existing report in a Power BI app.\n\nYou need to make the new page visible to users with minimal administrative effort.\n\nWhy Option B is Correct:\n\nUpdating the app allows you to include the new page in the app and publish the changes. This process does\nnot require unpublishing or creating a new app, thus minimizing effort.\n\nExisting users of the app will automatically see the changes after you update the app.\n\nWhy Other Options Are Incorrect:\n\nA. Update the audience in the app:\n\nUpdating the audience controls who can view the app but does not update the content within the app. This\noption does not address the need to make the new page visible.\n\nC. Update the contact information in the app:\n\nContact information only provides user support details. It does not affect the visibility of pages or content\nwithin the app.\n\nD. Unpublish and create a new app:\n\nUnpublishing and recreating the app would involve significantly more effort and is unnecessary for simply\nadding a new page to an existing app.",
    "source": "Final",
    "sourceNumber": 276,
    "legacy": false
  },
  {
    "id": "f1-277-276",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI semantic model that contains a table named Table1. Table1 contains the following columns:\n\n•WebsiteName\n\n•URL\n\nYou need to create a report named Report1 that will contain a table visual. The solution must meet the following\n\nrequirements:\n\n•Display the website name.\n\n•Enable users to navigate to the website's URL by selecting the website name.\n\nWhat should you use?",
    "choices": [
      "data categories",
      "Conditional Formatting",
      "inline hierarchy labels",
      "URL icons"
    ],
    "correct": [
      1
    ],
    "explanation": "1. B- need to \"Enable users to navigate to the website's URL by selecting the website name\"\n\nTo enable users to navigate to a website's URL by selecting the website name, you should use conditional\nformatting to turn the website names into hyperlinks. In Power BI, this can be done by applying URL\nformatting to the column containing the website names, allowing them to function as clickable links.\n\nWhy other options are incorrect:\n\nA. Data categories: Used for categorizing data types, not for creating hyperlinks.\n\nC. Inline hierarchy labels: Used for hierarchical visuals, not for linking URLs.\n\nD. URL icons: Refers to icons for links, not for making text clickable.",
    "source": "Final",
    "sourceNumber": 277,
    "legacy": false
  },
  {
    "id": "f1-278-277",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou use Power Query Editor to review a query that contains a column named Country.\n\nYou need to view the following information in the Data preview view for the Country column:\n\n•The percentage of values that contain errors.\n\n•The count of empty values.\n\nWhat should you enable? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Both Answers are Column Quality\n\nColumn Quality:\n\nThe Column quality feature in Power Query provides a visual summary of the column data, including:\n\nThe percentage of valid values.\n\nThe percentage of error values.\n\nThe percentage of empty (null) values.\n\nThis is exactly what you need to see both the percentage of errors and the count of empty values.\n\nColumn Profile:\n\nThe Column profile provides a statistical overview of the data, such as distinct values, unique values, and\nvalue distribution. While useful, it does not specifically display the percentage of errors or count of empty\nvalues.\n\nColumn Distribution:\n\nThe Column distribution feature shows the frequency distribution of values in the column as a bar chart. It is\nnot used for viewing errors or empty values.",
    "source": "Final",
    "sourceNumber": 278,
    "legacy": false,
    "image": "/dump-assets/f1-278-277-question.webp",
    "answerImage": "/dump-assets/f1-278-277-answer.webp"
  },
  {
    "id": "f1-279-278",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI semantic model named Model1 that contains two fields named Sales and Quarter. Model1\n\ncontains a DAX measure that sums the Sales column.\n\nYou need to create a report that will contain the visual shown in the following exhibit.\n\nThe solution must NOT require additional DAX measures.\n\nWhich type of visual should you use?",
    "choices": [
      "ribbon chart",
      "line chart",
      "100% stacked area chart",
      "area chart"
    ],
    "correct": [
      2
    ],
    "explanation": "You need to create a report that will contain the visual shown in the following exhibit.', that is clearly meant\nfor 100% stacked area chart. Cannot be B line chart as per the exhibited visual shown which is stacked\ncategory..\n\nB does not show referring to the visual diagram where you have different product category stacked up,\nquestion outlines",
    "source": "Final",
    "sourceNumber": 279,
    "legacy": false,
    "image": "/exhibit-assets/f1-279-278.webp"
  },
  {
    "id": "f1-280-279",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou have a Power BI semantic model that contains a table.\n\nYou need to create a Power BI report page that contains two visuals that meet the following requirements:\n\n•Visual 1: Displays the distribution of hierarchical data\n\n•Visual 2: Search and then filter by values\n\nWhich type should you choose for each visual? To answer, drag the appropriate visual types to the correct visuals.\n\nEach visual type may be used once, more than once, or not at all. You may need to drag the split bar between panes\n\nor scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Treemap is for hierarchical data and slicer is for filtering",
    "source": "Final",
    "sourceNumber": 280,
    "legacy": false,
    "image": "/dump-assets/f1-280-279-question.webp",
    "answerImage": "/dump-assets/f1-280-279-answer.webp"
  },
  {
    "id": "f1-281-280",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou use Power Query Editor to review the query shown in the following exhibit.\n\nEach Region value appears only on the row where it first occurred. Each subsequent occurrence of the Region\n\nvalue is blank.\n\nYou need to ensure that every row contains the correct non-blank value. The solution must minimize development\n\neffort.\n\nWhich column should you select, and which action should you perform on the column? To answer, select the\n\nappropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Region\n\nFill down\n\nThe Fill Down action in Power Query propagates the last non-blank value downward into subsequent blank\ncells within the same column. This ensures that all blank rows in the “Region” column are filled with the\ncorrect value from the previous row where the region was specified.",
    "source": "Final",
    "sourceNumber": 281,
    "legacy": false,
    "image": "/dump-assets/f1-281-280-question.webp",
    "answerImage": "/dump-assets/f1-281-280-answer.webp"
  },
  {
    "id": "f1-282-281",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report that contains a bar chart. The bar chart displays sales by country.\n\nYou need to ensure that a summary of the data shown on the bar chart is accessible by using a screen reader.\n\nWhat should you configure on the bar chart?",
    "choices": [
      "conditional formatting",
      "alt text",
      "the tab order",
      "the layer order"
    ],
    "correct": [
      1
    ],
    "explanation": "Alt text (alternative text) is used to provide a textual description of the visual content for users relying on\nscreen readers. In this case, configuring alt text ensures that a summary of the bar chart (e.g., “Sales by\ncountry”) can be read out by a screen reader, making the data accessible.",
    "source": "Final",
    "sourceNumber": 282,
    "legacy": false
  },
  {
    "id": "f1-283-282",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have the Performance analyzer results shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "The visual that has the slowest load time is [answer choice].\"\n\nThis refers to the visual that takes the longest time to fully render.\n\nBased on the selection, \"August 2024 Active User %\" is the visual with the longest individual load time.\n\nThis is often due to complex DAX calculations, many filters, or large datasets.\n\nwaits the longest for other visuals to load.\"\n\nThis refers to the visual that starts loading only after other visuals finish, not necessarily due to its own\ncomplexity.\n\nThe same visual \"August 2024 Active User % was selected, meaning:\n\nIt is also the last visual to begin loading,\n\nLikely because it depends on outputs of other visuals or has lower priority in the rendering queue.",
    "source": "Final",
    "sourceNumber": 283,
    "legacy": false,
    "image": "/dump-assets/f1-283-282-question.webp",
    "answerImage": "/dump-assets/f1-283-282-answer.webp"
  },
  {
    "id": "f1-284-283",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou use Microsoft Power BI Desktop to preview a query in Power Query Editor. The query contains a column named\n\nLocation Name.\n\nYou need to identify the maximum length of each value in the Location Name column without changing the data.\n\nWhich actions should you perform in sequence? To answer, drag the appropriate actions to the correct order. Each\n\naction may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll\n\nto view content.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Step 1: Select the Location Name column\n\nYou begin by selecting the column you want to analyze.\n\nStep 2: Set Column Profiling based upon entire dataset\n\nEnsures Power Query analyzes all rows, not just the top 1,000 preview rows.\n\nDone via: View > Column profiling > Based on entire dataset.\n\nStep 3: From the View tab, select Column profile\n\nThis enables the detailed data profile pane, which shows:\n\nValue distribution\n\nMin/Max\n\nDistinct values\n\nEmpty count\n\nData type statistics\n\nStep 4: Group the value distribution by text length\n\nYou group values based on length of text.\n\nThis step helps spot anomalies — e.g., names that are too short or too long compared to the average.",
    "source": "Final",
    "sourceNumber": 284,
    "legacy": false,
    "image": "/dump-assets/f1-284-283-question.webp",
    "answerImage": "/dump-assets/f1-284-283-answer.webp"
  },
  {
    "id": "f1-285-284",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You plan to generate a line chart to visualize and compare the last six months of sales data for two departments.\n\nYou need to increase the accessibility of the visual.\n\nWhat should you do?",
    "choices": [
      "Configure a unique marker for each series.",
      "Configure a distinct color for each series.",
      "Replace long text with abbreviations and acronyms.",
      "Move important information to a tooltip."
    ],
    "correct": [
      0
    ],
    "explanation": "A. Configure a unique marker for each series.\n\nLine charts typically use color to distinguish between data series.\n\nHowever, relying on color alone can create accessibility issues, especially for users with color vision\ndeficiencies (color blindness).\n\nBy adding unique markers (e.g., circles, squares, triangles) to each series:\n\nThe lines become distinguishable even without color.\n\nThis significantly improves accessibility for all users.\n\nWhy not the others?\n\nB. Configure a distinct color for each series\n\nWhile helpful, it relies solely on color, which is not accessible to all users.\n\nIt’s better to combine color with shape/marker.\n\nC. Replace long text with abbreviations and acronyms\n\nThis can reduce clarity, especially for screen reader users or those unfamiliar with the acronyms.\n\nD. Move important information to a tooltip\n\nTooltips are not always accessible—screen readers and keyboard users may not benefit from them.\n\nKey information should be visibly available in the chart, not hidden.",
    "source": "Final",
    "sourceNumber": 285,
    "legacy": false
  },
  {
    "id": "f1-286-285",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report. The report contains a single report page that uses the default theme.\n\nYou need to configure the report page to match the formatting shown in the following exhibit.\n\nWhat should you change on the report page?",
    "choices": [
      "the wallpaper color only",
      "the canvas background color only",
      "the wallpaper color and the canvas background color only",
      "the canvas background image only"
    ],
    "correct": [
      2
    ],
    "explanation": "C. The wallpaper color and the canvas background color only.\n\nUse this if you're aiming for consistent branding or styling across the whole report page, including both:\n\nThe visual workspace (canvas)\n\nThe surrounding area (wallpaper)",
    "source": "Final",
    "sourceNumber": 286,
    "legacy": false,
    "image": "/exhibit-assets/f1-286-285.webp"
  },
  {
    "id": "f1-287-286",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI report that contains the visual shown in the following exhibit.\n\nYou plan to modify the visual by changing the column spacing and adding percent change labels as shown in the\n\nfollowing exhibit.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "To change the column spacing.\n\nEnable overlap for every series.\n\nIn a clustered column chart, each category typically shows multiple columns side by side — one for each\nseries.\n\nIf spacing is too wide, the columns might appear too spread out, making comparison difficult.\n\nEnabling overlap for every series causes the bars to overlay or partially stack, reducing visual clutter and\nimproving comparison.\n\nIt effectively reduces the gap between series columns for each category — which is interpreted here as\n\"column spacing.\"\n\nTo add the percent change labels.\n\nEnable data labels for the Plan series.\n\nData labels display values (or percent changes) directly on the chart.\n\nIf percent changes are tied specifically to the Plan series, enabling data labels only for that series makes\nsense.\n\nIt improves clarity by not overcrowding the chart with labels from every series.",
    "source": "Final",
    "sourceNumber": 287,
    "legacy": false,
    "image": "/dump-assets/f1-287-286-question.webp",
    "answerImage": "/dump-assets/f1-287-286-answer.webp"
  },
  {
    "id": "f1-288-287",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You are creating a visual in a Power BI report. The associated semantic model contains sales from the last four\n\nyears for three products.\n\nYou need to display the total sales by quarter categorized by product. The visual must display trends in both total\n\nsales and individual product sales.\n\nWhich type of visual should you use?",
    "choices": [
      "area chart",
      "clustered column chart",
      "stacked area chart",
      "line chart"
    ],
    "correct": [
      2
    ],
    "explanation": "Stacked Area Chart:\n\nTotal Sales Trend: The top edge of the stacked area chart clearly shows the trend of the total sales over time\n(quarters in this case).\n\nIndividual Product Sales Trend: Each \"layer\" or \"stack\" within the chart represents an individual product's\nsales, allowing you to see how each product's sales contribute to the total and their own individual trends over\ntime. This is excellent for part-to-whole relationships and trends.",
    "source": "Final",
    "sourceNumber": 288,
    "legacy": false
  },
  {
    "id": "f1-289-288",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI report that contains a clustered bar chart. The chart has an X-axis named Sales and a Y-axis\n\nnamed Year. The chart displays sales data for the years 2020 through 2024.\n\nYou need to create a visual calculation to show a cumulative total of sales that is equal to the sum of the current\n\nyear's sales plus all the sales from the previous year.\n\nWhich DAX expression should you use?",
    "choices": [
      "MOVINGAVERAGE([Sales], 4)",
      "RUNNINGSUM([Year])",
      "CALCULATE ( [Sales], 'Date' [Year] <= MAX ( 'Date'[Year] ) )",
      "RUNNINGSUM([Sales])"
    ],
    "correct": [
      2
    ],
    "explanation": "C. CALCULATE ( [Sales], 'Date'[Year] <= MAX ( 'Date'[Year] ) )\n\nYou want to compute a cumulative total (also called a running total) of sales by year, where the value for each\nyear equals the sum of sales for that year and all previous years.\n\nWhy the other options are incorrect:\n\nA. MOVINGAVERAGE([Sales], 4)\n\nNot a valid built-in DAX function.\n\nEven if it were, a moving average is not the same as a cumulative total.\n\nB. RUNNINGSUM([Year])\n\nThis doesn’t make sense — you’re summing years, not sales.\n\nRUNNINGSUM isn’t a native DAX function either.\n\nD. RUNNINGSUM([Sales])\n\nAgain, not a standard DAX function.\n\nCumulative totals in DAX require CALCULATE with a filter, or use TOTALYTD, TOTALMTD, etc., for time-based\ntotals.",
    "source": "Final",
    "sourceNumber": 289,
    "legacy": false
  },
  {
    "id": "f1-290-289",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou are using Power BI Desktop to profile data in Power Query Editor.\n\nYou need to review the percentage of errors and the maximum value of each column.\n\nWhich options should you use in Power Query Editor? To answer, drag the appropriate options to the correct\n\nrequirements. Each option may be used once, more than once, or not at all. You may need to drag the split bar\n\nbetween panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Column quality: Shows the percentage of valid, error, and empty values for each column.\n\nColumn profile: Provides a more detailed statistical profile for a selected column, including min/max values,\naverage, standard deviation, count of empty/error/distinct/unique values, and a value distribution chart.",
    "source": "Final",
    "sourceNumber": 290,
    "legacy": false,
    "image": "/dump-assets/f1-290-289-question.webp",
    "answerImage": "/dump-assets/f1-290-289-answer.webp"
  },
  {
    "id": "f1-291-290",
    "domain": "Visualize and analyze the data",
    "type": "multi",
    "prompt": "You are creating a Power BI report that will contain multiple visuals.\n\nYou need to ensure that the report is accessible to users who use a screen reader.\n\nWhich two configurations should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "consistent fonts for each visual",
      "alt text for each visual",
      "the tab order for each page",
      "consistent colors for each visual",
      "Play Axis for each page"
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "B. Alt text for each visual.\n\nAlt text helps screen reader users understand what a visual represents.\n\nEach chart or image should have a clear, concise description of what it shows.\n\nEssential for accessibility compliance (e.g., WCAG, Section 508).\n\nC. The tab order for each page.\n\nTab order defines how users navigate through visuals using the keyboard.\n\nProper tab order ensures a logical and intuitive navigation experience, which is critical for users who can't use\na mouse.\n\nSet this under View → Selection → Tab Order in Power BI Desktop.",
    "source": "Final",
    "sourceNumber": 291,
    "legacy": false
  },
  {
    "id": "f1-292-291",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You have a Power BI report that contains a stacked bar chart.\n\nYou need to add a new field to the legend. The field must combine information from separate columns.\n\nWhat should you create?",
    "choices": [
      "a calculated column",
      "a dynamic format string",
      "a measure",
      "a calculation group"
    ],
    "correct": [
      0
    ],
    "explanation": "A. Calculated column .\n\nA calculated column can concatenate or combine values from multiple existing columns (e.g., \"Region\" & \" - \"\n& \"Category\").\n\nSince the legend expects a column for categorization, a calculated column works perfectly.\n\nYou can then drag this new column to the \"Legend\" field well in the visual.",
    "source": "Final",
    "sourceNumber": 292,
    "legacy": false
  },
  {
    "id": "f1-293-292",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have a Power BI tenant that hosts the datasets shown in the following table.\n\nYou have the following requirements:\n\nThe export of reports that contain Personally Identifiable Information (PII) must be prevented.\n\nData used for financial decisions must be reviewed and approved before use.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Yes\n\nNo\n\nYes\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/enterprise/service-security-sensitivity-label-overview",
    "source": "Final",
    "sourceNumber": 293,
    "legacy": false,
    "image": "/dump-assets/f1-293-292-question.webp",
    "answerImage": "/dump-assets/f1-293-292-answer.webp"
  },
  {
    "id": "f1-294-293",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a Power BI tenant.\n\nYou have reports that use financial datasets and are exported as PDF files.\n\nYou need to ensure that the reports are encrypted.\n\nWhat should you implement?",
    "choices": [
      "Microsoft Intune policies",
      "row-level security (RLS)",
      "sensitivity labels",
      "dataset certifications"
    ],
    "correct": [
      2
    ],
    "explanation": "When you create a sensitivity label, you can restrict access to content that the label will be applied to.\nWhen a document or email is encrypted, access to the content is restricted, so that it:\nCan be decrypted only by users authorized by the label's encryption settings.\nRemains encrypted no matter where it resides, inside or outside your organization, even if the file's renamed.\n\nIncorrect:\nNot B: Row-level security (RLS) with Power BI can be used to restrict data access for given users. Filters\nrestrict data access at the row level, and you can define filters within roles.\nCurrent limitations for row-level security:\n\nReference:\nhttps://docs.microsoft.com/en-us/microsoft-365/compliance/encryption-sensitivity-labels",
    "source": "Final",
    "sourceNumber": 294,
    "legacy": false
  },
  {
    "id": "f1-295-294",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a Microsoft Excel file on a file server.\n\nYou create a Power BI report and import a table from the Excel file.\n\nYou publish the report.\n\nYou need to ensure that the data refreshes every four hours.\n\nWhat should you do first?",
    "choices": [
      "Upload the Excel file to a Power BI workspace.",
      "Create a subscription to the report.",
      "Deploy an on-premises data gateway.",
      "Edit the data source credentials."
    ],
    "correct": [
      2
    ],
    "explanation": "You can scheduled refresh for the On-premises data gateway (personal mode) and the On-premises data\ngateway. You specify refresh options in the following areas of the Power BI service: Gateway connection, Data\nsource credentials, and Scheduled refresh.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/refresh-scheduled-refresh",
    "source": "Final",
    "sourceNumber": 295,
    "legacy": false
  },
  {
    "id": "f1-296-295",
    "domain": "Manage and secure Power BI",
    "type": "multi",
    "prompt": "You have a dataset that is used infrequently and refreshes every hour.\n\nYou receive a notification that the refresh was disabled due to inactivity.\n\nWhich two actions will cause the scheduled refresh schedule to resume? Each correct answer presents a complete\n\nsolution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Enable query caching for the dataset.",
      "Import the dataset to Microsoft Excel.",
      "From the Power BI service, open a dashboard that uses the dataset.",
      "From the Power BI service, open a report that uses the dataset.",
      "From PowerShell, run the get-powerbireport cmdlet."
    ],
    "correct": [
      2,
      3
    ],
    "explanation": "After two months of inactivity, scheduled refresh on your dataset is paused. A dataset is considered inactive\nwhen no user has visited any dashboard or report built on the dataset. At that time, the dataset owner is sent\nan email indicating the scheduled refresh is paused. The refresh schedule for the dataset is then displayed as\ndisabled. To resume scheduled refresh, simply revisit any dashboard or report built on the dataset.\nIncorrect:\n\nNot E: get-powerbireport retrieves a list of Power BI reports that match the specified search criteria and\nscope.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/refresh-scheduled-refresh",
    "source": "Final",
    "sourceNumber": 296,
    "legacy": false
  },
  {
    "id": "f1-297-296",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a Power BI workspace that contains a dataset, a report, and a dashboard. The following groups have\n\naccess:\n\n✑ External users can access the dashboard.\n\n✑ Managers can access the dashboard and a manager-specific report.\n\n✑ Employees can access the dashboard and a row-level security (RLS) constrained report.\n\nYou need all users, including the external users, to be able to tag workspace administrators if they identify an\n\nissue with the dashboard. The solution must ensure that other users see the issues that were raised.\n\nWhat should you use?",
    "choices": [
      "comments",
      "chat in Microsoft Teams",
      "alerts",
      "subscriptions"
    ],
    "correct": [
      0
    ],
    "explanation": "Add a personal comment or start a conversation about a dashboard or report with your colleagues. The\ncomment feature is just one of the ways a business user can collaborate with others.\nNote: Comments can be added to an entire dashboard, to individual visuals on a dashboard, to a report page,\nto a paginated report, and to individual visuals on a report page. Add a general comment or add a comment\ntargeted at specific colleagues.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/consumer/end-user-comment",
    "source": "Final",
    "sourceNumber": 297,
    "legacy": false
  },
  {
    "id": "f1-298-297",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You have a PBIX file that imports several tables from an Azure SQL database.\n\nThe data will be migrated to another Azure SQL database.\n\nYou need to change the connections in the PBIX file. The solution must minimize administrative effort.\n\nWhat should you do?",
    "choices": [
      "From Power Query Editor, create new queries.",
      "From Power Query Editor, modify the source of each query.",
      "Create a PBIT file, open the file, and change the data sources when prompted.",
      "Modify the Data source settings."
    ],
    "correct": [
      3
    ],
    "explanation": "Open the PBIX file with Microsoft Power BI Desktop.\n\nThen choose File -> Options and settings -> Data source settings >Right click data sources and change source.\n\nNote:\n\nIncorrect:\n\nNot C: PBIT is a template file.\n\nThe PBIT file keeps your report structure and contains 'DataModelSchema File' instead of ''DataModel File''.\nHowever, If you choose import mode, the PBIX file stores all imported data from data sources and the report\nstructure.\n\nReference:\n\nhttps://windowsreport.com/open-pbix-file/",
    "source": "Final",
    "sourceNumber": 298,
    "legacy": false
  },
  {
    "id": "f1-299-298",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a Power BI workspace that contains several reports.\n\nYou need to provide a user with the ability to create a dashboard that will use the visuals from the reports.\n\nWhat should you do?",
    "choices": [
      "Create a row-level security (RLS) role and add the user to the role.",
      "Share the reports with the user.",
      "Grant the Read permission for the datasets to the user.",
      "Add the user as a member of the workspace.",
      "Add the user as a Viewer of the workspace."
    ],
    "correct": [
      3
    ],
    "explanation": "To grant access to a new workspace, assign those user groups or individuals to one of the workspace roles:\nAdmin, Member, Contributor, or Viewer.\n\nWorkspace roles -\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces",
    "source": "Final",
    "sourceNumber": 299,
    "legacy": false
  },
  {
    "id": "f1-300-299",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou have a Power BI workspace that contains a single-page report named Sales.\n\nYou need to add all the visuals from Sales to a dashboard. The solution must ensure that additional visuals added\n\nto the page are added automatically to the dashboard.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "An entire report page can be pinned to a dashboard, which is called pinning a live tile. It's called a live tile\nbecause you can interact with the tile on the dashboard.\nUnlike with individual visualization tiles, changes made in the report are automatically synced with the\n\ndashboard.\n\nStep 2: Open the Sales report -\nStep 3: Pin the page.\n1. Open a report in Editing view.\n2. With no visualizations selected, from the menu bar, select Pin to a dashboard.\n3. Pin the tile to an existing dashboard or to a new dashboard. Notice the highlighted text: Pin live page\nenables changes to reports to appear in the dashboard tile when the page is refreshed.\n\n4. Select Pin live. A Success message (near the top right corner) lets you know the page was added, as a tile,\nto your dashboard.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/service-dashboard-pin-live-tile-from-report",
    "source": "Final",
    "sourceNumber": 300,
    "legacy": false,
    "image": "/dump-assets/f1-300-299-question.webp",
    "answerImage": "/dump-assets/f1-300-299-answer.webp"
  },
  {
    "id": "f1-301-300",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a report in Power BI named report1 that is based on a shared dataset.\n\nYou need to minimize the risk of data exfiltration for report. The solution must prevent other reports from being\n\naffected.\n\nWhat should you do?",
    "choices": [
      "Clear Allow recipients to share your dashboard and Allow users to build new content using the underlying datasets for the dataset.",
      "Apply row-level security (RLS) to the shared dataset.",
      "Select the Allow end users to export both summarized and underlying data from the service or Report Server Export data option for the report.",
      "Select the Don't allow end users to export any data from the service or Report Server Export data option for the report."
    ],
    "correct": [
      3
    ],
    "explanation": "Besides the various permissions you can set, there are also two different options to disable the export\nfunctionality. First of all is the Export data in general and second the Export to Excel as a specific setting.\nBoth have the same setup for permissions\n\nExport Data -\n\nReference:\n\nhttps://data-marc.com/2020/04/13/power-bi-governance-why-you-should-consider-to-disable-export-to-\nexcel/",
    "source": "Final",
    "sourceNumber": 301,
    "legacy": false
  },
  {
    "id": "f1-302-301",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "In Power BI Desktop, you are creating visualizations in a report based on an imported dataset.\n\nYou need to allow Power BI users to export the summarized data used to create the visualizations but prevent the\n\nusers from exporting the underlying data.\n\nWhat should you do?",
    "choices": [
      "From the Power BI service, configure the dataset permissions.",
      "From Power BI Desktop, configure the Data Load settings for the current file.",
      "From Power BI Desktop, modify the data source permissions.",
      "From Power BI Desktop, configure the Report settings for the current file."
    ],
    "correct": [
      3
    ],
    "explanation": "1.) in Power BI Desktop > File > Options > Report Settings > Export data > Allow end users to export data with\ncurrent layout, summarize data and underlying data from the service or Report Server.\n\n2.) in Power BI Service in Report Settings > Export data section I found: \"Choose the type of data you allow\nyour end users to export.\" Here you can select one option from:\n\n- Summarized data and data with current layout\n\n- Summarized data, with current layout and underlying data\n\n- None\n\nBut this option is missing from offered answers, the correct answer is D.\n\nA is incorrect as in Manage Dataset Permission you can grant access:\n\n-allow recipients to modify dataset,\n\n-allow recipients to share this dataset,\n\n-allow recipients to build content with the data associated with dataset,\n\n-send an email notification\n\nor remove granted reshare, remove build, remove write, remove access\n\nSo here you can not change or limit data export.\n\nhttps://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-permissions",
    "source": "Final",
    "sourceNumber": 302,
    "legacy": false
  },
  {
    "id": "f1-303-302",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a Power BI report that uses row-level security (RLS).\n\nYou need to transfer RLS membership maintenance to an Azure network security team. The solution must NOT\n\nprovide the Azure network security team with the ability to manage reports, datasets, or dashboards.\n\nWhat should you do?",
    "choices": [
      "Grant the Read and Build permissions for the Power BI datasets to the Azure network security team.",
      "Configure custom instructions for the Request access feature that instructs users to contact the Azure network security team.",
      "Instruct the Azure network security team to create security groups. Configure RLS to use the groups.",
      "Add the Azure network security team as members of the RLS role."
    ],
    "correct": [
      2
    ],
    "explanation": "Configure row-level security group membership, Working with members\n\nAdd members -\nIn the Power BI service, you can add a member to the role by typing in the email address or name of the user\nor security group.\nYou can use the following groups to set up row level security.\n\nDistribution Group -\n\nMail-enabled Group -\n\nSecurity Group -\nIncorrect:\nNot A: Build permission applies to datasets. When you give users Build permission, they can build new content\non your dataset, such as reports, dashboards, pinned tiles from Q&A, paginated reports, and Insights\nDiscovery.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/enterprise/service-admin-rls",
    "source": "Final",
    "sourceNumber": 303,
    "legacy": true
  },
  {
    "id": "f1-304-303",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have four sales regions. Each region has multiple sales managers.\n\nYou implement row-level security (RLS) in a data model. You assign the relevant mail-enabled security group to\n\neach role.\n\nYou have sales reports that enable analysis by region. The sales managers can view the sales records of their\n\nregion. The sales managers are prevented from viewing records from other regions.\n\nA sales manager changes to a different region.\n\nYou need to ensure that the sales manager can see the correct sales data.\n\nWhat should you do?",
    "choices": [
      "Change the Microsoft Power BI license type of the sales manager.",
      "From Microsoft Power BI Desktop, edit the Row-Level Security setting for the reports.",
      "Manage the permissions of the underlying dataset.",
      "Request that the sales manager be added to the correct Azure Active Directory group."
    ],
    "correct": [
      3
    ],
    "explanation": "You can use the following groups to set up row level security.\n* Distribution Group\n* Mail-enabled Group - This group also contains a list of email addresses of members and can also be used to\ncontrol access to OneDrive and SharePoint.\nThe Mail-Enabled Security Group can be created in the Office 365 Admin Portal.\n* Security Group - This is also known as an Active Directory Security Group. This group lives within Active\nDirectory and Azure Active Directory.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/enterprise/service-admin-rls\nhttps://www.fourmoo.com/2020/04/01/power-bi-which-groups-can-be-used-to-set-permissions-in-power-bi/",
    "source": "Final",
    "sourceNumber": 304,
    "legacy": false
  },
  {
    "id": "f1-305-304",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have more than 100 published datasets.\n\nTen of the datasets were verified to meet your corporate quality standards.\n\nYou need to ensure that the 10 verified datasets appear at the top of the list of published datasets whenever users\n\nsearch for existing datasets.\n\nWhat should you do?",
    "choices": [
      "Promote the datasets.",
      "Certify the datasets.",
      "Feature the dataset on the home page.",
      "Publish the datasets in an app."
    ],
    "correct": [
      1
    ],
    "explanation": "Once logged in, you will be presented with a list of datasets that you can access from your various\nworkspaces. This is one reason why having official datasets promoted and certified is recommended, as these\nwill appear at the top of the list, with certified datasets appearing before promoted datasets.\nNote: Power BI provides two ways you can endorse your valuable, high-quality content to increase its visibility:\npromotion and certification.\nPromotion: Promotion is a way to highlight content you think is valuable and worthwhile for others to use. It\nencourages the collaborative use and spread of content within an organization.\nAny content owner, as well as any member with write permissions on the workspace where the content is\n\nlocated, can promote the content when they think it's good enough for sharing.\nCertification: Certification means that the content meets the organization's quality standards and can be\nregarded as reliable, authoritative, and ready for use across the organization.\nCurrently it is possible to endorse\n\nDatasets -\n\nDataflows -\n\nReports -\n\nApps -\nIf dataset discoverability has been enabled in your organization, endorsed datasets can be made discoverable.\nWhen a dataset is discoverable, users who don't have access to it will be able to find it and request access.\n\nReference:\nhttps://exceleratorbi.com.au/new-power-bi-reports-golden-dataset/ https://docs.microsoft.com/en-us/power-\nbi/collaborate-share/service-endorse-content",
    "source": "Final",
    "sourceNumber": 305,
    "legacy": false
  },
  {
    "id": "f1-306-305",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou have a Microsoft Power BI workspace.\n\nYou need to grant the user capabilities shown in the following table.\n\nThe solution must use the principle of least privilege.\n\nWhich user role should you assign to each user? To answer, drag the appropriate roles to the correct users. Each\n\nrole may be used once, more than once, or not at all. You may need to drag the split bar.\n\nNOTE: Each correct selection is worth one point.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Member -\n\nOnly Admin and Member can publish, unpublish, and change permissions for an app.\n\nIncorrect:\n\nContributors can update the app associated with the workspace, if the workspace Admin delegates this\npermission to them. However, they can't publish a new app or change who has permission to it.\n\nBox 2: Contributor -\n\nAdmin , Member and Contributor can create, edit, and delete content, such as reports, in the workspace.\n\nNote: Contributor - This role can access and interact with reports and dashboards. Additionally, this role can\ncreate, edit, copy, and delete items in a workspace, publish reports, schedule refreshes, and modify gateways.\n\nIncorrect:\n\nViewer - This role provides read only access to workspace items. Read access does provide report / dashboard\nconsumers the ability to not only view, but also interact with visuals. Interaction does not mean changing a\nvisual.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces\nhttps://www.mssqltips.com/sqlservertip/6487/power-bi-workspace-permissions-and-roles",
    "source": "Final",
    "sourceNumber": 306,
    "legacy": false,
    "image": "/dump-assets/f1-306-305-question.webp",
    "answerImage": "/dump-assets/f1-306-305-answer.webp"
  },
  {
    "id": "f1-307-306",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You create a dashboard by using the Microsoft Power BI Service. The dashboard contains a card visual that shows\n\ntotal sales from the current year.\n\nYou grant users access to the dashboard by using the Viewer role on the workspace.\n\nA user wants to receive daily notifications of the number shown on the card visual.\n\nYou need to automate the notifications.\n\nWhat should you do?",
    "choices": [
      "Create a subscription.",
      "Create a data alert.",
      "Share the dashboard to the user.",
      "Tag the user in a comment."
    ],
    "correct": [
      0
    ],
    "explanation": "A is correct, you need a subscription, not an alert as alerts don't include a snapshot and they will only be sent\nbased on a certain condition whereas here you want daily notifications, not just when the value exceeds a\ncertain threshold.\n\nIn Power BI, subscriptions allow users to automatically receive scheduled reports or dashboard updates, such\nas daily notifications, based on the data they are interested in. By creating a subscription to the dashboard,\nthe user will get daily updates on the total sales figure shown on the card visual.\n\nWhy other options are incorrect:\n\nB. Create a data alert: Alerts notify users when data meets specific conditions, but this doesn't send daily\nupdates.\n\nC. Share the dashboard: Sharing alone doesn't automate notifications.\n\nD. Tag the user in a comment: This is for communication within the dashboard, not for automated notifications.",
    "source": "Final",
    "sourceNumber": 307,
    "legacy": false
  },
  {
    "id": "f1-308-307",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a Power BI workspace named Workspace1 that contains a dataset named DS1 and a report named RPT1.\n\nA user wants to create a report by using the data in DS1 and publish the report to another workspace.\n\nYou need to provide the user with the appropriate access. The solution must minimize the number of access\n\npermissions granted to the user.\n\nWhat should you do?",
    "choices": [
      "Add the user as a Viewer of Workspace1.",
      "Grant the Build permission for DS1 to the user.",
      "Share RPT1 with the user.",
      "Add the user as a member of Workspace1."
    ],
    "correct": [
      1
    ],
    "explanation": "More granular permissions -\n\nPower BI provides the Build permission as a complement to the existing permissions, Read and Reshare. All\nusers who already had Read permission for datasets via app permissions, sharing, or workspace access at that\ntime also got Build permission for those same datasets. They got Build permission automatically because\nRead permission already granted them the right to build new content on top of the dataset, by using Analyze\nin Excel or Export.\n\nWith this more granular Build permission, you can choose who can only view the content in the existing report\nor dashboard and who can create content connected to the underlying datasets.\n\nIf your dataset is being used by a report outside the dataset workspace, you can't delete that dataset. Instead,\nyou see an error message.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions",
    "source": "Final",
    "sourceNumber": 308,
    "legacy": false
  },
  {
    "id": "f1-309-308",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have five reports and two dashboards in a workspace.\n\nYou need to grant all organizational users read access to one dashboard and three reports.\n\nSolution: You publish an app to the entire organization.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "The answer is A..Yes\n\nWhen you publish an app in Power BI, you can select the specific content you want to include in the app, such\n\nas reports and dashboards, and specify the access levels for each item. You can also choose to make the app\navailable to specific users or groups, or publish it to the entire organization.\n\nIf you publish an app to the entire organization, all users in your organization would have access to the app\nand its included content, as long as they have a Power BI license. You can set the appropriate access level for\neach item in the app, such as read-only access for the selected dashboard and reports, to ensure that users\nonly have access to the content they need.\n\nTherefore, publishing an app to the entire organization with the appropriate access levels for the dashboard\nand reports would meet the goal of granting all organizational users read access to one dashboard and three\nreports.",
    "source": "Final",
    "sourceNumber": 309,
    "legacy": false
  },
  {
    "id": "f1-310-309",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have five reports and two dashboards in a workspace.\n\nYou need to grant all organizational users read access to one dashboard and three reports.\n\nSolution: You enable included in app for all assets.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "You need to specify the dashboard and the three reports to be included in the app.\nInstead: You create an Azure Active Directory group that contains all the users. You share each selected\nreport and the one dashboard to the group.\nNote: A published App can provide the required access.\nWhen the dashboards and reports in your workspace are ready, you choose which dashboards and reports you\nwant to publish, then publish them as an app.\nIn Power BI, you can create official packaged content, then distribute it to a broad audience as an app. You\ncreate apps in workspaces, where you can collaborate on Power BI content with your colleagues. Then you\ncan publish the finished app to large groups of people in your organization.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/collaborate-share/service-create-distribute-apps",
    "source": "Final",
    "sourceNumber": 310,
    "legacy": false
  },
  {
    "id": "f1-311-310",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have five reports and two dashboards in a workspace.\n\nYou need to grant all organizational users read access to one dashboard and three reports.\n\nSolution: You assign all the users the Viewer role to the workspace.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "In this way all users will see all workspace content not only the one dashboard and 3 reports",
    "source": "Final",
    "sourceNumber": 311,
    "legacy": false
  },
  {
    "id": "f1-312-311",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "From Power BI Desktop, you publish a new dataset and report to a Power BI workspace. The dataset has a row-\n\nlevel security (RLS) role named HR.\n\nYou need to ensure that the HR team members have RLS applied when they view reports based on the dataset.\n\nWhat should you do?",
    "choices": [
      "From powerbi.com, add users to the HR role for the dataset.",
      "From powerbi.com, share the dataset to the HR team members.",
      "From Power BI Desktop, change the Row-Level Security settings.",
      "From Power BI Desktop, import a table that contains the HR team members."
    ],
    "correct": [
      0
    ],
    "explanation": "Working with members -\n\nAdd members -\n\nIn the Power BI service, you can add a member to the role by typing in the email address or name of the user\nor security group.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/enterprise/service-admin-rls",
    "source": "Final",
    "sourceNumber": 312,
    "legacy": false
  },
  {
    "id": "f1-313-312",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have a Power BI dashboard that monitors the quality of manufacturing processes. The dashboard contains the\n\nfollowing elements:\n\n✑ A line chart that shows the number of defective products manufactured by day\n\n✑ A KPI visual that shows the current daily percentage of defective products manufactured\n\nYou need to be notified when the daily percentage of defective products manufactured exceeds 3%.\n\nWhat should you create?",
    "choices": [
      "a subscription",
      "an alert",
      "a smart narrative visual",
      "a Q&A visual"
    ],
    "correct": [
      1
    ],
    "explanation": "Set alerts in the Power BI service to notify you when data on a dashboard changes above or below limits you\n\nset. Alerts can be set on tiles pinned from report visuals or from Power BI Q&A, and only on gauges, KPIs, and\ncards.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/consumer/end-user-alerts",
    "source": "Final",
    "sourceNumber": 313,
    "legacy": false
  },
  {
    "id": "f1-314-313",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You create a report by using Microsoft Power BI Desktop.\n\nThe report uses data from a Microsoft SQL Server Analysis Services (SSAS) cube located on your company's\n\ninternal network.\n\nYou plan to publish the report to the Power BI Service.\n\nWhat should you implement to ensure that users who consume the report from the Power BI Service have the most\n\nup-to-date data from the cube?",
    "choices": [
      "an OData feed",
      "an On-premises data gateway",
      "a subscription",
      "a scheduled refresh of the dataset"
    ],
    "correct": [
      1
    ],
    "explanation": "After you install the on-premises data gateway, you need to add data sources that can be used with the\ngateway. You can work with gateways and SQL Server\nAnalysis Services (SSAS) data sources that are used either for scheduled refresh or for live connections.\nNote: Power BI service is a cloud-based business analytics and data visualization service that enables anyone\nto visualize and analyze data with greater speed, efficiency, and understanding.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/service-gateway-enterprise-manage-ssas",
    "source": "Final",
    "sourceNumber": 314,
    "legacy": false
  },
  {
    "id": "f1-315-314",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have five sales regions. Each region is assigned a single salesperson.\n\nYou have an imported dataset that has a dynamic row-level security (RLS) role named Sales. The Sales role filters\n\nsales transaction data by salesperson.\n\nSalespeople must see only the data from their region.\n\nYou publish the dataset to powerbi.com, set RLS role membership, and distribute the dataset and related reports\n\nto the salespeople.\n\nA salesperson reports that she believes she should see more data.\n\nYou need to verify what data the salesperson currently sees.\n\nWhat should you do?",
    "choices": [
      "Use the Test as role option to view data as the salesperson's user account.",
      "Use the Test as role option to view data as the Sales role.",
      "Instruct the salesperson to open the report in Microsoft Power BI Desktop.",
      "Filter the data in the reports to match the intended logic in the filter on the sales transaction table."
    ],
    "correct": [
      0
    ],
    "explanation": "A, to be able to see what the specific salesperson sees (and compare it to what she should see) you should\n\ntest the report as that user account since the RLS is dynamic and based on the user accounts.",
    "source": "Final",
    "sourceNumber": 315,
    "legacy": false
  },
  {
    "id": "f1-316-315",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You have multiple dashboards.\n\nYou need to ensure that when users browse the available dashboards from powerbi.com, they can see which\n\ndashboards contain Personally Identifiable\n\nInformation (PII). The solution must minimize configuration effort and impact on the dashboard design.\n\nWhat should you use?",
    "choices": [
      "Microsoft Information Protection sensitivity labels",
      "tiles",
      "comments",
      "Active Directory groups"
    ],
    "correct": [
      0
    ],
    "explanation": "In the Power BI service, sensitivity labels can be applied to datasets, reports, dashboards, and dataflows.\nSensitivity labels on reports, dashboards, datasets, and dataflows are visible from many places in the Power\nBI service. Sensitivity labels on reports and dashboards are also visible in the Power BI iOS and Android mobile\napps and in embedded visuals. In Desktop, you can see the sensitivity label in the status bar.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/enterprise/service-security-sensitivity-label-overview",
    "source": "Final",
    "sourceNumber": 316,
    "legacy": false
  },
  {
    "id": "f1-317-316",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou have a dataset that has the permissions shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: use Analyze in Excel -\n\nBuild permission applies to datasets. When you give users Build permission, they can build new content on\nyour dataset, such as reports, dashboards, pinned tiles from Q&A, paginated reports, and Insights Discovery.\n\nUsers also need Build permissions to work with the data outside Power BI:\n\nTo export the underlying data.\n\nTo build new content on the dataset such as with Analyze in Excel.\n\nTo access the data via the XMLA endpoint.\n\nBox 2: Grant build permission\n\nsee: https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions\n\n\"Say you have Reshare and Build permission on a dataset. When you share a report or dashboard built on that\ndataset, you can specify that the recipients also get Build permission for the underlying dataset.\"\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions https://data-\nmarc.com/2021/07/30/transform-a-local-into-a-global-power-bi-solution-request-access-to-content/",
    "source": "Final",
    "sourceNumber": 317,
    "legacy": false,
    "image": "/dump-assets/f1-317-316-question.webp",
    "answerImage": "/dump-assets/f1-317-316-answer.webp"
  },
  {
    "id": "f1-318-317",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "Note: This question is part of a series of questions that present the same scenario. Each question in the series\n\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct\n\nsolution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not\n\nappear in the review screen.\n\nYou have five reports and two dashboards in a workspace.\n\nYou need to grant all organizational users read access to one dashboard and three reports.\n\nSolution: You create an Azure Active Directory group that contains all the users. You share each selected report\n\nand the one dashboard to the group.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "Yes, from the documentation a suggestion made there to share with more than 100 separate users is to \"Share\nwith a user group that contains all the",
    "source": "Final",
    "sourceNumber": 318,
    "legacy": false
  },
  {
    "id": "f1-319-318",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "DRAG DROP -\n\nYou have a Power BI table named Customer that contains a field named Email Address.\n\nYou discover that multiple records contain the same email address.\n\nYou need to create a calculated column to identify which records have duplicate email addresses.\n\nHow should you complete the DAX expression for the calculated column? To answer, drag the appropriate values\n\nto the correct targets. Each value may be used once, more than once, or not at all. You may need to drag the split\n\nbar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "Calculate\n\nCountrows\n\nAll",
    "source": "Final",
    "sourceNumber": 319,
    "legacy": false,
    "image": "/dump-assets/f1-319-318-question.webp",
    "answerImage": "/dump-assets/f1-319-318-answer.webp"
  },
  {
    "id": "f1-320-319",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou publish a dataset that contains data from an on-premises Microsoft SQL Server database.\n\nThe dataset must be refreshed daily.\n\nYou need to ensure that the Power BI service can connect to the database and refresh the dataset.\n\nWhich four actions should you perform n sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.",
    "choices": [],
    "correct": [],
    "explanation": "1.Configure an on-premises data gateway\n\nThe gateway serves as a bridge between the Power BI service and the on-premises SQL Server database.\n\n2.Add a data source\n\nYou need to define the connection to the on-premises SQL Server database within the configured gateway,\nincluding credentials and connection details.\n\n3.Add the dataset owner to the data source\n\nGrant the dataset owner access to the data source to ensure they have the required permissions for dataset\nrefresh.\n\n4.Configure a scheduled refresh\n\nFinally, set up the dataset's refresh schedule in the Power BI service to automate daily updates.\n\nExplanation:\n\nWhy this order?\n\nThe gateway must be configured first to enable connectivity to on-premises data.\n\nAdding a data source ensures that the gateway has the details to connect to the SQL Server database.\n\nDataset owners need access to the data source to enable refresh permissions.\n\nScheduling the refresh is the last step, as all prerequisites must be met before automation can be set up.\n\nWhy other orders are incorrect?\n\nWithout configuring the gateway first, there is no connection between Power BI and the on-premises\ndatabase.\n\nAdding a data source before configuring the gateway is invalid since the data source depends on the gateway\nconfiguration.\n\nScheduled refresh cannot be configured until the connection is established and permissions are set.\n\nhttps://learn.microsoft.com/en-us/data-integration/gateway/service-gateway-install\n\nhttps://learn.microsoft.com/en-us/power-bi/connect-data/service-gateway-sql-tutorial",
    "source": "Final",
    "sourceNumber": 320,
    "legacy": false,
    "image": "/dump-assets/f1-320-319-question.webp",
    "answerImage": "/dump-assets/f1-320-319-answer.webp"
  },
  {
    "id": "f1-321-320",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a Power BI dataset and a connected report.\n\nYou need to ensure that users can analyze data in Microsoft Excel only by connecting directly to the dataset.\n\nYou grant the users the Build permission for the dataset.\n\nWhat should you do next?",
    "choices": [
      "Certify the dataset used by the report.",
      "Change the default visual interaction for the report.",
      "For the report, change the Export data setting to None.",
      "For the report, change the Export data setting to Summarized data, data with current layout and underlying data."
    ],
    "correct": [
      2
    ],
    "explanation": "C is the correct answer. Note the part of the question that says \"ONLY by connecting directly to the dataset.\"\nAs mentioned in https://www.designmind.com/blog/business-intelligence/export-underlying-data-in-power-\nbi, \"You should export summarized data when you want to see the relevant data in the visualization.\"\nTherefore, D cannot be the right answer, as summarized data is not obtained from connecting directly to the\ndataset, but rather by effectively filtering the dataset based on the contents of the visualization.\n\nAdditionally, the \"data with current layout and underlying data\" part is irrelevant - by allowing Summarized\ndata to be exported, we allow forms of analyzing data other than connecting directly to the dataset, and thus\nfail the requirements of the question.",
    "source": "Final",
    "sourceNumber": 321,
    "legacy": true
  },
  {
    "id": "f1-322-321",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have two Power BI workspaces named WorkspaceA and WorkspaceB. WorkspaceA contains two datasets\n\nnamed Sales and HR.\n\nYou need to provide a user named User1 with access to the WorkspaceB. The solution must meet the following\n\nrequirements:\n\n• Create reports that use the HR dataset.\n\n• Publish the reports to WorkspaceB.\n\n• Prevent the ability to modify the HR dataset.\n\n• Prevent the ability to add users to Workspaces.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Grant User 1 the Build Permission for the HR dataset\n\nAssign User 1 the Contributor role for Workspace B\n\nBuild and contributor role to workspace B because the user already has build permission for the HR dataset in\nworkspace A and now should be able to publish in workspace B, so the user should be given Contributor role\nto workspace B.\n\nTo copy a report to another workspace, and to create a report in another workspace based on a dataset in the\ncurrent workspace, you need Build permission for the dataset. You also need at least the Contributor role on\nthe source and destination workspaces. For datasets in the original workspace, if you have at least the\nContributor role, you automatically have Build permission through your workspace role.",
    "source": "Final",
    "sourceNumber": 322,
    "legacy": false,
    "image": "/dump-assets/f1-322-321-question.webp",
    "answerImage": "/dump-assets/f1-322-321-answer.webp"
  },
  {
    "id": "f1-323-322",
    "domain": "Manage and secure Power BI",
    "type": "multi",
    "prompt": "You have a Power BI workspace named BI Data that contains a dataset named BI Finance.\n\nYou have the Build permission for the BI Finance dataset, but you do NOT have permissions for the workspace.\n\nYou need to connect to BI Finance and create a report.\n\nWhich two actions should you perform? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "From the Power BI service, create a dataflow to the dataset by using DirectQuery.",
      "From Power BI Desktop, connect to a Dataverse data source.",
      "From the Power BI service, create a new report and select a published dataset.",
      "From Power BI Desktop, connect to a shared dataset."
    ],
    "correct": [
      2,
      3
    ],
    "explanation": "The answer is correct : CD From the Power BI service, create a new report and select a published dataset.From\nPower BI Desktop, connect to a shared dataset.\n\nWhy C is Correct:\n\nIn the Power BI service, you can create a report by selecting a published dataset that you have Build\npermission for, even if you lack permissions for the workspace.\n\nThe Build permission allows you to connect to the dataset, build new reports, and save them in your own\nworkspace or other workspaces where you have permissions.\n\nWhy D is Correct:\n\nUsing Power BI Desktop, you can connect to a shared dataset in the Power BI service (via \"Power BI Datasets\"\nas the data source) if you have Build permission for it.\n\nAfter connecting, you can create a report in Power BI Desktop and then publish it to a workspace where you\nhave appropriate permissions.\n\nWhy Other Options Are Incorrect:\n\nA. From the Power BI service, create a dataflow to the dataset by using DirectQuery:\n\nDataflows are not used to create reports or connect to published datasets. Dataflows are primarily for data\npreparation, not report creation.\n\nB. From Power BI Desktop, connect to a Dataverse data source:\n\nThis option is unrelated to the BI Finance dataset. Dataverse is a specific type of data source, not a way to\nconnect to a published Power BI dataset.",
    "source": "Final",
    "sourceNumber": 323,
    "legacy": true
  },
  {
    "id": "f1-324-323",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You publish a dataset to the Power BI service. The dataset contains a connection to an on-premises Microsoft SQL\n\nServer database.\n\nYou attempt to configure a scheduled refresh but cannot select the appropriate on-premises data gateway.\n\nYou confirm the following with the administrator of the gateway:\n\n•You have the appropriate permissions to use the gateway.\n\n•The data source was created on the gateway.\n\n•The gateway has a status of Running.\n\nWhat is the most likely reason the gateway is unavailable?",
    "choices": [
      "The type of data source is not supported by the on-premises data gateway.",
      "The server name in the PBIX file does not match the data source name in the gateway.",
      "The credentials for the data source are invalid.",
      "The data source is configured to use single sign-on (SSO)."
    ],
    "correct": [
      1
    ],
    "explanation": "In Power BI, when you configure a data source to use an on-premises data gateway, the server name and other\nconnection details in your PBIX file must match the data source configuration in the gateway. If there's a\nmismatch in the server name or other connection details, the scheduled refresh won't work, and you won't be\nable to select the appropriate gateway.\n\nThe issue is most likely caused by a mismatch between the server name in the Power BI report (PBIX file) and\nthe data source configuration in the on-premises data gateway. Power BI needs the server name in the report\nto exactly match the one configured in the gateway for the scheduled refresh to be available.\n\nWhy other options are incorrect:\n\nA: If the data source type was unsupported, it wouldn’t allow any connection, not just scheduled refresh.\n\nC: Invalid credentials typically block access but would show a different error.\n\nD: Single sign-on would not prevent the selection of the gateway.",
    "source": "Final",
    "sourceNumber": 324,
    "legacy": false
  },
  {
    "id": "f1-325-324",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You create a report by using Microsoft Power BI Desktop.\n\nThe report uses data from a Microsoft SQL Server Analysis Services (SSAS) tabular model located on your\n\ncompany's internal network.\n\nYou plan to publish the report to the Power BI Service.\n\nWhat should you implement to ensure that users who consume the report from the Power BI Service have the most\n\nup-to-date data from the tabular model?",
    "choices": [
      "a scheduled refresh of the semantic model",
      "an OData feed",
      "an On-premises data gateway",
      "a subscription"
    ],
    "correct": [
      2
    ],
    "explanation": "an On-premises data gateway.\n\nTo ensure that users in the Power BI Service always have the most up-to-date data from an on-premises SQL\nServer Analysis Services (SSAS) tabular model, you need to use an on-premises data gateway. This gateway\nsecurely connects the Power BI Service to on-premises data sources, allowing scheduled refreshes and real-\ntime data access.\n\nWhy other options are incorrect:\n\nA: Scheduled refresh is for cloud data sources, not for on-premises SSAS.\n\nB: OData feed is not suitable for SSAS connections.\n\nD: Subscriptions only deliver reports; they don't ensure data refresh.",
    "source": "Final",
    "sourceNumber": 325,
    "legacy": false
  },
  {
    "id": "f1-326-325",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a semantic model that has the permissions shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information\n\npresented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Use Analyze in Excel with.\n\ngrant the Build permission for.\n\nsee: https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions\n\n\"Say you have Reshare and Build permission on a dataset. When you share a report or dashboard built on that\ndataset, you can specify that the recipients also get Build permission for the underlying dataset.\"\n\nIf you have Reshare and Build permission on a dataset, and you share a report or dashboard you built on that\ndataset, you can specify that the recipients also get Build permission for the dataset. For more information,\nsee Share Power BI reports and dashboards with coworkers and others.\n\nhttps://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions",
    "source": "Final",
    "sourceNumber": 326,
    "legacy": false,
    "image": "/dump-assets/f1-326-325-question.webp",
    "answerImage": "/dump-assets/f1-326-325-answer.webp"
  },
  {
    "id": "f1-327-326",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a Power BI semantic model named Model1 that contains sales data.\n\nYou need to ensure that Model1 is refreshed on the first day of each month to include last month’s sales data.\n\nWhat should you configure?",
    "choices": [
      "a scheduled refresh",
      "an incremental refresh",
      "a Microsoft Power Automate flow",
      "an on-premises data gateway"
    ],
    "correct": [
      0
    ],
    "explanation": "a scheduled refresh.\n\nWhile incremental refresh can help optimize the refresh process by refreshing only the data that has changed,\nit does not set the schedule for when the refresh happens. It helps with large datasets by minimizing data\nreloads, but it doesn’t solve the requirement of scheduling the refresh for the first day of each month.",
    "source": "Final",
    "sourceNumber": 327,
    "legacy": false
  },
  {
    "id": "f1-328-327",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nOverview -\n\nLitware, Inc. is an online retailer that uses Power BI.\n\nLitware plans to leverage data from an Azure SQL database that stores data for the company's live e-commerce\n\nwebsite.\n\nLitware uses Azure Active Directory (Azure AD) to authenticate users.\n\nExisting Environment. Sales Data\n\nLitware has online sales data that has the SQL schema shown in the following table.\n\nIn the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.\n\nThe week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.\n\nIn the Sales table, the sales_id column represents a unique transaction.\n\nThe region id column can be managed by only one sales manager.\n\nExisting Environment. Data Concerns\n\nYou are concerned with the quality and completeness of the sales data. You must ensure that negative and missing\n\nsales_amount values do NOT contribute to the total sales amount calculation.\n\nExisting Environment. Reporting Requirements\n\nLitware identifies the following reporting requirements:\n\nExecutives require a visual that shows sales by region.\n\nExecutives require a visual that shows returns by region manager and the sales managers that report to them.\n\nThe sales managers must be able to see only the sales data of their respective region.\n\nThe sales managers require a visual to analyze sales performance versus sales targets.\n\nThe sales department requires reports that contain the number of sales transactions.\n\nUsers must be able to see the month in each report as shown in the following example: Feb 2020.\n\nThe customer service department requires a visual that can be filtered by both sales month and ship month\n\nindependently.\n\nThe maximum allowed latency to include transactions in reports is five minutes. Question You need to create the\n\nrequired relationship for the executive's visual.\n\nWhat should you do before you can create the relationship?",
    "choices": [
      "Change the data type of Sales[region_id] to Whole Number.",
      "Change the data type of Sales[region_id] to Decimal Number.",
      "In the Sales table, add a measure for Sum(sales_amount).",
      "Change the data type of Sales[sales_id] to Text."
    ],
    "correct": [
      0
    ],
    "explanation": "Executives require a visual that shows sales by region.\n\nThe data type of Sales[region_id] must be changed from varchar to Whole Number, as Sales[region_id] is\nInteger.",
    "source": "Final",
    "sourceNumber": 328,
    "legacy": false,
    "image": "/exhibit-assets/f1-328-327.webp"
  },
  {
    "id": "f1-329-328",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nOverview -\n\nLitware, Inc. is an online retailer that uses Power BI.\n\nLitware plans to leverage data from an Azure SQL database that stores data for the company's live e-commerce\n\nwebsite.\n\nLitware uses Azure Active Directory (Azure AD) to authenticate users.\n\nExisting Environment. Sales Data\n\nLitware has online sales data that has the SQL schema shown in the following table.\n\nIn the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.\n\nThe week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.\n\nIn the Sales table, the sales_id column represents a unique transaction.\n\nThe region id column can be managed by only one sales manager.\n\nExisting Environment. Data Concerns\n\nYou are concerned with the quality and completeness of the sales data. You must ensure that negative and missing\n\nsales_amount values do NOT contribute to the total sales amount calculation.\n\nExisting Environment. Reporting Requirements\n\nLitware identifies the following reporting requirements:\n\nExecutives require a visual that shows sales by region.\n\nExecutives require a visual that shows returns by region manager and the sales managers that report to them.\n\nThe sales managers must be able to see only the sales data of their respective region.\n\nThe sales managers require a visual to analyze sales performance versus sales targets.\n\nThe sales department requires reports that contain the number of sales transactions.\n\nUsers must be able to see the month in each report as shown in the following example: Feb 2020.\n\nThe customer service department requires a visual that can be filtered by both sales month and ship month\n\nindependently.\n\nThe maximum allowed latency to include transactions in reports is five minutes. Question You need to get data\n\nfrom the Microsoft SQL Server tables.\n\nWhat should you use to configure the connection?",
    "choices": [
      "Import that uses a Microsoft account",
      "Import that uses a database credential",
      "DirectQuery that uses a database credential",
      "DirectQuery that uses the end-user's credentials"
    ],
    "correct": [
      2
    ],
    "explanation": "C. DirectQuery that uses a database credential\n\nIf you used the credentials of the user (D) then all users would need to be created in the database.",
    "source": "Final",
    "sourceNumber": 329,
    "legacy": false,
    "image": "/exhibit-assets/f1-329-328.webp"
  },
  {
    "id": "f1-330-329",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You are creating a new semantic model in Microsoft Power BI Desktop.\n\nYou connect to a recently used data source and receive an error message indicating that the password is expired.\n\nYou need to update the credentials for the data source.\n\nWhat should you do?",
    "choices": [
      "From Data Source settings, select the data source, and then select Edit Permissions.",
      "From Options, select Data Load, and then select Clear Cache.",
      "From Power Query Editor, select Refresh Preview.",
      "From the Modeling tab, select Manage Roles, and then add a role."
    ],
    "correct": [
      0
    ],
    "explanation": "A. From Data Source settings, select the data source, and then select Edit Permissions.\n\nData Source Settings: This option allows you to manage the credentials for your data sources. By selecting\nthe data source and choosing to edit permissions, you can update the credentials, such as entering a new\npassword if the old one has expired.",
    "source": "Final",
    "sourceNumber": 330,
    "legacy": false
  },
  {
    "id": "f1-331-330",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You use Power BI Desktop to open a PBIX file that contains a Microsoft Excel data source.\n\nYou attempt to refresh the data and receive the following error message.\n\nExpression.Error: The column ‘Cost’ of the table wasn't found.\n\nWhat is a possible cause of the error?",
    "choices": [
      "The Cost column was renamed in the data source.",
      "The privacy level of the data source does not allow combining the data with other data sources.",
      "The data in the Cost column cannot be converted into the target data type.",
      "The source file was moved to a new location."
    ],
    "correct": [
      0
    ],
    "explanation": "A. The Cost column was renamed in the data source.\n\nWhen a column name is changed in the data source (e.g., Microsoft Excel), Power BI will not be able to find the\ncolumn with the original name during the refresh, leading to the error you encountered.",
    "source": "Final",
    "sourceNumber": 331,
    "legacy": false
  },
  {
    "id": "f1-332-331",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a Power BI tenant that contains a workspace named WS1. WS1 contains the following items:\n\n•A semantic model named SM1.\n\n•A report named RPT1 that is connected to SM1.\n\n•A report named RPT2 that is connected to SM1.\n\n•A report named RPT3 that is connected to SM1.\n\n•A dashboard named DB1 that contains content from RPT1 and RPT2.\n\nYou need to grant workspace access to a group named Group1. The solution must meet the following\n\nrequirements:\n\n•Group1 must be able to view RPT1, RPT2, and DB1.\n\n•Group1 must be prevented from viewing RPT3.\n\n•Group1 must be prevented from creating new reports and dashboards by using SM1.\n\n•Group1 must be prevented from sharing the reports and dashboards to other users.\n\n•Administrative effort must be minimized.\n\nWhat should you do?",
    "choices": [
      "Publish an app.",
      "Assign Group1 the Viewer role for WS1.",
      "Store PBIX files in a shared folder in Microsoft OneDrive.",
      "Share each item individually."
    ],
    "correct": [
      0
    ],
    "explanation": "Group1 must view specific reports and dashboards (RPT1, RPT2, DB1):•Publishing an app allows you to share\nselected reports and dashboards with specific groups or users.•Group1 must be prevented from viewing\nRPT3:•Apps allow fine-grained control, so you can exclude RPT3 from the app content.•Group1 must not\ncreate new reports or dashboards or share content:•When users access content via an app, they cannot edit or\ncreate new reports/dashboards or share the app itself.•Minimize administrative effort:•Publishing an app is\nsimpler and more manageable than other options.",
    "source": "Final",
    "sourceNumber": 332,
    "legacy": false
  },
  {
    "id": "f1-333-332",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Power BI semantic model named Model1 that will be used to support reports viewed in the Power BI\n\nservice.\n\nModel1 contains data from the following sources:\n\n•An Azure SQL database that is accessible only via a private endpoint\n\n•A Microsoft Excel file stored in Microsoft SharePoint Online\n\n•A Microsoft SQL Server database in a private datacenter\n\nYou need to publish Model1 and schedule the model to refresh 12 times a day.\n\nHow many data sources require a data gateway, and which license mode will the workspace require to support the\n\nscheduled refresh? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "1. Data Sources: 2.\n\nThis selection suggests that the system or report is using two data sources.\n\nData sources in Power BI can include databases (SQL Server, Azure, etc.), cloud services, Excel files, APIs, and\nmore.\n\nThe choice of \"2\" means the report is integrating data from two separate sources.\n\n2. License Mode: Premium Per User (PPU).\n\nPower BI offers different licensing modes:\n\nEmbedded: Used for embedding reports in applications, typically for external users.\n\nPro: Required for sharing reports and collaborating within an organization.\n\nPremium Per User (PPU): A mix of Power BI Pro and Premium, offering advanced AI, larger dataset storage,\nand paginated reports at a per-user cost.",
    "source": "Final",
    "sourceNumber": 333,
    "legacy": false,
    "image": "/dump-assets/f1-333-332-question.webp",
    "answerImage": "/dump-assets/f1-333-332-answer.webp"
  },
  {
    "id": "f1-334-333",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP\n\n-\n\nYou have a Power BI semantic model.\n\nYou need to configure row-level security (RLS) to restrict data access for users that have the Viewer permissions.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of\n\nactions to the answer area and arrange them in the correct order.",
    "choices": [],
    "correct": [],
    "explanation": "1. From Microsoft Power BI Desktop, create a new RLS role by using a DAX filter.\n\nYou must first define the RLS roles and the corresponding DAX filters in Power BI Desktop to determine how\ndata is restricted for different users.\n\n2. Publish the semantic model.\n\nAfter creating the RLS roles, you need to publish the semantic model to the Power BI Service to apply these\nroles in the cloud environment.\n\n3. From the Power BI service, assign the new RLS role to the users.\n\nOnce the model is published, you assign the roles to specific users or groups in the Power BI Service to\nenforce RLS.",
    "source": "Final",
    "sourceNumber": 334,
    "legacy": false,
    "image": "/dump-assets/f1-334-333-question.webp",
    "answerImage": "/dump-assets/f1-334-333-answer.webp"
  },
  {
    "id": "f1-335-334",
    "domain": "Manage and secure Power BI",
    "type": "multi",
    "prompt": "You have a Power BI report named Report1.\n\nYou plan to share Report1 with multiple users.\n\nYou need to add the users to a group.\n\nWhich two types of groups can you use? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "security group",
      "distribution group",
      "Microsoft Teams team",
      "Microsoft 365 group"
    ],
    "correct": [
      0,
      3
    ],
    "explanation": "To share a Power BI report named Report1 with multiple users by adding them to a group, you can use the\nfollowing types of groups:A. Security groupD. Microsoft 365 groupBoth security groups and Microsoft 365\ngroups can be used to manage access to Power BI reports. Security groups are typically used for managing\npermissions and access control, while Microsoft 365 groups provide a collaborative workspace with shared\nresources, including access to Power BI reports. Distribution groups and Microsoft Teams teams are not\ntypically used for managing access to Power BI reports in this context.\n\nA. security group Security groups can be used to manage user access and permissions in Power BI.D.\nMicrosoft 365 group Microsoft 365 groups (formerly known as Office 365 groups) can also be used to\nmanage access and permissions in Power BI, and they integrate well with other Microsoft 365 services.",
    "source": "Final",
    "sourceNumber": 335,
    "legacy": false
  },
  {
    "id": "f1-336-335",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You plan to create a Power BI report that will be connected to multiple data sources. One of the data sources\n\ncontains tax records.\n\nYou need to ensure that other queries cannot access the tax record information.\n\nTo what should you set Privacy Level for the data source?",
    "choices": [
      "None",
      "Organizational",
      "Private",
      "Public"
    ],
    "correct": [
      2
    ],
    "explanation": "Setting the Privacy Level to Private ensures that the data source is completely isolated from all other sources\nin Power Query.- This prevents data leakage through query folding or merging operations, which could\notherwise expose sensitive tax record information to less secure sources.- Power BI will block any attempt to\ncombine this data with other sources unless they are also marked Private and reside in the same isolation\nzone.",
    "source": "Final",
    "sourceNumber": 336,
    "legacy": false
  },
  {
    "id": "f1-337-336",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a semantic model named Model1.\n\nYou need to ensure that users can verify that the data in Model1 meets corporate standards.\n\nWhat should you do?",
    "choices": [
      "Create an image of Model1.",
      "Promote Model1.",
      "Certify Model1.",
      "Apply a sensitivity label to Model1."
    ],
    "correct": [
      2
    ],
    "explanation": "Certification is the highest level of endorsement in Power BI’s data governance framework.- It signals to users\n\nthat Model1 has been reviewed and approved by trusted data stewards or administrators as meeting\ncorporate standards for quality, accuracy, and compliance.- Certified datasets appear with a badge and are\nprioritized in search results, helping users confidently choose the right data source.",
    "source": "Final",
    "sourceNumber": 337,
    "legacy": false
  },
  {
    "id": "f1-338-337",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You attempt to open a PBIX file in Microsoft Power BI Desktop and receive the following error message in Power\n\nQuery Editor.\n\nDataSource.Error: Could not find file D:\\Data.txt.\n\nHow should you resolve the issue?",
    "choices": [
      "Update the Microsoft OLE DB Provider client libraries on your client computer.",
      "Change the file path of Data.txt.",
      "Change the file format to CSV.",
      "Use an on-premises data gateway."
    ],
    "correct": [
      1
    ],
    "explanation": "B: Change the file path of Data.txt.\n\nPlacing the Data.txt file in D:\\, if you have access to it, or\n\nGoing to Power Query Editor → Source step and modifying the file path to wherever Data.txt is currently\nstored on your machine.",
    "source": "Final",
    "sourceNumber": 338,
    "legacy": false
  },
  {
    "id": "f1-339-338",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a Fabric workspace named Workspace1 that contains two Power BI reports named Report1 and Report2.\n\nYou create a workspace app that contains both reports.\n\nYou need to ensure that the app meets the following requirements:\n\n•Report1 must be visible to all the users in your organization.\n\n•Report2 must be visible to only a security group named Group1.\n\nWhat should you do next?",
    "choices": [
      "Assign Group1 the Viewer role for Workspace1.",
      "Create an audience and assign Group1 to the audience.",
      "Allow access to the hidden content of the app.",
      "Share Report1 with the built-in All users security group."
    ],
    "correct": [
      1
    ],
    "explanation": "B. Create an audience and assign Group1 to the audience.\n\nPower BI apps now support audiences, which allow you to:\n\nCustomize which reports are visible to which groups.\n\nAssign different content to different audiences (e.g., departments, roles, security groups).\n\nYou can:\n\nPublish Report1 to the default (All Users) audience.\n\nCreate a new audience for Group1 and publish Report2 only to them.\n\nThis approach meets both requirements in a clean and scalable way.",
    "source": "Final",
    "sourceNumber": 339,
    "legacy": false
  },
  {
    "id": "f1-340-339",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT\n\n-\n\nYou have a Fabric workspace that contains the items shown in the following table.\n\nYou need to make content available to the management department and the accounting department at your\n\ncompany. The solution must meet the following requirements:\n\n•The management department must have view access to the Headcount and Department Expenses reports.\n\n•The management department must NOT be able to view any other current or future reports.\n\n•The management department must NOT be able to build new reports by using the semantic models.\n\n•The accounting department must only be able to view the Company Expenses report.\n\n•The accounting department must be able to build new reports by using the Expenses semantic model.\n\nThe solution must follow the principle of least privilege and minimize administrative effort.\n\nHow should you make the content available to the users in each department? To answer, select the appropriate\n\noptions in the answer area.\n\nNOTE: Each collect selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Management: Publish an app.\n\nPower BI Apps are the best way to distribute reports to a large group of users in a managed and user-friendly\nmanner.\n\nWith an app, you:\n\nBundle multiple reports and dashboards\n\nControl who has access\n\nUsers get a read-only, curated experience\n\nAccounting: Assign the Viewer role for the workspace.\n\nIf only a few users in the accounting department need access and are comfortable accessing the report from\nthe workspace, giving them the Viewer role is efficient.\n\nViewer role:\n\nAllows read-only access\n\nLets users access all reports/dashboards in the workspace\n\nRequires Power BI Pro license (or Premium workspace)",
    "source": "Final",
    "sourceNumber": 340,
    "legacy": false,
    "image": "/dump-assets/f1-340-339-question.webp",
    "answerImage": "/dump-assets/f1-340-339-answer.webp"
  },
  {
    "id": "f1-341-340",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You have a PBIX file that contains sensitive information.\n\nYou need to secure the information to meet the following requirements:\n\n•Only internal users must be able to open the file if the file is shared via email.\n\n•Once the file is published, only internal users must be able to open the semantic model and the report downloaded\n\nfrom the Power BI service.\n\nWhat should you do?",
    "choices": [
      "From Microsoft Power BI Desktop, apply a sensitivity label.",
      "Certify the semantic model and the report.",
      "Use a live connection for the file.",
      "From the Power BI service, apply a sensitivity label."
    ],
    "correct": [
      0
    ],
    "explanation": "A .From Microsoft Power BI Desktop, apply a sensitivity label: You can apply sensitivity labels directly in\nPower BI Desktop before publishing. When you publish a PBIX file with a sensitivity label, that label (and its\nassociated protection settings) travels with the semantic model and report into the service.",
    "source": "Final",
    "sourceNumber": 341,
    "legacy": false
  },
  {
    "id": "f1-342-341",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nGeneral Overview -\n\nNorthwind Traders is a specialty food import company.\n\nThe company recently implemented Power BI to better understand its top customers, products, and suppliers.\n\nBusiness Issues -\n\nThe sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting Services\n\n(SSRS). The IT department takes too long to generate the reports and often misunderstands the report\n\nrequirements.\n\nExisting Environment. Data Sources\n\nNorthwind Traders uses the data sources shown in the following table.\n\nSource2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.\n\nExisting Environment. Customer Worksheet\n\nSource2 contains a single worksheet named Customer Details. The first 11 rows of the worksheet are shown in the\n\nfollowing table.\n\nAll the fields in Source2 are mandatory.\n\nThe Address column in Customer Details is the billing address, which can differ from the shipping address.\n\nExisting Environment. Azure SQL Database\n\nSource1 contains the following tables:\n\nOrders\n\nProducts\n\nSuppliers\n\nCategories\n\nOrder Details\n\nSales Employees\n\nThe Orders table contains the following columns.\n\nThe Order Details table contains the following columns.\n\nThe address in the Orders table is the shipping address, which can differ from the billing address.\n\nThe Products table contains the following columns.\n\nThe Categories table contains the following columns.\n\nThe Suppliers table contains the following columns.\n\nThe Sales Employees table contains the following columns.\n\nEach employee in the Sales Employees table is assigned to one sales region. Multiple employees can be assigned\n\nto each region.\n\nRequirements. Report Requirements\n\nNorthwind Traders requires the following reports:\n\nTop Products\n\nTop Customers\n\nOn-Time Shipping\n\nThe Top Customers report will show the top 20 customers based on the highest sales amounts in a selected order\n\nmonth or quarter, product category, and sales region.\n\nThe Top Products report will show the top 20 products based on the highest sales amounts sold in a selected order\n\nmonth or quarter, sales region, and product category. The report must also show which suppliers provide the top\n\nproducts.\n\nThe On-Time Shipping report will show the following metrics for a selected shipping month or quarter:\n\nThe percentage of orders that were shipped late by country and shipping region\n\nCustomers that had multiple late shipments during the last quarter\n\nNorthwind Traders defines late orders as those shipped after the required shipping date.\n\nThe warehouse shipping department must be notified if the percentage of late orders within the current month\n\nexceeds 5%.\n\nThe reports must show historical data for the current calendar year and the last three calendar years.\n\nRequirements. Technical Requirements\n\nNorthwind Traders identifies the following technical requirements:\n\nA single dataset must support all three reports.\n\nThe reports must be stored in a single Power BI workspace.\n\nReport data must be current as of 7 AM Pacific Time each day.\n\nThe reports must provide fast response times when users interact with a visualization.\n\nThe data model must minimize the size of the dataset as much as possible, while meeting the report requirements\n\nand the technical requirements.\n\nRequirements. Security Requirements\n\nAccess to the reports must be granted to Azure Active Directory (Azure AD) security groups only. An Azure AD\n\nsecurity group exists for each department.\n\nThe sales department must be able to perform the following tasks in Power BI:\n\nCreate, edit, and delete content in the reports.\n\nManage permissions for workspaces, datasets, and reports.\n\nPublish, unpublish, update, and change the permissions for an app.\n\nAssign Azure AD groups role-based access to the reports workspace.\n\nUsers in the sales department must be able to access only the data of the sales region to which they are assigned\n\nin the Sales Employees table.\n\nPower BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees table.\n\n[EmailAddress] = USERNAME()\n\nRLS will be applied only to the sales department users. Users in all other departments must be able to view all the\n\ndata. Question You need to create the dataset.\n\nWhich dataset mode should you use?",
    "choices": [
      "Import",
      "DirectQuery",
      "Composite",
      "live connection"
    ],
    "correct": [
      0
    ],
    "explanation": "You wouldn't use composite for all. I would say import as the SQL Server data is only 2GB and excel is really\nsmall. Also, only need it refreshing once a day so this dataset is very small. Answer is A (Import)",
    "source": "Final",
    "sourceNumber": 342,
    "legacy": false,
    "image": "/exhibit-assets/f1-342-341.webp"
  },
  {
    "id": "f1-343-342",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nGeneral Overview -\n\nNorthwind Traders is a specialty food import company.\n\nThe company recently implemented Power BI to better understand its top customers, products, and suppliers.\n\nBusiness Issues -\n\nThe sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting Services\n\n(SSRS). The IT department takes too long to generate the reports and often misunderstands the report\n\nrequirements.\n\nExisting Environment. Data Sources\n\nNorthwind Traders uses the data sources shown in the following table.\n\nSource2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.\n\nExisting Environment. Customer Worksheet\n\nSource2 contains a single worksheet named Customer Details. The first 11 rows of the worksheet are shown in the\n\nfollowing table.\n\nAll the fields in Source2 are mandatory.\n\nThe Address column in Customer Details is the billing address, which can differ from the shipping address.\n\nExisting Environment. Azure SQL Database\n\nSource1 contains the following tables:\n\nOrders\n\nProducts\n\nSuppliers\n\nCategories\n\nOrder Details\n\nSales Employees\n\nThe Orders table contains the following columns.\n\nThe Order Details table contains the following columns.\n\nThe address in the Orders table is the shipping address, which can differ from the billing address.\n\nThe Products table contains the following columns.\n\nThe Categories table contains the following columns.\n\nThe Suppliers table contains the following columns.\n\nThe Sales Employees table contains the following columns.\n\nEach employee in the Sales Employees table is assigned to one sales region. Multiple employees can be assigned\n\nto each region.\n\nRequirements. Report Requirements\n\nNorthwind Traders requires the following reports:\n\nTop Products\n\nTop Customers\n\nOn-Time Shipping\n\nThe Top Customers report will show the top 20 customers based on the highest sales amounts in a selected order\n\nmonth or quarter, product category, and sales region.\n\nThe Top Products report will show the top 20 products based on the highest sales amounts sold in a selected order\n\nmonth or quarter, sales region, and product category. The report must also show which suppliers provide the top\n\nproducts.\n\nThe On-Time Shipping report will show the following metrics for a selected shipping month or quarter:\n\nThe percentage of orders that were shipped late by country and shipping region\n\nCustomers that had multiple late shipments during the last quarter\n\nNorthwind Traders defines late orders as those shipped after the required shipping date.\n\nThe warehouse shipping department must be notified if the percentage of late orders within the current month\n\nexceeds 5%.\n\nThe reports must show historical data for the current calendar year and the last three calendar years.\n\nRequirements. Technical Requirements\n\nNorthwind Traders identifies the following technical requirements:\n\nA single dataset must support all three reports.\n\nThe reports must be stored in a single Power BI workspace.\n\nReport data must be current as of 7 AM Pacific Time each day.\n\nThe reports must provide fast response times when users interact with a visualization.\n\nThe data model must minimize the size of the dataset as much as possible, while meeting the report requirements\n\nand the technical requirements.\n\nRequirements. Security Requirements\n\nAccess to the reports must be granted to Azure Active Directory (Azure AD) security groups only. An Azure AD\n\nsecurity group exists for each department.\n\nThe sales department must be able to perform the following tasks in Power BI:\n\nCreate, edit, and delete content in the reports.\n\nManage permissions for workspaces, datasets, and reports.\n\nPublish, unpublish, update, and change the permissions for an app.\n\nAssign Azure AD groups role-based access to the reports workspace.\n\nUsers in the sales department must be able to access only the data of the sales region to which they are assigned\n\nin the Sales Employees table.\n\nPower BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees table.\n\n[EmailAddress] = USERNAME()\n\nRLS will be applied only to the sales department users. Users in all other departments must be able to view all the\n\ndata. Question You need to configure access for the sales department users. The solution must the meet the\n\nsecurity requirements.\n\nWhat should you do?",
    "choices": [
      "Share each report to the Azure Active Directory group of the sales department.",
      "Add the Azure Active Directory group of the sales department as an Admin of the reports workspace.",
      "Distribute an app to the users in the Azure Active Directory group of the sales department.",
      "Add the sales department as a member of the reports workspace."
    ],
    "correct": [
      3
    ],
    "explanation": "D - Add the sales department as a member of the reports workspace.\n\nFor the actions they need to perform (edit reports, publish app, etc) the Member role would be the least\nprivilege",
    "source": "Final",
    "sourceNumber": 343,
    "legacy": false,
    "image": "/exhibit-assets/f1-343-342.webp"
  },
  {
    "id": "f1-344-343",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nGeneral Overview -\n\nNorthwind Traders is a specialty food import company.\n\nThe company recently implemented Power BI to better understand its top customers, products, and suppliers.\n\nBusiness Issues -\n\nThe sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting Services\n\n(SSRS). The IT department takes too long to generate the reports and often misunderstands the report\n\nrequirements.\n\nExisting Environment. Data Sources\n\nNorthwind Traders uses the data sources shown in the following table.\n\nSource2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.\n\nExisting Environment. Customer Worksheet\n\nSource2 contains a single worksheet named Customer Details. The first 11 rows of the worksheet are shown in the\n\nfollowing table.\n\nAll the fields in Source2 are mandatory.\n\nThe Address column in Customer Details is the billing address, which can differ from the shipping address.\n\nExisting Environment. Azure SQL Database\n\nSource1 contains the following tables:\n\nOrders\n\nProducts\n\nSuppliers\n\nCategories\n\nOrder Details\n\nSales Employees\n\nThe Orders table contains the following columns.\n\nThe Order Details table contains the following columns.\n\nThe address in the Orders table is the shipping address, which can differ from the billing address.\n\nThe Products table contains the following columns.\n\nThe Categories table contains the following columns.\n\nThe Suppliers table contains the following columns.\n\nThe Sales Employees table contains the following columns.\n\nEach employee in the Sales Employees table is assigned to one sales region. Multiple employees can be assigned\n\nto each region.\n\nRequirements. Report Requirements\n\nNorthwind Traders requires the following reports:\n\nTop Products\n\nTop Customers\n\nOn-Time Shipping\n\nThe Top Customers report will show the top 20 customers based on the highest sales amounts in a selected order\n\nmonth or quarter, product category, and sales region.\n\nThe Top Products report will show the top 20 products based on the highest sales amounts sold in a selected order\n\nmonth or quarter, sales region, and product category. The report must also show which suppliers provide the top\n\nproducts.\n\nThe On-Time Shipping report will show the following metrics for a selected shipping month or quarter:\n\nThe percentage of orders that were shipped late by country and shipping region\n\nCustomers that had multiple late shipments during the last quarter\n\nNorthwind Traders defines late orders as those shipped after the required shipping date.\n\nThe warehouse shipping department must be notified if the percentage of late orders within the current month\n\nexceeds 5%.\n\nThe reports must show historical data for the current calendar year and the last three calendar years.\n\nRequirements. Technical Requirements\n\nNorthwind Traders identifies the following technical requirements:\n\nA single dataset must support all three reports.\n\nThe reports must be stored in a single Power BI workspace.\n\nReport data must be current as of 7 AM Pacific Time each day.\n\nThe reports must provide fast response times when users interact with a visualization.\n\nThe data model must minimize the size of the dataset as much as possible, while meeting the report requirements\n\nand the technical requirements.\n\nRequirements. Security Requirements\n\nAccess to the reports must be granted to Azure Active Directory (Azure AD) security groups only. An Azure AD\n\nsecurity group exists for each department.\n\nThe sales department must be able to perform the following tasks in Power BI:\n\nCreate, edit, and delete content in the reports.\n\nManage permissions for workspaces, datasets, and reports.\n\nPublish, unpublish, update, and change the permissions for an app.\n\nAssign Azure AD groups role-based access to the reports workspace.\n\nUsers in the sales department must be able to access only the data of the sales region to which they are assigned\n\nin the Sales Employees table.\n\nPower BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees table.\n\n[EmailAddress] = USERNAME()\n\nRLS will be applied only to the sales department users. Users in all other departments must be able to view all the\n\ndata. Question HOTSPOT -\n\nYou need to create a solution to meet the notification requirements of the warehouse shipping department.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: dashboard -\n\nThe warehouse shipping department must be notified if the percentage of late orders within the current\nmonth exceeds 5%.\n\nYou can set alerts to notify you when data in your dashboards changes beyond limits you set.\n\nBox 2: data alert -\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/service-set-data-alerts",
    "source": "Final",
    "sourceNumber": 344,
    "legacy": false,
    "image": "/dump-assets/f1-344-343-question.webp",
    "answerImage": "/dump-assets/f1-344-343-answer.webp"
  },
  {
    "id": "f1-345-344",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nOverview -\n\nContoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board\n\nmeetings for which financial analysts manually prepare\n\nMicrosoft Excel reports, including balance sheets and profit and loss statements for each of the company's four\n\nbusiness units.\n\nExisting Environment -\n\nData and Sources -\n\nData for the reports comes from the sources shown in the following table.\n\nThe balance sheet data is unrelated to the profit and loss results other than they both relate to dates.\n\nBalance Sheet Data -\n\nThe balance sheet data is imported and includes the final monthly balances of each account in the format shown in\n\nthe following table.\n\nThe balance sheet data always includes a row for each account for each month.\n\nProduct Catalog Data -\n\nThe product catalog shows how products roll up to product categories, which roll up to the business units. The\n\nproduct list is provided in the format shown in the following table.\n\nRevenue data is provided at the date and product level. Expense data is provided at the date and department level.\n\nBusiness Issues -\n\nHistorically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is\n\nusually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an\n\nExcel formula. On occasion, there are conflicting results in the reports because the products and departments that\n\nroll up to each business unit are not defined consistently.\n\nRequirements -\n\nPlanned Changes -\n\nContoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants\n\nto reduce how long it takes to populate the reports to less than two days. The company wants to create common\n\nlogic for the business units, products, and departments. The logic will be used across all reports, including but not\n\nlimited to the quarterly reporting for the board.\n\nTechnical Requirements -\n\nContoso wants the reports and datasets refreshed with minimum manual effort.\n\nThe company wants to provide the board with a single package of reports that will contain custom navigation and\n\nlinks to supplementary information.\n\nMaintenance, including manually updating data and access, must be minimized as much as possible.\n\nSecurity Requirements -\n\nThe reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group\n\nwill be used to share information with the board.\n\nContoso identifies the following security requirements for analyst access:\n\nAnalysts must be able to access all balance sheet and product catalog data.\n\nAnalysts must be able to access only the profit and loss data of their respective business unit.\n\nAnalysts must be able to create new reports from the dataset that contains the profit and loss data, but the\n\nreports built by the analysts must NOT be included in the quarterly reports for the board.\n\nAnalysts must NOT be able to share the quarterly reports with anyone.\n\nAnalysts must NOT be able to make new reports by using the balance sheet data.\n\nReport Requirements -\n\nYou plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the\n\nlast day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the\n\nending balances for the quarter, as well as for the previous quarter.\n\nThe date table will contain the columns shown in the following table.\n\nThe definitions and attributes for the products, departments, and business units must be consistent across all the\n\nreports.\n\nThe board must be able to get the following information from the quarterly reports:\n\nRevenue trends over time\n\nThe ending balances of each account\n\nChanges in long-term liabilities from the previous quarter\n\nThe percent of total revenue contributed by each product category\n\nA comparison of quarterly revenue versus the same quarter from the previous year\n\nThe reports must be updated with the latest data by 5 AM each day. Question You need to create the relationship\n\nbetween the product list and the revenue results. The solution must minimize the time it takes to render visuals.\n\nWhat should you set as the relationship cardinality?",
    "choices": [
      "One to one",
      "Many to many",
      "Many to one",
      "One to many"
    ],
    "correct": [
      3
    ],
    "explanation": "One product in the product list can occur many times in the revenue results.\nNote 1: One to many (1:*): In a one-to-many relationship, the column in one table has only one instance of a\nparticular value, and the other related table can have more than one instance of a value.\nNote 2:\nRevenue data is provided at the date and product level.\nThe board must be able to get the following information from the quarterly reports:\n\nRevenue trends over time -\nThe percent of total revenue contributed by each product category\nA comparison of quarterly revenue versus the same quarter from the previous year\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships",
    "source": "Final",
    "sourceNumber": 345,
    "legacy": false,
    "image": "/exhibit-assets/f1-345-344.webp"
  },
  {
    "id": "f1-346-345",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nOverview -\n\nContoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board\n\nmeetings for which financial analysts manually prepare\n\nMicrosoft Excel reports, including balance sheets and profit and loss statements for each of the company's four\n\nbusiness units.\n\nExisting Environment -\n\nData and Sources -\n\nData for the reports comes from the sources shown in the following table.\n\nThe balance sheet data is unrelated to the profit and loss results other than they both relate to dates.\n\nBalance Sheet Data -\n\nThe balance sheet data is imported and includes the final monthly balances of each account in the format shown in\n\nthe following table.\n\nThe balance sheet data always includes a row for each account for each month.\n\nProduct Catalog Data -\n\nThe product catalog shows how products roll up to product categories, which roll up to the business units. The\n\nproduct list is provided in the format shown in the following table.\n\nRevenue data is provided at the date and product level. Expense data is provided at the date and department level.\n\nBusiness Issues -\n\nHistorically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is\n\nusually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an\n\nExcel formula. On occasion, there are conflicting results in the reports because the products and departments that\n\nroll up to each business unit are not defined consistently.\n\nRequirements -\n\nPlanned Changes -\n\nContoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants\n\nto reduce how long it takes to populate the reports to less than two days. The company wants to create common\n\nlogic for the business units, products, and departments. The logic will be used across all reports, including but not\n\nlimited to the quarterly reporting for the board.\n\nTechnical Requirements -\n\nContoso wants the reports and datasets refreshed with minimum manual effort.\n\nThe company wants to provide the board with a single package of reports that will contain custom navigation and\n\nlinks to supplementary information.\n\nMaintenance, including manually updating data and access, must be minimized as much as possible.\n\nSecurity Requirements -\n\nThe reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group\n\nwill be used to share information with the board.\n\nContoso identifies the following security requirements for analyst access:\n\nAnalysts must be able to access all balance sheet and product catalog data.\n\nAnalysts must be able to access only the profit and loss data of their respective business unit.\n\nAnalysts must be able to create new reports from the dataset that contains the profit and loss data, but the\n\nreports built by the analysts must NOT be included in the quarterly reports for the board.\n\nAnalysts must NOT be able to share the quarterly reports with anyone.\n\nAnalysts must NOT be able to make new reports by using the balance sheet data.\n\nReport Requirements -\n\nYou plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the\n\nlast day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the\n\nending balances for the quarter, as well as for the previous quarter.\n\nThe date table will contain the columns shown in the following table.\n\nThe definitions and attributes for the products, departments, and business units must be consistent across all the\n\nreports.\n\nThe board must be able to get the following information from the quarterly reports:\n\nRevenue trends over time\n\nThe ending balances of each account\n\nChanges in long-term liabilities from the previous quarter\n\nThe percent of total revenue contributed by each product category\n\nA comparison of quarterly revenue versus the same quarter from the previous year\n\nThe reports must be updated with the latest data by 5 AM each day. Question HOTSPOT -\n\nYou need to create a measure that returns the percent of revenue by product category.\n\nHow should you complete the measure? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: CALCULATE -\n\nCALCULATE evaluates an expression in a modified filter context.\n\nSyntax: CALCULATE(<expression>[, <filter1> [, <filter2> [, �]]])\n\nBox 2: ALL-\n\nBox 3: DIVIDE -\n\nDIVIDE performs a division.\n\nExample: MEASURE FactInternetSales[%Sales] = DIVIDE([TotalSales],\nCALCULATE([TotalSales],REMOVEFILTERS()))\n\nNote: The RETURN keyword consumes variables defined in previous VAR statements.\n\nVAR AllCategoryRev =\n\nCALCULATE(SUM([Revenue]),\n\nALL(ProductList[ProductCategory]))\n\nRETURN\n\nDIVIDE(SUM([Revenue]), AllCategoryRev\n\nAnyone with experience in DAX would only need to read the question in these case study questions. The\nquestions seem to hint the answer already.. for this question for example anyone would know that the moment\nyou see a percentage of the total is required you would immediately go with the ALL function and the rest is\neasy.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/dax/calculate-function-dax\n\nhttps://docs.microsoft.com/en-us/dax/removefilters-function-dax https://dax.guide/st/return/",
    "source": "Final",
    "sourceNumber": 346,
    "legacy": false,
    "image": "/dump-assets/f1-346-345-question.webp",
    "answerImage": "/dump-assets/f1-346-345-answer.webp"
  },
  {
    "id": "f1-347-346",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nOverview -\n\nContoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board\n\nmeetings for which financial analysts manually prepare\n\nMicrosoft Excel reports, including balance sheets and profit and loss statements for each of the company's four\n\nbusiness units.\n\nExisting Environment -\n\nData and Sources -\n\nData for the reports comes from the sources shown in the following table.\n\nThe balance sheet data is unrelated to the profit and loss results other than they both relate to dates.\n\nBalance Sheet Data -\n\nThe balance sheet data is imported and includes the final monthly balances of each account in the format shown in\n\nthe following table.\n\nThe balance sheet data always includes a row for each account for each month.\n\nProduct Catalog Data -\n\nThe product catalog shows how products roll up to product categories, which roll up to the business units. The\n\nproduct list is provided in the format shown in the following table.\n\nRevenue data is provided at the date and product level. Expense data is provided at the date and department level.\n\nBusiness Issues -\n\nHistorically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is\n\nusually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an\n\nExcel formula. On occasion, there are conflicting results in the reports because the products and departments that\n\nroll up to each business unit are not defined consistently.\n\nRequirements -\n\nPlanned Changes -\n\nContoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants\n\nto reduce how long it takes to populate the reports to less than two days. The company wants to create common\n\nlogic for the business units, products, and departments. The logic will be used across all reports, including but not\n\nlimited to the quarterly reporting for the board.\n\nTechnical Requirements -\n\nContoso wants the reports and datasets refreshed with minimum manual effort.\n\nThe company wants to provide the board with a single package of reports that will contain custom navigation and\n\nlinks to supplementary information.\n\nMaintenance, including manually updating data and access, must be minimized as much as possible.\n\nSecurity Requirements -\n\nThe reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group\n\nwill be used to share information with the board.\n\nContoso identifies the following security requirements for analyst access:\n\nAnalysts must be able to access all balance sheet and product catalog data.\n\nAnalysts must be able to access only the profit and loss data of their respective business unit.\n\nAnalysts must be able to create new reports from the dataset that contains the profit and loss data, but the\n\nreports built by the analysts must NOT be included in the quarterly reports for the board.\n\nAnalysts must NOT be able to share the quarterly reports with anyone.\n\nAnalysts must NOT be able to make new reports by using the balance sheet data.\n\nReport Requirements -\n\nYou plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the\n\nlast day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the\n\nending balances for the quarter, as well as for the previous quarter.\n\nThe date table will contain the columns shown in the following table.\n\nThe definitions and attributes for the products, departments, and business units must be consistent across all the\n\nreports.\n\nThe board must be able to get the following information from the quarterly reports:\n\nRevenue trends over time\n\nThe ending balances of each account\n\nChanges in long-term liabilities from the previous quarter\n\nThe percent of total revenue contributed by each product category\n\nA comparison of quarterly revenue versus the same quarter from the previous year\n\nThe reports must be updated with the latest data by 5 AM each day. Question DRAG DROP -\n\nOnce the profit and loss dataset is created, which four actions should you perform in sequence to ensure that the\n\nbusiness unit analysts see the appropriate profit and loss data? To answer, move the appropriate actions from the\n\nlist of actions to the answer area and arrange them in the correct order.\n\nSelect and Place:",
    "choices": [],
    "correct": [],
    "explanation": "1) Create four roles\n\n2) add DAX filters\n\n3) publish\n\n4) add role members\n\nContributor role give analysts a possibility to save reports to a workspace, which is not permitted by\nrequirements\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/enterprise/service-admin-rls",
    "source": "Final",
    "sourceNumber": 347,
    "legacy": false,
    "image": "/dump-assets/f1-347-346-question.webp",
    "answerImage": "/dump-assets/f1-347-346-answer.webp"
  },
  {
    "id": "f1-348-347",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nOverview -\n\nContoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board\n\nmeetings for which financial analysts manually prepare\n\nMicrosoft Excel reports, including balance sheets and profit and loss statements for each of the company's four\n\nbusiness units.\n\nExisting Environment -\n\nData and Sources -\n\nData for the reports comes from the sources shown in the following table.\n\nThe balance sheet data is unrelated to the profit and loss results other than they both relate to dates.\n\nBalance Sheet Data -\n\nThe balance sheet data is imported and includes the final monthly balances of each account in the format shown in\n\nthe following table.\n\nThe balance sheet data always includes a row for each account for each month.\n\nProduct Catalog Data -\n\nThe product catalog shows how products roll up to product categories, which roll up to the business units. The\n\nproduct list is provided in the format shown in the following table.\n\nRevenue data is provided at the date and product level. Expense data is provided at the date and department level.\n\nBusiness Issues -\n\nHistorically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is\n\nusually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an\n\nExcel formula. On occasion, there are conflicting results in the reports because the products and departments that\n\nroll up to each business unit are not defined consistently.\n\nRequirements -\n\nPlanned Changes -\n\nContoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants\n\nto reduce how long it takes to populate the reports to less than two days. The company wants to create common\n\nlogic for the business units, products, and departments. The logic will be used across all reports, including but not\n\nlimited to the quarterly reporting for the board.\n\nTechnical Requirements -\n\nContoso wants the reports and datasets refreshed with minimum manual effort.\n\nThe company wants to provide the board with a single package of reports that will contain custom navigation and\n\nlinks to supplementary information.\n\nMaintenance, including manually updating data and access, must be minimized as much as possible.\n\nSecurity Requirements -\n\nThe reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group\n\nwill be used to share information with the board.\n\nContoso identifies the following security requirements for analyst access:\n\nAnalysts must be able to access all balance sheet and product catalog data.\n\nAnalysts must be able to access only the profit and loss data of their respective business unit.\n\nAnalysts must be able to create new reports from the dataset that contains the profit and loss data, but the\n\nreports built by the analysts must NOT be included in the quarterly reports for the board.\n\nAnalysts must NOT be able to share the quarterly reports with anyone.\n\nAnalysts must NOT be able to make new reports by using the balance sheet data.\n\nReport Requirements -\n\nYou plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the\n\nlast day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the\n\nending balances for the quarter, as well as for the previous quarter.\n\nThe date table will contain the columns shown in the following table.\n\nThe definitions and attributes for the products, departments, and business units must be consistent across all the\n\nreports.\n\nThe board must be able to get the following information from the quarterly reports:\n\nRevenue trends over time\n\nThe ending balances of each account\n\nChanges in long-term liabilities from the previous quarter\n\nThe percent of total revenue contributed by each product category\n\nA comparison of quarterly revenue versus the same quarter from the previous year\n\nThe reports must be updated with the latest data by 5 AM each day. Question Which DAX expression should you\n\nuse to get the ending balances in the balance sheet reports?",
    "choices": [
      "CALCULATE ( SUM( BalanceSheet[BalanceAmount] ), LASTDATE ( 'Date'[Date] ) )",
      "CALCULATE ( SUM( BalanceSheet[BalanceAmount] ), DATESQTD('Date'[Date]) )",
      "FIRSTNONBLANK ('Date'[Date] SUM( BalanceSheet[BalanceAmount] ) )",
      "CALCULATE ( MAX( BalanceSheet[BalanceAmount] ), LASTDATE ('Date'[Date] ))"
    ],
    "correct": [
      0
    ],
    "explanation": "A) - LASTDATE()\n\nas we do not sum the balances of last 3 months\n\nThe board meeting requires quarter balance. For example, Jan - Mar. So what we need is the balance as at 31\nMar, the LASTDATE is appropriate. The balance sheet already gives you the number directly. No need to\ncalculate up to 3 months.\n\nIn case of using DATESQTD, daily sale and expenses will be listed in a table rather than balance in balance\nsheet.",
    "source": "Final",
    "sourceNumber": 348,
    "legacy": false,
    "image": "/exhibit-assets/f1-348-347.webp"
  },
  {
    "id": "f1-349-348",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nOverview -\n\nLitware, Inc. is an online retailer that uses Power BI.\n\nLitware plans to leverage data from an Azure SQL database that stores data for the company's live e-commerce\n\nwebsite.\n\nLitware uses Azure Active Directory (Azure AD) to authenticate users.\n\nExisting Environment. Sales Data\n\nLitware has online sales data that has the SQL schema shown in the following table.\n\nIn the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.\n\nThe week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.\n\nIn the Sales table, the sales_id column represents a unique transaction.\n\nThe region id column can be managed by only one sales manager.\n\nExisting Environment. Data Concerns\n\nYou are concerned with the quality and completeness of the sales data. You must ensure that negative and missing\n\nsales_amount values do NOT contribute to the total sales amount calculation.\n\nExisting Environment. Reporting Requirements\n\nLitware identifies the following reporting requirements:\n\nExecutives require a visual that shows sales by region.\n\nExecutives require a visual that shows returns by region manager and the sales managers that report to them.\n\nThe sales managers must be able to see only the sales data of their respective region.\n\nThe sales managers require a visual to analyze sales performance versus sales targets.\n\nThe sales department requires reports that contain the number of sales transactions.\n\nUsers must be able to see the month in each report as shown in the following example: Feb 2020.\n\nThe customer service department requires a visual that can be filtered by both sales month and ship month\n\nindependently.\n\nThe maximum allowed latency to include transactions in reports is five minutes. Question You need to create\n\nrelationships to meet the reporting requirements of the customer service department.\n\nWhat should you create?",
    "choices": [
      "a one-to-many relationship from Date[date_id] to Sales[sales_date_id] and another one-to-many relationship from Date[date_id] to Weekly_Returns[week_id]",
      "a one-to-many relationship from Sales[sales_date_id] to Date[date_id] and a one-to-many relationship from Sales[sales_ship_date_id] to Date[date_id]",
      "an additional date table named ShipDate, a many-to-many relationship from Sales[sales_date_id] to Date[date_id], and a many-to-many relationship from Sales[sales_ship_date_id] to ShipDate[date_id]",
      "an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_skip_date_id]"
    ],
    "correct": [
      3
    ],
    "explanation": "Two date dims, two 1:* relationships\n\nThe customer service department requires a visual that can be filtered by both sales month and ship month\nindependently.\n\nNeed two date tables. Add a one-to-many relationship from both the Date tables to Sales table.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive",
    "source": "Final",
    "sourceNumber": 349,
    "legacy": false,
    "image": "/exhibit-assets/f1-349-348.webp"
  },
  {
    "id": "f1-350-349",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "You need to provide a solution to provide the sales managers with the required access.\n\nWhat should you include in the solution?",
    "choices": [
      "Create a security role that has a table filter on the Sales Manager table where username = UserName().",
      "Create a security role that has a table filter on the Sales Manager table where username = sales_manager_id.",
      "Create a security role that has a table filter on the Region Manager table where sales_manager_id = UserPrincipalName().",
      "Create a security role that has a table filter on the Sales_Manager table where name = UserName()."
    ],
    "correct": [
      0
    ],
    "explanation": "The sales managers must be able to see only the sales data of their respective region.\n\nUse the username field of the Sales_manager table.\n\nAlso use the Username() DAX function to validate the username.\n\nReference:\n\nhttps://powerbi.microsoft.com/en-my/blog/using-username-in-dax-with-row-level-security/\n\n______________________________________________________________________________\nCase Study Description\n\nLitware, Inc. Case Study\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like\nto complete each case. However, there may be additional case studies and sections on this exam. You must\nmanage your time to ensure that you are able to complete all questions included on this exam in the time\nprovided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information about\nthe scenario that is described in the case study. Each question is independent of the other questions in this\ncase study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and\nto make changes before you move to the next section of the exam. After you begin a new section, you cannot\nreturn to this section.\n\nTo start the case study\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment and problem statements. If the case study\nhas an All Information tab, note that the information displayed is identical to the information displayed on the\nsubsequent tabs. When you are ready to answer a question, click the Question button to return to the\nquestion.\n\nOverview\n\nLitware, Inc. is an online retailer that uses Microsoft Power Bl dashboards and reports.\n\nThe company plans to leverage data from Microsoft SQL Server databases, Microsoft Excel files, text files,\nand several other data sources.\n\nLitware uses Azure Active Directory (Azure AD) to authenticate users.\n\nExisting Environment\n\nSales Data\n\nLitware has online sales data that has the SQL schema shown in the following table.\n\nIn the Date table, the dateid column has a format of yyyymmdd and the month column has a format of\nyyyymm.\n\nThe week column in the Date table and the weekid column in the Weekly_Returns table have a format of\nyyyyww.\n\nThe regionid column can be managed by only one sales manager.\n\nData Concerns\n\nYou are concerned with the quality and completeness of the sales data. You plan to verify the sales data for\nnegative sales amounts.\n\nReporting Requirements\n\nLitware identifies the following technical requirements:\n\n• Executives require a visual that shows sales by region.\n\n• Regional managers require a visual to analyze weekly sales and returns.\n\n• Sales managers must be able to see the sales data of their respective region only.\n\n• The sales managers require a visual to analyze sales performance versus sales targets.\n\n• The sale department requires reports that contain the number of sales transactions.\n\n• Users must be able to see the month in reports as shown in the following example: Feb 2020.\n\n• The customer service department requires a visual that can be filtered by both sales month and ship month\nindependently.\n\n• The maximum allowed latency to include transactions in reports is five minutes.",
    "source": "Final",
    "sourceNumber": 350,
    "legacy": false
  },
  {
    "id": "f1-351-350",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You merge data from Sales_Region, Region_Manager, Sales_Manager, and Manager into a single table named\n\nRegion.\n\nWhat should you do next to meet the reporting requirements of the executives?",
    "choices": [
      "Create a DAX calculated column that retrieves the region manager from the Weekly_Returns table based on the sales_region_id column.",
      "Apply row-level security (RLS) to the Region table based on the sales manager username.",
      "Configure a bi-directional relationship between Region and Sales_Region.",
      "In the Region table, create a hierarchy that has the manager name, and then the sales manager name."
    ],
    "correct": [
      3
    ],
    "explanation": "D seems to be correct because the Executives will only be able to see Region managers and Sales managers\nthat report to them in a hierarchy, besides there is nothing to measure there so A is actually wrong\n\nExecutives require a visual that shows returns by region manager and the sales managers that report to them.\n\nA hierarchy is a set of fields categorized in a hierarchical way that one level is the parent of another level.\nValues of the parent level can be drilled down to the lower level.\n\nReference:\n\nhttps://radacad.com/what-a-power-bi-hierarchy-is-and-how-to-use-it\n\n______________________________________________________________________________\nCase Study Description\n\nLitware, Inc. Case Study\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like\nto complete each case. However, there may be additional case studies and sections on this exam. You must\nmanage your time to ensure that you are able to complete all questions included on this exam in the time\nprovided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information about\nthe scenario that is described in the case study. Each question is independent of the other questions in this\ncase study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and\nto make changes before you move to the next section of the exam. After you begin a new section, you cannot\n\nreturn to this section.\n\nTo start the case study\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment and problem statements. If the case study\nhas an All Information tab, note that the information displayed is identical to the information displayed on the\nsubsequent tabs. When you are ready to answer a question, click the Question button to return to the\nquestion.\n\nOverview\n\nLitware, Inc. is an online retailer that uses Microsoft Power Bl dashboards and reports.\n\nThe company plans to leverage data from Microsoft SQL Server databases, Microsoft Excel files, text files,\nand several other data sources.\n\nLitware uses Azure Active Directory (Azure AD) to authenticate users.\n\nExisting Environment\n\nSales Data\n\nLitware has online sales data that has the SQL schema shown in the following table.\n\nIn the Date table, the dateid column has a format of yyyymmdd and the month column has a format of\nyyyymm.\n\nThe week column in the Date table and the weekid column in the Weekly_Returns table have a format of\nyyyyww.\n\nThe regionid column can be managed by only one sales manager.\n\nData Concerns\n\nYou are concerned with the quality and completeness of the sales data. You plan to verify the sales data for\nnegative sales amounts.\n\nReporting Requirements\n\nLitware identifies the following technical requirements:\n\n• Executives require a visual that shows sales by region.\n\n• Regional managers require a visual to analyze weekly sales and returns.\n\n• Sales managers must be able to see the sales data of their respective region only.\n\n• The sales managers require a visual to analyze sales performance versus sales targets.\n\n• The sale department requires reports that contain the number of sales transactions.\n\n• Users must be able to see the month in reports as shown in the following example: Feb 2020.\n\n• The customer service department requires a visual that can be filtered by both sales month and ship month\nindependently.\n\n• The maximum allowed latency to include transactions in reports is five minutes.",
    "source": "Final",
    "sourceNumber": 351,
    "legacy": false
  },
  {
    "id": "f1-352-351",
    "domain": "Model the data",
    "type": "single",
    "prompt": "What should you create to meet the reporting requirements of the sales department?",
    "choices": [
      "a measure that uses a formula of COUNTROWS(Sales)",
      "a calculated column that use a formula of COUNTA(Sales[sales_id])",
      "a calculated column that uses a formula of SUM(Sales[sales_id])",
      "a measure that uses a formula of SUM(Sales[sales_id])"
    ],
    "correct": [
      0
    ],
    "explanation": "The sales department requires reports that contain the number of sales transactions.\n\nThe COUNTROWS function counts the number of rows in the specified table, or in a table defined by an\nexpression.\n\nIncorrect:\n\nThe COUNTA function counts the number of cells in a column that are not empty.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/dax/countrows-function-dax\n\n______________________________________________________________________________\nCase Study Description\n\nLitware, Inc. Case Study\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like\nto complete each case. However, there may be additional case studies and sections on this exam. You must\nmanage your time to ensure that you are able to complete all questions included on this exam in the time\nprovided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information about\nthe scenario that is described in the case study. Each question is independent of the other questions in this\ncase study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and\nto make changes before you move to the next section of the exam. After you begin a new section, you cannot\nreturn to this section.\n\nTo start the case study\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment and problem statements. If the case study\nhas an All Information tab, note that the information displayed is identical to the information displayed on the\nsubsequent tabs. When you are ready to answer a question, click the Question button to return to the\nquestion.\n\nOverview\n\nLitware, Inc. is an online retailer that uses Microsoft Power Bl dashboards and reports.\n\nThe company plans to leverage data from Microsoft SQL Server databases, Microsoft Excel files, text files,\nand several other data sources.\n\nLitware uses Azure Active Directory (Azure AD) to authenticate users.\n\nExisting Environment\n\nSales Data\n\nLitware has online sales data that has the SQL schema shown in the following table.\n\nIn the Date table, the dateid column has a format of yyyymmdd and the month column has a format of\nyyyymm.\n\nThe week column in the Date table and the weekid column in the Weekly_Returns table have a format of\nyyyyww.\n\nThe regionid column can be managed by only one sales manager.\n\nData Concerns\n\nYou are concerned with the quality and completeness of the sales data. You plan to verify the sales data for\nnegative sales amounts.\n\nReporting Requirements\n\nLitware identifies the following technical requirements:\n\n• Executives require a visual that shows sales by region.\n\n• Regional managers require a visual to analyze weekly sales and returns.\n\n• Sales managers must be able to see the sales data of their respective region only.\n\n• The sales managers require a visual to analyze sales performance versus sales targets.\n\n• The sale department requires reports that contain the number of sales transactions.\n\n• Users must be able to see the month in reports as shown in the following example: Feb 2020.\n\n• The customer service department requires a visual that can be filtered by both sales month and ship month\nindependently.\n\n• The maximum allowed latency to include transactions in reports is five minutes.",
    "source": "Final",
    "sourceNumber": 352,
    "legacy": false
  },
  {
    "id": "f1-353-352",
    "domain": "Model the data",
    "type": "single",
    "prompt": "What should you do to address the existing environment data concerns?",
    "choices": [
      "a calculated column that uses the following formula: ABS(Sales[sales_amount])",
      "a measure that uses the following formula: SUMX(FILTER('Sales', 'Sales'[sales_amount] > 0)),[sales_amount])",
      "a measure that uses the following formula: SUM(Sales[sales_amount])",
      "a calculated column that uses the following formula: IF(ISBLANK(Sales[sales_amount]),0, (Sales[sales_amount]))"
    ],
    "correct": [
      1
    ],
    "explanation": "You are concerned with the quality and completeness of the sales data. You must ensure that negative and\nmissing sales_amount values do NOT contribute to the total sales amount calculation.\n\n___________________________________________________________________________\nCase Study Description\n\nNorthwind Traders\n\nCase study\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would\nlike to complete each case. However, there may be additional case studies and sections on this exam. You\nmust manage your time to ensure that you are able to complete all question included on this exam in the\ntime provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information\nabout the scenario that is described in the case study. Each question is independent of the other question\non this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers\nand to make changes before you move to the next section of the exam. After you begin a new section, you\ncannot return to this section.\n\nTo start the case study\n\nTo display the first question on this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment, and problem statements. If the case\nstudy has an All Information tab, note that the information displayed is identical to the information\n\ndisplayed on the subsequent tabs. When you are ready to answer a question, click the Question button to\nreturn to the question.\n\nOverview.\n\nGeneral Overview\n\nNorthwind Traders is a specialty food import company.\n\nThe company recently implemented Power BI to better understand its top customers, products, and suppliers.\n\nOverview. Business Issues\n\nThe sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting\nServices (SSRS). The IT department takes too long to generate the reports and often misunderstands the\nreport requirements.\n\nExisting Environment. Data Sources\n\nNorthwind Traders uses the data sources shown in the following table.\n\nSource2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.\n\nExisting Environment. Customer Worksheet\n\nSource2 contains a single worksheet named Customer Details.\n\nThe first 11 rows of the worksheet are shown in the following table.\n\nAll the fields in Source2 are mandatory.\n\nThe Address column in Customer Details is the billing address, which can differ from the shipping address.\n\nExisting Environment. Azure SQL Database\n\nSource1 contains the following table:\n\n- Orders\n\n- Products\n\n- Suppliers\n\n- Categories\n\n- Order Details\n\n- Sales Employees\n\nThe Orders table contains the following columns.\n\nThe Order Details table contains the following columns.\n\nThe address in the Orders table is the shipping address, which can differ from the billing address.\n\nThe Products table contains the following columns.\n\nThe Categories table contains the following columns.\n\nThe Suppliers table contains the following columns.\n\nThe Sales Employees table contains the following columns.\n\nEach employee in the Sales Employees table is assigned to one sales region. Multiple employees can be\nassigned to each region.\n\nRequirements.\n\nReport Requirements\n\nNorthwind Traders requires the following reports:\n\n- Top Products\n\n- Top Customers\n\n- On-Time Shipping\n\nThe Top Customers report will show the top 20 customers based on the highest sales amounts in a selected\norder month or quarter, product category, and sales region.\n\nThe Top Products report will show the top 20 products based on the highest sales amounts sold in a selected\norder month or quarter, sales region, and product category. The report must also show which suppliers\nprovide the top products.\n\nThe On-Time Shipping report will show the following metrics for a selected shipping month or quarter:\n\n- The percentage of orders that were shipped late by country and shipping region\n\n- Customers that had multiple late shipments during the last quarter\n\nNorthwind Traders defines late orders as those shipped after the required shipping date.\n\nThe warehouse shipping department must be notified if the percentage of late orders within the current\nmonth exceeds 5%.\n\nThe reports must show historical data for the current calendar year and the last three calendar years.\n\nRequirements. Technical Requirements\n\nNorthwind Traders identifies the following technical requirements:\n\n- A single dataset must support all three reports.\n\n- The reports must be stored in a single Power BI workspace.\n\n- Report data must be current as of 7 AM Pacific Time each day.\n\n- The reports must provide fast response times when users interact with a visualization.\n\n- The data model must minimize the size of the dataset as much as possible, while meeting the report\nrequirements and the technical requirements.\n\nRequirements.\n\nSecurity Requirements\n\nAccess to the reports must be granted to Azure Active Directory (Azure AD) security groups only.\n\nAn Azure AD security group exists for each department.\n\nThe sales department must be able to perform the following tasks in Power BI:\n\n- Create, edit, and delete content in the reports.\n\n- Manage permissions for workspaces, datasets, and report.\n\n- Publish, unpublish, update, and change the permissions for an app.\n\n- Assign Azure AD groups role-based access to the reports workspace.\n\nUsers in the sales department must be able to access only the data of the sales region to which they are\nassigned in the Sales Employees table.\n\nPower BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees\ntable.\n\n[EmailAddress] = USERNAME()\n\nRLS will be applied only to the sales department users. Users in all other departments must be able to view all\nthe data.",
    "source": "Final",
    "sourceNumber": 353,
    "legacy": false
  },
  {
    "id": "f1-354-353",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You need to create a calculated column to display the month based on the reporting requirements.\n\nWhich DAX expression should you use?",
    "choices": [
      "FORMAT('Date'[date],MMM YYYY)",
      "FORMAT('Date'[date_id],MMM) & & FORMAT('Date'[year], #)",
      "FORMAT('Date'[date_id],MMM YYYY)",
      "FORMAT('Date'[date],M YY)"
    ],
    "correct": [
      0
    ],
    "explanation": "Users must be able to see the month in each report as shown in the following example: Feb 2020.\n\nCustom date/time formats -\n\nThe following format characters can be specified in the format_string to create custom date/time formats:\n\n* mmm\n\nDisplay the month as an abbreviation (Jan-Dec). Localized.\n\n* yyyy\n\nDisplay the year as a 4-digit number (100-9999).\n\n* Etc.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/dax/format-function-dax#predefined-datetime-formats\n\n______________________________________________________________________________\nCase Study Description\n\nLitware, Inc. Case Study\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like\nto complete each case. However, there may be additional case studies and sections on this exam. You must\nmanage your time to ensure that you are able to complete all questions included on this exam in the time\nprovided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information about\nthe scenario that is described in the case study. Each question is independent of the other questions in this\ncase study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and\nto make changes before you move to the next section of the exam. After you begin a new section, you cannot\nreturn to this section.\n\nTo start the case study\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment and problem statements. If the case study\nhas an All Information tab, note that the information displayed is identical to the information displayed on the\nsubsequent tabs. When you are ready to answer a question, click the Question button to return to the\nquestion.\n\nOverview\n\nLitware, Inc. is an online retailer that uses Microsoft Power Bl dashboards and reports.\n\nThe company plans to leverage data from Microsoft SQL Server databases, Microsoft Excel files, text files,\nand several other data sources.\n\nLitware uses Azure Active Directory (Azure AD) to authenticate users.\n\nExisting Environment\n\nSales Data\n\nLitware has online sales data that has the SQL schema shown in the following table.\n\nIn the Date table, the dateid column has a format of yyyymmdd and the month column has a format of\nyyyymm.\n\nThe week column in the Date table and the weekid column in the Weekly_Returns table have a format of\nyyyyww.\n\nThe regionid column can be managed by only one sales manager.\n\nData Concerns\n\nYou are concerned with the quality and completeness of the sales data. You plan to verify the sales data for\nnegative sales amounts.\n\nReporting Requirements\n\nLitware identifies the following technical requirements:\n\n• Executives require a visual that shows sales by region.\n\n• Regional managers require a visual to analyze weekly sales and returns.\n\n• Sales managers must be able to see the sales data of their respective region only.\n\n• The sales managers require a visual to analyze sales performance versus sales targets.\n\n• The sale department requires reports that contain the number of sales transactions.\n\n• Users must be able to see the month in reports as shown in the following example: Feb 2020.\n\n• The customer service department requires a visual that can be filtered by both sales month and ship month\nindependently.\n\n• The maximum allowed latency to include transactions in reports is five minutes.",
    "source": "Final",
    "sourceNumber": 354,
    "legacy": false
  },
  {
    "id": "f1-355-354",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou need to design the data model and the relationships for the Customer Details worksheet and the Orders table\n\nby using Power BI. The solution must meet the report requirements.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: No-\n\nCustomer ID in Orders is text (\"VINET\") while Customer ID in Customer Details is number (\"1\").\n\nBox 2: Yes-\n\nRelationship between Orders and Customer Details will be via column Customer CRMID in Customer Details\nand Customer ID in Orders, which are both text.\n\nBox 3: No -\n\nthe Orders table only contains shipping address, which is different from the billing address which should be\nused for sales region. Thus, it should come from Customer Details table.\n\nNo - Yes - No. According to the sample data the Customer ID in Customer Details is a number (1 through 10 is\nshown in the example data) and the Customer ID in the Orders table has an example value of VINET, which\nlooks like it corresponds to the value of Customer CRMID instead of Customer ID from the Customer Details\nworksheet so the first answer should be No. The second answer should be Yes, the Customer ID from Orders\nhas example value VINET, which is text.\n\n___________________________________________________________________________\nCase Study Description\n\nNorthwind Traders\n\nCase study\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would\nlike to complete each case. However, there may be additional case studies and sections on this exam. You\nmust manage your time to ensure that you are able to complete all question included on this exam in the\ntime provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information\nabout the scenario that is described in the case study. Each question is independent of the other question\non this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers\nand to make changes before you move to the next section of the exam. After you begin a new section, you\ncannot return to this section.\n\nTo start the case study\n\nTo display the first question on this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment, and problem statements. If the case\nstudy has an All Information tab, note that the information displayed is identical to the information\ndisplayed on the subsequent tabs. When you are ready to answer a question, click the Question button to\nreturn to the question.\n\nOverview.\n\nGeneral Overview\n\nNorthwind Traders is a specialty food import company.\n\nThe company recently implemented Power BI to better understand its top customers, products, and suppliers.\n\nOverview. Business Issues\n\nThe sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting\nServices (SSRS). The IT department takes too long to generate the reports and often misunderstands the\nreport requirements.\n\nExisting Environment. Data Sources\n\nNorthwind Traders uses the data sources shown in the following table.\n\nSource2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.\n\nExisting Environment. Customer Worksheet\n\nSource2 contains a single worksheet named Customer Details.\n\nThe first 11 rows of the worksheet are shown in the following table.\n\nAll the fields in Source2 are mandatory.\n\nThe Address column in Customer Details is the billing address, which can differ from the shipping address.\n\nExisting Environment. Azure SQL Database\n\nSource1 contains the following table:\n\n- Orders\n\n- Products\n\n- Suppliers\n\n- Categories\n\n- Order Details\n\n- Sales Employees\n\nThe Orders table contains the following columns.\n\nThe Order Details table contains the following columns.\n\nThe address in the Orders table is the shipping address, which can differ from the billing address.\n\nThe Products table contains the following columns.\n\nThe Categories table contains the following columns.\n\nThe Suppliers table contains the following columns.\n\nThe Sales Employees table contains the following columns.\n\nEach employee in the Sales Employees table is assigned to one sales region. Multiple employees can be\nassigned to each region.\n\nRequirements.\n\nReport Requirements\n\nNorthwind Traders requires the following reports:\n\n- Top Products\n\n- Top Customers\n\n- On-Time Shipping\n\nThe Top Customers report will show the top 20 customers based on the highest sales amounts in a selected\norder month or quarter, product category, and sales region.\n\nThe Top Products report will show the top 20 products based on the highest sales amounts sold in a selected\norder month or quarter, sales region, and product category. The report must also show which suppliers\nprovide the top products.\n\nThe On-Time Shipping report will show the following metrics for a selected shipping month or quarter:\n\n- The percentage of orders that were shipped late by country and shipping region\n\n- Customers that had multiple late shipments during the last quarter\n\nNorthwind Traders defines late orders as those shipped after the required shipping date.\n\nThe warehouse shipping department must be notified if the percentage of late orders within the current\nmonth exceeds 5%.\n\nThe reports must show historical data for the current calendar year and the last three calendar years.\n\nRequirements. Technical Requirements\n\nNorthwind Traders identifies the following technical requirements:\n\n- A single dataset must support all three reports.\n\n- The reports must be stored in a single Power BI workspace.\n\n- Report data must be current as of 7 AM Pacific Time each day.\n\n- The reports must provide fast response times when users interact with a visualization.\n\n- The data model must minimize the size of the dataset as much as possible, while meeting the report\nrequirements and the technical requirements.\n\nRequirements.\n\nSecurity Requirements\n\nAccess to the reports must be granted to Azure Active Directory (Azure AD) security groups only.\n\nAn Azure AD security group exists for each department.\n\nThe sales department must be able to perform the following tasks in Power BI:\n\n- Create, edit, and delete content in the reports.\n\n- Manage permissions for workspaces, datasets, and report.\n\n- Publish, unpublish, update, and change the permissions for an app.\n\n- Assign Azure AD groups role-based access to the reports workspace.\n\nUsers in the sales department must be able to access only the data of the sales region to which they are\nassigned in the Sales Employees table.\n\nPower BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees\ntable.\n\n[EmailAddress] = USERNAME()\n\nRLS will be applied only to the sales department users. Users in all other departments must be able to view all\nthe data.",
    "source": "Final",
    "sourceNumber": 355,
    "legacy": false,
    "image": "/dump-assets/f1-355-354-question.webp",
    "answerImage": "/dump-assets/f1-355-354-answer.webp"
  },
  {
    "id": "f1-356-355",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou need to create a measure that will return the percentage of late orders.\n\nHow should you complete the DAX expression? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: CALCULATE -\n\nCALCULATE evaluates an expression in a modified filter context.\n\nSyntax: CALCULATE(<expression>[, <filter1> [, <filter2> [, ¦]]]) expression - The expression to be evaluated.\nfilter1, filter2,.. - (Optional) Boolean expressions or table expressions that defines filters, or filter modifier\n\nfunctions.\n\nIncorrect:\n\n* COUNTX - Counts the number of rows that contain a non-blank value or an expression that evaluates to a\nnon-blank value, when evaluating an expression over a table.\n\n* CALCULATETABLE evaluates a table expression in a modified filter context.\n\nSyntax: CALCULATETABLE(<expression>[, <filter1> [, <filter2> [, ¦]]])\n\nExpression - The table expression to be evaluated.\n\nBox 2: FILTER -\n\nFILTER returns a table that represents a subset of another table or expression.\n\nSyntax: FILTER(<table>,<filter>)\n\nBox 3: Orders[Shipped Date] > Orders[Required Date]\n\nNorthwind Traders defines late orders as those shipped after the required shipping date.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/dax/calculate-function-dax\n\nhttps://docs.microsoft.com/en-us/dax/filter-function-dax\n\n___________________________________________________________________________\nCase Study Description\n\nNorthwind Traders\n\nCase study\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would\nlike to complete each case. However, there may be additional case studies and sections on this exam. You\nmust manage your time to ensure that you are able to complete all question included on this exam in the\ntime provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information\nabout the scenario that is described in the case study. Each question is independent of the other question\non this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers\nand to make changes before you move to the next section of the exam. After you begin a new section, you\ncannot return to this section.\n\nTo start the case study\n\nTo display the first question on this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment, and problem statements. If the case\nstudy has an All Information tab, note that the information displayed is identical to the information\n\ndisplayed on the subsequent tabs. When you are ready to answer a question, click the Question button to\nreturn to the question.\n\nOverview.\n\nGeneral Overview\n\nNorthwind Traders is a specialty food import company.\n\nThe company recently implemented Power BI to better understand its top customers, products, and suppliers.\n\nOverview. Business Issues\n\nThe sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting\nServices (SSRS). The IT department takes too long to generate the reports and often misunderstands the\nreport requirements.\n\nExisting Environment. Data Sources\n\nNorthwind Traders uses the data sources shown in the following table.\n\nSource2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.\n\nExisting Environment. Customer Worksheet\n\nSource2 contains a single worksheet named Customer Details.\n\nThe first 11 rows of the worksheet are shown in the following table.\n\nAll the fields in Source2 are mandatory.\n\nThe Address column in Customer Details is the billing address, which can differ from the shipping address.\n\nExisting Environment. Azure SQL Database\n\nSource1 contains the following table:\n\n- Orders\n\n- Products\n\n- Suppliers\n\n- Categories\n\n- Order Details\n\n- Sales Employees\n\nThe Orders table contains the following columns.\n\nThe Order Details table contains the following columns.\n\nThe address in the Orders table is the shipping address, which can differ from the billing address.\n\nThe Products table contains the following columns.\n\nThe Categories table contains the following columns.\n\nThe Suppliers table contains the following columns.\n\nThe Sales Employees table contains the following columns.\n\nEach employee in the Sales Employees table is assigned to one sales region. Multiple employees can be\nassigned to each region.\n\nRequirements.\n\nReport Requirements\n\nNorthwind Traders requires the following reports:\n\n- Top Products\n\n- Top Customers\n\n- On-Time Shipping\n\nThe Top Customers report will show the top 20 customers based on the highest sales amounts in a selected\norder month or quarter, product category, and sales region.\n\nThe Top Products report will show the top 20 products based on the highest sales amounts sold in a selected\norder month or quarter, sales region, and product category. The report must also show which suppliers\nprovide the top products.\n\nThe On-Time Shipping report will show the following metrics for a selected shipping month or quarter:\n\n- The percentage of orders that were shipped late by country and shipping region\n\n- Customers that had multiple late shipments during the last quarter\n\nNorthwind Traders defines late orders as those shipped after the required shipping date.\n\nThe warehouse shipping department must be notified if the percentage of late orders within the current\nmonth exceeds 5%.\n\nThe reports must show historical data for the current calendar year and the last three calendar years.\n\nRequirements. Technical Requirements\n\nNorthwind Traders identifies the following technical requirements:\n\n- A single dataset must support all three reports.\n\n- The reports must be stored in a single Power BI workspace.\n\n- Report data must be current as of 7 AM Pacific Time each day.\n\n- The reports must provide fast response times when users interact with a visualization.\n\n- The data model must minimize the size of the dataset as much as possible, while meeting the report\nrequirements and the technical requirements.\n\nRequirements.\n\nSecurity Requirements\n\nAccess to the reports must be granted to Azure Active Directory (Azure AD) security groups only.\n\nAn Azure AD security group exists for each department.\n\nThe sales department must be able to perform the following tasks in Power BI:\n\n- Create, edit, and delete content in the reports.\n\n- Manage permissions for workspaces, datasets, and report.\n\n- Publish, unpublish, update, and change the permissions for an app.\n\n- Assign Azure AD groups role-based access to the reports workspace.\n\nUsers in the sales department must be able to access only the data of the sales region to which they are\nassigned in the Sales Employees table.\n\nPower BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees\ntable.\n\n[EmailAddress] = USERNAME()\n\nRLS will be applied only to the sales department users. Users in all other departments must be able to view all\nthe data.",
    "source": "Final",
    "sourceNumber": 356,
    "legacy": false,
    "image": "/dump-assets/f1-356-355-question.webp",
    "answerImage": "/dump-assets/f1-356-355-answer.webp"
  },
  {
    "id": "f1-357-356",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "You need to minimize the size of the dataset. The solution must meet the report requirements.\n\nWhat should you do?",
    "choices": [
      "Group the Categories table by the CategoryID column.",
      "Remove the QuantityPerUnit column from the Products table.",
      "Filter out discontinued products while importing the Products table.",
      "Change the OrderID column in the Orders table to the Text data type."
    ],
    "correct": [
      1
    ],
    "explanation": "Removing a column which isn't used in the reports reduces the dataset size.\n\nIncorrect:\n\nNot A: Grouping does not affect size.\n\nNot C: Cannot filter out discontinued products as: The reports must show historical data for the current\ncalendar year and the last three calendar years.\n\nNot D: OrderID must be Integer.\n\n___________________________________________________________________________\nCase Study Description\n\nNorthwind Traders\n\nCase study\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would\nlike to complete each case. However, there may be additional case studies and sections on this exam. You\nmust manage your time to ensure that you are able to complete all question included on this exam in the\ntime provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information\nabout the scenario that is described in the case study. Each question is independent of the other question\non this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers\nand to make changes before you move to the next section of the exam. After you begin a new section, you\ncannot return to this section.\n\nTo start the case study\n\nTo display the first question on this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment, and problem statements. If the case\nstudy has an All Information tab, note that the information displayed is identical to the information\ndisplayed on the subsequent tabs. When you are ready to answer a question, click the Question button to\nreturn to the question.\n\nOverview.\n\nGeneral Overview\n\nNorthwind Traders is a specialty food import company.\n\nThe company recently implemented Power BI to better understand its top customers, products, and suppliers.\n\nOverview. Business Issues\n\nThe sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting\nServices (SSRS). The IT department takes too long to generate the reports and often misunderstands the\nreport requirements.\n\nExisting Environment. Data Sources\n\nNorthwind Traders uses the data sources shown in the following table.\n\nSource2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.\n\nExisting Environment. Customer Worksheet\n\nSource2 contains a single worksheet named Customer Details.\n\nThe first 11 rows of the worksheet are shown in the following table.\n\nAll the fields in Source2 are mandatory.\n\nThe Address column in Customer Details is the billing address, which can differ from the shipping address.\n\nExisting Environment. Azure SQL Database\n\nSource1 contains the following table:\n\n- Orders\n\n- Products\n\n- Suppliers\n\n- Categories\n\n- Order Details\n\n- Sales Employees\n\nThe Orders table contains the following columns.\n\nThe Order Details table contains the following columns.\n\nThe address in the Orders table is the shipping address, which can differ from the billing address.\n\nThe Products table contains the following columns.\n\nThe Categories table contains the following columns.\n\nThe Suppliers table contains the following columns.\n\nThe Sales Employees table contains the following columns.\n\nEach employee in the Sales Employees table is assigned to one sales region. Multiple employees can be\nassigned to each region.\n\nRequirements.\n\nReport Requirements\n\nNorthwind Traders requires the following reports:\n\n- Top Products\n\n- Top Customers\n\n- On-Time Shipping\n\nThe Top Customers report will show the top 20 customers based on the highest sales amounts in a selected\norder month or quarter, product category, and sales region.\n\nThe Top Products report will show the top 20 products based on the highest sales amounts sold in a selected\norder month or quarter, sales region, and product category. The report must also show which suppliers\nprovide the top products.\n\nThe On-Time Shipping report will show the following metrics for a selected shipping month or quarter:\n\n- The percentage of orders that were shipped late by country and shipping region\n\n- Customers that had multiple late shipments during the last quarter\n\nNorthwind Traders defines late orders as those shipped after the required shipping date.\n\nThe warehouse shipping department must be notified if the percentage of late orders within the current\nmonth exceeds 5%.\n\nThe reports must show historical data for the current calendar year and the last three calendar years.\n\nRequirements. Technical Requirements\n\nNorthwind Traders identifies the following technical requirements:\n\n- A single dataset must support all three reports.\n\n- The reports must be stored in a single Power BI workspace.\n\n- Report data must be current as of 7 AM Pacific Time each day.\n\n- The reports must provide fast response times when users interact with a visualization.\n\n- The data model must minimize the size of the dataset as much as possible, while meeting the report\nrequirements and the technical requirements.\n\nRequirements.\n\nSecurity Requirements\n\nAccess to the reports must be granted to Azure Active Directory (Azure AD) security groups only.\n\nAn Azure AD security group exists for each department.\n\nThe sales department must be able to perform the following tasks in Power BI:\n\n- Create, edit, and delete content in the reports.\n\n- Manage permissions for workspaces, datasets, and report.\n\n- Publish, unpublish, update, and change the permissions for an app.\n\n- Assign Azure AD groups role-based access to the reports workspace.\n\nUsers in the sales department must be able to access only the data of the sales region to which they are\nassigned in the Sales Employees table.\n\nPower BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees\ntable.\n\n[EmailAddress] = USERNAME()\n\nRLS will be applied only to the sales department users. Users in all other departments must be able to view all\nthe data.",
    "source": "Final",
    "sourceNumber": 357,
    "legacy": false
  },
  {
    "id": "f1-358-357",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You need to design the data model to meet the report requirements.\n\nWhat should you do in Power BI Desktop?",
    "choices": [
      "From Power Query, add a date table. Create an active relationship to the OrderDate column in the Orders table and an inactive relationship to the ShippedDate column in the Orders table.",
      "From Power Query, add columns to the Orders table to calculate the calendar quarter and the calendar month of the OrderDate column.",
      "From Power BI Desktop, use the Auto date/time option when creating the reports.",
      "From Power Query, use a DAX expression to add columns to the Orders table to calculate the calendar quarter of the OrderDate column, the calendar month of the OrderDate column, the calendar quarter of the ShippedDate column, and the calendar month of the ShippedDate column."
    ],
    "correct": [
      0
    ],
    "explanation": "Because we do have visuals that need a filter on either order or shipping date, but no visual requires a filter on\nboth at the same time.\n\nAuto date/time does not meet the criteria: The data model must minimize the size of the dataset as much as\npossible, while meeting the report requirements and the technical requirements.\n\nThe correct answer is A\n\n___________________________________________________________________________\nCase Study Description\n\nNorthwind Traders\n\nCase study\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would\nlike to complete each case. However, there may be additional case studies and sections on this exam. You\nmust manage your time to ensure that you are able to complete all question included on this exam in the\ntime provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information\nabout the scenario that is described in the case study. Each question is independent of the other question\non this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers\nand to make changes before you move to the next section of the exam. After you begin a new section, you\ncannot return to this section.\n\nTo start the case study\n\nTo display the first question on this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment, and problem statements. If the case\nstudy has an All Information tab, note that the information displayed is identical to the information\ndisplayed on the subsequent tabs. When you are ready to answer a question, click the Question button to\nreturn to the question.\n\nOverview.\n\nGeneral Overview\n\nNorthwind Traders is a specialty food import company.\n\nThe company recently implemented Power BI to better understand its top customers, products, and suppliers.\n\nOverview. Business Issues\n\nThe sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting\nServices (SSRS). The IT department takes too long to generate the reports and often misunderstands the\nreport requirements.\n\nExisting Environment. Data Sources\n\nNorthwind Traders uses the data sources shown in the following table.\n\nSource2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.\n\nExisting Environment. Customer Worksheet\n\nSource2 contains a single worksheet named Customer Details.\n\nThe first 11 rows of the worksheet are shown in the following table.\n\nAll the fields in Source2 are mandatory.\n\nThe Address column in Customer Details is the billing address, which can differ from the shipping address.\n\nExisting Environment. Azure SQL Database\n\nSource1 contains the following table:\n\n- Orders\n\n- Products\n\n- Suppliers\n\n- Categories\n\n- Order Details\n\n- Sales Employees\n\nThe Orders table contains the following columns.\n\nThe Order Details table contains the following columns.\n\nThe address in the Orders table is the shipping address, which can differ from the billing address.\n\nThe Products table contains the following columns.\n\nThe Categories table contains the following columns.\n\nThe Suppliers table contains the following columns.\n\nThe Sales Employees table contains the following columns.\n\nEach employee in the Sales Employees table is assigned to one sales region. Multiple employees can be\nassigned to each region.\n\nRequirements.\n\nReport Requirements\n\nNorthwind Traders requires the following reports:\n\n- Top Products\n\n- Top Customers\n\n- On-Time Shipping\n\nThe Top Customers report will show the top 20 customers based on the highest sales amounts in a selected\norder month or quarter, product category, and sales region.\n\nThe Top Products report will show the top 20 products based on the highest sales amounts sold in a selected\norder month or quarter, sales region, and product category. The report must also show which suppliers\nprovide the top products.\n\nThe On-Time Shipping report will show the following metrics for a selected shipping month or quarter:\n\n- The percentage of orders that were shipped late by country and shipping region\n\n- Customers that had multiple late shipments during the last quarter\n\nNorthwind Traders defines late orders as those shipped after the required shipping date.\n\nThe warehouse shipping department must be notified if the percentage of late orders within the current\nmonth exceeds 5%.\n\nThe reports must show historical data for the current calendar year and the last three calendar years.\n\nRequirements. Technical Requirements\n\nNorthwind Traders identifies the following technical requirements:\n\n- A single dataset must support all three reports.\n\n- The reports must be stored in a single Power BI workspace.\n\n- Report data must be current as of 7 AM Pacific Time each day.\n\n- The reports must provide fast response times when users interact with a visualization.\n\n- The data model must minimize the size of the dataset as much as possible, while meeting the report\nrequirements and the technical requirements.\n\nRequirements.\n\nSecurity Requirements\n\nAccess to the reports must be granted to Azure Active Directory (Azure AD) security groups only.\n\nAn Azure AD security group exists for each department.\n\nThe sales department must be able to perform the following tasks in Power BI:\n\n- Create, edit, and delete content in the reports.\n\n- Manage permissions for workspaces, datasets, and report.\n\n- Publish, unpublish, update, and change the permissions for an app.\n\n- Assign Azure AD groups role-based access to the reports workspace.\n\nUsers in the sales department must be able to access only the data of the sales region to which they are\nassigned in the Sales Employees table.\n\nPower BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees\ntable.\n\n[EmailAddress] = USERNAME()\n\nRLS will be applied only to the sales department users. Users in all other departments must be able to view all\nthe data.",
    "source": "Final",
    "sourceNumber": 358,
    "legacy": false
  },
  {
    "id": "f1-359-358",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou need to create a relationship in the dataset for RLS.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: many-to-many -\n\nUsers in the sales department must be able to access only the data of the sales region to which they are\nassigned in the Sales Employees table.\n\nWith composite models, you can establish a many-to-many relationship between tables, which removes\nrequirements for unique values in tables. It also removes previous workarounds, such as introducing new\ntables only to establish relationships.\n\nBox 2: Customer details\n\nSales employees should see the sales of their region only, so all sales ordered by customers whose billing\naddress belongs to the sales employee's region.\n\nTherefore, the relationship between sales employees (region) and customer details (region) should be many-\nto-many (a sales employee has many customers in his region and a customer in a region can have many sales\nemployees for that region).\n\nIn this case, as the customer table is related to the order table, the sales employees will only be able to see\nthe orders of the customers in their region.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships\n\n___________________________________________________________________________\nCase Study Description\n\nNorthwind Traders\n\nCase study\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would\nlike to complete each case. However, there may be additional case studies and sections on this exam. You\nmust manage your time to ensure that you are able to complete all question included on this exam in the\ntime provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information\nabout the scenario that is described in the case study. Each question is independent of the other question\non this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers\nand to make changes before you move to the next section of the exam. After you begin a new section, you\n\ncannot return to this section.\n\nTo start the case study\n\nTo display the first question on this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment, and problem statements. If the case\nstudy has an All Information tab, note that the information displayed is identical to the information\ndisplayed on the subsequent tabs. When you are ready to answer a question, click the Question button to\nreturn to the question.\n\nOverview.\n\nGeneral Overview\n\nNorthwind Traders is a specialty food import company.\n\nThe company recently implemented Power BI to better understand its top customers, products, and suppliers.\n\nOverview. Business Issues\n\nThe sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting\nServices (SSRS). The IT department takes too long to generate the reports and often misunderstands the\nreport requirements.\n\nExisting Environment. Data Sources\n\nNorthwind Traders uses the data sources shown in the following table.\n\nSource2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.\n\nExisting Environment. Customer Worksheet\n\nSource2 contains a single worksheet named Customer Details.\n\nThe first 11 rows of the worksheet are shown in the following table.\n\nAll the fields in Source2 are mandatory.\n\nThe Address column in Customer Details is the billing address, which can differ from the shipping address.\n\nExisting Environment. Azure SQL Database\n\nSource1 contains the following table:\n\n- Orders\n\n- Products\n\n- Suppliers\n\n- Categories\n\n- Order Details\n\n- Sales Employees\n\nThe Orders table contains the following columns.\n\nThe Order Details table contains the following columns.\n\nThe address in the Orders table is the shipping address, which can differ from the billing address.\n\nThe Products table contains the following columns.\n\nThe Categories table contains the following columns.\n\nThe Suppliers table contains the following columns.\n\nThe Sales Employees table contains the following columns.\n\nEach employee in the Sales Employees table is assigned to one sales region. Multiple employees can be\nassigned to each region.\n\nRequirements.\n\nReport Requirements\n\nNorthwind Traders requires the following reports:\n\n- Top Products\n\n- Top Customers\n\n- On-Time Shipping\n\nThe Top Customers report will show the top 20 customers based on the highest sales amounts in a selected\norder month or quarter, product category, and sales region.\n\nThe Top Products report will show the top 20 products based on the highest sales amounts sold in a selected\norder month or quarter, sales region, and product category. The report must also show which suppliers\nprovide the top products.\n\nThe On-Time Shipping report will show the following metrics for a selected shipping month or quarter:\n\n- The percentage of orders that were shipped late by country and shipping region\n\n- Customers that had multiple late shipments during the last quarter\n\nNorthwind Traders defines late orders as those shipped after the required shipping date.\n\nThe warehouse shipping department must be notified if the percentage of late orders within the current\nmonth exceeds 5%.\n\nThe reports must show historical data for the current calendar year and the last three calendar years.\n\nRequirements. Technical Requirements\n\nNorthwind Traders identifies the following technical requirements:\n\n- A single dataset must support all three reports.\n\n- The reports must be stored in a single Power BI workspace.\n\n- Report data must be current as of 7 AM Pacific Time each day.\n\n- The reports must provide fast response times when users interact with a visualization.\n\n- The data model must minimize the size of the dataset as much as possible, while meeting the report\nrequirements and the technical requirements.\n\nRequirements.\n\nSecurity Requirements\n\nAccess to the reports must be granted to Azure Active Directory (Azure AD) security groups only.\n\nAn Azure AD security group exists for each department.\n\nThe sales department must be able to perform the following tasks in Power BI:\n\n- Create, edit, and delete content in the reports.\n\n- Manage permissions for workspaces, datasets, and report.\n\n- Publish, unpublish, update, and change the permissions for an app.\n\n- Assign Azure AD groups role-based access to the reports workspace.\n\nUsers in the sales department must be able to access only the data of the sales region to which they are\nassigned in the Sales Employees table.\n\nPower BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees\ntable.\n\n[EmailAddress] = USERNAME()\n\nRLS will be applied only to the sales department users. Users in all other departments must be able to view all\nthe data.",
    "source": "Final",
    "sourceNumber": 359,
    "legacy": false,
    "image": "/dump-assets/f1-359-358-question.webp",
    "answerImage": "/dump-assets/f1-359-358-answer.webp"
  },
  {
    "id": "f1-360-359",
    "domain": "Model the data",
    "type": "single",
    "prompt": "You need to update the Power BI model to ensure that the analysts can quickly build drill-downs from business\n\nunit to product in a visual.\n\nWhat should you create?",
    "choices": [
      "a group",
      "a calculated table",
      "a hierarchy",
      "a calculated column"
    ],
    "correct": [
      2
    ],
    "explanation": "Drill requires a hierarchy.\n\nWhen a visual has a hierarchy, you can drill down to reveal additional details.\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/consumer/end-user-drill\n\n___________________________________________________________________________\nCase Study Description\n\nNorthwind Traders\n\nCase study\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would\nlike to complete each case. However, there may be additional case studies and sections on this exam. You\nmust manage your time to ensure that you are able to complete all question included on this exam in the\ntime provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information\nabout the scenario that is described in the case study. Each question is independent of the other question\non this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers\nand to make changes before you move to the next section of the exam. After you begin a new section, you\ncannot return to this section.\n\nTo start the case study\n\nTo display the first question on this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment, and problem statements. If the case\nstudy has an All Information tab, note that the information displayed is identical to the information\ndisplayed on the subsequent tabs. When you are ready to answer a question, click the Question button to\nreturn to the question.\n\nOverview.\n\nGeneral Overview\n\nNorthwind Traders is a specialty food import company.\n\nThe company recently implemented Power BI to better understand its top customers, products, and suppliers.\n\nOverview. Business Issues\n\nThe sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting\nServices (SSRS). The IT department takes too long to generate the reports and often misunderstands the\nreport requirements.\n\nExisting Environment. Data Sources\n\nNorthwind Traders uses the data sources shown in the following table.\n\nSource2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.\n\nExisting Environment. Customer Worksheet\n\nSource2 contains a single worksheet named Customer Details.\n\nThe first 11 rows of the worksheet are shown in the following table.\n\nAll the fields in Source2 are mandatory.\n\nThe Address column in Customer Details is the billing address, which can differ from the shipping address.\n\nExisting Environment. Azure SQL Database\n\nSource1 contains the following table:\n\n- Orders\n\n- Products\n\n- Suppliers\n\n- Categories\n\n- Order Details\n\n- Sales Employees\n\nThe Orders table contains the following columns.\n\nThe Order Details table contains the following columns.\n\nThe address in the Orders table is the shipping address, which can differ from the billing address.\n\nThe Products table contains the following columns.\n\nThe Categories table contains the following columns.\n\nThe Suppliers table contains the following columns.\n\nThe Sales Employees table contains the following columns.\n\nEach employee in the Sales Employees table is assigned to one sales region. Multiple employees can be\nassigned to each region.\n\nRequirements.\n\nReport Requirements\n\nNorthwind Traders requires the following reports:\n\n- Top Products\n\n- Top Customers\n\n- On-Time Shipping\n\nThe Top Customers report will show the top 20 customers based on the highest sales amounts in a selected\norder month or quarter, product category, and sales region.\n\nThe Top Products report will show the top 20 products based on the highest sales amounts sold in a selected\norder month or quarter, sales region, and product category. The report must also show which suppliers\nprovide the top products.\n\nThe On-Time Shipping report will show the following metrics for a selected shipping month or quarter:\n\n- The percentage of orders that were shipped late by country and shipping region\n\n- Customers that had multiple late shipments during the last quarter\n\nNorthwind Traders defines late orders as those shipped after the required shipping date.\n\nThe warehouse shipping department must be notified if the percentage of late orders within the current\nmonth exceeds 5%.\n\nThe reports must show historical data for the current calendar year and the last three calendar years.\n\nRequirements. Technical Requirements\n\nNorthwind Traders identifies the following technical requirements:\n\n- A single dataset must support all three reports.\n\n- The reports must be stored in a single Power BI workspace.\n\n- Report data must be current as of 7 AM Pacific Time each day.\n\n- The reports must provide fast response times when users interact with a visualization.\n\n- The data model must minimize the size of the dataset as much as possible, while meeting the report\nrequirements and the technical requirements.\n\nRequirements.\n\nSecurity Requirements\n\nAccess to the reports must be granted to Azure Active Directory (Azure AD) security groups only.\n\nAn Azure AD security group exists for each department.\n\nThe sales department must be able to perform the following tasks in Power BI:\n\n- Create, edit, and delete content in the reports.\n\n- Manage permissions for workspaces, datasets, and report.\n\n- Publish, unpublish, update, and change the permissions for an app.\n\n- Assign Azure AD groups role-based access to the reports workspace.\n\nUsers in the sales department must be able to access only the data of the sales region to which they are\nassigned in the Sales Employees table.\n\nPower BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees\ntable.\n\n[EmailAddress] = USERNAME()\n\nRLS will be applied only to the sales department users. Users in all other departments must be able to view all\nthe data.",
    "source": "Final",
    "sourceNumber": 360,
    "legacy": false
  },
  {
    "id": "f1-361-360",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou need to create the Top Customers report.\n\nWhich type of filter should you use, and at which level should you apply the filter? To answer, select the\n\nappropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Top N -\n\nThe Top Customers report will show the top 20 customers based on the highest sales amounts in a selected\norder month or quarter, product category, and sales region.\n\nBox 2: Visual -\n\nThe reports must show historical data for the current calendar year and the last three calendar years.\n\nApplying specific measures to the visual-level filter of a visualization is a very powerful technique to\ncompletely customize the items shown in a report. The presence of this filter requires special measures in\norder to display values related to items not included in the visual level filter.\n\nReference:\n\nhttps://www.sqlbi.com/articles/filtering-the-top-3-products-for-each-category-in-power-bi/\n\n___________________________________________________________________________\nCase Study Description\n\nNorthwind Traders\n\nCase study\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would\nlike to complete each case. However, there may be additional case studies and sections on this exam. You\nmust manage your time to ensure that you are able to complete all question included on this exam in the\ntime provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information\nabout the scenario that is described in the case study. Each question is independent of the other question\non this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers\nand to make changes before you move to the next section of the exam. After you begin a new section, you\ncannot return to this section.\n\nTo start the case study\n\nTo display the first question on this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment, and problem statements. If the case\nstudy has an All Information tab, note that the information displayed is identical to the information\ndisplayed on the subsequent tabs. When you are ready to answer a question, click the Question button to\nreturn to the question.\n\nOverview.\n\nGeneral Overview\n\nNorthwind Traders is a specialty food import company.\n\nThe company recently implemented Power BI to better understand its top customers, products, and suppliers.\n\nOverview. Business Issues\n\nThe sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting\nServices (SSRS). The IT department takes too long to generate the reports and often misunderstands the\nreport requirements.\n\nExisting Environment. Data Sources\n\nNorthwind Traders uses the data sources shown in the following table.\n\nSource2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.\n\nExisting Environment. Customer Worksheet\n\nSource2 contains a single worksheet named Customer Details.\n\nThe first 11 rows of the worksheet are shown in the following table.\n\nAll the fields in Source2 are mandatory.\n\nThe Address column in Customer Details is the billing address, which can differ from the shipping address.\n\nExisting Environment. Azure SQL Database\n\nSource1 contains the following table:\n\n- Orders\n\n- Products\n\n- Suppliers\n\n- Categories\n\n- Order Details\n\n- Sales Employees\n\nThe Orders table contains the following columns.\n\nThe Order Details table contains the following columns.\n\nThe address in the Orders table is the shipping address, which can differ from the billing address.\n\nThe Products table contains the following columns.\n\nThe Categories table contains the following columns.\n\nThe Suppliers table contains the following columns.\n\nThe Sales Employees table contains the following columns.\n\nEach employee in the Sales Employees table is assigned to one sales region. Multiple employees can be\nassigned to each region.\n\nRequirements.\n\nReport Requirements\n\nNorthwind Traders requires the following reports:\n\n- Top Products\n\n- Top Customers\n\n- On-Time Shipping\n\nThe Top Customers report will show the top 20 customers based on the highest sales amounts in a selected\norder month or quarter, product category, and sales region.\n\nThe Top Products report will show the top 20 products based on the highest sales amounts sold in a selected\norder month or quarter, sales region, and product category. The report must also show which suppliers\nprovide the top products.\n\nThe On-Time Shipping report will show the following metrics for a selected shipping month or quarter:\n\n- The percentage of orders that were shipped late by country and shipping region\n\n- Customers that had multiple late shipments during the last quarter\n\nNorthwind Traders defines late orders as those shipped after the required shipping date.\n\nThe warehouse shipping department must be notified if the percentage of late orders within the current\nmonth exceeds 5%.\n\nThe reports must show historical data for the current calendar year and the last three calendar years.\n\nRequirements. Technical Requirements\n\nNorthwind Traders identifies the following technical requirements:\n\n- A single dataset must support all three reports.\n\n- The reports must be stored in a single Power BI workspace.\n\n- Report data must be current as of 7 AM Pacific Time each day.\n\n- The reports must provide fast response times when users interact with a visualization.\n\n- The data model must minimize the size of the dataset as much as possible, while meeting the report\nrequirements and the technical requirements.\n\nRequirements.\n\nSecurity Requirements\n\nAccess to the reports must be granted to Azure Active Directory (Azure AD) security groups only.\n\nAn Azure AD security group exists for each department.\n\nThe sales department must be able to perform the following tasks in Power BI:\n\n- Create, edit, and delete content in the reports.\n\n- Manage permissions for workspaces, datasets, and report.\n\n- Publish, unpublish, update, and change the permissions for an app.\n\n- Assign Azure AD groups role-based access to the reports workspace.\n\nUsers in the sales department must be able to access only the data of the sales region to which they are\nassigned in the Sales Employees table.\n\nPower BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees\ntable.\n\n[EmailAddress] = USERNAME()\n\nRLS will be applied only to the sales department users. Users in all other departments must be able to view all\nthe data.",
    "source": "Final",
    "sourceNumber": 361,
    "legacy": false,
    "image": "/dump-assets/f1-361-360-question.webp",
    "answerImage": "/dump-assets/f1-361-360-answer.webp"
  },
  {
    "id": "f1-362-361",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "You need to create the On-Time Shipping report. The report must include a visualization that shows the percentage\n\nof late orders.\n\nWhich type of visualization should you create?",
    "choices": [
      "pie chart",
      "scatterplot",
      "bar chart"
    ],
    "correct": [
      2
    ],
    "explanation": "The On-Time Shipping report will show the following metrics for a selected shipping month or quarter:\n\nThe percentage of orders that were shipped late by country and shipping region\n\nBar and column charts are some of the most widely used visualization charts in Power BI. They can be used for\none or multiple categories. Both these chart types represent data with rectangular bars, where the size of the\nbar is proportional to the magnitude of data values.\n\nReference:\n\nhttps://www.pluralsight.com/guides/bar-and-column-charts-in-power-bi\n\n___________________________________________________________________________\nCase Study Description\n\nNorthwind Traders\n\nCase study\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would\nlike to complete each case. However, there may be additional case studies and sections on this exam. You\nmust manage your time to ensure that you are able to complete all question included on this exam in the\ntime provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information\nabout the scenario that is described in the case study. Each question is independent of the other question\non this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers\nand to make changes before you move to the next section of the exam. After you begin a new section, you\ncannot return to this section.\n\nTo start the case study\n\nTo display the first question on this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment, and problem statements. If the case\nstudy has an All Information tab, note that the information displayed is identical to the information\ndisplayed on the subsequent tabs. When you are ready to answer a question, click the Question button to\nreturn to the question.\n\nOverview.\n\nGeneral Overview\n\nNorthwind Traders is a specialty food import company.\n\nThe company recently implemented Power BI to better understand its top customers, products, and suppliers.\n\nOverview. Business Issues\n\nThe sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting\nServices (SSRS). The IT department takes too long to generate the reports and often misunderstands the\nreport requirements.\n\nExisting Environment. Data Sources\n\nNorthwind Traders uses the data sources shown in the following table.\n\nSource2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.\n\nExisting Environment. Customer Worksheet\n\nSource2 contains a single worksheet named Customer Details.\n\nThe first 11 rows of the worksheet are shown in the following table.\n\nAll the fields in Source2 are mandatory.\n\nThe Address column in Customer Details is the billing address, which can differ from the shipping address.\n\nExisting Environment. Azure SQL Database\n\nSource1 contains the following table:\n\n- Orders\n\n- Products\n\n- Suppliers\n\n- Categories\n\n- Order Details\n\n- Sales Employees\n\nThe Orders table contains the following columns.\n\nThe Order Details table contains the following columns.\n\nThe address in the Orders table is the shipping address, which can differ from the billing address.\n\nThe Products table contains the following columns.\n\nThe Categories table contains the following columns.\n\nThe Suppliers table contains the following columns.\n\nThe Sales Employees table contains the following columns.\n\nEach employee in the Sales Employees table is assigned to one sales region. Multiple employees can be\nassigned to each region.\n\nRequirements.\n\nReport Requirements\n\nNorthwind Traders requires the following reports:\n\n- Top Products\n\n- Top Customers\n\n- On-Time Shipping\n\nThe Top Customers report will show the top 20 customers based on the highest sales amounts in a selected\norder month or quarter, product category, and sales region.\n\nThe Top Products report will show the top 20 products based on the highest sales amounts sold in a selected\norder month or quarter, sales region, and product category. The report must also show which suppliers\nprovide the top products.\n\nThe On-Time Shipping report will show the following metrics for a selected shipping month or quarter:\n\n- The percentage of orders that were shipped late by country and shipping region\n\n- Customers that had multiple late shipments during the last quarter\n\nNorthwind Traders defines late orders as those shipped after the required shipping date.\n\nThe warehouse shipping department must be notified if the percentage of late orders within the current\nmonth exceeds 5%.\n\nThe reports must show historical data for the current calendar year and the last three calendar years.\n\nRequirements. Technical Requirements\n\nNorthwind Traders identifies the following technical requirements:\n\n- A single dataset must support all three reports.\n\n- The reports must be stored in a single Power BI workspace.\n\n- Report data must be current as of 7 AM Pacific Time each day.\n\n- The reports must provide fast response times when users interact with a visualization.\n\n- The data model must minimize the size of the dataset as much as possible, while meeting the report\nrequirements and the technical requirements.\n\nRequirements.\n\nSecurity Requirements\n\nAccess to the reports must be granted to Azure Active Directory (Azure AD) security groups only.\n\nAn Azure AD security group exists for each department.\n\nThe sales department must be able to perform the following tasks in Power BI:\n\n- Create, edit, and delete content in the reports.\n\n- Manage permissions for workspaces, datasets, and report.\n\n- Publish, unpublish, update, and change the permissions for an app.\n\n- Assign Azure AD groups role-based access to the reports workspace.\n\nUsers in the sales department must be able to access only the data of the sales region to which they are\nassigned in the Sales Employees table.\n\nPower BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees\ntable.\n\n[EmailAddress] = USERNAME()\n\nRLS will be applied only to the sales department users. Users in all other departments must be able to view all\nthe data.",
    "source": "Final",
    "sourceNumber": 362,
    "legacy": false
  },
  {
    "id": "f1-363-362",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou need to create a KPI visualization to meet the reporting requirements of the sales managers.\n\nHow should you create the visualization? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "The sales managers require a visual to analyze sales performance versus sales targets.\n\nBox 1: Sales[sales_amount]\n\nValue; The main measure which we want to evaluate\n\nExample:\n\nSales = sum(FactInternetSales[SalesAmount])\n\nBox 2: Date[month]\n\nTrend; How Value perfoms in a time period, is it going upward, downward¦?\n\nYou can use Months as trend axis.\n\nBox 3: Targets[sales_target]\n\nTarget; What we want to compare the Value with\n\nReference:\n\nhttps://radacad.com/kpi-visual-in-power-bi-explained\n\n_________________________________________________________________________\n\nCase Study Description\n\nIntroductory Info\n\nCase Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like\nto complete each case. However, there may be additional case studies and sections on this exam. You must\nmanage your time to ensure that you are able to complete all questions included on this exam in the time\nprovided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information about\nthe scenario that is described in the case study. Each question is independent of the other questions in this\ncase study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and\nto make changes before you move to the next section of the exam. After you begin a new section, you cannot\nreturn to this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment and problem statements. If the case study\nhas an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the\nsubsequent tabs. When you are ready to answer a question, click the Question button to return to the\nquestion.\n\nOverview -\n\nLitware, Inc. is an online retailer that uses Power BI.\n\nLitware plans to leverage data from an Azure SQL database that stores data for the company's live e-\ncommerce website.\n\nLitware uses Azure Active Directory (Azure AD) to authenticate users.\n\nExisting Environment. Sales Data\n\nLitware has online sales data that has the SQL schema shown in the following table.\n\nIn the Date table, the date_id column has a format of yyyymmdd and the month column has a format of\nyyyymm.\n\nThe week column in the Date table and the week_id column in the Weekly_Returns table have a format of\nyyyyww.\n\nIn the Sales table, the sales_id column represents a unique transaction.\n\nThe region id column can be managed by only one sales manager.\n\nExisting Environment. Data Concerns\n\nYou are concerned with the quality and completeness of the sales data. You must ensure that negative and\n\nmissing sales_amount values do NOT contribute to the total sales amount calculation.\n\nExisting Environment. Reporting Requirements\n\nLitware identifies the following reporting requirements:\n\nExecutives require a visual that shows sales by region.\nExecutives require a visual that shows returns by region manager and the sales managers that report to them.\nThe sales managers must be able to see only the sales data of their respective region.\nThe sales managers require a visual to analyze sales performance versus sales targets.\nThe sales department requires reports that contain the number of sales transactions.\nUsers must be able to see the month in each report as shown in the following example: Feb 2020.\nThe customer service department requires a visual that can be filtered by both sales month and ship month\nindependently.\nThe maximum allowed latency to include transactions in reports is five minutes.",
    "source": "Final",
    "sourceNumber": 363,
    "legacy": false,
    "image": "/dump-assets/f1-363-362-question.webp",
    "answerImage": "/dump-assets/f1-363-362-answer.webp"
  },
  {
    "id": "f1-364-363",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT -\n\nYou publish the dataset to powerbi.com.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "No\n\nAzure SQL Server, therefore no need for an on-premise Gateway as Service and Azure are in the cloud.\n\nNo\n\nDirect Query mode for the DB connection, so no need to schedule a refresh. Direct Query is a live connection.\n\nNo\n\nAzure SQL supports the following connections from Power BI: Windows, Database and Microsoft Account.\n(Basic is reserved for Power Query Online. Do not confuse Database with Basic.):\n\nhttps://learn.microsoft.com/en-us/power-query/connectors/azuresqldatabase\n\nhttps://learn.microsoft.com/en-us/power-bi/connect-data/service-azure-sql-database-with-direct-connect\n\n_________________________________________________________________________\n\nCase Study Description\n\nIntroductory Info\n\nCase Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like\nto complete each case. However, there may be additional case studies and sections on this exam. You must\nmanage your time to ensure that you are able to complete all questions included on this exam in the time\nprovided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in\nthe case study. Case studies might contain exhibits and other resources that provide more information about\nthe scenario that is described in the case study. Each question is independent of the other questions in this\ncase study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and\nto make changes before you move to the next section of the exam. After you begin a new section, you cannot\nreturn to this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to\nexplore the content of the case study before you answer the questions. Clicking these buttons displays\ninformation such as business requirements, existing environment and problem statements. If the case study\nhas an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the\nsubsequent tabs. When you are ready to answer a question, click the Question button to return to the\nquestion.\n\nOverview -\n\nLitware, Inc. is an online retailer that uses Power BI.\n\nLitware plans to leverage data from an Azure SQL database that stores data for the company's live e-\ncommerce website.\n\nLitware uses Azure Active Directory (Azure AD) to authenticate users.\n\nExisting Environment. Sales Data\n\nLitware has online sales data that has the SQL schema shown in the following table.\n\nIn the Date table, the date_id column has a format of yyyymmdd and the month column has a format of\nyyyymm.\n\nThe week column in the Date table and the week_id column in the Weekly_Returns table have a format of\nyyyyww.\n\nIn the Sales table, the sales_id column represents a unique transaction.\n\nThe region id column can be managed by only one sales manager.\n\nExisting Environment. Data Concerns\n\nYou are concerned with the quality and completeness of the sales data. You must ensure that negative and\n\nmissing sales_amount values do NOT contribute to the total sales amount calculation.\n\nExisting Environment. Reporting Requirements\n\nLitware identifies the following reporting requirements:\n\nExecutives require a visual that shows sales by region.\nExecutives require a visual that shows returns by region manager and the sales managers that report to them.\nThe sales managers must be able to see only the sales data of their respective region.\nThe sales managers require a visual to analyze sales performance versus sales targets.\nThe sales department requires reports that contain the number of sales transactions.\nUsers must be able to see the month in each report as shown in the following example: Feb 2020.\nThe customer service department requires a visual that can be filtered by both sales month and ship month\nindependently.\nThe maximum allowed latency to include transactions in reports is five minutes.",
    "source": "Final",
    "sourceNumber": 364,
    "legacy": false,
    "image": "/dump-assets/f1-364-363-question.webp",
    "answerImage": "/dump-assets/f1-364-363-answer.webp"
  },
  {
    "id": "f1-365-364",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nOverview -\n\nLitware, Inc. is an online retailer that uses Power BI.\n\nLitware plans to leverage data from an Azure SQL database that stores data for the company's live e-commerce\n\nwebsite.\n\nLitware uses Azure Active Directory (Azure AD) to authenticate users.\n\nExisting Environment. Sales Data\n\nLitware has online sales data that has the SQL schema shown in the following table.\n\nIn the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.\n\nThe week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.\n\nIn the Sales table, the sales_id column represents a unique transaction.\n\nThe region id column can be managed by only one sales manager.\n\nExisting Environment. Data Concerns\n\nYou are concerned with the quality and completeness of the sales data. You must ensure that negative and missing\n\nsales_amount values do NOT contribute to the total sales amount calculation.\n\nExisting Environment. Reporting Requirements\n\nLitware identifies the following reporting requirements:\n\nExecutives require a visual that shows sales by region.\n\nExecutives require a visual that shows returns by region manager and the sales managers that report to them.\n\nThe sales managers must be able to see only the sales data of their respective region.\n\nThe sales managers require a visual to analyze sales performance versus sales targets.\n\nThe sales department requires reports that contain the number of sales transactions.\n\nUsers must be able to see the month in each report as shown in the following example: Feb 2020.\n\nThe customer service department requires a visual that can be filtered by both sales month and ship month\n\nindependently.\n\nThe maximum allowed latency to include transactions in reports is five minutes. Question What should you create\n\nto meet the reporting requirements of the sales department?",
    "choices": [
      "a measure column that uses the following formula: SUMX(FILTER('Sales', 'Sales'[sales_amount] > 0)), [sales_amount])",
      "a calculated column that uses the following formula: ABS(Sales[sales_amount])",
      "a calculated column that uses the following formula: IF(ISBLANK(Sales[sales_amount]),0, (Sales[sales_amount]))",
      "a measure that uses the following formula: SUM(Sales[sales_amount])"
    ],
    "correct": [
      0
    ],
    "explanation": "A. a measure column using:\n\nDAX\n\nCopy\n\nEdit\n\nSUMX(FILTER('Sales', 'Sales'[sales_amount] > 0), [sales_amount])\n\nThis filters out negative or zero values and sums only positive sales_amount values.\n\nUse case: Reporting only positive sales, e.g., excluding refunds/returns.\n\nIt's a measure, not a column—good for dynamic aggregation in visuals.\n\nLikely a good candidate if the requirement is to report only positive sales totals.",
    "source": "Final",
    "sourceNumber": 365,
    "legacy": false,
    "image": "/exhibit-assets/f1-365-364.webp"
  },
  {
    "id": "f1-366-365",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nOverview -\n\nContoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board\n\nmeetings for which financial analysts manually prepare\n\nMicrosoft Excel reports, including balance sheets and profit and loss statements for each of the company's four\n\nbusiness units.\n\nExisting Environment -\n\nData and Sources -\n\nData for the reports comes from the sources shown in the following table.\n\nThe balance sheet data is unrelated to the profit and loss results other than they both relate to dates.\n\nBalance Sheet Data -\n\nThe balance sheet data is imported and includes the final monthly balances of each account in the format shown in\n\nthe following table.\n\nThe balance sheet data always includes a row for each account for each month.\n\nProduct Catalog Data -\n\nThe product catalog shows how products roll up to product categories, which roll up to the business units. The\n\nproduct list is provided in the format shown in the following table.\n\nRevenue data is provided at the date and product level. Expense data is provided at the date and department level.\n\nBusiness Issues -\n\nHistorically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is\n\nusually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an\n\nExcel formula. On occasion, there are conflicting results in the reports because the products and departments that\n\nroll up to each business unit are not defined consistently.\n\nRequirements -\n\nPlanned Changes -\n\nContoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants\n\nto reduce how long it takes to populate the reports to less than two days. The company wants to create common\n\nlogic for the business units, products, and departments. The logic will be used across all reports, including but not\n\nlimited to the quarterly reporting for the board.\n\nTechnical Requirements -\n\nContoso wants the reports and datasets refreshed with minimum manual effort.\n\nThe company wants to provide the board with a single package of reports that will contain custom navigation and\n\nlinks to supplementary information.\n\nMaintenance, including manually updating data and access, must be minimized as much as possible.\n\nSecurity Requirements -\n\nThe reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group\n\nwill be used to share information with the board.\n\nContoso identifies the following security requirements for analyst access:\n\nAnalysts must be able to access all balance sheet and product catalog data.\n\nAnalysts must be able to access only the profit and loss data of their respective business unit.\n\nAnalysts must be able to create new reports from the dataset that contains the profit and loss data, but the\n\nreports built by the analysts must NOT be included in the quarterly reports for the board.\n\nAnalysts must NOT be able to share the quarterly reports with anyone.\n\nAnalysts must NOT be able to make new reports by using the balance sheet data.\n\nReport Requirements -\n\nYou plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the\n\nlast day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the\n\nending balances for the quarter, as well as for the previous quarter.\n\nThe date table will contain the columns shown in the following table.\n\nThe definitions and attributes for the products, departments, and business units must be consistent across all the\n\nreports.\n\nThe board must be able to get the following information from the quarterly reports:\n\nRevenue trends over time\n\nThe ending balances of each account\n\nChanges in long-term liabilities from the previous quarter\n\nThe percent of total revenue contributed by each product category\n\nA comparison of quarterly revenue versus the same quarter from the previous year\n\nThe reports must be updated with the latest data by 5 AM each day. Question HOTSPOT -\n\nYou need to grant access to the business unit analysts.\n\nWhat should you configure? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: The Viewer role to the workspace\n\nThe Viewer role gives a read-only experience to its users. They can view dashboards, reports, or workbooks in\nthe workspace, but can't browse the datasets or dataflows. Use the Viewer role wherever you would\npreviously use a classic workspace set to Members can only view Power BI content.\n\nBox 2: Build -\n\nThe analysts must be able to build new reports from the dataset that contains the profit and loss data.\n\nScenario: The reports must be made available to the board from powerbi.com.\n\nThe analysts responsible for each business unit must see all the data the board sees, except the profit and\nloss data, which must be restricted to only their business unit's data. The analysts must be able to build new\nreports from the dataset that contains the profit and loss data, but any reports that the analysts build must\nnot be included in the quarterly reports for the board. The analysts must not be able to share the quarterly\nreports with anyone.\n\nReference:\n\nhttps://www.nickyvv.com/2019/08/the-new-power-bi-workspace-viewer-role-explained.html\n\nDeploy and Maintain Deliverables",
    "source": "Final",
    "sourceNumber": 366,
    "legacy": false,
    "image": "/dump-assets/f1-366-365-question.webp",
    "answerImage": "/dump-assets/f1-366-365-answer.webp"
  },
  {
    "id": "f1-367-366",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nOverview -\n\nContoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board\n\nmeetings for which financial analysts manually prepare\n\nMicrosoft Excel reports, including balance sheets and profit and loss statements for each of the company's four\n\nbusiness units.\n\nExisting Environment -\n\nData and Sources -\n\nData for the reports comes from the sources shown in the following table.\n\nThe balance sheet data is unrelated to the profit and loss results other than they both relate to dates.\n\nBalance Sheet Data -\n\nThe balance sheet data is imported and includes the final monthly balances of each account in the format shown in\n\nthe following table.\n\nThe balance sheet data always includes a row for each account for each month.\n\nProduct Catalog Data -\n\nThe product catalog shows how products roll up to product categories, which roll up to the business units. The\n\nproduct list is provided in the format shown in the following table.\n\nRevenue data is provided at the date and product level. Expense data is provided at the date and department level.\n\nBusiness Issues -\n\nHistorically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is\n\nusually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an\n\nExcel formula. On occasion, there are conflicting results in the reports because the products and departments that\n\nroll up to each business unit are not defined consistently.\n\nRequirements -\n\nPlanned Changes -\n\nContoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants\n\nto reduce how long it takes to populate the reports to less than two days. The company wants to create common\n\nlogic for the business units, products, and departments. The logic will be used across all reports, including but not\n\nlimited to the quarterly reporting for the board.\n\nTechnical Requirements -\n\nContoso wants the reports and datasets refreshed with minimum manual effort.\n\nThe company wants to provide the board with a single package of reports that will contain custom navigation and\n\nlinks to supplementary information.\n\nMaintenance, including manually updating data and access, must be minimized as much as possible.\n\nSecurity Requirements -\n\nThe reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group\n\nwill be used to share information with the board.\n\nContoso identifies the following security requirements for analyst access:\n\nAnalysts must be able to access all balance sheet and product catalog data.\n\nAnalysts must be able to access only the profit and loss data of their respective business unit.\n\nAnalysts must be able to create new reports from the dataset that contains the profit and loss data, but the\n\nreports built by the analysts must NOT be included in the quarterly reports for the board.\n\nAnalysts must NOT be able to share the quarterly reports with anyone.\n\nAnalysts must NOT be able to make new reports by using the balance sheet data.\n\nReport Requirements -\n\nYou plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the\n\nlast day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the\n\nending balances for the quarter, as well as for the previous quarter.\n\nThe date table will contain the columns shown in the following table.\n\nThe definitions and attributes for the products, departments, and business units must be consistent across all the\n\nreports.\n\nThe board must be able to get the following information from the quarterly reports:\n\nRevenue trends over time\n\nThe ending balances of each account\n\nChanges in long-term liabilities from the previous quarter\n\nThe percent of total revenue contributed by each product category\n\nA comparison of quarterly revenue versus the same quarter from the previous year\n\nThe reports must be updated with the latest data by 5 AM each day. Question HOTSPOT -\n\nHow should you distribute the reports to the board? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\nHot Area:",
    "choices": [],
    "correct": [],
    "explanation": "1. Using an App\n\n2. A mail-enabled security group in Azure Active Directory\n\nBox 1: Using an App\n\nBox 2: A mail-enabled security group in Azure Active Directory\n\nMail-Enabled Security Group -\n\nThis group also contains a list of email addresses of members and can also be used to control access to\nOneDrive and SharePoint.\n\nThe Mail-Enabled Security Group can be created in the Office 365 Admin Portal\n\nNote: The reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure\nAD) group will be used to share information with the board.\n\nIncorrect:\n\n* Distribution Group\n\nThis group can also be called and Distribution List. The Distribution Group is a group which contains a list of\nemail addresses of members, all of whom will be sent an email when an email is sent to the distribution groups\nemail address.\n\nThe Distribution Group can be created in the Azure Active Directory\n\nReference:\n\nhttps://docs.microsoft.com/en-us/power-bi/collaborate-share/service-share-dashboards\nhttps://www.fourmoo.com/2020/04/01/power-bi-which-groups-can-be-used-to-set-permissions-in-power-bi/",
    "source": "Final",
    "sourceNumber": 367,
    "legacy": false,
    "image": "/dump-assets/f1-367-366-question.webp",
    "answerImage": "/dump-assets/f1-367-366-answer.webp"
  },
  {
    "id": "f1-368-367",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nOverview -\n\nContoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board\n\nmeetings for which financial analysts manually prepare\n\nMicrosoft Excel reports, including balance sheets and profit and loss statements for each of the company's four\n\nbusiness units.\n\nExisting Environment -\n\nData and Sources -\n\nData for the reports comes from the sources shown in the following table.\n\nThe balance sheet data is unrelated to the profit and loss results other than they both relate to dates.\n\nBalance Sheet Data -\n\nThe balance sheet data is imported and includes the final monthly balances of each account in the format shown in\n\nthe following table.\n\nThe balance sheet data always includes a row for each account for each month.\n\nProduct Catalog Data -\n\nThe product catalog shows how products roll up to product categories, which roll up to the business units. The\n\nproduct list is provided in the format shown in the following table.\n\nRevenue data is provided at the date and product level. Expense data is provided at the date and department level.\n\nBusiness Issues -\n\nHistorically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is\n\nusually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an\n\nExcel formula. On occasion, there are conflicting results in the reports because the products and departments that\n\nroll up to each business unit are not defined consistently.\n\nRequirements -\n\nPlanned Changes -\n\nContoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants\n\nto reduce how long it takes to populate the reports to less than two days. The company wants to create common\n\nlogic for the business units, products, and departments. The logic will be used across all reports, including but not\n\nlimited to the quarterly reporting for the board.\n\nTechnical Requirements -\n\nContoso wants the reports and datasets refreshed with minimum manual effort.\n\nThe company wants to provide the board with a single package of reports that will contain custom navigation and\n\nlinks to supplementary information.\n\nMaintenance, including manually updating data and access, must be minimized as much as possible.\n\nSecurity Requirements -\n\nThe reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group\n\nwill be used to share information with the board.\n\nContoso identifies the following security requirements for analyst access:\n\nAnalysts must be able to access all balance sheet and product catalog data.\n\nAnalysts must be able to access only the profit and loss data of their respective business unit.\n\nAnalysts must be able to create new reports from the dataset that contains the profit and loss data, but the\n\nreports built by the analysts must NOT be included in the quarterly reports for the board.\n\nAnalysts must NOT be able to share the quarterly reports with anyone.\n\nAnalysts must NOT be able to make new reports by using the balance sheet data.\n\nReport Requirements -\n\nYou plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the\n\nlast day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the\n\nending balances for the quarter, as well as for the previous quarter.\n\nThe date table will contain the columns shown in the following table.\n\nThe definitions and attributes for the products, departments, and business units must be consistent across all the\n\nreports.\n\nThe board must be able to get the following information from the quarterly reports:\n\nRevenue trends over time\n\nThe ending balances of each account\n\nChanges in long-term liabilities from the previous quarter\n\nThe percent of total revenue contributed by each product category\n\nA comparison of quarterly revenue versus the same quarter from the previous year\n\nThe reports must be updated with the latest data by 5 AM each day. Question You need to ensure that the data is\n\nupdated to meet the report requirements. The solution must minimize configuration effort.\n\nWhat should you do?",
    "choices": [
      "From each report in powerbi.com, select Refresh visuals.",
      "From Power BI Desktop, download the PBIX file and refresh the data.",
      "Configure a scheduled refresh without using an on-premises data gateway.",
      "Configure a scheduled refresh by using an on-premises data gateway."
    ],
    "correct": [
      2
    ],
    "explanation": "C is the answer. The database is on Azure database, not on-premise\n\n\"Scheduled refresh of reports isn’t supported with Dynamics 365 (on-premises) datasets that are published to\nthe Power BI service. You can refresh reports using in Microsoft Power BI Desktop or Microsoft Office Excel\nand then upload the reports to the Power BI service.\"\n\nSo D is impossible. C is correct.",
    "source": "Final",
    "sourceNumber": 368,
    "legacy": false,
    "image": "/exhibit-assets/f1-368-367.webp"
  },
  {
    "id": "f1-369-368",
    "domain": "Model the data",
    "type": "single",
    "prompt": "Introductory Info Case Study -\n\nThis is a case study. Case studies are not timed separately. You can use as much exam time as you would like to\n\ncomplete each case. However, there may be additional case studies and sections on this exam. You must manage\n\nyour time to ensure that you are able to complete all questions included on this exam in the time provided.\n\nTo answer the questions included in a case study, you will need to reference information that is provided in the\n\ncase study. Case studies might contain exhibits and other resources that provide more information about the\n\nscenario that is described in the case study. Each question is independent of the other questions in this case study.\n\nAt the end of this case study, a review screen will appear. This screen allows you to review your answers and to\n\nmake changes before you move to the next section of the exam. After you begin a new section, you cannot return\n\nto this section.\n\nTo start the case study -\n\nTo display the first question in this case study, click the Next button. Use the buttons in the left pane to explore\n\nthe content of the case study before you answer the questions. Clicking these buttons displays information such\n\nas business requirements, existing environment and problem statements. If the case study has an\n\nAll Information tab, note that the information displayed is identical to the information displayed on the subsequent\n\ntabs. When you are ready to answer a question, click the Question button to return to the question.\n\nOverview -\n\nContoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board\n\nmeetings for which financial analysts manually prepare\n\nMicrosoft Excel reports, including balance sheets and profit and loss statements for each of the company's four\n\nbusiness units.\n\nExisting Environment -\n\nData and Sources -\n\nData for the reports comes from the sources shown in the following table.\n\nThe balance sheet data is unrelated to the profit and loss results other than they both relate to dates.\n\nBalance Sheet Data -\n\nThe balance sheet data is imported and includes the final monthly balances of each account in the format shown in\n\nthe following table.\n\nThe balance sheet data always includes a row for each account for each month.\n\nProduct Catalog Data -\n\nThe product catalog shows how products roll up to product categories, which roll up to the business units. The\n\nproduct list is provided in the format shown in the following table.\n\nRevenue data is provided at the date and product level. Expense data is provided at the date and department level.\n\nBusiness Issues -\n\nHistorically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is\n\nusually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an\n\nExcel formula. On occasion, there are conflicting results in the reports because the products and departments that\n\nroll up to each business unit are not defined consistently.\n\nRequirements -\n\nPlanned Changes -\n\nContoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants\n\nto reduce how long it takes to populate the reports to less than two days. The company wants to create common\n\nlogic for the business units, products, and departments. The logic will be used across all reports, including but not\n\nlimited to the quarterly reporting for the board.\n\nTechnical Requirements -\n\nContoso wants the reports and datasets refreshed with minimum manual effort.\n\nThe company wants to provide the board with a single package of reports that will contain custom navigation and\n\nlinks to supplementary information.\n\nMaintenance, including manually updating data and access, must be minimized as much as possible.\n\nSecurity Requirements -\n\nThe reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group\n\nwill be used to share information with the board.\n\nContoso identifies the following security requirements for analyst access:\n\nAnalysts must be able to access all balance sheet and product catalog data.\n\nAnalysts must be able to access only the profit and loss data of their respective business unit.\n\nAnalysts must be able to create new reports from the dataset that contains the profit and loss data, but the\n\nreports built by the analysts must NOT be included in the quarterly reports for the board.\n\nAnalysts must NOT be able to share the quarterly reports with anyone.\n\nAnalysts must NOT be able to make new reports by using the balance sheet data.\n\nReport Requirements -\n\nYou plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the\n\nlast day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the\n\nending balances for the quarter, as well as for the previous quarter.\n\nThe date table will contain the columns shown in the following table.\n\nThe definitions and attributes for the products, departments, and business units must be consistent across all the\n\nreports.\n\nThe board must be able to get the following information from the quarterly reports:\n\nRevenue trends over time\n\nThe ending balances of each account\n\nChanges in long-term liabilities from the previous quarter\n\nThe percent of total revenue contributed by each product category\n\nA comparison of quarterly revenue versus the same quarter from the previous year\n\nThe reports must be updated with the latest data by 5 AM each day. Question What is the minimum number of\n\nPower BI datasets needed to support the reports?",
    "choices": [
      "a single imported dataset",
      "two imported datasets",
      "two DirectQuery datasets",
      "a single DirectQuery dataset"
    ],
    "correct": [
      1
    ],
    "explanation": "Note:\n\nAnalysts must be able to create new reports from the dataset that contains the profit and loss data, but the\nreports built by the analysts must NOT be included in the quarterly reports for the board.\n\nAnalysts must NOT be able to make new reports by using the balance sheet data.\n\nTwo datasets are required.\n\nNeed DAX for: A comparison of quarterly revenue versus the same quarter from the previous year. Also see\nother questions in this Case study which uses DAX expressions.\n\nIncorrect:\n\nNot Direct Query: Direct Query Limited Transformations.\n\nYou are not able to use all of the normal Power Query transformation features. Particular DAX functions are\nnot available in this method as well. So if your data is poorly structured or needing lots of transformation,\nsometimes Direct Query is not a viable option.\n\nReference:\n\nhttps://www.tessellationtech.io/import-vs-direct-query-power-bi/",
    "source": "Final",
    "sourceNumber": 369,
    "legacy": true,
    "image": "/exhibit-assets/f1-369-368.webp"
  },
  {
    "id": "f2-001-369",
    "domain": "Prepare the data",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 1)\n\nYou need to create a visualization to meet the reporting requirements of the sales managers.\n\nHow should you create the visualization? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Scenario: The sales managers require a visual to analyze sales performance versus sales targets.\nBox 1: KPI\nA Key Performance Indicator (KPI) is a visual cue that communicates the amount of progress made toward a measurable goal.\nBox 2: Sales[sales_amount]\nBox 3: Date[month]\nTime > FiscalMonth. This value will represent the trend. Box 4: Targets[sales_target]",
    "source": "Final 2",
    "sourceNumber": 1,
    "legacy": false,
    "image": "/dump-assets/f2-001-369-question.webp",
    "answerImage": "/dump-assets/f2-001-369-answer.webp"
  },
  {
    "id": "f2-002-370",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "- (Topic 1)\n\nYou need to create a relationship between the Weekly_Returns table and the Date table to meet the reporting requirements of the regional managers. What should\n\nyou do?",
    "choices": [
      "In the Weekly.Returns table, create a new calculated column named date-id in a format of yyyymmdd and use the calculated column to create a relationship to the Date table.",
      "Add the Weekly_Returns data to the Sales table by using related DAX functions.",
      "Create a new table based on the Date table where date-id is unique, and then create a many-to-many relationship to Weekly_Return."
    ],
    "correct": [
      0
    ],
    "explanation": "Scenario: Region managers require a visual to analyze weekly sales and returns. To relate the two tables we need a common column.",
    "source": "Final 2",
    "sourceNumber": 2,
    "legacy": false
  },
  {
    "id": "f2-003-371",
    "domain": "Prepare the data",
    "type": "single",
    "prompt": "- (Topic 1)\n\nYou need to create a calculated column to display the month based on the reporting requirements. Which DAX expression should you use?",
    "choices": [
      "FORMAT('Date'[date], \"MMM YYYY\")",
      "FORMAT('Date' [date], \"M YY\")",
      "FORMAT('Date'[date_id], \"MMM\") & \"\" & FORMAT('Date'[year], \"#\")",
      "FORMAT('Date' [date_id], \"MMM YYYY\")"
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 3,
    "legacy": false
  },
  {
    "id": "f2-004-372",
    "domain": "Model the data",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 2)\n\nOnce the profit and loss dataset is created, which four actions should you perform in sequence to ensure that the business unit analysts see the appropriate profit\n\nand loss data? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
    "choices": [],
    "correct": [],
    "explanation": "https://docs.microsoft.com/en-us/power-bi/admin/service-admin-rls https://docs.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions",
    "source": "Final 2",
    "sourceNumber": 4,
    "legacy": false,
    "image": "/dump-assets/f2-004-372-question.webp",
    "answerImage": "/dump-assets/f2-004-372-answer.webp"
  },
  {
    "id": "f2-005-373",
    "domain": "Model the data",
    "type": "single",
    "prompt": "- (Topic 2)\n\nYou need to recommend a strategy to consistently define the business unit, department, and product category data and make the data usable across reports.\n\nWhat should you recommend?",
    "choices": [
      "Create a shared dataset for each standardized entity.",
      "Create dataflows for the standardized data and make the dataflows available for use in all imported datasets.",
      "For every report, create and use a single shared dataset that contains the standardized data.",
      "For the three entities, create exports of the data from the Power Bl model to Excel and store the data in Microsoft OneDrive for others to use as a source."
    ],
    "correct": [
      1
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 5,
    "legacy": false
  },
  {
    "id": "f2-006-374",
    "domain": "Model the data",
    "type": "single",
    "prompt": "- (Topic 2)\n\nWhich DAX expression should you use to get the ending balances in the balance sheet reports?",
    "choices": [
      "CALCULATE (SUM( BalanceSheet [BalanceAmount] ), DATESQTD( 'Date'[Date] ))",
      "CALCULATE (SUM( BalanceSheet [BalanceAmount] ), LASTDATE( 'Date'[Date] ))",
      "FIRSTNONBLANK ( 'Date' [Date]SUM( BalanceSheet[BalanceAmount] ))",
      "CALCULATE (MAX( BalanceSheet[BalanceAmount] ), LASTDATE( 'Date' [Date] ))"
    ],
    "correct": [
      0
    ],
    "explanation": "Scenario: At least one of the balance sheet reports in the quarterly reporting package must show the ending balances for the quarter, as well as for the previous\nquarter.\nDATESQTD returns a table that contains a column of the dates for the quarter to date, in the current context.\nReference:\nhttps://docs.microsoft.com/en-us/dax/datesqtd-function-dax",
    "source": "Final 2",
    "sourceNumber": 6,
    "legacy": false
  },
  {
    "id": "f2-007-375",
    "domain": "Model the data",
    "type": "multi",
    "prompt": "- (Topic 2)\n\nWhich two types of visualizations can be used in the balance sheet reports to meet the reporting goals? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "a line chart that shows balances by quarter filtered to account categories that are long- term liabilities.",
      "a clustered column chart that shows balances by date (x-axis) and account category (legend) withoutfilters.",
      "a clustered column chart that shows balances by quarter filtered to account categories that are long-term liabilities.",
      "a pie chart that shows balances by account category without filters.",
      "a ribbon chart that shows balances by quarter and accounts in the legend."
    ],
    "correct": [
      0,
      4
    ],
    "explanation": "https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a",
    "source": "Final 2",
    "sourceNumber": 7,
    "legacy": false
  },
  {
    "id": "f2-008-376",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 3)\n\nYou need to create the Top Customers report.\n\nWhich type of filter should you use, and at which level should you apply the filter? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Top N\nScenario: The Top Customers report will show the top 20 customers based on the highest sales amounts in a selected order month or quarter, product category,\nand sales region.\nOnce you drag to SKU to Visual level filter you should get Top N option Note: The two most common filter types: automatic and manual.\nThen there are more advanced filters.\nBox 2: Visual\nOnce you drag to SKU to Visual level filter you should get Top N option.",
    "source": "Final 2",
    "sourceNumber": 8,
    "legacy": false,
    "image": "/dump-assets/f2-008-376-question.webp",
    "answerImage": "/dump-assets/f2-008-376-answer.webp"
  },
  {
    "id": "f2-009-377",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 3)\n\nYou need to design the data model and the relationships for the Customer Details worksheet and the Orders table by using Power BI. The solution must meet the\n\nreport requirements.\n\nFor each of the following statement, select Yes if the statement is true, Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 9,
    "legacy": false,
    "image": "/dump-assets/f2-009-377-question.webp",
    "answerImage": "/dump-assets/f2-009-377-answer.webp"
  },
  {
    "id": "f2-010-378",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 3)\n\nYou need to create a solution to meet the notification requirements of the warehouse shipping department.\n\nWhat should you do? To answer, select the appropriate options in the answer area. NOTE: Each correct select is worth one point:",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 10,
    "legacy": false,
    "image": "/dump-assets/f2-010-378-question.webp",
    "answerImage": "/dump-assets/f2-010-378-answer.webp"
  },
  {
    "id": "f2-010-379",
    "domain": "Visualize and analyze the data",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 3)\n\nYou need to create a measure that will return the percentage of late orders.\n\nHow should you complete the DAX expression? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: CALCULATE\nCALCULATE evaluates an expression in a modified filter context.\nSyntax: CALCULATE(<expression>[, <filter1> [, <filter2> [, …]]]) Expression - The expression to be evaluated.\nfilter1, filter2,… (Optional) Boolean expressions or table expressions that defines filters, or filter modifier functions.\nBox 2: FILTER\nFILTER returns a table that represents a subset of another table or expression. Syntax: FILTER(<table>,<filter>)\nTable- The table to be filtered. The table can also be an expression that results in a table. Filter - A Boolean expression that is to be evaluated for each row of the\ntable. For example, [Amount] > 0 or [Region] = \"France\"\nBox 3: Orders[ShippedDate]> Orders[RequiredDate]\nNorthwind Traders defines late orders as those shipped after the required shipping date.",
    "source": "Final 2",
    "sourceNumber": 10,
    "legacy": false,
    "image": "/dump-assets/f2-010-379-question.webp",
    "answerImage": "/dump-assets/f2-010-379-answer.webp"
  },
  {
    "id": "f2-012-380",
    "domain": "Visualize and analyze the data",
    "type": "single",
    "prompt": "- (Topic 3)\n\nYou need to create the dataset. Which dataset mode should you use?",
    "choices": [
      "DirectQuery",
      "Import",
      "Live connection",
      "Composite"
    ],
    "correct": [
      3
    ],
    "explanation": "Composite Model means now you can have a model, that very large tables of that are coming from the DirectQuery connection, without the need for importing, and\nsmall tables to be imported to be accessible quickly.",
    "source": "Final 2",
    "sourceNumber": 12,
    "legacy": false
  },
  {
    "id": "f2-014-381",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the\n\nstated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou create a parameter named DataSourceExcel that holds the file name and location of a Microsoft Excel data source.\n\nYou need to update the query to reference the parameter instead of multiple hard-coded copies of the location within each query definition.\n\nSolution: You create a new query that references DataSourceExcel. Does this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "Instead modify the source step of the queries to use DataSourceExcel as the file path.\nNote: Parameterising a Data Source could be used in many different use cases. From connecting to different data sources defined in Query Parameters to load\ndifferent combinations of columns.\nReference:\nhttps://www.biinsight.com/power-bi-desktop-query-parameters-part-1/",
    "source": "Final 2",
    "sourceNumber": 14,
    "legacy": false
  },
  {
    "id": "f2-018-382",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the\n\nstated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have five reports and two dashboards in a workspace.\n\nYou need to grant all organizational users read access to one dashboard and three reports Solution: In Microsoft Azure Active Directory (Azure AD), part of\n\nMicrosoft Entra. you create\n\na group that contains all the users. You share each selected report and the one dashboard to the group.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 18,
    "legacy": false
  },
  {
    "id": "f2-019-383",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a Power Bl report\n\nYou have a table named Dalai that contains 10 million rows. Data is used in the following visuals:\n\n• A card that shows the number of records\n\n• A bar chart that snows total transaction amount by territory\n\n• A scatter plot that shows transaction amount and profit amount on the axes and points colored by territory\n\nYou need to modify the scatter plot to make it easier for users to identify meaningful patterns. The solution must not affect the accuracy of the other visuals-What\n\nshould you do?",
    "choices": [
      "Apply a row filter to the Dalai query in Power Query Editor.",
      "Add a trend line to the scatter plot",
      "Enable high-density sampling on the scatter plot",
      "Add a count field of the transaction amount to the size bucket of the scatter plot"
    ],
    "correct": [
      1
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 19,
    "legacy": false
  },
  {
    "id": "f2-020-384",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou need to create a visual as shown in the following exhibit.\n\nThe indicator color for Total Sales will be based on % Growth to Last Year. The solution must use the existing calculations only.\n\nHow should you configure the visual? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Background color\nTo format the Color column based on its field values, select Conditional formatting for the Color field, and then select Background color or Font color.\nIn the Background color or Font color dialog box, select Field value from the Format by drop-down field.\nBox 2: Field value\nWith conditional formatting for tables in Power BI Desktop, you can specify customized cell colors, including color gradients, based on field values.",
    "source": "Final 2",
    "sourceNumber": 20,
    "legacy": false,
    "image": "/dump-assets/f2-020-384-question.webp",
    "answerImage": "/dump-assets/f2-020-384-answer.webp"
  },
  {
    "id": "f2-021-385",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou are creating a Power Bl report by using Power Bi Desktop.\n\nYou need to include a visual that shows trends and other useful information automatically. The visual must update based on selections in other visuals.\n\nWhich type of visual should you use?",
    "choices": [
      "key influencers",
      "decomposition tree",
      "Q&A",
      "smart narrative"
    ],
    "correct": [
      3
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 21,
    "legacy": false
  },
  {
    "id": "f2-026-386",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou build a report about warehouse inventory data. The dataset has more than 10 million product records from 200 warehouses worldwide. You have a table\n\nnamed Products that contains the columns shown in the following table.\n\nWarehouse managers report that it is difficult to use the report because the report uses only the product name in tables and visuals. The product name is\n\ncontained within the ProductDescription column and is always the fourth value.\n\nYou need to modify the report to support the warehouse managers requirement to explore inventory levels at different levels of the product hierarchy. The solution\n\nmust minimize the model size.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate\n\nactions from the list of actions to the answer area and arrange them in the correct order.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 26,
    "legacy": false,
    "image": "/dump-assets/f2-026-386-question.webp",
    "answerImage": "/dump-assets/f2-026-386-answer.webp"
  },
  {
    "id": "f2-027-387",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have the Power Bl model shown in the following exhibit.\n\nThere are four departments in the Departments table.\n\nYou need to ensure that users can see the data of their respective department only. What should you do?",
    "choices": [
      "Create a row-level security (RLS) role for each department, and then define the membership of the role.",
      "Create a DepartmentID parameter to filter the Departments table.",
      "To the ConfidentialData table, add a calculated measure that uses the currentgroup DAX function.",
      "Create a slicer that filters Departments based on DepartmentID."
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 27,
    "legacy": false,
    "image": "/exhibit-assets/f2-027-387.webp"
  },
  {
    "id": "f2-030-388",
    "domain": "Manage and secure Power BI",
    "type": "multi",
    "prompt": "- (Topic 4)\n\nYou have a report that contains three pages. One of the pages contains a KPI visualization. You need to filter all the visualizations in the report except for the KPI\n\nvisualization. Which two actions should you perform? Each correct answer presents part of the solution. NOTE: Each correct selection is worth one point.",
    "choices": [
      "Add the same slicer to each page and configure Sync slicers.",
      "Edit the interactions of the KPI visualization.",
      "Configure a page-level filter.",
      "Edit the interactions of the slicer that is on the same page as the KPI visualization.",
      "Configure a report-level filter."
    ],
    "correct": [
      0,
      3
    ],
    "explanation": "Slicers are another way of filtering. They narrow the portion of the dataset that is shown in the other report visualizations.\nBy default, slicers on report pages affect all the other visualizations on that page, including each other. Use visual interactions to exclude some page visualizations\nfrom being affected by others.\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers",
    "source": "Final 2",
    "sourceNumber": 30,
    "legacy": false
  },
  {
    "id": "f2-034-389",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYour company has employees in 10 states.\n\nThe company recently decided to associate each state to one of the following three regions: East, West, and North.\n\nYou have a data model that contains employee information by state. The model does NOT\n\ninclude region information.\n\nYou have a report that shows the employees by state.\n\nYou need to view the employees by region as quickly as possible. What should you do?",
    "choices": [
      "Create a new aggregation that summarizes by employee.",
      "Create a new group on the state column and set the Group type to List.",
      "Create a new group on the state column and set the Group type to Bin.",
      "Create a new aggregation that summarizes by state."
    ],
    "correct": [
      1
    ],
    "explanation": "https://www.mssqltips.com/sqlservertip/4720/binning-and-grouping-data-with- power-bi/",
    "source": "Final 2",
    "sourceNumber": 34,
    "legacy": false
  },
  {
    "id": "f2-038-390",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have a power BI tenant that hosts the datasets shown in the following table.\n\nYou have the following requirements:\n\n• The export of reports that contain Personally Identifiable Information (Pll) must be prevented.\n\n• Data used for financial decisions must be reviewed and approved before use.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise select No. NOTE: Each correct selection is worth one point",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 38,
    "legacy": false,
    "image": "/dump-assets/f2-038-390-question.webp",
    "answerImage": "/dump-assets/f2-038-390-answer.webp"
  },
  {
    "id": "f2-041-391",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "FILL IN THE BLANK - (Topic 4)\n\nYou have the Power Bi dashboard shown in the Dashboard exhibit (Click the Dashboard tab.)\n\nYou need to ensure that when users view the dashboard on a mobile device, the dashboard appears as shown in the Mobile exhibit. (Click the Mobile tab.)\n\nWhat should you do? To answer, select the appropriate options m the answer area NOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Answer as selected",
    "source": "Final 2",
    "sourceNumber": 41,
    "legacy": false,
    "image": "/dump-assets/f2-041-391-question.webp",
    "answerImage": "/dump-assets/f2-041-391-answer.webp"
  },
  {
    "id": "f2-042-392",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou build a Power Bl report that displays 10T temperature data streaming from a refrigerator.\n\nYou publish the report to the Bl service.\n\nYou need to be notified when the temperature rises above four degrees Celsius. What should you do?",
    "choices": [
      "Pin a report page to a dashboard and set an alert on the page.",
      "Set an alert on a KPI visual in the report.",
      "Pin a card visual to a dashboard and set an alert on the tile.",
      "Pin a card visual to a dashboard and create a subscription."
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 42,
    "legacy": false
  },
  {
    "id": "f2-044-393",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a collection of reports for the HR department of your company.\n\nYou need to create a visualization for the HR department that shows historical employee counts and predicts trends during the next six months.\n\nWhich type of visualization should you use?",
    "choices": [
      "key influences",
      "ribbon chart",
      "line chart",
      "scatter chart"
    ],
    "correct": [
      2
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 44,
    "legacy": false
  },
  {
    "id": "f2-048-394",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou open powerbi.com as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "References: https://docs.microsoft.com/en-us/power-bi/service-data-classification",
    "source": "Final 2",
    "sourceNumber": 48,
    "legacy": false,
    "image": "/dump-assets/f2-048-394-question.webp",
    "answerImage": "/dump-assets/f2-048-394-answer.webp"
  },
  {
    "id": "f2-050-395",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou are creating an analytics report that will consume data from the tables shown in the following table.\n\nThere is a relationship between the tables.\n\nThere are no reporting requirements on employeejd and employee_photo. You need to optimize the data model\n\nWhat should you configure for employeejd and employee.photo? To answer, select the appropriate options in the answer area.",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Hide\nOptimize data by hiding fields and sorting visualization data\nBox 2: Delete\nThe fastest way to optimize your Power BI report is to limit the number of columns to only the ones you need in your data model. Go through your tables in Power\nQuery and determine what fields are being used. Delete these columns if they are not being used in any of your reports or calculations.",
    "source": "Final 2",
    "sourceNumber": 50,
    "legacy": false,
    "image": "/dump-assets/f2-050-395-question.webp",
    "answerImage": "/dump-assets/f2-050-395-answer.webp"
  },
  {
    "id": "f2-054-396",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a Power Bi model mat contains a table named Date. The Date table contains the fallowing columns:\n\n• Date\n\n• Fiscal year\n\n• Fiscal Quartet\n\n• Month Name\n\n• Calendar Year\n\n• Week Number\n\n• Month Number\n\n• Calendar Quarter\n\nYou need to create a calculated table based on the Date table. The calculated tab*e must contain only unique combinations of values for Calendar Year. Calendar\n\nQuarter and Calendar Month. Which DAX function should you include in the table deflation?",
    "choices": [
      "DATATABLE",
      "ADDCOLUMS",
      "SUMMARIZE",
      "CALCULATE"
    ],
    "correct": [
      2
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 54,
    "legacy": false
  },
  {
    "id": "f2-059-397",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou plan to create a report that will display sales data from the last year for multiple regions\n\nYou need to restrict access to individual rows of the data on a per region-basis by using roles.\n\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the\n\ncorrect order.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 59,
    "legacy": false,
    "image": "/dump-assets/f2-059-397-question.webp",
    "answerImage": "/dump-assets/f2-059-397-answer.webp"
  },
  {
    "id": "f2-061-398",
    "domain": "Manage and secure Power BI",
    "type": "multi",
    "prompt": "- (Topic 4)\n\nYou are creating a query to be used as a Country dimension in a star schema. A snapshot of the source data is shown in the following table.\n\nYou need to create the dimension. The dimension must contain a list of unique countries. Which two actions should you perform? Each correct answer presents\n\npart of the solution.",
    "choices": [
      "Remove duplicates from the Country column.",
      "Remove duplicates from the City column.",
      "|Remove duplicates from the table.",
      "Delete the City column.",
      "Delete the Country column."
    ],
    "correct": [
      0,
      3
    ],
    "explanation": "To create a dimension table for Country from your source data, you need to perform these two actions34:\n? Delete the City column. You don’t need this column for your Country dimension, as\nit is not a descriptive attribute of Country. You can create another dimension table for City if you want to use it in your analysis.\n? Remove duplicates from the Country column. You want to have a list of unique\ncountries in your dimension table, so you need to remove any duplicate values from this column.",
    "source": "Final 2",
    "sourceNumber": 61,
    "legacy": false,
    "image": "/exhibit-assets/f2-061-398.webp"
  },
  {
    "id": "f2-066-399",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "FILL IN THE BLANK - (Topic 4)\n\nYou have a Power B1 model that contains a table named Date. The table has the following columns.",
    "choices": [],
    "correct": [],
    "explanation": "Answer is below.",
    "source": "Final 2",
    "sourceNumber": 66,
    "legacy": false,
    "image": "/dump-assets/f2-066-399-question.webp",
    "answerImage": "/dump-assets/f2-066-399-answer.webp"
  },
  {
    "id": "f2-071-400",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a Power BI report that contains four pages. All the pages contain a slicer for a field named Country,\n\nYou need to ensure that when a user selects a county on page l, the selection is retained on page 2 and page 3. The solution must prevent page 4 from being\n\naffected by\n\nselections on the other pages, What should you do?",
    "choices": [
      "Remove the Country slicer from page 1, page 2, and page 3. Add the Country field to the report-level filters.",
      "Remove the Country slicer from page 1, page 2, and page 3. Add the Country field to the page-level filters.",
      "Sync the Country slicer on page 1, page 2, and page 3,",
      "Move the Country slicer from page 2 and page 3 to page 1."
    ],
    "correct": [
      1
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 71,
    "legacy": false
  },
  {
    "id": "f2-076-401",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have a table that contains a column named Phone. The following is a sample of the data in the Phone column.\n\nYou need to add a new column that contains the data in the format of nnn-nnn-nnnn. How should you complete the Query Editor formula? To answer, select the\n\nappropriate\n\noptions in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "References:\nhttps://docs.microsoft.com/en-us/powerquery-m/text-replace https://docs.microsoft.com/en-us/powerquery-m/text-end",
    "source": "Final 2",
    "sourceNumber": 76,
    "legacy": false,
    "image": "/dump-assets/f2-076-401-question.webp",
    "answerImage": "/dump-assets/f2-076-401-answer.webp"
  },
  {
    "id": "f2-081-402",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the\n\nstated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Power BI report that imports a date table and a sales table from an Azure SQL database data source. The sales table has the following date foreign\n\nkeys:\n\n• Due Date\n\n• Order Date\n\n• Delivery Date\n\nYou need to support the analysis of sales over time based on all three dates at the same time.\n\nSolution; You create measures that use the uSEREIATIOHSHIP DAX function to filter sales on the inactive relationships between the sales table and the date\n\ntable.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 81,
    "legacy": false
  },
  {
    "id": "f2-083-403",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have two CSV files named Products and Categories. The Products file contains the following columns:\n\n? ProductID\n\n? ProductName\n\n? SupplierID\n\n? CategoryID\n\nThe Categories file contains the following columns:\n\n? CategoryID\n\n? CategoryName\n\n? CategoryDescription\n\nFrom Power BI Desktop, you import the files into Power Query Editor.\n\nYou need to create a Power BI dataset that will contain a single table named Product. The Product will table includes the following columns:\n\n? ProductID\n\n? ProductName\n\n? SupplierID\n\n? CategoryID\n\n? CategoryName\n\n? CategoryDescription\n\nHow should you combine the queries, and what should you do on the Categories query? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 83,
    "legacy": true,
    "image": "/dump-assets/f2-083-403-question.webp",
    "answerImage": "/dump-assets/f2-083-403-answer.webp"
  },
  {
    "id": "f2-088-404",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a large dataset that contains more than 1 million rows. The table has a datetime column named\n\nDate.\n\nYou need to reduce the size of the data model. What should you do?",
    "choices": [
      "Round the hour of the Date column to startOfHour.",
      "Change the data type of the Date column to Text.",
      "Trim the Date column.",
      "Split the Date column into two columns, one that contains only the time and another that contains only the date."
    ],
    "correct": [
      3
    ],
    "explanation": "We have to separate date & time tables. Also, we don’t need to put the time into the date table, because the time is repeated every day.\nSplit your DateTime column into a separate date & time columns in fact table, so that you can join the date to the date table & the time to the time table. The time\nneed to be converted to the nearest round minute or second so that every time in your data corresponds to a row in your time table.\nReference:\nhttps://intellipaat.com/community/6461/how-to-include-time-in-date-hierarchy-in-power-bi",
    "source": "Final 2",
    "sourceNumber": 88,
    "legacy": false
  },
  {
    "id": "f2-090-405",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the\n\nstated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this scenario, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as the axis. Salary is present in the data as\n\nnumerical amount representing US dollars.\n\nYou need to create a reference line to show which employees are above the median\n\nsalary.\n\nSolution: You create an average line by using the Salary measure. Does this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "Instead create a percentile line by using the Salary measure and set the percentile to 50%. Note: The 50th percentile is also known as the median or middle value\nwhere 50 percent of\nobservations fall below.\nReference:\nhttps://dash-intel.com/powerbi/statistical_functions_percentile.php",
    "source": "Final 2",
    "sourceNumber": 90,
    "legacy": false
  },
  {
    "id": "f2-095-406",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "FILL IN THE BLANK - (Topic 4)\n\nYou need to create a relationship in the dataset for RLS.\n\nWhat should you do? To answer select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Answer as below",
    "source": "Final 2",
    "sourceNumber": 95,
    "legacy": false,
    "image": "/dump-assets/f2-095-406-question.webp",
    "answerImage": "/dump-assets/f2-095-406-answer.webp"
  },
  {
    "id": "f2-100-407",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou are building a dataset from a JSON file that contains an array of documents.\n\nYou need to import attributes as columns from all the documents in the JSON file. The solution must ensure that date attributes can be used as date hierarchies in\n\nMicrosoft Power BI reports.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the\n\ncorrect order.",
    "choices": [],
    "correct": [],
    "explanation": "1- Convert list to table 2- Expand Column\n3- Set Date type\nHere is an example: https://youtu.be/B4kzyxnhQfI\nThe definition of the function which expand columns: https://docs.microsoft.com/en-us/powerquery-m/table-expandrecordcolumn",
    "source": "Final 2",
    "sourceNumber": 100,
    "legacy": false,
    "image": "/dump-assets/f2-100-407-question.webp",
    "answerImage": "/dump-assets/f2-100-407-answer.webp"
  },
  {
    "id": "f2-102-408",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a BI dataset and a connected report.\n\nYou need to ensure that users can analyze data in Microsoft Excel by connecting directly to the dataset.\n\nYou grant the users the Build permission for dataset What Should do next?",
    "choices": [
      "Change default visual interaction for the report",
      "For the report change the Export data setting to Summarized data, data with current layout and underlying data",
      "For the report, change the Export data setting to None",
      "Certify the dataset used by the report."
    ],
    "correct": [
      1
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 102,
    "legacy": false
  },
  {
    "id": "f2-105-409",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is part of a series of questions that use the same scenario. For your convenience, the scenario is repeated in each question. Each question\n\npresents a different goal and answer choices, but the text of the scenario is the same in each question in this series.\n\nYou have a Microsoft SQL Server database that contains the following tables.\n\nThe following columns contain date information:\n\n- Date[Month] in the mmyyyy format\n\n- Date[Date_ID] in the ddmmyyyy format\n\n- Date[Date_name] in the mm/dd/yyyy format\n\n- Monthly_returns[Month_ID] in the mmyyyy format The Order table contains more than one million rows.\n\nThe Store table has a relationship to the Monthly_returns table on the Store_ID column. This is the only relationship between the tables.\n\nYou plan to use Power BI Desktop to create an analytics solution for the data.\n\nYou need to create a relationship between the Order table and the Store table on the\n\nStore_ID column.\n\nWhat should you do before you create the relationship?",
    "choices": [
      "In the Order table query, use the Table.TrasformRows function.",
      "In the Store table query, use the Table.TrasformRows function.",
      "In the Store table query, use the Table.TrasformColumnTypes function.",
      "In the Order table query, use the Table.TrasformColumnTypes function."
    ],
    "correct": [
      2
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 105,
    "legacy": false,
    "image": "/exhibit-assets/f2-105-409.webp"
  },
  {
    "id": "f2-106-410",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou need to create a Power Bl report. The first page or the report must contain the following two views:\n\n* Sales By Postal Code\n\n* Sales by Month\n\nBoth views must display a slicer to select a value for a field named Chain.\n\nThe Sales By Postal Code view must display a map visual as shown in the following exhibit.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 106,
    "legacy": false,
    "image": "/dump-assets/f2-106-410-question.webp",
    "answerImage": "/dump-assets/f2-106-410-answer.webp"
  },
  {
    "id": "f2-111-411",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have data in a Microsoft Excel worksheet as shown in the following table.\n\nYou need to use Power Query to clean and transform the dataset. The solution must meet the following requirements:\n\n• If the discount column returns an error, a discount of 0.05 must be used.\n\n• All the rows of data must be maintained.\n\n• Administrative effort must be minimized. What should you do in Power Query Editor?",
    "choices": [
      "Select Keep Errors",
      "Edit the query in the Query Errors group.",
      "Select Replace Errors",
      "Select Remove Errors."
    ],
    "correct": [
      2
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 111,
    "legacy": false,
    "image": "/exhibit-assets/f2-111-411.webp"
  },
  {
    "id": "f2-113-412",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYour company has training videos that are published to Microsoft Stream. You need to surface the videos directly in a Microsoft Power BI dashboard. Which type\n\nof tile should you add?",
    "choices": [
      "video",
      "custom streaming data",
      "text box",
      "web content"
    ],
    "correct": [
      3
    ],
    "explanation": "https://docs.microsoft.com/en-us/stream/portal-embed-video https://docs.microsoft.com/en-us/power-bi/create-reports/service-dashboard-add- widget#add-web-\ncontent",
    "source": "Final 2",
    "sourceNumber": 113,
    "legacy": false
  },
  {
    "id": "f2-118-413",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a Power BI report that uses a dataset based on an Azure Analysis Services live connection.\n\nYou need to ensure that users can use Q&A from the Power BI service for the dataset. What should you do?",
    "choices": [
      "From the Power BI service, add an enterprise gateway to the dataset.",
      "From Power BI Desktop, add synonyms and suggested questions.",
      "From Power BI Desktop, add a Q&A visual to the report.",
      "From the Power Bi service, select Turn on Q& A for this dataset."
    ],
    "correct": [
      3
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 118,
    "legacy": false
  },
  {
    "id": "f2-122-414",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a Microsoft Power Bl dashboard.\n\nYou need to ensure that consumers of the dashboard can give you feedback that will be visible to the other consumers of the dashboard.\n\nWhat should you use?",
    "choices": [
      "Feedback",
      "Subscribe",
      "Comments",
      "Mark as favorite"
    ],
    "correct": [
      2
    ],
    "explanation": "https://docs.microsoft.com/en-us/power-bi/consumer/end-user-comment",
    "source": "Final 2",
    "sourceNumber": 122,
    "legacy": false
  },
  {
    "id": "f2-123-415",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have multiple dashboards.\n\nYou need to ensure that when users browse the available dashboards from powerbi.com. they can see which dashboards contain Personally Identifiable\n\nInformation (Pll). The solution must minimize configuration effort and impact on the dashboard design.\n\nWhat should you use?",
    "choices": [
      "Active Directory groups",
      "tiles",
      "data classifications",
      "comments"
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 123,
    "legacy": false
  },
  {
    "id": "f2-128-416",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have an Azure SQL database that contains sales transactions. The database is updated frequently.\n\nYou need to generate reports from the data to detect fraudulent transactions. The data must be visible within five minutes of an update.\n\nHow should you configure the data connection?",
    "choices": [
      "Add a SQL statement.",
      "Set Data Connectivity mode to DirectQuery.",
      "Set the Command timeout in minutes setting.",
      "Set Data Connectivity mode to Import."
    ],
    "correct": [
      1
    ],
    "explanation": "With Power BI Desktop, when you connect to your data source, it's always possible to\nimport a copy of the data into the Power BI Desktop. For some data sources, an alternative approach is available: connect directly to the data source using\nDirectQuery.\nDirectQuery: No data is imported or copied into Power BI Desktop. For relational sources, the selected tables and columns appear in the Fields list. For multi-\ndimensional sources like SAP Business Warehouse, the dimensions and measures of the selected cube appear in the Fields list. As you create or interact with a\nvisualization, Power BI Desktop queries the underlying data source, so you’re always viewing current data.\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/desktop-use-directquery",
    "source": "Final 2",
    "sourceNumber": 128,
    "legacy": false
  },
  {
    "id": "f2-130-417",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have a folder of monthly transaction extracts.\n\nYou plan to create a report to analyze the transaction data.\n\nYou receive the following email message: \"Hi. I've put 24 files of monthly transaction data onto the shared drive. File Transactions201901.csv through\n\nTransactions201912.csv have the latest set of columns, but files Transactions201801.csv to Transactions201812.csv have an older layout without the extra fields\n\nneeded for analysis. Each file contains 10 to 50 transactions.\"\n\nYou get data from the folder and select Combine & Load. The Combine Files dialog box is shown in the exhibit. (Click the Exhibit tab.)\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Graphical user interface, text, application\nDescription automatically generated\nBox 1: Yes\nThe four columns used in the 2018 transactions are already displayed.\nBox 2: Yes\nThe columns used are based on the entire dataset. The additional columns in the 2019 files will be detected.\nBox 3: Yes\nNote: Under the hoods, Power BI will automatically detect which delimiter to use, and may even promote the first row as headers. You can manually change the\ndelimiter, or define how Power BI should handle data types. You can set it to automatically detect data types based on first 200 rows, or the entire dataset or you\ncan even opt out the detection of data types.",
    "source": "Final 2",
    "sourceNumber": 130,
    "legacy": false,
    "image": "/dump-assets/f2-130-417-question.webp",
    "answerImage": "/dump-assets/f2-130-417-answer.webp"
  },
  {
    "id": "f2-135-418",
    "domain": "Manage and secure Power BI",
    "type": "multi",
    "prompt": "- (Topic 4)\n\nYou are reviewing a query that produces 10,000 rows in the Power Query Editor. You need to identify whether a column contains only unique values.\n\nWhich two Data Preview options can you use? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "Column profile",
      "Column distribution",
      "Show whitespace",
      "Column quality",
      "Monospace"
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "B: Column distribution: This feature provides a set of visuals underneath the names of the columns that showcase the frequency and distribution of the values in\neach of the columns. The data in these visualizations is sorted in descending order from the value with the highest frequency.\nBy hovering over the distribution data in any of the columns, you get information about the overall data in the column (with distinct count and unique values).\nA: Column profile: This feature provides a more in-depth look at the data in a column [compared to column distribution]. Apart from the column distribution chart, it\ncontains a column statistics chart.\nReference:\nhttps://docs.microsoft.com/en-us/power-query/data-profiling-tools",
    "source": "Final 2",
    "sourceNumber": 135,
    "legacy": false
  },
  {
    "id": "f2-136-419",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou are creating a Power Bi model in Power BI Desktop\n\nYou need to create a calculated table named Numbers that will contain all the integers from\n\n-100 to 100. How should you complete the DAX calculation? To answer, select the appropriate options in the answer area. NOTE Each correct selection is worth\n\none point.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 136,
    "legacy": false,
    "image": "/dump-assets/f2-136-419-question.webp",
    "answerImage": "/dump-assets/f2-136-419-answer.webp"
  },
  {
    "id": "f2-137-420",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is a part of a series of questions that present the same scenario. For your convenience, the scenario is repeated in each question. Each\n\nquestion presents a different goal and answer choices, but the text of the scenario is exactly the same in each question in this series.\n\nStart of repeated scenario\n\nYou have a Microsoft SQL Server database that has the tables shown in the Database Diagram exhibit. (Click the Exhibit.)\n\nYou plan to develop a Power BI model as shown in the Power BI Model exhibit. (Click the Exhibit).\n\nYou plan to use Power BI to import data from 2013 to 2015. Product Subcategory [Subcategory] contains NULL values.\n\nEnd of repeated scenario.\n\nYou implement the Power BI model.\n\nYou need to add a new column to the Product Subcategory table that uses the following formula.\n\n=if [Subcategory] =null then “NA” else [Subcategory] Which command should you use in Query Editor?",
    "choices": [
      "Column From Examples",
      "Custom Column",
      "Invoke Custom Function",
      "Conditional Column"
    ],
    "correct": [
      3
    ],
    "explanation": "References: http://community.powerbi.com/t5/Desktop/if-then-else/td-p/117999",
    "source": "Final 2",
    "sourceNumber": 137,
    "legacy": false,
    "image": "/exhibit-assets/f2-137-420.webp"
  },
  {
    "id": "f2-141-421",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a report that contains a bar chart and a column chart. The bar chart shows customer count by\n\ncustomer segment. The column chart shows sales by month.\n\nYou need to ensure that when a segment is selected in the bar chart, you see which portion of the total sales for the month belongs to the customer segment.\n\nHow should the visual interactions be set on the column chart when the bar chart is selected?",
    "choices": [
      "no impact",
      "highlight",
      "filter"
    ],
    "correct": [
      1
    ],
    "explanation": "HIGHLIGHT as the question required us to \"you see which portion of the total sales for the month belongs to the customer segment\" -- in order to see WHICH\nportion, you need to still see the whole visual, highlight is most appropriate. If the requirement stated to ONLY SEE THE PORTION IT RELATES TO then filter\nwould be appropriate.",
    "source": "Final 2",
    "sourceNumber": 141,
    "legacy": false
  },
  {
    "id": "f2-143-422",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a Power Bl model that contains the following data.\n\nThe Date table relates to the Sales table by using the Date columns. The model contains the following DAX measure.\n\nTotal Sales = SUM(Sales[Sale])\n\nYou need to create another measure named Previous Quarter to display the sales one quarter before the selected period.\n\nWhich DAX calculation should you use?",
    "choices": [
      "CALCULATE < [Total Sales], OATEADD (Date[Date], -1, QUARTER))",
      "CALCULATE ([Total Sales], DATESQTD (Date[Date]))",
      "TOTALQTD ([Total Sales], Date[Date])",
      "CALCULATE < [Total Sales], PARALLELPERIOO (Date[Date], 1, QUARTER))"
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 143,
    "legacy": false,
    "image": "/exhibit-assets/f2-143-422.webp"
  },
  {
    "id": "f2-144-423",
    "domain": "Manage and secure Power BI",
    "type": "multi",
    "prompt": "- (Topic 4)\n\nYou have a Power Bl workspace named Inventory that contains a dataset a report and a dashboard.\n\nYou need to add an additional tile to the dashboard. The tile must show inventory by location. This information is NOT visualized in the report. The solution must\n\nminimize the impact on the report.\n\nWhich two actions should you perform? Each correct answer presents part of the solution. NOTE: Each correct selection is worth one point.",
    "choices": [
      "Use quick insights on the dashboard.",
      "Hide the report page.",
      "Ask a question by using Q&A.",
      "Add the visual to the report.",
      "Pin the visual to the dashboard."
    ],
    "correct": [
      2,
      4
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 144,
    "legacy": false
  },
  {
    "id": "f2-147-424",
    "domain": "Manage and secure Power BI",
    "type": "multi",
    "prompt": "- (Topic 4)\n\nFrom Power Query Editor, you attempt to execute a query and receive the following error message.\n\nDatasource.Error: could not find file.\n\nWhat are two possible causes of the error? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [
      "The file is locked",
      "An incorrect privacy level was used for the data source.",
      "The referenced file was moved to a new location",
      "You do not have permissions to the file."
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 147,
    "legacy": false
  },
  {
    "id": "f2-152-425",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have a Power BI report that contains the table visual shown in the following exhibit.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 152,
    "legacy": false,
    "image": "/dump-assets/f2-152-425-question.webp",
    "answerImage": "/dump-assets/f2-152-425-answer.webp"
  },
  {
    "id": "f2-157-426",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou create a data model in Power BI.\n\nReport developers and users provide feedback that the data model is too complex. The model contains the following tables.\n\nThe model has the following relationships:\n\n*There is a one-to-one relationship between Sales_Region and Region_Manager.\n\n*There are more records in Manager than in Region_Manager, but every record in Region_Manager has a corresponding record in Manager.\n\n*There are more records in Sales_Manager than in Sales_Region, but every record in Sales_Region has a corresponding record in Sales_Manager.\n\nYou need to denormalize the model into a single table. Only managers who are associated to a sales region must be included in the reports.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the\n\ncorrect order.\n\nNOTE: More than one order of answer choices is correct. You will receive credit for any of the correct orders you select.",
    "choices": [],
    "correct": [],
    "explanation": "* 1.Merge [Region_Manager] and [Manager] by using an inner join. 3.Merge [Sales_Region] and [Sales_Manager] by using an inner join. 6.Merge [Sales_Region]\nand [Region_Manager] by using an inner join.",
    "source": "Final 2",
    "sourceNumber": 157,
    "legacy": false,
    "image": "/dump-assets/f2-157-426-question.webp",
    "answerImage": "/dump-assets/f2-157-426-answer.webp"
  },
  {
    "id": "f2-161-427",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou are building a data model for a Power Bl report. You have data formatted as shown in the following table.\n\nYou need to create a clustered bar chart as shown in the following exhibit.\n\nWhat should you do?",
    "choices": [
      "From Power Query Editor, split the Machine-User column by using a delimiter.",
      "In a DAX function, create two calculated columns named Machine and User by using the substitute function.",
      "From Power Query Editor, create a column that contains the last three digits of the Machine-User column.",
      "in a DAX function, create two measures named Machine and User by using the substitute function."
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 161,
    "legacy": false,
    "image": "/exhibit-assets/f2-161-427.webp"
  },
  {
    "id": "f2-164-428",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a custom connector that returns ID, From, To, Subject, Body, and Has Attachments for every email sent during the past year. More than 10 million\n\nrecords are returned.\n\nYou build a report analyzing the internal networks of employees based on whom they send emails to.\n\nYou need to prevent report recipients from reading the analyzed emails. The solution must minimize the model size.\n\nWhat should you do?",
    "choices": [
      "Implement row-level security (RLS) so that the report recipients can only see results based on the emails they sent.",
      "Remove the Subject and Body columns during the import.",
      "From Model view, set the Subject and Body columns to Hidden."
    ],
    "correct": [
      1
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 164,
    "legacy": false
  },
  {
    "id": "f2-167-429",
    "domain": "Manage and secure Power BI",
    "type": "multi",
    "prompt": "- (Topic 4)\n\nYou have a Power Bl query named Sates that imports the columns shown in the following table.\n\nUsees only use the dale part of the Sales.Date field. Only rows with a Status of Finished are used in analysis.\n\nYou need to reduce the load times of the query without affecting the analysis.\n\nWhich two actions achieve this goal? Each correct answer presents a complete solution. NOTL Each correct selection is worth one pant.",
    "choices": [
      "Remove the rows in which sales [status] has a value of Canceled.",
      "Change the data type of sale [Delivery_Time] to Integer",
      "Removes (Canceled Date).",
      "Split Sales [Sale_Date] into separate date and time columns.",
      "Remove sales [Sales_Date]."
    ],
    "correct": [
      0,
      3
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 167,
    "legacy": false,
    "image": "/exhibit-assets/f2-167-429.webp"
  },
  {
    "id": "f2-168-430",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a CSV file that contains user complaints. The file contains a column named Logged logged contains the date and time each complaint occurred. The\n\ndata in Logged is m the following format: 2018-12-31 at 08:59.\n\nYou need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.\n\nWhat should you do?",
    "choices": [
      "Create a column by example that starts with 2018-12-31.",
      "Create a column by example that starts with 2018-12-31 and set the data type of the new column to Date",
      "Apply the parse function from the Date transformations options to the Logged column.",
      "Add a conditional column that outputs 2018 if the Logged column starts with 2018 and set the data type of the new column to Whole Number."
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 168,
    "legacy": false
  },
  {
    "id": "f2-169-431",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the\n\nstated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Power BI report that imports a date table and a sales table from an Azure SQL database data source. The sales table has the following date foreign\n\nkeys:\n\n? Due Date\n\n? Order Date\n\n? Delivery Date\n\nYou need to support the analysis of sales over time based on all the date foreign keys.\n\nSolution: From Power Query Editor, you rename the date query as Due Date. You reference the Due Date query twice to make the queries for Order Date and\n\nDelivery Date.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "Creating two additional tables in Power Query can be a possible solution: Remove any inactive relationships.\nConsider renaming the role-playing dimension-type table to better describe its role. In the example, the Airport table is related to the ArrivalAirport column of the\nFlight table, so it's renamed as Arrival Airport.\nCreate a copy of the role-playing table, providing it with a name that reflects its role. If it's an Import table, we recommend defining a calculated table. If it's a\nDirectQuery table, you can duplicate the Power Query query.\nIn the example, the Departure Airport table was created by using the following calculated table definition.",
    "source": "Final 2",
    "sourceNumber": 169,
    "legacy": false
  },
  {
    "id": "f2-173-432",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou are creating a visual to show the ranking of product categories by sales revenue.\n\nYour company's security policy states that you cannot send data outside of your Microsoft Power Bl tenant\n\nWhich approach provides the widest variety of visuals while adhering to the security policy?",
    "choices": [
      "Use default visuals or custom visuals uploaded from a .pbiviz file.",
      "Use only default visuals.",
      "Use default or any custom visuals from the marketplace.",
      "Use default or certified custom visuals."
    ],
    "correct": [
      2
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 173,
    "legacy": false
  },
  {
    "id": "f2-174-433",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYour company has affiliates who help the company acquire customers.\n\nYou build a report for the affiliate managers at the company to assist them in understanding affiliate performance.\n\nThe managers request a visual showing the total sales value of the latest 50 transactions for each affiliate. You have a data model that contains the following\n\ntables.\n\nYou need to develop a measure to support the visual.\n\nHow should you complete the DAX expression? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: CALCULATE\nStart with CALCULATE and use a SUMX.\nCALCULATE evaluates an expression in a modified filter context.\nBox 2: SUM\nBox 3: TOPN\nTOPN returns the top N rows of the specified table.\nBox 4: [TransactionDate]\nTOPN Syntax: TOPN(<n_value>, <table>, <orderBy_expression>, [<order>[,\n<orderBy_expression>, [<order>]]…])\nThe orderBy_expression: Any DAX expression where the result value is used to sort the table and it is evaluated for each row of table.",
    "source": "Final 2",
    "sourceNumber": 174,
    "legacy": false,
    "image": "/dump-assets/f2-174-433-question.webp",
    "answerImage": "/dump-assets/f2-174-433-answer.webp"
  },
  {
    "id": "f2-177-434",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou have the Power Bl data model shown in the following exhibit.\n\nYou create two row-level security (RlS) roles named Manager and CFO. You plan to publish the dataset to the Power Bl service.\n\nYou need to create DAX expressions for the RLS filters. The solution must meet the following requirements:\n\n• Each manager must see only the data in the Sales and Human Resources tables for their own country.\n\n• The CFO must be prevented from seeing the data in the Human Resources table.\n\n• The CFO must see the sales data of all countries.\n\nHow should you complete the DAX expressions to meet the requirements? To answer, drag the appropriate expressions to the correct targets. Each expression\n\nmay be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.\n\nThe Country table contains the following data.\n\nYou plan to publish the dataset to the Power Bl service.\n\nYou need to create DAX expressions for the RLS filters. The solution must meet the following requirements:\n\n• Each manager must see only the data in the Sales and Human Resources tables for their own country.\n\n• The CFO must be prevented from seeing the data in the Human Resources table.\n\n• The CFO must see the sales data of all countries.\n\nHow should you complete the DAX expressions to meet the requirements? To answer, drag the appropriate expressions to the correct targets. Each expression\n\nmay be used once, more than once, or not at all. You may need to drag the split bar between panes or\n\nscroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 177,
    "legacy": false,
    "image": "/dump-assets/f2-177-434-question.webp",
    "answerImage": "/dump-assets/f2-177-434-answer.webp"
  },
  {
    "id": "f2-180-435",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a Power BI dashboard that monitors the quality of manufacturing processes. The dashboard contains the following elements:\n\n? A line chart that shows the number of defective products manufactured by day.\n\n? A KPI visual that shows the current daily percentage of defective products manufactured.\n\nYou need to be notified when the daily percentage of defective products manufactured exceeds 3%.\n\nWhat should you create?",
    "choices": [
      "a Q&A visual",
      "a subscription",
      "a smart narrative visual",
      "an alert"
    ],
    "correct": [
      3
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 180,
    "legacy": false
  },
  {
    "id": "f2-184-436",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the\n\nstated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nFrom Power Query Editor, you profile the data shown in the following exhibit.\n\nThe IOT ID columns are unique to each row in query.\n\nYou need to analyze 10T events by the hour and day of the year. The solution must improve dataset performance.\n\nSolution: You change the IOT DateTime column to the Date data type. Does this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 184,
    "legacy": false,
    "image": "/exhibit-assets/f2-184-436.webp"
  },
  {
    "id": "f2-187-437",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the\n\nstated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a\n\nresult, these questions will not appear in the review screen.\n\nYou are modeling data by using Microsoft Power BI. Part of the data model is a large Microsoft SQL Server table named Order that has more than 100 million\n\nrecords.\n\nDuring the development process, you need to import a sample of the data from the Order table.\n\nSolution: From Power Query Editor, you import the table and then add a filter step to the query.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 187,
    "legacy": false
  },
  {
    "id": "f2-191-438",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have a dataset that has the permissions shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 191,
    "legacy": false,
    "image": "/dump-assets/f2-191-438-question.webp",
    "answerImage": "/dump-assets/f2-191-438-answer.webp"
  },
  {
    "id": "f2-193-439",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "FILL IN THE BLANK - (Topic 4)\n\nYou have a Power 31 data model that contains a table named Stores. The table has the following columns:\n\n* Store Name\n\n* Open Date\n\n* Status\n\n* State\n\n* City\n\nYou need to create a calculated column named Active Store Name that meets the following requirements:",
    "choices": [],
    "correct": [],
    "explanation": "Answer is as below",
    "source": "Final 2",
    "sourceNumber": 193,
    "legacy": false,
    "image": "/dump-assets/f2-193-439-question.webp",
    "answerImage": "/dump-assets/f2-193-439-answer.webp"
  },
  {
    "id": "f2-194-440",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou are developing a report page. Some users will navigate the report by using a keyboard, and some users will consume the report by using a screen reader.\n\nYou need to ensure that the users can consume the content on a report page in a logical order. What should you configure in Microsoft Power Bl Desktop?",
    "choices": [
      "the bookmark order",
      "the layer order",
      "the tab order",
      "the X position"
    ],
    "correct": [
      2
    ],
    "explanation": "If you find yourself unable to navigate to an object or visual while using a keyboard, it may be because the report author has decided to hide that object from the\ntab order. Report authors commonly hide decorative objects from the tab order. If you find that you cannot tab through a report in a logical manner, you should\ncontact the report author. Report authors can set the tab order for objects and visuals.\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/desktop-accessibility-consuming- tools",
    "source": "Final 2",
    "sourceNumber": 194,
    "legacy": false
  },
  {
    "id": "f2-197-441",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have the Power BI data model shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 197,
    "legacy": false,
    "image": "/dump-assets/f2-197-441-question.webp",
    "answerImage": "/dump-assets/f2-197-441-answer.webp"
  },
  {
    "id": "f2-199-442",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "FILL IN THE BLANK - (Topic 4)\n\nYou have two Power Bl workspaces named WorkspaceA and Workspaces. WorkspaceA contains two datasets named Sales and HR.\n\nYou need to provide a user named User1 with access to the workspaces. The solution must meet the following requirements:\n\n• Create reports that use the HR dataset.\n\n• Publish the reports to WorkspaceB.\n\n• Prevent the ability to modify the HR dataset.\n\n• Prevent the ability to add users to WorkspaceB.",
    "choices": [],
    "correct": [],
    "explanation": "Answer is as below.",
    "source": "Final 2",
    "sourceNumber": 199,
    "legacy": false,
    "image": "/dump-assets/f2-199-442-question.webp",
    "answerImage": "/dump-assets/f2-199-442-answer.webp"
  },
  {
    "id": "f2-201-443",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou are preparing a financial report in Power BI.\n\nYou connect to the data stored in a Microsoft Excel spreadsheet by using Power Query Editor as shown in the following exhibit.\n\nYou need to prepare the data to support the following:\n\n? Visualizations that include all measures in the data over time\n\n? Year-over-year calculations for all the measures\n\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the\n\ncorrect order.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 201,
    "legacy": false,
    "image": "/dump-assets/f2-201-443-question.webp",
    "answerImage": "/dump-assets/f2-201-443-answer.webp"
  },
  {
    "id": "f2-202-444",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou are profiling data by using Power Query Editor.\n\nThe AddressLine2 column in a table named Address is shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 202,
    "legacy": false,
    "image": "/dump-assets/f2-202-444-question.webp",
    "answerImage": "/dump-assets/f2-202-444-answer.webp"
  },
  {
    "id": "f2-204-445",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou are configuring a Microsoft Power Bl data model to enable users to ask natural language questions by using Q&A. You have a table named Customer that has\n\nthe following measure.\n\nCustomer Count = DISTINCTCOUNT(Customer[CustomerID]) Users frequently refer to customers as subscribers.\n\nYou need to ensure that the users can get a useful result for \"subscriber count\" by using Q&A. The solution must minimize the size of the model.\n\nWhat should you do?",
    "choices": [
      "Add a description of \"subscriber count\" to the Customer Count measure.",
      "Set Summarize By to None for the CustomerlD column.",
      "Add a description of \"Subscriber\" to the Customer table.",
      "Add a synonym of \"subscriber\" to the Customer table."
    ],
    "correct": [
      1
    ],
    "explanation": "You can add synonyms to tables and columns.\nNote: This step applies specifically to Q&A (and not to Power BI reports in general). Users often have a variety of terms they use to refer to the same thing, such\nas total sales, net sales, total net sales. You can add these synonyms to tables and columns in the Power BI model.\nThis step applies specifically to Q&A (and not to Power BI reports in general). Users often have a variety of terms they use to refer to the same thing, such as total\nsales, net sales, total net sales. You can add these synonyms to tables and columns in the Power BI model.\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/natural-language/q-and-a-best-practices",
    "source": "Final 2",
    "sourceNumber": 204,
    "legacy": false
  },
  {
    "id": "f2-205-446",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou attempt to connect Purer 81 Desktop to a Cassandra database.\n\nFrom the Get Data connector list you discover that there is no specific connector for the Cassandra database,\n\nYou need to select an alternate data connector that will connect to the database. Which of connector should you choose?",
    "choices": [
      "Microsoft SQL Server database",
      "ODBC",
      "OData",
      "OLE DB"
    ],
    "correct": [
      1
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 205,
    "legacy": false
  },
  {
    "id": "f2-209-447",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have a Power BI report.\n\nYou need to create a calculated table to return the 100 highest spending customers.\n\nHow should you complete the DAX expression? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: TOPN\nTOPN returns the top N rows of the specified table.\nBox 2: SUMMARIZE\nSUMMARIZE returns a summary table for the requested totals over a set of groups.\nBox 3: DESC\nSort in descending order.\nIt is last in the TOPN command. TOPN syntax:\nTOPN(<n_value>, <table>, <orderBy_expression>, [<order>[, <orderBy_expression>, [<order>]]…])",
    "source": "Final 2",
    "sourceNumber": 209,
    "legacy": false,
    "image": "/dump-assets/f2-209-447-question.webp",
    "answerImage": "/dump-assets/f2-209-447-answer.webp"
  },
  {
    "id": "f2-214-448",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou are modeling data in table named SalesDetail by using Microsoft Power Bl.\n\nYou need to provide end users with access to the summary statistics about the SalesDetail data. The users require insights on the completeness of the data and\n\nthe value\n\ndistributions.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the\n\ncorrect order.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 214,
    "legacy": false,
    "image": "/dump-assets/f2-214-448-question.webp",
    "answerImage": "/dump-assets/f2-214-448-answer.webp"
  },
  {
    "id": "f2-217-449",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nIn Power BI Desktop, you are building a sales report that contains two tables. Both tables\n\nhave row-level security (RLS) configured.\n\nYou need to create a relationship between the tables. The solution must ensure that bidirectional cross-filtering honors the RLS settings.\n\nWhat should you do?",
    "choices": [
      "Create an active relationship between the tables and select Assume referential integrity.",
      "Create an inactive relationship between the tables and select Assume referential integrity.",
      "Create an inactive relationship between the tables and select Apply security filter in both directions.",
      "Create an active relationship between the tables and select Apply security filter in both directions."
    ],
    "correct": [
      3
    ],
    "explanation": "By default, row-level security filtering uses single-directional filters, whether the relationships are set to single direction or bi-directional. You can manually enable\nbi- directional cross-filtering with row-level security by selecting the relationship and checking the Apply security filter in both directions checkbox. Select this option\nwhen you've also implemented dynamic row-level security at the server level, where row-level security is based on username or login ID.\n\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/admin/service-admin-rls",
    "source": "Final 2",
    "sourceNumber": 217,
    "legacy": false
  },
  {
    "id": "f2-218-450",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou need to provide a user with the ability to add members to a workspace. The solution must use the\n\nprinciple of least privilege.\n\nWhich role should you assign to the user?",
    "choices": [
      "Viewer",
      "Contributor",
      "Member",
      "Admin"
    ],
    "correct": [
      2
    ],
    "explanation": "A Member can add members or others with lower permissions. Note:",
    "source": "Final 2",
    "sourceNumber": 218,
    "legacy": false
  },
  {
    "id": "f2-222-451",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have the visual shown in the Original exhibit. {Click the Original tab.)\n\nYou need to configure the visual as shown in the Modified exhibit. (Click the Modified tab.)\n\nWhat should you add to the visual?",
    "choices": [
      "a measure",
      "a trendline",
      "a forecast",
      "an Average line"
    ],
    "correct": [
      2
    ],
    "explanation": "Explore forecast results by adjusting the desired confidence interval or by adjusting outlier data to see how they affect results.\n\nTimeline Description automatically generated with low confidence\nReference:\nhttps://powerbi.microsoft.com/fr-fr/blog/introducing-new-forecasting-capabilities-in-power-view-for-office-365/",
    "source": "Final 2",
    "sourceNumber": 222,
    "legacy": false,
    "image": "/exhibit-assets/f2-222-451.webp"
  },
  {
    "id": "f2-227-452",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nFor the sales department at your company, you publish a Power Bl report that imports data from a Microsoft Excel We located in a Microsoft SharePoint folder The\n\ndata model contains several measures You need to create a Power Bl report from the existing data. The solution must minimize development effort. Which type ol\n\ndata source should you use?",
    "choices": [
      "a SharePoint folder",
      "Power Bl dataflows",
      "an Excel workbook",
      "Power Bl dataset"
    ],
    "correct": [
      0
    ],
    "explanation": "case states there is already a report published and the datamodel contains measures. therefore and to be able to use the measures in the datamodel you should\nconnect to the existing dataset (which was created when you plublished the report) instead of starting from scratch with the files in the SharePoint folder.",
    "source": "Final 2",
    "sourceNumber": 227,
    "legacy": false
  },
  {
    "id": "f2-228-453",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYour company plans to use Power BI for 20 users in the sales department. The users will perform the following tasks:\n\n? Access a published Power BI app\n\n? Modify reports in an app workspace\n\n? Share dashboards created in My Workspace\n\nYou need to identify which Power BI licenses are required for the tasks. The solution must use the Power BI (free) licenses, whenever possible.\n\nWhich license should you identify for each task? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "https://docs.microsoft.com/en-us/power-bi/service-create-distribute-apps\nhttps://docs.microsoft.com/en-us/power-bi/service-collaborate-power-bi-workspace",
    "source": "Final 2",
    "sourceNumber": 228,
    "legacy": true,
    "image": "/dump-assets/f2-228-453-question.webp",
    "answerImage": "/dump-assets/f2-228-453-answer.webp"
  },
  {
    "id": "f2-232-454",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou have a Microsoft Excel spreadsheet that contains the data shown in the following table.\n\nYou plan to build a data model for a Power Bl report.\n\nYou need to prepare the data so that it is available to the model in the format shown in the following table.\n\nWhich three actions should you perform in sequence in Power Query Editor? To answer, move the appropriate actions from the list of actions to the answer area\n\nand arrange them in the correct order.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 232,
    "legacy": false,
    "image": "/dump-assets/f2-232-454-question.webp",
    "answerImage": "/dump-assets/f2-232-454-answer.webp"
  },
  {
    "id": "f2-236-455",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "FILL IN THE BLANK - (Topic 4)\n\nYou need to create a measure that will return the percentage of late orders.\n\nHow should you complete the DAX expression? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Answer as below",
    "source": "Final 2",
    "sourceNumber": 236,
    "legacy": false,
    "image": "/dump-assets/f2-236-455-question.webp",
    "answerImage": "/dump-assets/f2-236-455-answer.webp"
  },
  {
    "id": "f2-239-456",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is a part of a series of questions that present the same scenario. For your convenience, the scenario is repeated in each question. Each\n\nquestion presents a different goal and answer choices, but the text of the scenario is exactly the same in each question in this series.\n\nStart of repeated scenario\n\nYou have a Microsoft SQL Server database that has the tables shown in the Database Diagram exhibit. (Click the Exhibit.)\n\nYou plan to develop a Power BI model as shown in the Power BI Model exhibit. (Click the Exhibit).\n\nYou plan to use Power BI to import data from 2013 to 2015. Product Subcategory [Subcategory] contains NULL values. End of repeated scenario.\n\nYou implement the Power BI model.\n\nYou need to add a measure to rank total sales by product. The results must appear as shown in the following table.\n\nWhich DAX formula should you use?",
    "choices": [
      "Product Ranking= RANKX (Product, [SalesAmount], , DESC, Skip)",
      "Product Ranking= RANKX (ALL, (‘Product’), [SalesAmount], , DESC, Dense)",
      "Product Ranking= RANKX (ALL, (‘Product’), [SalesAmount], , DESC, Skip)",
      "Product Ranking= RANKX (ALL (‘Product’), [SalesAmount], , Asc, Dense"
    ],
    "correct": [
      1
    ],
    "explanation": "References: https://msdn.microsoft.com/en-us/library/gg492185.aspx",
    "source": "Final 2",
    "sourceNumber": 239,
    "legacy": false,
    "image": "/exhibit-assets/f2-239-456.webp"
  },
  {
    "id": "f2-242-457",
    "domain": "Manage and secure Power BI",
    "type": "multi",
    "prompt": "- (Topic 4)\n\nIn Power BI Desktop, you are creating a report that will contain three pages. You need to create a custom tooltip page and prepare the page for use.\n\nWhich three actions should you perform? Each correct answer presents part of the\n\nsolution.",
    "choices": [
      "Configure filters on the target visual.",
      "For the target page, set Allow use as tooltip to On.",
      "Add and configure visuals on the tooltip page.",
      "For the tooltip page, set Allow use as tooltip to On.",
      "For the tooltip page, configure filters."
    ],
    "correct": [
      1,
      2,
      3
    ],
    "explanation": "You can create a custom tooltip page that shows more details about the selected category, such as this:\nTo create a custom tooltip page and prepare it for use, you need to perform these three actions34:\n? Add and configure visuals on the tooltip page. You can add any visuals, images, or\nother items that you want to show on the tooltip page. You can also format them as you like.\n? For the tooltip page, set Allow use as tooltip to On. This will enable Power BI to\nrecognize this page as a tooltip page. You can also change the Page size to Tooltip to fit your content better.\n? For the target visual, set Tooltip type to Report page. This will allow you to select\nwhich report page you want to use as a custom tooltip for your visual. You can also filter your tooltip by fields from your target visual.",
    "source": "Final 2",
    "sourceNumber": 242,
    "legacy": false
  },
  {
    "id": "f2-244-458",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou need to create a Power Bl theme that will be used in multiple reports. The theme will include corporate branding for font size, color, and bar chart formatting.\n\nWhat should you do?",
    "choices": [
      "Create a theme as a PBIVIZ file and import the theme into Power Bl Desktop.",
      "Create a theme as a JSON file and import the theme into Power Bl Desktop.",
      "From Power Bl Desktop, use a built-in report theme.",
      "From Power Bl Desktop, customize the current theme."
    ],
    "correct": [
      3
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 244,
    "legacy": false
  },
  {
    "id": "f2-247-459",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a report in Power Bl named report1 that is based on a shared dataset.\n\nYou need to minimize the risk of data exfiltration for report1. The solution must prevent other reports from being affected.\n\nWhat should you do?",
    "choices": [
      "Clear Allow recipients to share your dashboard and Allow users to build new content using the underlying datasets for the dataset.",
      "Select the Allow end users to export both summarized and underlying data from the service or Report Server Export data option for the report.",
      "Select the Don't allow end users to export any data from the service or Report Server Export data option for the report.",
      "Apply row-level security (RLS) to the shared dataset."
    ],
    "correct": [
      2
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 247,
    "legacy": false
  },
  {
    "id": "f2-252-460",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have a column named UnitslnStock as shown in the following exhibit\n\nUnitsInStock has 75 non-null values, of which 51 are unique.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct\n\nselection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 252,
    "legacy": false,
    "image": "/dump-assets/f2-252-460-question.webp",
    "answerImage": "/dump-assets/f2-252-460-answer.webp"
  },
  {
    "id": "f2-256-461",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have a dataset that contains revenue data from the past year.\n\nYou need to use anomaly detection in Power Bl to show anomalies in the dataset.\n\nWhat should you configure? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 256,
    "legacy": false,
    "image": "/dump-assets/f2-256-461-question.webp",
    "answerImage": "/dump-assets/f2-256-461-answer.webp"
  },
  {
    "id": "f2-260-462",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the\n\nstated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this scenario, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have several reports and dashboards in a workspace.\n\nYou need to grant all organizational users read access to a dashboard and several reports. Solution: You publish an app to the entire organization.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "https://docs.microsoft.com/es-es/power-bi/collaborate-share/service-create- distribute-apps",
    "source": "Final 2",
    "sourceNumber": 260,
    "legacy": false
  },
  {
    "id": "f2-264-463",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the\n\nstated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Microsoft Excel workbook that is saved to Microsoft SharePoint Online. The workbook contains several Power View sheets.\n\nYou need to recreate the Power View sheets as reports in the Power Bl service. Solution: From the Power Bl service, get the data from SharePoint Online, and\n\nthen click\n\nConnect\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "explanation": "We need to click \"Import\", not \"Connect\".\nReferences:\nhttps://docs.microsoft.com/en-us/power-bi/service-excel-workbook-files",
    "source": "Final 2",
    "sourceNumber": 264,
    "legacy": false
  },
  {
    "id": "f2-266-464",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou create a Power Bl dataset that contains the table shown in the following exhibit.\n\nYou need to make the table available as an organizational data type In Microsoft Excel.\n\nHow should you configure the properties of the table? To answer select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 266,
    "legacy": false,
    "image": "/dump-assets/f2-266-464-question.webp",
    "answerImage": "/dump-assets/f2-266-464-answer.webp"
  },
  {
    "id": "f2-271-465",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a PBiX file that imports several tables from an Azure SQL database. The data will be migrated to another Azure SQL database.\n\nYou need to change the connections in the PBIX file. The solution must minimize administrative effort.\n\nWhat should you do?",
    "choices": [
      "From Power Query Editor, modify the source of each query.",
      "Create a PBiT file, open the file, and change the data sources when prompted",
      "From Power Query Editor, create new queries.",
      "Modify the Data source settings."
    ],
    "correct": [
      3
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 271,
    "legacy": false
  },
  {
    "id": "f2-275-466",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the\n\nstated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen,\n\nYou create a parameter named DataSourceExcel that holds the file name and location of a Microsoft Excel data source.\n\nYou need to update the query to reference the parameter instead of multiple hard-coded copies of the location within each query definition.\n\nSolution: In the Power Query M code, you replace references to the Excel file with DataSourceExcel.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "Instead modify the source step of the queries to use DataSourceExcel as the file path.\nNote: Parameterising a Data Source could be used in many different use cases. From connecting to different data sources defined in Query Parameters to load\ndifferent combinations of columns.\nReference:\nhttps://www.biinsight.com/power-bi-desktop-query-parameters-part-1/",
    "source": "Final 2",
    "sourceNumber": 275,
    "legacy": false
  },
  {
    "id": "f2-277-467",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nFrom Power 61 Desktop, you publish a new dataset and report lo a Power Bl workspace. The dataset has a row-level security (RLS) role named HR. You need to\n\nensure that the HR team members have RLS applied when they view reports based on the dataset. What should you do?",
    "choices": [
      "From Power Bl Desktop, change the Row-Level Security settings.",
      "From Power Bl Desktop, import a table that contains the HR team members",
      "From powerbi.com.add users to the HR role for the dataset.",
      "From powerbi.com, share the dataset to the HR team members."
    ],
    "correct": [
      2
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 277,
    "legacy": false
  },
  {
    "id": "f2-281-468",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou have a folder that contains 100 CSV files.\n\nYou need to make the file metadata available as a single dataset by using Power Bi The\n\nsolution must NOT store the data of the CSV files.\n\nWhich three actions should you perform in sequence. To answer, mow the appropriate actions from the list of actions to the answer area and arrange them m the\n\ncorrect order.\n\nNOTE; More than one order of answer choices is correct. You will receive credit for any of the correct orders you select.",
    "choices": [],
    "correct": [],
    "explanation": "From Power BI Desktop, select Get Data, and then select Folder. From Power Query Editor, remove the Content column.\nFrom Power Query Editor, expand the Attributes column.",
    "source": "Final 2",
    "sourceNumber": 281,
    "legacy": false,
    "image": "/dump-assets/f2-281-468-question.webp",
    "answerImage": "/dump-assets/f2-281-468-answer.webp"
  },
  {
    "id": "f2-284-469",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou are creating a Power BI report to analyze consumer purchasing patterns from a table named Transactions. The Transactions table contains a numeric field\n\nnamed Spend. You need to include a visual that identifies which fields have the greatest impact on Spend. Which type of visual should you use?",
    "choices": [
      "decomposition tree",
      "Q&A",
      "smart narrative",
      "key influences"
    ],
    "correct": [
      3
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 284,
    "legacy": false
  },
  {
    "id": "f2-286-470",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a Power BI report. The report contains visualizations that have interactions. You need to identify which visualizations take the longest to complete. What\n\nshould you use?",
    "choices": [
      "SQL Server Profiler",
      "Performance Analyzer in Power BI Desktop",
      "Query Diagnostics in Power BI",
      "Microsoft Edge DevTools"
    ],
    "correct": [
      1
    ],
    "explanation": "Use Power BI Desktop Performance Analyzer to optimize reports.\nIn Power BI Desktop you can find out how each of your report elements, such as visuals and DAX formulas, are performing. Using the Performance Analyzer, you\ncan see and record logs that measure how each of your report elements performs when users interact with them, and which aspects of their performance are most\n(or least) resource intensive.\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/create-reports/desktop-performance-analyzer",
    "source": "Final 2",
    "sourceNumber": 286,
    "legacy": false
  },
  {
    "id": "f2-287-471",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have a Power Bl report named Orders that supports the following analysis:\n\n• Total sales over time\n\n• The count of orders over time\n\n• New and repeat customer counts\n\nThe data model size is nearing the limit for a dataset in shared capacity. The model view for the dataset is shown in the following exhibit.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 287,
    "legacy": false,
    "image": "/dump-assets/f2-287-471-question.webp",
    "answerImage": "/dump-assets/f2-287-471-answer.webp"
  },
  {
    "id": "f2-291-472",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a data model that contains many complex DAX expressions. The expressions contain frequent references to the RELATED and RELATEDTABLE\n\nfunctions.\n\nYou need to recommend a solution to minimize the use of the RELATED and RELATEDTABLE functions.\n\nWhat should you recommend?",
    "choices": [
      "Merge tables by using Power Query.",
      "Hide unused columns in the model.",
      "Split the model into multiple models.",
      "Transpose."
    ],
    "correct": [
      0
    ],
    "explanation": "Combining data means connecting to two or more data sources, shaping them as needed, then consolidating them into a useful query.\nWhen you have one or more columns that you’d like to add to another query, you merge the queries.\nNote: The RELATEDTABLE function is a shortcut for CALCULATETABLE function with no logical expression.\nCALCULATETABLE evaluates a table expression in a modified filter context and returns A\ntable of values.\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/connect-data/desktop-shape-and-combine-data",
    "source": "Final 2",
    "sourceNumber": 291,
    "legacy": false
  },
  {
    "id": "f2-296-473",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a Power Bl report hosted on powerbi.com that displays expenses by department for department managers.\n\nThe report contains a line chart that shows expenses by month.\n\nYou need to enable users to choose between viewing the report as a line chart or a column chart. The solution must minimize development and maintenance\n\neffort.\n\nWhat should you do?",
    "choices": [
      "Add a column chart, a bookmark, and a button for users to choose a visual.",
      "Create a mobile report that contains a column chart.",
      "Create a separate report page for users to view the column chart.",
      "Enable report readers to personalize visuals."
    ],
    "correct": [
      2
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 296,
    "legacy": false
  },
  {
    "id": "f2-300-474",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the\n\nstated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nFrom Power Query Editor, you profile the data shown in the following exhibit.\n\nThe IoT GUID and IoT ID columns are unique to each row in query.\n\nYou need to analyze IoT events by the hour and day of the year. The solution must improve dataset performance.\n\nSolution: You remove the loT GUID column and retain the loT ID column. Does this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 300,
    "legacy": false,
    "image": "/exhibit-assets/f2-300-474.webp"
  },
  {
    "id": "f2-303-475",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nThe data model must support the following analysis:\n\n? Total sales by product by month in which the order was placed\n\n? Quantities sold by product by day on which the order was placed\n\n? Number Of sales transactions by quarter in Which the order was placed\n\nFor each Of the following statements, select Yes if the statement is true. Otherwise, select NO.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 303,
    "legacy": false,
    "image": "/dump-assets/f2-303-475-question.webp",
    "answerImage": "/dump-assets/f2-303-475-answer.webp"
  },
  {
    "id": "f2-307-476",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou manage a Power BI model has a table named Sales and product.\n\nYou need to ensure that a sales team can view only data that has a CountryRegionName value of United States and a ProductCategory value of Clothing.\n\nWhat should you do from Power BI Desktop?",
    "choices": [
      "From Power BI Desktop, create a new role that has the following filter.[countryRegionName]= “United States” && [ProductCategory]= “Clothing”",
      "Add the following filters in Query Editor.CountryRegionName is United StatesProductCategory is Clothing",
      "From Power BI Desktop, create a new role that has the following filters.[CountryRegionName]= “United States”",
      "Add the following filters to a report.CountryRegionName is United SatesProductCategory is Clothing"
    ],
    "correct": [
      3
    ],
    "explanation": "References: https://docs.microsoft.com/en-us/power-bi/power-bi-how-to-report-filter",
    "source": "Final 2",
    "sourceNumber": 307,
    "legacy": false
  },
  {
    "id": "f2-310-477",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a Power BI report that contains one page. The page contains two line charts and one bar chart.\n\nYou need to ensure that users can perform the following tasks for all three visuals:\n\n? Switch the measures used in the visuals.\n\n? Change the visualization type.\n\n? Add a legend.\n\nThe solution must minimize development effort. What should you do?",
    "choices": [
      "Enable personalization for each Visual.",
      "Create a bookmark for each acceptable combination of visualization type, measure, and legend in the bar chart",
      "Edit the interactions between the three visuals.",
      "Enable personalization for the report"
    ],
    "correct": [
      2
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 310,
    "legacy": false
  },
  {
    "id": "f2-315-478",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a dashboard that contains tiles pinned from a single report as shown in the Original Dashboard exhibit. (Click the Original Dashboard tab.)\n\nYou need to modify the dashboard to appear as shown in the Modified Dashboard exhibit. (Click the Modified Dashboard tab.)\n\nWhat should you do?",
    "choices": [
      "Edit the details of each tile.",
      "Change the report theme.",
      "Change the dashboard theme.",
      "Create a custom CSS file."
    ],
    "correct": [
      2
    ],
    "explanation": "https://docs.microsoft.com/en-us/power-bi/create-reports/service-dashboard-themes#how-dashboard-themes-work",
    "source": "Final 2",
    "sourceNumber": 315,
    "legacy": false,
    "image": "/exhibit-assets/f2-315-478.webp"
  },
  {
    "id": "f2-318-479",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou have a Power B1 data model that contains two tables named Products and Sales. A one-to-many relationship exists between the tables.\n\nYou have a report that contains a report-level filter for Products.\n\nYou need to create a measure that will return the percent of total sales for each product. The measure must respect the report-level filter when calculating the total.\n\nHow should you complete the DAX measure? To answer drag the appropriate DAX functions to the correct targets- Each function may be used once, more than\n\nonce, or not at all the spirt bar between panes or scroll to view content\n\nNOTE: Each correct selection is worth one point",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 318,
    "legacy": false,
    "image": "/dump-assets/f2-318-479-question.webp",
    "answerImage": "/dump-assets/f2-318-479-answer.webp"
  },
  {
    "id": "f2-323-480",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou have a Power Bl report that contains three pages. The pages are used to analyze sales across various countries.\n\nYou add a sheer named Country to each page of the report.\n\nYou need to configure the report to meet the following requirements:\n\n• When a user selects a country on the first page, the report must filter the other pages.\n\n• The second and third pages must display only the filtered results.\n\nWhich task should you perform for each requirement? To answer, drag the appropriate task to the correct requirement. Each task may be used once, more than\n\nonce, or not at all. You may need to drag the split bar between panes or scroll to view content.Ther\n\nNOTE Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 323,
    "legacy": false,
    "image": "/dump-assets/f2-323-480-question.webp",
    "answerImage": "/dump-assets/f2-323-480-answer.webp"
  },
  {
    "id": "f2-327-481",
    "domain": "Manage and secure Power BI",
    "type": "multi",
    "prompt": "- (Topic 4)\n\nYou have a prospective customer list that contains 1,500 rows of data. The list contains the following fields:\n\n? First name\n\n? Last name\n\n? Email address\n\n? State/Region\n\n? Phone number\n\nYou import the list into Power Query Editor.\n\nYou need to ensure that the list contains records for each State/Region to which you want to target a marketing campaign.\n\nWhich two actions should you perform? Each correct answer presents part of the solution. NOTE: Each correct selection is worth one point.",
    "choices": [
      "Open the Advanced Editor.",
      "Select Column quality.",
      "Enable Column profiling based on entire dataset.",
      "Select Column distribution.",
      "Select Column profile."
    ],
    "correct": [
      2,
      4
    ],
    "explanation": "In Power query, the load preview by default is 1000 row. By default, the column quality also only looks at the first 1000 row. You can verify this by the status bar at\nthe bottom of the Power query window. To change the profiling so it analyses the entire column of data, select the profiling status in the status bar. Then select\nColumn profiling based on the entire data set.\nhttps://theexcelclub.com/data-profiling-views-in-power-query-excel-and-power-bi/",
    "source": "Final 2",
    "sourceNumber": 327,
    "legacy": false
  },
  {
    "id": "f2-331-482",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou plan to use Power BI to create a quarterly profit report that meets the following requirements:\n\n• Emphasizes the percentage of total profits contributed by each product category in dollars and as a percentage\n\n• Compares profit margins across sales regions\n\nWhich type of visual should you use for each requirement? To answer, drag the appropriate visuals to the correct requirements. Each visual may be used once,\n\nmore than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 331,
    "legacy": false,
    "image": "/dump-assets/f2-331-482-question.webp",
    "answerImage": "/dump-assets/f2-331-482-answer.webp"
  },
  {
    "id": "f2-336-483",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "FILL IN THE BLANK - (Topic 4)\n\nYou are creating a line chart in a Power Bl report as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Answer as selected",
    "source": "Final 2",
    "sourceNumber": 336,
    "legacy": false,
    "image": "/dump-assets/f2-336-483-question.webp",
    "answerImage": "/dump-assets/f2-336-483-answer.webp"
  },
  {
    "id": "f2-337-484",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have a report page that contains the visuals shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct\n\nselection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: cross-filter\nBy default, selecting a data point in one visual on a report page will cross-filter or cross- highlight the other visuals on the page.\nBox 2: cross-highlight Example:\nBy default, selecting a data point in one visual on a report page will cross-filter or cross-\nhighlight the other visuals on the page.\n\n* 1. Let's see what happens when we select Moderation.\n\n* 2. Cross-filtering removes data that doesn't apply. Selecting Moderation in the doughnut chart cross-filters the line chart. The line chart now only displays data\npoints for the Moderation segment.\n* 3. Cross-highlighting retains all the original data points but dims the portion that does not apply to your selection. Selecting Moderation in the doughnut chart\ncross-highlights the column chart. The column chart dims all the data that applies to the Convenience segment and highlights all the data that applies to the\nModeration segment.",
    "source": "Final 2",
    "sourceNumber": 337,
    "legacy": false,
    "image": "/dump-assets/f2-337-484-question.webp",
    "answerImage": "/dump-assets/f2-337-484-answer.webp"
  },
  {
    "id": "f2-342-485",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have sales data in a star schema that contains four tables named Sales, Customer, Date, and Product.\n\nThe Sales table contains purchase and ship dates.\n\nMost often, you will use the purchase date to analyze the data, but you will analyze the data by both dates independently and together.\n\nYou need to design an imported dataset to support the analysis. The solution must minimize the model size and the number of queries against the data source.\n\nWhich data modeling design should you use?",
    "choices": [
      "Use the Auto Date/Time functionality in Microsoft Power BI and do NOT import the Datetable.",
      "Duplicate the Date query in Power Query and use active relationships between both Date tables.",
      "On the Date table, use a reference query in Power Query and create active relationships between Sales and both Date tables in the modeling view.",
      "Create an active relationship between Sales and Date for the purchase date and an inactive relationship for the ship date."
    ],
    "correct": [
      3
    ],
    "explanation": "Only one relationship can be active.\nNote: If you query two or more tables at the same time, when the data is loaded, Power BI Desktop attempts to find and create relationships for you. The\nrelationship options Cardinality, Cross filter direction, and Make this relationship active are automatically set.\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage- relationships",
    "source": "Final 2",
    "sourceNumber": 342,
    "legacy": false
  },
  {
    "id": "f2-345-486",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nWhat is the minimum number of Power BI datasets needed to support the reports?",
    "choices": [
      "a single imported dataset",
      "two imported datasets",
      "two DirectQuery datasets",
      "a single DirectQuery dataset"
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 345,
    "legacy": true
  },
  {
    "id": "f2-346-487",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou open a query in Power Query Editor.\n\nYou need to identify the percentage of empty values in each column as quickly as possible. Which Data Preview option should you select?",
    "choices": [
      "Show whitespace",
      "Column profile",
      "Column distribution",
      "Column quality"
    ],
    "correct": [
      3
    ],
    "explanation": "Column quality: In this section, we can easily see valid, Error and Empty percentage of data values associated with the Selected table.\nNote: In Power Query Editor, Under View tab in Data Preview Section we can see the following data profiling functionalities:\n? Column quality\n? Column distribution\n\n? Column profile\nReference:\nhttps://community.powerbi.com/t5/Community-Blog/Data-Profiling-in-Power-BI-Power-BI-Update-April-2019/ba-p/674555",
    "source": "Final 2",
    "sourceNumber": 346,
    "legacy": false
  },
  {
    "id": "f2-349-488",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have a report in Power BI Desktop as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNote: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 349,
    "legacy": false,
    "image": "/dump-assets/f2-349-488-question.webp",
    "answerImage": "/dump-assets/f2-349-488-answer.webp"
  },
  {
    "id": "f2-353-489",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have the data lineage shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: CONTOSO BIKES report Box 2: three datasets\nImages, tweets and the Contoso datasets.",
    "source": "Final 2",
    "sourceNumber": 353,
    "legacy": false,
    "image": "/dump-assets/f2-353-489-question.webp",
    "answerImage": "/dump-assets/f2-353-489-answer.webp"
  },
  {
    "id": "f2-355-490",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a Power B1 report that contains the visuals shown in the following table.\n\nYou need to modify the location of each visual. What should you modify for each visual?",
    "choices": [
      "the layer order",
      "the padding",
      "the position",
      "the tab order"
    ],
    "correct": [
      2
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 355,
    "legacy": false,
    "image": "/exhibit-assets/f2-355-490.webp"
  },
  {
    "id": "f2-358-491",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou create a dataset sourced from dozens of flat files in Azure Blob storage. The dataset uses incremental refresh.\n\nFrom powerbi.com, you deploy the dataset and several related reports to Microsoft Power BI Premium\n\ncapacity.\n\nYou discover that the dataset refresh fails after the refresh runs out of resources. What is a possible cause of the issue?",
    "choices": [
      "Query folding is not occurring.",
      "You selected Only refresh complete periods.",
      "The data type of the column used to partition the data changed.",
      "A filter is missing on the report."
    ],
    "correct": [
      0
    ],
    "explanation": "The Power BI service partitions data based on date range. This is what enables only\ncertain partitions to be refreshed incrementally. To make this work, the partition filter conditions are pushed down to the source system by including them in the\nqueries. Using Power Query terminology, this is called “query folding”. It is not recommended that incremental refresh is used when the required query folding\ncannot take place.\nReference:\nhttps://powerbi.microsoft.com/en-us/blog/incremental-refresh-query-folding/",
    "source": "Final 2",
    "sourceNumber": 358,
    "legacy": false
  },
  {
    "id": "f2-360-492",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nRemove unused columns from tables in the data model. This will reduce the size of your PBIX file and make your data model more efficient. You can use Power\n\nQuery Editor to remove any columns that are not used in your report or calculations.\n\nYou need to shape the query to display the following three columns:\n\n* Month\n\n* Sales\n\n* Year\n\n‘What should you select in Power Query Editor?",
    "choices": [
      "Pivot column",
      "Merge columns",
      "Unpivot columns.",
      "Transpose"
    ],
    "correct": [
      2
    ],
    "explanation": "This will convert your column headers (Jan-20, Feb-20,…) into row values under a new column called Attribute. You can then rename this column as Month and\nchange its data type to Date. You will also have a new column called Value that contains the sales amounts for each month. You can rename this column as Sales\nand change its data type to Decimal Number.",
    "source": "Final 2",
    "sourceNumber": 360,
    "legacy": false
  },
  {
    "id": "f2-365-493",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the date and time each complaint occurred. The\n\ndata in Logged is in the following format: 2018-12-31 at 08:59.\n\nYou need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.\n\nWhat should you do?",
    "choices": [
      "Apply a transformation to extract the last 11 characters of the Logged column and set the data type of the new column to Date.",
      "Change the data type of the Logged column to Date.",
      "Split the Logged column by using at as the delimiter.",
      "Apply a transformation to extract the first 11 characters of the Logged column."
    ],
    "correct": [
      2
    ],
    "explanation": "Simply create a custom table in Power Query, enter the date shown in the question into a column called Date, and then Split it by a delimiter. No need for spaces\non either side of \"at\" Power BI takes care of the rest:\n= Table.SplitColumn(#\"Changed Type\", \"Date\", Splitter.SplitTextByDelimiter(\"at\", QuoteStyle.Csv), {\"Date.1\", \"Date.2\"})\nIt will even automatically change the type to Date:\n= Table.TransformColumnTypes(#\"Split Column by Delimiter\",{{\"Date.1\", type date},\n{\"Date.2\", type time}})",
    "source": "Final 2",
    "sourceNumber": 365,
    "legacy": false
  },
  {
    "id": "f2-366-494",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nEach employee has one manager as shown in the ParentEmployeelD column, All reporting paths lead to the CEO at the top of the organizational hierarchy.\n\nYou need to create a calculated column that returns the count of levels from each employee to the CEO.\n\nWhich DAX expression should you use?",
    "choices": [
      "Option A",
      "Option B",
      "option C",
      "Option D"
    ],
    "correct": [
      1
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 366,
    "legacy": false
  },
  {
    "id": "f2-368-495",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou have a Power Bl workspace that contains a single-page report named Sales.\n\nYou need to add all the visuals from Sales to a dashboard. The solution must ensure that additional visuals added to the page are added automatically to the\n\ndashboard.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the\n\ncorrect order.",
    "choices": [],
    "correct": [],
    "explanation": "Open powerbi.com Select sales report\nPin the page",
    "source": "Final 2",
    "sourceNumber": 368,
    "legacy": false,
    "image": "/dump-assets/f2-368-495-question.webp",
    "answerImage": "/dump-assets/f2-368-495-answer.webp"
  },
  {
    "id": "f2-370-496",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nIn the Power BI service, you create an app workplace that contains several dashboards.\n\nYou need to provide a user named user1@contoso.com with the ability to edit and publish dashboards.\n\nWhat should you do?",
    "choices": [
      "Modify the members of the app workspace.",
      "Configure security for the dataset used by the app.",
      "Share the dashboard, and then modify the Access settings of the dashboard.",
      "From the app workspace, click Update app, and then configure the Access settings."
    ],
    "correct": [
      2
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 370,
    "legacy": true
  },
  {
    "id": "f2-375-497",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a collection of reports for the HR department of your company. The datasets use row-level security (RLS). The company has multiple sales regions that\n\neach has an HR manager. You need to ensure that the HR managers can interact with the data from their region only. The HR managers must be prevented from\n\nchanging the layout of the reports. How should you provision access to the reports for the HR managers?",
    "choices": [
      "Create a new workspace, copy the datasets and reports, and add the HR managers as members of the workspace.",
      "Publish the reports to a different workspace other than the one hosting the datasets.",
      "Publish the reports in an app and grant the HR managers access permission.",
      "Add the HR managers as members of the existing workspace that hosts the reports and the datasets."
    ],
    "correct": [
      2
    ],
    "explanation": "Note: Row-level security (RLS) with Power BI can be used to restrict data access for given users. Filters restrict data access at the row level, and you can define\nfilters within roles. In the Power BI service, members of a workspace have access to datasets in the workspace. RLS doesn't restrict this data access.\nReference:\nhttps://docs.microsoft.com/en-us/power-bi/admin/service-admin-rls",
    "source": "Final 2",
    "sourceNumber": 375,
    "legacy": false
  },
  {
    "id": "f2-378-498",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou are building a financial report by using Power BI.\n\nYou have a table named financials that contains a column named Date and a column named Sales.\n\nYou need to create a measure that calculates the relative change in sales as compared to the previous quarter.\n\nHow should you complete the measure? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: CALCULATE\nBox 2: DATEADD\nBox 3: DIVIDE\nExample: NET_SALES QoQ% = IF(\nISFILTERED('Calendar'[Date]),\nERROR(\"Time intelligence quick measures can only be grouped or filtered by the Power BI-provided date hierarchy or primary date column.\"),\nVAR PREV_QUARTER = CALCULATE(\nSUM('research ra_qtr_template'[NET_SALES]), DATEADD('Calendar'[Date].[Date], -1, QUARTER)\n) RETURN DIVIDE(\nSUM('research ra_qtr_template'[NET_SALES]) - PREV_QUARTER,\nPREV_QUARTER\n)\n)",
    "source": "Final 2",
    "sourceNumber": 378,
    "legacy": false,
    "image": "/dump-assets/f2-378-498-question.webp",
    "answerImage": "/dump-assets/f2-378-498-answer.webp"
  },
  {
    "id": "f2-381-499",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have the dataset shown in the following exhibit.\n\nYou need to ensure that the visual shows only the 10 cities that have the highest sales profit.\n\nWhat should you do?",
    "choices": [
      "Add a Top N filter to the visual.",
      "Configure the Sales Profit measure to use the RANKX function.",
      "Add a calculated column to the table that uses the TOPN functio",
      "In the visual, replace Sales Profit with the calculated column.",
      "Add a calculated column to the table that returns the city name if the city is in the top 10, otherwise thecalculated column will return \"Not in Top 10\". In the visual, replace Sales Profit with the calculated column."
    ],
    "correct": [
      0
    ],
    "explanation": "Power BI Top N Filters are useful to display the top performing records, and Bottom N filters are helpful to display the least performing records. For example, we\ncan display top or bottom 10 products by orders or sales.\nNote:\n? Select the Column you want to display the Top Sales Profit\n? Then change the Filter Type of that Column to Top N\n? Fill in Top / Bottom number field\n? And lastly drag to the By Value filed your Sales Profit\nReference:\nhttps://www.tutorialgateway.org/power-bi-top-10-filters/",
    "source": "Final 2",
    "sourceNumber": 381,
    "legacy": false,
    "image": "/exhibit-assets/f2-381-499.webp"
  },
  {
    "id": "f2-385-500",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nNote: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the\n\nstated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this scenario, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as the axis. Salary is present in the data as\n\nnumerical amount representing US dollars.\n\nYou need to create a reference line to show which employees are above the median salary.\n\nSolution: You create a percentile line by using the Salary measure and set the percentile to 50%.\n\nDoes this meet the goal?",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "explanation": "The 50th percentile is also known as the median or middle value where 50 percent of observations fall below.\nReference:\nhttps://dash-intel.com/powerbi/statistical_functions_percentile.php",
    "source": "Final 2",
    "sourceNumber": 385,
    "legacy": false
  },
  {
    "id": "f2-389-501",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "HOTSPOT - (Topic 4)\n\nYou have an API that returns more than 100 columns. The following is a sample of column names.\n\n? client_notified_timestamp\n\n? client_notified_source\n\n? client_notified_sourceid\n\n? client_notified_value\n\n? client_responded_timestamp\n\n? client_responded_source\n\n? client_responded_sourceid\n\n? client_responded_value\n\nYou plan to include only a subset of the returned columns.\n\nYou need to remove any columns that have a suffix of sourceid.\n\nHow should you complete the Power Query M code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "Box 1: Table.RemoveColumns\nWhen you do “Remove Columns” Power Query uses the Table.RemoveColumns function\nBox 2: List.Select Get a list of columns.\nBox 3: Text.EndsWith",
    "source": "Final 2",
    "sourceNumber": 389,
    "legacy": false,
    "image": "/dump-assets/f2-389-501-question.webp",
    "answerImage": "/dump-assets/f2-389-501-answer.webp"
  },
  {
    "id": "f2-391-502",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou create the following step by using Power Query Editor.\n\n=\n\nTable.ReplaceValue(SalesLT_Address,\"1318\",\"1319\",Replacer.ReplaceText,{\"AddressLine 1\"})\n\nA row has a value of 21318 Lasalle Street in the AddressLine1 column. What will the value be when the step is applied?",
    "choices": [
      "1318",
      "1319",
      "21318 Lasalle Street",
      "21319 Lasalle Street"
    ],
    "correct": [
      3
    ],
    "explanation": "Example:\nReplace the text \"ur\" with the text \"or\" in the table.\n\nReference:\nhttps://docs.microsoft.com/en-us/powerquery-m/table-replacevalue",
    "source": "Final 2",
    "sourceNumber": 391,
    "legacy": false,
    "image": "/exhibit-assets/f2-391-502.webp"
  },
  {
    "id": "f2-392-503",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a Power BI app named App1. The privacy for the App1 workspace is set to Private.\n\nA user named User1 reports that App1 does not appear in the My organization AppSource. App1 appears in the My organization AppSource for your account.\n\nYou need to ensure that User sees App1 from the My organization AppSource. What should you do?",
    "choices": [
      "From the app workspace, click Update app, configure the Content settings, and then click Update app.",
      "From the app workspace settings, add a member.",
      "From the app workspace, click Update app, configure the Access setting, and then click Update app.",
      "From the app workspace, share the dashboard."
    ],
    "correct": [
      2
    ],
    "explanation": "References: https://docs.microsoft.com/en-us/power-bi/service-organizational-content-pack-introduction#what-is-appsource",
    "source": "Final 2",
    "sourceNumber": 392,
    "legacy": true
  },
  {
    "id": "f2-396-504",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou have a Power Bl table named Customer that contains a field named Email Address. You discover that multiple records contain the same email address.\n\nYou need to create a calculated column to identify which records have duplicate email addresses.\n\nHow should you complete the OAX expression for the calculated column? To answer, drag the appropriate values to the correct targets. Each value may be used\n\nonce, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content\n\nNOTE: Each correct selection is worth one point.",
    "choices": [],
    "correct": [],
    "explanation": "You are to count the number of rows having same email address.\n* 1. Declare a variable and call it any name you prefer\n* 2. Calculate the row count on the table\n* 3. Apply filter to ALL of the values in the table under the column name email address and equate it to the variable.\nYou may need to read up filter functions for a proper understanding of how it works.",
    "source": "Final 2",
    "sourceNumber": 396,
    "legacy": false,
    "image": "/dump-assets/f2-396-504-question.webp",
    "answerImage": "/dump-assets/f2-396-504-answer.webp"
  },
  {
    "id": "f2-398-505",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a Power Bl workspace named Workspace1 that contains a dataset named DS1 and a report named RPT1.\n\nA user wants to create a report by using the data In DS1 and publish the report to another workspace.\n\nYou need to provide the user with the appropriate access. The solution must minimize the number of access permissions granted to the user.\n\nWhat should you do?",
    "choices": [
      "Share RPT1 with the user.",
      "Add the user as a Viewer of Workspace1.",
      "Add the user as a member of Workspace1.",
      "Grant the Build permission for DS1 to the user."
    ],
    "correct": [
      3
    ],
    "explanation": "Microsoft says: To copy a report to another workspace, and to create a report in another workspace based on a dataset in the current workspace, you need Build\npermission for the dataset. For datasets in the original workspace, if you have at least the Contributor role, you automatically have Build permission through your\nworkspace role. https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces",
    "source": "Final 2",
    "sourceNumber": 398,
    "legacy": false
  },
  {
    "id": "f2-403-506",
    "domain": "Manage and secure Power BI",
    "type": "manual",
    "prompt": "DRAG DROP - (Topic 4)\n\nYou have the Power BI data model shown in the following exhibit.",
    "choices": [],
    "correct": [],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 403,
    "legacy": false,
    "image": "/dump-assets/f2-403-506-question.webp",
    "answerImage": "/dump-assets/f2-403-506-answer.webp"
  },
  {
    "id": "f2-407-507",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou are building a Power Bl report that uses data from an Azure SQL database named erp1.\n\nYou Import the following tables.\n\nYou need to perform the following analyses:\n\n• Orders sold over time that include a measure of the total order value\n\n• Orders by attributes of products sold\n\nThe solution must minimize update times when interacting with visuals in the report. What should you do first?",
    "choices": [
      "From Power Query, merge the Orders query and the Order Line Hems query.",
      "Calculate the count of orders per product by using a DAX function.",
      "Create a calculated column that adds a list of product categories to the Orders table by using a DAX function.",
      "From Power Query, merge the Order Line Items query and the Products query."
    ],
    "correct": [
      3
    ],
    "explanation": "https://www.sqlbi.com/articles/header-detail-vs-star-schema-models-in- tabular-and-power-bi/",
    "source": "Final 2",
    "sourceNumber": 407,
    "legacy": false,
    "image": "/exhibit-assets/f2-407-507.webp"
  },
  {
    "id": "f2-410-508",
    "domain": "Manage and secure Power BI",
    "type": "single",
    "prompt": "- (Topic 4)\n\nYou have a Microsoft SharePoint Online site that contains several document libraries.\n\nOne of the document libraries contains manufactunng reports saved as Microsoft Excel files. All the manufacturing reports have the same data structure.\n\nYou need to use Power Bl Desktop to load only the manufacturing reports to a table for analysis.\n\nWhat should you do?",
    "choices": [
      "Get data from a SharePoint folder, enter the site URL and then select Combine & Load",
      "Get data from a SharePoint list and enter the site URL Select Combine & Transform, then filter by the folder path to the manufacturing reports library.",
      "Get data from a SharePoint list enter the site URL and then select Combine & Load",
      "Get data from a SharePoint folder and enter the site UR",
      "Select Transform, then filter by the folder path to the manufacturing reports library,"
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "source": "Final 2",
    "sourceNumber": 410,
    "legacy": false
  }
];

export const domainTargets: Record<Domain, number> = {
  'Prepare the data': 14,
  'Model the data': 13,
  'Visualize and analyze the data': 13,
  'Manage and secure Power BI': 10,
};

export const domainColors: Record<Domain, string> = {
  'Prepare the data': 'bg-sky-500',
  'Model the data': 'bg-violet-500',
  'Visualize and analyze the data': 'bg-amber-500',
  'Manage and secure Power BI': 'bg-emerald-500',
};

const fullBank = seededShuffle(questions, 300);
const mockForms = [1, 2, 3, 4].map((model) => {
  const selected: Question[] = [];
  (Object.keys(domainTargets) as Domain[]).forEach((domain) => {
    const pool = seededShuffle(questions.filter((item) => item.domain === domain), 3000 + domain.length);
    const count = domainTargets[domain];
    selected.push(...pool.slice((model - 1) * count, model * count));
  });
  return seededShuffle(selected, model * 7919);
});

export function buildExam(model: number): Question[] {
  if (model >= 101 && model <= 104) return fullBank.filter((_, index) => index % 4 === model - 101);
  return mockForms[model - 1] ?? mockForms[0];
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let state = seed >>> 0;
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}
