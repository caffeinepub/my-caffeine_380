import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Download,
  Facebook,
  Plus,
  RefreshCw,
  Settings2,
  Share2,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useCompanySettings } from "../hooks/useCompanySettings";

type BuiltinPosterType =
  | "urgent"
  | "offer"
  | "problem"
  | "eid"
  | "baishakh"
  | "independence"
  | "victory"
  | "newyear"
  | "anniversary"
  | "general";

interface CustomCategory {
  id: string;
  name: string;
}

const BUILTIN_LABELS: Record<BuiltinPosterType, string> = {
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
};

const POSTER_SYMBOLS: Record<BuiltinPosterType, string> = {
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
};

const POSTER_COLORS: Record<
  BuiltinPosterType,
  { from: string; to: string; accent: string; secondary?: string }
> = {
  urgent: {
    from: "#8B0000",
    to: "#CC0000",
    accent: "#FFD700",
    secondary: "#FF4500",
  },
  offer: {
    from: "#1a0040",
    to: "#4a0080",
    accent: "#FFD700",
    secondary: "#FF1493",
  },
  problem: {
    from: "#1a2744",
    to: "#2d4a7a",
    accent: "#90CAF9",
    secondary: "#607D8B",
  },
  eid: {
    from: "#0a3d1f",
    to: "#1a6b38",
    accent: "#D4AF37",
    secondary: "#FFD700",
  },
  baishakh: {
    from: "#8b0000",
    to: "#cc0000",
    accent: "#ffffff",
    secondary: "#006400",
  },
  independence: { from: "#006a4e", to: "#004d38", accent: "#f42a41" },
  victory: {
    from: "#006a4e",
    to: "#003d28",
    accent: "#f42a41",
    secondary: "#d4af37",
  },
  newyear: {
    from: "#8B0000",
    to: "#B22222",
    accent: "#FFD700",
    secondary: "#FF6B35",
  },
  anniversary: {
    from: "#0a1628",
    to: "#1a3a6b",
    accent: "#D4AF37",
    secondary: "#C0C0C0",
  },
  general: { from: "#004d4d", to: "#006666", accent: "#e8e8e8" },
};

interface Props {
  isAdmin: boolean;
}

