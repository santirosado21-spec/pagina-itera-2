# CLAUDE-DESIGN-DIRECTIONS.md
## Itera Landing Page — Senior Design Directions Brief
### Generated 2026-08-08 | Claude Design, CLI/API mode

**Scope:** Read-only exploration. No existing file has been modified.  
**Output:** This document alone. Codex may implement any route directly from the specs below without further design input.

---

## 0. Internal Audit — Current Artifact vs. AGENTS.md

### Artifact: `itera-landing.html` (commit c2e1bed)

The artifact is a JS-unpacked bundle delivering Inter 400/500/600/700, a sticky frosted-glass nav, three hero variants (A: editorial, B: centered, C: split), and five body sections (Measurable Outcomes, Problem, Product/Simulations, How It Works, Manager Dashboard dark section, Measurement/Proof, Final CTA, Footer). IntersectionObserver fade-translate reveals are implemented. `prefers-reduced-motion` is respected.

---

### P0 — Broken or Functionally Absent

| # | Issue | Location | Rule |
|---|-------|----------|------|
| P0-1 | **Brand blue mismatch.** Artifact renders `#2E6BFF` throughout. SOURCE-CONTENT.md and the canonical brand spec define `#003AFF` (with `#0026A8` pressed, `#003AFF14` soft). Every CTA, eyebrow, and bar fill is the wrong blue. | All sections | AGENTS §13, §15 |
| P0-2 | **Dev artifact visible on production path.** A floating `HERO / Editorial / Centered / Split` switcher widget (`position:fixed; top:16px; right:16px`) is wired to live state. It must not appear on any deployable variant. | Hero overlay | AGENTS §34 |
| P0-3 | **How It Works chain is incomplete.** SOURCE-CONTENT.md mandates the full 9-node chain (Company → Roles → AI Simulations → Evaluation → Adoption Data → Skill Gaps → Personalized Learning → Manager Dashboard → Measurable AI Adoption). The artifact shows only a 3-step Assess / Practice / Measure grid with no visual connecting these nodes. | `#how` section | SOURCE-CONTENT §How it works |
| P0-4 | **Evidence statistics absent.** The three cited research findings (KPMG 57%, McKinsey 3×, IBM $670K) required by SOURCE-CONTENT.md are missing from the artifact entirely. The Problem section lacks the evidential backbone. | Problem / Why Itera | SOURCE-CONTENT §Problem / evidence |

### P1 — High-Impact Design

| # | Issue | Location | Rule |
|---|-------|----------|------|
| P1-1 | **Hero "C" (Split) hero heading is below the type scale minimum.** At `clamp(42px, 4.6vw, 64px)` the upper bound falls below AGENTS §5 Hero H1 minimum of 76px on large screens. | Hero C | AGENTS §5 |
| P1-2 | **Manager dashboard section shows unlabeled sample data.** SOURCE-CONTENT.md requires sample data to be explicitly labeled "Sample data." The dark section displays 64 / 6/8 / 11 with no such label. | `#managers` | SOURCE-CONTENT §For managers |
| P1-3 | **Footer links invented.** Footer includes "About," "Careers," "Security" — none of these are real Itera destinations per SOURCE-CONTENT.md. Permitted destinations: `/demo`, `/case-demo`, `#como`, `#empresas`, `/auth/login`, `#demo`, `/privacy`, `/terms`, `mailto:hola@itera.la`. | Footer | SOURCE-CONTENT §Navigation, AGENTS §39 |
| P1-4 | **Final CTA copy weak.** The artifact says "See how your team really uses AI." — weaker than the SOURCE-CONTENT "Find out where your team actually stands" plus the 44% unauthorized use stat. | `#cta` | SOURCE-CONTENT §Final CTA |
| P1-5 | **Product section secondary CTA points to `#cta`** (the demo form), not to a simulation or product demonstration. Users clicking "See a sample simulation" arrive at the contact form — wrong destination. | Product section link | AGENTS §15 |

### P2 — System Consistency

| # | Issue | Location | Rule |
|---|-------|----------|------|
| P2-1 | **Measurable Outcomes border-top.** One of the four dimension items uses `border-top: 2px solid #2E6BFF` (Risk) while the other three use `#1D1D1F`. Inconsistent and appears accidental. | Measurable Outcomes | AGENTS §6, §17 |
| P2-2 | **Shadow inconsistency.** Hero dashboard and product simulation card use `box-shadow: 0 24px 60px -30px rgba(16,24,40,.18)` and `0 24px 60px -34px rgba(16,24,40,.2)` respectively. Minor variation with no perceptible reason. | Dashboard, Simulation card | AGENTS §18 |
| P2-3 | **Nav CTA height (40px) smaller than hero CTA height (52px).** A single nav button style with `height: 40px` is fine, but the radius `border-radius: 10px` matches the hero button, creating slight visual noise. Nav button could use `border-radius: 8px` per AGENTS §16 size guidance. | Nav + Hero | AGENTS §16 |

### P3 — Polish

| # | Issue | Location | Rule |
|---|-------|----------|------|
| P3-1 | Reveal animation threshold is 12% with `rootMargin: -8%` — effective threshold is quite early; elements trigger before they're meaningfully visible on mobile. Consider `threshold: 0.08, rootMargin: 0px 0px -5% 0px`. | JS logic | AGENTS §32 |
| P3-2 | Eyebrow labels in hero and sections use `text-transform: uppercase` without evaluating whether this is appropriate per AGENTS §5 eyebrow guidance ("uppercase only when appropriate"). All eyebrows are uppercased uniformly — revisit on a case-by-case basis. | All sections | AGENTS §5 |
| P3-3 | Bar chart in Measurement section uses static `width:%` values — it is decorative and not labeled as sample data. | Measurement section | AGENTS §40 |
| P3-4 | Safety timeout `setTimeout(() => els.forEach(reveal), 1600)` will reveal elements hidden by IntersectionObserver if the observer hasn't fired in 1.6s. At 1600ms this is correct, but the value is magic-number. | JS logic | AGENTS §34 |

---

## 1. Five Design Directions — Longlist

Each direction is genuinely distinct in narrative posture, visual logic, layout structure, and buyer model. All five respect AGENTS.md constraints and SOURCE-CONTENT.md content fidelity.

---

### Direction A: Editorial Precision
**Buyer posture:** Individual manager or L&D lead. Comes from a peer recommendation or search. Needs to understand the product quickly and get in.  
**Visual logic:** White canvas, large left-aligned editorial type, product UI as the primary visual argument. The page reads like a report that happens to be selling something. Whitespace carries weight; decoration does not exist.  
**Distinguishing idea:** The product simulation IS the hero. No marketing illustration — the actual disputed-invoice simulation card is visible above the fold, at reading scale, answering "what does this actually look like" before the headline finishes. Typography is the layout system.  
**CTA posture:** Primary: "See a live case." Secondary: "Request a demo." Lower perceived friction.

---

### Direction B: Data Command Center
**Buyer posture:** VP People, CISO, Head of Revenue Operations, or procurement committee evaluating a vendor. Data-first, risk-aware, skeptical of marketing claims.  
**Visual logic:** The page opens with the evidence — KPMG 57%, McKinsey 3×, IBM $670K — as the first section after the nav. The problem is established before the product is introduced. Dashboard heavy. Dark hero treatment signals seriousness rather than trend.  
**Distinguishing idea:** Each section has an explicit "data artifact" anchor — a number, a label, a cited source. No section relies on persuasion alone. The How It Works chain is presented as a data pipeline: what goes in, what transforms, what comes out. Manager dashboard is shown first (before the simulation), because the buyer cares about the output, not the experience.  
**CTA posture:** Primary: "Schedule a briefing." No "try it now" language.

---

### Direction C: Intelligence Surface
**Buyer posture:** Head of AI, VP Engineering, CTO, or forward-thinking Chief People Officer who thinks about AI as infrastructure. Evaluating whether Itera has the right mental model, not just a useful feature.  
**Visual logic:** The page's own design demonstrates precision. Almost no decoration exists — the information architecture IS the design. Section boundaries are typographic, not color changes. The How It Works chain is rendered as a labeled directed graph (SVG/CSS), illustrating the product's intelligence about its own data flow.  
**Distinguishing idea:** Itera's category claim ("AI fluency you can measure") is treated as a hard proposition to be proven, not a tagline to be decorated. Every section provides one proof. The product UI is minimal in presentation but rich in detail — zoomed in on evaluation scores and evidence citations rather than showing full dashboards.  
**CTA posture:** Primary: "Request a demo." Secondary: none (deliberate — the page trusts its own argument).

---

### Direction D: Simulation-First Proof
**Buyer posture:** Someone who clicked "See the product" and needs to feel the product before requesting a demo.  
**Visual logic:** The hero IS the simulation interface. A scroll-triggered simulation walkthrough plays out as the user reads: the customer message appears, the AI draft renders, the three choices are presented, the evaluation score animates. The page teaches the product experience by being the product experience.  
**Distinguishing idea:** Section content is revealed sequentially through scroll, mimicking the pacing of a real simulation session. The How It Works chain is experienced, not explained — user scrolls through it like they're taking it.  
**Risk:** High implementation complexity. JavaScript-heavy scroll-sync risks performance on low-end devices. Requires careful `prefers-reduced-motion` fallback.

---

