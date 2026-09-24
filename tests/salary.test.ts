import { describe, expect, it } from 'vitest';
import { formatSalary } from '../src/lib/salary';

describe('formatSalary', () => {
  it('renders a range', () => {
    expect(formatSalary(140000, 160000)).toBe('$140,000 – $160,000 AUD');
  });

  it('renders a single figure when max is absent', () => {
    expect(formatSalary(150000)).toBe('$150,000 AUD');
  });

  it('collapses an equal min and max', () => {
    expect(formatSalary(150000, 150000)).toBe('$150,000 AUD');
  });
});
