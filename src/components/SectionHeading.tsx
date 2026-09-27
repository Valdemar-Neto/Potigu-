import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, intro, tone = 'light', align = 'left', className }: Props) {
  const dark = tone === 'dark'
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <p data-reveal className={cn('eyebrow', dark ? 'text-coral-300' : 'text-coral-700')}>
        <span className={cn('h-px w-8', dark ? 'bg-coral-300' : 'bg-coral')} aria-hidden />
        {eyebrow}
      </p>
      <h2 data-reveal className={cn('mt-4 text-4xl leading-[1.05] font-semibold sm:text-5xl', dark ? 'text-white' : 'text-petroleo')}>
        {title}
      </h2>
      {intro && (
        <p data-reveal className={cn('mt-5 text-lg leading-relaxed', dark ? 'text-petroleo-100' : 'text-muted-foreground')}>
          {intro}
        </p>
      )}
    </div>
  )
}
