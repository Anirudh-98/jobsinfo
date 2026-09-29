import React from "react";
import { Send, CalendarCheck, Award, MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type Stat = {
  label: string;
  value: number;
  /** Change vs last month, in percent. */
  change: number;
  /** Last five weeks of activity, 0–5, drawn as a dot matrix. */
  weeks: number[];
  tone: "blue" | "sky" | "emerald";
};

const TONES = {
  blue: { chip: "bg-primary-light text-primary", dot: "bg-primary" },
  sky: { chip: "bg-sky-100 text-sky-600", dot: "bg-sky-500" },
  emerald: { chip: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
};

const ICONS = { blue: Send, sky: CalendarCheck, emerald: Award };

// Columns of five dots; filled dots show the week's level, the latest week at full strength.
const DotMatrix: React.FC<{ weeks: number[]; dot: string }> = ({ weeks, dot }) => (
  <div className="flex gap-[3px]" aria-hidden>
    {weeks.map((level, w) => (
      <div key={w} className="flex flex-col-reverse gap-[3px]">
        {Array.from({ length: 5 }, (_, d) => (
          <span
            key={d}
            className={cn(
              "h-[5px] w-[5px] rounded-full",
              d < level ? dot : "bg-surface-strong",
              d < level && w < weeks.length - 1 && "opacity-35"
            )}
          />
        ))}
      </div>
    ))}
  </div>
);

export const StatCards: React.FC<{ stats: Stat[] }> = ({ stats }) => (
  <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
    {stats.map((s) => {
      const tone = TONES[s.tone];
      const Icon = ICONS[s.tone];
      const up = s.change >= 0;
      return (
        <div key={s.label} className="card-soft p-4 sm:p-5">
          <div className="flex items-center gap-2.5">
            <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", tone.chip)}>
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <p className="min-w-0 truncate text-[13px] font-medium text-ink-light">{s.label}</p>
            <span className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-full border border-hairline text-muted" aria-hidden>
              <MoreHorizontal className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[26px] font-bold leading-none tracking-tight tabular-nums text-ink">{s.value}</p>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums",
                    up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  )}
                >
                  {up ? <TrendingUp className="h-3 w-3" aria-hidden /> : <TrendingDown className="h-3 w-3" aria-hidden />}
                  {Math.abs(s.change)}%
                </span>
              </div>
              <p className="mt-2 text-[11.5px] text-muted">vs last month</p>
            </div>
            <DotMatrix weeks={s.weeks} dot={tone.dot} />
          </div>
        </div>
      );
    })}
  </div>
);
