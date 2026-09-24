import { describe, expect, it } from 'vitest';
import { countLabel, EMPTY_FILTERS, filterJobs, filtersFromSearch, filtersToSearch } from '../src/lib/filterJobs';

const jobs = [
  { id: 'a', location: 'NSW', workType: 'hybrid' },
  { id: 'b', location: 'VIC', workType: 'hybrid' },
  { id: 'c', location: 'NSW', workType: 'onsite' },
  { id: 'd', location: 'Remote', workType: 'remote' },
];
const ids = (list: { id: string }[]) => list.map((j) => j.id);

describe('filterJobs', () => {
  it('returns everything with no filters', () => {
    expect(ids(filterJobs(jobs, EMPTY_FILTERS))).toEqual(['a', 'b', 'c', 'd']);
  });

  it('filters by location', () => {
    expect(ids(filterJobs(jobs, { location: 'NSW', workType: '' }))).toEqual(['a', 'c']);
  });

  it('filters by work type', () => {
    expect(ids(filterJobs(jobs, { location: '', workType: 'hybrid' }))).toEqual(['a', 'b']);
  });

  it('combines filters with AND', () => {
    expect(ids(filterJobs(jobs, { location: 'NSW', workType: 'hybrid' }))).toEqual(['a']);
  });

  it('returns an empty list when nothing matches', () => {
    expect(filterJobs(jobs, { location: 'VIC', workType: 'remote' })).toEqual([]);
  });
});

describe('query string round-trip', () => {
  it('parses filters from a query string', () => {
    expect(filtersFromSearch('?location=VIC&workType=hybrid')).toEqual({ location: 'VIC', workType: 'hybrid' });
    expect(filtersFromSearch('')).toEqual(EMPTY_FILTERS);
  });

  it('omits empty filters when serialising', () => {
    expect(filtersToSearch({ location: 'Remote', workType: '' })).toBe('?location=Remote');
    expect(filtersToSearch(EMPTY_FILTERS)).toBe('');
  });
});

describe('countLabel', () => {
  it('pluralises', () => {
    expect(countLabel(0)).toBe('0 open roles');
    expect(countLabel(1)).toBe('1 open role');
    expect(countLabel(3)).toBe('3 open roles');
  });
});
