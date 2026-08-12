import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const optionOne = read('src/pages/OptionOne.jsx');
const optionFour = read('src/pages/OptionFour.jsx');
const site = read('src/components/Site.jsx');
const clients = read('src/components/ui/testimonial.tsx');
const styles = read('src/styles/global.css');

test('Option 1 and Kinetic Field share the requested finished content', () => {
  assert.match(optionOne, /<BuiltWithItera\s*\/>/);
  assert.match(optionOne, /<ProductScreens\s*\/>/);
  assert.match(optionOne, /<Testimonials\s*\/>/);
  assert.match(optionFour, /<ProductLedPage kinetic\s*\/>/);
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

test('client proof uses supplied brand images', () => {
  for (const logo of ['ponte-advisory.webp', 'aurea-legal.webp', 'serena-health.webp']) {
    assert.match(clients, new RegExp(`/client-logos/${logo}`));
  }
});
