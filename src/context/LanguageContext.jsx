/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { personalInfo, skillsData } from '../data/portfolioData';
import { personalInfoEn, skillsDataEn } from '../data/portfolioData.en';
import { ui } from '../i18n/translations';

const LanguageContext = createContext({ lang: 'id', setLang: () => {}, toggleLang: () => {}, t: (k) => k });

const STORAGE_KEY = 'rival-lang';

function getInitialLang() {
  if (typeof window === 'undefined') return 'id';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'id' || saved === 'en') return saved;
  } catch {
    /* ignore */
  }
  return 'id';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next === 'en' ? 'en' : 'id');
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'en' ? 'id' : 'en'));
  }, []);

  const t = useCallback((key) => ui[lang][key] ?? ui.id[key] ?? key, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      t,
      data: lang === 'en' ? personalInfoEn : personalInfo,
      skills: lang === 'en' ? skillsDataEn : skillsData,
    }),
    [lang, setLang, toggleLang, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
