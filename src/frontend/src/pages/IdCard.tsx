import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bell,
  CreditCard,
  Download,
  Loader2,
  MessageCircle,
  MessageSquare,
  Printer,
  Search,
  Star,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useCompanySettings } from "../hooks/useCompanySettings";
import { useLocalCustomers } from "../hooks/useLocalCustomers";
import { usePackages } from "../hooks/useQueries";
import type { ExtendedCustomer } from "../types/extended";

const VILLAGES = [
  "বালিগাঁও",
  "ফরিদপুর",
  "কাটাইয়া",
  "পূর্ব বাজুকা",
  "পশ্চিম বাজুকা",
  "বালিগাঁও অষ্ট গ্রাম অঞ্চল",
  "বালিগাঁও লাখাই অঞ্চল",
];

// Bangladesh NID proportions: 85.6mm × 53.98mm ≈ 1.585:1
const CARD_WIDTH = 360;
const CARD_HEIGHT = 227;

// 600 DPI scale factor
const SCALE = 5.61;
const CANVAS_W = Math.round(CARD_WIDTH * SCALE);
const CANVAS_H = Math.round(CARD_HEIGHT * SCALE);

// A4 at 300 DPI: 2480 × 3508
const A4_W = 2480;
const A4_H = 3508;
const SCALE_A4 = (300 * (85.6 / 25.4)) / 360; // ≈ 2.82

interface DrawData {
  username: string;
  cidNumber: string;
  phone: string;
  packageSpeed: string;
  monthlyFee: number;
  orgName: string;
  orgAddress: string;
  logo: string | null;
}

function normalizeWhatsAppPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("880") && digits.length >= 12) return digits;
  if (digits.startsWith("88") && digits.length >= 12) return digits;
  if (digits.startsWith("0") && digits.length === 11) return `88${digits}`;
  if (digits.length === 10) return `880${digits}`;
  return `88${digits}`;
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function drawFrontCard(
  ctx: CanvasRenderingContext2D,
  scale: number,
  data: DrawData,
  offsetX = 0,
  offsetY = 0,
) {
  const W = Math.round(CARD_WIDTH * scale);
  const H = Math.round(CARD_HEIGHT * scale);
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.textBaseline = "top";

  // White background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(offsetX, offsetY, W, H);

  // Diagonal stripe pattern
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

  // Outer navy border
  const lw = scale * 2;
  ctx.strokeStyle = "#0a2463";
  ctx.lineWidth = lw;
  ctx.strokeRect(offsetX + lw / 2, offsetY + lw / 2, W - lw, H - lw);

  // Inner gold border
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = scale * 0.8;
  const gap = scale * 4;
  ctx.strokeRect(offsetX + gap, offsetY + gap, W - gap * 2, H - gap * 2);

  // Corner bracket decorations
  const cl = scale * 10;
  const cg = scale * 6;
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = scale * 2;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(offsetX + cg, offsetY + cg + cl);
  ctx.lineTo(offsetX + cg, offsetY + cg);
  ctx.lineTo(offsetX + cg + cl, offsetY + cg);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(offsetX + W - cg - cl, offsetY + cg);
  ctx.lineTo(offsetX + W - cg, offsetY + cg);
  ctx.lineTo(offsetX + W - cg, offsetY + cg + cl);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(offsetX + cg, offsetY + H - cg - cl);
  ctx.lineTo(offsetX + cg, offsetY + H - cg);
  ctx.lineTo(offsetX + cg + cl, offsetY + H - cg);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(offsetX + W - cg - cl, offsetY + H - cg);
  ctx.lineTo(offsetX + W - cg, offsetY + H - cg);
  ctx.lineTo(offsetX + W - cg, offsetY + H - cg - cl);
  ctx.stroke();

  // Header gradient
  const headerH = scale * 48;
  const grad = ctx.createLinearGradient(offsetX, offsetY, offsetX + W, offsetY);
  grad.addColorStop(0, "#0a2463");
  grad.addColorStop(1, "#1c3f8c");
  ctx.fillStyle = grad;
  ctx.fillRect(offsetX, offsetY, W, headerH);

  // Gold bottom line of header
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(offsetX, offsetY + headerH - scale * 2.5, W, scale * 2.5);

  // Logo in header
  let logoImg: HTMLImageElement | null = null;
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
    // White circular badge behind logo
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(
      logoX + logoSize / 2,
      logoY + logoSize / 2,
      logoSize / 2 + scale * 2,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.restore();
    ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
    textX = padding + logoSize + scale * 10;
  }

  // Org name with gold shadow
  ctx.save();
  ctx.shadowColor = "rgba(212,175,55,0.5)";
  ctx.shadowBlur = scale * 3;
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${scale * 11.5}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
  ctx.fillText(data.orgName, offsetX + textX, offsetY + scale * 10);
  ctx.restore();

  // Org address
  if (data.orgAddress) {
    ctx.save();
    ctx.fillStyle = "#c0d8f0";
    ctx.font = `${scale * 9}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
    ctx.fillText(
      data.orgAddress,
      offsetX + textX,
      offsetY + scale * 10 + scale * 14,
    );
    ctx.restore();
  }

  // Body fields
  const bodyY = headerH + scale * 10;
  const colW = (W - padding * 2 - scale * 16) / 2;
  const fields = [
    { label: "ইউজার আইডি/নেম", value: data.username, mono: false },
    { label: "সিআইডি নম্বর", value: data.cidNumber || "—", mono: true },
    { label: "মোবাইল নম্বর", value: data.phone, mono: true },
    { label: "প্যাকেজ", value: data.packageSpeed || "—", mono: false },
  ];

  fields.forEach((field, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const fx = offsetX + padding + col * (colW + scale * 16);
    const fy = offsetY + bodyY + row * scale * 36;

    // Gold left accent bar
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(fx, fy, scale * 2.5, scale * 24);

    // Label
    ctx.save();
    ctx.fillStyle = "#7a8ba0";
    ctx.font = `${scale * 7.5}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
    ctx.fillText(field.label.toUpperCase(), fx + scale * 6, fy);

    // Value
    ctx.fillStyle = "#0a2463";
    ctx.font = `bold ${scale * 11}px ${
      field.mono
        ? "monospace"
        : "'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif"
    }`;
    ctx.fillText(field.value, fx + scale * 6, fy + scale * 10);
    ctx.restore();
  });

  // Monthly bill box
  const billBoxY = offsetY + bodyY + 2 * scale * 36 + scale * 6;
  const billBoxH = scale * 28;
  const billGrad = ctx.createLinearGradient(
    offsetX + padding,
    billBoxY,
    offsetX + W - padding,
    billBoxY + billBoxH,
  );
  billGrad.addColorStop(0, "#0a2463");
  billGrad.addColorStop(1, "#1c3f8c");
  ctx.fillStyle = billGrad;
  ctx.fillRect(offsetX + padding, billBoxY, W - padding * 2, billBoxH);

  // Bill label
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = `${scale * 9}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
  ctx.fillText(
    "মাসিক বিল",
    offsetX + padding + scale * 12,
    billBoxY + scale * 8,
  );

  // Bill amount in gold
  ctx.fillStyle = "#d4af37";
  ctx.font = `bold ${scale * 14}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
  const billText = `৳${data.monthlyFee.toLocaleString()}`;
  const billMeasure = ctx.measureText(billText);
  ctx.fillText(
    billText,
    offsetX + W - padding - scale * 12 - billMeasure.width,
    billBoxY + scale * 7,
  );
  ctx.restore();

  // Footer navy
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
    footerY + scale * 6,
  );
  ctx.restore();

  ctx.restore();
}

