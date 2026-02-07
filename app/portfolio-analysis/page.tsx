'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

const COLORS = ['#14b8a6', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6']

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
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`
  }
  return `$${value.toFixed(0)}`
}

const tabConfig = [
  { value: 'overview', label: 'Overview', icon: DollarSign },
  { value: 'allocation', label: 'Allocation', icon: PieChartIcon },
  { value: 'performance', label: 'Performance', icon: BarChart3 },
  { value: 'projection', label: 'Projection', icon: TrendingUp },
  { value: 'risk', label: 'Risk', icon: Shield },
]

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
      const conservative = initialInvestment * Math.pow(1 + baseReturn * 0.6, i)
      const moderate = initialInvestment * Math.pow(1 + baseReturn, i)
      const aggressive = initialInvestment * Math.pow(1 + baseReturn * 1.4, i)
      data.push({
        year: `Year ${i}`,
        conservative: Math.round(conservative),
        moderate: Math.round(moderate),
        aggressive: Math.round(aggressive),
      })
    }
    return data
  }, [riskTolerance, projectionYears, initialInvestment])

  const activeTabConfig = tabConfig.find((t) => t.value === activeTab)

  const handleScheduleReview = () => {
    router.push('/schedule-review')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 px-2 py-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
      <Card className="w-full max-w-[calc(100vw-1rem)] sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg text-white border-none overflow-hidden">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Header */}
          <CardHeader className="px-0 pt-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                SCV Wealth Advisors: Your Personalized Portfolio Analysis
              </CardTitle>
              <Button
                onClick={handleScheduleReview}
                className="bg-teal-500 hover:bg-teal-600 text-white text-sm sm:text-base w-full sm:w-auto shrink-0"
              >
                Schedule a Review
              </Button>
            </div>
          </CardHeader>

          <CardContent className="px-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Mobile tab selector */}
              <div className="block sm:hidden mb-4">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-full flex items-center justify-between bg-white bg-opacity-10 rounded-lg px-4 py-3 text-white text-sm font-medium"
                >
                  <span className="flex items-center gap-2">
                    {activeTabConfig && <activeTabConfig.icon className="w-4 h-4 text-teal-400" />}
                    {activeTabConfig?.label}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileMenuOpen && (
                  <div className="mt-1 bg-indigo-900 bg-opacity-95 rounded-lg overflow-hidden border border-white border-opacity-10">
                    {tabConfig.map((tab) => (
                      <button
                        key={tab.value}
                        type="button"
                        onClick={() => {
                          setActiveTab(tab.value)
                          setIsMobileMenuOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${
                          activeTab === tab.value
                            ? 'bg-teal-500 bg-opacity-20 text-teal-300'
                            : 'text-white hover:bg-white hover:bg-opacity-10'
                        }`}
                      >
                        <tab.icon className="w-4 h-4 shrink-0" />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop tab bar */}
              <TabsList className="hidden sm:flex w-full bg-white bg-opacity-10 rounded-lg p-1 gap-1 mb-6">
                {tabConfig.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs md:text-sm text-white data-[state=active]:bg-teal-500 data-[state=active]:bg-opacity-30 data-[state=active]:text-teal-300 rounded-md py-2"
                  >
                    <tab.icon className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
                  <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                    <CardContent className="p-4">
                      <p className="text-xs sm:text-sm text-white text-opacity-70">Total Portfolio Value</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(initialInvestment)}</p>
                      <p className="text-xs text-teal-400 mt-1">+12.4% YTD</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                    <CardContent className="p-4">
                      <p className="text-xs sm:text-sm text-white text-opacity-70">Annual Income</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(87500)}</p>
                      <p className="text-xs text-teal-400 mt-1">3.5% yield</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white bg-opacity-5 border-white border-opacity-10 sm:col-span-2 lg:col-span-1">
                    <CardContent className="p-4">
                      <p className="text-xs sm:text-sm text-white text-opacity-70">Risk Score</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">Moderate</p>
                      <p className="text-xs text-teal-400 mt-1">Well-balanced portfolio</p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Our Fiduciary Commitment</h3>
                        <p className="text-xs sm:text-sm text-white text-opacity-80 leading-relaxed">
                          As your fiduciary advisor, SCV Wealth Advisors is legally and ethically bound to act in your best interest.
                          Every recommendation we make prioritizes your financial goals over our own. We provide full transparency
                          on fees, conflicts of interest, and investment rationale.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Allocation Tab */}
              <TabsContent value="allocation">
                <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                  <CardHeader className="pb-2 px-3 sm:px-6">
                    <CardTitle className="text-base sm:text-lg font-semibold flex items-center text-white">
                      <PieChartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-teal-400" />
                      Current Asset Allocation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 sm:px-6">
                    <div className="flex flex-col items-center">
                      <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto">
                        <ResponsiveContainer width="100%" height={250}>
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
                            <Tooltip
                              contentStyle={{ backgroundColor: '#1e1b4b', border: 'none', borderRadius: '8px', color: '#fff' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="w-full mt-4">
                        <h3 className="text-sm sm:text-base font-semibold mb-3 text-white">Allocation Breakdown</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {assetAllocation.map((item, index) => (
                            <div key={item.name} className="flex items-center gap-2 text-xs sm:text-sm">
                              <div
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              />
                              <span className="text-white text-opacity-90">{item.name}: {item.value}%</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-white text-opacity-70 mt-4 leading-relaxed">
                          Your allocation is well-diversified across major asset classes, balancing growth potential with risk management to align with your moderate risk profile.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance">
                <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                  <CardHeader className="pb-2 px-3 sm:px-6">
                    <CardTitle className="text-base sm:text-lg font-semibold flex items-center text-white">
                      <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-teal-400" />
                      Portfolio vs Benchmark
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-1 sm:px-6">
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={performanceData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" stroke="rgba(255,255,255,0.6)" tick={{ fontSize: 11 }} />
                        <YAxis stroke="rgba(255,255,255,0.6)" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1e1b4b', border: 'none', borderRadius: '8px', color: '#fff' }}
                          formatter={(value: number) => [`${value}%`]}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="portfolio" name="Your Portfolio" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="benchmark" name="Benchmark" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 p-3 sm:p-4 bg-white bg-opacity-5 rounded-lg">
                      <h4 className="text-sm font-semibold text-white mb-2">Performance Insights</h4>
                      <p className="text-xs sm:text-sm text-white text-opacity-70 leading-relaxed">
                        Your portfolio has consistently outperformed the benchmark across most years. Even during the 2022 downturn,
                        our fiduciary approach helped limit losses compared to the broader market.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Projection Tab */}
              <TabsContent value="projection">
                <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                  <CardHeader className="pb-2 px-3 sm:px-6">
                    <CardTitle className="text-base sm:text-lg font-semibold flex items-center text-white">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-teal-400" />
                      Wealth Projection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-1 sm:px-6">
                    <div className="flex flex-col sm:flex-row gap-4 mb-4 px-2 sm:px-0">
                      <div className="flex-1">
                        <Label className="text-xs sm:text-sm text-white text-opacity-70 mb-2 block">
                          Risk Tolerance: {riskTolerance[0]}%
                        </Label>
                        <Slider
                          value={riskTolerance}
                          onValueChange={setRiskTolerance}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      <div className="w-full sm:w-32">
                        <Label className="text-xs sm:text-sm text-white text-opacity-70 mb-2 block">Years</Label>
                        <Input
                          type="number"
                          value={projectionYears}
                          onChange={(e) => setProjectionYears(Math.min(50, Math.max(5, Number(e.target.value))))}
                          className="bg-white bg-opacity-10 border-white border-opacity-20 text-white text-sm"
                          min={5}
                          max={50}
                        />
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={projectionData} margin={{ top: 5, right: 5, left: -5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" stroke="rgba(255,255,255,0.6)" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                        <YAxis stroke="rgba(255,255,255,0.6)" tick={{ fontSize: 10 }} tickFormatter={(v) => formatCurrency(v)} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1e1b4b', border: 'none', borderRadius: '8px', color: '#fff' }}
                          formatter={(value: number) => [formatCurrency(value)]}
                        />
                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                        <Area type="monotone" dataKey="aggressive" name="Aggressive" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                        <Area type="monotone" dataKey="moderate" name="Moderate" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.15} />
                        <Area type="monotone" dataKey="conservative" name="Conservative" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="mt-4 p-3 sm:p-4 bg-white bg-opacity-5 rounded-lg px-3">
                      <h4 className="text-sm font-semibold text-white mb-2">Projection Insights</h4>
                      <p className="text-xs sm:text-sm text-white text-opacity-70 leading-relaxed">
                        Based on your {formatCurrency(initialInvestment)} portfolio over {projectionYears} years, the moderate scenario
                        projects growth to approximately {formatCurrency(projectionData[projectionData.length - 1]?.moderate || 0)}.
                        As your fiduciary, we recommend a strategy that balances growth with protection aligned to your goals.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Risk Tab */}
              <TabsContent value="risk">
                <div className="space-y-4">
                  <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                    <CardHeader className="pb-2 px-3 sm:px-6">
                      <CardTitle className="text-base sm:text-lg font-semibold flex items-center text-white">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-teal-400" />
                        Risk Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {riskMetrics.map((metric) => (
                          <div key={metric.label} className="bg-white bg-opacity-5 rounded-lg p-3 text-center">
                            <metric.icon className="w-5 h-5 text-teal-400 mx-auto mb-2" />
                            <p className="text-lg sm:text-xl font-bold text-white">{metric.value}</p>
                            <p className="text-[10px] sm:text-xs text-white text-opacity-60 mt-1">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
                    <CardHeader className="pb-2 px-3 sm:px-6">
                      <CardTitle className="text-base sm:text-lg font-semibold text-white">Risk-Return Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="px-1 sm:px-6">
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={riskReturnData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" tick={{ fontSize: 10 }} />
                          <YAxis stroke="rgba(255,255,255,0.6)" tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#1e1b4b', border: 'none', borderRadius: '8px', color: '#fff' }}
                          />
                          <Line type="monotone" dataKey="return" name="Expected Return" stroke="#14b8a6" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                      <div className="mt-4 p-3 sm:p-4 bg-white bg-opacity-5 rounded-lg">
                        <h4 className="text-sm font-semibold text-white mb-2">Risk Management Strategy</h4>
                        <p className="text-xs sm:text-sm text-white text-opacity-70 leading-relaxed">
                          Your portfolio is positioned in the balanced zone, offering strong risk-adjusted returns. As your fiduciary
                          advisor, we continuously monitor and rebalance to maintain this optimal position.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          {/* Bottom CTA */}
          <div className="mt-6 text-center">
            <Button
              onClick={handleScheduleReview}
              size="lg"
              className="bg-teal-500 hover:bg-teal-600 text-white text-sm sm:text-base w-full sm:w-auto"
            >
              Schedule a Detailed Review
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
