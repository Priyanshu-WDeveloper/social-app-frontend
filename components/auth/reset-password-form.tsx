'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import AuthShell from '@/components/layout/auth-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPasswordSchema } from '@/lib/validations';
import { resetPassword } from '@/services/auth-service';

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch('password', '');
  const passwordStrength =
    password.length > 12
      ? 'Strong'
      : password.length > 8
        ? 'Medium'
        : 'Weak';

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      await resetPassword('mock-token', values.password);
      toast.success('Password updated. Redirecting to login.');
      router.push('/');
    } catch (error) {
      toast.error('Could not reset your password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell>
      <div className="space-y-6 rounded-3xl bg-slate-900/90 p-8 shadow-soft">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.24em] text-violet-300">
            Reset password
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Create a new password
          </h1>
          <p className="text-slate-400">
            Choose a strong password to keep your account secure.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="password">New password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="New password"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-rose-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="confirmPassword">
                Confirm password
              </Label>
              <span className="text-sm text-slate-500">
                Strength: {passwordStrength}
              </span>
            </div>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repeat password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-rose-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Updating password…' : 'Save password'}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-400">
          Back to{' '}
          <Link
            href="/"
            className="font-semibold text-violet-300 hover:text-violet-200"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
