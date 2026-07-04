import { useDeferredValue, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { SlidersHorizontal } from 'lucide-react';
import { CapabilityRadarChart } from '@/charts/capability-radar-chart';
import { PriceHistoryChart } from '@/charts/price-history-chart';
import { RobotCard } from '@/components/robot-card';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { navItems } from '@/components/navigation';
import { capabilityPalette, robots } from '@/data/intelligence';
import { getCapabilityRadar, getRobotPriceTrend, searchIntelligence } from '@/services/intelligence';

const countries = ['All', ...new Set(robots.map((robot) => robot.country))];
const statuses = ['All', ...new Set(robots.map((robot) => robot.status))];

export default function RobotsPage() {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('All');
  const [status, setStatus] = useState('All');
  const deferredQuery = useDeferredValue(query);

  const filteredRobots = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    const result = robots.filter((robot) => {
      const matchesCountry = country === 'All' || robot.country === country;
      const matchesStatus = status === 'All' || robot.status === status;
      const haystack = `${robot.name} ${robot.manufacturer} ${robot.summary}`.toLowerCase();
      const matchesQuery = !normalized || haystack.includes(normalized);
      return matchesCountry && matchesStatus && matchesQuery;
    });

    return result.sort((a, b) => b.capabilityScores.commercialReadiness - a.capabilityScores.commercialReadiness);
  }, [country, deferredQuery, status]);

  const searchResults = useMemo(() => searchIntelligence(query).filter((result) => result.kind === 'robot'), [query]);
  const selectedRobot = filteredRobots[0] ?? robots[0];

  return (
    <PageShell title="Humanoid Intelligence Index" subtitle="Robots" navItems={navItems}>
      <div className="space-y-6">
        <SectionHeading
          title="Robot Database"
          description="Search by language, price, sensors, dexterity, country, or deployment readiness."
          action={
            <Button asChild variant="secondary">
              <Link to="/compare">Compare up to five robots</Link>
            </Button>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr_0.9fr]">
          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
                <SlidersHorizontal className="size-4 text-primary" />
                Filters
              </div>
              <div className="space-y-3">
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Robots under $30000, Chinese humanoids, ROS, five finger hands..."
                />
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="rounded-2xl border border-border/70 bg-background/40 p-4 text-sm text-muted-foreground">
                  Try phrases like “robots with vision and force sensors” or “robots with over 40 DOF”.
                </div>
                <Button variant="ghost" className="w-full" onClick={() => {
                  setQuery('');
                  setCountry('All');
                  setStatus('All');
                }}>
                  Clear filters
                </Button>
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Natural language results</div>
                <div className="space-y-2">
                  {searchResults.slice(0, 6).map((result) => (
                    <div key={result.id} className="rounded-2xl border border-border/70 bg-background/40 p-3">
                      <div className="font-medium">{result.title}</div>
                      <div className="text-sm text-muted-foreground">{result.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <SectionHeading
                title="Tracked robots"
                description={`${filteredRobots.length} robots match the current filter state.`}
              />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
                {filteredRobots.map((robot) => (
                  <RobotCard key={robot.id} robot={robot} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <SectionHeading
                title="Selected robot"
                description="Capability and price history for the current focus robot."
              />
              <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                <div className="text-lg font-semibold">{selectedRobot.name}</div>
                <div className="text-sm text-muted-foreground">{selectedRobot.manufacturer}</div>
                <div className="mt-2 text-3xl font-semibold text-primary">{selectedRobot.priceLabel}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{selectedRobot.summary}</p>
              </div>
              <CapabilityRadarChart data={getCapabilityRadar(selectedRobot)} color={capabilityPalette.commercialReadiness} />
              <PriceHistoryChart data={getRobotPriceTrend(selectedRobot)} />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
