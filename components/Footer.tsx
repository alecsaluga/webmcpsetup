import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-near-black border-t border-border-dark mt-auto">
      <div className="max-w-[1280px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-white">webmcpsetup.ai</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Make your website callable by AI agents.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-white/80">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/intake" className="text-white/60 hover:text-white transition-colors">Get Started</Link></li>
              <li><Link href="/tools" className="text-white/60 hover:text-white transition-colors">WebMCP Tools</Link></li>
              <li><Link href="/#faq" className="text-white/60 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-white/80">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/60 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/llms.txt" className="text-white/60 hover:text-white transition-colors">llms.txt</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border-dark text-center text-xs text-white/40 uppercase tracking-wider">
          © {new Date().getFullYear()} webmcpsetup.ai. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
