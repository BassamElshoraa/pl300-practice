# Detailed Arabic explanation review

Updated: 2026-10-21.

This records the scope of this content pass, not a claim that the whole answer bank has been revalidated.

- Active bank: 494 questions.
- Individually authored explanations: 73 (banks 1–69, 442, 455, 469, 481).
- Still requiring this depth of explanation: 421.
- Each authored lesson includes scenario translation, an intuitive explanation, a worked example, reasoning, alternatives, and feature-documentation references.
- Conditional source assumptions are explicitly identified in 19 lessons. Feature documentation is not represented as an official Microsoft answer key for these questions.
- Banks 61 and 64 now have text dropdowns; total text-dropdown questions: 36. Bank 61 is explicitly marked outdated: Microsoft documents removal of the featured-table functionality from Desktop in June 2026. Historical answer settings are retained for interpreting the source.
- Bank 70 is not included in this explanation batch: the original blanket claim that a later Power Query filter must first import the entire SQL table conflicts with query folding. Its wording and grading need a separate ambiguity review before treating either answer as unconditional.
- Text dropdown questions: 34. Banks 42, 45, 47, 54 were transcribed from their original answer areas in this batch. Banks 42 and 45 also have typed source tables, without duplicating the full image.
- Banks 42 and 59 have scalable, horizontally scrollable relationship diagrams in the checked-answer explanation only. These are teaching diagrams, not original question exhibits.
- The source explanations for banks 41, 44, 45, 46, 48 and 51 were clarified: Transform vs Add Column, upstream type errors, avoiding unnecessary timestamp detail, PBIDS authentication, DirectQuery display-refresh limits, and ten phone digits versus twelve formatted characters.
- All 53 drag interactions now have reviewed text choices (277 choices). OCR drafts were checked against original source images, not imported automatically.
- Four damaged drag menus were reconstructed: banks 442, 455, 469, 481. These use a new answer namespace so old responses cannot silently select different new options. They remain manually reviewed questions, not newly auto-graded items.
- Bank 442's illustrated output shows only School1; the available three-step unpivot/rename/group solution also produces other schools. The explanation flags the missing-filter ambiguity rather than claiming the exact two-row output is reproduced.
- Bank 469 compares profit margins across regions, not profit across time; both English and Arabic answer notes were corrected.
- The new explanations are bundled locally and do not depend on a successful AI connection.
- Authenticated live AI response: **not yet verified**. Automated routing/fallback checks are not a substitute for this test. Existing signed-in Edge is not accessible through the available automation tools; no browser credentials were copied or debug settings changed.

Verification: `qa:all`, `qa:lessons`, TypeScript, static production build, and Edge presentation tests. Local browser checks include the four repaired menus, invalidation notice, static Arabic lesson, option rationales, references, mobile overflow, and zero page errors. These are behavior/consistency tests, not proof of every answer's correctness.
