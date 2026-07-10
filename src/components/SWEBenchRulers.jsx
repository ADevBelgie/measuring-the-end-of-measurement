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
  indigo: '#6366f1'
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload;
  return (
    <div className="bg-slate-900/95 border border-slate-700 rounded-lg px-3 py-2 shadow-xl text-xs font-sans">
      <div className="text-slate-500 text-[10px] mb-1 font-semibold uppercase tracking-wider">
        {point?.labelName}
      </div>
      <div className="flex items-center gap-2 py-0.5">
        <span className="h-2 w-2 rounded-full bg-indigo-500" />
        <span className="text-slate-300 font-medium">Standardized Score:</span>
        <span className="text-white font-bold">{payload[0].value}%</span>
      </div>
    </div>
  );
};

const makeDot = (color) => (props) => {
  const { cx, cy, payload } = props;
  if (cx == null || cy == null) return null;
  return (
    <g className="font-sans">
      <circle cx={cx} cy={cy} r={5} fill={color} fillOpacity={0.2} />
      <circle cx={cx} cy={cy} r={3.5} fill={color} />
      {payload.labelVal && (
        <g>
          {/* Label Background */}
          <text
            x={cx} y={cy - 12}
            textAnchor="middle"
            fill="#090d16"
            stroke="#090d16"
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
            fill="#f8fafc"
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
      color: 'bg-indigo-500',
      textColor: 'text-indigo-400',
      badge: 'Baseline Ruler'
    },
    {
      label: 'llm-stats Vendor Aggregate',
      value: '69.2%',
      description: 'Averaging vendor evaluation harnesses. Reflects aggregate vendor-claimed performance, containing variance in test-harness configurations.',
      color: 'bg-violet-400',
      textColor: 'text-violet-400',
      badge: 'Harness Aggregate'
    },
    {
      label: 'Claude Fable 5 (Vendor Reported)',
      value: '80.3%',
      description: 'Peak performance reported by the model builder. Often includes specialized system scaffolding, high-effort test-time scaling, and self-selected criteria.',
      color: 'bg-amber-400',
      textColor: 'text-amber-400',
      badge: 'Peak Claim'
    }
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 flex flex-col gap-6 glow-amber">
      <div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Ruler className="text-amber-400" size={20} />
          The Multi-Ruler Problem: Signal Decay in Real Time
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          As difficulty decays, the metric signal itself fragments. By July 2026, SWE-bench Pro had split into three competing "official" scores.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Trend Line Visual utilizing Recharts for perfect aspect ratio & styling consistency */}
        <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 sm:p-5 flex flex-col justify-between min-h-[300px]">
          <div className="flex justify-between items-center text-xs text-slate-500 uppercase tracking-widest border-b border-slate-900 pb-2">
            <span>Historical Standardized Trend</span>
            <span className="text-indigo-400">Scale Standardized</span>
          </div>

          <div className="w-full my-4">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={SWE_TREND_DATA} margin={{ top: 20, right: 30, bottom: 5, left: 10 }}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" />
                <XAxis
                  dataKey="time"
                  type="number"
                  domain={[-0.1, 1.1]}
                  ticks={[0, 1]}
                  tickFormatter={(v) => v === 0 ? 'April 2026' : 'July 2026'}
                  tick={{ fill: '#64748b', fontSize: 10 }}
                  axisLine={{ stroke: '#334155' }}
                  tickLine={{ stroke: '#334155' }}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                  tickFormatter={(v) => v <= 100 ? `${v}%` : ''}
                  tick={{ fill: '#64748b', fontSize: 10 }}
                  axisLine={{ stroke: '#334155' }}
                  tickLine={{ stroke: '#334155' }}
                  width={36}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  dataKey="pct"
                  name="Scale Standardized"
                  type="linear"
                  stroke={COLORS.indigo}
                  strokeWidth={2.5}
                  dot={makeDot(COLORS.indigo)}
                  activeDot={{ r: 6, fill: COLORS.indigo }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[10px] text-slate-400 leading-relaxed bg-indigo-950/20 border border-indigo-900/35 rounded-lg p-2.5 flex items-start gap-2">
            <Sparkles size={14} className="shrink-0 text-indigo-400 mt-0.5" />
            <span>
              <strong>Ten-Week Velocity:</strong> Standardized top score climbed 13.2 percentage points in roughly 70 days. Extrapolating this direct velocity yields full saturation before the end of the year.
            </span>
          </div>
        </div>

        {/* July Rulers comparison */}
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold border-b border-slate-900 pb-2">
            July 2026: The Fragmentation of Truth
          </div>

          <div className="flex flex-col gap-3">
            {JulyRulers.map((r, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3.5 flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`text-xl sm:text-2xl font-black ${r.textColor} leading-none font-mono`}>
                    {r.value}
                  </div>
                  <span className="text-[8px] uppercase tracking-wider text-slate-500 font-bold mt-1 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900">
                    {r.badge}
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-white">{r.label}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{r.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 text-xs text-slate-400 leading-relaxed flex gap-3">
        <ShieldAlert size={20} className="shrink-0 text-amber-500 mt-0.5" />
        <span>
          <strong>Why this happens:</strong> As benchmarks near saturation, vendors apply increasingly heavy engineering scaffolds (long-horizon search, self-correction loops, agentic wrappers) to squeeze out the final points. This introduces massive variance in evaluations. When the gap between "standardized baseline" and "builder claim" exceeds 20%, the benchmark is no longer measuring model capability alone; it is measuring the scaffolding complexity, leading to signal decay.
        </span>
      </div>
    </div>
  );
};

export default SWEBenchRulers;
