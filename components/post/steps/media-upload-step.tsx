'use client';

import { Upload, ImagePlus, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePostStore } from '@/store/post-store';
import MediaGrid from '../media-grid';
import { useRef } from 'react';
import { axiosInstance } from '../../../lib/axios';

export default function MediaUploadStep() {
  const { media, addMedia, setStep } = usePostStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await axiosInstance.post(
          '/api/posts/img-upload',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        );

        if (!data.fileId || !data.url) {
          throw new Error('Invalid upload response from server');
        }

        addMedia({
          id: data.fileId,
          fileId: data.fileId,
          url: data.url,
          thumbnailUrl: data.thumbnailUrl,
          type: file.type.startsWith('video') ? 'video' : 'image',
          width: data.width,
          height: data.height,
          size: data.size,
          mimeType: file.type,
          provider: 'imagekit',
        });

        setTimeout(() => {
          previewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 100);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <div className="flex h-[90vh] overflow-hidden min-h-0 flex-col bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Add Media
        </h2>

        <div className="mt-6 flex items-center gap-10 border-b border-slate-200">
          <button className="border-b-2 border-violet-600 pb-3 text-sm font-semibold text-violet-600">
            Upload
          </button>
          <button className="pb-3 text-sm font-medium text-slate-500 hover:text-slate-900">
            Library
          </button>
          <button className="pb-3 text-sm font-medium text-slate-500 hover:text-slate-900">
            GIF
          </button>
        </div>
      </div>

      {/* Upload Area */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
          onDragOver={(e) => e.preventDefault()}
          className="flex min-h-[280px] w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 transition-all duration-300 hover:border-violet-400 hover:bg-violet-50/30"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <div className="rounded-3xl bg-violet-100 p-6 text-violet-600">
            <Upload className="h-10 w-10" />
          </div>

          <h3 className="mt-6 text-xl font-semibold text-slate-900">
            Drag & drop media here
          </h3>
          <p className="mt-2 text-center text-sm text-slate-500">
            or click to upload
          </p>
          <p className="mt-4 text-xs text-slate-400">
            Supports: JPG, PNG, GIF, MP4, MOV (Max 100MB)
          </p>
        </div>

        {media.length > 0 && (
          <div ref={previewRef} className="mt-8">
            <MediaGrid />
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.accept = 'image/*';
                fileInputRef.current.click();
              }
            }}
            className="flex min-w-0 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-violet-400 hover:bg-violet-50"
          >
            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <ImagePlus className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-semibold text-slate-900">
                Images
              </h4>
              <p className="text-xs text-slate-500">JPG, PNG, WEBP</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.accept = 'video/*';
                fileInputRef.current.click();
              }
            }}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-violet-400 hover:bg-violet-50"
          >
            <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
              <Video className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-semibold text-slate-900">
                Videos
              </h4>
              <p className="text-xs text-slate-500">MP4, MOV</p>
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-200 p-6">
        <Button
          variant="outline"
          onClick={() => setStep(1)}
          className="rounded-xl"
        >
          Cancel
        </Button>
        <Button
          onClick={() => setStep(3)}
          className="rounded-xl bg-violet-600 px-8 text-white hover:bg-violet-700"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
