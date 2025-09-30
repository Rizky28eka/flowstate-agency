import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartBar as BarChart3, TrendingUp, DollarSign, Users, Calendar, Download, Filter } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { monthlyRevenueData, clientAcquisitionData } from "@/lib/mock-data";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#6D28D9",
  },
  clients: {
    label: "New Clients",
    color: "#10B981",
  },
};

import Paywall from "@/components/Paywall";

const OwnerAnalytics = () => {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <Paywall 
      feature="analytics"
      featureName="Advanced Analytics"
      features={[
        "In-depth revenue and client analytics",
        "Project and team performance metrics",
        "Customizable reports and dashboards",
      ]}>
      <main className="flex-1 px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,284,592</div>
              <p className="text-xs text-muted-foreground">+18.2% from last period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">+12 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Project Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.8%</div>
              <p className="text-xs text-muted-foreground">+2.1% improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Project Value</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,750</div>
              <p className="text-xs text-muted-foreground">+8.5% from last quarter</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue breakdown and projections</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80 w-full">
                    <BarChart data={monthlyRevenueData} accessibilityLayer>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <YAxis
                        tickFormatter={(value) => `$${value / 1000}k`}
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <Bar dataKey="revenue" fill="var(--color-revenue)" radius={8} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Service</CardTitle>
                  <CardDescription>Service line performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { service: "Brand Design", revenue: "$485,200", percentage: "38%", growth: "+15%" },
                      { service: "Web Development", revenue: "$342,800", percentage: "27%", growth: "+22%" },
                      { service: "Digital Marketing", revenue: "$256,400", percentage: "20%", growth: "+8%" },
                      { service: "Consulting", revenue: "$200,192", percentage: "15%", growth: "+31%" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{item.service}</p>
                          <p className="text-sm text-muted-foreground">{item.percentage} of total</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{item.revenue}</p>
                          <p className="text-sm text-green-600">{item.growth}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Client Acquisition</CardTitle>
                  <CardDescription>New client growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80 w-full">
                    <LineChart data={clientAcquisitionData} accessibilityLayer>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <YAxis
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="clients" stroke="var(--color-clients)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Retention</CardTitle>
                  <CardDescription>Client loyalty and repeat business</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Client Retention Rate</span>
                      <span className="font-bold text-green-600">89.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Client Lifetime</span>
                      <span className="font-bold">2.4 years</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Repeat Project Rate</span>
                      <span className="font-bold text-blue-600">76.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Client Satisfaction</span>
                      <span className="font-bold text-amber-600">4.7/5.0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Pipeline</CardTitle>
                  <CardDescription>Current project status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Discovery</span>
                      <span className="text-sm font-medium">8 projects</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">In Progress</span>
                      <span className="text-sm font-medium">23 projects</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Review</span>
                      <span className="text-sm font-medium">12 projects</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Completed</span>
                      <span className="text-sm font-medium">156 projects</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Performance</CardTitle>
                  <CardDescription>Delivery and quality metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">On-time Delivery</span>
                      <span className="text-sm font-medium text-green-600">92.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Budget Adherence</span>
                      <span className="text-sm font-medium text-blue-600">88.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Client Approval Rate</span>
                      <span className="text-sm font-medium text-purple-600">94.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg Project Duration</span>
                      <span className="text-sm font-medium">6.2 weeks</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue per Project</CardTitle>
                  <CardDescription>Project profitability analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Average Revenue</span>
                      <span className="text-sm font-medium">$24,750</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Average Profit</span>
                      <span className="text-sm font-medium text-green-600">$8,925</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Profit Margin</span>
                      <span className="text-sm font-medium text-blue-600">36.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">ROI</span>
                      <span className="text-sm font-medium text-purple-600">156%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Productivity</CardTitle>
                  <CardDescription>Individual and team performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { department: "Creative Team", members: 12, utilization: "87%", satisfaction: "4.6" },
                      { department: "Development", members: 8, utilization: "92%", satisfaction: "4.4" },
                      { department: "Strategy", members: 5, utilization: "78%", satisfaction: "4.8" },
                      { department: "Account Management", members: 7, utilization: "85%", satisfaction: "4.5" }
                    ].map((dept, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{dept.department}</p>
                          <p className="text-sm text-muted-foreground">{dept.members} members</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{dept.utilization} utilization</p>
                          <p className="text-sm text-muted-foreground">{dept.satisfaction}/5.0 satisfaction</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Allocation</CardTitle>
                  <CardDescription>Team capacity and workload distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-muted/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Resource Allocation Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Performance</CardTitle>
                  <CardDescription>Key financial indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Gross Margin</span>
                      <span className="text-sm font-medium text-green-600">68.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Operating Margin</span>
                      <span className="text-sm font-medium text-blue-600">24.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">EBITDA</span>
                      <span className="text-sm font-medium">$317,534</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cash Flow</span>
                      <span className="text-sm font-medium text-green-600">$289,421</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Operational Efficiency</CardTitle>
                  <CardDescription>Process and workflow metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Project Cycle Time</span>
                      <span className="text-sm font-medium">6.2 weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">First-time Approval</span>
                      <span className="text-sm font-medium text-green-600">78.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Resource Utilization</span>
                      <span className="text-sm font-medium text-blue-600">86.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Quality Score</span>
                      <span className="text-sm font-medium text-purple-600">9.2/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Growth Metrics</CardTitle>
                  <CardDescription>Business expansion indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Revenue Growth</span>
                      <span className="text-sm font-medium text-green-600">+23.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Client Growth</span>
                      <span className="text-sm font-medium text-blue-600">+18.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Team Growth</span>
                      <span className="text-sm font-medium text-purple-600">+15.6%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Market Share</span>
                      <span className="text-sm font-medium">12.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </Paywall>
  );
};


export default OwnerAnalytics;