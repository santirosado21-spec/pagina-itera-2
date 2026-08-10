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
let howItWorks = ''
let containerScroll = ''
let backgroundPaths = ''
let testimonial = ''
try { howItWorks = readFileSync(howItWorksPath, 'utf8') } catch { failures.push('missing src/components/ui/how-it-works.tsx') }
try { containerScroll = readFileSync(containerScrollPath, 'utf8') } catch { failures.push('missing src/components/ui/container-scroll-animation.tsx') }
try { backgroundPaths = readFileSync(backgroundPathsPath, 'utf8') } catch { failures.push('missing src/components/ui/background-paths.tsx') }
try { testimonial = readFileSync(testimonialPath, 'utf8') } catch { failures.push('missing src/components/ui/testimonial.tsx') }
if (!/import HowItWorks from ['"]@\/components\/ui\/how-it-works['"]/.test(optionOne)) failures.push('Option 1 does not import HowItWorks through the @/components/ui alias')
if (!/<HowItWorks\s+features=\{/.test(optionOne)) failures.push('Option 1 does not mount the nine-card HowItWorks graphic with Itera data')
if (/<HorizontalFlow\s*\/>/.test(optionOne)) failures.push('Option 1 still mounts the circular HorizontalFlow')
if (!/import \{ ContainerScroll \} from ['"]@\/components\/ui\/container-scroll-animation['"]/.test(optionOne)) failures.push('Option 1 does not import ContainerScroll through the @/components/ui alias')
if (!/<ContainerScroll/.test(optionOne)) failures.push('Option 1 does not mount the 3D scroll animation')
if (howItWorks && (howItWorks.match(/title:/g) || []).length < 9 && !/features/.test(howItWorks)) failures.push('HowItWorks is not prepared for all nine Itera stages')
if (howItWorks && !/useReducedMotion/.test(howItWorks)) failures.push('HowItWorks animated path lacks a reduced-motion fallback')
if (howItWorks && !/lg:block lg:h-\[var\(--process-height\)\]/.test(howItWorks)) failures.push('HowItWorks does not preserve the safe stacked layout through tablet widths')
if (containerScroll && !/prefers-reduced-motion/.test(containerScroll)) failures.push('ContainerScroll lacks a deterministic reduced-motion fallback')
if (containerScroll && !/overflow-y-auto[\s\S]*md:overflow-hidden/.test(containerScroll)) failures.push('ContainerScroll can clip the mobile dashboard instead of allowing access')
if (!/import \{ BackgroundPaths \} from ['"]@\/components\/ui\/background-paths['"]/.test(optionOne)) failures.push('Option 1 does not import the animated BackgroundPaths CTA')
if (!/<BackgroundPaths[\s\S]*title=/.test(optionOne)) failures.push('Product-led options do not end with the BackgroundPaths CTA')
if (backgroundPaths && !/href=\{primaryHref\}/.test(backgroundPaths)) failures.push('BackgroundPaths CTA does not use a real link destination')
if (backgroundPaths && !/useReducedMotion/.test(backgroundPaths)) failures.push('BackgroundPaths lacks a reduced-motion fallback')
if (!/import Testimonials from ['"]@\/components\/ui\/testimonial['"]/.test(optionOne)) failures.push('Option 1 does not import the client testimonial section')
if (!/<Testimonials\s*\/>/.test(optionOne)) failures.push('Product-led options do not mount the client testimonial section')
for (const client of ['Ponte Advisory', 'Aurela Legal', 'Serena Health']) if (!testimonial.includes(client)) failures.push(`missing approved client ${client}`)
if (testimonial && !/Pending client approval/.test(testimonial)) failures.push('draft testimonial copy is not clearly marked pending client approval')
if (testimonial && /fonts\.googleapis\.com|Poppins/.test(testimonial)) failures.push('testimonial component breaks the shared Inter typography')
for (const dependency of ['motion', 'framer-motion', '@radix-ui/react-slot', 'class-variance-authority']) if (!packageJson.dependencies?.[dependency]) failures.push(`missing runtime dependency ${dependency}`)
for (const dependency of ['tailwindcss', 'typescript']) if (!packageJson.devDependencies?.[dependency]) failures.push(`missing development dependency ${dependency}`)
if (failures.length) { console.error(`Verification failed:\n- ${failures.join('\n- ')}`); process.exit(1) }
console.log(`Verification passed: ${files.length} source files checked; three distinct graphics/compositions, motion hooks and reduced-motion fallback, exact logo, required routes, local font, 9-stage flows, evidence, sample labels, and approved destinations present.`)
