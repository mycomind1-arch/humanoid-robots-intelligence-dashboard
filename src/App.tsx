import { useState, useMemo, useRef, useEffect } from 'react';
import {
  robots,
  statusColors,
  deploymentData,
  usChinaComparison,
  marketTrendData,
  recentDevelopments,
  filterOptions,
} from './data/robots';
import {
  Search,
  ChevronRight,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Globe,
  Cpu,
  Share2,
  Clock,
  Minus,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navTabs = ['Overview', 'Robots', 'Companies', 'Countries', 'Investments', 'News', 'Reports'];

function ScoreRing({ score }: { score: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#2A5CFF' : score >= 75 ? '#B8C2FF' : '#8A93A6';

  return (
    <div className="score-ring">
      <svg width="48" height="48" className="absolute" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={4} />
        <circle
          cx="24" cy="24" r={radius}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span style={{ color }}>{score}</span>
    </div>
  );
}

function DonutChart() {
  const size = 140;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const total = deploymentData.reduce((sum, d) => sum + d.value, 0);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {deploymentData.map((d, i) => {
        const dashLength = (d.value / total) * circumference;
        const segment = (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={d.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLength} ${circumference - dashLength}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
        offset += dashLength;
        return segment;
      })}
    </svg>
  );
}

function MarketTrendChart() {
  const width = 320;
  const height = 160;
  const padding = { top: 10, right: 10, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(...marketTrendData.flatMap(d => [d.usa, d.china, d.rest]));
  const years = marketTrendData.map(d => d.year);

  const xScale = (i: number) => padding.left + (i / (years.length - 1)) * chartWidth;
  const yScale = (v: number) => padding.top + chartHeight - (v / maxVal) * chartHeight;

  const usaPath = marketTrendData.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d.usa)}`).join(' ');
  const chinaPath = marketTrendData.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d.china)}`).join(' ');
  const restPath = marketTrendData.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d.rest)}`).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {[0, 1, 2, 3].map(i => {
        const y = padding.top + (chartHeight / 3) * i;
        return (
          <line key={i} x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        );
      })}
      {years.map((year, i) => (
        <text key={year} x={xScale(i)} y={height - 8} textAnchor="middle" fill="#8A93A6" fontSize={10} fontFamily="IBM Plex Mono">
          {year}
        </text>
      ))}
      <path d={usaPath} fill="none" stroke="#2A5CFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path d={chinaPath} fill="none" stroke="#FF2A3A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path d={restPath} fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <text x={width - padding.right + 4} y={yScale(marketTrendData[marketTrendData.length - 1].usa)} fill="#2A5CFF" fontSize={9} fontFamily="IBM Plex Mono" alignmentBaseline="middle">USA</text>
      <text x={width - padding.right + 4} y={yScale(marketTrendData[marketTrendData.length - 1].china)} fill="#FF2A3A" fontSize={9} fontFamily="IBM Plex Mono" alignmentBaseline="middle">CN</text>
      <text x={width - padding.right + 4} y={yScale(marketTrendData[marketTrendData.length - 1].rest)} fill="#6B7280" fontSize={9} fontFamily="IBM Plex Mono" alignmentBaseline="middle">ROW</text>
    </svg>
  );
}

function UsChinaBars() {
  return (
    <div className="space-y-3 w-full">
      {usChinaComparison.map((item, i) => {
        const usaWidth = (item.usa / 100) * 100;
        const chinaWidth = (item.china / 100) * 100;
        return (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-[#8A93A6] w-36 text-right shrink-0 truncate">{item.category}</span>
            <div className="flex-1 flex items-center gap-1">
              <div className="flex-1 flex justify-end">
                <div
                  className="h-2 rounded-full bg-[#2A5CFF] transition-all duration-700"
                  style={{ width: `${usaWidth * 0.8}%` }}
                />
              </div>
              <span className="text-xs font-mono text-[#F2F5FF] w-6 text-center">{item.usa}</span>
              <div className="w-8 flex justify-center">
                {item.usa > item.china ? (
                  <TrendingUp size={12} className="text-[#2A5CFF]" />
                ) : item.usa < item.china ? (
                  <TrendingDown size={12} className="text-[#FF2A3A]" />
                ) : (
                  <Minus size={12} className="text-[#8A93A6]" />
                )}
              </div>
              <span className="text-xs font-mono text-[#F2F5FF] w-6 text-center">{item.china}</span>
              <div className="flex-1">
                <div
                  className="h-2 rounded-full bg-[#FF2A3A] transition-all duration-700"
                  style={{ width: `${chinaWidth * 0.8}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FlagIcon({ code }: { code: string }) {
  const flags: Record<string, string> = {
    US: '\uD83C\uDDFA\uD83C\uDDF8',
    CN: '\uD83C\uDDE8\uD83C\uDDF3',
    CA: '\uD83C\uDDE8\uD83C\uDDE6',
  };
  return <span className="text-sm">{flags[code] || '\uD83C\uDF10'}</span>;
}

