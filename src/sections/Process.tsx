import { useRef } from 'react'
import { BrandMark } from '@/components/brand/BrandMark'
import { SectionHeading } from '@/components/SectionHeading'
import { PROCESS_STEPS } from '@/config/site'
import { gsap, useGSAP } from '@/lib/gsap'

const R = 150
const C = 2 * Math.PI * R

const nodePos = (i: number) => {
  const a = -Math.PI / 2 + (i / PROCESS_STEPS.length) * Math.PI * 2
  return { x: 180 + Math.cos(a) * R, y: 180 + Math.sin(a) * R }
}

export function Process() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const steps = gsap.utils.toArray<HTMLElement>('.process-step')
        const nodes = gsap.utils.toArray<SVGGElement>('.process-node')
        gsap.set(steps, { opacity: 0.25 })
        gsap.set(nodes, { scale: 0.6, transformOrigin: 'center', opacity: 0.35 })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: '.process-stage', start: 'top top', end: '+=220%', pin: true, scrub: 0.6 },
        })
        tl.fromTo('.process-ring', { strokeDashoffset: C }, { strokeDashoffset: 0, duration: steps.length }, 0)
        steps.forEach((step, i) => {
          tl.to(step, { opacity: 1, duration: 0.4 }, i)
          tl.to(nodes[i], { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, i)
          if (i < steps.length - 1) tl.to(step, { opacity: 0.35, duration: 0.3 }, i + 0.85)
        })
        tl.fromTo('.process-center', { scale: 0.85, opacity: 0.5 }, { scale: 1, opacity: 1, duration: steps.length }, 0)
      })
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.process-step').forEach((step) => {
          gsap.from(step, { opacity: 0, y: 24, duration: 0.9, scrollTrigger: { trigger: step, start: 'top 88%', once: true } })
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="processo" ref={root} className="relative bg-petroleo text-white">
      <div className="process-stage flex min-h-svh items-center py-24 lg:py-0">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Economia circular"
              title="Do resíduo ao ingrediente, em um ciclo que gera valor."
            />
            <ol className="mt-10 space-y-6">
              {PROCESS_STEPS.map((s, i) => (
                <li key={s.title} className="process-step grid grid-cols-[auto_1fr] gap-x-5">
                  <span className="font-heading text-sm font-semibold text-coral-300 tabular-nums">0{i + 1}</span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold">{s.title}</h3>
                    <p className="mt-1 max-w-md leading-relaxed text-petroleo-100">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mx-auto hidden aspect-square w-full max-w-[460px] lg:block" aria-hidden>
            <svg viewBox="0 0 360 360" className="size-full overflow-visible">
              <circle cx="180" cy="180" r={R} fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="2" />
              <circle
                className="process-ring"
                cx="180"
                cy="180"
                r={R}
                fill="none"
                stroke="var(--color-salvia)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={C}
                transform="rotate(-90 180 180)"
              />
              {PROCESS_STEPS.map((s, i) => {
                const { x, y } = nodePos(i)
                return (
                  <g key={s.title} className="process-node">
                    <circle cx={x} cy={y} r="22" fill={i === 3 ? 'var(--color-coral)' : 'var(--color-petroleo-800)'} stroke="var(--color-salvia)" strokeWidth="2" />
                    <text x={x} y={y + 5} textAnchor="middle" className="fill-white font-heading text-[14px] font-semibold">
                      {i + 1}
                    </text>
                  </g>
                )
              })}
            </svg>
            <div className="process-center absolute inset-0 m-auto flex size-40 items-center justify-center">
              <BrandMark variant="mono-light" className="h-auto w-32 opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
