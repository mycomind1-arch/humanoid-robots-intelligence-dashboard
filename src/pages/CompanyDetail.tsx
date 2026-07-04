import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { navItems } from '@/components/navigation';
import { companies } from '@/data/intelligence';

export default function CompanyDetailPage() {
  const { companyId } = useParams();
  const company = companies.find((item) => item.id === companyId) ?? companies[0];

  return (
    <PageShell title="Humanoid Intelligence Index" subtitle="Company profile" navItems={navItems}>
      <div className="space-y-6">
        <Button variant="ghost" asChild className="w-fit">
          <Link to="/companies">
            <ArrowLeft className="size-4" />
            Back to companies
          </Link>
        </Button>
        <SectionHeading title={company.name} description={company.summary} />
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                <div className="text-2xl font-semibold">{company.country}</div>
                <div className="text-sm text-muted-foreground">Founded {company.founded}</div>
                <div className="mt-2 text-sm text-muted-foreground">{company.factoryLocations.join(', ')}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border/70 bg-background/40 p-3">Employees: {company.employees.toLocaleString()}</div>
                <div className="rounded-2xl border border-border/70 bg-background/40 p-3">Patents: {company.patents}</div>
                <div className="rounded-2xl border border-border/70 bg-background/40 p-3">Capacity: {company.productionCapacity.toLocaleString()}</div>
                <div className="rounded-2xl border border-border/70 bg-background/40 p-3">Robots: {company.robots.join(', ')}</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-5">
              <div className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Timeline</div>
              <div className="space-y-3">
                {company.timeline.map((item) => (
                  <div key={item.year} className="rounded-2xl border border-border/70 bg-background/40 p-4">
                    <div className="text-base font-semibold">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.year}</div>
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
