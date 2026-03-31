import { c as createLucideIcon, u as useCompanySettings, r as reactExports, j as jsxRuntimeExports, M as Megaphone, a as Button, U as Users, P as Phone, b as ue } from "./index-CLn6Dvvh.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DgI8w_9r.js";
import { C as Checkbox } from "./checkbox-BEhiuhFU.js";
import { L as Label, I as Input } from "./label-BxkJv6hJ.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B4-SyqnN.js";
import { T as Textarea } from "./textarea-X16Xgm7C.js";
import { u as useLocalCustomers } from "./useLocalCustomers-CHBDXFdF.js";
import { p as printDocument } from "./printDocument-DGKOt1W0.js";
import { C as Check } from "./check-D7UaX-Dz.js";
import { F as FileDown } from "./file-down-Cl3cqoi2.js";
import { M as MessageCircle } from "./message-circle-CyrTOe1T.js";
import "./index-Cs78LNzb.js";
import "./permanentPackages-CnZQ-KNe.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const ISSUE_TYPES = [
  "লাইনে সমস্যা",
  "মেইনটেন্যান্স কাজ",
  "বিদ্যুৎ বিভ্রাট",
  "নেটওয়ার্ক আপগ্রেড",
  "অন্যান্য"
];
const VILLAGES = ["বালীগাঁও", "ফরিদপুর", "কাটাইয়া", "পশ্চিম বাজুকা", "পূর্ব বাজুকা"];
function buildNoticeText(issueType, area, startTime, restoreTime, notes, orgName) {
  const lines = [
    "প্রিয় গ্রাহক,",
    "",
    `আমরা জানাতে চাই যে ${area ? `${area}-এ` : "আপনার এলাকায়"} ${issueType}-এর কারণে ইন্টারনেট সেবা সাময়িকভাবে বাধাগ্রস্ত হচ্ছে।`,
    "",
    `সমস্যা শুরু: ${startTime || "—"}`,
    `সমাধানের প্রত্যাশিত সময়: ${restoreTime || "—"}`
  ];
  if (notes.trim()) {
    lines.push("");
    lines.push(notes.trim());
  }
  lines.push("");
  lines.push("অসুবিধার জন্য আন্তরিকভাবে দুঃখিত।");
  lines.push("");
  lines.push(`— ${orgName}`);
  return lines.join("\n");
}
function normalizeWhatsAppPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("880") && digits.length >= 12) return digits;
  if (digits.startsWith("88") && digits.length >= 12) return digits;
  if (digits.startsWith("0") && digits.length === 11) return `88${digits}`;
  if (digits.length === 10) return `880${digits}`;
  return `88${digits}`;
}
function normalizeVillage(v) {
  const val = v.toLowerCase().replace(/[,\s]+/g, " ").trim();
  if (/baligou|baligaw|baligaon|baligun|baliguon|বালী|বালিগ/.test(val))
    return "বালীগাঁও";
  if (/faridpur|foridpur|ফরিদ/.test(val)) return "ফরিদপুর";
  if (/kathaiya|kataiya|kataia|katia|কাটাই/.test(val)) return "কাটাইয়া";
  if (/pocim|poschim|pashcim|pajgaw|bajgaw|pocimbaj|bajuka|bazuka|bazar|পশ্চিম/.test(
    val
  ) && !/purbo|purbu|পূর্ব/.test(val))
    return "পশ্চিম বাজুকা";
  if (/purbo|purbu|পূর্ব/.test(val)) return "পূর্ব বাজুকা";
  return v;
}
function NoticePage(_props) {
  const { customers } = useLocalCustomers();
  const { settings } = useCompanySettings();
  const [issueType, setIssueType] = reactExports.useState(ISSUE_TYPES[0]);
  const [area, setArea] = reactExports.useState("");
  const [startTime, setStartTime] = reactExports.useState("");
  const [restoreTime, setRestoreTime] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [generated, setGenerated] = reactExports.useState(false);
  const [copiedId, setCopiedId] = reactExports.useState(null);
  const [selectedVillages, setSelectedVillages] = reactExports.useState([]);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const orgName = settings.name || "নওশীন ব্রডব্যান্ড ইন্টারনেট";
  const noticeText = generated ? buildNoticeText(issueType, area, startTime, restoreTime, notes, orgName) : "";
  function handleGenerate() {
    if (!issueType) {
      ue.error("সমস্যার ধরন নির্বাচন করুন");
      return;
    }
    setGenerated(true);
    ue.success("নোটিশ তৈরি হয়েছে");
  }
  async function copyToClipboard(text, id) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      ue.success("কপি করা হয়েছে");
      setTimeout(() => setCopiedId(null), 2e3);
    } catch (_) {
      ue.error("কপি করতে ব্যর্থ হয়েছে");
    }
  }
  function handleExportPDF() {
    if (!generated) {
      ue.error("প্রথমে নোটিশ জেনারেট করুন");
      return;
    }
    const bodyHTML = `
      <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.8; padding: 8px 0;">${noticeText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
    `;
    printDocument("গ্রাহক নোটিশ", bodyHTML, settings);
  }
  function openWhatsApp(mobile) {
    const url = `https://wa.me/${normalizeWhatsAppPhone(mobile)}?text=${encodeURIComponent(noticeText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }
  function openIMO(mobile) {
    const waPhone = normalizeWhatsAppPhone(mobile);
    copyToClipboard(noticeText, `imo-${waPhone}`);
    const url = `imo://chat?phone=${waPhone}`;
    window.open(url, "_blank", "noopener,noreferrer");
    ue.info("নোটিশ কপি হয়েছে — IMO-তে পেস্ট করুন");
  }
  function openSMS(mobile) {
    const waPhone = normalizeWhatsAppPhone(mobile);
    const url = `sms:+${waPhone}?body=${encodeURIComponent(noticeText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }
  function toggleVillage(v) {
    setSelectedVillages(
      (prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  }
  const filteredCustomers = reactExports.useMemo(() => {
    let list = customers;
    if (selectedVillages.length > 0) {
      list = list.filter((c) => {
        const cVillage = normalizeVillage(c.address || "");
        return selectedVillages.some((v) => cVillage.includes(v));
      });
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (c) => (c.username || c.name || "").toLowerCase().includes(q) || (c.phone || "").replace(/[^0-9]/g, "").includes(q.replace(/[^0-9]/g, "")) || (c.carnivalId || "").toLowerCase().includes(q) || (c.cidNumber || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [customers, selectedVillages, searchQuery]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "notice.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-6 h-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "নোটিশ বোর্ড" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-semibold px-2 py-0.5 rounded-full leading-none",
              style: {
                background: "#3B82F615",
                color: "#3B82F6",
                border: "1px solid #3B82F630"
              },
              children: "অভ্যন্তরীণ ঘোষণা"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "গ্রাহকদের উদ্দেশ্যে পেশাদার নোটিশ তৈরি ও পাঠান" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "shadow-card border-border",
          "data-ocid": "notice.form.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "নোটিশ তৈরি করুন" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "সমস্যার ধরন *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: issueType, onValueChange: setIssueType, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "notice.issue_type.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "সমস্যার ধরন নির্বাচন করুন" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ISSUE_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "প্রভাবিত এলাকা" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "notice.area.input",
                    value: area,
                    onChange: (e) => setArea(e.target.value),
                    placeholder: "যেমন: বালিগাঁও, ফরিদপুর"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "সমস্যা শুরুর সময়" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": "notice.start_time.input",
                      type: "datetime-local",
                      value: startTime,
                      onChange: (e) => setStartTime(e.target.value)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "সমাধানের প্রত্যাশিত সময়" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": "notice.restore_time.input",
                      type: "datetime-local",
                      value: restoreTime,
                      onChange: (e) => setRestoreTime(e.target.value)
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "অতিরিক্ত বার্তা" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    "data-ocid": "notice.notes.textarea",
                    value: notes,
                    onChange: (e) => setNotes(e.target.value),
                    placeholder: "অতিরিক্ত কোনো তথ্য থাকলে এখানে লিখুন...",
                    rows: 3
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "w-full bg-primary text-white",
                  onClick: handleGenerate,
                  "data-ocid": "notice.generate.button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { size: 16, className: "mr-2" }),
                    "নোটিশ জেনারেট করুন"
                  ]
                }
              ),
              generated && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 space-y-3 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-foreground", children: "গ্রাম নির্বাচন করুন (নোটিশ পাঠাতে)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2", children: VILLAGES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer border transition-colors ${selectedVillages.includes(v) ? "bg-primary/10 border-primary/40" : "bg-muted/20 border-border hover:bg-muted/40"}`,
                    onKeyDown: (e) => e.key === "Enter" && toggleVillage(v),
                    onClick: () => toggleVillage(v),
                    "data-ocid": `notice.village.${v}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: `village-notice-${v}`,
                          checked: selectedVillages.includes(v),
                          onCheckedChange: () => toggleVillage(v),
                          className: "h-4 w-4"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: `village-notice-${v}`,
                          className: "text-sm font-medium cursor-pointer flex-1",
                          children: v
                        }
                      ),
                      selectedVillages.includes(v) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full", children: "নির্বাচিত" })
                    ]
                  },
                  v
                )) }),
                selectedVillages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
                  selectedVillages.length,
                  "টি গ্রাম নির্বাচিত — নিচে গ্রাহক তালিকা দেখুন"
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "shadow-card border-border",
          "data-ocid": "notice.preview.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-4 flex flex-row items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "নোটিশ প্রিভিউ" }),
              generated && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => copyToClipboard(noticeText, "preview"),
                    "data-ocid": "notice.copy_notice.button",
                    children: [
                      copiedId === "preview" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, className: "mr-1.5 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 14, className: "mr-1.5" }),
                      "কপি"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: handleExportPDF,
                    "data-ocid": "notice.export_pdf.button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { size: 14, className: "mr-1.5" }),
                      "PDF"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: generated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-muted/30 rounded-lg p-4 border border-border",
                "data-ocid": "notice.preview.panel",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "whitespace-pre-wrap text-sm text-foreground leading-relaxed font-sans", children: noticeText })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-16 text-center",
                "data-ocid": "notice.preview.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-full bg-muted/40 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-8 h-8 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "বাম পাশের ফর্ম পূরণ করে" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: '"নোটিশ জেনারেট করুন" বাটনে ক্লিক করুন' })
                ]
              }
            ) })
          ]
        }
      )
    ] }),
    generated && selectedVillages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "shadow-card border-border",
        "data-ocid": "notice.customer_list.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16, className: "text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "গ্রাহক তালিকা" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedVillages.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20",
                children: v
              },
              v
            )) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "notice.search.input",
                placeholder: "নাম, মোবাইল, কার্নিভাল আইডি বা সিআইডি দিয়ে সার্চ করুন...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value)
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "মোট ",
              filteredCustomers.length,
              " জন গ্রাহক | WhatsApp / IMO / SMS বাটনে ক্লিক করে নোটিশ পাঠান"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto rounded-lg border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "ক্রমিক" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "ইউজার নেম/আইডি" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "মোবাইল নম্বর" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "গ্রাম" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "নোটিশ পাঠান" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredCustomers.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-b border-border last:border-0 hover:bg-muted/20",
                    "data-ocid": `notice.customer.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground", children: i + 1 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-medium", children: c.username || c.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground font-mono", children: c.phone }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground text-xs", children: normalizeVillage(c.address || "") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 flex-wrap", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            className: "bg-green-600 hover:bg-green-700 text-white h-7 px-2.5 text-xs",
                            onClick: () => openWhatsApp(c.phone),
                            "data-ocid": `notice.whatsapp.button.${i + 1}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 12, className: "mr-1" }),
                              "WhatsApp"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            className: "bg-blue-500 hover:bg-blue-600 text-white h-7 px-2.5 text-xs",
                            onClick: () => openIMO(c.phone),
                            "data-ocid": `notice.imo.button.${i + 1}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 12, className: "mr-1" }),
                              "IMO"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            className: "h-7 px-2.5 text-xs border-orange-400 text-orange-600 hover:bg-orange-50",
                            onClick: () => openSMS(c.phone),
                            "data-ocid": `notice.sms.button.${i + 1}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 12, className: "mr-1" }),
                              "SMS"
                            ]
                          }
                        )
                      ] }) })
                    ]
                  },
                  c.id.toString()
                )) })
              ] }),
              filteredCustomers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-center text-muted-foreground py-12",
                  "data-ocid": "notice.customer_list.empty_state",
                  children: "কোনো গ্রাহক পাওয়া যায়নি"
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  NoticePage as default
};
