import type { Question } from './questions.ts';

export const AI_TUTOR_SESSION_KEY = 'pl300-ai-tutor-session';
export const AI_TUTOR_DAILY_KEY = 'pl300-ai-tutor-daily-usage';
export const AI_TUTOR_DAILY_LIMIT = 30;

export type TutorRole = 'user' | 'assistant';

export type TutorMessage = {
  id: string;
  role: TutorRole;
  content: string;
};

export type TutorSession = {
  accessToken: string;
  refreshToken: string;
  email: string;
  expiresAt: number;
};

export type TutorQuestionContext = {
  questionId: string;
  domain: string;
  topic: string;
  type: Question['type'];
  prompt: string;
  scenario?: string;
  choices: string[];
  rows?: string[];
  learnerAnswer: string[];
  checked: boolean;
  sourceLabel: string;
  responseLanguage: 'ar-EG' | 'en';
  imageUrl?: string;
  answerImageUrl?: string;
  correctAnswer?: string[];
  sourceExplanation?: string;
};

export type TutorChatRequest = {
  context: TutorQuestionContext;
  messages: Array<Pick<TutorMessage, 'role' | 'content'>>;
};

export function buildTutorContext({
  question,
  topic,
  answer,
  checked,
  imageUrl,
  answerImageUrl,
  responseLanguage = 'en',
}: {
  question: Question;
  topic: string;
  answer?: number[];
  checked: boolean;
  imageUrl?: string;
  answerImageUrl?: string;
  responseLanguage?: 'ar-EG' | 'en';
}): TutorQuestionContext {
  const context: TutorQuestionContext = {
    questionId: question.id,
    domain: question.domain,
    topic,
    type: question.type,
    prompt: cleanText(question.prompt),
    scenario: question.context ? cleanText(question.context) : undefined,
    choices: question.choices,
    rows: question.rows,
    learnerAnswer: formatSelections(question, answer),
    checked,
    sourceLabel: `${question.source} · Q${question.sourceNumber}`,
    responseLanguage,
    imageUrl,
  };

  // The answer key must never reach the model before the learner checks the answer.
  if (checked) {
    context.correctAnswer = formatSelections(question, question.correct);
    context.sourceExplanation = cleanText(question.explanation);
    context.answerImageUrl = answerImageUrl;
  }
  return context;
}

export function getTutorStarterMessage(
  checked: boolean,
  language: 'ar-EG' | 'en' = 'en',
) {
  if (language === 'ar-EG')
    return checked
      ? 'أنا شايف السؤال وإجابتك ونتيجة التصحيح. اسألني ليه الإجابة صح أو غلط، أو خلّيني أشرح الفكرة من البداية بالمصري.'
      : 'أنا شايف السؤال الحالي والاختيارات، لكن الإجابة الصحيحة مخفية عني لحد ما تعمل Check Answer. أقدر أديك تلميح، أترجم المطلوب، أو أشرحلك الفكرة خطوة خطوة.';
  return checked
    ? 'I can see the question, your answer, and the result. Ask why it is right or wrong, or let me teach the concept from the beginning.'
    : 'I can see the current question and choices, but the answer key stays hidden until you select Check Answer. Ask for a hint, a translation, or a step-by-step concept explanation.';
}

export function getTutorQuickPrompts(
  checked: boolean,
  language: 'ar-EG' | 'en' = 'en',
) {
  if (language === 'ar-EG')
    return checked
      ? [
          'ليه إجابتي صح أو غلط؟',
          'اشرحلي الإجابة بالمصري',
          'اشرح الفرق بين الاختيارات',
        ]
      : [
          'اديني تلميح من غير الإجابة',
          'اشرحلي المطلوب بالمصري',
          'اشرح المصطلحات المهمة',
        ];
  return checked
    ? [
        'Why is my answer right or wrong?',
        'Explain the answer simply',
        'Compare the options',
      ]
    : [
        'Give me a hint without the answer',
        'Simplify the question',
        'Explain the key terms',
      ];
}

