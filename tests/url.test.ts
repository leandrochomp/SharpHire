import { describe, expect, it } from 'vitest';
import { withBase } from '../src/lib/url';

describe('withBase', () => {
  it('joins base and path with exactly one slash', () => {
    expect(withBase('jobs/x/', '/SharpHire')).toBe('/SharpHire/jobs/x/');
    expect(withBase('/jobs/x/', '/SharpHire/')).toBe('/SharpHire/jobs/x/');
    expect(withBase('/', '/')).toBe('/');
  });
});
