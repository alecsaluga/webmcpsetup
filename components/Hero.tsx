import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-dark-bg flex items-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: 'url(/hero-placeholder.svg)',
        }}
      >
        {/* Dark Overlay Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.95) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-8 py-32">
        <div className="max-w-5xl">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-[0.95] tracking-tighter text-white mb-8 fade-in">
            Make your website callable by AI agents.
          </h1>

          <p className="text-2xl md:text-3xl font-medium leading-tight text-white/90 max-w-3xl mb-16 fade-in-delay-1">
            Structured tools. Deterministic execution.
          </p>

          <div className="flex flex-wrap gap-6 fade-in-delay-2">
            <Link href="/intake" className="btn-primary text-base px-10 py-5">
              Get Started
            </Link>
            <Link href="/tools" className="btn-secondary text-base px-10 py-5">
              Explore Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 fade-in-delay-3">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent-orange rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
