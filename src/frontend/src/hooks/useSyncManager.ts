import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  type SyncOperation,
  getSyncQueue,
  getSyncQueueCount,
  incrementRetry,
  removeFromSyncQueue,
} from "../lib/offlineSyncQueue";

const MAX_RETRIES = 3;

export interface SyncStatus {
  isOffline: boolean;
  pendingCount: number;
  isSyncing: boolean;
  lastSyncAt: number | null;
}

export function useSyncManager(actor: unknown): SyncStatus {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [pendingCount, setPendingCount] = useState(getSyncQueueCount);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncAt, setLastSyncAt] = useState<number | null>(null);
  const syncInProgress = useRef(false);

  // Refresh pending count periodically
  const refreshCount = useCallback(() => {
    setPendingCount(getSyncQueueCount());
  }, []);

  // Process a single sync operation
  const processOperation = useCallback(
    async (op: SyncOperation): Promise<boolean> => {
      if (!actor) return false;
      const a = actor as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      try {
        switch (op.type) {
          case "addExpense":
            await a.addExpense(op.payload);
            break;
          case "updateExpense":
            await a.updateExpense(op.payload);
            break;
          case "deleteExpense":
            await a.deleteExpense(op.payload);
            break;
          case "updateConnectionFee":
            await a.updateConnectionFee(op.payload);
            break;
          case "updateCustomerFinancial":
            await a.updateCustomerFinancials(op.payload);
            break;
          default:
            // Unknown op type — discard it
            return true;
        }
        return true;
      } catch {
        return false;
      }
    },
    [actor],
  );

  // Process all queued operations
  const processSyncQueue = useCallback(async () => {
    if (syncInProgress.current || !actor || !navigator.onLine) return;

    const queue = getSyncQueue();
    if (queue.length === 0) return;

    syncInProgress.current = true;
    setIsSyncing(true);

    let successCount = 0;
    for (const op of queue) {
      if (op.retries >= MAX_RETRIES) {
        // Give up on this operation after too many retries
        removeFromSyncQueue(op.id);
        continue;
      }
      const ok = await processOperation(op);
      if (ok) {
        removeFromSyncQueue(op.id);
        successCount++;
      } else {
        incrementRetry(op.id);
      }
    }

    syncInProgress.current = false;
    setIsSyncing(false);
    setLastSyncAt(Date.now());
    refreshCount();

    if (successCount > 0) {
      toast.success(`সিনক সম্পন্ন — ${successCount}টি অপারেশন আপলোড হয়েছে`, {
        duration: 3000,
      });
    }
  }, [actor, processOperation, refreshCount]);

  // Online/offline event listeners
  useEffect(() => {
    function handleOnline() {
      setIsOffline(false);
      toast.info("ইন্টারনেট সংযোগ পুনরুদ্ধার হয়েছে", { duration: 2000 });
    }
    function handleOffline() {
      setIsOffline(true);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Auto-sync when coming back online and actor is available
  useEffect(() => {
    if (!isOffline && actor) {
      // Small delay to let the connection stabilize
      const timer = setTimeout(() => {
        processSyncQueue();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOffline, actor, processSyncQueue]);

  // Periodic refresh of pending count (in case other hooks added to queue)
  useEffect(() => {
    const interval = setInterval(refreshCount, 5000);
    return () => clearInterval(interval);
  }, [refreshCount]);

  return { isOffline, pendingCount, isSyncing, lastSyncAt };
}
