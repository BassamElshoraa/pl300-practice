-- Generated explanation-only corrections. Grading keys and student history are unchanged.
UPDATE question_bank SET prompt='HOTSPOT

-

You have a Power BI semantic model that contains a table named Opportunity.

The Opportunity table contains a column named Qualification. The Qualification column contains values between 0

and 1.

You need to build a new measure to score the opportunities on a scale of low. medium, and high.

How should you complete the DAX formula? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', explanation='Independent review: use IF with HIGH and MEDIUM in the displayed blanks. IF.EAGER evaluates both branch expressions before choosing a result, but the scenario has no requirement that benefits from eager evaluation. Both functions can return the same labels, which makes the original item ambiguous; IF is the defensible conventional answer.', answer_image=NULL, correct_json='[]' WHERE id='f1-144-143' AND correct_json IN ('[]');
UPDATE question_bank SET prompt='HOTSPOT

-

You have a Power BI semantic model that contains a table named Item. The Item table contains a column named

Quantity.

You need to create a DAX query that meets the following requirements:

•The rank of items must be calculated according to the values in Quantity.

•Ranking must NOT be skipped if two or more items have the same value in Quantity.

•If an item is unfiltered, the total of Quantity must display a blank value.

How should you complete the DAX formula? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.', explanation='HASONEVALUE; DENSE. Dense ranks 100,100,90 as 1,1,2 instead of the Skip result 1,1,3. HASONEVALUE checks one distinct item in context, not the literal presence of a direct filter or whether a visual is at a row level; a total can also have one item. The shown [Quantity] needs to be a valid scalar measure or aggregation, even though the prompt only describes a Quantity column. Use an appropriate aggregate measure when applying the formula.', answer_image='/dump-assets/f1-146-145-answer.webp', correct_json='[]' WHERE id='f1-146-145' AND correct_json IN ('[]');
UPDATE question_bank SET prompt='HOTSPOT

-

You have a Power BI semantic model that contains two tables as shown in the following exhibit.

Use the drop-down menus to select the answer choice that completes each statement based on the information

presented in the graphic.

NOTE: Each correct selection is worth one point.', explanation='Single; delete the many-to-one relationship is the offered first step to remove the competing active path. Making that relationship inactive is another normal approach, but is not an option. Deletion alone does not finish the configuration: activate the intended relationship and configure/test cross-filtering and security-filter propagation. A bidirectional ordinary relationship setting must not be confused with the separate security filtering behavior.', answer_image='/dump-assets/f1-148-147-answer.webp', correct_json='[]' WHERE id='f1-148-147' AND correct_json IN ('[]');
UPDATE question_bank SET prompt='You publish a semantic model to the Power BI service. The semantic model contains data from the following data

sources:

•Source1: A Microsoft Excel file stored in Microsoft OneDrive for Business

•Source2: An Azure SQL database on a virtual network

•Source3: A public website

Which data sources require an on-premises data gateway?', explanation='Source2 only is the intended source classification: private Azure SQL connectivity needs an accessible private-network gateway path, unlike cloud OneDrive and a supported public website connection in the stated scenario. An on-premises gateway can run on a VM with network access to Azure SQL. A VNet data gateway is also a supported alternative under suitable conditions; do not claim the installed on-premises gateway is the only possible architecture. A locally synchronized OneDrive file path is different from the cloud connector.', answer_image=NULL, correct_json='[1]' WHERE id='f1-152-151' AND correct_json IN ('[1]');
UPDATE question_bank SET prompt='Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have an on-premises data gateway.

You need to reduce the amount of data sent through the gateway by semantic models that run in Import storage

mode.

Solution: You create aggregations to summarize results.

Does this meet the goal?', explanation='No for an additional model aggregation created after importing detail: the detail still crossed the gateway. If the question instead means source-side aggregation or a folded Power Query grouping loaded instead of detail, that can reduce transferred data. The source does not specify where summarization occurs, so keep this distinction explicit rather than teaching that aggregation can never reduce gateway traffic.', answer_image=NULL, correct_json='[1]' WHERE id='f1-155-154' AND correct_json IN ('[1]');
UPDATE question_bank SET prompt='Note: This question is part of a series of questions that present the same scenario. Each question in the series

contains a unique solution that might meet the stated goals. Some question sets might have more than one correct

solution, while others might not have a correct solution.

After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not

appear in the review screen.

You have an on-premises data gateway.

You need to reduce the amount of data sent through the gateway by semantic models that run in import storage

mode.

Solution: You configure incremental refresh.

Does this meet the goal?', explanation='Yes: incremental refresh can reduce transferred data by refreshing recent partitions rather than the entire historical import. It does not necessarily retrieve only individually changed rows: partitions within the refresh window may be fully reloaded, and detecting changes is an additional setting. RangeStart/RangeEnd restrictions must reach the source through folding or an equivalent supported filter for the intended network saving. The initial refresh can load the historical range, and changes outside the refresh window need a suitable policy.', answer_image=NULL, correct_json='[0]' WHERE id='f1-157-156' AND correct_json IN ('[0]');
UPDATE question_bank SET prompt='You have a Power BI semantic model named Model1 that runs in Import storage mode.

You need to reduce the size of Model1. The solution must NOT increase report query response times.

What should you do?', explanation='Remove unnecessary columns after checking reporting, calculation, relationship and security dependencies. Renaming does not remove stored values. Unpivot is not automatically a size reduction or increase; its result depends on shape, cardinality and compression. DirectQuery avoids a full local import but can add source/network latency, so it does not guarantee unchanged report response times.', answer_image=NULL, correct_json='[0]' WHERE id='f1-160-159' AND correct_json IN ('[0]');
