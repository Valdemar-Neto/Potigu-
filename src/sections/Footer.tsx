import { Logo } from '@/components/brand/Logo'
import { NAV, SITE } from '@/config/site'
import { scrollToHash } from '@/lib/gsap'

export function Footer() {
  return (
    <footer className="bg-petroleo-900 text-areia/80">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-xs font-serif text-xl text-areia italic">{SITE.slogan}</p>
        </div>
        <nav aria-label="Rodapé">
          <p className="text-xs font-semibold tracking-[0.2em] text-areia/50 uppercase">Navegação</p>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={(e) => (e.preventDefault(), scrollToHash(n.href))} className="transition-colors hover:text-coral-300">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-areia/50 uppercase">Contato</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="transition-colors hover:text-coral-300">
                {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-coral-300">
                {SITE.email}
              </a>
            </li>
            <li>{SITE.region}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-areia/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Potiguá. Todos os direitos reservados.</p>
          <p>Economia circular · Bioeconomia · Nordeste do Brasil</p>
        </div>
      </div>
    </footer>
  )
}
