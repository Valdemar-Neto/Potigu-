import { Photo } from '@/components/brand/Photo'
import { ASSETS } from '@/config/site'

export function Brand() {
  return (
    <section id="marca" className="relative isolate overflow-hidden py-28 text-white sm:py-40">
      <Photo
        src={ASSETS.photoCoast}
        alt=""
        placeholder=""
        tone="petroleo"
        className="absolute inset-0 -z-20 size-full"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-petroleo-900/95 via-petroleo/85 to-petroleo/40" aria-hidden />

      <div className="container-page">
        <p data-reveal className="eyebrow text-coral-300">
          <span className="h-px w-8 bg-coral-300" aria-hidden />A marca
        </p>
        <h2 data-reveal className="mt-6 font-heading text-[clamp(3.5rem,11vw,9rem)] leading-[0.9] font-semibold">
          Potiguar
        </h2>
        <p data-reveal className="mt-3 font-serif text-[clamp(1.5rem,3.5vw,2.5rem)] text-coral-300 italic">
          do tupi, “comedor de camarão”.
        </p>
        <div className="mt-12 grid max-w-4xl gap-8 text-lg leading-relaxed text-petroleo-50/90 md:grid-cols-2">
          <p data-reveal>
            É assim que são chamados os nascidos no Rio Grande do Norte. O nome Potiguá valoriza essa origem e a nossa conexão
            direta com a cadeia produtiva do camarão.
          </p>
          <p data-reveal>
            <strong className="font-semibold text-white">Transformando recursos</strong> é o aproveitamento de resíduos e a
            economia circular. <strong className="font-semibold text-white">Criando sabores</strong> é o que esses recursos se
            tornam: ingredientes para a indústria.
          </p>
        </div>
      </div>
    </section>
  )
}
