import { useState, useEffect, useRef } from "react";
import { useTranslation, localized } from "../../i18n/i18n";
import { phrases } from "../../data/phrases";
import type { PhraseEntry } from "../../types/models";
import { Mic, MicOff, Search, Volume2, Plane, Bus, Hotel, UtensilsCrossed, ShoppingBag, AlertTriangle } from "lucide-react";

type Situation = PhraseEntry["situation"];

const SITUATION_ICONS: Record<Situation, typeof Plane> = {
  arrival: Plane,
  transport: Bus,
  hotel: Hotel,
  restaurant: UtensilsCrossed,
  shopping: ShoppingBag,
  emergency: AlertTriangle,
};

export function Translator() {
  const { t, language } = useTranslation();
  const [activeSituation, setActiveSituation] = useState<Situation | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setSpeechSupported(false);
      return;
    }
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === "ar" ? "ar-DZ" : language === "fr" ? "fr-FR" : "en-US";
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakText = (text: string, lang: string) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "ar" ? "ar-DZ" : lang === "fr" ? "fr-FR" : "en-US";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const filteredPhrases = phrases.filter((p) => {
    const matchSituation = activeSituation === "all" || p.situation === activeSituation;
    if (!searchQuery.trim()) return matchSituation;
    const q = searchQuery.toLowerCase();
    return matchSituation && (
      Object.values(p.source).some((v) => v.toLowerCase().includes(q)) ||
      Object.values(p.contextual).some((v) => v.toLowerCase().includes(q)) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  const situations: (Situation | "all")[] = ["all", "arrival", "transport", "hotel", "restaurant", "shopping", "emergency"];
  const situationKeys: Record<string, string> = {
    all: "translator.allPhrases",
    arrival: "translator.arrival",
    transport: "translator.transport",
    hotel: "translator.hotel",
    restaurant: "translator.restaurant",
    shopping: "translator.shopping",
    emergency: "translator.emergency",
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">{t("translator.title")}</h1>
        <p className="page-subtitle">{t("translator.subtitle")}</p>
      </div>

      <div className="page-content" style={{ display: "grid", gap: "var(--space-md)" }}>
        {/* Search + Voice */}
        <div style={{ position: "relative" }}>
          <Search size={16} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)" }} />
          <input
            className="input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("translator.searchPlaceholder")}
            style={{ paddingInlineStart: "2.25rem", paddingInlineEnd: "3rem" }}
          />
          {speechSupported ? (
            <button
              className="btn btn-icon"
              onClick={toggleListening}
              style={{
                position: "absolute", insetInlineEnd: 4, top: "50%", transform: "translateY(-50%)",
                background: isListening ? "var(--verdigris)" : "transparent",
                color: isListening ? "white" : "var(--text-secondary)",
                padding: 6, borderRadius: "var(--radius-full)",
              }}
              aria-label={isListening ? t("translator.stopListening") : t("translator.speak")}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
          ) : null}
        </div>

        {isListening && (
          <div className="banner banner-info">
            <Mic size={14} />
            <span>{t("translator.listening")}</span>
          </div>
        )}

        {!speechSupported && (
          <div className="banner banner-amber">
            <span style={{ fontSize: "0.8125rem" }}>{t("translator.voiceNotSupported")}</span>
          </div>
        )}

        {/* Situation tabs */}
        <div className="tabs">
          {situations.map((sit) => {
            const Icon = sit === "all" ? null : SITUATION_ICONS[sit];
            return (
              <button
                key={sit}
                className={`tab ${activeSituation === sit ? "tab-active" : ""}`}
                onClick={() => setActiveSituation(sit)}
              >
                {Icon && <Icon size={13} style={{ display: "inline", verticalAlign: "middle", marginInlineEnd: 4 }} />}
                {t(situationKeys[sit])}
              </button>
            );
          })}
        </div>

        {/* Phrase cards — the centrepiece */}
        <div style={{ display: "grid", gap: "var(--space-md)" }}>
          {filteredPhrases.map((phrase) => (
            <PhraseCard key={phrase.id} phrase={phrase} language={language} onSpeak={speakText} t={t} />
          ))}

          {filteredPhrases.length === 0 && (
            <div style={{ textAlign: "center", padding: "var(--space-2xl)", color: "var(--text-secondary)" }}>
              <p>{t("app.noResults")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PhraseCard({
  phrase, language, onSpeak, t,
}: {
  phrase: PhraseEntry;
  language: string;
  onSpeak: (text: string, lang: string) => void;
  t: (key: string) => string;
}) {
  return (
    <div className="phrase-card animate-fade-in">
      {/* Source phrase */}
      <div style={{
        padding: "var(--space-md) var(--space-lg)",
        background: "var(--rhumel)",
        color: "var(--text-inverse)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: "1rem", fontWeight: 500 }}>
          {localized(phrase.source, language as any)}
        </span>
        <button
          className="btn btn-icon"
          onClick={() => onSpeak(localized(phrase.source, language as any), language)}
          style={{ color: "var(--verdigris-light)", padding: 4 }}
          aria-label={t("translator.playAudio")}
        >
          <Volume2 size={16} />
        </button>
      </div>

      {/* Literal layer */}
      <div className="phrase-layer phrase-layer-literal">
        <p className="phrase-label text-muted">{t("translator.literal")}</p>
        <p className="phrase-text" style={{ color: "var(--text-secondary)" }}>
          {localized(phrase.literal, language === "en" ? "ar" : "en")}
        </p>
        <p style={{ fontSize: "0.6875rem", color: "var(--text-secondary)", opacity: 0.6, marginBlockStart: 2 }}>
          {t("translator.literalSub")}
        </p>
      </div>

      {/* Contextual layer — the star */}
      <div className="phrase-layer phrase-layer-contextual">
        <p className="phrase-label text-verdigris">{t("translator.contextual")}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p className="phrase-text phrase-text-contextual">
            {localized(phrase.contextual, language === "en" ? "ar" : language === "fr" ? "ar" : "en")}
          </p>
          <button
            className="btn btn-icon"
            onClick={() => onSpeak(localized(phrase.contextual, "ar"), "ar")}
            style={{ color: "var(--verdigris)", padding: 4, flexShrink: 0 }}
            aria-label={t("translator.playAudio")}
          >
            <Volume2 size={16} />
          </button>
        </div>
        <p style={{ fontSize: "0.6875rem", color: "var(--verdigris)", opacity: 0.7, marginBlockStart: 2 }}>
          {t("translator.contextualSub")}
        </p>
      </div>

      {/* Cultural note layer */}
      <div className="phrase-layer phrase-layer-note">
        <p className="phrase-label text-amber">{t("translator.note")}</p>
        <p className="phrase-text" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>
          {localized(phrase.note, language as any)}
        </p>
      </div>

      {/* Tags */}
      <div style={{
        padding: "var(--space-sm) var(--space-lg)",
        display: "flex", flexWrap: "wrap", gap: "var(--space-xs)",
      }}>
        {phrase.tags.map((tag) => (
          <span key={tag} className="badge badge-demo">#{tag}</span>
        ))}
      </div>
    </div>
  );
}
