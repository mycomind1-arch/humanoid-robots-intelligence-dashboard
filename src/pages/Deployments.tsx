import { MapPinned } from 'lucide-react';
import { DeploymentMap } from '@/charts/deployment-map';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Card, CardContent } from '@/components/ui/card';
import { navItems } from '@/components/navigation';
import { deployments } from '@/data/intelligence';

export default function DeploymentsPage() {
  const points = deployments.map((deployment) => ({
    id: deployment.id,
    label: deployment.robot,
    x: ((deployment.longitude + 180) / 360) * 1000,
    y: ((90 - deployment.latitude) / 180) * 500,
    color: deployment.country === 'China' ? '#2A5CFF' : deployment.country === 'Canada' ? '#00C27A' : '#B8C2FF',
    size: Math.max(5, Math.min(13, deployment.numberOfRobots / 3)),
  }));

  return (
    <PageShell title="Humanoid Intelligence Index" subtitle="Deployments" navItems={navItems}>
      <div className="space-y-6">
        <SectionHeading
          title="Deployment Map"
          description="Track where robots are operating, what they are doing, and how many are active."
          action={<div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Interactive map</div>}
        />

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <DeploymentMap points={points} className="h-[560px] overflow-hidden rounded-3xl border border-border/70" />
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
                <MapPinned className="size-4 text-primary" />
                Deployment log
              </div>
              <div className="space-y-3">
                {deployments.map((deployment) => (
                  <div key={deployment.id} className="rounded-2xl border border-border/70 bg-background/40 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-base font-semibold">{deployment.robot}</div>
                        <div className="text-sm text-muted-foreground">{deployment.company}</div>
                      </div>
                      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{deployment.status}</div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{deployment.location}</div>
                    <div className="mt-2 text-sm text-muted-foreground">{deployment.industry}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {deployment.tasks.join(' • ')}
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

