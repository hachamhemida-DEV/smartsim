import { useState, useEffect } from "react";
import { useTranslation, localized } from "../../i18n/i18n";
import { getServices, createBooking } from "../../services/servicesDirectory";
import type { Service, Partner, Booking } from "../../types/models";
import { MapPin, List, Star, CheckCircle2, Hotel, UtensilsCrossed, Map as MapIcon, Bus, Landmark } from "lucide-react";

type FilterType = "all" | Service["type"];

const TYPE_ICONS: Record<string, typeof Hotel> = {
  accommodation: Hotel,
  dining: UtensilsCrossed,
  tour: MapIcon,
  transport: Bus,
  attraction: Landmark,
};

export function Services() {
  const { t, language } = useTranslation();
  const [view, setView] = useState<"list" | "map">("list");
  const [filter, setFilter] = useState<FilterType>("all");
  const [services, setServices] = useState<(Service & { partner: Partner })[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    setLoading(true);
    getServices(filter === "all" ? undefined : filter).then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, [filter]);

  const handleBook = async (serviceId: string) => {
    const result = await createBooking(serviceId);
    setBooking(result);
  };

  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: t("services.all") },
    { value: "accommodation", label: t("services.hotels") },
    { value: "dining", label: t("services.restaurants") },
    { value: "tour", label: t("services.tours") },
    { value: "transport", label: t("services.transport") },
    { value: "attraction", label: t("services.attractions") },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">{t("services.title")}</h1>
      </div>

      <div className="page-content" style={{ display: "grid", gap: "var(--space-md)" }}>
        {/* View toggle + Filters */}
        <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
          <button
            className={`tab ${view === "list" ? "tab-active" : ""}`}
            onClick={() => setView("list")}
          >
            <List size={14} style={{ display: "inline", marginInlineEnd: 4 }} /> {t("services.list")}
          </button>
          <button
            className={`tab ${view === "map" ? "tab-active" : ""}`}
            onClick={() => setView("map")}
          >
            <MapPin size={14} style={{ display: "inline", marginInlineEnd: 4 }} /> {t("services.map")}
          </button>
        </div>

        <div className="tabs">
          {filters.map(({ value, label }) => (
            <button
              key={value}
              className={`tab ${filter === value ? "tab-active" : ""}`}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-2xl)" }}>
            <div className="spinner" />
          </div>
        ) : view === "map" ? (
          /* Map placeholder — Leaflet would go here but we avoid the import complexity for now */
          <div className="card" style={{
            height: 300, display: "flex", alignItems: "center", justifyContent: "center",
            background: "var(--rhumel)", color: "var(--text-inverse)", borderRadius: "var(--radius-lg)",
          }}>
            <div style={{ textAlign: "center" }}>
              <MapPin size={32} color="var(--verdigris)" style={{ marginBlockEnd: "var(--space-sm)" }} />
              <p>Map view — Constantine area</p>
              <p style={{ fontSize: "0.75rem", opacity: 0.6 }}>{services.length} services available</p>
              <p style={{ fontSize: "0.75rem", opacity: 0.6, marginBlockStart: "var(--space-sm)" }}>
                36.365°N, 6.615°E
              </p>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "var(--space-md)" }}>
            {services.map((svc) => {
              const Icon = TYPE_ICONS[svc.type] || MapPin;
              return (
                <div key={svc.id} className="card animate-fade-in">
                  <div style={{ display: "flex", gap: "var(--space-md)" }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: "var(--radius-md)",
                      background: "var(--limestone)", display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Icon size={24} color="var(--verdigris-dark)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontWeight: 600, marginBlockEnd: 2 }}>{localized(svc.name, language as any)}</h4>
                      <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginBlockEnd: "var(--space-sm)" }}>
                        {svc.partner.name}
                      </p>
                      <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                        {localized(svc.description, language as any)}
                      </p>

                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", marginBlockStart: "var(--space-md)" }}>
                        <span className="font-mono" style={{ fontWeight: 600, color: "var(--verdigris)" }}>
                          {svc.priceDZD.toLocaleString()} DZD
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: "0.8125rem" }}>
                          <Star size={13} color="var(--amber)" fill="var(--amber)" />
                          {svc.partner.rating}
                        </span>
                        <span className="badge badge-verdigris">{t("services.available")}</span>
                      </div>

                      <button
                        className="btn btn-primary btn-sm"
                        style={{ marginBlockStart: "var(--space-md)" }}
                        onClick={() => handleBook(svc.id)}
                      >
                        {t("services.book")}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {services.length === 0 && (
              <p style={{ textAlign: "center", color: "var(--text-secondary)", padding: "var(--space-2xl)" }}>
                {t("app.noResults")}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Booking confirmation modal */}
      {booking && (
        <div className="modal-overlay" onClick={() => setBooking(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: "center" }}>
            <CheckCircle2 size={48} color="var(--verdigris)" style={{ marginBlockEnd: "var(--space-md)" }} />
            <h3 style={{ marginBlockEnd: "var(--space-md)" }}>{t("services.bookingConfirmed")}</h3>
            <div style={{ display: "grid", gap: "var(--space-sm)", textAlign: "start", marginBlockEnd: "var(--space-lg)" }}>
              <p><strong>{t("services.bookingRef")}:</strong> <span className="font-mono">{booking.id}</span></p>
              <p><strong>{t("services.bookingDate")}:</strong> <span className="font-mono">{new Date(booking.date).toLocaleDateString()}</span></p>
            </div>
            <div className="banner banner-amber" style={{ marginBlockEnd: "var(--space-md)" }}>
              <span style={{ fontSize: "0.8125rem" }}>{t("services.bookingSub")}</span>
            </div>
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => setBooking(null)}>
              {t("app.close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
