import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { I18nProvider } from "./i18n/i18n";
import { useAppStore } from "./store/appStore";
import { RoleSwitcher } from "./components/layout/RoleSwitcher";
import { DemoControls } from "./components/layout/DemoControls";
import { TouristNav } from "./components/layout/TouristNav";

// Tourist screens
import { Landing } from "./screens/tourist/Landing";
import { Register } from "./screens/tourist/Register";
import { PairSim } from "./screens/tourist/PairSim";
import { TouristHome } from "./screens/tourist/Home";
import { Translator } from "./screens/tourist/Translator";
import { Phrasebook } from "./screens/tourist/Phrasebook";
import { Safety } from "./screens/tourist/Safety";
import { Services } from "./screens/tourist/Services";
import { TouristWallet } from "./screens/tourist/Wallet";
import { Notifications } from "./screens/tourist/Notifications";

// Other role screens
import { AuthorityDashboard } from "./screens/authority/Dashboard";
import { PartnerDashboard } from "./screens/partner/Dashboard";
import { AdminDashboard } from "./screens/admin/Dashboard";

function AppContent() {
  const role = useAppStore((s) => s.role);

  return (
    <div style={{ position: "relative", minHeight: "100dvh" }}>
      <RoleSwitcher />
      <DemoControls />

      <Routes>
        {/* Tourist PWA routes */}
        <Route path="/tourist" element={<Landing />} />
        <Route path="/tourist/register" element={<Register />} />
        <Route path="/tourist/pair-sim" element={<PairSim />} />
        <Route path="/tourist/home" element={<TouristHome />} />
        <Route path="/tourist/translate" element={<Translator />} />
        <Route path="/tourist/phrasebook" element={<Phrasebook />} />
        <Route path="/tourist/safety" element={<Safety />} />
        <Route path="/tourist/services" element={<Services />} />
        <Route path="/tourist/wallet" element={<TouristWallet />} />
        <Route path="/tourist/notifications" element={<Notifications />} />

        {/* Authority */}
        <Route path="/authority" element={<AuthorityDashboard />} />
        <Route path="/authority/*" element={<AuthorityDashboard />} />

        {/* Partner */}
        <Route path="/partner" element={<PartnerDashboard />} />
        <Route path="/partner/*" element={<PartnerDashboard />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Default redirect based on role */}
        <Route path="*" element={<Navigate to={`/${role}`} replace />} />
      </Routes>

      {/* Bottom nav only for tourist */}
      {role === "tourist" && <TouristNav />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </BrowserRouter>
  );
}
