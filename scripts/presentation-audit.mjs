import fs from 'node:fs/promises';
import { questions, auditedQuestionBank } from '../lib/questions.ts';
import { visualControlData } from '../lib/visual-control-data.ts';
import { isYesNoQuestion } from '../lib/exam-utils.ts';
const output = process.argv[2] ?? '.openai/presentation-audit.json';
const report = {
  active: questions.length,
  inventory: auditedQuestionBank.length,
  questions: auditedQuestionBank.map(q=>({id:q.id,type:q.type,context:q.context,source:q.source,sourceNumber:q.sourceNumber,prompt:q.prompt,image:q.image,excluded:q.excluded??false})),
  dropdowns: Object.entries(visualControlData).map(([id, spec]) => {
    const q = questions.find((q) => q.id === id);
    return {
      ...spec,
      id,
      bankNumber: q ? questions.indexOf(q) + 1 : null,
      prompt: q?.prompt,
      explanation: q?.explanation,
    };
  }),
  yesNo: questions
    .filter(isYesNoQuestion)
    .map((q) => ({ ...q, bankNumber: questions.indexOf(q) + 1 })),
  textGaps: questions
    .filter(
      (q) => q.type === 'manual' && (!q.rows?.length || !q.choices.length),
    )
    .map((q) => ({
      id: q.id,
      bankNumber: questions.indexOf(q) + 1,
      image: q.image,
      prompt: q.prompt.slice(0, 280),
    })),
};
await fs.mkdir('.openai', { recursive: true });
await fs.writeFile(output, JSON.stringify(report, null, 2));
console.log(
  JSON.stringify({
    active: report.active,
    dropdowns: report.dropdowns.length,
    yesNo: report.yesNo.length,
    textGaps: report.textGaps.length,
    output,
  }),
);
