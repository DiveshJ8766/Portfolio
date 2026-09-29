import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

/** Soft glowing follower that grows over interactive elements (desktop / fine pointers only). */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [seen, setSeen] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })

  useEffect(() => {
    const fine = matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches
    setEnabled(fine)
    if (!fine) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY); setSeen(true)
      const t = e.target as HTMLElement
      setHover(!!t.closest("a,button,[role=tab],input,textarea"))
    }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [x, y])

  if (!enabled || !seen) return null
  return (
    <>
      <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference">
        <motion.div animate={{ width: hover ? 56 : 14, height: hover ? 56 : 14, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </motion.div>
      <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed top-0 left-0 z-0 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-3xl" />
    </>
  )
}
