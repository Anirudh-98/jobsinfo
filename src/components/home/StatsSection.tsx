"use client";

import React from "react";
import { Users, FileText, Building2, Target, Info } from "lucide-react";
import { STATS } from "@/data/homeContent";
import { CountUp, Reveal, Eyebrow } from "@/components/home/shared";
import { LatestJobsTable } from "@/components/home/LatestJobsTable";
import { IntroVideo } from "@/components/home/IntroVideo";

const ICONS: Record<(typeof STATS)[number]["key"], React.ElementType> = {
  seekers: Users,
  vacancies: FileText,
  employers: Building2,
  placed: Target,
};

export const StatsSection: React.FC = () => (
  <section className="pt-16 sm:pt-20 pb-4" aria-labelledby="stats-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title + intro on the left, small intro video in the top-right corner */}
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="max-w-2xl">
          <Eyebrow>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            Platform overview · Updated daily
          </Eyebrow>
          <h2 id="stats-title" className="mt-4 text-[28px] sm:text-[40px] font-bold leading-[1.1] tracking-[-0.025em] text-ink text-balance">
            The Global Career, Bussiness<span className="text-primary"> & Leadership Ecosystem.</span>
          </h2>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-body text-pretty">
            Live counts of the people and opportunities on Jobsinfo.world — plus the latest verified openings you can apply to right now.
          </p>
        </div>
        <IntroVideo className="max-w-[340px] lg:w-[300px]" />
      </div>

      <Reveal className="mt-12">
        <div className="card-soft overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => {
              const Icon = ICONS[s.key];
              return (
                <div
                  key={s.key}
                  className={`group relative p-5 sm:p-7 transition-colors hover:bg-primary-light/30 ${
                    i % 2 === 1 ? "border-l border-hairline" : ""
                  } ${i >= 2 ? "border-t lg:border-t-0 border-hairline" : ""} ${i === 2 ? "lg:border-l" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-light text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <Info className="h-4 w-4 text-muted group-hover:text-primary transition-colors" aria-hidden />
                  </div>
                  <p className="mt-5 text-[28px] sm:text-[36px] font-bold leading-none tracking-tight tabular-nums text-ink">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-[14px] font-semibold text-ink">{s.label}</p>
                  <p className="mt-0.5 text-[12.5px] text-body">{s.sub}</p>
                  <p className="mt-3 rounded-lg bg-surface-soft px-2.5 py-2 text-[12px] leading-snug text-body transition-colors group-hover:bg-primary group-hover:text-white">
                    <span className="font-semibold">Why this matters:</span> {s.insight}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <LatestJobsTable />
      </Reveal>
    </div>
  </section>
);
