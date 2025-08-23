import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bot, ChevronLeft } from "lucide-react";
import { useState } from "react";

interface PricingPageProps {
  onBack: () => void;
}

// Mock data for options pricing
const optionsData = {
  calls: [
    { bid: 711.34, ask: 712.69, strike: 5000, last: 134.78, volume: 14336, delta: 0.8643 },
    { bid: 617.04, ask: 619.29, strike: 5100, last: 74.84, volume: 70318, delta: 0.7435 },
    { bid: 301.98, ask: 307.00, strike: 5200, last: 273.9, volume: 70318, delta: 0.5921 },
    { bid: 189.77, ask: 191.08, strike: 5300, last: 81.50, volume: 42365, delta: 0.4562 },
    { bid: 365.47, ask: 372.23, strike: 5400, last: 86.79, volume: 87472, delta: 0.3247 },
    { bid: 240.59, ask: 241.77, strike: 5500, last: 122.54, volume: 132400, delta: 0.2158 },
    { bid: 144.40, ask: 146.54, strike: 5600, last: 166.41, volume: 146723, delta: 0.1354 },
    { bid: 79.50, ask: 82.23, strike: 5700, last: 231.79, volume: 202444, delta: 0.0781 },
  ],
  puts: [
    { bid: 18.54, ask: 19.73, strike: 5000, last: 18.58, volume: 14336, delta: -0.1357 },
    { bid: 24.18, ask: 25.47, strike: 5100, last: 23.14, volume: 70318, delta: -0.2565 },
    { bid: 37.87, ask: 39.12, strike: 5200, last: 38.19, volume: 70318, delta: -0.4079 },
    { bid: 56.28, ask: 58.15, strike: 5300, last: 56.89, volume: 42365, delta: -0.5438 },
    { bid: 81.79, ask: 84.32, strike: 5400, last: 82.37, volume: 87472, delta: -0.6753 },
    { bid: 115.84, ask: 118.97, strike: 5500, last: 116.42, volume: 132400, delta: -0.7842 },
    { bid: 159.64, ask: 163.21, strike: 5600, last: 160.23, volume: 146723, delta: -0.8646 },
    { bid: 213.97, ask: 218.45, strike: 5700, last: 214.58, volume: 202444, delta: -0.9219 },
  ]
};

// Mock data for digital options
const digitalOptionsData = {
  calls: [
    { bid: 0.659, ask: 0.673, strike: 5700, last: 0.665 },
    { bid: 0.640, ask: 0.655, strike: 5600, last: 0.648 },
    { bid: 0.623, ask: 0.638, strike: 5500, last: 0.630 },
    { bid: 0.605, ask: 0.620, strike: 5400, last: 0.612 },
    { bid: 0.588, ask: 0.603, strike: 5300, last: 0.595 },
    { bid: 0.571, ask: 0.586, strike: 5200, last: 0.578 },
    { bid: 0.554, ask: 0.569, strike: 5100, last: 0.561 },
    { bid: 0.537, ask: 0.552, strike: 5000, last: 0.544 },
    { bid: 0.520, ask: 0.535, strike: 4900, last: 0.527 },
    { bid: 0.503, ask: 0.518, strike: 4800, last: 0.510 },
  ],
  puts: [
    { bid: 0.341, ask: 0.356, strike: 5700, last: 0.348 },
    { bid: 0.358, ask: 0.373, strike: 5600, last: 0.365 },
    { bid: 0.375, ask: 0.390, strike: 5500, last: 0.382 },
    { bid: 0.392, ask: 0.407, strike: 5400, last: 0.399 },
    { bid: 0.409, ask: 0.424, strike: 5300, last: 0.416 },
    { bid: 0.426, ask: 0.441, strike: 5200, last: 0.433 },
    { bid: 0.443, ask: 0.458, strike: 5100, last: 0.450 },
    { bid: 0.460, ask: 0.475, strike: 5000, last: 0.467 },
    { bid: 0.477, ask: 0.492, strike: 4900, last: 0.484 },
    { bid: 0.494, ask: 0.509, strike: 4800, last: 0.501 },
  ]
};

const forwardsData = [
  { expiry: "28Mar25", bid: 4296.0, ask: 4321.0, lastPrice: 4308.50 },
  { expiry: "25Apr25", bid: 4289.5, ask: 4315.3, lastPrice: 4302.40 },
  { expiry: "30May25", bid: 4294.7, ask: 4318.2, lastPrice: 4306.45 },
  { expiry: "27Jun25", bid: 4297.3, ask: 4322.8, lastPrice: 4310.05 },
  { expiry: "25Jul25", bid: 4301.2, ask: 4327.1, lastPrice: 4314.15 },
  { expiry: "29Aug25", bid: 4305.7, ask: 4331.9, lastPrice: 4318.80 },
  { expiry: "26Sep25", bid: 4310.4, ask: 4336.7, lastPrice: 4323.55 },
];

