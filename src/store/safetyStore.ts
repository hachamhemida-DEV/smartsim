import { create } from "zustand";
import type { ConsentRecord, AuditLogEntry, SosEvent } from "../types/models";

interface SafetyState {
  /** Location sharing consent */
  consent: ConsentRecord | null;
  grantConsent: () => void;
  revokeConsent: () => void;

  /** Active SOS event */
  activeSos: SosEvent | null;
  triggerSos: () => void;
  cancelSos: () => void;
  resolveSos: () => void;

  /** Audit log — visible to tourist and written by authority */
  auditLog: AuditLogEntry[];
  addAuditEntry: (entry: AuditLogEntry) => void;

  /** SOS history for authority view */
  sosHistory: SosEvent[];
}

export const useSafetyStore = create<SafetyState>((set, get) => ({
  consent: null,

  grantConsent: () =>
    set({
      consent: {
        id: "consent-loc-1",
        userId: "user-tourist-1",
        purpose: "location_sharing",
        granted: true,
        grantedAt: new Date().toISOString(),
        visibleTo: ["tourist-police"],
        retentionPeriod: "72 hours after trip ends",
      },
    }),

  revokeConsent: () =>
    set((state) => ({
      consent: state.consent
        ? {
            ...state.consent,
            granted: false,
            revokedAt: new Date().toISOString(),
          }
        : null,
      // Also clear any active SOS when consent is revoked
      activeSos: state.activeSos
        ? { ...state.activeSos, status: "cancelled" }
        : null,
    })),

  activeSos: null,

  triggerSos: () => {
    const sos: SosEvent = {
      id: `sos-${Date.now()}`,
      userId: "user-tourist-1",
      userName: "Marie Dubois",
      status: "active",
      triggeredAt: new Date().toISOString(),
      lat: 36.365,
      lng: 6.615,
    };
    set((state) => ({
      activeSos: sos,
      sosHistory: [...state.sosHistory, sos],
    }));
  },

  cancelSos: () =>
    set((state) => {
      const updated = state.activeSos
        ? { ...state.activeSos, status: "cancelled" as const, resolvedAt: new Date().toISOString() }
        : null;
      return {
        activeSos: null,
        sosHistory: state.sosHistory.map((s) =>
          s.id === updated?.id ? updated : s
        ),
      };
    }),

  resolveSos: () =>
    set((state) => {
      const updated = state.activeSos
        ? { ...state.activeSos, status: "resolved" as const, resolvedAt: new Date().toISOString() }
        : null;
      return {
        activeSos: null,
        sosHistory: state.sosHistory.map((s) =>
          s.id === updated?.id ? updated : s
        ),
      };
    }),

  auditLog: [],
  addAuditEntry: (entry) =>
    set((state) => ({
      auditLog: [entry, ...state.auditLog],
    })),

  sosHistory: [],
}));
