import { Metadata } from 'next'
import Link from 'next/link'
import ToolsExplorer from './ToolsExplorer'

export const metadata: Metadata = {
  title: 'WebMCP Tools',
  description: 'Explore available WebMCP tools and test them with our interactive playground.',
  keywords: ['WebMCP tools', 'Model Context Protocol', 'Agent tools', 'Declarative tools', 'Imperative tools', 'navigator.modelContext'],
  openGraph: {
    title: 'WebMCP Tools | webmcpsetup.ai',
    description: 'Explore available WebMCP tools and test them with our interactive playground.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://webmcpsetup.ai/tools',
  },
}

export default function ToolsPage() {
  return (
    <div className="bg-dark-bg min-h-screen">
      <div className="max-w-[1280px] mx-auto px-8 py-32">
        {/* Breadcrumbs */}
        <nav className="text-sm text-white/60 mb-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">→</span>
          <span className="text-white">Tools</span>
        </nav>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6">
            WebMCP Tools
          </h1>
          <p className="text-2xl text-white/80 max-w-3xl leading-relaxed">
            Explore the available WebMCP tools on this site. All tools are accessible to AI agents
            via both declarative (HTML-based) and imperative (JavaScript API) patterns.
          </p>
        </div>

        <ToolsExplorer />
      </div>
    </div>
  )
}
