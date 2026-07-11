import { NavLink } from "react-router-dom";
import { useTranslation } from "../../i18n/i18n";
import { Home, Languages, MapPin, Shield, Wallet } from "lucide-react";

const NAV_ITEMS = [
  { to: "/tourist/home", icon: Home, label: "nav.home" },
  { to: "/tourist/translate", icon: Languages, label: "nav.translate" },
  { to: "/tourist/services", icon: MapPin, label: "nav.services" },
  { to: "/tourist/safety", icon: Shield, label: "nav.safety" },
  { to: "/tourist/wallet", icon: Wallet, label: "nav.wallet" },
];

export function TouristNav() {
  const { t } = useTranslation();

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `bottom-nav-item ${isActive ? "active" : ""}`
          }
        >
          <Icon />
          <span>{t(label)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
