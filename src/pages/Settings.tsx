import { Database, Wand2 } from 'lucide-react';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { navItems } from '@/components/navigation';
import { useLocalStorageState } from '@/hooks/use-local-storage-state';

export default function SettingsPage() {
  const [settings, setSettings] = useLocalStorageState('humanoid-intelligence-settings', {
    ingestNews: true,
    ingestPatents: true,
    ingestYouTube: false,
    ingestResearch: true,
    ingestScraping: false,
    enableWatchlists: true,
    enableSavedComparisons: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <PageShell title="Humanoid Intelligence Index" subtitle="Settings" navItems={navItems}>
      <div className="space-y-6">
        <SectionHeading
          title="Future Readiness"
          description="The local app is structured to support PostgreSQL, Supabase, vector search, agent routing, automated scraping, and daily updates later."
        />

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
                <Database className="size-4 text-primary" />
                Data ingestion
              </div>
              {[
                ['ingestNews', 'News feeds'],
                ['ingestPatents', 'Patent ingestion'],
                ['ingestYouTube', 'YouTube indexing'],
                ['ingestResearch', 'Research paper ingestion'],
                ['ingestScraping', 'Automated web scraping'],
              ].map(([key, label]) => (
                <div key={key} className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/40 p-4">
                  <div>
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-sm text-muted-foreground">Controls later automated data sources.</div>
                  </div>
                  <Switch checked={settings[key as keyof typeof settings]} onCheckedChange={() => toggle(key as keyof typeof settings)} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
                <Wand2 className="size-4 text-primary" />
                Product controls
              </div>
              {[
                ['enableWatchlists', 'Personalized watchlists'],
                ['enableSavedComparisons', 'Saved comparisons'],
              ].map(([key, label]) => (
                <div key={key} className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/40 p-4">
                  <div>
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-sm text-muted-foreground">Ready for user accounts later.</div>
                  </div>
                  <Switch checked={settings[key as keyof typeof settings]} onCheckedChange={() => toggle(key as keyof typeof settings)} />
                </div>
              ))}

              <div className="rounded-2xl border border-border/70 bg-background/40 p-4 text-sm leading-7 text-muted-foreground">
                The state layer is intentionally local-first today, but the module boundaries are ready for a server-backed
                product graph with auth, search vectors, saved lists, and daily data refresh jobs.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

