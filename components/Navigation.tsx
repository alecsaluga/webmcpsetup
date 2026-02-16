import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-[1280px] mx-auto px-8 py-8 flex justify-between items-center">
        <Link href="/" className="text-sm font-bold uppercase tracking-wider text-white hover:text-accent-orange transition-colors">
          webmcpsetup.ai
        </Link>
        <div>
          <Link href="/intake" className="btn-primary text-xs px-8 py-3">
            Get a quote
          </Link>
        </div>
      </div>
    </nav>
  )
}
