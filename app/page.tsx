import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Users, TrendingUp, Award } from 'lucide-react'

const stats = [
  { value: '200+', label: 'Years Combined Experience' },
  { value: '$400M+', label: 'Assets Under Management' },
  { value: '98%', label: 'Client Retention Rate' },
]

const pillars = [
  {
    icon: Shield,
    title: 'Fiduciary First',
    description: 'Legally and ethically bound to act solely in your best interest. No commissions, no conflicts, no exceptions.',
  },
  {
    icon: Users,
    title: 'Generational Expertise',
    description: 'Hundreds of years of combined advisory experience across market cycles, regulatory changes, and economic shifts.',
  },
  {
    icon: TrendingUp,
    title: 'Proven Stewardship',
    description: 'Managing hundreds of millions in assets with disciplined, research-driven strategies tailored to each client.',
  },
  {
    icon: Award,
    title: 'Trusted Governance',
    description: 'Guided by an independent board of directors and sustained by long-standing client relationships built on transparency.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(40 60% 64%) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <header className="relative z-10 w-full px-4 sm:px-6 py-4 sm:py-6 border-b border-border">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-sm sm:text-base">S</span>
            </div>
            <span className="font-serif text-lg sm:text-xl text-foreground tracking-tight">SCV Wealth</span>
          </Link>
          <div className="flex gap-4 sm:gap-8">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="w-full px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-sans text-sm sm:text-base tracking-[0.2em] uppercase mb-4 sm:mb-6 animate-fade-in">Fiduciary Wealth Management</p>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-foreground leading-[1.15] mb-5 sm:mb-8 text-balance animate-fade-up">
              Your legacy deserves <br className="hidden sm:block" />
              <span className="text-primary">unwavering loyalty</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 text-pretty opacity-0 animate-fade-up" style={{ animationDelay: '0.15s' }}>
              We don&apos;t sell products. We build financial strategies anchored in trust, transparency, and a legal obligation to put your interests first.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full sm:w-auto px-8 py-3 text-base">
                <Link href="/survey">Begin Planning</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary hover:text-foreground w-full sm:w-auto px-8 py-3 text-base bg-transparent">
                <Link href="/about">Our Approach</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="w-full px-4 sm:px-6 py-8 sm:py-12 border-y border-border bg-secondary/30">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-xl sm:text-3xl md:text-4xl text-primary mb-1">{stat.value}</p>
                <p className="text-[10px] sm:text-sm text-muted-foreground leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pillars */}
        <section className="w-full px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 text-balance">Built on principles, not products</h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
                Every decision we make is measured against one standard: is this in the best interest of the client?
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="group p-5 sm:p-8 rounded-lg border border-border bg-card hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <pillar.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl text-foreground mb-2">{pillar.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-2xl mx-auto text-center border border-primary/20 rounded-xl p-8 sm:p-12 bg-card">
            <h2 className="font-serif text-xl sm:text-3xl text-foreground mb-3 sm:mb-4 text-balance">
              Start with a conversation, not a commitment
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto text-pretty">
              Our complimentary planning survey takes just a few minutes and provides immediate insight into how we can serve your financial future.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full sm:w-auto px-10 py-3 text-base">
              <Link href="/survey">Begin Your Personalized Plan</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border py-6 sm:py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">&copy; 2025 SCV Wealth Advisors. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
