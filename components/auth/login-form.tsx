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
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
} from '../ui/oauth_icons';
import { facebookLogin, googleLogin } from './oauth-login';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthCredentials>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
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

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();

      if (res.user) {
        toast.success('Welcome back! Redirecting to dashboard.');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleFacebookLogin = async () => {
    try {
      const res = await facebookLogin();

      if (res.user) {
        toast.success('Welcome back! Redirecting to dashboard.');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthShell>
      <div className="space-y-6 rounded-3xl  p-8 shadow-soft">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-black">
            Welcome Back!
          </h1>
          <p className="text-slate-400 ">
            Login to continue your account.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              id="identifier"
              type="text"
              placeholder="Email or username"
              {...register('identifier')}
            />
            {errors.identifier && (
              <p className="mt-2 text-sm text-rose-400">
                {errors.identifier.message}
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
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-violet-500 hover:text-violet-200"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Signing in…' : 'Log in'}
          </Button>
        </form>

        <div className="space-y-3">
          <p className="text-center text-sm uppercase tracking-[0.24em] text-slate-500">
            or continue with
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              onClick={handleGoogleLogin}
              type="button"
              variant="outline"
              className="h-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50"
            >
              <GoogleIcon />
            </Button>

            {/* <Button
              type="button"
              variant="outline"
              className="h-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50"
            >
              <AppleIcon />
            </Button> */}

            <Button
              onClick={handleFacebookLogin}
              type="button"
              variant="outline"
              className="h-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50"
            >
              <FacebookIcon />
            </Button>
          </div>
        </div>

        <p className="text-center text-sm font-semibold text-slate-400">
          Don’t have an account?{' '}
          <Link
            href="/signup"
            className="font-semibold text-violet-500 hover:text-violet-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
