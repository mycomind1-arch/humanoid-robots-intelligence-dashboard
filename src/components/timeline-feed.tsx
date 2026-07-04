import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { TimelineRecord } from '@/types/intelligence';

type TimelineFeedProps = {
  items: TimelineRecord[];
  className?: string;
};

export function TimelineFeed({ items, className }: TimelineFeedProps) {
  return (
    <Card className={cn('border-border/70 bg-card/80 shadow-[0_20px_60px_rgba(0,0,0,0.3)]', className)}>
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-[0.18em]">Timeline highlights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="grid grid-cols-[110px_1fr] gap-4">
            <div className="text-xs text-muted-foreground">{item.date}</div>
            <div>
              <div className="text-sm font-semibold">{item.title}</div>
              <div className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.category}</div>
            </div>
            {index !== items.length - 1 ? <Separator className="col-span-2" /> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

