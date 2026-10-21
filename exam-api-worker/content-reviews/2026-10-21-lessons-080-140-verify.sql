SELECT COUNT(*) AS matching_reviewed_rows FROM question_bank WHERE (id='f1-080-79' AND prompt='You have the tables shown in the following table.

The Impressions table contains approximately 30 million records per month.

You need to create an ad analytics system to meet the following requirements:

✑ Present ad impression counts for the day, campaign, and site_name. The analytics for the last year are required.

Minimize the data model size.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct selection is worth one point.' AND explanation='Use suitable one-to-many dimension relationships and group Impressions by Ad_id, Site_name and daily Impression_date with Count Rows before loading. Sum the stored count for impression totals; COUNTROWS of the summary counts groups instead of original events. Relationships are not storage-free, and a calculated table does not automatically remove the original fact.' AND answer_image IS NULL AND correct_json='[0,1]') OR (id='f1-083-82' AND prompt='HOTSPOT -

You are enhancing a Power BI model that has DAX calculations.

You need to create a measure that returns the year-to-date total sales from the same date of the previous

calendar year.

Which DAX functions should you use? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:' AND explanation='The blanks are CALCULATE, SUM and DATESBETWEEN. DATESBETWEEN takes three arguments: dates, start date and end date. The source endpoint LASTDATE(Sales[Date])-365 is not a universally correct prior-year calendar endpoint: leap years and missing sales on selected dates can change the intended range. The blank selections fit the shown template; validate its boundaries before treating it as a general PYTD formula.' AND answer_image IS '/dump-assets/f1-083-82-answer.webp' AND correct_json='[]') OR (id='f1-089-88' AND prompt='HOTSPOT -

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

Hot Area:' AND explanation='No; No; Yes under the displayed grain and materialized SalesTotal assumption. Grouping by CustomerID, OrderID and OrderDate does not guarantee fewer rows when OrderID already identifies each shown record. Grouping does not inherently increase detail or always prevent sales totals. Keep CustomerID for the relationship and repeat-customer analysis. Remove UnitPrice and Discount only if stored SalesTotal suffices and does not depend on those columns remaining in the model.' AND answer_image IS '/dump-assets/f1-089-88-answer.webp' AND correct_json='[]') OR (id='f1-090-89' AND prompt='HOTSPOT -

You are building a financial report by using Power BI.

You have a table named financials that contains a column named Date and a column named Sales.

You need to create a measure that calculates the relative change in sales as compared to the previous quarter.

How should you complete the measure? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

Hot Area:' AND explanation='CALCULATE; DATEADD; DIVIDE. DATEADD with -1 QUARTER shifts a quarter, not one month. Relative growth is (current minus previous)/previous. DIVIDE handles a zero or blank denominator safely; partial-period selections follow the selected date context rather than guaranteeing full-quarter totals.' AND answer_image IS '/dump-assets/f1-090-89-answer.webp' AND correct_json='[]') OR (id='f1-091-90' AND prompt='DRAG DROP -

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

Select and Place:' AND explanation='TOPN; DESC. TOPN selects the highest eight by Total Sales, but ties at the eighth position can return more than eight rows. Add a unique secondary sort key if exactly eight are required. TOPN does not guarantee the final display order of returned rows.' AND answer_image IS '/dump-assets/f1-091-90-answer.webp' AND correct_json='[5,1]') OR (id='f1-096-95' AND prompt='Note: This question is part of a series of questions that present the same scenario. Each question in the series

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

Does this meet the goal?' AND explanation='No for the proposed solution restricted to the active relationship: that alone does not cover all three date roles. The original reason is wrong: USERELATIONSHIP can use an existing active or inactive relationship. To analyze other date roles, target the corresponding existing relationships in suitable calculations, or use separate role-playing dimensions with active relationships. USERELATIONSHIP does not create a missing relationship.' AND answer_image IS NULL AND correct_json='[1]') OR (id='f1-098-97' AND prompt='DRAG DROP -

You are modifying a Power BI model by using Power BI Desktop.

You have a table named Sales that contains the following fields.

You have a table named Transaction Size that contains the following data.

You need to create a calculated column to classify each transaction as small, medium, or large based on the value

in Sales Amount.

How should you complete the code? To answer, drag the appropriate values to the correct targets. Each value may

be used once, more than once, or not at all.

You may need to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.

Select and Place:' AND explanation='FILTER; AND; CALCULATE. Select Transaction Size rows where Min <= the row sales amount AND Max >= it, then evaluate the distinct category within that filter. The source field list calls the amount Sales Amount but its printed code refers to Sales[Sales]; fix that inconsistent column name before running it. The inclusive integer ranges must not overlap, and the amount must match one category; decimals between the shown integer bounds can be uncovered.' AND answer_image IS '/dump-assets/f1-098-97-answer.webp' AND correct_json='[3,1,2]') OR (id='f1-099-98' AND prompt='You have a Power BI report for the procurement department. The report contains data from the following tables.

There is a one-to-many relationship from Suppliers to LineItems that uses the ID and Supplier ID columns.

The report contains the visuals shown in the following table.

You need to minimize the size of the dataset without affecting the visuals.

What should you do?' AND explanation='Remove LineItems[Description], which is not required by the displayed visuals. Do not remove historical records because two visuals have no last-month restriction. Grouping can reduce row count, contrary to the old explanation, but the offered grouping by Invoice ID and Invoice Date does not preserve Supplier ID, required for supplier and country analysis. Do not claim grouping never affects size.' AND answer_image IS NULL AND correct_json='[1]') OR (id='f1-100-99' AND prompt='You have a Power BI report for the marketing department. The report reports on web traffic to a blog and contains

data from the following tables.

There is a one-to-many relationship from Posts to Traffic that uses the URL and URL Visited columns.

The report contains the visuals shown in the following table.

The dataset takes a long time to refresh.

You need to modify Posts and Traffic queries to reduce load times.

Which two actions will reduce the load times? Each correct answer presents part of the solution.

NOTE:

Each correct selection is worth one point.' AND explanation='Keep Traffic rows whose URL Visited contains blog, and remove Posts[Full Text] and Posts[Summary]. Preserve Referring URL for the external-referral visual. Removing Posts published in the last seven days discards recent posts, not old history, and breaks the requested analysis. Removing referring URLs that do not start with / would remove the external referrals the report explicitly needs.' AND answer_image IS NULL AND correct_json='[1,3]') OR (id='f1-103-102' AND prompt='You use Power BI Desktop to load data from a Microsoft SQL Server database.

While waiting for the data to load, you receive the following error.

You need to resolve the error.

What are two ways to achieve the goal? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.Recovered original error message: ERROR [08001] timeout expired.' AND explanation='The recovered source PDF page 127 shows ERROR [08001] timeout expired, not an out-of-memory error. The intended answers are A and B. Reducing rows/columns can reduce query and transfer time; splitting long queries and merging is conditional on an effective execution plan and a safe unique join key. Neither is guaranteed to fix a connection timeout before query execution. Diagnose connectivity versus query execution, timeout settings and folding before implementing a fix. Disabling folding or blindly combining all slow queries is not a general remedy.' AND answer_image IS NULL AND correct_json='[0,1]') OR (id='f1-105-104' AND prompt='Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

From Power Query Editor, you profile the data shown in the following exhibit.

The IoT GUID and IoT ID columns are unique to each row in the query.

You need to analyze IoT events by the hour and day of the year. The solution must improve dataset performance.

Solution: You remove the IoT GUID column and retain the IoT ID column.

Does this meet the goal?' AND explanation='Yes. Remove the redundant high-cardinality text GUID while retaining the equally unique numeric IoT ID and the timestamp needed for hourly and daily analysis. The source claim that Power BI Whole Number is always a four-byte unsigned long is incorrect: its logical type is a 64-bit integer and storage is compressed. Verify relationships and dependencies before deleting an identifier in a real model.' AND answer_image IS NULL AND correct_json='[0]') OR (id='f1-109-108' AND prompt='You have a Power BI data model that analyzes product sales over time. The data model contains the following

tables.

A one-to-many relationship exists between the tables.

The auto date/time option for the data model is enabled.

You need to reduce the size of the data model while maintaining the ability to analyze product sales by month and

quarter.

Which two actions should you perform? Each correct answer presents part of the solution.

NOTE: Each correct answer is worth one point.' AND explanation='The intended source selections are A and C: create/mark an explicit Date table and relate it to Sales. Do not infer that marking one date table removes every hidden auto date/time table for other eligible columns. Order Date becomes the many side of a relationship, while unconnected Ship Date and Delivered Date can remain eligible when Auto date/time stays on. For guaranteed removal of all automatic tables, disable Auto date/time after building and wiring a replacement and migrating dependent visuals. The choose-two source is not a complete migration checklist.' AND answer_image IS NULL AND correct_json='[0,2]') OR (id='f1-116-115' AND prompt='You have a CSV file that contains user complaints. The file contains a column named Logged. Logged contains the

date and time each complaint occurred. The data in Logged is in the following format: 2018-12-31 at 08:59.

You need to be able to analyze the complaints by the logged date and use a built-in date hierarchy.

What should you do?' AND explanation='Split Logged using at, then verify the date part is trimmed and typed as Date. Splitting alone can leave text and does not by itself guarantee a built-in date hierarchy; Auto date/time and table eligibility also apply. The other offered actions do not explicitly normalize the stated nonstandard text format while preserving its full date.' AND answer_image IS NULL AND correct_json='[1]') OR (id='f1-128-127' AND prompt='HOTSPOT

-

You have a Power BI model that contains the following data.

The Date table relates to the Sales table by using the Date columns.

You need to create a calculated table that will contain the following:

•A row for each year

•A column that contains the total sales per year

How should you complete the DAX calculation? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.' AND explanation='SUMMARIZE; Date[Year]. The source fields use Sales[Sale], so the completed expression is SUMMARIZE(Sales, Date[Year], "Sales", SUM(Sales[Sale])). Do not replace Sale with an invented SalesAmount column. This is a refresh-time calculated summary table, not a dynamic measure that recomputes its stored rows on every slicer change.' AND answer_image IS '/dump-assets/f1-128-127-answer.webp' AND correct_json='[]') OR (id='f1-132-131' AND prompt='HOTSPOT

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

How should you complete the measure? To answer, select the appropriate options in the answer area.' AND explanation='Use CALCULATE(COUNTROWS(''Headcount''), LASTDATE(''Headcount''[DateKey])). The question specifies monthly snapshots keyed to the first day of each month. LASTDATE(''Date''[Date]) can pick month-end or a future calendar date with no snapshot, producing blank instead of the last available headcount. LASTDATE on the fact''s date-valued DateKey selects the latest snapshot date visible in the current period. COUNTROWS then counts one row per employee in that snapshot. This returns the latest snapshot within the selected period, not a carry-forward from an earlier period with no snapshot.' AND answer_image IS NULL AND correct_json='[]') OR (id='f1-134-133' AND prompt='You have a Power BI model that contains the following data.

The Date table relates to the Sales table by using the Date columns.

The model contains the following DAX measure.

Total Sales = SUM(Sales[Sale])

You need to create another measure named Previous Quarter to display the sales one quarter before the selected

period.

Which DAX calculation should you use?' AND explanation='Use CALCULATE([Total Sales], DATEADD(Date[Date], -1, QUARTER)). Negative one shifts the current period one quarter backward. The offered PARALLELPERIOD uses positive 1, which shifts forward, not backward; with date-column input it also expands to full quarters. DATESQTD and TOTALQTD calculate quarter-to-date, not the previous quarter.' AND answer_image IS NULL AND correct_json='[0]') OR (id='f1-137-136' AND prompt='You have a Power BI data model that contains two tables named Sales and Date. The Sales table contains three

measures named Order Quantity, Product Cost, and Sales Amount.

You need to create the visual shown in the following exhibit.

In which section of the Fields well should you place the measures?' AND explanation='Place the measures in Values. A matrix can show measure labels on rows through the Show on rows formatting setting; a field parameter is not required merely to obtain that layout. Rows and Columns hold grouping fields, while Values evaluates measures in each intersection context.' AND answer_image IS NULL AND correct_json='[2]') OR (id='f1-142-141' AND prompt='You have a Power BI semantic model that contains four queries named Query 1, Query2. Query3, and Query4.

Query1 loads customer data into the model and is referenced by the other three queries.

You discover that data refresh for the model is slow.

You need to improve the data refresh time. The solution must minimize costs.

What should you do?' AND explanation='Corrected answer: C, reconfigure Query1 as a dataflow entity. Microsoft documents this same Query1/Query2/Query3/Query4 scenario: Table.Buffer only buffers within one query execution and does not eliminate additional retrieval by independently evaluated referencing queries. Buffering can add memory work and prevent downstream folding. A dataflow persists source preparation for reuse. Choose an option supported by the existing license; Gen2 and legacy dataflows have different licensing requirements. Do not claim every dataflow is free or every buffer improves performance.' AND answer_image IS NULL AND correct_json='[2]');
