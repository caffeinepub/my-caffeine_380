import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import Layout from "./components/Layout";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import LoginPage from "./pages/LoginPage";
import Network from "./pages/Network";
import NoticePage from "./pages/NoticePage";
import Settings from "./pages/Settings";

type Page =
  | "dashboard"
  | "customers"
  | "finance"
  | "network"
  | "settings"
  | "notice";

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

  const isSuperAdmin = !!identity;
  const isLoggedIn = isSuperAdmin || !!adminSession;

  function handleAdminLogin(session: AdminSession) {
    setAdminSession(session);
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

  if (!isLoggedIn) {
    return <LoginPage onAdminLogin={handleAdminLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "customers":
        return <Customers />;
      case "finance":
        return <Finance />;
      case "notice":
        return <NoticePage />;
      case "network":
        return <Network />;
      case "settings":
        return <Settings isSuperAdmin={isSuperAdmin} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      isSuperAdmin={isSuperAdmin}
      adminName={adminSession?.name ?? null}
      onLogout={isSuperAdmin ? () => clear() : handleLogout}
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
