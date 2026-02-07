import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, DollarSign, Users, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 overflow-x-hidden">
      <header className="w-full px-4 sm:px-6 py-4 sm:py-8">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-lg sm:text-2xl font-bold text-white">SCV Wealth Advisors</h1>
          <div className="flex gap-3 sm:gap-6">
            <Link href="/about" className="text-sm sm:text-base text-white hover:text-indigo-200">About</Link>
            <Link href="/services" className="text-sm sm:text-base text-white hover:text-indigo-200">Services</Link>
            <Link href="/contact" className="text-sm sm:text-base text-white hover:text-indigo-200">Contact</Link>
          </div>
        </nav>
      </header>

      <main className="w-full px-4 sm:px-6 py-8 sm:py-16">
        <section className="text-center mb-10 sm:mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Your Trusted Fiduciary Partner
          </h2>
          <p className="text-base sm:text-xl text-indigo-100 mb-6 sm:mb-8 max-w-2xl mx-auto text-pretty">
            We are committed to putting your interests first, always. As fiduciaries, we are legally and ethically bound to act in your best interest.
          </p>
          <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white w-full sm:w-auto">
            <Link href="/survey">Begin Planning</Link>
          </Button>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-10 sm:mb-16 max-w-6xl mx-auto">
          <Card className="bg-white bg-opacity-10 backdrop-blur-lg border-none">
            <CardContent className="p-5 sm:p-6 text-center text-white">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-teal-400" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Fiduciary Commitment</h3>
              <p className="text-sm sm:text-base">We always put your interests first, ensuring transparent and trustworthy advice.</p>
            </CardContent>
          </Card>
          <Card className="bg-white bg-opacity-10 backdrop-blur-lg border-none">
            <CardContent className="p-5 sm:p-6 text-center text-white">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-teal-400" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Centuries of Experience</h3>
              <p className="text-sm sm:text-base">Our advisors bring hundreds of years of combined experience to serve you better.</p>
            </CardContent>
          </Card>
          <Card className="bg-white bg-opacity-10 backdrop-blur-lg border-none">
            <CardContent className="p-5 sm:p-6 text-center text-white">
              <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-teal-400" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Proven Track Record</h3>
              <p className="text-sm sm:text-base">Managing hundreds of millions in assets with a focus on long-term growth.</p>
            </CardContent>
          </Card>
          <Card className="bg-white bg-opacity-10 backdrop-blur-lg border-none">
            <CardContent className="p-5 sm:p-6 text-center text-white">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-teal-400" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Trusted Leadership</h3>
              <p className="text-sm sm:text-base">Guided by an experienced board of directors and satisfied clients.</p>
            </CardContent>
          </Card>
        </section>

        <section className="text-center mb-10 sm:mb-16 max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-4 text-balance">Ready to Secure Your Financial Future?</h2>
          <p className="text-base sm:text-xl text-indigo-100 mb-6 sm:mb-8 max-w-2xl mx-auto text-pretty">
            Take the first step towards comprehensive wealth management tailored to your unique needs.
          </p>
          <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white w-full sm:w-auto">
            <Link href="/survey">Begin Your Personalized Plan</Link>
          </Button>
        </section>
      </main>

      <footer className="bg-indigo-900 py-6 sm:py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-indigo-200">
          <p className="text-sm sm:text-base">&copy; 2025 SCV Wealth Advisors. All rights reserved.</p>
          <p className="mt-2 text-sm sm:text-base">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
