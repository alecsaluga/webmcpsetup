import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Is WebMCP? A Practical Guide to Making Your Website Agent-Ready',
  description: 'WebMCP (Model Context Protocol for the web) is a structured way for websites to expose callable tools directly to AI agents. Learn how it works and why it matters.',
  keywords: ['What is WebMCP', 'WebMCP setup', 'Agent-ready website', 'AI agent website integration', 'Model Context Protocol'],
  openGraph: {
    title: 'What Is WebMCP? A Practical Guide to Making Your Website Agent-Ready',
    description: 'WebMCP (Model Context Protocol for the web) is a structured way for websites to expose callable tools directly to AI agents.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://webmcpsetup.ai/blog/what-is-webmcp',
  },
}

const faqData = [
  {
    question: "Is WebMCP the same as an API?",
    answer: "No. APIs require prior integration and documentation exchange. WebMCP tools are embedded directly in web pages and discoverable by agents browsing your site. They combine the discoverability of web interfaces with the structure of APIs."
  },
  {
    question: "Do I need to change my existing website?",
    answer: "WebMCP is a progressive enhancement. Your existing UI remains unchanged for human users. Tools are added as a parallel layer that agents can discover and invoke."
  },
  {
    question: "What frameworks does WebMCP support?",
    answer: "WebMCP is framework-agnostic. It works with Next.js, React, Vue, vanilla JavaScript, WordPress, or any technology that outputs HTML."
  },
  {
    question: "How do agents discover WebMCP tools?",
    answer: "Agents parse HTML for declarative tools (toolname attributes) or access navigator.modelContext for imperative tools registered via JavaScript APIs."
  },
  {
    question: "Will WebMCP slow down my site?",
    answer: "No. WebMCP tools are lightweight and only execute when invoked by agents. They have no impact on page load or rendering for human users."
  }
]

