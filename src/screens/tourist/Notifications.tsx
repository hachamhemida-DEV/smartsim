import { useState, useEffect } from "react";
import { useTranslation, localized } from "../../i18n/i18n";
import { getNotifications, markAsRead } from "../../services/notificationService";
import type { Notification as NotifType } from "../../types/models";
import { Bell, Check, Info, Calendar, Shield, Tag, Settings } from "lucide-react";

const TYPE_ICONS: Record<string, typeof Info> = {
  info: Info,
  booking: Calendar,
  safety: Shield,
  promo: Tag,
  system: Settings,
};

export function Notifications() {
  const { t, language } = useTranslation();
  const [notifications, setNotifications] = useState<NotifType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotifications().then((data) => {
      setNotifications(data);
      setLoading(false);
    });
  }, []);

  const handleMarkRead = async (id: string) => {
    await markAsRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">
          <Bell size={22} style={{ display: "inline", verticalAlign: "middle", marginInlineEnd: "var(--space-sm)" }} />
          {t("notifications.title")}
        </h1>
      </div>

      <div className="page-content" style={{ display: "grid", gap: "var(--space-sm)" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-2xl)" }}>
            <div className="spinner" />
          </div>
        ) : notifications.length === 0 ? (
          <div style={{ textAlign: "center", padding: "var(--space-2xl)", color: "var(--text-secondary)" }}>
            <Bell size={32} style={{ marginBlockEnd: "var(--space-md)", opacity: 0.3 }} />
            <p>{t("notifications.empty")}</p>
          </div>
        ) : (
          notifications.map((notif) => {
            const Icon = TYPE_ICONS[notif.type] || Info;
            return (
              <div
                key={notif.id}
                className="card animate-fade-in"
                style={{
                  padding: "var(--space-md)",
                  opacity: notif.read ? 0.6 : 1,
                  borderInlineStart: notif.read ? "none" : "3px solid var(--verdigris)",
                }}
              >
                <div style={{ display: "flex", gap: "var(--space-md)" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "var(--limestone)", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={16} color="var(--verdigris-dark)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h4 style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                        {localized(notif.title, language as any)}
                      </h4>
                      {!notif.read && (
                        <button
                          className="btn btn-icon btn-ghost"
                          style={{ padding: 4 }}
                          onClick={() => handleMarkRead(notif.id)}
                          aria-label={t("notifications.markRead")}
                        >
                          <Check size={14} />
                        </button>
                      )}
                    </div>
                    <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBlockStart: 2 }}>
                      {localized(notif.body, language as any)}
                    </p>
                    <div style={{ display: "flex", gap: "var(--space-sm)", marginBlockStart: "var(--space-sm)", alignItems: "center" }}>
                      <span className="badge badge-demo">{t(`notifications.${notif.type}`)}</span>
                      <span className="font-mono" style={{ fontSize: "0.6875rem", color: "var(--text-secondary)" }}>
                        {new Date(notif.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
