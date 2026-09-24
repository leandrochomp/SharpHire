import { describe, expect, it } from 'vitest';
import { jobSchema } from '../src/lib/jobSchema';
import fixture from '../src/content/jobs/_example-senior-frontend-engineer.md?raw';

const valid = {
  title: 'Senior Frontend Engineer',
  company: 'Acme Pty Ltd',
  location: 'Sydney, NSW',
  salaryMinAUD: 150000,
  salaryMaxAUD: 170000,
  workType: 'hybrid',
  techStack: ['TypeScript'],
  closingDate: '2027-01-31',
};

const errorPaths = (input: unknown) => {
  const result = jobSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((i) => i.path.join('.'));
};

describe('jobSchema', () => {
  it('accepts a valid job', () => {
    expect(errorPaths(valid)).toEqual([]);
  });

  it('accepts a past closing date (expiry is a filter, not a validation error)', () => {
    expect(errorPaths({ ...valid, closingDate: '2020-01-01' })).toEqual([]);
  });

  it('allows salaryMaxAUD to be omitted', () => {
    const { salaryMaxAUD: _, ...noMax } = valid;
    expect(errorPaths(noMax)).toEqual([]);
  });

  it('rejects max below min', () => {
    expect(errorPaths({ ...valid, salaryMaxAUD: 100000 })).toEqual(['salaryMaxAUD']);
  });

  it('rejects non-integer salaries', () => {
    expect(errorPaths({ ...valid, salaryMinAUD: 150000.5 })).toEqual(['salaryMinAUD']);
  });

  it('rejects free-text work types', () => {
    expect(errorPaths({ ...valid, workType: 'flexible' })).toEqual(['workType']);
  });

  it('rejects malformed locations', () => {
    expect(errorPaths({ ...valid, location: 'Sydney' })).toEqual(['location']);
  });

  it('rejects location "Remote" with a non-remote work type', () => {
    expect(errorPaths({ ...valid, location: 'Remote', workType: 'onsite' })).toEqual(['workType']);
  });

  it('allows a remote role tied to a city', () => {
    expect(errorPaths({ ...valid, location: 'Adelaide, SA', workType: 'remote' })).toEqual([]);
  });

  it('rejects invalid dates', () => {
    expect(errorPaths({ ...valid, closingDate: 'soon' })).toEqual(['closingDate']);
  });
});

describe('fixture _example-senior-frontend-engineer.md', () => {
  // Minimal parser for the fixture's flat frontmatter: values are JSON, or a bare date.
  const [, frontmatter] = fixture.match(/^---\n([\s\S]*?)\n---/)!;
  const data = Object.fromEntries(
    frontmatter.split('\n').map((line: string) => {
      const [key, raw] = [line.slice(0, line.indexOf(':')), line.slice(line.indexOf(':') + 1).trim()];
      try {
        return [key, JSON.parse(raw)];
      } catch {
        return [key, raw];
      }
    }),
  );

  it('matches the schema', () => {
    expect(errorPaths(data)).toEqual([]);
  });
});
