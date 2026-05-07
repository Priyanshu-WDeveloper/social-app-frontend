'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Home,
  MessageCircle,
  Bookmark,
  Bell,
  User,
  Plus,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/explore', label: 'Explore', icon: Compass },
  {
    href: '/dashboard/notifications',
    label: 'Notifications',
    icon: Bell,
  },
  {
    href: '/dashboard/messages',
    label: 'Messages',
    icon: MessageCircle,
  },
  {
    href: '/dashboard/bookmarks',
    label: 'Bookmarks',
    icon: Bookmark,
  },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[320px] flex-col border-r border-white/10 bg-slate-950 p-6 lg:flex">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-glow">
          S
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Social
          </p>
          <p className="text-xl font-semibold text-white">
            Dashboard
          </p>
        </div>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? 'bg-violet-500/15 text-violet-200'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <button className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95">
        <Plus className="h-4 w-4" />
        Create post
      </button>
    </aside>
  );
}
