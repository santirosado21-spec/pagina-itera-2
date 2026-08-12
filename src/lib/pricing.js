const MIN_SEATS = 30
const SLIDER_MAX_SEATS = 10000

const PRICING_TIERS = [
  { name: 'Department', price: 149, min: 30, max: 99, range: '30–99 seats' },
  { name: 'Growth', price: 129, min: 100, max: 249, range: '100–249 seats' },
  { name: 'Scale', price: 109, min: 250, max: 999, range: '250–999 seats' },
  { name: 'Enterprise', price: 89, min: 1000, max: Infinity, range: '1000+ seats' },
]

export function normalizeSeats(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return MIN_SEATS
  return Math.max(MIN_SEATS, Math.round(numeric))
}

export function getPricingTier(seats) {
  const normalized = normalizeSeats(seats)
  const tier = PRICING_TIERS.find(item => normalized >= item.min && normalized <= item.max) ?? PRICING_TIERS[0]
  return { name: tier.name, price: tier.price, range: tier.range }
}

export function calculateMonthlyPrice(seats) {
  const normalized = normalizeSeats(seats)
  return normalized * getPricingTier(normalized).price
}

export function sliderToSeats(value) {
  const position = Math.min(1000, Math.max(0, Math.round(Number(value) || 0)))
  const tierIndex = Math.min(PRICING_TIERS.length - 1, Math.floor(position / 250))
  const tier = PRICING_TIERS[tierIndex]
  const segmentStart = tierIndex * 250
  const segmentProgress = (position - segmentStart) / (tierIndex === PRICING_TIERS.length - 1 ? 250 : 249)
  const sliderMax = Number.isFinite(tier.max) ? tier.max : SLIDER_MAX_SEATS
  return Math.round(tier.min + Math.min(1, segmentProgress) * (sliderMax - tier.min))
}

export function seatsToSlider(seats) {
  const normalized = normalizeSeats(seats)
  const tierIndex = PRICING_TIERS.findIndex(item => normalized >= item.min && normalized <= item.max)
  const tier = PRICING_TIERS[tierIndex]
  const sliderMax = Number.isFinite(tier.max) ? tier.max : SLIDER_MAX_SEATS
  const segmentProgress = Math.min(1, (normalized - tier.min) / Math.max(1, sliderMax - tier.min))
  return Math.round(tierIndex * 250 + segmentProgress * (tierIndex === PRICING_TIERS.length - 1 ? 250 : 249))
}

export { MIN_SEATS, PRICING_TIERS, SLIDER_MAX_SEATS }
