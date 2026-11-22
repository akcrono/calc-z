// Explicit .ts extension so Node's test runner can resolve this import.
import { PREDATOR_LEVELS, PREDATORS_AVAILABLE, type PredatorLevel } from './calc.ts';

export interface FormState {
  rate: string;
  amount: string;
  needed: string;
  includePredators: boolean;
  predatorLevel: PredatorLevel;
  includeQuickObtain: boolean;
}

const DEFAULT_PREDATOR_LEVEL: PredatorLevel = 180;

export function formStateFromParams(params: Pick<URLSearchParams, 'get'>): FormState {
  const level = Number(params.get('predatorLevel')) as PredatorLevel;
  return {
    rate: params.get('rate') ?? '',
    amount: params.get('amount') ?? '',
    needed: params.get('needed') ?? '',
    // Gated so an old shared link carrying ?predators=1 can't add a bonus the
    // user has no visible way to turn off.
    includePredators: PREDATORS_AVAILABLE && params.get('predators') === '1',
    predatorLevel: PREDATOR_LEVELS.includes(level) ? level : DEFAULT_PREDATOR_LEVEL,
    includeQuickObtain: params.get('quickObtain') === '1',
  };
}

export function formStateToQuery(state: FormState): string {
  const params = new URLSearchParams();
  if (state.rate) params.set('rate', state.rate);
  if (state.amount) params.set('amount', state.amount);
  if (state.needed) params.set('needed', state.needed);
  if (state.includePredators) {
    params.set('predators', '1');
    params.set('predatorLevel', String(state.predatorLevel));
  }
  if (state.includeQuickObtain) params.set('quickObtain', '1');
  return params.toString();
}
