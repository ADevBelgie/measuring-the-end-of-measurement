import React, { useState } from 'react';
import { Activity, Info } from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip
} from 'recharts';

// ── Colors ────────────────────────────────────────────────────────
const COLORS = {
  arc1: '#6E8FB0',  // historical solved
  arc2: '#A9C4DE',  // recent past
  arc3: '#E8A33D',  // live frontier (signal)
};

// ── Strict Linear Timeline Data ───────────────────────────────────
const ARC1_DATA = [
  { year: 2020.0, pct: 0,    labelVal: '0%',   labelName: 'GPT-3',           align: 'middle', dy: -12, dx: 0 },
  { year: 2024.5, pct: 5,    labelVal: '5%',   labelName: 'GPT-4o',          align: 'middle', dy: -12, dx: 0 },
  { year: 2024.9, pct: 93,   labelVal: '93%',  labelName: 'o3 (Dec 24)',     align: 'end',    dy: -12, dx: -8 },
  { year: 2026.0, pct: 98,   labelVal: '98%',  labelName: 'Early 26',        align: 'end',    dy: -12, dx: -8 },
];

const ARC2_DATA = [
  { year: 2025.2, pct: 2.5,  labelVal: '2.5%', labelName: 'ARC-2 Launch',    align: 'middle', dy: -12, dx: 0 },
  { year: 2026.1, pct: 77.1, labelVal: '77.1%',labelName: 'Gemini 3.1 Pro',  align: 'end',    dy: 18,  dx: -8 },
  { year: 2026.1, pct: 84.6, labelVal: '84.6%',labelName: 'G3 Deep Think',   align: 'start',  dy: -12, dx: 8 },
];

const ARC3_DATA = [
  { year: 2026.2, pct: 0.37, labelVal: '0.37%',labelName: 'ARC-3 Launch',    align: 'end',    dy: -12, dx: -8 },
  { year: 2026.5, pct: 7.8,  labelVal: '7.8%', labelName: 'GPT-5.6 Sol ✓',   align: 'start',  dy: -12, dx: 8 },
];

// ── Custom tooltip ────────────────────────────────────────────────
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload;
  
  const formatTooltipYear = (yr) => {
    if (yr === 2020.0) return '2020 (GPT-3)';
    if (yr === 2024.5) return 'Mid-2024 (GPT-4o)';
    if (yr === 2024.9) return 'Dec 2024 (o3)';
    if (yr === 2025.2) return 'March 2025 (ARC-2 Launch)';
    if (yr === 2026.0) return 'Early 2026';
    if (yr === 2026.1) return 'Feb 2026 (Gemini 3)';
    if (yr === 2026.2) return 'March 2026 (ARC-3 Launch)';
    if (yr === 2026.5) return 'July 2026 (GPT-5.6 Sol)';
    return yr;
  };

  return (
    <div className="bg-panel border border-line/30 rounded-lg px-3 py-2 shadow-xl text-xs font-sans">
      <div className="text-ink-faint text-[10px] mb-1 font-semibold uppercase tracking-wider font-mono">
        {formatTooltipYear(point?.year)}
      </div>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5 font-mono">
          <span className="h-2 w-2 rounded" style={{ background: entry.color }} />
          <span className="text-ink-dim font-medium">{entry.name}:</span>
          <span className="text-ink font-bold">{entry.value}%</span>
        </div>
      ))}
    </div>
  );
};

