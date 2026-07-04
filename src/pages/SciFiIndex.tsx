import { useMemo, useState } from 'react';
import { Film, Quote } from 'lucide-react';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { navItems } from '@/components/navigation';
import { robots, sciFiReferences } from '@/data/intelligence';
import { getOverallScore } from '@/services/intelligence';

const referenceOptions = sciFiReferences.map((reference) => reference.title);

export default function SciFiIndexPage() {
  const [reference, setReference] = useState(referenceOptions[0]);
  const selectedReference = useMemo(
    () => sciFiReferences.find((item) => item.title === reference) ?? sciFiReferences[0],
    [reference]
  );
  const topRobots = [...robots].sort((a, b) => getOverallScore(b) - getOverallScore(a)).slice(0, 5);

  return (
    <PageShell title="Humanoid Intelligence Index" subtitle="Sci-Fi Index" navItems={navItems}>
      <div className="space-y-6">
        <SectionHeading
          title="Sci-Fi Reality Index"
          description="A grounded comparison that shows where current AI-controlled robotics overlaps with fiction and where it remains speculative."
          action={<div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">No inevitability claims</div>}
        />

        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
                <Film className="size-4 text-primary" />
                Reference
              </div>
              <Select value={reference} onValueChange={setReference}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {referenceOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                <div className="text-xl font-semibold">{selectedReference.title}</div>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{selectedReference.description}</p>
              </div>
              <div className="grid gap-3">
                {Object.entries(selectedReference.scores).map(([key, value]) => (
                  <div key={key} className="rounded-2xl border border-border/70 bg-background/40 p-3">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-semibold text-primary">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <SectionHeading title="Top current robots" description="The local snapshot ranked by overall platform score." />
              <div className="space-y-3">
                {topRobots.map((robot) => (
                  <div key={robot.id} className="rounded-2xl border border-border/70 bg-background/40 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-base font-semibold">{robot.name}</div>
                        <div className="text-sm text-muted-foreground">{robot.manufacturer}</div>
                      </div>
                      <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        {getOverallScore(robot)}
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{robot.summary}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  <Quote className="size-4 text-primary" />
                  Interpretation
                </div>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  The point of the index is not to claim that humanity is marching toward fictional outcomes.
                  It is to show, capability by capability, which parts of the story are already real, which are emerging,
                  and which remain far beyond current systems.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
