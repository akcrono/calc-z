// Explicit .ts extension so Node's test runner can resolve this import.
import { VAMPIRE_GUARD_LEVELS, type VampireGuardLevel } from './calc.ts';

export interface FormState {
  rate: string;
  amount: string;
  needed: string;
  includeVampireGuard: boolean;
  vampireGuardLevel: VampireGuardLevel;
  includeQuickObtain: boolean;
}

const DEFAULT_VAMPIRE_GUARD_LEVEL: VampireGuardLevel = 330;

export function formStateFromParams(params: Pick<URLSearchParams, 'get'>): FormState {
  const level = Number(params.get('vampireGuardLevel')) as VampireGuardLevel;
  return {
    rate: params.get('rate') ?? '',
    amount: params.get('amount') ?? '',
    needed: params.get('needed') ?? '',
    includeVampireGuard: params.get('vampireGuard') === '1',
    vampireGuardLevel: VAMPIRE_GUARD_LEVELS.includes(level) ? level : DEFAULT_VAMPIRE_GUARD_LEVEL,
    includeQuickObtain: params.get('quickObtain') === '1',
  };
}

export function formStateToQuery(state: FormState): string {
  const params = new URLSearchParams();
  if (state.rate) params.set('rate', state.rate);
  if (state.amount) params.set('amount', state.amount);
  if (state.needed) params.set('needed', state.needed);
  if (state.includeVampireGuard) {
    params.set('vampireGuard', '1');
    params.set('vampireGuardLevel', String(state.vampireGuardLevel));
  }
  if (state.includeQuickObtain) params.set('quickObtain', '1');
  return params.toString();
}
