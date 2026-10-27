import { z } from 'zod';

// schemas for job types, companies, and jobs
export const jobTypeSchema = z.enum([
  'Full-Time',
  'Part-Time',
  'Remote',
  'Internship',
]);

export const companySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters long'),
  description: z
    .string()
    .min(10, 'Company description must be at least 10 characters long')
    .optional()
    .or(z.literal('')),
  contactEmail: z.string().email('Invalid contact email'),
  contactPhone: z
    .string()
    .startsWith('+', 'Contact phone must start with a plus sign')
    .min(10, 'Contact phone must be at least 10 characters long')
    .regex(
      /^\+\d+$/,
      'Contact phone must contain only numbers after the plus sign',
    )
    .max(15, 'Contact phone must be at most 15 characters long')
    .optional()
    .or(z.literal('')),
  websiteUrl: z.string().url('Invalid website URL').optional().or(z.literal('')),
});

export const jobSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .trim()
    .min(2, 'Job title must be at least 2 characters long'),
  type: jobTypeSchema,
  description: z
    .string()
    .trim()
    .min(10, 'Job description must be at least 10 characters long'),
  location: z.string().min(2, 'Location must be at least 2 characters long'),
  salary: z.string().min(1, 'Salary is required'),
  company: companySchema,
  authorId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const newJobSchema = jobSchema.omit({
  id: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
});
