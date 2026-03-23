import { j as jsxRuntimeExports, f as cn, u as useCompanySettings, r as reactExports, a as Button, b as ue } from "./index-vIdg1x08.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Cp7soQnc.js";
import { P as Pencil, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-DlNwAgRe.js";
import { L as Label, I as Input } from "./label-D06uwrr_.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-w3QScjr2.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BVasnxrH.js";
import { u as useActor } from "./useActor-De4uoqOe.js";
import { p as printDocument } from "./printDocument-DGKOt1W0.js";
import { D as Download } from "./download-4UsNNomT.js";
import { P as Plus, T as Trash2 } from "./trash-2-DduYBHgO.js";
import "./index-BnYIJpRf.js";
import "./useQuery-5mpBbnj1.js";
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
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
  "ডিসেম্বর"
];
const CURRENT_YEAR = (/* @__PURE__ */ new Date()).getFullYear();
function formatBanglaMonthDM(dateStr) {
  const d = new Date(dateStr);
  return `${BANGLA_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}
function getDateFromBanglaMonth(banglaMonth) {
  const parts = banglaMonth.trim().split(/\s+/);
  const monthName = parts[0];
  const year = parts[1] || String((/* @__PURE__ */ new Date()).getFullYear());
  const monthIdx = BANGLA_MONTHS.indexOf(monthName);
  const m = monthIdx >= 0 ? monthIdx + 1 : 1;
  return `${year}-${String(m).padStart(2, "0")}-01`;
}
const YEARS = Array.from({ length: 5 }, (_, i) => String(CURRENT_YEAR - 2 + i));
function formatCurrency(n) {
  return `৳${Number(n).toLocaleString("bn-BD")}`;
}
function DebtManagement({ isAdmin }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "debts.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "receivables", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", "data-ocid": "debts.tab", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "receivables", "data-ocid": "debts.receivables.tab", children: "প্রাপ্য বকেয়া" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "payables", "data-ocid": "debts.payables.tab", children: "প্রদেয় বকেয়া" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "receivables", className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectionFeeDuesSection, { isAdmin }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommissionDuesSection, { isAdmin })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "payables", className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TechnicianSalarySection, { isAdmin }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(WholesalerDuesSection, { isAdmin }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdvanceRechargeDuesSection, { isAdmin })
    ] })
  ] }) });
}
function ConnectionFeeDuesSection({ isAdmin }) {
  const { actor } = useActor();
  const { settings } = useCompanySettings();
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editItem, setEditItem] = reactExports.useState(null);
  const [filterMonth, setFilterMonth] = reactExports.useState("all");
  const [filterYear, setFilterYear] = reactExports.useState("all");
  const [form, setForm] = reactExports.useState({
    cidNumber: "",
    userName: "",
    mobile: "",
    address: "",
    dueMonth: "",
    dueAmount: ""
  });
  const load = reactExports.useCallback(async (a) => {
    try {
      const data = await a.getConnectionFeeDues();
      setItems(data.sort((x, y) => Number(x.serial) - Number(y.serial)));
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
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
      dueAmount: ""
    });
    setDialogOpen(true);
  }
  function openEdit(item) {
    setEditItem(item);
    setForm({
      cidNumber: item.cidNumber,
      userName: item.userName,
      mobile: item.mobile,
      address: item.address,
      dueMonth: item.dueMonth,
      dueAmount: String(item.dueAmount)
    });
    setDialogOpen(true);
  }
  async function handleSave() {
    if (!actor) return;
    const record = {
      id: (editItem == null ? void 0 : editItem.id) ?? crypto.randomUUID(),
      serial: (editItem == null ? void 0 : editItem.serial) ?? BigInt(items.length + 1),
      cidNumber: form.cidNumber,
      userName: form.userName,
      mobile: form.mobile,
      address: form.address,
      dueMonth: form.dueMonth,
      dueAmount: Number(form.dueAmount),
      createdAt: (editItem == null ? void 0 : editItem.createdAt) ?? BigInt(Date.now())
    };
    try {
      if (editItem) {
        await actor.updateConnectionFeeDue(record);
        ue.success("আপডেট হয়েছে");
      } else {
        await actor.addConnectionFeeDue(record);
        ue.success("যুক্ত হয়েছে");
      }
      try {
        const allFinancials = await actor.getCustomerFinancials();
        const existingFin = allFinancials.find((f) => f.cidNumber === form.cidNumber);
        await actor.updateCustomerFinancial({
          cidNumber: form.cidNumber,
          connectionFeeCash: (existingFin == null ? void 0 : existingFin.connectionFeeCash) ?? 0,
          connectionFeeDue: Number(form.dueAmount)
        });
      } catch {
      }
      setDialogOpen(false);
      load(actor);
    } catch {
      ue.error("সমস্যা হয়েছে");
    }
  }
  async function handleDelete(id) {
    if (!actor || !confirm("মুছে ফেলবেন?")) return;
    try {
      await actor.deleteConnectionFeeDue(id);
      ue.success("মুছে ফেলা হয়েছে");
      load(actor);
    } catch {
      ue.error("সমস্যা হয়েছে");
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
    const rows = filtered.map(
      (item, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>${item.cidNumber}</td>
        <td>${item.userName}</td>
        <td>${item.mobile}</td>
        <td>${item.address}</td>
        <td>${item.dueMonth}</td>
        <td style="text-align:right;font-weight:bold">৳${Number(item.dueAmount).toLocaleString()}</td>
      </tr>`
    ).join("");
    const body = `<table>
      <thead><tr>
        <th>ক্র.</th><th>সিআইডি</th><th>ইউজার নেম</th><th>মোবাইল</th><th>ঠিকানা</th><th>বকেয়া মাস</th><th>বকেয়া</th>
      </tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td colspan="6">মোট</td><td style="text-align:right">৳${total.toLocaleString()}</td></tr></tfoot>
    </table>`;
    printDocument("সংযোগ ফি বকেয়া তালিকা", body, settings);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", "data-ocid": "debts.connection_fee.card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "সংযোগ ফি বকেয়া" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterMonth, onValueChange: setFilterMonth, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-32 h-8 text-xs",
                "data-ocid": "debts.connection_fee.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "মাস" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব মাস" }),
              BANGLA_MONTHS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m, children: m }, m))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterYear, onValueChange: setFilterYear, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-24 h-8 text-xs",
                "data-ocid": "debts.connection_fee.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বছর" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব বছর" }),
              YEARS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: y, children: y }, y))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-8 gap-1 text-xs",
              "data-ocid": "debts.connection_fee.upload_button",
              onClick: handlePrint,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                " PDF"
              ]
            }
          ),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "h-8 gap-1 text-xs",
              "data-ocid": "debts.connection_fee.open_modal_button",
              onClick: openAdd,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
                " যুক্ত করুন"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-orange-600 mt-2", children: [
        "মোট বকেয়া: ",
        formatCurrency(total)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "ক্র." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "সিআইডি" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "ইউজার নেম" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "মোবাইল" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "ঠিকানা" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "বকেয়া মাস" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-right", children: "বকেয়া" }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "অ্যাকশন" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 8,
            className: "text-center text-sm py-6 text-muted-foreground",
            "data-ocid": "debts.connection_fee.loading_state",
            children: "লোড হচ্ছে..."
          }
        ) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { "data-ocid": "debts.connection_fee.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 8,
            className: "text-center text-sm py-6 text-muted-foreground",
            children: "কোনো তথ্য নেই"
          }
        ) }) : filtered.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `debts.connection_fee.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: idx + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.cidNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.userName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.mobile }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.address }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.dueMonth }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right font-medium text-orange-600", children: formatCurrency(Number(item.dueAmount)) }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "icon",
                    variant: "ghost",
                    className: "h-6 w-6",
                    "data-ocid": `debts.connection_fee.edit_button.${idx + 1}`,
                    onClick: () => openEdit(item),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 11 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "icon",
                    variant: "ghost",
                    className: "h-6 w-6 text-destructive",
                    "data-ocid": `debts.connection_fee.delete_button.${idx + 1}`,
                    onClick: () => handleDelete(item.id),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 11 })
                  }
                )
              ] }) })
            ]
          },
          item.id
        )),
        filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/50 font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-xs", children: "মোট" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right text-orange-600", children: formatCurrency(total) }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, {})
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "debts.connection_fee.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editItem ? "এডিট করুন" : "নতুন সংযোগ ফি বকেয়া" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "সিআইডি নম্বর" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                "data-ocid": "debts.connection_fee.input",
                value: form.cidNumber,
                onChange: (e) => setForm((p) => ({ ...p, cidNumber: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ইউজার নেম/আইডি" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                "data-ocid": "debts.connection_fee.input",
                value: form.userName,
                onChange: (e) => setForm((p) => ({ ...p, userName: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "মোবাইল নম্বর" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                "data-ocid": "debts.connection_fee.input",
                value: form.mobile,
                onChange: (e) => setForm((p) => ({ ...p, mobile: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ঠিকানা" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                "data-ocid": "debts.connection_fee.input",
                value: form.address,
                onChange: (e) => setForm((p) => ({ ...p, address: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "কোন মাসের বকেয়া" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                placeholder: "যেমন: জানুয়ারি ২০২৬",
                "data-ocid": "debts.connection_fee.input",
                value: form.dueMonth,
                onChange: (e) => setForm((p) => ({ ...p, dueMonth: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "বকেয়া (টাকা)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                type: "number",
                "data-ocid": "debts.connection_fee.input",
                value: form.dueAmount,
                onChange: (e) => setForm((p) => ({ ...p, dueAmount: e.target.value }))
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            "data-ocid": "debts.connection_fee.cancel_button",
            onClick: () => setDialogOpen(false),
            children: "বাতিল"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "debts.connection_fee.save_button",
            onClick: handleSave,
            children: "সেভ করুন"
          }
        )
      ] })
    ] }) })
  ] });
}
function CommissionDuesSection({ isAdmin }) {
  const { actor } = useActor();
  const { settings } = useCompanySettings();
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editItem, setEditItem] = reactExports.useState(null);
  const [filterMonth, setFilterMonth] = reactExports.useState("all");
  const [filterYear, setFilterYear] = reactExports.useState("all");
  const [form, setForm] = reactExports.useState({
    dueMonth: "",
    totalCommission: "",
    paidCommission: ""
  });
  const [commissionAutoFilled, setCommissionAutoFilled] = reactExports.useState(false);
  const load = reactExports.useCallback(async (a) => {
    try {
      const data = await a.getCommissionDues();
      setItems(data.sort((x, y) => Number(x.serial) - Number(y.serial)));
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    if (actor) load(actor);
  }, [actor, load]);
  async function openAdd() {
    setEditItem(null);
    let autoCommission = "";
    if (actor) {
      try {
        const customers = await actor.getCustomers();
        const total = customers.reduce(
          (sum, c) => {
            const periods = Math.max(
              0,
              Math.floor(
                (Date.now() - Number(c.connectionDate / 1000000n)) / (30 * 24 * 60 * 60 * 1e3)
              )
            );
            return sum + periods * Math.round(c.monthlyFee * (c.commissionPercent ?? 30) / 100);
          },
          0
        );
        autoCommission = String(Math.round(total));
      } catch {
      }
    }
    setCommissionAutoFilled(autoCommission !== "");
    setForm({
      dueMonth: "",
      totalCommission: autoCommission,
      paidCommission: ""
    });
    setDialogOpen(true);
  }
  function openEdit(item) {
    setEditItem(item);
    setForm({
      dueMonth: item.dueMonth,
      totalCommission: String(item.totalCommission),
      paidCommission: String(item.paidCommission)
    });
    setDialogOpen(true);
  }
  async function handleSave() {
    if (!actor) return;
    const total = Number(form.totalCommission);
    const paid = Number(form.paidCommission);
    const record = {
      id: (editItem == null ? void 0 : editItem.id) ?? crypto.randomUUID(),
      serial: (editItem == null ? void 0 : editItem.serial) ?? BigInt(items.length + 1),
      commissionSource: "Delta Software and Communication Limited",
      dueMonth: form.dueMonth,
      totalCommission: total,
      paidCommission: paid,
      outstandingCommission: total - paid,
      createdAt: (editItem == null ? void 0 : editItem.createdAt) ?? BigInt(Date.now())
    };
    try {
      if (editItem) {
        await actor.updateCommissionDue(record);
        ue.success("আপডেট হয়েছে");
      } else {
        await actor.addCommissionDue(record);
        ue.success("যুক্ত হয়েছে");
      }
      setDialogOpen(false);
      load(actor);
    } catch {
      ue.error("সমস্যা হয়েছে");
    }
  }
  async function handleDelete(id) {
    if (!actor || !confirm("মুছে ফেলবেন?")) return;
    try {
      await actor.deleteCommissionDue(id);
      ue.success("মুছে ফেলা হয়েছে");
      load(actor);
    } catch {
      ue.error("সমস্যা হয়েছে");
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
    0
  );
  function handlePrint() {
    const rows = filtered.map(
      (item, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>${item.commissionSource}</td>
        <td>${item.dueMonth}</td>
        <td style="text-align:right">৳${Number(item.totalCommission).toLocaleString()}</td>
        <td style="text-align:right;color:green">৳${Number(item.paidCommission).toLocaleString()}</td>
        <td style="text-align:right;font-weight:bold">৳${Number(item.outstandingCommission).toLocaleString()}</td>
      </tr>`
    ).join("");
    const body = `<table>
      <thead><tr><th>ক্র.</th><th>উৎস</th><th>মাস</th><th>মোট কমিশন</th><th>পরিশোধিত</th><th>বকেয়া</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td colspan="5">মোট বকেয়া</td><td style="text-align:right">৳${totalOutstanding.toLocaleString()}</td></tr></tfoot>
    </table>`;
    printDocument("কমিশন বকেয়া তালিকা", body, settings);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", "data-ocid": "debts.commission.card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "কমিশন বকেয়া" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterMonth, onValueChange: setFilterMonth, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-32 h-8 text-xs",
                "data-ocid": "debts.commission.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "মাস" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব মাস" }),
              BANGLA_MONTHS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m, children: m }, m))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterYear, onValueChange: setFilterYear, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-24 h-8 text-xs",
                "data-ocid": "debts.commission.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বছর" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব বছর" }),
              YEARS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: y, children: y }, y))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-8 gap-1 text-xs",
              "data-ocid": "debts.commission.upload_button",
              onClick: handlePrint,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                " PDF"
              ]
            }
          ),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "h-8 gap-1 text-xs",
              "data-ocid": "debts.commission.open_modal_button",
              onClick: openAdd,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
                " যুক্ত করুন"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-orange-600 mt-2", children: [
        "মোট বকেয়া: ",
        formatCurrency(totalOutstanding)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "ক্র." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "কমিশন উৎস" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "মাস" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-right", children: "মোট" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-right", children: "পরিশোধিত" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-right", children: "বকেয়া" }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "অ্যাকশন" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 7,
            className: "text-center text-sm py-6 text-muted-foreground",
            "data-ocid": "debts.commission.loading_state",
            children: "লোড হচ্ছে..."
          }
        ) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { "data-ocid": "debts.commission.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 7,
            className: "text-center text-sm py-6 text-muted-foreground",
            children: "কোনো তথ্য নেই"
          }
        ) }) : filtered.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `debts.commission.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: idx + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs max-w-[180px] truncate", children: item.commissionSource }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.dueMonth }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right", children: formatCurrency(Number(item.totalCommission)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right text-green-600", children: formatCurrency(Number(item.paidCommission)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right font-medium text-orange-600", children: formatCurrency(Number(item.outstandingCommission)) }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "icon",
                    variant: "ghost",
                    className: "h-6 w-6",
                    "data-ocid": `debts.commission.edit_button.${idx + 1}`,
                    onClick: () => openEdit(item),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 11 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "icon",
                    variant: "ghost",
                    className: "h-6 w-6 text-destructive",
                    "data-ocid": `debts.commission.delete_button.${idx + 1}`,
                    onClick: () => handleDelete(item.id),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 11 })
                  }
                )
              ] }) })
            ]
          },
          item.id
        )),
        filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/50 font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "text-xs", children: "মোট বকেয়া" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right text-orange-600", children: formatCurrency(totalOutstanding) }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, {})
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "debts.commission.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editItem ? "এডিট" : "নতুন কমিশন বকেয়া" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "কমিশন উৎস" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "h-8 text-sm mt-1",
              value: "Delta Software and Communication Limited",
              disabled: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "কোন মাসের কমিশন বাকি" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "h-8 text-sm mt-1",
              placeholder: "যেমন: জানুয়ারি ২০২৬",
              "data-ocid": "debts.commission.input",
              value: form.dueMonth,
              onChange: (e) => setForm((p) => ({ ...p, dueMonth: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "মোট কমিশন" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                type: "number",
                "data-ocid": "debts.commission.input",
                value: form.totalCommission,
                onChange: (e) => setForm((p) => ({ ...p, totalCommission: e.target.value }))
              }
            ),
            commissionAutoFilled && !editItem && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600 mt-1", children: "আর্থিক ব্যবস্থাপনার হিসাব অনুযায়ী স্বয়ংক্রিয়ভাবে পূরণ হয়েছে" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "পরিশোধিত" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                type: "number",
                "data-ocid": "debts.commission.input",
                value: form.paidCommission,
                onChange: (e) => setForm((p) => ({ ...p, paidCommission: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "বকেয়া (স্বয়ংক্রিয়)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "h-8 text-sm mt-1",
              disabled: true,
              value: String(
                Number(form.totalCommission || 0) - Number(form.paidCommission || 0)
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            "data-ocid": "debts.commission.cancel_button",
            onClick: () => setDialogOpen(false),
            children: "বাতিল"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "debts.commission.save_button",
            onClick: handleSave,
            children: "সেভ করুন"
          }
        )
      ] })
    ] }) })
  ] });
}
function TechnicianSalarySection({ isAdmin }) {
  const { actor } = useActor();
  const { settings } = useCompanySettings();
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editItem, setEditItem] = reactExports.useState(null);
  const [filterMonth, setFilterMonth] = reactExports.useState("all");
  const [filterYear, setFilterYear] = reactExports.useState("all");
  const [form, setForm] = reactExports.useState({
    technicianName: "",
    dueMonth: "",
    dueAmount: "",
    totalDue: ""
  });
  const load = reactExports.useCallback(async (a) => {
    try {
      const data = await a.getTechnicianSalaryDues();
      setItems(data.sort((x, y) => Number(x.serial) - Number(y.serial)));
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    if (actor) load(actor);
  }, [actor, load]);
  function openAdd() {
    setEditItem(null);
    setForm({ technicianName: "", dueMonth: "", dueAmount: "", totalDue: "" });
    setDialogOpen(true);
  }
  function openEdit(item) {
    setEditItem(item);
    setForm({
      technicianName: item.technicianName,
      dueMonth: item.dueMonth,
      dueAmount: String(item.dueAmount),
      totalDue: String(item.totalDue)
    });
    setDialogOpen(true);
  }
  async function handleSave() {
    if (!actor) return;
    const record = {
      id: (editItem == null ? void 0 : editItem.id) ?? crypto.randomUUID(),
      serial: (editItem == null ? void 0 : editItem.serial) ?? BigInt(items.length + 1),
      technicianName: form.technicianName,
      dueMonth: form.dueMonth,
      dueAmount: Number(form.dueAmount),
      totalDue: Number(form.totalDue),
      createdAt: (editItem == null ? void 0 : editItem.createdAt) ?? BigInt(Date.now())
    };
    try {
      if (editItem) {
        await actor.updateTechnicianSalaryDue(record);
        ue.success("আপডেট হয়েছে");
      } else {
        await actor.addTechnicianSalaryDue(record);
        ue.success("যুক্ত হয়েছে");
      }
      try {
        const allExpenses = await actor.getExpenses();
        const monthName = record.dueMonth.split(" ")[0];
        const existingExp = allExpenses.find(
          (e) => e.category === "টেকনিশিয়ান বেতন" && e.description === record.technicianName && formatBanglaMonthDM(e.date).startsWith(monthName)
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
            createdAt: BigInt(Date.now())
          });
        } else {
          await actor.updateExpense({
            ...existingExp,
            amount: record.dueAmount,
            rate: record.dueAmount
          });
        }
      } catch {
      }
      setDialogOpen(false);
      load(actor);
    } catch {
      ue.error("সমস্যা হয়েছে");
    }
  }
  async function handleDelete(id) {
    if (!actor || !confirm("মুছে ফেলবেন?")) return;
    try {
      await actor.deleteTechnicianSalaryDue(id);
      ue.success("মুছে ফেলা হয়েছে");
      load(actor);
    } catch {
      ue.error("সমস্যা হয়েছে");
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
    const rows = filtered.map(
      (item, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>${item.technicianName}</td>
        <td>${item.dueMonth}</td>
        <td style="text-align:right">৳${Number(item.dueAmount).toLocaleString()}</td>
        <td style="text-align:right;font-weight:bold;color:#dc2626">৳${Number(item.totalDue).toLocaleString()}</td>
      </tr>`
    ).join("");
    const body = `<table>
      <thead><tr><th>ক্র.</th><th>নাম</th><th>মাস</th><th>বাকি পরিমাণ</th><th>সর্বমোট বকেয়া</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td colspan="4">সর্বমোট</td><td style="text-align:right">৳${totalDue.toLocaleString()}</td></tr></tfoot>
    </table>`;
    printDocument("টেকনিশিয়ান বেতন বকেয়া", body, settings);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", "data-ocid": "debts.technician.card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "টেকনিশিয়ানের বেতন বকেয়া" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterMonth, onValueChange: setFilterMonth, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-32 h-8 text-xs",
                "data-ocid": "debts.technician.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "মাস" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব মাস" }),
              BANGLA_MONTHS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m, children: m }, m))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterYear, onValueChange: setFilterYear, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-24 h-8 text-xs",
                "data-ocid": "debts.technician.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বছর" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব বছর" }),
              YEARS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: y, children: y }, y))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-8 gap-1 text-xs",
              "data-ocid": "debts.technician.upload_button",
              onClick: handlePrint,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                " PDF"
              ]
            }
          ),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "h-8 gap-1 text-xs",
              "data-ocid": "debts.technician.open_modal_button",
              onClick: openAdd,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
                " যুক্ত করুন"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-red-600 mt-2", children: [
        "সর্বমোট বকেয়া: ",
        formatCurrency(totalDue)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "ক্র." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "নাম" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "মাস" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-right", children: "বাকি" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-right", children: "সর্বমোট বকেয়া" }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "অ্যাকশন" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 6,
            className: "text-center text-sm py-6 text-muted-foreground",
            "data-ocid": "debts.technician.loading_state",
            children: "লোড হচ্ছে..."
          }
        ) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { "data-ocid": "debts.technician.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 6,
            className: "text-center text-sm py-6 text-muted-foreground",
            children: "কোনো তথ্য নেই"
          }
        ) }) : filtered.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `debts.technician.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: idx + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs font-medium", children: item.technicianName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.dueMonth }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right", children: formatCurrency(Number(item.dueAmount)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right font-medium text-red-600", children: formatCurrency(Number(item.totalDue)) }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "icon",
                    variant: "ghost",
                    className: "h-6 w-6",
                    "data-ocid": `debts.technician.edit_button.${idx + 1}`,
                    onClick: () => openEdit(item),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 11 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "icon",
                    variant: "ghost",
                    className: "h-6 w-6 text-destructive",
                    "data-ocid": `debts.technician.delete_button.${idx + 1}`,
                    onClick: () => handleDelete(item.id),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 11 })
                  }
                )
              ] }) })
            ]
          },
          item.id
        )),
        filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/50 font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 4, className: "text-xs", children: "সর্বমোট" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right text-red-600", children: formatCurrency(totalDue) }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, {})
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "debts.technician.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editItem ? "এডিট" : "নতুন বেতন বকেয়া" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "টেকনিশিয়ানের নাম" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "h-8 text-sm mt-1",
              "data-ocid": "debts.technician.input",
              value: form.technicianName,
              onChange: (e) => setForm((p) => ({ ...p, technicianName: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "কোন মাসের বেতন বাকি" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                placeholder: "মার্চ ২০২৬",
                "data-ocid": "debts.technician.input",
                value: form.dueMonth,
                onChange: (e) => setForm((p) => ({ ...p, dueMonth: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "বাকি টাকা" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                type: "number",
                "data-ocid": "debts.technician.input",
                value: form.dueAmount,
                onChange: (e) => setForm((p) => ({ ...p, dueAmount: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "সর্বমোট বকেয়া" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "h-8 text-sm mt-1",
              type: "number",
              "data-ocid": "debts.technician.input",
              value: form.totalDue,
              onChange: (e) => setForm((p) => ({ ...p, totalDue: e.target.value }))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            "data-ocid": "debts.technician.cancel_button",
            onClick: () => setDialogOpen(false),
            children: "বাতিল"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "debts.technician.save_button",
            onClick: handleSave,
            children: "সেভ করুন"
          }
        )
      ] })
    ] }) })
  ] });
}
function WholesalerDuesSection({ isAdmin }) {
  const { actor } = useActor();
  const { settings } = useCompanySettings();
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editItem, setEditItem] = reactExports.useState(null);
  const [filterYear, setFilterYear] = reactExports.useState("all");
  const [form, setForm] = reactExports.useState({
    wholesalerName: "",
    mobile: "",
    address: "",
    productName: "",
    quantity: "",
    rate: "",
    paidBill: "",
    date: ""
  });
  const amount = Number(form.quantity) * Number(form.rate);
  const dueBill = amount - Number(form.paidBill);
  const load = reactExports.useCallback(async (a) => {
    try {
      const data = await a.getWholesalerDues();
      setItems(data.sort((x, y) => Number(x.serial) - Number(y.serial)));
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
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
      date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    });
    setDialogOpen(true);
  }
  function openEdit(item) {
    setEditItem(item);
    setForm({
      wholesalerName: item.wholesalerName,
      mobile: item.mobile,
      address: item.address,
      productName: item.productName,
      quantity: String(item.quantity),
      rate: String(item.rate),
      paidBill: String(item.paidBill),
      date: item.date
    });
    setDialogOpen(true);
  }
  async function handleSave() {
    if (!actor) return;
    const qty = Number(form.quantity);
    const rt = Number(form.rate);
    const amt = qty * rt;
    const paid = Number(form.paidBill);
    const record = {
      id: (editItem == null ? void 0 : editItem.id) ?? crypto.randomUUID(),
      serial: (editItem == null ? void 0 : editItem.serial) ?? BigInt(items.length + 1),
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
      createdAt: (editItem == null ? void 0 : editItem.createdAt) ?? BigInt(Date.now())
    };
    try {
      if (editItem) {
        await actor.updateWholesalerDue(record);
        ue.success("আপডেট হয়েছে");
      } else {
        await actor.addWholesalerDue(record);
        ue.success("যুক্ত হয়েছে");
      }
      try {
        const allExpenses = await actor.getExpenses();
        const validCats = ["রাউটার", "ONU", "অপটিক্যাল ফাইবার", "স্প্লিটার"];
        const catPart = record.productName.split(" - ")[0];
        const expCat = validCats.includes(catPart) ? catPart : "রাউটার";
        const existingExp = allExpenses.find(
          (e) => e.description === record.productName && e.date === record.date
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
            createdAt: BigInt(Date.now())
          });
        } else {
          await actor.updateExpense({
            ...existingExp,
            amount: record.amount,
            rate: record.rate
          });
        }
      } catch {
      }
      setDialogOpen(false);
      load(actor);
    } catch {
      ue.error("সমস্যা হয়েছে");
    }
  }
  async function handleDelete(id) {
    if (!actor || !confirm("মুছে ফেলবেন?")) return;
    try {
      await actor.deleteWholesalerDue(id);
      ue.success("মুছে ফেলা হয়েছে");
      load(actor);
    } catch {
      ue.error("সমস্যা হয়েছে");
    }
  }
  const filtered = items.filter((item) => {
    var _a;
    if (filterYear !== "all" && !((_a = item.date) == null ? void 0 : _a.startsWith(filterYear)))
      return false;
    return true;
  });
  const totalDue = filtered.reduce((s, i) => s + Number(i.dueBill), 0);
  function handlePrint() {
    const rows = filtered.map(
      (item, idx) => `
      <tr>
        <td>${idx + 1}</td><td>${item.wholesalerName}</td><td>${item.mobile}</td>
        <td>${item.productName}</td><td style="text-align:right">${item.quantity}</td>
        <td style="text-align:right">৳${Number(item.rate).toLocaleString()}</td>
        <td style="text-align:right">৳${Number(item.totalAmount).toLocaleString()}</td>
        <td style="text-align:right;color:green">৳${Number(item.paidBill).toLocaleString()}</td>
        <td style="text-align:right;font-weight:bold;color:#dc2626">৳${Number(item.dueBill).toLocaleString()}</td>
        <td>${item.date}</td>
      </tr>`
    ).join("");
    const body = `<table style="font-size:8pt">
      <thead><tr><th>ক্র.</th><th>হোলসেলার</th><th>মোবাইল</th><th>প্রোডাক্ট</th><th>পিস</th><th>দর</th><th>মোট</th><th>পরিশোধিত</th><th>বকেয়া</th><th>তারিখ</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td colspan="8">সর্বমোট বকেয়া</td><td style="text-align:right">৳${totalDue.toLocaleString()}</td><td></td></tr></tfoot>
    </table>`;
    printDocument("হোলসেলার বকেয়া তালিকা", body, settings);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", "data-ocid": "debts.wholesaler.card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "হোলসেলারের বকেয়া" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterYear, onValueChange: setFilterYear, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-24 h-8 text-xs",
                "data-ocid": "debts.wholesaler.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বছর" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব বছর" }),
              YEARS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: y, children: y }, y))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-8 gap-1 text-xs",
              "data-ocid": "debts.wholesaler.upload_button",
              onClick: handlePrint,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                " PDF"
              ]
            }
          ),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "h-8 gap-1 text-xs",
              "data-ocid": "debts.wholesaler.open_modal_button",
              onClick: openAdd,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
                " যুক্ত করুন"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-red-600 mt-2", children: [
        "সর্বমোট বকেয়া: ",
        formatCurrency(totalDue)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "ক্র." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "হোলসেলার" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "মোবাইল" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "প্রোডাক্ট" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-right", children: "পিস" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-right", children: "দর" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-right", children: "মোট" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-right", children: "পরিশোধিত" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-right", children: "বকেয়া" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "তারিখ" }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "অ্যাকশন" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 11,
            className: "text-center text-sm py-6 text-muted-foreground",
            "data-ocid": "debts.wholesaler.loading_state",
            children: "লোড হচ্ছে..."
          }
        ) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { "data-ocid": "debts.wholesaler.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 11,
            className: "text-center text-sm py-6 text-muted-foreground",
            children: "কোনো তথ্য নেই"
          }
        ) }) : filtered.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `debts.wholesaler.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: idx + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs font-medium", children: item.wholesalerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.mobile }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.productName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right", children: item.quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right", children: formatCurrency(Number(item.rate)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right", children: formatCurrency(Number(item.totalAmount)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right text-green-600", children: formatCurrency(Number(item.paidBill)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right font-medium text-red-600", children: formatCurrency(Number(item.dueBill)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.date }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "icon",
                    variant: "ghost",
                    className: "h-6 w-6",
                    "data-ocid": `debts.wholesaler.edit_button.${idx + 1}`,
                    onClick: () => openEdit(item),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 11 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "icon",
                    variant: "ghost",
                    className: "h-6 w-6 text-destructive",
                    "data-ocid": `debts.wholesaler.delete_button.${idx + 1}`,
                    onClick: () => handleDelete(item.id),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 11 })
                  }
                )
              ] }) })
            ]
          },
          item.id
        )),
        filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/50 font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 8, className: "text-xs", children: "সর্বমোট বকেয়া" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right text-red-600", children: formatCurrency(totalDue) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: isAdmin ? 2 : 1 })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "debts.wholesaler.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editItem ? "এডিট" : "নতুন হোলসেলার বকেয়া" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "হোলসেলারের নাম" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                "data-ocid": "debts.wholesaler.input",
                value: form.wholesalerName,
                onChange: (e) => setForm((p) => ({ ...p, wholesalerName: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "মোবাইল" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                "data-ocid": "debts.wholesaler.input",
                value: form.mobile,
                onChange: (e) => setForm((p) => ({ ...p, mobile: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ঠিকানা" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "h-8 text-sm mt-1",
              "data-ocid": "debts.wholesaler.input",
              value: form.address,
              onChange: (e) => setForm((p) => ({ ...p, address: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "প্রোডাক্টের নাম" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                "data-ocid": "debts.wholesaler.input",
                value: form.productName,
                onChange: (e) => setForm((p) => ({ ...p, productName: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "পরিমাণ (পিস)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                type: "number",
                "data-ocid": "debts.wholesaler.input",
                value: form.quantity,
                onChange: (e) => setForm((p) => ({ ...p, quantity: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "দর" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                type: "number",
                "data-ocid": "debts.wholesaler.input",
                value: form.rate,
                onChange: (e) => setForm((p) => ({ ...p, rate: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "মোট দাম (স্বয়ংক্রিয়)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                disabled: true,
                value: formatCurrency(amount)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "পরিশোধিত বিল" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                type: "number",
                "data-ocid": "debts.wholesaler.input",
                value: form.paidBill,
                onChange: (e) => setForm((p) => ({ ...p, paidBill: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "বকেয়া (স্বয়ংক্রিয়)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                disabled: true,
                value: formatCurrency(dueBill)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "তারিখ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "h-8 text-sm mt-1",
              type: "date",
              "data-ocid": "debts.wholesaler.input",
              value: form.date,
              onChange: (e) => setForm((p) => ({ ...p, date: e.target.value }))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            "data-ocid": "debts.wholesaler.cancel_button",
            onClick: () => setDialogOpen(false),
            children: "বাতিল"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "debts.wholesaler.save_button",
            onClick: handleSave,
            children: "সেভ করুন"
          }
        )
      ] })
    ] }) })
  ] });
}
function AdvanceRechargeDuesSection({ isAdmin }) {
  const { actor } = useActor();
  const { settings } = useCompanySettings();
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editItem, setEditItem] = reactExports.useState(null);
  const [filterMonth, setFilterMonth] = reactExports.useState("all");
  const [filterYear, setFilterYear] = reactExports.useState("all");
  const [form, setForm] = reactExports.useState({
    carnivalId: "",
    userName: "",
    mobile: "",
    address: "",
    dueMonth: "",
    dueAmount: ""
  });
  const load = reactExports.useCallback(async (a) => {
    try {
      const data = await a.getAdvanceRechargeDues();
      setItems(data.sort((x, y) => Number(x.serial) - Number(y.serial)));
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
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
      dueAmount: ""
    });
    setDialogOpen(true);
  }
  function openEdit(item) {
    setEditItem(item);
    setForm({
      carnivalId: item.carnivalId,
      userName: item.userName,
      mobile: item.mobile,
      address: item.address,
      dueMonth: item.dueMonth,
      dueAmount: String(item.dueAmount)
    });
    setDialogOpen(true);
  }
  async function handleSave() {
    if (!actor) return;
    const record = {
      id: (editItem == null ? void 0 : editItem.id) ?? crypto.randomUUID(),
      serial: (editItem == null ? void 0 : editItem.serial) ?? BigInt(items.length + 1),
      carnivalId: form.carnivalId,
      userName: form.userName,
      mobile: form.mobile,
      address: form.address,
      dueMonth: form.dueMonth,
      dueAmount: Number(form.dueAmount),
      createdAt: (editItem == null ? void 0 : editItem.createdAt) ?? BigInt(Date.now())
    };
    try {
      if (editItem) {
        await actor.updateAdvanceRechargeDue(record);
        ue.success("আপডেট হয়েছে");
      } else {
        await actor.addAdvanceRechargeDue(record);
        ue.success("যুক্ত হয়েছে");
      }
      setDialogOpen(false);
      load(actor);
    } catch {
      ue.error("সমস্যা হয়েছে");
    }
  }
  async function handleDelete(id) {
    if (!actor || !confirm("মুছে ফেলবেন?")) return;
    try {
      await actor.deleteAdvanceRechargeDue(id);
      ue.success("মুছে ফেলা হয়েছে");
      load(actor);
    } catch {
      ue.error("সমস্যা হয়েছে");
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
    const rows = filtered.map(
      (item, idx) => `
      <tr>
        <td>${idx + 1}</td><td>${item.carnivalId}</td><td>${item.userName}</td>
        <td>${item.mobile}</td><td>${item.address}</td><td>${item.dueMonth}</td>
        <td style="text-align:right;font-weight:bold">৳${Number(item.dueAmount).toLocaleString()}</td>
      </tr>`
    ).join("");
    const body = `<table>
      <thead><tr><th>ক্র.</th><th>কার্নিভাল আইডি</th><th>ইউজার</th><th>মোবাইল</th><th>ঠিকানা</th><th>মাস</th><th>পরিমাণ</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td colspan="6">মোট</td><td style="text-align:right">৳${total.toLocaleString()}</td></tr></tfoot>
    </table>`;
    printDocument("অগ্রিম রিচার্জ বকেয়া তালিকা", body, settings);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", "data-ocid": "debts.advance.card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "অগ্রিম রিচার্জ বকেয়া" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterMonth, onValueChange: setFilterMonth, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-32 h-8 text-xs",
                "data-ocid": "debts.advance.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "মাস" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব মাস" }),
              BANGLA_MONTHS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m, children: m }, m))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterYear, onValueChange: setFilterYear, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-24 h-8 text-xs",
                "data-ocid": "debts.advance.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বছর" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব বছর" }),
              YEARS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: y, children: y }, y))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-8 gap-1 text-xs",
              "data-ocid": "debts.advance.upload_button",
              onClick: handlePrint,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                " PDF"
              ]
            }
          ),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "h-8 gap-1 text-xs",
              "data-ocid": "debts.advance.open_modal_button",
              onClick: openAdd,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
                " যুক্ত করুন"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-orange-600 mt-2", children: [
        "মোট বকেয়া: ",
        formatCurrency(total)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "ক্র." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "কার্নিভাল আইডি" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "ইউজার" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "মোবাইল" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "ঠিকানা" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "মাস" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-right", children: "পরিমাণ" }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "অ্যাকশন" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 8,
            className: "text-center text-sm py-6 text-muted-foreground",
            "data-ocid": "debts.advance.loading_state",
            children: "লোড হচ্ছে..."
          }
        ) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { "data-ocid": "debts.advance.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 8,
            className: "text-center text-sm py-6 text-muted-foreground",
            children: "কোনো তথ্য নেই"
          }
        ) }) : filtered.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `debts.advance.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: idx + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.carnivalId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.userName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.mobile }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.address }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: item.dueMonth }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right font-medium text-orange-600", children: formatCurrency(Number(item.dueAmount)) }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "icon",
                    variant: "ghost",
                    className: "h-6 w-6",
                    "data-ocid": `debts.advance.edit_button.${idx + 1}`,
                    onClick: () => openEdit(item),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 11 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "icon",
                    variant: "ghost",
                    className: "h-6 w-6 text-destructive",
                    "data-ocid": `debts.advance.delete_button.${idx + 1}`,
                    onClick: () => handleDelete(item.id),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 11 })
                  }
                )
              ] }) })
            ]
          },
          item.id
        )),
        filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/50 font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-xs", children: "মোট" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-right text-orange-600", children: formatCurrency(total) }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, {})
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "debts.advance.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editItem ? "এডিট" : "নতুন অগ্রিম রিচার্জ বকেয়া" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "কার্নিভাল আইডি" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                "data-ocid": "debts.advance.input",
                value: form.carnivalId,
                onChange: (e) => setForm((p) => ({ ...p, carnivalId: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ইউজার" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                "data-ocid": "debts.advance.input",
                value: form.userName,
                onChange: (e) => setForm((p) => ({ ...p, userName: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "মোবাইল" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                "data-ocid": "debts.advance.input",
                value: form.mobile,
                onChange: (e) => setForm((p) => ({ ...p, mobile: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ঠিকানা" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                "data-ocid": "debts.advance.input",
                value: form.address,
                onChange: (e) => setForm((p) => ({ ...p, address: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "কোন মাসের রিচার্জ বকেয়া" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                placeholder: "মার্চ ২০২৬",
                "data-ocid": "debts.advance.input",
                value: form.dueMonth,
                onChange: (e) => setForm((p) => ({ ...p, dueMonth: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "মোট (টাকা)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-sm mt-1",
                type: "number",
                "data-ocid": "debts.advance.input",
                value: form.dueAmount,
                onChange: (e) => setForm((p) => ({ ...p, dueAmount: e.target.value }))
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            "data-ocid": "debts.advance.cancel_button",
            onClick: () => setDialogOpen(false),
            children: "বাতিল"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "debts.advance.save_button", onClick: handleSave, children: "সেভ করুন" })
      ] })
    ] }) })
  ] });
}
export {
  DebtManagement as default
};
