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

test('Kinetic Field uses the requested compact manager copy and breathing room', () => {
  assert.match(styles, /\.option-four \.manager-scroll-copy-kinetic\{[^}]*padding-block:clamp\(48px,7vw,80px\)/);
  assert.match(styles, /\.option-four \.manager-scroll-copy-kinetic h2\{[^}]*font-size:clamp\(28px,3vw,40px\)/);
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
  for (const logo of ['ponte.webp', 'aurea.webp', 'serena.webp']) {
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
