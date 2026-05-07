import Card from '@/components/ui/card';

export default function BookmarksPage() {
  return (
    <div className="p-6">
      <Card className="p-6 bg-slate-900/80">
        <h1 className="text-2xl font-semibold text-white">
          Bookmarks
        </h1>
        <p className="mt-3 text-slate-400">
          Keep your favorite posts organized in one clean place.
        </p>
      </Card>
    </div>
  );
}
