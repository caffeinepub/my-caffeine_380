import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Phone, B as Badge, U as Users, a as Button } from "./index-CLn6Dvvh.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DgI8w_9r.js";
import { C as Checkbox } from "./checkbox-BEhiuhFU.js";
import { L as Label, I as Input } from "./label-BxkJv6hJ.js";
import { u as useLocalCustomers } from "./useLocalCustomers-CHBDXFdF.js";
import { S as Search } from "./search-Cl5fy0ak.js";
import "./index-Cs78LNzb.js";
import "./check-D7UaX-Dz.js";
import "./permanentPackages-CnZQ-KNe.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M13 2a9 9 0 0 1 9 9", key: "1itnx2" }],
  ["path", { d: "M13 6a5 5 0 0 1 5 5", key: "11nki7" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const PhoneCall = createLucideIcon("phone-call", __iconNode);
const VILLAGES = [
  "বালিগাঁও",
  "ফরিদপুর",
  "কাটাইয়া",
  "পূর্ব বাজুকা",
  "পশ্চিম বাজুকা",
  "বালিগাঁও অষ্ট গ্রাম অঞ্চল",
  "বালিগাঁও লাখাই অঞ্চল"
];
function CallCenter() {
  const { customers } = useLocalCustomers();
  const [search, setSearch] = reactExports.useState("");
  const [selectedVillages, setSelectedVillages] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const allCustomers = customers;
  function toggleVillage(v) {
    setSelectedVillages((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  }
  const filtered = allCustomers.filter((c) => {
    const villageMatch = selectedVillages.size === 0 || selectedVillages.has(c.village ?? "");
    const q = search.trim().toLowerCase();
    const searchMatch = !q || (c.username ?? "").toLowerCase().includes(q) || (c.cidNumber ?? "").toLowerCase().includes(q) || (c.carnivalId ?? "").toLowerCase().includes(q) || (c.phone ?? "").includes(q);
    return villageMatch && searchMatch;
  });
  function handleCall(phone) {
    window.location.href = `tel:${phone}`;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "call.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-6 h-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "কল সেন্টার" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "গ্রাহক খুঁজে বের করে সরাসরি কল করুন" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border", "data-ocid": "call.filter.card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "গ্রাম ফিল্টার" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: VILLAGES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            id: `village-${v}`,
            checked: selectedVillages.has(v),
            onCheckedChange: () => toggleVillage(v),
            "data-ocid": "call.filter.checkbox"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: `village-${v}`,
            className: "text-sm cursor-pointer",
            children: v
          }
        )
      ] }, v)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          className: "pl-9",
          placeholder: "নাম, সিআইডি নম্বর, কার্নিভাল আইডি বা মোবাইল নম্বর দিয়ে সার্চ করুন...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "data-ocid": "call.search_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border", "data-ocid": "call.results.card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "গ্রাহক তালিকা" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3 mr-1" }),
          filtered.length,
          " জন"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-16 text-center", "data-ocid": "call.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-full bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "কোনো গ্রাহক পাওয়া যায়নি" })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "ইউজার নেম/ইউজার আইডি" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "কার্নিভাল আইডি" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "সিআইডি নম্বর" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "মোবাইল নম্বর" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "গ্রাম" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "কল" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border last:border-0 hover:bg-muted/20",
            "data-ocid": `call.customer.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground", children: i + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-medium", children: c.username }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground font-mono text-xs", children: c.carnivalId || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground font-mono text-xs", children: c.cidNumber || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: c.phone }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground text-xs", children: c.address || c.village || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "bg-green-600 hover:bg-green-700 text-white h-8 px-3 text-xs gap-1.5",
                  onClick: () => handleCall(c.phone),
                  "data-ocid": `call.call.button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "w-3.5 h-3.5" }),
                    "কল করুন"
                  ]
                }
              ) })
            ]
          },
          c.id.toString()
        )) })
      ] }) }) })
    ] })
  ] });
}
export {
  CallCenter as default
};
