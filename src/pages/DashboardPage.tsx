import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ArrowLeftRight, Wallet, Clock, Target, TrendingUp } from "lucide-react";

interface DashboardPageProps {
  onBack: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onBack }) => {
  const collateralAssets = [
    {
      symbol: "WETH",
      icon: "💎",
      walletBalance: "0.00",
      availableCollateral: "0.00",
      liveOrdersRequirements: "-",
      positionsRequirements: "-",
      yieldInfo: "Opt In to Earn 15.7% APY* (0.00 💎 = pts per annum)",
      yieldAccrued: "-"
    },
    {
      symbol: "USDC",
      icon: "🔵",
      walletBalance: "0.00",
      availableCollateral: "0.00",
      liveOrdersRequirements: "-",
      positionsRequirements: "-",
      yieldInfo: "Opt In to Earn 380% APY* (0.00 🔵 = pts per annum)",
      yieldAccrued: "-"
    },
    {
      symbol: "ETH",
      icon: "⬧",
      walletBalance: "-",
      availableCollateral: "-",
      liveOrdersRequirements: "-",
      positionsRequirements: "-",
      yieldInfo: "",
      yieldAccrued: "-"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Navigation Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">S</span>
                </div>
                <span className="text-foreground font-semibold">STRATOS</span>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Trading</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Pricing</span>
                <span className="text-primary font-medium cursor-pointer">Dashboard</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Analytics</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Staking</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer" onClick={onBack}>AI Agents</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">Available Balance</div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-primary">🔵 USDC -</Badge>
                <Badge variant="outline" className="text-primary">💎 WETH -</Badge>
                <Badge variant="outline" className="text-primary">⬧ ETH -</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Selection Section */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-xl">⬧</span>
              <Select defaultValue="eth">
                <SelectTrigger className="w-24 border-none bg-transparent text-lg font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eth">ETH</SelectItem>
                  <SelectItem value="btc">BTC</SelectItem>
                </SelectContent>
              </Select>
              <ChevronDown className="h-4 w-4" />
            </div>
            
            <div className="flex items-center space-x-8 text-sm">
              <div>
                <div className="text-muted-foreground">Expiry Date</div>
                <div className="font-semibold">29Aug25</div>
              </div>
              <div>
                <div className="text-muted-foreground">Next Auction</div>
                <div className="font-semibold flex items-center space-x-1">
                  <span>00</span>
                  <span className="text-xs">Mins</span>
                  <span>:</span>
                  <span>04</span>
                  <span className="text-xs">Secs</span>
                </div>
                <div className="text-xs text-muted-foreground">Auction Ongoing</div>
              </div>
              <div>
                <div className="text-muted-foreground">Next Auction Forward</div>
                <div className="font-semibold">4789.4</div>
              </div>
            </div>
          </div>
        </div>

        {/* Collateral Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Collateral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assets</TableHead>
                    <TableHead>Wallet Balance</TableHead>
                    <TableHead>Available Collateral on Ithaca</TableHead>
                    <TableHead>Live Orders Collateral Requirements</TableHead>
                    <TableHead>Positions Collateral Requirements</TableHead>
                    <TableHead className="w-80">Yield*</TableHead>
                    <TableHead>Yield Accrued</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {collateralAssets.map((asset) => (
                    <TableRow key={asset.symbol}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{asset.icon}</span>
                          <span className="font-medium">{asset.symbol}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-between">
                          <span>{asset.walletBalance}</span>
                          {asset.symbol !== "ETH" && (
                            <div className="flex items-center space-x-1">
                              <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                                Swap
                              </Button>
                              <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                                {asset.symbol === "WETH" ? "⚡ to 🔵" : "🔵 to ⚡"}
                              </Button>
                            </div>
                          )}
                          {asset.symbol === "ETH" && (
                            <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                              Wrap
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{asset.availableCollateral}</TableCell>
                      <TableCell>{asset.liveOrdersRequirements}</TableCell>
                      <TableCell>{asset.positionsRequirements}</TableCell>
                      <TableCell>
                        {asset.yieldInfo && (
                          <div className="text-xs space-y-1">
                            <div className={asset.symbol === "WETH" ? "text-orange-400" : "text-blue-400"}>
                              {asset.yieldInfo}
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{asset.yieldAccrued}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 mt-6">
              <Button variant="outline" className="flex-1 bg-primary/10 border-primary text-primary hover:bg-primary/20">
                <Target className="h-4 w-4 mr-2" />
                PP Strategies
              </Button>
              <Button variant="outline" className="flex-1 bg-purple-500/10 border-purple-500 text-purple-500 hover:bg-purple-500/20">
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <Wallet className="h-4 w-4 mr-2" />
                Deposit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Orders Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center space-x-2">
                <span>Live Orders</span>
                <ChevronDown className="h-4 w-4" />
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Details</TableHead>
                    <TableHead>
                      Order Date
                      <ChevronDown className="h-3 w-3 inline ml-1" />
                    </TableHead>
                    <TableHead>
                      Currency Pair
                      <ChevronDown className="h-3 w-3 inline ml-1" />
                    </TableHead>
                    <TableHead>
                      Product
                      <ChevronDown className="h-3 w-3 inline ml-1" />
                    </TableHead>
                    <TableHead>
                      Side
                      <ChevronDown className="h-3 w-3 inline ml-1" />
                    </TableHead>
                    <TableHead>
                      Strike
                      <ChevronDown className="h-3 w-3 inline ml-1" />
                    </TableHead>
                    <TableHead>
                      Expiry Date
                      <ChevronDown className="h-3 w-3 inline ml-1" />
                    </TableHead>
                    <TableHead>
                      Collateral Amount
                      <ChevronDown className="h-3 w-3 inline ml-1" />
                    </TableHead>
                    <TableHead>
                      Order Limit
                      <ChevronDown className="h-3 w-3 inline ml-1" />
                    </TableHead>
                    <TableHead>
                      Type
                      <ChevronDown className="h-3 w-3 inline ml-1" />
                    </TableHead>
                    <TableHead>
                      Status
                      <ChevronDown className="h-3 w-3 inline ml-1" />
                    </TableHead>
                    <TableHead>
                      Fill %
                      <ChevronDown className="h-3 w-3 inline ml-1" />
                    </TableHead>
                    <TableHead>Cancel</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={13} className="text-center py-12 text-muted-foreground">
                      No results found
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;