import { Fragment, type ReactNode } from 'react';

/** Deliberately limited Markdown. Provider text never becomes raw HTML. */
function inline(text: string, depth = 0): ReactNode {
  if (depth > 6) return text;
  const pattern =
    /(`[^`\n]+`|\*\*[^\n]+?\*\*|__[^\n]+?__|\[[^\]\n]+\]\([^\s)]+\)|\*[^*\n]+\*)/g;
  const nodes: ReactNode[] = [];
  let start = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index! > start) nodes.push(text.slice(start, match.index));
    const token = match[0];
    if (token.startsWith('`')) {
      nodes.push(
        <code
          key={match.index}
          dir="ltr"
          className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em] [unicode-bidi:isolate]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith('**') || token.startsWith('__')) {
      nodes.push(
        <strong key={match.index} className="font-semibold">
          {inline(token.slice(2, -2), depth + 1)}
        </strong>,
      );
    } else if (token.startsWith('[')) {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)!;
      let safe = false;
      try {
        safe = ['http:', 'https:'].includes(new URL(link[2]).protocol);
      } catch {
        /* Keep unsafe/incomplete links as text. */
      }
      nodes.push(
        safe ? (
          <a
            key={match.index}
            href={link[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            {inline(link[1], depth + 1)}
          </a>
        ) : (
          <Fragment key={match.index}>{link[1]}</Fragment>
        ),
      );
    } else {
      nodes.push(
        <em key={match.index}>{inline(token.slice(1, -1), depth + 1)}</em>,
      );
    }
    start = match.index! + token.length;
  }
  if (start < text.length) nodes.push(text.slice(start));
  return nodes;
}

const heading = /^(#{1,6})\s+(.+)$/;
const bullet = /^\s*[-+*]\s+(.+)$/;
const ordered = /^\s*\d+[.)]\s+(.+)$/;
const rule = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/;
const tableRule = /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/;
const cells = (line: string) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());

export function TutorMessageContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n?/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let i = 0;
  const isBlock = (n: number) =>
    !lines[n]?.trim() ||
    /^\s*```/.test(lines[n]) ||
    heading.test(lines[n]) ||
    bullet.test(lines[n]) ||
    ordered.test(lines[n]) ||
    /^>\s?/.test(lines[n]) ||
    rule.test(lines[n]) ||
    (lines[n].includes('|') && tableRule.test(lines[n + 1] ?? ''));
  while (i < lines.length) {
    const key = i;
    if (!lines[i].trim()) {
      i++;
      continue;
    }
    const fence = /^\s*```([^`]*)$/.exec(lines[i]);
    if (fence) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !/^\s*```\s*$/.test(lines[i]))
        code.push(lines[i++]);
      if (i < lines.length) i++;
      blocks.push(
        <div
          key={key}
          dir="ltr"
          className="min-w-0 overflow-hidden rounded-lg border bg-muted/60 text-left"
          data-tutor-code
        >
          {fence[1].trim() && (
            <div className="border-b px-3 py-1 text-xs text-muted-foreground">
              {fence[1].trim()}
            </div>
          )}
          <pre className="max-w-full overflow-x-auto p-3 text-xs leading-6">
            <code>{code.join('\n')}</code>
          </pre>
        </div>,
      );
      continue;
    }
    const title = heading.exec(lines[i]);
    if (title) {
      blocks.push(
        <p
          key={key}
          role="heading"
          aria-level={Math.min(6, title[1].length + 1)}
          dir="auto"
          className="font-semibold leading-7"
        >
          {inline(title[2])}
        </p>,
      );
      i++;
      continue;
    }
    if (rule.test(lines[i])) {
      blocks.push(<hr key={key} className="border-border" />);
      i++;
      continue;
    }
    if (lines[i].includes('|') && tableRule.test(lines[i + 1] ?? '')) {
      const headers = cells(lines[i]);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].trim() && lines[i].includes('|'))
        rows.push(cells(lines[i++]));
      blocks.push(
        <div key={key} className="max-w-full overflow-x-auto rounded-lg border">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                {headers.map((cell, j) => (
                  <th
                    key={j}
                    dir="auto"
                    className="border-b bg-muted p-2 text-start font-semibold"
                  >
                    {inline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r}>
                  {headers.map((_, j) => (
                    <td
                      key={j}
                      dir="auto"
                      className="border-b p-2 align-top text-start last:border-b-0"
                    >
                      {inline(row[j] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (bullet.test(lines[i]) || ordered.test(lines[i])) {
      const numbered = ordered.test(lines[i]);
      const pattern = numbered ? ordered : bullet;
      const items: string[] = [];
      const start = numbered
        ? Number(/^\s*(\d+)/.exec(lines[i])![1])
        : undefined;
      while (i < lines.length) {
        const item = pattern.exec(lines[i]);
        if (!item) break;
        items.push(item[1]);
        i++;
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !isBlock(i))
          items[items.length - 1] += '\n' + lines[i++].trim();
      }
      const children = items.map((item, j) => (
        <li key={j} dir="auto" className="ps-1 whitespace-pre-line">
          {inline(item)}
        </li>
      ));
      blocks.push(
        numbered ? (
          <ol key={key} start={start} className="list-decimal space-y-1 ps-5">
            {children}
          </ol>
        ) : (
          <ul key={key} className="list-disc space-y-1 ps-5">
            {children}
          </ul>
        ),
      );
      continue;
    }
    if (/^>\s?/.test(lines[i])) {
      const quote: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i]))
        quote.push(lines[i++].replace(/^>\s?/, ''));
      blocks.push(
        <blockquote
          key={key}
          dir="auto"
          className="border-s-2 border-primary/40 ps-3 text-muted-foreground"
        >
          {inline(quote.join('\n'))}
        </blockquote>,
      );
      continue;
    }
    const paragraph = [lines[i++]];
    while (i < lines.length && !isBlock(i)) paragraph.push(lines[i++]);
    blocks.push(
      <p key={key} dir="auto" className="whitespace-pre-line">
        {inline(paragraph.join('\n'))}
      </p>,
    );
  }
  return (
    <div
      className="min-w-0 space-y-3 text-start [overflow-wrap:anywhere]"
      data-tutor-markdown
    >
      {blocks}
    </div>
  );
}
