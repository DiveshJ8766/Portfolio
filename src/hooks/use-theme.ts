import { useCallback, useEffect, useState } from "react"

export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"))
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    try { localStorage.setItem("theme", dark ? "dark" : "light") } catch { /* storage unavailable */ }
  }, [dark])
  const toggle = useCallback(() => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void }
    if (doc.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doc.startViewTransition(() => setDark((d) => !d))
    } else setDark((d) => !d)
  }, [])
  return { dark, toggle }
}
