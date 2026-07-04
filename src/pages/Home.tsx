import { Link } from 'react-router';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { AssistantPanel } from '@/components/assistant-panel';
import { CompanyCard } from '@/components/company-card';
import { DeploymentMap } from '@/charts/deployment-map';
import { CapabilityRadarChart } from '@/charts/capability-radar-chart';
import { PriceHistoryChart } from '@/charts/price-history-chart';
import { NewsFeed } from '@/components/news-feed';
import { PageShell } from '@/components/page-shell';
import { RobotCard } from '@/components/robot-card';
import { RobotModelStage } from '@/components/robot-model-stage';
import { SectionHeading } from '@/components/section-heading';
import { TimelineFeed } from '@/components/timeline-feed';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { navItems } from '@/components/navigation';
import {
  capabilityPalette,
  deployments,
  formatCompact,
  buildDashboardMetrics,
  robots,
  companies,
} from '@/data/intelligence';
import { sciFiReferences } from '@/data/scifi';
import {
  getCapabilityRadar,
  getLatestNews,
  getMostActiveCompanies,
  getNewestDeployments,
  getNewestRobots,
  getRobotPriceTrend,
  getSciFiRows,
  getTimelineHighlights,
  getTopCapabilityImprovements,
} from '@/services/intelligence';

