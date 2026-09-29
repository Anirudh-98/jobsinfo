"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, LayoutGrid, MapPin, Search, SearchX } from "lucide-react";
import { JOBS_DATA, Job } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { Dropdown } from "@/components/ui/Dropdown";

const ROWS = 8;
const COLUMNS = ["Company", "Job role", "Category", "Location", "Vacancies", "Posted on", ""];

// "Hitec City, Hyderabad" -> "Hitec City"
const area = (location: string) => location.split(",")[0].trim();
const unique = (values: string[]) => Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));

const CATEGORY_OPTIONS = unique(JOBS_DATA.map((j) => j.category));
const LOCATION_OPTIONS = unique(JOBS_DATA.map((j) => area(j.location)));
const ROLE_OPTIONS = unique(JOBS_DATA.map((j) => j.title));

type Filters = { query: string; category: string; location: string; role: string };
const EMPTY: Filters = { query: "", category: "", location: "", role: "" };

const matches = (job: Job, f: Filters) => {
  const q = f.query.trim().toLowerCase();
  return (
    (!q || [job.title, job.company, job.location, job.category].some((v) => v.toLowerCase().includes(q))) &&
    (!f.category || job.category === f.category) &&
    (!f.location || area(job.location) === f.location) &&
    (!f.role || job.title === f.role)
  );
};

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

