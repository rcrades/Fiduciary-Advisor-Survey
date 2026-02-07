// ... (previous imports and code remain the same)

export default function PortfolioAnalysisPage() {
  // ... (previous state and functions remain the same)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 p-2 sm:p-4 md:p-6 lg:p-8">
      <Card className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg text-white overflow-hidden">
        <div className="p-2 sm:p-4 md:p-6 lg:p-8">
          {/* ... (header content remains the same) */}
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* ... (tabs content remains the same) */}
              
              <TabsContent value="allocation">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
                      <PieChartIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-teal-400" />
                      Current Asset Allocation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <div className="w-full md:w-1/2 mb-6 md:mb-0">
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={assetAllocation}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius="80%"
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {assetAllocation.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="w-full md:w-1/2 md:ml-6 text-sm sm:text-base">
                        <h3 className="text-lg font-semibold mb-2">Allocation Breakdown</h3>
                        {assetAllocation.map((item, index) => (
                          <div key={item.name} className="flex items-center mb-2">
                            <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            <span>{item.name}: {item.value}%</span>
                          </div>
                        ))}
                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">Allocation Insights</h4>
                          <p>Your current allocation is well-diversified across major asset classes. This strategy aims to balance growth potential with risk management, aligning with your moderate risk profile.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* ... (other tabs content remains the same) */}
            </Tabs>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
