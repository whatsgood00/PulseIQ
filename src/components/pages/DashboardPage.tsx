"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/dashboard/StatCard";
import { TimeRangeFilter } from "@/components/dashboard/TimeRangeFilter";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { UsersChart } from "@/components/charts/UsersChart";
import { ConversionChart } from "@/components/charts/ConversionChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatsSkeleton, ChartSkeleton } from "@/components/ui/Skeleton";
import { api, graphql, type TimeRange } from "@/lib/mock-api";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { useToastStore } from "@/stores/toast-store";
import { Button } from "@/components/ui/Button";
import { RefreshCw } from "lucide-react";

export function DashboardPage() {
  const [range, setRange] = useState<TimeRange>("weekly");
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Awaited<ReturnType<typeof api.getAnalytics>>["summary"] | null>(null);
  const [chartData, setChartData] = useState<Awaited<ReturnType<typeof api.getAnalytics>>["data"]>([]);
  const addToast = useToastStore((s) => s.addToast);

  const fetchData = useCallback(async (r: TimeRange) => {
    try {
      const [rest, gql] = await Promise.all([
        api.getAnalytics(r),
        graphql.query<{ analytics: typeof summary; chartData: typeof chartData }>("GetDashboard", { range: r }),
      ]);
      setSummary(rest.summary);
      setChartData(gql.chartData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData(range);
  }, [range, fetchData]);

  const handleRangeChange = (r: TimeRange) => {
    setLoading(true);
    setRange(r);
  };

  const handleRefresh = () => {
    setLoading(true);
    void fetchData(range).then(() => {
      addToast({ type: "success", title: "Data refreshed", message: "Analytics updated via REST + GraphQL" });
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold tracking-tight"
          >
            Dashboard
          </motion.h1>
          <p className="text-sm text-muted-foreground">
            Real-time analytics overview
          </p>
        </div>
        <div className="flex items-center gap-3">
          <TimeRangeFilter value={range} onChange={handleRangeChange} />
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {loading || !summary ? (
        <StatsSkeleton />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Revenue" value={formatCurrency(summary.revenue.value)} change={summary.revenue.change} index={0} />
          <StatCard title="Active Users" value={formatNumber(summary.users.value)} change={summary.users.change} index={1} />
          <StatCard title="Conversion Rate" value={`${summary.conversionRate.value}%`} change={summary.conversionRate.change} index={2} />
          <StatCard title="MRR" value={formatCurrency(summary.mrr.value)} change={summary.mrr.change} index={3} />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <ChartSkeleton /> : <RevenueChart data={chartData} />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <ChartSkeleton /> : <UsersChart data={chartData} />}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <ChartSkeleton /> : <ConversionChart data={chartData} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
