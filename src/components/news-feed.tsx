import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { NewsRecord } from '@/types/intelligence';

type NewsFeedProps = {
  items: NewsRecord[];
  className?: string;
};

export function NewsFeed({ items, className }: NewsFeedProps) {
  return (
    <Card className={cn('border-border/70 bg-card/80 shadow-[0_20px_60px_rgba(0,0,0,0.3)]', className)}>
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-[0.18em]">Live news</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id}>
            <article className="space-y-2">
              <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>{item.date}</span>
                <span>{item.region}</span>
              </div>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{item.summary}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{item.company}</span>
                <span>•</span>
                <span>{item.robot}</span>
                <span>•</span>
                <Link to="/news" className="text-primary hover:underline">
                  Open story
                </Link>
              </div>
            </article>
            {index !== items.length - 1 ? <Separator className="mt-4" /> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

