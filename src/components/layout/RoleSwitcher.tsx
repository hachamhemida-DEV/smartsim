import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import { useTranslation } from "../../i18n/i18n";
import { ROLES, type Role } from "../../constants";
import { Users, Briefcase, Shield, Building2, ChevronDown } from "lucide-react";

const ROLE_ICONS: Record<Role, typeof Users> = {
  tourist: Users,
  partner: Briefcase,
  admin: Building2,
  authority: Shield,
};

const ROLE_ROUTES: Record<Role, string> = {
  tourist: "/tourist",
  partner: "/partner",
  admin: "/admin",
  authority: "/authority",
};

export function RoleSwitcher() {
  const { role, setRole } = useAppStore();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const Icon = ROLE_ICONS[role];

  return (
    <div className="role-switcher" ref={ref}>
      <button
        className="role-switcher-toggle"
        onClick={() => setOpen(!open)}
        aria-label={t("roles.switchRole")}
      >
        <Icon size={14} />
        <span>{t(`roles.${role}`)}</span>
        <ChevronDown size={12} style={{ transform: open ? "rotate(180deg)" : undefined, transition: "var(--transition-fast)" }} />
      </button>

      {open && (
        <div className="role-switcher-menu">
          {ROLES.map((r) => {
            const RIcon = ROLE_ICONS[r];
            return (
              <button
                key={r}
                className={`role-switcher-item ${r === role ? "active" : ""}`}
                onClick={() => {
                  setRole(r);
                  navigate(ROLE_ROUTES[r]);
                  setOpen(false);
                }}
              >
                <RIcon size={16} />
                <span>{t(`roles.${r}`)}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
