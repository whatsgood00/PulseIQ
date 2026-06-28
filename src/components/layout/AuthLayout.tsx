"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-background to-indigo-600/5" />
        <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px] dark:bg-violet-600/15" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <div className="relative hidden w-1/2 flex-col justify-between bg-gradient-to-br from-violet-600 to-indigo-700 p-12 text-white lg:flex">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
            <Activity className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold">PulseIQ</span>
        </Link>

        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Analytics that drive
            <br />
            smarter decisions.
          </h1>
          <p className="mt-4 max-w-md text-lg text-white/80">
            Real-time insights, beautiful dashboards, and enterprise-grade
            analytics for modern teams.
          </p>
        </div>

        <p className="text-sm text-white/60">
          Trusted by 2,400+ companies worldwide
        </p>
      </div>

      <div className="relative flex flex-1 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              Pulse<span className="text-gradient">IQ</span>
            </span>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
