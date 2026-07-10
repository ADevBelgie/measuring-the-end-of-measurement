import React from 'react';
import { Ruler, ShieldAlert, Sparkles } from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip
} from 'recharts';

const SWE_TREND_DATA = [
  { time: 0, pct: 45.9, labelVal: '45.9%', labelName: 'April 2026' },
  { time: 1, pct: 59.1, labelVal: '59.1%', labelName: 'July 2026' }
];

const COLORS = {
  lineColor: '#A9C4DE'
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload;
  return (
    <div className="bg-panel border border-line/30 rounded-lg px-3 py-2 shadow-xl text-xs font-sans">
      <div className="text-ink-faint text-[10px] mb-1 font-semibold uppercase tracking-wider font-mono">
        {point?.labelName}
      </div>
      <div className="flex items-center gap-2 py-0.5 font-mono">
        <span className="h-2 w-2 rounded bg-line" />
        <span className="text-ink-dim font-medium">Standardized Score:</span>
        <span className="text-ink font-bold">{payload[0].value}%</span>
      </div>
    </div>
  );
};

const makeDot = (color) => (props) => {
  const { cx, cy, payload } = props;
  if (cx == null || cy == null) return null;
  return (
    <g className="font-mono">
      <circle cx={cx} cy={cy} r={5} fill={color} fillOpacity={0.2} />
      <circle cx={cx} cy={cy} r={3.5} fill={color} />
      {payload.labelVal && (
        <g>
          {/* Label Background using ground color */}
          <text
            x={cx} y={cy - 12}
            textAnchor="middle"
            fill="#0B2239"
            stroke="#0B2239"
            strokeWidth={4}
            fontSize={10}
            fontWeight={700}
            className="select-none pointer-events-none"
          >
            {payload.labelVal}
          </text>
          {/* Real Text */}
          <text
            x={cx} y={cy - 12}
            textAnchor="middle"
            fill="#F2F6FA"
            fontSize={10}
            fontWeight={600}
            className="select-none pointer-events-none"
          >
            {payload.labelVal}
          </text>
        </g>
      )}
    </g>
  );
};

const SWEBenchRulers = () => {
  const JulyRulers = [
    {
      label: 'Scale Standardized Public Set',
      value: '59.1%',
      description: 'Strict baseline standardization. This represents the cleanest, lowest-noise comparable signal across models.',
      textColor: 'text-ink',
      badgeClass: 'border-line/40 text-ink-dim/80',
      badge: 'Baseline Ruler'
    },
    {
      label: 'llm-stats Vendor Aggregate',
      value: '69.2%',
      description: 'Averaging vendor evaluation harnesses. Reflects aggregate vendor-claimed performance, containing variance in test-harness configurations.',
      textColor: 'text-line',
      badgeClass: 'border-line/40 text-line/80',
      badge: 'Harness Aggregate'
    },
    {
      label: 'Claude Fable 5 (Vendor Reported)',
      value: '80.3%',
      description: 'Peak performance reported by the model builder. Often includes specialized system scaffolding, high-effort test-time scaling, and self-selected criteria.',
      textColor: 'text-signal',
      badgeClass: 'border-signal/40 text-signal/85',
      badge: 'Peak Claim'
    }
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-bold text-ink flex items-center gap-2 font-sans">
          <Ruler className="text-signal" size={20} />
          The Multi-Ruler Problem: Signal Decay in Real Time
        </h3>
        <p className="text-sm text-ink-dim mt-1 font-sans">
          As difficulty decays, the metric signal itself fragments. By July 2026, SWE-bench Pro had split into three competing "official" scores.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Trend Line Visual utilizing Recharts */}
        <div className="bg-ground border border-grid/60 rounded-lg p-4 sm:p-5 flex flex-col justify-between min-h-[300px] grid-paper">
          <div className="flex justify-between items-center text-xs text-ink-faint uppercase tracking-widest border-b border-grid/50 pb-2 font-mono">
            <span>Historical Standardized Trend</span>
            <span className="text-line font-bold">Scale Standardized</span>
          </div>

          <div className="w-full my-4">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={SWE_TREND_DATA} margin={{ top: 20, right: 30, bottom: 5, left: 10 }}>
                <CartesianGrid stroke="#2A4A6B" />
                <XAxis
                  dataKey="time"
                  type="number"
                  domain={[-0.1, 1.1]}
                  ticks={[0, 1]}
                  tickFormatter={(v) => v === 0 ? 'April 2026' : 'July 2026'}
                  tick={{ fill: '#7A94AC', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
                  axisLine={{ stroke: '#2A4A6B' }}
                  tickLine={{ stroke: '#2A4A6B' }}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                  tickFormatter={(v) => v <= 100 ? `${v}%` : ''}
                  tick={{ fill: '#7A94AC', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
                  axisLine={{ stroke: '#2A4A6B' }}
                  tickLine={{ stroke: '#2A4A6B' }}
                  width={36}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  dataKey="pct"
                  name="Scale Standardized"
                  type="linear"
                  stroke={COLORS.lineColor}
                  strokeWidth={2.5}
                  dot={makeDot(COLORS.lineColor)}
                  activeDot={{ r: 6, fill: COLORS.lineColor }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[10px] text-ink-dim leading-relaxed bg-panel border border-line/25 rounded-lg p-2.5 flex items-start gap-2 font-sans">
            <Sparkles size={14} className="shrink-0 text-signal mt-0.5" />
            <span>
              <strong>Ten-Week Velocity:</strong> Standardized top score climbed 13.2 percentage points in roughly 70 days — though the brief's own thesis warns benchmark decay is punctuated, not linear, so this velocity should not be extrapolated.
            </span>
          </div>
        </div>

        {/* July Rulers comparison */}
        <div className="space-y-4 font-sans">
          <div className="text-xs uppercase tracking-widest text-ink-faint font-semibold border-b border-line/15 pb-2">
            July 2026: The Fragmentation of Truth
          </div>

          <div className="flex flex-col gap-3">
            {JulyRulers.map((r, idx) => (
              <div key={idx} className="bg-panel border border-line/20 rounded-lg p-3.5 flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`text-xl sm:text-2xl font-bold ${r.textColor} leading-none font-mono`}>
                    {r.value}
                  </div>
                  <span className={`text-[8px] uppercase tracking-wider font-bold mt-1 bg-ground px-1.5 py-0.5 rounded border ${r.badgeClass} font-mono`}>
                    {r.badge}
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-ink">{r.label}</h4>
                  <p className="text-[11px] text-ink-dim leading-relaxed">{r.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-panel border border-line/25 rounded-lg p-4 text-xs text-ink-dim leading-relaxed flex gap-3 font-sans">
        <ShieldAlert size={20} className="shrink-0 text-signal mt-0.5" />
        <span>
          <strong>Why this happens:</strong> As benchmarks near saturation, vendors apply increasingly heavy engineering scaffolds (long-horizon search, self-correction loops, agentic wrappers) to squeeze out the final points. This introduces massive variance in evaluations. As the gap between standardized baseline and builder claim widens, the benchmark increasingly measures scaffolding complexity rather than model capability alone.
        </span>
      </div>
    </div>
  );
};

export default SWEBenchRulers;
