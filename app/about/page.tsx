import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Users, TrendingUp, Award, CheckCircle2, ArrowRight } from 'lucide-react'

const values = [
  {
    icon: Shield,
    title: 'Fiduciary Standard',
    description:
      'We are legally and ethically bound to act in your best interest at all times. Unlike broker-dealers who meet a lesser suitability standard, every recommendation we make must serve you first.',
  },
  {
    icon: Users,
    title: 'Relationship-Driven',
    description:
      'We limit the number of clients each advisor serves to ensure deep, personal attention. Your advisor knows your family, your goals, and your concerns — not just your portfolio.',
  },
  {
    icon: TrendingUp,
    title: 'Evidence-Based Strategy',
    description:
      'Our investment philosophy is grounded in academic research and decades of market experience. We build diversified, low-cost portfolios designed to weather every market cycle.',
  },
  {
    icon: Award,
    title: 'Transparent Compensation',
    description:
      'We are fee-only advisors. We do not earn commissions, referral fees, or revenue from product sales. Our only incentive is your success.',
  },
]

const commitments = [
  'Act as a fiduciary in every interaction',
  'Provide fully transparent fee structures',
  'Deliver personalized, goals-based financial plans',
  'Maintain independence from product manufacturers',
  'Communicate proactively through every market condition',
  'Continuously earn your trust through measurable results',
]

export default function AboutPage() {
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
              className="text-sm text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
              Our Approach
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-foreground leading-[1.15] mb-5 sm:mb-8 text-balance">
              Advice built on{' '}
              <span className="text-primary">obligation, not opportunity</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto text-pretty">
              A fiduciary advisor doesn&apos;t just recommend what&apos;s
              suitable — they are legally required to recommend what&apos;s best.
              That distinction shapes everything we do.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="w-full px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 text-balance">
                What sets us apart
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
                Four pillars that define how we serve every client, every day.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="group p-5 sm:p-8 rounded-lg border border-border bg-card hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitments */}
        <section className="w-full px-4 sm:px-6 py-12 sm:py-20 border-y border-border bg-secondary/30">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 text-balance">
                Our commitments to you
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
                These aren&apos;t aspirations — they&apos;re non-negotiable
                standards we hold ourselves to.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {commitments.map((commitment) => (
                <div
                  key={commitment}
                  className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-foreground">
                    {commitment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-2xl mx-auto text-center border border-primary/20 rounded-xl p-8 sm:p-12 bg-card">
            <h2 className="font-serif text-xl sm:text-3xl text-foreground mb-3 sm:mb-4 text-balance">
              See what fiduciary advice looks like in practice
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto text-pretty">
              Take our brief financial planning survey and receive personalized
              insights — no commitment, no pressure.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full sm:w-auto px-10 py-3 text-base"
            >
              <Link href="/survey">
                Begin Your Plan
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