export function buildLocalTutorReply(
  context: TutorQuestionContext,
  userMessage: string,
) {
  const english = context.responseLanguage === 'en';
  const asksForAnswer = /answer|الإجابة|الاجابة|الصح|اختار|choose/i.test(
    userMessage,
  );
  if (!context.checked && asksForAnswer) {
    if (english)
      return `I will not reveal the correct choice before Check Answer. Focus on “${context.topic}”: list every requirement in the question, then eliminate any option that does not meet all of them.`;
    return `مش هقولك الاختيار الصح قبل Check Answer، عشان مانحوّلش التدريب لحفظ. ركّز على موضوع “${context.topic}” وحدد أولًا كل شرط في السؤال، وبعدها استبعد أي اختيار لا يحقق الشروط كلها.`;
  }

  if (context.checked) {
    const answer = context.correctAnswer?.join(' · ') || 'راجع صورة الإجابة';
    const evidence =
      context.sourceExplanation ||
      'المصدر لم يرفق شرحًا نصيًا، لذلك قارن إجابتك بصورة الحل الظاهرة في الصفحة.';
    return english
      ? `Verified answer: ${answer}\n\nThe core idea: ${shorten(evidence, 900)}\n\nTell me which part is still unclear and I will break it into smaller steps.`
      : `الإجابة المعتمدة: ${answer}\n\nالفكرة ببساطة: ${shorten(evidence, 900)}\n\nلو فيه جزء معين لسه مش واضح، اكتبهولي وأنا أقسمه لخطوات أصغر.`;
  }

  const scenario = context.scenario
    ? `ابدأ بالسيناريو وحدد البيانات أو القيود المذكورة فيه. `
    : '';
  const choiceHint =
    context.choices.length > 0
      ? `عندك ${context.choices.length} اختيارات؛ قارن كل واحد بالمتطلبات بدل ما تختار بناءً على كلمة مألوفة.`
      : 'ده سؤال بصري؛ اقرأ كل صف في Answer Area وحدد المطلوب لكل موضع قبل ما تضغط.';
  if (english) {
    const englishScenario = context.scenario
      ? 'Start with the scenario and identify its data and constraints. '
      : '';
    const englishChoiceHint =
      context.choices.length > 0
        ? `There are ${context.choices.length} choices. Test each one against the requirements instead of choosing a familiar term.`
        : 'This is a visual question. Read every row in the Answer Area and decide what each position needs.';
    return `${englishScenario}This question covers “${context.topic}” in “${context.domain}”. ${englishChoiceHint}\n\nPractical hint: rewrite the requirements as a short checklist, then ask which Power BI feature meets all of them with the least effort or best performance.`;
  }
  return `${scenario}السؤال من موضوع “${context.topic}” داخل مجال “${context.domain}”. ${choiceHint}\n\nتلميح عملي: اكتب الشروط الموجودة في السؤال كنقط صغيرة، وبعدها اسأل نفسك: أي ميزة في Power BI تحقق كل شرط بأقل مجهود أو أفضل أداء؟`;
}

export function readTutorSession(storage: Storage): TutorSession | null {
  const raw = storage.getItem(AI_TUTOR_SESSION_KEY);
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<TutorSession>;
    if (
      typeof value.accessToken !== 'string' ||
      typeof value.refreshToken !== 'string' ||
      typeof value.email !== 'string' ||
      typeof value.expiresAt !== 'number'
    )
      return null;
    return value as TutorSession;
  } catch {
    return null;
  }
}

export function saveTutorSession(
  storage: Storage,
  session: TutorSession | null,
) {
  if (session) storage.setItem(AI_TUTOR_SESSION_KEY, JSON.stringify(session));
  else storage.removeItem(AI_TUTOR_SESSION_KEY);
}

export function consumeDailyTutorMessage(storage: Storage, now = new Date()) {
  const day = now.toISOString().slice(0, 10);
  let count = 0;
  try {
    const parsed = JSON.parse(storage.getItem(AI_TUTOR_DAILY_KEY) ?? '{}') as {
      day?: unknown;
      count?: unknown;
    };
    if (parsed.day === day && Number.isFinite(parsed.count))
      count = Math.max(0, Math.trunc(Number(parsed.count)));
  } catch {
    count = 0;
  }
  if (count >= AI_TUTOR_DAILY_LIMIT) return { allowed: false, remaining: 0 };
  const next = count + 1;
  storage.setItem(AI_TUTOR_DAILY_KEY, JSON.stringify({ day, count: next }));
  return { allowed: true, remaining: AI_TUTOR_DAILY_LIMIT - next };
}

function formatSelections(question: Question, answer?: number[]) {
  if (!answer || answer.length === 0) return [];
  if (question.type === 'matching')
    return (question.rows ?? []).map((row, index) => {
      const choice = answer[index];
      return `${row}: ${choice != null && choice >= 0 ? question.choices[choice] : 'Not selected'}`;
    });
  if (question.type === 'sequence')
    return answer.map(
      (choice, index) => `${index + 1}. ${question.choices[choice]}`,
    );
  return answer
    .filter((choice) => choice >= 0 && choice < question.choices.length)
    .map((choice) => question.choices[choice]);
}

function cleanText(value: string) {
  return value
    .replace(/\r/g, '')
    .replace(/\n[\t ]*\n+/g, '\n')
    .trim();
}

function shorten(value: string, length: number) {
  return value.length > length ? `${value.slice(0, length).trim()}…` : value;
}
