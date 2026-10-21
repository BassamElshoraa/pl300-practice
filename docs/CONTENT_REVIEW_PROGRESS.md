# Detailed Arabic explanation review

Updated: 2026-10-21.

This records the scope of this content pass, not a claim that the whole answer bank has been revalidated.

- Active bank: 494 questions.
- Individually authored explanations: 84 (banks 1–79, 442, 455, 460, 469, 481).
- Still requiring this depth of explanation: 410.
- Each authored lesson includes scenario translation, an intuitive explanation, a worked example, reasoning, alternatives, and feature-documentation references.
- Conditional source assumptions are explicitly identified in 23 lessons. Feature documentation is not represented as an official Microsoft answer key for these questions.
- Banks 61 and 64 now have text dropdowns; total text-dropdown questions: 36. Bank 61 is explicitly marked outdated: Microsoft documents removal of the featured-table functionality from Desktop in June 2026. Historical answer settings are retained for interpreting the source.
- Bank 70 now uses Yes for the normal interpretation of a supported SQL filter folded before the final Import load. The explanation explicitly distinguishes non-folding/post-retrieval filtering, for which No applies; it does not claim all M filters fold. A guarded, question-only D1 update is stored in `exam-api-worker/content-reviews/2026-10-21-query-folding.sql`. No historical student attempt scores are recalculated by that update.
- Banks 74 and 75 now have source-transcribed dropdowns; total text-dropdown questions: 38. Bank 73's missing distractor was appended without changing existing answer indices: 278 text drag choices across 53 questions.
- Bank 78 and duplicate bank 447 (stable ID f2-252-460; verified against the active bank's display order) no longer claim that a single-column table always displays all 75 source records. The intended result is 51 if unique means distinct; if it denotes once-occurring values, the source is underdetermined. Both explanations flag that ambiguity.
- Banks 74, 75 and 79 now have typed source tables; bank 79 also has the complete, balanced DAX expression with its written Yes/No statements.
- Remote D1 verification: bank 70 has correct_json [0]; banks 78 and 447 remain manual with empty automatic keys and their outdated source answer images are no longer served. Only the three question-bank rows were updated. SQL seed was regenerated locally to prevent future seeding from restoring old content. Existing student attempts and stored scores were not updated.
- Banks 42, 45, 47, 54 were transcribed in an earlier batch. Banks 42 and 45 also have typed source tables, without duplicating the full image.
- Banks 42 and 59 have scalable, horizontally scrollable relationship diagrams in the checked-answer explanation only. These are teaching diagrams, not original question exhibits.
- The source explanations for banks 41, 44, 45, 46, 48 and 51 were clarified: Transform vs Add Column, upstream type errors, avoiding unnecessary timestamp detail, PBIDS authentication, DirectQuery display-refresh limits, and ten phone digits versus twelve formatted characters.
- All 53 drag interactions now have reviewed text choices (278 choices). OCR drafts were checked against original source images, not imported automatically.
- Four damaged drag menus were reconstructed: banks 442, 455, 469, 481. These use a new answer namespace so old responses cannot silently select different new options. They remain manually reviewed questions, not newly auto-graded items.
- Bank 442's illustrated output shows only School1; the available three-step unpivot/rename/group solution also produces other schools. The explanation flags the missing-filter ambiguity rather than claiming the exact two-row output is reproduced.
- Bank 469 compares profit margins across regions, not profit across time; both English and Arabic answer notes were corrected.
- The new explanations are bundled locally and do not depend on a successful AI connection.
- Authenticated live AI response: **not yet verified**. Automated routing/fallback checks are not a substitute for this test. Existing signed-in Edge is not accessible through the available automation tools; no browser credentials were copied or debug settings changed.

Verification: `qa:all`, `qa:lessons`, TypeScript, static production build, and Edge presentation tests. Local browser checks include the four repaired menus, invalidation notice, static Arabic lesson, option rationales, references, mobile overflow, and zero page errors. These are behavior/consistency tests, not proof of every answer's correctness.
