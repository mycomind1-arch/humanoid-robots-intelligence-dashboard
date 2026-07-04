import { Link } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { RobotRecord } from '@/types/intelligence';
import { getOverallScore } from '@/services/intelligence';

type RobotCardProps = {
  robot: RobotRecord;
  className?: string;
};

export function RobotCard({ robot, className }: RobotCardProps) {
  return (
    <Card className={cn('overflow-hidden border-border/70 bg-card/80 shadow-[0_20px_60px_rgba(0,0,0,0.3)]', className)}>
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border/70 bg-gradient-to-b from-white/5 to-transparent">
        <img src={robot.image} alt={robot.name} className="h-full w-full object-contain p-6" />
        <Badge className="absolute left-3 top-3 rounded-full bg-background/80 text-foreground backdrop-blur-sm">
          {robot.status}
        </Badge>
        <div className="absolute right-3 top-3 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {getOverallScore(robot)}
        </div>
      </div>
      <CardContent className="space-y-4 p-5">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">{robot.name}</h3>
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{robot.country}</span>
          </div>
          <p className="text-sm text-muted-foreground">{robot.manufacturer}</p>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">{robot.summary}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl border border-border/70 bg-background/40 p-3">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Payload</div>
            <div className="mt-1 font-medium">{robot.payloadKg} kg</div>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/40 p-3">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Battery</div>
            <div className="mt-1 font-medium">{robot.batteryHours} h</div>
          </div>
        </div>

        <Link
          to={`/robots/${robot.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Open robot profile
        </Link>
      </CardContent>
    </Card>
  );
}

