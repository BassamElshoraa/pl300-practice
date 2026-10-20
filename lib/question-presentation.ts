import type { Question } from './questions.ts';

export type TextAnswerRow = { label: string; options: string[] };
export type QuestionPresentation = {
  /** Reconstructed from source exhibits, never from answer-letter guesses. */
  tables?: { caption: string; columns: string[]; rows: string[][] }[];
  answerRows?: TextAnswerRow[];
  statements?: string[];
  hideSourceImage?: boolean;
  warning?: string;
};

export const questionPresentation: Record<string, QuestionPresentation> = {
  'f1-059-58': {
    hideSourceImage: true,
    tables: [
      {
        caption: 'Database tables',
        columns: ['Table', 'Column', 'Key'],
        rows: [
          ['Customer', 'CustomerID', 'Primary key'],
          ['Customer', 'Name', ''],
          ['Customer', 'State', ''],
          ['Customer', 'Email', ''],
          ['Transaction', 'TransactionID', 'Primary key'],
          ['Transaction', 'CustomerID', 'Foreign key to Customer.CustomerID'],
          ['Transaction', 'Date', ''],
          ['Transaction', 'Amount', ''],
        ],
      },
    ],
  },
  'f2-152-425': {
    hideSourceImage: true,
    warning:
      'The original source omits the required output/layout. The existing table and available settings are shown below, but they do not establish which transformation is required. This item cannot be answered reliably or auto-graded until the missing requirement is supplied.',
    tables: [
      {
        caption: 'Existing table visual (source exhibit)',
        columns: ['OrderDate', 'Total Sales', 'Total Cost'],
        rows: [
          ['01-Oct-22', '10.75', '8.06'],
          ['03-Oct-22', '98.50', '73.88'],
          ['07-Oct-22', '43.00', '32.25'],
          ['11-Oct-22', '25.99', '19.49'],
          ['12-Oct-22', '156.00', '117.00'],
          ['15-Oct-22', '40.80', '30.60'],
        ],
      },
    ],
  },
  'f2-202-444': {
    warning:
      'The saved dropdown crops belong to a different question. They have been disabled. The source profile shows 12 distinct and 11 unique values, but a readable original answer area is still required to transcribe every distractor exactly.',
  },
  'f2-336-483': {
    warning:
      'The source exhibit omits the answer area and statements. The previously reused menu images have been disabled. Supply the complete original question before answering this item.',
  },
};

export function getQuestionPresentation(question: Pick<Question, 'id'>) {
  return questionPresentation[question.id];
}
