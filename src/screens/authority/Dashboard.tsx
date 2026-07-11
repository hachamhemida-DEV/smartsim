import { useState } from "react";
import { useTranslation } from "../../i18n/i18n";
import { useSafetyStore } from "../../store/safetyStore";
import { Shield, AlertTriangle, MapPin, Clock, Lock, Eye } from "lucide-react";

/**
 * Authority Console — restraint is the whole design here.
 * Shows active SOS signals only. No map of all tourists. No bulk view.
 * Viewing location outside active SOS requires an authorisation reference.
 * Every view action is written to the tourist's audit log.
 */
export function AuthorityDashboard() {
  const { t } = useTranslation();
  const { activeSos, consent, auditLog, addAuditEntry, sosHistory } = useSafetyStore();
  const [authRef, setAuthRef] = useState("");
  const [showAuthDialog, setShowAuthDialog] = useState<string | null>(null);
  const [viewedLocations, setViewedLocations] = useState<Set<string>>(new Set());

  const activeSignals = activeSos && consent?.granted ? [activeSos] : [];

  const handleViewLocation = (sosId: string) => {
    if (!authRef.trim()) return;

    // Write to tourist's audit log
    addAuditEntry({
      id: `audit-${Date.now()}`,
      userId: activeSos?.userId || "user-tourist-1",
      accessedBy: "Officer Saïd Mekhloufi",
      accessedByRole: "authority",
      action: "view_location",
      authorisationRef: authRef,
      timestamp: new Date().toISOString(),
      details: `Viewed location during active SOS ${sosId}`,
    });

    setViewedLocations((prev) => new Set([...prev, sosId]));
    setShowAuthDialog(null);
    setAuthRef("");
  };

  return (
    <div className="page" style={{ background: "var(--surface)" }}>
      <div className="page-header" style={{ borderBlockEnd: "1px solid var(--limestone)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
          <Shield size={24} color="var(--rhumel)" />
          <div>
            <h1 className="page-title">{t("authority.title")}</h1>
            <p className="page-subtitle">{t("authority.subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="page-content" style={{ display: "grid", gap: "var(--space-lg)", maxWidth: "40rem", margin: "0 auto" }}>
        {/* Design statement: no bulk view */}
        <div className="banner banner-info">
          <Lock size={14} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: "0.8125rem" }}>
            This console shows active SOS signals only. There is no map of all tourists. There is no bulk view. Location access outside an active SOS requires a documented authorisation reference and is logged in the tourist's personal audit trail.
          </span>
        </div>

        {/* Active SOS signals */}
        {activeSignals.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "var(--space-3xl)",
            color: "var(--text-secondary)",
          }}>
            <Shield size={48} style={{ opacity: 0.15, marginBlockEnd: "var(--space-md)" }} />
            <h3 style={{ fontWeight: 500, marginBlockEnd: "var(--space-sm)" }}>{t("authority.noSignals")}</h3>
            <p style={{ fontSize: "0.875rem" }}>{t("authority.noSignalsSub")}</p>
          </div>
        ) : (
          activeSignals.map((sos) => (
            <div key={sos.id} className="card" style={{
              border: "2px solid var(--amber)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", insetBlockStart: 0, insetInlineStart: 0, insetInlineEnd: 0,
                height: 3, background: "var(--amber)", animation: "pulse 1.5s infinite",
              }} />

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBlockEnd: "var(--space-md)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
                  <AlertTriangle size={20} color="var(--amber)" />
                  <div>
                    <h4 style={{ fontWeight: 600 }}>{sos.userName}</h4>
                    <p className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                      ID: {sos.userId}
                    </p>
                  </div>
                </div>
                <span className="badge badge-amber">{sos.status.toUpperCase()}</span>
              </div>

              <div style={{ display: "flex", gap: "var(--space-lg)", marginBlockEnd: "var(--space-md)", fontSize: "0.8125rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)" }}>
                  <Clock size={14} />
                  {t("authority.triggeredAt")}: <span className="font-mono">{new Date(sos.triggeredAt).toLocaleTimeString()}</span>
                </span>
              </div>

              {viewedLocations.has(sos.id) ? (
                <div className="card" style={{ background: "var(--limestone)", padding: "var(--space-md)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", marginBlockEnd: "var(--space-sm)" }}>
                    <MapPin size={16} color="var(--verdigris)" />
                    <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Location visible</span>
                  </div>
                  <p className="font-mono" style={{ fontSize: "0.8125rem" }}>
                    Lat: {sos.lat?.toFixed(4)} | Lng: {sos.lng?.toFixed(4)}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBlockStart: "var(--space-sm)" }}>
                    Constantine, near Pont Sidi M'Cid
                  </p>
                </div>
              ) : (
                <button
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={() => setShowAuthDialog(sos.id)}
                >
                  <Eye size={16} />
                  {t("authority.viewLocation")}
                </button>
              )}
            </div>
          ))
        )}

        {/* Recent SOS history (resolved) */}
        {sosHistory.filter((s) => s.status !== "active").length > 0 && (
          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBlockEnd: "var(--space-md)", color: "var(--text-secondary)" }}>
              Recent history
            </h3>
            {sosHistory.filter((s) => s.status !== "active").map((sos) => (
              <div key={sos.id} className="card" style={{ padding: "var(--space-md)", marginBlockEnd: "var(--space-sm)", opacity: 0.6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.875rem" }}>{sos.userName}</span>
                  <span className="badge badge-demo">{sos.status}</span>
                </div>
                <p className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  {new Date(sos.triggeredAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Auth reference dialog */}
      {showAuthDialog && (
        <div className="modal-overlay" onClick={() => setShowAuthDialog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBlockEnd: "var(--space-md)" }}>
              <Lock size={18} style={{ display: "inline", verticalAlign: "middle", marginInlineEnd: "var(--space-sm)" }} />
              {t("authority.authRefRequired")}
            </h3>

            <div className="banner banner-amber" style={{ marginBlockEnd: "var(--space-md)" }}>
              <Eye size={14} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: "0.8125rem" }}>{t("authority.authRefNote")}</span>
            </div>

            <div style={{ marginBlockEnd: "var(--space-lg)" }}>
              <label className="input-label">{t("authority.authRefRequired")}</label>
              <input
                className="input font-mono"
                value={authRef}
                onChange={(e) => setAuthRef(e.target.value)}
                placeholder={t("authority.authRefPlaceholder")}
                autoFocus
              />
            </div>

            <div style={{ display: "grid", gap: "var(--space-sm)" }}>
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={() => handleViewLocation(showAuthDialog)}
                disabled={!authRef.trim()}
              >
                <Eye size={16} />
                {t("authority.authRefSubmit")}
              </button>
              <button className="btn btn-ghost" style={{ width: "100%" }} onClick={() => setShowAuthDialog(null)}>
                {t("app.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
