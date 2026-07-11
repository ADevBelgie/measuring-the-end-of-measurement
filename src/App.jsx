import React, { useState, useEffect, lazy, Suspense } from 'react';
import { 
  Ruler, Activity, TrendingUp, Sliders, Calendar, 
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

  // SVG trace for banner representing a chart recorder pen strip
  const renderBannerTrace = () => {
    let strokeColor = 'stroke-line/60';
    let pathD = 'M0 5 L1000 5'; // flat calm line
    if (daysOld >= 60 && daysOld < 120) {
      strokeColor = 'stroke-signal';
      // slight sawtooth/jitter
      pathD = 'M0 5 L50 5 L55 3 L60 7 L65 5 L150 5 L155 4 L160 6 L165 5 L250 5 L255 2 L260 8 L265 5 L350 5 L355 3 L360 7 L365 5 L450 5 L455 4 L460 6 L465 5 L550 5 L555 2 L560 8 L565 5 L650 5 L655 3 L660 7 L665 5 L750 5 L755 4 L760 6 L765 5 L850 5 L855 2 L860 8 L865 5 L950 5 L955 3 L960 7 L965 5 L1000 5';
    } else if (daysOld >= 120) {
      strokeColor = 'stroke-ground';
      // heavy jitter
      pathD = 'M0 5 L30 5 L33 1 L36 9 L39 2 L42 8 L45 5 L120 5 L123 0 L126 10 L129 1 L132 9 L135 5 L210 5 L213 1 L216 9 L219 2 L222 8 L225 5 L300 5 L303 0 L306 10 L309 1 L312 9 L315 5 L400 5 L403 1 L406 9 L409 2 L412 8 L415 5 L500 5 L503 0 L506 10 L509 1 L512 9 L515 5 L600 5 L603 1 L606 9 L609 2 L612 8 L615 5 L700 5 L703 0 L706 10 L709 1 L712 9 L715 5 L800 5 L803 1 L806 9 L809 2 L812 8 L815 5 L900 5 L903 0 L906 10 L909 1 L912 9 L915 5 L1000 5';
    }
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" preserveAspectRatio="none" viewBox="0 0 1000 10">
        <path d={pathD} className={`${strokeColor} fill-none`} strokeWidth={1.5} />
      </svg>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-ground text-ink font-sans antialiased transition-colors duration-300">
      
      {/* ─── DYNAMIC DECAYING DATE BANNER (CHART-RECORDER STYLE) ─── */}
      <div className={`w-full py-2.5 px-4 text-xs font-semibold text-center border-b flex justify-center items-center gap-2 select-none relative overflow-hidden font-mono tracking-wide ${
        daysOld < 60
          ? 'bg-panel border-line/25 text-ink-dim/80'
          : daysOld < 120
            ? 'bg-panel border-line/25 text-signal'
            : 'bg-signal border-signal text-ground font-bold'
      }`}>
        {renderBannerTrace()}
        <span className={`relative z-10 px-3 select-text ${daysOld >= 120 ? 'bg-signal text-ground' : 'bg-panel text-ink-dim'}`}>
          {daysOld < 60 && "Data as of July 10, 2026."}
          {daysOld >= 60 && daysOld < 120 && `Data as of July 10, 2026 — ${daysOld} days old. By this brief's own thesis, some figures below have likely decayed. Re-verify before citing.`}
          {daysOld >= 120 && `Data as of July 10, 2026 — ${daysOld} days old. This exceeds half the proposed benchmark half-life. Treat all leaderboard figures as historical.`}
        </span>
      </div>

      {/* ─── STICKY HEADER ─── */}
      <header className="border-b border-line/20 bg-ground/90 backdrop-blur-xl sticky top-0 z-50 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 border border-line/30 rounded-md flex items-center justify-center text-signal">
              <Ruler size={18} />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-ink tracking-tight">Measuring the End of Measurement</h1>
              <div className="hidden sm:flex gap-2 text-[9px] text-ink-faint font-semibold uppercase tracking-wider">
                <span>Synthesis</span>
                <span>•</span>
                <span className="text-signal">July 2026 Briefing</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5">
            <span className="text-xs text-ink-dim font-medium hidden md:inline">Reading Mode:</span>
            <div className="flex bg-panel border border-line/20 p-0.5 rounded-lg text-xs">
              <button 
                onClick={() => handleSetMode('brief')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  readingMode === 'brief' 
                    ? 'bg-signal text-ground' 
                    : 'text-ink-dim hover:text-ink hover:bg-raised'
                }`}
              >
                <FileText size={13} />
                Brief
              </button>
              <button 
                onClick={() => handleSetMode('expert')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  readingMode === 'expert' 
                    ? 'bg-signal text-ground' 
                    : 'text-ink-dim hover:text-ink hover:bg-raised'
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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-panel border border-line/25 rounded-full text-xs font-semibold text-ink-dim">
            <Sparkles size={12} className="text-signal" />
            <span>Benchmark Half-Life, Task Horizons, and Cognitive Supersession</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-bold text-ink tracking-tight leading-tight">
            Measuring the <span className="border-b-2 border-signal pb-0.5">End of Measurement</span>
          </h2>
          
          <p className="text-base sm:text-xl text-ink-dim font-light leading-relaxed">
            The endpoint of intelligence evaluation will not be announced by a benchmark score, but by a silence — the moment developers can no longer construct tasks that are easy for humans and hard for AI.
          </p>

          {/* Quick-Look Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <div className="glass-panel p-4 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider text-ink-faint font-bold block mb-1">Benchmark Half-Life</span>
              <span className="text-xl font-bold text-ink font-mono">≤8-Month Half-Life</span>
              <span className="text-[9.5px] text-ink-dim leading-normal mt-1 block">
                Proposed April 2026; conservative — see §1
              </span>
            </div>
            
            <div className="glass-panel p-4 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider text-ink-faint font-bold block mb-1">ARC-AGI-3 Trajectory</span>
              <span className="text-xl font-bold text-signal font-mono">7.8% (Verified)</span>
              <span className="text-[9.5px] text-ink-dim leading-normal mt-1 block">
                GPT-5.6 Sol, July 9, 2026. First verified breakthrough.
              </span>
            </div>

            <div className="glass-panel p-4 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider text-ink-faint font-bold block mb-1">The Critical Race</span>
              <span className="text-xl font-bold text-ink font-mono">~2028 Threshold</span>
              <span className="text-[9.5px] text-ink-dim leading-normal mt-1 block">
                Autonomous AI R&D loops vs physical & capital bottlenecks.
              </span>
            </div>
          </div>

          {/* Disclosure and Status Panel (MUST persist in both modes) */}
          <div className="bg-panel border border-line/25 rounded-lg text-xs text-ink-dim leading-relaxed text-left p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-line/15 pb-2.5">
              <span className="font-bold text-ink uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <ShieldAlert size={14} className="text-signal" />
                Authorship Disclosure &amp; Status Note
              </span>
              <button
                onClick={() => setDisclosureOpen(o => !o)}
                className="text-[10px] font-semibold text-signal hover:underline transition-colors flex items-center gap-1 cursor-pointer focus-visible:ring-1 focus-visible:ring-signal focus-visible:outline-none rounded px-1"
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
                <p className="italic border-t border-line/15 pt-2.5">
                  <strong>Status:</strong> Informal synthesis. Point estimates are held loosely and are most useful as a structure for updating, not as forecasts to be quoted. Prose is deliberately compressed; if this document is ever promoted beyond informal synthesis, unpacking is the first job.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* EXECUTIVE SUMMARY */}
        <section className="glass-panel p-6 sm:p-8 space-y-4 text-left">
          <h3 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2 border-b border-line/15 pb-3">
            <FileText className="text-signal" size={18} />
            Executive Summary
          </h3>
          <div className="prose-custom text-ink-dim space-y-4">
            <p>
              There is no single benchmark for "AI supersedes humans on all cognitive tasks," due to two structural barriers: <strong>coverage</strong> (the task set is open-ended, so any test is just a contestable sample of cognition) and the <strong>evaluator ceiling</strong> (for frontier tasks, ground truth relies on human judgment, which ceases to be a valid instrument past the human threshold).
            </p>
            {readingMode === 'expert' ? (
              <p>
                Reality-graded domains — formal proof, resolved prediction, experimental outcome — escape the evaluator ceiling and can certify superhumanity locally, but their verdicts are slow, confounded, and domain-bound: they measure peaks, not coverage. This brief argues that the endpoint will therefore not be announced by a score but by a silence — the moment well-motivated designers can no longer construct any task that is easy for humans and hard for AI — a criterion this brief treats as a leading, cost-relative proxy for supersession rather than its definition.
              </p>
            ) : (
              <p className="text-signal font-medium">
                Takeaway: The endpoint is signaled by a 'silence' — when no one can still construct tasks that are easy for humans but hard for frontier AI. This is a proxy for supersession, not a definition of it — and a *leading* one: it tends to arrive early relative to true supersession (see §1).
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
          <div className="flex items-center gap-2.5 border-b border-line/15 pb-2">
            <Ruler className="text-signal" size={20} />
            <h3 className="text-xl sm:text-2xl font-bold text-ink font-sans">
              1. The Instrument Problem
            </h3>
          </div>

          <div className="prose-custom text-ink-dim space-y-4">
            <p>
              Benchmarks are not random samples of cognition. They are adversarially constructed in the gap between what humans and AI can do, built to be "easy for humans, hard for AI" given what AI currently cannot do. This has two primary consequences:
            </p>
            
            {readingMode === 'expert' ? (
              <>
                <p>
                  <strong>First, benchmarks die fast.</strong> The April 2026 strategic brief proposed an ~8-month benchmark half-life; events since suggest that was conservative. SWE-bench Verified was effectively retired after OpenAI's February 2026 contamination withdrawal. Its successor, SWE-bench Pro, saw its standardized top score move from ~46% (April 2026) to ~59% (Scale standardized public set, July 2026) in roughly ten weeks — while simultaneously fragmenting into three competing "official" numbers, indicating a decay of <em>signal</em> as much as of difficulty.
                </p>
                <p>
                  <strong>Second, the decay is punctuated.</strong> ARC-AGI-1 sat near zero from 2020 through 2023, then collapsed when test-time reasoning (o1/o3) arrived. ARC-AGI-2 went from ~2.5% at its March 2025 launch to 77.1% (Gemini 3.1 Pro) and 84.6% (Gemini 3 Deep Think) by February 2026 — near its practical ceiling in under a year. ARC-AGI-3, launched March 2026 with frontier systems below 1% (best official at release: 0.37%) against a 100% human solve rate, deliberately built off-path from the current training paradigm — interactive, language-free, scored by squared action-efficiency (RHAE) against human baselines. Its predecessors' history predicts a plateau followed by sudden collapse when a missing paradigm ingredient arrives, not a smooth decline. First movement since release: in July 2026 the ARC Prize Foundation verified GPT-5.6 Sol at 7.8% — a ~20× jump in under four months and the first frontier model to beat a complete game. One verified point does not establish a trajectory, and whether the gain reflects genuine skill-acquisition progress or harness-and-effort scaling is not yet clear — the run reportedly used ~2.5× the official compute cap, under which strict scoring would count it at zero; but it is early evidence *against* a long plateau this cycle, and it moves the April brief's 30–50%-by-EOY-2026 forecast from implausible toward merely ambitious.
                </p>
              </>
            ) : (
              <div className="bg-panel border border-line/25 p-4 rounded-lg space-y-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={15} className="text-signal shrink-0 mt-0.5" />
                  <p className="text-sm m-0"><strong>Benchmarks die fast:</strong> SWE-bench Pro's top score moved from 46% to 59% in ten weeks while fragmenting into three competing "official" numbers — a decay of signal, not just difficulty.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={15} className="text-signal shrink-0 mt-0.5" />
                  <p className="text-sm m-0"><strong>But not smoothly:</strong> Benchmarks plateau for years (ARC-AGI-1 sat near zero from 2020–2023), then collapse suddenly when a missing paradigm ingredient arrives (test-time reasoning). The chart below shows the pattern.</p>
                </div>
              </div>
            )}
          </div>

          {/* ARC Cascade Visualizer */}
          <Suspense fallback={<div className="h-[380px] bg-panel border border-line/25 rounded-lg flex items-center justify-center text-ink-faint text-xs">Loading visualization...</div>}>
            <ArcAgiProgress />
          </Suspense>

          <div className="prose-custom text-ink-dim space-y-4 pt-2">
            {readingMode === 'expert' ? (
              <>
                <p>
                  <strong>Implication.</strong> Half-life is too noisy and selection-biased to extrapolate directly. But reframed as a meta-metric — is the half-life staying constant as benchmark territory gets progressively more exotic? how long does it take to build a successor that still discriminates? — it carries information no individual score does.
                </p>
                <p>
                  The terminal condition follows: <strong>the criterion for supersession is the failure of benchmark creation itself</strong> — a standing, well-funded bounty for constructing any discriminating human-easy/AI-hard task — 'hard for AI' pinned to a resource bound (unsolved at the pre-transition reference human's cost, inflation-adjusted — only the human side of the comparison freezes; the AI side's falling cost is the phenomenon under measurement, not contamination) — with the silence declared when the bounty goes unclaimed. This makes the silence a cost-relative, moving target; ARC-AGI-3's efficiency scoring already concedes the point.
                </p>
                <div className="border-l-2 border-line/40 pl-4 py-1.5 bg-panel text-ink-dim rounded-r-md space-y-2 text-xs">
                  <span className="font-bold text-ink block">Three honest limits of the silence criterion:</span>
                  <ul className="list-decimal list-inside space-y-1.5 pl-1 leading-relaxed">
                    <li>It measures one direction of gap — parity with human task-design ingenuity — not supersession across all cognition.</li>
                    <li>The surviving gaps are systematically selected: a bounty claim must be adjudicable, and the residue is selected <em>for</em> verification resistance (§3) — so the silence runs early relative to true supersession, and how early depends on whether conversion outpaces selection (watch item 4).</li>
                    <li>Observability confound: benchmark creation can cease for funding, attention, or liability reasons rather than capability.</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="border-l-2 border-line/40 pl-4 py-1 italic bg-panel text-ink-dim rounded-r-md text-sm">
                <strong>The Existential Boundary:</strong> Supersession is defined by the failure of benchmark creation itself. Rather than measuring dynamic scores, we track the exhaustion of human task-design ingenuity via standing bounties that go unclaimed.
              </div>
            )}
          </div>

          {/* SWE-bench Multi-Ruler visualizer */}
          <Suspense fallback={<div className="h-[300px] bg-panel border border-line/25 rounded-lg flex items-center justify-center text-ink-faint text-xs">Loading rulers...</div>}>
            <SWEBenchRulers />
          </Suspense>
        </section>

        {/* SECTION 2: TASK TIME-HORIZONS */}
        <section className="space-y-6 text-left">
          <div className="flex items-center gap-2.5 border-b border-line/15 pb-2">
            <TrendingUp className="text-signal" size={20} />
            <h3 className="text-xl sm:text-2xl font-bold text-ink font-sans">
              2. The Trend Worth Extrapolating: Task Time-Horizons
            </h3>
          </div>

          <div className="prose-custom text-ink-dim space-y-4">
            <p>
              The most principled version of the extrapolation instinct is METR's time-horizon metric: instead of tracking scores on dying tests, measure the <strong>duration</strong> (in expert-human time) of tasks a model completes at a fixed reliability threshold — METR's headline curve uses 50% success; horizons at 80% reliability run several times shorter, and the dates in §4 track the 50% curve. That horizon has doubled roughly every 7 months across model generations, with recent portions of the curve running closer to 4 months.
            </p>

            {readingMode === 'expert' ? (
              <>
                <p>
                  Two properties make this trend load-bearing: it converts benchmark churn into a comparable quantity, and it internalizes recursive self-improvement. Four properties limit it: it is built almost entirely on software-shaped tasks, it is threshold-relative (horizons at 80% reliability run several times shorter, as noted above), it is a single-source trend, and it measures capability, not deployment.
                </p>
                <p>
                  <strong>Why "one working year" is the chosen threshold:</strong> A working year is approximately the largest unit of work delegated as a single coherent task with defined success criteria (a research project, product cycle, or dissertation chapter). Longer spans are compositions of year-scale tasks. Crossing the year-horizon is roughly where task length stops being the binding constraint and verification, trust, and deployment take over.
                </p>
              </>
            ) : (
              <p className="text-ink-dim">
                A <strong>working year</strong> is roughly the largest unit of work handed over as one coherent task (a research project, a product cycle). Careers are just compositions of year-scale tasks. Once AI crosses the year horizon, task length stops being the bottleneck — verification, trust, and deployment take over.
              </p>
            )}
          </div>

          {/* Timeline Simulator component */}
          <TimelineSimulator />
        </section>

        {/* SECTION 3: THE TASK ARGUMENT */}
        <section className="space-y-6 text-left">
          <div className="flex items-center gap-2.5 border-b border-line/15 pb-2">
            <Sliders className="text-signal" size={20} />
            <h3 className="text-xl sm:text-2xl font-bold text-ink font-sans">
              3. The Task Argument: Automation is Staggered and Structural
            </h3>
          </div>

          <div className="prose-custom text-ink-dim space-y-4">
            <p>
              Automation is not a single event. It is staggered based on structural features of the cognitive tasks themselves. Three mechanisms drive this:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="glass-panel p-5 space-y-2.5">
                <span className="text-line font-bold uppercase tracking-wider text-[10px] block">
                  1. Verification Asymmetry
                </span>
                <h4 className="text-sm font-semibold text-ink">Self-Grading Dominance</h4>
                <p className="text-xs text-ink-dim leading-relaxed">
                  Math and code fell first because they grade themselves. Biology wet-lab loops take years, meaning software horizons double years ahead of life sciences.
                </p>
              </div>

              <div className="glass-panel p-5 space-y-2.5">
                <span className="text-line font-bold uppercase tracking-wider text-[10px] block">
                  2. Adverse Selection of Residue
                </span>
                <h4 className="text-sm font-semibold text-ink">The Self-Driving Car Analogy</h4>
                <p className="text-xs text-ink-dim leading-relaxed">
                  Like self-driving's last 5% — which consumed a decade after the first 95% arrived on schedule — what survives each wave is exactly what resists cheap verification: judgment graded years later, taste without rubrics. The residue cannot certify itself.
                </p>
              </div>

              <div className="glass-panel p-5 space-y-2.5">
                <span className="text-line font-bold uppercase tracking-wider text-[10px] block">
                  3. Bottom-Up Measurement
                </span>
                <h4 className="text-sm font-semibold text-ink">Economic Share Mapping</h4>
                <p className="text-xs text-ink-dim leading-relaxed">
                  Tracking the fraction of O*NET tasks shifting from augmentation to delegation. This yields a later, economically real curve than the frontier-capability dates in the table below.
                </p>
              </div>
            </div>

            {readingMode === 'expert' && (
              <p className="pt-2 text-ink-dim leading-relaxed text-sm">
                Each generation of progress concentrates the residue further. The reference class is self-driving cars, whose first 95% arrived on the extrapolated curve (~2016 confidence, ~2020 predictions) and whose adversely-selected last 5% consumed an additional decade and several companies. Self-driving is one reference class, and its neighbors pull both ways: chess's 'centaur' era — predicted to last decades — collapsed within roughly one; radiology ran a decade behind its 2016 predictions; machine translation's 2018 'human parity' claims remain contested. The spread across classes, not any single offset, is the honest error bar on §4's tail. Some final strongholds are protected by embodiment, legal liability, or human accountable requirements, outliving the cognitive gap entirely.
              </p>
            )}
          </div>
        </section>

        {/* SECTION 4: TIMELINE OF INTELLIGENCE LEVELS */}
        <section className="space-y-6 text-left">
          <div className="flex items-center gap-2.5 border-b border-line/15 pb-2">
            <Calendar className="text-signal" size={20} />
            <h3 className="text-xl sm:text-2xl font-bold text-ink font-sans">
              4. Timeline of Intelligence Levels
            </h3>
          </div>

          <div className="prose-custom text-ink-dim">
            <p>
              Central frontier-capability estimates (not deployed-economic-reality dates). Confidences decrease down the table. The ordering is intentional: most economically relevant tasks are short and can be automated before full year-horizon coherence is unlocked.
            </p>
          </div>

          <p className="text-ink-faint italic text-xs mb-2">
            Read as scaffolding, not forecast: probability masses derive from a thin reference class with informal offsets (§3) and exist to be updated against §5 — see the status note before quoting.
          </p>

          <div className="overflow-x-auto rounded-lg border border-line/25 bg-panel">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-raised text-ink-dim font-semibold uppercase tracking-wider text-[10px] border-b border-line/20">
                  <th className="p-4 w-1/4">Stage</th>
                  <th className="p-4 w-1/6">Estimate</th>
                  <th className="p-4 w-7/12">Key Drivers &amp; Risks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/10">
                <tr className="hover:bg-raised/50">
                  <td className="p-4 font-semibold text-ink">Verifiable-domain superhumanity</td>
                  <td className="p-4 text-ink font-bold font-mono">~2027–2029</td>
                  <td className="p-4 text-ink-dim leading-relaxed">
                    {readingMode === 'brief' 
                      ? 'Math, code, structured analysis — the domains that grade themselves fall first.' 
                      : 'Superhuman at most cheaply-verifiable cognitive work (math, code). Driven by RL on verifiable rewards. Risk: reliability at long task lengths, not peak skill.'}
                  </td>
                </tr>
                <tr className="hover:bg-raised/50">
                  <td className="p-4 font-semibold text-ink">Autonomous AI research threshold</td>
                  <td className="p-4 text-ink font-bold font-mono">Watch by ~2028</td>
                  <td className="p-4 text-ink-dim leading-relaxed">
                    {readingMode === 'brief' 
                      ? 'The pivotal variable: does AI start running its own R&D loop before compute and capital flatten the curve?' 
                      : 'AI contribution to AI R&D crosses from acceleration (~tens of %) to running the loop. The pivotal variable. Race between self-improvement feedback and physical constraints. Not directly observable from outside — see §5, item 1, for the proxy basket.'}
                  </td>
                </tr>
                <tr className="hover:bg-raised/50">
                  <td className="p-4 font-semibold text-ink">Year-horizon crossing</td>
                  <td className="p-4 text-ink font-bold font-mono">~2029–2032</td>
                  <td className="p-4 text-ink-dim leading-relaxed">
                    {readingMode === 'brief' 
                      ? "Completion of coherent tasks taking a skilled human ~1 working year, at METR's 50%-success threshold" 
                      : "Completion of coherent tasks taking a skilled human ~1 working year, at METR's 50%-success threshold. Domain-staggered. Based on 7-month doubling rate. At 80% reliability — closer to 'economically relevant' — the crossing lands later (§2)."}
                  </td>
                </tr>
                <tr className="hover:bg-raised/50">
                  <td className="p-4 font-semibold text-ink">Most economically relevant cognition</td>
                  <td className="p-4 text-ink font-bold font-mono">~2029–2031</td>
                  <td className="p-4 text-ink-dim leading-relaxed">
                    {readingMode === 'brief' 
                      ? 'Superhuman on the bulk of everyday economic tasks — most of which are short.' 
                      : 'Superhuman on the bulk of economy-weighted tasks. Scientific contributions precede the silence by years. Lag driver: verification-resistant domains and deployment gap.'}
                  </td>
                </tr>
                <tr className="hover:bg-raised/50">
                  <td className="p-4 font-semibold text-ink">The Silence</td>
                  <td className="p-4 text-signal font-bold font-mono">Mode 2031–2034</td>
                  <td className="p-4 text-ink-dim leading-relaxed">
                    {readingMode === 'brief' 
                      ? "The cost-bounded bounty of §1 goes unclaimed: no well-funded designer can construct any remaining human-easy (pre-AI baseline) / AI-hard (at frozen reference-human cost) task. ~30% chance this lands after 2035." 
                      : (
                        <div className="space-y-1.5">
                          <p><strong>Criterion:</strong> The cost-bounded bounty of §1 goes unclaimed: no well-funded designer can construct any remaining human-easy (pre-AI baseline) / AI-hard (at frozen reference-human cost) task.</p>
                          <p><strong>Drivers:</strong> Trailing edge by construction — though a <em>leading</em> indicator of true supersession, biased early by §1's selection limit. 10% by 2029; mode 2031–2034 (~55–60%); beyond 2035: ~30%, tailing into the 2040s. The disanalogies from self-driving's last-5% decade (§3) offset the reference class partially, not fully; the ~30% beyond 2035 is its residual claim after those offsets. Neighboring classes bracket it: the chess-centaur collapse argues faster, radiology argues slower (§3).</p>
                        </div>
                      )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 5: WHAT TO WATCH */}
        <section className="space-y-6 text-left">
          <div className="flex items-center gap-2.5 border-b border-line/15 pb-2">
            <Activity className="text-signal" size={20} />
            <h3 className="text-xl sm:text-2xl font-bold text-ink font-sans">
              5. What to Watch (In Order of Information Value)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Watch item 1 */}
            <div className="bg-panel border border-line/25 rounded-lg p-4 flex gap-4 items-start">
              <div className="h-6 w-6 rounded-full bg-raised/20 border border-line/30 flex items-center justify-center font-bold text-ink-dim text-xs shrink-0 mt-0.5 font-mono">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-ink text-sm">The 2028 Race</h4>
                <p className="text-xs text-ink-dim leading-relaxed">
                  {readingMode === 'brief' 
                    ? "Autonomous-research threshold vs. capex/compute flattening. Not directly observable; the primary proxy is an inflection in the METR curve itself."
                    : "Autonomous-research threshold vs. capex/compute flattening. Resolves more uncertainty than any individual benchmark score. Unlike every other item here, this criterion is not directly observable — labs don't publish their internal automation fraction. Proxies are a basket, none reliable alone: an inflection in the METR doubling time itself (§2 argues the curve already internalizes the feedback, so the loop closing surfaces there first), algorithmic-efficiency estimates, lab disclosure language, and the share of model-generated research output. Hiring patterns are confounded — labs freeze hiring for capex reasons too — so watch for co-movement, not any single line."}
                </p>
              </div>
            </div>

            {/* Watch item 2 */}
            <div className="bg-panel border border-line/25 rounded-lg p-4 flex gap-4 items-start">
              <div className="h-6 w-6 rounded-full bg-raised/20 border border-line/30 flex items-center justify-center font-bold text-ink-dim text-xs shrink-0 mt-0.5 font-mono">
                2
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-ink text-sm">METR Doubling Time</h4>
                <p className="text-xs text-ink-dim leading-relaxed">
                  Whether the task-horizon doubling speed holds at the recent ~4-month pace, reverts to the historical ~7-month pace, or lengthens — tracked at a stated reliability threshold, since the 50% and 80% curves answer different questions (§2).
                </p>
              </div>
            </div>

            {/* Watch item 3 (Fired) */}
            <div className="bg-panel border border-signal/40 rounded-lg p-4 flex gap-4 items-start relative overflow-hidden">
              <div className="absolute right-0 top-0 bg-signal text-ground px-3 py-1 rounded-bl-lg text-[9px] uppercase tracking-wider font-bold">
                Fired Indicator
              </div>
              <div className="h-6 w-6 rounded-full bg-signal/15 flex items-center justify-center shrink-0 mt-0.5 text-signal border border-signal/30">
                <CheckCircle size={14} />
              </div>
              <div className="space-y-1 max-w-[85%]">
                <h4 className="font-semibold text-ink text-sm flex items-center gap-2">
                  ARC-AGI-3 Trajectory Shape
                </h4>
                <p className="text-xs text-ink-dim leading-relaxed">
                  Verified movement from 0.37% (March 24, 2026 launch) to <strong>7.8% verified</strong> (July 9, 2026, GPT-5.6 Sol). This early movement argues against immediate plateau persistence, with the compute-budget dispute (§1) still open. Next markers: whether the trajectory continues toward the 30–50% EOY range, whether progress comes from within-paradigm scaling or a nameable new ingredient, and whether verified runs land within the official resource cap.
                </p>
              </div>
            </div>

            {readingMode === 'expert' ? (
              <>
                {/* Watch item 4 */}
                <div className="bg-panel border border-line/25 rounded-lg p-4 flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-raised/20 border border-line/30 flex items-center justify-center font-bold text-ink-dim text-xs shrink-0 mt-0.5 font-mono">
                    4
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-ink text-sm">Successor-Benchmark Design Cost</h4>
                    <p className="text-xs text-ink-dim leading-relaxed">
                      Time-to-discriminating-successor after each saturation, and how contrived and complex those successors must become. This is also the observable face of §1's conversion-vs-selection race — with one conditioning requirement: the signal counts only when successors aim at residue territory. Falling design cost for tasks targeting verification-resistant domains means conversion is winning; falling cost because designers retreat to already-verifiable ground means the opposite — and that retreat is itself a further way the silence could arrive spuriously early.
                    </p>
                  </div>
                </div>

                {/* Watch item 5 */}
                <div className="bg-panel border border-line/25 rounded-lg p-4 flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-raised/20 border border-line/30 flex items-center justify-center font-bold text-ink-dim text-xs shrink-0 mt-0.5 font-mono">
                    5
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-ink text-sm">Delegation Share in Usage Data</h4>
                    <p className="text-xs text-ink-dim leading-relaxed">
                      Economy-weighted shift from simple tool augmentation to autonomous delegation, mapped per occupational domain.
                    </p>
                  </div>
                </div>

                {/* Watch item 6 */}
                <div className="bg-panel border border-line/25 rounded-lg p-4 flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-raised/20 border border-line/30 flex items-center justify-center font-bold text-ink-dim text-xs shrink-0 mt-0.5 font-mono">
                    6
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-ink text-sm">The Capability-Deployment Gap</h4>
                    <p className="text-xs text-ink-dim leading-relaxed">
                      Whether enterprise ROI discipline and organizational inertia compress or extend the lag between capability and economic reality.
                    </p>
                  </div>
                </div>

                {/* Watch item 7 (Action Item) */}
                <div className="bg-panel border border-signal/40 rounded-lg p-4 flex gap-4 items-start md:col-span-2 relative overflow-hidden">
                  <div className="absolute right-0 top-0 bg-signal text-ground px-3 py-1 rounded-bl-lg text-[9px] uppercase tracking-wider font-bold">
                    ACTION ITEM
                  </div>
                  <div className="h-6 w-6 rounded-full bg-signal/15 flex items-center justify-center font-bold text-signal text-xs shrink-0 mt-0.5 font-mono border border-signal/30">
                    7
                  </div>
                  <div className="space-y-1 max-w-[85%]">
                    <h4 className="font-semibold text-ink text-sm flex items-center gap-2">
                      Pre-AI Expert Baselines
                    </h4>
                    <p className="text-xs text-ink-dim leading-relaxed">
                      The reference population defining "human-easy" cannot be reconstructed after deskilling. Archiving broad expert baselines — task performances with time-and-reliability profiles, not just scores — is the one item here that is an action, not an observation, and the only one with a closing window. Alongside performance baselines, archive the task-design corpus: a diverse record of how pre-AI humans constructed discriminating tasks is the natural hedge against the stylistic-convergence risk flagged in §1, and it deskills on the same schedule.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-xs text-ink-faint font-semibold p-4 bg-panel border border-line/20 rounded-lg leading-relaxed md:col-span-2">
                Four more indicators — successor-benchmark design cost, delegation share in usage data, the capability–deployment gap, and pre-AI expert baselines — are in the full synthesis.{' '}
                <button
                  onClick={() => handleSetMode('expert')}
                  className="text-signal hover:underline font-bold cursor-pointer ml-1 inline focus-visible:ring-1 focus-visible:ring-signal focus-visible:outline-none rounded px-1"
                >
                  Read expert mode &rarr;
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SOURCES REFERENCED */}
        <section className="glass-panel p-6 sm:p-8 space-y-4 text-left text-xs text-ink-dim leading-relaxed overflow-hidden">
          <div className="flex items-center justify-between border-b border-line/15 pb-2">
            <h4 className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <FileText size={14} className="text-signal" />
              Sources &amp; References
            </h4>
            <button
              onClick={() => setSourcesOpen(o => !o)}
              className="text-[10px] font-semibold text-signal hover:underline transition-colors flex items-center gap-1 cursor-pointer focus-visible:ring-1 focus-visible:ring-signal focus-visible:outline-none rounded px-1"
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
                <strong>Devresse, A., et al.</strong>, <em>The AI Revolution: 2026 Brief (V2)</em>, April 2026 (seed hypothesis) · <strong>METR</strong>, time-horizons research (metr.org/time-horizons) · <strong>ARC Prize Foundation</strong>: ARC-AGI-3 technical report (March 2026), ARC Prize 2025 results · <strong>Scale AI</strong> SWE-bench Pro leaderboards (standardized public/private) · <strong>llm-stats</strong> vendor-aggregate SWE-bench Pro tracking · <strong>OpenAI</strong> SWE-bench Verified contamination withdrawal (Feb 2026) · <strong>Forrester</strong> (2026 spend postponement data) · <strong>Gartner</strong> (agentic adoption & decision-maker outcome survey) · <strong>Bain</strong> enterprise AI deployment survey · <strong>MIT Project NANDA</strong>, <em>The GenAI Divide</em> (2025) · <strong>SignalFire</strong> State of Talent (2025) · <strong>Stanford Digital Economy Lab</strong> · <strong>Anthropic Economic Index</strong> & O*NET task taxonomy · <strong>Uber</strong> agentic-tool spend caps, 2026 · <strong>Kalai & Nachum</strong>, calibration/bluffing (arXiv:2509.04664) · <strong>Reference classes:</strong> self-driving autonomy timeline (2016–2026); computer-chess centaur era; radiology automation predictions vs. outcomes (2016–); machine-translation 'human parity' claims (2018) and critiques.
              </p>
              <div className="bg-ground p-3 rounded-lg border border-line/15 text-[10px] text-ink-faint leading-normal flex items-start gap-2">
                <RefreshCw size={12} className="shrink-0 mt-0.5 text-signal" />
                <span>
                  <strong>Provenance Note:</strong> Figures above reflect verified sources and web-checked on July 10, 2026. Several figures (especially vendor benchmark scores and fast-decaying leaderboards) carry extremely short half-lives and must be re-verified before reuse.
                </span>
              </div>
            </div>
          )}
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-line/15 py-8 bg-ground text-center text-xs text-ink-faint">
        <p>© 2026 Briefing Synthesis. Synthesis with participation of Arthur Devresse; see authorship disclosure above.</p>
        <p className="mt-1.5 text-[10px] font-mono">Evaluating the meta-metrics of cognitive capability and deployment lag.</p>
      </footer>

    </div>
  );
}

export default App;
