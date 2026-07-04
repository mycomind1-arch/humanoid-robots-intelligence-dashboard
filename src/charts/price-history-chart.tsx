import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

type PriceHistoryChartProps = {
  data: Array<{ year: string; price: number; note?: string }>;
  color?: string;
  className?: string;
};

export function PriceHistoryChart({ data, color = 'hsl(var(--primary))', className }: PriceHistoryChartProps) {
  return (
    <ChartContainer
      config={{
        price: {
          label: 'Price',
          color,
        },
      }}
      className={className}
      style={{ height: 260 }}
    >
      <AreaChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.35} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${Number(value) / 1000}k`} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
        <Tooltip content={<ChartTooltipContent hideLabel />} />
        <Area type="monotone" dataKey="price" stroke={color} strokeWidth={2} fill="url(#priceGradient)" />
      </AreaChart>
    </ChartContainer>
  );
}

