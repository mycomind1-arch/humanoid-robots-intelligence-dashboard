import { useMemo } from 'react';
import { GitCompareArrows, Plus } from 'lucide-react';
import { CompareTable } from '@/components/compare-table';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { navItems } from '@/components/navigation';
import { robots } from '@/data/intelligence';
import { buildCompareRows } from '@/services/intelligence';
import { useLocalStorageState } from '@/hooks/use-local-storage-state';

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useLocalStorageState<string[]>(
    'humanoid-intelligence-compare',
    robots.slice(0, 3).map((robot) => robot.id)
  );

  const selectedRobots = useMemo(
    () => robots.filter((robot) => selectedIds.includes(robot.id)).slice(0, 5),
    [selectedIds]
  );
  const rows = buildCompareRows(selectedRobots);

  return (
    <PageShell title="Humanoid Intelligence Index" subtitle="Compare" navItems={navItems}>
      <div className="space-y-6">
        <SectionHeading
          title="Robot Compare Tool"
          description="Select up to five robots and compare price, payload, battery, speed, DOF, sensors, AI, SDK, deployment, and overall score."
          action={<div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Up to five robots</div>}
        />

        <Card className="border-border/70 bg-card/80">
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
              <GitCompareArrows className="size-4 text-primary" />
              Selection
            </div>
            <div className="flex flex-wrap gap-2">
              {robots.map((robot) => {
                const selected = selectedIds.includes(robot.id);
                return (
                  <Button
                    key={robot.id}
                    variant={selected ? 'default' : 'secondary'}
                    size="sm"
                    onClick={() =>
                      setSelectedIds((current) => {
                        if (current.includes(robot.id)) {
                          return current.filter((id) => id !== robot.id);
                        }
                        if (current.length >= 5) {
                          return [...current.slice(1), robot.id];
                        }
                        return [...current, robot.id];
                      })
                    }
                  >
                    {selected ? 'Remove' : 'Add'}
                    <Plus className="size-4" />
                    {robot.name}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <CompareTable robots={selectedRobots} rows={rows} />
      </div>
    </PageShell>
  );
}