### Direction E: Blueprint Architecture
**Buyer posture:** Technical buyer, operations, engineering-adjacent L&D. Appreciates precision, distrusts marketing.  
**Visual logic:** Structural — grid lines are gently visible, type is set with explicit column logic, monospace numerals (`font-variant-numeric: tabular-nums`) throughout. The page has the feeling of a well-designed internal tool, not a startup marketing site.  
**Distinguishing idea:** Sections use a consistent two-column editorial structure: left column holds the conceptual argument (large type), right column holds the evidence or product UI. The How It Works chain is rendered as a formal table with input/output pairs for each node.  
**Risk:** The monospace accent can tip into "dev tool aesthetic" and undermine the enterprise positioning if not controlled.

---

## 2. Selection and Rationale

| Route | Direction | Category | Rationale |
|-------|-----------|----------|-----------|
| Route 1 | A — Editorial Precision | Product-Led SaaS | Best captures the self-service discovery arc. Lowest-friction CTA. Product UI as hero respects AGENTS §24–25. Editorial restraint sets Itera apart from SaaS templates. |
| Route 2 | B — Data Command Center | Enterprise | Leads with evidence, not product. Matches procurement evaluation pattern. Dashboard-first ordering speaks to the buyer's job-to-be-done. Risk-led copy is differentiated. |
| Route 3 | C — Intelligence Surface | Next-Gen AI | Most conceptually ambitious. Requires Itera to prove precision through its own design choices. Node-graph How It Works is unique without being gimmicky. Zero decoration rule forces implementation quality. |

Directions D and E are archived. D is too implementation-risky for a three-route build. E risks under-differentiating from a technical documentation site.

---

## 3. Route 1 — Product-Led SaaS (Editorial Precision)

### 3.1 Buyer and Intent Model

**Primary buyer:** Team manager or L&D lead at a mid-market B2B company (50–500 employees). Discovered Itera via a peer or search. Has 3–5 minutes. Wants to understand what the product actually does, see what it looks like, and take a low-friction next step.

**Their question:** "Is this legit, and is it for my team?"

**Page's answer:** Yes — here is the actual simulation. Here is what the judgment score looks like. Here is the dashboard. The evidence is real and cited. The next step costs you nothing.

---

### 3.2 Narrative Sequence

```
01  Nav
02  Hero: Editorial headline + live simulation card visible above fold
03  Measurable Outcomes: four dimensions, typographic, no cards
04  Problem: one strong statement, two evidence citations (57%, 3×)
05  Product: role-based simulations — simulation UI as protagonist
06  How It Works: 9-node horizontal pipeline with interactive expansion
07  Manager Dashboard: dark section, sample data labeled
08  Measurement Proof: readiness over time, evidence citation (IBM $670K)
09  Final CTA: centered, single primary button
10  Footer
```

---

### 3.3 Section Composition

#### Nav
- **Structure:** Logo left | Product · How it works · For managers (center-ish) | Log in · Request a demo (right)
- **Behavior:** Sticky. Background: `rgba(255,255,255, 0.82)` + `backdrop-filter: saturate(180%) blur(20px)`. Border-bottom: `1px solid rgba(0,0,0,0.06)`. Height: 64px.
- **Logo:** 23px tall, auto width. No wordmark duplication.
- **Nav links:** `font: 500 15px Inter; color: #171D33`. Hover: `color: #003AFF`. No underlines.
- **Log in:** text-only, same weight as nav links.
- **Request a demo:** `height: 40px; padding: 0 18px; border-radius: 8px; background: #003AFF; color: #fff; font: 600 14px Inter`. Hover: `background: #0026A8`.
- **Mobile:** hamburger at 768px. Drawer slides from right. Nav links stacked 48px touch targets.

#### Hero (Route 1 specific)
- **Layout:** Max-width container (1200px). Left-aligned editorial block (max-width: 860px) above a full-width simulation card.
- **Eyebrow:** `font: 600 12px Inter; letter-spacing: 0.08em; text-transform: uppercase; color: #003AFF; margin-bottom: 20px`
- **H1:** `font-size: clamp(52px, 5.8vw, 76px); font-weight: 600; line-height: 1.01; letter-spacing: -0.035em; color: #171D33; max-width: 820px`
- **Lead paragraph:** `font-size: clamp(19px, 1.5vw, 22px); line-height: 1.5; color: #6E6E73; max-width: 600px; margin-top: 24px`
- **CTAs:** Flex row, gap 16px, wrap. Primary: `height: 52px; padding: 0 28px; border-radius: 12px; background: #003AFF; color: #fff; font: 600 16px Inter`. Secondary (text+arrow): `height: 52px; padding: 0 10px; color: #171D33; font: 600 16px Inter`. Secondary hover: `color: #003AFF`.
- **Product visual:** The simulation card (scenario · disputed invoice, Step 2 of 4, customer message, AI draft, three choices). Rendered at 100% artifact quality. `margin-top: clamp(48px, 7vw, 72px)`. Card: `border: 1px solid rgba(0,0,0,0.08); border-radius: 24px; background: #fff; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 24px 60px -30px rgba(23,29,51,0.14)`.
- **Hero section padding:** `padding: clamp(56px, 9vw, 104px) 0 clamp(64px, 9vw, 112px)`.

#### Measurable Outcomes
- **Background:** `#F5F6FB` (Itera neutral from SOURCE-CONTENT). Border-top + border-bottom: `1px solid rgba(0,0,0,0.05)`.
- **Layout:** Opening statement (max-width: 720px) then four items in a `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` grid.
- **Opening statement:** `font: 500 clamp(20px, 2vw, 26px) Inter; line-height: 1.35; letter-spacing: -0.02em; color: #171D33`. No card container.
- **Four items:** Each has a `border-top: 2px solid #171D33` (all four — no blue accent differentiation). Title: `font: 600 20px Inter`. Body: `font: 400 15px Inter; color: #6E6E73`. No card container, no icons.
- **Exception:** "Risk" item uses `border-top: 2px solid #003AFF` — this is the only instance of brand blue as a structural accent in this section, and it must be intentional (risk is the primary commercial hook).
- **Section padding:** `clamp(56px, 7vw, 88px) clamp(20px, 5vw, 32px)`.

#### Problem
- **Background:** White.
- **Layout:** Single column, max-width 900px.
- **H2:** `font-size: clamp(38px, 4.2vw, 56px); font-weight: 600; line-height: 1.06; letter-spacing: -0.028em`. Full line 1 in `#171D33`. Line 2 ("Nobody's checking their judgment.") in `#86868B`.
- **Body:** Two paragraphs in a `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))` grid. `font-size: 17px; line-height: 1.6; color: #6E6E73`.
- **Evidence block:** Below the body grid. Two citations from SOURCE-CONTENT.md (57% non-transparent, 3× underestimate). Each citation: `font: 400 14px Inter; color: #6E6E73`. Source attribution in `#86868B`. No decorative treatment — just inline text with em-dash separator.
- **Section padding:** `clamp(96px, 14vw, 160px) 0`.

#### Product / Simulations
- **Background:** `#F5F6FB`. Border-top: `1px solid rgba(0,0,0,0.05)`.
- **Layout:** Flex row. Left: text block (flex: 1 1 400px). Right: simulation card (flex: 1 1 400px). Gap: `clamp(40px, 5vw, 80px)`. Wrap at 768px.
- **Eyebrow:** `font: 600 12px Inter; letter-spacing: 0.08em; text-transform: uppercase; color: #003AFF`.
- **H2:** `font-size: clamp(34px, 3.6vw, 48px); max-width: 520px`.
- **Body:** `font-size: 18px; line-height: 1.55; color: #6E6E73; max-width: 520px`.
- **Secondary CTA:** "See a live case →" — links to `/demo` (correct destination per SOURCE-CONTENT.md). `color: #003AFF; font: 600 16px Inter`.
- **Simulation card:** full render of disputed-invoice scenario. Labeled step indicator. Choices rendered as interactive-looking but static buttons. Evaluation bars below.

#### How It Works (Protagonist Visualization)
*(Full specification in §3.5 below)*

#### Manager Dashboard
- **Background:** `#0B0B0F`. Color: `#ffffff`.
- **Eyebrow:** `color: #7FA6FF` (blue tinted for dark bg, readable at WCAG AA — verify contrast ≥ 4.5:1 against `#0B0B0F`).
- **H2:** `color: #fff; font-size: clamp(36px, 4vw, 56px)`.
- **Lead:** `color: #A1A1AA`.
- **Dashboard card:** `background: #16161C; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px`.
- **"Sample data" label:** Required by SOURCE-CONTENT.md. Render as: `font: 500 12px Inter; color: #6B6B80; letter-spacing: 0.04em` adjacent to the dashboard header or as a subtle top-right label inside the card header.
- **Metrics:** 64 / 6/8 / 11 — at `font-size: clamp(64px, 8vw, 88px)`. "11 open risk events" uses `color: #7FA6FF`.
- **Team bars:** Marketing 64%, Support 78%, Sales 49%, Operations 57%. Bar: `height: 8px; border-radius: 999px; background: #003AFF`.
- **CTA:** "See the dashboard in a demo" — `color: #7FA6FF; font: 600 15px Inter`. Arrow →.

#### Measurement / Proof
- **Background:** White.
- **Layout:** Flex row, reversed at mobile (`flex-wrap: wrap-reverse`). Left: bar chart card. Right: text block.
- **Chart:** Six months Jan–Jun. Bars: `background: #003AFF` at varying opacity (0.22 → 0.28 → 0.40 → 0.55 → 0.75 → 1.0). All labeled "Sample data" beneath chart title.
- **IBM evidence citation:** "Organizations with high shadow-AI use averaged $670K more in breach costs — IBM, Cost of a Data Breach Report 2025." Rendered below the text block, `font: 400 14px Inter; color: #6E6E73`. Full attribution in `#86868B`.

