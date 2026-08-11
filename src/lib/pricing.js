const LIST_PRICE_PER_SEAT = 149

export function normalizeSeats(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return 1
  return Math.max(1, Math.round(numeric))
}

export function calculateMonthlyPrice(seats) {
  return normalizeSeats(seats) * LIST_PRICE_PER_SEAT
}

export { LIST_PRICE_PER_SEAT }
