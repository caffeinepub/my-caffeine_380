import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Cable,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Settings,
  Shield,
  Users,
  Wallet,
  Wifi,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCompanySettings } from "../hooks/useCompanySettings";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

type Page =
  | "dashboard"
  | "customers"
  | "finance"
  | "network"
  | "settings"
  | "notice";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isSuperAdmin: boolean;
  adminName: string | null;
  onLogout: () => void;
}

const navItems = [
  { id: "dashboard" as Page, label: "ড্যাশবোর্ড", icon: LayoutDashboard },
  { id: "customers" as Page, label: "গ্রাহক ব্যবস্থাপনা", icon: Users },
  { id: "finance" as Page, label: "আর্থিক ব্যবস্থাপনা", icon: Wallet },
  { id: "notice" as Page, label: "নোটিশ বোর্ড", icon: Megaphone },
  { id: "network" as Page, label: "অপটিক্যাল ফাইবার ম্যানেজমেন্ট", icon: Cable },
  { id: "settings" as Page, label: "সেটিংস", icon: Settings },
];

export default function Layout({
  children,
  currentPage,
  onNavigate,
  isSuperAdmin,
  adminName,
  onLogout,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { identity } = useInternetIdentity();
  const { settings } = useCompanySettings();

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  }, []);

  const displayName = isSuperAdmin
    ? identity
      ? `${identity.getPrincipal().toString().slice(0, 8)}...`
      : "সুপার এডমিন"
    : (adminName ?? "এডমিন");

  const roleLabel = isSuperAdmin ? "সুপার এডমিন" : "এডমিন";

  function handleNavigate(page: Page) {
    onNavigate(page);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }

  function closeBackdrop() {
    setSidebarOpen(false);
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
    >
      {sidebarOpen && (
        <button
          type="button"
          aria-label="সাইডবার বন্ধ করুন"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden cursor-default"
          onClick={closeBackdrop}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "oklch(0.149 0.035 252)" }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-5 py-5 border-b"
          style={{ borderColor: "oklch(0.22 0.04 252)" }}
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary overflow-hidden shrink-0">
            {settings.logo ? (
              <img
                src={settings.logo}
                className="w-9 h-9 rounded-lg object-contain bg-white"
                alt="লোগো"
              />
            ) : (
              <Wifi className="w-5 h-5 text-white" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">
              নওশীন ব্রডব্যান্ড
            </p>
            <p
              className="text-xs leading-tight mt-0.5"
              style={{ color: "oklch(0.65 0.02 252)" }}
            >
              Delta Software & Comm. Ltd
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                type="button"
                key={item.id}
                data-ocid={`nav.${item.id}.link`}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-white"
                }`}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom user */}
        <div
          className="px-3 py-4 border-t"
          style={{ borderColor: "oklch(0.22 0.04 252)" }}
        >
          <div
            className="flex items-center gap-3 px-3 py-2 rounded-lg"
            style={{ background: "oklch(0.20 0.038 252)" }}
          >
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-xs bg-primary text-white">
                {isSuperAdmin ? <Shield size={12} /> : "এ"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">
                {displayName}
              </p>
              <p className="text-xs" style={{ color: "oklch(0.65 0.02 252)" }}>
                {roleLabel}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 w-full">
        <header className="flex items-center gap-4 px-6 bg-white border-b border-border h-14 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="p-1"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            data-ocid="nav.menu.toggle"
          >
            <Menu size={20} />
          </Button>

          <div className="flex-1">
            <h1 className="text-base font-semibold text-foreground">
              {navItems.find((n) => n.id === currentPage)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 relative"
              data-ocid="header.notification.button"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 px-2"
                  data-ocid="header.user.dropdown"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-xs bg-primary text-white">
                      {isSuperAdmin ? <Shield size={12} /> : "এ"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-medium leading-none">
                      {displayName}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1 py-0 mt-0.5 h-4"
                    >
                      {roleLabel}
                    </Badge>
                  </div>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={onLogout}
                  data-ocid="header.logout.button"
                >
                  <LogOut size={14} className="mr-2" />
                  লগআউট
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
