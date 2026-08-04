/** Formats a duration given in hours as "Xd Xh Xm". Days/hours segments are
 * omitted when zero (minutes are always shown). Matches the Claude Design
 * handoff's prototype algorithm exactly, including its rounding: if the
 * rounded minutes hit 60, they roll over into hours — but that carry does
 * NOT cascade into days (so e.g. 23.9999 hours renders as "24h 0m", not
 * "1d 0h 0m"). This is a faithful port of the approved design, not a fix. */
export function formatDuration(totalHours: number): string {
  const days = Math.floor(totalHours / 24);
  let hours = Math.floor(totalHours - days * 24);
  let minutes = Math.round((totalHours - days * 24 - hours) * 60);
  if (minutes === 60) {
    minutes = 0;
    hours += 1;
  }
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  return parts.join(' ');
}
