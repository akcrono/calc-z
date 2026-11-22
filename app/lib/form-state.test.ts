import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formStateFromParams, formStateToQuery, type FormState } from './form-state.ts';

const EMPTY: FormState = {
  rate: '',
  amount: '',
  needed: '',
  includePredators: false,
  predatorLevel: 180,
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

// An old shared link must not add a bonus the user has no visible way to
// turn off.
test('formStateFromParams ignores predators=1 while predators are hidden', () => {
  assert.equal(parse('predators=1&predatorLevel=190').includePredators, false);
});

test('formStateFromParams keeps a known predator level', () => {
  assert.equal(parse('predatorLevel=200').predatorLevel, 200);
});

test('formStateFromParams falls back to level 180 for an unknown predator level', () => {
  assert.equal(parse('predatorLevel=999').predatorLevel, 180);
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

test('formStateToQuery writes the predator level only when predators are on', () => {
  assert.deepEqual(
    [
      formStateToQuery({ ...EMPTY, predatorLevel: 190 }),
      formStateToQuery({ ...EMPTY, includePredators: true, predatorLevel: 190 }),
    ],
    ['', 'predators=1&predatorLevel=190']
  );
});

test('formStateToQuery output parses back to the same state', () => {
  const state: FormState = { ...EMPTY, rate: '120', amount: '4300', needed: '25000', includeQuickObtain: true };
  assert.deepEqual(parse(formStateToQuery(state)), state);
});