export default function WhatIsWebMCPArticle() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://webmcpsetup.ai/blog/what-is-webmcp#article',
        'headline': 'What Is WebMCP? A Practical Guide to Making Your Website Agent-Ready',
        'description': 'WebMCP (Model Context Protocol for the web) is a structured way for websites to expose callable tools directly to AI agents.',
        'author': {
          '@type': 'Organization',
          'name': 'webmcpsetup.ai'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'webmcpsetup.ai',
          'url': 'https://webmcpsetup.ai'
        },
        'datePublished': '2026-02-16',
        'dateModified': '2026-02-16',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': 'https://webmcpsetup.ai/blog/what-is-webmcp'
        },
        'keywords': ['WebMCP', 'Agent-Ready Website', 'AI Agent Integration', 'Model Context Protocol']
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://webmcpsetup.ai/blog/what-is-webmcp#faq',
        'mainEntity': faqData.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="bg-dark-bg min-h-screen">
        <div className="max-w-[900px] mx-auto px-8 py-32">
          {/* Breadcrumbs */}
          <nav className="text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <span className="mx-2">→</span>
            <span className="text-white">What Is WebMCP</span>
          </nav>

          {/* Header */}
          <header className="mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              What Is WebMCP? A Practical Guide to Making Your Website Agent-Ready
            </h1>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <time dateTime="2026-02-16">February 16, 2026</time>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Clear Definition Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">What Is WebMCP?</h2>
              <p className="text-xl text-white/90 leading-relaxed mb-4">
                WebMCP (Model Context Protocol for the web) is a structured way for websites to expose callable tools directly to AI agents.
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                Instead of forcing agents to scrape HTML, parse DOM structures, or simulate user clicks, WebMCP provides explicit, schema-based interfaces. Agents can discover what actions are possible, understand requirements, and execute reliably.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                WebMCP enables websites to become agent-callable without rebuilding as APIs.
              </p>
            </section>

            {/* Why WebMCP Exists */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Why WebMCP Exists</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                AI agents are beginning to browse, compare, and transact on behalf of users. They need structured interfaces to operate reliably.
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                Traditional web scraping is brittle. CSS selectors break with UI updates. Dynamic content requires complex execution contexts. Schema changes go undetected. Agents fail frequently.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                WebMCP solves this by making websites explicitly agent-callable through structured tool definitions.
              </p>
            </section>

            {/* Scraping vs WebMCP */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Scraping vs WebMCP: The Difference</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-black/40 border border-white/10 p-6 rounded">
                  <h3 className="text-lg font-bold text-white/60 mb-4 uppercase tracking-wide">Traditional Scraping</h3>
                  <ul className="space-y-3 text-white/70">
                    <li>→ Parses HTML structure</li>
                    <li>→ Relies on CSS selectors</li>
                    <li>→ Breaks with UI changes</li>
                    <li>→ No schema validation</li>
                    <li>→ High failure rate</li>
                    <li>→ Requires constant maintenance</li>
                  </ul>
                </div>
                <div className="bg-black/40 border border-[#ff5a00]/30 p-6 rounded">
                  <h3 className="text-lg font-bold text-[#ff5a00] mb-4 uppercase tracking-wide">WebMCP Tools</h3>
                  <ul className="space-y-3 text-white">
                    <li>→ Explicit tool schemas</li>
                    <li>→ Versioned interfaces</li>
                    <li>→ UI-independent</li>
                    <li>→ Type-safe inputs/outputs</li>
                    <li>→ Deterministic execution</li>
                    <li>→ Self-documenting</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* What Makes a Website Agent-Ready */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">What Makes a Website Agent-Ready?</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                An agent-ready website exposes its key user actions as structured tools. This includes:
              </p>
              <ol className="space-y-4 text-lg text-white/90">
                <li>
                  <strong className="text-white">1. Tool Discovery</strong><br/>
                  Agents can find available tools by parsing HTML (declarative) or accessing navigator.modelContext (imperative).
                </li>
                <li>
                  <strong className="text-white">2. Clear Schemas</strong><br/>
                  Each tool has an explicit JSON Schema defining inputs, outputs, and requirements.
                </li>
                <li>
                  <strong className="text-white">3. Validation</strong><br/>
                  Tools validate inputs server-side and return structured errors when validation fails.
                </li>
                <li>
                  <strong className="text-white">4. Deterministic Responses</strong><br/>
                  Tools return predictable, structured JSON responses that agents can parse reliably.
                </li>
                <li>
                  <strong className="text-white">5. Progressive Enhancement</strong><br/>
                  Tools are invisible to human users. The existing UI remains unchanged.
                </li>
              </ol>
            </section>

            {/* Real Example */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Real Example: WebMCP for Lead Generation</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                Consider a lead generation website. An agent-ready version would expose these tools:
              </p>

              <div className="space-y-6">
                <div className="bg-black/60 border border-white/10 p-6 rounded">
                  <h3 className="font-mono text-[#ff5a00] font-bold mb-3">getFormSchema()</h3>
                  <p className="text-white/70 mb-2">Returns the JSON Schema for the lead form.</p>
                  <pre className="bg-near-black p-4 rounded text-sm text-white/80 font-mono overflow-x-auto">
{`{
  "name": "string (required)",
  "email": "string (email, required)",
  "company": "string (optional)",
  "message": "string (required)"
}`}
                  </pre>
                </div>

                <div className="bg-black/60 border border-white/10 p-6 rounded">
                  <h3 className="font-mono text-[#ff5a00] font-bold mb-3">validateForm(payload)</h3>
                  <p className="text-white/70 mb-2">Validates form data without submitting.</p>
                  <pre className="bg-near-black p-4 rounded text-sm text-white/80 font-mono overflow-x-auto">
{`{
  "valid": true,
  "errors": []
}`}
                  </pre>
                </div>

                <div className="bg-black/60 border border-white/10 p-6 rounded">
                  <h3 className="font-mono text-[#ff5a00] font-bold mb-3">submitLead(payload)</h3>
                  <p className="text-white/70 mb-2">Submits the lead and returns confirmation.</p>
                  <pre className="bg-near-black p-4 rounded text-sm text-white/80 font-mono overflow-x-auto">
{`{
  "success": true,
  "lead_id": "LEAD-12345",
  "next_steps": ["Confirmation sent", "Call scheduled"]
}`}
                  </pre>
                </div>

                <div className="bg-black/60 border border-white/10 p-6 rounded">
                  <h3 className="font-mono text-[#ff5a00] font-bold mb-3">getNextSteps()</h3>
                  <p className="text-white/70 mb-2">Returns information about what happens after submission.</p>
                  <pre className="bg-near-black p-4 rounded text-sm text-white/80 font-mono overflow-x-auto">
{`{
  "expected_response_time": "24 hours",
  "next_steps": ["Email confirmation", "Discovery call", "Proposal"]
}`}
                  </pre>
                </div>
              </div>

              <p className="text-lg text-white/80 leading-relaxed mt-6">
                These tools allow agents to reliably submit leads without parsing forms or simulating clicks.
              </p>
            </section>

            {/* Is WebMCP the Same as an API */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Is WebMCP the Same as an API?</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                No. While WebMCP tools provide structured interfaces like APIs, there are key differences:
              </p>

              <div className="bg-black/40 border border-white/10 p-6 rounded space-y-4 text-lg text-white/80">
                <p>
                  <strong className="text-white">APIs:</strong> Require prior integration. Agents need API keys, documentation, and endpoint knowledge before use. Discovery happens outside the website.
                </p>
                <p>
                  <strong className="text-white">WebMCP:</strong> Tools are embedded in web pages. Agents discover them while browsing. No prior integration needed. Discovery and execution happen in one flow.
                </p>
                <p className="text-white/90 mt-4">
                  WebMCP combines the discoverability of web interfaces with the structure of APIs.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqData.map((faq, idx) => (
                  <div key={idx} className="border-b border-white/10 pb-6">
                    <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                    <p className="text-lg text-white/70 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Conclusion</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                WebMCP is the infrastructure layer of the agent web. As AI agents become primary drivers of web traffic, websites need structured interfaces to remain accessible.
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                Sites that adopt WebMCP early become the default for agent-driven transactions. Those that don't risk being skipped entirely.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                The question is not whether to implement WebMCP, but when.
              </p>
            </section>

            {/* CTA */}
            <div className="bg-[#ff5a00] p-8 rounded text-center">
              <h3 className="text-2xl font-bold text-black mb-4">
                Ready to make your website agent-ready?
              </h3>
              <p className="text-black/80 mb-6">
                We implement WebMCP for lead gen, ecommerce, SaaS, and marketplace sites.
              </p>
              <Link
                href="/intake"
                className="inline-block bg-black text-white font-bold uppercase tracking-wider px-8 py-4 rounded hover:bg-gray-900 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Related Links */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Related Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog/agent-experience-optimization" className="text-[#ff5a00] hover:text-[#ff6a10]">
                    → Agent Experience Optimization (AEO): The Next Layer After SEO
                  </Link>
                </li>
                <li>
                  <Link href="/tools" className="text-[#ff5a00] hover:text-[#ff6a10]">
                    → Explore WebMCP Tools
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-[#ff5a00] hover:text-[#ff6a10]">
                    → WebMCP Setup as a Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
