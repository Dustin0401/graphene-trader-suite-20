import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  TrendingUp, 
  Shield, 
  ArrowRight,
  Zap,
  Globe,
  Users,
  BarChart3,
  Lock,
  Wallet,
  ChevronDown,
  Play,
  CheckCircle,
  Target,
  Award,
  Clock,
  DollarSign,
  PieChart,
  Layers,
  Star,
  Sparkles,
  Building,
  Code,
  Cpu
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, AreaChart, Area } from 'recharts';
import WalletConnect from "@/components/WalletConnect";
import aiTradingHero from "@/assets/ai-trading-hero.jpg";
import blockchainNetwork from "@/assets/blockchain-network.jpg";
import tradingStrategies from "@/assets/trading-strategies.jpg";
import securityIllustration from "@/assets/security-illustration.jpg";

interface HomepageProps {
  onEnterApp: () => void;
  onWalletConnect: (wallet: string) => void;
  connectedWallet: string;
}

// Performance data for hero chart
const heroChartData = [
  { time: '1', value: 100 },
  { time: '2', value: 135 },
  { time: '3', value: 180 },
  { time: '4', value: 220 },
  { time: '5', value: 310 },
  { time: '6', value: 450 },
  { time: '7', value: 580 },
  { time: '8', value: 720 },
  { time: '9', value: 890 },
  { time: '10', value: 1200 }
];

// Stats data
const stats = [
  { label: "Total Value Locked", value: "$2.4B+", change: "+24.5%" },
  { label: "Active Traders", value: "150K+", change: "+18.2%" },
  { label: "AI Agents Deployed", value: "12,450+", change: "+31.7%" },
  { label: "Average APY", value: "847%", change: "+12.1%" }
];

// Features data
const features = [
  {
    icon: Bot,
    title: "Autonomous AI Trading",
    description: "Deploy sophisticated AI agents that trade 24/7 with institutional-grade strategies and risk management."
  },
  {
    icon: Shield,
    title: "Institutional Security",
    description: "Bank-grade security protocols with multi-signature wallets and smart contract audits by leading security firms."
  },
  {
    icon: Zap,
    title: "Lightning Fast Execution",
    description: "Sub-second trade execution with MEV protection and optimal routing across multiple DEXs and venues."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Real-time performance tracking, risk metrics, and comprehensive portfolio analytics with institutional-grade reporting."
  },
  {
    icon: Globe,
    title: "Cross-Chain Support",
    description: "Trade across multiple blockchains seamlessly with unified liquidity and cross-chain arbitrage opportunities."
  },
  {
    icon: Users,
    title: "Social Trading",
    description: "Follow top-performing traders, copy strategies, and share alpha with the community of professional traders."
  }
];

// Additional comprehensive data
const performanceData = [
  { month: 'Jan', traditional: 5, stratos: 45 },
  { month: 'Feb', traditional: 8, stratos: 67 },
  { month: 'Mar', traditional: 12, stratos: 89 },
  { month: 'Apr', traditional: 6, stratos: 134 },
  { month: 'May', traditional: 15, stratos: 178 },
  { month: 'Jun', traditional: 9, stratos: 245 },
];

const howItWorks = [
  {
    step: "01",
    title: "Connect Your Wallet",
    description: "Securely connect your Web3 wallet to access the Stratos trading platform with institutional-grade security protocols.",
    icon: Wallet
  },
  {
    step: "02", 
    title: "Choose AI Strategy",
    description: "Select from hundreds of pre-configured AI trading strategies or create custom ones tailored to your risk profile and goals.",
    icon: Target
  },
  {
    step: "03",
    title: "Deploy & Monitor",
    description: "Launch your AI agents and monitor their performance in real-time with comprehensive analytics and risk management tools.",
    icon: BarChart3
  },
  {
    step: "04",
    title: "Earn Profits",
    description: "Watch your portfolio grow as AI agents execute sophisticated trading strategies 24/7 across multiple markets and exchanges.",
    icon: TrendingUp
  }
];

