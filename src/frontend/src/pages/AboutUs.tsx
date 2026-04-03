import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Users } from "lucide-react";
import { useCompanySettings } from "../hooks/useCompanySettings";

export default function AboutUs() {
  const { settings } = useCompanySettings();

  const team = [
    {
      title: "প্রতিষ্ঠাতা পরিচালক",
      name: settings.directorName,
      phone: "+8801607930157",
      email: "nousheen.broadband.internet@gmail.com",
    },
    {
      title: "টেকনিক্যাল ম্যানেজার",
      name: settings.technicianName,
      phone: "+8801648388329",
      email: "nousheen.broadband.internet@gmail.com",
    },
  ];

  return (
    <div className="space-y-6" data-ocid="aboutus.page">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground">আমাদের সম্পর্কে</h1>
        <p className="text-sm text-muted-foreground mt-1">
          প্রতিষ্ঠানের পরিচয় ও যোগাযোগ
        </p>
      </div>

      {/* Org info */}
      <Card className="shadow-card border-border" data-ocid="aboutus.org.card">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center gap-4">
            <div
              className="p-3 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #0a2463, #1c3f8c)",
              }}
            >
              <Users className="w-8 h-8" style={{ color: "#d4af37" }} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {settings.resellerName || settings.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {settings.companyBrand} এর একটি রিসেলার
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.map((member, i) => (
          <Card
            key={member.phone}
            className="shadow-card border-border"
            data-ocid={`aboutus.team.item.${i + 1}`}
            style={{ borderLeft: "4px solid #d4af37" }}
          >
            <CardContent className="pt-5 pb-5 space-y-3">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-1"
                  style={{ color: "#0a2463" }}
                >
                  {member.title}
                </p>
                <p className="text-base font-bold text-foreground">
                  {member.name}
                </p>
              </div>
              <div className="space-y-2">
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-ocid={`aboutus.team.phone.${i + 1}`}
                >
                  <Phone
                    className="w-4 h-4 shrink-0"
                    style={{ color: "#22C55E" }}
                  />
                  <span>{member.phone}</span>
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail
                    className="w-4 h-4 shrink-0"
                    style={{ color: "#3B82F6" }}
                  />
                  <span className="break-all">{member.email}</span>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Address */}
      <Card
        className="shadow-card border-border"
        data-ocid="aboutus.address.card"
        style={{ borderLeft: "4px solid #0a2463" }}
      >
        <CardContent className="pt-5 pb-5">
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-1"
            style={{ color: "#0a2463" }}
          >
            প্রতিষ্ঠানের ঠিকানা
          </p>
          <p className="text-base font-bold text-foreground">
            বালিগাঁও, অষ্টগ্রাম, কিশোরগঞ্জ
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
