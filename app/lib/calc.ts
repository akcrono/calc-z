/** The game's daily reset is pinned to UTC and ignores daylight saving time:
 * 22:00 EDT in summer, 21:00 EST in winter. */
const RESET_HOUR_UTC = 2;

export function nextReset(now: Date = new Date()): Date {
  let reset = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), RESET_HOUR_UTC));
  if (reset.getTime() <= now.getTime()) {
    reset = new Date(reset.getTime() + 24 * 60 * 60 * 1000);
  }
  return reset;
}

/** Seasonal-resource yield from a single predator kill, by predator level.
 * Measured during the fernleaf season. Players can kill this enemy up to
 * twice a day; only these levels exist. */
export const PREDATOR_YIELDS: Record<180 | 190 | 200, number> = {
  180: 68000,
  190: 72000,
  200: 76000,
};
export type PredatorLevel = keyof typeof PREDATOR_YIELDS;
export const PREDATOR_LEVELS = Object.keys(PREDATOR_YIELDS).map(Number) as PredatorLevel[];

/** Predators haven't returned in the Holy Water season, so the option is
 * hidden rather than offering a bonus that doesn't exist. Flip back on if
 * the mechanic comes back. */
export const PREDATORS_AVAILABLE = false;

export interface CalcInput {
  rate: number;
  amount: number;
  needed: number;
  now?: Date;
}

export interface CalcResult {
  leftover: number;
  hoursLeft: number;
  nextResetAt: Date;
  hoursBeforeReset: number;
  resetOffset: number;
  readyRelation: 'before' | 'after';
}

export function calculate({ rate, amount, needed, now = new Date() }: CalcInput): CalcResult {
  const leftover = needed - amount;
  const hoursLeft = leftover / rate;
  const nextResetAt = nextReset(now);
  const hoursBeforeReset = (nextResetAt.getTime() - now.getTime()) / (1000 * 60 * 60);
  const resetOffset = hoursBeforeReset - hoursLeft;

  return {
    leftover,
    hoursLeft,
    nextResetAt,
    hoursBeforeReset,
    resetOffset,
    readyRelation: resetOffset < 0 ? 'after' : 'before',
  };
}

export interface ValidationResult {
  valid: boolean;
  error?: 'rate-must-be-positive';
}

export function validateRate(rate: number): ValidationResult {
  if (!Number.isFinite(rate) || rate <= 0) {
    return { valid: false, error: 'rate-must-be-positive' };
  }
  return { valid: true };
}
