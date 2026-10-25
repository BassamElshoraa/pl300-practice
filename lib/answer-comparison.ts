/** Pure shared comparison for browser practice and server-side grading. */
function isAnswer(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => Number.isInteger(item) && item >= 0)
  );
}

export function acceptedAnswerVariants(value: unknown): number[][] {
  if (isAnswer(value)) return [value];
  if (Array.isArray(value) && value.length > 0 && value.every(isAnswer))
    return value;
  return [];
}

export function answerMatches(
  actual: unknown,
  expected: unknown,
  unordered = false,
): boolean {
  if (!isAnswer(actual)) return false;
  const left = unordered ? [...actual].sort((a, b) => a - b) : actual;
  return acceptedAnswerVariants(expected).some((variant) => {
    const right = unordered ? [...variant].sort((a, b) => a - b) : variant;
    return (
      left.length === right.length &&
      left.every((item, index) => item === right[index])
    );
  });
}
