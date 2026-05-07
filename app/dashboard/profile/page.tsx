import Card from '@/components/ui/card';

export default function ProfilePage() {
  return (
    <div className="p-6">
      <Card className="p-6 bg-slate-900/80">
        <h1 className="text-2xl font-semibold text-white">Profile</h1>
        <p className="mt-3 text-slate-400">
          Manage your account details, update your avatar, and refresh
          your profile card.
        </p>
      </Card>
    </div>
  );
}
