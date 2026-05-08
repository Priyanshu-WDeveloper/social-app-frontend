'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from 'lucide-react';
import { getPosts } from '../../services/post-service';

export default function DashboardHomePage() {
  const [posts, setPosts] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();

        setPosts(data.posts || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-6 bg-slate-50 p-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Feed</h1>

        <p className="mt-2 text-slate-500">Latest community posts</p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
          Loading posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
          No posts found.
        </div>
      ) : (
        posts.map((post) => (
          <motion.div
            key={post._id}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
                  {post.user?.fullName?.[0] || 'U'}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {post.user?.fullName}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>@{post.user?.username}</span>

                    <span>•</span>

                    <span>{post.visibility}</span>

                    <span>•</span>

                    <span>Just now</span>
                  </div>
                </div>
              </div>

              <button className="text-slate-400 transition hover:text-slate-700">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            {post.content && (
              <div className="px-5 pb-4">
                <p className="whitespace-pre-wrap text-[15px] leading-7 text-slate-800">
                  {post.content}
                </p>
              </div>
            )}

            {/* Media */}
            {post.media?.length > 0 && (
              <div className="space-y-1">
                {post.media.map((item: any) => (
                  <div key={item.id} className="overflow-hidden">
                    {item.type === 'video' ? (
                      <video
                        src={item.url}
                        controls
                        className="max-h-[520px] w-full object-cover"
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt="post media"
                        className="max-h-[520px] w-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
              <button className="flex items-center gap-2 text-slate-500 transition hover:text-pink-500">
                <Heart className="h-5 w-5" />

                <span className="text-sm">
                  {post.likesCount || 128}
                </span>
              </button>

              <button className="flex items-center gap-2 text-slate-500 transition hover:text-blue-500">
                <MessageCircle className="h-5 w-5" />

                <span className="text-sm">
                  {post.commentsCount || 32}
                </span>
              </button>

              <button className="flex items-center gap-2 text-slate-500 transition hover:text-green-500">
                <Share2 className="h-5 w-5" />

                <span className="text-sm">
                  {post.sharesCount || 20}
                </span>
              </button>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
