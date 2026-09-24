import { describe, expect, it } from 'vitest';
import { LOCATION_PATTERN, locationKey, locationOptions } from '../src/lib/location';

describe('LOCATION_PATTERN', () => {
  it.each(['Sydney, NSW', 'North Sydney, NSW', 'Hobart, TAS', 'Remote'])('accepts %s', (loc) => {
    expect(LOCATION_PATTERN.test(loc)).toBe(true);
  });

  it.each(['Sydney NSW', 'sydney, nsw', 'Auckland, NZ', 'remote', 'Remote Australia', 'Sydney, NSW, Australia'])(
    'rejects %s',
    (loc) => {
      expect(LOCATION_PATTERN.test(loc)).toBe(false);
    },
  );
});

describe('locationKey', () => {
  it('maps to the state code or Remote', () => {
    expect(locationKey('Melbourne, VIC')).toBe('VIC');
    expect(locationKey('Remote')).toBe('Remote');
  });
});

describe('locationOptions', () => {
  it('lists present keys in canonical order with Remote last', () => {
    expect(locationOptions(['Remote', 'Perth, WA', 'Sydney, NSW', 'Newcastle, NSW'])).toEqual(['NSW', 'WA', 'Remote']);
  });
});