#### Final CTA
- **Background:** `#F5F6FB`. Border-top: `1px solid rgba(0,0,0,0.05)`.
- **Layout:** Centered column, max-width 760px.
- **H2:** `font-size: clamp(38px, 4.4vw, 60px); letter-spacing: -0.03em`. Exact copy from SOURCE-CONTENT: "Find out where your team actually stands."
- **Body:** SOURCE-CONTENT body + evidence (44% unauthorized use stat). `font-size: clamp(18px, 1.5vw, 21px); color: #6E6E73`.
- **CTAs:** "Request a demo" primary (href `#demo`). "Start with my team" secondary (text link, `color: #171D33`, hover `color: #003AFF`).
- **Price:** "$149 USD per seat / month, less at volume · cancel anytime" — `font: 400 13px Inter; color: #86868B; margin-top: 24px`. Required because production page shows it.

#### Footer
- **Logo + tagline.** Two link columns: Product (How it works, Cases, For managers) + Legal (Privacy, Terms). Contact: `mailto:hola@itera.la`. No invented links.
- **Copyright:** "© 2026 Itera. All rights reserved. AI fluency, measured."

---

### 3.4 Typography Tokens (Route 1)

```css
:root {
  --font-sans: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --container-max: 1200px;
  --container-px: clamp(20px, 5vw, 32px);

  /* Brand */
  --brand-primary: #003AFF;
  --brand-pressed: #0026A8;
  --brand-soft: rgba(0,58,255,0.08);

  /* Neutrals — Itera production spec */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F5F6FB;
  --bg-tertiary: #FAFBFD;
  --ink-primary: #171D33;
  --ink-secondary: #6E6E73;
  --ink-tertiary: #86868B;
  --border-subtle: rgba(0,0,0,0.08);
  --border-strong: rgba(0,0,0,0.14);

  /* Dark section */
  --dark-bg: #0B0B0F;
  --dark-surface: #16161C;
  --dark-text-primary: #FFFFFF;
  --dark-text-secondary: #A1A1AA;
  --dark-brand-tint: #7FA6FF;
  --dark-border: rgba(255,255,255,0.10);

  /* Type scale */
  --t-hero: clamp(52px, 5.8vw, 76px);
  --t-h2: clamp(40px, 4vw, 56px);
  --t-h3: 24px;
  --t-lead: clamp(19px, 1.5vw, 22px);
  --t-body: 17px;
  --t-small: 14px;
  --t-eyebrow: 12px;

  /* Spacing */
  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px;
  --space-16: 64px; --space-20: 80px; --space-24: 96px;
  --space-section: clamp(96px, 13vw, 144px);
  --space-section-lg: clamp(112px, 14vw, 160px);

  /* Radius */
  --r-sm: 8px;
  --r-md: 12px;
  --r-lg: 16px;
  --r-xl: 24px;
  --r-pill: 999px;
}
```

---

### 3.5 How It Works — Protagonist Visualization (Route 1)

**Concept:** Horizontal node pipeline. The 9-node chain runs left-to-right as a connected flow at the top. Below, a scroll-synced detail panel expands the active node into a UI snippet or data label.

#### HTML Structure

```html
<section id="how" class="hiw-section">
  <div class="hiw-container">
    <h2 class="hiw-heading">From first assessment to measurable AI adoption.</h2>

    <!-- Pipeline track -->
    <div class="hiw-track" role="list">
      <button class="hiw-node hiw-node--active" data-node="0" role="listitem">
        <span class="hiw-node-label">Company</span>
      </button>
      <span class="hiw-connector" aria-hidden="true"></span>
      <!-- ... repeat for all 9 nodes -->
    </div>

    <!-- Detail panels, one per node -->
    <div class="hiw-panels">
      <div class="hiw-panel hiw-panel--active" data-panel="0">
        <p class="hiw-step-num">01</p>
        <h3>Your company, your roles.</h3>
        <p>Itera is configured for your org structure. Simulations adapt by function — sales, marketing, finance, operations — so every person runs scenarios from their own work.</p>
      </div>
      <!-- panels 1–8 -->
    </div>
  </div>
</section>
```

#### Node content (exact copy for Codex)

| Index | Label | Step | H3 | Detail (≤30 words) |
|-------|-------|------|----|-------------------|
| 0 | Company | 01 | Your company, your roles. | Itera is scoped to your org structure. Simulations adapt by function — every person runs scenarios from their actual work. |
| 1 | Roles | 02 | Sales. Marketing. Finance. Operations. | Each role receives a distinct simulation built on real artifacts from that function. No generic content. |
| 2 | AI Simulations | 03 | Fifteen minutes. A real decision at the end. | Your team works through a short scenario. They choose what to hand off, what to verify, what to push back on. |
| 3 | Evaluation | 04 | Six dimensions of judgment, scored. | Every choice is scored across judgment, accuracy, adoption, performance, risk control, and transparency. Evidence cited for each. |
| 4 | Adoption Data | 05 | Where AI is used — and where it's avoided. | Itera records how each person actually engages AI in the task, surfacing both over-reliance and avoidance. |
| 5 | Skill Gaps | 06 | The gap is specific, not general. | Not "needs improvement" — the exact decision pattern that broke. The prompt that was accepted without verification. |
| 6 | Personalized Learning | 07 | Practice on the exact weakness surfaced. | Five minutes a day, assigned to each person's specific gap. Not a generic curriculum. Streaks and team goals sustain the habit. |
| 7 | Manager Dashboard | 08 | One view of who's ready and who isn't. | Readiness per person, risk events with citations, targeted practice with one-click assignment. Download as PDF. |
| 8 | Measurable AI Adoption | 09 | Readiness you can defend. | Over weeks and months, the dashboard shows where readiness climbed, where risks resolved, and what changed. |

#### CSS Layout

```css
.hiw-section {
  padding: var(--space-section) 0;
  background: var(--bg-primary);
}

.hiw-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-px);
}

.hiw-heading {
  font-size: var(--t-h2);
  font-weight: 600;
  letter-spacing: -0.026em;
  line-height: 1.07;
  color: var(--ink-primary);
  max-width: 760px;
  margin: 0 0 clamp(48px, 6vw, 72px);
}

.hiw-track {
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 4px;
}
.hiw-track::-webkit-scrollbar { display: none; }

.hiw-node {
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-md);
  background: var(--bg-primary);
  cursor: pointer;
  transition: background 220ms ease, border-color 220ms ease;
}
.hiw-node:hover {
  background: var(--bg-secondary);
  border-color: var(--border-strong);
}
.hiw-node--active {
  background: var(--ink-primary);
  border-color: var(--ink-primary);
}
.hiw-node--active .hiw-node-label { color: #fff; }

.hiw-node-label {
  font: 600 13px var(--font-sans);
  color: var(--ink-primary);
  white-space: nowrap;
}

.hiw-connector {
  flex: 1 0 16px;
  height: 1px;
  background: var(--border-subtle);
  min-width: 16px;
  max-width: 48px;
}

.hiw-panels {
  margin-top: clamp(40px, 5vw, 56px);
  min-height: 180px;
}

.hiw-panel { display: none; }
.hiw-panel--active { display: block; }

.hiw-step-num {
  font: 600 13px var(--font-sans);
  color: var(--brand-primary);
  letter-spacing: 0.04em;
  margin: 0 0 16px;
}

.hiw-panel h3 {
  font: 600 28px var(--font-sans);
  letter-spacing: -0.015em;
  color: var(--ink-primary);
  margin: 0 0 12px;
}

.hiw-panel p {
  font: 400 17px var(--font-sans);
  line-height: 1.6;
  color: var(--ink-secondary);
  max-width: 560px;
  margin: 0;
}

/* Mobile: collapse to vertical numbered list */
@media (max-width: 767px) {
  .hiw-track { display: none; }
  .hiw-panels {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  .hiw-panel { display: block !important; }
}
```

#### Interaction (JS)

```js
// Node click activates panel
document.querySelectorAll('.hiw-node').forEach((btn, i) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.hiw-node').forEach(n => n.classList.remove('hiw-node--active'));
    document.querySelectorAll('.hiw-panel').forEach(p => p.classList.remove('hiw-panel--active'));
    btn.classList.add('hiw-node--active');
    document.querySelector(`[data-panel="${i}"]`).classList.add('hiw-panel--active');
  });
});
```

No scroll-hijack. No animation required for panel switch (cross-fade optional: `opacity 180ms ease`). `prefers-reduced-motion`: no transition on panel change.

---

### 3.6 Motion Behavior (Route 1)

- **Entrance:** IntersectionObserver fade + translateY(20px → 0). Duration 600–700ms. Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (gentle deceleration). Threshold: `0.08`. rootMargin: `0px 0px -5% 0px`.
- **Stagger:** Sibling elements within a grid stagger at 60ms intervals (not more than 3 staggered items per section to avoid visible delay on long sections).
- **Hover states:** CTA buttons: `background` transition 200ms ease. Nav links: `color` 150ms ease. Node buttons: 220ms ease.
- **Number transitions:** None. Static large numbers (64, 6/8, 11) — do not animate counting.
- **`prefers-reduced-motion`:** All `transition` and `animation` removed. IntersectionObserver reveals elements immediately (`opacity: 1; transform: none`).
- **Safety timeout:** `setTimeout(() => allRevealEls.forEach(reveal), 1800)` — 1800ms, not 1600ms (more margin for slow mobile paints).
- **What NOT to do:** No floating elements, no parallax, no looping background motion, no spring/bounce on CTAs.

