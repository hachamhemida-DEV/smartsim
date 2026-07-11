/**
 * Wallet Service — mock
 * Real endpoint: GET /api/v1/wallet/transactions
 * Real endpoint: POST /api/v1/wallet/topup
 */
import { MOCK } from "../constants";
import { simulateDelay } from "./mockDelay";
import { demoTransactions } from "../data/seedData";
import type { WalletTransaction } from "../types/models";

export async function getTransactions(): Promise<WalletTransaction[]> {
  if (MOCK) {
    await simulateDelay();
    return demoTransactions;
  }
  throw new Error("Real API not implemented");
}

export async function getBalance(): Promise<number> {
  if (MOCK) {
    await simulateDelay();
    return demoTransactions.reduce((sum, tx) => sum + tx.amountDZD, 0);
  }
  throw new Error("Real API not implemented");
}

/** Top-up is always disabled in the prototype — payment processing mock */
export async function topUp(_amount: number, _method: string): Promise<never> {
  await simulateDelay();
  throw new Error("Payment processing is disabled in this prototype");
}
