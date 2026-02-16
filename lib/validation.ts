import { z } from 'zod'

export const intakeSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  website_url: z.string().url('Invalid website URL'),
  what_are_you_building: z.enum(['lead_gen', 'ecommerce', 'saas', 'marketplace', 'content', 'other']),
  auth_required: z.enum(['no_login', 'login_required']),
  primary_user_actions: z.array(z.string()).min(1, 'Select at least one primary action'),
  current_stack: z.string().min(1, 'Current tech stack is required'),
  timeline: z.enum(['1-2_weeks', '2-4_weeks', '1-2_months', '2-3_months', 'flexible']),
  notes: z.string().optional(),
})

export type IntakeSchema = z.infer<typeof intakeSchema>
