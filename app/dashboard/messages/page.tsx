import Card from '@/components/ui/card';

export default function MessagesPage() {
  return (
    <div className="p-6">
      <Card className="p-6 bg-slate-900/80">
        <h1 className="text-2xl font-semibold text-white">
          Messages
        </h1>
        <p className="mt-3 text-slate-400">
          Your inbox is ready for new conversations and community
          replies.
        </p>
      </Card>
    </div>
  );
}
