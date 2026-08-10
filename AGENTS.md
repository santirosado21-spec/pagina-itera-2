# AGENTS.md — Itera Web Design & Frontend Rules

## Purpose

This file defines the visual, UX, and frontend implementation rules for the Itera website.

Treat these instructions as persistent project constraints whenever you modify the Itera landing page, product marketing pages, dashboard previews, navigation, forms, or responsive behavior.

The goal is **not to copy Apple.com**. The goal is to apply the same design discipline found in Apple’s Human Interface Guidelines: clear hierarchy, restraint, legibility, consistency, adaptive layout, purposeful color, and minimal visual noise.

When existing Itera code conflicts with this document, prefer this document unless a user request explicitly overrides it.

---

# 1. Product and brand context

Itera is a B2B platform that evaluates how employees actually use AI at work.

Core product ideas:
- AI fluency that can be measured.
- Role-based simulations based on real work.
- Measurement of AI judgment, adoption, performance, and risk.
- Identification of employee and team-level gaps.
- Practice and training based on observed weaknesses.
- Manager visibility through dashboards and metrics.
- The product should feel serious enough for enterprise buyers but modern enough to feel like a next-generation AI product.

The site should communicate:

**precision + intelligence + confidence + restraint**

It should NOT feel like:
- a generic SaaS template;
- a course marketplace;
- an AI-generated landing page;
- a crypto/Web3 landing page;
- an over-designed startup;
- a page made from dozens of interchangeable cards.

---

# 2. Design philosophy

Use these priorities, in this order:

1. Clarity
2. Hierarchy
3. Legibility
4. Product credibility
5. Whitespace
6. Consistency
7. Brand expression
8. Decoration

If decoration competes with clarity, remove the decoration.

If a section feels weak, do not automatically add:
- another card;
- another icon;
- another gradient;
- another border;
- another badge;
- another background shape.

First improve:
- copy hierarchy;
- scale;
- whitespace;
- alignment;
- grouping;
- product imagery.

## Core rule

**Use fewer visual ideas, executed better.**

---

# 3. Apple-inspired principles to apply

Apple’s Human Interface Guidelines emphasize clear visual hierarchy, consistent adaptive layouts, legible typography, deliberate use of color, and materials that clarify depth rather than create decoration.

Translate those principles to Itera as follows.

## Hierarchy

Every section needs one unmistakable primary idea.

Users should be able to skim the page and understand the story from:
- H1s;
- H2s;
- large metrics;
- product visuals;
- CTA labels.

Do not give every element equal visual weight.

## Consistency

Components that serve the same purpose must look and behave the same.

Do not create arbitrary variations of:
- button radii;
- card radii;
- heading sizes;
- paragraph widths;
- shadows;
- section padding;
- icon containers.

## Restraint

Prefer subtraction over addition.

Visual sophistication should come primarily from:
- typography;
- spacing;
- scale;
- composition;
- alignment;
- product UI;
- subtle motion.

## Purposeful color

Color should communicate:
- action;
- status;
- emphasis;
- brand identity.

Do not use the Itera orange merely to fill empty space.

---

# 4. Typography

## Preferred web font

Use:

`Inter`

unless the existing implementation has an intentional, high-quality brand font that the user explicitly wants to preserve.

Do NOT depend on SF Pro as the primary website font unless licensing and deployment have been deliberately handled. Apple’s San Francisco fonts are references for typographic quality, not a requirement for Itera.

## Allowed weights

Prefer:
- 400 Regular
- 500 Medium
- 600 Semibold

Use 700 Bold only when there is a strong reason.

Avoid:
- 100
- 200
- 300 for body copy
- excessive 700/800/900

The site should not look heavy.

---

# 5. Desktop type scale

Use a small, repeatable hierarchy.

## Hero H1

Preferred:
- font-size: `clamp(52px, 5.5vw, 76px)`
- font-weight: `600`
- line-height: `0.98–1.06`
- letter-spacing: approximately `-0.035em`
- max-width: `850px`

