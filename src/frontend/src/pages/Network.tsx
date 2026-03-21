import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ---- Types ----
interface CustomerSignal {
  uid: string;
  name: string;
  signal: string;
}

interface FiberEntry {
  id: number;
  opticalFiber: string;
  core: string;
  village: string;
  para: string;
  tjBox: string;
  tjBoxNumber: string;
  tjBoxOwner: string;
  splitter: string[];
  splitterRatio: string[];
  signalInput: string;
  signalForward: string;
  oltSignal: string;
  customerCount: string;
  customers: CustomerSignal[];
}

// ---- Constants ----
const OPTICAL_FIBERS = [
  "Optical Fiber Number One",
  "Optical Fiber Number Two",
  "Optical Fiber Number Three",
  "Optical Fiber Number Four",
  "Optical Fiber Number Five",
];

const CORES = ["নীল", "সবুজ", "কমলা", "ছাই"];

const VILLAGES = [
  "বালিগাঁও",
  "বালিগাঁও অষ্ট গ্রাম অঞ্চল",
  "বালিগাঁও লাখাই অঞ্চল",
  "ফরিদপুর",
  "কাটাইয়া",
  "পূর্ব বাজুকা",
  "পশ্চিম বাজুকা",
];

const DEFAULT_PARAS: Record<string, string[]> = {
  বালিগাঁও: ["উত্তর পাড়া", "দক্ষিণ পাড়া", "মধ্য পাড়া"],
  "বালিগাঁও অষ্ট গ্রাম অঞ্চল": ["উত্তর পাড়া", "দক্ষিণ পাড়া", "মধ্য পাড়া"],
  "বালিগাঁও লাখাই অঞ্চল": ["উত্তর পাড়া", "দক্ষিণ পাড়া", "মধ্য পাড়া"],
  ফরিদপুর: ["পূর্ব পাড়া", "পশ্চিম পাড়া", "মেইন পাড়া"],
  কাটাইয়া: ["উত্তর পাড়া", "দক্ষিণ পাড়া"],
  "পূর্ব বাজুকা": ["মেইন পাড়া", "নতুন পাড়া"],
  "পশ্চিম বাজুকা": ["মেইন পাড়া", "নতুন পাড়া"],
};

const TJ_BOX_TYPES = ["দুই পোর্ট", "চার পোর্ট", "ছয় পোর্ট", "আট পোর্ট"];

const SPLITTER_TYPES = ["FBT", "PLC"];

const SPLITTER_RATIOS = [
  "1:2",
  "1:4",
  "1:8",
  "1/99",
  "2/98",
  "3/97",
  "5/95",
  "10/90",
  "15/85",
  "20/80",
  "30/70",
  "40/60",
];

const STORAGE_KEY = "optical_fiber_entries";
const PARAS_KEY = "optical_fiber_paras";

function makeUid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const emptyEntry = (): Omit<FiberEntry, "id"> => ({
  opticalFiber: "",
  core: "",
  village: "",
  para: "",
  tjBox: "",
  tjBoxNumber: "",
  tjBoxOwner: "",
  splitter: [],
  splitterRatio: [],
  signalInput: "",
  signalForward: "",
  oltSignal: "",
  customerCount: "",
  customers: [],
});

function loadEntries(): FiberEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: FiberEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function loadParas(): Record<string, string[]> {
  try {
    const stored = localStorage.getItem(PARAS_KEY);
    return stored ? JSON.parse(stored) : { ...DEFAULT_PARAS };
  } catch {
    return { ...DEFAULT_PARAS };
  }
}

function saveParas(paras: Record<string, string[]>) {
  localStorage.setItem(PARAS_KEY, JSON.stringify(paras));
}