// ── Custom dot with label ─────────────────────────────────────────
const makeDot = (color) => (props) => {
  const { cx, cy, payload } = props;
  if (cx == null || cy == null) return null;
  
  const align = payload.align || 'middle';
  const dy = payload.dy ?? -12;
  const dx = payload.dx ?? 0;

  return (
    <g className="font-mono">
      <circle cx={cx} cy={cy} r={5} fill={color} fillOpacity={0.2} />
      <circle cx={cx} cy={cy} r={3.5} fill={color} />
      {payload.labelVal && (
        <g>
          {/* Label Background for readability - styled with ground color */}
          <text
            x={cx + dx} y={cy + dy}
            textAnchor={align}
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
            x={cx + dx} y={cy + dy}
            textAnchor={align}
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

// ── Main Component ───────────────────────────────────────────────
const ArcAgiProgress = () => {
  const [activeTab, setActiveTab] = useState('all');

  const seriesInfo = [
    { id: 'arc1', name: 'ARC-AGI-1 (2020)', description: 'The original abstraction benchmark. Sat near 0% for years, then collapsed in under 12 months once test-time reasoning arrived.' },
    { id: 'arc2', name: 'ARC-AGI-2 (March 2025)', description: 'Second generation, March 2025. Harder multi-step static reasoning. Gemini 3 Deep Think reached 84.6% within a year of launch.' },
    { id: 'arc3', name: 'ARC-AGI-3 (March 2026)', description: 'Deliberately built off-path from the current training paradigm — language-free, scored by RHAE.' },
  ];

  const showArc1 = activeTab === 'all' || activeTab === 'arc1';
  const showArc2 = activeTab === 'all' || activeTab === 'arc2';
  const showArc3 = activeTab === 'all' || activeTab === 'arc3';

  return (
    <div className="glass-panel p-6 sm:p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-line/15 pb-4">
        <div>
          <h3 className="text-xl font-bold text-ink font-sans flex items-center gap-2">
            <Activity className="text-signal" size={20} />
            The ARC-AGI Cascade: Plateau & Collapse
          </h3>
          <p className="text-sm text-ink-dim mt-1">
            Visualizing the non-linear decay of abstraction benchmarks. Note the four-year plateau of ARC-1 followed by its sudden collapse.
          </p>
        </div>
        <div className="flex gap-1 bg-panel p-1 rounded-lg border border-line/20 self-stretch sm:self-auto text-xs shrink-0 font-mono">
          <button onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer border ${activeTab === 'all' ? 'bg-signal/15 text-signal border-signal/40' : 'text-ink-dim hover:text-ink hover:bg-raised border-transparent'}`}
          >All Series</button>
          {seriesInfo.map(s => (
            <button key={s.id} onClick={() => setActiveTab(s.id)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer border ${activeTab === s.id ? 'bg-signal/15 text-signal border-signal/40' : 'text-ink-dim hover:text-ink hover:bg-raised border-transparent'}`}
            >ARC-{s.id.slice(-1)}</button>
          ))}
        </div>
      </div>

      {/* Chart Layout */}
      <div className="w-full bg-ground border border-grid/60 rounded-lg p-2 sm:p-4 grid-paper">
        <ResponsiveContainer width="100%" height={380}>
          <LineChart margin={{ top: 25, right: 50, bottom: 5, left: 10 }}>
            <CartesianGrid stroke="#2A4A6B" />
            <XAxis
              dataKey="year"
              type="number"
              domain={[2019.8, 2026.7]}
              ticks={[2020, 2021, 2022, 2023, 2024, 2025, 2026]}
              tickFormatter={(tick) => String(tick)}
              tick={{ fill: '#7A94AC', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
              axisLine={{ stroke: '#2A4A6B' }}
              tickLine={{ stroke: '#2A4A6B' }}
            />
            <YAxis
              domain={[0, 105]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickFormatter={(v) => v <= 100 ? `${v}%` : ''}
              tick={{ fill: '#7A94AC', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
              axisLine={{ stroke: '#2A4A6B' }}
              tickLine={{ stroke: '#2A4A6B' }}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />

            {showArc1 && (
              <Line
                data={ARC1_DATA} dataKey="pct" name="ARC-AGI-1" type="linear"
                stroke={COLORS.arc1} strokeWidth={2.0}
                dot={makeDot(COLORS.arc1)}
                activeDot={{ r: 7, fill: COLORS.arc1 }}
                isAnimationActive={true}
              />
            )}
            {showArc2 && (
              <Line
                data={ARC2_DATA} dataKey="pct" name="ARC-AGI-2" type="linear"
                stroke={COLORS.arc2} strokeWidth={2.5}
                dot={makeDot(COLORS.arc2)}
                activeDot={{ r: 7, fill: COLORS.arc2 }}
                isAnimationActive={true}
              />
            )}
            {showArc3 && (
              <Line
                data={ARC3_DATA} dataKey="pct" name="ARC-AGI-3" type="linear"
                stroke={COLORS.arc3} strokeWidth={2.5} strokeDasharray="6 3"
                dot={makeDot(COLORS.arc3)}
                activeDot={{ r: 7, fill: COLORS.arc3 }}
                isAnimationActive={true}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Details layout */}
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {seriesInfo.map(s => {
            const isActive = activeTab === 'all' || activeTab === s.id;
            return (
              <div key={s.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${isActive ? 'bg-panel border-line/20' : 'opacity-40 border-transparent bg-transparent'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[s.id] }} />
                  <h4 className="font-semibold text-ink text-sm font-sans">{s.name}</h4>
                </div>
                <p className="text-xs text-ink-dim mt-2 leading-relaxed font-sans">{s.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-panel border border-signal/30 rounded-lg p-4 text-xs flex gap-3 text-ink-dim leading-relaxed">
          <Info size={24} className="shrink-0 text-signal mt-0.5" />
          <div>
            <span className="font-semibold block text-signal font-sans">The Abstraction Recipe:</span>
            ARC Prize releases new editions strictly designed to break existing scaling trends. ARC-3's GPT-5.6 Sol mark (7.8% verified) shows critical first movement, but the true test is whether this marks the start of a linear climb or the precursor to another paradigm-unlocking collapse.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcAgiProgress;
