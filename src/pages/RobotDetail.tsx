import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { CapabilityRadarChart } from '@/charts/capability-radar-chart';
import { PriceHistoryChart } from '@/charts/price-history-chart';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { navItems } from '@/components/navigation';
import { capabilityPalette, robots } from '@/data/intelligence';
import { getCapabilityRadar, getRobotPriceTrend, getOverallScore } from '@/services/intelligence';

export default function RobotDetailPage() {
  const { robotId } = useParams();
  const robot = robots.find((item) => item.id === robotId) ?? robots[0];

  return (
    <PageShell title="Humanoid Intelligence Index" subtitle="Robot profile" navItems={navItems}>
      <div className="space-y-6">
        <Button variant="ghost" asChild className="w-fit">
          <Link to="/robots">
            <ArrowLeft className="size-4" />
            Back to robots
          </Link>
        </Button>
        <SectionHeading title={robot.name} description={robot.summary} />
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                <div className="text-2xl font-semibold">{robot.manufacturer}</div>
                <div className="text-sm text-muted-foreground">{robot.country} · {robot.releaseYear}</div>
                <div className="mt-2 text-3xl font-semibold text-primary">{robot.priceLabel}</div>
                <div className="mt-2 text-sm text-muted-foreground">Overall score: {getOverallScore(robot)}</div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-border/70 bg-background/40 p-3">Payload: {robot.payloadKg} kg</div>
                <div className="rounded-2xl border border-border/70 bg-background/40 p-3">Battery: {robot.batteryHours} h</div>
                <div className="rounded-2xl border border-border/70 bg-background/40 p-3">Hands: {robot.hands}</div>
                <div className="rounded-2xl border border-border/70 bg-background/40 p-3">DOF: {robot.degreesOfFreedom}</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <CapabilityRadarChart data={getCapabilityRadar(robot)} color={capabilityPalette.commercialReadiness} />
              <PriceHistoryChart data={getRobotPriceTrend(robot)} />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
