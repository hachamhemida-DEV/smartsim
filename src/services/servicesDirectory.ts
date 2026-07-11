/**
 * Services Directory — mock
 * Real endpoint: GET /api/v1/services?type={type}
 * Real endpoint: GET /api/v1/services/{id}
 * Real endpoint: POST /api/v1/bookings
 */
import { MOCK } from "../constants";
import { simulateDelay } from "./mockDelay";
import { partners, services } from "../data/seedData";
import type { Partner, Service, Booking } from "../types/models";

export async function getPartners(type?: Partner["type"]): Promise<Partner[]> {
  if (MOCK) {
    await simulateDelay();
    return type ? partners.filter((p) => p.type === type) : partners;
  }
  throw new Error("Real API not implemented");
}

export async function getServices(type?: Service["type"]): Promise<(Service & { partner: Partner })[]> {
  if (MOCK) {
    await simulateDelay();
    const filtered = type ? services.filter((s) => s.type === type) : services;
    return filtered.map((s) => ({
      ...s,
      partner: partners.find((p) => p.id === s.partnerId)!,
    }));
  }
  throw new Error("Real API not implemented");
}

export async function getServiceById(id: string): Promise<(Service & { partner: Partner }) | null> {
  if (MOCK) {
    await simulateDelay();
    const svc = services.find((s) => s.id === id);
    if (!svc) return null;
    return { ...svc, partner: partners.find((p) => p.id === svc.partnerId)! };
  }
  throw new Error("Real API not implemented");
}

export async function createBooking(serviceId: string): Promise<Booking> {
  if (MOCK) {
    await simulateDelay();
    return {
      id: `bk-${Date.now()}`,
      userId: "user-tourist-1",
      serviceId,
      partnerId: services.find((s) => s.id === serviceId)?.partnerId || "",
      status: "confirmed",
      date: new Date(Date.now() + 86400000).toISOString(),
      createdAt: new Date().toISOString(),
    };
  }
  throw new Error("Real API not implemented");
}
