import { c as createLucideIcon, r as reactExports } from "./index-Cqep3MYd.js";
import { u as useActor } from "./useActor-BPV-lS4h.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }]
];
const Banknote = createLucideIcon("banknote", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const STORAGE_KEY = "isp_expenses";
const MIGRATED_KEY = "expenses_migrated_to_backend";
function loadLocalExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveLocalExpenses(expenses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (_) {
  }
}
function toBackendExpense(e) {
  return {
    id: e.id,
    serial: BigInt(e.serial),
    category: e.category,
    description: e.description,
    unit: e.unit,
    rate: e.rate,
    amount: e.amount,
    createdAt: BigInt(e.createdAt),
    date: e.date
  };
}
function fromBackendExpense(e) {
  return {
    id: e.id,
    serial: Number(e.serial),
    category: e.category,
    description: e.description,
    unit: e.unit,
    rate: e.rate,
    amount: e.amount,
    createdAt: Number(e.createdAt),
    date: e.date
  };
}
function useExpenses() {
  const { actor, isFetching } = useActor();
  const [expenses, setExpenses] = reactExports.useState(loadLocalExpenses);
  const [loading, setLoading] = reactExports.useState(false);
  const loadedFromBackend = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!actor || isFetching || loadedFromBackend.current) return;
    setLoading(true);
    actor.getExpenses().then(async (backendExpenses) => {
      loadedFromBackend.current = true;
      const converted = backendExpenses.map(fromBackendExpense);
      const alreadyMigrated = localStorage.getItem(MIGRATED_KEY);
      if (!alreadyMigrated && converted.length === 0) {
        const localExpenses = loadLocalExpenses();
        if (localExpenses.length > 0) {
          await Promise.all(
            localExpenses.map(
              (e) => actor.addExpense(toBackendExpense(e)).catch(() => {
              })
            )
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
    }).catch(() => {
      setLoading(false);
    });
  }, [actor, isFetching]);
  const addExpense = reactExports.useCallback(
    (data) => {
      let newExpense;
      setExpenses((prev) => {
        const maxSerial = prev.reduce((m, e) => Math.max(m, e.serial), 0);
        newExpense = {
          ...data,
          date: data.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          id: `exp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          serial: maxSerial + 1,
          createdAt: Date.now()
        };
        const updated = [...prev, newExpense];
        saveLocalExpenses(updated);
        return updated;
      });
      if (actor) {
        Promise.resolve().then(() => {
          actor.addExpense(toBackendExpense(newExpense)).catch(() => {
          });
        });
      }
    },
    [actor]
  );
  const updateExpense = reactExports.useCallback(
    (updated) => {
      setExpenses((prev) => {
        const next = prev.map((e) => e.id === updated.id ? updated : e);
        saveLocalExpenses(next);
        return next;
      });
      if (actor) {
        actor.updateExpense(toBackendExpense(updated)).catch(() => {
        });
      }
    },
    [actor]
  );
  const deleteExpense = reactExports.useCallback(
    (id) => {
      setExpenses((prev) => {
        const next = prev.filter((e) => e.id !== id);
        saveLocalExpenses(next);
        return next;
      });
      if (actor) {
        actor.deleteExpense(id).catch(() => {
        });
      }
    },
    [actor]
  );
  return { expenses, addExpense, updateExpense, deleteExpense, loading };
}
export {
  Banknote as B,
  Calendar as C,
  TrendingUp as T,
  TrendingDown as a,
  useExpenses as u
};
