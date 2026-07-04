import { useMemo, useState } from 'react';
import { Clock4 } from 'lucide-react';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { navItems } from '@/components/navigation';
import { timeline } from '@/data/intelligence';

const categories = ['All', ...new Set(timeline.map((item) => item.category))];

export default function TimelinePage() {
  const [category, setCategory] = useState('All');

  const filtered = useMemo(
    () => timeline.filter((item) => category === 'All' || item.category === category),
    [category]
  );

  return (
    <PageShell title="Humanoid Intelligence Index" subtitle="Timeline" navItems={navItems}>
      <div className="space-y-6">
        <SectionHeading
          title="Interactive Timeline"
          description="Announcements, funding, deployments, price changes, software updates, and research breakthroughs."
          action={<div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Live chronology</div>}
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <Button key={item} variant={category === item ? 'default' : 'secondary'} size="sm" onClick={() => setCategory(item)}>
              {item}
            </Button>
          ))}
        </div>

        <Card className="border-border/70 bg-card/80">
          <CardContent className="space-y-4 p-5">
            {filtered.map((item) => (
              <div key={item.id} className="grid gap-4 rounded-2xl border border-border/70 bg-background/40 p-4 md:grid-cols-[110px_1fr]">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock4 className="size-4 text-primary" />
                    {item.date}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-lg font-semibold">{item.title}</div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.category}</div>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

