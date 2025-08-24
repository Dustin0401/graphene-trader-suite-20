import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Settings,
  Plus,
  Activity,
  DollarSign,
  Target,
  Users,
  Database,
  Zap,
  AlertTriangle,
  Search,
  Filter,
  Grid3X3,
  List
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, AreaChart, Area } from 'recharts';
import agentIcon from "@/assets/agent-icon.jpg";
import AgentCard from "@/components/AgentCard";
import AgentDetailedList from "@/components/AgentDetailedList";
import AgentDetailPage from "@/components/AgentDetailPage";
import { Input } from "@/components/ui/input";

interface AgentBuilderHubProps {
  walletConnected: string;
  onCreateAgent: () => void;
  onExploreAgents: () => void;
  onStaking: () => void;
  onAnalytics?: () => void;
  onTrading?: () => void;
  onPricing?: () => void;
  onDashboard?: () => void;
}

// Mock performance data
const mockChartData = [
  { time: '1', value: 100 },
  { time: '2', value: 102 },
  { time: '3', value: 105 },
  { time: '4', value: 103 },
  { time: '5', value: 108 },
  { time: '6', value: 112 },
  { time: '7', value: 115 },
  { time: '8', value: 118 },
  { time: '9', value: 116 },
  { time: '10', value: 122 }
];

// Sample agents data matching the reference image
const agents = [
  {
    id: "1",
    name: "MagicTrend",
    description: "Sophisticated momentum capturing options trader who capitalizes on market directional moves and volatility for optimal risk-adjusted returns.",
    avatar: "/lovable-uploads/c995bc22-3d0f-41a8-8108-ee891615ad5f.png",
    apy: "31.7%",
    pnl: "+22.4%",
    volume: "$1.2M",
    sharpe: "2.31",
    maxDD: "-4.2%",
    winRate: "78%",
    personality: "Aggressive" as const,
    riskScore: 85,
    isActive: true,
    chartData: mockChartData
  },
  {
    id: "2", 
    name: "Bean Warrior",
    description: "Conservative delta-hedged carry trader who employs low-risk strategies with consistent performance and minimal drawdowns.",
    avatar: "/lovable-uploads/c995bc22-3d0f-41a8-8108-ee891615ad5f.png",
    apy: "12.5%",
    pnl: "+8.7%",
    volume: "$850K",
    sharpe: "1.85",
    maxDD: "-2.1%",
    winRate: "85%",
    personality: "Conservative" as const,
    riskScore: 25,
    isActive: true,
    chartData: mockChartData.map(d => ({ ...d, value: d.value * 0.8 + 20 }))
  },
  {
    id: "3",
    name: "Sphinx",
    description: "Advanced Quant AI leveraging ML-driven options theta decay strategies with dynamic risk management and portfolio optimization.",
    avatar: "/lovable-uploads/c995bc22-3d0f-41a8-8108-ee891615ad5f.png",
    apy: "24.8%",
    pnl: "+18.3%",
    volume: "$2.1M",
    sharpe: "2.12",
    maxDD: "-5.8%",
    winRate: "72%",
    personality: "Moderate" as const,
    riskScore: 60,
    isActive: true,
    chartData: mockChartData.map(d => ({ ...d, value: d.value * 1.2 - 10 }))
  },
  {
    id: "4",
    name: "EVF Navigator",
    description: "A meticulous continuous volatility forecaster optimizing entries across markets and timeframes. Revolutionary EVF Model to maximum opportunity. The original.",
    avatar: "/lovable-uploads/c995bc22-3d0f-41a8-8108-ee891615ad5f.png",
    apy: "18.9%",
    pnl: "+15.2%",
    volume: "$1.8M",
    sharpe: "1.95",
    maxDD: "-3.7%",
    winRate: "74%",
    personality: "Moderate" as const,
    riskScore: 55,
    isActive: true,
    chartData: mockChartData.map(d => ({ ...d, value: d.value * 0.9 + 5 }))
  },
  {
    id: "5",
    name: "Elysium Shield",
    description: "Conservative range trading specialist focusing on lower volatility assets. Professional risk management and capital preservation. Continuation by design | Risk...",
    avatar: "/lovable-uploads/c995bc22-3d0f-41a8-8108-ee891615ad5f.png",
    apy: "14.3%",
    pnl: "+11.8%",
    volume: "$950K",
    sharpe: "2.05",
    maxDD: "-2.9%",
    winRate: "82%",
    personality: "Conservative" as const,
    riskScore: 30,
    isActive: true,
    chartData: mockChartData.map(d => ({ ...d, value: d.value * 0.7 + 15 }))
  }
];

