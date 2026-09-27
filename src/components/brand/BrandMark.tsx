import { ASSETS } from '@/config/site'
import { cn } from '@/lib/utils'

type Props = {
  variant?: 'color' | 'mono-light'
  className?: string
  /** texto alternativo; sem ele o símbolo é decorativo */
  title?: string
}

/** Símbolo oficial da Potiguá (camarão + mar + seta circular). */
export function BrandMark({ variant = 'color', className, title }: Props) {
  return (
    <img
      src={variant === 'color' ? ASSETS.symbol : ASSETS.symbolWhite}
      alt={title ?? ''}
      width={198}
      height={144}
      decoding="async"
      draggable={false}
      className={cn('shrink-0 object-contain select-none', className)}
    />
  )
}
