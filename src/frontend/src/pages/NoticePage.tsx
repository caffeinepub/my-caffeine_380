import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  Copy,
  FileDown,
  MapPin,
  Megaphone,
  MessageCircle,
  Phone,
  Send,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useCompanySettings } from "../hooks/useCompanySettings";
import { useLocalCustomers } from "../hooks/useLocalCustomers";
import { printDocument } from "../utils/printDocument";

const ISSUE_TYPES = [
  "লাইনে সমস্যা",
  "মেইনটেন্যান্স কাজ",
  "বিদ্যুৎ বিভ্রাট",
  "নেটওয়ার্ক আপগ্রেড",
  "অন্যান্য",
];

const VILLAGES = ["বালীগাঁও", "ফরিদপুর", "কাটাইয়া", "পশ্চিম বাজুকা", "পূর্ব বাজুকা"];

function buildNoticeText(
  issueType: string,
  area: string,
  startTime: string,
  restoreTime: string,
  notes: string,
  orgName: string,
): string {
  const lines: string[] = [
    "প্রিয় গ্রাহক,",
    "",
    `আমরা জানাতে চাই যে ${area ? `${area}-এ` : "আপনার এলাকায়"} ${issueType}-এর কারণে ইন্টারনেট সেবা সাময়িকভাবে বাধাগ্রস্ত হচ্ছে।`,
    "",
    `সমস্যা শুরু: ${startTime || "—"}`,
    `সমাধানের প্রত্যাশিত সময়: ${restoreTime || "—"}`,
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

function normalizeWhatsAppPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("880") && digits.length >= 12) return digits;
  if (digits.startsWith("88") && digits.length >= 12) return digits;
  if (digits.startsWith("0") && digits.length === 11) return `88${digits}`;
  if (digits.length === 10) return `880${digits}`;
  return `88${digits}`;
}

function normalizeVillage(v: string): string {
  const val = v
    .toLowerCase()
    .replace(/[,\s]+/g, " ")
    .trim();
  if (/baligou|baligaw|baligaon|baligun|baliguon|বালী|বালিগ/.test(val))
    return "বালীগাঁও";
  if (/faridpur|foridpur|ফরিদ/.test(val)) return "ফরিদপুর";
  if (/kathaiya|kataiya|kataia|katia|কাটাই/.test(val)) return "কাটাইয়া";
  if (
    /pocim|poschim|pashcim|pajgaw|bajgaw|pocimbaj|bajuka|bazuka|bazar|পশ্চিম/.test(
      val,
    ) &&
    !/purbo|purbu|পূর্ব/.test(val)
  )
    return "পশ্চিম বাজুকা";
  if (/purbo|purbu|পূর্ব/.test(val)) return "পূর্ব বাজুকা";
  return v;
}

