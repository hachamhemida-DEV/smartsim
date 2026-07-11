import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "../../i18n/i18n";
import { useSafetyStore } from "../../store/safetyStore";
import { Shield, MapPin, MapPinOff, AlertTriangle, X, Clock, FileText, Info } from "lucide-react";

export function Safety() {
  const { t, dir } = useTranslation();
  const {
    consent, grantConsent, revokeConsent,
    activeSos, triggerSos, cancelSos,
    auditLog,
  } = useSafetyStore();

  const [showConsent, setShowConsent] = useState(false);
  const [sosState, setSosState] = useState<"idle" | "holding" | "countdown" | "sent">("idle");
  const [holdProgress, setHoldProgress] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const holdTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showAudit, setShowAudit] = useState(false);

  const isConsentGranted = consent?.granted === true;

  // Reset SOS state when consent is revoked
  useEffect(() => {
    if (!isConsentGranted) {
      setSosState("idle");
      setHoldProgress(0);
      setCountdown(5);
    }
  }, [isConsentGranted]);

  // Reset when active SOS changes
  useEffect(() => {
    if (activeSos?.status === "active" && sosState !== "sent") {
      setSosState("sent");
    }
    if (!activeSos && sosState === "sent") {
      setSosState("idle");
    }
  }, [activeSos, sosState]);

  const startHold = useCallback(() => {
    if (!isConsentGranted || sosState === "sent" || sosState === "countdown") return;
    setSosState("holding");
    setHoldProgress(0);

    let progress = 0;
    holdTimer.current = setInterval(() => {
      progress += 100 / 30; // 3 seconds = 30 intervals of 100ms
      setHoldProgress(Math.min(progress, 100));
      if (progress >= 100) {
        clearInterval(holdTimer.current!);
        setSosState("countdown");
        startCountdown();
      }
    }, 100);
  }, [isConsentGranted, sosState]);

  const endHold = useCallback(() => {
    if (sosState === "holding") {
      clearInterval(holdTimer.current!);
      setSosState("idle");
      setHoldProgress(0);
    }
  }, [sosState]);

  const startCountdown = () => {
    setCountdown(5);
    countdownTimer.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer.current!);
          triggerSos();
          setSosState("sent");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelCountdown = () => {
    clearInterval(countdownTimer.current!);
    setSosState("idle");
    setHoldProgress(0);
    setCountdown(5);
  };

  const handleCancelSos = () => {
    cancelSos();
    setSosState("idle");
    setHoldProgress(0);
  };

  // SVG arc calculation
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (holdProgress / 100) * circumference;

  return (
    <div className="page safety-module">
      <div className="page-header">
        <h1 className="page-title">
          <Shield size={22} style={{ display: "inline", verticalAlign: "middle", marginInlineEnd: "var(--space-sm)" }} />
          {t("safety.title")}
        </h1>
      </div>

      <div className="page-content animate-fade-in" style={{ display: "grid", gap: "var(--space-lg)" }}>
        {/* Location consent */}
        <div className="card" style={{ border: isConsentGranted ? "1px solid var(--verdigris)" : "1px solid var(--limestone-dark)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
              {isConsentGranted ? <MapPin size={20} color="var(--verdigris)" /> : <MapPinOff size={20} color="var(--text-secondary)" />}
              <div>
                <p style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                  {isConsentGranted ? t("safety.locationOn") : t("safety.locationOff")}
                </p>
                {isConsentGranted && (
                  <p style={{ fontSize: "0.75rem", color: "var(--verdigris)" }}>{t("safety.locationShared")}</p>
                )}
              </div>
            </div>
            <button
              className={`btn btn-sm ${isConsentGranted ? "btn-secondary" : "btn-primary"}`}
              onClick={() => isConsentGranted ? revokeConsent() : setShowConsent(true)}
            >
              {isConsentGranted ? t("safety.stopSharing") : t("safety.shareLocation")}
            </button>
          </div>
        </div>

        {/* Browser limitation banner */}
        <div className="banner banner-amber">
          <Info size={14} style={{ flexShrink: 0, marginBlockStart: 2 }} />
          <span>{t("safety.browserLimit")}</span>
        </div>

        {/* SOS Button */}
        <div style={{ textAlign: "center", paddingBlock: "var(--space-lg)" }}>
          <h3 style={{ marginBlockEnd: "var(--space-lg)", fontWeight: 600 }}>
            <AlertTriangle size={18} style={{ display: "inline", verticalAlign: "middle", marginInlineEnd: "var(--space-xs)" }} />
            {t("safety.sosTitle")}
          </h3>

          {sosState === "countdown" ? (
            <div style={{ display: "grid", gap: "var(--space-md)", justifyItems: "center" }}>
              <div style={{
                width: 160, height: 160, borderRadius: "50%",
                background: "rgba(179, 43, 35, 0.08)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              }}>
                <span className="sos-status font-mono" style={{ fontSize: "3rem", fontWeight: 700 }}>{countdown}</span>
                <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{t("safety.sosCountdown")}</span>
              </div>
              <button className="btn btn-secondary btn-lg" onClick={cancelCountdown}>
                <X size={18} /> {t("safety.sosCancelCountdown")}
              </button>
            </div>
          ) : sosState === "sent" ? (
            <div style={{ display: "grid", gap: "var(--space-md)", justifyItems: "center" }}>
              <div style={{
                width: 160, height: 160, borderRadius: "50%",
                background: "rgba(179, 43, 35, 0.08)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                animation: "pulse 2s infinite",
              }}>
                <AlertTriangle size={40} className="sos-status" />
                <span className="sos-status" style={{ fontSize: "0.875rem", fontWeight: 600, marginBlockStart: "var(--space-sm)" }}>
                  {t("safety.sosSent")}
                </span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", maxWidth: "20rem" }}>
                {t("safety.sosSentSub")}
              </p>
              <button className="btn btn-secondary btn-sm" onClick={handleCancelSos}>
                {t("safety.sosCancel")}
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "var(--space-md)", justifyItems: "center" }}>
              <div className="sos-button-container">
                <svg className="sos-ring" viewBox="0 0 160 160" style={{ transform: dir === "rtl" ? "scaleX(-1)" : undefined }}>
                  <circle className="sos-ring-bg" cx="80" cy="80" r={radius} />
                  <circle
                    className="sos-ring-progress sos-arc"
                    cx="80" cy="80" r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                  />
                </svg>
                <button
                  className="sos-inner"
                  onMouseDown={startHold}
                  onMouseUp={endHold}
                  onMouseLeave={endHold}
                  onTouchStart={startHold}
                  onTouchEnd={endHold}
                  disabled={!isConsentGranted}
                  style={{ opacity: isConsentGranted ? 1 : 0.4 }}
                  aria-label="SOS"
                >
                  <AlertTriangle size={28} />
                  <span style={{ fontSize: "0.875rem" }}>SOS</span>
                </button>
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                {sosState === "holding" ? t("safety.sosHolding") : t("safety.sosHold")}
              </p>
              {!isConsentGranted && (
                <p style={{ fontSize: "0.8125rem", color: "var(--amber)" }}>
                  ⚠ {t("safety.shareLocation")} first
                </p>
              )}
            </div>
          )}
        </div>

        {/* Audit Log — one tap away */}
        <div className="card">
          <button
            className="btn btn-ghost"
            style={{ width: "100%", justifyContent: "flex-start", gap: "var(--space-sm)", paddingInline: 0 }}
            onClick={() => setShowAudit(!showAudit)}
          >
            <FileText size={18} />
            <span style={{ fontWeight: 600 }}>{t("safety.auditLog")}</span>
            <span className="badge badge-demo ms-auto">{auditLog.length}</span>
          </button>

          {showAudit && (
            <div style={{ marginBlockStart: "var(--space-md)" }}>
              {auditLog.length === 0 ? (
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", textAlign: "center", paddingBlock: "var(--space-md)" }}>
                  {t("safety.auditLogEmpty")}
                </p>
              ) : (
                <table className="audit-table">
                  <thead>
                    <tr>
                      <th>{t("safety.auditWho")}</th>
                      <th>{t("safety.auditWhen")}</th>
                      <th>{t("safety.auditAuth")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLog.map((entry) => (
                      <tr key={entry.id}>
                        <td>
                          <span style={{ fontWeight: 500 }}>{entry.accessedBy}</span>
                          <br />
                          <span className="badge badge-demo">{entry.accessedByRole}</span>
                        </td>
                        <td className="font-mono" style={{ fontSize: "0.75rem" }}>
                          {new Date(entry.timestamp).toLocaleString()}
                        </td>
                        <td className="font-mono" style={{ fontSize: "0.75rem" }}>
                          {entry.authorisationRef || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Consent Modal */}
      {showConsent && (
        <div className="modal-overlay" onClick={() => setShowConsent(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBlockEnd: "var(--space-lg)" }}>
              <MapPin size={20} style={{ display: "inline", verticalAlign: "middle", marginInlineEnd: "var(--space-sm)" }} />
              {t("safety.consentTitle")}
            </h3>

            <div style={{ display: "grid", gap: "var(--space-md)", marginBlockEnd: "var(--space-xl)" }}>
              <div className="banner banner-info">
                <span>{t("safety.consentPurpose")}</span>
              </div>
              <div className="banner banner-info">
                <Clock size={14} style={{ flexShrink: 0, marginBlockStart: 2 }} />
                <span>{t("safety.consentRetention")}</span>
              </div>
              <div className="banner banner-info">
                <Shield size={14} style={{ flexShrink: 0, marginBlockStart: 2 }} />
                <span>{t("safety.consentVisibility")}</span>
              </div>
            </div>

            <div style={{ display: "grid", gap: "var(--space-sm)" }}>
              <button
                className="btn btn-primary btn-lg"
                style={{ width: "100%" }}
                onClick={() => { grantConsent(); setShowConsent(false); }}
              >
                <MapPin size={18} />
                {t("safety.consentGrant")}
              </button>
              <button
                className="btn btn-ghost"
                style={{ width: "100%" }}
                onClick={() => setShowConsent(false)}
              >
                {t("app.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
