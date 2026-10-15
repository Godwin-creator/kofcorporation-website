import { z } from 'zod'

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Le nom doit contenir au moins 2 caractères.')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères.'),
  email: z.string().trim().email('L’adresse e-mail est invalide.').max(254, 'L’adresse e-mail est trop longue.'),
  subject: z
    .string()
    .trim()
    .refine(
      (value) => ['web', 'mobile', 'software', 'training', 'other'].includes(value),
      'Veuillez sélectionner un sujet.'
    ),
  message: z
    .string()
    .trim()
    .min(10, 'Le message doit contenir au moins 10 caractères.')
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères.'),
  locale: z.enum(['fr', 'en']).optional(),
  recaptchaToken: z.string().min(1, 'Le jeton reCAPTCHA est invalide.'),
})
