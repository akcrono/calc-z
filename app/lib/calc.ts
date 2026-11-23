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

/** Holy Water from a single Vampire Guard kill, by guard level. Only these
 * levels exist. */
const VAMPIRE_GUARD_YIELDS = {
  300: 60000,
  310: 64000,
  320: 68000,
  330: 72000,
  340: 76000,
};
export type VampireGuardLevel = keyof typeof VAMPIRE_GUARD_YIELDS;
export const VAMPIRE_GUARD_LEVELS = Object.keys(VAMPIRE_GUARD_YIELDS).map(Number) as VampireGuardLevel[];

/** The cap rises to 5 on Sundays, but Sundays also bring other one-off
 * sources that this calculator doesn't model, so the weekday cap is used
 * every day. */
export const VAMPIRE_GUARD_KILLS_PER_DAY = 2;

export function vampireGuardBonus(level: VampireGuardLevel): number {
  return VAMPIRE_GUARD_KILLS_PER_DAY * VAMPIRE_GUARD_YIELDS[level];
}

/** Each Quick Obtain use grants a flat amount plus one hour of the player's
 * own production, and the uses refresh at the daily reset. */
export const QUICK_OBTAIN_USES_PER_DAY = 3;
const QUICK_OBTAIN_FLAT_YIELD = 15000;

export function isValidRate(rate: number): boolean {
  return Number.isFinite(rate) && rate > 0;
}

export function quickObtainBonus(rate: number): number {
  const hourOfProduction = isValidRate(rate) ? rate : 0;
  return QUICK_OBTAIN_USES_PER_DAY * (QUICK_OBTAIN_FLAT_YIELD + hourOfProduction);
}

export interface CalcInput {
  rate: number;
  amount: number;
  needed: number;
  now?: Date;
}

export interface CalcResult {
  hoursLeft: number;
  hoursBeforeReset: number;
  resetOffset: number;
  readyRelation: 'before' | 'after';
}

export function calculate({ rate, amount, needed, now = new Date() }: CalcInput): CalcResult {
  const hoursLeft = (needed - amount) / rate;
  const hoursBeforeReset = (nextReset(now).getTime() - now.getTime()) / (1000 * 60 * 60);
  const resetOffset = hoursBeforeReset - hoursLeft;

  return {
    hoursLeft,
    hoursBeforeReset,
    resetOffset,
    readyRelation: resetOffset < 0 ? 'after' : 'before',
  };
}
