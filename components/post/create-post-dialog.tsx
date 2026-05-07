'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import CreatePostWorkflow from './create-post-workflow';
import { Plus } from 'lucide-react';

export default function CreatePostDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95">
          <Plus className="h-4 w-4" />
          Create post
        </button>
      </DialogTrigger>

      <DialogContent
        className="
         !max-w-[900px]
          w-[95vw]
          h-[90vh]
          overflow-hidden 
          rounded-[32px]
          border-none
          p-0
  "
      >
        <CreatePostWorkflow />
      </DialogContent>
    </Dialog>
  );
}
