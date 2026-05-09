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
} from 'lucide-react';

import CreatePostDialog from '../post/create-post-dialog';
import ProfileCard from '../ui/profile-card';

const navItems = [
  {
    href: '/dashboard',
    label: 'Home',
    icon: Home,
  },

  {
    href: '/dashboard/explore',
    label: 'Explore',
    icon: Compass,
  },

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

  {
    href: '/dashboard/profile',
    label: 'Profile',
    icon: User,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-50
        hidden
        h-screen
        w-[320px]
        flex-col
        border-r
        border-slate-200
        p-6
        lg:flex
        bg-slate-950
      "
    >
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-3xl
            bg-gradient-to-br
            from-violet-500
            to-fuchsia-500
            text-lg
            font-bold
            text-white
          "
        >
          S
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-300">
            Siclail <span className="text-violet-600">Media</span>
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href;

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group
                flex
                items-center
                gap-3
                rounded-2xl
                px-4
                py-3
                text-sm
                font-medium
                transition-all
                duration-200
                ${
                  active
                    ? 'bg-violet-100 text-violet-700'
                    : 'text-slate-300 hover:bg-slate-100 hover:text-slate-900'
                }
              `}
            >
              <Icon className="h-5 w-5" />

              {item.label}
            </Link>
          );
        })}
        <div className="mt-auto pt-6">
          <CreatePostDialog />
        </div>{' '}
      </nav>

      {/* Bottom Action */}
      <div className="mt-auto pt-6">
        <ProfileCard />
      </div>
    </aside>
  );
}
