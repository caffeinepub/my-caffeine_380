import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, DollarSign, UserCheck, Users } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLocalCustomers } from "../hooks/useLocalCustomers";

function formatDate(time: bigint): string {
  const ms = Number(time / 1000000n);
  return new Date(ms).toLocaleDateString("bn-BD");
}

function formatCurrency(amount: number): string {
  return `৳${amount.toLocaleString("bn-BD")}`;
}

function completedPeriods(connectionDate: bigint): number {
  const connectedMs = Number(connectionDate / 1000000n);
  const elapsed = Date.now() - connectedMs;
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  return Math.max(0, Math.floor(elapsed / thirtyDaysMs));
}

const kpiConfig = [
  {
    label: "মোট গ্রাহক",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
    suffix: "জন",
    id: "total",
  },
  {
    label: "সক্রিয় গ্রাহক",
    icon: UserCheck,
    color: "text-success",
    bg: "bg-success/10",
    suffix: "জন",
    id: "active",
  },
  {
    label: "মাসিক আয় (প্রত্যাশিত)",
    icon: DollarSign,
    color: "text-primary",
    bg: "bg-primary/10",
    suffix: "",
    id: "income",
  },
  {
    label: "মোট কমিশন",
    icon: AlertCircle,
    color: "text-success",
    bg: "bg-success/10",
    suffix: "",
    id: "commission",
  },
];

export default function Dashboard() {
  const { customers } = useLocalCustomers();

  const totalCustomers = customers.length;
  const activeCustomers = customers.length; // all are active
  const expectedMonthly = customers.reduce((sum, c) => sum + c.monthlyFee, 0);
  const totalCommission = customers.reduce((sum, c) => {
    const periods = completedPeriods(c.connectionDate);
    return (
      sum +
      periods * Math.round((c.monthlyFee * (c.commissionPercent ?? 30)) / 100)
    );
  }, 0);

  const kpiValues: Record<string, string | number> = {
    total: totalCustomers,
    active: activeCustomers,
    income: formatCurrency(expectedMonthly),
    commission: formatCurrency(totalCommission),
  };

  const recentCustomers = [...customers]
    .sort((a, b) => Number(b.connectionDate - a.connectionDate))
    .slice(0, 5);

  return (
    <div className="space-y-6" data-ocid="dashboard.page">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiConfig.map((card, i) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.id}
              className="shadow-card border-border"
              data-ocid={`dashboard.kpi.item.${i + 1}`}
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-2">
                      {card.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {kpiValues[card.id]}
                    </p>
                    {card.suffix && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {card.suffix}
                      </p>
                    )}
                  </div>
                  <div className={`p-2.5 rounded-xl ${card.bg}`}>
                    <Icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart */}
      <Card
        className="shadow-card border-border"
        data-ocid="dashboard.chart.card"
      >
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            নেটওয়ার্ক ও পেমেন্ট অ্যানালিটিক্স
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={[]}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fontFamily: "Noto Sans Bengali" }}
              />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  fontFamily: "Noto Sans Bengali",
                  fontSize: 12,
                  borderRadius: 8,
                }}
              />
              <Legend
                wrapperStyle={{ fontFamily: "Noto Sans Bengali", fontSize: 12 }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="customers"
                name="গ্রাহক সংখ্যা"
                stroke="#2563EB"
                strokeWidth={2}
                fill="url(#colorCustomers)"
                dot={{ r: 3, fill: "#2563EB" }}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="income"
                name="আয় (৳)"
                stroke="#22C55E"
                strokeWidth={2}
                fill="url(#colorIncome)"
                dot={{ r: 3, fill: "#22C55E" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Customers */}
      <Card
        className="shadow-card border-border"
        data-ocid="dashboard.recent_customers.card"
      >
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            সাম্প্রতিক গ্রাহক
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground">
                    নাম
                  </th>
                  <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground">
                    ফোন
                  </th>
                  <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground">
                    গ্রাম
                  </th>
                  <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground">
                    প্যাকেজ
                  </th>
                  <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground">
                    যোগদান
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentCustomers.map((c, i) => (
                  <tr
                    key={c.id.toString()}
                    className="border-b border-border last:border-0 hover:bg-muted/30"
                    data-ocid={`dashboard.recent_customers.item.${i + 1}`}
                  >
                    <td className="py-2.5 px-3 font-medium">{c.username}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      {c.phone}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      {c.village}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      ৳{c.monthlyFee}/মাস
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      {formatDate(c.connectionDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentCustomers.length === 0 && (
              <p
                className="text-center text-muted-foreground py-8"
                data-ocid="dashboard.recent_customers.empty_state"
              >
                কোনো গ্রাহক পাওয়া যায়নি
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
