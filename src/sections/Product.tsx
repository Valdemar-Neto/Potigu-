import { Check } from 'lucide-react'
import { useRef } from 'react'
import { Photo } from '@/components/brand/Photo'
import { SectionHeading } from '@/components/SectionHeading'
import { ASSETS, PRODUCT_BENEFITS } from '@/config/site'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

const BAGS = [
  { src: ASSETS.bag25, weight: '25 kg', text: 'Para linhas de alto volume e produção contínua.' },
  { src: ASSETS.bag10, weight: '10 kg', text: 'Para lotes menores, testes de formulação e P&D.' },
]

export function Product() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // a foto tem texto embutido: um zoom-out leve em vez de parallax, para ela terminar inteira
      gsap.utils.toArray<HTMLElement>('[data-zoom]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.12 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'center center', scrub: true } },
        )
      })
    },
    { scope: root },
  )

  return (
    <section id="produto" ref={root} className="relative bg-areia-50 py-24 sm:py-32">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal className="relative aspect-[1251/848] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(90_40_15/0.45)]">
            <Photo
              data-zoom
              src={ASSETS.photoShrimpPowder}
              alt="Camarões ao lado de um monte de saborizante de camarão em pó, com a frase: Do mar para a indústria. Com o sabor da nossa terra."
              placeholder="Foto: camarão e saborizante em pó"
              tone="coral"
              width={1251}
              height={848}
              className="absolute inset-0 size-full"
            />
          </div>

          <div>
            <SectionHeading
              eyebrow="O produto"
              title={
                <>
                  Saborizante de camarão <span className="text-coral">em pó</span>.
                </>
              }
              intro="Um ingrediente concentrado, desenvolvido a partir do cefalotórax do camarão, com características sensoriais e nutricionais que agregam valor às formulações da sua indústria."
            />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {PRODUCT_BENEFITS.map((b) => (
                <li key={b.title} data-reveal className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-salvia text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-petroleo">{b.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 sm:mt-32">
          <h3 data-reveal className="font-heading text-2xl font-semibold text-petroleo sm:text-3xl">
            Embalagens industriais
          </h3>
          <p data-reveal className="mt-2 max-w-xl text-muted-foreground">
            Projetadas para preservar as características do produto no armazenamento e no transporte.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {BAGS.map((b) => (
              <article
                key={b.weight}
                data-reveal
                className="group relative overflow-hidden rounded-[2rem] bg-areia transition-transform duration-500 ease-out-expo hover:-translate-y-1"
              >
                <Photo
                  src={b.src}
                  alt={`Saco de ${b.weight} do saborizante de camarão em pó Potiguá`}
                  placeholder={`Mockup: embalagem ${b.weight}`}
                  tone="areia"
                  className="aspect-[4/5] w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
                <div className="flex flex-col gap-3 p-7 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] whitespace-nowrap text-petroleo/60 uppercase">Peso líquido</p>
                    <p className="font-heading text-5xl font-semibold whitespace-nowrap text-petroleo">{b.weight}</p>
                  </div>
                  <p className="max-w-[16rem] text-sm text-muted-foreground sm:text-right">{b.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
