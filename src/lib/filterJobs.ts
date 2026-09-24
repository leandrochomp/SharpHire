// Shared by the homepage <script> (browser) and Vitest.

export const WORK_TYPES = ['remote', 'hybrid', 'onsite'] as const;
export type WorkType = (typeof WORK_TYPES)[number];

export const WORK_TYPE_LABELS: Record<WorkType, string> = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  onsite: 'On-site',
};

export interface Filters {
  /** State code or "Remote"; empty = any. */
  location: string;
  /** Work type; empty = any. */
  workType: string;
}

export interface Filterable {
  location: string;
  workType: string;
}

export const EMPTY_FILTERS: Filters = { location: '', workType: '' };

/** AND across filters; an empty filter matches everything. */
export function matches(job: Filterable, filters: Filters): boolean {
  return (
    (!filters.location || job.location === filters.location) &&
    (!filters.workType || job.workType === filters.workType)
  );
}

export function filterJobs<T extends Filterable>(jobs: T[], filters: Filters): T[] {
  return jobs.filter((job) => matches(job, filters));
}

/** Read filters from a query string (`?location=VIC&workType=hybrid`). */
export function filtersFromSearch(search: string): Filters {
  const params = new URLSearchParams(search);
  return {
    location: params.get('location') ?? '',
    workType: params.get('workType') ?? '',
  };
}

/** Serialise filters to a query string, omitting empty values ('' when none). */
export function filtersToSearch(filters: Filters): string {
  const params = new URLSearchParams();
  if (filters.location) params.set('location', filters.location);
  if (filters.workType) params.set('workType', filters.workType);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

/** `"1 open role"` / `"3 open roles"`. */
export function countLabel(n: number): string {
  return `${n} open ${n === 1 ? 'role' : 'roles'}`;
}