Avoid hero headlines wider than approximately 12–14 words per visual line when possible.

## Section H2

Preferred:
- font-size: `clamp(40px, 4vw, 56px)`
- font-weight: `600`
- line-height: `1.04–1.10`
- letter-spacing: `-0.025em`
- max-width: `900px`

## H3

Preferred:
- font-size: `24–30px`
- font-weight: `600`
- line-height: `1.15–1.25`

## Lead / intro paragraph

Preferred:
- font-size: `20–22px`
- font-weight: `400`
- line-height: `1.45–1.55`
- max-width: `680px`

## Body

Preferred:
- font-size: `16–18px`
- line-height: `1.5–1.65`
- max-width: `620–680px`

Default to `17px` on desktop where practical.

## Small text

Preferred:
- font-size: `13–15px`
- line-height: `1.4–1.5`

## Eyebrow / section label

Preferred:
- font-size: `12–13px`
- font-weight: `600`
- letter-spacing: `0.04em–0.08em`
- text-transform: uppercase only when appropriate.

Do not make eyebrow labels visually louder than the section heading.

---

# 6. Mobile typography

Never simply shrink desktop values proportionally.

Suggested mobile values:

- Hero H1: `42–52px`
- Section H2: `34–42px`
- H3: `22–26px`
- Lead: `18–20px`
- Body: `16–17px`
- Small: `13–14px`

Keep strong hierarchy on small screens.

Avoid font sizes below `16px` for primary reading text.

---

# 7. Text rules

Avoid:
- excessively wide paragraphs;
- centered long-form body copy;
- five lines of tiny copy under a hero;
- excessive bold words inside paragraphs;
- all-caps paragraphs;
- decorative text effects.

Prefer:
- short paragraphs;
- deliberate line breaks;
- one strong thought at a time;
- left alignment for most body copy.

Center alignment is acceptable for short hero or final CTA copy, but not as a universal layout rule.

---

# 8. Layout system

## Main container

Use a consistent maximum width.

Recommended:

```css
--container-max: 1200px;
--container-padding-desktop: 32px;
--container-padding-tablet: 24px;
--container-padding-mobile: 20px;
```

For exceptionally wide product UI sections, a visual can extend beyond the text container, but the section must remain compositionally aligned.

## Text widths

Recommended:
- hero copy: `700–850px`
- normal copy: `600–680px`
- section title: `760–900px`

Do not allow body paragraphs to span the full width of a desktop monitor.

---

# 9. Spacing system

Use an 8px-based spacing philosophy with a few optical exceptions.

Preferred tokens:

```text
4
8
12
16
24
32
48
64
80
96
128
160
```

Do not invent arbitrary values such as:
- 27px
- 43px
- 71px
- 117px

unless optical alignment genuinely requires them.

## Typical usage

Small element gap:
`8–12px`

Title → paragraph:
`16–24px`

Paragraph → CTA:
`24–32px`

Card padding:
`24–32px`

Content group → content group:
`48–64px`

Section spacing:
`112–160px`

Major storytelling transitions:
`144–192px` when visually justified.

---

# 10. Whitespace

Whitespace is a design element.

Do not fill empty areas simply because they exist.

Prefer one strong section with substantial breathing room over several compressed sections.

Before adding visual decoration, test whether increasing whitespace solves the problem.

---

# 11. Responsive behavior

Every implementation must work at minimum across:

- 1440px desktop
- 1280px desktop
- 1024px tablet/compact desktop
- 768px tablet
- 430px mobile
- 390px mobile
- 375px mobile

Do not treat mobile as a compressed desktop.

On smaller screens:
- convert multi-column layouts intelligently;
- preserve content hierarchy;
- reduce decorative elements;
- maintain usable CTA sizes;
- prevent horizontal overflow;
- ensure dashboard/product previews remain understandable.

Never use fixed dimensions that break responsive layouts without a very good reason.

---

# 12. Grid

Prefer simple grids.