---

### 3.7 Responsive Transformation (Route 1)

| Breakpoint | Key changes |
|------------|------------|
| 1440px | Full layout as specified. |
| 1280px | Container padding compresses. Type scale clamp in mid-range. |
| 1024px | Product section wraps (editorial + simulation card stack). Dashboard metrics grid collapses to 2 columns. |
| 768px | Nav collapses to hamburger drawer. Hero CTAs wrap. How It Works track hidden, vertical panel list shown. Footer columns stack. |
| 430px | Hero H1 renders at ~52px. Lead at 19px. Section padding at lower clamp bound. Simulation card full-width, inner padding 20px. Dark dashboard metrics stack to single column. |
| 375px | Body copy holds 16px minimum. No horizontal overflow. CTA buttons full-width if flex-wrap triggers overflow otherwise. |

Dashboard product visual on mobile: never smaller than 280px wide. Reduce internal padding proportionally rather than shrinking the UI. Never hide it.

---

### 3.8 CTA Behavior (Route 1)

**Primary CTA ("Request a demo"):**
- Default: `background: #003AFF; color: #fff`
- Hover: `background: #0026A8`
- Active (pressed): `background: #001F8A; transform: scale(0.98)` — subtle press
- Focus-visible: `outline: 2px solid #003AFF; outline-offset: 3px; border-radius: 12px`
- Disabled: `background: rgba(0,58,255,0.4); color: rgba(255,255,255,0.7); pointer-events: none` (only if form loading)

**Secondary CTA ("See the product →"):**
- Default: `color: #171D33`
- Hover: `color: #003AFF`
- Active: `color: #0026A8`
- Focus-visible: `outline: 2px solid #003AFF; outline-offset: 2px; border-radius: 4px`
- Arrow character: `→` (U+2192), not an SVG icon, not `>`.

**Nav CTA ("Request a demo"):**
- Same color logic as primary, smaller sizing (`height: 40px; border-radius: 8px; font: 600 14px`).

**No duplicate primary CTAs** side-by-side at equal visual weight.

**One primary CTA per section.** Hero → "Request a demo". Product section → "See a live case" (secondary weight). Dashboard → "See the dashboard in a demo" (secondary weight). Final CTA → "Request a demo".

---

### 3.9 Accessibility and Performance Risks (Route 1)

**Accessibility:**
- `#7FA6FF` on `#0B0B0F` (dark section eyebrow): verify ≥ 4.5:1. Computed ratio: approximately 4.7:1 — acceptable, but test on calibrated display.
- `#A1A1AA` on `#0B0B0F` (dark section body): verify ≥ 4.5:1. Computed ratio: approximately 5.9:1 — passes.
- `#86868B` on white (tertiary text): 3.9:1 — fails AA for body text. Use only for metadata (timestamps, labels), not reading-weight copy.
- All interactive elements require `focus-visible` ring. Do not remove outlines.
- Simulation card choices ("Send as-is", "Verify the charge first", "Escalate") are decorative, not interactive — do not use `<button>` elements; use `<span>` with `aria-hidden="true"` or wrap the card in `role="img" aria-label="Simulation: disputed invoice scenario"`.
- Nav hamburger must have `aria-label="Open navigation"` and `aria-expanded` state.
- How It Works nodes must be `<button>` elements with readable `aria-label="Step 1: Company"`.
- Images require meaningful `alt`. Logo: `alt="Itera"`. Decorative: `alt=""` + `role="presentation"`.

**Performance:**
- Inter is loaded via Google Fonts preconnect + WOFF2. Load only weights 400, 500, 600 (not 700 — AGENTS §4 prefers restraint, and 700 is not used in the type scale except for metric numerals which Inter 600 handles adequately). Saving one weight = ~15KB.
- Product UI cards are HTML/CSS composites — no raster screenshots. No image optimization risk from them. If real screenshots are added later, require AVIF/WebP at 2× for retina.
- Dashboard bar chart is pure CSS — zero JS cost.
- No animation library. All motion is CSS transitions + a single small JS IntersectionObserver class.
- Bundled HTML approach: the existing bundler is acceptable; avoid embedding large base64 PNGs inside the template string.

---

### 3.10 What Must NOT Be Copied from Inspirations (Route 1)

| Inspiration | Do not copy |
|------------|-------------|
| **Linear** | Horizontal scrolling feature showcase with full-bleed section transitions; dark gradient hero with colored keyword highlights; changelog-feed pattern |
| **Vercel** | Deploy-button CTA mechanic; CLI terminal code block as hero product visual; gradient mesh / blob background |
| **Attio** | CRM record card constellation as hero; database/spreadsheet grid product UI aesthetic |
| **Stripe** | Rainbow gradient hero background; tabbed API code samples as primary product proof; icon-per-feature grid sections |
| **Ramp** | Animated savings counter; spend management table format; physical card product imagery |
| **Framer** | Dark hero with glowing motion/component library showcase; sticker and badge decoration constellation; canvas-drag mechanic |
| **Godly** | Award-badge overlay on hero; extreme scroll-hijack portfolio navigation; SITE OF THE DAY typography treatments |
| **Awwwards** | Nominee badge patterns; extreme experimental type; cursor-follow decoration |
| **SaaSFrame** | "Trusted by X companies" logo wall (no invented logos); comparison table with competitor column |

**General:** No purple-blue AI gradients. No neon mesh. No glassmorphism panels stacked over background imagery. No floating badge cards above the hero headline.

---

### 3.11 Acceptance Criteria (Route 1 — Product-Led SaaS)

- [ ] Brand blue is `#003AFF`. No instance of `#2E6BFF` remains.
- [ ] The floating HERO switcher widget is removed from the deliverable.
- [ ] The How It Works section renders all 9 nodes in the correct chain order with correct label text.
- [ ] Clicking/tapping each node reveals its corresponding detail panel without page reload or scroll-jump.
- [ ] On mobile (≤767px), the node track is hidden and all 9 panels are displayed as a vertical numbered list.
- [ ] "Sample data" is visible adjacent to the Manager Dashboard card.
- [ ] The three evidence statistics (KPMG 57%, McKinsey 3×, IBM $670K) appear with attribution in the document.
- [ ] No invented footer links. Only links from SOURCE-CONTENT.md §Navigation are used.
- [ ] Final CTA headline reads "Find out where your team actually stands."
- [ ] "See a live case →" links to `/demo`, not to `#cta` or the contact form.
- [ ] `prefers-reduced-motion`: all animations are disabled; elements appear visible immediately.
- [ ] No horizontal overflow at 375px viewport width.
- [ ] Hero H1 renders at ≥ 52px on a 375px viewport (lower clamp bound).
- [ ] All interactive elements have visible focus-visible states.
- [ ] Simulation card choices are not interactive `<button>` elements.
- [ ] `#7FA6FF` on `#0B0B0F` passes WCAG AA contrast (≥ 4.5:1).
- [ ] Inter font loads only weights 400, 500, 600.
- [ ] Page renders correctly at 375, 430, 768, 1024, 1280, 1440px.

---

## 4. Route 2 — Enterprise (Data Command Center)

### 4.1 Buyer and Intent Model

**Primary buyer:** VP People, VP Revenue Operations, CISO, or procurement lead at a 200–5000 employee company. Evaluating Itera as a vendor alongside 2–3 alternatives. Risk-aware, skeptical of marketing, needs board-defensible data.

**Their questions:** "What is the actual risk exposure? How does this scale? What does the data look like? Who owns the relationship?"

**Page's answer:** The risk is already in your org (here are three cited reports). Itera surfaces it before it costs you. The data is structured, defensible, and exportable. The next step is a proper briefing, not a self-serve signup.

---

### 4.2 Narrative Sequence

```
01  Nav (same structure, "Schedule a briefing" replaces "Request a demo")
02  Hero: Risk-led headline, evidence stats front-loaded, dashboard visual
03  Evidence: Three statistics (KPMG, McKinsey, IBM) as full-width evidence block
04  Problem: Executive framing — cost of inaction, not product features
05  How It Works: Vertical data pipeline with input/output artifacts per node
06  Manager Dashboard: Dark section, prominent, sample data labeled
07  Product / Simulations: Simulation UI after the dashboard (buyer cares about output first)
08  Proof Format: Four product guarantees (15 min, 6 dimensions, ~6 min/practice, new content as AI ships)
09  Final CTA: "Schedule a 30-minute briefing" — formal framing
10  Footer
```

Note: Product/Simulations appears after the dashboard in Route 2. Enterprise buyers are output-oriented; they want to see the reporting before they care about the assessment experience.

---

### 4.3 Section Composition

#### Hero (Route 2)
- **Layout:** Centered column (max-width: 820px) above full-width dashboard card. Background: white.
- **Eyebrow:** "AI RISK MANAGEMENT" — not "AI fluency you can measure." This reframes the product for a risk-aware buyer without changing the product claim.
- **H1:** "Know who on your team makes good calls with AI." — same headline, different framing context established by eyebrow and below.
- **Lead:** SOURCE-CONTENT hero body, unchanged.
- **CTAs:** Primary "Schedule a briefing" (links to `#demo`). No secondary CTA in the hero — the page earns trust before offering a low-friction path.
- **Product visual:** Full team readiness dashboard (not the simulation card) — enterprise buyers want to see what they're getting access to, not the employee experience.

