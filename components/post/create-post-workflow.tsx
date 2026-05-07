'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePostStore } from '@/store/post-store';

import PostContentStep from './steps/post-content-step';
import MediaUploadStep from './steps/media-upload-step';
import PreviewStep from './steps/preview-step';

export default function CreatePostWorkflow() {
  const { step } = usePostStore();

  return (
    <div className="grid h-full grid-cols-12 bg-white">
      {/* <div className="col-span-12 overflow-hidden"> */}
      <div className="col-span-12 h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="h-full overflow-y-auto scrollbar-thin"
          >
            {step === 1 && <PostContentStep />}
            {step === 2 && <MediaUploadStep />}
            {step === 3 && <PreviewStep />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Step({
  active,
  number,
  title,
}: {
  active: boolean;
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl font-bold ${
          active ? 'bg-violet-600' : 'bg-white/10'
        }`}
      >
        {number}
      </div>

      <div>
        <p className="text-sm text-slate-400">Step</p>
        <h3 className="font-semibold">{title}</h3>
      </div>
    </div>
  );
}
