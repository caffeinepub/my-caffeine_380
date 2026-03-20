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
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  DollarSign,
  FileDown,
  Loader2,
  Plus,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  sampleCustomers,
  samplePackages,
  samplePayments,
} from "../data/sampleData";
import { useCompanySettings } from "../hooks/useCompanySettings";
import { useCustomers, usePackages, usePayments } from "../hooks/useQueries";
import type { ExtendedCustomer } from "../types/extended";
import { printDocument } from "../utils/printDocument";

function formatDate(time: bigint): string {
  const ms = Number(time / 1000000n);
  return new Date(ms).toLocaleDateString("bn-BD");
}

/** Returns true if the customer's connection date is at least 30 days ago */
function hasCompletedOneMonth(connectionDate: bigint): boolean {
  const connectedMs = Number(connectionDate / 1000000n);
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  return Date.now() - connectedMs >= thirtyDaysMs;
}

export default function Finance() {
  const { data: payments, isLoading } = usePayments();
  const { data: customers } = useCustomers();
  const { data: packages } = usePackages();
  const { settings } = useCompanySettings();

  const allPayments =
    payments && payments.length > 0 ? payments : samplePayments;

  const rawCustomers =
    customers && customers.length > 0
      ? (customers as unknown as ExtendedCustomer[])
      : sampleCustomers;
  const allCustomers: ExtendedCustomer[] = rawCustomers.map((c) => ({
    ...c,
    username: c.username ?? "",
    carnivalId: c.carnivalId ?? "",
    cidNumber: c.cidNumber ?? "",
    connectionFeeCash: c.connectionFeeCash ?? 0,
    connectionFeeDue: c.connectionFeeDue ?? 0,
    commissionPercent: c.commissionPercent ?? 30,
  }));

  const allPackages =
    packages && packages.length > 0 ? packages : samplePackages;

  const pkg = (id: bigint) => allPackages.find((p) => p.id === id);

  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    customerId: "",
    amount: "",
    method: "বিকাশ",
    note: "",
  });

  const totalCollected = allPayments
    .filter((p) => p.month === 3n && p.year === 2026n)
    .reduce((sum, p) => sum + p.amount, 0);

  const totalConnectionFeeDue = allCustomers.reduce(
    (sum, c) => sum + c.connectionFeeDue,
    0,
  );
  const expectedMonthly = allCustomers.reduce(
    (sum, c) => sum + c.monthlyFee,
    0,
  );
  const _paymentRate =
    expectedMonthly > 0
      ? Math.round((totalCollected / expectedMonthly) * 100)
      : 0;

  // Commission: only for customers who have completed at least one month
  const totalCommission = allCustomers
    .filter((c) => hasCompletedOneMonth(c.connectionDate))
    .reduce(
      (sum, c) => sum + Math.round((c.monthlyFee * c.commissionPercent) / 100),
      0,
    );

  async function handleSave() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setModalOpen(false);
    toast.success("পেমেন্ট রেকর্ড করা হয়েছে");
    setForm({ customerId: "", amount: "", method: "বিকাশ", note: "" });
  }

  const customerName = (id: bigint) =>
    allCustomers.find((c) => c.id === id)?.name ?? "অজানা";

  const sortedPayments = [...allPayments].sort((a, b) =>
    Number(b.date - a.date),
  );

  function handleExportFinancePDF() {
    const rows = allCustomers
      .map((c, i) => {
        const p = pkg(c.packageId);
        const completed = hasCompletedOneMonth(c.connectionDate);
        const commission = completed
          ? Math.round((c.monthlyFee * c.commissionPercent) / 100)
          : 0;
        return `
      <tr>
        <td>${i + 1}</td>
        <td>${c.username}</td>
        <td>৳${c.connectionFeeCash.toLocaleString()}</td>
        <td>${c.connectionFeeDue > 0 ? `৳${c.connectionFeeDue.toLocaleString()}` : "০"}</td>
        <td>${p ? p.speed : "—"}</td>
        <td>৳${c.monthlyFee.toLocaleString()}</td>
        <td>${completed ? `৳${commission.toLocaleString()} (${c.commissionPercent}%)` : "—"}</td>
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

  function handleExportPaymentsPDF() {
    const rows = sortedPayments
      .map(
        (p) => `
      <tr>
        <td>#${p.id.toString()}</td>
        <td>${customerName(p.customerId)}</td>
        <td>৳${p.amount.toLocaleString()}</td>
        <td>${formatDate(p.date)}</td>
        <td>${p.paymentMethod}</td>
        <td>${p.month.toString()}/${p.year.toString()}</td>
      </tr>`,
      )
      .join("");
    const bodyHTML = `
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>গ্রাহক</th>
            <th>পরিমাণ</th>
            <th>তারিখ</th>
            <th>পদ্ধতি</th>
            <th>মাস/বছর</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr><td colspan="6">মোট পেমেন্ট: ${sortedPayments.length}টি</td></tr>
        </tfoot>
      </table>`;
    printDocument("পেমেন্ট ইতিহাস রিপোর্ট", bodyHTML, settings);
  }

  return (
    <div className="space-y-6" data-ocid="finance.page">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card
          className="shadow-card border-border"
          data-ocid="finance.collected.card"
        >
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  মাসিক সংগ্রহ (মার্চ)
                </p>
                <p className="text-3xl font-bold">
                  ৳{totalCollected.toLocaleString()}
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
          data-ocid="finance.due.card"
        >
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  সংযোগ ফি বকেয়া
                </p>
                <p className="text-3xl font-bold text-destructive">
                  ৳{totalConnectionFeeDue.toLocaleString()}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-destructive/10">
                <AlertCircle className="w-5 h-5 text-destructive" />
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
                <p className="text-xs text-muted-foreground mb-2">মোট কমিশন</p>
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

      {/* গ্রাহক আর্থিক তথ্য */}
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
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    ক্রমিক
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    ইউজার নেম/ইউজার আইডি
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    সংযোগ ফি নগদ
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    সংযোগ ফি বকেয়া
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    প্যাকেজ
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    মাসিক বিল
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    কমিশন
                  </th>
                </tr>
              </thead>
              <tbody>
                {allCustomers.map((c, i) => {
                  const p = pkg(c.packageId);
                  const completed = hasCompletedOneMonth(c.connectionDate);
                  const commission = completed
                    ? Math.round((c.monthlyFee * c.commissionPercent) / 100)
                    : 0;
                  return (
                    <tr
                      key={c.id.toString()}
                      className="border-b border-border last:border-0 hover:bg-muted/20"
                      data-ocid={`finance.customer.item.${i + 1}`}
                    >
                      <td className="py-3 px-4 text-muted-foreground">
                        {i + 1}
                      </td>
                      <td className="py-3 px-4 font-medium">{c.username}</td>
                      <td className="py-3 px-4 text-success font-medium">
                        ৳{c.connectionFeeCash.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        {c.connectionFeeDue > 0 ? (
                          <span className="text-destructive font-medium">
                            ৳{c.connectionFeeDue.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">০</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                        {p ? p.speed : "—"}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        ৳{c.monthlyFee.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        {completed ? (
                          <span className="text-success font-medium">
                            ৳{commission.toLocaleString()}
                            <span className="text-xs text-muted-foreground ml-1">
                              ({c.commissionPercent}%)
                            </span>
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            ১ মাস পূর্ণ হয়নি
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border bg-muted/40">
                  <td className="py-3 px-4 font-bold" colSpan={2}>
                    মোট
                  </td>
                  <td className="py-3 px-4 font-bold text-success">
                    ৳
                    {allCustomers
                      .reduce((s, c) => s + c.connectionFeeCash, 0)
                      .toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-bold text-destructive">
                    ৳{totalConnectionFeeDue.toLocaleString()}
                  </td>
                  <td className="py-3 px-4" />
                  <td className="py-3 px-4 font-bold">
                    ৳{expectedMonthly.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-bold text-success">
                    ৳{totalCommission.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card
        className="shadow-card border-border"
        data-ocid="finance.payment_history.card"
      >
        <CardHeader className="pb-4 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">
            পেমেন্ট ইতিহাস
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPaymentsPDF}
              data-ocid="finance.export_payments_pdf.button"
            >
              <FileDown size={14} className="mr-1.5" />
              PDF এক্সপোর্ট
            </Button>
            <Button
              className="bg-primary text-white"
              size="sm"
              onClick={() => setModalOpen(true)}
              data-ocid="finance.add_payment.button"
            >
              <Plus size={15} className="mr-1.5" />
              পেমেন্ট যোগ
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3" data-ocid="finance.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">
                      #
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">
                      গ্রাহক
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">
                      পরিমাণ
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">
                      তারিখ
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">
                      পদ্ধতি
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">
                      মাস/বছর
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPayments.map((p, i) => (
                    <tr
                      key={p.id.toString()}
                      className="border-b border-border last:border-0 hover:bg-muted/20"
                      data-ocid={`finance.payment.item.${i + 1}`}
                    >
                      <td className="py-3 px-4 text-muted-foreground">
                        #{p.id.toString()}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {customerName(p.customerId)}
                      </td>
                      <td className="py-3 px-4 font-medium text-success">
                        ৳{p.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {formatDate(p.date)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {p.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {p.month.toString()}/{p.year.toString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {sortedPayments.length === 0 && (
                <p
                  className="text-center text-muted-foreground py-12"
                  data-ocid="finance.payment_history.empty_state"
                >
                  কোনো পেমেন্ট পাওয়া যায়নি
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Payment Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent data-ocid="finance.dialog">
          <DialogHeader>
            <DialogTitle>পেমেন্ট রেকর্ড করুন</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs">গ্রাহক *</Label>
              <Select
                value={form.customerId}
                onValueChange={(v) => setForm((p) => ({ ...p, customerId: v }))}
              >
                <SelectTrigger data-ocid="finance.customer.select">
                  <SelectValue placeholder="গ্রাহক নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {allCustomers.map((c) => (
                    <SelectItem key={c.id.toString()} value={c.id.toString()}>
                      {c.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">পরিমাণ (৳) *</Label>
              <Input
                data-ocid="finance.amount.input"
                value={form.amount}
                onChange={(e) =>
                  setForm((p) => ({ ...p, amount: e.target.value }))
                }
                placeholder="৬০০"
                type="number"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">পেমেন্ট পদ্ধতি</Label>
              <Select
                value={form.method}
                onValueChange={(v) => setForm((p) => ({ ...p, method: v }))}
              >
                <SelectTrigger data-ocid="finance.method.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="বিকাশ">বিকাশ</SelectItem>
                  <SelectItem value="নগদ">নগদ</SelectItem>
                  <SelectItem value="রকেট">রকেট</SelectItem>
                  <SelectItem value="ব্যাংক">ব্যাংক</SelectItem>
                  <SelectItem value="ক্যাশ">ক্যাশ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
              data-ocid="finance.cancel_button"
            >
              বাতিল
            </Button>
            <Button
              className="bg-primary text-white"
              onClick={handleSave}
              disabled={saving}
              data-ocid="finance.submit_button"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              সংরক্ষণ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
