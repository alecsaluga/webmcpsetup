import { NextRequest, NextResponse } from 'next/server'
import { intakeSchema } from '@/lib/validation'
import { IntakeFormData, IntakeResponse } from '@/lib/types'

// In-memory storage for development
const submissions: Array<IntakeFormData & { lead_id: string; received_at: string }> = []

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS = 5 // 5 submissions per hour per IP

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown'
  return ip
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(key) || []

  // Remove old timestamps outside the window
  const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW)

  if (validTimestamps.length >= MAX_REQUESTS) {
    return true
  }

  validTimestamps.push(now)
  rateLimitMap.set(key, validTimestamps)
  return false
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(req)
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Rate limit exceeded. Please try again later.',
        } as IntakeResponse,
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await req.json()
    const validationResult = intakeSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Validation failed',
          errors: validationResult.error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Generate lead ID
    const lead_id = `LEAD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    const received_at = new Date().toISOString()

    // Store submission (in-memory for development)
    const submission = {
      ...data,
      lead_id,
      received_at,
    }
    submissions.push(submission)

    // Log to console for development
    console.log('='.repeat(80))
    console.log('NEW INTAKE SUBMISSION')
    console.log('='.repeat(80))
    console.log(JSON.stringify(submission, null, 2))
    console.log('='.repeat(80))
    console.log(`Total submissions: ${submissions.length}`)
    console.log('='.repeat(80))

    // Send webhook to n8n
    try {
      const webhookUrl = 'https://n8n.alecautomations.com/webhook/2359a341-46a2-4d23-8868-ed0d827d4c97'
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      })
      console.log('[Webhook] Sent to n8n successfully')
    } catch (webhookError) {
      console.error('[Webhook] Failed to send to n8n:', webhookError)
      // Don't fail the request if webhook fails
    }

    // TODO: Send confirmation email

    return NextResponse.json({
      ok: true,
      lead_id,
      received_at,
      message: 'Intake form submitted successfully',
    } as IntakeResponse)

  } catch (error) {
    console.error('Intake API error:', error)
    return NextResponse.json(
      {
        ok: false,
        message: 'Internal server error',
      } as IntakeResponse,
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve submissions (for testing/debugging)
export async function GET() {
  return NextResponse.json({
    total: submissions.length,
    submissions: submissions.map(s => ({
      lead_id: s.lead_id,
      received_at: s.received_at,
      email: s.email,
      company: s.company,
    }))
  })
}
