import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../i18n/i18n";
import { Languages, MapPin, Shield, Bell } from "lucide-react";

export function TouristHome() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dataUsedGB = 2.3;
  const dataTotalGB = 5;
  const daysLeft = 4;
  const dataPct = (dataUsedGB / dataTotalGB) * 100;

  return (
    <div className="page">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p className="text-muted" style={{ fontSize: "0.875rem" }}>{t("home.welcome")},</p>
          <h1 className="page-title">Marie Dubois</h1>
        </div>
        <button className="btn btn-icon btn-ghost" onClick={() => navigate("/tourist/notifications")} style={{ position: "relative" }}>
          <Bell size={22} />
          <span style={{
            position: "absolute", top: 4, insetInlineEnd: 4,
            width: 8, height: 8, borderRadius: "50%",
            background: "var(--verdigris)",
          }} />
        </button>
      </div>

      <div className="page-content animate-fade-in" style={{ display: "grid", gap: "var(--space-md)" }}>
        {/* Data card */}
        <div className="card" style={{ position: "relative", overflow: "hidden" }}>
          {/* Cable ornament */}
          <div style={{
            position: "absolute", insetInlineStart: 0, top: 0, bottom: 0,
            width: 1, background: "var(--verdigris)", opacity: 0.3,
          }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBlockEnd: "var(--space-md)" }}>
            <div>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{t("home.dataRemaining")}</p>
              <p style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--verdigris)" }} className="font-mono">
                {(dataTotalGB - dataUsedGB).toFixed(1)} <span style={{ fontSize: "0.875rem", fontWeight: 400 }}>GB</span>
              </p>
            </div>
            <div style={{ textAlign: "end" }}>
              <p className="font-mono" style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                {dataUsedGB} {t("home.of")} {dataTotalGB} GB
              </p>
            </div>
          </div>

          <div className="gauge-track">
            <div className="gauge-fill" style={{ width: `${100 - dataPct}%` }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBlockStart: "var(--space-sm)", fontSize: "0.8125rem" }}>
            <span className="badge badge-verdigris">{t("sim.active")}</span>
            <span className="font-mono text-muted">
              {daysLeft} {t("home.daysRemaining")}
            </span>
          </div>
        </div>

        {/* Action cards */}
        <div style={{ display: "grid", gap: "var(--space-md)" }}>
          {[
            { label: t("home.translate"), icon: Languages, route: "/tourist/translate", color: "var(--verdigris)", desc: t("translator.subtitle") },
            { label: t("home.findServices"), icon: MapPin, route: "/tourist/services", color: "var(--verdigris-dark)", desc: t("landing.why3") },
            { label: t("home.safety"), icon: Shield, route: "/tourist/safety", color: "var(--rhumel)", desc: t("landing.why2") },
          ].map(({ label, icon: Icon, route, color, desc }) => (
            <button
              key={route}
              className="card"
              style={{
                cursor: "pointer", display: "flex", alignItems: "center", gap: "var(--space-md)",
                textAlign: "start", border: "none", width: "100%",
              }}
              onClick={() => navigate(route)}
            >
              <div style={{
                width: 52, height: 52, borderRadius: "var(--radius-lg)",
                background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon size={24} color={color} />
              </div>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBlockEnd: "2px" }}>{label}</h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>{desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Demo data banner */}
        <div className="banner banner-amber" style={{ marginBlockStart: "var(--space-sm)" }}>
          <span style={{ fontSize: "0.75rem" }}>
            📊 {t("app.demoData")} — all usage figures shown are simulated
          </span>
        </div>
      </div>
    </div>
  );
}
