"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Check, Zap, Building2 } from "lucide-react";
import { useToastStore } from "@/stores/toast-store";
import { mockUser } from "@/lib/mock-api";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    description: "For small teams getting started",
    icon: Zap,
    features: ["Up to 10K events/mo", "3 team members", "7-day data retention", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 99,
    description: "For growing businesses",
    icon: Check,
    popular: true,
    features: ["Up to 500K events/mo", "Unlimited team members", "90-day data retention", "Priority support", "Custom dashboards", "API access"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 299,
    description: "For large organizations",
    icon: Building2,
    features: ["Unlimited events", "SSO & SAML", "1-year data retention", "Dedicated support", "SLA guarantee", "Custom integrations"],
  },
];

export default function BillingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const addToast = useToastStore((s) => s.addToast);

  const handleUpgrade = (plan: string) => {
    addToast({
      type: "success",
      title: "Plan updated",
      message: `Switched to ${plan} plan successfully`,
    });
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Billing</h1>
          <p className="text-sm text-muted-foreground">
            Manage your subscription and payment methods
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current plan</p>
              <p className="text-xl font-bold capitalize">{mockUser.plan}</p>
              <p className="text-sm text-muted-foreground">$99/month · Renews Jul 28, 2025</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Manage payment</Button>
              <Button variant="outline" size="sm">View invoices</Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
            {(["monthly", "annual"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={cn(
                  "rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors",
                  billing === b ? "bg-card shadow-sm" : "text-muted-foreground"
                )}
              >
                {b}
                {b === "annual" && (
                  <span className="ml-1.5 text-xs text-emerald-600">-20%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const price = billing === "annual" ? Math.round(plan.price * 0.8) : plan.price;
            const isCurrent = mockUser.plan === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={cn(
                    "relative h-full",
                    plan.popular && "border-primary shadow-glow"
                  )}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                      Most popular
                    </span>
                  )}
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    <div className="pt-2">
                      <span className="text-4xl font-bold">${price}</span>
                      <span className="text-muted-foreground">/mo</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={isCurrent ? "outline" : "primary"}
                      disabled={isCurrent}
                      onClick={() => handleUpgrade(plan.name)}
                    >
                      {isCurrent ? "Current plan" : `Upgrade to ${plan.name}`}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
