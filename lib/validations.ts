import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(2, 'Enter your email or username'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
});

export const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Add your full name'),
    email: z.string().email('Enter a valid email'),
    username: z.string().min(3, 'Choose a username'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email'),
});

export const postSchema = z.object({
  content: z.string().max(280, 'Write a shorter post'),
  audience: z.enum(['public', 'friends', 'private']),
  scheduledAt: z.string().optional(),
});
