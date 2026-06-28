"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TimeRange } from "@/lib/mock-api";

const ranges: { value: TimeRange; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

interface TimeRangeFilterProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

export function TimeRangeFilter({ value, onChange }: TimeRangeFilterProps) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={cn(
            "relative rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
            value === range.value
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {value === range.value && (
            <motion.div
              layoutId="range-filter"
              className="absolute inset-0 rounded-md bg-card shadow-sm"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative">{range.label}</span>
        </button>
      ))}
    </div>
  );
}
