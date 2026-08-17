/** Removes everything except ASCII digits. Used as the `removeFormatting`
 * step for the number inputs, so anything typed or pasted normalizes down
 * to a plain digit string regardless of what characters arrived. */
export function stripToDigits(value: string): string {
  return value.replace(/[^0-9]/g, '');
}

/** Adds comma thousands separators to a digit-only string, e.g.
 * "4300" -> "4,300". Always uses US-style grouping regardless of the
 * app's active locale — fernleaf counts aren't a localized quantity, and
 * a fixed separator avoids "," meaning thousands in some languages and
 * decimal in others.
 *
 * Only ever used as the `format` step for a field while it's *not*
 * focused (see calculator-form.tsx, which swaps in an identity format
 * while focused). Reformatting live, on every keystroke, is what breaks
 * the browser's native undo/redo for the field — an unresolved upstream
 * limitation of react-number-format's default live-formatting mode
 * (https://github.com/s-yadav/react-number-format/issues/645). Keeping
 * the displayed value identical to what was typed while a field is being
 * edited, and only grouping it once the user moves on, sidesteps that
 * entirely. */
export function groupDigits(digits: string): string {
  if (!digits) return '';
  return Number(digits).toLocaleString('en-US');
}
