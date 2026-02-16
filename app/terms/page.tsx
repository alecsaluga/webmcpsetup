import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for webmcpsetup.ai. Review our service terms, engagement process, and intellectual property policies.',
  keywords: ['Terms of service', 'Service agreement', 'WebMCP services', 'Legal terms'],
  openGraph: {
    title: 'Terms of Service | webmcpsetup.ai',
    description: 'Terms of service for webmcpsetup.ai. Review our service terms, engagement process, and intellectual property policies.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://webmcpsetup.ai/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="section-container max-w-3xl">
      <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8">
        Terms of Service
      </h1>

      <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Services</h2>
          <p>
            webmcpsetup.ai provides WebMCP implementation and Agent Experience Optimization (AEO)
            services. The scope of services, deliverables, timeline, and pricing will be outlined
            in a detailed proposal following your intake submission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Engagement Process</h2>
          <p>
            Upon submitting an intake form, you will receive a proposal within 48 hours. Services
            begin only after mutual agreement on scope, timeline, and terms via a signed statement
            of work or service agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Intellectual Property</h2>
          <p>
            Upon full payment, all custom code and implementations created specifically for your
            project will be transferred to you. General frameworks, methodologies, and tools
            developed by webmcpsetup.ai remain our intellectual property.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Warranty and Liability</h2>
          <p>
            We warrant that our services will be performed in a professional manner consistent with
            industry standards. Our liability is limited to the fees paid for the specific services
            that gave rise to the claim.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Contact</h2>
          <p>
            For questions about these terms, please contact us at legal@webmcpsetup.ai.
          </p>
        </section>
      </div>
    </div>
  )
}
