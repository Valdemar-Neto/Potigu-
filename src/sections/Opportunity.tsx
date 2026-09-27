import { useRef } from 'react'
import { SectionHeading } from '@/components/SectionHeading'
import { OPPORTUNITY_STATS } from '@/config/site'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

const COMPOUNDS = ['Aroma', 'Sabor', 'Proteínas', 'Minerais']

export function Opportunity() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => (el.textContent = String(Math.round(obj.v))),
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="paper-grain relative py-24 sm:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="A oportunidade"
            title={
              <>
                O que era descarte é a parte <span className="text-coral">mais saborosa</span> do camarão.
              </>
            }
            intro="No beneficiamento, o cefalotórax (a “cabeça” do camarão) costuma ir para o lixo. Só que é justamente ali que se concentram os compostos que dão ao camarão o seu aroma e sabor, além de proteínas e minerais."
          />
          <ul data-reveal className="mt-10 flex flex-wrap gap-2" aria-label="Compostos presentes no cefalotórax">
            {COMPOUNDS.map((c) => (
              <li key={c} className="rounded-full border border-coral/30 bg-coral-100/60 px-4 py-1.5 text-sm font-medium text-coral-700">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <dl className="grid content-start gap-px overflow-hidden rounded-3xl border border-border bg-border">
          {OPPORTUNITY_STATS.map((s) => (
            <div key={s.label} data-reveal className="flex flex-col gap-2 bg-areia-50 p-7 sm:p-8">
              <dt className="order-2 max-w-sm text-muted-foreground">{s.label}</dt>
              <dd className="order-1 font-heading text-5xl font-semibold tracking-tight text-petroleo tabular-nums sm:text-6xl">
                {s.prefix && <span className="text-3xl text-petroleo/60 sm:text-4xl">{s.prefix}</span>}
                <span data-count={s.value}>{s.value}</span>
                <span className="text-coral">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
