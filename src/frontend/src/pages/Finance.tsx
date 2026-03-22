import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Banknote,
  Calendar,
  Eye,
  EyeOff,
  FileDown,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { VILLAGES } from "../data/sampleData";
import { useActor } from "../hooks/useActor";
import { useCompanySettings } from "../hooks/useCompanySettings";
import { useCustomerFinancials } from "../hooks/useCustomerFinancials";
import { useExpenses } from "../hooks/useExpenses";
import type { Expense } from "../hooks/useExpenses";
import { useLocalCustomers } from "../hooks/useLocalCustomers";
import { usePackages } from "../hooks/useQueries";
import type { ExtendedCustomer } from "../types/extended";
import { printDocument } from "../utils/printDocument";

function completedPeriods(connectionDate: bigint): number {
  const connectedMs = Number(connectionDate / 1000000n);
  const elapsed = Date.now() - connectedMs;
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  return Math.max(0, Math.floor(elapsed / thirtyDaysMs));
}

function formatDate(time: bigint): string {
  const ms = Number(time / 1000000n);
  return new Date(ms).toLocaleDateString("bn-BD");
}

function toDateInputValue(time: bigint): string {
  const ms = Number(time / 1000000n);
  return new Date(ms).toISOString().split("T")[0];
}

const DEFAULT_CATEGORIES = [
  "দিনমজুর",
  "রাউটার",
  "ONU",
  "অপটিক্যাল ফাইবার",
  "স্প্লিটার",
  "টেকনিশিয়ান বেতন",
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
  "ডিসেম্বর",
];

const PRODUCT_SYNC_CATEGORIES = ["রাউটার", "ONU", "অপটিক্যাল ফাইবার", "স্প্লিটার"];

function formatBanglaMonth(dateStr: string): string {
  const d = new Date(dateStr);
  return `${BANGLA_MONTHS_ARRAY[d.getMonth()]} ${d.getFullYear()}`;
}

interface EditFormData {
  username: string;
  password: string;
  phone: string;
  carnivalId: string;
  cidNumber: string;
  village: string;
  packageId: string;
  monthlyFee: string;
  connectionDate: string;
  connectionFeeCash: string;
  connectionFeeDue: string;
  commissionPercent: string;
}

interface ExpenseFormData {
  category: string;
  customCategory: string;
  description: string;
  unit: string;
  customUnit: string;
  rate: string;
  quantity: string;
  amount: string;
  date: string;
}

const EMPTY_EXPENSE_FORM: ExpenseFormData = {
  category: "",
  customCategory: "",
  description: "",
  unit: "",
  customUnit: "",
  rate: "",
  quantity: "",
  amount: "",
  date: new Date().toISOString().split("T")[0],
};

