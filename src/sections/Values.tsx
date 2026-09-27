import { Gauge, Handshake, Lightbulb, MapPin, Recycle, ShieldCheck } from 'lucide-react'
import { WaveDivider } from '@/components/brand/WaveDivider'
import { SectionHeading } from '@/components/SectionHeading'
import { MISSION, VALUES, VISION } from '@/config/site'

const ICONS: Record<(typeof VALUES)[number]['key'], typeof Recycle> = {
  sustentabilidade: Recycle,
  inovacao: Lightbulb,
  qualidade: ShieldCheck,
  regional: MapPin,
  responsabilidade: Handshake,
  eficiencia: Gauge,
}

export function Values() {
  return (
    <section className="relative bg-petroleo text-white">
      <div className="container-page py-24 sm:py-32">
        <SectionHeading tone="dark" eyebrow="Quem somos" title="Missão, visão e valores." />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {[
            { k: 'Missão', t: MISSION },
            { k: 'Visão', t: VISION },
          ].map((b) => (
            <figure key={b.k} data-reveal className="rounded-[2rem] border border-white/10 bg-petroleo-800/60 p-8 sm:p-10">
              <figcaption className="font-heading text-sm font-semibold tracking-[0.2em] text-coral-300 uppercase">{b.k}</figcaption>
              <blockquote className="mt-4 font-serif text-xl leading-relaxed text-areia italic sm:text-2xl">{b.t}</blockquote>
            </figure>
          ))}
        </div>

        <ul className="mt-6 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => {
            const Icon = ICONS[v.key]
            return (
              <li key={v.key} data-reveal className="group bg-petroleo p-8 transition-colors duration-300 hover:bg-petroleo-800">
                <Icon className="size-6 text-salvia transition-transform duration-300 ease-out-expo group-hover:-rotate-12 group-hover:scale-110" />
                <h3 className="mt-5 font-heading text-lg font-semibold">{v.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-petroleo-100">{v.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
      <WaveDivider fill="var(--color-areia-50)" />
    </section>
  )
}
