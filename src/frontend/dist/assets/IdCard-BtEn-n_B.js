import { c as createLucideIcon, r as reactExports, u as useCompanySettings, j as jsxRuntimeExports, C as CreditCard, a as Button, k as Bell, U as Users, b as ue } from "./index-CLn6Dvvh.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DgI8w_9r.js";
import { C as Checkbox } from "./checkbox-BEhiuhFU.js";
import { L as Label, I as Input } from "./label-BxkJv6hJ.js";
import { u as useLocalCustomers } from "./useLocalCustomers-CHBDXFdF.js";
import { u as usePackages } from "./useQueries-BYguM41a.js";
import { C as CircleAlert } from "./circle-alert-Js2PbrOL.js";
import { S as Search } from "./search-Cl5fy0ak.js";
import { L as LoaderCircle } from "./loader-circle-CS3__NN_.js";
import { D as Download } from "./download-CYFk_0Kp.js";
import { M as MessageCircle } from "./message-circle-CyrTOe1T.js";
import { P as Pencil, X } from "./x-CKtXnlqr.js";
import "./index-Cs78LNzb.js";
import "./check-D7UaX-Dz.js";
import "./permanentPackages-CnZQ-KNe.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$2);
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
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const KEY = "nosheen_expiry_dates_v1";
const CUSTOM_EVENT = "nosheen_expiry_changed";
function loadDates() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {
  }
  return {};
}
function saveDates(dates) {
  try {
    localStorage.setItem(KEY, JSON.stringify(dates));
  } catch (_) {
  }
}
function defaultExpiry(connectionDate) {
  const ms = Number(connectionDate / 1000000n);
  const d = new Date(ms + 30 * 24 * 60 * 60 * 1e3);
  return d.toISOString().slice(0, 10);
}
function useExpiryDates() {
  const [expiryDates, setExpiryDates] = reactExports.useState(loadDates);
  reactExports.useEffect(() => {
    function onChanged() {
      setExpiryDates(loadDates());
    }
    window.addEventListener(CUSTOM_EVENT, onChanged);
    return () => window.removeEventListener(CUSTOM_EVENT, onChanged);
  }, []);
  const getExpiryDate = reactExports.useCallback(
    (customerId, connectionDate) => {
      return expiryDates[customerId.toString()] ?? defaultExpiry(connectionDate);
    },
    [expiryDates]
  );
  const setExpiryDate = reactExports.useCallback((customerId, isoDate) => {
    setExpiryDates((prev) => {
      const next = { ...prev, [customerId.toString()]: isoDate };
      saveDates(next);
      return next;
    });
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENT));
  }, []);
  return { expiryDates, getExpiryDate, setExpiryDate };
}
const VILLAGES = [
  "বালিগাঁও",
  "ফরিদপুর",
  "কাটাইয়া",
  "পূর্ব বাজুকা",
  "পশ্চিম বাজুকা",
  "বালিগাঁও অষ্ট গ্রাম অঞ্চল",
  "বালিগাঁও লাখাই অঞ্চল"
];
const CARD_WIDTH = 360;
const CARD_HEIGHT = 227;
const SCALE = 5.61;
const CANVAS_W = Math.round(CARD_WIDTH * SCALE);
const CANVAS_H = Math.round(CARD_HEIGHT * SCALE);
const A4_W = 2480;
const A4_H = 3508;
const SCALE_A4 = 300 * (85.6 / 25.4) / 360;
function normalizeWhatsAppPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("880") && digits.length >= 12) return digits;
  if (digits.startsWith("88") && digits.length >= 12) return digits;
  if (digits.startsWith("0") && digits.length === 11) return `88${digits}`;
  if (digits.length === 10) return `880${digits}`;
  return `88${digits}`;
}
async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
async function drawFrontCard(ctx, scale, data, offsetX = 0, offsetY = 0) {
  const W = Math.round(CARD_WIDTH * scale);
  const H = Math.round(CARD_HEIGHT * scale);
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(offsetX, offsetY, W, H);
  ctx.save();
  ctx.strokeStyle = "rgba(200,220,255,0.18)";
  ctx.lineWidth = scale * 1;
  for (let i = -H; i < W + H; i += scale * 20) {
    ctx.beginPath();
    ctx.moveTo(offsetX + i, offsetY);
    ctx.lineTo(offsetX + i + H, offsetY + H);
    ctx.stroke();
  }
  ctx.restore();
  const lw = scale * 2;
  ctx.strokeStyle = "#0a2463";
  ctx.lineWidth = lw;
  ctx.strokeRect(offsetX + lw / 2, offsetY + lw / 2, W - lw, H - lw);
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = scale * 0.8;
  const gap = scale * 4;
  ctx.strokeRect(offsetX + gap, offsetY + gap, W - gap * 2, H - gap * 2);
  const cl = scale * 10;
  const cg = scale * 6;
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = scale * 2;
  ctx.beginPath();
  ctx.moveTo(offsetX + cg, offsetY + cg + cl);
  ctx.lineTo(offsetX + cg, offsetY + cg);
  ctx.lineTo(offsetX + cg + cl, offsetY + cg);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(offsetX + W - cg - cl, offsetY + cg);
  ctx.lineTo(offsetX + W - cg, offsetY + cg);
  ctx.lineTo(offsetX + W - cg, offsetY + cg + cl);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(offsetX + cg, offsetY + H - cg - cl);
  ctx.lineTo(offsetX + cg, offsetY + H - cg);
  ctx.lineTo(offsetX + cg + cl, offsetY + H - cg);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(offsetX + W - cg - cl, offsetY + H - cg);
  ctx.lineTo(offsetX + W - cg, offsetY + H - cg);
  ctx.lineTo(offsetX + W - cg, offsetY + H - cg - cl);
  ctx.stroke();
  const headerH = scale * 48;
  const grad = ctx.createLinearGradient(offsetX, offsetY, offsetX + W, offsetY);
  grad.addColorStop(0, "#0a2463");
  grad.addColorStop(1, "#1c3f8c");
  ctx.fillStyle = grad;
  ctx.fillRect(offsetX, offsetY, W, headerH);
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(offsetX, offsetY + headerH - scale * 2.5, W, scale * 2.5);
  let logoImg = null;
  if (data.logo) {
    try {
      logoImg = await loadImage(data.logo);
    } catch {
      logoImg = null;
    }
  }
  const padding = scale * 12;
  let textX = padding;
  if (logoImg) {
    const logoSize = scale * 30;
    const logoY = offsetY + (headerH - logoSize) / 2;
    const logoX = offsetX + padding;
    const cx = logoX + logoSize / 2;
    const cy = logoY + logoSize / 2;
    const r = logoSize / 2;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
    ctx.restore();
    textX = padding + logoSize + scale * 10;
  }
  ctx.save();
  ctx.shadowColor = "rgba(212,175,55,0.5)";
  ctx.shadowBlur = scale * 3;
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${scale * 11.5}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
  ctx.fillText(data.orgName, offsetX + textX, offsetY + scale * 10);
  ctx.restore();
  if (data.orgAddress) {
    ctx.save();
    ctx.fillStyle = "#c0d8f0";
    ctx.font = `${scale * 9}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
    ctx.fillText(
      data.orgAddress,
      offsetX + textX,
      offsetY + scale * 10 + scale * 14
    );
    ctx.restore();
  }
  const bodyY = headerH + scale * 10;
  const colW = (W - padding * 2 - scale * 16) / 2;
  const fields = [
    { label: "ইউজার আইডি/নেম", value: data.username, mono: false },
    { label: "সিআইডি নম্বর", value: data.cidNumber || "—", mono: true },
    { label: "মোবাইল নম্বর", value: data.phone, mono: true },
    { label: "প্যাকেজ", value: data.packageSpeed || "—", mono: false }
  ];
  fields.forEach((field, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const fx = offsetX + padding + col * (colW + scale * 16);
    const fy = offsetY + bodyY + row * scale * 36;
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(fx, fy, scale * 2.5, scale * 24);
    ctx.save();
    ctx.fillStyle = "#7a8ba0";
    ctx.font = `${scale * 7.5}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
    ctx.fillText(field.label.toUpperCase(), fx + scale * 6, fy);
    ctx.fillStyle = "#0a2463";
    ctx.font = `bold ${scale * 11}px ${field.mono ? "monospace" : "'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif"}`;
    ctx.fillText(field.value, fx + scale * 6, fy + scale * 10);
    ctx.restore();
  });
  const billBoxY = offsetY + bodyY + 2 * scale * 36 + scale * 6;
  const billBoxH = scale * 28;
  const billGrad = ctx.createLinearGradient(
    offsetX + padding,
    billBoxY,
    offsetX + W - padding,
    billBoxY + billBoxH
  );
  billGrad.addColorStop(0, "#0a2463");
  billGrad.addColorStop(1, "#1c3f8c");
  ctx.fillStyle = billGrad;
  ctx.fillRect(offsetX + padding, billBoxY, W - padding * 2, billBoxH);
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = `${scale * 9}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
  ctx.fillText(
    "মাসিক বিল",
    offsetX + padding + scale * 12,
    billBoxY + scale * 8
  );
  ctx.fillStyle = "#d4af37";
  ctx.font = `bold ${scale * 14}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
  const billText = `৳${data.monthlyFee.toLocaleString()}`;
  const billMeasure = ctx.measureText(billText);
  ctx.fillText(
    billText,
    offsetX + W - padding - scale * 12 - billMeasure.width,
    billBoxY + scale * 7
  );
  ctx.restore();
  const mgmtY = billBoxY + billBoxH + scale * 4;
  ctx.save();
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(offsetX + padding, mgmtY, W - padding * 2, scale * 0.5);
  ctx.restore();
  ctx.save();
  ctx.fillStyle = "#0a2463";
  ctx.font = `bold ${scale * 7}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
  ctx.fillText("পরিচালনায়:", offsetX + padding, mgmtY + scale * 3);
  ctx.fillStyle = "#333333";
  ctx.font = `${scale * 7}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
  ctx.fillText(
    " মুহাম্মদ মনিরুজ্জামান  |  WhatsApp: +8801607930157",
    offsetX + padding + scale * 40,
    mgmtY + scale * 3
  );
  ctx.fillStyle = "#0a2463";
  ctx.font = `bold ${scale * 7}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
  ctx.fillText("প্রযুক্তিগত সহযোগিতায়:", offsetX + padding, mgmtY + scale * 12);
  ctx.fillStyle = "#333333";
  ctx.font = `${scale * 7}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
  ctx.fillText(
    " মুহাম্মদ উজ্জল মিয়া  |  WhatsApp: +8801648388329",
    offsetX + padding + scale * 68,
    mgmtY + scale * 12
  );
  ctx.restore();
  const footerH = scale * 20;
  const footerY = offsetY + H - footerH;
  ctx.fillStyle = "#0a2463";
  ctx.fillRect(offsetX, footerY, W, footerH);
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.font = `${scale * 8}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
  const footerText = "Delta Software & Communication Limited";
  const ftMeasure = ctx.measureText(footerText);
  ctx.fillText(
    footerText,
    offsetX + (W - ftMeasure.width) / 2,
    footerY + scale * 6
  );
  ctx.restore();
  ctx.restore();
}
async function drawBackCard(ctx, scale, offsetX = 0, offsetY = 0) {
  const W = Math.round(CARD_WIDTH * scale);
  const H = Math.round(CARD_HEIGHT * scale);
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(offsetX, offsetY, W, H);
  ctx.save();
  ctx.strokeStyle = "rgba(200,220,255,0.18)";
  ctx.lineWidth = scale * 1;
  for (let i = -H; i < W + H; i += scale * 20) {
    ctx.beginPath();
    ctx.moveTo(offsetX + i, offsetY);
    ctx.lineTo(offsetX + i + H, offsetY + H);
    ctx.stroke();
  }
  ctx.restore();
  const lw = scale * 2;
  ctx.strokeStyle = "#0a2463";
  ctx.lineWidth = lw;
  ctx.strokeRect(offsetX + lw / 2, offsetY + lw / 2, W - lw, H - lw);
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = scale * 0.8;
  const gap = scale * 4;
  ctx.strokeRect(offsetX + gap, offsetY + gap, W - gap * 2, H - gap * 2);
  const cl = scale * 10;
  const cg = scale * 6;
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = scale * 2;
  ctx.beginPath();
  ctx.moveTo(offsetX + cg, offsetY + cg + cl);
  ctx.lineTo(offsetX + cg, offsetY + cg);
  ctx.lineTo(offsetX + cg + cl, offsetY + cg);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(offsetX + W - cg - cl, offsetY + cg);
  ctx.lineTo(offsetX + W - cg, offsetY + cg);
  ctx.lineTo(offsetX + W - cg, offsetY + cg + cl);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(offsetX + cg, offsetY + H - cg - cl);
  ctx.lineTo(offsetX + cg, offsetY + H - cg);
  ctx.lineTo(offsetX + cg + cl, offsetY + H - cg);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(offsetX + W - cg - cl, offsetY + H - cg);
  ctx.lineTo(offsetX + W - cg, offsetY + H - cg);
  ctx.lineTo(offsetX + W - cg, offsetY + H - cg - cl);
  ctx.stroke();
  const headerH = scale * 36;
  const grad = ctx.createLinearGradient(offsetX, offsetY, offsetX + W, offsetY);
  grad.addColorStop(0, "#0a2463");
  grad.addColorStop(1, "#1c3f8c");
  ctx.fillStyle = grad;
  ctx.fillRect(offsetX, offsetY, W, headerH);
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(offsetX, offsetY + headerH - scale * 2.5, W, scale * 2.5);
  ctx.save();
  ctx.fillStyle = "#d4af37";
  ctx.font = `bold ${scale * 12}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
  const titleText = "রিচার্জ নির্দেশিকা";
  const titleMeasure = ctx.measureText(titleText);
  ctx.fillText(
    titleText,
    offsetX + (W - titleMeasure.width) / 2,
    offsetY + scale * 11
  );
  ctx.restore();
  const padding = scale * 16;
  const bodyY = offsetY + headerH + scale * 14;
  const maxWidth = W - padding * 2;
  const lineH = scale * 19;
  const fontSize = scale * 11;
  const segments = [
    { text: "বিকাশ", color: "#E2136E", bold: true },
    { text: " অথবা ", color: "#333333", bold: false },
    { text: "নগদ", color: "#F7941D", bold: true },
    {
      text: " একাউন্ট থেকে Pay Bill অপশনে গিয়ে Delta Software and Communication Limited খুঁজে বের করে সিআইডি নম্বর এবং মোবাইল নাম্বার ব্যবহার করে আপনার নির্ধারিত প্যাকেজ অনুযায়ী রিচার্জ করুন।",
      color: "#1a2a4a",
      bold: false
    }
  ];
  const wordList = [];
  for (const seg of segments) {
    const words = seg.text.split(/(\s+)/);
    for (const w of words) {
      if (w) wordList.push({ text: w, color: seg.color, bold: seg.bold });
    }
  }
  let curX = padding;
  let curY = bodyY;
  for (const word of wordList) {
    ctx.save();
    ctx.fillStyle = word.color;
    ctx.font = `${word.bold ? "bold " : ""}${fontSize}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
    const wordW = ctx.measureText(word.text).width;
    if (word.text.trim() === "") {
      const spaceW = ctx.measureText(" ").width;
      if (curX + spaceW > padding + maxWidth) {
        curX = padding;
        curY += lineH;
      } else {
        curX += spaceW;
      }
      ctx.restore();
      continue;
    }
    if (curX + wordW > padding + maxWidth && curX > padding) {
      curX = padding;
      curY += lineH;
    }
    ctx.fillText(word.text, offsetX + curX, curY);
    curX += wordW;
    ctx.restore();
  }
  const footerH = scale * 20;
  const footerY = offsetY + H - footerH;
  ctx.fillStyle = "#0a2463";
  ctx.fillRect(offsetX, footerY, W, footerH);
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.font = `${scale * 8}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
  const footerText = "Delta Software & Communication Limited";
  const ftMeasure = ctx.measureText(footerText);
  ctx.fillText(
    footerText,
    offsetX + (W - ftMeasure.width) / 2,
    footerY + scale * 6
  );
  ctx.restore();
  ctx.restore();
}
function triggerDownload(canvas, filename) {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}
async function buildCombinedCanvas(_customer, drawData) {
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = A4_W;
  canvas.height = A4_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, A4_W, A4_H);
  const cardW = Math.round(CARD_WIDTH * SCALE_A4);
  const margin = 60;
  const gap = 40;
  await drawFrontCard(ctx, SCALE_A4, drawData, margin, margin);
  await drawBackCard(ctx, SCALE_A4, margin + cardW + gap, margin);
  return canvas;
}
function IdCard({ isAdmin = false }) {
  var _a, _b;
  const { customers } = useLocalCustomers();
  const { data: packages } = usePackages();
  const { settings } = useCompanySettings();
  const [search, setSearch] = reactExports.useState("");
  const [selectedVillages, setSelectedVillages] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [selectedCustomer, setSelectedCustomer] = reactExports.useState(null);
  const [isGenerated, setIsGenerated] = reactExports.useState(false);
  const [showSuggestions, setShowSuggestions] = reactExports.useState(false);
  const [isDownloading, setIsDownloading] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("idcard");
  const [expiredSearch, setExpiredSearch] = reactExports.useState("");
  const [editingExpiryId, setEditingExpiryId] = reactExports.useState(null);
  const [editingExpiryDate, setEditingExpiryDate] = reactExports.useState("");
  const [bulkSendIndex, setBulkSendIndex] = reactExports.useState(null);
  const [showBulkModal, setShowBulkModal] = reactExports.useState(false);
  const { getExpiryDate, setExpiryDate } = useExpiryDates();
  const cardRef = reactExports.useRef(null);
  function toggleVillage(v) {
    setSelectedVillages((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  }
  const suggestions = customers.filter((c) => {
    const villageMatch = selectedVillages.size === 0 || selectedVillages.has(c.village ?? "");
    const q = search.trim().toLowerCase();
    const searchMatch = q.length > 0 && ((c.username ?? "").toLowerCase().includes(q) || (c.carnivalId ?? "").toLowerCase().includes(q) || (c.cidNumber ?? "").toLowerCase().includes(q));
    return villageMatch && searchMatch;
  });
  function selectCustomer(c) {
    setSelectedCustomer(c);
    setIsGenerated(false);
    setSearch(c.username);
    setShowSuggestions(false);
  }
  function getPackage(c) {
    if (!packages) return null;
    return packages.find((p) => p.id === c.packageId);
  }
  function handlePrint() {
    window.print();
  }
  function buildDrawData(customer) {
    const pkg2 = getPackage(customer);
    return {
      username: customer.username,
      cidNumber: customer.cidNumber || "",
      phone: customer.phone,
      packageSpeed: (pkg2 == null ? void 0 : pkg2.speed) || "",
      monthlyFee: customer.monthlyFee ?? 0,
      orgName: settings.name || "নওশীন ব্রডব্যান্ড ইন্টারনেট",
      orgAddress: settings.address || "",
      logo: settings.logo
    };
  }
  function buildShareMessage(customer) {
    const pkg2 = getPackage(customer);
    return `সম্মানিত গ্রাহক, আপনার ওয়াইফাই এর রিচার্জের মেয়াদ শেষ হয়ে গেছে।
আপনার সংযোগটি সচল রাখতে বিকাশ অথবা নগদ একাউন্ট থেকে Pay Bill অপশনে গিয়ে Delta Software and Communication Limited খুঁজে বের করুন এবং আপনার সিআইডি নম্বর ${customer.cidNumber || ""} এবং মোবাইল নম্বর ${customer.phone} ব্যবহার করে আজই রিচার্জ করুন।
আপনার প্যাকেজটি ${(pkg2 == null ? void 0 : pkg2.speed) || ""} এমবিপিএস এবং মাসিক বিল ${customer.monthlyFee ?? 0} টাকা।`;
  }
  function handleGenerate() {
    if (!selectedCustomer) return;
    setIsGenerated(true);
    const history = JSON.parse(localStorage.getItem("idcard_history") || "[]");
    history.unshift({
      customerId: selectedCustomer.id.toString(),
      username: selectedCustomer.username,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    localStorage.setItem(
      "idcard_history",
      JSON.stringify(history.slice(0, 50))
    );
    ue.success(`${selectedCustomer.username} এর আইডি কার্ড সেভ হয়েছে`);
  }
  async function downloadFront() {
    if (!selectedCustomer) return;
    setIsDownloading(true);
    try {
      await document.fonts.ready;
      const canvas = document.createElement("canvas");
      canvas.width = CANVAS_W;
      canvas.height = CANVAS_H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const data = buildDrawData(selectedCustomer);
      await drawFrontCard(ctx, SCALE, data, 0, 0);
      triggerDownload(canvas, `${selectedCustomer.username}_front.png`);
    } finally {
      setIsDownloading(false);
    }
  }
  async function downloadBack() {
    if (!selectedCustomer) return;
    setIsDownloading(true);
    try {
      await document.fonts.ready;
      const canvas = document.createElement("canvas");
      canvas.width = CANVAS_W;
      canvas.height = CANVAS_H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      await drawBackCard(ctx, SCALE, 0, 0);
      triggerDownload(canvas, `${selectedCustomer.username}_back.png`);
    } finally {
      setIsDownloading(false);
    }
  }
  async function downloadCombinedA4() {
    if (!selectedCustomer) return;
    setIsDownloading(true);
    try {
      const data = buildDrawData(selectedCustomer);
      const canvas = await buildCombinedCanvas(selectedCustomer, data);
      triggerDownload(canvas, `${selectedCustomer.username}_A4.png`);
    } finally {
      setIsDownloading(false);
    }
  }
  async function downloadPDF() {
    if (!selectedCustomer) return;
    setIsDownloading(true);
    try {
      const data = buildDrawData(selectedCustomer);
      const canvas = await buildCombinedCanvas(selectedCustomer, data);
      const dataUrl = canvas.toDataURL("image/png");
      const win = window.open("", "_blank");
      if (win) {
        win.document.write(
          `<html><head><title>${selectedCustomer.username} আইডি কার্ড</title><style>body{margin:0;padding:0;}img{max-width:100%;display:block;}</style></head><body><img src="${dataUrl}" /></body></html>`
        );
        win.document.close();
        win.onload = () => {
          win.print();
        };
      }
    } finally {
      setIsDownloading(false);
    }
  }
  async function shareWhatsApp() {
    if (!selectedCustomer) return;
    const message = buildShareMessage(selectedCustomer);
    const normalizedPhone = normalizeWhatsAppPhone(selectedCustomer.phone);
    const waUrl = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  }
  async function shareImo() {
    if (!selectedCustomer) return;
    const message = buildShareMessage(selectedCustomer);
    const waPhone = normalizeWhatsAppPhone(selectedCustomer.phone);
    try {
      await navigator.clipboard.writeText(message);
      ue.success("মেসেজ কপি হয়েছে, ইমোতে পেস্ট করুন");
    } catch {
      ue.error("ক্লিপবোর্ডে কপি করা যায়নি");
    }
    const imoUrl = `imo://chat?phone=${waPhone}`;
    window.open(imoUrl, "_blank", "noopener,noreferrer");
  }
  function shareSMS() {
    if (!selectedCustomer) return;
    const message = buildShareMessage(selectedCustomer);
    const phone = selectedCustomer.phone.replace(/\D/g, "");
    const smsUrl = `sms:${phone}?body=${encodeURIComponent(message)}`;
    window.open(smsUrl);
  }
  const pkg = selectedCustomer ? getPackage(selectedCustomer) : null;
  const orgName = settings.name || "নওশীন ব্রডব্যান্ড ইন্টারনেট";
  const orgAddress = settings.address || "";
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const allExpiredCustomers = customers.filter((c) => {
    const expiry = new Date(getExpiryDate(c.id, c.connectionDate));
    expiry.setHours(0, 0, 0, 0);
    return expiry < today;
  }).sort((a, b) => {
    const da = new Date(getExpiryDate(a.id, a.connectionDate)).getTime();
    const db = new Date(getExpiryDate(b.id, b.connectionDate)).getTime();
    return da - db;
  });
  const filteredExpiredCustomers = allExpiredCustomers.filter((c) => {
    const q = expiredSearch.trim().toLowerCase();
    if (!q) return true;
    return (c.username ?? "").toLowerCase().includes(q) || (c.cidNumber ?? "").toLowerCase().includes(q) || (c.phone ?? "").includes(q);
  });
  function buildExpiredMessage(c) {
    const p = getPackage(c);
    return `সম্মানিত গ্রাহক, আপনার ওয়াইফাই এর রিচার্জের মেয়াদ শেষ হয়ে গেছে।
আপনার সংযোগটি সচল রাখতে বিকাশ অথবা নগদ একাউন্ট থেকে Pay Bill অপশনে গিয়ে Delta Software and Communication Limited খুঁজে বের করুন এবং আপনার সিআইডি নম্বর ${c.cidNumber || ""} এবং মোবাইল নম্বর ${c.phone} ব্যবহার করে আজই রিচার্জ করুন।
আপনার প্যাকেজটি ${(p == null ? void 0 : p.speed) || ""} এমবিপিএস এবং মাসিক বিল ${c.monthlyFee ?? 0} টাকা।`;
  }
  function openExpiredWhatsApp(c) {
    const phone = normalizeWhatsAppPhone(c.phone);
    const msg = buildExpiredMessage(c);
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }
  function openExpiredSMS(c) {
    const phone = c.phone.replace(/\D/g, "");
    const msg = buildExpiredMessage(c);
    window.open(`sms:${phone}?body=${encodeURIComponent(msg)}`, "_blank");
  }
  function startBulkSend() {
    if (filteredExpiredCustomers.length === 0) return;
    setBulkSendIndex(0);
    setShowBulkModal(true);
    openExpiredWhatsApp(filteredExpiredCustomers[0]);
  }
  function nextBulkSend() {
    if (bulkSendIndex === null) return;
    const next = bulkSendIndex + 1;
    if (next < filteredExpiredCustomers.length) {
      setBulkSendIndex(next);
      openExpiredWhatsApp(filteredExpiredCustomers[next]);
    } else {
      setShowBulkModal(false);
      setBulkSendIndex(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media print {
          body > * { display: none !important; }
          #idcard-printable { display: block !important; }
          #idcard-printable * { display: revert !important; }
        }
        #idcard-printable { display: none; }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "idcard-printable", className: "p-8", children: selectedCustomer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8 flex-wrap justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PrintCard,
        {
          side: "front",
          customer: selectedCustomer,
          pkg,
          orgName,
          orgAddress,
          logo: settings.logo
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PrintCard,
        {
          side: "back",
          customer: selectedCustomer,
          pkg,
          orgName,
          orgAddress,
          logo: settings.logo
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "idcard.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "p-2 rounded-xl",
            style: { background: "rgba(10,36,99,0.1)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-6 h-6", style: { color: "#0a2463" } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", style: { color: "#0a2463" }, children: "আইডি কার্ড" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "গ্রাহকের আইডি কার্ড তৈরি ও ডাউনলোড করুন" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex gap-1 p-1 rounded-xl",
          style: { background: "rgba(10,36,99,0.07)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab("idcard"),
                className: "flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                style: activeTab === "idcard" ? {
                  background: "#0a2463",
                  color: "#d4af37",
                  boxShadow: "0 2px 8px rgba(10,36,99,0.25)"
                } : { color: "#0a2463" },
                "data-ocid": "idcard.tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
                  "আইডি কার্ড"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab("expired"),
                className: "flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                style: activeTab === "expired" ? {
                  background: "#dc2626",
                  color: "#ffffff",
                  boxShadow: "0 2px 8px rgba(220,38,38,0.25)"
                } : { color: "#dc2626" },
                "data-ocid": "idcard.expired.tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" }),
                  "মেয়াদ উত্তীর্ণ গ্রাহক",
                  allExpiredCustomers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-bold px-1.5 py-0.5 rounded-full",
                      style: activeTab === "expired" ? { background: "rgba(255,255,255,0.25)", color: "#fff" } : { background: "#dc2626", color: "#fff" },
                      children: allExpiredCustomers.length
                    }
                  )
                ]
              }
            )
          ]
        }
      ),
      activeTab === "idcard" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "shadow-card border-border",
            "data-ocid": "idcard.filter.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "গ্রাম ফিল্টার" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: VILLAGES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    id: `idcard-village-${v}`,
                    checked: selectedVillages.has(v),
                    onCheckedChange: () => toggleVillage(v),
                    "data-ocid": "idcard.filter.checkbox"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: `idcard-village-${v}`,
                    className: "text-sm cursor-pointer",
                    children: v
                  }
                )
              ] }, v)) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "pl-9",
                placeholder: "নাম, কার্নিভাল আইডি বা সিআইডি নম্বর দিয়ে সার্চ করুন...",
                value: search,
                onChange: (e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                  if (!e.target.value.trim()) {
                    setSelectedCustomer(null);
                    setIsGenerated(false);
                  }
                },
                onFocus: () => setShowSuggestions(true),
                onBlur: () => setTimeout(() => setShowSuggestions(false), 150),
                "data-ocid": "idcard.search_input"
              }
            )
          ] }),
          showSuggestions && suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-full left-0 right-0 z-50 mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden", children: suggestions.slice(0, 8).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "w-full text-left px-4 py-2.5 hover:bg-muted/50 transition-colors text-sm flex items-center justify-between",
              onMouseDown: () => selectCustomer(c),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: c.username }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: c.cidNumber || c.carnivalId })
              ]
            },
            c.id.toString()
          )) })
        ] }),
        selectedCustomer ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          !isGenerated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-10 gap-4",
              "data-ocid": "idcard.generate.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "p-4 rounded-full",
                    style: { background: "rgba(10,36,99,0.08)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CreditCard,
                      {
                        className: "w-10 h-10",
                        style: { color: "#0a2463" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-semibold text-sm",
                      style: { color: "#0a2463" },
                      children: selectedCustomer.username
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "আইডি কার্ড জেনারেট করতে নিচের বাটনে ক্লিক করুন" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: handleGenerate,
                    size: "lg",
                    className: "gap-2 font-bold px-8 py-3 text-base",
                    style: {
                      background: "linear-gradient(135deg, #0a2463, #1c3f8c)",
                      color: "#d4af37",
                      boxShadow: "0 4px 16px rgba(10,36,99,0.3)"
                    },
                    "data-ocid": "idcard.primary_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5" }),
                      "Generate আইডি কার্ড"
                    ]
                  }
                )
              ]
            }
          ),
          isGenerated && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: cardRef, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h3",
                {
                  className: "text-sm font-semibold",
                  style: { color: "#0a2463" },
                  children: [
                    selectedCustomer.username,
                    " এর আইডি কার্ড"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: downloadFront,
                    disabled: isDownloading,
                    variant: "outline",
                    size: "sm",
                    className: "gap-1.5",
                    "data-ocid": "idcard.front.button",
                    children: [
                      isDownloading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                      "ফ্রন্ট ডাউনলোড"
                    ]
                  }
                ),
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: downloadBack,
                    disabled: isDownloading,
                    variant: "outline",
                    size: "sm",
                    className: "gap-1.5",
                    "data-ocid": "idcard.back.button",
                    children: [
                      isDownloading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                      "ব্যাক ডাউনলোড"
                    ]
                  }
                ),
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: downloadCombinedA4,
                    disabled: isDownloading,
                    size: "sm",
                    className: "gap-1.5 font-semibold",
                    style: {
                      background: "linear-gradient(135deg, #0a2463, #1c3f8c)",
                      color: "#d4af37"
                    },
                    "data-ocid": "idcard.a4.button",
                    children: [
                      isDownloading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5" }),
                      "A4 একসাথে ডাউনলোড"
                    ]
                  }
                ),
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: downloadPDF,
                    disabled: isDownloading,
                    size: "sm",
                    className: "gap-1.5 font-semibold",
                    style: { background: "#c0392b", color: "#ffffff" },
                    "data-ocid": "idcard.pdf.button",
                    children: [
                      isDownloading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                      "PDF ডাউনলোড"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: handlePrint,
                    size: "sm",
                    className: "gap-1.5",
                    style: { background: "#0a2463" },
                    "data-ocid": "idcard.print.button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-3.5 h-3.5" }),
                      "প্রিন্ট করুন"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-6 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                NIDCardFront,
                {
                  customer: selectedCustomer,
                  pkg,
                  orgName,
                  orgAddress,
                  logo: settings.logo
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(NIDCardBack, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "border-border shadow-card",
                "data-ocid": "idcard.info.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    CardTitle,
                    {
                      className: "text-sm font-semibold flex items-center gap-2",
                      style: { color: "#0a2463" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
                        "গ্রাহকের তথ্য ও যোগাযোগ"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CustomerInfoRow,
                        {
                          label: "নাম",
                          value: selectedCustomer.username
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CustomerInfoRow,
                        {
                          label: "সিআইডি নম্বর",
                          value: selectedCustomer.cidNumber || "—",
                          mono: true
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CustomerInfoRow,
                        {
                          label: "কার্নিভাল আইডি",
                          value: selectedCustomer.carnivalId || "—",
                          mono: true
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CustomerInfoRow,
                        {
                          label: "ঠিকানা",
                          value: selectedCustomer.address || selectedCustomer.village || "—"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CustomerInfoRow,
                        {
                          label: "মোবাইল নম্বর",
                          value: selectedCustomer.phone,
                          mono: true
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CustomerInfoRow,
                        {
                          label: "প্যাকেজ",
                          value: (pkg == null ? void 0 : pkg.speed) || "—"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CustomerInfoRow,
                        {
                          label: "মাসিক বিল",
                          value: `৳${selectedCustomer.monthlyFee ?? 0}`
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex sm:flex-col gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          onClick: shareWhatsApp,
                          size: "sm",
                          className: "gap-2 font-semibold text-white min-w-[120px] justify-start",
                          style: { background: "#25D366" },
                          "data-ocid": "idcard.whatsapp.button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                            "WhatsApp"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          onClick: shareImo,
                          size: "sm",
                          className: "gap-2 font-semibold text-white min-w-[120px] justify-start",
                          style: { background: "#4f46e5" },
                          "data-ocid": "idcard.imo.button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                            "ইমো (Imo)"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          onClick: shareSMS,
                          size: "sm",
                          className: "gap-2 font-semibold text-white min-w-[120px] justify-start",
                          style: { background: "#0284c7" },
                          "data-ocid": "idcard.sms.button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
                            "সিমে মেসেজ"
                          ]
                        }
                      )
                    ] })
                  ] }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "border-border shadow-card",
                style: { borderLeft: "4px solid #d4af37" },
                "data-ocid": "idcard.notification.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      CardTitle,
                      {
                        className: "text-sm font-semibold flex items-center gap-2",
                        style: { color: "#0a2463" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Bell,
                            {
                              className: "w-4 h-4",
                              style: { color: "#d4af37" }
                            }
                          ),
                          "রিচার্জ রিমাইন্ডার"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "গ্রাহককে রিচার্জের জন্য নোটিফিকেশন পাঠান" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "p-3 rounded-lg text-xs text-muted-foreground",
                      style: {
                        background: "rgba(10,36,99,0.04)",
                        border: "1px solid rgba(10,36,99,0.1)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-semibold text-xs mb-1",
                            style: { color: "#0a2463" },
                            children: "বার্তার নমুনা:"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed whitespace-pre-line", children: buildShareMessage(selectedCustomer) })
                      ]
                    }
                  ) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "প্রতিষ্ঠাতা পরিচালক:" }),
                " ",
                "মুহাম্মদ মনিরুজ্জামান | WhatsApp: +8801607930157"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "টেকনিক্যাল ম্যানেজার:" }),
                " ",
                "মুহাম্মদ উজ্জল মিয়া | WhatsApp: +8801648388329"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "border-border shadow-card",
                style: { borderLeft: "4px solid #d4af37" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CalendarDays,
                      {
                        className: "w-4 h-4",
                        style: { color: "#d4af37" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "মেয়াদ উত্তীর্ণ তারিখ" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm font-semibold",
                          style: { color: "#0a2463" },
                          children: getExpiryDate(
                            selectedCustomer.id,
                            selectedCustomer.connectionDate
                          )
                        }
                      )
                    ] })
                  ] }),
                  editingExpiryId === `card-${selectedCustomer.id}` ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "date",
                        className: "text-sm border border-border rounded px-2 py-1",
                        value: editingExpiryDate,
                        onChange: (e) => setEditingExpiryDate(e.target.value),
                        "data-ocid": "idcard.expiry.input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        style: {
                          background: "#0a2463",
                          color: "#d4af37"
                        },
                        onClick: () => {
                          if (editingExpiryDate) {
                            setExpiryDate(
                              selectedCustomer.id,
                              editingExpiryDate
                            );
                          }
                          setEditingExpiryId(null);
                        },
                        "data-ocid": "idcard.expiry.save_button",
                        children: "সেভ"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        onClick: () => setEditingExpiryId(null),
                        "data-ocid": "idcard.expiry.cancel_button",
                        children: "বাদ"
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "gap-1.5",
                      onClick: () => {
                        setEditingExpiryId(
                          `card-${selectedCustomer.id}`
                        );
                        setEditingExpiryDate(
                          getExpiryDate(
                            selectedCustomer.id,
                            selectedCustomer.connectionDate
                          )
                        );
                      },
                      "data-ocid": "idcard.expiry.edit_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }),
                        "আপডেট করুন"
                      ]
                    }
                  )
                ] }) })
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 text-center",
            "data-ocid": "idcard.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "p-5 rounded-full mb-4",
                  style: { background: "rgba(10,36,99,0.08)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CreditCard,
                    {
                      className: "w-10 h-10",
                      style: { color: "#0a2463", opacity: 0.5 }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "উপরের সার্চ বক্সে গ্রাহক খুঁজুন" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "গ্রাহকের নামে ক্লিক করলে Generate বাটন দেখাবে" })
            ]
          }
        )
      ] }),
      activeTab === "expired" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "idcard.expired.panel", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "border-red-200 shadow-card",
            style: { borderLeft: "4px solid #dc2626" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2 text-red-700", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" }),
                  "মেয়াদ উত্তীর্ণ গ্রাহক — ",
                  allExpiredCustomers.length,
                  " জন"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "যে সকল গ্রাহকের রিচার্জের মেয়াদ শেষ হয়েছে" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      className: "pl-9",
                      placeholder: "নাম, সিআইডি বা মোবাইল দিয়ে খুঁজুন...",
                      value: expiredSearch,
                      onChange: (e) => setExpiredSearch(e.target.value),
                      "data-ocid": "idcard.expired.search_input"
                    }
                  )
                ] }),
                filteredExpiredCustomers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: startBulkSend,
                    className: "gap-2 font-semibold text-white w-full sm:w-auto",
                    style: { background: "#25D366" },
                    "data-ocid": "idcard.expired.bulk_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                      "সবাইকে WhatsApp মেসেজ পাঠান (",
                      filteredExpiredCustomers.length,
                      " ",
                      "জন)"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        showBulkModal && bulkSendIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center p-4",
            style: { background: "rgba(0,0,0,0.5)" },
            "data-ocid": "idcard.expired.modal",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-2xl p-6 max-w-sm w-full space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-bold text-base",
                    style: { color: "#0a2463" },
                    children: "বাল্ক মেসেজ পাঠানো"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setShowBulkModal(false);
                      setBulkSendIndex(null);
                    },
                    className: "p-1 rounded-lg hover:bg-muted",
                    "data-ocid": "idcard.expired.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'WhatsApp স্বয়ংক্রিয়ভাবে খুলছে। মেসেজ পাঠানোর পর "পরবর্তী" ক্লিক করুন।' }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-muted/40 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold", style: { color: "#0a2463" }, children: [
                  bulkSendIndex + 1,
                  " / ",
                  filteredExpiredCustomers.length
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: (_a = filteredExpiredCustomers[bulkSendIndex]) == null ? void 0 : _a.username }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: (_b = filteredExpiredCustomers[bulkSendIndex]) == null ? void 0 : _b.phone })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "flex-1",
                    onClick: () => {
                      openExpiredWhatsApp(
                        filteredExpiredCustomers[bulkSendIndex]
                      );
                    },
                    "data-ocid": "idcard.expired.resend_button",
                    children: "আবার খুলুন"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "flex-1 font-semibold",
                    style: { background: "#0a2463", color: "#d4af37" },
                    onClick: nextBulkSend,
                    "data-ocid": "idcard.expired.confirm_button",
                    children: bulkSendIndex + 1 < filteredExpiredCustomers.length ? "পরবর্তী →" : "সম্পন্ন ✓"
                  }
                )
              ] })
            ] })
          }
        ),
        filteredExpiredCustomers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-16 text-center",
            "data-ocid": "idcard.expired.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground mb-3 opacity-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: expiredSearch ? "কোনো মিল পাওয়া যায়নি" : "কোনো মেয়াদ উত্তীর্ণ গ্রাহক নেই" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filteredExpiredCustomers.map((c, idx) => {
          const expiryDate = getExpiryDate(c.id, c.connectionDate);
          const isEditing = editingExpiryId === c.id.toString();
          const p = getPackage(c);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-border shadow-sm",
              style: { borderLeft: "3px solid #dc2626" },
              "data-ocid": `idcard.expired.item.${idx + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "text-xs font-bold px-1.5 py-0.5 rounded",
                        style: {
                          background: "rgba(220,38,38,0.1)",
                          color: "#dc2626"
                        },
                        children: [
                          "#",
                          idx + 1
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-semibold text-sm",
                        style: { color: "#0a2463" },
                        children: c.username
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "সিআইডি:",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-medium", children: c.cidNumber || "—" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "মোবাইল:",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-medium", children: c.phone })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "প্যাকেজ: ",
                      (p == null ? void 0 : p.speed) || "—",
                      " Mbps"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "বিল: ৳",
                      c.monthlyFee ?? 0
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5 text-red-500" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-red-600 font-medium", children: [
                      "মেয়াদ শেষ: ",
                      expiryDate
                    ] }),
                    isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "date",
                          className: "text-xs border border-border rounded px-1 py-0.5",
                          value: editingExpiryDate,
                          onChange: (e) => setEditingExpiryDate(e.target.value),
                          "data-ocid": "idcard.expired.input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "text-xs px-2 py-0.5 rounded font-semibold text-white",
                          style: { background: "#0a2463" },
                          onClick: () => {
                            if (editingExpiryDate) {
                              setExpiryDate(c.id, editingExpiryDate);
                            }
                            setEditingExpiryId(null);
                          },
                          "data-ocid": "idcard.expired.save_button",
                          children: "সেভ"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "text-xs px-2 py-0.5 rounded",
                          style: { background: "rgba(0,0,0,0.07)" },
                          onClick: () => setEditingExpiryId(null),
                          "data-ocid": "idcard.expired.cancel_button",
                          children: "বাদ"
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "flex items-center gap-1 text-xs px-1.5 py-0.5 rounded hover:bg-muted transition-colors",
                        onClick: () => {
                          setEditingExpiryId(c.id.toString());
                          setEditingExpiryDate(expiryDate);
                        },
                        "data-ocid": "idcard.expired.edit_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" }),
                          " আপডেট"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap sm:flex-col", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      className: "gap-1.5 text-white font-semibold text-xs",
                      style: { background: "#25D366" },
                      onClick: () => openExpiredWhatsApp(c),
                      "data-ocid": "idcard.expired.whatsapp.button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
                        "WhatsApp"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      className: "gap-1.5 text-white font-semibold text-xs",
                      style: { background: "#0284c7" },
                      onClick: () => openExpiredSMS(c),
                      "data-ocid": "idcard.expired.sms.button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5" }),
                        "SMS"
                      ]
                    }
                  )
                ] })
              ] }) })
            },
            c.id.toString()
          );
        }) })
      ] })
    ] })
  ] });
}
function CustomerInfoRow({
  label,
  value,
  mono
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "text-xs text-muted-foreground shrink-0",
        style: { minWidth: "90px" },
        children: [
          label,
          ":"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-sm font-medium",
        style: {
          color: "#0a2463",
          fontFamily: mono ? "monospace" : "inherit"
        },
        children: value
      }
    )
  ] });
}
function NIDCardFront({ customer, pkg, orgName, orgAddress, logo }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
        background: "#ffffff",
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(200,220,255,0.08) 20px, rgba(200,220,255,0.08) 21px)",
        border: "2px solid #0a2463",
        outline: "1px solid #d4af37",
        outlineOffset: "-5px",
        borderRadius: "4px",
        fontFamily: "'Noto Sans Bengali', 'SolaimanLipi', sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box",
        position: "relative"
      },
      "data-ocid": "idcard.front.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: "linear-gradient(135deg, #0a2463, #1c3f8c)",
              borderBottom: "3px solid #d4af37",
              padding: "6px 10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              minHeight: "48px",
              flexShrink: 0
            },
            children: [
              logo && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: logo,
                  alt: "লোগো",
                  style: {
                    width: "32px",
                    height: "32px",
                    objectFit: "cover",
                    flexShrink: 0,
                    borderRadius: "50%"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      color: "#ffffff",
                      fontWeight: "bold",
                      fontSize: "11px",
                      lineHeight: 1.2,
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textShadow: "0 0 8px rgba(212,175,55,0.5)"
                    },
                    children: orgName
                  }
                ),
                orgAddress && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      color: "#c0d8f0",
                      fontSize: "9px",
                      margin: "2px 0 0",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    },
                    children: orgAddress
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              flex: 1,
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "6px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "6px 16px"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(NidField, { label: "ইউজার আইডি/নেম", value: customer.username }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      NidField,
                      {
                        label: "সিআইডি নম্বর",
                        value: customer.cidNumber || "—",
                        mono: true
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(NidField, { label: "মোবাইল নম্বর", value: customer.phone, mono: true }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(NidField, { label: "প্যাকেজ", value: (pkg == null ? void 0 : pkg.speed) || "—" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    marginTop: "2px",
                    padding: "6px 12px",
                    background: "linear-gradient(135deg, #0a2463, #1c3f8c)",
                    borderRadius: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          color: "rgba(255,255,255,0.75)",
                          fontSize: "9px",
                          fontWeight: 500
                        },
                        children: "মাসিক বিল"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: { color: "#d4af37", fontWeight: "bold", fontSize: "14px" },
                        children: [
                          "৳",
                          (customer.monthlyFee ?? 0).toLocaleString()
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              padding: "4px 12px",
              borderTop: "1px solid rgba(212,175,55,0.3)",
              display: "flex",
              flexDirection: "column",
              gap: "2px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  style: {
                    fontSize: "7px",
                    color: "#4a5568",
                    margin: 0,
                    lineHeight: 1.4
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 600, color: "#0a2463" }, children: "পরিচালনায়:" }),
                    " ",
                    "মুহাম্মদ মনিরুজ্জামান  |  WhatsApp: +8801607930157"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  style: {
                    fontSize: "7px",
                    color: "#4a5568",
                    margin: 0,
                    lineHeight: 1.4
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 600, color: "#0a2463" }, children: "প্রযুক্তিগত সহযোগিতায়:" }),
                    " ",
                    "মুহাম্মদ উজ্জল মিয়া  |  WhatsApp: +8801648388329"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "#0a2463",
              padding: "4px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#ffffff", fontSize: "8px", margin: 0 }, children: "Delta Software & Communication Limited" })
          }
        )
      ]
    }
  );
}
function NIDCardBack() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
        background: "#ffffff",
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(200,220,255,0.08) 20px, rgba(200,220,255,0.08) 21px)",
        border: "2px solid #0a2463",
        outline: "1px solid #d4af37",
        outlineOffset: "-5px",
        borderRadius: "4px",
        fontFamily: "'Noto Sans Bengali', 'SolaimanLipi', sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box"
      },
      "data-ocid": "idcard.back.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "linear-gradient(135deg, #0a2463, #1c3f8c)",
              borderBottom: "3px solid #d4af37",
              padding: "6px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "36px",
              flexShrink: 0
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  color: "#d4af37",
                  fontWeight: "bold",
                  fontSize: "12px",
                  margin: 0
                },
                children: "রিচার্জ নির্দেশিকা"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              flex: 1,
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                style: {
                  color: "#1a2a4a",
                  fontSize: "11px",
                  lineHeight: 1.9,
                  margin: 0
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#E2136E", fontWeight: "bold" }, children: "বিকাশ" }),
                  " অথবা",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#F7941D", fontWeight: "bold" }, children: "নগদ" }),
                  " ",
                  "একাউন্ট থেকে ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Pay Bill" }),
                  " অপশনে গিয়ে",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Delta Software and Communication Limited" }),
                  " খুঁজে বের করে",
                  " ",
                  "সিআইডি নম্বর এবং মোবাইল নাম্বার ব্যবহার করে আপনার নির্ধারিত প্যাকেজ অনুযায়ী রিচার্জ করুন।"
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "#0a2463",
              padding: "4px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#ffffff", fontSize: "8px", margin: 0 }, children: "Delta Software & Communication Limited" })
          }
        )
      ]
    }
  );
}
function NidField({
  label,
  value,
  mono
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        borderLeft: "3px solid #d4af37",
        paddingLeft: "8px"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              color: "#7a8ba0",
              fontSize: "7.5px",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              margin: 0
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              color: "#0a2463",
              fontSize: "11px",
              fontWeight: "600",
              margin: "1px 0 0",
              fontFamily: mono ? "monospace" : "inherit"
            },
            children: value
          }
        )
      ]
    }
  );
}
function PrintCard({
  side,
  customer,
  pkg,
  orgName,
  orgAddress,
  logo
}) {
  if (side === "front") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      NIDCardFront,
      {
        customer,
        pkg,
        orgName,
        orgAddress,
        logo
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NIDCardBack, {});
}
export {
  IdCard as default
};