interface NoticePageProps {
  isAdmin?: boolean;
}
export default function NoticePage(_props: NoticePageProps) {
  const { customers } = useLocalCustomers();
  const { settings } = useCompanySettings();

  const [issueType, setIssueType] = useState(ISSUE_TYPES[0]);
  const [area, setArea] = useState("");
  const [startTime, setStartTime] = useState("");
  const [restoreTime, setRestoreTime] = useState("");
  const [notes, setNotes] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedVillages, setSelectedVillages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const orgName = settings.name || "বালিগাঁও ব্রডব্যান্ড ইন্টারনেট";

  const noticeText = generated
    ? buildNoticeText(issueType, area, startTime, restoreTime, notes, orgName)
    : "";

  function handleGenerate() {
    if (!issueType) {
      toast.error("সমস্যার ধরন নির্বাচন করুন");
      return;
    }
    setGenerated(true);
    toast.success("নোটিশ তৈরি হয়েছে");
  }

  async function copyToClipboard(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("কপি করা হয়েছে");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (_) {
      toast.error("কপি করতে ব্যর্থ হয়েছে");
    }
  }

  function handleExportPDF() {
    if (!generated) {
      toast.error("প্রথমে নোটিশ জেনারেট করুন");
      return;
    }
    const bodyHTML = `
      <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.8; padding: 8px 0;">${noticeText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
    `;
    printDocument("গ্রাহক নোটিশ", bodyHTML, settings);
  }

  function openWhatsApp(mobile: string) {
    const url = `https://wa.me/${normalizeWhatsAppPhone(mobile)}?text=${encodeURIComponent(noticeText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function openIMO(mobile: string) {
    const waPhone = normalizeWhatsAppPhone(mobile);
    copyToClipboard(noticeText, `imo-${waPhone}`);
    const url = `imo://chat?phone=${waPhone}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.info("নোটিশ কপি হয়েছে — IMO-তে পেস্ট করুন");
  }

  function openSMS(mobile: string) {
    const waPhone = normalizeWhatsAppPhone(mobile);
    const url = `sms:+${waPhone}?body=${encodeURIComponent(noticeText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function toggleVillage(v: string) {
    setSelectedVillages((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    );
  }

  const filteredCustomers = useMemo(() => {
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
        (c) =>
          (c.username || c.name || "").toLowerCase().includes(q) ||
          (c.phone || "")
            .replace(/[^0-9]/g, "")
            .includes(q.replace(/[^0-9]/g, "")) ||
          (c.carnivalId || "").toLowerCase().includes(q) ||
          (c.cidNumber || "").toLowerCase().includes(q),
      );
    }
    return list;
  }, [customers, selectedVillages, searchQuery]);

  return (
    <div className="space-y-6" data-ocid="notice.page">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10">
          <Megaphone className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold text-foreground">নোটিশ বোর্ড</h2>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full leading-none"
              style={{
                background: "#3B82F615",
                color: "#3B82F6",
                border: "1px solid #3B82F630",
              }}
            >
              অভ্যন্তরীণ ঘোষণা
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            গ্রাহকদের উদ্দেশ্যে পেশাদার নোটিশ তৈরি ও পাঠান
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notice Generator Form */}
        <Card
          className="shadow-card border-border"
          data-ocid="notice.form.card"
        >
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">
              নোটিশ তৈরি করুন
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">সমস্যার ধরন *</Label>
              <Select value={issueType} onValueChange={setIssueType}>
                <SelectTrigger data-ocid="notice.issue_type.select">
                  <SelectValue placeholder="সমস্যার ধরন নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {ISSUE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium">প্রভাবিত এলাকা</Label>
              <Input
                data-ocid="notice.area.input"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="যেমন: বালিগাঁও, ফরিদপুর"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">সমস্যা শুরুর সময়</Label>
                <Input
                  data-ocid="notice.start_time.input"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  সমাধানের প্রত্যাশিত সময়
                </Label>
                <Input
                  data-ocid="notice.restore_time.input"
                  type="datetime-local"
                  value={restoreTime}
                  onChange={(e) => setRestoreTime(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium">অতিরিক্ত বার্তা</Label>
              <Textarea
                data-ocid="notice.notes.textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="অতিরিক্ত কোনো তথ্য থাকলে এখানে লিখুন..."
                rows={3}
              />
            </div>

            <Button
              className="w-full bg-primary text-white"
              onClick={handleGenerate}
              data-ocid="notice.generate.button"
            >
              <Megaphone size={16} className="mr-2" />
              নোটিশ জেনারেট করুন
            </Button>

            {/* Village checkboxes — shown after Generate is clicked */}
            {generated && (
              <div className="pt-2 space-y-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  <Label className="text-xs font-semibold text-foreground">
                    গ্রাম নির্বাচন করুন (নোটিশ পাঠাতে)
                  </Label>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {VILLAGES.map((v) => (
                    <div
                      key={v}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer border transition-colors ${
                        selectedVillages.includes(v)
                          ? "bg-primary/10 border-primary/40"
                          : "bg-muted/20 border-border hover:bg-muted/40"
                      }`}
                      onKeyDown={(e) => e.key === "Enter" && toggleVillage(v)}
                      onClick={() => toggleVillage(v)}
                      data-ocid={`notice.village.${v}`}
                    >
                      <Checkbox
                        id={`village-notice-${v}`}
                        checked={selectedVillages.includes(v)}
                        onCheckedChange={() => toggleVillage(v)}
                        className="h-4 w-4"
                      />
                      <label
                        htmlFor={`village-notice-${v}`}
                        className="text-sm font-medium cursor-pointer flex-1"
                      >
                        {v}
                      </label>
                      {selectedVillages.includes(v) && (
                        <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                          নির্বাচিত
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                {selectedVillages.length > 0 && (
                  <p className="text-[11px] text-muted-foreground">
                    {selectedVillages.length}টি গ্রাম নির্বাচিত — নিচে গ্রাহক তালিকা
                    দেখুন
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generated Notice Preview */}
        <Card
          className="shadow-card border-border"
          data-ocid="notice.preview.card"
        >
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">
              নোটিশ প্রিভিউ
            </CardTitle>
            {generated && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(noticeText, "preview")}
                  data-ocid="notice.copy_notice.button"
                >
                  {copiedId === "preview" ? (
                    <Check size={14} className="mr-1.5 text-success" />
                  ) : (
                    <Copy size={14} className="mr-1.5" />
                  )}
                  কপি
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportPDF}
                  data-ocid="notice.export_pdf.button"
                >
                  <FileDown size={14} className="mr-1.5" />
                  PDF
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {generated ? (
              <div
                className="bg-muted/30 rounded-lg p-4 border border-border"
                data-ocid="notice.preview.panel"
              >
                <pre className="whitespace-pre-wrap text-sm text-foreground leading-relaxed font-sans">
                  {noticeText}
                </pre>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center py-16 text-center"
                data-ocid="notice.preview.empty_state"
              >
                <div className="p-4 rounded-full bg-muted/40 mb-3">
                  <Send className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  বাম পাশের ফর্ম পূরণ করে
                </p>
                <p className="text-sm text-muted-foreground">
                  "নোটিশ জেনারেট করুন" বাটনে ক্লিক করুন
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Customer List — shown when villages are selected after Generate */}
      {generated && selectedVillages.length > 0 && (
        <Card
          className="shadow-card border-border"
          data-ocid="notice.customer_list.card"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-primary" />
                <CardTitle className="text-base font-semibold">
                  গ্রাহক তালিকা
                </CardTitle>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedVillages.map((v) => (
                  <span
                    key={v}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Box */}
            <div className="relative">
              <Input
                data-ocid="notice.search.input"
                placeholder="নাম, মোবাইল, কার্নিভাল আইডি বা সিআইডি দিয়ে সার্চ করুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <p className="text-xs text-muted-foreground">
              মোট {filteredCustomers.length} জন গ্রাহক | WhatsApp / IMO / SMS বাটনে
              ক্লিক করে নোটিশ পাঠান
            </p>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      ক্রমিক
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      ইউজার নেম/আইডি
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      মোবাইল নম্বর
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      গ্রাম
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      নোটিশ পাঠান
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((c, i) => (
                    <tr
                      key={c.id.toString()}
                      className="border-b border-border last:border-0 hover:bg-muted/20"
                      data-ocid={`notice.customer.item.${i + 1}`}
                    >
                      <td className="py-3 px-4 text-muted-foreground">
                        {i + 1}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {c.username || c.name}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground font-mono">
                        {c.phone}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-xs">
                        {normalizeVillage(c.address || "")}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1.5 flex-wrap">
                          {/* WhatsApp */}
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white h-7 px-2.5 text-xs"
                            onClick={() => openWhatsApp(c.phone)}
                            data-ocid={`notice.whatsapp.button.${i + 1}`}
                          >
                            <MessageCircle size={12} className="mr-1" />
                            WhatsApp
                          </Button>
                          {/* IMO */}
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white h-7 px-2.5 text-xs"
                            onClick={() => openIMO(c.phone)}
                            data-ocid={`notice.imo.button.${i + 1}`}
                          >
                            <MessageCircle size={12} className="mr-1" />
                            IMO
                          </Button>
                          {/* SMS */}
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2.5 text-xs border-orange-400 text-orange-600 hover:bg-orange-50"
                            onClick={() => openSMS(c.phone)}
                            data-ocid={`notice.sms.button.${i + 1}`}
                          >
                            <Phone size={12} className="mr-1" />
                            SMS
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredCustomers.length === 0 && (
                <p
                  className="text-center text-muted-foreground py-12"
                  data-ocid="notice.customer_list.empty_state"
                >
                  কোনো গ্রাহক পাওয়া যায়নি
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
