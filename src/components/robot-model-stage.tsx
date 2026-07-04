import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import type { RobotRecord } from '@/types/intelligence';

type RobotModelStageProps = {
  robot: RobotRecord;
  className?: string;
  variant?: 'card' | 'detail';
};

type RobotPalette = {
  accent: string;
  accentSoft: string;
  accentDeep: string;
  shellLight: string;
  shell: string;
  shellDeep: string;
  glow: string;
  shadow: string;
};

const palettes: RobotPalette[] = [
  {
    accent: '#2A5CFF',
    accentSoft: 'rgba(42, 92, 255, 0.30)',
    accentDeep: '#1634A8',
    shellLight: '#E6EBFF',
    shell: '#A8B4D8',
    shellDeep: '#536089',
    glow: 'rgba(42, 92, 255, 0.45)',
    shadow: 'rgba(0, 0, 0, 0.55)',
  },
  {
    accent: '#00C27A',
    accentSoft: 'rgba(0, 194, 122, 0.28)',
    accentDeep: '#008157',
    shellLight: '#E2FFF1',
    shell: '#9AD8BC',
    shellDeep: '#4E7C6B',
    glow: 'rgba(0, 194, 122, 0.42)',
    shadow: 'rgba(0, 0, 0, 0.56)',
  },
  {
    accent: '#00B8FF',
    accentSoft: 'rgba(0, 184, 255, 0.28)',
    accentDeep: '#0072A5',
    shellLight: '#DDF7FF',
    shell: '#94C7D8',
    shellDeep: '#4A7687',
    glow: 'rgba(0, 184, 255, 0.42)',
    shadow: 'rgba(0, 0, 0, 0.54)',
  },
  {
    accent: '#FFB84A',
    accentSoft: 'rgba(255, 184, 74, 0.28)',
    accentDeep: '#B36B00',
    shellLight: '#FFF1DA',
    shell: '#D9BA8A',
    shellDeep: '#8A6A45',
    glow: 'rgba(255, 184, 74, 0.42)',
    shadow: 'rgba(0, 0, 0, 0.54)',
  },
  {
    accent: '#E95CFF',
    accentSoft: 'rgba(233, 92, 255, 0.24)',
    accentDeep: '#9F1CB4',
    shellLight: '#FFE7FF',
    shell: '#D0A1DB',
    shellDeep: '#825A8A',
    glow: 'rgba(233, 92, 255, 0.42)',
    shadow: 'rgba(0, 0, 0, 0.55)',
  },
];

