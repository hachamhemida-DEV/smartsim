import { useState } from "react";
import { useTranslation } from "../../i18n/i18n";
import { demoUsers, demoDevices, partners } from "../../data/seedData";
import { phrases } from "../../data/phrases";
import { Building2, Users, Smartphone, BookOpen, BarChart3, FileText, AlertTriangle } from "lucide-react";

type AdminTab = "kpis" | "users" | "simFleet" | "phrasebook" | "consentAudit";

export function AdminDashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<AdminTab>("kpis");

  const tabs: { key: AdminTab; icon: typeof Users; label: string }[] = [
    { key: "kpis", icon: BarChart3, label: t("admin.kpis") },
    { key: "users", icon: Users, label: t("admin.users") },
    { key: "simFleet", icon: Smartphone, label: t("admin.simFleet") },
    { key: "phrasebook", icon: BookOpen, label: t("admin.phrasebook") },
    { key: "consentAudit", icon: FileText, label: t("admin.consentAudit") },
  ];

  return (
    <div className="page" style={{ background: "var(--surface)" }}>
      <div className="page-header" style={{ borderBlockEnd: "1px solid var(--limestone)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
          <Building2 size={24} color="var(--verdigris)" />
          <div>
            <h1 className="page-title">{t("admin.title")}</h1>
            <span className="badge badge-demo">PROTOTYPE</span>
          </div>
        </div>
      </div>

      <div className="page-content" style={{ maxWidth: "48rem", margin: "0 auto" }}>
        <div className="tabs" style={{ marginBlockEnd: "var(--space-lg)" }}>
          {tabs.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              className={`tab ${activeTab === key ? "tab-active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              <Icon size={13} style={{ display: "inline", marginInlineEnd: 4 }} />
              {label}
            </button>
          ))}
        </div>

        {activeTab === "kpis" && <KPIPanel t={t} />}
        {activeTab === "users" && <UsersPanel t={t} />}
        {activeTab === "simFleet" && <SimFleetPanel t={t} />}
        {activeTab === "phrasebook" && <PhrasebookPanel t={t} />}
        {activeTab === "consentAudit" && <ConsentAuditPanel t={t} />}
      </div>
    </div>
  );
}

function KPIPanel({ t }: { t: (k: string) => string }) {
  return (
    <div style={{ display: "grid", gap: "var(--space-lg)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--space-md)" }}>
        <div className="card stat-card">
          <div className="stat-value">{demoUsers.length}</div>
          <div className="stat-label">{t("admin.totalUsers")}</div>
          <span className="badge badge-demo" style={{ marginBlockStart: "var(--space-sm)" }}>{t("app.demoData")}</span>
        </div>
        <div className="card stat-card">
          <div className="stat-value">{demoDevices.filter((d) => d.status === "active").length}</div>
          <div className="stat-label">{t("admin.activeDevices")}</div>
          <span className="badge badge-demo" style={{ marginBlockStart: "var(--space-sm)" }}>{t("app.demoData")}</span>
        </div>
        <div className="card stat-card">
          <div className="stat-value">{partners.length}</div>
          <div className="stat-label">{t("admin.partners")}</div>
          <span className="badge badge-demo" style={{ marginBlockStart: "var(--space-sm)" }}>{t("app.demoData")}</span>
        </div>
      </div>

      {/* KPI Projections — labelled as projections */}
      <div className="card" style={{ border: "1px solid var(--amber)", background: "rgba(224, 163, 46, 0.03)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", marginBlockEnd: "var(--space-md)" }}>
          <AlertTriangle size={16} color="var(--amber)" />
          <h4 style={{ fontWeight: 600, color: "var(--amber)" }}>{t("app.projection")}</h4>
        </div>

        <div style={{ display: "grid", gap: "var(--space-lg)" }}>
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, marginBlockEnd: "var(--space-xs)" }}>
              {t("admin.mauTarget")}
            </p>
            <p className="font-mono" style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--verdigris)" }}>
              10,000 MAU
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              {t("admin.mauProjection")}
            </p>
          </div>

          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, marginBlockEnd: "var(--space-xs)" }}>
              {t("admin.revenue5yr")}
            </p>
            <p className="font-mono" style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--verdigris)" }}>
              ~480M DZD
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              {t("admin.revenueProjection")}
            </p>
          </div>

          <p style={{ fontSize: "0.6875rem", color: "var(--text-secondary)", fontStyle: "italic", borderBlockStart: "1px solid var(--limestone)", paddingBlockStart: "var(--space-sm)" }}>
            {t("admin.projectionSource")}
          </p>
        </div>
      </div>
    </div>
  );
}

function UsersPanel({ t }: { t: (k: string) => string }) {
  return (
    <div className="card" style={{ overflow: "auto" }}>
      <table className="audit-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Passport</th>
            <th>Role</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {demoUsers.map((user) => (
            <tr key={user.id}>
              <td style={{ fontWeight: 500 }}>{user.fullName}</td>
              <td className="font-mono">{user.passportNumber}</td>
              <td><span className="badge badge-verdigris">{user.role}</span></td>
              <td>{user.language.toUpperCase()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SimFleetPanel({ t }: { t: (k: string) => string }) {
  return (
    <div className="card" style={{ overflow: "auto" }}>
      <table className="audit-table">
        <thead>
          <tr>
            <th>ICCID</th>
            <th>Type</th>
            <th>Status</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {demoDevices.map((dev) => (
            <tr key={dev.id}>
              <td className="font-mono" style={{ color: "var(--copper)" }}>{dev.iccid}</td>
              <td><span className="badge badge-copper">{dev.kind}</span></td>
              <td><span className={`badge ${dev.status === "active" ? "badge-verdigris" : "badge-demo"}`}>{dev.status}</span></td>
              <td className="font-mono" style={{ fontSize: "0.75rem" }}>{dev.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PhrasebookPanel({ t }: { t: (k: string) => string }) {
  return (
    <div style={{ display: "grid", gap: "var(--space-sm)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBlockEnd: "var(--space-sm)" }}>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          {phrases.length} phrases across 6 situations
        </p>
        <button className="btn btn-primary btn-sm">
          + {t("admin.addPhrase")}
        </button>
      </div>
      {phrases.slice(0, 8).map((phrase) => (
        <div key={phrase.id} className="card" style={{ padding: "var(--space-md)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span className="badge badge-verdigris" style={{ marginBlockEnd: "var(--space-xs)" }}>{phrase.situation}</span>
              <p style={{ fontSize: "0.875rem", fontWeight: 500 }}>{phrase.source.en}</p>
              <p style={{ fontSize: "0.8125rem", color: "var(--verdigris-dark)" }}>{phrase.contextual.ar}</p>
            </div>
            <button className="btn btn-ghost btn-sm">{t("admin.editPhrase")}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ConsentAuditPanel({ t }: { t: (k: string) => string }) {
  return (
    <div style={{ textAlign: "center", padding: "var(--space-2xl)", color: "var(--text-secondary)" }}>
      <FileText size={32} style={{ opacity: 0.2, marginBlockEnd: "var(--space-md)" }} />
      <p>{t("admin.consentAudit")}</p>
      <p style={{ fontSize: "0.8125rem", marginBlockStart: "var(--space-sm)" }}>
        Consent records will appear here as tourists grant/revoke permissions.
      </p>
    </div>
  );
}
