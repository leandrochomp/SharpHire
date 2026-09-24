const AUD = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

/** `$140,000 – $160,000 AUD`, or `$140,000 AUD` when there is no distinct max. */
export function formatSalary(min: number, max?: number): string {
  if (max === undefined || max === min) return `${AUD.format(min)} AUD`;
  return `${AUD.format(min)} – ${AUD.format(max)} AUD`;
}
