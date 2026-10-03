'use client';

export type AnalyticsEventName =
  | 'pl300_session_started'
  | 'pl300_session_resumed'
  | 'pl300_session_completed'
  | 'pl300_pdf_downloaded'
  | 'pl300_ai_tutor_opened'
  | 'pl300_ai_tutor_message_sent'
  | 'pl300_ai_explanation_requested';

type AnalyticsValue = string | number | boolean;
type AnalyticsParameters = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: 'config' | 'event' | 'js' | 'consent',
      target: string | Date,
      parameters?: Record<string, unknown>,
    ) => void;
  }
}

export function trackAnalyticsEvent(
  name: AnalyticsEventName,
  parameters: AnalyticsParameters = {},
) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const safeParameters = Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => value !== undefined),
  );
  window.gtag('event', name, safeParameters);
}

export function analyticsSessionType(
  model: number,
  hasCustomQuestionSet: boolean,
) {
  if (model >= 100 && model < 200) return 'source_bank';
  if (model >= 800 && model < 900) return 'monthly_dump';
  if (model === 900) return 'custom_practice';
  if (model === 901) return 'mistakes';
  if (model === 902) return 'bookmarks';
  if (hasCustomQuestionSet) return 'custom_set';
  return 'mock_exam';
}

