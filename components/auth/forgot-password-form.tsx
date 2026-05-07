'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import AuthShell from '@/components/layout/auth-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPasswordSchema } from '@/lib/validations';
import { sendResetLink } from '@/services/auth-service';

type FormValues = {
  email: string;
};

export default function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      await sendResetLink(values.email);
      toast.success(
        'Password reset link has been sent. Check your email.',
      );
    } catch (error) {
      toast.error('Unable to send reset link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell>
      <div className="space-y-6 rounded-3xl p-8 py-16 shadow-soft">
        <div className="space-y-2 mb-[70px]">
          <h1 className="text-3xl font-semibold text-black text-center">
            Reset your password
          </h1>
          <p className="text-slate-400">
            Enter the email associated with your account, and we’ll
            send reset instructions.
          </p>
        </div>

        <form
          className="space-y-7 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-rose-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Sending link…' : 'Send reset link'}
          </Button>
        </form>

        <p className="text-center text-sm pt-12 text-slate-400">
          Remembered your password?{' '}
          <Link
            href="/"
            className="font-semibold text-violet-500 hover:text-violet-200"
          >
            Log in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
