'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  PieChart as PieChartIcon,
  BarChart3,
  TrendingUp,
  Shield,
  DollarSign,
  Target,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts'

const COLORS = ['hsl(40,60%,64%)', 'hsl(190,50%,50%)', 'hsl(216,40%,45%)', 'hsl(15,70%,55%)', 'hsl(145,40%,45%)']

const assetAllocation = [
  { name: 'Equities', value: 40 },
  { name: 'Fixed Income', value: 25 },
  { name: 'Real Estate', value: 15 },
  { name: 'Alternatives', value: 12 },
  { name: 'Cash', value: 8 },
]

const performanceData = [
  { year: '2019', portfolio: 18.2, benchmark: 15.3 },
  { year: '2020', portfolio: 12.5, benchmark: 10.1 },
  { year: '2021', portfolio: 22.8, benchmark: 19.4 },
  { year: '2022', portfolio: -8.2, benchmark: -12.6 },
  { year: '2023', portfolio: 16.4, benchmark: 13.8 },
  { year: '2024', portfolio: 14.7, benchmark: 11.9 },
]

const riskMetrics = [
  { label: 'Standard Deviation', value: '12.4%', icon: BarChart3 },
  { label: 'Sharpe Ratio', value: '1.42', icon: TrendingUp },
  { label: 'Beta', value: '0.87', icon: Target },
  { label: 'Max Drawdown', value: '-14.2%', icon: AlertTriangle },
  { label: 'Value at Risk (95%)', value: '-3.8%', icon: Shield },
]

const riskReturnData = [
  { name: 'Cash', risk: 1, return: 3.5 },
  { name: 'Bonds', risk: 5, return: 5.2 },
  { name: 'Balanced', risk: 10, return: 8.1 },
  { name: 'Growth', risk: 15, return: 11.4 },
  { name: 'Aggressive', risk: 20, return: 14.2 },
]

