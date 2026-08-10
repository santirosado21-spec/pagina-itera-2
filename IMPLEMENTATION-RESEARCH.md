# Implementation research notes

## Hermes skills used

- `claude-design`: CLI-mode design exploration and anti-slop/verification workflow.
- `popular-web-designs`: visual vocabulary only; no copying of proprietary layouts.
- `codex`: repository implementation with independent verification after agent output.
- `ai-coding-cli-ops`: bounded agent execution on the VPS.

## Inspiration policy

Reference only broad patterns from Linear, Vercel, Attio, Stripe, Ramp, Framer, Godly, SaaSFrame and Awwwards:

- restrained hierarchy and product-first composition;
- coherent spacing and type systems;
- purposeful product demos;
- subtle, explanatory motion;
- strong responsive transformations.

Do not reproduce proprietary layouts, branded screens, copy, illustrations, or distinctive interactions.

## Candidate library review

Verified against npm/GitHub on 2026-08-08:

- React: MIT.
- Vite: MIT.
- Motion (`motion` / Motion for React): MIT; suitable for route/section transitions and reduced-motion-aware interactions.
- Lucide React: ISC; suitable only if a small number of functional icons materially improves comprehension.
- shadcn/ui: MIT; useful patterns, but not required for this standalone landing project.
- HeroUI: Apache-2.0; broader component system than needed here.
- Magic UI: MIT; reference patterns only, not needed as a runtime dependency.
- React Bits: GitHub license metadata was inconclusive during API inspection; do not reuse code unless its repository license is verified separately.
- Aceternity repository URL checked was unavailable; do not reuse source code.

## Dependency decision

Use only React, Vite and Motion unless implementation proves Motion unnecessary. Prefer semantic HTML, CSS tokens, native SVG, CSS transitions and IntersectionObserver over installing full UI kits. Avoid GSAP, HeroUI, shadcn, Radix, Magic UI, Aceternity and React Bits unless a specific acceptance criterion cannot be met without them.

This keeps the bundle smaller and avoids importing generic component aesthetics that conflict with AGENTS.md.