export default function Home() {
  const metrics = buildDashboardMetrics();
  const newestRobots = getNewestRobots(4);
  const latestNews = getLatestNews(6);
  const newestDeployments = getNewestDeployments(4);
  const timelineHighlights = getTimelineHighlights(5);
  const activeCompanies = getMostActiveCompanies(4);
  const topImprovements = getTopCapabilityImprovements(4);
  const sciFiRows = getSciFiRows();
  const featuredRobot = robots.find((robot) => robot.id === 'figure-02') ?? robots[0];
  const featuredTrend = getRobotPriceTrend(featuredRobot);
  const deploymentPoints = deployments.map((deployment) => ({
    id: deployment.id,
    label: deployment.robot,
    x: ((deployment.longitude + 180) / 360) * 1000,
    y: ((90 - deployment.latitude) / 180) * 500,
    color: deployment.country === 'China' ? '#2A5CFF' : deployment.country === 'Canada' ? '#00C27A' : '#B8C2FF',
    size: Math.max(5, Math.min(13, deployment.numberOfRobots / 3)),
  }));

  return (
    <PageShell
      title="Humanoid Intelligence Index"
      subtitle="How close is real-world robotics to science fiction?"
      navItems={navItems}
    >
      <div className="space-y-8">
        <section className="grid gap-6 xl:grid-cols-[1.5fr_0.85fr]">
          <div className="space-y-6">
            <Card className="overflow-hidden border-border/70 bg-card/80 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <Sparkles className="size-4" />
                    Living intelligence platform
                  </div>
                  <div className="space-y-4">
                    <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance lg:text-6xl">
                      Tracking every known humanoid robot, company, deployment, and capability signal.
                    </h1>
                    <p className="max-w-2xl text-base leading-7 text-muted-foreground lg:text-lg">
                      The platform preserves the current catalog while expanding it into a structured intelligence graph
                      for robots, manufacturers, deployment sites, price history, news, and science-fiction comparisons.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link to="/robots">
                        Explore robots
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link to="/sci-fi-index">Open Sci-Fi Index</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link to="/search">
                        <Search className="size-4" />
                        Search the index
                      </Link>
                    </Button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {metrics.slice(0, 4).map((metric) => (
                      <div key={metric.label} className="rounded-2xl border border-border/70 bg-background/40 p-4">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{metric.label}</div>
                        <div className="mt-2 text-2xl font-semibold">{metric.value}</div>
                        <p className="mt-1 text-sm text-muted-foreground">{metric.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className="border-border/70 bg-background/40">
                    <CardContent className="p-4">
                      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Future Meter</div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {metrics.slice(4).map((metric) => (
                          <div key={metric.label} className="rounded-2xl border border-border/70 bg-card/70 p-3">
                            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{metric.label}</div>
                            <div className="mt-2 text-xl font-semibold">{metric.value}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border/70 bg-background/40">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Signature question</div>
                          <div className="mt-2 text-lg font-semibold">How close is real-world robotics to science fiction?</div>
                        </div>
                        <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          Answered by data
                        </div>
                      </div>
                      <div className="mt-4 rounded-2xl border border-border/70 bg-card/70 p-4">
                        <div className="text-sm text-muted-foreground">
                          Today’s platform shows that mobility, warehouse deployment, and perception are real.
                          Human-level autonomy, trust, and self-repair remain the gap.
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="border-border/70 bg-card/80">
                <CardContent className="space-y-4 p-5">
                  <SectionHeading
                    title="Newest Robots"
                    description="Most recently tracked platforms in the local graph."
                    action={
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/robots">View all</Link>
                      </Button>
                    }
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    {newestRobots.map((robot) => (
                      <RobotCard key={robot.id} robot={robot} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <AssistantPanel className="h-full" />
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-border/70 bg-card/80 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <CardContent className="space-y-4 p-5">
                <SectionHeading
                  title="Featured robot"
                  description="Price history, capability profile, and readiness signal."
                  action={<Button size="sm" variant="secondary" asChild><Link to={`/robots/${featuredRobot.id}`}>Open profile</Link></Button>}
                />
                <div className="space-y-4">
                  <RobotModelStage robot={featuredRobot} variant="detail" className="h-[280px]" />
                  <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                    <div className="text-sm font-semibold">{featuredRobot.name}</div>
                    <div className="text-sm text-muted-foreground">{featuredRobot.manufacturer}</div>
                    <div className="mt-2 text-3xl font-semibold text-primary">{featuredRobot.priceLabel}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{featuredRobot.summary}</div>
                  </div>
                  <CapabilityRadarChart data={getCapabilityRadar(featuredRobot)} color={capabilityPalette.commercialReadiness} />
                  <PriceHistoryChart data={featuredTrend} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/80">
              <CardContent className="space-y-4 p-5">
                <SectionHeading
                  title="Sci-Fi Reality Index"
                  description="A grounded comparison between cinematic archetypes and current technical capabilities."
                  action={<Button size="sm" variant="ghost" asChild><Link to="/sci-fi-index">Open page</Link></Button>}
                />
                <div className="space-y-3">
                  {sciFiReferences.map((reference, index) => {
                    const match = sciFiRows[index] ?? { similarity: 0 };
                    return (
                      <div key={reference.title} className="rounded-2xl border border-border/70 bg-background/40 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="text-base font-semibold">{reference.title}</div>
                            <p className="mt-1 text-sm text-muted-foreground">{reference.description}</p>
                          </div>
                          <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                            {match.similarity}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <SectionHeading
                title="Deployment Map"
                description="Interactive map of tracked deployments and the industries they touch."
              />
              <DeploymentMap points={deploymentPoints} className="h-[420px] overflow-hidden rounded-3xl border border-border/70" />
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <SectionHeading title="Top Capability Improvements" description="Robots with the strongest composite capability scores." />
              <div className="space-y-3">
                {topImprovements.map(({ robot, delta }) => (
                  <div key={robot.id} className="rounded-2xl border border-border/70 bg-background/40 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-base font-semibold">{robot.name}</div>
                        <div className="text-sm text-muted-foreground">{robot.manufacturer}</div>
                      </div>
                      <div className="text-2xl font-semibold text-primary">{delta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <SectionHeading title="Latest News" description="Deduped stories with links to robots, companies, and capabilities." />
              <NewsFeed items={latestNews} />
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <SectionHeading title="Newest Deployments" description="Where robots are actually working today." />
              <div className="space-y-3">
                {newestDeployments.map((deployment) => (
                  <div key={deployment.id} className="rounded-2xl border border-border/70 bg-background/40 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-base font-semibold">{deployment.robot}</div>
                        <div className="text-sm text-muted-foreground">{deployment.location}</div>
                      </div>
                      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{deployment.status}</div>
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">{deployment.tasks.join(' • ')}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <SectionHeading title="Most Active Companies" description="Manufacturers with the densest visible product and deployment activity." />
              <div className="space-y-3">
                {activeCompanies.map(({ company, activity }) => (
                  <div key={company.id} className="space-y-3">
                    <CompanyCard company={company} />
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Activity score {activity}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <SectionHeading title="Timeline Highlights" description="Announcements, funding, deployments, and software updates." />
              <TimelineFeed items={timelineHighlights} />
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <SectionHeading
                title="Dashboard snapshot"
                description="A compact overview of the live analytics graph behind the product."
              />
              <div className="grid gap-4 md:grid-cols-2">
                {companies.slice(0, 4).map((company) => (
                  <div key={company.id} className="rounded-2xl border border-border/70 bg-background/40 p-4">
                    <div className="text-base font-semibold">{company.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{company.summary}</div>
                    <div className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {formatCompact(company.employees)} employees · {company.robots.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <SectionHeading title="What it answers" description="The platform is designed around one question and the data needed to support it." />
              <div className="space-y-3 text-sm leading-7 text-muted-foreground">
                <p>Which robots can already walk, carry payloads, talk, and recover balance?</p>
                <p>Which companies are shipping, which are piloting, and which are still research-only?</p>
                <p>Which capabilities are real today, which are emerging, and which remain speculative?</p>
              </div>
              <Button asChild className="w-full">
                <Link to="/compare">
                  Compare robots
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageShell>
  );
}
