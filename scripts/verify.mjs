import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const collect = dir => readdirSync(dir).flatMap(name => {
  const path = join(dir, name)
  return statSync(path).isDirectory() ? collect(path) : [path]
})
const files = collect(join(root, 'src')).filter(x => /\.(jsx|js|tsx|ts|css)$/.test(x))
const source = files.map(x => readFileSync(x, 'utf8')).join('\n')
const codeSource = files.filter(x => /\.(jsx|js|tsx|ts)$/.test(x)).map(x => readFileSync(x, 'utf8')).join('\n')
const main = readFileSync(join(root, 'src/main.jsx'), 'utf8')
const optionThree = readFileSync(join(root, 'src/pages/OptionThree.jsx'), 'utf8')
const optionOne = readFileSync(join(root, 'src/pages/OptionOne.jsx'), 'utf8')
const optionTwo = readFileSync(join(root, 'src/pages/OptionTwo.jsx'), 'utf8')
const site = readFileSync(join(root, 'src/components/Site.jsx'), 'utf8')
const css = readFileSync(join(root, 'src/styles/global.css'), 'utf8')
const html = readFileSync(join(root, 'index.html'), 'utf8')
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const tailwindConfig = readFileSync(join(root, 'tailwind.config.js'), 'utf8')
const failures = []
const requireText = (label, pattern) => { if (!pattern.test(source)) failures.push(label) }
if (!/corePlugins\s*:\s*\{[\s\S]*container\s*:\s*false/.test(tailwindConfig)) failures.push('Tailwind container utility must remain disabled to protect the legacy layout')

// AGENTS.md layout contract: one shared 1200px content line with exact responsive gutters.
if (!/--container:1200px;--px:32px/.test(css)) failures.push('desktop container must keep the AGENTS.md 1200px max and 32px gutter')
if (!/@media\(max-width:1023px\)\{[^}]*:root\{--px:24px\}/.test(css)) failures.push('tablet container must keep the AGENTS.md 24px gutter')
if (!/@media\(max-width:767px\)\{[^}]*:root\{--px:20px\}/.test(css)) failures.push('mobile container must keep the AGENTS.md 20px gutter')
if (!/\.container\{[^}]*calc\(var\(--container\) \+ 2\*var\(--px\)\)[^}]*padding-inline:var\(--px\)/.test(css)) failures.push('shared container no longer preserves the canonical left content line')
if (!/\.editorial-head\{display:block;max-width:900px\}/.test(css)) failures.push('Product Lab editorial copy must share the canonical left content line')
if (!/\.editorial-head h2\{margin-bottom:0\}\.editorial-head \.lead\{margin:24px 0 0\}/.test(css)) failures.push('Product Lab title-to-lead spacing must remain an exact non-collapsing 24px')
if (!/\.problem-heading\{[^}]*margin-inline:auto;[^}]*text-align:center/.test(css)) failures.push('Why Itera editorial copy must use the intentional centered alignment')
if (!/\.about-heading\{display:block;max-width:900px/.test(css)) failures.push('About Us editorial copy must share the canonical left content line')
if (!/\.about-heading h2\{margin-bottom:0\}\.about-heading \.lead\{margin:24px 0 0\}/.test(css)) failures.push('About Us title-to-lead spacing must remain an exact non-collapsing 24px')
if (/className="container narrow"/.test(optionOne)) failures.push('Product-Led editorial content still uses an arbitrary intermediate left edge')

for (const route of ['/itera-option-1','/itera-option-2','/itera-option-3','/itera-option-4']) {
  if (!main.includes(`'${route}'`)) failures.push(`missing route ${route}`)
}
for (const node of ['Company','Roles','AI Simulations','Evaluation','Adoption Data','Skill Gaps','Personalized Learning','Manager Dashboard','Measurable AI Adoption']) requireText(`missing flow node ${node}`, new RegExp(node))
for (const text of ['Sample data','57%','3×','$670K','44%','KPMG & University of Melbourne','McKinsey','IBM, Cost of a Data Breach Report 2025']) {
  if (!source.includes(text)) failures.push(`missing required evidence ${text}`)
}
for (const url of ['https://www.itera.la/demo','https://www.itera.la/case-demo','https://www.itera.la/auth/login','https://www.itera.la/auth/signup','mailto:hola@itera.la']) requireText(`missing approved destination ${url}`, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
if (/#2E6BFF/i.test(source)) failures.push('obsolete brand blue found')
if (/href=["']#["']/.test(source)) failures.push('dead # link found')
if (/trusted by|customer logo/i.test(source)) failures.push('unapproved generic social proof language found')
for (const value of ['88', '76', '84', '71']) {
  if (new RegExp(`['\"]?${value}['\"]?\\s*[,}%]`).test(codeSource)) failures.push(`unsupported evaluation value ${value} remains`)
}
if (/disputed invoice/i.test(source)) failures.push('unsupported disputed-invoice result remains')
if (!/<Simulation\s*\/>/.test(optionThree)) failures.push('Option 3 lacks the source-backed Simulation component')
if (!/href=\{links\.cases\}/.test(optionThree)) failures.push('Option 3 simulation lacks the live cases link')
if (!/Sample interface/.test(optionThree + source)) failures.push('evaluation is not labeled Sample interface')
if (/fonts\.googleapis\.com|fonts\.gstatic\.com|Google Fonts/i.test(css + html)) failures.push('Google Fonts reference found')
if (!/@font-face/.test(css) || !/InterVariable\.woff2/.test(css) || !/font-display:swap/.test(css)) failures.push('self-hosted Inter font-face is incomplete')
if (!site.includes('/a0ba166a-1b60-4d4e-bf9f-8b669276e87c.png')) failures.push('exact original Itera PNG logo is not used')
for (const [label, page, component, hook] of [
  ['Option 1', optionOne, 'ProductWorkbench', 'lab-hero-grid'],
  ['Option 2', optionTwo, 'ControlRoom', 'command-hero'],
  ['Option 3', optionThree, 'SignalNetwork', 'signal-opening'],
]) {
  if (!page.includes(component)) failures.push(`${label} lacks distinct graphic component ${component}`)
  if (!page.includes(hook)) failures.push(`${label} lacks distinct composition hook ${hook}`)
}
for (const hook of ['scan-line','trend-line','signal-path','IntersectionObserver']) if (!source.includes(hook)) failures.push(`missing required motion hook ${hook}`)
if (!/@media\(prefers-reduced-motion:reduce\)/.test(css)) failures.push('reduced-motion fallback missing')
for (const variant of ['option-one','option-two','option-three']) {
  if (!new RegExp(`\\.${variant} \\.ambient-background`).test(css)) failures.push(`missing ambient variant ${variant}`)
}
if (!/export function AmbientBackground/.test(site) || !/<AmbientBackground\s*\/>/.test(site)) failures.push('shared ambient background is not mounted by PageShell')
if ((site.match(/new IntersectionObserver/g) || []).length !== 2) failures.push('expected one shared section observer plus the existing directed-graph observer')
if (!/querySelectorAll\('main > section, footer'\)/.test(site) || !/observer\.unobserve\(entry\.target\)/.test(site)) failures.push('section motion does not centrally observe each major section once')
if (/function Reveal[\s\S]{0,400}IntersectionObserver/.test(site)) failures.push('Reveal still creates per-element observers')
for (const name of ['ambient-drift','ambient-orbit']) {
  const start = css.indexOf(`@keyframes ${name}`)
  const end = css.indexOf('@keyframes', start + 12)
  const keyframe = start >= 0 ? css.slice(start, end < 0 ? css.length : end) : ''
  if (!keyframe || /background-position|filter:|blur\(/.test(keyframe) || !/transform:/.test(keyframe)) failures.push(`${name} is missing or not compositor-safe`)
}
if (!/\.motion-paused \.ambient-background i\{animation-play-state:paused\}/.test(css)) failures.push('ambient motion does not pause while hidden')
if (!/prefers-reduced-motion:reduce[\s\S]*\.motion-ready main>section[\s\S]*opacity:1!important;transform:none!important/.test(css)) failures.push('reduced-motion content fallback missing')
if ((site.match(/Sample data/g) || []).length < 4) failures.push('control-room charts are not individually covered by Sample data labels')
if (!/signal-mobile/.test(site + css)) failures.push('9-stage signal map lacks mobile timeline')
for (const text of ['See where judgment is improving', 'Understand what needs attention', 'Turn evidence into a clear score', 'Verified decisions', 'Sound judgment', 'AI judgment score']) {
  if (!site.includes(text)) failures.push(`ProductScreens missing ${text}`)
}
if (!/export function ProductScreens/.test(site)) failures.push('reusable ProductScreens component missing')
if (!/<ProductScreens\s*\/>/.test(optionOne)) failures.push('ProductScreens is not mounted in Option 1')
if (/<ProductScreens\s*\/>/.test(optionTwo + optionThree)) failures.push('ProductScreens must only be mounted in Option 1')
if (!/\.product-screens-track\{[^}]*scroll-snap-type:x mandatory/.test(css) || !/\.product-screen\{[^}]*scroll-snap-align:start/.test(css)) failures.push('ProductScreens lacks deterministic 3-card scroll-snap styling')
for (const phrase of ['makes good calls with AI.', 'catches what AI gets wrong.', 'knows when to push back.', 'handles data responsibly.', 'is ready to work with AI.']) {
  if (!source.includes(phrase)) failures.push(`AnimatedHeroTitle missing ${phrase}`)
}
if (!/<AnimatedHeroTitle\s*\/>/.test(optionOne)) failures.push('AnimatedHeroTitle is not mounted in Option 1')
if (!/animated-title-word:first-child\{display:block;opacity:1\}/.test(css)) failures.push('AnimatedHeroTitle lacks a deterministic reduced-motion state')

// Product-led process and scroll-story integration contract.
const howItWorksPath = join(root, 'src/components/ui/how-it-works.tsx')
const containerScrollPath = join(root, 'src/components/ui/container-scroll-animation.tsx')
const backgroundPathsPath = join(root, 'src/components/ui/background-paths.tsx')
const testimonialPath = join(root, 'src/components/ui/testimonial.tsx')
const aetherRibbonPath = join(root, 'src/components/ui/aether-ribbon-mesh.tsx')
const glassCardPath = join(root, 'src/components/ui/glass-card.tsx')
let howItWorks = ''
let containerScroll = ''
let backgroundPaths = ''
let testimonial = ''
let aetherRibbon = ''
let glassCard = ''
try { howItWorks = readFileSync(howItWorksPath, 'utf8') } catch { failures.push('missing src/components/ui/how-it-works.tsx') }
try { containerScroll = readFileSync(containerScrollPath, 'utf8') } catch { failures.push('missing src/components/ui/container-scroll-animation.tsx') }
try { backgroundPaths = readFileSync(backgroundPathsPath, 'utf8') } catch { failures.push('missing src/components/ui/background-paths.tsx') }
try { testimonial = readFileSync(testimonialPath, 'utf8') } catch { failures.push('missing src/components/ui/testimonial.tsx') }
try { aetherRibbon = readFileSync(aetherRibbonPath, 'utf8') } catch { failures.push('missing src/components/ui/aether-ribbon-mesh.tsx') }
try { glassCard = readFileSync(glassCardPath, 'utf8') } catch { failures.push('missing src/components/ui/glass-card.tsx') }
if (!/import HowItWorks from ['"]@\/components\/ui\/how-it-works['"]/.test(optionOne)) failures.push('Option 1 does not import HowItWorks through the @/components/ui alias')
if (!/<HowItWorks\s+features=\{/.test(optionOne)) failures.push('Option 1 does not mount the nine-card HowItWorks graphic with Itera data')
if (/<HorizontalFlow\s*\/>/.test(optionOne)) failures.push('Option 1 still mounts the circular HorizontalFlow')
if (!/import \{ ContainerScroll \} from ['"]@\/components\/ui\/container-scroll-animation['"]/.test(optionOne)) failures.push('Option 1 does not import ContainerScroll through the @/components/ui alias')
if (!/<ContainerScroll/.test(optionOne)) failures.push('Option 1 does not mount the 3D scroll animation')
if (howItWorks && (howItWorks.match(/title:/g) || []).length < 9 && !/features/.test(howItWorks)) failures.push('HowItWorks is not prepared for all nine Itera stages')
if (howItWorks && !/useReducedMotion/.test(howItWorks)) failures.push('HowItWorks animated path lacks a reduced-motion fallback')
if (howItWorks && !/lg:block lg:h-\[var\(--process-height\)\]/.test(howItWorks)) failures.push('HowItWorks does not preserve the safe stacked layout through tablet widths')
if (containerScroll && !/prefers-reduced-motion/.test(containerScroll)) failures.push('ContainerScroll lacks a deterministic reduced-motion fallback')
if (containerScroll && !/pointer-events-none/.test(containerScroll)) failures.push('ContainerScroll dashboard does not let page scrolling pass through the graphic')
if (containerScroll && /onWheel=|preventDefault\(\)|window\.scrollBy/.test(containerScroll)) failures.push('ContainerScroll must preserve native wheel and trackpad scrolling')
if (containerScroll && /overflow-y-auto|overscroll-contain/.test(containerScroll)) failures.push('ContainerScroll must not create a nested vertical scroll region')
if (containerScroll && !/touch-pan-y/.test(containerScroll)) failures.push('ContainerScroll must preserve native vertical touch panning')
if (!/import \{ BackgroundPaths \} from ['"]@\/components\/ui\/background-paths['"]/.test(optionOne)) failures.push('Option 1 does not import the animated BackgroundPaths CTA')
if (!/<BackgroundPaths[\s\S]*title=/.test(optionOne)) failures.push('Product-led options do not end with the BackgroundPaths CTA')
if (backgroundPaths && !/href=\{primaryHref\}/.test(backgroundPaths)) failures.push('BackgroundPaths CTA does not use a real link destination')
if (backgroundPaths && !/useReducedMotion/.test(backgroundPaths)) failures.push('BackgroundPaths lacks a reduced-motion fallback')
if (!/import Testimonials from ['"]@\/components\/ui\/testimonial['"]/.test(optionOne)) failures.push('Option 1 does not import the client testimonial section')
if (!/<Testimonials\s*\/>/.test(optionOne)) failures.push('Product-led options do not mount the client testimonial section')
for (const client of ['Ponte Advisory', 'Aurea Legal', 'Serena Health']) if (!testimonial.includes(client)) failures.push(`missing approved client ${client}`)
for (const logo of ['ponte-advisory.webp', 'aurea-legal.webp', 'serena-health.webp']) if (!testimonial.includes(logo)) failures.push(`missing supplied client logo ${logo}`)
if (testimonial && !/type="button"/.test(testimonial)) failures.push('client cards are not keyboard-accessible clickable controls')
if (testimonial && !/aria-expanded=/.test(testimonial)) failures.push('client cards do not expose their expanded state')
if (testimonial && !/Pending client approval/.test(testimonial)) failures.push('draft testimonial copy is not clearly marked pending client approval')
if (testimonial && /fonts\.googleapis\.com|Poppins/.test(testimonial)) failures.push('testimonial component breaks the shared Inter typography')
if (backgroundPaths && /Array\.from\(\{ length: (?:[2-9]\d|1\d\d+)/.test(backgroundPaths)) failures.push('final graphic renders too many animated paths')
if (backgroundPaths && /repeat:\s*Number\.POSITIVE_INFINITY/.test(backgroundPaths)) failures.push('final graphic uses unbounded JS animation')
if (backgroundPaths && !/bg-white/.test(backgroundPaths)) failures.push('final graphic background is not white')
if (backgroundPaths && !/import AetherRibbonMesh from ['"]@\/components\/ui\/aether-ribbon-mesh['"]/.test(backgroundPaths)) failures.push('final CTA does not import the Aether ribbon graphic')
if (backgroundPaths && !/<AetherRibbonMesh/.test(backgroundPaths)) failures.push('final CTA does not mount the Aether ribbon graphic')
if (backgroundPaths && /function EvidenceGraphic/.test(backgroundPaths)) failures.push('old footer evidence graphic remains mounted')
if (aetherRibbon && !/ResizeObserver/.test(aetherRibbon)) failures.push('Aether ribbon does not size itself to the footer section')
if (aetherRibbon && !/prefers-reduced-motion/.test(aetherRibbon)) failures.push('Aether ribbon lacks a reduced-motion fallback')
if (aetherRibbon && !/FRAME_INTERVAL/.test(aetherRibbon)) failures.push('Aether ribbon lacks a bounded frame-rate budget')
if (aetherRibbon && !/Math\.min\(window\.devicePixelRatio \|\| 1, 1\.25\)/.test(aetherRibbon)) failures.push('Aether ribbon canvas exceeds the lightweight DPR budget')
const kineticGridPath = join(root, 'src/components/ui/kinetic-grid.jsx')
let kineticGrid = ''
try { kineticGrid = readFileSync(kineticGridPath, 'utf8') } catch { failures.push('missing src/components/ui/kinetic-grid.jsx') }
if (kineticGrid && !/IntersectionObserver/.test(kineticGrid)) failures.push('Kinetic grid does not pause when its hero leaves the viewport')
if (kineticGrid && !/FRAME_INTERVAL/.test(kineticGrid)) failures.push('Kinetic grid lacks a bounded frame-rate budget')
if (kineticGrid && !/Math\.min\(window\.devicePixelRatio \|\| 1, 1\.25\)/.test(kineticGrid)) failures.push('Kinetic grid canvas exceeds the lightweight DPR budget')
if (!/content-visibility:auto/.test(css)) failures.push('shared sections do not skip offscreen rendering')
if (/html\{[^}]*scroll-behavior:smooth/.test(css)) failures.push('global document scrolling must remain immediate')
if (!/workbench-card[\s\S]{0,600}scan-field workbench-scan-overlay/.test(site)) failures.push('workbench scanner is not layered after the card')
if (/scan-field[^>]*>\s*<i[^>]*\/>\s*<span/.test(site)) failures.push('workbench scanner still renders background point decorations')
if (!/\.workbench-scan-overlay\{[^}]*z-index:4[^}]*pointer-events:none/.test(css)) failures.push('workbench scanner is not visibly layered over the card')
if (!/import \{ AboutUs, PricingCalculator, ProductFormat \} from ['"]@\/components\/ui\/product-led-sections['"]/.test(optionOne)) failures.push('Option 1 does not import the requested product-led sections through the UI alias')
if (!/productFormatCards/.test(optionOne) || !/<ProductFormat/.test(optionOne)) failures.push('Product format does not render the four Itera information cards around the centered logo')
if (/className="measurement section"[\s\S]{0,700}<Proof\s*\/>/.test(optionOne)) failures.push('Product format still renders the old plain proof list')
for (const phrase of ['15 min', '6 dimensions', '6 min', 'Continuous']) if (!optionOne.includes(phrase)) failures.push(`Product format card missing ${phrase}`)
if (optionOne.includes("metric: '~6 min'")) failures.push('Product format practice metric still includes a leading character before 6 min')
for (const contract of [
  ['Pricing calculator is missing', /<PricingCalculator\s*\/>/],
  ['About Us section is missing', /<AboutUs\s*\/>/],
  ['Centered Product Format composition is missing', /<ProductFormat\s+cards=\{productFormatCards\}/],
]) if (!contract[1].test(optionOne)) failures.push(contract[0])
for (const marker of ['price-slider', '149', 'Volume pricing', 'pablo.webp', 'Santiago Rosado', 'linkedin.com/in/pblcrmn']) requireText(`missing requested product-led content: ${marker}`, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'))
if (!/linear-gradient\(135deg/.test(howItWorks)) failures.push('HowItWorks lacks the requested diagonal comment-card motion direction')
if (glassCard && !/rounded-\[24px\]/.test(glassCard)) failures.push('GlassCard does not use the restrained Itera card radius')
if (glassCard && (/rounded-\[50px\]/.test(glassCard) || /30deg/.test(glassCard))) failures.push('GlassCard retains the over-designed reference geometry')
if (glassCard && !/motion-reduce:transform-none/.test(glassCard)) failures.push('GlassCard lacks a reduced-motion interaction fallback')
if (!/\.footer\{[^}]*background:#fff[^}]*color:var\(--ink\)/.test(css)) failures.push('footer is not a white, dark-copy surface')
for (const dependency of ['motion', 'framer-motion', '@radix-ui/react-slot', 'class-variance-authority']) if (!packageJson.dependencies?.[dependency]) failures.push(`missing runtime dependency ${dependency}`)
if (!packageJson.dependencies?.['lucide-react']) failures.push('missing runtime dependency lucide-react')
for (const dependency of ['tailwindcss', 'typescript']) if (!packageJson.devDependencies?.[dependency]) failures.push(`missing development dependency ${dependency}`)
if (failures.length) { console.error(`Verification failed:\n- ${failures.join('\n- ')}`); process.exit(1) }
console.log(`Verification passed: ${files.length} source files checked; three distinct graphics/compositions, motion hooks and reduced-motion fallback, exact logo, required routes, local font, 9-stage flows, evidence, sample labels, and approved destinations present.`)
