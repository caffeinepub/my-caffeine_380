import { c as createLucideIcon, r as reactExports, u as useCompanySettings, j as jsxRuntimeExports, a as Button, S as ServiceStatus, b as ue } from "./index-C7L7qdp1.js";
import { C as Card, c as CardContent } from "./card-BpgnpOJo.js";
import { C as Checkbox } from "./checkbox-BwswRPB3.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-BlX34PCv.js";
import { I as Input, L as Label } from "./label-B8CDIJxI.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-ZmBr2yJ5.js";
import { T as Textarea } from "./textarea-C5U17xNi.js";
import { u as useLocalCustomers, t as toTitleCase, n as normalizeAddress } from "./useLocalCustomers-BJURb7Kc.js";
import { V as VILLAGES } from "./sampleData-C2YRZWoE.js";
import { u as usePackages } from "./useQueries-CdqPRVLK.js";
import { p as printDocument } from "./printDocument-DGKOt1W0.js";
import { S as Search } from "./search-BbKae3F-.js";
import { F as FileDown } from "./file-down-Dt3gA0o_.js";
import { P as Plus, T as Trash2 } from "./trash-2-4d6TxwF7.js";
import { E as EyeOff, a as Eye } from "./eye-DwvofNPu.js";
import { P as Pencil } from "./x-B1c2eMg0.js";
import { L as LoaderCircle } from "./loader-circle-hYr7aF8B.js";
import { C as CircleAlert } from "./circle-alert-UPzek2Ro.js";
import "./index-DHncjycU.js";
import "./check-DyqLZl0V.js";
import "./permanentPackages-CnZQ-KNe.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const WifiOff = createLucideIcon("wifi-off", __iconNode);
function useOfflineStatus() {
  const [isOffline, setIsOffline] = reactExports.useState(!navigator.onLine);
  reactExports.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return isOffline;
}
function formatDate(time) {
  const ms = Number(time / 1000000n);
  return new Date(ms).toLocaleDateString("bn-BD");
}
function toDateInputValue(time) {
  const ms = Number(time / 1000000n);
  return new Date(ms).toISOString().split("T")[0];
}
const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
const emptyForm = {
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
  commissionPercent: "30"
};
const BULK_FORMAT_HINT = `প্রতিটি লাইনে একজন গ্রাহকের তথ্য দিন। কলামগুলো পাইপ (|), ট্যাব (Excel থেকে কপি) বা কমা দিয়ে আলাদা করুন:

ইউজার নেম | পাসওয়ার্ড | মোবাইল | কার্নিভাল আইডি | সিআইডি | গ্রাম | প্যাকেজ | মাসিক বিল | তারিখ (YYYY-MM-DD) | কমিশন%

উদাহরণ:
Md Jalal Miah | ja4321 | 01311411152 | 1279832 | 277465 | Baligaw Islampara | 20 Mbps | 840 | 2026-03-08

নোট: পাসওয়ার্ড বা কার্নিভাল আইডি না থাকলে — (ড্যাশ) লিখুন বা খালি রাখুন।
নামের বড়/ছোট হাতের বিষয় সিস্টেম স্বয়ংক্রিয়ভাবে ঠিক করে নেবে।
ঠিকানায় পাড়া আগে ও গ্রাম পরে না থাকলেও সিস্টেম স্বয়ংক্রিয়ভাবে সংশোধন করবে।`;
function parseBulkText(text) {
  const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0).filter(
    (l) => !l.startsWith("---") && !l.startsWith("ইউজার নেম") && !l.match(/^[-\s|]+$/)
  );
  return lines.map((line) => {
    let cols;
    if (line.includes("|")) {
      cols = line.split("|").map((c) => c.trim().replace(/^—$|^-$/, ""));
    } else if (line.includes("	")) {
      cols = line.split("	").map((c) => c.trim().replace(/^—$|^-$/, ""));
    } else {
      cols = line.split(",").map((c) => c.trim().replace(/^—$|^-$/, ""));
    }
    const get = (i) => (cols[i] ?? "").replace(/^—$/, "").trim();
    const username = toTitleCase(get(0));
    const password = get(1);
    const phone = get(2);
    const carnivalId = get(3);
    const cidNumber = get(4);
    const rawAddr = get(5);
    const { village, address } = normalizeAddress(rawAddr);
    const packageName = get(6);
    const monthlyFee = get(7);
    const connectionDate = get(8) || todayStr;
    const commissionPercent = get(9) || "30";
    let error;
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
      error
    };
  });
}
function Customers({ isAdmin = false }) {
  const {
    customers: rawLocalCustomers,
    addCustomers,
    updateCustomer,
    deleteCustomer
  } = useLocalCustomers();
  const isOffline = useOfflineStatus();
  const { data: packages } = usePackages();
  const { settings } = useCompanySettings();
  const allCustomers = rawLocalCustomers;
  const allPackages = packages ?? [];
  const [search, setSearch] = reactExports.useState("");
  const [selectedVillages, setSelectedVillages] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editingCustomer, setEditingCustomer] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm);
  const [saving, setSaving] = reactExports.useState(false);
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showFormPassword, setShowFormPassword] = reactExports.useState(false);
  const [bulkOpen, setBulkOpen] = reactExports.useState(false);
  const [bulkText, setBulkText] = reactExports.useState("");
  const [bulkRows, setBulkRows] = reactExports.useState([]);
  const [bulkStep, setBulkStep] = reactExports.useState("input");
  const [bulkImporting, setBulkImporting] = reactExports.useState(false);
  function toggleVillage(v) {
    setSelectedVillages((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  }
  const filtered = allCustomers.filter((c) => {
    const matchSearch = c.username.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.carnivalId.toLowerCase().includes(search.toLowerCase()) || c.cidNumber.toLowerCase().includes(search.toLowerCase());
    const matchVillage = selectedVillages.size === 0 || selectedVillages.has(c.village);
    return matchSearch && matchVillage;
  });
  function openAdd() {
    setEditingCustomer(null);
    setForm(emptyForm);
    setShowFormPassword(false);
    setModalOpen(true);
  }
  function openEdit(c) {
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
      connectionFeeCash: c.connectionFeeCash ? c.connectionFeeCash.toString() : "",
      connectionFeeDue: c.connectionFeeDue.toString(),
      commissionPercent: (c.commissionPercent ?? 30).toString()
    });
    setShowFormPassword(false);
    setModalOpen(true);
  }
  async function handleSave() {
    setSaving(true);
    const cleanName = toTitleCase(form.username);
    const { village: resolvedVillage, address: resolvedAddress } = form.village ? { village: form.village, address: form.village } : { village: "", address: "" };
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
        connectionDate: BigInt(new Date(form.connectionDate).getTime()) * 1000000n,
        connectionFeeCash: form.connectionFeeCash ? Number.parseInt(form.connectionFeeCash) : 0,
        connectionFeeDue: Number.parseInt(form.connectionFeeDue) || 0,
        commissionPercent: Number.parseInt(form.commissionPercent) || 30
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
          connectionDate: BigInt(new Date(form.connectionDate).getTime()) * 1000000n,
          connectionFeeCash: form.connectionFeeCash ? Number.parseInt(form.connectionFeeCash) : 0,
          connectionFeeDue: Number.parseInt(form.connectionFeeDue) || 0,
          commissionPercent: Number.parseInt(form.commissionPercent) || 30
        }
      ]);
    }
    setSaving(false);
    setModalOpen(false);
    ue.success(
      editingCustomer ? "গ্রাহক আপডেট করা হয়েছে" : "নতুন গ্রাহক যোগ করা হয়েছে"
    );
  }
  function handleDelete(c) {
    deleteCustomer(c.id);
    ue.success(`${c.username} মুছে ফেলা হয়েছে`);
  }
  const pkg = (id) => allPackages.find((p) => p.id === id);
  function handleExportPDF() {
    const villageLabel = selectedVillages.size > 0 ? Array.from(selectedVillages).join(", ") : "সকল গ্রাম";
    const title = `গ্রাহক তালিকা — ${villageLabel}`;
    const rows = filtered.map(
      (c, i) => {
        var _a;
        return `
      <tr>
        <td>${i + 1}</td>
        <td>${formatDate(c.connectionDate)}</td>
        <td>${c.username}</td>
        <td>${c.carnivalId}</td>
        <td>${c.cidNumber}</td>
        <td>${c.phone}</td>
        <td>${c.address || c.village}</td>
        <td>${((_a = pkg(c.packageId)) == null ? void 0 : _a.name) ?? ""}</td>
      </tr>`;
      }
    ).join("");
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
      ue.error("কোনো তথ্য পেস্ট করা হয়নি");
      return;
    }
    const rows = parseBulkText(bulkText);
    if (rows.length === 0) {
      ue.error("কোনো গ্রাহক তথ্য পাওয়া যায়নি");
      return;
    }
    setBulkRows(rows);
    setBulkStep("preview");
  }
  async function handleBulkImport() {
    const validRows = bulkRows.filter((r) => r.valid);
    if (validRows.length === 0) {
      ue.error("কোনো বৈধ তথ্য নেই");
      return;
    }
    setBulkImporting(true);
    const mapped = validRows.map((row) => ({
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
      connectionDate: row.connectionDate ? BigInt(new Date(row.connectionDate).getTime()) * 1000000n : BigInt(Date.now()) * 1000000n,
      username: row.username,
      password: row.password,
      carnivalId: row.carnivalId,
      cidNumber: row.cidNumber,
      connectionFeeCash: 0,
      connectionFeeDue: 0,
      village: row.village,
      commissionPercent: Number.parseInt(row.commissionPercent) || 30
    }));
    addCustomers(mapped);
    setBulkImporting(false);
    setBulkOpen(false);
    setBulkText("");
    setBulkRows([]);
    setBulkStep("input");
    ue.success(`${validRows.length} জন গ্রাহক সফলভাবে যোগ করা হয়েছে`);
  }
  function closeBulkModal() {
    setBulkOpen(false);
    setBulkText("");
    setBulkRows([]);
    setBulkStep("input");
  }
  const validCount = bulkRows.filter((r) => r.valid).length;
  const invalidCount = bulkRows.filter((r) => !r.valid).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "customers.page", children: [
    isOffline && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-amber-50 border border-amber-300 text-amber-800 rounded-lg px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { size: 18, className: "shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: "অফলাইন মোড" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-0.5", children: "ইন্টারনেট সংযোগ নেই। গ্রাহক তালিকা থেকে সার্চ করা যাবে — ডেটা ডিভাইসে সেভ আছে।" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4 items-center bg-muted/30 border border-border rounded-lg px-4 py-3", children: VILLAGES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 cursor-pointer select-none",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: selectedVillages.has(v),
              onCheckedChange: () => toggleVillage(v),
              className: "h-4 w-4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: v })
        ]
      },
      v
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
            size: 15
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "customers.search_input",
            placeholder: "ইউজার নেম, ফোন বা কার্নিভাল আইডি...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: handleExportPDF,
            "data-ocid": "customers.export_pdf.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { size: 16, className: "mr-1.5" }),
              "PDF এক্সপোর্ট"
            ]
          }
        ),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => setBulkOpen(true),
            "data-ocid": "customers.bulk_import.button",
            className: "border-primary/40 text-primary hover:bg-primary/10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16, className: "mr-1.5" }),
              "বাল্ক ইমপোর্ট"
            ]
          }
        ),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: openAdd,
            className: "bg-primary text-white",
            "data-ocid": "customers.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, className: "mr-1.5" }),
              "নতুন গ্রাহক"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card border-border", "data-ocid": "customers.table", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "ক্রমিক" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "সংযোগের তারিখ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "ইউজার নেম/আইডি" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            "পাসওয়ার্ড",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className: "text-muted-foreground hover:text-foreground",
                children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 13 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 13 })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "কার্নিভাল আইডি" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "সিআইডি নম্বর" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "মোবাইল নম্বর" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "ঠিকানা" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "প্যাকেজ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "অ্যাকশন" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((c, i) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border last:border-0 hover:bg-muted/20",
              "data-ocid": `customers.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground font-medium", children: i + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground whitespace-nowrap", children: formatDate(c.connectionDate) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-medium", children: c.username }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-muted-foreground", children: showPassword ? c.password : "••••••" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground", children: c.carnivalId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground", children: c.cidNumber }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground whitespace-nowrap", children: c.phone }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground whitespace-nowrap", children: c.address || c.village }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground whitespace-nowrap", children: ((_a = pkg(c.packageId)) == null ? void 0 : _a.name) ?? "অজানা" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
                  isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "h-7 w-7 p-0",
                      onClick: () => openEdit(c),
                      "data-ocid": `customers.edit_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 13 })
                    }
                  ),
                  isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "h-7 w-7 p-0 text-destructive hover:text-destructive",
                      onClick: () => handleDelete(c),
                      "data-ocid": `customers.delete_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                    }
                  )
                ] }) })
              ]
            },
            c.id.toString()
          );
        }) })
      ] }),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-center text-muted-foreground py-12",
          "data-ocid": "customers.empty_state",
          children: "কোনো গ্রাহক পাওয়া যায়নি"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: modalOpen, onOpenChange: setModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-2xl max-h-[90vh] overflow-y-auto",
        "data-ocid": "customers.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingCustomer ? "গ্রাহক সম্পাদনা" : "নতুন গ্রাহক যোগ" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "সংযোগের তারিখ *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "customers.connectiondate.input",
                  type: "date",
                  value: form.connectionDate,
                  onChange: (e) => setForm((p) => ({ ...p, connectionDate: e.target.value }))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "সংযোগ ফি নগদ (৳)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "customers.connectionfeecash.input",
                  type: "number",
                  value: form.connectionFeeCash,
                  onChange: (e) => setForm((p) => ({ ...p, connectionFeeCash: e.target.value })),
                  placeholder: "খালি রাখুন বা পরিমাণ লিখুন"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "সংযোগ ফি বকেয়া (৳)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "customers.connectionfeedue.input",
                  type: "number",
                  value: form.connectionFeeDue,
                  onChange: (e) => setForm((p) => ({ ...p, connectionFeeDue: e.target.value })),
                  placeholder: "০"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ইউজার নেম / ইউজার আইডি *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "customers.username.input",
                  value: form.username,
                  onChange: (e) => setForm((p) => ({ ...p, username: e.target.value })),
                  placeholder: "user001"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ইউজার পাসওয়ার্ড *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "customers.password.input",
                    type: showFormPassword ? "text" : "password",
                    value: form.password,
                    onChange: (e) => setForm((p) => ({ ...p, password: e.target.value })),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "কার্নিভাল আইডি" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "customers.carnivalid.input",
                  value: form.carnivalId,
                  onChange: (e) => setForm((p) => ({ ...p, carnivalId: e.target.value })),
                  placeholder: "CRN-001"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "সিআইডি নম্বর" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "customers.cidnumber.input",
                  value: form.cidNumber,
                  onChange: (e) => setForm((p) => ({ ...p, cidNumber: e.target.value })),
                  placeholder: "CID-2024-001"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "মোবাইল নম্বর *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "customers.phone.input",
                  value: form.phone,
                  onChange: (e) => setForm((p) => ({ ...p, phone: e.target.value })),
                  placeholder: "০১৭..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ঠিকানা (গ্রাম)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.village,
                  onValueChange: (v) => setForm((p) => ({ ...p, village: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "customers.village.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "গ্রাম নির্বাচন" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: VILLAGES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: v, children: v }, v)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "প্যাকেজ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.packageId,
                  onValueChange: (v) => {
                    const selectedPkg = allPackages.find(
                      (p) => p.id.toString() === v
                    );
                    setForm((p) => ({
                      ...p,
                      packageId: v,
                      monthlyFee: selectedPkg ? selectedPkg.monthlyPrice.toString() : p.monthlyFee
                    }));
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "customers.package.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "প্যাকেজ নির্বাচন" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: allPackages.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p.id.toString(), children: [
                      p.name,
                      " (",
                      p.speed,
                      ")"
                    ] }, p.id.toString())) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "মাসিক বিল (৳)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "customers.monthlyfee.input",
                  type: "number",
                  value: form.monthlyFee,
                  onChange: (e) => setForm((p) => ({ ...p, monthlyFee: e.target.value })),
                  placeholder: "৬০০"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "কমিশন হার" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.commissionPercent,
                  onValueChange: (v) => setForm((p) => ({ ...p, commissionPercent: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "customers.commission.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "কমিশন নির্বাচন" }) }),
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
                onClick: () => setModalOpen(false),
                "data-ocid": "customers.cancel_button",
                children: "বাতিল"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "bg-primary text-white",
                onClick: handleSave,
                disabled: saving,
                "data-ocid": "customers.submit_button",
                children: [
                  saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                  editingCustomer ? "আপডেট করুন" : "যোগ করুন"
                ]
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: bulkOpen, onOpenChange: closeBulkModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-3xl max-h-[90vh] overflow-y-auto",
        "data-ocid": "customers.bulk_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 18, className: "text-primary" }),
            "বাল্ক গ্রাহক ইমপোর্ট"
          ] }) }),
          bulkStep === "input" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-border rounded-lg p-4 text-xs text-muted-foreground space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "নির্দেশনা:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "whitespace-pre-wrap font-sans leading-relaxed", children: BULK_FORMAT_HINT })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold", children: "গ্রাহকের তথ্য এখানে পেস্ট করুন" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  "data-ocid": "customers.bulk_textarea",
                  value: bulkText,
                  onChange: (e) => setBulkText(e.target.value),
                  placeholder: "এখানে গ্রাহক তথ্য পেস্ট করুন...",
                  rows: 12,
                  className: "font-mono text-xs"
                }
              ),
              bulkText.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "আনুমানিক",
                " ",
                bulkText.trim().split("\n").filter((l) => l.trim()).length,
                " ",
                "টি লাইন পাওয়া গেছে"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: closeBulkModal, children: "বাতিল" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "bg-primary text-white",
                  onClick: handleBulkParse,
                  "data-ocid": "customers.bulk_parse.button",
                  children: "তথ্য যাচাই করুন"
                }
              )
            ] })
          ] }),
          bulkStep === "preview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 16, className: "text-green-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-green-700", children: [
                  validCount,
                  " জন বৈধ"
                ] })
              ] }),
              invalidCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16, className: "text-red-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-red-600", children: [
                  invalidCount,
                  " টি ত্রুটিপূর্ণ"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto max-h-96", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 bg-muted/80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 font-semibold text-muted-foreground", children: "#" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 font-semibold text-muted-foreground", children: "ইউজার নেম" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 font-semibold text-muted-foreground", children: "মোবাইল" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 font-semibold text-muted-foreground", children: "কার্নিভাল" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 font-semibold text-muted-foreground", children: "সিআইডি" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 font-semibold text-muted-foreground", children: "ঠিকানা" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 font-semibold text-muted-foreground", children: "প্যাকেজ" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 font-semibold text-muted-foreground", children: "বিল" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 font-semibold text-muted-foreground", children: "অবস্থা" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bulkRows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: `border-b border-border last:border-0 ${row.valid ? "hover:bg-muted/20" : "bg-red-50/50"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-muted-foreground", children: i + 1 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-medium", children: row.username || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "খালি" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-muted-foreground", children: row.phone || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "খালি" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-muted-foreground", children: row.carnivalId || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-muted-foreground", children: row.cidNumber || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-muted-foreground", children: row.address || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-muted-foreground", children: row.packageName || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-muted-foreground", children: row.monthlyFee ? `৳${row.monthlyFee}` : "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3", children: row.valid ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-green-600", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12 }),
                      " ঠিক আছে"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-red-500", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 12 }),
                      " ",
                      row.error
                    ] }) })
                  ]
                },
                `${row.username}-${row.phone}-${i}`
              )) })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setBulkStep("input"), children: "পিছনে যান" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: closeBulkModal, children: "বাতিল" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "bg-primary text-white",
                  onClick: handleBulkImport,
                  disabled: bulkImporting || validCount === 0,
                  "data-ocid": "customers.bulk_confirm.button",
                  children: [
                    bulkImporting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15, className: "mr-1.5" }),
                    validCount,
                    " জন গ্রাহক যোগ করুন"
                  ]
                }
              )
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
export {
  Customers as default
};
