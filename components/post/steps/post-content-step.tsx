'use client';

import * as React from 'react';

import Image from 'next/image';

import {
  Smile,
  ImageIcon,
  FileText,
  MapPin,
  Link2,
  Calendar,
  Users,
  Globe,
  ImagePlus,
} from 'lucide-react';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { usePostStore } from '@/store/post-store';

export default function PostContentStep() {
  const { content, setContent, setStep } = usePostStore();

  return (
    <div
      className="
  flex
  h-full
  flex-col
  overflow-y-auto
  bg-white
  scrollbar-thin
  "
    >
      {/* <div className="flex h-full flex-col bg-white "> */}
      <div className="border-b border-slate-200 p-6">
        {/* <div className="pb-4">
          <h2 className="text-3xl font-bold text-slate-900">
            Create your post
          </h2>

          <p className="mt-2 text-slate-500">
            Share something with your audience.
          </p>
        </div> */}
        <div className="flex items-start justify-between">
          {/* User */}
          <div className="flex items-center gap-3">
            <Image
              src="/avatar-logo.png"
              alt="avatar"
              width={48}
              height={48}
              className="rounded-full"
            />

            <div>
              <h3 className="font-semibold text-slate-900">
                John Doe
              </h3>

              <p className="text-sm text-slate-500">@johndoe</p>
            </div>
          </div>

          {/* Audience */}
          <button
            className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-slate-700
            shadow-sm
            "
          >
            <Globe className="h-4 w-4" />
            Public
          </button>
        </div>

        {/* Textarea */}
        <div className="mt-6">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What’s on your mind?"
            className="
            min-h-[220px]
            resize-none
            rounded-2xl
            w-full
            border
            bg-white
            p-5
            text-[15px]
            text-black
            shadow-none
            focus-visible:ring-1
            focus-visible:ring-violet-500
            "
          />
        </div>
        <div className="mt-8 flex items-center justify-end">
          <Button
            onClick={() => setStep(2)}
            className="
            rounded-xl
            bg-violet-600
            px-8
            text-white
            hover:bg-violet-700
            "
          >
            Continue
          </Button>
        </div>

        {/* Toolbar */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-5 text-slate-500">
            <ToolbarIcon icon={<Smile className="h-5 w-5" />} />
            <ToolbarIcon icon={<ImageIcon className="h-5 w-5" />} />
            <ToolbarIcon icon={<FileText className="h-5 w-5" />} />
            <ToolbarIcon icon={<MapPin className="h-5 w-5" />} />
            <ToolbarIcon icon={<Link2 className="h-5 w-5" />} />
          </div>

          <p className="text-sm text-slate-400">
            {content.length}/280
          </p>
        </div>
      </div>

      {/* Add to post */}
      <div className="border-b border-slate-200 p-6">
        <h4 className="text-sm font-semibold text-slate-900">
          Add to your post
        </h4>

        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <PostOption
            icon={<ImagePlus className="h-5 w-5 text-green-500" />}
            label="Photo / Video"
          />

          <PostOption
            icon={<FileText className="h-5 w-5 text-violet-500" />}
            label="Poll"
          />

          <PostOption
            icon={<Smile className="h-5 w-5 text-orange-400" />}
            label="Feeling / Activity"
          />

          <PostOption
            icon={<MapPin className="h-5 w-5 text-pink-500" />}
            label="Location"
          />
        </div>
      </div>

      {/* More options */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-slate-900">
          More options
        </h4>

        <div className="mt-4 flex flex-wrap gap-4">
          <SmallOption
            icon={<Users className="h-4 w-4" />}
            label="Tag people"
          />

          <SmallOption
            icon={<Calendar className="h-4 w-4" />}
            label="Add reminder"
          />

          <SmallOption
            icon={<Link2 className="h-4 w-4" />}
            label="Add link"
          />
        </div>

        {/* Footer */}
      </div>
    </div>
  );
}

function ToolbarIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="transition hover:text-violet-600">
      {icon}
    </button>
  );
}

function PostOption({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      className="
      flex
      flex-col
      items-center
      justify-center
      gap-3
      rounded-2xl
      border
      border-slate-200
      bg-white
      py-6
      transition
      hover:bg-slate-50
      "
    >
      {icon}

      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>
    </button>
  );
}

function SmallOption({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      className="
      inline-flex
      items-center
      gap-2
      rounded-xl
      border
      border-slate-200
      bg-white
      px-4
      py-3
      text-sm
      font-medium
      text-slate-700
      transition
      hover:bg-slate-50
      "
    >
      {icon}
      {label}
    </button>
  );
}
