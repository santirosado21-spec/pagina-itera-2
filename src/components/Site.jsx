import { useEffect, useId, useRef, useState } from 'react'
import { dimensions, evidence, flow, links, proof } from '../data/content'

export function Logo() { return <a className="logo" href="/" aria-label="Itera design options home"><img src="/a0ba166a-1b60-4d4e-bf9f-8b669276e87c.png" alt="" width="1371" height="659" /></a> }

export function Nav({ enterprise = false, minimal = false, dark = false, productLed = false }) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  return <header className={`site-header ${dark ? 'on-dark' : ''}`}>
    <nav className="nav container" aria-label="Primary navigation">
      <Logo />
      <button className="menu-button" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(!open)}><span className="sr-only">{open ? 'Close' : 'Open'} navigation</span><i /><i /></button>
      <div id={menuId} className={`nav-links ${open ? 'open' : ''}`}>
        {!minimal && <a href="#product" onClick={() => setOpen(false)}>Product</a>}
        <a href="#how" onClick={() => setOpen(false)}>How it works</a>
        <a href="#managers" onClick={() => setOpen(false)}>For managers</a>
        {productLed && <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>}
        {productLed && <a href="#about" onClick={() => setOpen(false)}>About</a>}
        <a href={links.login}>Log in</a>
        <a className="button nav-cta itera-primary-cta" href={links.demo}>{enterprise ? 'Schedule a briefing' : 'Request a demo'}</a>
      </div>
    </nav>
  </header>
}

export function Evidence({ dark = false, inline = false }) {
  return <div className={`evidence ${dark ? 'evidence-dark' : ''} ${inline ? 'evidence-inline' : ''}`}>
    {evidence.map(item => <article key={item.value} className="evidence-item">
      <strong>{item.value}</strong><p>{item.text}</p><cite>{item.source}</cite>
    </article>)}
  </div>
}

export function Simulation({ evaluation = false }) {
  if (evaluation) return <div className="evaluation-panel" aria-label="Sample interface showing six evaluation dimensions with evidence cited">
    <header><strong>Evaluation evidence</strong><span>Sample interface</span></header>
    <div className="evaluation-evidence" role="list" aria-label="Evaluation dimensions">
      {['Judgment', 'Accuracy', 'Adoption', 'Performance', 'Risk control', 'Transparency'].map(label =>
        <div className="evidence-row" role="listitem" key={label} aria-label={`${label}: Evidence cited`}><span>{label}</span><strong>Evidence cited</strong></div>
      )}
    </div>
    <small>Illustrative interface only. No result is shown.</small>
  </div>
  return <div className="simulation" role="img" aria-label="Sample Itera practice interface for the Catch the hallucination case">
    <header><span>itera · practice</span><span>CASE 3 · IN PROGRESS</span></header>
    <div className="sim-progress"><span>What the model gets to see</span><strong>4/9</strong></div>
    <div className="sim-copy"><small>The email your manager asked for</small><h3>Catch the hallucination</h3></div>
    <footer><span>12-day streak</span><strong>30/40</strong></footer>
  </div>
}

export function Dashboard({ enterprise = false, className = '' }) {
  return <div className={`dashboard ${enterprise ? 'dashboard-enterprise' : ''} ${className}`}>
    <header><div><span>Team overview</span><strong>AI readiness</strong></div><small>Sample data</small></header>
    <div className="dashboard-metrics"><div><div className="readiness-value" role="group" aria-label="Readiness: 64 out of 100"><strong aria-hidden="true">64</strong><small aria-hidden="true">/100</small></div><span aria-hidden="true">Readiness</span></div><div><strong>6/8</strong><span>Assessed</span></div><div><strong>11</strong><span>Risk events</span></div></div>
    <div className="team-list"><strong>Team readiness <small>· anonymized team members</small></strong>{[['V',94],['A',89],['D',72]].map(([name,n]) => <div key={name}><span aria-label={`Anonymized team member ${name}`}>{name}</span><i><b style={{width:`${n}%`}} /></i><strong>{n}%</strong></div>)}</div>
  </div>
}

export function Dimensions() { return <div className="dimensions">{dimensions.map(([t,d]) => <div key={t} className={t === 'Risk' ? 'risk' : ''}><h3>{t}</h3><p>{d}</p></div>)}</div> }

