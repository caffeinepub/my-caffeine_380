import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
import { ServiceStatus } from "../backend";
import { chartData, sampleCustomers, samplePayments } from "../data/sampleData";
import { useCustomers, usePayments } from "../hooks/useQueries";

const statusLabel: Record<string, string> = {
  active: "সক্রিয়",
  inactive: "নিষ্ক্রিয়",
  suspended: "স্থগিত",
};

const statusColor: Record<string, string> = {
  active: "bg-success/15 text-success",
  inactive: "bg-muted text-muted-foreground",
  suspended: "bg-destructive/15 text-destructive",
};

function formatDate(time: bigint): string {
  const ms = Number(time / 1000000n);
  return new Date(ms).toLocaleDateString("bn-BD");
}

function formatCurrency(amount: number): string {
  return `৳${amount.toLocaleString("bn-BD")}`;
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
    label: "মাসিক আয়",
    icon: DollarSign,
    color: "text-primary",
    bg: "bg-primary/10",
    suffix: "",
    id: "income",
  },
  {
    label: "মোট বকেয়া",
    icon: AlertCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    suffix: "",
    id: "due",
  },
];

export default function Dashboard() {
  const { data: customers, isLoading: cLoading } = useCustomers();
  const { data: payments, isLoading: pLoading } = usePayments();

  const allCustomers =
    customers && customers.length > 0 ? customers : sampleCustomers;
  const allPayments =
    payments && payments.length > 0 ? payments : samplePayments;

  const totalCustomers = allCustomers.length;
  const activeCustomers = allCustomers.filter(
    (c) => c.status === ServiceStatus.active,
  ).length;
  const totalDue = allCustomers.reduce((sum, c) => sum + c.dueAmount, 0);
  const monthlyIncome = allPayments
    .filter((p) => p.month === 3n && p.year === 2026n)
    .reduce((sum, p) => sum + p.amount, 0);

  const kpiValues: Record<string, string | number> = {
    total: totalCustomers,
    active: activeCustomers,
    income: formatCurrency(monthlyIncome || 5400),
    due: formatCurrency(totalDue || 2100),
  };

  const recentCustomers = [...allCustomers]
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
                    {cLoading && pLoading ? (
                      <Skeleton className="h-9 w-24" />
                    ) : (
                      <p className="text-3xl font-bold text-foreground">
                        {kpiValues[card.id]}
                      </p>
                    )}
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
              data={chartData}
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
          {cLoading ? (
            <div
              className="space-y-3"
              data-ocid="dashboard.recent_customers.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
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
                      এলাকা
                    </th>
                    <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground">
                      স্ট্যাটাস
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
                      <td className="py-2.5 px-3 font-medium">{c.name}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">
                        {c.phone}
                      </td>
                      <td className="py-2.5 px-3 text-muted-foreground">
                        {c.area}
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[c.status]}`}
                        >
                          {statusLabel[c.status]}
                        </span>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
