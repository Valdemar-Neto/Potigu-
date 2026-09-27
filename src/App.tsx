import { useEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { gsap, initSmoothScroll, prefersReducedMotion, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { Applications } from '@/sections/Applications'
import { Brand } from '@/sections/Brand'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'
import { Header } from '@/sections/Header'
import { Hero } from '@/sections/Hero'
import { Opportunity } from '@/sections/Opportunity'
import { Process } from '@/sections/Process'
import { Product } from '@/sections/Product'
import { Sustainability } from '@/sections/Sustainability'
import { Values } from '@/sections/Values'

export default function App() {
  useEffect(() => initSmoothScroll(), [])

  // Revela todos os elementos marcados com [data-reveal] ao entrarem na viewport
  useGSAP(() => {
    if (prefersReducedMotion()) return
    document.documentElement.classList.add('motion-ok')
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.08, overwrite: true }),
    })
    // fontes e imagens mudam a altura das seções depois do primeiro layout
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => document.documentElement.classList.remove('motion-ok')
  })

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-full bg-coral px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Opportunity />
        <Process />
        <Product />
        <Applications />
        <Sustainability />
        <Brand />
        <Values />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-center" />
    </>
  )
}
