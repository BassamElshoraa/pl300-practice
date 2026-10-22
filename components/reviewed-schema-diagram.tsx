/** Teaching aid shown only inside the checked-answer explanation, not the question. */
export function ReviewedSchemaDiagram({ id }: { id: string }) {
  if (id === 'f1-162-161' || id === 'f1-163-162')
    return <MonthlyAndOrderSchema id={id} />;
  if (id === 'f1-143-142') return <OrganizationSchema id={id} />;
  if (id === 'f1-081-80') return <CategorySchema id={id} />;
  if (id === 'f1-117-116') return <ProductSalesSchema id={id} />;
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

function MonthlyAndOrderSchema({ id }: { id: string }) {
  const monthly = id === 'f1-162-161';
  return (
    <figure className="rounded-lg border bg-card p-4" data-reviewed-schema={id}>
      <figcaption className="mb-3 text-sm leading-7">
        {monthly
          ? 'التصميم المقترح بعد التجميع: صف لكل حساب وشهر. اربط أول الشهر فيFact بتاريخDate الفريد، لا بعمودMonthStartDate المتكرر لكل أيام الشهر في التقويم.'
          : 'التصميم المصحح: المنتجات والأيام مفاتيح فريدة في الأبعاد، وتتكرر فيOrderHistory. منOrderHistory إلىDate تُقرأ العلاقةMany-to-one، وليسOne-to-one.'}
      </figcaption>
      <div className="overflow-x-auto" dir="ltr">
        <svg
          viewBox="0 0 820 345"
          className="min-w-[760px] w-full text-foreground"
          aria-label={
            monthly
              ? 'Account and Date dimensions link one-to-many to monthly Transactions'
              : 'Products and Date dimensions link one-to-many to OrderHistory'
          }
        >
          <SchemaBox
            x={10}
            y={20}
            name={monthly ? 'Account' : 'Products'}
            columns={
              monthly
                ? ['AccountID (unique)', 'AccountNumber; AccountName']
                : ['ProductID (unique)', 'ProductName']
            }
          />
          <SchemaBox
            x={10}
            y={185}
            name="Date"
            columns={[
              'Date (unique)',
              monthly ? 'Year; MonthYear' : 'Year; Month; Week',
            ]}
          />
          <SchemaBox
            x={530}
            y={60}
            name={monthly ? 'Transactions' : 'OrderHistory'}
            columns={
              monthly
                ? [
                    'Monthly summary',
                    'AccountID',
                    'MonthStartDate',
                    'SUM(TransAmt)',
                  ]
                : ['OrderID', 'ProductID', 'OrderDate']
            }
          />
          <path
            d="M230 95 H370 V125 H530 M230 230 H370 V180 H530"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <text x="245" y="85" fill="currentColor">
            1 →
          </text>
          <text x="505" y="115" fill="currentColor">
            *
          </text>
          <text x="245" y="220" fill="currentColor">
            1 →
          </text>
          <text x="505" y="170" fill="currentColor">
            *
          </text>
        </svg>
      </div>
    </figure>
  );
}

function OrganizationSchema({ id }: { id: string }) {
  const nodes = [
    { name: 'DimOrgVertical', columns: ['VerticalKey (unique)'] },
    {
      name: 'DimOrgSubVertical',
      columns: ['VerticalSubcategoryKey', 'VerticalKey'],
    },
    {
      name: 'DimOrganizations',
      columns: ['OrganizationID (unique)', 'VerticalSubcategoryKey'],
    },
    { name: 'FactSales', columns: ['SalesId; OrderDate', 'OrganizationId'] },
  ];
  return (
    <figure className="rounded-lg border bg-card p-4" data-reviewed-schema={id}>
      <figcaption className="mb-3 text-sm leading-7">
        شكل الـSnowflake: مستويات بُعد المؤسسة موزعة في سلسلة جداول. الجدول
        الوسيط يحمل مفتاح القطاع ومفتاح القطاع الفرعي معًا. العلاقات وحدها لا تنشئ
        hierarchy متعددة الجداول تلقائيًا.
      </figcaption>
      <div className="overflow-x-auto" dir="ltr">
        <svg
          viewBox="0 0 1120 200"
          className="min-w-[1040px] w-full text-foreground"
          aria-label="DimOrgVertical to DimOrgSubVertical to DimOrganizations to FactSales one-to-many chain"
        >
          {nodes.map((node, i) => (
            <g key={node.name}>
              <SchemaBox
                x={10 + i * 290}
                y={20}
                name={node.name}
                columns={node.columns}
              />
              {i < nodes.length - 1 && (
                <>
                  <path
                    d={`M${230 + i * 290} 95 H${300 + i * 290}`}
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <text x={239 + i * 290} y={84} fill="currentColor">
                    1 → *
                  </text>
                </>
              )}
            </g>
          ))}
        </svg>
      </div>
    </figure>
  );
}

function SchemaBox({
  x,
  y,
  name,
  columns,
}: {
  x: number;
  y: number;
  name: string;
  columns: string[];
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="220"
        height={64 + columns.length * 25}
        rx="8"
        fill="var(--muted)"
        stroke="currentColor"
      />
      <text
        x={x + 14}
        y={y + 29}
        fontSize="20"
        fontWeight="700"
        fill="currentColor"
      >
        {name}
      </text>
      {columns.map((column, index) => (
        <text
          key={column}
          x={x + 14}
          y={y + 59 + index * 25}
          fontSize="15"
          fill="currentColor"
        >
          {column}
        </text>
      ))}
    </g>
  );
}
function CategorySchema({ id }: { id: string }) {
  return (
    <figure className="rounded-lg border bg-card p-4" data-reviewed-schema={id}>
      <figcaption className="mb-3 text-sm leading-7">
        فلتر الفئة ينتقل إلى منتجاتها ثم مبيعاتها. هذه سلسلة أبعاد متفرعة
        (snowflake)، وليست علاقة Many-to-many. الرسم للتوضيح داخل الشرح.
      </figcaption>
      <div className="overflow-x-auto" dir="ltr">
        <svg
          viewBox="0 0 820 220"
          className="min-w-[760px] w-full text-foreground"
          aria-label="ProductCategory one-to-many Products one-to-many Sales with single filter direction"
        >
          <SchemaBox
            x={10}
            y={20}
            name="ProductCategory"
            columns={['ProductCategoryID (unique)', 'CategoryName']}
          />
          <SchemaBox
            x={300}
            y={20}
            name="Products"
            columns={['ProductID (unique)', 'ProductCategoryID', 'ProductName']}
          />
          <SchemaBox
            x={590}
            y={20}
            name="Sales"
            columns={['SalesID', 'ProductID', 'DateKey; SalesAmount']}
          />
          <path
            d="M230 95 H300 M520 95 H590"
            stroke="currentColor"
            strokeWidth="2"
          />
          <text x="239" y="84" fill="currentColor">
            1 → *
          </text>
          <text x="529" y="84" fill="currentColor">
            1 → *
          </text>
        </svg>
      </div>
    </figure>
  );
}
function ProductSalesSchema({ id }: { id: string }) {
  return (
    <figure className="rounded-lg border bg-card p-4" data-reviewed-schema={id}>
      <figcaption className="mb-3 text-sm leading-7">
        Date وProduct بُعدان يفلتران Sales. عد الفئات المبيعة يحتاج ربط حساب
        الفئات بصفوف مبيعات الفترة، وليس افتراض أن فلتر Sales يعود إلى Product
        تلقائيًا.
      </figcaption>
      <div className="overflow-x-auto" dir="ltr">
        <svg
          viewBox="0 0 820 320"
          className="min-w-[760px] w-full text-foreground"
          aria-label="Product and Date dimensions filter Sales one-to-many"
        >
          <SchemaBox
            x={10}
            y={20}
            name="Product"
            columns={['ProductID (unique)', 'ProductCategory', 'ProductName']}
          />
          <SchemaBox
            x={10}
            y={185}
            name="Date"
            columns={['Date (unique)', 'Month; Quarter; Year']}
          />
          <SchemaBox
            x={530}
            y={60}
            name="Sales"
            columns={[
              'InvoiceNumber',
              'ProductID',
              'SaleDate',
              'SalesAmount; SalesQuantity',
            ]}
          />
          <path
            d="M230 95 H370 V125 H530 M230 230 H370 V180 H530"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <text x="245" y="85" fill="currentColor">
            1 →
          </text>
          <text x="505" y="115" fill="currentColor">
            *
          </text>
          <text x="245" y="220" fill="currentColor">
            1 →
          </text>
          <text x="505" y="170" fill="currentColor">
            *
          </text>
        </svg>
      </div>
    </figure>
  );
}
