'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type AppLanguage = 'en' | 'ar';

type LanguageContextValue = {
  language: AppLanguage;
  isArabic: boolean;
  setLanguage: (language: AppLanguage) => void;
  tx: (english: string, arabic: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = 'pl300-interface-language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<AppLanguage>('en');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'ar' || saved === 'en') setLanguage(saved);
      } catch {
        // English remains the safe default when storage is blocked.
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'ar' ? 'ar-EG' : 'en';
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Language still works for the current tab.
    }
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      isArabic: language === 'ar',
      setLanguage,
      tx: (english, arabic) => (language === 'ar' ? arabic : english),
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value)
    throw new Error('useLanguage must be used inside LanguageProvider.');
  return value;
}
