'use client';

import { ChevronDown } from 'lucide-react';

export default function ProfileCard() {
  return (
    <button
      className="
        flex
        w-full
        items-center
        justify-between
        rounded-xl
        border
        border-white/5
        bg-slate-900
        px-4
        py-3
        shadow-lg
        transition-all
        duration-200
        hover:border-violet-500/20
      "
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="
              h-12
              w-12
              rounded-full
              object-cover
            "
          />

          {/* Online Dot */}
          <span
            className="
              absolute
              bottom-0
              right-0
              h-3.5
              w-3.5
              rounded-full
              border-2
              border-slate-900
              bg-green-500
            "
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-semibold text-white">
            John Doe
          </h3>

          <p className="text-sm text-slate-400">@johndoe</p>
        </div>
      </div>

      {/* Right */}
      <ChevronDown className="h-5 w-5 text-slate-400" />
    </button>
  );
}
