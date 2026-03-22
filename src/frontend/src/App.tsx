import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import CallCenter from "./pages/CallCenter";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import DebtManagement from "./pages/DebtManagement";
import Finance from "./pages/Finance";
import IdCard from "./pages/IdCard";
import LoginPage from "./pages/LoginPage";
import Network from "./pages/Network";
import NoticePage from "./pages/NoticePage";
import Settings from "./pages/Settings";
import SocialMediaPost from "./pages/SocialMediaPost";

type Page =
  | "dashboard"
  | "customers"
  | "finance"
  | "debts"
  | "network"
  | "settings"
  | "notice"
  | "call"
  | "idcard"
  | "socialmedia";

interface AdminSession {
  type: "admin";
  email: string;
  name: string;
}

function getStoredAdminSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem("adminSession");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.type === "admin") return parsed as AdminSession;
    return null;
  } catch {
    return null;
  }
}

function AppContent() {
  const { identity, isInitializing, clear } = useInternetIdentity();
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [adminSession, setAdminSession] = useState<AdminSession | null>(
    getStoredAdminSession,
  );
  const [showLogin, setShowLogin] = useState(false);

  const isSuperAdmin = !!identity;
  const isLoggedIn = isSuperAdmin || !!adminSession;
  const isAdmin = isLoggedIn;

  // Register service worker for PWA
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      });
    }
  }, []);

  function handleAdminLogin(session: AdminSession) {
    setAdminSession(session);
    setShowLogin(false);
  }

  function handleLogout() {
    localStorage.removeItem("adminSession");
    setAdminSession(null);
  }

  if (isInitializing) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(0.149 0.035 252)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  if (showLogin && !isLoggedIn) {
    return (
      <LoginPage
        onAdminLogin={handleAdminLogin}
        onCancel={() => setShowLogin(false)}
      />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard isAdmin={isAdmin} />;
      case "customers":
        return <Customers isAdmin={isAdmin} />;
      case "finance":
        return <Finance isAdmin={isAdmin} />;
      case "debts":
        return <DebtManagement isAdmin={isAdmin} />;
      case "notice":
        return <NoticePage isAdmin={isAdmin} />;
      case "network":
        return <Network isAdmin={isAdmin} />;
      case "call":
        return <CallCenter />;
      case "idcard":
        return <IdCard isAdmin={isAdmin} />;
      case "socialmedia":
        return <SocialMediaPost isAdmin={isAdmin} />;
      case "settings":
        return <Settings isSuperAdmin={isSuperAdmin} isAdmin={isAdmin} />;
      default:
        return <Dashboard isAdmin={isAdmin} />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      isSuperAdmin={isSuperAdmin}
      isAdmin={isAdmin}
      adminName={adminSession?.name ?? null}
      onLogout={isSuperAdmin ? () => clear() : handleLogout}
      onLoginRequest={() => setShowLogin(true)}
    >
      {renderPage()}
      <footer className="mt-8 pb-2 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          caffeine.ai
        </a>
      </footer>
    </Layout>
  );
}

export default function App() {
  return (
    <>
      <AppContent />
      <Toaster richColors position="top-right" />
    </>
  );
}
