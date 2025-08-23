import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

interface AgentCardProps {
  id: string;
  name: string;
  description: string;
  avatar: string;
  apy: string;
  tvl: string;
  pnl: string;
  status: "running" | "paused" | "stopped";
  risk: "low" | "medium" | "high";
  isPnlPositive: boolean;
  onClick: () => void;
}

export default function AgentCard({
  id,
  name,
  description,
  avatar,
  apy,
  tvl,
  pnl,
  status,
  risk,
  isPnlPositive,
  onClick
}: AgentCardProps) {
  const statusColor = {
    running: "status-success",
    paused: "status-warning", 
    stopped: "status-danger"
  }[status];

  const riskColor = {
    low: "status-success",
    medium: "status-warning",
    high: "status-danger"
  }[risk];

  return (
    <Card className="pro-card-hover p-4 cursor-pointer" onClick={onClick}>
      <div className="flex items-start gap-3 mb-3">
        <div className="relative">
          <img 
            src={avatar} 
            alt={name}
            className="w-12 h-12 rounded-full object-cover border border-border"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
            status === 'running' ? 'bg-success' : 
            status === 'paused' ? 'bg-warning' : 'bg-destructive'
          }`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="agent-name truncate">{name}</h3>
            <Badge className={riskColor}>{risk.toUpperCase()}</Badge>
          </div>
          <p className="agent-description mb-2 line-clamp-2">{description}</p>
          <Badge className={statusColor}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <div className="metric-label">APY</div>
          <div className="metric-value perf-positive">{apy}</div>
        </div>
        <div>
          <div className="metric-label">TVL</div>
          <div className="metric-value">{tvl}</div>
        </div>
        <div>
          <div className="metric-label">30D PnL</div>
          <div className={`metric-value ${isPnlPositive ? 'perf-positive' : 'perf-negative'}`}>
            {pnl}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Activity className="w-3 h-3" />
          <span>ID: {id.slice(0, 8)}...</span>
        </div>
        
        <div className="flex items-center gap-1">
          {isPnlPositive ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-destructive" />
          )}
        </div>
      </div>
    </Card>
  );
}