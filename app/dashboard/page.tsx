'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Card from '@/components/ui/card';

export default function DashboardHomePage() {
  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <Card className="p-6 bg-slate-900/80">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-violet-300">
                Home
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white">
                Welcome back, Avery.
              </h1>
              <p className="mt-2 text-slate-400 max-w-2xl">
                Create beautiful posts, preview activity, and keep
                your feed polished with live updates.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-3xl bg-violet-500/10 px-4 py-3 text-violet-200 shadow-soft">
              <Sparkles className="h-5 w-5" />
              Trending in feed
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 bg-slate-900/90">
          <h2 className="text-xl font-semibold text-white">
            Quick actions
          </h2>
          <p className="mt-3 text-slate-400">
            Jump into a new post, review drafts, or check your
            mentions.
          </p>
        </Card>
        <Card className="p-6 bg-slate-900/90">
          <h2 className="text-xl font-semibold text-white">
            Workspace overview
          </h2>
          <p className="mt-3 text-slate-400">
            Your social dashboard stays responsive across mobile,
            desktop and tablet.
          </p>
        </Card>
      </div>
    </div>
  );
}
