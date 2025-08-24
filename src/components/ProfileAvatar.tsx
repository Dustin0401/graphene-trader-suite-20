import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, LogOut, Wallet, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import profileAvatar from "@/assets/profile-avatar.png";

interface ProfileAvatarProps {
  walletAddress: string;
  onDisconnect?: () => void;
}

export default function ProfileAvatar({ walletAddress, onDisconnect }: ProfileAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Address Copied!",
        description: "Wallet address copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed", 
        description: "Failed to copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    setIsOpen(false);
    onDisconnect?.();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected successfully",
    });
  };

  // Mock balance data - in real app this would come from props or context
  const ethBalance = "2.45";
  const grapheneBalance = "15,420.78";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-primary/20 transition-all duration-200">
          <Avatar className="w-8 h-8">
            <AvatarImage src={profileAvatar} alt="Profile" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {walletAddress ? walletAddress.slice(2, 4).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-card border-border">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={profileAvatar} alt="Profile" />
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                  {walletAddress ? walletAddress.slice(2, 4).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg text-foreground">Profile</CardTitle>
                <p className="text-sm text-muted-foreground">Wallet & Balance Information</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Wallet Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Wallet Address</label>
              <div className="flex items-center space-x-2 p-3 bg-accent rounded-lg">
                <Wallet className="w-4 h-4 text-muted-foreground" />
                <code className="text-sm text-foreground font-mono flex-1">
                  {formatAddress(walletAddress)}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyAddress}
                  className="h-8 w-8 p-0 hover:bg-accent-foreground/10"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Balances */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Token Balances</h3>
              
              {/* ETH Balance */}
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">ETH</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Ethereum</div>
                    <div className="text-xs text-muted-foreground">ETH</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">{ethBalance}</div>
                  <div className="text-xs text-muted-foreground">≈ $3,920</div>
                </div>
              </div>

              {/* Graphene Token Balance */}
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Coins className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Graphene Protocol</div>
                    <div className="text-xs text-muted-foreground">GRPH</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">{grapheneBalance}</div>
                  <div className="text-xs text-muted-foreground">≈ $8,547</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 border-border hover:bg-accent"
                onClick={copyAddress}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Address
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-destructive/20 text-destructive hover:bg-destructive/10"
                onClick={handleDisconnect}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}