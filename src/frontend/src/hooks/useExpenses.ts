import { useCallback, useEffect, useRef, useState } from "react";
import type { Expense as BackendExpense } from "../backend";
import { useActor } from "./useActor";

export interface Expense {
  id: string;
  serial: number;
  category: string;
  description: string;
  unit: string;
  rate: number;
  amount: number;
  createdAt: number;
  date: string; // YYYY-MM-DD
}

const STORAGE_KEY = "isp_expenses";
const MIGRATED_KEY = "expenses_migrated_to_backend";

function loadLocalExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalExpenses(expenses: Expense[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (_) {}
}

function toBackendExpense(e: Expense): BackendExpense {
  return {
    id: e.id,
    serial: BigInt(e.serial),
    category: e.category,
    description: e.description,
    unit: e.unit,
    rate: e.rate,
    amount: e.amount,
    createdAt: BigInt(e.createdAt),
    date: e.date,
  };
}

function fromBackendExpense(e: BackendExpense): Expense {
  return {
    id: e.id,
    serial: Number(e.serial),
    category: e.category,
    description: e.description,
    unit: e.unit,
    rate: e.rate,
    amount: e.amount,
    createdAt: Number(e.createdAt),
    date: e.date,
  };
}

export function useExpenses() {
  const { actor, isFetching } = useActor();
  const [expenses, setExpenses] = useState<Expense[]>(loadLocalExpenses);
  const [loading, setLoading] = useState(false);
  const loadedFromBackend = useRef(false);

  // Load from backend when actor is available
  useEffect(() => {
    if (!actor || isFetching || loadedFromBackend.current) return;

    setLoading(true);
    actor
      .getExpenses()
      .then(async (backendExpenses) => {
        loadedFromBackend.current = true;
        const converted = backendExpenses.map(fromBackendExpense);

        // One-time migration: if backend is empty and localStorage has data
        const alreadyMigrated = localStorage.getItem(MIGRATED_KEY);
        if (!alreadyMigrated && converted.length === 0) {
          const localExpenses = loadLocalExpenses();
          if (localExpenses.length > 0) {
            // Upload all local expenses to backend
            await Promise.all(
              localExpenses.map((e) =>
                actor.addExpense(toBackendExpense(e)).catch(() => {}),
              ),
            );
            localStorage.setItem(MIGRATED_KEY, "1");
            setExpenses(localExpenses);
            saveLocalExpenses(localExpenses);
            setLoading(false);
            return;
          }
        }

        if (!alreadyMigrated) {
          localStorage.setItem(MIGRATED_KEY, "1");
        }

        setExpenses(converted);
        saveLocalExpenses(converted);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [actor, isFetching]);

  const addExpense = useCallback(
    (data: Omit<Expense, "id" | "serial" | "createdAt">) => {
      let newExpense: Expense;
      setExpenses((prev) => {
        const maxSerial = prev.reduce((m, e) => Math.max(m, e.serial), 0);
        newExpense = {
          ...data,
          date: data.date || new Date().toISOString().split("T")[0],
          id: `exp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          serial: maxSerial + 1,
          createdAt: Date.now(),
        };
        const updated = [...prev, newExpense];
        saveLocalExpenses(updated);
        return updated;
      });

      // Persist to backend in background
      if (actor) {
        Promise.resolve().then(() => {
          actor.addExpense(toBackendExpense(newExpense!)).catch(() => {});
        });
      }
    },
    [actor],
  );

  const updateExpense = useCallback(
    (updated: Expense) => {
      setExpenses((prev) => {
        const next = prev.map((e) => (e.id === updated.id ? updated : e));
        saveLocalExpenses(next);
        return next;
      });

      if (actor) {
        actor.updateExpense(toBackendExpense(updated)).catch(() => {});
      }
    },
    [actor],
  );

  const deleteExpense = useCallback(
    (id: string) => {
      setExpenses((prev) => {
        const next = prev.filter((e) => e.id !== id);
        saveLocalExpenses(next);
        return next;
      });

      if (actor) {
        actor.deleteExpense(id).catch(() => {});
      }
    },
    [actor],
  );

  return { expenses, addExpense, updateExpense, deleteExpense, loading };
}
