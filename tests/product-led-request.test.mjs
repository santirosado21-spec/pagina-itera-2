import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const optionOne = read('src/pages/OptionOne.jsx');
const optionFour = read('src/pages/OptionFour.jsx');
const site = read('src/components/Site.jsx');
const clients = read('src/components/ui/testimonial.tsx');
const styles = read('src/styles/global.css');

test('Kinetic Field omits the unrequested Living Stack section', () => {
  assert.match(optionOne, /\{!kinetic\s*&&\s*<BuiltWithItera/);
  assert.doesNotMatch(optionFour, /BuiltWithItera/);
});

test('Kinetic Field uses a smaller dashboard with bottom breathing room on a pricing-blue grid', () => {
  assert.match(styles, /\.option-four \.manager-scroll-copy-kinetic\{[^}]*padding-block:clamp\(36px,5vw,56px\)/);
  assert.match(styles, /\.option-four \.manager-scroll-copy-kinetic h2\{[^}]*font-size:clamp\(26px,2\.6vw,36px\)/);
  assert.match(styles, /\.option-four \.lab-manager\{[^}]*background-color:#071426[^}]*background-image:linear-gradient/);
  assert.match(styles, /\.option-four \.lab-manager>div\{[^}]*height:clamp\(820px,76vw,960px\)[^}]*padding-bottom:clamp\(96px,10vw,136px\)/);
  assert.match(styles, /\.option-four \.lab-manager \.container-scroll-card\{[^}]*height:clamp\(460px,44vw,520px\)/);
});

test('Kinetic Field centers each product-format icon in its circle', () => {
  const card = read('src/components/ui/glass-card.tsx');
  assert.match(card, /product-format-icon-circle/);
  assert.match(card, /product-format-icon[^\n]*m-auto/);
  assert.match(read('src/components/ui/product-led-sections.tsx'), /product-format-card-kinetic/);
  assert.match(styles, /\.option-four \.product-format-card-kinetic \.product-format-icon-circle/);
});

test('Kinetic Field client cards explain each sector and how Itera helped', () => {
  for (const copy of [
    'Professional services',
    'Legal services',
    'Healthcare',
    'client-facing advisory work',
    'legal workflows',
    'healthcare workflows',
  ]) assert.match(clients, new RegExp(copy, 'i'));
  assert.match(clients, /client-sector/);
  assert.match(clients, /client-impact/);
  assert.match(clients, /serena-clean\.webp/);
});

test('Kinetic Field mobile layout keeps controls off content and compacts the dashboard', () => {
  assert.match(styles, /@media\(max-width:767px\)\{[^}]*\.background-proposal-switcher\{display:none/);
  assert.match(styles, /\.option-four \.dashboard\{padding:20px/);
  assert.match(styles, /\.option-four \.dashboard-metrics\{grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(styles, /\.option-four \.dashboard-metrics strong\{font-size:clamp\(26px,8vw,34px\)/);
  assert.match(styles, /\.option-four \.team-list>div\{grid-template-columns:26px minmax\(0,1fr\) 38px/);
  assert.match(styles, /\.option-four \.client-card-names-only \.client-sector\{[^}]*font-size:12px/);
  assert.match(styles, /\.option-four \.workbench-card\{padding:28px/);
  assert.match(styles, /\.option-four \.product-format-card-kinetic>div\{transform:none!important;transition:none!important/);
  assert.match(styles, /\.option-four \.product-format-card-kinetic \.product-format-icon-orbit\{[^}]*transform:none!important/);
  assert.match(styles, /\.option-four \.product-format-card-kinetic \.product-format-icon-circle\{[^}]*transform:translate3d\(-50%,-50%,0\)!important;transition:none!important/);
});

test('Kinetic Field calculator uses the requested tiers without the blue Pricing calculator label', () => {
  const sections = read('src/components/ui/product-led-sections.tsx');
  assert.match(sections, /\{!tiered\s*&&\s*<p className="eyebrow">Pricing calculator<\/p>\}/);
  for (const [name, price, range] of [
    ['Department', 149, '30–99 seats'],
    ['Growth', 129, '100–249 seats'],
    ['Scale', 109, '250–999 seats'],
    ['Enterprise', 89, '1000\\+ seats'],
  ]) {
    assert.match(sections + read('src/lib/pricing.js'), new RegExp(name));
    assert.match(sections + read('src/lib/pricing.js'), new RegExp(String(price)));
    assert.match(sections + read('src/lib/pricing.js'), new RegExp(range));
  }
});

test('Kinetic Field uses Santiago blue-background portrait', () => {
  const sections = read('src/components/ui/product-led-sections.tsx');
  assert.match(sections, /kineticImage:\s*"\/team\/santiago-rosado-blue-full\.webp"/);
  assert.match(sections, /src=\{kinetic \? person\.kineticImage : person\.image\}/);
});

test('Option 1 and Kinetic Field share the requested finished content', () => {
  assert.match(optionOne, /<BuiltWithItera/);
  assert.match(optionOne, /<ProductScreens\s*\/>/);
  assert.match(optionOne, /<Testimonials namesOnly=\{kinetic\}\s*\/>/);
  assert.match(optionFour, /<ProductLedPage kinetic background=\{background\}\s*\/>/);
});

test('product gallery restores two demos for five total views', () => {
  assert.match(site, /Five sample views of team judgment/);
  assert.match(site, /new ResizeObserver\(syncPosition\)/);
  assert.match(site, /requestAnimationFrame\(syncPosition\)/);
  assert.match(site, /step="4"/);
  assert.match(site, /step="5"/);
  assert.match(site, /Case decision/);
  assert.match(site, /Targeted practice/);
  assert.match(site, /\{step\}\/5/);
});

test('Built with Itera uses five real local logos and centered liquid glass', () => {
  const built = read('src/components/ui/built-with-itera.tsx');
  for (const brand of ['anthropic', 'openai', 'voyage', 'supabase', 'stripe']) {
    assert.match(built, new RegExp(`/brand-logos/${brand}\\.svg`));
  }
  assert.match(built, /built-with-itera__side/);
  assert.match(built, /built-with-itera__core/);
  assert.match(built, /liquid-glass-panel/);
  assert.match(styles, /\.option-one \.liquid-glass-panel/);
  assert.match(styles, /backdrop-filter:blur\(/);
});

test('Kinetic Field organization mode uses name-only crops', () => {
  for (const logo of ['ponte.webp', 'aurea.webp', 'serena-clean.webp']) {
    assert.match(clients, new RegExp(`/client-logos/${logo}`));
  }
  assert.match(optionOne, /namesOnly=\{kinetic\}/);
});

test('Kinetic Field supports three background proposals and removes decorative logo orbits there', () => {
  assert.match(optionFour, /signal.*blueprint.*midnight/);
  assert.match(optionOne, /staticHub=\{kinetic\}/);
  assert.match(optionOne, /\{!kinetic\s*&&\s*<BuiltWithItera/);
  assert.match(styles, /option-four-bg-signal/);
  assert.match(styles, /option-four-bg-blueprint/);
  assert.match(styles, /option-four-bg-midnight/);
});

test('tiered range pricing is enabled only for Kinetic Field', () => {
  assert.match(optionOne, /<PricingCalculator tiered=\{kinetic\}/);
});

test('Kinetic Field isolates founder portraits and exposes an accessible background picker', () => {
  assert.match(optionOne, /<AboutUs kinetic=\{kinetic\}/);
  assert.match(optionFour, /background-proposal-switcher/);
  assert.match(optionFour, /aria-current/);
});
