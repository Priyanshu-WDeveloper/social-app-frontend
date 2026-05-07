'use client';

import { Globe, Users, Lock } from 'lucide-react';

import { usePostStore } from '@/store/post-store';

const audienceOptions: {
  label: 'public' | 'friends' | 'private';
  icon: typeof Globe;
}[] = [
  {
    label: 'public',
    icon: Globe,
  },
  {
    label: 'friends',
    icon: Users,
  },
  {
    label: 'private',
    icon: Lock,
  },
];

export default function AudienceSelector() {
  const { audience, setAudience } = usePostStore();

  return (
    <div className="w-200 ">
      <p className="mb-4 text-sm font-semibold text-slate-700">
        Audience
      </p>

      <div className="flex flex-wrap gap-3">
        {audienceOptions.map((item) => {
          const Icon = item.icon;

          const active = audience === item.label;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setAudience(item.label)}
              className={`
                inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium transition-all duration-200
                ${
                  active
                    ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }
              `}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
