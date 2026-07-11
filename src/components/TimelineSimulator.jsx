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
      driver: 'Driven by RL on verifiable rewards (e.g., math and coding domains).',
      hasDeployedCounterpart: true
    },
    {
      name: 'Autonomous AI research threshold',
      desc: 'AI contribution to AI R&D crosses from acceleration (~tens of %) to running the autonomous self-improvement loop.',
      calculatedFrontier: `Watch by ~${formatYear(autoResearch)}`,
      original: 'Watch by ~2028',
      driver: 'The critical inflection point where capability scaling enters a recursive feedback loop.',
      hasDeployedCounterpart: false,
      deployedReason: 'lab-internal event — no deployed counterpart'
    },
    {
      name: 'Year-horizon crossing',
      desc: 'Reliable completion of coherent tasks taking a skilled human ~1 working year (verifiable domains first).',
      calculatedFrontier: `~${formatYear(yStart)}–${formatYear(yEnd)}`,
      calculatedDeployed: `~${formatYear(yStart + deploymentLag)}–${formatYear(yEnd + deploymentLag)}`,
      original: '~2029–2032',
      originalDeployed: '~2031–2034',
      driver: 'Requires multi-step planning and error mitigation over long context spans.',
      hasDeployedCounterpart: true
    },
    {
      name: 'Most economically relevant cognition',
      desc: 'Superhuman on the bulk of economy-weighted cognitive tasks, including significant scientific contribution.',
      calculatedFrontier: `~${formatYear(econStart)}–${formatYear(econEnd)}`,
      calculatedDeployed: `~${formatYear(econStart + deploymentLag)}–${formatYear(econEnd + deploymentLag)}`,
      original: '~2029–2031',
      originalDeployed: '~2031–2033',
      driver: 'Staggered by deployment lag, corporate adoption speed, and verification-resistant remainder tasks.',
      hasDeployedCounterpart: true
    },
    {
      name: 'The silence (existential boundary)',
      desc: 'No well-funded designer can construct any remaining human-easy (pre-AI baseline) / AI-hard task.',
      calculatedFrontier: `Mode ~${formatYear(silenceStart)}–${formatYear(silenceEnd)} (${tailProbability}% tail beyond 2035, tailing into the ${tailEndDecade})`,
      original: 'Mode 2031–2034',
      driver: 'Terminal condition: bounty for any discriminating task goes unclaimed.',
      hasDeployedCounterpart: false,
      deployedReason: 'benchmark-design event — no deployed counterpart'
    }
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-line/15 pb-4">
        <div>
          <h3 className="text-xl font-bold text-ink flex items-center gap-2">
            <Sliders className="text-signal" size={20} />
            Epistemic Timeline Simulator
          </h3>
          <p className="text-sm text-ink-dim mt-1">
            Adjust the key underlying variables to recalculate the timeline to cognitive supersession.
          </p>
        </div>
        <button
          onClick={() => setShowFormula(!showFormula)}
          className="flex items-center gap-1.5 text-xs text-signal hover:underline font-semibold border border-line/20 bg-panel px-3 py-1.5 rounded-md transition-colors cursor-pointer"
        >
          <Calculator size={14} />
          {showFormula ? 'Hide Formula' : 'View Formula'}
        </button>
      </div>

      {/* Sliders Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-panel p-6 rounded-lg border border-line/25">
        {/* Slider 1 */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-ink flex items-center gap-1">
              METR Doubling Time
              <button
                type="button"
                aria-label="What is METR doubling time?"
                className="group relative cursor-pointer text-ink-faint hover:text-ink focus:text-ink bg-transparent border-none p-0 outline-none inline-flex items-center"
              >
                <HelpCircle size={12} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-panel border border-line/30 text-[10px] text-ink-dim p-2 rounded shadow-xl hidden group-hover:block group-focus-within:block pointer-events-none leading-relaxed z-10 font-normal">
                  How many months it takes for the duration of solvable expert-human tasks to double. Horizons here use METR's 50%-success threshold; 80%-reliability horizons run shorter, so these dates are the early edge of the reliability family.
                </span>
              </button>
            </span>
            <span className="font-mono font-bold text-signal bg-signal/10 px-2 py-0.5 rounded border border-signal/25">
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
            className="w-full h-1.5 bg-raised rounded-lg appearance-none cursor-pointer accent-[#E8A33D] focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none"
          />
          <div className="flex justify-between text-[10px] text-ink-faint font-mono">
            <span>3m (Aggressive)</span>
            <span>7m (Default)</span>
            <span>12m (Conservative)</span>
          </div>
        </div>

        {/* Slider 2 */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-ink flex items-center gap-1">
              Average Deployment Lag
              <button
                type="button"
                aria-label="What is average deployment lag?"
                className="group relative cursor-pointer text-ink-faint hover:text-ink focus:text-ink bg-transparent border-none p-0 outline-none inline-flex items-center"
              >
                <HelpCircle size={12} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-panel border border-line/30 text-[10px] text-ink-dim p-2 rounded shadow-xl hidden group-hover:block group-focus-within:block pointer-events-none leading-relaxed z-10 font-normal">
                  How many years it takes for frontier capability to translate into corporate deployment at scale across the economy.
                </span>
              </button>
            </span>
            <span className="font-mono font-bold text-signal bg-signal/10 px-2 py-0.5 rounded border border-signal/25">
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
            className="w-full h-1.5 bg-raised rounded-lg appearance-none cursor-pointer accent-[#E8A33D] focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none"
          />
          <div className="flex justify-between text-[10px] text-ink-faint font-mono">
            <span>0y (Instant)</span>
            <span>2y (Default)</span>
            <span>5y (High Lag)</span>
          </div>
        </div>

        {/* Slider 3 */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-ink flex items-center gap-1">
              Tail Probability (Silence After 2035)
              <button
                type="button"
                aria-label="What is tail probability?"
                className="group relative cursor-pointer text-ink-faint hover:text-ink focus:text-ink bg-transparent border-none p-0 outline-none inline-flex items-center"
              >
                <HelpCircle size={12} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-panel border border-line/30 text-[10px] text-ink-dim p-2 rounded shadow-xl hidden group-hover:block group-focus-within:block pointer-events-none leading-relaxed z-10 font-normal">
                  Probability that the silence lands after 2035. The brief's stated position is ~30%; "disanalogies fully offset the self-driving reference class" argues ~15%, "driving's residue is the true prior" argues ~45%.
                </span>
              </button>
            </span>
            <span className="font-mono font-bold text-signal bg-signal/10 px-2 py-0.5 rounded border border-signal/25">
              {residueOffset}%
            </span>
          </div>
          <input
            type="range"
            min="15"
            max="45"
            step="15"
            value={residueOffset}
            onChange={(e) => setResidueOffset(parseInt(e.target.value))}
            className="w-full h-1.5 bg-raised rounded-lg appearance-none cursor-pointer accent-[#E8A33D] focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none"
          />
          <div className="flex justify-between text-[10px] text-ink-faint font-mono">
            <span>15% (Full offset)</span>
            <span>30% (Brief's position)</span>
            <span>45% (Driving prior)</span>
          </div>
        </div>
      </div>

      {/* Model Transparency Panel */}
      {showFormula && (
        <div className="bg-panel border border-line/25 rounded-lg p-5 text-xs space-y-3 font-mono animate-fadeIn">
          <div className="text-ink font-bold uppercase tracking-wider flex items-center gap-2 text-[10px] border-b border-line/15 pb-2">
            <Calculator size={14} /> Arithmetic Disclosure (Base Year: mid-2026 / 2026.5)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-ink-dim leading-relaxed">
            <div className="space-y-1.5">
              <div>
                <span className="text-signal">Verifiable-domain superhumanity (Frontier):</span><br />
                <code>Start = 2026.5 + (DT / 12) * 1.0</code><br />
                <code>End = 2026.5 + (DT / 12) * 4.28</code>
              </div>
              <div>
                <span className="text-signal">Autonomous AI R&D Threshold (Frontier):</span><br />
                <code>Target = 2026.5 + (DT / 12) * 2.57</code>
              </div>
              <div>
                <span className="text-ink-faint">Deployed Economic Reality:</span><br />
                <code>Deployed Date = Frontier Date + Deployment Lag (applies to stages 1, 3, 4 only)</code>
              </div>
            </div>
            <div className="space-y-1.5">
              <div>
                <span className="text-signal">Year-horizon crossing (Frontier):</span><br />
                <code>Start = 2026.5 + (DT / 12) * 4.28</code><br />
                <code>End = 2026.5 + (DT / 12) * 9.43</code>
              </div>
              <div>
                <span className="text-signal">The Silence (Frontier Mode):</span><br />
                <code>Start = 2026.5 + (DT / 12) * 7.71 + (Residue - 30)/10</code><br />
                <code>End = 2026.5 + (DT / 12) * 12.85 + (Residue - 30)/10</code>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-ink-faint border-t border-line/15 pt-2 leading-relaxed space-y-1">
            <p>
              <strong>Regression check:</strong> At default parameters (DT = 7, Lag = 2, Tail = 30%), these formulas reproduce the brief's published table verbatim: ~2027–2029 · ~2028 · ~2029–2032 · ~2029–2031 · mode 2031–2034 with ~30% beyond 2035. If the numbers you see at defaults differ from these, the simulator has a bug — please report it.
            </p>
            <p>
              Tail probability is modeled as a crude linear mode shift of &plusmn;1.5 years around the 30% baseline; the underlying distribution is not reshaped.
            </p>
            <p>
              All horizon-derived dates track the 50%-success curve (§2); no reliability-threshold parameter is modeled.
            </p>
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
              className="bg-panel border border-line/20 hover:border-line/45 rounded-lg p-4 sm:p-5 flex flex-col gap-3 transition-all"
            >
              <div className="space-y-1.5">
                <h4 className="font-bold text-ink text-sm sm:text-base">{stage.name}</h4>
                <p className="text-xs text-ink-dim leading-relaxed">{stage.desc}</p>
                <div className="text-[10px] text-ink-faint font-semibold">{stage.driver}</div>
              </div>
              
              {/* Split Estimates: Frontier Capability vs Deployed Economic Reality */}
              <div className="border-t border-line/20 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ink-faint font-bold mb-0.5">Frontier Capability</div>
                  <div className="text-base font-bold text-ink font-mono leading-snug">
                    {stage.calculatedFrontier}
                  </div>
                  {isShifted && (
                    <div className="text-[9px] text-ink-faint font-mono mt-0.5">
                      Baseline: {stage.original}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ink-faint font-bold mb-0.5">Deployed Economic Reality</div>
                  <div className="text-base font-bold text-ink-dim font-mono leading-snug">
                    {stage.hasDeployedCounterpart ? stage.calculatedDeployed : 'n/a'}
                  </div>
                  {stage.hasDeployedCounterpart ? (
                    isShifted && (
                      <div className="text-[9px] text-ink-faint font-mono mt-0.5">
                        Baseline (+2y): {stage.originalDeployed}
                      </div>
                    )
                  ) : (
                    <div className="text-[10px] text-ink-faint font-semibold mt-0.5">
                      {stage.deployedReason}
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
