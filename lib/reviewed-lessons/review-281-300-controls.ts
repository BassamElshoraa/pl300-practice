import type {
  TextAnswerRow,
  QuestionPresentation,
} from '../question-presentation.ts';
import type { QuestionCorrection } from '../answer-audit.ts';
export const textRows: Record<string, TextAnswerRow[]> = {
  'f1-281-280': [
    { label: 'Column:', options: ['Jan-24', 'Region', 'State'] },
    {
      label: 'Action:',
      options: ['Fill down', 'Fill up', 'Replace values', 'Unpivot'],
    },
  ],
  'f1-287-286': [
    {
      label: 'To change the column spacing:',
      options: [
        'Decrease category space.',
        'Enable overlap for every series.',
        'Enable overlap for the Plan series.',
        'Increase category space.',
      ],
    },
    {
      label: 'To add the percent change labels:',
      options: [
        'Enable data labels for every series.',
        'Enable data labels for the Plan series.',
        'Enable the X-axis title.',
        'Enable the Y-axis title.',
      ],
    },
  ],
};
export const presentations: Record<string, QuestionPresentation> = {
  'f1-281-280': {
    hideSourceImage: true,
    tables: [
      {
        caption:
          'Source query: Region is written only at the start of each group',
        columns: ['Region', 'State', 'Jan-24', '24-Feb'],
        rows: [
          ['New England', 'Connecticut', '135406', '301796'],
          ['', 'Maine', '277491', '379959'],
          ['', 'Massachusetts', '351593', '51885'],
          ['', 'New York', '228595', '469117'],
          ['', 'Vermont', '351707', '428020'],
          ['Mountain', 'Colorado', '98470', '47417'],
          ['', 'Idaho', '233238', '298378'],
          ['', 'Montana', '398674', '38907'],
          ['', 'Utah', '457837', '221236'],
          ['Mid Atlantic', 'Maryland', '161599', '250716'],
          ['', 'New Jersey', '76077', '351063'],
          ['Midwest', 'Kansas', '75837', '278442'],
          ['', 'Missouri', '403898', '19499'],
          ['', 'Nebraska', '62773', '71883'],
          ['Pacific', 'Washington', '299344', '405026'],
          ['', 'Oregon', '197197', '191106'],
          ['', 'California', '385586', '39890'],
        ],
      },
    ],
  },
  'f1-283-282': {
    note: 'Other includes waiting and other processing overhead. It does not by itself prove that a visual depends on outputs from other visuals or starts last.',
  },
  'f1-287-286': {
    note: 'The menus identify the intended overlap and Plan-label settings. A percent-change value or custom-label configuration must also exist; enabling ordinary labels alone does not calculate a percentage.',
  },
  'f1-290-289': { hideSourceImage: true },
  'f1-293-292': {
    hideSourceImage: true,
    warning:
      'The intended source key is Yes / No / Yes, but the Finance sensitivity-label policy is not specified, and a sensitivity label alone does not prevent export. This governance item is explained, but cannot be uniquely auto-graded from the provided requirements.',
    tables: [
      {
        caption: 'Semantic models and usage (original exhibit)',
        columns: ['Name', 'Contents', 'Used to generate'],
        rows: [
          [
            'Sales',
            'Sales targets; Sales data; Employee salary data',
            'Daily performance reports; Quarterly reports used to calculate bonuses',
          ],
          [
            'Operations',
            'Environmental sensor data',
            'Reports that show average sensor readings over time',
          ],
          [
            'Finance',
            'Financial transaction data',
            'Budget planning reports; Monthly board reports',
          ],
        ],
      },
    ],
  },
};
export const corrections: Record<string, QuestionCorrection> = {
  'f1-283-282': {
    status: 'independently-reviewed',
    reviewedAnswer:
      'Both: August 2024 Active User %. Largest total and largest visible Other duration, not proof of a dependency.',
    reason:
      'The source explanation incorrectly inferred visual dependency/rendering priority from Other duration.',
    explanation:
      'The intended answer in both lists is August 2024 Active User %. Its displayed total is 474 ms, including DAX query 12 ms, Visual display 177 ms and Other about 286 ms (rounded components). Other can include waiting and additional processing; these timings do not establish a dependency on outputs of other visuals or that this visual started last. Do not attribute its entire duration to DAX.',
  },
  'f1-287-286': {
    status: 'flawed-source',
    reviewedAnswer:
      'Overlap for every series; labels for Plan, provided percentage/custom label values are configured.',
    reason:
      'Label visibility alone cannot calculate a percentage change from monetary series.',
    explanation:
      'The intended formatting choices are Enable overlap for every series and Enable data labels for the Plan series. This reproduces the requested appearance only if the appropriate percent-change/custom-label value is already configured. Overlap is not stacking, and enabling default Plan value labels alone does not compute a percent change.',
    suppressSourceAnswerImage: true,
  },
  'f1-293-292': {
    status: 'incomplete-source',
    reviewedAnswer:
      'Source intended: Yes; No; Yes. Finance labeling is policy-dependent; the stated export ban is not achieved by classification alone.',
    reasonAr:
      'بيانات الرواتب تبرر حماية Sales، والقرار المالي يبرر اعتماد Finance؛ لكن سياسة تصنيف Finance غير مذكورة والملصق وحده لا يمنع التصدير.',
    explanation:
      'The original Yes/No/Yes key is conditional on an unstated classification policy. Sales contains employee salaries; Operations has no stated PII/financial-decision role; Finance requires approval/certification for financial decisions, but the need for a sensitivity label is not established by the PII requirement alone. Sensitivity labels can carry configured protection into supported exports, not categorically prevent export. Do not score this underspecified source item automatically.',
    suppressSourceAnswerImage: true,
  },
  'f1-296-295': {
    status: 'outdated',
    reviewedAnswer:
      'C and D are the intended paths; open a report/dashboard, then re-enable the schedule if needed.',
    explanation:
      'C and D identify the relevant report/dashboard consumption paths after an inactivity pause. Current Microsoft guidance adds: re-enable the scheduled refresh if needed after opening. Merely revisiting does not guarantee automatic re-enabling in every case. The source wording omits this qualification.',
    evidence: [
      {
        label: 'Current scheduled-refresh inactivity guidance',
        url: 'https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-scheduled-refresh',
      },
    ],
  },
};
