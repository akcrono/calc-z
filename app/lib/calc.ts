/** The game's daily reset always happens at 22:00 US Eastern time, regardless
 * of the player's own timezone. */
const RESET_TIME_ZONE = 'America/New_York';

export function nextReset(now: Date = new Date()): Date {
  const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
  const nyDate = new Date(now.toLocaleString('en-US', { timeZone: RESET_TIME_ZONE }));
  const offsetMs = utcDate.getTime() - nyDate.getTime();

  let reset = new Date(Date.UTC(nyDate.getFullYear(), nyDate.getMonth(), nyDate.getDate(), 22, 0, 0) + offsetMs);
  if (reset.getTime() <= now.getTime()) {
    reset = new Date(reset.getTime() + 24 * 60 * 60 * 1000);
  }
  return reset;
}

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
  error?: string;
}

export function validateRate(rate: number): ValidationResult {
  if (!Number.isFinite(rate) || rate <= 0) {
    return { valid: false, error: 'Enter a rate greater than 0.' };
  }
  return { valid: true };
}
