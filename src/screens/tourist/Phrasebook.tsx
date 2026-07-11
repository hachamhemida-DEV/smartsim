import { useTranslation, localized } from "../../i18n/i18n";
import { phrases } from "../../data/phrases";
import { useAppStore } from "../../store/appStore";
import { EMERGENCY_NUMBERS } from "../../constants";
import { BookOpen, Phone, WifiOff, Wifi, Volume2 } from "lucide-react";
import type { PhraseEntry } from "../../types/models";

export function Phrasebook() {
  const { t, language } = useTranslation();
  const { isOfflineDemo } = useAppStore();

  const speakText = (text: string, lang: string) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "ar" ? "ar-DZ" : lang === "fr" ? "fr-FR" : "en-US";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const grouped = phrases.reduce<Record<string, PhraseEntry[]>>((acc, p) => {
    if (!acc[p.situation]) acc[p.situation] = [];
    acc[p.situation].push(p);
    return acc;
  }, {});

  const situationLabels: Record<string, string> = {
    arrival: t("translator.arrival"),
    transport: t("translator.transport"),
    hotel: t("translator.hotel"),
    restaurant: t("translator.restaurant"),
    shopping: t("translator.shopping"),
    emergency: t("translator.emergency"),
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">
          <BookOpen size={22} style={{ display: "inline", verticalAlign: "middle", marginInlineEnd: "var(--space-sm)" }} />
          {t("phrasebook.title")}
        </h1>
        <p className="page-subtitle">{t("phrasebook.subtitle")}</p>
      </div>

      <div className="page-content" style={{ display: "grid", gap: "var(--space-lg)" }}>
        {/* Offline indicator */}
        <div className={`banner ${isOfflineDemo ? "banner-amber" : "banner-info"}`}>
          {isOfflineDemo ? <WifiOff size={14} style={{ flexShrink: 0 }} /> : <Wifi size={14} style={{ flexShrink: 0 }} />}
          <span>
            {isOfflineDemo ? t("app.offline") : t("app.online")} — {t("phrasebook.offlineReady")}
          </span>
        </div>

        {/* Emergency Numbers */}
        <div className="card" style={{ border: "1px solid var(--limestone-dark)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", marginBlockEnd: "var(--space-md)" }}>
            <Phone size={18} />
            <h3 style={{ fontSize: "1rem" }}>{t("phrasebook.emergencyNumbers")}</h3>
          </div>
          <div className="font-mono" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-secondary)" }}>
            {/* VERIFY real Algerian emergency numbers before any live demo */}
            {EMERGENCY_NUMBERS}
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBlockStart: "var(--space-sm)" }}>
            {t("phrasebook.emergencyNote")}
          </p>
        </div>

        {/* Phrases grouped by situation */}
        {Object.entries(grouped).map(([situation, phrs]) => (
          <div key={situation}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBlockEnd: "var(--space-md)", color: "var(--verdigris-dark)" }}>
              {situationLabels[situation] || situation}
            </h3>
            <div style={{ display: "grid", gap: "var(--space-sm)" }}>
              {phrs.map((phrase) => (
                <div key={phrase.id} className="card" style={{ padding: "var(--space-md)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBlockEnd: 2 }}>
                        {localized(phrase.source, language as any)}
                      </p>
                      <p style={{ fontSize: "1rem", fontWeight: 500, color: "var(--verdigris-dark)" }}>
                        {localized(phrase.contextual, language === "en" ? "ar" : language === "fr" ? "ar" : "en")}
                      </p>
                    </div>
                    <button
                      className="btn btn-icon btn-ghost"
                      onClick={() => speakText(localized(phrase.contextual, "ar"), "ar")}
                      style={{ flexShrink: 0 }}
                      aria-label={t("translator.playAudio")}
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
