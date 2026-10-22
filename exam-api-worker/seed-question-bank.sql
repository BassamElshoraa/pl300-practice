-- Generated from the reviewed active question bank. Do not edit manually.
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-001-0', 'Model the data', 'manual', 'HOTSPOT -

You plan to create the Power BI model shown in the exhibit. (Click the Exhibit tab.)

The data has the following refresh requirements:

✑ Customer must be refreshed daily.

✑ Date must be refreshed once every three years.

✑ Sales must be refreshed in near real time.

✑ SalesAggregate must be refreshed once per week.

You need to select the storage modes for the tables. The solution must meet the following requirements:

✑ Minimize the load times of visuals.

✑ Ensure that the data is loaded to the model based on the refresh requirements.

Which storage mode should you select for each table? To answer, select the appropriate options in the answer

area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: Dual -

Customer should use the dual storage mode.

Dual: Tables with this setting can act as either cached or not cached, depending on the context of the query
that''s submitted to the Power BI dataset. In some cases, you fulfill queries from cached data. In other cases,
you fulfill queries by executing an on-demand query to the data source.

Note: You set the Storage mode property to one of these three values: Import, DirectQuery, and Dual.

Box 2: Dual -

You can set the dimension tables (Customer, Geography, and Date) to Dual to reduce the number of limited
relationships in the dataset, and improve performance.

Box 3: DirectQuery -

Sales should use the DirectQuery storage mode.

DirectQuery: Tables with this setting aren''t cached. Queries that you submit to the Power BI dataset"for
example, DAX queries"and that return data from

DirectQuery tables can be fulfilled only by executing on-demand queries to the data source. Queries that you
submit to the data source use the query language for that data source, for example, SQL.

Box 4: Import -

Import: Imported tables with this setting are cached. Queries submitted to the Power BI dataset that return
data from Import tables can be fulfilled only from cached data.

Note:-

Dual (Composite) Mode:

The dual storage mode is between Import and DirectQuery. it is a hybrid approach, Like importing data, the
dual storage mode caches the data in the table. However, it leaves it up to Power BI to determine the best way
to query the table depending on the query context.

1) Sales Must be Refreshed in Near real time so "Direct Query"

2) Sales Aggregate is once per week so "Import" (performance also required)

3) Both Date and Customer has relationship with both Sales and SalesAggregate tables so "Dual"

because to support performance for DirectQuery(Sales) and Import(SalesAggregate)

Reference:

https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-storage-mode', 'Final', '1', '/dump-assets/f1-001-0-question.webp', '/dump-assets/f1-001-0-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-002-1', 'Prepare the data', 'single', 'You have a project management app that is fully hosted in Microsoft Teams. The app was developed by using

Microsoft Power Apps.

You need to create a Power BI report that connects to the project management app.

Which connector should you select?', '["Microsoft Teams Personal Analytics","SQL Server database","Dataverse","Dataflows"]', '[2]', 'Data sources in Power BI Desktop.

The Power Platform category provides the following data connections:

Power BI datasets -

Power BI dataflows -

Common Data Service (Legacy)

Dataverse -

Dataflows -

Other data sources include Microsoft Teams Personal Analytics (Beta).

You can use the Microsoft Power BI template to import data into Power BI from Project for the web and
Project Online. When you''re using the template, you''re connected to your Microsoft Dataverse instance,
where your Microsoft Project web app data is stored.

https://support.microsoft.com/en-us/office/use-power-bi-desktop-to-connect-with-your-project-data-
df4ccca1-68e9-418c-9d0f-022ac05249a2

Reference:

https://docs.microsoft.com/en-us/power-bi/connect-data/desktop-data-sources', 'Final', '2', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-003-2', 'Prepare the data', 'single', 'For the sales department at your company, you publish a Power BI report that imports data from a Microsoft Excel

file located in a Microsoft SharePoint folder.

The data model contains several measures.

You need to create a Power BI report from the existing data. The solution must minimize development effort.

Which type of data source should you use?', '["Power BI dataset","a SharePoint folder","Power BI dataflows","an Excel workbook"]', '[0]', 'Power BI dataset

because the case states there is already a report published and the datamodel contains measures. therefore
and to be able to use the measures in the datamodel you should connect to the existing dataset (which was
created when you plublished the report) instead of starting from scratch with the files in the SharePoint
folder.', 'Final', '3', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-004-3', 'Prepare the data', 'single', 'You import two Microsoft Excel tables named Customer and Address into Power Query. Customer contains the

following columns:

✑ Customer ID

✑ Customer Name

✑ Phone

✑ Email Address

✑ Address ID

Address contains the following columns:

✑ Address ID

✑ Address Line 1

✑ Address Line 2

✑ City

✑ State/Region

✑ Country

✑ Postal Code

Each Customer ID represents a unique customer in the Customer table. Each Address ID represents a unique

address in the Address table.

You need to create a query that has one row per customer. Each row must contain City, State/Region, and Country

for each customer.

What should you do?', '["Merge the Customer and Address tables.","Group the Customer and Address tables by the Address ID column.","Transpose the Customer and Address tables.","Append the Customer and Address tables."]', '[0]', 'Remember Merge is JOIN, APPEND is UNION

A merge queries operation joins two existing tables together based on matching values from one or multiple
columns. You can choose to use different types of joins, depending on the output you want.

Reference:

https://docs.microsoft.com/en-us/power-query/merge-queries-overview', 'Final', '4', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-005-4', 'Manage and secure Power BI', 'manual', 'HOTSPOT -

You have two Azure SQL databases that contain the same tables and columns.

For each database, you create a query that retrieves data from a table named Customer.

You need to combine the Customer tables into a single table. The solution must minimize the size of the data model

and support scheduled refresh in powerbi.com.

What should you do? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: Append Queries as New -

When you have additional rows of data that you''d like to add to an existing query, you append the query.

There are two append options:

* Append queries as new displays the Append dialog box to create a new query by appending multiple tables.

* Append queries displays the Append dialog box to add additional tables to the current query.

Incorrect: When you have one or more columns that you''d like to add to another query, you merge the queries.

Box 2: Disable loading the query to the data model

By default, all queries from Query Editor will be loaded into the memory of Power BI Model. You can disable
the load for some queries, especially queries that used as intermediate transformation to produce the final
query for the model.

Disabling Load doesn''t mean the query won''t be refreshed, it only means the query won''t be loaded into the
memory. When you click on Refresh model in Power

BI, or when a scheduled refresh happens even queries marked as Disable Load will be refreshed, but their
data will be used as intermediate source for other queries instead of loading directly into the model. This is a
very basic performance tuning tip, but very important when your Power BI model grows bigger and bigger.

Reference:

https://docs.microsoft.com/en-us/power-query/append-queries

https://radacad.com/performance-tip-for-power-bi-enable-load-sucks-memory-up', 'Final', '5', '/dump-assets/f1-005-4-question.webp', '/dump-assets/f1-005-4-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-006-5', 'Prepare the data', 'manual', 'DRAG DROP -

In Power Query Editor, you have three queries named ProductCategory, ProductSubCategory, and Product.

Every Product has a ProductSubCategory.

Not every ProductsubCategory has a parent ProductCategory.

You need to merge the three queries into a single query. The solution must ensure the best performance in Power

Query.

How should you merge the tables? To answer, drag the appropriate merge types to the correct queries. Each

merge type may be used once, more than once, or not at all. You may need to drag the split bar between panes or

scroll to view content.

NOTE: Each correct selection is worth one point.

Select and Place:', '[]', '[1,3]', 'Box 1: Inner -

Every Product has a ProductSubCategory.

A standard join is needed.

One of the join kinds available in the Merge dialog box in Power Query is an inner join, which brings in only
matching rows from both the left and right tables.

Box 2: Left outer -

Not every ProductsubCategory has a parent ProductCategory.

One of the join kinds available in the Merge dialog box in Power Query is a left outer join, which keeps all the
rows from the left table and brings in any matching rows from the right table.

Reference:

https://docs.microsoft.com/en-us/power-query/merge-queries-inner https://docs.microsoft.com/en-us/power-
query/merge-queries-left-outer', 'Final', '6', '/dump-assets/f1-006-5-question.webp', '/dump-assets/f1-006-5-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-007-6', 'Model the data', 'single', 'You are building a Power BI report that uses data from an Azure SQL database named erp1.

You import the following tables.

You need to perform the following analyses:

✑ Orders sold over time that include a measure of the total order value

Orders by attributes of products sold

The solution must minimize update times when interacting with visuals in the report.

What should you do first?', '["From Power Query, merge the Order Line Items query and the Products query.","Create a calculated column that adds a list of product categories to the Orders table by using a DAX function.","Calculate the count of orders per product by using a DAX function.","From Power Query, merge the Orders query and the Order Line Items query."]', '[3]', 'D. It''s the Header/Detail Schema, and the most optimal way is to flatten the header into the detail table.

Source:

https://www.sqlbi.com/articles/header-detail-vs-star-schema-models-in-tabular-and-power-bi/

GPT: Merging the Orders query and the Order Line Items query in Power Query will allow you to create a

single query that combines the necessary data from the different tables. This will make it easier and more
efficient to perform the required analyses, as you will have all the information you need in one place.

--- PBI will do the best aggregation base on Star Schema model, we now have 1 Fact table (Order Line Items)
and 2 Dim tables (Products, Orders). Orders has common field with Products (ProductID), and pretty sure time
series field (OrderDate); Orders Line Items has Price and Quanity.

--- We need summarize some values like "price" and "quantity" over-time by attributes product. But we only
have common field in Dim table (Orders) so we need to merge Dim (Orders) and Fact (Order Line Items) to new
single Fact table to design the right Star Schema model.

=> So that D is correct', 'Final', '7', '/exhibit-assets/f1-007-6.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-008-7', 'Prepare the data', 'single', 'You have a Microsoft SharePoint Online site that contains several document libraries.

One of the document libraries contains manufacturing reports saved as Microsoft Excel files. All the

manufacturing reports have the same data structure.

You need to use Power BI Desktop to load only the manufacturing reports to a table for analysis.

What should you do?', '["Get data from a SharePoint folder and enter the site URL Select Transform, then filter by the folder path to the manufacturing reports library.","Get data from a SharePoint list and enter the site URL. Select Combine & Transform, then filter by the folder path to the manufacturing reports library.","Get data from a SharePoint folder, enter the site URL, and then select Combine & Load.","Get data from a SharePoint list, enter the site URL, and then select Combine & Load."]', '[0]', 'We have to import Excel files from SharePoint, so we need the connector SharePoint folder which is used to
get access to the files stored in the library. SharePoint list is a collection of content that has rows and
columns (like a table) and is used for task lists, calendars, etc.

Since we have to filter only on manufacturing reports, we have to select Transform and then filter by the
corresponding folder path.', 'Final', '8', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-009-8', 'Prepare the data', 'manual', 'DRAG DROP -

You have a Microsoft Excel workbook that contains two sheets named Sheet1 and Sheet2.

Sheet1 contains the following table named Table1.

Sheet2 contains the following table named Table2.

You need to use Power Query Editor to combine the products from Table1 and Table2 into the following table that

has one column containing no duplicate values.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.

Select and Place:', '[]', '[3,4,1]', 'From Power BI Desktop, import data from Excel, and select Table 1 and Table 2.

From Power Query Editor, append Table 2 to Table 1.

From Power Query Editor Select Table 1,and then Select Remove duplicates.

Reference:

https://docs.microsoft.com/en-us/power-bi/connect-data/desktop-shape-and-combine-data', 'Final', '9', '/dump-assets/f1-009-8-question.webp', '/dump-assets/f1-009-8-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-010-9', 'Prepare the data', 'single', 'You have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the

date and time each complaint occurred. The data in Logged is in the following format: 2018-12-31 at 08:59.

You need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.

What should you do?', '["Apply a transformation to extract the last 11 characters of the Logged column and set the data type of the new column to Date.","Change the data type of the Logged column to Date.","Split the Logged column by using at as the delimiter.","Apply a transformation to extract the first 11 characters of the Logged column."]', '[2]', 'You should split the Logged column by using "at" as the delimiter. This will allow you to separate the date and
time into separate columns, which will enable you to analyze the complaints by date and use a built-in date
hierarchy. Alternatively, you could also use a transformation to extract the date and time from the Logged
column and set the data type of the new columns to Date and Time, respectively. Option A is incorrect
because it only extracts the last 11 characters of the Logged column, which would not include the date. Option
B is incorrect because the data in the Logged column is in a non-standard date format and cannot be directly
converted to the Date data type. Option D is incorrect because it only extracts the first 11 characters of the

Logged column, which would not include the time.', 'Final', '10', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-011-10', 'Prepare the data', 'multi', 'You have a Microsoft Excel file in a Microsoft OneDrive folder.

The file must be imported to a Power BI dataset.

You need to ensure that the dataset can be refreshed in powerbi.com.

Which two connectors can you use to connect to the file? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.', '["Excel Workbook","Text/CSV","Folder","SharePoint folder","Web"]', '[3,4]', 'We can import an excel file from multiple connectors (excel workbook, folder, web, share point) but if we must
refresh the data from the service with no gateways then We must use web and share point connectors.', 'Final', '11', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-012-11', 'Prepare the data', 'manual', 'HOTSPOT -

You are profiling data by using Power Query Editor.

You have a table named Reports that contains a column named State. The distribution and quality data metrics for

the data in State is shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: 69 -
69 distinct/different values.
Note: Column Distribution allows you to get a sense for the overall distribution of values within a column in
your data previews, including the count of distinct values (total number of different values found in a given
column) and unique values (total number of values that only appear once in a given column).

Box 2: 4 -

Reference:
https://systemmanagement.ro/2018/10/16/power-bi-data-profiling-distinct-vs-unique/', 'Final', '12', '/dump-assets/f1-012-11-question.webp', '/dump-assets/f1-012-11-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-013-12', 'Prepare the data', 'manual', 'HOTSPOT -

You have two CSV files named Products and Categories.

The Products file contains the following columns:

✑ ProductID

✑ ProductName

✑ SupplierID

✑ CategoryID

The Categories file contains the following columns:

✑ CategoryID

✑ CategoryName

✑ CategoryDescription

From Power BI Desktop, you import the files into Power Query Editor.

You need to create a Power BI dataset that will contain a single table named Product. The Product will table

includes the following columns:

✑ ProductID

✑ ProductName

✑ SupplierID

✑ CategoryID

✑ CategoryName

✑ CategoryDescription

How should you combine the queries, and what should you do on the Categories query? To answer, select the

appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: Merge -

There are two primary ways of combining queries: merging and appending.

* When you have one or more columns that you''d like to add to another query, you merge the queries.

* When you have additional rows of data that you''d like to add to an existing query, you append the query.

Box 2: Disable the query load -

Managing loading of queries -

In many situations, it makes sense to break down your data transformations in multiple queries. One popular
example is merging where you merge two queries into one to essentially do a join. In this type of situations,
some queries are not relevant to load into Desktop as they are intermediate steps, while they are still required
for your data transformations to work correctly. For these queries, you can make sure they are not loaded in
Desktop by un-checking ''Enable load'' in the context menu of the query in Desktop or in the Properties screen:

Reference:

https://docs.microsoft.com/en-us/power-bi/connect-data/desktop-shape-and-combine-data
https://docs.microsoft.com/en-us/power-bi/connect-data/refresh-include-in-report-refresh', 'Final', '13', '/dump-assets/f1-013-12-question.webp', '/dump-assets/f1-013-12-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-014-13', 'Model the data', 'single', 'You have an Azure SQL database that contains sales transactions. The database is updated frequently.

You need to generate reports from the data to detect fraudulent transactions. The data must be visible within five

minutes of an update.

How should you configure the data connection?', '["Add a SQL statement.","Set the Command timeout in minutes setting.","Set Data Connectivity mode to Import.","Set Data Connectivity mode to DirectQuery."]', '[3]', 'DirectQuery: No data is imported or copied into Power BI Desktop. For relational sources, the selected tables
and columns appear in the Fields list. For multi- dimensional sources like SAP Business Warehouse, the
dimensions and measures of the selected cube appear in the Fields list. As you create or interact with a
visualization, Power BI Desktop queries the underlying data source, so you''re always viewing current data.

Reference:
https://docs.microsoft.com/en-us/power-bi/connect-data/desktop-use-directquery', 'Final', '14', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-015-14', 'Prepare the data', 'manual', 'DRAG DROP -

You have a folder that contains 100 CSV files.

You need to make the file metadata available as a single dataset by using Power BI. The solution must NOT store

the data of the CSV files.

Which three actions should you perform in sequence. To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.

Select and Place:', '[]', '[0,2,1]', '1. Get data and select folder.

2. Remove the content column

3. Expand the attributes column.

Get Data from the folder:

This is the first step where you connect to the folder that contains your CSV files. Power BI will recognize all
the CSV files in the folder and generate a dataset with both file metadata and content.

Remove Content Column:

After you load the data from the folder, Power BI typically presents two columns: Content (which contains the
actual data of the CSV files) and Attributes (which contains the metadata). In this step, you would remove the
Content column to ensure you''re only working with the metadata (e.g., file names, paths, creation dates).

Expand Attributes:

The Attributes column contains a record with metadata for each file. To make the metadata more accessible
and usable in your report, you''ll need to expand this column. Expanding will break the record down into
individual metadata fields (e.g., file name, file path, etc.), so that you can work with these attributes as
separate columns in Power Query.', 'Final', '15', '/dump-assets/f1-015-14-question.webp', '/dump-assets/f1-015-14-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-016-15', 'Model the data', 'single', 'A business intelligence (BI) developer creates a dataflow in Power BI that uses DirectQuery to access tables from

an on-premises Microsoft SQL server. The

Enhanced Dataflows Compute Engine is turned on for the dataflow.

You need to use the dataflow in a report. The solution must meet the following requirements:

✑ Minimize online processing operations.

✑ Minimize calculation times and render times for visuals.

✑ Include data from the current year, up to and including the previous day.

What should you do?', '["Create a dataflows connection that has DirectQuery mode selected.","Create a dataflows connection that has DirectQuery mode selected and configure a gateway connection for the dataset.","Create a dataflows connection that has Import mode selected and schedule a daily refresh.","Create a dataflows connection that has Import mode selected and create a Microsoft Power Automate solution to refresh the data hourly."]', '[2]', 'A daily update is adequate.

When you set up a refresh schedule, Power BI connects directly to the data sources using connection
information and credentials in the dataset to query for updated data, then loads the updated data into the
dataset. Any visualizations in reports and dashboards based on that dataset in the Power BI service are also
updated.

Reference:

https://docs.microsoft.com/en-us/power-bi/connect-data/refresh-desktop-file-local-drive', 'Final', '16', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-017-16', 'Prepare the data', 'manual', 'DRAG DROP

-

You publish a dataset that contains data from an on-premises Microsoft SQL Server database.

The dataset must be refreshed daily.

You need to ensure that the Power BI service can connect to the database and refresh the dataset.

Which four actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.', '[]', '[1,3,0,4]', 'Configure an on premises data gateway.

Add a data source.

Add the dataset owner to the data source.

Configure a scheduled refresh.

Set up an on-premises data gateway: Download and install an on-premises data gateway on a machine that
has access to the SQL Server database. Make sure that the gateway is registered to the same workspace as
the dataset.

Configure a data source: In the Power BI service, go to the dataset settings, and select the data source. Then,
enter the necessary details, including the server name, database name, and credentials.

Schedule refresh: In the dataset settings, go to the "Scheduled refresh" tab, and set up a refresh schedule.
Ensure that the gateway is selected as the "Data source credentials" option.

Publish the dataset: Finally, publish the dataset to the Power BI service. The dataset will be refreshed
according to the schedule you set up, and the on-premises data gateway will allow the service to connect to
the SQL Server database.', 'Final', '17', '/dump-assets/f1-017-16-question.webp', '/dump-assets/f1-017-16-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-018-17', 'Prepare the data', 'single', 'You attempt to connect Power BI Desktop to a Cassandra database.

From the Get Data connector list, you discover that there is no specific connector for the Cassandra database.

You need to select an alternate data connector that will connect to the database.

Which type of connector should you choose?', '["Microsoft SQL Server database","ODBC","OLE DB","OData"]', '[1]', 'B is Correct because, B´cause it allows you to connect to data sources that aren''t identified in the Get Data
lists.

The ODBC connector lets you import data from any third-party ODBC driver simply by specifying a Data
Source Name (DSN) or a connection string. As an option, you can also specify a SQL statement to execute
against the ODBC driver.

List details a few examples of data sources to which Power BI Desktop can connect by using the generic
ODBC interface:

https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-connect-using-generic-interfaces', 'Final', '18', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-019-18', 'Prepare the data', 'manual', 'DRAG DROP

-

You receive annual sales data that must be included in Power BI reports.

From Power Query Editor, you connect to the Microsoft Excel source shown in the following exhibit.

You need to create a report that meets the following requirements:

• Visualizes the Sales value over a period of years and months

• Adds a slicer for the month

• Adds a slicer for the year

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.', '[]', '[0,1,2]', 'Select the Month and Month Number Columns.

Select Unpivot Other Columns

Rename the Attribute Column as Year and the value Column as Sales.

Action 1: Select the Month and MonthNumber Columns. These columns will be used for the slicers to filter the
data by month.

Action 2: Select unpivot other columns. This action will transform the 2019, 2020, and 2021 columns into rows,
creating a column called "Attribute" that contains the years and a column called "Value" that contains the
sales data. This step makes the data more suitable for visualization and filtering by year.

Action 3: Rename the Attribute column as Year and the value column as sales. Renaming the columns
provides a more descriptive and meaningful structure for your data.

After performing these actions, your data will be in a format that allows you to create visuals and add slicers
for the month and year in Power BI.', 'Final', '19', '/dump-assets/f1-019-18-question.webp', '/dump-assets/f1-019-18-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-020-19', 'Prepare the data', 'manual', 'HOTSPOT

-

You are using Power BI Desktop to connect to an Azure SQL database.

The connection is configured as shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct solution is worth one point.', '[]', '[]', '10 minutes.

Only tables that Contain data.

Command timeout in minutes: If your connection lasts longer than 10 minutes (the default timeout), you can
enter another value in minutes to keep the connection open longer. This option is only available in Power
Query Desktop.

Navigate using full hierarchy: If checked, the navigator displays the complete hierarchy of tables in the
database you''re connecting to. If cleared, the navigator displays only the tables whose columns and rows
contain data.

Include relationship columns: If checked, includes columns that might have relationships to other tables. If
this box is cleared, you won’t see those columns.

https://learn.microsoft.com/en-us/power-query/connectors/azure-sql-database', 'Final', '20', '/dump-assets/f1-020-19-question.webp', '/dump-assets/f1-020-19-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-021-20', 'Manage and secure Power BI', 'manual', 'HOTSPOT

-

You have the Azure SQL databases shown in the following table.

You plan to build a single PBIX file to meet the following requirements:

• Data must be consumed from the database that corresponds to each stage of the development lifecycle.

• Power BI deployment pipelines must NOT be used.

• The solution must minimize administrative effort.

What should you do? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Reviewed answer: One parameter; Text. Create one text parameter such as Environment with Development, Test, and Production values. Reference that parameter in Power Query to select the matching server URL and database name. This changes the connection source; it does not filter rows.', 'Final', '21', '/dump-assets/f1-021-20-question.webp', '/dump-assets/f1-021-20-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-022-21', 'Model the data', 'multi', 'You are creating a query to be used as a Country dimension in a star schema.

A snapshot of the source data is shown in the following table.

You need to create the dimension. The dimension must contain a list of unique countries.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.', '["Delete the Country column.","Remove duplicates from the table.","Remove duplicates from the City column.","Delete the City column.","Remove duplicates from the Country column."]', '[3,4]', 'We all need the dimension to contain the list of unique countries. so we delete the city column because we
don''t need it and remove the duplicates from the country column. The correct answer is DE

The table has to contain unique values for "Country" column, so

- delete the city column --> in fact this column is not requested

- Remove duplicates from the Country column', 'Final', '22', '/exhibit-assets/f1-022-21.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-023-22', 'Prepare the data', 'manual', 'DRAG DROP

-

You use Power Query Editor to preview the data shown in the following exhibit.

You need to clean and transform the query so that all the rows of data are maintained, and error values in the

discount column are replaced with a discount of 0.05. The solution must minimize administrative effort.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.', '[]', '[]', 'Reviewed sequence: (1) select the discount column, (2) use Replace Errors and enter 0.05, and (3) set the column type to Decimal Number. This preserves every row, replaces the errors already visible in the preview, and stores the replacement as a decimal value.', 'Final', '23', '/dump-assets/f1-023-22-question.webp', '/dump-assets/f1-023-22-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-024-23', 'Prepare the data', 'manual', 'HOTSPOT

-

You attempt to use Power Query Editor to create a custom column and receive the error message shown in the

following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'mismatched data types

A1

Mismatched data types and A1 are the correct answers.

The custom column expression is trying to concatenate (use the "&" operator) a text value and a number
value, which are mismatched data types.

In this case, the left side of the operator is a text value (e.g.,"A"), and the right side is a number value (e.g.,1).

To achieve the desired outcome of the custom column as "A1", you should ensure that both sides of the "&"
operator have the same data type, which is text in this case.', 'Final', '24', '/dump-assets/f1-024-23-question.webp', '/dump-assets/f1-024-23-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-025-24', 'Prepare the data', 'multi', 'From Power Query Editor, you attempt to execute a query and receive the following error message.

Datasource.Error: Could not find file.

What are two possible causes of the error? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.', '["You do not have permissions to the file.","An incorrect privacy level was used for the data source.","The file is locked.","The referenced file was moved to a new location."]', '[0,3]', 'A and D. A if PBI cant find the file in the given path and D due this.

https://community.fabric.microsoft.com/t5/Power-Query/SOLVED-Datasource-error-could-not-find-file/td-
p/252703', 'Final', '25', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-026-25', 'Prepare the data', 'single', 'You have data in a Microsoft Excel worksheet as shown in the following table.

You need to use Power Query to clean and transform the dataset. The solution must meet the following

requirements:

•If the discount column returns an error, a discount of 0.05 must be used.

•All the rows of data must be maintained.

•Administrative effort must be minimized.

What should you do in Power Query Editor?', '["Select Replace Errors.","Edit the query in the Query Errors group.","Select Remove Errors.","Select Keep Errors."]', '[0]', 'A. Select Replace Errors - is correct. C&D will remove some rows Option B, "Edit the query in the Query Errors

group", would technically also allow to achieve the required result. However, this would not be the optimal
solution given the constraints provided in the scenario, which specifies that administrative effort must be
minimized.', 'Final', '26', '/exhibit-assets/f1-026-25.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-027-26', 'Prepare the data', 'single', 'You have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the

date and time each complaint occurred. The data in Logged is in the following format: 2018-12-31 at 08:59.

You need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.

What should you do?', '["Apply the Parse function from the Data transformations options to the Logged column.","Change the data type of the Logged column to Date.","Split the Logged column by using at as the delimiter.","Create a column by example that starts with 2018-12-31."]', '[2]', 'Split the Logged column by using at as the delimiter.

You should split the Logged column by using "at" as the delimiter. This will allow you to separate the date and
time into separate columns, which will enable you to analyze the complaints by date and use a built-in date
hierarchy. Alternatively, you could also use a transformation to extract the date and time from the Logged
column and set the data type of the new columns to Date and Time, respectively. Option A is incorrect
because it only extracts the last 11 characters of the Logged column, which would not include the date. Option
B is incorrect because the data in the Logged column is in a non-standard date format and cannot be directly
converted to the Date data type. Option D is incorrect because it only extracts the first 11 characters of the
Logged column, which would not include the time.', 'Final', '27', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-028-27', 'Prepare the data', 'manual', 'DRAG DROP

-

You have two Microsoft Excel workbooks in a Microsoft OneDrive folder.

Each workbook contains a table named Sales. The tables have the same data structure in both workbooks.

You plan to use Power BI to combine both Sales tables into a single table and create visuals based on the data in

the table. The solution must ensure that you can publish a separate report and dataset.

Which storage mode should you use for the report file and the dataset file? To answer, drag the appropriate modes

to the correct files. Each mode may be used once, more than once, or not at all. You may need to drag the split bar

between panes or scroll to view content.

NOTE: Each correct selection is worth one point.', '[]', '[2,1]', 'Independent correction:

Report file: Live connection.

Semantic model file: Import.

The semantic model imports and combines the Excel workbooks. After it is published, the separate thin-report PBIX connects live to that semantic model. DirectQuery is not an Excel storage mode in this scenario.', 'Final', '28', '/dump-assets/f1-028-27-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-029-28', 'Prepare the data', 'single', 'You use Power Query to import two tables named Order Header and Order Details from an Azure SQL database.

The Order Header table relates to the Order Details table by using a column named Order ID in each table.

You need to combine the tables into a single query that contains the unique columns of each table.

What should you select in Power Query Editor?', '["Merge queries","Combine files","Append queries"]', '[0]', 'A. Merge queries.

The "Merge queries" option in Power Query Editor allows you to combine two or more tables by matching rows
based on a common column (in this case, the Order ID column). This operation is similar to performing a SQL
JOIN, where you can include columns from both tables in the resulting combined query', 'Final', '29', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-030-29', 'Prepare the data', 'single', 'You have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the

date and time each complaint occurred. The data in Logged is in the following format: 2018-12-31 at 08:59.

You need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.

What should you do?', '["Apply a transformation to extract the last 11 characters of the Logged column and set the data type of the new column to Date.","Change the data type of the Logged column to Date.","Split the Logged column by using at as the delimiter.","Apply the Parse function from the Date transformations options to the Logged column."]', '[2]', 'Split the Logged column by using at as the delimiter.

By splitting the "Logged" column using "at" as the delimiter, you separate the date and time into two distinct
columns.

The first column would contain the date (2018-12-31).

The second column would contain the time (08:59).

Once you have the date part isolated, you can change its data type to Date in Power BI.

This transformation allows you to use the date part for analysis (e.g., creating date hierarchies), as Power BI
recognizes it as a valid date data type.

Why Option C Works Well:

Splitting ensures that you isolate the date portion in a cleaner format that Power BI can understand and
handle properly for analysis.

By setting the date column to a Date data type, you enable the built-in date hierarchy for analyzing
complaints by day, month, quarter, etc.

The time portion can be discarded or kept for further analysis (e.g., if you wanted to analyze complaints by
time of day).

Why Option D (Parse Function) Isn''t Ideal in This Case:

The Parse function is often useful for converting recognized date/time formats into proper date types.

However, since the "Logged" column has non-standard text ("at") in the middle of the date-time format, the
Parse function might not work as smoothly or effectively compared to splitting the column by the "at"
delimiter, which directly handles the non-standard format.', 'Final', '30', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-031-30', 'Prepare the data', 'manual', 'HOTSPOT

-

You have a folder that contains 50 JSON files.

You need to use Power BI Desktop to make the metadata of the files available as a single dataset. The solution

must NOT store the data of the JSON files.

Which type of data source should you use, and which transformation should you perform? To answer, select the

appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Data source type: Folder

Transformation: Delete the Content column.

This approach will allow you to access the metadata for all the JSON files in the folder without importing the
actual data from the JSON files into the dataset.', 'Final', '31', '/dump-assets/f1-031-30-question.webp', '/dump-assets/f1-031-30-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-032-31', 'Prepare the data', 'multi', 'You have a PBIX file that imports data from a Microsoft Excel data source stored in a file share on a local network.

You are notified that the Excel data source was moved to a new location.

You need to update the PBIX file to use the new location.

What are three ways to achieve the goal? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.', '["From the Datasets settings of the Power BI service, configure the data source credentials.","From the Data source settings in Power BI Desktop, configure the file path.","From Current File in Power BI Desktop, configure the Data Load settings.","From Power Query Editor, use the formula bar to configure the file path for the applied step.","From Advanced Editor in Power Query Editor, configure the file path in the M code."]', '[1,3,4]', 'B.From the Data source settings in Power BI Desktop, configure the file path.

D.From Power Query Editor, use the formula bar to configure the file path for the applied step.

E.From Advanced Editor in Power Query Editor, configure the file path in the M code.

Why the Other Options Are Incorrect:

A. From the Datasets settings of the Power BI service, configure the data source credentials.

This option is related to managing authentication and credentials to access the data source (e.g., user
permissions or authentication methods), but it does not handle the file path or location change.

It’s useful for cloud-based sources, but for local network data sources, the file path needs to be updated
within Power BI Desktop or the Power Query Editor.

C. From Current File in Power BI Desktop, configure the Data Load settings.

The Current File option in Power BI Desktop allows you to change data load settings, but it does not address
the file path for an Excel data source. This setting is more related to options like whether to import or load
data from the current file into the model, rather than specifying the path of the Excel file.

Summary:

To update the file path for the Excel data source after it has been moved:

B, D, and E are the appropriate solutions, as they allow you to configure the new file path within the data
source settings, Power Query Editor, or M code.', 'Final', '32', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-033-32', 'Prepare the data', 'manual', 'HOTSPOT

-

You have a Power BI semantic model that contains the data sources shown in the following table.

You need to configure the privacy level s of the data sources.

What should you configure for each data source? To answer, select the appropriate options in the answer area.

NOTE: Each correct answer is worth one point.', '[]', '[]', 'Private.

Organizational.', 'Final', '33', '/dump-assets/f1-033-32-question.webp', '/dump-assets/f1-033-32-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-034-33', 'Prepare the data', 'single', 'You plan to use Power BI Desktop to create a bug tracking dashboard that will pull data from Analytics in Azure

DevOps.

From Power BI Desktop, you need to configure a data connector to authenticate to Azure DevOps. The solution

must meet the following requirements:

•Use Analytics views.

•Filter data from the cloud.

Which connector should you use?', '["OData queries","Azure DevOps (Boards only)","Azure DevOps Server (Boards only)","OData Feed"]', '[1]', 'Connector Choice: Azure DevOps (Boards only):

This connector is designed to connect Power BI Desktop to Azure DevOps Analytics views, which is explicitly
mentioned in the requirements.

It allows filtering data directly from the cloud using Analytics views, meeting both key requirements.

Key Requirements Addressed:

Use Analytics views: The Azure DevOps (Boards only) connector directly supports Analytics views in Azure
DevOps, enabling structured access to work items and tracking data.

Filter data from the cloud: The connector allows filtering and querying data without the need to download or
process large datasets locally.

Why Other Options Are Incorrect:

A. OData queries:

While OData queries can pull data from Azure DevOps, they do not natively support Analytics views, which is a
specific requirement in this scenario.

C. Azure DevOps Server (Boards only):

This connector is intended for on-premises Azure DevOps Server (formerly known as TFS), not for Azure
DevOps Services in the cloud.

Since the requirement mentions pulling data from the cloud, this is not suitable.

D. OData Feed:

The OData Feed connector is generic and does not directly integrate with Azure DevOps Analytics views.

It requires more manual effort to configure queries and lacks built-in optimization for Analytics views.

Summary:

The Azure DevOps (Boards only) connector is the most appropriate option because it directly supports
Analytics views and provides the ability to filter data from the cloud efficiently.', 'Final', '34', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-035-34', 'Prepare the data', 'manual', 'HOTSPOT

-

You use Power Query Editor to preview the data shown in the following exhibit.

You confirm that the data will always start on row 3, and row 3 will always contain the column names.

How should you shape the query? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Remove top rows.

Use First row as headers.

Remove Top Rows: Use the "Remove Top Rows" function to eliminate the first two rows, bringing row 3 to the
top.

Use First Row as Headers: Apply the "Use First Row as Headers" transformation to promote the current top
row (originally row 3) to header status.

Conclusion:

By following these steps, you ensure that Power Query correctly interprets the dataset''s structure, with
appropriate headers and data rows, facilitating accurate data analysis in Power BI.', 'Final', '35', '/dump-assets/f1-035-34-question.webp', '/dump-assets/f1-035-34-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-036-35', 'Prepare the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a data source that contains a column. The column contains case sensitive data.

You have a Power BI semantic model in DirectQuery mode.

You connect to the model and discover that it contains undefined values and errors.

You need to resolve the issue.

Solution: You implicitly convert the values into the required type.

Does this meet the goal?', '["Yes","No"]', '[1]', 'Correct answer is B:No.

The issue stems from the case-sensitive data in the column. Undefined values and errors are likely caused by
mismatched case sensitivity between the data source and Power BI semantic model when working in
DirectQuery mode.

Why the Suggested Solution Doesn''t Meet the Goal:

Implicit Type Conversion:

This solution focuses on type conversion but does not address the core issue: case sensitivity.

Errors are not caused by a data type mismatch; they are due to case sensitivity mismatches in the source
data, which is unrelated to type conversion.

Implicit type conversion will not resolve errors resulting from case sensitivity.

What Should Be Done:

To resolve the issue, you need to ensure that the case sensitivity is handled properly. The correct approach
would involve:

Configuring the DirectQuery connection to ensure case-insensitive comparisons.

Using Power Query transformations to standardize the case of the column data (e.g., converting all text to
lowercase or uppercase).

Verifying the settings in the source system to ensure consistency in case sensitivity.

Summary:

The proposed solution (implicitly converting values into the required type) does not address the core issue of
case sensitivity in the data source.

Therefore, the correct answer is B. No.', 'Final', '36', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-037-36', 'Prepare the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a data source that contains a column. The column contains case sensitive data.

You have a Power BI semantic model in DirectQuery mode.

You connect to the model and discover that it contains undefined values and errors.

You need to resolve the issue.

Solution: You change the semantic model mode.

Does this meet the goal?', '["Yes","No"]', '[1]', 'No is a right answer.

Why Changing the Semantic Model Mode Doesn''t Resolve the Issue:

Switching the semantic model from DirectQuery to Import or other modes won''t inherently resolve case-
sensitivity problems because:

The underlying data remains case-sensitive.

Undefined values and errors caused by case mismatches will still persist unless case sensitivity is addressed
explicitly.

The problem is related to data handling rather than the model mode.

What Should Be Done:

To resolve the issue, you should:

Normalize the case of the column values in Power Query (e.g., convert all text to lowercase or uppercase).

Ensure that the case sensitivity settings in the data source align with those in Power BI.

Configure DirectQuery settings to handle case sensitivity where applicable.

Summary:

Changing the semantic model mode does not solve the issue of case sensitivity in the data. The correct
approach would involve addressing case sensitivity explicitly in the data source or during the transformation
process.

Therefore, the correct answer is B. No.', 'Final', '37', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-038-37', 'Prepare the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a data source that contains a column. The column contains case sensitive data.

You have a Power BI semantic model in DirectQuery mode.

You connect to the model and discover that it contains undefined values and errors.

You need to resolve the issue.

Solution: You normalize casing in the source query or Power Query Editor.

Does this meet the goal?', '["Yes","No"]', '[0]', 'Correct answer is A:Yes.

The issue arises because the data source contains case-sensitive data, and the Power BI semantic model in
DirectQuery mode encounters errors due to mismatches in case sensitivity. Normalizing the casing in the
source query or Power Query Editor resolves this issue by ensuring consistency in how data is interpreted.

Why Normalizing Casing Resolves the Issue:

Case Normalization:

Transforming all text values in the column to either lowercase or uppercase eliminates case sensitivity issues.

Power BI can then correctly match and interpret the data, preventing undefined values and errors.

DirectQuery Mode Compatibility:

By normalizing the casing in the source query or Power Query Editor, the data sent to the semantic model is
consistent, and DirectQuery can function correctly.

How Normalizing Casing Works:

In Power Query Editor:

Use transformations like "Transform > Format > Lowercase" or "Uppercase" on the column containing case-
sensitive data.

In the source query (if applicable):

Use SQL functions like LOWER() or UPPER() in the query to ensure consistent case handling at the data
source level.

Why This Meets the Goal:

The solution directly addresses the root cause: case sensitivity.

It ensures consistent data comparison, preventing undefined values and errors in the semantic model.

Summary:

Normalizing casing in the source query or Power Query Editor effectively resolves case sensitivity issues in
the data, ensuring that Power BI can interpret and process the data correctly. Therefore, the correct answer is
A. Yes.', 'Final', '38', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-039-38', 'Prepare the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a data source that contains a column. The column contains case sensitive data.

You have a Power BI semantic model in DirectQuery mode.

You connect to the model and discover that it contains undefined values and errors.

You need to resolve the issue.

Solution: You add an index key and normalize casing in the data source.

Does this meet the goal?', '["Yes","No"]', '[0]', 'Correct answer is A:Yes.

This solution effectively resolves the issue by addressing both the case sensitivity problem and ensuring the
integrity of the data model with an index key. Therefore, the correct answer is A. Yes.', 'Final', '39', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-040-39', 'Prepare the data', 'multi', 'You have a Microsoft Excel file in a Microsoft OneDrive folder.

The file must be imported to a Power BI semantic model.

You need to ensure that the semantic model can be refreshed in PowerBi.com.

Which two connectors can you use to connect to the file? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.', '["Web","Excel Workbook","Folder","Text/CSV","SharePoint folder"]', '[0,4]', 'A. Web.

E. SharePoint folder.

To connect to an Excel file stored in OneDrive and ensure it can be refreshed in PowerBI.com, the Web and
SharePoint folder connectors are the best options. Therefore, the correct answers are A and E.', 'Final', '40', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-041-40', 'Prepare the data', 'single', 'You use Power Query Editor to preview a column named Date as shown in the following exhibit.

You need to change the Date column to contain only the year. The solution must minimize administrative effort.

What should you do?', '["Split the column by delimiter.","Split the column by number of characters.","Extract the text after the delimiter.","Transform the column to contain only the year."]', '[3]', 'Choose Transform > Date > Year > Year to replace the existing Date column with its year. Add Column would preserve Date and add a separate Year column, which is a different operation from the requested transformation. If Date is text, first interpret it as a date using the correct locale.', 'Final', '41', '/exhibit-assets/f1-041-40.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-042-41', 'Model the data', 'manual', 'HOTSPOT

-

You are designing the data model for a Power BI semantic model.

You have the following tables in the star schema.

Which table is the fact table of the star schema, and which column in the Patient table is the surrogate key of the

star schema? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Test Result.

Patient key.

The correct answers, based on the configuration, are:

Fact Table: Test Result

Contains the core transactional or measurable data (e.g., test scores, results, dates).

Surrogate Key: PatientKey

Links each test record in the fact table to the corresponding patient in the Patient dimension table.', 'Final', '42', '/dump-assets/f1-042-41-question.webp', '/dump-assets/f1-042-41-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-043-42', 'Prepare the data', 'single', 'You use Power BI Desktop to import two tables named Customer and Contacts.

The Customer table contains the following columns:

•Customer_Name

•Customer ID

•Website

The Contacts table contains the following columns:

•Contact ID

•Contact Email

•Contact Name

•Customer Name

A web-based contact form is used to fill the Contacts table. The data is not sanitized.

You need to create a merge for the Customer and Contacts tables.

What should you do?', '["Disable fuzzy matching.","Enable fuzzy matching.","Set Join Kind to Left Outer."]', '[1]', 'enabling fuzzy matching (Option B), Power BI can perform a join that allows for slight variations and
discrepancies in the "Customer Name" field between the two tables, effectively handling imperfect data.
Fuzzy matching helps ensure that even non-exact matches are found and merged correctly, improving the
accuracy of your merged dataset.

Disabling fuzzy matching would only allow exact matches, which may result in incomplete or inaccurate
merges due to the unsanitized data. Setting the Join Kind to Left Outer doesn''t address the issue of data
inconsistencies and would still require exact matches unless fuzzy matching is enabled.', 'Final', '43', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-044-43', 'Prepare the data', 'manual', 'HOTSPOT

-

You are using Microsoft Power BI Desktop to profile data in Power Query Editor.

Table data is displayed as shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Change the data type in both cases. The date column is shown as Any and needs a date-compatible type before extracting Day. The menuAmount column is incorrectly typed as Date; edit the step that imposed that type and use the appropriate numeric type. An Error created upstream is not necessarily repaired by appending another type-conversion step after it. Renaming and conditional formatting do not repair the conversion.', 'Final', '44', '/dump-assets/f1-044-43-question.webp', '/dump-assets/f1-044-43-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-045-44', 'Prepare the data', 'manual', 'HOTSPOT

-

You have a Power BI semantic model named Model1 that contains a table named Sales.

Sales contains 10 million records and the following data.

The related report displays the weekly sales per region.

You need to minimize the size of Model1.

How should you modify the CustomerID column and the PurchaseDateTime column? To answer, select the

appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'CustomerID: Remove the column, because the stated report only needs weekly sales by region and no use of that ID is specified. Do not remove duplicate customers from a transaction fact: that would discard real sales. PurchaseDateTime: Split into date and time is the best available option because it retains the required date and separates a high-cardinality timestamp. For the smallest practical model, do not load the unused time component. Splitting alone does not guarantee the minimum size for every dataset. Removing the entire timestamp would prevent weekly analysis.', 'Final', '45', '/dump-assets/f1-045-44-question.webp', '/dump-assets/f1-045-44-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-046-45', 'Prepare the data', 'single', 'You have a Microsoft Power BI Desktop report named Report1 that uses an Azure SQL database as a data source.

A user named User1 plans to create a report by using the same data source as Report1.

You need to simplify the connection to the data source for User1.

Which type of file should you create?', '["PBIDS","XLSX","PBIT","PBIX"]', '[0]', 'Create a PBIDS data source file to simplify connecting to the same Azure SQL source. PBIDS does not contain authentication information or grant database access: the other user authenticates with their own credentials and selects tables in Navigator. PBIT shares a report/model template; PBIX shares the saved report/model and potentially imported data. Neither is the specialized connection-only file requested.', 'Final', '46', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-047-46', 'Prepare the data', 'manual', 'HOTSPOT

-

You have a Power BI semantic model.

You discover that the semantic model contains values that display as errors.

You need to use data profiling features in Power Query to preview the data and identify the issues.

What should you select to gain insight into the number of errors in the model, and what should you select to

resolve the errors? To answer, select the appropriate options in the answer area.

NOTE: Each correct answer is worth one point.', '[]', '[]', 'Independent correction:

To identify the issue: Column quality.

To resolve it: Replace Errors.

Column quality profiles valid, error, and empty values. Replace Errors changes the actual error cells, while Remove Empty only removes blank or null rows.', 'Final', '47', '/dump-assets/f1-047-46-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-048-47', 'Model the data', 'single', 'You plan to create a Power BI semantic model named Model1 that will contain data from an Azure SQL database

named DB1.

Model1 must show updated data within two minutes of the data being updated in DB1.

You need to select a connectivity mode for the connection to DB1.

What should you choose?', '["DirectQuery","live connection","import"]', '[0]', 'DirectQuery is the appropriate connectivity mode for querying recent Azure SQL data without waiting for an Import refresh. It does not by itself guarantee that an already-open report screen updates within two minutes. Configure and test the query/display refresh cycle, supported automatic page refresh interval, capacity limits, caching and source query latency to meet that operational requirement.', 'Final', '48', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-049-48', 'Prepare the data', 'multi', 'You need to create a semantic model in Power BI Desktop. The solution must meet the following requirements:

•The model must contain a table named Orders that has one row per order. Each row will contain the total amount

per order.

•The orders must be filtered to the selected CustomerID value.

•Users must select the CustomerID value from a list.

•The list of customers must come from an OData source.

Which three objects should you create in Power Query Editor? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.', '["an Orders query that has a filter on CustomerID","a Customers query that has a filter on CustomerID","an Orders query that has a single column containing a list of customers","a Customers query that has a single column containing a list of customer IDs","a parameter for CustomerID that uses a query to populate the suggested values","a parameter for CustomerID that uses manually entered values to populate the suggested values"]', '[0,3,4]', 'A. An Orders query that has a filter on CustomerID: This query will fetch the orders and apply a filter based on
the selected CustomerID to ensure the orders are filtered to the selected CustomerID value.

D. A Customers query that has a single column containing a list of customer IDs: This query will fetch the list
of customers from the OData source and provide a list of customer IDs that users can select from.

E. A parameter for CustomerID that uses a query to populate the suggested values: This parameter will be
used to dynamically filter the Orders query based on the selected CustomerID value. It will use the Customers
query to populate the suggested values for the CustomerID parameter.', 'Final', '49', '/exhibit-assets/f1-049-48.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-050-49', 'Manage and secure Power BI', 'single', 'You use Power BI Desktop to create a report named RPT1 that loads data from a Microsoft Excel file named File1.

File1 is located in a network share.

File1 is moved to a different folder.

When you open RPT1 in Power BI Desktop, you discover that the report displays outdated data.

You need to ensure that the data in File1 refreshes properly.

What should you do?', '["Change the data source.","Clear the permissions of File1.","Export a PBIDS file.","Modify the permissions for File1."]', '[0]', 'A. Change the data source.

Since File1 has been moved to a different folder, the path to the file has changed. Power BI Desktop relies on
static file paths to locate data sources like Excel, CSV, or text files. When the original file is no longer in the
expected location, Power BI cannot find it during refresh, and it may use cached/outdated data.', 'Final', '50', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-051-50', 'Prepare the data', 'manual', 'HOTSPOT

-

You have a query that contains customer data in Power Query Editor as shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Customer Name has repeated values according to its distinct/unique profile, unlike the displayed Customer ID and Customer Key columns. Extract the last 12 characters is the intended phone transformation for the shown formats: 500-555-0169 contains ten digits plus two hyphens. It removes the optional country prefix and leading separator space. It does not produce a string of exactly ten characters; if that is required, remove the hyphens as an additional step. This fixed-width method must not be generalized to phone formats with different national-number lengths.', 'Final', '51', '/dump-assets/f1-051-50-question.webp', '/dump-assets/f1-051-50-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-052-51', 'Model the data', 'single', 'You have a Power BI report named Report that contains the following tables.

For the last three days, refresh in Power BI has failed, and you receive the following error message: “You have

reached the maximum allowable memory allocation for your tier. Consider upgrading to a tier with more available

memory.”

You need to resolve the error and ensure that query response times are minimized for end users.

What should you do?', '["Merge the Sales person and invoice tables based on the SalesPersonId column.","Change the invoice table to a DirectQuery table and read the data live from the source, retaining only the dimension tables as import tables.","Reduce the size of the invoice table by summarizing sales by Product, Sales person, Calendar, and Customer.","Change the invoice table to a composite table that contains historical data as a DirectQuery table and hot data as an import table, and then partition the table."]', '[2]', 'Independent correction:

Summarize the Invoice fact table by Product, Sales person, Calendar, and Customer before loading it. The report needs analysis at this summarized grain, so the 12 million detailed rows are unnecessary. Fewer imported rows resolve the refresh memory failure and normally provide the lowest query latency. Merging the salesperson dimension into the fact increases duplication, while switching the fact to DirectQuery trades the memory problem for slower user queries. The proposed hot-Import/historical-DirectQuery option is both more complex and the reverse of the usual Hybrid-table pattern.', 'Final', '52', '/exhibit-assets/f1-052-51.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-053-52', 'Prepare the data', 'multi', 'You have a table named DIMCountries that contains a column named Country as shown in the following table.

You plan to use DIMCountries as a dimension in a report.

You need to ensure that the Country column in DIMCountries lists each country only once.

Which two actions should you perform on the Country column? Each correct answer presents part of the solution.

NOTE: Each correct answer is worth one point.', '["Change Data category to Country.","Remove duplicate values.","Apply a clean transform.","Replace the empty fields.","Apply a Capitalize Each Word transform."]', '[1,4]', 'Independent correction: B and E. First normalize the country names with Capitalize Each Word, then remove duplicates. Power Query duplicate comparison is case-sensitive, so removing duplicates before normalizing case can leave visually duplicated countries. Replacing empty fields does not solve the case mismatch shown in the exhibit.', 'Final', '53', '/exhibit-assets/f1-053-52.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-054-53', 'Prepare the data', 'manual', 'HOTSPOT

-

You plan to use Power Query Editor to get data from an API.

The API returns a JSON response.

You have a username and password for the API.

Which data source and authentication method should you use to connect to the API? To answer, select the

appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Data source: Web

Power Query uses the Web connector to fetch data from APIs (which typically return JSON or XML).

Authentication: Basic.

Since you have a username and password, the most common authentication for APIs that require these is
Basic Authentication (username and password sent encoded in the HTTP header).If the API uses some other
auth method (like OAuth), that would differ, but given username/password, Basic Auth is the standard.', 'Final', '54', '/dump-assets/f1-054-53-question.webp', '/dump-assets/f1-054-53-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-055-54', 'Prepare the data', 'single', 'You are creating a report in Power BI Desktop.

You load a data extract that includes a free text field named coll.

You need to analyze the frequency distribution of the string lengths in col1. The solution must not affect the size of

the model.

What should you do?', '["In the report, add a DAX calculated column that calculates the length of col1","In the report, add a DAX function that calculates the average length of col1","From Power Query Editor, add a column that calculates the length of col1","From Power Query Editor, change the distribution for the Column profile to group by length for col1"]', '[3]', 'A will affect the size of the model as would C.

B doesn''t give you enough information about the distribution (just the average)

D is the right answer.

1. Power Query Editor -> View -> Enable Column Profile

2. Select three dots (top left corner) in the profile pane appear at the bottom of the Query Editor window.

3. Group By -> Text length

Using Column Profiling in Power Query Editor allows you to analyze the frequency distribution of string
lengths in col1 without adding new columns or increasing the size of the model. This meets the requirements
efficiently, as the analysis is performed in-memory and not persisted in the model.', 'Final', '55', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-056-55', 'Manage and secure Power BI', 'single', 'You have a collection of reports for the HR department of your company. The datasets use row-level security

(RLS). The company has multiple sales regions.

Each sales region has an HR manager.

You need to ensure that the HR managers can interact with the data from their region only. The HR managers must

be prevented from changing the layout of the reports.

How should you provision access to the reports for the HR managers?', '["Publish the reports in an app and grant the HR managers access permission.","Create a new workspace, copy the datasets and reports, and add the HR managers as members of the workspace.","Publish the reports to a different workspace other than the one hosting the datasets.","Add the HR managers as members of the existing workspace that hosts the reports and the datasets."]', '[0]', 'correct ans looks as A since an app would prevent to change the layout

In the Power BI service, members of a workspace have access to datasets in the workspace. RLS doesn''t
restrict this data access. and RLS is used to restrict access to data not to layout of the report. Members are
allowed to change the report layout.

Reference:

https://kunaltripathy.com/2021/10/06/bring-your-power-bi-to-power-apps-portal-part-ii/', 'Final', '56', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-057-56', 'Manage and secure Power BI', 'single', 'You need to provide a user with the ability to add members to a workspace. The solution must use the principle of

least privilege.

Which role should you assign to the user?', '["Viewer","Admin","Contributor","Member"]', '[3]', 'Member role allows adding members or other with lower permissions to the workspace.

Reference:
https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces', 'Final', '57', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-058-57', 'Prepare the data', 'multi', 'You have a Power BI query named Sales that imports the columns shown in the following table.

Users only use the date part of the Sales_Date field. Only rows with a Status of Finished are used in analysis.

You need to reduce the load times of the query without affecting the analysis.

Which two actions achieve this goal? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.', '["Remove the rows in which Sales[Status] has a value of Canceled.","Remove Sales[Sales_Date].","Change the data type of Sale[Delivery_Time] to Integer.","Split Sales[Sale_Date] into separate date and time columns.","Remove Sales[Canceled Date]."]', '[0,4]', 'Independent correction: A and E. Filter out Canceled rows and remove the unused Canceled Date column. Power BI import models are reduced by horizontal filtering (fewer rows) and vertical filtering (fewer unused columns). Splitting Sales_Date would retain both date and time unless a separate removal step followed.', 'Final', '58', '/exhibit-assets/f1-058-57.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-059-58', 'Model the data', 'single', 'You build a report to analyze customer transactions from a database that contains the tables shown in the

following table.

You import the tables.

Which relationship should you use to link the tables?', '["one-to-many from Transaction to Customer","one-to-one between Customer and Transaction","many-to-many between Customer and Transaction","one-to-many from Customer to Transaction"]', '[3]', 'One on the primary Key side (customer table), many on the foreign key side (Transaction table) of the relation.', 'Final', '59', '/exhibit-assets/f1-059-58.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-060-59', 'Manage and secure Power BI', 'single', 'You have a custom connector that returns ID, From, To, Subject, Body, and Has Attachments for every email sent

during the past year. More than 10 million records are returned.

You build a report analyzing the internal networks of employees based on whom they send emails to.

You need to prevent report recipients from reading the analyzed emails. The solution must minimize the model size.

What should you do?', '["From Model view, set the Subject and Body columns to Hidden.","Remove the Subject and Body columns during the import.","Implement row-level security (RLS) so that the report recipients can only see results based on the emails they sent."]', '[1]', '"prevent report recipients from reading the analyzed emails"

The Subject and the Body are not needed in the report. Dropping them resolves the security problem and
minimizes the model.', 'Final', '60', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-061-60', 'Prepare the data', 'manual', 'HOTSPOT -

You create a Power BI dataset that contains the table shown in the following exhibit.

You need to make the table available as an organizational data type in Microsoft Excel.

How should you configure the properties of the table? To answer, select the appropriate options in the answer

area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Historical settings: Name is the human-readable Row label; ID is the unique Key column; Is featured table is Yes. This question describes an old feature: Microsoft states it was removed from Power BI Desktop in June 2026. Do not treat the screenshot as a current Desktop setup instruction.', 'Final', '61', '/dump-assets/f1-061-60-question.webp', '/dump-assets/f1-061-60-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-062-61', 'Model the data', 'single', 'You have the Power BI model shown in the following exhibit.

A manager can represent only a single country.

You need to use row-level security (RLS) to meet the following requirements:

✑ The managers must only see the data of their respective country.

✑ The number of RLS roles must be minimized.

Which two actions should you perform? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.

INDEPENDENT REVIEW NOTE: The source asks for two selections, but only one listed action is technically required. Select the required action.', '["Create a single role that filters Country[Manager_Email] by using the USERNAME DAX function.","Create a single role that filters Country[Manager_Email] by using the USEROBJECTID DAX function.","For the relationship between Purchase Detail and Purchase, select Apply security filter in both directions.","Create one role for each country.","For the relationship between Purchase and Purchase Detail, change the Cross filter direction to Single."]', '[0]', 'Independent review: The technically required action is to create one dynamic role that filters Country[Manager_Email] with USERNAME/USERPRINCIPALNAME. The existing active one-to-many relationships propagate that filter. Applying the security filter in both directions is not required here, so the original source item is flawed.', 'Final', '62', '/exhibit-assets/f1-062-61.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-063-62', 'Prepare the data', 'manual', 'HOTSPOT -

You have a Power BI imported dataset that contains the data model shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: cross filter direction -

As the answer correctly states "Assume Referential Integrity" only works for direct query connections.

Box 2: Star schema -

Star schema is a mature modeling approach widely adopted by relational data warehouses. It requires
modelers to classify their model tables as either dimension or fact.

Generally, dimension tables contain a relatively small number of rows. Fact tables, on the other hand, can
contain a very large number of rows and continue to grow over time.

Example:

Reference:

https://docs.microsoft.com/en-us/power-bi/connect-data/desktop-assume-referential-integrity
https://docs.microsoft.com/en-us/power-bi/guidance/star-schema', 'Final', '63', '/dump-assets/f1-063-62-question.webp', '/dump-assets/f1-063-62-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-064-63', 'Model the data', 'manual', 'HOTSPOT -

You have a Power BI model that contains a table named Sales and a related date table. Sales contains a measure

named Total Sales.

You need to create a measure that calculates the total sales from the equivalent month of the previous year.

How should you complete the calculation? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'CALCULATE

SAMEPERIODLASTYEAR

''DATE''[DATE]

Box 1: CALCULATE -

Box 2: SAMEPERIODLASTYEAR

accepts a data column, Month will usually be either text (Jan) or Integer (1). so: CALCULATE([Total Sales],
SAMEPERIODLASTYEAR(''Date''[Date]))

Box 3: ''DATE'' [DATE]

Reference:

https://docs.microsoft.com/en-us/dax/parallelperiod-function-dax https://docs.microsoft.com/en-
us/dax/sameperiodlastyear-function-dax', 'Final', '64', '/dump-assets/f1-064-63-question.webp', '/dump-assets/f1-064-63-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-065-64', 'Prepare the data', 'manual', 'DRAG DROP -

You plan to create a report that will display sales data from the last year for multiple regions.

You need to restrict access to individual rows of the data on a per region-basis by using roles.

Which four actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.

Select and Place:', '[]', '[4,3,0,1]', 'With respect, you can not assign users to a role until AFTER the report has been published to the Power BI
Service. Those posting that you create the role and then assign users to the role BEFORE publishing are
incorrect. Roles are created in Power BI Desktop. Desktop does not have any way to assign users to the roles.
They are empty when created. Role assignment happens in the service.

Publish the report to the Power BI service. Go to your Workspace, using the Dataset, select the More Options
menu(...) and click Security. This is where the Roles are populated.

1) Import your data into Power BI Desktop

2) Create the role definition (on the Modeling tab)

3) Publish the report to the Power BI service

4) Assign users to the role', 'Final', '65', '/dump-assets/f1-065-64-question.webp', '/dump-assets/f1-065-64-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-066-65', 'Model the data', 'manual', 'DRAG DROP -

You create a data model in Power BI.

Report developers and users provide feedback that the data model is too complex.

The model contains the following tables.

The model has the following relationships:

✑ There is a one-to-one relationship between Sales_Region and Region_Manager.

✑ There are more records in Manager than in Region_Manager, but every record in Region_Manager has a

corresponding record in Manager.

✑ There are more records in Sales_Manager than in Sales_Region, but every record in Sales_Region has a

corresponding record in Sales_Manager.

You need to denormalize the model into a single table. Only managers who are associated to a sales region must

be included in the reports.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.

NOTE: More than one order of answer choices is correct. You will receive credit for any of the correct orders you

select.

Select and Place:', '[]', '[0,2,5]', '1.Merge [Region_Manager] and [Manager] by using an inner join.

3.Merge [Sales_Region] and [Sales_Manager] by using an inner join.

6.Merge [Sales_Region] and [Region_Manager] by using an inner join.', 'Final', '66', '/dump-assets/f1-066-65-question.webp', '/dump-assets/f1-066-65-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-067-66', 'Visualize and analyze the data', 'single', 'You have a Microsoft Power BI report. The size of PBIX file is 550 MB. The report is accessed by using an App

workspace in shared capacity of powerbi.com.

The report uses an imported dataset that contains one fact table. The fact table contains 12 million rows. The

dataset is scheduled to refresh twice a day at 08:00 and 17:00.

The report is a single page that contains 15 AppSource visuals and 10 default visuals.

Users say that the report is slow to load the visuals when they access and interact with the report.

You need to recommend a solution to improve the performance of the report.

What should you recommend?', '["Change any DAX measures to use iterator functions.","Enable visual interactions.","Replace the default visuals with AppSource visuals.","Split the visuals onto multiple pages."]', '[3]', 'One page with many visuals may also make your report loading slow. Please appropriately reduce the number
of visualizations on one page.

Reference:
https://community.powerbi.com/t5/Desktop/Visuals-are-loading-extremely-slow/td-p/1565668', 'Final', '67', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-068-67', 'Model the data', 'manual', 'HOTSPOT -

You are creating a Microsoft Power BI imported data model to perform basket analysis. The goal of the analysis is

to identify which products are usually bought together in the same transaction across and within sales territories.

You import a fact table named Sales as shown in the exhibit. (Click the Exhibit tab.)

The related dimension tables are imported into the model.

Sales contains the data shown in the following table.

You are evaluating how to optimize the model.

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: Yes -
Those two columns not need in the analysis.

Box 2: No -
Can remove the surrogate key OrderDateKey from the analysis.

Box 3: No -
Tax charged not relevant for the analysis.', 'Final', '68', '/dump-assets/f1-068-67-question.webp', '/dump-assets/f1-068-67-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-069-68', 'Manage and secure Power BI', 'single', 'You have a Microsoft Power BI data model that contains three tables named Orders, Date, and City. There is a one-

to-many relationship between Date and

Orders and between City and Orders.

The model contains two row-level security (RLS) roles named Role1 and Role2. Role1 contains the following filter.

City[State Province] = "Kentucky"

Role2 contains the following filter.

Date[Calendar Year] = 2020 -

If a user is a member of both Role1 and Role2, what data will they see in a report that uses the model?', '["The user will see data for which the State Province value is Kentucky or where the Calendar Year is 2020.","The user will receive an error and will not be able to see the data in the report.","The user will only see data for which the State Province value is Kentucky.","The user will only see data for which the State Province value is Kentucky and the Calendar Year is 2020."]', '[0]', 'A, from the Microsoft documentation (https://docs.microsoft.com/en-us/power-bi/guidance/rls-guidance):

"When a report user is assigned to multiple roles, RLS filters become additive. It means report users can see
table rows that represent the union of those filters."

This means that you would see all data where either Role1 OR Role2 applies, so the answer is A not D.

Example from MS Learn linked below:

https://learn.microsoft.com/en-us/power-bi/guidance/rls-guidance

"Consider a model with two roles: The first role, named Workers, restricts access to all Payroll table rows by
using the following rule expression:

DAX:

FALSE()

A rule will return no table rows when its expression evaluates to false.

Yet, a second role, named Managers, allows access to all Payroll table rows by using the following rule
expression:

DAX:

TRUE()

Take care: Should a report user map to both roles, they''ll see all Payroll table rows."

It seems to be indeed A in that scenario. User will see the data from the first as well as the second filter, it is
FILTER A OR FILTER B (not FILTER A AND FILTER B)', 'Final', '69', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-070-69', 'Prepare the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You are modeling data by using Microsoft Power BI. Part of the data model is a large Microsoft SQL Server table

named Order that has more than 100 million records.

During the development process, you need to import a sample of the data from the Order table.

Solution: From Power Query Editor, you import the table and then add a filter step to the query.

Does this meet the goal?', '["Yes","No"]', '[0]', 'Reviewed answer: Yes under the normal interpretation of a foldable SQL Server row filter added before final Import load. Query folding can push that filter to SQL. No is appropriate if all rows have already been retrieved or the filter cannot fold; the source does not specify those conditions. The original claim that Source must first transfer every row is not generally true. Verify the emitted query. This is a conditional interpretation, not a guarantee for every M filter.', 'Final', '70', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-071-70', 'Model the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You are modeling data by using Microsoft Power BI. Part of the data model is a large Microsoft SQL Server table

named Order that has more than 100 million records.

During the development process, you need to import a sample of the data from the Order table.

Solution: You write a DAX expression that uses the FILTER function.

Does this meet the goal?', '["Yes","No"]', '[1]', 'Instead: You add a WHERE clause to the SQL statement.

Note: DAX is not a language designed to fetch the data like SQL rather than used for data analysis purposes.
It is always a better and recommended approach to transform the data as close to the data source itself. For
example, your data source is a relational database; then, it''s better to go with T-SQL.

SQL is a structured query language, whereas DAX is a formula language used for data analysis purposes.
When our data is stored in some structured database systems like SQL server management studio, MySQL, or
others, we have to use SQL to fetch the stored data.

Reference:

https://www.learndax.com/dax-vs-sql-when-to-use-dax-over-sql/', 'Final', '71', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-072-71', 'Prepare the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You are modeling data by using Microsoft Power BI. Part of the data model is a large Microsoft SQL Server table

named Order that has more than 100 million records.

During the development process, you need to import a sample of the data from the Order table.

Solution: You add a WHERE clause to the SQL statement.

Does this meet the goal?', '["Yes","No"]', '[0]', 'Power Query enables you to specify your native database query in a text box under Advanced options when
connecting to a database. In the example below, you''ll import data from a SQL Server database using a native
database query entered in the SQL statement text box.
1. Connect to a SQL Server database using Power Query. Select the SQL Server database option in the
connector selection.
2. In the SQL Server database popup window:
3. Specify the Server and Database where you want to import data from using native database query.
4. Under Advanced options, select the SQL statement field and paste or enter your native database query,
then select OK.

Reference:
https://docs.microsoft.com/en-us/power-query/native-database-query', 'Final', '72', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-073-72', 'Prepare the data', 'manual', 'DRAG DROP -

You are preparing a financial report in Power BI.

You connect to the data stored in a Microsoft Excel spreadsheet by using Power Query Editor as shown in the

following exhibit.

You need to prepare the data to support the following:

✑ Visualizations that include all measures in the data over time

✑ Year-over-year calculations for all the measures

Which four actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.

Select and Place:', '[]', '[2,4,1,5]', '1. Use first row as header

2. Unpivot all columns other than "Measure"

3. Rename "Attribute" to "Year"

4. Change data type of "Year" column to Date

Reference:

https://docs.microsoft.com/en-us/power-query/unpivot-column', 'Final', '73', '/dump-assets/f1-073-72-question.webp', '/dump-assets/f1-073-72-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-074-73', 'Model the data', 'manual', 'HOTSPOT -

You are creating an analytics report that will consume data from the tables shown in the following table.

There is a relationship between the tables.

There are no reporting requirements on employee_id and employee_photo.

You need to optimize the data model.

What should you configure for employee_id and employee_photo? To answer, select the appropriate options in the

answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: Hide -

Need in the relation, so cannot delete it.

Hide: We should hide the "employee_id" column if there are no reporting requirements on it. This means it
won''t be visible in the report, but it will still be available for any potential relationships or calculations with the
model.

Box 2: Delete -

Delete: Since there are no reporting requirements on the "employee_photo" column, we should delete it from
the data model to reduce unnecessary storage and improve performance. This means that the
"employee_photo" data is not needed for any calculations or relationships within the model.

Reference:

https://community.powerbi.com/t5/Desktop/How-to-Hide-a-Column-in-power-Bi/m-p/414470', 'Final', '74', '/dump-assets/f1-074-73-question.webp', '/dump-assets/f1-074-73-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-075-74', 'Model the data', 'manual', 'HOTSPOT -

You plan to create Power BI dataset to analyze attendance at a school. Data will come from two separate views

named View1 and View2 in an Azure SQL database.

View1 contains the columns shown in the following table.

View2 contains the columns shown in the following table.

The views can be related based on the Class ID column.

Class ID is the unique identifier for the specified class, period, teacher, and school year. For example, the same

class can be taught by the same teacher during two different periods, but the class will have a different class ID.

You need to design a star schema data model by using the data in both views. The solution must facilitate the

following analysis:

✑ The count of classes that occur by period

✑ The count of students in attendance by period by day

✑ The average number of students attending a class each month

In which table should you include the Teacher First Name and Period Number fields? To answer, select the

appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: Teacher Dimension-

Box 2: Class Dimension-

teacher''s dim and class dim because teacher name and period number are static information that are directly
related to the keys (teacher ID and class ID) so they belong in the relevant dimension tables. Since the "Class
ID is unique for the class, period, teacher and school year" this information should be included in the class
dimension table and not repeated for each student''s attendance to keep your model as small as possible and
to avoid mistakes.

Reference:

https://docs.microsoft.com/en-us/power-bi/guidance/star-schema', 'Final', '75', '/dump-assets/f1-075-74-question.webp', '/dump-assets/f1-075-74-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-076-75', 'Manage and secure Power BI', 'single', 'You have the Power BI model shown in the following exhibit.

There are four departments in the Departments table.

You need to ensure that users can see the data of their respective department only.

What should you do?', '["Create a slicer that filters Departments based on DepartmentID.","Create a row-level security (RLS) role for each department, and then define the membership of the role.","Create a DepartmentID parameter to filter the Departments table.","To the ConfidentialData table, add a calculated measure that uses the CURRENTGROUP DAX function."]', '[1]', 'Row-level security (RLS) with Power BI can be used to restrict data access for given users. Filters restrict data
access at the row level, and you can define filters within roles.

Reference:

https://docs.microsoft.com/en-us/power-bi/enterprise/service-admin-rls', 'Final', '76', '/exhibit-assets/f1-076-75.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-077-76', 'Model the data', 'single', 'In Power BI Desktop, you are building a sales report that contains two tables. Both tables have row-level security

(RLS) configured.

You need to create a relationship between the tables. The solution must ensure that bidirectional cross-filtering

honors the RLS settings.

What should you do?', '["Create an inactive relationship between the tables and select Apply security filter in both directions.","Create an active relationship between the tables and select Apply security filter in both directions.","Create an inactive relationship between the tables and select Assume referential integrity.","Create an active relationship between the tables and select Assume referential integrity."]', '[1]', 'By default, row-level security filtering uses single-directional filters, whether the relationships are set to
single direction or bi-directional. You can manually enable bi-directional cross-filtering with row-level security
by selecting the relationship and checking the Apply security filter in both directions checkbox. Select this
option when you''ve also implemented dynamic row-level security at the server level, where row-level security
is based on username or login ID.

Reference:
https://docs.microsoft.com/en-us/power-bi/enterprise/service-admin-rls', 'Final', '77', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-078-77', 'Prepare the data', 'manual', 'HOTSPOT -

You have a column named UnitsInStock as shown in the following exhibit.

UnitsInStock has 75 non-null values, of which 51 are unique.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'A non-aggregated table visual with one column groups identical values. If 51 unique means 51 distinct values, it shows 51 rows, not the 75 source records. Sum without any other grouping gives one total row and reduces the row count. If unique means once-occurring values in Power Query profiling, the full distinct count is unknown. Is nullable does not force one visual row per source row.', 'Final', '78', '/dump-assets/f1-078-77-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-079-78', 'Model the data', 'manual', 'HOTSPOT -

You have a Power BI report.

You have the following tables.

You have the following DAX measure.

Accounts :=

CALCULATE (

DISTINCTCOUNT (Balances[AccountID]),

LASTDATE (''Date''[Date])

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: No -
It will show the total number of accounts that were live at the last day of the year only.
Note:
DISTINCTCOUNT counts the number of distinct values in a column.
LASTDATE returns the last date in the current context for the specified column of dates.

Box 2: No -
It will show the total number of accounts that were live at the last day of the month only.

Box 3: Yes -

Reference:
https://docs.microsoft.com/en-us/dax/distinctcount-function-dax https://docs.microsoft.com/en-
us/dax/lastdate-function-dax', 'Final', '79', '/dump-assets/f1-079-78-question.webp', '/dump-assets/f1-079-78-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-080-79', 'Model the data', 'multi', 'You have the tables shown in the following table.

The Impressions table contains approximately 30 million records per month.

You need to create an ad analytics system to meet the following requirements:

✑ Present ad impression counts for the day, campaign, and site_name. The analytics for the last year are required.

Minimize the data model size.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.', '["Create one-to-many relationships between the tables.","Group the Impressions query in Power Query by Ad_id, Site_name, and Impression_date. Aggregate by using the CountRows function.","Create a calculated table that contains Ad_id, Site_name, and Impression_date.","Create a calculated measure that aggregates by using the COUNTROWS function."]', '[0,1]', 'Use suitable one-to-many dimension relationships and group Impressions by Ad_id, Site_name and daily Impression_date with Count Rows before loading. Sum the stored count for impression totals; COUNTROWS of the summary counts groups instead of original events. Relationships are not storage-free, and a calculated table does not automatically remove the original fact.', 'Final', '80', '/exhibit-assets/f1-080-79.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-081-80', 'Model the data', 'manual', 'HOTSPOT -

You are creating a Microsoft Power BI data model that has the tables shown in the following table.

The Products table is related to the ProductCategory table through the ProductCategoryID column. Each product

has one product category.

You need to ensure that you can analyze sales by product category.

How should you configure the relationship from ProductCategory to Products? To answer, select the appropriate

options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'One-to-many because several products have the same product category. Single because the performance is

much better and the assignment states only that you need to be able to analyze sales by product category.

Box 1: One-to-many -

The one-to-many and many-to-one cardinality options are essentially the same, and they''re also the most
common cardinality types.

Incorrect: A many-to-many relationship means both columns can contain duplicate values. This cardinality
type is infrequently used. It''s typically useful when designing complex model requirements. You can use it to
relate many-to-many facts or to relate higher grain facts. For example, when sales target facts are stored at
product category level and the product dimension table is stored at product level.

Box 2: Single -

Incorrect:

Bear in mind that bi-directional relationships can impact negatively on performance. Further, attempting to
configure a bi-directional relationship could result in ambiguous filter propagation paths. In this case, Power
BI Desktop may fail to commit the relationship change and will alert you with an error message.

Reference:

https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand', 'Final', '81', '/dump-assets/f1-081-80-question.webp', '/dump-assets/f1-081-80-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-082-81', 'Model the data', 'single', 'You import a Power BI dataset that contains the following tables:

✑ Date

✑ Product

✑ Product Inventory

The Product Inventory table contains 25 million rows. A sample of the data is shown in the following table.

The Product Inventory table relates to the Date table by using the DateKey column. The Product Inventory table

relates to the Product table by using the

ProductKey column.

You need to reduce the size of the data model without losing information.

What should you do?', '["Change Summarization for DateKey to Don''t Summarize.","Remove the relationship between Date and Product Inventory","Change the data type of UnitCost to Integer.","Remove MovementDate."]', '[3]', 'The DateKey and MovementDate columns have the same information. Movementdate can be removed.

D, because the best way to reduce the data model size is to remove the unnecessary column.

Incorrect:

Not C: Integer data type would lose data.', 'Final', '82', '/exhibit-assets/f1-082-81.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-083-82', 'Model the data', 'manual', 'HOTSPOT -

You are enhancing a Power BI model that has DAX calculations.

You need to create a measure that returns the year-to-date total sales from the same date of the previous

calendar year.

Which DAX functions should you use? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'The blanks are CALCULATE, SUM and DATESBETWEEN. DATESBETWEEN takes three arguments: dates, start date and end date. The source endpoint LASTDATE(Sales[Date])-365 is not a universally correct prior-year calendar endpoint: leap years and missing sales on selected dates can change the intended range. The blank selections fit the shown template; validate its boundaries before treating it as a general PYTD formula.', 'Final', '83', '/dump-assets/f1-083-82-question.webp', '/dump-assets/f1-083-82-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-084-83', 'Prepare the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You are modeling data by using Microsoft Power BI. Part of the data model is a large Microsoft SQL Server table

named Order that has more than 100 million records.

During the development process, you need to import a sample of the data from the Order table.

Solution: You add a report-level filter that filters based on the order date.

Does this meet the goal?', '["Yes","No"]', '[1]', 'You want the raw data, not a report with the data.

Instead add a WHERE clause to the SQL statement.

Reference:

https://docs.microsoft.com/en-us/power-query/native-database-query', 'Final', '84', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-085-84', 'Model the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a Power BI report that imports a date table and a sales table from an Azure SQL database data source.

The sales table has the following date foreign keys:

✑ Due Date

✑ Order Date

✑ Delivery Date

You need to support the analysis of sales over time based on all the date foreign keys.

Solution: For each date foreign key, you add inactive relationships between the sales table and the date table.

Does this meet the goal?', '["Yes","No"]', '[1]', 'Instead: Solution: From the Fields pane, you rename the date table as Due Date. You use a DAX expression to
create Order Date and Delivery Date as calculated tables.

You can reference an inactive relationship whit DAX function USERELATIONSHIP(), but using DAX is not
mentioned here.

So follow this refactory methodology:

Create a copy of the role-playing table, providing it with a name that reflects its role. If it''s an Import table, we
recommend defining a calculated table. If it''s a DirectQuery table, you can duplicate the Power Query query.

Source: https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive

Reference:

https://docs.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive', 'Final', '85', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-086-85', 'Prepare the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a Power BI report that imports a date table and a sales table from an Azure SQL database data source.

The sales table has the following date foreign keys:

✑ Due Date

✑ Order Date

✑ Delivery Date

You need to support the analysis of sales over time based on all the date foreign keys.

Solution: From Power Query Editor, you rename the date query as Due Date. You reference the Due Date query

twice to make the queries for Order Date and

Delivery Date.

Does this meet the goal?', '["Yes","No"]', '[0]', '1. It''s not going to be great solution from the performance side...but that''s not part of the requirements

2. Answer is YES.That''s not the best solution regarding the performance but it''s not the subject.', 'Final', '86', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-087-86', 'Model the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a Power BI report that imports a date table and a sales table from an Azure SQL database data source.

The sales table has the following date foreign keys:

✑ Due Date

✑ Order Date

✑ Delivery Date

You need to support the analysis of sales over time based on all the date foreign keys.

Solution: From the Fields pane, you rename the date table as Due Date. You use a DAX expression to create Order

Date and Delivery Date as calculated tables.

Does this meet the goal?', '["Yes","No"]', '[0]', 'Refactoring methodology -
Here''s a methodology to refactor a model from a single role-playing dimension-type table, to a design with
one table per role.
1. Remove any inactive relationships.
2. Consider renaming the role-playing dimension-type table to better describe its role. In the example (not

present here), the Airport table is related to the
ArrivalAirport column of the Flight table, so it''s renamed as Arrival Airport.
3. Create a copy of the role-playing table, providing it with a name that reflects its role. If it''s an Import table,
we recommend defining a calculated table. If it''s a
DirectQuery table, you can duplicate the Power Query query.
In the example, the Departure Airport table was created by using the following calculated table definition.
Departure Airport = ''Arrival Airport''
Create an active relationship to relate the new table.
4. Consider renaming the columns in the tables so they accurately reflect their role. In the example, all
columns are prefixed with the word Departure or Arrival.
These names ensure report visuals, by default, will have self-describing and non-ambiguous labels. It also
improves the Q&A experience, allowing users to easily write their questions.
5. Consider adding descriptions to role-playing tables. (In the Fields pane, a description appears in a tooltip
when a report author hovers their cursor over the table.) This way, you can communicate any additional filter
propagation details to your report authors.

Reference:
https://docs.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive', 'Final', '87', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-088-87', 'Prepare the data', 'manual', 'DRAG DROP -

You receive revenue data that must be included in Microsoft Power BI reports.

You preview the data from a Microsoft Excel source in Power Query as shown in the following exhibit.

You plan to create several visuals from the data, including a visual that shows revenue split by year and product.

You need to transform the data to ensure that you can build the visuals. The solution must ensure that the columns

are named appropriately for the data that they contain.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.

Select and Place:', '[]', '[1,2,3]', 'Correct Sequence = 2>3>4

Select Use First Row as Headers
Select Department and Product and Unpivot Other Column
Rename the Attribute column to YEAR and the Value column to REVENUE', 'Final', '88', '/dump-assets/f1-088-87-question.webp', '/dump-assets/f1-088-87-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-089-88', 'Model the data', 'manual', 'HOTSPOT -

You have a Power BI report named Orders that supports the following analysis:

✑ Total sales over time

✑ The count of orders over time

✑ New and repeat customer counts

The data model size is nearing the limit for a dataset in shared capacity.

The model view for the dataset is shown in the following exhibit.

The data view for the Orders table is shown in the following exhibit.

The Orders table relates to the Customers table by using the CustomerID column.

The Orders table relates to the Date table by using the OrderDate column.

For each of the following statements, select Yes if the statement is true, Otherwise, select No.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'No; No; Yes under the displayed grain and materialized SalesTotal assumption. Grouping by CustomerID, OrderID and OrderDate does not guarantee fewer rows when OrderID already identifies each shown record. Grouping does not inherently increase detail or always prevent sales totals. Keep CustomerID for the relationship and repeat-customer analysis. Remove UnitPrice and Discount only if stored SalesTotal suffices and does not depend on those columns remaining in the model.', 'Final', '89', '/dump-assets/f1-089-88-question.webp', '/dump-assets/f1-089-88-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-090-89', 'Model the data', 'manual', 'HOTSPOT -

You are building a financial report by using Power BI.

You have a table named financials that contains a column named Date and a column named Sales.

You need to create a measure that calculates the relative change in sales as compared to the previous quarter.

How should you complete the measure? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'CALCULATE; DATEADD; DIVIDE. DATEADD with -1 QUARTER shifts a quarter, not one month. Relative growth is (current minus previous)/previous. DIVIDE handles a zero or blank denominator safely; partial-period selections follow the selected date context rather than guaranteeing full-quarter totals.', 'Final', '90', '/dump-assets/f1-090-89-question.webp', '/dump-assets/f1-090-89-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-091-90', 'Model the data', 'manual', 'DRAG DROP -

You are creating a Power BI model and report.

You have a single table in a data model named Product. Product contains the following fields:

✑ ID

✑ Name

✑ Color

✑ Category

✑ Total Sales

You need to create a calculated table that shows only the top eight products based on the highest value in Total

Sales.

How should you complete the DAX expression? To answer, drag the appropriate values to the correct targets.

Each value may be used once, more than once, or not at all. You may need to drag the split bar between panes or

scroll to view content.

Select and Place:', '[]', '[5,1]', 'TOPN; DESC. TOPN selects the highest eight by Total Sales, but ties at the eighth position can return more than eight rows. Add a unique secondary sort key if exactly eight are required. TOPN does not guarantee the final display order of returned rows.', 'Final', '91', '/dump-assets/f1-091-90-question.webp', '/dump-assets/f1-091-90-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-092-91', 'Prepare the data', 'multi', 'You are creating a sales report in Power BI for the NorthWest region sales territory of your company. Data will

come from a view in a Microsoft SQL Server database. A sample of the data is shown in the following table:

The report will facilitate the following analysis:

✑ The count of orders and the sum of total sales by Order Date

✑ The count of customers who placed an order

✑ The average quantity per order

You need to reduce data refresh times and report query times.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.', '["Set the data type for SalesOrderNumber to Decimal Number.","Remove the CustomerKey and ProductKey columns.","Remove the TaxAmt and Freight columns.","Filter the data to only the NorthWest region sales territory."]', '[2,3]', 'C: Remove columns that are not used in the report.

D: Reduce the number of rows.

Incorrect:

Not A: Not possible.

Not B: Need CustomerKey to count of customers who placed an order

This question presents a scenario where you''re tasked with creating a sales report in Power BI for the
NorthWest region. The data originates from a Microsoft SQL Server database view, and the report aims to
analyze:

The count of orders and the sum of total sales by Order Date

The count of customers who placed an order

The average quantity per order

To enhance data refresh and query times, the suggested actions are:

C. Remove the TaxAmt and Freight columns.

D. Filter the data to only the NorthWest region sales territory.

Justification:

Removing Unnecessary Columns: By eliminating columns like TaxAmt and Freight that aren''t required for the
specified analyses, you reduce the dataset''s size. This streamlining leads to faster data refreshes and more
efficient queries.

Filtering Data to Relevant Regions: Applying a filter to include only the NorthWest region ensures that only
pertinent data is loaded into Power BI. This targeted approach minimizes the volume of data processed,
further improving performance.

Implementing these steps aligns with best practices for optimizing Power BI performance, as it reduces the
amount of data handled, leading to quicker refresh and query times.', 'Final', '92', '/exhibit-assets/f1-092-91.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-093-92', 'Prepare the data', 'single', 'You are creating a Power BI model that contains a table named Store. Store contains the following fields.

You plan to create a map visual that will show store locations and provide the ability to drill down from Country to

State/Province to City.

What should you do to ensure that the locations are mapped properly?', '["Change the data type of City, State/Province, and Country.","Set Summarization for City, State/Province, and Country to Don''t summarize.","Set the data category of City, State/Province, and Country.","Create a calculated column that concatenates the values in City, State/Province, and Country."]', '[2]', 'A hierarchy is a set of fields categorized in a hierarchical way that one level is the parent of another level.
Values of the parent level can be drilled down to the lower level.

Create Hierarchy -
Right-click on the field you want to set as level 1 of the hierarchy in the fields list, and then select Create
Hierarchy.

After that, you will see a new hierarchy created named your field name Category plus the word Hierarchy. This
would have a hierarchy icon beside it and also an option to expand to the fields of the hierarchy. If you expand,
you will see a copy of the Category field in there too.

Etc.

Reference:
https://radacad.com/what-a-power-bi-hierarchy-is-and-how-to-use-it', 'Final', '93', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-094-93', 'Model the data', 'single', 'You are building a data model for a Power BI report.

You have data formatted as shown in the following table.

You need to create a clustered bar chart as shown in the following exhibit.

What should you do?', '["From Power Query Editor, split the Machine-User column by using a delimiter.","From Power Query Editor, create a column that contains the last three digits of the Machine-User column.","In a DAX function, create two calculated columns named Machine and User by using the SUBSTITUTE function.","In a DAX function, create two measures named Machine and User by using the SUBSTITUTE function."]', '[0]', 'Split a column of text (Power Query)
You can split a column with a text data type into two or more columns by using a common delimiter character.
For example, a Name column that contains values written as <LastName>, <FirstName> can be split into two
columns using the comma (,) character.
Note: Power Query is an Extract Transform Load (ETL) tool. It allows us to
Download and fetch data from different sources. We call this data ingestion
Combine, clean, and model this data. We call this data wrangling

Reference:
https://support.microsoft.com/en-us/office/split-a-column-of-text-power-query-5282d425-6dd0-46ca-95bf-
8e0da9539662', 'Final', '94', '/exhibit-assets/f1-094-93.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-095-94', 'Model the data', 'manual', 'DRAG DROP -

You need create a date table in Power BI that must contain 10 full calendar years, including the current year.

How should you complete the DAX expression? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Select and Place:', '[]', '[5,4,0]', 'Box 1: YEAR -

Get the current year.

Box 2: TODAY -

TODAY returns the current date.

Box 3: CALENDAR -

CALENDAR returns a table with a single column named Date containing a contiguous set of dates. The range
of dates is from the specified start date to the specified end date, inclusive of those two dates.

The following formula returns a table with dates between January 1st, 2005 and December 31st, 2015.

CALENDAR (

DATE ( 2005, 1, 1 ),

DATE ( 2015, 12, 31 )

Reference:

https://dax.guide/calendar/', 'Final', '95', '/dump-assets/f1-095-94-question.webp', '/dump-assets/f1-095-94-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-096-95', 'Model the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a Power BI report that imports a date table and a sales table from an Azure SQL database data source.

The sales table has the following date foreign keys:

✑ Due Date

✑ Order Date

✑ Delivery Date

You need to support the analysis of sales over time based on all the date foreign keys.

Solution: You create measures that use the USERELATIONSHIP DAX function to filter sales on the active

relationship between the sales table and the date table.

Does this meet the goal?', '["Yes","No"]', '[1]', 'No for the proposed solution restricted to the active relationship: that alone does not cover all three date roles. The original reason is wrong: USERELATIONSHIP can use an existing active or inactive relationship. To analyze other date roles, target the corresponding existing relationships in suitable calculations, or use separate role-playing dimensions with active relationships. USERELATIONSHIP does not create a missing relationship.', 'Final', '96', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-097-96', 'Model the data', 'manual', 'HOTSPOT -

You have a Power BI report that contains a measure named Total Sales.

You need to create a new measure that will return the sum of Total Sales for a year up to a selected date.

How should you complete the DAX expression? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: TOTALYTD -

TOTALYTD evaluates the specified expression over the interval which begins on the first day of the year and
ends with the last date in the specified date column after applying specified filters.

Syntax: TOTALYTD (

<Expression>,

<Dates>

[, <Filter>]

[, <YearEndDate>]

Expression - The expression to be evaluated.

Dates - The name of a column containing dates or a one column table containing dates.

Example:

TOTALYTD ( -- 2007-01-01 : 2007-05-12

[Sales Amount],

''Date''[Date]

Box 2: ''Date''[Date]

Reference:

https://dax.guide/totalytd/', 'Final', '97', '/dump-assets/f1-097-96-question.webp', '/dump-assets/f1-097-96-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-098-97', 'Model the data', 'manual', 'DRAG DROP -

You are modifying a Power BI model by using Power BI Desktop.

You have a table named Sales that contains the following fields.

You have a table named Transaction Size that contains the following data.

You need to create a calculated column to classify each transaction as small, medium, or large based on the value

in Sales Amount.

How should you complete the code? To answer, drag the appropriate values to the correct targets. Each value may

be used once, more than once, or not at all.

You may need to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.

Select and Place:', '[]', '[3,1,2]', 'FILTER; AND; CALCULATE. Select Transaction Size rows where Min <= the row sales amount AND Max >= it, then evaluate the distinct category within that filter. The source field list calls the amount Sales Amount but its printed code refers to Sales[Sales]; fix that inconsistent column name before running it. The inclusive integer ranges must not overlap, and the amount must match one category; decimals between the shown integer bounds can be uncovered.', 'Final', '98', '/dump-assets/f1-098-97-question.webp', '/dump-assets/f1-098-97-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-099-98', 'Visualize and analyze the data', 'single', 'You have a Power BI report for the procurement department. The report contains data from the following tables.

There is a one-to-many relationship from Suppliers to LineItems that uses the ID and Supplier ID columns.

The report contains the visuals shown in the following table.

You need to minimize the size of the dataset without affecting the visuals.

What should you do?', '["Merge Suppliers and LineItems.","Remove the LineItems[Description] column.","Remove the rows from LineItems where LineItems[Invoice Date] is before the beginning of last month.","Group LineItems by LineItems[Invoice ID] and LineItems[Invoice Date] with a sum of LineItems[Price]."]', '[1]', 'Remove LineItems[Description], which is not required by the displayed visuals. Do not remove historical records because two visuals have no last-month restriction. Grouping can reduce row count, contrary to the old explanation, but the offered grouping by Invoice ID and Invoice Date does not preserve Supplier ID, required for supplier and country analysis. Do not claim grouping never affects size.', 'Final', '99', '/exhibit-assets/f1-099-98.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-100-99', 'Model the data', 'multi', 'You have a Power BI report for the marketing department. The report reports on web traffic to a blog and contains

data from the following tables.

There is a one-to-many relationship from Posts to Traffic that uses the URL and URL Visited columns.

The report contains the visuals shown in the following table.

The dataset takes a long time to refresh.

You need to modify Posts and Traffic queries to reduce load times.

Which two actions will reduce the load times? Each correct answer presents part of the solution.

NOTE:

Each correct selection is worth one point.', '["Remove the rows in Posts in which Posts[Publish Date] is in the last seven days.","Remove the rows in Traffic in which Traffic[URL Visited] does not contain blog.","Remove Traffic[IP Address], Traffic[Browser Agent], and Traffic[Referring URL].","Remove Posts[Full Text] and Posts[Summary].","Remove the rows in Traffic in which Traffic[Referring URL] does not start with /."]', '[1,3]', 'Keep Traffic rows whose URL Visited contains blog, and remove Posts[Full Text] and Posts[Summary]. Preserve Referring URL for the external-referral visual. Removing Posts published in the last seven days discards recent posts, not old history, and breaks the requested analysis. Removing referring URLs that do not start with / would remove the external referrals the report explicitly needs.', 'Final', '100', '/exhibit-assets/f1-100-99.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-101-100', 'Model the data', 'manual', 'HOTSPOT

-

You are creating a quick measure as shown in the following exhibit.

You need to create a monthly rolling average measure for Sales over time.

How should you configure the quick measure calculation? To answer, select the appropriate options in the answer

area.

NOTE: Each correct selection is worth one point.', '[]', '[]', '1. Total Sales;

2. Date;

3. Months', 'Final', '101', '/dump-assets/f1-101-100-question.webp', '/dump-assets/f1-101-100-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-102-101', 'Model the data', 'single', 'You have the Power BI data model shown in the following exhibit.

The Sales table contains records of sales by day from the last five years up until today’s date.

You plan to create a measure to return the total sales of March 2021 when March 2022 is selected.

Which DAX expression should you use?', '["Calculate (Sum(Sales[Sales]), PREVIOUSYEAR( dimDate[Date])","TOTALYTD (SUM(Sales[Sales]), dimDate[Date] )","Calculate (SUM(Sales[Sales]), SAMEPERIODLASTYEAR(dimDate[Date] ))","SUM(Sales[Sales])"]', '[2]', 'Calculate (SUM(Sales[Sales]), SAMEPERIODLASTYEAR(dimDate[Date] ))', 'Final', '102', '/exhibit-assets/f1-102-101.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-103-102', 'Prepare the data', 'multi', 'You use Power BI Desktop to load data from a Microsoft SQL Server database.

While waiting for the data to load, you receive the following error.

You need to resolve the error.

What are two ways to achieve the goal? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.Recovered original error message: ERROR [08001] timeout expired.', '["Reduce the number of rows and columns returned by each query.","Split log running queries into subsets of columns and use Power Query to merge the queries.","Use Power Query to combine log running queries into one query.","Disable query folding on long running queries."]', '[0,1]', 'The recovered source PDF page 127 shows ERROR [08001] timeout expired, not an out-of-memory error. The intended answers are A and B. Reducing rows/columns can reduce query and transfer time; splitting long queries and merging is conditional on an effective execution plan and a safe unique join key. Neither is guaranteed to fix a connection timeout before query execution. Diagnose connectivity versus query execution, timeout settings and folding before implementing a fix. Disabling folding or blindly combining all slow queries is not a general remedy.', 'Final', '103', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-104-103', 'Prepare the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

From Power Query Editor, you profile the data shown in the following exhibit.

The IoT GUID and IoT ID columns are unique to each row in the query.

You need to analyze IoT events by the hour and day of the year. The solution must improve dataset performance.

Solution: You split the IoT DateTime column into a column named Date and a column named Time.

Does this meet the goal?', '["Yes","No"]', '[0]', 'The correct answer is A. Splitting datetime column will improve the performance even if it generates one
more column, having less unique values in separated date and time columns will achieve better compression.', 'Final', '104', '/exhibit-assets/f1-104-103.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-105-104', 'Prepare the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

From Power Query Editor, you profile the data shown in the following exhibit.

The IoT GUID and IoT ID columns are unique to each row in the query.

You need to analyze IoT events by the hour and day of the year. The solution must improve dataset performance.

Solution: You remove the IoT GUID column and retain the IoT ID column.

Does this meet the goal?', '["Yes","No"]', '[0]', 'Yes. Remove the redundant high-cardinality text GUID while retaining the equally unique numeric IoT ID and the timestamp needed for hourly and daily analysis. The source claim that Power BI Whole Number is always a four-byte unsigned long is incorrect: its logical type is a 64-bit integer and storage is compressed. Verify relationships and dependencies before deleting an identifier in a real model.', 'Final', '105', '/exhibit-assets/f1-105-104.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-106-105', 'Prepare the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

From Power Query Editor, you profile the data shown in the following exhibit.

The IoT GUID and IoT ID columns are unique to each row in the query.

You need to analyze IoT events by the hour and day of the year. The solution must improve dataset performance.

Solution: You change the IoT DateTime column to the Date data type.

Does this meet the goal?', '["Yes","No"]', '[1]', 'B is correct because changing the IoT DateTime column to the Date data type alone will not meet the goal of
analyzing IoT events by the hour and day of the year in power query.', 'Final', '106', '/exhibit-assets/f1-106-105.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-107-106', 'Model the data', 'single', 'You have a Microsoft Power BI report. The size of PBIX file is 550 MB. The report is accessed by using an App

workspace in shared capacity of powerbi.com.

The report uses an imported dataset that contains one fact table. The fact table contains 12 million rows. The

dataset is scheduled to refresh twice a day at 08:00 and 17:00.

The report is a single page that contains 15 AppSource visuals and 10 default visuals.

Users say that the report is slow to load the visuals when they access and interact with the report.

You need to recommend a solution to improve the performance of the report.

What should you recommend?', '["Change any DAX measures to use iterator functions.","Remove unused columns from tables in the data model.","Replace the default visuals with AppSource visuals.","Increase the number of times that the dataset is refreshed."]', '[1]', 'B. Remove unused columns from tables in the data model.

Unused columns increase the size of the data model, which can slow down report rendering and query
performance. By eliminating unnecessary columns, you reduce memory consumption and improve overall
efficiency.

Additionally, optimizing DAX measures and reducing the number of visuals on a page can further enhance
performance. Would you like more details on Power BI optimization techniques?', 'Final', '107', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-108-107', 'Model the data', 'manual', 'DRAG DROP

-

You have a Power BI data model that contains two tables named Products and Sales.

A one-to-many relationship exists between the tables.

You have a report that contains a report-level filter for Products.

You need to create a measure that will return the percent of total sales for each product. The measure must

respect the report-level filter when calculating the total.

How should you complete the DAX measure? To answer, drag the appropriate DAX functions to the correct

targets. Each function may be used once, more than once, or not at all. You may need to drag the split bar between

panes or scroll to view content.

NOTE: Each correct selection is worth one point.', '[]', '[2,1]', '1.Calculate

2. ALLSELECTED.

ALLSELECTED Removes only the filter on the expression visual but respect all external filters.

ALLSELECTED: Returns all the rows in a table, or all the values in a column, ignoring any filters that may have
been applied inside the query, but keeping filters that come from the outside.

https://mitchellpearson.com/2020/09/14/understanding-row-context-in-dax-and-power-
bi/#:~:text=ALLSELECTED%20DAX%20functions,coming%20from%20the%20inner%20query', 'Final', '108', '/dump-assets/f1-108-107-question.webp', '/dump-assets/f1-108-107-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-109-108', 'Model the data', 'multi', 'You have a Power BI data model that analyzes product sales over time. The data model contains the following

tables.

A one-to-many relationship exists between the tables.

The auto date/time option for the data model is enabled.

You need to reduce the size of the data model while maintaining the ability to analyze product sales by month and

quarter.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct answer is worth one point.', '["Create a relationship between the Date table and the Sales table.","Disable the auto date/time option.","Create a Date table and select Mark as Date Table.","Disable the load on the Date table.","Remove the relationship between the Product table and the Sales table."]', '[0,2]', 'The intended source selections are A and C: create/mark an explicit Date table and relate it to Sales. Do not infer that marking one date table removes every hidden auto date/time table for other eligible columns. Order Date becomes the many side of a relationship, while unconnected Ship Date and Delivered Date can remain eligible when Auto date/time stays on. For guaranteed removal of all automatic tables, disable Auto date/time after building and wiring a replacement and migrating dependent visuals. The choose-two source is not a complete migration checklist.', 'Final', '109', '/exhibit-assets/f1-109-108.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-110-109', 'Visualize and analyze the data', 'single', 'You have a Microsoft Power BI report. The size of PBIX file is 550 MB. The report is accessed by using an App

workspace in shared capacity of powerbi.com.

The report uses an imported dataset that contains one fact table. The fact table contains 12 million rows. The

dataset is scheduled to refresh twice a day at 08:00 and 17:00.

The report is a single page that contains 15 AppSource visuals and 10 default visuals.

Users say that the report is slow to load the visuals when they access and interact with the report.

You need to recommend a solution to improve the performance of the report.

What should you recommend?', '["Implement row-level security (RLS).","Remove unused columns from tables in the data model.","Replace the default visuals with AppSource visuals.","Enable visual interactions."]', '[1]', 'Remove unused columns from tables in the data model.

When a Power BI report is slow to load and interact with, optimizing the dataset and data model can
significantly improve performance. Here''s why B. Remove unused columns from tables in the data model is
the correct choice:

Reasoning

Data Model Size:

The PBIX file is large (550 MB) due to the dataset''s imported fact table with 12 million rows and potentially
many unnecessary columns.

Each column in the data model consumes memory and processing power during report rendering, even if it is
not used in any visuals or calculations.

Performance Optimization:

Removing unused columns reduces the data model size, which improves memory usage and query
performance.

A smaller data model leads to faster data refreshes, quicker load times, and improved responsiveness when
users interact with visuals.

Focus on Visual Load Time:

The issue isn''t related to security, visual types, or interactivity but rather the underlying data model size and
efficiency.

Why Not the Other Options?

A. Implement row-level security (RLS):

RLS controls user access to specific data rows, but it doesn''t improve report loading or visual performance
directly.

It could even add complexity and slightly increase query execution time.

C. Replace the default visuals with AppSource visuals:

AppSource visuals often have more features but can introduce additional rendering overhead, making reports
slower. Replacing default visuals with AppSource visuals would likely worsen performance.

D. Enable visual interactions:

Enabling visual interactions controls how visuals on a report page respond to each other. However, it doesn''t
directly address performance issues caused by a large data model or dataset.', 'Final', '110', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-111-110', 'Model the data', 'manual', 'HOTSPOT

-

You have a Power BI data model that contains a table named Stores. The table has the following columns:

• Store Name

• Open Date

• Status

• State

• City

You need to create a calculated column named Active Store Name that meets the following requirements:

• When the value of the Status column is “A”, the value in the Store Name column must be returned.

• When the value of the Status column is NOT “A”, the value in the Store Name column that is prefixed with

"Inactive - " must be returned.

How should you complete the DAX expression? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'IF

&

To create the calculated column Active Store Name in Power BI, which returns the store name prefixed with
"Inactive - " when the status is not "A", and the store name as-is when the status is "A", you can use the
following DAX expression:

Active Store Name = IF( Stores[Status] = "A", Stores[Store Name], "Inactive - " & Stores[Store Name])

Explanation:

The IF function checks if the Status column equals "A".

If true, it returns the value from the Store Name column.

If false, it concatenates "Inactive - " with the Store Name using the & operator.

This approach ensures that the Active Store Name column meets the specified requirements.', 'Final', '111', '/dump-assets/f1-111-110-question.webp', '/dump-assets/f1-111-110-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-112-111', 'Prepare the data', 'single', 'You have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the

date and time each complaint occurred. The data in Logged is in the following format: 2018-12-31 at 08:59.

You need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.

What should you do?', '["Apply a transformation to extract the first 11 characters of the logged column.","Add a conditional column that outputs 2018 if the Logged column starts with 2018 and set the data type of the new column to Whole Number.","Create a column by example that starts with 2018-12-31 and set the data type of the new column to Date.","Apply a transformation to extract the last 11 characters of the Logged column and set the data type of the new column to Date."]', '[2]', 'Answer is C and not B because the conditional column would be year and not the logged date, also the data
type should be date not whole number as specified in B.

C. Create a column by example that starts with 2018-12-31 and set the data type of the new column to
Date.

Explanation:

Understanding the Problem:

The Logged column contains date and time data in the format 2018-12-31 at 08:59.

The goal is to use a built-in date hierarchy for analyzing the data, which requires the data type to be
converted to Date.

Why Option C Works:

Column by Example is a feature in Power Query that allows you to create a new column by typing a sample
value, enabling Power Query to infer the transformation logic.

In this case, typing 2018-12-31 as an example allows Power Query to extract the date portion (YYYY-MM-DD)
from the Logged column.

Once the date portion is extracted, you can change the data type of the new column to Date. This ensures it

can be used with the built-in date hierarchy for further analysis.

Why Other Options Are Incorrect:

A. Apply a transformation to extract the first 11 characters of the Logged column:

Extracting the first 11 characters (e.g., 2018-12-31) will give you the date portion.

However, this option doesn''t specify changing the data type to Date, which is necessary to enable the date
hierarchy. If the data type isn''t converted, the result will remain as text.

B. Add a conditional column that outputs 2018 if the Logged column starts with 2018 and set the data type
of the new column to Whole Number:

Creating a column that outputs just the year (2018) and setting it to a number format isn''t sufficient for
enabling a built-in date hierarchy, as the hierarchy requires a complete date (YYYY-MM-DD).

D. Apply a transformation to extract the last 11 characters of the Logged column and set the data type of
the new column to Date:

Extracting the last 11 characters (e.g., at 08:59) will include invalid text (at) and time (08:59), making it
impossible to convert the column directly to a valid Date type.', 'Final', '112', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-113-112', 'Prepare the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

From Power Query Editor, you profile the data shown in the following exhibit.

The IoT GUID and IoT ID columns are unique to each row in the query.

You need to analyze IoT events by the hour and day of the year. The solution must improve dataset performance.

Solution: You create a custom column that concatenates the IoT GUID column and the IoT ID column and then

delete the IoT GUID and IoT ID columns.

Does this meet the goal?', '["Yes","No"]', '[1]', 'Answer is NO.

IoT GUID & IOT ID both are unique key columns. so we can delete any one among them. From performance
point of view its good to delete text ID column i.e IOT GUID and keep IOT ID. concatenation is not required

Both are unique columns, but by concatenating them you will end up with a Unique Key with data type Text.
This raises performance issues since Unique keys should be preferably integers for performance reasons.
Also, since IoT GUID is not required might as well remove it.', 'Final', '113', '/exhibit-assets/f1-113-112.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-114-113', 'Model the data', 'single', 'You have a Power BI model that contains a table named Employee. The table contains the following data.

Each employee has one manager as shown in the ParentEmployeeID column.

All reporting paths lead to the CEO at the top of the organizational hierarchy.

You need to create a calculated column that returns the count of levels from each employee to the CEO.

Which DAX expression should you use?', '["PATHLENGTH(PATH(Employee[EmployeeID],Employee[ParentEmployeeID]))","PATHITEM(PATH(Employee[EmployeeID],Employee[ParentEmployeeID]),1,INTEGER)","PATHCONTAINS(PATH(Employee[EmployeeID],Employee[ParentEmployeeID]),1)","PATH(Employee[EmployeeID],Employee[ParentEmployeeID])"]', '[0]', 'The Answer is A because the question instructs that we count the different levels of each employee. The
PathLength gives the result. For more information see the link https://learn.microsoft.com/en-

us/dax/pathlength-function-dax

Although for CEO it returns 1 - so I personally would substract 1 from this PATHLENGTH when creating the
report, as I think numbers of levels from CEO to CEO is 0, formanagaers directly under CEO it is 1 etc

Answer D is wrong because it only returns the items related to the current row value and does not give the
count.', 'Final', '114', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-115-114', 'Visualize and analyze the data', 'single', 'You have a Microsoft Power BI report. The size of PBIX file is 550 MB. The report is accessed by using an App

workspace in shared capacity of powerbi.com.

The report uses an imported dataset that contains one fact table. The fact table contains 12 million rows. The

dataset is scheduled to refresh twice a day at 08:00 and 17:00.

The report is a single page that contains 15 AppSource visuals and 10 default visuals.

Users say that the report is slow to load the visuals when they access and interact with the report.

You need to recommend a solution to improve the performance of the report.

What should you recommend?', '["Replace the default visuals with AppSource visuals.","Remove unused columns from tables in the data model.","Change the imported dataset to DirectQuery","Increase the number of times that the dataset is refreshed."]', '[1]', 'B is correct Removing unwanted columns from the data model is a good trick to improve the performance.

Understanding the Problem:

The Power BI report file is large (550 MB), and the dataset contains 12 million rows, which indicates potential
inefficiencies in the data model.

The report is slow to load visuals, which could be caused by the size and complexity of the data model or the
number of visuals used.

Why Option B Works:

Removing unused columns from the tables in the data model reduces the dataset''s size and memory
consumption.

A smaller dataset is easier to load and query, which improves report performance significantly.

Unused columns unnecessarily increase the memory footprint, processing time, and load time for visuals.

Why Other Options Are Incorrect:

A. Replace the default visuals with AppSource visuals:

AppSource visuals often have lower performance compared to default visuals because they can include
additional overhead for rendering.

Replacing default visuals with AppSource visuals would likely decrease performance, not improve it.

C. Change the imported dataset to DirectQuery:

Switching to DirectQuery can improve performance in specific cases where only a small amount of data is
queried at a time.

However, DirectQuery is dependent on the performance of the source system and can be slower for complex
queries or large datasets.

Since this report involves a large dataset (12 million rows) and frequent interactions, DirectQuery could
introduce additional latency.

D. Increase the number of times that the dataset is refreshed:

Dataset refresh frequency affects how up-to-date the data is but does not impact the performance of the
visuals loading in the report.

Since the issue is about visuals being slow to load, increasing refresh frequency would not solve the problem.

Key Recommendations for Performance Improvement:

Optimize the data model: Remove unused columns, reduce column cardinality, and use efficient data types.

Simplify visuals: Limit the number of visuals on a single page and avoid overusing AppSource visuals.

Aggregate data: Use summary tables or aggregate data in the fact table to reduce the data size and
complexity.

Enable query reduction options: Use options like disabling cross-highlighting to minimize the number of
queries sent to the model.

By addressing the size and complexity of the data model through Option B, you can improve performance
effectively without changing the dataset refresh strategy or visualization setup unnecessarily.', 'Final', '115', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-116-115', 'Prepare the data', 'single', 'You have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the

date and time each complaint occurred. The data in Logged is in the following format: 2018-12-31 at 08:59.

You need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.

What should you do?', '["Change the data type of the Logged column to Date.","Split the Logged column by using at as the delimiter.","Add a conditional column that outputs 2018 if the Logged column starts with 2018 and set the data type of the new column to Whole Number.","Apply the Parse function from the Date transformations options to the Logged column."]', '[1]', 'Split Logged using at, then verify the date part is trimmed and typed as Date. Splitting alone can leave text and does not by itself guarantee a built-in date hierarchy; Auto date/time and table eligibility also apply. The other offered actions do not explicitly normalize the stated nonstandard text format while preserving its full date.', 'Final', '116', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-117-116', 'Model the data', 'manual', 'HOTSPOT

-

You have the Power BI data model shown in the following exhibit.

You need to create a measure to count the number of product categories that had products sold during a selected

period.

How should you complete the DAX expression? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Distinctcount(''Product''[product category],

''sales''

We have to count the distinct number of categories in the product table and then use the filter ''sales'' so it will
return only those product categories with products sold.', 'Final', '117', '/dump-assets/f1-117-116-question.webp', '/dump-assets/f1-117-116-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-118-117', 'Model the data', 'single', 'You have a Microsoft Power BI report. The size of PBIX file is 550 MB. The report is accessed by using an App

workspace in shared capacity of powerbi.com.

The report uses an imported dataset that contains one fact table. The fact table contains 12 million rows. The

dataset is scheduled to refresh twice a day at 08:00 and 17:00.

The report is a single page that contains 15 AppSource visuals and 10 default visuals.

Users say that the report is slow to load the visuals when they access and interact with the report.

You need to recommend a solution to improve the performance of the report.

What should you recommend?', '["Enable visual interactions.","Change any DAX measures to use iterator functions.","Implement row-level security (RLS).","Remove unused columns from tables in the data model."]', '[3]', 'Remove unused columns from tables in the data model.

The question highlights that the Power BI report is slow to load, and the main challenges include:

A large dataset: The fact table contains 12 million rows, contributing significantly to the size of the model
(550 MB).

High visual complexity: The report uses 15 AppSource visuals and 10 default visuals on a single page,
further taxing system resources during rendering.

Why Option D is Correct:

Reducing Model Size:

Removing unused columns reduces the overall size of the data model, which directly improves performance
by reducing the amount of data Power BI needs to process.

Smaller model sizes result in faster data retrieval, rendering, and interactions within the report.

Power BI''s VertiPaq engine performs better with optimized models.

Focus on Optimization:

Unused columns increase storage and memory requirements but do not add value to the report.

By removing unnecessary columns, you improve the efficiency of compression and indexing, leading to faster
loading and improved performance.

Why Other Options Are Incorrect:

A. Enable visual interactions:

Enabling or disabling visual interactions has minimal impact on overall report performance. While controlling
interactions may improve user experience for complex visuals, it does not address the root cause of slow
loading (large dataset size and visual complexity).

B. Change any DAX measures to use iterator functions:

Using iterator functions (e.g., SUMX, AVERAGEX) instead of aggregate functions (e.g., SUM, AVERAGE)
typically increases computational overhead. This would likely worsen performance rather than improve it.

C. Implement row-level security (RLS):

RLS limits data access based on user roles but does not directly improve performance. It could even increase
processing time if filters are applied to a large dataset.', 'Final', '118', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-119-118', 'Prepare the data', 'manual', 'HOTSPOT

-

You have the Power BI data model shown in the following exhibit.

The Sales table has the following columns.

The data model must support the following analysis:

• Total sales by product by month in which the order was placed

• Quantities sold by product by day on which the order was placed

• Number of sales transactions by quarter in which the order was placed

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.', '[]', '[]', '1.Removing the LastUpdated column from the Sales table reduces the model size while still supporting the
required analysis.

Analysis:
The LastUpdated column is typically used for tracking record modifications and is not essential for sales

metrics analysis.
The required analysis focuses on sales metrics by product and order dates, so the absence of LastUpdated
does not hinder the analysis.
Conclusion: Yes, removing this column reduces the model size and does not impact the required analysis.

2. Removing the ProductID column from the Sales table reduces the model size while still supporting the
required analysis.

Analysis:
The ProductID column is a key column that links the Sales table to the Product table, allowing analyses by
product.
Without ProductID, it would be impossible to perform analyses such as total sales, quantity sold, or number of
transactions by product, which is part of the requirement.
Conclusion: No, removing this column would break critical relationships and prevent the required analysis.

3. Removing the ShipDate column from the Sales table reduces the model size while still supporting the
required analysis.

Analysis:
The analysis requirements specify that metrics are based on order dates, not shipping dates.
Since ShipDate is not required for the specified analyses, it can be removed without affecting the ability to
perform the required analysis.
Conclusion: Yes, removing this column reduces the model size and does not impact the required analysis.', 'Final', '119', '/dump-assets/f1-119-118-question.webp', '/dump-assets/f1-119-118-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-120-119', 'Prepare the data', 'single', 'You have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the

date and time each complaint occurred. The data in Logged is in the following format: 2018-12-31 at 08:59.

You need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.

What should you do?', '["Create a column by example that starts with 2018-12-31 and set the data type of the new column to Date","Create a column by example that starts with 2018-12-31","Apply a transformation to extract the last 11 characters of the Logged column","Add a conditional column that outputs 2018 if the Logged column starts with 2018 and set the data type of the new column to Whole Number"]', '[0]', 'Create a column by example that starts with 2018-12-31 and set the data type of the new column to Date

To analyze complaints by date and use a built-in date hierarchy, you need a column in the proper Date format.
The steps in option A fulfill this requirement effectively:

Create a column by example:

Power BI''s "Add Column by Example" feature allows you to create a new column based on patterns in the
existing data.

In this case, you provide an example of the desired output (2018-12-31), and Power BI automatically extracts
and formats the date part from the Logged column (2018-12-31 at 08:59).

Set the data type to Date:

The newly created column will contain only the date portion (2018-12-31).

Setting the data type to Date enables Power BI to recognize the column as a date, allowing the use of built-in
date hierarchies (e.g., Year, Quarter, Month, Day).

Why not the other options?

B. Create a column by example that starts with 2018-12-31:

This option omits the step of setting the data type to Date, which is required for using built-in date hierarchies.

C. Apply a transformation to extract the last 11 characters of the Logged column:

Extracting the last 11 characters (at 08:59) does not yield the date portion. This would result in incorrect or
incomplete data.

D. Add a conditional column that outputs 2018 if the Logged column starts with 2018 and set the data type
to Whole Number:

Creating a column with the year (2018) alone does not allow for detailed analysis by full date, nor does it
support built-in date hierarchies.', 'Final', '120', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-121-120', 'Manage and secure Power BI', 'single', 'You have a Power BI data model that contains a table named Employees. The table has the following columns:

•Employee Name

•Email Address

•Start Date

•Job Title

You are implementing dynamic row-level security (RLS).

You need to create a table filter to meet the following requirements:

•Users must see only their own employee data.

•The DAX expression must work in both Power BI Desktop and the Power BI service.

Which expression should you use?', '["[Email Address] - USERNAME()","[Employee Name] - USERPRINCIPALNAME()","[Employee Name] = USERNAME()","[Email Address] = USERPRINCIPALNAME()"]', '[3]', 'To implement dynamic row-level security (RLS) on the Employees table, a table filter must be created. The
table filter should be based on the user''s email address or user principal name (UPN), as these are unique
identifiers for each user.The DAX expression [Email Address] = USERPRINCIPALNAME() will filter the
Employees table to only show rows where the Email Address column matches the UPN of the current user.
This expression works in both Power BI Desktop and the Power BI service, and will ensure that each user only
sees their own employee data.', 'Final', '121', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-122-121', 'Manage and secure Power BI', 'manual', 'DRAG DROP

-

You have the Power BI data model shown in the following exhibit.

The Country table contains the following data.

You create two row-level security (RLS) roles named Manager and CFO.

You plan to publish the dataset to the Power BI service.

You need to create DAX expressions for the RLS filters. The solution must meet the following requirements:

•Each manager must see only the data in the Sales and Human Resources tables for their own country.

•The CFO must be prevented from seeing the data in the Human Resources table.

•The CFO must see the sales data of all countries.

How should you complete the DAX expressions to meet the requirements? To answer, drag the appropriate

expressions to the correct targets. Each expression may be used once, more than once, or not at all. You may need

to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.', '[]', '[3,1]', 'Reviewed answer: Human Resources = FALSE(); Country = [Email] = USERPRINCIPALNAME(). FALSE() prevents the CFO from seeing any Human Resources rows while leaving Sales unrestricted. The Country expression identifies the signed-in manager, and the active relationships propagate that country filter to Sales and Human Resources.', 'Final', '122', '/dump-assets/f1-122-121-question.webp', '/dump-assets/f1-122-121-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-123-122', 'Prepare the data', 'multi', 'You have a Power BI data model that imports data from a Microsoft Excel spreadsheet.

You use Power Query to load a query that contains both renamed and custom columns.

Later, you attempt to reload the query and receive the following error message.

Expression.Error: The column ''Category'' of the table wasn''t found.

What are two possible causes of the error? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.', '["The column was removed from the source file.","The column was renamed in the source file.","The file is no longer in the specified location.","The data type of the column was changed."]', '[0,1]', 'When Power Query attempts to reload the data, it follows the steps defined in the query. If it cannot locate a
column referenced in the query, it generates the error:

"Expression.Error: The column ''Category'' of the table wasn''t found."

A. The column was removed from the source file

If the Category column is deleted from the Excel source file, Power Query cannot find it, resulting in the error.
Removing a column breaks the query steps that depend on that column.

Correct

B. The column was renamed in the source file

If the column Category is renamed in the source file, Power Query will still search for the original name
specified in the query steps.
Since it cannot find the renamed column, the error occurs.

Correct

C. The file is no longer in the specified location

If the source file is moved or deleted, you would encounter a "File not found" error instead of a missing
column error.

Incorrect

D. The data type of the column was changed

Changing the data type of the Category column does not affect Power Query’s ability to locate the column.
It might result in a data type mismatch error, but it will not lead to the column not being found.

Incorrect', 'Final', '123', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-124-123', 'Model the data', 'single', 'You have a Power BI model that contains a table named Sales. The Sales table contains the following columns:

•Order Line ID

•Product ID

•Unit Price

•Order ID

•Quantity

Orders are uniquely identified by using the order ID and can have multiple order lines. Each order line within an

order contains a different product ID.

You need to write a DAX measure that counts the number of orders.

Which formula should you use?', '["Count(''Sales''[Order ID])","CountA(''Sales'' [Order ID])","CountRows(''Sales'')","DistinctCount(''Sales'' [Order ID])"]', '[3]', 'Orders are uniquely identified by using the order ID and can have multiple order lines" - I think the important
statement is "and can have multiple order lines" which means that the order ID can appear more than once in
the table if the order contains more than one products.', 'Final', '124', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-125-124', 'Model the data', 'manual', 'HOTSPOT

-

You are creating a Power BI model in Power BI Desktop.

You need to create a calculated table named Numbers that will contain all the integers from -100 to 100.

How should you complete the DAX calculation? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'To create a calculated table named Numbers in Power BI Desktop that contains all the integers from -100 to
100, you can use the following DAX calculation: Numbers = GENERATESERIES(-100, 100, 1)

The GENERATESERIES function generates a table of values that starts at the first argument (-100), ends at
the second argument (100), and increments by the third argument (1) in this case. The resulting table will
contain all the integers from -100 to 100 inclusive. The calculated table is named "Numbers" and is created by
assigning the output of the GENERATESERIES function to it using the "=" operator. No confusion, and no need
to discuss further', 'Final', '125', '/dump-assets/f1-125-124-question.webp', '/dump-assets/f1-125-124-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-126-125', 'Manage and secure Power BI', 'single', 'You have a Power BI data model that contains a table named Employees. The table has the following columns:

•Employee Name

•Email Address

•Start Date

•Job Title

You are implementing dynamic row-level security (RLS).

You need to create a table filter to meet the following requirements:

•Users must see only their own employee data.

•The DAX expression must work in both Power BI Desktop and the Power BI service.

Which expression should you use?', '["[Employee Name] = USERPRINCIPALNAME()","[Email Address] = USERNAME()","[Employee Name] = USERNAME()","[Email Address] = USERPRINCIPALNAME()"]', '[3]', 'The correct answer is D. [Email Address] = USERPRINCIPALNAME(). The expression checks the email address
of the currently logged-in user against the email address in the Employees table, which should be used as the
identifier for each employee. This will ensure that each user can only see their own employee data. The other
options may not work in all cases, as the username and user principal name may not always match the email
address used as the identifier.', 'Final', '126', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-127-126', 'Model the data', 'single', 'You have a Power BI model that contains a table named Date. The Date table contains the following columns:

•Date

•Fiscal Year

•Fiscal Quarter

•Month Name

•Calendar Year

•Week Number

•Month Number

•Calendar Quarter

You need to create a calculated table based on the Date table. The calculated table must contain only unique

combinations of values for Calendar Year, Calendar Quarter, and Calendar Month.

Which DAX function should you include in the table definition?', '["ADDCOLUMNS","CALCULATE","SUMMARIZE","DATATABLE"]', '[2]', 'SUMMARIZE SUMMARIZE:" Creates a summary of the input table grouped by the specified columns.
"ADDCOLUMNS:" Returns a table with new columns specified by the DAX expressions." Based on this, using
SUMMARIZE will give us the unique combination we want and don''t need to use DAX expressions to create
the calculated table.', 'Final', '127', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-128-127', 'Model the data', 'manual', 'HOTSPOT

-

You have a Power BI model that contains the following data.

The Date table relates to the Sales table by using the Date columns.

You need to create a calculated table that will contain the following:

•A row for each year

•A column that contains the total sales per year

How should you complete the DAX calculation? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'SUMMARIZE; Date[Year]. The source fields use Sales[Sale], so the completed expression is SUMMARIZE(Sales, Date[Year], "Sales", SUM(Sales[Sale])). Do not replace Sale with an invented SalesAmount column. This is a refresh-time calculated summary table, not a dynamic measure that recomputes its stored rows on every slicer change.', 'Final', '128', '/dump-assets/f1-128-127-question.webp', '/dump-assets/f1-128-127-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-129-128', 'Prepare the data', 'single', 'You use Power Query Editor to import and preview sales data from the years 2020 and 2021 in a Microsoft Excel

file as shown in the following exhibit.

You need to shape the query to display the following three columns:

•Month

•Sales

•Year

What should you select in Power Query Editor?', '["Merge columns","Transpose","Unpivot columns","Pivot column"]', '[2]', 'C is correct assuming we are selecting the "2020" and "2021" columns', 'Final', '129', '/exhibit-assets/f1-129-128.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-130-129', 'Model the data', 'manual', 'HOTSPOT

-

You are creating a Power BI model to analyze inventory.

You load data into three tables named Date, Product, and Inventory. The Inventory table relates to the Date and

Product tables by using one-to-many relationships.

Inventory data is recorded daily with no exceptions. The correct inventory quantity for a given product in a month is

the last recorded value for that month.

You need to write a DAX measure that will show the correct inventory value when a user analyzes inventory by

year, month, or date.

How should you complete the measure? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Calculate

Last Date

The problem requires calculating the last inventory count for a product in a given month, year, or date using
DAX. Let''s analyze the measure in the given image:

Measure: Last Inventory Count

CALCULATE is the correct function for modifying the filter context.
The SUM function aggregates the QuantityAvailable column in the Inventory table.
LastDate(''Date''[Date]) ensures that the measure evaluates the inventory count for the last date in the
context of the filter (month, year,
or date).

Explanation:

CALCULATE Function:
Purpose: Used to modify the filter context of a calculation.
In this case, it adjusts the calculation to consider only the last date in the filtered time period.
LastDate(''Date''[Date]):
Purpose: Returns the last date within the filter context.
In this case, it ensures the calculation retrieves the inventory count for the last date of the time period in the
current filter.
SUM(Inventory[QuantityAvailable]):
Purpose: Sums the inventory quantity for the date identified by LastDate.

Complete DAX Measure:

Last Inventory Count = CALCULATE( SUM(Inventory[QuantityAvailable]), LastDate(''Date''[Date]))

Why this is correct:

Requirement: The measure should return the last recorded inventory value for a product in a given time
period (year, month, or date).
Logic: CALCULATE modifies the filter context to focus on the last date, and SUM aggregates the inventory
quantity for that specific date.', 'Final', '130', '/dump-assets/f1-130-129-question.webp', '/dump-assets/f1-130-129-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-131-130', 'Model the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a Power BI report that imports a date table and a sales table from an Azure SQL database data source.

The sales table has the following date foreign keys:

•Due Date

•Order Date

•Delivery Date

You need to support the analysis of sales over time based on all three dates at the same time.

Solution: From the Fields pane, you rename the date table as Due Date. You use a DAX expression to create Order

Date and Delivery Date as calculated tables. You create active relationships between the sales table and each date

table.

Does this meet the goal?', '["Yes","No"]', '[0]', 'yes is a correct answer.

The solution works because creating separate calculated tables for Order Date and Delivery Date, along with
active relationships for all three date tables (Due Date, Order Date, Delivery Date), ensures simultaneous
analysis of sales over time without requiring complex DAX functions.', 'Final', '131', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-132-131', 'Model the data', 'manual', 'HOTSPOT

-

You are creating a Power BI report that will show the number of current employees over time. The report will use

Import storage mode for all tables.

The employment data will be imported from Azure SQL Database in a monthly snapshot. The data will be stored in

a table named Headcount and will contain the following:

•One row per employee for each month the employee is employed

•In each row, a date key that shows the first day of the month of each snapshot

You have a related date table that contains dates for the years 2020 to 2030.

You need to create a semi-additive DAX measure that will return the count of employees for the last available date

in a year, quarter, or month.

How should you complete the measure? To answer, select the appropriate options in the answer area.', '[]', '[]', 'Use CALCULATE(COUNTROWS(''Headcount''), LASTDATE(''Headcount''[DateKey])). The question specifies monthly snapshots keyed to the first day of each month. LASTDATE(''Date''[Date]) can pick month-end or a future calendar date with no snapshot, producing blank instead of the last available headcount. LASTDATE on the fact''s date-valued DateKey selects the latest snapshot date visible in the current period. COUNTROWS then counts one row per employee in that snapshot. This returns the latest snapshot within the selected period, not a carry-forward from an earlier period with no snapshot.', 'Final', '132', '/dump-assets/f1-132-131-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-133-132', 'Model the data', 'manual', 'HOTSPOT

-

You have a query named All Sales that imports sales data into a Power BI model.

You plan to create a star schema by separating columns into separate queries and performing further

transformations. The solution must meet the following requirements:

•Use All Sales as the source for three other queries named Sales Fact, Product Dimension, and Customer

Dimension.

•Minimize maintenance effort.

What should you do to create the Sales Fact query, and for which query should you clear Enable load? To answer,

select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Reference the All Sales query.

All Sales.

Reference is the most common way to replicate origninal query.

Clear "enable load" to "All Sales" cause the data of this query is now loaded to other table. It is not necessary
to load it to Report view anymore.

We are referencing All Sales for all three tables, and then we are clearing Enable load for All Sales to reduce
the data model and increase performance. Referencing will reduce maintenance because the three tables will
be derived from the original data and we can keep the transformations to the source data without having to
modify three queries.', 'Final', '133', '/dump-assets/f1-133-132-question.webp', '/dump-assets/f1-133-132-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-134-133', 'Model the data', 'single', 'You have a Power BI model that contains the following data.

The Date table relates to the Sales table by using the Date columns.

The model contains the following DAX measure.

Total Sales = SUM(Sales[Sale])

You need to create another measure named Previous Quarter to display the sales one quarter before the selected

period.

Which DAX calculation should you use?', '["CALCULATE ( [Total Sales], DATEADD (Date[Date], -1, QUARTER ) )","CALCULATE ( [Total Sales], DATESQTD (Date[Date] ) )","TOTALQTD ( [Total Sales], Date[Date] )","CALCULATE ( [Total Sales], PARALLELPERIOD (Date[Date], 1, QUARTER ) )"]', '[0]', 'Use CALCULATE([Total Sales], DATEADD(Date[Date], -1, QUARTER)). Negative one shifts the current period one quarter backward. The offered PARALLELPERIOD uses positive 1, which shifts forward, not backward; with date-column input it also expands to full quarters. DATESQTD and TOTALQTD calculate quarter-to-date, not the previous quarter.', 'Final', '134', '/exhibit-assets/f1-134-133.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-135-134', 'Model the data', 'single', 'You have a Microsoft Power BI report. The size of PBIX file is 550 MB. The report is accessed by using an App

workspace in shared capacity of powerbi.com.

The report uses an imported dataset that contains one fact table. The fact table contains 12 million rows. The

dataset is scheduled to refresh twice a day at 08:00 and 17:00.

The report is a single page that contains 15 AppSource visuals and 10 default visuals.

Users say that the report is slow to load the visuals when they access and interact with the report.

You need to recommend a solution to improve the performance of the report.

What should you recommend?', '["Change any DAX measures to use iterator functions.","Implement row-level security (RLS).","Replace the default visuals with AppSource visuals.","Split the visuals onto multiple pages."]', '[3]', 'Correct answer is D:Split the visuals onto multiple pages.

Issue with Performance:

The report contains 15 AppSource visuals and 10 default visuals on a single page. This increases the
rendering and loading time because Power BI needs to load all visuals simultaneously when the page is
opened.

AppSource visuals, in particular, can be slower because they often require more resources compared to
default visuals.

Why splitting visuals onto multiple pages improves performance:

By splitting the visuals across multiple pages, Power BI will only load and render the visuals for the currently
viewed page. This reduces the memory and processing demand when interacting with the report.

Why other options are not correct:

A. Change any DAX measures to use iterator functions: Iterator functions (SUMX, AVERAGEX, etc.) are
typically slower than column-based aggregations like SUM or AVERAGE. This could further degrade
performance.

B. Implement row-level security (RLS): RLS is designed to restrict data access based on user roles, but it
does not improve the performance of loading visuals.

C. Replace the default visuals with AppSource visuals: AppSource visuals are often more resource-intensive
than default visuals, so this would likely worsen performance.', 'Final', '135', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-136-135', 'Model the data', 'single', 'You are reviewing a Power BI data model.

You have a calculated table that has the following definition.

ProductList = INTERSECT ( ProductsGroupA, ProductsGroupB )

You need to identify the results of the DAX expression.

Which rows will be returned in ProductList?', '["all the rows in ProductsGroupB that have a matching row in ProductsGroupA","all the rows in both tables","all the rows in ProductsGroupA that have a matching row in ProductsGroupB","all the rows in ProductsGroupA that have no matching row in ProductsGroupB."]', '[2]', 'all the rows in ProductsGroupA that have a matching row in ProductsGroupB.

The DAX function INTERSECT returns the common rows between two tables based on their matching values.

How INTERSECT Works:

It compares two tables (in this case, ProductsGroupA and ProductsGroupB).

Only rows that exist in both tables are returned in the result.

Key Characteristics:

It performs an inner join-like operation between the two tables.

The result includes rows that are identical in both tables (based on column values).

Why the Answer is C:

The calculated table ProductList will include all rows from ProductsGroupA where there is a matching row in
ProductsGroupB.

Why Other Options Are Incorrect:

A. All the rows in ProductsGroupB that have a matching row in ProductsGroupA:

This is close, but it implies the result is based only on ProductsGroupB. The result actually includes rows that
match in both tables, regardless of the source table.

B. All the rows in both tables:

This describes a UNION, not an INTERSECT. INTERSECT only includes rows that exist in both tables.

D. All the rows in ProductsGroupA that have no matching row in ProductsGroupB:

This describes an EXCEPT operation, not an INTERSECT.', 'Final', '136', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-137-136', 'Model the data', 'single', 'You have a Power BI data model that contains two tables named Sales and Date. The Sales table contains three

measures named Order Quantity, Product Cost, and Sales Amount.

You need to create the visual shown in the following exhibit.

In which section of the Fields well should you place the measures?', '["Columns","Rows","Values","Drill through"]', '[2]', 'Place the measures in Values. A matrix can show measure labels on rows through the Show on rows formatting setting; a field parameter is not required merely to obtain that layout. Rows and Columns hold grouping fields, while Values evaluates measures in each intersection context.', 'Final', '137', '/exhibit-assets/f1-137-136.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-138-137', 'Prepare the data', 'manual', 'HOTSPOT

-

You have Power BI report that contains the fields shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'To replace all the implicit DAX measures used in the visual:

Correct Answer: Two explicit measures
Implicit measures (e.g., sum, average) are created automatically when fields are added to visuals. To replace
these, explicit measures must be created manually using DAX. If the visual uses two implicit measures, two
explicit measures are required to replace them.

To change how the Product Cost field is aggregated in additional visuals:

Correct Answer: Summarization setting
The summarization setting controls how numeric fields are aggregated (e.g., sum, average, count). Adjusting
this setting changes the default aggregation for the field across all visuals.', 'Final', '138', '/dump-assets/f1-138-137-question.webp', '/dump-assets/f1-138-137-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-139-138', 'Model the data', 'single', 'You have a Power BI model that contains a table named Employees. The table contains the following columns:

•Employee ID

•First Name

•Last Name

•Department

•Salary

Each employee is uniquely identified by using Employee ID.

You need to create a DAX measure that will calculate the average salary of all the employees in the sales

department.

Which DAX expression should you use?', '["DISTINCTCOUNT(‘Employees’[Salary])","CALCULATE(DISTINCTCOUNT(‘Employees’[Salary]), ‘Employees’[Department] = “Sales”)","CALCULATE(AVERAGE(‘Employees’[Salary]), ‘Employees’[Department] = “Sales”)","AVERAGE(‘Employees’[Salary])"]', '[2]', 'CALCULATE(AVERAGE(‘Employees’[Salary]), ‘Employees’[Department] = “Sales”).

A. DISTINCTCOUNT(''Employees''[Salary])

This counts distinct salary values, not the average, so it doesn''t meet the requirement.

B. CALCULATE(DISTINCTCOUNT(''Employees''[Salary]), ''Employees''[Department] = "Sales")

This counts distinct salary values within the Sales department, but the requirement is to calculate the
average, not the count. Therefore, it''s incorrect.

C. CALCULATE(AVERAGE(''Employees''[Salary]), ''Employees''[Department] = "Sales")

Correct answer.

This uses CALCULATE to filter the Employees table to only include those in the Sales department, and
AVERAGE computes the average salary of the filtered employees.

D. AVERAGE(''Employees''[Salary])

This calculates the average salary for all employees, not just those in the Sales department, so it doesn''t meet
the requirement.

Why C is the Correct Answer:

CALCULATE is needed to modify the filter context of the calculation, limiting it to employees in the Sales
department (''Employees''[Department] = "Sales").

AVERAGE calculates the average salary for the filtered dataset.

In summary, C is the correct solution because it filters the data for the Sales department and calculates the
average salary, which is exactly what the question asks for.', 'Final', '139', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-140-139', 'Prepare the data', 'single', 'You use Power Query Editor to preview a query that contains sales order data in the following columns:

•Tax Amount

•Sales Order ID

•Freight Amount

•Subtotal Amount

•Total Item Quantity

The Sales Order ID column uniquely identifies each sales order. The Subtotal Amount and Total Item Quantity

columns are always populated, but the Tax Amount and Freight Amount columns are sometimes null when an

order has no associated amount.

You need to query the data to identify the following metrics by month:

•The average item quantity per order

•The average freight amount per order

•The maximum item quantity per order

How should you modify the query?', '["In the Total Item Quantity column, replace the null values with 0.","In the Tax Amount column, remove rows that contain null values.","In the Freight Amount column, remove rows that contain null values.","In the Freight Amount column, replace the null values with 0."]', '[3]', 'In the Freight Amount column, replace the null values with 0.

To calculate the required metrics, we need to handle null values appropriately, especially for the Freight
Amount column, as it can affect the average and other calculations.

Required Metrics:

Average item quantity per order:

This requires all rows to be included, even if Tax Amount or Freight Amount is null. The Total Item Quantity
column is always populated, so no changes are needed here for this metric.

Average freight amount per order:

To calculate the average correctly, you need to ensure that any missing Freight Amount is considered as 0
instead of being excluded.

Replacing null values in Freight Amount with 0 allows this metric to reflect the intended values and ensures
accurate averaging, as nulls would otherwise be ignored in the calculation.

Maximum item quantity per order:

The Total Item Quantity column is always populated, so we don''t need to worry about null values in this column.
This metric is not affected by the handling of null values in Freight Amount or Tax Amount.

Why Other Options Are Incorrect:

A. In the Total Item Quantity column, replace the null values with 0:

The Total Item Quantity column is always populated, so this step is unnecessary and wouldn''t address any
issue.

B. In the Tax Amount column, remove rows that contain null values:

The Tax Amount column is not required for the requested metrics (average item quantity per order, average
freight amount per order, and maximum item quantity per order). Removing rows with null Tax Amount values
is unnecessary for these calculations.

C. In the Freight Amount column, remove rows that contain null values:

Removing rows with null Freight Amount values would exclude orders with no freight amount, which is
incorrect. Instead, replacing null values with 0 ensures all orders are considered in the calculation of the
average freight amount.', 'Final', '140', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-141-140', 'Prepare the data', 'manual', 'DRAG DROP

-

You use Power Query Editor to import three tables named Customers, Address, and Country.

In the source system, not every customer has a related address, but every address has a related country.

You need to merge all the tables into a single query. The solution must optimize query refresh performance.

Which type of join should you use for each merge operation? To answer, drag the appropriate join types to the

correct operations. Each join type may be used once, more than once, or not at all. You may need to drag the split

bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.', '[]', '[2,0]', '1. Join Customers with Address: Left Outer.

A Left Outer Join includes all records from the "Customers" table and matches records from the "Address"
table. If no match is found, the result still includes the customer but with NULL values for the unmatched
address fields.

This is suitable when you want to ensure that all customers are included in the result, even if they don''t have
an associated address.

2. Join Address with Country: Inner.

An Inner Join includes only the records where there is a match between the "Address" and "Country" tables.

This is suitable when you want to show only those addresses that have a valid and matching country.', 'Final', '141', '/dump-assets/f1-141-140-question.webp', '/dump-assets/f1-141-140-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-142-141', 'Prepare the data', 'single', 'You have a Power BI semantic model that contains four queries named Query 1, Query2. Query3, and Query4.

Query1 loads customer data into the model and is referenced by the other three queries.

You discover that data refresh for the model is slow.

You need to improve the data refresh time. The solution must minimize costs.

What should you do?', '["Run the Table.buffer function in Query1.","Duplicate Query1 to all the other queries.","Reconfigure Query1 as a dataflow entity.","From the Power BI Admin portal, increase the Capacity settings."]', '[2]', 'Corrected answer: C, reconfigure Query1 as a dataflow entity. Microsoft documents this same Query1/Query2/Query3/Query4 scenario: Table.Buffer only buffers within one query execution and does not eliminate additional retrieval by independently evaluated referencing queries. Buffering can add memory work and prevent downstream folding. A dataflow persists source preparation for reuse. Choose an option supported by the existing license; Gen2 and legacy dataflows have different licensing requirements. Do not claim every dataflow is free or every buffer improves performance.', 'Final', '142', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-143-142', 'Prepare the data', 'manual', 'HOTSPOT

-

You have an organization dimension named DimOrganizations.

You have four related tables as shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'It is a snowflakeschema and DimOrgSubVertical is the only table that supports a hierarchy model for
DimOrgVertical

A degenerate dimension refers to a dimension key in a fact table that does not have its own dimension table.

Junk Dimension is a dimension table in a data warehouse that combines several low cardinality flags and
indicators to improve the efficiency of queries.

A role-playing dimension refers to a single dimension table that is utilized multiple times within a fact table,
each time representing a different logical role or perspective.

The one in the exhibit is a SNOWFLAKE SCHEMA (not dimension) as the fact table is related to dim tables
which can be linked to other dim tables.

DimOrgSubVertical is the only table supporting hierarchy model for DimOrgVertical (DimOrganization could
support hierarchy for DimSubVrtical)', 'Final', '143', '/dump-assets/f1-143-142-question.webp', '/dump-assets/f1-143-142-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-144-143', 'Model the data', 'manual', 'HOTSPOT

-

You have a Power BI semantic model that contains a table named Opportunity.

The Opportunity table contains a column named Qualification. The Qualification column contains values between 0

and 1.

You need to build a new measure to score the opportunities on a scale of low. medium, and high.

How should you complete the DAX formula? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Use the conventional nested IF, then HIGH and MEDIUM. Values exactly 0.5 and 0.7 are MEDIUM with the shown strict comparisons. IF.EAGER can produce the same labels but forces eager branch evaluation, for which no need is stated; the item is not unique by output alone. The template also refers directly to Opportunity[Qualification] although it calls the result a measure: define the single-opportunity scalar context or use a calculated column rather than assuming an unaggregated column works in every measure context.', 'Final', '144', '/dump-assets/f1-144-143-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-145-144', 'Prepare the data', 'single', 'You have a Power BI semantic model that connects to a streaming data source. The data source is updated

frequently.

You need to create a Power BI report that meets the following requirements:

•Supports real-time analytics

•Minimizes performance impact on the data source

•Displays the most recent data without performing a data refresh

Which connectivity mode should you use for the dataset?', '["DirectQuery mode","import mode","LiveConnect mode","push mode"]', '[0]', 'Live connection and DirectQuery comparisonhttps://learn.microsoft.com/en-us/power-bi/connect-
data/service-live-connect-dq-datasetsLive connection is a method that lets you build a report in Power BI
Desktop without having to build a semantic model for it. The semantic model can dynamically request data
from a data source it''s connected to using a method called DirectQuery.When using DirectQuery, your report
uses Data Analysis Expression (DAX) queries to get data. After the semantic model receives the report''s DAX
query, it generates another set of queries that are run on your data source, to get the required data. From this
I am concluding use DirectQuery.', 'Final', '145', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-146-145', 'Model the data', 'manual', 'HOTSPOT

-

You have a Power BI semantic model that contains a table named Item. The Item table contains a column named

Quantity.

You need to create a DAX query that meets the following requirements:

•The rank of items must be calculated according to the values in Quantity.

•Ranking must NOT be skipped if two or more items have the same value in Quantity.

•If an item is unfiltered, the total of Quantity must display a blank value.

How should you complete the DAX formula? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'HASONEVALUE; DENSE. Dense ranks 100,100,90 as 1,1,2 instead of the Skip result 1,1,3. HASONEVALUE checks one distinct item in context, not the literal presence of a direct filter or whether a visual is at a row level; a total can also have one item. The shown [Quantity] needs to be a valid scalar measure or aggregation, even though the prompt only describes a Quantity column. Use an appropriate aggregate measure when applying the formula.', 'Final', '146', '/dump-assets/f1-146-145-question.webp', '/dump-assets/f1-146-145-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-147-146', 'Prepare the data', 'manual', 'HOTSPOT

-

You use Power Query Editor to pull data from a Microsoft SharePoint Online list.

You plan to use Advanced Editor to build a Power Query M formula language query.

You need to create a query that loads the data, expands a column named location, and hides a column named

CountryOrRegion from the dataset.

How should you complete the query? To answer, select the appropriate options in the answer area.

NOTE: Each correct answer is worth one point.', '[]', '[]', 'Table.ExpandRecordColumn.

Expands the "Location" column, which contains record values, into a new column called
"Location.DisplayName".

This transformation flattens complex nested records so you can access their fields directly in table form.

Table.RemoveColumns.

Removes the "CountryOrRegion" column from the dataset.

This is common when cleaning up data by eliminating unnecessary or redundant fields.', 'Final', '147', '/dump-assets/f1-147-146-question.webp', '/dump-assets/f1-147-146-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-148-147', 'Prepare the data', 'manual', 'HOTSPOT

-

You have a Power BI semantic model that contains two tables as shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Single; delete the many-to-one relationship is the offered first step to remove the competing active path. Making that relationship inactive is another normal approach, but is not an option. Deletion alone does not finish the configuration: activate the intended relationship and configure/test cross-filtering and security-filter propagation. A bidirectional ordinary relationship setting must not be confused with the separate security filtering behavior.', 'Final', '148', '/dump-assets/f1-148-147-question.webp', '/dump-assets/f1-148-147-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-149-148', 'Model the data', 'multi', 'You create a Power BI report named Summary1.

You discover that Summary1 is slow.

You run Performance analyzer to identify performance metrics for Summary1.

Which two metrics display the execution duration in Performance analyzer? Each correct answer present part of

the solution.

NOTE: Each correct answer is worth one point.', '["Top Operations","DAX query","Server requests","Dependencies","Visual display"]', '[1,4]', 'B.DAX query.

E.Visual display.

Dax and Visual Display from https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-
performance-analyzer . Excerpt from the link: Each visual''s log information includes the time spent (duration)
to complete the following categories of tasks:

DAX query - If a DAX query was required, this is the time between the visual sending the query and Analysis
Services returning the results.

Visual display - This is the time required for the visual to draw on the screen, including the time required to
retrieve any web images or geocoding.

Other - This is the time required by the visual for preparing queries, waiting for other visuals to complete, or
performing other background processing.

Evaluated parameters (preview) - This is the time spent evaluating the field parameters within a visual. Learn
more about field parameters (preview).', 'Final', '149', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-150-149', 'Manage and secure Power BI', 'single', 'You have a Microsoft 365 subscription that contains the resources shown in the following table.

You create a new dashboard that uses row-level security (RLS) filters. You define a new role named Consultants.

To which resource can you assign the Consultants role?', '["Group2","Team1","Sales reports","Group1"]', '[0]', 'Correct answer is A:Group2.

A. Group 2. Per Microsoft Learn, here''s why:

"You can use the following groups to set up row-level security:

Distribution Group

Mail-enabled Group

Microsoft Entra Security Group

Note that Microsoft 365 groups aren''t supported and can''t be added to any roles."

https://learn.microsoft.com/en-us/fabric/security/service-admin-row-level-security

Because of this, it should be Group 2.', 'Final', '150', '/exhibit-assets/f1-150-149.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-151-150', 'Model the data', 'single', 'You have a Power BI model that contains two tables named Sales and Date. The Sales table relates to the Date

table by using a many-to-one relationship. The Sales table contains the following columns:

•Date

•Product

•SalesAmount

You need to create a DAX measure for a rolling 31-day sales total that will return the total sales amount for a

selected date and the previous 30 days.

Which DAX expression should you use?', '["CALCULATE(SUM(Sales[SalesAmount]), DATEADD(Date[Date], -30, DAY))","CALCULATE(SUM(Sales[SalesAmount]), DATESBETWEEN(Date[Date], Max(''Date''[Date])-30, Max(''Date''[Date])))","CALCULATE(SUM(Sales[SalesAmount]), DATESMTD(Date[Date]))","CALCULATE(SUM(Sales[SalesAmount]), DISTINCTCOUNT(Date[Date]) = 31)"]', '[1]', 'CALCULATE(SUM(Sales[SalesAmount]), DATESBETWEEN(Date[Date], Max(''Date''[Date])-30,
Max(''Date''[Date])))

DATESBETWEEN creates a continuous range of dates from the selected date back 30 days. So option B is
more suitable for calculating a rolling 31-day total because it correctly defines the date range needed for the
calculation.

The DATESBETWEEN function defines a range of dates:

From MAX(Date[Date]) - 30 (30 days before the selected date)

To MAX(Date[Date]) (the selected date).

This correctly captures all dates in the 31-day rolling window.

why not Dateadd:

The DATEADD function shifts the entire date context backward by 30 days.

This means the calculation will consider only the values on dates exactly 30 days ago and not the entire
rolling range of 31 days.', 'Final', '151', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-152-151', 'Prepare the data', 'single', 'You publish a semantic model to the Power BI service. The semantic model contains data from the following data

sources:

•Source1: A Microsoft Excel file stored in Microsoft OneDrive for Business

•Source2: An Azure SQL database on a virtual network

•Source3: A public website

Which data sources require an on-premises data gateway?', '["Source1 only","Source2 only","Source3 only","Source1 and Source2 only","Source2 and Source3 only","Source1, Source2, and Source3"]', '[1]', 'Source2 only is the intended source classification: private Azure SQL connectivity needs an accessible private-network gateway path, unlike cloud OneDrive and a supported public website connection in the stated scenario. An on-premises gateway can run on a VM with network access to Azure SQL. A VNet data gateway is also a supported alternative under suitable conditions; do not claim the installed on-premises gateway is the only possible architecture. A locally synchronized OneDrive file path is different from the cloud connector.', 'Final', '152', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-153-152', 'Prepare the data', 'manual', 'HOTSPOT

-

You have a Power BI semantic model named ModelA that contains the following columns:

All of the columns use the Text data type.

Based on the model, you create a report named ReportA that contains the following columns:

•OrderID

•OrderDate

•CustomerID

•ShippingAddress

ReportA is the only report connected to ModelA.

You discover that ReportA has performance issues caused by the size of ModelA.

What should you do to optimize and reduce the size of ModelA? To answer, select the appropriate options in the

answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', '1) Changing data type from text to whole number. Explanation: Queries using numerical data types can
execute faster than those using text data.

2) Delete the OrderTitle and OrderDescription columns. Explanation: Directly reduces the model size without
affecting analysis.

https://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction', 'Final', '153', '/dump-assets/f1-153-152-question.webp', '/dump-assets/f1-153-152-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-154-153', 'Prepare the data', 'multi', 'You have a Power BI semantic model that contains two queries.

You discover that a report based on the model has performance issues.

You plan to use Power Query to reduce the data loaded to the model.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct answer is worth one point.', '["Apply group by and summarize techniques.","Combine the queries by using Append.","Remove unnecessary columns and rows.","Combine the queries by using Merge.","Create a new query group."]', '[0,2]', 'A. Apply Group By and Summarize Techniques: Aggregating data reduces its size and complexity, improving
model performance.

C. Remove Unnecessary Columns and Rows: Eliminating unused data minimizes the memory and processing
power needed.

Why Other Answers Are Incorrect:

B. Combine Queries by Using Append: This merges data, potentially increasing the dataset size.

D. Combine Queries by Using Merge: While useful for combining tables, it doesn’t necessarily reduce data
size.

E. Create a New Query Group: This organizes queries but does not directly impact performance or data
reduction.

Reference:

https://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction', 'Final', '154', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-155-154', 'Manage and secure Power BI', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have an on-premises data gateway.

You need to reduce the amount of data sent through the gateway by semantic models that run in Import storage

mode.

Solution: You create aggregations to summarize results.

Does this meet the goal?', '["Yes","No"]', '[1]', 'No for an additional model aggregation created after importing detail: the detail still crossed the gateway. If the question instead means source-side aggregation or a folded Power Query grouping loaded instead of detail, that can reduce transferred data. The source does not specify where summarization occurs, so keep this distinction explicit rather than teaching that aggregation can never reduce gateway traffic.', 'Final', '155', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-156-155', 'Manage and secure Power BI', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have an on-premises data gateway.

You need to reduce the amount of data sent through the gateway by semantic models that run in import storage

mode.

Solution: You increase Automatic page refresh intervals.

Does this meet the goal?', '["Yes","No"]', '[1]', '1) Nothing to do with On-Prem data gateway2) It can be used with DirectQuery storage mode only.

https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-automatic-page-refresh', 'Final', '156', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-157-156', 'Manage and secure Power BI', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have an on-premises data gateway.

You need to reduce the amount of data sent through the gateway by semantic models that run in import storage

mode.

Solution: You configure incremental refresh.

Does this meet the goal?', '["Yes","No"]', '[0]', 'Yes: incremental refresh can reduce transferred data by refreshing recent partitions rather than the entire historical import. It does not necessarily retrieve only individually changed rows: partitions within the refresh window may be fully reloaded, and detecting changes is an additional setting. RangeStart/RangeEnd restrictions must reach the source through folding or an equivalent supported filter for the intended network saving. The initial refresh can load the historical range, and changes outside the refresh window need a suitable policy.', 'Final', '157', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-158-157', 'Manage and secure Power BI', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have an on-premises data gateway.

You need to reduce the amount of data sent through the gateway by semantic models that run in Import storage

mode.

Solution: You decrease the dashboard cache update frequency.

Does this meet the goal?', '["Yes","No"]', '[1]', 'The dashboard cache update frequency determines how often Power BI refreshes the dashboard visuals from
the dataset. Adjusting this frequency does not directly reduce the amount of data sent through the on-
premises data gateway for semantic models in Import storage mode.', 'Final', '158', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-159-158', 'Model the data', 'manual', 'HOTSPOT

-

You have a Power BI semantic model named Model1.

You need to create a measure that will display the sales result for all blue units. The solution must maintain the

existing filter context.

How should you complete the DAX expression? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Independent correction: CALCULATE and KEEPFILTERS. CALCULATE evaluates the scalar [Sales] measure in a modified filter context. KEEPFILTERS intersects the blue-unit condition with the existing filter context. CALCULATETABLE is invalid here because its first argument must return a table.', 'Final', '159', '/dump-assets/f1-159-158-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-160-159', 'Model the data', 'single', 'You have a Power BI semantic model named Model1 that runs in Import storage mode.

You need to reduce the size of Model1. The solution must NOT increase report query response times.

What should you do?', '["Remove unnecessary columns.","Unpivot unnecessary columns.","Rename unnecessary columns.","Change Model1 to DirectQuery storage mode."]', '[0]', 'Remove unnecessary columns after checking reporting, calculation, relationship and security dependencies. Renaming does not remove stored values. Unpivot is not automatically a size reduction or increase; its result depends on shape, cardinality and compression. DirectQuery avoids a full local import but can add source/network latency, so it does not guarantee unchanged report response times.', 'Final', '160', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-161-160', 'Model the data', 'multi', 'You have a Power BI semantic model named Model1 that runs in Import storage mode.

You need to reduce the size of Model1.

Which two actions should you perform? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.', '["Summarize the detail data.","Upgrade to Power BI premium.","Implement row-level security (RLS).","Optimize the column data types.","Change the active relationships between tables to inactive relationships."]', '[0,3]', 'A. Summarize the detail data:Since Import mode loads the entire dataset into memory, reducing the amount of
detail data (for example, aggregating granular data like daily sales into monthly or yearly totals) can
significantly reduce the size of the model in memory. This approach helps minimize memory usage and
improves query performance.D. Optimize the column data types:In Import mode, data is compressed and
optimized by the VertiPaq storage engine. Using more efficient column data types reduces memory
consumption and ensures better compression when the data is loaded into memory. For instance, using
integer or decimal data types instead of string can help achieve better compression and optimize
performance.

https://learn.microsoft.com/en-us/power-bi/connect-data/service-dataset-modes-understand.', 'Final', '161', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-162-161', 'Model the data', 'multi', 'You have a Power BI semantic model that contains the following data.

You need to create a solution that meets the following requirements:

•Presents transaction amount totals for each month for the current and prior year

•Follows the star schema modeling approach

•Minimizes the data model size

Which three actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.', '["Create one-to-many relationships between the tables.","In the Transactions query, delete the TransactionID column.","In the Date query, group by MonthNumber.","In the Transactions query, group by AccountID and MonthStartDate for TransactionDate. Aggregate by summing the TransAmt column.","In the Transactions query, add a column that contains the MonthStartDate value for TransactionDate.","Create many-to-many relationships between the tables."]', '[0,3,4]', 'A. Create one-to-many relationships between the tables.

The star schema modeling approach involves creating one-to-many relationships between fact tables and
dimension tables. This ensures an efficient and scalable data model, which is essential for optimizing query
performance and maintaining data integrity.

D. In the Transactions query, group by AccountID and MonthStartDate for TransactionDate. Aggregate by
summing the TransAmt column.

Grouping by AccountID and MonthStartDate and then aggregating by summing the TransAmt column reduces
the number of rows in the fact table. This significantly minimizes the data model size while still providing the
necessary transaction amount totals for each month.

E. In the Transactions query, add a column that contains the MonthStartDate value for TransactionDate.

Adding a column that contains the MonthStartDate value for TransactionDate allows for efficient grouping
and aggregation of transactions by month. This is crucial for presenting transaction amount totals for each

month for the current and prior year, meeting the requirement for time-based analysis.', 'Final', '162', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-163-162', 'Model the data', 'manual', 'HOTSPOT

-

You have a Power BI semantic model that contains three tables named Products, OrderHistory, and Date.

The Products table is a dimension table that contains the following columns:

•ProductID

•ProductName

The OrderHistory table is a fact table that contains the following columns:

•OrderID

•ProductID

•OrderDate

The Date table is a dimension table that contains the following columns:

•Year

•Date

•Week

•Month

You need to define a relationship from Products to OrderHistory and from OrderHistory to Date.

Which cardinality should you configure? To answer, select the appropriate options in the answer area.

NOTE: Each correct answer is worth one point.', '[]', '[]', 'Independent correction:

Products (1) → OrderHistory (*).

Date (1) → OrderHistory (*).

A dimension key is unique, while many fact rows can reference the same product or date. A date appearing once in each fact row does not make the relationship one-to-one.', 'Final', '163', '/dump-assets/f1-163-162-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-164-163', 'Model the data', 'matching', 'You have a Power BI semantic model.

You need to create a column that will contain year-over-year (YOY) revenue. The column must contain a ratio

of change factor compared to the previous year''s monthly revenue.

How should you complete the DAX formula? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.Source limitation: the saved original omits the DAX formula. This version is adapted into matching named function roles below, not recovered original blank positions.', '["NEXTYEAR","PARALLELPERIOD","PREVIOUSYEAR","SAMEPERIODLASTYEAR","CALCULATE","DIVIDE","FACT","SUM"]', '[3,5]', 'The original PDF omits the complete DAX template. This adapted matching version identifies the date-set role as SAMEPERIODLASTYEAR and the ratio role as DIVIDE. It does not recover the original numerator or blank order. Growth factor Current/Prior differs from growth rate (Current-Prior)/Prior; both may use DIVIDE. The source calls the result a column, but lacks enough context to validate a specific calculated-column implementation.', 'Final', '164', NULL, NULL, NULL, '["Prior-year date-set function inside CALCULATE","Function that returns the year-over-year ratio"]', '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-165-164', 'Prepare the data', 'manual', 'HOTSPOT

-

You use Microsoft Power BI Desktop to review the data shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Auto date/time; the MonthEndDate date hierarchy from the Data table. Marking the custom date table removes the relevant automatic hierarchy rather than deleting Data or MonthStartDate. The chosen key must meet date-table criteria; repeated month-end dates are not a unique daily key. Repair visuals or DAX based on a removed hierarchy. Do not generalize this to removal of every automatic calendar elsewhere in the model.', 'Final', '165', '/dump-assets/f1-165-164-question.webp', '/dump-assets/f1-165-164-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-166-165', 'Model the data', 'manual', 'HOTSPOT

-

You have a Power BI semantic model that contains two tables named Sales and Forecast. Both tables contain a

date column.

You need to create a calculated table that will cover the range of dates in both tables.

How should you complete the DAX expression? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'CALENDAR; MINX; MAXX fit CALENDAR(MINX(Sales,[Date]), MAXX(Forecast,[Date])). It covers both tables only if Sales supplies the earliest date and Forecast the latest. For arbitrary ranges, take the minimum across both tables and the maximum across both, and handle empty tables. The source template does not establish correct bounds for every dataset.', 'Final', '166', '/dump-assets/f1-166-165-question.webp', '/dump-assets/f1-166-165-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-167-166', 'Model the data', 'single', 'You have a Power BI semantic model named Model1 that contains two tables named DimDate and FactSales. There

is an active relationship between DimDate and FactSales. DimDate is marked as the date table. FactSales contains

the following data.

Model1 contains the following measure.

Previous Year Sales = CALCULATE([Sales Amount], PREVIOUSYEAR(''Date''[Date]))

You have a report that uses Model1. The report has a single report page that has a page level filter set to May 9,

2024. The result of the Previous Year Sales measure is displayed in a card visual.

Which value will appear in the card visual?', '["10","15","35","60"]', '[3]', '60 under the intended date-table context. Recovered original rows: May 9 2024:10; May 9 2023:15; May 1 2023:20; May 29 2023:25. PREVIOUSYEAR selects the entire prior year: 15+20+25=60, not the same-day 15. The source calls the date table DimDate but references Date; reconcile that name and use a date-dimension filter. The old explanation substituted different row dates and amounts and is not a transcription of the exhibit.', 'Final', '167', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-168-167', 'Prepare the data', 'multi', 'You have a Power BI query named Expenses that imports the following data.

Users only use the date portion of the TransactionDate value when performing data analysis.

You need to minimize the model size without affecting the analysis.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.', '["Change the data type of the TransactionDate column to Date.","Change the data type of the PostDate column to Date.","Remove the PostDate column.","Remove the TransactionID column."]', '[0,2]', 'Intended selections: convert TransactionDate to Date and remove unused PostDate. Type conversion removes time precision; display formatting alone does not. PostDate is the ledger-posting timestamp, not equal to TransactionDate in the sample. Removing it assumes no required analysis or dependency uses posting time. The prompt does not fully establish TransactionID dependencies, so do not claim deleting that identifier is impossible or always wrong.', 'Final', '168', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-169-168', 'Model the data', 'single', 'You have a Power BI semantic model that contains two tables named DimCustomer and FactOrderDetails.

The primary key of DimCustomer is CustomerID.

FactOrderDetails contains a column named CustomerID that can be used to relate to DimCustomer. Multiple rows

in FactOrderDetails possibly have the same CustomerID value.

You need to create a relationship from FactOrderDetails to DimCustomer. The solution must optimize query

performance.

What should you create?', '["an active, single-direction, many-to-one relationship","an inactive, single-direction, one-to-many relationship","an active, single-direction, one-to-many relationship","an active, bi-directional, many-to-one relationship"]', '[0]', 'A. an active, single-direction, many-to-one relationship:

active: Good.

single-direction: Good for performance.

many-to-one: The cardinality is correct if viewed from FactOrderDetails to DimCustomer. However, standard
Power BI nomenclature often describes it as "one-to-many" from DimCustomer to FactOrderDetails. This is
technically correct in terms of which column is the "many" side of the foreign key and which is the "one" side
of the primary key.', 'Final', '169', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-170-169', 'Model the data', 'single', 'You have a Power BI model that contains a table named Expenses. The table contains the following columns:

•Date

•Amount

•Category

•Expense ID

•Employee ID

Expenses are recorded by employees, and each expense has a unique expense ID.

You need to create a DAX measure that will calculate the total amount of expenses.

Which DAX expression should you use?', '["Sum(‘Expenses’[Amount])","Max(‘Expenses’[Amount])","Sum(‘Expenses’[Expense ID])","Count(‘Expenses’[Amount])"]', '[0]', 'A. Sum(‘Expenses’[Amount]).

This adds up all the values in the [Amount] column, which is exactly what you want when calculating total
expenses.', 'Final', '170', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-171-170', 'Model the data', 'manual', 'HOTSPOT

-

You have a Power BI report with the Edit relationship page open as shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Not be filtered; a BLANK for the unmatched value when that row is shown. The active relationship is Table1 (one) to Table2 (many), Single, so filtering Table2 does not propagate back by default. SM exists only in Table1; an included SM row has no corresponding Table2 code. Actual row visibility can depend on visual fields and Show items with no data. Missing text is not NaN or an automatic calculation error.', 'Final', '171', '/dump-assets/f1-171-170-question.webp', '/dump-assets/f1-171-170-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-172-171', 'Model the data', 'manual', 'HOTSPOT

-

You have a semantic model named Model1 that contains the following tables.

There is an active relationship between SaleDate and Date.

There is an inactive relationship between ShippingDate and Date.

You need to create a new measure that will display the total amount of sales and support slicing by ShippingDate.

How should you complete the DAX expression? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'CALCULATE.

CALCULATE is used to modify the filter context of a measure.

In this case, you''re changing the default date relationship used in filtering sales.

USERELATIONSHIP.

It''s common in models to have multiple date columns (like OrderDate, ShipDate), but only one active
relationship is allowed at a time. Others must be activated via USERELATIONSHIP.', 'Final', '172', '/dump-assets/f1-172-171-question.webp', '/dump-assets/f1-172-171-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-173-172', 'Prepare the data', 'single', 'You have a query in Power Query Editor that contains the following data.

You need to transform the data to appear as shown in the following table.

What should you do?', '["Split the Classes column into rows by using a delimiter.","Unpivot the Classes column.","Extract the text between delimiters in the Classes column.","Convert the Classes column into a list."]', '[0]', 'A. Split the Classes column into rows by using a delimiter.

Transform tab > Split Column > By Delimiter > Advanced Options > Split into Rows

Why the other options are incorrect:

B. Unpivot the Classes column

Unpivot is used when you have multiple columns that you want to turn into attribute-value rows — not for
splitting within a single column.

C. Extract the text between delimiters

Extracting grabs one portion (e.g., first item), but it doesn’t handle multiple values per row.

D. Convert to a list

Converting to a list might be useful in code, but not helpful for data shaping in the UI unless used inside a
custom function.', 'Final', '173', '/exhibit-assets/f1-173-172.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-174-173', 'Model the data', 'single', 'You have a Microsoft Fabric eventhouse named Eventhouse1 that contains high-velocity and high-volume data

from IoT devices.

Eventhouse1 can be queried to deliver data to reports in near-real-time (NRT).

You plan to use Power BI Desktop to create a report that will contain both historical and live data.

You need to connect to Eventhouse1. The solution must minimize development effort.

What should you do?', '["Build a composite model.","Use DirectQuery connectivity mode.","Use Import connectivity mode."]', '[1]', 'Independent correction: B. Use DirectQuery connectivity mode. Fabric Eventhouse/KQL data is designed for high-volume near-real-time analysis, and DirectQuery avoids importing the raw event stream. A composite model is unnecessary when the scenario does not require mixed sources or storage modes.', 'Final', '174', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-175-174', 'Model the data', 'single', 'You have a Power BI semantic model that contains the following tables.

You need to define a relationship from FactSales to DimProduct. The solution must ensure the fastest DAX query

performance.

Which cardinality should you use?', '["one-to-many","one-to-one","many-to-many","many-to-one"]', '[3]', 'D. many-to-one

In a typical star schema used in Power BI and other BI systems:

Fact tables (e.g., FactSales) contain many transactions or events.

Dimension tables (e.g., DimProduct) contain unique, descriptive data about a business entity (like products,
customers, etc.).', 'Final', '175', '/exhibit-assets/f1-175-174.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-176-175', 'Model the data', 'manual', 'DRAG DROP

-

You have a Power BI semantic model that contains two tables named Dim Location and Fact Deliveries. The

relationships between the tables are configured as shown in the following table.

The model contains one measure that has the following formula.

Deliveries = COUNTROWS(‘Fact Deliveries’)

You need to create a new measure that counts the number of deliveries based on the destination location.

How should you complete the DAX expression? To answer, drag the appropriate functions to the correct targets.

Each function may be used once, more than once, or not at all. You may need to drag the split bar between panes

or scroll to view content.

NOTE: Each correct selection is worth one point.', '[]', '[1,2]', 'CALCULATE; USERELATIONSHIP, targeting Location ID and Destination Location ID instead of active Origin. The schema says Dim Location but the printed formula says Location; reconcile the actual table name. USERELATIONSHIP uses the existing destination relationship for this calculation; it does not create a relationship or permanently change other measures.', 'Final', '176', '/dump-assets/f1-176-175-question.webp', '/dump-assets/f1-176-175-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-177-176', 'Prepare the data', 'manual', 'HOTSPOT

-

You import a Microsoft Excel spreadsheet into Power Query Editor and name the query Sales_Spreadsheet.

Sales_Spreadsheet contains the following columns:

•Customer ID

•Customer Name

•Date

•Total Sales Amount

You plan to use the Sales Spreadsheet query to load two tables named Customer and Sales into the associated

semantic model. The tables relate to each other on the Customer ID column of each query. The solution must meet

the following requirements:

•The Customer query must contain the Customer ID and Customer Name columns.

•The Sales query must contain the Customer ID, Date, and Total Sales Amount columns.

•Power Query logic must be consolidated to avoid the duplication of logic across the queries and ensure that only

one location is used to update the logic.

You need to identify how to create the Sales query, and what to do to the Sales_Spreadsheet query before loading

the model?

What should you do? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Reference Sales_Spreadsheet; disable its load to the model. Reference centralizes logic; disabling staging load avoids an extra model table. Neither guarantees one source evaluation or shared caching across queries. Deleting staging breaks references. Excluding report refresh is a different setting, not a substitute for disabling load or a guarantee dependent queries never evaluate source steps.', 'Final', '177', '/dump-assets/f1-177-176-question.webp', '/dump-assets/f1-177-176-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-178-177', 'Model the data', 'manual', 'HOTSPOT

-

You have a semantic model that has the relationships shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Independent correction: DimDate is a role-playing dimension. The active OrderDate relationship is the default filter path from DimDate to FactOrderDetails. ShippedDate and RequiredDate remain inactive unless a measure activates them with USERELATIONSHIP.', 'Final', '178', '/dump-assets/f1-178-177-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-179-178', 'Prepare the data', 'manual', 'HOTSPOT

-

You use Power Query Editor to ingest data into Power BI Desktop.

The total dataset contains 250,000 rows. All the rows match the format of the data as shown in the following

exhibit.

You need to optimize the data model size of the table.

Which type of data should you use for the Value column and the Datetime column? To answer, select the

appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Value: Whole number; Datetime: Date, assuming all fractional parts are zero and no non-midnight time is required. The .00 in 78000.00 is a zero fraction, not a time; 00:00:00.000 belongs to Datetime. A shared two-decimal format does not prove all 250,000 fractions are zero: inspect the full data before converting. Do not promise fixed byte savings independent of VertiPaq encoding and cardinality.', 'Final', '179', '/dump-assets/f1-179-178-question.webp', '/dump-assets/f1-179-178-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-180-179', 'Model the data', 'single', 'You have a Power BI semantic model that contains a table named Table1. Table1 runs in Import storage mode.

You need to update the model to change the storage mode of Table1 to DirectQuery.

What should you do?', '["Delete Table1, and then add the table to the model again in DirectQuery storage mode.","From Power Query Editor, duplicate the query for Table1.","From Model view, change the storage mode of Table1 to DirectQuery.","Add an aggregation table to the model."]', '[0]', 'For the ordinary locally authored Import-table workflow, re-add Table1 using a supported DirectQuery source. Preserve a backup, relationships, measures and visual dependencies before deletion. Duplicating the query or adding an aggregation does not convert storage mode. Current documentation notes version-control exceptions in web modeling and Desktop live editing for reversing earlier mode changes; avoid a universal claim about every editing environment.', 'Final', '180', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-181-180', 'Model the data', 'manual', 'HOTSPOT

-

You have a Power BI semantic model that contains the following tables.

All the tables use the same data source.

You need to reduce the number of limited relationships in the model by changing the storage mode of certain

tables. The solution must NOT affect the latency of the data.

Which storage mode should you select for the Customer and Geography tables? To answer, select the appropriate

options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Customer: Dual.

This setting allows the Customer table to be used flexibly:

In a report using only Import-mode tables → acts as Import

In a report with DirectQuery tables → acts as DirectQuery

Best used for dimension tables that relate to both Import and DirectQuery fact tables.

Improves performance by allowing cached queries when possible, and real-time when needed.

Geography: DirectQuery.

Always queries the source live.

Good for real-time reporting or when data is too large to import.

Can slow performance, especially with complex filters or large datasets.

Typically used for fact tables or frequently updated tables.', 'Final', '181', '/dump-assets/f1-181-180-question.webp', '/dump-assets/f1-181-180-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-182-181', 'Model the data', 'manual', 'HOTSPOT

-

You have a semantic model that contains a table named Sales. The table contains the following columns:

•Order ID

•Product ID

•Sales Date

•Sales Amount

You need to create a DAX measure that will return the total sales amount for the same dates from the previous

year.

How should you complete the measure? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'CALCULATE.

CALCULATE modifies the filter context of a measure.

It is required whenever you want to evaluate a measure in a different time period or filter scenario.

we are calculating the SUM of sales but applying a time shift.

SAMEPERIODLASTYEAR.

This function returns a table of dates for the same period in the previous year.

It works best when:

A proper date table is present and marked as a date table in the model.

The current filter context is on dates, months, quarters, etc.

It ensures accurate alignment even in cases like leap years or different month lengths.', 'Final', '182', '/dump-assets/f1-182-181-question.webp', '/dump-assets/f1-182-181-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-183-182', 'Model the data', 'manual', 'HOTSPOT

-

You have a Power BI semantic model that contains the following table named Employees.

An employee is considered active if the TermDate column for that employee contains no value.

You need to create a DAX measure that will count the number of active employees.

How should you complete the DAX expression? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'CALCULATE.

Changes the context in which the calculation is evaluated.

In this case, it''s counting employees under a specific condition.

IS BLANK.', 'Final', '183', '/dump-assets/f1-183-182-question.webp', '/dump-assets/f1-183-182-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-184-183', 'Model the data', 'single', 'You have a Power BI semantic model that has the tables and relationships shown in the following exhibit.

Which type of dimension is represented by Dim Address?', '["Type 2 slowly changing dimension (SCD)","junk dimension","role-playing dimension","degenerate dimension"]', '[0]', 'A. Type 2 slowly changing dimension (SCD)

A Dim Address table typically represents address-related information (e.g., street, city, state, zip, etc.)
associated with entities like customers, suppliers, or employees.

In real-world scenarios, addresses can change over time, and when you want to track historical changes (e.g.,
where a customer lived previously), you use a Type 2 Slowly Changing Dimension (SCD).', 'Final', '184', '/exhibit-assets/f1-184-183.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-185-184', 'Prepare the data', 'manual', 'DRAG DROP -

You have a Microsoft Excel spreadsheet that contains the data shown in the following table.

You plan to build a data model for a Power BI report.

You need to prepare the data so that it is available to the model in the format shown in the following table.

Which three actions should you perform in sequence in Power Query Editor? To answer, move the appropriate

actions from the list of actions to the answer area and arrange them in the correct order.

Select and Place:', '[]', '[0,3,2]', 'Step 1: Select the [Department] and [Stage] columns and unpivot the other columns.
We unpivot the School1, School2, School3, and the School4 columns.
You might want to unpivot data, sometimes called flattening the data, to put it in a matrix format so that all
similar values are in one column.
Example:

When you unpivot, you unpack the attribute-value pairs that represent an intersection point of the new
columns and re-orient them into flattened columns:
* Values (in blue on the left) are unpivoted into a new column (in blue on the right).
* Attributes (in green on the left) are unpivoted into a new column (in green on the right) and duplicates are
correspondingly mapped to the new Values column.
Step 2: Rename the [Attribute] column as [School] and the [Value] column as [Score[,
Step 3: Group by [Department] and [School] and..

Reference:
https://support.microsoft.com/en-us/office/unpivot-columns-power-query-0f7bad4b-9ea1-49c1-9d95-
f588221c7098', 'Final', '185', '/dump-assets/f1-185-184-question.webp', '/dump-assets/f1-185-184-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-186-185', 'Visualize and analyze the data', 'single', 'You have a report that contains a bar chart and a column chart. The bar chart shows customer count by customer

segment. The column chart shows sales by month.

You need to ensure that when a segment is selected in the bar chart, you see which portion of the total sales for

the month belongs to the customer segment.

How should the visual interactions be set on the column chart when the bar chart is selected?', '["highlight","filter","no impact"]', '[0]', 'In most visuals, highlighting doesn''t remove the unrelated data. Instead it highlights the related data. The rest
of the data remains visible but dimmed.

Note: By default, visualizations on a report page can be used to cross-filter and cross-highlight the other
visualizations on the page. For example, selecting a state on a map visualization highlights the column chart
and filters the line chart to display only data that applies to that one state.

Incorrect:

Not B: Filters remove all but the data you want to focus on.

Reference:

https://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-reports-filters-and-highlighting', 'Final', '186', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-187-186', 'Visualize and analyze the data', 'multi', 'A user creates a Power BI report named ReportA that uses a custom theme.

You create a dashboard named DashboardA.

You need to ensure that DashboardA uses the custom theme. The solution must minimize development effort.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.', '["Publish ReportA to Power BI.","From ReportA save the current theme.","Publish ReportA to the Microsoft Power BI Community theme gallery.","From DashboardA, create a custom theme.","From DashboardA, upload a JSON theme."]', '[1,4]', 'B. From ReportA save the current theme.

E. From DashboardA, upload a JSON theme.

B. From ReportA, save the current theme

Reason: Saving the custom theme in ReportA allows you to export and reuse it in other reports or dashboards.

E. From DashboardA, upload a JSON theme

Reason: Uploading the saved JSON theme from ReportA to DashboardA applies the custom theme to the
dashboard.

Why Other Options Are Incorrect:

A. Publish ReportA to Power BI

Publishing alone does not ensure the custom theme is reused in the dashboard.

C. Publish ReportA to the Microsoft Power BI Community theme gallery

This is unnecessary for applying the theme to a dashboard.

D. From DashboardA, create a custom theme

This would require extra effort to create a new theme instead of reusing the one from ReportA.

https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboard-themes

scroll down to part that says JSON themes', 'Final', '187', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-188-187', 'Visualize and analyze the data', 'single', 'You need to create a visualization that compares revenue and cost over time.

Which type of visualization should you use?', '["waterfall chart","stacked area chart","line chart","donut chart"]', '[2]', 'Line charts can have many different lines, for example both revenue and cost over time.

Reference:
https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-line-chart', 'Final', '188', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-189-188', 'Visualize and analyze the data', 'manual', 'HOTSPOT -

You have a report in Power BI Desktop.

You add a key influencers visual as shown in the exhibit. (Click the Exhibit tab.)

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: adding more fields to Explain By

Box 2: 3

0.30 instead of 0.10. A factor of 3 greater.

moving fields from explain to expand should not add any new factors in analysis

Reference:

https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers', 'Final', '189', '/dump-assets/f1-189-188-question.webp', '/dump-assets/f1-189-188-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-190-189', 'Visualize and analyze the data', 'single', 'You build a report to help the sales team understand its performance and the drivers of sales.

The team needs to have a single visualization to identify which factors affect success.

Which type of visualization should you use?', '["Key influencers","Line and clustered column chart","Q&A","Funnel chart"]', '[0]', 'The key influencers visual helps you understand the factors that drive a metric you''re interested in. It analyzes
your data, ranks the factors that matter, and displays them as key influencers. For example, suppose you want
to figure out what influences employee turnover, which is also known as churn. One factor might be
employment contract length, and another factor might be commute time.
When to use key influencers.
The key influencers visual is a great choice if you want to:
See which factors affect the metric being analyzed.
Contrast the relative importance of these factors. For example, do short-term contracts affect churn more
than long-term contracts?

Reference:
https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers', 'Final', '190', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-191-190', 'Visualize and analyze the data', 'manual', 'HOTSPOT -

You have a table that contains the following three columns:

City -

✑ Total Sales

✑ Occupation

You need to create a key influencers visualization as shown in the exhibit. (Click the Exhibit tab.)

How should you configure the visualization? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: Total Sales -

The key influencers visual helps you understand the factors that drive a metric you''re interested in, here Total
Sales. It analyses your data, ranks the factors that matter, and displays them as key influencers.

Box 2: Occupation -

Measures and summarized columns are automatically analysed at the level of the Explain by fields used.

Reference:

https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers', 'Final', '191', '/dump-assets/f1-191-190-question.webp', '/dump-assets/f1-191-190-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-192-191', 'Visualize and analyze the data', 'single', 'You are using the key influencers visual to identify which factors affect the quantity of items sold in an order.

You add the following fields to the Explain By field:

✑ Customer Country

✑ Product Category

✑ Supplier Country

✑ Sales Employee

✑ Supplier Name

✑ Product Name

✑ Customer City

The key influencers visual returns the results shown in the following exhibit.

What can you identify from the visual?', '["Customers in Austria order 18.8 more units than the average order quantity.","Customers in Boise order 20.37 percent more than the average order quantity.","Product Category positively influences the quantity per order.","Customers in Cork order lower quantities than average."]', '[0]', 'Average quantity of units is displayed.
Incorrect:
Not B: Average quantity of units is displayed, not percentage.

Reference:
https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers', 'Final', '192', '/exhibit-assets/f1-192-191.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-193-192', 'Visualize and analyze the data', 'multi', 'You have a report that contains four pages. Each page contains slicers for the same four fields.

Users report that when they select values in a slicer on one page, the selections are not persisted on other pages.

You need to recommend a solution to ensure that users can select a value once to filter the results on all the

pages.

What are two possible recommendations to achieve this goal? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.', '["Create a bookmark for each slicer value.","Replace the slicers with report-level filters.","Sync the slicers across the pages.","Replace the slicers with page-level filters.","Replace the slicers with visual-level filters."]', '[1,2]', 'C: You can sync a slicer and use it on any or all pages in a report.

B: You can set filters at three different levels for the report: visual-level, page-level, and report-level.

Note: Suppose you want your report readers to be able to look at overall sales metrics, but also highlight
performance for individual district managers and different time frames. You could create separate reports or
comparative charts. You could add filters in the Filters pane. Or you could use slicers. Slicers are another way
of filtering. They narrow the portion of the dataset that is shown in the other report visualizations.

Reference:

https://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-report-add-filter
https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers', 'Final', '193', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-194-193', 'Visualize and analyze the data', 'single', 'You have a report that includes a card visualization.

You need to apply the following conditional formatting to the card while minimizing design effort:

✑ For values that are greater than or equal to 100, the font of the data label must be dark red.

✑ For values that are less than 100, the font of the data label must be dark gray.

Which type of format should you use?', '["Color scale","Rules","Field value"]', '[1]', 'Finding the conditional formatting in the card visual is a bit tricky. There is no separate option for that. You
need to go to the Format tab of the visual, and then expand the Data Label. The right beside the Data Label''s
colour you need to hover your mouse, and you will find a three dots icon appearing, which if you click on it, you
will see Conditional Formatting.

Now in the Conditional Formatting tab, you can apply it in different methods. for example, you can choose
Rules, and then

The Rules mode will give you the ability to put custom roles as below;

Reference:
https://radacad.com/enhance-the-card-visual-in-power-bi-with-conditional-formatting', 'Final', '194', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-195-194', 'Visualize and analyze the data', 'manual', 'DRAG DROP -

You have a Power BI dashboard named DashboardA that contains a tile named TileA. TileA contains a treemap

visual from a report named ReportA.

You need to provide the users of DashboardA with additional tiles that relate to the contents of TileA.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.

Select and Place:', '[]', '[2,1,0]', '3>2>1

1. From DashboardA, select the TilaA options, and then select View Insights

2. From Focus mode, review the generated visuals

3.From Focus mode, pin the relevant visuals to DashboardA

Source: https://learn.microsoft.com/en-us/power-bi/consumer/end-user-insights', 'Final', '195', '/dump-assets/f1-195-194-question.webp', '/dump-assets/f1-195-194-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-196-195', 'Visualize and analyze the data', 'single', 'You are creating a dashboard by using the Power BI service.

You have an existing report page that contains three charts.

You need to add the charts to the dashboard while maintaining the interactivity between the charts.

What should you do?', '["Edit interactions in the report and set all interactions to Filter.","Pin each chart as a tile.","Edit the dashboard theme and pin each chart as a tile.","Pin the report page as a live tile."]', '[3]', 'One way to add a new dashboard tile is by pinning an entire report page. This is an easy way to pin more than
one visualization at a time. Also, when you pin an entire page, the tiles are live; you can interact with them
right there on the dashboard. And changes you make to any of the visualizations back in the report editor, like
adding a filter or changing the fields used in the chart, are reflected in the dashboard tile as well.
Pinning live tiles from reports to dashboards is only available in Power BI service (app.powerbi.com).

Reference:
https://docs.microsoft.com/en-us/power-bi/create-reports/service-dashboard-pin-live-tile-from-report', 'Final', '196', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-197-196', 'Visualize and analyze the data', 'manual', 'HOTSPOT -

You need to create a visual as shown in the following exhibit.

The indicator color for Total Sales will be based on % Growth to Last Year.

The solution must use the existing calculations only.

How should you configure the visual? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: Background color -
To apply conditional formatting, select a Table or Matrix visualization in Power BI Desktop. In the
Visualizations pane, right-click or select the down-arrow next to the field in the Values well that you want to
format. Select Conditional formatting, and then select the type of formatting to apply.

Box 2: Rules -
To format cell background or font color by rules, in the Format by field of the Background color or Font color
dialog box, select Rules.

Reference:
https://docs.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-table-formatting', 'Final', '197', '/dump-assets/f1-197-196-question.webp', '/dump-assets/f1-197-196-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-198-197', 'Visualize and analyze the data', 'manual', 'DRAG DROP -

You are using existing reports to build a dashboard that will be viewed frequently in portrait mode on mobile

phones.

You need to build the dashboard.

Which four actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.

Select and Place:', '[]', '[0,1,3,4]', 'Pin -> open -> edit -> rearrange

Step 1: Pin items from the reports to the dashboard

Step 2: Open the dashboard.

Open the dashboard to see the pinned live tile,

From the nav pane, select the dashboard with the new live tile. There, you can do things like rename, resize,
link, and move the pinned report page.

Step 3: Edit the dashboard mobile view

Open a report in Editing view.

Step 4: Rearrange, resize, or remove items from the mobile layout

Reference:

https://docs.microsoft.com/en-us/power-bi/create-reports/service-dashboard-pin-live-tile-from-report', 'Final', '198', '/dump-assets/f1-198-197-question.webp', '/dump-assets/f1-198-197-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-199-198', 'Model the data', 'single', 'You plan to create the chart shown in the following exhibit.

How should you create the dashed horizontal line denoting the 40th percentile of daily sales for the period shown?', '["Add a measure to the visual that uses the following DAX expression. Measure1 = PERCENTILEX.INC (Sales,sales[Total Sales],0.40)","Add a measure to the visual that uses the following DAX expression. Measure1 = PERCENTILEX.EXC (Sales,sales[Total Sales],0.40)","Add a new percentile line that uses Total Sales as the measure and 40% as the percentile.","Create a horizontal line that has a fixed value of 24,000."]', '[2]', 'The analytics feature enables you to show percentiles across groups specified along a specific axis.
1. Click on the analytics tab
2. Select Percentile

3. You can choose a specific percentile along with other formatting options.
4. Drag a date or non-numeric dimension into the Axis of a column chart

Reference:
https://www.dash-intel.com/powerbi/statistical_functions_percentile.php', 'Final', '199', '/exhibit-assets/f1-199-198.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-200-199', 'Prepare the data', 'multi', 'You are building a Power BI report.

Users will view the report by using their mobile device.

You need to configure the report to display data based on each user''s location.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.', '["From Power Query Editor, detect the data types of the relevant columns.","In Data Category, set the geographic data category for the relevant columns.","Create a hierarchy for columns of the geography data type.","Use the columns of the geography data type in all visuals.","For the relevant columns, set synonyms to match common geographical terms."]', '[1,3]', 'B: Identify geographic data in your report

1. In Power BI Desktop, switch to Data View Data View icon.

2. Select a column with geographic data " for example, a City column.

3. On the Modeling tab, select Data Category, then the correct category " in this example, City.

4. Continue setting geographic data categories for any other fields in the model.

D: Create visuals with your geographic data

Switch to Report view Report View icon, and create visuals that use the geographic fields in your data.

In this example, the model also contains a calculated column that brings city and state together in one
column.

Publish the report to the Power BI service.

Reference:

https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-mobile-geofiltering', 'Final', '200', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-201-200', 'Visualize and analyze the data', 'single', 'You have a report that contains a donut chart and a clustered column chart. Interactions between the visuals use

the default settings.

You need to modify the report so that when you select a column in the column chart, the donut chart redraws by

using the data from the selected column.

What should you do?', '["Select the donut chart and set the column chart interaction to Filter.","Select the column chart and set the donut chart interaction to Filter.","Select the donut chart and set the column chart interaction to None.","Select the column chart and set the donut chart interaction to None."]', '[1]', 'Filters remove all but the data you want to focus on.
Note: Enable the visual interaction controls.
1. Select a visualization to make it active.
2. Display the Visual Interactions options.
3. In Power BI Desktop, select Format > Edit interactions.

4. To display the visualization interaction controls, select Edit interactions. Power BI adds filter and highlight
icons to all of the other visualizations on the report page.
We can see that the tree map is cross-filtering the line chart and the map, and is cross-highlighting the
column chart. You can now change how the selected visualization interacts with the other visualizations on the
report page.

Reference:
https://docs.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions', 'Final', '201', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-202-201', 'Visualize and analyze the data', 'manual', 'HOTSPOT -

You have a report page that contains the visuals shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: not affect

Box 2: cross-filter -

The map has the cross-filter icon active.

"You can only cross-filter line charts, scatter charts, and maps. You can''t cross-highlight them" So Cross-filter
for the map

https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions?tabs=powerbi-
desktop

Reference:

https://docs.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions', 'Final', '202', '/dump-assets/f1-202-201-question.webp', '/dump-assets/f1-202-201-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-203-202', 'Visualize and analyze the data', 'single', 'You are creating a Power BI report by using Power BI Desktop.

You need to include a visual that shows trends and other useful information automatically. The visual must update

based on selections in other visuals.

Which type of visual should you use?', '["Q&A","smart narrative","key influencers","decomposition tree"]', '[1]', 'The smart narrative visualization helps you quickly summarize visuals and reports. It provides relevant
innovative insights that you can customize.
Use smart narrative summaries in your reports to address key takeaways, to point out trends, and to edit the
language and format for a specific audience. In
PowerPoint, instead of pasting a screenshot of your report''s key takeaways, you can add narratives that are
updated with every refresh. Your audience can use the summaries to understand the data, get to key points
faster, and explain the data to others.

Reference:
https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-smart-narrative', 'Final', '203', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-204-203', 'Visualize and analyze the data', 'single', 'In Power BI Desktop, you have a dataset that contains a table.

You create a table visual on a Power BI report page as shown in the following exhibit.

You need to configure the visual to display the referenced image instead of the URL in the Plant Image column.

What should you do?', '["From the Formatting tab, select Values, and then set URL icons to On for the table.","Set the Data category of the Plant Image field to Web URL.","Set the Data type of the Plant Image field to Binary.","Set the Data category of the Plant Image field to Image URL."]', '[3]', 'Add images to your report -
1. Create a column with the URLs of the images. See Considerations later in this article for requirements.
2. Select that column. On the Column tools ribbon, for Data category, select Image URL.
3. Add the column to a table, matrix, slicer, or multi-row card.
Step 3: From powerbi.com, add a tile for Excel1 dataset to DashboardA.
In the Power BI service (app.powerbi.com), a dashboard contains tiles pinned from one or more datasets, so
you can ask questions about any of the data contained in any of those datasets.

Reference:
https://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-images-tables
https://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-tutorial-q-and-a', 'Final', '204', '/exhibit-assets/f1-204-203.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-205-204', 'Visualize and analyze the data', 'manual', 'DRAG DROP -

You have a Microsoft Excel spreadsheet named Excel1 that contains survey results.

You have a Power BI dashboard named DashboardA that has Q&A enabled.

You need to ensure that users who can access DashboardA can ask questions based on the contents of Excel1 and

pin visuals based on their queries to

DashboardA. The solution must minimize development time.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.

Select and Place:', '[]', '[1,2,3]', 'Step 1: ["The solution must minimize development time", so:] format the data as a table

Step 2: From powerbi.com, import Excel1 as a dataset.

Step 3: From powerbi.com, add a tile for the Excel1 dataset to DashboarA.

Reference:

https://docs.microsoft.com/en-us/power-bi/create-reports/service-from-excel-to-stunning-report', 'Final', '205', '/dump-assets/f1-205-204-question.webp', '/dump-assets/f1-205-204-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-206-205', 'Model the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as

the axis. Salary is present in the data as a numerical amount representing US dollars.

You need to create a reference line to show which employees are above the median salary.

Solution: You create a constant line and set the value to .5.

Does this meet the goal?', '["Yes","No"]', '[1]', 'Instead: You create a percentile line by using the Salary measure and set the percentile to 50%.
The median is the middle value or the 50th percentile of a data set.

Reference:
https://dash-intel.com/powerbi/statistical_functions_median.php', 'Final', '206', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-207-206', 'Model the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as

the axis. Salary is present in the data as a numerical amount representing US dollars.

You need to create a reference line to show which employees are above the median salary.

Solution: You create an average line by using the Salary measure.

Does this meet the goal?', '["Yes","No"]', '[1]', 'Average is not Median.
Instead: You create a percentile line by using the Salary measure and set the percentile to 50%.
The median is the middle value or the 50th percentile of a data set.

Reference:
https://dash-intel.com/powerbi/statistical_functions_median.php', 'Final', '207', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-208-207', 'Model the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as

the axis. Salary is present in the data as a numerical amount representing US dollars.

You need to create a reference line to show which employees are above the median salary.

Solution: You create a percentile line by using the Salary measure and set the percentile to 50%.

Does this meet the goal?', '["Yes","No"]', '[0]', 'The median is the middle value or the 50th percentile of a data set.

Reference:

https://dash-intel.com/powerbi/statistical_functions_median.php', 'Final', '208', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-209-208', 'Prepare the data', 'manual', 'HOTSPOT -

You are profiling data by using Power Query Editor.

You have a table that contains a column named column1. Column statistics and Value distribution for column1 are

shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: are 20 values that occur -

There are 20 unique values.

Box 2: Elm, American -

Elm, American is below Peer, flowering species in the graphic.

“Distinct” means number of different values regardless how many times it appears in the dataset. A ''name''
appears in the list multiple times is counted as 1 distinct count.

Whereas, the “Unique” value is total number of values that only appear once.

Distinct mean : count all the values as 1, even if there was more than one.

Unique mean : count only the value that are not repeated in the particular column', 'Final', '209', '/dump-assets/f1-209-208-question.webp', '/dump-assets/f1-209-208-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-210-209', 'Visualize and analyze the data', 'single', 'You have a Power BI report hosted on powerbi.com that displays expenses by department for department

managers.

The report contains a line chart that shows expenses by month.

You need to enable users to choose between viewing the report as a line chart or a column chart. The solution must

minimize development and maintenance effort.

What should you do?', '["Enable report readers to personalize visuals.","Create a separate report page for users to view the column chart.","Add a column chart, a bookmark, and a button for users to choose a visual.","Create a mobile report that contains a column chart."]', '[0]', 'Also C is correct but I guess the key is ''The solution must minimize development'' so A should be the correct
one

Steps:

Let users personalize visuals in a report

Enable personalization in a report

You can enable the feature either in Power BI Desktop or the Power BI service. You can also enable it in
embedded reports.

To enable the feature in the Power BI (powerbi.com) service, go to Settings for your report.

Turn on Personalize visuals > Save.

Reference:

https://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-personalize-visuals?tabs=powerbi-
service#enable-personalization-in-a-report', 'Final', '210', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-211-210', 'Visualize and analyze the data', 'multi', 'You have two Power BI reports named ReportA and ReportB that each uses a distinct color palette.

You are creating a Power BI dashboard that will include two visuals from each report.

You need to use a consistent dark theme for the dashboard. The solution must preserve the original colors of the

reports.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.', '["Upload a snapshot.","For the browser, set the color preference to dark mode.","When pinning visuals to the dashboard, select Use destination theme.","Select the dark dashboard theme.","Turn on tile flow."]', '[2,3]', 'D: With dashboard themes you can apply a color theme to your entire dashboard, such as corporate colors,
seasonal coloring, or any other color theme you might want to apply. When you apply a dashboard theme, all
visuals on your dashboard use the colors from your selected theme.
In the dashboard pane that appears, select one of the pre-built themes. In the example below, we''ve selected
Dark.

C: Reports and dashboards with different themes
If your report uses a different theme from the dashboard theme, in most cases you can control whether the
visual retains the current report theme or uses the dashboard theme.
* Try re-pinning the tile and selecting Use dashboard theme.

Reference:
https://docs.microsoft.com/en-us/power-bi/create-reports/service-dashboard-themes', 'Final', '211', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-212-211', 'Prepare the data', 'manual', 'HOTSPOT -

You have a dataset that contains revenue data from the past year.

You need to use anomaly detection in Power BI to show anomalies in the dataset.

What should you configure? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: Line -

Anomaly detection is only supported for line chart visuals containing time series data in the Axis field.

Box 2: Populate the axis with a date field

Incorrect:

* Anomaly Explanations doesn''t work with ''Show Value As'' options.

* Drilling down to go to the next level in the hierarchy isn''t supported.

Reference:

https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-anomaly-detection', 'Final', '212', '/dump-assets/f1-212-211-question.webp', '/dump-assets/f1-212-211-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-213-212', 'Visualize and analyze the data', 'single', 'You have a line chart that shows the number of employees in a department over time.

You need to see the total salary costs of the employees when you hover over a data point.

What should you do?', '["Add salary to the drillthrough fields.","Add salary to the visual filters.","Add salary to the tooltips."]', '[2]', 'Customize tooltips with aggregation or quick measures
You can customize a tooltip by selecting an aggregation function.
Select the arrow beside the field in the Tooltips bucket. Then, select from the available options.

Note: Tooltips are an elegant way of providing more contextual information and detail to data points on a
visual. You can customize tooltips in Power BI Desktop and in the Power BI service.
When a visualization is created, the default tooltip displays the data point''s value and category.

Reference:
https://docs.microsoft.com/en-us/power-bi/create-reports/desktop-custom-tooltips', 'Final', '213', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-214-213', 'Visualize and analyze the data', 'single', 'You have the visual shown in the Original exhibit. (Click the Original tab.)

You need to configure the visual as shown in the Modified exhibit. (Click the Modified tab.)

What should you add to the visual?', '["a measure","an Average line","a trendline","a forecast"]', '[3]', 'For example, here''s how the current forecast looks like:

Reference:
https://spreadsheeto.com/power-bi-forecasting/#intro', 'Final', '214', '/exhibit-assets/f1-214-213.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-215-214', 'Visualize and analyze the data', 'single', 'You need to create a visual that enables the adhoc exploration of data as shown in the following exhibit.

Which type of visual should you use?', '["smart narrative","decomposition tree","Q&A","key influencers"]', '[1]', 'The decomposition tree visual in Power BI lets you visualize data across multiple dimensions. It automatically
aggregates data and enables drilling down into your dimensions in any order. It is also an artificial intelligence
(AI) visualization, so you can ask it to find the next dimension to drill down into based on certain criteria.
This makes it a valuable tool for ad hoc exploration and conducting root cause analysis.
Example:

Reference:
https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-decomposition-tree', 'Final', '215', '/exhibit-assets/f1-215-214.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-216-215', 'Prepare the data', 'single', 'Your company has employees in 10 states.

The company recently decided to associate each state to one of the following three regions: East, West, and North.

You have a data model that contains employee information by state. The model does NOT include region

information.

You have a report that shows the employees by state.

You need to view the employees by region as quickly as possible.

What should you do?', '["Create a new aggregation that summarizes by state.","Create a new aggregation that summarizes by employee.","Create a new group on the state column and set the Group type to List.","Create a new group on the state column and set the Group type to Bin."]', '[2]', 'In Power BI Desktop, you can group data points to help you more clearly view, analyze, and explore data and
trends in your visuals.
Example:

Incorrect:
Not D: You can also define the bin size to put values into equally sized groups that better enable you to
visualize data in ways that are meaningful. This action is often called binning.

Reference:
https://docs.microsoft.com/en-us/power-bi/create-reports/desktop-grouping-and-binning', 'Final', '216', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-217-216', 'Visualize and analyze the data', 'single', 'You have a collection of reports for the HR department of your company.

You need to create a visualization for the HR department that shows historical employee counts and predicts

trends during the next six months.

Which type of visualization should you use?', '["ribbon chart","scatter chart","line chart","key influencers"]', '[2]', 'The best data for forecasting is time series data or uniformly increasing whole numbers. The line chart has to
have only one line.

Reference:
https://powerbi.microsoft.com/fr-ca/blog/introducing-new-forecasting-capabilities-in-power-view-for-office-
365/', 'Final', '217', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-218-217', 'Visualize and analyze the data', 'single', 'You have a Microsoft Power BI dashboard. The report used to create the dashboard uses an imported dataset from

a Microsoft SQL Server data source.

The dashboard is shown in the exhibit. (Click the Exhibit tab.)

What occurred at 12:03:06 PM?', '["A new transaction was added to the data source.","The dashboard tile cache refreshed.","A user added a comment to a tile.","A user pressed F5."]', '[1]', 'A tile is a report visual pinned to a dashboard, and dashboard tile refreshes happen about every hour so that
the tiles show recent results. You can change the schedule in the dataset settings, as in the screenshot below,
or force a dashboard update manually by using the Refresh now option.

If you press F5 or hit the refresh button, the dashboard charts gets updated.

Note: Power BI enables you to go from data to insight to action quickly, yet you must make sure the data in
your Power BI reports and dashboards is recent.

Knowing how to refresh the data is often critical in delivering accurate results.

Reference:

https://docs.microsoft.com/en-us/power-bi/connect-data/refresh-data', 'Final', '218', '/exhibit-assets/f1-218-217.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-219-218', 'Visualize and analyze the data', 'manual', 'HOTSPOT -

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

Hot Area:', '[]', '[]', 'Box 1: 2 -
One for each visual.
Note: When you edit a report in Power BI Desktop and the Power BI service, you can add report bookmarks to
capture the current state of a report page.
Bookmarks save the current filters and slicers, cross-highlighted visuals, sort order, and so on. When others
view your report, they can get back to that exact state by selecting your saved bookmark.

Box 2: Display -
Users must be able to switch between the views by using buttons on the report page. The selected Chain field
must be maintained when switching between views.
You can select whether each bookmark will apply Data properties, such as filters and slicers; Display
properties, such as spotlight and its visibility; and Current page changes, which present the page that was
visible when the bookmark was added. These capabilities are useful when you use bookmarks to switch
between report views or selections of visuals, in which case you''d likely want to turn off data properties, so
that filters aren''t reset when users switch views by selecting a bookmark.
Note: When you create a bookmark, the following elements are saved with the bookmark:

The current page -

Filters -
Slicers, including slicer type (for example, dropdown or list) and slicer state
Visual selection state (such as cross-highlight filters)

Sort order -

Drill location -

Visibility of an object (by using the Selection pane)
The focus or Spotlight mode of any visible object

Reference:
https://docs.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks', 'Final', '219', '/dump-assets/f1-219-218-question.webp', '/dump-assets/f1-219-218-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-220-219', 'Model the data', 'single', 'You have the visual shown in the exhibit. (Click the Exhibit tab.)

You need to show the relationship between Total Cost and Total Sales over time.

What should you do?', '["Add a play axis.","From the Analytics pane, add an Average line.","Add a slicer for the year.","Create a DAX measure that calculates year-over-year growth."]', '[0]', 'When to use a slicer -

Slicers are a great choice when you want to:

Display commonly used or important filters on the report canvas for easier access.

Make it easier to see the current filtered state without having to open a drop-down list.

Filter by columns that are unneeded and hidden in the data tables.

Create more focused reports by putting slicers next to important visuals.

Note: Suppose you want your report readers to be able to look at overall sales metrics, but also highlight
performance for individual district managers and different time frames. You could create separate reports or
comparative charts. You could add filters in the Filters pane. Or you could use slicers. Slicers are another way
of filtering. They narrow the portion of the dataset that is shown in the other report visualizations.

Reference:

https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers', 'Final', '220', '/exhibit-assets/f1-220-219.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-221-220', 'Visualize and analyze the data', 'manual', 'HOTSPOT -

You have the Power BI dashboard shown in the Dashboard exhibit. (Click the Dashboard tab.)

You need to ensure that when users view the dashboard on a mobile device, the dashboard appears as shown in the

Mobile exhibit. (Click the Mobile tab.)

What should you do? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: Update Dashboard Mobile Layout

Box 2: Resize and move total sales and total quantity

Dashboard mobile feature already fits the tiles in the view, and when recreating same scenario you only need
to work on the 2 cards

If you use Report Mobile View feature from Power BI desktop, you will have an empty canvas and will need to
work on all tiles

Reference:

https://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-create-mobile-optimized-report-about', 'Final', '221', '/dump-assets/f1-221-220-question.webp', '/dump-assets/f1-221-220-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-222-221', 'Visualize and analyze the data', 'single', 'You are building a Power BI report to analyze customer segments.

You need to identify customer segments dynamically based on the Bounce Rate across dimensions such as source,

geography, and demographics. The solution must minimize analysis effort.

Which type of visualization should you use?', '["decomposition tree","funnel chart","Q&A","key influencers"]', '[3]', 'Independent correction: D. Key influencers. This AI visual ranks the factors that drive the selected metric and automatically discovers Top segments. A decomposition tree is better for interactive, user-led drill-down rather than automatic segment discovery.', 'Final', '222', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-223-222', 'Visualize and analyze the data', 'single', 'You have a table that contains sales data and approximately 1,000 rows.

You need to identify outliers in the table.

Which type of visualization should you use?', '["area chart","scatter plot","pie chart","donut chart"]', '[1]', 'Outlier Detection in Power BI using Funnel Plot, which is a scatter plot.
Outliers are those data points that lie outside the overall pattern of distribution & the easiest way to detect
outliers is though graphs. Box plots, Scatter plots can help detect them easily.

Reference:
https://towardsdatascience.com/this-article-is-about-identifying-outliers-through-funnel-plots-using-the-
microsoft-power-bi-d7ad16ac9ccc', 'Final', '223', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-224-223', 'Visualize and analyze the data', 'multi', 'You have a report that contains three pages. One of the pages contains a KPI visualization.

You need to filter all the visualizations in the report except for the KPI visualization.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.', '["Edit the interactions of the KPI visualization.","Add the same slicer to each page and configure Sync slicers.","Edit the interactions of the slicer that is on the same page as the KPI visualization.","Configure a page-level filter.","Configure a report-level filter."]', '[1,2]', 'Slicers are another way of filtering. They narrow the portion of the dataset that is shown in the other report
visualizations.
Control which page visuals are affected by slicers
Example: Use visual interactions to keep slicer selections from filtering this chart.
1. Go to the Overview page of the report, and then select the DM slicer you previously created.
2. On the Power BI Desktop menu, select the Format menu under Visual Tools, and then select Edit
interactions.
3. Filter controls, each with a Filter and a None option, appear above all the visuals on the page. Initially, the
Filter option is preselected on all the controls.
4. Select the None option in the filter control above the Total Sales Variance by FiscalMonth and District
Manager chart to stop the DM slicer from filtering it.
Incorrect:
Not D: A page-level filter is used to filter an entire page.
Not E: A report-level filter is used to filter an entire report.

Reference:
https://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-report-add-filter', 'Final', '224', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-225-224', 'Visualize and analyze the data', 'manual', 'HOTSPOT -

You have a Power BI visual that uses indicators to show values that are out of range as shown in the following

exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: a line -
Incorrect:
* not line and clustered column
The Line and Clustered Column Chart is a combo charts that combines the Line chart and Column chart
together in one visual. By combining these two visuals together, you can make a very quick comparison

between two sets of measures.

Box 2: anomaly detection -
Anomaly detection helps you enhance your line charts by automatically detecting anomalies in your time
series data. It also provides explanations for the anomalies to help with root cause analysis. With just a couple
of clicks, you can easily find insights without slicing and dicing the data.
Example:

Reference:
https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-anomaly-detection', 'Final', '225', '/dump-assets/f1-225-224-question.webp', '/dump-assets/f1-225-224-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-226-225', 'Visualize and analyze the data', 'single', 'You are creating a Power BI report to analyze consumer purchasing patterns from a table named Transactions. The

Transactions table contains a numeric field named Spend.

You need to include a visual that identifies which fields have the greatest impact on Spend.

Which type of visual should you use?', '["Q&A","smart narrative","decomposition tree","key influencers"]', '[3]', 'The key influencers visual helps you understand the factors that drive a metric you''re interested in. It analyzes
your data, ranks the factors that matter, and displays them as key influencers. For example, suppose you want
to figure out what influences employee turnover, which is also known as churn. One factor might be
employment contract length, and another factor might be commute time.

When to use key influencers -
The key influencers visual is a great choice if you want to:
See which factors affect the metric being analyzed.
Contrast the relative importance of these factors. For example, do short-term contracts affect churn more
than long-term contracts?

Reference:
https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers', 'Final', '226', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-227-226', 'Visualize and analyze the data', 'manual', 'HOTSPOT -

You are creating a line chart in a Power BI report as shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: an average reference line

With the Analytics pane in Power BI Desktop, you can add dynamic reference lines to visuals, and provide
focus for important trends or insights.

https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane

Box 2: Axis

The question is about drill-down and not drill-through.

https://radacad.com/drill-down-and-up-in-power-bi-explained

"For example, in the visual below I have Sales Amount as the Value of the column chart, and the Date field
(Order Date) as the X-Axis.

Date hierarchy in a Power BI visual

This will lead to seeing drill down/up buttons on the top of the visual (or at the bottom of it if the visual is
touched at the very top of the report)"

Reference:

https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane', 'Final', '227', '/dump-assets/f1-227-226-question.webp', '/dump-assets/f1-227-226-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-228-227', 'Visualize and analyze the data', 'single', 'You have a dashboard that contains tiles pinned from a single report as shown in the Original Dashboard exhibit.

(Click the Original Dashboard tab.)

You need to modify the dashboard to appear as shown in the Modified Dashboard exhibit. (Click the Modified

Dashboard tab.)

What should you do?', '["Change the report theme.","Change the dashboard theme.","Edit the details of each tile.","Create a custom CSS file."]', '[1]', 'With dashboard themes you can apply a color theme to your entire dashboard, such as corporate colors,
seasonal coloring, or any other color theme you might want to apply. When you apply a dashboard theme, all
visuals on your dashboard use the colors from your selected theme.
Incorrect:

Not A: With Power BI Desktop report themes, you can apply design changes to your entire report, such as
using corporate colors, changing icon sets, or applying new default visual formatting.

Reference:
https://docs.microsoft.com/en-us/power-bi/create-reports/service-dashboard-themes', 'Final', '228', '/exhibit-assets/f1-228-227.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-229-228', 'Visualize and analyze the data', 'single', 'You have a Power BI report. The report contains a visual that shows gross sales by date. The visual has anomaly

detection enabled.

No anomalies are detected.

You need to increase the likelihood that anomaly detection will identify anomalies in the report.

What should you do?', '["Increase the Expected range transparency setting.","Add a data field to the Legend field well.","Increase the Sensitivity setting.","Add a data field to the Secondary values field well."]', '[2]', 'C. Increase the sensitivity

If you increase the sensitivity, the algorithm is more sensitive to changes in your data. In that case, even a
slight deviation is marked as an anomaly. If you decrease the sensitivity, the algorithm is more selective on
what it considers an anomaly.

Reference:

https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-anomaly-detection', 'Final', '229', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-230-229', 'Visualize and analyze the data', 'single', 'You maintain a Power BI workspace that contains a supplier quality dashboard. The dashboard contains 10 card

visuals, two map visuals and five bar chart visuals.

The dashboard mobile layout is shown in the exhibit. (Click the Exhibit tab.)

You need to modify the dashboard mobile layout to meet the following requirements:

✑ Only show single-value visuals.

✑ Minimize scrolling.

What should you do?', '["Decrease the size of the card visuals. Remove the map and bar chart visuals.","Decrease the size of the map and bar chart visuals. Move all the card visuals to the top of the layout.","Remove the card visuals. Increase the size of the map and bar chart visuals.","Move the bar chart visuals to the top of the layout. Remove the map visuals. Decrease the size of the card visuals."]', '[0]', 'As the requirements, show only value, so A, remove map and charts.

Decreasing the size of card visuals will minimize the scrolling. Removing maps and chart visuals is a
requirement as they are non single-vlaue visuals', 'Final', '230', '/exhibit-assets/f1-230-229.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-231-230', 'Visualize and analyze the data', 'single', 'You have a Power BI report.

You have a table named Data1 that contains 10 million rows.

Data1 is used in the following visuals:

✑ A card that shows the number of records

✑ A bar chart that shows total transaction amount by territory

✑ A scatter plot that shows transaction amount and profit amount on the axes and points colored by territory

You need to modify the scatter plot to make it easier for users to identify meaningful patterns. The solution must

not affect the accuracy of the other visuals.

What should you do?', '["Add a count field of the transaction amount to the size bucket of the scatter plot.","Add a trend line to the scatter plot.","Enable high-density sampling on the scatter plot.","Apply a row filter to the Data1 query in Power Query Editor."]', '[2]', 'This question requires "modification" of the scatter plot and what high-density sampling essentially does is to
employ methods that capture and represent the underlying data more effectively and eliminates overlapping
points.

Remember that the table named Data1 contains 10 million rows. How do you represent all that data in a
scatter plot in a meaningful pattern for easy understanding and analysis? by use of high density sampling.

"By definition, high-density data is sampled to create visualizations reasonably quickly that are responsive to
interactivity. Too many data points on a visual can bog it down, and can detract from the visibility of trends".

This link explains it more: https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-high-density-
scatter-charts#how-high-density-scatter-charts-work', 'Final', '231', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-232-231', 'Visualize and analyze the data', 'multi', 'You have a Power BI workspace named Inventory that contains a dataset, a report, and a dashboard.

You need to add an additional tile to the dashboard. The tile must show inventory by location. This information is

NOT visualized in the report. The solution must minimize the impact on the report.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.', '["Ask a question by using Q&A.","Hide the report page.","Pin the visual to the dashboard.","Use quick insights on the dashboard.","Add the visual to the report."]', '[0,2]', 'In the Power BI service (app.powerbi.com), a dashboard contains tiles pinned from one or more datasets, so
you can ask questions about any of the data contained in any of those datasets. T

The answer to your question is displayed as an interactive visualization and updates as you modify the
question.

Open a dashboard and place your cursor in the question box. Even before you start typing, Q&A displays a
new screen with suggestions to help you form your question. You see phrases and complete questions
containing the names of the tables in the underlying datasets and may even see complete questions listed if
the dataset owner has created featured questions,

Reference:

https://docs.microsoft.com/en-us/power-bi/create-reports/power-bi-tutorial-q-and-a', 'Final', '232', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-233-232', 'Visualize and analyze the data', 'manual', 'HOTSPOT -

You have a dataset named Pens that contains the following columns:

✑ Item

✑ Unit Price

✑ Quantity Ordered

You need to create a visualization that shows the relationship between Unit Price and Quantity Ordered. The

solution must highlight orders that have a similar unit price and ordered quantity.

Which type of visualization and which feature should you use? To answer, select the appropriate options in the

answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: A scatter plot of Quantity Ordered and Unit Price by item
A scatter chart shows the relationship between two numerical values.
Note: Scatter charts are a great choice:
To show relationships between two numerical values.
To plot two groups of numbers as one series of x and y coordinates.
To use instead of a line chart when you want to change the scale of the horizontal axis.
To turn the horizontal axis into a logarithmic scale.

To display worksheet data that includes pairs or grouped sets of values.
To show patterns in large sets of data, for example by showing linear or non-linear trends, clusters, and
outliers.
To compare large numbers of data points without regard to time. The more data that you include in a Scatter
chart, the better the comparisons that you can make.
Box 2: Automatically find clusters
Scatter charts are a great choice:
* To show patterns in large sets of data, for example by showing linear or non-linear trends, clusters, and
outliers.

Reference:
https://github.com/Microsoft/powerbi-visuals-corrplot/', 'Final', '233', '/dump-assets/f1-233-232-question.webp', '/dump-assets/f1-233-232-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-234-233', 'Visualize and analyze the data', 'single', 'You have a Power BI report that contains three pages named Page1, Page2, and Page3. All the pages have the

same slicers.

You need to ensure that all the filters applied to Page1 apply to Page1 and Page3 only.

What should you do?', '["On each page, modify the interactions of the slicer.","Enable visibility of the slicers on Page1 and Page3. Disable visibility of the slicer on Page2.","Sync the slicers on Page1 and Page3."]', '[2]', 'C. Sync the slicers on Page1 and Page3.

Editing interactions is not securing any selection in any page will be replicated for the same slicer in other
pages.

Making visible or hiding slicers is also not impacting the selection in other pages (and it would be difficult
selecting anything in a hidden slicer).

Slicers 1&3 must be synced with equivalent slicers in all pages across the report

Syncing slicers across pages ensures that the filters applied on Page1 are automatically applied to Page3.
This allows the slicer selections to affect multiple pages simultaneously. By syncing slicers, you ensure that
the same filters are maintained across the desired pages while allowing for flexibility on other pages.

Why Other Options Are Incorrect:

A. Modify slicer interactions: This would require more manual setup, and you can''t fully control which pages
the slicer applies to without syncing.

B. Enable visibility on specific pages: This approach only affects visibility, not the slicer''s functionality across
pages.', 'Final', '234', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-235-234', 'Visualize and analyze the data', 'single', 'You have a Power BI report that contains five pages.

Pages 1 to 4 are visible and page 5 is hidden.

You need to create a solution that will enable users to quickly navigate from the first page to all the other visible

pages. The solution must minimize development and maintenance effort as pages are added to the report.

What should you do first?', '["Add a blank button to page 1.","Add a page navigation button to page 1.","Create a bookmark for each page.","Add a bookmark navigation button to page 1."]', '[1]', 'B is correct. Add a page navigation button to page 1 because the solution must minimize development and
maintenance effort as pages are added to the report. If we add more pages the report they will be
automatically added to the page navigator. Only thing is you have to change ''show hidden pages'' option to off.
But with the bookmark navigator, lot of efforts required to create individual bookmark to each page and also
the newly added pages manually. another problem is it also adds all other bookmarks to the navigator which
we dont need. so we should create a page navigator button in page 1(and set ''show hidden pages'' to off)', 'Final', '235', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-236-235', 'Visualize and analyze the data', 'single', 'You build a Power BI report that displays IoT temperature data streaming from a refrigerator.

You publish the report to the Power BI service.

You need to be notified when the temperature rises above four degrees Celsius.

What should you do?', '["Set an alert on a KPI visual in the report.","Pin a card visual to a dashboard and create a subscription.","Pin a card visual to a dashboard and set an alert on the tile.","Pin a report page to a dashboard and set an alert on the page."]', '[2]', 'You first have to pin a one-value visual to the dashboard (Card/KPI/Gauge) and then you can set an alert on it''s
value. You can''t set alerts on a report or whole report pages pinned to the dashboard.', 'Final', '236', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-237-236', 'Visualize and analyze the data', 'single', 'You have the dashboard shown in the following exhibit.

You need to modify the dashboard to display as shown in the following exhibit.

What should you do?', '["Create and apply a custom dashboard theme.","Change the colors of the visuals in the report.","Apply the Dark dashboard theme.","Upload a snapshot image of the dashboard."]', '[0]', 'The visual colors can''t be changed on the dashboard from a report after the visual has already been pinned.
Applying a dashboard custom theme will do it.', 'Final', '237', '/exhibit-assets/f1-237-236.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-238-237', 'Visualize and analyze the data', 'single', 'You need to create a Power BI theme that will be used in multiple reports. The theme will include corporate

branding for font size, color, and bar chart formatting.

What should you do?', '["From Power BI Desktop, customize the current theme.","From Power BI Desktop, use a built-in report theme.","Create a theme as a PBIVIZ file and import the theme into Power BI Desktop.","Create a theme as a JSON file and import the theme into Power BI Desktop."]', '[3]', 'D. Create a theme as a JSON file and import the theme into Power BI Desktop.

To create a Power BI theme that can be used across multiple reports and workspaces, the best approach
would be to create a theme as a JSON file and then import it into Power BI Desktop. This will allow you to
define the corporate branding for font size, color, and bar chart formatting in a single file, which can then be
easily imported into all the reports that require it.

To create a theme as a JSON file, you can use the built-in Theme Generator tool in Power BI or create the file
manually. Once you have the JSON file, you can import it into Power BI Desktop by going to the "Switch
Theme" menu and selecting "Import Theme." From there, you can select the JSON file and apply the theme to
the current report.

A seems to be correct but D is more complete solution, as you have to be able to use it in multiple reports. D
does not say how you create the JSON file, though. You can create it by customizing current theme in one of
the reports and then exporting it as JSON.', 'Final', '238', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-239-238', 'Visualize and analyze the data', 'single', 'You have a Power BI report that contains one page. The page contains two line charts and one bar chart.

You need to ensure that users can perform the following tasks for all three visuals:

• Switch the measures used in the visuals.

• Change the visualization type.

• Add a legend.

The solution must minimize development effort.

What should you do?', '["Create a bookmark for each acceptable combination of visualization type, measure, and legend in the bar chart.","Edit the interactions between the three visuals.","Enable personalization for the report.","Enable personalization for each visual."]', '[2]', 'Personalization can be enabled for each visual or the entire report. Here we have a single page report with 3
visuals and all three visuals need personalization, the answer is ''enable personalization for the entire report''
to minimize development efforts.

Enabling personalization allows users to modify the visuals in the report, including switching measures,
changing visualization types, and adding legends. This feature minimizes development effort by letting users

customize the visuals according to their preferences without requiring additional setup or bookmarks.

Why Other Options Are Incorrect:

A. Create a bookmark for each combination: This requires creating multiple bookmarks for all possible
combinations, increasing complexity.

B. Edit interactions between visuals: This helps with visual interactivity but doesn''t directly allow users to
change measures or types.

D. Enable personalization for each visual: This is not necessary as enabling personalization for the report
covers all visuals.', 'Final', '239', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-240-239', 'Model the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as

the axis. Salary is present in the data as a numerical amount representing US dollars.

You need to create a reference line to show which employees are above the median salary.

Solution: You create a median line by using the Salary measure.

Does this meet the goal?', '["Yes","No"]', '[0]', 'Answer is Yes

We can definitely create a median line for the measure of salary (Tested)

Also the other solution in this series is create a percentile line at 50% for the salary measure because
percentile value at 50 % is exactly equal to the median value.', 'Final', '240', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-241-240', 'Model the data', 'manual', 'DRAG DROP

-

You have a Power BI report that contains a table visual with a measure named Revenue. The Revenue measure

returns values within a range of 0 to 5.

You need to format the visual so that the Revenue column displays a specific background color based on the value

range shown in the following table.

Which three actions should you perform in sequence in Power BI Desktop? To answer, move the appropriate

actions from the list of actions to the answer area and arrange them in the correct order.', '[]', '[3,0,1]', 'To apply conditional formatting to the Revenue column in Power BI, follow these steps:

Open the Background color dialog: Click on the Revenue column and open the formatting options.
Set Format style to Rules: This allows you to create rules for different value ranges.
Add and configure new rules: Define the color for each value range (e.g., setting one color for low revenue,
another for high revenue).', 'Final', '241', '/dump-assets/f1-241-240-question.webp', '/dump-assets/f1-241-240-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-242-241', 'Visualize and analyze the data', 'single', 'You have a Power BI report that contains four pages.

All the pages contain a slicer for a field named Country.

You need to ensure that when a user selects a country on page 1, the selection is retained on page 2 and page 3.

The solution must prevent page 4 from being affected by selections on the other pages.

What should you do?', '["Remove the Country slicer from page 1, page 2, and page 3. Add the Country field to the page-level filters.","Remove the Country slicer from page 1, page 2, and page 3. Add the Country field to the report-level filters.","Move the Country slicer from page 2 and page 3 to page 1.","Sync the Country slicer on page 1, page 2, and page 3."]', '[3]', 'Sync the Country slicer on page 1, page 2, and page 3.

Syncing the Country slicer across pages ensures that the selection made on Page 1 will be retained on Page 2
and Page 3. The Country slicer on Page 4 will not be affected, as it is not synchronized with the other pages.

Why Other Options Are Incorrect:

A and B: Using filters at the page or report level doesn’t give the flexibility of controlling slicer behavior
across individual pages.

C: Moving the slicer to Page 1 only doesn''t address the requirement to apply slicer selections across pages.', 'Final', '242', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-243-242', 'Visualize and analyze the data', 'manual', 'DRAG DROP

-

You use Power BI Desktop to create a Power BI data model and a blank report.

You need to add the Word Cloud visual shown in the following exhibit to the report.

The solution must minimize development effort.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct

order.', '[]', '[2,4,1]', '1. From Power BI Desktop, get the Word Cloud visual from Microsoft AppSource

2. Populate the Category, Value, and Excludes fields

3. Format the data colors and title

(Colors in the Exhibit are different from the default colours)

From Power BI Desktop, get the Word Cloud visual from Microsoft AppSource:

Click on the ellipsis (three dots) in the Visualizations pane, select Get more visuals, and search for Word
Cloud in the AppSource.

Populate the Category, Value, and Excludes fields:

Category: The field representing the words you want to visualize.

Value: The field representing the size of the words (e.g., frequency).

Excludes: Any words you wish to exclude from the visual.

Format the data colors and title:

You can customize the colors for the words and adjust the title to suit your needs.

Why This Works:

This method gives you full control over how the Word Cloud is populated and formatted within Power BI.', 'Final', '243', '/dump-assets/f1-243-242-question.webp', '/dump-assets/f1-243-242-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-244-243', 'Visualize and analyze the data', 'manual', 'DRAG DROP

-

You have a Power BI report that contains five bookmarks.

You need to add an object to the report from which users can navigate between three specific bookmarks.

How should you complete the task? To answer, drag the appropriate actions to the correct steps. Each action may

be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view

content.

NOTE: Each correct selection is worth one point.', '[]', '[0,3,1]', 'Second step: Group the three bookmarks

Third step: Change the Bookmark property for the button.', 'Final', '244', '/dump-assets/f1-244-243-question.webp', '/dump-assets/f1-244-243-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-245-244', 'Visualize and analyze the data', 'single', 'You plan to use Power BI to create sales invoices for customers. The solution must meet the following

requirements:

•Sales invoices must be exported in a PDF format.

•The PDF exports must show all columns and rows clearly.

What should you create?', '["a paginated report that contains a tablix","a dashboard that contains a table","an interactive report that contains a table","an interactive report that contains a matrix"]', '[0]', 'a paginated report that contains a tablix

A paginated report is the best option for creating invoices in Power BI because it allows for precise control
over the layout, ensuring that all columns and rows are visible in the exported PDF format. The tablix is a
flexible data region that can handle rows and columns, which is ideal for displaying invoice details in a clear,
structured manner.

Why Other Options Are Incorrect:

B, C, D: Interactive reports (dashboards or reports with tables or matrices) are not suitable for static exports in
PDF format, as they focus on dynamic and interactive viewing rather than structured page layout.', 'Final', '245', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-246-245', 'Visualize and analyze the data', 'manual', 'DRAG DROP

-

You have a Power BI report that contains three pages. The pages are used to analyze sales across various

countries.

You add a slicer named Country to each page of the report.

You need to configure the report to meet the following requirements:

•When a user selects a country on the first page, the report must filter the other pages.

•The second and third pages must display only the filtered results.

Which task should you perform for each requirement? To answer, drag the appropriate task to the correct

requirement. Each task may be used once, more than once, or not at all. You may need to drag the split bar

between panes or scroll to view content.

NOTE: Each correct selection is worth one point.', '[]', '[1,3]', '- Configure the Country slicer to sync across all the pages

- Hide the Country slicer on the second and third pages

When first page is filtered by country, the other two need to reflect the filter. Configure the country slicer to
sync across all the pages will satisfy both questions. Hiding the country slicer from last two pages, is more
about user experience and report design than functionality required to meet the given requirements. In the
instructions it says that the same task may be used multiple times.', 'Final', '246', '/dump-assets/f1-246-245-question.webp', '/dump-assets/f1-246-245-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-247-246', 'Visualize and analyze the data', 'single', 'You have a Power BI report that contains a page. The page contains the following:

•A shape named Shape1

•A card named Sales Summary

•A clustered bar chart named Sales by Region

You need to ensure that Sales Summary renders on top of Shape1.

What should you modify?', '["Tab order in the Selection pane","Layer order in the Selection pane","Maintain layer order in the General visual settings","Vertical alignment in the Canvas settings"]', '[1]', 'B. Layer order in the Selection paneTo ensure that Sales Summary renders on top of Shape1, you need to
adjust their layer order in the Selection pane. Power BI renders visuals based on the layer order in the
Selection pane, with the topmost visual being rendered last and therefore appearing on top of other visuals.To
adjust the layer order, you can select the visuals in the Selection pane and drag them up or down to change
their position in the layer order. In this case, you would want to select Sales Summary and drag it above
Shape1 in the layer order to ensure it is rendered on top.', 'Final', '247', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-248-247', 'Visualize and analyze the data', 'single', 'You have a Power BI report named Report1 and a dashboard named Dashboard1. Report1 contains a line chart

named Sales by month.

You pin the Sales by month visual to Dashboard1.

In Report1, you change the Sales by month visual to a bar chart.

You need to ensure that the bar chart displays on Dashboard1.

What should you do?', '["Refresh the dataset used by Report1 and Dashboard1.","Pin the Sales by month bar chart to Dashboard1.","Select Refresh visuals for Dashboard1.","Edit the details for the dashboard tile of Dashboard1."]', '[1]', 'B. Pin the Sales by month bar chart to Dashboard1.When you pin a visual to a dashboard, you are essentially
taking a snapshot of that visual at that point in time and adding it to the dashboard as a tile. Any changes
made to the original visual in the report will not automatically reflect in the dashboard tile. To display the bar
chart on Dashboard1, you need to pin the new Sales by month bar chart to Dashboard1.

https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-report-change-visualization-type', 'Final', '248', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-249-248', 'Visualize and analyze the data', 'multi', 'In Power BI Desktop, you are creating a report that will contain three pages.

You need to create a custom tooltip page and prepare the page for use.

Which three actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.', '["For the tooltip page, set Allow use as tooltip to On.","For the target page, set Allow use as tooltip to On.","Configure filters on the target visual.","For the tooltip page, configure filters.","Add and configure visuals on the tooltip page."]', '[0,3,4]', 'A. For the tooltip page, set Allow use as tooltip to On

This step makes the page eligible to be used as a tooltip.

D. For the tooltip page, configure filters

You can configure filters on the tooltip page to control the data displayed based on the hovered visual.

E. Add and configure visuals on the tooltip page

The tooltip page should contain the visuals that will be shown when hovering over elements in the report.

Why Other Options Are Incorrect:

B. For the target page, set Allow use as tooltip to On: The target page doesn’t need this setting; it''s the tooltip
page that needs to have this enabled.

C. Configure filters on the target visual: This step is not needed for tooltip configuration. The tooltip itself
handles filtering.', 'Final', '249', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-250-249', 'Prepare the data', 'manual', 'DRAG DROP

-

You need to use AI insights to add a column of enhanced data based on the customer feedback. The solution must

identify the following:

• What the customers most often provide feedback about

• Whether the customers like your company’s product

• The language of the feedback

Which AI insights service should you use for each output? To answer, drag the appropriate services to the correct

outputs. Each service may be used once, more than once, or not at all. You may need to drag the split bar between

panes or scroll to view content.

NOTE: Each correct selection is worth one point.', '[]', '[1,3,2]', 'Key Phrase Extraction

Sentiment Analysis

Language Detection

- Key Phrase Extraction: a text analysis technique that extracts important words and phrases from the input
text

- Sentiment analysis: is the process of analyzing digital text to determine if the emotional tone of the message
is positive, negative, or neutral

- Language Detection: usually used to identify the language of business texts like emails and chats', 'Final', '250', '/dump-assets/f1-250-249-question.webp', '/dump-assets/f1-250-249-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-251-250', 'Manage and secure Power BI', 'multi', 'You have a Power BI report named ReportA.

You have a Power BI tenant that allows users to export data.

You need to ensure that consumers of ReportA cannot export any data from visuals.

Which two actions should you perform? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.', '["From Power BI Desktop, modify the Report settings.","From Power BI Desktop, modify the Data Load settings.","From the Power BI service, modify the dataset permissions.","From the Power BI service, modify the Report settings."]', '[0,3]', 'A. From Power BI Desktop, modify the Report settings

In Power BI Desktop, you can modify report settings to disable the option to export data.

D. From the Power BI service, modify the Report settings

In the Power BI service, you can also configure report settings to prevent users from exporting data from
visuals.

Why Other Options Are Incorrect:

B. Modify the Data Load settings: These settings are related to how data is loaded and do not impact export
permissions.

C. Modify the dataset permissions: This affects data access but does not specifically prevent data export from
reports.', 'Final', '251', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-252-251', 'Visualize and analyze the data', 'single', 'You have a Power BI report that will be rendered on a vertical display.

You need to maximize the portion of the screen area used by the report.

What should you do?', '["From the Canvas background setting of Power BI Desktop, configure the Image fit setting.","From the Canvas settings of Power BI Desktop, set a custom width and height.","From Power BI Desktop, select Personalize visuals.","From the Power BI service, enable the Pages pane."]', '[1]', 'From the Canvas settings of Power BI Desktop, set a custom width and height.

To maximize the screen area used by the report on a vertical display, you should set a custom width and
height for the canvas in Power BI Desktop. By adjusting the dimensions to match the aspect ratio of the
display, you ensure the report fills the screen optimally.

Why Other Options Are Incorrect:

A. Image fit setting: This applies to images, not the entire report.

C. Personalize visuals: This allows end-users to modify visuals, not layout or display size.

D. Enable the Pages pane: This only impacts navigation, not the canvas layout.', 'Final', '252', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-253-252', 'Visualize and analyze the data', 'single', 'You need to create a visual that compares profit across 10 product categories fora selected quarter.

What is the best visual to use to achieve the goal?', '["an area chart","a funnel chart","a clustered bar chart","a line chart"]', '[2]', 'C. A clustered bar chart.

A clustered bar chart is the best visual to use to compare profit across 10 product categories for a selected
quarter. It allows you to easily compare the profit of each category side-by-side, making it easy to identify the
highest and lowest performers. In addition, a clustered bar chart is effective at displaying discrete data, such
as categories, which makes it the ideal choice for this scenario.', 'Final', '253', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-254-253', 'Manage and secure Power BI', 'single', 'You have a Power BI dataset named Finance that is hosted in a Power BI workspace.

The finance team at your company is NOT currently a member of any Power BI workspace roles.

You need to enable the finance team to use Microsoft Excel to analyze the Finance dataset.

What should you do?', '["Grant the finance team build permissions to the Finance dataset.","Provide an Excel workbook that is connected to the Finance dataset.","Create a row-level security (RLS) role and add the finance team to the role as members.","Grant the finance team write permissions to the Finance dataset."]', '[0]', 'you have to have at least build permissions on the dataset

Granting build permissions to the finance team on the Finance dataset allows them to access the dataset in
Excel and analyze it. With these permissions, they can connect Excel to the dataset and use it for analysis.

Why Other Options Are Incorrect:

B: Providing an Excel workbook does not allow direct analysis of the dataset.

C: Row-level security (RLS) controls data access but doesn''t enable Excel analysis.

D: Write permissions are unnecessary for Excel analysis and could lead to unwanted changes.

https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-connect-power-bi-datasets-excel', 'Final', '254', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-255-254', 'Visualize and analyze the data', 'multi', 'You have a Power BI report that contains a visual. The visual contains a measure.

You need to ensure that the report meets the following requirements:

•All values must be set to two decimal places.

•All negative values must be displayed in red font and parentheses.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.', '["For the visual, apply conditional formatting to the background color.","Configure the measure to use a custom format.","For the visual, apply conditional formatting to the font color.","For the visual, set Value decimal places to 2."]', '[1,2]', 'B to format measure with parenthesis and decimals and c for configuring font color

Because.. question each answer should be part of solutions...D. For the visual, set Value decimal places to 2, is
partially correct but it only addresses the first requirement of setting all values to two decimal places.To
address the second requirement of displaying negative values in red font and parentheses, we need to apply
conditional formatting to the font color as stated in option C.Therefore, we need to perform both actions:
configuring the measure to use a custom format and applying conditional formatting to the font color.No
confusion, and no need to discuss further', 'Final', '255', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-256-255', 'Prepare the data', 'manual', 'HOTSPOT

-

You are using Power Query Editor to preview the data in a column named Max Temp. The column statistics and

value distribution are shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', '45

24

The first question is asking which value was repeated the most in the column, as in, frequency.

When the frequency of the value increases, the bar shown in "value distribution" also increases. So the
biggest bar is of the value that is repeated the most, which is 45.

For the second question, the smallest NON-null value, is a fancy way of saying the minimum value that is
actually a value not an error, null or an empty field. Which is shown on the left hand side as 24.

This view is Column Profiling it profiles just one column and brings a lot of statistics about it as you can see.

You can read more here. https://learn.microsoft.com/en-us/power-query/data-profiling-tools', 'Final', '256', '/dump-assets/f1-256-255-question.webp', '/dump-assets/f1-256-255-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-257-256', 'Visualize and analyze the data', 'manual', 'HOTSPOT

-

You have a Power BI report that contains a page. The page contains the following visuals:

•A card

•A matrix

•A bar chart

You need to configure the page to ensure that the card and the bar chart are unaffected when a user drills down in

the matrix. The card and the bar chart must change when a user selects a cell in the matrix.

What should you configure? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Matrix

Apply drill down filters to Selected Visual

https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions?tabs=powerbi-
desktop#change-the-interactions-of-drillable-visualizationsBy default, a matrix will have "Entire Page" in the
"Apply drill down filters to" option inside the Format tab, which is what we don''t want to happen, so changing
to "Selected Visual" should give us the behavior we want', 'Final', '257', '/dump-assets/f1-257-256-question.webp', '/dump-assets/f1-257-256-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-258-257', 'Model the data', 'single', 'You have a Power BI model that contains two tables named Population and Date.

The Population table contains two columns named PopulationAmount and DateKey.

DateKey contains date values that represent the first day of a year and are used to create a many-to-one

relationship with the Date table.

The Power BI model contains two measures that have the following definitions.

Total Population = Sum(‘Population’[PopulationAmount])

2023 Population = CALCULATE([Total Population], ‘Date''[Year] = 2023)

You create a table visual that displays Date[Year] and [2023 Population].

What will the table visual show?', '["one row per year that contains blank values for every year except 2023","one row per date that contains the population value for the corresponding year repeated in each row","a single row for the year 2023 that contains the related population value","one row per year that contains the same value repeated for each year"]', '[3]', 'Correct answer is: D. one row per year that contains the same value repeated for each year.

Total Population calculates the sum of PopulationAmount across the entire Population table.

2023 Population is calculated by filtering the Date table to only include data for the year 2023.

In the table visual, the 2023 Population measure will return the 2023 population value for every row. It doesn''t
depend on the actual year but instead repeats the population of 2023 for all the years listed in the Date[Year]
column.

Why Other Options Are Incorrect:

A: Blank values won''t appear as the measure still returns a value for 2023.

B: The value isn''t tied to individual dates, only to the year 2023.

C: The table doesn''t show a single row for only 2023. It shows all years, but with the same population value for
2023 across each.', 'Final', '258', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-259-258', 'Prepare the data', 'single', 'You have a Power BI dataset that contains quarterly sales performance data.

You need to enable managers to review the data in a format that meets the following requirements:

•Is optimized for printing.

•Renders data in Microsoft Excel, Word, PowerPoint, and PDF formats.

What should you create?', '["a template app","a dashboard","a paginated report","an interactive report"]', '[2]', 'Correct answer is C:a paginated report.

A paginated report is designed specifically for printing, with precise control over layout and formatting. It can
be exported to various formats such as Excel, Word, PowerPoint, and PDF, meeting the requirements of
rendering data in different formats and being optimized for print.

Why Other Options Are Incorrect:

A. Template app: Used for pre-packaged content and apps, not for print-friendly reports.

B. Dashboard: Primarily for interactive viewing, not optimized for printing.

D. Interactive report: Designed for on-screen interaction, not print optimization.', 'Final', '259', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-260-259', 'Visualize and analyze the data', 'single', 'You have a Power BI report that contains the visuals shown in the following table.

You need to modify the location of each visual.

What should you modify for each visual?', '["the layer order","the padding","the position","the tab order"]', '[2]', 'Correct answer is C:the position.

The position refers to the horizontal and vertical coordinates of each visual in Power BI. In this case, to modify
the location of each visual, you need to adjust its position by changing the horizontal and vertical coordinates
provided (such as 300, 700 for the Clustered column chart).

Why Other Options Are Incorrect:

A. Layer order: Affects the visibility of visuals overlapping one another, not the location.

B. Padding: Controls the space inside the visual, not its position.

D. Tab order: Refers to the sequence for navigating between visuals, not their position.', 'Final', '260', '/exhibit-assets/f1-260-259.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-261-260', 'Visualize and analyze the data', 'multi', 'You have a Power BI report. The report contains a line chart that displays sales data for several regions.

You need to add an element to the report that will enable users to filter the sales data to include only a selected

region.

Which two elements achieve the goal? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.', '["a slicer visual","a drillthrough filter","a table visual","a card visual","a Key Performance Indicator (KPI) visual"]', '[0,2]', 'A. a slicer visual.

C. a table visual

A. Slicer visual: Slicers allow users to filter data interactively and can be used to filter the sales data by region
in this case.

C. Table visual: While not a primary filter, a table visual can be used to display region data that can be clicked
on for filtering, especially when combined with other visuals.

Why Other Options Are Incorrect:

B. Drillthrough filter: This is for filtering to a detailed page, not for filtering within the same page.

D. Card visual: A card visual displays a single metric, not used for filtering.

E. KPI visual: Similar to card visuals, KPIs are for showing performance indicators, not filtering.', 'Final', '261', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-262-261', 'Visualize and analyze the data', 'manual', 'DRAG DROP

-

You plan to use Power BI to create a quarterly profit report that meets the following requirements:

•Emphasizes the percentage of total profits contributed by each product category in dollars and as a percentage

•Compares profit margins across sales regions

Which type of visual should you use for each requirement? To answer, drag the appropriate visuals to the correct

requirements. Each visual may be used once, more than once, or not at all. You may need to drag the split bar

between panes or scroll to view content.

NOTE: Each correct selection is worth one point.', '[]', '[3,4]', 'Pie Chart.

Stacked Bar Chart.', 'Final', '262', '/dump-assets/f1-262-261-question.webp', '/dump-assets/f1-262-261-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-263-262', 'Prepare the data', 'single', 'You have the CSV file shown in the following table.

You use Power Query Editor to preview the data in the file.

You need to transform the data to meet the following requirements:

•The first column must contain the month.

•The second column must contain the year.

•The third column must contain the order amount for the month and year.

Which transformation should you use first?', '["remove","unpivot","transpose","pivot"]', '[1]', 'Correct answer is B:unpivot.

The unpivot transformation is used to convert columns into rows, which is exactly what you need to transform
the data. It will turn the order amounts (in columns) into rows under the corresponding month and year,
making the data more manageable and meeting the requirement of having separate columns for month, year,

and order amount.

Why Other Options Are Incorrect:

A. Remove: This would delete unnecessary columns, but it doesn’t reshape the data.

C. Transpose: This swaps rows and columns, which is not the required transformation.

D. Pivot: This aggregates data but doesn''t turn columns into rows.', 'Final', '263', '/exhibit-assets/f1-263-262.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-264-263', 'Visualize and analyze the data', 'single', 'You are creating a Power BI single-page report.

Some users will navigate the report by using a keyboard, and some users will navigate the report by using a screen

reader.

You need to ensure that the users can consume content on a report page in a logical order.

What should you configure on the report page?', '["the layer order","the X position","the bookmark order","the tab order"]', '[3]', 'the tab order.

The tab order controls the navigation flow for keyboard users and ensures that all content is accessible in a
logical sequence. This is important for both keyboard and screen reader users to navigate the report in an
accessible and predictable manner.

Why Other Options Are Incorrect:

A. Layer order: Controls which visuals are in front or behind other visuals, not the navigation order.

B. X position: Determines horizontal placement but doesn''t affect navigation.

C. Bookmark order: Relevant for navigating between different views or sections, not for logical navigation.', 'Final', '264', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-265-264', 'Visualize and analyze the data', 'multi', 'You are configuring a Power BI report for accessibility as shown in the following table.

You need to change the default colors of all three visuals to make the report more accessible to users who have

color vision deficiency.

Which two settings should you configure in the Customize theme window? Each correct answer presents part of

the solution.

NOTE: Each correct selection is worth one point.', '["First-level elements colors","Theme colors","Divergent colors","Sentiment colors"]', '[1,2]', 'B- theme colors cause you can customize it yourself

C- Divergent specifically address color blind users

D is not correct because it uses colors like RED, GREEN, which hurts visual impaired users', 'Final', '265', '/exhibit-assets/f1-265-264.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-266-265', 'Manage and secure Power BI', 'manual', 'HOTSPOT

-

You have a Power BI workspace that contains a semantic model and a report named Sales report.

All users in the sales department are assigned the Viewer role for the workspace.

The Sales report is configured as shown in the Sales report exhibit. (Click the Sales report tab.)

From Power BI Desktop, you configure the Report settings as shown in the Report settings exhibit. (Click the

Report settings tab.)

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Yes, No, No.

For the second one, the viewer role does not have access to share/reshare: https://learn.microsoft.com/en-
us/power-bi/collaborate-share/service-roles-new-workspaces

For third, there is no mention of being able to add a new measure:

https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-personalize-visuals?tabs=powerbi-
desktop', 'Final', '266', '/dump-assets/f1-266-265-question.webp', '/dump-assets/f1-266-265-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-267-266', 'Visualize and analyze the data', 'single', 'You need to use Power BI to create a visual that will allow users to compare the sales performance of five sales

regions for the current month.

Which visual should you use?', '["a line chart","a stacked bar chart","a 100% stacked bar chart","a waterfall chart"]', '[1]', 'Correct answer is B:a stacked bar chart.

A stacked bar chart allows you to compare sales performance across different sales regions, with each
region''s performance represented as a segment of the bar. This visual is useful for showing both individual
and total sales across multiple categories (regions), which aligns well with the requirement to compare five
sales regions for the current month.

Why Other Options Are Incorrect:

A. Line chart: Best suited for showing trends over time, not for comparing regions.

C. 100% stacked bar chart: Useful for showing proportional data, not for comparing absolute values.

D. Waterfall chart: Primarily used for visualizing incremental changes, not direct comparisons.', 'Final', '267', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-268-267', 'Manage and secure Power BI', 'manual', 'HOTSPOT

-

You have a Power BI workspace.

You need to create two reports that meet the following requirements:

•Report1: Optimized for printing and can be delivered to users via a scheduled email subscription

•Report2: Optimized for dynamic user interactivity

Which format should you use for each report? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Box1:Power bi Paginated

Box2:Power bi

Report1: Power BI Paginated (.rdl):

Paginated reports are designed for printing and exporting. They are highly structured, with content fixed to a
page, and are ideal for generating large reports that can be emailed or printed in a consistent format. They are
optimized for scenarios where the report layout and distribution (via email or other methods) are key
considerations.

Report2: Power BI (.pbix):

Power BI desktop files (.pbix) allow for dynamic interactivity. Users can filter, drill down, and interact with the
data on the report. These are ideal for reports where users need to explore data interactively rather than just
viewing static, printed information.', 'Final', '268', '/dump-assets/f1-268-267-question.webp', '/dump-assets/f1-268-267-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-269-268', 'Visualize and analyze the data', 'single', 'You have a Power BI report that contains the table shown in the following exhibit.

The table contains conditional formatting that shows which stores are above, near, or below the monthly quota for

returns.

You need to ensure that the table is accessible to consumers of reports who have color vision deficiency.

What should you do?', '["Move the conditional formatting icons to a tooltip report.","Add alt text that lists the values in the table.","Change the icons to use a different shape for each color.","Remove the icons and use red, yellow, and green background colors instead."]', '[2]', 'Change the icons to use a different shape for each color.

It''s a "color vision deficiency" so using different shapes would secure understanding of the report for that
group of users', 'Final', '269', '/exhibit-assets/f1-269-268.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-270-269', 'Visualize and analyze the data', 'single', 'You have a Power BI report that contains one visual.

You need to provide users with the ability to change the visual type without affecting the view for other users.

What should you do?', '["From the Bookmarks pane, select Focus mode, and then select Add.","From Report settings, select Personalize visuals.","From Visual options in Report settings, select Use the modern visual header with updated styling options.","From Tabular Editor, create a new perspective."]', '[1]', 'From Report settings, select Personalize visuals.

B. Personalize visuals enables users to modify visuals without affecting other users'' views. This option
supports personalized visual customization at the individual user level.

Why other options are incorrect:

A. Focus mode allows users to focus on one visual but doesn''t provide an option to change the visual type.

C. Visual options in Report settings only changes how the visual header appears, not the visual type itself.

D. Tabular Editor is used for advanced model editing, not for enabling user visual customizations.', 'Final', '270', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-271-270', 'Visualize and analyze the data', 'manual', 'HOTSPOT

-

You have a Power BI report that contains the table visual shown in the following exhibit.

You need to modify the visual to display as shown in the following exhibit.

How should you configure the visual? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Why Other Options Are Incorrect

Type: Table or Multi-row card

A Table visual displays data in a flat format, with no pivoting or hierarchical structures, making it impossible
to organize dates as columns and measures (e.g., Total Cost and Total Sales) as rows.

A Multi-row card is for displaying summarized data values, not structured row-column relationships.

Format: Set Rows subtotals to Off

Subtotals are unrelated to achieving the desired layout; this setting only affects the visibility of subtotals,
which is not relevant here.

Format: Set Stepped layout to Off

The Stepped layout adjusts hierarchical indentation for rows in a Matrix visual. It does not control the pivoting
of values to rows, so it is irrelevant for this requirement.', 'Final', '271', '/dump-assets/f1-271-270-question.webp', '/dump-assets/f1-271-270-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-272-271', 'Model the data', 'single', 'You have a Power BI report that contains a card. The card displays the value for year-to-date revenue.

You need to ensure that screen reader users can read the value when initially interacting with the card. The value

must stay updated as the dataset is refreshed.

What should you do?', '["Convert the card into a text box.","Add the value to the chart title text.","Populate the alt text with a static value.","Populate the alt text by using conditional formatting with a DAX measure."]', '[3]', 'Populate the alt text by using conditional formatting with a DAX measure.

Requirement:

The value displayed in the card must be readable by screen readers.

The value should stay updated dynamically when the dataset is refreshed.

Why Option D is Correct:

Using conditional formatting with a DAX measure for the alt text ensures the alt text dynamically updates
whenever the dataset is refreshed.

Screen readers will read the updated alt text, making the value accessible and always accurate.

Why Other Options Are Incorrect:

A. Convert the card into a text box:

A text box does not support dynamic updates based on data refresh. You would need to manually update the
text box whenever the dataset changes.

B. Add the value to the chart title text:

While chart titles can be read by screen readers, this option does not apply to cards. It also lacks flexibility in
dynamically presenting values in the alt text for accessibility.

C. Populate the alt text with a static value:

A static alt text value would not update when the dataset refreshes, failing the requirement for dynamic
updates.', 'Final', '272', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-273-272', 'Visualize and analyze the data', 'single', 'You have a Power BI report that contains a table visual. The visual contains a column.

The column contains whole numbers ranging from of 1 to 20.

You need to use conditional formatting to meet the following requirements:

•Visually compare the values without having to read the text containing the number.

•Show a different format for each distinct value.

•Hide the numeric value of ColumnA.

•Minimize development effort.

Which formatting should you use?', '["font color","icons","data bars","background color"]', '[2]', 'Correct answer is C:data bars.

C. Data bars are ideal for visually comparing values without displaying the actual numbers. They provide a
visual representation of the data, with varying lengths indicating the size of each value. This minimizes the
need to read text while fulfilling the requirement to show a different format for each distinct value.

Why other options are incorrect:

A. Font color only changes the color of the text, but doesn''t provide a distinct visual representation of the
values.

B. Icons can show distinct symbols, but data bars are better for comparing values.

D. Background color would apply a color background, but it doesn''t offer the same comparison clarity as data
bars.', 'Final', '273', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-274-273', 'Prepare the data', 'manual', 'HOTSPOT

-

You use Power Query Editor to preview the data in a column named Resource Location.

The column statistics and value distributions of Resource Location appear as shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Unique is 0.

Most frequently occurred is US East

First solution must be ''0'' as there are no UNIQUE values.

13 is the number of DISTINCT values in the dataset.

US East is the one occuring many more times than the reast (on top in the bar chart)', 'Final', '274', '/dump-assets/f1-274-273-question.webp', '/dump-assets/f1-274-273-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-275-274', 'Visualize and analyze the data', 'single', 'You have a Power BI report that contains the visual shown in the following exhibit.

You need to make the visual more accessible to users who have color vision deficiency.

What should you do?', '["Change the font color of values in the Sales column to white.","Change the red background color to orange.","Add additional measures to the table values.","Add icons to represent the sales status of each product."]', '[3]', 'Add icons to represent the sales status of each product.

D. Add icons helps to make the visual more accessible to users with color vision deficiencies by providing an
additional layer of information. Icons can represent the sales status of each product, making it easier for users
to understand the data without relying solely on color.

Why other options are incorrect:

A. Changing font color improves readability but does not address color blindness.

B. Changing the background color might still be difficult for colorblind users to interpret.

C. Adding additional measures does not directly help users with color vision deficiencies.', 'Final', '275', '/exhibit-assets/f1-275-274.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-276-275', 'Prepare the data', 'single', 'You have a Power BI app that contains a report named Report1.

You add a new page to Report1.

You need to ensure that users can view the new page. The solution must minimize administrative effort.

What should you do?', '["Update the audience in the app.","Update the app.","Update the contact information in the app.","Unpublish and create a new app."]', '[1]', 'Update the app.

Requirement:

You added a new page to an existing report in a Power BI app.

You need to make the new page visible to users with minimal administrative effort.

Why Option B is Correct:

Updating the app allows you to include the new page in the app and publish the changes. This process does
not require unpublishing or creating a new app, thus minimizing effort.

Existing users of the app will automatically see the changes after you update the app.

Why Other Options Are Incorrect:

A. Update the audience in the app:

Updating the audience controls who can view the app but does not update the content within the app. This
option does not address the need to make the new page visible.

C. Update the contact information in the app:

Contact information only provides user support details. It does not affect the visibility of pages or content
within the app.

D. Unpublish and create a new app:

Unpublishing and recreating the app would involve significantly more effort and is unnecessary for simply
adding a new page to an existing app.', 'Final', '276', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-277-276', 'Visualize and analyze the data', 'single', 'You have a Power BI semantic model that contains a table named Table1. Table1 contains the following columns:

•WebsiteName

•URL

You need to create a report named Report1 that will contain a table visual. The solution must meet the following

requirements:

•Display the website name.

•Enable users to navigate to the website''s URL by selecting the website name.

What should you use?', '["data categories","Conditional Formatting","inline hierarchy labels","URL icons"]', '[1]', '1. B- need to "Enable users to navigate to the website''s URL by selecting the website name"

To enable users to navigate to a website''s URL by selecting the website name, you should use conditional
formatting to turn the website names into hyperlinks. In Power BI, this can be done by applying URL
formatting to the column containing the website names, allowing them to function as clickable links.

Why other options are incorrect:

A. Data categories: Used for categorizing data types, not for creating hyperlinks.

C. Inline hierarchy labels: Used for hierarchical visuals, not for linking URLs.

D. URL icons: Refers to icons for links, not for making text clickable.', 'Final', '277', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-278-277', 'Prepare the data', 'manual', 'HOTSPOT

-

You use Power Query Editor to review a query that contains a column named Country.

You need to view the following information in the Data preview view for the Country column:

•The percentage of values that contain errors.

•The count of empty values.

What should you enable? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Independent correction:

Percentage of error values: Column quality.

Count of empty values: Column profile.

Column quality is the quick percentage bar. Column profile supplies detailed column statistics and value counts.', 'Final', '278', '/dump-assets/f1-278-277-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-279-278', 'Model the data', 'single', 'You have a Power BI semantic model named Model1 that contains two fields named Sales and Quarter. Model1

contains a DAX measure that sums the Sales column.

You need to create a report that will contain the visual shown in the following exhibit.

The solution must NOT require additional DAX measures.

Which type of visual should you use?', '["ribbon chart","line chart","100% stacked area chart","area chart"]', '[2]', 'You need to create a report that will contain the visual shown in the following exhibit.'', that is clearly meant
for 100% stacked area chart. Cannot be B line chart as per the exhibited visual shown which is stacked
category..

B does not show referring to the visual diagram where you have different product category stacked up,
question outlines', 'Final', '279', '/exhibit-assets/f1-279-278.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-280-279', 'Visualize and analyze the data', 'manual', 'DRAG DROP

-

You have a Power BI semantic model that contains a table.

You need to create a Power BI report page that contains two visuals that meet the following requirements:

•Visual 1: Displays the distribution of hierarchical data

•Visual 2: Search and then filter by values

Which type should you choose for each visual? To answer, drag the appropriate visual types to the correct visuals.

Each visual type may be used once, more than once, or not at all. You may need to drag the split bar between panes

or scroll to view content.

NOTE: Each correct selection is worth one point.', '[]', '[4,1]', 'Treemap is for hierarchical data and slicer is for filtering', 'Final', '280', '/dump-assets/f1-280-279-question.webp', '/dump-assets/f1-280-279-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-281-280', 'Prepare the data', 'manual', 'HOTSPOT

-

You use Power Query Editor to review the query shown in the following exhibit.

Each Region value appears only on the row where it first occurred. Each subsequent occurrence of the Region

value is blank.

You need to ensure that every row contains the correct non-blank value. The solution must minimize development

effort.

Which column should you select, and which action should you perform on the column? To answer, select the

appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Region

Fill down

The Fill Down action in Power Query propagates the last non-blank value downward into subsequent blank
cells within the same column. This ensures that all blank rows in the “Region” column are filled with the
correct value from the previous row where the region was specified.', 'Final', '281', '/dump-assets/f1-281-280-question.webp', '/dump-assets/f1-281-280-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-282-281', 'Visualize and analyze the data', 'single', 'You have a Power BI report that contains a bar chart. The bar chart displays sales by country.

You need to ensure that a summary of the data shown on the bar chart is accessible by using a screen reader.

What should you configure on the bar chart?', '["conditional formatting","alt text","the tab order","the layer order"]', '[1]', 'Alt text (alternative text) is used to provide a textual description of the visual content for users relying on
screen readers. In this case, configuring alt text ensures that a summary of the bar chart (e.g., “Sales by
country”) can be read out by a screen reader, making the data accessible.', 'Final', '282', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-283-282', 'Model the data', 'manual', 'HOTSPOT

-

You have the Performance analyzer results shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'The visual that has the slowest load time is [answer choice]."

This refers to the visual that takes the longest time to fully render.

Based on the selection, "August 2024 Active User %" is the visual with the longest individual load time.

This is often due to complex DAX calculations, many filters, or large datasets.

waits the longest for other visuals to load."

This refers to the visual that starts loading only after other visuals finish, not necessarily due to its own
complexity.

The same visual "August 2024 Active User % was selected, meaning:

It is also the last visual to begin loading,

Likely because it depends on outputs of other visuals or has lower priority in the rendering queue.', 'Final', '283', '/dump-assets/f1-283-282-question.webp', '/dump-assets/f1-283-282-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-284-283', 'Prepare the data', 'manual', 'DRAG DROP

-

You use Microsoft Power BI Desktop to preview a query in Power Query Editor. The query contains a column named

Location Name.

You need to identify the maximum length of each value in the Location Name column without changing the data.

Which actions should you perform in sequence? To answer, drag the appropriate actions to the correct order. Each

action may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll

to view content.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Step 1: Select the Location Name column

You begin by selecting the column you want to analyze.

Step 2: Set Column Profiling based upon entire dataset

Ensures Power Query analyzes all rows, not just the top 1,000 preview rows.

Done via: View > Column profiling > Based on entire dataset.

Step 3: From the View tab, select Column profile

This enables the detailed data profile pane, which shows:

Value distribution

Min/Max

Distinct values

Empty count

Data type statistics

Step 4: Group the value distribution by text length

You group values based on length of text.

This step helps spot anomalies — e.g., names that are too short or too long compared to the average.', 'Final', '284', '/dump-assets/f1-284-283-question.webp', '/dump-assets/f1-284-283-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-285-284', 'Visualize and analyze the data', 'single', 'You plan to generate a line chart to visualize and compare the last six months of sales data for two departments.

You need to increase the accessibility of the visual.

What should you do?', '["Configure a unique marker for each series.","Configure a distinct color for each series.","Replace long text with abbreviations and acronyms.","Move important information to a tooltip."]', '[0]', 'A. Configure a unique marker for each series.

Line charts typically use color to distinguish between data series.

However, relying on color alone can create accessibility issues, especially for users with color vision
deficiencies (color blindness).

By adding unique markers (e.g., circles, squares, triangles) to each series:

The lines become distinguishable even without color.

This significantly improves accessibility for all users.

Why not the others?

B. Configure a distinct color for each series

While helpful, it relies solely on color, which is not accessible to all users.

It’s better to combine color with shape/marker.

C. Replace long text with abbreviations and acronyms

This can reduce clarity, especially for screen reader users or those unfamiliar with the acronyms.

D. Move important information to a tooltip

Tooltips are not always accessible—screen readers and keyboard users may not benefit from them.

Key information should be visibly available in the chart, not hidden.', 'Final', '285', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-286-285', 'Visualize and analyze the data', 'single', 'You have a Power BI report. The report contains a single report page that uses the default theme.

You need to configure the report page to match the formatting shown in the following exhibit.

What should you change on the report page?', '["the wallpaper color only","the canvas background color only","the wallpaper color and the canvas background color only","the canvas background image only"]', '[2]', 'C. The wallpaper color and the canvas background color only.

Use this if you''re aiming for consistent branding or styling across the whole report page, including both:

The visual workspace (canvas)

The surrounding area (wallpaper)', 'Final', '286', '/exhibit-assets/f1-286-285.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-287-286', 'Visualize and analyze the data', 'manual', 'HOTSPOT

-

You have a Power BI report that contains the visual shown in the following exhibit.

You plan to modify the visual by changing the column spacing and adding percent change labels as shown in the

following exhibit.

What should you do? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'To change the column spacing.

Enable overlap for every series.

In a clustered column chart, each category typically shows multiple columns side by side — one for each
series.

If spacing is too wide, the columns might appear too spread out, making comparison difficult.

Enabling overlap for every series causes the bars to overlay or partially stack, reducing visual clutter and
improving comparison.

It effectively reduces the gap between series columns for each category — which is interpreted here as
"column spacing."

To add the percent change labels.

Enable data labels for the Plan series.

Data labels display values (or percent changes) directly on the chart.

If percent changes are tied specifically to the Plan series, enabling data labels only for that series makes
sense.

It improves clarity by not overcrowding the chart with labels from every series.', 'Final', '287', '/dump-assets/f1-287-286-question.webp', '/dump-assets/f1-287-286-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-288-287', 'Visualize and analyze the data', 'single', 'You are creating a visual in a Power BI report. The associated semantic model contains sales from the last four

years for three products.

You need to display the total sales by quarter categorized by product. The visual must display trends in both total

sales and individual product sales.

Which type of visual should you use?', '["area chart","clustered column chart","stacked area chart","line chart"]', '[2]', 'Stacked Area Chart:

Total Sales Trend: The top edge of the stacked area chart clearly shows the trend of the total sales over time
(quarters in this case).

Individual Product Sales Trend: Each "layer" or "stack" within the chart represents an individual product''s
sales, allowing you to see how each product''s sales contribute to the total and their own individual trends over
time. This is excellent for part-to-whole relationships and trends.', 'Final', '288', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-289-288', 'Visualize and analyze the data', 'single', 'You have a Power BI report that contains a clustered bar chart. The chart has an X-axis named Sales and a Y-axis

named Year. The chart displays sales data for the years 2020 through 2024.

You need to create a visual calculation to show a cumulative total of sales that is equal to the sum of the current

year''s sales plus all the sales from the previous year.

Which DAX expression should you use?', '["MOVINGAVERAGE([Sales], 4)","RUNNINGSUM([Year])","CALCULATE ( [Sales], ''Date'' [Year] <= MAX ( ''Date''[Year] ) )","RUNNINGSUM([Sales])"]', '[3]', 'Independent correction: D. RUNNINGSUM([Sales]). A visual calculation runs on the visual matrix, and RUNNINGSUM adds the current Sales value to the preceding values on the axis. The CALCULATE option is a traditional model-measure pattern and does not answer the requested visual-calculation task.', 'Final', '289', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-290-289', 'Prepare the data', 'manual', 'DRAG DROP

-

You are using Power BI Desktop to profile data in Power Query Editor.

You need to review the percentage of errors and the maximum value of each column.

Which options should you use in Power Query Editor? To answer, drag the appropriate options to the correct

requirements. Each option may be used once, more than once, or not at all. You may need to drag the split bar

between panes or scroll to view content.

NOTE: Each correct selection is worth one point.', '[]', '[1,3]', 'Column quality: Shows the percentage of valid, error, and empty values for each column.

Column profile: Provides a more detailed statistical profile for a selected column, including min/max values,
average, standard deviation, count of empty/error/distinct/unique values, and a value distribution chart.', 'Final', '290', '/dump-assets/f1-290-289-question.webp', '/dump-assets/f1-290-289-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-291-290', 'Visualize and analyze the data', 'multi', 'You are creating a Power BI report that will contain multiple visuals.

You need to ensure that the report is accessible to users who use a screen reader.

Which two configurations should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.', '["consistent fonts for each visual","alt text for each visual","the tab order for each page","consistent colors for each visual","Play Axis for each page"]', '[1,2]', 'B. Alt text for each visual.

Alt text helps screen reader users understand what a visual represents.

Each chart or image should have a clear, concise description of what it shows.

Essential for accessibility compliance (e.g., WCAG, Section 508).

C. The tab order for each page.

Tab order defines how users navigate through visuals using the keyboard.

Proper tab order ensures a logical and intuitive navigation experience, which is critical for users who can''t use
a mouse.

Set this under View → Selection → Tab Order in Power BI Desktop.', 'Final', '291', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-292-291', 'Model the data', 'single', 'You have a Power BI report that contains a stacked bar chart.

You need to add a new field to the legend. The field must combine information from separate columns.

What should you create?', '["a calculated column","a dynamic format string","a measure","a calculation group"]', '[0]', 'A. Calculated column .

A calculated column can concatenate or combine values from multiple existing columns (e.g., "Region" & " - "
& "Category").

Since the legend expects a column for categorization, a calculated column works perfectly.

You can then drag this new column to the "Legend" field well in the visual.', 'Final', '292', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-293-292', 'Manage and secure Power BI', 'manual', 'HOTSPOT -

You have a Power BI tenant that hosts the datasets shown in the following table.

You have the following requirements:

The export of reports that contain Personally Identifiable Information (PII) must be prevented.

Data used for financial decisions must be reviewed and approved before use.

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Yes

No

Yes

Reference:

https://docs.microsoft.com/en-us/power-bi/enterprise/service-security-sensitivity-label-overview', 'Final', '293', '/dump-assets/f1-293-292-question.webp', '/dump-assets/f1-293-292-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-294-293', 'Manage and secure Power BI', 'single', 'You have a Power BI tenant.

You have reports that use financial datasets and are exported as PDF files.

You need to ensure that the reports are encrypted.

What should you implement?', '["Microsoft Intune policies","row-level security (RLS)","sensitivity labels","dataset certifications"]', '[2]', 'When you create a sensitivity label, you can restrict access to content that the label will be applied to.
When a document or email is encrypted, access to the content is restricted, so that it:
Can be decrypted only by users authorized by the label''s encryption settings.
Remains encrypted no matter where it resides, inside or outside your organization, even if the file''s renamed.

Incorrect:
Not B: Row-level security (RLS) with Power BI can be used to restrict data access for given users. Filters
restrict data access at the row level, and you can define filters within roles.
Current limitations for row-level security:

Reference:
https://docs.microsoft.com/en-us/microsoft-365/compliance/encryption-sensitivity-labels', 'Final', '294', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-295-294', 'Prepare the data', 'single', 'You have a Microsoft Excel file on a file server.

You create a Power BI report and import a table from the Excel file.

You publish the report.

You need to ensure that the data refreshes every four hours.

What should you do first?', '["Upload the Excel file to a Power BI workspace.","Create a subscription to the report.","Deploy an on-premises data gateway.","Edit the data source credentials."]', '[2]', 'You can scheduled refresh for the On-premises data gateway (personal mode) and the On-premises data
gateway. You specify refresh options in the following areas of the Power BI service: Gateway connection, Data
source credentials, and Scheduled refresh.

Reference:
https://docs.microsoft.com/en-us/power-bi/connect-data/refresh-scheduled-refresh', 'Final', '295', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-296-295', 'Manage and secure Power BI', 'multi', 'You have a dataset that is used infrequently and refreshes every hour.

You receive a notification that the refresh was disabled due to inactivity.

Which two actions will cause the scheduled refresh schedule to resume? Each correct answer presents a complete

solution.

NOTE: Each correct selection is worth one point.', '["Enable query caching for the dataset.","Import the dataset to Microsoft Excel.","From the Power BI service, open a dashboard that uses the dataset.","From the Power BI service, open a report that uses the dataset.","From PowerShell, run the get-powerbireport cmdlet."]', '[2,3]', 'After two months of inactivity, scheduled refresh on your dataset is paused. A dataset is considered inactive
when no user has visited any dashboard or report built on the dataset. At that time, the dataset owner is sent
an email indicating the scheduled refresh is paused. The refresh schedule for the dataset is then displayed as
disabled. To resume scheduled refresh, simply revisit any dashboard or report built on the dataset.
Incorrect:

Not E: get-powerbireport retrieves a list of Power BI reports that match the specified search criteria and
scope.

Reference:
https://docs.microsoft.com/en-us/power-bi/connect-data/refresh-scheduled-refresh', 'Final', '296', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-297-296', 'Manage and secure Power BI', 'single', 'You have a Power BI workspace that contains a dataset, a report, and a dashboard. The following groups have

access:

✑ External users can access the dashboard.

✑ Managers can access the dashboard and a manager-specific report.

✑ Employees can access the dashboard and a row-level security (RLS) constrained report.

You need all users, including the external users, to be able to tag workspace administrators if they identify an

issue with the dashboard. The solution must ensure that other users see the issues that were raised.

What should you use?', '["comments","chat in Microsoft Teams","alerts","subscriptions"]', '[0]', 'Add a personal comment or start a conversation about a dashboard or report with your colleagues. The
comment feature is just one of the ways a business user can collaborate with others.
Note: Comments can be added to an entire dashboard, to individual visuals on a dashboard, to a report page,
to a paginated report, and to individual visuals on a report page. Add a general comment or add a comment
targeted at specific colleagues.

Reference:
https://docs.microsoft.com/en-us/power-bi/consumer/end-user-comment', 'Final', '297', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-298-297', 'Prepare the data', 'single', 'You have a PBIX file that imports several tables from an Azure SQL database.

The data will be migrated to another Azure SQL database.

You need to change the connections in the PBIX file. The solution must minimize administrative effort.

What should you do?', '["From Power Query Editor, create new queries.","From Power Query Editor, modify the source of each query.","Create a PBIT file, open the file, and change the data sources when prompted.","Modify the Data source settings."]', '[3]', 'Open the PBIX file with Microsoft Power BI Desktop.

Then choose File -> Options and settings -> Data source settings >Right click data sources and change source.

Note:

Incorrect:

Not C: PBIT is a template file.

The PBIT file keeps your report structure and contains ''DataModelSchema File'' instead of ''''DataModel File''''.
However, If you choose import mode, the PBIX file stores all imported data from data sources and the report
structure.

Reference:

https://windowsreport.com/open-pbix-file/', 'Final', '298', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-299-298', 'Manage and secure Power BI', 'single', 'You have a Power BI workspace that contains several reports.

You need to provide a user with the ability to create a dashboard that will use the visuals from the reports.

What should you do?', '["Create a row-level security (RLS) role and add the user to the role.","Share the reports with the user.","Grant the Read permission for the datasets to the user.","Add the user as a member of the workspace.","Add the user as a Viewer of the workspace."]', '[3]', 'To grant access to a new workspace, assign those user groups or individuals to one of the workspace roles:
Admin, Member, Contributor, or Viewer.

Workspace roles -

Reference:
https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces', 'Final', '299', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-300-299', 'Visualize and analyze the data', 'manual', 'DRAG DROP -

You have a Power BI workspace that contains a single-page report named Sales.

You need to add all the visuals from Sales to a dashboard. The solution must ensure that additional visuals added

to the page are added automatically to the dashboard.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.

Select and Place:', '[]', '[3,4,1]', 'An entire report page can be pinned to a dashboard, which is called pinning a live tile. It''s called a live tile
because you can interact with the tile on the dashboard.
Unlike with individual visualization tiles, changes made in the report are automatically synced with the

dashboard.

Step 2: Open the Sales report -
Step 3: Pin the page.
1. Open a report in Editing view.
2. With no visualizations selected, from the menu bar, select Pin to a dashboard.
3. Pin the tile to an existing dashboard or to a new dashboard. Notice the highlighted text: Pin live page
enables changes to reports to appear in the dashboard tile when the page is refreshed.

4. Select Pin live. A Success message (near the top right corner) lets you know the page was added, as a tile,
to your dashboard.

Reference:
https://docs.microsoft.com/en-us/power-bi/create-reports/service-dashboard-pin-live-tile-from-report', 'Final', '300', '/dump-assets/f1-300-299-question.webp', '/dump-assets/f1-300-299-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-301-300', 'Manage and secure Power BI', 'single', 'You have a report in Power BI named report1 that is based on a shared dataset.

You need to minimize the risk of data exfiltration for report. The solution must prevent other reports from being

affected.

What should you do?', '["Clear Allow recipients to share your dashboard and Allow users to build new content using the underlying datasets for the dataset.","Apply row-level security (RLS) to the shared dataset.","Select the Allow end users to export both summarized and underlying data from the service or Report Server Export data option for the report.","Select the Don''t allow end users to export any data from the service or Report Server Export data option for the report."]', '[3]', 'Besides the various permissions you can set, there are also two different options to disable the export
functionality. First of all is the Export data in general and second the Export to Excel as a specific setting.
Both have the same setup for permissions

Export Data -

Reference:

https://data-marc.com/2020/04/13/power-bi-governance-why-you-should-consider-to-disable-export-to-
excel/', 'Final', '301', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-302-301', 'Manage and secure Power BI', 'single', 'In Power BI Desktop, you are creating visualizations in a report based on an imported dataset.

You need to allow Power BI users to export the summarized data used to create the visualizations but prevent the

users from exporting the underlying data.

What should you do?', '["From the Power BI service, configure the dataset permissions.","From Power BI Desktop, configure the Data Load settings for the current file.","From Power BI Desktop, modify the data source permissions.","From Power BI Desktop, configure the Report settings for the current file."]', '[3]', '1.) in Power BI Desktop > File > Options > Report Settings > Export data > Allow end users to export data with
current layout, summarize data and underlying data from the service or Report Server.

2.) in Power BI Service in Report Settings > Export data section I found: "Choose the type of data you allow
your end users to export." Here you can select one option from:

- Summarized data and data with current layout

- Summarized data, with current layout and underlying data

- None

But this option is missing from offered answers, the correct answer is D.

A is incorrect as in Manage Dataset Permission you can grant access:

-allow recipients to modify dataset,

-allow recipients to share this dataset,

-allow recipients to build content with the data associated with dataset,

-send an email notification

or remove granted reshare, remove build, remove write, remove access

So here you can not change or limit data export.

https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-permissions', 'Final', '302', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-303-302', 'Manage and secure Power BI', 'single', 'You have a Power BI report that uses row-level security (RLS).

You need to transfer RLS membership maintenance to an Azure network security team. The solution must NOT

provide the Azure network security team with the ability to manage reports, datasets, or dashboards.

What should you do?', '["Grant the Read and Build permissions for the Power BI datasets to the Azure network security team.","Configure custom instructions for the Request access feature that instructs users to contact the Azure network security team.","Instruct the Azure network security team to create security groups. Configure RLS to use the groups.","Add the Azure network security team as members of the RLS role."]', '[2]', 'Configure row-level security group membership, Working with members

Add members -
In the Power BI service, you can add a member to the role by typing in the email address or name of the user
or security group.
You can use the following groups to set up row level security.

Distribution Group -

Mail-enabled Group -

Security Group -
Incorrect:
Not A: Build permission applies to datasets. When you give users Build permission, they can build new content
on your dataset, such as reports, dashboards, pinned tiles from Q&A, paginated reports, and Insights
Discovery.

Reference:
https://docs.microsoft.com/en-us/power-bi/enterprise/service-admin-rls', 'Final', '303', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-304-303', 'Manage and secure Power BI', 'single', 'You have four sales regions. Each region has multiple sales managers.

You implement row-level security (RLS) in a data model. You assign the relevant mail-enabled security group to

each role.

You have sales reports that enable analysis by region. The sales managers can view the sales records of their

region. The sales managers are prevented from viewing records from other regions.

A sales manager changes to a different region.

You need to ensure that the sales manager can see the correct sales data.

What should you do?', '["Change the Microsoft Power BI license type of the sales manager.","From Microsoft Power BI Desktop, edit the Row-Level Security setting for the reports.","Manage the permissions of the underlying dataset.","Request that the sales manager be added to the correct Azure Active Directory group."]', '[3]', 'You can use the following groups to set up row level security.
* Distribution Group
* Mail-enabled Group - This group also contains a list of email addresses of members and can also be used to
control access to OneDrive and SharePoint.
The Mail-Enabled Security Group can be created in the Office 365 Admin Portal.
* Security Group - This is also known as an Active Directory Security Group. This group lives within Active
Directory and Azure Active Directory.

Reference:
https://docs.microsoft.com/en-us/power-bi/enterprise/service-admin-rls
https://www.fourmoo.com/2020/04/01/power-bi-which-groups-can-be-used-to-set-permissions-in-power-bi/', 'Final', '304', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-305-304', 'Manage and secure Power BI', 'single', 'You have more than 100 published datasets.

Ten of the datasets were verified to meet your corporate quality standards.

You need to ensure that the 10 verified datasets appear at the top of the list of published datasets whenever users

search for existing datasets.

What should you do?', '["Promote the datasets.","Certify the datasets.","Feature the dataset on the home page.","Publish the datasets in an app."]', '[1]', 'Once logged in, you will be presented with a list of datasets that you can access from your various
workspaces. This is one reason why having official datasets promoted and certified is recommended, as these
will appear at the top of the list, with certified datasets appearing before promoted datasets.
Note: Power BI provides two ways you can endorse your valuable, high-quality content to increase its visibility:
promotion and certification.
Promotion: Promotion is a way to highlight content you think is valuable and worthwhile for others to use. It
encourages the collaborative use and spread of content within an organization.
Any content owner, as well as any member with write permissions on the workspace where the content is

located, can promote the content when they think it''s good enough for sharing.
Certification: Certification means that the content meets the organization''s quality standards and can be
regarded as reliable, authoritative, and ready for use across the organization.
Currently it is possible to endorse

Datasets -

Dataflows -

Reports -

Apps -
If dataset discoverability has been enabled in your organization, endorsed datasets can be made discoverable.
When a dataset is discoverable, users who don''t have access to it will be able to find it and request access.

Reference:
https://exceleratorbi.com.au/new-power-bi-reports-golden-dataset/ https://docs.microsoft.com/en-us/power-
bi/collaborate-share/service-endorse-content', 'Final', '305', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-306-305', 'Manage and secure Power BI', 'manual', 'DRAG DROP -

You have a Microsoft Power BI workspace.

You need to grant the user capabilities shown in the following table.

The solution must use the principle of least privilege.

Which user role should you assign to each user? To answer, drag the appropriate roles to the correct users. Each

role may be used once, more than once, or not at all. You may need to drag the split bar.

NOTE: Each correct selection is worth one point.

Select and Place:', '[]', '[2,1]', 'Box 1: Member -

Only Admin and Member can publish, unpublish, and change permissions for an app.

Incorrect:

Contributors can update the app associated with the workspace, if the workspace Admin delegates this
permission to them. However, they can''t publish a new app or change who has permission to it.

Box 2: Contributor -

Admin , Member and Contributor can create, edit, and delete content, such as reports, in the workspace.

Note: Contributor - This role can access and interact with reports and dashboards. Additionally, this role can
create, edit, copy, and delete items in a workspace, publish reports, schedule refreshes, and modify gateways.

Incorrect:

Viewer - This role provides read only access to workspace items. Read access does provide report / dashboard
consumers the ability to not only view, but also interact with visuals. Interaction does not mean changing a
visual.

Reference:

https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces
https://www.mssqltips.com/sqlservertip/6487/power-bi-workspace-permissions-and-roles', 'Final', '306', '/dump-assets/f1-306-305-question.webp', '/dump-assets/f1-306-305-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-307-306', 'Manage and secure Power BI', 'single', 'You create a dashboard by using the Microsoft Power BI Service. The dashboard contains a card visual that shows

total sales from the current year.

You grant users access to the dashboard by using the Viewer role on the workspace.

A user wants to receive daily notifications of the number shown on the card visual.

You need to automate the notifications.

What should you do?', '["Create a subscription.","Create a data alert.","Share the dashboard to the user.","Tag the user in a comment."]', '[0]', 'A is correct, you need a subscription, not an alert as alerts don''t include a snapshot and they will only be sent
based on a certain condition whereas here you want daily notifications, not just when the value exceeds a
certain threshold.

In Power BI, subscriptions allow users to automatically receive scheduled reports or dashboard updates, such
as daily notifications, based on the data they are interested in. By creating a subscription to the dashboard,
the user will get daily updates on the total sales figure shown on the card visual.

Why other options are incorrect:

B. Create a data alert: Alerts notify users when data meets specific conditions, but this doesn''t send daily
updates.

C. Share the dashboard: Sharing alone doesn''t automate notifications.

D. Tag the user in a comment: This is for communication within the dashboard, not for automated notifications.', 'Final', '307', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-308-307', 'Manage and secure Power BI', 'single', 'You have a Power BI workspace named Workspace1 that contains a dataset named DS1 and a report named RPT1.

A user wants to create a report by using the data in DS1 and publish the report to another workspace.

You need to provide the user with the appropriate access. The solution must minimize the number of access

permissions granted to the user.

What should you do?', '["Add the user as a Viewer of Workspace1.","Grant the Build permission for DS1 to the user.","Share RPT1 with the user.","Add the user as a member of Workspace1."]', '[1]', 'More granular permissions -

Power BI provides the Build permission as a complement to the existing permissions, Read and Reshare. All
users who already had Read permission for datasets via app permissions, sharing, or workspace access at that
time also got Build permission for those same datasets. They got Build permission automatically because
Read permission already granted them the right to build new content on top of the dataset, by using Analyze
in Excel or Export.

With this more granular Build permission, you can choose who can only view the content in the existing report
or dashboard and who can create content connected to the underlying datasets.

If your dataset is being used by a report outside the dataset workspace, you can''t delete that dataset. Instead,
you see an error message.

Reference:

https://docs.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions', 'Final', '308', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-309-308', 'Manage and secure Power BI', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have five reports and two dashboards in a workspace.

You need to grant all organizational users read access to one dashboard and three reports.

Solution: You publish an app to the entire organization.

Does this meet the goal?', '["Yes","No"]', '[0]', 'The answer is A..Yes

When you publish an app in Power BI, you can select the specific content you want to include in the app, such

as reports and dashboards, and specify the access levels for each item. You can also choose to make the app
available to specific users or groups, or publish it to the entire organization.

If you publish an app to the entire organization, all users in your organization would have access to the app
and its included content, as long as they have a Power BI license. You can set the appropriate access level for
each item in the app, such as read-only access for the selected dashboard and reports, to ensure that users
only have access to the content they need.

Therefore, publishing an app to the entire organization with the appropriate access levels for the dashboard
and reports would meet the goal of granting all organizational users read access to one dashboard and three
reports.', 'Final', '309', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-310-309', 'Visualize and analyze the data', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have five reports and two dashboards in a workspace.

You need to grant all organizational users read access to one dashboard and three reports.

Solution: You enable included in app for all assets.

Does this meet the goal?', '["Yes","No"]', '[1]', 'You need to specify the dashboard and the three reports to be included in the app.
Instead: You create an Azure Active Directory group that contains all the users. You share each selected
report and the one dashboard to the group.
Note: A published App can provide the required access.
When the dashboards and reports in your workspace are ready, you choose which dashboards and reports you
want to publish, then publish them as an app.
In Power BI, you can create official packaged content, then distribute it to a broad audience as an app. You
create apps in workspaces, where you can collaborate on Power BI content with your colleagues. Then you
can publish the finished app to large groups of people in your organization.

Reference:
https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-create-distribute-apps', 'Final', '310', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-311-310', 'Manage and secure Power BI', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have five reports and two dashboards in a workspace.

You need to grant all organizational users read access to one dashboard and three reports.

Solution: You assign all the users the Viewer role to the workspace.

Does this meet the goal?', '["Yes","No"]', '[1]', 'In this way all users will see all workspace content not only the one dashboard and 3 reports', 'Final', '311', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-312-311', 'Manage and secure Power BI', 'single', 'From Power BI Desktop, you publish a new dataset and report to a Power BI workspace. The dataset has a row-

level security (RLS) role named HR.

You need to ensure that the HR team members have RLS applied when they view reports based on the dataset.

What should you do?', '["From powerbi.com, add users to the HR role for the dataset.","From powerbi.com, share the dataset to the HR team members.","From Power BI Desktop, change the Row-Level Security settings.","From Power BI Desktop, import a table that contains the HR team members."]', '[0]', 'Working with members -

Add members -

In the Power BI service, you can add a member to the role by typing in the email address or name of the user
or security group.

Reference:

https://docs.microsoft.com/en-us/power-bi/enterprise/service-admin-rls', 'Final', '312', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-313-312', 'Visualize and analyze the data', 'single', 'You have a Power BI dashboard that monitors the quality of manufacturing processes. The dashboard contains the

following elements:

✑ A line chart that shows the number of defective products manufactured by day

✑ A KPI visual that shows the current daily percentage of defective products manufactured

You need to be notified when the daily percentage of defective products manufactured exceeds 3%.

What should you create?', '["a subscription","an alert","a smart narrative visual","a Q&A visual"]', '[1]', 'Set alerts in the Power BI service to notify you when data on a dashboard changes above or below limits you

set. Alerts can be set on tiles pinned from report visuals or from Power BI Q&A, and only on gauges, KPIs, and
cards.

Reference:
https://docs.microsoft.com/en-us/power-bi/consumer/end-user-alerts', 'Final', '313', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-314-313', 'Manage and secure Power BI', 'single', 'You create a report by using Microsoft Power BI Desktop.

The report uses data from a Microsoft SQL Server Analysis Services (SSAS) cube located on your company''s

internal network.

You plan to publish the report to the Power BI Service.

What should you implement to ensure that users who consume the report from the Power BI Service have the most

up-to-date data from the cube?', '["an OData feed","an On-premises data gateway","a subscription","a scheduled refresh of the dataset"]', '[1]', 'After you install the on-premises data gateway, you need to add data sources that can be used with the
gateway. You can work with gateways and SQL Server
Analysis Services (SSAS) data sources that are used either for scheduled refresh or for live connections.
Note: Power BI service is a cloud-based business analytics and data visualization service that enables anyone
to visualize and analyze data with greater speed, efficiency, and understanding.

Reference:
https://docs.microsoft.com/en-us/power-bi/connect-data/service-gateway-enterprise-manage-ssas', 'Final', '314', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-315-314', 'Manage and secure Power BI', 'single', 'You have five sales regions. Each region is assigned a single salesperson.

You have an imported dataset that has a dynamic row-level security (RLS) role named Sales. The Sales role filters

sales transaction data by salesperson.

Salespeople must see only the data from their region.

You publish the dataset to powerbi.com, set RLS role membership, and distribute the dataset and related reports

to the salespeople.

A salesperson reports that she believes she should see more data.

You need to verify what data the salesperson currently sees.

What should you do?', '["Use the Test as role option to view data as the salesperson''s user account.","Use the Test as role option to view data as the Sales role.","Instruct the salesperson to open the report in Microsoft Power BI Desktop.","Filter the data in the reports to match the intended logic in the filter on the sales transaction table."]', '[0]', 'A, to be able to see what the specific salesperson sees (and compare it to what she should see) you should

test the report as that user account since the RLS is dynamic and based on the user accounts.', 'Final', '315', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-316-315', 'Visualize and analyze the data', 'single', 'You have multiple dashboards.

You need to ensure that when users browse the available dashboards from powerbi.com, they can see which

dashboards contain Personally Identifiable

Information (PII). The solution must minimize configuration effort and impact on the dashboard design.

What should you use?', '["Microsoft Information Protection sensitivity labels","tiles","comments","Active Directory groups"]', '[0]', 'In the Power BI service, sensitivity labels can be applied to datasets, reports, dashboards, and dataflows.
Sensitivity labels on reports, dashboards, datasets, and dataflows are visible from many places in the Power
BI service. Sensitivity labels on reports and dashboards are also visible in the Power BI iOS and Android mobile
apps and in embedded visuals. In Desktop, you can see the sensitivity label in the status bar.

Reference:
https://docs.microsoft.com/en-us/power-bi/enterprise/service-security-sensitivity-label-overview', 'Final', '316', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-317-316', 'Manage and secure Power BI', 'manual', 'HOTSPOT -

You have a dataset that has the permissions shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: use Analyze in Excel -

Build permission applies to datasets. When you give users Build permission, they can build new content on
your dataset, such as reports, dashboards, pinned tiles from Q&A, paginated reports, and Insights Discovery.

Users also need Build permissions to work with the data outside Power BI:

To export the underlying data.

To build new content on the dataset such as with Analyze in Excel.

To access the data via the XMLA endpoint.

Box 2: Grant build permission

see: https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions

"Say you have Reshare and Build permission on a dataset. When you share a report or dashboard built on that
dataset, you can specify that the recipients also get Build permission for the underlying dataset."

Reference:

https://docs.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions https://data-
marc.com/2021/07/30/transform-a-local-into-a-global-power-bi-solution-request-access-to-content/', 'Final', '317', '/dump-assets/f1-317-316-question.webp', '/dump-assets/f1-317-316-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-318-317', 'Manage and secure Power BI', 'single', 'Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have five reports and two dashboards in a workspace.

You need to grant all organizational users read access to one dashboard and three reports.

Solution: You create an Azure Active Directory group that contains all the users. You share each selected report

and the one dashboard to the group.

Does this meet the goal?', '["Yes","No"]', '[0]', 'Yes, from the documentation a suggestion made there to share with more than 100 separate users is to "Share
with a user group that contains all the', 'Final', '318', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-319-318', 'Model the data', 'manual', 'DRAG DROP -

You have a Power BI table named Customer that contains a field named Email Address.

You discover that multiple records contain the same email address.

You need to create a calculated column to identify which records have duplicate email addresses.

How should you complete the DAX expression for the calculated column? To answer, drag the appropriate values

to the correct targets. Each value may be used once, more than once, or not at all. You may need to drag the split

bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.

Select and Place:', '[]', '[1,2,0]', 'Calculate

Countrows

All', 'Final', '319', '/dump-assets/f1-319-318-question.webp', '/dump-assets/f1-319-318-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-320-319', 'Prepare the data', 'manual', 'DRAG DROP

-

You publish a dataset that contains data from an on-premises Microsoft SQL Server database.

The dataset must be refreshed daily.

You need to ensure that the Power BI service can connect to the database and refresh the dataset.

Which four actions should you perform n sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.', '[]', '[4,3,2,0]', '1.Configure an on-premises data gateway

The gateway serves as a bridge between the Power BI service and the on-premises SQL Server database.

2.Add a data source

You need to define the connection to the on-premises SQL Server database within the configured gateway,
including credentials and connection details.

3.Add the dataset owner to the data source

Grant the dataset owner access to the data source to ensure they have the required permissions for dataset
refresh.

4.Configure a scheduled refresh

Finally, set up the dataset''s refresh schedule in the Power BI service to automate daily updates.

Explanation:

Why this order?

The gateway must be configured first to enable connectivity to on-premises data.

Adding a data source ensures that the gateway has the details to connect to the SQL Server database.

Dataset owners need access to the data source to enable refresh permissions.

Scheduling the refresh is the last step, as all prerequisites must be met before automation can be set up.

Why other orders are incorrect?

Without configuring the gateway first, there is no connection between Power BI and the on-premises
database.

Adding a data source before configuring the gateway is invalid since the data source depends on the gateway
configuration.

Scheduled refresh cannot be configured until the connection is established and permissions are set.

https://learn.microsoft.com/en-us/data-integration/gateway/service-gateway-install

https://learn.microsoft.com/en-us/power-bi/connect-data/service-gateway-sql-tutorial', 'Final', '320', '/dump-assets/f1-320-319-question.webp', '/dump-assets/f1-320-319-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-321-320', 'Manage and secure Power BI', 'single', 'You have a Power BI dataset and a connected report.

You need to ensure that users can analyze data in Microsoft Excel only by connecting directly to the dataset.

You grant the users the Build permission for the dataset.

What should you do next?', '["Certify the dataset used by the report.","Change the default visual interaction for the report.","For the report, change the Export data setting to None.","For the report, change the Export data setting to Summarized data, data with current layout and underlying data."]', '[2]', 'C is the correct answer. Note the part of the question that says "ONLY by connecting directly to the dataset."
As mentioned in https://www.designmind.com/blog/business-intelligence/export-underlying-data-in-power-
bi, "You should export summarized data when you want to see the relevant data in the visualization."
Therefore, D cannot be the right answer, as summarized data is not obtained from connecting directly to the
dataset, but rather by effectively filtering the dataset based on the contents of the visualization.

Additionally, the "data with current layout and underlying data" part is irrelevant - by allowing Summarized
data to be exported, we allow forms of analyzing data other than connecting directly to the dataset, and thus
fail the requirements of the question.', 'Final', '321', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-322-321', 'Manage and secure Power BI', 'manual', 'HOTSPOT

-

You have two Power BI workspaces named WorkspaceA and WorkspaceB. WorkspaceA contains two datasets

named Sales and HR.

You need to provide a user named User1 with access to the WorkspaceB. The solution must meet the following

requirements:

• Create reports that use the HR dataset.

• Publish the reports to WorkspaceB.

• Prevent the ability to modify the HR dataset.

• Prevent the ability to add users to Workspaces.

What should you do? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Grant User 1 the Build Permission for the HR dataset

Assign User 1 the Contributor role for Workspace B

Build and contributor role to workspace B because the user already has build permission for the HR dataset in
workspace A and now should be able to publish in workspace B, so the user should be given Contributor role
to workspace B.

To copy a report to another workspace, and to create a report in another workspace based on a dataset in the
current workspace, you need Build permission for the dataset. You also need at least the Contributor role on
the source and destination workspaces. For datasets in the original workspace, if you have at least the
Contributor role, you automatically have Build permission through your workspace role.', 'Final', '322', '/dump-assets/f1-322-321-question.webp', '/dump-assets/f1-322-321-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-323-322', 'Manage and secure Power BI', 'multi', 'You have a Power BI workspace named BI Data that contains a dataset named BI Finance.

You have the Build permission for the BI Finance dataset, but you do NOT have permissions for the workspace.

You need to connect to BI Finance and create a report.

Which two actions should you perform? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.', '["From the Power BI service, create a dataflow to the dataset by using DirectQuery.","From Power BI Desktop, connect to a Dataverse data source.","From the Power BI service, create a new report and select a published dataset.","From Power BI Desktop, connect to a shared dataset."]', '[2,3]', 'The answer is correct : CD From the Power BI service, create a new report and select a published dataset.From
Power BI Desktop, connect to a shared dataset.

Why C is Correct:

In the Power BI service, you can create a report by selecting a published dataset that you have Build
permission for, even if you lack permissions for the workspace.

The Build permission allows you to connect to the dataset, build new reports, and save them in your own
workspace or other workspaces where you have permissions.

Why D is Correct:

Using Power BI Desktop, you can connect to a shared dataset in the Power BI service (via "Power BI Datasets"
as the data source) if you have Build permission for it.

After connecting, you can create a report in Power BI Desktop and then publish it to a workspace where you
have appropriate permissions.

Why Other Options Are Incorrect:

A. From the Power BI service, create a dataflow to the dataset by using DirectQuery:

Dataflows are not used to create reports or connect to published datasets. Dataflows are primarily for data
preparation, not report creation.

B. From Power BI Desktop, connect to a Dataverse data source:

This option is unrelated to the BI Finance dataset. Dataverse is a specific type of data source, not a way to
connect to a published Power BI dataset.', 'Final', '323', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-324-323', 'Manage and secure Power BI', 'single', 'You publish a dataset to the Power BI service. The dataset contains a connection to an on-premises Microsoft SQL

Server database.

You attempt to configure a scheduled refresh but cannot select the appropriate on-premises data gateway.

You confirm the following with the administrator of the gateway:

•You have the appropriate permissions to use the gateway.

•The data source was created on the gateway.

•The gateway has a status of Running.

What is the most likely reason the gateway is unavailable?', '["The type of data source is not supported by the on-premises data gateway.","The server name in the PBIX file does not match the data source name in the gateway.","The credentials for the data source are invalid.","The data source is configured to use single sign-on (SSO)."]', '[1]', 'In Power BI, when you configure a data source to use an on-premises data gateway, the server name and other
connection details in your PBIX file must match the data source configuration in the gateway. If there''s a
mismatch in the server name or other connection details, the scheduled refresh won''t work, and you won''t be
able to select the appropriate gateway.

The issue is most likely caused by a mismatch between the server name in the Power BI report (PBIX file) and
the data source configuration in the on-premises data gateway. Power BI needs the server name in the report
to exactly match the one configured in the gateway for the scheduled refresh to be available.

Why other options are incorrect:

A: If the data source type was unsupported, it wouldn’t allow any connection, not just scheduled refresh.

C: Invalid credentials typically block access but would show a different error.

D: Single sign-on would not prevent the selection of the gateway.', 'Final', '324', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-325-324', 'Manage and secure Power BI', 'single', 'You create a report by using Microsoft Power BI Desktop.

The report uses data from a Microsoft SQL Server Analysis Services (SSAS) tabular model located on your

company''s internal network.

You plan to publish the report to the Power BI Service.

What should you implement to ensure that users who consume the report from the Power BI Service have the most

up-to-date data from the tabular model?', '["a scheduled refresh of the semantic model","an OData feed","an On-premises data gateway","a subscription"]', '[2]', 'an On-premises data gateway.

To ensure that users in the Power BI Service always have the most up-to-date data from an on-premises SQL
Server Analysis Services (SSAS) tabular model, you need to use an on-premises data gateway. This gateway
securely connects the Power BI Service to on-premises data sources, allowing scheduled refreshes and real-
time data access.

Why other options are incorrect:

A: Scheduled refresh is for cloud data sources, not for on-premises SSAS.

B: OData feed is not suitable for SSAS connections.

D: Subscriptions only deliver reports; they don''t ensure data refresh.', 'Final', '325', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-326-325', 'Manage and secure Power BI', 'manual', 'HOTSPOT

-

You have a semantic model that has the permissions shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Use Analyze in Excel with.

grant the Build permission for.

see: https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions

"Say you have Reshare and Build permission on a dataset. When you share a report or dashboard built on that
dataset, you can specify that the recipients also get Build permission for the underlying dataset."

If you have Reshare and Build permission on a dataset, and you share a report or dashboard you built on that
dataset, you can specify that the recipients also get Build permission for the dataset. For more information,
see Share Power BI reports and dashboards with coworkers and others.

https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions', 'Final', '326', '/dump-assets/f1-326-325-question.webp', '/dump-assets/f1-326-325-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-327-326', 'Manage and secure Power BI', 'single', 'You have a Power BI semantic model named Model1 that contains sales data.

You need to ensure that Model1 is refreshed on the first day of each month to include last month’s sales data.

What should you configure?', '["a scheduled refresh","an incremental refresh","a Microsoft Power Automate flow","an on-premises data gateway"]', '[2]', 'Independent correction: C. Use a Microsoft Power Automate flow with a monthly recurrence on day 1, followed by the Power BI refresh action. Incremental refresh controls partitions, the gateway provides connectivity, and the classic scheduled-refresh settings do not directly express a first-day-of-month schedule.', 'Final', '327', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-328-327', 'Model the data', 'single', 'You need to create the

required relationship for the executive''s visual.

What should you do before you can create the relationship?', '["Change the data type of Sales[region_id] to Whole Number.","Change the data type of Sales[region_id] to Decimal Number.","In the Sales table, add a measure for Sum(sales_amount).","Change the data type of Sales[sales_id] to Text."]', '[0]', 'Executives require a visual that shows sales by region.

The data type of Sales[region_id] must be changed from varchar to Whole Number, as Sales[region_id] is
Integer.', 'Final', '328', '/exhibit-assets/f1-328-327.webp', NULL, 'Litware, Inc. — Case Study

Overview -

Litware, Inc. is an online retailer that uses Power BI.

Litware plans to leverage data from an Azure SQL database that stores data for the company''s live e-commerce

website.

Litware uses Azure Active Directory (Azure AD) to authenticate users.

Existing Environment. Sales Data

Litware has online sales data that has the SQL schema shown in the following table.

In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.

The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.

In the Sales table, the sales_id column represents a unique transaction.

The region id column can be managed by only one sales manager.

Existing Environment. Data Concerns

You are concerned with the quality and completeness of the sales data. You must ensure that negative and missing

sales_amount values do NOT contribute to the total sales amount calculation.

Existing Environment. Reporting Requirements

Litware identifies the following reporting requirements:

Executives require a visual that shows sales by region.

Executives require a visual that shows returns by region manager and the sales managers that report to them.

The sales managers must be able to see only the sales data of their respective region.

The sales managers require a visual to analyze sales performance versus sales targets.

The sales department requires reports that contain the number of sales transactions.

Users must be able to see the month in each report as shown in the following example: Feb 2020.

The customer service department requires a visual that can be filtered by both sales month and ship month

independently.

The maximum allowed latency to include transactions in reports is five minutes.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-329-328', 'Model the data', 'single', 'You need to get data

from the Microsoft SQL Server tables.

What should you use to configure the connection?', '["Import that uses a Microsoft account","Import that uses a database credential","DirectQuery that uses a database credential","DirectQuery that uses the end-user''s credentials"]', '[2]', 'C. DirectQuery that uses a database credential

If you used the credentials of the user (D) then all users would need to be created in the database.', 'Final', '329', '/exhibit-assets/f1-329-328.webp', NULL, 'Litware, Inc. — Case Study

Overview -

Litware, Inc. is an online retailer that uses Power BI.

Litware plans to leverage data from an Azure SQL database that stores data for the company''s live e-commerce

website.

Litware uses Azure Active Directory (Azure AD) to authenticate users.

Existing Environment. Sales Data

Litware has online sales data that has the SQL schema shown in the following table.

In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.

The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.

In the Sales table, the sales_id column represents a unique transaction.

The region id column can be managed by only one sales manager.

Existing Environment. Data Concerns

You are concerned with the quality and completeness of the sales data. You must ensure that negative and missing

sales_amount values do NOT contribute to the total sales amount calculation.

Existing Environment. Reporting Requirements

Litware identifies the following reporting requirements:

Executives require a visual that shows sales by region.

Executives require a visual that shows returns by region manager and the sales managers that report to them.

The sales managers must be able to see only the sales data of their respective region.

The sales managers require a visual to analyze sales performance versus sales targets.

The sales department requires reports that contain the number of sales transactions.

Users must be able to see the month in each report as shown in the following example: Feb 2020.

The customer service department requires a visual that can be filtered by both sales month and ship month

independently.

The maximum allowed latency to include transactions in reports is five minutes.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-330-329', 'Prepare the data', 'single', 'You are creating a new semantic model in Microsoft Power BI Desktop.

You connect to a recently used data source and receive an error message indicating that the password is expired.

You need to update the credentials for the data source.

What should you do?', '["From Data Source settings, select the data source, and then select Edit Permissions.","From Options, select Data Load, and then select Clear Cache.","From Power Query Editor, select Refresh Preview.","From the Modeling tab, select Manage Roles, and then add a role."]', '[0]', 'A. From Data Source settings, select the data source, and then select Edit Permissions.

Data Source Settings: This option allows you to manage the credentials for your data sources. By selecting
the data source and choosing to edit permissions, you can update the credentials, such as entering a new
password if the old one has expired.', 'Final', '330', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-331-330', 'Prepare the data', 'single', 'You use Power BI Desktop to open a PBIX file that contains a Microsoft Excel data source.

You attempt to refresh the data and receive the following error message.

Expression.Error: The column ‘Cost’ of the table wasn''t found.

What is a possible cause of the error?', '["The Cost column was renamed in the data source.","The privacy level of the data source does not allow combining the data with other data sources.","The data in the Cost column cannot be converted into the target data type.","The source file was moved to a new location."]', '[0]', 'A. The Cost column was renamed in the data source.

When a column name is changed in the data source (e.g., Microsoft Excel), Power BI will not be able to find the
column with the original name during the refresh, leading to the error you encountered.', 'Final', '331', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-332-331', 'Manage and secure Power BI', 'single', 'You have a Power BI tenant that contains a workspace named WS1. WS1 contains the following items:

•A semantic model named SM1.

•A report named RPT1 that is connected to SM1.

•A report named RPT2 that is connected to SM1.

•A report named RPT3 that is connected to SM1.

•A dashboard named DB1 that contains content from RPT1 and RPT2.

You need to grant workspace access to a group named Group1. The solution must meet the following

requirements:

•Group1 must be able to view RPT1, RPT2, and DB1.

•Group1 must be prevented from viewing RPT3.

•Group1 must be prevented from creating new reports and dashboards by using SM1.

•Group1 must be prevented from sharing the reports and dashboards to other users.

•Administrative effort must be minimized.

What should you do?', '["Publish an app.","Assign Group1 the Viewer role for WS1.","Store PBIX files in a shared folder in Microsoft OneDrive.","Share each item individually."]', '[0]', 'Group1 must view specific reports and dashboards (RPT1, RPT2, DB1):•Publishing an app allows you to share
selected reports and dashboards with specific groups or users.•Group1 must be prevented from viewing
RPT3:•Apps allow fine-grained control, so you can exclude RPT3 from the app content.•Group1 must not
create new reports or dashboards or share content:•When users access content via an app, they cannot edit or
create new reports/dashboards or share the app itself.•Minimize administrative effort:•Publishing an app is
simpler and more manageable than other options.', 'Final', '332', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-333-332', 'Manage and secure Power BI', 'manual', 'HOTSPOT

-

You have a Power BI semantic model named Model1 that will be used to support reports viewed in the Power BI

service.

Model1 contains data from the following sources:

•An Azure SQL database that is accessible only via a private endpoint

•A Microsoft Excel file stored in Microsoft SharePoint Online

•A Microsoft SQL Server database in a private datacenter

You need to publish Model1 and schedule the model to refresh 12 times a day.

How many data sources require a data gateway, and which license mode will the workspace require to support the

scheduled refresh? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', '1. Data Sources: 2.

This selection suggests that the system or report is using two data sources.

Data sources in Power BI can include databases (SQL Server, Azure, etc.), cloud services, Excel files, APIs, and
more.

The choice of "2" means the report is integrating data from two separate sources.

2. License Mode: Premium Per User (PPU).

Power BI offers different licensing modes:

Embedded: Used for embedding reports in applications, typically for external users.

Pro: Required for sharing reports and collaborating within an organization.

Premium Per User (PPU): A mix of Power BI Pro and Premium, offering advanced AI, larger dataset storage,
and paginated reports at a per-user cost.', 'Final', '333', '/dump-assets/f1-333-332-question.webp', '/dump-assets/f1-333-332-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-334-333', 'Manage and secure Power BI', 'manual', 'DRAG DROP

-

You have a Power BI semantic model.

You need to configure row-level security (RLS) to restrict data access for users that have the Viewer permissions.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of

actions to the answer area and arrange them in the correct order.', '[]', '[3,0,2]', '1. From Microsoft Power BI Desktop, create a new RLS role by using a DAX filter.

You must first define the RLS roles and the corresponding DAX filters in Power BI Desktop to determine how
data is restricted for different users.

2. Publish the semantic model.

After creating the RLS roles, you need to publish the semantic model to the Power BI Service to apply these
roles in the cloud environment.

3. From the Power BI service, assign the new RLS role to the users.

Once the model is published, you assign the roles to specific users or groups in the Power BI Service to
enforce RLS.', 'Final', '334', '/dump-assets/f1-334-333-question.webp', '/dump-assets/f1-334-333-answer.webp', NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-335-334', 'Manage and secure Power BI', 'multi', 'You have a Power BI report named Report1.

You plan to share Report1 with multiple users.

You need to add the users to a group.

Which two types of groups can you use? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.', '["security group","distribution group","Microsoft Teams team","Microsoft 365 group"]', '[0,3]', 'To share a Power BI report named Report1 with multiple users by adding them to a group, you can use the
following types of groups:A. Security groupD. Microsoft 365 groupBoth security groups and Microsoft 365
groups can be used to manage access to Power BI reports. Security groups are typically used for managing
permissions and access control, while Microsoft 365 groups provide a collaborative workspace with shared
resources, including access to Power BI reports. Distribution groups and Microsoft Teams teams are not
typically used for managing access to Power BI reports in this context.

A. security group Security groups can be used to manage user access and permissions in Power BI.D.
Microsoft 365 group Microsoft 365 groups (formerly known as Office 365 groups) can also be used to
manage access and permissions in Power BI, and they integrate well with other Microsoft 365 services.', 'Final', '335', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-336-335', 'Prepare the data', 'single', 'You plan to create a Power BI report that will be connected to multiple data sources. One of the data sources

contains tax records.

You need to ensure that other queries cannot access the tax record information.

To what should you set Privacy Level for the data source?', '["None","Organizational","Private","Public"]', '[2]', 'Setting the Privacy Level to Private ensures that the data source is completely isolated from all other sources
in Power Query.- This prevents data leakage through query folding or merging operations, which could
otherwise expose sensitive tax record information to less secure sources.- Power BI will block any attempt to
combine this data with other sources unless they are also marked Private and reside in the same isolation
zone.', 'Final', '336', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-337-336', 'Manage and secure Power BI', 'single', 'You have a semantic model named Model1.

You need to ensure that users can verify that the data in Model1 meets corporate standards.

What should you do?', '["Create an image of Model1.","Promote Model1.","Certify Model1.","Apply a sensitivity label to Model1."]', '[2]', 'Certification is the highest level of endorsement in Power BI’s data governance framework.- It signals to users

that Model1 has been reviewed and approved by trusted data stewards or administrators as meeting
corporate standards for quality, accuracy, and compliance.- Certified datasets appear with a badge and are
prioritized in search results, helping users confidently choose the right data source.', 'Final', '337', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-338-337', 'Manage and secure Power BI', 'single', 'You attempt to open a PBIX file in Microsoft Power BI Desktop and receive the following error message in Power

Query Editor.

DataSource.Error: Could not find file D:\Data.txt.

How should you resolve the issue?', '["Update the Microsoft OLE DB Provider client libraries on your client computer.","Change the file path of Data.txt.","Change the file format to CSV.","Use an on-premises data gateway."]', '[1]', 'B: Change the file path of Data.txt.

Placing the Data.txt file in D:\, if you have access to it, or

Going to Power Query Editor → Source step and modifying the file path to wherever Data.txt is currently
stored on your machine.', 'Final', '338', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-339-338', 'Manage and secure Power BI', 'single', 'You have a Fabric workspace named Workspace1 that contains two Power BI reports named Report1 and Report2.

You create a workspace app that contains both reports.

You need to ensure that the app meets the following requirements:

•Report1 must be visible to all the users in your organization.

•Report2 must be visible to only a security group named Group1.

What should you do next?', '["Assign Group1 the Viewer role for Workspace1.","Create an audience and assign Group1 to the audience.","Allow access to the hidden content of the app.","Share Report1 with the built-in All users security group."]', '[1]', 'B. Create an audience and assign Group1 to the audience.

Power BI apps now support audiences, which allow you to:

Customize which reports are visible to which groups.

Assign different content to different audiences (e.g., departments, roles, security groups).

You can:

Publish Report1 to the default (All Users) audience.

Create a new audience for Group1 and publish Report2 only to them.

This approach meets both requirements in a clean and scalable way.', 'Final', '339', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-340-339', 'Manage and secure Power BI', 'manual', 'HOTSPOT

-

You have a Fabric workspace that contains the items shown in the following table.

You need to make content available to the management department and the accounting department at your

company. The solution must meet the following requirements:

•The management department must have view access to the Headcount and Department Expenses reports.

•The management department must NOT be able to view any other current or future reports.

•The management department must NOT be able to build new reports by using the semantic models.

•The accounting department must only be able to view the Company Expenses report.

•The accounting department must be able to build new reports by using the Expenses semantic model.

The solution must follow the principle of least privilege and minimize administrative effort.

How should you make the content available to the users in each department? To answer, select the appropriate

options in the answer area.

NOTE: Each collect selection is worth one point.', '[]', '[]', 'Independent correction:

Management: Publish an app.

Accounting: Publish the app with a dedicated audience, expose only the required report, and grant Build only on the Expenses semantic model when needed. This follows least privilege more closely than assigning the Viewer workspace role.', 'Final', '340', '/dump-assets/f1-340-339-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-341-340', 'Manage and secure Power BI', 'single', 'You have a PBIX file that contains sensitive information.

You need to secure the information to meet the following requirements:

•Only internal users must be able to open the file if the file is shared via email.

•Once the file is published, only internal users must be able to open the semantic model and the report downloaded

from the Power BI service.

What should you do?', '["From Microsoft Power BI Desktop, apply a sensitivity label.","Certify the semantic model and the report.","Use a live connection for the file.","From the Power BI service, apply a sensitivity label."]', '[0]', 'A .From Microsoft Power BI Desktop, apply a sensitivity label: You can apply sensitivity labels directly in
Power BI Desktop before publishing. When you publish a PBIX file with a sensitivity label, that label (and its
associated protection settings) travels with the semantic model and report into the service.', 'Final', '341', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-342-341', 'Manage and secure Power BI', 'single', 'You need to create the dataset.

Which dataset mode should you use?', '["Import","DirectQuery","Composite","live connection"]', '[0]', 'You wouldn''t use composite for all. I would say import as the SQL Server data is only 2GB and excel is really
small. Also, only need it refreshing once a day so this dataset is very small. Answer is A (Import)', 'Final', '342', '/exhibit-assets/f1-342-341.webp', NULL, 'Northwind Traders — Case Study

General Overview -

Northwind Traders is a specialty food import company.

The company recently implemented Power BI to better understand its top customers, products, and suppliers.

Business Issues -

The sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting Services

(SSRS). The IT department takes too long to generate the reports and often misunderstands the report

requirements.

Existing Environment. Data Sources

Northwind Traders uses the data sources shown in the following table.

Source2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.

Existing Environment. Customer Worksheet

Source2 contains a single worksheet named Customer Details. The first 11 rows of the worksheet are shown in the

following table.

All the fields in Source2 are mandatory.

The Address column in Customer Details is the billing address, which can differ from the shipping address.

Existing Environment. Azure SQL Database

Source1 contains the following tables:

Orders

Products

Suppliers

Categories

Order Details

Sales Employees

The Orders table contains the following columns.

The Order Details table contains the following columns.

The address in the Orders table is the shipping address, which can differ from the billing address.

The Products table contains the following columns.

The Categories table contains the following columns.

The Suppliers table contains the following columns.

The Sales Employees table contains the following columns.

Each employee in the Sales Employees table is assigned to one sales region. Multiple employees can be assigned

to each region.

Requirements. Report Requirements

Northwind Traders requires the following reports:

Top Products

Top Customers

On-Time Shipping

The Top Customers report will show the top 20 customers based on the highest sales amounts in a selected order

month or quarter, product category, and sales region.

The Top Products report will show the top 20 products based on the highest sales amounts sold in a selected order

month or quarter, sales region, and product category. The report must also show which suppliers provide the top

products.

The On-Time Shipping report will show the following metrics for a selected shipping month or quarter:

The percentage of orders that were shipped late by country and shipping region

Customers that had multiple late shipments during the last quarter

Northwind Traders defines late orders as those shipped after the required shipping date.

The warehouse shipping department must be notified if the percentage of late orders within the current month

exceeds 5%.

The reports must show historical data for the current calendar year and the last three calendar years.

Requirements. Technical Requirements

Northwind Traders identifies the following technical requirements:

A single dataset must support all three reports.

The reports must be stored in a single Power BI workspace.

Report data must be current as of 7 AM Pacific Time each day.

The reports must provide fast response times when users interact with a visualization.

The data model must minimize the size of the dataset as much as possible, while meeting the report requirements

and the technical requirements.

Requirements. Security Requirements

Access to the reports must be granted to Azure Active Directory (Azure AD) security groups only. An Azure AD

security group exists for each department.

The sales department must be able to perform the following tasks in Power BI:

Create, edit, and delete content in the reports.

Manage permissions for workspaces, datasets, and reports.

Publish, unpublish, update, and change the permissions for an app.

Assign Azure AD groups role-based access to the reports workspace.

Users in the sales department must be able to access only the data of the sales region to which they are assigned

in the Sales Employees table.

Power BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees table.

[EmailAddress] = USERNAME()

RLS will be applied only to the sales department users. Users in all other departments must be able to view all the

data.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-343-342', 'Manage and secure Power BI', 'single', 'You need to configure access for the sales department users. The solution must the meet the

security requirements.

What should you do?', '["Share each report to the Azure Active Directory group of the sales department.","Add the Azure Active Directory group of the sales department as an Admin of the reports workspace.","Distribute an app to the users in the Azure Active Directory group of the sales department.","Add the sales department as a member of the reports workspace."]', '[3]', 'D - Add the sales department as a member of the reports workspace.

For the actions they need to perform (edit reports, publish app, etc) the Member role would be the least
privilege', 'Final', '343', '/exhibit-assets/f1-343-342.webp', NULL, 'Northwind Traders — Case Study

General Overview -

Northwind Traders is a specialty food import company.

The company recently implemented Power BI to better understand its top customers, products, and suppliers.

Business Issues -

The sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting Services

(SSRS). The IT department takes too long to generate the reports and often misunderstands the report

requirements.

Existing Environment. Data Sources

Northwind Traders uses the data sources shown in the following table.

Source2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.

Existing Environment. Customer Worksheet

Source2 contains a single worksheet named Customer Details. The first 11 rows of the worksheet are shown in the

following table.

All the fields in Source2 are mandatory.

The Address column in Customer Details is the billing address, which can differ from the shipping address.

Existing Environment. Azure SQL Database

Source1 contains the following tables:

Orders

Products

Suppliers

Categories

Order Details

Sales Employees

The Orders table contains the following columns.

The Order Details table contains the following columns.

The address in the Orders table is the shipping address, which can differ from the billing address.

The Products table contains the following columns.

The Categories table contains the following columns.

The Suppliers table contains the following columns.

The Sales Employees table contains the following columns.

Each employee in the Sales Employees table is assigned to one sales region. Multiple employees can be assigned

to each region.

Requirements. Report Requirements

Northwind Traders requires the following reports:

Top Products

Top Customers

On-Time Shipping

The Top Customers report will show the top 20 customers based on the highest sales amounts in a selected order

month or quarter, product category, and sales region.

The Top Products report will show the top 20 products based on the highest sales amounts sold in a selected order

month or quarter, sales region, and product category. The report must also show which suppliers provide the top

products.

The On-Time Shipping report will show the following metrics for a selected shipping month or quarter:

The percentage of orders that were shipped late by country and shipping region

Customers that had multiple late shipments during the last quarter

Northwind Traders defines late orders as those shipped after the required shipping date.

The warehouse shipping department must be notified if the percentage of late orders within the current month

exceeds 5%.

The reports must show historical data for the current calendar year and the last three calendar years.

Requirements. Technical Requirements

Northwind Traders identifies the following technical requirements:

A single dataset must support all three reports.

The reports must be stored in a single Power BI workspace.

Report data must be current as of 7 AM Pacific Time each day.

The reports must provide fast response times when users interact with a visualization.

The data model must minimize the size of the dataset as much as possible, while meeting the report requirements

and the technical requirements.

Requirements. Security Requirements

Access to the reports must be granted to Azure Active Directory (Azure AD) security groups only. An Azure AD

security group exists for each department.

The sales department must be able to perform the following tasks in Power BI:

Create, edit, and delete content in the reports.

Manage permissions for workspaces, datasets, and reports.

Publish, unpublish, update, and change the permissions for an app.

Assign Azure AD groups role-based access to the reports workspace.

Users in the sales department must be able to access only the data of the sales region to which they are assigned

in the Sales Employees table.

Power BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees table.

[EmailAddress] = USERNAME()

RLS will be applied only to the sales department users. Users in all other departments must be able to view all the

data.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-344-343', 'Manage and secure Power BI', 'manual', 'HOTSPOT -

You need to create a solution to meet the notification requirements of the warehouse shipping department.

What should you do? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: dashboard -

The warehouse shipping department must be notified if the percentage of late orders within the current
month exceeds 5%.

You can set alerts to notify you when data in your dashboards changes beyond limits you set.

Box 2: data alert -

Reference:

https://docs.microsoft.com/en-us/power-bi/create-reports/service-set-data-alerts', 'Final', '344', '/dump-assets/f1-344-343-question.webp', '/dump-assets/f1-344-343-answer.webp', 'Northwind Traders — Case Study

General Overview -

Northwind Traders is a specialty food import company.

The company recently implemented Power BI to better understand its top customers, products, and suppliers.

Business Issues -

The sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting Services

(SSRS). The IT department takes too long to generate the reports and often misunderstands the report

requirements.

Existing Environment. Data Sources

Northwind Traders uses the data sources shown in the following table.

Source2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.

Existing Environment. Customer Worksheet

Source2 contains a single worksheet named Customer Details. The first 11 rows of the worksheet are shown in the

following table.

All the fields in Source2 are mandatory.

The Address column in Customer Details is the billing address, which can differ from the shipping address.

Existing Environment. Azure SQL Database

Source1 contains the following tables:

Orders

Products

Suppliers

Categories

Order Details

Sales Employees

The Orders table contains the following columns.

The Order Details table contains the following columns.

The address in the Orders table is the shipping address, which can differ from the billing address.

The Products table contains the following columns.

The Categories table contains the following columns.

The Suppliers table contains the following columns.

The Sales Employees table contains the following columns.

Each employee in the Sales Employees table is assigned to one sales region. Multiple employees can be assigned

to each region.

Requirements. Report Requirements

Northwind Traders requires the following reports:

Top Products

Top Customers

On-Time Shipping

The Top Customers report will show the top 20 customers based on the highest sales amounts in a selected order

month or quarter, product category, and sales region.

The Top Products report will show the top 20 products based on the highest sales amounts sold in a selected order

month or quarter, sales region, and product category. The report must also show which suppliers provide the top

products.

The On-Time Shipping report will show the following metrics for a selected shipping month or quarter:

The percentage of orders that were shipped late by country and shipping region

Customers that had multiple late shipments during the last quarter

Northwind Traders defines late orders as those shipped after the required shipping date.

The warehouse shipping department must be notified if the percentage of late orders within the current month

exceeds 5%.

The reports must show historical data for the current calendar year and the last three calendar years.

Requirements. Technical Requirements

Northwind Traders identifies the following technical requirements:

A single dataset must support all three reports.

The reports must be stored in a single Power BI workspace.

Report data must be current as of 7 AM Pacific Time each day.

The reports must provide fast response times when users interact with a visualization.

The data model must minimize the size of the dataset as much as possible, while meeting the report requirements

and the technical requirements.

Requirements. Security Requirements

Access to the reports must be granted to Azure Active Directory (Azure AD) security groups only. An Azure AD

security group exists for each department.

The sales department must be able to perform the following tasks in Power BI:

Create, edit, and delete content in the reports.

Manage permissions for workspaces, datasets, and reports.

Publish, unpublish, update, and change the permissions for an app.

Assign Azure AD groups role-based access to the reports workspace.

Users in the sales department must be able to access only the data of the sales region to which they are assigned

in the Sales Employees table.

Power BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees table.

[EmailAddress] = USERNAME()

RLS will be applied only to the sales department users. Users in all other departments must be able to view all the

data.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-345-344', 'Model the data', 'single', 'You need to create the relationship

between the product list and the revenue results. The solution must minimize the time it takes to render visuals.

What should you set as the relationship cardinality?', '["One to one","Many to many","Many to one","One to many"]', '[3]', 'One product in the product list can occur many times in the revenue results.
Note 1: One to many (1:*): In a one-to-many relationship, the column in one table has only one instance of a
particular value, and the other related table can have more than one instance of a value.
Note 2:
Revenue data is provided at the date and product level.
The board must be able to get the following information from the quarterly reports:

Revenue trends over time -
The percent of total revenue contributed by each product category
A comparison of quarterly revenue versus the same quarter from the previous year

Reference:
https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships', 'Final', '345', '/exhibit-assets/f1-345-344.webp', NULL, 'Contoso, Ltd. — Case Study

Overview -

Contoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board

meetings for which financial analysts manually prepare

Microsoft Excel reports, including balance sheets and profit and loss statements for each of the company''s four

business units.

Existing Environment -

Data and Sources -

Data for the reports comes from the sources shown in the following table.

The balance sheet data is unrelated to the profit and loss results other than they both relate to dates.

Balance Sheet Data -

The balance sheet data is imported and includes the final monthly balances of each account in the format shown in

the following table.

The balance sheet data always includes a row for each account for each month.

Product Catalog Data -

The product catalog shows how products roll up to product categories, which roll up to the business units. The

product list is provided in the format shown in the following table.

Revenue data is provided at the date and product level. Expense data is provided at the date and department level.

Business Issues -

Historically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is

usually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an

Excel formula. On occasion, there are conflicting results in the reports because the products and departments that

roll up to each business unit are not defined consistently.

Requirements -

Planned Changes -

Contoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants

to reduce how long it takes to populate the reports to less than two days. The company wants to create common

logic for the business units, products, and departments. The logic will be used across all reports, including but not

limited to the quarterly reporting for the board.

Technical Requirements -

Contoso wants the reports and datasets refreshed with minimum manual effort.

The company wants to provide the board with a single package of reports that will contain custom navigation and

links to supplementary information.

Maintenance, including manually updating data and access, must be minimized as much as possible.

Security Requirements -

The reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group

will be used to share information with the board.

Contoso identifies the following security requirements for analyst access:

Analysts must be able to access all balance sheet and product catalog data.

Analysts must be able to access only the profit and loss data of their respective business unit.

Analysts must be able to create new reports from the dataset that contains the profit and loss data, but the

reports built by the analysts must NOT be included in the quarterly reports for the board.

Analysts must NOT be able to share the quarterly reports with anyone.

Analysts must NOT be able to make new reports by using the balance sheet data.

Report Requirements -

You plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the

last day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the

ending balances for the quarter, as well as for the previous quarter.

The date table will contain the columns shown in the following table.

The definitions and attributes for the products, departments, and business units must be consistent across all the

reports.

The board must be able to get the following information from the quarterly reports:

Revenue trends over time

The ending balances of each account

Changes in long-term liabilities from the previous quarter

The percent of total revenue contributed by each product category

A comparison of quarterly revenue versus the same quarter from the previous year

The reports must be updated with the latest data by 5 AM each day.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-346-345', 'Model the data', 'manual', 'HOTSPOT -

You need to create a measure that returns the percent of revenue by product category.

How should you complete the measure? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: CALCULATE -

CALCULATE evaluates an expression in a modified filter context.

Syntax: CALCULATE(<expression>[, <filter1> [, <filter2> [, �]]])

Box 2: ALL-

Box 3: DIVIDE -

DIVIDE performs a division.

Example: MEASURE FactInternetSales[%Sales] = DIVIDE([TotalSales],
CALCULATE([TotalSales],REMOVEFILTERS()))

Note: The RETURN keyword consumes variables defined in previous VAR statements.

VAR AllCategoryRev =

CALCULATE(SUM([Revenue]),

ALL(ProductList[ProductCategory]))

RETURN

DIVIDE(SUM([Revenue]), AllCategoryRev

Anyone with experience in DAX would only need to read the question in these case study questions. The
questions seem to hint the answer already.. for this question for example anyone would know that the moment
you see a percentage of the total is required you would immediately go with the ALL function and the rest is
easy.

Reference:

https://docs.microsoft.com/en-us/dax/calculate-function-dax

https://docs.microsoft.com/en-us/dax/removefilters-function-dax https://dax.guide/st/return/', 'Final', '346', '/dump-assets/f1-346-345-question.webp', '/dump-assets/f1-346-345-answer.webp', 'Contoso, Ltd. — Case Study

Overview -

Contoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board

meetings for which financial analysts manually prepare

Microsoft Excel reports, including balance sheets and profit and loss statements for each of the company''s four

business units.

Existing Environment -

Data and Sources -

Data for the reports comes from the sources shown in the following table.

The balance sheet data is unrelated to the profit and loss results other than they both relate to dates.

Balance Sheet Data -

The balance sheet data is imported and includes the final monthly balances of each account in the format shown in

the following table.

The balance sheet data always includes a row for each account for each month.

Product Catalog Data -

The product catalog shows how products roll up to product categories, which roll up to the business units. The

product list is provided in the format shown in the following table.

Revenue data is provided at the date and product level. Expense data is provided at the date and department level.

Business Issues -

Historically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is

usually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an

Excel formula. On occasion, there are conflicting results in the reports because the products and departments that

roll up to each business unit are not defined consistently.

Requirements -

Planned Changes -

Contoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants

to reduce how long it takes to populate the reports to less than two days. The company wants to create common

logic for the business units, products, and departments. The logic will be used across all reports, including but not

limited to the quarterly reporting for the board.

Technical Requirements -

Contoso wants the reports and datasets refreshed with minimum manual effort.

The company wants to provide the board with a single package of reports that will contain custom navigation and

links to supplementary information.

Maintenance, including manually updating data and access, must be minimized as much as possible.

Security Requirements -

The reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group

will be used to share information with the board.

Contoso identifies the following security requirements for analyst access:

Analysts must be able to access all balance sheet and product catalog data.

Analysts must be able to access only the profit and loss data of their respective business unit.

Analysts must be able to create new reports from the dataset that contains the profit and loss data, but the

reports built by the analysts must NOT be included in the quarterly reports for the board.

Analysts must NOT be able to share the quarterly reports with anyone.

Analysts must NOT be able to make new reports by using the balance sheet data.

Report Requirements -

You plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the

last day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the

ending balances for the quarter, as well as for the previous quarter.

The date table will contain the columns shown in the following table.

The definitions and attributes for the products, departments, and business units must be consistent across all the

reports.

The board must be able to get the following information from the quarterly reports:

Revenue trends over time

The ending balances of each account

Changes in long-term liabilities from the previous quarter

The percent of total revenue contributed by each product category

A comparison of quarterly revenue versus the same quarter from the previous year

The reports must be updated with the latest data by 5 AM each day.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-347-346', 'Model the data', 'manual', 'DRAG DROP -

Once the profit and loss dataset is created, which four actions should you perform in sequence to ensure that the

business unit analysts see the appropriate profit and loss data? To answer, move the appropriate actions from the

list of actions to the answer area and arrange them in the correct order.

Select and Place:', '[]', '[3,1,4,2]', '1) Create four roles

2) add DAX filters

3) publish

4) add role members

Contributor role give analysts a possibility to save reports to a workspace, which is not permitted by
requirements

Reference:

https://docs.microsoft.com/en-us/power-bi/enterprise/service-admin-rls', 'Final', '347', '/dump-assets/f1-347-346-question.webp', '/dump-assets/f1-347-346-answer.webp', 'Contoso, Ltd. — Case Study

Overview -

Contoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board

meetings for which financial analysts manually prepare

Microsoft Excel reports, including balance sheets and profit and loss statements for each of the company''s four

business units.

Existing Environment -

Data and Sources -

Data for the reports comes from the sources shown in the following table.

The balance sheet data is unrelated to the profit and loss results other than they both relate to dates.

Balance Sheet Data -

The balance sheet data is imported and includes the final monthly balances of each account in the format shown in

the following table.

The balance sheet data always includes a row for each account for each month.

Product Catalog Data -

The product catalog shows how products roll up to product categories, which roll up to the business units. The

product list is provided in the format shown in the following table.

Revenue data is provided at the date and product level. Expense data is provided at the date and department level.

Business Issues -

Historically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is

usually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an

Excel formula. On occasion, there are conflicting results in the reports because the products and departments that

roll up to each business unit are not defined consistently.

Requirements -

Planned Changes -

Contoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants

to reduce how long it takes to populate the reports to less than two days. The company wants to create common

logic for the business units, products, and departments. The logic will be used across all reports, including but not

limited to the quarterly reporting for the board.

Technical Requirements -

Contoso wants the reports and datasets refreshed with minimum manual effort.

The company wants to provide the board with a single package of reports that will contain custom navigation and

links to supplementary information.

Maintenance, including manually updating data and access, must be minimized as much as possible.

Security Requirements -

The reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group

will be used to share information with the board.

Contoso identifies the following security requirements for analyst access:

Analysts must be able to access all balance sheet and product catalog data.

Analysts must be able to access only the profit and loss data of their respective business unit.

Analysts must be able to create new reports from the dataset that contains the profit and loss data, but the

reports built by the analysts must NOT be included in the quarterly reports for the board.

Analysts must NOT be able to share the quarterly reports with anyone.

Analysts must NOT be able to make new reports by using the balance sheet data.

Report Requirements -

You plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the

last day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the

ending balances for the quarter, as well as for the previous quarter.

The date table will contain the columns shown in the following table.

The definitions and attributes for the products, departments, and business units must be consistent across all the

reports.

The board must be able to get the following information from the quarterly reports:

Revenue trends over time

The ending balances of each account

Changes in long-term liabilities from the previous quarter

The percent of total revenue contributed by each product category

A comparison of quarterly revenue versus the same quarter from the previous year

The reports must be updated with the latest data by 5 AM each day.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-348-347', 'Model the data', 'single', 'Which DAX expression should you

use to get the ending balances in the balance sheet reports?', '["CALCULATE ( SUM( BalanceSheet[BalanceAmount] ), LASTDATE ( ''Date''[Date] ) )","CALCULATE ( SUM( BalanceSheet[BalanceAmount] ), DATESQTD(''Date''[Date]) )","FIRSTNONBLANK (''Date''[Date] SUM( BalanceSheet[BalanceAmount] ) )","CALCULATE ( MAX( BalanceSheet[BalanceAmount] ), LASTDATE (''Date''[Date] ))"]', '[0]', 'A) - LASTDATE()

as we do not sum the balances of last 3 months

The board meeting requires quarter balance. For example, Jan - Mar. So what we need is the balance as at 31
Mar, the LASTDATE is appropriate. The balance sheet already gives you the number directly. No need to
calculate up to 3 months.

In case of using DATESQTD, daily sale and expenses will be listed in a table rather than balance in balance
sheet.', 'Final', '348', '/exhibit-assets/f1-348-347.webp', NULL, 'Contoso, Ltd. — Case Study

Overview -

Contoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board

meetings for which financial analysts manually prepare

Microsoft Excel reports, including balance sheets and profit and loss statements for each of the company''s four

business units.

Existing Environment -

Data and Sources -

Data for the reports comes from the sources shown in the following table.

The balance sheet data is unrelated to the profit and loss results other than they both relate to dates.

Balance Sheet Data -

The balance sheet data is imported and includes the final monthly balances of each account in the format shown in

the following table.

The balance sheet data always includes a row for each account for each month.

Product Catalog Data -

The product catalog shows how products roll up to product categories, which roll up to the business units. The

product list is provided in the format shown in the following table.

Revenue data is provided at the date and product level. Expense data is provided at the date and department level.

Business Issues -

Historically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is

usually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an

Excel formula. On occasion, there are conflicting results in the reports because the products and departments that

roll up to each business unit are not defined consistently.

Requirements -

Planned Changes -

Contoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants

to reduce how long it takes to populate the reports to less than two days. The company wants to create common

logic for the business units, products, and departments. The logic will be used across all reports, including but not

limited to the quarterly reporting for the board.

Technical Requirements -

Contoso wants the reports and datasets refreshed with minimum manual effort.

The company wants to provide the board with a single package of reports that will contain custom navigation and

links to supplementary information.

Maintenance, including manually updating data and access, must be minimized as much as possible.

Security Requirements -

The reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group

will be used to share information with the board.

Contoso identifies the following security requirements for analyst access:

Analysts must be able to access all balance sheet and product catalog data.

Analysts must be able to access only the profit and loss data of their respective business unit.

Analysts must be able to create new reports from the dataset that contains the profit and loss data, but the

reports built by the analysts must NOT be included in the quarterly reports for the board.

Analysts must NOT be able to share the quarterly reports with anyone.

Analysts must NOT be able to make new reports by using the balance sheet data.

Report Requirements -

You plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the

last day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the

ending balances for the quarter, as well as for the previous quarter.

The date table will contain the columns shown in the following table.

The definitions and attributes for the products, departments, and business units must be consistent across all the

reports.

The board must be able to get the following information from the quarterly reports:

Revenue trends over time

The ending balances of each account

Changes in long-term liabilities from the previous quarter

The percent of total revenue contributed by each product category

A comparison of quarterly revenue versus the same quarter from the previous year

The reports must be updated with the latest data by 5 AM each day.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-349-348', 'Model the data', 'single', 'You need to create

relationships to meet the reporting requirements of the customer service department.

What should you create?', '["a one-to-many relationship from Date[date_id] to Sales[sales_date_id] and another one-to-many relationship from Date[date_id] to Weekly_Returns[week_id]","a one-to-many relationship from Sales[sales_date_id] to Date[date_id] and a one-to-many relationship from Sales[sales_ship_date_id] to Date[date_id]","an additional date table named ShipDate, a many-to-many relationship from Sales[sales_date_id] to Date[date_id], and a many-to-many relationship from Sales[sales_ship_date_id] to ShipDate[date_id]","an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_skip_date_id]"]', '[3]', 'Two date dims, two 1:* relationships

The customer service department requires a visual that can be filtered by both sales month and ship month
independently.

Need two date tables. Add a one-to-many relationship from both the Date tables to Sales table.

Reference:

https://docs.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive', 'Final', '349', '/exhibit-assets/f1-349-348.webp', NULL, 'Litware, Inc. — Case Study

Overview -

Litware, Inc. is an online retailer that uses Power BI.

Litware plans to leverage data from an Azure SQL database that stores data for the company''s live e-commerce

website.

Litware uses Azure Active Directory (Azure AD) to authenticate users.

Existing Environment. Sales Data

Litware has online sales data that has the SQL schema shown in the following table.

In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.

The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.

In the Sales table, the sales_id column represents a unique transaction.

The region id column can be managed by only one sales manager.

Existing Environment. Data Concerns

You are concerned with the quality and completeness of the sales data. You must ensure that negative and missing

sales_amount values do NOT contribute to the total sales amount calculation.

Existing Environment. Reporting Requirements

Litware identifies the following reporting requirements:

Executives require a visual that shows sales by region.

Executives require a visual that shows returns by region manager and the sales managers that report to them.

The sales managers must be able to see only the sales data of their respective region.

The sales managers require a visual to analyze sales performance versus sales targets.

The sales department requires reports that contain the number of sales transactions.

Users must be able to see the month in each report as shown in the following example: Feb 2020.

The customer service department requires a visual that can be filtered by both sales month and ship month

independently.

The maximum allowed latency to include transactions in reports is five minutes.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-350-349', 'Manage and secure Power BI', 'single', 'You need to provide a solution to provide the sales managers with the required access.

What should you include in the solution?', '["Create a security role that has a table filter on the Sales Manager table where username = UserName().","Create a security role that has a table filter on the Sales Manager table where username = sales_manager_id.","Create a security role that has a table filter on the Region Manager table where sales_manager_id = UserPrincipalName().","Create a security role that has a table filter on the Sales_Manager table where name = UserName()."]', '[0]', 'The sales managers must be able to see only the sales data of their respective region.

Use the username field of the Sales_manager table.

Also use the Username() DAX function to validate the username.

Reference:

https://powerbi.microsoft.com/en-my/blog/using-username-in-dax-with-row-level-security/', 'Final', '350', NULL, NULL, 'Litware, Inc. — Case Study

Overview -

Litware, Inc. is an online retailer that uses Power BI.

Litware plans to leverage data from an Azure SQL database that stores data for the company''s live e-commerce

website.

Litware uses Azure Active Directory (Azure AD) to authenticate users.

Existing Environment. Sales Data

Litware has online sales data that has the SQL schema shown in the following table.

In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.

The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.

In the Sales table, the sales_id column represents a unique transaction.

The region id column can be managed by only one sales manager.

Existing Environment. Data Concerns

You are concerned with the quality and completeness of the sales data. You must ensure that negative and missing

sales_amount values do NOT contribute to the total sales amount calculation.

Existing Environment. Reporting Requirements

Litware identifies the following reporting requirements:

Executives require a visual that shows sales by region.

Executives require a visual that shows returns by region manager and the sales managers that report to them.

The sales managers must be able to see only the sales data of their respective region.

The sales managers require a visual to analyze sales performance versus sales targets.

The sales department requires reports that contain the number of sales transactions.

Users must be able to see the month in each report as shown in the following example: Feb 2020.

The customer service department requires a visual that can be filtered by both sales month and ship month

independently.

The maximum allowed latency to include transactions in reports is five minutes.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-351-350', 'Model the data', 'single', 'You merge data from Sales_Region, Region_Manager, Sales_Manager, and Manager into a single table named

Region.

What should you do next to meet the reporting requirements of the executives?', '["Create a DAX calculated column that retrieves the region manager from the Weekly_Returns table based on the sales_region_id column.","Apply row-level security (RLS) to the Region table based on the sales manager username.","Configure a bi-directional relationship between Region and Sales_Region.","In the Region table, create a hierarchy that has the manager name, and then the sales manager name."]', '[3]', 'D seems to be correct because the Executives will only be able to see Region managers and Sales managers
that report to them in a hierarchy, besides there is nothing to measure there so A is actually wrong

Executives require a visual that shows returns by region manager and the sales managers that report to them.

A hierarchy is a set of fields categorized in a hierarchical way that one level is the parent of another level.
Values of the parent level can be drilled down to the lower level.

Reference:

https://radacad.com/what-a-power-bi-hierarchy-is-and-how-to-use-it', 'Final', '351', NULL, NULL, 'Litware, Inc. — Case Study

Overview -

Litware, Inc. is an online retailer that uses Power BI.

Litware plans to leverage data from an Azure SQL database that stores data for the company''s live e-commerce

website.

Litware uses Azure Active Directory (Azure AD) to authenticate users.

Existing Environment. Sales Data

Litware has online sales data that has the SQL schema shown in the following table.

In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.

The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.

In the Sales table, the sales_id column represents a unique transaction.

The region id column can be managed by only one sales manager.

Existing Environment. Data Concerns

You are concerned with the quality and completeness of the sales data. You must ensure that negative and missing

sales_amount values do NOT contribute to the total sales amount calculation.

Existing Environment. Reporting Requirements

Litware identifies the following reporting requirements:

Executives require a visual that shows sales by region.

Executives require a visual that shows returns by region manager and the sales managers that report to them.

The sales managers must be able to see only the sales data of their respective region.

The sales managers require a visual to analyze sales performance versus sales targets.

The sales department requires reports that contain the number of sales transactions.

Users must be able to see the month in each report as shown in the following example: Feb 2020.

The customer service department requires a visual that can be filtered by both sales month and ship month

independently.

The maximum allowed latency to include transactions in reports is five minutes.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-352-351', 'Model the data', 'single', 'What should you create to meet the reporting requirements of the sales department?', '["a measure that uses a formula of COUNTROWS(Sales)","a calculated column that use a formula of COUNTA(Sales[sales_id])","a calculated column that uses a formula of SUM(Sales[sales_id])","a measure that uses a formula of SUM(Sales[sales_id])"]', '[0]', 'The sales department requires reports that contain the number of sales transactions.

The COUNTROWS function counts the number of rows in the specified table, or in a table defined by an
expression.

Incorrect:

The COUNTA function counts the number of cells in a column that are not empty.

Reference:

https://docs.microsoft.com/en-us/dax/countrows-function-dax', 'Final', '352', NULL, NULL, 'Litware, Inc. — Case Study

Overview -

Litware, Inc. is an online retailer that uses Power BI.

Litware plans to leverage data from an Azure SQL database that stores data for the company''s live e-commerce

website.

Litware uses Azure Active Directory (Azure AD) to authenticate users.

Existing Environment. Sales Data

Litware has online sales data that has the SQL schema shown in the following table.

In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.

The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.

In the Sales table, the sales_id column represents a unique transaction.

The region id column can be managed by only one sales manager.

Existing Environment. Data Concerns

You are concerned with the quality and completeness of the sales data. You must ensure that negative and missing

sales_amount values do NOT contribute to the total sales amount calculation.

Existing Environment. Reporting Requirements

Litware identifies the following reporting requirements:

Executives require a visual that shows sales by region.

Executives require a visual that shows returns by region manager and the sales managers that report to them.

The sales managers must be able to see only the sales data of their respective region.

The sales managers require a visual to analyze sales performance versus sales targets.

The sales department requires reports that contain the number of sales transactions.

Users must be able to see the month in each report as shown in the following example: Feb 2020.

The customer service department requires a visual that can be filtered by both sales month and ship month

independently.

The maximum allowed latency to include transactions in reports is five minutes.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-353-352', 'Model the data', 'single', 'What should you do to address the existing environment data concerns?', '["a calculated column that uses the following formula: ABS(Sales[sales_amount])","a measure that uses the following formula: SUMX(FILTER(''Sales'', ''Sales''[sales_amount] > 0)),[sales_amount])","a measure that uses the following formula: SUM(Sales[sales_amount])","a calculated column that uses the following formula: IF(ISBLANK(Sales[sales_amount]),0, (Sales[sales_amount]))"]', '[1]', 'You are concerned with the quality and completeness of the sales data. You must ensure that negative and
missing sales_amount values do NOT contribute to the total sales amount calculation.', 'Final', '353', NULL, NULL, 'Litware, Inc. — Case Study

Overview -

Litware, Inc. is an online retailer that uses Power BI.

Litware plans to leverage data from an Azure SQL database that stores data for the company''s live e-commerce

website.

Litware uses Azure Active Directory (Azure AD) to authenticate users.

Existing Environment. Sales Data

Litware has online sales data that has the SQL schema shown in the following table.

In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.

The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.

In the Sales table, the sales_id column represents a unique transaction.

The region id column can be managed by only one sales manager.

Existing Environment. Data Concerns

You are concerned with the quality and completeness of the sales data. You must ensure that negative and missing

sales_amount values do NOT contribute to the total sales amount calculation.

Existing Environment. Reporting Requirements

Litware identifies the following reporting requirements:

Executives require a visual that shows sales by region.

Executives require a visual that shows returns by region manager and the sales managers that report to them.

The sales managers must be able to see only the sales data of their respective region.

The sales managers require a visual to analyze sales performance versus sales targets.

The sales department requires reports that contain the number of sales transactions.

Users must be able to see the month in each report as shown in the following example: Feb 2020.

The customer service department requires a visual that can be filtered by both sales month and ship month

independently.

The maximum allowed latency to include transactions in reports is five minutes.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-354-353', 'Model the data', 'single', 'You need to create a calculated column to display the month based on the reporting requirements.

Which DAX expression should you use?', '["FORMAT(''Date''[date],MMM YYYY)","FORMAT(''Date''[date_id],MMM) & & FORMAT(''Date''[year], #)","FORMAT(''Date''[date_id],MMM YYYY)","FORMAT(''Date''[date],M YY)"]', '[0]', 'Users must be able to see the month in each report as shown in the following example: Feb 2020.

Custom date/time formats -

The following format characters can be specified in the format_string to create custom date/time formats:

* mmm

Display the month as an abbreviation (Jan-Dec). Localized.

* yyyy

Display the year as a 4-digit number (100-9999).

* Etc.

Reference:

https://docs.microsoft.com/en-us/dax/format-function-dax#predefined-datetime-formats', 'Final', '354', NULL, NULL, 'Litware, Inc. — Case Study

Overview -

Litware, Inc. is an online retailer that uses Power BI.

Litware plans to leverage data from an Azure SQL database that stores data for the company''s live e-commerce

website.

Litware uses Azure Active Directory (Azure AD) to authenticate users.

Existing Environment. Sales Data

Litware has online sales data that has the SQL schema shown in the following table.

In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.

The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.

In the Sales table, the sales_id column represents a unique transaction.

The region id column can be managed by only one sales manager.

Existing Environment. Data Concerns

You are concerned with the quality and completeness of the sales data. You must ensure that negative and missing

sales_amount values do NOT contribute to the total sales amount calculation.

Existing Environment. Reporting Requirements

Litware identifies the following reporting requirements:

Executives require a visual that shows sales by region.

Executives require a visual that shows returns by region manager and the sales managers that report to them.

The sales managers must be able to see only the sales data of their respective region.

The sales managers require a visual to analyze sales performance versus sales targets.

The sales department requires reports that contain the number of sales transactions.

Users must be able to see the month in each report as shown in the following example: Feb 2020.

The customer service department requires a visual that can be filtered by both sales month and ship month

independently.

The maximum allowed latency to include transactions in reports is five minutes.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-355-354', 'Model the data', 'manual', 'HOTSPOT -

You need to design the data model and the relationships for the Customer Details worksheet and the Orders table

by using Power BI. The solution must meet the report requirements.

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: No-

Customer ID in Orders is text ("VINET") while Customer ID in Customer Details is number ("1").

Box 2: Yes-

Relationship between Orders and Customer Details will be via column Customer CRMID in Customer Details
and Customer ID in Orders, which are both text.

Box 3: No -

the Orders table only contains shipping address, which is different from the billing address which should be
used for sales region. Thus, it should come from Customer Details table.

No - Yes - No. According to the sample data the Customer ID in Customer Details is a number (1 through 10 is
shown in the example data) and the Customer ID in the Orders table has an example value of VINET, which
looks like it corresponds to the value of Customer CRMID instead of Customer ID from the Customer Details
worksheet so the first answer should be No. The second answer should be Yes, the Customer ID from Orders
has example value VINET, which is text.', 'Final', '355', '/dump-assets/f1-355-354-question.webp', '/dump-assets/f1-355-354-answer.webp', 'Northwind Traders — Case Study

General Overview -

Northwind Traders is a specialty food import company.

The company recently implemented Power BI to better understand its top customers, products, and suppliers.

Business Issues -

The sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting Services

(SSRS). The IT department takes too long to generate the reports and often misunderstands the report

requirements.

Existing Environment. Data Sources

Northwind Traders uses the data sources shown in the following table.

Source2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.

Existing Environment. Customer Worksheet

Source2 contains a single worksheet named Customer Details. The first 11 rows of the worksheet are shown in the

following table.

All the fields in Source2 are mandatory.

The Address column in Customer Details is the billing address, which can differ from the shipping address.

Existing Environment. Azure SQL Database

Source1 contains the following tables:

Orders

Products

Suppliers

Categories

Order Details

Sales Employees

The Orders table contains the following columns.

The Order Details table contains the following columns.

The address in the Orders table is the shipping address, which can differ from the billing address.

The Products table contains the following columns.

The Categories table contains the following columns.

The Suppliers table contains the following columns.

The Sales Employees table contains the following columns.

Each employee in the Sales Employees table is assigned to one sales region. Multiple employees can be assigned

to each region.

Requirements. Report Requirements

Northwind Traders requires the following reports:

Top Products

Top Customers

On-Time Shipping

The Top Customers report will show the top 20 customers based on the highest sales amounts in a selected order

month or quarter, product category, and sales region.

The Top Products report will show the top 20 products based on the highest sales amounts sold in a selected order

month or quarter, sales region, and product category. The report must also show which suppliers provide the top

products.

The On-Time Shipping report will show the following metrics for a selected shipping month or quarter:

The percentage of orders that were shipped late by country and shipping region

Customers that had multiple late shipments during the last quarter

Northwind Traders defines late orders as those shipped after the required shipping date.

The warehouse shipping department must be notified if the percentage of late orders within the current month

exceeds 5%.

The reports must show historical data for the current calendar year and the last three calendar years.

Requirements. Technical Requirements

Northwind Traders identifies the following technical requirements:

A single dataset must support all three reports.

The reports must be stored in a single Power BI workspace.

Report data must be current as of 7 AM Pacific Time each day.

The reports must provide fast response times when users interact with a visualization.

The data model must minimize the size of the dataset as much as possible, while meeting the report requirements

and the technical requirements.

Requirements. Security Requirements

Access to the reports must be granted to Azure Active Directory (Azure AD) security groups only. An Azure AD

security group exists for each department.

The sales department must be able to perform the following tasks in Power BI:

Create, edit, and delete content in the reports.

Manage permissions for workspaces, datasets, and reports.

Publish, unpublish, update, and change the permissions for an app.

Assign Azure AD groups role-based access to the reports workspace.

Users in the sales department must be able to access only the data of the sales region to which they are assigned

in the Sales Employees table.

Power BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees table.

[EmailAddress] = USERNAME()

RLS will be applied only to the sales department users. Users in all other departments must be able to view all the

data.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-356-355', 'Model the data', 'manual', 'HOTSPOT -

You need to create a measure that will return the percentage of late orders.

How should you complete the DAX expression? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: CALCULATE -

CALCULATE evaluates an expression in a modified filter context.

Syntax: CALCULATE(<expression>[, <filter1> [, <filter2> [, ¦]]]) expression - The expression to be evaluated.
filter1, filter2,.. - (Optional) Boolean expressions or table expressions that defines filters, or filter modifier

functions.

Incorrect:

* COUNTX - Counts the number of rows that contain a non-blank value or an expression that evaluates to a
non-blank value, when evaluating an expression over a table.

* CALCULATETABLE evaluates a table expression in a modified filter context.

Syntax: CALCULATETABLE(<expression>[, <filter1> [, <filter2> [, ¦]]])

Expression - The table expression to be evaluated.

Box 2: FILTER -

FILTER returns a table that represents a subset of another table or expression.

Syntax: FILTER(<table>,<filter>)

Box 3: Orders[Shipped Date] > Orders[Required Date]

Northwind Traders defines late orders as those shipped after the required shipping date.

Reference:

https://docs.microsoft.com/en-us/dax/calculate-function-dax

https://docs.microsoft.com/en-us/dax/filter-function-dax', 'Final', '356', '/dump-assets/f1-356-355-question.webp', '/dump-assets/f1-356-355-answer.webp', 'Northwind Traders — Case Study

General Overview -

Northwind Traders is a specialty food import company.

The company recently implemented Power BI to better understand its top customers, products, and suppliers.

Business Issues -

The sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting Services

(SSRS). The IT department takes too long to generate the reports and often misunderstands the report

requirements.

Existing Environment. Data Sources

Northwind Traders uses the data sources shown in the following table.

Source2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.

Existing Environment. Customer Worksheet

Source2 contains a single worksheet named Customer Details. The first 11 rows of the worksheet are shown in the

following table.

All the fields in Source2 are mandatory.

The Address column in Customer Details is the billing address, which can differ from the shipping address.

Existing Environment. Azure SQL Database

Source1 contains the following tables:

Orders

Products

Suppliers

Categories

Order Details

Sales Employees

The Orders table contains the following columns.

The Order Details table contains the following columns.

The address in the Orders table is the shipping address, which can differ from the billing address.

The Products table contains the following columns.

The Categories table contains the following columns.

The Suppliers table contains the following columns.

The Sales Employees table contains the following columns.

Each employee in the Sales Employees table is assigned to one sales region. Multiple employees can be assigned

to each region.

Requirements. Report Requirements

Northwind Traders requires the following reports:

Top Products

Top Customers

On-Time Shipping

The Top Customers report will show the top 20 customers based on the highest sales amounts in a selected order

month or quarter, product category, and sales region.

The Top Products report will show the top 20 products based on the highest sales amounts sold in a selected order

month or quarter, sales region, and product category. The report must also show which suppliers provide the top

products.

The On-Time Shipping report will show the following metrics for a selected shipping month or quarter:

The percentage of orders that were shipped late by country and shipping region

Customers that had multiple late shipments during the last quarter

Northwind Traders defines late orders as those shipped after the required shipping date.

The warehouse shipping department must be notified if the percentage of late orders within the current month

exceeds 5%.

The reports must show historical data for the current calendar year and the last three calendar years.

Requirements. Technical Requirements

Northwind Traders identifies the following technical requirements:

A single dataset must support all three reports.

The reports must be stored in a single Power BI workspace.

Report data must be current as of 7 AM Pacific Time each day.

The reports must provide fast response times when users interact with a visualization.

The data model must minimize the size of the dataset as much as possible, while meeting the report requirements

and the technical requirements.

Requirements. Security Requirements

Access to the reports must be granted to Azure Active Directory (Azure AD) security groups only. An Azure AD

security group exists for each department.

The sales department must be able to perform the following tasks in Power BI:

Create, edit, and delete content in the reports.

Manage permissions for workspaces, datasets, and reports.

Publish, unpublish, update, and change the permissions for an app.

Assign Azure AD groups role-based access to the reports workspace.

Users in the sales department must be able to access only the data of the sales region to which they are assigned

in the Sales Employees table.

Power BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees table.

[EmailAddress] = USERNAME()

RLS will be applied only to the sales department users. Users in all other departments must be able to view all the

data.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-357-356', 'Prepare the data', 'single', 'You need to minimize the size of the dataset. The solution must meet the report requirements.

What should you do?', '["Group the Categories table by the CategoryID column.","Remove the QuantityPerUnit column from the Products table.","Filter out discontinued products while importing the Products table.","Change the OrderID column in the Orders table to the Text data type."]', '[1]', 'Removing a column which isn''t used in the reports reduces the dataset size.

Incorrect:

Not A: Grouping does not affect size.

Not C: Cannot filter out discontinued products as: The reports must show historical data for the current
calendar year and the last three calendar years.

Not D: OrderID must be Integer.', 'Final', '357', NULL, NULL, 'Northwind Traders — Case Study

General Overview -

Northwind Traders is a specialty food import company.

The company recently implemented Power BI to better understand its top customers, products, and suppliers.

Business Issues -

The sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting Services

(SSRS). The IT department takes too long to generate the reports and often misunderstands the report

requirements.

Existing Environment. Data Sources

Northwind Traders uses the data sources shown in the following table.

Source2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.

Existing Environment. Customer Worksheet

Source2 contains a single worksheet named Customer Details. The first 11 rows of the worksheet are shown in the

following table.

All the fields in Source2 are mandatory.

The Address column in Customer Details is the billing address, which can differ from the shipping address.

Existing Environment. Azure SQL Database

Source1 contains the following tables:

Orders

Products

Suppliers

Categories

Order Details

Sales Employees

The Orders table contains the following columns.

The Order Details table contains the following columns.

The address in the Orders table is the shipping address, which can differ from the billing address.

The Products table contains the following columns.

The Categories table contains the following columns.

The Suppliers table contains the following columns.

The Sales Employees table contains the following columns.

Each employee in the Sales Employees table is assigned to one sales region. Multiple employees can be assigned

to each region.

Requirements. Report Requirements

Northwind Traders requires the following reports:

Top Products

Top Customers

On-Time Shipping

The Top Customers report will show the top 20 customers based on the highest sales amounts in a selected order

month or quarter, product category, and sales region.

The Top Products report will show the top 20 products based on the highest sales amounts sold in a selected order

month or quarter, sales region, and product category. The report must also show which suppliers provide the top

products.

The On-Time Shipping report will show the following metrics for a selected shipping month or quarter:

The percentage of orders that were shipped late by country and shipping region

Customers that had multiple late shipments during the last quarter

Northwind Traders defines late orders as those shipped after the required shipping date.

The warehouse shipping department must be notified if the percentage of late orders within the current month

exceeds 5%.

The reports must show historical data for the current calendar year and the last three calendar years.

Requirements. Technical Requirements

Northwind Traders identifies the following technical requirements:

A single dataset must support all three reports.

The reports must be stored in a single Power BI workspace.

Report data must be current as of 7 AM Pacific Time each day.

The reports must provide fast response times when users interact with a visualization.

The data model must minimize the size of the dataset as much as possible, while meeting the report requirements

and the technical requirements.

Requirements. Security Requirements

Access to the reports must be granted to Azure Active Directory (Azure AD) security groups only. An Azure AD

security group exists for each department.

The sales department must be able to perform the following tasks in Power BI:

Create, edit, and delete content in the reports.

Manage permissions for workspaces, datasets, and reports.

Publish, unpublish, update, and change the permissions for an app.

Assign Azure AD groups role-based access to the reports workspace.

Users in the sales department must be able to access only the data of the sales region to which they are assigned

in the Sales Employees table.

Power BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees table.

[EmailAddress] = USERNAME()

RLS will be applied only to the sales department users. Users in all other departments must be able to view all the

data.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-358-357', 'Model the data', 'single', 'You need to design the data model to meet the report requirements.

What should you do in Power BI Desktop?', '["From Power Query, add a date table. Create an active relationship to the OrderDate column in the Orders table and an inactive relationship to the ShippedDate column in the Orders table.","From Power Query, add columns to the Orders table to calculate the calendar quarter and the calendar month of the OrderDate column.","From Power BI Desktop, use the Auto date/time option when creating the reports.","From Power Query, use a DAX expression to add columns to the Orders table to calculate the calendar quarter of the OrderDate column, the calendar month of the OrderDate column, the calendar quarter of the ShippedDate column, and the calendar month of the ShippedDate column."]', '[0]', 'Because we do have visuals that need a filter on either order or shipping date, but no visual requires a filter on
both at the same time.

Auto date/time does not meet the criteria: The data model must minimize the size of the dataset as much as
possible, while meeting the report requirements and the technical requirements.

The correct answer is A', 'Final', '358', NULL, NULL, 'Northwind Traders — Case Study

General Overview -

Northwind Traders is a specialty food import company.

The company recently implemented Power BI to better understand its top customers, products, and suppliers.

Business Issues -

The sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting Services

(SSRS). The IT department takes too long to generate the reports and often misunderstands the report

requirements.

Existing Environment. Data Sources

Northwind Traders uses the data sources shown in the following table.

Source2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.

Existing Environment. Customer Worksheet

Source2 contains a single worksheet named Customer Details. The first 11 rows of the worksheet are shown in the

following table.

All the fields in Source2 are mandatory.

The Address column in Customer Details is the billing address, which can differ from the shipping address.

Existing Environment. Azure SQL Database

Source1 contains the following tables:

Orders

Products

Suppliers

Categories

Order Details

Sales Employees

The Orders table contains the following columns.

The Order Details table contains the following columns.

The address in the Orders table is the shipping address, which can differ from the billing address.

The Products table contains the following columns.

The Categories table contains the following columns.

The Suppliers table contains the following columns.

The Sales Employees table contains the following columns.

Each employee in the Sales Employees table is assigned to one sales region. Multiple employees can be assigned

to each region.

Requirements. Report Requirements

Northwind Traders requires the following reports:

Top Products

Top Customers

On-Time Shipping

The Top Customers report will show the top 20 customers based on the highest sales amounts in a selected order

month or quarter, product category, and sales region.

The Top Products report will show the top 20 products based on the highest sales amounts sold in a selected order

month or quarter, sales region, and product category. The report must also show which suppliers provide the top

products.

The On-Time Shipping report will show the following metrics for a selected shipping month or quarter:

The percentage of orders that were shipped late by country and shipping region

Customers that had multiple late shipments during the last quarter

Northwind Traders defines late orders as those shipped after the required shipping date.

The warehouse shipping department must be notified if the percentage of late orders within the current month

exceeds 5%.

The reports must show historical data for the current calendar year and the last three calendar years.

Requirements. Technical Requirements

Northwind Traders identifies the following technical requirements:

A single dataset must support all three reports.

The reports must be stored in a single Power BI workspace.

Report data must be current as of 7 AM Pacific Time each day.

The reports must provide fast response times when users interact with a visualization.

The data model must minimize the size of the dataset as much as possible, while meeting the report requirements

and the technical requirements.

Requirements. Security Requirements

Access to the reports must be granted to Azure Active Directory (Azure AD) security groups only. An Azure AD

security group exists for each department.

The sales department must be able to perform the following tasks in Power BI:

Create, edit, and delete content in the reports.

Manage permissions for workspaces, datasets, and reports.

Publish, unpublish, update, and change the permissions for an app.

Assign Azure AD groups role-based access to the reports workspace.

Users in the sales department must be able to access only the data of the sales region to which they are assigned

in the Sales Employees table.

Power BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees table.

[EmailAddress] = USERNAME()

RLS will be applied only to the sales department users. Users in all other departments must be able to view all the

data.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-359-358', 'Manage and secure Power BI', 'manual', 'HOTSPOT -

You need to create a relationship in the dataset for RLS.

What should you do? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: many-to-many -

Users in the sales department must be able to access only the data of the sales region to which they are
assigned in the Sales Employees table.

With composite models, you can establish a many-to-many relationship between tables, which removes
requirements for unique values in tables. It also removes previous workarounds, such as introducing new
tables only to establish relationships.

Box 2: Customer details

Sales employees should see the sales of their region only, so all sales ordered by customers whose billing
address belongs to the sales employee''s region.

Therefore, the relationship between sales employees (region) and customer details (region) should be many-
to-many (a sales employee has many customers in his region and a customer in a region can have many sales
employees for that region).

In this case, as the customer table is related to the order table, the sales employees will only be able to see
the orders of the customers in their region.

Reference:

https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships', 'Final', '359', '/dump-assets/f1-359-358-question.webp', '/dump-assets/f1-359-358-answer.webp', 'Northwind Traders — Case Study

General Overview -

Northwind Traders is a specialty food import company.

The company recently implemented Power BI to better understand its top customers, products, and suppliers.

Business Issues -

The sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting Services

(SSRS). The IT department takes too long to generate the reports and often misunderstands the report

requirements.

Existing Environment. Data Sources

Northwind Traders uses the data sources shown in the following table.

Source2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.

Existing Environment. Customer Worksheet

Source2 contains a single worksheet named Customer Details. The first 11 rows of the worksheet are shown in the

following table.

All the fields in Source2 are mandatory.

The Address column in Customer Details is the billing address, which can differ from the shipping address.

Existing Environment. Azure SQL Database

Source1 contains the following tables:

Orders

Products

Suppliers

Categories

Order Details

Sales Employees

The Orders table contains the following columns.

The Order Details table contains the following columns.

The address in the Orders table is the shipping address, which can differ from the billing address.

The Products table contains the following columns.

The Categories table contains the following columns.

The Suppliers table contains the following columns.

The Sales Employees table contains the following columns.

Each employee in the Sales Employees table is assigned to one sales region. Multiple employees can be assigned

to each region.

Requirements. Report Requirements

Northwind Traders requires the following reports:

Top Products

Top Customers

On-Time Shipping

The Top Customers report will show the top 20 customers based on the highest sales amounts in a selected order

month or quarter, product category, and sales region.

The Top Products report will show the top 20 products based on the highest sales amounts sold in a selected order

month or quarter, sales region, and product category. The report must also show which suppliers provide the top

products.

The On-Time Shipping report will show the following metrics for a selected shipping month or quarter:

The percentage of orders that were shipped late by country and shipping region

Customers that had multiple late shipments during the last quarter

Northwind Traders defines late orders as those shipped after the required shipping date.

The warehouse shipping department must be notified if the percentage of late orders within the current month

exceeds 5%.

The reports must show historical data for the current calendar year and the last three calendar years.

Requirements. Technical Requirements

Northwind Traders identifies the following technical requirements:

A single dataset must support all three reports.

The reports must be stored in a single Power BI workspace.

Report data must be current as of 7 AM Pacific Time each day.

The reports must provide fast response times when users interact with a visualization.

The data model must minimize the size of the dataset as much as possible, while meeting the report requirements

and the technical requirements.

Requirements. Security Requirements

Access to the reports must be granted to Azure Active Directory (Azure AD) security groups only. An Azure AD

security group exists for each department.

The sales department must be able to perform the following tasks in Power BI:

Create, edit, and delete content in the reports.

Manage permissions for workspaces, datasets, and reports.

Publish, unpublish, update, and change the permissions for an app.

Assign Azure AD groups role-based access to the reports workspace.

Users in the sales department must be able to access only the data of the sales region to which they are assigned

in the Sales Employees table.

Power BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees table.

[EmailAddress] = USERNAME()

RLS will be applied only to the sales department users. Users in all other departments must be able to view all the

data.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-360-359', 'Model the data', 'single', 'You need to update the Power BI model to ensure that the analysts can quickly build drill-downs from business

unit to product in a visual.

What should you create?', '["a group","a calculated table","a hierarchy","a calculated column"]', '[2]', 'Drill requires a hierarchy.

When a visual has a hierarchy, you can drill down to reveal additional details.

Reference:

https://docs.microsoft.com/en-us/power-bi/consumer/end-user-drill', 'Final', '360', NULL, NULL, 'Contoso, Ltd. — Case Study

Overview -

Contoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board

meetings for which financial analysts manually prepare

Microsoft Excel reports, including balance sheets and profit and loss statements for each of the company''s four

business units.

Existing Environment -

Data and Sources -

Data for the reports comes from the sources shown in the following table.

The balance sheet data is unrelated to the profit and loss results other than they both relate to dates.

Balance Sheet Data -

The balance sheet data is imported and includes the final monthly balances of each account in the format shown in

the following table.

The balance sheet data always includes a row for each account for each month.

Product Catalog Data -

The product catalog shows how products roll up to product categories, which roll up to the business units. The

product list is provided in the format shown in the following table.

Revenue data is provided at the date and product level. Expense data is provided at the date and department level.

Business Issues -

Historically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is

usually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an

Excel formula. On occasion, there are conflicting results in the reports because the products and departments that

roll up to each business unit are not defined consistently.

Requirements -

Planned Changes -

Contoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants

to reduce how long it takes to populate the reports to less than two days. The company wants to create common

logic for the business units, products, and departments. The logic will be used across all reports, including but not

limited to the quarterly reporting for the board.

Technical Requirements -

Contoso wants the reports and datasets refreshed with minimum manual effort.

The company wants to provide the board with a single package of reports that will contain custom navigation and

links to supplementary information.

Maintenance, including manually updating data and access, must be minimized as much as possible.

Security Requirements -

The reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group

will be used to share information with the board.

Contoso identifies the following security requirements for analyst access:

Analysts must be able to access all balance sheet and product catalog data.

Analysts must be able to access only the profit and loss data of their respective business unit.

Analysts must be able to create new reports from the dataset that contains the profit and loss data, but the

reports built by the analysts must NOT be included in the quarterly reports for the board.

Analysts must NOT be able to share the quarterly reports with anyone.

Analysts must NOT be able to make new reports by using the balance sheet data.

Report Requirements -

You plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the

last day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the

ending balances for the quarter, as well as for the previous quarter.

The date table will contain the columns shown in the following table.

The definitions and attributes for the products, departments, and business units must be consistent across all the

reports.

The board must be able to get the following information from the quarterly reports:

Revenue trends over time

The ending balances of each account

Changes in long-term liabilities from the previous quarter

The percent of total revenue contributed by each product category

A comparison of quarterly revenue versus the same quarter from the previous year

The reports must be updated with the latest data by 5 AM each day.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-361-360', 'Prepare the data', 'manual', 'HOTSPOT -

You need to create the Top Customers report.

Which type of filter should you use, and at which level should you apply the filter? To answer, select the

appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: Top N -

The Top Customers report will show the top 20 customers based on the highest sales amounts in a selected
order month or quarter, product category, and sales region.

Box 2: Visual -

The reports must show historical data for the current calendar year and the last three calendar years.

Applying specific measures to the visual-level filter of a visualization is a very powerful technique to
completely customize the items shown in a report. The presence of this filter requires special measures in
order to display values related to items not included in the visual level filter.

Reference:

https://www.sqlbi.com/articles/filtering-the-top-3-products-for-each-category-in-power-bi/', 'Final', '361', '/dump-assets/f1-361-360-question.webp', '/dump-assets/f1-361-360-answer.webp', 'Northwind Traders — Case Study

General Overview -

Northwind Traders is a specialty food import company.

The company recently implemented Power BI to better understand its top customers, products, and suppliers.

Business Issues -

The sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting Services

(SSRS). The IT department takes too long to generate the reports and often misunderstands the report

requirements.

Existing Environment. Data Sources

Northwind Traders uses the data sources shown in the following table.

Source2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.

Existing Environment. Customer Worksheet

Source2 contains a single worksheet named Customer Details. The first 11 rows of the worksheet are shown in the

following table.

All the fields in Source2 are mandatory.

The Address column in Customer Details is the billing address, which can differ from the shipping address.

Existing Environment. Azure SQL Database

Source1 contains the following tables:

Orders

Products

Suppliers

Categories

Order Details

Sales Employees

The Orders table contains the following columns.

The Order Details table contains the following columns.

The address in the Orders table is the shipping address, which can differ from the billing address.

The Products table contains the following columns.

The Categories table contains the following columns.

The Suppliers table contains the following columns.

The Sales Employees table contains the following columns.

Each employee in the Sales Employees table is assigned to one sales region. Multiple employees can be assigned

to each region.

Requirements. Report Requirements

Northwind Traders requires the following reports:

Top Products

Top Customers

On-Time Shipping

The Top Customers report will show the top 20 customers based on the highest sales amounts in a selected order

month or quarter, product category, and sales region.

The Top Products report will show the top 20 products based on the highest sales amounts sold in a selected order

month or quarter, sales region, and product category. The report must also show which suppliers provide the top

products.

The On-Time Shipping report will show the following metrics for a selected shipping month or quarter:

The percentage of orders that were shipped late by country and shipping region

Customers that had multiple late shipments during the last quarter

Northwind Traders defines late orders as those shipped after the required shipping date.

The warehouse shipping department must be notified if the percentage of late orders within the current month

exceeds 5%.

The reports must show historical data for the current calendar year and the last three calendar years.

Requirements. Technical Requirements

Northwind Traders identifies the following technical requirements:

A single dataset must support all three reports.

The reports must be stored in a single Power BI workspace.

Report data must be current as of 7 AM Pacific Time each day.

The reports must provide fast response times when users interact with a visualization.

The data model must minimize the size of the dataset as much as possible, while meeting the report requirements

and the technical requirements.

Requirements. Security Requirements

Access to the reports must be granted to Azure Active Directory (Azure AD) security groups only. An Azure AD

security group exists for each department.

The sales department must be able to perform the following tasks in Power BI:

Create, edit, and delete content in the reports.

Manage permissions for workspaces, datasets, and reports.

Publish, unpublish, update, and change the permissions for an app.

Assign Azure AD groups role-based access to the reports workspace.

Users in the sales department must be able to access only the data of the sales region to which they are assigned

in the Sales Employees table.

Power BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees table.

[EmailAddress] = USERNAME()

RLS will be applied only to the sales department users. Users in all other departments must be able to view all the

data.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-362-361', 'Visualize and analyze the data', 'single', 'You need to create the On-Time Shipping report. The report must include a visualization that shows the percentage

of late orders.

Which type of visualization should you create?', '["pie chart","scatterplot","bar chart"]', '[2]', 'The On-Time Shipping report will show the following metrics for a selected shipping month or quarter:

The percentage of orders that were shipped late by country and shipping region

Bar and column charts are some of the most widely used visualization charts in Power BI. They can be used for
one or multiple categories. Both these chart types represent data with rectangular bars, where the size of the
bar is proportional to the magnitude of data values.

Reference:

https://www.pluralsight.com/guides/bar-and-column-charts-in-power-bi', 'Final', '362', NULL, NULL, 'Northwind Traders — Case Study

General Overview -

Northwind Traders is a specialty food import company.

The company recently implemented Power BI to better understand its top customers, products, and suppliers.

Business Issues -

The sales department relies on the IT department to generate reports in Microsoft SQL Server Reporting Services

(SSRS). The IT department takes too long to generate the reports and often misunderstands the report

requirements.

Existing Environment. Data Sources

Northwind Traders uses the data sources shown in the following table.

Source2 is exported daily from a third-party system and stored in Microsoft SharePoint Online.

Existing Environment. Customer Worksheet

Source2 contains a single worksheet named Customer Details. The first 11 rows of the worksheet are shown in the

following table.

All the fields in Source2 are mandatory.

The Address column in Customer Details is the billing address, which can differ from the shipping address.

Existing Environment. Azure SQL Database

Source1 contains the following tables:

Orders

Products

Suppliers

Categories

Order Details

Sales Employees

The Orders table contains the following columns.

The Order Details table contains the following columns.

The address in the Orders table is the shipping address, which can differ from the billing address.

The Products table contains the following columns.

The Categories table contains the following columns.

The Suppliers table contains the following columns.

The Sales Employees table contains the following columns.

Each employee in the Sales Employees table is assigned to one sales region. Multiple employees can be assigned

to each region.

Requirements. Report Requirements

Northwind Traders requires the following reports:

Top Products

Top Customers

On-Time Shipping

The Top Customers report will show the top 20 customers based on the highest sales amounts in a selected order

month or quarter, product category, and sales region.

The Top Products report will show the top 20 products based on the highest sales amounts sold in a selected order

month or quarter, sales region, and product category. The report must also show which suppliers provide the top

products.

The On-Time Shipping report will show the following metrics for a selected shipping month or quarter:

The percentage of orders that were shipped late by country and shipping region

Customers that had multiple late shipments during the last quarter

Northwind Traders defines late orders as those shipped after the required shipping date.

The warehouse shipping department must be notified if the percentage of late orders within the current month

exceeds 5%.

The reports must show historical data for the current calendar year and the last three calendar years.

Requirements. Technical Requirements

Northwind Traders identifies the following technical requirements:

A single dataset must support all three reports.

The reports must be stored in a single Power BI workspace.

Report data must be current as of 7 AM Pacific Time each day.

The reports must provide fast response times when users interact with a visualization.

The data model must minimize the size of the dataset as much as possible, while meeting the report requirements

and the technical requirements.

Requirements. Security Requirements

Access to the reports must be granted to Azure Active Directory (Azure AD) security groups only. An Azure AD

security group exists for each department.

The sales department must be able to perform the following tasks in Power BI:

Create, edit, and delete content in the reports.

Manage permissions for workspaces, datasets, and reports.

Publish, unpublish, update, and change the permissions for an app.

Assign Azure AD groups role-based access to the reports workspace.

Users in the sales department must be able to access only the data of the sales region to which they are assigned

in the Sales Employees table.

Power BI has the following row-level security (RLS) Table filter DAX expression for the Sales Employees table.

[EmailAddress] = USERNAME()

RLS will be applied only to the sales department users. Users in all other departments must be able to view all the

data.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-363-362', 'Visualize and analyze the data', 'manual', 'HOTSPOT -

You need to create a KPI visualization to meet the reporting requirements of the sales managers.

How should you create the visualization? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'The sales managers require a visual to analyze sales performance versus sales targets.

Box 1: Sales[sales_amount]

Value; The main measure which we want to evaluate

Example:

Sales = sum(FactInternetSales[SalesAmount])

Box 2: Date[month]

Trend; How Value perfoms in a time period, is it going upward, downward¦?

You can use Months as trend axis.

Box 3: Targets[sales_target]

Target; What we want to compare the Value with

Reference:

https://radacad.com/kpi-visual-in-power-bi-explained', 'Final', '363', '/dump-assets/f1-363-362-question.webp', '/dump-assets/f1-363-362-answer.webp', 'Litware, Inc. — Case Study

Overview -

Litware, Inc. is an online retailer that uses Power BI.

Litware plans to leverage data from an Azure SQL database that stores data for the company''s live e-commerce

website.

Litware uses Azure Active Directory (Azure AD) to authenticate users.

Existing Environment. Sales Data

Litware has online sales data that has the SQL schema shown in the following table.

In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.

The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.

In the Sales table, the sales_id column represents a unique transaction.

The region id column can be managed by only one sales manager.

Existing Environment. Data Concerns

You are concerned with the quality and completeness of the sales data. You must ensure that negative and missing

sales_amount values do NOT contribute to the total sales amount calculation.

Existing Environment. Reporting Requirements

Litware identifies the following reporting requirements:

Executives require a visual that shows sales by region.

Executives require a visual that shows returns by region manager and the sales managers that report to them.

The sales managers must be able to see only the sales data of their respective region.

The sales managers require a visual to analyze sales performance versus sales targets.

The sales department requires reports that contain the number of sales transactions.

Users must be able to see the month in each report as shown in the following example: Feb 2020.

The customer service department requires a visual that can be filtered by both sales month and ship month

independently.

The maximum allowed latency to include transactions in reports is five minutes.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-364-363', 'Prepare the data', 'manual', 'HOTSPOT -

You publish the dataset to powerbi.com.

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'No

Azure SQL Server, therefore no need for an on-premise Gateway as Service and Azure are in the cloud.

No

Direct Query mode for the DB connection, so no need to schedule a refresh. Direct Query is a live connection.

No

Azure SQL supports the following connections from Power BI: Windows, Database and Microsoft Account.
(Basic is reserved for Power Query Online. Do not confuse Database with Basic.):

https://learn.microsoft.com/en-us/power-query/connectors/azuresqldatabase

https://learn.microsoft.com/en-us/power-bi/connect-data/service-azure-sql-database-with-direct-connect', 'Final', '364', '/dump-assets/f1-364-363-question.webp', '/dump-assets/f1-364-363-answer.webp', 'Litware, Inc. — Case Study

Overview -

Litware, Inc. is an online retailer that uses Power BI.

Litware plans to leverage data from an Azure SQL database that stores data for the company''s live e-commerce

website.

Litware uses Azure Active Directory (Azure AD) to authenticate users.

Existing Environment. Sales Data

Litware has online sales data that has the SQL schema shown in the following table.

In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.

The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.

In the Sales table, the sales_id column represents a unique transaction.

The region id column can be managed by only one sales manager.

Existing Environment. Data Concerns

You are concerned with the quality and completeness of the sales data. You must ensure that negative and missing

sales_amount values do NOT contribute to the total sales amount calculation.

Existing Environment. Reporting Requirements

Litware identifies the following reporting requirements:

Executives require a visual that shows sales by region.

Executives require a visual that shows returns by region manager and the sales managers that report to them.

The sales managers must be able to see only the sales data of their respective region.

The sales managers require a visual to analyze sales performance versus sales targets.

The sales department requires reports that contain the number of sales transactions.

Users must be able to see the month in each report as shown in the following example: Feb 2020.

The customer service department requires a visual that can be filtered by both sales month and ship month

independently.

The maximum allowed latency to include transactions in reports is five minutes.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-365-364', 'Model the data', 'single', 'What should you create

to meet the reporting requirements of the sales department?', '["a measure column that uses the following formula: SUMX(FILTER(''Sales'', ''Sales''[sales_amount] > 0)), [sales_amount])","a calculated column that uses the following formula: ABS(Sales[sales_amount])","a calculated column that uses the following formula: IF(ISBLANK(Sales[sales_amount]),0, (Sales[sales_amount]))","a measure that uses the following formula: SUM(Sales[sales_amount])"]', '[0]', 'A. a measure column using:

DAX

Copy

Edit

SUMX(FILTER(''Sales'', ''Sales''[sales_amount] > 0), [sales_amount])

This filters out negative or zero values and sums only positive sales_amount values.

Use case: Reporting only positive sales, e.g., excluding refunds/returns.

It''s a measure, not a column—good for dynamic aggregation in visuals.

Likely a good candidate if the requirement is to report only positive sales totals.', 'Final', '365', '/exhibit-assets/f1-365-364.webp', NULL, 'Litware, Inc. — Case Study

Overview -

Litware, Inc. is an online retailer that uses Power BI.

Litware plans to leverage data from an Azure SQL database that stores data for the company''s live e-commerce

website.

Litware uses Azure Active Directory (Azure AD) to authenticate users.

Existing Environment. Sales Data

Litware has online sales data that has the SQL schema shown in the following table.

In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm.

The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww.

In the Sales table, the sales_id column represents a unique transaction.

The region id column can be managed by only one sales manager.

Existing Environment. Data Concerns

You are concerned with the quality and completeness of the sales data. You must ensure that negative and missing

sales_amount values do NOT contribute to the total sales amount calculation.

Existing Environment. Reporting Requirements

Litware identifies the following reporting requirements:

Executives require a visual that shows sales by region.

Executives require a visual that shows returns by region manager and the sales managers that report to them.

The sales managers must be able to see only the sales data of their respective region.

The sales managers require a visual to analyze sales performance versus sales targets.

The sales department requires reports that contain the number of sales transactions.

Users must be able to see the month in each report as shown in the following example: Feb 2020.

The customer service department requires a visual that can be filtered by both sales month and ship month

independently.

The maximum allowed latency to include transactions in reports is five minutes.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-366-365', 'Model the data', 'manual', 'HOTSPOT -

You need to grant access to the business unit analysts.

What should you configure? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', 'Box 1: The Viewer role to the workspace

The Viewer role gives a read-only experience to its users. They can view dashboards, reports, or workbooks in
the workspace, but can''t browse the datasets or dataflows. Use the Viewer role wherever you would
previously use a classic workspace set to Members can only view Power BI content.

Box 2: Build -

The analysts must be able to build new reports from the dataset that contains the profit and loss data.

Scenario: The reports must be made available to the board from powerbi.com.

The analysts responsible for each business unit must see all the data the board sees, except the profit and
loss data, which must be restricted to only their business unit''s data. The analysts must be able to build new
reports from the dataset that contains the profit and loss data, but any reports that the analysts build must
not be included in the quarterly reports for the board. The analysts must not be able to share the quarterly
reports with anyone.

Reference:

https://www.nickyvv.com/2019/08/the-new-power-bi-workspace-viewer-role-explained.html

Deploy and Maintain Deliverables', 'Final', '366', '/dump-assets/f1-366-365-question.webp', '/dump-assets/f1-366-365-answer.webp', 'Contoso, Ltd. — Case Study

Overview -

Contoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board

meetings for which financial analysts manually prepare

Microsoft Excel reports, including balance sheets and profit and loss statements for each of the company''s four

business units.

Existing Environment -

Data and Sources -

Data for the reports comes from the sources shown in the following table.

The balance sheet data is unrelated to the profit and loss results other than they both relate to dates.

Balance Sheet Data -

The balance sheet data is imported and includes the final monthly balances of each account in the format shown in

the following table.

The balance sheet data always includes a row for each account for each month.

Product Catalog Data -

The product catalog shows how products roll up to product categories, which roll up to the business units. The

product list is provided in the format shown in the following table.

Revenue data is provided at the date and product level. Expense data is provided at the date and department level.

Business Issues -

Historically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is

usually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an

Excel formula. On occasion, there are conflicting results in the reports because the products and departments that

roll up to each business unit are not defined consistently.

Requirements -

Planned Changes -

Contoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants

to reduce how long it takes to populate the reports to less than two days. The company wants to create common

logic for the business units, products, and departments. The logic will be used across all reports, including but not

limited to the quarterly reporting for the board.

Technical Requirements -

Contoso wants the reports and datasets refreshed with minimum manual effort.

The company wants to provide the board with a single package of reports that will contain custom navigation and

links to supplementary information.

Maintenance, including manually updating data and access, must be minimized as much as possible.

Security Requirements -

The reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group

will be used to share information with the board.

Contoso identifies the following security requirements for analyst access:

Analysts must be able to access all balance sheet and product catalog data.

Analysts must be able to access only the profit and loss data of their respective business unit.

Analysts must be able to create new reports from the dataset that contains the profit and loss data, but the

reports built by the analysts must NOT be included in the quarterly reports for the board.

Analysts must NOT be able to share the quarterly reports with anyone.

Analysts must NOT be able to make new reports by using the balance sheet data.

Report Requirements -

You plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the

last day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the

ending balances for the quarter, as well as for the previous quarter.

The date table will contain the columns shown in the following table.

The definitions and attributes for the products, departments, and business units must be consistent across all the

reports.

The board must be able to get the following information from the quarterly reports:

Revenue trends over time

The ending balances of each account

Changes in long-term liabilities from the previous quarter

The percent of total revenue contributed by each product category

A comparison of quarterly revenue versus the same quarter from the previous year

The reports must be updated with the latest data by 5 AM each day.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-367-366', 'Model the data', 'manual', 'HOTSPOT -

How should you distribute the reports to the board? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:', '[]', '[]', '1. Using an App

2. A mail-enabled security group in Azure Active Directory

Box 1: Using an App

Box 2: A mail-enabled security group in Azure Active Directory

Mail-Enabled Security Group -

This group also contains a list of email addresses of members and can also be used to control access to
OneDrive and SharePoint.

The Mail-Enabled Security Group can be created in the Office 365 Admin Portal

Note: The reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure
AD) group will be used to share information with the board.

Incorrect:

* Distribution Group

This group can also be called and Distribution List. The Distribution Group is a group which contains a list of
email addresses of members, all of whom will be sent an email when an email is sent to the distribution groups
email address.

The Distribution Group can be created in the Azure Active Directory

Reference:

https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-share-dashboards
https://www.fourmoo.com/2020/04/01/power-bi-which-groups-can-be-used-to-set-permissions-in-power-bi/', 'Final', '367', '/dump-assets/f1-367-366-question.webp', '/dump-assets/f1-367-366-answer.webp', 'Contoso, Ltd. — Case Study

Overview -

Contoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board

meetings for which financial analysts manually prepare

Microsoft Excel reports, including balance sheets and profit and loss statements for each of the company''s four

business units.

Existing Environment -

Data and Sources -

Data for the reports comes from the sources shown in the following table.

The balance sheet data is unrelated to the profit and loss results other than they both relate to dates.

Balance Sheet Data -

The balance sheet data is imported and includes the final monthly balances of each account in the format shown in

the following table.

The balance sheet data always includes a row for each account for each month.

Product Catalog Data -

The product catalog shows how products roll up to product categories, which roll up to the business units. The

product list is provided in the format shown in the following table.

Revenue data is provided at the date and product level. Expense data is provided at the date and department level.

Business Issues -

Historically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is

usually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an

Excel formula. On occasion, there are conflicting results in the reports because the products and departments that

roll up to each business unit are not defined consistently.

Requirements -

Planned Changes -

Contoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants

to reduce how long it takes to populate the reports to less than two days. The company wants to create common

logic for the business units, products, and departments. The logic will be used across all reports, including but not

limited to the quarterly reporting for the board.

Technical Requirements -

Contoso wants the reports and datasets refreshed with minimum manual effort.

The company wants to provide the board with a single package of reports that will contain custom navigation and

links to supplementary information.

Maintenance, including manually updating data and access, must be minimized as much as possible.

Security Requirements -

The reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group

will be used to share information with the board.

Contoso identifies the following security requirements for analyst access:

Analysts must be able to access all balance sheet and product catalog data.

Analysts must be able to access only the profit and loss data of their respective business unit.

Analysts must be able to create new reports from the dataset that contains the profit and loss data, but the

reports built by the analysts must NOT be included in the quarterly reports for the board.

Analysts must NOT be able to share the quarterly reports with anyone.

Analysts must NOT be able to make new reports by using the balance sheet data.

Report Requirements -

You plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the

last day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the

ending balances for the quarter, as well as for the previous quarter.

The date table will contain the columns shown in the following table.

The definitions and attributes for the products, departments, and business units must be consistent across all the

reports.

The board must be able to get the following information from the quarterly reports:

Revenue trends over time

The ending balances of each account

Changes in long-term liabilities from the previous quarter

The percent of total revenue contributed by each product category

A comparison of quarterly revenue versus the same quarter from the previous year

The reports must be updated with the latest data by 5 AM each day.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-368-367', 'Manage and secure Power BI', 'single', 'You need to ensure that the data is

updated to meet the report requirements. The solution must minimize configuration effort.

What should you do?', '["From each report in powerbi.com, select Refresh visuals.","From Power BI Desktop, download the PBIX file and refresh the data.","Configure a scheduled refresh without using an on-premises data gateway.","Configure a scheduled refresh by using an on-premises data gateway."]', '[2]', 'C is the answer. The database is on Azure database, not on-premise

"Scheduled refresh of reports isn’t supported with Dynamics 365 (on-premises) datasets that are published to
the Power BI service. You can refresh reports using in Microsoft Power BI Desktop or Microsoft Office Excel
and then upload the reports to the Power BI service."

So D is impossible. C is correct.', 'Final', '368', '/exhibit-assets/f1-368-367.webp', NULL, 'Contoso, Ltd. — Case Study

Overview -

Contoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board

meetings for which financial analysts manually prepare

Microsoft Excel reports, including balance sheets and profit and loss statements for each of the company''s four

business units.

Existing Environment -

Data and Sources -

Data for the reports comes from the sources shown in the following table.

The balance sheet data is unrelated to the profit and loss results other than they both relate to dates.

Balance Sheet Data -

The balance sheet data is imported and includes the final monthly balances of each account in the format shown in

the following table.

The balance sheet data always includes a row for each account for each month.

Product Catalog Data -

The product catalog shows how products roll up to product categories, which roll up to the business units. The

product list is provided in the format shown in the following table.

Revenue data is provided at the date and product level. Expense data is provided at the date and department level.

Business Issues -

Historically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is

usually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an

Excel formula. On occasion, there are conflicting results in the reports because the products and departments that

roll up to each business unit are not defined consistently.

Requirements -

Planned Changes -

Contoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants

to reduce how long it takes to populate the reports to less than two days. The company wants to create common

logic for the business units, products, and departments. The logic will be used across all reports, including but not

limited to the quarterly reporting for the board.

Technical Requirements -

Contoso wants the reports and datasets refreshed with minimum manual effort.

The company wants to provide the board with a single package of reports that will contain custom navigation and

links to supplementary information.

Maintenance, including manually updating data and access, must be minimized as much as possible.

Security Requirements -

The reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group

will be used to share information with the board.

Contoso identifies the following security requirements for analyst access:

Analysts must be able to access all balance sheet and product catalog data.

Analysts must be able to access only the profit and loss data of their respective business unit.

Analysts must be able to create new reports from the dataset that contains the profit and loss data, but the

reports built by the analysts must NOT be included in the quarterly reports for the board.

Analysts must NOT be able to share the quarterly reports with anyone.

Analysts must NOT be able to make new reports by using the balance sheet data.

Report Requirements -

You plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the

last day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the

ending balances for the quarter, as well as for the previous quarter.

The date table will contain the columns shown in the following table.

The definitions and attributes for the products, departments, and business units must be consistent across all the

reports.

The board must be able to get the following information from the quarterly reports:

Revenue trends over time

The ending balances of each account

Changes in long-term liabilities from the previous quarter

The percent of total revenue contributed by each product category

A comparison of quarterly revenue versus the same quarter from the previous year

The reports must be updated with the latest data by 5 AM each day.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f1-369-368', 'Model the data', 'single', 'What is the minimum number of

Power BI datasets needed to support the reports?', '["a single imported dataset","two imported datasets","two DirectQuery datasets","a single DirectQuery dataset"]', '[1]', 'Note:

Analysts must be able to create new reports from the dataset that contains the profit and loss data, but the
reports built by the analysts must NOT be included in the quarterly reports for the board.

Analysts must NOT be able to make new reports by using the balance sheet data.

Two datasets are required.

Need DAX for: A comparison of quarterly revenue versus the same quarter from the previous year. Also see
other questions in this Case study which uses DAX expressions.

Incorrect:

Not Direct Query: Direct Query Limited Transformations.

You are not able to use all of the normal Power Query transformation features. Particular DAX functions are
not available in this method as well. So if your data is poorly structured or needing lots of transformation,
sometimes Direct Query is not a viable option.

Reference:

https://www.tessellationtech.io/import-vs-direct-query-power-bi/', 'Final', '369', '/exhibit-assets/f1-369-368.webp', NULL, 'Contoso, Ltd. — Case Study

Overview -

Contoso, Ltd. is a manufacturing company that produces sports equipment. Contoso holds quarterly board

meetings for which financial analysts manually prepare

Microsoft Excel reports, including balance sheets and profit and loss statements for each of the company''s four

business units.

Existing Environment -

Data and Sources -

Data for the reports comes from the sources shown in the following table.

The balance sheet data is unrelated to the profit and loss results other than they both relate to dates.

Balance Sheet Data -

The balance sheet data is imported and includes the final monthly balances of each account in the format shown in

the following table.

The balance sheet data always includes a row for each account for each month.

Product Catalog Data -

The product catalog shows how products roll up to product categories, which roll up to the business units. The

product list is provided in the format shown in the following table.

Revenue data is provided at the date and product level. Expense data is provided at the date and department level.

Business Issues -

Historically, it has taken two analysts a week to prepare the reports for the quarterly board meetings. Also, there is

usually at least one issue each quarter where a value in a report is wrong because of a bad cell reference in an

Excel formula. On occasion, there are conflicting results in the reports because the products and departments that

roll up to each business unit are not defined consistently.

Requirements -

Planned Changes -

Contoso plans to automate and standardize the quarterly reporting process by using Power BI. The company wants

to reduce how long it takes to populate the reports to less than two days. The company wants to create common

logic for the business units, products, and departments. The logic will be used across all reports, including but not

limited to the quarterly reporting for the board.

Technical Requirements -

Contoso wants the reports and datasets refreshed with minimum manual effort.

The company wants to provide the board with a single package of reports that will contain custom navigation and

links to supplementary information.

Maintenance, including manually updating data and access, must be minimized as much as possible.

Security Requirements -

The reports must be made available to the board from powerbi.com. An Azure Active Directory (Azure AD) group

will be used to share information with the board.

Contoso identifies the following security requirements for analyst access:

Analysts must be able to access all balance sheet and product catalog data.

Analysts must be able to access only the profit and loss data of their respective business unit.

Analysts must be able to create new reports from the dataset that contains the profit and loss data, but the

reports built by the analysts must NOT be included in the quarterly reports for the board.

Analysts must NOT be able to share the quarterly reports with anyone.

Analysts must NOT be able to make new reports by using the balance sheet data.

Report Requirements -

You plan to relate the balance sheet table to a date table in Power BI in a many-to-one relationship based on the

last day of the month. At least one of the balance sheet reports in the quarterly reporting package must show the

ending balances for the quarter, as well as for the previous quarter.

The date table will contain the columns shown in the following table.

The definitions and attributes for the products, departments, and business units must be consistent across all the

reports.

The board must be able to get the following information from the quarterly reports:

Revenue trends over time

The ending balances of each account

Changes in long-term liabilities from the previous quarter

The percent of total revenue contributed by each product category

A comparison of quarterly revenue versus the same quarter from the previous year

The reports must be updated with the latest data by 5 AM each day.', NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-002-370', 'Prepare the data', 'single', '- (Topic 1)

You need to create a relationship between the Weekly_Returns table and the Date table to meet the reporting requirements of the regional managers. What should

you do?', '["In the Weekly.Returns table, create a new calculated column named date-id in a format of yyyymmdd and use the calculated column to create a relationship to the Date table.","Add the Weekly_Returns data to the Sales table by using related DAX functions.","Create a new table based on the Date table where date-id is unique, and then create a many-to-many relationship to Weekly_Return."]', '[0]', 'Scenario: Region managers require a visual to analyze weekly sales and returns. To relate the two tables we need a common column.', 'Final 2', '2', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-003-371', 'Prepare the data', 'single', '- (Topic 1)

You need to create a calculated column to display the month based on the reporting requirements. Which DAX expression should you use?', '["FORMAT(''Date''[date], \"MMM YYYY\")","FORMAT(''Date'' [date], \"M YY\")","FORMAT(''Date''[date_id], \"MMM\") & \"\" & FORMAT(''Date''[year], \"#\")","FORMAT(''Date'' [date_id], \"MMM YYYY\")"]', '[0]', 'FORMAT(''Date''[date], "MMM YYYY") returns a text label such as Oct 2026 from each date. The format string supplies the abbreviated month and four-digit year required by the report.', 'Final 2', '3', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-005-373', 'Model the data', 'single', '- (Topic 2)

You need to recommend a strategy to consistently define the business unit, department, and product category data and make the data usable across reports.

What should you recommend?', '["Create a shared dataset for each standardized entity.","Create dataflows for the standardized data and make the dataflows available for use in all imported datasets.","For every report, create and use a single shared dataset that contains the standardized data.","For the three entities, create exports of the data from the Power Bl model to Excel and store the data in Microsoft OneDrive for others to use as a source."]', '[1]', 'Create reusable dataflows for the standardized Business Unit, Department, and Product Category entities. Multiple imported semantic models can then consume the same governed definitions instead of repeating transformation logic.', 'Final 2', '5', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-006-374', 'Model the data', 'single', '- (Topic 2)

Which DAX expression should you use to get the ending balances in the balance sheet reports?', '["CALCULATE (SUM( BalanceSheet [BalanceAmount] ), DATESQTD( ''Date''[Date] ))","CALCULATE (SUM( BalanceSheet [BalanceAmount] ), LASTDATE( ''Date''[Date] ))","FIRSTNONBLANK ( ''Date'' [Date]SUM( BalanceSheet[BalanceAmount] ))","CALCULATE (MAX( BalanceSheet[BalanceAmount] ), LASTDATE( ''Date'' [Date] ))"]', '[1]', 'Independent correction: B. CALCULATE(SUM(BalanceSheet[BalanceAmount]), LASTDATE(''Date''[Date])). Ending balance is a semi-additive calculation: aggregate accounts for the last date in the selected quarter. DATESQTD is appropriate for additive flows, not snapshot balances.', 'Final 2', '6', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-014-381', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the

stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.

You create a parameter named DataSourceExcel that holds the file name and location of a Microsoft Excel data source.

You need to update the query to reference the parameter instead of multiple hard-coded copies of the location within each query definition.

Solution: You create a new query that references DataSourceExcel. Does this meet the goal?', '["Yes","No"]', '[1]', 'Instead modify the source step of the queries to use DataSourceExcel as the file path.
Note: Parameterising a Data Source could be used in many different use cases. From connecting to different data sources defined in Query Parameters to load
different combinations of columns.
Reference:
https://www.biinsight.com/power-bi-desktop-query-parameters-part-1/', 'Final 2', '14', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-018-382', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the

stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.

You have five reports and two dashboards in a workspace.

You need to grant all organizational users read access to one dashboard and three reports Solution: In Microsoft Azure Active Directory (Azure AD), part of

Microsoft Entra. you create

a group that contains all the users. You share each selected report and the one dashboard to the group.

Does this meet the goal?', '["Yes","No"]', '[0]', 'Independent correction: Yes. Directly sharing the selected reports and dashboard with a Microsoft Entra security group grants the group access to those items without exposing the other workspace content.', 'Final 2', '18', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-019-383', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a Power Bl report

You have a table named Dalai that contains 10 million rows. Data is used in the following visuals:

• A card that shows the number of records

• A bar chart that snows total transaction amount by territory

• A scatter plot that shows transaction amount and profit amount on the axes and points colored by territory

You need to modify the scatter plot to make it easier for users to identify meaningful patterns. The solution must not affect the accuracy of the other visuals-What

should you do?', '["Apply a row filter to the Dalai query in Power Query Editor.","Add a trend line to the scatter plot","Enable high-density sampling on the scatter plot","Add a count field of the transaction amount to the size bucket of the scatter plot"]', '[2]', 'Independent correction: C. Enable high-density sampling. It improves the scatter plot representation for dense data and keeps the other visuals and underlying model unchanged. A trend line summarizes direction but does not solve point sampling and overlap.', 'Final 2', '19', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-020-384', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You need to create a visual as shown in the following exhibit.

The indicator color for Total Sales will be based on % Growth to Last Year. The solution must use the existing calculations only.

How should you configure the visual? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Reviewed answer: Background color, then Rules. Apply conditional formatting to the Total Sales cell background and define rules based on % Growth to Last Year. Field value is for a field or measure that already returns color names or color codes.', 'Final 2', '20', '/dump-assets/f2-020-384-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-021-385', 'Manage and secure Power BI', 'single', '- (Topic 4)

You are creating a Power Bl report by using Power Bi Desktop.

You need to include a visual that shows trends and other useful information automatically. The visual must update based on selections in other visuals.

Which type of visual should you use?', '["key influencers","decomposition tree","Q&A","smart narrative"]', '[3]', 'A Smart narrative visual automatically generates a natural-language summary of trends and important values, and recalculates that narrative when selections in other visuals change the filter context.', 'Final 2', '21', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-026-386', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You build a report about warehouse inventory data. The dataset has more than 10 million product records from 200 warehouses worldwide. You have a table

named Products that contains the columns shown in the following table.

Warehouse managers report that it is difficult to use the report because the report uses only the product name in tables and visuals. The product name is

contained within the ProductDescription column and is always the fourth value.

You need to modify the report to support the warehouse managers requirement to explore inventory levels at different levels of the product hierarchy. The solution

must minimize the model size.

Which three actions should you perform in sequence? To answer, move the appropriate

actions from the list of actions to the answer area and arrange them in the correct order.', '[]', '[]', 'The fourth segment of ProductDescription is the product name. Extract it first, then build the hierarchy from broad category to detailed specification, and finally replace the long description field in report visuals with that hierarchy.', 'Final 2', '26', '/dump-assets/f2-026-386-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-027-387', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have the Power Bl model shown in the following exhibit.

There are four departments in the Departments table.

You need to ensure that users can see the data of their respective department only. What should you do?', '["Create a row-level security (RLS) role for each department, and then define the membership of the role.","Create a DepartmentID parameter to filter the Departments table.","To the ConfidentialData table, add a calculated measure that uses the currentgroup DAX function.","Create a slicer that filters Departments based on DepartmentID."]', '[0]', 'Create row-level security roles that filter each department and assign the corresponding users to those roles in the Power BI service. RLS enforces the restriction at the semantic-model level rather than relying on editable report filters.', 'Final 2', '27', '/exhibit-assets/f2-027-387.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-030-388', 'Manage and secure Power BI', 'multi', '- (Topic 4)

You have a report that contains three pages. One of the pages contains a KPI visualization. You need to filter all the visualizations in the report except for the KPI

visualization. Which two actions should you perform? Each correct answer presents part of the solution. NOTE: Each correct selection is worth one point.', '["Add the same slicer to each page and configure Sync slicers.","Edit the interactions of the KPI visualization.","Configure a page-level filter.","Edit the interactions of the slicer that is on the same page as the KPI visualization.","Configure a report-level filter."]', '[0,3]', 'Slicers are another way of filtering. They narrow the portion of the dataset that is shown in the other report visualizations.
By default, slicers on report pages affect all the other visualizations on that page, including each other. Use visual interactions to exclude some page visualizations
from being affected by others.
Reference:
https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers', 'Final 2', '30', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-034-389', 'Manage and secure Power BI', 'single', '- (Topic 4)

Your company has employees in 10 states.

The company recently decided to associate each state to one of the following three regions: East, West, and North.

You have a data model that contains employee information by state. The model does NOT

include region information.

You have a report that shows the employees by state.

You need to view the employees by region as quickly as possible. What should you do?', '["Create a new aggregation that summarizes by employee.","Create a new group on the state column and set the Group type to List.","Create a new group on the state column and set the Group type to Bin.","Create a new aggregation that summarizes by state."]', '[1]', 'https://www.mssqltips.com/sqlservertip/4720/binning-and-grouping-data-with- power-bi/', 'Final 2', '34', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-038-390', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have a power BI tenant that hosts the datasets shown in the following table.

You have the following requirements:

• The export of reports that contain Personally Identifiable Information (Pll) must be prevented.

• Data used for financial decisions must be reviewed and approved before use.

For each of the following statements, select Yes if the statement is true. Otherwise select No. NOTE: Each correct selection is worth one point', '[]', '[]', 'Apply the appropriate sensitivity labels and protection settings to the semantic models. A label can travel with supported exports and protection can restrict export, while endorsement is used to mark trusted data for decision-making. The three statements evaluate to Yes, No, and Yes in the order shown.', 'Final 2', '38', '/dump-assets/f2-038-390-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-042-392', 'Manage and secure Power BI', 'single', '- (Topic 4)

You build a Power Bl report that displays 10T temperature data streaming from a refrigerator.

You publish the report to the Bl service.

You need to be notified when the temperature rises above four degrees Celsius. What should you do?', '["Pin a report page to a dashboard and set an alert on the page.","Set an alert on a KPI visual in the report.","Pin a card visual to a dashboard and set an alert on the tile.","Pin a card visual to a dashboard and create a subscription."]', '[2]', 'Independent correction: C. Pin a card visual to a dashboard, then configure an alert on that dashboard tile. Power BI data alerts support gauge, KPI, and card tiles.', 'Final 2', '42', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-044-393', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a collection of reports for the HR department of your company.

You need to create a visualization for the HR department that shows historical employee counts and predicts trends during the next six months.

Which type of visualization should you use?', '["key influences","ribbon chart","line chart","scatter chart"]', '[2]', 'Use a line chart with the historical date on the axis, then add Forecast from the Analytics pane for the next six months. A line chart is the supported time-series visual for forecasting.', 'Final 2', '44', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-048-394', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You open powerbi.com as shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'The breadcrumb shows Insurance Data as the workspace and Customers as the dashboard. The visible Sale badge is the data-classification shorthand. The Q&A suggestions are grouped under INSURANCE, which identifies the dataset used by the dashboard.', 'Final 2', '48', '/dump-assets/f2-048-394-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-050-395', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You are creating an analytics report that will consume data from the tables shown in the following table.

There is a relationship between the tables.

There are no reporting requirements on employeejd and employee_photo. You need to optimize the data model

What should you configure for employeejd and employee.photo? To answer, select the appropriate options in the answer area.', '[]', '[]', 'employee_id remains necessary for the relationship, so hide it from report authors instead of removing it. employee_photo has no reporting or relationship use, so removing it reduces model size.', 'Final 2', '50', '/dump-assets/f2-050-395-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-054-396', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a Power Bi model mat contains a table named Date. The Date table contains the fallowing columns:

• Date

• Fiscal year

• Fiscal Quartet

• Month Name

• Calendar Year

• Week Number

• Month Number

• Calendar Quarter

You need to create a calculated table based on the Date table. The calculated tab*e must contain only unique combinations of values for Calendar Year. Calendar

Quarter and Calendar Month. Which DAX function should you include in the table deflation?', '["DATATABLE","ADDCOLUMS","SUMMARIZE","CALCULATE"]', '[2]', 'SUMMARIZE groups the Date table by Calendar Year, Calendar Quarter, and Calendar Month and returns one row per unique combination, which is the required calculated table grain.', 'Final 2', '54', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-059-397', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You plan to create a report that will display sales data from the last year for multiple regions

You need to restrict access to individual rows of the data on a per region-basis by using roles.

Which four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the

correct order.', '[]', '[1,3,0,4]', 'Role definitions are authored in Desktop, but user membership is assigned only after publishing in the service. This order creates and then activates row-level security correctly.', 'Final 2', '59', '/dump-assets/f2-059-397-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-061-398', 'Manage and secure Power BI', 'multi', '- (Topic 4)

You are creating a query to be used as a Country dimension in a star schema. A snapshot of the source data is shown in the following table.

You need to create the dimension. The dimension must contain a list of unique countries. Which two actions should you perform? Each correct answer presents

part of the solution.', '["Remove duplicates from the Country column.","Remove duplicates from the City column.","|Remove duplicates from the table.","Delete the City column.","Delete the Country column."]', '[0,3]', 'To create a dimension table for Country from your source data, you need to perform these two actions34:
? Delete the City column. You don’t need this column for your Country dimension, as
it is not a descriptive attribute of Country. You can create another dimension table for City if you want to use it in your analysis.
? Remove duplicates from the Country column. You want to have a list of unique
countries in your dimension table, so you need to remove any duplicate values from this column.', 'Final 2', '61', '/exhibit-assets/f2-061-398.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-071-400', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a Power BI report that contains four pages. All the pages contain a slicer for a field named Country,

You need to ensure that when a user selects a county on page l, the selection is retained on page 2 and page 3. The solution must prevent page 4 from being

affected by

selections on the other pages, What should you do?', '["Remove the Country slicer from page 1, page 2, and page 3. Add the Country field to the report-level filters.","Remove the Country slicer from page 1, page 2, and page 3. Add the Country field to the page-level filters.","Sync the Country slicer on page 1, page 2, and page 3,","Move the Country slicer from page 2 and page 3 to page 1."]', '[2]', 'Independent correction: C. Sync the Country slicer across pages 1, 2, and 3 and do not sync it to page 4. This preserves the selection on the selected pages only.', 'Final 2', '71', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-076-401', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have a table that contains a column named Phone. The following is a sample of the data in the Phone column.

You need to add a new column that contains the data in the format of nnn-nnn-nnnn. How should you complete the Query Editor formula? To answer, select the

appropriate

options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Text.End keeps the final 12 characters, which removes the optional leading country code. Text.Replace then changes spaces to hyphens so every result has the nnn-nnn-nnnn format.', 'Final 2', '76', '/dump-assets/f2-076-401-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-081-402', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the

stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.

You have a Power BI report that imports a date table and a sales table from an Azure SQL database data source. The sales table has the following date foreign

keys:

• Due Date

• Order Date

• Delivery Date

You need to support the analysis of sales over time based on all three dates at the same time.

Solution; You create measures that use the uSEREIATIOHSHIP DAX function to filter sales on the inactive relationships between the sales table and the date

table.

Does this meet the goal?', '["Yes","No"]', '[1]', 'No. USERELATIONSHIP activates one inactive relationship inside a measure, but one shared Date table still cannot filter Due Date, Order Date, and Delivery Date simultaneously for independent analysis. Use separate role-playing date tables when all three date roles must be available at the same time.', 'Final 2', '81', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-083-403', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have two CSV files named Products and Categories. The Products file contains the following columns:

? ProductID

? ProductName

? SupplierID

? CategoryID

The Categories file contains the following columns:

? CategoryID

? CategoryName

? CategoryDescription

From Power BI Desktop, you import the files into Power Query Editor.

You need to create a Power BI dataset that will contain a single table named Product. The Product will table includes the following columns:

? ProductID

? ProductName

? SupplierID

? CategoryID

? CategoryName

? CategoryDescription

How should you combine the queries, and what should you do on the Categories query? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Merge adds the category columns to Products by matching CategoryID. The helper query must remain available to the merge, but disabling its load prevents an unnecessary standalone model table.', 'Final 2', '83', '/dump-assets/f2-083-403-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-088-404', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a large dataset that contains more than 1 million rows. The table has a datetime column named

Date.

You need to reduce the size of the data model. What should you do?', '["Round the hour of the Date column to startOfHour.","Change the data type of the Date column to Text.","Trim the Date column.","Split the Date column into two columns, one that contains only the time and another that contains only the date."]', '[3]', 'We have to separate date & time tables. Also, we don’t need to put the time into the date table, because the time is repeated every day.
Split your DateTime column into a separate date & time columns in fact table, so that you can join the date to the date table & the time to the time table. The time
need to be converted to the nearest round minute or second so that every time in your data corresponds to a row in your time table.
Reference:
https://intellipaat.com/community/6461/how-to-include-time-in-date-hierarchy-in-power-bi', 'Final 2', '88', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-090-405', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the

stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.

After you answer a question in this scenario, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.

You have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as the axis. Salary is present in the data as

numerical amount representing US dollars.

You need to create a reference line to show which employees are above the median

salary.

Solution: You create an average line by using the Salary measure. Does this meet the goal?', '["Yes","No"]', '[1]', 'Instead create a percentile line by using the Salary measure and set the percentile to 50%. Note: The 50th percentile is also known as the median or middle value
where 50 percent of
observations fall below.
Reference:
https://dash-intel.com/powerbi/statistical_functions_percentile.php', 'Final 2', '90', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-100-407', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You are building a dataset from a JSON file that contains an array of documents.

You need to import attributes as columns from all the documents in the JSON file. The solution must ensure that date attributes can be used as date hierarchies in

Microsoft Power BI reports.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the

correct order.', '[]', '[]', 'A JSON array arrives as a list. Convert it to a table, expand each record into columns, and only then assign types so date attributes can support date hierarchies.', 'Final 2', '100', '/dump-assets/f2-100-407-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-102-408', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a BI dataset and a connected report.

You need to ensure that users can analyze data in Microsoft Excel by connecting directly to the dataset.

You grant the users the Build permission for dataset What Should do next?', '["Change default visual interaction for the report","For the report change the Export data setting to Summarized data, data with current layout and underlying data","For the report, change the Export data setting to None","Certify the dataset used by the report."]', '[2]', 'Independent correction: C. Build permission enables Analyze in Excel against the semantic model. Report visual export is a separate capability, so set Export data to None when it is not required.', 'Final 2', '102', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-105-409', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is part of a series of questions that use the same scenario. For your convenience, the scenario is repeated in each question. Each question

presents a different goal and answer choices, but the text of the scenario is the same in each question in this series.

You have a Microsoft SQL Server database that contains the following tables.

The following columns contain date information:

- Date[Month] in the mmyyyy format

- Date[Date_ID] in the ddmmyyyy format

- Date[Date_name] in the mm/dd/yyyy format

- Monthly_returns[Month_ID] in the mmyyyy format The Order table contains more than one million rows.

The Store table has a relationship to the Monthly_returns table on the Store_ID column. This is the only relationship between the tables.

You plan to use Power BI Desktop to create an analytics solution for the data.

You need to create a relationship between the Order table and the Store table on the

Store_ID column.

What should you do before you create the relationship?', '["In the Order table query, use the Table.TrasformRows function.","In the Store table query, use the Table.TrasformRows function.","In the Store table query, use the Table.TrasformColumnTypes function.","In the Order table query, use the Table.TrasformColumnTypes function."]', '[2]', 'Use Table.TransformColumnTypes in the Store query so Store[Store_ID] has the same data type as Order[Store_ID] before the relationship is created. Relationship keys must have compatible data types; transforming rows does not solve that requirement.', 'Final 2', '105', '/exhibit-assets/f2-105-409.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-106-410', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You need to create a Power Bl report. The first page or the report must contain the following two views:

* Sales By Postal Code

* Sales by Month

Both views must display a slicer to select a value for a field named Chain.

The Sales By Postal Code view must display a map visual as shown in the following exhibit.', '[]', '[]', 'One bookmark shows the postal-code map and the other shows the monthly visual. Capture Display so the bookmarks change visual visibility without resetting the Chain slicer selection.', 'Final 2', '106', '/dump-assets/f2-106-410-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-111-411', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have data in a Microsoft Excel worksheet as shown in the following table.

You need to use Power Query to clean and transform the dataset. The solution must meet the following requirements:

• If the discount column returns an error, a discount of 0.05 must be used.

• All the rows of data must be maintained.

• Administrative effort must be minimized. What should you do in Power Query Editor?', '["Select Keep Errors","Edit the query in the Query Errors group.","Select Replace Errors","Select Remove Errors."]', '[2]', 'Select Replace Errors and enter 0.05. This replaces only the error cells and preserves every row, meeting the requirement with one transformation step.', 'Final 2', '111', '/exhibit-assets/f2-111-411.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-113-412', 'Manage and secure Power BI', 'single', '- (Topic 4)

Your company has training videos that are published to Microsoft Stream. You need to surface the videos directly in a Microsoft Power BI dashboard. Which type

of tile should you add?', '["video","custom streaming data","text box","web content"]', '[3]', 'https://docs.microsoft.com/en-us/stream/portal-embed-video https://docs.microsoft.com/en-us/power-bi/create-reports/service-dashboard-add- widget#add-web-
content', 'Final 2', '113', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-118-413', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a Power BI report that uses a dataset based on an Azure Analysis Services live connection.

You need to ensure that users can use Q&A from the Power BI service for the dataset. What should you do?', '["From the Power BI service, add an enterprise gateway to the dataset.","From Power BI Desktop, add synonyms and suggested questions.","From Power BI Desktop, add a Q&A visual to the report.","From the Power Bi service, select Turn on Q& A for this dataset."]', '[3]', 'Enable Q&A for the live-connected semantic model in the Power BI service. The service setting controls whether users can ask natural-language questions against that dataset.', 'Final 2', '118', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-122-414', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a Microsoft Power Bl dashboard.

You need to ensure that consumers of the dashboard can give you feedback that will be visible to the other consumers of the dashboard.

What should you use?', '["Feedback","Subscribe","Comments","Mark as favorite"]', '[2]', 'https://docs.microsoft.com/en-us/power-bi/consumer/end-user-comment', 'Final 2', '122', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-123-415', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have multiple dashboards.

You need to ensure that when users browse the available dashboards from powerbi.com. they can see which dashboards contain Personally Identifiable

Information (Pll). The solution must minimize configuration effort and impact on the dashboard design.

What should you use?', '["Active Directory groups","tiles","data classifications","comments"]', '[2]', 'Legacy-source answer: C, data classifications. Current-product note: Power BI now uses Microsoft Purview sensitivity labels on dashboards, reports, semantic models, and dataflows. Because the modern feature is absent from the choices, treat this as a legacy concept check rather than a current UI instruction.', 'Final 2', '123', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-128-416', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have an Azure SQL database that contains sales transactions. The database is updated frequently.

You need to generate reports from the data to detect fraudulent transactions. The data must be visible within five minutes of an update.

How should you configure the data connection?', '["Add a SQL statement.","Set Data Connectivity mode to DirectQuery.","Set the Command timeout in minutes setting.","Set Data Connectivity mode to Import."]', '[1]', 'With Power BI Desktop, when you connect to your data source, it''s always possible to
import a copy of the data into the Power BI Desktop. For some data sources, an alternative approach is available: connect directly to the data source using
DirectQuery.
DirectQuery: No data is imported or copied into Power BI Desktop. For relational sources, the selected tables and columns appear in the Fields list. For multi-
dimensional sources like SAP Business Warehouse, the dimensions and measures of the selected cube appear in the Fields list. As you create or interact with a
visualization, Power BI Desktop queries the underlying data source, so you’re always viewing current data.
Reference:
https://docs.microsoft.com/en-us/power-bi/connect-data/desktop-use-directquery', 'Final 2', '128', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-130-417', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have a folder of monthly transaction extracts.

You plan to create a report to analyze the transaction data.

You receive the following email message: "Hi. I''ve put 24 files of monthly transaction data onto the shared drive. File Transactions201901.csv through

Transactions201912.csv have the latest set of columns, but files Transactions201801.csv to Transactions201812.csv have an older layout without the extra fields

needed for analysis. Each file contains 10 to 50 transactions."

You get data from the folder and select Combine & Load. The Combine Files dialog box is shown in the exhibit. (Click the Exhibit tab.)

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Combine Files builds the transformation function from the selected sample file. Because the first file uses the older 2018 layout, the generated expansion contains the 2018 columns but does not automatically add the extra columns that exist only in 2019 files. Limiting type detection to the first 200 rows reduces profiling work and can improve import time.', 'Final 2', '130', '/dump-assets/f2-130-417-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-135-418', 'Manage and secure Power BI', 'multi', '- (Topic 4)

You are reviewing a query that produces 10,000 rows in the Power Query Editor. You need to identify whether a column contains only unique values.

Which two Data Preview options can you use? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.', '["Column profile","Column distribution","Show whitespace","Column quality","Monospace"]', '[0,1]', 'B: Column distribution: This feature provides a set of visuals underneath the names of the columns that showcase the frequency and distribution of the values in
each of the columns. The data in these visualizations is sorted in descending order from the value with the highest frequency.
By hovering over the distribution data in any of the columns, you get information about the overall data in the column (with distinct count and unique values).
A: Column profile: This feature provides a more in-depth look at the data in a column [compared to column distribution]. Apart from the column distribution chart, it
contains a column statistics chart.
Reference:
https://docs.microsoft.com/en-us/power-query/data-profiling-tools', 'Final 2', '135', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-136-419', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You are creating a Power Bi model in Power BI Desktop

You need to create a calculated table named Numbers that will contain all the integers from

-100 to 100. How should you complete the DAX calculation? To answer, select the appropriate options in the answer area. NOTE Each correct selection is worth

one point.', '[]', '[]', 'GENERATESERIES returns one row for each value from -100 through 100 inclusive, incrementing by 1, which is exactly the required calculated table.', 'Final 2', '136', '/dump-assets/f2-136-419-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-137-420', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is a part of a series of questions that present the same scenario. For your convenience, the scenario is repeated in each question. Each

question presents a different goal and answer choices, but the text of the scenario is exactly the same in each question in this series.

Start of repeated scenario

You have a Microsoft SQL Server database that has the tables shown in the Database Diagram exhibit. (Click the Exhibit.)

You plan to develop a Power BI model as shown in the Power BI Model exhibit. (Click the Exhibit).

You plan to use Power BI to import data from 2013 to 2015. Product Subcategory [Subcategory] contains NULL values.

End of repeated scenario.

You implement the Power BI model.

You need to add a new column to the Product Subcategory table that uses the following formula.

=if [Subcategory] =null then “NA” else [Subcategory] Which command should you use in Query Editor?', '["Column From Examples","Custom Column","Invoke Custom Function","Conditional Column"]', '[3]', 'References: http://community.powerbi.com/t5/Desktop/if-then-else/td-p/117999', 'Final 2', '137', '/exhibit-assets/f2-137-420.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-141-421', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a report that contains a bar chart and a column chart. The bar chart shows customer count by

customer segment. The column chart shows sales by month.

You need to ensure that when a segment is selected in the bar chart, you see which portion of the total sales for the month belongs to the customer segment.

How should the visual interactions be set on the column chart when the bar chart is selected?', '["no impact","highlight","filter"]', '[1]', 'HIGHLIGHT as the question required us to "you see which portion of the total sales for the month belongs to the customer segment" -- in order to see WHICH
portion, you need to still see the whole visual, highlight is most appropriate. If the requirement stated to ONLY SEE THE PORTION IT RELATES TO then filter
would be appropriate.', 'Final 2', '141', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-143-422', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a Power Bl model that contains the following data.

The Date table relates to the Sales table by using the Date columns. The model contains the following DAX measure.

Total Sales = SUM(Sales[Sale])

You need to create another measure named Previous Quarter to display the sales one quarter before the selected period.

Which DAX calculation should you use?', '["CALCULATE < [Total Sales], OATEADD (Date[Date], -1, QUARTER))","CALCULATE ([Total Sales], DATESQTD (Date[Date]))","TOTALQTD ([Total Sales], Date[Date])","CALCULATE < [Total Sales], PARALLELPERIOO (Date[Date], 1, QUARTER))"]', '[0]', 'CALCULATE([Total Sales], DATEADD(Date[Date], -1, QUARTER)) shifts the current date filter context back by one quarter and reevaluates Total Sales. DATESQTD returns quarter-to-date dates, while the positive PARALLELPERIOD option moves forward.', 'Final 2', '143', '/exhibit-assets/f2-143-422.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-144-423', 'Manage and secure Power BI', 'multi', '- (Topic 4)

You have a Power Bl workspace named Inventory that contains a dataset a report and a dashboard.

You need to add an additional tile to the dashboard. The tile must show inventory by location. This information is NOT visualized in the report. The solution must

minimize the impact on the report.

Which two actions should you perform? Each correct answer presents part of the solution. NOTE: Each correct selection is worth one point.', '["Use quick insights on the dashboard.","Hide the report page.","Ask a question by using Q&A.","Add the visual to the report.","Pin the visual to the dashboard."]', '[2,4]', 'Use Q&A to ask for inventory by location, then pin the generated visual to the dashboard. This creates the new dashboard tile without modifying the existing report.', 'Final 2', '144', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-147-424', 'Manage and secure Power BI', 'multi', '- (Topic 4)

From Power Query Editor, you attempt to execute a query and receive the following error message.

Datasource.Error: could not find file.

What are two possible causes of the error? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.', '["The file is locked","An incorrect privacy level was used for the data source.","The referenced file was moved to a new location","You do not have permissions to the file."]', '[2,3]', 'Independent correction: C and D. The path can be stale because the file moved, or access can fail because the user lacks permission. A privacy-level mismatch does not normally surface as a file-not-found error.', 'Final 2', '147', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-152-425', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have a Power BI report that contains the table visual shown in the following exhibit.', '[]', '[]', 'Incomplete source: no unique answer can be determined. If a later source supplies a requirement to place measures on rows, use Matrix with values on rows; if it requests a different layout, a different setting may be required. Do not treat that conditional example as the answer to this incomplete item.', 'Final 2', '152', '/dump-assets/f2-152-425-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-157-426', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You create a data model in Power BI.

Report developers and users provide feedback that the data model is too complex. The model contains the following tables.

The model has the following relationships:

*There is a one-to-one relationship between Sales_Region and Region_Manager.

*There are more records in Manager than in Region_Manager, but every record in Region_Manager has a corresponding record in Manager.

*There are more records in Sales_Manager than in Sales_Region, but every record in Sales_Region has a corresponding record in Sales_Manager.

You need to denormalize the model into a single table. Only managers who are associated to a sales region must be included in the reports.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the

correct order.

NOTE: More than one order of answer choices is correct. You will receive credit for any of the correct orders you select.', '[]', '[0,2,5]', 'The three inner joins flatten the lookup information into the sales-region query and keep only matching records, simplifying the model presented to report authors.', 'Final 2', '157', '/dump-assets/f2-157-426-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-161-427', 'Manage and secure Power BI', 'single', '- (Topic 4)

You are building a data model for a Power Bl report. You have data formatted as shown in the following table.

You need to create a clustered bar chart as shown in the following exhibit.

What should you do?', '["From Power Query Editor, split the Machine-User column by using a delimiter.","In a DAX function, create two calculated columns named Machine and User by using the substitute function.","From Power Query Editor, create a column that contains the last three digits of the Machine-User column.","in a DAX function, create two measures named Machine and User by using the substitute function."]', '[0]', 'Split Machine-User by its delimiter in Power Query to create separate Machine and User columns before loading. This is a source-shaping task, so it should not be implemented as measures.', 'Final 2', '161', '/exhibit-assets/f2-161-427.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-164-428', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a custom connector that returns ID, From, To, Subject, Body, and Has Attachments for every email sent during the past year. More than 10 million

records are returned.

You build a report analyzing the internal networks of employees based on whom they send emails to.

You need to prevent report recipients from reading the analyzed emails. The solution must minimize the model size.

What should you do?', '["Implement row-level security (RLS) so that the report recipients can only see results based on the emails they sent.","Remove the Subject and Body columns during the import.","From Model view, set the Subject and Body columns to Hidden."]', '[1]', 'Remove Subject and Body during import. They contain the readable email content and consume substantial model space, while From and To are sufficient for network analysis.', 'Final 2', '164', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-167-429', 'Manage and secure Power BI', 'multi', '- (Topic 4)

You have a Power Bl query named Sates that imports the columns shown in the following table.

Usees only use the dale part of the Sales.Date field. Only rows with a Status of Finished are used in analysis.

You need to reduce the load times of the query without affecting the analysis.

Which two actions achieve this goal? Each correct answer presents a complete solution. NOTL Each correct selection is worth one pant.', '["Remove the rows in which sales [status] has a value of Canceled.","Change the data type of sale [Delivery_Time] to Integer","Removes (Canceled Date).","Split Sales [Sale_Date] into separate date and time columns.","Remove sales [Sales_Date]."]', '[0,2]', 'Independent correction: A and C. Filter out canceled rows, then remove the now-unused Canceled Date column. These are horizontal and vertical data-reduction steps.', 'Final 2', '167', '/exhibit-assets/f2-167-429.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-168-430', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a CSV file that contains user complaints. The file contains a column named Logged logged contains the date and time each complaint occurred. The

data in Logged is m the following format: 2018-12-31 at 08:59.

You need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.

What should you do?', '["Create a column by example that starts with 2018-12-31.","Create a column by example that starts with 2018-12-31 and set the data type of the new column to Date","Apply the parse function from the Date transformations options to the Logged column.","Add a conditional column that outputs 2018 if the Logged column starts with 2018 and set the data type of the new column to Whole Number."]', '[1]', 'Independent correction: B. Use Column from Examples to extract the date portion, then set the resulting column data type to Date so Power BI can provide date behavior and hierarchy.', 'Final 2', '168', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-169-431', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the

stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.

You have a Power BI report that imports a date table and a sales table from an Azure SQL database data source. The sales table has the following date foreign

keys:

? Due Date

? Order Date

? Delivery Date

You need to support the analysis of sales over time based on all the date foreign keys.

Solution: From Power Query Editor, you rename the date query as Due Date. You reference the Due Date query twice to make the queries for Order Date and

Delivery Date.

Does this meet the goal?', '["Yes","No"]', '[0]', 'Creating two additional tables in Power Query can be a possible solution: Remove any inactive relationships.
Consider renaming the role-playing dimension-type table to better describe its role. In the example, the Airport table is related to the ArrivalAirport column of the
Flight table, so it''s renamed as Arrival Airport.
Create a copy of the role-playing table, providing it with a name that reflects its role. If it''s an Import table, we recommend defining a calculated table. If it''s a
DirectQuery table, you can duplicate the Power Query query.
In the example, the Departure Airport table was created by using the following calculated table definition.', 'Final 2', '169', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-173-432', 'Manage and secure Power BI', 'single', '- (Topic 4)

You are creating a visual to show the ranking of product categories by sales revenue.

Your company''s security policy states that you cannot send data outside of your Microsoft Power Bl tenant

Which approach provides the widest variety of visuals while adhering to the security policy?', '["Use default visuals or custom visuals uploaded from a .pbiviz file.","Use only default visuals.","Use default or any custom visuals from the marketplace.","Use default or certified custom visuals."]', '[3]', 'Independent correction: D. Default visuals plus certified custom visuals provide the broadest selection while respecting the stated data-boundary requirement. Any marketplace visual is too broad.', 'Final 2', '173', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-174-433', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

Your company has affiliates who help the company acquire customers.

You build a report for the affiliate managers at the company to assist them in understanding affiliate performance.

The managers request a visual showing the total sales value of the latest 50 transactions for each affiliate. You have a data model that contains the following

tables.

You need to develop a measure to support the visual.

How should you complete the DAX expression? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'CALCULATE evaluates SUM(Transactions[Amount]) under the table filter returned by TOPN. TOPN keeps the latest 50 transaction rows by ordering Transactions[TransactionDate] descending.', 'Final 2', '174', '/dump-assets/f2-174-433-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-177-434', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You have the Power Bl data model shown in the following exhibit.

You create two row-level security (RlS) roles named Manager and CFO. You plan to publish the dataset to the Power Bl service.

You need to create DAX expressions for the RLS filters. The solution must meet the following requirements:

• Each manager must see only the data in the Sales and Human Resources tables for their own country.

• The CFO must be prevented from seeing the data in the Human Resources table.

• The CFO must see the sales data of all countries.

How should you complete the DAX expressions to meet the requirements? To answer, drag the appropriate expressions to the correct targets. Each expression

may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.

The Country table contains the following data.

You plan to publish the dataset to the Power Bl service.

You need to create DAX expressions for the RLS filters. The solution must meet the following requirements:

• Each manager must see only the data in the Sales and Human Resources tables for their own country.

• The CFO must be prevented from seeing the data in the Human Resources table.

• The CFO must see the sales data of all countries.

How should you complete the DAX expressions to meet the requirements? To answer, drag the appropriate expressions to the correct targets. Each expression

may be used once, more than once, or not at all. You may need to drag the split bar between panes or

scroll to view content.

NOTE: Each correct selection is worth one point.', '[]', '[3,1]', 'The CFO role blocks Human Resources with FALSE() while leaving country sales unrestricted. The Manager role filters Country to the signed-in user; the model relationships propagate that filter to Sales and Human Resources.', 'Final 2', '177', '/dump-assets/f2-177-434-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-180-435', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a Power BI dashboard that monitors the quality of manufacturing processes. The dashboard contains the following elements:

? A line chart that shows the number of defective products manufactured by day.

? A KPI visual that shows the current daily percentage of defective products manufactured.

You need to be notified when the daily percentage of defective products manufactured exceeds 3%.

What should you create?', '["a Q&A visual","a subscription","a smart narrative visual","an alert"]', '[3]', 'Create a data alert on the KPI dashboard tile at the 3% threshold. Alerts notify the user when a supported dashboard tile crosses a configured value.', 'Final 2', '180', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-184-436', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the

stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.

From Power Query Editor, you profile the data shown in the following exhibit.

The IOT ID columns are unique to each row in query.

You need to analyze 10T events by the hour and day of the year. The solution must improve dataset performance.

Solution: You change the IOT DateTime column to the Date data type. Does this meet the goal?', '["Yes","No"]', '[1]', 'Independent correction: No. Converting DateTime to Date removes the hour. A valid optimization must preserve or separately derive both the date and hour needed for analysis.', 'Final 2', '184', '/exhibit-assets/f2-184-436.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-187-437', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the

stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a

result, these questions will not appear in the review screen.

You are modeling data by using Microsoft Power BI. Part of the data model is a large Microsoft SQL Server table named Order that has more than 100 million

records.

During the development process, you need to import a sample of the data from the Order table.

Solution: From Power Query Editor, you import the table and then add a filter step to the query.

Does this meet the goal?', '["Yes","No"]', '[1]', 'No. Importing the full 100-million-row table and filtering afterward can still retrieve and process the entire source. Apply the sample limit as a source-side filter or parameter early enough for query folding.', 'Final 2', '187', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-191-438', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have a dataset that has the permissions shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Analyze in Excel requires Build permission. A user who can reshare the dataset can grant Build permission to another group without transferring ownership or deleting the dataset.', 'Final 2', '191', '/dump-assets/f2-191-438-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-194-440', 'Manage and secure Power BI', 'single', '- (Topic 4)

You are developing a report page. Some users will navigate the report by using a keyboard, and some users will consume the report by using a screen reader.

You need to ensure that the users can consume the content on a report page in a logical order. What should you configure in Microsoft Power Bl Desktop?', '["the bookmark order","the layer order","the tab order","the X position"]', '[2]', 'If you find yourself unable to navigate to an object or visual while using a keyboard, it may be because the report author has decided to hide that object from the
tab order. Report authors commonly hide decorative objects from the tab order. If you find that you cannot tab through a report in a logical manner, you should
contact the report author. Report authors can set the tab order for objects and visuals.
Reference:
https://docs.microsoft.com/en-us/power-bi/create-reports/desktop-accessibility-consuming- tools', 'Final 2', '194', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-197-441', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have the Power BI data model shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'StoreID is a whole-number field and uses numeric aggregation when added alone to a table visual, so Power BI displays its sum. A filter placed on the many-side Sales table does not flow backward through the single-direction relationships, so it filters only Sales.', 'Final 2', '197', '/dump-assets/f2-197-441-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-201-443', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You are preparing a financial report in Power BI.

You connect to the data stored in a Microsoft Excel spreadsheet by using Power Query Editor as shown in the following exhibit.

You need to prepare the data to support the following:

? Visualizations that include all measures in the data over time

? Year-over-year calculations for all the measures

Which four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the

correct order.', '[]', '[2,4,0,6]', 'Promote the header row, normalize the year columns into rows with Unpivot Other Columns, rename the generated attribute, and assign a date type so the model can use the year values correctly.', 'Final 2', '201', '/dump-assets/f2-201-443-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-202-444', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You are profiling data by using Power Query Editor.

The AddressLine2 column in a table named Address is shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'The profile shows 12 distinct and 11 unique values. However, the complete readable answer options have not been recovered. Do not use the unrelated menu crops as an answer key.', 'Final 2', '202', '/dump-assets/f2-202-444-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-204-445', 'Manage and secure Power BI', 'single', '- (Topic 4)

You are configuring a Microsoft Power Bl data model to enable users to ask natural language questions by using Q&A. You have a table named Customer that has

the following measure.

Customer Count = DISTINCTCOUNT(Customer[CustomerID]) Users frequently refer to customers as subscribers.

You need to ensure that the users can get a useful result for "subscriber count" by using Q&A. The solution must minimize the size of the model.

What should you do?', '["Add a description of \"subscriber count\" to the Customer Count measure.","Set Summarize By to None for the CustomerlD column.","Add a description of \"Subscriber\" to the Customer table.","Add a synonym of \"subscriber\" to the Customer table."]', '[3]', 'Independent correction: D. Add subscriber as a synonym for Customer. This lets Q&A interpret subscriber count as the existing customer entity and measure without adding data to the model.', 'Final 2', '204', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-205-446', 'Manage and secure Power BI', 'single', '- (Topic 4)

You attempt to connect Purer 81 Desktop to a Cassandra database.

From the Get Data connector list you discover that there is no specific connector for the Cassandra database,

You need to select an alternate data connector that will connect to the database. Which of connector should you choose?', '["Microsoft SQL Server database","ODBC","OData","OLE DB"]', '[1]', 'Use ODBC. Cassandra can expose an ODBC driver even when Power BI has no dedicated native connector; ODBC supplies the generic standards-based connection path.', 'Final 2', '205', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-209-447', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have a Power BI report.

You need to create a calculated table to return the 100 highest spending customers.

How should you complete the DAX expression? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'SUMMARIZE creates one row per customer with a Sales total. TOPN then returns 100 rows ordered by that Sales value in descending order, giving the highest-spending customers.', 'Final 2', '209', '/dump-assets/f2-209-447-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-214-448', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You are modeling data in table named SalesDetail by using Microsoft Power Bl.

You need to provide end users with access to the summary statistics about the SalesDetail data. The users require insights on the completeness of the data and

the value

distributions.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the

correct order.', '[]', '[]', 'Table.Profile returns per-column statistics such as count, null count, minimum, maximum, average, and standard deviation. A blank query is used to call it, then the returned table can drive report visuals.', 'Final 2', '214', '/dump-assets/f2-214-448-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-217-449', 'Manage and secure Power BI', 'single', '- (Topic 4)

In Power BI Desktop, you are building a sales report that contains two tables. Both tables

have row-level security (RLS) configured.

You need to create a relationship between the tables. The solution must ensure that bidirectional cross-filtering honors the RLS settings.

What should you do?', '["Create an active relationship between the tables and select Assume referential integrity.","Create an inactive relationship between the tables and select Assume referential integrity.","Create an inactive relationship between the tables and select Apply security filter in both directions.","Create an active relationship between the tables and select Apply security filter in both directions."]', '[3]', 'By default, row-level security filtering uses single-directional filters, whether the relationships are set to single direction or bi-directional. You can manually enable
bi- directional cross-filtering with row-level security by selecting the relationship and checking the Apply security filter in both directions checkbox. Select this option
when you''ve also implemented dynamic row-level security at the server level, where row-level security is based on username or login ID.

Reference:
https://docs.microsoft.com/en-us/power-bi/admin/service-admin-rls', 'Final 2', '217', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-218-450', 'Manage and secure Power BI', 'single', '- (Topic 4)

You need to provide a user with the ability to add members to a workspace. The solution must use the

principle of least privilege.

Which role should you assign to the user?', '["Viewer","Contributor","Member","Admin"]', '[2]', 'A Member can add members or others with lower permissions. Note:', 'Final 2', '218', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-222-451', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have the visual shown in the Original exhibit. {Click the Original tab.)

You need to configure the visual as shown in the Modified exhibit. (Click the Modified tab.)

What should you add to the visual?', '["a measure","a trendline","a forecast","an Average line"]', '[2]', 'Explore forecast results by adjusting the desired confidence interval or by adjusting outlier data to see how they affect results.

Timeline Description automatically generated with low confidence
Reference:
https://powerbi.microsoft.com/fr-fr/blog/introducing-new-forecasting-capabilities-in-power-view-for-office-365/', 'Final 2', '222', '/exhibit-assets/f2-222-451.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-227-452', 'Manage and secure Power BI', 'single', '- (Topic 4)

For the sales department at your company, you publish a Power Bl report that imports data from a Microsoft Excel We located in a Microsoft SharePoint folder The

data model contains several measures You need to create a Power Bl report from the existing data. The solution must minimize development effort. Which type ol

data source should you use?', '["a SharePoint folder","Power Bl dataflows","an Excel workbook","Power Bl dataset"]', '[3]', 'Independent correction: D. Use the existing Power BI semantic model (called a dataset in the source wording). It already contains the model and measures, so a new thin report can reuse them.', 'Final 2', '227', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-228-453', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

Your company plans to use Power BI for 20 users in the sales department. The users will perform the following tasks:

? Access a published Power BI app

? Modify reports in an app workspace

? Share dashboards created in My Workspace

You need to identify which Power BI licenses are required for the tasks. The solution must use the Power BI (free) licenses, whenever possible.

Which license should you identify for each task? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'The scenario does not state that the app is hosted in Premium/Fabric F64+ capacity, so viewing shared app content requires Pro. Editing workspace content and sharing content also require a paid Pro or PPU license.', 'Final 2', '228', '/dump-assets/f2-228-453-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-232-454', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You have a Microsoft Excel spreadsheet that contains the data shown in the following table.

You plan to build a data model for a Power Bl report.

You need to prepare the data so that it is available to the model in the format shown in the following table.

Which three actions should you perform in sequence in Power Query Editor? To answer, move the appropriate actions from the list of actions to the answer area

and arrange them in the correct order.', '[]', '[]', 'Unpivoting converts School1 through School4 into School/Score rows. Grouping by Department and School and averaging Score combines the two Stage rows into the requested result.', 'Final 2', '232', '/dump-assets/f2-232-454-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-239-456', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is a part of a series of questions that present the same scenario. For your convenience, the scenario is repeated in each question. Each

question presents a different goal and answer choices, but the text of the scenario is exactly the same in each question in this series.

Start of repeated scenario

You have a Microsoft SQL Server database that has the tables shown in the Database Diagram exhibit. (Click the Exhibit.)

You plan to develop a Power BI model as shown in the Power BI Model exhibit. (Click the Exhibit).

You plan to use Power BI to import data from 2013 to 2015. Product Subcategory [Subcategory] contains NULL values. End of repeated scenario.

You implement the Power BI model.

You need to add a measure to rank total sales by product. The results must appear as shown in the following table.

Which DAX formula should you use?', '["Product Ranking= RANKX (Product, [SalesAmount], , DESC, Skip)","Product Ranking= RANKX (ALL, (‘Product’), [SalesAmount], , DESC, Dense)","Product Ranking= RANKX (ALL, (‘Product’), [SalesAmount], , DESC, Skip)","Product Ranking= RANKX (ALL (‘Product’), [SalesAmount], , Asc, Dense"]', '[1]', 'References: https://msdn.microsoft.com/en-us/library/gg492185.aspx', 'Final 2', '239', '/exhibit-assets/f2-239-456.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-242-457', 'Manage and secure Power BI', 'multi', '- (Topic 4)

In Power BI Desktop, you are creating a report that will contain three pages. You need to create a custom tooltip page and prepare the page for use.

Which three actions should you perform? Each correct answer presents part of the

solution.', '["Configure filters on the target visual.","For the target page, set Allow use as tooltip to On.","Add and configure visuals on the tooltip page.","For the tooltip page, set Allow use as tooltip to On.","For the tooltip page, configure filters."]', '[2,3,4]', 'Independent correction: C, D, and E. Build the tooltip page visuals, turn on Allow use as tooltip for that page, and configure the tooltip page filters/fields. The target page does not have an Allow use as tooltip setting for this task.', 'Final 2', '242', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-244-458', 'Manage and secure Power BI', 'single', '- (Topic 4)

You need to create a Power Bl theme that will be used in multiple reports. The theme will include corporate branding for font size, color, and bar chart formatting.

What should you do?', '["Create a theme as a PBIVIZ file and import the theme into Power Bl Desktop.","Create a theme as a JSON file and import the theme into Power Bl Desktop.","From Power Bl Desktop, use a built-in report theme.","From Power Bl Desktop, customize the current theme."]', '[1]', 'Independent correction: B. Define the corporate theme in a JSON file and import it into each report. PBIVIZ is a custom-visual package, not a report-theme format.', 'Final 2', '244', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-247-459', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a report in Power Bl named report1 that is based on a shared dataset.

You need to minimize the risk of data exfiltration for report1. The solution must prevent other reports from being affected.

What should you do?', '["Clear Allow recipients to share your dashboard and Allow users to build new content using the underlying datasets for the dataset.","Select the Allow end users to export both summarized and underlying data from the service or Report Server Export data option for the report.","Select the Don''t allow end users to export any data from the service or Report Server Export data option for the report.","Apply row-level security (RLS) to the shared dataset."]', '[2]', 'Set the report Export data option to prevent end users from exporting any data. This is scoped to report1, so other reports that use the same shared semantic model are not changed.', 'Final 2', '247', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-252-460', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have a column named UnitslnStock as shown in the following exhibit

UnitsInStock has 75 non-null values, of which 51 are unique.

Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.

NOTE: Each correct

selection is worth one point.', '[]', '[]', 'A single-column table groups identical values: 51 distinct values yield 51 rows. Sum without grouping yields one total row. If unique means once-occurring values, the initial row count is not determined. Do not summarize does not force display of all 75 source records.', 'Final 2', '252', '/dump-assets/f2-252-460-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-256-461', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have a dataset that contains revenue data from the past year.

You need to use anomaly detection in Power Bl to show anomalies in the dataset.

What should you configure? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.', '[]', '[]', 'Power BI anomaly detection requires a line chart with time-series data on a continuous date/time axis.', 'Final 2', '256', '/dump-assets/f2-256-461-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-260-462', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the

stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.

After you answer a question in this scenario, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.

You have several reports and dashboards in a workspace.

You need to grant all organizational users read access to a dashboard and several reports. Solution: You publish an app to the entire organization.

Does this meet the goal?', '["Yes","No"]', '[0]', 'Independent correction: Yes. Publishing a Power BI app to the entire organization is a supported way to distribute the included reports and dashboards as read-only content.', 'Final 2', '260', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-264-463', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the

stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.

You have a Microsoft Excel workbook that is saved to Microsoft SharePoint Online. The workbook contains several Power View sheets.

You need to recreate the Power View sheets as reports in the Power Bl service. Solution: From the Power Bl service, get the data from SharePoint Online, and

then click

Connect

Does this meet the goal?', '["Yes","No"]', '[1]', 'We need to click "Import", not "Connect".
References:
https://docs.microsoft.com/en-us/power-bi/service-excel-workbook-files', 'Final 2', '264', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-266-464', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You create a Power Bl dataset that contains the table shown in the following exhibit.

You need to make the table available as an organizational data type In Microsoft Excel.

How should you configure the properties of the table? To answer select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Name is the human-readable row label, ID uniquely identifies each row for Excel, and the table must be marked as featured so users can discover it as an organizational data type.', 'Final 2', '266', '/dump-assets/f2-266-464-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-271-465', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a PBiX file that imports several tables from an Azure SQL database. The data will be migrated to another Azure SQL database.

You need to change the connections in the PBIX file. The solution must minimize administrative effort.

What should you do?', '["From Power Query Editor, modify the source of each query.","Create a PBiT file, open the file, and change the data sources when prompted","From Power Query Editor, create new queries.","Modify the Data source settings."]', '[3]', 'Use Data source settings in Power BI Desktop to edit the Azure SQL connection used by the PBIX. It updates the connection centrally instead of editing every query separately.', 'Final 2', '271', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-275-466', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the

stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen,

You create a parameter named DataSourceExcel that holds the file name and location of a Microsoft Excel data source.

You need to update the query to reference the parameter instead of multiple hard-coded copies of the location within each query definition.

Solution: In the Power Query M code, you replace references to the Excel file with DataSourceExcel.

Does this meet the goal?', '["Yes","No"]', '[0]', 'Instead modify the source step of the queries to use DataSourceExcel as the file path.
Note: Parameterising a Data Source could be used in many different use cases. From connecting to different data sources defined in Query Parameters to load
different combinations of columns.
Reference:
https://www.biinsight.com/power-bi-desktop-query-parameters-part-1/', 'Final 2', '275', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-277-467', 'Manage and secure Power BI', 'single', '- (Topic 4)

From Power 61 Desktop, you publish a new dataset and report lo a Power Bl workspace. The dataset has a row-level security (RLS) role named HR. You need to

ensure that the HR team members have RLS applied when they view reports based on the dataset. What should you do?', '["From Power Bl Desktop, change the Row-Level Security settings.","From Power Bl Desktop, import a table that contains the HR team members","From powerbi.com.add users to the HR role for the dataset.","From powerbi.com, share the dataset to the HR team members."]', '[2]', 'After publishing, open the semantic model security settings in powerbi.com and add the HR users or group to the HR role. Role definitions are created in Desktop; membership is assigned in the service.', 'Final 2', '277', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-281-468', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You have a folder that contains 100 CSV files.

You need to make the file metadata available as a single dataset by using Power Bi The

solution must NOT store the data of the CSV files.

Which three actions should you perform in sequence. To answer, mow the appropriate actions from the list of actions to the answer area and arrange them m the

correct order.

NOTE; More than one order of answer choices is correct. You will receive credit for any of the correct orders you select.', '[]', '[]', 'The Folder connector returns file metadata and binary Content. Removing Content prevents file contents from being stored, while expanding Attributes exposes the required metadata fields.', 'Final 2', '281', '/dump-assets/f2-281-468-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-284-469', 'Manage and secure Power BI', 'single', '- (Topic 4)

You are creating a Power BI report to analyze consumer purchasing patterns from a table named Transactions. The Transactions table contains a numeric field

named Spend. You need to include a visual that identifies which fields have the greatest impact on Spend. Which type of visual should you use?', '["decomposition tree","Q&A","smart narrative","key influences"]', '[3]', 'Use the Key influencers visual. It analyzes candidate explanatory fields and ranks those that most strongly increase or decrease the numeric Spend outcome.', 'Final 2', '284', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-286-470', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a Power BI report. The report contains visualizations that have interactions. You need to identify which visualizations take the longest to complete. What

should you use?', '["SQL Server Profiler","Performance Analyzer in Power BI Desktop","Query Diagnostics in Power BI","Microsoft Edge DevTools"]', '[1]', 'Use Power BI Desktop Performance Analyzer to optimize reports.
In Power BI Desktop you can find out how each of your report elements, such as visuals and DAX formulas, are performing. Using the Performance Analyzer, you
can see and record logs that measure how each of your report elements performs when users interact with them, and which aspects of their performance are most
(or least) resource intensive.
Reference:
https://docs.microsoft.com/en-us/power-bi/create-reports/desktop-performance-analyzer', 'Final 2', '286', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-287-471', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have a Power Bl report named Orders that supports the following analysis:

• Total sales over time

• The count of orders over time

• New and repeat customer counts

The data model size is nearing the limit for a dataset in shared capacity. The model view for the dataset is shown in the following exhibit.', '[]', '[]', 'Summarizing orders by their identifying columns would not preserve the required measures, and CustomerID is needed for new/repeat customer analysis. UnitPrice and Discount are not needed for the listed analyses when the required sales value is already available, so removing them reduces size.', 'Final 2', '287', '/dump-assets/f2-287-471-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-291-472', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a data model that contains many complex DAX expressions. The expressions contain frequent references to the RELATED and RELATEDTABLE

functions.

You need to recommend a solution to minimize the use of the RELATED and RELATEDTABLE functions.

What should you recommend?', '["Merge tables by using Power Query.","Hide unused columns in the model.","Split the model into multiple models.","Transpose."]', '[0]', 'Combining data means connecting to two or more data sources, shaping them as needed, then consolidating them into a useful query.
When you have one or more columns that you’d like to add to another query, you merge the queries.
Note: The RELATEDTABLE function is a shortcut for CALCULATETABLE function with no logical expression.
CALCULATETABLE evaluates a table expression in a modified filter context and returns A
table of values.
Reference:
https://docs.microsoft.com/en-us/power-bi/connect-data/desktop-shape-and-combine-data', 'Final 2', '291', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-296-473', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a Power Bl report hosted on powerbi.com that displays expenses by department for department managers.

The report contains a line chart that shows expenses by month.

You need to enable users to choose between viewing the report as a line chart or a column chart. The solution must minimize development and maintenance

effort.

What should you do?', '["Add a column chart, a bookmark, and a button for users to choose a visual.","Create a mobile report that contains a column chart.","Create a separate report page for users to view the column chart.","Enable report readers to personalize visuals."]', '[3]', 'Independent correction: D. Enable personalization so readers can switch the visual type themselves. This meets the choice requirement with the least development and maintenance.', 'Final 2', '296', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-300-474', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the

stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.

From Power Query Editor, you profile the data shown in the following exhibit.

The IoT GUID and IoT ID columns are unique to each row in query.

You need to analyze IoT events by the hour and day of the year. The solution must improve dataset performance.

Solution: You remove the loT GUID column and retain the loT ID column. Does this meet the goal?', '["Yes","No"]', '[0]', 'Yes. Keeping one unique integer identifier and removing the unused GUID reduces cardinality and model size while preserving a row key. The date/time column can then support hour and day-of-year analysis.', 'Final 2', '300', '/exhibit-assets/f2-300-474.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-303-475', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

The data model must support the following analysis:

? Total sales by product by month in which the order was placed

? Quantities sold by product by day on which the order was placed

? Number Of sales transactions by quarter in Which the order was placed

For each Of the following statements, select Yes if the statement is true. Otherwise, select NO.', '[]', '[]', 'LastUpdated is not required by any listed analysis and can be removed. ProductID is required for sales and quantity by product. ShipDate is not used because every requirement is based on OrderDate.', 'Final 2', '303', '/dump-assets/f2-303-475-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-307-476', 'Manage and secure Power BI', 'single', '- (Topic 4)

You manage a Power BI model has a table named Sales and product.

You need to ensure that a sales team can view only data that has a CountryRegionName value of United States and a ProductCategory value of Clothing.

What should you do from Power BI Desktop?', '["From Power BI Desktop, create a new role that has the following filter.[countryRegionName]= “United States” && [ProductCategory]= “Clothing”","Add the following filters in Query Editor.CountryRegionName is United StatesProductCategory is Clothing","From Power BI Desktop, create a new role that has the following filters.[CountryRegionName]= “United States”","Add the following filters to a report.CountryRegionName is United SatesProductCategory is Clothing"]', '[0]', 'Independent correction: A. Create a row-level security role that enforces CountryRegionName = United States and ProductCategory = Clothing. Query or report filters are not a security boundary.', 'Final 2', '307', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-310-477', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a Power BI report that contains one page. The page contains two line charts and one bar chart.

You need to ensure that users can perform the following tasks for all three visuals:

? Switch the measures used in the visuals.

? Change the visualization type.

? Add a legend.

The solution must minimize development effort. What should you do?', '["Enable personalization for each Visual.","Create a bookmark for each acceptable combination of visualization type, measure, and legend in the bar chart","Edit the interactions between the three visuals.","Enable personalization for the report"]', '[3]', 'Independent correction: D. Enable visual personalization for the report. It provides the requested reader controls with one report-level setting.', 'Final 2', '310', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-315-478', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a dashboard that contains tiles pinned from a single report as shown in the Original Dashboard exhibit. (Click the Original Dashboard tab.)

You need to modify the dashboard to appear as shown in the Modified Dashboard exhibit. (Click the Modified Dashboard tab.)

What should you do?', '["Edit the details of each tile.","Change the report theme.","Change the dashboard theme.","Create a custom CSS file."]', '[2]', 'https://docs.microsoft.com/en-us/power-bi/create-reports/service-dashboard-themes#how-dashboard-themes-work', 'Final 2', '315', '/exhibit-assets/f2-315-478.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-318-479', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You have a Power B1 data model that contains two tables named Products and Sales. A one-to-many relationship exists between the tables.

You have a report that contains a report-level filter for Products.

You need to create a measure that will return the percent of total sales for each product. The measure must respect the report-level filter when calculating the total.

How should you complete the DAX measure? To answer drag the appropriate DAX functions to the correct targets- Each function may be used once, more than

once, or not at all the spirt bar between panes or scroll to view content

NOTE: Each correct selection is worth one point', '[]', '[2,1]', 'CALCULATE changes filter context for the percentage measure. ALLSELECTED removes the current product row filter while retaining external report and slicer filters, producing percent of the selected total.', 'Final 2', '318', '/dump-assets/f2-318-479-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-323-480', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You have a Power Bl report that contains three pages. The pages are used to analyze sales across various countries.

You add a sheer named Country to each page of the report.

You need to configure the report to meet the following requirements:

• When a user selects a country on the first page, the report must filter the other pages.

• The second and third pages must display only the filtered results.

Which task should you perform for each requirement? To answer, drag the appropriate task to the correct requirement. Each task may be used once, more than

once, or not at all. You may need to drag the split bar between panes or scroll to view content.Ther

NOTE Each correct selection is worth one point.', '[]', '[1,3]', 'Syncing applies the same selected country to every page. Hiding the synchronized slicer on pages two and three preserves the filter without repeating the control.', 'Final 2', '323', '/dump-assets/f2-323-480-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-327-481', 'Manage and secure Power BI', 'multi', '- (Topic 4)

You have a prospective customer list that contains 1,500 rows of data. The list contains the following fields:

? First name

? Last name

? Email address

? State/Region

? Phone number

You import the list into Power Query Editor.

You need to ensure that the list contains records for each State/Region to which you want to target a marketing campaign.

Which two actions should you perform? Each correct answer presents part of the solution. NOTE: Each correct selection is worth one point.', '["Open the Advanced Editor.","Select Column quality.","Enable Column profiling based on entire dataset.","Select Column distribution.","Select Column profile."]', '[2,4]', 'In Power query, the load preview by default is 1000 row. By default, the column quality also only looks at the first 1000 row. You can verify this by the status bar at
the bottom of the Power query window. To change the profiling so it analyses the entire column of data, select the profiling status in the status bar. Then select
Column profiling based on the entire data set.
https://theexcelclub.com/data-profiling-views-in-power-query-excel-and-power-bi/', 'Final 2', '327', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-331-482', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You plan to use Power BI to create a quarterly profit report that meets the following requirements:

• Emphasizes the percentage of total profits contributed by each product category in dollars and as a percentage

• Compares profit margins across sales regions

Which type of visual should you use for each requirement? To answer, drag the appropriate visuals to the correct requirements. Each visual may be used once,

more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'A pie chart shows each product category as a share of total profit; its labels can display both the amount and percentage of total. Of the available choices, a stacked bar chart compares profit margins across regions. The second requirement is a comparison between regions, not a time-series requirement.', 'Final 2', '331', '/dump-assets/f2-331-482-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-336-483', 'Manage and secure Power BI', 'manual', 'FILL IN THE BLANK - (Topic 4)

You are creating a line chart in a Power Bl report as shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'The source provides a line chart but not the statements or answer area. Previously reused menu crops have been disabled; no answer is inferred.', 'Final 2', '336', '/dump-assets/f2-336-483-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-337-484', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have a report page that contains the visuals shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct

selection is worth one point.', '[]', '[]', 'Reviewed answer: selecting a quarter on the line chart cross-highlights the clustered column chart. Selecting a point on the line chart cross-filters the map. Power BI retains and dims unrelated columns during cross-highlighting, but line charts, scatter charts, and maps are cross-filter targets only.', 'Final 2', '337', '/dump-assets/f2-337-484-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-342-485', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have sales data in a star schema that contains four tables named Sales, Customer, Date, and Product.

The Sales table contains purchase and ship dates.

Most often, you will use the purchase date to analyze the data, but you will analyze the data by both dates independently and together.

You need to design an imported dataset to support the analysis. The solution must minimize the model size and the number of queries against the data source.

Which data modeling design should you use?', '["Use the Auto Date/Time functionality in Microsoft Power BI and do NOT import the Datetable.","Duplicate the Date query in Power Query and use active relationships between both Date tables.","On the Date table, use a reference query in Power Query and create active relationships between Sales and both Date tables in the modeling view.","Create an active relationship between Sales and Date for the purchase date and an inactive relationship for the ship date."]', '[3]', 'Only one relationship can be active.
Note: If you query two or more tables at the same time, when the data is loaded, Power BI Desktop attempts to find and create relationships for you. The
relationship options Cardinality, Cross filter direction, and Make this relationship active are automatically set.
Reference:
https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage- relationships', 'Final 2', '342', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-346-487', 'Manage and secure Power BI', 'single', '- (Topic 4)

You open a query in Power Query Editor.

You need to identify the percentage of empty values in each column as quickly as possible. Which Data Preview option should you select?', '["Show whitespace","Column profile","Column distribution","Column quality"]', '[3]', 'Column quality: In this section, we can easily see valid, Error and Empty percentage of data values associated with the Selected table.
Note: In Power Query Editor, Under View tab in Data Preview Section we can see the following data profiling functionalities:
? Column quality
? Column distribution

? Column profile
Reference:
https://community.powerbi.com/t5/Community-Blog/Data-Profiling-in-Power-BI-Power-BI-Update-April-2019/ba-p/674555', 'Final 2', '346', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-349-488', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have a report in Power BI Desktop as shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.

Note: Each correct selection is worth one point.', '[]', '[]', 'The Target value field well in the exhibit is empty, so the gauge goal was entered in the visual formatting settings. A visual-level filter keeps this gauge on Canada regardless of other report content.', 'Final 2', '349', '/dump-assets/f2-349-488-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-353-489', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have the data lineage shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Following the lineage arrows identifies CONTOSO BIKES as the report in the requested path. The lineage view shows three separate datasets feeding the downstream content.', 'Final 2', '353', '/dump-assets/f2-353-489-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-355-490', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a Power B1 report that contains the visuals shown in the following table.

You need to modify the location of each visual. What should you modify for each visual?', '["the layer order","the padding","the position","the tab order"]', '[2]', 'Modify Position to change the X and Y coordinates of each visual on the report canvas. Layer order controls overlap, padding controls internal spacing, and tab order controls keyboard navigation.', 'Final 2', '355', '/exhibit-assets/f2-355-490.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-358-491', 'Manage and secure Power BI', 'single', '- (Topic 4)

You create a dataset sourced from dozens of flat files in Azure Blob storage. The dataset uses incremental refresh.

From powerbi.com, you deploy the dataset and several related reports to Microsoft Power BI Premium

capacity.

You discover that the dataset refresh fails after the refresh runs out of resources. What is a possible cause of the issue?', '["Query folding is not occurring.","You selected Only refresh complete periods.","The data type of the column used to partition the data changed.","A filter is missing on the report."]', '[0]', 'The Power BI service partitions data based on date range. This is what enables only
certain partitions to be refreshed incrementally. To make this work, the partition filter conditions are pushed down to the source system by including them in the
queries. Using Power Query terminology, this is called “query folding”. It is not recommended that incremental refresh is used when the required query folding
cannot take place.
Reference:
https://powerbi.microsoft.com/en-us/blog/incremental-refresh-query-folding/', 'Final 2', '358', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-360-492', 'Manage and secure Power BI', 'single', '- (Topic 4)

Remove unused columns from tables in the data model. This will reduce the size of your PBIX file and make your data model more efficient. You can use Power

Query Editor to remove any columns that are not used in your report or calculations.

You need to shape the query to display the following three columns:

* Month

* Sales

* Year

‘What should you select in Power Query Editor?', '["Pivot column","Merge columns","Unpivot columns.","Transpose"]', '[2]', 'This will convert your column headers (Jan-20, Feb-20,…) into row values under a new column called Attribute. You can then rename this column as Month and
change its data type to Date. You will also have a new column called Value that contains the sales amounts for each month. You can rename this column as Sales
and change its data type to Decimal Number.', 'Final 2', '360', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-365-493', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the date and time each complaint occurred. The

data in Logged is in the following format: 2018-12-31 at 08:59.

You need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.

What should you do?', '["Apply a transformation to extract the last 11 characters of the Logged column and set the data type of the new column to Date.","Change the data type of the Logged column to Date.","Split the Logged column by using at as the delimiter.","Apply a transformation to extract the first 11 characters of the Logged column."]', '[2]', 'Simply create a custom table in Power Query, enter the date shown in the question into a column called Date, and then Split it by a delimiter. No need for spaces
on either side of "at" Power BI takes care of the rest:
= Table.SplitColumn(#"Changed Type", "Date", Splitter.SplitTextByDelimiter("at", QuoteStyle.Csv), {"Date.1", "Date.2"})
It will even automatically change the type to Date:
= Table.TransformColumnTypes(#"Split Column by Delimiter",{{"Date.1", type date},
{"Date.2", type time}})', 'Final 2', '365', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-366-494', 'Manage and secure Power BI', 'single', '- (Topic 4)

Each employee has one manager as shown in the ParentEmployeelD column, All reporting paths lead to the CEO at the top of the organizational hierarchy.

You need to create a calculated column that returns the count of levels from each employee to the CEO.

Which DAX expression should you use?', '["PATH(Employees[EmployeeID], Employees[ParentEmployeeID])","PATHLENGTH(PATH(Employees[EmployeeID], Employees[ParentEmployeeID]))","PATHITEM(PATH(Employees[EmployeeID], Employees[ParentEmployeeID]), 1)","PATHCONTAINS(PATH(Employees[EmployeeID], Employees[ParentEmployeeID]), Employees[EmployeeID])"]', '[1]', 'Reviewed answer: PATHLENGTH(PATH(Employees[EmployeeID], Employees[ParentEmployeeID])). PATH returns the hierarchy path for each employee; PATHLENGTH counts the employee and every ancestor through the CEO.', 'Final 2', '366', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-368-495', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You have a Power Bl workspace that contains a single-page report named Sales.

You need to add all the visuals from Sales to a dashboard. The solution must ensure that additional visuals added to the page are added automatically to the

dashboard.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the

correct order.', '[]', '[]', 'Pinning the entire report page creates a live page tile. Unlike pinning the visuals one by one, later report changes remain synchronized with the dashboard tile.', 'Final 2', '368', '/dump-assets/f2-368-495-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-370-496', 'Manage and secure Power BI', 'single', '- (Topic 4)

In the Power BI service, you create an app workplace that contains several dashboards.

You need to provide a user named user1@contoso.com with the ability to edit and publish dashboards.

What should you do?', '["Modify the members of the app workspace.","Configure security for the dataset used by the app.","Share the dashboard, and then modify the Access settings of the dashboard.","From the app workspace, click Update app, and then configure the Access settings."]', '[0]', 'Independent correction: A. Modify workspace membership and assign an appropriate editing role. Dashboard sharing and app access do not grant authoring or publishing rights.', 'Final 2', '370', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-375-497', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a collection of reports for the HR department of your company. The datasets use row-level security (RLS). The company has multiple sales regions that

each has an HR manager. You need to ensure that the HR managers can interact with the data from their region only. The HR managers must be prevented from

changing the layout of the reports. How should you provision access to the reports for the HR managers?', '["Create a new workspace, copy the datasets and reports, and add the HR managers as members of the workspace.","Publish the reports to a different workspace other than the one hosting the datasets.","Publish the reports in an app and grant the HR managers access permission.","Add the HR managers as members of the existing workspace that hosts the reports and the datasets."]', '[2]', 'Note: Row-level security (RLS) with Power BI can be used to restrict data access for given users. Filters restrict data access at the row level, and you can define
filters within roles. In the Power BI service, members of a workspace have access to datasets in the workspace. RLS doesn''t restrict this data access.
Reference:
https://docs.microsoft.com/en-us/power-bi/admin/service-admin-rls', 'Final 2', '375', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-378-498', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You are building a financial report by using Power BI.

You have a table named financials that contains a column named Date and a column named Sales.

You need to create a measure that calculates the relative change in sales as compared to the previous quarter.

How should you complete the measure? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'CALCULATE evaluates sales under the prior-quarter date context produced by DATEADD. DIVIDE safely calculates the relative change and handles a zero denominator.', 'Final 2', '378', '/dump-assets/f2-378-498-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-381-499', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have the dataset shown in the following exhibit.

You need to ensure that the visual shows only the 10 cities that have the highest sales profit.

What should you do?', '["Add a Top N filter to the visual.","Configure the Sales Profit measure to use the RANKX function.","Add a calculated column to the table that uses the TOPN functio","In the visual, replace Sales Profit with the calculated column.","Add a calculated column to the table that returns the city name if the city is in the top 10, otherwise thecalculated column will return \"Not in Top 10\". In the visual, replace Sales Profit with the calculated column."]', '[0]', 'Power BI Top N Filters are useful to display the top performing records, and Bottom N filters are helpful to display the least performing records. For example, we
can display top or bottom 10 products by orders or sales.
Note:
? Select the Column you want to display the Top Sales Profit
? Then change the Filter Type of that Column to Top N
? Fill in Top / Bottom number field
? And lastly drag to the By Value filed your Sales Profit
Reference:
https://www.tutorialgateway.org/power-bi-top-10-filters/', 'Final 2', '381', '/exhibit-assets/f2-381-499.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-385-500', 'Manage and secure Power BI', 'single', '- (Topic 4)

Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the

stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.

After you answer a question in this scenario, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.

You have a clustered bar chart that contains a measure named Salary as the value and a field named Employee as the axis. Salary is present in the data as

numerical amount representing US dollars.

You need to create a reference line to show which employees are above the median salary.

Solution: You create a percentile line by using the Salary measure and set the percentile to 50%.

Does this meet the goal?', '["Yes","No"]', '[0]', 'The 50th percentile is also known as the median or middle value where 50 percent of observations fall below.
Reference:
https://dash-intel.com/powerbi/statistical_functions_percentile.php', 'Final 2', '385', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-389-501', 'Manage and secure Power BI', 'manual', 'HOTSPOT - (Topic 4)

You have an API that returns more than 100 columns. The following is a sample of column names.

? client_notified_timestamp

? client_notified_source

? client_notified_sourceid

? client_notified_value

? client_responded_timestamp

? client_responded_source

? client_responded_sourceid

? client_responded_value

You plan to include only a subset of the returned columns.

You need to remove any columns that have a suffix of sourceid.

How should you complete the Power Query M code? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', '[]', '[]', 'Table.RemoveColumns removes a dynamically generated list of unwanted columns. List.Select filters Table.ColumnNames(rawData), and Text.EndsWith keeps the names whose suffix is sourceid.', 'Final 2', '389', '/dump-assets/f2-389-501-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-391-502', 'Manage and secure Power BI', 'single', '- (Topic 4)

You create the following step by using Power Query Editor.

=

Table.ReplaceValue(SalesLT_Address,"1318","1319",Replacer.ReplaceText,{"AddressLine 1"})

A row has a value of 21318 Lasalle Street in the AddressLine1 column. What will the value be when the step is applied?', '["1318","1319","21318 Lasalle Street","21319 Lasalle Street"]', '[3]', 'Example:
Replace the text "ur" with the text "or" in the table.

Reference:
https://docs.microsoft.com/en-us/powerquery-m/table-replacevalue', 'Final 2', '391', '/exhibit-assets/f2-391-502.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-392-503', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a Power BI app named App1. The privacy for the App1 workspace is set to Private.

A user named User1 reports that App1 does not appear in the My organization AppSource. App1 appears in the My organization AppSource for your account.

You need to ensure that User sees App1 from the My organization AppSource. What should you do?', '["From the app workspace, click Update app, configure the Content settings, and then click Update app.","From the app workspace settings, add a member.","From the app workspace, click Update app, configure the Access setting, and then click Update app.","From the app workspace, share the dashboard."]', '[2]', 'References: https://docs.microsoft.com/en-us/power-bi/service-organizational-content-pack-introduction#what-is-appsource', 'Final 2', '392', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-396-504', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You have a Power Bl table named Customer that contains a field named Email Address. You discover that multiple records contain the same email address.

You need to create a calculated column to identify which records have duplicate email addresses.

How should you complete the OAX expression for the calculated column? To answer, drag the appropriate values to the correct targets. Each value may be used

once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content

NOTE: Each correct selection is worth one point.', '[]', '[]', 'CALCULATE evaluates COUNTROWS(Customer) after ALL removes the current row filter from the Email Address column. The explicit equality filter then reapplies the current email and counts its duplicates.', 'Final 2', '396', '/dump-assets/f2-396-504-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-398-505', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a Power Bl workspace named Workspace1 that contains a dataset named DS1 and a report named RPT1.

A user wants to create a report by using the data In DS1 and publish the report to another workspace.

You need to provide the user with the appropriate access. The solution must minimize the number of access permissions granted to the user.

What should you do?', '["Share RPT1 with the user.","Add the user as a Viewer of Workspace1.","Add the user as a member of Workspace1.","Grant the Build permission for DS1 to the user."]', '[3]', 'Microsoft says: To copy a report to another workspace, and to create a report in another workspace based on a dataset in the current workspace, you need Build
permission for the dataset. For datasets in the original workspace, if you have at least the Contributor role, you automatically have Build permission through your
workspace role. https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-roles-new-workspaces', 'Final 2', '398', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-403-506', 'Manage and secure Power BI', 'manual', 'DRAG DROP - (Topic 4)

You have the Power BI data model shown in the following exhibit.

You create two row-level security (RLS) roles named Manager and CFO. Each manager must see only Sales and Human Resources data for their own country. The CFO must see Sales for all countries but must not see any Human Resources rows. Complete the two RLS filters for Human Resources and Country.', '[]', '[3,1]', 'The CFO role uses FALSE() on Human Resources to deny every row while leaving country sales available. The Manager role filters Country to the signed-in manager, and the relationships propagate that country filter.', 'Final 2', '403', '/dump-assets/f2-403-506-question.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-407-507', 'Manage and secure Power BI', 'single', '- (Topic 4)

You are building a Power Bl report that uses data from an Azure SQL database named erp1.

You Import the following tables.

You need to perform the following analyses:

• Orders sold over time that include a measure of the total order value

• Orders by attributes of products sold

The solution must minimize update times when interacting with visuals in the report. What should you do first?', '["From Power Query, merge the Orders query and the Order Line Hems query.","Calculate the count of orders per product by using a DAX function.","Create a calculated column that adds a list of product categories to the Orders table by using a DAX function.","From Power Query, merge the Order Line Items query and the Products query."]', '[0]', 'Independent correction: A. Merge Orders into Order Line Items to produce the line-level sales fact with order attributes and values. Keep Products as a dimension for product-attribute slicing.', 'Final 2', '407', '/exhibit-assets/f2-407-507.webp', NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
INSERT OR REPLACE INTO question_bank (id, domain, type, prompt, choices_json, correct_json, explanation, source, source_number, image, answer_image, context, rows_json, created_at) VALUES ('f2-410-508', 'Manage and secure Power BI', 'single', '- (Topic 4)

You have a Microsoft SharePoint Online site that contains several document libraries.

One of the document libraries contains manufactunng reports saved as Microsoft Excel files. All the manufacturing reports have the same data structure.

You need to use Power Bl Desktop to load only the manufacturing reports to a table for analysis.

What should you do?', '["Get data from a SharePoint folder, enter the site URL, select Transform Data, filter Folder Path to the manufacturing library, and then combine the files.","Get data from a SharePoint list and enter the site URL; then combine and transform the list.","Get data from a SharePoint list, enter the site URL, and then select Combine & Load.","Get data from a SharePoint folder, enter the site URL, and immediately select Combine & Load without filtering."]', '[0]', 'Independent correction: use SharePoint Folder with the site URL, choose Transform Data, filter Folder Path to the manufacturing document library, and only then combine the identically structured Excel files. Immediate Combine & Load can include files from other libraries.', 'Final 2', '410', NULL, NULL, NULL, NULL, '2026-10-11T00:00:00.000Z');
