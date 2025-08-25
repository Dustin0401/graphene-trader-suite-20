import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  BarChart3,
  Send,
  Sparkles,
  User,
  Lightbulb,
  Rocket,
  ChevronRight,
  Copy,
  Clock,
  Activity
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  typing?: boolean;
}

interface AgentBuilderProps {
  onBack: () => void;
}

export default function AgentBuilder({ onBack }: AgentBuilderProps) {
  const [buildMode, setBuildMode] = useState<"chat" | "advanced">("chat");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "👋 Hi! I'm your AI Agent Builder. I'll help you create a powerful trading agent tailored to your strategy. Let's start with what you want to achieve.\n\nFor example:\n• \"Create a delta-neutral strategy for ETH/USDC\"\n• \"I want to trade options with moderate risk\"\n• \"Build an arbitrage bot for DEX trading\"",
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [agentConfig, setAgentConfig] = useState({
    name: "",
    description: "",
    strategy: "",
    riskLevel: "",
    venues: [] as string[],
    confidence: 0
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const strategies = [
    { id: "delta-neutral", name: "Delta-Neutral Arbitrage", risk: "Low", description: "Market neutral strategy with consistent returns" },
    { id: "momentum", name: "Momentum Trading", risk: "Medium", description: "Follows price trends and market momentum" },
    { id: "mean-reversion", name: "Mean Reversion", risk: "Medium", description: "Profits from price returning to average" },
    { id: "options-wheel", name: "Options Wheel", risk: "Low", description: "Generate income through option premiums" },
    { id: "dispersion", name: "Dispersion Trading", risk: "High", description: "Advanced volatility arbitrage strategy" },
  ];

  const venues = [
    { id: "uniswap", name: "Uniswap V3", type: "DEX", icon: "🦄" },
    { id: "1inch", name: "1inch", type: "Aggregator", icon: "🔄" },
    { id: "aave", name: "Aave", type: "Lending", icon: "👻" },
    { id: "compound", name: "Compound", type: "Lending", icon: "🏛️" },
    { id: "dydx", name: "dYdX", type: "Perpetuals", icon: "⚡" },
  ];

  const quickSuggestions = [
    "Create a low-risk options strategy",
    "Build an arbitrage bot for DEX",
    "Set up momentum trading for ETH",
    "Design a yield farming agent"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Add typing indicator
    const typingId = Date.now().toString();
    setMessages(prev => [...prev, {
      id: typingId,
      type: 'ai',
      content: '',
      timestamp: new Date(),
      typing: true
    }]);

    setTimeout(() => {
      let response = "";
      let config = { ...agentConfig };
      
      // Simple AI simulation based on keywords
      if (userMessage.toLowerCase().includes('delta') || userMessage.toLowerCase().includes('neutral')) {
        response = "Excellent choice! I'm configuring a delta-neutral strategy for you. This approach will:\n\n✅ Minimize directional risk\n✅ Generate steady returns\n✅ Work well in volatile markets\n\nI'm setting up your agent with Uniswap V3 and 1inch for optimal liquidity access.";
        config = {
          name: "Delta Shield Pro",
          description: "Advanced delta-neutral arbitrage agent with risk management",
          strategy: "delta-neutral",
          riskLevel: "low",
          venues: ["uniswap", "1inch"],
          confidence: 95
        };
      } else if (userMessage.toLowerCase().includes('option')) {
        response = "Perfect! I'll create an options trading agent for you. This strategy will:\n\n✅ Utilize options wheel mechanics\n✅ Generate premium income\n✅ Maintain controlled risk exposure\n\nSetting up with moderate risk parameters and multi-venue execution.";
        config = {
          name: "Options Wheel Master",
          description: "Sophisticated options wheel strategy with premium optimization",
          strategy: "options-wheel",
          riskLevel: "medium",
          venues: ["dydx", "aave"],
          confidence: 88
        };
      } else if (userMessage.toLowerCase().includes('arbitrage')) {
        response = "Great idea! Building an arbitrage agent that will:\n\n✅ Scan multiple DEXs for price differences\n✅ Execute lightning-fast trades\n✅ Minimize slippage and gas costs\n\nConfiguring with 1inch aggregation and Uniswap V3 for maximum efficiency.";
        config = {
          name: "Arbitrage Hunter",
          description: "High-frequency arbitrage bot with multi-DEX scanning",
          strategy: "delta-neutral",
          riskLevel: "low",
          venues: ["uniswap", "1inch"],
          confidence: 92
        };
      } else {
        response = "I understand you want to create a trading agent. Let me suggest a balanced approach:\n\n✅ Momentum-based strategy\n✅ Moderate risk level\n✅ Multi-venue execution\n\nThis configuration will give you exposure to trending markets while maintaining risk controls.";
        config = {
          name: "Smart Trader Pro",
          description: "Intelligent momentum trader with adaptive risk management",
          strategy: "momentum",
          riskLevel: "medium",
          venues: ["uniswap", "dydx"],
          confidence: 78
        };
      }

      // Remove typing indicator and add actual response
      setMessages(prev => 
        prev.filter(msg => msg.id !== typingId).concat({
          id: Date.now().toString(),
          type: 'ai',
          content: response,
          timestamp: new Date()
        })
      );

      setAgentConfig(config);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay for realism
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = chatInput;
    setChatInput("");
    
    // Simulate AI response
    setTimeout(() => simulateAIResponse(currentInput), 500);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setChatInput(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit();
    }
  };

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Enhanced Header */}
      <header className="glass-intense border-b border-border/50 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="interactive-scale">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center animate-glow-pulse">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Agent Builder
                </h1>
                <p className="text-xs text-muted-foreground">AI-Powered Strategy Creation</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="animate-glow-pulse status-success">
              <Activity className="h-3 w-3 mr-1" />
              Builder AI Active
            </Badge>
            <Badge variant="outline" className="status-info">
              <Clock className="h-3 w-3 mr-1" />
              Session: 0:42
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Mode Selector */}
        <div className="flex items-center justify-center mb-8 animate-fade-in-up">
          <div className="flex items-center gap-2 glass-intense p-1.5 rounded-xl">
            <Button
              variant={buildMode === "chat" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBuildMode("chat")}
              className={`${buildMode === "chat" ? "btn-primary" : "btn-ghost-glow"} transition-all duration-300`}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              AI Chat Builder
            </Button>
            <Button
              variant={buildMode === "advanced" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBuildMode("advanced")}
              className={`${buildMode === "advanced" ? "btn-primary" : "btn-ghost-glow"} transition-all duration-300`}
            >
              <Code className="h-4 w-4 mr-2" />
              Advanced Editor
            </Button>
          </div>
        </div>

        {buildMode === "chat" ? (
          /* Enhanced Chat Builder Mode */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enhanced Chat Interface */}
            <Card className="glass-intense p-0 overflow-hidden animate-fade-in-up">
              <div className="p-6 pb-4 border-b border-border/30">
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary animate-pulse" />
                  <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                    AI Strategy Designer
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground">
                  Describe your trading goals and I'll build the perfect agent for you
                </p>
              </div>
              
              {/* Messages Container */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.type === 'user' ? 'flex-row-reverse' : ''
                    } message-slide-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                        : 'bg-gradient-primary animate-glow-pulse'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      )}
                    </div>
                    <div className={`glass-card p-4 flex-1 max-w-[85%] ${
                      message.type === 'user' 
                        ? 'bg-primary/10 border-primary/20' 
                        : 'bg-card/80'
                    }`}>
                      {message.typing ? (
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-muted-foreground">AI is thinking...</span>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions */}
              {messages.length <= 1 && (
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Quick suggestions:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickSuggestion(suggestion)}
                        className="text-xs h-8 btn-ghost-glow interactive-scale"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Input */}
              <div className="p-4 border-t border-border/30 bg-card/30">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Describe your trading strategy..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="input-enhanced pr-12"
                      disabled={isTyping}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                    </div>
                  </div>
                  <Button 
                    onClick={handleChatSubmit} 
                    disabled={!chatInput.trim() || isTyping}
                    className="btn-primary interactive-scale"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Enhanced Live Preview */}
            <Card className="glass-intense p-6 animate-fade-in-up animate-delay-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                    Agent Preview
                  </span>
                </h2>
                {agentConfig.confidence > 0 && (
                  <Badge className="status-success animate-scale-in">
                    {agentConfig.confidence}% confidence
                  </Badge>
                )}
              </div>

              {agentConfig.name ? (
                <div className="space-y-6 animate-fade-in-up">
                  {/* Agent Header */}
                  <div className="text-center p-6 glass-card rounded-xl">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
                      <Bot className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{agentConfig.name}</h3>
                    <p className="text-sm text-muted-foreground">{agentConfig.description}</p>
                  </div>

                  {/* Configuration Details */}
                  <div className="space-y-4">
                    <div className="glass-card p-4 rounded-lg">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">Strategy</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="status-info">
                          {strategies.find(s => s.id === agentConfig.strategy)?.name}
                        </Badge>
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {strategies.find(s => s.id === agentConfig.strategy)?.description}
                        </span>
                      </div>
                    </div>

                    <div className="glass-card p-4 rounded-lg">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">Risk Profile</Label>
                      <div className="mt-2">
                        <Badge 
                          className={`${
                            agentConfig.riskLevel === 'low' ? 'status-success' : 
                            agentConfig.riskLevel === 'medium' ? 'status-warning' : 'status-danger'
                          } animate-scale-in`}
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          {agentConfig.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </div>
                    </div>

                    <div className="glass-card p-4 rounded-lg">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">Trading Venues</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {agentConfig.venues.map((venueId, index) => {
                          const venue = venues.find(v => v.id === venueId);
                          return (
                            <Badge 
                              key={venueId} 
                              variant="outline" 
                              className="text-xs interactive-scale animate-slide-in-right"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <span className="mr-1">{venue?.icon}</span>
                              {venue?.name}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full btn-primary interactive-lift">
                      <Rocket className="h-4 w-4 mr-2" />
                      Deploy Agent
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="btn-ghost-glow interactive-scale">
                        <Copy className="h-4 w-4 mr-2" />
                        Clone Config
                      </Button>
                      <Button variant="outline" className="btn-ghost-glow interactive-scale">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Backtest
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 animate-fade-in-up">
                  <div className="w-20 h-20 bg-gradient-glow rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Bot className="h-10 w-10 text-primary opacity-50" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
                    Start Building Your Agent
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Chat with our AI to describe your trading strategy, and watch your agent come to life in real-time.
                  </p>
                </div>
              )}
            </Card>
          </div>
        ) : (
          /* Enhanced Advanced Editor Mode */
          <Card className="glass-intense p-6 animate-fade-in-up">
            <Tabs defaultValue="identity" className="w-full">
              <TabsList className="grid w-full grid-cols-6 glass-card p-1">
                <TabsTrigger value="identity" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Identity</TabsTrigger>
                <TabsTrigger value="strategy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Strategy</TabsTrigger>
                <TabsTrigger value="risk" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Risk</TabsTrigger>
                <TabsTrigger value="execution" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Execution</TabsTrigger>
                <TabsTrigger value="backtest" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Backtest</TabsTrigger>
                <TabsTrigger value="deploy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Deploy</TabsTrigger>
              </TabsList>

              {/* ... keep existing tab content but enhance with new classes ... */}
              <TabsContent value="identity" className="mt-6 space-y-4 animate-fade-in-up">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Agent Name</Label>
                    <Input id="name" placeholder="My Trading Agent" className="input-enhanced" />
                  </div>
                  <div>
                    <Label htmlFor="icon">Icon</Label>
                    <Select>
                      <SelectTrigger className="input-enhanced">
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
                    className="input-enhanced"
                  />
                </div>
              </TabsContent>

              {/* Similar enhancements for other tabs... */}
              <TabsContent value="deploy" className="mt-6 space-y-4 animate-fade-in-up">
                <div className="text-center py-12">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-2xl bg-gradient-primary animate-glow-pulse">
                      <Target className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                        Ready to Deploy
                      </h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Your agent is configured and ready for deployment. 
                        Review all settings before going live.
                      </p>
                    </div>
                    <div className="flex gap-4 justify-center">
                      <Button variant="outline" className="btn-ghost-glow interactive-scale">
                        Deploy to Testnet
                      </Button>
                      <Button className="btn-primary interactive-lift">
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