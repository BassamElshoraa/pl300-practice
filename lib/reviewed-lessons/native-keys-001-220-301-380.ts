/**
 * Native dropdown keys verified against the individually authored lesson and
 * each actual row's own choices. Values use the existing 10000+option-index
 * namespace; they MUST NOT be interpreted as old image-click coordinates.
 *
 * These keys grade menu selection only. They do not remove conditional lesson
 * notices, invent unavailable source facts, or regrade historical attempts.
 */
export const reviewedNativeKeys: Record<string, number[]> = {
  'f1-001-0': [10001, 10001, 10000, 10002],
  'f1-005-4': [10001, 10002],
  'f1-012-11': [10002, 10000],
  'f1-013-12': [10001, 10001],
  'f1-020-19': [10002, 10001],
  'f1-021-20': [10000, 10000],
  'f1-024-23': [10001, 10002],
  'f1-031-30': [10000, 10002],
  'f1-033-32': [10002, 10001],
  'f1-035-34': [10002, 10002],
  'f1-042-41': [10003, 10002],
  'f1-044-43': [10000, 10000],
  'f1-045-44': [10002, 10002],
  'f1-047-46': [10001, 10003],
  'f1-063-62': [10001, 10000],
  'f1-064-63': [10000, 10002, 10001],
  'f1-074-73': [10002, 10001],
  'f1-075-74': [10002, 10001],
  'f1-081-80': [10000, 10000],
  'f1-090-89': [10000, 10002, 10003],
  'f1-097-96': [10000, 10000],
  'f1-101-100': [10003, 10000, 10001],
  'f1-111-110': [10000, 10000],
  'f1-117-116': [10000, 10000],
  'f1-125-124': [10002, 10001],
  'f1-128-127': [10002, 10001],
  'f1-130-129': [10001, 10000],
  'f1-132-131': [10001, 10002],
  'f1-133-132': [10002, 10000],
  'f1-138-137': [10001, 10003],
  'f1-143-142': [10003, 10001],
  'f1-147-146': [10001, 10000],
  'f1-153-152': [10001, 10000],
  'f1-159-158': [10000, 10003],
  'f1-163-162': [10001, 10003],
  'f1-165-164': [10000, 10001],
  'f1-172-171': [10000, 10003],
  'f1-177-176': [10002, 10001],
  'f1-178-177': [10001, 10000],
  'f1-181-180': [10001, 10001],
  'f1-182-181': [10000, 10000],
  'f1-183-182': [10001, 10002],
  'f1-189-188': [10001, 10003],
  'f1-191-190': [10002, 10001],
  'f1-197-196': [10000, 10002],
  'f1-202-201': [10002, 10000],
  'f1-209-208': [10000, 10002],
  'f1-212-211': [10000, 10002],
  'f1-219-218': [10001, 10001],
  'f1-322-321': [10001, 10002],
  'f1-340-339': [10002, 10002],
  'f1-344-343': [10002, 10000],
  'f1-346-345': [10002, 10000, 10003],
  'f1-356-355': [10002, 10000, 10003],
  'f1-359-358': [10003, 10003],
  'f1-361-360': [10000, 10001],
  'f1-363-362': [10001, 10000, 10003],
  'f1-367-366': [10002, 10001],
  'f2-020-384': [10000, 10002],
};

/** Deliberately not auto-graded: source requirements do not yield one safe key. */
export const omittedNativeKeys: Record<string, string> = {
  'f1-051-50':
    'The source requests 10 digits but the offered last-12-characters operation retains two hyphens. It is the intended local-number fragment, not a literal ten-digit result.',
  'f1-054-53':
    'A username/password alone does not establish that the unspecified API supports Basic authentication; no API auth contract is supplied.',
  'f1-061-60':
    'Organizational featured-table functionality is historical/deprecated; do not score a current product-capability answer as if the old workflow remains available.',
  'f1-078-77':
    'Unique can mean occurrence-once rather than distinct. The first row count is underdetermined without resolving that source wording.',
  'f1-083-82':
    'The supplied previous-year YTD template subtracts365days. Menu choices alone do not repair the incorrect same-calendar-date boundary around leap years.',
  'f1-144-143':
    'IF and IF.EAGER can both return the offered classifications; the measure template also uses an unaggregated column without guaranteed scalar context.',
  'f1-146-145':
    'HASONEVALUE is not equivalent to a directly filtered item, and the template Quantity expression lacks an unambiguous measure definition. Keep the clarified lesson rather than asserting one universally valid complete formula.',
  'f1-148-147':
    'Deleting the competing relationship alone does not enable and configure the second security path. The completion depends on additional active/security propagation settings.',
  'f1-166-165':
    'MIN(Sales) through MAX(Forecast) is not guaranteed to cover both tables. The source supplies no ordering condition between their date ranges.',
  'f1-171-170':
    'The displayed unmatched BLANK row depends on the visual fields/order and Show items with no data; the general visual statement is not guaranteed by the relationship settings alone.',
  'f1-179-178':
    'All rows having the same numeric/date format does not prove every decimal fraction is zero or every time is midnight. Whole-number/date losslessness requires full-value verification, not formatting alone.',
  'f1-317-316':
    'Corp has Read+Reshare+Build. Granting Read is also a possible sharing capability, so the offered grant-Build statement is not the only true capability.',
  'f1-326-325':
    'Same nonexclusive Corp capability choices as317: both Read and Build may be granted in a supported sharing workflow.',
  'f1-333-332':
    'PPU is the intended internal-Service license choice, but Embedded capacity can also support sufficient refresh frequency; the question does not exclude that interpretation.',
  'f1-366-365':
    'App consumption access with scopedBuild and Viewer consumption access with scopedBuild can both satisfy the stated requirements; workspace membership is not explicitly mandated.',
};
