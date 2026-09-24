import { describe, expect, it } from 'vitest';
import { formatDateAU, isOpen, todayInSydney } from '../src/lib/dates';

// Frontmatter `closingDate: 2026-10-31` parses to UTC midnight.
const closing = new Date('2026-10-31');

describe('todayInSydney', () => {
  it('uses the Sydney calendar day, not UTC', () => {
    // 20:00 UTC on 30 Oct = 07:00 AEDT on 31 Oct
    expect(todayInSydney(new Date('2026-10-30T20:00:00Z'))).toBe('2026-10-31');
  });
});

describe('isOpen', () => {
  it('is open before the closing day', () => {
    expect(isOpen(closing, new Date('2026-10-29T00:00:00Z'))).toBe(true);
  });

  it('stays open through the whole closing day in Sydney', () => {
    // 23:59 AEDT on 31 Oct = 12:59 UTC on 31 Oct
    expect(isOpen(closing, new Date('2026-10-31T12:59:00Z'))).toBe(true);
  });

  it('closes at Sydney midnight after the closing day', () => {
    // 00:00 AEDT on 1 Nov = 13:00 UTC on 31 Oct
    expect(isOpen(closing, new Date('2026-10-31T13:00:00Z'))).toBe(false);
  });

  it('is not pulled early by the UTC build clock', () => {
    // 01:00 AEDT on 31 Oct = 14:00 UTC on 30 Oct: still the closing day in Sydney
    expect(isOpen(closing, new Date('2026-10-30T14:00:00Z'))).toBe(true);
  });
});

describe('formatDateAU', () => {
  it('renders DD/MM/YYYY', () => {
    expect(formatDateAU(closing)).toBe('31/10/2026');
    expect(formatDateAU(new Date('2027-01-05'))).toBe('05/01/2027');
  });
});
