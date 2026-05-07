import DashboardShell from '@/components/layout/dashboard-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard • Social Media',
  description:
    'Create post, explore content, and manage your social feed.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