Typical structures:
- 12-column page grid;
- two-column editorial split;
- three-column metric/features grid;
- one large product visual.

Avoid grids with many differently sized cards unless they communicate a clear hierarchy.

Do not create Bento layouts just because they are fashionable.

A Bento layout is allowed only when the information naturally benefits from multiple simultaneous data modules.

---

# 13. Color system

The page should be predominantly neutral.

Recommended conceptual balance:
- 85–90% neutral surfaces and typography
- 10–15% Itera accent color

## Suggested neutral tokens

```css
--bg-primary: #FFFFFF;
--bg-secondary: #F5F5F7;
--bg-tertiary: #FAFAFA;

--text-primary: #1D1D1F;
--text-secondary: #6E6E73;
--text-tertiary: #86868B;

--border-subtle: rgba(0, 0, 0, 0.08);
--border-strong: rgba(0, 0, 0, 0.14);
```

Use the official current Itera orange from the codebase/brand assets instead of inventing a new value.

Create a semantic token such as:

```css
--brand-primary: <existing Itera orange>;
```

## Brand color use

Use orange primarily for:
- primary CTA;
- selected/active states;
- critical emphasis;
- key chart highlight;
- small brand moments.

Avoid:
- entire sections saturated orange without a strong reason;
- orange paragraph text;
- orange borders around every card;
- multiple competing accent colors.

---

# 14. Contrast and accessibility

Maintain WCAG-conscious contrast.

Never rely on color alone to communicate important status.

Ensure:
- body copy is comfortably readable;
- disabled states remain distinguishable;
- focus states are visible;
- buttons have accessible labels;
- controls are keyboard reachable;
- semantic HTML is used.

Respect `prefers-reduced-motion`.

Images need meaningful `alt` text unless decorative.

---

# 15. Buttons

Use a restrained hierarchy.

## Primary CTA

Typical example:
`Request a demo`

Properties:
- visually dominant action;
- solid Itera orange or dark neutral, depending on context;
- medium/semibold text;
- comfortable horizontal padding;
- no excessive shadow;
- clear hover/focus state.

Suggested:
- min-height: `44–48px`
- radius: `10–14px`

## Secondary CTA

Typical example:
`See the product →`

Prefer:
- text link;
- subtle ghost button;
- low-visual-weight secondary control.

Do not place two visually identical primary buttons next to each other unless the actions truly have equal priority.

## CTA rule

Each major section should generally have **one obvious primary action**.

---

# 16. Border radius

Use a controlled radius system.

Recommended:

```text
8px   — small controls
12px  — buttons / compact surfaces
16px  — standard cards
24px  — large product panels
999px — pills only
```

Do not use many visually similar arbitrary values.

Nested surfaces should have coherent concentric radii.

---

# 17. Borders

Prefer subtle borders over strong shadows.

Default:
```css
border: 1px solid rgba(0,0,0,.08);
```

Borders should separate information, not decorate every object.

If a component is already separated through:
- spacing;
- background;
- grouping;
- typography;

it may not need a border.

---

# 18. Shadows

Avoid generic SaaS shadows.

Do not default to:
```css
box-shadow: 0 20px 60px rgba(...);
```

Use shadows only when they communicate:
- elevation;
- floating controls;
- modal hierarchy;
- believable product depth.

Most marketing sections should work without shadows.

When used, keep shadows:
- soft;
- low opacity;
- physically plausible.

---

# 19. Cards

Do NOT turn every idea into a card.

A card should represent a meaningful container such as:
- a product module;
- a dashboard element;
- a grouped feature;
- a real content object;
- an interactive control.

Plain marketing copy often does not need a card.

Before making a new card, ask:

**Would the information still make sense and look better with typography + whitespace alone?**

If yes, do not create the card.

---

# 20. Icons

Use icons sparingly.

Do not place every feature inside:
`rounded square + icon + title + paragraph`

unless the content explicitly benefits from icon recognition.

Prefer product screenshots, diagrams, metrics, and typography over generic Lucide/icon-library decoration.

