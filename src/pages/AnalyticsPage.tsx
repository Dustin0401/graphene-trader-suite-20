import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

interface AnalyticsPageProps {
  onBack: () => void;
}

const tradeCountData = [
  { date: "14Aug25", total: 800 },
  { date: "17Aug25", total: 650 },
  { date: "20Aug25", total: 1200 },
  { date: "23Aug25", total: 2100 },
  { date: "26Aug25", total: 900 },
  { date: "29Aug25", total: 1800 },
  { date: "1Sep25", total: 1600 },
  { date: "4Sep25", total: 2300 },
  { date: "7Sep25", total: 1400 },
  { date: "10Sep25", total: 1900 },
  { date: "13Sep25", total: 1200 },
  { date: "16Sep25", total: 800 },
];

const volumeData = [
  { date: "2Aug25", volume: 85 },
  { date: "4Aug25", volume: 220 },
  { date: "6Aug25", volume: 160 },
  { date: "8Aug25", volume: 290 },
  { date: "10Aug25", volume: 450 },
  { date: "12Aug25", volume: 780 },
  { date: "14Aug25", volume: 320 },
  { date: "16Aug25", volume: 560 },
  { date: "18Aug25", volume: 440 },
  { date: "20Aug25", volume: 720 },
];

const openInterestData = [
  { strike: "3600", call: 15000, put: 8000 },
  { strike: "3700", call: 18000, put: 12000 },
  { strike: "3800", call: 25000, put: 15000 },
  { strike: "3900", call: 30000, put: 18000 },
  { strike: "4000", call: 35000, put: 22000 },
  { strike: "4100", call: 38000, put: 25000 },
  { strike: "4200", call: 42000, put: 28000 },
  { strike: "4300", call: 45000, put: 35000 },
  { strike: "4400", call: 48000, put: 40000 },
  { strike: "4500", call: 45000, put: 38000 },
  { strike: "4600", call: 35000, put: 32000 },
  { strike: "4700", call: 28000, put: 25000 },
  { strike: "4800", call: 22000, put: 20000 },
  { strike: "4900", call: 18000, put: 15000 },
  { strike: "5000", call: 12000, put: 10000 },
];

const pieData = [
  { name: "Call", value: 45, color: "hsl(var(--primary))" },
  { name: "Put", value: 35, color: "hsl(var(--destructive))" },
  { name: "Forward", value: 20, color: "hsl(var(--chart-3))" },
];

const AnalyticsPage = ({ onBack }: AnalyticsPageProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-primary hover:text-primary/80"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Hub
            </Button>
            <h1 className="text-3xl font-bold text-primary">Analytics</h1>
          </div>
        </div>

        {/* Asset Info Header */}
        <Card className="bg-background border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-background">Ξ</span>
                </div>
                <span className="text-lg font-semibold">ETH</span>
              </div>
              
              <div className="flex gap-8">
                <div>
                  <div className="text-sm text-muted-foreground">Expiry Date</div>
                  <div className="text-lg font-semibold text-primary">29Aug25</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Next Auction</div>
                  <div className="text-lg font-semibold">00 hrs 05 mins</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Next Action Forward</div>
                  <div className="text-lg font-semibold text-primary">4312.3</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Available Balance
              </Badge>
              <div className="flex items-center gap-2">
                <span className="text-primary">USDC:</span>
                <span className="font-semibold">WETH</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Trade Count Chart */}
          <Card className="bg-background border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">Trade Count</h3>
              </div>
              <div className="text-2xl font-bold text-primary">2600</div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tradeCountData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.1)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Trading Volumes Chart */}
          <Card className="bg-background border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">Trading Volumes</h3>
              </div>
              <div className="text-lg text-muted-foreground">1M</div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar 
                    dataKey="volume" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Open Interest Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Open Interest Histogram */}
          <Card className="bg-background border-border p-6 xl:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Open Interest</h3>
              <Badge variant="outline" className="ml-2 text-primary border-primary">
                29Aug25
              </Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={openInterestData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="strike" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar 
                    dataKey="call" 
                    stackId="a"
                    fill="hsl(var(--primary))"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar 
                    dataKey="put" 
                    stackId="a"
                    fill="hsl(var(--destructive))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Pie Chart */}
          <Card className="bg-background border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Distribution</h3>
            </div>
            <div className="h-80 flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="70%">
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Call</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <span>Put</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
                  <span>Forward</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;