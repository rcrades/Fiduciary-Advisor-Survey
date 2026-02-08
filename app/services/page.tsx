import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  PieChart,
  Landmark,
  HeartHandshake,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Receipt,
} from 'lucide-react'

const services = [
  {
    icon: PieChart,
    title: 'Investment Management',
    description:
      'Diversified, research-driven portfolios tailored to your risk tolerance, time horizon, and goals. We use low-cost, institutional-quality strategies — no proprietary products, no hidden fees.',
  },
  {
    icon: Landmark,
    title: 'Retirement Planning',
    description:
      'Comprehensive income strategies that account for Social Security optimization, withdrawal sequencing, tax efficiency, and longevity risk so your money lasts as long as you do.',
  },
  {
    icon: HeartHandshake,
    title: 'Estate & Legacy Planning',
    description:
      'Coordinated strategies to protect and transfer your wealth efficiently. We work alongside your estate attorney to align trusts, beneficiary designations, and gifting plans.',
  },
  {
    icon: Receipt,
    title: 'Tax Strategy',
    description:
      'Proactive tax planning including Roth conversions, tax-loss harvesting, charitable giving strategies, and asset location to minimize your lifetime tax burden.',
  },
  {
    icon: GraduationCap,
    title: 'Education Funding',
    description:
      '529 plan selection, funding strategies, and financial aid optimization to help you invest in the next generation without compromising your own retirement.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk & Insurance Review',
    description:
      'Objective analysis of your insurance coverage — life, disability, long-term care, and liability — to identify gaps and eliminate unnecessary costs. We never sell policies.',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Background pattern */}
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, hsl(40 60% 64%) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <header className="relative z-10 w-full px-4 sm:px-6 py-4 sm:py-6 border-b border-border">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-sm sm:text-base">
                S
              </span>
            </div>
            <span className="font-serif text-lg sm:text-xl text-foreground tracking-tight">
              SCV Wealth
            </span>
          </Link>
          <div className="flex gap-4 sm:gap-8">
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-sm text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="w-full px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-sans text-sm sm:text-base tracking-[0.2em] uppercase mb-4 sm:mb-6">
              What We Do
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-foreground leading-[1.15] mb-5 sm:mb-8 text-balance">
              Comprehensive planning,{' '}
              <span className="text-primary">singular focus</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto text-pretty">
              Every service we offer is designed around one question: does this
              move the client closer to their goals? If not, we don&apos;t
              recommend it.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="w-full px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="group p-5 sm:p-8 rounded-lg border border-border bg-card hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Fee transparency */}
        <section className="w-full px-4 sm:px-6 py-12 sm:py-20 border-y border-border bg-secondary/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 text-balance">
              Simple, transparent fees
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-8 sm:mb-10">
              We charge a clear advisory fee based on assets under management.
              No commissions, no hidden costs, no conflicts of interest.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 sm:p-6 rounded-lg bg-card border border-border">
                <p className="font-serif text-2xl sm:text-3xl text-primary mb-1">
                  Fee-Only
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  No commissions or kickbacks
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-lg bg-card border border-border">
                <p className="font-serif text-2xl sm:text-3xl text-primary mb-1">
                  Tiered
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Rates decrease as assets grow
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-lg bg-card border border-border">
                <p className="font-serif text-2xl sm:text-3xl text-primary mb-1">
                  Aligned
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  We succeed only when you do
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-2xl mx-auto text-center border border-primary/20 rounded-xl p-8 sm:p-12 bg-card">
            <h2 className="font-serif text-xl sm:text-3xl text-foreground mb-3 sm:mb-4 text-balance">
              Not sure where to start?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto text-pretty">
              Our planning survey identifies the services most relevant to your
              situation — in just a few minutes, with no obligation.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full sm:w-auto px-10 py-3 text-base"
            >
              <Link href="/survey">
                Take the Survey
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border py-6 sm:py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; 2025 SCV Wealth Advisors. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