export default function SocialMediaPost({ isAdmin }: Props) {
  const { settings } = useCompanySettings();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [announcementText, setAnnouncementText] = useState("");
  const [posterType, setPosterType] = useState<string>("urgent");
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [facebookUrl, setFacebookUrl] = useState(
    () => localStorage.getItem("fbPageUrl") ?? "",
  );
  const [fbSaved, setFbSaved] = useState(false);
  const [customCategories, setCustomCategories] = useState<CustomCategory[]>(
    () => {
      try {
        return JSON.parse(
          localStorage.getItem("customPosterCategories") ?? "[]",
        );
      } catch {
        return [];
      }
    },
  );
  const [newCategoryName, setNewCategoryName] = useState("");

  function saveCustomCategories(cats: CustomCategory[]) {
    setCustomCategories(cats);
    localStorage.setItem("customPosterCategories", JSON.stringify(cats));
  }

  function addCustomCategory() {
    const name = newCategoryName.trim();
    if (!name) {
      toast.error("ক্যাটাগরির নাম লিখুন");
      return;
    }
    const id = `custom_${Date.now()}`;
    const updated = [...customCategories, { id, name }];
    saveCustomCategories(updated);
    setNewCategoryName("");
    toast.success(`"${name}" ক্যাটাগরি যুক্ত হয়েছে`);
  }

  function updateCustomCategory(id: string, name: string) {
    const updated = customCategories.map((c) =>
      c.id === id ? { ...c, name } : c,
    );
    saveCustomCategories(updated);
  }

  function deleteCustomCategory(id: string) {
    const updated = customCategories.filter((c) => c.id !== id);
    saveCustomCategories(updated);
    if (posterType === id) setPosterType("urgent");
    toast.success("ক্যাটাগরি মুছে ফেলা হয়েছে");
  }

  function saveFacebookUrl() {
    localStorage.setItem("fbPageUrl", facebookUrl);
    setFbSaved(true);
    toast.success("ফেসবুক লিংক সেভ হয়েছে");
    setTimeout(() => setFbSaved(false), 3000);
  }

  function getPosterColors(type: string) {
    return POSTER_COLORS[type as BuiltinPosterType] ?? POSTER_COLORS.general;
  }

  function getPosterLabel(type: string) {
    if (BUILTIN_LABELS[type as BuiltinPosterType]) {
      return BUILTIN_LABELS[type as BuiltinPosterType];
    }
    return customCategories.find((c) => c.id === type)?.name ?? "শুভেচ্ছা";
  }

  function getPosterSymbol(type: string) {
    if (POSTER_SYMBOLS[type as BuiltinPosterType]) {
      return POSTER_SYMBOLS[type as BuiltinPosterType];
    }
    return "💐 শুভেচ্ছা ও অভিনন্দন 💐";
  }

  function drawDecorations(
    ctx: CanvasRenderingContext2D,
    type: string,
    colors: { from: string; to: string; accent: string; secondary?: string },
  ) {
    const resolvedType = POSTER_COLORS[type as BuiltinPosterType]
      ? type
      : "general";

    ctx.save();

    if (resolvedType === "urgent") {
      // --- WARNING TRIANGLES at corners/edges ---
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 5;
      const trianglePositions: [number, number, number][] = [
        [90, 290, 52],
        [1110, 290, 52],
        [90, 1080, 52],
        [1110, 1080, 52],
        [600, 1070, 44],
      ];
      for (const [tx, ty, ts] of trianglePositions) {
        ctx.globalAlpha = 0.32;
        ctx.beginPath();
        ctx.moveTo(tx, ty - ts);
        ctx.lineTo(tx + ts * 0.87, ty + ts * 0.5);
        ctx.lineTo(tx - ts * 0.87, ty + ts * 0.5);
        ctx.closePath();
        ctx.stroke();
        // inner exclamation dot
        ctx.globalAlpha = 0.28;
        ctx.fillStyle = colors.accent;
        ctx.beginPath();
        ctx.arc(tx, ty + ts * 0.15, ts * 0.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- HAZARD DIAGONAL STRIPES at bottom ---
      ctx.save();
      ctx.beginPath();
      ctx.rect(60, 960, 1080, 200);
      ctx.clip();
      const stripeWidth = 48;
      for (let i = -200; i < 1400; i += stripeWidth * 2) {
        ctx.globalAlpha = 0.13;
        ctx.fillStyle = "#FFD700";
        ctx.beginPath();
        ctx.moveTo(i, 960);
        ctx.lineTo(i + stripeWidth, 960);
        ctx.lineTo(i + stripeWidth + 200, 1160);
        ctx.lineTo(i + 200, 1160);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 0.09;
        ctx.fillStyle = "#AA0000";
        ctx.beginPath();
        ctx.moveTo(i + stripeWidth, 960);
        ctx.lineTo(i + stripeWidth * 2, 960);
        ctx.lineTo(i + stripeWidth * 2 + 200, 1160);
        ctx.lineTo(i + stripeWidth + 200, 1160);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // --- LARGE BACKGROUND EXCLAMATION MARK ---
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = colors.accent;
      ctx.font = "bold 680px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("!", 600, 680);
    } else if (resolvedType === "problem") {
      // --- LARGE GEAR/COG on right side ---
      const gearCx = 1000;
      const gearCy = 680;
      const gearOuter = 180;
      const gearInner = 120;
      const teeth = 12;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.14;
      ctx.beginPath();
      for (let i = 0; i < teeth * 2; i++) {
        const angle = (i * Math.PI) / teeth;
        const r = i % 2 === 0 ? gearOuter : gearInner;
        const px = gearCx + r * Math.cos(angle);
        const py = gearCy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      // gear inner circle
      ctx.beginPath();
      ctx.arc(gearCx, gearCy, 55, 0, Math.PI * 2);
      ctx.stroke();

      // small gear top-left
      const sg = { cx: 180, cy: 360, outer: 80, inner: 54, t: 8 };
      ctx.globalAlpha = 0.1;
      ctx.beginPath();
      for (let i = 0; i < sg.t * 2; i++) {
        const angle = (i * Math.PI) / sg.t;
        const r = i % 2 === 0 ? sg.outer : sg.inner;
        const px = sg.cx + r * Math.cos(angle);
        const py = sg.cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(sg.cx, sg.cy, 24, 0, Math.PI * 2);
      ctx.stroke();

      // --- CIRCUIT BOARD PATTERN ---
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.1;
      const gridStep = 80;
      for (let gx = 80; gx < 700; gx += gridStep) {
        for (let gy = 290; gy < 1100; gy += gridStep) {
          // horizontal line segment
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(gx + gridStep * 0.6, gy);
          ctx.stroke();
          // vertical line segment
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(gx, gy + gridStep * 0.6);
          ctx.stroke();
          // junction square
          ctx.globalAlpha = 0.12;
          ctx.strokeRect(gx - 5, gy - 5, 10, 10);
          ctx.globalAlpha = 0.1;
        }
      }

      // --- WRENCH OUTLINE bottom-left ---
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 5;
      const wx = 130;
      const wy = 980;
      ctx.save();
      ctx.translate(wx, wy);
      ctx.rotate(-Math.PI / 5);
      // wrench handle
      ctx.beginPath();
      ctx.roundRect(-10, 0, 20, 100, 8);
      ctx.stroke();
      // wrench head (C-shape)
      ctx.beginPath();
      ctx.arc(0, -10, 32, 0.6, Math.PI - 0.6);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -10, 18, 0.6, Math.PI - 0.6);
      ctx.stroke();
      ctx.restore();
    } else if (resolvedType === "eid") {
      // --- CRESCENT MOON right side ---
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.arc(980, 680, 130, 0, Math.PI * 2);
      ctx.fill();
      // mask inner circle to create crescent
      ctx.globalAlpha = 1;
      ctx.fillStyle = colors.to;
      ctx.beginPath();
      ctx.arc(1030, 650, 115, 0, Math.PI * 2);
      ctx.fill();

      // --- 8-POINTED ISLAMIC STAR background ---
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = colors.accent;
      const starCx = 600;
      const starCy = 680;
      const starR = 220;
      // two overlapping squares rotated 45°
      for (let sq = 0; sq < 2; sq++) {
        ctx.save();
        ctx.translate(starCx, starCy);
        ctx.rotate((sq * Math.PI) / 4);
        ctx.beginPath();
        ctx.rect(
          -starR / 1.5,
          -starR / 1.5,
          (starR * 2) / 1.5,
          (starR * 2) / 1.5,
        );
        ctx.fill();
        ctx.restore();
      }

      // --- SMALL 5-POINTED STARS scattered ---
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = colors.accent;
      const starPositions: [number, number, number][] = [
        [820, 310, 20],
        [1060, 280, 16],
        [870, 490, 14],
        [990, 530, 18],
        [740, 420, 12],
        [120, 680, 16],
        [200, 880, 12],
        [1080, 900, 14],
      ];
      for (const [sx, sy, sr] of starPositions) {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
          const r = i % 2 === 0 ? sr : sr * 0.42;
          const px = sx + r * Math.cos(angle);
          const py = sy + r * Math.sin(angle);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
      }

      // --- ARABESQUE BORDER LINES top/bottom ---
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2.5;
      for (let bx = 70; bx < 1140; bx += 40) {
        const t = (bx / 1140) * Math.PI * 28;
        // top band
        ctx.beginPath();
        ctx.arc(bx + 20, 280 + 10 * Math.sin(t), 8, 0, Math.PI * 2);
        ctx.stroke();
        // bottom band
        ctx.beginPath();
        ctx.arc(bx + 20, 1085 + 8 * Math.sin(t + 1), 7, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else if (resolvedType === "newyear") {
      // --- FIREWORK BURSTS ---
      const fireworkPositions: [number, number, number, string][] = [
        [200, 340, 70, colors.accent],
        [1010, 270, 80, colors.secondary ?? "#FF6B35"],
        [150, 820, 60, "#FF6B35"],
        [1060, 760, 75, colors.accent],
        [600, 195, 55, "#FFF8DC"],
        [380, 500, 45, colors.secondary ?? "#FF6B35"],
        [820, 950, 50, colors.accent],
      ];
      for (const [fx, fy, fLen, fColor] of fireworkPositions) {
        ctx.strokeStyle = fColor;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = 0.28;
        const rays = 16;
        for (let i = 0; i < rays; i++) {
          const a = (i * Math.PI * 2) / rays;
          ctx.beginPath();
          ctx.moveTo(fx + 6 * Math.cos(a), fy + 6 * Math.sin(a));
          ctx.lineTo(fx + fLen * Math.cos(a), fy + fLen * Math.sin(a));
          ctx.stroke();
        }
        // burst dot at center
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = fColor;
        ctx.beginPath();
        ctx.arc(fx, fy, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- CONFETTI (small rects and circles) ---
      const confColors = [
        colors.accent,
        "#FFF8DC",
        colors.secondary ?? "#FF6B35",
        "#FFB6C1",
        "#FFFACD",
      ];
      for (let i = 0; i < 80; i++) {
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = confColors[i % confColors.length];
        const cx2 = 80 + ((i * 173) % 1040);
        const cy2 = 280 + ((i * 197) % 860);
        if (i % 3 === 0) {
          ctx.save();
          ctx.translate(cx2, cy2);
          ctx.rotate((i * 37 * Math.PI) / 180);
          ctx.fillRect(-6, -3, 12, 6);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(cx2, cy2, 3 + (i % 3) * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- SPARKLE STARS (4-pointed) ---
      ctx.fillStyle = colors.accent;
      const sparklePos: [number, number, number][] = [
        [340, 380, 22],
        [900, 310, 18],
        [130, 600, 16],
        [1090, 600, 20],
        [480, 920, 15],
        [740, 860, 18],
        [600, 1050, 14],
      ];
      for (const [spx, spy, spSize] of sparklePos) {
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        // 4-pointed star
        for (let p = 0; p < 8; p++) {
          const a = (p * Math.PI) / 4;
          const r = p % 2 === 0 ? spSize : spSize * 0.3;
          const px = spx + r * Math.cos(a - Math.PI / 2);
          const py = spy + r * Math.sin(a - Math.PI / 2);
          p === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
      }
    } else if (resolvedType === "offer") {
      // --- SHIMMER DIAGONAL LINES across background ---
      ctx.globalAlpha = 0.07;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2;
      for (let i = -1200; i < 2400; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 1200, 1200);
        ctx.stroke();
      }

      // --- SPARKLE SHINE LINES from multiple points ---
      const shineSources: [number, number][] = [
        [120, 320],
        [1080, 320],
        [200, 1000],
        [1000, 1000],
        [600, 480],
      ];
      for (const [shx, shy] of shineSources) {
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.2;
        const shineRays = 8;
        for (let i = 0; i < shineRays; i++) {
          const a = (i * Math.PI * 2) / shineRays;
          const shLen = 45 + (i % 2) * 25;
          ctx.beginPath();
          ctx.moveTo(shx + 4 * Math.cos(a), shy + 4 * Math.sin(a));
          ctx.lineTo(shx + shLen * Math.cos(a), shy + shLen * Math.sin(a));
          ctx.stroke();
        }
      }

      // --- 5-POINTED STARS scattered ---
      const offerStarPos: [number, number, number][] = [
        [120, 310, 18],
        [1085, 310, 16],
        [160, 970, 14],
        [1040, 970, 16],
        [350, 400, 12],
        [860, 410, 14],
        [420, 1000, 11],
        [780, 990, 13],
      ];
      ctx.fillStyle = colors.accent;
      for (const [sx, sy, sr] of offerStarPos) {
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
          const r = i % 2 === 0 ? sr : sr * 0.4;
          const px = sx + r * Math.cos(angle);
          const py = sy + r * Math.sin(angle);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
      }

      // --- LARGE DISCOUNT BADGE circle bottom-right ---
      const badgeCx = 1010;
      const badgeCy = 970;
      const badgeR = 110;
      // outer ring
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.arc(badgeCx, badgeCy, badgeR, 0, Math.PI * 2);
      ctx.fill();
      // inner ring
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = colors.from;
      ctx.beginPath();
      ctx.arc(badgeCx, badgeCy, badgeR - 14, 0, Math.PI * 2);
      ctx.fill();
      // dashed outer ring
      ctx.globalAlpha = 0.7;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 5]);
      ctx.beginPath();
      ctx.arc(badgeCx, badgeCy, badgeR + 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      // % text
      ctx.globalAlpha = 1;
      ctx.fillStyle = colors.accent;
      ctx.font = "bold 68px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("%", badgeCx, badgeCy);
    } else if (resolvedType === "anniversary") {
      // --- LARGE MEDALLION/SEAL background center ---
      const medCx = 600;
      const medCy = 680;
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = colors.accent;
      // concentric decorative rings
      for (let ring = 0; ring < 4; ring++) {
        ctx.lineWidth = ring % 2 === 0 ? 4 : 2;
        ctx.beginPath();
        ctx.arc(medCx, medCy, 180 - ring * 28, 0, Math.PI * 2);
        ctx.stroke();
      }
      // radial spokes
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.08;
      for (let sp = 0; sp < 24; sp++) {
        const a = (sp * Math.PI * 2) / 24;
        ctx.beginPath();
        ctx.moveTo(medCx + 40 * Math.cos(a), medCy + 40 * Math.sin(a));
        ctx.lineTo(medCx + 175 * Math.cos(a), medCy + 175 * Math.sin(a));
        ctx.stroke();
      }

      // --- RIBBON BOW at top corners ---
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = colors.accent;
      for (const [bx, bSign] of [
        [130, 1],
        [1070, -1],
      ] as [number, number][]) {
        const by = 290;
        // left lobe
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.bezierCurveTo(
          bx - 35 * bSign,
          by - 28,
          bx - 60 * bSign,
          by + 10,
          bx,
          by + 22,
        );
        ctx.bezierCurveTo(
          bx - 28 * bSign,
          by + 8,
          bx - 18 * bSign,
          by - 12,
          bx,
          by,
        );
        ctx.fill();
        // right lobe
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.bezierCurveTo(
          bx + 35 * bSign,
          by - 28,
          bx + 60 * bSign,
          by + 10,
          bx,
          by + 22,
        );
        ctx.bezierCurveTo(
          bx + 28 * bSign,
          by + 8,
          bx + 18 * bSign,
          by - 12,
          bx,
          by,
        );
        ctx.fill();
      }

      // --- LAUREL LEAF BRANCHES left and right ---
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2.5;
      for (const [side, startX] of [
        [-1, 340],
        [1, 860],
      ] as [number, number][]) {
        const stemStartX = startX;
        const stemStartY = 540;
        const stemEndX = startX + side * -60;
        const stemEndY = 820;
        // curved stem
        ctx.beginPath();
        ctx.moveTo(stemStartX, stemStartY);
        ctx.bezierCurveTo(
          stemStartX + side * -20,
          stemStartY + 80,
          stemEndX + side * 20,
          stemEndY - 80,
          stemEndX,
          stemEndY,
        );
        ctx.stroke();
        // leaves along stem
        const leafCount = 6;
        for (let li = 0; li < leafCount; li++) {
          const t = li / (leafCount - 1);
          const lx = stemStartX + (stemEndX - stemStartX) * t;
          const ly = stemStartY + (stemEndY - stemStartY) * t;
          const leafAngle = (side * Math.PI) / 4 + (li % 2) * (Math.PI / 6);
          ctx.save();
          ctx.translate(lx, ly);
          ctx.rotate(leafAngle);
          ctx.beginPath();
          ctx.ellipse(0, -16, 8, 18, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      // --- FORMAL INNER RECTANGULAR FRAME ---
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      ctx.strokeRect(80, 290, 1040, 820);
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.1;
      ctx.strokeRect(95, 305, 1010, 790);
    } else if (resolvedType === "baishakh") {
      // Floral petals
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.22;
      for (const [fx, fy] of [
        [200, 900],
        [1000, 880],
        [100, 700],
        [1100, 650],
      ]) {
        for (let p = 0; p < 6; p++) {
          const a = (p * Math.PI) / 3;
          ctx.beginPath();
          ctx.moveTo(fx, fy);
          ctx.bezierCurveTo(
            fx + 60 * Math.cos(a - 0.4),
            fy + 60 * Math.sin(a - 0.4),
            fx + 60 * Math.cos(a + 0.4),
            fy + 60 * Math.sin(a + 0.4),
            fx + 80 * Math.cos(a),
            fy + 80 * Math.sin(a),
          );
          ctx.stroke();
        }
      }
    } else if (resolvedType === "independence" || resolvedType === "victory") {
      // Sun rays
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.15;
      const cx = 600;
      const cy = 80;
      for (let i = 0; i < 24; i++) {
        const a = (i * Math.PI * 2) / 24;
        ctx.beginPath();
        ctx.moveTo(cx + 40 * Math.cos(a), cy + 40 * Math.sin(a));
        ctx.lineTo(cx + 180 * Math.cos(a), cy + 180 * Math.sin(a));
        ctx.stroke();
      }
      if (resolvedType === "victory") {
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = colors.secondary ?? colors.accent;
        const starCx = 1050;
        const starCy = 900;
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const a = (i * Math.PI) / 5 - Math.PI / 2;
          const r = i % 2 === 0 ? 80 : 35;
          const px = starCx + r * Math.cos(a);
          const py = starCy + r * Math.sin(a);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
      }
    } else if (resolvedType === "general") {
      // Wave pattern
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.12;
      for (let wy = 300; wy < 1100; wy += 80) {
        ctx.beginPath();
        for (let wx = 60; wx < 1140; wx += 4) {
          const waveY = wy + 20 * Math.sin((wx / 1140) * Math.PI * 6);
          wx === 60 ? ctx.moveTo(wx, waveY) : ctx.lineTo(wx, waveY);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = colors.accent;
      for (const [hx, hy] of [
        [120, 1050],
        [1080, 1050],
      ]) {
        ctx.beginPath();
        ctx.moveTo(hx, hy + 10);
        ctx.bezierCurveTo(hx, hy - 10, hx - 30, hy - 10, hx - 30, hy + 10);
        ctx.bezierCurveTo(hx - 30, hy + 25, hx, hy + 38, hx, hy + 45);
        ctx.bezierCurveTo(hx, hy + 38, hx + 30, hy + 25, hx + 30, hy + 10);
        ctx.bezierCurveTo(hx + 30, hy - 10, hx, hy - 10, hx, hy + 10);
        ctx.closePath();
        ctx.fill();
      }
    } else {
      // Default diagonal stripes
      ctx.globalAlpha = 0.035;
      for (let i = -1200; i < 2400; i += 60) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 1200, 1200);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 20;
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  async function generatePoster() {
    if (!announcementText.trim()) {
      toast.error("অনুগ্রহ করে ঘোষণার বিষয়বস্তু লিখুন");
      return;
    }
    setIsGenerating(true);
    setGeneratedUrl(null);

    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d")!;

    const colors = getPosterColors(posterType);

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 1200);
    bgGrad.addColorStop(0, colors.from);
    bgGrad.addColorStop(0.5, colors.to);
    bgGrad.addColorStop(1, colors.from);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 1200);

    // Subtle diagonal stripe pattern (default)
    ctx.save();
    ctx.globalAlpha = 0.035;
    for (let i = -1200; i < 2400; i += 60) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 1200, 1200);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 20;
      ctx.stroke();
    }
    ctx.restore();

    // Radial glow center
    const radial = ctx.createRadialGradient(600, 600, 100, 600, 600, 700);
    radial.addColorStop(0, "rgba(255,255,255,0.07)");
    radial.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 1200, 1200);

    // Draw category-specific decorations
    drawDecorations(ctx, posterType, colors);

    // Outer gold border double frame
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 8;
    ctx.strokeRect(24, 24, 1152, 1152);
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.6;
    ctx.strokeRect(38, 38, 1124, 1124);
    ctx.globalAlpha = 1;

    // Corner ornaments
    function drawCornerOrnament(x: number, y: number, angle: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.9;
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

    // Header band
    const headerGrad = ctx.createLinearGradient(0, 0, 1200, 0);
    headerGrad.addColorStop(0, "rgba(255,255,255,0.13)");
    headerGrad.addColorStop(0.5, "rgba(255,255,255,0.18)");
    headerGrad.addColorStop(1, "rgba(255,255,255,0.13)");
    ctx.fillStyle = headerGrad;
    ctx.fillRect(60, 60, 1080, 180);

    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, 1080, 180);

    // Logo
    const logoX = 90;
    const logoY = 75;
    const logoSize = 150;
    let logoLoaded = false;

    async function drawLogo(): Promise<void> {
      if (settings.logo) {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(logoX, logoY, logoSize, logoSize, 16);
            ctx.clip();
            ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
            ctx.restore();
            logoLoaded = true;
            resolve();
          };
          img.onerror = () => resolve();
          img.src = settings.logo!;
        });
      }
    }

    await drawLogo();

    if (!logoLoaded) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(logoX, logoY, logoSize, logoSize, 16);
      ctx.fillStyle = colors.accent;
      ctx.globalAlpha = 0.25;
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
    ctx.fillStyle = colors.accent;
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 10;

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
      ctx.font = `400 30px 'Noto Sans Bengali', sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.shadowBlur = 6;
      ctx.fillText(orgAddress, textStartX, lineY + 64);
    }
    ctx.shadowBlur = 0;

    // Divider
    const dividerY = 260;
    const divGrad = ctx.createLinearGradient(60, 0, 1140, 0);
    divGrad.addColorStop(0, "transparent");
    divGrad.addColorStop(0.2, colors.accent);
    divGrad.addColorStop(0.8, colors.accent);
    divGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(60, dividerY);
    ctx.lineTo(1140, dividerY);
    ctx.stroke();

    // Category label
    const typeLabel = getPosterLabel(posterType);
    ctx.font = `bold 54px 'Noto Sans Bengali', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = colors.accent;
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 18;
    ctx.fillText(typeLabel, 600, 282);
    ctx.shadowBlur = 0;

    // Symbol row
    const symbol = getPosterSymbol(posterType);
    ctx.font = "40px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.78)";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(symbol, 600, 355);

    // Content area background
    const contentGrad = ctx.createLinearGradient(60, 440, 1140, 1050);
    contentGrad.addColorStop(0, "rgba(255,255,255,0.09)");
    contentGrad.addColorStop(1, "rgba(255,255,255,0.03)");
    ctx.fillStyle = contentGrad;
    ctx.beginPath();
    ctx.roundRect(70, 430, 1060, 630, 24);
    ctx.fill();
    ctx.strokeStyle = `${colors.accent}55`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Announcement text
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 12;

    const maxTextWidth = 980;
    const lineHeight = 72;
    const fontSize =
      announcementText.length > 100
        ? 40
        : announcementText.length > 60
          ? 48
          : 56;
    ctx.font = `bold ${fontSize}px 'Noto Sans Bengali', sans-serif`;

    const annWords = announcementText.split(" ");
    const lines: string[] = [];
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

    // Footer divider
    const footerDivY = 1090;
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, footerDivY);
    ctx.lineTo(1120, footerDivY);
    ctx.stroke();

    ctx.font = `500 28px 'Noto Sans Bengali', sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(orgName, 600, 1120);

    if (settings.whatsapp) {
      ctx.font = `400 22px 'Noto Sans Bengali', sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fillText(`WhatsApp: ${settings.whatsapp}`, 600, 1155);
    }

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
      toast.success(
        "পোস্টার ডাউনলোড হয়েছে। ফেসবুক পেজ খুলছে — ছবিটি আপলোড করে পোস্ট করুন।",
        { duration: 6000 },
      );
    }, 500);
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Share2 size={48} className="text-muted-foreground" />
        <p className="text-lg font-medium text-foreground">
          সোশ্যাল মিডিয়া পোস্টার তৈরি করতে এডমিন হিসেবে লগইন করুন
        </p>
        <p className="text-sm text-muted-foreground">
          শুধুমাত্র এডমিনরা পোস্টার জেনারেট করতে পারবেন।
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/20">
          <Share2 size={22} className="text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            সোশ্যাল মিডিয়া পোস্টার
          </h1>
          <p className="text-sm text-muted-foreground">
            ১২০০×১২০০ পিক্সেলের প্রফেশনাল পোস্টার তৈরি করুন
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          {/* Generator form */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                পোস্টার তৈরির ফর্ম
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>পোস্টারের ধরন</Label>
                <Select
                  value={posterType}
                  onValueChange={(v) => setPosterType(v)}
                >
                  <SelectTrigger data-ocid="socialmedia.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Built-in categories */}
                    {(
                      Object.entries(BUILTIN_LABELS) as [
                        BuiltinPosterType,
                        string,
                      ][]
                    ).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                    {/* Custom categories */}
                    {customCategories.length > 0 && (
                      <>
                        <Separator className="my-1" />
                        <div className="px-2 py-1 text-xs text-muted-foreground font-medium">
                          কাস্টম ক্যাটাগরি
                        </div>
                        {customCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>ঘোষণার বিষয়বস্তু</Label>
                <Textarea
                  data-ocid="socialmedia.textarea"
                  placeholder="এখানে আপনার ঘোষণা বা নোটিশ লিখুন..."
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {announcementText.length} অক্ষর
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  data-ocid="socialmedia.primary_button"
                  className="flex-1 gap-2"
                  onClick={generatePoster}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <Sparkles size={16} />
                  )}
                  {isGenerating ? "তৈরি হচ্ছে..." : "Generate"}
                </Button>
                {generatedUrl && (
                  <Button
                    data-ocid="socialmedia.secondary_button"
                    variant="outline"
                    onClick={() => {
                      setGeneratedUrl(null);
                      setAnnouncementText("");
                    }}
                    className="gap-2"
                  >
                    <RefreshCw size={16} />
                    পুনরায়
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Facebook Setup */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Facebook size={16} className="text-blue-500" />
                ফেসবুক সেটআপ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>ফেসবুক পেজ/প্রোফাইল লিংক</Label>
                <div className="flex gap-2">
                  <Input
                    data-ocid="socialmedia.input"
                    placeholder="https://facebook.com/yourpage"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    type="url"
                  />
                  <Button
                    data-ocid="socialmedia.save_button"
                    variant="outline"
                    onClick={saveFacebookUrl}
                    className={fbSaved ? "border-green-500 text-green-600" : ""}
                  >
                    {fbSaved ? "সেভ ✓" : "সেভ"}
                  </Button>
                </div>
              </div>

              <Button
                data-ocid="socialmedia.facebook_button"
                className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!generatedUrl || !facebookUrl}
                onClick={handleFacebookPost}
              >
                <Facebook size={16} />
                ফেসবুকে পোস্ট করুন
              </Button>
              {(!generatedUrl || !facebookUrl) && (
                <p className="text-xs text-muted-foreground text-center">
                  {!generatedUrl
                    ? "প্রথমে পোস্টার জেনারেট করুন"
                    : "ফেসবুক লিংক সেভ করুন"}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Category Management */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Settings2 size={16} className="text-primary" />
                ক্যাটাগরি ম্যানেজমেন্ট
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Built-in categories list */}
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  ডিফল্ট ক্যাটাগরি
                </p>
                {(
                  Object.entries(BUILTIN_LABELS) as [
                    BuiltinPosterType,
                    string,
                  ][]
                ).map(([key, label]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between px-3 py-2 rounded-md bg-muted/40 border border-border/50"
                    data-ocid={`socialmedia.item.${Object.keys(BUILTIN_LABELS).indexOf(key) + 1}`}
                  >
                    <span className="text-sm text-foreground">{label}</span>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      ডিফল্ট
                    </Badge>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Custom categories */}
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  কাস্টম ক্যাটাগরি
                </p>
                {customCategories.length === 0 && (
                  <p
                    className="text-xs text-muted-foreground text-center py-3 rounded-md border border-dashed border-border"
                    data-ocid="socialmedia.empty_state"
                  >
                    এখনো কোনো কাস্টম ক্যাটাগরি নেই
                  </p>
                )}
                {customCategories.map((cat, idx) => (
                  <div
                    key={cat.id}
                    className="flex items-center gap-2"
                    data-ocid={`socialmedia.item.${Object.keys(BUILTIN_LABELS).length + idx + 1}`}
                  >
                    <Input
                      value={cat.name}
                      onChange={(e) =>
                        updateCustomCategory(cat.id, e.target.value)
                      }
                      className="flex-1 h-9 text-sm"
                      placeholder="ক্যাটাগরির নাম"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                      onClick={() => deleteCustomCategory(cat.id)}
                      data-ocid={`socialmedia.delete_button.${idx + 1}`}
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add new category */}
              <div className="flex gap-2 pt-1">
                <Input
                  data-ocid="socialmedia.input"
                  placeholder="নতুন ক্যাটাগরির নাম লিখুন"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCustomCategory()}
                  className="flex-1"
                />
                <Button
                  data-ocid="socialmedia.primary_button"
                  variant="outline"
                  onClick={addCustomCategory}
                  className="gap-1.5 shrink-0"
                >
                  <Plus size={15} />
                  যুক্ত করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Preview */}
        <div>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">পোস্টার প্রিভিউ</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedUrl ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <img
                      src={generatedUrl}
                      alt="Generated poster"
                      className="rounded-lg shadow-xl border border-border"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "560px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <Button
                    data-ocid="socialmedia.download_button"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={downloadPoster}
                  >
                    <Download size={16} />
                    ডাউনলোড করুন (PNG)
                  </Button>
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border"
                  style={{ minHeight: "400px" }}
                  data-ocid="socialmedia.empty_state"
                >
                  <Share2 size={48} className="text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-sm">
                    ফর্ম পূরণ করে Generate বাটনে ক্লিক করুন
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
