export const toolSchemas = {
  get_intake_form_schema: {
    name: 'get_intake_form_schema',
    description: 'Get the JSON Schema for the WebMCP setup intake form. Use this tool to understand what fields are required when submitting an intake request.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    },
    readOnlyHint: true
  },

  validate_intake: {
    name: 'validate_intake',
    description: 'Validate an intake form payload without submitting it. Use this tool to check if the data is valid before calling submit_intake.',
    inputSchema: {
      type: 'object',
      properties: {
        payload: {
          type: 'object',
          description: 'The intake form data to validate',
          properties: {
            full_name: { type: 'string', description: 'Full name of the person submitting' },
            email: { type: 'string', format: 'email', description: 'Email address' },
            company: { type: 'string', description: 'Company name (optional)' },
            website_url: { type: 'string', format: 'uri', description: 'Website URL' },
            what_are_you_building: {
              type: 'string',
              enum: ['lead_gen', 'ecommerce', 'saas', 'marketplace', 'content', 'other'],
              description: 'Type of website'
            },
            auth_required: {
              type: 'string',
              enum: ['no_login', 'login_required'],
              description: 'Authentication requirement'
            },
            primary_user_actions: {
              type: 'array',
              items: { type: 'string' },
              description: 'Primary user actions (multiple selections allowed)'
            },
            current_stack: { type: 'string', description: 'Current tech stack' },
            timeline: {
              type: 'string',
              enum: ['1-2_weeks', '2-4_weeks', '1-2_months', '2-3_months', 'flexible'],
              description: 'Desired timeline'
            },
            notes: { type: 'string', description: 'Additional notes (optional)' }
          },
          required: ['full_name', 'email', 'website_url', 'what_are_you_building', 'auth_required', 'primary_user_actions', 'current_stack', 'timeline']
        }
      },
      required: ['payload']
    },
    readOnlyHint: true
  },

  submit_intake: {
    name: 'submit_intake',
    description: 'Submit a WebMCP setup intake form. Use this tool to request WebMCP implementation services. The form will be reviewed and you will receive a response within 24 hours.',
    inputSchema: {
      type: 'object',
      properties: {
        payload: {
          type: 'object',
          description: 'The complete intake form data',
          properties: {
            full_name: { type: 'string', description: 'Full name of the person submitting' },
            email: { type: 'string', format: 'email', description: 'Email address' },
            company: { type: 'string', description: 'Company name (optional)' },
            website_url: { type: 'string', format: 'uri', description: 'Website URL' },
            what_are_you_building: {
              type: 'string',
              enum: ['lead_gen', 'ecommerce', 'saas', 'marketplace', 'content', 'other'],
              description: 'Type of website'
            },
            auth_required: {
              type: 'string',
              enum: ['no_login', 'login_required'],
              description: 'Authentication requirement'
            },
            primary_user_actions: {
              type: 'array',
              items: { type: 'string' },
              description: 'Primary user actions (multiple selections allowed)'
            },
            current_stack: { type: 'string', description: 'Current tech stack' },
            timeline: {
              type: 'string',
              enum: ['1-2_weeks', '2-4_weeks', '1-2_months', '2-3_months', 'flexible'],
              description: 'Desired timeline'
            },
            notes: { type: 'string', description: 'Additional notes (optional)' }
          },
          required: ['full_name', 'email', 'website_url', 'what_are_you_building', 'auth_required', 'primary_user_actions', 'current_stack', 'timeline']
        }
      },
      required: ['payload']
    },
    readOnlyHint: false
  },

  get_next_steps: {
    name: 'get_next_steps',
    description: 'Get information about next steps after submitting an intake form. Use this tool to learn what happens after submission.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    },
    readOnlyHint: true
  }
}

export type ToolName = keyof typeof toolSchemas
