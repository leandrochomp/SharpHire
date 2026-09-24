// Closing dates are calendar days in Australian (Sydney) time. Frontmatter
// `YYYY-MM-DD` values parse as UTC midnight, so we compare ISO date strings
// rather than Date instants to avoid pulling jobs ~10h early.

const SYDNEY_DAY = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Australia/Sydney',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** Today's date in Sydney as `YYYY-MM-DD`. */
export function todayInSydney(now: Date = new Date()): string {
  return SYDNEY_DAY.format(now);
}

/** Calendar date of a frontmatter date as `YYYY-MM-DD`. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** A job is open through the whole of its closing day, Sydney time. */
export function isOpen(closingDate: Date, now: Date = new Date()): boolean {
  return isoDate(closingDate) >= todayInSydney(now);
}

/** Display format for users: `DD/MM/YYYY`. */
export function formatDateAU(date: Date): string {
  const [y, m, d] = isoDate(date).split('-');
  return `${d}/${m}/${y}`;
}
