import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  FileDown,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ServiceStatus } from "../backend";
import { normalizeAddress, toTitleCase } from "../data/addressNormalization";
import { VILLAGES } from "../data/sampleData";
import { useCompanySettings } from "../hooks/useCompanySettings";
import { useLocalCustomers } from "../hooks/useLocalCustomers";
import { usePackages } from "../hooks/useQueries";
import type { ExtendedCustomer } from "../types/extended";
import { printDocument } from "../utils/printDocument";

function formatDate(time: bigint): string {
  const ms = Number(time / 1000000n);
  return new Date(ms).toLocaleDateString("bn-BD");
}

function toDateInputValue(time: bigint): string {
  const ms = Number(time / 1000000n);
  return new Date(ms).toISOString().split("T")[0];
}

interface CustomerFormData {
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

interface BulkRow {
  username: string;
  password: string;
  phone: string;
  carnivalId: string;
  cidNumber: string;
  village: string;
  address: string;
  packageName: string;
  monthlyFee: string;
  connectionDate: string;
  commissionPercent: string;
  valid: boolean;
  error?: string;
}

const todayStr = new Date().toISOString().split("T")[0];

const emptyForm: CustomerFormData = {
  username: "",
  password: "",
  phone: "",
  carnivalId: "",
  cidNumber: "",
  village: "",
  packageId: "1",
  monthlyFee: "600",
  connectionDate: todayStr,
  connectionFeeCash: "",
  connectionFeeDue: "0",
  commissionPercent: "30",
};

const BULK_FORMAT_HINT = `প্রতিটি লাইনে একজন গ্রাহকের তথ্য দিন। কলামগুলো পাইপ (|), ট্যাব (Excel থেকে কপি) বা কমা দিয়ে আলাদা করুন:

ইউজার নেম | পাসওয়ার্ড | মোবাইল | কার্নিভাল আইডি | সিআইডি | গ্রাম | প্যাকেজ | মাসিক বিল | তারিখ (YYYY-MM-DD) | কমিশন%

উদাহরণ:
Md Jalal Miah | ja4321 | 01311411152 | 1279832 | 277465 | Baligaw Islampara | 20 Mbps | 840 | 2026-03-08

নোট: পাসওয়ার্ড বা কার্নিভাল আইডি না থাকলে — (ড্যাশ) লিখুন বা খালি রাখুন।
নামের বড়/ছোট হাতের বিষয় সিস্টেম স্বয়ংক্রিয়ভাবে ঠিক করে নেবে।
ঠিকানায় পাড়া আগে ও গ্রাম পরে না থাকলেও সিস্টেম স্বয়ংক্রিয়ভাবে সংশোধন করবে।`;

function parseBulkText(text: string): BulkRow[] {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .filter(
      (l) =>
        !l.startsWith("---") &&
        !l.startsWith("ইউজার নেম") &&
        !l.match(/^[-\s|]+$/),
    );

  return lines.map((line) => {
    let cols: string[];
    if (line.includes("|")) {
      cols = line.split("|").map((c) => c.trim().replace(/^—$|^-$/, ""));
    } else if (line.includes("\t")) {
      cols = line.split("\t").map((c) => c.trim().replace(/^—$|^-$/, ""));
    } else {
      cols = line.split(",").map((c) => c.trim().replace(/^—$|^-$/, ""));
    }
    const get = (i: number) => (cols[i] ?? "").replace(/^—$/, "").trim();

    // Auto title-case the name
    const username = toTitleCase(get(0));
    const password = get(1);
    const phone = get(2);
    const carnivalId = get(3);
    const cidNumber = get(4);

    // Normalize address: village + para → "Para, Village"
    const rawAddr = get(5);
    const { village, address } = normalizeAddress(rawAddr);

    const packageName = get(6);
    const monthlyFee = get(7);
    const connectionDate = get(8) || todayStr;
    const commissionPercent = get(9) || "30";

    let error: string | undefined;
    if (!username) error = "ইউজার নেম নেই";
    else if (!phone) error = "মোবাইল নম্বর নেই";

    return {
      username,
      password,
      phone,
      carnivalId,
      cidNumber,
      village,
      address,
      packageName,
      monthlyFee,
      connectionDate,
      commissionPercent,
      valid: !error,
      error,
    };
  });
}

interface CustomersProps {
  isAdmin?: boolean;
}
export default function Customers({ isAdmin = false }: CustomersProps) {
  const {
    customers: rawLocalCustomers,
    addCustomers,
    updateCustomer,
    deleteCustomer,
  } = useLocalCustomers();
  const { data: packages } = usePackages();
  const { settings } = useCompanySettings();
  const isLoading = false;

  const allCustomers = rawLocalCustomers;
  const allPackages = packages ?? [];

  const [search, setSearch] = useState("");
  const [selectedVillages, setSelectedVillages] = useState<Set<string>>(
    new Set(),
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] =
    useState<ExtendedCustomer | null>(null);
  const [form, setForm] = useState<CustomerFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showFormPassword, setShowFormPassword] = useState(false);

  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [bulkRows, setBulkRows] = useState<BulkRow[]>([]);
  const [bulkStep, setBulkStep] = useState<"input" | "preview">("input");
  const [bulkImporting, setBulkImporting] = useState(false);

