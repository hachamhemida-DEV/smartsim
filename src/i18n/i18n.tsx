import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Language } from "../constants";
import en from "./en.json";
import fr from "./fr.json";
import ar from "./ar.json";

type TranslationDict = typeof en;
const dictionaries: Record<Language, TranslationDict> = { en, fr, ar };

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("smartsim-lang");
    return (saved as Language) || "fr";
  });

  const setLanguage = useCallback((lang: Language) => {
    setLang(lang);
    localStorage.setItem("smartsim-lang", lang);
  }, []);

  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", language);
  }, [dir, language]);

  const t = useCallback(
    (key: string): string => {
      const parts = key.split(".");
      let val: unknown = dictionaries[language];
      for (const part of parts) {
        if (val && typeof val === "object" && part in val) {
          val = (val as Record<string, unknown>)[part];
        } else {
          return key; // fallback: return key itself
        }
      }
      return typeof val === "string" ? val : key;
    },
    [language]
  );

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  return ctx;
}

/** Get a localized value from a Record<string, string> keyed by language code */
export function localized(record: Record<string, string> | undefined, lang: Language): string {
  if (!record) return "";
  return record[lang] || record["en"] || record["fr"] || Object.values(record)[0] || "";
}
