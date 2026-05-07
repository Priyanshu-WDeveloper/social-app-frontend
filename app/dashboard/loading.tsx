import Card from '@/components/ui/card';

export default function DashboardLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 bg-slate-900/80">
          <div className="space-y-4">
            <div className="h-6 w-3/5 rounded-full bg-slate-800" />
            <div className="h-10 w-full rounded-full bg-slate-800" />
            <div className="h-4 w-4/5 rounded-full bg-slate-800" />
          </div>
        </Card>
        <Card className="p-6 bg-slate-900/80">
          <div className="space-y-4">
            <div className="h-6 w-2/5 rounded-full bg-slate-800" />
            <div className="grid gap-3">
              <div className="h-20 rounded-3xl bg-slate-800" />
              <div className="h-20 rounded-3xl bg-slate-800" />
            </div>
          </div>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 bg-slate-900/80">
          <div className="space-y-3">
            <div className="h-5 w-24 rounded-full bg-slate-800" />
            <div className="h-14 rounded-3xl bg-slate-800" />
          </div>
        </Card>
        <Card className="p-6 bg-slate-900/80">
          <div className="space-y-3">
            <div className="h-5 w-20 rounded-full bg-slate-800" />
            <div className="h-14 rounded-3xl bg-slate-800" />
          </div>
        </Card>
        <Card className="p-6 bg-slate-900/80">
          <div className="space-y-3">
            <div className="h-5 w-28 rounded-full bg-slate-800" />
            <div className="h-14 rounded-3xl bg-slate-800" />
          </div>
        </Card>
      </div>
    </div>
  );
}
