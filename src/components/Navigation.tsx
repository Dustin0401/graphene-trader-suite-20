import { Button } from "@/components/ui/button";
import { Bot, Plus } from "lucide-react";
import ProfileAvatar from "@/components/ProfileAvatar";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: "hub" | "trading" | "pricing" | "dashboard" | "analytics" | "staking" | "builder") => void;
  connectedWallet: string;
}

export default function Navigation({ currentPage, onNavigate, connectedWallet }: NavigationProps) {
  const handleCreateAgent = () => {
    onNavigate("builder");
  };

  return (
    <nav className="border-b border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-foreground font-semibold">Graphene Protocol</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span 
                className={`hover:text-foreground cursor-pointer ${
                  currentPage === "trading" ? "text-primary font-medium" : "text-muted-foreground"
                }`}
                onClick={() => onNavigate("trading")}
              >
                Trading
              </span>
              <span 
                className={`hover:text-foreground cursor-pointer ${
                  currentPage === "pricing" ? "text-primary font-medium" : "text-muted-foreground"
                }`}
                onClick={() => onNavigate("pricing")}
              >
                Pricing
              </span>
              <span 
                className={`hover:text-foreground cursor-pointer ${
                  currentPage === "dashboard" ? "text-primary font-medium" : "text-muted-foreground"
                }`}
                onClick={() => onNavigate("dashboard")}
              >
                Dashboard
              </span>
              <span 
                className={`hover:text-foreground cursor-pointer ${
                  currentPage === "analytics" ? "text-primary font-medium" : "text-muted-foreground"
                }`}
                onClick={() => onNavigate("analytics")}
              >
                Analytics
              </span>
              <span 
                className={`hover:text-foreground cursor-pointer ${
                  currentPage === "staking" ? "text-primary font-medium" : "text-muted-foreground"
                }`}
                onClick={() => onNavigate("staking")}
              >
                Staking
              </span>
              <span 
                className={`hover:text-foreground cursor-pointer ${
                  currentPage === "hub" || currentPage === "builder" ? "text-primary font-medium" : "text-muted-foreground"
                }`}
                onClick={() => onNavigate("hub")}
              >
                AI Agents
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            {(currentPage === "hub" || currentPage === "builder") && (
              <Button onClick={handleCreateAgent} className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-4 py-2">
                <Plus className="h-4 w-4 mr-2" />
                Create Agent
              </Button>
            )}
            <ProfileAvatar walletAddress={connectedWallet} />
          </div>
        </div>
      </div>
    </nav>
  );
}