"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ACTIVITY as SERIES, ActivityRange } from "@/data/dashboardData";

const RANGES = Object.keys(SERIES) as ActivityRange[];

// Applications rise above the baseline, interviews hang below it — same idea as the reference chart.
export const ApplicationChart: React.FC = () => {
  const [range, setRange] = useState<ActivityRange>("Monthly");
  const { points, current, max } = SERIES[range];
  const [active, setActive] = useState(current);
  const ticks = [max, Math.round((max * 2) / 3), Math.round(max / 3), 0];
  const interviewMax = Math.max(...points.map((p) => p.interviews), 1);

  const switchRange = (r: ActivityRange) => {
    setRange(r);
    setActive(SERIES[r].current);
  };

  return (
    <div className="card-soft p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <h2 className="text-[16px] font-semibold text-ink">Application statistics</h2>
        <div className="ml-auto flex items-center gap-4 text-[12px] text-body">
          <span className="hidden items-center gap-1.5 sm:flex">
            <span className="h-2 w-2 rounded-full bg-primary" /> Applications sent
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <span className="h-2 w-2 rounded-full bg-orange-400" /> Interviews
          </span>
          <div className="flex rounded-full border border-hairline bg-surface-soft/60 p-0.5" role="group" aria-label="Chart range">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={range === r}
                onClick={() => switchRange(r)}
                className={cn(
                  "rounded-full px-3 py-1 text-[12px] font-medium transition-colors cursor-pointer",
                  range === r ? "bg-white text-primary shadow-[0_4px_12px_-6px_rgba(30,64,175,0.5)]" : "text-body hover:text-ink"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex">
        {/* Y axis */}
        <div className="relative h-[220px] w-7 shrink-0 text-[10.5px] tabular-nums text-muted" aria-hidden>
          {ticks.map((t, k) => (
            <span key={t} className="absolute left-0 -translate-y-1/2" style={{ top: `${(k / (ticks.length - 1)) * 100}%` }}>
              {t}
            </span>
          ))}
        </div>

        <div className="relative min-w-0 flex-1">
          {/* Grid lines */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px]" aria-hidden>
            {ticks.map((t, k) => (
              <span
                key={t}
                className={cn("absolute inset-x-0 border-t", k === ticks.length - 1 ? "border-hairline" : "border-dashed border-hairline/80")}
                style={{ top: `${(k / (ticks.length - 1)) * 100}%` }}
              />
            ))}
          </div>

          <div className="relative flex gap-1 sm:gap-2" onMouseLeave={() => setActive(current)}>
            {points.map((p, i) => {
              const isActive = i === active;
              const flip = i >= points.length - 3;
              if (i > current) {
                // Future period: an empty dashed slot keeps the axis complete.
                return (
                  <div key={p.label} className="flex min-w-0 flex-1 flex-col items-center" aria-hidden>
                    <span className="flex h-[220px] w-full items-end justify-center">
                      <span className="h-6 w-full max-w-[38px] rounded-t-full border border-b-0 border-dashed border-primary/20" />
                    </span>
                    <span className="h-[44px]" />
                    <span className="mt-2 text-[10.5px] text-muted/60 sm:text-[11px]">{p.label}</span>
                  </div>
                );
              }
              return (
                <button
                  key={p.label}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-label={`${p.label}: ${p.applied} applications, ${p.interviews} interviews`}
                  className="group relative flex min-w-0 flex-1 cursor-pointer flex-col items-center focus-visible:outline-none"
                >
                  {/* Applications (above baseline) */}
                  <span className="flex h-[220px] w-full items-end justify-center">
                    <span
                      className={cn(
                        "w-full max-w-[38px] rounded-t-full transition-all duration-300",
                        isActive
                          ? "bg-gradient-to-b from-primary to-sky-400 shadow-[0_12px_24px_-10px_rgba(37,99,235,0.7)]"
                          : "bg-gradient-to-b from-primary/20 to-primary/[0.04] group-hover:from-primary/30 group-focus-visible:from-primary/30"
                      )}
                      style={{ height: `${Math.max((p.applied / max) * 100, 4)}%` }}
                    />
                  </span>
                  {/* Interviews (below baseline) */}
                  <span className="flex h-[44px] w-full items-start justify-center">
                    <span
                      className={cn(
                        "w-full max-w-[38px] rounded-b-full transition-all duration-300",
                        isActive ? "bg-gradient-to-t from-orange-300/40 to-orange-400" : "bg-orange-400/10"
                      )}
                      style={{ height: `${(p.interviews / interviewMax) * 100}%` }}
                    />
                  </span>
                  <span className={cn("mt-2 text-[10.5px] sm:text-[11px]", isActive ? "font-semibold text-primary" : "text-muted")}>
                    {p.label}
                  </span>

                  {isActive && (
                    <>
                      <span
                        className="absolute left-1/2 z-10 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-white bg-ink shadow"
                        style={{ bottom: `calc(44px + 1.5rem + ${(p.applied / max) * 220}px)` }}
                        aria-hidden
                      />
                      <span
                        className={cn(
                          "absolute z-20 hidden w-[148px] rounded-xl border border-hairline bg-white p-2.5 text-left text-[11.5px] shadow-[0_16px_32px_-16px_rgba(15,23,42,0.45)] sm:block",
                          flip ? "right-[calc(50%+14px)]" : "left-[calc(50%+14px)]"
                        )}
                        style={{ bottom: `calc(44px + 1.5rem + ${(p.applied / max) * 220}px - 24px)` }}
                        aria-hidden
                      >
                        <span className="block text-[10.5px] font-semibold uppercase tracking-wide text-muted">{p.label}</span>
                        <span className="mt-1 flex items-center justify-between text-body">
                          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Applied</span>
                          <b className="tabular-nums text-ink">{p.applied}</b>
                        </span>
                        <span className="mt-1 flex items-center justify-between text-body">
                          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-orange-400" />Interviews</span>
                          <b className="tabular-nums text-ink">{p.interviews}</b>
                        </span>
                      </span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
