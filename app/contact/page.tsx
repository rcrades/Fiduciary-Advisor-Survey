import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'

const contactDetails = [
  {
    icon: Phone,
    label: 'Phone',
    value: '(555) 234-5678',
    href: 'tel:+15552345678',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'advisors@scvwealth.com',
    href: 'mailto:advisors@scvwealth.com',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: '123 Financial District, Suite 400',
    href: null,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon – Fri, 8:00 AM – 5:00 PM',
    href: null,
  },
]

export default function ContactPage() {
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
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-sm text-primary transition-colors"
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
              Get In Touch
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-foreground leading-[1.15] mb-5 sm:mb-8 text-balance">
              The right conversation{' '}
              <span className="text-primary">starts here</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto text-pretty">
              Whether you&apos;re evaluating advisors, planning a major
              transition, or simply have a question — we&apos;re here to listen
              with no pressure and no obligation.
            </p>
          </div>
        </section>

        {/* Contact info + survey CTA */}
        <section className="w-full px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
            {/* Contact details */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-6 sm:mb-8">
                Reach us directly
              </h2>
              <div className="space-y-4">
                {contactDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-start gap-4 p-4 sm:p-5 rounded-lg border border-border bg-card"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <detail.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {detail.label}
                      </p>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="text-sm sm:text-base text-foreground hover:text-primary transition-colors"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-sm sm:text-base text-foreground">
                          {detail.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Survey CTA card */}
            <div className="border border-primary/20 rounded-xl p-6 sm:p-10 bg-card flex flex-col justify-center">
              <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-3 sm:mb-4 text-balance">
                Prefer to start on your own terms?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed text-pretty">
                Our complimentary planning survey takes just a few minutes.
                You&apos;ll receive personalized insights into your financial
                picture — and if you&apos;d like to discuss the results, we&apos;re
                a phone call away.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full sm:w-auto px-8 py-3 text-base"
              >
                <Link href="/survey">
                  Begin the Survey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Expectations */}
        <section className="w-full px-4 sm:px-6 py-12 sm:py-20 border-y border-border bg-secondary/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 text-balance">
              What to expect
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-8 sm:mb-10">
              Our introductory process is designed to be straightforward and
              pressure-free.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 sm:p-6 rounded-lg bg-card border border-border">
                <p className="font-serif text-3xl sm:text-4xl text-primary mb-2">
                  1
                </p>
                <h3 className="font-serif text-base sm:text-lg text-foreground mb-1">
                  Conversation
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  A 30-minute call to understand your goals and concerns
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-lg bg-card border border-border">
                <p className="font-serif text-3xl sm:text-4xl text-primary mb-2">
                  2
                </p>
                <h3 className="font-serif text-base sm:text-lg text-foreground mb-1">
                  Assessment
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  We review your current situation and identify opportunities
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-lg bg-card border border-border">
                <p className="font-serif text-3xl sm:text-4xl text-primary mb-2">
                  3
                </p>
                <h3 className="font-serif text-base sm:text-lg text-foreground mb-1">
                  Recommendation
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  A clear plan of action — whether you choose to work with us or
                  not
                </p>
              </div>
            </div>
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
