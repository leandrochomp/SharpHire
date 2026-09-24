import { getCollection } from 'astro:content';
import { isOpen } from './dates';

/** Jobs still open at build time, closing soonest first. */
export async function getOpenJobs() {
  const jobs = await getCollection('jobs', ({ data }) => isOpen(data.closingDate));
  return jobs.sort(
    (a, b) =>
      a.data.closingDate.getTime() - b.data.closingDate.getTime() ||
      a.data.title.localeCompare(b.data.title),
  );
}