function hashString(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getPalette(robot: RobotRecord) {
  return palettes[hashString(robot.id) % palettes.length];
}

function partGradient(shellLight: string, shell: string, shellDeep: string) {
  return `linear-gradient(180deg, ${shellLight} 0%, ${shell} 46%, ${shellDeep} 100%)`;
}

export function RobotModelStage({ robot, className, variant = 'card' }: RobotModelStageProps) {
  const palette = getPalette(robot);
  const scale = (variant === 'detail' ? 1.06 : 0.92) * clamp(robot.heightM / 1.72, 0.84, 1.12);
  const yaw = (hashString(robot.id) % 18) - 9;
  const pitch = 62 + (hashString(robot.id) % 4);
  const roll = ((hashString(robot.id) >> 3) % 5) - 2;
  const shell = partGradient(palette.shellLight, palette.shell, palette.shellDeep);
  const detail = variant === 'detail';

  const rootStyle = {
    '--robot-accent': palette.accent,
    '--robot-accent-soft': palette.accentSoft,
    '--robot-accent-deep': palette.accentDeep,
    '--robot-shell': shell,
    '--robot-glow': palette.glow,
    '--robot-shadow': palette.shadow,
    '--robot-scale': `${scale}`,
    '--robot-yaw': `${yaw}deg`,
    '--robot-pitch': `${pitch}deg`,
    '--robot-roll': `${roll}deg`,
  } as CSSProperties;

  return (
    <div
      role="img"
      aria-label={`${robot.name} 3D model`}
      className={cn('relative isolate overflow-hidden rounded-[1.5rem] bg-[#04050b]', className)}
      style={rootStyle}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 24%, var(--robot-accent-soft) 0%, rgba(5, 6, 11, 0.15) 34%, rgba(5, 6, 11, 0.92) 72%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0) 18%)`,
        }}
      />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
      <div className="absolute left-1/2 top-[58%] h-32 w-[74%] -translate-x-1/2 rounded-full blur-3xl" style={{ background: palette.glow }} />
      <div className="absolute left-1/2 top-[69%] h-[4.5rem] w-[58%] -translate-x-1/2 rounded-full bg-black/70 blur-3xl" />
      <div className="absolute inset-0 flex items-center justify-center [perspective:1500px]">
        <div className="robot-float relative h-[78%] w-[78%] [transform-style:preserve-3d]">
          <div
            className="absolute inset-0"
            style={{
              transform: `rotateX(var(--robot-pitch)) rotateY(var(--robot-yaw)) rotateZ(var(--robot-roll)) scale(var(--robot-scale))`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="absolute left-1/2 top-[78%] h-16 w-[64%] -translate-x-1/2 rounded-full blur-2xl"
              style={{ background: 'var(--robot-shadow)' }}
            />
            <div
              className="absolute left-1/2 top-[73%] h-12 w-[46%] -translate-x-1/2 rounded-full border border-white/10 bg-white/5"
              style={{ boxShadow: '0 0 0 10px var(--robot-accent-soft)' }}
            />
            <div
              className="absolute left-1/2 top-[72.5%] h-10 w-[30%] -translate-x-1/2 rounded-[999px] border border-white/12"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.08) 100%)',
              }}
            />
            <div
              className="absolute left-1/2 top-[19%] h-[15%] w-[25%] -translate-x-1/2 rounded-[1.4rem] border border-white/12"
              style={{
                background: shell,
                boxShadow: '0 18px 45px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.28)',
              }}
            >
              <div className="absolute inset-x-[18%] top-[24%] h-[28%] rounded-[999px] border border-white/12 bg-black/62" />
              <div
                className="absolute left-[29%] top-[38%] h-[8%] w-[8%] rounded-full"
                style={{ background: 'var(--robot-accent)', boxShadow: '0 0 14px var(--robot-glow)' }}
              />
              <div
                className="absolute right-[29%] top-[38%] h-[8%] w-[8%] rounded-full"
                style={{ background: 'var(--robot-accent)', boxShadow: '0 0 14px var(--robot-glow)' }}
              />
              <div className="absolute left-1/2 top-[63%] h-[8%] w-[42%] -translate-x-1/2 rounded-full bg-white/20" />
              {detail ? (
                <div
                  className="absolute inset-x-[34%] bottom-[10%] h-[12%] rounded-full"
                  style={{ background: 'linear-gradient(90deg, transparent, var(--robot-accent-soft), transparent)' }}
                />
              ) : null}
            </div>

            <div
              className="absolute left-1/2 top-[34%] h-[22%] w-[34%] -translate-x-1/2 rounded-[2rem] border border-white/10"
              style={{
                background: shell,
                boxShadow: '0 24px 70px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <div
                className="absolute inset-x-[16%] top-[12%] h-[24%] rounded-[1rem] border border-white/12"
                style={{
                  background: `linear-gradient(180deg, var(--robot-accent) 0%, var(--robot-accent-deep) 100%)`,
                  boxShadow: '0 0 22px var(--robot-glow)',
                }}
              />
              <div className="absolute inset-x-[26%] top-[48%] h-[10%] rounded-full" style={{ background: 'linear-gradient(90deg, transparent, var(--robot-accent-soft), transparent)' }} />
              <div className="absolute left-1/2 top-[56%] h-[16%] w-[13%] -translate-x-1/2 rounded-full bg-white/70 blur-[1px]" />
              {detail ? (
                <div className="absolute left-[13%] top-[38%] h-[24%] w-[14%] rounded-full border border-white/10 bg-white/10" />
              ) : null}
            </div>

            <div className="absolute left-1/2 top-[25%] h-[10%] w-[8%] -translate-x-1/2 rounded-full" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.12))' }} />

            <div
              className="absolute left-[17%] top-[43%] h-[30%] w-[19%] rounded-[999px] border border-white/10"
              style={{
                background: shell,
                transform: 'rotate(-12deg)',
                boxShadow: '0 14px 40px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.18)',
              }}
            >
              <div className="absolute left-[74%] top-[16%] h-[68%] w-[42%] rounded-[999px] border border-white/10 bg-white/10" />
              <div className="absolute -right-[10%] bottom-[8%] h-[20%] w-[26%] rounded-full" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.26), rgba(255,255,255,0.06))' }} />
              {detail ? <div className="absolute -left-[6%] top-[18%] h-[18%] w-[18%] rounded-full bg-white/20" /> : null}
            </div>

            <div
              className="absolute right-[17%] top-[43%] h-[30%] w-[19%] rounded-[999px] border border-white/10"
              style={{
                background: shell,
                transform: 'rotate(12deg)',
                boxShadow: '0 14px 40px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.18)',
              }}
            >
              <div className="absolute right-[74%] top-[16%] h-[68%] w-[42%] rounded-[999px] border border-white/10 bg-white/10" />
              <div className="absolute -left-[10%] bottom-[8%] h-[20%] w-[26%] rounded-full" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.26), rgba(255,255,255,0.06))' }} />
              {detail ? <div className="absolute -right-[6%] top-[18%] h-[18%] w-[18%] rounded-full bg-white/20" /> : null}
            </div>

            <div
              className="absolute left-[28%] top-[58%] h-[31%] w-[12%] rounded-[999px] border border-white/10"
              style={{
                background: shell,
                transform: 'rotate(4deg)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.34)',
              }}
            >
              <div className="absolute bottom-[-12%] left-1/2 h-[28%] w-[62%] -translate-x-1/2 rounded-full border border-white/10 bg-white/20" />
            </div>
            <div
              className="absolute right-[28%] top-[58%] h-[31%] w-[12%] rounded-[999px] border border-white/10"
              style={{
                background: shell,
                transform: 'rotate(-4deg)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.34)',
              }}
            >
              <div className="absolute bottom-[-12%] left-1/2 h-[28%] w-[62%] -translate-x-1/2 rounded-full border border-white/10 bg-white/20" />
            </div>

            <div
              className="absolute left-[33%] top-[80%] h-[14%] w-[12%] -translate-x-1/2 rounded-[1rem] border border-white/10"
              style={{
                background: `linear-gradient(180deg, ${palette.shellLight} 0%, ${palette.shell} 55%, ${palette.shellDeep} 100%)`,
                transform: 'rotate(6deg)',
              }}
            />
            <div
              className="absolute right-[33%] top-[80%] h-[14%] w-[12%] translate-x-1/2 rounded-[1rem] border border-white/10"
              style={{
                background: `linear-gradient(180deg, ${palette.shellLight} 0%, ${palette.shell} 55%, ${palette.shellDeep} 100%)`,
                transform: 'rotate(-6deg)',
              }}
            />

            {detail ? (
              <>
                <div
                  className="absolute left-1/2 top-[6%] h-[10%] w-[3%] -translate-x-1/2 rounded-full"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.1))' }}
                />
                <div
                  className="absolute left-1/2 top-[3%] h-[6%] w-[1.6%] -translate-x-1/2 rounded-full"
                  style={{ background: 'var(--robot-accent)', boxShadow: '0 0 18px var(--robot-glow)' }}
                />
                <div
                  className="absolute left-[22%] top-[30%] h-[12%] w-[6%] rounded-full"
                  style={{ background: 'var(--robot-accent-soft)', filter: 'blur(1px)' }}
                />
                <div
                  className="absolute right-[22%] top-[30%] h-[12%] w-[6%] rounded-full"
                  style={{ background: 'var(--robot-accent-soft)', filter: 'blur(1px)' }}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
