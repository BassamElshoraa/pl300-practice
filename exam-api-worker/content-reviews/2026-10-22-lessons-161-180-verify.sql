SELECT COUNT(*) AS matching_reviewed_rows FROM question_bank WHERE (id='f1-144-143' AND prompt='HOTSPOT

-

You have a Power BI semantic model that contains a table named Opportunity.

The Opportunity table contains a column named Qualification. The Qualification column contains values between 0

and 1.

You need to build a new measure to score the opportunities on a scale of low. medium, and high.

How should you complete the DAX formula? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.' AND explanation='Use the conventional nested IF, then HIGH and MEDIUM. Values exactly 0.5 and 0.7 are MEDIUM with the shown strict comparisons. IF.EAGER can produce the same labels but forces eager branch evaluation, for which no need is stated; the item is not unique by output alone. The template also refers directly to Opportunity[Qualification] although it calls the result a measure: define the single-opportunity scalar context or use a calculated column rather than assuming an unaggregated column works in every measure context.' AND answer_image IS NULL AND correct_json='[]') OR (id='f1-164-163' AND prompt='You have a Power BI semantic model.

You need to create a column that will contain year-over-year (YOY) revenue. The column must contain a ratio

of change factor compared to the previous year''s monthly revenue.

How should you complete the DAX formula? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.Source limitation: the saved original omits the DAX formula. This version is adapted into matching named function roles below, not recovered original blank positions.' AND explanation='The original PDF omits the complete DAX template. This adapted matching version identifies the date-set role as SAMEPERIODLASTYEAR and the ratio role as DIVIDE. It does not recover the original numerator or blank order. Growth factor Current/Prior differs from growth rate (Current-Prior)/Prior; both may use DIVIDE. The source calls the result a column, but lacks enough context to validate a specific calculated-column implementation.' AND answer_image IS NULL AND correct_json='[3,5]') OR (id='f1-165-164' AND prompt='HOTSPOT

-

You use Microsoft Power BI Desktop to review the data shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.' AND explanation='Auto date/time; the MonthEndDate date hierarchy from the Data table. Marking the custom date table removes the relevant automatic hierarchy rather than deleting Data or MonthStartDate. The chosen key must meet date-table criteria; repeated month-end dates are not a unique daily key. Repair visuals or DAX based on a removed hierarchy. Do not generalize this to removal of every automatic calendar elsewhere in the model.' AND answer_image IS '/dump-assets/f1-165-164-answer.webp' AND correct_json='[]') OR (id='f1-166-165' AND prompt='HOTSPOT

-

You have a Power BI semantic model that contains two tables named Sales and Forecast. Both tables contain a

date column.

You need to create a calculated table that will cover the range of dates in both tables.

How should you complete the DAX expression? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.' AND explanation='CALENDAR; MINX; MAXX fit CALENDAR(MINX(Sales,[Date]), MAXX(Forecast,[Date])). It covers both tables only if Sales supplies the earliest date and Forecast the latest. For arbitrary ranges, take the minimum across both tables and the maximum across both, and handle empty tables. The source template does not establish correct bounds for every dataset.' AND answer_image IS '/dump-assets/f1-166-165-answer.webp' AND correct_json='[]') OR (id='f1-167-166' AND prompt='You have a Power BI semantic model named Model1 that contains two tables named DimDate and FactSales. There

is an active relationship between DimDate and FactSales. DimDate is marked as the date table. FactSales contains

the following data.

Model1 contains the following measure.

Previous Year Sales = CALCULATE([Sales Amount], PREVIOUSYEAR(''Date''[Date]))

You have a report that uses Model1. The report has a single report page that has a page level filter set to May 9,

2024. The result of the Previous Year Sales measure is displayed in a card visual.

Which value will appear in the card visual?' AND explanation='60 under the intended date-table context. Recovered original rows: May 9 2024:10; May 9 2023:15; May 1 2023:20; May 29 2023:25. PREVIOUSYEAR selects the entire prior year: 15+20+25=60, not the same-day 15. The source calls the date table DimDate but references Date; reconcile that name and use a date-dimension filter. The old explanation substituted different row dates and amounts and is not a transcription of the exhibit.' AND answer_image IS NULL AND correct_json='[3]') OR (id='f1-168-167' AND prompt='You have a Power BI query named Expenses that imports the following data.

Users only use the date portion of the TransactionDate value when performing data analysis.

You need to minimize the model size without affecting the analysis.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.' AND explanation='Intended selections: convert TransactionDate to Date and remove unused PostDate. Type conversion removes time precision; display formatting alone does not. PostDate is the ledger-posting timestamp, not equal to TransactionDate in the sample. Removing it assumes no required analysis or dependency uses posting time. The prompt does not fully establish TransactionID dependencies, so do not claim deleting that identifier is impossible or always wrong.' AND answer_image IS NULL AND correct_json='[0,2]') OR (id='f1-171-170' AND prompt='HOTSPOT

-

You have a Power BI report with the Edit relationship page open as shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.' AND explanation='Not be filtered; a BLANK for the unmatched value when that row is shown. The active relationship is Table1 (one) to Table2 (many), Single, so filtering Table2 does not propagate back by default. SM exists only in Table1; an included SM row has no corresponding Table2 code. Actual row visibility can depend on visual fields and Show items with no data. Missing text is not NaN or an automatic calculation error.' AND answer_image IS '/dump-assets/f1-171-170-answer.webp' AND correct_json='[]') OR (id='f1-176-175' AND prompt='DRAG DROP

-

You have a Power BI semantic model that contains two tables named Dim Location and Fact Deliveries. The

relationships between the tables are configured as shown in the following table.

The model contains one measure that has the following formula.

Deliveries = COUNTROWS(‘Fact Deliveries’)

You need to create a new measure that counts the number of deliveries based on the destination location.

How should you complete the DAX expression? To answer, drag the appropriate functions to the correct targets.

Each function may be used once, more than once, or not at all. You may need to drag the split bar between panes

or scroll to view content.

NOTE: Each correct selection is worth one point.' AND explanation='CALCULATE; USERELATIONSHIP, targeting Location ID and Destination Location ID instead of active Origin. The schema says Dim Location but the printed formula says Location; reconcile the actual table name. USERELATIONSHIP uses the existing destination relationship for this calculation; it does not create a relationship or permanently change other measures.' AND answer_image IS '/dump-assets/f1-176-175-answer.webp' AND correct_json='[1,2]') OR (id='f1-177-176' AND prompt='HOTSPOT

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

NOTE: Each correct selection is worth one point.' AND explanation='Reference Sales_Spreadsheet; disable its load to the model. Reference centralizes logic; disabling staging load avoids an extra model table. Neither guarantees one source evaluation or shared caching across queries. Deleting staging breaks references. Excluding report refresh is a different setting, not a substitute for disabling load or a guarantee dependent queries never evaluate source steps.' AND answer_image IS '/dump-assets/f1-177-176-answer.webp' AND correct_json='[]') OR (id='f1-179-178' AND prompt='HOTSPOT

-

You use Power Query Editor to ingest data into Power BI Desktop.

The total dataset contains 250,000 rows. All the rows match the format of the data as shown in the following

exhibit.

You need to optimize the data model size of the table.

Which type of data should you use for the Value column and the Datetime column? To answer, select the

appropriate options in the answer area.

NOTE: Each correct selection is worth one point.' AND explanation='Value: Whole number; Datetime: Date, assuming all fractional parts are zero and no non-midnight time is required. The .00 in 78000.00 is a zero fraction, not a time; 00:00:00.000 belongs to Datetime. A shared two-decimal format does not prove all 250,000 fractions are zero: inspect the full data before converting. Do not promise fixed byte savings independent of VertiPaq encoding and cardinality.' AND answer_image IS '/dump-assets/f1-179-178-answer.webp' AND correct_json='[]') OR (id='f1-180-179' AND prompt='You have a Power BI semantic model that contains a table named Table1. Table1 runs in Import storage mode.

You need to update the model to change the storage mode of Table1 to DirectQuery.

What should you do?' AND explanation='For the ordinary locally authored Import-table workflow, re-add Table1 using a supported DirectQuery source. Preserve a backup, relationships, measures and visual dependencies before deletion. Duplicating the query or adding an aggregation does not convert storage mode. Current documentation notes version-control exceptions in web modeling and Desktop live editing for reversing earlier mode changes; avoid a universal claim about every editing environment.' AND answer_image IS NULL AND correct_json='[0]');
