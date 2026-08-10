import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const collect = dir => readdirSync(dir).flatMap(name => {
  const path = join(dir, name)
  return statSync(path).isDirectory() ? collect(path) : [path]
})
const files = collect(join(root, 'src')).filter(x => /\.(jsx|js|css)$/.test(x))
const source = files.map(x => readFileSync(x, 'utf8')).join('\n')
const codeSource = files.filter(x => /\.(jsx|js)$/.test(x)).map(x => readFileSync(x, 'utf8')).join('\n')
const main = readFileSync(join(root, 'src/main.jsx'), 'utf8')
const optionThree = readFileSync(join(root, 'src/pages/OptionThree.jsx'), 'utf8')
const optionOne = readFileSync(join(root, 'src/pages/OptionOne.jsx'), 'utf8')
const optionTwo = readFileSync(join(root, 'src/pages/OptionTwo.jsx'), 'utf8')
const site = readFileSync(join(root, 'src/components/Site.jsx'), 'utf8')
const css = readFileSync(join(root, 'src/styles/global.css'), 'utf8')
const html = readFileSync(join(root, 'index.html'), 'utf8')
const failures = []
const requireText = (label, pattern) => { if (!pattern.test(source)) failures.push(label) }

for (const route of ['/itera-option-1','/itera-option-2','/itera-option-3']) {
  if (!main.includes(`'${route}'`)) failures.push(`missing route ${route}`)
}
for (const node of ['Company','Roles','AI Simulations','Evaluation','Adoption Data','Skill Gaps','Personalized Learning','Manager Dashboard','Measurable AI Adoption']) requireText(`missing flow node ${node}`, new RegExp(node))
for (const text of ['Sample data','57%','3×','$670K','44%','KPMG & University of Melbourne','McKinsey','IBM, Cost of a Data Breach Report 2025']) {
  if (!source.includes(text)) failures.push(`missing required evidence ${text}`)
}
for (const url of ['https://www.itera.la/demo','https://www.itera.la/case-demo','https://www.itera.la/auth/login','https://www.itera.la/auth/signup','mailto:hola@itera.la']) requireText(`missing approved destination ${url}`, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
if (/#2E6BFF/i.test(source)) failures.push('obsolete brand blue found')
if (/href=["']#["']/.test(source)) failures.push('dead # link found')
if (/testimonial|trusted by|customer logo/i.test(source)) failures.push('unapproved social proof language found')
for (const value of ['88', '82', '76', '84', '71', '91']) {
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
for (const text of ['This is how the customer list arrived', 'How the April campaign did', 'Decide what you do with each customer', '22%', '3.4%', '1.8%']) {
  if (!site.includes(text)) failures.push(`ProductScreens missing ${text}`)
}
if (!/export function ProductScreens/.test(site)) failures.push('reusable ProductScreens component missing')
if (!/<ProductScreens\s*\/>/.test(optionOne)) failures.push('ProductScreens is not mounted in Option 1')
if (/<ProductScreens\s*\/>/.test(optionTwo + optionThree)) failures.push('ProductScreens must only be mounted in Option 1')
if (!/\.product-screens-track\{[^}]*scroll-snap-type:x mandatory/.test(css) || !/\.product-screen\{[^}]*scroll-snap-align:start/.test(css)) failures.push('ProductScreens lacks deterministic 3-card scroll-snap styling')
if (failures.length) { console.error(`Verification failed:\n- ${failures.join('\n- ')}`); process.exit(1) }
console.log(`Verification passed: ${files.length} source files checked; three distinct graphics/compositions, motion hooks and reduced-motion fallback, exact logo, required routes, local font, 9-stage flows, evidence, sample labels, and approved destinations present.`)