// Latest verified openings in a compact table; stacks into rows on mobile.
export const LatestJobsTable: React.FC = () => {
  const { setSelectedJobForModal, setIsAuthModalOpen, setAuthTab } = useApp();
  // Draft filters follow the inputs; applied filters only change on Search.
  const [draft, setDraft] = useState<Filters>(EMPTY);
  const [applied, setApplied] = useState<Filters>(EMPTY);
  const matched = useMemo(() => JOBS_DATA.filter((j) => matches(j, applied)), [applied]);
  const jobs = matched.slice(0, ROWS);
  const isFiltered = Object.values(applied).some((v) => v.trim());
  const set = (key: keyof Filters) => (value: string) => setDraft((d) => ({ ...d, [key]: value }));
  const reset = () => {
    setDraft(EMPTY);
    setApplied(EMPTY);
  };
  // Applying requires an account, so every Apply opens the sign-in modal.
  const openLogin = () => {
    setAuthTab("signin");
    setIsAuthModalOpen(true);
  };

  const renderApply = (job: Job) => (
    <button
      type="button"
      onClick={openLogin}
      className="btn-gradient inline-flex min-h-[36px] items-center gap-1 rounded-full px-4 text-[12.5px] font-semibold cursor-pointer"
      aria-label={`Apply for ${job.title} at ${job.company}`}
    >
      Apply <ArrowRight className="h-3.5 w-3.5" aria-hidden />
    </button>
  );

  const renderMark = (name: string) => (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-light text-[11.5px] font-bold text-primary">
      {initials(name)}
    </span>
  );

  return (
    <div className="card-soft">
      <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4 sm:px-6">
        <div>
          <p className="text-[15px] font-semibold text-ink">Latest openings</p>
          <p className="mt-0.5 text-[12.5px] text-body">Verified roles from employers hiring right now</p>
        </div>
        <Link href="/jobs" className="btn-soft inline-flex min-h-[36px] shrink-0 items-center gap-1 rounded-full px-4 text-[12.5px] font-semibold">
          View all jobs <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      {/* Search + filters */}
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setApplied(draft);
        }}
        className="border-b border-hairline bg-surface-soft/40 px-5 py-4 sm:px-6"
      >
        <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))_auto]">
          <label className="relative block min-w-0 sm:col-span-3 lg:col-span-1">
            <span className="sr-only">Search jobs</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={draft.query}
              onChange={(e) => set("query")(e.target.value)}
              placeholder="Search by role, company or skill…"
              className="h-11 w-full rounded-xl border border-hairline bg-white pl-10 pr-3 text-[13px] text-ink outline-none transition-colors placeholder:text-muted hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
          <Dropdown label="Category" placeholder="All categories" icon={LayoutGrid} value={draft.category} options={CATEGORY_OPTIONS} onChange={set("category")} />
          <Dropdown label="Location" placeholder="All locations" icon={MapPin} value={draft.location} options={LOCATION_OPTIONS} onChange={set("location")} />
          <Dropdown label="Job role" placeholder="All job roles" icon={BriefcaseBusiness} value={draft.role} options={ROLE_OPTIONS} onChange={set("role")} />
          <button
            type="submit"
            className="btn-gradient inline-flex h-11 items-center justify-center gap-1.5 rounded-xl px-6 text-[13.5px] font-semibold cursor-pointer sm:col-span-3 lg:col-span-1"
          >
            <Search className="h-4 w-4" aria-hidden /> Search
          </button>
        </div>

        {isFiltered && (
          <p className="mt-3 flex items-center gap-2 text-[12.5px] text-body" aria-live="polite">
            Showing <b className="font-semibold text-ink tabular-nums">{jobs.length}</b> of {matched.length} matching{" "}
            {matched.length === 1 ? "job" : "jobs"}
            <button type="button" onClick={reset} className="font-semibold text-primary hover:underline cursor-pointer">
              Clear filters
            </button>
          </p>
        )}
      </form>

      {/* Only the results clip to the card corners, so open dropdowns can overflow it */}
      <div className="overflow-hidden rounded-b-[inherit]">
        {jobs.length === 0 && (
          <div className="px-6 py-14 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-primary">
              <SearchX className="h-5 w-5" aria-hidden />
            </span>
            <p className="mt-4 text-[15px] font-semibold text-ink">No jobs match these filters</p>
            <p className="mt-1 text-[13px] text-body">Try a different category, location or role.</p>
            <button type="button" onClick={reset} className="btn-soft mt-5 inline-flex min-h-[36px] items-center rounded-full px-4 text-[12.5px] font-semibold cursor-pointer">
              Clear filters
            </button>
          </div>
        )}

        {/* Desktop / tablet table */}
        <table className={`${jobs.length ? "md:table" : ""} hidden w-full text-left`}>
          <thead>
            <tr className="bg-surface-soft/60">
              {COLUMNS.map((c, i) => (
                <th
                  key={c || "action"}
                  scope="col"
                  className={`whitespace-nowrap px-4 py-3 text-[11.5px] font-semibold uppercase tracking-wide text-muted first:pl-6 last:pr-6 ${
                    c === "Vacancies" ? "text-center" : ""
                  } ${i === COLUMNS.length - 1 ? "text-right" : ""}`}
                >
                  {c || <span className="sr-only">Action</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {jobs.map((job) => (
              <tr key={job.id} className="transition-colors hover:bg-primary-light/30">
                <td className="py-3.5 pl-6 pr-4">
                  <div className="flex items-center gap-3">
                    {renderMark(job.company)}
                    <span className="max-w-[180px] text-[13.5px] font-medium text-ink lg:max-w-[220px]">{job.company}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <button
                    type="button"
                    onClick={() => setSelectedJobForModal(job)}
                    className="text-left text-[13.5px] font-semibold text-ink hover:text-primary cursor-pointer"
                  >
                    {job.title}
                  </button>
                </td>
                <td className="px-4 py-3.5">
                  <span className="whitespace-nowrap rounded-full bg-primary-light px-2.5 py-1 text-[11.5px] font-medium text-primary">
                    {job.category}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-[13px] text-body">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-muted" aria-hidden />
                    {job.location}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-center text-[13.5px] font-semibold tabular-nums text-ink">{job.openings}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-[13px] text-body">{job.datePosted}</td>
                <td className="py-3.5 pl-4 pr-6 text-right">
                  {renderApply(job)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile: stacked rows */}
        <ul className={`${jobs.length ? "" : "hidden"} divide-y divide-hairline md:hidden`}>
          {jobs.map((job) => (
            <li key={job.id} className="px-5 py-4">
              <div className="flex items-start gap-3">
                {renderMark(job.company)}
                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => setSelectedJobForModal(job)}
                    className="text-left text-[14px] font-semibold text-ink hover:text-primary cursor-pointer"
                  >
                    {job.title}
                  </button>
                  <p className="mt-0.5 text-[12.5px] text-body">{job.company}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-body">
                    <span className="rounded-full bg-primary-light px-2.5 py-0.5 font-medium text-primary">{job.category}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted" aria-hidden />
                      {job.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 pl-12">
                <p className="text-[12px] text-body">
                  <b className="font-semibold tabular-nums text-ink">{job.openings}</b> vacancies · {job.datePosted}
                </p>
                {renderApply(job)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
