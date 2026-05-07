'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Plus, Bell, User } from 'lucide-react';

const items = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/dashboard/explore', icon: Compass, label: 'Explore' },
  { href: '/dashboard/create-post', icon: Plus, label: 'Create' },
  { href: '/dashboard/notifications', icon: Bell, label: 'Alerts' },
  { href: '/dashboard/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-slate-950/95 p-3 lg:hidden">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group inline-flex flex-col items-center gap-1 rounded-3xl px-3 py-2 text-xs ${
                active
                  ? 'text-violet-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
