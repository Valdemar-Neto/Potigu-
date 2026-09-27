import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/brand/Logo'
import { NAV } from '@/config/site'
import { scrollToHash } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    scrollToHash(href)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out-expo',
        scrolled || open ? 'bg-petroleo-900/85 shadow-[0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <a href="#topo" onClick={(e) => go(e, '#topo')} aria-label="Potiguá — início">
          <Logo tone="light" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => go(e, item.href)}
              className="relative text-sm font-medium text-areia/80 transition-colors duration-200 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-coral after:transition-transform after:duration-300 after:ease-out-expo hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contato"
            onClick={(e) => go(e, '#contato')}
            className="hidden h-10 items-center rounded-full bg-coral px-5 text-sm font-semibold text-white transition-[transform,background-color] duration-200 ease-out-expo hover:bg-coral-600 active:scale-[0.97] sm:inline-flex"
          >
            Solicitar amostra
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-white transition-transform active:scale-95 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Menu móvel"
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out-expo lg:hidden',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <ul className="container-page min-h-0 space-y-1 pb-6">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={(e) => go(e, item.href)}
                className="block rounded-lg px-2 py-3 font-heading text-2xl text-areia hover:text-coral-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