export default function AgentBuilderHub({ 
  walletConnected, 
  onCreateAgent, 
  onExploreAgents,
  onStaking,
  onAnalytics,
  onTrading,
  onPricing,
  onDashboard
}: AgentBuilderHubProps) {
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedAgent) {
    return <AgentDetailPage agent={selectedAgent} onBack={() => setSelectedAgent(null)} />;
  }

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
                <span className="text-muted-foreground hover:text-foreground cursor-pointer" onClick={onTrading}>Trading</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer" onClick={onPricing}>Pricing</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer" onClick={onDashboard}>Dashboard</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer" onClick={onAnalytics}>Analytics</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer" onClick={onStaking}>Staking</span>
                <span className="text-primary font-medium cursor-pointer">AI Agents</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={onCreateAgent} className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-4 py-2">
                <Plus className="h-4 w-4 mr-2" />
                Create Agent
              </Button>
              <div className="w-8 h-8 rounded-full bg-muted"></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">STRATOS</h1>
            <h2 className="text-3xl font-bold text-primary/80 mb-4">Swarm</h2>
            <div className="space-y-2 text-sm text-slate-300 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Accessible Institutional-Grade Option Trading Strategies</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>AI Weather and Pricing Monitoring</span>
              </div>
            </div>
            
            {/* Deploy Section */}
            <div className="bg-background rounded-lg p-4 border border-slate-700/30 shadow-lg">
              <h3 className="text-white font-semibold mb-3">Deploy on Stratos</h3>
              <p className="text-sm text-slate-400 mb-4">Deploy USDC on Arbitrum Swarm trades for you</p>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-slate-400">Available Balance</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                    <span className="text-white">USDC</span>
                    <span className="text-slate-400">MAX</span>
                  </div>
                  <div className="text-2xl font-bold text-white mt-1">0.00</div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Deposit
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right side with circular visualization */}
          <div className="flex items-center justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full border-2 border-primary/30"></div>
              <div className="absolute inset-4 rounded-full border border-primary/20"></div>
              <div className="absolute inset-8 rounded-full border border-primary/10"></div>
              {/* Add some dots around the circles */}
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2"></div>
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-0 w-2 h-2 bg-primary rounded-full transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 right-0 w-2 h-2 bg-primary rounded-full transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        {/* Stratos Trading Cockpit */}
        <div className="bg-background rounded-lg p-6 mb-8 border border-slate-700/30 shadow-lg">
          <h3 className="text-white font-semibold mb-4">Stratos Trading Cockpit</h3>
          <p className="text-slate-400 text-sm mb-6">Real-time portfolio performance and strategic positioning</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background rounded-lg p-4 border border-slate-700/20 shadow-md">
              <div className="text-slate-400 text-sm mb-1">Strategy Performance</div>
              <div className="text-2xl font-bold text-white mb-1">$63,567</div>
              <div className="text-primary text-sm">+12.5% APY</div>
            </div>
            <div className="bg-background rounded-lg p-4 border border-slate-700/20 shadow-md">
              <div className="text-slate-400 text-sm mb-1">Risk Assessment</div>
              <div className="text-2xl font-bold text-primary mb-1">61.7%</div>
              <div className="text-slate-400 text-sm">Within targets</div>
            </div>
            <div className="bg-background rounded-lg p-4 border border-slate-700/20 shadow-md">
              <div className="text-slate-400 text-sm mb-1">Market Position</div>
              <div className="text-2xl font-bold text-white mb-1">High</div>
              <div className="text-primary text-sm flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                Bullish
              </div>
            </div>
          </div>
        </div>

        {/* Agents Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <span className="text-white font-semibold">Agents</span>
            <span className="text-slate-400">My Holdings</span>
            <span className="text-slate-400">Manage My Agents</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-slate-700/30 text-white placeholder-slate-400"
              />
            </div>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Agents List */}
        <div className="space-y-4">
          {filteredAgents.map((agent) => {
            const isPnlPositive = agent.pnl.startsWith('+');
            const PersonalityIcon = agent.personality === "Conservative" ? Shield : 
                                   agent.personality === "Moderate" ? AlertTriangle : Zap;
            
            return (
              <div 
                key={agent.id} 
                className="bg-background rounded-lg p-4 border border-slate-700/30 hover:border-slate-600/50 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => setSelectedAgent(agent)}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Agent Info */}
                  <div className="col-span-3 flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={agent.avatar} 
                        alt={agent.name}
                        className="w-14 h-14 rounded-full border-2 border-slate-600"
                      />
                      {agent.isActive && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary border-2 border-slate-800" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-white font-semibold text-sm truncate">{agent.name}</h3>
                        <PersonalityIcon className={`w-3 h-3 flex-shrink-0 ${
                          agent.personality === "Conservative" ? "text-primary" :
                          agent.personality === "Moderate" ? "text-yellow-400" : "text-red-400"
                        }`} />
                      </div>
                      <p className="text-slate-400 text-xs line-clamp-2 leading-tight">{agent.description}</p>
                    </div>
                  </div>

                  {/* APY Column */}
                  <div className="col-span-2 text-center">
                    <div className="text-slate-400 text-xs mb-1">APY | 1M% | 3M%</div>
                    <div className="text-primary font-bold text-sm">{agent.apy}</div>
                  </div>

                  {/* Chart */}
                  <div className="col-span-4 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={agent.chartData}>
                        <XAxis dataKey="time" hide />
                        <YAxis hide />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#BFFF00" 
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Agent Personality */}
                  <div className="col-span-3">
                    <div className="text-slate-400 text-xs mb-2">Agent Personality</div>
                    
                    {/* Risk Bars */}
                    <div className="grid grid-cols-4 gap-1 mb-3">
                      {Array.from({ length: 20 }, (_, i) => (
                        <div 
                          key={i}
                          className={`h-1.5 rounded-sm ${
                            i < Math.floor(agent.riskScore / 5) ? 
                              (agent.riskScore <= 30 ? 'bg-primary' :
                               agent.riskScore <= 70 ? 'bg-yellow-500' : 'bg-red-500') : 
                              'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Risk Categories */}
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Moderate</span>
                        <div className="flex space-x-0.5">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                          <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Leverage</span>
                        <div className="flex space-x-0.5">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                          <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                          <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Liquidity</span>
                        <div className="flex space-x-0.5">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-slate-400">Efficiency</span>
                        <span className="text-white text-xs">99%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}