'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Facebook, Globe, Apple } from 'lucide-react';
import { toast } from 'sonner';
import AuthShell from '@/components/layout/auth-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema } from '@/lib/validations';
import { login } from '@/services/auth-service';
import type { AuthCredentials } from '@/types/auth';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentials>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: AuthCredentials) {
    setIsSubmitting(true);
    try {
      await login(values);
      toast.success('Welcome back! Redirecting to dashboard.');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Unable to sign in. Check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell>
      <div className="space-y-6 rounded-3xl bg-slate-900/90 p-8 shadow-soft">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.24em] text-violet-300">
            Sign in
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Login to your account
          </h1>
          <p className="text-slate-400">
            Enter your credentials or continue with a social account.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="identifier">Email or username</Label>
            <Input
              id="identifier"
              type="text"
              placeholder="you@example.com"
              {...register('identifier')}
            />
            {errors.identifier && (
              <p className="mt-2 text-sm text-rose-400">
                {errors.identifier.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-violet-300 hover:text-violet-200"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Your password"
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

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Signing in…' : 'Log in'}
          </Button>
        </form>

        <div className="space-y-3">
          <p className="text-center text-sm uppercase tracking-[0.24em] text-slate-500">
            or continue with
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Button type="button" variant="outline" className="gap-2">
              <Globe className="h-4 w-4" /> Google
            </Button>
            <Button type="button" variant="outline" className="gap-2">
              <Apple className="h-4 w-4" /> Apple
            </Button>
            <Button type="button" variant="outline" className="gap-2">
              <Facebook className="h-4 w-4" /> Facebook
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-slate-400">
          Don’t have an account?{' '}
          <Link
            href="/signup"
            className="font-semibold text-violet-300 hover:text-violet-200"
          >
            Create one
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
