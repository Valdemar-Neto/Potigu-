import { ArrowRight, Recycle } from 'lucide-react'
import { NortheastDotMap } from '@/components/map/NortheastDotMap'
import { SectionHeading } from '@/components/SectionHeading'

const LINEAR = ['Extrair', 'Produzir', 'Descartar']
const CIRCULAR = ['Resíduo', 'Ingrediente', 'Valor']

function MapCard() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(90%_70%_at_80%_40%,var(--color-petroleo)_0%,var(--color-petroleo-900)_70%)] text-areia shadow-[0_40px_80px_-40px_rgb(11_43_48/0.7)]">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5 font-mono text-[10px] tracking-[0.2em] uppercase sm:px-7 sm:text-[11px]">
        <span className="flex items-center gap-2 text-areia/85">
          <span className="size-1.5 rounded-full bg-coral motion-safe:animate-pulse" aria-hidden />
          Origem da matéria-prima
        </span>
        <span className="text-areia/45">CE · RN</span>
      </div>
      <div className="px-3 pt-4 pb-2 sm:px-6 sm:pt-6">
        <NortheastDotMap />
      </div>
      <figcaption className="grid gap-3 border-t border-white/10 px-5 py-4 font-mono text-[10px] tracking-wider text-areia/70 uppercase sm:grid-cols-3 sm:px-7 sm:text-[11px]">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-coral" aria-hidden />
          Polos de carcinicultura
        </span>
        <span className="flex items-center gap-2">
          <span className="h-px w-4 border-t border-dashed border-coral" aria-hidden />
          Resíduo → ingrediente
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-areia ring-2 ring-coral" aria-hidden />
          Potiguá
        </span>
      </figcaption>
    </figure>
  )
}

function Flow({ items, tone }: { items: string[]; tone: 'muted' | 'accent' }) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((it, i) => (
        <li key={it} className="flex items-center gap-2">
          <span
            className={
              tone === 'accent'
                ? 'rounded-full bg-salvia px-4 py-1.5 text-sm font-semibold text-white'
                : 'rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground line-through decoration-coral/60'
            }
          >
            {it}
          </span>
          {i < items.length - 1 && <ArrowRight className="size-4 text-salvia-700" aria-hidden />}
        </li>
      ))}
      {tone === 'accent' && <Recycle className="ml-1 size-5 text-salvia-700" aria-label="ciclo contínuo" />}
    </ol>
  )
}

export function Sustainability() {
  return (
    <section id="sustentabilidade" className="relative bg-areia py-24 sm:py-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="Sustentabilidade"
            title="Economia circular e bioeconomia na prática."
            intro="Estabelecemos parcerias com cooperativas e beneficiadoras de camarão do Rio Grande do Norte e do Ceará. O resíduo delas é a nossa matéria-prima, e isso cria novas oportunidades econômicas para toda a cadeia."
          />
          <div className="mt-10 space-y-5">
            <div data-reveal>
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Modelo linear</p>
              <Flow items={LINEAR} tone="muted" />
            </div>
            <div data-reveal>
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-salvia-700 uppercase">Modelo Potiguá</p>
              <Flow items={CIRCULAR} tone="accent" />
            </div>
          </div>
        </div>

        <div data-reveal>
          <MapCard />
        </div>
      </div>
    </section>
  )
}
