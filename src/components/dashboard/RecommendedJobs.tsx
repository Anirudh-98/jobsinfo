"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, Bookmark, MapPin, MoreHorizontal, Search } from "lucide-react";
import { JOBS_DATA, Job } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const SHOWN = 2;

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

// Right-rail list of jobs the student hasn't applied to yet, searchable in place.
export const RecommendedJobs: React.FC = () => {
  const { applications, savedJobIds, toggleSaveJob, setSelectedJobForModal, setIsQuickApplyOpen } = useApp();
  const [query, setQuery] = useState("");

  const jobs = useMemo(() => {
    const applied = new Set(applications.map((a) => a.jobId));
    const q = query.trim().toLowerCase();
    return JOBS_DATA.filter(
      (j) => !applied.has(j.id) && (!q || [j.title, j.company, j.location, j.category].some((v) => v.toLowerCase().includes(q)))
    ).slice(0, SHOWN);
  }, [applications, query]);

  const apply = (job: Job) => {
    setSelectedJobForModal(job);
    setIsQuickApplyOpen(true);
  };

  return (
    <div className="card-soft flex flex-col p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-ink">Recommended jobs</h2>
        <span className="grid h-7 w-7 place-items-center rounded-full border border-hairline text-muted" aria-hidden>
          <MoreHorizontal className="h-3.5 w-3.5" />
        </span>
      </div>

      <label className="relative mt-4 block">
        <span className="sr-only">Search recommended jobs</span>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anything here…"
          className="h-11 w-full rounded-full border border-hairline bg-surface-soft/60 pl-10 pr-4 text-[13px] text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
        />
      </label>

      <ul className="mt-4 space-y-3">
        {jobs.map((job, i) => {
          const saved = savedJobIds.includes(job.id);
          return (
            <li
              key={job.id}
              className={cn(
                "rounded-2xl border p-4 transition-colors",
                i === 0 ? "border-primary/10 bg-gradient-to-br from-[#e8f0ff] to-[#f5f9ff]" : "border-hairline bg-white hover:border-primary/25"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[12px] font-bold text-primary shadow-[0_4px_12px_-6px_rgba(30,64,175,0.35)]">
                  {initials(job.company)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-ink">{job.company}</p>
                  <p className="flex items-center gap-1 truncate text-[11.5px] text-body">
                    <MapPin className="h-3 w-3 shrink-0" aria-hidden /> {job.location}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleSaveJob(job.id)}
                  aria-pressed={saved}
                  aria-label={saved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-colors cursor-pointer",
                    saved ? "border-primary bg-primary text-white" : "border-hairline bg-white text-ink-light hover:border-primary/40 hover:text-primary"
                  )}
                >
                  <Bookmark className={cn("h-4 w-4", saved && "fill-current")} aria-hidden />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJobForModal(job)}
                className="mt-3 block text-left text-[15px] font-semibold text-ink hover:text-primary cursor-pointer"
              >
                {job.title}
              </button>

              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {[job.type, job.experience, job.category].map((t) => (
                  <span key={t} className="rounded-full border border-hairline bg-white px-2.5 py-1 text-[11px] font-medium text-body">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-[15px] font-bold text-ink">
                  {job.salary.endsWith(" LPA") ? (
                    <>
                      {job.salary.slice(0, -4)} <span className="text-[12px] font-normal text-body">LPA</span>
                    </>
                  ) : (
                    job.salary
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => apply(job)}
                  className="btn-gradient inline-flex min-h-[34px] items-center gap-1 rounded-full px-3.5 text-[12px] font-semibold cursor-pointer"
                >
                  Apply <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
              <p className="mt-2 text-[11px] text-muted">
                {job.openings} openings · posted {job.datePosted}
              </p>
            </li>
          );
        })}
      </ul>

      {jobs.length === 0 && (
        <p className="mt-4 rounded-2xl bg-surface-soft/60 px-4 py-6 text-center text-[13px] text-body">
          No matches for “{query}”. Try another role or company.
        </p>
      )}

      <a href="#jobs" className="btn-soft mt-4 inline-flex min-h-[40px] items-center justify-center gap-1 rounded-full text-[13px] font-semibold">
        Browse all jobs <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </a>
    </div>
  );
};
