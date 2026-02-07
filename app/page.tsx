import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, DollarSign, Users, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800">
      <header className="container mx-auto px-4 py-8">
  <nav className="flex flex-col sm:flex-row justify-between items-center">
    <h1 className="text-2xl font-bold text-white mb-4 sm:mb-0">SCV Wealth Advisors</h1>
    <div className="flex space-x-4">
      <Link href="/about" className="text-white hover:text-indigo-200">About</Link>
      <Link href="/services" className="text-white hover:text-indigo-200">Services</Link>
      <Link href="/contact" className="text-white hover:text-indigo-200">Contact</Link>
    </div>
  </nav>
</header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            SCV Wealth Advisors: Your Trusted Fiduciary Partner
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            We are committed to putting your interests first, always. As fiduciaries, we are legally and ethically bound to act in your best interest.
          </p>
          <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
            <Link href="/survey">Begin Planning</Link>
          </Button>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="bg-white bg-opacity-10 backdrop-blur-lg border-none">
            <CardContent className="p-6 text-center text-white">
              <Shield className="w-12 h-12 mx-auto mb-4 text-teal-400" />
              <h3 className="text-xl font-semibold mb-2">Fiduciary Commitment</h3>
              <p>We always put your interests first, ensuring transparent and trustworthy advice.</p>
            </CardContent>
          </Card>
          <Card className="bg-white bg-opacity-10 backdrop-blur-lg border-none">
            <CardContent className="p-6 text-center text-white">
              <Users className="w-12 h-12 mx-auto mb-4 text-teal-400" />
              <h3 className="text-xl font-semibold mb-2">Centuries of Experience</h3>
              <p>Our advisors bring hundreds of years of combined experience to serve you better.</p>
            </CardContent>
          </Card>
          <Card className="bg-white bg-opacity-10 backdrop-blur-lg border-none">
            <CardContent className="p-6 text-center text-white">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-teal-400" />
              <h3 className="text-xl font-semibold mb-2">Proven Track Record</h3>
              <p>Managing hundreds of millions in assets with a focus on long-term growth.</p>
            </CardContent>
          </Card>
          <Card className="bg-white bg-opacity-10 backdrop-blur-lg border-none">
            <CardContent className="p-6 text-center text-white">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-teal-400" />
              <h3 className="text-xl font-semibold mb-2">Trusted Leadership</h3>
              <p>Guided by an experienced board of directors and satisfied clients.</p>
            </CardContent>
          </Card>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Secure Your Financial Future?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards comprehensive wealth management tailored to your unique needs.
          </p>
          <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
            <Link href="/survey">Begin Your Personalized Plan</Link>
          </Button>
        </section>
      </main>

      <footer className="bg-indigo-900 py-8">
        <div className="container mx-auto px-4 text-center text-indigo-200">
          <p>&copy; 2023 Wealth Advisors. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link> | 
            <Link href="/terms" className="ml-2 hover:text-white">Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
