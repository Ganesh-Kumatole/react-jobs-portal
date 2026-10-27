import { z } from 'zod';
import {
  companySchema,
  jobSchema,
  jobTypeSchema,
  newJobSchema,
} from '../lib/schemas';

// inferred types for job-types, companies, and jobs
export type JobType = z.infer<typeof jobTypeSchema>;
export type Company = z.infer<typeof companySchema>;
export type Job = z.infer<typeof jobSchema>;
export type NewJob = z.infer<typeof newJobSchema>;
