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
  ArrowLeft,
  ArrowLeftRight,
  Bell,
  Cable,
  ChevronDown,
  CreditCard,
  Download,
  Info,
  LayoutDashboard,
  LogIn,
  LogOut,
  Megaphone,
  Menu,
  Moon,
  Phone,
  Settings,
  Share,
  Share2,
  Shield,
  Sun,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useCompanySettings } from "../hooks/useCompanySettings";
import { useDarkMode } from "../hooks/useDarkMode";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { usePWAInstall } from "../hooks/usePWAInstall";

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
  | "socialmedia"
  | "aboutus";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  adminName: string | null;
  onLogout: () => void;
  onLoginRequest?: () => void;
}

interface NavItem {
  id: Page;
  label: string;
  icon: React.ElementType;
  iconColor: string;
  urgency?: boolean;
  badge?: string;
  badgeVariant?: "internal" | "external";
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "ড্যাশবোর্ড",
    icon: LayoutDashboard,
    iconColor: "#3B82F6",
  },
  {
    id: "customers",
    label: "গ্রাহক ব্যবস্থাপনা",
    icon: Users,
    iconColor: "#6366F1",
  },
  {
    id: "finance",
    label: "আর্থিক ব্যবস্থাপনা",
    icon: Wallet,
    iconColor: "#22C55E",
  },
  {
    id: "debts",
    label: "দেনা-পাওনা",
    icon: ArrowLeftRight,
    iconColor: "#F97316",
    urgency: true,
  },
  {
    id: "notice",
    label: "নোটিশ বোর্ড",
    icon: Megaphone,
    iconColor: "#F59E0B",
    urgency: true,
    badge: "অভ্যন্তরীণ",
    badgeVariant: "internal",
  },
  {
    id: "network",
    label: "অপ্টিক্যাল ফাইবার",
    icon: Cable,
    iconColor: "#14B8A6",
  },
  {
    id: "call",
    label: "কল সেন্টার",
    icon: Phone,
    iconColor: "#0EA5E9",
  },
  {
    id: "idcard",
    label: "আইডি কার্ড",
    icon: CreditCard,
    iconColor: "#8B5CF6",
  },
  {
    id: "socialmedia",
    label: "সোশ্যাল মিডিয়া পোস্ট",
    icon: Share2,
    iconColor: "#EC4899",
    badge: "বাহ্যিক",
    badgeVariant: "external",
  },
  {
    id: "settings",
    label: "সেটিংস",
    icon: Settings,
    iconColor: "#9CA3AF",
  },

  {
    id: "aboutus",
    label: "আমাদের সম্পর্কে",
    icon: Info,
    iconColor: "#6366F1",
  },
];

// Bottom tab items for mobile
const mobileTabItems = [
  navItems[0], // dashboard
  navItems[1], // customers
  navItems[2], // finance
  navItems[4], // notice
  navItems[9], // settings
];