export function HorizontalFlow({ graph = false }) {
  const [active, setActive] = useState(0)
  const detailHeading = useRef(null)
  const detailId = useId()
  const [lit, setLit] = useState(graph ? 1 : 9)
  useEffect(() => {
    if (!graph) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setLit(9); return }
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { flow.forEach((_, i) => setTimeout(() => setLit(i + 1), i * 100)); io.disconnect() } }, { threshold: .25 })
    const el = detailHeading.current?.closest('section')
    if (el) io.observe(el)
    return () => io.disconnect()
  }, [graph])
  function choose(i, keyboard) { setActive(i); if (keyboard) requestAnimationFrame(() => detailHeading.current?.focus()) }
  return <>
    <div className={`nine-stage-orbit ${graph ? 'directed-graph' : ''}`} role="group" aria-label="Nine-stage measurement process">
      <svg className="nine-stage-rings" viewBox="0 0 800 800" aria-hidden="true">
        <circle className="orbit-ring orbit-ring-outer" cx="400" cy="400" r="318" />
        <circle className="orbit-ring orbit-ring-inner" cx="400" cy="400" r="250" />
        <circle className="orbit-progress" cx="400" cy="400" r="318" pathLength="100" style={{ strokeDasharray: `${Math.max((active / (flow.length - 1)) * 100, .45)} 100` }} />
      </svg>
      <div className="orbit-core" aria-hidden="true">
        <span>itera</span>
        <strong>Operating loop</strong>
        <small>{String(active + 1).padStart(2, '0')} / 09</small>
      </div>
      <ol className="orbit-stages">
        {flow.map(([label], i) => {
          const angle = (-90 + (i * 360 / flow.length)) * Math.PI / 180
          const style = { left: `${50 + Math.cos(angle) * 39.75}%`, top: `${50 + Math.sin(angle) * 39.75}%`, '--orbit-delay': `${i * 55}ms` }
          return <li style={style} key={label}>
            <button className={`${active === i ? 'active' : ''} ${i < lit ? 'lit' : ''}`} aria-pressed={active === i} aria-controls={detailId} aria-label={`Step ${i + 1}: ${label}`} onClick={() => choose(i, false)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(i, true) } }}>
              <small>{String(i + 1).padStart(2, '0')}</small><span>{label}</span>
            </button>
          </li>
        })}
      </ol>
    </div>
    <div id={detailId} className="flow-detail orbit-detail" aria-live="polite"><small>{String(active + 1).padStart(2, '0')} — {flow[active][0]}</small><h3 tabIndex="-1" ref={detailHeading}>{flow[active][1]}</h3><p>{flow[active][2]}</p><span className="orbit-output"><small>Output</small><strong>{flow[active][3]}</strong></span></div>
  </>
}

export function VerticalFlow() { return <div className="vertical-flow" role="list">{flow.map(([label, heading, detail, artifact], i) => <article role="listitem" className={i > 6 ? 'highlight' : ''} key={label}><div><small>{String(i+1).padStart(2,'0')}</small><h3>{label}</h3></div><p><strong>{heading}</strong> {detail}</p><span><small>Output</small>{artifact}</span></article>)}</div> }

export function Proof() { return <div className="proof">{proof.map(x => <p key={x}>{x}</p>)}</div> }

export function FinalCTA({ enterprise = false, minimal = false }) { return <section id="demo" className={`final-cta section ${minimal ? 'minimal' : ''}`}><div className="container"><h2>Find out where your team actually stands</h2><p>Book a 20-minute demo. We play a real case, show you the report it produces, and you leave knowing what we would measure on your team.</p>{!minimal && <div className="final-evidence"><p>44% of US employees use AI tools at work in unauthorized ways. Better to find out here than in an incident report.</p><cite>Source cited on current Itera production page</cite></div>}<div className="cta-row"><a className="button" href={links.demo}>{enterprise ? 'Schedule a briefing' : 'Request a demo'}</a>{!minimal && <a className="text-link" href={links.signup}>Start with my team →</a>}</div>{!minimal && <small>$149 USD per seat/month, less at volume · cancel anytime.</small>}</div></section> }

