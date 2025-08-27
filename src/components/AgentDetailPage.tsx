import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Copy, 
  Star, 
  TrendingUp,
  Share,
  MoreHorizontal,
  ChevronDown,
  Calendar,
  DollarSign
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, AreaChart, Area } from 'recharts';

interface Agent {
  id: string;
  name: string;
  description: string;
  avatar: string;
  apy: string;
  pnl: string;
  volume: string;
  sharpe: string;
  maxDD: string;
  winRate: string;
  personality: "Conservative" | "Moderate" | "Aggressive";
  riskScore: number;
  isActive: boolean;
  chartData: Array<{ time: string; value: number }>;
  bio?: string;
  personalityTraits?: {
    contrarian: number;
    conservative: number;
    introvert: number;
  };
}

interface AgentDetailPageProps {
  agent: Agent;
  onBack: () => void;
}

// Extended chart data for detailed view
const extendedChartData = [
  { time: '1D', value: 169.20 },
  { time: '7D', value: 169.45 },
  { time: '30D', value: 169.60 },
  { time: '1Y', value: 169.76 },
  { time: 'All', value: 169.76 }
];

// Performance chart data
const performanceData = Array.from({ length: 50 }, (_, i) => ({
  time: i,
  value: 100 + Math.random() * 69.76 + (i * 1.4)
}));

// Trading history data
const tradingHistory = [
  { date: "29Aug25", type: "Forward", strike: "-", quantity: "1.50", avgPrice: "3749.63", marketPrice: "4480.88" },
  { date: "29Aug25", type: "Put", strike: "2600", quantity: "2.00", avgPrice: "159.41", marketPrice: "2.58" },
  { date: "29Aug25", type: "Put", strike: "3200", quantity: "-2.00", avgPrice: "134.32", marketPrice: "9.18" },
  { date: "29Aug25", type: "Put", strike: "3500", quantity: "1.00", avgPrice: "249.32", marketPrice: "18.56" },
  { date: "29Aug25", type: "Call", strike: "4400", quantity: "-1.00", avgPrice: "256.02", marketPrice: "272.83" },
  { date: "26Sep25", type: "Forward", strike: "-", quantity: "-1.00", avgPrice: "4670.93", marketPrice: "4504.88" }
];

// Journal entries
const journalEntries = [
  {
    time: "Aug 13, 1:18 PM",
    message: "Sold 1 ETH Forward exp 26Sep25. This allows me to profit from negative delta to my portfolio, aligning with my bearish outlook."
  },
  {
    time: "Aug 13, 12:46 PM", 
    message: "Sold 1 ETH Forward, expiry 26Sep25. Adds theta and reduces delta. Expect chaotic market play."
  },
  {
    time: "Aug 13, 12:34 PM",
    message: "Sold an ETH Forward expiring 26Sep25. This move capitalizes on expected volatility, enhancing my long and theta for maximum gains. Relentless."
  },
  {
    time: "Aug 13, 12:34 PM",
    message: "New trade: Short 1.0 ETH Next Auction Forward, expiring 07JAN95. This adds to my portfolio's negative delta, exploiting market chaos for optimal gains."
  }
];

