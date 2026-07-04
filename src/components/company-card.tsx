import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { CompanyRecord } from '@/types/intelligence';

type CompanyCardProps = {
  company: CompanyRecord;
  className?: string;
};

export function CompanyCard({ company, className }: CompanyCardProps) {
  return (
    <Card className={cn('border-border/70 bg-card/80 shadow-[0_20px_60px_rgba(0,0,0,0.3)]', className)}>
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-4 text-base">
          <span>{company.name}</span>
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{company.country}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="leading-6 text-muted-foreground">{company.summary}</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border/70 bg-background/40 p-3">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Founded</div>
            <div className="mt-1 font-medium">{company.founded}</div>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/40 p-3">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Robots</div>
            <div className="mt-1 font-medium">{company.robots.length}</div>
          </div>
        </div>
        <Link to={`/companies/${company.id}`} className="text-primary hover:underline">
          Open company page
        </Link>
      </CardContent>
    </Card>
  );
}