function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value.toFixed(0)}`
}

const tabConfig = [
  { value: 'overview', label: 'Overview', icon: DollarSign },
  { value: 'allocation', label: 'Allocation', icon: PieChartIcon },
  { value: 'performance', label: 'Performance', icon: BarChart3 },
  { value: 'projection', label: 'Projection', icon: TrendingUp },
  { value: 'risk', label: 'Risk', icon: Shield },
]

const tooltipStyle = {
  backgroundColor: 'hsl(216, 35%, 12%)',
  border: '1px solid hsl(216, 20%, 20%)',
  borderRadius: '8px',
  color: 'hsl(40, 20%, 92%)',
}

const axisStroke = 'hsl(216, 15%, 40%)'

export default function PortfolioAnalysisPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [riskTolerance, setRiskTolerance] = useState([50])
  const [projectionYears, setProjectionYears] = useState(30)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  const initialInvestment = 2500000

  const projectionData = useMemo(() => {
    const riskFactor = riskTolerance[0] / 100
    const baseReturn = 0.04 + riskFactor * 0.08
    const data = []
    for (let i = 0; i <= projectionYears; i += Math.max(1, Math.floor(projectionYears / 20))) {
      data.push({
        year: `Year ${i}`,
        conservative: Math.round(initialInvestment * Math.pow(1 + baseReturn * 0.6, i)),
        moderate: Math.round(initialInvestment * Math.pow(1 + baseReturn, i)),
        aggressive: Math.round(initialInvestment * Math.pow(1 + baseReturn * 1.4, i)),
      })
    }
    return data
  }, [riskTolerance, projectionYears, initialInvestment])

  const activeTabConfig = tabConfig.find((t) => t.value === activeTab)

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(40 60% 64%) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      {/* Header */}
      <header className="relative z-10 w-full px-4 sm:px-6 py-4 border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-xs">S</span>
            </div>
            <span className="font-serif text-base sm:text-lg text-foreground">SCV Wealth</span>
          </Link>
          <Button
            onClick={() => router.push('/schedule-review')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm px-3 sm:px-5"
          >
            Schedule a Review
          </Button>
        </div>
      </header>

      <main className="relative z-10 w-full px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="mb-6 sm:mb-8">
            <p className="text-primary font-sans text-xs tracking-[0.2em] uppercase mb-1">Portfolio Analysis</p>
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground">Your Personalized Overview</h1>
          </div>

          {/* Tab selector - mobile dropdown */}
          <div className="block sm:hidden mb-6">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3 text-foreground text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                {activeTabConfig && <activeTabConfig.icon className="w-4 h-4 text-primary" />}
                {activeTabConfig?.label}
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMobileMenuOpen && (
              <div className="mt-1 bg-card rounded-lg overflow-hidden border border-border">
                {tabConfig.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => { setActiveTab(tab.value); setIsMobileMenuOpen(false) }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${
                      activeTab === tab.value
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 shrink-0" />
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tab selector - desktop */}
          <div className="hidden sm:flex gap-1 p-1 bg-card border border-border rounded-lg mb-6">
            {tabConfig.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`flex-1 flex items-center justify-center gap-1.5 text-xs md:text-sm rounded-md py-2.5 transition-colors ${
                  activeTab === tab.value
                    ? 'bg-primary/15 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-4 sm:p-5">
                    <p className="text-xs text-muted-foreground mb-1">Total Portfolio Value</p>
                    <p className="font-serif text-xl sm:text-2xl text-foreground">{formatCurrency(initialInvestment)}</p>
                    <p className="text-xs text-primary mt-1">+12.4% YTD</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-4 sm:p-5">
                    <p className="text-xs text-muted-foreground mb-1">Annual Income</p>
                    <p className="font-serif text-xl sm:text-2xl text-foreground">{formatCurrency(87500)}</p>
                    <p className="text-xs text-primary mt-1">3.5% yield</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-4 sm:p-5">
                    <p className="text-xs text-muted-foreground mb-1">Risk Score</p>
                    <p className="font-serif text-xl sm:text-2xl text-foreground">Moderate</p>
                    <p className="text-xs text-primary mt-1">Well-balanced portfolio</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-card border-border">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg text-foreground mb-2">Our Fiduciary Commitment</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        As your fiduciary advisor, SCV Wealth Advisors is legally and ethically bound to act in your best interest.
                        Every recommendation we make prioritizes your financial goals over our own. We provide full transparency
                        on fees, conflicts of interest, and investment rationale.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Allocation */}
          {activeTab === 'allocation' && (
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 px-4 sm:px-6">
                <CardTitle className="font-serif text-base sm:text-lg flex items-center text-foreground">
                  <PieChartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
                  Current Asset Allocation
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-[260px] sm:max-w-[300px] mx-auto">
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                          data={assetAllocation}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        >
                          {assetAllocation.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={tooltipStyle} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-full mt-4">
                    <h3 className="text-sm font-medium text-foreground mb-3">Allocation Breakdown</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {assetAllocation.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-2 text-xs sm:text-sm">
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                          <span className="text-muted-foreground">{item.name}: <span className="text-foreground">{item.value}%</span></span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                      Your allocation is well-diversified across major asset classes, balancing growth potential with risk management to align with your moderate risk profile.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Performance */}
          {activeTab === 'performance' && (
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 px-4 sm:px-6">
                <CardTitle className="font-serif text-base sm:text-lg flex items-center text-foreground">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
                  Portfolio vs Benchmark
                </CardTitle>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={performanceData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(216,20%,20%)" />
                    <XAxis dataKey="year" stroke={axisStroke} tick={{ fontSize: 11 }} />
                    <YAxis stroke={axisStroke} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`]} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="portfolio" name="Your Portfolio" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="benchmark" name="Benchmark" fill={COLORS[2]} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 sm:p-4 bg-secondary/50 rounded-lg">
                  <h4 className="text-sm font-medium text-foreground mb-1">Performance Insights</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Your portfolio has consistently outperformed the benchmark across most years. Even during the 2022 downturn,
                    our fiduciary approach helped limit losses compared to the broader market.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Projection */}
          {activeTab === 'projection' && (
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 px-4 sm:px-6">
                <CardTitle className="font-serif text-base sm:text-lg flex items-center text-foreground">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
                  Wealth Projection
                </CardTitle>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-4 px-2 sm:px-0">
                  <div className="flex-1">
                    <Label className="text-xs text-muted-foreground mb-2 block">Risk Tolerance: {riskTolerance[0]}%</Label>
                    <Slider value={riskTolerance} onValueChange={setRiskTolerance} max={100} step={5} className="w-full" />
                  </div>
                  <div className="w-full sm:w-32">
                    <Label className="text-xs text-muted-foreground mb-2 block">Years</Label>
                    <Input
                      type="number"
                      value={projectionYears}
                      onChange={(e) => setProjectionYears(Math.min(50, Math.max(5, Number(e.target.value))))}
                      className="bg-secondary border-border text-foreground text-sm"
                      min={5}
                      max={50}
                    />
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={projectionData} margin={{ top: 5, right: 5, left: -5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(216,20%,20%)" />
                    <XAxis dataKey="year" stroke={axisStroke} tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                    <YAxis stroke={axisStroke} tick={{ fontSize: 10 }} tickFormatter={(v) => formatCurrency(v)} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [formatCurrency(value)]} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="aggressive" name="Aggressive" stroke={COLORS[3]} fill={COLORS[3]} fillOpacity={0.1} />
                    <Area type="monotone" dataKey="moderate" name="Moderate" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.15} />
                    <Area type="monotone" dataKey="conservative" name="Conservative" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 sm:p-4 bg-secondary/50 rounded-lg">
                  <h4 className="text-sm font-medium text-foreground mb-1">Projection Insights</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Based on your {formatCurrency(initialInvestment)} portfolio over {projectionYears} years, the moderate scenario
                    projects growth to approximately {formatCurrency(projectionData[projectionData.length - 1]?.moderate || 0)}.
                    As your fiduciary, we recommend a strategy that balances growth with protection aligned to your goals.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Risk */}
          {activeTab === 'risk' && (
            <div className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-2 px-4 sm:px-6">
                  <CardTitle className="font-serif text-base sm:text-lg flex items-center text-foreground">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
                    Risk Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {riskMetrics.map((metric) => (
                      <div key={metric.label} className="bg-secondary/50 rounded-lg p-3 text-center">
                        <metric.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                        <p className="font-serif text-lg sm:text-xl text-foreground">{metric.value}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader className="pb-2 px-4 sm:px-6">
                  <CardTitle className="font-serif text-base sm:text-lg text-foreground">Risk-Return Analysis</CardTitle>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={riskReturnData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(216,20%,20%)" />
                      <XAxis dataKey="name" stroke={axisStroke} tick={{ fontSize: 10 }} />
                      <YAxis stroke={axisStroke} tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Line type="monotone" dataKey="return" name="Expected Return" stroke={COLORS[0]} strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-3 sm:p-4 bg-secondary/50 rounded-lg">
                    <h4 className="text-sm font-medium text-foreground mb-1">Risk Management Strategy</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Your portfolio is positioned in the balanced zone, offering strong risk-adjusted returns. As your fiduciary
                      advisor, we continuously monitor and rebalance to maintain this optimal position.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-8 text-center">
            <Button
              onClick={() => router.push('/schedule-review')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm sm:text-base w-full sm:w-auto px-8"
            >
              Schedule a Detailed Review
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
