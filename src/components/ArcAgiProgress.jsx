import React, { useState } from 'react';
import { Activity, Info } from 'lucide-react';

const ArcAgiProgress = () => {
  const [activeTab, setActiveTab] = useState('all');

  const benchmarks = [
    {
      id: 'arc1',
      name: 'ARC-AGI-1 (2020)',
      description: 'The original abstraction benchmark. Sat near 0% for years, then collapsed in under 12 months once test-time reasoning arrived.',
      color: 'stroke-indigo-500',
      fill: 'bg-indigo-500',
      textColor: 'text-indigo-400',
      points: [
        { label: '2020 (GPT-3)', x: 10, y: 95, val: '0%' },
        { label: 'Mid-2024 (GPT-4o)', x: 45, y: 90, val: '5%' },
        { label: 'Dec 2024 (o3)', x: 60, y: 15, val: '93%' },
        { label: 'Early 2026', x: 90, y: 5, val: '98%' }
      ]
    },
    {
      id: 'arc2',
      name: 'ARC-AGI-2 (March 2025)',
      description: 'Second generation. Harder logic, interactive environments. Gemini 3 Deep Think reached 84.6% within a year.',
      color: 'stroke-violet-400',
      fill: 'bg-violet-400',
      textColor: 'text-violet-400',
      points: [
        { label: 'March 2025 (Launch)', x: 62, y: 92, val: '2.5%' },
        { label: 'Feb 2026 (Gemini 3.1 Pro)', x: 90, y: 23, val: '77.1%' },
        { label: 'Feb 2026 (Gemini 3 Deep Think)', x: 90, y: 15, val: '84.6%' }
      ]
    },
    {
      id: 'arc3',
      name: 'ARC-AGI-3 (March 2026)',
      description: 'Built off the current training path entirely — language-free, scored by squared action-efficiency (RHAE). First verified movement is GPT-5.6 Sol at 7.8% (July 2026).',
      color: 'stroke-amber-400',
      fill: 'bg-amber-400',
      textColor: 'text-amber-400',
      points: [
        { label: 'March 2026 (Launch)', x: 91, y: 99, val: '0.37%' },
        { label: 'July 9, 2026 (GPT-5.6 Sol)', x: 98, y: 92, val: '7.8% [Verified]' }
      ]
    }
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 flex flex-col gap-6 glow-indigo">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
            <Activity className="text-indigo-400" size={20} />
            The ARC-AGI Cascade: Plateau & Collapse
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Visualizing the non-linear decay of abstraction benchmarks. Note the four-year plateau of ARC-1 followed by its sudden collapse.
          </p>
        </div>
        <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 self-stretch sm:self-auto text-xs">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${activeTab === 'all' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-white border border-transparent'}`}
          >
            All Series
          </button>
          {benchmarks.map(b => (
            <button
              key={b.id}
              onClick={() => setActiveTab(b.id)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${activeTab === b.id ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-white border border-transparent'}`}
            >
              ARC-{b.id.slice(-1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative bg-slate-950 border border-slate-900 rounded-xl p-4 min-h-[300px] flex items-center justify-center">
          {/* Custom SVG Line Chart */}
          <svg viewBox="0 0 100 100" className="w-full h-full max-h-[350px] overflow-visible" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="10" x2="100" y2="10" stroke="#1e293b" strokeWidth="0.2" strokeDasharray="1" />
            <line x1="0" y1="30" x2="100" y2="30" stroke="#1e293b" strokeWidth="0.2" strokeDasharray="1" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#1e293b" strokeWidth="0.2" strokeDasharray="1" />
            <line x1="0" y1="70" x2="100" y2="70" stroke="#1e293b" strokeWidth="0.2" strokeDasharray="1" />
            <line x1="0" y1="90" x2="100" y2="90" stroke="#1e293b" strokeWidth="0.2" strokeDasharray="1" />
            
            {/* Year Dividers */}
            <line x1="10" y1="0" x2="10" y2="100" stroke="#1e293b" strokeWidth="0.2" strokeDasharray="2" />
            <line x1="45" y1="0" x2="45" y2="100" stroke="#1e293b" strokeWidth="0.2" strokeDasharray="2" />
            <line x1="60" y1="0" x2="60" y2="100" stroke="#1e293b" strokeWidth="0.2" strokeDasharray="2" />
            <line x1="90" y1="0" x2="90" y2="100" stroke="#1e293b" strokeWidth="0.2" strokeDasharray="2" />

            {/* Render lines */}
            {benchmarks.map(b => {
              if (activeTab !== 'all' && activeTab !== b.id) return null;
              
              // Construct path
              const path = b.points.reduce((acc, p, idx) => {
                return acc + `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
              }, '');
              
              return (
                <g key={b.id}>
                  {/* Line shadow */}
                  <path
                    d={path}
                    fill="none"
                    className={`${b.color} opacity-20`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Real Line */}
                  <path
                    d={path}
                    fill="none"
                    className={`${b.color} transition-all duration-500`}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray={b.id === 'arc3' ? '2 1' : 'none'}
                  />
                  
                  {/* Points */}
                  {b.points.map((p, idx) => (
                    <g key={idx} className="group/point">
                      {/* Pulse ring for key events */}
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="3.5"
                        className={`${b.color.replace('stroke-', 'fill-')} opacity-0 group-hover/point:opacity-30 group-hover/point:animate-ping transition-opacity duration-300`}
                      />
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="1.8"
                        className={`${b.color.replace('stroke-', 'fill-')} border border-slate-950 stroke-1 cursor-pointer`}
                      />
                    </g>
                  ))}
                </g>
              );
            })}
          </svg>

          {/* Dynamic Floating Labels on Chart */}
          <div className="absolute inset-0 pointer-events-none select-none">
            {/* Y Axis Legend */}
            <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-[9px] text-slate-500 py-3">
              <span>100% (Solved)</span>
              <span>80%</span>
              <span>60%</span>
              <span>40%</span>
              <span>20%</span>
              <span>0%</span>
            </div>

            {/* Timeline X Labels */}
            <div className="absolute bottom-2 left-0 w-full flex justify-between text-[9px] text-slate-500 px-6 sm:px-10">
              <span style={{ left: '10%' }} className="relative">2020</span>
              <span style={{ left: '44%' }} className="relative">Mid-2024</span>
              <span style={{ left: '59%' }} className="relative">Dec 2024</span>
              <span style={{ left: '88%' }} className="relative">Early 2026</span>
              <span style={{ left: '96%' }} className="relative text-amber-500 font-semibold">Jul 2026</span>
            </div>
            
            {/* Highlighted labels inside the chart area */}
            {benchmarks.map(b => {
              if (activeTab !== 'all' && activeTab !== b.id) return null;
              return b.points.map((p, idx) => {
                // Determine layout alignment to prevent overlapping
                const isSol = p.label.includes('GPT-5.6 Sol');
                const isO3 = p.label.includes('o3');
                const isDeepThink = p.label.includes('Deep Think');
                const isG3Pro = p.label.includes('3.1 Pro');
                
                return (
                  <div
                    key={idx}
                    className="absolute bg-slate-900/95 border border-slate-800 text-[10px] rounded px-1.5 py-0.5 shadow-md flex flex-col items-center pointer-events-auto"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      transform: isSol 
                        ? 'translate(-90%, -110%)' 
                        : isO3 
                          ? 'translate(-50%, -120%)' 
                          : isDeepThink 
                            ? 'translate(-10%, 15%)' 
                            : isG3Pro 
                              ? 'translate(-95%, -110%)'
                              : 'translate(-50%, -120%)',
                    }}
                  >
                    <span className="font-bold text-white">{p.val}</span>
                    <span className="text-[8px] text-slate-400 whitespace-nowrap">{p.label.split(' (')[0]}</span>
                  </div>
                );
              });
            })}
          </div>
        </div>

        {/* Details list */}
        <div className="flex flex-col justify-between gap-4">
          <div className="space-y-4">
            {benchmarks.map(b => {
              const isActive = activeTab === 'all' || activeTab === b.id;
              return (
                <div 
                  key={b.id} 
                  className={`p-4 rounded-xl border transition-all duration-300 ${isActive ? 'bg-slate-900/40 border-slate-800' : 'opacity-40 border-transparent bg-transparent'}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${b.fill}`} />
                    <h4 className="font-semibold text-white text-sm">{b.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-4 text-xs flex gap-3 text-amber-300 leading-relaxed">
            <Info size={24} className="shrink-0 text-amber-400 mt-0.5" />
            <div>
              <span className="font-semibold block text-amber-200">The Abstraction Recipe:</span>
              ARC Prize releases new editions strictly designed to break existing scaling trends. ARC-3's GPT-5.6 Sol mark (7.8% verified) shows critical first movement, but the true test is whether this marks the start of a linear climb or the precursor to another paradigm-unlocking collapse.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcAgiProgress;
