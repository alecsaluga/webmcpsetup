'use client'

import { useEffect } from 'react'
import { intakeSchema } from '@/lib/validation'

declare global {
  interface Navigator {
    modelContext?: {
      registerTool: (config: {
        name: string
        description: string
        inputSchema: any
        execute: (input: any) => Promise<any>
        readOnlyHint?: boolean
      }) => void
    }
  }

  interface Window {
    webmcpTools?: any
  }
}

export default function WebMCPTools() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Prevent duplicate registration
    if ((window as any).__webmcpToolsRegistered) {
      console.log('[WebMCP] Tools already registered, skipping')
      return
    }

    // Tool implementations
    const tools = {
      get_intake_form_schema: async () => {
        return {
          schema: {
            type: 'object',
            properties: {
              full_name: {
                type: 'string',
                description: 'Full name of the person submitting',
                minLength: 1
              },
              email: {
                type: 'string',
                format: 'email',
                description: 'Email address for contact'
              },
              company: {
                type: 'string',
                description: 'Company or organization name (optional)'
              },
              website_url: {
                type: 'string',
                format: 'uri',
                description: 'URL of the website that needs WebMCP implementation'
              },
              what_are_you_building: {
                type: 'string',
                enum: ['lead_gen', 'ecommerce', 'saas', 'marketplace', 'content', 'other'],
                description: 'Type of website or application'
              },
              auth_required: {
                type: 'string',
                enum: ['no_login', 'login_required'],
                description: 'Whether the site requires authentication'
              },
              primary_user_actions: {
                type: 'array',
                items: { type: 'string' },
                description: 'Key user actions (multiple selections allowed)',
                minItems: 1
              },
              current_stack: {
                type: 'string',
                description: 'Current technologies and frameworks used',
                minLength: 1
              },
              timeline: {
                type: 'string',
                enum: ['1-2_weeks', '2-4_weeks', '1-2_months', '2-3_months', 'flexible'],
                description: 'Desired implementation timeline'
              },
              notes: {
                type: 'string',
                description: 'Additional notes or requirements (optional)'
              }
            },
            required: [
              'full_name',
              'email',
              'website_url',
              'what_are_you_building',
              'auth_required',
              'primary_user_actions',
              'current_stack',
              'timeline'
            ]
          },
          field_descriptions: {
            full_name: 'Full name of the person submitting the request',
            email: 'Email address for contact and confirmation',
            company: 'Company or organization name (optional)',
            website_url: 'The URL of the website that needs WebMCP implementation',
            what_are_you_building: 'Type of website: lead_gen, ecommerce, saas, marketplace, content, or other',
            auth_required: 'Whether the site requires user login: no_login or login_required',
            primary_user_actions: 'Primary actions users perform (e.g., book, buy, quote, apply, contact)',
            current_stack: 'Current tech stack and frameworks',
            timeline: 'Desired timeline: 1-2_weeks, 2-4_weeks, 1-2_months, 2-3_months, or flexible',
            notes: 'Any additional context, requirements, or questions'
          }
        }
      },

      validate_intake: async (input: any) => {
        const { payload } = input
        const result = intakeSchema.safeParse(payload)

        if (result.success) {
          return {
            valid: true,
            errors: []
          }
        }

        return {
          valid: false,
          errors: result.error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        }
      },

      submit_intake: async (input: any) => {
        const { payload } = input

        const response = await fetch('/api/intake', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        const result = await response.json()

        if (result.ok) {
          return {
            success: true,
            lead_id: result.lead_id,
            received_at: result.received_at,
            message: 'Intake form submitted successfully',
            next_steps: [
              'Confirmation email sent to ' + payload.email,
              'We will contact you within 24 hours to schedule a discovery call',
              'You will receive a detailed proposal with timeline and pricing',
              'Implementation begins within one week of approval'
            ]
          }
        }

        return {
          success: false,
          error: result.message || 'Submission failed',
          errors: result.errors || []
        }
      },

      get_next_steps: async () => {
        return {
          calendly_url: 'https://calendly.com/webmcpsetup',
          expected_response_time: '24 hours',
          next_steps: [
            'You will receive a confirmation email within 24 hours',
            'We will schedule a 30-minute discovery call to review your requirements',
            'You will receive a detailed proposal with scope, timeline, and pricing',
            'Upon approval, implementation begins within one week',
            'Most projects are completed within 2-4 weeks depending on complexity'
          ]
        }
      }
    }

    // Expose tools globally for the playground
    window.webmcpTools = tools

    // Register tools with navigator.modelContext if available
    if (navigator.modelContext && navigator.modelContext.registerTool) {
      // Tool 1: get_intake_form_schema
      navigator.modelContext.registerTool({
        name: 'get_intake_form_schema',
        description: 'Get the JSON Schema for the WebMCP setup intake form. Use this tool to understand what fields are required when submitting an intake request.',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        },
        execute: tools.get_intake_form_schema,
        readOnlyHint: true
      })

      // Tool 2: validate_intake
      navigator.modelContext.registerTool({
        name: 'validate_intake',
        description: 'Validate an intake form payload without submitting it. Use this tool to check if the data is valid before calling submit_intake.',
        inputSchema: {
          type: 'object',
          properties: {
            payload: {
              type: 'object',
              description: 'The intake form data to validate'
            }
          },
          required: ['payload']
        },
        execute: tools.validate_intake
      })

      // Tool 3: submit_intake
      navigator.modelContext.registerTool({
        name: 'submit_intake',
        description: 'Submit a WebMCP setup intake form. Use this tool to request WebMCP implementation services. The form will be reviewed and you will receive a response within 24 hours.',
        inputSchema: {
          type: 'object',
          properties: {
            payload: {
              type: 'object',
              description: 'The complete intake form data'
            }
          },
          required: ['payload']
        },
        execute: tools.submit_intake
      })

      // Tool 4: get_next_steps
      navigator.modelContext.registerTool({
        name: 'get_next_steps',
        description: 'Get information about next steps after submitting an intake form. Use this tool to learn what happens after submission.',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        },
        execute: tools.get_next_steps,
        readOnlyHint: true
      })

      console.log('[WebMCP] Registered 4 imperative tools via navigator.modelContext')
    } else {
      console.log('[WebMCP] navigator.modelContext not available - tools registered globally only')
    }

    // Mark as registered
    ;(window as any).__webmcpToolsRegistered = true
  }, [])

  return null
}
