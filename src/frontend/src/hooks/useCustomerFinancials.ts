import { useCallback, useEffect, useRef, useState } from "react";
import type { CustomerFinancialOverride } from "../backend";
import { useActor } from "./useActor";

const STORAGE_KEY = "isp_customer_financials";
const MIGRATED_KEY = "financials_migrated_to_backend";

function loadLocal(): CustomerFinancialOverride[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocal(data: CustomerFinancialOverride[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {}
}

export function useCustomerFinancials() {
  const { actor, isFetching } = useActor();
  const [financials, setFinancials] =
    useState<CustomerFinancialOverride[]>(loadLocal);
  const [loading, setLoading] = useState(false);
  const loadedFromBackend = useRef(false);

  useEffect(() => {
    if (!actor || isFetching || loadedFromBackend.current) return;

    setLoading(true);
    actor
      .getCustomerFinancials()
      .then(async (backendFinancials) => {
        loadedFromBackend.current = true;

        // One-time migration
        const alreadyMigrated = localStorage.getItem(MIGRATED_KEY);
        if (!alreadyMigrated && backendFinancials.length === 0) {
          const localData = loadLocal();
          if (localData.length > 0) {
            await Promise.all(
              localData.map((f) =>
                actor.updateCustomerFinancial(f).catch(() => {}),
              ),
            );
            localStorage.setItem(MIGRATED_KEY, "1");
            setFinancials(localData);
            setLoading(false);
            return;
          }
        }

        if (!alreadyMigrated) {
          localStorage.setItem(MIGRATED_KEY, "1");
        }

        setFinancials(backendFinancials);
        saveLocal(backendFinancials);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [actor, isFetching]);

  const saveFinancial = useCallback(
    (
      cidNumber: string,
      connectionFeeCash: number,
      connectionFeeDue: number,
    ) => {
      const override: CustomerFinancialOverride = {
        cidNumber,
        connectionFeeCash,
        connectionFeeDue,
      };

      setFinancials((prev) => {
        const exists = prev.findIndex((f) => f.cidNumber === cidNumber);
        const next =
          exists >= 0
            ? prev.map((f, i) => (i === exists ? override : f))
            : [...prev, override];
        saveLocal(next);
        return next;
      });

      if (actor) {
        actor.updateCustomerFinancial(override).catch(() => {});
      }
    },
    [actor],
  );

  return { financials, saveFinancial, loading };
}
