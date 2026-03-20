import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, PhoneCall, Search, Users } from "lucide-react";
import { useState } from "react";
import { useLocalCustomers } from "../hooks/useLocalCustomers";
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

export default function CallCenter() {
  const { customers } = useLocalCustomers();
  const isLoading = false;
  const [search, setSearch] = useState("");
  const [selectedVillages, setSelectedVillages] = useState<Set<string>>(
    new Set(),
  );

  const allCustomers = customers;

  function toggleVillage(v: string) {
    setSelectedVillages((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  }

  const filtered = allCustomers.filter((c) => {
    const villageMatch =
      selectedVillages.size === 0 || selectedVillages.has(c.village ?? "");
    const q = search.trim().toLowerCase();
    const searchMatch =
      !q ||
      (c.username ?? "").toLowerCase().includes(q) ||
      (c.cidNumber ?? "").toLowerCase().includes(q) ||
      (c.carnivalId ?? "").toLowerCase().includes(q) ||
      (c.phone ?? "").includes(q);
    return villageMatch && searchMatch;
  });

  function handleCall(phone: string) {
    window.location.href = `tel:${phone}`;
  }

  return (
    <div className="space-y-6" data-ocid="call.page">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10">
          <Phone className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">কল সেন্টার</h2>
          <p className="text-xs text-muted-foreground">
            গ্রাহক খুঁজে বের করে সরাসরি কল করুন
          </p>
        </div>
      </div>

      <Card className="shadow-card border-border" data-ocid="call.filter.card">
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
                  id={`village-${v}`}
                  checked={selectedVillages.has(v)}
                  onCheckedChange={() => toggleVillage(v)}
                  data-ocid="call.filter.checkbox"
                />
                <Label
                  htmlFor={`village-${v}`}
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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="নাম, সিআইডি নম্বর, কার্নিভাল আইডি বা মোবাইল নম্বর দিয়ে সার্চ করুন..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="call.search_input"
        />
      </div>

      {/* Results */}
      <Card className="shadow-card border-border" data-ocid="call.results.card">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">গ্রাহক তালিকা</CardTitle>
          <Badge variant="secondary" className="text-xs">
            <Users className="w-3 h-3 mr-1" />
            {filtered.length} জন
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div
              className="py-12 text-center text-muted-foreground"
              data-ocid="call.loading_state"
            >
              লোড হচ্ছে...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center" data-ocid="call.empty_state">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 rounded-full bg-muted/40">
                  <Phone className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  কোনো গ্রাহক পাওয়া যায়নি
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      #
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      ইউজার নেম/ইউজার আইডি
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      কার্নিভাল আইডি
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      সিআইডি নম্বর
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      মোবাইল নম্বর
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      গ্রাম
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      কল
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr
                      key={c.id.toString()}
                      className="border-b border-border last:border-0 hover:bg-muted/20"
                      data-ocid={`call.customer.item.${i + 1}`}
                    >
                      <td className="py-3 px-4 text-muted-foreground">
                        {i + 1}
                      </td>
                      <td className="py-3 px-4 font-medium">{c.username}</td>
                      <td className="py-3 px-4 text-muted-foreground font-mono text-xs">
                        {c.carnivalId || "—"}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground font-mono text-xs">
                        {c.cidNumber || "—"}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs">{c.phone}</td>
                      <td className="py-3 px-4 text-muted-foreground text-xs">
                        {c.address || c.village || "—"}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white h-8 px-3 text-xs gap-1.5"
                          onClick={() => handleCall(c.phone)}
                          data-ocid={`call.call.button.${i + 1}`}
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          কল করুন
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
