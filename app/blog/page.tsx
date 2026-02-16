import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - WebMCP Guides and Insights',
  description: 'Technical guides on WebMCP implementation, Agent Experience Optimization (AEO), and building agent-ready websites.',
  openGraph: {
    title: 'Blog - WebMCP Guides and Insights | webmcpsetup.ai',
    description: 'Technical guides on WebMCP implementation, Agent Experience Optimization (AEO), and building agent-ready websites.',
  },
}

const articles = [
  {
    title: 'What Is WebMCP? A Practical Guide to Making Your Website Agent-Ready',
    slug: '/blog/what-is-webmcp',
    description: 'Learn what WebMCP is, how it differs from traditional APIs, and why structured tools matter for AI agent interactions.',
    date: '2026-02-16',
    readTime: '8 min read',
    keywords: ['WebMCP', 'Agent-Ready', 'AI Agents']
  },
  {
    title: 'Agent Experience Optimization (AEO): The Next Layer After SEO',
    slug: '/blog/agent-experience-optimization',
    description: 'Understand AEO, how it differs from SEO, and why optimizing for machine execution is critical for transactional sites.',
    date: '2026-02-16',
    readTime: '10 min read',
    keywords: ['AEO', 'Agent Optimization', 'SEO']
  }
]

export default function BlogIndex() {
  return (
    <div className="bg-dark-bg min-h-screen">
      <div className="max-w-[1280px] mx-auto px-8 py-32">
        <div className="mb-16">
          <Link href="/" className="text-sm text-white/60 hover:text-white uppercase tracking-wider mb-8 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6">
            Blog
          </h1>
          <p className="text-2xl text-white/80 max-w-3xl">
            Technical guides on WebMCP implementation, Agent Experience Optimization,
            and building websites for the agent web.
          </p>
        </div>

        <div className="space-y-8">
          {articles.map((article, idx) => (
            <article
              key={idx}
              className="border border-white/10 bg-black/20 p-8 hover:border-[#ff5a00]/50 transition-all rounded"
            >
              <div className="flex flex-wrap gap-3 mb-4">
                {article.keywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="text-xs uppercase tracking-wider text-[#ff5a00] bg-[#ff5a00]/10 px-3 py-1 rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <Link href={article.slug}>
                <h2 className="text-3xl font-bold text-white mb-4 hover:text-[#ff5a00] transition-colors">
                  {article.title}
                </h2>
              </Link>

              <p className="text-lg text-white/70 mb-6 leading-relaxed">
                {article.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-white/50">
                  <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <Link
                  href={article.slug}
                  className="text-[#ff5a00] hover:text-[#ff6a10] font-semibold uppercase tracking-wider text-sm"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
