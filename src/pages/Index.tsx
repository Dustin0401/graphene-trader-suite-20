import { useState } from "react";
import WalletConnect from "@/components/WalletConnect";
import AgentBuilderHub from "@/components/AgentBuilderHub";
import AgentBuilder from "@/components/AgentBuilder";
import Homepage from "@/pages/Homepage";
import StakingPage from "@/pages/StakingPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import TradingPage from "@/pages/TradingPage";
import PricingPage from "@/pages/PricingPage";
import DashboardPage from "@/pages/DashboardPage";
import Navigation from "@/components/Navigation";

type AppState = "homepage" | "connect" | "hub" | "builder" | "staking" | "analytics" | "trading" | "pricing" | "dashboard";

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

  const handleNavigate = (page: AppState) => {
    setAppState(page);
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

  const handlePricing = () => {
    setAppState("pricing");
  };

  const handleDashboard = () => {
    setAppState("dashboard");
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
    return (
      <div>
        <Navigation 
          currentPage="builder"
          onNavigate={handleNavigate}
          connectedWallet={connectedWallet}
        />
        <AgentBuilder onBack={handleBackToHub} />
      </div>
    );
  }

  if (appState === "staking") {
    return (
      <div>
        <Navigation 
          currentPage="staking"
          onNavigate={handleNavigate}
          connectedWallet={connectedWallet}
        />
        <StakingPage />
      </div>
    );
  }

  if (appState === "analytics") {
    return (
      <div>
        <Navigation 
          currentPage="analytics"
          onNavigate={handleNavigate}
          connectedWallet={connectedWallet}
        />
        <AnalyticsPage />
      </div>
    );
  }

  if (appState === "trading") {
    return (
      <div>
        <Navigation 
          currentPage="trading"
          onNavigate={handleNavigate}
          connectedWallet={connectedWallet}
        />
        <TradingPage />
      </div>
    );
  }

  if (appState === "pricing") {
    return (
      <div>
        <Navigation 
          currentPage="pricing"
          onNavigate={handleNavigate}
          connectedWallet={connectedWallet}
        />
        <PricingPage />
      </div>
    );
  }

  if (appState === "dashboard") {
    return (
      <div>
        <Navigation 
          currentPage="dashboard"
          onNavigate={handleNavigate}
          connectedWallet={connectedWallet}
        />
        <DashboardPage />
      </div>
    );
  }

  return (
    <AgentBuilderHub 
      walletConnected={connectedWallet}
      onCreateAgent={handleCreateAgent}
      onExploreAgents={handleExploreAgents}
      onStaking={handleStaking}
      onAnalytics={handleAnalytics}
      onTrading={handleTrading}
      onPricing={handlePricing}
      onDashboard={handleDashboard}
    />
  );
};

export default Index;