import React, { useState, useEffect, lazy, Suspense } from 'react';
import { 
  Brain, Activity, TrendingUp, Ruler, Sliders, Calendar, 
  ShieldAlert, FileText, CheckCircle,
  BookOpen, Sparkles, RefreshCw, ChevronDown
} from 'lucide-react';
import TimelineSimulator from './components/TimelineSimulator';

const ArcAgiProgress = lazy(() => import('./components/ArcAgiProgress'));
const SWEBenchRulers = lazy(() => import('./components/SWEBenchRulers'));

function App() {
  // Derive reading mode from URL hash; default to 'expert'
  const getInitialMode = () => {
    const hash = window.location.hash.replace('#', '');
    return hash === 'brief' ? 'brief' : 'expert';
  };
  const [readingMode, setReadingMode] = useState(getInitialMode);
  const [disclosureOpen, setDisclosureOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  // Compute days since publication (July 10, 2026)
  const daysOld = Math.max(0, Math.floor((Date.now() - new Date('2026-07-10T00:00:00')) / 86400000));

  // Sync reading mode to/from URL hash so links can be shared
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'brief' || hash === 'expert') setReadingMode(hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleSetMode = (mode) => {
    setReadingMode(mode);
    window.location.hash = mode;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      
      {/* ─── DYNAMIC DECAYING DATE BANNER ─── */}
      <div className={`w-full py-2.5 px-4 text-xs font-semibold text-center border-b flex justify-center items-center gap-2 select-none transition-colors duration-500 ${
        daysOld < 60
          ? 'bg-emerald-950/60 border-emerald-800/40 text-emerald-300'
          : daysOld < 120
            ? 'bg-amber-950/60 border-amber-800/40 text-amber-300'
            : 'bg-rose-950/70 border-rose-800/50 text-rose-300 animate-pulse'
      }`}>
        <span>
          {daysOld < 60 && "Data as of July 10, 2026."}
          {daysOld >= 60 && daysOld < 120 && `Data as of July 10, 2026 — ${daysOld} days old. By this brief's own thesis, some figures below have likely decayed. Re-verify before citing.`}
          {daysOld >= 120 && `Data as of July 10, 2026 — ${daysOld} days old. This exceeds half the proposed benchmark half-life. Treat all leaderboard figures as historical.`}
        </span>
      </div>

      {/* ─── STICKY HEADER ─── */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Brain className="text-white" size={18} />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-white tracking-tight">Measuring the End of Measurement</h1>
              <div className="hidden sm:flex gap-2 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                <span>Synthesis</span>
                <span>•</span>
                <span className="text-indigo-400">July 2026 Briefing</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-400 font-medium hidden md:inline">Reading Mode:</span>
            <div className="flex bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs">
              <button 
                onClick={() => handleSetMode('brief')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                  readingMode === 'brief' 
                    ? 'bg-indigo-500 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <FileText size={13} />
                Brief
              </button>
              <button 
                onClick={() => handleSetMode('expert')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                  readingMode === 'expert' 
                    ? 'bg-indigo-500 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <BookOpen size={13} />
                Expert
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN APP CONTAINER ─── */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-10 space-y-12">
        
        {/* HERO / MASTHEAD */}
        <section className="space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-semibold text-indigo-400">
            <Sparkles size={12} />
            <span>Benchmark Half-Life, Task Horizons, and Cognitive Supersession</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Measuring the <span className="gradient-text-rainbow">End of Measurement</span>
          </h2>
          
          <p className="text-base sm:text-xl text-slate-400 font-light leading-relaxed">
            The endpoint of intelligence evaluation will not be announced by a benchmark score, but by a silence — the moment developers can no longer construct tasks that are easy for humans and hard for AI.
          </p>

          {/* Quick-Look Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <div className="glass-panel p-4 flex flex-col justify-between border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Benchmark Half-Life</span>
              <span className="text-xl font-black text-indigo-400 font-mono">~8-Month Half-Life</span>
              <span className="text-[9.5px] text-slate-400 leading-normal mt-1 block">
                Proposed April 2026; conservative — see §1
              </span>
            </div>
            
            <div className="glass-panel p-4 flex flex-col justify-between border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">ARC-AGI-3 Trajectory</span>
              <span className="text-xl font-black text-amber-400 font-mono">7.8% (Verified)</span>
              <span className="text-[9.5px] text-slate-400 leading-normal mt-1 block">
                GPT-5.6 Sol, July 9, 2026. First verified breakthrough.
              </span>
            </div>

            <div className="glass-panel p-4 flex flex-col justify-between border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">The Critical Race</span>
              <span className="text-xl font-black text-violet-400 font-mono">~2028 Threshold</span>
              <span className="text-[9.5px] text-slate-400 leading-normal mt-1 block">
                Autonomous AI R&D loops vs physical & capital bottlenecks.
              </span>
            </div>
          </div>

          {/* Disclosure and Status Panel (MUST persist in both modes) */}
          <div className="bg-slate-900/40 border border-slate-850 rounded-2xl text-xs text-slate-400 leading-relaxed text-left p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2.5">
              <span className="font-bold text-white uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <ShieldAlert size={14} className="text-indigo-400" />
                Authorship Disclosure &amp; Status Note
              </span>
              <button
                onClick={() => setDisclosureOpen(o => !o)}
                className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {disclosureOpen ? 'Show Less' : 'Show Full Details'}
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${disclosureOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
            <p>
              <strong>Disclosure:</strong> A participant in this synthesis is Arthur Devresse, co-author of the April 2026 brief that supplied this document's seed hypothesis.
              {!disclosureOpen && ' *Expand for the full disclosure and status note.*'}
            </p>
            {disclosureOpen && (
              <div className="space-y-3 animate-fadeIn">
                <p>
                  Citations of that brief are therefore self-citation; the mid-2026 verification of its claims was performed against independent sources (Scale AI, ARC Prize Foundation, Forrester, Gartner, Stanford, and others) and does not route through the brief or its authors.
                </p>
                <p className="italic border-t border-slate-850 pt-2.5">
                  <strong>Status:</strong> Informal synthesis. Point estimates are held loosely and are most useful as a structure for updating, not as forecasts to be quoted. Prose is deliberately compressed; if this document is ever promoted beyond informal synthesis, unpacking is the first job.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* EXECUTIVE SUMMARY */}
        <section className="glass-panel p-6 sm:p-8 space-y-4 border-slate-800 text-left">
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileText className="text-indigo-400" size={18} />
            Executive Summary
          </h3>
          <div className="prose-custom text-slate-300 space-y-4">
            <p>
              There is no single benchmark for "AI supersedes humans on all cognitive tasks," due to two structural barriers: <strong>coverage</strong> (the task set is open-ended, so any test is just a contestable sample of cognition) and the <strong>evaluator ceiling</strong> (for frontier tasks, ground truth relies on human judgment, which ceases to be a valid instrument past the human threshold).
            </p>
            {readingMode === 'expert' ? (
              <p>
                Reality-graded domains — formal proof, resolved prediction, experimental outcome — escape the evaluator ceiling and can certify superhumanity locally, but their verdicts are slow, confounded, and domain-bound: they measure peaks, not coverage. This brief argues that the endpoint will therefore not be announced by a score but by a silence — the moment well-motivated designers can no longer construct any task that is easy for humans and hard for AI.
              </p>
            ) : (
              <p className="text-indigo-300 font-medium">
                Takeaway: The endpoint is signaled by a 'silence' — when no one can still construct tasks that are easy for humans but hard for frontier AI. This is a proxy for supersession, not a definition of it.
              </p>
            )}
            <p>
              Working backward from that criterion, and forward from measurable trends (task time-horizons, benchmark half-lives, capability-vs-deployment gaps), we sketch a staged timeline: superhuman performance across verifiable cognitive domains by the late 2020s, most economically relevant cognition by roughly 2029–2031, and the full "silence" with a mode in the early-to-mid 2030s.
            </p>
            {readingMode === 'expert' && (
              <p>
                The single most informative variable to watch is not any benchmark score but whether autonomous AI research crosses its threshold before physical and capital constraints flatten the scaling engine — a race that likely resolves by ~2028.
              </p>
            )}
          </div>
        </section>

        {/* SECTION 1: THE INSTRUMENT PROBLEM */}
        <section className="space-y-6 text-left">
          <div className="flex items-center gap-2.5 border-b border-slate-900 pb-2">
            <Ruler className="text-indigo-400" size={20} />
            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
              1. The Instrument Problem
            </h3>
          </div>

          <div className="prose-custom text-slate-300 space-y-4">
            <p>
              Benchmarks are not random samples of cognition. They are adversarially constructed in the gap between what humans and AI can do, built to be "easy for humans, hard for AI" given what AI currently cannot do. This has two primary consequences:
            </p>
            
            {readingMode === 'expert' ? (
              <>
                <p>
                  <strong>First, benchmarks die fast.</strong> The April 2026 strategic brief proposed an ~8-month benchmark half-life; events since suggest that was conservative. SWE-bench Verified was effectively retired after OpenAI's February 2026 contamination withdrawal. Its successor, SWE-bench Pro, saw its standardized top score move from ~46% (April 2026) to ~59% (Scale standardized public set, July 2026) in roughly ten weeks — while simultaneously fragmenting into three competing "official" numbers, indicating a decay of <em>signal</em> as much as of difficulty.
                </p>
                <p>
                  <strong>Second, the decay is punctuated.</strong> ARC-AGI-1 sat near zero from 2020 through 2023, then collapsed when test-time reasoning (o1/o3) arrived. ARC-AGI-2 went from ~2.5% at its March 2025 launch to 77.1% (Gemini 3.1 Pro) and 84.6% (Gemini 3 Deep Think) by February 2026 — near its practical ceiling in under a year. ARC-AGI-3, launched March 2026 with frontier systems below 1% against a 100% human solve rate, is built off the current training paradigm's path entirely — interactive, language-free, scored by squared action-efficiency (RHAE) against human baselines.
                </p>
              </>
            ) : (
              <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-xl space-y-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={15} className="text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-sm m-0"><strong>Benchmarks die fast:</strong> SWE-bench Pro's top score moved from 46% to 59% in ten weeks while fragmenting into three competing "official" numbers — a decay of signal, not just difficulty.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={15} className="text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-sm m-0"><strong>But not smoothly:</strong> Benchmarks plateau for years (ARC-AGI-1 sat near zero from 2020–2023), then collapse suddenly when a missing paradigm ingredient arrives (test-time reasoning). The chart below shows the pattern.</p>
                </div>
              </div>
            )}
          </div>

          {/* ARC Cascade Visualizer */}
          <Suspense fallback={<div className="h-[380px] bg-slate-950 border border-slate-900 rounded-xl flex items-center justify-center text-slate-500 text-xs">Loading visualization...</div>}>
            <ArcAgiProgress />
          </Suspense>

          <div className="prose-custom text-slate-300 space-y-4 pt-2">
            {readingMode === 'expert' ? (
              <>
                <p>
                  <strong>Implication.</strong> Half-life is too noisy and selection-biased to extrapolate directly. But reframed as a meta-metric — is the half-life staying constant as benchmark territory gets progressively more exotic? how long does it take to build a successor that still discriminates? — it carries information no individual score does.
                </p>
                <p>
                  The terminal condition follows: <strong>the criterion for supersession is the failure of benchmark creation itself</strong> — a standing, well-funded bounty for constructing any discriminating human-easy/AI-hard task, with the silence declared when the bounty goes unclaimed.
                </p>
                <blockquote className="border-l-2 border-indigo-500/50 pl-4 py-1 italic bg-indigo-500/5 text-slate-300 rounded-r-md">
                  Two honest limits of the silence criterion: First, it measures the exhaustion of one direction of gap (parity with human task-design ingenuity) rather than supersession across all cognition. Second, it has an observability confound (benchmark creation can cease for sociological or financial reasons rather than capability).
                </blockquote>
              </>
            ) : (
              <div className="border-l-2 border-indigo-500/50 pl-4 py-1 italic bg-indigo-500/5 text-slate-300 rounded-r-md text-sm">
                <strong>The Existential Boundary:</strong> Supersession is defined by the failure of benchmark creation itself. Rather than measuring dynamic scores, we track the exhaustion of human task-design ingenuity via standing bounties that go unclaimed.
              </div>
            )}
          </div>

          {/* SWE-bench Multi-Ruler visualizer */}
          <Suspense fallback={<div className="h-[300px] bg-slate-950 border border-slate-900 rounded-xl flex items-center justify-center text-slate-500 text-xs">Loading rulers...</div>}>
            <SWEBenchRulers />
          </Suspense>
        </section>

        {/* SECTION 2: TASK TIME-HORIZONS */}
        <section className="space-y-6 text-left">
          <div className="flex items-center gap-2.5 border-b border-slate-900 pb-2">
            <TrendingUp className="text-indigo-400" size={20} />
            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
              2. The Trend Worth Extrapolating: Task Time-Horizons
            </h3>
          </div>

          <div className="prose-custom text-slate-300 space-y-4">
            <p>
              The most principled version of the extrapolation instinct is METR's time-horizon metric: instead of tracking scores on dying tests, measure the <strong>duration</strong> (in expert-human time) of tasks a model completes at a fixed reliability. That horizon has doubled roughly every 7 months across model generations, with recent portions of the curve running closer to 4 months.
            </p>

            {readingMode === 'expert' ? (
              <>
                <p>
                  Two properties make this trend load-bearing: it converts benchmark churn into a comparable quantity, and it internalizes recursive self-improvement. Two properties limit it: it is built almost entirely on software-shaped tasks, and it is a single-source trend.
                </p>
                <p>
                  <strong>Why "one working year" is the chosen threshold:</strong> A working year is approximately the largest unit of work delegated as a single coherent task with defined success criteria (a research project, product cycle, or dissertation chapter). Longer spans are compositions of year-scale tasks. Crossing the year-horizon is roughly where task length stops being the binding constraint and verification, trust, and deployment take over.
                </p>
              </>
            ) : (
              <p className="text-slate-300">
                A <strong>working year</strong> is roughly the largest unit of work handed over as one coherent task (a research project, a product cycle). Careers are just compositions of year-scale tasks. Once AI crosses the year horizon, task length stops being the bottleneck — verification, trust, and deployment take over.
              </p>
            )}
          </div>

          {/* Timeline Simulator component */}
          <TimelineSimulator />
        </section>

        {/* SECTION 3: THE TASK ARGUMENT */}
        <section className="space-y-6 text-left">
          <div className="flex items-center gap-2.5 border-b border-slate-900 pb-2">
            <Sliders className="text-indigo-400" size={20} />
            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
              3. The Task Argument: Automation is Staggered and Structural
            </h3>
          </div>

          <div className="prose-custom text-slate-300 space-y-4">
            <p>
              Automation is not a single event. It is staggered based on structural features of the cognitive tasks themselves. Three mechanisms drive this:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="glass-panel p-5 border-slate-800 space-y-2.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                  1. Verification Asymmetry
                </span>
                <h4 className="text-sm font-semibold text-white">Self-Grading Dominance</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Math and code fell first because they grade themselves. Biology wet-lab loops take years, meaning software horizons double years ahead of life sciences.
                </p>
              </div>

              <div className="glass-panel p-5 border-slate-800 space-y-2.5">
                <span className="text-violet-400 font-bold uppercase tracking-wider text-[10px] block">
                  2. Adverse Selection of Residue
                </span>
                <h4 className="text-sm font-semibold text-white">The Self-Driving Car Analogy</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Like self-driving's last 5% — which consumed a decade after the first 95% arrived on schedule — what survives each wave is exactly what resists cheap verification: judgment graded years later, taste without rubrics. The residue cannot certify itself.
                </p>
              </div>

              <div className="glass-panel p-5 border-slate-800 space-y-2.5">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                  3. Bottom-Up Measurement
                </span>
                <h4 className="text-sm font-semibold text-white">Economic Share Mapping</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tracking the fraction of O*NET tasks shifting from augmentation to delegation. This yields a later, economically real curve than the frontier-capability dates in the table below.
                </p>
              </div>
            </div>

            {readingMode === 'expert' && (
              <p className="pt-2 text-slate-300 leading-relaxed text-sm">
                Each generation of progress concentrates the residue further. The reference class is self-driving cars, whose first 95% arrived on the extrapolated curve (~2016 confidence, ~2020 predictions) and whose adversely-selected last 5% consumed an additional decade and several companies. Some final strongholds are protected by embodiment, legal liability, or human accountable requirements, outliving the cognitive gap entirely.
              </p>
            )}
          </div>
        </section>

        {/* SECTION 4: TIMELINE OF INTELLIGENCE LEVELS */}
        <section className="space-y-6 text-left">
          <div className="flex items-center gap-2.5 border-b border-slate-900 pb-2">
            <Calendar className="text-indigo-400" size={20} />
            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
              4. Timeline of Intelligence Levels
            </h3>
          </div>

          <div className="prose-custom text-slate-300">
            <p>
              Central frontier-capability estimates (not deployed-economic-reality dates). Confidences decrease down the table. The ordering is intentional: most economically relevant tasks are short and can be automated before full year-horizon coherence is unlocked.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-850">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900/60 border-b border-slate-850 text-slate-400 font-semibold">
                  <th className="p-4 w-1/4">Stage</th>
                  <th className="p-4 w-1/6">Estimate</th>
                  <th className="p-4 w-7/12">Key Drivers &amp; Risks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 bg-slate-950/40">
                <tr className="hover:bg-slate-900/20">
                  <td className="p-4 font-bold text-white">Verifiable-domain superhumanity</td>
                  <td className="p-4 text-indigo-400 font-bold font-mono">~2027–2029</td>
                  <td className="p-4 text-slate-300 leading-relaxed">
                    {readingMode === 'brief' 
                      ? 'Math, code, structured analysis — the domains that grade themselves fall first.' 
                      : 'Superhuman at most cheaply-verifiable cognitive work (math, code). Driven by RL on verifiable rewards. Risk: reliability at long task lengths, not peak skill.'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/20">
                  <td className="p-4 font-bold text-white">Autonomous AI research threshold</td>
                  <td className="p-4 text-violet-400 font-bold font-mono">Watch by ~2028</td>
                  <td className="p-4 text-slate-300 leading-relaxed">
                    {readingMode === 'brief' 
                      ? 'The pivotal variable: does AI start running its own R&D loop before compute and capital flatten the curve?' 
                      : 'AI contribution to AI R&D crosses from acceleration (~tens of %) to running the loop. The pivotal variable. Race between self-improvement feedback and physical constraints.'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/20">
                  <td className="p-4 font-bold text-white">Year-horizon crossing</td>
                  <td className="p-4 text-amber-400 font-bold font-mono">~2029–2032</td>
                  <td className="p-4 text-slate-300 leading-relaxed">
                    {readingMode === 'brief' 
                      ? 'AI reliably completes projects that take a skilled human a full working year.' 
                      : 'Reliable completion of coherent tasks taking a skilled human ~1 working year. Domain-staggered. Based on 7-month doubling rate.'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/20">
                  <td className="p-4 font-bold text-white">Most economically relevant cognition</td>
                  <td className="p-4 text-indigo-400 font-bold font-mono">~2029–2031</td>
                  <td className="p-4 text-slate-300 leading-relaxed">
                    {readingMode === 'brief' 
                      ? 'Superhuman on the bulk of everyday economic tasks — most of which are short.' 
                      : 'Superhuman on the bulk of economy-weighted tasks. Scientific contributions precede the silence by years. Lag driver: verification-resistant domains and deployment gap.'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/20">
                  <td className="p-4 font-bold text-white">The Silence</td>
                  <td className="p-4 text-amber-400 font-bold font-mono">Mode 2031–2034</td>
                  <td className="p-4 text-slate-300 leading-relaxed">
                    {readingMode === 'brief' 
                      ? "Nobody, however well funded, can still design a task that's easy for humans and hard for AI. ~30% chance this lands after 2035." 
                      : 'No well-funded designer can construct any remaining human-easy/AI-hard task. 10% by 2029; mode 2031-2034 (~55-60%); beyond 2035: ~30%, tailing into the 2040s.'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 5: WHAT TO WATCH */}
        <section className="space-y-6 text-left">
          <div className="flex items-center gap-2.5 border-b border-slate-900 pb-2">
            <Activity className="text-indigo-400" size={20} />
            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
              5. What to Watch (In Order of Information Value)
            </h3>
          </div>

          <div className="space-y-3">
            {/* Watch item 1 */}
            <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-4 flex gap-4 items-start">
              <div className="h-6 w-6 rounded-full bg-slate-950 flex items-center justify-center font-bold text-indigo-400 border border-indigo-500/20 text-xs shrink-0 mt-0.5 font-mono">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-white text-sm">The 2028 Race</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Autonomous-research threshold vs. capex/compute flattening. Resolves more uncertainty than any individual benchmark score.
                </p>
              </div>
            </div>

            {/* Watch item 2 */}
            <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-4 flex gap-4 items-start">
              <div className="h-6 w-6 rounded-full bg-slate-950 flex items-center justify-center font-bold text-indigo-400 border border-indigo-500/20 text-xs shrink-0 mt-0.5 font-mono">
                2
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-white text-sm">METR Doubling Time</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Whether the task-horizon doubling speed holds at the recent ~4-month pace, reverts to the historical ~7-month pace, or lengthens.
                </p>
              </div>
            </div>

            {/* Watch item 3 (Fired) */}
            <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-4 flex gap-4 items-start relative overflow-hidden">
              <div className="absolute right-0 top-0 bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-bl-xl text-[9px] uppercase tracking-wider font-bold border-l border-b border-indigo-500/10">
                Fired Indicator
              </div>
              <div className="h-6 w-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5 text-indigo-400 border border-indigo-500/30">
                <CheckCircle size={14} />
              </div>
              <div className="space-y-1 max-w-[85%]">
                <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                  ARC-AGI-3 Trajectory Shape
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Verified movement from 0.37% (March 24, 2026 launch) to <strong>7.8% verified</strong> (July 9, 2026, GPT-5.6 Sol). This early movement argues against immediate plateau persistence.
                </p>
              </div>
            </div>

            {readingMode === 'expert' ? (
              <>
                {/* Watch item 4 */}
                <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-4 flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-slate-950 flex items-center justify-center font-bold text-indigo-400 border border-indigo-500/20 text-xs shrink-0 mt-0.5 font-mono">
                    4
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-white text-sm">Successor-Benchmark Design Cost</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Time-to-discriminating-successor after each saturation, and how contrived and complex those successors must become.
                    </p>
                  </div>
                </div>

                {/* Watch item 5 */}
                <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-4 flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-slate-950 flex items-center justify-center font-bold text-indigo-400 border border-indigo-500/20 text-xs shrink-0 mt-0.5 font-mono">
                    5
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-white text-sm">Delegation Share in Usage Data</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Economy-weighted shift from simple tool augmentation to autonomous delegation, mapped per occupational domain.
                    </p>
                  </div>
                </div>

                {/* Watch item 6 */}
                <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-4 flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-slate-950 flex items-center justify-center font-bold text-indigo-400 border border-indigo-500/20 text-xs shrink-0 mt-0.5 font-mono">
                    6
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-white text-sm">The Capability-Deployment Gap</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Whether enterprise ROI discipline and organizational inertia compress or extend the lag between capability and economic reality.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-xs text-slate-500 font-semibold p-4 bg-slate-900/10 border border-slate-900/30 rounded-xl leading-relaxed">
                Three more indicators — successor-benchmark design cost, delegation share in usage data, and the capability–deployment gap — are in the full synthesis.{' '}
                <button
                  onClick={() => handleSetMode('expert')}
                  className="text-indigo-400 hover:text-indigo-300 font-bold underline cursor-pointer ml-1 inline"
                >
                  Read expert mode &rarr;
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SOURCES REFERENCED */}
        <section className="glass-panel p-6 sm:p-8 space-y-4 border-slate-900 text-left text-xs text-slate-400 leading-relaxed overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-850 pb-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileText size={14} className="text-indigo-400" />
              Sources &amp; References
            </h4>
            <button
              onClick={() => setSourcesOpen(o => !o)}
              className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              {sourcesOpen ? 'Collapse' : 'Expand Sources'}
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${sourcesOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
          
          {sourcesOpen && (
            <div className="space-y-4 animate-fadeIn">
              <p>
                <strong>Devresse, A., et al.</strong>, <em>The AI Revolution: 2026 Brief (V2)</em>, April 2026 (seed hypothesis) · <strong>METR</strong>, time-horizons research (metr.org/time-horizons) · <strong>ARC Prize Foundation</strong>: ARC-AGI-3 technical report (March 2026), ARC Prize 2025 results · <strong>Scale AI</strong> SWE-bench Pro leaderboards (standardized public/private) · <strong>llm-stats</strong> vendor-aggregate SWE-bench Pro tracking · <strong>OpenAI</strong> SWE-bench Verified contamination withdrawal (Feb 2026) · <strong>Forrester</strong> (2026 spend postponement data) · <strong>Gartner</strong> (agentic adoption & decision-maker outcome survey) · <strong>Bain</strong> enterprise AI deployment survey · <strong>MIT Project NANDA</strong>, <em>The GenAI Divide</em> (2025) · <strong>SignalFire</strong> State of Talent (2025) · <strong>Stanford Digital Economy Lab</strong> · <strong>Anthropic Economic Index</strong> & O*NET task taxonomy · <strong>Uber</strong> agentic-tool spend caps, 2026 · <strong>Kalai & Nachum</strong>, calibration/bluffing (arXiv:2509.04664) · <strong>Self-driving autonomy</strong> timelines 2016–2026.
              </p>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-[10px] text-slate-500 leading-normal flex items-start gap-2">
                <RefreshCw size={12} className="shrink-0 mt-0.5 text-indigo-500" />
                <span>
                  <strong>Provenance Note:</strong> Figures above reflect verified sources and web-checked on July 10, 2026. Several figures (especially vendor benchmark scores and fast-decaying leaderboards) carry extremely short half-lives and must be re-verified before reuse.
                </span>
              </div>
            </div>
          )}
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-8 bg-slate-950 text-center text-xs text-slate-600">
        <p>© 2026 Briefing Synthesis. Synthesis with participation of Arthur Devresse; see authorship disclosure above.</p>
        <p className="mt-1.5 text-[10px]">Evaluating the meta-metrics of cognitive capability and deployment lag.</p>
      </footer>

    </div>
  );
}

export default App;
