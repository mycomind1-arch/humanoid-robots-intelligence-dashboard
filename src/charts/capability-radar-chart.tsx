import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

type CapabilityRadarChartProps = {
  data: Array<{ label: string; value: number }>;
  color?: string;
  height?: number;
  className?: string;
};

export function CapabilityRadarChart({
  data,
  color = 'hsl(var(--primary))',
  height = 320,
  className,
}: CapabilityRadarChartProps) {
  return (
    <ChartContainer
      config={{
        capability: {
          label: 'Capability',
          color,
        },
      }}
      className={className}
      style={{ height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis dataKey="label" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
          <Tooltip content={<ChartTooltipContent hideLabel />} />
          <Radar
            name="Capability"
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.22}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

