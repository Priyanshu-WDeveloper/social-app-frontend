'use client';

import { Button } from '@/components/ui/button';

import { usePostStore } from '@/store/post-store';

export default function PreviewStep() {
  const { content, media, setStep } = usePostStore();

  return (
    <div className="flex h-full flex-col bg-white">
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
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        <div
          className="
          mx-auto
          max-w-2xl
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
            <div className="grid grid-cols-2 gap-1">
              {media.map((item, index) => (
                <img
                  key={index}
                  src={item.url}
                  alt="media"
                  className="h-[260px] w-full object-cover"
                />
              ))}
            </div>
          )}
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
          className="
          rounded-xl
          bg-violet-600
          px-8
          text-white
          hover:bg-violet-700
          "
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
