/**
 * Smart Sim DZ — Data Models
 * All 12 core types used across the platform.
 */

export interface User {
  id: string;
  fullName: string;
  /** Formatted as XX-000-DEMO — obviously fake for demo */
  passportNumber: string;
  language: "en" | "fr" | "ar";
  role: "tourist" | "partner" | "admin" | "authority";
  createdAt: string;
  email?: string;
  phone?: string;
}

export interface Device {
  id: string;
  userId: string;
  iccid: string;
  /**
   * 'sim' — physical prepaid SIM card
   * 'esim' — embedded SIM (eSIM profile)
   * 'bracelet' — future low-tech safety bracelet for visitors without smartphones.
   *   The project plans this as a BLE-paired wearable that can trigger SOS
   *   without a phone screen. The prototype data model accepts it now so that
   *   no schema migration is needed when bracelet UI is built later.
   */
  kind: "sim" | "esim" | "bracelet";
  status: "inactive" | "active" | "expired" | "suspended";
  activatedAt?: string;
  expiresAt?: string;
  planId?: string;
}

export interface Plan {
  id: string;
  name: string;
  durationDays: 7 | 15 | 30;
  dataGB: number;
  callMinutes: number;
  /** Price in DZD */
  priceDZD: number;
  features: string[];
}

export interface Partner {
  id: string;
  name: string;
  type: "hotel" | "agency" | "restaurant" | "transport" | "site";
  address: string;
  city: string;
  lat: number;
  lng: number;
  rating: number;
  imageUrl?: string;
  description?: Record<string, string>;
}

export interface Service {
  id: string;
  partnerId: string;
  name: Record<string, string>;
  description: Record<string, string>;
  type: "accommodation" | "tour" | "dining" | "transport" | "attraction";
  priceDZD: number;
  imageUrl?: string;
  available: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  partnerId: string;
  status: "pending" | "confirmed" | "cancelled";
  date: string;
  createdAt: string;
  notes?: string;
}

export interface PhraseEntry {
  id: string;
  situation: "arrival" | "transport" | "hotel" | "restaurant" | "shopping" | "emergency";
  /** The phrase in the tourist's language */
  source: Record<string, string>;
  /** What a general machine translator returns */
  literal: Record<string, string>;
  /** What a person actually says in this context — Algerian pragmatics */
  contextual: Record<string, string>;
  /** Why the contextual version is different — register, gesture, cultural note */
  note: Record<string, string>;
  /** Tags for search/filter */
  tags: string[];
}

export interface ConsentRecord {
  id: string;
  userId: string;
  purpose: "location_sharing" | "data_processing" | "marketing";
  granted: boolean;
  grantedAt?: string;
  revokedAt?: string;
  /** Who can see the data */
  visibleTo: string[];
  /** How long data is retained */
  retentionPeriod: string;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  /** Who accessed the data */
  accessedBy: string;
  accessedByRole: "authority" | "admin";
  action: "view_location" | "view_profile" | "respond_sos";
  /** Authorisation reference (required for authority access) */
  authorisationRef?: string;
  timestamp: string;
  details?: string;
}

export interface SosEvent {
  id: string;
  userId: string;
  userName: string;
  status: "active" | "responded" | "cancelled" | "resolved";
  triggeredAt: string;
  resolvedAt?: string;
  lat?: number;
  lng?: number;
  respondedBy?: string;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: "consumption" | "topup";
  amountDZD: number;
  description: string;
  date: string;
  method?: "cib" | "edahabia" | "international";
}

export interface Notification {
  id: string;
  userId: string;
  title: Record<string, string>;
  body: Record<string, string>;
  type: "info" | "booking" | "safety" | "promo" | "system";
  read: boolean;
  createdAt: string;
}
