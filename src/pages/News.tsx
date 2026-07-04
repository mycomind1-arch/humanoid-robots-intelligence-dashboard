import { Link } from 'react-router';
import { Newspaper } from 'lucide-react';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { navItems } from '@/components/navigation';
import { dedupeNewsStories, getLatestNews } from '@/services/intelligence';

export default function NewsPage() {
  const stories = dedupeNewsStories(getLatestNews(12));

  return (
    <PageShell title="Humanoid Intelligence Index" subtitle="News" navItems={navItems}>
      <div className="space-y-6">
        <SectionHeading
          title="Live News"
          description="Every article links to a robot, company, capability, and source. Duplicate stories are removed."
          action={
            <Button variant="secondary" asChild>
              <Link to="/timeline">
                <Newspaper className="size-4" />
                See timeline
              </Link>
            </Button>
          }
        />

        <div className="grid gap-4 xl:grid-cols-2">
          {stories.map((story) => (
            <Card key={story.id} className="border-border/70 bg-card/80">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span>{story.date}</span>
                  <span>{story.region}</span>
                </div>
                <div className="text-lg font-semibold">{story.title}</div>
                <p className="text-sm leading-7 text-muted-foreground">{story.summary}</p>
                <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
                  <div>Robot: {story.robot}</div>
                  <div>Company: {story.company}</div>
                  <div>Capability: {story.capability}</div>
                  <div>Source: {story.source}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

