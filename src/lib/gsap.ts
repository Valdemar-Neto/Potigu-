import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)
gsap.defaults({ ease: 'expo.out', duration: 1 })

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis: Lenis | null = null

/** Smooth scroll com Lenis dirigido pelo ticker do GSAP (mantém ScrollTrigger sincronizado). */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({ lerp: 0.1, anchors: false })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash)
  if (!target) return
  if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 })
  else target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  history.replaceState(null, '', hash)
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
