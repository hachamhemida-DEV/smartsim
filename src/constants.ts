/**
 * Smart Sim DZ — Global Constants
 */

/** Master mock flag. Set to false when connecting real APIs. */
export const MOCK = true;

// VERIFY real Algerian emergency numbers before any live demo
export const EMERGENCY_NUMBERS = "—";

/** Demo passport format — obviously fake */
export const DEMO_PASSPORT_FORMAT = "XX-000-DEMO";

/** Simulated network delay range (ms) */
export const MOCK_DELAY_MIN = 200;
export const MOCK_DELAY_MAX = 400;

/** Plan durations offered */
export const PLAN_DURATIONS = [7, 15, 30] as const;

/** Supported languages */
export const LANGUAGES = ["en", "fr", "ar"] as const;
export type Language = (typeof LANGUAGES)[number];

/** User roles */
export const ROLES = ["tourist", "partner", "admin", "authority"] as const;
export type Role = (typeof ROLES)[number];

/** Role display names (trilingual) */
export const ROLE_LABELS: Record<Role, Record<Language, string>> = {
  tourist: { en: "Tourist", fr: "Touriste", ar: "سائح" },
  partner: { en: "Partner", fr: "Partenaire", ar: "شريك" },
  admin: { en: "Admin", fr: "Admin", ar: "مسؤول" },
  authority: { en: "Authority", fr: "Autorité", ar: "سلطة" },
};
