import { useState } from "react";
import WalletConnect from "@/components/WalletConnect";
import AgentBuilderHub from "@/components/AgentBuilderHub";
import AgentBuilder from "@/components/AgentBuilder";
import Homepage from "@/pages/Homepage";
import StakingPage from "@/pages/StakingPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import TradingPage from "@/pages/TradingPage";

type AppState = "homepage" | "connect" | "hub" | "builder" | "staking" | "analytics" | "trading";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("homepage");
  const [connectedWallet, setConnectedWallet] = useState<string>("");

  const handleWalletConnect = (wallet: string) => {
    setConnectedWallet(wallet);
    setAppState("hub");
  };

  const handleEnterApp = () => {
    if (connectedWallet) {
      setAppState("hub");
    } else {
      setAppState("connect");
    }
  };

  const handleCreateAgent = () => {
    setAppState("builder");
  };

  const handleBackToHub = () => {
    setAppState("hub");
  };

  const handleExploreAgents = () => {
    // Future: Navigate to marketplace
    console.log("Navigate to marketplace");
  };

  const handleStaking = () => {
    setAppState("staking");
  };

  const handleAnalytics = () => {
    setAppState("analytics");
  };

  const handleTrading = () => {
    setAppState("trading");
  };

  if (appState === "homepage") {
    return (
      <Homepage 
        onEnterApp={handleEnterApp}
        onWalletConnect={handleWalletConnect}
        connectedWallet={connectedWallet}
      />
    );
  }

  if (appState === "connect") {
    return <WalletConnect onConnect={handleWalletConnect} />;
  }

  if (appState === "builder") {
    return <AgentBuilder onBack={handleBackToHub} />;
  }

  if (appState === "staking") {
    return <StakingPage onBack={handleBackToHub} />;
  }

  if (appState === "analytics") {
    return <AnalyticsPage onBack={handleBackToHub} />;
  }

  if (appState === "trading") {
    return <TradingPage onBack={handleBackToHub} />;
  }

  return (
    <AgentBuilderHub 
      walletConnected={connectedWallet}
      onCreateAgent={handleCreateAgent}
      onExploreAgents={handleExploreAgents}
      onStaking={handleStaking}
      onAnalytics={handleAnalytics}
      onTrading={handleTrading}
    />
  );
};

export default Index;