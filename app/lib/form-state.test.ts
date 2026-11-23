import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formStateFromParams, formStateToQuery, type FormState } from './form-state.ts';

const EMPTY: FormState = {
  rate: '',
  amount: '',
  needed: '',
  includeVampireGuard: false,
  vampireGuardLevel: 330,
  includeQuickObtain: false,
};

function parse(query: string): FormState {
  return formStateFromParams(new URLSearchParams(query));
}

test('formStateFromParams defaults every field when the URL is empty', () => {
  assert.deepEqual(parse(''), EMPTY);
});

test('formStateFromParams reads the three number fields', () => {
  assert.deepEqual(parse('rate=120&amount=4300&needed=25000'), {
    ...EMPTY,
    rate: '120',
    amount: '4300',
    needed: '25000',
  });
});

test('formStateFromParams turns quick obtain on only for quickObtain=1', () => {
  assert.deepEqual(
    [parse('quickObtain=1').includeQuickObtain, parse('quickObtain=true').includeQuickObtain],
    [true, false]
  );
});

test('formStateFromParams turns vampire guard on only for vampireGuard=1', () => {
  assert.deepEqual(
    [parse('vampireGuard=1').includeVampireGuard, parse('vampireGuard=true').includeVampireGuard],
    [true, false]
  );
});

// Predator levels and yields no longer exist, so an old shared link must not
// switch on the option that replaced them.
test('formStateFromParams ignores the old predator params', () => {
  assert.deepEqual(parse('predators=1&predatorLevel=190'), EMPTY);
});

test('formStateFromParams keeps a known vampire guard level', () => {
  assert.equal(parse('vampireGuardLevel=310').vampireGuardLevel, 310);
});

test('formStateFromParams falls back to level 330 for an unknown vampire guard level', () => {
  assert.equal(parse('vampireGuardLevel=999').vampireGuardLevel, 330);
});

test('formStateToQuery is empty when nothing is filled in', () => {
  assert.equal(formStateToQuery(EMPTY), '');
});

test('formStateToQuery writes only the fields that are filled in', () => {
  assert.equal(formStateToQuery({ ...EMPTY, rate: '120', needed: '25000' }), 'rate=120&needed=25000');
});

test('formStateToQuery writes quickObtain=1 when quick obtain is on', () => {
  assert.equal(formStateToQuery({ ...EMPTY, rate: '120', includeQuickObtain: true }), 'rate=120&quickObtain=1');
});

test('formStateToQuery writes the vampire guard level only when vampire guard is on', () => {
  assert.deepEqual(
    [
      formStateToQuery({ ...EMPTY, vampireGuardLevel: 310 }),
      formStateToQuery({ ...EMPTY, includeVampireGuard: true, vampireGuardLevel: 310 }),
    ],
    ['', 'vampireGuard=1&vampireGuardLevel=310']
  );
});

test('formStateToQuery output parses back to the same state', () => {
  const state: FormState = {
    rate: '120',
    amount: '4300',
    needed: '25000',
    includeVampireGuard: true,
    vampireGuardLevel: 340,
    includeQuickObtain: true,
  };
  assert.deepEqual(parse(formStateToQuery(state)), state);
});
