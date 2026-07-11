import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../i18n/i18n";
import { useAppStore } from "../../store/appStore";
import { LANGUAGES, type Language } from "../../constants";
import { Globe, ArrowRight, Info } from "lucide-react";

export function Register() {
  const { t, language, setLanguage } = useTranslation();
  const { setRegistered } = useAppStore();
  const navigate = useNavigate();

  const [step, setStep] = useState<"language" | "details">("language");
  const [fullName, setFullName] = useState("Marie Dubois");
  const [passport, setPassport] = useState("XX-001-DEMO");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    setRegistered(true);
    navigate("/tourist/pair-sim");
  };

  return (
    <div className="page" style={{ background: "var(--surface)" }}>
      <div className="page-header">
        <h1 className="page-title">{t("auth.createAccount")}</h1>
      </div>

      <div className="page-content animate-fade-in">
        {step === "language" ? (
          <div style={{ display: "grid", gap: "var(--space-lg)", maxWidth: "24rem", margin: "0 auto" }}>
            <p className="text-muted" style={{ textAlign: "center" }}>
              <Globe size={16} style={{ display: "inline", verticalAlign: "middle", marginInlineEnd: "var(--space-xs)" }} />
              {t("auth.languageFirst")}
            </p>

            <div style={{ display: "grid", gap: "var(--space-sm)" }}>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  className="card"
                  style={{
                    cursor: "pointer", textAlign: "start",
                    border: language === lang ? "2px solid var(--verdigris)" : "1px solid var(--limestone-dark)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}
                  onClick={() => {
                    setLanguage(lang as Language);
                  }}
                >
                  <span style={{ fontWeight: language === lang ? 600 : 400 }}>
                    {lang === "en" ? "English" : lang === "fr" ? "Français" : "العربية"}
                  </span>
                  {language === lang && (
                    <span className="badge badge-verdigris">✓</span>
                  )}
                </button>
              ))}
            </div>

            <button className="btn btn-primary btn-lg" style={{ width: "100%" }} onClick={() => setStep("details")}>
              {t("auth.continue")}
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "var(--space-lg)", maxWidth: "24rem", margin: "0 auto" }}>
            <div>
              <label className="input-label">{t("auth.fullName")}</label>
              <input
                className="input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="input-label">{t("auth.passport")}</label>
              <input
                className="input font-mono"
                value={passport}
                onChange={(e) => setPassport(e.target.value)}
                placeholder="XX-000-DEMO"
              />
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBlockStart: "var(--space-xs)" }}>
                {t("auth.passportHint")}
              </p>
            </div>

            <div>
              <label className="input-label">{t("auth.email")}</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div className="banner banner-info">
              <Info size={16} style={{ flexShrink: 0, marginBlockStart: 2 }} />
              <span>{t("auth.consentLater")}</span>
            </div>

            <button className="btn btn-primary btn-lg" style={{ width: "100%" }} onClick={handleSubmit}>
              {t("auth.continue")}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
