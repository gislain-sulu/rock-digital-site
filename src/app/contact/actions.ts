'use server';

import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2, 'Veuillez indiquer votre nom (2 caractères minimum).'),
  email: z.string().email("Adresse e-mail invalide."),
  company: z.string().optional(),
  subject: z
    .string()
    .min(2, "Veuillez indiquer l'objet de votre demande."),
  budget: z.string().optional(),
  message: z
    .string()
    .min(20, 'Merci de détailler votre besoin (20 caractères minimum).'),
  consent: z
    .union([z.literal('on'), z.literal('true'), z.boolean()])
    .refine((value) => value === true || value === 'on' || value === 'true', {
      message: "Vous devez accepter la politique de confidentialité.",
    }),
});

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof ContactSchema>, string>>;
};

export async function contactAction(
  _state: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company') ?? undefined,
    subject: formData.get('subject'),
    budget: formData.get('budget') ?? undefined,
    message: formData.get('message'),
    consent: formData.get('consent'),
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactState['errors'] = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0];
      if (typeof path === 'string') {
        errors[path as keyof typeof errors] = issue.message;
      }
    }
    return {
      status: 'error',
      message: 'Merci de vérifier les champs du formulaire.',
      errors,
    };
  }

  // NOTE: production-ready integration point (e.g. Resend, Postmark, Slack webhook)
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    status: 'success',
    message:
      'Merci ! Votre message a bien été envoyé. Nous revenons vers vous sous 24h ouvrées.',
  };
}
