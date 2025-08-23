import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { TrendingUp, TrendingDown, Shield, AlertTriangle, Zap } from "lucide-react";

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
}

interface AgentDetailedListProps {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
}

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

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "MegaTrend",
    description: "Sophisticated momentum capturing options trader who capitalizes on market directional moves and volatility for optimal risk-adjusted returns.",
    avatar: "/lovable-uploads/c995bc22-3d0f-41a8-8108-ee891615ad5f.png",
    apy: "31.7%",
    pnl: "+22.4%",
    volume: "$1.2M",
    sharpe: "2.31",
    maxDD: "-4.2%",
    winRate: "78%",
    personality: "Aggressive",
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
    personality: "Conservative",
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
    personality: "Moderate",
    riskScore: 60,
    isActive: true,
    chartData: mockChartData.map(d => ({ ...d, value: d.value * 1.2 - 10 }))
  }
];

const PersonalityIcon = ({ personality }: { personality: string }) => {
  switch (personality) {
    case "Conservative":
      return <Shield className="w-4 h-4 text-success" />;
    case "Moderate":
      return <AlertTriangle className="w-4 h-4 text-warning" />;
    case "Aggressive":
      return <Zap className="w-4 h-4 text-destructive" />;
    default:
      return <Shield className="w-4 h-4" />;
  }
};

const RiskIndicator = ({ score }: { score: number }) => {
  const getRiskColor = (score: number) => {
    if (score <= 30) return "bg-success";
    if (score <= 70) return "bg-warning";
    return "bg-destructive";
  };

  const bars = Array.from({ length: 10 }, (_, i) => (
    <div 
      key={i}
      className={`w-2 h-3 rounded-sm ${
        i < Math.floor(score / 10) ? getRiskColor(score) : "bg-muted"
      }`}
    />
  ));

  return <div className="flex gap-0.5">{bars}</div>;
};

export default function AgentDetailedList({ agents = mockAgents, onAgentClick }: AgentDetailedListProps) {
  return (
    <div className="space-y-4">
      {agents.map((agent) => {
        const isPnlPositive = agent.pnl.startsWith('+');
        
        return (
          <Card 
            key={agent.id} 
            className="pro-card-hover p-6 cursor-pointer"
            onClick={() => onAgentClick(agent)}
          >
            <div className="grid grid-cols-12 gap-6 items-center">
              {/* Agent Info - 4 cols */}
              <div className="col-span-4 flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={agent.avatar} 
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-border"
                  />
                  {agent.isActive && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background bg-success" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {agent.name}
                    </h3>
                    <PersonalityIcon personality={agent.personality} />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {agent.description}
                  </p>
                  <Badge className={
                    agent.personality === 'Conservative' ? 'status-success' :
                    agent.personality === 'Moderate' ? 'status-warning' : 'status-danger'
                  }>
                    {agent.personality}
                  </Badge>
                </div>
              </div>

              {/* Performance Metrics - 4 cols */}
              <div className="col-span-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">APY Returns</div>
                  <div className="text-2xl font-bold text-foreground">{agent.apy}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">PnL 30D</div>
                  <div className={`text-2xl font-bold flex items-center gap-1 ${
                    isPnlPositive ? 'perf-positive' : 'perf-negative'
                  }`}>
                    {agent.pnl}
                    {isPnlPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Volume</div>
                  <div className="text-lg font-semibold text-foreground">{agent.volume}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Sharpe</div>
                  <div className="text-lg font-semibold text-foreground">{agent.sharpe}</div>
                </div>
              </div>

              {/* Chart - 2 cols */}
              <div className="col-span-2 h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={agent.chartData}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={isPnlPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Risk Indicator - 2 cols */}
              <div className="col-span-2 space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-2">Agent Personality</div>
                  <RiskIndicator score={agent.riskScore} />
                </div>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Win Rate:</span>
                    <span className="text-foreground font-medium">{agent.winRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max DD:</span>
                    <span className="text-foreground font-medium">{agent.maxDD}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}