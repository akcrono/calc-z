export function nextReset(now: Date = new Date()): Date {
  const reset = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 0, 0);
  if (reset.getTime() <= now.getTime()) {
    reset.setDate(reset.getDate() + 1);
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
