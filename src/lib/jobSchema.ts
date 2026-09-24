// Job frontmatter schema. Lives outside content.config.ts so Vitest can
// exercise it without the astro:content virtual module.
import { z } from 'astro/zod';
import { LOCATION_PATTERN, REMOTE } from './location';
import { WORK_TYPES } from './filterJobs';

const salary = z.number().int().nonnegative();

export const jobSchema = z
  .object({
    title: z.string().min(1),
    company: z.string().min(1),
    location: z.string().regex(LOCATION_PATTERN, 'Use "City, STATE" (e.g. "Melbourne, VIC") or "Remote"'),
    salaryMinAUD: salary,
    salaryMaxAUD: salary.optional(),
    workType: z.enum(WORK_TYPES),
    techStack: z.array(z.string().min(1)),
    // Validity only: expiry is a build-time filter, never a validation error,
    // so old files can stay in the repo as history.
    closingDate: z.coerce.date(),
  })
  .superRefine((job, ctx) => {
    if (job.salaryMaxAUD !== undefined && job.salaryMaxAUD < job.salaryMinAUD) {
      ctx.addIssue({
        code: 'custom',
        path: ['salaryMaxAUD'],
        message: 'salaryMaxAUD must be >= salaryMinAUD',
      });
    }
    if (job.location === REMOTE && job.workType !== 'remote') {
      ctx.addIssue({
        code: 'custom',
        path: ['workType'],
        message: 'location "Remote" requires workType "remote"; hybrid/onsite roles must name a city',
      });
    }
  });

export type Job = z.infer<typeof jobSchema>;
