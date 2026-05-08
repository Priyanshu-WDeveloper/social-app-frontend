'use client';

import { ReactNode } from 'react';

import Sidebar from './sidebar';

import BottomNav from './bottom-nav';

export default function DashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div
        className="
          min-h-screen
          lg:ml-[320px]
        "
      >
        <div
          className="
            flex
            min-h-screen
            flex-col
            overflow-hidden
            pb-24
            lg:pb-0
          "
        >
          {children}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
