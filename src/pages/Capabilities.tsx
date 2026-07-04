import { useMemo, useState } from 'react';
import { Radar } from 'lucide-react';
import { CapabilityRadarChart } from '@/charts/capability-radar-chart';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { navItems } from '@/components/navigation';
import { capabilityPalette, robots } from '@/data/intelligence';
import { buildCompareRows, getCapabilityRadar } from '@/services/intelligence';

export default function CapabilitiesPage() {
  const [selectedRobotId, setSelectedRobotId] = useState(robots[0].id);
  const selectedRobot = useMemo(
    () => robots.find((robot) => robot.id === selectedRobotId) ?? robots[0],
    [selectedRobotId]
  );
  const compareRows = buildCompareRows(robots.slice(0, 3));

  return (
    <PageShell title="Humanoid Intelligence Index" subtitle="Capabilities" navItems={navItems}>
      <div className="space-y-6">
        <SectionHeading
          title="Capability Matrix"
          description="Walking, dexterity, autonomy, conversation, manipulation, battery life, and commercial readiness for AI-controlled systems."
          action={
            <Button variant="secondary">
              <Radar className="size-4" />
              Radar view
            </Button>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Select robot</div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">AI-controlled only</div>
              <Select value={selectedRobotId} onValueChange={setSelectedRobotId}>
                <SelectTrigger>
                  <SelectValue placeholder="Robot" />
                </SelectTrigger>
                <SelectContent>
                  {robots.map((robot) => (
                    <SelectItem key={robot.id} value={robot.id}>
                      {robot.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                <div className="text-2xl font-semibold">{selectedRobot.name}</div>
                <div className="text-sm text-muted-foreground">{selectedRobot.manufacturer}</div>
                <div className="mt-2 text-sm text-muted-foreground">{selectedRobot.summary}</div>
              </div>
              <CapabilityRadarChart data={getCapabilityRadar(selectedRobot)} color={capabilityPalette.commercialReadiness} />
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <SectionHeading title="Capability comparison" description="How the leading robots compare on core platform attributes." />
              <div className="space-y-4">
                {compareRows.map((row) => (
                  <div key={row.key} className="rounded-2xl border border-border/70 bg-background/40 p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{row.label}</div>
                    <div className="mt-3 grid gap-3 md:grid-cols-3">
                      {row.values.map((value) => (
                        <div key={value.id} className="rounded-2xl border border-border/70 bg-card/70 p-3">
                          <div className="text-sm font-medium">{value.name}</div>
                          <div className="mt-1 text-sm text-muted-foreground">{value.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
