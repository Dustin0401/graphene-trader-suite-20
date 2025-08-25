import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  MessageSquare, 
  Code, 
  ArrowLeft,
  Brain,
  Cpu,
  Settings,
  TrendingUp,
  Shield,
  Zap,
  Target,
  BarChart3
} from "lucide-react";

interface AgentBuilderProps {
  onBack: () => void;
}

export default function AgentBuilder({ onBack }: AgentBuilderProps) {
  const [buildMode, setBuildMode] = useState<"chat" | "advanced">("chat");
  const [chatInput, setChatInput] = useState("");
  const [agentConfig, setAgentConfig] = useState({
    name: "",
    description: "",
    strategy: "",
    riskLevel: "",
    venues: [] as string[],
  });

  const strategies = [
    { id: "delta-neutral", name: "Delta-Neutral Arbitrage", risk: "Low" },
    { id: "momentum", name: "Momentum Trading", risk: "Medium" },
    { id: "mean-reversion", name: "Mean Reversion", risk: "Medium" },
    { id: "options-wheel", name: "Options Wheel", risk: "Low" },
    { id: "dispersion", name: "Dispersion Trading", risk: "High" },
  ];

  const venues = [
    { id: "uniswap", name: "Uniswap V3", type: "DEX" },
    { id: "1inch", name: "1inch", type: "Aggregator" },
    { id: "aave", name: "Aave", type: "Lending" },
    { id: "compound", name: "Compound", type: "Lending" },
    { id: "dydx", name: "dYdX", type: "Perpetuals" },
  ];

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    
    // Simulate AI processing
    setAgentConfig({
      name: "AI Generated Agent",
      description: "Generated from your requirements",
      strategy: "momentum",
      riskLevel: "medium",
      venues: ["uniswap", "1inch"],
    });
    
    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-background lattice-bg">
      {/* Header */}
      <header className="glass-card border-b border-border/50 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Agent Builder</span>
          </div>
          <Badge variant="outline" className="animate-glow-pulse">
            Builder AI Active
          </Badge>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Mode Selector */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2 glass-card p-1">
            <Button
              variant={buildMode === "chat" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBuildMode("chat")}
            >
              <MessageSquare className="h-4 w-4" />
              Chat Builder
            </Button>
            <Button
              variant={buildMode === "advanced" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBuildMode("advanced")}
            >
              <Code className="h-4 w-4" />
              Advanced Editor
            </Button>
          </div>
        </div>

        {buildMode === "chat" ? (
          /* Chat Builder Mode */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chat Interface */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Describe Your Trading Goal
              </h2>
              
              <div className="space-y-4 mb-6 h-64 overflow-y-auto">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="glass-card p-3 flex-1">
                    <p className="text-sm">
                      Hi! I'm your AI Agent Builder. Tell me what trading strategy you'd like to implement. 
                      For example: "Create a delta-neutral strategy that trades ETH/USDC on Uniswap with low risk"
                    </p>
                  </div>
                </div>
                
                {agentConfig.name && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <Bot className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div className="glass-card p-3 flex-1">
                      <p className="text-sm">
                        Great! I've created an agent configuration based on your input. 
                        Check the preview on the right and let me know if you'd like any adjustments.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Describe your trading strategy..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                  className="flex-1"
                />
                <Button onClick={handleChatSubmit} disabled={!chatInput.trim()}>
                  <Zap className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Live Preview */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Agent Configuration
              </h2>

              {agentConfig.name ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Agent Name</Label>
                    <p className="font-medium">{agentConfig.name}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-muted-foreground">Description</Label>
                    <p className="text-sm">{agentConfig.description}</p>
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground">Strategy</Label>
                    <Badge variant="outline" className="mt-1">
                      {strategies.find(s => s.id === agentConfig.strategy)?.name}
                    </Badge>
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground">Risk Level</Label>
                    <Badge 
                      className={`mt-1 ${
                        agentConfig.riskLevel === 'low' ? 'status-success' : 
                        agentConfig.riskLevel === 'medium' ? 'status-warning' : 'status-danger'
                      }`}
                    >
                      {agentConfig.riskLevel.toUpperCase()}
                    </Badge>
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground">Venues</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {agentConfig.venues.map(venueId => {
                        const venue = venues.find(v => v.id === venueId);
                        return (
                          <Badge key={venueId} variant="outline" className="text-xs">
                            {venue?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <Button className="w-full">
                      <Target className="h-4 w-4" />
                      Deploy Agent
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Start chatting to configure your agent</p>
                </div>
              )}
            </Card>
          </div>
        ) : (
          /* Advanced Editor Mode */
          <Card className="glass-card p-6">
            <Tabs defaultValue="identity" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="identity">Identity</TabsTrigger>
                <TabsTrigger value="strategy">Strategy</TabsTrigger>
                <TabsTrigger value="risk">Risk</TabsTrigger>
                <TabsTrigger value="execution">Execution</TabsTrigger>
                <TabsTrigger value="backtest">Backtest</TabsTrigger>
                <TabsTrigger value="deploy">Deploy</TabsTrigger>
              </TabsList>

              <TabsContent value="identity" className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Agent Name</Label>
                    <Input id="name" placeholder="My Trading Agent" />
                  </div>
                  <div>
                    <Label htmlFor="icon">Icon</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bot">🤖 Bot</SelectItem>
                        <SelectItem value="lightning">⚡ Lightning</SelectItem>
                        <SelectItem value="target">🎯 Target</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe what your agent does..."
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="strategy" className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="strategy-template">Strategy Template</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      {strategies.map(strategy => (
                        <SelectItem key={strategy.id} value={strategy.id}>
                          {strategy.name} ({strategy.risk} Risk)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="parameters">Strategy Parameters</Label>
                  <Textarea 
                    id="parameters" 
                    placeholder="Configure strategy parameters..."
                    rows={4}
                  />
                </div>
              </TabsContent>

              <TabsContent value="risk" className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="max-position">Max Position Size (%)</Label>
                    <Input id="max-position" type="number" placeholder="10" />
                  </div>
                  <div>
                    <Label htmlFor="stop-loss">Stop Loss (%)</Label>
                    <Input id="stop-loss" type="number" placeholder="5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="risk-budget">Daily Risk Budget ($)</Label>
                  <Input id="risk-budget" type="number" placeholder="1000" />
                </div>
              </TabsContent>

              <TabsContent value="execution" className="mt-6 space-y-4">
                <div>
                  <Label>Trading Venues</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {venues.map(venue => (
                      <div key={venue.id} className="flex items-center space-x-2">
                        <input type="checkbox" id={venue.id} />
                        <Label htmlFor={venue.id} className="text-sm">
                          {venue.name} ({venue.type})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="backtest" className="mt-6 space-y-4">
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Backtest results will appear here</p>
                  <Button className="mt-4">
                    Run Backtest
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="deploy" className="mt-6 space-y-4">
                <div className="text-center py-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gradient-primary animate-glow-pulse">
                      <Target className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">Ready to Deploy</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Your agent is configured and ready for deployment. 
                      Review all settings before going live.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button variant="outline">
                        Deploy to Testnet
                      </Button>
                      <Button>
                        Deploy Live
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>
    </div>
  );
}