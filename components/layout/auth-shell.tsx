'use client';

import type { PropsWithChildren } from 'react';

export default function AuthShell({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <section className="relative flex flex-1 flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-950 via-slate-950 to-slate-900 p-8 text-white lg:min-h-screen lg:px-16">
          <div className="absolute inset-0 opacity-40 blur-3xl bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.45),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.16),_transparent_18%)]" />
          <div className="relative z-10 flex max-w-md flex-col gap-6">
            <div className="space-y-4">
              <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.28em] text-violet-200">
                Social network
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Share moments. Build community.
              </h1>
              <p className="max-w-xl text-slate-300">
                A sleek, responsive social media experience with
                polished interactions, live previews, and a modern
                dashboard vibe.
              </p>
            </div>
            <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/5 p-4">
                Fast onboarding and modern account flow.
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                Designed for creators, teams, and social builders.
              </div>
            </div>
          </div>
          <p className="relative z-10 text-sm text-slate-400">
            Built with Next.js, Tailwind CSS, shadcn-inspired UI, and
            motion-ready components.
          </p>
        </section>

        <section className="flex flex-1 items-center justify-center bg-slate-950 p-8 sm:p-12">
          <div className="w-full max-w-md">{children}</div>
        </section>
      </div>
    </main>
  );
}
