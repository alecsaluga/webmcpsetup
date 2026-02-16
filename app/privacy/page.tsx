import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for webmcpsetup.ai. Learn how we collect, use, and protect your information.',
  keywords: ['Privacy policy', 'Data protection', 'GDPR', 'Information security'],
  openGraph: {
    title: 'Privacy Policy | webmcpsetup.ai',
    description: 'Privacy policy for webmcpsetup.ai. Learn how we collect, use, and protect your information.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://webmcpsetup.ai/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="section-container max-w-3xl">
      <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8">
        Privacy Policy
      </h1>

      <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Information We Collect</h2>
          <p>
            When you submit our intake form, we collect the information you provide including your name,
            email address, company details, website URL, and project requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">How We Use Your Information</h2>
          <p>
            We use the information you provide to evaluate your project requirements, prepare proposals,
            and communicate with you about our services. We do not sell or share your information with
            third parties except as necessary to provide our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Data Storage</h2>
          <p>
            Your information is stored securely and retained only as long as necessary to fulfill the
            purposes outlined in this policy or as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. To exercise
            these rights, please contact us at privacy@webmcpsetup.ai.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Contact</h2>
          <p>
            For questions about this privacy policy, please contact us at privacy@webmcpsetup.ai.
          </p>
        </section>
      </div>
    </div>
  )
}
