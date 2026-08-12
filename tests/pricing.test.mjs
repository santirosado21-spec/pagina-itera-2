import test from 'node:test'
import assert from 'node:assert/strict'
import { getPricingTier, normalizeSeats, seatsToSlider, sliderToSeats } from '../src/lib/pricing.js'

test('normalizes seat count without imposing an Enterprise maximum', () => {
  assert.equal(normalizeSeats(-4), 30)
  assert.equal(normalizeSeats(24.8), 30)
  assert.equal(normalizeSeats(1200.4), 1200)
  assert.equal(normalizeSeats(12001), 12001)
})

test('selects Department from 30 through 99 seats', () => {
  assert.deepEqual(getPricingTier(30), { name: 'Department', price: 149, range: '30–99 seats' })
  assert.equal(getPricingTier(99).name, 'Department')
})

test('selects Growth from 100 through 249 seats', () => {
  assert.deepEqual(getPricingTier(100), { name: 'Growth', price: 129, range: '100–249 seats' })
  assert.equal(getPricingTier(249).name, 'Growth')
})

test('selects Scale from 250 through 999 seats', () => {
  assert.deepEqual(getPricingTier(250), { name: 'Scale', price: 109, range: '250–999 seats' })
  assert.equal(getPricingTier(999).name, 'Scale')
})

test('selects Enterprise from 1000 seats with no upper limit', () => {
  assert.deepEqual(getPricingTier(1000), { name: 'Enterprise', price: 89, range: '1000+ seats' })
  assert.equal(getPricingTier(10000).name, 'Enterprise')
  assert.equal(getPricingTier(10001).name, 'Enterprise')
  assert.equal(getPricingTier(100000).price, 89)
})

test('slider dedicates one quarter of its line to each pricing tier', () => {
  assert.equal(sliderToSeats(0), 30)
  assert.equal(sliderToSeats(249), 99)
  assert.equal(sliderToSeats(250), 100)
  assert.equal(sliderToSeats(500), 250)
  assert.equal(sliderToSeats(750), 1000)
  assert.equal(sliderToSeats(1000), 10000)
  assert.equal(seatsToSlider(99), 249)
  assert.equal(seatsToSlider(100), 250)
  assert.equal(seatsToSlider(10001), 1000)
})
