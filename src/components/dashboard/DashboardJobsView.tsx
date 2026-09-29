"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, Bookmark, BriefcaseBusiness, Check, Clock, LayoutGrid, MapPin, Search, SearchX, Users } from "lucide-react";
import { JOBS_DATA, Job } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { Dropdown } from "@/components/ui/Dropdown";
import { cn } from "@/lib/utils";

const area = (location: string) => location.split(",")[0].trim();
const unique = (values: string[]) => Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));

const CATEGORIES = unique(JOBS_DATA.map((j) => j.category));
const LOCATIONS = unique(JOBS_DATA.map((j) => area(j.location)));
const EXPERIENCE = unique(JOBS_DATA.map((j) => j.experience));

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

type Props = {
  /** Show only bookmarked jobs (the "Saved jobs" view). */
  savedOnly?: boolean;
  initialQuery?: string;
};

// Full job browser inside the dashboard: search, filters, save and apply without leaving the page.
export const DashboardJobsView: React.FC<Props> = ({ savedOnly = false, initialQuery = "" }) => {
  const { savedJobIds, toggleSaveJob, applications, setSelectedJobForModal, setIsQuickApplyOpen } = useApp();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  const appliedIds = useMemo(() => new Set(applications.map((a) => a.jobId)), [applications]);
  const base = savedOnly ? JOBS_DATA.filter((j) => savedJobIds.includes(j.id)) : JOBS_DATA;
  const q = query.trim().toLowerCase();
  const jobs = base.filter(
    (j) =>
      (!q || [j.title, j.company, j.location, j.category, j.description].some((v) => v.toLowerCase().includes(q))) &&
      (!category || j.category === category) &&
      (!location || area(j.location) === location) &&
      (!experience || j.experience === experience)
  );
  const filtered = Boolean(q || category || location || experience);

  const reset = () => {
    setQuery("");
    setCategory("");
    setLocation("");
    setExperience("");
  };

  const apply = (job: Job) => {
    setSelectedJobForModal(job);
    setIsQuickApplyOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="card-soft p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[13.5px] text-body">
              {savedOnly ? "Jobs you bookmarked — apply when you're ready." : "Verified openings from employers hiring right now."}
            </p>
          </div>
          <p className="text-[12.5px] text-body" aria-live="polite">
            <b className="font-semibold tabular-nums text-ink">{jobs.length}</b> of {base.length} {base.length === 1 ? "job" : "jobs"}
            {filtered && (
              <button type="button" onClick={reset} className="ml-2 font-semibold text-primary hover:underline cursor-pointer">
                Clear filters
              </button>
            )}
          </p>
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
          <label className="relative block min-w-0 sm:col-span-3 lg:col-span-1">
            <span className="sr-only">Search jobs</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by role, company or skill…"
              className="h-11 w-full rounded-xl border border-hairline bg-white pl-10 pr-3 text-[13px] text-ink outline-none transition-colors placeholder:text-muted hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
          <Dropdown label="Category" placeholder="All categories" icon={LayoutGrid} value={category} options={CATEGORIES} onChange={setCategory} />
          <Dropdown label="Location" placeholder="All locations" icon={MapPin} value={location} options={LOCATIONS} onChange={setLocation} />
          <Dropdown label="Experience" placeholder="Any experience" icon={BriefcaseBusiness} value={experience} options={EXPERIENCE} onChange={setExperience} />
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="card-soft px-6 py-14 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-primary">
            {savedOnly && !filtered ? <Bookmark className="h-5 w-5" aria-hidden /> : <SearchX className="h-5 w-5" aria-hidden />}
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">
            {savedOnly && !filtered ? "No saved jobs yet" : "No jobs match these filters"}
          </p>
          <p className="mt-1 text-[13px] text-body">
            {savedOnly && !filtered ? "Tap the bookmark on any job to keep it here." : "Try a different role, category or location."}
          </p>
          {savedOnly && !filtered ? (
            <a href="#jobs" className="btn-gradient mt-5 inline-flex min-h-[38px] items-center gap-1 rounded-full px-5 text-[13px] font-semibold">
              Find jobs <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          ) : (
            <button type="button" onClick={reset} className="btn-soft mt-5 inline-flex min-h-[36px] items-center rounded-full px-4 text-[12.5px] font-semibold cursor-pointer">
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {jobs.map((job) => {
            const saved = savedJobIds.includes(job.id);
            const applied = appliedIds.has(job.id);
            return (
              <li key={job.id} className="card-soft flex flex-col p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-light text-[12px] font-bold text-primary">
                    {initials(job.company)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => setSelectedJobForModal(job)}
                      className="text-left text-[15px] font-semibold leading-snug text-ink hover:text-primary cursor-pointer"
                    >
                      {job.title}
                    </button>
                    <p className="mt-0.5 truncate text-[12.5px] text-body">{job.company}</p>
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

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-medium text-primary">{job.category}</span>
                  {[job.type, job.experience].map((t) => (
                    <span key={t} className="rounded-full border border-hairline px-2.5 py-1 text-[11px] font-medium text-body">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-3 line-clamp-2 text-[12.5px] leading-relaxed text-body">{job.description}</p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-body">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-muted" aria-hidden />{job.location}</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5 text-muted" aria-hidden />{job.openings} openings</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-muted" aria-hidden />{job.datePosted}</span>
                </div>

                <div className="flex-1" aria-hidden />
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-hairline pt-4">
                  <p className="text-[15px] font-bold text-ink">{job.salary}</p>
                  {applied ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3.5 py-2 text-[12.5px] font-semibold text-emerald-600">
                      <Check className="h-3.5 w-3.5" aria-hidden /> Applied
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => apply(job)}
                      className="btn-gradient inline-flex min-h-[36px] items-center gap-1 rounded-full px-4 text-[12.5px] font-semibold cursor-pointer"
                    >
                      Apply <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