export function Footer() { return <footer className="footer"><div className="container footer-grid"><div><Logo /><p>AI fluency for teams. Measure the judgment, close the gaps.</p></div><div><strong>Product</strong><a href="#how">How it works</a><a href={links.cases}>Cases</a><a href="#managers">For managers</a></div><div><strong>Company</strong><a href={links.email}>Contact sales</a><a href={links.demo}>Manager demo</a></div><div><strong>Legal</strong><a href={links.privacy}>Privacy</a><a href={links.terms}>Terms</a></div></div><div className="container copyright">© 2026 Itera. All rights reserved. AI fluency, measured.</div></footer> }

export function PageShell({ children, className = '' }) {
  const shellRef = useRef(null)
  useEffect(() => {
    if (!window.location.hash) return
    const frame = requestAnimationFrame(() => {
      const target = document.querySelector(window.location.hash)
      if (target) target.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [])
  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return
    const sections = [...new Set(shell.querySelectorAll('main > section, footer'))]
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      sections.forEach(section => section.classList.add('motion-visible'))
      return
    }
    shell.classList.add('motion-ready')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('motion-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: .08, rootMargin: '0px 0px -8% 0px' })
    sections.forEach(section => observer.observe(section))
    const syncVisibility = () => shell.classList.toggle('motion-paused', document.visibilityState === 'hidden')
    syncVisibility()
    document.addEventListener('visibilitychange', syncVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [])
  return <div ref={shellRef} className={className}><a className="skip-link" href="#main">Skip to content</a>{children}</div>
}

export function Reveal({ children, className = '', as: Tag = 'div' }) {
  return <Tag className={`reveal ${className}`}>{children}</Tag>
}

const workbenchStates = [
  ['Observe', 'What the model gets to see', 'Inspect the draft and the source artifact before acting.'],
  ['Decide', 'The email your manager asked for', 'Choose what to hand over, what to keep, and when to push back.'],
  ['Verify', 'Catch the hallucination', 'Check the claim against cited evidence before it ships.'],
]

export function ProductWorkbench() {
  const [active, setActive] = useState(0)
  return <div className="product-workbench" aria-label="Interactive sample role simulation workbench">
    <div className="workbench-top"><span>itera · practice</span><span>CASE 3 · IN PROGRESS</span></div>
    <div className="workbench-tabs" role="tablist" aria-label="Simulation workflow">
      {workbenchStates.map(([label], i) => <button key={label} role="tab" aria-selected={active === i} onClick={() => setActive(i)}><i>{i + 1}</i>{label}</button>)}
    </div>
    <div className="workbench-stage">
      <div className="artifact-stack" aria-hidden="true"><i /><i /><i /></div>
      <div className="workbench-card" role="tabpanel" tabIndex="0">
        <small>{workbenchStates[active][0]} · SAMPLE INTERFACE</small>
        <h3>{workbenchStates[active][1]}</h3><p>{workbenchStates[active][2]}</p>
        <div className="evidence-chip"><i /> Evidence {active === 2 ? 'ready to verify' : 'scan in progress'}</div>
      </div>
      <div className="scan-field workbench-scan-overlay" aria-hidden="true"><i className="scan-line" /></div>
    </div>
    <div className="workbench-foot"><span>Role simulation</span><strong>{active + 1}/3</strong></div>
  </div>
}

const activitySeries = [
  { label: 'Verified decisions', color: '#003aff', points: '0,92 52,74 104,79 156,43 208,55 260,25 320,34', area: 'M0 92 L52 74 L104 79 L156 43 L208 55 L260 25 L320 34 L320 120 L0 120 Z' },
  { label: 'Practice completed', color: '#7b9cff', points: '0,105 52,92 104,88 156,72 208,76 260,57 320,63', area: 'M0 105 L52 92 L104 88 L156 72 L208 76 L260 57 L320 63 L320 120 L0 120 Z' },
  { label: 'Risk escalated', color: '#ef5b62', points: '0,112 52,106 104,109 156,98 208,101 260,91 320,95', area: 'M0 112 L52 106 L104 109 L156 98 L208 101 L260 91 L320 95 L320 120 L0 120 Z' },
]

function ActivityDashboard() {
  return <div className="activity-dashboard">
    <div className="product-legend" aria-label="Activity chart legend">{activitySeries.map(item => <span key={item.label}><i style={{ backgroundColor: item.color }} />{item.label}</span>)}</div>
    <svg className="activity-chart" viewBox="0 0 320 120" role="img" aria-label="Verified decisions and completed practice increased over the last seven sessions while escalated risk stayed low">
      <g className="activity-grid"><path d="M0 20H320M0 53H320M0 86H320M0 119H320" /></g>
      {activitySeries.map(item => <g key={item.label}><path d={item.area} fill={item.color} opacity=".08" /><polyline points={item.points} fill="none" stroke={item.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></g>)}
    </svg>
    <div className="activity-axis" aria-hidden="true"><span>S1</span><span>S2</span><span>S3</span><span>S4</span><span>S5</span><span>S6</span><span>S7</span></div>
    <div className="activity-metrics">
      {[['Review time', '6 min', 'down', '18% faster'], ['Decision accuracy', '86%', 'up', '9% higher'], ['Risk escalation', '10%', 'down', '4% lower']].map(([label, value, direction, change]) => <div key={label}><span>{label}</span><strong>{value}</strong><em className={`metric-trend ${direction}`}>{direction === 'up' ? '↑' : '↓'} {change}</em></div>)}
    </div>
  </div>
}

const judgmentSignals = [
  { label: 'Sound judgment', value: 48, color: '#003aff' },
  { label: 'Needs verification', value: 32, color: '#7b9cff' },
  { label: 'Risky handoff', value: 20, color: '#ef5b62' },
]

function JudgmentDonut() {
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const active = hovered ?? selected
  const shown = active ?? { label: 'Decisions reviewed', value: 100, color: '#171d33' }
  let offset = 0
  return <div className="judgment-breakdown">
    <div className="donut-wrap">
      <svg className="judgment-donut" viewBox="0 0 200 200" role="img" aria-label="Decision signal breakdown: 48 percent sound judgment, 32 percent needs verification, and 20 percent risky handoff">
        <circle className="donut-base" cx="100" cy="100" r="72" pathLength="100" />
        {judgmentSignals.map(segment => { const dashOffset = -offset; offset += segment.value; return <circle key={segment.label} className="donut-segment" cx="100" cy="100" r="72" pathLength="100" stroke={segment.color} strokeDasharray={`${segment.value - 1.5} ${101.5 - segment.value}`} strokeDashoffset={dashOffset} tabIndex="0" onFocus={() => setHovered(segment)} onBlur={() => setHovered(null)} onMouseEnter={() => setHovered(segment)} onMouseLeave={() => setHovered(null)} /> })}
      </svg>
      <div className="donut-center" aria-live="polite"><span>{shown.label}</span><strong style={{ color: shown.color }}>{shown.value}{active ? '%' : ''}</strong></div>
    </div>
    <div className="donut-legend">{judgmentSignals.map(segment => <button type="button" key={segment.label} className={active?.label === segment.label ? 'active' : ''} aria-pressed={selected?.label === segment.label} onFocus={() => setHovered(segment)} onBlur={() => setHovered(null)} onMouseEnter={() => setHovered(segment)} onMouseLeave={() => setHovered(null)} onClick={() => setSelected(selected?.label === segment.label ? null : segment)}><span><i style={{ backgroundColor: segment.color }} />{segment.label}</span><strong>{segment.value}%</strong></button>)}</div>
  </div>
}

function ReadinessScore() {
  const score = 82
  return <div className="readiness-score-card">
    <div className="score-header"><span>AI judgment score</span><strong className="score-strength">Strong</strong></div>
    <div className="score-gauge">
      <svg viewBox="0 0 220 125" role="img" aria-label="AI judgment score: 82 out of 100, strong"><defs><linearGradient id="readiness-gradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#7b9cff"/><stop offset="1" stopColor="#003aff"/></linearGradient></defs><path className="score-gauge-base" d="M20 110 A90 90 0 0 1 200 110" pathLength="100"/><path className="score-gauge-value" d="M20 110 A90 90 0 0 1 200 110" pathLength="100" strokeDasharray={`${score} ${100-score}`}/></svg>
      <div><strong>{score}</strong><span>out of 100</span></div>
    </div>
    <p>Consistently verifies model output and protects sensitive context before acting.</p>
    <div className="score-signals">{[['Verification', '91', 'strong'], ['Delegation', '78', 'moderate'], ['Risk handling', '74', 'moderate']].map(([label, value, tone]) => <div key={label}><span>{label}</span><strong className={`score-indicator ${tone}`}>{value}</strong></div>)}</div>
  </div>
}

function CaseDecision() {
  return <div className="case-decision-demo liquid-glass-panel">
    <div className="case-decision-artifact"><small>Customer escalation · Draft reply</small><strong>“The service was restored in under two hours.”</strong><p>Source notes show a four-hour interruption. Decide what the model can keep, what must change, and what needs verification.</p></div>
    <div className="case-decision-actions" role="list" aria-label="Sample case decision choices"><span role="listitem">Keep with evidence</span><span role="listitem" className="selected">Verify before sending · Sample selected state</span><span role="listitem">Escalate to manager</span></div>
    <footer><span>Evidence found · 2 conflicts</span><strong>Decision recorded</strong></footer>
  </div>
}

function TargetedPractice() {
  return <div className="targeted-practice-demo liquid-glass-panel">
    <header><span>Assigned from observed evidence</span><strong>6 min</strong></header>
    <div className="practice-focus"><small>Focus area</small><h4>Verification before action</h4><p>Practice the exact judgment gap surfaced in the last case, then reassess it in the same workflow.</p></div>
    <div className="practice-plan"><div><span>01</span><strong>Inspect the claim</strong></div><div><span>02</span><strong>Check the source</strong></div><div><span>03</span><strong>Choose the safe action</strong></div></div>
    <footer><span>Linked signal · Verification 64</span><strong>Ready to start →</strong></footer>
  </div>
}

function ProductScreenFrame({ step, category, title, children }) {
  return <article className="product-screen" aria-labelledby={`product-screen-${step}`}>
    <div className="product-screen-chrome" aria-hidden="true"><span /><span /><span /></div>
    <div className="product-screen-body">
      <header className="product-screen-heading"><p><span className="screen-step">{step}/5</span>{category}<span className="sample-label">Sample data</span></p><h3 id={`product-screen-${step}`}>{title}</h3></header>
      <div className="product-screen-viewport">{children}</div>
    </div>
  </article>
}

export function ProductScreens() {
  const trackRef = useRef(null)
  const [position, setPosition] = useState({ start: true, end: false })
  function syncPosition() {
    const track = trackRef.current
    if (!track) return
    setPosition({ start: track.scrollLeft <= 2, end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2 })
  }
  function move(direction) {
    const track = trackRef.current
    const card = track?.querySelector('.product-screen')
    if (!track || !card) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap) })
  }
  useEffect(() => {
    const track = trackRef.current
    const frame = requestAnimationFrame(syncPosition)
    const resizeObserver = new ResizeObserver(syncPosition)
    if (track) resizeObserver.observe(track)
    window.addEventListener('resize', syncPosition)
    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('resize', syncPosition)
    }
  }, [])
  return <section className="product-screens" aria-label="Sample Itera product analytics">
    <div className="product-screens-toolbar"><p>Five sample views of team judgment</p><div className="product-screen-controls" aria-label="Product screen carousel controls"><button type="button" onClick={() => move(-1)} disabled={position.start} aria-label="Previous product screen">←</button><button type="button" onClick={() => move(1)} disabled={position.end} aria-label="Next product screen">→</button></div></div>
    <div className="product-screens-track" ref={trackRef} onScroll={syncPosition}>
      <ProductScreenFrame step="1" category="Practice activity" title="See where judgment is improving"><ActivityDashboard /></ProductScreenFrame>
      <ProductScreenFrame step="2" category="Decision signals" title="Understand what needs attention"><JudgmentDonut /></ProductScreenFrame>
      <ProductScreenFrame step="3" category="Readiness score" title="Turn evidence into a clear score"><ReadinessScore /></ProductScreenFrame>
      <ProductScreenFrame step="4" category="Case decision" title="Make the call inside a real artifact"><CaseDecision /></ProductScreenFrame>
      <ProductScreenFrame step="5" category="Targeted practice" title="Practice the exact gap that surfaced"><TargetedPractice /></ProductScreenFrame>
    </div>
  </section>
}

