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
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  Copy,
  FileDown,
  Megaphone,
  MessageCircle,
  Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { sampleCustomers } from "../data/sampleData";
import { useCompanySettings } from "../hooks/useCompanySettings";
import { useCustomers } from "../hooks/useQueries";
import type { ExtendedCustomer } from "../types/extended";
import { printDocument } from "../utils/printDocument";

const ISSUE_TYPES = [
  "লাইনে সমস্যা",
  "মেইনটেন্যান্স কাজ",
  "বিদ্যুৎ বিভ্রাট",
  "নেটওয়ার্ক আপগ্রেড",
  "অন্যান্য",
];

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

export default function NoticePage() {
  const { data: customers } = useCustomers();
  const { settings } = useCompanySettings();

  const rawCustomers =
    customers && customers.length > 0
      ? (customers as unknown as ExtendedCustomer[])
      : sampleCustomers;

  const [issueType, setIssueType] = useState(ISSUE_TYPES[0]);
  const [area, setArea] = useState("");
  const [startTime, setStartTime] = useState("");
  const [restoreTime, setRestoreTime] = useState("");
  const [notes, setNotes] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const orgName = settings.name || "নওশীন ব্রডব্যান্ড ইন্টারনেট";

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
    const cleaned = mobile.replace(/[^0-9]/g, "");
    const url = `https://wa.me/88${cleaned}?text=${encodeURIComponent(noticeText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-6" data-ocid="notice.page">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10">
          <Megaphone className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">নোটিশ বোর্ড</h2>
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

      {/* Customer Send List */}
      {generated && (
        <Card
          className="shadow-card border-border"
          data-ocid="notice.customer_list.card"
        >
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">
              গ্রাহকদের নোটিশ পাঠান
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              WhatsApp বাটনে ক্লিক করলে সেই নম্বরে নোটিশ সহ WhatsApp খুলবে। কপি বাটনে
              ক্লিক করলে নোটিশ ক্লিপবোর্ডে কপি হবে।
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      ক্রমিক
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      ইউজার নেম/ইউজার আইডি
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      মোবাইল নম্বর
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      পাঠান
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rawCustomers.map((c, i) => (
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
                      <td className="py-3 px-4">
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white h-7 px-2.5 text-xs"
                            onClick={() => openWhatsApp(c.phone)}
                            data-ocid={`notice.whatsapp.button.${i + 1}`}
                          >
                            <MessageCircle size={12} className="mr-1" />
                            WhatsApp
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2.5 text-xs"
                            onClick={() =>
                              copyToClipboard(
                                noticeText,
                                `copy-${c.id.toString()}`,
                              )
                            }
                            data-ocid={`notice.copy.button.${i + 1}`}
                          >
                            {copiedId === `copy-${c.id.toString()}` ? (
                              <Check size={12} className="mr-1 text-success" />
                            ) : (
                              <Copy size={12} className="mr-1" />
                            )}
                            কপি
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {rawCustomers.length === 0 && (
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
