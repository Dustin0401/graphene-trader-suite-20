import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  Shield, 
  BarChart3, 
  DollarSign,
  Lock,
  Unlock,
  Clock,
  Info,
  Coins,
  Target,
  Activity,
  Bot,
  ChevronDown,
  ArrowLeft
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface StakingPageProps {
  onBack: () => void;
}

// Mock staking data
const stakingPools = [
  {
    id: "stratos-native",
    name: "STRATOS Native Staking",
    apy: "24.5%",
    totalStaked: "$12.4M",
    userStaked: "5,420",
    lockPeriod: "30 days",
    minStake: "100",
    maxStake: "50,000",
    isActive: true,
    riskLevel: "Low",
    description: "Stake STRATOS tokens to secure the network and earn rewards"
  },
  {
    id: "usdc-vault",
    name: "USDC Strategy Vault",
    apy: "18.7%",
    totalStaked: "$8.9M",
    userStaked: "2,150",
    lockPeriod: "14 days",
    minStake: "50",
    maxStake: "25,000",
    isActive: true,
    riskLevel: "Medium",
    description: "Automated USDC yield farming with AI-optimized strategies"
  },
  {
    id: "agent-rewards",
    name: "Agent Performance Pool",
    apy: "31.2%",
    totalStaked: "$6.2M",
    userStaked: "0",
    lockPeriod: "60 days",
    minStake: "500",
    maxStake: "100,000",
    isActive: true,
    riskLevel: "High",
    description: "Stake to earn rewards from top-performing AI agents"
  }
];

const rewardsData = [
  { time: '1', rewards: 100 },
  { time: '2', rewards: 105 },
  { time: '3', rewards: 110 },
  { time: '4', rewards: 108 },
  { time: '5', rewards: 115 },
  { time: '6', rewards: 122 },
  { time: '7', rewards: 118 },
  { time: '8', rewards: 125 },
  { time: '9', rewards: 130 },
  { time: '10', rewards: 135 }
];

export default function StakingPage({ onBack }: StakingPageProps) {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");

  const handleStake = () => {
    // Implement staking logic
    console.log("Staking", stakeAmount);
  };

  const handleUnstake = () => {
    // Implement unstaking logic
    console.log("Unstaking", stakeAmount);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBack}
                  className="mr-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-foreground font-semibold">STRATOS</span>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Trading</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => window.history.back()}>Pricing</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Dashboard</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Analytics</span>
                <span className="text-primary font-medium cursor-pointer">Staking</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">AI Agents</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-muted"></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Staking</h1>
          <p className="text-lg text-muted-foreground">Earn rewards by staking your tokens in our optimized pools</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-background border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Total Staked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$7,570</div>
              <div className="text-sm text-primary flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Pending Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$142.30</div>
              <div className="text-sm text-muted-foreground">Available to claim</div>
            </CardContent>
          </Card>

          <Card className="bg-background border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Average APY</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">21.4%</div>
              <div className="text-sm text-muted-foreground">Weighted average</div>
            </CardContent>
          </Card>

          <Card className="bg-background border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Total Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$1,254</div>
              <div className="text-sm text-muted-foreground">All-time earned</div>
            </CardContent>
          </Card>
        </div>

        {/* Staking Pools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pool Selection */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Staking Pools</h2>
            <div className="space-y-4">
              {stakingPools.map((pool) => (
                <Card 
                  key={pool.id} 
                  className={`bg-background border-border cursor-pointer transition-all hover:border-primary/50 ${
                    selectedPool === pool.id ? 'border-primary' : ''
                  }`}
                  onClick={() => setSelectedPool(pool.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{pool.name}</h3>
                        <p className="text-sm text-muted-foreground">{pool.description}</p>
                      </div>
                      <Badge 
                        variant={pool.riskLevel === "Low" ? "secondary" : 
                                pool.riskLevel === "Medium" ? "outline" : "destructive"}
                        className="ml-2"
                      >
                        {pool.riskLevel} Risk
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">APY:</span>
                        <span className="font-semibold text-primary ml-2">{pool.apy}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Lock Period:</span>
                        <span className="font-semibold text-foreground ml-2">{pool.lockPeriod}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Staked:</span>
                        <span className="font-semibold text-foreground ml-2">{pool.totalStaked}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Your Stake:</span>
                        <span className="font-semibold text-foreground ml-2">{pool.userStaked} USDC</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Staking Interface */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <Button
                variant={activeTab === "stake" ? "default" : "outline"}
                onClick={() => setActiveTab("stake")}
                className="flex items-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Stake</span>
              </Button>
              <Button
                variant={activeTab === "unstake" ? "default" : "outline"}
                onClick={() => setActiveTab("unstake")}
                className="flex items-center space-x-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unstake</span>
              </Button>
            </div>

            {selectedPool ? (
              <Card className="bg-background border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    {activeTab === "stake" ? "Stake Tokens" : "Unstake Tokens"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm text-muted-foreground">Amount</label>
                    <div className="relative mt-1">
                      <Input
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        placeholder="0.00"
                        className="pr-16 bg-background border-border text-foreground"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                        USDC
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Available: 10,250 USDC</span>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        MAX
                      </Button>
                    </div>
                  </div>

                  {/* Pool Info */}
                  {(() => {
                    const pool = stakingPools.find(p => p.id === selectedPool);
                    return pool ? (
                      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">APY</span>
                          <span className="text-sm font-semibold text-primary">{pool.apy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Lock Period</span>
                          <span className="text-sm font-semibold text-foreground">{pool.lockPeriod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Min/Max Stake</span>
                          <span className="text-sm font-semibold text-foreground">{pool.minStake} - {pool.maxStake} USDC</span>
                        </div>
                      </div>
                    ) : null;
                  })()}

                  <Button 
                    onClick={activeTab === "stake" ? handleStake : handleUnstake}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={!stakeAmount}
                  >
                    {activeTab === "stake" ? "Stake Tokens" : "Unstake Tokens"}
                  </Button>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center space-x-1">
                      <Info className="w-3 h-3" />
                      <span>Rewards are calculated and distributed daily</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Unstaking requires the full lock period to complete</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-background border-border">
                <CardContent className="p-12 text-center">
                  <Coins className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Select a Pool</h3>
                  <p className="text-muted-foreground">Choose a staking pool to begin earning rewards</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Rewards Chart */}
        <Card className="bg-background border-border mb-8">
          <CardHeader>
            <CardTitle className="text-foreground">Rewards History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rewardsData}>
                  <XAxis dataKey="time" hide />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="rewards" 
                    stroke="#BFFF00" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}