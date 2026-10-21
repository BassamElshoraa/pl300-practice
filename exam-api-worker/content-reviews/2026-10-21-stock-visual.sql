-- Review-only visual questions: no automatic answer keys or student scores change.
-- Original source answer assets remain preserved in the repository.
UPDATE question_bank
SET explanation = 'A single-column non-aggregated table visual groups identical values. If unique means 51 distinct values, it shows 51 rows rather than 75 source records. Sum without any other grouping produces one total row, so the row count decreases. If unique instead means values occurring only once in Power Query profiling, the full distinct count is not specified. This source wording needs that qualification.',
    answer_image = NULL
WHERE id IN ('f1-078-77', 'f2-252-460') AND type = 'manual' AND correct_json = '[]';
SELECT id, correct_json, answer_image FROM question_bank
WHERE id IN ('f1-070-69', 'f1-078-77', 'f2-252-460');
