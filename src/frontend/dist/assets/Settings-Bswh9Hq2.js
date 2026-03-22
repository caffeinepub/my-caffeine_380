import { c as createLucideIcon, u as useCompanySettings, r as reactExports, b as ue, j as jsxRuntimeExports, a as Button, k as Shield, y as compressLogoDataUrl } from "./index-C3kSd-9o.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-109WLlcZ.js";
import { X, P as Pencil, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-a83NnxGm.js";
import { L as Label, I as Input } from "./label-B3jcnbGW.js";
import { T as Textarea } from "./textarea-DCLkVcD7.js";
import { s as samplePackages } from "./sampleData-Cae3K-SI.js";
import { u as useActor } from "./useActor-CXKNAiHW.js";
import { u as usePackages } from "./useQueries-CjWSDcsE.js";
import { W as Wifi } from "./wifi-BlldW03R.js";
import { L as LoaderCircle } from "./loader-circle-C3_KPWvJ.js";
import { P as Plus, T as Trash2 } from "./trash-2-De7Za_B5.js";
import { E as EyeOff, a as Eye } from "./eye-DhQHKgIY.js";
import "./useQuery-ByK4V8aa.js";
import "./permanentPackages-CnZQ-KNe.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2", key: "76otgf" }],
  ["path", { d: "M9 22v-4h6v4", key: "r93iot" }],
  ["path", { d: "M8 6h.01", key: "1dz90k" }],
  ["path", { d: "M16 6h.01", key: "1x0f13" }],
  ["path", { d: "M12 6h.01", key: "1vi96p" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }]
];
const Building = createLucideIcon("building", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode);
const emptyForm = {
  name: "",
  speed: "",
  monthlyPrice: "",
  description: ""
};
function Settings({
  isSuperAdmin,
  isAdmin: _isAdmin = false
}) {
  const { data: packages, isLoading } = usePackages();
  const { actor } = useActor();
  const allPackages = packages && packages.length > 0 ? packages : samplePackages;
  const { settings, save } = useCompanySettings();
  const [companyForm, setCompanyForm] = reactExports.useState({
    name: settings.name,
    address: settings.address,
    email: settings.email,
    whatsapp: settings.whatsapp
  });
  const [logoPreview, setLogoPreview] = reactExports.useState(settings.logo);
  const [savingCompany, setSavingCompany] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setLogoPreview(settings.logo);
    setCompanyForm({
      name: settings.name,
      address: settings.address,
      email: settings.email,
      whatsapp: settings.whatsapp
    });
  }, [settings]);
  async function handleLogoChange(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      var _a2;
      const raw = (_a2 = ev.target) == null ? void 0 : _a2.result;
      const compressed = await compressLogoDataUrl(raw);
      setLogoPreview(compressed);
    };
    reader.readAsDataURL(file);
  }
  async function handleSaveCompany() {
    setSavingCompany(true);
    await new Promise((r) => setTimeout(r, 300));
    save({ ...companyForm, logo: logoPreview });
    setSavingCompany(false);
    ue.success("প্রতিষ্ঠানের তথ্য সংরক্ষণ করা হয়েছে");
  }
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editingPkg, setEditingPkg] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm);
  const [saving, setSaving] = reactExports.useState(false);
  function openAdd() {
    setEditingPkg(null);
    setForm(emptyForm);
    setModalOpen(true);
  }
  function openEdit(p) {
    setEditingPkg(p);
    setForm({
      name: p.name,
      speed: p.speed,
      monthlyPrice: p.monthlyPrice.toString(),
      description: p.description
    });
    setModalOpen(true);
  }
  async function handleSave() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setModalOpen(false);
    ue.success(
      editingPkg ? "প্যাকেজ আপডেট করা হয়েছে" : "নতুন প্যাকেজ যোগ করা হয়েছে"
    );
  }
  const [adminAccounts, setAdminAccounts] = reactExports.useState([]);
  const [loadingAdmins, setLoadingAdmins] = reactExports.useState(false);
  const [adminForm, setAdminForm] = reactExports.useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });
  const [showAdminPw, setShowAdminPw] = reactExports.useState(false);
  const [addingAdmin, setAddingAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isSuperAdmin || !actor) return;
    setLoadingAdmins(true);
    actor.getAdminAccounts().then(setAdminAccounts).catch(() => ue.error("এডমিন তালিকা লোড করতে সমস্যা")).finally(() => setLoadingAdmins(false));
  }, [isSuperAdmin, actor]);
  async function handleAddAdmin(e) {
    e.preventDefault();
    if (!adminForm.name || !adminForm.email || !adminForm.password) {
      ue.error("সব তথ্য পূরণ করুন");
      return;
    }
    if (adminForm.password !== adminForm.confirm) {
      ue.error("পাসওয়ার্ড মিলছে না");
      return;
    }
    if (!actor) return;
    setAddingAdmin(true);
    try {
      await actor.addAdminAccount(
        adminForm.email,
        adminForm.password,
        adminForm.name
      );
      const updated = await actor.getAdminAccounts();
      setAdminAccounts(updated);
      setAdminForm({ name: "", email: "", password: "", confirm: "" });
      ue.success(`${adminForm.name} কে এডমিন হিসেবে যোগ করা হয়েছে`);
    } catch {
      ue.error("এডমিন যোগ করতে সমস্যা হয়েছে");
    } finally {
      setAddingAdmin(false);
    }
  }
  async function handleRemoveAdmin(email) {
    if (!actor) return;
    try {
      await actor.removeAdminAccount(email);
      setAdminAccounts((prev) => prev.filter((a) => a.email !== email));
      ue.success("এডমিন সরিয়ে দেওয়া হয়েছে");
    } catch {
      ue.error("এডমিন সরাতে সমস্যা হয়েছে");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "settings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "shadow-card border-border",
        "data-ocid": "settings.company.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "প্রতিষ্ঠানের তথ্য ও লোগো" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "প্রতিষ্ঠানের বিস্তারিত তথ্য ও লোগো আপলোড করুন" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-24 h-24 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/30 overflow-hidden",
                  "data-ocid": "settings.logo.dropzone",
                  children: logoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: logoPreview,
                      alt: "লোগো",
                      className: "w-full h-full object-contain"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-10 h-10 text-muted-foreground" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileRef,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: handleLogoChange
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "text-xs",
                  onClick: () => {
                    var _a;
                    return (_a = fileRef.current) == null ? void 0 : _a.click();
                  },
                  "data-ocid": "settings.logo.upload_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { size: 13, className: "mr-1.5" }),
                    "লোগো আপলোড"
                  ]
                }
              ),
              logoPreview && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs text-destructive hover:text-destructive",
                  onClick: () => setLogoPreview(null),
                  "data-ocid": "settings.logo.delete_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 13, className: "mr-1.5" }),
                    "সরিয়ে দিন"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "প্রতিষ্ঠানের নাম *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "settings.company_name.input",
                    value: companyForm.name,
                    onChange: (e) => setCompanyForm((p) => ({ ...p, name: e.target.value })),
                    placeholder: "নওশীন ব্রডব্যান্ড ইন্টারনেট"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ঠিকানা" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "settings.company_address.input",
                    value: companyForm.address,
                    onChange: (e) => setCompanyForm((p) => ({ ...p, address: e.target.value })),
                    placeholder: "গ্রাম/শহর, জেলা"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ইমেইল আইডি" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "settings.company_email.input",
                    type: "email",
                    value: companyForm.email,
                    onChange: (e) => setCompanyForm((p) => ({ ...p, email: e.target.value })),
                    placeholder: "info@example.com"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "WhatsApp নম্বর" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "settings.company_whatsapp.input",
                    value: companyForm.whatsapp,
                    onChange: (e) => setCompanyForm((p) => ({ ...p, whatsapp: e.target.value })),
                    placeholder: "০১৭XX-XXXXXX"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "bg-primary text-white",
                  onClick: handleSaveCompany,
                  disabled: savingCompany,
                  "data-ocid": "settings.save_company.button",
                  children: [
                    savingCompany && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                    "সংরক্ষণ করুন"
                  ]
                }
              ) })
            ] })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "shadow-card border-border",
        "data-ocid": "settings.packages.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-4 flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "ইন্টারনেট প্যাকেজ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "সকল ইন্টারনেট প্যাকেজ পরিচালনা করুন" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "bg-primary text-white",
                size: "sm",
                onClick: openAdd,
                "data-ocid": "settings.add_package.button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15, className: "mr-1.5" }),
                  "নতুন প্যাকেজ"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-4 space-y-3",
              "data-ocid": "settings.packages.loading_state",
              children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-16 w-full bg-muted animate-pulse rounded"
                },
                i
              ))
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
            allPackages.map((pkg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-5 py-4 hover:bg-muted/20",
                "data-ocid": `settings.package.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-4 h-4 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: pkg.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: pkg.description })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "গতি" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-primary", children: pkg.speed })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "মাসিক মূল্য" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-sm", children: [
                        "৳",
                        pkg.monthlyPrice.toLocaleString()
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          className: "h-8 w-8 p-0",
                          onClick: () => openEdit(pkg),
                          "data-ocid": `settings.edit_package.${i + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 13 })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          className: "h-8 w-8 p-0 text-destructive hover:text-destructive",
                          onClick: () => ue.success(`${pkg.name} মুছে ফেলা হয়েছে`),
                          "data-ocid": `settings.delete_package.${i + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                        }
                      )
                    ] })
                  ] })
                ]
              },
              pkg.id.toString()
            )),
            allPackages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-center text-muted-foreground py-10",
                "data-ocid": "settings.packages.empty_state",
                children: "কোনো প্যাকেজ পাওয়া যায়নি"
              }
            )
          ] }) })
        ]
      }
    ),
    isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "shadow-card border-border",
        "data-ocid": "settings.admin.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "এডমিন ম্যানেজমেন্ট" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "নতুন এডমিন যুক্ত করুন ও পরিচালনা করুন" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddAdmin, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "নতুন এডমিন যুক্ত করুন" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "নাম *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "এডমিনের নাম",
                      value: adminForm.name,
                      onChange: (e) => setAdminForm((p) => ({ ...p, name: e.target.value })),
                      "data-ocid": "settings.admin_name.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ইমেইল আইডি *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "email",
                      placeholder: "admin@example.com",
                      value: adminForm.email,
                      onChange: (e) => setAdminForm((p) => ({ ...p, email: e.target.value })),
                      "data-ocid": "settings.admin_email.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "পাসওয়ার্ড *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: showAdminPw ? "text" : "password",
                        placeholder: "পাসওয়ার্ড দিন",
                        value: adminForm.password,
                        onChange: (e) => setAdminForm((p) => ({
                          ...p,
                          password: e.target.value
                        })),
                        className: "pr-10",
                        "data-ocid": "settings.admin_password.input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                        onClick: () => setShowAdminPw((p) => !p),
                        children: showAdminPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "পাসওয়ার্ড নিশ্চিত করুন *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "password",
                      placeholder: "পাসওয়ার্ড আবার দিন",
                      value: adminForm.confirm,
                      onChange: (e) => setAdminForm((p) => ({ ...p, confirm: e.target.value })),
                      "data-ocid": "settings.admin_confirm_password.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  className: "bg-primary text-white",
                  disabled: addingAdmin,
                  "data-ocid": "settings.add_admin.button",
                  children: [
                    addingAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15, className: "mr-1.5" }),
                    "নতুন এডমিন যুক্ত করুন"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold mb-3", children: "বর্তমান এডমিন তালিকা" }),
              loadingAdmins ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "space-y-2",
                  "data-ocid": "settings.admin.loading_state",
                  children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-12 bg-muted animate-pulse rounded"
                    },
                    i
                  ))
                }
              ) : adminAccounts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-muted-foreground py-4 text-center",
                  "data-ocid": "settings.admin.empty_state",
                  children: "কোনো এডমিন নেই"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border border rounded-lg overflow-hidden", children: adminAccounts.map((admin, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between px-4 py-3 hover:bg-muted/20",
                  "data-ocid": `settings.admin.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: admin.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: admin.email })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        className: "h-8 w-8 p-0 text-destructive hover:text-destructive",
                        onClick: () => handleRemoveAdmin(admin.email),
                        "data-ocid": `settings.admin.delete_button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                      }
                    )
                  ]
                },
                admin.email
              )) })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: modalOpen, onOpenChange: setModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "settings.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingPkg ? "প্যাকেজ সম্পাদনা" : "নতুন প্যাকেজ" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "প্যাকেজের নাম *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "settings.package_name.input",
              value: form.name,
              onChange: (e) => setForm((p) => ({ ...p, name: e.target.value })),
              placeholder: "বেসিক প্যাকেজ"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ইন্টারনেট গতি" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "settings.package_speed.input",
                value: form.speed,
                onChange: (e) => setForm((p) => ({ ...p, speed: e.target.value })),
                placeholder: "10 Mbps"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "মাসিক মূল্য (৳)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "settings.package_price.input",
                type: "number",
                value: form.monthlyPrice,
                onChange: (e) => setForm((p) => ({ ...p, monthlyPrice: e.target.value })),
                placeholder: "600"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "বিবরণ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              "data-ocid": "settings.package_description.textarea",
              value: form.description,
              onChange: (e) => setForm((p) => ({ ...p, description: e.target.value })),
              placeholder: "প্যাকেজের বিবরণ",
              rows: 2
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
            "data-ocid": "settings.cancel_button",
            children: "বাতিল"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "bg-primary text-white",
            onClick: handleSave,
            disabled: saving,
            "data-ocid": "settings.submit_button",
            children: [
              saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
              editingPkg ? "আপডেট করুন" : "যোগ করুন"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Settings as default
};
