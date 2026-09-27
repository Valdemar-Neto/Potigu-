import { BrandMark } from './BrandMark'
import { ASSETS } from '@/config/site'
import { cn } from '@/lib/utils'

type Props = {
  tone?: 'dark' | 'light'
  className?: string
}

/** Símbolo colorido + wordmark (petróleo sobre fundo claro, branco com acento coral sobre fundo escuro). */
export function Logo({ tone = 'dark', className }: Props) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <BrandMark className="h-9 w-auto" />
      <img
        src={tone === 'dark' ? ASSETS.wordmark : ASSETS.wordmarkWhite}
        alt="Potiguá"
        width={269}
        height={84}
        className="h-7 w-auto select-none"
        draggable={false}
      />
    </span>
  )
}
