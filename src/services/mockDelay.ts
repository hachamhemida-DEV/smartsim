import { MOCK_DELAY_MIN, MOCK_DELAY_MAX } from "../constants";

/** Simulate network latency (200-400ms) so the UI handles loading states honestly */
export function simulateDelay(): Promise<void> {
  const ms = MOCK_DELAY_MIN + Math.random() * (MOCK_DELAY_MAX - MOCK_DELAY_MIN);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
