'use client';

import { useMemo } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Avatar from '@/components/ui/avatar';
import Card from '@/components/ui/card';
import { usePostStore } from '@/store/use-post-store';

export default function PostPreview() {
  const draft = usePostStore((state) => state.draft);

  const counts = useMemo(() => {
    const base = draft.content.length + draft.media.length * 34;
    return {
      likes: Math.max(12, Math.min(420, Math.round(base * 0.7))),
      comments: Math.max(2, Math.min(78, Math.round(base * 0.2))),
      shares: Math.max(1, Math.min(32, Math.round(base * 0.1))),
    };
  }, [draft.content, draft.media.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-slate-900/90">
        <div className="flex items-center gap-4">
          <Avatar src="/avatar.svg" alt="User avatar" />
          <div>
            <p className="text-base font-semibold text-white">
              Avery Quinn
            </p>
            <p className="text-sm text-slate-400">
              @averyq · {draft.audience}
            </p>
          </div>
        </div>
        <p className="mt-5 whitespace-pre-line text-slate-100">
          {draft.content ||
            'Start typing to preview your post content in real time.'}
        </p>

        {draft.media.length > 0 && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {draft.media.map((media) => (
              <div
                key={media.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80"
              >
                {media.type === 'video' ? (
                  <video
                    src={media.url}
                    className="h-52 w-full object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={media.url}
                    alt="Post media preview"
                    className="h-52 w-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-950/70 p-4 text-center">
            <p className="text-xl font-semibold text-white">
              {counts.likes}
            </p>
            <p className="text-sm text-slate-400">Likes</p>
          </div>
          <div className="rounded-3xl bg-slate-950/70 p-4 text-center">
            <p className="text-xl font-semibold text-white">
              {counts.comments}
            </p>
            <p className="text-sm text-slate-400">Comments</p>
          </div>
          <div className="rounded-3xl bg-slate-950/70 p-4 text-center">
            <p className="text-xl font-semibold text-white">
              {counts.shares}
            </p>
            <p className="text-sm text-slate-400">Shares</p>
          </div>
        </div>
      </Card>

      <Card className="rounded-3xl border border-violet-500/20 bg-slate-950/80 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-violet-300">
              Post summary
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              Live audience preview
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-white/5 px-4 py-2 text-sm text-white">
            <Heart className="h-4 w-4 text-pink-400" /> Trending live
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-900/90 p-4">
            <p className="text-sm text-slate-400">Mood</p>
            <p className="mt-2 text-white">
              {draft.feeling || 'None selected'}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900/90 p-4">
            <p className="text-sm text-slate-400">Location</p>
            <p className="mt-2 text-white">
              {draft.location || 'None selected'}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