#### Evidence Block
- **Background:** `#171D33` (deep Itera ink).
- **Layout:** Three statistics in a grid. `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`.
- **Each stat:** Large number (`font-size: clamp(48px, 5vw, 64px); font-weight: 600; color: #fff`). Label below in `color: #A1A1AA`. Source citation in `color: #6B6B80; font-size: 13px`.
- **Content (verbatim from SOURCE-CONTENT):**
  - 57% — "of employees report using AI non-transparently at work" — KPMG & University of Melbourne, Trust in AI 2025 · 48,000 workers, 47 countries
  - 3× — "Leaders underestimate how much AI their teams actually use, by about 3×" — McKinsey, Superagency in the Workplace, 2025
  - $670K — "Organizations with high shadow-AI use averaged $670K more in breach costs" — IBM, Cost of a Data Breach Report 2025
- **Dividers:** Subtle vertical lines between stats on desktop (`border-right: 1px solid rgba(255,255,255,0.1)`).
- **Section padding:** `clamp(80px, 10vw, 120px) clamp(20px, 5vw, 32px)`.

#### Problem (Enterprise framing)
- **Background:** White.
- **H2:** "Your team already uses AI. Nobody's checking their judgment." — same copy.
- **Body:** "Prompting is the part everyone teaches. The harder part is choosing what to hand over in the first place, and judging what comes back. That's what we measure." — verbatim SOURCE-CONTENT.
- **Framing addition:** Below body, a single statement: "Without measurement, risk events are invisible until they reach a customer, a regulator, or an incident report." This is a design direction note — copy must be approved; do not invent metrics or client incidents.

#### How It Works (Protagonist Visualization — Route 2)
*(Full specification in §4.5 below)*

#### Proof Format
- **Layout:** Four items in a 2×2 grid or single-column list. No cards.
- **Content (verbatim from SOURCE-CONTENT):**
  - "15 min per assessment · one real case"
  - "6 dimensions of judgment, scored with cited evidence"
  - "~6 min per practice · fits in the workday"
  - "New practice ships as AI ships"
- **Typography:** Each line: `font: 600 20px Inter; color: #171D33`. Sub-text: `font: 400 15px Inter; color: #6E6E73`.
- **Border-top:** `2px solid #171D33` on each item.

---

### 4.4 Typography Tokens (Route 2)

Identical to Route 1 tokens with the following additions/changes:

```css
:root {
  /* Route 2 additions */
  --dark-hero-bg: #171D33;    /* Evidence block background */
  --t-stat: clamp(48px, 5vw, 64px); /* Evidence statistics */
}
```

---

### 4.5 How It Works — Protagonist Visualization (Route 2)

**Concept:** Vertical data pipeline. Each of the 9 nodes is a row. Left column: node name + step number. Center: one-sentence description. Right: the data artifact this stage produces. Visual language: structured, table-adjacent, but using typographic rows not HTML tables (for flexibility).

#### HTML Structure

```html
<section id="how" class="hiw2-section">
  <div class="hiw2-container">
    <p class="hiw2-eyebrow">How it works</p>
    <h2 class="hiw2-heading">A continuous loop from first assessment to measurable adoption.</h2>
    <div class="hiw2-pipeline" role="list">
      <!-- Node row -->
      <div class="hiw2-row" role="listitem">
        <div class="hiw2-row-left">
          <span class="hiw2-step">01</span>
          <span class="hiw2-label">Company</span>
        </div>
        <p class="hiw2-desc">Itera is scoped to your org structure. Simulations are configured by function before the first assessment runs.</p>
        <div class="hiw2-artifact">
          <span class="hiw2-artifact-label">Output</span>
          <span class="hiw2-artifact-value">Role matrix</span>
        </div>
      </div>
      <!-- ... 8 more rows -->
    </div>
  </div>
</section>
```

#### Row content for Codex

| Step | Label | Description (≤25 words) | Artifact output |
|------|-------|------------------------|----------------|
| 01 | Company | Itera is scoped to your org. Simulations are configured by function before the first assessment runs. | Role matrix |
| 02 | Roles | Sales, marketing, finance, operations — each role runs a distinct scenario built on real artifacts from that function. | Role assignment |
| 03 | AI Simulations | Each person works a 15-minute case from their actual role. Choices are recorded throughout, not just at the end. | Session data |
| 04 | Evaluation | Six dimensions scored per session: judgment, accuracy, adoption, performance, risk control, transparency. Evidence cited per score. | Score report |
| 05 | Adoption Data | Where AI was engaged and where it was avoided — recorded at the decision level, not self-reported. | Adoption profile |
| 06 | Skill Gaps | The specific decision patterns that produced low scores. Precise enough to assign targeted practice. | Gap report |
| 07 | Personalized Learning | Each person receives practice matched to their gap. Five minutes a day, not a curriculum. | Practice queue |
| 08 | Manager Dashboard | Readiness per person, risk events with citations, one-click practice assignment. PDF export. | Dashboard + PDF |
| 09 | Measurable AI Adoption | Readiness tracked over time. Risk trends visible. Evidence for leadership reporting. | Trend report |

#### CSS Layout

```css
.hiw2-section {
  padding: var(--space-section) 0;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-subtle);
}

.hiw2-pipeline {
  margin-top: clamp(48px, 6vw, 72px);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.hiw2-row {
  display: grid;
  grid-template-columns: 200px 1fr 160px;
  gap: 24px;
  align-items: start;
  padding: 24px 0;
  border-top: 1px solid var(--border-subtle);
}

.hiw2-row:last-child {
  border-bottom: 1px solid var(--border-subtle);
}

.hiw2-row-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hiw2-step {
  font: 600 12px var(--font-sans);
  color: var(--brand-primary);
  letter-spacing: 0.06em;
}

.hiw2-label {
  font: 600 18px var(--font-sans);
  color: var(--ink-primary);
  letter-spacing: -0.01em;
}

.hiw2-desc {
  font: 400 15px var(--font-sans);
  line-height: 1.6;
  color: var(--ink-secondary);
  margin: 4px 0 0;
}

.hiw2-artifact {
  text-align: right;
  padding-top: 4px;
}

.hiw2-artifact-label {
  display: block;
  font: 600 11px var(--font-sans);
  letter-spacing: 0.05em;
  color: var(--ink-tertiary);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.hiw2-artifact-value {
  font: 600 14px var(--font-sans);
  color: var(--ink-primary);
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-sm);
  padding: 6px 12px;
  display: inline-block;
}

/* Highlight the Manager Dashboard and Measurable AI Adoption rows */
.hiw2-row--highlight .hiw2-label { color: var(--brand-primary); }
.hiw2-row--highlight .hiw2-artifact-value {
  background: var(--brand-soft);
  border-color: rgba(0,58,255,0.2);
  color: var(--brand-primary);
}

/* Mobile */
@media (max-width: 767px) {
  .hiw2-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .hiw2-artifact { text-align: left; }
}
```

No JS required. Fully static. `data-reveal` entrance animation applied to each row with 40ms stagger.

---

### 4.6 Motion Behavior (Route 2)

More restrained than Route 1. Enterprise buyers are skeptical of polish-theater.

- **Entrance:** Same IntersectionObserver fade/translate. Duration 500ms (slightly faster). Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Pipeline rows:** Stagger 40ms per row (not 60ms — 9 rows × 60ms = 540ms total delay visible, too slow).
- **Evidence statistics:** No counter animation. Numbers are static — the claim is the cited source, not the animation.
- **Hover states:** CTA 200ms. No other motion.
- **Dark evidence section:** No entrance animation — it should feel immediate and authoritative.

---

### 4.7 Responsive Transformation (Route 2)

| Breakpoint | Key changes |
|------------|------------|
| 1280px+ | Full 3-column pipeline grid. Full evidence block. |
| 1024px | Pipeline grid: `grid-template-columns: 160px 1fr 140px`. |
| 768px | Pipeline collapses to single column per row. Artifact tag left-aligned. Evidence block: single column. |
| 430px | Evidence stats: single column, number + label + citation per block. Pipeline rows full-width. |
| 375px | Same as 430px, font sizes at lower clamp bounds. |

---

### 4.8 CTA Behavior (Route 2)

**Primary CTA ("Schedule a briefing"):** Same color/state logic as Route 1. Label change only.

**No secondary CTAs in hero.** A single primary CTA per major section. The page must not feel like it's rushing the buyer.

**Final CTA section copy (verbatim SOURCE-CONTENT):** "Book a 20-minute demo. We play a real case, show you the report it produces, and you leave knowing what we would measure on your team." Retain exact phrasing.

---

### 4.9 Accessibility and Performance Risks (Route 2)

**Accessibility:**
- Dark evidence block (`#171D33` bg): `#A1A1AA` body text: ~6:1 ratio — passes. `#6B6B80` citation text: ~3.4:1 — **fails AA for normal text**. Use `#8A8A9A` minimum for citations (approximately 4.5:1 on `#171D33`). Test before implementing.
- Pipeline artifact tags (`#003AFF` text on `rgba(0,58,255,0.08)` background): very low contrast (~1.4:1). Use `#003AFF` text on `#fff` background with a border instead.
- PDF export mention ("Download the report as a PDF") must not imply a real interactive element in the static HTML. Mark as static description.