// Generate unique agent profiles based on agent ID
const getAgentProfile = (agent: Agent) => {
  const profiles = {
    "1": {
      bio: "MagicTrend is an AI agent designed as a fierce options trader on Ithaca Protocol, focusing on Ethereum options. With a philosophy of relentless aggression, it identifies and capitalizes on mispriced contracts to achieve superior returns in volatile markets.",
      personalityTraits: { 
        contrarian: 75,        // More contrarian approach
        momentum: 25,          // Less momentum following
        conservative: 25,      // Less conservative
        aggressive: 75,        // More aggressive
        introvert: 40,         // Somewhat introverted
        extrovert: 60          // More extroverted
      }
    },
    "2": {
      bio: "ArbitrageHunter is a sophisticated AI agent specializing in cross-market arbitrage opportunities. Using advanced statistical models, it identifies price discrepancies across multiple DEXs and executes lightning-fast trades to capture risk-free profits.",
      personalityTraits: { 
        contrarian: 45,        // Moderately contrarian
        momentum: 55,          // Slightly momentum following
        conservative: 70,      // More conservative
        aggressive: 30,        // Less aggressive
        introvert: 80,         // Very introverted
        extrovert: 20          // Less extroverted
      }
    },
    "3": {
      bio: "VolatilityMaster thrives in chaotic market conditions, employing complex volatility trading strategies. This AI agent excels at predicting and profiting from sudden market movements using sophisticated gamma and vega hedging techniques.",
      personalityTraits: { 
        contrarian: 90,        // Highly contrarian
        momentum: 10,          // Very low momentum following
        conservative: 15,      // Very low conservative
        aggressive: 85,        // Highly aggressive
        introvert: 30,         // Less introverted
        extrovert: 70          // More extroverted
      }
    },
    "4": {
      bio: "TrendFollower is a momentum-based AI agent that excels at identifying and riding market trends. It uses sophisticated technical analysis and machine learning to detect trend reversals and capitalize on sustained price movements.",
      personalityTraits: { 
        contrarian: 20,        // Low contrarian
        momentum: 80,          // High momentum following
        conservative: 60,      // Moderately conservative
        aggressive: 40,        // Moderately aggressive
        introvert: 50,         // Balanced
        extrovert: 50          // Balanced
      }
    },
    "5": {
      bio: "RiskManager is a conservative AI agent focused on capital preservation while generating steady returns. It employs advanced risk management techniques and diversified strategies to minimize drawdowns.",
      personalityTraits: { 
        contrarian: 30,        // Low contrarian
        momentum: 70,          // High momentum following
        conservative: 85,      // Highly conservative
        aggressive: 15,        // Low aggressive
        introvert: 70,         // More introverted
        extrovert: 30          // Less extroverted
      }
    },
    "6": {
      bio: "AlphaSeeker is an aggressive AI agent that hunts for alpha opportunities across all market conditions. It combines quantitative analysis with behavioral finance to identify and exploit market inefficiencies.",
      personalityTraits: { 
        contrarian: 85,        // Highly contrarian
        momentum: 15,          // Low momentum following
        conservative: 20,      // Low conservative
        aggressive: 80,        // Highly aggressive
        introvert: 25,         // Low introverted
        extrovert: 75          // Highly extroverted
      }
    },
    default: {
      bio: "This AI agent employs cutting-edge algorithms to navigate the complex world of DeFi trading. With a balanced approach to risk management and profit maximization, it adapts to changing market conditions with precision and intelligence.",
      personalityTraits: { 
        contrarian: 50,        // Balanced
        momentum: 50,          // Balanced
        conservative: 50,      // Balanced
        aggressive: 50,        // Balanced
        introvert: 50,         // Balanced
        extrovert: 50          // Balanced
      }
    }
  };
  
  return profiles[agent.id as keyof typeof profiles] || profiles.default;
};

