'use client';

import { DragEvent, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Calendar,
  ChevronDown,
  ImagePlus,
  MapPin,
  Sparkles,
  Smile,
  Trash2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { usePostStore } from '@/store/use-post-store';
import {
  mockUploadMedia,
  publishPost,
} from '@/services/post-service';
import { postSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

type FormValues = {
  content: string;
  audience: 'public' | 'friends' | 'private';
  feeling: string;
  location: string;
  pollQuestion: string;
  scheduledAt: string;
};

const gifOptions = ['Cozy', 'Celebrate', 'Dream'];

export default function CreatePostForm() {
  const draft = usePostStore((state) => state.draft);
  const setDraft = usePostStore((state) => state.setDraft);
  const resetDraft = usePostStore((state) => state.resetDraft);
  const [selectedGif, setSelectedGif] = useState<string>(
    gifOptions[0],
  );
  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: draft.content,
      audience: draft.audience,
      feeling: draft.feeling,
      location: draft.location,
      pollQuestion: draft.pollQuestion,
      scheduledAt: draft.scheduledAt ?? '',
    },
  });

  const content = watch('content');

  const charCount = content?.length ?? 0;
  const remaining = 280 - charCount;

  const audienceTag = useMemo(() => {
    if (draft.audience === 'private') return 'Private';
    if (draft.audience === 'friends') return 'Friends';
    return 'Public';
  }, [draft.audience]);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    setUploading(true);
    Array.from(files)
      .slice(0, 4)
      .forEach(async (file, index) => {
        try {
          const asset = await mockUploadMedia(file);
          setDraft({ media: [...draft.media, asset] });
          if (index === files.length - 1) {
            toast.success('Media uploaded');
          }
        } catch {
          toast.error('Upload failed');
        } finally {
          setUploading(false);
        }
      });
  }

  async function onSubmit(values: FormValues) {
    setPublishing(true);
    setDraft({ ...values, isDraft: false });
    try {
      await publishPost({ ...draft, ...values, isDraft: false });
      toast.success('Post published successfully.');
      resetDraft();
    } catch {
      toast.error('Unable to publish post.');
    } finally {
      setPublishing(false);
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 rounded-3xl bg-slate-900/90 p-6 shadow-soft"
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Label htmlFor="content">What’s on your mind?</Label>
          <Textarea
            id="content"
            placeholder="Write a post, share a thought, or update the community…"
            {...register('content')}
            onChange={(event) =>
              setDraft({ content: event.target.value })
            }
            value={draft.content}
          />
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>{remaining} characters remaining</span>
            <Badge>{audienceTag}</Badge>
          </div>
          {errors.content && (
            <p className="text-sm text-rose-400">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="feeling">Feeling/activity</Label>
            <Input
              id="feeling"
              placeholder="Feeling excited"
              {...register('feeling')}
              onChange={(event) =>
                setDraft({ feeling: event.target.value })
              }
              value={draft.feeling}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Remote, Home, City"
              {...register('location')}
              onChange={(event) =>
                setDraft({ location: event.target.value })
              }
              value={draft.location}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="pollQuestion">Poll option</Label>
            <Input
              id="pollQuestion"
              placeholder="Ask a question to your audience"
              {...register('pollQuestion')}
              onChange={(event) =>
                setDraft({ pollQuestion: event.target.value })
              }
              value={draft.pollQuestion}
            />
          </div>
          <div>
            <Label htmlFor="audience">Audience</Label>
            <div className="relative">
              <select
                id="audience"
                className="w-full appearance-none rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 pr-10 text-slate-100 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                {...register('audience')}
                value={draft.audience}
                onChange={(event) =>
                  setDraft({
                    audience: event.target.value as
                      | 'public'
                      | 'friends'
                      | 'private',
                  })
                }
              >
                <option value="public">Public</option>
                <option value="friends">Friends</option>
                <option value="private">Private</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-white">
              Media upload
            </p>
            <div className="flex items-center gap-2 text-slate-400">
              <ImagePlus className="h-4 w-4" />{' '}
              {uploading ? 'Uploading…' : 'Drag & drop or browse'}
            </div>
          </div>
          <div
            className="min-h-[170px] rounded-3xl border-2 border-dashed border-violet-500/30 bg-slate-950/80 p-6 text-center transition hover:border-violet-400/60"
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept="image/*,video/*"
              onChange={(event) => handleFiles(event.target.files)}
            />
            <p className="text-sm text-slate-400">
              Drop images or video here, or browse files to upload.
            </p>
          </div>
          {draft.media.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {draft.media.map((asset) => (
                <div
                  key={asset.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80"
                >
                  {asset.type === 'video' ? (
                    <video
                      src={asset.url}
                      className="h-56 w-full object-cover"
                      controls
                    />
                  ) : (
                    <img
                      src={asset.url}
                      alt="Uploaded media"
                      className="h-56 w-full object-cover"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        media: draft.media.filter(
                          (item) => item.id !== asset.id,
                        ),
                      })
                    }
                    className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/90 text-slate-200 transition hover:bg-white/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/80 p-6 text-center text-slate-500">
              No media added yet. Upload images, video, or choose a
              GIF.
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <p>GIF category</p>
            <span className="text-violet-300">{selectedGif}</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {gifOptions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSelectedGif(item)}
                className={`rounded-3xl border px-4 py-3 text-sm transition ${
                  selectedGif === item
                    ? 'border-violet-400 bg-violet-500/10 text-violet-200'
                    : 'border-white/10 text-slate-300 hover:border-violet-400 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="scheduledAt">Schedule</Label>
            <Input
              id="scheduledAt"
              type="datetime-local"
              {...register('scheduledAt')}
              onChange={(event) =>
                setDraft({ scheduledAt: event.target.value })
              }
              value={draft.scheduledAt ?? ''}
            />
          </div>
          <div className="flex items-end justify-end">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => resetDraft()}
            >
              Save draft
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-400">
            Feeling{' '}
            <span className="text-white">{draft.feeling}</span> ·
            Location{' '}
            <span className="text-white">{draft.location}</span>
          </div>
          <Button
            type="submit"
            disabled={publishing}
            className="w-full sm:w-auto"
          >
            {publishing ? 'Publishing…' : 'Publish post'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