**Performance:**
- Dark hero section background (`#171D33`) is a CSS background-color — zero performance cost.
- Evidence block has no images or heavy assets.
- If team bar chart sparklines are added later, SVG is preferred over Canvas.

---

### 4.10 What Must NOT Be Copied from Inspirations (Route 2)

| Inspiration | Do not copy |
|------------|-------------|
| **Ramp** | Animated spend savings counter; visual "savings X amount" CTA framing; physical card imagery |
| **Stripe** | Three-column API-surface hero with code tabs; gradient mesh; "built for developers" framing |
| **Linear** | Feature-per-section horizontal scroll; "move fast" positioning; keyboard shortcut callouts |
| **Vercel** | Deployment status indicator as hero; dark gradient blob background; infrastructure cost framing |
| **Attio** | CRM-style record card UI; "relationship intelligence" category language |
| **Framer** | Motion component showcase; dark background with glowing components; no-code framing |

---

### 4.11 Acceptance Criteria (Route 2 — Enterprise)

- [ ] Brand blue is `#003AFF`. No instance of `#2E6BFF` remains.
- [ ] Primary CTA label is "Schedule a briefing" (or "Book a briefing"), not "Request a demo," in the hero.
- [ ] Evidence block renders all three statistics with verbatim source attributions from SOURCE-CONTENT.md.
- [ ] Evidence block background uses a dark Itera neutral (`#171D33`), not a generic black or purple.
- [ ] How It Works section renders all 9 rows with correct labels, descriptions, and artifact outputs.
- [ ] Rows 08 (Manager Dashboard) and 09 (Measurable AI Adoption) have a visual distinction (brand-primary label color).
- [ ] Pipeline collapses to single-column per row on ≤767px without horizontal overflow.
- [ ] Artifact value tag (`border-radius: 8px; background: white; border: 1px solid...`) has sufficient text contrast — `#003AFF` on white is 8.6:1, passes.
- [ ] Manager Dashboard section: "Sample data" label is visible inside or adjacent to the card header.
- [ ] Product/Simulations section appears after the Manager Dashboard in document order.
- [ ] No invented client names, logos, testimonials, or integration names appear anywhere.
- [ ] Final CTA section includes the 44% unauthorized use stat from SOURCE-CONTENT.md.
- [ ] Footer contains only real destinations from SOURCE-CONTENT.md §Navigation.
- [ ] Dark section (`#171D33` bg) body text passes WCAG AA (≥ 4.5:1). Citation text passes (minimum `#8A8A9A`).
- [ ] `prefers-reduced-motion`: all transitions disabled, pipeline rows appear immediately.
- [ ] No horizontal overflow at 375px.
- [ ] Page renders correctly at 375, 430, 768, 1024, 1280, 1440px.

---

## 5. Route 3 — Next-Gen AI (Intelligence Surface)

### 5.1 Buyer and Intent Model

**Primary buyer:** Head of AI, Chief AI Officer, VP Engineering or forward-thinking Chief People Officer at a company that has already deployed AI tools and is now confronting the question: "How do we know if people are using this well?"

**Their question:** "Does Itera understand the actual problem? Does the product match the precision of the problem statement?"

**Page's answer:** The design itself demonstrates precision. The category claim is treated as a hypothesis to be proven, not a tagline. The product UI is shown at evidence-grade zoom, not marketing-grade distance.

**Positioning note:** Not "next-gen" in a crypto/Web3 sense. Intelligence Surface means: the page's information architecture IS the product proof. The designer's restraint signals that Itera trusts the substance over the show.

---

### 5.2 Narrative Sequence

```
01  Nav (minimal — logo + two links + CTA)
02  Hero: Dark first half. Category statement. One sentence of proof. No sub-headline.
03  Product Truth: Transition to white. Four dimensions. Typographic, no cards, no icons.
04  Problem: One heading. Two paragraphs. Two evidence citations. No decoration.
05  How It Works: Node graph (SVG + CSS). The full 9-node chain visualized as a directed graph.
06  Simulation Detail: Zoomed-in evaluation score card. One scenario. All 6 dimensions.
07  Manager Dashboard: The dashboard without framing copy — just the artifact.
08  Final CTA: Minimal. One heading. One sentence. One button.
09  Footer: 3-column max.
```

The dashboard section has intentionally minimal framing copy in Route 3 — the data speaks. A single eyebrow ("For managers") and the dashboard are sufficient. No marketing paragraph is needed if the product is trusted to make the argument.

---

### 5.3 Section Composition

#### Nav (Route 3)
- **Streamlined:** Logo + "How it works" + "For managers" (two links only). Log in (text). Request a demo (button).
- No "Product" top-level link — Route 3 buyer navigates the page, not nav categories.
- Nav background: `rgba(255,255,255,0.9)` when scrolled over white. `rgba(11,11,15,0.9)` when scrolled over the dark hero. JS toggles a class based on `scrollY < heroHeight`.

#### Hero (Route 3)
- **Background:** `#0B0B0F`. Full-width. Transitions to `#FFFFFF` with a sharp horizontal line at the section boundary (no gradient blend — the cut IS the design statement).
- **Layout:** Centered column. Max-width: 760px. Generous top padding: `clamp(120px, 16vw, 180px)`.
- **Eyebrow:** Absent in hero. The category is stated directly by the H1.
- **H1:** "AI fluency you can measure." — verbatim. `font-size: clamp(48px, 5.5vw, 72px); font-weight: 600; line-height: 1.03; letter-spacing: -0.033em; color: #FFFFFF`. Max-width 660px.
- **Sub-statement:** "Your team already uses AI at work. Itera measures how well they judge what it gives them — and where the gaps are." — one sentence, restrained. `font: 400 20px Inter; line-height: 1.5; color: #A1A1AA; max-width: 580px; margin-top: 22px`. No second paragraph.
- **CTA:** Single primary only. `height: 52px; padding: 0 28px; border-radius: 12px; background: #003AFF; color: #fff; font: 600 16px Inter; margin-top: 36px`. Hover: `background: #0026A8`. No secondary CTA in hero.
- **No product visual in hero.** The transition to white IS the product visual moment — simplicity as the proof.

#### Product Truth (Four Dimensions)
- **Background:** White. No top border. The contrast from dark → white is the section separator.
- **Layout:** Single-column. Opening: one sentence (max-width 640px). Then four items in a 4-column `grid-template-columns: repeat(4, 1fr)` on desktop; 2-column on tablet; 1-column on mobile.
- **Opening statement:** "Itera measures four dimensions of how people actually work with AI — not whether they finished a course." `font: 500 22px Inter; line-height: 1.4; letter-spacing: -0.02em; color: #171D33; margin-bottom: clamp(48px, 6vw, 64px)`.
- **Dimension items:** `border-top: 2px solid #171D33`. Risk item: `border-top: 2px solid #003AFF`. Title: `font: 600 18px Inter`. Body: `font: 400 15px Inter; color: #6E6E73`. No container, no icon.
- **Section padding:** `clamp(80px, 11vw, 128px) clamp(20px, 5vw, 32px)`.

#### Problem
- **Background:** White.
- **H2:** Same as other routes. Second line in `#86868B`.
- **Body:** Two paragraphs left-aligned. No grid.
- **Evidence:** The 57% and 3× stats rendered inline: "57% of employees report using AI non-transparently at work (KPMG & University of Melbourne, Trust in AI 2025, 48,000 workers, 47 countries). Leaders underestimate how much AI their teams use by about 3× (McKinsey, Superagency in the Workplace, 2025)."
- **No decorative treatment.** Evidence is inline text, not cards or large numbers.

#### Simulation Detail (Route 3 specific)
- **Background:** `#FAFBFD`.
- **Purpose:** Show the evaluation score card at a scale that makes it legible and credible.
- **Layout:** Split. Left: one short text block (max-width 400px). Right: a single evaluation-score panel (not a full simulation card).
- **Score panel:** Shows the six dimensions with bar + score for one completed scenario. Title: "Disputed invoice · Evaluation" in `font: 600 15px Inter; color: #171D33`. Each dimension row: label (`font: 500 13px Inter; color: #6E6E73`) + progress bar (`background: #003AFF`) + score label (`font: 600 13px Inter; color: #171D33`). "Evidence cited for each score" as a footer note inside the card (`font: 400 12px Inter; color: #86868B`).
- This section does not exist in the current artifact and is Route 3 specific.

#### Manager Dashboard (Route 3)
- Same dark section structure as other routes, but **reduced framing copy.** 
- Eyebrow: "For managers" (no "FOR MANAGERS" all-caps — Route 3 does not rely on eyebrow loudness).
- H2: "Know exactly where your team stands with AI." — verbatim SOURCE-CONTENT.
- **No lead paragraph beneath the H2** in this route. The dashboard follows immediately.
- Benefits list (three bullet points from SOURCE-CONTENT) appears below the dashboard card, not above.
- "Sample data" label required.

#### Final CTA (Route 3)
- **Background:** White. No background color change — the section breathes.
- **Layout:** Left-aligned, not centered (Route 3 does not use centered copy as a universal rule).
- **H2:** "Find out where your team actually stands." — SOURCE-CONTENT verbatim.
- **One sentence:** "Book a 20-minute demo. We play a real case, show you the report it produces, and you leave knowing what we would measure on your team." — SOURCE-CONTENT verbatim.
- **One button:** "Request a demo" (primary, same token as above).
- **No secondary CTA.** No price shown in this route (it is present on production but Route 3 positions as a high-consideration purchase — price is a demo conversation, not a page claim). **Implementation note:** If the price must appear for conversion reasons, it may be added as metadata below the CTA button, but this is a business decision outside the scope of this brief.