const advantages = [
  {
    title: "Superior Performance",
    description: "Our AI agents consistently outperform traditional trading methods by 300-500% annually",
    stat: "847% Average APY",
    icon: Award,
    image: tradingStrategies
  },
  {
    title: "24/7 Market Coverage", 
    description: "Never miss opportunities with round-the-clock automated trading across global markets",
    stat: "100% Uptime",
    icon: Clock,
    image: aiTradingHero
  },
  {
    title: "Risk Management",
    description: "Advanced AI algorithms automatically adjust strategies based on market conditions and volatility",
    stat: "98% Accuracy",
    icon: Shield,
    image: securityIllustration
  },
  {
    title: "Multi-Chain Trading",
    description: "Access liquidity across 50+ blockchains with unified portfolio management and cross-chain arbitrage",
    stat: "50+ Chains",
    icon: Globe,
    image: blockchainNetwork
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "DeFi Portfolio Manager",
    company: "Crypto Capital",
    avatar: "SC",
    quote: "Stratos has revolutionized how we approach algorithmic trading. The AI agents have consistently delivered returns that exceed our most optimistic projections.",
    performance: "+234% ROI"
  },
  {
    name: "Marcus Rodriguez",
    role: "Quantitative Trader", 
    company: "Alpha Ventures",
    avatar: "MR",
    quote: "The sophistication of Stratos' AI strategies is unmatched. We've seen a 5x improvement in our risk-adjusted returns since deployment.",
    performance: "+567% APY"
  },
  {
    name: "Lisa Thompson",
    role: "Investment Director",
    company: "Digital Assets Fund",
    avatar: "LT", 
    quote: "What sets Stratos apart is the institutional-grade security combined with retail accessibility. It's democratizing advanced trading strategies.",
    performance: "+1,234% Returns"
  }
];

// Top agents preview
const topAgents = [
  { name: "Alpha Genesis", apy: "1,247%", performance: "+89.3%", risk: "Moderate", trades: "2,340", winRate: "89%" },
  { name: "Quantum Yield", apy: "983%", performance: "+67.2%", risk: "Conservative", trades: "1,890", winRate: "94%" },
  { name: "Sigma Protocol", apy: "1,456%", performance: "+124.8%", risk: "Aggressive", trades: "3,210", winRate: "82%" },
];