async function drawBackCard(
  ctx: CanvasRenderingContext2D,
  scale: number,
  offsetX = 0,
  offsetY = 0,
) {
  const W = Math.round(CARD_WIDTH * scale);
  const H = Math.round(CARD_HEIGHT * scale);
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.textBaseline = "top";

  // White background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(offsetX, offsetY, W, H);

  // Diagonal stripe pattern
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

  // Outer navy border
  const lw = scale * 2;
  ctx.strokeStyle = "#0a2463";
  ctx.lineWidth = lw;
  ctx.strokeRect(offsetX + lw / 2, offsetY + lw / 2, W - lw, H - lw);

  // Inner gold border
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = scale * 0.8;
  const gap = scale * 4;
  ctx.strokeRect(offsetX + gap, offsetY + gap, W - gap * 2, H - gap * 2);

  // Corner bracket decorations
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

  // Header gradient
  const headerH = scale * 36;
  const grad = ctx.createLinearGradient(offsetX, offsetY, offsetX + W, offsetY);
  grad.addColorStop(0, "#0a2463");
  grad.addColorStop(1, "#1c3f8c");
  ctx.fillStyle = grad;
  ctx.fillRect(offsetX, offsetY, W, headerH);

  // Gold bottom line of header
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(offsetX, offsetY + headerH - scale * 2.5, W, scale * 2.5);

  // Header title in gold
  ctx.save();
  ctx.fillStyle = "#d4af37";
  ctx.font = `bold ${scale * 12}px 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif`;
  const titleText = "রিচার্জ নির্দেশিকা";
  const titleMeasure = ctx.measureText(titleText);
  ctx.fillText(
    titleText,
    offsetX + (W - titleMeasure.width) / 2,
    offsetY + scale * 11,
  );
  ctx.restore();

  // Body instruction with colored words
  const padding = scale * 16;
  const bodyY = offsetY + headerH + scale * 14;
  const maxWidth = W - padding * 2;
  const lineH = scale * 19;
  const fontSize = scale * 11;

  interface Word {
    text: string;
    color: string;
    bold: boolean;
  }

  const segments = [
    { text: "বিকাশ", color: "#E2136E", bold: true },
    { text: " অথবা ", color: "#333333", bold: false },
    { text: "নগদ", color: "#F7941D", bold: true },
    {
      text: " একাউন্ট থেকে Pay Bill অপশনে গিয়ে Delta Software and Communication Limited খুঁজে বের করে সিআইডি নম্বর এবং মোবাইল নাম্বার ব্যবহার করে আপনার নির্ধারিত প্যাকেজ অনুযায়ী রিচার্জ করুন।",
      color: "#1a2a4a",
      bold: false,
    },
  ];

  const wordList: Word[] = [];
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

  // Footer navy
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
    footerY + scale * 6,
  );
  ctx.restore();

  ctx.restore();
}

