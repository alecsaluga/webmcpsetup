import { Metadata } from 'next'
import Link from 'next/link'
import IntakeForm from './IntakeForm'

export const metadata: Metadata = {
  title: 'Intake Form',
  description: 'Submit your WebMCP setup requirements. We will respond within 24 hours with next steps.',
  keywords: ['WebMCP intake', 'Agent-ready website setup', 'WebMCP implementation request', 'AEO consultation'],
  openGraph: {
    title: 'Intake Form | webmcpsetup.ai',
    description: 'Submit your WebMCP setup requirements. We will respond within 24 hours with next steps.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://webmcpsetup.ai/intake',
  },
}

export default function IntakePage() {
  return (
    <div className="bg-dark-bg min-h-screen">
      <div className="max-w-[900px] mx-auto px-8 py-32">
        {/* Breadcrumbs */}
        <nav className="text-sm text-white/60 mb-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">→</span>
          <span className="text-white">Get Started</span>
        </nav>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6">
            Get started
          </h1>
          <p className="text-2xl text-white/80 leading-relaxed">
            Fill out this form to tell us about your project. We will respond within 24 hours
            to schedule a discovery call and provide a detailed proposal.
          </p>
        </div>

        <IntakeForm />

        <div className="mt-12 p-8 border border-white/10 bg-black/40 rounded">
          <h3 className="text-xl font-bold text-white mb-4">What happens next?</h3>
          <ol className="space-y-3 text-lg text-white/80">
            <li>1. You will receive a confirmation email within 24 hours</li>
            <li>2. We will schedule a 30-minute discovery call to review your requirements</li>
            <li>3. We will provide a detailed proposal with scope, timeline, and pricing</li>
            <li>4. Upon approval, we begin implementation within one week</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