  function toggleVillage(v: string) {
    setSelectedVillages((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  }

  const filtered = allCustomers.filter((c) => {
    const matchSearch =
      c.username.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.carnivalId.toLowerCase().includes(search.toLowerCase()) ||
      c.cidNumber.toLowerCase().includes(search.toLowerCase());
    const matchVillage =
      selectedVillages.size === 0 || selectedVillages.has(c.village);
    return matchSearch && matchVillage;
  });

  function openAdd() {
    setEditingCustomer(null);
    setForm(emptyForm);
    setShowFormPassword(false);
    setModalOpen(true);
  }

  function openEdit(c: ExtendedCustomer) {
    setEditingCustomer(c);
    setForm({
      username: c.username,
      password: c.password,
      phone: c.phone,
      carnivalId: c.carnivalId,
      cidNumber: c.cidNumber,
      village: c.village,
      packageId: c.packageId.toString(),
      monthlyFee: c.monthlyFee.toString(),
      connectionDate: toDateInputValue(c.connectionDate),
      connectionFeeCash: c.connectionFeeCash
        ? c.connectionFeeCash.toString()
        : "",
      connectionFeeDue: c.connectionFeeDue.toString(),
      commissionPercent: (c.commissionPercent ?? 30).toString(),
    });
    setShowFormPassword(false);
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    // Auto title-case name; auto-normalize address order
    const cleanName = toTitleCase(form.username);
    const { village: resolvedVillage, address: resolvedAddress } = form.village
      ? { village: form.village, address: form.village }
      : { village: "", address: "" };

    if (editingCustomer) {
      updateCustomer({
        ...editingCustomer,
        username: cleanName,
        name: cleanName,
        password: form.password,
        phone: form.phone,
        carnivalId: form.carnivalId,
        cidNumber: form.cidNumber,
        village: resolvedVillage,
        area: resolvedVillage,
        address: resolvedAddress,
        packageId: BigInt(form.packageId),
        monthlyFee: Number.parseInt(form.monthlyFee) || 600,
        connectionDate:
          BigInt(new Date(form.connectionDate).getTime()) * 1000000n,
        connectionFeeCash: form.connectionFeeCash
          ? Number.parseInt(form.connectionFeeCash)
          : 0,
        connectionFeeDue: Number.parseInt(form.connectionFeeDue) || 0,
        commissionPercent: Number.parseInt(form.commissionPercent) || 30,
      });
    } else {
      addCustomers([
        {
          id: 0n,
          name: cleanName,
          username: cleanName,
          password: form.password,
          phone: form.phone,
          email: "",
          carnivalId: form.carnivalId,
          cidNumber: form.cidNumber,
          village: resolvedVillage,
          area: resolvedVillage,
          address: resolvedAddress,
          packageId: BigInt(form.packageId),
          monthlyFee: Number.parseInt(form.monthlyFee) || 600,
          dueAmount: 0,
          status: ServiceStatus.active,
          connectionDate:
            BigInt(new Date(form.connectionDate).getTime()) * 1000000n,
          connectionFeeCash: form.connectionFeeCash
            ? Number.parseInt(form.connectionFeeCash)
            : 0,
          connectionFeeDue: Number.parseInt(form.connectionFeeDue) || 0,
          commissionPercent: Number.parseInt(form.commissionPercent) || 30,
        },
      ]);
    }
    setSaving(false);
    setModalOpen(false);
    toast.success(
      editingCustomer ? "গ্রাহক আপডেট করা হয়েছে" : "নতুন গ্রাহক যোগ করা হয়েছে",
    );
  }

  function handleDelete(c: ExtendedCustomer) {
    deleteCustomer(c.id);
    toast.success(`${c.username} মুছে ফেলা হয়েছে`);
  }

  const pkg = (id: bigint) => allPackages.find((p) => p.id === id);

  function handleExportPDF() {
    const villageLabel =
      selectedVillages.size > 0
        ? Array.from(selectedVillages).join(", ")
        : "সকল গ্রাম";
    const title = `গ্রাহক তালিকা — ${villageLabel}`;
    const rows = filtered
      .map(
        (c, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${formatDate(c.connectionDate)}</td>
        <td>${c.username}</td>
        <td>${c.carnivalId}</td>
        <td>${c.cidNumber}</td>
        <td>${c.phone}</td>
        <td>${c.address || c.village}</td>
        <td>${pkg(c.packageId)?.name ?? ""}</td>
      </tr>`,
      )
      .join("");
    const bodyHTML = `
      <table>
        <thead>
          <tr>
            <th>ক্রমিক</th>
            <th>সংযোগের তারিখ</th>
            <th>ইউজার নেম/আইডি</th>
            <th>কার্নিভাল আইডি</th>
            <th>সিআইডি নম্বর</th>
            <th>মোবাইল নম্বর</th>
            <th>ঠিকানা</th>
            <th>প্যাকেজ</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr><td colspan="8">মোট গ্রাহক: ${filtered.length} জন</td></tr>
        </tfoot>
      </table>`;
    printDocument(title, bodyHTML, settings);
  }

  function handleBulkParse() {
    if (!bulkText.trim()) {
      toast.error("কোনো তথ্য পেস্ট করা হয়নি");
      return;
    }
    const rows = parseBulkText(bulkText);
    if (rows.length === 0) {
      toast.error("কোনো গ্রাহক তথ্য পাওয়া যায়নি");
      return;
    }
    setBulkRows(rows);
    setBulkStep("preview");
  }

  async function handleBulkImport() {
    const validRows = bulkRows.filter((r) => r.valid);
    if (validRows.length === 0) {
      toast.error("কোনো বৈধ তথ্য নেই");
      return;
    }
    setBulkImporting(true);
    const mapped: ExtendedCustomer[] = validRows.map((row) => ({
      id: 0n,
      name: row.username,
      phone: row.phone,
      email: "",
      area: row.village,
      address: row.address,
      packageId: 1n,
      monthlyFee: Number.parseInt(row.monthlyFee) || 600,
      dueAmount: 0,
      status: ServiceStatus.active,
      connectionDate: row.connectionDate
        ? BigInt(new Date(row.connectionDate).getTime()) * 1000000n
        : BigInt(Date.now()) * 1000000n,
      username: row.username,
      password: row.password,
      carnivalId: row.carnivalId,
      cidNumber: row.cidNumber,
      connectionFeeCash: 0,
      connectionFeeDue: 0,
      village: row.village,
      commissionPercent: Number.parseInt(row.commissionPercent) || 30,
    }));
    addCustomers(mapped);
    setBulkImporting(false);
    setBulkOpen(false);
    setBulkText("");
    setBulkRows([]);
    setBulkStep("input");
    toast.success(`${validRows.length} জন গ্রাহক সফলভাবে যোগ করা হয়েছে`);
  }

  function closeBulkModal() {
    setBulkOpen(false);
    setBulkText("");
    setBulkRows([]);
    setBulkStep("input");
  }

  const validCount = bulkRows.filter((r) => r.valid).length;
  const invalidCount = bulkRows.filter((r) => !r.valid).length;

  return (
    <div className="space-y-4" data-ocid="customers.page">
      {/* Village filter */}
      <div className="flex flex-wrap gap-4 items-center bg-muted/30 border border-border rounded-lg px-4 py-3">
        {VILLAGES.map((v) => (
          <div
            key={v}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <Checkbox
              checked={selectedVillages.has(v)}
              onCheckedChange={() => toggleVillage(v)}
              className="h-4 w-4"
            />
            <span className="text-sm font-medium">{v}</span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={15}
          />
          <Input
            data-ocid="customers.search_input"
            placeholder="ইউজার নেম, ফোন বা কার্নিভাল আইডি..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {isAdmin && (
            <Button
              variant="outline"
              onClick={handleExportPDF}
              data-ocid="customers.export_pdf.button"
            >
              <FileDown size={16} className="mr-1.5" />
              PDF এক্সপোর্ট
            </Button>
          )}
          {isAdmin && (
            <Button
              variant="outline"
              onClick={() => setBulkOpen(true)}
              data-ocid="customers.bulk_import.button"
              className="border-primary/40 text-primary hover:bg-primary/10"
            >
              <Upload size={16} className="mr-1.5" />
              বাল্ক ইমপোর্ট
            </Button>
          )}
          {isAdmin && (
            <Button
              onClick={openAdd}
              className="bg-primary text-white"
              data-ocid="customers.add_button"
            >
              <Plus size={16} className="mr-1.5" />
              নতুন গ্রাহক
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <Card className="shadow-card border-border" data-ocid="customers.table">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3" data-ocid="customers.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      ক্রমিক
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      সংযোগের তারিখ
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      ইউজার নেম/আইডি
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        পাসওয়ার্ড
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff size={13} />
                          ) : (
                            <Eye size={13} />
                          )}
                        </button>
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      কার্নিভাল আইডি
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      সিআইডি নম্বর
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      মোবাইল নম্বর
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      ঠিকানা
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      প্যাকেজ
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      অ্যাকশন
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr
                      key={c.id.toString()}
                      className="border-b border-border last:border-0 hover:bg-muted/20"
                      data-ocid={`customers.item.${i + 1}`}
                    >
                      <td className="py-3 px-4 text-muted-foreground font-medium">
                        {i + 1}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                        {formatDate(c.connectionDate)}
                      </td>
                      <td className="py-3 px-4 font-medium">{c.username}</td>
                      <td className="py-3 px-4 font-mono text-muted-foreground">
                        {showPassword ? c.password : "••••••"}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {c.carnivalId}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {c.cidNumber}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                        {c.phone}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                        {c.address || c.village}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                        {pkg(c.packageId)?.name ?? "অজানা"}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1.5">
                          {isAdmin && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => openEdit(c)}
                              data-ocid={`customers.edit_button.${i + 1}`}
                            >
                              <Pencil size={13} />
                            </Button>
                          )}
                          {isAdmin && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(c)}
                              data-ocid={`customers.delete_button.${i + 1}`}
                            >
                              <Trash2 size={13} />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <p
                  className="text-center text-muted-foreground py-12"
                  data-ocid="customers.empty_state"
                >
                  কোনো গ্রাহক পাওয়া যায়নি
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Single Customer Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="customers.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editingCustomer ? "গ্রাহক সম্পাদনা" : "নতুন গ্রাহক যোগ"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs">সংযোগের তারিখ *</Label>
              <Input
                data-ocid="customers.connectiondate.input"
                type="date"
                value={form.connectionDate}
                onChange={(e) =>
                  setForm((p) => ({ ...p, connectionDate: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">সংযোগ ফি নগদ (৳)</Label>
              <Input
                data-ocid="customers.connectionfeecash.input"
                type="number"
                value={form.connectionFeeCash}
                onChange={(e) =>
                  setForm((p) => ({ ...p, connectionFeeCash: e.target.value }))
                }
                placeholder="খালি রাখুন বা পরিমাণ লিখুন"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">সংযোগ ফি বকেয়া (৳)</Label>
              <Input
                data-ocid="customers.connectionfeedue.input"
                type="number"
                value={form.connectionFeeDue}
                onChange={(e) =>
                  setForm((p) => ({ ...p, connectionFeeDue: e.target.value }))
                }
                placeholder="০"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">ইউজার নেম / ইউজার আইডি *</Label>
              <Input
                data-ocid="customers.username.input"
                value={form.username}
                onChange={(e) =>
                  setForm((p) => ({ ...p, username: e.target.value }))
                }
                placeholder="user001"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">ইউজার পাসওয়ার্ড *</Label>
              <div className="relative">
                <Input
                  data-ocid="customers.password.input"
                  type={showFormPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, password: e.target.value }))
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
              <Label className="text-xs">কার্নিভাল আইডি</Label>
              <Input
                data-ocid="customers.carnivalid.input"
                value={form.carnivalId}
                onChange={(e) =>
                  setForm((p) => ({ ...p, carnivalId: e.target.value }))
                }
                placeholder="CRN-001"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">সিআইডি নম্বর</Label>
              <Input
                data-ocid="customers.cidnumber.input"
                value={form.cidNumber}
                onChange={(e) =>
                  setForm((p) => ({ ...p, cidNumber: e.target.value }))
                }
                placeholder="CID-2024-001"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">মোবাইল নম্বর *</Label>
              <Input
                data-ocid="customers.phone.input"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="০১৭..."
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">ঠিকানা (গ্রাম)</Label>
              <Select
                value={form.village}
                onValueChange={(v) => setForm((p) => ({ ...p, village: v }))}
              >
                <SelectTrigger data-ocid="customers.village.select">
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
              <Label className="text-xs">প্যাকেজ</Label>
              <Select
                value={form.packageId}
                onValueChange={(v) => {
                  const selectedPkg = allPackages.find(
                    (p) => p.id.toString() === v,
                  );
                  setForm((p) => ({
                    ...p,
                    packageId: v,
                    monthlyFee: selectedPkg
                      ? selectedPkg.monthlyPrice.toString()
                      : p.monthlyFee,
                  }));
                }}
              >
                <SelectTrigger data-ocid="customers.package.select">
                  <SelectValue placeholder="প্যাকেজ নির্বাচন" />
                </SelectTrigger>
                <SelectContent>
                  {allPackages.map((p) => (
                    <SelectItem key={p.id.toString()} value={p.id.toString()}>
                      {p.name} ({p.speed})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">মাসিক বিল (৳)</Label>
              <Input
                data-ocid="customers.monthlyfee.input"
                type="number"
                value={form.monthlyFee}
                onChange={(e) =>
                  setForm((p) => ({ ...p, monthlyFee: e.target.value }))
                }
                placeholder="৬০০"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">কমিশন হার</Label>
              <Select
                value={form.commissionPercent}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, commissionPercent: v }))
                }
              >
                <SelectTrigger data-ocid="customers.commission.select">
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
              onClick={() => setModalOpen(false)}
              data-ocid="customers.cancel_button"
            >
              বাতিল
            </Button>
            <Button
              className="bg-primary text-white"
              onClick={handleSave}
              disabled={saving}
              data-ocid="customers.submit_button"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingCustomer ? "আপডেট করুন" : "যোগ করুন"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Import Modal */}
      <Dialog open={bulkOpen} onOpenChange={closeBulkModal}>
        <DialogContent
          className="max-w-3xl max-h-[90vh] overflow-y-auto"
          data-ocid="customers.bulk_dialog"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload size={18} className="text-primary" />
              বাল্ক গ্রাহক ইমপোর্ট
            </DialogTitle>
          </DialogHeader>

          {bulkStep === "input" && (
            <div className="space-y-4 py-2">
              <div className="bg-muted/40 border border-border rounded-lg p-4 text-xs text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground text-sm">
                  নির্দেশনা:
                </p>
                <pre className="whitespace-pre-wrap font-sans leading-relaxed">
                  {BULK_FORMAT_HINT}
                </pre>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  গ্রাহকের তথ্য এখানে পেস্ট করুন
                </Label>
                <Textarea
                  data-ocid="customers.bulk_textarea"
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder="এখানে গ্রাহক তথ্য পেস্ট করুন..."
                  rows={12}
                  className="font-mono text-xs"
                />
                {bulkText.trim() && (
                  <p className="text-xs text-muted-foreground">
                    আনুমানিক{" "}
                    {
                      bulkText
                        .trim()
                        .split("\n")
                        .filter((l) => l.trim()).length
                    }{" "}
                    টি লাইন পাওয়া গেছে
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={closeBulkModal}>
                  বাতিল
                </Button>
                <Button
                  className="bg-primary text-white"
                  onClick={handleBulkParse}
                  data-ocid="customers.bulk_parse.button"
                >
                  তথ্য যাচাই করুন
                </Button>
              </DialogFooter>
            </div>
          )}

          {bulkStep === "preview" && (
            <div className="space-y-4 py-2">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    {validCount} জন বৈধ
                  </span>
                </div>
                {invalidCount > 0 && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                    <AlertCircle size={16} className="text-red-500" />
                    <span className="text-sm font-medium text-red-600">
                      {invalidCount} টি ত্রুটিপূর্ণ
                    </span>
                  </div>
                )}
              </div>
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto max-h-96">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-muted/80">
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-semibold text-muted-foreground">
                          #
                        </th>
                        <th className="text-left py-2 px-3 font-semibold text-muted-foreground">
                          ইউজার নেম
                        </th>
                        <th className="text-left py-2 px-3 font-semibold text-muted-foreground">
                          মোবাইল
                        </th>
                        <th className="text-left py-2 px-3 font-semibold text-muted-foreground">
                          কার্নিভাল
                        </th>
                        <th className="text-left py-2 px-3 font-semibold text-muted-foreground">
                          সিআইডি
                        </th>
                        <th className="text-left py-2 px-3 font-semibold text-muted-foreground">
                          ঠিকানা
                        </th>
                        <th className="text-left py-2 px-3 font-semibold text-muted-foreground">
                          প্যাকেজ
                        </th>
                        <th className="text-left py-2 px-3 font-semibold text-muted-foreground">
                          বিল
                        </th>
                        <th className="text-left py-2 px-3 font-semibold text-muted-foreground">
                          অবস্থা
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkRows.map((row, i) => (
                        <tr
                          key={`${row.username}-${row.phone}-${i}`}
                          className={`border-b border-border last:border-0 ${row.valid ? "hover:bg-muted/20" : "bg-red-50/50"}`}
                        >
                          <td className="py-2 px-3 text-muted-foreground">
                            {i + 1}
                          </td>
                          <td className="py-2 px-3 font-medium">
                            {row.username || (
                              <span className="text-red-400">খালি</span>
                            )}
                          </td>
                          <td className="py-2 px-3 text-muted-foreground">
                            {row.phone || (
                              <span className="text-red-400">খালি</span>
                            )}
                          </td>
                          <td className="py-2 px-3 text-muted-foreground">
                            {row.carnivalId || "—"}
                          </td>
                          <td className="py-2 px-3 text-muted-foreground">
                            {row.cidNumber || "—"}
                          </td>
                          <td className="py-2 px-3 text-muted-foreground">
                            {row.address || "—"}
                          </td>
                          <td className="py-2 px-3 text-muted-foreground">
                            {row.packageName || "—"}
                          </td>
                          <td className="py-2 px-3 text-muted-foreground">
                            {row.monthlyFee ? `৳${row.monthlyFee}` : "—"}
                          </td>
                          <td className="py-2 px-3">
                            {row.valid ? (
                              <span className="inline-flex items-center gap-1 text-green-600">
                                <CheckCircle2 size={12} /> ঠিক আছে
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-red-500">
                                <AlertCircle size={12} /> {row.error}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setBulkStep("input")}>
                  পিছনে যান
                </Button>
                <Button variant="outline" onClick={closeBulkModal}>
                  বাতিল
                </Button>
                <Button
                  className="bg-primary text-white"
                  onClick={handleBulkImport}
                  disabled={bulkImporting || validCount === 0}
                  data-ocid="customers.bulk_confirm.button"
                >
                  {bulkImporting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus size={15} className="mr-1.5" />
                  )}
                  {validCount} জন গ্রাহক যোগ করুন
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
