import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  ArrowLeftRight,
  Banknote,
  Calendar,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useActor } from "../hooks/useActor";
import { useCompanySettings } from "../hooks/useCompanySettings";
import { useExpenses } from "../hooks/useExpenses";
import { useLocalCustomers } from "../hooks/useLocalCustomers";

const BANGLA_MONTHS = [
  "জানু",
  "ফেব্রু",
  "মার্চ",
  "এপ্রি",
  "মে",
  "জুন",
  "জুলা",
  "আগস্ট",
  "সেপ্টে",
  "অক্টো",
  "নভে",
  "ডিসে",
];

const CATEGORY_COLORS = [
  "#22C55E",
  "#14B8A6",
  "#F97316",
  "#8B5CF6",
  "#EC4899",
  "#3B82F6",
  "#EAB308",
  "#06B6D4",
];

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

function getLast12Months(): Array<{
  year: number;
  month: number;
  label: string;
}> {
  const now = new Date();
  const result: Array<{ year: number; month: number; label: string }> = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push({
      year: d.getFullYear(),
      month: d.getMonth(),
      label: `${BANGLA_MONTHS[d.getMonth()]} ${d.getFullYear()}`,
    });
  }
  return result;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "10px 14px",
          fontFamily: "Noto Sans Bengali, sans-serif",
          fontSize: 12,
        }}
      >
        <p
          style={{
            fontWeight: 600,
            marginBottom: 6,
            color: "var(--foreground)",
          }}
        >
          {label}
        </p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.color, margin: "2px 0" }}>
            {entry.name}: ৳{Number(entry.value).toLocaleString("bn-BD")}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "10px 14px",
          fontFamily: "Noto Sans Bengali, sans-serif",
          fontSize: 12,
        }}
      >
        <p style={{ fontWeight: 600, color: payload[0].payload.fill }}>
          {payload[0].name}
        </p>
        <p style={{ color: "var(--foreground)" }}>
          ৳{Number(payload[0].value).toLocaleString("bn-BD")}
        </p>
      </div>
    );
  }
  return null;
};

type Page =
  | "dashboard"
  | "customers"
  | "finance"
  | "debts"
  | "network"
  | "settings"
  | "notice"
  | "call"
  | "idcard"
  | "socialmedia";

