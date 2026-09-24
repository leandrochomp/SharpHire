import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { jobSchema } from './lib/jobSchema';

const jobs = defineCollection({
  // `_`-prefixed files are docs/CI fixtures and never published.
  loader: glob({ pattern: '[!_]*.md', base: './src/content/jobs' }),
  schema: jobSchema,
});

export const collections = { jobs };
