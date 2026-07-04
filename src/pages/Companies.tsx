import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Building2, ExternalLink } from 'lucide-react';
import { CompanyCard } from '@/components/company-card';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { navItems } from '@/components/navigation';
import { companies } from '@/data/intelligence';

export default function CompaniesPage() {
  const [query, setQuery] = useState('');

  const filteredCompanies = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return [...companies].filter((company) => {
      if (!normalized) return true;
      return (
        company.name.toLowerCase().includes(normalized) ||
        company.country.toLowerCase().includes(normalized) ||
        company.summary.toLowerCase().includes(normalized)
      );
    });
  }, [query]);

  const featured = filteredCompanies[0] ?? companies[0];

  return (
    <PageShell title="Humanoid Intelligence Index" subtitle="Companies" navItems={navItems}>
      <div className="space-y-6">
        <SectionHeading
          title="Company Database"
          description="Every manufacturer gets a profile with robots, factories, funding, and timeline context."
          action={
            <Button variant="secondary" asChild>
              <Link to="/search">
                <ExternalLink className="size-4" />
                Search companies
              </Link>
            </Button>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
                <Building2 className="size-4 text-primary" />
                Company search
              </div>
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tesla, Figure, China, hospital..." />
              <div className="space-y-3">
                {filteredCompanies.map((company) => (
                  <div key={company.id} className="rounded-2xl border border-border/70 bg-background/40 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-base font-semibold">{company.name}</div>
                        <div className="text-sm text-muted-foreground">{company.country}</div>
                      </div>
                      <div className="text-sm font-semibold text-primary">{company.robots.length}</div>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{company.summary}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <SectionHeading title="Featured company" description="Funding, factory footprint, and robot mix." />
              <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-2xl font-semibold">{featured.name}</div>
                    <div className="text-sm text-muted-foreground">{featured.country}</div>
                  </div>
                  <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {featured.robots.join(', ')}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{featured.summary}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Funding</div>
                  <div className="mt-2 text-2xl font-semibold">{featured.fundingUsd ? `$${(featured.fundingUsd / 1000000).toFixed(0)}M` : 'Public'}</div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Employees</div>
                  <div className="mt-2 text-2xl font-semibold">{featured.employees.toLocaleString()}</div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Factories</div>
                  <div className="mt-2 text-lg font-semibold">{featured.factoryLocations.join(', ')}</div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Production capacity</div>
                  <div className="mt-2 text-2xl font-semibold">{featured.productionCapacity.toLocaleString()}</div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Timeline</div>
                <div className="mt-3 space-y-2">
                  {featured.timeline.map((item) => (
                    <div key={item.year} className="flex items-center justify-between gap-4 text-sm">
                      <span>{item.label}</span>
                      <span className="text-muted-foreground">{item.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

