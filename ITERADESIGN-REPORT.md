# Itera design direction report

## Recommendation

Use **Option 1 — Editorial Precision** as the homepage direction.

It explains the product fastest, places a legible simulation above the fold, and gives the broadest buyer audience a clear path from judgment assessment to manager visibility. It also has the lowest interaction and maintenance risk. Option 2 is the strongest basis for an enterprise campaign or procurement landing page. Option 3 is the strongest category-positioning expression, but its deliberately abstract opening asks more patience from a first-time visitor.

## Comparison

Scores use a 1–5 scale and reflect the implementation in this repository.

| Criterion | Option 1: Editorial Precision | Option 2: Data Command Center | Option 3: Intelligence Surface |
|---|---:|---:|---:|
| Product clarity | 5 | 4 | 4 |
| Visual impact | 4 | 4 | 5 |
| Enterprise credibility | 4 | 5 | 4 |
| Conversion | 5 | 4 | 3 |
| Performance | 5 | 5 | 5 |
| Innovation | 4 | 3 | 5 |
| Maintainability | 5 | 5 | 4 |

### Option 1 — Product-Led SaaS / Editorial Precision

The simulation is the primary proof, followed by a calm editorial argument. The interactive horizontal pipeline makes the complete system discoverable without overwhelming the page. It offers the clearest general-purpose story and the most conventional conversion path while avoiding generic SaaS card grids.

### Option 2 — Enterprise / Data Command Center

The page front-loads the three cited risk findings and manager output, then explains the input. Its static vertical pipeline exposes the artifact produced at each stage, which is useful for procurement and leadership review. The visual tone is denser and more operational by design.

### Option 3 — Next-Gen AI / Intelligence Surface

The sharp dark-to-white transition and directed graph make the category proposition feel distinct. Keyboard activation updates the graph detail, and mobile replaces it with a complete ordered list. The design is intentionally restrained, but the abstract hero is less immediate for visitors who do not already recognize the AI-adoption problem.

## Content and evidence posture

All three routes use the source inventory for positioning, research citations, product proof, dashboard values, CTAs, and footer destinations. Dashboard values are visibly marked **Sample data**. No clients, logos, integrations, testimonials, outcomes, or unsupported research were added.

The correction pass removes unsupported evaluation percentages and disputed-invoice results. Evaluation is now explicitly presented as a **Sample interface** with the six existing dimensions and the non-metric status “Evidence cited.” Option 3 now shows the source-backed practice simulation and links to the live cases destination. The final 44% production-page claim visibly carries the inventory-safe note “Source cited on current Itera production page.” Dashboard initials V, A, and D are identified only as anonymized team members.

## Licenses

- React: MIT.
- Vite: MIT.
- `@vitejs/plugin-react`: MIT.
- Inter: SIL Open Font License 1.1. One self-hosted variable WOFF2 serves weights 400–600 with `font-display: swap`; the OFL notice is included at `public/fonts/OFL.txt`.

No UI kit, icon library, animation library, stock imagery, or copied third-party layout is included. Motion was intentionally not installed because CSS transitions and a small `IntersectionObserver` provide the only explanatory animation needed.

## Performance posture

The pages use semantic React, one shared stylesheet, CSS product mockups, and no raster assets, video, icon packs, or graph libraries. Option 1 changes from its wide editorial pipeline to a non-scrolling 3×3 layout at 1100px, then to the complete ordered list at 767px. Option 3 uses a directed serpentine 3×3 intelligence map on desktop/tablet and the same complete ordered list on mobile. Motion is limited to short state transitions and directed-graph illumination; `prefers-reduced-motion` disables transitions and exposes all graph nodes immediately.

Inter no longer makes a remote font request. The repository contains the variable WOFF2 and its OFL license notice under `public/fonts`.