const chartSets = {
  Readiness: { line: 'M0 74 C35 72 45 56 78 60 S124 40 160 45 S208 18 260 22', value: '64/100' },
  Adoption: { line: 'M0 78 C38 68 56 70 86 51 S140 62 174 39 S220 45 260 26', value: '6/8' },
  Risk: { line: 'M0 32 C35 35 55 25 87 40 S140 38 170 55 S220 51 260 72', value: '11' },
}

export function ControlRoom() {
  const [view, setView] = useState('Readiness')
  const current = chartSets[view]
  return <div className="control-room" aria-label="Enterprise control room with sample data">
    <div className="control-head"><div><i /> ITERA CONTROL / TEAM OVERVIEW</div><strong>Sample data</strong></div>
    <div className="control-grid">
      <section className="trend-module"><header><span>{view} trend</span><strong>{current.value}</strong></header><div className="chart-tabs" role="tablist" aria-label="Choose trend data">{Object.keys(chartSets).map(x => <button role="tab" aria-selected={view === x} key={x} onClick={() => setView(x)}>{x}</button>)}</div><div className="trend-chart"><span className="axis-label axis-high">High</span><span className="axis-label axis-low">Low</span><svg viewBox="0 0 260 92" role="img" aria-label={`${view} sample trend from week 1 to week 4`}><g className="chart-grid"><path d="M0 22H260M0 46H260M0 70H260" /></g><path className="trend-line" d={current.line} pathLength="1" /><circle className="trend-dot" cx="260" cy={view === 'Risk' ? 72 : view === 'Adoption' ? 26 : 22} r="4" /></svg><div className="time-axis"><span>W1</span><span>W2</span><span>W3</span><span>W4</span></div></div></section>
      <section className="risk-module"><header><span>Risk distribution</span><small>Sample data</small></header>{[['Risk control',62],['Transparency',44],['Accuracy',31]].map(([x,n]) => <div className="risk-bar" key={x}><span>{x}</span><i><b style={{'--bar':`${n}%`}} /></i></div>)}</section>
      <section className="matrix-module"><header><span>Team readiness matrix</span><small>Sample data</small></header><div className="matrix" role="img" aria-label="Sample team readiness heatmap, one cell selected">{Array.from({length:24},(_,i)=><i className={i === 8 ? 'selected' : ''} key={i} style={{'--delay':`${i * 35}ms`}} />)}</div><div className="heat-legend" aria-label="Heatmap legend"><span>Lower</span><i /><i /><i /><span>Higher</span></div><footer><span>Roles × dimensions</span><strong><i /> Selected · Review signal</strong></footer></section>
    </div>
    <div className="pipeline-strip" aria-label="Pipeline status, sample interface">{['Company','Roles','Simulations','Evaluation','Adoption','Gaps','Learning','Dashboard','Measured'].map((x,i)=><div key={x}><i className={i < 7 ? 'online' : ''}/><span>{String(i+1).padStart(2,'0')} {x}</span></div>)}</div>
  </div>
}