If using icons:
- use one icon family;
- use consistent stroke width;
- keep sizing consistent;
- use icons to clarify function.

---

# 21. Gradients

Avoid decorative AI gradients by default.

Do not use:
- purple-blue AI gradients;
- glowing blobs;
- neon mesh gradients;
- random orange glows;
- gradient text;

unless the user explicitly requests them and they add meaning.

Itera should feel more like a serious enterprise product than an AI trend template.

---

# 22. Glass / blur / materials

Do not imitate Apple’s Liquid Glass merely for aesthetic similarity.

Use blur/translucency only when it clarifies hierarchy, for example:
- sticky navigation over content;
- floating controls;
- modal overlays.

Never cover the page in translucent glass cards.

The underlying principle is hierarchy, not the visual effect itself.

---

# 23. Navigation

The navigation should feel compact and calm.

Target structure:

```text
Itera logo
Product
How it works
For managers
[optional genuinely important item]

Log in
Request a demo
```

Rules:
- avoid too many top-level links;
- keep the main CTA clearly distinct;
- avoid oversized navbar height;
- avoid multiple badge-style controls;
- sticky nav is acceptable if subtle;
- mobile navigation must be simple and usable.

---

# 24. Hero section

The hero is the most important section on the page.

It should communicate:
1. category / context;
2. primary value proposition;
3. concise explanation;
4. primary CTA;
5. product proof.

Recommended conceptual structure:

```text
AI FLUENCY YOU CAN MEASURE

Know who on your team
makes good calls with AI.

Your team runs short simulations based on real work.
See where judgment holds up, where it fails, and what
each person needs next.

[ Request a demo ]   See the product →

            [ large product visual ]
```

Do not overload the hero with:
- many badges;
- many floating cards;
- multiple dashboards;
- decorative illustrations;
- four CTAs;
- excessive copy.

The headline and product should carry the page.

---

# 25. Product visuals

The real product is one of Itera’s strongest assets.

Prioritize:
- clean dashboard screenshots;
- simulation UI;
- assessment UI;
- manager metrics;
- real product states.

Product visuals should be:
- large enough to understand;
- crisp;
- aligned;
- minimally framed.

Avoid adding fake browser chrome unless it improves comprehension.

Do not bury dashboard screenshots inside tiny decorative cards.

---

# 26. Metrics

When displaying important numbers, use scale instead of excessive containers.

Prefer:

```text
64
Team readiness

6/8
Assessed

11
Risk events
```

over three heavily decorated mini-cards when cards do not add meaning.

Typography can be the interface.

---

# 27. Page storytelling

The preferred Itera landing-page sequence is:

1. Navigation
2. Hero
3. Fast credibility / measurable outcomes
4. Problem
5. Product / simulations
6. How it works
7. Manager dashboard
8. Measurement / proof
9. Final CTA
10. Footer

A strong page should feel like a narrative, not a component gallery.

---

# 28. Problem section

Use one strong statement.

Example direction:

```text
Your team already uses AI.
Nobody's checking their judgment.
```

Support it with concise explanation.

Avoid turning every problem statement into an individual feature card.

---

# 29. How it works

Prefer a simple 3-step narrative:

```text
01
Assess

02
Practice

03
Measure
```

Each step should have:
- one clear title;
- one concise explanation;
- one meaningful visual or interaction if needed.

Do not over-componentize this section.

---

# 30. Manager dashboard section

Treat the dashboard as a hero-level product moment.

Suggested structure:

```text
FOR MANAGERS

Know exactly where your
team stands with AI.

[ large dashboard visual ]

64              6/8               11
Readiness       Assessed          Risk events
```

Do not reduce the product to a tiny screenshot surrounded by many decorative elements.

---

# 31. Section backgrounds

Use background transitions intentionally.

Good:
- white → subtle neutral → white;
- dark section for one dramatic product moment;
- subtle tonal separation.

