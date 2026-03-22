import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { Suspense, lazy, useEffect, useState } from "react";
import Layout from "./components/Layout";
import { useInternetIdentity } from "./hooks/useInternetIdentity";

const CallCenter = lazy(() => import("./pages/CallCenter"));
const Customers = lazy(() => import("./pages/Customers"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DebtManagement = lazy(() => import("./pages/DebtManagement"));
const Finance = lazy(() => import("./pages/Finance"));
const IdCard = lazy(() => import("./pages/IdCard"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const Network = lazy(() => import("./pages/Network"));
const NoticePage = lazy(() => import("./pages/NoticePage"));
const Settings = lazy(() => import("./pages/Settings"));
const SocialMediaPost = lazy(() => import("./pages/SocialMediaPost"));

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

function PageLoader() {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-sm text-muted-foreground">লোড হচ্ছে...</p>
      </div>
    </div>
  );
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
          <div className="h-14 w-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-white text-sm font-medium">নওশীন ব্রডব্যান্ড</p>
          <Skeleton className="h-3 w-28 opacity-40" />
        </div>
      </div>
    );
  }

  if (showLogin && !isLoggedIn) {
    return (
      <Suspense fallback={<PageLoader />}>
        <LoginPage
          onAdminLogin={handleAdminLogin}
          onCancel={() => setShowLogin(false)}
        />
      </Suspense>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard isAdmin={isAdmin} onNavigate={setCurrentPage} />;
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
        return <Dashboard isAdmin={isAdmin} onNavigate={setCurrentPage} />;
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
      <Suspense fallback={<PageLoader />}>{renderPage()}</Suspense>
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
