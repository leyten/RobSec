"use client"

import { Suspense, lazy, useRef, useEffect } from "react"
const Spline = lazy(() => import("@splinetool/react-spline"))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const splineRef = useRef<any>(null)
  const headRef = useRef<any>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })

  const onLoad = (spline: any) => {
    splineRef.current = spline

    if (spline.findObjectByName) {
      const head = spline.findObjectByName("Head")
      if (head) {
        headRef.current = head
      }
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1

      targetRotation.current = { x, y }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.1
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.1

      if (headRef.current && headRef.current.rotation) {
        headRef.current.rotation.y = currentRotation.current.x * 0.5
        headRef.current.rotation.x = currentRotation.current.y * 0.3
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div className="w-full h-full">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-black/5 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }
      >
        <Spline scene={scene} className={className} onLoad={onLoad} />
      </Suspense>
    </div>
  )
}
