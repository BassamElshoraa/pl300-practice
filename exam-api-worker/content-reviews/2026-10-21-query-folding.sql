-- Only question-bank content changes. No attempts, scores, users or exams are modified.
-- The previous source key was [1] (No). The revised interpretation assumes a
-- supported SQL row filter is added in Power Query before the final Import load.
UPDATE question_bank
SET correct_json = '[0]',
    explanation = 'Reviewed answer: Yes under the normal interpretation of a foldable SQL Server row filter added before final Import load. Query folding can push that filter to SQL. No is appropriate if all rows have already been retrieved or the filter cannot fold; the source does not specify those conditions. The original claim that Source must first transfer every row is not generally true. Verify the emitted query. This is a conditional interpretation, not a guarantee for every M filter.'
WHERE id = 'f1-070-69' AND correct_json = '[1]';
SELECT id, correct_json FROM question_bank WHERE id = 'f1-070-69';
