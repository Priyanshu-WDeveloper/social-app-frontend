'use client';

import { Button } from '@/components/ui/button';

import { usePostStore } from '@/store/post-store';
import { Calendar, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { publishPost } from '../../../services/post-service';
import { toast } from 'sonner';

export default function PreviewStep() {
  const { content, media, setStep, resetPost } = usePostStore();
  const [publishing, setPublishing] = useState(false);

  // const handlePublish = async () => {
  //   const payload = {
  //     content,
  //     media,
  //   };
  //   setPublishing(true);
  //   // setDraft({ ...values, isDraft: false });
  //   try {
  //     const res = await publishPost(payload);
  //     // await publishPost({
  //     //   content,
  //     //   audience,
  //     //   feeling,
  //     //   location,
  //     //   pollQuestion,
  //     //   scheduledAt,
  //     //   media,
  //     //   isDraft: false,
  //     // });
  //     console.log(
  //       '\n===================== 🟢 res =====================',
  //     );
  //     console.log(res);
  //     console.log(
  //       '=================================================\n',
  //     );
  //     toast.success('Post published successfully.');
  //     resetPost();
  //   } catch {
  //     toast.error('Unable to publish post.');
  //   } finally {
  //     setPublishing(false);
  //   }
  // };
  const handlePublish = async () => {
    if (!content.trim() && media.length === 0) {
      toast.error('Post must contain text or media.');

      return;
    }

    setPublishing(true);

    try {
      const payload = {
        content: content.trim(),

        media: media.map((item) => ({
          id: item.id,
          fileId: item.fileId,
          url: item.url,
          thumbnailUrl: item.thumbnailUrl || '',
          type: item.type,
          width: item.width || null,
          height: item.height || null,
          size: item.size || 0,
          mimeType: item.mimeType || '',
          provider: 'imagekit',
        })),
      };

      const res = await publishPost(payload);

      console.log(
        '\n===================== 🟢 res =====================',
      );

      console.log(res);

      console.log(
        '=================================================\n',
      );

      toast.success('Post published successfully.');

      resetPost();
    } catch (error) {
      console.error(error);

      toast.error('Unable to publish post.');
    } finally {
      setPublishing(false);
    }
  };
  return (
    // <div className="flex h-full flex-col bg-white">
    <div className="flex h-[90vh] min-h-0 flex-col bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Post Preview
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Review your post before publishing.
        </p>
      </div>

      {/* Preview */}
      <div
        className="
    flex-1
    overflow-y-auto
    bg-slate-50
    p-8
    scrollbar-thin
    scrollbar-thumb-slate-300
    scrollbar-track-transparent
  "
      >
        <div
          className="
          mx-auto
         max-w-xl
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
          "
        >
          {/* User */}
          <div className="flex items-center gap-3 p-5">
            <div className="h-12 w-12 rounded-full bg-violet-200" />

            <div>
              <h3 className="font-semibold text-slate-900">
                John Doe
              </h3>

              <p className="text-sm text-slate-500">@johndoe</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 pb-5">
            <p className="whitespace-pre-wrap text-slate-700">
              {content || 'Your post preview appears here...'}
            </p>
          </div>

          {/* Media */}
          {media.length > 0 && (
            // <div className="grid grid-cols-2 gap-1">
            <div className="mt-4 overflow-hidden rounded-2xl">
              {media.map((item) => (
                <div key={item.id}>
                  {item.type === 'video' ? (
                    <video
                      src={item.url}
                      controls
                      className="max-h-[420px] w-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt="media"
                      className="max-h-[420px] w-full object-cover"
                    />
                  )}

                  <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
                    <button className="text-sm text-slate-500">
                      ❤️ 128
                    </button>

                    <button className="text-sm text-slate-500">
                      💬 32
                    </button>

                    <button className="text-sm text-slate-500">
                      🔁 20
                    </button>

                    <button className="text-sm text-slate-500">
                      🔖 Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Schedule post
            </h4>
          </div>

          <button
            className="
        relative
        h-6
        w-11
        rounded-full
        bg-slate-200
        transition
      "
          >
            <span
              className="
          absolute
          left-1
          top-1
          h-4
          w-4
          rounded-full
          bg-white
          shadow-sm
        "
            />
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div
            className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-3
      "
          >
            <span className="text-sm text-slate-700">
              May 20, 2024
            </span>

            <Calendar className="h-4 w-4 text-slate-400" />
          </div>

          <div
            className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-3
      "
          >
            <span className="text-sm text-slate-700">10:00 AM</span>

            <Clock className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
        flex
        items-center
        justify-between
        border-t
        border-slate-200
        p-6
        "
      >
        <Button
          variant="outline"
          onClick={() => setStep(2)}
          className="rounded-xl"
        >
          Back
        </Button>

        <Button
          onClick={handlePublish}
          className="
    inline-flex
    items-center
    gap-2
    rounded-xl
    bg-violet-600
    px-8
    text-white
    hover:bg-violet-700
  "
        >
          Post
          <Send className="h-4 w-4 pt-1" />
        </Button>
      </div>
    </div>
  );
}
