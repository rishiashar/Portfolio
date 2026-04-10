"use client"

import { useEffect, useRef } from "react"

// Interactive particle field — dots respond to cursor proximity
// Uses canvas + requestAnimationFrame for 60fps, not React state
const COLS = 18
const ROWS = 18
const DOT_RADIUS = 1.5
const INFLUENCE_RADIUS = 120
const PUSH_STRENGTH = 28
const RETURN_SPEED = 0.08

// Apple spectrum colors at low opacity for influenced particles
const ACCENT_COLORS = [
  "rgba(66, 165, 244, 0.6)",
  "rgba(224, 64, 251, 0.5)",
  "rgba(255, 82, 82, 0.5)",
  "rgba(255, 145, 0, 0.5)",
  "rgba(105, 240, 174, 0.5)",
]

interface Particle {
  homeX: number
  homeY: number
  x: number
  y: number
  vx: number
  vy: number
}

export const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)

      // Rebuild particles on resize
      const spacingX = rect.width / (COLS + 1)
      const spacingY = rect.height / (ROWS + 1)
      const particles: Particle[] = []
      for (let row = 1; row <= ROWS; row++) {
        for (let col = 1; col <= COLS; col++) {
          particles.push({
            homeX: col * spacingX,
            homeY: row * spacingY,
            x: col * spacingX,
            y: row * spacingY,
            vx: 0,
            vy: 0,
          })
        }
      }
      particlesRef.current = particles
    }

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    // Touch support
    const handleTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      if (touch) {
        mouseRef.current = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        }
      }
    }

    const handleTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mx - p.homeX
        const dy = my - p.homeY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < INFLUENCE_RADIUS) {
          // Push away from cursor
          const force = (1 - dist / INFLUENCE_RADIUS) * PUSH_STRENGTH
          const angle = Math.atan2(dy, dx)
          p.vx += -Math.cos(angle) * force * 0.15
          p.vy += -Math.sin(angle) * force * 0.15
        }

        // Spring back to home position
        p.vx += (p.homeX - p.x) * RETURN_SPEED
        p.vy += (p.homeY - p.y) * RETURN_SPEED

        // Damping
        p.vx *= 0.82
        p.vy *= 0.82

        p.x += p.vx
        p.y += p.vy

        // Distance from home for visual feedback
        const displacement = Math.sqrt(
          (p.x - p.homeX) ** 2 + (p.y - p.homeY) ** 2
        )
        const influence = Math.min(displacement / 20, 1)

        // Draw particle
        const radius = DOT_RADIUS + influence * 3
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)

        if (influence > 0.15) {
          // Color from Apple spectrum based on position
          const colorIdx =
            Math.floor((p.homeX / rect.width) * ACCENT_COLORS.length) %
            ACCENT_COLORS.length
          ctx.fillStyle = ACCENT_COLORS[colorIdx]
        } else {
          ctx.fillStyle = "rgba(26, 26, 26, 0.12)"
        }

        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    canvas.addEventListener("mousemove", handleMove)
    canvas.addEventListener("mouseleave", handleLeave)
    canvas.addEventListener("touchmove", handleTouch, { passive: true })
    canvas.addEventListener("touchend", handleTouchEnd)
    window.addEventListener("resize", resize)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener("mousemove", handleMove)
      canvas.removeEventListener("mouseleave", handleLeave)
      canvas.removeEventListener("touchmove", handleTouch)
      canvas.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{ touchAction: "none" }}
      aria-hidden="true"
    />
  )
}
