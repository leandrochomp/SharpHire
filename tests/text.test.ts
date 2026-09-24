import { describe, expect, it } from 'vitest';
import { excerpt } from '../src/lib/text';

describe('excerpt', () => {
  it('strips Markdown syntax and keeps hyphenated words', () => {
    expect(excerpt('## About\nWe build **full-stack** tools.\n\n- One [link](https://x.y)')).toBe(
      'We build full-stack tools. One link',
    );
  });

  it('truncates to the limit with an ellipsis', () => {
    const out = excerpt('word '.repeat(100), 20);
    expect(out.length).toBeLessThanOrEqual(20);
    expect(out.endsWith('…')).toBe(true);
  });
});
