'use client'

import { useState } from 'react'
import { IntakeFormData, IntakeResponse } from '@/lib/types'

export default function IntakeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<IntakeResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Detect if this is an agent invocation
    const agentInvoked = (e as any).agentInvoked

    // Prevent default form submission for regular browser users
    if (!agentInvoked) {
      e.preventDefault()
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)

      // Get all selected primary_user_actions
      const primaryActions = formData.getAll('primary_user_actions') as string[]

      const payload: IntakeFormData = {
        full_name: formData.get('full_name') as string,
        email: formData.get('email') as string,
        company: formData.get('company') as string || undefined,
        website_url: formData.get('website_url') as string,
        what_are_you_building: formData.get('what_are_you_building') as any,
        auth_required: formData.get('auth_required') as any,
        primary_user_actions: primaryActions,
        current_stack: formData.get('current_stack') as string,
        timeline: formData.get('timeline') as any,
        notes: formData.get('notes') as string,
      }

      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result: IntakeResponse = await response.json()

      if (agentInvoked) {
        // For agent invocations, respond with structured data
        const agentEvent = e as any
        if (agentEvent.respondWith) {
          agentEvent.respondWith(Promise.resolve({
            success: result.ok,
            lead_id: result.lead_id,
            received_at: result.received_at,
            message: result.ok
              ? 'Intake form submitted successfully. You will receive a confirmation email within 24 hours.'
              : result.message || 'Submission failed',
            next_steps: result.ok ? [
              'Confirmation email sent to ' + payload.email,
              'Discovery call will be scheduled within 24 hours',
              'Proposal with timeline and pricing will follow',
              'Implementation begins within one week of approval'
            ] : []
          }))
        }
      } else {
        // For regular browser users, show success UI
        if (result.ok) {
          setSuccess(result)
        } else {
          setError(result.message || 'An error occurred. Please try again.')
        }
      }
    } catch (err) {
      const errorMessage = 'Failed to submit form. Please try again.'

      if ((e as any).agentInvoked && (e as any).respondWith) {
        (e as any).respondWith(Promise.resolve({
          success: false,
          error: errorMessage
        }))
      } else {
        setError(errorMessage)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="border border-[#ff5a00] bg-black/60 p-8 rounded">
        <h2 className="text-4xl font-black text-white mb-6">Submission received</h2>
        <div className="space-y-4 text-white/80">
          <p>
            <span className="font-bold text-white">Lead ID:</span> {success.lead_id}
          </p>
          <p>
            <span className="font-bold text-white">Received:</span>{' '}
            {new Date(success.received_at).toLocaleString()}
          </p>

          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">What happens next:</h3>
            <ul className="space-y-3 text-lg text-white/70">
              <li>• Confirmation email sent to your inbox</li>
              <li>• We will contact you within 24 hours to schedule a discovery call</li>
              <li>• You will receive a detailed proposal with timeline and pricing</li>
              <li>• Implementation begins within one week of approval</li>
            </ul>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-lg text-white/80">
              <span className="font-bold text-white">Schedule a call now:</span>{' '}
              <a
                href="https://calendly.com/webmcpsetup"
                className="text-[#ff5a00] hover:text-[#ff6a10] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                calendly.com/webmcpsetup
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      // @ts-ignore - WebMCP attributes
      toolname="submit_webmcp_setup_intake"
      // @ts-ignore - WebMCP attributes
      tooldescription="Submit a WebMCP setup intake form to request implementation services. Use this tool when a user wants to get a quote, start a project, or request WebMCP implementation for their website."
      className="space-y-8"
    >
      {error && (
        <div className="p-6 border border-red-500 bg-red-500/10 text-red-400 rounded">
          {error}
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="full_name" className="block text-lg font-bold text-white mb-3">
          Full Name <span className="text-[#ff5a00]">*</span>
        </label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          required
          className="w-full bg-black/60 border border-white/10 text-white p-4 rounded focus:outline-none focus:border-[#ff5a00] transition-colors"
          // @ts-ignore - WebMCP attributes
          toolparamdescription="The full name of the person submitting the request"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-lg font-bold text-white mb-3">
          Email <span className="text-[#ff5a00]">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-black/60 border border-white/10 text-white p-4 rounded focus:outline-none focus:border-[#ff5a00] transition-colors"
          // @ts-ignore - WebMCP attributes
          toolparamdescription="Email address for contact and confirmation"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-lg font-bold text-white mb-3">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full bg-black/60 border border-white/10 text-white p-4 rounded focus:outline-none focus:border-[#ff5a00] transition-colors"
          // @ts-ignore - WebMCP attributes
          toolparamdescription="Company or organization name (optional)"
        />
      </div>

      {/* Website URL */}
      <div>
        <label htmlFor="website_url" className="block text-lg font-bold text-white mb-3">
          Website URL <span className="text-[#ff5a00]">*</span>
        </label>
        <input
          type="url"
          id="website_url"
          name="website_url"
          required
          placeholder="https://"
          className="w-full bg-black/60 border border-white/10 text-white p-4 rounded focus:outline-none focus:border-[#ff5a00] transition-colors placeholder:text-white/40"
          // @ts-ignore - WebMCP attributes
          toolparamdescription="The URL of the website that needs WebMCP implementation"
        />
      </div>

      {/* What are you building */}
      <div>
        <label htmlFor="what_are_you_building" className="block text-lg font-bold text-white mb-3">
          What are you building? <span className="text-[#ff5a00]">*</span>
        </label>
        <select
          id="what_are_you_building"
          name="what_are_you_building"
          required
          className="w-full bg-black/60 border border-white/10 text-white p-4 rounded focus:outline-none focus:border-[#ff5a00] transition-colors"
          // @ts-ignore - WebMCP attributes
          toolparamdescription="The type of website or application"
        >
          <option value="">Select type</option>
          <option value="lead_gen">Lead Generation</option>
          <option value="ecommerce">E-commerce</option>
          <option value="saas">SaaS Product</option>
          <option value="marketplace">Marketplace</option>
          <option value="content">Content Site</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Auth Required */}
      <div>
        <label htmlFor="auth_required" className="block text-lg font-bold text-white mb-3">
          Authentication <span className="text-[#ff5a00]">*</span>
        </label>
        <select
          id="auth_required"
          name="auth_required"
          required
          className="w-full bg-black/60 border border-white/10 text-white p-4 rounded focus:outline-none focus:border-[#ff5a00] transition-colors"
          // @ts-ignore - WebMCP attributes
          toolparamdescription="Whether the site requires user login for key actions"
        >
          <option value="">Select option</option>
          <option value="no_login">No login required</option>
          <option value="login_required">Login required</option>
        </select>
      </div>

      {/* Primary User Actions */}
      <div>
        <label className="block text-lg font-bold text-white mb-3">
          Primary User Actions <span className="text-[#ff5a00]">*</span>
        </label>
        <p className="text-sm text-white/60 mb-4">Select all that apply</p>
        <div className="space-y-3">
          {['book', 'buy', 'quote', 'apply', 'contact', 'search', 'subscribe', 'download', 'other'].map((action) => (
            <label key={action} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                name="primary_user_actions"
                value={action}
                className="mr-4 w-5 h-5 bg-black/60 border border-white/10 rounded text-[#ff5a00] focus:ring-[#ff5a00]"
                // @ts-ignore - WebMCP attributes
                toolparamdescription="Key actions users perform on the site (can select multiple)"
              />
              <span className="text-lg text-white/80 group-hover:text-white capitalize">{action}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Current Stack */}
      <div>
        <label htmlFor="current_stack" className="block text-lg font-bold text-white mb-3">
          Current Tech Stack <span className="text-[#ff5a00]">*</span>
        </label>
        <input
          type="text"
          id="current_stack"
          name="current_stack"
          required
          placeholder="e.g., Next.js, React, WordPress, Ruby on Rails"
          className="w-full bg-black/60 border border-white/10 text-white p-4 rounded focus:outline-none focus:border-[#ff5a00] transition-colors placeholder:text-white/40"
          // @ts-ignore - WebMCP attributes
          toolparamdescription="The technologies and frameworks currently used"
        />
      </div>

      {/* Timeline */}
      <div>
        <label htmlFor="timeline" className="block text-lg font-bold text-white mb-3">
          Timeline <span className="text-[#ff5a00]">*</span>
        </label>
        <select
          id="timeline"
          name="timeline"
          required
          className="w-full bg-black/60 border border-white/10 text-white p-4 rounded focus:outline-none focus:border-[#ff5a00] transition-colors"
          // @ts-ignore - WebMCP attributes
          toolparamdescription="Desired implementation timeline"
        >
          <option value="">Select timeline</option>
          <option value="1-2_weeks">1-2 weeks</option>
          <option value="2-4_weeks">2-4 weeks</option>
          <option value="1-2_months">1-2 months</option>
          <option value="2-3_months">2-3 months</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-lg font-bold text-white mb-3">
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={6}
          className="w-full bg-black/60 border border-white/10 text-white p-4 rounded focus:outline-none focus:border-[#ff5a00] transition-colors placeholder:text-white/40"
          placeholder="Any additional context, requirements, or questions"
          // @ts-ignore - WebMCP attributes
          toolparamdescription="Additional notes, requirements, or questions (optional)"
        />
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#ff5a00] text-black font-bold uppercase tracking-wider text-lg px-8 py-5 rounded hover:bg-[#ff6a10] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit intake form'}
        </button>
      </div>
    </form>
  )
}
