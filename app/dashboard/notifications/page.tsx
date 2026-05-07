import Card from '@/components/ui/card';

export default function NotificationsPage() {
  return (
    <div className="p-6">
      <Card className="p-6 bg-slate-900/80">
        <h1 className="text-2xl font-semibold text-white">
          Notifications
        </h1>
        <p className="mt-3 text-slate-400">
          You’re all caught up. New updates appear here as people
          engage with your posts.
        </p>
      </Card>
    </div>
  );
}