export default function Homepage({ onEnterApp, onWalletConnect, connectedWallet }: HomepageProps) {
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleWalletConnect = (wallet: string) => {
    setShowWalletModal(false);
    onWalletConnect(wallet);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">STRATOS</div>
                  <div className="text-xs text-muted-foreground">Web3 AI Trading</div>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Products</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Solutions</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Developers</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Community</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Docs</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {connectedWallet ? (
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <Wallet className="w-3 h-3 mr-1" />
                    {connectedWallet}
                  </Badge>
                  <Button onClick={onEnterApp} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Enter App
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setShowWalletModal(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  The Future of Autonomous Trading
                </Badge>
                <h1 className="text-6xl font-bold leading-tight">
                  <span className="text-foreground">Trade with</span>
                  <br />
                  <span className="text-primary">AI Precision</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                  Deploy institutional-grade AI trading agents that operate 24/7 with sophisticated strategies, 
                  advanced risk management, and unprecedented returns in the Web3 ecosystem.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
                  onClick={() => connectedWallet ? onEnterApp() : setShowWalletModal(true)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Trading
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-border hover:bg-accent px-8 py-4 text-lg"
                >
                  Watch Demo
                  <ChevronDown className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-foreground">$2.4B+</div>
                  <div className="text-muted-foreground">Total Value Locked</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">847%</div>
                  <div className="text-muted-foreground">Average APY</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-card border-border p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Portfolio Performance</h3>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      +1,200% All Time
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-primary">$1,247,892</div>
                  <div className="text-muted-foreground">from $100,000 initial</div>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={heroChartData}>
                      <XAxis dataKey="time" hide />
                      <YAxis hide />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={false}
                        strokeLinecap="round"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              {/* Floating stats */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                <div className="text-sm font-medium">Live Trading</div>
                <div className="text-xs opacity-80">12,450 Active Agents</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-accent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
                <div className="text-primary text-sm font-medium">{stat.change}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              Why Choose Stratos
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Built for Professional Traders
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the next generation of trading with AI-powered strategies, 
              institutional-grade security, and unprecedented performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border p-6 hover:bg-accent/50 transition-colors">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              Simple Process
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Launch your AI trading strategy with our streamlined onboarding process designed for both beginners and professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {step.step}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-primary/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Comparison */}
      <section className="py-20 px-6 bg-accent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                  Proven Results
                </Badge>
                <h2 className="text-4xl font-bold text-foreground">
                  Outperform Traditional Trading
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our AI algorithms consistently deliver superior returns compared to traditional trading methods, 
                  manual strategies, and even professional fund managers.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">847%</div>
                  <div className="text-muted-foreground">Stratos AI Average APY</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-muted-foreground">12%</div>
                  <div className="text-muted-foreground">Traditional Trading APY</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Risk-Adjusted Returns</span>
                  <span className="text-primary font-semibold">5.2x Better</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Win Rate</span>
                  <span className="text-primary font-semibold">89.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Maximum Drawdown</span>
                  <span className="text-primary font-semibold">-8.5%</span>
                </div>
              </div>
            </div>

            <Card className="bg-card border-border p-6">
              <CardHeader>
                <CardTitle className="text-foreground">6-Month Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <XAxis dataKey="month" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Area 
                        type="monotone" 
                        dataKey="stratos" 
                        stackId="1"
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                        name="Stratos AI"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="traditional" 
                        stackId="2"
                        stroke="hsl(var(--muted-foreground))" 
                        fill="hsl(var(--muted-foreground))"
                        fillOpacity={0.1}
                        name="Traditional"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between mt-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                    <span className="text-muted-foreground">Stratos AI (+245%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-muted-foreground mr-2"></div>
                    <span className="text-muted-foreground">Traditional (+9%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advantages with Illustrations */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              Competitive Advantages
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Why Stratos Leads the Market
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with institutional-grade infrastructure 
              to deliver unmatched trading performance and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {advantages.map((advantage, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}>
                <div className="flex-1 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <advantage.icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {advantage.stat}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{advantage.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{advantage.description}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative group perspective-1000">
                    <div className="transform-gpu transition-all duration-500 group-hover:rotate-y-6 group-hover:rotate-x-3 group-hover:scale-105 preserve-3d">
                      <img 
                        src={advantage.image} 
                        alt={advantage.title}
                        className="w-full h-64 object-cover rounded-lg shadow-2xl group-hover:shadow-primary/25 transition-all duration-500 transform-gpu"
                        style={{
                          filter: 'brightness(0.95) contrast(1.1)',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent rounded-lg"></div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-lg blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-500 -z-10"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-accent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              Success Stories
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Trusted by Professional Traders
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of traders and institutions who have transformed their trading results with Stratos AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border p-6">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-primary font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                  
                  <blockquote className="text-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {testimonial.performance}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Agents Preview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Top Performing Agents</h2>
            <p className="text-xl text-muted-foreground">
              See what our best AI agents are achieving for traders worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topAgents.map((agent, index) => (
              <Card key={index} className="bg-card border-border p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{agent.name}</h3>
                    <Badge className={`${
                      agent.risk === 'Conservative' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      agent.risk === 'Moderate' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {agent.risk}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">APY</span>
                      <span className="font-semibold text-primary">{agent.apy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Performance</span>
                      <span className="font-semibold text-primary">{agent.performance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Win Rate</span>
                      <span className="font-semibold text-primary">{agent.winRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Trades</span>
                      <span className="font-semibold text-foreground">{agent.trades}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => connectedWallet ? onEnterApp() : setShowWalletModal(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              Explore All Agents
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-foreground">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of traders already earning with AI-powered strategies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
                onClick={() => connectedWallet ? onEnterApp() : setShowWalletModal(true)}
              >
                <Wallet className="w-5 h-5 mr-2" />
                {connectedWallet ? 'Enter Trading Platform' : 'Connect Wallet & Start'}
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                No minimum deposit
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                24/7 AI trading
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                Institutional security
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-accent py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-lg font-bold text-foreground">STRATOS</div>
              </div>
              <p className="text-muted-foreground">
                The future of autonomous trading in Web3
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Platform</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="hover:text-foreground cursor-pointer transition-colors">Trading</div>
                <div className="hover:text-foreground cursor-pointer transition-colors">AI Agents</div>
                <div className="hover:text-foreground cursor-pointer transition-colors">Analytics</div>
                <div className="hover:text-foreground cursor-pointer transition-colors">Staking</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Resources</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="hover:text-foreground cursor-pointer transition-colors">Documentation</div>
                <div className="hover:text-foreground cursor-pointer transition-colors">API</div>
                <div className="hover:text-foreground cursor-pointer transition-colors">Support</div>
                <div className="hover:text-foreground cursor-pointer transition-colors">Blog</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Community</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="hover:text-foreground cursor-pointer transition-colors">Discord</div>
                <div className="hover:text-foreground cursor-pointer transition-colors">Twitter</div>
                <div className="hover:text-foreground cursor-pointer transition-colors">Telegram</div>
                <div className="hover:text-foreground cursor-pointer transition-colors">Github</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Stratos. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Wallet Connect Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative">
            <button 
              onClick={() => setShowWalletModal(false)}
              className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-accent z-10"
            >
              ✕
            </button>
            <WalletConnect onConnect={handleWalletConnect} />
          </div>
        </div>
      )}
    </div>
  );
}