interface DashboardProps {
  isAdmin?: boolean;
  onNavigate?: (page: Page) => void;
}
export default function Dashboard({
  isAdmin = false,
  onNavigate: _onNavigate,
}: DashboardProps) {
  const { customers } = useLocalCustomers();
  const { expenses } = useExpenses();
  const { settings } = useCompanySettings();

  const { actor } = useActor();
  const [debtSummary, setDebtSummary] = useState({
    totalReceivables: 0,
    totalPayables: 0,
  });
  useEffect(() => {
    if (isAdmin && actor) {
      actor
        .getDebtSummary()
        .then((s) => setDebtSummary(s))
        .catch(() => {});
    }
  }, [isAdmin, actor]);

  const totalCustomers = customers.length;
  const expectedMonthly = customers.reduce((sum, c) => sum + c.monthlyFee, 0);

  const totalCommission = customers.reduce((sum, c) => {
    const periods = completedPeriods(c.connectionDate);
    return (
      sum +
      periods * Math.round((c.monthlyFee * (c.commissionPercent ?? 30)) / 100)
    );
  }, 0);

  const totalConnectionFeeDue = customers.reduce(
    (sum, c) => sum + c.connectionFeeDue,
    0,
  );
  const totalConnectionFeeCash = customers.reduce(
    (sum, c) => sum + c.connectionFeeCash,
    0,
  );
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const recentCustomers = [...customers]
    .sort((a, b) => Number(b.connectionDate - a.connectionDate))
    .slice(0, 5);

  // ── Monthly chart data ──
  const last12 = getLast12Months();
  const monthlyData = last12.map(({ year, month, label }) => {
    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59).getTime();
    const activeCustomers = customers.filter(
      (c) => Number(c.connectionDate / 1000000n) <= endOfMonth,
    );
    const income = activeCustomers.reduce((s, c) => s + c.monthlyFee, 0);
    const commission = activeCustomers.reduce(
      (s, c) =>
        s + Math.round((c.monthlyFee * (c.commissionPercent ?? 30)) / 100),
      0,
    );
    const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
    const expense = expenses
      .filter((e) => e.date?.startsWith(monthKey))
      .reduce((s, e) => s + e.amount, 0);
    return { label, income, commission, expense };
  });

  // ── Yearly chart data ──
  const yearsSet = new Set<number>();
  for (const c of customers) {
    const y = new Date(Number(c.connectionDate / 1000000n)).getFullYear();
    yearsSet.add(y);
  }
  for (const e of expenses) {
    if (e.date) yearsSet.add(Number(e.date.slice(0, 4)));
  }
  const years = Array.from(yearsSet).sort();
  if (years.length === 0) years.push(new Date().getFullYear());

  const yearlyData = years.map((year) => {
    let income = 0;
    let connectionFeeInYear = 0;
    for (const c of customers) {
      const connMs = Number(c.connectionDate / 1000000n);
      const connDate = new Date(connMs);
      const connYear = connDate.getFullYear();
      if (connYear === year) connectionFeeInYear += c.connectionFeeCash;
      const startMonth = connYear === year ? connDate.getMonth() : 0;
      const endMonth =
        year < new Date().getFullYear() ? 11 : new Date().getMonth();
      if (connYear <= year) {
        income += c.monthlyFee * Math.max(0, endMonth - startMonth + 1);
      }
    }
    const expense = expenses
      .filter((e) => e.date?.startsWith(String(year)))
      .reduce((s, e) => s + e.amount, 0);
    return {
      label: String(year),
      income: income + connectionFeeInYear,
      expense,
    };
  });

  // ── Category chart data ──
  const incomeBySource = [
    { name: "সংযোগ ফি", value: totalConnectionFeeCash },
    { name: "কমিশন", value: totalCommission },
  ];

  const expenseByCategoryMap: Record<string, number> = {};
  for (const e of expenses) {
    expenseByCategoryMap[e.category] =
      (expenseByCategoryMap[e.category] ?? 0) + e.amount;
  }
  const expenseByCategory = Object.entries(expenseByCategoryMap).map(
    ([name, value]) => ({ name, value }),
  );

  return (
    <div className="space-y-6" data-ocid="dashboard.page">
      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          className="shadow-card border-border dark:border-blue-500/30 dark:shadow-blue-500/10 dark:shadow-md"
          data-ocid="dashboard.kpi.item.1"
        >
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  মোট গ্রাহক
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {totalCustomers}
                </p>
                <p className="text-xs text-muted-foreground mt-1">জন</p>
              </div>
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="shadow-card border-border dark:border-teal-500/30 dark:shadow-teal-500/10 dark:shadow-md"
          data-ocid="dashboard.kpi.item.2"
        >
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  সংযোগ বাবদ আয়
                </p>
                <p className="text-3xl font-bold text-teal-600">
                  {formatCurrency(totalConnectionFeeCash)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  আদায়কৃত সংযোগ ফি
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-teal-500/10">
                <Banknote className="w-5 h-5 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="shadow-card border-border dark:border-green-500/30 dark:shadow-green-500/10 dark:shadow-md"
          data-ocid="dashboard.kpi.item.3"
        >
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  কমিশন বাবদ আয়
                </p>
                <p className="text-3xl font-bold text-success">
                  {formatCurrency(totalCommission)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  সংযোগ শুরু থেকে
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-success/10">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="shadow-card border-border dark:border-red-500/30 dark:shadow-red-500/10 dark:shadow-md"
          data-ocid="dashboard.kpi.item.4"
        >
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  মোট ব্যয়
                </p>
                <p className="text-3xl font-bold text-destructive">
                  {formatCurrency(totalExpenses)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  সকল খাত মিলিয়ে
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-destructive/10">
                <TrendingDown className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card
          className="shadow-card border-border dark:border-violet-500/30 dark:shadow-violet-500/10 dark:shadow-md"
          data-ocid="dashboard.kpi.item.5"
        >
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  এই মাসের প্রত্যাশিত আয়
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(expectedMonthly)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  প্রতি মাসে প্রত্যাশিত
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="shadow-card border-border dark:border-orange-500/30 dark:shadow-orange-500/10 dark:shadow-md"
          data-ocid="dashboard.kpi.item.6"
        >
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  মোট বকেয়া সংযোগ ফি
                </p>
                <p className="text-2xl font-bold text-destructive">
                  {formatCurrency(totalConnectionFeeDue)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  অপরিশোধিত বকেয়া
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-destructive/10">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Debt Summary Cards */}
      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card
            className="shadow-card border-border"
            data-ocid="dashboard.kpi.item.7"
          >
            <CardContent className="pt-5 pb-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    মোট প্রাপ্য বকেয়া
                  </p>
                  <p className="text-2xl font-bold text-teal-600">
                    {formatCurrency(debtSummary.totalReceivables)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    সংযোগ ফি ও কমিশন
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-teal-500/10">
                  <ArrowLeftRight className="w-5 h-5 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card
            className="shadow-card border-border"
            data-ocid="dashboard.kpi.item.8"
          >
            <CardContent className="pt-5 pb-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    মোট প্রদেয় বকেয়া
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatCurrency(debtSummary.totalPayables)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    টেকনিশিয়ান, হোলসেলার, অগ্রিম
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-orange-500/10">
                  <ArrowLeftRight className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Team Info Banner */}
      <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center">
        <p className="text-xs font-semibold text-muted-foreground shrink-0">
          কর্তৃপক্ষ:
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs text-foreground">
          <span>
            <span className="font-semibold">পরিচালক:</span>{" "}
            {settings.directorName}
          </span>
          <span>
            <span className="font-semibold">টেকনিশিয়ান:</span>{" "}
            {settings.technicianName}
          </span>
        </div>
      </div>

      {/* Tabbed Charts */}
      <Card
        className="shadow-card border-border"
        data-ocid="dashboard.chart.card"
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">
            আয়‑ব্যয় বিশ্লেষণ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly">
            <TabsList className="mb-4 bg-gray-100 dark:bg-gray-800 p-1 gap-1">
              <TabsTrigger
                value="monthly"
                data-ocid="dashboard.monthly.tab"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
              >
                মাসভিত্তিক
              </TabsTrigger>
              <TabsTrigger
                value="yearly"
                data-ocid="dashboard.yearly.tab"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-medium"
              >
                বছরভিত্তিক
              </TabsTrigger>
              <TabsTrigger
                value="category"
                data-ocid="dashboard.category.tab"
                className="data-[state=active]:bg-violet-600 data-[state=active]:text-white font-medium"
              >
                খাতভিত্তিক
              </TabsTrigger>
            </TabsList>

            {/* Monthly Tab */}
            <TabsContent value="monthly">
              <p className="text-xs text-muted-foreground mb-3">
                গত ১২ মাসের মাসিক আয় ও ব্যয়
              </p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={monthlyData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fontFamily: "Noto Sans Bengali" }}
                    angle={-40}
                    textAnchor="end"
                    interval={0}
                    height={70}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{
                      fontFamily: "Noto Sans Bengali",
                      fontSize: 12,
                      paddingTop: 8,
                    }}
                  />
                  <Bar
                    dataKey="income"
                    name="সংযোগ আয়"
                    fill="#22C55E"
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="commission"
                    name="কমিশন আয়"
                    fill="#14B8A6"
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="expense"
                    name="ব্যয়"
                    fill="#EF4444"
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            {/* Yearly Tab */}
            <TabsContent value="yearly">
              <p className="text-xs text-muted-foreground mb-3">
                বছরভিত্তিক মোট আয় ও ব্যয়
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={yearlyData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 12, fontFamily: "Noto Sans Bengali" }}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{
                      fontFamily: "Noto Sans Bengali",
                      fontSize: 12,
                      paddingTop: 8,
                    }}
                  />
                  <Bar
                    dataKey="income"
                    name="মোট আয়"
                    fill="#22C55E"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="expense"
                    name="মোট ব্যয়"
                    fill="#EF4444"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            {/* Category Tab */}
            <TabsContent value="category">
              <p className="text-xs text-muted-foreground mb-4">
                খাতভিত্তিক আয় ও ব্যয়ের চিত্র
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-semibold text-center mb-3 text-success">
                    আয়ের উৎস
                  </p>
                  {incomeBySource.every((d) => d.value === 0) ? (
                    <p className="text-center text-muted-foreground text-sm py-8">
                      কোনো আয় নেই
                    </p>
                  ) : (
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                          data={incomeBySource}
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                        >
                          <Cell key="c0" fill="#22C55E" />
                          <Cell key="c1" fill="#14B8A6" />
                        </Pie>
                        <Tooltip content={<PieTooltip />} />
                        <Legend
                          wrapperStyle={{
                            fontFamily: "Noto Sans Bengali",
                            fontSize: 12,
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-center mb-3 text-destructive">
                    ব্যয়ের খাত
                  </p>
                  {expenseByCategory.length === 0 ? (
                    <p className="text-center text-muted-foreground text-sm py-8">
                      কোনো ব্যয় নেই
                    </p>
                  ) : (
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                          data={expenseByCategory}
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                        >
                          {expenseByCategory.map((cat, idx) => (
                            <Cell
                              key={cat.name}
                              fill={
                                CATEGORY_COLORS[idx % CATEGORY_COLORS.length]
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<PieTooltip />} />
                        <Legend
                          wrapperStyle={{
                            fontFamily: "Noto Sans Bengali",
                            fontSize: 12,
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