function toggleItem(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

interface NetworkProps {
  isAdmin?: boolean;
}
export default function Network({ isAdmin = false }: NetworkProps) {
  const [entries, setEntries] = useState<FiberEntry[]>(loadEntries);
  const [paras, setParas] = useState<Record<string, string[]>>(loadParas);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyEntry());
  const [newParaInput, setNewParaInput] = useState("");
  const [newBoxInput, setNewBoxInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [reportCustomer, setReportCustomer] = useState("");
  const [boxNumbers, setBoxNumbers] = useState<string[]>([
    "Box 1",
    "Box 2",
    "Box 3",
  ]);

  const entriesRef = useRef(entries);
  entriesRef.current = entries;

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    const nums = Array.from(
      new Set(
        entriesRef.current
          .filter((e) => e.village === form.village && e.para === form.para)
          .map((e) => e.tjBoxNumber),
      ),
    ).filter(Boolean);
    if (nums.length === 0) {
      setBoxNumbers(["Box 1", "Box 2", "Box 3"]);
    } else {
      setBoxNumbers(Array.from(new Set(nums)));
    }
  }, [form.village, form.para]);

  // Sync customers array length to customerCount
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    const count = Number.parseInt(form.customerCount) || 0;
    setForm((p) => {
      const current = p.customers;
      if (current.length < count) {
        return {
          ...p,
          customers: [
            ...current,
            ...Array.from({ length: count - current.length }, () => ({
              uid: makeUid(),
              name: "",
              signal: "",
            })),
          ],
        };
      }
      if (current.length > count) {
        return { ...p, customers: current.slice(0, count) };
      }
      return p;
    });
  }, [form.customerCount]);

  function openAdd() {
    setEditingId(null);
    setForm(emptyEntry());
    setNewParaInput("");
    setNewBoxInput("");
    setModalOpen(true);
  }

  function openEdit(entry: FiberEntry) {
    setEditingId(entry.id);
    setForm({ ...entry });
    setNewParaInput("");
    setNewBoxInput("");
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.opticalFiber || !form.village) {
      toast.error("অপটিক্যাল ফাইবার এবং গ্রাম নির্বাচন করুন");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    let updated: FiberEntry[];
    if (editingId !== null) {
      updated = entries.map((e) =>
        e.id === editingId ? { ...form, id: editingId } : e,
      );
      toast.success("এন্ট্রি আপডেট হয়েছে");
    } else {
      const newId = Date.now();
      updated = [...entries, { ...form, id: newId }];
      toast.success("নতুন এন্ট্রি যুক্ত হয়েছে");
    }
    setEntries(updated);
    saveEntries(updated);
    setSaving(false);
    setModalOpen(false);
  }

  function handleDelete(id: number) {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveEntries(updated);
    toast.success("এন্ট্রি মুছে ফেলা হয়েছে");
  }

  function addPara() {
    if (!form.village || !newParaInput.trim()) return;
    const updated = {
      ...paras,
      [form.village]: [...(paras[form.village] || []), newParaInput.trim()],
    };
    setParas(updated);
    saveParas(updated);
    setForm((p) => ({ ...p, para: newParaInput.trim() }));
    setNewParaInput("");
    toast.success("নতুন পাড়া যুক্ত হয়েছে");
  }

  function addBoxNumber() {
    if (!newBoxInput.trim()) return;
    setBoxNumbers((p) => [...p, newBoxInput.trim()]);
    setForm((p) => ({ ...p, tjBoxNumber: newBoxInput.trim() }));
    setNewBoxInput("");
  }

  function remainingSignal(entry: FiberEntry): string {
    const input = Number.parseFloat(entry.signalInput);
    const forward = Number.parseFloat(entry.signalForward);
    if (!Number.isNaN(input) && !Number.isNaN(forward)) {
      return `${(input - forward).toFixed(2)} dBm`;
    }
    return "-";
  }

  const reportEntries = entries.filter((e) =>
    reportCustomer.trim() === ""
      ? true
      : e.customers.some((c) =>
          c.name.toLowerCase().includes(reportCustomer.toLowerCase()),
        ),
  );

  return (
    <div className="space-y-4" data-ocid="network.page">
      <Tabs defaultValue="management">
        <TabsList className="mb-4">
          <TabsTrigger value="management">ফাইবার ম্যানেজমেন্ট</TabsTrigger>
          <TabsTrigger value="report">
            <BarChart3 size={14} className="mr-1.5" />
            রিপোর্ট
          </TabsTrigger>
        </TabsList>

        {/* ===== Management Tab ===== */}
        <TabsContent value="management">
          <Card className="shadow-card border-border">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">
                অপটিক্যাল ফাইবার তালিকা
              </CardTitle>
              {isAdmin && (
                <Button
                  className="bg-primary text-white"
                  size="sm"
                  onClick={openAdd}
                >
                  <Plus size={15} className="mr-1.5" />
                  নতুন এন্ট্রি
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[1200px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      {[
                        "#",
                        "Optical Fiber",
                        "Core",
                        "গ্রাম",
                        "পাড়া",
                        "TJ Box",
                        "TJ Box No.",
                        "TJ Box Owner",
                        "Splitter",
                        "Splitter Ratio",
                        "ইনপুট (dBm)",
                        "ফরওয়ার্ড (dBm)",
                        "গ্রাহক সংখ্যা",
                        "অ্যাকশন",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left py-2.5 px-3 font-semibold text-muted-foreground whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((e, i) => (
                      <tr
                        key={e.id}
                        className="border-b border-border last:border-0 hover:bg-muted/20"
                      >
                        <td className="py-2.5 px-3 text-muted-foreground">
                          {i + 1}
                        </td>
                        <td className="py-2.5 px-3 font-medium whitespace-nowrap">
                          {e.opticalFiber.replace(
                            "Optical Fiber Number ",
                            "OFN ",
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          <CoreBadge core={e.core} />
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {e.village}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {e.para}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {e.tjBox}
                        </td>
                        <td className="py-2.5 px-3">{e.tjBoxNumber}</td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {e.tjBoxOwner || "-"}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex flex-wrap gap-1">
                            {e.splitter.map((s) => (
                              <Badge
                                key={s}
                                variant="secondary"
                                className="text-[10px] px-1.5 py-0"
                              >
                                {s}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex flex-wrap gap-1">
                            {e.splitterRatio.slice(0, 2).map((r) => (
                              <Badge
                                key={r}
                                variant="outline"
                                className="text-[10px] px-1.5 py-0"
                              >
                                {r}
                              </Badge>
                            ))}
                            {e.splitterRatio.length > 2 && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 py-0"
                              >
                                +{e.splitterRatio.length - 2}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {e.signalInput ? `${e.signalInput} dBm` : "-"}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {e.signalForward ? `${e.signalForward} dBm` : "-"}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {e.customerCount || "0"} জন
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex gap-1">
                            {isAdmin && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => openEdit(e)}
                              >
                                <Pencil size={12} />
                              </Button>
                            )}
                            {isAdmin && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                                onClick={() => handleDelete(e.id)}
                              >
                                <Trash2 size={12} />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {entries.length === 0 && (
                  <p className="text-center text-muted-foreground py-12 text-sm">
                    কোনো এন্ট্রি নেই — "নতুন এন্ট্রি" বাটনে ক্লিক করুন
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== Report Tab ===== */}
        <TabsContent value="report">
          <Card className="shadow-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                গ্রাহক ভিত্তিক সিগন্যাল রিপোর্ট
              </CardTitle>
              <div className="mt-2">
                <Input
                  placeholder="গ্রাহকের নাম দিয়ে খুঁজুন..."
                  value={reportCustomer}
                  onChange={(e) => setReportCustomer(e.target.value)}
                  className="max-w-xs"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[900px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      {[
                        "গ্রাহকের নাম",
                        "TJ Box No.",
                        "Splitter ধরন",
                        "গ্রাহকের বাসায় সিগন্যাল",
                        "OLT সিগন্যাল",
                        "লাইনে বাকি সিগন্যাল",
                        "গ্রাম",
                        "পাড়া",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left py-2.5 px-3 font-semibold text-muted-foreground whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reportEntries.flatMap((entry) =>
                      entry.customers.length > 0
                        ? entry.customers.map((c) => (
                            <tr
                              key={c.uid || `${entry.id}-${c.name}`}
                              className="border-b border-border last:border-0 hover:bg-muted/20"
                            >
                              <td className="py-2.5 px-3 font-medium">
                                {c.name || "-"}
                              </td>
                              <td className="py-2.5 px-3">
                                {entry.tjBoxNumber}
                              </td>
                              <td className="py-2.5 px-3">
                                <div className="flex gap-1">
                                  {entry.splitter.map((s) => (
                                    <Badge
                                      key={s}
                                      variant="secondary"
                                      className="text-[10px] px-1.5 py-0"
                                    >
                                      {s}
                                    </Badge>
                                  ))}
                                </div>
                              </td>
                              <td className="py-2.5 px-3">
                                {c.signal ? `${c.signal} dBm` : "-"}
                              </td>
                              <td className="py-2.5 px-3">
                                {entry.oltSignal
                                  ? `${entry.oltSignal} dBm`
                                  : "-"}
                              </td>
                              <td className="py-2.5 px-3">
                                {remainingSignal(entry)}
                              </td>
                              <td className="py-2.5 px-3">{entry.village}</td>
                              <td className="py-2.5 px-3">{entry.para}</td>
                            </tr>
                          ))
                        : [
                            <tr
                              key={entry.id}
                              className="border-b border-border last:border-0 hover:bg-muted/20"
                            >
                              <td className="py-2.5 px-3 text-muted-foreground">
                                -
                              </td>
                              <td className="py-2.5 px-3">
                                {entry.tjBoxNumber}
                              </td>
                              <td className="py-2.5 px-3">
                                <div className="flex gap-1">
                                  {entry.splitter.map((s) => (
                                    <Badge
                                      key={s}
                                      variant="secondary"
                                      className="text-[10px] px-1.5 py-0"
                                    >
                                      {s}
                                    </Badge>
                                  ))}
                                </div>
                              </td>
                              <td className="py-2.5 px-3">-</td>
                              <td className="py-2.5 px-3">
                                {entry.oltSignal
                                  ? `${entry.oltSignal} dBm`
                                  : "-"}
                              </td>
                              <td className="py-2.5 px-3">
                                {remainingSignal(entry)}
                              </td>
                              <td className="py-2.5 px-3">{entry.village}</td>
                              <td className="py-2.5 px-3">{entry.para}</td>
                            </tr>,
                          ],
                    )}
                  </tbody>
                </table>
                {reportEntries.length === 0 && (
                  <p className="text-center text-muted-foreground py-12 text-sm">
                    কোনো রিপোর্ট ডেটা নেই
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ===== Add/Edit Modal ===== */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId !== null ? "এন্ট্রি সম্পাদনা" : "নতুন অপটিক্যাল ফাইবার এন্ট্রি"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Optical Fiber + Core */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Optical Fiber *</Label>
                <Select
                  value={form.opticalFiber}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, opticalFiber: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {OPTICAL_FIBERS.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Core রং</Label>
                <Select
                  value={form.core}
                  onValueChange={(v) => setForm((p) => ({ ...p, core: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {CORES.map((c) => (
                      <SelectItem key={c} value={c}>
                        <span className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full inline-block"
                            style={{
                              backgroundColor:
                                c === "নীল"
                                  ? "#3b82f6"
                                  : c === "সবুজ"
                                    ? "#22c55e"
                                    : c === "কমলা"
                                      ? "#f97316"
                                      : "#9ca3af",
                            }}
                          />
                          {c}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Village + Para */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">গ্রাম *</Label>
                <Select
                  value={form.village}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, village: v, para: "" }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="গ্রাম নির্বাচন করুন" />
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
                <Label className="text-xs">পাড়া</Label>
                {form.village ? (
                  <>
                    <Select
                      value={form.para}
                      onValueChange={(v) => setForm((p) => ({ ...p, para: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="পাড়া নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {(paras[form.village] || []).map((para) => (
                          <SelectItem key={para} value={para}>
                            {para}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2 mt-1">
                      <Input
                        className="h-7 text-xs"
                        placeholder="নতুন পাড়া যুক্ত করুন"
                        value={newParaInput}
                        onChange={(e) => setNewParaInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addPara()}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2"
                        onClick={addPara}
                      >
                        <Plus size={12} />
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground pt-2">
                    আগে গ্রাম নির্বাচন করুন
                  </p>
                )}
              </div>
            </div>

            {/* TJ Box + Number */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">TJ Box</Label>
                <Select
                  value={form.tjBox}
                  onValueChange={(v) => setForm((p) => ({ ...p, tjBox: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {TJ_BOX_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">TJ Box Number</Label>
                <Select
                  value={form.tjBoxNumber}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, tjBoxNumber: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="বক্স নম্বর" />
                  </SelectTrigger>
                  <SelectContent>
                    {boxNumbers.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2 mt-1">
                  <Input
                    className="h-7 text-xs"
                    placeholder="নতুন বক্স (যেমন: Box 4)"
                    value={newBoxInput}
                    onChange={(e) => setNewBoxInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addBoxNumber()}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2"
                    onClick={addBoxNumber}
                  >
                    <Plus size={12} />
                  </Button>
                </div>
              </div>
            </div>

            {/* TJ Box Owner */}
            <div className="space-y-1.5">
              <Label className="text-xs">TJ Box Owner (কার বাসায় বক্স আছে)</Label>
              <Input
                value={form.tjBoxOwner}
                onChange={(e) =>
                  setForm((p) => ({ ...p, tjBoxOwner: e.target.value }))
                }
                placeholder="যেমন: মো. রহিম উদ্দিনের বাসা"
              />
            </div>

            {/* Splitter (multi) */}
            <div className="space-y-1.5">
              <Label className="text-xs">
                Splitter ধরন (একাধিক নির্বাচন করা যাবে)
              </Label>
              <div className="flex gap-4">
                {SPLITTER_TYPES.map((s) => {
                  const checkId = `splitter-type-${s}`;
                  return (
                    <div key={s} className="flex items-center gap-2">
                      <Checkbox
                        id={checkId}
                        checked={form.splitter.includes(s)}
                        onCheckedChange={() =>
                          setForm((p) => ({
                            ...p,
                            splitter: toggleItem(p.splitter, s),
                          }))
                        }
                      />
                      <Label
                        htmlFor={checkId}
                        className="text-sm cursor-pointer"
                      >
                        {s}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Splitter Ratio (multi) */}
            <div className="space-y-1.5">
              <Label className="text-xs">
                Splitter Ratio (একাধিক নির্বাচন করা যাবে)
              </Label>
              <div className="flex flex-wrap gap-2">
                {SPLITTER_RATIOS.map((r) => {
                  const ratioId = `splitter-ratio-${r.replace(/[:/]/g, "-")}`;
                  return (
                    <div
                      key={r}
                      className="flex items-center gap-1.5 bg-muted/40 px-2 py-1 rounded-md hover:bg-muted/70"
                    >
                      <Checkbox
                        id={ratioId}
                        checked={form.splitterRatio.includes(r)}
                        onCheckedChange={() =>
                          setForm((p) => ({
                            ...p,
                            splitterRatio: toggleItem(p.splitterRatio, r),
                          }))
                        }
                      />
                      <Label
                        htmlFor={ratioId}
                        className="text-xs cursor-pointer"
                      >
                        {r}
                      </Label>
                    </div>
                  );
                })}
              </div>
              {form.splitterRatio.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {form.splitterRatio.map((r) => (
                    <Badge key={r} variant="secondary" className="text-xs">
                      {r}
                      <button
                        type="button"
                        className="ml-1 hover:text-destructive"
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            splitterRatio: p.splitterRatio.filter(
                              (x) => x !== r,
                            ),
                          }))
                        }
                      >
                        <X size={10} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Signal / Power */}
            <div className="space-y-2 border border-border rounded-lg p-3 bg-muted/20">
              <p className="text-xs font-semibold">Signal / Power রেকর্ড</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    OLT সিগন্যাল (dBm)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={form.oltSignal}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, oltSignal: e.target.value }))
                    }
                    placeholder="-10.00"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    ইনপুট সিগন্যাল (dBm)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={form.signalInput}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, signalInput: e.target.value }))
                    }
                    placeholder="-18.00"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    ফরওয়ার্ড সিগন্যাল (dBm)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={form.signalForward}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, signalForward: e.target.value }))
                    }
                    placeholder="-22.00"
                  />
                </div>
              </div>

              <div className="space-y-1 mt-2">
                <Label className="text-xs text-muted-foreground">
                  এই বক্স থেকে কতজন গ্রাহকের বাসায় লাইন গেছে
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={form.customerCount}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, customerCount: e.target.value }))
                  }
                  placeholder="0"
                  className="w-32"
                />
              </div>

              {form.customers.length > 0 && (
                <div className="space-y-2 mt-2">
                  <p className="text-xs text-muted-foreground">
                    গ্রাহকের নাম ও বাসায় সিগন্যাল (dBm)
                  </p>
                  {form.customers.map((c, ci) => (
                    <div key={c.uid} className="flex gap-2 items-center">
                      <span className="text-xs text-muted-foreground w-5">
                        {ci + 1}.
                      </span>
                      <Input
                        className="flex-1"
                        placeholder="গ্রাহকের নাম"
                        value={c.name}
                        onChange={(e) => {
                          const updated = [...form.customers];
                          updated[ci] = {
                            ...updated[ci],
                            name: e.target.value,
                          };
                          setForm((p) => ({ ...p, customers: updated }));
                        }}
                      />
                      <Input
                        type="number"
                        step="0.01"
                        className="w-28"
                        placeholder="dBm"
                        value={c.signal}
                        onChange={(e) => {
                          const updated = [...form.customers];
                          updated[ci] = {
                            ...updated[ci],
                            signal: e.target.value,
                          };
                          setForm((p) => ({ ...p, customers: updated }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              বাতিল
            </Button>
            <Button
              className="bg-primary text-white"
              onClick={handleSave}
              disabled={saving}
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingId !== null ? "আপডেট করুন" : "যোগ করুন"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CoreBadge({ core }: { core: string }) {
  const color =
    core === "নীল"
      ? "bg-blue-100 text-blue-700"
      : core === "সবুজ"
        ? "bg-green-100 text-green-700"
        : core === "কমলা"
          ? "bg-orange-100 text-orange-700"
          : core === "ছাই"
            ? "bg-gray-100 text-gray-600"
            : "bg-muted text-muted-foreground";
  return core ? (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${color}`}
    >
      {core}
    </span>
  ) : (
    <span className="text-muted-foreground">-</span>
  );
}
