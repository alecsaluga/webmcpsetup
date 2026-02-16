export interface IntakeFormData {
  full_name: string
  email: string
  company?: string
  website_url: string
  what_are_you_building: 'lead_gen' | 'ecommerce' | 'saas' | 'marketplace' | 'content' | 'other'
  auth_required: 'no_login' | 'login_required'
  primary_user_actions: string[]
  current_stack: string
  timeline: '1-2_weeks' | '2-4_weeks' | '1-2_months' | '2-3_months' | 'flexible'
  notes: string
}

export interface IntakeResponse {
  ok: boolean
  lead_id: string
  received_at: string
  message?: string
}

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}
