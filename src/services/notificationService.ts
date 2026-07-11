/**
 * Notification Service — mock
 * Real endpoint: GET /api/v1/notifications
 * Real endpoint: POST /api/v1/notifications/push (server-side)
 *
 * Note: iOS requires home-screen installation for Web Push.
 * The service worker is registered but push delivery is simulated from demo controls.
 */
import { MOCK } from "../constants";
import { simulateDelay } from "./mockDelay";
import { demoNotifications } from "../data/seedData";
import type { Notification } from "../types/models";

let notifications = [...demoNotifications];

export async function getNotifications(): Promise<Notification[]> {
  if (MOCK) {
    await simulateDelay();
    return notifications;
  }
  throw new Error("Real API not implemented");
}

export async function markAsRead(id: string): Promise<void> {
  if (MOCK) {
    await simulateDelay();
    notifications = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    return;
  }
  throw new Error("Real API not implemented");
}

/** Simulate a push notification arriving — used from demo controls */
export async function simulatePush(): Promise<Notification> {
  if (MOCK) {
    await simulateDelay();
    const notif: Notification = {
      id: `notif-${Date.now()}`,
      userId: "user-tourist-1",
      title: {
        en: "New offer near you!",
        fr: "Nouvelle offre près de vous !",
        ar: "عرض جديد بالقرب منك!",
      },
      body: {
        en: "Restaurant El Bey has a special lunch menu today.",
        fr: "Le Restaurant El Bey propose un menu spécial déjeuner aujourd'hui.",
        ar: "مطعم الباي يقدم قائمة غداء خاصة اليوم.",
      },
      type: "promo",
      read: false,
      createdAt: new Date().toISOString(),
    };
    notifications = [notif, ...notifications];
    return notif;
  }
  throw new Error("Real API not implemented");
}