---

### 5.4 Typography Tokens (Route 3)

```css
:root {
  /* Route 3 additions */
  --font-numeric: "Inter", var(--font-sans);  /* tabular-nums for scores */
  --t-hero-dark: clamp(48px, 5.5vw, 72px);
}

/* Apply tabular numerals to scores and metrics */
.score-value, .metric-number {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;
}
```

All other tokens from Route 1 apply. No additional color additions. Route 3 uses the fewest distinct color values of any route.

---

### 5.5 How It Works — Protagonist Visualization (Route 3)

**Concept:** Directed node graph. Nine labeled circles connected by directional arrows, laid out as a horizontal flow on desktop and a staggered two-column diagonal on tablet, collapsing to a vertical numbered list on mobile. Each node is a `<button>` element. When activated (click or keyboard), a detail panel below the graph updates. As the user scrolls into the section, nodes illuminate in sequence (1–9) at 100ms intervals using IntersectionObserver.

This visualization is pure CSS/SVG — no third-party graph library.

#### HTML Structure

```html
<section id="how" class="hiw3-section">
  <div class="hiw3-container">
    <h2 class="hiw3-heading">The measurement loop.</h2>

    <!-- SVG graph: desktop only, aria-hidden, nodes are real HTML buttons overlaid -->
    <div class="hiw3-graph" aria-hidden="true">
      <svg class="hiw3-svg" viewBox="0 0 1136 160" preserveAspectRatio="xMidYMid meet">
        <!-- Connector lines between node centers -->
        <!-- Line from node 0 center to node 1 center, etc. -->
        <!-- Use stroke="#E4E5EC" stroke-width="1.5" marker-end="url(#arrow)" -->
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="rgba(0,0,0,0.2)" />
          </marker>
        </defs>
        <!-- Lines rendered as <line> elements at computed node center coordinates -->
      </svg>
      <!-- Node buttons overlaid via CSS absolute positioning -->
      <div class="hiw3-nodes">
        <button class="hiw3-node" data-node="0" aria-label="Step 1: Company">
          <span class="hiw3-node-index">01</span>
          <span class="hiw3-node-name">Company</span>
        </button>
        <!-- ... nodes 1–8 -->
      </div>
    </div>

    <!-- Mobile: simple numbered list (hidden on desktop) -->
    <ol class="hiw3-mobile-list">
      <li><strong>Company</strong> — Itera is scoped to your org structure.</li>
      <!-- ... -->
    </ol>

    <!-- Detail panel -->
    <div class="hiw3-detail" id="hiw3-detail">
      <p class="hiw3-detail-step">01 — Company</p>
      <h3 class="hiw3-detail-heading">Your company, your roles.</h3>
      <p class="hiw3-detail-body">Itera is configured for your org structure. Simulations adapt by function — sales, marketing, finance, operations — so every person runs scenarios from their own work.</p>
    </div>
  </div>
</section>
```

**Note:** The SVG lines are decorative (`aria-hidden="true"`) because all navigation is through the `<button>` elements. Accessible label is provided by `aria-label` on each button.

#### Node positioning (desktop, 1136px viewBox)

9 nodes, spaced evenly: node width ~80px, gap ~47px.  
Node center X positions: 40, 167, 294, 421, 548, 675, 802, 929, 1056 (approximately).  
Node center Y: 80 (single horizontal row in viewBox).  
SVG line x1 = nodeN centerX + 40, x2 = nodeN+1 centerX - 40, y1 = y2 = 80.

This is a reference coordinate set. Codex should compute from the actual rendered node positions using `getBoundingClientRect()` if using HTML-overlaid buttons, or render all nodes inside SVG as `<foreignObject>` on browsers that support it, or use the pure CSS flex row approach below.

#### CSS Layout (simpler alternative — recommended for Codex)

Instead of a positioned SVG overlay, render the graph as a flex row of nodes with CSS `::before` pseudo-elements as connectors between them. This avoids coordinate calculation entirely.

```css
.hiw3-section {
  padding: var(--space-section) 0;
  background: var(--bg-primary);
}

.hiw3-graph {
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
}
.hiw3-graph::-webkit-scrollbar { display: none; }

.hiw3-node {
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 96px;
  padding: 12px 8px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-md);
  background: var(--bg-primary);
  cursor: pointer;
  transition: border-color 200ms ease, background 200ms ease, opacity 300ms ease;
  opacity: 0.4;  /* nodes start dimmed */
}

.hiw3-node.hiw3-node--lit { opacity: 1; }
.hiw3-node.hiw3-node--active {
  background: var(--ink-primary);
  border-color: var(--ink-primary);
  opacity: 1;
}
.hiw3-node.hiw3-node--active .hiw3-node-index,
.hiw3-node.hiw3-node--active .hiw3-node-name { color: #fff; }

/* Connector between nodes */
.hiw3-connector {
  flex: 1 0 20px;
  height: 1px;
  background: linear-gradient(90deg, var(--border-subtle), var(--border-strong));
  max-width: 60px;
  position: relative;
}
/* Arrow head on connector */
.hiw3-connector::after {
  content: '';
  position: absolute;
  right: -4px;
  top: -3px;
  width: 0;
  height: 0;
  border-top: 3.5px solid transparent;
  border-bottom: 3.5px solid transparent;
  border-left: 5px solid var(--border-strong);
}

.hiw3-node-index {
  font: 600 10px var(--font-sans);
  letter-spacing: 0.06em;
  color: var(--brand-primary);
}
.hiw3-node-name {
  font: 600 12px var(--font-sans);
  color: var(--ink-primary);
  text-align: center;
  white-space: nowrap;
}

/* Detail panel */
.hiw3-detail {
  margin-top: clamp(40px, 5vw, 56px);
  padding-top: 32px;
  border-top: 1px solid var(--border-subtle);
  max-width: 600px;
}
.hiw3-detail-step {
  font: 600 12px var(--font-sans);
  letter-spacing: 0.06em;
  color: var(--brand-primary);
  margin: 0 0 12px;
}
.hiw3-detail h3 {
  font: 600 28px var(--font-sans);
  letter-spacing: -0.015em;
  line-height: 1.2;
  color: var(--ink-primary);
  margin: 0 0 12px;
}
.hiw3-detail p {
  font: 400 17px var(--font-sans);
  line-height: 1.6;
  color: var(--ink-secondary);
  margin: 0;
}

/* Mobile */
@media (max-width: 767px) {
  .hiw3-graph { display: none; }
  .hiw3-detail { display: none; }
  .hiw3-mobile-list { display: block; }
}

@media (min-width: 768px) {
  .hiw3-mobile-list { display: none; }
}

/* Mobile list */
.hiw3-mobile-list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.hiw3-mobile-list li {
  font: 400 17px var(--font-sans);
  line-height: 1.6;
  color: var(--ink-secondary);
  padding-top: 16px;
  border-top: 1px solid var(--border-subtle);
  counter-increment: hiw-counter;
}
.hiw3-mobile-list li strong {
  display: block;
  font: 600 18px var(--font-sans);
  color: var(--ink-primary);
  margin-bottom: 6px;
}
```

#### JS — Sequential illumination and panel switching

```js
function initHiw3() {
  const nodes = [...document.querySelectorAll('.hiw3-node')];
  const detail = document.getElementById('hiw3-detail');
  const panelData = [/* array of {step, heading, body} objects for all 9 nodes */];

  // Sequential illumination on scroll into view
  let reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(_) {}

  const io = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    if (reduced) { nodes.forEach(n => n.classList.add('hiw3-node--lit')); return; }
    nodes.forEach((n, i) => setTimeout(() => n.classList.add('hiw3-node--lit'), i * 100));
  }, { threshold: 0.3 });
  io.observe(document.querySelector('.hiw3-graph'));

  // Panel switching on node click
  function activateNode(i) {
    nodes.forEach(n => n.classList.remove('hiw3-node--active'));
    nodes[i].classList.add('hiw3-node--active');
    const d = panelData[i];
    detail.querySelector('.hiw3-detail-step').textContent = d.step;
    detail.querySelector('h3').textContent = d.heading;
    detail.querySelector('p').textContent = d.body;
    // Cross-fade: opacity 0 → 1
    if (!reduced) {
      detail.style.opacity = 0;
      requestAnimationFrame(() => {
        detail.style.transition = 'opacity 200ms ease';
        detail.style.opacity = 1;
      });
    }
  }

  nodes.forEach((n, i) => n.addEventListener('click', () => activateNode(i)));

  // Default: activate node 0
  activateNode(0);
  nodes[0].classList.add('hiw3-node--lit');
}
```

Panel data uses the exact content table from Route 1 §3.5 — same 9 rows, same copy.

---

### 5.6 Motion Behavior (Route 3)

The most restrained of all three routes. Motion must feel earned, not ambient.

- **Entrance:** Fade only (no translateY). Duration: 400ms. Easing: `ease` (not spring). Route 3's design principle is that the content should not appear to be performing.
- **Dark hero to white transition:** No animation. The sharp cut at the section boundary is the design element.
- **Node illumination:** Sequential opacity 0.4 → 1 at 100ms stagger intervals. No translateY.
- **Panel switching:** Cross-fade opacity 0 → 1, 200ms. No slide.
- **Hover states on nodes:** `border-color` + `background` only, 200ms ease.
- **No entrance animation on the final CTA.** The section is clean and static — motion at the end of a page can feel manipulative.
- **`prefers-reduced-motion`:** No transitions. All nodes appear lit immediately. Panel switches immediately.

