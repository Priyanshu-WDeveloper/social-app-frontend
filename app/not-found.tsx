import Link from 'next/link';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-24 text-slate-100">
      <Card className="max-w-xl p-10 text-center bg-slate-900/90">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">
          Page not found
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">
          Looks like you took a wrong turn.
        </h1>
        <p className="mt-4 text-slate-400">
          Return to the dashboard or login to continue exploring the
          app.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full">Go home</Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}
