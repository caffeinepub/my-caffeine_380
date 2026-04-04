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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Pencil, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type {
  AdvanceRechargeDue,
  CommissionDue,
  ConnectionFeeDue,
  TechnicianSalaryDue,
  WholesalerDue,
  backendInterface,
} from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useCompanySettings } from "../hooks/useCompanySettings";
import { printDocument } from "../utils/printDocument";

const BANGLA_MONTHS = [
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

const CURRENT_YEAR = new Date().getFullYear();

function formatBanglaMonthDM(dateStr: string): string {
  const d = new Date(dateStr);
  return `${BANGLA_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function getDateFromBanglaMonth(banglaMonth: string): string {
  const parts = banglaMonth.trim().split(/\s+/);
  const monthName = parts[0];
  const year = parts[1] || String(new Date().getFullYear());
  const monthIdx = BANGLA_MONTHS.indexOf(monthName);
  const m = monthIdx >= 0 ? monthIdx + 1 : 1;
  return `${year}-${String(m).padStart(2, "0")}-01`;
}
const YEARS = Array.from({ length: 5 }, (_, i) => String(CURRENT_YEAR - 2 + i));

function formatCurrency(n: number) {
  return `৳${Number(n).toLocaleString("bn-BD")}`;
}

interface DebtManagementProps {
  isAdmin: boolean;
}

export default function DebtManagement({ isAdmin }: DebtManagementProps) {
  return (
    <div className="space-y-4" data-ocid="debts.page">
      <Tabs defaultValue="receivables">
        <TabsList className="mb-4" data-ocid="debts.tab">
          <TabsTrigger value="receivables" data-ocid="debts.receivables.tab">
            প্রাপ্য বকেয়া
          </TabsTrigger>
          <TabsTrigger value="payables" data-ocid="debts.payables.tab">
            প্রদেয় বকেয়া
          </TabsTrigger>
        </TabsList>

        <TabsContent value="receivables" className="space-y-6">
          <ConnectionFeeDuesSection isAdmin={isAdmin} />
          <CommissionDuesSection isAdmin={isAdmin} />
        </TabsContent>

        <TabsContent value="payables" className="space-y-6">
          <TechnicianSalarySection isAdmin={isAdmin} />
          <WholesalerDuesSection isAdmin={isAdmin} />
          <AdvanceRechargeDuesSection isAdmin={isAdmin} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 1. Connection Fee Dues
// ─────────────────────────────────────────────────────────
function ConnectionFeeDuesSection({ isAdmin }: { isAdmin: boolean }) {
  const { actor } = useActor();
  const { settings } = useCompanySettings();
  const [items, setItems] = useState<ConnectionFeeDue[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<ConnectionFeeDue | null>(null);
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterYear, setFilterYear] = useState("all");

  const [form, setForm] = useState({
    cidNumber: "",
    userName: "",
    mobile: "",
    address: "",
    dueMonth: "",
    dueAmount: "",
  });

  const load = useCallback(async (a: backendInterface) => {
    try {
      const data = await a.getConnectionFeeDues();
      setItems(data.sort((x, y) => Number(x.serial) - Number(y.serial)));
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (actor) load(actor);
  }, [actor, load]);

  function openAdd() {
    setEditItem(null);
    setForm({
      cidNumber: "",
      userName: "",
      mobile: "",
      address: "",
      dueMonth: "",
      dueAmount: "",
    });
    setDialogOpen(true);
  }

  function openEdit(item: ConnectionFeeDue) {
    setEditItem(item);
    setForm({
      cidNumber: item.cidNumber,
      userName: item.userName,
      mobile: item.mobile,
      address: item.address,
      dueMonth: item.dueMonth,
      dueAmount: String(item.dueAmount),
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!actor) return;
    const record: ConnectionFeeDue = {
      id: editItem?.id ?? crypto.randomUUID(),
      serial: editItem?.serial ?? BigInt(items.length + 1),
      cidNumber: form.cidNumber,
      userName: form.userName,
      mobile: form.mobile,
      address: form.address,
      dueMonth: form.dueMonth,
      dueAmount: Number(form.dueAmount),
      createdAt: editItem?.createdAt ?? BigInt(Date.now()),
    };
    try {
      if (editItem) {
        await actor.updateConnectionFeeDue(record);
        toast.success("আপডেট হয়েছে");
      } else {
        await actor.addConnectionFeeDue(record);
        toast.success("যুক্ত হয়েছে");
      }
      // Sync back to customer financials (update connectionFeeDue)
      try {
        const allFinancials = await actor.getCustomerFinancials();
        const existingFin = (
          allFinancials as Array<{
            cidNumber: string;
            connectionFeeCash: number;
            connectionFeeDue: number;
          }>
        ).find((f) => f.cidNumber === form.cidNumber);
        await actor.updateCustomerFinancial({
          cidNumber: form.cidNumber,
          connectionFeeCash: existingFin?.connectionFeeCash ?? 0,
          connectionFeeDue: Number(form.dueAmount),
        });
      } catch {
        // ignore sync errors silently
      }
      setDialogOpen(false);
      load(actor);
    } catch {
      toast.error("সমস্যা হয়েছে");
    }
  }

  async function handleDelete(id: string) {
    if (!actor || !confirm("মুছে ফেলবেন?")) return;
    try {
      await actor.deleteConnectionFeeDue(id);
      toast.success("মুছে ফেলা হয়েছে");
      load(actor);
    } catch {
      toast.error("সমস্যা হয়েছে");
    }
  }

  const filtered = items.filter((item) => {
    if (filterMonth !== "all" && !item.dueMonth.includes(filterMonth))
      return false;
    if (filterYear !== "all" && !item.dueMonth.includes(filterYear))
      return false;
    return true;
  });

  const total = filtered.reduce((s, i) => s + Number(i.dueAmount), 0);

  function handlePrint() {
    const rows = filtered
      .map(
        (item, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>${item.cidNumber}</td>
        <td>${item.userName}</td>
        <td>${item.mobile}</td>
        <td>${item.address}</td>
        <td>${item.dueMonth}</td>
        <td style="text-align:right;font-weight:bold">৳${Number(item.dueAmount).toLocaleString()}</td>
      </tr>`,
      )
      .join("");
    const body = `<table>
      <thead><tr>
        <th>ক্র.</th><th>সিআইডি</th><th>ইউজার নেম</th><th>মোবাইল</th><th>ঠিকানা</th><th>বকেয়া মাস</th><th>বকেয়া</th>
      </tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td colspan="6">মোট</td><td style="text-align:right">৳${total.toLocaleString()}</td></tr></tfoot>
    </table>`;
    printDocument("সংযোগ ফি বকেয়া তালিকা", body, settings);
  }

  return (
    <Card className="shadow-card" data-ocid="debts.connection_fee.card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-base">সংযোগ ফি বকেয়া</CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={filterMonth} onValueChange={setFilterMonth}>
              <SelectTrigger
                className="w-32 h-8 text-xs"
                data-ocid="debts.connection_fee.select"
              >
                <SelectValue placeholder="মাস" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব মাস</SelectItem>
                {BANGLA_MONTHS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger
                className="w-24 h-8 text-xs"
                data-ocid="debts.connection_fee.select"
              >
                <SelectValue placeholder="বছর" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব বছর</SelectItem>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1 text-xs"
              data-ocid="debts.connection_fee.upload_button"
              onClick={handlePrint}
            >
              <Download size={13} /> PDF
            </Button>
            {isAdmin && (
              <Button
                size="sm"
                className="h-8 gap-1 text-xs"
                data-ocid="debts.connection_fee.open_modal_button"
                onClick={openAdd}
              >
                <Plus size={13} /> যুক্ত করুন
              </Button>
            )}
          </div>
        </div>
        <p className="text-sm font-semibold text-orange-600 mt-2">
          মোট বকেয়া: {formatCurrency(total)}
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">ক্র.</TableHead>
              <TableHead className="text-xs">সিআইডি</TableHead>
              <TableHead className="text-xs">ইউজার নেম</TableHead>
              <TableHead className="text-xs">মোবাইল</TableHead>
              <TableHead className="text-xs">ঠিকানা</TableHead>
              <TableHead className="text-xs">বকেয়া মাস</TableHead>
              <TableHead className="text-xs text-right">বকেয়া</TableHead>
              {isAdmin && <TableHead className="text-xs">অ্যাকশন</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-sm py-6 text-muted-foreground"
                  data-ocid="debts.connection_fee.loading_state"
                >
                  লোড হচ্ছে...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow data-ocid="debts.connection_fee.empty_state">
                <TableCell
                  colSpan={8}
                  className="text-center text-sm py-6 text-muted-foreground"
                >
                  কোনো তথ্য নেই
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item, idx) => (
                <TableRow
                  key={item.id}
                  data-ocid={`debts.connection_fee.item.${idx + 1}`}
                >
                  <TableCell className="text-xs">{idx + 1}</TableCell>
                  <TableCell className="text-xs">{item.cidNumber}</TableCell>
                  <TableCell className="text-xs">{item.userName}</TableCell>
                  <TableCell className="text-xs">{item.mobile}</TableCell>
                  <TableCell className="text-xs">{item.address}</TableCell>
                  <TableCell className="text-xs">{item.dueMonth}</TableCell>
                  <TableCell className="text-xs text-right font-medium text-orange-600">
                    {formatCurrency(Number(item.dueAmount))}
                  </TableCell>
                  {isAdmin && (
                    <TableCell className="text-xs">
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          data-ocid={`debts.connection_fee.edit_button.${idx + 1}`}
                          onClick={() => openEdit(item)}
                        >
                          <Pencil size={11} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-destructive"
                          data-ocid={`debts.connection_fee.delete_button.${idx + 1}`}
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={11} />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
            {filtered.length > 0 && (
              <TableRow className="bg-muted/50 font-semibold">
                <TableCell colSpan={6} className="text-xs">
                  মোট
                </TableCell>
                <TableCell className="text-xs text-right text-orange-600">
                  {formatCurrency(total)}
                </TableCell>
                {isAdmin && <TableCell />}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-ocid="debts.connection_fee.dialog">
          <DialogHeader>
            <DialogTitle>
              {editItem ? "এডিট করুন" : "নতুন সংযোগ ফি বকেয়া"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">সিআইডি নম্বর</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  data-ocid="debts.connection_fee.input"
                  value={form.cidNumber}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, cidNumber: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">ইউজার নেম/আইডি</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  data-ocid="debts.connection_fee.input"
                  value={form.userName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, userName: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">মোবাইল নম্বর</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  data-ocid="debts.connection_fee.input"
                  value={form.mobile}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, mobile: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">ঠিকানা</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  data-ocid="debts.connection_fee.input"
                  value={form.address}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, address: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">কোন মাসের বকেয়া</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  placeholder="যেমন: জানুয়ারি ২০২৬"
                  data-ocid="debts.connection_fee.input"
                  value={form.dueMonth}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, dueMonth: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">বকেয়া (টাকা)</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  type="number"
                  data-ocid="debts.connection_fee.input"
                  value={form.dueAmount}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, dueAmount: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="debts.connection_fee.cancel_button"
              onClick={() => setDialogOpen(false)}
            >
              বাতিল
            </Button>
            <Button
              data-ocid="debts.connection_fee.save_button"
              onClick={handleSave}
            >
              সেভ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────
// 2. Commission Dues
// ─────────────────────────────────────────────────────────
function CommissionDuesSection({ isAdmin }: { isAdmin: boolean }) {
  const { actor } = useActor();
  const { settings } = useCompanySettings();
  const [items, setItems] = useState<CommissionDue[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<CommissionDue | null>(null);
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterYear, setFilterYear] = useState("all");

  const [form, setForm] = useState({
    dueMonth: "",
    totalCommission: "",
    paidCommission: "",
  });
  const [commissionAutoFilled, setCommissionAutoFilled] = useState(false);

  const load = useCallback(async (a: backendInterface) => {
    try {
      const data = await a.getCommissionDues();
      setItems(data.sort((x, y) => Number(x.serial) - Number(y.serial)));
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (actor) load(actor);
  }, [actor, load]);

  async function openAdd() {
    setEditItem(null);
    let autoCommission = "";
    if (actor) {
      try {
        const customers = await actor.getCustomers();
        const total = customers.reduce(
          (
            sum: number,
            c: {
              connectionDate: bigint;
              monthlyFee: number;
              commissionPercent?: number;
            },
          ) => {
            const periods = Math.max(
              0,
              Math.floor(
                (Date.now() - Number(c.connectionDate / 1000000n)) /
                  (30 * 24 * 60 * 60 * 1000),
              ),
            );
            return (
              sum +
              periods *
                Math.round((c.monthlyFee * (c.commissionPercent ?? 30)) / 100)
            );
          },
          0,
        );
        autoCommission = String(Math.round(total));
      } catch {
        // ignore
      }
    }
    setCommissionAutoFilled(autoCommission !== "");
    setForm({
      dueMonth: "",
      totalCommission: autoCommission,
      paidCommission: "",
    });
    setDialogOpen(true);
  }

  function openEdit(item: CommissionDue) {
    setEditItem(item);
    setForm({
      dueMonth: item.dueMonth,
      totalCommission: String(item.totalCommission),
      paidCommission: String(item.paidCommission),
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!actor) return;
    const total = Number(form.totalCommission);
    const paid = Number(form.paidCommission);
    const record: CommissionDue = {
      id: editItem?.id ?? crypto.randomUUID(),
      serial: editItem?.serial ?? BigInt(items.length + 1),
      commissionSource: settings.companyBrand || "স্বাধীন ওয়াইফাই",
      dueMonth: form.dueMonth,
      totalCommission: total,
      paidCommission: paid,
      outstandingCommission: total - paid,
      createdAt: editItem?.createdAt ?? BigInt(Date.now()),
    };
    try {
      if (editItem) {
        await actor.updateCommissionDue(record);
        toast.success("আপডেট হয়েছে");
      } else {
        await actor.addCommissionDue(record);
        toast.success("যুক্ত হয়েছে");
      }
      setDialogOpen(false);
      load(actor);
    } catch {
      toast.error("সমস্যা হয়েছে");
    }
  }

  async function handleDelete(id: string) {
    if (!actor || !confirm("মুছে ফেলবেন?")) return;
    try {
      await actor.deleteCommissionDue(id);
      toast.success("মুছে ফেলা হয়েছে");
      load(actor);
    } catch {
      toast.error("সমস্যা হয়েছে");
    }
  }

  const filtered = items.filter((item) => {
    if (filterMonth !== "all" && !item.dueMonth.includes(filterMonth))
      return false;
    if (filterYear !== "all" && !item.dueMonth.includes(filterYear))
      return false;
    return true;
  });

  const totalOutstanding = filtered.reduce(
    (s, i) => s + Number(i.outstandingCommission),
    0,
  );

  function handlePrint() {
    const rows = filtered
      .map(
        (item, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>${item.commissionSource}</td>
        <td>${item.dueMonth}</td>
        <td style="text-align:right">৳${Number(item.totalCommission).toLocaleString()}</td>
        <td style="text-align:right;color:green">৳${Number(item.paidCommission).toLocaleString()}</td>
        <td style="text-align:right;font-weight:bold">৳${Number(item.outstandingCommission).toLocaleString()}</td>
      </tr>`,
      )
      .join("");
    const body = `<table>
      <thead><tr><th>ক্র.</th><th>উৎস</th><th>মাস</th><th>মোট কমিশন</th><th>পরিশোধিত</th><th>বকেয়া</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td colspan="5">মোট বকেয়া</td><td style="text-align:right">৳${totalOutstanding.toLocaleString()}</td></tr></tfoot>
    </table>`;
    printDocument("কমিশন বকেয়া তালিকা", body, settings);
  }

  return (
    <Card className="shadow-card" data-ocid="debts.commission.card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-base">কমিশন বকেয়া</CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={filterMonth} onValueChange={setFilterMonth}>
              <SelectTrigger
                className="w-32 h-8 text-xs"
                data-ocid="debts.commission.select"
              >
                <SelectValue placeholder="মাস" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব মাস</SelectItem>
                {BANGLA_MONTHS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger
                className="w-24 h-8 text-xs"
                data-ocid="debts.commission.select"
              >
                <SelectValue placeholder="বছর" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব বছর</SelectItem>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1 text-xs"
              data-ocid="debts.commission.upload_button"
              onClick={handlePrint}
            >
              <Download size={13} /> PDF
            </Button>
            {isAdmin && (
              <Button
                size="sm"
                className="h-8 gap-1 text-xs"
                data-ocid="debts.commission.open_modal_button"
                onClick={openAdd}
              >
                <Plus size={13} /> যুক্ত করুন
              </Button>
            )}
          </div>
        </div>
        <p className="text-sm font-semibold text-orange-600 mt-2">
          মোট বকেয়া: {formatCurrency(totalOutstanding)}
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">ক্র.</TableHead>
              <TableHead className="text-xs">কমিশন উৎস</TableHead>
              <TableHead className="text-xs">মাস</TableHead>
              <TableHead className="text-xs text-right">মোট</TableHead>
              <TableHead className="text-xs text-right">পরিশোধিত</TableHead>
              <TableHead className="text-xs text-right">বকেয়া</TableHead>
              {isAdmin && <TableHead className="text-xs">অ্যাকশন</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-sm py-6 text-muted-foreground"
                  data-ocid="debts.commission.loading_state"
                >
                  লোড হচ্ছে...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow data-ocid="debts.commission.empty_state">
                <TableCell
                  colSpan={7}
                  className="text-center text-sm py-6 text-muted-foreground"
                >
                  কোনো তথ্য নেই
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item, idx) => (
                <TableRow
                  key={item.id}
                  data-ocid={`debts.commission.item.${idx + 1}`}
                >
                  <TableCell className="text-xs">{idx + 1}</TableCell>
                  <TableCell className="text-xs max-w-[180px] truncate">
                    {item.commissionSource}
                  </TableCell>
                  <TableCell className="text-xs">{item.dueMonth}</TableCell>
                  <TableCell className="text-xs text-right">
                    {formatCurrency(Number(item.totalCommission))}
                  </TableCell>
                  <TableCell className="text-xs text-right text-green-600">
                    {formatCurrency(Number(item.paidCommission))}
                  </TableCell>
                  <TableCell className="text-xs text-right font-medium text-orange-600">
                    {formatCurrency(Number(item.outstandingCommission))}
                  </TableCell>
                  {isAdmin && (
                    <TableCell className="text-xs">
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          data-ocid={`debts.commission.edit_button.${idx + 1}`}
                          onClick={() => openEdit(item)}
                        >
                          <Pencil size={11} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-destructive"
                          data-ocid={`debts.commission.delete_button.${idx + 1}`}
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={11} />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
            {filtered.length > 0 && (
              <TableRow className="bg-muted/50 font-semibold">
                <TableCell colSpan={5} className="text-xs">
                  মোট বকেয়া
                </TableCell>
                <TableCell className="text-xs text-right text-orange-600">
                  {formatCurrency(totalOutstanding)}
                </TableCell>
                {isAdmin && <TableCell />}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-ocid="debts.commission.dialog">
          <DialogHeader>
            <DialogTitle>{editItem ? "এডিট" : "নতুন কমিশন বকেয়া"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div>
              <Label className="text-xs">কমিশন উৎস</Label>
              <Input
                className="h-8 text-sm mt-1"
                value={settings.companyBrand || "স্বাধীন ওয়াইফাই"}
                disabled
              />
            </div>
            <div>
              <Label className="text-xs">কোন মাসের কমিশন বাকি</Label>
              <Input
                className="h-8 text-sm mt-1"
                placeholder="যেমন: জানুয়ারি ২০২৬"
                data-ocid="debts.commission.input"
                value={form.dueMonth}
                onChange={(e) =>
                  setForm((p) => ({ ...p, dueMonth: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">মোট কমিশন</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  type="number"
                  data-ocid="debts.commission.input"
                  value={form.totalCommission}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, totalCommission: e.target.value }))
                  }
                />
                {commissionAutoFilled && !editItem && (
                  <p className="text-xs text-blue-600 mt-1">
                    আর্থিক ব্যবস্থাপনার হিসাব অনুযায়ী স্বয়ংক্রিয়ভাবে পূরণ হয়েছে
                  </p>
                )}
              </div>
              <div>
                <Label className="text-xs">পরিশোধিত</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  type="number"
                  data-ocid="debts.commission.input"
                  value={form.paidCommission}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, paidCommission: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">বকেয়া (স্বয়ংক্রিয়)</Label>
              <Input
                className="h-8 text-sm mt-1"
                disabled
                value={String(
                  Number(form.totalCommission || 0) -
                    Number(form.paidCommission || 0),
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="debts.commission.cancel_button"
              onClick={() => setDialogOpen(false)}
            >
              বাতিল
            </Button>
            <Button
              data-ocid="debts.commission.save_button"
              onClick={handleSave}
            >
              সেভ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────
// 3. Technician Salary Dues
// ─────────────────────────────────────────────────────────
function TechnicianSalarySection({ isAdmin }: { isAdmin: boolean }) {
  const { actor } = useActor();
  const { settings } = useCompanySettings();
  const [items, setItems] = useState<TechnicianSalaryDue[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<TechnicianSalaryDue | null>(null);
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterYear, setFilterYear] = useState("all");

  const [form, setForm] = useState({
    technicianName: "",
    dueMonth: "",
    dueAmount: "",
    totalDue: "",
  });

  const load = useCallback(async (a: backendInterface) => {
    try {
      const data = await a.getTechnicianSalaryDues();
      setItems(data.sort((x, y) => Number(x.serial) - Number(y.serial)));
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (actor) load(actor);
  }, [actor, load]);

  function openAdd() {
    setEditItem(null);
    setForm({ technicianName: "", dueMonth: "", dueAmount: "", totalDue: "" });
    setDialogOpen(true);
  }

  function openEdit(item: TechnicianSalaryDue) {
    setEditItem(item);
    setForm({
      technicianName: item.technicianName,
      dueMonth: item.dueMonth,
      dueAmount: String(item.dueAmount),
      totalDue: String(item.totalDue),
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!actor) return;
    const record: TechnicianSalaryDue = {
      id: editItem?.id ?? crypto.randomUUID(),
      serial: editItem?.serial ?? BigInt(items.length + 1),
      technicianName: form.technicianName,
      dueMonth: form.dueMonth,
      dueAmount: Number(form.dueAmount),
      totalDue: Number(form.totalDue),
      createdAt: editItem?.createdAt ?? BigInt(Date.now()),
    };
    try {
      if (editItem) {
        await actor.updateTechnicianSalaryDue(record);
        toast.success("আপডেট হয়েছে");
      } else {
        await actor.addTechnicianSalaryDue(record);
        toast.success("যুক্ত হয়েছে");
      }
      // Sync to Finance expenses
      try {
        const allExpenses = await actor.getExpenses();
        const monthName = record.dueMonth.split(" ")[0];
        const existingExp = allExpenses.find(
          (e: { category: string; description: string; date: string }) =>
            e.category === "টেকনিশিয়ান বেতন" &&
            e.description === record.technicianName &&
            formatBanglaMonthDM(e.date).startsWith(monthName),
        );
        const expDate = getDateFromBanglaMonth(record.dueMonth);
        if (!existingExp) {
          await actor.addExpense({
            id: crypto.randomUUID(),
            serial: BigInt(allExpenses.length + 1),
            category: "টেকনিশিয়ান বেতন",
            description: record.technicianName,
            unit: "জন",
            rate: record.dueAmount,
            amount: record.dueAmount,
            date: expDate,
            createdAt: BigInt(Date.now()),
          });
        } else {
          await actor.updateExpense({
            ...existingExp,
            amount: record.dueAmount,
            rate: record.dueAmount,
          });
        }
      } catch {
        // ignore sync errors
      }
      setDialogOpen(false);
      load(actor);
    } catch {
      toast.error("সমস্যা হয়েছে");
    }
  }

  async function handleDelete(id: string) {
    if (!actor || !confirm("মুছে ফেলবেন?")) return;
    try {
      await actor.deleteTechnicianSalaryDue(id);
      toast.success("মুছে ফেলা হয়েছে");
      load(actor);
    } catch {
      toast.error("সমস্যা হয়েছে");
    }
  }

  const filtered = items.filter((item) => {
    if (filterMonth !== "all" && !item.dueMonth.includes(filterMonth))
      return false;
    if (filterYear !== "all" && !item.dueMonth.includes(filterYear))
      return false;
    return true;
  });

  const totalDue = filtered.reduce((s, i) => s + Number(i.totalDue), 0);

  function handlePrint() {
    const rows = filtered
      .map(
        (item, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>${item.technicianName}</td>
        <td>${item.dueMonth}</td>
        <td style="text-align:right">৳${Number(item.dueAmount).toLocaleString()}</td>
        <td style="text-align:right;font-weight:bold;color:#dc2626">৳${Number(item.totalDue).toLocaleString()}</td>
      </tr>`,
      )
      .join("");
    const body = `<table>
      <thead><tr><th>ক্র.</th><th>নাম</th><th>মাস</th><th>বাকি পরিমাণ</th><th>সর্বমোট বকেয়া</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td colspan="4">সর্বমোট</td><td style="text-align:right">৳${totalDue.toLocaleString()}</td></tr></tfoot>
    </table>`;
    printDocument("টেকনিশিয়ান বেতন বকেয়া", body, settings);
  }

  return (
    <Card className="shadow-card" data-ocid="debts.technician.card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-base">টেকনিশিয়ানের বেতন বকেয়া</CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={filterMonth} onValueChange={setFilterMonth}>
              <SelectTrigger
                className="w-32 h-8 text-xs"
                data-ocid="debts.technician.select"
              >
                <SelectValue placeholder="মাস" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব মাস</SelectItem>
                {BANGLA_MONTHS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger
                className="w-24 h-8 text-xs"
                data-ocid="debts.technician.select"
              >
                <SelectValue placeholder="বছর" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব বছর</SelectItem>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1 text-xs"
              data-ocid="debts.technician.upload_button"
              onClick={handlePrint}
            >
              <Download size={13} /> PDF
            </Button>
            {isAdmin && (
              <Button
                size="sm"
                className="h-8 gap-1 text-xs"
                data-ocid="debts.technician.open_modal_button"
                onClick={openAdd}
              >
                <Plus size={13} /> যুক্ত করুন
              </Button>
            )}
          </div>
        </div>
        <p className="text-sm font-semibold text-red-600 mt-2">
          সর্বমোট বকেয়া: {formatCurrency(totalDue)}
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">ক্র.</TableHead>
              <TableHead className="text-xs">নাম</TableHead>
              <TableHead className="text-xs">মাস</TableHead>
              <TableHead className="text-xs text-right">বাকি</TableHead>
              <TableHead className="text-xs text-right">সর্বমোট বকেয়া</TableHead>
              {isAdmin && <TableHead className="text-xs">অ্যাকশন</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-sm py-6 text-muted-foreground"
                  data-ocid="debts.technician.loading_state"
                >
                  লোড হচ্ছে...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow data-ocid="debts.technician.empty_state">
                <TableCell
                  colSpan={6}
                  className="text-center text-sm py-6 text-muted-foreground"
                >
                  কোনো তথ্য নেই
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item, idx) => (
                <TableRow
                  key={item.id}
                  data-ocid={`debts.technician.item.${idx + 1}`}
                >
                  <TableCell className="text-xs">{idx + 1}</TableCell>
                  <TableCell className="text-xs font-medium">
                    {item.technicianName}
                  </TableCell>
                  <TableCell className="text-xs">{item.dueMonth}</TableCell>
                  <TableCell className="text-xs text-right">
                    {formatCurrency(Number(item.dueAmount))}
                  </TableCell>
                  <TableCell className="text-xs text-right font-medium text-red-600">
                    {formatCurrency(Number(item.totalDue))}
                  </TableCell>
                  {isAdmin && (
                    <TableCell className="text-xs">
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          data-ocid={`debts.technician.edit_button.${idx + 1}`}
                          onClick={() => openEdit(item)}
                        >
                          <Pencil size={11} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-destructive"
                          data-ocid={`debts.technician.delete_button.${idx + 1}`}
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={11} />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
            {filtered.length > 0 && (
              <TableRow className="bg-muted/50 font-semibold">
                <TableCell colSpan={4} className="text-xs">
                  সর্বমোট
                </TableCell>
                <TableCell className="text-xs text-right text-red-600">
                  {formatCurrency(totalDue)}
                </TableCell>
                {isAdmin && <TableCell />}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-ocid="debts.technician.dialog">
          <DialogHeader>
            <DialogTitle>{editItem ? "এডিট" : "নতুন বেতন বকেয়া"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div>
              <Label className="text-xs">টেকনিশিয়ানের নাম</Label>
              <Input
                className="h-8 text-sm mt-1"
                data-ocid="debts.technician.input"
                value={form.technicianName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, technicianName: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">কোন মাসের বেতন বাকি</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  placeholder="মার্চ ২০২৬"
                  data-ocid="debts.technician.input"
                  value={form.dueMonth}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, dueMonth: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">বাকি টাকা</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  type="number"
                  data-ocid="debts.technician.input"
                  value={form.dueAmount}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, dueAmount: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">সর্বমোট বকেয়া</Label>
              <Input
                className="h-8 text-sm mt-1"
                type="number"
                data-ocid="debts.technician.input"
                value={form.totalDue}
                onChange={(e) =>
                  setForm((p) => ({ ...p, totalDue: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="debts.technician.cancel_button"
              onClick={() => setDialogOpen(false)}
            >
              বাতিল
            </Button>
            <Button
              data-ocid="debts.technician.save_button"
              onClick={handleSave}
            >
              সেভ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────
// 4. Wholesaler Dues
// ─────────────────────────────────────────────────────────
function WholesalerDuesSection({ isAdmin }: { isAdmin: boolean }) {
  const { actor } = useActor();
  const { settings } = useCompanySettings();
  const [items, setItems] = useState<WholesalerDue[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<WholesalerDue | null>(null);
  const [filterYear, setFilterYear] = useState("all");

  const [form, setForm] = useState({
    wholesalerName: "",
    mobile: "",
    address: "",
    productName: "",
    quantity: "",
    rate: "",
    paidBill: "",
    date: "",
  });

  const amount = Number(form.quantity) * Number(form.rate);
  const dueBill = amount - Number(form.paidBill);

  const load = useCallback(async (a: backendInterface) => {
    try {
      const data = await a.getWholesalerDues();
      setItems(data.sort((x, y) => Number(x.serial) - Number(y.serial)));
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (actor) load(actor);
  }, [actor, load]);

  function openAdd() {
    setEditItem(null);
    setForm({
      wholesalerName: "",
      mobile: "",
      address: "",
      productName: "",
      quantity: "",
      rate: "",
      paidBill: "",
      date: new Date().toISOString().slice(0, 10),
    });
    setDialogOpen(true);
  }

  function openEdit(item: WholesalerDue) {
    setEditItem(item);
    setForm({
      wholesalerName: item.wholesalerName,
      mobile: item.mobile,
      address: item.address,
      productName: item.productName,
      quantity: String(item.quantity),
      rate: String(item.rate),
      paidBill: String(item.paidBill),
      date: item.date,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!actor) return;
    const qty = Number(form.quantity);
    const rt = Number(form.rate);
    const amt = qty * rt;
    const paid = Number(form.paidBill);
    const record: WholesalerDue = {
      id: editItem?.id ?? crypto.randomUUID(),
      serial: editItem?.serial ?? BigInt(items.length + 1),
      wholesalerName: form.wholesalerName,
      mobile: form.mobile,
      address: form.address,
      productName: form.productName,
      quantity: qty,
      rate: rt,
      amount: amt,
      totalAmount: amt,
      paidBill: paid,
      dueBill: amt - paid,
      date: form.date,
      createdAt: editItem?.createdAt ?? BigInt(Date.now()),
    };
    try {
      if (editItem) {
        await actor.updateWholesalerDue(record);
        toast.success("আপডেট হয়েছে");
      } else {
        await actor.addWholesalerDue(record);
        toast.success("যুক্ত হয়েছে");
      }
      // Sync to Finance expenses
      try {
        const allExpenses = await actor.getExpenses();
        const validCats = ["রাউটার", "ONU", "অপটিক্যাল ফাইবার", "স্প্লিটার"];
        const catPart = record.productName.split(" - ")[0];
        const expCat = validCats.includes(catPart) ? catPart : "রাউটার";
        const existingExp = allExpenses.find(
          (e: { description: string; date: string }) =>
            e.description === record.productName && e.date === record.date,
        );
        if (!existingExp) {
          await actor.addExpense({
            id: crypto.randomUUID(),
            serial: BigInt(allExpenses.length + 1),
            category: expCat,
            description: record.productName,
            unit: "পিস",
            rate: record.rate,
            amount: record.amount,
            date: record.date,
            createdAt: BigInt(Date.now()),
          });
        } else {
          await actor.updateExpense({
            ...existingExp,
            amount: record.amount,
            rate: record.rate,
          });
        }
      } catch {
        // ignore sync errors
      }
      setDialogOpen(false);
      load(actor);
    } catch {
      toast.error("সমস্যা হয়েছে");
    }
  }

  async function handleDelete(id: string) {
    if (!actor || !confirm("মুছে ফেলবেন?")) return;
    try {
      await actor.deleteWholesalerDue(id);
      toast.success("মুছে ফেলা হয়েছে");
      load(actor);
    } catch {
      toast.error("সমস্যা হয়েছে");
    }
  }

  const filtered = items.filter((item) => {
    if (filterYear !== "all" && !item.date?.startsWith(filterYear))
      return false;
    return true;
  });

  const totalDue = filtered.reduce((s, i) => s + Number(i.dueBill), 0);

  function handlePrint() {
    const rows = filtered
      .map(
        (item, idx) => `
      <tr>
        <td>${idx + 1}</td><td>${item.wholesalerName}</td><td>${item.mobile}</td>
        <td>${item.productName}</td><td style="text-align:right">${item.quantity}</td>
        <td style="text-align:right">৳${Number(item.rate).toLocaleString()}</td>
        <td style="text-align:right">৳${Number(item.totalAmount).toLocaleString()}</td>
        <td style="text-align:right;color:green">৳${Number(item.paidBill).toLocaleString()}</td>
        <td style="text-align:right;font-weight:bold;color:#dc2626">৳${Number(item.dueBill).toLocaleString()}</td>
        <td>${item.date}</td>
      </tr>`,
      )
      .join("");
    const body = `<table style="font-size:8pt">
      <thead><tr><th>ক্র.</th><th>হোলসেলার</th><th>মোবাইল</th><th>প্রোডাক্ট</th><th>পিস</th><th>দর</th><th>মোট</th><th>পরিশোধিত</th><th>বকেয়া</th><th>তারিখ</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td colspan="8">সর্বমোট বকেয়া</td><td style="text-align:right">৳${totalDue.toLocaleString()}</td><td></td></tr></tfoot>
    </table>`;
    printDocument("হোলসেলার বকেয়া তালিকা", body, settings);
  }

  return (
    <Card className="shadow-card" data-ocid="debts.wholesaler.card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-base">হোলসেলারের বকেয়া</CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger
                className="w-24 h-8 text-xs"
                data-ocid="debts.wholesaler.select"
              >
                <SelectValue placeholder="বছর" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব বছর</SelectItem>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1 text-xs"
              data-ocid="debts.wholesaler.upload_button"
              onClick={handlePrint}
            >
              <Download size={13} /> PDF
            </Button>
            {isAdmin && (
              <Button
                size="sm"
                className="h-8 gap-1 text-xs"
                data-ocid="debts.wholesaler.open_modal_button"
                onClick={openAdd}
              >
                <Plus size={13} /> যুক্ত করুন
              </Button>
            )}
          </div>
        </div>
        <p className="text-sm font-semibold text-red-600 mt-2">
          সর্বমোট বকেয়া: {formatCurrency(totalDue)}
        </p>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">ক্র.</TableHead>
              <TableHead className="text-xs">হোলসেলার</TableHead>
              <TableHead className="text-xs">মোবাইল</TableHead>
              <TableHead className="text-xs">প্রোডাক্ট</TableHead>
              <TableHead className="text-xs text-right">পিস</TableHead>
              <TableHead className="text-xs text-right">দর</TableHead>
              <TableHead className="text-xs text-right">মোট</TableHead>
              <TableHead className="text-xs text-right">পরিশোধিত</TableHead>
              <TableHead className="text-xs text-right">বকেয়া</TableHead>
              <TableHead className="text-xs">তারিখ</TableHead>
              {isAdmin && <TableHead className="text-xs">অ্যাকশন</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="text-center text-sm py-6 text-muted-foreground"
                  data-ocid="debts.wholesaler.loading_state"
                >
                  লোড হচ্ছে...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow data-ocid="debts.wholesaler.empty_state">
                <TableCell
                  colSpan={11}
                  className="text-center text-sm py-6 text-muted-foreground"
                >
                  কোনো তথ্য নেই
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item, idx) => (
                <TableRow
                  key={item.id}
                  data-ocid={`debts.wholesaler.item.${idx + 1}`}
                >
                  <TableCell className="text-xs">{idx + 1}</TableCell>
                  <TableCell className="text-xs font-medium">
                    {item.wholesalerName}
                  </TableCell>
                  <TableCell className="text-xs">{item.mobile}</TableCell>
                  <TableCell className="text-xs">{item.productName}</TableCell>
                  <TableCell className="text-xs text-right">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-xs text-right">
                    {formatCurrency(Number(item.rate))}
                  </TableCell>
                  <TableCell className="text-xs text-right">
                    {formatCurrency(Number(item.totalAmount))}
                  </TableCell>
                  <TableCell className="text-xs text-right text-green-600">
                    {formatCurrency(Number(item.paidBill))}
                  </TableCell>
                  <TableCell className="text-xs text-right font-medium text-red-600">
                    {formatCurrency(Number(item.dueBill))}
                  </TableCell>
                  <TableCell className="text-xs">{item.date}</TableCell>
                  {isAdmin && (
                    <TableCell className="text-xs">
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          data-ocid={`debts.wholesaler.edit_button.${idx + 1}`}
                          onClick={() => openEdit(item)}
                        >
                          <Pencil size={11} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-destructive"
                          data-ocid={`debts.wholesaler.delete_button.${idx + 1}`}
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={11} />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
            {filtered.length > 0 && (
              <TableRow className="bg-muted/50 font-semibold">
                <TableCell colSpan={8} className="text-xs">
                  সর্বমোট বকেয়া
                </TableCell>
                <TableCell className="text-xs text-right text-red-600">
                  {formatCurrency(totalDue)}
                </TableCell>
                <TableCell colSpan={isAdmin ? 2 : 1} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" data-ocid="debts.wholesaler.dialog">
          <DialogHeader>
            <DialogTitle>{editItem ? "এডিট" : "নতুন হোলসেলার বকেয়া"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">হোলসেলারের নাম</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  data-ocid="debts.wholesaler.input"
                  value={form.wholesalerName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, wholesalerName: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">মোবাইল</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  data-ocid="debts.wholesaler.input"
                  value={form.mobile}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, mobile: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">ঠিকানা</Label>
              <Input
                className="h-8 text-sm mt-1"
                data-ocid="debts.wholesaler.input"
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">প্রোডাক্টের নাম</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  data-ocid="debts.wholesaler.input"
                  value={form.productName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, productName: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">পরিমাণ (পিস)</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  type="number"
                  data-ocid="debts.wholesaler.input"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, quantity: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">দর</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  type="number"
                  data-ocid="debts.wholesaler.input"
                  value={form.rate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, rate: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">মোট দাম (স্বয়ংক্রিয়)</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  disabled
                  value={formatCurrency(amount)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">পরিশোধিত বিল</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  type="number"
                  data-ocid="debts.wholesaler.input"
                  value={form.paidBill}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, paidBill: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">বকেয়া (স্বয়ংক্রিয়)</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  disabled
                  value={formatCurrency(dueBill)}
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">তারিখ</Label>
              <Input
                className="h-8 text-sm mt-1"
                type="date"
                data-ocid="debts.wholesaler.input"
                value={form.date}
                onChange={(e) =>
                  setForm((p) => ({ ...p, date: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="debts.wholesaler.cancel_button"
              onClick={() => setDialogOpen(false)}
            >
              বাতিল
            </Button>
            <Button
              data-ocid="debts.wholesaler.save_button"
              onClick={handleSave}
            >
              সেভ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────
// 5. Advance Recharge Dues
// ─────────────────────────────────────────────────────────
function AdvanceRechargeDuesSection({ isAdmin }: { isAdmin: boolean }) {
  const { actor } = useActor();
  const { settings } = useCompanySettings();
  const [items, setItems] = useState<AdvanceRechargeDue[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<AdvanceRechargeDue | null>(null);
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterYear, setFilterYear] = useState("all");

  const [form, setForm] = useState({
    carnivalId: "",
    userName: "",
    mobile: "",
    address: "",
    dueMonth: "",
    dueAmount: "",
  });

  const load = useCallback(async (a: backendInterface) => {
    try {
      const data = await a.getAdvanceRechargeDues();
      setItems(data.sort((x, y) => Number(x.serial) - Number(y.serial)));
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (actor) load(actor);
  }, [actor, load]);

  function openAdd() {
    setEditItem(null);
    setForm({
      carnivalId: "",
      userName: "",
      mobile: "",
      address: "",
      dueMonth: "",
      dueAmount: "",
    });
    setDialogOpen(true);
  }

  function openEdit(item: AdvanceRechargeDue) {
    setEditItem(item);
    setForm({
      carnivalId: item.carnivalId,
      userName: item.userName,
      mobile: item.mobile,
      address: item.address,
      dueMonth: item.dueMonth,
      dueAmount: String(item.dueAmount),
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!actor) return;
    const record: AdvanceRechargeDue = {
      id: editItem?.id ?? crypto.randomUUID(),
      serial: editItem?.serial ?? BigInt(items.length + 1),
      carnivalId: form.carnivalId,
      userName: form.userName,
      mobile: form.mobile,
      address: form.address,
      dueMonth: form.dueMonth,
      dueAmount: Number(form.dueAmount),
      createdAt: editItem?.createdAt ?? BigInt(Date.now()),
    };
    try {
      if (editItem) {
        await actor.updateAdvanceRechargeDue(record);
        toast.success("আপডেট হয়েছে");
      } else {
        await actor.addAdvanceRechargeDue(record);
        toast.success("যুক্ত হয়েছে");
      }
      setDialogOpen(false);
      load(actor);
    } catch {
      toast.error("সমস্যা হয়েছে");
    }
  }

  async function handleDelete(id: string) {
    if (!actor || !confirm("মুছে ফেলবেন?")) return;
    try {
      await actor.deleteAdvanceRechargeDue(id);
      toast.success("মুছে ফেলা হয়েছে");
      load(actor);
    } catch {
      toast.error("সমস্যা হয়েছে");
    }
  }

  const filtered = items.filter((item) => {
    if (filterMonth !== "all" && !item.dueMonth.includes(filterMonth))
      return false;
    if (filterYear !== "all" && !item.dueMonth.includes(filterYear))
      return false;
    return true;
  });

  const total = filtered.reduce((s, i) => s + Number(i.dueAmount), 0);

  function handlePrint() {
    const rows = filtered
      .map(
        (item, idx) => `
      <tr>
        <td>${idx + 1}</td><td>${item.carnivalId}</td><td>${item.userName}</td>
        <td>${item.mobile}</td><td>${item.address}</td><td>${item.dueMonth}</td>
        <td style="text-align:right;font-weight:bold">৳${Number(item.dueAmount).toLocaleString()}</td>
      </tr>`,
      )
      .join("");
    const body = `<table>
      <thead><tr><th>ক্র.</th><th>কার্নিভাল আইডি</th><th>ইউজার</th><th>মোবাইল</th><th>ঠিকানা</th><th>মাস</th><th>পরিমাণ</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td colspan="6">মোট</td><td style="text-align:right">৳${total.toLocaleString()}</td></tr></tfoot>
    </table>`;
    printDocument("অগ্রিম রিচার্জ বকেয়া তালিকা", body, settings);
  }

  return (
    <Card className="shadow-card" data-ocid="debts.advance.card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-base">অগ্রিম রিচার্জ বকেয়া</CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={filterMonth} onValueChange={setFilterMonth}>
              <SelectTrigger
                className="w-32 h-8 text-xs"
                data-ocid="debts.advance.select"
              >
                <SelectValue placeholder="মাস" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব মাস</SelectItem>
                {BANGLA_MONTHS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger
                className="w-24 h-8 text-xs"
                data-ocid="debts.advance.select"
              >
                <SelectValue placeholder="বছর" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব বছর</SelectItem>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1 text-xs"
              data-ocid="debts.advance.upload_button"
              onClick={handlePrint}
            >
              <Download size={13} /> PDF
            </Button>
            {isAdmin && (
              <Button
                size="sm"
                className="h-8 gap-1 text-xs"
                data-ocid="debts.advance.open_modal_button"
                onClick={openAdd}
              >
                <Plus size={13} /> যুক্ত করুন
              </Button>
            )}
          </div>
        </div>
        <p className="text-sm font-semibold text-orange-600 mt-2">
          মোট বকেয়া: {formatCurrency(total)}
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">ক্র.</TableHead>
              <TableHead className="text-xs">কার্নিভাল আইডি</TableHead>
              <TableHead className="text-xs">ইউজার</TableHead>
              <TableHead className="text-xs">মোবাইল</TableHead>
              <TableHead className="text-xs">ঠিকানা</TableHead>
              <TableHead className="text-xs">মাস</TableHead>
              <TableHead className="text-xs text-right">পরিমাণ</TableHead>
              {isAdmin && <TableHead className="text-xs">অ্যাকশন</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-sm py-6 text-muted-foreground"
                  data-ocid="debts.advance.loading_state"
                >
                  লোড হচ্ছে...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow data-ocid="debts.advance.empty_state">
                <TableCell
                  colSpan={8}
                  className="text-center text-sm py-6 text-muted-foreground"
                >
                  কোনো তথ্য নেই
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item, idx) => (
                <TableRow
                  key={item.id}
                  data-ocid={`debts.advance.item.${idx + 1}`}
                >
                  <TableCell className="text-xs">{idx + 1}</TableCell>
                  <TableCell className="text-xs">{item.carnivalId}</TableCell>
                  <TableCell className="text-xs">{item.userName}</TableCell>
                  <TableCell className="text-xs">{item.mobile}</TableCell>
                  <TableCell className="text-xs">{item.address}</TableCell>
                  <TableCell className="text-xs">{item.dueMonth}</TableCell>
                  <TableCell className="text-xs text-right font-medium text-orange-600">
                    {formatCurrency(Number(item.dueAmount))}
                  </TableCell>
                  {isAdmin && (
                    <TableCell className="text-xs">
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          data-ocid={`debts.advance.edit_button.${idx + 1}`}
                          onClick={() => openEdit(item)}
                        >
                          <Pencil size={11} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-destructive"
                          data-ocid={`debts.advance.delete_button.${idx + 1}`}
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={11} />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
            {filtered.length > 0 && (
              <TableRow className="bg-muted/50 font-semibold">
                <TableCell colSpan={6} className="text-xs">
                  মোট
                </TableCell>
                <TableCell className="text-xs text-right text-orange-600">
                  {formatCurrency(total)}
                </TableCell>
                {isAdmin && <TableCell />}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-ocid="debts.advance.dialog">
          <DialogHeader>
            <DialogTitle>
              {editItem ? "এডিট" : "নতুন অগ্রিম রিচার্জ বকেয়া"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">কার্নিভাল আইডি</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  data-ocid="debts.advance.input"
                  value={form.carnivalId}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, carnivalId: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">ইউজার</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  data-ocid="debts.advance.input"
                  value={form.userName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, userName: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">মোবাইল</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  data-ocid="debts.advance.input"
                  value={form.mobile}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, mobile: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">ঠিকানা</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  data-ocid="debts.advance.input"
                  value={form.address}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, address: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">কোন মাসের রিচার্জ বকেয়া</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  placeholder="মার্চ ২০২৬"
                  data-ocid="debts.advance.input"
                  value={form.dueMonth}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, dueMonth: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs">মোট (টাকা)</Label>
                <Input
                  className="h-8 text-sm mt-1"
                  type="number"
                  data-ocid="debts.advance.input"
                  value={form.dueAmount}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, dueAmount: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="debts.advance.cancel_button"
              onClick={() => setDialogOpen(false)}
            >
              বাতিল
            </Button>
            <Button data-ocid="debts.advance.save_button" onClick={handleSave}>
              সেভ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
