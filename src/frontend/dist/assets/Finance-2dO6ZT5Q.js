import { f as useActor, r as reactExports, u as useCompanySettings, j as jsxRuntimeExports, a as Button, b as ue } from "./index-C7L7qdp1.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-BpgnpOJo.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-BlX34PCv.js";
import { L as Label, I as Input } from "./label-B8CDIJxI.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-ZmBr2yJ5.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-B8J22-T_.js";
import { V as VILLAGES } from "./sampleData-C2YRZWoE.js";
import { u as useExpenses, B as Banknote, T as TrendingUp, C as Calendar, a as TrendingDown } from "./useExpenses-6BJ7STzP.js";
import { u as useLocalCustomers } from "./useLocalCustomers-BJURb7Kc.js";
import { u as usePackages } from "./useQueries-CdqPRVLK.js";
import { p as printDocument } from "./printDocument-DGKOt1W0.js";
import { F as FileDown } from "./file-down-Dt3gA0o_.js";
import { P as Pencil } from "./x-B1c2eMg0.js";
import { P as Plus, T as Trash2 } from "./trash-2-4d6TxwF7.js";
import { L as LoaderCircle } from "./loader-circle-hYr7aF8B.js";
import { E as EyeOff, a as Eye } from "./eye-DwvofNPu.js";
import "./index-DHncjycU.js";
import "./check-DyqLZl0V.js";
import "./permanentPackages-CnZQ-KNe.js";
const STORAGE_KEY = "isp_customer_financials";
const MIGRATED_KEY = "financials_migrated_to_backend";
function loadLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveLocal(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {
  }
}
function useCustomerFinancials() {
  const { actor, isFetching } = useActor();
  const [financials, setFinancials] = reactExports.useState(loadLocal);
  const [loading, setLoading] = reactExports.useState(false);
  const loadedFromBackend = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!actor || isFetching || loadedFromBackend.current) return;
    setLoading(true);
    actor.getCustomerFinancials().then(async (backendFinancials) => {
      loadedFromBackend.current = true;
      const alreadyMigrated = localStorage.getItem(MIGRATED_KEY);
      if (!alreadyMigrated && backendFinancials.length === 0) {
        const localData = loadLocal();
        if (localData.length > 0) {
          await Promise.all(
            localData.map(
              (f) => actor.updateCustomerFinancial(f).catch(() => {
              })
            )
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
    }).catch(() => {
      setLoading(false);
    });
  }, [actor, isFetching]);
  const saveFinancial = reactExports.useCallback(
    (cidNumber, connectionFeeCash, connectionFeeDue) => {
      const override = {
        cidNumber,
        connectionFeeCash,
        connectionFeeDue
      };
      setFinancials((prev) => {
        const exists = prev.findIndex((f) => f.cidNumber === cidNumber);
        const next = exists >= 0 ? prev.map((f, i) => i === exists ? override : f) : [...prev, override];
        saveLocal(next);
        return next;
      });
      if (actor) {
        actor.updateCustomerFinancial(override).catch(() => {
        });
      }
    },
    [actor]
  );
  return { financials, saveFinancial, loading };
}
function completedPeriods(connectionDate) {
  const connectedMs = Number(connectionDate / 1000000n);
  const elapsed = Date.now() - connectedMs;
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1e3;
  return Math.max(0, Math.floor(elapsed / thirtyDaysMs));
}
function formatDate(time) {
  const ms = Number(time / 1000000n);
  return new Date(ms).toLocaleDateString("bn-BD");
}
function toDateInputValue(time) {
  const ms = Number(time / 1000000n);
  return new Date(ms).toISOString().split("T")[0];
}
const DEFAULT_CATEGORIES = [
  "দিনমজুর",
  "রাউটার",
  "ONU",
  "অপটিক্যাল ফাইবার",
  "স্প্লিটার",
  "টেকনিশিয়ান বেতন"
];
const DEFAULT_UNITS = ["জন", "মিটার", "টি", "বক্স", "পিস"];
const BANGLA_MONTHS_ARRAY = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর"
];
const PRODUCT_SYNC_CATEGORIES = ["রাউটার", "ONU", "অপটিক্যাল ফাইবার", "স্প্লিটার"];
function formatBanglaMonth(dateStr) {
  const d = new Date(dateStr);
  return `${BANGLA_MONTHS_ARRAY[d.getMonth()]} ${d.getFullYear()}`;
}
const EMPTY_EXPENSE_FORM = {
  category: "",
  customCategory: "",
  description: "",
  unit: "",
  customUnit: "",
  rate: "",
  quantity: "",
  amount: "",
  date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
};
function Finance({ isAdmin = false }) {
  const { customers: allCustomers, updateCustomer } = useLocalCustomers();
  const { settings } = useCompanySettings();
  const { data: packages } = usePackages();
  const allPackages = packages ?? [];
  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    loading: expensesLoading
  } = useExpenses();
  const { financials, saveFinancial } = useCustomerFinancials();
  const { actor } = useActor();
  const financialsApplied = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (financialsApplied.current || financials.length === 0) return;
    financialsApplied.current = true;
    for (const f of financials) {
      const customer = allCustomers.find((c) => c.cidNumber === f.cidNumber);
      if (customer && (customer.connectionFeeCash !== f.connectionFeeCash || customer.connectionFeeDue !== f.connectionFeeDue)) {
        updateCustomer({
          ...customer,
          connectionFeeCash: f.connectionFeeCash,
          connectionFeeDue: f.connectionFeeDue
        });
      }
    }
  }, [financials, allCustomers, updateCustomer]);
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [editingCustomer, setEditingCustomer] = reactExports.useState(null);
  const [editForm, setEditForm] = reactExports.useState({
    username: "",
    password: "",
    phone: "",
    carnivalId: "",
    cidNumber: "",
    village: "",
    packageId: "1",
    monthlyFee: "600",
    connectionDate: "",
    connectionFeeCash: "",
    connectionFeeDue: "0",
    commissionPercent: "30"
  });
  const [saving, setSaving] = reactExports.useState(false);
  const [showFormPassword, setShowFormPassword] = reactExports.useState(false);
  const [incomeFilterMonth, setIncomeFilterMonth] = reactExports.useState("");
  const [incomeFilterYear, setIncomeFilterYear] = reactExports.useState("");
  const [expenseFilterMonth, setExpenseFilterMonth] = reactExports.useState("");
  const [expenseFilterYear, setExpenseFilterYear] = reactExports.useState("");
  const [combinedFilterMonth, setCombinedFilterMonth] = reactExports.useState("");
  const [combinedFilterYear, setCombinedFilterYear] = reactExports.useState("");
  const [expenseForm, setExpenseForm] = reactExports.useState(EMPTY_EXPENSE_FORM);
  const [expenseSubmitting, setExpenseSubmitting] = reactExports.useState(false);
  const [editExpenseOpen, setEditExpenseOpen] = reactExports.useState(false);
  const [editingExpense, setEditingExpense] = reactExports.useState(null);
  const [editExpenseForm, setEditExpenseForm] = reactExports.useState(EMPTY_EXPENSE_FORM);
  const totalConnectionFeeCash = allCustomers.reduce(
    (sum, c) => sum + c.connectionFeeCash,
    0
  );
  const totalConnectionFeeDue = allCustomers.reduce(
    (sum, c) => sum + c.connectionFeeDue,
    0
  );
  const expectedMonthly = allCustomers.reduce(
    (sum, c) => sum + c.monthlyFee,
    0
  );
  allCustomers.reduce((sum, c) => {
    const periods = completedPeriods(c.connectionDate);
    return sum + c.monthlyFee * periods;
  }, 0);
  const totalCommission = allCustomers.reduce((sum, c) => {
    const periods = completedPeriods(c.connectionDate);
    return sum + periods * Math.round(c.monthlyFee * (c.commissionPercent ?? 30) / 100);
  }, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  function openEdit(c) {
    setEditingCustomer(c);
    setEditForm({
      username: c.username,
      password: c.password,
      phone: c.phone,
      carnivalId: c.carnivalId,
      cidNumber: c.cidNumber,
      village: c.village,
      packageId: c.packageId.toString(),
      monthlyFee: c.monthlyFee.toString(),
      connectionDate: toDateInputValue(c.connectionDate),
      connectionFeeCash: c.connectionFeeCash === 0 ? "" : c.connectionFeeCash.toString(),
      connectionFeeDue: c.connectionFeeDue.toString(),
      commissionPercent: (c.commissionPercent ?? 30).toString()
    });
    setShowFormPassword(false);
    setEditOpen(true);
  }
  async function handleEditSave() {
    if (!editingCustomer) return;
    setSaving(true);
    updateCustomer({
      ...editingCustomer,
      username: editForm.username,
      name: editForm.username,
      password: editForm.password,
      phone: editForm.phone,
      carnivalId: editForm.carnivalId,
      cidNumber: editForm.cidNumber,
      village: editForm.village,
      area: editForm.village,
      address: editForm.village,
      packageId: BigInt(editForm.packageId || "1"),
      monthlyFee: Number.parseInt(editForm.monthlyFee) || 600,
      connectionDate: BigInt(new Date(editForm.connectionDate).getTime()) * 1000000n,
      connectionFeeCash: Number.parseInt(editForm.connectionFeeCash) || 0,
      connectionFeeDue: Number.parseInt(editForm.connectionFeeDue) || 0,
      commissionPercent: Number.parseInt(editForm.commissionPercent) || 30
    });
    const cashFee = Number.parseInt(editForm.connectionFeeCash) || 0;
    const dueFee = Number.parseInt(editForm.connectionFeeDue) || 0;
    if (editForm.cidNumber) {
      saveFinancial(editForm.cidNumber, cashFee, dueFee);
    }
    if (actor && editForm.cidNumber) {
      try {
        const allDues = await actor.getConnectionFeeDues();
        const existing = allDues.find(
          (d) => d.cidNumber === editForm.cidNumber
        );
        if (dueFee > 0) {
          const record = {
            id: (existing == null ? void 0 : existing.id) ?? crypto.randomUUID(),
            serial: (existing == null ? void 0 : existing.serial) ?? BigInt(allDues.length + 1),
            cidNumber: editForm.cidNumber,
            userName: editForm.username || editingCustomer.username || "",
            mobile: editForm.phone || editingCustomer.phone || "",
            address: editForm.village || editingCustomer.village || "",
            dueMonth: (existing == null ? void 0 : existing.dueMonth) ?? getCurrentBanglaMonth(),
            dueAmount: dueFee,
            createdAt: (existing == null ? void 0 : existing.createdAt) ?? BigInt(Date.now())
          };
          if (existing) {
            await actor.updateConnectionFeeDue(record);
          } else {
            await actor.addConnectionFeeDue(record);
          }
        } else if (dueFee === 0 && existing) {
          await actor.deleteConnectionFeeDue(existing.id);
        }
      } catch {
      }
    }
    setSaving(false);
    setEditOpen(false);
    ue.success("গ্রাহকের তথ্য আপডেট করা হয়েছে");
  }
  function getCurrentBanglaMonth() {
    const now = /* @__PURE__ */ new Date();
    const banglaMonths = [
      "জানুয়ারি",
      "ফেব্রুয়ারি",
      "মার্চ",
      "এপ্রিল",
      "মে",
      "জুন",
      "জুলাই",
      "আগস্ট",
      "সেপ্টেম্বর",
      "অক্টোবর",
      "নভেম্বর",
      "ডিসেম্বর"
    ];
    return `${banglaMonths[now.getMonth()]} ${now.getFullYear()}`;
  }
  function resolveCategory(form) {
    return form.category === "__custom__" ? form.customCategory.trim() : form.category;
  }
  function resolveUnit(form) {
    return form.unit === "__custom__" ? form.customUnit.trim() : form.unit;
  }
  function recalcAmount(rate, qty) {
    const r = Number.parseFloat(rate) || 0;
    const q = Number.parseFloat(qty) || 0;
    return r && q ? (r * q).toString() : "";
  }
  function handleExpenseFormChange(field, value, form, setForm) {
    const updated = { ...form, [field]: value };
    if (field === "rate" || field === "quantity") {
      const newRate = field === "rate" ? value : form.rate;
      const newQty = field === "quantity" ? value : form.quantity;
      updated.amount = recalcAmount(newRate, newQty);
    }
    setForm(updated);
  }
  async function handleAddExpense() {
    const category = resolveCategory(expenseForm);
    const unit = resolveUnit(expenseForm);
    if (!category) {
      ue.error("ব্যয়ের খাত নির্বাচন করুন");
      return;
    }
    if (!expenseForm.amount) {
      ue.error("দাম (Amount) লিখুন");
      return;
    }
    setExpenseSubmitting(true);
    const expDesc = expenseForm.description;
    const expAmt = Number.parseFloat(expenseForm.amount) || 0;
    const expRate = Number.parseFloat(expenseForm.rate) || 0;
    const expDate = expenseForm.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    addExpense({
      category,
      description: expDesc,
      unit,
      rate: expRate,
      amount: expAmt,
      date: expDate
    });
    if (actor) {
      const banglaMonth = formatBanglaMonth(expDate);
      if (category === "টেকনিশিয়ান বেতন") {
        try {
          const dues = await actor.getTechnicianSalaryDues();
          const monthName = banglaMonth.split(" ")[0];
          const existing = dues.find(
            (d) => d.technicianName === expDesc && d.dueMonth.includes(monthName)
          );
          if (!existing) {
            await actor.addTechnicianSalaryDue({
              id: crypto.randomUUID(),
              serial: BigInt(dues.length + 1),
              technicianName: expDesc,
              dueMonth: banglaMonth,
              dueAmount: expAmt,
              totalDue: expAmt,
              createdAt: BigInt(Date.now())
            });
          } else {
            await actor.updateTechnicianSalaryDue({
              ...existing,
              dueAmount: expAmt,
              totalDue: expAmt
            });
          }
        } catch {
        }
      } else if (PRODUCT_SYNC_CATEGORIES.includes(category)) {
        try {
          const dues = await actor.getWholesalerDues();
          const productName = category + (expDesc ? ` - ${expDesc}` : "");
          const existing = dues.find(
            (d) => d.productName === productName && d.date === expDate
          );
          const record = {
            id: (existing == null ? void 0 : existing.id) ?? crypto.randomUUID(),
            serial: (existing == null ? void 0 : existing.serial) ?? BigInt(dues.length + 1),
            wholesalerName: expDesc || category,
            mobile: "",
            address: "",
            productName,
            quantity: 1,
            rate: expRate || expAmt,
            amount: expAmt,
            totalAmount: expAmt,
            paidBill: 0,
            dueBill: expAmt,
            date: expDate,
            createdAt: (existing == null ? void 0 : existing.createdAt) ?? BigInt(Date.now())
          };
          if (existing) {
            await actor.updateWholesalerDue(record);
          } else {
            await actor.addWholesalerDue(record);
          }
        } catch {
        }
      }
    }
    setExpenseForm(EMPTY_EXPENSE_FORM);
    setExpenseSubmitting(false);
    ue.success("ব্যয় যুক্ত করা হয়েছে");
  }
  function openEditExpense(e) {
    setEditingExpense(e);
    const isCustomCat = !DEFAULT_CATEGORIES.includes(e.category);
    const isCustomUnit = !DEFAULT_UNITS.includes(e.unit);
    setEditExpenseForm({
      category: isCustomCat ? "__custom__" : e.category,
      customCategory: isCustomCat ? e.category : "",
      description: e.description,
      unit: isCustomUnit ? "__custom__" : e.unit,
      customUnit: isCustomUnit ? e.unit : "",
      rate: e.rate.toString(),
      quantity: "",
      amount: e.amount.toString(),
      date: e.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    setEditExpenseOpen(true);
  }
  async function handleEditExpenseSave() {
    if (!editingExpense) return;
    const category = resolveCategory(editExpenseForm);
    const unit = resolveUnit(editExpenseForm);
    if (!category) {
      ue.error("ব্যয়ের খাত নির্বাচন করুন");
      return;
    }
    const expDesc = editExpenseForm.description;
    const expAmt = Number.parseFloat(editExpenseForm.amount) || 0;
    const expRate = Number.parseFloat(editExpenseForm.rate) || 0;
    const expDate = editExpenseForm.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    updateExpense({
      ...editingExpense,
      category,
      description: expDesc,
      unit,
      rate: expRate,
      amount: expAmt,
      date: expDate
    });
    if (actor) {
      const banglaMonth = formatBanglaMonth(expDate);
      if (category === "টেকনিশিয়ান বেতন") {
        try {
          const dues = await actor.getTechnicianSalaryDues();
          const monthName = banglaMonth.split(" ")[0];
          const existing = dues.find(
            (d) => d.technicianName === expDesc && d.dueMonth.includes(monthName)
          );
          if (!existing) {
            await actor.addTechnicianSalaryDue({
              id: crypto.randomUUID(),
              serial: BigInt(dues.length + 1),
              technicianName: expDesc,
              dueMonth: banglaMonth,
              dueAmount: expAmt,
              totalDue: expAmt,
              createdAt: BigInt(Date.now())
            });
          } else {
            await actor.updateTechnicianSalaryDue({
              ...existing,
              dueAmount: expAmt,
              totalDue: expAmt
            });
          }
        } catch {
        }
      } else if (PRODUCT_SYNC_CATEGORIES.includes(category)) {
        try {
          const dues = await actor.getWholesalerDues();
          const productName = category + (expDesc ? ` - ${expDesc}` : "");
          const existing = dues.find(
            (d) => d.productName === productName && d.date === expDate
          );
          const record = {
            id: (existing == null ? void 0 : existing.id) ?? crypto.randomUUID(),
            serial: (existing == null ? void 0 : existing.serial) ?? BigInt(dues.length + 1),
            wholesalerName: expDesc || category,
            mobile: "",
            address: "",
            productName,
            quantity: 1,
            rate: expRate || expAmt,
            amount: expAmt,
            totalAmount: expAmt,
            paidBill: 0,
            dueBill: expAmt,
            date: expDate,
            createdAt: (existing == null ? void 0 : existing.createdAt) ?? BigInt(Date.now())
          };
          if (existing) {
            await actor.updateWholesalerDue(record);
          } else {
            await actor.addWholesalerDue(record);
          }
        } catch {
        }
      }
    }
    setEditExpenseOpen(false);
    ue.success("ব্যয় আপডেট করা হয়েছে");
  }
  const MONTH_NAMES = {
    "1": "জানুয়ারি",
    "2": "ফেব্রুয়ারি",
    "3": "মার্চ",
    "4": "এপ্রিল",
    "5": "মে",
    "6": "জুন",
    "7": "জুলাই",
    "8": "আগস্ট",
    "9": "সেপ্টেম্বর",
    "10": "অক্টোবর",
    "11": "নভেম্বর",
    "12": "ডিসেম্বর"
  };
  function buildPdfTitle(base, month, year) {
    if (!month && !year) return `${base} - সব মাসের রিপোর্ট`;
    const mLabel = month ? MONTH_NAMES[month] : "";
    const yLabel = year || "";
    return `${base} - ${mLabel} ${yLabel}`.trim();
  }
  function handleExportFinancePDF(month, year) {
    const m = incomeFilterMonth;
    const y = incomeFilterYear;
    const filtered = allCustomers.filter((c) => {
      if (!m && !y) return true;
      const d = new Date(Number(c.connectionDate / 1000000n));
      if (m && (d.getMonth() + 1).toString() !== m) return false;
      if (y && d.getFullYear().toString() !== y) return false;
      return true;
    });
    const filtTotalFee = filtered.reduce((s, c) => s + c.connectionFeeCash, 0);
    const filtTotalDue = filtered.reduce((s, c) => s + c.connectionFeeDue, 0);
    const filtMonthly = filtered.reduce((s, c) => s + c.monthlyFee, 0);
    const filtCommission = filtered.reduce((s, c) => {
      const periods = completedPeriods(c.connectionDate);
      return s + periods * Math.round(c.monthlyFee * (c.commissionPercent ?? 30) / 100);
    }, 0);
    const rows = filtered.map((c, i) => {
      const periods = completedPeriods(c.connectionDate);
      const commission = periods * Math.round(c.monthlyFee * (c.commissionPercent ?? 30) / 100);
      return `<tr>
        <td>${i + 1}</td>
        <td>${c.username}</td>
        <td>${new Date(Number(c.connectionDate / 1000000n)).toLocaleDateString("bn-BD")}</td>
        <td>${c.connectionFeeCash > 0 ? `৳${c.connectionFeeCash.toLocaleString()}` : "—"}</td>
        <td>${c.connectionFeeDue > 0 ? `৳${c.connectionFeeDue.toLocaleString()}` : "০"}</td>
        <td>${c.monthlyFee} টাকা/মাস</td>
        <td>৳${c.monthlyFee.toLocaleString()}</td>
        <td>${periods > 0 ? `৳${commission.toLocaleString()} (${c.commissionPercent ?? 30}% × ${periods} মাস)` : "—"}</td>
      </tr>`;
    }).join("");
    const bodyHTML = `<table>
      <thead><tr>
        <th>ক্রমিক</th>
        <th>ইউজার নেম/আইডি</th>
        <th>সংযোগের তারিখ</th>
        <th>সংযোগ ফি নগদ</th>
        <th>সংযোগ ফি বকেয়া</th>
        <th>প্যাকেজ</th>
        <th>মাসিক বিল</th>
        <th>কমিশন</th>
      </tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr>
        <td colspan="3">মোট (${filtered.length} জন)</td>
        <td>৳${filtTotalFee.toLocaleString()}</td>
        <td>৳${filtTotalDue.toLocaleString()}</td>
        <td></td>
        <td>৳${filtMonthly.toLocaleString()}</td>
        <td>৳${filtCommission.toLocaleString()}</td>
      </tr></tfoot>
    </table>`;
    printDocument(
      buildPdfTitle("গ্রাহক আর্থিক তথ্য রিপোর্ট", m, y),
      bodyHTML,
      settings
    );
  }
  function handleExportExpensePDF(month, year) {
    const m = expenseFilterMonth;
    const y = expenseFilterYear;
    const filtered = expenses.filter((e) => {
      if (!m && !y) return true;
      if (!e.date) return !m && !y;
      const d = new Date(e.date);
      if (m && (d.getMonth() + 1).toString() !== m) return false;
      if (y && d.getFullYear().toString() !== y) return false;
      return true;
    });
    const filtTotal = filtered.reduce((s, e) => s + e.amount, 0);
    const rows = filtered.map(
      (e, i) => `<tr>
        <td>${i + 1}</td>
        <td>${e.date ? new Date(e.date).toLocaleDateString("bn-BD") : "—"}</td>
        <td>${e.category}</td>
        <td>${e.description || "—"}</td>
        <td>${e.unit || "—"}</td>
        <td>${e.rate > 0 ? `৳${e.rate.toLocaleString()}` : "—"}</td>
        <td>৳${e.amount.toLocaleString()}</td>
      </tr>`
    ).join("");
    const bodyHTML = `<table>
      <thead><tr>
        <th>ক্রমিক</th>
        <th>তারিখ</th>
        <th>খাত</th>
        <th>বর্ণনা</th>
        <th>একক</th>
        <th>দর</th>
        <th>দাম</th>
      </tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr>
        <td colspan="6">মোট ব্যয় (${filtered.length} টি এন্ট্রি)</td>
        <td>৳${filtTotal.toLocaleString()}</td>
      </tr></tfoot>
    </table>`;
    printDocument(buildPdfTitle("ব্যয়ের রিপোর্ট", m, y), bodyHTML, settings);
  }
  function handleExportCombinedPDF() {
    const m = combinedFilterMonth;
    const y = combinedFilterYear;
    const filteredCustomers = allCustomers.filter((c) => {
      if (!m && !y) return true;
      const d = new Date(Number(c.connectionDate / 1000000n));
      if (m && (d.getMonth() + 1).toString() !== m) return false;
      if (y && d.getFullYear().toString() !== y) return false;
      return true;
    });
    const filteredExpenses = expenses.filter((e) => {
      if (!m && !y) return true;
      if (!e.date) return !m && !y;
      const d = new Date(e.date);
      if (m && (d.getMonth() + 1).toString() !== m) return false;
      if (y && d.getFullYear().toString() !== y) return false;
      return true;
    });
    const incomeSubtotalFee = filteredCustomers.reduce(
      (s, c) => s + c.connectionFeeCash,
      0
    );
    const incomeSubtotalComm = filteredCustomers.reduce((s, c) => {
      const periods = completedPeriods(c.connectionDate);
      return s + periods * Math.round(c.monthlyFee * (c.commissionPercent ?? 30) / 100);
    }, 0);
    const incomeTotal = incomeSubtotalFee + incomeSubtotalComm;
    const expenseTotal = filteredExpenses.reduce((s, e) => s + e.amount, 0);
    const netIncome = incomeTotal - expenseTotal;
    const incomeRows = filteredCustomers.map((c, i) => {
      const periods = completedPeriods(c.connectionDate);
      const commission = periods * Math.round(c.monthlyFee * (c.commissionPercent ?? 30) / 100);
      return `<tr>
        <td>${i + 1}</td>
        <td>${c.username}</td>
        <td>${new Date(Number(c.connectionDate / 1000000n)).toLocaleDateString("bn-BD")}</td>
        <td>${c.monthlyFee} টাকা</td>
        <td>${periods} মাস</td>
        <td>${c.connectionFeeCash > 0 ? `৳${c.connectionFeeCash.toLocaleString()}` : "—"}</td>
        <td>${periods > 0 ? `৳${commission.toLocaleString()}` : "—"}</td>
      </tr>`;
    }).join("");
    const expenseRows = filteredExpenses.map(
      (e, i) => `<tr>
        <td>${i + 1}</td>
        <td>${e.date ? new Date(e.date).toLocaleDateString("bn-BD") : "—"}</td>
        <td>${e.category}</td>
        <td>${e.description || "—"}</td>
        <td>${e.unit || "—"}</td>
        <td>${e.rate > 0 ? `৳${e.rate.toLocaleString()}` : "—"}</td>
        <td>৳${e.amount.toLocaleString()}</td>
      </tr>`
    ).join("");
    const bodyHTML = `
      <h3 style="color:#0f766e;margin:20px 0 8px;font-size:15px;border-bottom:2px solid #0f766e;padding-bottom:4px;">আয়ের বিবরণ</h3>
      <table>
        <thead><tr>
          <th>ক্রমিক</th>
          <th>ইউজার নেম/আইডি</th>
          <th>সংযোগের তারিখ</th>
          <th>মাসিক বিল</th>
          <th>সম্পূর্ণ মাস</th>
          <th>সংযোগ ফি নগদ</th>
          <th>কমিশন</th>
        </tr></thead>
        <tbody>${incomeRows}</tbody>
        <tfoot><tr>
          <td colspan="5">আয়ের উপমোট (${filteredCustomers.length} জন)</td>
          <td>৳${incomeSubtotalFee.toLocaleString()}</td>
          <td>৳${incomeSubtotalComm.toLocaleString()}</td>
        </tr></tfoot>
      </table>

      <h3 style="color:#dc2626;margin:24px 0 8px;font-size:15px;border-bottom:2px solid #dc2626;padding-bottom:4px;">ব্যয়ের বিবরণ</h3>
      <table>
        <thead><tr>
          <th>ক্রমিক</th>
          <th>তারিখ</th>
          <th>খাত</th>
          <th>বর্ণনা</th>
          <th>একক</th>
          <th>দর</th>
          <th>দাম</th>
        </tr></thead>
        <tbody>${expenseRows}</tbody>
        <tfoot><tr>
          <td colspan="6">ব্যয়ের উপমোট (${filteredExpenses.length} টি)</td>
          <td>৳${expenseTotal.toLocaleString()}</td>
        </tr></tfoot>
      </table>

      <table style="margin-top:24px;border:2px solid #334155;">
        <thead><tr style="background:#1e293b;color:#fff;">
          <th>মোট আয়</th>
          <th>মোট ব্যয়</th>
          <th>নিট আয়</th>
        </tr></thead>
        <tbody><tr>
          <td style="color:#0f766e;font-weight:bold;">৳${incomeTotal.toLocaleString()}</td>
          <td style="color:#dc2626;font-weight:bold;">৳${expenseTotal.toLocaleString()}</td>
          <td style="color:${netIncome >= 0 ? "#0f766e" : "#dc2626"};font-weight:bold;">৳${netIncome.toLocaleString()}</td>
        </tr></tbody>
      </table>`;
    printDocument(
      buildPdfTitle("সম্মিলিত আয় ও ব্যয় রিপোর্ট", m, y),
      bodyHTML,
      settings
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "finance.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "income", "data-ocid": "finance.tab", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "income", "data-ocid": "finance.income.tab", children: "আয় (Income)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "expense", "data-ocid": "finance.expense.tab", children: "ব্যয় (Expense)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "combined", "data-ocid": "finance.combined.tab", children: "সম্মিলিত এক্সপোর্ট" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "income", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "shadow-card border-border",
              "data-ocid": "finance.connection_fee.card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "মোট আদায়কৃত সংযোগ ফি" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-teal-600", children: [
                    "৳",
                    totalConnectionFeeCash.toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "নগদ সংগৃহীত" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-teal-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-5 h-5 text-teal-600" }) })
              ] }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "shadow-card border-border",
              "data-ocid": "finance.commission_income.card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "মোট কমিশন আয়" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-success", children: [
                    "৳",
                    totalCommission.toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "সংযোগ শুরু থেকে এ পর্যন্ত" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-success/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-success" }) })
              ] }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "shadow-card border-border",
            "data-ocid": "finance.customer_finance.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "গ্রাহক আর্থিক তথ্য" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14, className: "text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        className: "text-xs border border-border rounded px-2 py-1.5 bg-background",
                        value: incomeFilterMonth,
                        onChange: (e) => setIncomeFilterMonth(e.target.value),
                        "data-ocid": "finance.income_month.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "সব মাস" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1", children: "জানুয়ারি" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2", children: "ফেব্রুয়ারি" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "3", children: "মার্চ" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "4", children: "এপ্রিল" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "5", children: "মে" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "6", children: "জুন" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7", children: "জুলাই" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "8", children: "আগস্ট" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "9", children: "সেপ্টেম্বর" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "10", children: "অক্টোবর" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "11", children: "নভেম্বর" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "12", children: "ডিসেম্বর" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        className: "text-xs border border-border rounded px-2 py-1.5 bg-background",
                        value: incomeFilterYear,
                        onChange: (e) => setIncomeFilterYear(e.target.value),
                        "data-ocid": "finance.income_year.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "সব বছর" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2024", children: "২০২৪" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2025", children: "২০২৫" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2026", children: "২০২৬" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2027", children: "২০২৭" })
                        ]
                      }
                    )
                  ] }),
                  isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => handleExportFinancePDF(),
                      "data-ocid": "finance.export_finance_pdf.button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { size: 14, className: "mr-1.5" }),
                        "PDF এক্সপোর্ট"
                      ]
                    }
                  )
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "ক্রমিক" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "ইউজার নেম/আইডি" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "সংযোগের তারিখ" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "প্যাকেজ" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "মাসিক বিল" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "সংযোগ ফি নগদ" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "সংযোগ ফি বকেয়া" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "সম্পূর্ণ মাস" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "কমিশন (৩০% × মাস)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "এডিট" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: allCustomers.map((c, i) => {
                    const periods = completedPeriods(c.connectionDate);
                    const commissionPerMonth = Math.round(
                      c.monthlyFee * (c.commissionPercent ?? 30) / 100
                    );
                    const totalCust = periods * commissionPerMonth;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        className: "border-b border-border last:border-0 hover:bg-muted/20",
                        "data-ocid": `finance.customer.item.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground", children: i + 1 }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-medium", children: c.username }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground whitespace-nowrap", children: formatDate(c.connectionDate) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-muted-foreground whitespace-nowrap", children: [
                            c.monthlyFee,
                            " টাকা/মাস"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 font-medium", children: [
                            "৳",
                            c.monthlyFee.toLocaleString()
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-medium text-teal-600", children: c.connectionFeeCash > 0 ? `৳${c.connectionFeeCash.toLocaleString()}` : "—" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground", children: c.connectionFeeDue > 0 ? `৳${c.connectionFeeDue.toLocaleString()}` : "০" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary", children: [
                            periods,
                            " মাস"
                          ] }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: periods > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-success font-medium", children: [
                            "৳",
                            totalCust.toLocaleString(),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
                              "(",
                              c.commissionPercent ?? 30,
                              "%×",
                              periods,
                              ")"
                            ] })
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "১ মাস পূর্ণ হয়নি" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              variant: "ghost",
                              size: "sm",
                              className: "h-7 w-7 p-0",
                              onClick: () => openEdit(c),
                              "data-ocid": `finance.edit_button.${i + 1}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 13 })
                            }
                          ) })
                        ]
                      },
                      c.id.toString()
                    );
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t-2 border-border bg-muted/40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 font-bold", colSpan: 4, children: "মোট" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 font-bold", children: [
                      "৳",
                      expectedMonthly.toLocaleString()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 font-bold text-teal-600", children: [
                      "৳",
                      totalConnectionFeeCash.toLocaleString()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 font-bold", children: [
                      "৳",
                      totalConnectionFeeDue.toLocaleString()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 font-bold text-success", children: [
                      "৳",
                      totalCommission.toLocaleString()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", {})
                  ] }) })
                ] }),
                allCustomers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-center text-muted-foreground py-12",
                    "data-ocid": "finance.empty_state",
                    children: "কোনো গ্রাহক পাওয়া যায়নি"
                  }
                )
              ] }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "expense", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "shadow-card border-border",
            "data-ocid": "finance.expense_summary.card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "মোট ব্যয়" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-destructive", children: [
                  "৳",
                  totalExpenses.toLocaleString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "সকল ব্যয়ের সমষ্টি" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-5 h-5 text-destructive" }) })
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "shadow-card border-border",
            "data-ocid": "finance.add_expense.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
                "নতুন ব্যয় যুক্ত করুন"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "তারিখ *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "date",
                        value: expenseForm.date,
                        onChange: (e) => setExpenseForm((p) => ({ ...p, date: e.target.value })),
                        "data-ocid": "finance.expense_date.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ব্যয়ের খাত *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: expenseForm.category,
                        onValueChange: (v) => setExpenseForm((p) => ({
                          ...p,
                          category: v,
                          customCategory: v === "__custom__" ? p.customCategory : ""
                        })),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "finance.expense_category.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "খাত নির্বাচন করুন" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                            DEFAULT_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__custom__", children: "+ নতুন খাত যুক্ত করুন" })
                          ] })
                        ]
                      }
                    ),
                    expenseForm.category === "__custom__" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        className: "mt-1.5",
                        placeholder: "নতুন খাতের নাম লিখুন",
                        value: expenseForm.customCategory,
                        onChange: (e) => setExpenseForm((p) => ({
                          ...p,
                          customCategory: e.target.value
                        })),
                        "data-ocid": "finance.expense_custom_category.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "বর্ণনা (Description)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        placeholder: "বর্ণনা লিখুন",
                        value: expenseForm.description,
                        onChange: (e) => setExpenseForm((p) => ({
                          ...p,
                          description: e.target.value
                        })),
                        "data-ocid": "finance.expense_description.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "একক (Unit)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: expenseForm.unit,
                        onValueChange: (v) => setExpenseForm((p) => ({
                          ...p,
                          unit: v,
                          customUnit: v === "__custom__" ? p.customUnit : ""
                        })),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "finance.expense_unit.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "একক নির্বাচন করুন" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                            DEFAULT_UNITS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: u, children: u }, u)),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__custom__", children: "+ নতুন একক যুক্ত করুন" })
                          ] })
                        ]
                      }
                    ),
                    expenseForm.unit === "__custom__" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        className: "mt-1.5",
                        placeholder: "নতুন এককের নাম লিখুন",
                        value: expenseForm.customUnit,
                        onChange: (e) => setExpenseForm((p) => ({
                          ...p,
                          customUnit: e.target.value
                        })),
                        "data-ocid": "finance.expense_custom_unit.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "দর (Rate)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        placeholder: "দর লিখুন",
                        value: expenseForm.rate,
                        onChange: (e) => handleExpenseFormChange(
                          "rate",
                          e.target.value,
                          expenseForm,
                          setExpenseForm
                        ),
                        "data-ocid": "finance.expense_rate.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "পরিমাণ/সংখ্যা" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        placeholder: "পরিমাণ লিখুন",
                        value: expenseForm.quantity,
                        onChange: (e) => handleExpenseFormChange(
                          "quantity",
                          e.target.value,
                          expenseForm,
                          setExpenseForm
                        ),
                        "data-ocid": "finance.expense_quantity.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "দাম (Amount) *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        placeholder: "দাম লিখুন",
                        value: expenseForm.amount,
                        onChange: (e) => setExpenseForm((p) => ({
                          ...p,
                          amount: e.target.value
                        })),
                        "data-ocid": "finance.expense_amount.input"
                      }
                    ),
                    expenseForm.rate && expenseForm.quantity && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "অটো: ",
                      expenseForm.rate,
                      " × ",
                      expenseForm.quantity,
                      " = ৳",
                      ((Number.parseFloat(expenseForm.rate) || 0) * (Number.parseFloat(expenseForm.quantity) || 0)).toLocaleString()
                    ] })
                  ] })
                ] }),
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: handleAddExpense,
                    disabled: expenseSubmitting,
                    "data-ocid": "finance.add_expense.submit_button",
                    children: [
                      expenseSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15, className: "mr-1.5" }),
                      "ব্যয় যুক্ত করুন"
                    ]
                  }
                ) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "shadow-card border-border",
            "data-ocid": "finance.expense_list.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "ব্যয়ের তালিকা" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14, className: "text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        className: "text-xs border border-border rounded px-2 py-1.5 bg-background",
                        value: expenseFilterMonth,
                        onChange: (e) => setExpenseFilterMonth(e.target.value),
                        "data-ocid": "finance.expense_month.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "সব মাস" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1", children: "জানুয়ারি" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2", children: "ফেব্রুয়ারি" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "3", children: "মার্চ" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "4", children: "এপ্রিল" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "5", children: "মে" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "6", children: "জুন" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7", children: "জুলাই" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "8", children: "আগস্ট" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "9", children: "সেপ্টেম্বর" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "10", children: "অক্টোবর" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "11", children: "নভেম্বর" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "12", children: "ডিসেম্বর" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        className: "text-xs border border-border rounded px-2 py-1.5 bg-background",
                        value: expenseFilterYear,
                        onChange: (e) => setExpenseFilterYear(e.target.value),
                        "data-ocid": "finance.expense_year.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "সব বছর" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2024", children: "২০২৪" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2025", children: "২০২৫" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2026", children: "২০২৬" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2027", children: "২০২৭" })
                        ]
                      }
                    )
                  ] }),
                  isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => handleExportExpensePDF(),
                      "data-ocid": "finance.export_expense_pdf.button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { size: 14, className: "mr-1.5" }),
                        "PDF এক্সপোর্ট"
                      ]
                    }
                  )
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground", children: "ক্রমিক" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "তারিখ" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground", children: "খাত" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground", children: "বর্ণনা" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground", children: "একক" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground", children: "দর" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground", children: "দাম" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-xs font-semibold text-muted-foreground", children: "এডিট/মুছুন" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: expenses.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-border last:border-0 hover:bg-muted/20",
                      "data-ocid": `finance.expense.item.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground", children: e.serial }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground whitespace-nowrap", children: e.date ? new Date(e.date).toLocaleDateString("bn-BD") : "—" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-medium", children: e.category }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground", children: e.description || "—" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground", children: e.unit || "—" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground", children: e.rate > 0 ? `৳${e.rate.toLocaleString()}` : "—" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 font-medium text-destructive", children: [
                          "৳",
                          e.amount.toLocaleString()
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              variant: "ghost",
                              size: "sm",
                              className: "h-7 w-7 p-0",
                              onClick: () => openEditExpense(e),
                              "data-ocid": `finance.expense_edit_button.${i + 1}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 13 })
                            }
                          ),
                          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              variant: "ghost",
                              size: "sm",
                              className: "h-7 w-7 p-0 text-destructive hover:text-destructive",
                              onClick: () => {
                                deleteExpense(e.id);
                                ue.success("ব্যয় মুছে ফেলা হয়েছে");
                              },
                              "data-ocid": `finance.expense_delete_button.${i + 1}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                            }
                          )
                        ] }) })
                      ]
                    },
                    e.id
                  )) }),
                  expenses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t-2 border-border bg-muted/40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "py-3 px-3 font-bold", children: "মোট ব্যয়" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 font-bold text-destructive", children: [
                      "৳",
                      totalExpenses.toLocaleString()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", {})
                  ] }) })
                ] }),
                expensesLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-center text-muted-foreground py-12 flex items-center justify-center gap-2",
                    "data-ocid": "finance.expense.loading_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                      "ব্যয়ের তথ্য লোড হচ্ছে..."
                    ]
                  }
                ),
                !expensesLoading && expenses.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-center text-muted-foreground py-12",
                    "data-ocid": "finance.expense.empty_state",
                    children: "কোনো ব্যয় যুক্ত হয়নি"
                  }
                )
              ] }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "combined", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "shadow-card border-border",
              "data-ocid": "finance.combined_fee.card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "মোট সংযোগ ফি" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-teal-600", children: [
                    "৳",
                    totalConnectionFeeCash.toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-teal-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-5 h-5 text-teal-600" }) })
              ] }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "shadow-card border-border",
              "data-ocid": "finance.combined_commission.card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "মোট কমিশন" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-success", children: [
                    "৳",
                    totalCommission.toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-success/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-success" }) })
              ] }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "shadow-card border-border",
              "data-ocid": "finance.combined_income.card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "মোট আয়" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-blue-600", children: [
                    "৳",
                    (totalConnectionFeeCash + totalCommission).toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-blue-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-blue-600" }) })
              ] }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "shadow-card border-border",
              "data-ocid": "finance.combined_expense.card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "মোট ব্যয়" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-destructive", children: [
                    "৳",
                    totalExpenses.toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-5 h-5 text-destructive" }) })
              ] }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "shadow-card border-border",
              "data-ocid": "finance.combined_net.card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "নিট আয়" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: `text-2xl font-bold ${totalConnectionFeeCash + totalCommission - totalExpenses >= 0 ? "text-purple-600" : "text-destructive"}`,
                      children: [
                        "৳",
                        (totalConnectionFeeCash + totalCommission - totalExpenses).toLocaleString()
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-purple-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-purple-600" }) })
              ] }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "shadow-card border-border",
            "data-ocid": "finance.combined_export.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "সম্মিলিত PDF এক্সপোর্ট" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "আয় (সংযোগ ফি + কমিশন) ও ব্যয় একসাথে একটি PDF ফাইলে এক্সপোর্ট করুন। মাস ও বছর অনুযায়ী ফিল্টার করা যাবে।" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14, className: "text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        className: "text-xs border border-border rounded px-2 py-1.5 bg-background",
                        value: combinedFilterMonth,
                        onChange: (e) => setCombinedFilterMonth(e.target.value),
                        "data-ocid": "finance.combined_month.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "সব মাস" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1", children: "জানুয়ারি" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2", children: "ফেব্রুয়ারি" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "3", children: "মার্চ" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "4", children: "এপ্রিল" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "5", children: "মে" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "6", children: "জুন" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7", children: "জুলাই" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "8", children: "আগস্ট" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "9", children: "সেপ্টেম্বর" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "10", children: "অক্টোবর" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "11", children: "নভেম্বর" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "12", children: "ডিসেম্বর" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        className: "text-xs border border-border rounded px-2 py-1.5 bg-background",
                        value: combinedFilterYear,
                        onChange: (e) => setCombinedFilterYear(e.target.value),
                        "data-ocid": "finance.combined_year.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "সব বছর" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2024", children: "২০২৪" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2025", children: "২০২৫" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2026", children: "২০২৬" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2027", children: "২০২৭" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: handleExportCombinedPDF,
                      className: "bg-primary text-white",
                      "data-ocid": "finance.combined_export.primary_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { size: 15, className: "mr-1.5" }),
                        "সম্মিলিত PDF এক্সপোর্ট"
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: editOpen, onOpenChange: setEditOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-2xl max-h-[90vh] overflow-y-auto",
        "data-ocid": "finance.edit_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "গ্রাহক তথ্য সম্পাদনা" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ইউজার নেম / আইডি *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: editForm.username,
                  onChange: (e) => setEditForm((p) => ({ ...p, username: e.target.value })),
                  placeholder: "user001"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "পাসওয়ার্ড" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: showFormPassword ? "text" : "password",
                    value: editForm.password,
                    onChange: (e) => setEditForm((p) => ({ ...p, password: e.target.value })),
                    placeholder: "পাসওয়ার্ড",
                    className: "pr-9"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                    onClick: () => setShowFormPassword(!showFormPassword),
                    children: showFormPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "মোবাইল নম্বর *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: editForm.phone,
                  onChange: (e) => setEditForm((p) => ({ ...p, phone: e.target.value })),
                  placeholder: "০১৭..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "কার্নিভাল আইডি" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: editForm.carnivalId,
                  onChange: (e) => setEditForm((p) => ({ ...p, carnivalId: e.target.value })),
                  placeholder: "CRN-001"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "সিআইডি নম্বর" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: editForm.cidNumber,
                  onChange: (e) => setEditForm((p) => ({ ...p, cidNumber: e.target.value })),
                  placeholder: "277465"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "গ্রাম" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: editForm.village,
                  onValueChange: (v) => setEditForm((p) => ({ ...p, village: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "গ্রাম নির্বাচন" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: VILLAGES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: v, children: v }, v)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "সংযোগের তারিখ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: editForm.connectionDate,
                  onChange: (e) => setEditForm((p) => ({ ...p, connectionDate: e.target.value }))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "প্যাকেজ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: editForm.packageId,
                  onValueChange: (v) => {
                    const selectedPkg = allPackages.find(
                      (p) => p.id.toString() === v
                    );
                    setEditForm((p) => ({
                      ...p,
                      packageId: v,
                      monthlyFee: selectedPkg ? selectedPkg.monthlyPrice.toString() : p.monthlyFee
                    }));
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "প্যাকেজ নির্বাচন" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: allPackages.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.id.toString(), children: p.name }, p.id.toString())) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "মাসিক বিল (৳)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  value: editForm.monthlyFee,
                  onChange: (e) => setEditForm((p) => ({ ...p, monthlyFee: e.target.value })),
                  placeholder: "৬০০"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "সংযোগ ফি নগদ (৳)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  value: editForm.connectionFeeCash,
                  onChange: (e) => setEditForm((p) => ({
                    ...p,
                    connectionFeeCash: e.target.value
                  })),
                  placeholder: "১০০০"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "সংযোগ ফি বকেয়া (৳)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  value: editForm.connectionFeeDue,
                  onChange: (e) => setEditForm((p) => ({
                    ...p,
                    connectionFeeDue: e.target.value
                  })),
                  placeholder: "০"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "কমিশন হার" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: editForm.commissionPercent,
                  onValueChange: (v) => setEditForm((p) => ({ ...p, commissionPercent: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "কমিশন নির্বাচন" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "30", children: "৩০%" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "40", children: "৪০%" })
                    ] })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setEditOpen(false),
                "data-ocid": "finance.edit_dialog.cancel_button",
                children: "বাতিল"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "bg-primary text-white",
                onClick: handleEditSave,
                disabled: saving,
                "data-ocid": "finance.edit_dialog.confirm_button",
                children: [
                  saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                  "আপডেট করুন"
                ]
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: editExpenseOpen, onOpenChange: setEditExpenseOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-lg",
        "data-ocid": "finance.edit_expense_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "ব্যয় সম্পাদনা" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "তারিখ *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: editExpenseForm.date,
                  onChange: (e) => setEditExpenseForm((p) => ({ ...p, date: e.target.value })),
                  "data-ocid": "finance.edit_expense_date.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ব্যয়ের খাত *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: editExpenseForm.category,
                  onValueChange: (v) => setEditExpenseForm((p) => ({
                    ...p,
                    category: v,
                    customCategory: v === "__custom__" ? p.customCategory : ""
                  })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "খাত নির্বাচন" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      DEFAULT_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__custom__", children: "+ নতুন খাত যুক্ত করুন" })
                    ] })
                  ]
                }
              ),
              editExpenseForm.category === "__custom__" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  className: "mt-1.5",
                  placeholder: "নতুন খাতের নাম",
                  value: editExpenseForm.customCategory,
                  onChange: (e) => setEditExpenseForm((p) => ({
                    ...p,
                    customCategory: e.target.value
                  }))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "বর্ণনা" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "বর্ণনা লিখুন",
                  value: editExpenseForm.description,
                  onChange: (e) => setEditExpenseForm((p) => ({
                    ...p,
                    description: e.target.value
                  }))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "একক" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: editExpenseForm.unit,
                  onValueChange: (v) => setEditExpenseForm((p) => ({
                    ...p,
                    unit: v,
                    customUnit: v === "__custom__" ? p.customUnit : ""
                  })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "একক নির্বাচন" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      DEFAULT_UNITS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: u, children: u }, u)),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__custom__", children: "+ নতুন একক" })
                    ] })
                  ]
                }
              ),
              editExpenseForm.unit === "__custom__" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  className: "mt-1.5",
                  placeholder: "নতুন এককের নাম",
                  value: editExpenseForm.customUnit,
                  onChange: (e) => setEditExpenseForm((p) => ({
                    ...p,
                    customUnit: e.target.value
                  }))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "দর (Rate)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  placeholder: "দর",
                  value: editExpenseForm.rate,
                  onChange: (e) => handleExpenseFormChange(
                    "rate",
                    e.target.value,
                    editExpenseForm,
                    setEditExpenseForm
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "দাম (Amount) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  placeholder: "দাম",
                  value: editExpenseForm.amount,
                  onChange: (e) => setEditExpenseForm((p) => ({
                    ...p,
                    amount: e.target.value
                  }))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setEditExpenseOpen(false),
                "data-ocid": "finance.edit_expense_dialog.cancel_button",
                children: "বাতিল"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleEditExpenseSave,
                "data-ocid": "finance.edit_expense_dialog.confirm_button",
                children: "আপডেট করুন"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  Finance as default
};
