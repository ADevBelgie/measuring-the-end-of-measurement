import React, { useState } from 'react';
import { Sliders, HelpCircle, Calculator } from 'lucide-react';

const TimelineSimulator = () => {
  // Simulator inputs
  const [doublingTime, setDoublingTime] = useState(7); // default 7 months
  const [deploymentLag, setDeploymentLag] = useState(2); // default 2 years
  const [residueOffset, setResidueOffset] = useState(30); // default 30% tail probability
  const [showFormula, setShowFormula] = useState(false);

  // Math helper (rounded to nearest whole year or mid-year)
  const formatYear = (val) => {
    const wholePart = Math.floor(val);
    const fraction = val - wholePart;
    if (fraction < 0.25) return `${wholePart}`;
    if (fraction < 0.75) return `mid-${wholePart}`;
    return `${wholePart + 1}`;
  };

  // Base Year: July 2026
  const baseYear = 2026.5;

  // 1. Verifiable-domain superhumanity: ~2027–2029 (pure frontier capability)
  const vStart = baseYear + (doublingTime / 12) * 1.0;
  const vEnd = baseYear + (doublingTime / 12) * 4.28;

  // 2. Autonomous AI research threshold: Watch by ~2028 (pure frontier capability)
  const autoResearch = baseYear + (doublingTime / 12) * 2.57;

  // 3. Year-horizon crossing: ~2029–2032 (pure frontier capability)
  const yStart = baseYear + (doublingTime / 12) * 4.28;
  const yEnd = baseYear + (doublingTime / 12) * 9.43;

  // 4. Most economically relevant cognition: ~2029–2031 (pure frontier capability)
  const econStart = baseYear + (doublingTime / 12) * 4.28;
  const econEnd = baseYear + (doublingTime / 12) * 7.71;

  // 5. The silence: Mode 2031–2034 (pure frontier capability)
  const silenceStart = baseYear + (doublingTime / 12) * 7.71 + (residueOffset - 30) / 10;
  const silenceEnd = baseYear + (doublingTime / 12) * 12.85 + (residueOffset - 30) / 10;

  const tailProbability = residueOffset;
  const tailEndDecade = residueOffset >= 40 ? '2040s' : residueOffset >= 25 ? 'mid-2030s to 2040' : 'late 2030s';

  const stages = [
    {
      name: 'Verifiable-domain superhumanity',
      desc: 'Superhuman at most cheaply-verifiable cognitive work (math, code, structured analysis) at economically relevant reliability.',
      calculatedFrontier: `~${formatYear(vStart)}–${formatYear(vEnd)}`,
      calculatedDeployed: `~${formatYear(vStart + deploymentLag)}–${formatYear(vEnd + deploymentLag)}`,
      original: '~2027–2029',
      originalDeployed: '~2029–2031',
      driver: 'Driven by RL on verifiable rewards (e.g., math and coding domains).'
    },
    {
      name: 'Autonomous AI research threshold',
      desc: 'AI contribution to AI R&D crosses from acceleration (~tens of %) to running the autonomous self-improvement loop.',
      calculatedFrontier: `Watch by ~${formatYear(autoResearch)}`,
      calculatedDeployed: `Watch by ~${formatYear(autoResearch + deploymentLag)}`,
      original: 'Watch by ~2028',
      originalDeployed: 'Watch by ~2030',
      driver: 'The critical inflection point where capability scaling enters a recursive feedback loop.'
    },
    {
      name: 'Year-horizon crossing',
      desc: 'Reliable completion of coherent tasks taking a skilled human ~1 working year (verifiable domains first).',
      calculatedFrontier: `~${formatYear(yStart)}–${formatYear(yEnd)}`,
      calculatedDeployed: `~${formatYear(yStart + deploymentLag)}–${formatYear(yEnd + deploymentLag)}`,
      original: '~2029–2032',
      originalDeployed: '~2031–2034',
      driver: 'Requires multi-step planning and error mitigation over long context spans.'
    },
    {
      name: 'Most economically relevant cognition',
      desc: 'Superhuman on the bulk of economy-weighted cognitive tasks, including significant scientific contribution.',
      calculatedFrontier: `~${formatYear(econStart)}–${formatYear(econEnd)}`,
      calculatedDeployed: `~${formatYear(econStart + deploymentLag)}–${formatYear(econEnd + deploymentLag)}`,
      original: '~2029–2031',
      originalDeployed: '~2031–2033',
      driver: 'Staggered by deployment lag, corporate adoption speed, and verification-resistant remainder tasks.'
    },
    {
      name: 'The silence (existential boundary)',
      desc: 'No well-funded designer can construct any remaining human-easy (pre-AI baseline) / AI-hard task.',
      calculatedFrontier: `Mode ~${formatYear(silenceStart)}–${formatYear(silenceEnd)} (${tailProbability}% tail beyond 2035, tailing into the ${tailEndDecade})`,
      calculatedDeployed: `Mode ~${formatYear(silenceStart + deploymentLag)}–${formatYear(silenceEnd + deploymentLag)} (${tailProbability}% tail beyond 2035, tailing into the ${tailEndDecade})`,
      original: 'Mode 2031–2034',
      originalDeployed: 'Mode 2033–2036',
      driver: 'Terminal condition: bounty for any discriminating task goes unclaimed.'
    }
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 flex flex-col gap-6 glow-indigo">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="text-indigo-400" size={20} />
            Epistemic Timeline Simulator
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Adjust the key underlying variables to recalculate the timeline to cognitive supersession.
          </p>
        </div>
        <button
          onClick={() => setShowFormula(!showFormula)}
          className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold border border-indigo-500/20 bg-indigo-500/5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Calculator size={14} />
          {showFormula ? 'Hide Formula' : 'View Formula'}
        </button>
      </div>

      {/* Sliders Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-900">
        {/* Slider 1 */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1">
              METR Doubling Time
              <span className="group relative cursor-pointer text-slate-500 hover:text-slate-300">
                <HelpCircle size={12} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 border border-slate-800 text-[10px] text-slate-400 p-2 rounded shadow-xl hidden group-hover:block pointer-events-none leading-relaxed z-10">
                  How many months it takes for the duration of solvable expert-human tasks to double.
                </span>
              </span>
            </span>
            <span className="font-mono font-bold text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/30">
              {doublingTime} Months
            </span>
          </div>
          <input
            type="range"
            min="3"
            max="12"
            step="0.5"
            value={doublingTime}
            onChange={(e) => setDoublingTime(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>3m (Aggressive)</span>
            <span>7m (Default)</span>
            <span>12m (Conservative)</span>
          </div>
        </div>

        {/* Slider 2 */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1">
              Average Deployment Lag
              <span className="group relative cursor-pointer text-slate-500 hover:text-slate-300">
                <HelpCircle size={12} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 border border-slate-800 text-[10px] text-slate-400 p-2 rounded shadow-xl hidden group-hover:block pointer-events-none leading-relaxed z-10">
                  How many years it takes for frontier capability to translate into corporate deployment at scale across the economy.
                </span>
              </span>
            </span>
            <span className="font-mono font-bold text-violet-400 bg-violet-950/40 px-2 py-0.5 rounded border border-violet-900/30">
              {deploymentLag} Years
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={deploymentLag}
            onChange={(e) => setDeploymentLag(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>0y (Instant)</span>
            <span>2y (Default)</span>
            <span>5y (High Lag)</span>
          </div>
        </div>

        {/* Slider 3 */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1">
              Tail Probability beyond 2035
              <span className="group relative cursor-pointer text-slate-500 hover:text-slate-300">
                <HelpCircle size={12} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 border border-slate-800 text-[10px] text-slate-400 p-2 rounded shadow-xl hidden group-hover:block pointer-events-none leading-relaxed z-10">
                  Estimated probability that the terminal "Silence" boundary is not reached by 2035 (reflecting tail risk of verification-resistant remnants).
                </span>
              </span>
            </span>
            <span className="font-mono font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/30">
              {residueOffset}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="50"
            value={residueOffset}
            onChange={(e) => setResidueOffset(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>10% (Low)</span>
            <span>30% (Default)</span>
            <span>50% (High)</span>
          </div>
        </div>
      </div>

      {/* Model Transparency Panel */}
      {showFormula && (
        <div className="bg-indigo-950/10 border border-indigo-900/30 rounded-2xl p-5 text-xs space-y-3 font-mono animate-fadeIn">
          <div className="text-white font-bold uppercase tracking-wider flex items-center gap-2 text-[10px] border-b border-indigo-900/30 pb-2">
            <Calculator size={14} /> Arithmetic Disclosure (Base Year: mid-2026 / 2026.5)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 leading-relaxed">
            <div className="space-y-1.5">
              <div>
                <span className="text-indigo-400">Verifiable-domain superhumanity (Frontier):</span><br />
                <code>Start = 2026.5 + (DT / 12) * 1.0</code><br />
                <code>End = 2026.5 + (DT / 12) * 4.28</code>
              </div>
              <div>
                <span className="text-violet-400">Autonomous AI R&D Threshold (Frontier):</span><br />
                <code>Target = 2026.5 + (DT / 12) * 2.57</code>
              </div>
              <div>
                <span className="text-slate-400">Deployed Economic Reality:</span><br />
                <code>Deployed Date = Frontier Date + Deployment Lag</code>
              </div>
            </div>
            <div className="space-y-1.5">
              <div>
                <span className="text-amber-400">Year-horizon crossing (Frontier):</span><br />
                <code>Start = 2026.5 + (DT / 12) * 4.28</code><br />
                <code>End = 2026.5 + (DT / 12) * 9.43</code>
              </div>
              <div>
                <span className="text-indigo-300">The Silence (Frontier Mode):</span><br />
                <code>Start = 2026.5 + (DT / 12) * 7.71 + (Residue - 30)/10</code><br />
                <code>End = 2026.5 + (DT / 12) * 12.85 + (Residue - 30)/10</code>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 border-t border-indigo-900/20 pt-2 leading-relaxed">
            <strong>Regression Test Validation:</strong> At default parameters (METR Doubling Time = 7 months, Tail Probability = 30%), the formulas yield dates identical to the brief's central estimate table of frontier capabilities (Verifiable: ~2027–2029; R&D threshold: ~2028; Year-crossing: ~2029–2032; Economy: ~2029–2031; Silence: Mode ~2031–2034).
          </div>
        </div>
      )}

      {/* Recalculated Timeline Layout */}
      <div className="space-y-4">
        {stages.map((stage, idx) => {
          // Check if calculations deviate from the defaults
          const isShifted = doublingTime !== 7 || residueOffset !== 30 || deploymentLag !== 2;
          return (
            <div 
              key={idx} 
              className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col gap-3 transition-all"
            >
              <div className="space-y-1.5">
                <h4 className="font-bold text-white text-sm sm:text-base">{stage.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{stage.desc}</p>
                <div className="text-[10px] text-slate-500 font-semibold">{stage.driver}</div>
              </div>
              
              {/* Split Estimates: Frontier Capability vs Deployed Economic Reality */}
              <div className="border-t border-slate-900 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold mb-0.5">Frontier Capability</div>
                  <div className="text-base font-black text-indigo-300 font-mono leading-snug">
                    {stage.calculatedFrontier}
                  </div>
                  {isShifted && (
                    <div className="text-[9px] text-slate-500 font-mono mt-0.5">
                      Baseline: {stage.original}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-violet-400 font-bold mb-0.5">Deployed Economic Reality</div>
                  <div className="text-base font-black text-violet-300 font-mono leading-snug">
                    {stage.calculatedDeployed}
                  </div>
                  {isShifted && (
                    <div className="text-[9px] text-slate-500 font-mono mt-0.5">
                      Baseline (+2y): {stage.originalDeployed}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineSimulator;
