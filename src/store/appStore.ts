import { create } from "zustand";
import type { Role, Language } from "../constants";

interface AppState {
  /** Current demo role */
  role: Role;
  setRole: (role: Role) => void;

  /** Simulated offline mode for demo */
  isOfflineDemo: boolean;
  setOfflineDemo: (v: boolean) => void;

  /** Whether user has "registered" in the demo */
  isRegistered: boolean;
  setRegistered: (v: boolean) => void;

  /** Whether a SIM is paired */
  isSimPaired: boolean;
  setSimPaired: (v: boolean) => void;

  /** Paired ICCID */
  pairedIccid: string;
  setPairedIccid: (v: string) => void;

  /** Current user's chosen language (separate from i18n for demo flexibility) */
  userLanguage: Language;
  setUserLanguage: (lang: Language) => void;
}

export const useAppStore = create<AppState>((set) => ({
  role: "tourist",
  setRole: (role) => set({ role }),

  isOfflineDemo: false,
  setOfflineDemo: (isOfflineDemo) => set({ isOfflineDemo }),

  isRegistered: false,
  setRegistered: (isRegistered) => set({ isRegistered }),

  isSimPaired: false,
  setSimPaired: (isSimPaired) => set({ isSimPaired }),

  pairedIccid: "",
  setPairedIccid: (pairedIccid) => set({ pairedIccid }),

  userLanguage: "fr",
  setUserLanguage: (userLanguage) => set({ userLanguage }),
}));
