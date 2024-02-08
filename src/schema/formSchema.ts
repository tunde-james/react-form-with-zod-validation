import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(25, 'Name is too long'),
  email: z.string().email('Invalid email address').trim(),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(14, { message: 'Phone number cannot exceed 14 digits' })
    .trim(),
  address: z.string().min(15, 'Address must be at least 15 characters long'),
  dateOfBirth: z.coerce
    .date()
    .min(new Date('1900-01-01'), { message: 'Pick a valid date' })
    .max(new Date('2022-12-01'), {
      message: 'You must be at least 18 years old',
    }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters long')
    .max(100, { message: 'Password is too long' }),
  subscribe: z.boolean().optional(),
});
