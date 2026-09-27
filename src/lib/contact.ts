import { z } from 'zod'
import { INTERESTS, SEGMENTS, SITE, VOLUMES } from '@/config/site'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome'),
  company: z.string().trim().min(2, 'Informe a empresa'),
  role: z.string().trim().optional(),
  email: z.email('E-mail inválido'),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v.replace(/\D/g, '').length >= 10, 'Telefone incompleto'),
  segment: z.enum(SEGMENTS, { error: 'Selecione um segmento' }),
  interest: z.enum(INTERESTS.map((i) => i.value) as [string, ...string[]], { error: 'Selecione o interesse' }),
  volume: z.string().optional(),
  message: z.string().trim().max(1000, 'Máximo de 1000 caracteres').optional(),
})

export type ContactData = z.infer<typeof contactSchema>

const labelOf = (list: readonly { value: string; label: string }[], value?: string) =>
  list.find((i) => i.value === value)?.label ?? value

export function buildMessage(data: Partial<ContactData>): string {
  const lines = [
    `Olá, equipe ${SITE.name}!`,
    '',
    `Meu nome é ${data.name || '—'}${data.role ? ` (${data.role})` : ''}, da ${data.company || '—'}.`,
    data.interest ? `Interesse: ${labelOf(INTERESTS, data.interest)}` : null,
    data.segment ? `Segmento: ${data.segment}` : null,
    data.volume ? `Volume: ${labelOf(VOLUMES, data.volume)}` : null,
    data.message ? ['', data.message].join('\n') : null,
    '',
    'Contato:',
    data.email ? `E-mail: ${data.email}` : null,
    data.phone ? `Telefone: ${data.phone}` : null,
  ]
  return lines.filter((l) => l !== null).join('\n')
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

export function buildMailtoUrl(message: string, data: Pick<ContactData, 'company' | 'interest'>): string {
  const subject = `${labelOf(INTERESTS, data.interest)} · ${data.company}`
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
}
