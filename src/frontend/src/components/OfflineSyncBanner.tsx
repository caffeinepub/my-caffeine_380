import { CloudOff, RefreshCw, Wifi } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import type { SyncStatus } from "../hooks/useSyncManager";

interface Props {
  status: SyncStatus;
}

export default function OfflineSyncBanner({ status }: Props) {
  const { isOffline, pendingCount, isSyncing } = status;

  const show = isOffline || isSyncing || pendingCount > 0;

  let bgClass = "";
  let icon: ReactNode = null;
  let label = "";

  if (isOffline) {
    bgClass = "bg-amber-500/90 text-white";
    icon = <CloudOff className="h-3.5 w-3.5" />;
    label =
      pendingCount > 0
        ? `অফলাইন — ${pendingCount}টি পরিবর্তন অপেক্ষমাণ`
        : "অফলাইন মোড — ডেটা স্থানীয়ভাবে সংরক্ষিত হচ্ছে";
  } else if (isSyncing) {
    bgClass = "bg-blue-500/90 text-white";
    icon = <RefreshCw className="h-3.5 w-3.5 animate-spin" />;
    label = `সিনক হচ্ছে... (${pendingCount}টি অপেক্ষমাণ)`;
  } else if (pendingCount > 0) {
    bgClass = "bg-orange-500/90 text-white";
    icon = <Wifi className="h-3.5 w-3.5" />;
    label = `${pendingCount}টি পরিবর্তন সিনকের অপেক্ষায়`;
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="offline-banner"
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="fixed top-3 left-1/2 z-50 -translate-x-1/2"
          data-ocid="offline_sync.toast"
        >
          <div
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur-sm ${bgClass}`}
          >
            {icon}
            <span>{label}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
