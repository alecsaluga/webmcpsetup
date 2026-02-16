import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AgentLog from '@/components/AgentLog'
import WebMCPTools from '@/components/WebMCPTools'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  metadataBase: new URL('https://webmcpsetup.ai'),
  title: {
    default: 'webmcpsetup.ai - WebMCP Setup as a Service',
    template: '%s | webmcpsetup.ai'
  },
  description: 'Make your website callable by AI agents. Professional WebMCP implementation and Agent Experience Optimization (AEO) services.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://webmcpsetup.ai',
    siteName: 'webmcpsetup.ai',
    title: 'webmcpsetup.ai - WebMCP Setup as a Service',
    description: 'Make your website callable by AI agents. Professional WebMCP implementation and Agent Experience Optimization (AEO) services.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'webmcpsetup.ai - WebMCP Setup as a Service',
    description: 'Make your website callable by AI agents. Professional WebMCP implementation and Agent Experience Optimization (AEO) services.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <GoogleAnalytics />
        <WebMCPTools />
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <AgentLog />
      </body>
    </html>
  )
}