interface FinanceProps {
  isAdmin?: boolean;
}
export default function Finance({ isAdmin = false }: FinanceProps) {
  const { customers: allCustomers, updateCustomer } = useLocalCustomers();
  const { settings } = useCompanySettings();
  const { data: packages } = usePackages();
  const allPackages = packages ?? [];
  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    loading: expensesLoading,
  } = useExpenses();
  const { financials, saveFinancial } = useCustomerFinancials();
  const { actor } = useActor();
  const financialsApplied = useRef(false);

  // Apply backend financials to customers once on load
  useEffect(() => {
    if (financialsApplied.current || financials.length === 0) return;
    financialsApplied.current = true;
    for (const f of financials) {
      const customer = allCustomers.find((c) => c.cidNumber === f.cidNumber);
      if (
        customer &&
        (customer.connectionFeeCash !== f.connectionFeeCash ||
          customer.connectionFeeDue !== f.connectionFeeDue)
      ) {
        updateCustomer({
          ...customer,
          connectionFeeCash: f.connectionFeeCash,
          connectionFeeDue: f.connectionFeeDue,
        });
      }
    }
  }, [financials, allCustomers, updateCustomer]);

  // Customer edit state
  const [editOpen, setEditOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] =
    useState<ExtendedCustomer | null>(null);
  const [editForm, setEditForm] = useState<EditFormData>({
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
    commissionPercent: "30",
  });
  const [saving, setSaving] = useState(false);
  const [showFormPassword, setShowFormPassword] = useState(false);

  // PDF filter state
  const [incomeFilterMonth, setIncomeFilterMonth] = useState("");
  const [incomeFilterYear, setIncomeFilterYear] = useState("");
  const [expenseFilterMonth, setExpenseFilterMonth] = useState("");
  const [expenseFilterYear, setExpenseFilterYear] = useState("");
  const [combinedFilterMonth, setCombinedFilterMonth] = useState("");
  const [combinedFilterYear, setCombinedFilterYear] = useState("");

  // Expense form state
  const [expenseForm, setExpenseForm] =
    useState<ExpenseFormData>(EMPTY_EXPENSE_FORM);
  const [expenseSubmitting, setExpenseSubmitting] = useState(false);

  // Expense edit state
  const [editExpenseOpen, setEditExpenseOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [editExpenseForm, setEditExpenseForm] =
    useState<ExpenseFormData>(EMPTY_EXPENSE_FORM);

  // Financial calculations
  const totalConnectionFeeCash = allCustomers.reduce(
    (sum, c) => sum + c.connectionFeeCash,
    0,
  );
  const totalConnectionFeeDue = allCustomers.reduce(
    (sum, c) => sum + c.connectionFeeDue,
    0,
  );
  const expectedMonthly = allCustomers.reduce(
    (sum, c) => sum + c.monthlyFee,
    0,
  );
  const _totalAccumulatedIncome = allCustomers.reduce((sum, c) => {
    const periods = completedPeriods(c.connectionDate);
    return sum + c.monthlyFee * periods;
  }, 0);
  const totalCommission = allCustomers.reduce((sum, c) => {
    const periods = completedPeriods(c.connectionDate);
    return (
      sum +
      periods * Math.round((c.monthlyFee * (c.commissionPercent ?? 30)) / 100)
    );
  }, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  // --- Customer Edit ---
  function openEdit(c: ExtendedCustomer) {
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
      connectionFeeCash:
        c.connectionFeeCash === 0 ? "" : c.connectionFeeCash.toString(),
      connectionFeeDue: c.connectionFeeDue.toString(),
      commissionPercent: (c.commissionPercent ?? 30).toString(),
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
      connectionDate:
        BigInt(new Date(editForm.connectionDate).getTime()) * 1000000n,
      connectionFeeCash: Number.parseInt(editForm.connectionFeeCash) || 0,
      connectionFeeDue: Number.parseInt(editForm.connectionFeeDue) || 0,
      commissionPercent: Number.parseInt(editForm.commissionPercent) || 30,
    });
    const cashFee = Number.parseInt(editForm.connectionFeeCash) || 0;
    const dueFee = Number.parseInt(editForm.connectionFeeDue) || 0;
    if (editForm.cidNumber) {
      saveFinancial(editForm.cidNumber, cashFee, dueFee);
    }
    // Sync connectionFeeDue to DebtManagement ConnectionFeeDue records
    if (actor && editForm.cidNumber) {
      try {
        const allDues = await actor.getConnectionFeeDues();
        const existing = allDues.find(
          (d: { cidNumber: string }) => d.cidNumber === editForm.cidNumber,
        );
        if (dueFee > 0) {
          const record = {
            id: existing?.id ?? crypto.randomUUID(),
            serial: existing?.serial ?? BigInt(allDues.length + 1),
            cidNumber: editForm.cidNumber,
            userName: editForm.username || editingCustomer.username || "",
            mobile: editForm.phone || editingCustomer.phone || "",
            address: editForm.village || editingCustomer.village || "",
            dueMonth: existing?.dueMonth ?? getCurrentBanglaMonth(),
            dueAmount: dueFee,
            createdAt: existing?.createdAt ?? BigInt(Date.now()),
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
        // ignore sync errors silently
      }
    }
    setSaving(false);
    setEditOpen(false);
    toast.success("গ্রাহকের তথ্য আপডেট করা হয়েছে");
  }

  function getCurrentBanglaMonth(): string {
    const now = new Date();
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
      "ডিসেম্বর",
    ];
    return `${banglaMonths[now.getMonth()]} ${now.getFullYear()}`;
  }

  // --- Expense helpers ---
  function resolveCategory(form: ExpenseFormData): string {
    return form.category === "__custom__"
      ? form.customCategory.trim()
      : form.category;
  }

  function resolveUnit(form: ExpenseFormData): string {
    return form.unit === "__custom__" ? form.customUnit.trim() : form.unit;
  }

  function recalcAmount(rate: string, qty: string): string {
    const r = Number.parseFloat(rate) || 0;
    const q = Number.parseFloat(qty) || 0;
    return r && q ? (r * q).toString() : "";
  }

  function handleExpenseFormChange(
    field: keyof ExpenseFormData,
    value: string,
    form: ExpenseFormData,
    setForm: (f: ExpenseFormData) => void,
  ) {
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
      toast.error("ব্যয়ের খাত নির্বাচন করুন");
      return;
    }
    if (!expenseForm.amount) {
      toast.error("দাম (Amount) লিখুন");
      return;
    }
    setExpenseSubmitting(true);
    const expDesc = expenseForm.description;
    const expAmt = Number.parseFloat(expenseForm.amount) || 0;
    const expRate = Number.parseFloat(expenseForm.rate) || 0;
    const expDate = expenseForm.date || new Date().toISOString().split("T")[0];
    addExpense({
      category,
      description: expDesc,
      unit,
      rate: expRate,
      amount: expAmt,
      date: expDate,
    });
    // Sync to DebtManagement
    if (actor) {
      const banglaMonth = formatBanglaMonth(expDate);
      if (category === "টেকনিশিয়ান বেতন") {
        try {
          const dues = await actor.getTechnicianSalaryDues();
          const monthName = banglaMonth.split(" ")[0];
          const existing = dues.find(
            (d: { technicianName: string; dueMonth: string }) =>
              d.technicianName === expDesc && d.dueMonth.includes(monthName),
          );
          if (!existing) {
            await actor.addTechnicianSalaryDue({
              id: crypto.randomUUID(),
              serial: BigInt(dues.length + 1),
              technicianName: expDesc,
              dueMonth: banglaMonth,
              dueAmount: expAmt,
              totalDue: expAmt,
              createdAt: BigInt(Date.now()),
            });
          } else {
            await actor.updateTechnicianSalaryDue({
              ...existing,
              dueAmount: expAmt,
              totalDue: expAmt,
            });
          }
        } catch {
          // ignore sync errors
        }
      } else if (PRODUCT_SYNC_CATEGORIES.includes(category)) {
        try {
          const dues = await actor.getWholesalerDues();
          const productName = category + (expDesc ? ` - ${expDesc}` : "");
          const existing = dues.find(
            (d: { productName: string; date: string }) =>
              d.productName === productName && d.date === expDate,
          );
          const record = {
            id: existing?.id ?? crypto.randomUUID(),
            serial: existing?.serial ?? BigInt(dues.length + 1),
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
            createdAt: existing?.createdAt ?? BigInt(Date.now()),
          };
          if (existing) {
            await actor.updateWholesalerDue(record);
          } else {
            await actor.addWholesalerDue(record);
          }
        } catch {
          // ignore sync errors
        }
      }
    }
    setExpenseForm(EMPTY_EXPENSE_FORM);
    setExpenseSubmitting(false);
    toast.success("ব্যয় যুক্ত করা হয়েছে");
  }

  function openEditExpense(e: Expense) {
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
      date: e.date || new Date().toISOString().split("T")[0],
    });
    setEditExpenseOpen(true);
  }

  async function handleEditExpenseSave() {
    if (!editingExpense) return;
    const category = resolveCategory(editExpenseForm);
    const unit = resolveUnit(editExpenseForm);
    if (!category) {
      toast.error("ব্যয়ের খাত নির্বাচন করুন");
      return;
    }
    const expDesc = editExpenseForm.description;
    const expAmt = Number.parseFloat(editExpenseForm.amount) || 0;
    const expRate = Number.parseFloat(editExpenseForm.rate) || 0;
    const expDate =
      editExpenseForm.date || new Date().toISOString().split("T")[0];
    updateExpense({
      ...editingExpense,
      category,
      description: expDesc,
      unit,
      rate: expRate,
      amount: expAmt,
      date: expDate,
    });
    // Sync to DebtManagement
    if (actor) {
      const banglaMonth = formatBanglaMonth(expDate);
      if (category === "টেকনিশিয়ান বেতন") {
        try {
          const dues = await actor.getTechnicianSalaryDues();
          const monthName = banglaMonth.split(" ")[0];
          const existing = dues.find(
            (d: { technicianName: string; dueMonth: string }) =>
              d.technicianName === expDesc && d.dueMonth.includes(monthName),
          );
          if (!existing) {
            await actor.addTechnicianSalaryDue({
              id: crypto.randomUUID(),
              serial: BigInt(dues.length + 1),
              technicianName: expDesc,
              dueMonth: banglaMonth,
              dueAmount: expAmt,
              totalDue: expAmt,
              createdAt: BigInt(Date.now()),
            });
          } else {
            await actor.updateTechnicianSalaryDue({
              ...existing,
              dueAmount: expAmt,
              totalDue: expAmt,
            });
          }
        } catch {
          // ignore sync errors
        }
      } else if (PRODUCT_SYNC_CATEGORIES.includes(category)) {
        try {
          const dues = await actor.getWholesalerDues();
          const productName = category + (expDesc ? ` - ${expDesc}` : "");
          const existing = dues.find(
            (d: { productName: string; date: string }) =>
              d.productName === productName && d.date === expDate,
          );
          const record = {
            id: existing?.id ?? crypto.randomUUID(),
            serial: existing?.serial ?? BigInt(dues.length + 1),
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
            createdAt: existing?.createdAt ?? BigInt(Date.now()),
          };
          if (existing) {
            await actor.updateWholesalerDue(record);
          } else {
            await actor.addWholesalerDue(record);
          }
        } catch {
          // ignore sync errors
        }
      }
    }
    setEditExpenseOpen(false);
    toast.success("ব্যয় আপডেট করা হয়েছে");
  }

  const MONTH_NAMES: Record<string, string> = {
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
    "12": "ডিসেম্বর",
  };

  function buildPdfTitle(base: string, month: string, year: string): string {
    if (!month && !year) return `${base} - সব মাসের রিপোর্ট`;
    const mLabel = month ? MONTH_NAMES[month] : "";
    const yLabel = year || "";
    return `${base} - ${mLabel} ${yLabel}`.trim();
  }

  function handleExportFinancePDF(month?: string, year?: string) {
    const m = month ?? incomeFilterMonth;
    const y = year ?? incomeFilterYear;
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
      return (
        s +
        periods * Math.round((c.monthlyFee * (c.commissionPercent ?? 30)) / 100)
      );
    }, 0);
    const rows = filtered
      .map((c, i) => {
        const periods = completedPeriods(c.connectionDate);
        const commission =
          periods *
          Math.round((c.monthlyFee * (c.commissionPercent ?? 30)) / 100);
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
      })
      .join("");
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
      settings,
    );
  }

  function handleExportExpensePDF(month?: string, year?: string) {
    const m = month ?? expenseFilterMonth;
    const y = year ?? expenseFilterYear;
    const filtered = expenses.filter((e) => {
      if (!m && !y) return true;
      if (!e.date) return !m && !y;
      const d = new Date(e.date);
      if (m && (d.getMonth() + 1).toString() !== m) return false;
      if (y && d.getFullYear().toString() !== y) return false;
      return true;
    });
    const filtTotal = filtered.reduce((s, e) => s + e.amount, 0);
    const rows = filtered
      .map(
        (e, i) => `<tr>
        <td>${i + 1}</td>
        <td>${e.date ? new Date(e.date).toLocaleDateString("bn-BD") : "—"}</td>
        <td>${e.category}</td>
        <td>${e.description || "—"}</td>
        <td>${e.unit || "—"}</td>
        <td>${e.rate > 0 ? `৳${e.rate.toLocaleString()}` : "—"}</td>
        <td>৳${e.amount.toLocaleString()}</td>
      </tr>`,
      )
      .join("");
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

    // Filter customers by connectionDate
    const filteredCustomers = allCustomers.filter((c) => {
      if (!m && !y) return true;
      const d = new Date(Number(c.connectionDate / 1000000n));
      if (m && (d.getMonth() + 1).toString() !== m) return false;
      if (y && d.getFullYear().toString() !== y) return false;
      return true;
    });

    // Filter expenses by expense.date
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
      0,
    );
    const incomeSubtotalComm = filteredCustomers.reduce((s, c) => {
      const periods = completedPeriods(c.connectionDate);
      return (
        s +
        periods * Math.round((c.monthlyFee * (c.commissionPercent ?? 30)) / 100)
      );
    }, 0);
    const incomeTotal = incomeSubtotalFee + incomeSubtotalComm;
    const expenseTotal = filteredExpenses.reduce((s, e) => s + e.amount, 0);
    const netIncome = incomeTotal - expenseTotal;

    const incomeRows = filteredCustomers
      .map((c, i) => {
        const periods = completedPeriods(c.connectionDate);
        const commission =
          periods *
          Math.round((c.monthlyFee * (c.commissionPercent ?? 30)) / 100);
        return `<tr>
        <td>${i + 1}</td>
        <td>${c.username}</td>
        <td>${new Date(Number(c.connectionDate / 1000000n)).toLocaleDateString("bn-BD")}</td>
        <td>${c.monthlyFee} টাকা</td>
        <td>${periods} মাস</td>
        <td>${c.connectionFeeCash > 0 ? `৳${c.connectionFeeCash.toLocaleString()}` : "—"}</td>
        <td>${periods > 0 ? `৳${commission.toLocaleString()}` : "—"}</td>
      </tr>`;
      })
      .join("");

    const expenseRows = filteredExpenses
      .map(
        (e, i) => `<tr>
        <td>${i + 1}</td>
        <td>${e.date ? new Date(e.date).toLocaleDateString("bn-BD") : "—"}</td>
        <td>${e.category}</td>
        <td>${e.description || "—"}</td>
        <td>${e.unit || "—"}</td>
        <td>${e.rate > 0 ? `৳${e.rate.toLocaleString()}` : "—"}</td>
        <td>৳${e.amount.toLocaleString()}</td>
      </tr>`,
      )
      .join("");

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
      settings,
    );
  }

  return (
    <div className="space-y-6" data-ocid="finance.page">
      <Tabs defaultValue="income" data-ocid="finance.tab">
        <TabsList className="mb-4">
          <TabsTrigger value="income" data-ocid="finance.income.tab">
            আয় (Income)
          </TabsTrigger>
          <TabsTrigger value="expense" data-ocid="finance.expense.tab">
            ব্যয় (Expense)
          </TabsTrigger>
          <TabsTrigger value="combined" data-ocid="finance.combined.tab">
            সম্মিলিত এক্সপোর্ট
          </TabsTrigger>
        </TabsList>

        {/* ========== TAB 1: INCOME ========== */}
        <TabsContent value="income" className="space-y-6">
          {/* Income Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card
              className="shadow-card border-border"
              data-ocid="finance.connection_fee.card"
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      মোট আদায়কৃত সংযোগ ফি
                    </p>
                    <p className="text-3xl font-bold text-teal-600">
                      ৳{totalConnectionFeeCash.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      নগদ সংগৃহীত
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-teal-500/10">
                    <Banknote className="w-5 h-5 text-teal-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="shadow-card border-border"
              data-ocid="finance.commission_income.card"
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      মোট কমিশন আয়
                    </p>
                    <p className="text-3xl font-bold text-success">
                      ৳{totalCommission.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      সংযোগ শুরু থেকে এ পর্যন্ত
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-success/10">
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Finance Table */}
          <Card
            className="shadow-card border-border"
            data-ocid="finance.customer_finance.card"
          >
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle className="text-base font-semibold">
                  গ্রাহক আর্থিক তথ্য
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-muted-foreground" />
                    <select
                      className="text-xs border border-border rounded px-2 py-1.5 bg-background"
                      value={incomeFilterMonth}
                      onChange={(e) => setIncomeFilterMonth(e.target.value)}
                      data-ocid="finance.income_month.select"
                    >
                      <option value="">সব মাস</option>
                      <option value="1">জানুয়ারি</option>
                      <option value="2">ফেব্রুয়ারি</option>
                      <option value="3">মার্চ</option>
                      <option value="4">এপ্রিল</option>
                      <option value="5">মে</option>
                      <option value="6">জুন</option>
                      <option value="7">জুলাই</option>
                      <option value="8">আগস্ট</option>
                      <option value="9">সেপ্টেম্বর</option>
                      <option value="10">অক্টোবর</option>
                      <option value="11">নভেম্বর</option>
                      <option value="12">ডিসেম্বর</option>
                    </select>
                    <select
                      className="text-xs border border-border rounded px-2 py-1.5 bg-background"
                      value={incomeFilterYear}
                      onChange={(e) => setIncomeFilterYear(e.target.value)}
                      data-ocid="finance.income_year.select"
                    >
                      <option value="">সব বছর</option>
                      <option value="2024">২০২৪</option>
                      <option value="2025">২০২৫</option>
                      <option value="2026">২০২৬</option>
                      <option value="2027">২০২৭</option>
                    </select>
                  </div>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExportFinancePDF()}
                      data-ocid="finance.export_finance_pdf.button"
                    >
                      <FileDown size={14} className="mr-1.5" />
                      PDF এক্সপোর্ট
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        ক্রমিক
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        ইউজার নেম/আইডি
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        সংযোগের তারিখ
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        প্যাকেজ
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        মাসিক বিল
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        সংযোগ ফি নগদ
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        সংযোগ ফি বকেয়া
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        সম্পূর্ণ মাস
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        কমিশন (৩০% × মাস)
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        এডিট
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCustomers.map((c, i) => {
                      const periods = completedPeriods(c.connectionDate);
                      const commissionPerMonth = Math.round(
                        (c.monthlyFee * (c.commissionPercent ?? 30)) / 100,
                      );
                      const totalCust = periods * commissionPerMonth;
                      return (
                        <tr
                          key={c.id.toString()}
                          className="border-b border-border last:border-0 hover:bg-muted/20"
                          data-ocid={`finance.customer.item.${i + 1}`}
                        >
                          <td className="py-2.5 px-3 text-muted-foreground">
                            {i + 1}
                          </td>
                          <td className="py-2.5 px-3 font-medium">
                            {c.username}
                          </td>
                          <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap">
                            {formatDate(c.connectionDate)}
                          </td>
                          <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap">
                            {c.monthlyFee} টাকা/মাস
                          </td>
                          <td className="py-2.5 px-3 font-medium">
                            ৳{c.monthlyFee.toLocaleString()}
                          </td>
                          <td className="py-2.5 px-3 font-medium text-teal-600">
                            {c.connectionFeeCash > 0
                              ? `৳${c.connectionFeeCash.toLocaleString()}`
                              : "—"}
                          </td>
                          <td className="py-2.5 px-3 text-muted-foreground">
                            {c.connectionFeeDue > 0
                              ? `৳${c.connectionFeeDue.toLocaleString()}`
                              : "০"}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                              {periods} মাস
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            {periods > 0 ? (
                              <span className="text-success font-medium">
                                ৳{totalCust.toLocaleString()}
                                <span className="text-xs text-muted-foreground ml-1">
                                  ({c.commissionPercent ?? 30}%×{periods})
                                </span>
                              </span>
                            ) : (
                              <span className="text-muted-foreground text-xs">
                                ১ মাস পূর্ণ হয়নি
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3">
                            {isAdmin && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => openEdit(c)}
                                data-ocid={`finance.edit_button.${i + 1}`}
                              >
                                <Pencil size={13} />
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-border bg-muted/40">
                      <td className="py-3 px-3 font-bold" colSpan={4}>
                        মোট
                      </td>
                      <td className="py-3 px-3 font-bold">
                        ৳{expectedMonthly.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 font-bold text-teal-600">
                        ৳{totalConnectionFeeCash.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 font-bold">
                        ৳{totalConnectionFeeDue.toLocaleString()}
                      </td>
                      <td className="py-3 px-3" />
                      <td className="py-3 px-3 font-bold text-success">
                        ৳{totalCommission.toLocaleString()}
                      </td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
                {allCustomers.length === 0 && (
                  <p
                    className="text-center text-muted-foreground py-12"
                    data-ocid="finance.empty_state"
                  >
                    কোনো গ্রাহক পাওয়া যায়নি
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========== TAB 2: EXPENSE ========== */}
        <TabsContent value="expense" className="space-y-6">
          {/* Expense Summary */}
          <Card
            className="shadow-card border-border"
            data-ocid="finance.expense_summary.card"
          >
            <CardContent className="pt-5 pb-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">মোট ব্যয়</p>
                  <p className="text-3xl font-bold text-destructive">
                    ৳{totalExpenses.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    সকল ব্যয়ের সমষ্টি
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-destructive/10">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Expense Form */}
          <Card
            className="shadow-card border-border"
            data-ocid="finance.add_expense.card"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Plus size={16} />
                নতুন ব্যয় যুক্ত করুন
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Date */}
                <div className="space-y-1.5">
                  <Label className="text-xs">তারিখ *</Label>
                  <Input
                    type="date"
                    value={expenseForm.date}
                    onChange={(e) =>
                      setExpenseForm((p) => ({ ...p, date: e.target.value }))
                    }
                    data-ocid="finance.expense_date.input"
                  />
                </div>
                {/* Category */}
                <div className="space-y-1.5">
                  <Label className="text-xs">ব্যয়ের খাত *</Label>
                  <Select
                    value={expenseForm.category}
                    onValueChange={(v) =>
                      setExpenseForm((p) => ({
                        ...p,
                        category: v,
                        customCategory:
                          v === "__custom__" ? p.customCategory : "",
                      }))
                    }
                  >
                    <SelectTrigger data-ocid="finance.expense_category.select">
                      <SelectValue placeholder="খাত নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEFAULT_CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                      <SelectItem value="__custom__">
                        + নতুন খাত যুক্ত করুন
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {expenseForm.category === "__custom__" && (
                    <Input
                      className="mt-1.5"
                      placeholder="নতুন খাতের নাম লিখুন"
                      value={expenseForm.customCategory}
                      onChange={(e) =>
                        setExpenseForm((p) => ({
                          ...p,
                          customCategory: e.target.value,
                        }))
                      }
                      data-ocid="finance.expense_custom_category.input"
                    />
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <Label className="text-xs">বর্ণনা (Description)</Label>
                  <Input
                    placeholder="বর্ণনা লিখুন"
                    value={expenseForm.description}
                    onChange={(e) =>
                      setExpenseForm((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    data-ocid="finance.expense_description.input"
                  />
                </div>

                {/* Unit */}
                <div className="space-y-1.5">
                  <Label className="text-xs">একক (Unit)</Label>
                  <Select
                    value={expenseForm.unit}
                    onValueChange={(v) =>
                      setExpenseForm((p) => ({
                        ...p,
                        unit: v,
                        customUnit: v === "__custom__" ? p.customUnit : "",
                      }))
                    }
                  >
                    <SelectTrigger data-ocid="finance.expense_unit.select">
                      <SelectValue placeholder="একক নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEFAULT_UNITS.map((u) => (
                        <SelectItem key={u} value={u}>
                          {u}
                        </SelectItem>
                      ))}
                      <SelectItem value="__custom__">
                        + নতুন একক যুক্ত করুন
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {expenseForm.unit === "__custom__" && (
                    <Input
                      className="mt-1.5"
                      placeholder="নতুন এককের নাম লিখুন"
                      value={expenseForm.customUnit}
                      onChange={(e) =>
                        setExpenseForm((p) => ({
                          ...p,
                          customUnit: e.target.value,
                        }))
                      }
                      data-ocid="finance.expense_custom_unit.input"
                    />
                  )}
                </div>

                {/* Rate */}
                <div className="space-y-1.5">
                  <Label className="text-xs">দর (Rate)</Label>
                  <Input
                    type="number"
                    placeholder="দর লিখুন"
                    value={expenseForm.rate}
                    onChange={(e) =>
                      handleExpenseFormChange(
                        "rate",
                        e.target.value,
                        expenseForm,
                        setExpenseForm,
                      )
                    }
                    data-ocid="finance.expense_rate.input"
                  />
                </div>

                {/* Quantity */}
                <div className="space-y-1.5">
                  <Label className="text-xs">পরিমাণ/সংখ্যা</Label>
                  <Input
                    type="number"
                    placeholder="পরিমাণ লিখুন"
                    value={expenseForm.quantity}
                    onChange={(e) =>
                      handleExpenseFormChange(
                        "quantity",
                        e.target.value,
                        expenseForm,
                        setExpenseForm,
                      )
                    }
                    data-ocid="finance.expense_quantity.input"
                  />
                </div>

                {/* Amount */}
                <div className="space-y-1.5">
                  <Label className="text-xs">দাম (Amount) *</Label>
                  <Input
                    type="number"
                    placeholder="দাম লিখুন"
                    value={expenseForm.amount}
                    onChange={(e) =>
                      setExpenseForm((p) => ({
                        ...p,
                        amount: e.target.value,
                      }))
                    }
                    data-ocid="finance.expense_amount.input"
                  />
                  {expenseForm.rate && expenseForm.quantity && (
                    <p className="text-xs text-muted-foreground">
                      অটো: {expenseForm.rate} × {expenseForm.quantity} = ৳
                      {(
                        (Number.parseFloat(expenseForm.rate) || 0) *
                        (Number.parseFloat(expenseForm.quantity) || 0)
                      ).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {isAdmin && (
                <div className="mt-5 flex justify-end">
                  <Button
                    onClick={handleAddExpense}
                    disabled={expenseSubmitting}
                    data-ocid="finance.add_expense.submit_button"
                  >
                    {expenseSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <Plus size={15} className="mr-1.5" />
                    ব্যয় যুক্ত করুন
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Expense List */}
          <Card
            className="shadow-card border-border"
            data-ocid="finance.expense_list.card"
          >
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle className="text-base font-semibold">
                  ব্যয়ের তালিকা
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-muted-foreground" />
                    <select
                      className="text-xs border border-border rounded px-2 py-1.5 bg-background"
                      value={expenseFilterMonth}
                      onChange={(e) => setExpenseFilterMonth(e.target.value)}
                      data-ocid="finance.expense_month.select"
                    >
                      <option value="">সব মাস</option>
                      <option value="1">জানুয়ারি</option>
                      <option value="2">ফেব্রুয়ারি</option>
                      <option value="3">মার্চ</option>
                      <option value="4">এপ্রিল</option>
                      <option value="5">মে</option>
                      <option value="6">জুন</option>
                      <option value="7">জুলাই</option>
                      <option value="8">আগস্ট</option>
                      <option value="9">সেপ্টেম্বর</option>
                      <option value="10">অক্টোবর</option>
                      <option value="11">নভেম্বর</option>
                      <option value="12">ডিসেম্বর</option>
                    </select>
                    <select
                      className="text-xs border border-border rounded px-2 py-1.5 bg-background"
                      value={expenseFilterYear}
                      onChange={(e) => setExpenseFilterYear(e.target.value)}
                      data-ocid="finance.expense_year.select"
                    >
                      <option value="">সব বছর</option>
                      <option value="2024">২০২৪</option>
                      <option value="2025">২০২৫</option>
                      <option value="2026">২০২৬</option>
                      <option value="2027">২০২৭</option>
                    </select>
                  </div>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExportExpensePDF()}
                      data-ocid="finance.export_expense_pdf.button"
                    >
                      <FileDown size={14} className="mr-1.5" />
                      PDF এক্সপোর্ট
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground">
                        ক্রমিক
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        তারিখ
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground">
                        খাত
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground">
                        বর্ণনা
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground">
                        একক
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground">
                        দর
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground">
                        দাম
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground">
                        এডিট/মুছুন
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((e, i) => (
                      <tr
                        key={e.id}
                        className="border-b border-border last:border-0 hover:bg-muted/20"
                        data-ocid={`finance.expense.item.${i + 1}`}
                      >
                        <td className="py-2.5 px-3 text-muted-foreground">
                          {e.serial}
                        </td>
                        <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap">
                          {e.date
                            ? new Date(e.date).toLocaleDateString("bn-BD")
                            : "—"}
                        </td>
                        <td className="py-2.5 px-3 font-medium">
                          {e.category}
                        </td>
                        <td className="py-2.5 px-3 text-muted-foreground">
                          {e.description || "—"}
                        </td>
                        <td className="py-2.5 px-3 text-muted-foreground">
                          {e.unit || "—"}
                        </td>
                        <td className="py-2.5 px-3 text-muted-foreground">
                          {e.rate > 0 ? `৳${e.rate.toLocaleString()}` : "—"}
                        </td>
                        <td className="py-2.5 px-3 font-medium text-destructive">
                          ৳{e.amount.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-1">
                            {isAdmin && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => openEditExpense(e)}
                                data-ocid={`finance.expense_edit_button.${i + 1}`}
                              >
                                <Pencil size={13} />
                              </Button>
                            )}
                            {isAdmin && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                                onClick={() => {
                                  deleteExpense(e.id);
                                  toast.success("ব্যয় মুছে ফেলা হয়েছে");
                                }}
                                data-ocid={`finance.expense_delete_button.${i + 1}`}
                              >
                                <Trash2 size={13} />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {expenses.length > 0 && (
                    <tfoot>
                      <tr className="border-t-2 border-border bg-muted/40">
                        <td colSpan={6} className="py-3 px-3 font-bold">
                          মোট ব্যয়
                        </td>
                        <td className="py-3 px-3 font-bold text-destructive">
                          ৳{totalExpenses.toLocaleString()}
                        </td>
                        <td />
                      </tr>
                    </tfoot>
                  )}
                </table>
                {expensesLoading && (
                  <p
                    className="text-center text-muted-foreground py-12 flex items-center justify-center gap-2"
                    data-ocid="finance.expense.loading_state"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    ব্যয়ের তথ্য লোড হচ্ছে...
                  </p>
                )}
                {!expensesLoading && expenses.length === 0 && (
                  <p
                    className="text-center text-muted-foreground py-12"
                    data-ocid="finance.expense.empty_state"
                  >
                    কোনো ব্যয় যুক্ত হয়নি
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========== TAB 3: COMBINED EXPORT ========== */}
        <TabsContent value="combined" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card
              className="shadow-card border-border"
              data-ocid="finance.combined_fee.card"
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      মোট সংযোগ ফি
                    </p>
                    <p className="text-2xl font-bold text-teal-600">
                      ৳{totalConnectionFeeCash.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-teal-500/10">
                    <Banknote className="w-5 h-5 text-teal-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card
              className="shadow-card border-border"
              data-ocid="finance.combined_commission.card"
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      মোট কমিশন
                    </p>
                    <p className="text-2xl font-bold text-success">
                      ৳{totalCommission.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-success/10">
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card
              className="shadow-card border-border"
              data-ocid="finance.combined_income.card"
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">মোট আয়</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ৳
                      {(
                        totalConnectionFeeCash + totalCommission
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-500/10">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card
              className="shadow-card border-border"
              data-ocid="finance.combined_expense.card"
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      মোট ব্যয়
                    </p>
                    <p className="text-2xl font-bold text-destructive">
                      ৳{totalExpenses.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-destructive/10">
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card
              className="shadow-card border-border"
              data-ocid="finance.combined_net.card"
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">নিট আয়</p>
                    <p
                      className={`text-2xl font-bold ${(totalConnectionFeeCash + totalCommission - totalExpenses) >= 0 ? "text-purple-600" : "text-destructive"}`}
                    >
                      ৳
                      {(
                        totalConnectionFeeCash +
                        totalCommission -
                        totalExpenses
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-purple-500/10">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Card */}
          <Card
            className="shadow-card border-border"
            data-ocid="finance.combined_export.card"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">
                সম্মিলিত PDF এক্সপোর্ট
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                আয় (সংযোগ ফি + কমিশন) ও ব্যয় একসাথে একটি PDF ফাইলে এক্সপোর্ট করুন। মাস
                ও বছর অনুযায়ী ফিল্টার করা যাবে।
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-muted-foreground" />
                  <select
                    className="text-xs border border-border rounded px-2 py-1.5 bg-background"
                    value={combinedFilterMonth}
                    onChange={(e) => setCombinedFilterMonth(e.target.value)}
                    data-ocid="finance.combined_month.select"
                  >
                    <option value="">সব মাস</option>
                    <option value="1">জানুয়ারি</option>
                    <option value="2">ফেব্রুয়ারি</option>
                    <option value="3">মার্চ</option>
                    <option value="4">এপ্রিল</option>
                    <option value="5">মে</option>
                    <option value="6">জুন</option>
                    <option value="7">জুলাই</option>
                    <option value="8">আগস্ট</option>
                    <option value="9">সেপ্টেম্বর</option>
                    <option value="10">অক্টোবর</option>
                    <option value="11">নভেম্বর</option>
                    <option value="12">ডিসেম্বর</option>
                  </select>
                  <select
                    className="text-xs border border-border rounded px-2 py-1.5 bg-background"
                    value={combinedFilterYear}
                    onChange={(e) => setCombinedFilterYear(e.target.value)}
                    data-ocid="finance.combined_year.select"
                  >
                    <option value="">সব বছর</option>
                    <option value="2024">২০২৪</option>
                    <option value="2025">২০২৫</option>
                    <option value="2026">২০২৬</option>
                    <option value="2027">২০২৭</option>
                  </select>
                </div>
                <Button
                  onClick={handleExportCombinedPDF}
                  className="bg-primary text-white"
                  data-ocid="finance.combined_export.primary_button"
                >
                  <FileDown size={15} className="mr-1.5" />
                  সম্মিলিত PDF এক্সপোর্ট
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Customer Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="finance.edit_dialog"
        >
          <DialogHeader>
            <DialogTitle>গ্রাহক তথ্য সম্পাদনা</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs">ইউজার নেম / আইডি *</Label>
              <Input
                value={editForm.username}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, username: e.target.value }))
                }
                placeholder="user001"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">পাসওয়ার্ড</Label>
              <div className="relative">
                <Input
                  type={showFormPassword ? "text" : "password"}
                  value={editForm.password}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, password: e.target.value }))
                  }
                  placeholder="পাসওয়ার্ড"
                  className="pr-9"
                />
                <button
                  type="button"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowFormPassword(!showFormPassword)}
                >
                  {showFormPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">মোবাইল নম্বর *</Label>
              <Input
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="০১৭..."
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">কার্নিভাল আইডি</Label>
              <Input
                value={editForm.carnivalId}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, carnivalId: e.target.value }))
                }
                placeholder="CRN-001"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">সিআইডি নম্বর</Label>
              <Input
                value={editForm.cidNumber}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, cidNumber: e.target.value }))
                }
                placeholder="277465"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">গ্রাম</Label>
              <Select
                value={editForm.village}
                onValueChange={(v) =>
                  setEditForm((p) => ({ ...p, village: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="গ্রাম নির্বাচন" />
                </SelectTrigger>
                <SelectContent>
                  {VILLAGES.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">সংযোগের তারিখ</Label>
              <Input
                type="date"
                value={editForm.connectionDate}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, connectionDate: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">প্যাকেজ</Label>
              <Select
                value={editForm.packageId}
                onValueChange={(v) => {
                  const selectedPkg = allPackages.find(
                    (p) => p.id.toString() === v,
                  );
                  setEditForm((p) => ({
                    ...p,
                    packageId: v,
                    monthlyFee: selectedPkg
                      ? selectedPkg.monthlyPrice.toString()
                      : p.monthlyFee,
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="প্যাকেজ নির্বাচন" />
                </SelectTrigger>
                <SelectContent>
                  {allPackages.map((p) => (
                    <SelectItem key={p.id.toString()} value={p.id.toString()}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">মাসিক বিল (৳)</Label>
              <Input
                type="number"
                value={editForm.monthlyFee}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, monthlyFee: e.target.value }))
                }
                placeholder="৬০০"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">সংযোগ ফি নগদ (৳)</Label>
              <Input
                type="number"
                value={editForm.connectionFeeCash}
                onChange={(e) =>
                  setEditForm((p) => ({
                    ...p,
                    connectionFeeCash: e.target.value,
                  }))
                }
                placeholder="১০০০"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">সংযোগ ফি বকেয়া (৳)</Label>
              <Input
                type="number"
                value={editForm.connectionFeeDue}
                onChange={(e) =>
                  setEditForm((p) => ({
                    ...p,
                    connectionFeeDue: e.target.value,
                  }))
                }
                placeholder="০"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">কমিশন হার</Label>
              <Select
                value={editForm.commissionPercent}
                onValueChange={(v) =>
                  setEditForm((p) => ({ ...p, commissionPercent: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="কমিশন নির্বাচন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">৩০%</SelectItem>
                  <SelectItem value="40">৪০%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditOpen(false)}
              data-ocid="finance.edit_dialog.cancel_button"
            >
              বাতিল
            </Button>
            <Button
              className="bg-primary text-white"
              onClick={handleEditSave}
              disabled={saving}
              data-ocid="finance.edit_dialog.confirm_button"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              আপডেট করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Expense Edit Dialog */}
      <Dialog open={editExpenseOpen} onOpenChange={setEditExpenseOpen}>
        <DialogContent
          className="max-w-lg"
          data-ocid="finance.edit_expense_dialog"
        >
          <DialogHeader>
            <DialogTitle>ব্যয় সম্পাদনা</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            {/* Date */}
            <div className="space-y-1.5 col-span-2">
              <Label className="text-xs">তারিখ *</Label>
              <Input
                type="date"
                value={editExpenseForm.date}
                onChange={(e) =>
                  setEditExpenseForm((p) => ({ ...p, date: e.target.value }))
                }
                data-ocid="finance.edit_expense_date.input"
              />
            </div>
            {/* Category */}
            <div className="space-y-1.5 col-span-2">
              <Label className="text-xs">ব্যয়ের খাত *</Label>
              <Select
                value={editExpenseForm.category}
                onValueChange={(v) =>
                  setEditExpenseForm((p) => ({
                    ...p,
                    category: v,
                    customCategory: v === "__custom__" ? p.customCategory : "",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="খাত নির্বাচন" />
                </SelectTrigger>
                <SelectContent>
                  {DEFAULT_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                  <SelectItem value="__custom__">+ নতুন খাত যুক্ত করুন</SelectItem>
                </SelectContent>
              </Select>
              {editExpenseForm.category === "__custom__" && (
                <Input
                  className="mt-1.5"
                  placeholder="নতুন খাতের নাম"
                  value={editExpenseForm.customCategory}
                  onChange={(e) =>
                    setEditExpenseForm((p) => ({
                      ...p,
                      customCategory: e.target.value,
                    }))
                  }
                />
              )}
            </div>
            {/* Description */}
            <div className="space-y-1.5 col-span-2">
              <Label className="text-xs">বর্ণনা</Label>
              <Input
                placeholder="বর্ণনা লিখুন"
                value={editExpenseForm.description}
                onChange={(e) =>
                  setEditExpenseForm((p) => ({
                    ...p,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            {/* Unit */}
            <div className="space-y-1.5">
              <Label className="text-xs">একক</Label>
              <Select
                value={editExpenseForm.unit}
                onValueChange={(v) =>
                  setEditExpenseForm((p) => ({
                    ...p,
                    unit: v,
                    customUnit: v === "__custom__" ? p.customUnit : "",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="একক নির্বাচন" />
                </SelectTrigger>
                <SelectContent>
                  {DEFAULT_UNITS.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                  <SelectItem value="__custom__">+ নতুন একক</SelectItem>
                </SelectContent>
              </Select>
              {editExpenseForm.unit === "__custom__" && (
                <Input
                  className="mt-1.5"
                  placeholder="নতুন এককের নাম"
                  value={editExpenseForm.customUnit}
                  onChange={(e) =>
                    setEditExpenseForm((p) => ({
                      ...p,
                      customUnit: e.target.value,
                    }))
                  }
                />
              )}
            </div>
            {/* Rate */}
            <div className="space-y-1.5">
              <Label className="text-xs">দর (Rate)</Label>
              <Input
                type="number"
                placeholder="দর"
                value={editExpenseForm.rate}
                onChange={(e) =>
                  handleExpenseFormChange(
                    "rate",
                    e.target.value,
                    editExpenseForm,
                    setEditExpenseForm,
                  )
                }
              />
            </div>
            {/* Amount */}
            <div className="space-y-1.5 col-span-2">
              <Label className="text-xs">দাম (Amount) *</Label>
              <Input
                type="number"
                placeholder="দাম"
                value={editExpenseForm.amount}
                onChange={(e) =>
                  setEditExpenseForm((p) => ({
                    ...p,
                    amount: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditExpenseOpen(false)}
              data-ocid="finance.edit_expense_dialog.cancel_button"
            >
              বাতিল
            </Button>
            <Button
              onClick={handleEditExpenseSave}
              data-ocid="finance.edit_expense_dialog.confirm_button"
            >
              আপডেট করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