Bad:
- every section has a different color;
- alternating backgrounds purely for variety;
- random gradients.

Background changes should signal meaningful storytelling transitions.

---

# 32. Motion

Use motion to explain or reinforce.

Allowed:
- restrained fade/translate entrance;
- gentle dashboard demo;
- number transitions;
- subtle hover behavior;
- sticky storytelling if performant.

Avoid:
- constant floating;
- parallax everywhere;
- excessive spring animations;
- attention-seeking button motion;
- looping decorative motion with no purpose.

Default animation range:
`180–450ms`

Use easing that feels controlled rather than bouncy.

Respect:
`prefers-reduced-motion`.

---

# 33. Interaction states

Every interactive component must define:
- default;
- hover;
- active;
- focus-visible;
- disabled where applicable.

Do not remove focus outlines without a replacement.

Avoid hover states that dramatically shift layout.

---

# 34. Implementation quality

When modifying Itera:

1. Inspect the existing design tokens first.
2. Reuse components where appropriate.
3. Consolidate duplicate styles.
4. Avoid one-off CSS.
5. Avoid inline magic numbers.
6. Prefer semantic variables/tokens.
7. Keep components focused.
8. Preserve responsiveness.
9. Preserve accessibility.
10. Test before declaring completion.

---

# 35. CSS token recommendation

Where the stack allows, normalize around tokens similar to:

```css
:root {
  --font-sans: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  --container-max: 1200px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
  --space-40: 160px;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 999px;

  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f7;
  --bg-tertiary: #fafafa;

  --text-primary: #1d1d1f;
  --text-secondary: #6e6e73;
  --text-tertiary: #86868b;

  --border-subtle: rgba(0, 0, 0, 0.08);
  --border-strong: rgba(0, 0, 0, 0.14);

  --brand-primary: var(--existing-itera-orange);
}
```

Adapt token syntax to the actual project stack.

Do not blindly add these if an equivalent token system already exists. Normalize the existing system instead.

---

# 36. Tailwind projects

If Itera uses Tailwind:
- prefer theme tokens;
- avoid endless arbitrary values like `mt-[73px]`;
- standardize container widths;
- standardize text styles;
- extract recurring UI patterns into reusable components;
- use `clamp()` selectively for fluid display typography;
- preserve semantic HTML.

A few arbitrary values are acceptable for genuine optical adjustments, but they must not become the design system.

---

# 37. React / Next.js projects

If applicable:
- keep page sections modular;
- avoid premature abstraction;
- use server components where appropriate;
- keep interactive components client-side only when needed;
- optimize large images;
- use responsive `sizes`;
- prevent layout shifts;
- lazy-load below-the-fold visuals where appropriate.

Do not sacrifice design quality for unnecessary component abstraction.

---

# 38. Performance

Premium visual design must still load quickly.

Avoid:
- oversized uncompressed screenshots;
- autoplay high-resolution video without optimization;
- unnecessary JS animation libraries;
- loading every font weight;
- multiple redundant icon libraries;
- large layout-shifting assets.

Prefer:
- AVIF/WebP when appropriate;
- optimized video;
- responsive images;
- limited font weights;
- CSS transitions for simple motion.

---

# 39. Content fidelity

Do not rewrite Itera’s positioning without being asked.

Preserve or strengthen the distinction that Itera measures how people use AI and how they exercise judgment, rather than presenting Itera as simply:
- an LMS;
- an AI course platform;
- generic employee training.

When editing UI copy for fit, do not materially change the business claim.

---

# 40. Anti-pattern blacklist

Do not introduce these by default:

- generic SaaS Bento grids;
- excessive pill badges;
- excessive cards;
- large gradient blobs;
- neon AI visuals;
- glassmorphism everywhere;
- huge shadows;
- gradient typography;
- icons for every sentence;
- giant border radii on every object;
- excessive orange;
- five different gray backgrounds;
- multiple CTA styles with equal emphasis;
- body text below comfortable reading size;
- centered paragraphs everywhere;
- random spacing values;
- horizontal overflow on mobile;
- fake metrics;
- fake customer logos;
- fake testimonials;
- decorative charts that are not based on real product/data;
- meaningless animations.

