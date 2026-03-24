import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as Button, B as Badge, b as ue } from "./index-Cqep3MYd.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BF7CdB99.js";
import { C as Checkbox } from "./checkbox-DzWdCg2M.js";
import { P as Pencil, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, X, d as DialogFooter } from "./dialog-D7JQKURX.js";
import { I as Input, L as Label } from "./label-s_4LHChw.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BaxxdPmZ.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BDpr6kNX.js";
import { P as Plus, T as Trash2 } from "./trash-2-D325I2G7.js";
import { L as LoaderCircle } from "./loader-circle-BYPEpmLb.js";
import "./index-CvBUWyc_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode);
const OPTICAL_FIBERS = [
  "Optical Fiber Number One",
  "Optical Fiber Number Two",
  "Optical Fiber Number Three",
  "Optical Fiber Number Four",
  "Optical Fiber Number Five"
];
const CORES = ["নীল", "সবুজ", "কমলা", "ছাই"];
const VILLAGES = [
  "বালিগাঁও",
  "বালিগাঁও অষ্ট গ্রাম অঞ্চল",
  "বালিগাঁও লাখাই অঞ্চল",
  "ফরিদপুর",
  "কাটাইয়া",
  "পূর্ব বাজুকা",
  "পশ্চিম বাজুকা"
];
const DEFAULT_PARAS = {
  বালিগাঁও: ["উত্তর পাড়া", "দক্ষিণ পাড়া", "মধ্য পাড়া"],
  "বালিগাঁও অষ্ট গ্রাম অঞ্চল": ["উত্তর পাড়া", "দক্ষিণ পাড়া", "মধ্য পাড়া"],
  "বালিগাঁও লাখাই অঞ্চল": ["উত্তর পাড়া", "দক্ষিণ পাড়া", "মধ্য পাড়া"],
  ফরিদপুর: ["পূর্ব পাড়া", "পশ্চিম পাড়া", "মেইন পাড়া"],
  কাটাইয়া: ["উত্তর পাড়া", "দক্ষিণ পাড়া"],
  "পূর্ব বাজুকা": ["মেইন পাড়া", "নতুন পাড়া"],
  "পশ্চিম বাজুকা": ["মেইন পাড়া", "নতুন পাড়া"]
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
  "40/60"
];
const STORAGE_KEY = "optical_fiber_entries";
const PARAS_KEY = "optical_fiber_paras";
function makeUid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
const emptyEntry = () => ({
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
  customers: []
});
function loadEntries() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}
function loadParas() {
  try {
    const stored = localStorage.getItem(PARAS_KEY);
    return stored ? JSON.parse(stored) : { ...DEFAULT_PARAS };
  } catch {
    return { ...DEFAULT_PARAS };
  }
}
function saveParas(paras) {
  localStorage.setItem(PARAS_KEY, JSON.stringify(paras));
}
function toggleItem(arr, item) {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}
function Network({ isAdmin = false }) {
  const [entries, setEntries] = reactExports.useState(loadEntries);
  const [paras, setParas] = reactExports.useState(loadParas);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyEntry());
  const [newParaInput, setNewParaInput] = reactExports.useState("");
  const [newBoxInput, setNewBoxInput] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const [reportCustomer, setReportCustomer] = reactExports.useState("");
  const [boxNumbers, setBoxNumbers] = reactExports.useState([
    "Box 1",
    "Box 2",
    "Box 3"
  ]);
  const entriesRef = reactExports.useRef(entries);
  entriesRef.current = entries;
  reactExports.useEffect(() => {
    const nums = Array.from(
      new Set(
        entriesRef.current.filter((e) => e.village === form.village && e.para === form.para).map((e) => e.tjBoxNumber)
      )
    ).filter(Boolean);
    if (nums.length === 0) {
      setBoxNumbers(["Box 1", "Box 2", "Box 3"]);
    } else {
      setBoxNumbers(Array.from(new Set(nums)));
    }
  }, [form.village, form.para]);
  reactExports.useEffect(() => {
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
              signal: ""
            }))
          ]
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
  function openEdit(entry) {
    setEditingId(entry.id);
    setForm({ ...entry });
    setNewParaInput("");
    setNewBoxInput("");
    setModalOpen(true);
  }
  async function handleSave() {
    if (!form.opticalFiber || !form.village) {
      ue.error("অপটিক্যাল ফাইবার এবং গ্রাম নির্বাচন করুন");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    let updated;
    if (editingId !== null) {
      updated = entries.map(
        (e) => e.id === editingId ? { ...form, id: editingId } : e
      );
      ue.success("এন্ট্রি আপডেট হয়েছে");
    } else {
      const newId = Date.now();
      updated = [...entries, { ...form, id: newId }];
      ue.success("নতুন এন্ট্রি যুক্ত হয়েছে");
    }
    setEntries(updated);
    saveEntries(updated);
    setSaving(false);
    setModalOpen(false);
  }
  function handleDelete(id) {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveEntries(updated);
    ue.success("এন্ট্রি মুছে ফেলা হয়েছে");
  }
  function addPara() {
    if (!form.village || !newParaInput.trim()) return;
    const updated = {
      ...paras,
      [form.village]: [...paras[form.village] || [], newParaInput.trim()]
    };
    setParas(updated);
    saveParas(updated);
    setForm((p) => ({ ...p, para: newParaInput.trim() }));
    setNewParaInput("");
    ue.success("নতুন পাড়া যুক্ত হয়েছে");
  }
  function addBoxNumber() {
    if (!newBoxInput.trim()) return;
    setBoxNumbers((p) => [...p, newBoxInput.trim()]);
    setForm((p) => ({ ...p, tjBoxNumber: newBoxInput.trim() }));
    setNewBoxInput("");
  }
  function remainingSignal(entry) {
    const input = Number.parseFloat(entry.signalInput);
    const forward = Number.parseFloat(entry.signalForward);
    if (!Number.isNaN(input) && !Number.isNaN(forward)) {
      return `${(input - forward).toFixed(2)} dBm`;
    }
    return "-";
  }
  const reportEntries = entries.filter(
    (e) => reportCustomer.trim() === "" ? true : e.customers.some(
      (c) => c.name.toLowerCase().includes(reportCustomer.toLowerCase())
    )
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "network.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "management", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "management", children: "ফাইবার ম্যানেজমেন্ট" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "report", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 14, className: "mr-1.5" }),
          "রিপোর্ট"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "management", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "অপটিক্যাল ফাইবার তালিকা" }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "bg-primary text-white",
              size: "sm",
              onClick: openAdd,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15, className: "mr-1.5" }),
                "নতুন এন্ট্রি"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs min-w-[1200px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: [
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
              "অ্যাকশন"
            ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "text-left py-2.5 px-3 font-semibold text-muted-foreground whitespace-nowrap",
                children: h
              },
              h
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: entries.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border last:border-0 hover:bg-muted/20",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground", children: i + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-medium whitespace-nowrap", children: e.opticalFiber.replace(
                    "Optical Fiber Number ",
                    "OFN "
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CoreBadge, { core: e.core }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 whitespace-nowrap", children: e.village }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 whitespace-nowrap", children: e.para }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 whitespace-nowrap", children: e.tjBox }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: e.tjBoxNumber }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 whitespace-nowrap", children: e.tjBoxOwner || "-" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: e.splitter.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-[10px] px-1.5 py-0",
                      children: s
                    },
                    s
                  )) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                    e.splitterRatio.slice(0, 2).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-[10px] px-1.5 py-0",
                        children: r
                      },
                      r
                    )),
                    e.splitterRatio.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-[10px] px-1.5 py-0",
                        children: [
                          "+",
                          e.splitterRatio.length - 2
                        ]
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-center", children: e.signalInput ? `${e.signalInput} dBm` : "-" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-center", children: e.signalForward ? `${e.signalForward} dBm` : "-" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-center", children: [
                    e.customerCount || "0",
                    " জন"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        className: "h-7 w-7 p-0",
                        onClick: () => openEdit(e),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 12 })
                      }
                    ),
                    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        className: "h-7 w-7 p-0 text-destructive hover:text-destructive",
                        onClick: () => handleDelete(e.id),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 })
                      }
                    )
                  ] }) })
                ]
              },
              e.id
            )) })
          ] }),
          entries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-12 text-sm", children: 'কোনো এন্ট্রি নেই — "নতুন এন্ট্রি" বাটনে ক্লিক করুন' })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "report", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "গ্রাহক ভিত্তিক সিগন্যাল রিপোর্ট" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "গ্রাহকের নাম দিয়ে খুঁজুন...",
              value: reportCustomer,
              onChange: (e) => setReportCustomer(e.target.value),
              className: "max-w-xs"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs min-w-[900px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: [
              "গ্রাহকের নাম",
              "TJ Box No.",
              "Splitter ধরন",
              "গ্রাহকের বাসায় সিগন্যাল",
              "OLT সিগন্যাল",
              "লাইনে বাকি সিগন্যাল",
              "গ্রাম",
              "পাড়া"
            ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "text-left py-2.5 px-3 font-semibold text-muted-foreground whitespace-nowrap",
                children: h
              },
              h
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: reportEntries.flatMap(
              (entry) => entry.customers.length > 0 ? entry.customers.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border last:border-0 hover:bg-muted/20",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-medium", children: c.name || "-" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: entry.tjBoxNumber }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: entry.splitter.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: "text-[10px] px-1.5 py-0",
                        children: s
                      },
                      s
                    )) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: c.signal ? `${c.signal} dBm` : "-" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: entry.oltSignal ? `${entry.oltSignal} dBm` : "-" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: remainingSignal(entry) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: entry.village }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: entry.para })
                  ]
                },
                c.uid || `${entry.id}-${c.name}`
              )) : [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-b border-border last:border-0 hover:bg-muted/20",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground", children: "-" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: entry.tjBoxNumber }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: entry.splitter.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "text-[10px] px-1.5 py-0",
                          children: s
                        },
                        s
                      )) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: "-" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: entry.oltSignal ? `${entry.oltSignal} dBm` : "-" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: remainingSignal(entry) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: entry.village }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: entry.para })
                    ]
                  },
                  entry.id
                )
              ]
            ) })
          ] }),
          reportEntries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-12 text-sm", children: "কোনো রিপোর্ট ডেটা নেই" })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: modalOpen, onOpenChange: setModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingId !== null ? "এন্ট্রি সম্পাদনা" : "নতুন অপটিক্যাল ফাইবার এন্ট্রি" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Optical Fiber *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.opticalFiber,
                onValueChange: (v) => setForm((p) => ({ ...p, opticalFiber: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "নির্বাচন করুন" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: OPTICAL_FIBERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f, children: f }, f)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Core রং" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.core,
                onValueChange: (v) => setForm((p) => ({ ...p, core: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "নির্বাচন করুন" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CORES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-3 h-3 rounded-full inline-block",
                        style: {
                          backgroundColor: c === "নীল" ? "#3b82f6" : c === "সবুজ" ? "#22c55e" : c === "কমলা" ? "#f97316" : "#9ca3af"
                        }
                      }
                    ),
                    c
                  ] }) }, c)) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "গ্রাম *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.village,
                onValueChange: (v) => setForm((p) => ({ ...p, village: v, para: "" })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "গ্রাম নির্বাচন করুন" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: VILLAGES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: v, children: v }, v)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "পাড়া" }),
            form.village ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.para,
                  onValueChange: (v) => setForm((p) => ({ ...p, para: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "পাড়া নির্বাচন করুন" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (paras[form.village] || []).map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: para, children: para }, para)) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: "h-7 text-xs",
                    placeholder: "নতুন পাড়া যুক্ত করুন",
                    value: newParaInput,
                    onChange: (e) => setNewParaInput(e.target.value),
                    onKeyDown: (e) => e.key === "Enter" && addPara()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "h-7 px-2",
                    onClick: addPara,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 })
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pt-2", children: "আগে গ্রাম নির্বাচন করুন" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "TJ Box" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.tjBox,
                onValueChange: (v) => setForm((p) => ({ ...p, tjBox: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "নির্বাচন করুন" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TJ_BOX_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "TJ Box Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.tjBoxNumber,
                onValueChange: (v) => setForm((p) => ({ ...p, tjBoxNumber: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বক্স নম্বর" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: boxNumbers.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b, children: b }, b)) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  className: "h-7 text-xs",
                  placeholder: "নতুন বক্স (যেমন: Box 4)",
                  value: newBoxInput,
                  onChange: (e) => setNewBoxInput(e.target.value),
                  onKeyDown: (e) => e.key === "Enter" && addBoxNumber()
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-7 px-2",
                  onClick: addBoxNumber,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 })
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "TJ Box Owner (কার বাসায় বক্স আছে)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.tjBoxOwner,
              onChange: (e) => setForm((p) => ({ ...p, tjBoxOwner: e.target.value })),
              placeholder: "যেমন: মো. রহিম উদ্দিনের বাসা"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Splitter ধরন (একাধিক নির্বাচন করা যাবে)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: SPLITTER_TYPES.map((s) => {
            const checkId = `splitter-type-${s}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: checkId,
                  checked: form.splitter.includes(s),
                  onCheckedChange: () => setForm((p) => ({
                    ...p,
                    splitter: toggleItem(p.splitter, s)
                  }))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: checkId,
                  className: "text-sm cursor-pointer",
                  children: s
                }
              )
            ] }, s);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Splitter Ratio (একাধিক নির্বাচন করা যাবে)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SPLITTER_RATIOS.map((r) => {
            const ratioId = `splitter-ratio-${r.replace(/[:/]/g, "-")}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 bg-muted/40 px-2 py-1 rounded-md hover:bg-muted/70",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      id: ratioId,
                      checked: form.splitterRatio.includes(r),
                      onCheckedChange: () => setForm((p) => ({
                        ...p,
                        splitterRatio: toggleItem(p.splitterRatio, r)
                      }))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: ratioId,
                      className: "text-xs cursor-pointer",
                      children: r
                    }
                  )
                ]
              },
              r
            );
          }) }),
          form.splitterRatio.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: form.splitterRatio.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
            r,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "ml-1 hover:text-destructive",
                onClick: () => setForm((p) => ({
                  ...p,
                  splitterRatio: p.splitterRatio.filter(
                    (x) => x !== r
                  )
                })),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 10 })
              }
            )
          ] }, r)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 border border-border rounded-lg p-3 bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold", children: "Signal / Power রেকর্ড" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "OLT সিগন্যাল (dBm)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  step: "0.01",
                  value: form.oltSignal,
                  onChange: (e) => setForm((p) => ({ ...p, oltSignal: e.target.value })),
                  placeholder: "-10.00"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "ইনপুট সিগন্যাল (dBm)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  step: "0.01",
                  value: form.signalInput,
                  onChange: (e) => setForm((p) => ({ ...p, signalInput: e.target.value })),
                  placeholder: "-18.00"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "ফরওয়ার্ড সিগন্যাল (dBm)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  step: "0.01",
                  value: form.signalForward,
                  onChange: (e) => setForm((p) => ({ ...p, signalForward: e.target.value })),
                  placeholder: "-22.00"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "এই বক্স থেকে কতজন গ্রাহকের বাসায় লাইন গেছে" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "0",
                value: form.customerCount,
                onChange: (e) => setForm((p) => ({ ...p, customerCount: e.target.value })),
                placeholder: "0",
                className: "w-32"
              }
            )
          ] }),
          form.customers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "গ্রাহকের নাম ও বাসায় সিগন্যাল (dBm)" }),
            form.customers.map((c, ci) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-5", children: [
                ci + 1,
                "."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  className: "flex-1",
                  placeholder: "গ্রাহকের নাম",
                  value: c.name,
                  onChange: (e) => {
                    const updated = [...form.customers];
                    updated[ci] = {
                      ...updated[ci],
                      name: e.target.value
                    };
                    setForm((p) => ({ ...p, customers: updated }));
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  step: "0.01",
                  className: "w-28",
                  placeholder: "dBm",
                  value: c.signal,
                  onChange: (e) => {
                    const updated = [...form.customers];
                    updated[ci] = {
                      ...updated[ci],
                      signal: e.target.value
                    };
                    setForm((p) => ({ ...p, customers: updated }));
                  }
                }
              )
            ] }, c.uid))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setModalOpen(false), children: "বাতিল" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "bg-primary text-white",
            onClick: handleSave,
            disabled: saving,
            children: [
              saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
              editingId !== null ? "আপডেট করুন" : "যোগ করুন"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
function CoreBadge({ core }) {
  const color = core === "নীল" ? "bg-blue-100 text-blue-700" : core === "সবুজ" ? "bg-green-100 text-green-700" : core === "কমলা" ? "bg-orange-100 text-orange-700" : core === "ছাই" ? "bg-gray-100 text-gray-600" : "bg-muted text-muted-foreground";
  return core ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `px-2 py-0.5 rounded-full text-[10px] font-medium ${color}`,
      children: core
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "-" });
}
export {
  Network as default
};
