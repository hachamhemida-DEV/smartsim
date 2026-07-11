import { useState, useEffect } from "react";
import { useTranslation } from "../../i18n/i18n";
import { getTransactions, getBalance } from "../../services/walletService";
import type { WalletTransaction } from "../../types/models";
import { Wallet as WalletIcon, ArrowUpCircle, ArrowDownCircle, CreditCard, AlertTriangle } from "lucide-react";

export function TouristWallet() {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showTopUp, setShowTopUp] = useState(false);

  useEffect(() => {
    Promise.all([getTransactions(), getBalance()]).then(([txs, bal]) => {
      setTransactions(txs);
      setBalance(bal);
      setLoading(false);
    });
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">
          <WalletIcon size={22} style={{ display: "inline", verticalAlign: "middle", marginInlineEnd: "var(--space-sm)" }} />
          {t("wallet.title")}
        </h1>
      </div>

      <div className="page-content" style={{ display: "grid", gap: "var(--space-lg)" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-2xl)" }}>
            <div className="spinner" />
          </div>
        ) : (
          <>
            {/* Balance card */}
            <div className="card card-dark" style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.8125rem", color: "rgba(232,234,228,0.6)" }}>{t("wallet.balance")}</p>
              <p className="font-mono" style={{ fontSize: "2rem", fontWeight: 700, color: "var(--verdigris-light)" }}>
                {balance.toLocaleString()} <span style={{ fontSize: "0.875rem" }}>DZD</span>
              </p>
              <button
                className="btn btn-primary btn-sm"
                style={{ marginBlockStart: "var(--space-md)" }}
                onClick={() => setShowTopUp(true)}
              >
                <ArrowUpCircle size={16} />
                {t("wallet.topUp")}
              </button>
            </div>

            {/* Transaction history */}
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBlockEnd: "var(--space-md)" }}>
                {t("wallet.history")}
              </h3>
              <div style={{ display: "grid", gap: "var(--space-sm)" }}>
                {transactions.map((tx) => (
                  <div key={tx.id} className="card" style={{ padding: "var(--space-md)", display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: tx.type === "topup" ? "rgba(62, 140, 126, 0.1)" : "rgba(224, 163, 46, 0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      {tx.type === "topup"
                        ? <ArrowUpCircle size={18} color="var(--verdigris)" />
                        : <ArrowDownCircle size={18} color="var(--amber)" />
                      }
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "0.875rem", fontWeight: 500 }}>{tx.description}</p>
                      <p className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                        {new Date(tx.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="font-mono" style={{
                      fontWeight: 600,
                      color: tx.amountDZD > 0 ? "var(--verdigris)" : "var(--text-primary)",
                    }}>
                      {tx.amountDZD > 0 ? "+" : ""}{tx.amountDZD} DZD
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Top-up modal */}
      {showTopUp && (
        <div className="modal-overlay" onClick={() => setShowTopUp(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBlockEnd: "var(--space-lg)" }}>{t("wallet.topUpTitle")}</h3>

            <div style={{ display: "grid", gap: "var(--space-md)", marginBlockEnd: "var(--space-lg)" }}>
              <div>
                <label className="input-label">{t("wallet.amount")}</label>
                <input className="input font-mono" type="number" placeholder="1000" disabled />
              </div>

              <div>
                <label className="input-label">{t("wallet.paymentMethod")}</label>
                <div style={{ display: "grid", gap: "var(--space-sm)" }}>
                  {["cib", "edahabia", "international"].map((method) => (
                    <button
                      key={method}
                      className="card"
                      disabled
                      style={{
                        padding: "var(--space-md)", textAlign: "start", cursor: "not-allowed",
                        opacity: 0.5, display: "flex", alignItems: "center", gap: "var(--space-sm)",
                      }}
                    >
                      <CreditCard size={16} />
                      <span style={{ fontSize: "0.8125rem" }}>{t(`wallet.${method}`)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="banner banner-amber" style={{ marginBlockEnd: "var(--space-md)" }}>
              <AlertTriangle size={14} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: "0.8125rem" }}>{t("wallet.paymentDisabled")}</span>
            </div>

            <button className="btn btn-ghost" style={{ width: "100%" }} onClick={() => setShowTopUp(false)}>
              {t("app.close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
