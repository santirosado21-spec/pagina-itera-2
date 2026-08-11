import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateMonthlyPrice, normalizeSeats } from '../src/lib/pricing.js'

test('normalizes seat count without imposing an undocumented team-size maximum', () => {
  assert.equal(normalizeSeats(-4), 1)
  assert.equal(normalizeSeats(24.8), 25)
  assert.equal(normalizeSeats(1200), 1200)
})

test('calculates the documented monthly list price of 149 USD per seat', () => {
  assert.equal(calculateMonthlyPrice(1), 149)
  assert.equal(calculateMonthlyPrice(10), 1490)
  assert.equal(calculateMonthlyPrice(1000), 149000)
})
