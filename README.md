# Potiguá — Landing page

Repositório utilizado para versionamento da landing page da empresa **Potiguá**: saborizante de camarão em pó para a indústria alimentícia, feito a partir do aproveitamento do cefalotórax do camarão.

> _Transformando recursos, criando sabores._

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (tokens da marca em `src/index.css`)
- **Three.js** via `@react-three/fiber` — cena do hero (partículas que viram pó)
- **GSAP** (ScrollTrigger, SplitText) + **Lenis** — animações e scroll suave
- **react-hook-form** + **zod** — formulário de contato (WhatsApp / e-mail)

## Rodando localmente

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run preview    # serve o build
npm run lint
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Textos, contatos (WhatsApp/e-mail), valores, polos do mapa | `src/config/site.ts` |
| Cores e fontes da marca | `src/index.css` (`@theme`) |
| Seções da página | `src/sections/*.tsx` |
| Imagens e logo | `public/brand/` (ver `public/brand/LEIA-ME.md`) |
| Cena 3D do hero | `src/components/three/` |
| Dados do mapa de pontos (CE/RN) | gerados por `npm run build:map` → `src/components/map/nordesteMap.ts` |

## Identidade visual

| Cor | Hex |
|---|---|
| Azul-petróleo | `#164E55` |
| Laranja-coral | `#E87945` |
| Bege-areia | `#E9DFC9` |
| Verde-sálvia | `#82977A` |

## Acessibilidade

A página respeita `prefers-reduced-motion`: sem cena 3D, sem seções fixadas e sem scroll suave para quem prefere menos movimento.