function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    country: 'All Countries',
    priceRange: 'All Prices',
    status: 'All Statuses',
    useCase: 'All Use Cases',
  });
  const [sortBy, setSortBy] = useState('Overall Score');

  const heroRef = useRef<HTMLDivElement>(null);
  const lineupRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-stat',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.hero-radar',
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.1 }
      );
      gsap.fromTo(
        '.hero-headline',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out', delay: 0.3 }
      );

      ScrollTrigger.batch('.kpi-card', {
        onEnter: (elements) => gsap.fromTo(elements, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }),
        start: 'top 85%',
      });

      ScrollTrigger.batch('.robot-card', {
        onEnter: (elements) => gsap.fromTo(elements, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' }),
        start: 'top 90%',
      });

      ScrollTrigger.batch('.comparison-row', {
        onEnter: (elements) => gsap.fromTo(elements, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }),
        start: 'top 85%',
      });
    });

    return () => ctx.revert();
  }, []);

  const filteredRobots = useMemo(() => {
    let result = [...robots];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.manufacturer.toLowerCase().includes(q) ||
        r.country.toLowerCase().includes(q)
      );
    }
    if (filters.country !== 'All Countries') {
      result = result.filter(r => r.country === filters.country);
    }
    if (filters.status !== 'All Statuses') {
      result = result.filter(r => r.status === filters.status);
    }
    if (sortBy === 'Overall Score') {
      result.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => {
        const getPrice = (p: string) => {
          const match = p.match(/\$?([\d,]+)/);
          return match ? parseInt(match[1].replace(/,/g, '')) : Infinity;
        };
        return getPrice(a.price) - getPrice(b.price);
      });
    }
    return result;
  }, [searchQuery, filters, sortBy]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-[#05060B] text-[#F2F5FF] relative">
      {/* Grid pattern background */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      <div className="fixed inset-0 scanline-overlay pointer-events-none" />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#05060B]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xl">🤖</span>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold tracking-tight leading-tight">Humanoid Robots Intelligence Dashboard</h1>
              <p className="text-[10px] text-[#8A93A6] leading-tight">
                Global Market Overview & Competitive Landscape <span className="live-badge ml-1">LIVE</span>
              </p>
            </div>
            <span className="sm:hidden text-sm font-semibold">HRID</span>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-[#8A93A6]">
              <Clock size={12} />
              <span>May 24, 2025 09:30 AM UTC</span>
            </div>
            <button className="flex items-center gap-1.5 text-xs bg-white/[0.06] hover:bg-white/[0.1] px-3 py-1.5 rounded-lg transition-colors">
              <Share2 size={13} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 lg:px-6 py-6 space-y-6 relative z-10">
        {/* Section 1: Hero + KPI Cards */}
        <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Total Humanoid Robots */}
          <div className="lg:col-span-2 card-dark p-5 hero-stat">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8A93A6] mb-3">Total Humanoid Robots</p>
            <div className="text-5xl font-bold tracking-tight">42</div>
            <p className="text-xs text-[#8A93A6] mt-1">Models Tracked</p>
            <div className="flex gap-6 mt-4">
              <div>
                <div className="text-xl font-bold">28</div>
                <p className="text-[10px] text-[#8A93A6]">Companies</p>
              </div>
              <div>
                <div className="text-xl font-bold">12</div>
                <p className="text-[10px] text-[#8A93A6]">Countries</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs text-green-400">
              <TrendingUp size={12} />
              <span>+17% vs last quarter</span>
            </div>
          </div>

          {/* Market Outlook */}
          <div className="lg:col-span-3 card-dark p-5 hero-stat accent-border-top">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8A93A6] mb-3">Market Outlook</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">$38.7B</span>
              <span className="text-xs text-[#8A93A6]">2025 Market Size</span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-[#B8C2FF]">$153.5B</span>
              <span className="text-xs text-[#8A93A6]">2032 Projected Size</span>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs text-green-400">
              <TrendingUp size={12} />
              <span>+24.3% CAGR 2025-2032</span>
            </div>
          </div>

          {/* US vs China */}
          <div className="lg:col-span-3 card-dark p-5 hero-stat">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8A93A6] mb-3">U.S. vs CHINA OVERALL</p>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center">
                  <FlagIcon code="US" />
                  <span className="text-4xl font-bold text-[#2A5CFF]">61.4</span>
                </div>
                <p className="text-xs text-[#8A93A6] mt-1">USA</p>
              </div>
              <div className="text-xl font-bold text-[#8A93A6]">vs</div>
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center">
                  <FlagIcon code="CN" />
                  <span className="text-4xl font-bold text-[#FF2A3A]">56.8</span>
                </div>
                <p className="text-xs text-[#8A93A6] mt-1">CHINA</p>
              </div>
            </div>
            <p className="text-[10px] text-[#8A93A6] mt-3 text-center">Overall Leadership Score</p>
          </div>

          {/* Deployment Snapshot */}
          <div className="lg:col-span-2 card-dark p-5 hero-stat">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8A93A6] mb-3">Deployment Snapshot</p>
            <div className="flex justify-center">
              <DonutChart />
            </div>
            <div className="space-y-1.5 mt-3">
              {deploymentData.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-[#8A93A6]">{d.label}</span>
                  </div>
                  <span className="font-mono">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Breakthrough */}
          <div className="lg:col-span-2 card-dark p-5 hero-stat">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8A93A6] mb-3">Latest Breakthrough</p>
            <p className="text-sm font-semibold leading-snug">Unitree G1 price drop to $16K</p>
            <p className="text-[10px] text-[#8A93A6] mt-1">May 13, 2025</p>
            <p className="text-xs text-[#8A93A6] mt-2 leading-relaxed">Unitree reduces G1 price by 20% making advanced mobility more accessible.</p>
            <button className="flex items-center gap-1 text-xs text-[#2A5CFF] mt-3 hover:underline">
              View all updates <ChevronRight size={12} />
            </button>
          </div>
        </div>

        {/* Section 2: Robot Lineup with Filters */}
        <div ref={lineupRef}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Filter Sidebar */}
            <div className="w-full lg:w-56 shrink-0">
              <div className="card-dark p-4 space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8A93A6]">Filters</p>
                  <button
                    onClick={() => {
                      setFilters({ country: 'All Countries', priceRange: 'All Prices', status: 'All Statuses', useCase: 'All Use Cases' });
                      setSearchQuery('');
                    }}
                    className="text-[10px] text-[#2A5CFF] hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                <div>
                  <div className="relative">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8A93A6]" />
                    <input
                      type="text"
                      placeholder="Search robots, companies..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-8 pr-3 py-2 text-xs placeholder:text-[#8A93A6]/60 focus:outline-none focus:border-[#2A5CFF]/50"
                    />
                  </div>
                </div>

                <div>
                  <p className="filter-label">Country</p>
                  <select
                    value={filters.country}
                    onChange={e => handleFilterChange('country', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#2A5CFF]/50 appearance-none cursor-pointer"
                  >
                    {filterOptions.country.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <p className="filter-label">Price Range</p>
                  <select
                    value={filters.priceRange}
                    onChange={e => handleFilterChange('priceRange', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#2A5CFF]/50 appearance-none cursor-pointer"
                  >
                    {filterOptions.priceRange.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div>
                  <p className="filter-label">Deployment Status</p>
                  <select
                    value={filters.status}
                    onChange={e => handleFilterChange('status', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#2A5CFF]/50 appearance-none cursor-pointer"
                  >
                    {filterOptions.status.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <p className="filter-label">Use Case</p>
                  <select
                    value={filters.useCase}
                    onChange={e => handleFilterChange('useCase', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#2A5CFF]/50 appearance-none cursor-pointer"
                  >
                    {filterOptions.useCase.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>

                <div>
                  <p className="filter-label">Legend</p>
                  <div className="space-y-1.5">
                    {Object.entries(statusColors).map(([status, colors]) => (
                      <div key={status} className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${colors.bg.replace('/20', '')}`} style={{ backgroundColor: status === 'Research / Prototype' ? '#8A93A6' : status === 'Limited Deployment' ? '#2A5CFF' : status === 'Commercial Use' ? '#B8C2FF' : '#00C27A' }} />
                        <span className="text-[10px] text-[#8A93A6]">{status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="filter-label">Payload Capacity</p>
                  <select className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#2A5CFF]/50 appearance-none cursor-pointer">
                    <option>All Payloads</option>
                    <option>Under 10 kg</option>
                    <option>10-20 kg</option>
                    <option>20-30 kg</option>
                    <option>30+ kg</option>
                  </select>
                </div>

                <div>
                  <p className="filter-label">Mobility</p>
                  <select className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#2A5CFF]/50 appearance-none cursor-pointer">
                    <option>All Mobility Types</option>
                    <option>Bipedal Walking</option>
                    <option>Running</option>
                    <option>Stair Climbing</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Robot Grid */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Humanoid Robot Lineup</h2>
                  <span className="text-xs text-[#8A93A6]">({filteredRobots.length} Models)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#8A93A6] uppercase">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-1 text-xs focus:outline-none"
                  >
                    <option>Overall Score</option>
                    <option>Price: Low to High</option>
                    <option>Name A-Z</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                {filteredRobots.map(robot => {
                  const statusStyle = statusColors[robot.status];
                  return (
                    <div
                      key={robot.id}
                      className="robot-card card-dark overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                      style={{ borderTop: `2px solid ${statusStyle.border.replace('border-', '')}` }}
                    >
                      {/* Robot Image */}
                      <div className="relative h-48 bg-gradient-to-b from-white/[0.02] to-transparent flex items-center justify-center p-4">
                        <img
                          src={robot.image}
                          alt={robot.name}
                          className="h-full w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className={`absolute top-3 left-3 status-pill ${statusStyle.bg} ${statusStyle.text}`}>
                          {robot.status}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-sm">{robot.name}</h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <FlagIcon code={robot.countryCode} />
                              <span className="text-xs text-[#8A93A6]">{robot.manufacturer}</span>
                            </div>
                          </div>
                          <ScoreRing score={robot.score} />
                        </div>

                        {/* Specs Table */}
                        <table className="spec-table w-full">
                          <tbody>
                            <tr><td>Height</td><td>{robot.specs.height}</td></tr>
                            <tr><td>Weight</td><td>{robot.specs.weight}</td></tr>
                            <tr><td>Payload</td><td>{robot.specs.payload}</td></tr>
                            <tr><td>Top Speed</td><td>{robot.specs.topSpeed}</td></tr>
                            <tr><td>Battery</td><td>{robot.specs.battery}</td></tr>
                            <tr><td>DOF</td><td>{robot.specs.dof}</td></tr>
                            <tr><td>AI System</td><td>{robot.specs.aiSystem}</td></tr>
                            <tr><td>Use Cases</td><td>{robot.specs.useCases}</td></tr>
                          </tbody>
                        </table>

                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                          <div>
                            <p className="text-[10px] text-[#8A93A6]">Price {robot.priceEstimate}</p>
                            <p className="text-sm font-semibold text-[#2A5CFF]">{robot.price}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-[#8A93A6]">Availability</p>
                            <p className="text-xs">{robot.availability}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredRobots.length === 0 && (
                <div className="card-dark p-12 text-center">
                  <p className="text-[#8A93A6]">No robots match your filters.</p>
                  <button
                    onClick={() => {
                      setFilters({ country: 'All Countries', priceRange: 'All Prices', status: 'All Statuses', useCase: 'All Use Cases' });
                      setSearchQuery('');
                    }}
                    className="text-[#2A5CFF] text-sm mt-2 hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between mt-4 text-xs text-[#8A93A6]">
                <span>Showing {filteredRobots.length} of {robots.length} robots</span>
                <button className="flex items-center gap-1 text-[#2A5CFF] hover:underline">
                  View all robots <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Bottom Comparison + Trend + News */}
        <div ref={comparisonRef} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* US vs China Comparison */}
          <div className="lg:col-span-4 card-dark p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={14} className="text-[#2A5CFF]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider">U.S. vs CHINA: KEY COMPARISON</h3>
            </div>
            <UsChinaBars />
            <button className="flex items-center gap-1 text-xs text-[#2A5CFF] mt-4 hover:underline">
              View full analysis <ChevronRight size={12} />
            </button>
          </div>

          {/* Robot Deployment Map */}
          <div className="lg:col-span-4 card-dark p-5">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={14} className="text-[#2A5CFF]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider">ROBOT DEPLOYMENT MAP</h3>
            </div>
            <div className="relative h-40 bg-[#0d1120] rounded-lg overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 360 180" className="w-full h-full opacity-40">
                <ellipse cx="180" cy="90" rx="170" ry="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={0.5} />
                <ellipse cx="180" cy="90" rx="120" ry="60" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />
                <path d="M50,70 Q90,50 130,65 T210,60 T280,75 T320,70" fill="none" stroke="rgba(42,92,255,0.3)" strokeWidth={1} />
                <circle cx="60" cy="55" r={3} fill="#2A5CFF" />
                <circle cx="150" cy="50" r={3} fill="#FF2A3A" />
                <circle cx="250" cy="60" r={3} fill="#00C27A" />
                <circle cx="100" cy="75" r={3} fill="#B8C2FF" />
                <circle cx="200" cy="70" r={3} fill="#2A5CFF" />
                <circle cx="300" cy="65" r={2.5} fill="#8A93A6" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Globe size={32} className="text-[#2A5CFF]/30 mx-auto" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3">
              {deploymentData.map((d, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-[10px] text-[#8A93A6]">{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Market Trend */}
          <div className="lg:col-span-2 card-dark p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={14} className="text-[#2A5CFF]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider">MARKET TREND</h3>
            </div>
            <MarketTrendChart />
            <div className="flex items-center justify-center gap-4 mt-2 text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-[#2A5CFF] rounded" />
                <span className="text-[#8A93A6]">USA</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-[#FF2A3A] rounded" />
                <span className="text-[#8A93A6]">China</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-[#6B7280] rounded" />
                <span className="text-[#8A93A6]">Rest of World</span>
              </div>
            </div>
            <button className="flex items-center gap-1 text-[10px] text-[#2A5CFF] mt-3 hover:underline">
              View detailed forecast <ChevronRight size={10} />
            </button>
          </div>

          {/* Recent Developments */}
          <div className="lg:col-span-2 card-dark p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} className="text-[#2A5CFF]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider">RECENT DEVELOPMENTS</h3>
            </div>
            <div className="space-y-3">
              {recentDevelopments.map((dev, i) => (
                <div key={i} className="flex items-start gap-2">
                  <FlagIcon code={dev.flag} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] leading-tight truncate">{dev.headline}</p>
                    <p className="text-[10px] text-[#8A93A6] mt-0.5">{dev.date}</p>
                  </div>
                  {dev.source === 'official' ? (
                    <ExternalLink size={10} className="text-[#2A5CFF] shrink-0 mt-0.5" />
                  ) : (
                    <Cpu size={10} className="text-[#8A93A6] shrink-0 mt-0.5" />
                  )}
                </div>
              ))}
            </div>
            <button className="flex items-center gap-1 text-[10px] text-[#2A5CFF] mt-4 hover:underline">
              View all news <ChevronRight size={10} />
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-[10px] text-[#8A93A6]/60 text-center pb-4">
          Disclaimer: Data is compiled from public sources and company announcements. Scores are based on proprietary methodology and should be used for informational purposes only.
        </div>
      </main>
    </div>
  );
}

export default App;
