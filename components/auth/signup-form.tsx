'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Apple, Facebook, Globe, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import AuthShell from '@/components/layout/auth-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signupSchema } from '@/lib/validations';
import { signup } from '@/services/auth-service';
import type { SignupPayload } from '@/types/auth';
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
} from '../ui/oauth_icons';

type FormValues = SignupPayload & {
  confirmPassword: string;
};

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(signupSchema) });

  async function onSubmit(values: SignupPayload) {
    setIsSubmitting(true);
    try {
      const res = await signup(values);
      if (res.user) {
        toast.success(
          'Account created successfully. Redirecting to dashboard.',
        );

        router.push('/dashboard');
      }
      toast.success(
        'Account created successfully. Redirecting to dashboard.',
      );
      router.push('/dashboard');
    } catch (error) {
      toast.error('Unable to create your account. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell>
      <div className="space-y-6 rounded-3xl p-7 shadow-soft">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-black">
            Create your Account
          </h1>
          <p className="text-slate-400">
            Join the Sictail Media today
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              id="fullName"
              type="text"
              placeholder="Full name"
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="mt-2 text-sm text-rose-400">
                {errors.fullName.message}
              </p>
            )}
          </div>
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
          <div>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              {...register('username')}
            />
            {errors.username && (
              <p className="mt-2 text-sm text-rose-400">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
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
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
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
            {isSubmitting ? 'Creating account…' : 'Sign up'}
          </Button>
        </form>

        <div className="space-y-3">
          <p className="text-center text-sm uppercase tracking-[0.24em] text-slate-500">
            or continue with
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50"
            >
              <GoogleIcon />
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50"
            >
              <AppleIcon />
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50"
            >
              <FacebookIcon />
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{' '}
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
