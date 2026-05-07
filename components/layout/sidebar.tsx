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
import CreatePostDialog from '../post/create-post-dialog';

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
          <h1 className="text-xl font-semibold text-slate-400">
            Siclail{' '}
            <span className="text-xl font-semibold text-violet-500">
              Media
            </span>
          </h1>
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

      <CreatePostDialog />
    </aside>
  );
}
