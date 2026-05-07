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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1800px] overflow-hidden bg-slate-950">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <div className="flex min-h-screen flex-col overflow-hidden pb-24 lg:pb-0">
            {children}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