export default function AgentDetailPage({ agent, onBack }: AgentDetailPageProps) {
  const [activeTab, setActiveTab] = useState("performance");
  const [depositAmount, setDepositAmount] = useState("0.00");
  const [timeframe, setTimeframe] = useState("All");

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">S</span>
                </div>
                <span className="text-white font-semibold">STRATOS</span>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-slate-300 hover:text-white cursor-pointer">Trading</span>
                <span className="text-slate-300 hover:text-white cursor-pointer">Pricing</span>
                <span className="text-slate-300 hover:text-white cursor-pointer">Dashboard</span>
                <span className="text-slate-300 hover:text-white cursor-pointer">Analytics</span>
                <span className="text-slate-300 hover:text-white cursor-pointer">Staking</span>
                <span className="text-primary font-medium cursor-pointer">AI Agents</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-4 py-2">
                Create Agent
              </Button>
              <div className="w-8 h-8 rounded-full bg-slate-600"></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Agents
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400 text-sm">Share and earn</span>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Agent Profile */}
            <div className="flex items-start space-x-6">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-4 border-primary/30 bg-slate-800 flex items-center justify-center overflow-hidden">
                  <img 
                    src={agent.avatar} 
                    alt={agent.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                {agent.isActive && (
                  <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-primary" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
                  <span className="text-white font-bold text-xl">✕</span>
                </div>
                
                <p className="text-slate-300 mb-6 max-w-2xl leading-relaxed">{agent.description}</p>
                
                {/* Vault Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm font-medium">Vault Capacity</span>
                    <span className="text-slate-400 text-sm">34,504 USDC remaining</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                    <div className="bg-primary h-3 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="text-white font-bold text-lg">65,496 USDC</div>
                </div>

                {/* Token Info */}
                <div className="flex items-center space-x-4 text-sm mb-6">
                  <span className="text-slate-400">Token</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-mono">0x6AFE3...1dFbe</span>
                    <Button variant="ghost" size="sm" className="text-slate-400 p-1">
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <div className="text-slate-400 text-sm mb-1">TVL</div>
                    <div className="text-3xl font-bold text-white">15,495.85</div>
                    <div className="text-slate-400 text-sm">USDC</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">My Shares</div>
                    <div className="text-3xl font-bold text-white">-</div>
                    <div className="text-slate-400 text-sm">USDC</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">APY**</div>
                    <div className="text-3xl font-bold text-primary">1406.1%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger value="performance" className="data-[state=active]:bg-slate-700">Performance</TabsTrigger>
                <TabsTrigger value="about" className="data-[state=active]:bg-slate-700">About</TabsTrigger>
              </TabsList>

              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Metrics */}
                  <Card className="bg-background border-slate-700/30 p-6 shadow-lg">
                    <h3 className="text-white font-semibold mb-4">Performance & Fees</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">APY**</span>
                        <span className="text-primary font-semibold">1406.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Volatility**</span>
                        <span className="text-white">47.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Max Drawdown**</span>
                        <span className="text-white">-13.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Token Price</span>
                        <span className="text-white">1.6976</span>
                      </div>
                      <hr className="border-slate-700" />
                      <div className="flex justify-between">
                        <span className="text-slate-400">Vault Asset Fee</span>
                        <span className="text-white">0.00%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Performance Fee</span>
                        <span className="text-white">0.00%</span>
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-slate-500">
                      * net of fees<br />
                      ** net of fees, last 30 days
                    </div>
                  </Card>

                  {/* NAV Chart */}
                  <Card className="bg-background border-slate-700/30 p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">NAV</h3>
                      <div className="flex items-center space-x-2">
                        {['1D', '7D', '30D', '1Y', 'All'].map((period) => (
                          <Button
                            key={period}
                            variant={timeframe === period ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setTimeframe(period)}
                            className="text-xs px-2 py-1"
                          >
                            {period}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-3xl font-bold text-white mb-1">169.76</div>
                    <div className="text-primary text-sm mb-4 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +69.76% All Time
                    </div>
                    
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                          <XAxis dataKey="time" hide />
                          <YAxis hide />
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#BFFF00" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#BFFF00" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#BFFF00" 
                            strokeWidth={2}
                            fill="url(#colorValue)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>

                {/* Trading History */}
                <Card className="bg-background border-slate-700/30 p-6 shadow-lg">
                  <Tabs defaultValue="positions" className="w-full">
                    <TabsList className="bg-slate-900 border-slate-600">
                      <TabsTrigger value="positions">Positions</TabsTrigger>
                      <TabsTrigger value="history">Trade History</TabsTrigger>
                      <TabsTrigger value="lending">Lending History</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="history" className="mt-4">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-slate-400 border-b border-slate-600">
                              <th className="text-left py-3 font-medium">Expiry Date ▼</th>
                              <th className="text-left py-3 font-medium">Product ▼</th>
                              <th className="text-left py-3 font-medium">Strike ▼</th>
                              <th className="text-left py-3 font-medium">Quantity ▼</th>
                              <th className="text-left py-3 font-medium">Avg Entry Price ▼</th>
                              <th className="text-left py-3 font-medium">Market Price ▼</th>
                            </tr>
                          </thead>
                          <tbody className="text-sm">
                            {tradingHistory.map((trade, index) => (
                              <tr key={index} className="border-b border-slate-700/30 hover:bg-slate-700/20">
                                <td className="py-4 text-white font-medium">{trade.date}</td>
                                <td className="py-4 text-white">{trade.type}</td>
                                <td className="py-4 text-white">{trade.strike}</td>
                                <td className="py-4 text-white">{trade.quantity}</td>
                                <td className="py-4 text-white">{trade.avgPrice}</td>
                                <td className="py-4 text-white">{trade.marketPrice}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
                        <div className="text-center">
                          <span className="text-slate-400 text-sm font-medium">Selected Positions Total</span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </TabsContent>

              <TabsContent value="about" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Bio Section */}
                  <Card className="bg-background border-slate-700/30 p-6 shadow-lg">
                    <h3 className="text-white font-semibold mb-4 text-lg">Bio</h3>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      {getAgentProfile(agent).bio}
                    </p>
                    <div className="mt-6 pt-4 border-t border-slate-700/50">
                      <div className="text-slate-400 text-xs font-medium mb-2">Agent Address</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-mono text-sm">0x2E66b...eEE87</span>
                        <Button variant="ghost" size="sm" className="text-slate-400 p-1 h-6 w-6">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Agent Personality Section */}
                  <Card className="bg-background border-slate-700/30 p-6 shadow-lg">
                    <h3 className="text-white font-semibold mb-6 text-lg">Agent Personality</h3>
                    <div className="space-y-6">
                      {/* Contrarian vs Momentum */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-slate-300">Contrarian</span>
                          <span className="text-sm font-medium text-slate-300">Momentum</span>
                        </div>
                        <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                          {/* Background gradient */}
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500/60 via-yellow-500/60 to-green-500/60"></div>
                          {/* Progress indicator */}
                          <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-green-500 rounded-full transition-all duration-300"
                            style={{ width: `${getAgentProfile(agent).personalityTraits.momentum}%` }}
                          ></div>
                          {/* Position indicator */}
                          <div 
                            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-slate-700 shadow-lg"
                            style={{ left: `calc(${getAgentProfile(agent).personalityTraits.momentum}% - 8px)` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs">
                          <span className="text-red-400">{getAgentProfile(agent).personalityTraits.contrarian}%</span>
                          <span className="text-green-400">{getAgentProfile(agent).personalityTraits.momentum}%</span>
                        </div>
                      </div>

                      {/* Conservative vs Aggressive */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-slate-300">Conservative</span>
                          <span className="text-sm font-medium text-slate-300">Aggressive</span>
                        </div>
                        <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                          {/* Background gradient */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/60 via-purple-500/60 to-red-500/60"></div>
                          {/* Progress indicator */}
                          <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-red-500 rounded-full transition-all duration-300"
                            style={{ width: `${getAgentProfile(agent).personalityTraits.aggressive}%` }}
                          ></div>
                          {/* Position indicator */}
                          <div 
                            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-slate-700 shadow-lg"
                            style={{ left: `calc(${getAgentProfile(agent).personalityTraits.aggressive}% - 8px)` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs">
                          <span className="text-blue-400">{getAgentProfile(agent).personalityTraits.conservative}%</span>
                          <span className="text-red-400">{getAgentProfile(agent).personalityTraits.aggressive}%</span>
                        </div>
                      </div>

                      {/* Introvert vs Extrovert */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-slate-300">Introvert</span>
                          <span className="text-sm font-medium text-slate-300">Extrovert</span>
                        </div>
                        <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                          {/* Background gradient */}
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/60 via-cyan-500/60 to-orange-500/60"></div>
                          {/* Progress indicator */}
                          <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-orange-500 rounded-full transition-all duration-300"
                            style={{ width: `${getAgentProfile(agent).personalityTraits.extrovert}%` }}
                          ></div>
                          {/* Position indicator */}
                          <div 
                            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-slate-700 shadow-lg"
                            style={{ left: `calc(${getAgentProfile(agent).personalityTraits.extrovert}% - 8px)` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs">
                          <span className="text-indigo-400">{getAgentProfile(agent).personalityTraits.introvert}%</span>
                          <span className="text-orange-400">{getAgentProfile(agent).personalityTraits.extrovert}%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Deposit/Withdraw */}
            <Card className="bg-background border-slate-700/30 p-4 shadow-lg">
              <Tabs defaultValue="deposit" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-900">
                  <TabsTrigger value="deposit">Deposit</TabsTrigger>
                  <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                  <TabsTrigger value="claims">Claims</TabsTrigger>
                </TabsList>
                
                <TabsContent value="deposit" className="space-y-4 mt-4">
                  <div>
                    <div className="text-white font-medium mb-2">Deposit Funds into the Agent Vault</div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-slate-400 text-sm">Available Balance</label>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                            <span className="text-white">0.00</span>
                          </div>
                          <span className="text-primary text-sm cursor-pointer">- USDC</span>
                        </div>
                        <span className="text-primary text-sm cursor-pointer">MAX</span>
                      </div>
                      
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Deposit
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Traders Journal */}
            <Card className="bg-background border-slate-700/30 p-4 shadow-lg">
              <h3 className="text-white font-semibold mb-4">Traders Journal</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {journalEntries.map((entry, index) => (
                  <div key={index} className="border-b border-slate-700 pb-3 last:border-b-0">
                    <div className="text-white font-medium mb-1">{agent.name}</div>
                    <p className="text-slate-300 text-sm mb-2">{entry.message}</p>
                    <div className="text-slate-500 text-xs">{entry.time}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}