---

### 5.7 Responsive Transformation (Route 3)

| Breakpoint | Key changes |
|------------|------------|
| 1280px+ | Hero dark full-width. Four-column dimension grid. Node graph horizontal full-width. |
| 1024px | Dimension grid 2×2. Node graph allows horizontal scroll (overflow-x: auto). |
| 768px | Node graph hidden; mobile numbered list shown. Simulation detail section: stacks vertically. Nav: hamburger, but two links mean minimal drawer content. |
| 430px | Hero padding reduces to `clamp(80px, 12vw, 104px)`. H1 at ~52px. No hero sub-headline max-width constraint — it fills container. Final CTA left-aligned, full-width button at narrow. |
| 375px | Body text minimum 16px. Dark hero: no risk of white text below AA contrast — `#fff` on `#0B0B0F` is 19.6:1. |

---

### 5.8 CTA Behavior (Route 3)

Same token logic as Route 1. Single primary CTA per section. No secondary CTA in hero.

One Route 3 specific interaction: the "Request a demo" button in the final CTA section is left-aligned (not centered) to match the section's left-aligned text hierarchy. On mobile, it becomes full-width.

---

### 5.9 Accessibility and Performance Risks (Route 3)

**Accessibility:**
- Dark hero: `#A1A1AA` on `#0B0B0F` for sub-headline. Ratio: ~5.9:1. Passes AA for normal text.
- Node graph buttons: all 9 require `aria-label="Step N: [Label]"` for screen readers. The decorative connector arrows should be `aria-hidden="true"`.
- When panel content updates via JS (node click), focus must not move unless triggered by keyboard. If triggered by keyboard, move focus to the detail panel heading using `.focus()`. Add `tabindex="-1"` to `.hiw3-detail h3` to make it focusable.
- Mobile list items: use `<li>` inside `<ol>` for correct screen reader ordinal announcement.
- Simulation detail score bars: each bar must have an `aria-label` (e.g., `aria-label="Judgment: Strong, 88%"`) on the bar container or use `<meter>` element.

**Performance:**
- Node graph is CSS flex + pseudo-elements — no SVG file load, no JS layout calculation.
- Dark hero background is `background-color` — no image load, no gradient file.
- If a real background photo or texture is ever considered for the dark hero, require it to be inline SVG or `background-image: url(data:...)` with a compressed source. No external image URL.
- Total route JS budget: IntersectionObserver reveal (shared) + `initHiw3()` (~50 lines). No external dependencies.

---

### 5.10 What Must NOT Be Copied from Inspirations (Route 3)

| Inspiration | Do not copy |
|------------|-------------|
| **Linear** | Their dark hero with colored animated text highlights (purple/blue gradient words); their sparse dark page feel — Route 3 is dark-then-light, not dark-page |
| **Vercel** | Their dark-mode-first deployment pipeline diagram; their "What's new" changelog chip in the hero; CLI terminal aesthetic |
| **Attio** | Their monochrome editorial page structure — Route 3 must feel warmer than a developer tool |
| **Stripe** | Their gradient mesh hero background; their "optimized for developers" positioning; rainbow brand moments |
| **Framer** | Their component-showcase-as-hero; their canvas interaction metaphor; their dark gradient glow effects around components |
| **Godly / Awwwards** | Their cursor-tracking animations; extreme experimental typography; anti-UX scroll navigation |
| **Ramp / SaaSFrame** | The "trusted by" logo wall — do not add even placeholder logo blocks |

**Node graph specifically:** Do not make it interactive with draggable nodes (Attio), do not make it animate continuously without user input (Framer), do not use a third-party graph library that introduces >10KB of unrelated JS.

---

### 5.11 Acceptance Criteria (Route 3 — Next-Gen AI)

- [ ] Brand blue is `#003AFF`. No instance of `#2E6BFF` remains.
- [ ] Hero section background is `#0B0B0F`. There is a sharp (not gradient) transition to `#FFFFFF` at the next section boundary.
- [ ] Hero has no secondary CTA — only "Request a demo" (primary).
- [ ] The How It Works section renders all 9 nodes in the correct chain order using the recommended CSS flex/connector approach.
- [ ] Each node button has `aria-label="Step N: [Label]"`.
- [ ] On desktop (≥768px), clicking each node updates the detail panel below without page reload or scroll-jump.
- [ ] On mobile (<768px), the node graph is hidden and a vertical numbered list renders all 9 items.
- [ ] When node is activated via keyboard, focus moves to the detail panel `<h3>` after panel update.
- [ ] Nodes illuminate sequentially (100ms stagger) on scroll-into-view. On `prefers-reduced-motion`, all illuminate immediately.
- [ ] The simulation detail section shows 6 evaluation dimensions (Judgment, Accuracy, Adoption, Performance, Risk control, Transparency) with bar + score label for one scenario.
- [ ] Each evaluation bar has a meaningful `aria-label` or `<meter>` element.
- [ ] Manager dashboard section uses minimal framing copy: eyebrow + H2 only, no lead paragraph above the card.
- [ ] "Sample data" label is visible on the dashboard card.
- [ ] Final CTA section is left-aligned (not centered), single primary button.
- [ ] No invented links, testimonials, client names, or metrics.
- [ ] `#A1A1AA` on `#0B0B0F` passes WCAG AA contrast.
- [ ] `prefers-reduced-motion`: all transitions and animations disabled; nodes appear lit; panel visible immediately.
- [ ] No horizontal overflow at 375px.
- [ ] Nav toggles background color class based on scroll position relative to dark hero section boundary.
- [ ] Page renders correctly at 375, 430, 768, 1024, 1280, 1440px.

---

## 6. Cross-Route Shared Constraints

These rules apply to all three routes and must not be relaxed in any implementation.

### Content fidelity
- Do not invent, alter, or imply client names, logos, testimonials, or integrations.
- Do not invent metrics or product performance claims beyond what SOURCE-CONTENT.md provides.
- Evidence statistics may only be used with full attribution as written in SOURCE-CONTENT.md.
- Sample dashboard data must be explicitly labeled "Sample data."
- Itera must be positioned as AI judgment measurement, not a course platform or LMS.

### Token mandates
- Brand primary: `#003AFF`. Pressed: `#0026A8`. Soft: `rgba(0,58,255,0.08)`. Not `#2E6BFF`.
- Ink: `#171D33` (primary), `#6E6E73` (secondary), `#86868B` (tertiary). Not `#1D1D1F` (the artifact value — replace in implementation).
- Background neutrals: `#FFFFFF`, `#FAFBFD`, `#F5F6FB` (Itera brand neutrals per SOURCE-CONTENT).
- Dark section: `#0B0B0F` surface, `#16161C` card.
- Font: Inter 400/500/600 only. No 700 weight (except potentially metric numerals at designer discretion with documented reason).

### Removed elements
- The floating HERO/Editorial/Centered/Split switcher widget must not appear in any deliverable.
- Footer must not contain invented links. Permitted destinations: `/demo`, `/case-demo`, `#como`, `#empresas`, `/auth/login`, `#demo`, `/privacy`, `/terms`, `mailto:hola@itera.la`.

### Animation constraints
- Duration: 180–700ms only (AGENTS §32).
- No looping animations without user intent.
- `prefers-reduced-motion: reduce` disables all transitions and animations.
- No JS animation libraries (Framer Motion, GSAP, etc.) — CSS transitions + IntersectionObserver only.

### Responsive requirement
- All routes must render without horizontal overflow at 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px.
- Mobile navigation must use a proper drawer or overlay, not truncated nav links.

### Accessibility floor
- All interactive elements: `focus-visible` ring at `2px solid #003AFF; outline-offset: 2px`.
- WCAG AA minimum contrast for all text (4.5:1 normal, 3:1 large).
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`–`<h3>` in correct hierarchy.
- Decorative simulation UI cards: `role="img" aria-label="[description]"` or `aria-hidden="true"` depending on informational value.
- Skip-to-main link recommended: `<a href="#main" class="skip-link">Skip to content</a>`.

---

## 7. Implementation Priority for Codex

When implementing any route, follow AGENTS.md §42–43 workflow: inspect → identify violations → simplify → implement → validate.

**Fix P0 issues from the current artifact before route-specific work:**
1. Replace `#2E6BFF` → `#003AFF` (and `#1E52E0` → `#0026A8`) globally.
2. Remove the floating HERO switcher widget entirely.
3. Add the full 9-node How It Works chain (using the route-appropriate visualization).
4. Add the three evidence citations (KPMG, McKinsey, IBM) to the Problem/Evidence section.
5. Add "Sample data" label to the Manager Dashboard card.
6. Fix footer links to only use real SOURCE-CONTENT destinations.

Then implement the route-specific design from this document.

**Definition of done for any route (per AGENTS.md §44):**
- Main message is clearer after the change.
- Visual hierarchy is obvious at a skim.
- Typography follows the token system above.
- Spacing uses the 8px-based scale.
- Color is purposeful — brand blue appears at most 10–15% of visual surface.
- Cards are justified by content, not added for decoration.
- CTA priority is obvious.
- Product imagery is legible at all breakpoints.
- Responsive layouts tested at all seven breakpoints.
- Accessibility preserved.
- No major arbitrary styling values.
- No invented content.
