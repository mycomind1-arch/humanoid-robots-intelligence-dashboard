import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Clock3, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type NavItem = {
  label: string;
  href: string;
};

type PageShellProps = {
  title: string;
  subtitle: string;
  navItems: ReadonlyArray<NavItem>;
  children: ReactNode;
};

export function PageShell({ title, subtitle, navItems, children }: PageShellProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(42,92,255,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(0,194,122,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%)]" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1700px] items-center gap-4 px-4 py-3 lg:px-6">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="flex size-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_35px_rgba(42,92,255,0.15)]">
              <span className="text-lg">H</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">{title}</div>
              <div className="text-[11px] text-muted-foreground">{subtitle}</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1">
            {navItems.map((item) => {
              const active = item.href === '/' ? location.pathname === '/' : location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm transition-colors',
                    active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden xl:flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-2">
              <Search className="size-4 text-muted-foreground" />
              <Input
                aria-label="Global search"
                placeholder="Search robots, companies, deployments..."
                className="h-7 w-[320px] border-0 bg-transparent px-0 text-sm shadow-none placeholder:text-muted-foreground/70 focus-visible:ring-0"
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    navigate(`/search?q=${encodeURIComponent(event.currentTarget.value)}`);
                  }
                }}
              />
            </div>
            <div className="hidden md:flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-2 text-xs text-muted-foreground">
              <Clock3 className="size-4" />
              <span>Live intelligence snapshot</span>
            </div>
            <Button
              variant="secondary"
              className="rounded-full"
              onClick={() => navigate('/search')}
            >
              Search
            </Button>
          </div>
        </div>

        <div className="lg:hidden border-t border-border/60">
          <div className="mx-auto flex max-w-[1700px] gap-2 overflow-x-auto px-4 py-2 lg:px-6">
            {navItems.map((item) => {
              const active = item.href === '/' ? location.pathname === '/' : location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors',
                    active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1700px] px-4 py-6 lg:px-6 lg:py-8">{children}</main>
    </div>
  );
}
