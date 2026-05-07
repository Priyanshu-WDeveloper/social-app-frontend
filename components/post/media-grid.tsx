'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

import { usePostStore } from '@/store/post-store';

export default function MediaGrid() {
  const { media, removeMedia } = usePostStore();

  return (
    <div className="grid grid-cols-2 gap-4">
      {media.map((item) => (
        <div
          key={item.id}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* <Image
            src={item}
            alt="media"
            width={500}
            height={500}
            className="h-[250px] w-full object-cover"
          /> */}
          {item ? (
            <img
              src={item.url}
              alt="media"
              className="h-[250px] w-full object-cover"
            />
          ) : null}

          <button
            onClick={() => removeMedia(item.id)}
            className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white backdrop-blur"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