function triggerDownload(canvas: HTMLCanvasElement, filename: string) {
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

async function buildCombinedCanvas(
  _customer: ExtendedCustomer,
  drawData: DrawData,
): Promise<HTMLCanvasElement> {
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

interface IdCardProps {
  isAdmin?: boolean;
}
export default function IdCard({ isAdmin = false }: IdCardProps) {
  const { customers } = useLocalCustomers();
  const { data: packages } = usePackages();
  const { settings } = useCompanySettings();
  const [search, setSearch] = useState("");
  const [selectedVillages, setSelectedVillages] = useState<Set<string>>(
    new Set(),
  );
  const [selectedCustomer, setSelectedCustomer] =
    useState<ExtendedCustomer | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  function toggleVillage(v: string) {
    setSelectedVillages((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  }

  const suggestions = customers.filter((c) => {
    const villageMatch =
      selectedVillages.size === 0 || selectedVillages.has(c.village ?? "");
    const q = search.trim().toLowerCase();
    const searchMatch =
      q.length > 0 &&
      ((c.username ?? "").toLowerCase().includes(q) ||
        (c.carnivalId ?? "").toLowerCase().includes(q) ||
        (c.cidNumber ?? "").toLowerCase().includes(q));
    return villageMatch && searchMatch;
  });

  function selectCustomer(c: ExtendedCustomer) {
    setSelectedCustomer(c);
    setIsGenerated(false);
    setSearch(c.username);
    setShowSuggestions(false);
  }

  function getPackage(c: ExtendedCustomer) {
    if (!packages) return null;
    return packages.find((p) => p.id === c.packageId);
  }

  function handlePrint() {
    window.print();
  }

  function buildDrawData(customer: ExtendedCustomer): DrawData {
    const pkg = getPackage(customer);
    return {
      username: customer.username,
      cidNumber: customer.cidNumber || "",
      phone: customer.phone,
      packageSpeed: pkg?.speed || "",
      monthlyFee: customer.monthlyFee ?? 0,
      orgName: settings.name || "নওশীন ব্রডব্যান্ড ইন্টারনেট",
      orgAddress: settings.address || "",
      logo: settings.logo,
    };
  }

  function buildShareMessage(customer: ExtendedCustomer): string {
    const pkg = getPackage(customer);
    return `সম্মানিত গ্রাহক, আপনার ওয়াইফাই এর রিচার্জের মেয়াদ শেষ হয়ে গেছে।
আপনার সংযোগটি সচল রাখতে বিকাশ অথবা নগদ একাউন্ট থেকে Pay Bill অপশনে গিয়ে Delta Software and Communication Limited খুঁজে বের করুন এবং আপনার সিআইডি নম্বর ${customer.cidNumber || ""} এবং মোবাইল নম্বর ${customer.phone} ব্যবহার করে আজই রিচার্জ করুন।
আপনার প্যাকেজটি ${pkg?.speed || ""} এমবিপিএস এবং মাসিক বিল ${customer.monthlyFee ?? 0} টাকা।`;
  }

  function handleGenerate() {
    if (!selectedCustomer) return;
    setIsGenerated(true);
    // Auto-save to localStorage history
    const history = JSON.parse(localStorage.getItem("idcard_history") || "[]");
    history.unshift({
      customerId: selectedCustomer.id.toString(),
      username: selectedCustomer.username,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(
      "idcard_history",
      JSON.stringify(history.slice(0, 50)),
    );
    toast.success(`${selectedCustomer.username} এর আইডি কার্ড সেভ হয়েছে`);
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
      // Open image in a new tab/window and trigger browser print-to-PDF
      const dataUrl = canvas.toDataURL("image/png");
      const win = window.open("", "_blank");
      if (win) {
        win.document.write(
          `<html><head><title>${selectedCustomer!.username} আইডি কার্ড</title><style>body{margin:0;padding:0;}img{max-width:100%;display:block;}</style></head><body><img src="${dataUrl}" /></body></html>`,
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
      toast.success("মেসেজ কপি হয়েছে, ইমোতে পেস্ট করুন");
    } catch {
      toast.error("ক্লিপবোর্ডে কপি করা যায়নি");
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

  return (
    <>
      <style>{`
        @media print {
          body > * { display: none !important; }
          #idcard-printable { display: block !important; }
          #idcard-printable * { display: revert !important; }
        }
        #idcard-printable { display: none; }
      `}</style>

      {/* Hidden print-only element */}
      <div id="idcard-printable" className="p-8">
        {selectedCustomer && (
          <div className="flex gap-8 flex-wrap justify-center">
            <PrintCard
              side="front"
              customer={selectedCustomer}
              pkg={pkg}
              orgName={orgName}
              orgAddress={orgAddress}
              logo={settings.logo}
            />
            <PrintCard
              side="back"
              customer={selectedCustomer}
              pkg={pkg}
              orgName={orgName}
              orgAddress={orgAddress}
              logo={settings.logo}
            />
          </div>
        )}
      </div>

      <div className="space-y-6" data-ocid="idcard.page">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-xl"
            style={{ background: "rgba(10,36,99,0.1)" }}
          >
            <CreditCard className="w-6 h-6" style={{ color: "#0a2463" }} />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: "#0a2463" }}>
              আইডি কার্ড
            </h2>
            <p className="text-xs text-muted-foreground">
              গ্রাহকের আইডি কার্ড তৈরি ও ডাউনলোড করুন
            </p>
          </div>
        </div>

        {/* Village filter */}
        <Card
          className="shadow-card border-border"
          data-ocid="idcard.filter.card"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              গ্রাম ফিল্টার
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-3">
              {VILLAGES.map((v) => (
                <div key={v} className="flex items-center gap-2">
                  <Checkbox
                    id={`idcard-village-${v}`}
                    checked={selectedVillages.has(v)}
                    onCheckedChange={() => toggleVillage(v)}
                    data-ocid="idcard.filter.checkbox"
                  />
                  <Label
                    htmlFor={`idcard-village-${v}`}
                    className="text-sm cursor-pointer"
                  >
                    {v}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="নাম, কার্নিভাল আইডি বা সিআইডি নম্বর দিয়ে সার্চ করুন..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
                if (!e.target.value.trim()) {
                  setSelectedCustomer(null);
                  setIsGenerated(false);
                }
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              data-ocid="idcard.search_input"
            />
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
              {suggestions.slice(0, 8).map((c) => (
                <button
                  key={c.id.toString()}
                  type="button"
                  className="w-full text-left px-4 py-2.5 hover:bg-muted/50 transition-colors text-sm flex items-center justify-between"
                  onMouseDown={() => selectCustomer(c)}
                >
                  <span className="font-medium">{c.username}</span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {c.cidNumber || c.carnivalId}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main content area */}
        {selectedCustomer ? (
          <div className="space-y-4">
            {/* Generate button — shown before generation */}
            {!isGenerated && (
              <div
                className="flex flex-col items-center justify-center py-10 gap-4"
                data-ocid="idcard.generate.panel"
              >
                <div
                  className="p-4 rounded-full"
                  style={{ background: "rgba(10,36,99,0.08)" }}
                >
                  <CreditCard
                    className="w-10 h-10"
                    style={{ color: "#0a2463" }}
                  />
                </div>
                <div className="text-center">
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#0a2463" }}
                  >
                    {selectedCustomer.username}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    আইডি কার্ড জেনারেট করতে নিচের বাটনে ক্লিক করুন
                  </p>
                </div>
                <Button
                  onClick={handleGenerate}
                  size="lg"
                  className="gap-2 font-bold px-8 py-3 text-base"
                  style={{
                    background: "linear-gradient(135deg, #0a2463, #1c3f8c)",
                    color: "#d4af37",
                    boxShadow: "0 4px 16px rgba(10,36,99,0.3)",
                  }}
                  data-ocid="idcard.primary_button"
                >
                  <CreditCard className="w-5 h-5" />
                  Generate আইডি কার্ড
                </Button>
              </div>
            )}

            {/* After generation: ID cards + info + notification */}
            {isGenerated && (
              <div ref={cardRef} className="space-y-4">
                {/* Download/Print toolbar */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: "#0a2463" }}
                  >
                    {selectedCustomer.username} এর আইডি কার্ড
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {isAdmin && (
                      <Button
                        onClick={downloadFront}
                        disabled={isDownloading}
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        data-ocid="idcard.front.button"
                      >
                        {isDownloading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        ফ্রন্ট ডাউনলোড
                      </Button>
                    )}
                    {isAdmin && (
                      <Button
                        onClick={downloadBack}
                        disabled={isDownloading}
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        data-ocid="idcard.back.button"
                      >
                        {isDownloading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        ব্যাক ডাউনলোড
                      </Button>
                    )}
                    {isAdmin && (
                      <Button
                        onClick={downloadCombinedA4}
                        disabled={isDownloading}
                        size="sm"
                        className="gap-1.5 font-semibold"
                        style={{
                          background:
                            "linear-gradient(135deg, #0a2463, #1c3f8c)",
                          color: "#d4af37",
                        }}
                        data-ocid="idcard.a4.button"
                      >
                        {isDownloading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Star className="w-3.5 h-3.5" />
                        )}
                        A4 একসাথে ডাউনলোড
                      </Button>
                    )}
                    {isAdmin && (
                      <Button
                        onClick={downloadPDF}
                        disabled={isDownloading}
                        size="sm"
                        className="gap-1.5 font-semibold"
                        style={{ background: "#c0392b", color: "#ffffff" }}
                        data-ocid="idcard.pdf.button"
                      >
                        {isDownloading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        PDF ডাউনলোড
                      </Button>
                    )}
                    <Button
                      onClick={handlePrint}
                      size="sm"
                      className="gap-1.5"
                      style={{ background: "#0a2463" }}
                      data-ocid="idcard.print.button"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      প্রিন্ট করুন
                    </Button>
                  </div>
                </div>

                {/* NID Cards */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  <NIDCardFront
                    customer={selectedCustomer}
                    pkg={pkg}
                    orgName={orgName}
                    orgAddress={orgAddress}
                    logo={settings.logo}
                  />
                  <NIDCardBack />
                </div>

                {/* Customer Info + Contact Buttons Card */}
                <Card
                  className="border-border shadow-card"
                  data-ocid="idcard.info.card"
                >
                  <CardHeader className="pb-3">
                    <CardTitle
                      className="text-sm font-semibold flex items-center gap-2"
                      style={{ color: "#0a2463" }}
                    >
                      <User className="w-4 h-4" />
                      গ্রাহকের তথ্য ও যোগাযোগ
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      {/* Info list on the left */}
                      <div className="flex-1 space-y-2">
                        <CustomerInfoRow
                          label="নাম"
                          value={selectedCustomer.username}
                        />
                        <CustomerInfoRow
                          label="সিআইডি নম্বর"
                          value={selectedCustomer.cidNumber || "—"}
                          mono
                        />
                        <CustomerInfoRow
                          label="কার্নিভাল আইডি"
                          value={selectedCustomer.carnivalId || "—"}
                          mono
                        />
                        <CustomerInfoRow
                          label="ঠিকানা"
                          value={
                            selectedCustomer.address ||
                            selectedCustomer.village ||
                            "—"
                          }
                        />
                        <CustomerInfoRow
                          label="মোবাইল নম্বর"
                          value={selectedCustomer.phone}
                          mono
                        />
                        <CustomerInfoRow
                          label="প্যাকেজ"
                          value={pkg?.speed || "—"}
                        />
                        <CustomerInfoRow
                          label="মাসিক বিল"
                          value={`৳${selectedCustomer.monthlyFee ?? 0}`}
                        />
                      </div>

                      {/* Contact buttons on the right */}
                      <div className="flex sm:flex-col gap-2 flex-wrap">
                        <Button
                          onClick={shareWhatsApp}
                          size="sm"
                          className="gap-2 font-semibold text-white min-w-[120px] justify-start"
                          style={{ background: "#25D366" }}
                          data-ocid="idcard.whatsapp.button"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </Button>
                        <Button
                          onClick={shareImo}
                          size="sm"
                          className="gap-2 font-semibold text-white min-w-[120px] justify-start"
                          style={{ background: "#4f46e5" }}
                          data-ocid="idcard.imo.button"
                        >
                          <MessageCircle className="w-4 h-4" />
                          ইমো (Imo)
                        </Button>
                        <Button
                          onClick={shareSMS}
                          size="sm"
                          className="gap-2 font-semibold text-white min-w-[120px] justify-start"
                          style={{ background: "#0284c7" }}
                          data-ocid="idcard.sms.button"
                        >
                          <MessageSquare className="w-4 h-4" />
                          সিমে মেসেজ
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recharge Notification Card */}
                <Card
                  className="border-border shadow-card"
                  style={{ borderLeft: "4px solid #d4af37" }}
                  data-ocid="idcard.notification.card"
                >
                  <CardHeader className="pb-3">
                    <CardTitle
                      className="text-sm font-semibold flex items-center gap-2"
                      style={{ color: "#0a2463" }}
                    >
                      <Bell className="w-4 h-4" style={{ color: "#d4af37" }} />
                      রিচার্জ রিমাইন্ডার
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      গ্রাহককে রিচার্জের জন্য নোটিফিকেশন পাঠান
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-4">
                    {/* Message preview */}
                    <div
                      className="p-3 rounded-lg text-xs text-muted-foreground"
                      style={{
                        background: "rgba(10,36,99,0.04)",
                        border: "1px solid rgba(10,36,99,0.1)",
                      }}
                    >
                      <p
                        className="font-semibold text-xs mb-1"
                        style={{ color: "#0a2463" }}
                      >
                        বার্তার নমুনা:
                      </p>
                      <p className="leading-relaxed whitespace-pre-line">
                        {buildShareMessage(selectedCustomer)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                {/* Team Info Footer */}
                <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground space-y-1">
                  <p>
                    <span className="font-semibold">প্রতিষ্ঠাতা পরিচালক:</span> মুহাম্মদ
                    মনিরুজ্জামান | WhatsApp: +8801607930157
                  </p>
                  <p>
                    <span className="font-semibold">টেকনিক্যাল ম্যানেজার:</span>{" "}
                    মুহাম্মদ উজ্জল মিয়া | WhatsApp: +8801648388329
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="idcard.empty_state"
          >
            <div
              className="p-5 rounded-full mb-4"
              style={{ background: "rgba(10,36,99,0.08)" }}
            >
              <CreditCard
                className="w-10 h-10"
                style={{ color: "#0a2463", opacity: 0.5 }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              উপরের সার্চ বক্সে গ্রাহক খুঁজুন
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              গ্রাহকের নামে ক্লিক করলে Generate বাটন দেখাবে
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// Small helper component for the info rows
function CustomerInfoRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className="text-xs text-muted-foreground shrink-0"
        style={{ minWidth: "90px" }}
      >
        {label}:
      </span>
      <span
        className="text-sm font-medium"
        style={{
          color: "#0a2463",
          fontFamily: mono ? "monospace" : "inherit",
        }}
      >
        {value}
      </span>
    </div>
  );
}

interface CardProps {
  customer: ExtendedCustomer;
  pkg: { speed: string; monthlyFee?: number } | null | undefined;
  orgName: string;
  orgAddress: string;
  logo: string | null;
}

function NIDCardFront({ customer, pkg, orgName, orgAddress, logo }: CardProps) {
  return (
    <div
      style={{
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
        background: "#ffffff",
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(200,220,255,0.08) 20px, rgba(200,220,255,0.08) 21px)",
        border: "2px solid #0a2463",
        outline: "1px solid #d4af37",
        outlineOffset: "-5px",
        borderRadius: "4px",
        fontFamily: "'Noto Sans Bengali', 'SolaimanLipi', sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box",
        position: "relative",
      }}
      data-ocid="idcard.front.card"
    >
      {/* Header strip */}
      <div
        style={{
          background: "linear-gradient(135deg, #0a2463, #1c3f8c)",
          borderBottom: "3px solid #d4af37",
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          minHeight: "48px",
          flexShrink: 0,
        }}
      >
        {logo && (
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              padding: "2px",
            }}
          >
            <img
              src={logo}
              alt="লোগো"
              style={{
                width: "26px",
                height: "26px",
                objectFit: "contain",
              }}
            />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "11px",
              lineHeight: 1.2,
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textShadow: "0 0 8px rgba(212,175,55,0.5)",
            }}
          >
            {orgName}
          </p>
          {orgAddress && (
            <p
              style={{
                color: "#c0d8f0",
                fontSize: "9px",
                margin: "2px 0 0",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {orgAddress}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          padding: "8px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px 16px",
          }}
        >
          <NidField label="ইউজার আইডি/নেম" value={customer.username} />
          <NidField
            label="সিআইডি নম্বর"
            value={customer.cidNumber || "—"}
            mono
          />
          <NidField label="মোবাইল নম্বর" value={customer.phone} mono />
          <NidField label="প্যাকেজ" value={pkg?.speed || "—"} />
        </div>

        {/* Monthly bill box */}
        <div
          style={{
            marginTop: "2px",
            padding: "6px 12px",
            background: "linear-gradient(135deg, #0a2463, #1c3f8c)",
            borderRadius: "3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "9px",
              fontWeight: 500,
            }}
          >
            মাসিক বিল
          </span>
          <span
            style={{ color: "#d4af37", fontWeight: "bold", fontSize: "14px" }}
          >
            ৳{(customer.monthlyFee ?? 0).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Footer strip */}
      <div
        style={{
          background: "#0a2463",
          padding: "4px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <p style={{ color: "#ffffff", fontSize: "8px", margin: 0 }}>
          Delta Software &amp; Communication Limited
        </p>
      </div>
    </div>
  );
}

function NIDCardBack() {
  return (
    <div
      style={{
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
        background: "#ffffff",
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(200,220,255,0.08) 20px, rgba(200,220,255,0.08) 21px)",
        border: "2px solid #0a2463",
        outline: "1px solid #d4af37",
        outlineOffset: "-5px",
        borderRadius: "4px",
        fontFamily: "'Noto Sans Bengali', 'SolaimanLipi', sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
      data-ocid="idcard.back.card"
    >
      {/* Header strip */}
      <div
        style={{
          background: "linear-gradient(135deg, #0a2463, #1c3f8c)",
          borderBottom: "3px solid #d4af37",
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "36px",
          flexShrink: 0,
        }}
      >
        <p
          style={{
            color: "#d4af37",
            fontWeight: "bold",
            fontSize: "12px",
            margin: 0,
          }}
        >
          রিচার্জ নির্দেশিকা
        </p>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            color: "#1a2a4a",
            fontSize: "11px",
            lineHeight: 1.9,
            margin: 0,
          }}
        >
          <span style={{ color: "#E2136E", fontWeight: "bold" }}>বিকাশ</span> অথবা{" "}
          <span style={{ color: "#F7941D", fontWeight: "bold" }}>নগদ</span>{" "}
          একাউন্ট থেকে <strong>Pay Bill</strong> অপশনে গিয়ে{" "}
          <strong>Delta Software and Communication Limited</strong> খুঁজে বের করে{" "}
          সিআইডি নম্বর এবং মোবাইল নাম্বার ব্যবহার করে আপনার নির্ধারিত প্যাকেজ অনুযায়ী রিচার্জ
          করুন।
        </p>
      </div>

      {/* Footer strip */}
      <div
        style={{
          background: "#0a2463",
          padding: "4px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <p style={{ color: "#ffffff", fontSize: "8px", margin: 0 }}>
          Delta Software &amp; Communication Limited
        </p>
      </div>
    </div>
  );
}

function NidField({
  label,
  value,
  mono,
}: { label: string; value: string; mono?: boolean }) {
  return (
    <div
      style={{
        borderLeft: "3px solid #d4af37",
        paddingLeft: "8px",
      }}
    >
      <p
        style={{
          color: "#7a8ba0",
          fontSize: "7.5px",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          margin: 0,
        }}
      >
        {label}
      </p>
      <p
        style={{
          color: "#0a2463",
          fontSize: "11px",
          fontWeight: "600",
          margin: "1px 0 0",
          fontFamily: mono ? "monospace" : "inherit",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function PrintCard({
  side,
  customer,
  pkg,
  orgName,
  orgAddress,
  logo,
}: {
  side: "front" | "back";
  customer: ExtendedCustomer;
  pkg: { speed: string; monthlyFee?: number } | null | undefined;
  orgName: string;
  orgAddress: string;
  logo: string | null;
}) {
  if (side === "front") {
    return (
      <NIDCardFront
        customer={customer}
        pkg={pkg}
        orgName={orgName}
        orgAddress={orgAddress}
        logo={logo}
      />
    );
  }
  return <NIDCardBack />;
}
