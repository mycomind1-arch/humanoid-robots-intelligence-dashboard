import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { CompareMetricRow } from '@/services/intelligence';
import { getOverallScore } from '@/services/intelligence';
import type { RobotRecord } from '@/types/intelligence';

type CompareTableProps = {
  robots: RobotRecord[];
  rows: CompareMetricRow[];
  className?: string;
};

export function CompareTable({ robots, rows, className }: CompareTableProps) {
  return (
    <Card className={cn('border-border/70 bg-card/80 shadow-[0_20px_60px_rgba(0,0,0,0.3)]', className)}>
      <CardHeader className="space-y-3">
        <CardTitle className="text-sm uppercase tracking-[0.18em]">Side-by-side compare</CardTitle>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {robots.map((robot) => (
            <div key={robot.id} className="rounded-2xl border border-border/70 bg-background/40 p-3">
              <div className="text-sm font-semibold">{robot.name}</div>
              <div className="text-xs text-muted-foreground">{robot.manufacturer}</div>
              <div className="mt-2 text-2xl font-semibold text-primary">{getOverallScore(robot)}</div>
              <div className="text-xs text-muted-foreground">Overall score</div>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[560px] rounded-2xl border border-border/70">
          <div className="min-w-[960px]">
            {rows.map((row, index) => (
              <div key={row.key}>
                <div
                  className="grid gap-4 px-4 py-4"
                  style={{
                    gridTemplateColumns: `240px repeat(${Math.max(1, robots.length)}, minmax(180px, 1fr))`,
                  }}
                >
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{row.label}</div>
                  </div>
                  {row.values.map((value) => (
                    <div key={value.id} className="text-sm text-foreground">
                      <div className="font-medium">{value.name}</div>
                      <div className="text-muted-foreground">{value.value}</div>
                    </div>
                  ))}
                </div>
                {index !== rows.length - 1 ? <Separator /> : null}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
