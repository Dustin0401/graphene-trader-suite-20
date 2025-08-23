import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Shield, Zap } from "lucide-react";

interface WalletConnectProps {
  onConnect: (wallet: string) => void;
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [connecting, setConnecting] = useState<string | null>(null);

  const wallets = [
    { id: "metamask", name: "MetaMask", icon: "🦊", type: "EVM" },
    { id: "phantom", name: "Phantom", icon: "👻", type: "Solana" },
    { id: "walletconnect", name: "WalletConnect", icon: "🔗", type: "Multi-Chain" },
    { id: "coinbase", name: "Coinbase", icon: "🔵", type: "EVM" },
  ];

  const handleConnect = async (walletId: string) => {
    setConnecting(walletId);
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    onConnect(walletId);
    setConnecting(null);
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="glass-card p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4 animate-glow-pulse">
            <Wallet className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold gradient-text mb-2">
            Connect Wallet
          </h1>
          <p className="text-muted-foreground">
            Connect your wallet to access Graphene Protocol
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {wallets.map((wallet) => (
            <Button
              key={wallet.id}
              variant="outline"
              className="w-full justify-between"
              onClick={() => handleConnect(wallet.id)}
              disabled={connecting !== null}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{wallet.icon}</span>
                <span>{wallet.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {wallet.type}
              </Badge>
              {connecting === wallet.id && (
                <div className="pipeline-flow w-full h-full absolute inset-0 rounded" />
              )}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            <span>Session Keys</span>
          </div>
          <div className="flex items-center gap-1">
            <Wallet className="h-3 w-3" />
            <span>Non-Custodial</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Trading involves risk of loss. Past performance does not guarantee future results.
        </p>
      </Card>
    </div>
  );
}