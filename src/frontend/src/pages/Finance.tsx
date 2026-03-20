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
import {
  DollarSign,
  Eye,
  EyeOff,
  FileDown,
  Loader2,
  Pencil,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { VILLAGES } from "../data/sampleData";
import { useCompanySettings } from "../hooks/useCompanySettings";
import { useLocalCustomers } from "../hooks/useLocalCustomers";
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

interface EditFormData {
  username: string;
  password: string;
  phone: string;
  carnivalId: string;
  cidNumber: string;
  village: string;
  monthlyFee: string;
  connectionDate: string;
  connectionFeeCash: string;
  connectionFeeDue: string;
  commissionPercent: string;
}

export default function Finance() {
  const { customers: allCustomers, updateCustomer } = useLocalCustomers();
  const { settings } = useCompanySettings();

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
    monthlyFee: "600",
    connectionDate: "",
    connectionFeeCash: "",
    connectionFeeDue: "0",
    commissionPercent: "30",
  });
  const [saving, setSaving] = useState(false);
  const [showFormPassword, setShowFormPassword] = useState(false);

  const totalConnectionFeeDue = allCustomers.reduce(
    (sum, c) => sum + c.connectionFeeDue,
    0,
  );
  const expectedMonthly = allCustomers.reduce(
    (sum, c) => sum + c.monthlyFee,
    0,
  );

  const totalCommission = allCustomers.reduce((sum, c) => {
    const periods = completedPeriods(c.connectionDate);
    return (
      sum +
      periods * Math.round((c.monthlyFee * (c.commissionPercent ?? 30)) / 100)
    );
  }, 0);

  function openEdit(c: ExtendedCustomer) {
    setEditingCustomer(c);
    setEditForm({
      username: c.username,
      password: c.password,
      phone: c.phone,
      carnivalId: c.carnivalId,
      cidNumber: c.cidNumber,
      village: c.village,
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
      monthlyFee: Number.parseInt(editForm.monthlyFee) || 600,
      connectionDate:
        BigInt(new Date(editForm.connectionDate).getTime()) * 1000000n,
      connectionFeeCash: Number.parseInt(editForm.connectionFeeCash) || 0,
      connectionFeeDue: Number.parseInt(editForm.connectionFeeDue) || 0,
      commissionPercent: Number.parseInt(editForm.commissionPercent) || 30,
    });
    setSaving(false);
    setEditOpen(false);
    toast.success("গ্রাহকের তথ্য আপডেট করা হয়েছে");
  }

  function handleExportFinancePDF() {
    const rows = allCustomers
      .map((c, i) => {
        const periods = completedPeriods(c.connectionDate);
        const commission =
          periods *
          Math.round((c.monthlyFee * (c.commissionPercent ?? 30)) / 100);
        return `
      <tr>
        <td>${i + 1}</td>
        <td>${c.username}</td>
        <td>${c.connectionFeeCash > 0 ? `৳${c.connectionFeeCash.toLocaleString()}` : "—"}</td>
        <td>${c.connectionFeeDue > 0 ? `৳${c.connectionFeeDue.toLocaleString()}` : "০"}</td>
        <td>${c.monthlyFee} টাকা/মাস</td>
        <td>৳${c.monthlyFee.toLocaleString()}</td>
        <td>${periods > 0 ? `৳${commission.toLocaleString()} (${c.commissionPercent}% × ${periods} মাস)` : "—"}</td>
      </tr>`;
      })
      .join("");
    const bodyHTML = `
      <table>
        <thead>
          <tr>
            <th>ক্রমিক</th>
            <th>ইউজার নেম/ইউজার আইডি</th>
            <th>সংযোগ ফি নগদ</th>
            <th>সংযোগ ফি বকেয়া</th>
            <th>প্যাকেজ</th>
            <th>মাসিক বিল</th>
            <th>কমিশন</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr>
            <td colspan="2">মোট</td>
            <td>৳${allCustomers.reduce((s, c) => s + c.connectionFeeCash, 0).toLocaleString()}</td>
            <td>৳${totalConnectionFeeDue.toLocaleString()}</td>
            <td></td>
            <td>৳${expectedMonthly.toLocaleString()}</td>
            <td>৳${totalCommission.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>`;
    printDocument("গ্রাহক আর্থিক তথ্য রিপোর্ট", bodyHTML, settings);
  }

  return (
    <div className="space-y-6" data-ocid="finance.page">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card
          className="shadow-card border-border"
          data-ocid="finance.customers.card"
        >
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-2">মোট গ্রাহক</p>
                <p className="text-3xl font-bold">{allCustomers.length} জন</p>
              </div>
              <div className="p-2.5 rounded-xl bg-primary/10">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="shadow-card border-border"
          data-ocid="finance.monthly.card"
        >
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  মাসিক বিল (মোট)
                </p>
                <p className="text-3xl font-bold">
                  ৳{expectedMonthly.toLocaleString()}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-primary/10">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="shadow-card border-border"
          data-ocid="finance.commission.card"
        >
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  মোট কমিশন (সঞ্চিত)
                </p>
                <p className="text-3xl font-bold text-success">
                  ৳{totalCommission.toLocaleString()}
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
        <CardHeader className="pb-4 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">
            গ্রাহক আর্থিক তথ্য
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportFinancePDF}
            data-ocid="finance.export_finance_pdf.button"
          >
            <FileDown size={14} className="mr-1.5" />
            PDF এক্সপোর্ট
          </Button>
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
                    সম্পূর্ণ মাস
                  </th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    কমিশন
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
                      <td className="py-2.5 px-3 font-medium">{c.username}</td>
                      <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap">
                        {formatDate(c.connectionDate)}
                      </td>
                      <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap">
                        {c.monthlyFee} টাকা/মাস
                      </td>
                      <td className="py-2.5 px-3 font-medium">
                        ৳{c.monthlyFee.toLocaleString()}
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
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => openEdit(c)}
                          data-ocid={`finance.edit_button.${i + 1}`}
                        >
                          <Pencil size={13} />
                        </Button>
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

      {/* Edit Dialog */}
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
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              বাতিল
            </Button>
            <Button
              className="bg-primary text-white"
              onClick={handleEditSave}
              disabled={saving}
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              আপডেট করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
