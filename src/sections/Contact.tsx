import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, Mail, MessageCircle, Phone } from 'lucide-react'
import { useId } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { SectionHeading } from '@/components/SectionHeading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { INTERESTS, SEGMENTS, SITE, VOLUMES } from '@/config/site'
import { buildMailtoUrl, buildMessage, buildWhatsAppUrl, contactSchema, type ContactData } from '@/lib/contact'
import { cn } from '@/lib/utils'

const field = 'h-11 rounded-xl bg-white px-3.5 text-base md:text-sm'
const trigger = 'w-full rounded-xl bg-white px-3.5 text-base data-[size=default]:h-11 md:text-sm'

function Field({ id, label, error, optional, children }: { id: string; label: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-sm font-medium text-petroleo">
        {label}
        {optional && <span className="font-normal text-muted-foreground"> (opcional)</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function Contact() {
  const uid = useId()
  const id = (name: string) => `${uid}-${name}`
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema), mode: 'onTouched' })

  const values = useWatch({ control })
  const preview = buildMessage(values)

  const a11y = (name: keyof ContactData) => ({
    id: id(name),
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `${id(name)}-error` : undefined,
  })

  const sendWhatsApp = handleSubmit((data) => {
    window.open(buildWhatsAppUrl(buildMessage(data)), '_blank', 'noopener,noreferrer')
    toast.success('Abrimos o WhatsApp com a sua mensagem pronta.', { description: 'É só confirmar o envio por lá.' })
  })

  const sendEmail = handleSubmit((data) => {
    window.location.assign(buildMailtoUrl(buildMessage(data), data))
    toast.success('Abrimos o seu aplicativo de e-mail.', { description: 'Revise e envie a mensagem.' })
  })

  return (
    <section id="contato" className="bg-areia-50 pt-10 pb-24 sm:pb-32">
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Contato comercial"
            title={
              <>
                Vamos criar <span className="text-coral">sabores</span> juntos?
              </>
            }
            intro="Preencha o formulário e escolha como prefere falar com a gente: montamos a mensagem para você enviar pelo WhatsApp ou por e-mail."
          />
          <ul data-reveal className="mt-10 space-y-4">
            <li className="flex items-center gap-3 text-petroleo">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-petroleo text-areia">
                <Phone className="size-4" />
              </span>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="font-medium hover:text-coral-700">
                {SITE.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3 text-petroleo">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-petroleo text-areia">
                <Mail className="size-4" />
              </span>
              <a href={`mailto:${SITE.email}`} className="font-medium hover:text-coral-700">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <form
          data-reveal
          noValidate
          onSubmit={sendWhatsApp}
          className="rounded-[2rem] bg-white p-6 shadow-[0_40px_80px_-40px_rgb(22_78_85/0.35)] ring-1 ring-border sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={id('name')} label="Nome" error={errors.name?.message}>
              <Input className={field} autoComplete="name" {...a11y('name')} {...register('name')} />
            </Field>
            <Field id={id('company')} label="Empresa" error={errors.company?.message}>
              <Input className={field} autoComplete="organization" {...a11y('company')} {...register('company')} />
            </Field>
            <Field id={id('role')} label="Cargo" optional>
              <Input className={field} autoComplete="organization-title" {...a11y('role')} {...register('role')} />
            </Field>
            <Field id={id('email')} label="E-mail" error={errors.email?.message}>
              <Input className={field} type="email" autoComplete="email" {...a11y('email')} {...register('email')} />
            </Field>
            <Field id={id('phone')} label="Telefone / WhatsApp" optional error={errors.phone?.message}>
              <Input className={field} type="tel" autoComplete="tel" inputMode="tel" {...a11y('phone')} {...register('phone')} />
            </Field>
            <Field id={id('segment')} label="Segmento" error={errors.segment?.message}>
              <Controller
                control={control}
                name="segment"
                render={({ field: f }) => (
                  <Select value={f.value ?? ''} onValueChange={f.onChange}>
                    <SelectTrigger className={trigger} onBlur={f.onBlur} {...a11y('segment')}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent data-lenis-prevent>
                      {SEGMENTS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field id={id('interest')} label="Interesse" error={errors.interest?.message}>
              <Controller
                control={control}
                name="interest"
                render={({ field: f }) => (
                  <Select value={f.value ?? ''} onValueChange={f.onChange}>
                    <SelectTrigger className={trigger} onBlur={f.onBlur} {...a11y('interest')}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent data-lenis-prevent>
                      {INTERESTS.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field id={id('volume')} label="Volume estimado" optional>
              <Controller
                control={control}
                name="volume"
                render={({ field: f }) => (
                  <Select value={f.value ?? ''} onValueChange={f.onChange}>
                    <SelectTrigger className={trigger} {...a11y('volume')}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent data-lenis-prevent>
                      {VOLUMES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field id={id('message')} label="Mensagem" optional error={errors.message?.message}>
                <Textarea
                  rows={4}
                  className="min-h-28 rounded-xl bg-white px-3.5 py-3 text-base md:text-sm"
                  placeholder="Conte um pouco sobre a aplicação, volumes ou prazos."
                  {...a11y('message')}
                  {...register('message')}
                />
              </Field>
            </div>
          </div>

          <details className="group mt-6 rounded-2xl bg-areia-50 ring-1 ring-border">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3.5 text-sm font-medium text-petroleo [&::-webkit-details-marker]:hidden">
              Prévia da mensagem
              <ChevronDown className="size-4 transition-transform duration-300 ease-out-expo group-open:rotate-180" />
            </summary>
            <pre className="max-h-64 overflow-auto px-5 pb-5 font-sans text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground" data-lenis-prevent>
              {preview}
            </pre>
          </details>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className={cn(
                'inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-coral px-6 font-semibold text-white',
                'transition-[transform,background-color] duration-200 ease-out-expo hover:bg-coral-600 active:scale-[0.97]',
              )}
            >
              <MessageCircle className="size-4" />
              Enviar pelo WhatsApp
            </button>
            <button
              type="button"
              onClick={sendEmail}
              className={cn(
                'inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-petroleo/20 px-6 font-semibold text-petroleo',
                'transition-[transform,background-color,border-color] duration-200 ease-out-expo hover:border-petroleo/40 hover:bg-petroleo-50 active:scale-[0.97]',
              )}
            >
              <Mail className="size-4" />
              Enviar por e-mail
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Nada é enviado automaticamente: você revisa a mensagem no WhatsApp ou no seu e-mail antes de mandar.
          </p>
        </form>
      </div>
    </section>
  )
}
