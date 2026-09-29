"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JOBS_DATA } from "@/data/mockData";

const CARD_STYLES = [
  { rotate: "-6deg", top: "0%", left: "4%", z: 10 },
  { rotate: "4deg", top: "6%", left: "30%", z: 20 },
  { rotate: "-3deg", top: "0%", left: "56%", z: 10 },
  { rotate: "7deg", top: "10%", left: "80%", z: 5 },
];

export const NewJobsFloating: React.FC = () => {
  const featured = JOBS_DATA.slice(0, 4);

  return (
    <section className="w-full bg-canvas-warm pb-16 sm:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[220px] sm:h-[240px] mb-10">
          {featured.map((job, idx) => {
            const style = CARD_STYLES[idx];
            return (
              <div
                key={job.id}
                className="hidden sm:block absolute w-44 rounded-lg bg-white shadow-elevation-raised p-3.5 border border-black/5"
                style={{
                  top: style.top,
                  left: style.left,
                  transform: `rotate(${style.rotate})`,
                  zIndex: style.z,
                }}
              >
                <div className="h-7 w-7 rounded-md bg-canvas-warm flex items-center justify-center text-[11px] font-bold text-ink-display mb-2">
                  {job.company.substring(0, 2).toUpperCase()}
                </div>
                <p className="text-xs font-bold text-ink-display leading-snug">{job.title}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="text-[10px] text-muted">{job.type}</span>
                  <span className="text-[10px] text-muted">·</span>
                  <span className="text-[10px] text-muted">{job.experience}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-hairline flex items-center justify-between">
                  <span className="text-[11px] font-bold text-ink-display">{job.salary.split(" - ")[0]}/yr</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center max-w-lg mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-display tracking-tight">
            New jobs everyday
          </h2>
          <p className="mt-2 text-sm text-muted">
            4,053+ verified openings refresh daily across Hyderabad and Telangana&apos;s top hiring partners.
          </p>
          <Link
            href="/jobs"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-ink-display hover:gap-2.5 transition-all"
          >
            Browse all jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
