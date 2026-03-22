import { i as useInternetIdentity, r as reactExports, j as jsxRuntimeExports, k as Shield, a as Button, b as ue } from "./index-Ds0Kkum2.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent } from "./card-PLCC5eN2.js";
import { L as Label, I as Input } from "./label-XEvqS2qZ.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-6QdnbM2e.js";
import { u as useActor } from "./useActor-BcVpNQc9.js";
import { W as Wifi } from "./wifi-9eeNczZ1.js";
import { L as LoaderCircle } from "./loader-circle-DIb9vWJs.js";
import { E as EyeOff, a as Eye } from "./eye-DDhUw3G9.js";
import "./useQuery-D3IVLfcM.js";
function LoginPage({
  onAdminLogin,
  onCancel: _onCancel
}) {
  const { login, isLoggingIn, isLoginError } = useInternetIdentity();
  const { actor } = useActor();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  async function handleAdminLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      ue.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }
    if (!actor) {
      ue.error("সিস্টেম প্রস্তুত হচ্ছে... আবার চেষ্টা করুন");
      return;
    }
    setLoading(true);
    try {
      const name = await actor.loginAdminAccount(email, password);
      const session = { type: "admin", email, name };
      localStorage.setItem("adminSession", JSON.stringify(session));
      onAdminLogin(session);
      ue.success(`স্বাগতম, ${name}`);
    } catch {
      ue.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen flex items-center justify-center",
      style: { background: "oklch(0.149 0.035 252)" },
      "data-ocid": "login.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-8 h-8 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white text-center", children: "নওশীন ব্রডব্যান্ড" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", style: { color: "oklch(0.65 0.02 252)" }, children: "ISP ম্যানেজমেন্ট সিস্টেম" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-xl border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "লগইন" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm", children: "সিস্টেমে প্রবেশ করতে আপনার পরিচয় যাচাই করুন" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "super", className: "w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabsTrigger,
                  {
                    value: "super",
                    className: "flex-1 text-xs",
                    "data-ocid": "login.super_admin.tab",
                    children: "সুপার এডমিন"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabsTrigger,
                  {
                    value: "admin",
                    className: "flex-1 text-xs",
                    "data-ocid": "login.admin.tab",
                    children: "এডমিন লগইন"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "super", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-primary/10 text-primary", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 15 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: "Internet Identity দিয়ে লগইন করুন" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "w-full bg-primary text-white font-medium",
                    size: "lg",
                    onClick: () => login(),
                    disabled: isLoggingIn,
                    "data-ocid": "login.submit_button",
                    children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                      "লগইন হচ্ছে..."
                    ] }) : "সুপার এডমিন লগইন"
                  }
                ),
                isLoginError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-destructive text-sm text-center",
                    "data-ocid": "login.error_state",
                    children: "লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "admin", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAdminLogin, className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "ইমেইল আইডি" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "email",
                      placeholder: "admin@example.com",
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      "data-ocid": "login.admin_email.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "পাসওয়ার্ড" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: showPw ? "text" : "password",
                        placeholder: "পাসওয়ার্ড দিন",
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        className: "pr-10",
                        "data-ocid": "login.admin_password.input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                        onClick: () => setShowPw((p) => !p),
                        children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    className: "w-full bg-primary text-white",
                    disabled: loading,
                    "data-ocid": "login.admin_submit.button",
                    children: [
                      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                      "লগইন করুন"
                    ]
                  }
                )
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-4", children: "শুধুমাত্র অনুমোদিত অ্যাডমিন প্রবেশ করতে পারবেন" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-center text-xs mt-6",
            style: { color: "oklch(0.45 0.02 252)" },
            children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              ". Built with love using",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "underline hover:text-white transition-colors",
                  children: "caffeine.ai"
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
export {
  LoginPage as default
};
