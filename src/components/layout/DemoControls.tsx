import { useState } from "react";
import { useAppStore } from "../../store/appStore";
import { useTranslation } from "../../i18n/i18n";
import { simulatePush } from "../../services/notificationService";
import { Settings, Wifi, WifiOff, Bell } from "lucide-react";

export function DemoControls() {
  const { isOfflineDemo, setOfflineDemo } = useAppStore();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [pushSent, setPushSent] = useState(false);

  const handleSimulatePush = async () => {
    await simulatePush();
    setPushSent(true);
    setTimeout(() => setPushSent(false), 2000);
  };

  return (
    <div className="demo-controls">
      {open && (
        <div className="demo-controls-panel">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBlockEnd: "var(--space-md)" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {t("app.demo")}
            </span>
            <span className="badge badge-demo">PROTOTYPE</span>
          </div>

          {/* Offline Toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBlockEnd: "var(--space-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
              {isOfflineDemo ? <WifiOff size={14} /> : <Wifi size={14} />}
              <span style={{ fontSize: "0.8125rem" }}>{t("app.offlineToggle")}</span>
            </div>
            <button
              className={`toggle ${isOfflineDemo ? "active" : ""}`}
              onClick={() => setOfflineDemo(!isOfflineDemo)}
              aria-label={t("app.offlineToggle")}
            />
          </div>

          {/* Simulate Push */}
          <button
            className="btn btn-sm"
            style={{ width: "100%", background: "var(--rhumel-70)", color: "var(--text-inverse)", fontSize: "0.75rem" }}
            onClick={handleSimulatePush}
          >
            <Bell size={12} />
            {pushSent ? "✓ Sent" : t("notifications.simulatePush")}
          </button>
          <p style={{ fontSize: "0.6875rem", color: "var(--text-secondary)", marginBlockStart: "var(--space-sm)", opacity: 0.7 }}>
            {t("notifications.iosNote")}
          </p>
        </div>
      )}

      <button
        className="demo-controls-toggle"
        onClick={() => setOpen(!open)}
        style={{ marginBlockStart: open ? "var(--space-sm)" : 0, marginInlineStart: "auto", display: "flex" }}
      >
        <Settings size={12} />
        <span>{t("app.demo")}</span>
      </button>
    </div>
  );
}
