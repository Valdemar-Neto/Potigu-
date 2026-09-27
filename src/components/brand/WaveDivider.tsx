import { cn } from '@/lib/utils'

type Props = {
  /** cor da seção de baixo (preenchimento principal) */
  fill: string
  /** mostra as faixas coral/sálvia como nas embalagens */
  accents?: boolean
  flip?: boolean
  className?: string
}

const PERIOD = 1440
const HEIGHT = 120

/**
 * Onda senoidal periódica (2 períodos de largura). Como começa e termina no mesmo
 * ponto com a mesma inclinação, transladar -50% gera um loop sem emenda.
 */
function wavePath(y: number, amp: number) {
  const seg = (x: number) =>
    `C${x + 240} ${y - amp} ${x + 480} ${y - amp} ${x + 720} ${y} ` +
    `C${x + 960} ${y + amp} ${x + 1200} ${y + amp} ${x + PERIOD} ${y} `
  return `M0 ${y} ${seg(0)}${seg(PERIOD)}L${PERIOD * 2} ${HEIGHT} L0 ${HEIGHT} Z`
}

const LAYERS = [
  { key: 'coral', color: 'var(--color-coral)', y: 46, amp: 22, duration: '22s', reverse: false, bob: '7s', accent: true },
  { key: 'salvia', color: 'var(--color-salvia)', y: 62, amp: 20, duration: '30s', reverse: true, bob: '9s', accent: true },
  { key: 'fill', color: '', y: 80, amp: 18, duration: '38s', reverse: false, bob: '', accent: false },
] as const

/** Ondas em camadas, inspiradas nas embalagens da marca, com deriva lenta em parallax. */
export function WaveDivider({ fill, accents = true, flip, className }: Props) {
  const layers = LAYERS.filter((l) => accents || !l.accent)

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none relative -mb-px h-16 w-full overflow-hidden leading-none sm:h-24', flip && 'rotate-180', className)}
    >
      {layers.map((l) => (
        <div
          key={l.key}
          // só as faixas oscilam; o preenchimento fica colado na seção de baixo
          className={cn('absolute inset-0', l.accent && 'wave-bob')}
          style={l.accent ? { animationDuration: l.bob, animationDelay: `-${parseFloat(l.bob) / 3}s` } : undefined}
        >
          <svg
            viewBox={`0 0 ${PERIOD * 2} ${HEIGHT}`}
            preserveAspectRatio="none"
            className="wave-drift absolute top-0 left-0 block h-full w-[200%]"
            style={{ animationDuration: l.duration, animationDirection: l.reverse ? 'reverse' : 'normal' }}
          >
            <path d={wavePath(l.y, l.amp)} fill={l.key === 'fill' ? fill : l.color} />
          </svg>
        </div>
      ))}
    </div>
  )
}
