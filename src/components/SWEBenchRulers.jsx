import React from 'react';
import { Ruler, ShieldAlert, Sparkles } from 'lucide-react';

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
        {/* Trend Line Visual */}
        <div className="bg-slate-950 border border-slate-900 rounded-xl p-5 flex flex-col justify-between min-h-[220px]">
          <div className="flex justify-between items-center text-xs text-slate-500 uppercase tracking-widest border-b border-slate-900 pb-2">
            <span>Historical Standardized Trend</span>
            <span className="text-indigo-400">Scale Standardized</span>
          </div>

          <div className="relative h-28 my-4 flex items-end">
            {/* SVG Trend Line */}
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <line x1="15" y1="35" x2="85" y2="15" stroke="#312e81" strokeWidth="1.5" />
              <line x1="15" y1="35" x2="85" y2="15" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="2 1" />
              
              {/* Point 1 */}
              <circle cx="15" cy="35" r="2.5" className="fill-indigo-500" />
              {/* Point 2 */}
              <circle cx="85" cy="15" r="2.5" className="fill-indigo-500" />
            </svg>

            {/* Labels overlay */}
            <div className="absolute inset-0 pointer-events-none text-xs">
              <div className="absolute left-[15%] bottom-[5%] -translate-x-1/2 flex flex-col items-center">
                <span className="font-bold text-white text-sm">45.9%</span>
                <span className="text-[9px] text-slate-500 mt-0.5">April 2026</span>
              </div>
              <div className="absolute right-[15%] top-[10%] translate-x-1/2 flex flex-col items-center">
                <span className="font-bold text-indigo-400 text-sm">59.1%</span>
                <span className="text-[9px] text-slate-500 mt-0.5">July 2026</span>
              </div>
            </div>
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
