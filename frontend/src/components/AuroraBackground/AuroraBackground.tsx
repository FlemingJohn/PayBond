import { useEffect, useRef } from "react"
import styles from "./AuroraBackground.module.css"

type Star = {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
}

type ShootingStar = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

type Layer = {
  index: number
  speed: number
  scale: number
  alpha: number
  primaryColor: string
  secondaryColor: string
}

const layers: Layer[] = [
  { index: 0, speed: 0.8, scale: 1.2, alpha: 0.4, primaryColor: "rgba(255, 46, 46, ALPHA)", secondaryColor: "rgba(200, 30, 44, ALPHA)" },
  { index: 1, speed: 0.5, scale: 1.45, alpha: 0.58, primaryColor: "rgba(255, 90, 77, ALPHA)", secondaryColor: "rgba(150, 20, 30, ALPHA)" },
  { index: 2, speed: 0.35, scale: 0.95, alpha: 0.32, primaryColor: "rgba(220, 40, 52, ALPHA)", secondaryColor: "rgba(120, 16, 26, ALPHA)" }
]

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: 0, targetY: 0 })
  const scrollRef = useRef({ currentY: 0, lastY: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let w = (canvas.width = window.innerWidth || 800)
    let h = (canvas.height = window.innerHeight || 600)
    let time = 0

    scrollRef.current.lastY = window.scrollY || 0
    scrollRef.current.currentY = window.scrollY || 0

    const stars: Star[] = []
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.75,
        size: Math.random() * 1.6 + 0.4,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: 0.01 + Math.random() * 0.04
      })
    }

    const shootingStars: ShootingStar[] = []

    const spawnShootingStar = () => {
      const angle = Math.PI * 0.15 + Math.random() * Math.PI * 0.1
      const speed = 12 + Math.random() * 15
      const duration = 25 + Math.random() * 20
      shootingStars.push({
        x: Math.random() * w * 0.6,
        y: Math.random() * h * 0.3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: duration,
        maxLife: duration
      })
    }

    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.targetX = event.clientX
      mouseRef.current.targetY = event.clientY
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    const sliceStep = 4
    let animationId = 0

    const animate = () => {
      time += 0.005

      const currentScrollY = window.scrollY || 0
      scrollRef.current.currentY += (currentScrollY - scrollRef.current.currentY) * 0.1
      if (isNaN(scrollRef.current.currentY) || !isFinite(scrollRef.current.currentY)) {
        scrollRef.current.currentY = currentScrollY
      }
      scrollRef.current.lastY = currentScrollY

      const targetX = isNaN(mouseRef.current.targetX) ? 0 : mouseRef.current.targetX
      const targetY = isNaN(mouseRef.current.targetY) ? 0 : mouseRef.current.targetY
      mouseRef.current.x += (targetX - mouseRef.current.x) * 0.08
      mouseRef.current.y += (targetY - mouseRef.current.y) * 0.08
      if (isNaN(mouseRef.current.x)) mouseRef.current.x = -1000
      if (isNaN(mouseRef.current.y)) mouseRef.current.y = -1000

      ctx.fillStyle = "#08080a"
      ctx.fillRect(0, 0, w, h)

      stars.forEach((star) => {
        const twinkle = Math.sin(time * 20 * star.twinkleSpeed) * 0.4 + 0.6
        ctx.fillStyle = `rgba(255, 240, 235, ${star.opacity * twinkle})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * (0.8 + twinkle * 0.2), 0, Math.PI * 2)
        ctx.fill()
      })

      if (!reduced && Math.random() < 0.012 && shootingStars.length < 3) {
        spawnShootingStar()
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i]
        star.life--
        if (star.life <= 0) {
          shootingStars.splice(i, 1)
          continue
        }
        const pct = star.life / star.maxLife
        const startX = isNaN(star.x) ? 0 : star.x
        const startY = isNaN(star.y) ? 0 : star.y
        const vx = isNaN(star.vx) ? 0 : star.vx
        const vy = isNaN(star.vy) ? 0 : star.vy
        if (isFinite(startX) && isFinite(startY)) {
          ctx.save()
          ctx.globalCompositeOperation = "screen"
          const grad = ctx.createLinearGradient(startX, startY, startX - vx * 1.5, startY - vy * 1.5)
          grad.addColorStop(0, `rgba(255, 255, 255, ${pct})`)
          grad.addColorStop(0.3, `rgba(255, 90, 77, ${pct * 0.5})`)
          grad.addColorStop(1, "rgba(0, 0, 0, 0)")
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.8
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(startX - vx * 1.2, startY - vy * 1.2)
          ctx.stroke()
          ctx.restore()
        }
        star.x += star.vx
        star.y += star.vy
      }

      ctx.globalCompositeOperation = "screen"

      layers.forEach((layer) => {
        for (let x = 0; x < w; x += sliceStep) {
          const normX = w > 0 ? x / w : 0
          const baseWaveHeight = h * (0.08 + layer.index * 0.12)
          const waveA = Math.sin(normX * Math.PI * 1.8 + time * layer.speed + layer.index * 2.5) * 85
          const waveB = Math.cos(normX * Math.PI * 3.5 - time * layer.speed * 0.6) * 25

          const mouseDx = x - mouseRef.current.x
          let mouseDeformY = 0
          if (isFinite(mouseDx) && Math.abs(mouseDx) < 300) {
            const pull = 1 - Math.abs(mouseDx) / 300
            mouseDeformY = Math.sin(time * 3 + layer.index) * 45 * pull
          }

          const scrollParallax = (scrollRef.current.currentY || 0) * (0.12 + layer.index * 0.08)
          const curtainY = baseWaveHeight + waveA + waveB + mouseDeformY + scrollParallax

          const foldFreq = 0.02 + layer.index * 0.008
          const foldVelocity = 1.3 + layer.index * 0.45
          const foldSin = Math.sin(x * foldFreq + time * foldVelocity)
          const foldSubSin = Math.sin(x * (foldFreq * 2.2) - time * 0.8) * 0.25
          const foldBrightness = Math.pow((foldSin + foldSubSin) * 0.5 + 0.5, 3.8)

          const shaftHeight = (200 + foldBrightness * 110 + Math.sin(normX * 15 - time * 2.2) * 25) * layer.scale
          const alpha = (0.015 + foldBrightness * 0.22) * layer.alpha

          if (!isFinite(curtainY) || !isFinite(shaftHeight) || shaftHeight <= 0) continue

          const gradient = ctx.createLinearGradient(x, curtainY, x, curtainY + shaftHeight)
          gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
          gradient.addColorStop(0.12, layer.primaryColor.replace("ALPHA", (alpha * 1.6).toString()))
          gradient.addColorStop(0.48, layer.secondaryColor.replace("ALPHA", alpha.toString()))
          gradient.addColorStop(0.82, `rgba(85, 7, 12, ${alpha * 0.4})`)
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = gradient
          ctx.fillRect(x, curtainY, sliceStep + 0.5, shaftHeight)
        }
      })

      ctx.globalCompositeOperation = "source-over"

      const vignette = ctx.createLinearGradient(0, h * 0.7, 0, h)
      vignette.addColorStop(0, "rgba(10, 10, 11, 0)")
      vignette.addColorStop(1, "#0a0a0b")
      ctx.fillStyle = vignette
      ctx.fillRect(0, h * 0.7, w, h * 0.3)

      if (!reduced) animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
