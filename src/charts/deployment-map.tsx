import { memo } from 'react';

type DeploymentMapProps = {
  points: Array<{
    id: string;
    label: string;
    x: number;
    y: number;
    color: string;
    size: number;
  }>;
  className?: string;
};

export const DeploymentMap = memo(function DeploymentMap({ points, className }: DeploymentMapProps) {
  return (
    <div
      className={className}
      style={{
        background:
          'radial-gradient(circle at 50% 30%, rgba(42,92,255,0.14), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
      }}
    >
      <svg viewBox="0 0 1000 500" className="h-full w-full">
        <rect x="0" y="0" width="1000" height="500" fill="transparent" />
        <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2">
          <path d="M120,150 L220,120 L310,150 L320,210 L280,255 L220,250 L170,210 Z" />
          <path d="M430,120 L570,100 L660,150 L640,220 L560,250 L470,220 Z" />
          <path d="M720,140 L840,150 L900,210 L870,280 L780,300 L730,240 Z" />
          <path d="M370,290 L470,320 L450,400 L380,410 L330,350 Z" />
        </g>

        {points.map((point) => (
          <g key={point.id}>
            <circle cx={point.x} cy={point.y} r={point.size + 10} fill={point.color} opacity="0.14">
              <animate attributeName="r" values={`${point.size + 8};${point.size + 20};${point.size + 8}`} dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx={point.x} cy={point.y} r={point.size} fill={point.color} />
            <text x={point.x + 12} y={point.y - 10} fill="white" fontSize="14" fontFamily="Inter, sans-serif">
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
});