export default function Layout({
  children,
  currentPage,
  onNavigate,
  isSuperAdmin,
  isAdmin,
  adminName,
  onLogout,
  onLoginRequest,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showIOSInstall, setShowIOSInstall] = useState(false);
  const { canInstall, isIOSDevice, triggerInstall } = usePWAInstall();
  const { identity } = useInternetIdentity();
  const { settings } = useCompanySettings();
  const { isDark, toggle: toggleDark } = useDarkMode();

  const displayName = isSuperAdmin
    ? identity
      ? `${identity.getPrincipal().toString().slice(0, 8)}...`
      : "সুপার এডমিন"
    : isAdmin
      ? (adminName ?? "এডমিন")
      : "গেস্ট";

  const roleLabel = isSuperAdmin ? "সুপার এডমিন" : isAdmin ? "এডমিন" : "রিড ওনলি";

  function handleNavigate(page: Page) {
    onNavigate(page);
    setSidebarOpen(false);
  }

  function closeBackdrop() {
    setSidebarOpen(false);
  }

  const currentNavItem = navItems.find((n) => n.id === currentPage);

  return (
    <>
      <div
        className="flex h-screen overflow-hidden"
        style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
      >
        {sidebarOpen && (
          <button
            type="button"
            aria-label="সাইডবার বন্ধ করুন"
            className="fixed inset-0 z-40 bg-black/50 cursor-default"
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
              {settings.logo && (
                <img
                  src={settings.logo}
                  className="w-9 h-9 rounded-lg object-contain bg-white"
                  alt="লোগো"
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight truncate">
                {settings.resellerName || "বালিগাঁও ব্রডব্যান্ড ইন্টারনেট"}
              </p>
              <p
                className="text-xs leading-tight mt-0.5"
                style={{ color: "oklch(0.65 0.02 252)" }}
              >
                {settings.companyBrand || "স্বাধীন ওয়াইফাই"}
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  data-ocid={`nav.${item.id}.link`}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left relative ${
                    isActive
                      ? "text-white"
                      : "text-sidebar-foreground hover:bg-white/5 hover:text-white"
                  }`}
                  style={{
                    background: isActive ? `${item.iconColor}22` : undefined,
                    borderLeft: isActive
                      ? `3px solid ${item.iconColor}`
                      : "3px solid transparent",
                  }}
                >
                  {/* Icon with colored circle bg */}
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-md shrink-0"
                    style={{
                      background: isActive
                        ? `${item.iconColor}33`
                        : `${item.iconColor}1a`,
                    }}
                  >
                    <Icon size={15} style={{ color: item.iconColor }} />
                  </span>

                  <span className="flex-1 min-w-0 truncate text-sm">
                    {item.label}
                  </span>

                  {/* Urgency dot */}
                  {item.urgency && !item.badge && (
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: "#F97316" }}
                    />
                  )}

                  {/* Badge pill */}
                  {item.badge && (
                    <span
                      className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 leading-none"
                      style={{
                        background:
                          item.badgeVariant === "external"
                            ? "#EC489922"
                            : "#3B82F622",
                        color:
                          item.badgeVariant === "external"
                            ? "#EC4899"
                            : "#60A5FA",
                        border: `1px solid ${
                          item.badgeVariant === "external"
                            ? "#EC489944"
                            : "#3B82F644"
                        }`,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
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
                  {isSuperAdmin ? <Shield size={12} /> : isAdmin ? "এ" : "গ"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">
                  {displayName}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.65 0.02 252)" }}
                >
                  {roleLabel}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main area */}
        <div className="flex flex-col flex-1 min-w-0 w-full">
          <header className="flex items-center gap-4 px-6 bg-background border-b border-border h-14 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="p-1"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              data-ocid="nav.menu.toggle"
            >
              <Menu size={20} />
            </Button>

            {canInstall && (
              <button
                type="button"
                data-ocid="header.pwa.install"
                onClick={() => {
                  if (isIOSDevice) setShowIOSInstall(true);
                  else triggerInstall();
                }}
                title="অ্যাপ ইনস্টল করুন"
                className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-all border"
                style={{
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
                  borderColor: "#4F46E5",
                  color: "#fff",
                  boxShadow: "0 1px 4px #3b82f640",
                  whiteSpace: "nowrap",
                }}
              >
                <Download size={13} />
                <span className="hidden sm:inline">ইনস্টল</span>
              </button>
            )}

            {currentPage !== "dashboard" && (
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 px-2 text-sm"
                onClick={() => onNavigate("dashboard")}
                data-ocid="nav.back.button"
              >
                <ArrowLeft size={16} />
                <span>ব্যাক</span>
              </Button>
            )}

            <div className="flex items-center gap-2 flex-1 min-w-0">
              {currentNavItem && (
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-md shrink-0"
                  style={{ background: `${currentNavItem.iconColor}1a` }}
                >
                  {(() => {
                    const Icon = currentNavItem.icon;
                    return (
                      <Icon
                        size={14}
                        style={{ color: currentNavItem.iconColor }}
                      />
                    );
                  })()}
                </span>
              )}
              <h1 className="text-base font-semibold text-foreground truncate">
                {currentNavItem?.label}
              </h1>
              {currentNavItem?.badge && (
                <span
                  className="hidden sm:inline text-[10px] font-semibold px-2 py-0.5 rounded-full leading-none"
                  style={{
                    background:
                      currentNavItem.badgeVariant === "external"
                        ? "#EC489915"
                        : "#3B82F615",
                    color:
                      currentNavItem.badgeVariant === "external"
                        ? "#EC4899"
                        : "#3B82F6",
                    border: `1px solid ${
                      currentNavItem.badgeVariant === "external"
                        ? "#EC489930"
                        : "#3B82F630"
                    }`,
                  }}
                >
                  {currentNavItem.badge}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={toggleDark}
                data-ocid="header.darkmode.toggle"
                title={isDark ? "লাইট মোড" : "ডার্ক মোড"}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 relative"
                data-ocid="header.notification.button"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
              </Button>

              {isAdmin ? (
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
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onLoginRequest}
                  data-ocid="header.login.button"
                  className="gap-1.5"
                >
                  <LogIn size={14} />
                  লগইন করুন
                </Button>
              )}
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-background p-4 lg:p-6 pb-20 lg:pb-6">
            {children}
          </main>

          {/* Mobile bottom tab bar */}
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around bg-background border-t border-border h-16 shadow-lg">
            {mobileTabItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-ocid={`mobile.nav.${item.id}.tab`}
                  onClick={() => handleNavigate(item.id)}
                  className="flex flex-col items-center justify-center gap-1 flex-1 h-full px-1 transition-all"
                >
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-xl transition-all"
                    style={{
                      background: isActive
                        ? `${item.iconColor}20`
                        : "transparent",
                    }}
                  >
                    <Icon
                      size={18}
                      style={{
                        color: isActive ? item.iconColor : "#9CA3AF",
                      }}
                    />
                  </span>
                  <span
                    className="text-[9px] font-medium leading-none"
                    style={{ color: isActive ? item.iconColor : "#9CA3AF" }}
                  >
                    {item.label.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* iOS Install Instructions Modal */}
      {showIOSInstall && (
        <dialog
          open
          className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center border-0 p-0 max-w-none w-full h-full"
          style={{
            background: "rgba(0,0,0,0.6)",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          aria-label="ইনস্টল নির্দেশিকা"
        >
          <button
            type="button"
            className="absolute inset-0 w-full h-full cursor-default"
            aria-label="মডাল বন্ধ করুন"
            onClick={() => setShowIOSInstall(false)}
          />
          <div
            className="relative w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-6 space-y-4"
            style={{ background: "#1e293b", border: "1px solid #334155" }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold text-base">
                iPhone-এ ইনস্টল করুন
              </h2>
              <button
                type="button"
                onClick={() => setShowIOSInstall(false)}
                className="text-slate-400 hover:text-white text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Safari থেকে নিচের ধাপগুলো অনুসরণ করুন:
            </p>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0 mt-0.5">
                  ১
                </span>
                <span className="text-slate-200 text-sm flex items-center gap-1">
                  নিচের <Share size={14} className="inline text-blue-400" />{" "}
                  শেয়ার বাটনে ক্লিক করুন
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0 mt-0.5">
                  ২
                </span>
                <span className="text-slate-200 text-sm">
                  স্ক্রল করে{" "}
                  <strong className="text-white">"Add to Home Screen"</strong> বা{" "}
                  <strong className="text-white">"হোম স্ক্রিনে যুক্ত করুন"</strong>{" "}
                  বেছে নিন
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0 mt-0.5">
                  ৩
                </span>
                <span className="text-slate-200 text-sm">
                  <strong className="text-white">"Add"</strong> /{" "}
                  <strong className="text-white">"যুক্ত করুন"</strong> বাটনে ট্যাপ করুন
                </span>
              </li>
            </ol>
            <p className="text-slate-400 text-xs">
              ইনস্টলের পরে হোম স্ক্রিনে প্রতিষ্ঠানের লোগো আইকন হিসেবে দেখাবে।
            </p>
            <button
              type="button"
              onClick={() => setShowIOSInstall(false)}
              className="w-full py-2.5 rounded-xl font-semibold text-white text-sm"
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
              }}
            >
              বুঝেছি
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
