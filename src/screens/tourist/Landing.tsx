import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../i18n/i18n";
import { plans } from "../../data/seedData";
import { Globe, Languages, Shield, MapPin, ChevronRight, Wifi } from "lucide-react";
import type { Language } from "../../constants";

export function Landing() {
  const { t, language, setLanguage, dir } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="page landing-hero" style={{ background: "var(--bg-dark)", color: "var(--text-inverse)", paddingBlockEnd: 0 }}>
      {/* Animated blobs */}
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />

      {/* Language switcher bar */}
      <div style={{
        display: "flex", justifyContent: "center", gap: "var(--space-sm)",
        padding: "var(--space-lg) var(--space-xl)", position: "relative", zIndex: 10
      }}>
        {(["en", "fr", "ar"] as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`btn btn-sm ${language === lang ? "" : "btn-ghost"}`}
            style={language === lang
              ? { background: "var(--gradient-primary)", color: "white", boxShadow: "0 2px 12px rgba(22, 163, 74, 0.3)" }
              : { color: "var(--text-inverse)", opacity: 0.6, borderRadius: "var(--radius-full)" }}
          >
            {lang === "en" ? "English" : lang === "fr" ? "Français" : "العربية"}
          </button>
        ))}
      </div>

      {/* Hero */}
      <div className="animate-fade-in" style={{
        textAlign: "center", padding: "var(--space-3xl) var(--space-xl) var(--space-2xl)",
        position: "relative", zIndex: 1,
      }}>
        {/* Logo / Brand */}
        <div style={{ marginBlockEnd: "var(--space-xl)" }}>
          <div style={{
            width: 72, height: 72, borderRadius: "var(--radius-2xl)",
            background: "var(--gradient-hero)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto var(--space-lg)",
            boxShadow: "0 12px 40px rgba(22, 163, 74, 0.35), 0 0 80px rgba(22, 163, 74, 0.15)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}>
            <Wifi size={30} color="white" />
          </div>
          <h1 style={{
            fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "0.16em",
            background: "var(--gradient-hero)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            SMART SIM DZ
          </h1>
        </div>

        {/* Arabic headline — Amiri, one line, once */}
        {language === "ar" ? (
          <h2 className="font-display" style={{
            fontSize: "2.75rem", lineHeight: 1.35, color: "var(--text-inverse)",
            marginBlockEnd: "var(--space-lg)",
          }}>
            {t("landing.hero")}
          </h2>
        ) : (
          <h2 style={{
            fontSize: "2.75rem", fontWeight: 800, lineHeight: 1.15,
            color: "var(--text-inverse)", marginBlockEnd: "var(--space-lg)",
            letterSpacing: "-0.03em", maxWidth: "36rem", margin: "0 auto var(--space-lg)",
          }}>
            {t("landing.hero")}
          </h2>
        )}

        <p style={{
          fontSize: "1.125rem", color: "var(--text-inverse-muted)",
          maxWidth: "34rem", margin: "0 auto", lineHeight: 1.75, fontWeight: 400,
        }}>
          {t("landing.heroSub")}
        </p>

        <button
          className="btn btn-lg cta-glow"
          style={{
            marginBlockStart: "var(--space-xl)",
            background: "var(--gradient-hero)", color: "white",
            padding: "1rem 2.75rem", fontSize: "1.0625rem",
            boxShadow: "0 8px 32px rgba(22, 163, 74, 0.4), 0 0 60px rgba(22, 163, 74, 0.15)",
            fontWeight: 700, letterSpacing: "0.01em",
          }}
          onClick={() => navigate("/tourist/register")}
        >
          {t("landing.cta")}
          <ChevronRight size={18} />
        </button>

        {/* Trust stats — floating glass cards */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "var(--space-lg)",
          marginBlockStart: "var(--space-2xl)", flexWrap: "wrap",
        }}>
          {[
            { value: "4G/5G", label: t("landing.data") },
            { value: "3", label: t("landing.plans") },
            { value: "24/7", label: t("landing.why2Title") },
          ].map(({ value, label }) => (
            <div key={value} className="hero-glass-card" style={{
              padding: "var(--space-lg) var(--space-xl)",
              textAlign: "center", minWidth: 120,
              animation: "float 5s ease-in-out infinite",
              animationDelay: `${Math.random() * 2}s`,
            }}>
              <p style={{
                fontSize: "1.5rem", fontWeight: 800,
                background: "var(--gradient-hero)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {value}
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-inverse-muted)", fontWeight: 500, marginBlockStart: 4 }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why section */}
      <div className="animate-slide-up" style={{
        padding: "var(--space-2xl) var(--space-xl)",
        display: "grid", gap: "var(--space-lg)",
        position: "relative", zIndex: 1,
        maxWidth: "48rem", margin: "0 auto",
      }}>
        <h3 style={{
          textAlign: "center", fontSize: "1.375rem", fontWeight: 700,
          marginBlockEnd: "var(--space-sm)",
          background: "var(--gradient-hero)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {t("landing.whyTitle")}
        </h3>

        {[
          { icon: Languages, title: t("landing.why1Title"), desc: t("landing.why1") },
          { icon: Shield, title: t("landing.why2Title"), desc: t("landing.why2") },
          { icon: MapPin, title: t("landing.why3Title"), desc: t("landing.why3") },
        ].map(({ icon: Icon, title, desc }, i) => (
          <div key={title} className="hero-glass-card" style={{
            display: "flex", gap: "var(--space-lg)", alignItems: "flex-start",
            animation: "float 6s ease-in-out infinite",
            animationDelay: `${i * 0.6}s`,
          }}>
            <div className="feature-icon-dark" style={{
              flexShrink: 0, width: 48, height: 48, borderRadius: "var(--radius-lg)",
              background: "rgba(22, 163, 74, 0.12)",
              border: "1px solid rgba(22, 163, 74, 0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon size={22} color="#22c55e" />
            </div>
            <div>
              <h4 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--text-inverse)", marginBlockEnd: "var(--space-xs)" }}>
                {title}
              </h4>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-inverse-muted)", lineHeight: 1.7 }}>
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div style={{
        background: "var(--bg-page)",
        borderRadius: "var(--radius-2xl) var(--radius-2xl) 0 0",
        padding: "var(--space-3xl) var(--space-xl) var(--space-4xl)",
        color: "var(--text-primary)",
        position: "relative",
      }}>
        {/* Top glow */}
        <div style={{
          position: "absolute", top: -2, left: "10%", right: "10%", height: 3,
          background: "var(--gradient-hero)", borderRadius: "var(--radius-full)",
          filter: "blur(4px)", opacity: 0.5,
        }} />

        <h3 style={{
          textAlign: "center", fontSize: "1.75rem", fontWeight: 800,
          marginBlockEnd: "var(--space-sm)", letterSpacing: "-0.02em",
        }}>
          {t("landing.plans")}
        </h3>
        <p style={{
          textAlign: "center", color: "var(--text-secondary)", fontSize: "1rem",
          marginBlockEnd: "var(--space-2xl)", maxWidth: "28rem", marginInline: "auto",
        }}>
          {t("landing.trilingualNote")}
        </p>

        <div style={{ display: "grid", gap: "var(--space-lg)", maxWidth: "42rem", margin: "0 auto" }}>
          {plans.map((plan, i) => (
            <div key={plan.id} className={`plan-card ${i === 1 ? "plan-card-featured" : ""}`}>
              {i === 1 && (
                <div style={{
                  position: "absolute", insetBlockStart: 0, insetInlineEnd: 0,
                  background: "var(--gradient-primary)", color: "white",
                  padding: "0.3125rem 1rem", fontSize: "0.6875rem",
                  fontWeight: 700, borderRadius: "0 var(--radius-2xl) 0 var(--radius-lg)",
                  letterSpacing: "0.04em",
                }}>
                  POPULAR
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h4 style={{ fontSize: "1.1875rem", fontWeight: 800, letterSpacing: "-0.01em" }}>{plan.name}</h4>
                  <p className="text-muted" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    {plan.durationDays} {t("landing.days")}
                  </p>
                </div>
                <div style={{ textAlign: "end" }}>
                  <span style={{
                    fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em",
                    background: "var(--gradient-primary)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }} className="font-mono">
                    {plan.priceDZD.toLocaleString()}
                  </span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 500 }}> DZD</span>
                </div>
              </div>

              <div style={{
                display: "flex", gap: "var(--space-lg)", marginBlockStart: "var(--space-lg)",
                fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 500,
              }}>
                <span>{plan.dataGB} GB {t("landing.data")}</span>
                <span style={{ color: "var(--limestone-dark)" }}>•</span>
                <span>{plan.callMinutes} {t("landing.minutes")}</span>
              </div>

              <div style={{
                display: "flex", flexWrap: "wrap", gap: "var(--space-sm)",
                marginBlockStart: "var(--space-lg)",
              }}>
                {plan.features.map((f) => (
                  <span key={f} className="badge badge-verdigris">{f}</span>
                ))}
              </div>

              <button
                className={`btn ${i === 1 ? "btn-primary" : "btn-secondary"}`}
                style={{ width: "100%", marginBlockStart: "var(--space-lg)" }}
                onClick={() => navigate("/tourist/register")}
              >
                {t("landing.prebook")}
              </button>
            </div>
          ))}
        </div>

        {/* Trilingual note */}
        <p style={{
          textAlign: "center", fontSize: "0.875rem", color: "var(--text-tertiary)",
          marginBlockStart: "var(--space-2xl)", display: "flex", alignItems: "center",
          justifyContent: "center", gap: "var(--space-sm)", fontWeight: 500,
        }}>
          <Globe size={15} />
          {t("landing.trilingualNote")}
        </p>
      </div>
    </div>
  );
}