const PricingPage = ({ onBack }: PricingPageProps) => {
  const [selectedExpiry, setSelectedExpiry] = useState("28Mar25");

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  };

  const formatDelta = (delta: number) => {
    return (delta >= 0 ? '+' : '') + delta.toFixed(4);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground hover:text-foreground">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-foreground font-semibold">STRATOS</span>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Trading</span>
                <span className="text-primary font-medium cursor-pointer">Pricing</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Dashboard</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Analytics</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Staking</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">AI Agents</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-success border-success/25">
                ETH: $3,456.78
              </Badge>
              <Badge variant="outline" className="text-warning border-warning/25">
                Gas: 23 Gwei
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Expiry Selector */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm text-muted-foreground">Expiry:</span>
            <div className="flex space-x-2">
              {["28Mar25", "25Apr25", "30May25", "27Jun25"].map((expiry) => (
                <Button
                  key={expiry}
                  variant={selectedExpiry === expiry ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedExpiry(expiry)}
                >
                  {expiry}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Options Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Calls */}
          <Card className="pro-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-success">Calls</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Bid</TableHead>
                    <TableHead className="text-xs">Ask</TableHead>
                    <TableHead className="text-xs">Strike</TableHead>
                    <TableHead className="text-xs">Last</TableHead>
                    <TableHead className="text-xs">Volume</TableHead>
                    <TableHead className="text-xs">Delta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {optionsData.calls.map((option, index) => (
                    <TableRow key={index} className="border-border/50">
                      <TableCell className="text-sm perf-positive">{formatNumber(option.bid)}</TableCell>
                      <TableCell className="text-sm perf-negative">{formatNumber(option.ask)}</TableCell>
                      <TableCell className="text-sm font-medium">{option.strike}</TableCell>
                      <TableCell className="text-sm">{formatNumber(option.last)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{option.volume.toLocaleString()}</TableCell>
                      <TableCell className="text-sm perf-positive">{formatDelta(option.delta)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Puts */}
          <Card className="pro-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-destructive">Puts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Bid</TableHead>
                    <TableHead className="text-xs">Ask</TableHead>
                    <TableHead className="text-xs">Strike</TableHead>
                    <TableHead className="text-xs">Last</TableHead>
                    <TableHead className="text-xs">Volume</TableHead>
                    <TableHead className="text-xs">Delta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {optionsData.puts.map((option, index) => (
                    <TableRow key={index} className="border-border/50">
                      <TableCell className="text-sm perf-positive">{formatNumber(option.bid)}</TableCell>
                      <TableCell className="text-sm perf-negative">{formatNumber(option.ask)}</TableCell>
                      <TableCell className="text-sm font-medium">{option.strike}</TableCell>
                      <TableCell className="text-sm">{formatNumber(option.last)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{option.volume.toLocaleString()}</TableCell>
                      <TableCell className="text-sm perf-negative">{formatDelta(option.delta)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Digital Options Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Digital Calls */}
          <Card className="pro-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-success">Digital Options - Calls</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Bid</TableHead>
                    <TableHead className="text-xs">Ask</TableHead>
                    <TableHead className="text-xs">Strike</TableHead>
                    <TableHead className="text-xs">Last</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {digitalOptionsData.calls.map((option, index) => (
                    <TableRow key={index} className="border-border/50">
                      <TableCell className="text-sm perf-positive">{option.bid.toFixed(3)}</TableCell>
                      <TableCell className="text-sm perf-negative">{option.ask.toFixed(3)}</TableCell>
                      <TableCell className="text-sm font-medium">{option.strike}</TableCell>
                      <TableCell className="text-sm">{option.last.toFixed(3)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Digital Puts */}
          <Card className="pro-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-destructive">Digital Options - Puts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Bid</TableHead>
                    <TableHead className="text-xs">Ask</TableHead>
                    <TableHead className="text-xs">Strike</TableHead>
                    <TableHead className="text-xs">Last</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {digitalOptionsData.puts.map((option, index) => (
                    <TableRow key={index} className="border-border/50">
                      <TableCell className="text-sm perf-positive">{option.bid.toFixed(3)}</TableCell>
                      <TableCell className="text-sm perf-negative">{option.ask.toFixed(3)}</TableCell>
                      <TableCell className="text-sm font-medium">{option.strike}</TableCell>
                      <TableCell className="text-sm">{option.last.toFixed(3)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Forwards Section */}
        <Card className="pro-card">
          <CardHeader>
            <CardTitle className="text-lg">Forwards</CardTitle>
            <p className="text-sm text-muted-foreground">Next Auction</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Expiry</TableHead>
                  <TableHead className="text-xs">Bid</TableHead>
                  <TableHead className="text-xs">Ask</TableHead>
                  <TableHead className="text-xs">Last Auction Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forwardsData.map((forward, index) => (
                  <TableRow key={index} className="border-border/50">
                    <TableCell className="text-sm font-medium">{forward.expiry}</TableCell>
                    <TableCell className="text-sm perf-positive">{formatNumber(forward.bid)}</TableCell>
                    <TableCell className="text-sm perf-negative">{formatNumber(forward.ask)}</TableCell>
                    <TableCell className="text-sm">{formatNumber(forward.lastPrice)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Additional Trading Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="pro-card">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current Price</span>
                <span className="text-lg font-semibold text-success">$5,234.56</span>
              </div>
            </CardContent>
          </Card>
          <Card className="pro-card">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">24h Volume</span>
                <span className="text-lg font-semibold">2.4M</span>
              </div>
            </CardContent>
          </Card>
          <Card className="pro-card">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Open Interest</span>
                <span className="text-lg font-semibold">45,672</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;