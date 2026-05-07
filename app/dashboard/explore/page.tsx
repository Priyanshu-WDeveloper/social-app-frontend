import Card from '@/components/ui/card';

export default function ExplorePage() {
  return (
    <div className="p-6">
      <Card className="p-6 bg-slate-900/80">
        <h1 className="text-2xl font-semibold text-white">Explore</h1>
        <p className="mt-3 text-slate-400">
          Discover trending content, new creators, and the latest
          community moments.
        </p>
      </Card>
    </div>
  );
}
