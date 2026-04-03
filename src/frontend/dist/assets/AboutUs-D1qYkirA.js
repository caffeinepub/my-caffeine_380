import { c as createLucideIcon, u as useCompanySettings, j as jsxRuntimeExports, U as Users, P as Phone } from "./index-Bn6g6lYN.js";
import { C as Card, c as CardContent } from "./card-DLSHX_61.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
function AboutUs() {
  const { settings } = useCompanySettings();
  const team = [
    {
      title: "প্রতিষ্ঠাতা পরিচালক",
      name: settings.directorName,
      phone: "+8801607930157",
      email: "nousheen.broadband.internet@gmail.com"
    },
    {
      title: "টেকনিক্যাল ম্যানেজার",
      name: settings.technicianName,
      phone: "+8801648388329",
      email: "nousheen.broadband.internet@gmail.com"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "aboutus.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "আমাদের সম্পর্কে" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "প্রতিষ্ঠানের পরিচয় ও যোগাযোগ" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card border-border", "data-ocid": "aboutus.org.card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "p-3 rounded-2xl",
          style: {
            background: "linear-gradient(135deg, #0a2463, #1c3f8c)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8", style: { color: "#d4af37" } })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: settings.resellerName || settings.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          settings.companyBrand,
          " এর একটি রিসেলার"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: team.map((member, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "shadow-card border-border",
        "data-ocid": `aboutus.team.item.${i + 1}`,
        style: { borderLeft: "4px solid #d4af37" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs font-semibold uppercase tracking-wide mb-1",
                style: { color: "#0a2463" },
                children: member.title
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground", children: member.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `tel:${member.phone}`,
                className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors",
                "data-ocid": `aboutus.team.phone.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Phone,
                    {
                      className: "w-4 h-4 shrink-0",
                      style: { color: "#22C55E" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: member.phone })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `mailto:${member.email}`,
                className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Mail,
                    {
                      className: "w-4 h-4 shrink-0",
                      style: { color: "#3B82F6" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-all", children: member.email })
                ]
              }
            )
          ] })
        ] })
      },
      member.phone
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "shadow-card border-border",
        "data-ocid": "aboutus.address.card",
        style: { borderLeft: "4px solid #0a2463" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-semibold uppercase tracking-wide mb-1",
              style: { color: "#0a2463" },
              children: "প্রতিষ্ঠানের ঠিকানা"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground", children: "বালিগাঁও, অষ্টগ্রাম, কিশোরগঞ্জ" })
        ] })
      }
    )
  ] });
}
export {
  AboutUs as default
};
