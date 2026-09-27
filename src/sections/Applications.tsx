import { ChefHat, Cookie, CookingPot, Soup, Sparkles, Wheat } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { APPLICATIONS } from '@/config/site'

const ICONS = [Sparkles, Cookie, Soup, Wheat, CookingPot, ChefHat]

export function Applications() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Aplicações"
          title="Sabor de camarão para diferentes linhas de produto."
          intro="Um único ingrediente, pensado para a realidade da indústria alimentícia, com fácil dosagem e boa incorporação."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {APPLICATIONS.map((a, i) => {
            const Icon = ICONS[i]
            return (
              <li
                key={a.title}
                data-reveal
                className="group rounded-3xl border border-border bg-areia-50 p-7 transition-[transform,border-color,background-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-coral/40 hover:bg-white"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-petroleo text-areia transition-colors duration-300 group-hover:bg-coral group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 font-heading text-xl font-semibold text-petroleo">{a.title}</h3>
                <p className="mt-1.5 text-muted-foreground">{a.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