---

# 41. Decision rule when uncertain

When choosing between two designs, prefer the one that is:

1. easier to understand;
2. visually calmer;
3. more consistent with existing Itera brand assets;
4. less dependent on decoration;
5. more legible;
6. more responsive;
7. easier to maintain.

If both work, choose the simpler one.

---

# 42. Workflow for any visual change

Before changing UI:

## Step 1 — Inspect

Inspect:
- current page;
- relevant components;
- typography;
- CSS/tokens;
- responsive behavior;
- existing Itera orange/logo/assets.

Do not redesign blindly.

## Step 2 — Identify violations

Explicitly look for:
- hierarchy problems;
- inconsistent text sizes;
- arbitrary spacing;
- unnecessary cards;
- excessive color;
- inconsistent radii;
- excessive shadows;
- weak CTA priority;
- poor mobile behavior;
- product visuals that are too small.

## Step 3 — Simplify

Before adding new design elements, try:
- removing;
- merging;
- enlarging;
- aligning;
- spacing;
- reordering.

## Step 4 — Implement

Make changes using existing architecture where sensible.

## Step 5 — Validate

Check:
- desktop;
- tablet;
- mobile;
- typography;
- overflow;
- contrast;
- CTA hierarchy;
- visual consistency.

## Step 6 — Report

When finishing a design task, summarize:
- what changed;
- why;
- any remaining inconsistencies;
- any decisions that require product/brand input.

---

# 43. Full-page audit instruction

If asked to "make Itera more Apple-like", "fix the design", "clean the landing page", or equivalent:

Do NOT immediately rebuild the entire site.

First inspect the existing implementation and produce an internal prioritized audit.

Use this priority:

### P0 — Broken
- responsiveness;
- overflow;
- unreadable typography;
- broken interactions;
- inconsistent layout bugs.

### P1 — High-impact design
- hero hierarchy;
- section spacing;
- typography system;
- CTA hierarchy;
- product visual scale.

### P2 — System consistency
- radii;
- shadows;
- borders;
- colors;
- repeated components.

### P3 — Polish
- micro-interactions;
- subtle motion;
- optical adjustments.

Implement P0/P1 before P2/P3.

---

# 44. Definition of done

A redesigned Itera section is not done merely because it "looks nicer".

It is done when:

- the main message is clearer;
- visual hierarchy is obvious;
- typography follows the defined system;
- spacing uses the defined scale;
- color is purposeful;
- cards are justified;
- CTA priority is obvious;
- product imagery is legible;
- responsive layouts work;
- accessibility is preserved;
- implementation is maintainable;
- no major arbitrary styling has been introduced.

---

# 45. Reference principles

Use Apple’s official design documentation as conceptual reference, especially:

- Human Interface Guidelines:
  https://developer.apple.com/design/human-interface-guidelines/

- Design principles:
  https://developer.apple.com/design/human-interface-guidelines/design-principles

- Typography:
  https://developer.apple.com/design/human-interface-guidelines/typography

- Layout:
  https://developer.apple.com/design/human-interface-guidelines/layout

- Color:
  https://developer.apple.com/design/human-interface-guidelines/color

- Materials:
  https://developer.apple.com/design/human-interface-guidelines/materials

- Accessibility:
  https://developer.apple.com/design/human-interface-guidelines/accessibility

- Apple fonts:
  https://developer.apple.com/fonts/

These references exist to guide principles, not to justify cloning Apple’s proprietary brand expression.

---

# 46. Final mandate

Itera should feel like a company that measures intelligence and judgment.

The interface must therefore demonstrate judgment itself.

Every design decision should feel intentional.

Prefer:
**clarity over novelty**
**hierarchy over decoration**
**product over ornament**
**whitespace over clutter**
**consistency over variety**
**evidence over visual gimmicks**
