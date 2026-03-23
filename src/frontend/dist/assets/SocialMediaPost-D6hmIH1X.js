import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, p as Primitive, f as cn, u as useCompanySettings, a5 as Share2, a as Button, B as Badge, b as ue } from "./index-vIdg1x08.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Cp7soQnc.js";
import { L as Label, I as Input } from "./label-D06uwrr_.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-w3QScjr2.js";
import { T as Textarea } from "./textarea-Ds15-JeB.js";
import { T as Trash2, P as Plus } from "./trash-2-DduYBHgO.js";
import { D as Download } from "./download-4UsNNomT.js";
import "./index-BnYIJpRf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
];
const Facebook = createLucideIcon("facebook", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode$1);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const BUILTIN_LABELS = {
  urgent: "জরুরী ঘোষণা",
  offer: "বিশেষ অফার",
  problem: "সমস্যার নোটিশ",
  eid: "ঈদের শুভেচ্ছা",
  baishakh: "পহেলা বৈশাখ শুভেচ্ছা",
  independence: "স্বাধীনতা দিবস বার্তা",
  victory: "বিজয় দিবস বার্তা",
  newyear: "নববর্ষ শুভেচ্ছা",
  anniversary: "প্রতিষ্ঠাবার্ষিকী শুভেচ্ছা",
  general: "সাধারণ শুভেচ্ছা",
  motherlanguage: "আন্তর্জাতিক মাতৃভাষা দিবস",
  linemaintenance: "লাইন মেরামত কাজ",
  billreminder: "বিল রিমাইন্ডার",
  internetsafety: "নিরাপদ ইন্টারনেট সচেতনতা",
  customerappreciation: "গ্রাহক প্রশংসা"
};
const POSTER_SYMBOLS = {
  urgent: "⚠ জরুরি বার্তা ⚠",
  offer: "💥 বিশেষ অফার 💥",
  problem: "🔧 সমস্যার নোটিশ 🔧",
  eid: "☪ ঈদ মোবারক ☪",
  baishakh: "🌸 শুভ নববর্ষ ১৪৩২ 🌸",
  independence: "🇧🇩 স্বাধীনতা দিবসের শুভেচ্ছা 🇧🇩",
  victory: "🎖 বিজয় দিবসের শুভেচ্ছা 🎖",
  newyear: "🎉 শুভ নববর্ষ 🎉",
  anniversary: "🏆 শুভ প্রতিষ্ঠাবার্ষিকী 🏆",
  general: "💐 শুভেচ্ছা ও অভিনন্দন 💐",
  motherlanguage: "🌹 আন্তর্জাতিক মাতৃভাষা দিবস 🌹",
  linemaintenance: "🔌 লাইন মেরামত চলছে 🔌",
  billreminder: "💳 বিল পরিশোধ করুন 💳",
  internetsafety: "🛡 নিরাপদ ইন্টারনেট 🛡",
  customerappreciation: "🙏 ধন্যবাদ ও কৃতজ্ঞতা 🙏"
};
const POSTER_COLORS = {
  urgent: {
    from: "#fff3e0",
    to: "#ffe0b2",
    accent: "#e65100",
    secondary: "#bf360c",
    textDark: "#bf360c"
  },
  offer: {
    from: "#f3e5f5",
    to: "#e1bee7",
    accent: "#6a1b9a",
    secondary: "#4a148c",
    textDark: "#4a148c"
  },
  problem: {
    from: "#e3f2fd",
    to: "#bbdefb",
    accent: "#1565c0",
    secondary: "#0d47a1",
    textDark: "#0d47a1"
  },
  eid: {
    from: "#e8f5e9",
    to: "#c8e6c9",
    accent: "#1b5e20",
    secondary: "#b8860b",
    textDark: "#1b5e20"
  },
  baishakh: {
    from: "#fff8e1",
    to: "#ffecb3",
    accent: "#c62828",
    secondary: "#1b5e20",
    textDark: "#c62828"
  },
  independence: {
    from: "#e8f5e9",
    to: "#ffebee",
    accent: "#1b5e20",
    secondary: "#c62828",
    textDark: "#1b5e20"
  },
  victory: {
    from: "#e8f5e9",
    to: "#fce4ec",
    accent: "#1b5e20",
    secondary: "#c62828",
    textDark: "#1b5e20"
  },
  newyear: {
    from: "#fff8e1",
    to: "#ffecb3",
    accent: "#c62828",
    secondary: "#e65100",
    textDark: "#c62828"
  },
  anniversary: {
    from: "#e3f2fd",
    to: "#fce4ec",
    accent: "#1a237e",
    secondary: "#b8860b",
    textDark: "#1a237e"
  },
  general: {
    from: "#f8f9fa",
    to: "#e8eaf6",
    accent: "#283593",
    secondary: "#4527a0",
    textDark: "#1a237e"
  },
  motherlanguage: {
    from: "#ffebee",
    to: "#fce4ec",
    accent: "#c62828",
    secondary: "#880e4f",
    textDark: "#880e4f"
  },
  linemaintenance: {
    from: "#e3f2fd",
    to: "#e8eaf6",
    accent: "#1565c0",
    secondary: "#37474f",
    textDark: "#0d47a1"
  },
  billreminder: {
    from: "#fff9c4",
    to: "#fff176",
    accent: "#f57f17",
    secondary: "#e65100",
    textDark: "#e65100"
  },
  internetsafety: {
    from: "#e0f7fa",
    to: "#b2ebf2",
    accent: "#00695c",
    secondary: "#006064",
    textDark: "#004d40"
  },
  customerappreciation: {
    from: "#fce4ec",
    to: "#f8bbd9",
    accent: "#880e4f",
    secondary: "#c62828",
    textDark: "#880e4f"
  }
};
function SocialMediaPost({ isAdmin }) {
  const { settings } = useCompanySettings();
  const canvasRef = reactExports.useRef(null);
  const [announcementText, setAnnouncementText] = reactExports.useState("");
  const [posterType, setPosterType] = reactExports.useState("urgent");
  const [generatedUrl, setGeneratedUrl] = reactExports.useState(null);
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [facebookUrl, setFacebookUrl] = reactExports.useState(
    () => localStorage.getItem("fbPageUrl") ?? ""
  );
  const [fbSaved, setFbSaved] = reactExports.useState(false);
  const [customCategories, setCustomCategories] = reactExports.useState(
    () => {
      try {
        return JSON.parse(
          localStorage.getItem("customPosterCategories") ?? "[]"
        );
      } catch {
        return [];
      }
    }
  );
  const [newCategoryName, setNewCategoryName] = reactExports.useState("");
  function saveCustomCategories(cats) {
    setCustomCategories(cats);
    localStorage.setItem("customPosterCategories", JSON.stringify(cats));
  }
  function addCustomCategory() {
    const name = newCategoryName.trim();
    if (!name) {
      ue.error("ক্যাটাগরির নাম লিখুন");
      return;
    }
    const id = `custom_${Date.now()}`;
    const updated = [...customCategories, { id, name }];
    saveCustomCategories(updated);
    setNewCategoryName("");
    ue.success(`"${name}" ক্যাটাগরি যুক্ত হয়েছে`);
  }
  function updateCustomCategory(id, name) {
    const updated = customCategories.map(
      (c) => c.id === id ? { ...c, name } : c
    );
    saveCustomCategories(updated);
  }
  function deleteCustomCategory(id) {
    const updated = customCategories.filter((c) => c.id !== id);
    saveCustomCategories(updated);
    if (posterType === id) setPosterType("urgent");
    ue.success("ক্যাটাগরি মুছে ফেলা হয়েছে");
  }
  function saveFacebookUrl() {
    localStorage.setItem("fbPageUrl", facebookUrl);
    setFbSaved(true);
    ue.success("ফেসবুক লিংক সেভ হয়েছে");
    setTimeout(() => setFbSaved(false), 3e3);
  }
  function getPosterColors(type) {
    return POSTER_COLORS[type] ?? POSTER_COLORS.general;
  }
  function getPosterLabel(type) {
    var _a;
    if (BUILTIN_LABELS[type]) {
      return BUILTIN_LABELS[type];
    }
    return ((_a = customCategories.find((c) => c.id === type)) == null ? void 0 : _a.name) ?? "শুভেচ্ছা";
  }
  function getPosterSymbol(type) {
    if (POSTER_SYMBOLS[type]) {
      return POSTER_SYMBOLS[type];
    }
    return "💐 শুভেচ্ছা ও অভিনন্দন 💐";
  }
  function blendColors(c1, c2) {
    const r1 = Number.parseInt(c1.slice(1, 3), 16);
    const g1 = Number.parseInt(c1.slice(3, 5), 16);
    const b1 = Number.parseInt(c1.slice(5, 7), 16);
    const r2 = Number.parseInt(c2.slice(1, 3), 16);
    const g2 = Number.parseInt(c2.slice(3, 5), 16);
    const b2 = Number.parseInt(c2.slice(5, 7), 16);
    const r = Math.round((r1 + r2) / 2).toString(16).padStart(2, "0");
    const g = Math.round((g1 + g2) / 2).toString(16).padStart(2, "0");
    const b = Math.round((b1 + b2) / 2).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }
  function drawDecorations(ctx, type, colors) {
    const resolvedType = POSTER_COLORS[type] ? type : "general";
    ctx.save();
    if (resolvedType === "independence") {
      const spireData = [
        { x: 780, h: 280, w: 28 },
        { x: 820, h: 340, w: 32 },
        { x: 865, h: 400, w: 36 },
        { x: 915, h: 480, w: 42 },
        // tallest center
        { x: 965, h: 400, w: 36 },
        { x: 1010, h: 340, w: 32 },
        { x: 1050, h: 280, w: 28 }
      ];
      const baseY = 1e3;
      ctx.fillStyle = colors.accent;
      ctx.globalAlpha = 0.18;
      for (const sp of spireData) {
        ctx.beginPath();
        ctx.moveTo(sp.x - sp.w / 2, baseY);
        ctx.lineTo(sp.x, baseY - sp.h);
        ctx.lineTo(sp.x + sp.w / 2, baseY);
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 0.15;
      ctx.fillRect(760, baseY, 310, 20);
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = colors.secondary ?? "#c62828";
      ctx.beginPath();
      ctx.arc(200, 680, 160, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.arc(160, 680, 190, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = colors.secondary ?? "#c62828";
      const flowerPos = [
        [780, 1020, 8],
        [840, 1030, 6],
        [890, 1018, 9],
        [950, 1025, 7],
        [1e3, 1022, 8],
        [1040, 1028, 6],
        [860, 1040, 5],
        [930, 1042, 7]
      ];
      for (const [fx, fy, fr] of flowerPos) {
        ctx.beginPath();
        ctx.arc(fx, fy, fr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = colors.secondary ?? "#c62828";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 18; i++) {
        const a = i * Math.PI * 2 / 18 - Math.PI / 4;
        ctx.beginPath();
        ctx.moveTo(150 + 30 * Math.cos(a), 300 + 30 * Math.sin(a));
        ctx.lineTo(150 + 120 * Math.cos(a), 300 + 120 * Math.sin(a));
        ctx.stroke();
      }
    } else if (resolvedType === "motherlanguage") {
      const baseY = 1e3;
      const centerX = 900;
      ctx.fillStyle = colors.accent;
      ctx.globalAlpha = 0.22;
      ctx.fillRect(720, baseY - 10, 360, 20);
      ctx.fillRect(700, baseY + 10, 400, 16);
      ctx.beginPath();
      ctx.moveTo(centerX - 18, baseY - 10);
      ctx.lineTo(centerX - 12, baseY - 420);
      ctx.lineTo(centerX + 12, baseY - 420);
      ctx.lineTo(centerX + 18, baseY - 10);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 0.18;
      ctx.beginPath();
      ctx.moveTo(centerX - 40, baseY - 10);
      ctx.lineTo(centerX - 70, baseY - 300);
      ctx.lineTo(centerX - 55, baseY - 300);
      ctx.lineTo(centerX - 28, baseY - 10);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(centerX + 28, baseY - 10);
      ctx.lineTo(centerX + 55, baseY - 300);
      ctx.lineTo(centerX + 70, baseY - 300);
      ctx.lineTo(centerX + 40, baseY - 10);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 0.14;
      ctx.beginPath();
      ctx.moveTo(centerX - 80, baseY - 10);
      ctx.lineTo(centerX - 130, baseY - 210);
      ctx.lineTo(centerX - 112, baseY - 210);
      ctx.lineTo(centerX - 66, baseY - 10);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(centerX + 66, baseY - 10);
      ctx.lineTo(centerX + 112, baseY - 210);
      ctx.lineTo(centerX + 130, baseY - 210);
      ctx.lineTo(centerX + 80, baseY - 10);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 0.25;
      const wreathColors = [
        "#e53935",
        "#ff7043",
        "#e91e63",
        "#fdd835",
        "#43a047"
      ];
      for (let wi = 0; wi < 12; wi++) {
        ctx.fillStyle = wreathColors[wi % wreathColors.length];
        ctx.beginPath();
        ctx.arc(760 + wi * 34, baseY + 20, 10, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = colors.accent;
      ctx.font = "bold 80px 'Noto Sans Bengali', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("অ", 150, 380);
      ctx.fillText("আ", 230, 520);
      ctx.fillText("ক", 130, 650);
      ctx.fillText("ব", 200, 760);
    } else if (resolvedType === "newyear" || resolvedType === "baishakh") {
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 0.15;
      const alponaPoints = [
        [150, 900],
        [1050, 900],
        [150, 400],
        [1050, 400]
      ];
      for (const [ax, ay] of alponaPoints) {
        for (let p = 0; p < 8; p++) {
          const a = p * Math.PI / 4;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.bezierCurveTo(
            ax + 50 * Math.cos(a - 0.3),
            ay + 50 * Math.sin(a - 0.3),
            ax + 50 * Math.cos(a + 0.3),
            ay + 50 * Math.sin(a + 0.3),
            ax + 70 * Math.cos(a),
            ay + 70 * Math.sin(a)
          );
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(ax, ay, 15, 0, Math.PI * 2);
        ctx.stroke();
      }
      const potX = 950;
      const potY = 650;
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.ellipse(potX, potY + 80, 70, 90, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(potX - 20, potY - 10, 40, 60);
      ctx.beginPath();
      ctx.ellipse(potX, potY - 10, 28, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(potX, potY - 35, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = colors.secondary ?? "#1b5e20";
      for (let li = 0; li < 5; li++) {
        const la = li * Math.PI / 2.5 - Math.PI / 4;
        ctx.beginPath();
        ctx.ellipse(
          potX + 25 * Math.cos(la),
          potY - 25 + 25 * Math.sin(la) - 18,
          6,
          20,
          la,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      const fishX = 200;
      const fishY = 700;
      ctx.beginPath();
      ctx.ellipse(fishX, fishY, 60, 25, -Math.PI / 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(fishX + 55, fishY - 15);
      ctx.lineTo(fishX + 85, fishY - 35);
      ctx.lineTo(fishX + 85, fishY + 5);
      ctx.closePath();
      ctx.stroke();
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = colors.secondary ?? "#1b5e20";
      for (let fi = 0; fi < 7; fi++) {
        const fa = fi * Math.PI / 6 - Math.PI / 4;
        ctx.beginPath();
        ctx.arc(200, 400, 40 + fi * 20, fa, fa + Math.PI / 8);
        ctx.stroke();
      }
    } else if (resolvedType === "urgent") {
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.moveTo(600, 350);
      ctx.lineTo(900, 900);
      ctx.lineTo(300, 900);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = colors.accent;
      ctx.font = "bold 200px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("!", 600, 720);
      const triPos = [
        [120, 380, 45],
        [1080, 380, 45],
        [120, 980, 38],
        [1080, 980, 38],
        [600, 320, 32]
      ];
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      for (const [tx, ty, ts] of triPos) {
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.moveTo(tx, ty - ts);
        ctx.lineTo(tx + ts * 0.87, ty + ts * 0.5);
        ctx.lineTo(tx - ts * 0.87, ty + ts * 0.5);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = colors.secondary ?? "#bf360c";
      ctx.lineWidth = 3;
      for (let r = 60; r <= 200; r += 40) {
        ctx.beginPath();
        ctx.arc(180, 850, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = colors.secondary ?? "#bf360c";
      ctx.beginPath();
      ctx.arc(1e3, 400, 50, Math.PI, 2 * Math.PI);
      ctx.rect(950, 370, 100, 30);
      ctx.fill();
    } else if (resolvedType === "linemaintenance") {
      ctx.fillStyle = colors.secondary ?? "#37474f";
      ctx.globalAlpha = 0.18;
      ctx.fillRect(920, 350, 18, 600);
      ctx.fillRect(860, 440, 140, 12);
      ctx.fillRect(870, 530, 120, 10);
      ctx.globalAlpha = 0.12;
      ctx.fillRect(200, 400, 14, 560);
      ctx.fillRect(154, 480, 110, 10);
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.2;
      const cableAttachments = [
        [863, 446],
        [870, 536],
        [875, 446],
        [880, 536]
      ];
      for (const [cx1, cy1] of cableAttachments) {
        ctx.beginPath();
        ctx.moveTo(cx1, cy1);
        ctx.bezierCurveTo(600, cy1 + 40, 400, cy1 + 35, 210, cy1 - 10);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = colors.accent;
      const techX = 580;
      const techY = 680;
      ctx.beginPath();
      ctx.arc(techX, techY - 70, 22, Math.PI, 2 * Math.PI);
      ctx.fill();
      ctx.fillRect(techX - 22, techY - 72, 44, 8);
      ctx.beginPath();
      ctx.arc(techX, techY - 50, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(techX - 8, techY - 34, 16, 60);
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 5;
      ctx.globalAlpha = 0.18;
      ctx.beginPath();
      ctx.moveTo(techX - 8, techY - 20);
      ctx.lineTo(techX - 45, techY + 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(techX + 8, techY - 20);
      ctx.lineTo(techX + 45, techY - 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(techX - 4, techY + 26);
      ctx.lineTo(techX - 14, techY + 70);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(techX + 4, techY + 26);
      ctx.lineTo(techX + 14, techY + 70);
      ctx.stroke();
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 5;
      ctx.save();
      ctx.translate(techX + 45, techY - 10);
      ctx.rotate(-Math.PI / 6);
      ctx.beginPath();
      ctx.roundRect(-8, 0, 16, 70, 6);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -8, 20, 0.5, Math.PI - 0.5);
      ctx.stroke();
      ctx.restore();
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.08;
      const gridStep = 70;
      for (let gx = 80; gx < 500; gx += gridStep) {
        for (let gy = 800; gy < 1050; gy += gridStep) {
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(gx + gridStep * 0.6, gy);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(gx, gy + gridStep * 0.6);
          ctx.stroke();
        }
      }
    } else if (resolvedType === "offer") {
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.moveTo(100, 500);
      ctx.lineTo(200, 450);
      ctx.lineTo(1100, 450);
      ctx.lineTo(1200, 500);
      ctx.lineTo(1100, 550);
      ctx.lineTo(200, 550);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 0.08;
      ctx.beginPath();
      ctx.moveTo(100, 600);
      ctx.lineTo(200, 560);
      ctx.lineTo(1100, 560);
      ctx.lineTo(1200, 600);
      ctx.lineTo(1100, 640);
      ctx.lineTo(200, 640);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = colors.secondary ?? "#4a148c";
      ctx.globalAlpha = 0.22;
      const starPositions = [
        [150, 350, 30],
        [1050, 350, 28],
        [140, 950, 25],
        [1060, 920, 30],
        [300, 430, 20],
        [900, 880, 22],
        [700, 330, 18],
        [500, 950, 20]
      ];
      for (const [sx, sy, sr] of starPositions) {
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const a = i * Math.PI / 5 - Math.PI / 2;
          const r = i % 2 === 0 ? sr : sr * 0.42;
          const px = sx + r * Math.cos(a);
          const py = sy + r * Math.sin(a);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 4;
      ctx.strokeRect(870, 650, 160, 140);
      ctx.beginPath();
      ctx.moveTo(950, 650);
      ctx.lineTo(950, 790);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(870, 720);
      ctx.lineTo(1030, 720);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(950, 650);
      ctx.bezierCurveTo(920, 610, 880, 620, 910, 648);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(950, 650);
      ctx.bezierCurveTo(980, 610, 1020, 620, 990, 648);
      ctx.stroke();
      ctx.globalAlpha = 0.07;
      ctx.fillStyle = colors.accent;
      ctx.font = "bold 380px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("%", 350, 700);
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = colors.secondary ?? "#4a148c";
      const sparklePos = [
        [200, 820],
        [1e3, 450],
        [400, 400],
        [850, 800]
      ];
      for (const [spx, spy] of sparklePos) {
        for (let si = 0; si < 4; si++) {
          const sa = si * Math.PI / 2;
          ctx.fillRect(
            spx + 15 * Math.cos(sa) - 2,
            spy + 15 * Math.sin(sa) - 2,
            4,
            4
          );
        }
      }
    } else if (resolvedType === "billreminder") {
      ctx.globalAlpha = 0.14;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(750, 380);
      ctx.lineTo(980, 380);
      ctx.lineTo(980, 960);
      ctx.lineTo(700, 960);
      ctx.lineTo(700, 430);
      ctx.lineTo(750, 380);
      ctx.closePath();
      ctx.stroke();
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.moveTo(700, 430);
      ctx.lineTo(750, 380);
      ctx.lineTo(750, 430);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      for (let li = 0; li < 6; li++) {
        const ly = 500 + li * 70;
        const lw = li === 0 ? 200 : 220;
        ctx.beginPath();
        ctx.moveTo(740, ly);
        ctx.lineTo(740 + lw, ly);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.07;
      ctx.fillStyle = colors.accent;
      ctx.font = "bold 380px 'Noto Sans Bengali', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("৳", 300, 680);
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      ctx.strokeRect(120, 400, 160, 140);
      ctx.beginPath();
      ctx.moveTo(120, 440);
      ctx.lineTo(280, 440);
      ctx.stroke();
      for (let ci = 0; ci < 3; ci++) {
        for (let cj = 0; cj < 4; cj++) {
          ctx.beginPath();
          ctx.arc(145 + cj * 40, 470 + ci * 36, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 0.14;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(200, 850, 60, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(200, 850);
      ctx.lineTo(200, 810);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(200, 850);
      ctx.lineTo(225, 860);
      ctx.stroke();
    } else if (resolvedType === "internetsafety") {
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.moveTo(600, 380);
      ctx.lineTo(820, 450);
      ctx.lineTo(820, 660);
      ctx.bezierCurveTo(820, 800, 600, 900, 600, 900);
      ctx.bezierCurveTo(600, 900, 380, 800, 380, 660);
      ctx.lineTo(380, 450);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(490, 640);
      ctx.lineTo(555, 720);
      ctx.lineTo(710, 560);
      ctx.stroke();
      ctx.lineCap = "butt";
      ctx.lineJoin = "miter";
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = colors.secondary ?? "#006064";
      ctx.lineWidth = 5;
      for (let wa = 0; wa < 3; wa++) {
        ctx.beginPath();
        ctx.arc(200, 800, 40 + wa * 50, Math.PI + 0.3, 2 * Math.PI - 0.3);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = colors.secondary ?? "#006064";
      ctx.beginPath();
      ctx.arc(200, 800, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.14;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 4;
      ctx.strokeRect(1010, 650, 100, 90);
      ctx.beginPath();
      ctx.arc(1060, 655, 35, Math.PI, 2 * Math.PI);
      ctx.stroke();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.arc(1060, 685, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(1054, 685, 12, 28);
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = colors.accent;
      ctx.font = "bold 24px monospace";
      ctx.textAlign = "left";
      const binPos = [
        [100, 380, "0 1 1 0"],
        [1e3, 380, "1 0 1"],
        [120, 450, "1 0 0 1"],
        [980, 460, "0 1 0"],
        [80, 520, "1 1 0"],
        [1010, 540, "0 0 1 1"]
      ];
      for (const [bx, by, bt] of binPos) {
        ctx.fillText(bt, bx, by);
      }
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = colors.accent;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1.5;
      const netNodes = [
        [130, 600],
        [250, 550],
        [180, 700],
        [320, 620],
        [100, 750]
      ];
      for (const [nx, ny] of netNodes) {
        ctx.beginPath();
        ctx.arc(nx, ny, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let ni = 0; ni < netNodes.length; ni++) {
        for (let nj = ni + 1; nj < netNodes.length; nj++) {
          if (Math.abs(ni - nj) <= 2) {
            ctx.beginPath();
            ctx.moveTo(netNodes[ni][0], netNodes[ni][1]);
            ctx.lineTo(netNodes[nj][0], netNodes[nj][1]);
            ctx.stroke();
          }
        }
      }
    } else if (resolvedType === "customerappreciation") {
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = colors.accent;
      const hcx = 600;
      const hcy = 680;
      ctx.beginPath();
      ctx.moveTo(hcx, hcy + 140);
      ctx.bezierCurveTo(
        hcx,
        hcy + 140,
        hcx - 200,
        hcy + 40,
        hcx - 200,
        hcy - 60
      );
      ctx.bezierCurveTo(
        hcx - 200,
        hcy - 160,
        hcx - 80,
        hcy - 200,
        hcx,
        hcy - 120
      );
      ctx.bezierCurveTo(
        hcx + 80,
        hcy - 200,
        hcx + 200,
        hcy - 160,
        hcx + 200,
        hcy - 60
      );
      ctx.bezierCurveTo(hcx + 200, hcy + 40, hcx, hcy + 140, hcx, hcy + 140);
      ctx.fill();
      ctx.fillStyle = colors.secondary ?? "#c62828";
      ctx.globalAlpha = 0.2;
      const cStars = [
        [150, 380, 22],
        [1060, 400, 25],
        [120, 900, 20],
        [1070, 880, 22],
        [350, 360, 18],
        [850, 370, 20],
        [250, 940, 16],
        [950, 930, 18]
      ];
      for (const [sx, sy, sr] of cStars) {
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const a = i * Math.PI / 5 - Math.PI / 2;
          const r = i % 2 === 0 ? sr : sr * 0.42;
          i === 0 ? ctx.moveTo(sx + r * Math.cos(a), sy + r * Math.sin(a)) : ctx.lineTo(sx + r * Math.cos(a), sy + r * Math.sin(a));
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 0.14;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(180, 700, 60, -Math.PI / 3, Math.PI / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(180, 700, 80, -Math.PI / 3, Math.PI / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(1020, 700, 60, Math.PI / 2, Math.PI + Math.PI / 3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(1020, 700, 80, Math.PI / 2, Math.PI + Math.PI / 3);
      ctx.stroke();
      ctx.lineCap = "butt";
      ctx.globalAlpha = 0.15;
      const flowerColors = ["#e91e63", "#f06292", "#e53935"];
      const flowerSites = [
        [200, 950],
        [1e3, 950],
        [600, 340]
      ];
      for (const [flx, fly] of flowerSites) {
        for (let p = 0; p < 6; p++) {
          const a = p * Math.PI / 3;
          ctx.fillStyle = flowerColors[p % flowerColors.length];
          ctx.beginPath();
          ctx.ellipse(
            flx + 25 * Math.cos(a),
            fly + 25 * Math.sin(a),
            12,
            20,
            a,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
        ctx.fillStyle = "#fdd835";
        ctx.beginPath();
        ctx.arc(flx, fly, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(980, 500, 50, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(965, 550);
      ctx.lineTo(950, 610);
      ctx.lineTo(980, 590);
      ctx.lineTo(1010, 610);
      ctx.lineTo(995, 550);
      ctx.stroke();
    } else if (resolvedType === "eid") {
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = colors.secondary ?? "#b8860b";
      ctx.beginPath();
      ctx.arc(950, 660, 140, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = blendColors(colors.from, colors.to);
      ctx.beginPath();
      ctx.arc(1010, 630, 125, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = colors.secondary ?? "#b8860b";
      const starCx = 600;
      const starCy = 680;
      const starR = 200;
      for (let sq = 0; sq < 2; sq++) {
        ctx.save();
        ctx.translate(starCx, starCy);
        ctx.rotate(sq * Math.PI / 4);
        ctx.beginPath();
        ctx.rect(
          -starR / 1.6,
          -starR / 1.6,
          starR * 2 / 1.6,
          starR * 2 / 1.6
        );
        ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = colors.secondary ?? "#b8860b";
      const eStars = [
        [800, 310, 18],
        [1050, 280, 14],
        [860, 490, 12],
        [700, 420, 10],
        [120, 680, 14],
        [200, 880, 11],
        [1070, 900, 12]
      ];
      for (const [sx, sy, sr] of eStars) {
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const a = i * Math.PI / 5 - Math.PI / 2;
          const r = i % 2 === 0 ? sr : sr * 0.42;
          i === 0 ? ctx.moveTo(sx + r * Math.cos(a), sy + r * Math.sin(a)) : ctx.lineTo(sx + r * Math.cos(a), sy + r * Math.sin(a));
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = colors.secondary ?? "#b8860b";
      ctx.lineWidth = 2;
      for (let bx = 80; bx < 1140; bx += 38) {
        const t = bx / 1140 * Math.PI * 28;
        ctx.beginPath();
        ctx.arc(bx + 19, 278 + 8 * Math.sin(t), 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(bx + 19, 1082 + 6 * Math.sin(t + 1), 5, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else if (resolvedType === "victory") {
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = colors.accent;
      const doveX = 900;
      const doveY = 450;
      ctx.beginPath();
      ctx.ellipse(doveX, doveY, 55, 28, -Math.PI / 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(doveX - 20, doveY);
      ctx.bezierCurveTo(
        doveX - 80,
        doveY - 80,
        doveX - 140,
        doveY - 60,
        doveX - 140,
        doveY + 20
      );
      ctx.bezierCurveTo(
        doveX - 100,
        doveY - 10,
        doveX - 50,
        doveY + 10,
        doveX - 20,
        doveY
      );
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(doveX + 20, doveY);
      ctx.bezierCurveTo(
        doveX + 80,
        doveY - 80,
        doveX + 140,
        doveY - 60,
        doveX + 140,
        doveY + 20
      );
      ctx.bezierCurveTo(
        doveX + 100,
        doveY - 10,
        doveX + 50,
        doveY + 10,
        doveX + 20,
        doveY
      );
      ctx.fill();
      ctx.globalAlpha = 0.14;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      const lwX = 200;
      const lwY = 650;
      ctx.beginPath();
      ctx.arc(lwX, lwY, 80, Math.PI * 0.9, Math.PI * 2.1);
      ctx.stroke();
      for (let li = 0; li < 10; li++) {
        const la = Math.PI * 0.9 + li / 9 * Math.PI * 1.2;
        ctx.save();
        ctx.translate(lwX + 80 * Math.cos(la), lwY + 80 * Math.sin(la));
        ctx.rotate(la);
        ctx.beginPath();
        ctx.ellipse(0, -10, 7, 14, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.moveTo(550, 450);
      ctx.bezierCurveTo(600, 420, 700, 430, 750, 460);
      ctx.bezierCurveTo(800, 490, 820, 550, 800, 620);
      ctx.bezierCurveTo(780, 690, 750, 750, 700, 800);
      ctx.bezierCurveTo(660, 840, 600, 850, 560, 820);
      ctx.bezierCurveTo(510, 790, 500, 730, 510, 680);
      ctx.bezierCurveTo(520, 630, 530, 570, 540, 530);
      ctx.bezierCurveTo(545, 490, 540, 460, 550, 450);
      ctx.fill();
      ctx.strokeStyle = colors.secondary ?? "#c62828";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 18; i++) {
        const a = i * Math.PI * 2 / 18;
        ctx.beginPath();
        ctx.moveTo(1050 + 35 * Math.cos(a), 900 + 35 * Math.sin(a));
        ctx.lineTo(1050 + 100 * Math.cos(a), 900 + 100 * Math.sin(a));
        ctx.stroke();
      }
    } else if (resolvedType === "newyear") {
      const fwPositions = [
        [200, 380, 70, colors.accent],
        [1e3, 320, 80, colors.secondary ?? "#e65100"],
        [160, 820, 60, colors.secondary ?? "#e65100"],
        [1040, 780, 75, colors.accent]
      ];
      for (const [fx, fy, fr, fc] of fwPositions) {
        ctx.fillStyle = fc;
        ctx.globalAlpha = 0.18;
        for (let i = 0; i < 12; i++) {
          const a = i * Math.PI * 2 / 12;
          ctx.beginPath();
          ctx.moveTo(fx, fy);
          ctx.lineTo(fx + fr * Math.cos(a), fy + fr * Math.sin(a));
          ctx.lineWidth = 2;
          ctx.strokeStyle = fc;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(
            fx + fr * Math.cos(a),
            fy + fr * Math.sin(a),
            5,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    } else if (resolvedType === "anniversary") {
      ctx.globalAlpha = 0.13;
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.roundRect(820, 620, 250, 50, 6);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(840, 570, 210, 52, 6);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(860, 520, 170, 52, 6);
      ctx.fill();
      ctx.fillStyle = colors.secondary ?? "#b8860b";
      ctx.globalAlpha = 0.2;
      const candlePositions = [900, 950, 1e3];
      for (const cx of candlePositions) {
        ctx.fillRect(cx - 5, 490, 10, 32);
        ctx.beginPath();
        ctx.arc(cx, 488, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(200, 520, 50, Math.PI, 2 * Math.PI);
      ctx.lineTo(250, 600);
      ctx.lineTo(150, 600);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(175, 600);
      ctx.lineTo(225, 600);
      ctx.lineTo(225, 640);
      ctx.lineTo(175, 640);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(155, 640);
      ctx.lineTo(245, 640);
      ctx.stroke();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      for (let ri = 0; ri < 4; ri++) {
        ctx.beginPath();
        ctx.arc(600, 680, 160 - ri * 28, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.06;
      for (let sp = 0; sp < 24; sp++) {
        const a = sp * Math.PI * 2 / 24;
        ctx.beginPath();
        ctx.moveTo(600 + 35 * Math.cos(a), 680 + 35 * Math.sin(a));
        ctx.lineTo(600 + 155 * Math.cos(a), 680 + 155 * Math.sin(a));
        ctx.stroke();
      }
      ctx.globalAlpha = 0.2;
      const confettiColors = [
        colors.accent,
        colors.secondary ?? "#b8860b",
        "#c62828",
        "#1b5e20"
      ];
      for (let ci = 0; ci < 30; ci++) {
        const confX = 80 + ci * 37 % 1040;
        const confY = 310 + ci * 23 % 700;
        ctx.fillStyle = confettiColors[ci % confettiColors.length];
        ctx.save();
        ctx.translate(confX, confY);
        ctx.rotate(ci * 0.4 % Math.PI);
        ctx.fillRect(-5, -2, 10, 4);
        ctx.restore();
      }
    } else if (resolvedType === "problem") {
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 12;
      ctx.lineCap = "round";
      for (let wa = 0; wa < 3; wa++) {
        ctx.beginPath();
        ctx.arc(600, 780, 60 + wa * 70, Math.PI + 0.4, 2 * Math.PI - 0.4);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = colors.secondary ?? "#0d47a1";
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(550, 620);
      ctx.lineTo(650, 720);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(650, 620);
      ctx.lineTo(550, 720);
      ctx.stroke();
      ctx.lineCap = "butt";
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      const gearCx = 950;
      const gearCy = 500;
      const gOuter = 120;
      const gInner = 80;
      const gTeeth = 10;
      ctx.beginPath();
      for (let i = 0; i < gTeeth * 2; i++) {
        const a = i * Math.PI / gTeeth;
        const r = i % 2 === 0 ? gOuter : gInner;
        const px = gearCx + r * Math.cos(a);
        const py = gearCy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(gearCx, gearCy, 35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.08;
      const cStep = 70;
      for (let gx = 80; gx < 500; gx += cStep) {
        for (let gy = 310; gy < 1050; gy += cStep) {
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(gx + cStep * 0.55, gy);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(gx, gy + cStep * 0.55);
          ctx.stroke();
        }
      }
    } else if (resolvedType === "general") {
      ctx.globalAlpha = 0.15;
      const genFlowerSites = [
        [200, 420],
        [1e3, 420],
        [180, 920],
        [1010, 920],
        [600, 370]
      ];
      const petalColors = [
        colors.accent,
        colors.secondary ?? "#4527a0",
        "#880e4f"
      ];
      for (const [flx, fly] of genFlowerSites) {
        for (let p = 0; p < 6; p++) {
          const a = p * Math.PI / 3;
          ctx.fillStyle = petalColors[p % petalColors.length];
          ctx.beginPath();
          ctx.ellipse(
            flx + 22 * Math.cos(a),
            fly + 22 * Math.sin(a),
            10,
            18,
            a,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
        ctx.fillStyle = "#fdd835";
        ctx.globalAlpha = 0.18;
        ctx.beginPath();
        ctx.arc(flx, fly, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.15;
      }
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.1;
      for (let wy = 310; wy < 1050; wy += 80) {
        ctx.beginPath();
        for (let wx = 60; wx < 1140; wx += 4) {
          const waveY = wy + 16 * Math.sin(wx / 1140 * Math.PI * 6);
          wx === 60 ? ctx.moveTo(wx, waveY) : ctx.lineTo(wx, waveY);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = colors.secondary ?? "#4527a0";
      const gStars = [
        [120, 700],
        [1080, 700],
        [400, 380],
        [800, 380]
      ];
      for (const [sx, sy] of gStars) {
        for (let i = 0; i < 10; i++) {
          const a = i * Math.PI / 5 - Math.PI / 2;
          const r = i % 2 === 0 ? 22 : 9;
          if (i === 0) {
            ctx.beginPath();
            ctx.moveTo(sx + r * Math.cos(a), sy + r * Math.sin(a));
          } else {
            ctx.lineTo(sx + r * Math.cos(a), sy + r * Math.sin(a));
          }
          if (i === 9) {
            ctx.closePath();
            ctx.fill();
          }
        }
      }
    } else {
      ctx.globalAlpha = 0.04;
      for (let i = -1200; i < 2400; i += 60) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 1200, 1200);
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 20;
        ctx.stroke();
      }
    }
    ctx.restore();
  }
  async function generatePoster() {
    if (!announcementText.trim()) {
      ue.error("অনুগ্রহ করে ঘোষণার বিষয়বস্তু লিখুন");
      return;
    }
    setIsGenerating(true);
    setGeneratedUrl(null);
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    const colors = getPosterColors(posterType);
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 1200);
    bgGrad.addColorStop(0, colors.from);
    bgGrad.addColorStop(0.45, blendColors(colors.from, colors.to));
    bgGrad.addColorStop(1, colors.to);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 1200);
    const radialGrad = ctx.createRadialGradient(600, 600, 0, 600, 600, 700);
    radialGrad.addColorStop(0, "rgba(255,255,255,0.22)");
    radialGrad.addColorStop(0.6, "rgba(255,255,255,0.06)");
    radialGrad.addColorStop(1, "rgba(0,0,0,0.04)");
    ctx.fillStyle = radialGrad;
    ctx.fillRect(0, 0, 1200, 1200);
    drawDecorations(ctx, posterType, colors);
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 6;
    ctx.globalAlpha = 0.6;
    ctx.strokeRect(24, 24, 1152, 1152);
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.3;
    ctx.strokeRect(36, 36, 1128, 1128);
    ctx.globalAlpha = 1;
    function drawCornerOrnament(x, y, angle) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(60, 0);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 60);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI / 2);
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
    }
    drawCornerOrnament(24, 24, 0);
    drawCornerOrnament(1176, 24, Math.PI / 2);
    drawCornerOrnament(1176, 1176, Math.PI);
    drawCornerOrnament(24, 1176, -Math.PI / 2);
    ctx.globalAlpha = 1;
    const headerGrad = ctx.createLinearGradient(0, 0, 1200, 0);
    headerGrad.addColorStop(0, "rgba(255,255,255,0.5)");
    headerGrad.addColorStop(0.5, "rgba(255,255,255,0.65)");
    headerGrad.addColorStop(1, "rgba(255,255,255,0.5)");
    ctx.fillStyle = headerGrad;
    ctx.fillRect(60, 60, 1080, 180);
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    ctx.strokeRect(60, 60, 1080, 180);
    ctx.globalAlpha = 1;
    const logoX = 90;
    const logoY = 75;
    const logoSize = 150;
    let logoLoaded = false;
    async function drawLogo() {
      if (settings.logo) {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(
              logoX + logoSize / 2,
              logoY + logoSize / 2,
              logoSize / 2,
              0,
              Math.PI * 2
            );
            ctx.clip();
            ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
            ctx.restore();
            logoLoaded = true;
            resolve();
          };
          img.onerror = () => resolve();
          img.src = settings.logo;
        });
      }
    }
    await drawLogo();
    if (!logoLoaded) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        logoX + logoSize / 2,
        logoY + logoSize / 2,
        logoSize / 2,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = colors.accent;
      ctx.globalAlpha = 0.15;
      ctx.fill();
      ctx.restore();
      ctx.fillStyle = colors.accent;
      ctx.font = `bold 56px 'Noto Sans Bengali', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("নব", logoX + logoSize / 2, logoY + logoSize / 2);
    }
    const orgName = settings.name || "নওশীন ব্রডব্যান্ড ইন্টারনেট";
    const orgAddress = settings.address || "";
    const textStartX = logoX + logoSize + 28;
    const textAreaWidth = 1200 - textStartX - 90;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.font = `bold 52px 'Noto Sans Bengali', sans-serif`;
    ctx.fillStyle = colors.textDark;
    ctx.shadowColor = "rgba(0,0,0,0.15)";
    ctx.shadowBlur = 6;
    const maxW = textAreaWidth;
    const words = orgName.split(" ");
    let line = "";
    let lineY = 82;
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, textStartX, lineY);
        line = word;
        lineY += 58;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, textStartX, lineY);
    if (orgAddress) {
      ctx.font = `400 28px 'Noto Sans Bengali', sans-serif`;
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.shadowBlur = 3;
      ctx.fillText(orgAddress, textStartX, lineY + 64);
    }
    ctx.shadowBlur = 0;
    const dividerY = 260;
    const divGrad = ctx.createLinearGradient(60, 0, 1140, 0);
    divGrad.addColorStop(0, "transparent");
    divGrad.addColorStop(0.2, colors.accent);
    divGrad.addColorStop(0.8, colors.accent);
    divGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(60, dividerY);
    ctx.lineTo(1140, dividerY);
    ctx.stroke();
    ctx.globalAlpha = 1;
    const typeLabel = getPosterLabel(posterType);
    ctx.font = `bold 52px 'Noto Sans Bengali', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = colors.textDark;
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 8;
    ctx.fillText(typeLabel, 600, 282);
    ctx.shadowBlur = 0;
    const symbol = getPosterSymbol(posterType);
    ctx.font = "38px sans-serif";
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(symbol, 600, 352);
    const contentGrad = ctx.createLinearGradient(60, 440, 1140, 1050);
    contentGrad.addColorStop(0, "rgba(255,255,255,0.55)");
    contentGrad.addColorStop(1, "rgba(255,255,255,0.35)");
    ctx.fillStyle = contentGrad;
    ctx.beginPath();
    ctx.roundRect(70, 430, 1060, 630, 24);
    ctx.fill();
    ctx.strokeStyle = `${colors.accent}66`;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.7;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#212121";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.shadowColor = "rgba(0,0,0,0.1)";
    ctx.shadowBlur = 4;
    const maxTextWidth = 980;
    const lineHeight = 72;
    const fontSize = announcementText.length > 100 ? 40 : announcementText.length > 60 ? 48 : 56;
    ctx.font = `bold ${fontSize}px 'Noto Sans Bengali', sans-serif`;
    const annWords = announcementText.split(" ");
    const lines = [];
    let curLine = "";
    for (const w of annWords) {
      const test = curLine ? `${curLine} ${w}` : w;
      if (ctx.measureText(test).width > maxTextWidth && curLine) {
        lines.push(curLine);
        curLine = w;
      } else {
        curLine = test;
      }
    }
    if (curLine) lines.push(curLine);
    const totalTextH = lines.length * lineHeight;
    const startTextY = 430 + (630 - totalTextH) / 2 - 20;
    for (const [i, l] of lines.entries()) {
      ctx.fillText(l, 600, startTextY + i * lineHeight);
    }
    ctx.shadowBlur = 0;
    const footerDivY = 1090;
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(80, footerDivY);
    ctx.lineTo(1120, footerDivY);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.font = `500 26px 'Noto Sans Bengali', sans-serif`;
    ctx.fillStyle = colors.textDark;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 0.8;
    ctx.fillText(orgName, 600, 1118);
    ctx.globalAlpha = 1;
    if (settings.whatsapp) {
      ctx.font = `400 20px 'Noto Sans Bengali', sans-serif`;
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillText(`WhatsApp: ${settings.whatsapp}`, 600, 1146);
    }
    ctx.font = `400 17px 'Noto Sans Bengali', sans-serif`;
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      "তত্ত্বাবধানে: মুহাম্মদ মনিরুজ্জামান  | প্রযুক্তিগত সহযোগিতায়: মুহাম্মদ উজ্জল মিয়া",
      600,
      1172
    );
    setGeneratedUrl(canvas.toDataURL("image/png"));
    setIsGenerating(false);
  }
  function downloadPoster() {
    if (!generatedUrl) return;
    const a = document.createElement("a");
    a.href = generatedUrl;
    a.download = `poster-${Date.now()}.png`;
    a.click();
  }
  function handleFacebookPost() {
    if (!generatedUrl || !facebookUrl) return;
    downloadPoster();
    setTimeout(() => {
      window.open(facebookUrl, "_blank", "noopener,noreferrer");
      ue.success(
        "পোস্টার ডাউনলোড হয়েছে। ফেসবুক পেজ খুলছে — ছবিটি আপলোড করে পোস্ট করুন।",
        { duration: 6e3 }
      );
    }, 500);
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 48, className: "text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "এই সেকশন শুধুমাত্র এডমিনদের জন্য।" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-4 md:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, style: { display: "none" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 24, className: "text-primary" }),
        "সোশ্যাল মিডিয়া পোস্ট",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-pink-300 text-pink-700 bg-pink-50", children: "বাহ্যিক" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "১২০০×১২০০ পিক্সেলের প্রফেশনাল পোস্টার তৈরি করুন" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 16, className: "text-primary" }),
            "পোস্টার তৈরির ফর্ম"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "পোস্টারের ধরন" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: posterType,
                  onValueChange: (v) => setPosterType(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "socialmedia.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      Object.entries(BUILTIN_LABELS).map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: key, children: label }, key)),
                      customCategories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-1" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs text-muted-foreground font-medium", children: "কাস্টম ক্যাটাগরি" }),
                        customCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat.id, children: cat.name }, cat.id))
                      ] })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ঘোষণার বিষয়বস্তু" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  "data-ocid": "socialmedia.textarea",
                  placeholder: "এখানে আপনার ঘোষণা বা নোটিশ লিখুন...",
                  value: announcementText,
                  onChange: (e) => setAnnouncementText(e.target.value),
                  rows: 6,
                  className: "resize-none"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
                announcementText.length,
                " অক্ষর"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "socialmedia.primary_button",
                  className: "flex-1 gap-2",
                  onClick: generatePoster,
                  disabled: isGenerating,
                  children: [
                    isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 16 }),
                    isGenerating ? "তৈরি হচ্ছে..." : "Generate"
                  ]
                }
              ),
              generatedUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "socialmedia.secondary_button",
                  variant: "outline",
                  onClick: () => {
                    setGeneratedUrl(null);
                    setAnnouncementText("");
                  },
                  className: "gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16 }),
                    "পুনরায়"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { size: 16, className: "text-blue-500" }),
            "ফেসবুক সেটআপ"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ফেসবুক পেজ/প্রোফাইল লিংক" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "socialmedia.input",
                    placeholder: "https://facebook.com/yourpage",
                    value: facebookUrl,
                    onChange: (e) => setFacebookUrl(e.target.value),
                    type: "url"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "socialmedia.save_button",
                    variant: "outline",
                    onClick: saveFacebookUrl,
                    className: fbSaved ? "border-green-500 text-green-600" : "",
                    children: fbSaved ? "সেভ ✓" : "সেভ"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "socialmedia.facebook_button",
                className: "w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white",
                disabled: !generatedUrl || !facebookUrl,
                onClick: handleFacebookPost,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { size: 16 }),
                  "ফেসবুকে পোস্ট করুন"
                ]
              }
            ),
            (!generatedUrl || !facebookUrl) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: !generatedUrl ? "প্রথমে পোস্টার জেনারেট করুন" : "ফেসবুক লিংক সেভ করুন" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { size: 16, className: "text-primary" }),
            "ক্যাটাগরি ম্যানেজমেন্ট"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2", children: "ডিফল্ট ক্যাটাগরি" }),
              Object.entries(BUILTIN_LABELS).map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between px-3 py-2 rounded-md bg-muted/40 border border-border/50",
                  "data-ocid": `socialmedia.item.${Object.keys(BUILTIN_LABELS).indexOf(key) + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs shrink-0", children: "ডিফল্ট" })
                  ]
                },
                key
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2", children: "কাস্টম ক্যাটাগরি" }),
              customCategories.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-muted-foreground italic text-center py-3",
                  "data-ocid": "socialmedia.empty_state",
                  children: "কোনো কাস্টম ক্যাটাগরি নেই"
                }
              ),
              customCategories.map((cat, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 px-3 py-2 rounded-md bg-muted/40 border border-border/50",
                  "data-ocid": `socialmedia.item.${Object.keys(BUILTIN_LABELS).length + idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: cat.name,
                        onChange: (e) => updateCustomCategory(cat.id, e.target.value),
                        className: "h-7 text-sm border-0 bg-transparent p-0 focus-visible:ring-0"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        className: "h-7 w-7 p-0 text-destructive hover:text-destructive",
                        onClick: () => deleteCustomCategory(cat.id),
                        "data-ocid": `socialmedia.delete_button.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                      }
                    )
                  ]
                },
                cat.id
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "socialmedia.input",
                  placeholder: "নতুন ক্যাটাগরির নাম লিখুন",
                  value: newCategoryName,
                  onChange: (e) => setNewCategoryName(e.target.value),
                  onKeyDown: (e) => e.key === "Enter" && addCustomCategory(),
                  className: "flex-1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "socialmedia.primary_button",
                  variant: "outline",
                  onClick: addCustomCategory,
                  className: "gap-1.5 shrink-0",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
                    "যুক্ত করুন"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "পোস্টার প্রিভিউ" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: generatedUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: generatedUrl,
              alt: "Generated poster",
              className: "rounded-lg shadow-xl border border-border",
              style: {
                maxWidth: "100%",
                maxHeight: "560px",
                objectFit: "contain"
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "socialmedia.download_button",
              variant: "outline",
              className: "w-full gap-2",
              onClick: downloadPoster,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 16 }),
                "ডাউনলোড করুন (PNG)"
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border",
            style: { minHeight: "400px" },
            "data-ocid": "socialmedia.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 48, className: "text-muted-foreground mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "ফর্ম পূরণ করে Generate বাটনে ক্লিক করুন" })
            ]
          }
        ) })
      ] }) })
    ] })
  ] });
}
export {
  SocialMediaPost as default
};
