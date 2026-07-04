import type { DashboardMetric } from '@/types/intelligence';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type MetricTileProps = {
  metric: DashboardMetric;
  className?: string;
};

export function MetricTile({ metric, className }: MetricTileProps) {
  const toneClasses = {
    accent: 'text-primary',
    muted: 'text-foreground',
    positive: 'text-emerald-400',
    warning: 'text-amber-400',
  } as const;

  return (
    <Card className={cn('border-border/70 bg-card/80 shadow-[0_20px_60px_rgba(0,0,0,0.3)]', className)}>
      <CardContent className="flex h-full flex-col gap-3 p-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{metric.label}</div>
        <div className={cn('text-3xl font-semibold tracking-tight', toneClasses[metric.tone ?? 'muted'])}>
          {metric.value}
        </div>
        <p className="text-sm text-muted-foreground">{metric.detail}</p>
      </CardContent>
    </Card>
  );
}

