"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  CreditCard,
  Code2,
  Moon,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const features = [
  {
    icon: BarChart3,
    title: "Real-time analytics",
    description: "Revenue, users, and conversion charts with daily, weekly, and monthly views.",
  },
  {
    icon: Bell,
    title: "Smart notifications",
    description: "Billing alerts, milestones, and team updates in a polished inbox UI.",
  },
  {
    icon: CreditCard,
    title: "Subscription billing",
    description: "Pricing tiers, plan comparison, and upgrade flows built for SaaS products.",
  },
  {
    icon: Moon,
    title: "Dark & light mode",
    description: "Theme persistence with zero flash — polished for day and night use.",
  },
];

const stack = ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts", "Zustand"];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px] dark:bg-violet-600/20" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-indigo-600/10 blur-[100px]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Pulse<span className="text-gradient">IQ</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm">
              Open demo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <section className="pt-16 text-center md:pt-24">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            Portfolio project · Frontend demo with mock data
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-6xl md:leading-[1.1]"
          >
            Analytics dashboards
            <br />
            <span className="text-gradient">built to impress</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            PulseIQ is a polished SaaS analytics UI — charts, auth flows, billing, settings,
            and notifications. Crafted with modern React patterns and production-grade design.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/dashboard">
              <Button size="lg">
                <Zap className="h-4 w-4" />
                Explore dashboard
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Try auth flow
              </Button>
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-2"
          >
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-lg border border-border bg-card/50 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 overflow-hidden rounded-2xl border border-border bg-card/50 shadow-glow backdrop-blur"
        >
          <div className="border-b border-border bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 text-xs text-muted-foreground">pulseiq.app/dashboard</span>
            </div>
          </div>
          <div className="grid gap-4 p-6 md:grid-cols-4">
            {[
              { label: "Revenue", value: "$892K", change: "+18.7%" },
              { label: "Active Users", value: "28.4K", change: "+14.3%" },
              { label: "Conversion", value: "3.28%", change: "-0.4%" },
              { label: "MRR", value: "$52K", change: "+5.1%" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-background/60 p-4">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-emerald-500">{stat.change}</p>
              </div>
            ))}
          </div>
          <div className="mx-6 mb-6 h-40 rounded-xl border border-border bg-gradient-to-br from-violet-500/10 via-transparent to-indigo-500/10" />
        </motion.section>

        <section className="mt-24 grid gap-6 md:grid-cols-2">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 rounded-2xl border border-primary/20 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 p-10 text-center"
        >
          <h2 className="text-2xl font-bold md:text-3xl">Ready to explore?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Jump into the full dashboard — no signup required. All data is mocked for demo purposes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button size="lg">
                Launch dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a
              href="https://github.com/whatsgood00/PulseIQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                <Code2 className="h-4 w-4" />
                View on GitHub
              </Button>
            </a>
          </div>
        </motion.section>
      </main>

      <footer className="relative z-10 border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>PulseIQ · Frontend portfolio project · Built with Next.js</p>
      </footer>
    </div>
  );
}
