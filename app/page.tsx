import Link from 'next/link'
import Hero from '@/components/Hero'

const faqData = [
  {
    question: "What is WebMCP?",
    answer: "WebMCP (Web Model Context Protocol) is a standard that allows AI agents to interact with websites through structured tools instead of scraping or brittle DOM manipulation. It provides deterministic, schema-based interfaces for agent actions."
  },
  {
    question: "What is Agent Experience Optimization (AEO)?",
    answer: "AEO is the practice of optimizing your website for AI agent interactions. Similar to how SEO optimizes for search engines, AEO ensures agents can reliably discover, understand, and execute actions on your site."
  },
  {
    question: "How is this different from APIs?",
    answer: "WebMCP tools are embedded directly in your web pages and discoverable by agents browsing your site. They combine the discoverability of web interfaces with the structure of APIs, enabling agents to interact with your site without prior API integration."
  },
  {
    question: "What does your service include?",
    answer: "We provide complete WebMCP implementation: tool design and schema creation, integration with your existing stack, declarative and imperative tool patterns, testing and validation, documentation, and ongoing support."
  },
  {
    question: "Will this affect my existing users?",
    answer: "No. WebMCP tools are progressive enhancements. They are invisible to regular users and only activate when invoked by AI agents. Your existing UI and user experience remain unchanged."
  },
  {
    question: "How do agents discover my tools?",
    answer: "Agents discover tools by parsing your HTML for WebMCP-compliant elements (declarative tools) or by accessing navigator.modelContext when browsing your site (imperative tools). We also provide llms.txt files to guide agent behavior."
  }
]

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://webmcpsetup.ai/#organization',
        'name': 'webmcpsetup.ai',
        'url': 'https://webmcpsetup.ai',
        'logo': 'https://webmcpsetup.ai/logo.png',
        'description': 'Professional WebMCP implementation and Agent Experience Optimization services'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://webmcpsetup.ai/#website',
        'url': 'https://webmcpsetup.ai',
        'name': 'webmcpsetup.ai',
        'publisher': {
          '@id': 'https://webmcpsetup.ai/#organization'
        }
      },
      {
        '@type': 'Service',
        '@id': 'https://webmcpsetup.ai/#service',
        'serviceType': 'WebMCP Setup',
        'provider': {
          '@id': 'https://webmcpsetup.ai/#organization'
        },
        'name': 'WebMCP Setup as a Service',
        'description': 'Professional implementation of Web Model Context Protocol for AI agent interactions',
        'areaServed': 'Worldwide',
        'availableChannel': {
          '@type': 'ServiceChannel',
          'serviceUrl': 'https://webmcpsetup.ai/intake'
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://webmcpsetup.ai/#faq',
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

      {/* Hero Section */}
      <Hero />

      {/* Section 2: What is WebMCP - Dark with left-right layout */}
      <section className="bg-dark-bg border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-8 py-32">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                The agent web requires structure.
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-xl text-white/80 leading-relaxed">
                AI agents are beginning to browse, compare, and execute transactions on behalf of users.
                Your website was built for humans. It now needs to work for agents as well.
              </p>
              <p className="text-xl text-white/80 leading-relaxed">
                With WebMCP enabled, your system becomes callable, structured, and machine-readable.
                Agents favor interfaces they can execute against reliably — and route traffic accordingly.
              </p>
              <p className="text-xl text-white/80 leading-relaxed">
                Early adopters don't just avoid being skipped. They become the default.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Orange Full-Width CTA Block */}
      <section className="bg-[#ff5a00] py-32">
        <div className="max-w-[1280px] mx-auto px-8 text-center">
          <h2 className="text-6xl md:text-7xl font-black text-black leading-tight mb-6">
            Stop building for scraping.
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-black/80 mb-12">
            Start building for structured execution.
          </p>
          <Link href="/intake" className="btn-primary-dark text-base px-12 py-5 inline-block">
            Get Started
          </Link>
        </div>
      </section>

      {/* Section 4: Before vs After - Dark Background */}
      <section className="bg-dark-bg border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-8 py-32">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-20 text-center">
            Before vs After
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-6 text-white/40">Before WebMCP</div>
              <div className="bg-black/40 border border-white/10 p-8 space-y-4 rounded">
                <div className="font-mono text-sm text-white/60">→ DOM scraping</div>
                <div className="font-mono text-sm text-white/60">→ Brittle CSS selectors</div>
                <div className="font-mono text-sm text-white/60">→ No schema validation</div>
                <div className="font-mono text-sm text-white/60">→ High failure rates</div>
                <div className="font-mono text-sm text-white/60">→ Unpredictable behavior</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-6 text-accent-orange">After WebMCP</div>
              <div className="bg-black/40 border border-accent-orange/30 p-8 space-y-4 rounded">
                <div className="font-mono text-sm text-white">→ Explicit tool schemas</div>
                <div className="font-mono text-sm text-white">→ Versioned interfaces</div>
                <div className="font-mono text-sm text-white">→ Type-safe inputs/outputs</div>
                <div className="font-mono text-sm text-white">→ Reliable execution</div>
                <div className="font-mono text-sm text-white">→ Deterministic results</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: What We Deliver - Dark Background */}
      <section className="bg-dark-bg border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-8 py-32">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-16">
            What we deliver
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-6 p-8 bg-black/20 border border-white/10 rounded">
              <div className="font-mono text-2xl font-bold text-accent-orange">01</div>
              <p className="text-lg text-white/90 leading-relaxed">Tool design and schema creation for your key user actions</p>
            </div>

            <div className="flex items-start gap-6 p-8 bg-black/20 border border-white/10 rounded">
              <div className="font-mono text-2xl font-bold text-accent-orange">02</div>
              <p className="text-lg text-white/90 leading-relaxed">Integration with your existing tech stack and authentication</p>
            </div>

            <div className="flex items-start gap-6 p-8 bg-black/20 border border-white/10 rounded">
              <div className="font-mono text-2xl font-bold text-accent-orange">03</div>
              <p className="text-lg text-white/90 leading-relaxed">Declarative (HTML) and imperative (JavaScript API) patterns</p>
            </div>

            <div className="flex items-start gap-6 p-8 bg-black/20 border border-white/10 rounded">
              <div className="font-mono text-2xl font-bold text-accent-orange">04</div>
              <p className="text-lg text-white/90 leading-relaxed">Validation, error handling, and rate limiting</p>
            </div>

            <div className="flex items-start gap-6 p-8 bg-black/20 border border-white/10 rounded">
              <div className="font-mono text-2xl font-bold text-accent-orange">05</div>
              <p className="text-lg text-white/90 leading-relaxed">Testing with real AI agents across implementations</p>
            </div>

            <div className="flex items-start gap-6 p-8 bg-black/20 border border-white/10 rounded">
              <div className="font-mono text-2xl font-bold text-accent-orange">06</div>
              <p className="text-lg text-white/90 leading-relaxed">Documentation, llms.txt guidance, and team handoff</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: FAQ - Dark Background */}
      <section id="faq" className="bg-dark-bg border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-8 py-32">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-16">
            FAQ
          </h2>

          <div className="space-y-0 divide-y divide-white/10">
            {faqData.map((faq, idx) => (
              <div key={idx} className="py-10">
                <h3 className="text-2xl font-bold text-white mb-4">{faq.question}</h3>
                <p className="text-lg text-white/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Final Orange CTA Block */}
      <section className="bg-[#ff5a00] py-40">
        <div className="max-w-[1280px] mx-auto px-8 text-center">
          <h2 className="text-7xl md:text-8xl font-black text-white leading-tight mb-16">
            Build for the agent web.
          </h2>
          <Link href="/intake" className="btn-primary-dark text-lg px-16 py-6 inline-block">
            Get Started
          </Link>
        </div>
      </section>
    </>
  )
}
