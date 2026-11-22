import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculate, isValidRate, nextReset, quickObtainBonus } from './calc.ts';

test('nextReset stays at 02:00 UTC during US daylight saving time', () => {
  assert.equal(nextReset(new Date('2026-07-29T12:00:00Z')).toISOString(), '2026-07-30T02:00:00.000Z');
});

test('nextReset stays at 02:00 UTC outside US daylight saving time', () => {
  assert.equal(nextReset(new Date('2026-11-19T12:00:00Z')).toISOString(), '2026-11-20T02:00:00.000Z');
});

test('nextReset returns the same day reset when it is still ahead', () => {
  assert.equal(nextReset(new Date('2026-11-19T01:30:00Z')).toISOString(), '2026-11-19T02:00:00.000Z');
});

test('nextReset rolls to the next day exactly at reset', () => {
  assert.equal(nextReset(new Date('2026-11-19T02:00:00Z')).toISOString(), '2026-11-20T02:00:00.000Z');
});

test('quickObtainBonus adds 15,000 plus one hour of production per use, three times', () => {
  assert.equal(quickObtainBonus(10_000), 75_000);
});

test('quickObtainBonus is the flat yield alone when the rate is zero', () => {
  assert.equal(quickObtainBonus(0), 45_000);
});

test('quickObtainBonus ignores a rate that is not a positive number', () => {
  assert.equal(quickObtainBonus(Number.NaN), 45_000);
});

test('calculate reaches the target sooner by the quick obtain bonus', () => {
  const now = new Date('2026-11-19T12:00:00Z');
  const rate = 10_000;
  const result = calculate({ rate, amount: 100_000 + quickObtainBonus(rate), needed: 275_000, now });
  assert.equal(result.hoursLeft, 10);
});

test('calculate reports the margin against the next reset', () => {
  const now = new Date('2026-11-19T12:00:00Z');
  const result = calculate({ rate: 10_000, amount: 0, needed: 100_000, now });
  assert.deepEqual(result, { hoursLeft: 10, hoursBeforeReset: 14, resetOffset: 4, readyRelation: 'before' });
});

test('calculate flags a target that lands after the reset', () => {
  const now = new Date('2026-11-19T12:00:00Z');
  const result = calculate({ rate: 10_000, amount: 0, needed: 200_000, now });
  assert.equal(result.readyRelation, 'after');
});

test('isValidRate accepts a positive rate', () => {
  assert.equal(isValidRate(120), true);
});

for (const rate of [0, -5, Number.NaN, Number.POSITIVE_INFINITY]) {
  test(`isValidRate rejects ${rate}`, () => {
    assert.equal(isValidRate(rate), false);
  });
}
