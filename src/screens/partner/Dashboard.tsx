import { useState } from "react";
import { useTranslation, localized } from "../../i18n/i18n";
import { services, partners } from "../../data/seedData";
import { Briefcase, Package, Calendar, ScanLine, CheckCircle2, ToggleLeft, ToggleRight } from "lucide-react";

export function PartnerDashboard() {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<"offers" | "bookings" | "activate">("offers");
  const [simActivated, setSimActivated] = useState(false);

  const partnerServices = services.filter((s) => s.partnerId === "partner-1" || s.partnerId === "partner-2");

  return (
    <div className="page" style={{ background: "var(--surface)" }}>
      <div className="page-header" style={{ borderBlockEnd: "1px solid var(--limestone)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
          <Briefcase size={24} color="var(--verdigris)" />
          <div>
            <h1 className="page-title">{t("partner.title")}</h1>
            <p className="page-subtitle">Hôtel Cirta — Constantine</p>
          </div>
        </div>
      </div>

      <div className="page-content" style={{ maxWidth: "40rem", margin: "0 auto" }}>
        {/* Tabs */}
        <div className="tabs" style={{ marginBlockEnd: "var(--space-lg)" }}>
          {(["offers", "bookings", "activate"] as const).map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "tab-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "offers" && <Package size={13} style={{ display: "inline", marginInlineEnd: 4 }} />}
              {tab === "bookings" && <Calendar size={13} style={{ display: "inline", marginInlineEnd: 4 }} />}
              {tab === "activate" && <ScanLine size={13} style={{ display: "inline", marginInlineEnd: 4 }} />}
              {t(`partner.${tab === "activate" ? "activateSim" : tab}`)}
            </button>
          ))}
        </div>

        {activeTab === "offers" && (
          <div style={{ display: "grid", gap: "var(--space-md)" }}>
            {partnerServices.map((svc) => (
              <div key={svc.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontWeight: 600 }}>{localized(svc.name, language as any)}</h4>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                    {localized(svc.description, language as any)}
                  </p>
                  <span className="font-mono" style={{ fontSize: "0.875rem", color: "var(--verdigris)", fontWeight: 600 }}>
                    {svc.priceDZD.toLocaleString()} DZD
                  </span>
                </div>
                <button className="btn btn-icon btn-ghost" aria-label={t("partner.manageAvailability")}>
                  {svc.available ? <ToggleRight size={24} color="var(--verdigris)" /> : <ToggleLeft size={24} />}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "bookings" && (
          <div style={{ textAlign: "center", padding: "var(--space-2xl)", color: "var(--text-secondary)" }}>
            <Calendar size={32} style={{ opacity: 0.2, marginBlockEnd: "var(--space-md)" }} />
            <p>{t("partner.noBookings")}</p>
          </div>
        )}

        {activeTab === "activate" && (
          <div style={{ display: "grid", gap: "var(--space-lg)", textAlign: "center" }}>
            {simActivated ? (
              <div style={{ padding: "var(--space-2xl)" }}>
                <CheckCircle2 size={56} color="var(--verdigris)" style={{ marginBlockEnd: "var(--space-md)" }} />
                <h3>{t("partner.activated")}</h3>
                <p className="font-mono" style={{ color: "var(--copper)", marginBlockStart: "var(--space-sm)" }}>
                  ICCID: 8921300000000000003
                </p>
              </div>
            ) : (
              <>
                <div style={{
                  width: 200, height: 200, margin: "0 auto",
                  background: "var(--rhumel)", borderRadius: "var(--radius-lg)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <ScanLine size={56} color="var(--copper)" />
                </div>
                <p style={{ color: "var(--text-secondary)" }}>{t("partner.scanGuest")}</p>
                <button className="btn btn-copper btn-lg" onClick={() => setSimActivated(true)}>
                  {t("partner.confirmActivation")}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
