import { useDeferredValue, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Search as SearchIcon } from 'lucide-react';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { navItems } from '@/components/navigation';
import { searchIntelligence } from '@/services/intelligence';

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => searchIntelligence(deferredQuery), [deferredQuery]);

  return (
    <PageShell title="Humanoid Intelligence Index" subtitle="Search" navItems={navItems}>
      <div className="space-y-6">
        <SectionHeading
          title="Natural Language Search"
          description="Try queries like: robots under $30000, robots with five finger hands, robots deployed in factories, Chinese humanoids, robots using ROS, robots with over 40 DOF."
        />

        <Card className="border-border/70 bg-card/80">
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-background/40 px-4 py-3">
              <SearchIcon className="size-4 text-primary" />
              <Input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setParams(event.target.value ? { q: event.target.value } : {});
                }}
                className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                placeholder="Search the intelligence graph..."
              />
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {results.map((result) => (
                <div key={`${result.kind}-${result.id}`} className="rounded-2xl border border-border/70 bg-background/40 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{result.kind}</div>
                  <div className="mt-2 text-base font-semibold">{result.title}</div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{result.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

