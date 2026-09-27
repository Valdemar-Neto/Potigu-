import { ArrowDown, ArrowRight } from 'lucide-react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { BrandMark } from '@/components/brand/BrandMark'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { gsap, scrollToHash, SplitText, useGSAP } from '@/lib/gsap'

const HeroScene = lazy(() => import('@/components/three/HeroScene'))

function supportsWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const reduced = usePrefersReducedMotion()
  const [webgl] = useState(supportsWebGL)
  const [inView, setInView] = useState(true)
  const show3D = webgl && !reduced

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useGSAP(
    () => {
      if (reduced) return
      const split = SplitText.create('.hero-title', { type: 'words,lines', mask: 'lines', autoSplit: true })
      const intro = gsap.timeline({ delay: 0.15 })
      intro
        .from(split.words, { yPercent: 110, duration: 1.1, stagger: 0.06 })
        .from('.hero-fade', { opacity: 0, y: 16, duration: 0.9, stagger: 0.08 }, '-=0.7')

      // o camarão vira pó enquanto o hero fica fixo
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=90%',
          pin: true,
          scrub: true,
          onUpdate: (self) => (progress.current = self.progress),
        },
      })
        .to('.hero-copy', { y: -60, opacity: 0, ease: 'none' }, 0.35)
        .fromTo('.hero-caption', { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: 'none' }, 0.55)
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section
      id="topo"
      ref={root}
      className="relative isolate flex h-svh min-h-[640px] items-end overflow-hidden pb-24 lg:items-center lg:pb-0 bg-[radial-gradient(120%_80%_at_75%_40%,var(--color-petroleo-500)_0%,var(--color-petroleo)_45%,var(--color-petroleo-900)_100%)] text-white"
    >
      <div className="absolute inset-0 -z-10" aria-hidden>
        {show3D ? (
          <Suspense fallback={null}>
            <HeroScene progress={progress} active={inView} />
          </Suspense>
        ) : (
          <div className="flex h-full items-center justify-end pr-[6vw] opacity-90 max-lg:justify-center max-lg:pt-24 max-lg:opacity-20">
            <BrandMark className="h-auto w-[min(60vw,320px)]" />
          </div>
        )}
      </div>

      <div className="container-page">
        <div className="hero-copy max-w-2xl lg:pt-16">
          <p className="hero-fade eyebrow text-coral-300">
            <span className="h-px w-8 bg-coral-300" aria-hidden />
            Saborizante de camarão em pó · B2B
          </p>
          <h1 className="hero-title mt-6 font-heading text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] font-semibold tracking-tight">
            Transformando recursos, <span className="text-coral">criando sabores.</span>
          </h1>
          <p className="hero-fade mt-7 max-w-xl text-lg leading-relaxed text-petroleo-100 sm:text-xl">
            A Potiguá transforma o cefalotórax do camarão, antes descartado, em um ingrediente concentrado de aroma e sabor
            para a indústria alimentícia.
          </p>
          <div className="hero-fade mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#contato"
              onClick={(e) => (e.preventDefault(), scrollToHash('#contato'))}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-coral px-6 font-semibold text-white transition-[transform,background-color] duration-200 ease-out-expo hover:bg-coral-600 active:scale-[0.97]"
            >
              Solicitar amostra
              <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
            </a>
            <a
              href="#processo"
              onClick={(e) => (e.preventDefault(), scrollToHash('#processo'))}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-6 font-medium text-white transition-[transform,background-color,border-color] duration-200 ease-out-expo hover:border-white/50 hover:bg-white/5 active:scale-[0.97]"
            >
              Como funciona
            </a>
          </div>
        </div>
      </div>

      {show3D && (
        <p className="hero-caption pointer-events-none absolute inset-x-0 bottom-[30%] px-4 text-center font-serif text-[clamp(1.75rem,3.6vw,3rem)] leading-tight text-areia italic opacity-0 lg:top-[32%] lg:bottom-auto lg:right-auto lg:left-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:px-0 lg:text-left">
          Do mar para a indústria.
          <br />
          Com o sabor da nossa terra.
        </p>
      )}

      <div className="hero-fade pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.2em] text-areia/60 uppercase">
        Role
        <ArrowDown className="size-4 motion-safe:animate-bounce" />
      </div>
    </section>
  )
}