export function SignalNetwork() {
  const [active, setActive] = useState(0)
  const panelId = useId()
  return <div className="signal-story">
    <div className="signal-mobile-motif" aria-hidden="true"><i /><i /><i /><i /><span /></div>
    <div className="signal-network" role="group" aria-label="Nine-stage AI measurement signal network">
      <svg viewBox="0 0 800 520" aria-hidden="true"><path className="signal-path path-a" d="M92 260 C170 90 265 95 330 188 S470 310 540 205 S665 110 720 245"/><path className="signal-path path-b" d="M92 260 C190 410 285 408 355 330 S488 220 540 325 S660 410 720 245"/><circle className="signal-orbit" cx="400" cy="260" r="180" /></svg>
      {flow.map(([label], i) => <button key={label} className={`signal-node node-${i+1} ${active===i?'active':''}`} aria-pressed={active===i} aria-controls={panelId} onClick={()=>setActive(i)}><i>{String(i+1).padStart(2,'0')}</i><span>{label}</span></button>)}
      <span className="orbit-token token-one" aria-hidden="true">evidence</span><span className="orbit-token token-two" aria-hidden="true">decision</span><span className="orbit-token token-three" aria-hidden="true">practice</span>
    </div>
    <ol className="signal-mobile">{flow.map(([label,heading,detail],i)=><li key={label}><button aria-expanded={active===i} onClick={()=>setActive(i)}><small>{String(i+1).padStart(2,'0')}</small><span>{label}</span></button>{active===i&&<div><strong>{heading}</strong><p>{detail}</p></div>}</li>)}</ol>
    <div id={panelId} className="signal-detail" aria-live="polite"><small>SIGNAL {String(active+1).padStart(2,'0')} / 09</small><h3>{flow[active][1]}</h3><p>{flow[active][2]}</p><span>Output · {flow[active][3]}</span></div>
  </div>
}
