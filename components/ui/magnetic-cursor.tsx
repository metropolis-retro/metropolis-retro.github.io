"use client";

import { useEffect, useRef, useState } from "react"

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let animationFrameId: number
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const interactiveSelectors = [
      "a[href]",
      "button",
      '[data-slot="button"]',
      'input[type="submit"]',
      '[role="button"]',
    ].join(", ")

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY

      const target = e.target as HTMLElement
      const isInteractive = target.closest(interactiveSelectors)

      if (isInteractive) {
        setIsHovering(true)
        const rect = isInteractive.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = targetX - centerX
        const deltaY = targetY - centerY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        if (distance < 80) {
          const pullStrength = 0.3
          targetX = targetX - deltaX * pullStrength
          targetY = targetY - deltaY * pullStrength
        }
      } else {
        setIsHovering(false)
      }
    }

    const animate = () => {
      const ease = 0.15
      currentX += (targetX - currentX) * ease
      currentY += (targetY - currentY) * ease

      setPosition({ x: currentX, y: currentY })
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isHovering ? "width 0.2s, height 0.2s" : "none",
        }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{
            width: isHovering ? "40px" : "8px",
            height: isHovering ? "40px" : "8px",
            transition: "width 0.2s, height 0.2s",
          }}
        />
      </div>

      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.1s",
        }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/40"
          style={{
            width: isHovering ? "60px" : "32px",
            height: isHovering ? "60px" : "32px",
            transition: "width 0.3s, height 0.3s",
          }}
        />
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
