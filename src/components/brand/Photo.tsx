import { useState } from 'react'
import { cn } from '@/lib/utils'

type Props = React.ComponentProps<'img'> & {
  /** texto do placeholder enquanto o arquivo real não existe em public/brand */
  placeholder: string
  tone?: 'coral' | 'petroleo' | 'areia'
}

const tones = {
  coral: 'from-coral-300 via-coral to-coral-700 text-white',
  petroleo: 'from-petroleo-500 via-petroleo to-petroleo-900 text-areia',
  areia: 'from-areia-100 via-areia to-areia-300 text-petroleo',
}

/** Imagem com fallback visual: se o arquivo não carregar, mostra um bloco na paleta da marca. */
export function Photo({ placeholder, tone = 'areia', className, alt = '', ...props }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        className={cn('flex items-end bg-gradient-to-br p-5', tones[tone], className)}
      >
        <span className="font-serif text-sm italic opacity-80">{placeholder}</span>
      </div>
    )
  }

  return <img alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={cn('object-cover', className)} {...props} />
}
