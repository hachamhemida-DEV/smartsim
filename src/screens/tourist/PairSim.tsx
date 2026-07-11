import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../i18n/i18n";
import { useAppStore } from "../../store/appStore";
import { ScanLine, Keyboard, Smartphone, CheckCircle2, Info } from "lucide-react";

export function PairSim() {
  const { t } = useTranslation();
  const { setSimPaired, setPairedIccid } = useAppStore();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"choose" | "manual" | "scan" | "esim" | "done">("choose");
  const [iccid, setIccid] = useState("");

  const handlePair = () => {
    if (iccid.length >= 10) {
      setPairedIccid(iccid);
      setSimPaired(true);
      setMode("done");
      setTimeout(() => navigate("/tourist/home"), 1500);
    }
  };

  return (
    <div className="page" style={{ background: "var(--surface)" }}>
      <div className="page-header">
        <h1 className="page-title">{t("sim.pairTitle")}</h1>
      </div>

      <div className="page-content animate-fade-in">
        {mode === "done" ? (
          <div style={{ textAlign: "center", padding: "var(--space-2xl) 0" }}>
            <CheckCircle2 size={56} color="var(--verdigris)" style={{ marginBlockEnd: "var(--space-md)" }} />
            <h2>{t("sim.paired")}</h2>
            <p className="font-mono" style={{ color: "var(--copper)", marginBlockStart: "var(--space-sm)", fontSize: "0.875rem" }}>
              ICCID: {iccid}
            </p>
          </div>
        ) : mode === "choose" ? (
          <div style={{ display: "grid", gap: "var(--space-md)", maxWidth: "24rem", margin: "0 auto" }}>
            <button
              className="card"
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "var(--space-md)", textAlign: "start" }}
              onClick={() => setMode("scan")}
            >
              <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: "rgba(165, 90, 42, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ScanLine size={22} color="var(--copper)" />
              </div>
              <div>
                <h4 style={{ fontWeight: 600 }}>{t("sim.scanQR")}</h4>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Camera-based QR scan</p>
              </div>
            </button>

            <button
              className="card"
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "var(--space-md)", textAlign: "start" }}
              onClick={() => setMode("manual")}
            >
              <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: "rgba(165, 90, 42, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Keyboard size={22} color="var(--copper)" />
              </div>
              <div>
                <h4 style={{ fontWeight: 600 }}>{t("sim.typeICCID")}</h4>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{t("sim.iccidPlaceholder")}</p>
              </div>
            </button>

            <button
              className="card"
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "var(--space-md)", textAlign: "start" }}
              onClick={() => setMode("esim")}
            >
              <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: "rgba(165, 90, 42, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Smartphone size={22} color="var(--copper)" />
              </div>
              <div>
                <h4 style={{ fontWeight: 600 }}>{t("sim.esim")}</h4>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>eSIM digital activation</p>
              </div>
            </button>
          </div>
        ) : mode === "manual" ? (
          <div style={{ display: "grid", gap: "var(--space-lg)", maxWidth: "24rem", margin: "0 auto" }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setMode("choose")}>
              ← {t("app.back")}
            </button>
            <div>
              <label className="input-label">{t("sim.iccidLabel")}</label>
              <input
                className="input font-mono"
                value={iccid}
                onChange={(e) => setIccid(e.target.value.replace(/\D/g, "").slice(0, 19))}
                placeholder="8921300000000000001"
                style={{ color: "var(--copper)", letterSpacing: "0.1em" }}
                inputMode="numeric"
              />
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBlockStart: "var(--space-xs)" }}>
                {t("sim.iccidPlaceholder")}
              </p>
            </div>
            <button className="btn btn-copper btn-lg" style={{ width: "100%" }} onClick={handlePair} disabled={iccid.length < 10}>
              {t("sim.pairButton")}
            </button>
          </div>
        ) : mode === "scan" ? (
          <div style={{ display: "grid", gap: "var(--space-lg)", maxWidth: "24rem", margin: "0 auto" }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setMode("choose")}>
              ← {t("app.back")}
            </button>
            {/* Simulated scanner area */}
            <div style={{
              aspectRatio: "1", background: "var(--rhumel)", borderRadius: "var(--radius-lg)",
              display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                width: "60%", height: "60%", border: "2px solid var(--copper)",
                borderRadius: "var(--radius-md)", opacity: 0.7,
              }} />
              <div style={{
                position: "absolute", bottom: "var(--space-md)",
                color: "var(--text-inverse)", fontSize: "0.8125rem", textAlign: "center",
              }}>
                {t("sim.scanFallback")}
              </div>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", textAlign: "center" }}>
              {t("sim.scanFallback")}
            </p>
            <button className="btn btn-secondary" onClick={() => setMode("manual")}>
              {t("sim.typeICCID")}
            </button>
          </div>
        ) : (
          /* eSIM mode */
          <div style={{ display: "grid", gap: "var(--space-lg)", maxWidth: "24rem", margin: "0 auto" }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setMode("choose")}>
              ← {t("app.back")}
            </button>

            {/* Simulated eSIM QR */}
            <div style={{
              display: "flex", justifyContent: "center", padding: "var(--space-xl)",
              background: "white", borderRadius: "var(--radius-lg)", border: "2px dashed var(--copper)",
            }}>
              <div style={{
                width: 160, height: 160, background: "var(--rhumel)", borderRadius: "var(--radius-sm)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ScanLine size={48} color="var(--copper)" />
              </div>
            </div>

            <div className="banner banner-amber">
              <Info size={16} style={{ flexShrink: 0, marginBlockStart: 2 }} />
              <span>{t("sim.esimNote")}</span>
            </div>

            <button className="btn btn-secondary" onClick={() => setMode("manual")}>
              {t("sim.typeICCID")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
