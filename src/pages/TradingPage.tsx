import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  ArrowLeft, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle,
  Copy,
  Settings
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Area, AreaChart } from 'recharts';

interface TradingPageProps {
  onBack: () => void;
}

// Mock data for the P&L chart
const mockPnLData = [
  { x: 0, y: 0 },
  { x: 10, y: -200 },
  { x: 20, y: -150 },
  { x: 30, y: -100 },
  { x: 40, y: 0 },
  { x: 50, y: 200 },
  { x: 60, y: 400 },
  { x: 70, y: 600 },
  { x: 80, y: 500 },
  { x: 90, y: 400 },
  { x: 100, y: 300 }
];

export default function TradingPage({ onBack }: TradingPageProps) {
  const [selectedStrategy, setSelectedStrategy] = useState("Linear Combinations");
  const [selectedAsset, setSelectedAsset] = useState("ETH");
  const [nextAuction, setNextAuction] = useState("00 Min 18 Secs");
  const [linkAll, setLinkAll] = useState(true);
  const [enableCalendars, setEnableCalendars] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-foreground font-semibold">STRATOS</span>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-primary font-medium cursor-pointer">Trading</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => window.history.back()}>Pricing</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Dashboard</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Analytics</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Staking</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer" onClick={onBack}>AI Agents</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={onBack} variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-primary/10 text-primary">USDC</Badge>
                <Badge variant="outline" className="bg-secondary/10 text-secondary">WETH</Badge>
              </div>
              <div className="w-8 h-8 rounded-full bg-muted"></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Strategy Controls */}
          <div className="col-span-3 space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Dynamic Option Strategies</h3>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Asset</label>
                  <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="SOL">SOL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Expiry Date</span>
                  <span className="text-sm text-primary">29Aug25</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Next Auction</span>
                  <span className="text-sm text-muted-foreground">{nextAuction}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Next Auction Forward</span>
                  <span className="text-sm text-primary">4294.3</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable calendars</span>
                  <Switch checked={enableCalendars} onCheckedChange={setEnableCalendars} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Link all</span>
                  <Switch checked={linkAll} onCheckedChange={setLinkAll} />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Strategy Types</h4>
                <Button variant="ghost" size="sm">
                  Invert Side
                </Button>
              </div>
              
              <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Linear Combinations">Linear Combinations</SelectItem>
                  <SelectItem value="Call Spread">Call Spread</SelectItem>
                  <SelectItem value="Put Spread">Put Spread</SelectItem>
                  <SelectItem value="Straddle">Straddle</SelectItem>
                  <SelectItem value="Strangle">Strangle</SelectItem>
                  <SelectItem value="Structured Products">Structured Products</SelectItem>
                </SelectContent>
              </Select>
            </Card>
          </div>

          {/* Main Trading Interface */}
          <div className="col-span-6 space-y-4">
            {/* Option Products */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Product</h3>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Tabs defaultValue="option" className="mb-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="option">Option</TabsTrigger>
                  <TabsTrigger value="digital">Digital</TabsTrigger>
                  <TabsTrigger value="forward">Forward</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                {/* First Option Row */}
                <div className="grid grid-cols-6 gap-2 items-center p-3 border border-border rounded-lg">
                  <div className="text-sm font-medium">Type</div>
                  <div className="text-sm font-medium">Side</div>
                  <div className="text-sm font-medium">Size</div>
                  <div className="text-sm font-medium">Strike</div>
                  <div className="text-sm font-medium">Unit Price</div>
                  <div></div>
                  
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="text-xs px-2">Call</Button>
                    <Button size="sm" variant="ghost" className="text-xs px-2">Put</Button>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="outline" className="w-6 h-6 p-0 text-xs bg-red-500/20 text-red-400">-</Button>
                    <span className="text-xs">1</span>
                  </div>
                  
                  <Input defaultValue="4600" className="h-8 text-sm" />
                  
                  <div className="text-sm">
                    <div className="text-primary">68.46</div>
                    <div className="text-xs text-muted-foreground">IV 72.84%</div>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="w-6 h-6 p-0">
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="w-6 h-6 p-0">
                      <CheckCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Second Option Row */}
                <div className="grid grid-cols-6 gap-2 items-center p-3 border border-border rounded-lg">
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="text-xs px-2">Call</Button>
                    <Button size="sm" variant="ghost" className="text-xs px-2">Put</Button>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="outline" className="w-6 h-6 p-0 text-xs bg-red-500/20 text-red-400">-</Button>
                    <span className="text-xs">1</span>
                  </div>
                  
                  <Input defaultValue="4700" className="h-8 text-sm" />
                  
                  <div className="text-sm">
                    <div className="text-primary">39.57</div>
                    <div className="text-xs text-muted-foreground">IV 65.0%</div>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="w-6 h-6 p-0">
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="w-6 h-6 p-0">
                      <CheckCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Building Block
              </Button>
            </Card>

            {/* Strategy Summary */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Strategy</h3>
                <Button variant="outline" size="sm" className="text-xs">
                  Clear All
                </Button>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-6 gap-2 text-xs font-medium text-muted-foreground">
                  <div>Type</div>
                  <div>Expiry</div>
                  <div>Side</div>
                  <div>Size</div>
                  <div>Strike</div>
                  <div>Unit Price</div>
                </div>
                
                <div className="grid grid-cols-6 gap-2 text-sm items-center py-2 border-b border-border">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Call</span>
                  </div>
                  <div>29Aug25</div>
                  <div className="text-red-400">-</div>
                  <div>1</div>
                  <div>4600</div>
                  <div>66.46</div>
                </div>
                
                <div className="grid grid-cols-6 gap-2 text-sm items-center py-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Call</span>
                  </div>
                  <div>29Aug25</div>
                  <div className="text-red-400">-</div>
                  <div>1</div>
                  <div>4700</div>
                  <div>39.57</div>
                </div>
              </div>
            </Card>

            {/* P&L Chart */}
            <Card className="p-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockPnLData}>
                    <defs>
                      <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity={0} />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="x" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Area
                      type="monotone"
                      dataKey="y"
                      stroke="#22c55e"
                      fill="url(#profitGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-center space-x-8 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-foreground"></div>
                  <span>Total</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span>Call</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span>Put</span>
                </div>
              </div>
            </Card>

            {/* Greeks */}
            <Card className="p-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-sm text-muted-foreground">Δ Delta</div>
                  <div className="text-lg font-semibold">0.063</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Γ Vega</div>
                  <div className="text-lg font-semibold">0.284</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Θ Gamma</div>
                  <div className="text-lg font-semibold">0.005</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">ρ Theta</div>
                  <div className="text-lg font-semibold">-1.476</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Sidebar - Order Summary */}
          <div className="col-span-3">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Combo Price</span>
                  <span className="text-lg font-semibold">28.89</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Collateral Requirement</span>
                  <div className="text-right">
                    <div className="text-sm">-6 WETH</div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expected Fee</span>
                  <div className="text-right">
                    <div className="text-sm">0.99 USDC</div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Price</span>
                  <div className="text-right">
                    <div className="text-sm">Pay 27.88 USDC</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm">Confirmation Modal</span>
                  <Switch defaultChecked />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                  Deposit
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-amber-500">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Insufficient Balance</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}