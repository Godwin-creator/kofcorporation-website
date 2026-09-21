import { NextResponse } from 'next/server'

import { resend } from '@/lib/resend'
import { contactSchema } from '@/lib/validators/contact'
import type { ContactForm } from '@/types/contact'

const MAX_BODY_SIZE = 10 * 1024

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const formatDateTime = (date = new Date()) =>
  new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)

const resendFrom = process.env.RESEND_FROM || 'KofCorporation <noreply@kofcorporation.com>'
const adminRecipient = process.env.CONTACT_TO || 'contact@kofcorporation.com'

const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    return { ok: false, reason: 'reCAPTCHA secret missing' }
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
    }),
  })

  if (!response.ok) {
    return { ok: false, reason: 'reCAPTCHA verification request failed' }
  }

  const payload = (await response.json()) as {
    success?: boolean
    score?: number
    action?: string
  }

  if (!payload.success || typeof payload.score !== 'number' || payload.score < 0.5) {
    return { ok: false, reason: 'reCAPTCHA score too low' }
  }

  return { ok: true }
}

const buildInternalEmailHtml = (payload: ContactForm & { submittedAt: string }) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 640px; margin: 0 auto;">
    <h2 style="margin: 0 0 16px; color: #2f3974;">Nouveau message — ${escapeHtml(payload.subject)}</h2>
    <p style="margin: 0 0 12px;"><strong>Nom :</strong> ${escapeHtml(payload.fullName)}</p>
    <p style="margin: 0 0 12px;"><strong>Email :</strong> ${escapeHtml(payload.email)}</p>
    <p style="margin: 0 0 12px;"><strong>Sujet :</strong> ${escapeHtml(payload.subject)}</p>
    <p style="margin: 0 0 12px;"><strong>Langue :</strong> ${escapeHtml(payload.locale ?? 'fr')}</p>
    <p style="margin: 0 0 12px;"><strong>Date :</strong> ${escapeHtml(payload.submittedAt)}</p>
    <div style="margin-top: 20px; padding: 16px; background: #f8f9fa; border-left: 4px solid #0cace8;">
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  </div>
`

const buildConfirmationEmailHtml = (payload: ContactForm & { submittedAt: string }) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #1a1a2e; max-width: 640px; margin: 0 auto;">
    <h2 style="margin: 0 0 16px; color: #2f3974;">Nous avons bien reçu votre message</h2>
    <p style="margin: 0 0 12px;">Bonjour ${escapeHtml(payload.fullName)},</p>
    <p style="margin: 0 0 12px;">
      Merci pour votre message concernant <strong>${escapeHtml(payload.subject)}</strong>.
      Notre équipe a bien reçu votre demande et reviendra vers vous dans les plus brefs délais.
    </p>
    <p style="margin: 0 0 12px;">
      Délai de réponse estimé : <strong>24 à 48h ouvrables</strong>.
    </p>
    <p style="margin: 0 0 12px;">Voici le résumé de votre message :</p>
    <div style="padding: 16px; background: #f8f9fa; border-left: 4px solid #0cace8; margin-bottom: 16px;">
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
    <p style="margin: 0 0 12px;">À très bientôt,</p>
    <p style="margin: 0; color: #2f3974; font-weight: 600;">L’équipe KofCorporation</p>
    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
      <p style="margin: 0 0 4px;">KofCorporation</p>
      <p style="margin: 0 0 4px;">Lomé, Togo</p>
      <p style="margin: 0 0 4px;">+228 70 44 16 36 | +228 93 55 47 40</p>
      <p style="margin: 0;">contact@kofcorporation.com</p>
    </div>
  </div>
`

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Content-Type invalide.' }, { status: 400 })
  }

  let rawBody = ''
  try {
    rawBody = await request.text()
  } catch {
    return NextResponse.json({ error: 'Impossible de lire le corps de la requête.' }, { status: 400 })
  }

  if (rawBody.length === 0 || rawBody.length > MAX_BODY_SIZE) {
    return NextResponse.json({ error: 'Le formulaire est invalide ou trop volumineux.' }, { status: 400 })
  }

  let body: unknown
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Le corps JSON est invalide.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Données du formulaire invalides.',
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  const { recaptchaToken, ...formData } = parsed.data
  const recaptchaValidation = await verifyRecaptcha(recaptchaToken)

  if (!recaptchaValidation.ok) {
    return NextResponse.json({ error: 'Vérification anti-spam échouée.' }, { status: 400 })
  }

  const sanitizedForm = {
    ...formData,
    fullName: escapeHtml(formData.fullName.trim()),
    email: escapeHtml(formData.email.trim()),
    subject: escapeHtml(formData.subject.trim()),
    message: escapeHtml(formData.message.trim()),
    locale: formData.locale ? escapeHtml(formData.locale) : undefined,
  }

  const submittedAt = formatDateTime()

  try {
    await resend.emails.send({
      from: resendFrom,
      to: [adminRecipient],
      subject: `Nouveau message — ${sanitizedForm.subject}`,
      html: buildInternalEmailHtml({
        ...sanitizedForm,
        submittedAt,
      }),
    })

    await resend.emails.send({
      from: resendFrom,
      to: [sanitizedForm.email],
      subject: 'Nous avons bien reçu votre message',
      html: buildConfirmationEmailHtml({
        ...sanitizedForm,
        submittedAt,
      }),
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Le message n’a pas pu être envoyé. Veuillez réessayer plus tard.' },
      { status: 500 }
    )
  }
}
