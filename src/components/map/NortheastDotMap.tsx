import { useEffect, useMemo, useRef, useState } from 'react'
import { MAP_HQ, MAP_HUBS } from '@/config/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import { MAP_DOTS, MAP_SIZE, OUTLINE_CE, OUTLINE_RN, projectLonLat } from './nordesteMap'

const { width: W, height: H } = MAP_SIZE
const pct = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` })

const DOT_FILL = ['var(--color-petroleo-300)', 'var(--color-areia)', 'var(--color-areia)']
const DOT_OPACITY = [0.22, 0.5, 0.78]

/** Curva do polo até a Potiguá, arqueando para o lado do mar (norte). */
function flowPath([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const len = Math.hypot(x2 - x1, y2 - y1)
  let nx = -(y2 - y1) / len
  let ny = (x2 - x1) / len
  if (ny > 0) [nx, ny] = [-nx, -ny]
  const bend = len * 0.28
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${(mx + nx * bend).toFixed(1)} ${(my + ny * bend).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

const STATE_LABELS = [
  { label: 'Ceará', lon: -39.6, lat: -5.4 },
  // abaixo do RN, sobre a Paraíba (pontos apagados), para não disputar com os polos
  { label: 'Rio Grande do Norte', lon: -36.5, lat: -7.25 },
]

/** Mapa de pontos do CE e do RN com os polos de matéria-prima convergindo para a Potiguá. */
export function NortheastDotMap({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setVisible(true), io.disconnect()), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const hq = projectLonLat(MAP_HQ.lon, MAP_HQ.lat)
  const hubs = useMemo(
    () =>
      MAP_HUBS.map((h) => {
        const p = projectLonLat(h.lon, h.lat)
        return { ...h, p, d: flowPath(p, hq) }
      }),
    [hq],
  )

  // os pontos acendem em ondas a partir da Potiguá
  const dots = useMemo(() => {
    const out: { x: number; y: number; s: number; delay: number }[] = []
    const max = Math.hypot(W, H)
    for (let i = 0; i < MAP_DOTS.length; i += 3) {
      const x = MAP_DOTS[i]
      const y = MAP_DOTS[i + 1]
      out.push({ x, y, s: MAP_DOTS[i + 2], delay: Math.round((Math.hypot(x - hq[0], y - hq[1]) / max) * 1400) })
    }
    return out
  }, [hq])

  const shown = visible || reduced

  return (
    <div ref={root} className={cn('relative', className)} data-map-shown={shown}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        // as bordas da grade somem num degradê, em vez de um corte reto
        className="block h-auto w-full overflow-visible [mask-image:radial-gradient(75%_75%_at_58%_45%,#000_60%,transparent_100%)]" role="img" aria-labelledby="mapa-titulo">
        <title id="mapa-titulo">
          Mapa do Ceará e do Rio Grande do Norte com os polos de carcinicultura e o fluxo da matéria-prima até a Potiguá
        </title>

        <g>
          {dots.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.s ? 2.3 : 1.9}
              fill={DOT_FILL[d.s]}
              className="map-dot"
              style={{ opacity: shown ? DOT_OPACITY[d.s] : 0, transitionDelay: `${d.delay}ms` }}
            />
          ))}
        </g>

        <path d={OUTLINE_CE} fill="none" stroke="var(--color-areia)" strokeOpacity=".22" strokeWidth="1.2" />
        <path d={OUTLINE_RN} fill="none" stroke="var(--color-areia)" strokeOpacity=".32" strokeWidth="1.2" />

        {/* fluxos: polos → Potiguá */}
        <g className={cn('transition-opacity delay-700 duration-1000', shown ? 'opacity-100' : 'opacity-0')}>
          {hubs.map((h) => (
            <path key={h.name} d={h.d} fill="none" stroke="var(--color-coral)" strokeOpacity=".75" strokeWidth="1.6" className="map-flow" />
          ))}
          {!reduced &&
            hubs.map((h, i) => (
              <circle key={h.name} r="3.2" fill="var(--color-coral-300)" opacity="0">
                <animateMotion dur="3.2s" begin={`${1.2 + i * 0.8}s`} repeatCount="indefinite" path={h.d} />
                <animate attributeName="opacity" dur="3.2s" begin={`${1.2 + i * 0.8}s`} repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.12;0.85;1" />
              </circle>
            ))}
        </g>

        {/* polos */}
        {hubs.map((h) => (
          <g key={h.name}>
            <circle cx={h.p[0]} cy={h.p[1]} r="14" fill="var(--color-coral)" opacity=".25" className="map-ping" />
            <circle cx={h.p[0]} cy={h.p[1]} r="5" fill="var(--color-coral)" stroke="var(--color-petroleo-900)" strokeWidth="2" />
          </g>
        ))}

        {/* Potiguá */}
        <circle cx={hq[0]} cy={hq[1]} r="18" fill="none" stroke="var(--color-areia)" strokeOpacity=".35" strokeWidth="1" />
        <circle cx={hq[0]} cy={hq[1]} r="9" fill="var(--color-areia)" stroke="var(--color-coral)" strokeWidth="3" />
      </svg>

      {/* rótulos em HTML para manter o tamanho de fonte legível em qualquer largura */}
      {STATE_LABELS.map((s) => {
        const [x, y] = projectLonLat(s.lon, s.lat)
        return (
          <span
            key={s.label}
            aria-hidden
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] font-medium tracking-[0.25em] whitespace-nowrap text-areia/60 uppercase [text-shadow:0_0_6px_var(--color-petroleo-900),0_0_12px_var(--color-petroleo-900)] sm:text-[11px]"
            style={pct(x, y)}
          >
            {s.label}
          </span>
        )
      })}
      <span
        aria-hidden
        className="pointer-events-none absolute font-serif text-sm text-petroleo-300/70 italic"
        style={pct(...projectLonLat(-37.9, -2.75))}
      >
        Oceano Atlântico
      </span>

      {hubs.map((h) => (
        <span
          key={h.name}
          aria-hidden
          className={cn(
            'pointer-events-none absolute hidden -translate-y-1/2 rounded-md border border-white/10 bg-petroleo-900/80 px-1.5 py-0.5 font-mono text-[10px] tracking-wider whitespace-nowrap text-areia/80 uppercase backdrop-blur-sm sm:block',
            // perto da borda direita o rótulo vira para a esquerda do ponto
            h.p[0] > W * 0.72 ? '-translate-x-[calc(100%+12px)]' : 'translate-x-3',
          )}
          style={pct(...h.p)}
        >
          {h.name} · {h.uf}
        </span>
      ))}
      <span
        aria-hidden
        className="pointer-events-none absolute -translate-x-[calc(100%+24px)] -translate-y-1/2 rounded-md bg-coral px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider whitespace-nowrap text-white uppercase sm:text-[11px]"
        style={pct(...hq)}
      >
        {MAP_HQ.name}
      </span>
    </div>
  )
}
