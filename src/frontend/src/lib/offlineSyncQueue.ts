// Offline Sync Queue — stores pending backend operations when offline
// Operations are replayed automatically when internet is restored

export interface SyncOperation {
  id: string;
  type:
    | "addExpense"
    | "updateExpense"
    | "deleteExpense"
    | "updateConnectionFee"
    | "updateCustomerFinancial"
    | "addReceivable"
    | "updateReceivable"
    | "deleteReceivable"
    | "addPayable"
    | "updatePayable"
    | "deletePayable";
  payload: unknown;
  createdAt: number;
  retries: number;
}

const QUEUE_KEY = "naosheen_sync_queue";

export function getSyncQueue(): SyncOperation[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? (JSON.parse(raw) as SyncOperation[]) : [];
  } catch {
    return [];
  }
}

export function addToSyncQueue(
  op: Omit<SyncOperation, "id" | "createdAt" | "retries">,
): void {
  try {
    const queue = getSyncQueue();
    const newOp: SyncOperation = {
      ...op,
      id: `sync_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: Date.now(),
      retries: 0,
    };
    queue.push(newOp);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // Storage full or unavailable — silently skip
  }
}

export function removeFromSyncQueue(id: string): void {
  try {
    const queue = getSyncQueue().filter((op) => op.id !== id);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // ignore
  }
}

export function incrementRetry(id: string): void {
  try {
    const queue = getSyncQueue().map((op) =>
      op.id === id ? { ...op, retries: op.retries + 1 } : op,
    );
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // ignore
  }
}

export function clearSyncQueue(): void {
  try {
    localStorage.removeItem(QUEUE_KEY);
  } catch {
    // ignore
  }
}

export function getSyncQueueCount(): number {
  return getSyncQueue().length;
}
