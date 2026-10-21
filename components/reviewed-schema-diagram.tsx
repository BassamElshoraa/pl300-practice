/** Teaching aid shown only inside the checked-answer explanation, not the question. */
export function ReviewedSchemaDiagram({ id }: { id: string }) {
  if (id !== 'f1-042-41' && id !== 'f1-059-58') return null;
  const medical = id === 'f1-042-41';
  const dimensions = medical
    ? [
        ['Date', 'Date'],
        ['Patient', 'Patient key'],
        ['Test', 'Test key'],
      ]
    : [['Customer', 'CustomerID']];
  const center = medical
    ? [
        'Test Result',
        'Date administered',
        'Patient key',
        'Test key',
        'Result value, comments',
      ]
    : ['Transaction', 'TransactionID', 'CustomerID', 'Date, Amount'];
  return (
    <figure className="rounded-lg border bg-card p-4" data-reviewed-schema={id}>
      <figcaption className="mb-3 text-sm leading-7">
        رسم توضيحي للعلاقات في الشرح: طرف 1 فيه المفتاح الفريد، وطرف * فيه أكثر
        من حدث لنفس المفتاح. اسحب الرسم أفقيًا على الموبايل لو احتجت.
      </figcaption>
      <div className="overflow-x-auto" dir="ltr">
        <svg
          viewBox="0 0 760 340"
          className="min-w-[640px] w-full text-foreground"
          aria-label={
            medical
              ? 'Date, Patient and Test dimensions link one-to-many to Test Result'
              : 'Customer links one-to-many to Transaction using CustomerID'
          }
        >
          {dimensions.map(([name, key], i) => {
            const y = medical ? 18 + i * 106 : 115;
            return (
              <g key={name}>
                <rect
                  x="12"
                  y={y}
                  width="240"
                  height="84"
                  rx="8"
                  fill="var(--muted)"
                  stroke="currentColor"
                />
                <text
                  x="28"
                  y={y + 30}
                  fill="currentColor"
                  fontSize="19"
                  fontWeight="700"
                >
                  {name}
                </text>
                <text x="28" y={y + 59} fill="currentColor" fontSize="16">
                  {key} (unique)
                </text>
                <path
                  d={`M 252 ${y + 42} H 340 V ${medical ? 125 + i * 48 : 160} H 420`}
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <text x="263" y={y + 33} fill="currentColor" fontSize="17">
                  1
                </text>
                <text
                  x="398"
                  y={medical ? 119 + i * 48 : 154}
                  fill="currentColor"
                  fontSize="22"
                >
                  *
                </text>
              </g>
            );
          })}
          <rect
            x="420"
            y="86"
            width="326"
            height="224"
            rx="8"
            fill="var(--accent)"
            stroke="currentColor"
          />
          {center.map((line, i) => (
            <text
              key={line}
              x="440"
              y={122 + i * 34}
              fill="currentColor"
              fontSize={i ? 17 : 21}
              fontWeight={i ? 400 : 700}
            >
              {line}
            </text>
          ))}
        </svg>
      </div>
    </figure>
  );
}
