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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-background via-background to-background/80 border-b border-border/30 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="relative px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button variant="ghost" onClick={onBack} className="hover:bg-primary/10 transition-all duration-300">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-30 animate-pulse" />
                  <div className="relative bg-gradient-to-r from-primary to-accent p-2 rounded-lg">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Agent Builder
                  </h1>
                  <p className="text-xs text-muted-foreground">Powered by Graphene AI</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="animate-pulse border-primary/30 text-primary bg-primary/5">
              <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-ping" />
              AI Assistant Active
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Mode Selector */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur" />
            <div className="relative flex items-center gap-1 bg-background/80 backdrop-blur-xl border border-border/30 rounded-xl p-2 shadow-lg">
              <Button
                variant={buildMode === "chat" ? "default" : "ghost"}
                size="lg"
                onClick={() => setBuildMode("chat")}
                className={`relative transition-all duration-300 ${
                  buildMode === "chat" 
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg" 
                    : "hover:bg-primary/10"
                }`}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Chat Builder
                {buildMode === "chat" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-md opacity-20 animate-pulse" />
                )}
              </Button>
              <Button
                variant={buildMode === "advanced" ? "default" : "ghost"}
                size="lg"
                onClick={() => setBuildMode("advanced")}
                className={`relative transition-all duration-300 ${
                  buildMode === "advanced" 
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg" 
                    : "hover:bg-primary/10"
                }`}
              >
                <Code className="h-5 w-5 mr-2" />
                Advanced Editor
                {buildMode === "advanced" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-md opacity-20 animate-pulse" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {buildMode === "chat" ? (
          /* Enhanced Chat Builder Mode */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Enhanced Chat Interface */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur opacity-30" />
              <Card className="relative bg-background/80 backdrop-blur-xl border border-border/30 p-8 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-50" />
                    <Brain className="relative h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Describe Your Trading Vision</h2>
                    <p className="text-sm text-muted-foreground">Let AI understand your strategy</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent rounded-xl" />
                  <div className="relative space-y-6 mb-8 h-80 overflow-y-auto p-4 bg-muted/5 rounded-xl border border-border/20">
                    <div className="flex items-start gap-4 animate-fade-in">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-50" />
                        <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="bg-background/80 backdrop-blur-sm border border-border/30 rounded-2xl rounded-tl-sm p-4 flex-1 shadow-sm">
                        <p className="text-sm leading-relaxed">
                          🚀 Welcome to the future of trading! I'm your AI Agent Builder. 
                          <br /><br />
                          Tell me about your trading goals and I'll create a sophisticated agent for you. 
                          <br /><br />
                          Try something like: <em>"Create a delta-neutral strategy that trades ETH/USDC on Uniswap with conservative risk management"</em>
                        </p>
                      </div>
                    </div>
                    
                    {agentConfig.name && (
                      <div className="flex items-start gap-4 animate-fade-in">
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full blur opacity-50" />
                          <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                            <Bot className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="bg-background/80 backdrop-blur-sm border border-border/30 rounded-2xl rounded-tl-sm p-4 flex-1 shadow-sm">
                          <p className="text-sm leading-relaxed">
                            ✨ Perfect! I've analyzed your requirements and created a tailored agent configuration. 
                            <br /><br />
                            Check out the preview on the right side - you can see all the details I've configured for you. 
                            Want to make any adjustments? Just let me know!
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl blur" />
                  <div className="relative flex gap-3 p-1 bg-background/50 rounded-xl border border-border/30">
                    <Input
                      placeholder="✨ Describe your ideal trading strategy..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                      className="flex-1 border-0 bg-transparent focus:ring-0 text-base placeholder:text-muted-foreground/70"
                    />
                    <Button 
                      onClick={handleChatSubmit} 
                      disabled={!chatInput.trim()}
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white transition-all duration-300 shadow-lg disabled:opacity-50"
                    >
                      <Zap className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Enhanced Live Preview */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-2xl blur opacity-30" />
              <Card className="relative bg-background/80 backdrop-blur-xl border border-border/30 p-8 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-lg blur opacity-50" />
                    <Settings className="relative h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Live Agent Preview</h2>
                    <p className="text-sm text-muted-foreground">Real-time configuration</p>
                  </div>
                </div>

                {agentConfig.name ? (
                  <div className="space-y-6">
                    <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-xl p-6 border border-border/30">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-bl-full" />
                      <div className="relative">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Agent Identity</Label>
                        <h3 className="text-2xl font-bold mt-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {agentConfig.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">{agentConfig.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-background/50 backdrop-blur-sm border border-border/30 rounded-xl p-4">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Strategy</Label>
                        <div className="mt-2">
                          <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-lg">
                            {strategies.find(s => s.id === agentConfig.strategy)?.name}
                          </Badge>
                        </div>
                      </div>

                      <div className="bg-background/50 backdrop-blur-sm border border-border/30 rounded-xl p-4">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Risk Level</Label>
                        <div className="mt-2">
                          <Badge 
                            className={`border-0 shadow-lg ${
                              agentConfig.riskLevel === 'low' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 
                              agentConfig.riskLevel === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : 
                              'bg-gradient-to-r from-red-500 to-red-600 text-white'
                            }`}
                          >
                            {agentConfig.riskLevel.toUpperCase()} RISK
                          </Badge>
                        </div>
                      </div>

                      <div className="bg-background/50 backdrop-blur-sm border border-border/30 rounded-xl p-4">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Trading Venues</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {agentConfig.venues.map(venueId => {
                            const venue = venues.find(v => v.id === venueId);
                            return (
                              <Badge key={venueId} variant="outline" className="text-xs bg-background/50 border-border/50">
                                {venue?.name}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="relative mt-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl blur" />
                      <Button className="relative w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white py-4 text-base font-semibold shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                        <Target className="h-5 w-5 mr-2" />
                        Deploy Agent to Production
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-xl" />
                      <div className="relative w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                        <Bot className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">Waiting for Configuration</h3>
                    <p className="text-sm text-muted-foreground/70">Start describing your strategy to see the magic happen</p>
                  </div>
                )}
              </Card>
            </div>
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