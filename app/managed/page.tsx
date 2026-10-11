'use client';

import { ManagedExamsPlatform } from '@/components/managed-exams-platform';
import { ManagedExamsProduction } from '@/components/managed-exams-production';
import { LanguageProvider } from '@/lib/i18n';
import { MANAGED_API_URL } from '@/lib/managed-exams-api';

export default function ManagedExamsPage() {
  return (
    <LanguageProvider>
      {MANAGED_API_URL ? <ManagedExamsProduction /> : <ManagedExamsPlatform />}
    </LanguageProvider>
  );
}
