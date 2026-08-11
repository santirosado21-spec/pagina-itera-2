import { useCallback, useEffect, useRef } from 'react'

const CELL_SIZE = 55
const INFLUENCE_RADIUS = 260
const MAX_WARP = 24
const LERP_SPEED = 0.08
const FRAME_INTERVAL = 1000 / 30
const LINE_BASE = { r: 255, g: 255, b: 255, a: 0.13 }

const lerp = (a, b, t) => a + (b - a) * t
const color = (base, active, t) => {
  const r = Math.round(lerp(base.r, active.r, t))
  const g = Math.round(lerp(base.g, active.g, t))
  const b = Math.round(lerp(base.b, active.b, t))
  return `rgba(${r},${g},${b},${lerp(base.a, active.a, t).toFixed(3)})`
}

export default function KineticGrid({ className = '', children }) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const targetMouseRef = useRef({ x: -9999, y: -9999 })
  const ripplesRef = useRef([])
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })
  const rafRef = useRef(0)
  const visibleRef = useRef(true)
  const lastFrameRef = useRef(0)

  const warpedPoint = useCallback((gx, gy, col, row, mouse, ripples, cols, rows) => {
    const edgeMargin = 1.5
    const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1)
    const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1)
    const pin = colPin * colPin * rowPin * rowPin
    const dx = gx - mouse.x
    const dy = gy - mouse.y
    const distance = Math.hypot(dx, dy)
    const proximity = Math.max(0, 1 - distance / INFLUENCE_RADIUS) * pin
    let rippleX = 0
    let rippleY = 0

    for (const ripple of ripples) {
      const rdx = gx - ripple.x
      const rdy = gy - ripple.y
      const rippleDistance = Math.hypot(rdx, rdy)
      const difference = rippleDistance - ripple.radius
      if (Math.abs(difference) < 55) {
        const strength = (1 - Math.abs(difference) / 55) * ripple.opacity * 18 * pin
        const angle = Math.atan2(rdy, rdx)
        const sign = difference < 0 ? -1 : 1
        rippleX += Math.cos(angle) * strength * sign * -1
        rippleY += Math.sin(angle) * strength * sign * -1
      }
    }

    if (distance < INFLUENCE_RADIUS && distance > 0 && pin > 0) {
      const t = distance / INFLUENCE_RADIUS
      const eased = t < 0.01 ? 0 : (1 - t) ** 2 * Math.min(1, distance / 60)
      const amount = eased * MAX_WARP * pin
      const angle = Math.atan2(dy, dx)
      return {
        point: { x: gx - Math.cos(angle) * amount + rippleX, y: gy - Math.sin(angle) * amount + rippleY },
        proximity,
      }
    }

    return { point: { x: gx + rippleX, y: gy + rippleY }, proximity }
  }, [])

  const draw = useCallback((now = performance.now()) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const { w, h, dpr } = sizeRef.current
    const mouse = mouseRef.current
    const ripples = ripplesRef.current

    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    context.clearRect(0, 0, w, h)


    for (let index = ripples.length - 1; index >= 0; index -= 1) {
      const ripple = ripples[index]
      const age = (now - ripple.born) / 1000
      ripple.radius = Math.max(0, age * 400)
      ripple.opacity = Math.max(0, 1 - age * 1.2)
      if (ripple.opacity <= 0) ripples.splice(index, 1)
    }

    const cols = Math.max(2, Math.ceil(w / CELL_SIZE)) + 1
    const rows = Math.max(2, Math.ceil(h / CELL_SIZE)) + 1
    const cellWidth = w / (cols - 1)
    const cellHeight = h / (rows - 1)
    const points = []
    const proximities = []

    for (let row = 0; row < rows; row += 1) {
      points[row] = []
      proximities[row] = []
      for (let col = 0; col < cols; col += 1) {
        const result = warpedPoint(col * cellWidth, row * cellHeight, col, row, mouse, ripples, cols, rows)
        points[row][col] = result.point
        proximities[row][col] = result.proximity
      }
    }

    const activeLine = { r: 0, g: 58, b: 255, a: .95 }
    const drawSegment = (a, b, proximityA, proximityB) => {
      const average = (proximityA + proximityB) / 2
      const t = average * average * (3 - 2 * average)
      context.beginPath()
      context.moveTo(a.x, a.y)
      context.lineTo(b.x, b.y)
      context.strokeStyle = color(LINE_BASE, activeLine, t)
      context.lineWidth = lerp(.8, 1.5, t)
      context.stroke()
    }

    context.lineCap = 'butt'
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols - 1; col += 1) drawSegment(points[row][col], points[row][col + 1], proximities[row][col], proximities[row][col + 1])
    }
    for (let col = 0; col < cols; col += 1) {
      for (let row = 0; row < rows - 1; row += 1) drawSegment(points[row][col], points[row + 1][col], proximities[row][col], proximities[row + 1][col])
    }

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const point = points[row][col]
        const proximity = proximities[row][col]
        const t = proximity * proximity * (3 - 2 * proximity)
        const radius = lerp(1.8, 3.2, t)
        if (t > .3) {
          const glowRadius = radius + lerp(0, 6, (t - .3) / .7)
          const gradient = context.createRadialGradient(point.x, point.y, radius * .5, point.x, point.y, glowRadius)
          gradient.addColorStop(0, `rgba(0,58,255,${(t * .42).toFixed(3)})`)
          gradient.addColorStop(1, 'rgba(0,58,255,0)')
          context.beginPath()
          context.arc(point.x, point.y, glowRadius, 0, Math.PI * 2)
          context.fillStyle = gradient
          context.fill()
        }
        context.beginPath()
        context.arc(point.x, point.y, radius, 0, Math.PI * 2)
        context.fillStyle = color({ r: 255, g: 255, b: 255, a: .2 }, { r: 80, g: 132, b: 255, a: 1 }, t)
        context.fill()
      }
    }

    for (const ripple of ripples) {
      context.beginPath()
      context.arc(ripple.x, ripple.y, Math.max(0, ripple.radius), 0, Math.PI * 2)
      context.strokeStyle = `rgba(124,200,255,${(ripple.opacity * .35).toFixed(3)})`
      context.lineWidth = 1.5
      context.stroke()
    }
  }, [warpedPoint])

  const animate = useCallback((now) => {
    if (!visibleRef.current || document.hidden) return
    if (now - lastFrameRef.current < FRAME_INTERVAL) {
      rafRef.current = requestAnimationFrame(animate)
      return
    }
    lastFrameRef.current = now
    mouseRef.current.x = lerp(mouseRef.current.x, targetMouseRef.current.x, LERP_SPEED)
    mouseRef.current.y = lerp(mouseRef.current.y, targetMouseRef.current.y, LERP_SPEED)
    draw(now)
    rafRef.current = requestAnimationFrame(animate)
  }, [draw])

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return undefined
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const setSize = () => {
      const rect = root.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      sizeRef.current = { w: rect.width, h: rect.height, dpr }
      draw()
    }
    const pointInGrid = (event) => {
      const rect = root.getBoundingClientRect()
      const point = { x: event.clientX - rect.left, y: event.clientY - rect.top }
      return point.x >= 0 && point.y >= 0 && point.x <= rect.width && point.y <= rect.height ? point : null
    }
    const onMove = (event) => {
      const point = pointInGrid(event)
      targetMouseRef.current = point || { x: -9999, y: -9999 }
    }
    const onClick = (event) => {
      const point = pointInGrid(event)
      if (point) ripplesRef.current.push({ ...point, radius: 0, opacity: 1, born: performance.now() })
    }

    const resizeObserver = new ResizeObserver(setSize)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const wasVisible = visibleRef.current
      visibleRef.current = entry.isIntersecting
      if (!entry.isIntersecting) cancelAnimationFrame(rafRef.current)
      else if (!wasVisible && !reducedMotion) {
        lastFrameRef.current = 0
        rafRef.current = requestAnimationFrame(animate)
      }
    }, { rootMargin: '100px' })
    const onVisibilityChange = () => {
      cancelAnimationFrame(rafRef.current)
      if (!document.hidden && visibleRef.current && !reducedMotion) rafRef.current = requestAnimationFrame(animate)
    }
    resizeObserver.observe(root)
    visibilityObserver.observe(root)
    document.addEventListener('visibilitychange', onVisibilityChange)
    setSize()
    if (!reducedMotion) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('click', onClick)
      rafRef.current = requestAnimationFrame(animate)
    }

    return () => {
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('click', onClick)
      cancelAnimationFrame(rafRef.current)
    }
  }, [animate, draw])

  return <div ref={rootRef} className={`kinetic-grid ${className}`} aria-hidden={children ? undefined : 'true'}><canvas ref={canvasRef} /><div className="kinetic-grid-content">{children}</div></div>
}
